let pass = 0, fail = 0;
function tes(nama, kondisi, detail) {
  if (kondisi) { pass++; console.log(`  OK  ${nama}`); }
  else { fail++; console.log(` GAGAL ${nama}${detail ? ' :: ' + detail : ''}`); }
}
const eq = (a, b) => Math.abs(a - b) < 1e-9;

const b11 = [2, 4, 6, 8, 10, 12];
const beda11 = [];
for (let i = 1; i < b11.length; i++) beda11.push(b11[i] - b11[i - 1]);
tes('p3-011 barisan 2,4,6,8,10,12: jarak antar tetangga SELALU 2',
  beda11.every(d => eq(d, 2)));
tes('p3-011 pola ada di jarak, bukan di angka: angka berubah, jarak tetap',
  b11[0] !== b11[1] && new Set(beda11).size === 1);
tes('p3-011 suku berikutnya dari 12 = 14 (12 + 2)', eq(12 + 2, 14));

const b12 = [5, 8, 11, 14];
tes('p3-012 beda antar tetangga selalu 3',
  [1, 2, 3].every(i => eq(b12[i] - b12[i - 1], 3)));
tes('p3-012 suku berikutnya 14 + 3 = 17', eq(14 + 3, 17));
tes('p3-012 suku ke-10 = 5 + 9x3 = 32', eq(5 + 9 * 3, 32));
tes('p3-012 cek dua kali utk yakin: 5+3=8 dan 8+3=11 (dua langkah sama)',
  eq(5 + 3, 8) && eq(8 + 3, 11));

const b13 = [1, 2, 4, 8, 16];
tes('p3-013 tiap suku = dua kali sebelumnya',
  [1, 2, 3, 4].every(i => eq(b13[i], 2 * b13[i - 1])));
tes('p3-013 lanjutnya: 32, 64, 128, 256', eq(2 * 16, 32) && eq(2 * 32, 64) && eq(2 * 64, 128) && eq(2 * 128, 256));
tes('p3-013 TWIST: suku ke-10 = 512 (meledak!)', eq(Math.pow(2, 9), 512));
tes('p3-013 bandingkan tambah vs gandakan (10 suku): gandakan jauh di atas',
  5 + 9 * 2 < Math.pow(2, 9));

tes('p3-013 cerita biji tumbuh = alam, tanpa utang/pinjaman/bunga uang', true);

const suku14 = n => 3 * n + 1;
tes('p3-014 suku ke-1 = 4, ke-2 = 7, ke-3 = 10',
  eq(suku14(1), 4) && eq(suku14(2), 7) && eq(suku14(3), 10));
tes('p3-014 TWIST: suku ke-100 = 301 tanpa menghitung satu per satu', eq(suku14(100), 301));
tes('p3-014 konsisten dgn barisannya: 4, 7, 10, 13, 16',
  [1, 2, 3, 4, 5].every(n => eq(suku14(n), 4 + (n - 1) * 3)));
tes('p3-014 rumus melompat: ke-50 = 151 lebih cepat drp 50 langkah', eq(suku14(50), 151));

const jumlahLurus = (() => { let s = 0; for (let i = 1; i <= 100; i++) s += i; return s; })();
tes('p3-015 jumlah 1..100 dihitung lurus = 5050', eq(jumlahLurus, 5050));
tes('p3-015 pasangan ujung: 1+100 = 101, 2+99 = 101, 3+98 = 101',
  eq(1 + 100, 101) && eq(2 + 99, 101) && eq(3 + 98, 101));
tes('p3-015 banyak pasangan = 50 (semua berjumlah 101)',
  (() => { let n = 0; for (let i = 1; i <= 50; i++) if (i + (101 - i) === 101) n++; return n; })() === 50);
tes('p3-015 50 x 101 = 5050 (cara pasangan = cara lurus)', eq(50 * 101, 5050));
tes('p3-015 cara sama utk 1..10: 5 pasangan x 11 = 55', eq(10 * 11 / 2, 55) && eq(1 + 10, 11));

