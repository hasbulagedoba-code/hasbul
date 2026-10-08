const fs = require('fs');
const path = require('path');
const S = f => fs.readFileSync(path.join(__dirname, f), 'utf8');
const R = path.join(__dirname, '..', 'akiomidaspace', 'js');

function gantiIsi(src, cari, blok, label) {
  const n = src.split(cari).length - 1;
  if (n !== 1) throw new Error('marker ' + label + ' muncul ' + n + ' kali');
  return src.replace(cari, blok);
}

let cer = fs.readFileSync(path.join(R, 'cerita-data.js'), 'utf8');
const blokA = S('blok_p3k6_a.txt');
const blokB = S('blok_p3k6_b.txt');
const akhirPeta = "    },\n  };\n\n  function untuk(topik)";
cer = gantiIsi(cer, akhirPeta, "    }," + blokA + blokB + "  };\n\n  function untuk(topik)", 'akhir-peta');
fs.writeFileSync(path.join(R, 'cerita-data.js'), cer);

let main = fs.readFileSync(path.join(R, 'pelajaran-main.js'), 'utf8');
const tema = S('blok_p3k6_tema.txt').replace(/\n$/, '');
const amb = S('blok_p3k6_amb.txt').replace(/\n$/, '');
const latar = S('blok_p3k6_latar.txt').replace(/\n$/, '');
const obj1 = S('blok_p3k6_objek1.txt').replace(/\n$/, '');
const obj2 = S('blok_p3k6_objek2.txt').replace(/\n$/, '');

main = gantiIsi(main,
  "    puncakPengukurJauh: { glif: ['0,8', '0,6', 'ukur'], awan: null, awan2: null },\n  };",
  "    puncakPengukurJauh: { glif: ['0,8', '0,6', 'ukur'], awan: null, awan2: null },\n" + tema + "\n  };",
  'tema-cfg');

main = gantiIsi(main,
  "    puncakPengukurJauh: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 180], n: 16 },\n  };",
  "    puncakPengukurJauh: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 180], n: 16 },\n" + amb + "\n  };",
  'amb-cfg');

main = gantiIsi(main,
  "    }\n\n    return cv;\n  }\n  const LATAR = bakarLatar();",
  "    }\n\n" + latar + "\n\n    return cv;\n  }\n  const LATAR = bakarLatar();",
  'bakar-latar');

main = gantiIsi(main,
  "  const OBJEK_GAMBAR = {",
  obj1 + "\n" + obj2 + "\n  const OBJEK_GAMBAR = {",
  'fungsi-objek');

const regBaru = [
  "    duaPanahBerlawanan: gambarDuaPanahBerlawanan, papanBesarArah: gambarPapanBesarArah, patokJarakSepuluh: gambarPatokJarakSepuluh, gerbangArahVektor: gambarGerbangArahVektor,",
  "    jalanZigzagSekolah: gambarJalanZigzagSekolah, panahLurusTikus: gambarPanahLurusTikus, segitigaJalanSiku: gambarSegitigaJalanSiku, papanPetunjukPanah: gambarPapanPetunjukPanah,",
  "    duaPanahBerturut: gambarDuaPanahBerturut, panahJumlahTunggal: gambarPanahJumlahTunggal, jalurMundurSambung: gambarJalurMundurSambung, papanUjungKeUjung: gambarPapanUjungKeUjung,",
  "    panahKembarSejajar: gambarPanahKembarSejajar, panahLawanBerbalik: gambarPanahLawanBerbalik, patokKembaliNol: gambarPatokKembaliNol, papanAngkaMinus: gambarPapanAngkaMinus,",
  "    kisiTaliHalaman: gambarKisiTaliHalaman, kartuVektorTigaDua: gambarKartuVektorTigaDua, kartuVektorDuaTiga: gambarKartuVektorDuaTiga, papanUrutanPenting: gambarPapanUrutanPenting,",
  "    perahuTepiDermaga: gambarPerahuTepiDermaga, panahArusDeras: gambarPanahArusDeras, pantaiMendaratMiring: gambarPantaiMendaratMiring, papanHitungPaduan: gambarPapanHitungPaduan,",
  "    petaKotaDariAtas: gambarPetaKotaDariAtas, menaraTigaLantai: gambarMenaraTigaLantai, kartuAlamatTigaAngka: gambarKartuAlamatTigaAngka, burungTerbangAlamat: gambarBurungTerbangAlamat,",
  "    tanggaTigaArahMenara: gambarTanggaTigaArahMenara, liftMenaraTegak: gambarLiftMenaraTegak, papanJarakMiringTiga: gambarPapanJarakMiringTiga, lintasanTerbangLurus: gambarLintasanTerbangLurus,",
  "    susunKubusMeja: gambarSusunKubusMeja, fotoDepanBentukL: gambarFotoDepanBentukL, fotoAtasBentukSudut: gambarFotoAtasBentukSudut, fotoSampingBentukSudut: gambarFotoSampingBentukSudut,",
  "    limaPapanMisiPanah: gambarLimaPapanMisiPanah, papanMisiPanahArah: gambarPapanMisiPanahArah, papanMisiPanahSambung: gambarPapanMisiPanahSambung, gerbangJuaraLintas: gambarGerbangJuaraLintas,",
].join('\n');

