const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'akiomidaspace', 'js');
const cerita = fs.readFileSync(path.join(DIR, 'cerita-data.js'), 'utf8');
const main = fs.readFileSync(path.join(DIR, 'pelajaran-main.js'), 'utf8');
const p3data = fs.readFileSync(path.join(DIR, 'pintu3-data.js'), 'utf8');
let ok = 0, gagal = 0;
function cek(nama, syarat, rincian) { if (syarat) ok++; else { gagal++; console.log('GAGAL:', nama, rincian === undefined ? '' : rincian); } }

function blok(id) {
  const re = new RegExp("'" + id + "': \\{([\\s\\S]*?)\\n    \\},");
  const m = cerita.match(re);
  return m ? m[1] : null;
}
const ids = [];
for (let i = 71; i <= 80; i++) ids.push('p3-0' + i);

const TEMAK8 = ['tamanKeranAir', 'jalanRayaKilometer', 'galeriGarisSinggung', 'bengkelMesinPangkat', 'jalanBukitPanah', 'tamanAirMancur', 'tanggaLajuPercepatan', 'lembahSenyumU', 'jalanMotorSore', 'puncakLerengCuram'];
const GLIFK8 = ['deras!', '40-80', 'menempel', 'x2 ke 2x', 'naik!', 'puncak!', 'tingkat', 'senyum', '+5/s', 'lereng!'];
const OBJEKK8 = ['keranBergantiDeras', 'gelasPengukurAir', 'papanLajuTigaSaat', 'jamDetikTaman', 'papanKilometerEnam', 'speedometerBergetar', 'duaMobilRata', 'jamPerjalananSatu', 'kurvaBukitHijau', 'penggarisMenempel', 'titikTapakCahaya', 'papanKemiringanSatu', 'mesinPangkatTurun', 'bolaKuadratLompat', 'rodaGigiGanjil', 'papanAturanPangkat', 'panahNaikHijau', 'papanBerhentiSesaat', 'panahTurunMerah', 'jalanBergelombang', 'airMancurMelengkung', 'papanTinggiEmpat', 'titikPuncakKilau', 'kolamCipratan', 'tanggaTigaAnakLaju', 'papanJarakBola', 'papanLajuNaikDua', 'papanPercepatanDua', 'kurvaSenyumRaksasa', 'papanLembahNol', 'titikTerendahKilau', 'burungLingkarLembah', 'motorSoreKencang', 'speedometerNaikTetap', 'papanDetikLima', 'jalanDesaMelengkung', 'kompasKemiringan', 'limaPapanMisiLereng', 'papanPuncakLembah', 'gerbangJuaraLereng'];

ids.forEach((id, idx) => {
  const b = blok(id);
  cek(id + ' blok ada', !!b);
  if (!b) return;
  cek(id + ' tema = ' + TEMAK8[idx], b.includes("tema: '" + TEMAK8[idx] + "'"));
  cek(id + ' glif = ' + GLIFK8[idx], b.includes("glif: '" + GLIFK8[idx] + "'"));
  const teks = [...b.matchAll(/teks: '((?:[^'\\]|\\.)*)'/g)].map(m => m[1]);
  cek(id + ' 5 stasiun (teks)', teks.length === 5, teks.length);
  cek(id + ' semua teks >= 200 char', teks.every(t => t.length >= 200), teks.map(t => t.length));
  cek(id + ' semua teks >= 3 kalimat', teks.every(t => t.split(/[.!?]/).filter(s => s.trim()).length >= 3), teks.map(t => t.split(/[.!?]/).filter(s => s.trim()).length));
  cek(id + ' tugu akhir:true', b.includes('akhir: true'));
  cek(id + ' tugu Owalah', b.includes('Owalah, ternyata begini toh'));
  cek(id + ' tugu Mudah, bukan?', b.includes('Mudah, bukan?'));
  const objs = [...b.matchAll(/objek: '([^']*)'/g)].map(m => m[1]);
  cek(id + ' 4 objek + tugu', objs.length === 5 && objs[4] === 'tugu', objs);
  objs.slice(0, 4).forEach(o => cek(id + ' objek terdaftar: ' + o, OBJEKK8.includes(o)));
  cek(id + ' ucap 2 baris', [...b.matchAll(/ucap: \['[^']*', '[^']*'\]/g)].length === 1);
});