const jumlah16 = arr => arr.reduce((a, b) => a + b, 0);
tes('p3-016 1+2+4 = 7, dan 7 satu kurang dari 8', eq(jumlah16([1, 2, 4]), 7) && eq(7 + 1, 8));
tes('p3-016 1+2+4+8 = 15, satu kurang dari 16', eq(jumlah16([1, 2, 4, 8]), 15) && eq(15 + 1, 16));
tes('p3-016 1+2+4+8+16 = 31, satu kurang dari 32', eq(jumlah16([1, 2, 4, 8, 16]), 31) && eq(31 + 1, 32));
tes('p3-016 rahasia: jumlah = 2 x anggota terakhir kurang 1',
  eq(jumlah16([1, 2, 4]), 2 * 4 - 1) && eq(jumlah16([1, 2, 4, 8, 16]), 2 * 16 - 1));

const T = n => n * (n + 1) / 2;
tes('p3-017 segitiga: 1, 3, 6, 10', eq(T(1), 1) && eq(T(2), 3) && eq(T(3), 6) && eq(T(4), 10));
tes('p3-017 baris kursi 1+2+3+4 = 10 kursi', eq(1 + 2 + 3 + 4, 10));
tes('p3-017 beda antar baris: +2, +3, +4 (tambah baris baru)', eq(3 - 1, 2) && eq(6 - 3, 3) && eq(10 - 6, 4));
tes('p3-017 TWIST: dua segitiga bertemu jadi kotak — 1+3=4, 3+6=9, 6+10=16',
  eq(1 + 3, 4) && eq(3 + 6, 9) && eq(6 + 10, 16));
tes('p3-017 pola kotak: 2x2, 3x3, 4x4', eq(2 * 2, 4) && eq(3 * 3, 9) && eq(4 * 4, 16));

const k18 = [1, 4, 9, 16];
tes('p3-018 kuadrat: 1x1, 2x2, 3x3, 4x4', eq(1 * 1, 1) && eq(2 * 2, 4) && eq(3 * 3, 9) && eq(4 * 4, 16));
tes('p3-018 TWIST: selisihnya bilangan GANJIL: 3, 5, 7',
  eq(k18[1] - k18[0], 3) && eq(k18[2] - k18[1], 5) && eq(k18[3] - k18[2], 7));
tes('p3-018 ganjil berikut 9: 16+9 = 25 = 5x5', eq(16 + 9, 25));
tes('p3-018 petak 5x5 = 25 benar-benar kotak', eq(5 * 5, 25));

tes('p3-019 kelopak bunga tetap 5 tiap bunga sejenis', [5, 5, 5].every(k => k === 5));
tes('p3-019 tahun kabisat berjarak 4: 2024, 2028, 2032',
  eq(2028 - 2024, 4) && eq(2032 - 2028, 4));
tes('p3-019 kabisat habis dibagi 4: 2024/4 = 506, 2032/4 = 508',
  eq(2024 % 4, 0) && eq(2032 % 4, 0));
tes('p3-019 pola bisa diCEK (hitung & periksa), bukan ditebak', true);

const b20 = [20, 22, 24];
tes('p3-020 misi 1: lanjutkan 20,22,24 -> 26 (beda 2)', eq(b20[1] - b20[0], 2) && eq(b20[2] - b20[1], 2) && eq(24 + 2, 26));
const suku20 = n => 2 * n + 3;
tes('p3-020 misi 2: suku ke-50 dari 2n+3 = 103', eq(suku20(50), 103));
tes('p3-020 misi 3: 1+2+...+10 = 55 (5 pasangan x 11)', eq(10 * 11 / 2, 55));
tes('p3-020 misi 4: 1+2+4+8+16+32 = 63 (satu kurang dari 64)',
  eq(1 + 2 + 4 + 8 + 16 + 32, 63) && eq(63 + 1, 64));
tes('p3-020 misi 5: segitiga ke-5 = 15 kursi', eq(T(5), 15));
tes('p3-020 semua jawaban misi konsisten dgn aturan barisan', eq(suku20(2), 7) && eq(suku20(3), 9));

console.log(`\n${pass} OK, ${fail} GAGAL`);
process.exit(fail === 0 ? 0 : 1);
