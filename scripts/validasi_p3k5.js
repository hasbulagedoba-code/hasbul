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
for (let i = 41; i <= 50; i++) ids.push('p3-0' + i);

const TEMAK5 = ['padangSegitiga', 'lorongTanggaSandar', 'menaraSisiMiring', 'pelataranMiniatur', 'kebunBayangan', 'tamanAyunan', 'bukitRodaRaksasa', 'gerbangTigaSudut', 'kolamRiakMalam', 'puncakPengukurJauh'];
const GLIFK5 = ['3 sisi', '4/2', 'sin', 'rasio', '45!', 'ayun!', '0-10', '30 45', 'riak', 'ukur!'];
const OBJEKK5 = ['gerbangSegitigaRaksasa', 'dindingTegakLantai', 'jalanPintasMiring', 'papanNamaSisi', 'lorongTigaTangga', 'papanNaikMaju', 'tanggaPembagiCuram', 'gelangCuramAman', 'menaraTanggaSenja', 'kartuSinusEmpatLima', 'kartuCosinusTigaLima', 'papanKuadratSatu', 'duaMenaraBanding', 'papanRasioSetia', 'tigaUkuranSebaris', 'kunciSebangun', 'tongkatBayangan', 'pohonBayanganDuaBelas', 'papanPerbandinganBayang', 'buktiMemukulSama', 'ayunanTamanBunga', 'taliNaikTurun', 'kertasGrafikAyunan', 'jamAyunanSetia', 'rodaRaksasaMalam', 'lampuTepiRoda', 'papanTinggiLampu', 'kabinTurunNaik', 'tigaGerbangSudut', 'gerbangKembarEmpatLima', 'gerbangSetengahTigaPuluh', 'gerbangEnamPuluhTinggi', 'kolamRiakBulan', 'kerikilJatuhTengah', 'puncakKePuncakEmpat', 'lembahRiakSetia', 'menaraPengukurMalam', 'papanMisiSisiTangga', 'papanMisiBayangMenara', 'limaPapanMisiJauh'];

ids.forEach((id, idx) => {
  const b = blok(id);
  cek(id + ' blok ada', !!b);
  if (!b) return;
  cek(id + ' tema = ' + TEMAK5[idx], b.includes("tema: '" + TEMAK5[idx] + "'"));
  cek(id + ' glif = ' + GLIFK5[idx], b.includes("glif: '" + GLIFK5[idx] + "'"));
  const teks = [...b.matchAll(/teks: '((?:[^'\\]|\\.)*)'/g)].map(m => m[1]);
  cek(id + ' 5 stasiun (teks)', teks.length === 5, teks.length);
  cek(id + ' semua teks >= 200 char', teks.every(t => t.length >= 200), teks.map(t => t.length));
  cek(id + ' semua teks >= 3 kalimat', teks.every(t => t.split(/[.!?]/).filter(s => s.trim()).length >= 3));
  cek(id + ' tugu akhir:true', b.includes('akhir: true'));
  cek(id + ' tugu Owalah', b.includes('Owalah, ternyata begini toh'));
  cek(id + ' tugu Mudah, bukan?', b.includes('Mudah, bukan?'));
  const objs = [...b.matchAll(/objek: '([^']*)'/g)].map(m => m[1]);
  cek(id + ' 4 objek + tugu', objs.length === 5 && objs[4] === 'tugu', objs);
  objs.slice(0, 4).forEach(o => cek(id + ' objek terdaftar: ' + o, OBJEKK5.includes(o)));
  cek(id + ' ucap 2 baris', [...b.matchAll(/ucap: \['[^']*', '[^']*'\]/g)].length === 1);
});

TEMAK5.forEach(t => {
  cek('TEMA_CFG: ' + t, main.includes('    ' + t + ": { glif: ["));
  cek('AMB_CFG: ' + t, main.includes('    ' + t + ': { jenis:'));
  cek('bakarLatar: ' + t, main.includes("TEMA_NAMA === '" + t + "'"));
});

OBJEKK5.forEach(o => {
  const fn = 'gambar' + o.charAt(0).toUpperCase() + o.slice(1);
  cek('registry: ' + o, main.includes(o + ': ' + fn));
  cek('partikel: ' + o, main.includes(o + ": '"));
  const def = [...main.matchAll(new RegExp('function ' + fn + '\\(', 'g'))].length;
  cek('fungsi tepat-1: ' + fn, def === 1, def);
});

const semuaGlif = [...cerita.matchAll(/glif:\s*'([^']*)'/g)].map(m => m[1]);
GLIFK5.forEach(g => cek('glif unik: ' + g, semuaGlif.filter(x => x === g).length === 1, semuaGlif.filter(x => x === g).length));
const semuaTema = [...cerita.matchAll(/tema:\s*'([^']*)'/g)].map(m => m[1]);
TEMAK5.forEach(t => cek('tema unik: ' + t, semuaTema.filter(x => x === t).length === 1));
const semuaObj = [...cerita.matchAll(/objek:\s*'([^']*)'/g)].map(m => m[1]);
OBJEKK5.forEach(o => cek('objek unik: ' + o, semuaObj.filter(x => x === o).length === 1));