TEMAK8.forEach(t => {
  cek('TEMA_CFG: ' + t, main.includes('    ' + t + ": { glif: ["));
  cek('AMB_CFG: ' + t, main.includes('    ' + t + ': { jenis:'));
  cek('bakarLatar: ' + t, main.includes("TEMA_NAMA === '" + t + "'"));
});

OBJEKK8.forEach(o => {
  const fn = 'gambar' + o.charAt(0).toUpperCase() + o.slice(1);
  cek('registry: ' + o, main.includes(o + ': ' + fn));
  cek('partikel: ' + o, main.includes(o + ": '"));
  const def = [...main.matchAll(new RegExp('function ' + fn + '\\(', 'g'))].length;
  cek('fungsi tepat-1: ' + fn, def === 1, def);
});

const semuaGlif = [...cerita.matchAll(/glif:\s*'([^']*)'/g)].map(m => m[1]);
GLIFK8.forEach(g => cek('glif unik: ' + g, semuaGlif.filter(x => x === g).length === 1, semuaGlif.filter(x => x === g).length));
const semuaTema = [...cerita.matchAll(/tema:\s*'([^']*)'/g)].map(m => m[1]);
TEMAK8.forEach(t => cek('tema unik: ' + t, semuaTema.filter(x => x === t).length === 1));
const semuaObj = [...cerita.matchAll(/objek:\s*'([^']*)'/g)].map(m => m[1]);
OBJEKK8.forEach(o => cek('objek unik: ' + o, semuaObj.filter(x => x === o).length === 1));

const whitelist = ['bukan mantra', 'tak ada sihir', 'bukan sulap', 'bukan menebak nasib', 'tanpa taruhan', 'bukan alat', 'bukan untuk', 'tak kami ajarkan', 'haram'];
const KATA = ['ramal', 'meramal', 'ramalan', 'numerolog', 'takdir', 'jimat', 'weton', 'zodiak', 'horoskop', 'primbon', 'peruntungan', 'nasib'];
function blokSemuaNaskah(src) {
  const out = [];
  const re = /'(p\d-\d{3})': \{([\s\S]*?)\n    \},/g;
  let m; while ((m = re.exec(src)) !== null) out.push({ id: m[1], isi: m[2] });
  return out;
}
const semuaBlok = blokSemuaNaskah(cerita);
cek('jumlah blok naskah = 280', semuaBlok.length === 280, semuaBlok.length);
let temuan = 0;
semuaBlok.forEach(b => {
  const low = b.isi.toLowerCase();
  for (const k of KATA) {
    if (low.includes(k)) {
      const idx = low.indexOf(k);
      const ctx = low.slice(Math.max(0, idx - 60), idx + 60);
      if (!whitelist.some(w => ctx.includes(w))) { temuan++; console.log('PELANGGARAN:', b.id, k, '->', ctx); }
    }
  }
});
cek('anti-ramalan naskah: nol pelanggaran', temuan === 0, temuan);
const teaserP3 = [...p3data.matchAll(/teaser: '((?:[^'\\]|\\.)*)'/g)].map(m => m[1]);
let temuanTeaser = 0;
teaserP3.forEach((t, i) => { const low = t.toLowerCase(); if (KATA.some(k => low.includes(k) && !whitelist.some(w => low.includes(w)))) { temuanTeaser++; console.log('TEASER:', i); } });
cek('anti-ramalan teaser P3: nol', temuanTeaser === 0, temuanTeaser);

