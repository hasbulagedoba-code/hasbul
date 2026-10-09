const EPS = 1e-9;
let ok = 0, gagal = 0;
function cek(nama, syarat) {
  if (syarat) { ok++; }
  else { gagal++; console.log('GAGAL: ' + nama); }
}
function dekat(a, b, eps) {
  return Math.abs(a - b) < (eps || EPS);
}

cek('gelas detik1 naik 3 total 3', dekat(0 + 3, 3));
cek('gelas detik2 naik 3 total 6', dekat(3 + 3, 6));
cek('gelas detik3 naik 6 total 12', dekat(6 + 6, 12));
cek('gelas detik4 naik 1 total 13', dekat(12 + 1, 13));
cek('gelas total 13 cm', dekat(3 + 3 + 6 + 1, 13));
cek('gelas laju tak pernah sama dua kali berturut', (3 + 3 + 6 + 1) === 13 && (3 + 3) !== (6 + 1));

cek('mobil 40 km/jam x 0,5 jam = 20 km', dekat(40 * 0.5, 20));
cek('mobil 80 km/jam x 0,5 jam = 40 km', dekat(80 * 0.5, 40));
cek('total 20 + 40 = 60 km', dekat(20 + 40, 60));
cek('rata-rata 60 km dalam 1 jam', dekat(60 / 1, 60));
cek('40 bukan 60, 80 bukan 60', 40 !== 60 && 80 !== 60);
cek('dua mobil rata-rata sama: 30+90 = 120/2 = 60', dekat((30 + 90) / 2, 60));
cek('dua mobil rata sama tapi sesaat beda: 30 bukan 90', 30 !== 90);

cek('bukit landai maju 1 naik 1 kemiringan 1', dekat(1 / 1, 1));
cek('puncak datar kemiringan 0', dekat(0 / 1, 0));
cek('miring 2: maju 1 naik 2', dekat(2 / 1, 2));
cek('miring 1/2: maju 2 naik 1', dekat(1 / 2, 0.5));
cek('turun maju 1 turun 1 = -1', dekat(-1 / 1, -1));

{
  const x2 = [1, 2, 3, 4, 5].map(x => x * x);
  cek('x2 = 1 4 9 16 25', x2.join(',') === '1,4,9,16,25');
  const selisih = [];
  for (let i = 1; i < x2.length; i++) selisih.push(x2[i] - x2[i - 1]);
  cek('selisih tetangga = 3 5 7 9', selisih.join(',') === '3,5,7,9');
  cek('selisih semua ganjil', selisih.every(s => s % 2 === 1));
  const duaX = [1, 2, 3, 4, 5].map(x => 2 * x);
  cek('2x = 2 4 6 8 10', duaX.join(',') === '2,4,6,8,10');
  cek('2x semua genap', duaX.every(d => d % 2 === 0));
  cek('selisih 9->16 = 7', dekat(16 - 9, 7));
  cek('2x di 3 = 6', dekat(2 * 3, 6));
  cek('2x di 4 = 8', dekat(2 * 4, 8));
  cek('7 tepat di antara 6 dan 8', dekat((6 + 8) / 2, 7));
  cek('pola ganjil duduk di antara genap utk semua langkah', selisih.every((s, i) => dekat(s, (duaX[i] + duaX[i + 1]) / 2)));
  cek('turunan x2 memakai rumus pangkat turun: x2 -> 2x', dekat(2 * 1, 2) && dekat(2 * 5, 10));
}

cek('laju +2 menanjak', 2 > 0);
cek('laju -2 menurun', -2 < 0);
cek('laju 0 berhenti sejenak', dekat(0, 0));
cek('bukit: naik 2 turun 2 kembali ke datar', dekat(2 + (-2), 0));

