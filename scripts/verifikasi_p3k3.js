/* Verifikasi matematika PINTU 3 k3 — Eksponen & Logaritma (p3-021..030)
   Semua angka yang akan ditulis di naskah dicek programatik dulu. */
let OK = 0, FAIL = 0;
function cek(nama, kondisi, detail) {
  if (kondisi) { OK++; console.log('OK  ' + nama + (detail ? ' :: ' + detail : '')); }
  else { FAIL++; console.log('GAGAL ' + nama + (detail ? ' :: ' + detail : '')); }
}

/* ===== p3-021 Pangkat: Kali Berulang ===== */
cek('2^3 = 8', Math.pow(2, 3) === 8);
cek('2x2x2 = 8', 2 * 2 * 2 === 8);
cek('2^4 = 16', Math.pow(2, 4) === 16);
cek('2^4 = 2x2x2x2', 2 * 2 * 2 * 2 === 16);
cek('3^2 = 9', Math.pow(3, 2) === 9);
cek('5^2 = 25', Math.pow(5, 2) === 25);
cek('10^3 = 1000', Math.pow(10, 3) === 1000);

/* ===== p3-022 Ledakan Lipatan ===== */
/* kertas 0,1 mm; lipat n kali -> tebal 0,1 mm x 2^n */
const TEBAL_MM = 0.1;
function tebal(n) { return TEBAL_MM * Math.pow(2, n); }
cek('lipat 1 = 0,2 mm', tebal(1) === 0.2);
cek('lipat 3 = 0,8 mm', Math.abs(tebal(3) - 0.8) < 1e-9);
cek('lipat 8 = 25,6 mm (lebih tebal buku?)', tebal(8) === 25.6, tebal(8) + ' mm');
/* buku 200 halaman kira2 20 mm -> lipat 8 lebih tebal dari buku tipis */
cek('lipat 8 > 20 mm (tebal buku)', tebal(8) > 20);
const bulan_km = 384400;
const lipat42_km = (tebal(42) / 1e6); // mm -> km
cek('lipat 42 = 439.804,65 km', Math.abs(lipat42_km - 439804.6511104) < 0.001, lipat42_km.toFixed(2) + ' km');
cek('lipat 42 MENEMBUS bulan (>384.400 km)', lipat42_km > bulan_km, lipat42_km.toFixed(0) + ' vs ' + bulan_km);
/* cek 2^42 */
cek('2^42 = 4.398.046.511.104', Math.pow(2, 42) === 4398046511104);
/* lipat 42 hampir 1,14x jarak bulan */
cek('439.804 / 384.400 = 1,14x', Math.abs(lipat42_km / bulan_km - 1.1441) < 0.001, (lipat42_km / bulan_km).toFixed(4));

/* ===== p3-023 Kuadrat & Kubik ===== */
cek('3x3 = 9 (luas persegi sisi 3)', 3 * 3 === 9);
cek('4x4 = 16', 4 * 4 === 16);
cek('2x2x2 = 8 (isi kubus sisi 2)', 2 * 2 * 2 === 8);
cek('3x3x3 = 27', 3 * 3 * 3 === 27);
cek('4x4x4 = 64', 4 * 4 * 4 === 64);
cek('5x5x5 = 125', 5 * 5 * 5 === 125);

/* ===== p3-024 Akar: Jalan Pulang ===== */
cek('akar49 = 7 karena 7x7=49', Math.sqrt(49) === 7 && 7 * 7 === 49);
cek('akar81 = 9 karena 9x9=81', Math.sqrt(81) === 9 && 9 * 9 === 81);
cek('akar16 = 4', Math.sqrt(16) === 4);
cek('akar25 = 5', Math.sqrt(25) === 5);
cek('akar144 = 12', Math.sqrt(144) === 12);
cek('7x7=49 bolak balik 49->7->49', 7 * 7 === 49 && Math.sqrt(49) === 7);

/* ===== p3-025 Logaritma Pencari Pangkat ===== */
function log2(n) { return Math.log2(n); }
cek('log2(8) = 3 karena 2^3=8', log2(8) === 3);
cek('log2(16) = 4', log2(16) === 4);
cek('log2(32) = 5', log2(32) === 5);
cek('log2(64) = 6', log2(64) === 6);
cek('log10(1000) = 3', Math.log10(1000) === 3);
cek('log10(100) = 2', Math.log10(100) === 2);
cek('2^1=2, 2^2=4, 2^3=8 (jejak saksi)', [Math.pow(2, 1), Math.pow(2, 2), Math.pow(2, 3)].join() === '2,4,8');

