/* verifikasi_p3k4.js — cek SEMUA angka k4 Matriks & Sistem Persamaan SEBELUM menulis naskah.
   Semua contoh di naskah p3-031..040 harus lolos di sini dulu. */
let ok = 0, gagal = 0;
function cek(nama, syarat, nilai) {
  if (syarat) { ok++; }
  else { gagal++; console.log('GAGAL:', nama, '=>', JSON.stringify(nilai)); }
}

/* ---------- helper matriks ---------- */
function kaliSkalar(k, M) { return M.map(b => b.map(v => k * v)); }
function jumlah(A, B) { return A.map((b, i) => b.map((v, j) => v + B[i][j])); }
function kali(A, B) {
  const r = A.length, c = B[0].length, m = B.length;
  const C = [];
  for (let i = 0; i < r; i++) { C.push([]); for (let j = 0; j < c; j++) { let s = 0; for (let k = 0; k < m; k++) s += A[i][k] * B[k][j]; C[i].push(s); } }
  return C;
}

/* ---------- p3-031 · papan skor 2x3 ---------- */
const skor = [[4, 7, 2], [9, 1, 5]];
cek('031 ukuran 2 baris', skor.length === 2, skor.length);
cek('031 ukuran 3 kolom', skor[0].length === 3, skor[0].length);
cek('031 total Tim A = 13', skor[0][0] + skor[0][1] + skor[0][2] === 13, skor[0]);
cek('031 total Tim B = 15', skor[1][0] + skor[1][1] + skor[1][2] === 15, skor[1]);
cek('031 Tim B menang 15>13', skor[1][0] + skor[1][1] + skor[1][2] > skor[0][0] + skor[0][1] + skor[0][2], skor);

/* ---------- p3-032 · alamat baris-kolom (penginapan 2 lantai x 3 kamar) ---------- */
const peng = [[5, 9, 3], [7, 2, 8]];
cek('032 baris2 kolom3 = 8', peng[1][2] === 8, peng[1][2]);
cek('032 baris1 kolom2 = 9', peng[0][1] === 9, peng[0][1]);
cek('032 tukar alamat beda isi (b11=7 vs b23=8)', peng[1][0] !== peng[1][2], peng);

/* ---------- p3-033 · penjumlahan sejawat ---------- */
const A33 = [[2, 4], [1, 3]], B33 = [[1, 0], [2, 2]];
const J33 = jumlah(A33, B33);
cek('033 2+1=3', J33[0][0] === 3, J33[0][0]);
cek('033 4+0=4', J33[0][1] === 4, J33[0][1]);
cek('033 1+2=3', J33[1][0] === 3, J33[1][0]);
cek('033 3+2=5', J33[1][1] === 5, J33[1][1]);
cek('033 hasil penuh [[3,4],[3,5]]', JSON.stringify(J33) === '[[3,4],[3,5]]', J33);
// ukuran beda tak bisa dijumlah (2x3 vs 2x2)
cek('033 2x3 vs 2x2 kolom beda', skor[0].length !== A33[0].length, [skor[0].length, A33[0].length]);

/* ---------- p3-034 · penggandaan skalar ---------- */
const M34 = [[3, 1], [2, 4]];
const G34 = kaliSkalar(2, M34);
cek('034 2x3=6', G34[0][0] === 6, G34[0][0]);
cek('034 2x1=2', G34[0][1] === 2, G34[0][1]);
cek('034 2x2=4', G34[1][0] === 4, G34[1][0]);
cek('034 2x4=8', G34[1][1] === 8, G34[1][1]);
cek('034 hasil penuh [[6,2],[4,8]]', JSON.stringify(G34) === '[[6,2],[4,8]]', G34);

/* ---------- p3-035 · perkalian matriks ---------- */
const A35 = [[1, 2], [3, 4]], B35 = [[5, 6], [7, 8]];
const K35 = kali(A35, B35);
cek('035 baris1xkolom1 = 1x5+2x7 = 19', K35[0][0] === 1 * 5 + 2 * 7 && K35[0][0] === 19, K35[0][0]);
cek('035 baris1xkolom2 = 1x6+2x8 = 22', K35[0][1] === 22, K35[0][1]);
cek('035 baris2xkolom1 = 3x5+4x7 = 43', K35[1][0] === 43, K35[1][0]);
cek('035 baris2xkolom2 = 3x6+4x8 = 50', K35[1][1] === 50, K35[1][1]);
cek('035 hasil penuh [[19,22],[43,50]]', JSON.stringify(K35) === '[[19,22],[43,50]]', K35);
// TWIST: AxB != BxA
const BA35 = kali(B35, A35);
cek('035 BxA kotak1 = 5x1+6x3 = 23', BA35[0][0] === 5 * 1 + 6 * 3 && BA35[0][0] === 23, BA35[0][0]);
cek('035 AxB != BxA', JSON.stringify(K35) !== JSON.stringify(BA35), [K35, BA35]);
cek('035 19 bukan 23', K35[0][0] !== BA35[0][0], [K35[0][0], BA35[0][0]]);
// baris menyapa kolom satuan (misi p3-040)
const baris23 = [2, 3], kolom45 = [[4], [5]];
const sapa = baris23[0] * kolom45[0][0] + baris23[1] * kolom45[1][0];
cek('035/040 baris[2 3]x kolom[4;5] = 8+15 = 23', sapa === 23, sapa);

