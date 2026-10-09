const EPS = 1e-9;
let ok = 0, gagal = 0;
function cek(nama, syarat) {
  if (syarat) { ok++; }
  else { gagal++; console.log('GAGAL: ' + nama); }
}
function dekat(a, b, eps) {
  return Math.abs(a - b) < (eps || EPS);
}

cek('langkah1 1/2 = 0,5', dekat(1 / 2, 0.5));
cek('langkah2 total 0,75', dekat(1 / 2 + 1 / 4, 0.75));
cek('langkah3 total 0,875', dekat(1 / 2 + 1 / 4 + 1 / 8, 0.875));
cek('langkah4 total 0,9375', dekat(1 / 2 + 1 / 4 + 1 / 8 + 1 / 16, 0.9375));
{
  let total = 0, langkah = 0.5;
  for (let i = 0; i < 10; i++) { total += langkah; langkah /= 2; }
  cek('10 langkah total = 1 - 1/1024', dekat(total, 1 - 1 / 1024));
  cek('10 langkah masih di bawah 1', total < 1);
  cek('sisa 10 langkah = 1/1024 ~ 0,001', dekat(1 - total, 1 / 1024));
  cek('1/1024 ~ 0,000977', dekat(1 / 1024, 0.0009765625, 1e-12));
}
{
  let sisa = 1;
  for (let i = 0; i < 12; i++) {
    sisa /= 2;
    cek('sisa selalu positif langkah ' + i, sisa > 0);
  }
}

cek('jarak 0,9 ke 1 = 0,1', dekat(1 - 0.9, 0.1));
cek('jarak 0,99 ke 1 = 0,01', dekat(1 - 0.99, 0.01));
cek('jarak 0,999 ke 1 = 0,001', dekat(1 - 0.999, 0.001));
cek('0,999 < 1', 0.999 < 1);
cek('0,9999 < 1', 0.9999 < 1);
cek('0,99999 < 1', 0.99999 < 1);
{
  let sembilan = 0.9;
  let jarakLama = 1 - sembilan;
  let naik = true;
  for (let i = 0; i < 8; i++) {
    sembilan = 1 - jarakLama / 10 + (jarakLama - jarakLama / 10) * 0;
    jarakLama /= 10;
    if (1 - (1 - jarakLama) <= 0) naik = false;
  }
  cek('jarak dibagi sepuluh berulang menuju nol', jarakLama < 1e-9 && jarakLama > 0);
}
{
  let jarak = 0.1, naikTebaik = true;
  for (let i = 0; i < 6; i++) {
    const nilai = 1 - jarak;
    if (nilai >= 1) naikTebaik = false;
    jarak /= 10;
  }
  cek('sembilan menempel tak pernah lewat 1', naikTebaik);
}

cek('x 1,9 + 1 = 2,9', dekat(1.9 + 1, 2.9));
cek('x 1,99 + 1 = 2,99', dekat(1.99 + 1, 2.99));
cek('x 2,01 + 1 = 3,01', dekat(2.01 + 1, 3.01));
cek('x 2,1 + 1 = 3,1', dekat(2.1 + 1, 3.1));
cek('dari kiri 2,99 < 3', 2.99 < 3);
cek('dari kanan 3,01 > 3', 3.01 > 3);
{
  const f = x => x + 1;
  const jarakList = [0.1, 0.01, 0.001, 0.0001];
  let menyusut = true, errLama = Infinity;
  for (const jarak of jarakList) {
    const eKiri = Math.abs(f(2 - jarak) - 3);
    const eKanan = Math.abs(f(2 + jarak) - 3);
    if (!(eKiri <= jarak + 1e-12) || !(eKanan <= jarak + 1e-12)) menyusut = false;
    if (!(eKiri < errLama) || !(eKanan < errLama)) menyusut = false;
    errLama = Math.max(eKiri, eKanan);
  }
  cek('dua arah menuju 3', menyusut && errLama < 0.0002 && dekat(f(1.999), 2.999, 1e-12) && dekat(f(2.001), 3.001, 1e-12));
}