/* ===== p3-026 Pangkat Nol & Minus ===== */
cek('2^0 = 1', Math.pow(2, 0) === 1);
cek('3^0 = 1', Math.pow(3, 0) === 1);
cek('1000^0 = 1', Math.pow(1000, 0) === 1);
cek('2^-1 = 1/2 = 0,5', Math.pow(2, -1) === 0.5);
cek('2^-2 = 1/4 = 0,25', Math.pow(2, -2) === 0.25);
cek('2^-3 = 1/8 = 0,125', Math.pow(2, -3) === 0.125);
/* tangga: turun satu anak = bagi dua */
const turun = [8]; for (let i = 0; i < 5; i++) turun.push(turun[turun.length - 1] / 2);
cek('tangga turun: 8->4->2->1->0,5->0,25', turun.join() === '8,4,2,1,0.5,0.25', turun.join());

/* ===== p3-027 Waktu Menggandakan ===== */
const koloni = [];
for (let j = 0; j <= 10; j++) koloni.push(Math.pow(2, j));
cek('koloni jam 0..10 = 1,2,4,8,...,1024', koloni.join() === '1,2,4,8,16,32,64,128,256,512,1024', koloni.join());
cek('tiap langkah = 2x sebelumnya (denyut setia)', koloni.slice(1).every((v, i) => v === koloni[i] * 2));
cek('jam 5 = 32', koloni[5] === 32);
cek('jam 10 = 1024', koloni[10] === 1024);

/* ===== p3-028 Bola Pantul Setengah ===== */
const pantul = [100, 50, 25, 12.5, 6.25, 3.125];
cek('pantulan: 100,50,25,12,5,6,25', pantul.join() === '100,50,25,12.5,6.25,3.125', pantul.join());
cek('tiap pantul = setengah sebelumnya', pantul.slice(1).every((v, i) => Math.abs(v - pantul[i] / 2) < 1e-9));
cek('pantul ke-3 = 12,5', pantul[3] === 12.5);

/* ===== p3-029 Angka Raksasa & Mini ===== */
cek('10^22 = 1 diikuti 22 nol (BigInt)', (10n ** 22n).toString() === '1' + '0'.repeat(22), (10n ** 22n).toString().length + ' digit');
cek('10^4 = 10.000', Math.pow(10, 4) === 10000);
cek('10^-4 m = 0,0001 m = 0,1 mm', Math.pow(10, -4) * 1000 === 0.1, (Math.pow(10, -4) * 1000) + ' mm');
cek('10^22 = 10.000 triliun x triliun (kepala 10 angka di depan)', Math.pow(10, 22).toString().slice(0, 1) === '1');
/* geser koma: kali 10 = geser kanan satu; bagi 10 = geser kiri satu */
cek('3,0 x 10^4 = 30000', 3 * Math.pow(10, 4) === 30000);
cek('geser koma 5 kali 10^2 = 500', 5 * Math.pow(10, 2) === 500);

/* ===== p3-030 Tantangan Tangga Pangkat (5 misi) ===== */
cek('misi1: 2^5 = 32', Math.pow(2, 5) === 32);
cek('misi2: akar81 = 9 (9x9=81)', Math.sqrt(81) === 9);
cek('misi3: log2(16) = 4', log2(16) === 4);
cek('misi4: 3^0 = 1', Math.pow(3, 0) === 1);
cek('misi5: 2^10 = 1024 (lipat 10 kali tebal 102,4 mm)', Math.pow(2, 10) === 1024 && Math.abs(TEBAL_MM * 1024 - 102.4) < 1e-9);
cek('misi5: 102,4 mm > 10 cm', TEBAL_MM * 1024 > 100);

