const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'akiomidaspace', 'js');
const cerita = fs.readFileSync(path.join(DIR, 'cerita-data.js'), 'utf8');
const main = fs.readFileSync(path.join(DIR, 'pelajaran-main.js'), 'utf8');
const p3data = fs.readFileSync(path.join(DIR, 'pintu3-data.js'), 'utf8');
let ok = 0, gagal = 0;
function cek(nama, syarat) { if (syarat) ok++; else { gagal++; console.log('GAGAL:', nama); } }

function blok(id) {
  const re = new RegExp("'" + id + "': \\{([\\s\\S]*?)\\n    \\},");
  const m = cerita.match(re);
  return m ? m[1] : null;
}
const ids = [];
for (let i = 31; i <= 40; i++) ids.push('p3-0' + i);

const TEMAK4 = ['lapanganPapanSkor', 'lorongPenginapan', 'mejaPiknikSejawat', 'dapurResepGanda', 'pelataranBarisKolom', 'berandaDuaKakak', 'persimpanganDuaJalan', 'kelasRaporGunung', 'gudangTigaKotak', 'puncakPapanAngka'];
const GLIFK4 = ['kotak', 'a23', '2+1', 'dua porsi', 'jabat', '4 dan 3', 'temu', '3x2', '1 2 3', 'papan!'];
const OBJEKK4 = ['papanSkorGunung', 'kotakAngkaBabak', 'garisBarisKolom', 'lencanaTertataRapi', 'lorongPenginapanGunung', 'pintuKamarLantaiDua', 'papanUrutanAlamat', 'kunciTukarAlamat', 'duaPiringKueSejawat', 'piringHasilSejawat', 'kotakUkuranBeda', 'papanAturanSejawat', 'papanResepSatuPorsi', 'resepDigandakanDua', 'timbanganBahanDobel', 'nampanKueDuaPorsi', 'barisAnakKiri', 'kolomAnakKanan', 'kartuHasilSembilanBelas', 'papanArahBerbeda', 'berandaDuaBangku', 'papanJumlahTujuh', 'papanSelisihSatu', 'kueAngkaEmpatTiga', 'jalanTanjakDuaX', 'jalanTanggaPlusDua', 'tiangTitikTemuDuaEmpat', 'duaJalanSejajarJauh', 'papanRaporKelasKecil', 'kotakNilaiTigaAnak', 'kartuAlamatNilaiSembilan', 'papanJumlahKolom', 'tigaKotakHadiahAbc', 'timbanganPasanganKotak', 'papanTrikJumlahSemua', 'lampuIsiTigaKotak', 'limaPapanMisiAngka', 'papanMisiAlamatJumlah', 'papanMisiSapaSistem', 'gerbangJuaraPapanAngka'];

ids.forEach((id, idx) => {
  const b = blok(id);
  cek(id + ' blok ada', !!b);
  if (!b) return;
  cek(id + ' tema = ' + TEMAK4[idx], b.includes("tema: '" + TEMAK4[idx] + "'"), b.slice(0, 80));
  cek(id + ' glif = ' + GLIFK4[idx], b.includes("glif: '" + GLIFK4[idx].replace(/[+]/g, '\\$&') + "'") || b.includes("glif: '" + GLIFK4[idx] + "'"));
  const teks = [...b.matchAll(/teks: '((?:[^'\\]|\\.)*)'/g)].map(m => m[1]);
  cek(id + ' 5 stasiun (teks)', teks.length === 5, teks.length);
  cek(id + ' semua teks >= 200 char', teks.every(t => t.length >= 200), teks.map(t => t.length));
  cek(id + ' semua teks >= 3 kalimat', teks.every(t => t.split(/[.!?]/).filter(s => s.trim()).length >= 3));
  cek(id + ' tugu akhir:true', b.includes("akhir: true"));
  cek(id + ' tugu Owalah', b.includes('Owalah, ternyata begini toh'));
  cek(id + ' tugu Mudah, bukan?', b.includes('Mudah, bukan?'));
  const objs = [...b.matchAll(/objek: '([^']*)'/g)].map(m => m[1]);
  cek(id + ' 4 objek + tugu', objs.length === 5 && objs[4] === 'tugu', objs);
  objs.slice(0, 4).forEach(o => cek(id + ' objek terdaftar: ' + o, OBJEKK4.includes(o)));
  cek(id + ' ucap 2 baris', [...b.matchAll(/ucap: \['[^']*', '[^']*'\]/g)].length === 1);
});

TEMAK4.forEach(t => {
  cek('TEMA_CFG: ' + t, main.includes('    ' + t + ": { glif: ["));
  cek('AMB_CFG: ' + t, main.includes('    ' + t + ': { jenis:'));
  cek('bakarLatar: ' + t, main.includes("TEMA_NAMA === '" + t + "'"));
});

OBJEKK4.forEach(o => {
  const fn = 'gambar' + o.charAt(0).toUpperCase() + o.slice(1);
  cek('registry: ' + o, main.includes(o + ': ' + fn));
  cek('partikel: ' + o, main.includes(o + ": '"));
  const def = [...main.matchAll(new RegExp('function ' + fn + '\\(', 'g'))].length;
  cek('fungsi tepat-1: ' + fn, def === 1, def);
});