{
  const tinggi = [0, 3, 4, 3, 0];
  cek('air t0-t4 = 0 3 4 3 0', tinggi.join(',') === '0,3,4,3,0');
  const laju = [];
  for (let i = 1; i < tinggi.length; i++) laju.push(tinggi[i] - tinggi[i - 1]);
  cek('laju antar detik = 3 1 -1 -3', laju.join(',') === '3,1,-1,-3');
  cek('puncak tinggi 4 di detik 2', Math.max(...tinggi) === 4 && tinggi[2] === 4);
  cek('laju berganti tanda tepat menuju detik 2: +1 lalu -1', laju[1] > 0 && laju[2] < 0);
  cek('di antara +1 dan -1 lajur nol', dekat((laju[1] + laju[2]) / 2, 0));
  cek('simetris h(1)=h(3)=3', dekat(tinggi[1], tinggi[3]) && dekat(tinggi[1], 3));
  cek('air kembali ke kolam 0 di detik 4', dekat(tinggi[4], 0));
}

{
  const jarak = [1 * 1, 2 * 2, 3 * 3];
  cek('jarak bola t1-t3 = 1 4 9', jarak.join(',') === '1,4,9');
  const lajuRata = [jarak[1] - jarak[0], jarak[2] - jarak[1]];
  cek('laju rata antar detik = 3 lalu 5', lajuRata.join(',') === '3,5');
  const lajuSesaat = [2 * 1, 2 * 2, 2 * 3];
  cek('laju sesaat 2x = 2 4 6', lajuSesaat.join(',') === '2,4,6');
  cek('laju rata 3 di antara 2 dan 4', dekat((2 + 4) / 2, 3));
  cek('laju rata 5 di antara 4 dan 6', dekat((4 + 6) / 2, 5));
  const percepatan = lajuSesaat[2] - lajuSesaat[1];
  cek('selisih laju = 2', dekat(percepatan, 2));
  cek('percepatan tetap 2 tiap detik', dekat(lajuSesaat[1] - lajuSesaat[0], 2) && dekat(lajuSesaat[2] - lajuSesaat[1], 2));
  cek('tangga tiga anak: jarak -> laju -> percepatan', dekat(4 - 1, 3) && dekat(4 - 2, 2));
}

{
  const y = x => x * x - 4;
  cek('U di -2 = 0', dekat(y(-2), 0));
  cek('U di -1 = -3', dekat(y(-1), -3));
  cek('U di 0 = -4 terendah', dekat(y(0), -4));
  cek('U di 1 = -3', dekat(y(1), -3));
  cek('U di 2 = 0', dekat(y(2), 0));
  const laju = x => 2 * x;
  cek('laju U: -4 -2 0 2 4', [ -2, -1, 0, 1, 2 ].map(laju).join(',') === '-4,-2,0,2,4');
  cek('laju negatif kiri = menurun', laju(-2) < 0);
  cek('laju nol di dasar x=0', dekat(laju(0), 0));
  cek('laju positif kanan = menanjak', laju(2) > 0);
  cek('dasar senyum tinggi -4 laju 0', dekat(y(0), -4) && dekat(laju(0), 0));
}

{
  const laju = [5, 10, 15];
  cek('motor laju detik 1-3 = 5 10 15', laju.join(',') === '5,10,15');
  cek('naik +5 tiap detik', dekat(laju[1] - laju[0], 5) && dekat(laju[2] - laju[1], 5));
  cek('percepatan = laju dari laju = 5', dekat((laju[1] - laju[0]) / 1, 5));
  cek('motor makin kencang bukan makin lambat', laju[2] > laju[0]);
}

cek('misi1 laju gelas 3-3-6-1 total 13', dekat(3 + 3 + 6 + 1, 13));
cek('misi2 rata-rata 60 sesaat 40 dan 80', dekat(20 + 40, 60) && 40 !== 60 && 80 !== 60);
cek('misi3 2x di 3 = 6', dekat(2 * 3, 6));
cek('misi4 puncak air detik 2 tinggi 4', dekat(4, 4));
cek('misi5 lembah senyum x=0 laju 0', dekat(0, 0));

console.log('verifikasi_p3k8: ' + ok + ' OK, ' + gagal + ' GAGAL');
if (gagal > 0) process.exit(1);
