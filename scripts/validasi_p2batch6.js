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

const BARU = ['p2-051','p2-052','p2-053','p2-054','p2-055','p2-056','p2-057','p2-058','p2-059','p2-060'];
const TEMA_BARU = ['gerbangSiku','jembatanRata','putaranKincir','mejaKertas','jendelaRumah','relKereta','lantaiUbin','bengkelMeja','dindingTangga','balaiGeometri'];
const OBJEK_BARU = ['gerbangTerbukaSiku','sikuKayuTukang','pembukaLancipTumpul','papanJenisSudut','dekJembatanLurus','duaSudutBerbagi','sudutSeratusSepuluh','papanSelaluBerdua','kincirPenuh','empatSudutBertemu','sudutSisaKincir','papanPutaranPenuh','segitigaKertasTiga','robekTigaSudut','tempelJadiGaris','papanBuktiRobek','jendelaEmpatSiku','duaSegitigaSahabat','gabungSegiempat','papanDuaKaliSeratus','relSejajarKereta','garisMiringTerpotong','sudutZBerpasangan','papanPolaSejajar','segitigaUbinSiku','kotakSembilanAlas','kotakEnamBelasTinggi','kotakDuaLimaMiring','mejaGoyangEmpat','palangDiagonal','mejaKokohSiku','papanTigaEmpatLima','tanggaSandingDinding','jarakEnamLangkah','tinggiDelapanPuncak','papanSisiHilang','arenaMisiGeometri','misiBukaanSudut','misiSegitigaPutaran','misiPythagorasHutan'];

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

for (const tema of TEMA_BARU) {
  t('TEMA_CFG ' + tema, new RegExp(tema + ": \\{ glif:").test(mainSrc));
  t('AMB_CFG ' + tema, new RegExp(tema + ": \\{ jenis:").test(mainSrc));
  t('bakarLatar ' + tema, mainSrc.includes("TEMA_NAMA === '" + tema + "'"));
}

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

let semuaTerdaftar = true;
const semuaId = [...ceritaSrc.matchAll(/'(p[12]-\d+)': \{/g)].map(m => m[1]);
for (const id of semuaId) {
  const c = CERITA.untuk({ id });
  if (!c || !c.stasiun || c.stasiun[0].judul === 'Bahasan Segera Hadir') continue;
  for (const s of c.stasiun) if (!kunci.includes(s.objek)) { semuaTerdaftar = false; console.log('   HILANG: ' + id + ' -> ' + s.objek); }
}
t('semua objek seluruh naskah terdaftar (' + semuaId.length + ' naskah)', semuaTerdaftar);

let p2ok = true;
for (let k = 1; k <= 10; k++) {
  for (let n = 1; n <= 10; n++) {
    const id = 'p2-' + String((k - 1) * 10 + n).padStart(3, '0');
    const tp = P2.topikById(id);
    if (!tp || tp.k !== k || tp.n !== n) p2ok = false;
  }
}
t('P2 struktur 100 judul 10 penjuru', p2ok);

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

let reg1 = true;
for (let i = 1; i <= 100; i++) {
  const id = 'p1-' + String(i).padStart(3, '0');
  const c = CERITA.untuk({ id });
  if (!c || !c.stasiun || c.stasiun.length < 2) { reg1 = false; console.log('   rusak ' + id); }
}
t('regresi p1 100 naskah', reg1);
let reg2 = true;
for (let i = 1; i <= 50; i++) {
  const id = 'p2-' + String(i).padStart(3, '0');
  const c = CERITA.untuk({ id });
  if (!c || !c.stasiun || c.stasiun.length !== 5) { reg2 = false; console.log('   rusak ' + id); }
}
t('regresi p2-001..050', reg2);

const c51 = JSON.stringify(CERITA.untuk({ id: 'p2-051' }));
const c52 = JSON.stringify(CERITA.untuk({ id: 'p2-052' }));
const c54 = JSON.stringify(CERITA.untuk({ id: 'p2-054' }));
const c57 = JSON.stringify(CERITA.untuk({ id: 'p2-057' }));
const c59 = JSON.stringify(CERITA.untuk({ id: 'p2-059' }));
const c60 = JSON.stringify(CERITA.untuk({ id: 'p2-060' }));
t('p2-051 menyebut sembilan puluh', c51.includes('sembilan puluh'));
t('p2-052 menyebut tujuh puluh', c52.includes('tujuh puluh'));
t('p2-054 50+60+70 = 180', c54.includes('seratus delapan puluh'));
t('p2-057 9+16=25 kata', c57.includes('dua puluh lima'));
t('p2-059 100-36=64 -> 8', c59.includes('enam puluh empat') && c59.includes('Delapan'));
t('p2-060 lima misi lengkap', c60.includes('tujuh puluh lima') && c60.includes('delapan puluh') && c60.includes('lima puluh') && c60.includes('Sepuluh'));
t('p2-058 palang 5 jengkal', JSON.stringify(CERITA.untuk({ id: 'p2-058' })).includes('lima jengkal'));

const GLIF_BARU = ['90', '70', '360', '180', '4x90', '=Z', '25', '3 4 5', '6-8-10', '45'];
const semuaGlif = semuaId.filter(id => !BARU.includes(id)).map(id => (CERITA.untuk({ id }).npc || {}).glif || null).filter(Boolean);
const glifBaru = BARU.map(id => CERITA.untuk({ id }).npc.glif);
t('10 glif k6 sesuai rencana', JSON.stringify(glifBaru) === JSON.stringify(GLIF_BARU));
const gtabrak = GLIF_BARU.filter((g, i) => GLIF_BARU.indexOf(g) !== i || semuaGlif.includes(g));
t('glif k6 ' + GLIF_BARU.length + ' nol tabrakan', gtabrak.length === 0);

console.log('\n' + (gagal === 0 ? 'SEMUA VALIDASI LULUS' : gagal + ' VALIDASI GAGAL'));
process.exitCode = gagal === 0 ? 0 : 1;
