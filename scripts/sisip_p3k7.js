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
const blokA = S('blok_p3k7_a.txt');
const blokB = S('blok_p3k7_b.txt');
const akhirPeta = "    },\n  };\n\n  function untuk(topik)";
cer = gantiIsi(cer, akhirPeta, "    }," + blokA + blokB + "  };\n\n  function untuk(topik)", 'akhir-peta');
fs.writeFileSync(path.join(R, 'cerita-data.js'), cer);

let main = fs.readFileSync(path.join(R, 'pelajaran-main.js'), 'utf8');
const tema = S('blok_p3k7_tema.txt').replace(/\n$/, '');
const amb = S('blok_p3k7_amb.txt').replace(/\n$/, '');
const latar = S('blok_p3k7_latar.txt').replace(/\n$/, '');
const obj1 = S('blok_p3k7_objek1.txt').replace(/\n$/, '');
const obj2 = S('blok_p3k7_objek2.txt').replace(/\n$/, '');

main = gantiIsi(main,
  "    puncakLintasLembah: { glif: ['arah', 'siku', '?'], awan: null, awan2: null },\n  };",
  "    puncakLintasLembah: { glif: ['arah', 'siku', '?'], awan: null, awan2: null },\n" + tema + "\n  };",
  'tema-cfg');

main = gantiIsi(main,
  "    puncakLintasLembah: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 180], n: 16 },\n  };",
  "    puncakLintasLembah: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 180], n: 16 },\n" + amb + "\n  };",
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
  "    tembokCahayaSetengah: gambarTembokCahayaSetengah, papanJejakLangkah: gambarPapanJejakLangkah, kertasSisaJarang: gambarKertasSisaJarang, garisLantaiTotal: gambarGarisLantaiTotal,",
  "    tonggakSatuCahaya: gambarTonggakSatuCahaya, tigaPapanSembilan: gambarTigaPapanSembilan, papanJarakMengecil: gambarPapanJarakMengecil, lorongMenujuSatu: gambarLorongMenujuSatu,",
  "    keretaMenujuPeron: gambarKeretaMenujuPeron, papanJadwalDuaArah: gambarPapanJadwalDuaArah, titikSepakatTiga: gambarTitikSepakatTiga, pintuArahCukup: gambarPintuArahCukup,",
  "    kurvaBatuKebun: gambarKurvaBatuKebun, papanNilaiKebalikan: gambarPapanNilaiKebalikan, pagarAsimtot: gambarPagarAsimtot, bungaDuaSisiPagar: gambarBungaDuaSisiPagar,",
  "    taliSatuMeter: gambarTaliSatuMeter, guntingEmpatPotong: gambarGuntingEmpatPotong, mistarTotalSatu: gambarMistarTotalSatu, gulunganBenangHalus: gambarGulunganBenangHalus,",
  "    tanggaDuaAnak: gambarTanggaDuaAnak, tanggaEmpatAnak: gambarTanggaEmpatAnak, lerengMulusBatu: gambarLerengMulusBatu, gerbangKalkulusBukit: gambarGerbangKalkulusBukit,",
  "    lintasanRobotPelari: gambarLintasanRobotPelari, papanJendelaDetik: gambarPapanJendelaDetik, stopwatchKilas: gambarStopwatchKilas, papanLajuSesaat: gambarPapanLajuSesaat,",
  "    telagaBijiPertama: gambarTelagaBijiPertama, papanPembagiRaksasa: gambarPapanPembagiRaksasa, bijiSerbukHalus: gambarBijiSerbukHalus, permukaanAirTenang: gambarPermukaanAirTenang,",
  "    rodaSegiEnam: gambarRodaSegiEnam, rodaSegiDuaBelas: gambarRodaSegiDuaBelas, papanKelilingPoligon: gambarPapanKelilingPoligon, rodaLingkaranSempurna: gambarRodaLingkaranSempurna,",
  "    limaPapanMisiMenuju: gambarLimaPapanMisiMenuju, papanMisiLangkahSembilan: gambarPapanMisiLangkahSembilan, papanMisiPembagiAsimtot: gambarPapanMisiPembagiAsimtot, gerbangJuaraMenuju: gambarGerbangJuaraMenuju,",
].join('\n');

main = gantiIsi(main,
  "    limaPapanMisiPanah: gambarLimaPapanMisiPanah, papanMisiPanahArah: gambarPapanMisiPanahArah, papanMisiPanahSambung: gambarPapanMisiPanahSambung, gerbangJuaraLintas: gambarGerbangJuaraLintas,\n  };",
  "    limaPapanMisiPanah: gambarLimaPapanMisiPanah, papanMisiPanahArah: gambarPapanMisiPanahArah, papanMisiPanahSambung: gambarPapanMisiPanahSambung, gerbangJuaraLintas: gambarGerbangJuaraLintas,\n" + regBaru + "\n  };",
  'registry');

const part = [
  "tembokCahayaSetengah: 'kilau', papanJejakLangkah: 'kilau', kertasSisaJarang: 'kilau', garisLantaiTotal: 'kilau'",
  "tonggakSatuCahaya: 'kilau', tigaPapanSembilan: 'kilau', papanJarakMengecil: 'kilau', lorongMenujuSatu: 'kilau'",
  "keretaMenujuPeron: 'asap', papanJadwalDuaArah: 'kilau', titikSepakatTiga: 'kilau', pintuArahCukup: 'kilau'",
  "kurvaBatuKebun: 'kilau', papanNilaiKebalikan: 'kilau', pagarAsimtot: 'kilau', bungaDuaSisiPagar: 'daun'",
  "taliSatuMeter: 'kilau', guntingEmpatPotong: 'kilau', mistarTotalSatu: 'kilau', gulunganBenangHalus: 'kilau'",
  "tanggaDuaAnak: 'kilau', tanggaEmpatAnak: 'kilau', lerengMulusBatu: 'kilau', gerbangKalkulusBukit: 'kilau'",
  "lintasanRobotPelari: 'asap', papanJendelaDetik: 'kilau', stopwatchKilas: 'kilau', papanLajuSesaat: 'kilau'",
  "telagaBijiPertama: 'kilau', papanPembagiRaksasa: 'kilau', bijiSerbukHalus: 'kilau', permukaanAirTenang: 'kilau'",
  "rodaSegiEnam: 'asap', rodaSegiDuaBelas: 'asap', papanKelilingPoligon: 'kilau', rodaLingkaranSempurna: 'kilau'",
  "limaPapanMisiMenuju: 'kilau', papanMisiLangkahSembilan: 'kilau', papanMisiPembagiAsimtot: 'kilau', gerbangJuaraMenuju: 'kilau'",
].join(', ');

main = gantiIsi(main,
  "gerbangJuaraLintas: 'kilau' };",
  "gerbangJuaraLintas: 'kilau', " + part + " };",
  'partikel');

fs.writeFileSync(path.join(R, 'pelajaran-main.js'), main);
console.log('sisip_p3k7: semua blok tersisip OK');
