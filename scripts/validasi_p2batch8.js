'use strict';
const fs = require('fs');
const akar = '/home/z/my-project/hasbul-repo/akiomidaspace/';
let ok = 0, gagal = 0;
const tes = (nama, kondisi, detail) => {
  if (kondisi) { ok++; }
  else { gagal++; console.log('GAGAL ' + nama + (detail ? ' -> ' + detail : '')); }
};

eval(fs.readFileSync(akar + 'js/pintu2-data.js', 'utf8').replace('window.P2', 'globalThis.P2'));
eval(fs.readFileSync(akar + 'js/cerita-data.js', 'utf8').replace('window.CERITA', 'globalThis.CERITA'));
const P2 = globalThis.P2, C = globalThis.CERITA;
const sMain = fs.readFileSync(akar + 'js/pelajaran-main.js', 'utf8');

const K8 = ['p2-071','p2-072','p2-073','p2-074','p2-075','p2-076','p2-077','p2-078','p2-079','p2-080'];
const LARANG = /ramal|meramal|ramalan|numerolog|prediksi|takdir|peruntungan|nasib|zodiak|horoskop|jimat|weton|primbon|mantra|sihir|sakti|sulap/i;
const PELINDUNG = [/bukan mantra/i, /tak butuh keberuntungan/i, /tak butuh keberuntung/i];

function cekTeksTeks(topik) {
  const semua = [topik.npc?.ucap?.[0], topik.npc?.ucap?.[1], ...(topik.stasiun || []).map(s => s.judul), ...(topik.stasiun || []).map(s => s.teks)].filter(Boolean);
  return semua.every(t => {
    if (!LARANG.test(t)) return true;
    return PELINDUNG.some(p => p.test(t)) && !t.replace(/bukan mantra|tak butuh keberuntungan/gi, '').match(LARANG);
  });
}

tes('P2 KATEGORI 10', P2.KATEGORI.length === 10);
tes('P2 TOPIK 100', P2.TOPIK.length === 100, String(P2.TOPIK.length));
for (let k = 1; k <= 10; k++) {
  tes('P2 penjuru k' + k + ' berisi 10', P2.topikKategori(k).length === 10);
}

const daftarObjek = new Set();
const regM = sMain.match(/const OBJEK_GAMBAR = \{([\s\S]*?)\n  \};/);
regM[1].split(',').forEach(p => { const k = p.trim().split(':')[0].trim(); if (k && !k.startsWith('/')) daftarObjek.add(k); });
const fnsBaru = ['PatokNolPersimpangan','PapanSumbuDuaArah','RumahTitikPertama','PapanJalanBertemu','LantaiKotakHalaman','LangkahTigaDua','TitikTertukarDuaTiga','PapanXpuluhanY','AlunAlunDuaJalan','LampuEmpatPojok','KiosDaerahSatu','PapanTandaKuadran','PapanHitamGaleri','KartuAlamatDuaLima','KartuMinusTigaEmpat','KartuNolMinusDua','TabelXyArsip','PakuTigaTitik','BenangTertarikLurus','PapanGarisLahir','TanggaCuramNaikDua','TanggaLandaiNaikSatu','PendakiDuaJalan','PapanKemiringanDua','PapanWaktuJarakPos','GarisDatarBerhenti','GarisMiringMelaju','PapanCeritaPerjalanan','GerbangSumbuYSenja','TitikAwalNolEmpat','GarisLewatGerbang','PapanRumahAwal','TaliGridTaman','PetaTamanKertas','BenderaXMerah','PetiHartaTeralamat','MenaraSinyalLima','MisiTandaiEmpatDua','MisiKuadranSinyal','MisiGarisTabelAkhir'];

for (const id of K8) {
  const t = C.untuk({ id });
  if (!t) { tes('naskah ' + id + ' ada', false); continue; }
  tes(id + ' tema ada', !!t.tema);
  tes(id + ' npc glif+ucap', !!(t.npc && t.npc.glif && t.npc.ucap && t.npc.ucap.length >= 2));
  tes(id + ' 5 stasiun', Array.isArray(t.stasiun) && t.stasiun.length === 5, String(t.stasiun && t.stasiun.length));
  const tugu = t.stasiun && t.stasiun[4];
  tes(id + ' tugu akhir', !!(tugu && tugu.objek === 'tugu' && tugu.akhir === true));
  tes(id + ' tugu Owalah', !!(tugu && /^Owalah,/.test(tugu.judul || '')));
  tes(id + ' payoff Owalah dalam teks', !!(tugu && /Owalah, ternyata begini toh/.test(tugu.teks || '')));
  tes(id + ' penutup Mudah, bukan?', !!(tugu && /Mudah, bukan\?\s*$/.test(tugu.teks || '')));
  (t.stasiun || []).forEach((s, i) => {
    tes(id + ' st' + (i + 1) + ' teks >= 200', (s.teks || '').length >= 200, String((s.teks || '').length));
    if (i < 4) tes(id + ' st' + (i + 1) + ' objek terdaftar', daftarObjek.has(s.objek), s.objek);
  });
  tes(id + ' anti-ramalan', cekTeksTeks(t));
  tes(id + ' matematika dalam teks', (t.stasiun || []).some(s => /\d|nol|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan|sepuluh/i.test(s.teks || '')));
}

