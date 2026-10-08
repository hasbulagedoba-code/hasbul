const fs = require('fs');
const path = require('path');
let pass = 0, fail = 0;
function tes(nama, kondisi, detail) {
  if (kondisi) { pass++; console.log(`  OK  ${nama}`); }
  else { fail++; console.log(` GAGAL ${nama}${detail ? ' :: ' + detail : ''}`); }
}
const eq = (a, b) => Math.abs(a - b) < 1e-9;

const d81 = [2, 5, 3, 5, 6, 5, 4];
tes('p2-081 banyaknya data = 7 hari', d81.length === 7);
tes('p2-081 jumlah kunjungan = 30', d81.reduce((a, b) => a + b, 0) === 30, String(d81.reduce((a, b) => a + b, 0)));
tes('p2-081 5 muncul tepat 3 kali', d81.filter(x => x === 5).length === 3);

const g82 = [3, 4, 5];
const total82 = g82.reduce((a, b) => a + b, 0);
tes('p2-082 3+4+5 = 12', total82 === 12);
tes('p2-082 12 dibagi 3 = 4', total82 / 3 === 4);
tes('p2-082 rata-rata = jumlah/banyak = 4', eq(g82.reduce((a, b) => a + b, 0) / g82.length, 4));

tes('p2-082 uji balik 4x3 = 12', 4 * 3 === 12);

function median(arr) {
  const s = [...arr].sort((a, b) => a - b);
  const t = Math.floor(s.length / 2);
  return s.length % 2 ? s[t] : (s[t - 1] + s[t]) / 2;
}
const d83a = [4, 5, 6, 8, 12];
const d83b = [4, 5, 6, 8, 100];
tes('p2-083 median 4,5,6,8,12 = 6', median(d83a) === 6);
tes('p2-083 median 4,5,6,8,100 tetap 6', median(d83b) === 6);
tes('p2-083 posisi tengah = data ke-3 dari 5', [...d83a].sort((a, b) => a - b)[2] === 6);
const mean83a = d83a.reduce((a, b) => a + b, 0) / 5, mean83b = d83b.reduce((a, b) => a + b, 0) / 5;
tes('p2-083 mean 83a = 7 vs 83b = 24.6 (mean ikut berubah, median tidak)',
  eq(mean83a, 7) && eq(mean83b, 24.6), `${mean83a} ${mean83b}`);

const m84 = { merah: 5, biru: 3, kuning: 1 };
tes('p2-084 total sandal = 9', m84.merah + m84.biru + m84.kuning === 9);
tes('p2-084 modus = merah (5 paling banyak)',
  Math.max(...Object.values(m84)) === m84.merah);

const raw84 = ['merah', 'merah', 'biru', 'merah', 'kuning', 'merah', 'biru', 'merah', 'biru'];
const hitung = {};
for (const w of raw84) hitung[w] = (hitung[w] || 0) + 1;
tes('p2-084 hitung ulang array: merah 5 biru 3 kuning 1',
  hitung.merah === 5 && hitung.biru === 3 && hitung.kuning === 1);

const b85 = { mangga: 6, jambu: 3, pisang: 9 };
tes('p2-085 total panen = 18', b85.mangga + b85.jambu + b85.pisang === 18);
tes('p2-085 tertinggi = pisang 9', Math.max(b85.mangga, b85.jambu, b85.pisang) === b85.pisang);
tes('p2-085 terpendek = jambu 3', Math.min(b85.mangga, b85.jambu, b85.pisang) === b85.jambu);
tes('p2-085 pisang = 3x jambu (perbandingan terlihat)', b85.pisang === 3 * b85.jambu);

const s86 = [20, 24, 28, 26, 22];
tes('p2-086 naik pagi->siang: 20<24<28', s86[0] < s86[1] && s86[1] < s86[2]);
tes('p2-086 turun siang->malam: 28>26>22', s86[2] > s86[3] && s86[3] > s86[4]);
tes('p2-086 selisih tiap langkah: +4,+4,-2,-4',
  s86[1] - s86[0] === 4 && s86[2] - s86[1] === 4 && s86[3] - s86[2] === -2 && s86[4] - s86[3] === -4);
