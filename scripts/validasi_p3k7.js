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
for (let i = 61; i <= 70; i++) ids.push('p3-0' + i);

const TEMAK7 = ['lorongLangkahSetengah', 'ladangSembilanMenempel', 'stasiunKeretaNilai', 'kebunAsimtot', 'bengkelTaliHalus', 'bukitTanggaLandai', 'lintasanKilasLari', 'telagaBijiMenipis', 'bengkelPoligonBulat', 'puncakTepiMenuju'];
const GLIFK7 = ['setengah!', '9-9-9', 'ke 3', 'y=1/x', 'potong!', '0,25', '2 m/s', '1/1000', '6-12-96', 'menuju!'];
const OBJEKK7 = ['tembokCahayaSetengah', 'papanJejakLangkah', 'kertasSisaJarang', 'garisLantaiTotal', 'tonggakSatuCahaya', 'tigaPapanSembilan', 'papanJarakMengecil', 'lorongMenujuSatu', 'keretaMenujuPeron', 'papanJadwalDuaArah', 'titikSepakatTiga', 'pintuArahCukup', 'kurvaBatuKebun', 'papanNilaiKebalikan', 'pagarAsimtot', 'bungaDuaSisiPagar', 'taliSatuMeter', 'guntingEmpatPotong', 'mistarTotalSatu', 'gulunganBenangHalus', 'tanggaDuaAnak', 'tanggaEmpatAnak', 'lerengMulusBatu', 'gerbangKalkulusBukit', 'lintasanRobotPelari', 'papanJendelaDetik', 'stopwatchKilas', 'papanLajuSesaat', 'telagaBijiPertama', 'papanPembagiRaksasa', 'bijiSerbukHalus', 'permukaanAirTenang', 'rodaSegiEnam', 'rodaSegiDuaBelas', 'papanKelilingPoligon', 'rodaLingkaranSempurna', 'limaPapanMisiMenuju', 'papanMisiLangkahSembilan', 'papanMisiPembagiAsimtot', 'gerbangJuaraMenuju'];

ids.forEach((id, idx) => {
  const b = blok(id);
  cek(id + ' blok ada', !!b);
  if (!b) return;
  cek(id + ' tema = ' + TEMAK7[idx], b.includes("tema: '" + TEMAK7[idx] + "'"));
  cek(id + ' glif = ' + GLIFK7[idx], b.includes("glif: '" + GLIFK7[idx] + "'"));
  const teks = [...b.matchAll(/teks: '((?:[^'\\]|\\.)*)'/g)].map(m => m[1]);
  cek(id + ' 5 stasiun (teks)', teks.length === 5, teks.length);
  cek(id + ' semua teks >= 200 char', teks.every(t => t.length >= 200), teks.map(t => t.length));
  cek(id + ' semua teks >= 3 kalimat', teks.every(t => t.split(/[.!?]/).filter(s => s.trim()).length >= 3));
  cek(id + ' tugu akhir:true', b.includes('akhir: true'));
  cek(id + ' tugu Owalah', b.includes('Owalah, ternyata begini toh'));
  cek(id + ' tugu Mudah, bukan?', b.includes('Mudah, bukan?'));
  const objs = [...b.matchAll(/objek: '([^']*)'/g)].map(m => m[1]);
  cek(id + ' 4 objek + tugu', objs.length === 5 && objs[4] === 'tugu', objs);
  objs.slice(0, 4).forEach(o => cek(id + ' objek terdaftar: ' + o, OBJEKK7.includes(o)));
  cek(id + ' ucap 2 baris', [...b.matchAll(/ucap: \['[^']*', '[^']*'\]/g)].length === 1);
});

TEMAK7.forEach(t => {
  cek('TEMA_CFG: ' + t, main.includes('    ' + t + ": { glif: ["));
  cek('AMB_CFG: ' + t, main.includes('    ' + t + ': { jenis:'));
  cek('bakarLatar: ' + t, main.includes("TEMA_NAMA === '" + t + "'"));
});

OBJEKK7.forEach(o => {
  const fn = 'gambar' + o.charAt(0).toUpperCase() + o.slice(1);
  cek('registry: ' + o, main.includes(o + ': ' + fn));
  cek('partikel: ' + o, main.includes(o + ": '"));
  const def = [...main.matchAll(new RegExp('function ' + fn + '\\(', 'g'))].length;
  cek('fungsi tepat-1: ' + fn, def === 1, def);
});

