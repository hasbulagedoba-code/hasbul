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
for (let i = 51; i <= 60; i++) ids.push('p3-0' + i);

const TEMAK6 = ['padangDuaPanah', 'jalanRumahSekolah', 'lorongPanahSambung', 'lapanganPanahKembar', 'tamanKisiKotak', 'dermagaPerahuSungai', 'alunKotaBurung', 'menaraTanggaTiga', 'galeriTigaPandangan', 'puncakLintasLembah'];
const GLIFK6 = ['5 dan 5', '4+3=5', 'sambung!', '3 dan -3', '3,2', 'dayung!', '2,3,4', '2 2 1', '3 foto', 'lembah!'];
const OBJEKK6 = ['duaPanahBerlawanan', 'papanBesarArah', 'patokJarakSepuluh', 'gerbangArahVektor', 'jalanZigzagSekolah', 'panahLurusTikus', 'segitigaJalanSiku', 'papanPetunjukPanah', 'duaPanahBerturut', 'panahJumlahTunggal', 'jalurMundurSambung', 'papanUjungKeUjung', 'panahKembarSejajar', 'panahLawanBerbalik', 'patokKembaliNol', 'papanAngkaMinus', 'kisiTaliHalaman', 'kartuVektorTigaDua', 'kartuVektorDuaTiga', 'papanUrutanPenting', 'perahuTepiDermaga', 'panahArusDeras', 'pantaiMendaratMiring', 'papanHitungPaduan', 'petaKotaDariAtas', 'menaraTigaLantai', 'kartuAlamatTigaAngka', 'burungTerbangAlamat', 'tanggaTigaArahMenara', 'liftMenaraTegak', 'papanJarakMiringTiga', 'lintasanTerbangLurus', 'susunKubusMeja', 'fotoDepanBentukL', 'fotoAtasBentukSudut', 'fotoSampingBentukSudut', 'limaPapanMisiPanah', 'papanMisiPanahArah', 'papanMisiPanahSambung', 'gerbangJuaraLintas'];

ids.forEach((id, idx) => {
  const b = blok(id);
  cek(id + ' blok ada', !!b);
  if (!b) return;
  cek(id + ' tema = ' + TEMAK6[idx], b.includes("tema: '" + TEMAK6[idx] + "'"));
  cek(id + ' glif = ' + GLIFK6[idx], b.includes("glif: '" + GLIFK6[idx] + "'"));
  const teks = [...b.matchAll(/teks: '((?:[^'\\]|\\.)*)'/g)].map(m => m[1]);
  cek(id + ' 5 stasiun (teks)', teks.length === 5, teks.length);
  cek(id + ' semua teks >= 200 char', teks.every(t => t.length >= 200), teks.map(t => t.length));
  cek(id + ' semua teks >= 3 kalimat', teks.every(t => t.split(/[.!?]/).filter(s => s.trim()).length >= 3));
  cek(id + ' tugu akhir:true', b.includes('akhir: true'));
  cek(id + ' tugu Owalah', b.includes('Owalah, ternyata begini toh'));
  cek(id + ' tugu Mudah, bukan?', b.includes('Mudah, bukan?'));
  const objs = [...b.matchAll(/objek: '([^']*)'/g)].map(m => m[1]);
  cek(id + ' 4 objek + tugu', objs.length === 5 && objs[4] === 'tugu', objs);
  objs.slice(0, 4).forEach(o => cek(id + ' objek terdaftar: ' + o, OBJEKK6.includes(o)));
  cek(id + ' ucap 2 baris', [...b.matchAll(/ucap: \['[^']*', '[^']*'\]/g)].length === 1);
});

TEMAK6.forEach(t => {
  cek('TEMA_CFG: ' + t, main.includes('    ' + t + ": { glif: ["));
  cek('AMB_CFG: ' + t, main.includes('    ' + t + ': { jenis:'));
  cek('bakarLatar: ' + t, main.includes("TEMA_NAMA === '" + t + "'"));
});

OBJEKK6.forEach(o => {
  const fn = 'gambar' + o.charAt(0).toUpperCase() + o.slice(1);
  cek('registry: ' + o, main.includes(o + ': ' + fn));
  cek('partikel: ' + o, main.includes(o + ": '"));
  const def = [...main.matchAll(new RegExp('function ' + fn + '\\(', 'g'))].length;
  cek('fungsi tepat-1: ' + fn, def === 1, def);
});

