const fs = require('fs');
const path = '/home/z/my-project/hasbul-repo/akiomidaspace/js/';
const cerita = fs.readFileSync(path + 'cerita-data.js', 'utf8');
const main = fs.readFileSync(path + 'pelajaran-main.js', 'utf8');
const p3src = fs.readFileSync(path + 'pintu3-data.js', 'utf8');
const p1src = fs.readFileSync(path + 'pintu1-data.js', 'utf8');
const p2src = fs.readFileSync(path + 'pintu2-data.js', 'utf8');

let OK = 0, FAIL = 0;
function cek(nama, kondisi, detail) {
  if (kondisi) { OK++; }
  else { FAIL++; console.log('GAGAL ' + nama + (detail ? ' :: ' + detail : '')); }
}

const ID_BARU = [];
for (let i = 21; i <= 30; i++) ID_BARU.push('p3-' + String(i).padStart(3, '0'));

function blokNaskah(src, id) {
  const awal = src.indexOf("'" + id + "': {");
  if (awal < 0) return null;
  const next = src.indexOf("\n    '", awal + 10);
  const tutup = src.indexOf("\n  };", awal + 10);
  let batas = next > 0 ? next : src.length;
  if (tutup > 0 && tutup < batas) batas = tutup;
  return src.slice(awal, batas);
}
for (const id of ID_BARU) {
  const b = blokNaskah(cerita, id);
  cek(id + ' ada', !!b);
  if (!b) continue;
  const tema = (b.match(/tema:\s*'([^']*)'/) || [])[1];
  cek(id + ' tema ada', !!tema);
  const glif = (b.match(/glif:\s*'([^']*)'/) || [])[1];
  cek(id + ' glif ada', !!glif);
  const ucap = (b.match(/ucap:\s*\[([^\]]*)\]/) || [])[1];
  cek(id + ' ucap 2 frasa', !!ucap && ucap.split(',').length === 2);
  const stasiun = (b.match(/objek:\s*'([^']*)'/g) || []).map(s => s.match(/'([^']*)'/)[1]);
  cek(id + ' 5 stasiun (4 objek + tugu)', stasiun.length === 5, stasiun.join());
  cek(id + ' tugu terakhir dgn akhir:true', /objek:\s*'tugu',\s*akhir:\s*true/.test(b));
  const teksList = (b.match(/teks:\s*'((?:[^'\\]|\\.)*)'/g) || []).map(s => s.slice(7, -1));
  cek(id + ' 5 teks', teksList.length === 5, teksList.length + ' teks');
  for (let i = 0; i < teksList.length; i++) {
    cek(id + ' teks#' + (i + 1) + ' >= 200 char', teksList[i].length >= 200, teksList[i].length + ' char');
    const kalimat = teksList[i].split(/[.!?]+\s/).filter(s => s.trim().length > 2).length;
    cek(id + ' teks#' + (i + 1) + ' >= 3 kalimat', kalimat >= 3, kalimat + ' kalimat');
  }
  cek(id + ' tugu Owalah', /Owalah,/.test(teksList[4]));
  cek(id + ' tugu Mudah, bukan?', teksList[4].endsWith('Mudah, bukan?'));
}

/* ===== 2. tema terdaftar di TEMA_CFG + AMB_CFG + bakarLatar ===== */
const TEMA = ['bengkelPangkat', 'mejaLipatKertas', 'tamanBentukPangkat', 'jalanPulangAkar', 'kantorDetektifLog', 'tanggaPangkatDuaArah', 'rumahKacaTumbuh', 'lapanganBolaSenja', 'observatoriumAngka', 'puncakTanggaPangkat'];
for (const t of TEMA) {
  cek('TEMA_CFG ' + t, new RegExp(t + ':\\s*\\{\\s*glif:').test(main));
  cek('AMB_CFG ' + t, new RegExp(t + ':\\s*\\{\\s*jenis:').test(main));
  cek('bakarLatar ' + t, main.includes("TEMA_NAMA === '" + t + "'"));
}

