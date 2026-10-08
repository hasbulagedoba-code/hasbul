/* ============================================================
   AUDIT SYARIAH (aturan wajib Task 21) — SEBELUM batch Pintu 3
   Memeriksa SELURUH konten user-facing:
   - 199 naskah cerita-data.js (p1-001..p1-100, p2-001..p2-100)
   - 100 teaser pintu1-data.js + 100 teaser pintu2-data.js
   - Nama tema & nama objek (anti-celah grep)
   Kata terlarang: ramalan/numerologi/dst. Negasi pelindung
   'bukan mantra' di-whitelist (frama p1-095).
   Jalankan: node scripts/audit_syariah_p3.js -> HARUS NOL pelanggaran
   ============================================================ */
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', 'akiomidaspace', 'js');

const TERLARANG = [
  'ramal', 'meramal', 'ramalan', 'numerologi', 'numerology',
  'peramal', 'prediksi', 'takdir', 'peruntungan', 'nasib',
  'masa depan', 'ramal bintang', 'zodiak', 'horoskop',
  'angka keberuntungan', 'petunjuk gaib',
  'dukun', 'jimat', 'mantra', 'peramal nasib', 'tarot',
  'penglaris', 'khodam', 'supranatural', 'bawa sial',
  'meramali', 'tenung', 'meramal nasib', 'baca nasib',
];
// kata tunggal pendek: cocokkan dgn batas kata supaya tak menimpa
// substring tak bersalah (spesial≠sial, astronomi≠astro, misteri≠misti)
const TERLARANG_KECIL = ['sial', 'untung', 'bala', 'gaib', 'misti', 'astro', 'palmistry', 'tengkluk'];
function kena(rendah) {
  for (const kata of TERLARANG) if (rendah.includes(kata)) return kata;
  for (const kata of TERLARANG_KECIL) {
    const re = new RegExp('\\b' + kata + '\\b');
    if (re.test(rendah)) return kata;
  }
  return null;
}

function potong(src) {
  // pecah jadi kalimat: titik, tanya, seru
  return src.split(/[.?!]\s+/);
}

let pelanggaran = 0;
function cek(nama, kalimatArr, whitelist) {
  for (const kal of kalimatArr) {
    const rendah = kal.toLowerCase();
    const kena2 = kena(rendah);
    if (kena2) {
      // whitelist: kalimat pelindung eksplisit (negasi terbuka)
      if (whitelist && whitelist.some(w => rendah.includes(w))) continue;
      pelanggaran++;
      console.log(` PELANGGARAN [${nama}] "${kena2}" :: ${kal.slice(0, 120)}`);
    }
  }
}

/* ---------- 1. naskah cerita ---------- */
const cer = fs.readFileSync(path.join(R, 'cerita-data.js'), 'utf8');
const idNaskah = [...cer.matchAll(/'(p\d-\d{3})': \{/g)].map(m => m[1]);
console.log(`naskah ditemukan: ${idNaskah.length}`);
// potong per blok naskah agar pelanggaran bisa dilacak per id
const blokRe = /'(p\d-\d{3})': \{([\s\S]*?)(?=\n    \},?\n|\n    \}\n)/g;
let m, cekN = 0;
while ((m = blokRe.exec(cer)) !== null) {
  cekN++;
  const teks = m[2];
  const kalimat = potong(teks);
  cek(m[1], kalimat, ['bukan mantra', 'bukan alat', 'bukan untuk', 'tak kami ajarkan', 'haram']);
}
console.log(`blok naskah dipindai: ${cekN}`);

/* ---------- 2. teaser data pintu ---------- */
for (const f of ['pintu1-data.js', 'pintu2-data.js', 'pintu3-data.js']) {
  const src = fs.readFileSync(path.join(R, f), 'utf8');
  const teaser = [...src.matchAll(/teaser: '([^']+)'/g)].map(x => x[1]);
  cek(f, teaser, null);
  const judul = [...src.matchAll(/judul: '([^']+)'/g)].map(x => x[1]);
  cek(f + ' #judul', judul, null);
  console.log(`${f}: ${teaser.length} teaser + ${judul.length} judul dipindai`);
}

/* ---------- 3. nama tema & objek (anti-celah) ---------- */
const pmain = fs.readFileSync(path.join(R, 'pelajaran-main.js'), 'utf8');
const temaNama = [...pmain.matchAll(/else if \(TEMA_NAMA === '([a-zA-Z]+)'\)/g)].map(x => x[1]);
cek('#tema-latar', temaNama, null);
const objekNama = [...cer.matchAll(/objek: '([a-zA-Z]+)'/g)].map(x => x[1]);
cek('#objek', objekNama, null);
console.log(`tema latar: ${temaNama.length}, objek unik terpakai: ${new Set(objekNama).size}`);

/* ---------- 4. html statis wilayah ---------- */
const pages = ['kamp-angka-matematika.html', 'hutan-simbol-matematika.html', 'kamp-angka-dunia.html', 'hutan-simbol-dunia.html', 'pelajaran.html', 'index.html'];
for (const f of pages) {
  const src = fs.readFileSync(path.join(R, '..', f), 'utf8');
  cek(f, potong(src), null);
}

console.log(pelanggaran === 0 ? '\nAUDIT SYARIAH: NOL PELANGGARAN — aman lanjut.' : `\nAUDIT SYARIAH: ${pelanggaran} PELANGGARAN — wajib diperbaiki!`);
process.exit(pelanggaran === 0 ? 0 : 1);
