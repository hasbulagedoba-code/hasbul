const fs = require('fs');
const path = require('path');
let pass = 0, fail = 0;
const tes = (nama, kondisi, detail) => {
  if (kondisi) { pass++; }
  else { fail++; console.log(` GAGAL ${nama}${detail ? ' :: ' + detail : ''}`); }
};
global.window = {};
const repo = path.join(__dirname, '..', 'akiomidaspace');
require(path.join(repo, 'js', 'cerita-data.js'));
const CERITA = window.CERITA;
global.window = { CERITA };
require(path.join(repo, 'js', 'pintu2-data.js'));
const P2 = window.P2 || global.window.P2;
const ceritaSrc = fs.readFileSync(path.join(repo, 'js', 'cerita-data.js'), 'utf8');
const pelajaranSrc = fs.readFileSync(path.join(repo, 'js', 'pelajaran-main.js'), 'utf8');
const p2Src = fs.readFileSync(path.join(repo, 'js', 'pintu2-data.js'), 'utf8');

const K9 = ['p2-081','p2-082','p2-083','p2-084','p2-085','p2-086','p2-087','p2-088','p2-089','p2-090'];
const TEMA = ['kandangData','mejaGelasRata','susunBatuSore','rakSandalSiang','lapanganBatang','mejaSuhuSore','mejaKueMalam','geraiTabelPasar','duaLadangRentang','balaiRisetMalam'];
const GLIF = ['7 angka','12:3','tengah','5 kali','6-3-9','20-28','40%','4x3','13-1','30'];
const OBJEK = {
  'p2-081': ['kandangBurungPagi','papanCatatTujuhHari','barisanAngkaKunjungan','papanPertanyaanSama'],
  'p2-082': ['gelasTigaBedatinggi','tekoTampungSemua','gelasTigaRataEmpat','papanCaraMean'],
  'p2-083': ['batuLimaBersusun','batuKetigaTengah','ujungPergiTengahTetap','papanMedianAman'],
  'p2-084': ['rakSandalSembilan','sandalMerahTumpuk','duaWarnaSisa','papanModusJawara'],
  'p2-085': ['tongkatPanenTiga','batangPisangSembilan','batangJambuTerpendek','papanBacaSekali'],
  'p2-086': ['kertasSuhuLimaTitik','garisSuhuNaik','garisSuhuTurun','papanDenyutData'],
  'p2-087': ['kueBulatPestaMalam','irisanCoklatEmpat','irisanStroberiVanila','papanPenuhSeratus'],
  'p2-088': ['geraiBuahPagi','rakBarisKolom','papanTabelPanen','papanBacaJudulDulu'],
  'p2-089': ['ladangKompakTujuh','ladangMenyebarTujuh','garisUkurRentang','papanRataSamaBeda'],
  'p2-090': ['balaiRisetLentera','papanDataLimaHari','misiTotalMeanEnam','misiMedianModus','misiRentangTujuh'],
};
K9.forEach((id, i) => {
  const n = CERITA.untuk({ id });
  tes(`${id} naskah ada`, !!n && !!n.stasiun);
  tes(`${id} tema ${TEMA[i]}`, n.tema === TEMA[i], String(n.tema));
  tes(`${id} npc glif ${GLIF[i]}`, n.npc && n.npc.glif === GLIF[i], n.npc && n.npc.glif);
  tes(`${id} npc ucap 2 baris`, n.npc && Array.isArray(n.npc.ucap) && n.npc.ucap.length === 2);
  tes(`${id} >=5 stasiun`, n.stasiun.length >= 5, String(n.stasiun.length));
  const isi = n.stasiun.filter(s => !s.akhir);
  tes(`${id} isi = ${OBJEK[id].length} + tugu`, isi.length === OBJEK[id].length && !!n.stasiun.find(s => s.akhir));
  isi.forEach((s, j) => {
    tes(`${id} st${j + 1} objek ${OBJEK[id][j]}`, s.objek === OBJEK[id][j], s.objek);
    tes(`${id} st${j + 1} teks >= 200`, s.teks.length >= 200, String(s.teks.length));
  });
  const tugu = n.stasiun.find(s => s.akhir);
  tes(`${id} tugu Owalah`, tugu.judul.includes('Owalah'));
  tes(`${id} payoff Owalah ternyata begini toh`, tugu.teks.includes('Owalah, ternyata begini toh'));
  tes(`${id} akhiran Mudah, bukan?`, tugu.teks.includes('Mudah, bukan?'));
});

