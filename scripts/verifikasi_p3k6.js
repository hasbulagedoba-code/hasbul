const hasil = [];
const EPS = 1e-9;
function cek(nama, kondisi, rincian) {
  hasil.push({ nama, ok: !!kondisi, rincian: rincian || '' });
}
const dekat = (a, b, e) => Math.abs(a - b) < (e || EPS);

cek('ani 5 timur + budi 5 barat: jarak 5+5=10', 5 + 5 === 10);
cek('arah berlawanan melebar: 10 > 5', 10 > 5);
cek('jalan sekolah: maju 4 lalu samping 3, jalan panjang 4+3=7', 4 + 3 === 7);
cek('pintas: 4x4 + 3x3 = 25', 4 * 4 + 3 * 3 === 25);
cek('akar 25 = 5', dekat(Math.sqrt(25), 5, 1e-12));
cek('pintas 5 < jalan 7', 5 < 7);
cek('sambung searah: maju 3 + maju 2 = maju 5', 3 + 2 === 5);
cek('sambung beda arah: maju 3 + mundur 2 = maju 1', 3 - 2 === 1);
cek('lawan: 3 + (-3) = 0', 3 + (-3) === 0);
cek('kembali ke patok: hasil nol', 3 + (-3) === 0 && 0 === 0);
cek('kisi (3,2): kanan 3 naik 2, angka pertama bukan kedua', 3 !== 2);
cek('(3,2) dan (2,3) tempat bendera beda', dekat(3 * 2, 2 * 3) && 3 !== 2);
cek('kisi (2,3) tetap sama panjang dgn (3,2): 3x3+2x2 sama', 3 * 3 + 2 * 2 === 2 * 2 + 3 * 3);
cek('perahu: dayung 4 tegak + arus 3 hilir', 4 + 3 === 7);
cek('luncuran: 4x4 + 3x3 = 25 akar 5', dekat(Math.sqrt(4 * 4 + 3 * 3), 5, 1e-12));
cek('serong 5 antara 4 dan 7', 5 > 4 && 5 < 7);
cek('alamat hotel: lorong 2, kamar 3, lantai 4 = tiga angka', [2, 3, 4].length === 3);
cek('burung: kanan 2, maju 3, naik 4', 2 + 3 + 4 === 9);
cek('tangga menara: maju 2, samping 2, naik 1', 2 + 2 + 1 === 5);
cek('lantai siku: 2x2 + 2x2 = 8', 2 * 2 + 2 * 2 === 8);
cek('tambah naik: 8 + 1x1 = 9', 8 + 1 * 1 === 9);
cek('jarak lurus ruang = akar 9 = 3', dekat(Math.sqrt(9), 3, 1e-12));
cek('jarak ruang 3 < total langkah 5', 3 < 5);
const kubus = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]];
cek('susunan 4 kubus: A(0,0,0) B(1,0,0) C(0,1,0) D(0,0,1)', kubus.length === 4);
const atas = new Set(kubus.map(k => k[0] + ',' + k[1]));
const depan = new Set(kubus.map(k => k[0] + ',' + k[2]));
const samping = new Set(kubus.map(k => k[1] + ',' + k[2]));
cek('foto atas (xy): 3 kotak bersudut', atas.size === 3, [...atas].join(' '));
cek('foto depan (xz): 3 kotak bersudut', depan.size === 3, [...depan].join(' '));
cek('foto samping (yz): 3 kotak bersudut', samping.size === 3, [...samping].join(' '));
cek('tiga foto 3 kotak, kubus asli 4', atas.size === 3 && depan.size === 3 && samping.size === 3 && kubus.length === 4);
cek('misi 1: 5+5=10', 5 + 5 === 10);
cek('misi 2: 16+9=25 akar 5', dekat(Math.sqrt(16 + 9), 5, 1e-12));
cek('misi 3: 3+(-3)=0', 3 + (-3) === 0);
cek('misi 4: (3,2) kanan 3 naik 2', 3 + 2 === 5);
cek('misi 5: 4+4+1=9 akar 3', dekat(Math.sqrt(4 + 4 + 1), 3, 1e-12));

const gagal = hasil.filter(h => !h.ok);
hasil.forEach(h => { if (!h.ok) console.log('GAGAL:', h.nama, h.rincian); });
console.log(`verifikasi_p3k6: ${hasil.length - gagal.length} OK, ${gagal.length} GAGAL`);
if (gagal.length) process.exit(1);