const whitelist = ['bukan mantra', 'tak ada sihir', 'bukan sulap', 'bukan menebak nasib', 'tanpa taruhan'];
const KATA = ['ramal', 'meramal', 'ramalan', 'numerolog', 'takdir', 'jimat', 'weton', 'zodiak', 'horoskop', 'primbon', 'peruntungan', 'nasib'];
function blokSemuaNaskah(src) {
  const out = [];
  const re = /'(p\d-\d{3})': \{([\s\S]*?)\n    \},/g;
  let m; while ((m = re.exec(src)) !== null) out.push({ id: m[1], isi: m[2] });
  return out;
}
const semuaBlok = blokSemuaNaskah(cerita);
cek('jumlah blok naskah = 250', semuaBlok.length === 250, semuaBlok.length);
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

const isiK5 = ids.map(blok).join('\n');
cek('pythagoras 9 + 16 = 25', isiK5.includes('9 + 16 = 25'));
cek('miring 5 > 4 dan 3', isiK5.includes('lebih panjang dari 4 maupun 3'));
cek('tangga 3/3=1 2/4=0,5 4/2=2', isiK5.includes('3 ÷ 3 = 1') && isiK5.includes('2 ÷ 4 = 0,5') && isiK5.includes('4 ÷ 2 = 2'));
cek('tangen dinamai', isiK5.includes('punya nama: tangen'));
cek('sin 4/5=0,8', isiK5.includes('4 ÷ 5 = 0,8'));
cek('cos 3/5=0,6', isiK5.includes('3 ÷ 5 = 0,6'));
cek('kuadrat sahabat 0,64+0,36=1', isiK5.includes('0,64 + 0,36 = 1'));
cek('sebangun 8/10=0,8', isiK5.includes('8 ÷ 10 = 0,8'));
cek('sebangun 12/15=0,8 dan 9/15=0,6', isiK5.includes('12 ÷ 15 = 0,8') && isiK5.includes('9 ÷ 15 = 0,6'));
cek('thales tongkat 2/2=1', isiK5.includes('2 ÷ 2 = 1'));
cek('pohon 1 x 12 = 12', isiK5.includes('1 × 12 = 12'));
cek('menara bayangan 30', isiK5.includes('30 meter pasti tingginya 30 meter'));
cek('ayunan 2+2=4 detik', isiK5.includes('satu putaran penuh 4 detik'));
cek('roda puncak 10 dan catatan 0,3,7', isiK5.includes('0, lalu 3, lalu 7, puncak 10'));
cek('sin30 1/2 (1 ÷ 2 = 0,5)', isiK5.includes('1 ÷ 2 = 0,5'));
cek('60 jangkung 1,73 dan 0,866', isiK5.includes('1,73') && isiK5.includes('0,866'));
cek('45 kaki kembar 0,707', isiK5.includes('0,707'));
cek('riak 6 - 2 = 4 dan 10 - 6 = 4', isiK5.includes('6 − 2 = 4') && isiK5.includes('10 − 6 = 4'));
cek('misi tangga 4/5=0,8', isiK5.includes('4 ÷ 5 = 0,8'));
cek('misi menara 6/10=0,6', isiK5.includes('6 ÷ 10 = 0,6'));
cek('misi setengah 6/2=3', isiK5.includes('6 ÷ 2 = 3'));
cek('hitungan itu hanya alat hadir', isiK5.toLowerCase().includes('hitungan itu hanya alat'));

let regresi = 0;
semuaBlok.forEach(b => {
  if (b.id.startsWith('p1-') || b.id.startsWith('p2-')) {
    if (!b.isi.includes('akhir: true')) regresi++;
  } else {
    if (!b.isi.includes('akhir: true') || !b.isi.includes('Owalah, ternyata begini toh') || !b.isi.includes('Mudah, bukan?')) regresi++;
  }
});
cek('regresi 250 naskah utuh', regresi === 0, regresi);

const toCount = [...p3data.matchAll(/id: 'p3-\d{3}'/g)].length;
cek('pintu3-data 100 judul', toCount === 100, toCount);

TEMAK5.forEach((t, i) => {
  const re = new RegExp('    ' + t + ": \\{ glif: \\['([^']*)', '([^']*)', '([^']*)'\\]");
  const m = main.match(re);
  cek('TEMA_CFG glif ok: ' + t, !!m);
  if (m) m.slice(1).forEach(g => cek('glif langit ASCII: ' + g, /^[\x20-\x7E]+$/.test(g)));
});

console.log(`\nvalidasi_p3k5: ${ok} OK, ${gagal} GAGAL`);
process.exit(gagal ? 1 : 0);
