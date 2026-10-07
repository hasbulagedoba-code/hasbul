/* Validasi programatik batch 5: p2-041..050 penjuru k5 Rasio (aturan Task 21-25) */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
global.window = {};
require(path.join(ROOT, 'akiomidaspace/js/pintu1-data.js'));
require(path.join(ROOT, 'akiomidaspace/js/pintu2-data.js'));
require(path.join(ROOT, 'akiomidaspace/js/cerita-data.js'));
const CERITA = global.window.CERITA;
const P2 = global.window.PD || global.window.P2;

let gagal = 0;
const t = (nama, ok) => { console.log((ok ? 'OK   ' : 'GAGAL') + ' ' + nama); if (!ok) gagal++; };

const ceritaSrc = fs.readFileSync(path.join(ROOT, 'akiomidaspace/js/cerita-data.js'), 'utf8');
const mainSrc = fs.readFileSync(path.join(ROOT, 'akiomidaspace/js/pelajaran-main.js'), 'utf8');

/* ---- 1. struktur 10 naskah baru ---- */
const BARU = ['p2-041','p2-042','p2-043','p2-044','p2-045','p2-046','p2-047','p2-048','p2-049','p2-050'];
const TEMA_BARU = ['dapurJus','menaraPeta','kiosPermen','dapurKue','lintasanLari','kotakDonat','tokoMiniatur','sumurDesa','dapurWarung','petaKarun'];
const OBJEK_BARU = ['gelasManggaDua','papanDuaTiga','jusKebalik','papanUrutanRasio','mejaPetaGulung','jengkalTunggal','tigaJengkalJalan','papanSkalaSeribu','kantongEnamPermen','notaTigaRibu','permenLimaRatus','papanDuaKios','kartuResepDuaTiga','mangkokGandaEmpat','duaKueSamaRasa','papanProporsiSetia','garisStartKelinci','kelinciEnamPuluh','duaMenitSeratus','papanTempoJarak','kotakDelapanDonat','susunTigaDariEmpat','papanTujuhLima','papanTigaBahasa','rakMobilMainan','penggarisDuaPuluh','mobilJadiRaksasa','papanKaliDuaEmpat','galianEmpatPekerja','galianDelapanPekerja','papanKaliSilang','papanBerbalikNilai','bukuResepWarung','delapanTamuDatang','semuaIkutGanda','papanTakaranUtuh','petaKarunTerkunci','misiRasioSkala','misiHargaPersen','misiBerbalikPeta'];

for (let i = 0; i < BARU.length; i++) {
  const id = BARU[i];
  const c = CERITA.untuk({ id });
  t(id + ' tema ' + TEMA_BARU[i], c.tema === TEMA_BARU[i]);
  t(id + ' npc glif', !!(c.npc && c.npc.glif && c.npc.ucap && c.npc.ucap.length === 2));
  t(id + ' 5 stasiun', Array.isArray(c.stasiun) && c.stasiun.length === 5);
  const sts = c.stasiun || [];
  t(id + ' tugu akhir', sts.length === 5 && sts[4].objek === 'tugu' && sts[4].akhir === true);
  t(id + ' tugu Owalah judul', sts.length === 5 && /Owalah/.test(sts[4].judul || ''));
  t(id + ' tugu payoff+penutup', sts.length === 5 && /Owalah, ternyata begini toh/.test(sts[4].teks || '') && /Mudah, bukan\?/.test(sts[4].teks || ''));
  let teksOk = true;
  for (const s of sts) if (!s.teks || s.teks.length < 200) teksOk = false;
  t(id + ' teks >= 200', teksOk);
  let objekOk = true;
  for (const s of sts) if (s.objek !== 'tugu' && !OBJEK_BARU.includes(s.objek)) objekOk = false;
  t(id + ' objek daftar baru', objekOk);
}

/* ---- 2. TEMA_CFG + AMB_CFG + bakarLatar ---- */
for (const tema of TEMA_BARU) {
  t('TEMA_CFG ' + tema, new RegExp(tema + ": \\{ glif:").test(mainSrc));
  t('AMB_CFG ' + tema, new RegExp(tema + ": \\{ jenis:").test(mainSrc));
  t('bakarLatar ' + tema, mainSrc.includes("TEMA_NAMA === '" + tema + "'"));
}

/* ---- 3. registry nol duplikat ---- */
const regMatch = mainSrc.match(/const OBJEK_GAMBAR = \{([\s\S]*?)\n  \};/);
const kunci = [...regMatch[1].matchAll(/([a-zA-Z0-9_]+): gambar/g)].map(m => m[1]);
const dup = kunci.filter((k, i) => kunci.indexOf(k) !== i);
t('registry ' + kunci.length + ' kunci nol duplikat', dup.length === 0);