const semuaGlif = [...cerita.matchAll(/glif:\s*'([^']*)'/g)].map(m => m[1]);
GLIFK7.forEach(g => cek('glif unik: ' + g, semuaGlif.filter(x => x === g).length === 1, semuaGlif.filter(x => x === g).length));
const semuaTema = [...cerita.matchAll(/tema:\s*'([^']*)'/g)].map(m => m[1]);
TEMAK7.forEach(t => cek('tema unik: ' + t, semuaTema.filter(x => x === t).length === 1));
const semuaObj = [...cerita.matchAll(/objek:\s*'([^']*)'/g)].map(m => m[1]);
OBJEKK7.forEach(o => cek('objek unik: ' + o, semuaObj.filter(x => x === o).length === 1));

const whitelist = ['bukan mantra', 'tak ada sihir', 'bukan sulap', 'bukan menebak nasib', 'tanpa taruhan', 'bukan alat', 'bukan untuk', 'tak kami ajarkan', 'haram'];
const KATA = ['ramal', 'meramal', 'ramalan', 'numerolog', 'takdir', 'jimat', 'weton', 'zodiak', 'horoskop', 'primbon', 'peruntungan', 'nasib'];
function blokSemuaNaskah(src) {
  const out = [];
  const re = /'(p\d-\d{3})': \{([\s\S]*?)\n    \},/g;
  let m; while ((m = re.exec(src)) !== null) out.push({ id: m[1], isi: m[2] });
  return out;
}
const semuaBlok = blokSemuaNaskah(cerita);
cek('jumlah blok naskah >= 270', semuaBlok.length >= 270, semuaBlok.length);
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

const isiK7 = ids.map(blok).join('\n');
cek('langkah 1/2 1/4 1/8', isiK7.includes('1/2, langkah kedua 1/4, lalu 1/8'));
cek('10 langkah sisa 1/1024', isiK7.includes('1/1024'));
cek('total 0,5 0,75 0,875 0,9375', isiK7.includes('0,9375'));
cek('sembilan 0,9 0,99 0,999', isiK7.includes('0,999'));
cek('jarak dibagi sepuluh 0,1 0,01 0,001', isiK7.includes('0,001'));
cek('jadwal 2,99 dan 3,01', isiK7.includes('2,99') && isiK7.includes('3,01'));
cek('asimtot disebut', isiK7.includes('asimtot'));
cek('1/x nilai 0,01 di x100', isiK7.includes('0,01 — makin jauh dari gerbang'));
cek('tali 8 potong 0,125', isiK7.includes('0,125'));
cek('16 potong 0,0625', isiK7.includes('0,0625'));
cek('tangga 0,5 0,25 0,1', isiK7.includes('naik 0,25') && isiK7.includes('naik 0,1'));
cek('laju 2 m tiap detik', isiK7.includes('2 m tiap detik'));
cek('jendela 0,1 detik 0,2 meter', isiK7.includes('0,2 meter'));
cek('pembagi 1/1000 = 0,001', isiK7.includes('menghasilkan 0,001'));
cek('poligon 3,0 3,11 3,14', isiK7.includes('3,11') && isiK7.includes('3,14'));
cek('archimedes segi 96', isiK7.includes('segi 96'));
cek('hitungan itu hanya alat hadir >= 3x', (isiK7.toLowerCase().match(/hitungan itu hanya alat/g) || []).length >= 3, (isiK7.toLowerCase().match(/hitungan itu hanya alat/g) || []).length);

let regresi = 0;
semuaBlok.forEach(b => {
  if (b.id.startsWith('p1-') || b.id.startsWith('p2-')) {
    if (!b.isi.includes('akhir: true')) regresi++;
  } else {
    if (!b.isi.includes('akhir: true') || !b.isi.includes('Owalah, ternyata begini toh') || !b.isi.includes('Mudah, bukan?')) regresi++;
  }
});
cek('regresi 270 naskah utuh', regresi === 0, regresi);

const toCount = [...p3data.matchAll(/id: 'p3-\d{3}'/g)].length;
cek('pintu3-data 100 judul', toCount === 100, toCount);

TEMAK7.forEach((t, i) => {
  const re = new RegExp('    ' + t + ": \\{ glif: \\['([^']*)', '([^']*)', '([^']*)'\\]");
  const m = main.match(re);
  cek('TEMA_CFG glif ok: ' + t, !!m);
  if (m) m.slice(1).forEach(g => cek('glif langit ASCII: ' + g, /^[\x20-\x7E]+$/.test(g)));
});

const regCount = [...main.matchAll(/: gambar[A-Z]/g)].length;
cek('registry objek >= 1086', regCount >= 1086, regCount);

console.log('validasi_p3k7: ' + ok + ' OK, ' + gagal + ' GAGAL');
if (gagal > 0) process.exit(1);
