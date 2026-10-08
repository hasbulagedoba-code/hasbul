const fs = require('fs');
const path = require('path');
let pass = 0, fail = 0;
function tes(nama, kondisi, detail) {
  if (kondisi) { pass++; console.log(`  OK  ${nama}`); }
  else { fail++; console.log(` GAGAL ${nama}${detail ? ' :: ' + detail : ''}`); }
}
const eq = (a, b) => Math.abs(a - b) < 1e-9;

tes('p2-091 nol = mustahil (tak pernah terjadi)', 0 === 0);
tes('p2-091 satu = pasti (selalu terjadi)', 1 === 1);
tes('p2-091 garis 0..1: 0 < 1', 0 < 1);

const sisiKoin = ['angka', 'gambar'];
tes('p2-092 koin punya tepat 2 sisi', sisiKoin.length === 2);
tes('p2-092 peluang angka = 1/2', eq(1 / 2, 0.5));
tes('p2-092 peluang gambar = 1/2', eq(1 / 2, 0.5));
tes('p2-092 jumlah semua peluang = 1/2+1/2 = 1', eq(1 / 2 + 1 / 2, 1));

tes('p2-092 adil: P(A) = P(B) = 1/2', eq(1 / 2, 1 / 2));

const sisiDadu = [1, 2, 3, 4, 5, 6];
tes('p2-093 dadu punya tepat 6 sisi', sisiDadu.length === 6);
tes('p2-093 peluang tiap sisi = 1/6', eq(1 / 6, 0.1666666666666667));
tes('p2-093 jumlah semua sisi: 6 x 1/6 = 1', eq(6 * (1 / 6), 1));
tes('p2-093 angka 4 muncul 1 dari 6 kemungkinan', sisiDadu.filter(s => s === 4).length === 1);
tes('p2-093 tak ada sisi istimewa: semua 1/6',
  sisiDadu.every(() => eq(1 / 6, 1 / 6)));

tes('p2-094 matahari terbit dari timur = peluang 1 (pasti)', 1 === 1);
tes('p2-094 koin berdiri tegak ~ peluang 0 (hampir mustahil)', eq(0, 0));
tes('p2-094 0 < peluang koin muncul (1/2) < 1', 0 < 0.5 && 0.5 < 1);

const roda = { merah: 3, biru: 1 };
tes('p2-095 roda terbagi 4 perempat', roda.merah + roda.biru === 4);
tes('p2-095 peluang merah = 3/4', eq(roda.merah / 4, 0.75));
tes('p2-095 peluang biru = 1/4', eq(roda.biru / 4, 0.25));
tes('p2-095 3/4 + 1/4 = 1 (roda penuh)', eq(3 / 4 + 1 / 4, 1));
tes('p2-095 irisan merah lebih lebar -> lebih sering', roda.merah > roda.biru);

tes('p2-095 irisan merah 270 derajat, biru 90 derajat',
  eq(roda.merah / 4 * 360, 270) && eq(roda.biru / 4 * 360, 90));

const k96 = { merah: 3, biru: 1 };
const tot96 = k96.merah + k96.biru;
tes('p2-096 total kelereng = 4', tot96 === 4);
tes('p2-096 peluang merah = 3/4', eq(k96.merah / tot96, 0.75));
tes('p2-096 peluang biru = 1/4', eq(k96.biru / tot96, 0.25));
tes('p2-096 3/4 + 1/4 = 1 (tak ada yang kabur)', eq(k96.merah / tot96 + k96.biru / tot96, 1));

const k97 = { merah: 2, biru: 4 };
const tot97 = k97.merah + k97.biru;
tes('p2-097 total kelereng = 6', tot97 === 6);
tes('p2-097 peluang merah = 2/6', eq(k97.merah / tot97, 2 / 6));
tes('p2-097 peluang biru = 4/6', eq(k97.biru / tot97, 4 / 6));
tes('p2-097 2/6 + 4/6 = 1', eq(2 / 6 + 4 / 6, 1));

const semuaP = [0.5, 1 / 6, 0.75, 0.25, 2 / 6, 4 / 6];
tes('p2-097 semua peluang di pagar 0..1', semuaP.every(p => p > 0 && p < 1));

tes('p2-097 7/6 > 1 tidak sah sebagai peluang', 7 / 6 > 1);

const hasilDuaKoin = ['A-A', 'A-G', 'G-A', 'G-G'];
tes('p2-098 daftar dua koin = 4 hasil (bukan 3!)', hasilDuaKoin.length === 4);
tes('p2-098 A-G dan G-A adalah dua hasil berbeda', hasilDuaKoin[1] !== hasilDuaKoin[2]);
tes('p2-098 peluang dua angka = 1/4', eq(1 / 4, 0.25));
tes('p2-098 peluang campur = 2/4', eq(2 / 4, 0.5));
tes('p2-098 campur 2x lipat dua angka', eq(2 / 4, 2 * (1 / 4)));
tes('p2-098 1/4 + 2/4 + 1/4 = 1', eq(1 / 4 + 2 / 4 + 1 / 4, 1));

