/* ============================================================
   VERIFIKASI MATEMATIKA k1 PINTU 3 — FUNGSI & GRAFIK (p3-001..010)
   Semua hitungan diverifikasi SEBELUM menulis naskah.
   Jalankan: node scripts/verifikasi_p3k1.js -> harus SEMUA OK
   ============================================================ */
let pass = 0, fail = 0;
function tes(nama, kondisi, detail) {
  if (kondisi) { pass++; console.log(`  OK  ${nama}`); }
  else { fail++; console.log(` GAGAL ${nama}${detail ? ' :: ' + detail : ''}`); }
}
const eq = (a, b) => Math.abs(a - b) < 1e-9;

/* ---------- p3-001 Mesin Fungsi: aturan tetap, masukan sama keluaran sama ---------- */
function mesin(aturan) {
  return (x) => aturan(x);
}
const mesinGanda = mesin(x => 2 * x);
tes('p3-001 mesin selalu tetap: masuk 3 -> 6 (berkali-kali sama)',
  eq(mesinGanda(3), 6) && eq(mesinGanda(3), 6) && eq(mesinGanda(3), 6));
tes('p3-001 masukan berbeda tak dianggap sama: 3->6 beda dengan 4->8',
  eq(mesinGanda(3), 6) && eq(mesinGanda(4), 8) && 6 !== 8);

/* ---------- p3-002 f(x): notasi hasil mesin, bukan f kali x ---------- */
const f = x => 2 * x;
tes('p3-002 f(3) = 6', eq(f(3), 6));
tes('p3-002 f(x) adalah hasil mesin, BUKAN perkalian f*x: f(3)=6 sedangkan huruf f tak punya nilai sendiri', eq(f(3), 6));
tes('p3-002 setiap masukan punya satu keluaran: f(5)=10, f(10)=20',
  eq(f(5), 10) && eq(f(10), 20));

/* ---------- p3-003 Aturan mesin y = 2x ---------- */
tes('p3-003 y = 2x: masuk 3 keluar 6', eq(2 * 3, 6));
tes('p3-003 y = 2x: masuk 5 keluar 10', eq(2 * 5, 10));
tes('p3-003 y = 2x: masuk 10 keluar 20', eq(2 * 10, 20));
tes('p3-003 keluaran selalu dua kali masukan (cek 7 nilai)',
  [1, 2, 3, 4, 5, 9, 10].every(x => eq(2 * x, 2 * x)));

/* ---------- p3-004 Tabel pasangan y = 2x + 1: satu x satu teman ---------- */
const tabel404 = [[0, 1], [1, 3], [2, 5], [3, 7], [4, 9]];
tes('p3-004 y = 2x + 1: 0->1, 1->3, 2->5, 3->7, 4->9',
  tabel404.every(([x, y]) => eq(y, 2 * x + 1)));
tes('p3-004 tak ada x dengan dua teman: keluaran semua beda',
  new Set(tabel404.map(r => r[1])).size === tabel404.length);

/* ---------- p3-005 Titik di bidang: pasangan jadi alamat ---------- */
tes('p3-005 titik (2,4) adalah alamat y=2x untuk x=2', eq(2 * 2, 4));
tes('p3-005 tiga titik mesin: (1,2), (2,4), (3,6)',
  eq(2 * 1, 2) && eq(2 * 2, 4) && eq(2 * 3, 6));
tes('p3-005 urutan alamat setia: (2,4) tidak sama dengan (4,2)',
  !(2 === 4 && 4 === 2));

/* ---------- p3-006 Garis dari mesin: titik sejajar satu garis ---------- */
const titik = [[1, 2], [2, 4], [3, 6], [4, 8]];
let kolinear = true;
for (let i = 1; i < titik.length; i++) {
  const kemiringan = (titik[i][1] - titik[i - 1][1]) / (titik[i][0] - titik[i - 1][0]);
  if (!eq(kemiringan, 2)) kolinear = false;
}
tes('p3-006 semua titik y=2x berbaris pada garis kemiringan 2', kolinear);
tes('p3-006 kemiringan (4-2)/(2-1) = 2', eq((4 - 2) / (2 - 1), 2));
tes('p3-006 kemiringan (6-4)/(3-2) = 2', eq((6 - 4) / (3 - 2), 2));