const pmMatch = mainSrc.match(/const PARTIKEL_OBJEK = \{([\s\S]*?)\};/);
const pkunci = [...pmMatch[1].matchAll(/([a-zA-Z0-9_]+): '(asap|daun|kilau)'/g)].map(m => m[1]);
const pdup = pkunci.filter((k, i) => pkunci.indexOf(k) !== i);
t('PARTIKEL ' + pkunci.length + ' kunci nol duplikat', pdup.length === 0);

for (const o of OBJEK_BARU) {
  t('fungsi gambar ' + o, mainSrc.includes('function gambar' + o.charAt(0).toUpperCase() + o.slice(1)));
  t('registry ' + o, kunci.includes(o));
}

/* ---- 4. semua objek semua naskah terdaftar ---- */
let semuaTerdaftar = true;
const semuaId = [...ceritaSrc.matchAll(/'(p[12]-\d+)': \{/g)].map(m => m[1]);
for (const id of semuaId) {
  const c = CERITA.untuk({ id });
  if (!c || !c.stasiun || c.stasiun[0].judul === 'Bahasan Segera Hadir') continue;
  for (const s of c.stasiun) if (!kunci.includes(s.objek)) { semuaTerdaftar = false; console.log('   HILANG: ' + id + ' -> ' + s.objek); }
}
t('semua objek seluruh naskah terdaftar (' + semuaId.length + ' naskah)', semuaTerdaftar);

/* ---- 5. struktur pintu2-data 100 judul 10 penjuru ---- */
let p2ok = true;
for (let k = 1; k <= 10; k++) {
  for (let n = 1; n <= 10; n++) {
    const id = 'p2-' + String((k - 1) * 10 + n).padStart(3, '0');
    const tp = P2.topikById(id);
    if (!tp || tp.k !== k || tp.n !== n) p2ok = false;
  }
}
t('P2 struktur 100 judul 10 penjuru', p2ok);

/* ---- 6. AUDIT ANTI-RAMALAN pada 10 naskah + 100 teaser ---- */
const TERLARANG = /ramal|meramal|ramalan|numerolog|prediksi|takdir|peruntungan|nasib|zodiak|horoskop|jimat|weton|primbon|mantra|sihir|sakti|sulap/i;
let bersih = true;
for (const id of BARU) {
  const c = CERITA.untuk({ id });
  const gabung = JSON.stringify(c);
  if (TERLARANG.test(gabung)) { bersih = false; console.log('   TERLARANG di ' + id); }
}
t('anti-ramalan 10 naskah baru', bersih);
let teaserBersih = true;
for (let k = 1; k <= 10; k++) for (let n = 1; n <= 10; n++) {
  const id = 'p2-' + String((k - 1) * 10 + n).padStart(3, '0');
  const tp = P2.topikById(id);
  if (TERLARANG.test(tp.teaser || '')) { teaserBersih = false; console.log('   TERLARANG teaser ' + id); }
}
t('anti-ramalan 100 teaser', teaserBersih);

/* ---- 7. regresi p1 + p2 lama ---- */
let reg1 = true;
for (let i = 1; i <= 100; i++) {
  const id = 'p1-' + String(i).padStart(3, '0');
  const c = CERITA.untuk({ id });
  if (!c || !c.stasiun || c.stasiun.length < 2) { reg1 = false; console.log('   rusak ' + id); }
}
t('regresi p1 100 naskah', reg1);
let reg2 = true;
for (let i = 1; i <= 40; i++) {
  const id = 'p2-' + String(i).padStart(3, '0');
  const c = CERITA.untuk({ id });
  if (!c || !c.stasiun || c.stasiun.length !== 5) { reg2 = false; console.log('   rusak ' + id); }
}
t('regresi p2-001..040', reg2);

/* ---- 8. matematika dalam teks (sampel) ---- */
t('p2-041 menyebut 2 : 3', CERITA.untuk({ id: 'p2-041' }).stasiun[0].teks.includes('2 : 3'));
t('p2-043 kios B enam ratus', JSON.stringify(CERITA.untuk({ id: 'p2-043' })).includes('enam ratus'));
t('p2-047 480', JSON.stringify(CERITA.untuk({ id: 'p2-047' })).includes('empat ratus delapan puluh'));
t('p2-048 24', JSON.stringify(CERITA.untuk({ id: 'p2-048' })).includes('dua puluh empat'));

console.log('\n' + (gagal === 0 ? 'SEMUA VALIDASI LULUS' : gagal + ' VALIDASI GAGAL'));
process.exitCode = gagal === 0 ? 0 : 1;
