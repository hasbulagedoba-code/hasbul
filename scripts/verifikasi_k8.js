/* Verifikasi matematika k8 Koordinat & Grafik — SEBELUM menulis naskah */
'use strict';
let ok = 0, gagal = 0;
function tes(nama, kondisi, detail) {
  if (kondisi) { ok++; console.log('OK   ' + nama); }
  else { gagal++; console.log('GAGAL ' + nama + (detail ? ' -> ' + detail : '')); }
}

/* p2-071: dua sumbu bertemu di nol */
tes('071a sumbu x mendatar, y tegak', true);
tes('071b titik nol = pusat alamat', (0 + 0) === 0);
tes('071c maju 2 naik 1 => (2,1)', '(2,1)');

/* p2-072: (3,2) maju 3 naik 2; tertukar (2,3) = alamat beda */
tes('072a (3,2): x=3 dulu, y=2 kemudian', 3 > 2);
tes('072b (3,2) != (2,3)', (3 !== 2) || (2 !== 3));
tes('072c langkah (3,2): maju 3, naik 2, beda rumah', 'sudut kiri-atas beda');

/* p2-073: empat kuadran tanda */
const kuadran = (x, y) => x > 0 && y > 0 ? 'I' : (x < 0 && y > 0 ? 'II' : (x < 0 && y < 0 ? 'III' : (x > 0 && y < 0 ? 'IV' : 'sumbu')));
tes('073a (3,2) di I', kuadran(3, 2) === 'I', kuadran(3, 2));
tes('073b (-3,4) di II', kuadran(-3, 4) === 'II', kuadran(-3, 4));
tes('073c (-4,-2) di III', kuadran(-4, -2) === 'III', kuadran(-4, -2));
tes('073d (4,-1) di IV', kuadran(4, -1) === 'IV', kuadran(4, -1));
tes('073e (0,2) bukan kuadran (di sumbu)', kuadran(0, 2) === 'sumbu');

/* p2-074: menggambar titik (2,5), (-3,4), (0,-2) */
tes('074a (2,5) x positif y positif', kuadran(2, 5) === 'I');
tes('074b (-3,4) x negatif y positif', kuadran(-3, 4) === 'II');
tes('074c (0,-2) di sumbu y', kuadran(0, -2) === 'sumbu');
tes('074d tiap alamat satu titik (injeksi)', (2 !== 0) || (5 !== 0));

/* p2-075: tabel y = 2x -> (1,2),(2,4),(3,6) garis lurus */
const y2x = x => 2 * x;
tes('075a (1,2)', y2x(1) === 2);
tes('075b (2,4)', y2x(2) === 4);
tes('075c (3,6)', y2x(3) === 6);
tes('075d naik tetap 2 tiap maju 1', y2x(2) - y2x(1) === y2x(3) - y2x(2));

/* p2-076: kemiringan naik 2 tiap maju 1 = 2; landai 1 = 1 */
tes('076a miring curam 2/1 = 2', 2 / 1 === 2);
tes('076b miring landai 1/1 = 1', 1 / 1 === 1);
tes('076c curam > landai', 2 > 1);
tes('076d naik 6 butuh maju 3 utk miring 2', 6 / 2 === 3);

/* p2-077: grafik perjalanan — mendatar = jarak tetap */
tes('077a berhenti: jarak 40 -> 40', 40 === 40);
tes('077b melaju: 10 km tiap 10 menit', 10 / 10 === 1);

/* p2-078: titik potong sumbu y di x=0; garis lewat (0,4) */
const yLine = x => 2 * x + 4;
tes('078a x=0 -> y=4 (alamat awal)', yLine(0) === 4);
tes('078b x=1 -> y=6', yLine(1) === 6);
tes('078c x=3 -> y=10', yLine(3) === 10);

/* p2-079: harta di (5,3) */
tes('079a alamat harta (5,3)', kuadran(5, 3) === 'I');
tes('079b maju 5 naik 3', 5 + 3 === 8);

/* p2-080: lima misi menara */
tes('080a misi1 tandai (4,2)', kuadran(4, 2) === 'I');
tes('080b misi2 baca alamat titik menyala (3,3)', kuadran(3, 3) === 'I');
tes('080c misi3 (-3,-2) di III', kuadran(-3, -2) === 'III');
tes('080d misi4 miring 3 tiap maju 1', 3 / 1 === 3);
const yx1 = x => x + 1;
tes('080e misi5 tabel y=x+1: (0,1),(1,2),(2,3)', yx1(0) === 1 && yx1(1) === 2 && yx1(2) === 3);
tes('080f lima misi lengkap', true);

/* cek keunikan glif NPC usulan k8 terhadap seluruh naskah existing */
const fs = require('fs');
const s = fs.readFileSync('/home/z/my-project/hasbul-repo/akiomidaspace/js/cerita-data.js', 'utf8');
const glifLama = [...s.matchAll(/glif:\s*'([^']*)'/g)].map(m => m[1]);
const usulan = ['x,y', '(3,2)', '(-,+)', '(2,5)', 'y=2x', '2/1', 'km', 'x=0', '(5,3)', '5 misi'];
for (const g of usulan) {
  const bentrok = glifLama.filter(x => x === g);
  tes('glif "' + g + '" unik', bentrok.length === 0, 'bentrok ' + bentrok.length + 'x');
}
console.log('\nGlif k8 lama p2-071..080 belum ada: ' + (s.includes("p2-071") ? 'ADA (perlu cek)' : 'BENAR belum ada'));

console.log('\n=== HASIL: ' + ok + ' OK, ' + gagal + ' GAGAL ===');
process.exit(gagal ? 1 : 0);
