/* ============================================================
   VALIDASI PROGRAMATIK BATCH 10 — p2-091..100 (k10 Peluang)
   Struktur naskah, tema/objek terdaftar, registry, partikel,
   regresi p1 + p2, anti-ramalan, kontrak 4-elemen.
   Jalankan: node scripts/validasi_p2batch10.js -> SEMUA OK
   ============================================================ */
const fs = require('fs');
const path = require('path');
let pass = 0, fail = 0;
function tes(nama, kondisi, detail) {
  if (kondisi) { pass++; console.log(`  OK  ${nama}`); }
  else { fail++; console.log(` GAGAL ${nama}${detail ? ' :: ' + detail : ''}`); }
}

const repo = path.join(__dirname, '..', 'akiomidaspace');
const ceritaSrc = fs.readFileSync(path.join(repo, 'js', 'cerita-data.js'), 'utf8');
const pelSrc = fs.readFileSync(path.join(repo, 'js', 'pelajaran-main.js'), 'utf8');

/* ---------- evaluasi cerita-data & pintu2-data (CERITA.untuk) ---------- */
const pintu2Src = fs.readFileSync(path.join(repo, 'js', 'pintu2-data.js'), 'utf8');
const pintu1Src = fs.readFileSync(path.join(repo, 'js', 'pintu1-data.js'), 'utf8');
const sandbox = {};
new Function('window', `
  const window_ = { KAMP: { KATEGORI: [] }, P1: { KATEGORI: [] } };
  ${pintu1Src}
  ${pintu2Src}
  ${ceritaSrc}
  return { P1: window_.P1, CERITA: window.CERITA };
`)(sandbox);
const CERITA = sandbox.CERITA;

const ids = [];
for (let i = 91; i <= 100; i++) ids.push('p2-' + String(i).padStart(3, '0'));
tes('10 id naskah baru ada di CERITA.untuk', ids.every(id => !!CERITA.untuk({ id })), ids.filter(id => !CERITA.untuk({ id })).join(','));

const TEMA_K10 = ['gerbangKemungkinan', 'lapanganKoin', 'mejaUlarTangga', 'puncakPasti',
  'festivalRoda', 'kiosKelereng', 'kelasPecahan', 'terasDuaKoin', 'terasMendung', 'balaiPeluang'];
const OBJEK_K10 = [
  'gerbangGarisNolSatu', 'penandaMustahil', 'penandaPasti', 'duniaDiAntara',
  'koinLemparKapten', 'sisiAngkaGambar', 'papanAdilDua', 'duaTimSetara',
  'papanUlarTangga', 'daduEnamSisi', 'enamKemungkinan', 'papanMainAdil',
  'matahariTimurPasti', 'koinBerdiriSulit', 'garisDuaUjung', 'papanAntaranya',
  'rodaPutarFestival', 'irisanMerahLebar', 'irisanBiruSempit', 'papanLuasIrisan',
  'kantongKelerengEmpat', 'kelerengMerahTiga', 'kelerengBiruSatu', 'papanTigaPerEmpat',
  'papanSemuaPecahan', 'kelerengEnamIsi', 'jumlahSelaluSatu', 'koinSetengahSetengah',
  'duaKoinLempar', 'daftarEmpatHasil', 'hasilCampurDua', 'papanDaftarDulu',
  'langitAwanGelap', 'sepuluhLangitLalu', 'payungSiapSedia', 'papanBacaTanda',
  'balaiJuaraPeluang', 'misiKoinDua', 'misiRodaBiru', 'misiKelerengLima', 'misiDuaKoinSeperempat',
];