tes('p2-086 awal 20 akhir 22 (naik 2 sepanjang hari)', s86[4] - s86[0] === 2);

const k87 = { coklat: 4, stroberi: 3, vanila: 3 };
const tot87 = k87.coklat + k87.stroberi + k87.vanila;
tes('p2-087 total anak = 10', tot87 === 10);
tes('p2-087 coklat 4/10 = 40%', eq(k87.coklat / tot87 * 100, 40));
tes('p2-087 stroberi 3/10 = 30% & vanila 30%',
  eq(k87.stroberi / tot87 * 100, 30) && eq(k87.vanila / tot87 * 100, 30));
tes('p2-087 40+30+30 = 100% (lingkaran penuh)',
  40 + 30 + 30 === 100);
tes('p2-087 irisan terbesar = coklat', Math.max(k87.coklat, k87.stroberi, k87.vanila) === k87.coklat);

tes('p2-087 derajat coklat 144 / stroberi 108 / vanila 108',
  eq(k87.coklat / tot87 * 360, 144) && eq(k87.stroberi / tot87 * 360, 108) && eq(k87.vanila / tot87 * 360, 108));

const t88 = {
  buah: ['mangga', 'jambu', 'pisang'],
  hari: ['Senin', 'Selasa', 'Rabu', 'Kamis'],
  isi: [[4, 2, 1], [3, 5, 2], [5, 1, 4], [2, 2, 3]],
};
tes('p2-088 4 baris x 3 kolom = 12 kotak', t88.isi.length * t88.isi[0].length === 12);
const kolMangga = t88.isi.map(r => r[0]);
const kolJambu = t88.isi.map(r => r[1]);
const kolPisang = t88.isi.map(r => r[2]);
tes('p2-088 kolom mangga [4,3,5,2] jumlah 14', kolMangga.reduce((a, b) => a + b, 0) === 14);
tes('p2-088 kolom jambu [2,5,1,2] jumlah 10', kolJambu.reduce((a, b) => a + b, 0) === 10);
tes('p2-088 kolom pisang [1,2,4,3] jumlah 10', kolPisang.reduce((a, b) => a + b, 0) === 10);
tes('p2-088 baris Senin [4,2,1] jumlah 7', t88.isi[0].reduce((a, b) => a + b, 0) === 7);
tes('p2-088 total semua = 34', t88.isi.flat().reduce((a, b) => a + b, 0) === 34);
tes('p2-088 juara kolom = mangga (14)', Math.max(14, 10, 10) === 14);

const A = [6, 7, 8], B = [1, 7, 13];
const rentang = a => Math.max(...a) - Math.min(...a);
tes('p2-089 mean A = 7 & mean B = 7 (sama!)',
  eq(A.reduce((a, b) => a + b, 0) / 3, 7) && eq(B.reduce((a, b) => a + b, 0) / 3, 7));
tes('p2-089 rentang A = 8-6 = 2 (kompak)', rentang(A) === 2);
tes('p2-089 rentang B = 13-1 = 12 (menyebar)', rentang(B) === 12);
tes('p2-089 rentang B = 6x rentang A', rentang(B) === 6 * rentang(A));

const d90 = [3, 5, 5, 7, 10];
const tot90 = d90.reduce((a, b) => a + b, 0);
tes('p2-090 misi1 total = 30', tot90 === 30);
tes('p2-090 misi2 mean = 30/5 = 6', eq(tot90 / d90.length, 6));
tes('p2-090 misi3 median = 5', median(d90) === 5);
tes('p2-090 misi4 modus = 5 (muncul 2x)',
  d90.filter(x => x === 5).length === 2 &&
  Math.max(...[...new Set(d90)].map(v => d90.filter(x => x === v).length)) === 2);
tes('p2-090 misi5 rentang = 10-3 = 7', rentang(d90) === 7);