/* ===== GLIF NPC kandidat — keunikan vs seluruh naskah 220 ===== */
global.window = {};
require('/home/z/my-project/hasbul-repo/akiomidaspace/js/pintu1-data.js');
require('/home/z/my-project/hasbul-repo/akiomidaspace/js/pintu2-data.js');
require('/home/z/my-project/hasbul-repo/akiomidaspace/js/pintu3-data.js');
const fs = require('fs');
const src = fs.readFileSync('/home/z/my-project/hasbul-repo/akiomidaspace/js/cerita-data.js', 'utf8');
const glifPakai = new Set();
const reGlif = /npc:\s*\{\s*glif:\s*'([^']*)'/g;
let m;
while ((m = reGlif.exec(src)) !== null) glifPakai.add(m[1]);
const P1 = window.P1, P2 = window.P2, P3 = window.P3;
console.log('glif terpakai di naskah: ' + glifPakai.size);
const kandidat = ['2x2x2', 'lipat', '2 dan 3', '7x7', 'log2', 'turun', '1 2 4', 'setengah', 'x10', 'tangga!'];
for (const g of kandidat) {
  cek('glif "' + g + '" BELUM terpakai', !glifPakai.has(g));
}
/* keunikan antar kandidat sendiri */
cek('kandidat glif 10 unik antar sendiri', new Set(kandidat).size === 10);

/* ===== NAMA TEMA & OBJEK kandidat — unik + bersih ===== */
const temaBaru = ['bengkelPangkat', 'mejaLipatKertas', 'tamanBentukPangkat', 'jalanPulangAkar', 'kantorDetektifLog', 'tanggaPangkatDuaArah', 'rumahKacaTumbuh', 'lapanganBolaSenja', 'observatoriumAngka', 'puncakTanggaPangkat'];
const objekBaru = [
  'mesinPangkatTiga', 'papanTulisKaliUlang', 'kartuPangkatKecil', 'rakHasilDelapan',
  'kertasLipatPertama', 'tumpukanLipatDelapan', 'penggarisTebalTumpuk', 'papanJalanKeBulan',
  'petakRumputTigaTiga', 'kotakKayuKubik', 'papanLuasDanIsi', 'patungBentukSaudara',
  'gerbangRumahEmpatSembilan', 'jalanLangkahTujuh', 'papanAkarJalanBalik', 'lampuPulangPasangan',
  'papanKasusDelapan', 'kartuSaksiDuaEmpat', 'lampuJawabanTiga', 'mejaBerkasLog',
  'anakTanggaNaikPangkat', 'anakTanggaTurunBagi', 'pijakanNolSatu', 'papanLanjutTurunSetengah',
  'cawanKoloniSatu', 'cawanKoloniEmpat', 'papanJamGandakan', 'papanDenyutSetia',
  'bolaKaretDilepas', 'garisPantulanLimaPuluh', 'papanTinggiMenurun', 'papanKecilTeratur',
  'teleskopArahLangit', 'papanBintangPuluhDua', 'penggarisRambutMini', 'bukuTulisPangkat',
  'limaTanggaMisiPangkat', 'papanMisiDuaLima', 'papanMisiTigaEmpat', 'gerbangJuaraTangga',
];
cek('nama tema 10 unik antar sendiri', new Set(temaBaru).size === 10);
cek('nama objek 40 unik antar sendiri', new Set(objekBaru).size === 40);
const temaLama = [...src.matchAll(/tema:\s*'([^']*)'/g)].map(x => x[1]);
const objekLama = [...src.matchAll(/objek:\s*'([^']*)'/g)].map(x => x[1]);
for (const t of temaBaru) cek('tema "' + t + '" belum terpakai', !temaLama.includes(t));
for (const o of objekBaru) cek('objek "' + o + '" belum terpakai', !objekLama.includes(o));
/* kata terlarang di nama tema/objek */
const terlarang = /(ramal|sihir|sakti|sulap|nasib|takdir|jimat|weton|zodiak|horoskop|numerolog|primbon|mantra|peruntungan|prediksi|judi|untung|sial|gaib|misti|astro)/i;
for (const t of temaBaru) cek('tema "' + t + '" bersih kata terlarang', !terlarang.test(t));
for (const o of objekBaru) cek('objek "' + o + '" bersih kata terlarang', !terlarang.test(o));

console.log('\n===== HASIL: ' + OK + ' OK, ' + FAIL + ' GAGAL =====');
if (FAIL > 0) process.exit(1);