/* ---------- struktur tiap naskah baru ---------- */
for (let b = 0; b < 10; b++) {
  const id = ids[b];
  const n = CERITA.untuk({ id });
  tes(`${id} tema k10`, n.tema === TEMA_K10[b], n.tema);
  tes(`${id} npc ada`, !!(n.npc && n.npc.glif && n.npc.ucap));
  tes(`${id} 5 stasiun (4 isi + tugu)`, n.stasiun.length === 5 || (id === 'p2-100' && n.stasiun.length === 6), String(n.stasiun.length));
  const isi = n.stasiun.filter(s => !s.akhir);
  const tugu = n.stasiun.find(s => s.akhir);
  const jumlahIsi = id === 'p2-100' ? 5 : 4;
  tes(`${id} ${jumlahIsi} stasiun isi`, isi.length === jumlahIsi, String(isi.length));
  tes(`${id} tugu akhir:true`, !!tugu && tugu.akhir === true);
  tes(`${id} tugu judul Owalah`, tugu && tugu.judul.includes('Owalah'));
  tes(`${id} tugu teks Owalah + Mudah, bukan?`, tugu && tugu.teks.includes('Owalah') && tugu.teks.includes('Mudah, bukan?'));
  for (const s of isi) {
    tes(`${id} st ${s.objek} teks>=200`, s.teks.length >= 200, String(s.teks.length));
    tes(`${id} st ${s.objek} objek terdaftar`, OBJEK_K10.includes(s.objek), s.objek);
    tes(`${id} st ${s.objek} judul ada`, !!s.judul);
  }
  // angka kunci peluang muncul dalam teks naskah
  const gabungTeks = n.stasiun.map(s => (s.judul || '') + ' ' + s.teks).join(' ');
  const kataKunci = {
    'p2-091': ['nol', 'satu'], 'p2-092': ['satu per dua'], 'p2-093': ['satu per enam'],
    'p2-094': ['pasti', 'mustahil'], 'p2-095': ['tiga per empat'], 'p2-096': ['tiga per empat'],
    'p2-097': ['tepat satu'], 'p2-098': ['EMPAT'], 'p2-099': ['empat per lima'], 'p2-100': ['tepat satu'],
  }[id];
  for (const k of kataKunci) tes(`${id} kata kunci '${k}'`, gabungTeks.includes(k));
}

/* ---------- TEMA_CFG + AMB_CFG + bakarLatar ---------- */
for (const t of TEMA_K10) {
  tes(`TEMA_CFG ada: ${t}`, pelSrc.includes(`${t}: { glif:`));
  tes(`AMB_CFG ada: ${t}`, pelSrc.includes(`${t}: { jenis:`));
  tes(`bakarLatar ada: ${t}`, pelSrc.includes(`TEMA_NAMA === '${t}'`));
}

/* ---------- fungsi objek terdefinisi & terdaftar ---------- */
for (const o of OBJEK_K10) {
  const fn = 'gambar' + o.charAt(0).toUpperCase() + o.slice(1);
  tes(`fungsi ${fn} terdefinisi`, new RegExp(`function ${fn}\\(`).test(pelSrc));
  tes(`registry ${o} terdaftar`, pelSrc.includes(`${o}: gambar`));
}
// tepat satu definisi per fungsi
for (const o of OBJEK_K10) {
  const fn = 'gambar' + o.charAt(0).toUpperCase() + o.slice(1);
  const hitung = (pelSrc.match(new RegExp(`function ${fn}\\(`, 'g')) || []).length;
  tes(`fungsi ${fn} tepat 1 definisi`, hitung === 1, String(hitung));
}

/* ---------- registry kunci nol duplikat ---------- */
const mRegistry = pelSrc.match(/const OBJEK_GAMBAR = \{([\s\S]*?)\n  \};/);
tes('registry OBJEK_GAMBAR terbaca', !!mRegistry);
if (mRegistry) {
  const kunci = [...mRegistry[1].matchAll(/([a-zA-Z0-9]+):\s*gambar[A-Za-z0-9]+/g)].map(m => m[1]);
  tes(`registry >= 806 kunci`, kunci.length >= 806, String(kunci.length));
  const dup = kunci.filter((k, i) => kunci.indexOf(k) !== i);
  tes('registry nol duplikat', dup.length === 0, dup.slice(0, 5).join(','));
  for (const o of OBJEK_K10) tes(`registry memuat ${o}`, kunci.includes(o));
}
const mPartikel = pelSrc.match(/const PARTIKEL_OBJEK = \{([\s\S]*?)\};/);
tes('PARTIKEL_OBJEK terbaca', !!mPartikel);
if (mPartikel) {
  const pk = [...mPartikel[1].matchAll(/([a-zA-Z0-9]+): '(asap|daun|kilau)'/g)].map(m => m[1]);
  tes(`partikel >= 308 kunci`, pk.length >= 308, String(pk.length));
  const dupP = pk.filter((k, i) => pk.indexOf(k) !== i);
  tes('partikel nol duplikat', dupP.length === 0, dupP.slice(0, 5).join(','));
  for (const o of OBJEK_K10) tes(`partikel memuat ${o}`, pk.includes(o));
}

/* ---------- nama tema anti-celah-grep ---------- */
const TERLARANG = ['ramal', 'sihir', 'sakti', 'sulap', 'nasib', 'takdir', 'jimat', 'weton',
  'zodiak', 'horoskop', 'numerolog', 'primbon', 'mantra', 'peruntungan', 'astrolog', 'prediksi'];
