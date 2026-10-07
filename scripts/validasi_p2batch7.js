/* Validasi programatik batch 7: p2-061..070 penjuru k7 Luas Permukaan & Volume (aturan Task 21-25) */
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
const BARU = ['p2-061','p2-062','p2-063','p2-064','p2-065','p2-066','p2-067','p2-068','p2-069','p2-070'];
const TEMA_BARU = ['mejaKado','lantaiJaring','dapurSusun','atapPrisma','rakKaleng','bengkelGulung','bukitPasir','mejaLiter','tokoAkuarium','gudangKardus'];
const OBJEK_BARU = ['kotakKadoKubus','kartuPersegiEnam','kubusSusunIsi','papanKubusJurus','kardusBalokUtuh','jaringBalokRata','pasangKembarTiga','papanJumlahEnamSisi','laciKosongEnamEmpat','kubusSusuSusun','susunDuaLapis','papanPanjangLebarTinggi','rumahAtapPrisma','kartuSegitigaAlas','geserSegitigaAtap','papanLuasKaliPanjang','kalengSusuRak','duaTutupBundar','benangKelilingEmpat','labelTerbentang','kertasGulungSelimut','gulungDiBotol','papanKelilingTinggi','hitungSelimutEmpat','topiKerucutPasir','tabungPasirSama','tuangTigaCangkir','bolaSepakTaman','kubusSepuluhSepuluh','botolLiterSatu','gelasBagiEmpat','papanLiterKubik','akuariumTokoSore','ukurAkuariumTigaSisi','emberDuaPuluh','botolSatuSetengah','gudangKardusMalam','misiKardusTigaUkuran','misiKubusMuatKardus','misiTangkiDanKado'];

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

/* ---- 6. AUDIT ANTI-RAMALAN pada 10 naskah + 100 teaser + semua naskah ---- */
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
let semuaNaskahBersih = true;
for (const id of semuaId) {
  const c = CERITA.untuk({ id });
  const gabung = JSON.stringify(c).replace(/bukan mantra/g, ''); // negasi pelindung sah (p1-095)
  if (TERLARANG.test(gabung)) { semuaNaskahBersih = false; console.log('   TERLARANG naskah lama ' + id); }
}
t('anti-ramalan seluruh ' + semuaId.length + ' naskah', semuaNaskahBersih);

/* ---- 7. regresi p1 + p2 lama ---- */
let reg1 = true;
for (let i = 1; i <= 100; i++) {
  const id = 'p1-' + String(i).padStart(3, '0');
  const c = CERITA.untuk({ id });
  if (!c || !c.stasiun || c.stasiun.length < 2) { reg1 = false; console.log('   rusak ' + id); }
}
t('regresi p1 100 naskah', reg1);
let reg2 = true;
for (let i = 1; i <= 60; i++) {
  const id = 'p2-' + String(i).padStart(3, '0');
  const c = CERITA.untuk({ id });
  if (!c || !c.stasiun || c.stasiun.length !== 5) { reg2 = false; console.log('   rusak ' + id); }
}
t('regresi p2-001..060', reg2);

/* ---- 8. matematika dalam teks k7 ---- */
const c61 = JSON.stringify(CERITA.untuk({ id: 'p2-061' }));
const c62 = JSON.stringify(CERITA.untuk({ id: 'p2-062' }));
const c63 = JSON.stringify(CERITA.untuk({ id: 'p2-063' }));
const c64 = JSON.stringify(CERITA.untuk({ id: 'p2-064' }));
const c65 = JSON.stringify(CERITA.untuk({ id: 'p2-065' }));
const c66 = JSON.stringify(CERITA.untuk({ id: 'p2-066' }));
const c67 = JSON.stringify(CERITA.untuk({ id: 'p2-067' }));
const c68 = JSON.stringify(CERITA.untuk({ id: 'p2-068' }));
const c69 = JSON.stringify(CERITA.untuk({ id: 'p2-069' }));
const c70 = JSON.stringify(CERITA.untuk({ id: 'p2-070' }));
t('p2-061 lima puluh empat + dua puluh tujuh', c61.includes('lima puluh empat') && c61.includes('dua puluh tujuh'));
t('p2-062 delapan puluh delapan', c62.includes('delapan puluh delapan'));
t('p2-063 empat puluh delapan', c63.includes('empat puluh delapan'));
t('p2-064 dua belas + seratus dua puluh', c64.includes('dua belas') && c64.includes('seratus dua puluh'));
t('p2-065 empat puluh empat', c65.includes('empat puluh empat'));
t('p2-066 empat ratus empat puluh', c66.includes('empat ratus empat puluh'));
t('p2-067 tiga cangkir = satu tabung', c67.toLowerCase().includes('tiga cangkir kerucut sama dengan satu tabung'));
t('p2-068 seribu + liter', c68.includes('seribu') && c68.includes('liter'));
t('p2-069 enam puluh ribu + enam puluh liter', c69.includes('enam puluh ribu') && c69.includes('enam puluh liter'));
t('p2-070 lima misi + seratus lima puluh', c70.includes('lima') && c70.includes('seratus lima puluh'));

/* ---- 9. glif NPC batch k7 sesuai rencana + nol tabrakan ---- */
const GLIF_BARU = ['54', '88', '48', '120', '44', '440', 'x3', '1L', '60L', '27'];
const semuaGlif = semuaId.filter(id => !BARU.includes(id)).map(id => (CERITA.untuk({ id }).npc || {}).glif || null).filter(Boolean);
const glifBaru = BARU.map(id => CERITA.untuk({ id }).npc.glif);
t('10 glif k7 sesuai rencana', JSON.stringify(glifBaru) === JSON.stringify(GLIF_BARU));
const gtabrak = GLIF_BARU.filter((g, i) => GLIF_BARU.indexOf(g) !== i || semuaGlif.includes(g));
t('glif k7 ' + GLIF_BARU.length + ' nol tabrakan', gtabrak.length === 0);

/* ---- 10. bahasa penghitung netral (hitungan = alat) ---- */
t('p2-065 menyebut benang & hitungan alat', c65.includes('alat'));
t('p2-070 menghitung bukan menebak', c70.includes('menghitung, bukan menebak'));

console.log('\n' + (gagal === 0 ? 'SEMUA VALIDASI LULUS' : gagal + ' VALIDASI GAGAL'));
process.exitCode = gagal === 0 ? 0 : 1;