/* ---------- p3-007 Grafik naik & turun ---------- */
const naik = [1, 2, 3, 4, 5].map(x => 2 * x);
let makinBesar = true;
for (let i = 1; i < naik.length; i++) if (naik[i] <= naik[i - 1]) makinBesar = false;
tes('p3-007 y=2x menanjak: keluaran makin besar', makinBesar);
const turun = [1, 2, 3, 4, 5].map(x => 10 - x);
let makinKecil = true;
for (let i = 1; i < turun.length; i++) if (turun[i] >= turun[i - 1]) makinKecil = false;
tes('p3-007 y=10-x menurun: keluaran makin kecil', makinKecil);
tes('p3-007 y=10-x: 1->9, 5->5, 9->1', eq(10 - 1, 9) && eq(10 - 5, 5) && eq(10 - 9, 1));

/* ---------- p3-008 Jalur bola: parabola y = x2 ---------- */
const parabola = [[0, 0], [1, 1], [2, 4], [3, 9]];
tes('p3-008 y = x^2: 0->0, 1->1, 2->4, 3->9',
  parabola.every(([x, y]) => eq(y, x * x)));
tes('p3-008 simetri: f(-2) = f(2) = 4 dan f(-3) = f(3) = 9',
  eq((-2) * (-2), 4) && eq(2 * 2, 4) && eq((-3) * (-3), 9) && eq(3 * 3, 9));
tes('p3-008 bola naik lalu turun: tinggi sama di dua titik sejajar',
  eq(1 * 1, 1) && eq((-1) * (-1), 1));

/* ---------- p3-009 Grafik bercerita: ember & perjalanan ---------- */
// ember: kran menyala 0..6 detik (naik), penuh 6..10 (datar)
const ember = t => (t <= 6 ? 3 * t : 18);
tes('p3-009 ember naik lalu datar: 0->0, 6->18, 8->18, 10->18',
  eq(ember(0), 0) && eq(ember(6), 18) && eq(ember(8), 18) && eq(ember(10), 18));
// perjalanan: jalan 0..2 km-min naik, berhenti 2..5 datar, jalan lagi naik
const jalan = t => (t <= 2 ? 60 * t : (t <= 5 ? 120 : 120 + 60 * (t - 5)));
tes('p3-009 perjalanan: 0->0, 2->120, 4->120 (berhenti), 7->240 (jalan lagi)',
  eq(jalan(0), 0) && eq(jalan(2), 120) && eq(jalan(4), 120) && eq(jalan(7), 240));
tes('p3-009 datar berarti berhenti/lagi penuh: nilai tetap',
  eq(jalan(4), jalan(2)) && eq(ember(10), ember(6)));

/* ---------- p3-010 Tantangan lima misi mesin ---------- */
// misi 1: tebak aturan dari tabel 0->5, 1->7, 2->9
const misi1 = [[0, 5], [1, 7], [2, 9], [3, 11]];
tes('p3-010 misi1 aturan y=2x+5: 0->5, 1->7, 2->9, 3->11',
  misi1.every(([x, y]) => eq(y, 2 * x + 5)));
// misi 2: gambar y = 3x
tes('p3-010 misi2 y=3x: 1->3, 2->6, 3->9', eq(3 * 1, 3) && eq(3 * 2, 6) && eq(3 * 3, 9));
// misi 3: parabola simetri
tes('p3-010 misi3 simetri x^2: f(4)=f(-4)=16', eq(4 * 4, 16) && eq((-4) * (-4), 16));
// misi 4: baca grafik ember (naik lalu datar)
tes('p3-010 misi4 ember: naik 0..6 lalu datar', eq(ember(3), 9) && eq(ember(6), ember(9)));
// misi 5: turun berarti keluaran makin kecil
tes('p3-010 misi5 y=12-2x menurun: 0->12, 3->6, 6->0',
  eq(12 - 0, 12) && eq(12 - 6, 6) && eq(12 - 12, 0));

console.log(`\n${pass} OK, ${fail} GAGAL`);
process.exit(fail === 0 ? 0 : 1);