/* ---------- p3-036 · sistem x+y=7, x-y=1 ---------- */
// cara: jumlahkan kedua persamaan -> 2x = 8 -> x = 4, y = 3
const x36 = (7 + 1) / 2, y36 = 7 - x36;
cek('036 x = 4', x36 === 4, x36);
cek('036 y = 3', y36 === 3, y36);
cek('036 x+y=7 benar', x36 + y36 === 7, x36 + y36);
cek('036 x-y=1 benar', x36 - y36 === 1, x36 - y36);
cek('036 kakak 4 lebih tua dari adik 3', x36 > y36, [x36, y36]);

/* ---------- p3-037 · titik temu y=2x dan y=x+2 ---------- */
// 2x = x + 2 -> x = 2, y = 4
const x37 = 2, y37a = 2 * x37, y37b = x37 + 2;
cek('037 y=2x di x=2 -> 4', y37a === 4, y37a);
cek('037 y=x+2 di x=2 -> 4', y37b === 4, y37b);
cek('037 kedua jalan setuju di (2,4)', y37a === y37b && y37a === 4, [x37, y37a]);
// cek garis tak setuju di titik lain (x=0: 0 vs 2; x=1: 2 vs 3)
for (const xx of [0, 1, 3, 5]) {
  cek('037 x=' + xx + ' bukan titik temu', 2 * xx !== xx + 2, [xx, 2 * xx, xx + 2]);
}
// twist sejajar: y=2x dan y=2x+3 tak pernah bertemu
cek('037 sejajar tak bertemu', 2 * x37 !== 2 * x37 + 3, [2 * x37, 2 * x37 + 3]);

/* ---------- p3-038 · matriks data 3x2 ---------- */
// baris = Ayu, Budi, Citra; kolom = Matematika, Menggambar
const nilai = [[8, 7], [9, 6], [7, 8]];
cek('038 ukuran 3 baris', nilai.length === 3, nilai.length);
cek('038 ukuran 2 kolom', nilai[0].length === 2, nilai[0].length);
cek('038 baris2 kolom1 = 9 (Budi Matematika)', nilai[1][0] === 9, nilai[1][0]);
cek('038 jumlah kolom Matematika = 8+9+7 = 24', nilai[0][0] + nilai[1][0] + nilai[2][0] === 24, nilai[0][0] + nilai[1][0] + nilai[2][0]);
cek('038 jumlah kolom Menggambar = 7+6+8 = 21', nilai[0][1] + nilai[1][1] + nilai[2][1] === 21, nilai[0][1] + nilai[1][1] + nilai[2][1]);

/* ---------- p3-039 · tiga kotak A+B=3, B+C=5, A+C=4 ---------- */
const jumlahSemua = 3 + 5 + 4;                 // 12 = 2(A+B+C)
const totalSemua = jumlahSemua / 2;            // 6
const A39 = totalSemua - 5, B39 = totalSemua - 4, C39 = totalSemua - 3;
cek('039 jumlah semua timbangan = 12', jumlahSemua === 12, jumlahSemua);
cek('039 A+B+C = 6', totalSemua === 6, totalSemua);
cek('039 C = 6-3 = 3', C39 === 3, C39);
cek('039 B = 6-4 = 2', B39 === 2, B39);
cek('039 A = 6-5 = 1', A39 === 1, A39);
cek('039 A+B=3 benar', A39 + B39 === 3, A39 + B39);
cek('039 B+C=5 benar', B39 + C39 === 5, B39 + C39);
cek('039 A+C=4 benar', A39 + C39 === 4, A39 + C39);

/* ---------- p3-040 · lima misi puncak ---------- */
cek('040 misi1: skor baris2 kolom1 = 9', skor[1][0] === 9, skor[1][0]);
const m2 = jumlah([[2, 4], [1, 3]], [[1, 0], [2, 2]]);
cek('040 misi2: sejawat baris1 kolom1 = 3', m2[0][0] === 3, m2[0][0]);
cek('040 misi3: 2x[[3,1],[2,4]] = [[6,2],[4,8]]', JSON.stringify(kaliSkalar(2, M34)) === '[[6,2],[4,8]]', kaliSkalar(2, M34));
cek('040 misi4: 2x4+3x5 = 23', 2 * 4 + 3 * 5 === 23, 2 * 4 + 3 * 5);
cek('040 misi5: x=4 y=3', x36 === 4 && y36 === 3, [x36, y36]);
// total lapis misi3 utk cerita: 6+2+4+8 = 20
cek('040 isi semua kotak misi3 = 20', 6 + 2 + 4 + 8 === 20, 6 + 2 + 4 + 8);

/* ---------- konsistensi lintas naskah ---------- */
cek('x-skor papan 031 dipakai lagi di misi1 040', JSON.stringify(skor) === '[[4,7,2],[9,1,5]]', skor);
cek('pasangan 4-3 dari 036 dipakai di misi5 040', x36 === 4 && y36 === 3, [x36, y36]);
cek('sapaan 23 dari 035 dipakai di misi4 040', sapa === 23, sapa);

console.log(`\nverifikasi_p3k4: ${ok} OK, ${gagal} GAGAL`);
process.exit(gagal ? 1 : 0);