for (const t of TEMA_K10) {
  const low = t.toLowerCase();
  tes(`tema anti-celah ${t}`, !TERLARANG.some(w => low.includes(w)));
}
for (const o of OBJEK_K10) {
  const low = o.toLowerCase();
  tes(`objek anti-celah ${o}`, !TERLARANG.some(w => low.includes(w)));
}

/* ---------- ANTI-RAMALAN pada 10 naskah baru + seluruh 200 ---------- */
function bersihTeks(t) {
  const low = t.toLowerCase();
  return !TERLARANG.some(w => low.includes(w));
}
for (const id of ids) {
  const n = CERITA.untuk({ id });
  const semua = n.stasiun.map(s => (s.judul || '') + ' ' + s.teks).join(' ');
  tes(`${id} anti-ramalan`, bersihTeks(semua));
  // determinisme angka: tidak menjanjikan hasil
  tes(`${id} tidak menjanjikan pasti utk hal acak`, !semua.includes('dijamin pasti'));
}
// seluruh naskah (regresi global): ekstrak semua teks dari sumber
const semuaTeksNaskah = [...ceritaSrc.matchAll(/teks: '([^']*)'/g)].map(m => m[1]).join(' ')
  + ' ' + [...ceritaSrc.matchAll(/judul: '([^']*)'/g)].map(m => m[1]).join(' ')
  + ' ' + [...ceritaSrc.matchAll(/ucap: \[([^\]]*)\]/g)].map(m => m[1]).join(' ');
const pelanggaran = [];
for (const w of TERLARANG) {
  const re = new RegExp(w, 'i');
  if (re.test(semuaTeksNaskah)) {
    // cari konteks
    const idx = semuaTeksNaskah.toLowerCase().indexOf(w);
    pelanggaran.push(w + ' :: ...' + semuaTeksNaskah.slice(Math.max(0, idx - 30), idx + 40) + '...');
  }
}
tes('seluruh naskah anti-ramalan (kecuali negasi pelindung)', pelanggaran.length <= 1, pelanggaran.join(' | '));
if (pelanggaran.length === 1) {
  tes('satu-satunya pelanggaran = negasi pelindung "bukan mantra"', pelanggaran[0].includes('mantra') && /bukan mantra/i.test(pelanggaran[0]));
}

/* ---------- REGRESI: p1 100 naskah + p2 100 naskah ---------- */
let p1ok = 0, p2ok = 0;
for (let i = 1; i <= 100; i++) {
  const idP1 = 'p1-' + String(i).padStart(3, '0');
  const n1 = CERITA.untuk({ id: idP1 });
  if (n1 && n1.stasiun && n1.stasiun.some(s => s.akhir)) p1ok++;
  const idP2 = 'p2-' + String(i).padStart(3, '0');
  const n2 = CERITA.untuk({ id: idP2 });
  if (n2 && n2.stasiun && n2.stasiun.some(s => s.akhir)) p2ok++;
}
tes(`regresi p1: 100 tugu utuh (${p1ok})`, p1ok === 100);
tes(`regresi p2: 100 tugu utuh (${p2ok})`, p2ok === 100);

/* ---------- struktur P2 100 judul 10 penjuru ---------- */
const toP2 = [...pintu2Src.matchAll(/id: 'p2-(\d{3})', k: (\d+)/g)];
tes('P2 100 judul', toP2.length === 100, String(toP2.length));
const penjuru = new Set(toP2.map(m => m[2]));
tes('P2 10 penjuru', penjuru.size === 10, [...penjuru].join(','));

/* ---------- glif k10 unik lintas seluruh naskah ---------- */
const glifSemua = [...ceritaSrc.matchAll(/glif:\s*'([^']*)'/g)].map(m => m[1]);
const glifK10 = ['0-1', 'A/G', '1/6', '0 1', '3/4', '3M1B', '=1', 'A-G', '4/5', '10/10'];
for (const g of glifK10) {
  const hit = glifSemua.filter(x => x === g).length;
  tes(`glif '${g}' tepat 1 (hanya k10)`, hit === 1, String(hit));
}

/* ---------- chip html k10 ---------- */
const chipSrc = fs.readFileSync(path.join(repo, 'hutan-simbol-matematika.html'), 'utf8');
const mChip = chipSrc.match(/nomor">10<\/span>[\s\S]{0,300}chip (buka|segera)/);
tes('chip k10 ada', !!mChip);

/* ---------- RINGKASAN ---------- */
console.log(`\n===== HASIL: ${pass} OK, ${fail} GAGAL =====`);
if (fail > 0) { console.log('ADA TES GAGAL — PERBAIKI DULU!'); process.exit(1); }
console.log('VALIDASI BATCH 10 LULUS — naskah k10 utuh & bersih.');
