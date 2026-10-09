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
const blokA = S('blok_p3k8_a.txt');
const blokB = S('blok_p3k8_b.txt');
const akhirPeta = "    },\n  };\n\n  function untuk(topik)";
cer = gantiIsi(cer, akhirPeta, "    }," + blokA + blokB + "  };\n\n  function untuk(topik)", 'akhir-peta');
fs.writeFileSync(path.join(R, 'cerita-data.js'), cer);

let main = fs.readFileSync(path.join(R, 'pelajaran-main.js'), 'utf8');
const tema = S('blok_p3k8_tema.txt').replace(/\n$/, '');
const amb = S('blok_p3k8_amb.txt').replace(/\n$/, '');
const latar = S('blok_p3k8_latar.txt').replace(/\n$/, '');
const obj1 = S('blok_p3k8_objek1.txt').replace(/\n$/, '');
const obj2 = S('blok_p3k8_objek2.txt').replace(/\n$/, '');

main = gantiIsi(main,
  "    puncakTepiMenuju: { glif: ['?', '1', '0'], awan: null, awan2: null },\n  };",
  "    puncakTepiMenuju: { glif: ['?', '1', '0'], awan: null, awan2: null },\n" + tema + "\n  };",
  'tema-cfg');

main = gantiIsi(main,
  "    puncakTepiMenuju: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 180], n: 16 },\n  };",
  "    puncakTepiMenuju: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 180], n: 16 },\n" + amb + "\n  };",
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
  "    keranBergantiDeras: gambarKeranBergantiDeras, gelasPengukurAir: gambarGelasPengukurAir, papanLajuTigaSaat: gambarPapanLajuTigaSaat, jamDetikTaman: gambarJamDetikTaman,",
  "    papanKilometerEnam: gambarPapanKilometerEnam, speedometerBergetar: gambarSpeedometerBergetar, duaMobilRata: gambarDuaMobilRata, jamPerjalananSatu: gambarJamPerjalananSatu,",
  "    kurvaBukitHijau: gambarKurvaBukitHijau, penggarisMenempel: gambarPenggarisMenempel, titikTapakCahaya: gambarTitikTapakCahaya, papanKemiringanSatu: gambarPapanKemiringanSatu,",
  "    mesinPangkatTurun: gambarMesinPangkatTurun, bolaKuadratLompat: gambarBolaKuadratLompat, rodaGigiGanjil: gambarRodaGigiGanjil, papanAturanPangkat: gambarPapanAturanPangkat,",
  "    panahNaikHijau: gambarPanahNaikHijau, papanBerhentiSesaat: gambarPapanBerhentiSesaat, panahTurunMerah: gambarPanahTurunMerah, jalanBergelombang: gambarJalanBergelombang,",
  "    airMancurMelengkung: gambarAirMancurMelengkung, papanTinggiEmpat: gambarPapanTinggiEmpat, titikPuncakKilau: gambarTitikPuncakKilau, kolamCipratan: gambarKolamCipratan,",
  "    tanggaTigaAnakLaju: gambarTanggaTigaAnakLaju, papanJarakBola: gambarPapanJarakBola, papanLajuNaikDua: gambarPapanLajuNaikDua, papanPercepatanDua: gambarPapanPercepatanDua,",
  "    kurvaSenyumRaksasa: gambarKurvaSenyumRaksasa, papanLembahNol: gambarPapanLembahNol, titikTerendahKilau: gambarTitikTerendahKilau, burungLingkarLembah: gambarBurungLingkarLembah,",
  "    motorSoreKencang: gambarMotorSoreKencang, speedometerNaikTetap: gambarSpeedometerNaikTetap, papanDetikLima: gambarPapanDetikLima, jalanDesaMelengkung: gambarJalanDesaMelengkung,",
  "    kompasKemiringan: gambarKompasKemiringan, limaPapanMisiLereng: gambarLimaPapanMisiLereng, papanPuncakLembah: gambarPapanPuncakLembah, gerbangJuaraLereng: gambarGerbangJuaraLereng,",
].join('\n');

main = gantiIsi(main,
  "    limaPapanMisiMenuju: gambarLimaPapanMisiMenuju, papanMisiLangkahSembilan: gambarPapanMisiLangkahSembilan, papanMisiPembagiAsimtot: gambarPapanMisiPembagiAsimtot, gerbangJuaraMenuju: gambarGerbangJuaraMenuju,\n  };",
  "    limaPapanMisiMenuju: gambarLimaPapanMisiMenuju, papanMisiLangkahSembilan: gambarPapanMisiLangkahSembilan, papanMisiPembagiAsimtot: gambarPapanMisiPembagiAsimtot, gerbangJuaraMenuju: gambarGerbangJuaraMenuju,\n" + regBaru + "\n  };",
  'registry');

const part = [
  "keranBergantiDeras: 'daun', gelasPengukurAir: 'kilau', papanLajuTigaSaat: 'kilau', jamDetikTaman: 'kilau'",
  "papanKilometerEnam: 'kilau', speedometerBergetar: 'kilau', duaMobilRata: 'kilau', jamPerjalananSatu: 'kilau'",
  "kurvaBukitHijau: 'kilau', penggarisMenempel: 'kilau', titikTapakCahaya: 'kilau', papanKemiringanSatu: 'kilau'",
  "mesinPangkatTurun: 'asap', bolaKuadratLompat: 'kilau', rodaGigiGanjil: 'kilau', papanAturanPangkat: 'kilau'",
  "panahNaikHijau: 'kilau', papanBerhentiSesaat: 'kilau', panahTurunMerah: 'kilau', jalanBergelombang: 'kilau'",
  "airMancurMelengkung: 'kilau', papanTinggiEmpat: 'kilau', titikPuncakKilau: 'kilau', kolamCipratan: 'kilau'",
  "tanggaTigaAnakLaju: 'kilau', papanJarakBola: 'kilau', papanLajuNaikDua: 'kilau', papanPercepatanDua: 'kilau'",
  "kurvaSenyumRaksasa: 'kilau', papanLembahNol: 'kilau', titikTerendahKilau: 'kilau', burungLingkarLembah: 'kilau'",
  "motorSoreKencang: 'asap', speedometerNaikTetap: 'kilau', papanDetikLima: 'kilau', jalanDesaMelengkung: 'asap'",
  "kompasKemiringan: 'kilau', limaPapanMisiLereng: 'kilau', papanPuncakLembah: 'kilau', gerbangJuaraLereng: 'kilau'",
].join(', ');

main = gantiIsi(main,
  "gerbangJuaraMenuju: 'kilau' };",
  "gerbangJuaraMenuju: 'kilau', " + part + " };",
  'partikel');

fs.writeFileSync(path.join(R, 'pelajaran-main.js'), main);
console.log('sisip_p3k8: semua blok tersisip OK');