const semuaGlif = [...cerita.matchAll(/glif:\s*'([^']*)'/g)].map(m => m[1]);
GLIFK4.forEach(g => cek('glif unik: ' + g, semuaGlif.filter(x => x === g).length === 1, semuaGlif.filter(x => x === g).length));
const semuaTema = [...cerita.matchAll(/tema:\s*'([^']*)'/g)].map(m => m[1]);
TEMAK4.forEach(t => cek('tema unik: ' + t, semuaTema.filter(x => x === t).length === 1));
const semuaObj = [...cerita.matchAll(/objek:\s*'([^']*)'/g)].map(m => m[1]);
OBJEKK4.forEach(o => cek('objek unik: ' + o, semuaObj.filter(x => x === o).length === 1));

/* ---------- 5. anti-ramalan seluruh 240 naskah ---------- */
const whitelist = ['bukan mantra', 'tak ada sihir', 'bukan sulap', 'bukan menebak nasib', 'tanpa taruhan'];
const KATA = ['ramal', 'meramal', 'ramalan', 'numerolog', 'takdir', 'jimat', 'weton', 'zodiak', 'horoskop', 'primbon', 'peruntungan', 'nasib'];
function blokSemuaNaskah(src) {
  const out = [];
  const re = /'(p\d-\d{3})': \{([\s\S]*?)\n    \},/g;
  let m; while ((m = re.exec(src)) !== null) out.push({ id: m[1], isi: m[2] });
  return out;
}
const semuaBlok = blokSemuaNaskah(cerita);
cek('jumlah blok naskah = 240', semuaBlok.length === 240, semuaBlok.length);
let temuan = 0;
semuaBlok.forEach(b => {
  const low = b.isi.toLowerCase();
  for (const k of KATA) {
    if (low.includes(k)) {
      const whitelisted = whitelist.some(w => low.includes(k) && low.includes(w) && b.isi.toLowerCase().includes(w));
      // cek konteks: frasa pelindung di kalimat yang sama
      const idx = low.indexOf(k);
      const ctx = low.slice(Math.max(0, idx - 60), idx + 60);
      if (!whitelist.some(w => ctx.includes(w))) { temuan++; console.log('PELANGGARAN:', b.id, k, '->', ctx); }
    }
  }
});
cek('anti-ramalan naskah: nol pelanggaran', temuan === 0, temuan);
// teaser + judul
const teaserP3 = [...p3data.matchAll(/teaser: '((?:[^'\\]|\\.)*)'/g)].map(m => m[1]);
let temuanTeaser = 0;
teaserP3.forEach((t, i) => { const low = t.toLowerCase(); if (KATA.some(k => low.includes(k) && !whitelist.some(w => low.includes(w)))) { temuanTeaser++; console.log('TEASER:', i); } });
cek('anti-ramalan teaser P3: nol', temuanTeaser === 0, temuanTeaser);

const isiK4 = ids.map(blok).join('\n');
cek('skor 15-13 hadir', isiK4.includes('15 lawan 13'));
cek('alamat isi 8 (baris2 kolom3)', isiK4.includes('terpampang angka 8'));
cek('sejawat 2 + 1 = 3', isiK4.includes('2 + 1 = 3'));
cek('ganda 3 jadi 6', isiK4.includes('3 jadi 6'));
cek('sapaan 5 + 14 = 19', isiK4.includes('5 + 14 = 19'));
cek('AxB vs BxA 19 vs 23', isiK4.includes('melainkan 23'));
cek('sistem 4 dan 3', isiK4.includes('kakak berumur 4'));
cek('titik temu (2, 4)', isiK4.includes('(2, 4)'));
cek('nilai 3x2: 8 + 9 + 7 = 24', isiK4.includes('8 + 9 + 7 = 24'));
cek('gudang 3+5+4 = 12', isiK4.includes('3 + 5 + 4 = 12'));
cek('jawaban 1, 2, 3', isiK4.includes('A berisi 1, B berisi 2, C berisi 3'));
cek('misi akhir 2 x 4 + 3 x 5 = 23', isiK4.includes('2 x 4 + 3 x 5 = 23'));
cek('hitungan itu hanya alat hadir', isiK4.toLowerCase().includes('hitungan itu hanya alat'));

let regresi = 0;
semuaBlok.forEach(b => {
  if (b.id.startsWith('p1-') || b.id.startsWith('p2-')) {
    if (!b.isi.includes('akhir: true')) regresi++;
  } else {
    if (!b.isi.includes("akhir: true") || !b.isi.includes('Owalah, ternyata begini toh') || !b.isi.includes('Mudah, bukan?')) regresi++;
  }
});
cek('regresi 240 naskah utuh', regresi === 0, regresi);

const toCount = [...p3data.matchAll(/id: 'p3-\d{3}'/g)].length;
cek('pintu3-data 100 judul', toCount === 100, toCount);

TEMAK4.forEach((t, i) => {
  const re = new RegExp('    ' + t + ": \\{ glif: \\['([^']*)', '([^']*)', '([^']*)'\\]");
  const m = main.match(re);
  cek('TEMA_CFG glif ok: ' + t, !!m);
  if (m) m.slice(1).forEach(g => cek('glif langit ASCII: ' + g, /^[\x20-\x7E]+$/.test(g)));
});

console.log(`\nvalidasi_p3k4: ${ok} OK, ${gagal} GAGAL`);
process.exit(gagal ? 1 : 0);