const repo = path.join(__dirname, '..', 'akiomidaspace');
const cerita = fs.readFileSync(path.join(repo, 'js', 'cerita-data.js'), 'utf8');
const glifSemua = [...cerita.matchAll(/glif:\s*'([^']*)'/g)].map(m => m[1]);
const kandidatGlif = ['7 angka', '12:3', 'tengah', '5 kali', '6-3-9', '20-28', '40%', '4x3', '13-1', '30'];
console.log(`\nGlif terpakai saat ini: ${glifSemua.length}`);
for (const g of kandidatGlif) {
  tes(`glif k9 unik: '${g}'`, !glifSemua.includes(g), glifSemua.includes(g) ? 'SUDAH DIPAKAI' : '');
}
tes('glif dalam naskah kandidat tidak saling bentrok', new Set(kandidatGlif).size === 10);

/* ---------- ANTI-CELAH-GREP: nama tema & objek bebas substring terlarang ---------- */
const TERLARANG = ['ramal', 'sihir', 'sakti', 'sulap', 'nasib', 'takdir', 'jimat', 'weton',
  'zodiak', 'horoskop', 'numerolog', 'primbon', 'mantra', 'peruntungan', 'astrolog', 'prediksi'];
const temaK9 = ['kandangData', 'mejaGelasRata', 'susunBatuSore', 'rakSandalSiang', 'lapanganBatang',
  'mejaSuhuSore', 'mejaKueMalam', 'geraiTabelPasar', 'duaLadangRentang', 'balaiRisetMalam'];
const objekK9 = [
  'kandangBurungPagi', 'papanCatatTujuhHari', 'barisanAngkaKunjungan', 'papanPertanyaanSama',
  'gelasTigaBedatinggi', 'tekoTampungSemua', 'gelasTigaRataEmpat', 'papanCaraMean',
  'batuLimaBersusun', 'batuKetigaTengah', 'ujungPergiTengahTetap', 'papanMedianAman',
  'rakSandalSembilan', 'sandalMerahTumpuk', 'duaWarnaSisa', 'papanModusJawara',
  'tongkatPanenTiga', 'batangPisangSembilan', 'batangJambuTerpendek', 'papanBacaSekali',
  'kertasSuhuLimaTitik', 'garisSuhuNaik', 'garisSuhuTurun', 'papanDenyutData',
  'kueBulatPestaMalam', 'irisanCoklatEmpat', 'irisanStroberiVanila', 'papanPenuhSeratus',
  'geraiBuahPagi', 'rakBarisKolom', 'papanTabelPanen', 'papanBacaJudulDulu',
  'ladangKompakTujuh', 'ladangMenyebarTujuh', 'garisUkurRentang', 'papanRataSamaBeda',
  'balaiRisetLentera', 'papanDataLimaHari', 'misiTotalMeanEnam', 'misiMedianModus', 'misiRentangTujuh',
];
function bersih(nama) { const low = nama.toLowerCase(); return !TERLARANG.some(t => low.includes(t)); }
for (const t of temaK9) tes(`tema anti-celah: ${t}`, bersih(t));
for (const o of objekK9) tes(`objek anti-celah: ${o}`, bersih(o));

/* ---------- KEUNIKAN NAMA: tidak boleh sudah ada di repo ---------- */
const pelajaran = fs.readFileSync(path.join(repo, 'js', 'pelajaran-main.js'), 'utf8');
const pintu2data = fs.readFileSync(path.join(repo, 'js', 'pintu2-data.js'), 'utf8');
const pintu1data = fs.readFileSync(path.join(repo, 'js', 'pintu1-data.js'), 'utf8');
const gabungan = cerita + pelajaran + pintu2data + pintu1data;
function sudahAda(nama) {
  const re = new RegExp(`\\b${nama}\\b`);
  return re.test(cerita) || re.test(pelajaran) || re.test(pintu2data) || re.test(pintu1data);
}
for (const t of temaK9) tes(`tema belum terpakai: ${t}`, !sudahAda(t));
for (const o of objekK9) tes(`objek belum terpakai: ${o}`, !sudahAda(o));
tes('nama tema tidak saling sama', new Set(temaK9).size === 10);
tes('nama objek tidak saling sama', new Set(objekK9).size === objekK9.length);

/* ---------- RINGKASAN ---------- */
console.log(`\n===== HASIL: ${pass} OK, ${fail} GAGAL =====`);
if (fail > 0) { console.log('ADA TES GAGAL — JANGAN MENULIS NASKAH DULU!'); process.exit(1); }
console.log('SEMUA MATEMATIKA k9 VALID — aman menulis naskah.');