const isiK8 = ids.map(blok).join('\n');
cek('gelas 3-3-6-1 total 13', isiK8.includes('melonjak 6 cm dalam satu detik') && isiK8.includes('13 cm air'));
cek('mobil 40 lalu 80 = 60 km', isiK8.includes('20 kilometer') && isiK8.includes('40 kilometer') && isiK8.includes('60 kilometer dalam satu jam'));
cek('dua mobil 30 lalu 90', isiK8.includes('30 pada setengah jam') && isiK8.includes('90 pada setengah jam'));
cek('bukit landai maju satu naik satu', isiK8.includes('Maju satu langkah sepanjang papan, naik satu langkah'));
cek('puncak datar kemiringan nol', isiK8.includes('kemiringan nol'));
cek('lereng curam maju satu naik dua', isiK8.includes('naik dua'));
cek('aturan pangkat turun: x2 ke 2x', isiK8.includes('x2 dan pintu keluar bertuliskan 2x'));
cek('kuadrat 1-4-9', isiK8.includes('1 meter, detik kedua 4 meter, detik ketiga 9 meter'));
cek('ganjil 3-5-7-9', isiK8.includes('3, 5, 7, 9'));
cek('genap 2-4-6-8-10', isiK8.includes('2, 4, 6, 8, 10'));
cek('lompatan 7 di antara 6 dan 8', isiK8.includes('di antara 6 dan 8'));
cek('laju gelas papan 3,3,6,1', isiK8.includes('3, 3, 6, lalu 1 cm tiap detik'));
cek('misi ujian laju positif negatif nol', isiK8.includes('lajunya positif') && isiK8.includes('laju negatif') && isiK8.includes('laju nol'));
cek('air mancur 0-3-4-3-0', isiK8.includes('0, 3, 4, 3, 0'));
cek('air puncak detik kedua tinggi 4', /di detik kedua itulah air sesaat diam di ketinggian 4/i.test(isiK8));
cek('laju plus 1 berganti minus 1', isiK8.includes('plus 1 berganti minus 1'));
cek('tangga jarak 1-4-9', isiK8.includes('total 4 meter, detik ketiga total 9 meter'));
cek('laju 2-4-6', isiK8.includes('2, 4, 6 meter tiap detik'));
cek('percepatan tetap 2', isiK8.includes('percepatan bola itu tetap 2 tiap detik'));
cek('lembah laju minus 4 minus 2 nol plus', isiK8.includes('minus 4 lalu minus 2') && isiK8.includes('plus 2 lalu plus 4'));
cek('dasar senyum minus 4', isiK8.includes('tercatat minus 4'));
cek('motor 5-10-15', isiK8.includes('5 meter tiap detik, detik kedua 10, detik ketiga 15'));
cek('motor naik 5 tiap detik', isiK8.includes('setiap detik laju bertambah tepat 5'));
cek('tikungan melambat percepatan negatif', isiK8.includes('tandanya negatif'));
cek('misi lima papan: gelas 3,3,6,1', isiK8.includes('3, 3, 6, 1'));
cek('misi puncak air detik 2 tinggi 4', isiK8.includes('Puncak air mancur ada di detik kedua ketinggian 4'));
cek('misi dasar senyum minus 4 laju nol', isiK8.includes('ketinggian minus 4, juga dengan laju nol'));
cek('hitungan itu hanya alat hadir >= 3x', (isiK8.toLowerCase().match(/hitungan itu hanya alat/g) || []).length >= 3, (isiK8.toLowerCase().match(/hitungan itu hanya alat/g) || []).length);

let regresi = 0;
semuaBlok.forEach(b => {
  if (b.id.startsWith('p1-') || b.id.startsWith('p2-')) {
    if (!b.isi.includes('akhir: true')) regresi++;
  } else {
    if (!b.isi.includes('akhir: true') || !b.isi.includes('Owalah, ternyata begini toh') || !b.isi.includes('Mudah, bukan?')) regresi++;
  }
});
cek('regresi 280 naskah utuh', regresi === 0, regresi);

const toCount = [...p3data.matchAll(/id: 'p3-\d{3}'/g)].length;
cek('pintu3-data 100 judul', toCount === 100, toCount);

TEMAK8.forEach((t, i) => {
  const re = new RegExp('    ' + t + ": \\{ glif: \\['([^']*)', '([^']*)', '([^']*)'\\]");
  const m = main.match(re);
  cek('TEMA_CFG glif ok: ' + t, !!m);
  if (m) m.slice(1).forEach(g => cek('glif langit ASCII: ' + g, /^[\x20-\x7E]+$/.test(g)));
});

const regCount = [...main.matchAll(/: gambar[A-Z]/g)].length;
cek('registry objek >= 1126', regCount >= 1126, regCount);

console.log('validasi_p3k8: ' + ok + ' OK, ' + gagal + ' GAGAL');
if (gagal > 0) process.exit(1);
