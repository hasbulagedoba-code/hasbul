'use strict';
let gagal = 0;
const t = (nama, ok) => { console.log((ok ? 'OK   ' : 'GAGAL') + ' ' + nama); if (!ok) gagal++; };
const dekat = (a, b) => Math.abs(a - b) < 1e-9;

const s61 = 3;
t('061 luas 1 kartu 3x3=9', s61 * s61 === 9);
t('061 6 kartu 9x6=54', s61 * s61 * 6 === 54);
t('061 volume 3x3x3=27', Math.pow(s61, 3) === 27);

const p62 = 6, l62 = 4, t62 = 2;
t('062 pasang depan-belakang 2x24=48', 2 * (p62 * l62) === 48);
t('062 pasang atas-bawah 2x12=24', 2 * (p62 * t62) === 24);
t('062 pasang samping 2x8=16', 2 * (l62 * t62) === 16);
t('062 total 48+24+16=88', 48 + 24 + 16 === 88);
t('062 rumus 2(pl+pt+lt)=88', 2 * (p62 * l62 + p62 * t62 + l62 * t62) === 88);

t('063 lantai 6x4=24', 6 * 4 === 24);
t('063 dua lapis 24x2=48', 6 * 4 * 2 === 48);
t('063 p x l x t = 48', 6 * 4 * 2 === 48);

t('064 luas alas (6x4):2=12', (6 * 4) / 2 === 12);
t('064 volume 12x10=120', 12 * 10 === 120);

t('065 keliling 2x(22/7)x7=44', dekat(2 * (22 / 7) * 7, 44));

t('066 selimut 44x10=440', 44 * 10 === 440);

const r67 = 7, tg67 = 10, PI = 22 / 7;
const vTabung = PI * r67 * r67 * tg67;
const vKerucut = (1 / 3) * PI * r67 * r67 * tg67;
t('067 3 kerucut = 1 tabung', dekat(3 * vKerucut, vTabung));
t('067 kerucut sepertiga tabung', dekat(vKerucut * 3, vTabung));

t('068 kubus 10cm = 1000 cm3', Math.pow(10, 3) === 1000);
t('068 1000 cm3 = 1 liter (definisi: 1 L = 1000 cm3)', 1000 === 1000);
t('068 4 gelas 250 ml = 1000 ml', 4 * 250 === 1000);
t('068 1000 ml = 1 L', 1000 / 1000 === 1);

t('069 akuarium 50x30x40=60000 cm3', 50 * 30 * 40 === 60000);
t('069 60000 cm3 = 60 L', 60000 / 1000 === 60);
t('069 ember 20000 cm3 = 20 L', 20000 / 1000 === 20);
t('069 botol 1500 cm3 = 1,5 L', 1500 / 1000 === 1.5);
t('069 3 ember x 20 L = 60 L', 3 * 20 === 60);
t('069 40 botol x 1,5 L = 60 L', dekat(40 * 1.5, 60));

t('070 misi1 kardus A 4x2x3=24', 4 * 2 * 3 === 24);
t('070 misi2 B 2x2x2=8', Math.pow(2, 3) === 8);
t('070 misi2 C 3x3x3=27', Math.pow(3, 3) === 27);
t('070 misi2 C terbesar (27>8>24? tidak, C=27 vs A=24 vs B=8)', 27 > 24 && 24 > 8);
t('070 misi3 kubus besar 4x4x4=64', Math.pow(4, 3) === 64);
t('070 misi3 kecil 2x2x2=8 muat 64:8=8', Math.pow(4, 3) / Math.pow(2, 3) === 8);
t('070 misi4 tangki 5x4x3=60 L', 5 * 4 * 3 === 60);
t('070 misi5 kado kubus sisi 5: 6x(5x5)=150', 6 * (5 * 5) === 150);

console.log('\n' + (gagal === 0 ? 'SEMUA VERIFIKASI MATEMATIKA LULUS' : gagal + ' VERIFIKASI GAGAL'));
process.exitCode = gagal === 0 ? 0 : 1;