TEMA.forEach(t => {
  tes(`TEMA_CFG ${t}`, pelajaranSrc.includes(`${t}: { glif:`));
  tes(`AMB_CFG ${t}`, pelajaranSrc.includes(`${t}: { jenis:`));
  tes(`bakarLatar ${t}`, pelajaranSrc.includes(`TEMA_NAMA === '${t}'`));
});
const semuaObjek = Object.values(OBJEK).flat();
semuaObjek.forEach(o => {
  tes(`fungsi gambar${o}`, pelajaranSrc.includes(`function gambar${o.charAt(0).toUpperCase()}${o.slice(1)}`));
  tes(`registry ${o}`, pelajaranSrc.includes(`${o}: gambar${o.charAt(0).toUpperCase()}${o.slice(1)}`));
  tes(`partikel ${o}`, pelajaranSrc.includes(`${o}: '`));
});

function hitungKunci(src, sebelum, sesudah) {
  const awal = src.indexOf(sebelum);
  const akhir = src.indexOf(sesudah, awal);
  const blok = src.slice(awal, akhir);
  const kunci = [...blok.matchAll(/([a-zA-Z0-9]+):/g)].map(m => m[1]);
  const dup = kunci.filter((k, i) => kunci.indexOf(k) !== i);
  return { total: kunci.length, dup: [...new Set(dup)], kunci };
}
const reg = hitungKunci(pelajaranSrc, 'const OBJEK_GAMBAR = {', '};');
tes(`registry tanpa duplikat (${reg.total} kunci)`, reg.dup.length === 0, reg.dup.join(','));
tes('registry bertambah 41 (765 total)', reg.total === 765, String(reg.total));
const par = hitungKunci(pelajaranSrc, 'const PARTIKEL_OBJEK = {', '};');
tes('partikel tanpa duplikat', par.dup.length === 0, par.dup.join(','));
tes('partikel bertambah 41 (267 total)', par.total === 267, String(par.total));

semuaObjek.forEach(o => tes(`partikel k9 punya kunci blok: ${o}`, par.kunci.includes(o)));

for (let i = 1; i <= 100; i++) {
  const id = 'p1-' + String(i).padStart(3, '0');
  const n = CERITA.untuk({ id });
  tes(`${id} utuh`, !!n && n.stasiun.length >= 5 && !!n.stasiun.find(s => s.akhir));
}
for (let i = 1; i <= 90; i++) {
  const id = 'p2-' + String(i).padStart(3, '0');
  const n = CERITA.untuk({ id });
  tes(`${id} utuh`, !!n && n.stasiun.length >= 5 && !!n.stasiun.find(s => s.akhir));
  if (i <= 80) tes(`${id} tetap 5 stasiun`, n.stasiun.length === 5, String(n.stasiun.length));
}

const TERLARANG = ['ramal', 'meramal', 'ramalan', 'numerologi', 'prediksi', 'takdir', 'peruntungan', 'nasib', 'masa depan', 'astrolog', 'zodiak', 'horoskop', 'weton', 'jimat', 'primbon', 'sihir', 'sakti', 'sulap', 'mantra'];
function auditTeks(teks, sumber) {
  const low = teks.toLowerCase();
  for (const t of TERLARANG) {
    if (low.includes(t)) {

      if (t === 'mantra' && low.includes('bukan mantra')) continue;
      tes(`${sumber} bebas '${t}'`, false, teks.slice(Math.max(0, low.indexOf(t) - 30), low.indexOf(t) + 40));
    }
  }
}
K9.forEach(id => {
  const n = CERITA.untuk({ id });
  auditTeks(n.npc.ucap.join(' '), id + '-npc');
  n.stasiun.forEach(s => auditTeks(s.judul + ' ' + s.teks, id + '-' + s.objek));
});

TEMA.forEach(t => TERLARANG.forEach(w => tes(`tema ${t} bebas '${w}'`, !t.toLowerCase().includes(w))));
semuaObjek.forEach(o => TERLARANG.forEach(w => tes(`objek ${o} bebas '${w}'`, !o.toLowerCase().includes(w))));

const cekAngka = {
  'p2-082': ['dua belas', 'empat'],
  'p2-083': ['seratus', 'enam'],
  'p2-084': ['lima', 'sembilan'],
  'p2-085': ['sembilan', 'tiga'],
  'p2-086': ['dua puluh', 'dua puluh delapan'],
  'p2-087': ['empat puluh', 'seratus'],
  'p2-088': ['empat belas', 'dua belas'],
  'p2-089': ['dua belas', 'tujuh'],
  'p2-090': ['tiga puluh', 'tujuh'],
};
Object.entries(cekAngka).forEach(([id, kata]) => {
  const n = CERITA.untuk({ id });
  const gabung = n.stasiun.map(s => s.teks).join(' ').toLowerCase();
  kata.forEach(k => tes(`${id} memuat '${k}'`, gabung.includes(k)));
});

for (let i = 81; i <= 100; i++) tes(`p2-${String(i).padStart(3, '0')} terdaftar di P2`, p2Src.includes(`'p2-${String(i).padStart(3, '0')}'`));

console.log(`\n===== HASIL: ${pass} LULUS, ${fail} GAGAL =====`);
if (fail > 0) process.exit(1);
console.log('VALIDASI BATCH 9 SEMUA LULUS.');