const semuaGlif = [...cerita.matchAll(/glif:\s*'([^']*)'/g)].map(m => m[1]);
GLIFK6.forEach(g => cek('glif unik: ' + g, semuaGlif.filter(x => x === g).length === 1, semuaGlif.filter(x => x === g).length));
const semuaTema = [...cerita.matchAll(/tema:\s*'([^']*)'/g)].map(m => m[1]);
TEMAK6.forEach(t => cek('tema unik: ' + t, semuaTema.filter(x => x === t).length === 1));
const semuaObj = [...cerita.matchAll(/objek:\s*'([^']*)'/g)].map(m => m[1]);
OBJEKK6.forEach(o => cek('objek unik: ' + o, semuaObj.filter(x => x === o).length === 1));

const whitelist = ['bukan mantra', 'tak ada sihir', 'bukan sulap', 'bukan menebak nasib', 'tanpa taruhan'];
const KATA = ['ramal', 'meramal', 'ramalan', 'numerolog', 'takdir', 'jimat', 'weton', 'zodiak', 'horoskop', 'primbon', 'peruntungan', 'nasib'];
function blokSemuaNaskah(src) {
  const out = [];
  const re = /'(p\d-\d{3})': \{([\s\S]*?)\n    \},/g;
  let m; while ((m = re.exec(src)) !== null) out.push({ id: m[1], isi: m[2] });
  return out;
}
const semuaBlok = blokSemuaNaskah(cerita);
cek('jumlah blok naskah = 260', semuaBlok.length === 260, semuaBlok.length);
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

const isiK6 = ids.map(blok).join('\n');
cek('jarak dua anak 5 + 5 = 10', isiK6.includes('5 + 5 = 10'));
cek('pintas 16 + 9 = 25 akar 5', isiK6.includes('16 + 9 = 25'));
cek('jalan 7 pintas 5', isiK6.includes('Jalan berliku 7 langkah, panah pintas hanya 5'));
cek('sambung maju 5', isiK6.includes('maju 5 sekaligus'));
cek('lawan 3 + (−3) = 0', isiK6.includes('3 + (−3) = 0'));
cek('kisi (3, 2) dan (2, 3)', isiK6.includes('(3, 2)') && isiK6.includes('(2, 3)'));
cek('perahu luncur 5', isiK6.includes('akarnya 5. Luncuran perahu tercatat 5 langkah serong'));
cek('alamat (2, 3, 4)', isiK6.includes('(2, 3, 4)'));
cek('jarak ruang 4 + 4 + 1 = 9', isiK6.includes('4 + 4 + 1 = 9'));
cek('akar 9 tepat 3', isiK6.includes('akar 9 tepat 3'));
cek('tiga foto 3 kotak kubus 4', isiK6.includes('kubus asli berjumlah 4'));
cek('hitungan itu hanya alat hadir', isiK6.toLowerCase().includes('hitungan itu hanya alat'));

let regresi = 0;
semuaBlok.forEach(b => {
  if (b.id.startsWith('p1-') || b.id.startsWith('p2-')) {
    if (!b.isi.includes('akhir: true')) regresi++;
  } else {
    if (!b.isi.includes('akhir: true') || !b.isi.includes('Owalah, ternyata begini toh') || !b.isi.includes('Mudah, bukan?')) regresi++;
  }
});
cek('regresi 260 naskah utuh', regresi === 0, regresi);

const toCount = [...p3data.matchAll(/id: 'p3-\d{3}'/g)].length;
cek('pintu3-data 100 judul', toCount === 100, toCount);

TEMAK6.forEach((t, i) => {
  const re = new RegExp('    ' + t + ": \\{ glif: \\['([^']*)', '([^']*)', '([^']*)'\\]");
  const m = main.match(re);
  cek('TEMA_CFG glif ok: ' + t, !!m);
  if (m) m.slice(1).forEach(g => cek('glif langit ASCII: ' + g, /^[\x20-\x7E]+$/.test(g)));
});

console.log(`\nvalidasi_p3k6: ${ok} OK, ${gagal} GAGAL`);
process.exit(gagal ? 1 : 0);