cek('1/x di 1 = 1', dekat(1 / 1, 1));
cek('1/x di 2 = 0,5', dekat(1 / 2, 0.5));
cek('1/x di 10 = 0,1', dekat(1 / 10, 0.1));
cek('1/x di 100 = 0,01', dekat(1 / 100, 0.01));
cek('1/x di 1000 = 0,001', dekat(1 / 1000, 0.001));
{
  let selaluPositif = true;
  for (let x = 1; x <= 100000; x *= 10) if (!(1 / x > 0)) selaluPositif = false;
  cek('1/x tak pernah nol utk x berhingga', selaluPositif);
}
cek('1/2 x 2 = 1', dekat(0.5 * 2, 1));
cek('0,25 x 4 = 1', dekat(0.25 * 4, 1));
cek('0,125 x 8 = 1', dekat(0.125 * 8, 1));
cek('0,0625 x 16 = 1', dekat(0.0625 * 16, 1));

cek('tangga 2 anak naik 0,5', dekat(1 / 2, 0.5));
cek('tangga 4 anak naik 0,25', dekat(1 / 4, 0.25));
cek('tangga 10 anak naik 0,1', dekat(1 / 10, 0.1));
cek('10 x 0,1 = 1 (eps)', dekat(10 * 0.1, 1, 1e-9));

cek('laju rata 10m/5s = 2', dekat(10 / 5, 2));
cek('jendela 1s: 2m/1s = 2', dekat(2 / 1, 2));
cek('jendela 0,1s: 0,2m/0,1s = 2 (eps)', dekat(0.2 / 0.1, 2, 1e-9));
cek('jendela 0,01s: 0,02m/0,01s = 2 (eps)', dekat(0.02 / 0.01, 2, 1e-9));

cek('1/2 = 0,5', dekat(1 / 2, 0.5));
cek('1/100 = 0,01', dekat(1 / 100, 0.01));
cek('1/1000 = 0,001', dekat(1 / 1000, 0.001));
cek('1/10000 = 0,0001', dekat(1 / 10000, 0.0001));
{
  let hasil = true;
  for (let n = 2; n <= 1000000; n *= 10) if (!(1 / n > 0)) hasil = false;
  cek('1/n tak pernah menyentuh nol', hasil);
}

function kelilingPoligon(n, r) {
  return n * 2 * r * Math.sin(Math.PI / n);
}
cek('segi 6 r 0,5 keliling 3,0', dekat(kelilingPoligon(6, 0.5), 3.0, 1e-9));
cek('segi 12 r 0,5 keliling ~ 3,106', dekat(kelilingPoligon(12, 0.5), 3.1058285412302498, 1e-9));
cek('segi 96 r 0,5 keliling ~ 3,14103', dekat(kelilingPoligon(96, 0.5), 3.14103195089053, 1e-9));
cek('segi 6 < segi 12 < segi 96 < PI', kelilingPoligon(6, 0.5) < kelilingPoligon(12, 0.5) && kelilingPoligon(12, 0.5) < kelilingPoligon(96, 0.5) && kelilingPoligon(96, 0.5) < Math.PI);
cek('PI ~ 3,14159', dekat(Math.PI, 3.14159, 1e-5));
cek('segi 96 dibulatkan 2 angka = 3,14', Math.round(kelilingPoligon(96, 0.5) * 100) / 100 === 3.14);

cek('misi1 langkah menuju 1', 1 - 1 / 1024 > 0.999);
cek('misi2 0,999 menuju 1', dekat(1 - 0.999, 0.001));
cek('misi3 1/1000 = 0,001 menuju 0', dekat(1 / 1000, 0.001));
cek('misi4 asimtot x=100 y=0,01', dekat(1 / 100, 0.01));
cek('misi5 segi 96 = 3,14', Math.round(kelilingPoligon(96, 0.5) * 100) / 100 === 3.14);

console.log('verifikasi_p3k7: ' + ok + ' OK, ' + gagal + ' GAGAL');
if (gagal > 0) process.exit(1);