/* ===== 3. objek terdaftar + fungsi tepat-1 ===== */
const OBJ = ['mesinPangkatTiga', 'papanTulisKaliUlang', 'kartuPangkatKecil', 'rakHasilDelapan', 'kertasLipatPertama', 'tumpukanLipatDelapan', 'penggarisTebalTumpuk', 'papanJalanKeBulan', 'petakRumputTigaTiga', 'kotakKayuKubik', 'papanLuasDanIsi', 'patungBentukSaudara', 'gerbangRumahEmpatSembilan', 'jalanLangkahTujuh', 'papanAkarJalanBalik', 'lampuPulangPasangan', 'papanKasusDelapan', 'kartuSaksiDuaEmpat', 'lampuJawabanTiga', 'mejaBerkasLog', 'anakTanggaNaikPangkat', 'anakTanggaTurunBagi', 'pijakanNolSatu', 'papanLanjutTurunSetengah', 'cawanKoloniSatu', 'cawanKoloniEmpat', 'papanJamGandakan', 'papanDenyutSetia', 'bolaKaretDilepas', 'garisPantulanLimaPuluh', 'papanTinggiMenurun', 'papanKecilTeratur', 'teleskopArahLangit', 'papanBintangPuluhDua', 'penggarisRambutMini', 'bukuTulisPangkat', 'limaTanggaMisiPangkat', 'papanMisiDuaLima', 'papanMisiTigaEmpat', 'gerbangJuaraTangga'];
for (const o of OBJ) {
  cek('registry ' + o, main.includes(o + ': gambar'));
  cek('partikel ' + o, new RegExp("([, {])" + o + ":\\s*'(asap|daun|kilau)'").test(main));
  const nDef = (main.match(new RegExp('function gambar' + o.charAt(0).toUpperCase() + o.slice(1) + '\\(', 'g')) || []).length;
  cek('fungsi ' + o + ' tepat-1', nDef === 1, nDef + ' definisi');
}

/* ===== 4. registry & partikel tanpa duplikat ===== */
const regStart = main.indexOf('const OBJEK_GAMBAR = {');
const regEnd = main.indexOf('\n  };', regStart);
const regSrc = main.slice(regStart, regEnd);
const regKeys = [...regSrc.matchAll(/([a-zA-Z0-9_]+): gambar/g)].map(m => m[1]);
cek('registry >= 900 kunci', regKeys.length >= 900, regKeys.length + ' kunci');
const dupReg = regKeys.filter((k, i) => regKeys.indexOf(k) !== i);
cek('registry nol duplikat', dupReg.length === 0, dupReg.slice(0, 5).join());
const partStart = main.indexOf('const PARTIKEL_OBJEK = {');
const partEnd = main.indexOf('};', partStart);
const partSrc = main.slice(partStart, partEnd);
const partKeys = [...partSrc.matchAll(/([a-zA-Z0-9_]+): '(asap|daun|kilau)'/g)].map(m => m[1]);
cek('partikel >= 340 kunci', partKeys.length >= 340, partKeys.length + ' kunci');
const dupPart = partKeys.filter((k, i) => partKeys.indexOf(k) !== i);
cek('partikel nol duplikat', dupPart.length === 0, dupPart.slice(0, 5).join());

/* ===== 5. keunikan tema/glif/objek vs seluruh naskah ===== */
const temaSemua = [...cerita.matchAll(/tema:\s*'([^']*)'/g)].map(m => m[1]);
for (const t of TEMA) cek('tema "' + t + '" unik global', temaSemua.filter(x => x === t).length === 1, temaSemua.filter(x => x === t).length + 'x');
const glifSemua = [...cerita.matchAll(/glif:\s*'([^']*)'/g)].map(m => m[1]);
const glifBaru = ['2x2x2', 'lipat', '2 dan 3', '7x7', 'log2', 'turun', '1 2 4', 'setengah', 'x10', 'tangga!'];
for (const g of glifBaru) cek('glif "' + g + '" tepat-1 global', glifSemua.filter(x => x === g).length === 1, glifSemua.filter(x => x === g).length + 'x');
const objSemua = [...cerita.matchAll(/objek:\s*'([^']*)'/g)].map(m => m[1]);
for (const o of OBJ) cek('objek "' + o + '" tepat-1 global', objSemua.filter(x => x === o).length === 1, objSemua.filter(x => x === o).length + 'x');

global.window = {};
require(path + 'pintu1-data.js');
require(path + 'pintu2-data.js');
require(path + 'pintu3-data.js');

