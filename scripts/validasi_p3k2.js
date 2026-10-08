const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', 'akiomidaspace', 'js');
let pass = 0, fail = 0;
function tes(nama, kondisi, detail) {
  if (kondisi) { pass++; console.log(`  OK  ${nama}`); }
  else { fail++; console.log(` GAGAL ${nama}${detail ? ' :: ' + detail : ''}`); }
}

const cer = fs.readFileSync(path.join(R, 'cerita-data.js'), 'utf8');
const pmain = fs.readFileSync(path.join(R, 'pelajaran-main.js'), 'utf8');
const p3 = fs.readFileSync(path.join(R, 'pintu3-data.js'), 'utf8');

function ambilNaskah(id) {
  const re = new RegExp("'" + id + "': \\{([\\s\\S]*?)\\n    \\},");
  const m = cer.match(re);
  return m ? m[1] : null;
}
const idsP3 = Array.from({ length: 10 }, (_, i) => 'p3-' + String(i + 11).padStart(3, '0'));

const temaBaru = [], objekBaru = [], glifBaru = [];
for (const id of idsP3) {
  const blok = ambilNaskah(id);
  tes(`${id} blok naskah ada`, !!blok);
  if (!blok) continue;
  const tema = (blok.match(/tema: '([a-zA-Z]+)'/) || [])[1];
  const glif = (blok.match(/glif: '([^']+)'/) || [])[1];
  const objek = [...blok.matchAll(/objek: '([a-zA-Z]+)'/g)].map(x => x[1]);
  const teks = [...blok.matchAll(/teks: '([^']+)'/g)].map(x => x[1]);
  temaBaru.push(tema); glifBaru.push(glif);
  objekBaru.push(...objek.filter(o => o !== 'tugu'));

  tes(`${id} tema ada: ${tema}`, !!tema);
  tes(`${id} glif ada: ${glif}`, !!glif);
  tes(`${id} tepat 5 stasiun`, objek.length === 5, 'dapat ' + objek.length);
  tes(`${id} stasiun akhir = tugu + akhir:true`, /objek: 'tugu', akhir: true/.test(blok));
  const tuguTeks = teks[teks.length - 1] || '';
  tes(`${id} payoff 'Owalah, ternyata begini toh' di tugu`, tuguTeks.includes('Owalah, ternyata begini toh'));
  tes(`${id} tugu berakhir 'Mudah, bukan?'`, tuguTeks.trim().endsWith("Mudah, bukan?"));
  tes(`${id} tiap teks >= 3 kalimat`, teks.every(t => t.split(/[.?!]\s/).length >= 3));
  tes(`${id} tema terdaftar di TEMA_CFG`, pmain.includes(tema + ': { glif:'));
  tes(`${id} tema ada di AMB_CFG`, new RegExp(tema + ": \\{ jenis:").test(pmain));
  tes(`${id} tema punya blok latar`, pmain.includes(`TEMA_NAMA === '${tema}'`));
  for (const o of objek.filter(o => o !== 'tugu')) {
    tes(`${id} objek '${o}' di registry`, new RegExp('\\b' + o + ': gambar').test(pmain));
    tes(`${id} objek '${o}' di PARTIKEL_OBJEK`, new RegExp('\\b' + o + ": '").test(pmain));
  }
}

tes('10 tema unik dalam batch', new Set(temaBaru).size === 10, temaBaru.join(','));
tes('10 glif unik dalam batch', new Set(glifBaru).size === 10, glifBaru.join(','));
tes('40 objek unik dalam batch', new Set(objekBaru).size === 40);
tes('nama objek tak bentrok dengan seluruh naskah lama', (() => {
  const semuaLama = [...cer.matchAll(/objek: '([a-zA-Z]+)'/g)].map(x => x[1]);
  const setLama = new Set(semuaLama);
  return objekBaru.every(o => !setLama.has(o) || semuaLama.filter(x => x === o).length === 1);
})());

const TERLARANG = ['ramal', 'meramal', 'ramalan', 'numerologi', 'prediksi', 'takdir', 'peruntungan', 'nasib', 'masa depan', 'zodiak', 'horoskop', 'dukun', 'jimat', 'mantra', 'tarot'];
const teksBatch = idsP3.map(id => ambilNaskah(id) || '').join(' ');
let bersih = true;
for (const kata of TERLARANG) if (teksBatch.toLowerCase().includes(kata)) { bersih = false; console.log('   kena:', kata); }
tes('batch baru bebas kata terlarang', bersih);
tes('frasa pelindung "hitungan itu hanya alat" hadir di batch', teksBatch.toLowerCase().includes('hitungan itu hanya alat'));
tes('frasa "hitungan itu hanya alat" muncul minimal 3x di batch', (teksBatch.toLowerCase().match(/hitungan itu hanya alat/g) || []).length >= 3);

const semuaId = [...cer.matchAll(/'(p\d-\d{3})': \{/g)].map(m => m[1]);
tes('total naskah = 220', semuaId.length === 220, 'dapat ' + semuaId.length);
tes('p1 utuh 100', semuaId.filter(i => i.startsWith('p1-')).length === 100);
tes('p2 utuh 100', semuaId.filter(i => i.startsWith('p2-')).length === 100);
tes('p3 utuh 20', semuaId.filter(i => i.startsWith('p3-')).length === 20);

let semuaLamaUtuh = true;
for (const id of semuaId.filter(i => !idsP3.includes(i))) {
  const blok = ambilNaskah(id);
  if (!blok || !/objek: 'tugu', akhir: true/.test(blok) || !blok.includes("Mudah, bukan?")) {
    semuaLamaUtuh = false; console.log('   regresi:', id);
  }
}
tes('seluruh 210 naskah lama tetap utuh (tugu + Mudah bukan?)', semuaLamaUtuh);

const judulP3 = [...p3.matchAll(/id: 'p3-(\d{3})', k: (\d+), n: (\d+)/g)];
tes('pintu3-data memuat 100 judul', judulP3.length === 100, 'dapat ' + judulP3.length);
const teaserP3 = [...p3.matchAll(/teaser: '([^']+)'/g)].map(x => x[1]);
tes('pintu3-data: 100 teaser', teaserP3.length === 100);
tes('teaser pintu3 bebas kata terlarang', !TERLARANG.some(k => teaserP3.join(' ').toLowerCase().includes(k)));

/* ---------- mesin pelajaran: resolusi P3 ---------- */
tes('pelajaran-main.js: apakahP3 terpasang', pmain.includes("const apakahP3 = idAwal.indexOf('p3-') === 0 && window.P3"));
tes('pelajaran-main.js: DUNIA_ASAL pegunungan-pola-dunia.html', pmain.includes("'pegunungan-pola-dunia.html'"));
tes('pelajaran-main.js: NAMA_PINTU Pintu 3', pmain.includes("apakahP3 ? 'Pintu 3'"));

/* ---------- angka kunci matematika hadir di teks ---------- */
const kunci = ['2, 4, 6, 8, 10, 12', '5, 8, 11, 14', '3 × 100 + 1 = 301', '5050', '50 × 101', '1 + 2 + 4 + 8 + 16 = 31', '1, 3, 6, 10', '1, 4, 9, 16', '2024', '2 × 50 + 3 = 103'];
for (const k of kunci) tes(`teks memuat angka kunci "${k}"`, teksBatch.includes(k));

console.log(`\n${pass} OK, ${fail} GAGAL`);
process.exit(fail === 0 ? 0 : 1);