for (const f of fnsBaru) {
  tes('fungsi gambar' + f + ' tepat 1', (sMain.match(new RegExp('function gambar' + f + '\\(', 'g')) || []).length === 1, f);
}

const k1 = regM[1].split(',').map(x => x.trim().split(':')[0].trim()).filter(x => x && !x.startsWith('/'));
tes('registry tanpa duplikat', k1.length === new Set(k1).size, String(k1.length - new Set(k1).size));
const k2m = sMain.match(/const PARTIKEL_OBJEK = \{([\s\S]*?)\};/);
const k2 = k2m[1].split(',').map(x => x.trim().split(':')[0].trim()).filter(x => x && !x.startsWith('/'));
tes('partikel tanpa duplikat', k2.length === new Set(k2).size);
for (const id of K8) {
  const t = C.untuk({ id });
  (t.stasiun || []).slice(0, 4).forEach(s => {
    tes(id + ' ' + s.objek + ' di partikel', k2.includes(s.objek), s.objek);
  });
}

const temaK8 = K8.map(id => C.untuk({ id }).tema);
for (const tm of temaK8) {
  tes('TEMA_CFG punya ' + tm, new RegExp('\\n\\s{4}' + tm + ': \\{ glif').test(sMain), tm);
  tes('AMB_CFG punya ' + tm, new RegExp('\\n\\s{4}' + tm + ': \\{ jenis').test(sMain), tm);
  tes('bakarLatar punya ' + tm, sMain.includes("TEMA_NAMA === '" + tm + "'"), tm);
}

for (const tm of temaK8) tes('tema ' + tm + ' bersih', !LARANG.test(tm));

const glifK8 = K8.map(id => C.untuk({ id }).npc.glif);
tes('glif k8 unik', new Set(glifK8).size === 10, glifK8.join('|'));

const semuaId = [...P2.TOPIK.map(t => t.id)];
let reg1 = true;
for (let i = 1; i <= 100; i++) {
  const id = 'p1-' + String(i).padStart(3, '0');
  const c = C.untuk({ id });
  if (!c || !c.stasiun || c.stasiun.length < 2) { reg1 = false; console.log('   rusak ' + id); }
}
tes('regresi p1 100 naskah', reg1);
let reg2 = true;
for (let i = 1; i <= 70; i++) {
  const id = 'p2-' + String(i).padStart(3, '0');
  const c = C.untuk({ id });
  if (!c || !c.stasiun || c.stasiun.length !== 5) { reg2 = false; console.log('   rusak ' + id); }
}
tes('regresi p2-001..070', reg2);

let semuaBersih = true;
for (const id of semuaId) {
  const gabung = JSON.stringify(C.untuk({ id })).replace(/bukan mantra|tak butuh keberuntungan/g, '');
  if (LARANG.test(gabung)) { semuaBersih = false; console.log('   TERLARANG ' + id); }
}
tes('anti-ramalan seluruh ' + semuaId.length + ' naskah', semuaBersih);

let teaserGagal = 0;
for (const t of P2.TOPIK) if (LARANG.test(t.teaser || '') || LARANG.test(t.judul || '')) { teaserGagal++; console.log('TEASER ' + t.id); }
tes('100 teaser & judul bersih', teaserGagal === 0);

let kontrakGagal = 0;
for (const id of K8) {
  const t = C.untuk({ id });
  const tugu = t.stasiun[4];
  if (!t.tema || !t.npc || t.npc.glif === undefined || t.stasiun.length !== 5 ||
      !tugu.akhir || !/^Owalah,/.test(tugu.judul) || !/Owalah, ternyata begini toh/.test(tugu.teks) ||
      !/Mudah, bukan\?\s*$/.test(tugu.teks)) { kontrakGagal++; console.log('KONTRAK ' + id); }
}
tes('kontrak 4-elemen 10 naskah k8', kontrakGagal === 0);

const hsm = fs.readFileSync(akar + 'hutan-simbol-matematika.html', 'utf8');
tes('k8 chip tetap ada di html', hsm.includes('Koordinat &amp; Grafik Pertama') || hsm.includes('Koordinat & Grafik Pertama'));

console.log('\n=== VALIDASI BATCH 8: ' + ok + ' OK, ' + gagal + ' GAGAL ===');
process.exit(gagal ? 1 : 0);