const src2 = fs.readFileSync(path + 'cerita-data.js', 'utf8');
eval(src2);
const CERITA = window.CERITA;
const P3 = window.P3;
const whitelist = [/bukan mantra/i, /bukan sulap/i, /tak ada sihir/i, /bukan menebak nasib/i];
const terlarang = /(ramal|meramal|numerolog|prediksi|takdir|peruntungan|zodiak|horoskop|primbon|weton|jimat|sihir|sakti|sulap|nasib|astro)([a-z]*)/gi;
let temuan = 0;
const teksSemua = [];
for (let i = 1; i <= 100; i++) {
  for (const P of [window.P1, window.P2, window.P3]) {
    const t = P.topikById ? P.topikById('p' + (P === window.P1 ? '1' : P === window.P2 ? '2' : '3') + '-' + String(i).padStart(3, '0')) : null;
    if (t) {
      const c = CERITA.untuk(t);
      for (const s of (c.stasiun || [])) teksSemua.push(s.judul + ' ' + s.teks);
    }
  }
}
for (const tx of teksSemua) {
  const m = tx.match(terlarang);
  if (m) {
    const ctx = tx.slice(Math.max(0, tx.indexOf(m[0]) - 40), tx.indexOf(m[0]) + 50);
    if (!whitelist.some(w => w.test(ctx))) { temuan++; console.log('TERLARANG: ' + m[0] + ' :: ' + ctx); }
  }
}
cek('anti-ramalan seluruh naskah: nol pelanggaran', temuan === 0, temuan + ' temuan');

const angkaKunci = {
  'p3-021': ['2 × 2 × 2 = 8', '16', '100'],
  'p3-022': ['0,1', '256', '25,6', '439.804', '384.400'],
  'p3-023': ['3 × 3 = 9', '2 × 2 × 2 = 8'],
  'p3-024': ['49', '7 × 7 = 49', '81', '9'],
  'p3-025': ['8', '16', '32'],
  'p3-026': ['2, 4, 8, 16', 'setengah', 'seperempat'],
  'p3-027': ['1, 2, 4, 8, 16'],
  'p3-028': ['100, 50, 25, 12,5'],
  'p3-029': ['10 pangkat 22', '0,0001', '0,1 milimeter'],
  'p3-030': ['32', '81', '9', '1024', '102,4'],
};
for (const id of ID_BARU) {
  const b = blokNaskah(cerita, id);
  for (const k of angkaKunci[id]) cek(id + ' memuat "' + k + '"', b.includes(k));
}
cek("'hitungan itu hanya alat' hadir di batch", /hitungan itu hanya alat/i.test(cerita.slice(cerita.indexOf("'p3-021'"), cerita.indexOf("'p3-030'") + 3000)));

const blokIds = [...cerita.matchAll(/'(p[123]-\d{3})':\s*\{/g)].map(m => m[1]);
cek('total naskah 230', blokIds.length === 230, blokIds.length);
for (const id of blokIds) {
  const b = blokNaskah(cerita, id);
  cek(id + ' tugu+Owalah', /objek:\s*'tugu',\s*akhir:\s*true/.test(b) && /Owalah/.test(b));
  cek(id + ' Mudah, bukan? akhiran', /Mudah, bukan\?'/.test(b));
}

/* ===== 9. pintu3-data: 100 judul + p3-021..030 terpasang ===== */
for (let i = 1; i <= 100; i++) cek('P3 judul ' + i + ' ada', p3src.includes("'p3-" + String(i).padStart(3, '0') + "'"));
cek('P3 k3 nama', p3src.includes('Eksponen & Logaritma'));

/* ===== 10. glif & nama tema bersih kata terlarang ===== */
const terlarangNama = /(ramal|sihir|sakti|sulap|nasib|takdir|jimat|weton|zodiak|horoskop|numerolog|primbon|mantra|peruntungan|prediksi)/i;
for (const t of TEMA) cek('tema "' + t + '" bersih', !terlarangNama.test(t));
for (const o of OBJ) cek('objek "' + o + '" bersih', !terlarangNama.test(o));

console.log('\n===== VALIDASI: ' + OK + ' OK, ' + FAIL + ' GAGAL =====');
if (FAIL > 0) process.exit(1);