main = gantiIsi(main,
  "    menaraPengukurMalam: gambarMenaraPengukurMalam, papanMisiSisiTangga: gambarPapanMisiSisiTangga, papanMisiBayangMenara: gambarPapanMisiBayangMenara, limaPapanMisiJauh: gambarLimaPapanMisiJauh,\n  };",
  "    menaraPengukurMalam: gambarMenaraPengukurMalam, papanMisiSisiTangga: gambarPapanMisiSisiTangga, papanMisiBayangMenara: gambarPapanMisiBayangMenara, limaPapanMisiJauh: gambarLimaPapanMisiJauh,\n" + regBaru + "\n  };",
  'registry');

const part = [
  "duaPanahBerlawanan: 'kilau', papanBesarArah: 'kilau', patokJarakSepuluh: 'kilau', gerbangArahVektor: 'kilau'",
  "jalanZigzagSekolah: 'kilau', panahLurusTikus: 'kilau', segitigaJalanSiku: 'kilau', papanPetunjukPanah: 'kilau'",
  "duaPanahBerturut: 'kilau', panahJumlahTunggal: 'kilau', jalurMundurSambung: 'kilau', papanUjungKeUjung: 'kilau'",
  "panahKembarSejajar: 'kilau', panahLawanBerbalik: 'kilau', patokKembaliNol: 'kilau', papanAngkaMinus: 'kilau'",
  "kisiTaliHalaman: 'daun', kartuVektorTigaDua: 'kilau', kartuVektorDuaTiga: 'kilau', papanUrutanPenting: 'kilau'",
  "perahuTepiDermaga: 'kilau', panahArusDeras: 'kilau', pantaiMendaratMiring: 'kilau', papanHitungPaduan: 'kilau'",
  "petaKotaDariAtas: 'kilau', menaraTigaLantai: 'kilau', kartuAlamatTigaAngka: 'kilau', burungTerbangAlamat: 'kilau'",
  "tanggaTigaArahMenara: 'kilau', liftMenaraTegak: 'asap', papanJarakMiringTiga: 'kilau', lintasanTerbangLurus: 'kilau'",
  "susunKubusMeja: 'kilau', fotoDepanBentukL: 'kilau', fotoAtasBentukSudut: 'kilau', fotoSampingBentukSudut: 'kilau'",
  "limaPapanMisiPanah: 'kilau', papanMisiPanahArah: 'kilau', papanMisiPanahSambung: 'kilau', gerbangJuaraLintas: 'kilau'",
].join(', ');

main = gantiIsi(main,
  "limaPapanMisiJauh: 'kilau' };",
  "limaPapanMisiJauh: 'kilau', " + part + " };",
  'partikel');

fs.writeFileSync(path.join(R, 'pelajaran-main.js'), main);
console.log('sisip_p3k6: semua blok tersisip OK');