tes('p2-098 2 koin x 2 sisi = 4 daftar', 2 * 2 === 4);

const catat99 = { hujan: 8, cerah: 2 };
const tot99 = catat99.hujan + catat99.cerah;
tes('p2-099 catatan 10 sore mendung', tot99 === 10);
tes('p2-099 8/10 = 4/5', eq(8 / 10, 4 / 5));
tes('p2-099 4/5 = 0.8 (dekat ke 1, bukan 1)', 0.8 > 0.5 && 0.8 < 1);
tes('p2-099 8/10 + 2/10 = 1', eq(8 / 10 + 2 / 10, 1));
tes('p2-0999 peluang cerah 2/10 tak pernah nol', eq(catat99.cerah / tot99, 0.2) && catat99.cerah / tot99 > 0);

tes('p2-100 misi1 koin = 1/2', eq(1 / 2, 0.5));
tes('p2-100 misi2 dadu enam = 1/6', eq(1 / 6, 1 / 6));

tes('p2-100 misi3 1/4 + 3/4 = 1', eq(1 / 4 + 3 / 4, 1));

const k100 = { merah: 2, biru: 3 };
const totK100 = k100.merah + k100.biru;
tes('p2-100 misi4 total 5 kelereng', totK100 === 5);
tes('p2-100 misi4 peluang merah 2/5 & biru 3/5',
  eq(k100.merah / totK100, 2 / 5) && eq(k100.biru / totK100, 3 / 5));
tes('p2-100 misi4 2/5 + 3/5 = 1', eq(2 / 5 + 3 / 5, 1));

tes('p2-100 misi5 dua angka = 1/4 & daftar 4', eq(1 / 4, 0.25) && hasilDuaKoin.length === 4);

tes('p2-100 10 penjuru x 10 judul = 100 judul P2', 10 * 10 === 100);

const repo = path.join(__dirname, '..', 'akiomidaspace');
const cerita = fs.readFileSync(path.join(repo, 'js', 'cerita-data.js'), 'utf8');
const glifSemua = [...cerita.matchAll(/glif:\s*'([^']*)'/g)].map(m => m[1]);
const kandidatGlif = ['0-1', 'A/G', '1/6', '0 1', '3/4', '3M1B', '=1', 'A-G', '4/5', '10/10'];
console.log(`\nGlif terpakai saat ini: ${glifSemua.length}`);
for (const g of kandidatGlif) {
  tes(`glif k10 unik: '${g}'`, !glifSemua.includes(g), glifSemua.includes(g) ? 'SUDAH DIPAKAI' : '');
}
tes('glif dalam naskah kandidat tidak saling bentrok', new Set(kandidatGlif).size === 10);

/* ---------- ANTI-CELAH-GREP: nama tema & objek bebas substring terlarang ---------- */
const TERLARANG = ['ramal', 'sihir', 'sakti', 'sulap', 'nasib', 'takdir', 'jimat', 'weton',
  'zodiak', 'horoskop', 'numerolog', 'primbon', 'mantra', 'peruntungan', 'astrolog', 'prediksi'];
const temaK10 = ['gerbangKemungkinan', 'lapanganKoin', 'mejaUlarTangga', 'puncakPasti',
  'festivalRoda', 'kiosKelereng', 'kelasPecahan', 'terasDuaKoin', 'terasMendung', 'balaiPeluang'];
const objekK10 = [
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
function bersih(nama) { const low = nama.toLowerCase(); return !TERLARANG.some(t => low.includes(t)); }
for (const t of temaK10) tes(`tema anti-celah: ${t}`, bersih(t));
for (const o of objekK10) tes(`objek anti-celah: ${o}`, bersih(o));

/* ---------- KEUNIKAN NAMA: tidak boleh sudah ada di repo ---------- */
const pelajaran = fs.readFileSync(path.join(repo, 'js', 'pelajaran-main.js'), 'utf8');
const pintu2data = fs.readFileSync(path.join(repo, 'js', 'pintu2-data.js'), 'utf8');
const pintu1data = fs.readFileSync(path.join(repo, 'js', 'pintu1-data.js'), 'utf8');
function sudahAda(nama) {
  const re = new RegExp(`\\b${nama}\\b`);
  return re.test(cerita) || re.test(pelajaran) || re.test(pintu2data) || re.test(pintu1data);
}
for (const t of temaK10) tes(`tema belum terpakai: ${t}`, !sudahAda(t));
for (const o of objekK10) tes(`objek belum terpakai: ${o}`, !sudahAda(o));
tes('nama tema tidak saling sama', new Set(temaK10).size === 10);
tes('nama objek tidak saling sama', new Set(objekK10).size === objekK10.length);

/* ---------- RINGKASAN ---------- */
console.log(`\n===== HASIL: ${pass} OK, ${fail} GAGAL =====`);
if (fail > 0) { console.log('ADA TES GAGAL — JANGAN MENULIS NASKAH DULU!'); process.exit(1); }
console.log('SEMUA MATEMATIKA k10 VALID — aman menulis naskah.');
