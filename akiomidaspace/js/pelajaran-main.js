/* =========================================================
   PETA CERITA — MESIN DUNIA BAHASAN (pelajaran-main.js)
   - Satu layar tetap 480x270: tanpa kamera, tanpa geser.
   - Wajib load iklan dulu (layar muat, pola Dunia Akiomida):
     klik PERGI -> muat 8 detik -> boot -> dunia. Tak langsung.
   - Tiap judul punya tema dunia sendiri (siang, senja, malam
     Baitul Hikmah, ungu, gurun, kota batu, abakus kayu, malam
     Pi, pasar, peluncuran antariksa) + stasiun berobjek unik
     + penduduk pemandu dengan sapaan khas — tiap petualangan
     terasa beda, bukan mesin cetak.
   - Stasiun aktif menyala; selesai = centang hijau. Tombol
     PERGI mengantar Akio ke tahap berikutnya otomatis.
   - Kembali selalu ke penjuru asal (?k&hal), bukan pusat kamp.
   - Mata minus: A-/A+ satu setelan dengan seluruh dunia.
   - Syariah: penduduk bola-lentera tanpa wajah, isi netral.
   ========================================================= */
(function () {
  'use strict';

  const K = window.KAMP, P1 = window.P1, CER = window.CERITA;
  const { P, teksPx, lingkaran } = K.gambar;
  const W = K.W, H = K.H, GROUND = K.GROUND;

  /* ---------- judul & asal penjuru dari URL ----------
     id p1-xxx membaca data Pintu 1 (Kamp Angka),
     id p2-xxx membaca data Pintu 2 (Hutan Simbol). */
  const qs = new URLSearchParams(window.location.search);
  const idAwal = qs.get('id') || '';
  const apakahP2 = idAwal.indexOf('p2-') === 0 && window.P2;
  const DATA = apakahP2 ? window.P2 : P1;
  const DUNIA_ASAL = apakahP2 ? 'hutan-simbol-dunia.html' : 'kamp-angka-dunia.html';
  const NAMA_PINTU = apakahP2 ? 'Pintu 2' : 'Pintu 1';
  const topik = DATA.topikById(idAwal);
  if (!topik) { window.location.replace(DUNIA_ASAL); return; }
  const kat = DATA.KATEGORI[topik.k - 1];
  const cerita = CER.untuk(topik);
  document.title = topik.judul + ' | ' + NAMA_PINTU + ' — Perpustakaan Matematika';

  // asal penjuru untuk tombol kembali (fallback: penjuru judul ini)
  const asalK = parseInt(qs.get('k') || '', 10);
  const asalHal = parseInt(qs.get('hal') || '', 10);
  const asal = (asalK >= 1 && asalK <= DATA.KATEGORI.length)
    ? { k: asalK, hal: (asalHal >= 0 && asalHal <= Math.ceil(DATA.KATEGORI[asalK - 1].jumlah / 4) - 1) ? asalHal : 0 }
    : { k: topik.k, hal: Math.floor((topik.n - 1) / 4) };
  const TUJU_KAMP = DUNIA_ASAL + '?k=' + asal.k + '&hal=' + asal.hal;

  /* ---------- elemen ---------- */
  const layar = document.getElementById('layar');
  const ctx = layar.getContext('2d');
  const introEl = document.getElementById('intro');
  const btnMasuk = document.getElementById('btnMasuk');
  const btnKamp = document.getElementById('btnKamp');
  const introJudul = document.getElementById('introJudul');
  const aksiBtn = document.getElementById('aksiBtn');
  const dialogEl = document.getElementById('dialog');
  const dlgNama = document.getElementById('dlgNama');
  const dlgTitik = document.getElementById('dlgTitik');
  const dlgJudul = document.getElementById('dlgJudul');
  const dlgTeks = document.getElementById('dlgTeks');
  const btnTutup = document.getElementById('btnTutup');
  const btnPergi = document.getElementById('btnPergi');
  const muatEl = document.getElementById('muat');
  const muatJudul = document.getElementById('muatJudul');
  const muatAura = document.getElementById('muatAura');
  const muatSlot = document.getElementById('muatSlot');
  const muatBatal = document.getElementById('muatBatal');

  const adalahSentuh = window.matchMedia('(pointer: coarse)').matches
    || 'ontouchstart' in window
    || (navigator.maxTouchPoints || 0) > 0
    || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (adalahSentuh) document.body.classList.add('coarse', 'kontrol-aktif');

  introJudul.textContent = topik.judul.toUpperCase();
  introJudul.style.color = kat.color;

  /* ---------- stasiun cerita ---------- */
  const ST_X_MULAI = 45, ST_X_AKHIR = 425;
  const stasiun = cerita.stasiun.map((s, i) => ({
    ...s,
    x: Math.round(ST_X_MULAI + (ST_X_AKHIR - ST_X_MULAI) * i / (cerita.stasiun.length - 1)),
  }));
  const NPC = cerita.npc || { glif: 'i', ucap: ['Ikuti jejak', 'bercahaya!'] };
  const NPC_X = 88;

  /* ---------- ukuran panggung ---------- */
  function pasUkuran() {
    const vw = window.innerWidth, vh = window.innerHeight;
    const lanskap = vw > vh;
    const cadangan = adalahSentuh ? (lanskap ? 96 : 150) : 26;
    const k = Math.max(0.55, Math.min((vw - 18) / W, (vh - cadangan - 18) / H));
    layar.style.width = Math.floor(W * k) + 'px';
    layar.style.height = Math.floor(H * k) + 'px';
  }
  window.addEventListener('resize', pasUkuran);
  pasUkuran();

  /* ---------- A- / A+ (berbagi setelan dengan seluruh dunia) ---------- */
  const LANGKAH_SKALA = [1, 1.15, 1.3, 1.5];
  let idxSkala = 0;
  try {
    const s = parseInt(localStorage.getItem('akio-skala') || '0', 10);
    if (s >= 0 && s < LANGKAH_SKALA.length) idxSkala = s;
  } catch (e) { /* abaikan */ }
  function terapSkala() {
    document.documentElement.style.setProperty('--skala', LANGKAH_SKALA[idxSkala]);
    try { localStorage.setItem('akio-skala', String(idxSkala)); } catch (e) { /* abaikan */ }
    const min = document.getElementById('btnMin');
    const plus = document.getElementById('btnPlus');
    if (min) min.disabled = idxSkala === 0;
    if (plus) plus.disabled = idxSkala === LANGKAH_SKALA.length - 1;
  }
  document.getElementById('btnMin').addEventListener('click', () => {
    if (idxSkala > 0) { idxSkala--; terapSkala(); }
  });
  document.getElementById('btnPlus').addEventListener('click', () => {
    if (idxSkala < LANGKAH_SKALA.length - 1) { idxSkala++; terapSkala(); }
  });
  terapSkala();

  /* ---------- kemajuan ---------- */
  function tandaiSelesai(idt) {
    try { localStorage.setItem('cerita-selesai-' + idt, '1'); } catch (e) { /* abaikan */ }
  }
  function selesai(idt) {
    try { return localStorage.getItem('cerita-selesai-' + idt) === '1'; } catch (e) { return false; }
  }

  /* ---------- layar muat (wajib: iklan dulu, dunia tak langsung muncul) ---------- */
  const DURASI_MUAT = 8000;
  let muatTimer = null;
  function warnaAura(hex, alpha) {
    const n = parseInt(hex.slice(1), 16);
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + alpha + ')';
  }
  function mulaiMuat() {
    muatJudul.textContent = 'Membuka "' + topik.judul + '"';
    muatAura.style.setProperty('--aura', warnaAura(kat.color, 0.20));
    const slot = document.createElement('div');
    slot.className = 'ad-slot';
    muatSlot.appendChild(slot);                     // ads.js otomatis menyuntik iklan
    muatEl.classList.add('aktif');
    muatEl.setAttribute('aria-hidden', 'false');
    muatTimer = setTimeout(selesaiMuat, DURASI_MUAT);
  }
  function selesaiMuat() {
    clearTimeout(muatTimer); muatTimer = null;
    muatEl.classList.remove('aktif');
    muatEl.setAttribute('aria-hidden', 'true');
    setTimeout(() => { if (muatEl.parentNode) muatEl.parentNode.removeChild(muatEl); }, 500);
  }
  muatBatal.addEventListener('click', () => { window.location.href = TUJU_KAMP; });
  mulaiMuat();

  /* ---------- keadaan dunia ---------- */
  let aktif = 0;                                     // indeks stasiun aktif
  let dlg = null;                                    // stasiun yang dialognya terbuka
  const player = { x: 20, y: GROUND, vx: 0, dir: 1, state: 'diam', walkT: 0, target: null, tuju: null, squash: 0 };

  /* ---------- tema & kehidupan langit ---------- */
  const TEMA_NAMA = cerita.tema || 'siang';
  const TEMA_CFG = {
    siang:  { glif: ['1', '+', '?', '0'], awan: '#fffdf2', awan2: '#e8f4fa' },
    senja:  { glif: ['1', '2', '3'],      awan: '#ffe2c4', awan2: '#ffd9b0' },
    malam:  { glif: ['1', '0', '2'],      awan: '#3a4a78', awan2: '#33436e' },
    ungu:   { glif: ['0', '1', '?'],      awan: '#e8dcff', awan2: '#d9c9f5' },
    gurun:  { glif: ['3', '4', '5'],      awan: '#fffdf2', awan2: '#f5ecd4' },
    kota:   { glif: ['I', 'V', 'X'],      awan: '#f2f6f8', awan2: '#e2eaee' },
    kayu:   { glif: null,                 awan: null,      awan2: null },
    pasar:  { glif: ['1', '2', '3'],      awan: '#fffdf2', awan2: '#e8f4fa' },
    malam2: { glif: ['3', '1', '4'],      awan: '#3a4a78', awan2: '#33436e' },
    future: { glif: ['1', '0', '?'],      awan: null,      awan2: null },
    kampung:{ glif: ['0', '5', '9'],      awan: '#fffdf2', awan2: '#e8f4fa' },
    tangga: { glif: ['1', '2', '3'],      awan: '#ffe9c4', awan2: '#ffd9b0' },
    fajar:  { glif: ['9', '5', '0'],      awan: '#ffe2c4', awan2: '#ffd9b0' },
    kapal:  { glif: ['1', '0', 'K'],      awan: '#fffdf2', awan2: '#e8f4fa' },
    panggung:{ glif: ['1', '0', '0'],     awan: '#5a4a78', awan2: '#4a3a68' },
    jemur:  { glif: ['2', '4', '6'],      awan: '#fffdf2', awan2: '#e8f4fa' },
    taman:  { glif: ['1', '3', '5'],      awan: '#ffd9c4', awan2: '#f8c8b0' },
    permen: { glif: ['7', '9', '>'],      awan: null,      awan2: null },
    lomba:  { glif: ['1', '2', '3'],      awan: '#fffdf2', awan2: '#e8f4fa' },
    pola:   { glif: ['2', '4', '8'],      awan: '#3a6a68', awan2: '#2f5a58' },
    plus:   { glif: ['+', '3', '2'],      awan: '#fffdf2', awan2: '#e8f4fa' },
    peron:  { glif: ['5', '-', '2'],      awan: '#ffe2c4', awan2: '#ffd9b0' },
    parade: { glif: ['3', '4', 'x'],      awan: '#fffdf2', awan2: '#e8f4fa' },
    meja:   { glif: ['8', '4', '2'],      awan: null,      awan2: null },
    setara: { glif: ['=', '7', '3'],      awan: '#dfe9f8', awan2: '#cfe0f2' },
    tanduk: { glif: ['9', '3', '>'],      awan: '#fffdf2', awan2: '#e8f4fa' },
    desa:   { glif: ['(', '2', ')'],      awan: '#ffe2c4', awan2: '#ffd9b0' },
    kue:    { glif: null,                 awan: null,      awan2: null },
    malamdalam: { glif: ['8', '1', '0'],  awan: null,      awan2: null },
    perpus: { glif: ['2', '+', '5'],      awan: null,      awan2: null },
    lingkar: { glif: ['2', '3', '5'],     awan: '#fffdf2', awan2: '#e8f4fa' },
    kelas:   { glif: ['3', '4', '7'],     awan: null,      awan2: null },
    gudang:  { glif: ['8', '5', '3'],     awan: null,      awan2: null },
    tulis:   { glif: ['2', '3', '7'],     awan: null,      awan2: null },
    menara:  { glif: ['5', '7', '1'],     awan: '#ffe2c4', awan2: '#ffd9b0' },
    piknik:  { glif: ['5', '2', '3'],     awan: '#ffd9c4', awan2: '#f8c8b0' },
    kantor:  { glif: ['4', '2', '7'],     awan: null,      awan2: null },
    tetangga:{ glif: ['4', '1', '2'],     awan: '#ffe2c4', awan2: '#ffd9b0' },
    teras:   { glif: ['3', '4', '7'],     awan: '#fffdf2', awan2: '#e8f4fa' },
    layang:  { glif: ['4', '2', '6'],     awan: '#fffdf2', awan2: '#e8f4fa' },
    berbagi: { glif: ['7', '3', '4'],     awan: '#ffe2c4', awan2: '#ffd9b0' },
    misteri: { glif: ['4', '5', '9'],     awan: null,      awan2: null },
    barisan: { glif: ['3', '5', 'x'],     awan: '#ffe9c4', awan2: '#ffd9b0' },
    pasangan:{ glif: ['2', '4', '6'],     awan: null,      awan2: null },
    lima:    { glif: ['5', '0', '5'],     awan: '#ffd9c4', awan2: '#f8c8b0' },
    stasiun: { glif: ['1', '0', '4'],     awan: null,      awan2: null },
    bengkel: { glif: ['3', '4', '1'],     awan: null,      awan2: null },
    tebing:  { glif: ['6', '7', '8'],     awan: '#ffe2c4', awan2: '#ffd9b0' },
    kemah:   { glif: ['9', '2', '7'],     awan: null,      awan2: null },
    terang:  { glif: ['2', '3', '9'],     awan: null,      awan2: null },
    bazar:   { glif: ['1', '0', '5'],     awan: '#fffdf2', awan2: '#e8f4fa' },
    warung:  { glif: ['7', '2', '1'],     awan: '#ffe2c4', awan2: '#ffd9b0' },
    lorong:  { glif: ['9', '6', '3'],     awan: null,      awan2: null },
    arena:   { glif: ['6', '4', '2'],     awan: null,      awan2: null },
    dapur:   { glif: ['1', '2', '1/2'],   awan: null,      awan2: null },
    ultah:   { glif: ['4', '1', '1/4'],   awan: '#ffe2c4', awan2: '#ffd9b0' },
    resep:   { glif: ['3', '4', '/'],     awan: null,      awan2: null },
    teh:     { glif: ['3', '5', '1/3'],   awan: null,      awan2: null },
    kembar:  { glif: ['1/2', '2/4', '?'], awan: '#fffdf2', awan2: '#e8f4fa' },
    cokelat: { glif: ['2', '8', '>'],     awan: '#fffdf2', awan2: '#e8f4fa' },
    nampan:  { glif: ['1', '2', '4'],     awan: '#ffe2c4', awan2: '#ffd9b0' },
    kantin:  { glif: ['3', '4', '1/4'],   awan: '#fffdf2', awan2: '#e8f4fa' },
    saji:    { glif: ['1', '1/2', '?'],   awan: null,      awan2: null },
    tikar:   { glif: ['1/2', '5', '10'],  awan: '#ffd9c4', awan2: '#f8c8b0' },
    kertas:  { glif: ['2', '4', '2/4'],   awan: null,      awan2: null },
    gelanggang: { glif: ['5', '8', '1/2'], awan: null,     awan2: null },
    es:      { glif: ['0,5', '1/2', ','],   awan: '#fffdf2', awan2: '#e8f4fa' },
    kandang: { glif: ['0', '1', '0,1'],     awan: '#ffe9c4', awan2: '#ffd9b0' },
    gerbangDua: { glif: ['0,5', '1/2', '='], awan: '#ffd9c4', awan2: '#f8c8b0' },
    juri:    { glif: ['0,7', '0,25', '>'],  awan: null,      awan2: null },
    petak:   { glif: ['25%', '100', '1/4'], awan: '#fffdf2', awan2: '#e8f4fa' },
    tangki:  { glif: ['100%', '50%', '0%'], awan: '#ffe2c4', awan2: '#ffd9b0' },
    kaca:    { glif: ['1/2', '0,5', '50%'], awan: null,      awan2: null },
    toko:    { glif: ['1', '2', '5'],       awan: null,      awan2: null },
    kasir:   { glif: ['5', '3', '2'],       awan: null,      awan2: null },
    celengan:{ glif: ['500', '1.500', '3'], awan: '#ffe9c4', awan2: '#ffd9b0' },
    kotak:      { glif: ['3', '4', '2'],      awan: '#fffdf2', awan2: '#e8f4fa' },
    garisSisi:  { glif: ['1', '2', '3'],      awan: '#ffe9c4', awan2: '#ffd9b0' },
    jalanPutar: { glif: ['1', '0', '1'],      awan: '#ffe9c4', awan2: '#ffd9b0' },
    patroli:    { glif: ['8', '5', '2'],      awan: '#ffe2c4', awan2: '#ffd9b0' },
    ubin:       { glif: ['3', '4', '1'],      awan: '#fffdf2', awan2: '#e8f4fa' },
    barisUbin:  { glif: ['6', '4', '2'],      awan: '#ffe2c4', awan2: '#ffd9b0' },
    karpet:     { glif: ['1/2', '6', '4'],    awan: null,      awan2: null },
    rodaDunia:  { glif: ['3,14', '0', '1'],   awan: null,      awan2: null },
    kardus:     { glif: ['6', '3', 'D'],      awan: null,      awan2: null },
    kamarMalam: { glif: ['5', '?', '4'],      awan: null,      awan2: null },
    penggaris:  { glif: ['cm', 'm', '1'],     awan: '#ffe9c4', awan2: '#ffd9b0' },
    bazarBerat: { glif: ['kg', 'g', '1'],     awan: '#fffdf2', awan2: '#e8f4fa' },
    takaranAir: { glif: ['L', 'ml', '1'],     awan: null,      awan2: null },
    menaraJam:  { glif: ['60', '12', '1'],    awan: '#ffe2c4', awan2: '#ffd9b0' },
    arsipWaktu: { glif: ['7', '30', '365'],   awan: null,      awan2: null },
    duaIklim:   { glif: ['0', '100', '37'],   awan: null,      awan2: null },
    festivalPola: { glif: ['A', 'B', '?'],    awan: null,      awan2: null },
    kantorTeka: { glif: ['2', '4', '?'],      awan: null,      awan2: null },
    paviliun:   { glif: ['4', '9', '2'],      awan: null,      awan2: null },
    arenaGeser: { glif: ['99', '17', '116'],  awan: '#fffdf2', awan2: '#e8f4fa' },
    labirin:    { glif: ['3', '6', '9'],      awan: '#ffe2c4', awan2: '#ffd9b0' },
    duelLogika: { glif: ['A', 'B', 'C'],      awan: '#fffdf2', awan2: '#e8f4fa' },
    khemahSudoku: { glif: ['1', '2', '4'],    awan: null,      awan2: null },
    arenaJuara: { glif: ['1', '2', '3'],      awan: null,      awan2: null },
    tambang: { glif: ['-', '0', '?'],   awan: null,      awan2: null },
    jembatan: { glif: ['-', '2', '0'],   awan: '#eafaf0', awan2: '#d8f2e2' },
    kutub: { glif: ['0', '-', '?'],   awan: '#ffffff', awan2: '#eef8fc' },
    kios: { glif: ['3', '5', '2'],   awan: '#fffdf2', awan2: '#f5ecd4' },
    jurang: { glif: ['8', '3', '0'],   awan: '#e8e8f2', awan2: '#d8daf0' },
    pelabuhan: { glif: ['3', '0', '-'],   awan: '#fffdf2', awan2: '#e8f4fa' },
    terowongan: { glif: ['3', '5', '-'],   awan: null,      awan2: null },
    balik: { glif: ['<', '6', '-'],   awan: '#f2fff2', awan2: '#e0f5e0' },
    kurir: { glif: ['+', '-', '3'],   awan: '#fff3cf', awan2: '#ffe2c4' },
    lift: { glif: ['4', '0', '-'],   awan: null,      awan2: null },
    pelataran: { glif: ['2x6', '3x4', '12'], awan: '#eafaf0', awan2: '#d8f2e2' },
    kuari: { glif: ['2', '3', '12'], awan: '#e8e2d4', awan2: '#d8d2c2' },
    bungkusan: { glif: ['6', '2', '3'], awan: '#fff8e0', awan2: '#ffe9c4' },
    pestaLampu: { glif: ['4', '6', '12'], awan: null, awan2: null },
    bukuTua: { glif: ['÷', '2', '1'], awan: null, awan2: null },
    pondokKartu: { glif: ['2', '3', '6'], awan: null, awan2: null },
    galeri: { glif: ['2', '3', '36'], awan: '#eefaf2', awan2: '#e0f4e8' },
    tanur: { glif: ['2/3', '12', '6'], awan: null, awan2: null },
    titianBatu: { glif: ['12', '3', '2'], awan: '#e8f6f2', awan2: '#d8eee8' },
    kantorPohon: { glif: ['?', '4', '15'], awan: null, awan2: null },
    posRahasia: { glif: ['x', '?', '4'], awan: '#eafaf0', awan2: '#d8f2e2' },
    kebunApel: { glif: ['2x', '3x', '5x'], awan: '#ffe2c4', awan2: '#ffd9b0' },
    gudangTumpuk: { glif: ['2x', '3', '6x'], awan: '#fffdf2', awan2: '#e8f4fa' },
    kacaKuncup: { glif: ['2', 'x+3', '6'], awan: '#f2ffe8', awan2: '#e0f8d4' },
    mesinStempel: { glif: ['x', '4', '9'], awan: '#ffe9c4', awan2: '#ffd9b0' },
    kamarRapi: { glif: ['5x', '3x', '8x'], awan: '#ffd9c4', awan2: '#f8c8b0' },
    kunangTangga: { glif: ['3', '7', '4n'], awan: null, awan2: null },
    tendaPendaki: { glif: ['3x', '5', '+'], awan: '#ffe2c4', awan2: '#ffc8a0' },
    ladangBunga: { glif: ['a', 'b', '2a'], awan: '#f2ffe8', awan2: '#e4fcd0' },
    menaraTantang: { glif: ['?', 'x', 'n'], awan: null, awan2: null },
  };
  const cfgTema = TEMA_CFG[TEMA_NAMA] || TEMA_CFG.siang;

  const awan = cfgTema.awan
    ? [{ x: 60, y: 24, v: 4.0, s: 1 }, { x: 280, y: 44, v: 3.0, s: 1.25 }]
    : [];
  const glifLangit = cfgTema.glif
    ? [
        { x: 100, y: 58, g: cfgTema.glif[0], v: 4.4, f: 0 },
        { x: 262, y: 80, g: cfgTema.glif[1], v: 3.2, f: 2.1 },
        { x: 390, y: 50, g: cfgTema.glif[2], v: 4.0, f: 4.4 },
      ]
    : [];

  /* partikel ambien khas tema */
  const AMB_CFG = {
    siang:  { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    senja:  { jenis: 'drift', warna: '#ffd166', y: [190, 238], n: 10 },
    malam:  { jenis: 'kedip', warna: '#fffdf2', y: [16, 140], n: 22 },
    ungu:   { jenis: 'kedip', warna: '#f2e8ff', y: [16, 140], n: 18 },
    gurun:  { jenis: 'drift', warna: '#fff3cf', y: [188, 242], n: 9 },
    kota:   { jenis: 'drift', warna: '#ffffff', y: [186, 240], n: 7 },
    kayu:   { jenis: 'jatuh', warna: '#ffe9a3', y: [16, 244], n: 10 },
    pasar:  { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    malam2: { jenis: 'kedip', warna: '#cdd9f5', y: [16, 150], n: 24 },
    future: { jenis: 'naik', warna: '#4fe3c8', y: [60, 244], n: 12 },
    kampung:{ jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 8 },
    tangga: { jenis: 'drift', warna: '#ffe9a3', y: [186, 240], n: 8 },
    fajar:  { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 9 },
    kapal:  { jenis: 'kilau', warna: '#d0f4ff', y: [150, 184], n: 12 },
    panggung:{ jenis: 'kedip', warna: '#ffe9a3', y: [16, 180], n: 14 },
    jemur:  { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 7 },
    taman:  { jenis: 'drift', warna: '#ffe9a3', y: [150, 240], n: 10 },
    permen: { jenis: 'jatuh', warna: '#ff9db8', y: [16, 244], n: 12 },
    lomba:  { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    pola:   { jenis: 'kedip', warna: '#a8e8d8', y: [16, 150], n: 20 },
    plus:   { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 8 },
    peron:  { jenis: 'drift', warna: '#ffd166', y: [186, 240], n: 10 },
    parade: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    meja:   { jenis: 'kilau', warna: '#fff3cf', y: [140, 244], n: 8 },
    setara: { jenis: 'kilau', warna: '#e8f0ff', y: [186, 240], n: 7 },
    tanduk: { jenis: 'drift', warna: '#fff3cf', y: [186, 240], n: 8 },
    desa:   { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 9 },
    kue:    { jenis: 'jatuh', warna: '#ffd9a3', y: [16, 244], n: 10 },
    malamdalam: { jenis: 'kedip', warna: '#fffdf2', y: [16, 140], n: 26 },
    perpus: { jenis: 'jatuh', warna: '#ffe9a3', y: [16, 244], n: 8 },
    lingkar: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 8 },
    kelas:   { jenis: 'drift', warna: '#ffe9a3', y: [140, 244], n: 8 },
    gudang:  { jenis: 'drift', warna: '#ffd9a3', y: [120, 244], n: 10 },
    tulis:   { jenis: 'kilau', warna: '#ffe9a3', y: [130, 244], n: 8 },
    menara:  { jenis: 'drift', warna: '#ffd166', y: [186, 240], n: 9 },
    piknik:  { jenis: 'drift', warna: '#ffe9a3', y: [186, 240], n: 9 },
    kantor:  { jenis: 'kilau', warna: '#ffe9a3', y: [130, 244], n: 7 },
    tetangga:{ jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 9 },
    teras:   { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 8 },
    layang:  { jenis: 'drift', warna: '#fffdf2', y: [16, 150], n: 9 },
    berbagi: { jenis: 'drift', warna: '#ffd166', y: [186, 240], n: 9 },
    misteri: { jenis: 'kedip', warna: '#cdd9f5', y: [16, 140], n: 22 },
    barisan: { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 9 },
    pasangan:{ jenis: 'kedip', warna: '#fffdf2', y: [16, 140], n: 22 },
    lima:    { jenis: 'drift', warna: '#ffe9a3', y: [150, 240], n: 10 },
    stasiun: { jenis: 'kedip', warna: '#cdd9f5', y: [16, 150], n: 24 },
    bengkel: { jenis: 'kilau', warna: '#ffe9a3', y: [130, 244], n: 8 },
    tebing:  { jenis: 'drift', warna: '#ffd166', y: [186, 240], n: 9 },
    kemah:   { jenis: 'kedip', warna: '#ffe9a3', y: [16, 180], n: 14 },
    terang:  { jenis: 'kilau', warna: '#fff3cf', y: [140, 244], n: 8 },
    bazar:   { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 8 },
    warung:  { jenis: 'drift', warna: '#ffd166', y: [186, 240], n: 9 },
    lorong:  { jenis: 'kedip', warna: '#fffdf2', y: [16, 140], n: 22 },
    arena:   { jenis: 'kilau', warna: '#ffd9a3', y: [60, 244], n: 12 },
    dapur:   { jenis: 'kilau', warna: '#ffe9a3', y: [140, 244], n: 8 },
    ultah:   { jenis: 'jatuh', warna: '#ff9db8', y: [16, 244], n: 10 },
    resep:   { jenis: 'kedip', warna: '#ffe9a3', y: [16, 180], n: 14 },
    teh:     { jenis: 'naik', warna: '#ffe9a3', y: [60, 244], n: 10 },
    kembar:  { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 8 },
    cokelat: { jenis: 'drift', warna: '#fff3cf', y: [186, 240], n: 9 },
    nampan:  { jenis: 'drift', warna: '#ffd166', y: [186, 240], n: 9 },
    kantin:  { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    saji:    { jenis: 'kedip', warna: '#ffd9a3', y: [16, 180], n: 12 },
    tikar:   { jenis: 'drift', warna: '#ffe9a3', y: [186, 240], n: 9 },
    kertas:  { jenis: 'jatuh', warna: '#ffd9a3', y: [16, 244], n: 8 },
    gelanggang: { jenis: 'kedip', warna: '#cdd9f5', y: [16, 140], n: 22 },
    es:      { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 8 },
    kandang: { jenis: 'drift', warna: '#ffe9a3', y: [186, 240], n: 9 },
    gerbangDua: { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 9 },
    juri:    { jenis: 'kedip', warna: '#ffd9a3', y: [16, 140], n: 18 },
    petak:   { jenis: 'kilau', warna: '#ffe9a3', y: [186, 240], n: 7 },
    tangki:  { jenis: 'drift', warna: '#ffd166', y: [186, 240], n: 9 },
    kaca:    { jenis: 'kedip', warna: '#e8e2ff', y: [16, 140], n: 20 },
    toko:    { jenis: 'kilau', warna: '#ffe9a3', y: [140, 244], n: 8 },
    kasir:   { jenis: 'drift', warna: '#ffd166', y: [186, 240], n: 9 },
    celengan:{ jenis: 'kilau', warna: '#d8f0fa', y: [186, 240], n: 7 },
    kotak:      { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 8 },
    garisSisi:  { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 9 },
    jalanPutar: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    patroli:    { jenis: 'drift', warna: '#ffd166', y: [186, 240], n: 9 },
    ubin:       { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 8 },
    barisUbin:  { jenis: 'drift', warna: '#ffe9a3', y: [186, 240], n: 9 },
    karpet:     { jenis: 'kedip', warna: '#cdd9f5', y: [16, 140], n: 20 },
    rodaDunia:  { jenis: 'kedip', warna: '#fffdf2', y: [16, 140], n: 22 },
    kardus:     { jenis: 'kilau', warna: '#ffe9a3', y: [140, 244], n: 8 },
    kamarMalam: { jenis: 'kedip', warna: '#e8e2ff', y: [16, 140], n: 18 },
    penggaris:  { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 9 },
    bazarBerat: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 8 },
    takaranAir: { jenis: 'kilau', warna: '#d8f0fa', y: [140, 244], n: 9 },
    menaraJam:  { jenis: 'drift', warna: '#ffd166', y: [186, 240], n: 9 },
    arsipWaktu: { jenis: 'kedip', warna: '#e8e2ff', y: [16, 140], n: 20 },
    duaIklim:   { jenis: 'jatuh', warna: '#f2f8fc', y: [16, 244], n: 12 },
    festivalPola: { jenis: 'kedip', warna: '#ff9db8', y: [16, 150], n: 22 },
    kantorTeka: { jenis: 'kedip', warna: '#cdd9f5', y: [16, 140], n: 20 },
    paviliun:   { jenis: 'kedip', warna: '#d9c4ff', y: [16, 140], n: 20 },
    arenaGeser: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    labirin:    { jenis: 'drift', warna: '#ffd166', y: [186, 240], n: 10 },
    duelLogika: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 8 },
    khemahSudoku: { jenis: 'kedip', warna: '#cdd9f5', y: [16, 140], n: 18 },
    arenaJuara: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 180], n: 26 },
    tambang: { jenis: 'naik', warna: '#ffd166', y: [120, 240], n: 10 },
    jembatan: { jenis: 'drift', warna: '#d8f2e2', y: [186, 240], n: 8 },
    kutub: { jenis: 'jatuh', warna: '#ffffff', y: [16, 244], n: 14 },
    kios: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 8 },
    jurang: { jenis: 'drift', warna: '#e0e2ee', y: [150, 240], n: 10 },
    pelabuhan: { jenis: 'drift', warna: '#d0f4ff', y: [150, 184], n: 10 },
    terowongan: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 200], n: 14 },
    balik: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 7 },
    kurir: { jenis: 'drift', warna: '#ffe9c4', y: [186, 240], n: 9 },
    lift: { jenis: 'kedip', warna: '#d0d8e8', y: [16, 220], n: 16 },
    pelataran: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 8 },
    kuari: { jenis: 'drift', warna: '#e8dcc8', y: [186, 240], n: 9 },
    bungkusan: { jenis: 'kilau', warna: '#ffd166', y: [186, 240], n: 8 },
    pestaLampu: { jenis: 'kedip', warna: '#ffd166', y: [16, 180], n: 18 },
    bukuTua: { jenis: 'jatuh', warna: '#ffe9a3', y: [16, 244], n: 8 },
    pondokKartu: { jenis: 'kedip', warna: '#cdd9f5', y: [16, 140], n: 20 },
    galeri: { jenis: 'drift', warna: '#d8f2e2', y: [186, 240], n: 8 },
    tanur: { jenis: 'naik', warna: '#ffd9a3', y: [60, 244], n: 10 },
    titianBatu: { jenis: 'kilau', warna: '#d0f4ff', y: [150, 184], n: 10 },
    kantorPohon: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 180], n: 14 },
    posRahasia: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 8 },
    kebunApel: { jenis: 'jatuh', warna: '#ffb86b', y: [40, 240], n: 9 },
    gudangTumpuk: { jenis: 'drift', warna: '#e8dcc8', y: [186, 240], n: 9 },
    kacaKuncup: { jenis: 'kilau', warna: '#f2ffd8', y: [186, 240], n: 8 },
    mesinStempel: { jenis: 'naik', warna: '#ffd9a3', y: [100, 244], n: 8 },
    kamarRapi: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 7 },
    kunangTangga: { jenis: 'kedip', warna: '#d8ffb0', y: [40, 220], n: 22 },
    tendaPendaki: { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 8 },
    ladangBunga: { jenis: 'drift', warna: '#f2b8cc', y: [150, 240], n: 10 },
    menaraTantang: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 200], n: 16 },
  };
  const rand = (a, b) => a + Math.random() * (b - a);
  let amb = [];
  function hidupkanAmb() {
    const c = AMB_CFG[TEMA_NAMA] || AMB_CFG.siang;
    amb = [];
    for (let i = 0; i < c.n; i++) {
      amb.push({
        x: rand(8, W - 8), y: rand(c.y[0], c.y[1]), f: rand(0, 6),
        vx: rand(-4, 4), vy: c.jenis === 'naik' ? rand(-8, -3) : (c.jenis === 'jatuh' ? rand(3, 8) : 0),
        batas: c.y, jenis: c.jenis, warna: c.warna,
      });
    }
  }
  hidupkanAmb();

  let asap = [], daun = [], kilau = [];
  const PARTIKEL_OBJEK = { api: 'asap', roket: 'asap', roketKecil: 'asap', pohon: 'daun', tugu: 'kilau', konstelasi: 'kilau', delapanMiring: 'kilau', bintangTerbanyak: 'kilau', tekoTuang: 'asap', termometerDidih: 'asap', kotakAjaib: 'kilau', jamRaksasa: 'kilau', lampuFestival: 'kilau', gerbangJuara: 'kilau', kuraLegenda: 'kilau', kunciBalikArah: 'kilau', tiangNolTengah: 'kilau', gerbangLenteraDalam: 'kilau', menaraLiftTambang: 'kilau', stempelLunas: 'kilau', lenteraJurang: 'kilau', termometerGanda: 'kilau', rodaTaliLift: 'kilau', batuKuari: 'asap', paluPecahDua: 'kilau', papanSusunPrima: 'kilau', duaLampionPesta: 'kilau', titikBertemuDuaBelas: 'kilau', papanTanggaBagi: 'kilau', pisauBagiEnam: 'kilau', titianDuaBelas: 'kilau', mejaKasusFaktor: 'kilau', gerbangKoprima: 'kilau', suratTersegelX: 'kilau', kotakKunciMisteri: 'kilau', amplopTerbukaEmpat: 'kilau', barisanKantongLima: 'kilau', kotakGelindingEnam: 'asap', duaPotKaca: 'kilau', isianPotPertama: 'kilau', koinNilaiEmpat: 'kilau', rodaMesinHitung: 'asap', strukHasilSembilan: 'kilau', tanggaKunangEmpat: 'kilau', anakTanggaKeN: 'kilau', papanKurungTerbuka: 'kilau', papanRumusEmpatN: 'kilau', tendaBekalPenuh: 'kilau', petakBungaA: 'daun', petakBungaB: 'daun', ladangTerbaca: 'kilau', papanDuaA3B: 'kilau', menaraLimaMisi: 'kilau', jendelaNilaiHuruf: 'kilau' };

  /* ---------- input ---------- */
  const keys = { kiri: false, kanan: false };
  addEventListener('keydown', e => {
    if (document.body.classList.contains('dlg-buka') || muatEl.parentNode) return;
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') { keys.kiri = true; e.preventDefault(); }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { keys.kanan = true; e.preventDefault(); }
    if ((e.key === 'Enter' || e.key === ' ') && nearSt && !dlg) { lakukan(stasiun[aktif]); e.preventDefault(); }
  });
  addEventListener('keyup', e => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.kiri = false;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.kanan = false;
  });

  function ikatTombol(idEl, sisi) {
    const el = document.getElementById(idEl);
    if (!el) return;
    const tekan = e => { e.preventDefault(); keys[sisi] = true; el.classList.add('tahan'); };
    const lepas = e => { e.preventDefault(); keys[sisi] = false; el.classList.remove('tahan'); };
    el.addEventListener('pointerdown', tekan);
    el.addEventListener('pointerup', lepas);
    el.addEventListener('pointercancel', lepas);
    el.addEventListener('pointerleave', lepas);
    el.addEventListener('contextmenu', e => e.preventDefault());
  }
  ikatTombol('btnKiri', 'kiri');
  ikatTombol('btnKanan', 'kanan');

  layar.addEventListener('pointerdown', e => {
    if (document.body.classList.contains('dlg-buka') || muatEl.parentNode) return;
    e.preventDefault();
    const r = layar.getBoundingClientRect();
    const wx = (e.clientX - r.left) / r.width * W;
    const wy = (e.clientY - r.top) / r.height * H;
    const st = stasiun[aktif];
    if (wy > 120 && Math.abs(wx - st.x) < 30) { tujuStasiun(aktif, true); return; }
    if (wy > GROUND - 60) {
      player.target = Math.max(14, Math.min(W - 14, wx));
      player.tuju = null;
    }
  });

  /* ---------- menuju stasiun & aksi ---------- */
  function tujuStasiun(i, bukaOtomatis) {
    if (dlg) return;
    const st = stasiun[i];
    player.target = Math.max(14, Math.min(W - 14, st.x - 18));
    player.tuju = { i, buka: !!bukaOtomatis };
  }
  function lakukan(st) { bukaDialog(st); }

  aksiBtn.addEventListener('pointerdown', e => {
    e.preventDefault();
    if (nearSt && !dlg) lakukan(stasiun[aktif]);
  });

  /* ---------- dialog cerita (huruf besar, mata minus) ---------- */
  function bukaDialog(st) {
    if (dlg) return;
    player.target = null; player.tuju = null; player.vx = 0; player.state = 'diam';
    dlg = st;
    document.body.classList.add('dlg-buka');
    aksiBtn.classList.remove('tampil');
    const i = stasiun.indexOf(st);
    dlgNama.textContent = 'PETA CERITA';
    dlgNama.style.color = kat.color;
    dlgTitik.textContent = 'TAHAP ' + (i + 1) + '/' + stasiun.length;
    dlgJudul.textContent = st.judul;
    dlgJudul.style.color = kat.color;
    dlgTeks.textContent = st.teks;
    if (st.akhir) {
      tandaiSelesai(topik.id);
      btnTutup.textContent = '\u2190 KEMBALI KE JALUR';
      btnPergi.textContent = 'JUDUL BERIKUTNYA \u2192';
      const lanjut = DATA.topikLain(topik.id, 1);
      btnPergi.style.display = lanjut ? '' : 'none';
    } else {
      btnTutup.textContent = 'TUTUP';
      btnPergi.textContent = 'PERGI';
      btnPergi.style.display = '';
    }
    dialogEl.classList.add('aktif');
  }
  function tutupDialog() {
    dlg = null;
    document.body.classList.remove('dlg-buka');
    dialogEl.classList.remove('aktif');
  }
  btnTutup.addEventListener('click', () => {
    if (dlg && dlg.akhir) { window.location.href = TUJU_KAMP; return; }
    tutupDialog();
  });
  btnPergi.addEventListener('click', () => {
    if (!dlg) return;
    if (dlg.akhir) {
      const lanjut = DATA.topikLain(topik.id, 1);
      if (lanjut) {
        window.location.href = 'pelajaran.html?id=' + lanjut.id + '&k=' + asal.k + '&hal=' + asal.hal;
      }
      return;
    }
    const i = stasiun.indexOf(dlg);
    tutupDialog();
    if (i < stasiun.length - 1) { aktif = i + 1; tujuStasiun(aktif, true); }
  });

  /* ---------- objek terdekat (tombol aksi besar + Enter) ---------- */
  let nearSt = false;
  aksiBtn.textContent = 'LIHAT CERITA';

  /* ---------- pembaruan ---------- */
  const KECEPATAN = 108;
  function update(dt) {
    const dlgBuka = document.body.classList.contains('dlg-buka');
    if (dlgBuka) return;

    player.squash = Math.max(0, player.squash - dt * 4);
    const arah = (keys.kiri ? -1 : 0) + (keys.kanan ? 1 : 0);
    if (arah !== 0) {
      player.target = null; player.tuju = null;
      player.vx += (arah * KECEPATAN - player.vx) * Math.min(1, dt * 10);
      player.dir = arah; player.state = 'jalan';
    } else if (player.target != null) {
      const dx = player.target - player.x;
      player.vx = Math.max(-KECEPATAN, Math.min(KECEPATAN, dx * 6));
      if (Math.abs(dx) > 2) { player.dir = dx > 0 ? 1 : -1; player.state = 'jalan'; }
      else {
        player.x = player.target; player.vx = 0; player.target = null;
        player.state = 'diam'; player.squash = 0.6;
        if (player.tuju) { const t = player.tuju; player.tuju = null; if (t.buka) lakukan(stasiun[t.i]); }
      }
    } else {
      player.vx *= 1 - Math.min(1, dt * 9);
      if (Math.abs(player.vx) < 4) { player.vx = 0; player.state = 'diam'; }
    }
    player.x = Math.max(14, Math.min(W - 14, player.x + player.vx * dt));
    player.walkT += Math.abs(player.vx) * dt;

    // stasiun aktif dekat -> tombol aksi besar
    const st = stasiun[aktif];
    nearSt = Math.abs(player.x - (st.x - 18)) < 20 || Math.abs(player.x - st.x) < 26;
    if (nearSt && !dlg) aksiBtn.classList.add('tampil');
    else aksiBtn.classList.remove('tampil');

    // partikel dari objek khas (api & roket berasap, pohon menggugur daun, tugu & konstelasi berkilau)
    for (const jenisObj in PARTIKEL_OBJEK) {
      const stO = stasiun.find(s => s.objek === jenisObj);
      if (!stO) continue;
      const jenisP = PARTIKEL_OBJEK[jenisObj];
      const laju = jenisP === 'asap' ? 2.2 : (jenisP === 'daun' ? 1.4 : 1.8);
      if (Math.random() < dt * laju) {
        if (jenisP === 'asap') asap.push({ x: stO.x + rand(-2, 3), y: 226, hidup: rand(1.0, 1.6), umur: 0 });
        else if (jenisP === 'daun') daun.push({ x: stO.x + rand(-12, 12), y: 200, hidup: rand(1.8, 2.6), umur: 0, goyang: rand(0, 6) });
        else kilau.push({ x: stO.x + rand(-9, 9), y: rand(196, 216), hidup: rand(0.6, 1.1), umur: 0 });
      }
    }
    for (const s of asap) { s.umur += dt; s.y -= dt * 9; s.x += Math.sin(s.umur * 5) * 0.2; }
    asap = asap.filter(s => s.umur < s.hidup);
    for (const d of daun) { d.umur += dt; d.y += dt * 14; d.x += Math.sin(d.umur * 3 + d.goyang) * 0.35; }
    daun = daun.filter(d => d.umur < d.hidup && d.y < GROUND - 2);
    for (const k of kilau) k.umur += dt;
    kilau = kilau.filter(k => k.umur < k.hidup);

    // partikel ambien tema
    for (const a of amb) {
      a.f += dt;
      if (a.jenis === 'drift') { a.x += a.vx * dt; if (a.x < 4) a.x = W - 4; if (a.x > W - 4) a.x = 4; }
      else if (a.jenis === 'naik') { a.y += a.vy * dt; if (a.y < a.batas[0]) { a.y = a.batas[1]; a.x = rand(8, W - 8); } }
      else if (a.jenis === 'jatuh') { a.y += a.vy * dt; if (a.y > a.batas[1]) { a.y = a.batas[0]; a.x = rand(8, W - 8); } }
    }
  }

  function updatePartikel(dt, t) {
    for (const a of awan) { a.x += a.v * dt; if (a.x > 500) a.x = -60; }
    for (const g of glifLangit) { g.x += g.v * dt; g.f += dt; if (g.x > 495) { g.x = -15; g.y = rand(38, 92); } }
  }

  /* =========================================================
     LATAR DIBAKAR PER TEMA — tiap judul punya dunia beda rasa
     ========================================================= */
  function gunungDi(c, apexX, apexY, setW, baseY, col) {
    for (let y = apexY; y <= baseY; y++) {
      const u = (y - apexY) / (baseY - apexY);
      const ww = Math.max(1, Math.round(setW * u));
      P(c, apexX - ww, y, ww * 2 + 1, 1, col);
    }
  }
  function hutanDi(c, warna1, warna2) {
    for (let i = 0; i < 14; i++) {
      const tx = 8 + i * 34, ty = 176 + (i % 3) * 2;
      lingkaran(c, tx, ty, 5, warna1);
      lingkaran(c, tx - 3, ty + 2, 3, warna2);
    }
  }
  function tanah(c, col, c1, c2) {
    P(c, 0, 182, W, 88, col);
    for (let i = 0; i < 60; i++) {
      const gx = (i * 53) % W, gy = 186 + (i * 29) % 48;
      P(c, gx, gy, 2, 1, i % 2 ? c1 : c2);
    }
  }
  function jalan(c, col, tepi, c1, c2) {
    P(c, 0, 236, W, 24, col);
    P(c, 0, 236, W, 2, tepi);
    P(c, 0, 258, W, 2, tepi);
    for (let i = 0; i < 26; i++) {
      const px2 = (i * 41) % W, py2 = 240 + (i * 13) % 16;
      P(c, px2, py2, 3, 2, i % 3 ? c1 : c2);
    }
  }
  function bungaDi(c, w1, w2) {
    for (let i = 0; i < 10; i++) {
      const fx = (i * 89 + 25) % (W - 20) + 10, fy = 214 + (i * 7) % 18;
      P(c, fx, fy, 2, 2, i % 2 ? w1 : w2);
      P(c, fx, fy + 2, 1, 2, '#4fa55e');
    }
  }
  function batuDekor(c) {
    for (let i = 0; i < 5; i++) {
      const bx = 30 + i * 97, by = 226 + (i % 2) * 5;
      lingkaran(c, bx, by, 3, '#9aa6b8');
      P(c, bx - 1, by - 2, 2, 1, '#c3ccda');
    }
  }
  function pohonKecil(c, x, tanahY, s) {
    const r = Math.round(7 * s), tg = Math.round(9 * s);
    P(c, x - 1, tanahY - tg, 3, tg, '#6b4a2c');
    lingkaran(c, x, tanahY - tg - r + 2, r, '#3f8f4f');
    lingkaran(c, x - r * 0.6, tanahY - tg - r + 6, Math.round(r * 0.7), '#357a43');
    lingkaran(c, x + 2, tanahY - tg - r + 1, Math.round(r * 0.55), '#4fa55e');
  }

  function bakarLatar() {
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const c = cv.getContext('2d');

    /* ---- SIANG: jejak pertama, cerah seperti kamp ---- */
    if (TEMA_NAMA === 'siang') {
      P(c, 0, 0, W, 46, '#9fdcf5');
      P(c, 0, 46, W, 42, '#8fd3f0');
      P(c, 0, 88, W, 40, '#a5e0f5');
      P(c, 0, 128, W, 24, '#b7e8f8');
      lingkaran(c, 430, 30, 12, '#ffe9a3');
      lingkaran(c, 430, 30, 9, '#ffd166');
      for (let i = 0; i < 8; i++) {
        const a = i * Math.PI / 4;
        P(c, 430 + Math.round(Math.cos(a) * 15), 30 + Math.round(Math.sin(a) * 15), 2, 2, '#ffe9a3');
      }
      gunungDi(c, 80, 84, 56, 186, '#a9c8e2');
      gunungDi(c, 220, 74, 68, 186, '#98bcd9');
      gunungDi(c, 400, 88, 60, 186, '#a9c8e2');
      P(c, 0, 150, W, 36, '#93bfd8');
      hutanDi(c, '#2f7a44', '#2a6d3c');
      tanah(c, '#7ec850', '#6fb844', '#8fd15c');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
      batuDekor(c);
      bungaDi(c, '#ffb86b', '#f2b8cc');
    }

    /* ---- SENJA: padang gembala, matahari rendah keemasan ---- */
    else if (TEMA_NAMA === 'senja') {
      P(c, 0, 0, W, 40, '#ffd9a3');
      P(c, 0, 40, W, 40, '#ffce94');
      P(c, 0, 80, W, 38, '#f8bf85');
      P(c, 0, 118, W, 32, '#f2b47d');
      lingkaran(c, 392, 126, 16, '#ffb86b');
      lingkaran(c, 392, 126, 12, '#ff9d4a');
      lingkaran(c, 392, 126, 8, '#ffd166');
      gunungDi(c, 80, 92, 56, 186, '#c793a0');
      gunungDi(c, 220, 84, 68, 186, '#b58293');
      gunungDi(c, 400, 96, 60, 186, '#c793a0');
      P(c, 0, 150, W, 36, '#e0ad8e');
      hutanDi(c, '#4a6b3a', '#416030');
      tanah(c, '#95b552', '#83a747', '#a3c463');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
      for (let i = 0; i < 12; i++) {                 // rumput kering bergoyang
        const gx = (i * 71 + 15) % (W - 16) + 8, gy = 214 + (i * 11) % 20;
        P(c, gx, gy, 1, 4, '#c9b060');
        P(c, gx + 1, gy + 1, 1, 3, '#b8a052');
      }
    }

    /* ---- MALAM: Baitul Hikmah, lentera & bintang ---- */
    else if (TEMA_NAMA === 'malam') {
      P(c, 0, 0, W, 50, '#16224a');
      P(c, 0, 50, W, 45, '#1b2a58');
      P(c, 0, 95, W, 40, '#21336a');
      P(c, 0, 135, W, 25, '#283d7a');
      lingkaran(c, 416, 34, 11, '#f2ecd8');          // bulan sabit
      lingkaran(c, 421, 31, 9, '#1b2a58');
      lingkaran(c, 416, 34, 14, 'rgba(242,236,216,.12)');
      for (let i = 0; i < 26; i++) {                 // bintang statis
        const sx = (i * 67 + 13) % (W - 10) + 5, sy = 8 + (i * 23) % 128;
        P(c, sx, sy, i % 4 === 0 ? 2 : 1, i % 4 === 0 ? 2 : 1, i % 3 ? '#fffdf2' : '#cdd9f5');
      }
      gunungDi(c, 80, 92, 56, 186, '#1f2d52');
      gunungDi(c, 220, 84, 68, 186, '#25355e');
      gunungDi(c, 400, 96, 60, 186, '#1f2d52');
      P(c, 0, 150, W, 36, '#2a3a60');
      hutanDi(c, '#1c3a2e', '#183328');
      tanah(c, '#3a7046', '#356641', '#4a8454');
      jalan(c, '#a98f60', '#8f774c', '#a3875a', '#bfa470');
      batuDekor(c);
    }

    /* ---- UNGU: senja angka, langit lavender ---- */
    else if (TEMA_NAMA === 'ungu') {
      P(c, 0, 0, W, 42, '#c9b3ee');
      P(c, 0, 42, W, 42, '#b9a1e6');
      P(c, 0, 84, W, 38, '#a98ddd');
      P(c, 0, 122, W, 28, '#9a7bd6');
      lingkaran(c, 398, 40, 9, '#f2e8ff');
      lingkaran(c, 398, 40, 13, 'rgba(242,232,255,.14)');
      for (let i = 0; i < 16; i++) {
        const sx = (i * 83 + 21) % (W - 10) + 5, sy = 10 + (i * 29) % 110;
        P(c, sx, sy, 1, 1, '#fffdf2');
      }
      gunungDi(c, 80, 90, 56, 186, '#8a76c4');
      gunungDi(c, 220, 80, 68, 186, '#7a66b4');
      gunungDi(c, 400, 94, 60, 186, '#8a76c4');
      P(c, 0, 150, W, 36, '#9484cc');
      hutanDi(c, '#3f6b52', '#365e47');
      tanah(c, '#6fae62', '#61a056', '#82bd72');
      jalan(c, '#c9a763', '#ad8c50', '#b8945a', '#d9bd85');
      bungaDi(c, '#d9c4ff', '#f2b8cc');
    }

    /* ---- GURUN: pasir, dunes, matahari putih menyengat ---- */
    else if (TEMA_NAMA === 'gurun') {
      P(c, 0, 0, W, 44, '#ffe9bb');
      P(c, 0, 44, W, 44, '#ffe0a4');
      P(c, 0, 88, W, 38, '#fbd68f');
      P(c, 0, 126, W, 26, '#f5cc84');
      lingkaran(c, 398, 34, 14, '#fff8e0');
      lingkaran(c, 398, 34, 11, '#fff3cf');
      for (let i = 0; i < 8; i++) {
        const a = i * Math.PI / 4;
        P(c, 398 + Math.round(Math.cos(a) * 18), 34 + Math.round(Math.sin(a) * 18), 2, 2, '#fff8e0');
      }
      gunungDi(c, 80, 100, 66, 186, '#e8cf96');      // gundukan pasir
      gunungDi(c, 230, 88, 76, 186, '#ddc183');
      gunungDi(c, 408, 104, 60, 186, '#e8cf96');
      P(c, 0, 150, W, 36, '#e8cf96');
      tanah(c, '#eed79b', '#e2c98b', '#f5e2ae');
      jalan(c, '#d4b26b', '#bd9c58', '#c9a75e', '#e0c784');
      for (let i = 0; i < 3; i++) {                  // palem kecil
        const px3 = 60 + i * 150;
        P(c, px3, 196, 3, 18, '#8a6a3c');
        P(c, px3 - 6, 194, 6, 2, '#5f8f4f');
        P(c, px3 + 3, 194, 6, 2, '#5f8f4f');
        P(c, px3 - 2, 190, 8, 2, '#6b9f58');
      }
      batuDekor(c);
    }

    /* ---- KOTA: kabut pagi Roma, batu & pilar ---- */
    else if (TEMA_NAMA === 'kota') {
      P(c, 0, 0, W, 46, '#dfe9ee');
      P(c, 0, 46, W, 46, '#d5e2ea');
      P(c, 0, 92, W, 36, '#ccdae4');
      P(c, 0, 128, W, 24, '#c3d2de');
      for (let i = 0; i < 7; i++) {                  // siluet bangunan & pilar
        const bx = 20 + i * 68, bw = 34 + (i % 3) * 10, bh = 40 + (i % 2) * 26;
        P(c, bx, 186 - bh, bw, bh, i % 2 ? '#98a7b6' : '#a9b6c4');
        P(c, bx - 3, 186 - bh - 6, bw + 6, 6, i % 2 ? '#a9b6c4' : '#b5c1cd');
        for (let j = 0; j < 3; j++) P(c, bx + 5 + j * 9, 186 - bh + 8, 3, bh - 14, i % 2 ? '#8a99a8' : '#98a7b6');
      }
      P(c, 0, 150, W, 36, '#b5c1cd');                // kabut
      tanah(c, '#b3bcc7', '#a6b0bc', '#c1cad4');
      jalan(c, '#9fa9b5', '#8d97a3', '#98a2ae', '#b0bac6');
      for (let i = 0; i < 9; i++) {                  // sambungan lempeng batu
        const lx = (i * 53) % W;
        P(c, lx, 240, 1, 16, '#8d97a3');
      }
    }

    /* ---- KAYU: ruang toko abakus, dinding papan hangat ---- */
    else if (TEMA_NAMA === 'kayu') {
      const papan = ['#a8763e', '#9d6f3a', '#936736', '#8a5f32'];
      for (let r = 0; r < 4; r++) {
        P(c, 0, r * 44, W, 44, papan[r]);
        P(c, 0, r * 44, W, 2, '#7a5329');            // garis sambungan
        for (let j = 0; j < 5; j++) P(c, (j * 97 + r * 41) % W, r * 44 + 4, 2, 40, '#8a5f32');
      }
      P(c, 0, 176, W, 10, '#6b4a2c');                // dinding bawah
      P(c, 40, 118, 92, 5, '#7a5329');               // rak kiri
      P(c, 46, 100, 16, 18, '#c98a4b'); P(c, 66, 106, 12, 12, '#8f6238'); P(c, 84, 102, 14, 16, '#b3854a');
      P(c, 348, 118, 92, 5, '#7a5329');              // rak kanan
      P(c, 356, 102, 14, 16, '#b3854a'); P(c, 376, 100, 16, 18, '#c98a4b'); P(c, 398, 108, 12, 10, '#8f6238');
      P(c, 0, 186, W, 84, '#c99a5b');                // lantai papan
      for (let r = 0; r < 6; r++) P(c, 0, 192 + r * 13, W, 2, '#b3854a');
      for (let j = 0; j < 8; j++) P(c, (j * 61 + 20) % W, 192 + (j % 5) * 13, 2, 13, '#b3854a');
      P(c, 0, 236, W, 24, '#d4ab68');                // jalur lantai terang
      P(c, 0, 236, W, 2, '#c09050');
      P(c, 0, 258, W, 2, '#c09050');
    }

    /* ---- PASAR: siang ramai, bendera-bendera kain ---- */
    else if (TEMA_NAMA === 'pasar') {
      P(c, 0, 0, W, 46, '#a8e0f5');
      P(c, 0, 46, W, 42, '#98d8f2');
      P(c, 0, 88, W, 40, '#a8e0f5');
      P(c, 0, 128, W, 24, '#b9e8f8');
      lingkaran(c, 430, 28, 11, '#ffe9a3');
      lingkaran(c, 430, 28, 8, '#ffd166');
      const warnaBendera = ['#63c8ff', '#ffd166', '#ff9d9d', '#7dffa8'];
      for (let i = 0; i <= 16; i++) {                // tali bendera melintang
        const bx2 = i * 30, by2 = 62 + Math.round(Math.sin(i / 16 * Math.PI) * 8);
        if (i < 16) {
          P(c, bx2, by2 + 2, 30, 1, '#8a6a3c');
          P(c, bx2 + 8, by2 + 3, 8, 7, warnaBendera[i % 4]);
          P(c, bx2 + 8, by2 + 10, 8, 2, warnaBendera[i % 4]);
        }
      }
      for (let i = 0; i < 5; i++) {                  // atap tenda jauh
        const tx = 30 + i * 95;
        for (let y = 0; y <= 14; y++) {
          const ww = Math.round(y * 0.9);
          P(c, tx - ww, 172 + y, ww * 2 + 1, 1, i % 2 ? '#c98a4b' : '#b3854a');
        }
      }
      tanah(c, '#d3c08e', '#c4b080', '#e0d0a0');
      jalan(c, '#c9b57e', '#b09a64', '#bfa872', '#d9c68e');
      for (let i = 0; i < 8; i++) {                  // peti & karung pinggir
        const cx2 = (i * 113 + 40) % (W - 30) + 15;
        P(c, cx2, 224, 12, 9, '#a3744a');
        P(c, cx2, 224, 12, 2, '#b58a4a');
      }
    }

    /* ---- MALAM2: malam Pi, cincin lingkaran di langit ---- */
    else if (TEMA_NAMA === 'malam2') {
      P(c, 0, 0, W, 52, '#141c44');
      P(c, 0, 52, W, 46, '#1a2450');
      P(c, 0, 98, W, 38, '#202c5c');
      P(c, 0, 136, W, 24, '#263468');
      for (let i = 0; i < 28; i++) {
        const sx = (i * 61 + 7) % (W - 10) + 5, sy = 8 + (i * 27) % 136;
        P(c, sx, sy, i % 5 === 0 ? 2 : 1, i % 5 === 0 ? 2 : 1, i % 3 ? '#fffdf2' : '#cdd9f5');
      }
      lingkaran(c, 120, 54, 26, 'rgba(205,217,245,.10)');   // cincin lingkaran samar
      lingkaran(c, 120, 54, 22, 'rgba(205,217,245,.06)');
      lingkaran(c, 356, 92, 34, 'rgba(205,217,245,.10)');
      lingkaran(c, 356, 92, 29, 'rgba(205,217,245,.06)');
      gunungDi(c, 80, 92, 56, 186, '#1e2a52');
      gunungDi(c, 220, 84, 68, 186, '#24325c');
      gunungDi(c, 400, 96, 60, 186, '#1e2a52');
      P(c, 0, 150, W, 36, '#2a3864');
      hutanDi(c, '#1c3a2e', '#183328');
      tanah(c, '#3a7046', '#356641', '#4a8454');
      jalan(c, '#a98f60', '#8f774c', '#a3875a', '#bfa470');
      batuDekor(c);
    }

    /* ---- FUTURE: pelabuhan antariksa, planet & grid cahaya ---- */
    else if (TEMA_NAMA === 'future') {
      P(c, 0, 0, W, 52, '#0a1030');
      P(c, 0, 52, W, 48, '#0d1540');
      P(c, 0, 100, W, 40, '#111b52');
      P(c, 0, 140, W, 20, '#152061');
      for (let i = 0; i < 34; i++) {
        const sx = (i * 59 + 11) % (W - 10) + 5, sy = 6 + (i * 31) % 148;
        P(c, sx, sy, i % 6 === 0 ? 2 : 1, i % 6 === 0 ? 2 : 1, i % 3 ? '#fffdf2' : '#8fd0f0');
      }
      lingkaran(c, 64, 8, 24, '#3a6fa8');            // planet di pojok
      lingkaran(c, 58, 2, 18, '#4a7fc0');
      P(c, 44, 16, 40, 3, '#2f5f92');
      gunungDi(c, 140, 108, 80, 186, '#1c2648');     // siluet menara peluncuran
      gunungDi(c, 380, 118, 70, 186, '#1c2648');
      P(c, 300, 150, 8, 36, '#26314f');              // menara gantry
      P(c, 296, 154, 16, 3, '#26314f');
      P(c, 296, 166, 16, 3, '#26314f');
      P(c, 303, 148, 2, 2, '#4fe3c8');
      P(c, 0, 150, W, 36, '#1e2948');
      P(c, 0, 182, W, 88, '#3a4258');                // landasan peluncuran
      for (let r = 0; r < 5; r++) P(c, 0, 190 + r * 16, W, 1, '#2e3648');
      for (let i = 0; i < 12; i++) P(c, (i * 41 + 20) % W, 190 + (i % 4) * 16, 2, 1, '#4fe3c8');
      P(c, 0, 236, W, 24, '#333c50');
      P(c, 0, 236, W, 2, '#454f68');
      P(c, 0, 258, W, 2, '#454f68');
      for (let i = 0; i < 10; i++) P(c, (i * 48 + 24) % W, 244 + (i % 3) * 6, 6, 1, '#4fe3c8');
    }

    /* ---- KAMPUNG: pagi lembut merah muda-mint, kampung sepuluh rumah ---- */
    else if (TEMA_NAMA === 'kampung') {
      P(c, 0, 0, W, 44, '#ffe8e0');
      P(c, 0, 44, W, 44, '#fff2e2');
      P(c, 0, 88, W, 40, '#eafaf0');
      P(c, 0, 128, W, 24, '#dcf4e8');
      lingkaran(c, 76, 30, 12, '#fffdf2');
      lingkaran(c, 76, 30, 9, '#ffeec2');
      const warnaRumah = ['#e8b4b8', '#b8d8e8', '#e8d8a8', '#c8e8c0'];
      for (let i = 0; i < 8; i++) {
        const hx = 10 + i * 62, hw = 38 + (i % 2) * 8, hh = 22 + (i % 3) * 9, hTop = 160 - hh;
        P(c, hx, hTop, hw, hh, warnaRumah[i % 4]);
        for (let y = 0; y < 9; y++) {
          const ww = Math.round((hw + 10) * y / 9);
          P(c, hx + hw / 2 - ww, hTop - 9 + y, ww * 2 + 1, 1, '#9a7a6c');
        }
        P(c, hx + hw / 2 - 3, hTop + hh / 2, 6, 8, '#f8f4ea');
      }
      P(c, 0, 150, W, 36, '#a8d8a0');
      hutanDi(c, '#5fa56e', '#549660');
      tanah(c, '#8fc97e', '#80b970', '#a0d78e');
      jalan(c, '#e3c58c', '#c9a763', '#d9b877', '#f0d8a8');
      bungaDi(c, '#f2b8cc', '#ffd166');
    }

    /* ---- TANGGA: fajar emas, tangga batu memanjat gunung ---- */
    else if (TEMA_NAMA === 'tangga') {
      P(c, 0, 0, W, 40, '#ffdfb0');
      P(c, 0, 40, W, 40, '#ffd9a8');
      P(c, 0, 80, W, 40, '#cfe8f0');
      P(c, 0, 120, W, 32, '#bfe2ee');
      lingkaran(c, 96, 118, 20, '#ffd166');
      lingkaran(c, 96, 118, 15, '#ffe9a3');
      gunungDi(c, 330, 96, 70, 186, '#b8cfde');
      gunungDi(c, 440, 108, 56, 186, '#c6dbe6');
      for (let s = 0; s < 9; s++) {                  // tangga raksasa ke gunung kiri
        const sx = 26 + s * 16, sy = 179 - s * 7, sw = 64 + s * 2;
        P(c, sx, sy, sw, 7, s % 2 ? '#c9b8a0' : '#d4c4ac');
        P(c, sx, sy, sw, 2, '#e4d6c0');
      }
      P(c, 0, 150, W, 36, '#9cc4a8');
      hutanDi(c, '#4a7a56', '#40704c');
      tanah(c, '#8fbf8a', '#7fb07a', '#a0cf98');
      jalan(c, '#d4b890', '#b89a70', '#c8a880', '#e8d0a8');
    }

    /* ---- FAJAR: langit oranye, matahari terbit di bukit luncur ---- */
    else if (TEMA_NAMA === 'fajar') {
      P(c, 0, 0, W, 40, '#ffb87a');
      P(c, 0, 40, W, 44, '#ffa868');
      P(c, 0, 84, W, 40, '#f8a070');
      P(c, 0, 124, W, 26, '#f0b090');
      lingkaran(c, 240, 132, 22, '#ffe9a3');
      lingkaran(c, 240, 132, 16, '#ffd166');
      gunungDi(c, 70, 96, 60, 186, '#c87a5e');
      gunungDi(c, 400, 104, 64, 186, '#d08868');
      for (let y = 0; y <= 34; y++) {                // bukit luncur tengah
        const ww = Math.round(y * 1.4);
        P(c, 200 - ww, 152 + y, ww * 2 + 56, 1, y % 2 ? '#b89060' : '#c09a68');
      }
      P(c, 0, 150, W, 36, '#d8a078');
      tanah(c, '#c9a06a', '#b8905a', '#d9b07a');
      jalan(c, '#b89058', '#9a7846', '#a88650', '#cca870');
      for (let i = 0; i < 10; i++) {
        const gx = (i * 67 + 20) % (W - 16) + 8, gy = 214 + (i * 13) % 18;
        P(c, gx, gy, 1, 4, '#8a7040');
        P(c, gx + 1, gy + 1, 1, 3, '#7a6238');
      }
    }

    /* ---- KAPAL: siang laut teal, layar & ombak dermaga ---- */
    else if (TEMA_NAMA === 'kapal') {
      P(c, 0, 0, W, 46, '#9fe0f8');
      P(c, 0, 46, W, 42, '#8fd8f4');
      P(c, 0, 88, W, 40, '#a8e4f8');
      P(c, 0, 128, W, 24, '#bcecf8');
      lingkaran(c, 430, 30, 11, '#ffe9a3');
      lingkaran(c, 430, 30, 8, '#ffd166');
      P(c, 0, 152, W, 34, '#3aa8c8');
      P(c, 0, 152, W, 2, '#5fc0dc');
      for (let i = 0; i < 12; i++) {                 // ombak bergaris
        const wx = (i * 47 + 10) % W, wy = 158 + (i * 7) % 24;
        P(c, wx, wy, 10, 1, i % 2 ? '#6fd0e8' : '#2f98b8');
      }
      P(c, 92, 150, 24, 4, '#8a5f38');               // kapal layar kecil
      P(c, 92, 150, 24, 1, '#a3744a');
      P(c, 103, 134, 2, 16, '#5f4426');
      for (let y = 0; y < 14; y++) P(c, 105, 135 + y, Math.round(12 * y / 14) + 1, 1, '#fffdf2');
      P(c, 300, 138, 4, 16, '#8a5f38');              // tiang dermaga jauh
      P(c, 380, 142, 4, 12, '#8a5f38');
      P(c, 0, 186, W, 84, '#c9a875');                // lantai dermaga kayu
      for (let r = 0; r < 5; r++) P(c, 0, 192 + r * 16, W, 2, '#b89058');
      P(c, 0, 236, W, 24, '#d9bc88');
      P(c, 0, 236, W, 2, '#b89058');
      P(c, 0, 258, W, 2, '#b89058');
    }

    /* ---- PANGGUNG: malam ungu, tirai merah & sorot lampu ---- */
    else if (TEMA_NAMA === 'panggung') {
      P(c, 0, 0, W, 60, '#2a1a3e');
      P(c, 0, 60, W, 60, '#322050');
      P(c, 0, 120, W, 36, '#3a2860');
      for (let y = 0; y < 150; y++) {                // tirai merah kiri-kanan
        const lk = 34 + Math.round(Math.sin(y * 0.22) * 3);
        P(c, 0, y, lk, 1, '#8a2838');
        P(c, lk - 4, y, 4, 1, '#a83a4a');
        const ln = 34 + Math.round(Math.sin(y * 0.2 + 2) * 3);
        P(c, W - ln, y, ln, 1, '#8a2838');
        P(c, W - ln, y, 4, 1, '#a83a4a');
      }
      P(c, 0, 0, W, 10, '#6a2030');                  // valance
      P(c, 0, 10, W, 3, '#8a2838');
      for (let i = 0; i < 3; i++) {                  // berkas sorot
        const sx = 150 + i * 90;
        for (let y = 0; y < 100; y++) {
          const ww = Math.max(1, Math.round(y * 0.25));
          c.globalAlpha = Math.max(0, 0.16 - y * 0.0012);
          P(c, sx - ww, 14 + y, ww * 2 + 1, 1, '#ffe196');
          c.globalAlpha = 1;
        }
      }
      for (let i = 0; i < 14; i++) P(c, (i * 83 + 30) % W, 18 + (i * 37) % 120, 1, 1, '#b8a8d8');
      P(c, 0, 156, W, 30, '#4a3868');
      P(c, 0, 186, W, 84, '#7a5a48');                // lantai panggung kayu
      for (let r = 0; r < 5; r++) P(c, 0, 192 + r * 16, W, 1, '#6a4c3c');
      P(c, 0, 236, W, 24, '#8a6850');
      P(c, 0, 236, W, 2, '#6a4c3c');
      P(c, 0, 258, W, 2, '#6a4c3c');
    }

    /* ---- JEMUR: siang halaman, pagar kayu & rumah tetangga ---- */
    else if (TEMA_NAMA === 'jemur') {
      P(c, 0, 0, W, 46, '#a8e4f8');
      P(c, 0, 46, W, 42, '#98dcf4');
      P(c, 0, 88, W, 40, '#b0e8f8');
      P(c, 0, 128, W, 24, '#c4f0fc');
      lingkaran(c, 52, 30, 11, '#ffe9a3');
      lingkaran(c, 52, 30, 8, '#ffd166');
      P(c, 250, 108, 120, 78, '#e8d8c0');            // rumah tetangga
      P(c, 250, 108, 120, 4, '#d4c0a8');
      P(c, 262, 122, 18, 16, '#8fd0e8');
      P(c, 292, 122, 18, 16, '#8fd0e8');
      P(c, 322, 122, 18, 16, '#8fd0e8');
      P(c, 352, 128, 10, 20, '#8a5f38');
      P(c, 0, 160, W, 3, '#c9a763');                 // pagar kayu
      P(c, 0, 176, W, 3, '#c9a763');
      for (let i = 0; i < 12; i++) P(c, 8 + i * 42, 156, 6, 30, '#d9b877');
      P(c, 0, 186, W, 84, '#8fc97e');
      tanah(c, '#8fc97e', '#80b970', '#a0d78e');
      jalan(c, '#c9b57e', '#b09a64', '#bfa872', '#d9c68e');
      bungaDi(c, '#f2b8cc', '#ffd166');
    }

    /* ---- TAMAN: sore merah jambu, pohon & lampu taman ---- */
    else if (TEMA_NAMA === 'taman') {
      P(c, 0, 0, W, 42, '#ffb8a0');
      P(c, 0, 42, W, 42, '#f8a890');
      P(c, 0, 84, W, 38, '#e89890');
      P(c, 0, 122, W, 28, '#d88890');
      lingkaran(c, 410, 34, 13, '#ffe9c4');
      lingkaran(c, 410, 34, 10, '#ffd9a3');
      gunungDi(c, 90, 92, 58, 186, '#b87880');
      gunungDi(c, 350, 84, 66, 186, '#c88888');
      P(c, 0, 150, W, 36, '#a87078');
      for (let i = 0; i < 4; i++) pohonKecil(c, 40 + i * 130, 186, 1.1);
      for (let i = 0; i < 3; i++) {                  // lampu taman menyala
        const lx = 90 + i * 150;
        P(c, lx, 168, 2, 18, '#5f6b7c');
        lingkaran(c, lx + 1, 165, 3, '#ffe9a3');
      }
      tanah(c, '#7fae6e', '#719e60', '#8fbe7e');
      jalan(c, '#c9a763', '#ad8c50', '#b8945a', '#d9bd85');
      bungaDi(c, '#f2b8cc', '#d9c4ff');
    }

    /* ---- PERMEN: dinding garis candy & rak toples ---- */
    else if (TEMA_NAMA === 'permen') {
      for (let x2 = 0; x2 < W; x2 += 24) {
        P(c, x2, 0, 12, 90, '#ffd9e0');
        P(c, x2 + 12, 0, 12, 90, '#c9f0e0');
        P(c, x2, 90, 12, 96, '#ffe8f0');
        P(c, x2 + 12, 90, 12, 96, '#d9f4ec');
      }
      P(c, 30, 118, 130, 4, '#b89058');              // rak toples kiri
      for (let i = 0; i < 4; i++) {
        const jx = 42 + i * 30;
        P(c, jx - 7, 108, 14, 10, '#f8e8f0');
        P(c, jx - 7, 108, 14, 3, '#ffd166');
        P(c, jx - 6, 114, 12, 4, i % 2 ? '#ff9d9d' : '#8fd0ff');
      }
      P(c, 320, 118, 130, 4, '#b89058');             // rak toples kanan
      for (let i = 0; i < 4; i++) {
        const jx = 332 + i * 30;
        P(c, jx - 7, 108, 14, 10, '#f8e8f0');
        P(c, jx - 7, 108, 14, 3, '#ffd166');
        P(c, jx - 6, 114, 12, 4, i % 2 ? '#7dffa8' : '#bb8fff');
      }
      P(c, 0, 186, W, 84, '#f8d8c0');                // lantai toko
      for (let r = 0; r < 4; r++) P(c, 0, 196 + r * 22, W, 2, '#e8c0a8');
      P(c, 0, 236, W, 24, '#ffd0d8');
      P(c, 0, 236, W, 2, '#e8b0c0');
      P(c, 0, 258, W, 2, '#e8b0c0');
      for (let i = 0; i < 8; i++) P(c, (i * 61 + 25) % W, 240 + (i % 3) * 8, 3, 3, ['#ff9d9d', '#7dffa8', '#63c8ff'][i % 3]);
    }

    /* ---- LOMBA: siang trek merah bata & tribun pendukung ---- */
    else if (TEMA_NAMA === 'lomba') {
      P(c, 0, 0, W, 46, '#a0dcf8');
      P(c, 0, 46, W, 42, '#90d4f4');
      P(c, 0, 88, W, 40, '#b0e4f8');
      P(c, 0, 128, W, 24, '#c2ecf8');
      lingkaran(c, 428, 28, 11, '#ffe9a3');
      lingkaran(c, 428, 28, 8, '#ffd166');
      for (let r = 0; r < 3; r++) P(c, 30 + r * 8, 150 - r * 12, 150, 12, r % 2 ? '#c8d8e8' : '#d8e4f0');
      const warnaDukung = ['#ff9d9d', '#63c8ff', '#ffd166', '#7dffa8'];
      for (let i = 0; i < 18; i++) P(c, 40 + i * 8, 146 - (i % 3) * 12, 4, 6, warnaDukung[i % 4]);
      P(c, 0, 150, W, 36, '#98c0a0');
      P(c, 0, 186, W, 84, '#c86a4a');                // trek merah bata
      for (let r = 0; r < 4; r++) P(c, 0, 192 + r * 18, W, 1, '#e8907a');
      for (let i = 0; i < 7; i++) P(c, (i * 73 + 30) % W, 190 + (i % 3) * 18, 12, 1, '#f2f2f2');
      P(c, 0, 236, W, 24, '#b85a3e');
      P(c, 0, 236, W, 2, '#984830');
      P(c, 0, 258, W, 2, '#984830');
      for (let i = 0; i < 10; i++) P(c, (i * 49 + 20) % W, 240 + (i % 3) * 8, 4, 4, '#d87a5a');
    }

    /* ---- POLA: malam teal taman batu, kolam & bulan muda ---- */
    else if (TEMA_NAMA === 'pola') {
      P(c, 0, 0, W, 50, '#0c2620');
      P(c, 0, 50, W, 46, '#103430');
      P(c, 0, 96, W, 40, '#154440');
      P(c, 0, 136, W, 24, '#1a5450');
      for (let i = 0; i < 26; i++) {
        const sx = (i * 71 + 9) % (W - 10) + 5, sy = 8 + (i * 27) % 130;
        P(c, sx, sy, i % 5 === 0 ? 2 : 1, i % 5 === 0 ? 2 : 1, i % 3 ? '#fffdf2' : '#a8e8d8');
      }
      lingkaran(c, 416, 36, 10, '#e8fff4');
      lingkaran(c, 421, 32, 8, '#103430');
      P(c, 0, 150, W, 36, '#1a4c46');
      lingkaran(c, 80, 158, 20, '#2a7a6e');          // kolam kecil
      lingkaran(c, 80, 158, 15, '#3a9a84');
      for (let i = 0; i < 5; i++) P(c, 62 + i * 9, 152 + (i % 2) * 7, 6, 1, '#4fc8b0');
      for (let i = 0; i < 6; i++) {                  // batu langkah berpola
        const bx = 150 + i * 28, by = 166 + (i % 2) * 6;
        lingkaran(c, bx, by, 5, i % 2 ? '#3a6a5e' : '#457a6c');
      }
      tanah(c, '#2a6a58', '#245e4e', '#307a64');
      jalan(c, '#4a7a68', '#3a6556', '#446f60', '#5a8f7c');
      for (let i = 0; i < 8; i++) P(c, (i * 55 + 22) % W, 242 + (i % 3) * 6, 5, 1, '#6fbfa8');
    }

    /* ---- PLUS: padang siang, dua jalan menyatu jadi satu ---- */
    else if (TEMA_NAMA === 'plus') {
      P(c, 0, 0, W, 46, '#a8e0f6');
      P(c, 0, 46, W, 42, '#98d8f2');
      P(c, 0, 88, W, 40, '#b2e4f6');
      P(c, 0, 128, W, 24, '#c4ecf8');
      lingkaran(c, 430, 30, 12, '#ffe9a3');
      lingkaran(c, 430, 30, 9, '#ffd166');
      gunungDi(c, 80, 84, 56, 186, '#a9c8e2');
      gunungDi(c, 220, 74, 68, 186, '#98bcd9');
      gunungDi(c, 400, 88, 60, 186, '#a9c8e2');
      P(c, 0, 150, W, 36, '#93bfd8');
      hutanDi(c, '#2f7a44', '#2a6d3c');
      tanah(c, '#7ec850', '#6fb844', '#8fd15c');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
      for (let i = 0; i < 7; i++) {                  // jalan kedua menyatu ke jalan utama
        P(c, 330 + i * 10, 250 - i * 9, 30 - i * 2, 7, i % 2 ? '#e3c58c' : '#d9b877');
      }
      bungaDi(c, '#ffb86b', '#f2b8cc');
    }

    /* ---- PERON: senja, peron kayu keberangkatan & lampu ---- */
    else if (TEMA_NAMA === 'peron') {
      P(c, 0, 0, W, 40, '#ffd9a3');
      P(c, 0, 40, W, 40, '#ffce94');
      P(c, 0, 80, W, 38, '#f8bf85');
      P(c, 0, 118, W, 32, '#f2b47d');
      lingkaran(c, 396, 122, 14, '#ffb86b');
      lingkaran(c, 396, 122, 10, '#ff9d4a');
      gunungDi(c, 80, 90, 56, 176, '#c793a0');
      gunungDi(c, 230, 82, 66, 176, '#b58293');
      P(c, 0, 150, W, 30, '#c99074');
      P(c, 0, 180, W, 90, '#b8834e');                // peron kayu
      for (let r = 0; r < 5; r++) P(c, 0, 188 + r * 17, W, 2, '#a3723f');
      P(c, 0, 180, W, 3, '#e0b070');                 // bibir peron
      P(c, 96, 128, 4, 52, '#5a4a3a');               // tiang lampu peron
      P(c, 88, 122, 20, 6, '#3a3228');
      P(c, 92, 128, 12, 8, '#ffe9a3');
      for (let i = 0; i < 9; i++) P(c, (i * 61 + 18) % W, 196 + (i % 4) * 16, 3, 2, '#8a6a40');
    }

    /* ---- PARADE: siang lapangan hijau, garis baris & bendera kecil ---- */
    else if (TEMA_NAMA === 'parade') {
      P(c, 0, 0, W, 46, '#a0dcf8');
      P(c, 0, 46, W, 42, '#90d4f4');
      P(c, 0, 88, W, 40, '#b0e4f8');
      P(c, 0, 128, W, 24, '#c2ecf8');
      lingkaran(c, 428, 28, 11, '#ffe9a3');
      lingkaran(c, 428, 28, 8, '#ffd166');
      gunungDi(c, 80, 86, 56, 186, '#a9c8e2');
      gunungDi(c, 230, 78, 66, 186, '#98bcd9');
      P(c, 0, 150, W, 36, '#98c0a0');
      tanah(c, '#8cc65a', '#7cb84e', '#9ed46a');
      for (let r = 0; r < 3; r++) {                  // garis putih baris parade
        for (let i = 0; i < 12; i++) P(c, 10 + i * 36, 200 + r * 22, 18, 2, '#f2f8ee');
      }
      P(c, 40, 158, 2, 22, '#8a6a3c');               // dua bendera kecil
      P(c, 42, 158, 10, 6, '#ff9d9d');
      P(c, 388, 154, 2, 24, '#8a6a3c');
      P(c, 390, 154, 10, 6, '#63c8ff');
      for (let i = 0; i < 6; i++) P(c, (i * 77 + 25) % W, 240 + (i % 3) * 8, 3, 3, '#6fae52');
    }

    /* ---- MEJA: ruang makan siang hangat, jendela & meja kayu ---- */
    else if (TEMA_NAMA === 'meja') {
      P(c, 0, 0, W, 60, '#f5d9b0');
      P(c, 0, 60, W, 60, '#f0cf9f');
      P(c, 0, 120, W, 66, '#eac694');
      P(c, 60, 34, 52, 40, '#bfe0f2');               // jendela hangat
      P(c, 60, 34, 52, 2, '#8a5f38');
      P(c, 84, 34, 3, 40, '#8a5f38');
      P(c, 60, 53, 52, 2, '#8a5f38');
      P(c, 300, 34, 52, 40, '#bfe0f2');
      P(c, 300, 34, 52, 2, '#8a5f38');
      P(c, 324, 34, 3, 40, '#8a5f38');
      P(c, 300, 53, 52, 2, '#8a5f38');
      lingkaran(c, 208, 20, 7, '#ffe9a3');           // lampu gantung
      lingkaran(c, 208, 20, 4, '#ffd166');
      P(c, 207, 0, 2, 12, '#8a5f38');
      P(c, 0, 186, W, 30, '#c9a05e');                // bibir meja
      P(c, 0, 186, W, 3, '#e0bd80');
      P(c, 0, 216, W, 54, '#a3763c');                // badan meja kayu
      for (let r = 0; r < 3; r++) P(c, 0, 224 + r * 16, W, 2, '#8a5f30');
      for (let i = 0; i < 6; i++) P(c, (i * 83 + 30) % W, 230 + (i % 3) * 12, 4, 3, '#8a5f30');
    }

    /* ---- SETARA: pagi biru ruang timbangan, jendela & rak ---- */
    else if (TEMA_NAMA === 'setara') {
      P(c, 0, 0, W, 50, '#cfe0f2');
      P(c, 0, 50, W, 50, '#c2d6ec');
      P(c, 0, 100, W, 44, '#b5cbe4');
      P(c, 0, 144, W, 42, '#a8c0dc');
      P(c, 56, 30, 56, 46, '#e8f2fc');               // jendela besar
      P(c, 56, 30, 56, 2, '#7a94b4');
      P(c, 82, 30, 3, 46, '#7a94b4');
      P(c, 56, 52, 56, 2, '#7a94b4');
      lingkaran(c, 306, 44, 10, '#fff3cf');
      lingkaran(c, 306, 44, 7, '#ffe9a3');
      P(c, 286, 96, 90, 3, '#9a7a4a');               // rak
      for (let i = 0; i < 4; i++) {
        P(c, 294 + i * 20, 82 + (i % 2) * 4, 8, 12, '#c9a763');
      }
      P(c, 0, 186, W, 30, '#b0c4dc');                // lantai
      P(c, 0, 186, W, 2, '#9ab0cc');
      P(c, 0, 216, W, 54, '#a4bcc8');
      for (let r = 0; r < 3; r++) P(c, 0, 224 + r * 16, W, 1, '#94acbc');
      for (let i = 0; i < 7; i++) P(c, (i * 67 + 20) % W, 232 + (i % 3) * 10, 3, 2, '#8ca4b8');
    }

    /* ---- TANDUK: padang siang dua tugu tanduk putih di bukit ---- */
    else if (TEMA_NAMA === 'tanduk') {
      P(c, 0, 0, W, 46, '#a8e0f6');
      P(c, 0, 46, W, 42, '#98d8f2');
      P(c, 0, 88, W, 40, '#b2e4f6');
      P(c, 0, 128, W, 24, '#c4ecf8');
      lingkaran(c, 428, 30, 11, '#ffe9a3');
      lingkaran(c, 428, 30, 8, '#ffd166');
      gunungDi(c, 80, 86, 56, 186, '#a0c48a');
      gunungDi(c, 230, 78, 66, 186, '#8fb47a');
      P(c, 148, 128, 3, 14, '#f2f2ee');              // tanduk kiri: dua batang menekuk keluar
      P(c, 144, 124, 4, 4, '#f2f2ee');
      P(c, 140, 120, 4, 4, '#f2f2ee');
      P(c, 151, 124, 4, 4, '#f2f2ee');
      P(c, 155, 120, 4, 4, '#f2f2ee');
      P(c, 322, 124, 3, 16, '#f2f2ee');              // tanduk kanan
      P(c, 318, 120, 4, 4, '#f2f2ee');
      P(c, 314, 116, 4, 4, '#f2f2ee');
      P(c, 325, 120, 4, 4, '#f2f2ee');
      P(c, 329, 116, 4, 4, '#f2f2ee');
      P(c, 0, 150, W, 36, '#90b478');
      tanah(c, '#7cb854', '#6ca848', '#8cc862');
      jalan(c, '#d9c088', '#c2a870', '#c9b076', '#e3cc96');
      bungaDi(c, '#ffd166', '#f2b8cc');
    }

    /* ---- DESA: sore emas, dua rumah kecil & asap dapur ---- */
    else if (TEMA_NAMA === 'desa') {
      P(c, 0, 0, W, 40, '#ffd9a3');
      P(c, 0, 40, W, 40, '#f8cd8f');
      P(c, 0, 80, W, 38, '#f2c17d');
      P(c, 0, 118, W, 32, '#eab66e');
      lingkaran(c, 402, 118, 15, '#ffb86b');
      lingkaran(c, 402, 118, 11, '#ff9d4a');
      P(c, 0, 150, W, 36, '#d9a86a');
      for (const hx of [70, 350]) {                  // dua rumah desa
        P(c, hx, 138, 34, 18, '#f2e4c8');
        for (let i = 0; i < 5; i++) P(c, hx - 2 + i * 8, 130 - Math.abs(i - 2) * 2, 8, 4, '#b87a4a');
        P(c, hx + 13, 146, 8, 10, '#8a5f38');
        P(c, hx + 26, 124, 4, 8, '#8a5f38');
        P(c, hx + 25, 118, 5, 5, 'rgba(255,253,242,.55)');
      }
      tanah(c, '#b0905a', '#a08048', '#c0a068');
      jalan(c, '#e0c890', '#c8ac74', '#d4ba82', '#eed8a8');
      for (let i = 0; i < 10; i++) P(c, (i * 53 + 15) % W, 216 + (i % 3) * 12, 1, 4, '#8a7040');
    }

    /* ---- KUE: toko kue malam, etalase & lampu hangat ---- */
    else if (TEMA_NAMA === 'kue') {
      P(c, 0, 0, W, 70, '#4a3448');
      P(c, 0, 70, W, 60, '#553d52');
      P(c, 0, 130, W, 56, '#5f465c');
      lingkaran(c, 96, 26, 8, '#ffe9a3');            // lampu gantung hangat
      lingkaran(c, 96, 26, 5, '#fff3cf');
      P(c, 95, 0, 2, 18, '#3a2a38');
      lingkaran(c, 336, 22, 8, '#ffe9a3');
      lingkaran(c, 336, 22, 5, '#fff3cf');
      P(c, 335, 0, 2, 14, '#3a2a38');
      P(c, 60, 88, 120, 4, '#6a4a2e');               // etalase kiri: kue-kue kecil
      for (let i = 0; i < 5; i++) {
        P(c, 70 + i * 22, 78, 14, 10, '#f8d8c0');
        lingkaran(c, 77 + i * 22, 78, 7, i % 2 ? '#ff9db8' : '#ffd166');
      }
      P(c, 300, 92, 110, 4, '#6a4a2e');              // etalase kanan
      for (let i = 0; i < 4; i++) {
        P(c, 310 + i * 24, 80, 16, 12, '#f8d8c0');
        lingkaran(c, 318 + i * 24, 80, 8, i % 2 ? '#a8e8d8' : '#ff9db8');
      }
      P(c, 0, 186, W, 30, '#7a5848');                // lantai toko
      P(c, 0, 186, W, 2, '#8f6a56');
      P(c, 0, 216, W, 54, '#684838');
      for (let r = 0; r < 3; r++) P(c, 0, 224 + r * 16, W, 1, '#5a3e30');
      for (let i = 0; i < 8; i++) P(c, (i * 57 + 24) % W, 228 + (i % 3) * 12, 3, 3, ['#ff9db8', '#ffd166', '#a8e8d8'][i % 3]);
    }

    /* ---- MALAMDALAM: malam pekat, jalan berkelok tanpa ujung ---- */
    else if (TEMA_NAMA === 'malamdalam') {
      P(c, 0, 0, W, 50, '#0a1830');
      P(c, 0, 50, W, 46, '#0e2040');
      P(c, 0, 96, W, 40, '#132a4e');
      P(c, 0, 136, W, 24, '#183458');
      for (let i = 0; i < 34; i++) {                 // bintang lebat
        const sx = (i * 61 + 7) % (W - 10) + 5, sy = 6 + (i * 25) % 128;
        P(c, sx, sy, i % 4 === 0 ? 2 : 1, i % 4 === 0 ? 2 : 1, i % 3 ? '#fffdf2' : '#a8c4f0');
      }
      lingkaran(c, 420, 32, 10, '#e8eef8');
      lingkaran(c, 424, 29, 8, '#0e2040');
      gunungDi(c, 80, 94, 56, 186, '#0c1e38');
      gunungDi(c, 230, 84, 68, 186, '#102444');
      P(c, 0, 150, W, 36, '#122440');
      tanah(c, '#1a3048', '#162a40', '#203854');
      for (let i = 0; i < 14; i++) {                 // jalan berkelok ke bukit
        const wx = 150 + Math.round(Math.sin(i * 0.8) * 46) + i * 8;
        P(c, wx, 248 - i * 6, 14, 4, '#2e4462');
      }
      for (let i = 0; i < 6; i++) P(c, (i * 71 + 30) % W, 240 + (i % 3) * 7, 4, 2, '#243c58');
    }

    /* ---- PERPUS: perpustakaan malam, rak buku & lampu baca ---- */
    else if (TEMA_NAMA === 'perpus') {
      P(c, 0, 0, W, 74, '#2e2438');
      P(c, 0, 74, W, 58, '#372c44');
      P(c, 0, 132, W, 54, '#403450');
      P(c, 44, 0, 3, 22, '#8a5f38');                 // lampu baca kiri
      lingkaran(c, 46, 26, 8, '#ffe9a3');
      lingkaran(c, 46, 26, 5, '#fff3cf');
      P(c, 376, 0, 3, 26, '#8a5f38');                // lampu baca kanan
      lingkaran(c, 378, 30, 8, '#ffe9a3');
      lingkaran(c, 378, 30, 5, '#fff3cf');
      P(c, 26, 84, 130, 4, '#5a4028');               // rak kiri: buku warna-warni
      for (let i = 0; i < 9; i++) {
        P(c, 32 + i * 13, 66, 10, 18, ['#c86a4a', '#4a8fc8', '#5aa05a', '#c8a03e', '#8a5fc8'][i % 5]);
      }
      P(c, 300, 88, 130, 4, '#5a4028');              // rak kanan
      for (let i = 0; i < 9; i++) {
        P(c, 306 + i * 13, 68, 10, 20, ['#5aa05a', '#c8a03e', '#c86a4a', '#8a5fc8', '#4a8fc8'][i % 5]);
      }
      P(c, 0, 186, W, 30, '#4a3a52');                // lantai karpet
      P(c, 0, 186, W, 2, '#5a4660');
      P(c, 0, 216, W, 54, '#3a2e44');
      for (let r = 0; r < 3; r++) P(c, 0, 224 + r * 16, W, 1, '#332840');
      for (let i = 0; i < 9; i++) P(c, (i * 51 + 20) % W, 230 + (i % 3) * 12, 3, 2, '#6a5478');
    }

    /* ---- LINGKAR: pagi padang, lingkar pasir besar di tengah ---- */
    else if (TEMA_NAMA === 'lingkar') {
      P(c, 0, 0, W, 46, '#a8e4f8');
      P(c, 0, 46, W, 42, '#98dcf4');
      P(c, 0, 88, W, 40, '#b2ecf8');
      P(c, 0, 128, W, 24, '#c4f2fc');
      lingkaran(c, 430, 30, 12, '#ffe9a3');
      lingkaran(c, 430, 30, 9, '#ffd166');
      gunungDi(c, 80, 86, 56, 186, '#a9c8e2');
      gunungDi(c, 230, 78, 66, 186, '#98bcd9');
      P(c, 0, 150, W, 36, '#93bfd8');
      hutanDi(c, '#2f7a44', '#2a6d3c');
      tanah(c, '#7ec850', '#6fb844', '#8fd15c');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
      lingkaran(c, 240, 244, 44, '#e8d5a8');         // lingkar pasir lebar
      lingkaran(c, 240, 244, 38, '#f2e2b8');
      for (let i = 0; i < 10; i++) P(c, 200 + (i * 17) % 80, 226 + (i % 3) * 9, 2, 1, '#d9c28c');
      bungaDi(c, '#ffb86b', '#f2b8cc');
    }

    /* ---- KELAS: ruang kelas pagi, papan tulis & jendela ---- */
    else if (TEMA_NAMA === 'kelas') {
      P(c, 0, 0, W, 60, '#dff0d8');
      P(c, 0, 60, W, 60, '#d2e8ca');
      P(c, 0, 120, W, 66, '#c4e0ba');
      P(c, 40, 30, 110, 52, '#8fae7a');              // papan tulis besar
      P(c, 44, 34, 102, 44, '#3a5a48');
      P(c, 52, 42, 24, 2, '#c8dcc8'); P(c, 52, 50, 40, 2, '#c8dcc8');
      P(c, 76, 58, 20, 2, '#c8dcc8'); P(c, 104, 42, 30, 2, '#c8dcc8');
      P(c, 320, 26, 48, 38, '#bfe4f2');              // jendela pagi
      P(c, 320, 26, 48, 2, '#8fae7a'); P(c, 342, 26, 3, 38, '#8fae7a'); P(c, 320, 44, 48, 2, '#8fae7a');
      P(c, 0, 186, W, 30, '#c9b98a');
      P(c, 0, 186, W, 2, '#b8a878');
      P(c, 0, 216, W, 54, '#bfae80');
      for (let r = 0; r < 3; r++) P(c, 0, 224 + r * 16, W, 1, '#ac9a6c');
      for (let i = 0; i < 6; i++) P(c, (i * 79 + 30) % W, 230 + (i % 3) * 12, 3, 2, '#9a8a5e');
    }

    /* ---- GUDANG: senja gudang kayu, lampu & peti di rak ---- */
    else if (TEMA_NAMA === 'gudang') {
      P(c, 0, 0, W, 64, '#5a4632');
      P(c, 0, 64, W, 60, '#66523a');
      P(c, 0, 124, W, 62, '#725e42');
      lingkaran(c, 76, 26, 9, '#ffd9a3');            // lampu gantung hangat
      lingkaran(c, 76, 26, 5, '#fff3cf');
      P(c, 75, 0, 2, 17, '#3a2c1e');
      lingkaran(c, 348, 22, 9, '#ffd9a3');
      lingkaran(c, 348, 22, 5, '#fff3cf');
      P(c, 347, 0, 2, 13, '#3a2c1e');
      for (let i = 0; i < 5; i++) {                  // peti di rak jauh
        P(c, 130 + i * 42, 92, 30, 30, '#8a6a44');
        P(c, 130 + i * 42, 92, 30, 3, '#a3825a');
      }
      P(c, 120, 122, 240, 4, '#4a3826');
      P(c, 0, 186, W, 30, '#a3825a');
      for (let r = 0; r < 5; r++) P(c, 0, 192 + r * 16, W, 2, '#8a6a44');
      P(c, 0, 236, W, 24, '#b8945e');
      P(c, 0, 236, W, 2, '#9a7844');
      P(c, 0, 258, W, 2, '#9a7844');
    }

    /* ---- TULIS: malam ruang belajar, jendela bulan & rak buku ---- */
    else if (TEMA_NAMA === 'tulis') {
      P(c, 0, 0, W, 62, '#2a3450');
      P(c, 0, 62, W, 58, '#313c5c');
      P(c, 0, 120, W, 66, '#38446a');
      P(c, 60, 26, 50, 40, '#8fb8d8');               // jendela malam
      lingkaran(c, 92, 40, 6, '#f2ecd8');            // bulan di jendela
      P(c, 60, 26, 50, 2, '#1e2740'); P(c, 84, 26, 3, 40, '#1e2740'); P(c, 60, 45, 50, 2, '#1e2740');
      P(c, 320, 32, 90, 3, '#1e2740');               // rak buku
      for (let i = 0; i < 7; i++) P(c, 326 + i * 12, 16 + (i % 2) * 3, 8, 16, ['#c86a4a', '#4a8fc8', '#5aa05a', '#c8a03e'][i % 4]);
      lingkaran(c, 240, 18, 8, '#ffe9a3');           // lampu belajar
      lingkaran(c, 240, 18, 5, '#fff3cf');
      P(c, 239, 0, 2, 10, '#1e2740');
      P(c, 0, 186, W, 30, '#3c4868');
      P(c, 0, 186, W, 2, '#2e3854');
      P(c, 0, 216, W, 54, '#445078');
      for (let r = 0; r < 3; r++) P(c, 0, 224 + r * 16, W, 1, '#3a4666');
    }

    /* ---- MENARA: fajar, pos hitung kecil di bukit ---- */
    else if (TEMA_NAMA === 'menara') {
      P(c, 0, 0, W, 42, '#ffdfb0');
      P(c, 0, 42, W, 40, '#ffd9a8');
      P(c, 0, 82, W, 38, '#cfe8f0');
      P(c, 0, 120, W, 30, '#bfe2ee');
      lingkaran(c, 90, 116, 18, '#ffd166');
      lingkaran(c, 90, 116, 13, '#ffe9a3');
      gunungDi(c, 340, 92, 66, 186, '#b8cfde');
      P(c, 0, 150, W, 36, '#9cc4a8');
      hutanDi(c, '#4a7a56', '#40704c');
      tanah(c, '#8fbf8a', '#7fb07a', '#a0cf98');
      jalan(c, '#d4b890', '#b89a70', '#c8a880', '#e8d0a8');
      P(c, 402, 128, 34, 30, '#c9b57e');             // pos hitung kecil
      P(c, 399, 122, 40, 6, '#a3875a');
      P(c, 414, 142, 10, 10, '#5f4426');
      P(c, 402, 138, 26, 2, '#8a6a3c');
    }

    /* ---- PIKNIK: sore padang, alas kotak-kotak di rumput ---- */
    else if (TEMA_NAMA === 'piknik') {
      P(c, 0, 0, W, 40, '#ffd9a3');
      P(c, 0, 40, W, 40, '#ffce94');
      P(c, 0, 80, W, 38, '#f8bf85');
      P(c, 0, 118, W, 32, '#f2b47d');
      lingkaran(c, 396, 122, 14, '#ffb86b');
      lingkaran(c, 396, 122, 10, '#ff9d4a');
      gunungDi(c, 90, 92, 56, 186, '#c793a0');
      gunungDi(c, 350, 84, 62, 186, '#b58293');
      P(c, 0, 150, W, 36, '#e0ad8e');
      hutanDi(c, '#4a6b3a', '#416030');
      tanah(c, '#95b552', '#83a747', '#a3c463');
      for (let r = 0; r < 3; r++) {                  // alas piknik kotak-kotak
        for (let i = 0; i < 9; i++)
          P(c, 120 + i * 26 + r * 8, 226 + r * 12, 13, 5, (i + r) % 2 ? '#e86a5a' : '#fffdf2');
      }
      for (let i = 0; i < 9; i++) P(c, (i * 61 + 15) % W, 214 + (i % 3) * 6, 1, 4, '#c9b060');
    }

    /* ---- KANTOR: malam kantor hitung, lampu minyak & arsip ---- */
    else if (TEMA_NAMA === 'kantor') {
      P(c, 0, 0, W, 58, '#4a3a2e');
      P(c, 0, 58, W, 60, '#54423a');
      P(c, 0, 118, W, 68, '#5e4a42');
      for (let i = 0; i < 3; i++) {                  // lampu minyak gantung
        const lx = 90 + i * 150;
        P(c, lx, 0, 2, 20, '#2e241c');
        lingkaran(c, lx + 1, 26, 8, '#ffd166');
        lingkaran(c, lx + 1, 26, 5, '#fff3cf');
      }
      P(c, 40, 84, 120, 4, '#3a2c20');               // rak arsip kiri
      for (let i = 0; i < 8; i++) P(c, 46 + i * 14, 68 + (i % 2) * 4, 10, 16, i % 2 ? '#c9a763' : '#a3875a');
      P(c, 310, 84, 120, 4, '#3a2c20');              // rak arsip kanan
      for (let i = 0; i < 8; i++) P(c, 316 + i * 14, 68 + (i % 2) * 4, 10, 16, i % 2 ? '#a3875a' : '#c9a763');
      P(c, 0, 186, W, 30, '#6a5648');
      P(c, 0, 186, W, 2, '#58463a');
      P(c, 0, 216, W, 54, '#7a6250');
      for (let r = 0; r < 3; r++) P(c, 0, 224 + r * 16, W, 1, '#685444');
      for (let i = 0; i < 6; i++) P(c, (i * 87 + 22) % W, 232 + (i % 3) * 10, 4, 2, '#58463a');
    }

    /* ---- TETANGGA: sore kampung, dua rumah berjiranan ---- */
    else if (TEMA_NAMA === 'tetangga') {
      P(c, 0, 0, W, 40, '#ffd9a3');
      P(c, 0, 40, W, 40, '#f8cd8f');
      P(c, 0, 80, W, 38, '#f2c17d');
      P(c, 0, 118, W, 32, '#eab66e');
      lingkaran(c, 60, 112, 13, '#ffb86b');
      lingkaran(c, 60, 112, 9, '#ff9d4a');
      P(c, 0, 150, W, 36, '#d9a86a');
      for (const hx of [96, 300]) {                  // dua rumah tetangga
        P(c, hx, 134, 40, 22, '#f2e4c8');
        for (let i = 0; i < 5; i++) P(c, hx - 3 + i * 9, 126 - Math.abs(i - 2) * 3, 9, 5, '#b87a4a');
        P(c, hx + 15, 144, 9, 12, '#8a5f38');
        P(c, hx + 31, 118, 4, 10, '#8a5f38');
        P(c, hx + 30, 112, 5, 5, 'rgba(255,253,242,.55)');
      }
      tanah(c, '#b0905a', '#a08048', '#c0a068');
      jalan(c, '#e0c890', '#c8ac74', '#d4ba82', '#eed8a8');
      for (let i = 0; i < 8; i++) P(c, (i * 59 + 20) % W, 218 + (i % 3) * 12, 1, 4, '#8a7040');
    }

    /* ---- TERAS: pagi teras kayu, tiang & pot bunga ---- */
    else if (TEMA_NAMA === 'teras') {
      P(c, 0, 0, W, 70, '#ffe8d0');
      P(c, 0, 70, W, 60, '#f8dcc0');
      P(c, 0, 130, W, 56, '#f0d0b0');
      P(c, 0, 0, W, 6, '#8a5f38');                   // balok atas
      P(c, 30, 0, 8, 70, '#a3744a');                 // tiang kiri
      P(c, 442, 0, 8, 70, '#a3744a');                // tiang kanan
      P(c, 60, 92, 110, 3, '#8a5f38');               // rak pot bunga kiri
      for (let i = 0; i < 4; i++) {
        P(c, 70 + i * 26, 82, 14, 10, i % 2 ? '#e86a5a' : '#ffd166');
        lingkaran(c, 77 + i * 26, 80, 5, i % 2 ? '#ff9d9d' : '#f2b8cc');
      }
      P(c, 330, 90, 90, 3, '#8a5f38');               // rak pot bunga kanan
      for (let i = 0; i < 3; i++) P(c, 344 + i * 26, 80, 14, 10, i % 2 ? '#ffd166' : '#e86a5a');
      P(c, 0, 186, W, 84, '#c98a4b');                // lantai kayu teras
      for (let r = 0; r < 6; r++) P(c, 0, 192 + r * 14, W, 2, '#b8763c');
      P(c, 0, 236, W, 24, '#d9a05e');
      P(c, 0, 236, W, 2, '#b8763c');
      P(c, 0, 258, W, 2, '#b8763c');
    }

    /* ---- LAYANG: siang bukit berangin, garis angin di langit ---- */
    else if (TEMA_NAMA === 'layang') {
      P(c, 0, 0, W, 46, '#a8e0f8');
      P(c, 0, 46, W, 42, '#98d8f2');
      P(c, 0, 88, W, 40, '#b2e4f8');
      P(c, 0, 128, W, 24, '#c4ecf8');
      lingkaran(c, 430, 30, 12, '#ffe9a3');
      lingkaran(c, 430, 30, 9, '#ffd166');
      for (let i = 0; i < 6; i++) {                  // garis angin berkelok
        const wx = 30 + i * 80, wy = 60 + (i % 3) * 26;
        P(c, wx, wy, 22, 2, 'rgba(255,253,242,.5)');
        P(c, wx + 22, wy + 2, 10, 2, 'rgba(255,253,242,.35)');
      }
      gunungDi(c, 90, 96, 60, 186, '#a9c8e2');
      gunungDi(c, 380, 104, 56, 186, '#b8d4e2');
      P(c, 0, 150, W, 36, '#98c8a0');
      hutanDi(c, '#3f8f52', '#367f48');
      tanah(c, '#8cc85e', '#7cb850', '#9cd86e');
      jalan(c, '#d9c088', '#c2a870', '#c9b076', '#e3cc96');
    }

    /* ---- BERBAGI: sore halaman, bangku panjang dua sisi ---- */
    else if (TEMA_NAMA === 'berbagi') {
      P(c, 0, 0, W, 42, '#ffd9c4');
      P(c, 0, 42, W, 40, '#f8c8b0');
      P(c, 0, 82, W, 38, '#f0bca4');
      P(c, 0, 120, W, 30, '#e8b09c');
      lingkaran(c, 410, 116, 14, '#ffb86b');
      lingkaran(c, 410, 116, 10, '#ff9d4a');
      gunungDi(c, 80, 90, 56, 186, '#c88a90');
      P(c, 0, 150, W, 36, '#c89888');
      hutanDi(c, '#5a7a48', '#4f6c40');
      tanah(c, '#a8c070', '#98b060', '#b8d080');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
      P(c, 40, 176, 90, 4, '#a3744a');               // bangku panjang kiri
      P(c, 44, 180, 4, 10, '#8a5f38'); P(c, 122, 180, 4, 10, '#8a5f38');
      P(c, 360, 174, 90, 4, '#a3744a');              // bangku panjang kanan
      P(c, 364, 178, 4, 10, '#8a5f38'); P(c, 442, 178, 4, 10, '#8a5f38');
      for (let i = 0; i < 8; i++) P(c, (i * 67 + 30) % W, 216 + (i % 3) * 12, 1, 4, '#8a7040');
    }

    /* ---- MISTERI: malam berkahut, bulan redup & jalan detektif ---- */
    else if (TEMA_NAMA === 'misteri') {
      P(c, 0, 0, W, 52, '#141a34');
      P(c, 0, 52, W, 48, '#182042');
      P(c, 0, 100, W, 40, '#1c2650');
      P(c, 0, 140, W, 20, '#202c58');
      for (let i = 0; i < 22; i++) {
        const sx = (i * 73 + 11) % (W - 10) + 5, sy = 8 + (i * 29) % 120;
        P(c, sx, sy, i % 5 === 0 ? 2 : 1, i % 5 === 0 ? 2 : 1, i % 3 ? '#fffdf2' : '#cdd9f5');
      }
      lingkaran(c, 424, 32, 15, 'rgba(232,238,248,.10)');  // bulan berkabut
      lingkaran(c, 424, 32, 10, '#e8eef8');
      gunungDi(c, 120, 100, 62, 186, '#182244');
      gunungDi(c, 360, 108, 58, 186, '#1a2650');
      P(c, 0, 150, W, 36, '#26325c');
      for (let i = 0; i < 9; i++) P(c, (i * 53 + 15) % W, 152 + (i % 3) * 8, 26, 2, 'rgba(255,253,242,.08)');
      tanah(c, '#223058', '#1c2a4e', '#2a3a66');
      jalan(c, '#3a4a78', '#324068', '#384872', '#465684');
      for (let i = 0; i < 7; i++) P(c, (i * 71 + 25) % W, 240 + (i % 3) * 8, 4, 2, '#2c3c64');
    }

    /* ---- BARISAN: fajar padang latihan, garis baris di rumput ---- */
    else if (TEMA_NAMA === 'barisan') {
      P(c, 0, 0, W, 44, '#ffe9c4');
      P(c, 0, 44, W, 42, '#ffd9a8');
      P(c, 0, 86, W, 38, '#f8c98f');
      P(c, 0, 124, W, 28, '#f2bd80');
      lingkaran(c, 90, 118, 14, '#ffb86b');
      lingkaran(c, 90, 118, 10, '#ff9d4a');
      gunungDi(c, 200, 90, 58, 186, '#d8a088');
      gunungDi(c, 380, 100, 54, 186, '#c89080');
      P(c, 0, 150, W, 36, '#c8a878');
      hutanDi(c, '#5a8f4a', '#4f8040');
      tanah(c, '#96c45e', '#86b452', '#a6d46e');
      jalan(c, '#d9bd85', '#c2a56e', '#c9ad74', '#e3cd96');
      for (let r = 0; r < 3; r++) {                  // garis baris latihan
        P(c, 40 + r * 14, 196 + r * 16, W - 90, 1, 'rgba(255,253,242,.28)');
        for (let i = 0; i < 9; i++) P(c, 46 + i * 44, 196 + r * 16, 6, 1, 'rgba(255,253,242,.5)');
      }
    }

    /* ---- PASANGAN: malam jalan lentera, tiang berpasangan ---- */
    else if (TEMA_NAMA === 'pasangan') {
      P(c, 0, 0, W, 50, '#131c3c');
      P(c, 0, 50, W, 46, '#172448');
      P(c, 0, 96, W, 40, '#1c2c54');
      P(c, 0, 136, W, 22, '#223460');
      for (let i = 0; i < 24; i++) {
        const sx = (i * 71 + 9) % (W - 10) + 5, sy = 8 + (i * 27) % 126;
        P(c, sx, sy, i % 4 === 0 ? 2 : 1, i % 4 === 0 ? 2 : 1, i % 3 ? '#fffdf2' : '#cdd9f5');
      }
      lingkaran(c, 418, 32, 10, '#f2ecd8');
      lingkaran(c, 423, 29, 8, '#172448');
      gunungDi(c, 100, 96, 60, 186, '#182850');
      gunungDi(c, 350, 104, 56, 186, '#1a2c54');
      P(c, 0, 150, W, 36, '#26365e');
      for (let i = 0; i < 4; i++) {                  // tiang lampu jauh berpasangan
        const lx = 60 + i * 118;
        P(c, lx, 156, 2, 26, '#3a4a78');
        lingkaran(c, lx - 3, 154, 2, '#ffd166');
        lingkaran(c, lx + 5, 154, 2, '#ffd166');
      }
      hutanDi(c, '#1a352c', '#162e26');
      tanah(c, '#32603e', '#2c5638', '#3d7048');
      jalan(c, '#a98f60', '#8f774c', '#a3875a', '#bfa470');
    }

    /* ---- LIMA: sore taman bunga, kelopak lima di rumput ---- */
    else if (TEMA_NAMA === 'lima') {
      P(c, 0, 0, W, 42, '#ffd9c4');
      P(c, 0, 42, W, 40, '#f8c8b0');
      P(c, 0, 82, W, 38, '#f0bc9e');
      P(c, 0, 120, W, 30, '#e8b08e');
      lingkaran(c, 402, 114, 14, '#ffb86b');
      lingkaran(c, 402, 114, 10, '#ff9d4a');
      gunungDi(c, 90, 88, 56, 186, '#c89090');
      gunungDi(c, 330, 96, 60, 186, '#b88286');
      P(c, 0, 150, W, 36, '#c89888');
      hutanDi(c, '#4f8f4a', '#457f40');
      tanah(c, '#a0c860', '#90b854', '#b0d870');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
      for (let i = 0; i < 6; i++) {                  // bunga kelopak lima kecil
        const fx = 34 + i * 74, fy = 200 + (i % 3) * 14;
        for (let p = 0; p < 5; p++) {
          const a = p * Math.PI * 2 / 5 - Math.PI / 2;
          P(c, fx + Math.round(Math.cos(a) * 4), fy + Math.round(Math.sin(a) * 4), 2, 2, '#f2b8cc');
        }
        P(c, fx, fy, 2, 2, '#ffd166');
      }
    }

    /* ---- STASIUN: malam stasiun kereta, rel & peron ---- */
    else if (TEMA_NAMA === 'stasiun') {
      P(c, 0, 0, W, 48, '#121a38');
      P(c, 0, 48, W, 44, '#162244');
      P(c, 0, 92, W, 40, '#1b2a50');
      P(c, 0, 132, W, 22, '#213258');
      for (let i = 0; i < 22; i++) {
        const sx = (i * 79 + 15) % (W - 10) + 5, sy = 8 + (i * 31) % 122;
        P(c, sx, sy, i % 5 === 0 ? 2 : 1, i % 5 === 0 ? 2 : 1, i % 3 ? '#fffdf2' : '#cdd9f5');
      }
      lingkaran(c, 60, 30, 9, '#f2ecd8');
      lingkaran(c, 65, 27, 7, '#162244');
      P(c, 0, 150, W, 36, '#2a3a60');
      P(c, 0, 158, W, 2, '#5a6a94');                 // rel di kejauhan
      P(c, 0, 166, W, 2, '#5a6a94');
      for (let i = 0; i < 15; i++) P(c, 8 + i * 32, 160, 12, 2, '#3a4a78');
      for (let i = 0; i < 5; i++) {                  // lampu peron
        const lx = 40 + i * 100;
        P(c, lx, 172, 2, 14, '#3a4a78');
        lingkaran(c, lx + 1, 170, 2.4, '#ffd166');
      }
      tanah(c, '#32603e', '#2c5638', '#3d7048');
      jalan(c, '#a98f60', '#8f774c', '#a3875a', '#bfa470');
    }

    /* ---- BENGKEL: pagi bengkel kayu, jendela cahaya & rak alat ---- */
    else if (TEMA_NAMA === 'bengkel') {
      P(c, 0, 0, W, 52, '#c89868');
      P(c, 0, 52, W, 48, '#bd8c5c');
      P(c, 0, 100, W, 44, '#b28252');
      P(c, 0, 144, W, 38, '#a87848');
      for (let i = 0; i < 3; i++) {                  // jendela pagi
        const wx = 56 + i * 150;
        P(c, wx, 58, 52, 42, '#8a6a44');
        P(c, wx + 4, 62, 44, 34, '#bfe4f5');
        P(c, wx + 4, 62, 44, 12, '#d8f0fa');
        P(c, wx + 24, 62, 3, 34, '#8a6a44');
        P(c, wx + 4, 76, 44, 3, '#8a6a44');
      }
      P(c, 0, 148, W, 4, '#8a6a44');                 // garis dinding
      for (let i = 0; i < 8; i++) P(c, (i * 61 + 23) % W, 30 + (i % 3) * 8, 10, 2, '#8a6a44');
      tanah(c, '#a8845c', '#98764e', '#b8946a');
      jalan(c, '#c9a763', '#ad8c50', '#b8945a', '#d9bd85');
    }

    /* ---- TEBING: senja tebing pendakian, jalur zigzag ---- */
    else if (TEMA_NAMA === 'tebing') {
      P(c, 0, 0, W, 42, '#ffd9a8');
      P(c, 0, 42, W, 40, '#fccd94');
      P(c, 0, 82, W, 38, '#f4bd82');
      P(c, 0, 120, W, 30, '#ecb072');
      lingkaran(c, 396, 110, 14, '#ffb86b');
      lingkaran(c, 396, 110, 10, '#ff9d4a');
      P(c, 40, 66, 120, 120, '#b08060');             // tebing kiri
      P(c, 48, 78, 104, 10, '#c09070');
      P(c, 48, 104, 88, 10, '#c09070');
      P(c, 48, 130, 72, 10, '#c09070');
      P(c, 330, 84, 110, 102, '#a87858');            // tebing kanan
      P(c, 340, 96, 92, 10, '#ba8a68');
      P(c, 340, 122, 76, 10, '#ba8a68');
      P(c, 0, 150, W, 36, '#c09878');
      tanah(c, '#c8a068', '#b89058', '#d8b078');
      jalan(c, '#d9bd85', '#c2a56e', '#c9ad74', '#e3cd96');
      for (let i = 0; i < 8; i++) P(c, (i * 67 + 21) % W, 218 + (i % 3) * 10, 3, 2, '#8a7048');
    }

    /* ---- KEMAH: malam api unggun, tenda & kunang ---- */
    else if (TEMA_NAMA === 'kemah') {
      P(c, 0, 0, W, 50, '#101a34');
      P(c, 0, 50, W, 46, '#14203c');
      P(c, 0, 96, W, 40, '#182646');
      P(c, 0, 136, W, 22, '#1d2c4e');
      for (let i = 0; i < 20; i++) {
        const sx = (i * 83 + 12) % (W - 10) + 5, sy = 8 + (i * 29) % 120;
        P(c, sx, sy, i % 4 === 0 ? 2 : 1, i % 4 === 0 ? 2 : 1, i % 3 ? '#fffdf2' : '#cdd9f5');
      }
      gunungDi(c, 90, 94, 62, 186, '#152242');
      gunungDi(c, 360, 102, 56, 186, '#182648');
      for (let i = 0; i < 6; i++) {                  // siluet pohon
        const tx = 24 + i * 88;
        P(c, tx, 168, 3, 16, '#0e1a30');
        P(c, tx - 6, 156, 15, 12, '#0e1a30');
        P(c, tx - 3, 146, 9, 10, '#122140');
      }
      P(c, 0, 150, W, 36, '#1e3050');
      P(c, 330, 172, 34, 20, '#26365c');             // tenda kecil di kejauhan
      P(c, 344, 162, 6, 30, '#26365c');
      P(c, 337, 184, 20, 8, '#101a34');
      tanah(c, '#2c5238', '#264a32', '#376044');
      jalan(c, '#a98f60', '#8f774c', '#a3875a', '#bfa470');
      for (let i = 0; i < 6; i++) P(c, (i * 77 + 33) % W, 190 + (i % 3) * 14, 1, 1, '#ffe9a3');
    }

    /* ---- TERANG: pagi ruang belajar terang, jendela lebar ---- */
    else if (TEMA_NAMA === 'terang') {
      P(c, 0, 0, W, 54, '#f2e8d4');
      P(c, 0, 54, W, 48, '#ecdec4');
      P(c, 0, 102, W, 44, '#e4d4ba');
      P(c, 0, 146, W, 36, '#dcccb0');
      for (let i = 0; i < 2; i++) {                  // jendela pagi lebar
        const wx = 90 + i * 210;
        P(c, wx, 52, 90, 54, '#c8b088');
        P(c, wx + 5, 57, 80, 44, '#c8ecf8');
        P(c, wx + 5, 57, 80, 16, '#e2f5fb');
        P(c, wx + 42, 57, 3, 44, '#c8b088');
        P(c, wx + 5, 76, 80, 3, '#c8b088');
      }
      P(c, 0, 150, W, 4, '#c8b088');
      tanah(c, '#d8c8a8', '#ccbc9a', '#e2d4b6');
      jalan(c, '#c9a763', '#ad8c50', '#b8945a', '#d9bd85');
    }

    /* ---- BAZAR: siang halaman bazar, kanopi warna-warni ---- */
    else if (TEMA_NAMA === 'bazar') {
      P(c, 0, 0, W, 46, '#9fdcf5');
      P(c, 0, 46, W, 42, '#8fd3f0');
      P(c, 0, 88, W, 40, '#a5e0f5');
      P(c, 0, 128, W, 24, '#b7e8f8');
      lingkaran(c, 430, 30, 12, '#ffe9a3');
      lingkaran(c, 430, 30, 9, '#ffd166');
      P(c, 0, 150, W, 36, '#b8a888');
      for (let i = 0; i < 4; i++) {                  // kanopi bazar bergaris
        const kx = 24 + i * 118;
        P(c, kx, 140, 92, 16, i % 2 ? '#d86a6a' : '#4aa8a0');
        for (let s = 0; s < 5; s++) P(c, kx + s * 19, 140, 10, 16, i % 2 ? '#f0a0a0' : '#7cc8c0');
        P(c, kx + 6, 156, 3, 30, '#8a6a44');
        P(c, kx + 82, 156, 3, 30, '#8a6a44');
      }
      tanah(c, '#a8b068', '#98a058', '#b8c078');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
    }

    /* ---- WARUNG: senja warung kue, lampu gantung hangat ---- */
    else if (TEMA_NAMA === 'warung') {
      P(c, 0, 0, W, 42, '#ffd9a8');
      P(c, 0, 42, W, 40, '#fccd94');
      P(c, 0, 82, W, 38, '#f4bd82');
      P(c, 0, 120, W, 30, '#ecb072');
      lingkaran(c, 90, 112, 13, '#ffb86b');
      lingkaran(c, 90, 112, 9, '#ff9d4a');
      P(c, 250, 84, 160, 68, '#a87848');             // bangunan warung
      P(c, 250, 84, 160, 10, '#8a6238');
      P(c, 262, 108, 40, 30, '#5f4426');             // jendela
      P(c, 262, 108, 40, 30, 'rgba(255,209,102,.35)');
      P(c, 330, 104, 56, 40, '#5f4426');             // etalase
      P(c, 333, 107, 50, 34, '#ffd9a3');
      P(c, 348, 142, 14, 10, '#5f4426');             // pintu
      P(c, 0, 150, W, 36, '#c09878');
      for (let i = 0; i < 3; i++) {                  // lampu gantung
        const lx = 280 + i * 34;
        P(c, lx, 152, 1, 8, '#5f4426');
        lingkaran(c, lx, 163, 3, '#ffd166');
      }
      tanah(c, '#b89868', '#a88858', '#c8a878');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
    }

    /* ---- LORONG: malam lorong tangga, lampu dinding berderet ---- */
    else if (TEMA_NAMA === 'lorong') {
      P(c, 0, 0, W, 52, '#141c3a');
      P(c, 0, 52, W, 48, '#182246');
      P(c, 0, 100, W, 44, '#1c2850');
      P(c, 0, 144, W, 38, '#202e56');
      P(c, 0, 148, W, 4, '#2a3a68');                 // railing atas
      for (let i = 0; i < 8; i++) {                  // lampu dinding menyala
        const lx = 30 + i * 60;
        P(c, lx, 160, 8, 10, '#2a3a68');
        lingkaran(c, lx + 4, 165, 3, '#ffd166');
        P(c, lx + 3, 170, 3, 12, 'rgba(255,209,102,.18)');
      }
      P(c, 300, 170, 180, 6, '#26365e');              // tangga siluet
      tanah(c, '#26365c', '#203052', '#2d3f68');
      jalan(c, '#3a4a78', '#324068', '#384872', '#465684');
      for (let i = 0; i < 7; i++) P(c, (i * 71 + 25) % W, 240 + (i % 3) * 8, 4, 2, '#2c3c64');
    }

    /* ---- ARENA: malam turnamen obor, tribun gelap ---- */
    else if (TEMA_NAMA === 'arena') {
      P(c, 0, 0, W, 50, '#101830');
      P(c, 0, 50, W, 46, '#141e3a');
      P(c, 0, 96, W, 40, '#182444');
      P(c, 0, 136, W, 22, '#1c2a4c');
      for (let i = 0; i < 18; i++) {
        const sx = (i * 89 + 17) % (W - 10) + 5, sy = 8 + (i * 33) % 118;
        P(c, sx, sy, i % 4 === 0 ? 2 : 1, i % 4 === 0 ? 2 : 1, i % 3 ? '#fffdf2' : '#cdd9f5');
      }
      P(c, 0, 150, W, 36, '#243458');
      P(c, 20, 150, 100, 4, '#32426a');              // tribun bertingkat
      P(c, 12, 144, 116, 6, '#32426a');
      P(c, 360, 150, 100, 4, '#32426a');
      P(c, 352, 144, 116, 6, '#32426a');
      for (let i = 0; i < 4; i++) {                  // obor di kejauhan
        const ox = 150 + i * 60;
        P(c, ox, 158, 2, 16, '#5f4426');
        lingkaran(c, ox + 1, 154, 3, '#ffd166');
        P(c, ox, 148, 3, 5, 'rgba(255,209,102,.25)');
      }
      tanah(c, '#2c4a48', '#264240', '#376058');
      jalan(c, '#a98f60', '#8f774c', '#a3875a', '#bfa470');
    }

    /* ---- DAPUR: siang dapur keluarga, jendela & rak toples ---- */
    else if (TEMA_NAMA === 'dapur') {
      P(c, 0, 0, W, 46, '#f8ead6');
      P(c, 0, 46, W, 46, '#f2e0c6');
      P(c, 0, 92, W, 42, '#ecd6b6');
      P(c, 0, 134, W, 48, '#e4ccaa');
      for (let i = 0; i < 2; i++) {
        const wx = 70 + i * 230;
        P(c, wx, 54, 64, 46, '#c9a97e');
        P(c, wx + 5, 59, 54, 36, '#bfe4f5');
        P(c, wx + 5, 59, 54, 12, '#d8f0fa');
        P(c, wx + 30, 59, 3, 36, '#c9a97e');
        P(c, wx + 5, 75, 54, 3, '#c9a97e');
      }
      P(c, 26, 118, 130, 4, '#a8825a');              // rak toples kiri
      for (let j = 0; j < 3; j++) {
        const jx = 40 + j * 38;
        P(c, jx, 102, 22, 16, j % 2 ? '#d8e8f8' : '#f8e2c8');
        P(c, jx + 4, 98, 14, 4, '#a8825a');
        P(c, jx + 6, 106, 4, 10, j % 2 ? '#ffd166' : '#ff9d9d');
      }
      P(c, 322, 118, 130, 4, '#a8825a');             // rak teko kanan
      P(c, 352, 104, 26, 14, '#e8b06a');
      P(c, 356, 100, 10, 4, '#a8825a');
      P(c, 380, 108, 14, 10, '#d8e8f8');
      P(c, 384, 104, 8, 4, '#a8825a');
      P(c, 0, 178, W, 4, '#c9a97e');
      tanah(c, '#e0c9a0', '#d4bd92', '#ead6b2');
      jalan(c, '#c9a763', '#ad8c50', '#b8945a', '#d9bd85');
      for (let i = 0; i < 10; i++) P(c, (i * 47) % W, 186 + (i % 3) * 14, 1, 12, '#d4bd92');
    }

    /* ---- ULTAH: sore pesta ulang tahun, bendera segitiga ---- */
    else if (TEMA_NAMA === 'ultah') {
      P(c, 0, 0, W, 42, '#ffd9a8');
      P(c, 0, 42, W, 40, '#fccd94');
      P(c, 0, 82, W, 38, '#f8c288');
      P(c, 0, 120, W, 30, '#f2b87e');
      lingkaran(c, 88, 104, 13, '#ffb86b');
      lingkaran(c, 88, 104, 9, '#ff9d4a');
      const wUlt = ['#ff9d9d', '#ffd166', '#7dffa8', '#63c8ff'];
      for (let i = 0; i <= 14; i++) {
        const bx = i * 34, by = 60 + Math.round(Math.sin(i / 14 * Math.PI) * 10);
        if (i < 14) {
          P(c, bx, by + 2, 34, 1, '#8a6a44');
          P(c, bx + 10, by + 3, 14, 8, wUlt[i % 4]);
          P(c, bx + 13, by + 11, 8, 4, wUlt[i % 4]);
        }
      }
      for (let i = 0; i < 3; i++) {
        const lx = 330 + i * 40, ly = 96 + (i % 2) * 26;
        lingkaran(c, lx, ly, 7, wUlt[(i + 1) % 4]);
        P(c, lx, ly + 7, 1, 14, '#a8825a');
      }
      P(c, 0, 150, W, 36, '#e0ad8e');
      tanah(c, '#95b552', '#83a747', '#a3c463');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
      bungaDi(c, '#f2b8cc', '#ffd166');
    }

    /* ---- RESEP: malam ruang buku resep, rak & lilin ---- */
    else if (TEMA_NAMA === 'resep') {
      P(c, 0, 0, W, 50, '#1c2440');
      P(c, 0, 50, W, 46, '#212a4a');
      P(c, 0, 96, W, 42, '#263154');
      P(c, 0, 138, W, 44, '#2b385e');
      for (let r = 0; r < 2; r++) {
        const ry = 64 + r * 52;
        P(c, 28, ry, 130, 4, '#4a3a5e');
        for (let j = 0; j < 6; j++) {
          const bh = 22 + (j % 3) * 6;
          P(c, 34 + j * 21, ry - bh, 12, bh, j % 2 ? '#5a4a72' : '#4f4066');
          P(c, 38 + j * 21, ry - bh + 3, 2, bh - 6, '#6a5a84');
        }
        P(c, 322, ry, 130, 4, '#4a3a5e');
        for (let j = 0; j < 6; j++) {
          const bh = 22 + ((j + 1) % 3) * 6;
          P(c, 328 + j * 21, ry - bh, 12, bh, j % 2 ? '#4f4066' : '#5a4a72');
          P(c, 332 + j * 21, ry - bh + 3, 2, bh - 6, '#6a5a84');
        }
      }
      for (let i = 0; i < 2; i++) {
        const lx = 220 + i * 60;
        P(c, lx, 148, 6, 16, '#f2ecd8');
        lingkaran(c, lx + 3, 144, 3, '#ffd166');
        lingkaran(c, lx + 3, 141, 1.5, '#fff3cf');
        P(c, lx - 6, 164, 18, 3, '#8a6a44');
      }
      P(c, 0, 178, W, 4, '#3a4a72');
      tanah(c, '#3a3460', '#332e56', '#443e6e');
      jalan(c, '#4a4478', '#403a6a', '#464072', '#564f8a');
    }

    /* ---- TEH: pagi ruang teh, jendela & gantungan cangkir ---- */
    else if (TEMA_NAMA === 'teh') {
      P(c, 0, 0, W, 48, '#e8f2e2');
      P(c, 0, 48, W, 44, '#dcead6');
      P(c, 0, 92, W, 42, '#d0e2ca');
      P(c, 0, 134, W, 48, '#c4dabf');
      P(c, 60, 56, 70, 48, '#a8bfa0');
      P(c, 65, 61, 60, 38, '#d8f0fa');
      P(c, 65, 61, 60, 13, '#e8f8fc');
      P(c, 92, 61, 3, 38, '#a8bfa0');
      P(c, 65, 77, 60, 3, '#a8bfa0');
      P(c, 0, 176, W, 4, '#a8bfa0');
      P(c, 250, 60, 140, 3, '#8a7a5a');
      for (let i = 0; i < 4; i++) {
        const cx = 262 + i * 32;
        P(c, cx, 63, 2, 6, '#8a7a5a');
        P(c, cx - 6, 69, 14, 8, i % 2 ? '#f2e8d4' : '#e8d8c0');
        P(c, cx + 8, 71, 5, 2, '#8a7a5a');
      }
      P(c, 40, 130, 90, 3, '#8a7a5a');
      for (let i = 0; i < 3; i++) {
        const tx = 50 + i * 28;
        P(c, tx, 116, 20, 14, i % 2 ? '#c98a4b' : '#b3854a');
        P(c, tx + 3, 112, 14, 4, '#8a6a44');
      }
      tanah(c, '#d8c8a4', '#ccbc96', '#e2d4b2');
      jalan(c, '#c9a763', '#ad8c50', '#b8945a', '#d9bd85');
    }

    /* ---- KEMBAR: siang halaman dua meja kue berdampingan ---- */
    else if (TEMA_NAMA === 'kembar') {
      P(c, 0, 0, W, 46, '#a8e0f5');
      P(c, 0, 46, W, 42, '#98d8f2');
      P(c, 0, 88, W, 40, '#a8e0f5');
      P(c, 0, 128, W, 24, '#b9e8f8');
      lingkaran(c, 430, 28, 11, '#ffe9a3');
      lingkaran(c, 430, 28, 8, '#ffd166');
      for (let i = 0; i < 2; i++) {
        const mx = 70 + i * 220;
        P(c, mx, 158, 74, 6, '#a8825a');
        P(c, mx + 6, 164, 5, 18, '#8a6a44');
        P(c, mx + 62, 164, 5, 18, '#8a6a44');
        lingkaran(c, mx + 22, 152, 6, '#f2b8cc');
        lingkaran(c, mx + 48, 152, 6, '#e8b06a');
      }
      P(c, 0, 150, W, 36, '#93bfd8');
      hutanDi(c, '#2f7a44', '#2a6d3c');
      tanah(c, '#7ec850', '#6fb844', '#8fd15c');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
      bungaDi(c, '#f2b8cc', '#ffd166');
    }

    /* ---- COKELAT: siang ladang kakao, pohon & buah kakao ---- */
    else if (TEMA_NAMA === 'cokelat') {
      P(c, 0, 0, W, 44, '#a8e0f5');
      P(c, 0, 44, W, 42, '#98d8f2');
      P(c, 0, 86, W, 38, '#a8e0f5');
      P(c, 0, 124, W, 26, '#b9e8f8');
      lingkaran(c, 60, 30, 11, '#ffe9a3');
      lingkaran(c, 60, 30, 8, '#ffd166');
      P(c, 0, 150, W, 36, '#7ea86a');
      for (let i = 0; i < 4; i++) {
        const tx = 50 + i * 118;
        P(c, tx, 140, 6, 42, '#6b4a2c');
        lingkaran(c, tx + 3, 132, 16, '#2f7a44');
        lingkaran(c, tx - 8, 142, 10, '#357a43');
        lingkaran(c, tx + 14, 142, 10, '#357a43');
        lingkaran(c, tx - 8, 168, 4, '#8a5f38');
        lingkaran(c, tx + 13, 172, 4, '#a06a42');
        lingkaran(c, tx + 2, 176, 4, '#8a5f38');
      }
      tanah(c, '#8fae5a', '#7fa04c', '#a0be6a');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
      bungaDi(c, '#ffe9a3', '#f2b8cc');
    }

    /* ---- NAMPAN: senja toko kue, rak nampan & lampu hangat ---- */
    else if (TEMA_NAMA === 'nampan') {
      P(c, 0, 0, W, 42, '#ffd9a8');
      P(c, 0, 42, W, 40, '#fccd94');
      P(c, 0, 82, W, 38, '#f4bd82');
      P(c, 0, 120, W, 30, '#ecb072');
      lingkaran(c, 396, 108, 13, '#ffb86b');
      lingkaran(c, 396, 108, 9, '#ff9d4a');
      P(c, 40, 108, 120, 3, '#8a6238');
      P(c, 40, 140, 120, 3, '#8a6238');
      for (let i = 0; i < 2; i++) {
        const ny = i ? 132 : 100;
        for (let j = 0; j < 3; j++) {
          const nx = 52 + j * 40;
          lingkaran(c, nx, ny, 12, '#c9a763');
          lingkaran(c, nx, ny, 9, '#e8d8b8');
          lingkaran(c, nx, ny, 5, '#e8b06a');
        }
      }
      P(c, 300, 96, 130, 8, '#8a6238');
      P(c, 300, 104, 6, 54, '#8a6238');
      P(c, 424, 104, 6, 54, '#8a6238');
      P(c, 306, 104, 118, 48, 'rgba(255,217,163,.35)');
      P(c, 320, 136, 20, 8, '#e8b06a');
      P(c, 350, 136, 20, 8, '#f2b8cc');
      P(c, 380, 136, 20, 8, '#e8b06a');
      P(c, 0, 150, W, 36, '#c09878');
      for (let i = 0; i < 2; i++) {
        const lx = 240 + i * 90;
        P(c, lx, 150, 1, 10, '#5f4426');
        lingkaran(c, lx, 163, 3, '#ffd166');
        P(c, lx - 2, 165, 5, 10, 'rgba(255,209,102,.16)');
      }
      tanah(c, '#b89868', '#a88858', '#c8a878');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
    }

    /* ---- KANTIN: pagi kantin sekolah, meja saji panjang ---- */
    else if (TEMA_NAMA === 'kantin') {
      P(c, 0, 0, W, 46, '#d8ecf4');
      P(c, 0, 46, W, 42, '#cce4f0');
      P(c, 0, 88, W, 40, '#c0dcea');
      P(c, 0, 128, W, 26, '#b4d4e4');
      for (let i = 0; i < 3; i++) {
        const wx = 40 + i * 152;
        P(c, wx, 52, 110, 44, '#9ab8c8');
        P(c, wx + 5, 57, 100, 34, '#d8f0fa');
        P(c, wx + 5, 57, 100, 12, '#e8f8fc');
        P(c, wx + 52, 57, 3, 34, '#9ab8c8');
      }
      P(c, 0, 148, W, 34, '#8fa8b8');
      P(c, 0, 144, W, 4, '#a8c0cc');
      for (let i = 0; i < 8; i++) {
        const px = 20 + i * 60;
        lingkaran(c, px, 142, 7, '#f8f2e4');
        lingkaran(c, px, 142, 4, '#e8dcc8');
        P(c, px + 18, 132, 6, 9, '#c8e0ec');
      }
      P(c, 0, 178, W, 4, '#7a94a4');
      tanah(c, '#c8ccc4', '#bcc0b8', '#d4d8d0');
      jalan(c, '#b8bcc4', '#a4a8b0', '#b0b4bc', '#c8ccd4');
    }

    /* ---- SAJI: malam meja saji keluarga, lampu gantung ---- */
    else if (TEMA_NAMA === 'saji') {
      P(c, 0, 0, W, 48, '#241c30');
      P(c, 0, 48, W, 44, '#2a2238');
      P(c, 0, 92, W, 42, '#302840');
      P(c, 0, 134, W, 48, '#362e48');
      P(c, 70, 54, 64, 46, '#4a3a5a');
      P(c, 75, 59, 54, 36, '#1a2438');
      for (let i = 0; i < 8; i++) {
        const sx = 78 + (i * 23) % 46, sy = 62 + (i * 17) % 28;
        P(c, sx, sy, 1, 1, '#fffdf2');
      }
      lingkaran(c, 112, 74, 5, '#f2ecd8');
      for (let i = 0; i < 3; i++) {
        const lx = 250 + i * 70;
        P(c, lx, 148, 1, 16, '#5a4a3a');
        lingkaran(c, lx, 168, 4, '#ffd166');
        lingkaran(c, lx, 168, 2, '#fff3cf');
        P(c, lx - 3, 170, 7, 12, 'rgba(255,209,102,.12)');
      }
      P(c, 0, 178, W, 4, '#4a3a56');
      tanah(c, '#3a3048', '#332a40', '#443a54');
      jalan(c, '#4a4058', '#403850', '#463e56', '#564e68');
    }

    /* ---- TIKAR: sore lapang bermain, tikar & pohon kelapa ---- */
    else if (TEMA_NAMA === 'tikar') {
      P(c, 0, 0, W, 42, '#ffd9a8');
      P(c, 0, 42, W, 40, '#fccd94');
      P(c, 0, 82, W, 38, '#f4bd82');
      P(c, 0, 120, W, 30, '#ecb072');
      lingkaran(c, 84, 106, 13, '#ffb86b');
      lingkaran(c, 84, 106, 9, '#ff9d4a');
      P(c, 0, 150, W, 36, '#e0ad8e');
      for (let i = 0; i < 3; i++) {
        const tx = 300 + i * 62;
        P(c, tx, 148, 3, 34, '#8a6a44');
        P(c, tx - 10, 140, 10, 2, '#4fa55e');
        P(c, tx + 4, 140, 10, 2, '#4fa55e');
        P(c, tx - 6, 144, 8, 2, '#3f8f4f');
        P(c, tx + 2, 144, 8, 2, '#3f8f4f');
        lingkaran(c, tx + 1, 148, 2, '#8a5f38');
      }
      tanah(c, '#95b552', '#83a747', '#a3c463');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
      P(c, 150, 196, 180, 34, '#c98a4b');
      P(c, 150, 196, 180, 2, '#b37a3e');
      P(c, 150, 228, 180, 2, '#b37a3e');
      for (let i = 0; i < 5; i++) P(c, 158 + i * 34, 198, 2, 30, '#b37a3e');
      bungaDi(c, '#ffd166', '#f2b8cc');
    }

    /* ---- KERTAS: malam meja gambar, jendela bulat & krayon ---- */
    else if (TEMA_NAMA === 'kertas') {
      P(c, 0, 0, W, 50, '#1a2438');
      P(c, 0, 50, W, 44, '#1e2a42');
      P(c, 0, 94, W, 42, '#22304c');
      P(c, 0, 136, W, 46, '#263656');
      lingkaran(c, 92, 76, 22, '#3a4a6a');
      lingkaran(c, 92, 76, 18, '#16203a');
      lingkaran(c, 86, 70, 6, '#f2ecd8');
      for (let i = 0; i < 6; i++) {
        const sx = 66 + (i * 17) % 44, sy = 62 + (i * 11) % 26;
        P(c, sx, sy, 1, 1, '#fffdf2');
      }
      P(c, 210, 70, 150, 3, '#4a3a56');
      const wKr = ['#ff9d9d', '#ffd166', '#7dffa8', '#63c8ff', '#f2b8cc'];
      for (let i = 0; i < 5; i++) {
        const kx = 222 + i * 27;
        P(c, kx, 52, 5, 18, wKr[i]);
        P(c, kx + 1, 46, 3, 6, '#5a4a6a');
      }
      P(c, 300, 130, 110, 3, '#4a3a56');
      for (let i = 0; i < 4; i++) P(c, 310 + i * 26, 114, 18, 16, '#f8f2e4');
      P(c, 0, 176, W, 4, '#3a4a6a');
      tanah(c, '#2a3450', '#24304a', '#33405e');
      jalan(c, '#3a4670', '#323e62', '#38446c', '#465482');
    }

    /* ---- GELANGGANG: malam kuis pecahan, lampu sorot & bendera ---- */
    else if (TEMA_NAMA === 'gelanggang') {
      P(c, 0, 0, W, 48, '#0e1628');
      P(c, 0, 48, W, 44, '#121c32');
      P(c, 0, 92, W, 40, '#16223c');
      P(c, 0, 132, W, 24, '#1a2846');
      for (let i = 0; i < 18; i++) {
        const sx = (i * 97 + 11) % (W - 10) + 5, sy = 8 + (i * 31) % 116;
        P(c, sx, sy, i % 4 === 0 ? 2 : 1, i % 4 === 0 ? 2 : 1, i % 3 ? '#fffdf2' : '#cdd9f5');
      }
      P(c, 0, 150, W, 36, '#1e2c4e');
      for (let i = 0; i < 2; i++) {
        const lx = 120 + i * 240;
        P(c, lx, 150, 10, 6, '#2a3a5e');
        P(c, lx + 2, 156, 6, 4, '#ffd166');
        P(c, lx - 14, 160, 38, 16, 'rgba(255,209,102,.10)');
        P(c, lx - 8, 176, 26, 6, 'rgba(255,209,102,.07)');
      }
      P(c, 16, 150, 110, 4, '#24345c');
      P(c, 8, 144, 126, 6, '#24345c');
      P(c, 354, 150, 110, 4, '#24345c');
      P(c, 346, 144, 126, 6, '#24345c');
      for (let i = 0; i < 6; i++) {
        const fx = 150 + i * 34;
        P(c, fx, 132, 1, 12, '#5a6a94');
        P(c, fx + 1, 132, 8, 5, i % 2 ? '#ffd166' : '#63c8ff');
      }
      tanah(c, '#20304a', '#1a2a42', '#283a58');
      jalan(c, '#2a3a58', '#22324e', '#283856', '#36466a');
    }

    /* ---- ES: siang warung es pantai, payung & laut jauh ---- */
    else if (TEMA_NAMA === 'es') {
      P(c, 0, 0, W, 46, '#a8e0f5');
      P(c, 0, 46, W, 42, '#98d8f2');
      P(c, 0, 88, W, 40, '#a8e0f5');
      P(c, 0, 128, W, 24, '#b9e8f8');
      lingkaran(c, 60, 30, 11, '#ffe9a3');
      lingkaran(c, 60, 30, 8, '#ffd166');
      P(c, 0, 150, W, 36, '#7fc4d8');
      P(c, 90, 128, 2, 30, '#8a6a44');
      lingkaran(c, 91, 124, 14, '#ff9d9d');
      lingkaran(c, 91, 124, 9, '#f2b8cc');
      P(c, 320, 140, 70, 10, '#c9a97e');
      P(c, 326, 150, 58, 26, '#b8945a');
      tanah(c, '#e8d8a8', '#dccd9c', '#f0e2b6');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
      bungaDi(c, '#f2b8cc', '#ffd166');
    }

    /* ---- KANDANG: pagi fajar, kandang panjang & hutan ---- */
    else if (TEMA_NAMA === 'kandang') {
      P(c, 0, 0, W, 44, '#ffe9c4');
      P(c, 0, 44, W, 42, '#fcd9a8');
      P(c, 0, 86, W, 38, '#f5cd96');
      P(c, 0, 124, W, 26, '#eec38a');
      lingkaran(c, 80, 100, 11, '#ffb86b');
      lingkaran(c, 80, 100, 8, '#ff9d4a');
      P(c, 0, 150, W, 36, '#c8b076');
      P(c, 340, 138, 100, 12, '#8a6238');
      P(c, 346, 150, 88, 36, '#b37a3e');
      for (let i = 0; i < 6; i++) P(c, 352 + i * 14, 156, 1, 30, '#8a6238');
      hutanDi(c, '#4f8f4a', '#3f7a3c');
      tanah(c, '#95b552', '#83a747', '#a3c463');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
    }

    /* ---- GERBANGDUA: sore taman, pagar & dua pohon ---- */
    else if (TEMA_NAMA === 'gerbangDua') {
      P(c, 0, 0, W, 42, '#ffd9a8');
      P(c, 0, 42, W, 40, '#fccd94');
      P(c, 0, 82, W, 38, '#f4bd82');
      P(c, 0, 120, W, 30, '#ecb072');
      lingkaran(c, 396, 104, 13, '#ffb86b');
      lingkaran(c, 396, 104, 9, '#ff9d4a');
      P(c, 0, 150, W, 36, '#c8a878');
      P(c, 0, 168, W, 3, '#a3744a');
      for (let i = 0; i < 16; i++) P(c, 12 + i * 30, 158, 3, 24, '#8a6a44');
      pohonKecil(c, 60, 186, 1.2);
      pohonKecil(c, 420, 186, 1.2);
      tanah(c, '#95b552', '#83a747', '#a3c463');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
      bungaDi(c, '#ffd166', '#f2b8cc');
    }

    /* ---- JURI: malam panggung juri, tirai merah & sorot ---- */
    else if (TEMA_NAMA === 'juri') {
      P(c, 0, 0, W, 48, '#101a30');
      P(c, 0, 48, W, 44, '#142038');
      P(c, 0, 92, W, 40, '#182642');
      P(c, 0, 132, W, 26, '#1c2c4c');
      for (let i = 0; i < 14; i++) {
        const sx = (i * 73 + 19) % (W - 10) + 5, sy = 8 + (i * 41) % 110;
        P(c, sx, sy, i % 4 === 0 ? 2 : 1, i % 4 === 0 ? 2 : 1, i % 3 ? '#fffdf2' : '#cdd9f5');
      }
      P(c, 0, 150, W, 36, '#22345c');
      P(c, 0, 118, 44, 68, '#8a3a4a');
      for (let i = 0; i < 4; i++) P(c, 6 + i * 11, 118, 3, 68, '#a3485c');
      P(c, 436, 118, 44, 68, '#8a3a4a');
      for (let i = 0; i < 4; i++) P(c, 442 + i * 11, 118, 3, 68, '#a3485c');
      P(c, 0, 112, W, 6, '#6a2c3a');
      for (let i = 0; i < 2; i++) {
        const lx = 150 + i * 180;
        P(c, lx, 150, 10, 6, '#2a3a5e');
        P(c, lx + 2, 156, 6, 4, '#ffd166');
        P(c, lx - 12, 160, 34, 14, 'rgba(255,209,102,.10)');
      }
      tanah(c, '#1c2a44', '#182640', '#24324e');
      jalan(c, '#28375a', '#223050', '#263456', '#32406a');
    }

    /* ---- PETAK: siang lapangan seratus ubin ---- */
    else if (TEMA_NAMA === 'petak') {
      P(c, 0, 0, W, 46, '#a8e0f5');
      P(c, 0, 46, W, 42, '#98d8f2');
      P(c, 0, 88, W, 40, '#a8e0f5');
      P(c, 0, 128, W, 24, '#b9e8f8');
      lingkaran(c, 430, 28, 11, '#ffe9a3');
      lingkaran(c, 430, 28, 8, '#ffd166');
      P(c, 0, 150, W, 36, '#93bfd8');
      hutanDi(c, '#2f7a44', '#2a6d3c');
      tanah(c, '#7ec850', '#6fb844', '#8fd15c');
      for (let i = 0; i < 20; i++) P(c, i * 25, 182, 1, 54, '#6fb844');
      for (let i = 0; i < 3; i++) P(c, 0, 192 + i * 14, W, 1, '#6fb844');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
      bungaDi(c, '#ffb86b', '#f2b8cc');
    }

    /* ---- TANGKI: senja kebun, bak air besar siluet ---- */
    else if (TEMA_NAMA === 'tangki') {
      P(c, 0, 0, W, 42, '#ffd9a8');
      P(c, 0, 42, W, 40, '#fccd94');
      P(c, 0, 82, W, 38, '#f4bd82');
      P(c, 0, 120, W, 30, '#ecb072');
      lingkaran(c, 84, 106, 13, '#ffb86b');
      lingkaran(c, 84, 106, 9, '#ff9d4a');
      P(c, 0, 150, W, 36, '#c8a078');
      P(c, 320, 118, 80, 30, '#7a94a4');
      P(c, 326, 148, 6, 38, '#68809a');
      P(c, 388, 148, 6, 38, '#68809a');
      P(c, 320, 118, 80, 4, '#8aa4b4');
      tanah(c, '#95b552', '#83a747', '#a3c463');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
    }

    /* ---- KACA: malam ruang cermin, lilin & bintang dinding ---- */
    else if (TEMA_NAMA === 'kaca') {
      P(c, 0, 0, W, 50, '#1c1830');
      P(c, 0, 50, W, 44, '#221e3a');
      P(c, 0, 94, W, 42, '#282444');
      P(c, 0, 136, W, 46, '#2e2a4e');
      for (let i = 0; i < 10; i++) {
        const sx = 30 + (i * 61) % 420, sy = 12 + (i * 37) % 100;
        P(c, sx, sy, 1, 1, '#e8e2ff');
      }
      P(c, 40, 118, 30, 64, '#3a3460');
      P(c, 44, 122, 22, 56, '#5a5488');
      P(c, 46, 126, 18, 48, '#7a74a8');
      P(c, 410, 118, 30, 64, '#3a3460');
      P(c, 414, 122, 22, 56, '#5a5488');
      P(c, 416, 126, 18, 48, '#7a74a8');
      P(c, 238, 148, 4, 14, '#8a7a5a');
      lingkaran(c, 240, 144, 3, '#ffd166');
      lingkaran(c, 240, 141, 1.5, '#fff3cf');
      P(c, 0, 176, W, 4, '#3a3460');
      tanah(c, '#2a2648', '#242242', '#332e54');
      jalan(c, '#3a3660', '#322e56', '#38345e', '#464270');
    }

    /* ---- TOKO: siang toko kelontong, rak kaleng & snack gantung ---- */
    else if (TEMA_NAMA === 'toko') {
      P(c, 0, 0, W, 48, '#f2e4c8');
      P(c, 0, 48, W, 44, '#ecdcb8');
      P(c, 0, 92, W, 42, '#e4d4ac');
      P(c, 0, 134, W, 48, '#dccca0');
      for (let i = 0; i < 5; i++) {
        const gx = 50 + i * 44;
        P(c, gx, 40, 1, 14, '#8a7a5a');
        P(c, gx - 5, 54, 11, 16, i % 2 ? '#d8a86a' : '#c8885a');
        P(c, gx - 3, 70, 7, 8, i % 2 ? '#c8885a' : '#d8a86a');
      }
      P(c, 24, 116, 130, 4, '#a8825a');
      for (let j = 0; j < 6; j++) {
        P(c, 32 + j * 20, 100, 14, 16, j % 2 ? '#d8a86a' : '#c8d8e8');
        P(c, 32 + j * 20, 104, 14, 2, '#f2e4c8');
      }
      P(c, 326, 116, 130, 4, '#a8825a');
      for (let j = 0; j < 5; j++) {
        P(c, 334 + j * 24, 96, 8, 20, j % 2 ? '#a8d8c0' : '#e8c8a0');
        P(c, 336 + j * 24, 90, 4, 6, '#8a6a44');
      }
      P(c, 0, 176, W, 4, '#c9a97e');
      tanah(c, '#e0c9a0', '#d4bd92', '#ead6b2');
      jalan(c, '#c9a763', '#ad8c50', '#b8945a', '#d9bd85');
    }

    /* ---- KASIR: sore warung, jendela hangat & lampu gantung ---- */
    else if (TEMA_NAMA === 'kasir') {
      P(c, 0, 0, W, 44, '#ffd9a8');
      P(c, 0, 44, W, 42, '#f8cd94');
      P(c, 0, 86, W, 40, '#f0c288');
      P(c, 0, 126, W, 30, '#e8b87c');
      P(c, 60, 56, 84, 52, '#8a6a44');
      P(c, 65, 61, 74, 42, '#ffcf8e');
      P(c, 65, 61, 74, 14, '#ffd9a8');
      P(c, 100, 61, 3, 42, '#8a6a44');
      P(c, 240, 138, 1, 16, '#5f4426');
      lingkaran(c, 240, 158, 4, '#ffd166');
      lingkaran(c, 240, 158, 2, '#fff3cf');
      P(c, 232, 162, 16, 10, 'rgba(255,209,102,.12)');
      P(c, 340, 118, 60, 40, '#a3744a');
      P(c, 344, 122, 52, 14, '#8a5f38');
      P(c, 344, 140, 52, 14, '#8a5f38');
      P(c, 0, 176, W, 4, '#b8945a');
      tanah(c, '#d8c8a4', '#ccbc96', '#e2d4b2');
      jalan(c, '#c9a763', '#ad8c50', '#b8945a', '#d9bd85');
    }

    /* ---- CELENGAN: pagi kamar, jendela & poster celengan ---- */
    else if (TEMA_NAMA === 'celengan') {
      P(c, 0, 0, W, 48, '#d8ecdc');
      P(c, 0, 48, W, 44, '#cfe4d4');
      P(c, 0, 92, W, 42, '#c6dcc8');
      P(c, 0, 134, W, 48, '#bcd4bc');
      P(c, 70, 52, 76, 48, '#a8bfa0');
      P(c, 75, 57, 66, 38, '#e8f8fc');
      P(c, 75, 57, 66, 13, '#f2fcff');
      P(c, 105, 57, 3, 38, '#a8bfa0');
      P(c, 84, 66, 8, 8, '#ffe9a3');
      P(c, 250, 56, 76, 44, '#f8f2e4');
      P(c, 256, 62, 64, 32, '#e8dcc8');
      lingkaran(c, 278, 78, 9, '#f2b8cc');
      P(c, 274, 74, 8, 2, '#8a5f38');
      P(c, 306, 84, 6, 4, '#ffd166');
      P(c, 0, 176, W, 4, '#a8bfa0');
      tanah(c, '#c8b894', '#bcaa84', '#d4c6a2');
      for (let i = 0; i < 12; i++) P(c, (i * 43) % W, 188 + (i % 4) * 14, 24, 1, '#bcaa84');
      jalan(c, '#b8a880', '#a09470', '#ac9c78', '#c4b690');
    }

    /* ---- KOTAK: siang halaman galeri bentuk, rumah atap segitiga & kubah ---- */
    else if (TEMA_NAMA === 'kotak') {
      P(c, 0, 0, W, 46, '#9fdcf5');
      P(c, 0, 46, W, 42, '#8fd3f0');
      P(c, 0, 88, W, 40, '#a5e0f5');
      P(c, 0, 128, W, 24, '#b7e8f8');
      lingkaran(c, 430, 30, 12, '#ffe9a3');
      lingkaran(c, 430, 30, 9, '#ffd166');
      P(c, 46, 118, 48, 34, '#c9a763');
      gunungDi(c, 70, 102, 26, 120, '#a3744a');
      P(c, 62, 132, 10, 20, '#7a5230');
      P(c, 300, 134, 36, 18, '#b8c2d2');
      lingkaran(c, 318, 134, 18, '#a9b6c4');
      P(c, 0, 150, W, 36, '#93bfd8');
      hutanDi(c, '#2f7a44', '#2a6d3c');
      tanah(c, '#7ec850', '#6fb844', '#8fd15c');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
      batuDekor(c);
    }

    /* ---- GARISISI: fajar jalan lurus & gunung runcing ---- */
    else if (TEMA_NAMA === 'garisSisi') {
      P(c, 0, 0, W, 44, '#ffe9c4');
      P(c, 0, 44, W, 42, '#fcd9a8');
      P(c, 0, 86, W, 38, '#f5cd96');
      P(c, 0, 124, W, 26, '#eec38a');
      lingkaran(c, 84, 100, 11, '#ffb86b');
      lingkaran(c, 84, 100, 8, '#ff9d4a');
      gunungDi(c, 80, 92, 56, 186, '#d8a878');
      gunungDi(c, 230, 84, 68, 186, '#c9986a');
      gunungDi(c, 400, 96, 60, 186, '#d8a878');
      P(c, 0, 150, W, 36, '#d8b07e');
      tanah(c, '#95b552', '#83a747', '#a3c463');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
      P(c, 0, 214, W, 3, '#fffdf2');
      P(c, 0, 214, W, 1, '#fff3cf');
    }

    /* ---- JALANPUTAR: pagi jalur keliling oval di lapangan ---- */
    else if (TEMA_NAMA === 'jalanPutar') {
      P(c, 0, 0, W, 44, '#ffe9c4');
      P(c, 0, 44, W, 42, '#fcd9a8');
      P(c, 0, 86, W, 38, '#f5cd96');
      P(c, 0, 124, W, 26, '#eec38a');
      lingkaran(c, 400, 98, 11, '#ffb86b');
      lingkaran(c, 400, 98, 8, '#ff9d4a');
      P(c, 0, 150, W, 36, '#c8b076');
      hutanDi(c, '#4f8f4a', '#3f7a3c');
      tanah(c, '#95b552', '#83a747', '#a3c463');
      P(c, 30, 196, 420, 34, '#d9b877');
      P(c, 70, 202, 340, 22, '#7ec850');
      P(c, 30, 196, 420, 2, '#e3c58c');
      P(c, 30, 228, 420, 2, '#e3c58c');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
    }

    /* ---- PATROLI: sore lapangan persegi panjang berpagar tepi ---- */
    else if (TEMA_NAMA === 'patroli') {
      P(c, 0, 0, W, 42, '#ffd9a8');
      P(c, 0, 42, W, 40, '#fccd94');
      P(c, 0, 82, W, 38, '#f4bd82');
      P(c, 0, 120, W, 30, '#ecb072');
      lingkaran(c, 396, 104, 13, '#ffb86b');
      lingkaran(c, 396, 104, 9, '#ff9d4a');
      P(c, 0, 150, W, 36, '#c8a878');
      hutanDi(c, '#4a6b3a', '#416030');
      tanah(c, '#95b552', '#83a747', '#a3c463');
      P(c, 120, 196, 250, 40, '#8fd15c');
      P(c, 120, 196, 250, 3, '#d9b877');
      P(c, 120, 233, 250, 3, '#d9b877');
      P(c, 120, 196, 3, 40, '#d9b877');
      P(c, 367, 196, 3, 40, '#d9b877');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
      bungaDi(c, '#ffd166', '#f2b8cc');
    }

    /* ---- UBIN: siang lantai baru separuh terpasang ---- */
    else if (TEMA_NAMA === 'ubin') {
      P(c, 0, 0, W, 46, '#9fdcf5');
      P(c, 0, 46, W, 42, '#8fd3f0');
      P(c, 0, 88, W, 40, '#a5e0f5');
      P(c, 0, 128, W, 24, '#b7e8f8');
      lingkaran(c, 430, 28, 11, '#ffe9a3');
      lingkaran(c, 430, 28, 8, '#ffd166');
      P(c, 0, 150, W, 36, '#93bfd8');
      hutanDi(c, '#2f7a44', '#2a6d3c');
      tanah(c, '#7ec850', '#6fb844', '#8fd15c');
      P(c, 150, 194, 180, 44, '#e8dcc8');
      for (let i = 0; i < 6; i++) P(c, 150 + i * 30, 194, 1, 44, '#c8b898');
      P(c, 150, 216, 180, 1, '#c8b898');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
      bungaDi(c, '#ffb86b', '#f2b8cc');
    }

    /* ---- BARISUBIN: sore barisan ubin tersusun rapi di kejauhan ---- */
    else if (TEMA_NAMA === 'barisUbin') {
      P(c, 0, 0, W, 42, '#ffd9a8');
      P(c, 0, 42, W, 40, '#fccd94');
      P(c, 0, 82, W, 38, '#f4bd82');
      P(c, 0, 120, W, 30, '#ecb072');
      lingkaran(c, 84, 106, 13, '#ffb86b');
      lingkaran(c, 84, 106, 9, '#ff9d4a');
      P(c, 0, 150, W, 36, '#c8a878');
      for (let r = 0; r < 3; r++)
        for (let i = 0; i < 16; i++) P(c, 10 + i * 30, 158 + r * 9, 24, 7, (r + i) % 2 ? '#d9b87e' : '#c9a763');
      tanah(c, '#95b552', '#83a747', '#a3c463');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
    }

    /* ---- KARPET: malam bengkel karpet, lampu gantung & rak kain ---- */
    else if (TEMA_NAMA === 'karpet') {
      P(c, 0, 0, W, 50, '#16224a');
      P(c, 0, 50, W, 45, '#1b2a58');
      P(c, 0, 95, W, 40, '#21336a');
      P(c, 0, 135, W, 25, '#283d7a');
      for (let i = 0; i < 22; i++) {
        const sx = (i * 67 + 13) % (W - 10) + 5, sy = 8 + (i * 23) % 110;
        P(c, sx, sy, i % 4 === 0 ? 2 : 1, i % 4 === 0 ? 2 : 1, i % 3 ? '#fffdf2' : '#cdd9f5');
      }
      P(c, 0, 150, W, 36, '#2a3a60');
      P(c, 200, 130, 1, 20, '#5f4426');
      lingkaran(c, 200, 152, 4, '#ffd166');
      lingkaran(c, 200, 152, 2, '#fff3cf');
      P(c, 60, 140, 70, 3, '#8a5f38');
      P(c, 68, 126, 16, 14, '#c98a4b');
      P(c, 92, 130, 12, 10, '#b3854a');
      P(c, 350, 140, 70, 3, '#8a5f38');
      P(c, 358, 128, 14, 12, '#b3854a');
      P(c, 380, 124, 16, 16, '#c98a4b');
      tanah(c, '#3a7046', '#356641', '#4a8454');
      jalan(c, '#a98f60', '#8f774c', '#a3875a', '#bfa470');
    }

    /* ---- RODADUNIA: malam bengkel roda, roda raksasa siluet ---- */
    else if (TEMA_NAMA === 'rodaDunia') {
      P(c, 0, 0, W, 50, '#16224a');
      P(c, 0, 50, W, 45, '#1b2a58');
      P(c, 0, 95, W, 40, '#21336a');
      P(c, 0, 135, W, 25, '#283d7a');
      for (let i = 0; i < 24; i++) {
        const sx = (i * 61 + 19) % (W - 10) + 5, sy = 8 + (i * 29) % 110;
        P(c, sx, sy, i % 4 === 0 ? 2 : 1, i % 4 === 0 ? 2 : 1, i % 3 ? '#fffdf2' : '#cdd9f5');
      }
      P(c, 0, 150, W, 36, '#2a3a60');
      lingkaran(c, 400, 130, 34, '#25355e');
      lingkaran(c, 400, 130, 28, '#1c2c4c');
      for (let k = 0; k < 6; k++) {
        const a = k * Math.PI / 3;
        for (let d = 8; d <= 27; d += 3) P(c, 400 + Math.cos(a) * d, 130 + Math.sin(a) * d, 2, 2, '#2e4066');
      }
      tanah(c, '#3a7046', '#356641', '#4a8454');
      jalan(c, '#a98f60', '#8f774c', '#a3875a', '#bfa470');
    }

    /* ---- KARDUS: siang gudang kardus, rak penuh kotak ---- */
    else if (TEMA_NAMA === 'kardus') {
      P(c, 0, 0, W, 48, '#f2e4c8');
      P(c, 0, 48, W, 44, '#ecdcb8');
      P(c, 0, 92, W, 42, '#e4d4ac');
      P(c, 0, 134, W, 48, '#dccca0');
      P(c, 30, 110, 120, 4, '#a8825a');
      for (let j = 0; j < 4; j++) {
        P(c, 38 + j * 28, 92, 22, 18, j % 2 ? '#c9a763' : '#b8945a');
        P(c, 38 + j * 28, 92, 22, 2, '#d9b87e');
      }
      P(c, 330, 110, 120, 4, '#a8825a');
      for (let j = 0; j < 4; j++) {
        P(c, 338 + j * 28, 92, 22, 18, j % 2 ? '#b8945a' : '#c9a763');
        P(c, 338 + j * 28, 92, 22, 2, '#d9b87e');
      }
      P(c, 0, 176, W, 4, '#c9a97e');
      tanah(c, '#e0c9a0', '#d4bd92', '#ead6b2');
      jalan(c, '#c9a763', '#ad8c50', '#b8945a', '#d9bd85');
    }

    /* ---- KAMARMALAM: malam kamar detektif, jendela bulan & poster ---- */
    else if (TEMA_NAMA === 'kamarMalam') {
      P(c, 0, 0, W, 50, '#1c1830');
      P(c, 0, 50, W, 44, '#221e3a');
      P(c, 0, 94, W, 42, '#282444');
      P(c, 0, 136, W, 46, '#2e2a4e');
      for (let i = 0; i < 12; i++) {
        const sx = 30 + (i * 61) % 420, sy = 12 + (i * 37) % 100;
        P(c, sx, sy, 1, 1, '#e8e2ff');
      }
      P(c, 60, 52, 76, 48, '#3a3460');
      P(c, 66, 58, 64, 36, '#4a6a9a');
      lingkaran(c, 112, 70, 7, '#f2ecd8');
      lingkaran(c, 115, 68, 6, '#4a6a9a');
      P(c, 66, 74, 64, 1, '#3a3460');
      P(c, 96, 58, 1, 36, '#3a3460');
      P(c, 260, 56, 70, 44, '#3a3460');
      P(c, 266, 62, 58, 32, '#4a4470');
      P(c, 0, 176, W, 4, '#3a3460');
      tanah(c, '#2a2648', '#242242', '#332e54');
      jalan(c, '#3a3660', '#322e56', '#38345e', '#464270');
    }

    /* ---- PENGGARIS: fajar jalan pengukur, penggaris raksasa siluet ---- */
    else if (TEMA_NAMA === 'penggaris') {
      P(c, 0, 0, W, 44, '#ffe3b8');
      P(c, 0, 44, W, 42, '#ffdcae');
      P(c, 0, 86, W, 44, '#fbd6a0');
      P(c, 0, 130, W, 52, '#f5cd96');
      lingkaran(c, 76, 34, 10, '#ffe9a3');
      lingkaran(c, 76, 34, 7, '#ffd166');
      P(c, 0, 158, W, 24, '#f0c48c');
      P(c, 60, 118, 300, 26, '#d9a866');               // penggaris raksasa siluet
      P(c, 60, 118, 300, 3, '#e8bc7e');
      for (let i = 0; i < 20; i++) P(c, 70 + i * 14, 118, 2, i % 2 ? 8 : 13, '#b8874c');
      P(c, 404, 140, 4, 42, '#a8825a');
      lingkaran(c, 406, 132, 10, '#e8bc7e');
      lingkaran(c, 406, 132, 7, '#c99b5c');
      tanah(c, '#a8c46a', '#98b45c', '#b8d47c');
      jalan(c, '#e0c188', '#c8a86a', '#d4b477', '#eed2a0');
    }

    /* ---- BAZARBERAT: siang bazar timbangan, tenda lapak siluet ---- */
    else if (TEMA_NAMA === 'bazarBerat') {
      P(c, 0, 0, W, 46, '#bfe6f8');
      P(c, 0, 46, W, 44, '#b0def4');
      P(c, 0, 90, W, 42, '#c2e8f8');
      P(c, 0, 132, W, 50, '#d2f0fa');
      for (let i = 0; i < 3; i++) P(c, 28 + i * 150, 96, 118, 10, '#e8b05c');
      for (let i = 0; i < 3; i++) P(c, 28 + i * 150, 106, 118, 4, '#c98a4b');
      for (let i = 0; i < 3; i++) {
        P(c, 32 + i * 150, 110, 4, 60, '#8a5f38');
        P(c, 138 + i * 150, 110, 4, 60, '#8a5f38');
      }
      for (let i = 0; i < 3; i++) P(c, 44 + i * 150, 132, 30, 22, i % 2 ? '#f8f2e4' : '#c9a763');
      P(c, 0, 172, W, 10, '#c9a97e');
      tanah(c, '#dcc494', '#d0b884', '#e6d0a4');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
    }

    /* ---- TAKARANAIR: sore dapur takaran, rak botol & tetesan besar ---- */
    else if (TEMA_NAMA === 'takaranAir') {
      P(c, 0, 0, W, 46, '#ffcf9e');
      P(c, 0, 46, W, 44, '#f8c28c');
      P(c, 0, 90, W, 42, '#f0b47c');
      P(c, 0, 132, W, 50, '#e6a86e');
      P(c, 40, 108, 120, 5, '#a8825a');
      P(c, 46, 86, 18, 22, '#8fd8f5'); P(c, 74, 90, 14, 18, '#63c8ff'); P(c, 98, 84, 20, 24, '#b8e6fa'); P(c, 128, 92, 12, 16, '#5ab8e8');
      P(c, 330, 108, 110, 5, '#a8825a');
      P(c, 340, 86, 16, 22, '#8fd8f5'); P(c, 366, 90, 18, 18, '#63c8ff'); P(c, 396, 84, 14, 24, '#b8e6fa');
      lingkaran(c, 238, 60, 6, '#d8f0fa');
      lingkaran(c, 262, 76, 4, '#c8e8f6');
      P(c, 237, 64, 2, 8, '#d8f0fa'); P(c, 261, 79, 2, 6, '#c8e8f6');
      P(c, 0, 176, W, 4, '#d9a06a');
      tanah(c, '#e0b284', '#d4a678', '#eac094');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
    }

    /* ---- MENARAJAM: senja menara jam berlonceng, siluet menara ---- */
    else if (TEMA_NAMA === 'menaraJam') {
      P(c, 0, 0, W, 44, '#ffb88a');
      P(c, 0, 44, W, 42, '#f8a878');
      P(c, 0, 86, W, 44, '#e8987a');
      P(c, 0, 130, W, 52, '#d88872');
      lingkaran(c, 396, 52, 9, '#ffe9a3');
      lingkaran(c, 396, 52, 6, '#ffd166');
      P(c, 66, 60, 46, 122, '#5a4a6e');
      P(c, 60, 54, 58, 8, '#6a5a7e');
      P(c, 74, 44, 30, 12, '#5a4a6e');
      lingkaran(c, 89, 92, 17, '#ffe9a3');
      lingkaran(c, 89, 92, 14, '#fffdf2');
      P(c, 88, 80, 2, 12, '#2a3757'); P(c, 89, 91, 9, 2, '#2a3757');
      P(c, 82, 182, 14, 6, '#4a3a5e');
      P(c, 0, 176, W, 6, '#b87860');
      tanah(c, '#8a6a6a', '#7e5e5e', '#9a7a78');
      jalan(c, '#a88a72', '#8f725c', '#9c7d66', '#bc9e84');
    }

    /* ---- ARSIPWAKTU: malam arsip kalender, lemari waktu ---- */
    else if (TEMA_NAMA === 'arsipWaktu') {
      P(c, 0, 0, W, 48, '#141c38');
      P(c, 0, 48, W, 44, '#182244');
      P(c, 0, 92, W, 42, '#1c2850');
      P(c, 0, 134, W, 48, '#223058');
      for (let i = 0; i < 18; i++) {
        const sx = 16 + (i * 67) % 448, sy = 10 + (i * 41) % 118;
        P(c, sx, sy, i % 5 === 0 ? 2 : 1, i % 5 === 0 ? 2 : 1, '#e8e2ff');
      }
      P(c, 40, 78, 90, 74, '#2a3a60');
      for (let r2 = 0; r2 < 3; r2++) {
        P(c, 48, 86 + r2 * 22, 74, 16, '#33466e');
        for (let k = 0; k < 4; k++) P(c, 52 + k * 18, 90 + r2 * 22, 12, 8, r2 === 0 && k === 2 ? '#ffd166' : '#4a5e8a');
      }
      P(c, 330, 70, 78, 92, '#2a3a60');
      P(c, 338, 78, 62, 46, '#43588a');
      for (let r3 = 0; r3 < 4; r3++) for (let k2 = 0; k2 < 5; k2++) P(c, 342 + k2 * 12, 82 + r3 * 11, 9, 8, (r3 + k2) % 2 ? '#5a6ea0' : '#4a5e8a');
      P(c, 342, 132, 54, 20, '#33466e');
      P(c, 0, 176, W, 6, '#223058');
      tanah(c, '#2a3a60', '#243458', '#32426a');
      jalan(c, '#3a4a70', '#324260', '#38486e', '#485a82');
    }

    /* ---- DUAIKLIM: siang kota dua iklim, kiri salju kanan hangat ---- */
    else if (TEMA_NAMA === 'duaIklim') {
      P(c, 0, 0, W / 2, 44, '#cfe8f8'); P(c, 0, 44, W / 2, 44, '#c2e2f6');
      P(c, 0, 88, W / 2, 44, '#d8eef8'); P(c, 0, 132, W / 2, 50, '#e4f4fa');
      P(c, W / 2, 0, W / 2, 44, '#ffd9a8'); P(c, W / 2, 44, W / 2, 44, '#fccc96');
      P(c, W / 2, 88, W / 2, 44, '#f8c288'); P(c, W / 2, 132, W / 2, 50, '#f4b87c');
      lingkaran(c, 428, 36, 10, '#ffe9a3'); lingkaran(c, 428, 36, 7, '#ffd166');
      for (let i = 0; i < 10; i++) { const sx = 14 + (i * 23) % 210, sy = 12 + (i * 31) % 160; P(c, sx, sy, 2, 2, '#ffffff'); }
      gunungDi(c, 80, 96, 62, 182, '#e8f2fa');
      gunungDi(c, 170, 110, 52, 182, '#f2f8fc');
      P(c, 0, 172, W / 2, 10, '#dcecf6');
      tanah(c, '#e8f0f6', '#dce8f2', '#f4f8fc');
      jalan(c, '#c8d8e6', '#b0c4d4', '#bcd0de', '#dce8f0');
    }

    /* ---- FESTIVALPOLA: malam festival lampu, tali pola merah-biru ---- */
    else if (TEMA_NAMA === 'festivalPola') {
      P(c, 0, 0, W, 48, '#1c2444');
      P(c, 0, 48, W, 44, '#212a4e');
      P(c, 0, 92, W, 42, '#263058');
      P(c, 0, 134, W, 48, '#2c3660');
      for (let i = 0; i < 16; i++) {
        const sx = 10 + (i * 71) % 456, sy = 10 + (i * 37) % 116;
        P(c, sx, sy, 1, 1, '#cdd9f5');
      }
      P(c, 0, 30, W, 2, '#3a4a78');
      for (let i = 0; i < 12; i++) {
        const lx = 18 + i * 40, ly = 30 + (i % 2 ? 10 : 2);
        lingkaran(c, lx, ly, 4, i % 2 ? '#ff6b6b' : '#63c8ff');
        lingkaran(c, lx - 1, ly - 1, 2, i % 2 ? '#ffb0b0' : '#b0e0ff');
        P(c, lx, ly - 7, 1, 4, '#3a4a78');
      }
      P(c, 0, 176, W, 6, '#33406a');
      tanah(c, '#3a4a78', '#324070', '#46568a');
      jalan(c, '#4a5a88', '#3e4e78', '#44547e', '#566698');
    }

    /* ---- KANTORTEKA: malam kantor detektif, papan kasus hijau ---- */
    else if (TEMA_NAMA === 'kantorTeka') {
      P(c, 0, 0, W, 48, '#12281f');
      P(c, 0, 48, W, 44, '#163024');
      P(c, 0, 92, W, 42, '#1a3828');
      P(c, 0, 134, W, 48, '#1f4230');
      for (let i = 0; i < 14; i++) {
        const sx = 20 + (i * 63) % 440, sy = 10 + (i * 43) % 118;
        P(c, sx, sy, 1, 1, '#c8e8d0');
      }
      P(c, 44, 66, 130, 84, '#0d1c14');
      P(c, 48, 70, 122, 76, '#24503a');
      for (let i = 0; i < 5; i++) {
        const kx = 54 + (i % 3) * 38, ky = 76 + Math.floor(i / 3) * 34;
        P(c, kx, ky, 30, 24, i === 4 ? '#ffd166' : '#f8f2e4');
        P(c, kx + 12, ky - 4, 6, 5, '#8898a8');
      }
      P(c, 340, 90, 66, 86, '#0d1c14');
      for (let r2 = 0; r2 < 4; r2++) { P(c, 346, 96 + r2 * 20, 54, 16, '#31624a'); P(c, 368, 100 + r2 * 20, 10, 4, '#a8c8b0'); }
      P(c, 0, 176, W, 6, '#1a3828');
      tanah(c, '#2a4a36', '#244230', '#345842');
      jalan(c, '#3a5a46', '#32503c', '#385642', '#486a54');
    }

    /* ---- PAVILIUN: malam paviliun ungu, atap lengkung ---- */
    else if (TEMA_NAMA === 'paviliun') {
      P(c, 0, 0, W, 48, '#221a3e');
      P(c, 0, 48, W, 44, '#28204a');
      P(c, 0, 92, W, 42, '#2e2656');
      P(c, 0, 134, W, 48, '#342c62');
      for (let i = 0; i < 16; i++) {
        const sx = 14 + (i * 59) % 450, sy = 10 + (i * 29) % 112;
        P(c, sx, sy, 1, 1, '#d9c4ff');
      }
      for (let i = 0; i < 8; i++) {
        const lx = 30 + i * 60, ly = 22 + (i % 2) * 14;
        P(c, lx, ly - 8, 1, 8, '#4a3a78');
        lingkaran(c, lx, ly, 5, i % 2 ? '#ffd166' : '#b892ff');
        lingkaran(c, lx - 1, ly - 1, 2, '#fff3cf');
      }
      gunungDi(c, 240, 84, 150, 178, '#3e3270');
      P(c, 90, 178, 300, 4, '#4a3a78');
      P(c, 0, 176, W, 6, '#3a2e66');
      tanah(c, '#42366e', '#3a3064', '#4c4078');
      jalan(c, '#524478', '#463a6c', '#4c4072', '#5e5088');
    }

    /* ---- AREAGESER: siang arena lomba hitung, tribun & pita start ---- */
    else if (TEMA_NAMA === 'arenaGeser') {
      P(c, 0, 0, W, 46, '#c8ecfa');
      P(c, 0, 46, W, 44, '#b8e4f8');
      P(c, 0, 90, W, 42, '#cdeef8');
      P(c, 0, 132, W, 50, '#dcf4fa');
      for (let r2 = 0; r2 < 3; r2++) P(c, 30 + r2 * 10, 100 + r2 * 18, 420, 12, r2 % 2 ? '#f8d8a8' : '#f8e4c0');
      for (let i = 0; i < 10; i++) P(c, 60 + i * 40, 96 + (i % 3) * 18, 14, 10, i % 2 ? '#8fb8e8' : '#e8a8a8');
      P(c, 40, 160, 2, 22, '#8a5f38'); P(c, 438, 160, 2, 22, '#8a5f38');
      for (let r3 = 0; r3 < 4; r3++) {
        const gel = Math.sin(r3 * 0.8) * 1;
        P(c, 40 + Math.round(gel), 158 + r3 * 5, 400, 2, r3 % 2 ? '#ff9d9d' : '#7dffa8');
      }
      P(c, 0, 176, W, 6, '#c8dca0');
      tanah(c, '#8ec85e', '#82bc54', '#9ed46a');
      jalan(c, '#e0c188', '#c8a86a', '#d4b477', '#eed2a0');
    }

    /* ---- LABIRIN: senja labirin lampion, tembok bertingkat ---- */
    else if (TEMA_NAMA === 'labirin') {
      P(c, 0, 0, W, 44, '#ffb88a');
      P(c, 0, 44, W, 42, '#f8a878');
      P(c, 0, 86, W, 44, '#e8987a');
      P(c, 0, 130, W, 52, '#d88872');
      lingkaran(c, 84, 40, 9, '#ffe9a3'); lingkaran(c, 84, 40, 6, '#ffd166');
      P(c, 24, 118, 76, 64, '#7a5a48'); P(c, 30, 126, 64, 56, '#8a6a54');
      P(c, 380, 110, 76, 72, '#7a5a48'); P(c, 386, 118, 64, 64, '#8a6a54');
      P(c, 40, 130, 44, 6, '#6b4a38'); P(c, 392, 124, 44, 6, '#6b4a38');
      for (let i = 0; i < 6; i++) {
        const lx = 150 + i * 36, ly = 126 + (i % 2) * 12;
        P(c, lx, ly - 6, 1, 6, '#5a4030');
        lingkaran(c, lx, ly, 4, '#ffd166'); lingkaran(c, lx - 1, ly - 1, 2, '#fff3cf');
      }
      P(c, 0, 176, W, 6, '#a86a50');
      tanah(c, '#9c7860', '#90705a', '#aa8468');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
    }

    /* ---- DUELLOGIKA: pagi lapangan logika, tiga podium siluet ---- */
    else if (TEMA_NAMA === 'duelLogika') {
      P(c, 0, 0, W, 46, '#d8f0d0');
      P(c, 0, 46, W, 44, '#cceac4');
      P(c, 0, 90, W, 42, '#e0f4d8');
      P(c, 0, 132, W, 50, '#e8f8e0');
      P(c, 70, 128, 34, 54, '#b8ccae');
      P(c, 224, 140, 32, 42, '#b8ccae');
      P(c, 376, 152, 30, 30, '#b8ccae');
      P(c, 66, 122, 42, 8, '#a8bc9e'); P(c, 220, 134, 40, 8, '#a8bc9e'); P(c, 372, 146, 38, 8, '#a8bc9e');
      P(c, 120, 110, 3, 50, '#8a9a80'); P(c, 123, 110, 12, 8, '#7dffa8');
      P(c, 0, 176, W, 6, '#c4d8ba');
      tanah(c, '#8ec85e', '#82bc54', '#9ed46a');
      jalan(c, '#e0c188', '#c8a86a', '#d4b477', '#eed2a0');
    }

    /* ---- KHEMAHSUDOKU: malam khemah sudoku, tenda besar indigo ---- */
    else if (TEMA_NAMA === 'khemahSudoku') {
      P(c, 0, 0, W, 48, '#181430');
      P(c, 0, 48, W, 44, '#1c1838');
      P(c, 0, 92, W, 42, '#201c40');
      P(c, 0, 134, W, 48, '#242048');
      for (let i = 0; i < 18; i++) {
        const sx = 12 + (i * 61) % 456, sy = 10 + (i * 33) % 120;
        P(c, sx, sy, i % 6 === 0 ? 2 : 1, i % 6 === 0 ? 2 : 1, '#cdd9f5');
      }
      for (let y2 = 0; y2 <= 66; y2++) {
        const ww = Math.round(y2 * 1.1);
        P(c, 240 - ww, 112 + y2, ww * 2 + 1, 1, y2 < 6 ? '#4a3a78' : '#3a2e60');
      }
      P(c, 216, 150, 48, 28, '#ffd166');
      P(c, 222, 156, 36, 22, '#f8f2e4');
      for (let r2 = 0; r2 < 3; r2++) for (let k2 = 0; k2 < 3; k2++) {
        P(c, 224 + k2 * 12, 158 + r2 * 7, 9, 5, (r2 * 3 + k2) % 2 ? '#cdd9f5' : '#f8f2e4');
      }
      P(c, 240, 112, 1, 40, '#241c48');
      P(c, 0, 176, W, 6, '#282450');
      tanah(c, '#302a58', '#2a2450', '#383060');
      jalan(c, '#423a68', '#38305c', '#3e365e', '#4e4678');
    }

    /* ---- AREAJUARA: malam penutupan, kembang api & gerbang juara ---- */
    else if (TEMA_NAMA === 'arenaJuara') {
      P(c, 0, 0, W, 48, '#10142c');
      P(c, 0, 48, W, 44, '#141834');
      P(c, 0, 92, W, 42, '#181c3c');
      P(c, 0, 134, W, 48, '#1c2044');
      for (let i = 0; i < 26; i++) {
        const sx = 8 + (i * 53) % 464, sy = 8 + (i * 31) % 122;
        P(c, sx, sy, i % 7 === 0 ? 2 : 1, i % 7 === 0 ? 2 : 1, '#fffdf2');
      }
      const kembang = [[92, 52, '#ff6b6b'], [156, 88, '#ffd166'], [330, 46, '#63c8ff'], [398, 92, '#ff9db8'], [268, 68, '#7dffa8']];
      for (const [kx, ky, kc] of kembang) {
        for (let d = 0; d < 8; d++) {
          const a = d * Math.PI / 4;
          P(c, kx + Math.round(Math.cos(a) * 11), ky + Math.round(Math.sin(a) * 11), 2, 2, kc);
        }
        P(c, kx, ky, 2, 2, '#fffdf2');
      }
      P(c, 150, 120, 180, 62, '#3a2e60');
      P(c, 158, 112, 164, 10, '#4a3a78');
      P(c, 174, 130, 132, 40, '#2a2248');
      P(c, 0, 176, W, 6, '#332a5c');
      tanah(c, '#3a3060', '#322a56', '#443a6c');
      jalan(c, '#4c4278', '#403668', '#463c6e', '#584e88');
    }

    /* ---- TAMBANG: lorong bawah tanah, balok kayu & lentera ---- */
    else if (TEMA_NAMA === 'tambang') {
      P(c, 0, 0, W, 46, '#4a3428');
      P(c, 0, 46, W, 46, '#553c2c');
      P(c, 0, 92, W, 46, '#60452f');
      P(c, 0, 138, W, 44, '#6b4e34');
      for (let i = 0; i < 3; i++) {                  // balok penyangga lorong
        P(c, 0, 34 + i * 44, W, 6, '#3a2c1e');
        for (let k = 0; k < 5; k++) P(c, 24 + k * 100 + (i % 2) * 26, 40 + i * 44, 5, 22, '#3a2c1e');
      }
      P(c, 83, 0, 2, 30, '#2a2018');                 // lentera gantung
      lingkaran(c, 84, 38, 8, '#ffd9a3');
      lingkaran(c, 84, 38, 4, '#fff3cf');
      P(c, 329, 0, 2, 46, '#2a2018');
      lingkaran(c, 330, 54, 7, '#ffd9a3');
      lingkaran(c, 330, 54, 3, '#fff3cf');
      P(c, 0, 176, W, 6, '#5a4230');
      tanah(c, '#6b5236', '#5f4830', '#7a5e3e');
      jalan(c, '#8a6a44', '#75573a', '#7d5f3e', '#96764e');
    }

    /* ---- JEMBATAN: hutan lebat, kabut tipis, jalan daun ---- */
    else if (TEMA_NAMA === 'jembatan') {
      P(c, 0, 0, W, 46, '#a8e0c8');
      P(c, 0, 46, W, 46, '#98d8bc');
      P(c, 0, 92, W, 46, '#b0e2ca');
      P(c, 0, 138, W, 44, '#c0e8d2');
      P(c, 4, 70, 18, 112, '#6b4a2c');               // batang besar kiri
      lingkaran(c, 12, 62, 24, '#2f7a44');
      lingkaran(c, 34, 78, 16, '#2a6d3c');
      P(c, 458, 82, 18, 100, '#6b4a2c');             // batang besar kanan
      lingkaran(c, 468, 74, 22, '#2f7a44');
      lingkaran(c, 446, 90, 15, '#2a6d3c');
      P(c, 150, 40, 2, 60, '#3d8a4e');               // liana gantung
      lingkaran(c, 151, 104, 4, '#4fa55e');
      P(c, 320, 30, 2, 74, '#3d8a4e');
      lingkaran(c, 321, 108, 4, '#4fa55e');
      P(c, 0, 166, W, 16, '#dff2e6');                // kabut tipis
      hutanDi(c, '#2f7a44', '#2a6d3c');
      tanah(c, '#6fb858', '#63aa4e', '#7fc764');
      jalan(c, '#c9a876', '#b58a5e', '#b89668', '#d9bd8e');
    }

    /* ---- KUTUB: gudang es bersalju ---- */
    else if (TEMA_NAMA === 'kutub') {
      P(c, 0, 0, W, 46, '#dceef8');
      P(c, 0, 46, W, 46, '#d0e8f4');
      P(c, 0, 92, W, 46, '#e0f0fa');
      P(c, 0, 138, W, 44, '#ecf7fc');
      lingkaran(c, 60, 178, 18, '#f4fbff');          // gundukan salju
      lingkaran(c, 84, 182, 14, '#eaf4fa');
      lingkaran(c, 400, 180, 20, '#f4fbff');
      lingkaran(c, 426, 183, 13, '#eaf4fa');
      for (let i = 0; i < 10; i++) {                 // kristal es menempel
        const kx = 120 + i * 26, ky = 150 + (i % 3) * 8;
        P(c, kx, ky, 3, 3, '#ffffff');
        P(c, kx + 3, ky + 1, 2, 2, '#d8ecf8');
      }
      P(c, 210, 120, 2, 62, '#a8c8dc');              // tiang gudang es
      lingkaran(c, 211, 118, 6, '#c8e0ee');
      tanah(c, '#d8e8f0', '#c8dce8', '#e4f0f6');
      jalan(c, '#b8ccd8', '#a4bacc', '#acc2d0', '#c6d8e2');
    }

    /* ---- KIOS: lapak pasar sore yang ramai ---- */
    else if (TEMA_NAMA === 'kios') {
      P(c, 0, 0, W, 46, '#a5ddf5');
      P(c, 0, 46, W, 46, '#9ad5ee');
      P(c, 0, 92, W, 46, '#b2e2f7');
      P(c, 0, 138, W, 44, '#c2e9fa');
      P(c, 20, 138, 130, 8, '#c9564b');              // kanopi lapak kiri
      for (let k = 0; k < 8; k++) P(c, 22 + k * 16, 138, 8, 8, k % 2 ? '#fffdf2' : '#c9564b');
      P(c, 330, 138, 130, 8, '#3f8f6f');             // kanopi lapak kanan
      for (let k = 0; k < 8; k++) P(c, 332 + k * 16, 138, 8, 8, k % 2 ? '#fffdf2' : '#3f8f6f');
      P(c, 30, 146, 4, 36, '#7a5230'); P(c, 136, 146, 4, 36, '#7a5230');
      P(c, 340, 146, 4, 36, '#7a5230'); P(c, 446, 146, 4, 36, '#7a5230');
      P(c, 60, 168, 26, 14, '#8a6a44');              // peti barang lapak
      P(c, 66, 162, 14, 6, '#a3825a');
      P(c, 380, 166, 30, 16, '#8a6a44');
      hutanDi(c, '#2f7a44', '#2a6d3c');
      tanah(c, '#a8c868', '#98b85c', '#b8d474');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
    }

    /* ---- JURANG: ngarai berkabut berdinding batu ---- */
    else if (TEMA_NAMA === 'jurang') {
      P(c, 0, 0, W, 46, '#b8bcd4');
      P(c, 0, 46, W, 46, '#aab0cc');
      P(c, 0, 92, W, 46, '#c6cae0');
      P(c, 0, 138, W, 44, '#d4d8e8');
      P(c, 0, 40, 30, 142, '#5a5e78');               // dinding jurang kiri
      P(c, 6, 60, 4, 100, '#4c5068');
      P(c, 450, 52, 30, 130, '#5a5e78');             // dinding jurang kanan
      P(c, 468, 74, 4, 100, '#4c5068');
      P(c, 0, 150, W, 32, '#dfe2f0');                // kabut dasar
      P(c, 0, 160, W, 12, '#e8eaf4');
      tanah(c, '#8a8ea6', '#7e829a', '#989cb2');
      jalan(c, '#6e7288', '#5e6278', '#64687e', '#7a7e94');
      for (let i = 0; i < 6; i++) {                  // kerikil dasar
        P(c, 60 + i * 70, 230 + (i % 2) * 8, 4, 3, '#565a70');
      }
    }

    /* ---- PELABUHAN: dermaga kayu dan laut biru ---- */
    else if (TEMA_NAMA === 'pelabuhan') {
      P(c, 0, 0, W, 46, '#9fd8f2');
      P(c, 0, 46, W, 46, '#8fd0ee');
      P(c, 0, 92, W, 46, '#a8dcf5');
      P(c, 0, 138, W, 44, '#bce4f8');
      P(c, 0, 146, W, 36, '#3f8fb8');                // laut di kejauhan
      P(c, 0, 146, W, 3, '#5aa8cc');
      for (let i = 0; i < 7; i++) P(c, 20 + i * 66, 154 + (i % 2) * 8, 12, 2, '#5aa8cc');
      P(c, 398, 128, 2, 20, '#4a3a28');              // tiang layar kecil
      P(c, 400, 130, 16, 10, '#fffdf2');
      P(c, 60, 148, 3, 34, '#4a3a28');               // tumpukan pancang dermaga
      P(c, 200, 150, 3, 32, '#4a3a28');
      tanah(c, '#c9a876', '#b89668', '#d9bd8e');
      jalan(c, '#b89668', '#a3825a', '#ab8a5e', '#c9b082');
      for (let i = 0; i < 5; i++) P(c, 40 + i * 100, 190 + (i % 2) * 30, 40, 2, '#b0906a');   // papan dermaga
    }

    /* ---- TEROWONGAN: lorong gelap berlampu hangat ---- */
    else if (TEMA_NAMA === 'terowongan') {
      P(c, 0, 0, W, 46, '#2e2836');
      P(c, 0, 46, W, 46, '#363044');
      P(c, 0, 92, W, 46, '#3e3850');
      P(c, 0, 138, W, 44, '#464058');
      for (let i = 0; i < 5; i++) P(c, 20 + i * 110, 0, 10, 182, '#2a2432');   // pilar lorong
      for (let i = 0; i < 4; i++) {                  // lampu dinding
        const lx = 70 + i * 110, ly = 60 + (i % 2) * 50;
        P(c, lx, ly - 10, 2, 10, '#1c1822');
        lingkaran(c, lx + 1, ly, 7, '#ffd9a3');
        lingkaran(c, lx + 1, ly, 3, '#fff3cf');
      }
      tanah(c, '#4a4458', '#403a4e', '#544e62');
      jalan(c, '#5a5468', '#4e485c', '#524c60', '#665e74');
    }

    /* ---- BALIK: padang terbuka papan petunjuk ---- */
    else if (TEMA_NAMA === 'balik') {
      P(c, 0, 0, W, 46, '#a8e0b4');
      P(c, 0, 46, W, 46, '#98d6a6');
      P(c, 0, 92, W, 46, '#b4e6c0');
      P(c, 0, 138, W, 44, '#c4ecd0');
      P(c, 90, 120, 3, 40, '#7a5230');               // papan siluet kejauhan
      P(c, 78, 112, 28, 10, '#8fbf9a');
      P(c, 356, 110, 3, 46, '#7a5230');
      P(c, 342, 100, 30, 12, '#8fbf9a');
      P(c, 344, 103, 12, 2, '#fffdf2');
      lingkaran(c, 230, 84, 10, '#f2ffe0');          // matahari lembut
      lingkaran(c, 230, 84, 6, '#fffdf2');
      hutanDi(c, '#2f7a44', '#2a6d3c');
      tanah(c, '#7ec46a', '#70b65e', '#8cd276');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
      bungaDi(c, '#ffd166', '#f2b8cc');
    }

    /* ---- KURIR: pos sortir senja ---- */
    else if (TEMA_NAMA === 'kurir') {
      P(c, 0, 0, W, 46, '#ffd9a3');
      P(c, 0, 46, W, 46, '#ffcf94');
      P(c, 0, 92, W, 46, '#f8c48c');
      P(c, 0, 138, W, 44, '#f2ba85');
      lingkaran(c, 398, 128, 14, '#ffb86b');         // matahari sore
      lingkaran(c, 398, 128, 9, '#ffd166');
      P(c, 40, 128, 110, 5, '#8a5f38');              // rak paket kejauhan
      for (let k = 0; k < 4; k++) P(c, 48 + k * 26, 112, 16, 16, k % 2 ? '#a3744a' : '#8a6a44');
      P(c, 300, 132, 120, 5, '#8a5f38');
      for (let k = 0; k < 4; k++) P(c, 308 + k * 28, 118, 18, 14, k % 2 ? '#8a6a44' : '#a3744a');
      hutanDi(c, '#4a6b3a', '#416030');
      tanah(c, '#b0a060', '#a29055', '#c0b070');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
    }

    /* ---- LIFT: menara mesin tambang ---- */
    else if (TEMA_NAMA === 'lift') {
      P(c, 0, 0, W, 46, '#5a6070');
      P(c, 0, 46, W, 46, '#646a7c');
      P(c, 0, 92, W, 46, '#6e7488');
      P(c, 0, 138, W, 44, '#787e92');
      for (let i = 0; i < 6; i++) P(c, 24 + i * 88, 0, 8, 182, '#485060');   // kuda-kuda baja
      for (let i = 0; i < 4; i++) P(c, 0, 40 + i * 40, W, 4, '#485060');
      lingkaran(c, 240, 44, 22, '#3a4252');          // roda gila raksasa
      lingkaran(c, 240, 44, 14, '#485060');
      lingkaran(c, 240, 44, 4, '#646a7c');
      P(c, 238, 66, 4, 60, '#3a4252');               // tali baja
      P(c, 104, 30, 2, 20, '#2a3038');               // lampu sorot
      lingkaran(c, 105, 52, 7, '#ffd9a3');
      lingkaran(c, 105, 52, 3, '#fff3cf');
      tanah(c, '#5a6070', '#505666', '#646a7c');
      jalan(c, '#6e7488', '#5e6478', '#646a7e', '#7a8094');
    }

    /* ---- PELATARAN: plaza ubin hijau dengan pilar batu ---- */
    else if (TEMA_NAMA === 'pelataran') {
      P(c, 0, 0, W, 46, '#b8ecab');
      P(c, 0, 46, W, 46, '#a6e09c');
      P(c, 0, 92, W, 46, '#c2f0b4');
      P(c, 0, 138, W, 44, '#cdf4c0');
      P(c, 40, 96, 10, 86, '#7fae62');               // pilar batu kiri
      P(c, 430, 92, 10, 90, '#7fae62');              // pilar batu kanan
      P(c, 30, 92, 30, 8, '#6f9e54');
      P(c, 420, 88, 30, 8, '#6f9e54');
      for (let i = 0; i < 9; i++) P(c, 120 + i * 28, 150 + (i % 2) * 10, 22, 10, i % 2 ? '#d8f2c8' : '#b8e0a8');   // ubin kejauhan
      hutanDi(c, '#2f7a44', '#2a6d3c');
      tanah(c, '#a0c860', '#92ba54', '#aed46e');
      jalan(c, '#cfc09a', '#b8a884', '#c2b490', '#dccfae');
      bungaDi(c, '#ffd166', '#f2b8cc');
    }

    /* ---- KUARI: tebing batu bertingkat dan kerikil ---- */
    else if (TEMA_NAMA === 'kuari') {
      P(c, 0, 0, W, 46, '#c8c2b2');
      P(c, 0, 46, W, 46, '#bcb6a6');
      P(c, 0, 92, W, 46, '#d2ccb8');
      P(c, 0, 138, W, 44, '#dad4c2');
      P(c, 0, 60, 90, 40, '#a89e88');                // tebing kiri bertingkat
      P(c, 10, 74, 70, 26, '#968c76');
      P(c, 400, 52, 80, 50, '#a89e88');              // tebing kanan
      P(c, 414, 68, 60, 34, '#968c76');
      for (let i = 0; i < 6; i++) lingkaran(c, 120 + i * 56, 172, 5, '#b0a690');   // kerikil
      P(c, 0, 168, W, 4, '#8a8070');
      pohonKecil(c, 110, 182, 1.4);
      pohonKecil(c, 372, 182, 1.2);
      tanah(c, '#b8ac92', '#ac9f84', '#c6ba9e');
      jalan(c, '#a89c82', '#948a72', '#9c927a', '#b4a88e');
    }

    /* ---- BUNGKUSAN: rumpun hutan hangat dengan pita gantung ---- */
    else if (TEMA_NAMA === 'bungkusan') {
      P(c, 0, 0, W, 46, '#f5e6c8');
      P(c, 0, 46, W, 46, '#eeddbb');
      P(c, 0, 92, W, 46, '#f8ead0');
      P(c, 0, 138, W, 44, '#fdf0d8');
      P(c, 80, 30, 200, 2, '#c9564b');               // tali pita gantung
      P(c, 150, 32, 2, 18, '#c9564b');
      P(c, 240, 32, 2, 22, '#3f8f6f');
      lingkaran(c, 151, 54, 5, '#ffd166');
      lingkaran(c, 241, 58, 5, '#3f8f6f');
      hutanDi(c, '#3f8f5f', '#357f52');
      tanah(c, '#c8b478', '#bca66c', '#d4c288');
      jalan(c, '#d9c48c', '#c2a874', '#c9b07c', '#e3d19e');
      bungaDi(c, '#ffd166', '#ff9db8');
    }

    /* ---- PESTA LAMPU: malam pesta lampion di hutan ---- */
    else if (TEMA_NAMA === 'pestaLampu') {
      P(c, 0, 0, W, 46, '#1c2440');
      P(c, 0, 46, W, 46, '#22304e');
      P(c, 0, 92, W, 46, '#28385a');
      P(c, 0, 138, W, 44, '#2f4266');
      lingkaran(c, 60, 30, 3, '#fffdf2');            // bintang
      lingkaran(c, 200, 22, 2, '#e8ecf8');
      lingkaran(c, 350, 34, 2, '#fffdf2');
      lingkaran(c, 430, 24, 3, '#e8ecf8');
      P(c, 0, 52, W, 2, '#3a3050');                  // tali lampion
      for (let i = 0; i < 8; i++) {
        const lx = 30 + i * 60;
        P(c, lx, 54, 2, 10, '#3a3050');
        lingkaran(c, lx + 1, 70, 6, i % 2 ? '#4a90c8' : '#ffd166');
        lingkaran(c, lx + 1, 70, 2, i % 2 ? '#a8d8f8' : '#fff3cf');
      }
      hutanDi(c, '#1e4030', '#183428');
      tanah(c, '#3a4a44', '#32423c', '#465650');
      jalan(c, '#55655e', '#455550', '#4c5c55', '#626e66');
    }

    /* ---- BUKU TUA: paviliun rak buku kayu ---- */
    else if (TEMA_NAMA === 'bukuTua') {
      P(c, 0, 0, W, 46, '#6b5238');
      P(c, 0, 46, W, 46, '#755c40');
      P(c, 0, 92, W, 46, '#7d6344');
      P(c, 0, 138, W, 44, '#876c4c');
      P(c, 60, 100, 120, 82, '#4a3826');             // rak buku kiri
      P(c, 330, 96, 120, 86, '#4a3826');             // rak buku kanan
      for (let k = 0; k < 5; k++) {
        P(c, 66 + k * 22, 108, 16, 30, ['#c9564b', '#3f8f6f', '#c9971c', '#4a7fc0', '#8a63c9'][k]);
        P(c, 336 + k * 22, 104, 16, 30, ['#3f8f6f', '#c9971c', '#4a7fc0', '#c9564b', '#8a63c9'][k]);
      }
      P(c, 66, 150, 110, 3, '#5a4630');
      P(c, 336, 146, 110, 3, '#5a4630');
      P(c, 0, 176, W, 6, '#5a4630');
      tanah(c, '#a88c60', '#9c8054', '#b4986a');
      jalan(c, '#c9b088', '#b49870', '#bba078', '#d5bd94');
    }

    /* ---- PONDOK KARTU: senja ungu dengan pondok atap kartu ---- */
    else if (TEMA_NAMA === 'pondokKartu') {
      P(c, 0, 0, W, 46, '#4c4468');
      P(c, 0, 46, W, 46, '#544c72');
      P(c, 0, 92, W, 46, '#5c547c');
      P(c, 0, 138, W, 44, '#645c86');
      lingkaran(c, 246, 66, 10, '#e8e2ff');          // bulan senja
      lingkaran(c, 246, 66, 5, '#fdfaff');
      P(c, 200, 120, 90, 62, '#3a3050');             // pondok siluet
      P(c, 190, 104, 110, 18, '#5a4a7a');
      P(c, 232, 150, 26, 32, '#241c38');
      P(c, 60, 140, 3, 42, '#332c4a');               // papan kejauhan
      P(c, 46, 128, 30, 12, '#4a3f66');
      P(c, 420, 136, 3, 46, '#332c4a');
      P(c, 406, 124, 30, 12, '#4a3f66');
      hutanDi(c, '#2c3a50', '#243044');
      tanah(c, '#5c5a72', '#525066', '#666480');
      jalan(c, '#6e6a86', '#5c5a74', '#62607c', '#7c7894');
    }

    /* ---- GALERI: bingkai pameran putih di rimbun hutan ---- */
    else if (TEMA_NAMA === 'galeri') {
      P(c, 0, 0, W, 46, '#dff2e8');
      P(c, 0, 46, W, 46, '#d2ecdf');
      P(c, 0, 92, W, 46, '#e6f6ec');
      P(c, 0, 138, W, 44, '#eefaf2');
      P(c, 70, 108, 70, 52, '#8a6a44');              // bingkai kiri
      P(c, 76, 114, 58, 40, '#f2ecd4');
      P(c, 96, 128, 18, 12, '#7fc764');
      P(c, 340, 104, 70, 56, '#8a6a44');             // bingkai kanan
      P(c, 346, 110, 58, 44, '#f2ecd4');
      P(c, 366, 122, 18, 14, '#63b8ff');
      P(c, 0, 170, W, 8, '#c2e2d2');
      hutanDi(c, '#2f7a44', '#2a6d3c');
      tanah(c, '#8cc89a', '#80bc8e', '#9ad4a6');
      jalan(c, '#e8dfc8', '#d2c9b0', '#dcd3ba', '#f2e9d2');
    }

    /* ---- TANUR: dapur roti hangat dengan asap cerobong ---- */
    else if (TEMA_NAMA === 'tanur') {
      P(c, 0, 0, W, 46, '#f2c894');
      P(c, 0, 46, W, 46, '#ecbd84');
      P(c, 0, 92, W, 46, '#f5d0a0');
      P(c, 0, 138, W, 44, '#f8d8ac');
      P(c, 150, 60, 26, 60, '#8a5f38');              // cerobong tanur
      P(c, 144, 54, 38, 10, '#6b4a2c');
      lingkaran(c, 163, 44, 6, '#e8e2d4');           // asap kejauhan
      lingkaran(c, 178, 36, 5, '#efe8d8');
      lingkaran(c, 190, 30, 4, '#f5efe2');
      P(c, 300, 120, 110, 62, '#c97b4a');            // dapur kejauhan
      P(c, 292, 108, 126, 14, '#a85c34');
      lingkaran(c, 355, 140, 12, '#3a2a1c');         // mulut tanur menyala
      lingkaran(c, 355, 140, 7, '#ff9d4a');
      lingkaran(c, 355, 140, 3, '#ffd166');
      hutanDi(c, '#4a6b3a', '#416030');
      tanah(c, '#c8a068', '#bc945c', '#d4ac74');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
    }

    /* ---- TITIAN BATU: danau jernih dan arus kejauhan ---- */
    else if (TEMA_NAMA === 'titianBatu') {
      P(c, 0, 0, W, 46, '#bfe8e2');
      P(c, 0, 46, W, 46, '#b2e0d8');
      P(c, 0, 92, W, 46, '#caece6');
      P(c, 0, 138, W, 44, '#d8f2ec');
      P(c, 0, 150, W, 32, '#7fc8c0');                // arus di kejauhan
      P(c, 0, 150, W, 3, '#a0dcd4');
      for (let i = 0; i < 7; i++) P(c, 14 + i * 68, 158 + (i % 2) * 8, 16, 2, '#a0dcd4');
      lingkaran(c, 60, 176, 8, '#a8c8b8');           // batu tepi
      lingkaran(c, 420, 178, 9, '#a8c8b8');
      hutanDi(c, '#2f7a44', '#2a6d3c');
      tanah(c, '#9cc8a0', '#8ebc92', '#aad4ae');
      jalan(c, '#b8b0a0', '#a29a8a', '#aaa292', '#c8c0b0');
    }

    /* ---- KANTOR POHON: kanopi gelap, jendela menyala ---- */
    else if (TEMA_NAMA === 'kantorPohon') {
      P(c, 0, 0, W, 46, '#2a5a3c');
      P(c, 0, 46, W, 46, '#2f6444');
      P(c, 0, 92, W, 46, '#356e4c');
      P(c, 0, 138, W, 44, '#3d7854');
      P(c, 150, 60, 130, 70, '#24482f');             // rumah pohon
      P(c, 144, 54, 142, 8, '#1c3a26');
      P(c, 168, 76, 26, 22, '#ffd166');              // jendela menyala
      P(c, 236, 76, 26, 22, '#ffd166');
      P(c, 196, 120, 40, 8, '#1c3a26');
      P(c, 60, 110, 8, 72, '#4a341c');               // batang
      P(c, 415, 104, 8, 78, '#4a341c');
      lingkaran(c, 64, 100, 16, '#2f7a44');
      lingkaran(c, 419, 94, 18, '#2f7a44');
      hutanDi(c, '#1e5232', '#184428');
      tanah(c, '#4a7a50', '#427048', '#56865c');
      jalan(c, '#6e8a62', '#5c7852', '#647e58', '#7e9870');
    }

    /* ---- POS RAHASIA: kantor pos hutan pagi ---- */
    else if (TEMA_NAMA === 'posRahasia') {
      P(c, 0, 0, W, 46, '#c8ecda');
      P(c, 0, 46, W, 46, '#bce6d0');
      P(c, 0, 92, W, 46, '#d2f0e0');
      P(c, 0, 138, W, 44, '#dcf4e6');
      P(c, 70, 70, 120, 2, '#7a5230');               // tali jemuran surat
      for (let i = 0; i < 3; i++) P(c, 84 + i * 38, 72 + (i % 2) * 4, 16, 12, i % 2 ? '#f5ecd4' : '#ffe9c4');
      P(c, 340, 96, 46, 56, '#3f6f5a');              // kantor pos kejauhan
      P(c, 336, 88, 54, 10, '#2f5a46');
      P(c, 356, 112, 14, 14, '#ffd166');
      hutanDi(c, '#2f7a44', '#2a6d3c');
      tanah(c, '#a8d890', '#9acc84', '#b6e29e');
      jalan(c, '#d9c48c', '#c2a874', '#c9b07c', '#e3d19e');
      bungaDi(c, '#ffd166', '#f2b8cc');
    }

    /* ---- KEBUN APEL: senja barisan pohon apel ---- */
    else if (TEMA_NAMA === 'kebunApel') {
      P(c, 0, 0, W, 46, '#ffcf94');
      P(c, 0, 46, W, 46, '#f8c48c');
      P(c, 0, 92, W, 46, '#f2ba85');
      P(c, 0, 138, W, 44, '#eab078');
      lingkaran(c, 90, 70, 12, '#ff9d6b');           // matahari senja
      lingkaran(c, 90, 70, 7, '#ffd166');
      for (let i = 0; i < 5; i++) {                  // barisan pohon apel
        const px = 60 + i * 84;
        P(c, px, 128, 5, 30, '#5f4426');
        lingkaran(c, px + 2, 122, 14, '#2f6d3c');
        lingkaran(c, px - 6, 132, 8, '#357a46');
        lingkaran(c, px + 9, 130, 7, '#357a46');
        lingkaran(c, px - 2, 116, 3, '#e05a4a');
        lingkaran(c, px + 7, 124, 3, '#e05a4a');
      }
      hutanDi(c, '#3d6b34', '#35602c');
      tanah(c, '#7ec46a', '#70b65e', '#8cd276');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
    }

    /* ---- GUDANG TUMPUK: lumbung terang rak kayu ---- */
    else if (TEMA_NAMA === 'gudangTumpuk') {
      P(c, 0, 0, W, 46, '#eef2e4');
      P(c, 0, 46, W, 46, '#e4ecda');
      P(c, 0, 92, W, 46, '#f2f6ea');
      P(c, 0, 138, W, 44, '#f6f8ee');
      P(c, 40, 120, 120, 4, '#8a5f38');              // rak kejauhan
      P(c, 46, 104, 22, 16, '#c9985a');
      P(c, 74, 104, 22, 16, '#b8874a');
      P(c, 104, 104, 22, 16, '#c9985a');
      P(c, 300, 116, 110, 4, '#8a5f38');
      P(c, 308, 100, 20, 16, '#b8874a');
      P(c, 334, 100, 20, 16, '#c9985a');
      P(c, 362, 100, 20, 16, '#b8874a');
      hutanDi(c, '#4a7a50', '#427048');
      tanah(c, '#c8a870', '#bc9c64', '#d4b47c');
      jalan(c, '#b8a884', '#a4946e', '#ac9c78', '#c6b692');
    }

    /* ---- KACA KUNCUP: pagi rumah kaca mint ---- */
    else if (TEMA_NAMA === 'kacaKuncup') {
      P(c, 0, 0, W, 46, '#d8f4e0');
      P(c, 0, 46, W, 46, '#ccf0d8');
      P(c, 0, 92, W, 46, '#e2f8e8');
      P(c, 0, 138, W, 44, '#eafcec');
      P(c, 300, 108, 100, 50, '#b8dcc8');            // rumah kaca siluet
      for (let i = 0; i < 4; i++) P(c, 306 + i * 24, 112, 20, 42, '#d8f2e2');
      P(c, 296, 100, 108, 4, '#9cc8b0');
      P(c, 296, 100, 8, 12, '#9cc8b0');
      P(c, 396, 100, 8, 12, '#9cc8b0');
      hutanDi(c, '#3f8f5f', '#357f52');
      tanah(c, '#b0dc90', '#a2d084', '#bee69e');
      jalan(c, '#d9e4c0', '#c2d0a8', '#cad8b0', '#e4eec8');
      bungaDi(c, '#ffd166', '#f2b8cc');
    }

    /* ---- MESIN STEMPEL: siang bengkel pohon ---- */
    else if (TEMA_NAMA === 'mesinStempel') {
      P(c, 0, 0, W, 46, '#f2e4c8');
      P(c, 0, 46, W, 46, '#ecdcb8');
      P(c, 0, 92, W, 46, '#f6ecd0');
      P(c, 0, 138, W, 44, '#faf2d8');
      P(c, 320, 76, 12, 60, '#8a5f38');              // bengkel pohon kejauhan
      P(c, 310, 70, 32, 8, '#6f4a28');
      P(c, 328, 60, 8, 12, '#9aa6b8');               // cerobong
      lingkaran(c, 332, 54, 5, '#e8e2d4');
      P(c, 70, 116, 90, 4, '#8a5f38');               // meja kerja kejauhan
      P(c, 78, 102, 18, 14, '#c9985a');
      P(c, 102, 102, 18, 14, '#b8874a');
      hutanDi(c, '#3f7a4a', '#356d40');
      tanah(c, '#c8b080', '#bca474', '#d4bc8c');
      jalan(c, '#c2b490', '#ac9e7a', '#b4a684', '#cec0a0');
    }

    /* ---- KAMAR RAPI: senja teras dinding kayu ---- */
    else if (TEMA_NAMA === 'kamarRapi') {
      P(c, 0, 0, W, 46, '#e8c8a8');
      P(c, 0, 46, W, 46, '#e0be9c');
      P(c, 0, 92, W, 46, '#f0d2b0');
      P(c, 0, 138, W, 44, '#f6dcb8');
      P(c, 40, 84, 130, 70, '#8a6a44');              // dinding kamar kayu
      P(c, 56, 98, 24, 20, '#ffd166');
      P(c, 128, 98, 24, 20, '#ffd166');
      P(c, 36, 78, 138, 8, '#6f4a28');
      P(c, 300, 96, 110, 58, '#7a5c3a');             // lemari kejauhan
      P(c, 316, 110, 22, 18, '#ffd166');
      P(c, 372, 110, 22, 18, '#ffcf94');
      P(c, 296, 90, 118, 8, '#5f4426');
      hutanDi(c, '#4a6b3a', '#416030');
      tanah(c, '#c8a878', '#bc9c6c', '#d4b488');
      jalan(c, '#d9c48c', '#c2a874', '#c9b07c', '#e3d19e');
    }

    /* ---- KUNANG TANGGA: malam tangga batu bercahaya ---- */
    else if (TEMA_NAMA === 'kunangTangga') {
      P(c, 0, 0, W, 46, '#141c30');
      P(c, 0, 46, W, 46, '#182238');
      P(c, 0, 92, W, 46, '#1c2840');
      P(c, 0, 138, W, 44, '#202e48');
      lingkaran(c, 400, 40, 10, '#f2e8c8');          // bulan sabit
      lingkaran(c, 396, 38, 8, '#141c30');
      for (let i = 0; i < 5; i++) P(c, 150 + i * 22, 150 - i * 8, 20, 8 + i * 8, '#243252');   // tangga siluet
      hutanDi(c, '#0f1a2a', '#0c1626');
      tanah(c, '#2a3a54', '#24344c', '#30405c');
      jalan(c, '#3a4a66', '#32425a', '#364660', '#42526e');
    }

    /* ---- TENDA PENDAKI: senja gunung ungu ---- */
    else if (TEMA_NAMA === 'tendaPendaki') {
      P(c, 0, 0, W, 46, '#f2c094');
      P(c, 0, 46, W, 46, '#ecb68a');
      P(c, 0, 92, W, 46, '#e6ac80');
      P(c, 0, 138, W, 44, '#e0a478');
      gunungDi(c, 90, 96, 120, 182, '#8a6a7c');      // gunung kejauhan
      gunungDi(c, 330, 88, 140, 182, '#7a5c6e');
      lingkaran(c, 250, 62, 12, '#ffcf94');          // matahari bulat
      for (let i = 0; i < 3; i++) P(c, 60 + i * 10, 168 - i * 6, 8, 4, '#5f7a52');
      hutanDi(c, '#3d6b34', '#35602c');
      tanah(c, '#a8b06a', '#9ca45e', '#b6be76');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
    }

    /* ---- LADANG BUNGA: pagi cerah petak bunga ---- */
    else if (TEMA_NAMA === 'ladangBunga') {
      P(c, 0, 0, W, 46, '#cdeefc');
      P(c, 0, 46, W, 46, '#c2e8f8');
      P(c, 0, 92, W, 46, '#d8f2fa');
      P(c, 0, 138, W, 44, '#e2f6fc');
      lingkaran(c, 70, 40, 11, '#fff3cf');           // matahari pagi
      lingkaran(c, 70, 40, 6, '#fffdf2');
      hutanDi(c, '#4a8a54', '#427d4a');
      tanah(c, '#8cc46a', '#7eb65e', '#9ad076');
      jalan(c, '#e0d4a8', '#c8bc90', '#d0c498', '#ead8b4');
      bungaDi(c, '#ff9db8', '#ffd166');
      bungaDi(c, '#f2b8cc', '#ffefd2');
    }

    /* ---- MENARA TANTANG: malam menara jaga ---- */
    else if (TEMA_NAMA === 'menaraTantang') {
      P(c, 0, 0, W, 46, '#161e34');
      P(c, 0, 46, W, 46, '#1a2440');
      P(c, 0, 92, W, 46, '#1e2a48');
      P(c, 0, 138, W, 44, '#223050');
      P(c, 190, 52, 60, 130, '#2a3858');             // menara jaga kejauhan
      P(c, 182, 44, 76, 10, '#222e4c');
      P(c, 204, 66, 10, 12, '#ffd166');
      P(c, 228, 66, 10, 12, '#ffcf94');
      P(c, 204, 96, 10, 12, '#ffcf94');
      P(c, 228, 96, 10, 12, '#ffd166');
      P(c, 204, 126, 10, 12, '#ffd166');
      P(c, 228, 126, 10, 12, '#ffcf94');
      P(c, 210, 160, 20, 22, '#141c30');
      for (let i = 0; i < 4; i++) lingkaran(c, 60 + i * 120, 30 + (i % 2) * 22, 1.5, '#dfe6f5');
      hutanDi(c, '#101a30', '#0d1526');
      tanah(c, '#2e3c58', '#283650', '#344262');
      jalan(c, '#42526e', '#3a4a64', '#3e4e6a', '#4a5a76');
    }

    return cv;
  }
  const LATAR = bakarLatar();

  /* =========================================================
     GAMBAR STASIUN — tiap judul punya objek cerita sendiri
     ========================================================= */
  function gambarCahaya(x, y, r, col, t) {
    const denyut = 0.55 + 0.3 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.16 * denyut;
    lingkaran(ctx, x, y, r + 10, col);
    ctx.globalAlpha = 0.22 * denyut;
    lingkaran(ctx, x, y, r + 4, col);
    ctx.globalAlpha = 1;
  }
  function gambarCentang(x, y) {
    lingkaran(ctx, x, y, 5, '#2aa85e');
    lingkaran(ctx, x, y, 4, '#5ee89b');
    P(ctx, x - 2, y, 2, 2, '#fffdf2');
    P(ctx, x, y + 1, 2, 2, '#fffdf2');
    P(ctx, x + 1, y - 1, 2, 2, '#fffdf2');
    P(ctx, x + 2, y - 2, 1, 2, '#fffdf2');
  }
  function papanTeks(x, lines) {
    const tinggi = 12 + lines.length * 12;
    P(ctx, x - 17, 236 - tinggi, 34, tinggi, '#1e2a44');
    P(ctx, x - 17, 236 - tinggi, 34, 2, '#37476f');
    P(ctx, x - 17, 234, 34, 2, '#141d33');
    P(ctx, x - 12, 236, 3, 6, '#7a5230');
    P(ctx, x + 9, 236, 3, 6, '#7a5230');
    for (let i = 0; i < lines.length; i++) teksPx(ctx, lines[i], x, 240 - tinggi + i * 12, '#fffdf2', 7);
  }
  function papanLebar(x, lines, lebar) {
    const tinggi = 12 + lines.length * 12, lbr = lebar || 44;
    P(ctx, x - lbr / 2, 236 - tinggi, lbr, tinggi, '#1e2a44');
    P(ctx, x - lbr / 2, 236 - tinggi, lbr, 2, '#37476f');
    P(ctx, x - lbr / 2, 234, lbr, 2, '#141d33');
    P(ctx, x - lbr / 2 + 4, 236, 3, 6, '#7a5230');
    P(ctx, x + lbr / 2 - 7, 236, 3, 6, '#7a5230');
    for (let i = 0; i < lines.length; i++) teksPx(ctx, lines[i], x, 240 - tinggi + i * 12, '#fffdf2', 7);
  }

  /* --- kamp p1-001 --- */
  function gambarApi(x, t) {
    P(ctx, x - 10, 244, 20, 3, '#6e4522');
    P(ctx, x - 6, 242, 9, 2, '#8a5a30');
    lingkaran(ctx, x - 10, 243, 2, '#9aa6b8');
    lingkaran(ctx, x + 10, 243, 2, '#9aa6b8');
    const naik = Math.sin(t * 9) * 1.5;
    P(ctx, x - 4, 236 + naik, 8, 7 - naik * 0.5, '#ff6b35');
    P(ctx, x - 3, 233 + naik, 6, 5, '#ff9d4a');
    P(ctx, x - 2, 231 + naik, 4, 4, '#ffd166');
    lingkaran(ctx, x + 18, 244, 3, '#9aa6b8');
    lingkaran(ctx, x + 23, 244, 3, '#b8c2d2');
    lingkaran(ctx, x + 20, 240, 3, '#9aa6b8');
    P(ctx, x + 19, 239, 2, 1, '#c3ccda');
  }
  function gambarTulang(x) {
    P(ctx, x - 14, 240, 28, 6, '#8a8f9c');
    P(ctx, x - 14, 240, 28, 2, '#a3aabc');
    P(ctx, x - 11, 234, 22, 6, '#f3efe4');
    lingkaran(ctx, x - 12, 236, 3, '#fffdf2');
    lingkaran(ctx, x + 12, 236, 3, '#fffdf2');
    lingkaran(ctx, x - 12, 236, 2, '#e8e2d2');
    for (let i = 0; i < 4; i++) P(ctx, x - 7 + i * 4, 234, 1, 6, '#8a7a5a');
  }
  function gambarTablet(x) {
    P(ctx, x - 12, 246, 4, 8, '#7a5230');
    P(ctx, x + 9, 246, 4, 8, '#7a5230');
    P(ctx, x - 14, 244, 29, 3, '#8a5f38');
    P(ctx, x - 12, 220, 24, 24, '#c98a4b');
    P(ctx, x - 12, 220, 24, 2, '#e0a869');
    P(ctx, x - 12, 242, 24, 2, '#a96f35');
    for (let r = 0; r < 4; r++)
      for (let i = 0; i < 5; i++) {
        const penuh = (r * 5 + i) % 3 !== 2;
        P(ctx, x - 9 + i * 4, 224 + r * 5, penuh ? 3 : 1, 2, '#5f4426');
      }
  }
  function gambarNol(x, t) {
    const bob = Math.round(Math.sin(t * 2) * 2);
    P(ctx, x - 14, 214, 6, 32, '#9aa6b8');
    P(ctx, x + 9, 214, 6, 32, '#9aa6b8');
    P(ctx, x - 14, 214, 6, 2, '#c3ccda');
    P(ctx, x + 9, 214, 6, 2, '#c3ccda');
    P(ctx, x - 16, 210, 33, 5, '#8a8f9c');
    P(ctx, x - 16, 210, 33, 2, '#a3aabc');
    gambarCahaya(x, 228 + bob * 0.4, 12, '#ffd166', t);
    teksPx(ctx, '0', x, 224 + bob, '#ffd166', 12);
    teksPx(ctx, '0', x, 224 + bob - 1, '#fff3cf', 12);
  }
  function gambarPohon(x, t) {
    const goyang = Math.sin(t * 1.8) * 1;
    P(ctx, x - 2, 220, 4, 26, '#6b4a2c');
    P(ctx, x - 2, 220, 1, 26, '#553a20');
    lingkaran(ctx, x + goyang, 212, 13, '#3f8f4f');
    lingkaran(ctx, x - 8 + goyang, 218, 8, '#357a43');
    lingkaran(ctx, x + 8 + goyang, 217, 8, '#357a43');
    lingkaran(ctx, x - 2 + goyang, 209, 6, '#4fa55e');
    for (let i = 0; i < 3; i++) P(ctx, x - 7 + i * 7, 214 + (i % 2) * 4, 2, 2, '#ff9d9d');
  }
  function gambarTugu(x, t) {
    P(ctx, x - 14, 244, 28, 4, '#8a8f9c');
    P(ctx, x - 9, 216, 18, 28, '#b8c2d2');
    P(ctx, x - 9, 216, 18, 3, '#d3dae6');
    P(ctx, x - 12, 212, 24, 5, '#9aa6b8');
    gambarCahaya(x, 200, 13, '#ffd166', t);
    const bob = Math.round(Math.sin(t * 2.2) * 1.5);
    const sy = 194 + bob;
    P(ctx, x - 1, sy - 5, 3, 11, '#ffd166');
    P(ctx, x - 6, sy - 1, 13, 3, '#ffd166');
    P(ctx, x - 4, sy - 3, 9, 7, '#ffd166');
    P(ctx, x - 1, sy - 4, 3, 9, '#fff3cf');
    P(ctx, x - 12, 242, 24, 2, '#a3aabc');
  }
  function gambarTanya(x, t) {
    P(ctx, x - 1, 232, 3, 14, '#7a5230');
    P(ctx, x - 16, 218, 33, 16, '#8a5f38');
    P(ctx, x - 16, 218, 33, 3, '#a3744a');
    P(ctx, x - 14, 232, 29, 2, '#6b4a2c');
    const bob = Math.round(Math.sin(t * 2.4) * 1);
    teksPx(ctx, '?', x, 221 + bob, '#ffe9a3', 10);
  }

  /* --- p1-002: senja gembala --- */
  function gambarBatu(x) {
    lingkaran(ctx, x - 8, 243, 3, '#9aa6b8');
    lingkaran(ctx, x - 2, 243, 3, '#a9b6c4');
    lingkaran(ctx, x + 4, 243, 3, '#9aa6b8');
    lingkaran(ctx, x - 5, 238, 3, '#a9b6c4');
    lingkaran(ctx, x + 1, 238, 3, '#b8c2d2');
    lingkaran(ctx, x - 2, 233, 3, '#c3ccda');
    P(ctx, x - 3, 232, 2, 1, '#e2e8f0');
    P(ctx, x + 1, 237, 2, 1, '#d3dae6');
    lingkaran(ctx, x + 12, 245, 2, '#9aa6b8');      // satu batu tersendiri
  }
  function gambarKantong(x) {
    P(ctx, x - 1, 204, 3, 42, '#8a5f38');
    P(ctx, x - 1, 204, 1, 42, '#a3744a');
    P(ctx, x, 206, 1, 4, '#5f4426');
    P(ctx, x - 6, 210, 12, 14, '#c98a4b');
    P(ctx, x - 7, 213, 14, 9, '#c98a4b');
    P(ctx, x - 3, 209, 6, 3, '#8a5f38');
    P(ctx, x - 5, 215, 1, 1, '#a96f35'); P(ctx, x + 2, 218, 1, 1, '#a96f35'); P(ctx, x - 1, 221, 1, 1, '#a96f35');
    lingkaran(ctx, x + 9, 245, 2, '#9aa6b8');
    lingkaran(ctx, x + 13, 245, 2, '#b8c2d2');
  }
  function gambarPagar(x) {
    P(ctx, x - 14, 230, 28, 3, '#a3744a');
    P(ctx, x - 14, 238, 28, 3, '#a3744a');
    P(ctx, x - 14, 226, 4, 20, '#8a5f38');
    P(ctx, x + 10, 226, 4, 20, '#8a5f38');
    P(ctx, x - 7, 228, 3, 18, '#c98a4b');
    P(ctx, x - 1, 228, 3, 18, '#c98a4b');
    P(ctx, x + 4, 228, 3, 18, '#c98a4b');
  }

  /* --- p1-003: malam Baitul Hikmah --- */
  function gambarMenara(x, t) {
    P(ctx, x - 10, 206, 20, 40, '#b8a888');
    P(ctx, x + 3, 206, 7, 40, '#a08868');
    lingkaran(ctx, x, 205, 10, '#c9b57e');
    P(ctx, x - 10, 205, 20, 2, '#c9b57e');
    const nyala = 0.7 + 0.3 * Math.sin(t * 2.2);
    ctx.globalAlpha = nyala;
    P(ctx, x - 6, 218, 4, 7, '#ffd166');
    P(ctx, x + 2, 226, 4, 7, '#ffd166');
    ctx.globalAlpha = 1;
    P(ctx, x - 3, 238, 6, 8, '#5f4426');
    P(ctx, x - 4, 238, 8, 2, '#8a6a45');
  }
  function gambarGulungan(x) {
    P(ctx, x - 14, 236, 28, 3, '#8a5f38');
    P(ctx, x - 12, 239, 3, 7, '#7a5230');
    P(ctx, x + 9, 239, 3, 7, '#7a5230');
    lingkaran(ctx, x - 4, 227, 7, '#f3efe4');
    lingkaran(ctx, x - 4, 227, 4, '#e8e2d2');
    lingkaran(ctx, x - 4, 227, 2, '#c9b57e');
    P(ctx, x + 2, 230, 11, 8, '#f3efe4');
    P(ctx, x + 3, 232, 9, 1, '#b8a888');
    P(ctx, x + 3, 234, 9, 1, '#b8a888');
    lingkaran(ctx, x + 8, 233, 4, '#e8e2d2');
    lingkaran(ctx, x + 8, 233, 2, '#c9b57e');
  }
  function gambarLangkah(x) {
    P(ctx, x - 17, 238, 11, 8, '#9aa6b8');
    P(ctx, x - 3, 238, 11, 8, '#a9b6c4');
    P(ctx, x + 11, 238, 11, 8, '#9aa6b8');
    teksPx(ctx, '1', x - 11, 239, '#2a3757', 7);
    teksPx(ctx, '2', x + 2, 239, '#2a3757', 7);
    teksPx(ctx, '3', x + 16, 239, '#2a3757', 7);
    P(ctx, x - 5, 241, 3, 1, '#ffd166'); P(ctx, x - 3, 240, 1, 3, '#ffd166');
    P(ctx, x + 9, 241, 3, 1, '#ffd166'); P(ctx, x + 11, 240, 1, 3, '#ffd166');
  }
  function gambarKotak(x) {
    P(ctx, x - 12, 220, 24, 24, '#8a5f38');
    P(ctx, x - 10, 222, 20, 20, '#f3efe4');
    P(ctx, x - 1, 222, 2, 20, '#8a5f38');
    P(ctx, x - 10, 231, 20, 2, '#8a5f38');
    P(ctx, x - 10, 222, 9, 9, '#63c8ff');
    P(ctx, x + 1, 222, 9, 9, '#63c8ff');
    P(ctx, x - 10, 233, 9, 9, '#63c8ff');
    P(ctx, x - 7, 225, 3, 3, '#a5dff8'); P(ctx, x + 4, 225, 3, 3, '#a5dff8'); P(ctx, x - 7, 236, 3, 3, '#a5dff8');
    P(ctx, x + 1, 233, 3, 1, '#8a5f38'); P(ctx, x + 8, 235, 1, 3, '#8a5f38'); P(ctx, x + 5, 240, 3, 1, '#8a5f38'); P(ctx, x + 1, 236, 1, 3, '#8a5f38');
    teksPx(ctx, '?', x + 6, 235, '#c07d0c', 6);
  }

  /* --- p1-004: senja ungu nol --- */
  function gambarLubang(x) {
    P(ctx, x - 10, 238, 20, 8, '#9aa6b8');
    P(ctx, x - 12, 234, 24, 4, '#b8c2d2');
    lingkaran(ctx, x, 220, 10, '#7a8698');
    lingkaran(ctx, x, 220, 7, '#39445a');
    for (let i = 0; i < 12; i++) {                  // tepi bergerigi
      const a = i * Math.PI / 6;
      P(ctx, x + Math.round(Math.cos(a) * 9), 220 + Math.round(Math.sin(a) * 9), 1, 1, '#c3ccda');
    }
  }
  function gambarPapan10(x) { papanTeks(x, ['1 0', '= 100']); }
  function gambarPiring(x) {
    for (let i = 0; i < 3; i++) {
      const py = 244 - i * 4;
      P(ctx, x - 9, py, 18, 3, '#f3efe4');
      P(ctx, x - 10, py + 1, 2, 1, '#e8e2d2');
      P(ctx, x + 8, py + 1, 2, 1, '#e8e2d2');
      P(ctx, x - 6, py, 12, 1, '#ffd9b0');
    }
    P(ctx, x + 12, 245, 8, 2, '#f3efe4');           // satu piring kosong di samping
  }
  function gambarMenaraAngka(x, t) {
    P(ctx, x - 14, 232, 28, 14, '#63c8ff');
    teksPx(ctx, '10', x, 236, '#0d1424', 7);
    P(ctx, x - 11, 221, 22, 11, '#4fa5e8');
    teksPx(ctx, '100', x, 224, '#0d1424', 6);
    P(ctx, x - 8, 212, 16, 9, '#7dd0ff');
    gambarCahaya(x, 206, 9, '#ffd166', t);
    teksPx(ctx, '1000', x, 214, '#0d1424', 5);
  }

  /* --- p1-005: gurun 3-4-5 --- */
  function gambarTali(x) {
    P(ctx, x - 17, 212, 3, 34, '#8a5f38');
    P(ctx, x + 14, 212, 3, 34, '#8a5f38');
    for (let i = 0; i <= 31; i++) {
      const tx = x - 16 + i;
      const ty = 214 + Math.round(Math.sin(Math.PI * i / 31) * 10);
      P(ctx, tx, ty, 1, 2, '#b8955e');
    }
    const simpul = [[-13, '#ff6b6b', 3], [-3, '#4fe3c8', 4], [8, '#ffd166', 5]];
    for (const [ofs, col, n] of simpul) {
      for (let k = 0; k < n; k++) {
        const ty = 214 + Math.round(Math.sin(Math.PI * (ofs + 13 + k * 2.4) / 31) * 10);
        P(ctx, x + ofs + Math.round(k * 2.4), ty, 3, 3, col);
        P(ctx, x + ofs + Math.round(k * 2.4), ty, 1, 1, '#fffdf2');
      }
    }
  }
  function gambarSudut(x) {
    P(ctx, x - 10, 212, 3, 34, '#c98a4b');          // sisi tegak
    P(ctx, x - 10, 243, 34, 3, '#c98a4b');          // sisi datar
    for (let i = 0; i <= 32; i++) {                 // sisi miring
      P(ctx, x - 9 + i, Math.round(242 - i * 0.94), 1, 2, '#c98a4b');
    }
    P(ctx, x - 10, 240, 4, 3, '#ffd166');           // sudut siku
    teksPx(ctx, '3', x - 14, 226, '#fff3cf', 6);
    teksPx(ctx, '4', x + 6, 245, '#fff3cf', 6);
    teksPx(ctx, '5', x + 12, 224, '#fff3cf', 6);
  }
  function gambarBata(x) {
    for (let r = 0; r < 4; r++) {
      const by = 244 - (r + 1) * 5;
      for (let i = 0; i < 4 - Math.floor(r / 2); i++) {
        const bx = x - 15 + i * 10 + (r % 2) * 5;
        P(ctx, bx, by, 9, 4, r % 2 ? '#c98a4b' : '#d09a55');
        P(ctx, bx, by, 9, 1, '#e0b878');
      }
    }
  }
  function gambarPiramidaKecil(x) {
    const tingkat = [[20, 244], [15, 238], [10, 232], [5, 226]];
    for (const [w, y] of tingkat) {
      P(ctx, x - w / 2, y - 6, w, 6, '#e0b878');
      P(ctx, x - w / 2, y - 6, w, 1, '#f0d098');
    }
    P(ctx, x - 2, 238, 4, 6, '#5f4426');
  }

  /* --- p1-006: kota batu Romawi --- */
  function gambarKolom(x) {
    P(ctx, x - 10, 242, 20, 4, '#b8c2d2');
    P(ctx, x - 6, 210, 12, 32, '#cdd6e2');
    P(ctx, x - 1, 210, 2, 32, '#98a4b4');
    P(ctx, x + 3, 210, 1, 32, '#b0bac8');
    P(ctx, x - 9, 205, 18, 5, '#d3dae6');
    P(ctx, x - 11, 203, 22, 3, '#b8c2d2');
    P(ctx, x - 8, 238, 16, 4, '#b8c2d2');
  }
  function gambarPapanRX(x) { papanTeks(x, ['I II III', 'V X']); }
  function gambarJamMatahari(x) {
    P(ctx, x - 7, 236, 14, 10, '#9aa6b8');
    P(ctx, x - 9, 233, 18, 3, '#b8c2d2');
    lingkaran(ctx, x, 224, 10, '#cdd6e2');
    lingkaran(ctx, x, 224, 7, '#b0bac8');
    P(ctx, x - 1, 212, 2, 13, '#5f4426');           // jarum penunjuk
    P(ctx, x + 4, 222, 3, 1, '#5f6b7c');            // garis bayangan
    P(ctx, x - 7, 226, 3, 1, '#5f6b7c');
  }
  function gambarKosong(x) {
    P(ctx, x - 10, 238, 20, 8, '#9aa6b8');
    P(ctx, x - 12, 234, 24, 4, '#b8c2d2');
    for (let i = 0; i < 12; i++) {                  // lingkaran putus-putus kosong
      const a = i * Math.PI / 6;
      P(ctx, x + Math.round(Math.cos(a) * 9) - 1, 220 + Math.round(Math.sin(a) * 9) - 1, 2, 2, '#8fa2c8');
    }
  }

  /* --- p1-007: ruang abakus --- */
  function gambarAbakus(x) {
    P(ctx, x - 14, 212, 3, 34, '#7a5230');
    P(ctx, x + 11, 212, 3, 34, '#7a5230');
    P(ctx, x - 14, 210, 28, 3, '#8a5f38');
    P(ctx, x - 14, 243, 28, 3, '#8a5f38');
    for (let i = 0; i < 3; i++) {
      const rx = x - 8 + i * 7;
      P(ctx, rx, 213, 1, 30, '#5f4426');
      const atas = [3, 1, 2][i];
      for (let b = 0; b < 4; b++) {
        const naik = b < atas;
        const by = naik ? 216 + b * 3 : 238 - (3 - b) * 3;
        lingkaran(ctx, rx, by, 2, ['#63c8ff', '#ffd166', '#ff9d9d'][i]);
      }
    }
  }
  function gambarKelereng(x) {
    P(ctx, x - 9, 240, 18, 3, '#7a5230');
    P(ctx, x - 8, 243, 16, 3, '#6b4a2c');
    lingkaran(ctx, x - 5, 237, 2, '#63c8ff');
    lingkaran(ctx, x - 1, 235, 2, '#ffd166');
    lingkaran(ctx, x + 3, 237, 2, '#ff9d9d');
    lingkaran(ctx, x - 3, 241, 2, '#4fe3c8');
    lingkaran(ctx, x + 1, 241, 2, '#bb8fff');
    P(ctx, x - 6, 236, 1, 1, '#fffdf2');
  }
  function gambarGeser(x) {
    P(ctx, x - 14, 222, 28, 22, '#8a5f38');
    P(ctx, x - 12, 224, 24, 18, '#f3efe4');
    P(ctx, x - 10, 229, 20, 2, '#5f4426');
    P(ctx, x - 10, 237, 20, 2, '#5f4426');
    P(ctx, x - 4, 228, 3, 3, '#63c8ff');
    P(ctx, x + 2, 228, 3, 3, '#63c8ff');
    P(ctx, x - 8, 236, 3, 3, '#ffd166');
    P(ctx, x + 6, 236, 3, 3, '#ffd166');
    P(ctx, x - 17, 232, 2, 1, '#5f4426'); P(ctx, x - 16, 231, 1, 3, '#5f4426');
    P(ctx, x + 15, 232, 2, 1, '#5f4426'); P(ctx, x + 16, 231, 1, 3, '#5f4426');
  }
  function gambarKalkulator(x) {
    P(ctx, x - 8, 224, 16, 20, '#4a5468');
    P(ctx, x - 6, 227, 12, 5, '#9fe8b0');
    P(ctx, x - 4, 229, 6, 1, '#2a6b3a');
    for (let r = 0; r < 2; r++)
      for (let i = 0; i < 3; i++)
        P(ctx, x - 5 + i * 4, 235 + r * 4, 3, 3, r === 0 ? '#8fa2c8' : '#ffd166');
  }

  /* --- p1-008: malam Pi --- */
  function gambarRoda(x) {
    P(ctx, x - 4, 240, 8, 6, '#8a5f38');
    lingkaran(ctx, x, 224, 16, '#9aa6b8');
    lingkaran(ctx, x, 224, 13, '#b8c2d2');
    lingkaran(ctx, x, 224, 8, '#7a8698');
    lingkaran(ctx, x, 224, 3, '#5f6b7c');
    P(ctx, x - 1, 221, 2, 2, '#c3ccda');
  }
  function gambarBenang(x) {
    lingkaran(ctx, x - 7, 234, 7, '#e8e2d2');
    lingkaran(ctx, x - 7, 234, 4, '#f3efe4');
    lingkaran(ctx, x - 7, 234, 2, '#c9b57e');
    for (let i = 0; i <= 12; i++) {
      const tx = x - 6 + i;
      const ty = 234 - Math.round(Math.sin(Math.PI * i / 12) * 7);
      P(ctx, tx, ty, 1, 1, '#d9cdb4');
    }
    lingkaran(ctx, x + 8, 238, 5, '#c98a4b');
    lingkaran(ctx, x + 8, 238, 3, '#e3c58c');
    lingkaran(ctx, x + 8, 238, 1, '#8a5f38');
  }
  function gambarPapan314(x) { papanTeks(x, ['3,14', '...']); }
  function gambarRodaKecil(x) {
    lingkaran(ctx, x, 234, 11, '#c98a4b');
    lingkaran(ctx, x, 234, 9, '#b3854a');
    for (let i = 0; i < 4; i++) {
      const a = i * Math.PI / 4;
      P(ctx, x - Math.round(Math.cos(a) * 8), 234 - Math.round(Math.sin(a) * 8), 2, 2, '#7a5230');
      P(ctx, x + Math.round(Math.cos(a) * 8), 234 + Math.round(Math.sin(a) * 8), 2, 2, '#7a5230');
    }
    lingkaran(ctx, x, 234, 2, '#6b4a2c');
    P(ctx, x - 4, 244, 8, 2, '#8a5f38');
  }

  /* --- p1-009: pasar jujur --- */
  function gambarNeraca(x, t) {
    P(ctx, x - 8, 246, 16, 2, '#7a5230');
    P(ctx, x - 2, 218, 4, 28, '#8a5f38');
    const miring = Math.sin(t * 1.6) * 2;
    for (let i = -10; i <= 10; i++) {
      P(ctx, x + i, 219 + Math.round(i * miring / 10), 1, 3, '#a3744a');
    }
    const yL = 219 - Math.round(10 * miring / 10), yR = 219 + Math.round(10 * miring / 10);
    P(ctx, x - 11, yL + 3, 1, 8, '#5f4426');
    P(ctx, x + 10, yR + 3, 1, 8, '#5f4426');
    P(ctx, x - 16, yL + 11, 12, 3, '#c9a763');
    P(ctx, x + 4, yR + 11, 12, 3, '#c9a763');
    lingkaran(ctx, x - 10, yL + 9, 2, '#8a5f38');
    lingkaran(ctx, x + 10, yR + 9, 2, '#8a5f38');
  }
  function gambarTakaran(x) {
    const gelas = [[x - 12, 8, 10], [x - 1, 12, 14], [x + 11, 16, 18]];
    for (const [gx, w, h] of gelas) {
      P(ctx, gx - w / 2, 246 - h, w, h, '#b8c2d2');
      P(ctx, gx - w / 2, 246 - h, w, 2, '#d3dae6');
      P(ctx, gx - w / 2 + 1, 246 - h + 4, w - 2, 1, '#7a8698');
      P(ctx, gx - w / 2 + 1, 246 - h + 9, w - 2, 1, '#7a8698');
    }
  }
  function gambarKoin(x) {
    const tumpuk = [[x - 11, 3], [x - 1, 6], [x + 9, 4]];
    for (const [cx2, n] of tumpuk) {
      for (let i = 0; i < n; i++) {
        P(ctx, cx2 - 5, 244 - i * 3, 10, 2, '#e8c05a');
        P(ctx, cx2 - 5, 244 - i * 3, 10, 1, '#f5d97e');
        P(ctx, cx2 + 4, 245 - i * 3, 1, 1, '#c9971c');
      }
    }
  }
  function gambarTendaKecil(x) {
    for (let y = 0; y <= 16; y++) {
      const ww = Math.round(y * 0.85);
      P(ctx, x - ww, 230 + y, ww * 2 + 1, 1, Math.floor(y / 4) % 2 ? '#e8e2d2' : '#c9564b');
    }
    P(ctx, x - 3, 242, 6, 4, '#3a2a18');
    P(ctx, x - 15, 246, 30, 2, '#b58a4a');
    P(ctx, x + 13, 240, 8, 6, '#a3744a');           // peti barang
    P(ctx, x + 13, 240, 8, 2, '#b58a4a');
  }

  /* --- p1-010: peluncuran antariksa --- */
  function gambarRoket(x, t) {
    P(ctx, x - 18, 196, 4, 50, '#4a5468');          // gantry
    P(ctx, x - 22, 202, 12, 3, '#4a5468');
    P(ctx, x - 22, 214, 12, 3, '#4a5468');
    P(ctx, x - 22, 226, 12, 3, '#4a5468');
    for (let i = 0; i < 6; i++) {                   // hidung kerucut
      P(ctx, x - 6 + i * 0.5, 202 + i, 12 - i, 1, '#ff6b35');
    }
    P(ctx, x - 6, 208, 12, 30, '#d3dae6');
    P(ctx, x - 6, 208, 3, 30, '#b8c2d2');
    lingkaran(ctx, x, 218, 3, '#4a7fc0');
    lingkaran(ctx, x, 218, 2, '#a5d8ff');
    P(ctx, x - 10, 230, 4, 10, '#ff6b35');          // sirip
    P(ctx, x + 6, 230, 4, 10, '#ff6b35');
    P(ctx, x - 8, 240, 16, 2, '#ff6b35');
    const flicker = Math.sin(t * 11) * 2;           // nyala kecil idle
    P(ctx, x - 3, 242, 6, 3 + flicker, '#ffd166');
  }
  function gambarSatelit(x, t) {
    const bob = Math.round(Math.sin(t * 1.4) * 2);
    P(ctx, x - 17, 224 + bob, 10, 6, '#2a6fd4');
    P(ctx, x - 14, 224 + bob, 1, 6, '#1c4fa0');
    P(ctx, x - 11, 224 + bob, 1, 6, '#1c4fa0');
    P(ctx, x + 7, 224 + bob, 10, 6, '#2a6fd4');
    P(ctx, x + 10, 224 + bob, 1, 6, '#1c4fa0');
    P(ctx, x + 13, 224 + bob, 1, 6, '#1c4fa0');
    P(ctx, x - 5, 222 + bob, 10, 10, '#cdd6e2');
    P(ctx, x - 5, 222 + bob, 10, 2, '#e8eef8');
    P(ctx, x - 1, 214 + bob, 2, 8, '#8fa2c8');
    lingkaran(ctx, x, 212 + bob, 2, Math.sin(t * 4) > 0 ? '#ffd166' : '#8a6a1c');
  }
  function gambarRobot(x, t) {
    P(ctx, x - 8, 226, 16, 16, '#8fa2c8');
    P(ctx, x - 8, 226, 16, 2, '#b8c8e4');
    P(ctx, x - 5, 230, 10, 8, '#5f6b7c');
    P(ctx, x - 4, 232, 2, 2, '#ffd166');
    P(ctx, x, 232, 2, 2, '#ff9d9d');
    P(ctx, x - 4, 236, 2, 2, '#4fe3c8');
    P(ctx, x, 236, 2, 2, '#bb8fff');
    P(ctx, x - 5, 216, 10, 8, '#a9b8d4');
    P(ctx, x - 1, 210, 2, 6, '#8fa2c8');
    lingkaran(ctx, x, 208, 2, Math.sin(t * 5) > 0 ? '#ff6b35' : '#7a2a18');
    P(ctx, x - 6, 242, 4, 4, '#3a4258');
    P(ctx, x + 2, 242, 4, 4, '#3a4258');
  }
  function gambarKonstelasi(x, t) {
    P(ctx, x - 15, 216, 30, 26, '#0d1424');
    P(ctx, x - 15, 216, 30, 2, '#37476f');
    P(ctx, x - 15, 240, 30, 2, '#141d33');
    P(ctx, x - 3, 242, 3, 4, '#7a5230');
    P(ctx, x + 9, 242, 3, 4, '#7a5230');
    const titik = [[x - 9, 222], [x, 220], [x + 9, 226], [x - 5, 233], [x + 5, 236]];
    for (let i = 0; i < titik.length - 1; i++) {
      const [x1, y1] = titik[i], [x2, y2] = titik[i + 1];
      const langkah = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
      for (let s = 0; s <= langkah; s++) {
        P(ctx, Math.round(x1 + (x2 - x1) * s / langkah), Math.round(y1 + (y2 - y1) * s / langkah), 1, 1, '#3a4a78');
      }
    }
    titik.forEach(([sx, sy], i) => {
      const nyala = 0.5 + 0.5 * Math.sin(t * 3 + i * 1.7);
      ctx.globalAlpha = nyala;
      P(ctx, sx - 1, sy - 1, 3, 3, '#ffd166');
      P(ctx, sx, sy, 1, 1, '#fff3cf');
      ctx.globalAlpha = 1;
    });
  }

  /* --- p1-011: kampung angka (pagi) --- */
  function gambarGerbang9(x) {
    P(ctx, x - 20, 216, 5, 30, '#c98a4b');
    P(ctx, x + 15, 216, 5, 30, '#c98a4b');
    P(ctx, x - 24, 208, 48, 8, '#b8763e');
    P(ctx, x - 24, 208, 48, 2, '#d9a069');
    teksPx(ctx, '0 - 9', x, 210, '#fffdf2', 6);
    P(ctx, x - 18, 244, 36, 2, '#c9a763');
    teksPx(ctx, 'KAMPUNG', x, 247, '#5f4426', 4);
  }
  function gambarRumahAngka(x) {
    const warna = ['#e8b4b8', '#63c8ff', '#ffd166', '#7dffa8', '#ff9d9d', '#bb8fff', '#4fe3c8', '#f2a05e', '#a5d8ff', '#ffb86b'];
    for (let i = 0; i < 10; i++) {
      const hx = x - 27 + i * 6;
      P(ctx, hx, 239, 5, 7, warna[i]);
      P(ctx, hx - 1, 236, 7, 3, '#8a6a5c');
      teksPx(ctx, String(i), hx + 2, 229, '#2a3757', 5);
    }
    P(ctx, x - 29, 246, 58, 2, '#c9a763');
  }
  function gambarLampuJalan(x, t) {
    P(ctx, x - 1, 214, 3, 32, '#5f6b7c');
    P(ctx, x - 7, 212, 8, 3, '#5f6b7c');
    P(ctx, x - 5, 206, 11, 6, '#4a5468');
    gambarCahaya(x, 220, 15, '#ffd166', t);
    P(ctx, x - 3, 208, 7, 4, '#ffd166');
    P(ctx, x + 6, 234, 20, 12, '#f3efe4');
    P(ctx, x + 6, 234, 20, 1, '#d3ccba');
    teksPx(ctx, '7', x + 13, 236, '#8a5f38', 6);
    P(ctx, x + 9, 237, 9, 1, '#c9564b');
    P(ctx, x + 13, 235, 1, 5, '#c9564b');
    P(ctx, x + 9, 241, 9, 1, '#c9564b');
  }
  function gambarPapanSahabat(x) { papanLebar(x, ['3 1 = 31', '9 9 = 99'], 52); }

  /* --- p1-012: gunung tangga (fajar emas) --- */
  function gambarKakiTangga(x) {
    P(ctx, x - 6, 244, 40, 4, '#c9b8a0');
    P(ctx, x - 6, 238, 40, 6, '#d4c4ac');
    P(ctx, x - 6, 238, 40, 2, '#e4d6c0');
    teksPx(ctx, '1', x + 8, 240, '#6b5a44', 7);
    P(ctx, x - 22, 246, 14, 2, '#b8a888');
  }
  function gambarBatuAngka(x) {
    P(ctx, x - 18, 246, 18, 4, '#c9b8a0');
    P(ctx, x - 18, 240, 18, 6, '#d4c4ac');
    teksPx(ctx, '2', x - 9, 242, '#6b5a44', 7);
    P(ctx, x + 2, 246, 18, 4, '#c9b8a0');
    P(ctx, x + 2, 234, 18, 12, '#d4c4ac');
    P(ctx, x + 2, 234, 18, 2, '#e4d6c0');
    teksPx(ctx, '3', x + 11, 238, '#6b5a44', 7);
  }
  function gambarJedaBunga(x, t) {
    P(ctx, x - 16, 246, 32, 4, '#c9b8a0');
    P(ctx, x - 16, 238, 32, 8, '#d4c4ac');
    P(ctx, x - 16, 238, 32, 2, '#e4d6c0');
    teksPx(ctx, '5', x, 240, '#6b5a44', 7);
    P(ctx, x + 9, 230, 2, 8, '#4fa55e');
    const goy = Math.sin(t * 2) * 1;
    lingkaran(ctx, x + 10 + goy, 227, 3, '#ff9d9d');
    lingkaran(ctx, x + 10 + goy, 227, 1, '#ffd166');
  }
  function gambarPuncakBendera(x, t) {
    P(ctx, x - 22, 246, 44, 4, '#c9b8a0');
    P(ctx, x - 22, 240, 44, 6, '#d4c4ac');
    for (let i = 0; i < 9; i++) teksPx(ctx, String(i + 1), x - 19 + i * 5, 242, '#8a7a60', 4);
    P(ctx, x + 10, 208, 2, 38, '#7a5230');
    const kibar = Math.sin(t * 3) * 1;
    P(ctx, x + 12, 209 + kibar * 0.5, 12, 7, '#2aa85e');
    P(ctx, x + 12, 209 + kibar * 0.5, 12, 2, '#5ee89b');
    gambarCahaya(x - 4, 216, 10, '#ffd166', t);
    teksPx(ctx, '10', x - 8, 212, '#ffd166', 8);
  }

  /* --- p1-013: bukit peluncuran fajar --- */
  function gambarPapanMundur(x) { papanLebar(x, ['10 9 8 7', '6 5 4 3', '2 1 0'], 60); }
  function gambarRoketKecil(x, t) {
    P(ctx, x - 10, 246, 20, 2, '#8a5f38');
    P(ctx, x - 12, 248, 24, 2, '#7a5230');
    for (let i = 0; i < 5; i++) P(ctx, x - 4 + Math.round(i * 0.6), 218 + i, 8 - i, 1, '#ff6b35');
    P(ctx, x - 4, 223, 8, 18, '#f3efe4');
    P(ctx, x - 4, 223, 2, 18, '#d9d2c0');
    lingkaran(ctx, x, 230, 2, '#4a7fc0');
    P(ctx, x - 7, 236, 3, 7, '#ff6b35');
    P(ctx, x + 4, 236, 3, 7, '#ff6b35');
    P(ctx, x - 5, 243, 10, 2, '#ff6b35');
    const nyala = Math.sin(t * 9);
    P(ctx, x - 2, 245, 4, 2 + nyala, '#ffd166');
  }
  function gambarBenderaTurun(x) {
    const angka = ['10', '9', '8', '7'];
    for (let i = 0; i < 4; i++) {
      const fx = x - 21 + i * 14, fy = 232 + i * 4;
      P(ctx, fx, 246, 12, 2, '#b89058');
      P(ctx, fx, fy, 1, 244 - fy, '#7a5230');
      P(ctx, fx + 1, fy, 6, 4, i % 2 ? '#ff6b35' : '#ffd166');
      teksPx(ctx, angka[i], fx + 4, fy + 6, '#fffdf2', 4);
    }
  }
  function gambarNolNyala(x, t) {
    P(ctx, x - 10, 244, 20, 4, '#8a8f9c');
    P(ctx, x - 8, 240, 16, 4, '#9aa6b8');
    gambarCahaya(x, 226, 14, '#ffd166', t);
    const bob = Math.round(Math.sin(t * 2.4) * 1.5);
    teksPx(ctx, '0', x, 220 + bob, '#ffd166', 13);
    teksPx(ctx, '0', x, 219 + bob, '#fff3cf', 13);
    const naik = Math.sin(t * 8) * 1.5;
    P(ctx, x - 3, 236 - naik, 6, 4, '#ff9d4a');
    P(ctx, x - 2, 234 - naik, 4, 3, '#ffd166');
  }

  /* --- p1-014: pelabuhan kapal --- */
  function gambarDermaga(x) {
    P(ctx, x - 18, 244, 36, 4, '#a3744a');
    P(ctx, x - 18, 244, 36, 1, '#b58a4a');
    P(ctx, x - 14, 248, 3, 6, '#8a5f38');
    P(ctx, x + 11, 248, 3, 6, '#8a5f38');
    P(ctx, x + 14, 228, 4, 18, '#8a5f38');
    lingkaran(ctx, x + 16, 227, 2, '#c9b57e');
    for (let i = 0; i <= 18; i++) P(ctx, x - 4 + i, Math.round(236 + Math.sin(Math.PI * i / 18) * 5), 1, 1, '#b8955e');
    P(ctx, x - 30, 250, 18, 4, '#c9564b');
    P(ctx, x - 28, 250, 14, 2, '#e07a6a');
  }
  function gambarKursiKapten(x, t) {
    P(ctx, x - 2, 214, 2, 18, '#5f4426');
    P(ctx, x - 2, 215, 10, 7, '#fffdf2');
    P(ctx, x - 18, 232, 34, 14, '#b8763e');
    P(ctx, x - 18, 232, 34, 2, '#d9a069');
    P(ctx, x + 16, 226, 6, 6, '#b8763e');
    P(ctx, x - 12, 224, 16, 8, '#c98a4b');
    P(ctx, x - 12, 220, 4, 10, '#c98a4b');
    gambarCahaya(x - 4, 232, 9, '#ffd166', t);
    teksPx(ctx, '10', x - 4, 226, '#ffd166', 7);
  }
  function gambarMuatan(x) {
    const peti = [];
    for (let i = 0; i < 5; i++) peti.push([x - 17 + i * 7, 235]);
    for (let i = 0; i < 5; i++) peti.push([x - 17 + i * 7, 226]);
    for (const [px2, py2] of peti) {
      P(ctx, px2, py2, 7, 9, '#a3744a');
      P(ctx, px2, py2, 7, 2, '#b58a4a');
      P(ctx, px2 + 3, py2 + 2, 1, 7, '#8a5f38');
    }
    P(ctx, x - 19, 214, 38, 9, '#f3efe4');
    P(ctx, x - 19, 214, 38, 1, '#e3dcc8');
    teksPx(ctx, '10 PETI', x, 216, '#8a5f38', 5);
  }
  function gambarDuaKursi(x, t) {
    P(ctx, x - 14, 236, 10, 2, '#c98a4b');
    P(ctx, x - 13, 224, 2, 12, '#c98a4b');
    P(ctx, x - 5, 224, 2, 12, '#c98a4b');
    teksPx(ctx, '10', x - 9, 227, '#ffd166', 5);
    P(ctx, x + 6, 236, 10, 2, '#a3744a');
    P(ctx, x + 7, 226, 2, 10, '#a3744a');
    P(ctx, x + 14, 226, 2, 10, '#a3744a');
    teksPx(ctx, '2', x + 11, 228, '#a5d8ff', 5);
    gambarCahaya(x, 218, 10, '#fffdf2', t);
    teksPx(ctx, '12', x, 210, '#fffdf2', 8);
  }

  /* --- p1-015: panggung kursi bertingkat --- */
  function gambarTiket(x) {
    P(ctx, x - 12, 232, 24, 14, '#8a2838');
    P(ctx, x - 14, 228, 28, 5, '#a83a4a');
    P(ctx, x - 14, 228, 28, 2, '#c9564b');
    P(ctx, x - 6, 240, 8, 6, '#3a2030');
    P(ctx, x - 4, 220, 9, 6, '#ffd166');
    P(ctx, x - 4, 220, 9, 1, '#ffe9a3');
  }
  function gambarKursi1(x, t) {
    P(ctx, x - 10, 246, 20, 3, '#5a4a78');
    P(ctx, x - 8, 234, 16, 12, '#6a5a88');
    P(ctx, x - 8, 234, 16, 2, '#8a7aa8');
    teksPx(ctx, '1', x, 238, '#ffd166', 6);
    gambarCahaya(x, 230, 11, '#ffe9a3', t);
  }
  function gambarKursi10(x, t) {
    P(ctx, x - 12, 246, 24, 3, '#5a4a78');
    P(ctx, x - 10, 232, 20, 14, '#6a5a88');
    P(ctx, x - 10, 232, 20, 2, '#8a7aa8');
    P(ctx, x - 8, 222, 16, 10, '#7a6a98');
    P(ctx, x - 8, 222, 16, 2, '#9a8ab8');
    teksPx(ctx, '10', x, 226, '#ffd166', 6);
    gambarCahaya(x, 220, 12, '#ffe9a3', t);
  }
  function gambarKursi1000(x, t) {
    P(ctx, x - 13, 246, 26, 3, '#5a4a78');
    P(ctx, x - 12, 234, 24, 12, '#6a5a88');
    P(ctx, x - 12, 234, 24, 2, '#8a7aa8');
    P(ctx, x - 10, 224, 20, 10, '#7a6a98');
    P(ctx, x - 10, 224, 20, 2, '#9a8ab8');
    P(ctx, x - 8, 214, 16, 10, '#8a7aa8');
    P(ctx, x - 8, 214, 16, 2, '#aaa8c8');
    teksPx(ctx, '100', x, 218, '#ffd166', 5);
    gambarCahaya(x, 208, 13, '#ffe9a3', t);
    teksPx(ctx, '1000', x, 204, '#fffdf2', 5);
  }

  /* --- p1-016: halaman jemuran --- */
  function gambarJemuran(x, t) {
    P(ctx, x - 22, 214, 3, 32, '#8a5f38');
    P(ctx, x + 19, 214, 3, 32, '#8a5f38');
    const tenggelam = Math.sin(t * 1.6);
    P(ctx, x - 20, 216 + tenggelam, 40, 1, '#d9d2c0');
    const warnaKaus = ['#63c8ff', '#ff9d9d', '#ffd166', '#7dffa8'];
    for (let p = 0; p < 4; p++) {
      for (let d = 0; d < 2; d++) {
        const kx = x - 16 + p * 9 + d * 4;
        P(ctx, kx, 218 + tenggelam, 3, 7, warnaKaus[p]);
        P(ctx, kx, 225 + tenggelam, 3, 3, warnaKaus[p]);
        P(ctx, kx - 1, 217 + tenggelam, 5, 1, '#f3efe4');
      }
    }
  }
  function gambarRakSepatu(x) {
    P(ctx, x - 18, 246, 36, 3, '#8a5f38');
    P(ctx, x - 18, 236, 36, 3, '#8a5f38');
    P(ctx, x - 17, 224, 2, 25, '#a3744a');
    P(ctx, x + 15, 224, 2, 25, '#a3744a');
    const warnaSep = ['#c9564b', '#4a7fc0'];
    for (let s = 0; s < 2; s++) {
      const py2 = 236 - s * 10;
      for (const bx of [x - 14, x - 8, x + 1, x + 7]) {
        P(ctx, bx, py2 - 6, 5, 5, warnaSep[s]);
        P(ctx, bx, py2 - 2, 5, 2, '#f3efe4');
      }
    }
  }
  function gambarBecakRoda(x) {
    P(ctx, x - 12, 228, 18, 12, '#2aa85e');
    P(ctx, x - 12, 228, 18, 2, '#5ee89b');
    P(ctx, x - 9, 231, 10, 6, '#c4f0fc');
    P(ctx, x + 4, 236, 10, 6, '#2aa85e');
    lingkaran(ctx, x - 12, 243, 3, '#3a4258');
    lingkaran(ctx, x - 12, 243, 1, '#8fa2c8');
    lingkaran(ctx, x - 2, 243, 3, '#3a4258');
    lingkaran(ctx, x - 2, 243, 1, '#8fa2c8');
    lingkaran(ctx, x + 9, 243, 3, '#3a4258');
    lingkaran(ctx, x + 9, 243, 1, '#8fa2c8');
    P(ctx, x - 12, 240, 21, 2, '#a3744a');
  }
  function gambarTumpukKue(x) {
    for (let s = 0; s < 2; s++) {
      const px2 = x - 12 + s * 24;
      P(ctx, px2 - 8, 244, 16, 2, '#f3efe4');
      for (let i = 0; i < 3; i++) {
        P(ctx, px2 - 7 + i * 5, 239, 4, 4, '#f2a05e');
        P(ctx, px2 - 6 + i * 5, 238, 2, 1, '#ffd166');
      }
    }
    teksPx(ctx, '=', x, 240, '#fffdf2', 8);
    teksPx(ctx, '3 3', x, 230, '#a5d8ff', 5);
  }

  /* --- p1-017: taman sore ganjil --- */
  function gambarBangkuTaman(x, t) {
    P(ctx, x - 16, 238, 32, 3, '#a3744a');
    P(ctx, x - 16, 230, 32, 3, '#b58a4a');
    P(ctx, x - 14, 241, 3, 7, '#8a5f38');
    P(ctx, x + 11, 241, 3, 7, '#8a5f38');
    P(ctx, x - 14, 233, 3, 5, '#8a5f38');
    P(ctx, x + 11, 233, 3, 5, '#8a5f38');
    const duduk = [[x - 10, 226], [x - 4, 226], [x + 3, 226], [x + 9, 226], [x + 16, 223]];
    for (let i = 0; i < duduk.length; i++) {
      const [sx, sy] = duduk[i];
      gambarCahaya(sx, sy, 5, '#ffe9a3', t);
      lingkaran(ctx, sx, sy, 3, i === 4 ? '#ffd166' : '#a5d8ff');
      lingkaran(ctx, sx, sy, 1, '#fffdf2');
    }
  }
  function gambarKausSendiri(x) {
    P(ctx, x - 1, 212, 2, 34, '#8a5f38');
    const pos = [x - 12, x - 7, x + 8];
    const warna = ['#63c8ff', '#63c8ff', '#ffd166'];
    for (let i = 0; i < 3; i++) {
      P(ctx, pos[i], 216, 4, 8, warna[i]);
      P(ctx, pos[i], 224, 4, 4, warna[i]);
      P(ctx, pos[i] - 1, 215, 6, 1, '#f3efe4');
    }
    teksPx(ctx, '3', x + 14, 236, '#ffe9a3', 6);
  }
  function gambarManikGanjil(x, t) {
    P(ctx, x - 20, 232, 40, 1, '#b8955e');
    const mx = [-18, -13, -8, -3, 2, 7, 14];
    const mcol = ['#63c8ff', '#63c8ff', '#ff9d9d', '#ff9d9d', '#7dffa8', '#7dffa8', '#ffd166'];
    for (let i = 0; i < 7; i++) {
      const bob = i === 6 ? Math.sin(t * 2.4) * 1.5 : 0;
      lingkaran(ctx, x + mx[i], 228 + bob, 3, mcol[i]);
      lingkaran(ctx, x + mx[i] - 1, 227 + bob, 1, '#fffdf2');
    }
    P(ctx, x - 22, 246, 44, 2, '#8a5f38');
  }
  function gambarLampionPohon(x, t) {
    P(ctx, x - 16, 222, 3, 24, '#6b4a2c');
    lingkaran(ctx, x - 14, 218, 8, '#2f7a44');
    P(ctx, x + 13, 222, 3, 24, '#6b4a2c');
    lingkaran(ctx, x + 15, 218, 8, '#2f7a44');
    const lam = [[x - 20, 224], [x - 9, 220], [x + 8, 222], [x + 16, 226], [x + 22, 219]];
    for (let i = 0; i < lam.length; i++) {
      const denyut = 0.6 + 0.4 * Math.sin(t * 2.6 + i);
      ctx.globalAlpha = 0.35 * denyut;
      lingkaran(ctx, lam[i][0], lam[i][1], 5, '#ffd166');
      ctx.globalAlpha = 1;
      P(ctx, lam[i][0] - 2, lam[i][1] - 2, 4, 5, '#ff9d4a');
      P(ctx, lam[i][0] - 2, lam[i][1] - 2, 4, 2, '#ffd166');
    }
  }

  /* --- p1-018: toko permen --- */
  function gambarToplesDua(x) {
    P(ctx, x - 19, 234, 15, 14, '#f3efe4');
    P(ctx, x - 19, 234, 15, 3, '#c9564b');
    P(ctx, x - 18, 244, 13, 3, '#d9d2c0');
    for (let i = 0; i < 7; i++) lingkaran(ctx, x - 16 + (i % 4) * 3, 240 + Math.floor(i / 4) * 3, 1, '#ff6b6b');
    P(ctx, x + 5, 232, 15, 16, '#f3efe4');
    P(ctx, x + 5, 232, 15, 3, '#4a7fc0');
    P(ctx, x + 6, 244, 13, 3, '#d9d2c0');
    for (let i = 0; i < 9; i++) lingkaran(ctx, x + 8 + (i % 4) * 3, 238 + Math.floor(i / 4) * 3, 1, '#4fa5e8');
    teksPx(ctx, '7', x - 12, 250, '#c9564b', 5);
    teksPx(ctx, '9', x + 12, 250, '#4fa5e8', 5);
  }
  function gambarTandaBuka(x, t) {
    P(ctx, x - 14, 228, 28, 20, '#1e2a44');
    P(ctx, x - 14, 228, 28, 2, '#37476f');
    P(ctx, x - 1, 248, 3, 4, '#7a5230');
    gambarCahaya(x, 238, 12, '#7dffa8', t);
    teksPx(ctx, '>', x - 7, 233, '#7dffa8', 11);
    teksPx(ctx, '<', x + 6, 233, '#ff9d9d', 11);
  }
  function gambarTandaSama(x, t) {
    P(ctx, x - 8, 246, 16, 2, '#8a5f38');
    gambarCahaya(x, 234, 12, '#a5d8ff', t);
    teksPx(ctx, '=', x - 1, 228, '#a5d8ff', 13);
    teksPx(ctx, '=', x - 1, 227, '#d8f0ff', 13);
    P(ctx, x - 18, 238, 10, 10, '#f3efe4');
    P(ctx, x - 18, 238, 10, 2, '#ffd166');
    P(ctx, x + 8, 238, 10, 10, '#f3efe4');
    P(ctx, x + 8, 238, 10, 2, '#ffd166');
    teksPx(ctx, '8', x - 13, 250, '#8a5f38', 5);
    teksPx(ctx, '8', x + 13, 250, '#8a5f38', 5);
  }
  function gambarPapanHarga(x) { papanLebar(x, ['9 > 7', '8 = 8'], 44); }

  /* --- p1-019: lapangan lomba --- */
  function gambarGarisFinish(x, t) {
    P(ctx, x - 16, 220, 3, 26, '#8a5f38');
    P(ctx, x + 13, 224, 3, 22, '#8a5f38');
    const pelari = [[-27, 234], [-19, 229], [-10, 236], [-3, 231], [5, 227]];
    const warnaP = ['#63c8ff', '#ff9d9d', '#7dffa8', '#ffd166', '#bb8fff'];
    for (let i = 0; i < 5; i++) {
      const lompat = Math.round(Math.sin(t * 6 + i * 1.3) * 1.5);
      lingkaran(ctx, x + pelari[i][0], pelari[i][1] + lompat, 2.5, warnaP[i]);
      lingkaran(ctx, x + pelari[i][0] - 1, pelari[i][1] + lompat - 1, 1, '#fffdf2');
    }
    for (let i = 0; i <= 28; i++) {
      const py2 = 222 + Math.round(Math.sin(t * 2.5 + i * 0.4) * 1.5);
      P(ctx, x - 15 + i, py2, 1, 2, i % 2 ? '#c9564b' : '#fffdf2');
    }
    P(ctx, x + 16, 224, 8, 6, '#fffdf2');
    P(ctx, x + 16, 224, 4, 3, '#2a3757');
    P(ctx, x + 20, 227, 4, 3, '#2a3757');
    P(ctx, x - 16, 218, 3, 2, '#ffd166');
  }
  function gambarPodium(x) {
    P(ctx, x - 2, 222, 16, 24, '#ffd166');
    P(ctx, x - 2, 222, 16, 2, '#ffe9a3');
    teksPx(ctx, '1', x + 6, 232, '#8a5f38', 8);
    P(ctx, x - 18, 230, 16, 16, '#cdd6e2');
    P(ctx, x - 18, 230, 16, 2, '#f3efe4');
    teksPx(ctx, '2', x - 10, 236, '#5f6b7c', 7);
    P(ctx, x + 14, 238, 14, 8, '#c98a4b');
    P(ctx, x + 14, 238, 14, 2, '#e0a869');
    teksPx(ctx, '3', x + 21, 240, '#7a5230', 6);
    for (let i = 0; i < 8; i++) P(ctx, x - 20 + ((i * 13) % 42), 214 + (i % 3) * 3, 2, 2, ['#ff9d9d', '#63c8ff', '#7dffa8', '#ffd166'][i % 4]);
  }
  function gambarNomorDada(x) {
    P(ctx, x - 1, 212, 2, 36, '#8a5f38');
    const jx = [-13, -1, 11];
    for (let i = 0; i < 3; i++) {
      const cx2 = x + jx[i];
      const warnaJ = i === 0 ? '#c9564b' : i === 1 ? '#4a7fc0' : '#2aa85e';
      P(ctx, cx2 - 5, 218, 10, 12, warnaJ);
      P(ctx, cx2 - 5, 218, 10, 2, '#fffdf2');
      P(ctx, cx2 - 2, 216, 4, 2, warnaJ);
      teksPx(ctx, String(i + 4), cx2, 222, '#fffdf2', 6);
    }
  }
  function gambarBukuHalaman(x) {
    P(ctx, x - 14, 236, 28, 4, '#8a5f38');
    P(ctx, x - 13, 220, 26, 16, '#c9564b');
    P(ctx, x - 11, 222, 22, 12, '#f3efe4');
    P(ctx, x - 1, 222, 1, 12, '#b8b0a0');
    teksPx(ctx, '1', x - 6, 226, '#5f6b7c', 5);
    teksPx(ctx, '2', x + 5, 226, '#5f6b7c', 5);
    P(ctx, x + 9, 222, 2, 4, '#d9d2c0');
    teksPx(ctx, 'PERTAMA', x, 250, '#6b4a2c', 4);
  }

  /* --- p1-020: taman pola malam --- */
  function gambarLampuTepi(x, t) {
    for (let i = 0; i < 4; i++) {
      const lx = x - 18 + i * 12;
      P(ctx, lx, 230, 2, 16, '#5f6b7c');
      const col = i % 2 ? '#ffd166' : '#63c8ff';
      const denyut = 0.5 + 0.5 * Math.sin(t * 2.2 + i * 1.4);
      ctx.globalAlpha = 0.3 * denyut;
      lingkaran(ctx, lx + 1, 227, 5, col);
      ctx.globalAlpha = 1;
      lingkaran(ctx, lx + 1, 227, 2, col);
    }
    P(ctx, x - 20, 246, 44, 2, '#3a6556');
  }
  function gambarManikBenang(x, t) {
    P(ctx, x - 22, 230, 44, 1, '#b8955e');
    const grup = [2, 4, 6, 8];
    const colG = ['#63c8ff', '#7dffa8', '#ffd166', '#ff9d9d'];
    let gx = x - 21;
    for (let g = 0; g < 4; g++) {
      const awalG = gx;
      for (let i = 0; i < grup[g]; i++) {
        const bob = Math.sin(t * 2 + gx * 0.3) * 1;
        lingkaran(ctx, gx, 226 + bob, 2, colG[g]);
        gx += 1.8;
      }
      teksPx(ctx, String(grup[g]), Math.round((awalG + gx - 1.8) / 2), 236, colG[g], 4);
      gx += 2;
    }
    P(ctx, x - 24, 246, 48, 2, '#3a6556');
  }
  function gambarTetesan(x, t) {
    P(ctx, x - 14, 214, 28, 5, '#8a5f38');
    P(ctx, x - 14, 219, 28, 2, '#6b4a2c');
    P(ctx, x + 6, 214, 3, 6, '#8a5f38');
    const fase = (t * 1.2) % 1;
    lingkaran(ctx, x, 222 + fase * 14, 1.5, '#63c8ff');
    lingkaran(ctx, x - 3, 222 + ((fase + 0.5) % 1) * 14, 1.5, '#a5d8ff');
    P(ctx, x - 10, 236, 20, 6, '#7a8698');
    P(ctx, x - 8, 238, 16, 2, '#a5d8ff');
    const riak = (t * 1.2) % 1;
    ctx.globalAlpha = 1 - riak;
    lingkaran(ctx, x, 238, 3 + riak * 5, '#63c8ff');
    ctx.globalAlpha = 1;
    P(ctx, x - 10, 242, 20, 2, '#5f6b7c');
    P(ctx, x - 2, 245, 4, 3, '#5f6b7c');
  }
  function gambarTekaAngka(x, t) {
    P(ctx, x - 22, 200, 44, 36, '#1e2a44');
    P(ctx, x - 22, 200, 44, 2, '#37476f');
    P(ctx, x - 22, 234, 44, 2, '#141d33');
    P(ctx, x - 18, 236, 3, 6, '#7a5230');
    P(ctx, x + 15, 236, 3, 6, '#7a5230');
    teksPx(ctx, '3 5 7', x - 6, 208, '#fffdf2', 7);
    teksPx(ctx, '+2', x - 14, 222, '#a5d8ff', 6);
    teksPx(ctx, '=', x - 4, 222, '#a5d8ff', 6);
    gambarCahaya(x + 10, 226, 9, '#ffd166', t);
    const bob = Math.round(Math.sin(t * 2.4) * 1);
    teksPx(ctx, '?', x + 10, 219 + bob, '#ffd166', 9);
  }

  /* --- p1-021: tanda tambah --- */
  function gambarPapanPlus(x, t) {
    gambarCahaya(x, 222, 12, '#ffd166', t);
    P(ctx, x - 2, 232, 4, 16, '#7a5230');
    P(ctx, x - 10, 216, 20, 5, '#ffd166');          // plus pixel besar
    P(ctx, x - 2.5, 208, 5, 21, '#ffd166');
    P(ctx, x - 10, 216, 20, 5, '#ffe9a3');
    P(ctx, x - 9, 209, 3, 4, '#fff3cf');
    P(ctx, x + 6, 211, 2, 2, '#fff8e0');
    P(ctx, x - 14, 221, 2, 2, '#fff8e0');
  }
  function gambarDuaKeranjang(x, t) {
    const keranjang = (kx, n) => {                  // n = jumlah permen (3 / 2)
      P(ctx, kx - 10, 240, 20, 4, '#b8863e');
      P(ctx, kx - 8, 244, 16, 5, '#a3743a');
      for (let i = 0; i < n; i++) {
        lingkaran(ctx, kx - 6 + i * 5, 238, 2.4, '#ff8fb0');
        P(ctx, kx - 7 + i * 5, 237, 1, 1, '#ffc2d4');
      }
      teksPx(ctx, String(n), kx, 250, '#fffdf2', 6);
    };
    keranjang(x - 18, 3);
    keranjang(x + 18, 2);
    P(ctx, x - 1.5, 226, 3, 10, '#ffd166');
    P(ctx, x - 4, 228.5, 8, 3, '#ffd166');
    const bob = Math.round(Math.sin(t * 2.2) * 1);
    teksPx(ctx, '3 + 2', x, 214 + bob, '#ffe9a3', 6);
  }
  function gambarWadahGabung(x, t) {
    gambarCahaya(x, 236, 10, '#ffd166', t);
    P(ctx, x - 13, 238, 26, 5, '#b8863e');
    P(ctx, x - 10, 243, 20, 6, '#a3743a');
    for (let i = 0; i < 5; i++) {                   // 5 permen bisa dihitung
      lingkaran(ctx, x - 9 + i * 4.5, 236, 2.4, '#ff8fb0');
      P(ctx, x - 10 + i * 4.5, 235, 1, 1, '#ffc2d4');
    }
    teksPx(ctx, '5', x, 250, '#fffdf2', 6);
    teksPx(ctx, '3 + 2 = 5', x, 222, '#ffe9a3', 6);
  }
  function gambarPapanEt(x, t) {
    papanLebar(x, ['et -> +'], 52);
    const denyut = 0.5 + 0.3 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.5 * denyut;
    teksPx(ctx, 'dan', x, 246 - 24, '#a5d8ff', 6);
    ctx.globalAlpha = 1;
  }
  /* --- p1-022: tanda kurang --- */
  function gambarPapanMin(x, t) {
    gambarCahaya(x, 218, 12, '#a5d8ff', t);
    P(ctx, x - 2, 232, 4, 16, '#7a5230');
    P(ctx, x - 11, 214, 22, 5, '#a5d8ff');          // minus pixel besar
    P(ctx, x - 11, 214, 22, 2, '#d0e6ff');
    P(ctx, x + 8, 208, 2, 2, '#d0e6ff');
  }
  function gambarKantongLima(x, t) {
    P(ctx, x - 12, 236, 24, 14, '#c9a05e');         // kantong kain
    P(ctx, x - 10, 250, 20, 2, '#a3763c');
    P(ctx, x - 13, 234, 26, 3, '#b8863e');
    for (let i = 0; i < 5; i++) {                   // 5 permen tampak
      lingkaran(ctx, x - 9 + i * 4.5, 240, 2.4, '#ff8fb0');
      P(ctx, x - 10 + i * 4.5, 239, 1, 1, '#ffc2d4');
    }
    teksPx(ctx, '5', x, 252, '#fffdf2', 6);
  }
  function gambarTemanPergi(x, t) {
    const maju = Math.round(Math.sin(t * 1.4) * 3);
    K.gambar.bayangan(ctx, x + 8 + maju, 251, 7);
    K.gambar.bolaLentera(ctx, x + 8 + maju, 244, '#a5d8ff', '#4a7fc0', '', t * 2);
    P(ctx, x + 16 + maju, 246, 8, 7, '#c9a05e');    // bekal kecil di tangan
    for (let i = 0; i < 2; i++) {                   // 2 permen dibawa
      lingkaran(ctx, x + 18 + maju + i * 4, 245, 2, '#ff8fb0');
    }
    const debu = Math.floor(t * 6) % 3;             // langkah berdebu
    for (let i = 0; i < 2; i++) {
      P(ctx, x - 6 - i * 5 - debu, 250 - i * 2, 2, 1, 'rgba(255,253,242,.5)');
    }
    teksPx(ctx, '-2', x - 4, 232, '#a5d8ff', 6);
  }
  function gambarPapanSisa(x, t) {
    papanLebar(x, ['5-2=3'], 46);
    P(ctx, x - 8, 238, 16, 3, '#b8863e');           // wadah kecil sisa
    P(ctx, x - 6, 241, 12, 4, '#a3743a');
    for (let i = 0; i < 3; i++) {                   // 3 permen tersisa
      lingkaran(ctx, x - 4 + i * 4, 237, 2.2, '#ff8fb0');
    }
  }
  /* --- p1-023: tanda kali --- */
  function gambarPapanKali(x, t) {
    gambarCahaya(x, 220, 12, '#ffd166', t);
    P(ctx, x - 2, 232, 4, 16, '#7a5230');
    for (let i = -3; i <= 3; i++) {                 // silang pixel besar
      P(ctx, x + i - 1, 216 + Math.abs(i), 3, 3, '#ffd166');
      P(ctx, x + i - 1, 226 - Math.abs(i), 3, 3, '#ffd166');
    }
    P(ctx, x - 5, 212, 2, 2, '#fff3cf');
    P(ctx, x + 6, 222, 2, 2, '#fff3cf');
  }
  function gambarBarisParade(x, t) {
    teksPx(ctx, '3 x 4', x, 200, '#ffe9a3', 6);
    for (let r = 0; r < 3; r++) {                   // 3 baris ...
      P(ctx, x - 20, 212 + r * 11, 40, 1, 'rgba(255,253,242,.35)');
      for (let k = 0; k < 4; k++) {                 // ... tiap baris 4 penduduk
        const px = x - 15 + k * 10, py = 212 + r * 11;
        const gelap = Math.sin(t * 3 + r + k) > 0.6;
        lingkaran(ctx, px, py, 3, gelap ? '#4a7fc0' : '#a5d8ff');
        P(ctx, px - 1, py - 2, 1, 1, '#e8f4ff');
      }
    }
    teksPx(ctx, '4', x - 15, 204, '#a5d8ff', 6);
  }
  function gambarPapan444(x, t) {
    papanLebar(x, ['4+4+4', '= 12'], 48);
  }
  function gambarPapanTahunX(x, t) {
    papanLebar(x, ['1631', 'tanda x'], 46);
  }
  /* --- p1-024: tanda bagi --- */
  function gambarPapanBagi(x, t) {
    gambarCahaya(x, 220, 12, '#7dffa8', t);
    P(ctx, x - 2, 232, 4, 16, '#7a5230');
    P(ctx, x - 9, 216, 18, 4, '#7dffa8');           // garis tengah
    lingkaran(ctx, x, 209, 2.6, '#7dffa8');         // titik atas
    lingkaran(ctx, x, 227, 2.6, '#7dffa8');         // titik bawah
    P(ctx, x + 7, 206, 2, 2, '#c8ffd8');
  }
  function gambarNampanKue(x, t) {
    P(ctx, x - 27, 244, 54, 4, '#c9a763');          // nampan
    P(ctx, x - 27, 244, 54, 1, '#e0c784');
    for (let i = 0; i < 8; i++) {                   // 8 kue satu baris
      const kx = x - 24 + i * 6.6;
      lingkaran(ctx, kx, 240, 3, '#f2c17d');
      lingkaran(ctx, kx, 239, 2, '#ffd9a3');
      P(ctx, kx - 1, 237, 1, 1, '#fff3cf');
    }
    teksPx(ctx, '8', x, 250, '#fffdf2', 6);
  }
  function gambarPiringMasing(x, t) {
    const piring = (px, n, lbl) => {
      lingkaran(ctx, px, 246, 9, '#e8e0d0');
      lingkaran(ctx, px, 246, 7, '#f8f2e4');
      for (let i = 0; i < n; i++) {                 // tiap piring 4 kue
        lingkaran(ctx, px - 4.5 + i * 3, 243, 2.2, '#f2c17d');
      }
      teksPx(ctx, lbl, px, 250, '#fffdf2', 6);
    };
    piring(x - 14, 4, '4');
    piring(x + 14, 4, '4');
    teksPx(ctx, '8 : 2 = 4', x, 226, '#7dffa8', 6);
  }
  function gambarPapanObelus(x, t) {
    papanLebar(x, ['1659', 'obelus'], 46);
  }
  /* --- p1-025: tanda sama dengan --- */
  function gambarPapanEq(x, t) {
    gambarCahaya(x, 220, 12, '#ffe9a3', t);
    P(ctx, x - 2, 232, 4, 16, '#7a5230');
    P(ctx, x - 10, 212, 20, 4, '#ffe9a3');          // dua garis kembar
    P(ctx, x - 10, 221, 20, 4, '#ffe9a3');
    P(ctx, x - 10, 212, 20, 1, '#fff8e0');
    P(ctx, x - 10, 221, 20, 1, '#fff8e0');
  }
  function gambarTimbangSetara(x, t) {
    P(ctx, x - 10, 250, 20, 2, '#7a5230');
    P(ctx, x - 2, 224, 4, 26, '#8a5f38');
    P(ctx, x - 22, 224, 44, 2, '#a3744a');          // lengan rata
    P(ctx, x - 24, 225, 1, 6, '#5f4426');
    P(ctx, x + 23, 225, 1, 6, '#5f4426');
    P(ctx, x - 30, 231, 13, 3, '#c9a763');
    P(ctx, x + 17, 231, 13, 3, '#c9a763');
    teksPx(ctx, '3+4', x - 24, 236, '#fffdf2', 6);
    teksPx(ctx, '7', x + 24, 236, '#fffdf2', 6);
    teksPx(ctx, '=', x, 214, '#ffe9a3', 7);
  }
  function gambarTimbangMiring(x, t) {
    P(ctx, x - 10, 250, 20, 2, '#7a5230');
    P(ctx, x - 2, 224, 4, 26, '#8a5f38');
    for (let i = -22; i <= 22; i++) {               // lengan miring: kanan 8 lebih berat turun
      P(ctx, x + i, 228 + Math.round(i * 0.16), 1, 2, '#a3744a');
    }
    P(ctx, x - 24, 220, 1, 6, '#5f4426');
    P(ctx, x + 23, 230, 1, 6, '#5f4426');
    P(ctx, x - 30, 218, 13, 3, '#c9a763');
    P(ctx, x + 17, 236, 13, 3, '#c9a763');
    teksPx(ctx, '5', x - 24, 210, '#fffdf2', 6);
    teksPx(ctx, '8', x + 24, 240, '#fffdf2', 6);
    teksPx(ctx, '!', x, 210, '#ff9d9d', 7);
  }
  function gambarPapan1557(x, t) {
    papanLebar(x, ['1557', '='], 40);
  }
  /* --- p1-026: lebih besar & kecil --- */
  function gambarRahangTerbuka(x, t) {
    const napas = Math.sin(t * 2) * 1.5;            // rahang membuka menutup tanpa wajah
    P(ctx, x - 14, 214 - napas, 28, 4, '#e8e4d8');
    for (let i = 0; i < 5; i++) P(ctx, x - 12 + i * 6, 218 - napas, 3, 3, '#fffdf2');
    P(ctx, x - 14, 246 + napas, 28, 4, '#e8e4d8');
    for (let i = 0; i < 5; i++) P(ctx, x - 12 + i * 6, 243 + napas, 3, 3, '#fffdf2');
    P(ctx, x + 12, 220 - napas, 4, 26 + napas * 2, '#e8e4d8');
    teksPx(ctx, '>', x + 6, 228, '#ffd166', 7);
  }
  function gambarKartu93(x, t) {
    P(ctx, x - 21, 216, 42, 26, '#fffdf2');
    P(ctx, x - 21, 216, 42, 2, '#c8d8e8');
    P(ctx, x - 21, 240, 42, 2, '#c8d8e8');
    teksPx(ctx, '9 > 3', x, 222, '#2a3757', 7);
    for (let i = 0; i < 9; i++) {                   // 9 titik kiri (3x3)
      lingkaran(ctx, x - 18 + (i % 3) * 4, 226 + Math.floor(i / 3) * 4, 1.4, '#4a8fc8');
    }
    for (let i = 0; i < 3; i++) {                   // 3 titik kanan
      lingkaran(ctx, x + 10 + i * 4, 230, 1.4, '#ff9d9d');
    }
  }
  function gambarKartuBalik(x, t) {
    P(ctx, x - 21, 216, 42, 26, '#fffdf2');
    P(ctx, x - 21, 216, 42, 2, '#c8d8e8');
    P(ctx, x - 21, 240, 42, 2, '#c8d8e8');
    teksPx(ctx, '2 < 6', x, 222, '#2a3757', 7);
    for (let i = 0; i < 2; i++) {
      lingkaran(ctx, x - 18 + i * 4, 230, 1.4, '#4a8fc8');
    }
    for (let i = 0; i < 6; i++) {                   // 6 titik kanan (3x2)
      lingkaran(ctx, x + 10 + (i % 3) * 4, 226 + Math.floor(i / 3) * 4, 1.4, '#ff9d9d');
    }
  }
  function gambarPapanArah(x, t) {
    papanLebar(x, ['> besar', '< kecil'], 54);
  }
  /* --- p1-027: tanda kurung --- */
  function gambarGerbangKurung(x, t) {
    gambarCahaya(x, 230, 13, '#ffd166', t);
    P(ctx, x - 16, 210, 4, 38, '#ffd166');          // kurung kiri
    P(ctx, x - 19, 210, 7, 4, '#ffd166');
    P(ctx, x - 19, 244, 7, 4, '#ffd166');
    P(ctx, x + 12, 210, 4, 38, '#ffd166');          // kurung kanan
    P(ctx, x + 12, 210, 7, 4, '#ffd166');
    P(ctx, x + 12, 244, 7, 4, '#ffd166');
    teksPx(ctx, 'dulu', x, 224, '#fff8e0', 6);
  }
  function gambarPapanDalam(x, t) {
    papanLebar(x, ['(2+3)x2', '= 10'], 52);
  }
  function gambarPapanTanpa(x, t) {
    papanLebar(x, ['2+3x2', '= 8'], 46);
  }
  function gambarPapanUrutan(x, t) {
    papanLebar(x, ['( ) dulu', 'x : lalu', '+ - akhir'], 64);
  }
  /* --- p1-028: tanda koma desimal --- */
  function gambarPapanKoma(x, t) {
    gambarCahaya(x, 224, 12, '#ff9db8', t);
    P(ctx, x - 2, 232, 4, 16, '#7a5230');
    P(ctx, x - 3, 210, 6, 9, '#ff9db8');            // koma besar
    P(ctx, x - 1, 219, 4, 5, '#ff9db8');
    P(ctx, x - 1, 224, 2, 3, '#c86a8a');
    teksPx(ctx, 'utuh kepingan', x, 206, '#ffd0d8', 6);
  }
  function gambarKueUtuhSetengah(x, t) {
    P(ctx, x - 24, 244, 48, 4, '#c9a763');          // nampan
    lingkaran(ctx, x - 13, 238, 7, '#f2c17d');      // kue utuh
    lingkaran(ctx, x - 13, 236, 5, '#ffd9a3');
    P(ctx, x - 16, 232, 3, 2, '#fff3cf');
    ctx.fillStyle = '#f2c17d';                      // setengah kue
    ctx.beginPath();
    ctx.arc(x + 10, 240, 7, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ffd9a3';
    ctx.beginPath();
    ctx.arc(x + 10, 240, 5, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    P(ctx, x + 3, 240, 14, 1, '#e8b070');
    teksPx(ctx, '1,5', x, 250, '#fffdf2', 6);
  }
  function gambarPapan15(x, t) {
    papanLebar(x, ['1,5', 'kue'], 40);
  }
  function gambarKueDuaKoma(x, t) {
    P(ctx, x - 26, 244, 52, 4, '#c9a763');
    for (let i = 0; i < 2; i++) {                   // 2 kue utuh
      lingkaran(ctx, x - 16 + i * 16, 238, 7, '#f2c17d');
      lingkaran(ctx, x - 16 + i * 16, 236, 5, '#ffd9a3');
      P(ctx, x - 19 + i * 16, 232, 3, 2, '#fff3cf');
    }
    ctx.fillStyle = '#f2c17d';                      // setengah kue
    ctx.beginPath();
    ctx.arc(x + 12, 240, 7, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ffd9a3';
    ctx.beginPath();
    ctx.arc(x + 12, 240, 5, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    teksPx(ctx, '2,5', x, 250, '#fffdf2', 6);
  }
  /* --- p1-029: tak hingga --- */
  function gambarDelapanMiring(x, t) {
    gambarCahaya(x, 226, 14, '#a8e8d8', t);
    ctx.strokeStyle = '#a8e8d8';                    // dua cincin bersambung: lambang tak hingga
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x - 7, 226, 7, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x + 7, 226, 7, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = '#d8fff0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x - 7, 226, 7, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x + 7, 226, 7, 0, Math.PI * 2);
    ctx.stroke();
  }
  function gambarJalanMelingkar(x, t) {
    for (let i = 0; i < 9; i++) {                   // jalan berkelok naik bukit
      const jx = x - 22 + i * 5 + Math.round(Math.sin(i * 0.9) * 6);
      const jy = 246 - i * 3;
      P(ctx, jx, jy, 8, 3, i % 2 ? '#4a6a8e' : '#5a7aa0');
      if (i % 3 === 0) P(ctx, jx + 3, jy - 2, 1, 1, 'rgba(255,253,242,.6)');
    }
    teksPx(ctx, 'tanpa ujung', x + 2, 210, '#a8c4f0', 6);
  }
  function gambarBintangTerbanyak(x, t) {
    for (let i = 0; i < 18; i++) {                  // 18 bintang bertabur
      const sx = x - 22 + ((i * 13) % 44);
      const sy = 206 + ((i * 7) % 36);
      const kelip = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 3 + i * 1.7));
      ctx.globalAlpha = kelip;
      P(ctx, sx, sy, i % 5 === 0 ? 2 : 1, i % 5 === 0 ? 2 : 1, i % 3 ? '#fffdf2' : '#ffe9a3');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, '?', x, 198, '#ffe9a3', 7);
  }
  function gambarPapan1655(x, t) {
    papanLebar(x, ['1655', 'Wallis'], 46);
  }
  /* --- p1-030: membaca kalimat matematika --- */
  function gambarBukuTerbuka(x, t) {
    P(ctx, x - 20, 240, 40, 3, '#8a5f38');          // sampul
    P(ctx, x - 19, 228, 18, 12, '#f8f4e8');         // halaman kiri
    P(ctx, x + 1, 228, 18, 12, '#f8f4e8');          // halaman kanan
    P(ctx, x - 1, 228, 2, 12, '#d8ccb4');
    for (let i = 0; i < 3; i++) P(ctx, x - 17, 230 + i * 3, 13, 1, '#b8b0a0');
    teksPx(ctx, '2+3=5', x + 10, 233, '#2a3757', 5);
    const bob = Math.round(Math.sin(t * 2.2) * 1);
    gambarCahaya(x, 222, 8, '#ffe9a3', t);
    teksPx(ctx, 'baca', x, 220 + bob, '#ffe9a3', 6);
  }
  function gambarKartuKalimat(x, t) {
    const kartu = ['2', '+', '3', '=', '5'];
    for (let i = 0; i < 5; i++) {
      const kx = x - 22 + i * 11;
      P(ctx, kx - 4, 234, 9, 12, i % 2 ? '#f8f4e8' : '#fffdf2');
      P(ctx, kx - 4, 234, 9, 1, '#c8b890');
      teksPx(ctx, kartu[i], kx + 1, 238, '#2a3757', 6);
    }
    teksPx(ctx, 'dua tambah tiga', x, 226, '#ffe9a3', 6);
  }
  function gambarPapanKalimat2(x, t) {
    papanLebar(x, ['6-1=5'], 46);
  }
  function gambarPapanTebak(x, t) {
    papanLebar(x, ['3+2=?'], 48);
    gambarCahaya(x, 214, 9, '#ffd166', t);
    const bob = Math.round(Math.sin(t * 2.6) * 1);
    teksPx(ctx, '?', x, 208 + bob, '#ffd166', 8);
  }

  /* ---------- p1-031..p1-042: penjumlahan & pengurangan ---------- */
  /* --- p1-031: lingkar kelereng --- */
  function gambarLingkarPasir(x, t) {
    lingkaran(ctx, x, 240, 26, '#e8d5a8');
    lingkaran(ctx, x, 240, 21, '#f2e2b8');
    for (let i = 0; i < 5; i++) P(ctx, x - 14 + i * 7, 236 + (i % 2) * 6, 2, 1, '#d9c28c');
    gambarCahaya(x, 236, 12, '#ffe9a3', t);
  }
  function gambarKelerengDua(x, t) {
    lingkaran(ctx, x, 240, 24, '#e8d5a8');
    lingkaran(ctx, x, 240, 19, '#f2e2b8');
    const bob = Math.round(Math.sin(t * 2.4) * 1);
    lingkaran(ctx, x - 6, 238 + bob, 4, '#4a8fc8');
    lingkaran(ctx, x - 7, 237 + bob, 2, '#a5d8ff');
    lingkaran(ctx, x + 5, 240 - bob, 4, '#4a8fc8');
    lingkaran(ctx, x + 4, 239 - bob, 2, '#a5d8ff');
    teksPx(ctx, '2', x, 216, '#fffdf2', 7);
  }
  function gambarKelerengTiga(x, t) {
    lingkaran(ctx, x, 240, 24, '#e8d5a8');
    lingkaran(ctx, x, 240, 19, '#f2e2b8');
    const bob = Math.round(Math.sin(t * 2.4) * 1);
    lingkaran(ctx, x - 9, 238 - bob, 4, '#e86a5a');
    lingkaran(ctx, x - 10, 237 - bob, 2, '#ffb0a0');
    lingkaran(ctx, x, 241, 4, '#e86a5a');
    lingkaran(ctx, x - 1, 240, 2, '#ffb0a0');
    lingkaran(ctx, x + 9, 238 + bob, 4, '#e86a5a');
    lingkaran(ctx, x + 8, 237 + bob, 2, '#ffb0a0');
    teksPx(ctx, '3', x, 216, '#fffdf2', 7);
  }
  function gambarGabungLima(x, t) {
    gambarCahaya(x, 232, 15, '#ffe9a3', t);
    lingkaran(ctx, x, 240, 26, '#e8d5a8');
    lingkaran(ctx, x, 240, 21, '#f2e2b8');
    lingkaran(ctx, x - 2, 239, 4, '#4a8fc8');       // 2 biru
    lingkaran(ctx, x + 5, 234, 4, '#4a8fc8');
    lingkaran(ctx, x + 12, 240, 4, '#e86a5a');      // 3 merah
    lingkaran(ctx, x + 19, 234, 4, '#e86a5a');
    lingkaran(ctx, x + 26, 239, 4, '#e86a5a');
    teksPx(ctx, '2+3=5', x + 12, 212, '#7dffa8', 7);
  }
  /* --- p1-032: jari penghitung --- */
  function jariTangan(x, y, naik) {                 // telapak + 5 jari, `naik` berdiri
    P(ctx, x - 9, y, 18, 10, '#e8b08a');
    P(ctx, x - 9, y, 18, 2, '#f2c8a4');
    for (let i = 0; i < 5; i++) {
      const fx = x - 9 + i * 4;
      if (i < naik) { P(ctx, fx, y - 9, 3, 9, '#e8b08a'); P(ctx, fx, y - 9, 3, 2, '#f2c8a4'); }
      else P(ctx, fx, y - 3, 3, 3, '#d89870');
    }
  }
  function gambarTelapak(x, t) {
    const napas = Math.sin(t * 2) * 1;
    jariTangan(x - 13, 240 + napas, 5);
    jariTangan(x + 13, 240 - napas, 5);
    gambarCahaya(x, 226, 13, '#ffe9a3', t);
    teksPx(ctx, '10', x, 214, '#ffe9a3', 8);
  }
  function gambarAngkatTiga(x, t) {
    jariTangan(x, 242, 3);
    teksPx(ctx, '3', x, 220, '#ffe9a3', 8);
    teksPx(ctx, '2 menekuk', x, 254, '#e8b08a', 6);
  }
  function gambarAngkatTigaEmpat(x, t) {
    jariTangan(x + 2, 244, 3);
    jariTangan(x + 28, 244, 4);
    teksPx(ctx, '3+4=7', x + 14, 210, '#7dffa8', 7);
  }
  function gambarJariPenuh(x, t) {
    gambarCahaya(x, 224, 14, '#ffe9a3', t);
    jariTangan(x - 13, 240, 5);
    jariTangan(x + 13, 240, 5);
    teksPx(ctx, '10', x, 212, '#ffe9a3', 9);
  }
  /* --- p1-033: kotak sepuluh gudang --- */
  function kotakIsiSepuluh(x, y, isi) {             // kotak 2 baris x 5 tempat
    P(ctx, x - 27, y - 2, 54, 28, '#8a6a44');
    P(ctx, x - 27, y - 2, 54, 2, '#a3825a');
    P(ctx, x - 24, y + 1, 48, 22, '#5f4426');
    for (let i = 0; i < 10; i++) {
      const sx = x - 22 + (i % 5) * 9, sy = y + 3 + Math.floor(i / 5) * 10;
      P(ctx, sx, sy, 7, 8, '#3a2c1e');
      if (i < isi) { P(ctx, sx + 1, sy + 1, 5, 6, '#c9a763'); P(ctx, sx + 1, sy + 1, 5, 2, '#e0c784'); }
    }
  }
  function gambarKotakSepuluh(x, t) {
    kotakIsiSepuluh(x, 196, 8);
    teksPx(ctx, '8 isi', x + 18, 232, '#fffdf2', 6);
  }
  function gambarLimaDatang(x, t) {
    kotakIsiSepuluh(x, 196, 10);
    for (let i = 0; i < 3; i++) {                   // 3 bungkah menunggu di lantai
      P(ctx, x + 32 + (i % 2) * 8, 218 - Math.floor(i / 2) * 8, 7, 7, '#c9a763');
      P(ctx, x + 32 + (i % 2) * 8, 218 - Math.floor(i / 2) * 8, 7, 2, '#e0c784');
    }
    teksPx(ctx, '5 datang', x + 16, 240, '#ffe9a3', 6);
  }
  function gambarTumpukTiga(x, t) {
    kotakIsiSepuluh(x, 196, 10);
    for (let i = 0; i < 3; i++) {                   // tumpukan 3 di puncak
      P(ctx, x - 8, 190 - i * 8, 8, 7, '#c9a763');
      P(ctx, x - 8, 190 - i * 8, 8, 2, '#e0c784');
    }
    teksPx(ctx, '3', x + 6, 172, '#ffe9a3', 7);
  }
  function gambarPapanDelapanLima(x, t) {
    papanLebar(x, ['8+5', '= 13'], 46);
  }
  /* --- p1-034/037: papan bersusun tiga baris --- */
  function papanBersusun3(x, a, b, hsl, op, lebar, warnaHsl) {
    const lbr = lebar || 42;
    P(ctx, x - lbr / 2, 200, lbr, 48, '#1e2a44');
    P(ctx, x - lbr / 2, 200, lbr, 2, '#37476f');
    teksPx(ctx, a, x + 4, 205, '#fffdf2', 7);
    teksPx(ctx, op + ' ' + b, x + 4, 217, '#ffe9a3', 7);
    P(ctx, x - lbr / 2 + 6, 230, lbr - 12, 1, '#5a6a94');
    teksPx(ctx, hsl, x + 4, 233, warnaHsl || '#7dffa8', 7);
    P(ctx, x - lbr / 2, 246, lbr, 2, '#141d33');
    P(ctx, x - lbr / 2 + 4, 248, 3, 6, '#7a5230');
    P(ctx, x + lbr / 2 - 7, 248, 3, 6, '#7a5230');
  }
  function gambarPapanBersusun(x, t) {
    papanBersusun3(x, '23', '14', '', '+', 42);
  }
  function gambarKolomSatuan(x, t) {
    papanBersusun3(x, '23', '14', '7', '+', 42);
  }
  function gambarKolomPuluhan(x, t) {
    papanBersusun3(x, '23', '14', '37', '+', 42);
  }
  function gambarPapanHasilTambah(x, t) {
    papanLebar(x, ['23+14', '= 37'], 52);
  }
  /* --- p1-035: pos hitung menyimpan --- */
  function gambarPosHitung(x, t) {
    P(ctx, x - 22, 224, 3, 22, '#6a4c2e');          // kaki pos
    P(ctx, x + 14, 224, 3, 22, '#6a4c2e');
    P(ctx, x - 26, 196, 28, 24, '#8a6a44');         // kotak besar: 3 ikat (di atas)
    for (let i = 0; i < 3; i++) {
      const bx = x - 24 + (i % 2) * 10, by = 206 - Math.floor(i / 2) * 10;
      P(ctx, bx, by, 9, 9, '#c9a763');
      P(ctx, bx, by + 3, 9, 2, '#8a6a44');
    }
    P(ctx, x + 6, 202, 24, 16, '#8a6a44');          // kotak kecil: 5 keping (di atas)
    for (let i = 0; i < 5; i++)
      lingkaran(ctx, x + 10 + (i % 3) * 7, 206 + Math.floor(i / 3) * 7, 2.2, '#ffe9a3');
    teksPx(ctx, '35', x, 182, '#fffdf2', 8);
  }
  function gambarLimaTujuh(x, t) {
    for (let i = 0; i < 5; i++) lingkaran(ctx, x - 2 + (i % 3) * 7, 212 + Math.floor(i / 3) * 8, 2.4, '#a5d8ff');
    for (let i = 0; i < 7; i++) lingkaran(ctx, x + 20 + (i % 4) * 7, 212 + Math.floor(i / 4) * 8, 2.4, '#ffb0a0');
    teksPx(ctx, '5+7=12', x + 16, 196, '#7dffa8', 7);
  }
  function gambarSimpanSatu(x, t) {
    P(ctx, x - 26, 206, 52, 42, '#1e2a44');
    P(ctx, x - 26, 206, 52, 2, '#37476f');
    teksPx(ctx, '3', x - 12, 211, '#ffe9a3', 8);
    teksPx(ctx, '1', x + 14, 211, '#ff9d9d', 8);    // satu disimpan
    P(ctx, x - 6, 219, 16, 1, '#ff9d9d');           // panah simpan
    P(ctx, x + 7, 217, 3, 3, '#ff9d9d'); P(ctx, x + 7, 221, 3, 3, '#ff9d9d');
    teksPx(ctx, '2', x + 14, 230, '#7dffa8', 8);
    P(ctx, x - 26, 246, 52, 2, '#141d33');
  }
  function gambarPapanSimpan(x, t) {
    papanLebar(x, ['35+7', '= 42'], 46);
  }
  /* --- p1-036: piknik kue --- */
  function piringKue(x, jml, makan) {               // piring + kue (makan = remah)
    lingkaran(ctx, x, 244, 16, '#e8e0d0');
    lingkaran(ctx, x, 244, 13, '#f8f2e4');
    for (let i = 0; i < jml; i++) {
      const kx = x - 10 + i * (jml > 1 ? 20 / (jml - 1) : 0);
      lingkaran(ctx, kx, 240, 3.4, '#f2c17d');
      lingkaran(ctx, kx, 239, 2.2, '#ffd9a3');
    }
    if (makan) { P(ctx, x + 13, 243, 2, 1, '#c98a4b'); P(ctx, x + 16, 245, 1, 1, '#c98a4b'); }
  }
  function gambarPiringLima(x, t) {
    piringKue(x, 5, false);
    teksPx(ctx, '5', x, 216, '#fffdf2', 7);
  }
  function gambarDuaDimakan(x, t) {
    piringKue(x, 3, true);
    teksPx(ctx, '5-2', x, 216, '#ff9d9d', 7);
  }
  function gambarTigaTersisa(x, t) {
    piringKue(x, 3, true);
    teksPx(ctx, '5-2=3', x, 214, '#7dffa8', 7);
  }
  function gambarBungkusNanti(x, t) {
    P(ctx, x - 14, 232, 28, 13, '#f8f2e4');         // kertas bungkus
    P(ctx, x - 14, 232, 28, 2, '#e8dcc8');
    P(ctx, x - 1, 232, 2, 13, '#c9a763');           // tali silang
    P(ctx, x - 14, 238, 28, 1, '#c9a763');
    teksPx(ctx, '3 dijaga', x, 220, '#ffe9a3', 6);
  }
  /* --- p1-037: pengurangan bersusun --- */
  function gambarPapanKurangBersusun(x, t) {
    papanBersusun3(x, '47', '23', '', '-', 42);
  }
  function gambarKurangSatuan(x, t) {
    papanBersusun3(x, '47', '23', '4', '-', 42);
  }
  function gambarKurangPuluhan(x, t) {
    papanBersusun3(x, '47', '23', '24', '-', 42);
  }
  function gambarPapanHasilKurang(x, t) {
    papanLebar(x, ['47-23', '= 24'], 52);
  }
  /* --- p1-038: teknik meminjam --- */
  function gambarPapanTakMuat(x, t) {
    papanBersusun3(x, '42', '15', '?', '-', 42, '#ff9d9d');
  }
  function gambarPinjamSatu(x, t) {
    gambarCahaya(x + 18, 224, 12, '#ff9d9d', t);
    P(ctx, x - 2, 226, 14, 14, '#c9a763');          // satu ikat dipinjam
    P(ctx, x - 2, 232, 14, 2, '#8a6a44');
    teksPx(ctx, '1', x + 5, 228, '#5f4426', 7);
    P(ctx, x + 14, 232, 12, 1, '#ff9d9d');          // panah ke satuan
    P(ctx, x + 24, 230, 3, 3, '#ff9d9d'); P(ctx, x + 24, 234, 3, 3, '#ff9d9d');
    for (let i = 0; i < 10; i++)                    // ikat dibuka: 10 keping
      lingkaran(ctx, x + 30 + (i % 5) * 4, 230 + Math.floor(i / 5) * 6, 1.6, '#ffe9a3');
    teksPx(ctx, '4 jadi 3', x + 4, 210, '#ffe9a3', 6);
    teksPx(ctx, 'jadi 12', x + 34, 212, '#ffe9a3', 6);
  }
  function gambarDuaBelasKurangLima(x, t) {
    for (let i = 0; i < 12; i++) {
      const dx = x - 2 + (i % 6) * 8, dy = 226 + Math.floor(i / 6) * 9;
      if (i < 5) P(ctx, dx - 2, dy + 1, 8, 1, '#ff9d9d');   // 5 keping terpakai
      lingkaran(ctx, dx, dy, 2.4, i < 5 ? '#c86a8a' : '#ffe9a3');
    }
    teksPx(ctx, '12-5=7', x + 16, 210, '#7dffa8', 7);
  }
  function gambarPapanHasilPinjam(x, t) {
    papanLebar(x, ['42-15', '= 27'], 48);
  }
  /* --- p1-039: keluarga angka --- */
  function gambarTigaSahabat(x, t) {
    gambarCahaya(x, 228, 14, '#ffe9a3', t);
    teksPx(ctx, '3', x - 16, 226 + Math.round(Math.sin(t * 2) * 1.5), '#a5d8ff', 11);
    teksPx(ctx, '4', x, 224 + Math.round(Math.sin(t * 2 + 1.5) * 1.5), '#7dffa8', 12);
    teksPx(ctx, '7', x + 16, 227 + Math.round(Math.sin(t * 2 + 3) * 1.5), '#ffd166', 11);
  }
  function kartuKecil(cx, isi, latar) {
    P(ctx, cx - 16, 200, 32, 18, latar);
    P(ctx, cx - 16, 200, 32, 2, '#c8b890');
    P(ctx, cx - 16, 216, 32, 2, '#c8b890');
    teksPx(ctx, isi, cx, 205, '#2a3757', 5);
  }
  function gambarKalimatTambahDua(x, t) {
    kartuKecil(x - 18, '3+4=7', '#fffdf2');
    kartuKecil(x + 18, '4+3=7', '#e8f4ff');
    teksPx(ctx, 'tambah', x, 188, '#ffe9a3', 6);
  }
  function gambarKalimatKurangDua(x, t) {
    kartuKecil(x - 18, '7-3=4', '#e8ffe8');
    kartuKecil(x + 18, '7-4=3', '#fff2e8');
    teksPx(ctx, 'kurang', x, 188, '#ffe9a3', 6);
  }
  function gambarKartuEmpat(x, t) {
    const isi = ['3+4=7', '4+3=7', '7-3=4', '7-4=3'];
    for (let i = 0; i < 4; i++) {
      const kx = x - 33 + i * 22;
      P(ctx, kx - 10, 202, 21, 16, i < 2 ? '#fffdf2' : '#e8f4ff');
      P(ctx, kx - 10, 202, 21, 2, '#c8b890');
      P(ctx, kx - 10, 216, 21, 2, '#c8b890');
      teksPx(ctx, isi[i], kx, 206, '#2a3757', 5);
    }
    teksPx(ctx, 'satu keluarga', x, 188, '#ffe9a3', 6);
  }
  /* --- p1-040: layang-layang --- */
  function layanganPixel(kx, ky, col, col2) {
    P(ctx, kx - 1, ky - 4, 2, 2, col);
    P(ctx, kx - 3, ky - 2, 6, 4, col);
    P(ctx, kx - 1, ky - 2, 2, 4, col2);
    P(ctx, kx - 2, ky + 2, 4, 2, col);
    P(ctx, kx, ky + 4, 1, 2, col2);
    P(ctx, kx - 2, ky + 6, 2, 1, 'rgba(255,253,242,.6)');
    P(ctx, kx + 1, ky + 8, 2, 1, 'rgba(255,253,242,.45)');
  }
  function gambarLayangEmpat(x, t) {
    layanganPixel(x - 20, 168 + Math.round(Math.sin(t * 2) * 2), '#ff9d9d', '#ffd166');
    layanganPixel(x + 8, 156 + Math.round(Math.sin(t * 2 + 1) * 2), '#63c8ff', '#a5d8ff');
    layanganPixel(x - 4, 186 + Math.round(Math.sin(t * 2 + 2) * 2), '#7dffa8', '#ffd166');
    layanganPixel(x + 20, 176 + Math.round(Math.sin(t * 2 + 3) * 2), '#c9a7ff', '#a5d8ff');
    teksPx(ctx, '4', x, 214, '#fffdf2', 7);
  }
  function gambarLayangDua(x, t) {
    layanganPixel(x - 22, 164 + Math.round(Math.sin(t * 2) * 2), '#ff9d9d', '#ffd166');
    layanganPixel(x - 4, 152 + Math.round(Math.sin(t * 2 + 1) * 2), '#63c8ff', '#a5d8ff');
    layanganPixel(x + 12, 166 + Math.round(Math.sin(t * 2 + 2) * 2), '#7dffa8', '#ffd166');
    layanganPixel(x + 26, 154 + Math.round(Math.sin(t * 2 + 3) * 2), '#c9a7ff', '#a5d8ff');
    layanganPixel(x - 10, 224, '#ffd166', '#ff9d9d');   // 2 layangan baru dekat tanah
    layanganPixel(x + 4, 232, '#a5d8ff', '#ffd166');
    teksPx(ctx, '4 + 2', x, 212, '#ffe9a3', 7);
  }
  function gambarLayangEnam(x, t) {
    layanganPixel(x - 24, 166 + Math.round(Math.sin(t * 2) * 2), '#ff9d9d', '#ffd166');
    layanganPixel(x - 8, 154 + Math.round(Math.sin(t * 2 + 1) * 2), '#63c8ff', '#a5d8ff');
    layanganPixel(x + 8, 162 + Math.round(Math.sin(t * 2 + 2) * 2), '#7dffa8', '#ffd166');
    layanganPixel(x + 22, 172 + Math.round(Math.sin(t * 2 + 3) * 2), '#c9a7ff', '#a5d8ff');
    layanganPixel(x - 14, 184 + Math.round(Math.sin(t * 2 + 4) * 2), '#ffd166', '#ff9d9d');
    layanganPixel(x + 2, 192 + Math.round(Math.sin(t * 2 + 5) * 2), '#a5d8ff', '#63c8ff');
    teksPx(ctx, '4+2=6', x, 214, '#7dffa8', 7);
  }
  function gambarPapanCerita(x, t) {
    papanLebar(x, ['4+2', '= 6'], 42);
  }
  /* --- p1-041: kaleng permen berbagi --- */
  function gambarKalengTujuh(x, t) {
    P(ctx, x - 10, 226, 20, 20, '#9aa6b8');
    P(ctx, x - 10, 226, 20, 2, '#c3ccda');
    P(ctx, x - 12, 224, 24, 3, '#8a94a8');
    for (let i = 0; i < 7; i++) {                   // 7 permen keluar dari kaleng
      const mx = x - 9 + (i % 4) * 6, my = 219 - Math.floor(i / 4) * 6;
      lingkaran(ctx, mx, my, 2.6, i % 2 ? '#ff9d9d' : '#8fd0ff');
    }
    teksPx(ctx, '7', x, 254, '#fffdf2', 7);
  }
  function gambarTigaDibagikan(x, t) {
    P(ctx, x - 12, 228, 20, 18, '#9aa6b8');
    P(ctx, x - 12, 228, 20, 2, '#c3ccda');
    P(ctx, x - 14, 226, 24, 3, '#8a94a8');
    for (let i = 0; i < 4; i++) lingkaran(ctx, x - 9 + i * 6, 222, 2.4, i % 2 ? '#ff9d9d' : '#8fd0ff');
    P(ctx, x + 16, 244, 20, 3, '#c9a763');          // nampan tiga permen
    for (let i = 0; i < 3; i++) lingkaran(ctx, x + 20 + i * 6, 241, 2.6, i % 2 ? '#8fd0ff' : '#ff9d9d');
    teksPx(ctx, '7 - 3', x, 210, '#ffe9a3', 7);
  }
  function gambarPermenEmpat(x, t) {
    P(ctx, x - 10, 228, 20, 18, '#9aa6b8');
    P(ctx, x - 10, 228, 20, 2, '#c3ccda');
    P(ctx, x - 12, 226, 24, 3, '#8a94a8');
    for (let i = 0; i < 4; i++) lingkaran(ctx, x - 7 + i * 5, 222, 2.6, i % 2 ? '#8fd0ff' : '#ff9d9d');
    teksPx(ctx, '7-3=4', x, 210, '#7dffa8', 7);
  }
  function gambarPapanPertanyaan(x, t) {
    papanLebar(x, ['7-3', 'sisa?'], 44);
  }
  /* --- p1-042: papan misteri detektif --- */
  function gambarPapanTeka(x, t) {
    papanLebar(x, ['4+?=9'], 48);
    gambarCahaya(x, 214, 10, '#a8c4f0', t);
  }
  function gambarJejakSembilan(x, t) {
    for (let i = 0; i < 9; i++) {                   // 9 titik: 4 emas, 5 biru
      const jx = x - 4 + i * 5, jy = 206 + (i % 2) * 4;
      ctx.globalAlpha = 0.55 + 0.45 * Math.sin(t * 3 + i * 1.3);
      lingkaran(ctx, jx, jy, 1.8, i < 4 ? '#ffe9a3' : '#a8c4f0');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, '4', x - 12, 188, '#ffe9a3', 7);
    teksPx(ctx, '?', x + 30, 188, '#a8c4f0', 8);
  }
  function gambarLimaDitemukan(x, t) {
    for (let i = 0; i < 9; i++) {
      const jx = x - 4 + i * 5, jy = 206 + (i % 2) * 4;
      ctx.globalAlpha = 0.6 + 0.4 * Math.sin(t * 3 + i * 1.3);
      lingkaran(ctx, jx, jy, 1.8, '#ffe9a3');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, '4+5=9', x + 12, 188, '#7dffa8', 7);
  }
  function gambarPapanJawab(x, t) {
    papanLebar(x, ['4+5', '= 9'], 42);
    gambarCahaya(x, 212, 10, '#7dffa8', t);
  }
  /* --- p1-043: kali itu tambah cepat --- */
  function gambarBarisLima(x, t) {
    for (let r = 0; r < 3; r++)
      for (let i = 0; i < 5; i++)
        lingkaran(ctx, x - 12 + i * 7, 200 + r * 8, 2.4, r % 2 ? '#a5d8ff' : '#ffe9a3');
    teksPx(ctx, '3 baris x 5', x + 4, 186, '#ffe9a3', 6);
    teksPx(ctx, '15', x + 4, 226, '#7dffa8', 8);
  }
  function gambarPapanCepat(x, t) {
    papanLebar(x, ['5+5+5', '3 x 5', '= 15'], 48);
  }
  function gambarLoncatLima(x, t) {
    const pijak = [[x - 8, 210, '5'], [x + 8, 200, '10'], [x + 24, 190, '15']];
    for (const [px, py, lb] of pijak) {
      P(ctx, px - 8, py, 16, 7, '#8a6a44');
      P(ctx, px - 8, py, 16, 2, '#a3825a');
      teksPx(ctx, lb, px, py - 9, '#fffdf2', 6);
    }
    P(ctx, x + 36, 178, 2, 34, '#7a5230');          // bendera tujuan
    P(ctx, x + 38, 178, 9, 6, '#ff9d9d');
    for (let i = 0; i < 7; i++) P(ctx, x - 4 + i * 5, 236, 2, 2, 'rgba(255,253,242,.5)');
    teksPx(ctx, '3 lompatan!', x + 6, 172, '#ffe9a3', 6);
  }
  function gambarKantongKelereng(x, t) {
    P(ctx, x - 22, 196, 48, 3, '#7a5230');          // rak gantungan
    P(ctx, x - 22, 196, 2, 30, '#7a5230');
    P(ctx, x + 24, 196, 2, 30, '#7a5230');
    for (let k = 0; k < 3; k++) {
      const kx = x - 16 + k * 14;
      P(ctx, kx, 199, 1, 5, '#5a4426');
      P(ctx, kx - 6, 204, 13, 14, '#c9a763');
      P(ctx, kx - 6, 204, 13, 2, '#e0c784');
      teksPx(ctx, '5', kx, 208, '#5f4426', 6);
    }
    teksPx(ctx, '3 x 5 = 15', x + 2, 184, '#7dffa8', 7);
  }
  /* --- p1-044: tabel perkalian 2 --- */
  function gambarPasangSandal(x, t) {
    P(ctx, x - 24, 208, 54, 3, '#7a5230');          // rak sandal
    for (let p = 0; p < 5; p++) {
      const px = x - 22 + p * 12;
      P(ctx, px, 202, 4, 6, '#c9a763'); P(ctx, px, 200, 3, 2, '#e0c784');   // sandal kiri
      P(ctx, px + 5, 202, 4, 6, '#a5d8ff'); P(ctx, px + 5, 200, 3, 2, '#d0ecff'); // sandal kanan
      teksPx(ctx, String((p + 1) * 2), px + 4, 190, '#fffdf2', 6);
    }
    teksPx(ctx, '5 pasang', x + 2, 178, '#ffe9a3', 6);
  }
  function gambarTiangLampu2(x, t) {
    for (let p = 0; p < 5; p++) {
      const px = x - 24 + p * 12;
      P(ctx, px, 204, 2, 40, '#5a6a94');
      P(ctx, px - 3, 202, 8, 2, '#5a6a94');
      ctx.globalAlpha = 0.5 + 0.4 * Math.sin(t * 2.4 + p);
      lingkaran(ctx, px - 1, 206, 2.4, '#ffd166');
      lingkaran(ctx, px + 5, 206, 2.4, '#ffd166');
      ctx.globalAlpha = 1;
      teksPx(ctx, String((p + 1) * 2), px + 1, 188, '#fffdf2', 6);
    }
    teksPx(ctx, '2 tiang x 2', x + 2, 176, '#ffe9a3', 6);
  }
  function gambarTanggaLompat2(x, t) {
    const anak = [[x - 8, 236, '2'], [x + 4, 226, '4'], [x + 16, 216, '6'], [x + 28, 206, '8'], [x + 40, 196, '10']];
    for (const [ax, ay, lb] of anak) {
      P(ctx, ax - 7, ay, 14, 6, '#8a6a44');
      P(ctx, ax - 7, ay, 14, 2, '#a3825a');
      teksPx(ctx, lb, ax, ay - 9, '#ffe9a3', 6);
    }
  }
  function gambarPapanTabel2(x, t) {
    papanLebar(x, ['2x1=2', '2x2=4', '2x3=6', '2x4=8', '2x5=10'], 52);
  }
  /* --- p1-045: tabel perkalian 5 --- */
  function gambarJariSatu(x, t) {
    gambarCahaya(x + 2, 234, 12, '#ffe9a3', t);
    jariTangan(x + 2, 244, 5);
    teksPx(ctx, '1 x 5 = 5', x + 6, 216, '#7dffa8', 7);
  }
  function gambarJariDua(x, t) {
    gambarCahaya(x + 14, 232, 13, '#ffe9a3', t);
    jariTangan(x + 2, 244, 5);
    jariTangan(x + 26, 244, 5);
    teksPx(ctx, '2 x 5 = 10', x + 14, 214, '#7dffa8', 7);
  }
  function gambarBungaKelopak(x, t) {
    for (let b = 0; b < 4; b++) {
      const bx = x - 12 + b * 14, by = 204 + (b % 2) * 3;
      P(ctx, bx, by + 4, 1, 22, '#3f7f3a');
      for (let p = 0; p < 5; p++) {
        const a = p * Math.PI * 2 / 5 - Math.PI / 2;
        lingkaran(ctx, bx + 1 + Math.cos(a) * 4, by + Math.sin(a) * 4, 2.2, '#f2b8cc');
      }
      lingkaran(ctx, bx + 1, by, 1.8, '#ffd166');
      teksPx(ctx, String((b + 1) * 5), bx, by - 12, '#fffdf2', 6);
    }
    teksPx(ctx, '4 x 5 = 20', x + 8, 178, '#7dffa8', 7);
  }
  function gambarPapanJam(x, t) {
    const cx = x + 8, cy = 206;
    lingkaran(ctx, cx, cy, 21, '#8a6a44');
    lingkaran(ctx, cx, cy, 18, '#fffdf2');
    for (let i = 0; i < 12; i++) {
      const a = i * Math.PI / 6;
      P(ctx, cx + Math.round(Math.sin(a) * 15) - 1, cy - Math.round(Math.cos(a) * 15) - 1, 2, 2, '#5a6a94');
    }
    for (let n = 1; n <= 4; n++) {                  // angka 1-4 disorot
      const a = n * Math.PI / 6;
      teksPx(ctx, String(n), cx + Math.round(Math.sin(a) * 11), cy - Math.round(Math.cos(a) * 11) - 2, '#c07d0c', 5);
    }
    P(ctx, cx, cy, 2, 10, '#2a3757');               // jarum menit ke 4 (20 menit)
    P(ctx, cx + 1, cy + 9, 6, 2, '#2a3757');
    P(ctx, cx, cy - 8, 2, 8, '#8a94a8');            // jarum jam
    lingkaran(ctx, cx + 1, cy, 2, '#c07d0c');
    teksPx(ctx, 'tiap angka = 5 menit', x + 4, 176, '#ffe9a3', 5);
    teksPx(ctx, '20 menit', cx + 20, 226, '#7dffa8', 6);
  }
  /* --- p1-046: tabel perkalian 10 --- */
  function gambarGerbongSatu(x, t) {
    P(ctx, x - 6, 202, 36, 26, '#9aa6b8');          // gerbong
    P(ctx, x - 6, 202, 36, 3, '#c3ccda');
    for (let i = 0; i < 10; i++) {                  // 10 peti: 2 baris x 5
      const sx = x - 2 + (i % 5) * 7, sy = 206 + Math.floor(i / 5) * 10;
      P(ctx, sx, sy, 6, 9, '#c9a763');
      P(ctx, sx, sy + 4, 6, 1, '#8a6a44');
    }
    lingkaran(ctx, x + 2, 232, 3.4, '#3a4458');
    lingkaran(ctx, x + 22, 232, 3.4, '#3a4458');
    teksPx(ctx, '1 x 10 = 10', x + 12, 190, '#7dffa8', 7);
  }
  function gambarGerbongEmpat(x, t) {
    for (let g = 0; g < 4; g++) {
      const gx = x - 28 + g * 16;
      P(ctx, gx, 204, 14, 20, '#9aa6b8');
      P(ctx, gx, 204, 14, 2, '#c3ccda');
      teksPx(ctx, '10', gx + 7, 210, '#5f4426', 5);
      lingkaran(ctx, gx + 4, 228, 3, '#3a4458');
      lingkaran(ctx, gx + 10, 228, 3, '#3a4458');
      teksPx(ctx, String((g + 1) * 10), gx + 7, 192, '#ffe9a3', 6);
    }
    teksPx(ctx, '4 x 10 = 40', x + 2, 180, '#7dffa8', 7);
  }
  function gambarNolEmas(x, t) {
    papanLebar(x, ['2x10', '= 20'], 44);
    gambarCahaya(x + 16, 190, 9, '#ffd166', t);
    const oy = 190 + Math.round(Math.sin(t * 2.4) * 2);
    lingkaran(ctx, x + 16, oy, 5.4, '#ffd166');
    lingkaran(ctx, x + 16, oy, 3.8, '#ffe9a3');
    teksPx(ctx, '0', x + 16, oy - 3, '#8a6a1c', 6);
  }
  function gambarPijakanPuluhan(x, t) {
    const pijak = [[x - 18, '0'], [x - 4, '10'], [x + 10, '20'], [x + 24, '30']];
    for (const [px, lb] of pijak) {
      P(ctx, px - 7, 208, 15, 10, '#8a6a44');
      P(ctx, px - 7, 208, 15, 2, '#a3825a');
      teksPx(ctx, lb, px, 211, '#fffdf2', 6);
    }
    for (let i = 0; i < 3; i++) {                   // busur lompatan
      P(ctx, x - 8 + i * 14, 200 - (i === 1 ? 3 : 0), 2, 2, '#ffe9a3');
      P(ctx, x - 3 + i * 14, 198 - (i === 1 ? 3 : 0), 2, 2, '#ffe9a3');
    }
    teksPx(ctx, 'dari 0, 3 lompatan', x + 4, 186, '#ffe9a3', 5);
  }
  /* --- p1-047: tabel perkalian 3 & 4 --- */
  function gambarSegitigaTiga(x, t) {
    for (let s = 0; s < 4; s++) {
      const cx = x - 24 + s * 16;
      P(ctx, cx - 7, 218, 14, 2, '#c98a4b');        // alas
      P(ctx, cx - 7, 214, 2, 4, '#c98a4b'); P(ctx, cx + 5, 214, 2, 4, '#c98a4b');
      P(ctx, cx - 5, 208, 2, 6, '#c98a4b'); P(ctx, cx + 3, 208, 2, 6, '#c98a4b');
      P(ctx, cx - 2, 202, 4, 6, '#c98a4b');         // puncak
      teksPx(ctx, String((s + 1) * 3), cx, 190, '#fffdf2', 6);
    }
    teksPx(ctx, 'tiap segitiga 3 sisi', x + 4, 178, '#ffe9a3', 5);
  }
  function gambarKursiEmpat(x, t) {
    for (let k = 0; k < 4; k++) {
      const cx = x - 24 + k * 16;
      P(ctx, cx - 5, 208, 10, 3, '#a3744a');        // dudukan
      P(ctx, cx + 3, 196, 2, 12, '#a3744a');        // sandaran
      P(ctx, cx - 5, 211, 1, 10, '#8a5f38'); P(ctx, cx - 1, 211, 1, 10, '#8a5f38');
      P(ctx, cx + 1, 211, 1, 10, '#8a5f38'); P(ctx, cx + 4, 211, 1, 10, '#8a5f38');
      teksPx(ctx, String((k + 1) * 4), cx, 186, '#fffdf2', 6);
    }
    teksPx(ctx, 'tiap kursi 4 kaki', x + 4, 174, '#ffe9a3', 5);
  }
  function gambarTanggaDua(x, t) {
    P(ctx, x - 10, 194, 2, 30, '#a3744a'); P(ctx, x + 2, 194, 2, 30, '#a3744a');
    P(ctx, x + 16, 186, 2, 38, '#8a94c8'); P(ctx, x + 28, 186, 2, 38, '#8a94c8');
    const tiga = [[220, '3'], [212, '6'], [204, '9'], [196, '12']];
    for (const [ry, lb] of tiga) {
      P(ctx, x - 10, ry, 14, 2, lb === '12' ? '#ffd166' : '#c98a4b');
      teksPx(ctx, lb, x + 6, ry - 2, lb === '12' ? '#ffd166' : '#fffdf2', 5);
    }
    const empat = [[220, '4'], [210, '8'], [200, '12'], [190, '16']];
    for (const [ry, lb] of empat) {
      P(ctx, x + 16, ry, 14, 2, lb === '12' ? '#ffd166' : '#8a94c8');
      teksPx(ctx, lb, x + 32, ry - 2, lb === '12' ? '#ffd166' : '#fffdf2', 5);
    }
    teksPx(ctx, 'bertemu di 12', x + 4, 176, '#ffe9a3', 6);
  }
  function gambarGridTigaEmpat(x, t) {
    P(ctx, x - 18, 194, 44, 34, '#8a6a44');
    P(ctx, x - 15, 197, 38, 28, '#5f4426');
    for (let r = 0; r < 3; r++)
      for (let k = 0; k < 4; k++) {
        lingkaran(ctx, x - 10 + k * 10, 202 + r * 10, 3, '#ffe9a3');
        lingkaran(ctx, x - 10 + k * 10, 201 + r * 10, 1.8, '#fff3cf');
      }
    teksPx(ctx, '3 x 4 = 4 x 3 = 12', x + 4, 182, '#7dffa8', 6);
  }
  /* --- p1-048: tabel perkalian 6-9 --- */
  function gambarJalurEnam(x, t) {
    const pijak = [[x - 2, 232, '6'], [x + 6, 224, '12'], [x + 14, 216, '18'], [x + 22, 208, '24'], [x + 30, 200, '30'], [x + 38, 192, '36']];
    for (const [px, py, lb] of pijak) {
      P(ctx, px - 6, py, 12, 6, '#8a7048');
      P(ctx, px - 6, py, 12, 2, '#a38858');
      teksPx(ctx, lb, px, py - 9, '#fffdf2', 5);
    }
    teksPx(ctx, 'jalur 6', x + 6, 178, '#ffe9a3', 6);
  }
  function gambarTanggaTujuh(x, t) {
    P(ctx, x, 194, 2, 46, '#a3744a'); P(ctx, x + 14, 194, 2, 46, '#a3744a');
    const anak = [[234, '7'], [226, '14'], [218, '21'], [210, '28'], [202, '35'], [194, '42']];
    for (const [ry, lb] of anak) {
      P(ctx, x, ry, 16, 2, '#c98a4b');
      teksPx(ctx, lb, x + 20, ry - 2, lb === '42' ? '#ffd166' : '#fffdf2', 5);
    }
    teksPx(ctx, '7 x 6 = 42', x + 8, 182, '#ffe9a3', 6);
  }
  function gambarEmpatJalur(x, t) {
    papanLebar(x, ['6x8=48', '7x8=56', '8x8=64', '9x8=72'], 52);
  }
  function gambarBenderaPuncak(x, t) {
    P(ctx, x - 16, 236, 36, 10, '#8a7048');         // puncak batu
    P(ctx, x - 8, 228, 20, 8, '#9a8058');
    P(ctx, x + 6, 186, 2, 44, '#7a5230');           // tiang bendera
    P(ctx, x + 8, 186, 10, 7, '#ff9d9d');
    P(ctx, x + 8, 193, 7, 4, '#f0b8b8');
    teksPx(ctx, '9 x 9 = 81', x - 2, 172, '#ffd166', 7);
  }
  /* --- p1-049: trik perkalian 9 --- */
  function gambarJariSembilan(x, t) {
    P(ctx, x - 24, 224, 52, 6, '#8a6a44');          // meja
    P(ctx, x - 20, 230, 3, 16, '#7a5230'); P(ctx, x + 20, 230, 3, 16, '#7a5230');
    for (let i = 0; i < 10; i++) {
      const fx = x - 20 + i * 5;
      if (i === 2) {                                // jari ke-3 ditekuk
        P(ctx, fx, 218, 3, 5, '#d89870');
        P(ctx, fx, 216, 3, 2, '#e8b08a');
      } else {
        P(ctx, fx, 208, 3, 16, '#e8b08a');
        P(ctx, fx, 208, 3, 2, '#f2c8a4');
      }
    }
    teksPx(ctx, '2', x - 15, 198, '#ffd166', 7);
    teksPx(ctx, '7', x + 9, 198, '#ffd166', 7);
    teksPx(ctx, '9 x 3 = 27', x + 3, 184, '#7dffa8', 7);
  }
  function gambarPapan27(x, t) {
    papanLebar(x, ['9x3=27', '2+7=9'], 50);
    gambarCahaya(x, 206, 10, '#ffe9a3', t);
  }
  function gambarKartuSembilan(x, t) {
    P(ctx, x - 30, 188, 60, 3, '#7a5230');          // rel gantungan
    const isi = [['18', '1+8=9'], ['45', '4+5=9'], ['81', '8+1=9']];
    for (let k = 0; k < 3; k++) {
      const kx = x - 24 + k * 24;
      P(ctx, kx, 191, 1, 6, '#5a4426');
      P(ctx, kx - 11, 197, 22, 16, '#fffdf2');
      P(ctx, kx - 11, 197, 22, 2, '#c8b890');
      teksPx(ctx, isi[k][0], kx, 201, '#2a3757', 6);
      teksPx(ctx, isi[k][1], kx, 218, '#ffd166', 4);
    }
    teksPx(ctx, 'selalu 9!', x, 180, '#ffe9a3', 6);
  }
  function gambarPapanSepuluh(x, t) {
    papanLebar(x, ['10x5=50', '50-5=45', '9x5=45'], 58);
  }
  /* --- p1-050: perkalian bersusun --- */
  function gambarKartu23(x, t) {
    papanBersusun3(x, '23', '4', '', 'x', 42);
  }
  function gambarKaliSatuan(x, t) {
    papanBersusun3(x, '23', '4', '2', 'x', 42);
    teksPx(ctx, '1', x - 9, 192, '#ff9d9d', 7);     // simpanan di atas puluhan
    P(ctx, x - 8, 198, 1, 3, '#ff9d9d');
  }
  function gambarKaliPuluhan(x, t) {
    papanBersusun3(x, '23', '4', '92', 'x', 42);
  }
  function gambarPapan92(x, t) {
    papanLebar(x, ['23 x 4', '= 92'], 48);
    teksPx(ctx, '9 ikat, 2 keping', x, 186, '#c07d0c', 5);
  }
  /* --- p1-051: bagi itu membagi rata --- */
  function gambarNampanSepuluh(x, t) {
    P(ctx, x - 14, 222, 46, 7, '#a3744a');          // nampan
    P(ctx, x - 14, 222, 46, 2, '#bd8a5a');
    for (let i = 0; i < 10; i++)                    // 10 kelereng: 2 baris x 5
      lingkaran(ctx, x - 10 + (i % 5) * 8, 214 + Math.floor(i / 5) * 7, 2.6, i % 2 ? '#a5d8ff' : '#ffe9a3');
    for (let p = 0; p < 2; p++) {                   // 2 piring kosong
      lingkaran(ctx, x + 18 + p * 14, 242, 6, '#e8e0d0');
      lingkaran(ctx, x + 18 + p * 14, 242, 4, '#f8f2e4');
    }
    teksPx(ctx, '10 : 2', x + 8, 196, '#ffe9a3', 7);
  }
  function gambarSatuSatu(x, t) {
    for (let p = 0; p < 2; p++) {
      const px = x + 2 + p * 24;
      lingkaran(ctx, px, 242, 7, '#e8e0d0');
      lingkaran(ctx, px, 242, 5, '#f8f2e4');
      for (let i = 0; i < 5; i++)                   // 5 kelereng tiap piring
        lingkaran(ctx, px, 234 - i * 6, 2.2, i % 2 ? '#a5d8ff' : '#ffe9a3');
    }
    teksPx(ctx, '5 giliran', x + 14, 198, '#ffe9a3', 6);
  }
  function gambarPiringKembar(x, t) {
    for (let p = 0; p < 2; p++) {
      const px = x + 2 + p * 24;
      lingkaran(ctx, px, 242, 8, '#e8e0d0');
      lingkaran(ctx, px, 242, 6, '#f8f2e4');
      for (let i = 0; i < 5; i++) {
        const a = -Math.PI / 2 + (i - 2) * 0.55;
        lingkaran(ctx, px + Math.sin(a) * 4.5, 240 - Math.cos(a) * 3, 2.2, i % 2 ? '#a5d8ff' : '#ffe9a3');
      }
      teksPx(ctx, '5', px, 222, '#fffdf2', 6);
    }
    teksPx(ctx, '10 : 2 = 5', x + 14, 204, '#7dffa8', 7);
  }
  function gambarRotiEnam(x, t) {
    for (let k = 0; k < 3; k++) {
      const kx = x + 2 + k * 14;
      P(ctx, kx - 5, 226, 11, 12, '#c9a763');       // kantong
      P(ctx, kx - 5, 226, 11, 2, '#e0c784');
      P(ctx, kx - 2, 223, 5, 3, '#8a6a44');
      for (let r = 0; r < 2; r++)                   // 2 roti tiap kantong
        lingkaran(ctx, kx, 218 - r * 6, 2.6, '#e8b06a');
    }
    teksPx(ctx, '6 : 3 = 2', x + 10, 198, '#7dffa8', 7);
  }
  /* --- p1-052: pembagian dengan sisa --- */
  function gambarKueTujuh(x, t) {
    P(ctx, x - 14, 224, 44, 7, '#a3744a');          // nampan
    for (let i = 0; i < 7; i++) {                   // 7 kue: 4 atas 3 bawah
      const kx = x - 10 + (i % 4) * 9, ky = 212 + Math.floor(i / 4) * 9;
      lingkaran(ctx, kx, ky, 3.2, '#f2c17d');
      lingkaran(ctx, kx, ky - 1, 2, '#ffd9a3');
    }
    for (let p = 0; p < 2; p++) {                   // 2 piring
      lingkaran(ctx, x + 16 + p * 15, 242, 6, '#e8e0d0');
      lingkaran(ctx, x + 16 + p * 15, 242, 4, '#f8f2e4');
    }
    teksPx(ctx, '7 : 2', x + 10, 196, '#ffe9a3', 7);
  }
  function gambarKueTigaTiga(x, t) {
    for (let p = 0; p < 2; p++) {
      const px = x + 2 + p * 22;
      lingkaran(ctx, px, 242, 7, '#e8e0d0');
      lingkaran(ctx, px, 242, 5, '#f8f2e4');
      for (let i = 0; i < 3; i++)
        lingkaran(ctx, px - 4 + i * 4, 233, 2.6, '#f2c17d');
      teksPx(ctx, '3', px, 220, '#fffdf2', 6);
    }
    lingkaran(ctx, x + 30, 240, 3.2, '#f2c17d');    // 1 kue menunggu di nampan
    lingkaran(ctx, x + 30, 239, 2, '#ffd9a3');
    P(ctx, x + 24, 244, 12, 2, '#a3744a');
    teksPx(ctx, 'sisa 1', x + 30, 218, '#ffd166', 5);
    teksPx(ctx, '7:2 = 3 sisa 1', x + 12, 200, '#ffe9a3', 5);
  }
  function gambarPapanSisa2(x, t) {
    papanLebar(x, ['7 : 2', '3 sisa 1'], 64);
  }
  function gambarKueCek(x, t) {
    papanLebar(x, ['2x3=6', '6+1=7'], 48);
    gambarCahaya(x, 206, 10, '#7dffa8', t);
  }
  /* --- p1-053: pembagian bersusun --- */
  function gambarKartu96(x, t) {
    teksPx(ctx, '9 ikat & 6 keping', x, 178, '#ffe9a3', 5);
    P(ctx, x - 27, 188, 54, 52, '#1e2a44');         // papan tangga
    P(ctx, x - 27, 188, 54, 2, '#37476f');
    teksPx(ctx, '96 : 3', x, 193, '#fffdf2', 7);
    P(ctx, x - 21, 206, 42, 1, '#5a6a94');
    for (let i = 0; i < 9; i++) {                   // 9 ikat puluhan
      const bx = x - 20 + i * 5;
      P(ctx, bx, 211, 4, 6, '#c9a763');
      P(ctx, bx, 213, 4, 1, '#8a6a44');
    }
    for (let i = 0; i < 6; i++)                     // 6 keping satuan
      lingkaran(ctx, x - 19 + i * 5, 225, 1.8, '#ffe9a3');
    P(ctx, x - 27, 236, 54, 2, '#141d33');
    P(ctx, x - 22, 238, 3, 8, '#7a5230'); P(ctx, x + 19, 238, 3, 8, '#7a5230');
  }
  function gambarIkatSembilan(x, t) {
    for (let p = 0; p < 3; p++) {
      const px = x + 2 + p * 14;
      lingkaran(ctx, px, 242, 6, '#e8e0d0');
      lingkaran(ctx, px, 242, 4, '#f8f2e4');
      P(ctx, px - 3, 230, 7, 8, '#c9a763');         // 1 ikat tiap piring
      P(ctx, px - 3, 233, 7, 1, '#8a6a44');
      teksPx(ctx, '1', px, 220, '#fffdf2', 5);
    }
    teksPx(ctx, '9 : 3 = 3 puluhan', x + 8, 202, '#ffe9a3', 5);
  }
  function gambarTurunkanEnam(x, t) {
    for (let p = 0; p < 3; p++) {
      const px = x + 2 + p * 14;
      lingkaran(ctx, px, 242, 6, '#e8e0d0');
      lingkaran(ctx, px, 242, 4, '#f8f2e4');
      for (let k = 0; k < 2; k++)                   // 2 keping tiap piring
        lingkaran(ctx, px - 2 + k * 5, 234, 2, '#ffe9a3');
      teksPx(ctx, '2', px, 222, '#7dffa8', 5);
    }
    teksPx(ctx, '6 keping', x + 10, 206, '#a5d8ff', 5);
  }
  function gambarPapan32(x, t) {
    papanLebar(x, ['96 : 3', '= 32', '3x32=96'], 58);
  }
  /* --- p1-054: tantangan kali-bagi --- */
  function gambarTumpukan24(x, t) {
    for (let s = 0; s < 6; s++) {
      const sx = x - 20 + s * 10;
      for (let b = 0; b < 4; b++)                   // 4 bola tiap tumpukan
        lingkaran(ctx, sx, 218 - b * 6, 2.4, s % 2 ? '#a5d8ff' : '#ffe9a3');
      P(ctx, sx - 4, 222, 9, 2, '#8a6a44');         // alas tumpukan
    }
    teksPx(ctx, '6 x 4 = 24', x + 5, 188, '#7dffa8', 7);
  }
  function gambarPiringBalik(x, t) {
    for (let p = 0; p < 6; p++) {
      const px = x - 20 + p * 10;
      P(ctx, px - 4, 220, 9, 2, '#a3744a');         // piring kecil
      for (let b = 0; b < 4; b++)                   // 4 bola: 2x2
        lingkaran(ctx, px - 2 + (b % 2) * 5, 210 + Math.floor(b / 2) * 6, 2.2, p % 2 ? '#ffe9a3' : '#a5d8ff');
    }
    teksPx(ctx, '24 : 6 = 4', x + 5, 194, '#ffe9a3', 7);
  }
  function gambarKartuKaliBagi(x, t) {
    const isi = ['6x4=24', '4x6=24', '24:6=4', '24:4=6'];
    for (let i = 0; i < 4; i++) {
      const kx = x - 18 + (i % 2) * 36, ky = 190 + Math.floor(i / 2) * 22;
      P(ctx, kx - 16, ky, 32, 16, i < 2 ? '#fffdf2' : '#e8f4ff');
      P(ctx, kx - 16, ky, 32, 2, '#c8b890');
      P(ctx, kx - 16, ky + 14, 32, 2, '#c8b890');
      teksPx(ctx, isi[i], kx, ky + 4, '#2a3757', 5);
    }
    teksPx(ctx, 'pasangan setia', x, 178, '#ffe9a3', 6);
  }
  function gambarTekaDuaPuluh(x, t) {
    papanLebar(x, ['?x5=20', '20:5=4'], 52);
    gambarCahaya(x, 206, 11, '#ffd166', t);
  }

  /* --- helper bentuk pecahan (k6) --- */
  function potongKue(c, cx, by, r, col) {          // seperempat lingkaran, apex di (cx, by)
    for (let dy = 0; dy <= r; dy++) {
      const w = Math.round(Math.sqrt(Math.max(0, r * r - dy * dy)));
      P(c, cx, by - dy, w, 1, col);
    }
  }
  function setengahKue(c, cx, by, r, col) {        // setengah lingkaran rata di bawah
    for (let dy = 0; dy <= r; dy++) {
      const w = Math.round(2 * Math.sqrt(Math.max(0, r * r - dy * dy)));
      P(c, cx - Math.round(w / 2), by - dy, w, 1, col);
    }
  }
  function kotakRangka(x, y, w, h, col) {          // persegi garis saja
    P(ctx, x, y, w, 1, col);
    P(ctx, x, y + h - 1, w, 1, col);
    P(ctx, x, y, 1, h, col);
    P(ctx, x + w - 1, y, 1, h, col);
  }

  /* --- p1-055: setengah itu 1/2 --- */
  function gambarKueDapur(x, t) {
    P(ctx, x - 20, 240, 40, 6, '#a3744a');
    P(ctx, x - 20, 240, 40, 2, '#b3854a');
    lingkaran(ctx, x, 232, 9, '#e8b06a');
    lingkaran(ctx, x, 230, 5, '#f2b8cc');
    teksPx(ctx, '1 utuh', x, 182, '#ffe9a3', 6);
  }
  function gambarGarisTengah(x, t) {
    P(ctx, x - 18, 244, 36, 3, '#a3744a');
    lingkaran(ctx, x, 230, 12, '#e8b06a');
    P(ctx, x - 1, 216, 2, 28, '#8a5f38');
    teksPx(ctx, '2 sama besar', x, 186, '#7dffa8', 6);
  }
  function gambarPiringSetengah(x, t) {
    for (let p = 0; p < 2; p++) {
      const px = x - 14 + p * 28;
      lingkaran(ctx, px, 242, 8, '#e8e0d0');
      lingkaran(ctx, px, 242, 6, '#f8f2e4');
      setengahKue(ctx, px, 240, 6, '#e8b06a');
      teksPx(ctx, '1/2', px, 220, '#fffdf2', 7);
    }
    teksPx(ctx, 'adil!', x, 204, '#ffe9a3', 6);
  }
  function gambarPotongTimpang(x, t) {
    P(ctx, x - 18, 244, 36, 3, '#a3744a');
    lingkaran(ctx, x - 9, 230, 9, '#e8b06a');
    lingkaran(ctx, x + 8, 230, 5, '#e8b06a');
    P(ctx, x - 3, 214, 2, 3, '#ff9d9d');
    P(ctx, x - 6, 217, 8, 2, '#ff9d9d');
    teksPx(ctx, 'bukan setengah', x, 186, '#ff9d9d', 6);
  }

  /* --- p1-056: seperempat itu 1/4 --- */
  function gambarMejaUltah(x, t) {
    P(ctx, x - 22, 226, 44, 4, '#8a6a44');
    P(ctx, x - 19, 230, 3, 16, '#6b4a2c');
    P(ctx, x + 16, 230, 3, 16, '#6b4a2c');
    lingkaran(ctx, x, 220, 8, '#f2b8cc');
    teksPx(ctx, '4 tamu', x, 180, '#ffe9a3', 6);
  }
  function gambarPotongSilang(x, t) {
    lingkaran(ctx, x, 228, 13, '#e8b06a');
    P(ctx, x - 1, 213, 2, 30, '#8a5f38');
    P(ctx, x - 13, 227, 26, 2, '#8a5f38');
    teksPx(ctx, '2 garis = 4 potong', x, 186, '#7dffa8', 6);
  }
  function gambarPiringSeperempat(x, t) {
    lingkaran(ctx, x, 242, 9, '#e8e0d0');
    lingkaran(ctx, x, 242, 7, '#f8f2e4');
    potongKue(ctx, x - 3, 243, 8, '#e8b06a');
    lingkaran(ctx, x + 24, 228, 8, '#e8b06a');
    P(ctx, x + 23, 218, 2, 20, '#8a5f38');
    P(ctx, x + 14, 227, 20, 2, '#8a5f38');
    teksPx(ctx, '1/4', x, 216, '#fffdf2', 8);
    teksPx(ctx, 'empat sama besar', x + 10, 198, '#ffe9a3', 6);
  }
  function gambarDuaJadiSetengah(x, t) {
    P(ctx, x - 18, 244, 36, 3, '#a3744a');
    setengahKue(ctx, x, 240, 12, '#e8b06a');
    P(ctx, x - 1, 228, 2, 13, '#8a5f38');
    teksPx(ctx, '2/4 = 1/2', x, 196, '#7dffa8', 7);
  }

  /* --- p1-057: pembilang & penyebut --- */
  function gambarBukuResep(x, t) {
    P(ctx, x - 18, 220, 18, 24, '#f8f2e4');
    P(ctx, x, 220, 18, 24, '#f8f2e4');
    P(ctx, x - 1, 218, 2, 28, '#8a6a44');
    lingkaran(ctx, x - 9, 232, 6, '#e8b06a');
    P(ctx, x - 10, 224, 2, 16, '#8a5f38');
    P(ctx, x - 16, 231, 13, 2, '#8a5f38');
    teksPx(ctx, '3/4', x + 9, 228, '#2a3757', 8);
    teksPx(ctx, 'resep tua', x, 182, '#ffe9a3', 6);
  }
  function gambarPenyebutBawah(x, t) {
    teksPx(ctx, '3/4', x, 196, '#fffdf2', 12);
    P(ctx, x + 6, 194, 12, 2, '#ffd166');
    P(ctx, x + 6, 204, 12, 2, '#ffd166');
    P(ctx, x + 6, 194, 2, 12, '#ffd166');
    P(ctx, x + 16, 194, 2, 12, '#ffd166');
    lingkaran(ctx, x, 228, 11, '#e8b06a');
    P(ctx, x - 1, 215, 2, 26, '#8a5f38');
    P(ctx, x - 11, 227, 22, 2, '#8a5f38');
    teksPx(ctx, 'dibagi 4', x + 28, 222, '#ffe9a3', 6);
  }
  function gambarPembilangAtas(x, t) {
    teksPx(ctx, '3/4', x, 196, '#fffdf2', 12);
    P(ctx, x - 19, 194, 12, 2, '#ffd166');
    P(ctx, x - 19, 204, 12, 2, '#ffd166');
    P(ctx, x - 19, 194, 2, 12, '#ffd166');
    P(ctx, x - 7, 194, 2, 12, '#ffd166');
    lingkaran(ctx, x, 242, 9, '#e8e0d0');
    lingkaran(ctx, x, 242, 7, '#f8f2e4');
    for (let i = 0; i < 3; i++) potongKue(ctx, x - 10 + i * 8, 243, 7, '#e8b06a');
    teksPx(ctx, 'diambil 3', x, 218, '#ffe9a3', 6);
  }
  function gambarPapanTigaEmpat(x, t) {
    papanLebar(x, ['3/4 = tiga', 'per empat'], 56);
    teksPx(ctx, '1/2 setengah', x, 176, '#ffe9a3', 6);
    teksPx(ctx, '1/4 seperempat', x, 186, '#ffe9a3', 6);
  }

  /* --- p1-058: keluarga pecahan 1/n --- */
  function gambarRotiTiga(x, t) {
    P(ctx, x - 22, 244, 44, 3, '#a3744a');
    for (let i = 0; i < 3; i++) {
      const rx = x - 14 + i * 14;
      lingkaran(ctx, rx, 238, 6, '#e8b06a');
      P(ctx, rx - 5, 233, 10, 2, '#c98a4b');
    }
    teksPx(ctx, 'tiap 1/3', x, 182, '#fffdf2', 6);
  }
  function gambarRotiLima(x, t) {
    P(ctx, x - 26, 244, 52, 3, '#a3744a');
    for (let i = 0; i < 5; i++) {
      const rx = x - 20 + i * 10;
      lingkaran(ctx, rx, 239, 4.5, '#e8b06a');
      P(ctx, rx - 4, 236, 8, 2, '#c98a4b');
    }
    teksPx(ctx, '1/5 lebih ramping', x, 200, '#ffe9a3', 6);
  }
  function gambarRotiDelapan(x, t) {
    P(ctx, x - 24, 244, 48, 3, '#a3744a');
    for (let i = 0; i < 8; i++) {
      const rx = x - 21 + (i % 4) * 14, ry = i < 4 ? 236 : 226;
      lingkaran(ctx, rx, ry, 4, '#e8b06a');
      P(ctx, rx - 3, ry - 3, 6, 2, '#c98a4b');
    }
    teksPx(ctx, '1/8 paling kecil', x, 196, '#ffe9a3', 6);
  }
  function gambarPapanKeluarga(x, t) {
    papanLebar(x, ['1/2 1/3 1/4', '1/5 1/8'], 84);
    teksPx(ctx, 'makin kecil', x, 186, '#ffe9a3', 6);
    P(ctx, x - 34, 204, 2, 22, '#7dffa8');
    P(ctx, x - 37, 224, 8, 2, '#7dffa8');
    P(ctx, x - 35, 222, 4, 2, '#7dffa8');
  }

  /* --- p1-059: pecahan senilai --- */
  function gambarKueKembar(x, t) {
    P(ctx, x - 24, 244, 48, 3, '#a3744a');
    lingkaran(ctx, x - 12, 231, 10, '#e8b06a');
    lingkaran(ctx, x + 12, 231, 10, '#e8b06a');
    lingkaran(ctx, x - 12, 228, 4, '#f2b8cc');
    lingkaran(ctx, x + 12, 228, 4, '#f2b8cc');
    teksPx(ctx, 'A', x - 12, 210, '#fffdf2', 7);
    teksPx(ctx, 'B', x + 12, 210, '#fffdf2', 7);
    teksPx(ctx, 'kembar', x, 196, '#ffe9a3', 6);
  }
  function gambarPotongBeda(x, t) {
    lingkaran(ctx, x - 14, 232, 11, '#e8b06a');
    P(ctx, x - 15, 219, 2, 26, '#8a5f38');
    teksPx(ctx, '1/2', x - 14, 204, '#fffdf2', 7);
    lingkaran(ctx, x + 14, 232, 11, '#e8b06a');
    P(ctx, x + 13, 219, 2, 26, '#8a5f38');
    P(ctx, x + 3, 231, 22, 2, '#8a5f38');
    P(ctx, x + 20, 222, 4, 4, '#c98a4b');
    P(ctx, x + 5, 222, 4, 4, '#c98a4b');
    teksPx(ctx, '2/4', x + 14, 204, '#fffdf2', 7);
  }
  function gambarBandingPiring(x, t) {
    lingkaran(ctx, x - 16, 242, 9, '#e8e0d0');
    lingkaran(ctx, x - 16, 242, 7, '#f8f2e4');
    setengahKue(ctx, x - 16, 240, 7, '#e8b06a');
    lingkaran(ctx, x + 16, 242, 9, '#e8e0d0');
    lingkaran(ctx, x + 16, 242, 7, '#f8f2e4');
    potongKue(ctx, x + 16, 241, 7, '#e8b06a');
    potongKue(ctx, x + 9, 241, 7, '#e8b06a');
    teksPx(ctx, '=', x, 228, '#ffd166', 9);
    teksPx(ctx, 'sama besar!', x, 204, '#7dffa8', 6);
  }
  function gambarKartuSenilai(x, t) {
    papanLebar(x, ['1/2 = 2/4', '= 3/6 = 4/8'], 58);
    teksPx(ctx, 'keluarga setengah', x, 186, '#ffe9a3', 6);
  }

  /* --- p1-060: membandingkan pecahan --- */
  function gambarBatangDua(x, t) {
    P(ctx, x - 16, 230, 14, 12, '#8a5f38');
    P(ctx, x + 2, 230, 14, 12, '#8a5f38');
    P(ctx, x - 13, 233, 4, 2, '#a06a42');
    P(ctx, x - 13, 237, 4, 2, '#a06a42');
    P(ctx, x + 5, 233, 4, 2, '#a06a42');
    P(ctx, x + 5, 237, 4, 2, '#a06a42');
    teksPx(ctx, 'tiap 1/2', x, 182, '#fffdf2', 6);
  }
  function gambarBatangDelapan(x, t) {
    for (let i = 0; i < 8; i++) {
      const cx2 = x - 28 + i * 8;
      P(ctx, cx2, 232, 6, 12, '#8a5f38');
      P(ctx, cx2 + 1, 235, 4, 2, '#a06a42');
      P(ctx, cx2 + 1, 239, 4, 2, '#a06a42');
    }
    teksPx(ctx, '1/8 tiap keping', x, 200, '#ffe9a3', 6);
  }
  function gambarJebakTerbongkar(x, t) {
    P(ctx, x - 22, 244, 44, 3, '#a3744a');
    potongKue(ctx, x - 14, 242, 12, '#8a5f38');
    potongKue(ctx, x + 10, 242, 5, '#8a5f38');
    teksPx(ctx, '1/2', x - 10, 216, '#fffdf2', 7);
    teksPx(ctx, '1/8', x + 12, 226, '#fffdf2', 6);
    teksPx(ctx, 'jebak angka!', x, 196, '#ff9d9d', 6);
  }
  function gambarPapanPeringatan(x, t) {
    papanLebar(x, ['1/2 > 1/4', '> 1/8'], 52);
    teksPx(ctx, 'penyebut kecil,', x, 176, '#ffe9a3', 6);
    teksPx(ctx, 'potongan besar', x, 186, '#ffe9a3', 6);
  }

  /* --- p1-061: menjumlah pecahan senama --- */
  function gambarKueEmpatNampan(x, t) {
    lingkaran(ctx, x, 240, 16, '#c9a763');
    lingkaran(ctx, x, 240, 13, '#e8d8b8');
    lingkaran(ctx, x, 236, 10, '#e8b06a');
    P(ctx, x - 1, 224, 2, 24, '#8a5f38');
    P(ctx, x - 10, 235, 20, 2, '#8a5f38');
    teksPx(ctx, '4 potong senama', x, 184, '#ffe9a3', 6);
  }
  function gambarAmbilSatuDua(x, t) {
    lingkaran(ctx, x - 16, 242, 8, '#e8e0d0');
    lingkaran(ctx, x - 16, 242, 6, '#f8f2e4');
    potongKue(ctx, x - 18, 243, 7, '#e8b06a');
    teksPx(ctx, '1/4', x - 16, 222, '#fffdf2', 7);
    lingkaran(ctx, x + 16, 242, 8, '#e8e0d0');
    lingkaran(ctx, x + 16, 242, 6, '#f8f2e4');
    potongKue(ctx, x + 14, 243, 7, '#e8b06a');
    potongKue(ctx, x + 20, 243, 7, '#e8b06a');
    teksPx(ctx, '2/4', x + 16, 222, '#fffdf2', 7);
  }
  function gambarGabungTigaEmpat(x, t) {
    lingkaran(ctx, x, 242, 10, '#e8e0d0');
    lingkaran(ctx, x, 242, 8, '#f8f2e4');
    for (let i = 0; i < 3; i++) potongKue(ctx, x - 6 + i * 6, 243, 8, '#e8b06a');
    lingkaran(ctx, x + 26, 244, 6, '#c9a763');
    lingkaran(ctx, x + 26, 244, 4, '#e8d8b8');
    potongKue(ctx, x + 25, 245, 4, '#e8b06a');
    teksPx(ctx, '1/4 + 2/4 = 3/4', x + 6, 200, '#7dffa8', 6);
  }
  function gambarPapanAturanSenama(x, t) {
    papanLebar(x, ['penyebut tetap', '1/4+2/4=3/4'], 62);
    teksPx(ctx, 'beda ukuran?', x, 176, '#ffe9a3', 6);
    teksPx(ctx, 'samakan dulu', x, 186, '#ffe9a3', 6);
  }

  /* --- p1-062: kurang pecahan senama --- */
  function gambarKueTigaEmpat(x, t) {
    lingkaran(ctx, x, 242, 10, '#e8e0d0');
    lingkaran(ctx, x, 242, 8, '#f8f2e4');
    for (let i = 0; i < 3; i++) potongKue(ctx, x - 5 + i * 5, 243, 8, '#e8b06a');
    teksPx(ctx, '3/4', x, 182, '#fffdf2', 8);
  }
  function gambarMakanSatuPotong(x, t) {
    lingkaran(ctx, x, 242, 10, '#e8e0d0');
    lingkaran(ctx, x, 242, 8, '#f8f2e4');
    for (let i = 0; i < 3; i++) potongKue(ctx, x - 5 + i * 5, 243, 8, '#e8b06a');
    P(ctx, x + 12, 244, 2, 2, '#c98a4b');
    P(ctx, x + 15, 245, 2, 1, '#c98a4b');
    teksPx(ctx, '3/4 - 1/4', x, 200, '#ffe9a3', 7);
  }
  function gambarSisaDuaEmpat(x, t) {
    lingkaran(ctx, x, 242, 10, '#e8e0d0');
    lingkaran(ctx, x, 242, 8, '#f8f2e4');
    for (let i = 0; i < 2; i++) potongKue(ctx, x - 4 + i * 5, 243, 8, '#e8b06a');
    teksPx(ctx, '2/4 = 1/2', x, 202, '#7dffa8', 7);
  }
  function gambarPapanKantin(x, t) {
    papanLebar(x, ['3/4 - 1/4', '= 2/4'], 52);
    teksPx(ctx, 'penyebut tetap', x, 186, '#ffe9a3', 6);
  }

  /* --- p1-063: pecahan campuran --- */
  function gambarPiringUtuh(x, t) {
    lingkaran(ctx, x, 242, 10, '#e8e0d0');
    lingkaran(ctx, x, 242, 8, '#f8f2e4');
    lingkaran(ctx, x, 238, 7, '#e8b06a');
    lingkaran(ctx, x, 236, 3, '#f2b8cc');
    teksPx(ctx, '1 utuh', x, 182, '#fffdf2', 7);
  }
  function gambarPiringSetengah2(x, t) {
    lingkaran(ctx, x, 242, 10, '#e8e0d0');
    lingkaran(ctx, x, 242, 8, '#f8f2e4');
    setengahKue(ctx, x, 240, 8, '#e8b06a');
    teksPx(ctx, '1/2', x, 212, '#fffdf2', 8);
  }
  function gambarCampurSatuSetengah(x, t) {
    P(ctx, x - 24, 244, 48, 3, '#a3744a');
    lingkaran(ctx, x - 10, 235, 9, '#e8b06a');
    lingkaran(ctx, x - 10, 233, 4, '#f2b8cc');
    setengahKue(ctx, x + 10, 240, 8, '#e8b06a');
    teksPx(ctx, '1 1/2', x, 206, '#ffe9a3', 9);
    teksPx(ctx, 'satu setengah', x, 192, '#fffdf2', 6);
  }
  function gambarButuhSetengah(x, t) {
    setengahKue(ctx, x - 5, 238, 8, '#e8b06a');
    setengahKue(ctx, x + 5, 238, 8, '#e8b06a');
    teksPx(ctx, '1/2 + 1/2 = 1 utuh', x, 204, '#7dffa8', 7);
  }

  /* --- p1-064: bagian dari banyak --- */
  function gambarKelerengTikar(x, t) {
    P(ctx, x - 26, 226, 52, 20, '#c98a4b');
    P(ctx, x - 26, 226, 52, 2, '#b37a3e');
    P(ctx, x - 26, 244, 52, 2, '#b37a3e');
    for (let i = 0; i < 10; i++) {
      const mx = x - 20 + (i % 5) * 10, my = 232 + Math.floor(i / 5) * 8;
      lingkaran(ctx, mx, my, 2.2, i % 2 ? '#a5d8ff' : '#ffe9a3');
    }
    teksPx(ctx, '10 kelereng', x, 182, '#fffdf2', 7);
  }
  function gambarBagiDuaPiring(x, t) {
    for (let p = 0; p < 2; p++) {
      const px = x - 16 + p * 32;
      lingkaran(ctx, px, 242, 9, '#e8e0d0');
      lingkaran(ctx, px, 242, 7, '#f8f2e4');
      for (let i = 0; i < 5; i++) {
        const a = -Math.PI / 2 + (i - 2) * 0.55;
        lingkaran(ctx, px + Math.sin(a) * 4.5, 240 - Math.cos(a) * 3, 2, i % 2 ? '#a5d8ff' : '#ffe9a3');
      }
      teksPx(ctx, '5', px, 220, '#fffdf2', 7);
    }
    teksPx(ctx, 'bergantian', x, 200, '#ffe9a3', 6);
  }
  function gambarSetengahLima(x, t) {
    lingkaran(ctx, x, 242, 10, '#e8e0d0');
    lingkaran(ctx, x, 242, 8, '#f8f2e4');
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + (i - 2) * 0.55;
      lingkaran(ctx, x + Math.sin(a) * 5, 240 - Math.cos(a) * 3.5, 2.2, i % 2 ? '#a5d8ff' : '#ffe9a3');
    }
    teksPx(ctx, '1/2 dari 10 = 5', x, 190, '#7dffa8', 7);
  }
  function gambarCobaDelapan(x, t) {
    for (let p = 0; p < 2; p++) {
      const px = x - 16 + p * 32;
      lingkaran(ctx, px, 242, 9, '#e8e0d0');
      lingkaran(ctx, px, 242, 7, '#f8f2e4');
      for (let i = 0; i < 4; i++) {
        const a = -Math.PI / 2 + (i - 1.5) * 0.6;
        lingkaran(ctx, px + Math.sin(a) * 4.5, 240 - Math.cos(a) * 3, 2.2, '#a5d8ff');
      }
    }
    teksPx(ctx, '1/2 dari 8 = 4', x, 204, '#7dffa8', 7);
  }

  /* --- p1-065: menggambar pecahan --- */
  function gambarKertasPersegi(x, t) {
    P(ctx, x - 22, 222, 44, 24, '#f8f2e4');
    P(ctx, x - 22, 222, 44, 2, '#e8dcc8');
    kotakRangka(x - 12, 226, 24, 14, '#2a3757');
    teksPx(ctx, 'gambar persegi', x, 182, '#ffe9a3', 6);
  }
  function gambarGarisSilangKertas(x, t) {
    P(ctx, x - 22, 216, 44, 28, '#f8f2e4');
    kotakRangka(x - 12, 222, 24, 16, '#2a3757');
    P(ctx, x - 1, 222, 2, 16, '#2a3757');
    P(ctx, x - 12, 229, 24, 2, '#2a3757');
    teksPx(ctx, '4 sama besar', x, 200, '#ffe9a3', 6);
  }
  function gambarWarnaiDuaKotak(x, t) {
    P(ctx, x - 22, 216, 44, 28, '#f8f2e4');
    P(ctx, x - 12, 222, 12, 8, '#ffb86b');
    P(ctx, x, 230, 12, 8, '#ffb86b');
    kotakRangka(x - 12, 222, 24, 16, '#2a3757');
    P(ctx, x - 1, 222, 2, 16, '#2a3757');
    P(ctx, x - 12, 229, 24, 2, '#2a3757');
    teksPx(ctx, '2/4', x + 32, 228, '#fffdf2', 8);
  }
  function gambarTemanMembaca(x, t) {
    P(ctx, x - 34, 216, 28, 28, '#f8f2e4');
    P(ctx, x - 24, 222, 6, 8, '#ffb86b');
    P(ctx, x - 24, 230, 6, 8, '#ffb86b');
    kotakRangka(x - 24, 222, 12, 16, '#2a3757');
    P(ctx, x - 18, 222, 2, 16, '#2a3757');
    P(ctx, x - 24, 229, 12, 2, '#2a3757');
    papanLebar(x + 16, ['2/4 = 1/2', 'terbaca'], 44);
  }

  /* --- p1-066: tantangan potongan kue --- */
  function gambarKueDelapanGelang(x, t) {
    lingkaran(ctx, x, 235, 13, '#e8b06a');
    lingkaran(ctx, x, 233, 5, '#f2b8cc');
    P(ctx, x - 1, 220, 2, 30, '#8a5f38');
    P(ctx, x - 12, 234, 24, 2, '#8a5f38');
    for (let d = -3; d <= 3; d++) {                // dua garis potong diagonal
      P(ctx, x + d * 3, 234 + d * 2, 2, 2, '#8a5f38');
      P(ctx, x + d * 3, 234 - d * 2, 2, 2, '#8a5f38');
    }
    teksPx(ctx, '1/8 tiap potong', x, 182, '#ffe9a3', 6);
  }
  function gambarDimakanTigaGel(x, t) {
    lingkaran(ctx, x - 8, 234, 12, '#e8b06a');
    lingkaran(ctx, x - 8, 232, 5, '#f2b8cc');
    P(ctx, x - 9, 220, 2, 28, '#8a5f38');
    P(ctx, x - 20, 233, 24, 2, '#8a5f38');
    for (let i = 0; i < 3; i++) {
      P(ctx, x + 8 + i * 6, 234 + (i % 2) * 4, 2, 2, '#c98a4b');
    }
    teksPx(ctx, '3/8 dimakan', x + 6, 208, '#ffe9a3', 6);
  }
  function gambarSisaLimaDelapan(x, t) {
    lingkaran(ctx, x, 238, 12, '#e8b06a');
    lingkaran(ctx, x, 236, 5, '#f2b8cc');
    P(ctx, x - 1, 224, 2, 28, '#8a5f38');
    P(ctx, x - 12, 237, 24, 2, '#8a5f38');
    teksPx(ctx, '5/8 sisa', x, 200, '#7dffa8', 7);
  }
  function gambarLebihSetengah(x, t) {
    papanLebar(x, ['5/8 > 4/8', '(4/8 = 1/2)'], 54);
    teksPx(ctx, 'lebih dari setengah!', x, 186, '#7dffa8', 6);
  }

  /* --- p1-067: kenalan angka koma --- */
  function gambarGelasUkur(x, t) {
    P(ctx, x - 12, 206, 3, 38, '#9ab8c8');
    P(ctx, x + 9, 206, 3, 38, '#9ab8c8');
    P(ctx, x - 12, 242, 24, 3, '#9ab8c8');
    P(ctx, x - 9, 209, 18, 33, '#e8f6fc');
    P(ctx, x - 9, 212, 18, 2, '#ff6b6b');
    teksPx(ctx, '1 utuh', x, 198, '#fffdf2', 6);
    for (let i = 0; i < 4; i++) P(ctx, x - 9, 218 + i * 6, 4, 1, '#9ab8c8');
    teksPx(ctx, 'gelas ukur', x, 184, '#ffe9a3', 6);
  }
  function gambarGelasSetengah(x, t) {
    P(ctx, x - 12, 206, 3, 38, '#9ab8c8');
    P(ctx, x + 9, 206, 3, 38, '#9ab8c8');
    P(ctx, x - 12, 242, 24, 3, '#9ab8c8');
    P(ctx, x - 9, 209, 18, 33, '#e8f6fc');
    P(ctx, x - 9, 228, 18, 14, '#a5d8ff');
    P(ctx, x - 9, 228, 18, 2, '#63c8ff');
    P(ctx, x - 9, 226, 18, 2, '#ff6b6b');
    teksPx(ctx, '0,5', x, 202, '#fffdf2', 8);
    teksPx(ctx, 'setengah', x, 188, '#ffe9a3', 6);
  }
  function gambarPapanKepingan(x, t) {
    papanLebar(x, ['utuh', 'kepingan'], 56);
    teksPx(ctx, 'koma = pintunya', x, 186, '#ffe9a3', 6);
    teksPx(ctx, ',', x, 206, '#ffd166', 12);
  }
  function gambarKartuSahabat(x, t) {
    P(ctx, x - 26, 214, 22, 30, '#e8dcc8');
    P(ctx, x - 24, 216, 18, 26, '#f8f2e4');
    teksPx(ctx, '0,5', x - 15, 224, '#2a3757', 7);
    P(ctx, x + 4, 214, 22, 30, '#e8dcc8');
    P(ctx, x + 6, 216, 18, 26, '#f8f2e4');
    teksPx(ctx, '1/2', x + 15, 224, '#2a3757', 7);
    P(ctx, x - 4, 224, 8, 1, '#7dffa8');
    teksPx(ctx, 'sahabat dekat', x, 188, '#ffe9a3', 6);
  }

  /* --- p1-068: persepuluhan 0,1 --- */
  function gambarKandangUtuh(x, t) {
    P(ctx, x - 32, 212, 64, 4, '#a06a42');
    P(ctx, x - 28, 216, 56, 3, '#b37a3e');
    P(ctx, x - 28, 219, 56, 23, '#c9a763');
    P(ctx, x - 28, 219, 56, 2, '#d9b87e');
    P(ctx, x - 30, 242, 60, 4, '#8a6a44');
    P(ctx, x - 6, 230, 12, 12, '#7a5230');
    teksPx(ctx, '1', x, 222, '#fffdf2', 10);
    teksPx(ctx, 'satu utuh', x, 198, '#ffe9a3', 6);
  }
  function gambarSepuluhBilik(x, t) {
    P(ctx, x - 32, 212, 64, 4, '#a06a42');
    P(ctx, x - 30, 216, 60, 3, '#b37a3e');
    P(ctx, x - 30, 219, 60, 23, '#c9a763');
    for (let i = 1; i < 10; i++) P(ctx, x - 30 + i * 6, 219, 1, 23, '#8a6a44');
    P(ctx, x - 32, 242, 64, 4, '#8a6a44');
    teksPx(ctx, '10 bilik sama', x, 198, '#ffe9a3', 6);
  }
  function gambarBilikSatu(x, t) {
    P(ctx, x - 16, 214, 4, 30, '#8a6a44');
    P(ctx, x + 12, 214, 4, 30, '#8a6a44');
    P(ctx, x - 16, 240, 32, 4, '#8a6a44');
    P(ctx, x - 12, 218, 24, 22, '#c9a763');
    gambarCahaya(x, 229, 10, '#ffd166', t);
    lingkaran(ctx, x + 4, 234, 3, '#fffdf2');
    teksPx(ctx, '0,1', x - 3, 224, '#fffdf2', 8);
    teksPx(ctx, 'satu bilik', x, 198, '#ffe9a3', 6);
  }
  function gambarPapanKepSepuluh(x, t) {
    papanLebar(x, ['10 x 0,1', '= 1 utuh'], 58);
    teksPx(ctx, 'kembali ke satu', x, 186, '#7dffa8', 6);
  }

  /* --- p1-069: desimal & pecahan saudara --- */
  function gambarGerbangNolLima(x, t) {
    P(ctx, x - 16, 204, 32, 6, '#b8945a');
    P(ctx, x - 14, 210, 5, 34, '#c9a763');
    P(ctx, x + 9, 210, 5, 34, '#c9a763');
    P(ctx, x - 13, 216, 26, 12, '#1e2a44');
    teksPx(ctx, '0,5', x, 218, '#ffd166', 7);
    teksPx(ctx, 'gerbang kiri', x, 192, '#ffe9a3', 6);
  }
  function gambarGerbangSetengah(x, t) {
    P(ctx, x - 16, 204, 32, 6, '#b8945a');
    P(ctx, x - 14, 210, 5, 34, '#c9a763');
    P(ctx, x + 9, 210, 5, 34, '#c9a763');
    P(ctx, x - 13, 216, 26, 12, '#1e2a44');
    teksPx(ctx, '1/2', x, 218, '#7dffa8', 7);
    teksPx(ctx, 'gerbang kanan', x, 192, '#ffe9a3', 6);
  }
  function gambarTamanSatuKue(x, t) {
    P(ctx, x - 20, 236, 40, 3, '#a8825a');
    P(ctx, x - 17, 239, 3, 7, '#8a6a44');
    P(ctx, x + 14, 239, 3, 7, '#8a6a44');
    lingkaran(ctx, x, 228, 8, '#e8b06a');
    lingkaran(ctx, x, 225, 3, '#f2b8cc');
    teksPx(ctx, 'kue yang sama', x, 198, '#ffe9a3', 6);
  }
  function gambarGerbangSeperempat(x, t) {
    P(ctx, x - 28, 216, 22, 5, '#b8945a');
    P(ctx, x - 27, 221, 3, 25, '#c9a763');
    P(ctx, x - 8, 221, 3, 25, '#c9a763');
    P(ctx, x - 26, 226, 22, 10, '#1e2a44');
    teksPx(ctx, '0,25', x - 15, 227, '#ffd166', 5);
    P(ctx, x + 6, 216, 22, 5, '#b8945a');
    P(ctx, x + 7, 221, 3, 25, '#c9a763');
    P(ctx, x + 26, 221, 3, 25, '#c9a763');
    P(ctx, x + 8, 226, 18, 10, '#1e2a44');
    teksPx(ctx, '1/4', x + 17, 227, '#7dffa8', 6);
    teksPx(ctx, 'saudara seperempat', x, 192, '#ffe9a3', 6);
  }

  /* --- p1-070: membandingkan desimal --- */
  function gambarKartuTujuh(x, t) {
    P(ctx, x - 12, 210, 24, 34, '#e8dcc8');
    P(ctx, x - 10, 212, 20, 30, '#f8f2e4');
    P(ctx, x - 10, 212, 20, 5, '#63c8ff');
    teksPx(ctx, '0,7', x, 226, '#2a3757', 8);
    teksPx(ctx, 'kartu pendek', x, 196, '#ffe9a3', 6);
  }
  function gambarKartuDuaLima(x, t) {
    P(ctx, x - 17, 212, 34, 32, '#e8dcc8');
    P(ctx, x - 15, 214, 30, 28, '#f8f2e4');
    P(ctx, x - 15, 214, 30, 5, '#ff9d9d');
    teksPx(ctx, '0,25', x, 226, '#2a3757', 8);
    teksPx(ctx, 'tulis panjang', x, 198, '#ffe9a3', 6);
  }
  function gambarKacaPembesar(x, t) {
    lingkaran(ctx, x - 11, 230, 10, '#9ab8c8');
    lingkaran(ctx, x - 11, 230, 7, '#d8f0fa');
    teksPx(ctx, '7', x - 11, 226, '#2a3757', 8);
    P(ctx, x - 15, 238, 3, 8, '#7a5230');
    lingkaran(ctx, x + 12, 233, 9, '#9ab8c8');
    lingkaran(ctx, x + 12, 233, 6, '#d8f0fa');
    teksPx(ctx, '2', x + 12, 229, '#2a3757', 8);
    P(ctx, x + 10, 240, 3, 6, '#7a5230');
    teksPx(ctx, 'angka pertama', x, 198, '#ffe9a3', 6);
  }
  function gambarPapanSkor(x, t) {
    papanLebar(x, ['0,7 > 0,25', 'juara kiri'], 62);
    teksPx(ctx, 'jangan tertipu!', x, 186, '#7dffa8', 6);
  }

  /* --- p1-071: persen itu apa --- */
  function gambarLapanganSeratus(x, t) {
    for (let r = 0; r < 10; r++)
      for (let col = 0; col < 10; col++)
        P(ctx, x - 20 + col * 4, 204 + r * 4, 3, 3, (r + col) % 2 ? '#f2b8cc' : '#ffb86b');
    teksPx(ctx, '10 x 10 = 100 ubin', x, 190, '#ffe9a3', 6);
  }
  function gambarKotakSeratus(x, t) {
    P(ctx, x - 16, 228, 32, 16, '#a8825a');
    P(ctx, x - 16, 228, 32, 2, '#b8946a');
    for (let r = 0; r < 10; r++)
      for (let col = 0; col < 10; col++)
        P(ctx, x - 14 + col * 3, 231 + r * 1.2, 1, 1, (r + col) % 2 ? '#a5d8ff' : '#ffe9a3');
    teksPx(ctx, '100 kelereng', x, 208, '#fffdf2', 7);
  }
  function gambarAmbilDuaLima(x, t) {
    P(ctx, x - 16, 228, 32, 16, '#a8825a');
    for (let i = 0; i < 100; i++) {
      const r = Math.floor(i / 10), col = i % 10;
      P(ctx, x - 14 + col * 3, 231 + r * 1.2, 1, 1, i < 25 ? '#7dffa8' : '#e8f0f8');
    }
    teksPx(ctx, '25 diambil', x, 210, '#7dffa8', 7);
    teksPx(ctx, 'sisanya rapi', x, 200, '#ffe9a3', 6);
  }
  function gambarPapanPersen(x, t) {
    papanLebar(x, ['25%', '= 1/4'], 48);
    teksPx(ctx, '25 dari 100', x, 186, '#ffe9a3', 6);
  }

  /* --- p1-072: persen favorit 50% --- */
  function gambarBakPenuh(x, t) {
    P(ctx, x - 14, 204, 3, 40, '#9ab8c8');
    P(ctx, x + 11, 204, 3, 40, '#9ab8c8');
    P(ctx, x - 14, 242, 28, 3, '#9ab8c8');
    P(ctx, x - 11, 208, 22, 34, '#63c8ff');
    P(ctx, x - 11, 208, 22, 3, '#a5d8ff');
    teksPx(ctx, '100%', x, 192, '#7dffa8', 7);
    P(ctx, x - 2, 245, 4, 2, '#5f4426');
  }
  function gambarBakSetengah(x, t) {
    P(ctx, x - 14, 204, 3, 40, '#9ab8c8');
    P(ctx, x + 11, 204, 3, 40, '#9ab8c8');
    P(ctx, x - 14, 242, 28, 3, '#9ab8c8');
    P(ctx, x - 11, 226, 22, 16, '#63c8ff');
    P(ctx, x - 11, 226, 22, 2, '#a5d8ff');
    P(ctx, x - 11, 224, 22, 2, '#ff6b6b');
    teksPx(ctx, '50%', x, 192, '#7dffa8', 7);
  }
  function gambarBakKosong(x, t) {
    P(ctx, x - 14, 204, 3, 40, '#9ab8c8');
    P(ctx, x + 11, 204, 3, 40, '#9ab8c8');
    P(ctx, x - 14, 242, 28, 3, '#9ab8c8');
    P(ctx, x - 11, 240, 22, 2, '#ff6b6b');
    teksPx(ctx, '0%', x, 192, '#ffe9a3', 7);
  }
  function gambarPapanSatuKata(x, t) {
    papanLebar(x, ['100% utuh', '50% setengah', '0% habis'], 80);
    teksPx(ctx, 'cerita jadi ringkas', x, 180, '#ffe9a3', 6);
  }

  /* --- p1-073: tiga rupa satu makna --- */
  function gambarKueDiMeja(x, t) {
    P(ctx, x - 18, 234, 36, 3, '#a8825a');
    P(ctx, x - 16, 237, 3, 9, '#8a6a44');
    P(ctx, x + 13, 237, 3, 9, '#8a6a44');
    setengahKue(ctx, x, 232, 9, '#e8b06a');
    lingkaran(ctx, x - 3, 229, 2, '#f2b8cc');
    teksPx(ctx, 'sisa setengah kue', x, 200, '#ffe9a3', 6);
  }
  function gambarKacaPecahan(x, t) {
    P(ctx, x - 12, 204, 24, 40, '#7a5230');
    P(ctx, x - 9, 207, 18, 34, '#cfe0f2');
    P(ctx, x - 7, 209, 6, 12, '#e8f4fc');
    P(ctx, x - 10, 198, 20, 8, '#1e2a44');
    teksPx(ctx, '1/2', x, 199, '#ffd166', 6);
    setengahKue(ctx, x, 238, 6, '#e8b06a');
    teksPx(ctx, 'bahasa pecahan', x, 194, '#ffe9a3', 6);
  }
  function gambarKacaDesimal(x, t) {
    P(ctx, x - 12, 204, 24, 40, '#7a5230');
    P(ctx, x - 9, 207, 18, 34, '#cfe0f2');
    P(ctx, x - 7, 209, 6, 12, '#e8f4fc');
    P(ctx, x - 10, 198, 20, 8, '#1e2a44');
    teksPx(ctx, '0,5', x, 199, '#ffd166', 6);
    setengahKue(ctx, x, 238, 6, '#e8b06a');
    teksPx(ctx, 'bahasa koma', x, 194, '#ffe9a3', 6);
  }
  function gambarKacaPersen(x, t) {
    P(ctx, x - 12, 204, 24, 40, '#7a5230');
    P(ctx, x - 9, 207, 18, 34, '#cfe0f2');
    P(ctx, x - 7, 209, 6, 12, '#e8f4fc');
    P(ctx, x - 10, 198, 20, 8, '#1e2a44');
    teksPx(ctx, '50%', x, 199, '#ffd166', 6);
    setengahKue(ctx, x, 238, 6, '#e8b06a');
    teksPx(ctx, 'bahasa persen', x, 194, '#ffe9a3', 6);
  }

  /* --- p1-074: kenalan uang rupiah --- */
  function gambarDompetBuka(x, t) {
    P(ctx, x - 16, 226, 32, 18, '#8a5f38');
    P(ctx, x - 16, 226, 32, 3, '#a3744a');
    P(ctx, x - 16, 218, 32, 6, '#a3744a');
    P(ctx, x - 8, 212, 16, 8, '#7dffa8');
    P(ctx, x - 8, 214, 16, 2, '#ffe9a3');
    P(ctx, x - 12, 232, 24, 2, '#5f4426');
    P(ctx, x + 10, 232, 6, 8, '#c9a763');
    teksPx(ctx, 'uang di dompet', x, 198, '#ffe9a3', 6);
  }
  function gambarLembarSeribu(x, t) {
    P(ctx, x - 20, 222, 40, 22, '#a08a58');
    P(ctx, x - 18, 224, 36, 18, '#e0cfa0');
    P(ctx, x - 16, 226, 10, 14, '#c9b880');
    P(ctx, x + 6, 226, 10, 14, '#c9b880');
    teksPx(ctx, '1.000', x, 228, '#2a3757', 7);
    teksPx(ctx, 'seribu rupiah', x, 208, '#fffdf2', 7);
  }
  function gambarBarisanLembar(x, t) {
    P(ctx, x - 26, 226, 24, 18, '#a08a58');
    P(ctx, x - 24, 228, 20, 14, '#d8c8a8');
    teksPx(ctx, '2.000', x - 14, 230, '#2a3757', 5);
    P(ctx, x + 2, 222, 28, 22, '#a08a58');
    P(ctx, x + 4, 224, 24, 18, '#e8c890');
    teksPx(ctx, '5.000', x + 16, 228, '#2a3757', 6);
    teksPx(ctx, 'makin besar nilainya', x, 200, '#ffe9a3', 6);
  }
  function gambarPapanKoin(x, t) {
    papanLebar(x, ['1.000', '2.000', '5.000'], 44);
    lingkaran(ctx, x + 20, 236, 6, '#c9a763');
    lingkaran(ctx, x + 20, 236, 4, '#e0c080');
    teksPx(ctx, '500', x + 20, 233, '#6b4a2c', 4);
    teksPx(ctx, 'berlapis-lapis', x, 178, '#ffe9a3', 6);
  }

  /* --- p1-075: belanja & kembalian --- */
  function gambarPermenTigaRibu(x, t) {
    P(ctx, x - 18, 228, 36, 3, '#a8825a');
    lingkaran(ctx, x - 6, 221, 8, '#f8e2c8');
    lingkaran(ctx, x - 8, 219, 2, '#ff9d9d');
    lingkaran(ctx, x - 4, 222, 2, '#ffd166');
    lingkaran(ctx, x - 7, 224, 2, '#63c8ff');
    P(ctx, x + 4, 230, 20, 12, '#f8f2e4');
    P(ctx, x + 4, 230, 20, 2, '#e8dcc8');
    teksPx(ctx, '3.000', x + 14, 234, '#2a3757', 5);
    teksPx(ctx, 'harga di rak', x, 200, '#ffe9a3', 6);
  }
  function gambarBayarLimaRibu(x, t) {
    P(ctx, x - 18, 238, 36, 3, '#a8825a');
    P(ctx, x - 15, 227, 28, 12, '#a08a58');
    P(ctx, x - 13, 229, 24, 8, '#e8c890');
    teksPx(ctx, '5.000', x - 1, 231, '#2a3757', 5);
    teksPx(ctx, 'dibayar 5.000', x, 208, '#fffdf2', 6);
  }
  function gambarKembalianDua(x, t) {
    P(ctx, x - 14, 230, 24, 12, '#a08a58');
    P(ctx, x - 12, 232, 20, 8, '#d8c8a8');
    teksPx(ctx, '2.000', x - 2, 233, '#2a3757', 5);
    P(ctx, x + 12, 235, 6, 1, '#7dffa8');
    P(ctx, x + 18, 233, 2, 5, '#7dffa8');
    teksPx(ctx, 'kembalian', x, 210, '#7dffa8', 7);
  }
  function gambarPapanKurangKasir(x, t) {
    papanLebar(x, ['5.000-3.000', '= 2.000'], 64);
    teksPx(ctx, 'kembalian = kurang', x, 186, '#ffe9a3', 6);
  }

  /* --- p1-076: menabung seribu --- */
  function gambarKoinSenin(x, t) {
    lingkaran(ctx, x, 236, 8, '#c9a763');
    lingkaran(ctx, x, 236, 6, '#e0c080');
    teksPx(ctx, '500', x, 232, '#6b4a2c', 5);
    teksPx(ctx, 'Senin: 500', x, 206, '#fffdf2', 6);
  }
  function gambarKoinSelasa(x, t) {
    lingkaran(ctx, x - 8, 238, 8, '#c9a763');
    lingkaran(ctx, x - 8, 238, 6, '#e0c080');
    teksPx(ctx, '500', x - 8, 234, '#6b4a2c', 5);
    lingkaran(ctx, x + 7, 236, 8, '#c9a763');
    lingkaran(ctx, x + 7, 236, 6, '#e0c080');
    teksPx(ctx, '500', x + 7, 232, '#6b4a2c', 5);
    teksPx(ctx, '500 + 500 = 1.000', x, 206, '#fffdf2', 6);
  }
  function gambarKoinRabu(x, t) {
    for (let i = 0; i < 3; i++) {
      lingkaran(ctx, x - 16 + i * 12, 238 - i * 2, 8, '#c9a763');
      lingkaran(ctx, x - 16 + i * 12, 238 - i * 2, 6, '#e0c080');
      teksPx(ctx, '500', x - 16 + i * 12, 234 - i * 2, '#6b4a2c', 4);
    }
    teksPx(ctx, '500+500+500 = 1.500', x, 204, '#7dffa8', 6);
  }
  function gambarCelenganBahagia(x, t) {
    lingkaran(ctx, x - 4, 232, 14, '#f2b8cc');
    lingkaran(ctx, x - 8, 228, 9, '#f8cce0');
    P(ctx, x - 7, 216, 8, 2, '#8a5f38');
    P(ctx, x - 12, 245, 4, 2, '#c98a9b');
    P(ctx, x + 2, 245, 4, 2, '#c98a9b');
    P(ctx, x + 12, 226, 18, 12, '#f8f2e4');
    P(ctx, x + 12, 226, 18, 2, '#e8dcc8');
    teksPx(ctx, '1.500', x + 21, 229, '#2a3757', 5);
    teksPx(ctx, 'tabungan setia', x, 198, '#ffe9a3', 6);
  }

  /* --- p1-077: dunia bentuk datar --- */
  function gambarJendelaBentuk(x, t) {
    P(ctx, x - 16, 244, 32, 3, '#a3744a');
    P(ctx, x - 14, 200, 28, 44, '#8a6a44');
    P(ctx, x - 11, 203, 22, 38, '#ffe9a3');
    P(ctx, x - 1, 203, 2, 38, '#8a6a44');
    P(ctx, x - 11, 221, 22, 2, '#8a6a44');
    teksPx(ctx, '4 sisi kotak', x, 186, '#ffe9a3', 6);
  }
  function gambarRodaBentuk(x, t) {
    lingkaran(ctx, x, 222, 22, '#6b4a2c');
    lingkaran(ctx, x, 222, 19, '#e8dcc8');
    P(ctx, x - 1, 206, 2, 33, '#8a6a44');
    P(ctx, x - 17, 221, 35, 2, '#8a6a44');
    lingkaran(ctx, x, 222, 3, '#6b4a2c');
    teksPx(ctx, 'tanpa sudut', x, 186, '#ffe9a3', 6);
  }
  function gambarAtapBentuk(x, t) {
    P(ctx, x - 14, 226, 28, 20, '#c9a763');
    P(ctx, x - 4, 234, 8, 12, '#7a5230');
    gunungDi(ctx, x, 204, 26, 228, '#a3744a');
    teksPx(ctx, '2 garis miring', x, 190, '#ffe9a3', 6);
  }
  function gambarPapanTigaBentuk(x, t) {
    P(ctx, x - 2, 226, 4, 20, '#7a5230');
    P(ctx, x - 28, 192, 56, 34, '#1e2a44');
    P(ctx, x - 28, 192, 56, 2, '#37476f');
    P(ctx, x - 28, 224, 56, 2, '#141d33');
    P(ctx, x - 22, 200, 10, 10, '#63c8ff');
    lingkaran(ctx, x + 1, 205, 5, '#7dffa8');
    gunungDi(ctx, x + 15, 199, 7, 211, '#ffd166');
    teksPx(ctx, 'tiga sahabat bentuk', x, 178, '#ffe9a3', 6);
  }

  /* --- p1-078: garis, sisi & sudut --- */
  function gambarJalanLurus(x, t) {
    P(ctx, x - 1, 210, 3, 22, '#8a6a44');
    lingkaran(ctx, x, 208, 3, '#ffd166');
    P(ctx, x - 30, 232, 60, 3, '#fffdf2');
    P(ctx, x - 30, 232, 60, 1, '#e8f4fa');
    teksPx(ctx, 'lurus terus', x, 196, '#ffe9a3', 6);
  }
  function gambarTigaSisiTepi(x, t) {
    P(ctx, x - 26, 238, 52, 4, '#a3744a');
    for (let i = 0; i < 9; i++) {
      P(ctx, x - 26 + i * 3, 238 - i * 4, 3, 3, '#c9a763');
      P(ctx, x + 23 - i * 3, 238 - i * 4, 3, 3, '#c9a763');
    }
    P(ctx, x - 3, 202, 6, 4, '#c9a763');
    teksPx(ctx, '3 sisi bertemu', x, 186, '#ffe9a3', 6);
  }
  function gambarSikuKayu(x, t) {
    P(ctx, x - 16, 236, 34, 6, '#a3744a');
    P(ctx, x - 16, 210, 6, 32, '#a3744a');
    P(ctx, x - 16, 236, 34, 2, '#c9a763');
    P(ctx, x - 16, 210, 6, 2, '#c9a763');
    P(ctx, x - 10, 228, 8, 8, '#fffdf2');
    teksPx(ctx, 'sudut siku', x, 196, '#ffe9a3', 6);
  }
  function gambarPapanSudut(x, t) {
    papanLebar(x, ['kotak: 4 sudut', 'segitiga: 3'], 108);
    teksPx(ctx, 'aturan pertemuan', x, 176, '#ffe9a3', 6);
  }

  /* --- p1-079: keliling itu jalan keliling --- */
  function gambarBenderaMulai(x, t) {
    P(ctx, x - 4, 244, 11, 2, '#8a6a44');
    P(ctx, x - 1, 202, 3, 44, '#8a6a44');
    P(ctx, x + 2, 204, 14, 9, '#63c8ff');
    P(ctx, x + 2, 204, 14, 2, '#a8e0f5');
    teksPx(ctx, 'titik mulai', x, 190, '#ffe9a3', 6);
  }
  function gambarJalanOval(x, t) {
    P(ctx, x - 32, 224, 64, 16, '#c2a05e');
    P(ctx, x - 32, 224, 64, 2, '#d9b877');
    P(ctx, x - 32, 238, 64, 2, '#d9b877');
    P(ctx, x - 22, 228, 44, 8, '#7ec850');
    teksPx(ctx, 'jalan keliling', x, 190, '#ffe9a3', 6);
  }
  function gambarJejakKaki(x, t) {
    P(ctx, x - 26, 236, 3, 3, '#ffd166');
    for (let i = 0; i < 9; i++) {
      const a = Math.PI * (0.1 + 0.8 * i / 8);
      const px3 = x + Math.cos(a) * 26, py3 = 234 - Math.sin(a) * 16;
      P(ctx, px3 - 1, py3, 2, 2, i % 2 ? '#e8f4fa' : '#fffdf2');
    }
    teksPx(ctx, 'kembali ke mulai', x, 188, '#ffe9a3', 6);
  }
  function gambarPapanPutaran(x, t) {
    papanLebar(x, ['keliling =', '1 putaran'], 60);
    teksPx(ctx, 'pinggir ke pinggir', x, 176, '#ffe9a3', 6);
  }

  /* --- p1-080: keliling persegi panjang 8x5 --- */
  function gambarSisiPanjang(x, t) {
    P(ctx, x - 30, 238, 60, 4, '#d9b877');
    for (let i = 0; i < 8; i++) P(ctx, x - 28 + i * 8, 244, 3, 2, '#fffdf2');
    teksPx(ctx, '8 langkah', x, 222, '#fffdf2', 8);
    teksPx(ctx, 'sisi panjang', x, 190, '#ffe9a3', 6);
  }
  function gambarSisiLebar(x, t) {
    P(ctx, x + 22, 202, 4, 44, '#d9b877');
    for (let i = 0; i < 5; i++) P(ctx, x + 28, 204 + i * 8, 3, 3, '#fffdf2');
    teksPx(ctx, '5 langkah', x, 190, '#fffdf2', 8);
    teksPx(ctx, 'sisi lebar', x, 176, '#ffe9a3', 6);
  }
  function gambarPatroliPutar(x, t) {
    P(ctx, x - 32, 204, 64, 38, '#8fd15c');
    P(ctx, x - 32, 204, 64, 3, '#d9b877');
    P(ctx, x - 32, 239, 64, 3, '#d9b877');
    P(ctx, x - 32, 204, 3, 38, '#d9b877');
    P(ctx, x + 29, 204, 3, 38, '#d9b877');
    lingkaran(ctx, x + 18, 220, 3, '#ffd166');
    teksPx(ctx, '8+5+8+5 = 26', x, 190, '#fffdf2', 7);
  }
  function gambarPapan26(x, t) {
    papanLebar(x, ['(8+5) x 2', '= 26'], 62);
  }

  /* --- p1-081: luas itu pasang ubin --- */
  function gambarPagarLantai(x, t) {
    for (let i = 0; i < 7; i++) P(ctx, x - 30 + i * 10, 228, 3, 10, '#a3744a');
    P(ctx, x - 30, 226, 60, 2, '#a3744a');
    P(ctx, x - 30, 238, 60, 2, '#8a6a44');
    teksPx(ctx, 'masih kosong', x, 176, '#ffe9a3', 6);
    teksPx(ctx, 'pagar keliling', x, 190, '#ffe9a3', 6);
  }
  function gambarUbinPasang(x, t) {
    P(ctx, x - 30, 228, 60, 18, '#e8dcc8');
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 2; j++) P(ctx, x - 30 + i * 12, 228 + j * 9, 11, 8, (i + j) % 2 ? '#c9a763' : '#d9b87e');
    P(ctx, x + 6, 228, 1, 18, '#a8825a');
    P(ctx, x - 30, 237, 36, 1, '#a8825a');
    teksPx(ctx, 'dari pojok', x, 190, '#ffe9a3', 6);
  }
  function gambarUbinDuaBelas(x, t) {
    P(ctx, x - 30, 222, 60, 25, '#e8dcc8');
    for (let r = 0; r < 3; r++)
      for (let i = 0; i < 4; i++) P(ctx, x - 28 + i * 14, 224 + r * 7, 13, 6, (r + i) % 2 ? '#c9a763' : '#d9b87e');
    teksPx(ctx, '3 x 4 = 12 ubin', x, 190, '#fffdf2', 7);
    teksPx(ctx, 'luas lantai', x, 176, '#ffe9a3', 6);
  }
  function gambarPapanPagarKarpet(x, t) {
    papanLebar(x, ['keliling: pagar', 'luas: ubin'], 116);
    teksPx(ctx, 'beda pertanyaan', x, 176, '#ffe9a3', 6);
  }

  /* --- p1-082: luas persegi panjang 4x6 --- */
  function gambarBarisEnam(x, t) {
    P(ctx, x - 29, 244, 58, 2, '#a8825a');
    for (let i = 0; i < 6; i++) P(ctx, x - 27 + i * 9, 232, 8, 10, i % 2 ? '#c9a763' : '#d9b87e');
    teksPx(ctx, '1 baris = 6', x, 190, '#ffe9a3', 6);
  }
  function gambarEmpatBaris(x, t) {
    P(ctx, x - 29, 208, 58, 38, '#e8dcc8');
    for (let r = 0; r < 4; r++)
      for (let i = 0; i < 6; i++) P(ctx, x - 27 + i * 9, 210 + r * 9, 8, 8, (r + i) % 2 ? '#c9a763' : '#d9b87e');
    teksPx(ctx, '6+6+6+6 = 24', x, 190, '#fffdf2', 7);
    teksPx(ctx, '4 baris penuh', x, 176, '#ffe9a3', 6);
  }
  function gambarHitungLompat(x, t) {
    const angka = ['6', '12', '18', '24'];
    for (let i = 0; i < 4; i++) {
      const sx = x - 30 + i * 16;
      P(ctx, sx, 232 + (i % 2) * 3, 14, 10, '#8a8f9c');
      P(ctx, sx, 232 + (i % 2) * 3, 14, 1, '#b8c2d2');
      teksPx(ctx, angka[i], sx + 7, 234 + (i % 2) * 3, '#fffdf2', 6);
    }
    teksPx(ctx, 'kelipatan 6', x, 190, '#ffe9a3', 6);
  }
  function gambarPapan64(x, t) {
    papanLebar(x, ['4 x 6', '= 24'], 54);
    teksPx(ctx, 'hitung kilat', x, 176, '#ffe9a3', 6);
  }

  /* --- p1-083: segitiga setengah kotak --- */
  function gambarKotakUbin24(x, t) {
    P(ctx, x - 29, 210, 58, 36, '#e8dcc8');
    for (let r = 0; r < 4; r++)
      for (let i = 0; i < 6; i++) P(ctx, x - 27 + i * 9, 212 + r * 8, 8, 7, (r + i) % 2 ? '#c9a763' : '#d9b87e');
    teksPx(ctx, '4 x 6 = 24', x, 190, '#fffdf2', 7);
    teksPx(ctx, 'pesanan', x, 176, '#ffe9a3', 6);
  }
  function gambarSegitigaSampir(x, t) {
    for (let r = 0; r < 4; r++)
      for (let i = 0; i < 6; i++) {
        const dalam = (r + 0.5) > (4 / 6) * (i + 0.5);
        P(ctx, x - 27 + i * 9, 212 + r * 8, 8, 7, dalam ? '#a3744a' : '#e8dcc8');
      }
    for (let d = 0; d <= 6; d++) P(ctx, x - 28 + d * 9, Math.round(242 - d * 5.33), 2, 2, '#ffd166');
    teksPx(ctx, '12 dari 24', x, 190, '#ffe9a3', 6);
    teksPx(ctx, 'menyampir', x, 176, '#ffe9a3', 6);
  }
  function gambarDuaSegitiga(x, t) {
    for (let r = 0; r < 4; r++)
      for (let i = 0; i < 6; i++) {
        const kiri = (r + 0.5) > (4 / 6) * (i + 0.5);
        P(ctx, x - 27 + i * 9, 212 + r * 8, 8, 7, kiri ? '#a3744a' : '#c9a763');
      }
    teksPx(ctx, '12 + 12 = 24', x, 190, '#fffdf2', 7);
    teksPx(ctx, 'dua kembar', x, 176, '#ffe9a3', 6);
  }
  function gambarPapanSetengah(x, t) {
    papanLebar(x, ['1/2 x 6 x 4', '= 12'], 84);
    teksPx(ctx, 'luas segitiga', x, 176, '#ffe9a3', 6);
  }

  /* --- p1-084: lingkaran si bulat --- */
  function gambarPusatRoda(x, t) {
    lingkaran(ctx, x, 222, 20, '#8a8f9c');
    lingkaran(ctx, x, 222, 17, '#b8c2d2');
    gambarCahaya(x, 222, 8, '#ffd166', t);
    lingkaran(ctx, x, 222, 3, '#ffd166');
    teksPx(ctx, 'pusat roda', x, 190, '#ffe9a3', 6);
  }
  function gambarJariRoda(x, t) {
    lingkaran(ctx, x, 222, 20, '#8a8f9c');
    lingkaran(ctx, x, 222, 17, '#b8c2d2');
    for (let k = 0; k < 3; k++) {
      const a = -Math.PI / 2 + k * (2 * Math.PI / 3);
      for (let d = 5; d <= 16; d += 2) P(ctx, x + Math.cos(a) * d, 222 + Math.sin(a) * d, 2, 2, '#6b4a2c');
    }
    lingkaran(ctx, x, 222, 3, '#6b4a2c');
    teksPx(ctx, '3 jari sama', x, 190, '#ffe9a3', 6);
  }
  function gambarTaliKeliling(x, t) {
    lingkaran(ctx, x, 214, 23, '#d9b87e');
    lingkaran(ctx, x, 214, 20, '#8a8f9c');
    lingkaran(ctx, x, 214, 17, '#b8c2d2');
    lingkaran(ctx, x, 214, 3, '#8a8f9c');
    P(ctx, x - 26, 240, 52, 3, '#d9b87e');
    P(ctx, x - 27, 239, 2, 5, '#c9a763');
    P(ctx, x + 25, 239, 2, 5, '#c9a763');
    teksPx(ctx, 'tali diluruskan', x, 188, '#ffe9a3', 6);
  }
  function gambarPapanPi(x, t) {
    papanLebar(x, ['kira-kira', '3,14 x', 'diameter'], 62);
    teksPx(ctx, 'keliling roda', x, 176, '#ffe9a3', 6);
  }

  /* --- p1-085: kubus & balok --- */
  function gambarDaduBesar(x, t) {
    P(ctx, x - 16, 215, 24, 5, '#e8dcc8');
    P(ctx, x + 8, 215, 5, 5, '#c8bda6');
    P(ctx, x - 16, 220, 24, 24, '#f8f2e4');
    P(ctx, x + 8, 220, 5, 24, '#d8cdb8');
    lingkaran(ctx, x - 8, 228, 2, '#2a3757');
    lingkaran(ctx, x - 4, 232, 2, '#2a3757');
    lingkaran(ctx, x - 12, 236, 2, '#2a3757');
    teksPx(ctx, 'kubus sempurna', x, 190, '#ffe9a3', 6);
  }
  function gambarKardusBesar(x, t) {
    P(ctx, x - 20, 217, 40, 5, '#d9b87e');
    P(ctx, x + 20, 217, 5, 5, '#8a6a44');
    P(ctx, x - 20, 222, 40, 22, '#c9a763');
    P(ctx, x + 20, 222, 5, 22, '#a8825a');
    P(ctx, x - 2, 217, 4, 5, '#e8dcc8');
    P(ctx, x - 2, 222, 4, 22, '#e8dcc8');
    teksPx(ctx, 'balok', x, 190, '#ffe9a3', 6);
  }
  function gambarSisiEnamDadu(x, t) {
    P(ctx, x - 34, 200, 68, 44, '#f8f2e4');
    P(ctx, x - 34, 200, 68, 1, '#fffdf2');
    const kot = (i, r, num) => {
      P(ctx, x - 30 + i * 16, 216 + r * 14, 14, 11, '#e8dcc8');
      P(ctx, x - 30 + i * 16, 216 + r * 14, 14, 1, '#fffdf2');
      teksPx(ctx, num, x - 23 + i * 16, 219 + r * 14, '#2a3757', 6);
    };
    kot(0, 0, '1'); kot(1, 0, '2'); kot(2, 0, '3'); kot(3, 0, '4');
    kot(1, -1, '5'); kot(1, 1, '6');
    teksPx(ctx, 'hitung: 6 sisi', x, 188, '#ffe9a3', 6);
  }
  function gambarPapanIsi(x, t) {
    papanLebar(x, ['bentuk 3D', 'punya isi'], 68);
    teksPx(ctx, 'dari datar ke berisi', x, 176, '#ffe9a3', 6);
  }

  /* --- p1-086: detektif bentuk --- */
  function gambarPapanMisi(x, t) {
    P(ctx, x - 2, 226, 4, 20, '#7a5230');
    P(ctx, x - 30, 190, 60, 36, '#1e2a44');
    P(ctx, x - 30, 190, 60, 2, '#37476f');
    P(ctx, x - 30, 224, 60, 2, '#141d33');
    for (let i = 0; i < 5; i++) P(ctx, x - 25 + i * 11, 198, 9, 9, '#f8f2e4');
    teksPx(ctx, '5 kotak misi', x, 178, '#ffe9a3', 6);
  }
  function gambarJendelaPintu(x, t) {
    P(ctx, x - 26, 214, 18, 18, '#8a6a44');
    P(ctx, x - 23, 217, 12, 12, '#ffd9a8');
    P(ctx, x - 18, 217, 1, 12, '#8a6a44');
    P(ctx, x + 2, 200, 16, 44, '#a3744a');
    P(ctx, x + 14, 222, 3, 5, '#ffd166');
    teksPx(ctx, '2 bentuk!', x, 188, '#7dffa8', 6);
  }
  function gambarPiringAtap(x, t) {
    lingkaran(ctx, x - 12, 236, 9, '#f8f2e4');
    lingkaran(ctx, x - 12, 236, 7, '#e8dcc8');
    P(ctx, x + 4, 228, 18, 14, '#c9a763');
    gunungDi(ctx, x + 13, 216, 11, 228, '#a3744a');
    P(ctx, x + 10, 234, 5, 8, '#7a5230');
    teksPx(ctx, '2 lagi!', x, 188, '#7dffa8', 6);
  }
  function gambarKotakMainan(x, t) {
    P(ctx, x - 12, 217, 22, 5, '#8fd8f5');
    P(ctx, x + 10, 217, 5, 5, '#2a7fa8');
    P(ctx, x - 12, 222, 22, 22, '#63c8ff');
    P(ctx, x + 10, 222, 5, 22, '#3a8fc0');
    teksPx(ctx, 'bentuk ke-5!', x, 190, '#7dffa8', 6);
  }
  function gambarPapanDitemukan(x, t) {
    P(ctx, x - 2, 226, 4, 20, '#7a5230');
    P(ctx, x - 32, 186, 64, 40, '#1e2a44');
    P(ctx, x - 32, 186, 64, 2, '#37476f');
    P(ctx, x - 32, 224, 64, 2, '#141d33');
    for (let i = 0; i < 5; i++) {
      const bx = x - 26 + i * 12;
      P(ctx, bx, 194, 9, 9, '#7dffa8');
      P(ctx, bx + 2, 197, 2, 3, '#1e2a44');
      P(ctx, bx + 4, 200, 3, 2, '#1e2a44');
    }
    teksPx(ctx, 'misi tuntas!', x, 176, '#7dffa8', 6);
  }

  /* --- p1-087: panjang cm & m --- */
  function gambarPenggarisRaksasa(x, t) {
    P(ctx, x - 40, 228, 80, 12, '#c9a763');
    P(ctx, x - 40, 228, 80, 2, '#e0bd85');
    P(ctx, x - 40, 238, 80, 2, '#a8874c');
    for (let i = 0; i <= 8; i++) P(ctx, x - 36 + i * 9, 228, 1, i % 2 ? 5 : 8, '#8a6a3c');
    teksPx(ctx, '1 m = 100 cm', x, 190, '#ffe9a3', 6);
  }
  function gambarJariKelingking(x, t) {
    P(ctx, x - 22, 236, 36, 5, '#e8dcc8');
    P(ctx, x - 14, 218, 10, 18, '#e8b88a');
    P(ctx, x - 12, 216, 6, 4, '#f2c8a0');
    P(ctx, x - 4, 226, 12, 10, '#dca878');
    P(ctx, x - 18, 228, 6, 8, '#dca878');
    P(ctx, x - 22, 238, 2, 3, '#c89868');
    teksPx(ctx, 'kira-kira 1 cm', x, 188, '#ffe9a3', 6);
  }
  function gambarLangkahMeter(x, t) {
    for (let i = 0; i < 4; i++) P(ctx, x - 30 + i * 20, 238, 2, 8, '#fffdf2');
    lingkaran(ctx, x - 20, 242, 3, '#e8e2d2');
    lingkaran(ctx, x - 2, 242, 3, '#e8e2d2');
    lingkaran(ctx, x + 16, 242, 3, '#e8e2d2');
    teksPx(ctx, '1 langkah = 1 m', x, 188, '#ffe9a3', 6);
  }
  function gambarPapanMeter(x, t) {
    papanLebar(x, ['meter:', 'dari bumi', '10 juta'], 62);
    teksPx(ctx, 'konon, Prancis', x, 176, '#ffe9a3', 6);
  }

  /* --- p1-088: berat gram & kg --- */
  function gambarNeracaPas(x, t) {
    P(ctx, x - 2, 220, 4, 18, '#7a5230');
    P(ctx, x - 24, 218, 48, 3, '#9aa6b8');
    P(ctx, x - 10, 226, 2, 10, '#7a5230'); P(ctx, x + 8, 226, 2, 10, '#7a5230');
    P(ctx, x - 18, 236, 18, 4, '#b8c2d2');
    P(ctx, x, 236, 20, 4, '#b8c2d2');
    P(ctx, x - 16, 228, 10, 8, '#f8f2e4');
    P(ctx, x + 3, 230, 7, 6, '#c9a763'); P(ctx, x + 11, 230, 7, 6, '#c9a763');
    teksPx(ctx, '500', x - 13, 229, '#2a3757', 6);
    teksPx(ctx, '250+250 = 500', x, 190, '#7dffa8', 6);
  }
  function gambarGulaKilo(x, t) {
    P(ctx, x - 14, 216, 28, 22, '#f8f2e4');
    P(ctx, x - 14, 216, 28, 4, '#fffdf2');
    P(ctx, x - 10, 224, 20, 8, '#e8dcc8');
    teksPx(ctx, '1 kg', x, 225, '#2a3757', 7);
    teksPx(ctx, '1 kg = 1.000 g', x, 190, '#ffe9a3', 6);
  }
  function gambarTelurKertas(x, t) {
    lingkaran(ctx, x - 10, 238, 5, '#f8f2e4');
    lingkaran(ctx, x - 10, 235, 4, '#fffdf2');
    P(ctx, x + 4, 238, 16, 4, '#fdfaf2');
    P(ctx, x + 4, 240, 16, 1, '#e8e2d2');
    teksPx(ctx, 'telur 50 g', x - 12, 190, '#ffe9a3', 6);
    teksPx(ctx, 'kertas 5 g', x + 12, 178, '#ffe9a3', 6);
  }
  function gambarPapanKilo(x, t) {
    papanLebar(x, ['1 liter air', '= 1 kg', 'konon'], 60);
    teksPx(ctx, 'asal kilogram', x, 176, '#ffe9a3', 6);
  }

  /* --- p1-089: takaran liter & ml --- */
  function gambarGelasUkur250(x, t) {
    P(ctx, x - 12, 214, 24, 24, '#d8f0fa');
    P(ctx, x - 12, 222, 24, 16, '#63c8ff');
    P(ctx, x - 12, 222, 24, 1, '#8fd8f5');
    for (let i = 0; i < 3; i++) P(ctx, x - 12, 216 + i * 6, 6, 1, '#2a7fa8');
    P(ctx, x - 13, 213, 26, 2, '#2a7fa8');
    teksPx(ctx, '250 ml', x, 188, '#ffe9a3', 6);
  }
  function gambarBotolLiter(x, t) {
    P(ctx, x - 6, 204, 12, 8, '#8fd8f5');
    P(ctx, x - 10, 212, 20, 26, '#63c8ff');
    P(ctx, x - 10, 218, 20, 20, '#5ab8e8');
    P(ctx, x - 10, 212, 20, 2, '#b8e6fa');
    P(ctx, x - 6, 202, 12, 3, '#2a7fa8');
    teksPx(ctx, '1 L', x, 224, '#fffdf2', 7);
    teksPx(ctx, '1 L = 1.000 ml', x, 188, '#ffe9a3', 6);
  }
  function gambarTekoTuang(x, t) {
    P(ctx, x - 34, 222, 20, 16, '#b8c2d2');
    P(ctx, x - 32, 218, 16, 5, '#9aa6b8');
    P(ctx, x - 15, 224, 8, 3, '#9aa6b8');
    lingkaran(ctx, x - 36, 240, 3, '#7a5230'); lingkaran(ctx, x - 21, 240, 3, '#7a5230');
    for (let i = 0; i < 4; i++) {
      const gx = x - 6 + i * 11;
      P(ctx, gx, 232, 8, 8, '#d8f0fa');
      P(ctx, gx, 234, 8, 6, '#63c8ff');
      teksPx(ctx, '250', gx + 4, 240, '#fffdf2', 5);
    }
    teksPx(ctx, '4 x 250 = 1.000 ml', x + 6, 186, '#7dffa8', 6);
  }
  function gambarPapanLiter(x, t) {
    papanLebar(x, ['1 L air', '= 1 kg', 'konon'], 58);
    teksPx(ctx, 'takaran dan berat', x, 176, '#ffe9a3', 6);
  }

  /* --- p1-090: jam & menit --- */
  function gambarJamRaksasa(x, t) {
    lingkaran(ctx, x, 220, 22, '#7a5230');
    lingkaran(ctx, x, 220, 19, '#f8f2e4');
    for (let i = 0; i < 12; i++) {
      const a = i * Math.PI / 6 - Math.PI / 2;
      P(ctx, x + Math.round(Math.cos(a) * 16), 220 + Math.round(Math.sin(a) * 16), 2, 2, '#2a3757');
    }
    teksPx(ctx, '12', x, 205, '#2a3757', 5);
    teksPx(ctx, '3', x + 13, 218, '#2a3757', 5);
    teksPx(ctx, '9', x - 13, 218, '#2a3757', 5);
    P(ctx, x - 1, 216, 2, 6, '#2a3757');
    P(ctx, x, 219, 12, 2, '#bd5a5f');
    teksPx(ctx, 'pendek: jam', x, 190, '#ffe9a3', 6);
    teksPx(ctx, 'panjang: menit', x, 178, '#ffe9a3', 6);
  }
  function gambarJarumDua(x, t) {
    lingkaran(ctx, x, 222, 15, '#7a5230');
    lingkaran(ctx, x, 222, 12, '#f8f2e4');
    teksPx(ctx, '12', x, 210, '#2a3757', 5);
    teksPx(ctx, '3', x + 9, 219, '#2a3757', 5);
    P(ctx, x - 1, 211, 2, 11, '#bd5a5f');
    P(ctx, x, 221, 8, 2, '#2a3757');
    teksPx(ctx, 'pukul 3 tepat', x, 188, '#ffe9a3', 6);
    teksPx(ctx, '12 x 5 menit = 60', x, 176, '#ffe9a3', 6);
  }
  function gambarDetikBerlari(x, t) {
    papanLebar(x, ['1 menit', '60 detik', '1 jam', '60 menit'], 56);
    teksPx(ctx, 'tik... tik...', x, 176, '#ffe9a3', 6);
  }
  function gambarPapanEnamPuluh(x, t) {
    papanLebar(x, ['60 adil bagi', '2 3 4 5 6', '= 30 20 15', '12 10'], 76);
    teksPx(ctx, 'konon, Babilonia', x, 176, '#ffe9a3', 6);
  }

  /* --- p1-091: hari, minggu & kalender --- */
  function gambarKalenderTujuh(x, t) {
    P(ctx, x - 36, 206, 72, 32, '#f8f2e4');
    P(ctx, x - 36, 206, 72, 5, '#bd5a5f');
    P(ctx, x - 30, 200, 4, 8, '#7a5230'); P(ctx, x + 26, 200, 4, 8, '#7a5230');
    for (let i = 0; i < 7; i++) {
      P(ctx, x - 33 + i * 9, 214, 8, 10, i === 6 ? '#ffd166' : '#e8dcc8');
      teksPx(ctx, String(i + 1), x - 29 + i * 9, 216, '#2a3757', 5);
    }
    teksPx(ctx, '7 hari/minggu', x, 190, '#ffe9a3', 6);
  }
  function gambarBulanFase(x, t) {
    P(ctx, x - 30, 226, 60, 3, '#7a5230');
    lingkaran(ctx, x - 22, 220, 7, '#1c2740'); lingkaran(ctx, x - 19, 220, 7, '#f2ecd8');
    lingkaran(ctx, x - 8, 220, 7, '#f2ecd8');
    lingkaran(ctx, x + 7, 220, 7, '#f2ecd8'); lingkaran(ctx, x + 10, 220, 7, '#1c2740');
    lingkaran(ctx, x + 22, 220, 7, '#1c2740');
    teksPx(ctx, 'seputaran 30 hari', x, 188, '#ffe9a3', 6);
    teksPx(ctx, 'konon, dari bulan', x, 176, '#ffe9a3', 6);
  }
  function gambarKabisatEmpat(x, t) {
    papanLebar(x, ['365 hari', '+ 1 tiap', '4 tahun', '= 366'], 58);
    teksPx(ctx, 'tahun kabisat', x, 176, '#ffe9a3', 6);
  }
  function gambarPapanWaktu(x, t) {
    papanLebar(x, ['hari - minggu', '- bulan -', 'tahun'], 66);
    teksPx(ctx, 'buku catatan waktu', x, 176, '#ffe9a3', 6);
  }

  /* --- p1-092: panas & dingin suhu --- */
  function gambarTermometerBeku(x, t) {
    P(ctx, x - 4, 208, 8, 26, '#e8eef8');
    P(ctx, x - 2, 210, 4, 12, '#63c8ff');
    lingkaran(ctx, x, 236, 6, '#63c8ff');
    lingkaran(ctx, x, 236, 3, '#8fd8f5');
    P(ctx, x + 4, 226, 10, 3, '#2a7fa8');
    lingkaran(ctx, x - 12, 244, 4, '#f4f8fc'); lingkaran(ctx, x + 12, 245, 3, '#f4f8fc');
    teksPx(ctx, '0 = beku', x, 190, '#ffe9a3', 6);
  }
  function gambarTermometerDidih(x, t) {
    P(ctx, x - 4, 200, 8, 34, '#e8eef8');
    P(ctx, x - 2, 202, 4, 26, '#ff6b35');
    lingkaran(ctx, x, 236, 6, '#ff6b35');
    lingkaran(ctx, x, 236, 3, '#ff9d4a');
    P(ctx, x + 4, 200, 10, 3, '#bd3f3f');
    P(ctx, x - 14, 240, 28, 5, '#5a4a44');
    P(ctx, x - 10, 234, 20, 6, '#9aa6b8');
    teksPx(ctx, '100 = didih', x, 190, '#ffe9a3', 6);
  }
  function gambarTubuhTigaTujuh(x, t) {
    papanLebar(x, ['37', 'suhu tubuh', 'sehat'], 54);
    teksPx(ctx, 'kira-kira', x, 176, '#ffe9a3', 6);
  }
  function gambarPapanDerajat(x, t) {
    papanLebar(x, ['skala', 'Celsius', 'konon'], 56);
    teksPx(ctx, 'nama dari Swedia', x, 176, '#ffe9a3', 6);
  }

  /* --- p1-093: pola berulang --- */
  function gambarLampuFestival(x, t) {
    P(ctx, x - 38, 196, 76, 2, '#3a4a78');
    for (let i = 0; i < 6; i++) {
      const lx = x - 30 + i * 12;
      P(ctx, lx, 198, 1, 4, '#3a4a78');
      lingkaran(ctx, lx, 206, 4, i % 2 ? '#63c8ff' : '#ff6b6b');
      lingkaran(ctx, lx - 1, 205, 2, i % 2 ? '#b0e0ff' : '#ffb0b0');
    }
    teksPx(ctx, 'merah-biru', x, 188, '#ffe9a3', 6);
    teksPx(ctx, 'pola: merah', x, 176, '#7dffa8', 6);
  }
  function gambarUbinPola(x, t) {
    for (let i = 0; i < 6; i++) {
      const ux = x - 36 + i * 12;
      P(ctx, ux, 234, 11, 10, '#c8bda6');
      if (i % 2) lingkaran(ctx, ux + 5, 239, 3, '#63c8ff');
      else gunungDi(ctx, ux + 5, 236, 4, 244, '#ff6b6b');
    }
    teksPx(ctx, 'segitiga bulat berulang', x, 188, '#ffe9a3', 6);
  }
  function gambarGelangManik(x, t) {
    const cx = x, cy = 224;
    for (let d = 0; d < 12; d++) {
      const a = d * Math.PI / 6;
      lingkaran(ctx, cx + Math.round(Math.cos(a) * 13), cy + Math.round(Math.sin(a) * 13), 3, d % 2 ? '#7dffa8' : '#ffd166');
    }
    teksPx(ctx, 'kuning hijau berputar', x, 188, '#ffe9a3', 6);
  }
  function gambarPapanPola(x, t) {
    papanLebar(x, ['pola =', 'bisa diulang'], 66);
    teksPx(ctx, 'pintasan berpikir', x, 176, '#ffe9a3', 6);
  }

  /* --- p1-094: angka yang hilang --- */
  function gambarJejakHilang(x, t) {
    P(ctx, x - 2, 226, 4, 14, '#7a5230');
    P(ctx, x - 30, 204, 60, 24, '#1e2a44');
    P(ctx, x - 30, 204, 60, 2, '#37476f');
    const kart = (i, txt, col) => {
      P(ctx, x - 26 + i * 14, 210, 11, 12, '#f8f2e4');
      teksPx(ctx, txt, x - 20 + i * 14, 212, col || '#2a3757', 6);
    };
    kart(0, '2'); kart(1, '4'); kart(2, '?', '#bd5a5f'); kart(3, '8');
    teksPx(ctx, '2, 4, ?, 8', x, 190, '#ffe9a3', 6);
  }
  function gambarKacaTeka(x, t) {
    lingkaran(ctx, x - 4, 224, 11, '#8fd8f5');
    lingkaran(ctx, x - 4, 224, 8, '#d8f0fa');
    P(ctx, x + 4, 232, 8, 3, '#7a5230');
    teksPx(ctx, '2', x - 30, 232, '#f8f2e4', 7);
    P(ctx, x - 22, 235, 10, 2, '#ffd166');
    teksPx(ctx, '4', x - 2, 246, '#f8f2e4', 7);
    teksPx(ctx, 'lompat 2', x, 188, '#7dffa8', 6);
  }
  function gambarKartuTebak(x, t) {
    P(ctx, x - 18, 204, 36, 36, '#33466e');
    P(ctx, x - 14, 210, 28, 24, '#242c48');
    P(ctx, x - 8, 218, 16, 10, '#ffd166');
    teksPx(ctx, '6', x, 220, '#2a3757', 7);
    P(ctx, x - 4, 206, 8, 4, '#8898a8');
    teksPx(ctx, '4+2=6, 6+2=8', x, 190, '#7dffa8', 6);
  }
  function gambarPapanBeda(x, t) {
    papanLebar(x, ['beda tetangga', 'selalu 2'], 72);
    teksPx(ctx, '2-4-6-8', x, 176, '#ffe9a3', 6);
  }

  /* --- p1-095: kotak ajaib --- */
  function gambarKotakAjaib(x, t) {
    const kot = [[4, 9, 2], [3, 5, 7], [8, 1, 6]];
    for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) {
      const bx = x - 24 + k * 16, by = 206 + r * 14;
      P(ctx, bx, by, 14, 12, '#4a3a78');
      P(ctx, bx, by, 14, 1, '#6a58a8');
      teksPx(ctx, String(kot[r][k]), bx + 7, by + 2, '#fff3cf', 6);
    }
    teksPx(ctx, 'semua garis 15', x, 190, '#ffe9a3', 6);
  }
  function gambarGarisAjaib(x, t) {
    const kot = [[4, 9, 2], [3, 5, 7], [8, 1, 6]];
    for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) {
      const bx = x - 24 + k * 16, by = 206 + r * 14;
      P(ctx, bx, by, 14, 12, r === 0 ? '#ffd166' : '#4a3a78');
      teksPx(ctx, String(kot[r][k]), bx + 7, by + 2, r === 0 ? '#2a3757' : '#fff3cf', 6);
    }
    teksPx(ctx, '4+9+2 = 15', x, 190, '#7dffa8', 6);
  }
  function gambarKuraLegenda(x, t) {
    lingkaran(ctx, x + 12, 238, 4, '#8a9a78');
    P(ctx, x - 16, 234, 28, 10, '#6b7a5a');
    lingkaran(ctx, x - 2, 230, 11, '#7a8a68');
    lingkaran(ctx, x - 6, 227, 7, '#8a9a78');
    for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) {
      P(ctx, x - 9 + k * 4, 225 + r * 4, 2, 2, (r * 3 + k) % 2 ? '#c9d4b8' : '#4a5a40');
    }
    P(ctx, x - 14, 244, 4, 2, '#5a6a4a'); P(ctx, x + 6, 244, 4, 2, '#5a6a4a');
    teksPx(ctx, 'konon, China kuno', x, 190, '#ffe9a3', 6);
  }
  function gambarPapanLimaBelas(x, t) {
    papanLebar(x, ['1 sampai 9', '= 45', '45 : 3 = 15'], 66);
    teksPx(ctx, 'rahasia angka', x, 176, '#ffe9a3', 6);
  }

  /* --- p1-096: hitung cepat --- */
  function gambarLombaMulai(x, t) {
    P(ctx, x - 20, 236, 4, 10, '#8a5f38');
    P(ctx, x - 16, 232, 14, 9, '#63c8ff');
    P(ctx, x + 14, 230, 40, 14, '#1e2a44');
    teksPx(ctx, '99+17', x + 34, 233, '#fffdf2', 6);
    teksPx(ctx, 'lomba mulai!', x, 190, '#ffe9a3', 6);
  }
  function gambarGeserSatu(x, t) {
    P(ctx, x - 26, 236, 20, 5, '#b8c2d2');
    P(ctx, x + 6, 236, 20, 5, '#b8c2d2');
    for (let i = 0; i < 4; i++) lingkaran(ctx, x - 22 + i * 5, 232, 2, '#f6c453');
    for (let i = 0; i < 2; i++) lingkaran(ctx, x + 10 + i * 5, 232, 2, '#f6c453');
    lingkaran(ctx, x - 10, 226, 2, '#ffd166');
    teksPx(ctx, '100', x - 16, 222, '#fffdf2', 6);
    teksPx(ctx, '16', x + 12, 222, '#fffdf2', 6);
    teksPx(ctx, 'pindah 1: 17 jadi 16', x, 188, '#7dffa8', 6);
  }
  function gambarPapanSeratusEnam(x, t) {
    papanLebar(x, ['100 + 16', '= 116'], 60);
    teksPx(ctx, 'jawaban kilat', x, 176, '#7dffa8', 6);
  }
  function gambarFinishKilat(x, t) {
    P(ctx, x - 24, 226, 4, 20, '#8a5f38');
    for (let r = 0; r < 4; r++) P(ctx, x - 20 + Math.round(Math.sin(r) * 2), 226 + r * 4, 22, 4, r % 2 ? '#fffdf2' : '#1c2740');
    papanLebar(x + 26, ['98+27', '=100+25', '= 125'], 64);
    teksPx(ctx, 'soal kedua', x - 10, 190, '#ffe9a3', 6);
  }

  /* --- p1-097: labirin kelipatan 3 --- */
  function gambarGerbangLabirin(x, t) {
    P(ctx, x - 26, 212, 6, 34, '#7a5a48');
    P(ctx, x + 20, 212, 6, 34, '#7a5a48');
    P(ctx, x - 30, 200, 60, 14, '#8a6a54');
    teksPx(ctx, 'kelipatan 3', x, 203, '#ffe9a3', 6);
    lingkaran(ctx, x - 10, 226, 5, '#ffd166');
    lingkaran(ctx, x + 10, 226, 5, '#ffd166');
    teksPx(ctx, 'pintu memilih', x, 190, '#ffe9a3', 6);
  }
  function gambarJalurTiga(x, t) {
    for (let i = 0; i < 6; i++) {
      const bx = x - 34 + i * 14;
      lingkaran(ctx, bx, 240 - (i % 2) * 4, 5, '#c8bda6');
      teksPx(ctx, String((i + 1) * 3), bx, 238 - (i % 2) * 4, '#2a3757', 5);
    }
    teksPx(ctx, '3 6 9 12 15 18', x, 190, '#ffe9a3', 6);
    teksPx(ctx, 'lompat +3', x, 178, '#7dffa8', 6);
  }
  function gambarJalanBuntu(x, t) {
    P(ctx, x - 22, 214, 16, 26, '#6b4a38');
    P(ctx, x + 6, 214, 16, 26, '#6b4a38');
    teksPx(ctx, '14', x - 14, 222, '#e8dcc8', 6);
    teksPx(ctx, '25', x + 14, 222, '#e8dcc8', 6);
    P(ctx, x - 19, 217, 10, 2, '#ff6b6b'); P(ctx, x + 9, 217, 10, 2, '#ff6b6b');
    teksPx(ctx, 'bukan kelipatan 3', x, 190, '#ff9d9d', 6);
  }
  function gambarPapanKetiga(x, t) {
    papanLebar(x, ['27: 2+7=9', '12: 1+2=3', 'habis bagi 3'], 74);
    teksPx(ctx, 'jurus digit', x, 176, '#ffe9a3', 6);
  }

  /* --- p1-098: logika A B C --- */
  function gambarTigaMenara(x, t) {
    P(ctx, x - 26, 216, 14, 24, '#b8ccae');
    P(ctx, x - 6, 226, 12, 14, '#b8ccae');
    P(ctx, x + 12, 234, 10, 6, '#b8ccae');
    K.gambar.bolaLentera(ctx, x - 19, 210, '#a5d8ff', '#4a7fc0', 'A', t * 2);
    K.gambar.bolaLentera(ctx, x, 220, '#ffd8b0', '#c07d4c', 'B', t * 2 + 1);
    K.gambar.bolaLentera(ctx, x + 17, 228, '#c8f0d0', '#4c9a60', 'C', t * 2 + 2);
    teksPx(ctx, 'A B C', x, 188, '#ffe9a3', 6);
  }
  function gambarDuelTanya(x, t) {
    papanLebar(x, ['A > B', 'B > C', 'siapa juara?'], 70);
    teksPx(ctx, 'tanpa meteran', x, 176, '#ffe9a3', 6);
  }
  function gambarDominoLogika(x, t) {
    P(ctx, x - 24, 234, 10, 12, '#f8f2e4');
    P(ctx, x - 10, 232, 10, 14, '#f8f2e4');
    P(ctx, x + 4, 230, 10, 16, '#f8f2e4');
    P(ctx, x - 22, 238, 6, 1, '#2a3757'); P(ctx, x - 8, 236, 6, 1, '#2a3757'); P(ctx, x + 6, 234, 6, 1, '#2a3757');
    teksPx(ctx, 'A > B > C', x, 190, '#7dffa8', 6);
    teksPx(ctx, 'tumbang berurutan', x, 178, '#ffe9a3', 6);
  }
  function gambarPapanKesimpulan(x, t) {
    papanLebar(x, ['A tertinggi', 'C pendek', 'B di antara'], 70);
    teksPx(ctx, 'kesimpulan jelas', x, 176, '#7dffa8', 6);
  }

  /* --- p1-099: sudoku 4x4 --- */
  function gambarKhemahPapan(x, t) {
    P(ctx, x - 24, 200, 48, 40, '#241c48');
    P(ctx, x - 20, 204, 40, 32, '#f8f2e4');
    for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) {
      P(ctx, x - 20 + k * 10, 204 + r * 8, 10, 8, (r + k) % 2 ? '#e8dcc8' : '#f8f2e4');
    }
    teksPx(ctx, '1', x - 15, 206, '#2a3757', 5); teksPx(ctx, '2', x - 5, 206, '#2a3757', 5);
    teksPx(ctx, '?', x + 15, 206, '#bd5a5f', 6);
    teksPx(ctx, '4 x 4', x, 190, '#ffe9a3', 6);
  }
  function gambarPapanAturan(x, t) {
    papanLebar(x, ['baris kolom', 'kotak 2x2', 'tanpa ulang'], 66);
    teksPx(ctx, 'tiga pasal', x, 176, '#ffe9a3', 6);
  }
  function gambarSatuPilihan(x, t) {
    for (let k = 0; k < 4; k++) {
      const bx = x - 20 + k * 11;
      P(ctx, bx, 228, 10, 10, k === 3 ? '#ffd166' : '#f8f2e4');
      if (k < 3) teksPx(ctx, String(k + 1), bx + 5, 230, '#2a3757', 5);
      else teksPx(ctx, '4', bx + 5, 230, '#bd5a5f', 6);
    }
    teksPx(ctx, 'tinggal satu: 4', x, 190, '#7dffa8', 6);
  }
  function gambarPapanSolusi(x, t) {
    const sol = [[1, 2, 3, 4], [3, 4, 1, 2], [2, 1, 4, 3], [4, 3, 2, 1]];
    for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) {
      const bx = x - 22 + k * 11, by = 200 + r * 9;
      P(ctx, bx, by, 10, 8, (r < 2) === (k < 2) ? '#f8f2e4' : '#e8dcc8');
      teksPx(ctx, String(sol[r][k]), bx + 5, by + 1, '#2a3757', 5);
    }
    teksPx(ctx, '1-4 tanpa ulang', x, 190, '#7dffa8', 6);
  }

  /* --- p1-100: tantangan juara kamp --- */
  function gambarGerbangJuara(x, t) {
    P(ctx, x - 30, 204, 8, 42, '#4a3a78');
    P(ctx, x + 22, 204, 8, 42, '#4a3a78');
    P(ctx, x - 34, 192, 68, 14, '#5a4a88');
    teksPx(ctx, 'JUARA', x, 195, '#ffe9a3', 6);
    for (let i = 0; i < 4; i++) {
      lingkaran(ctx, x - 18 + i * 12, 218, 4, '#ffd166');
      lingkaran(ctx, x - 19 + i * 12, 217, 2, '#fff3cf');
    }
    teksPx(ctx, '100 judul', x, 188, '#ffe9a3', 6);
  }
  function gambarUjiPola(x, t) {
    papanLebar(x, ['2 4 6 ?'], 54);
    teksPx(ctx, 'jawab: 8', x, 176, '#7dffa8', 6);
  }
  function gambarUjiKali(x, t) {
    for (let g = 0; g < 3; g++) {
      const gx = x - 22 + g * 16;
      P(ctx, gx, 234, 13, 10, '#c8bda6');
      for (let i = 0; i < 4; i++) lingkaran(ctx, gx + 3 + (i % 2) * 5, 231 + Math.floor(i / 2) * 4, 1, '#f6c453');
      teksPx(ctx, '4', gx + 6, 224, '#fffdf2', 5);
    }
    teksPx(ctx, '3 x 4 = 12', x, 190, '#7dffa8', 6);
  }
  function gambarUjiHilang(x, t) {
    papanLebar(x, ['4 + ? = 9'], 58);
    teksPx(ctx, 'jawab: 5', x, 176, '#7dffa8', 6);
  }
  function gambarUjiLogika(x, t) {
    lingkaran(ctx, x - 14, 232, 6, '#a5d8ff');
    teksPx(ctx, 'A', x - 14, 229, '#fffdf2', 6);
    lingkaran(ctx, x, 236, 5, '#ffd8b0');
    teksPx(ctx, 'B', x, 234, '#7a4a1c', 5);
    lingkaran(ctx, x + 12, 239, 4, '#c8f0d0');
    teksPx(ctx, 'C', x + 12, 237, '#1c5a2c', 5);
    teksPx(ctx, 'A tertinggi', x, 190, '#7dffa8', 6);
  }



  /* =========================================================
     OBJEK PINTU 2 BATCH 1 — penjuru Bilangan Negatif (p2-001..010)
     Semua angka pada objek harus sama persis dengan teks naskah.
     ========================================================= */

  /* --- p2-001: gerbang tambang --- */
  function gambarGerbangTambang(x) {
    P(ctx, x - 32, 184, 64, 8, '#6b4a2c');                    // palang atas gerbang
    P(ctx, x - 30, 192, 7, 54, '#7a5230');                    // tiang kiri
    P(ctx, x + 23, 192, 7, 54, '#5f4426');                    // tiang kanan
    P(ctx, x - 23, 196, 46, 50, '#241a10');                   // lubang gelap tambang
    P(ctx, x - 16, 186, 32, 11, '#8a5f38');                   // papan nama
    teksPx(ctx, 'TAMBANG', x, 189, '#ffe9a3', 6);
    P(ctx, x + 2, 192, 1, 24, '#c9c9d4');                     // tali keranjang
    P(ctx, x - 4, 216, 12, 8, '#7a5230');                     // keranjang lift
    P(ctx, x - 4, 216, 12, 2, '#96764e');
    const lantai = [['0', 208], ['-1', 218], ['-2', 228], ['-3', 238]];
    for (let i = 0; i < 4; i++) {
      P(ctx, x - 42, lantai[i][1], 13, 9, '#141d33');         // papan lantai
      P(ctx, x - 42, lantai[i][1], 13, 1, '#4fe3c8');
      teksPx(ctx, lantai[i][0], x - 35, lantai[i][1] + 2, '#fffdf2', 6);
    }
  }

  function gambarTiangKedalaman(x) {
    P(ctx, x - 1, 186, 3, 60, '#5f4426');                     // tiang lorong
    P(ctx, x - 5, 184, 11, 4, '#7a5230');
    const dada = [['0', 194], ['-1', 208], ['-2', 222], ['-3', 236]];
    for (let i = 0; i < 4; i++) {
      const sisi = i % 2 === 0 ? 1 : -1;
      P(ctx, x + sisi * 4 - (sisi < 0 ? 16 : 0), dada[i][1], 16, 10, '#1e3a2a');
      P(ctx, x + sisi * 4 - (sisi < 0 ? 16 : 0), dada[i][1], 16, 1, '#a8e8c0');
      teksPx(ctx, dada[i][0], x + sisi * 4 + (sisi < 0 ? -8 : 8), dada[i][1] + 2, '#eafff2', 6);
    }
  }

  function gambarTaliKeranjang(x) {
    lingkaran(ctx, x, 190, 6, '#3a3f52');                     // pulley atas
    lingkaran(ctx, x, 190, 2, '#78809a');
    P(ctx, x, 196, 2, 34, '#c9c9d4');                         // tali
    const simpul = [['-1', 202], ['-2', 212], ['-3', 222]];
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 2, simpul[i][1], 6, 2, '#8a8a98');           // simpul jarak
      teksPx(ctx, simpul[i][0], x + 12, simpul[i][1] - 2, '#eafff2', 6);
    }
    P(ctx, x - 7, 230, 16, 10, '#7a5230');                    // keranjang di -3
    P(ctx, x - 7, 230, 16, 2, '#96764e');
    P(ctx, x - 5, 228, 3, 2, '#c9c9d4'); P(ctx, x + 3, 228, 3, 2, '#c9c9d4');
    teksPx(ctx, '-3', x - 16, 232, '#eafff2', 6);
  }

  function gambarTanggaMinus(x) {
    const anak = [['0', 200], ['-1', 212], ['-2', 224], ['-3', 236]];
    for (let i = 0; i < 4; i++) {
      P(ctx, x - 30 + i * 12, anak[i][1], 14, 8, '#8a5f38');  // anak tangga menurun
      P(ctx, x - 30 + i * 12, anak[i][1], 14, 2, '#a3744a');
      teksPx(ctx, anak[i][0], x - 23 + i * 12, anak[i][1] - 8, '#eafff2', 6);
    }
    P(ctx, x + 26, 202, 2, 32, '#a8e8c0');                    // panah makin kecil
    P(ctx, x + 22, 230, 10, 2, '#a8e8c0');
    P(ctx, x + 24, 234, 6, 2, '#a8e8c0');
    teksPx(ctx, 'KECIL', x + 26, 194, '#a8e8c0', 6);
  }

  /* --- p2-002: jembatan angka --- */
  function gambarJembatanAngka(x) {
    P(ctx, x - 43, 226, 86, 5, '#8a5f38');                    // dek jembatan
    P(ctx, x - 43, 231, 86, 2, '#6b4a2c');
    const urut = ['-3', '-2', '-1', '0', '1', '2', '3'];
    for (let i = 0; i < 7; i++) {
      const px2 = x - 39 + i * 13;
      P(ctx, px2 - 1, 212, 3, 14, '#5f4426');                 // tiang kecil tiap angka
      teksPx(ctx, urut[i], px2 + 1, i % 2 === 0 ? 198 : 204, '#eafff2', 6);   // zigzag anti-tabrakan
    }
    P(ctx, x - 45, 240, 90, 2, '#4a341c');                    // balok bawah
  }

  function gambarTiangNolTengah(x, t) {
    P(ctx, x - 2, 200, 5, 46, '#5f4426');                     // tiang nol
    const nyala = Math.sin(t * 3) * 1.2;
    lingkaran(ctx, x, 196, 7 + nyala, '#ffd166');             // lampu nol
    lingkaran(ctx, x, 196, 4, '#fff3cf');
    teksPx(ctx, '0', x, 184, '#fffdf2', 8);
    P(ctx, x - 30, 222, 24, 10, '#1e3a2a');                   // papan kiri
    teksPx(ctx, 'KECIL', x - 18, 224, '#a8e8c0', 6);
    P(ctx, x + 6, 222, 24, 10, '#1e3a2a');                    // papan kanan
    teksPx(ctx, 'BESAR', x + 18, 224, '#a8e8c0', 6);
  }

  function gambarPanahDuaArah(x) {
    P(ctx, x - 22, 212, 3, 34, '#5f4426');                    // tiang kiri
    P(ctx, x + 19, 212, 3, 34, '#5f4426');                    // tiang kanan
    P(ctx, x - 34, 200, 24, 12, '#141d33');                   // papan panah kiri
    P(ctx, x - 30, 205, 14, 2, '#a8e8c0');
    P(ctx, x - 33, 203, 3, 6, '#a8e8c0');
    P(ctx, x + 10, 200, 24, 12, '#141d33');                   // papan panah kanan
    P(ctx, x + 16, 205, 14, 2, '#a8e8c0');
    P(ctx, x + 30, 203, 3, 6, '#a8e8c0');
    ctx.globalAlpha = 0.5;                                    // kabut ujung jalan
    lingkaran(ctx, x - 40, 220, 8, '#e8f4ee');
    lingkaran(ctx, x + 40, 224, 8, '#e8f4ee');
    ctx.globalAlpha = 1;
  }

  function gambarLangkahBilangan(x) {
    P(ctx, x - 30, 240, 60, 2, '#4a341c');                    // garis tanah
    teksPx(ctx, '0', x, 244, '#fffdf2', 6);
    P(ctx, x - 1, 236, 3, 4, '#a8e8c0');
    for (let i = 1; i <= 2; i++) {                            // jejak maju & mundur
      lingkaran(ctx, x + i * 10, 238, 2, '#c9a876');
      lingkaran(ctx, x - i * 10, 242, 2, '#c9a876');
    }
    P(ctx, x + 22, 228, 14, 10, '#1e3a2a');                   // papan angka 2
    teksPx(ctx, '2', x + 29, 230, '#eafff2', 6);
    P(ctx, x - 36, 228, 14, 10, '#1e3a2a');                   // papan angka -2
    teksPx(ctx, '-2', x - 29, 230, '#eafff2', 6);
    P(ctx, x + 18, 246, 20, 2, '#a8e8c0');                    // jarak sama dari nol
    P(ctx, x - 38, 246, 20, 2, '#a8e8c0');
  }

  /* --- p2-003: gudang es --- */
  function gambarTermometerGanda(x) {
    P(ctx, x - 3, 188, 4, 52, '#c8d8e2');                     // skala tengah
    const tingkat = [['5', 196], ['0', 214], ['-5', 232]];
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 6, tingkat[i][1], 10, 2, '#78809a');
      teksPx(ctx, tingkat[i][0], x, tingkat[i][1] - 9, '#2f5a74', 6);
    }
    P(ctx, x - 16, 196, 6, 42, '#eef4fa');                    // tabung panas
    lingkaran(ctx, x - 13, 240, 5, '#ff6b6b');
    P(ctx, x - 15, 216, 2, 24, '#ff6b6b');                    // cairan sampai 5
    P(ctx, x + 10, 196, 6, 42, '#eef4fa');                    // tabung dingin
    lingkaran(ctx, x + 13, 240, 5, '#4a7fc0');
    P(ctx, x + 11, 232, 2, 8, '#4a7fc0');                     // cairan tinggal -5
  }

  function gambarPapanBeku(x) {
    papanLebar(x, ['0 AIR', 'MEMBEKU'], 52);
    P(ctx, x - 30, 240, 60, 2, '#7db8e8');                    // garis beku
    for (let i = 0; i < 5; i++) P(ctx, x - 24 + i * 11, 244, 3, 3, '#ffffff');
    for (let i = 0; i < 4; i++) P(ctx, x - 18 + i * 11, 236, 2, 2, '#4a90c8');
  }

  function gambarEsTumpuk(x) {
    P(ctx, x + 12, 196, 3, 46, '#c8d8e2');                    // papan ukur
    teksPx(ctx, '0', x + 14, 190, '#2f5a74', 6);
    teksPx(ctx, '-5', x + 14, 234, '#2f5a74', 6);
    for (let i = 0; i < 5; i++) {                             // 5 blok es
      P(ctx, x - 14, 236 - i * 9, 22, 8, '#cdeefc');
      P(ctx, x - 14, 236 - i * 9, 22, 2, '#ffffff');
      P(ctx, x - 10, 238 - i * 9, 4, 2, '#a8d8f0');
    }
    teksPx(ctx, 'BLOK', x - 6, 190, '#2f5a74', 6);
  }

  function gambarDuaKamarEs(x) {
    P(ctx, x - 30, 200, 24, 46, '#9cc4dc');                   // pintu kamar A
    P(ctx, x - 27, 204, 18, 42, '#c8e0ee');
    P(ctx, x + 6, 200, 24, 46, '#7aa8c4');                    // pintu kamar B
    P(ctx, x + 9, 204, 18, 42, '#a8cde2');
    teksPx(ctx, '-3', x - 18, 192, '#2f5a74', 7);
    teksPx(ctx, '-8', x + 18, 192, '#2f5a74', 7);
    for (let i = 0; i < 3; i++) P(ctx, x - 25 + i * 7, 240, 5, 4, '#ffffff');
    for (let i = 0; i < 8; i++) P(ctx, x + 10 + (i % 4) * 4, 240 - Math.floor(i / 4) * 5, 3, 4, '#ffffff');
    teksPx(ctx, 'A', x - 18, 248, '#2f5a74', 6);
    teksPx(ctx, 'B', x + 18, 248, '#2f5a74', 6);
  }

  /* --- p2-004: kios utang --- */
  function gambarBukuCatatan(x) {
    P(ctx, x - 26, 206, 26, 36, '#f2ecd4');                   // halaman kiri
    P(ctx, x + 2, 206, 26, 36, '#f2ecd4');                    // halaman kanan
    P(ctx, x - 1, 204, 3, 40, '#8a6a44');                     // punggung buku
    teksPx(ctx, 'UTANG', x - 13, 212, '#bd5a5f', 6);
    teksPx(ctx, '-3', x - 13, 226, '#3a2a08', 8);
    teksPx(ctx, 'KUE', x + 15, 212, '#6b4a2c', 6);
    for (let i = 0; i < 3; i++) P(ctx, x + 9 + i * 7, 224, 5, 5, '#c98a4b');
    P(ctx, x - 30, 244, 62, 2, '#5f4426');                    // meja
  }

  function gambarKoinNampanLima(x) {
    P(ctx, x - 22, 240, 44, 5, '#8a5f38');                    // nampan
    P(ctx, x - 22, 240, 44, 1, '#a3744a');
    const kx = [x - 16, x - 8, x, x + 8, x + 16];
    for (let i = 0; i < 5; i++) {
      lingkaran(ctx, kx[i], 234, 4, i < 3 ? '#c9971c' : '#ffd166');
      lingkaran(ctx, kx[i] - 1, 233, 1, '#fff3cf');
    }
    P(ctx, x - 18, 246, 26, 2, '#bd5a5f');                    // kurung 3 koin utang
    teksPx(ctx, 'UTANG', x - 14, 250, '#ffd166', 5);
    P(ctx, x + 6, 246, 20, 2, '#2aa85e');                     // kurung sisa
    teksPx(ctx, 'SISA', x + 16, 250, '#7dffa8', 5);
  }

  function gambarPapanSaldoUtang(x) {
    papanLebar(x, ['-3 UTANG', 'BAYAR 5', 'SISA +2'], 58);
  }

  function gambarStempelLunas(x) {
    P(ctx, x - 20, 208, 34, 32, '#f2ecd4');                   // halaman lama
    teksPx(ctx, '-3', x - 12, 214, '#3a2a08', 7);
    P(ctx, x - 18, 218, 12, 2, '#bd5a5f');                    // coretan
    P(ctx, x - 17, 222, 34, 12, '#2aa85e');                   // stempel LUNAS
    teksPx(ctx, 'LUNAS', x, 225, '#fffdf2', 6);
    P(ctx, x + 18, 226, 16, 14, '#f2ecd4');                   // halaman baru
    teksPx(ctx, '+2', x + 26, 230, '#2aa85e', 6);
    P(ctx, x - 2, 196, 4, 12, '#5f4426');                     // pegangan stempel
    lingkaran(ctx, x, 194, 4, '#8a5f38');
  }

  /* --- p2-005: jurang --- */
  function gambarTiangJurangDua(x) {
    P(ctx, x - 44, 188, 14, 58, '#4c5068');                   // tebing kiri
    P(ctx, x + 30, 188, 14, 58, '#4c5068');                   // tebing kanan
    teksPx(ctx, '0', x, 192, '#ffd166', 6);                   // bibir jurang
    P(ctx, x - 1, 196, 3, 3, '#ffd166');
    P(ctx, x - 20, 208, 2, 14, '#78809a');                    // tiang -3
    P(ctx, x - 26, 220, 14, 9, '#141d33');
    teksPx(ctx, '-3', x - 19, 222, '#fffdf2', 6);
    P(ctx, x + 14, 216, 2, 24, '#78809a');                    // tiang -8 lebih dalam
    P(ctx, x + 8, 236, 14, 9, '#141d33');
    teksPx(ctx, '-8', x + 15, 238, '#fffdf2', 6);
  }

  function gambarPapanLebihKecil(x) {
    P(ctx, x - 36, 200, 72, 26, '#122419');
    P(ctx, x - 36, 200, 72, 2, '#1e3a2a');
    teksPx(ctx, '-8 < -3', x, 205, '#fffdf2', 7);
    teksPx(ctx, 'MAKIN KECIL', x, 216, '#a8e8c0', 6);
    P(ctx, x - 28, 226, 3, 20, '#4a341c');                    // kaki papan
    P(ctx, x + 25, 226, 3, 20, '#4a341c');
  }

  function gambarLenteraJurang(x) {
    P(ctx, x - 15, 190, 1, 16, '#c9c9d4');                    // tali pendek
    lingkaran(ctx, x - 15, 210, 4, '#ffd166');
    lingkaran(ctx, x - 15, 210, 2, '#fff3cf');
    teksPx(ctx, '-3', x - 25, 200, '#eafff2', 6);
    P(ctx, x + 14, 190, 1, 40, '#c9c9d4');                    // tali panjang
    lingkaran(ctx, x + 14, 234, 4, '#ffd166');
    lingkaran(ctx, x + 14, 234, 2, '#fff3cf');
    teksPx(ctx, '-8', x + 24, 206, '#eafff2', 6);
    P(ctx, x - 22, 186, 44, 3, '#4c5068');                    // bibir jurang
  }

  function gambarPapanUrutanNegatif(x) {
    P(ctx, x - 16, 194, 32, 50, '#122419');
    P(ctx, x - 16, 194, 32, 2, '#1e3a2a');
    const urut = ['3', '1', '0', '-1', '-3', '-8'];
    for (let i = 0; i < 6; i++) teksPx(ctx, urut[i], x, 198 + i * 7.5, '#eafff2', 6);
    P(ctx, x + 20, 198, 2, 38, '#a8e8c0');                    // panah menurun
    P(ctx, x + 16, 234, 10, 2, '#a8e8c0');
    teksPx(ctx, 'KECIL', x + 20, 240, '#a8e8c0', 6);
  }

  /* --- p2-006: dermaga --- */
  function gambarTanggaDermaga(x) {
    P(ctx, x - 34, 202, 14, 4, '#8a5f38');                    // dek dermaga
    P(ctx, x - 30, 206, 3, 40, '#6b4a2c');
    P(ctx, x - 10, 196, 2, 50, '#6b4a2c');                    // rel tangga kiri
    P(ctx, x + 8, 196, 2, 50, '#6b4a2c');                     // rel tangga kanan
    const anak = [['4', 198], ['3', 205], ['2', 212], ['1', 219], ['0', 226], ['-1', 233], ['-2', 240]];
    for (let i = 0; i < 7; i++) {
      P(ctx, x - 8, anak[i][1], 16, 2, '#8a5f38');            // anak tangga
      teksPx(ctx, anak[i][0], x + 15, anak[i][1] - 2, '#eafff2', 6);
    }
    P(ctx, x - 30, 226, 40, 2, '#4a90c8');                    // garis air di 0
    for (let i = 0; i < 4; i++) P(ctx, x - 28 + i * 10, 229, 6, 1, '#7db8e8');
  }

  function gambarPerahuNelayan(x) {
    P(ctx, x - 14, 230, 28, 4, '#7a5230');                    // lambung perahu
    P(ctx, x - 11, 226, 22, 4, '#96764e');
    P(ctx, x, 210, 2, 16, '#5f4426');                         // tiang
    P(ctx, x + 2, 210, 9, 6, '#ff9d9d');                      // bendera kecil
    P(ctx, x - 8, 226, 5, 4, '#c98a4b');                      // muatan
    teksPx(ctx, '3', x - 22, 226, '#eafff2', 7);              // tangga di samping
    P(ctx, x - 18, 222, 2, 24, '#6b4a2c');
    for (let i = 0; i < 3; i++) P(ctx, x - 18, 224 + i * 8, 8, 2, '#8a5f38');
    P(ctx, x - 28, 246, 56, 2, '#4a90c8');                    // garis air
  }

  function gambarTaliTurunPerahu(x) {
    P(ctx, x - 8, 238, 20, 4, '#7a5230');                     // perahu sudah di -2
    P(ctx, x - 6, 234, 16, 4, '#96764e');
    P(ctx, x + 2, 220, 2, 14, '#5f4426');
    P(ctx, x + 4, 220, 8, 5, '#ff9d9d');
    const jejak = [['3', 198], ['2', 206], ['1', 214], ['0', 222], ['-1', 230]];
    for (let i = 0; i < 5; i++) {
      P(ctx, x - 10, jejak[i][1], 6, 2, '#c9a876');           // tangga yang dilewati
      teksPx(ctx, jejak[i][0], x - 18, jejak[i][1] - 3, '#eafff2', 6);
    }
    teksPx(ctx, '-2', x - 18, 236, '#ffd166', 7);
    P(ctx, x - 24, 246, 48, 2, '#4a90c8');                    // air surut
  }

  function gambarPapanCatatanKapten(x) {
    P(ctx, x - 30, 198, 60, 32, '#141d33');
    P(ctx, x - 30, 198, 60, 2, '#37476f');
    teksPx(ctx, 'MULAI 3', x, 203, '#fffdf2', 6);
    teksPx(ctx, 'TURUN 5', x, 213, '#ff9d9d', 6);
    teksPx(ctx, 'DARAT -2', x, 223, '#7dffa8', 6);
    P(ctx, x - 24, 234, 48, 11, '#8a5f38');                   // papan persamaan
    teksPx(ctx, '3 + (-5) = -2', x, 236, '#3a2a08', 5);
  }

  /* --- p2-007: terowongan --- */
  function gambarPintuMinusGanda(x) {
    P(ctx, x - 34, 194, 68, 52, '#241f2c');                   // mulut terowongan
    lingkaran(ctx, x, 194, 34, '#241f2c');
    P(ctx, x - 44, 194, 88, 4, '#1a1620');
    P(ctx, x - 22, 218, 16, 28, '#3a2f42');                   // pintu pertama
    teksPx(ctx, '-', x - 14, 221, '#ff9d9d', 8);
    P(ctx, x + 6, 218, 16, 28, '#3a2f42');                    // pintu kedua
    teksPx(ctx, '-', x + 14, 221, '#ff9d9d', 8);
    P(ctx, x - 8, 244, 16, 2, '#78809a');                     // jalan antar pintu
  }

  function gambarKunciBalikArah(x, t) {
    P(ctx, x - 8, 194, 2, 14, '#5f4426');                     // gantungan
    lingkaran(ctx, x - 8, 214, 6, '#ffd166');                 // kepala kunci
    lingkaran(ctx, x - 8, 214, 2, '#4a341c');
    P(ctx, x - 3, 213, 16, 3, '#ffd166');                     // batang kunci
    P(ctx, x + 10, 216, 2, 5, '#ffd166');                     // gerigi
    P(ctx, x + 14, 216, 2, 4, '#ffd166');
    P(ctx, x - 36, 224, 14, 2, '#78809a');                    // panah mundur pudar
    P(ctx, x - 39, 222, 3, 6, '#78809a');
    teksPx(ctx, 'MUNDUR', x - 30, 232, '#78809a', 5);
    P(ctx, x + 22, 224, 14, 2, '#ffd166');                    // panah maju terang
    P(ctx, x + 36, 222, 3, 6, '#ffd166');
    teksPx(ctx, 'MAJU', x + 30, 232, '#ffd166', 5);
    const kilau = Math.sin(t * 4) * 1;                        // kilau kunci
    lingkaran(ctx, x - 8, 206 + kilau, 1, '#fff3cf');
  }

  function gambarJejakLorong(x) {
    const plang = [['3', x - 16], ['4', x - 2], ['5', x + 12]];
    for (let i = 0; i < 3; i++) {
      P(ctx, plang[i][1], 236, 12, 9, '#141d33');             // penanda lantai
      P(ctx, plang[i][1], 236, 12, 1, '#7dffa8');
      teksPx(ctx, plang[i][0], plang[i][1] + 6, 238, '#fffdf2', 6);
    }
    lingkaran(ctx, x - 8, 232, 2, '#c9a876');                 // jejak kaki maju
    lingkaran(ctx, x + 6, 232, 2, '#c9a876');
    P(ctx, x - 30, 236, 12, 2, '#ffd166');                    // arah datang maju
    P(ctx, x - 33, 234, 3, 6, '#ffd166');
  }

  function gambarPapanBukaRahasia(x) {
    P(ctx, x - 36, 202, 72, 26, '#122419');
    P(ctx, x - 36, 202, 72, 2, '#1e3a2a');
    teksPx(ctx, '3 - (-2)', x, 206, '#fffdf2', 7);
    teksPx(ctx, '= 3 + 2 = 5', x, 216, '#7dffa8', 7);
    P(ctx, x - 30, 228, 3, 18, '#4a341c');                    // kaki
    P(ctx, x + 27, 228, 3, 18, '#4a341c');
    teksPx(ctx, 'RAHASIA', x, 242, '#ffd166', 6);
  }

  /* --- p2-008: dua balikan --- */
  function gambarPapanPanahKiri(x) {
    P(ctx, x - 2, 208, 4, 38, '#5f4426');                     // tiang
    P(ctx, x - 20, 196, 40, 14, '#141d33');
    P(ctx, x - 20, 196, 40, 2, '#37476f');
    P(ctx, x - 13, 202, 16, 2, '#7dffa8');                    // panah ke kiri
    P(ctx, x - 16, 200, 3, 6, '#7dffa8');
    P(ctx, x - 18, 202, 2, 2, '#7dffa8');
    teksPx(ctx, 'MINUS', x, 220, '#ffe9a3', 6);
  }

  function gambarTanggaPolaMinus(x) {
    const tangga = ['-6', '-4', '-2', '0', '2', '4', '6'];
    for (let i = 0; i < 7; i++) {
      const px2 = x - 36 + i * 12, py2 = 242 - i * 7;
      P(ctx, px2, py2, 12, 7, '#8a5f38');                     // anak tangga naik
      P(ctx, px2, py2, 12, 2, '#a3744a');
      teksPx(ctx, tangga[i], px2 + 6, py2 - 8, '#eafff2', 6);
    }
    P(ctx, x - 38, 190, 2, 10, '#a8e8c0');                    // panah naik di ujung
    P(ctx, x - 40, 192, 6, 2, '#a8e8c0');
  }

  function gambarCerminDuaArah(x) {
    P(ctx, x - 24, 202, 8, 2, '#5f4426');                     // bingkai cermin 1
    P(ctx, x - 24, 240, 8, 2, '#5f4426');
    P(ctx, x - 21, 204, 3, 36, '#a8d8f0');
    P(ctx, x + 16, 202, 8, 2, '#5f4426');                     // bingkai cermin 2
    P(ctx, x + 16, 240, 8, 2, '#5f4426');
    P(ctx, x + 18, 204, 3, 36, '#a8d8f0');
    P(ctx, x - 8, 222, 14, 2, '#ff9d9d');                     // panah asli ke kiri
    P(ctx, x - 11, 220, 3, 6, '#ff9d9d');
    P(ctx, x - 8, 208, 14, 2, '#7dffa8');                     // pantulan balik ke kanan
    P(ctx, x + 6, 206, 3, 6, '#7dffa8');
    teksPx(ctx, '1x', x - 20, 246, '#ff9d9d', 6);
    teksPx(ctx, '2x', x + 20, 246, '#7dffa8', 6);
  }

  function gambarPapanAturanKali(x) {
    P(ctx, x - 34, 196, 68, 32, '#141d33');
    P(ctx, x - 34, 196, 68, 2, '#37476f');
    teksPx(ctx, 'x', x - 22, 201, '#8fa2c8', 6);
    teksPx(ctx, '+', x - 2, 201, '#8fa2c8', 6);
    teksPx(ctx, '-', x + 18, 201, '#8fa2c8', 6);
    teksPx(ctx, '+', x - 22, 211, '#fffdf2', 6);
    teksPx(ctx, '+', x - 2, 211, '#7dffa8', 6);
    teksPx(ctx, '-', x + 18, 211, '#ff9d9d', 6);
    teksPx(ctx, '-', x - 22, 221, '#fffdf2', 6);
    teksPx(ctx, '-', x - 2, 221, '#ff9d9d', 6);
    teksPx(ctx, '+', x + 18, 221, '#7dffa8', 6);
    P(ctx, x - 34, 232, 68, 11, '#8a5f38');
    teksPx(ctx, '(-2)x(-3)=6', x, 234, '#3a2a08', 6);
  }

  /* --- p2-009: kurir --- */
  function gambarMejaSortirPaket(x) {
    P(ctx, x - 24, 226, 48, 4, '#8a5f38');                    // meja
    P(ctx, x - 22, 230, 3, 16, '#6b4a2c');
    P(ctx, x + 19, 230, 3, 16, '#6b4a2c');
    P(ctx, x - 20, 218, 18, 8, '#5f4426');                    // bakul plus
    P(ctx, x - 18, 216, 14, 2, '#7a5230');
    teksPx(ctx, '+', x - 11, 206, '#7dffa8', 8);
    P(ctx, x + 2, 218, 18, 8, '#5f4426');                     // bakul minus
    P(ctx, x + 4, 216, 14, 2, '#7a5230');
    teksPx(ctx, '-', x + 11, 206, '#ff9d9d', 8);
    P(ctx, x - 17, 220, 5, 4, '#c98a4b');                     // paket di bakul
    P(ctx, x + 5, 220, 5, 4, '#c98a4b');
  }

  function gambarPapanSamaBeda(x) {
    papanLebar(x, ['SAMA = +', 'BEDA = -'], 62);
  }

  function gambarTigaKardusContoh(x) {
    P(ctx, x - 36, 196, 72, 34, '#141d33');
    P(ctx, x - 36, 196, 72, 2, '#37476f');
    teksPx(ctx, '(-6):2=-3', x, 200, '#ff9d9d', 6);
    teksPx(ctx, '6:(-2)=-3', x, 210, '#ff9d9d', 6);
    teksPx(ctx, '(-6):(-2)=3', x, 220, '#7dffa8', 6);
    for (let i = 0; i < 3; i++) {                             // tiga kardus contoh
      const kx = x - 22 + i * 15;
      P(ctx, kx, 236, 14, 12, '#a3744a');
      P(ctx, kx, 236, 14, 2, '#c9975e');
      P(ctx, kx + 6, 234, 2, 4, '#8a6a44');
    }
  }

  function gambarSepedaKurirDua(x) {
    lingkaran(ctx, x - 10, 238, 7, '#2a2f42');                // roda belakang
    lingkaran(ctx, x - 10, 238, 2, '#78809a');
    lingkaran(ctx, x + 10, 238, 7, '#2a2f42');                // roda depan
    lingkaran(ctx, x + 10, 238, 2, '#78809a');
    P(ctx, x - 9, 231, 18, 2, '#bd5a5f');                     // rangka
    P(ctx, x - 2, 226, 7, 2, '#5f4426');                      // jok
    P(ctx, x + 7, 224, 2, 8, '#5f4426');                      // setang
    P(ctx, x + 8, 214, 12, 2, '#7dffa8');                     // panah kanan positif
    P(ctx, x + 20, 212, 3, 6, '#7dffa8');
    teksPx(ctx, '+', x + 26, 212, '#7dffa8', 6);
    P(ctx, x - 20, 214, 12, 2, '#ff9d9d');                    // panah kiri negatif
    P(ctx, x - 23, 212, 3, 6, '#ff9d9d');
    teksPx(ctx, '-', x - 27, 212, '#ff9d9d', 6);
    P(ctx, x - 2, 220, 8, 4, '#c98a4b');                      // tas kurir
  }

  /* --- p2-010: menara lift --- */
  function gambarMenaraLiftTambang(x) {
    P(ctx, x - 14, 188, 3, 58, '#4a5468');                    // kuda-kuda menara
    P(ctx, x + 11, 188, 3, 58, '#4a5468');
    for (let i = 0; i < 6; i++) P(ctx, x - 14, 190 + i * 10, 28, 1, '#3a4252');
    P(ctx, x - 10, 232, 20, 14, '#8a5f38');                   // keranjang lift di -4
    P(ctx, x - 6, 234, 12, 8, '#3a2a18');
    const lantai = ['4', '3', '2', '1', '0', '-1', '-2', '-3', '-4'];
    for (let i = 0; i < 9; i++) {
      P(ctx, x + 16, 189 + i * 7, 6, 1, '#78809a');
      teksPx(ctx, lantai[i], x + 26, 186 + i * 7, i >= 5 ? '#a8d8f0' : '#eafff2', 6);
    }
  }

  function gambarPapanLimaMisi(x) {
    P(ctx, x - 36, 190, 72, 56, '#141d33');
    P(ctx, x - 36, 190, 72, 2, '#37476f');
    teksPx(ctx, 'LIMA MISI', x, 194, '#ffd166', 6);
    teksPx(ctx, '-4+7 = ?', x, 204, '#fffdf2', 6);
    teksPx(ctx, '-10:-5 = ?', x, 212, '#fffdf2', 6);
    teksPx(ctx, '6-(-4) = ?', x, 220, '#fffdf2', 6);
    teksPx(ctx, '-3x-2 = ?', x, 228, '#fffdf2', 6);
    teksPx(ctx, '-9 < -2 ?', x, 236, '#a8d8f0', 6);
  }

  function gambarRodaTaliLift(x, t) {
    lingkaran(ctx, x, 204, 13, '#3a3f52');                    // roda pengangkut
    lingkaran(ctx, x, 204, 8, '#565e78');
    lingkaran(ctx, x, 204, 3, '#78809a');
    const putar = Math.floor(t * 2) % 4;                      // jari-jari berputar
    for (let i = 0; i < 4; i++) {
      const a = putar * Math.PI / 2 + i * Math.PI / 2;
      P(ctx, x + Math.round(Math.cos(a) * 6), 204 + Math.round(Math.sin(a) * 6), 2, 2, '#78809a');
    }
    P(ctx, x, 217, 2, 24, '#c9c9d4');                         // tali baja
    P(ctx, x - 6, 240, 14, 8, '#8a5f38');                     // keranjang turun
    P(ctx, x - 6, 240, 14, 2, '#a3744a');
  }

  function gambarGerbangLenteraDalam(x) {
    P(ctx, x - 18, 204, 36, 6, '#485060');                    // ambang gerbang batu
    P(ctx, x - 16, 210, 6, 36, '#565e78');                    // pilar kiri
    P(ctx, x + 10, 210, 6, 36, '#565e78');                    // pilar kanan
    P(ctx, x - 10, 220, 20, 26, '#141a2b');                   // mulut gerbang gelap
    lingkaran(ctx, x, 198, 5, '#ffd166');                     // lentera menyala
    lingkaran(ctx, x, 198, 2, '#fff3cf');
    P(ctx, x - 1, 189, 2, 5, '#2a3038');
    P(ctx, x + 16, 214, 13, 9, '#141d33');                    // papan lantai -4
    teksPx(ctx, '-4', x + 22, 216, '#fffdf2', 6);
  }

  /* =========================================================
     OBJEK PINTU 2 BATCH 2 — penjuru Faktor, FPB & KPK (p2-011..020)
     Semua angka pada objek harus sama persis dengan teks naskah.
     ========================================================= */

  /* --- p2-011: pelataran ubin --- */
  function gambarRakUbinDuaBelas(x) {
    P(ctx, x - 30, 188, 60, 4, '#8a5f38');                    // dudukan rak
    P(ctx, x - 28, 192, 4, 54, '#5f4426');                    // tiang kiri
    P(ctx, x + 24, 192, 4, 54, '#5f4426');                    // tiang kanan
    for (let i = 0; i < 12; i++) {
      const ux = x - 24 + (i % 4) * 13, uy = 196 + Math.floor(i / 4) * 16;
      P(ctx, ux, uy, 11, 14, '#7dffa8');                      // 12 ubin hijau
      P(ctx, ux, uy, 11, 2, '#a8ffc4');
    }
    teksPx(ctx, '12 UBIN', x, 250, '#2aa85e', 6);
  }

  function gambarBarisSatuDuaBelas(x) {
    for (let i = 0; i < 12; i++) P(ctx, x - 42 + i * 7, 222, 6, 18, '#7dffa8');   // 1 baris x 12
    P(ctx, x - 42, 240, 85, 2, '#4a341c');
    P(ctx, x - 42, 244, 85, 2, '#2aa85e');                    // kurung panjang
    teksPx(ctx, '1 x 12 = 12', x, 204, '#2aa85e', 6);
  }

  function gambarPetakDuaEnam(x) {
    for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) {
      const ux = x - 30 + i * 10, uy = 210 + r * 16;
      P(ctx, ux, uy, 9, 15, '#7dffa8');                       // 2 baris x 6
      P(ctx, ux, uy, 9, 2, '#a8ffc4');
    }
    P(ctx, x - 31, 244, 61, 2, '#2aa85e');
    teksPx(ctx, '2 x 6 = 12', x, 196, '#2aa85e', 6);
  }

  function gambarPetakTigaEmpat(x) {
    for (let r = 0; r < 3; r++) for (let i = 0; i < 4; i++) {
      const ux = x - 34 + i * 10, uy = 200 + r * 15;
      P(ctx, ux, uy, 9, 14, '#7dffa8');                       // 3 baris x 4
      P(ctx, ux, uy, 9, 2, '#a8ffc4');
    }
    teksPx(ctx, '3 x 4 = 12', x, 186, '#2aa85e', 6);
    P(ctx, x + 10, 200, 36, 46, '#1e2a44');                   // papan faktor
    teksPx(ctx, '1 2 3', x + 28, 205, '#7dffa8', 6);
    teksPx(ctx, '4 6 12', x + 28, 216, '#7dffa8', 6);
    teksPx(ctx, 'FAKTOR', x + 28, 238, '#fffdf2', 5);
  }

  /* --- p2-012: kuari batu prima --- */
  function gambarBatuKuari(x) {
    lingkaran(ctx, x, 222, 22, '#968c76');                    // batu besar
    lingkaran(ctx, x - 10, 214, 10, '#a89e88');
    lingkaran(ctx, x + 12, 226, 8, '#a89e88');
    teksPx(ctx, '12', x, 216, '#fffdf2', 8);
    P(ctx, x - 30, 244, 60, 2, '#8a8070');
    teksPx(ctx, 'BATU BESAR', x, 190, '#e8dcc8', 5);
  }

  function gambarPaluPecahDua(x) {
    lingkaran(ctx, x - 12, 224, 12, '#968c76');               // bagian 2
    teksPx(ctx, '2', x - 12, 219, '#fffdf2', 7);
    lingkaran(ctx, x + 12, 226, 15, '#968c76');               // bagian 6
    teksPx(ctx, '6', x + 12, 221, '#fffdf2', 7);
    P(ctx, x - 3, 190, 3, 14, '#5f4426');                     // gagang palu
    P(ctx, x - 10, 186, 18, 8, '#8a5f38');                    // kepala palu
    teksPx(ctx, '12 = 2 x 6', x, 204, '#ffd166', 6);
  }

  function gambarBataPrimaTiga(x) {
    const bata = [['2', x - 22], ['2', x], ['3', x + 22]];
    for (let i = 0; i < 3; i++) {
      P(ctx, bata[i][1] - 8, 218, 17, 16, '#b8a888');         // bata kecil
      P(ctx, bata[i][1] - 8, 218, 17, 3, '#d0c4a8');
      teksPx(ctx, bata[i][0], bata[i][1], 223, '#5a4630', 7);
    }
    P(ctx, x - 30, 244, 60, 2, '#8a8070');
    teksPx(ctx, 'PRIMA', x, 206, '#ffd166', 6);
    teksPx(ctx, '12 = 2 x 2 x 3', x, 240, '#e8dcc8', 6);
  }

  function gambarPapanSusunPrima(x) {
    papanLebar(x, ['12 =', '2 x 2 x 3'], 56);
    lingkaran(ctx, x - 20, 196, 4, '#ffd166');                // kilau kecil
    lingkaran(ctx, x + 20, 196, 4, '#ffd166');
  }

  /* --- p2-013: stan bungkusan --- */
  function gambarMejaBungkusDua(x) {
    P(ctx, x - 38, 240, 76, 4, '#8a5f38');                    // meja
    P(ctx, x - 30, 210, 18, 30, '#4a7fc0');                   // kotak pensil
    P(ctx, x - 30, 210, 18, 3, '#7fb0e0');
    teksPx(ctx, '12', x - 21, 200, '#2f5a74', 7);
    teksPx(ctx, 'PENSIL', x - 21, 190, '#2f5a74', 5);
    P(ctx, x + 12, 206, 22, 34, '#c9564b');                   // toples permen
    P(ctx, x + 12, 206, 22, 3, '#e88a80');
    teksPx(ctx, '18', x + 23, 196, '#8a3a32', 7);
    teksPx(ctx, 'PERMEN', x + 23, 186, '#8a3a32', 5);
  }

  function gambarPapanPembagiKembar(x) {
    P(ctx, x - 42, 198, 84, 44, '#1e2a44');
    P(ctx, x - 42, 198, 84, 2, '#37476f');
    P(ctx, x - 38, 242, 3, 6, '#7a5230'); P(ctx, x + 35, 242, 3, 6, '#7a5230');
    teksPx(ctx, 'PEMBAGI', x, 202, '#ffd166', 5);
    teksPx(ctx, '12: 1 2 3 4 6 12', x, 212, '#fffdf2', 5);
    teksPx(ctx, '18: 1 2 3 6 9 18', x, 222, '#fffdf2', 5);
    teksPx(ctx, 'SAMA: 1 2 3 6', x, 232, '#7dffa8', 5);
  }

  function gambarBungkusanEnam(x) {
    for (let i = 0; i < 6; i++) {
      const bx = x - 38 + i * 15;
      P(ctx, bx, 214, 13, 16, '#f2ecd4');                     // kantong
      P(ctx, bx, 214, 13, 3, '#d8ccb0');
      P(ctx, bx + 4, 211, 5, 4, '#c9564b');                   // simpul pita
      teksPx(ctx, '2', bx + 3, 220, '#8a3a32', 5);            // 2 pensil
      teksPx(ctx, '3', bx + 9, 220, '#2f5a74', 5);            // 3 permen
    }
    P(ctx, x - 40, 240, 78, 3, '#8a5f38');
    teksPx(ctx, '2 PENSIL 3 PERMEN', x, 186, '#fffdf2', 5);
    teksPx(ctx, '6 BUNGKUSAN', x, 196, '#ffd166', 6);
  }

  function gambarPapanFPBEnam(x) {
    papanLebar(x, ['FPB', '12 & 18 = 6'], 80);
    teksPx(ctx, 'TERBESAR', x, 190, '#ffd166', 6);
  }

  /* --- p2-014: pesta lampion --- */
  function gambarDuaLampionPesta(x, t) {
    P(ctx, x - 30, 188, 60, 2, '#3a3050');                    // tali
    P(ctx, x - 22, 190, 2, 12, '#3a3050'); P(ctx, x + 20, 190, 2, 8, '#3a3050');
    const naikB = Math.sin(t * 2) * 1.5, naikK = Math.sin(t * 2 + 1.5) * 1.5;
    lingkaran(ctx, x - 21, 214 + naikB, 11, '#4a90c8');       // lampion biru
    lingkaran(ctx, x - 21, 214 + naikB, 4, '#a8d8f8');
    teksPx(ctx, '4', x - 30, 210 + naikB, '#a8d8f8', 6);
    lingkaran(ctx, x + 21, 212 + naikK, 11, '#ffd166');       // lampion kuning
    lingkaran(ctx, x + 21, 212 + naikK, 4, '#fff3cf');
    teksPx(ctx, '6', x + 30, 208 + naikK, '#ffe9a3', 6);
  }

  function gambarJalurDetikPesta(x) {
    P(ctx, x - 42, 226, 84, 2, '#55655e');                    // jalur detik
    for (let i = 0; i <= 12; i++) P(ctx, x - 42 + i * 7, 222, 1, 4, '#7c8c86');
    const biru = [4, 8, 12], kuning = [6, 12];
    for (let i = 0; i < 3; i++) {                             // nyala biru 4 8 12
      const px2 = x - 42 + biru[i] * 7;
      lingkaran(ctx, px2, 216, 4, '#4a90c8');
      lingkaran(ctx, px2, 216, 1, '#a8d8f8');
    }
    for (let i = 0; i < 2; i++) {                             // nyala kuning 6 12
      const px2 = x - 42 + kuning[i] * 7;
      lingkaran(ctx, px2, 206, 4, '#ffd166');
      lingkaran(ctx, px2, 206, 1, '#fff3cf');
    }
    teksPx(ctx, '0', x - 42, 232, '#c8d8d0', 5);
    teksPx(ctx, '12', x + 42, 232, '#c8d8d0', 5);
    teksPx(ctx, 'BIRU TIAP 4', x, 196, '#a8d8f8', 5);
    teksPx(ctx, 'KUNING TIAP 6', x, 188, '#ffe9a3', 5);
  }

  function gambarTitikBertemuDuaBelas(x, t) {
    const nyala = 0.6 + 0.4 * Math.sin(t * 3);
    ctx.globalAlpha = 0.5 * nyala;
    lingkaran(ctx, x, 206, 18, '#ffd166');                    // aura bersama
    ctx.globalAlpha = 1;
    lingkaran(ctx, x, 206, 10, '#ffd166');
    lingkaran(ctx, x, 206, 4, '#fff3cf');
    teksPx(ctx, 'DETIK 12', x, 190, '#ffe9a3', 6);
    P(ctx, x - 1, 220, 3, 22, '#55655e');                     // tiang penanda
    P(ctx, x - 8, 242, 17, 4, '#455550');
    teksPx(ctx, '4 & 6 BERTEMU', x, 182, '#c8d8d0', 5);
  }

  function gambarPapanKeluargaKelipatan(x) {
    P(ctx, x - 42, 198, 84, 46, '#1e2a44');
    P(ctx, x - 42, 198, 84, 2, '#37476f');
    P(ctx, x - 38, 244, 3, 6, '#7a5230'); P(ctx, x + 35, 244, 3, 6, '#7a5230');
    teksPx(ctx, 'KEL 4: 4 8 12 16', x, 202, '#a8d8f8', 5);
    teksPx(ctx, 'KEL 6: 6 12 18', x, 212, '#ffe9a3', 5);
    teksPx(ctx, 'BERSAMA: 12', x, 222, '#7dffa8', 5);
    teksPx(ctx, 'KPK = 12', x, 234, '#fffdf2', 6);
  }

  /* --- p2-015: paviliun tabel prima --- */
  function gambarPapanTanggaBagi(x) {
    P(ctx, x - 26, 192, 40, 54, '#1e2a44');
    P(ctx, x - 26, 192, 40, 2, '#37476f');
    P(ctx, x + 12, 192, 2, 54, '#37476f');                    // garis pemisah tangga
    const kiri = ['24', '12', '6', '3', '1'];
    for (let i = 0; i < 5; i++) teksPx(ctx, kiri[i], x - 14, 196 + i * 10, '#fffdf2', 6);
    const kanan = ['2', '2', '2', '3'];
    for (let i = 0; i < 4; i++) teksPx(ctx, kanan[i], x + 22, 196 + i * 10, '#ffd166', 6);
    P(ctx, x - 22, 246, 3, 6, '#7a5230'); P(ctx, x + 9, 246, 3, 6, '#7a5230');
    teksPx(ctx, 'TABEL PRIMA', x, 252, '#ffe9a3', 5);
  }

  function gambarAnakTurunDua(x) {
    P(ctx, x - 1, 190, 3, 14, '#7dffa8');                     // panah turun
    P(ctx, x - 5, 202, 11, 3, '#7dffa8');
    P(ctx, x - 3, 204, 7, 3, '#7dffa8');
    teksPx(ctx, '24 : 2 = 12', x, 214, '#7dffa8', 6);
    teksPx(ctx, '12 : 2 = 6', x, 228, '#7dffa8', 6);
    teksPx(ctx, 'BAGI 2 TERUS', x, 244, '#ffe9a3', 5);
  }

  function gambarTanggaSampaiSatu(x) {
    const anak = [['6', 208], ['3', 222], ['1', 236]];
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 20 + i * 12, anak[i][1], 16, 10, '#8a5f38'); // anak tangga menurun
      P(ctx, x - 20 + i * 12, anak[i][1], 16, 2, '#a3744a');
      teksPx(ctx, anak[i][0], x - 12 + i * 12, anak[i][1] - 8, '#fffdf2', 6);
    }
    lingkaran(ctx, x + 26, 232, 6, '#ffd166');                // garis akhir 1
    lingkaran(ctx, x + 26, 232, 2, '#fff3cf');
    teksPx(ctx, 'BERHENTI DI 1', x, 190, '#ffe9a3', 5);
  }

  function gambarPapanBacaSisiKiri(x) {
    P(ctx, x - 41, 202, 82, 34, '#1e2a44');
    P(ctx, x - 41, 202, 82, 2, '#37476f');
    P(ctx, x - 37, 236, 3, 8, '#7a5230'); P(ctx, x + 34, 236, 3, 8, '#7a5230');
    teksPx(ctx, '2 x 2 x 2 x 3', x, 206, '#ffd166', 6);
    teksPx(ctx, '= 24', x, 220, '#fffdf2', 7);
    teksPx(ctx, 'SISI KIRI', x, 248, '#ffe9a3', 5);
  }

  /* --- p2-016: pondok kartu prima --- */
  function gambarDuaPetiKartuPrima(x) {
    P(ctx, x - 40, 218, 34, 24, '#8a5f38');                   // peti kiri (12)
    P(ctx, x - 40, 218, 34, 3, '#a3744a');
    teksPx(ctx, '12', x - 23, 206, '#ffd166', 6);
    teksPx(ctx, '2 2 3', x - 23, 226, '#fffdf2', 5);
    P(ctx, x + 6, 214, 34, 28, '#7a5230');                    // peti kanan (18)
    P(ctx, x + 6, 214, 34, 3, '#96764e');
    teksPx(ctx, '18', x + 23, 202, '#ffd166', 6);
    teksPx(ctx, '2 3 3', x + 23, 222, '#fffdf2', 5);
    P(ctx, x - 44, 246, 88, 2, '#5a4630');
  }

  function gambarKartuSamaLingkar(x) {
    ctx.globalAlpha = 0.3;
    lingkaran(ctx, x - 26, 214, 10, '#7dffa8');               // lingkar pasangan 2
    lingkaran(ctx, x - 26, 236, 10, '#7dffa8');
    lingkaran(ctx, x + 10, 214, 10, '#7dffa8');               // lingkar pasangan 3
    lingkaran(ctx, x + 10, 236, 10, '#7dffa8');
    ctx.globalAlpha = 1;
    const atas = [['2', x - 26], ['2', x - 8], ['3', x + 10]];
    const bawah = [['2', x - 26], ['3', x - 8], ['3', x + 10]];
    for (let i = 0; i < 3; i++) {
      P(ctx, atas[i][1] - 7, 206, 14, 16, '#f2ecd4');
      teksPx(ctx, atas[i][0], atas[i][1], 210, '#5a4630', 6);
      P(ctx, bawah[i][1] - 7, 228, 14, 16, '#f2ecd4');
      teksPx(ctx, bawah[i][0], bawah[i][1], 232, '#5a4630', 6);
    }
    teksPx(ctx, 'SAMA: 2 & 3', x, 194, '#7dffa8', 5);
  }

  function gambarAmbilPangkatKecil(x) {
    P(ctx, x - 26, 210, 14, 16, '#7dffa8');                   // kartu 2 terpilih
    teksPx(ctx, '2', x - 19, 214, '#1c5a2c', 7);
    teksPx(ctx, '+', x - 4, 214, '#ffd166', 7);
    P(ctx, x + 6, 210, 14, 16, '#7dffa8');                    // kartu 3 terpilih
    teksPx(ctx, '3', x + 13, 214, '#1c5a2c', 7);
    teksPx(ctx, '2 x 3 = 6', x, 238, '#ffd166', 6);
    teksPx(ctx, 'AMBIL YANG SAMA', x, 196, '#fffdf2', 5);
  }

  function gambarPapanDuaJalanSatuJawab(x) {
    P(ctx, x - 42, 200, 84, 42, '#1e2a44');
    P(ctx, x - 42, 200, 84, 2, '#37476f');
    P(ctx, x - 38, 242, 3, 6, '#7a5230'); P(ctx, x + 35, 242, 3, 6, '#7a5230');
    teksPx(ctx, 'DAFTAR: FPB 6', x, 204, '#a8d8f8', 5);
    teksPx(ctx, 'KARTU: 2 x 3 = 6', x, 214, '#ffe9a3', 5);
    teksPx(ctx, 'JAWABAN: 6', x, 228, '#7dffa8', 6);
  }

  /* --- p2-017: galeri barisan prima --- */
  function gambarGaleriDuaBaris(x) {
    P(ctx, x - 44, 194, 88, 36, '#f2ecd4');                   // papan galeri
    P(ctx, x - 44, 194, 88, 3, '#8a6a44'); P(ctx, x - 44, 227, 88, 3, '#8a6a44');
    P(ctx, x - 44, 194, 3, 36, '#8a6a44'); P(ctx, x + 41, 194, 3, 36, '#8a6a44');
    teksPx(ctx, '12 = 2 x 2 x 3', x, 202, '#2aa85e', 6);
    teksPx(ctx, '18 = 2 x 3 x 3', x, 214, '#2aa85e', 6);
    teksPx(ctx, 'GALERI PRIMA', x, 240, '#8a6a44', 5);
  }

  function gambarLingkarPangkatAtas(x) {
    ctx.globalAlpha = 0.3;
    lingkaran(ctx, x - 8, 206, 9, '#ffd166');                 // lingkar 2 2
    lingkaran(ctx, x + 4, 206, 9, '#ffd166');
    lingkaran(ctx, x + 6, 228, 9, '#ffd166');                 // lingkar 3 3
    lingkaran(ctx, x + 18, 228, 9, '#ffd166');
    ctx.globalAlpha = 1;
    teksPx(ctx, '12: 2 2 3', x - 8, 202, '#fffdf2', 6);
    teksPx(ctx, '18: 2 3 3', x - 8, 224, '#fffdf2', 6);
    teksPx(ctx, 'PANGKAT TERBESAR', x, 248, '#ffe9a3', 5);
  }

  function gambarKaliSemuaGaleri(x) {
    teksPx(ctx, '2 x 2 x 3 x 3', x, 204, '#7dffa8', 6);
    teksPx(ctx, '= 36', x, 220, '#fffdf2', 8);
    lingkaran(ctx, x, 242, 10, '#ffd166');                    // medali KPK
    lingkaran(ctx, x, 242, 4, '#fff3cf');
    teksPx(ctx, 'KPK', x + 24, 238, '#ffe9a3', 6);
  }

  function gambarPapanSepakatTigaEnam(x) {
    P(ctx, x - 42, 200, 84, 42, '#1e2a44');
    P(ctx, x - 42, 200, 84, 2, '#37476f');
    P(ctx, x - 38, 242, 3, 6, '#7a5230'); P(ctx, x + 35, 242, 3, 6, '#7a5230');
    teksPx(ctx, 'KEL 12: 12 24 36', x, 204, '#a8d8f8', 5);
    teksPx(ctx, 'KEL 18: 18 36', x, 214, '#ffe9a3', 5);
    teksPx(ctx, 'KPK = 36', x, 228, '#7dffa8', 7);
  }

  /* --- p2-018: tanur roti pecahan --- */
  function gambarPapanDuaBelasPerDelapanBelas(x) {
    for (let i = 0; i < 18; i++) {
      const ux = x - 36 + (i % 6) * 12, uy = 196 + Math.floor(i / 6) * 15;
      P(ctx, ux, uy, 11, 14, i < 12 ? '#c98a4b' : '#f2ecd4'); // 12 roti dari 18
      P(ctx, ux, uy, 11, 2, i < 12 ? '#e0a86b' : '#ffffff');
    }
    teksPx(ctx, '12/18', x, 244, '#fffdf2', 7);
  }

  function gambarPisauBagiEnam(x) {
    teksPx(ctx, '12 : 6 = 2', x, 196, '#ffd166', 6);
    teksPx(ctx, '18 : 6 = 3', x, 208, '#ffd166', 6);
    P(ctx, x - 16, 226, 26, 3, '#c9c9d4');                    // bilah pisau
    P(ctx, x + 10, 224, 8, 7, '#5f4426');                     // gagang
    for (let i = 0; i < 3; i++) {                             // 3 kelompok 6
      P(ctx, x - 30 + i * 22, 236, 20, 2, '#7dffa8');
      teksPx(ctx, '6', x - 20 + i * 22, 240, '#7dffa8', 5);
    }
  }

  function gambarKartuDuaPerTiga(x) {
    P(ctx, x - 18, 198, 36, 44, '#f2ecd4');                   // kartu harga
    P(ctx, x - 18, 198, 36, 3, '#d8ccb0');
    teksPx(ctx, '2', x, 206, '#8a3a32', 8);
    P(ctx, x - 10, 220, 20, 2, '#8a3a32');
    teksPx(ctx, '3', x, 226, '#8a3a32', 8);
    teksPx(ctx, 'SAMA DENGAN 12/18', x, 188, '#ffe9a3', 5);
  }

  function gambarPapanRapiTuntas(x) {
    papanLebar(x, ['2/3', 'PALING RAPI'], 80);
    teksPx(ctx, 'FAKTOR SAMA: 1', x, 188, '#7dffa8', 5);
  }

  /* --- p2-019: titian batu dua pulau --- */
  function gambarPulauSeperempat(x) {
    P(ctx, x - 24, 210, 48, 26, '#8fbf9a');                   // pulau
    P(ctx, x - 24, 210, 48, 3, '#a8d8b0');
    for (let i = 0; i < 4; i++) P(ctx, x - 24 + i * 12, 216, 11, 18, i === 0 ? '#ffd166' : '#6f9e74');   // 1 dari 4
    teksPx(ctx, '1/4', x, 188, '#ffe9a3', 7);
    teksPx(ctx, '4 KEPINGAN', x, 198, '#c8d8d0', 5);
  }

  function gambarPulauSeperenam(x) {
    P(ctx, x - 36, 210, 72, 26, '#8fbf9a');                   // pulau lebar
    P(ctx, x - 36, 210, 72, 3, '#a8d8b0');
    for (let i = 0; i < 6; i++) P(ctx, x - 36 + i * 12, 216, 11, 18, i === 0 ? '#ffd166' : '#6f9e74');   // 1 dari 6
    teksPx(ctx, '1/6', x, 188, '#ffe9a3', 7);
    teksPx(ctx, '6 KEPINGAN', x, 198, '#c8d8d0', 5);
  }

  function gambarTitianDuaBelas(x) {
    for (let i = 0; i < 12; i++) P(ctx, x - 42 + i * 7, 224, 6, 14, i < 3 ? '#ffd166' : (i < 5 ? '#ffb86b' : '#b8b0a0'));   // 3/12 + 2/12
    P(ctx, x - 44, 240, 88, 2, '#a29a8a');
    teksPx(ctx, 'TITIAN 12', x, 190, '#c8d8d0', 5);
    teksPx(ctx, '1/4 = 3/12', x, 200, '#ffe9a3', 5);
    teksPx(ctx, '1/6 = 2/12', x, 210, '#ffd9a3', 5);
  }

  function gambarPapanJumlahLimaPerDuaBelas(x) {
    papanLebar(x, ['3/12 + 2/12', '= 5/12'], 78);
    teksPx(ctx, 'PENYEBUT SAMA', x, 190, '#7dffa8', 5);
  }

  /* --- p2-020: kantor detektif faktor --- */
  function gambarMejaKasusFaktor(x) {
    P(ctx, x - 30, 224, 60, 4, '#8a5f38');                    // meja
    P(ctx, x - 24, 228, 4, 18, '#5f4426'); P(ctx, x + 20, 228, 4, 18, '#5f4426');
    for (let i = 0; i < 3; i++) {                             // 3 berkas
      P(ctx, x - 22 + i * 16, 210, 14, 14, '#f2ecd4');
      P(ctx, x - 22 + i * 16, 210, 14, 2, '#d8ccb0');
    }
    P(ctx, x + 28, 196, 2, 14, '#5f4426');                    // lampu meja
    lingkaran(ctx, x + 29, 194, 5, '#ffd166');
    lingkaran(ctx, x + 29, 194, 2, '#fff3cf');
    teksPx(ctx, 'KANTOR FAKTOR', x, 206, '#ffd166', 5);
  }

  function gambarPapanLimaKasus(x) {
    P(ctx, x - 42, 190, 84, 56, '#1e2a44');
    P(ctx, x - 42, 190, 84, 2, '#37476f');
    P(ctx, x - 38, 246, 3, 4, '#7a5230'); P(ctx, x + 35, 246, 3, 4, '#7a5230');
    teksPx(ctx, 'LIMA KASUS', x, 194, '#ffd166', 5);
    teksPx(ctx, '1. FAKTOR 15', x, 204, '#fffdf2', 5);
    teksPx(ctx, '2. PRIMA 20', x, 212, '#fffdf2', 5);
    teksPx(ctx, '3. FPB 8 & 12', x, 220, '#fffdf2', 5);
    teksPx(ctx, '4. KPK 3 & 5', x, 228, '#fffdf2', 5);
    teksPx(ctx, '5. 10/15 = ?', x, 236, '#fffdf2', 5);
  }

  function gambarLupPemeriksa(x, t) {
    const goyang = Math.sin(t * 2.4) * 1.2;
    lingkaran(ctx, x - 6 + goyang, 208, 12, '#a8d8f8');       // lup
    lingkaran(ctx, x - 6 + goyang, 208, 8, '#e8f4fc');
    lingkaran(ctx, x - 10 + goyang, 204, 2, '#ffffff');
    P(ctx, x + 2 + goyang, 217, 3, 12, '#5f4426');            // gagang
    teksPx(ctx, '15: 1 3 5 15', x - 14, 232, '#7dffa8', 5);
    teksPx(ctx, '20 = 2 x 2 x 5', x + 10, 188, '#a8d8f8', 5);
  }

  function gambarGerbangKoprima(x) {
    P(ctx, x - 26, 200, 7, 46, '#7a5230');                    // tiang kiri
    P(ctx, x + 19, 200, 7, 46, '#7a5230');                    // tiang kanan
    P(ctx, x - 30, 192, 60, 8, '#8a5f38');                    // palang atas
    teksPx(ctx, 'KOPRIMA', x, 182, '#ffd166', 6);
    lingkaran(ctx, x - 16, 222, 8, '#b8a888');                // batu 8
    teksPx(ctx, '8', x - 16, 218, '#5a4630', 7);
    lingkaran(ctx, x + 14, 222, 8, '#b8a888');                // batu 9
    teksPx(ctx, '9', x + 14, 218, '#5a4630', 7);
    teksPx(ctx, 'SAMA: 1', x, 240, '#7dffa8', 5);
  }

  /* --- p2-021: kantor pos surat tersegel --- */
  function gambarSuratTersegelX(x, t) {
    P(ctx, x - 30, 206, 60, 36, '#f5ecd4');                     // badan surat
    P(ctx, x - 30, 206, 60, 3, '#e3d6b4');
    P(ctx, x - 30, 209, 30, 15, '#efe2c0');                     // lipatan kiri
    P(ctx, x, 209, 30, 15, '#efe2c0');                          // lipatan kanan
    const naik = Math.sin(t * 3) * 1.5;
    lingkaran(ctx, x, 229, 7, '#c9564b');                       // segel lilin
    lingkaran(ctx, x, 229, 5, '#e0766a');
    teksPx(ctx, 'x', x, 224 + naik * 0.3, '#fffdf2', 7);
    teksPx(ctx, 'SURAT UNTUK x', x, 196, '#2f5a46', 5);
    P(ctx, x - 30, 244, 60, 2, '#8a6a44');
  }
  function gambarKotakKunciMisteri(x) {
    P(ctx, x - 26, 214, 52, 30, '#a3744a');                     // kotak kayu
    P(ctx, x - 26, 214, 52, 5, '#c9985a');
    P(ctx, x - 26, 228, 52, 2, '#7a5230');
    teksPx(ctx, 'x', x, 219, '#5f4426', 8);
    P(ctx, x - 5, 228, 10, 8, '#ffd166');                       // gembok
    lingkaran(ctx, x - 2, 229, 2, '#c07d0c');
    lingkaran(ctx, x + 2, 229, 2, '#c07d0c');
    P(ctx, x + 34, 224, 4, 12, '#ffd166');                      // kunci gantung
    lingkaran(ctx, x + 36, 220, 4, '#ffd166');
    lingkaran(ctx, x + 36, 220, 2, '#a3744a');
    teksPx(ctx, 'KOTAK MISTERI', x, 196, '#2f5a46', 5);
    P(ctx, x - 26, 244, 52, 2, '#8a6a44');
  }
  function gambarAmplopTerbukaEmpat(x, t) {
    P(ctx, x - 28, 216, 56, 26, '#f5ecd4');                     // amplop terbuka
    P(ctx, x - 28, 216, 56, 3, '#e3d6b4');
    P(ctx, x - 20, 204, 40, 14, '#efe2c0');                     // kartu mencuat
    const naik = Math.sin(t * 4) * 1.5;
    P(ctx, x - 9, 192 + naik, 18, 20, '#fffdf2');               // kartu angka
    teksPx(ctx, '4', x, 196 + naik, '#2aa85e', 8);
    lingkaran(ctx, x - 16, 190, 1.5, '#ffd166');
    lingkaran(ctx, x + 16, 196, 1.5, '#ffd166');
    teksPx(ctx, 'x = 4', x, 246, '#2aa85e', 6);
  }
  function gambarPapanSuratKalimat(x) {
    papanLebar(x, ['x + 1 = 5', 'x = 4'], 52);
    P(ctx, x - 34, 230, 8, 12, '#f5ecd4');                      // amplop kecil
    P(ctx, x + 26, 230, 8, 12, '#f5ecd4');
    lingkaran(ctx, x - 30, 233, 2, '#c9564b');
    lingkaran(ctx, x + 30, 233, 2, '#c9564b');
  }

  /* --- p2-022: kebun apel kantong panen --- */
  function gambarRakKantongDuaTiga(x) {
    P(ctx, x - 40, 210, 80, 4, '#8a5f38');                      // rak
    P(ctx, x - 38, 214, 4, 30, '#5f4426');
    P(ctx, x + 34, 214, 4, 30, '#5f4426');
    for (let i = 0; i < 5; i++) {
      const kx = x - 34 + i * 15, merah = i < 2;
      P(ctx, kx, 190, 12, 20, merah ? '#c9564b' : '#e3b23c');   // kantong
      P(ctx, kx + 3, 186, 6, 4, merah ? '#a3443c' : '#c2952e');
      teksPx(ctx, 'x', kx + 6, 196, '#fffdf2', 6);
    }
    teksPx(ctx, '2x', x - 26, 244, '#c9564b', 7);
    teksPx(ctx, '3x', x + 14, 244, '#c2952e', 7);
  }
  function gambarBarisanKantongLima(x) {
    for (let i = 0; i < 5; i++) {
      const kx = x - 38 + i * 16;
      P(ctx, kx, 214, 13, 22, i < 2 ? '#c9564b' : '#e3b23c');   // 5 kantong
      P(ctx, kx + 4, 210, 5, 4, '#8a5f38');
      teksPx(ctx, 'x', kx + 6, 221, '#fffdf2', 6);
    }
    P(ctx, x - 40, 240, 80, 2, '#2aa85e');
    teksPx(ctx, '5x', x, 244, '#2aa85e', 7);
    teksPx(ctx, '2x + 3x = 5x', x, 196, '#2aa85e', 6);
  }
  function gambarKeranjangApelJeruk(x) {
    P(ctx, x - 34, 224, 28, 6, '#8a5f38');                      // keranjang apel
    P(ctx, x - 32, 230, 24, 14, '#a3744a');
    P(ctx, x + 6, 224, 28, 6, '#8a5f38');                       // keranjang jeruk
    P(ctx, x + 8, 230, 24, 14, '#a3744a');
    lingkaran(ctx, x - 26, 222, 3, '#e05a4a');
    lingkaran(ctx, x - 18, 220, 3, '#e05a4a');
    lingkaran(ctx, x - 22, 225, 3, '#c94a3c');
    lingkaran(ctx, x + 14, 222, 3, '#ff9d4a');
    lingkaran(ctx, x + 22, 220, 3, '#ff9d4a');
    lingkaran(ctx, x + 18, 225, 3, '#e88a30');
    P(ctx, x - 1, 206, 3, 26, '#5f4426');                       // papisan
    P(ctx, x - 9, 206, 19, 8, '#1e2a44');
    teksPx(ctx, 'BEDA', x + 0.5, 207, '#fffdf2', 4);
    teksPx(ctx, '2a', x - 22, 184, '#e05a4a', 6);
    teksPx(ctx, '3b', x + 20, 184, '#e88a30', 6);
  }
  function gambarPapanSukuSejenis(x) {
    papanLebar(x, ['2x + 3x', '= 5x'], 48);
    P(ctx, x - 40, 236, 10, 10, '#c9564b');                     // kantong kecil
    P(ctx, x + 30, 236, 10, 10, '#e3b23c');
  }

  /* --- p2-023: gudang palet kotak --- */
  function gambarPaletDuaKotak(x) {
    P(ctx, x - 26, 238, 52, 4, '#8a5f38');                      // palet
    P(ctx, x - 24, 242, 4, 4, '#6f4a28');
    P(ctx, x - 2, 242, 4, 4, '#6f4a28');
    P(ctx, x + 20, 242, 4, 4, '#6f4a28');
    P(ctx, x - 20, 212, 18, 26, '#c9985a');
    P(ctx, x + 2, 212, 18, 26, '#c9985a');
    P(ctx, x - 20, 212, 18, 3, '#e0b878');
    P(ctx, x + 2, 212, 18, 3, '#e0b878');
    teksPx(ctx, 'x', x - 11, 221, '#5a4630', 7);
    teksPx(ctx, 'x', x + 11, 221, '#5a4630', 7);
    teksPx(ctx, '2x', x, 246, '#8a5f38', 6);
    teksPx(ctx, 'SATU PALET', x, 196, '#8a5f38', 5);
  }
  function gambarTigaPaletSejajar(x) {
    for (let p = 0; p < 3; p++) {
      const px = x - 34 + p * 34;
      P(ctx, px, 234, 30, 4, '#8a5f38');
      P(ctx, px + 2, 210, 11, 24, '#c9985a');
      P(ctx, px + 17, 210, 11, 24, '#c9985a');
      teksPx(ctx, 'x', px + 7, 216, '#5a4630', 5);
      teksPx(ctx, 'x', px + 22, 216, '#5a4630', 5);
    }
    teksPx(ctx, '3 x 2x', x, 198, '#8a5f38', 7);
  }
  function gambarKotakGelindingEnam(x, t) {
    for (let i = 0; i < 6; i++) {
      const kx = x - 40 + i * 16, goyang = i === 2 ? Math.sin(t * 6) * 2 : 0;
      P(ctx, kx, 218 + goyang, 13, 24, '#c9985a');
      P(ctx, kx, 218 + goyang, 13, 3, '#e0b878');
      teksPx(ctx, 'x', kx + 6, 226 + goyang, '#5a4630', 6);
    }
    P(ctx, x - 42, 244, 86, 2, '#8a5f38');
    teksPx(ctx, '6x', x, 198, '#8a5f38', 7);
  }
  function gambarPapanKaliBentuk(x) {
    papanLebar(x, ['3 x 2x', '= 6x'], 46);
    P(ctx, x - 34, 234, 12, 12, '#c9985a');
    P(ctx, x + 22, 234, 12, 12, '#c9985a');
  }

  /* --- p2-024: rumah kaca kuncup --- */
  function gambarDuaPotKaca(x) {
    for (let p = 0; p < 2; p++) {
      const px = x - 24 + p * 34;
      P(ctx, px, 214, 22, 26, '#cfeee0');                       // pot kaca
      P(ctx, px, 214, 22, 3, '#eafaf2');
      P(ctx, px - 2, 238, 26, 5, '#9cc8b0');
      P(ctx, px + 9, 196, 3, 18, '#2aa85e');                    // bibit
      lingkaran(ctx, px + 10, 194, 4, '#5ee89b');
      lingkaran(ctx, px + 3, 202, 3, '#ffd166');                // kuncup
      lingkaran(ctx, px + 17, 202, 3, '#ffd166');
      lingkaran(ctx, px + 4, 208, 3, '#ffd166');
      teksPx(ctx, 'x+3', px + 11, 246, '#2f7a44', 5);
    }
  }
  function gambarIsianPotPertama(x) {
    P(ctx, x - 20, 212, 40, 28, '#cfeee0');                     // pot besar
    P(ctx, x - 20, 238, 40, 5, '#9cc8b0');
    P(ctx, x - 4, 190, 3, 22, '#2aa85e');
    lingkaran(ctx, x - 2, 188, 4, '#5ee89b');
    teksPx(ctx, 'x', x + 10, 192, '#2aa85e', 7);
    for (let i = 0; i < 3; i++) lingkaran(ctx, x - 14 + i * 10, 230, 3, '#ffd166');
    teksPx(ctx, 'ISI SATU POT', x, 186, '#2f7a44', 5);
  }
  function gambarRakIsianSemua(x) {
    P(ctx, x - 38, 220, 76, 4, '#8a5f38');                      // rak
    P(ctx, x - 36, 224, 4, 20, '#5f4426');
    P(ctx, x + 32, 224, 4, 20, '#5f4426');
    for (let i = 0; i < 2; i++) {
      const bx = x - 30 + i * 18;
      P(ctx, bx, 204, 12, 16, '#5ee89b');                       // 2 bibit x
      teksPx(ctx, 'x', bx + 6, 208, '#1e5a3c', 6);
    }
    for (let i = 0; i < 6; i++) lingkaran(ctx, x - 4 + (i % 3) * 9, 209 + Math.floor(i / 3) * 7, 3, '#ffd166');   // 6 kuncup
    P(ctx, x - 17, 186, 34, 15, '#1e2a44');                   // papan hasil
    teksPx(ctx, '2x + 6', x, 190, '#7dffa8', 6);
    teksPx(ctx, 'SEMUA DI RAK', x, 244, '#1e5a3c', 5);
  }
  function gambarPapanKurungTerbuka(x) {
    papanLebar(x, ['2(x+3)', '= 2x + 6'], 62);
    lingkaran(ctx, x - 36, 214, 3, '#ffd166');
    lingkaran(ctx, x + 36, 220, 3, '#ffd166');
  }

  /* --- p2-025: bengkel mesin stempel --- */
  function gambarPapanSlotHuruf(x) {
    P(ctx, x - 26, 200, 52, 40, '#54647c');                     // mesin
    P(ctx, x - 26, 200, 52, 4, '#6a7a92');
    P(ctx, x - 18, 208, 36, 12, '#141d33');                     // layar
    teksPx(ctx, '2x + 1', x, 210, '#7dffa8', 6);
    P(ctx, x - 8, 226, 16, 8, '#141d33');                       // slot
    teksPx(ctx, 'x', x, 227, '#ffd166', 6);
    P(ctx, x - 14, 240, 28, 4, '#3a465c');
    teksPx(ctx, 'SLOT KOSONG', x, 190, '#54647c', 5);
  }
  function gambarKoinNilaiEmpat(x, t) {
    P(ctx, x - 26, 200, 52, 40, '#54647c');
    P(ctx, x - 18, 208, 36, 12, '#141d33');
    teksPx(ctx, '2x + 1', x, 210, '#7dffa8', 6);
    P(ctx, x - 8, 226, 16, 8, '#141d33');
    const masuk = Math.sin(t * 2.5) * 3;
    lingkaran(ctx, x - 20 - masuk, 230, 7, '#ffd166');          // koin merangkak
    lingkaran(ctx, x - 20 - masuk, 230, 5, '#ffe9a3');
    teksPx(ctx, '4', x - 20 - masuk, 226, '#a3742a', 7);
    teksPx(ctx, 'x = 4', x, 246, '#ffd166', 6);
  }
  function gambarRodaMesinHitung(x, t) {
    P(ctx, x - 26, 200, 52, 40, '#54647c');
    P(ctx, x - 18, 208, 36, 12, '#141d33');
    teksPx(ctx, '2 x 4 = 8', x, 210, '#7dffa8', 5);
    const putar = Math.floor(t * 2) % 4;
    lingkaran(ctx, x, 232, 8, '#3a465c');                       // roda
    lingkaran(ctx, x, 232, 6, '#6a7a92');
    P(ctx, x - 1, 225 + putar, 2, 6, '#ffd166');                // penunjuk
    teksPx(ctx, '8 + 1 = 9', x, 184, '#ffd166', 6);
  }
  function gambarStrukHasilSembilan(x) {
    P(ctx, x - 20, 198, 40, 34, '#fffdf2');                     // struk
    P(ctx, x - 20, 198, 40, 3, '#e8e2d4');
    teksPx(ctx, '2x + 1', x, 204, '#2f5a74', 5);
    teksPx(ctx, '= 9', x, 214, '#2aa85e', 6);
    P(ctx, x - 8, 226, 16, 2, '#c9564b');
    P(ctx, x - 6, 232, 12, 2, '#c9564b');
    teksPx(ctx, 'x = 4', x, 240, '#2f5a74', 5);
    lingkaran(ctx, x + 26, 202, 3, '#ffd166');
  }

  /* --- p2-026: teras kamar senja --- */
  function gambarRakKartuBerantakan(x) {
    P(ctx, x - 36, 238, 72, 4, '#8a5f38');                      // lantai rak
    P(ctx, x - 30, 226, 16, 10, '#c9564b');                     // kartu miring
    teksPx(ctx, '5x', x - 24, 228, '#fffdf2', 5);
    P(ctx, x - 8, 230, 12, 8, '#e3b23c');
    teksPx(ctx, '-2', x - 3, 231, '#5a4630', 5);
    P(ctx, x + 8, 222, 16, 12, '#3f8f6f');
    teksPx(ctx, '3x', x + 14, 224, '#fffdf2', 5);
    P(ctx, x + 26, 232, 10, 8, '#63c8ff');
    teksPx(ctx, '4', x + 29, 233, '#1c4a74', 5);
    P(ctx, x - 12, 210, 8, 10, '#e8e2d4');                      // kartu terbang
    P(ctx, x + 18, 206, 8, 10, '#f2b8cc');
    teksPx(ctx, 'BERANTAKAN', x, 196, '#8a5f38', 5);
  }
  function gambarTumpukanSejenis(x) {
    P(ctx, x - 34, 242, 68, 3, '#8a5f38');
    for (let i = 0; i < 2; i++) P(ctx, x - 30, 222 + i * 10, 18, 9, i ? '#3f8f6f' : '#2aa85e');
    teksPx(ctx, '5x', x - 21, 224, '#fffdf2', 5);
    teksPx(ctx, '3x', x - 21, 234, '#fffdf2', 5);
    for (let i = 0; i < 2; i++) P(ctx, x + 8, 222 + i * 10, 18, 9, i ? '#63c8ff' : '#e3b23c');
    teksPx(ctx, '-2', x + 17, 224, '#1c4a74', 5);
    teksPx(ctx, '4', x + 17, 234, '#5a4630', 5);
    teksPx(ctx, 'PILAH SEJENIS', x, 206, '#2aa85e', 5);
  }
  function gambarKartuJadiTertata(x, t) {
    const naik = Math.sin(t * 3) * 1.5;
    P(ctx, x - 26, 218 + naik, 24, 22, '#2aa85e');
    teksPx(ctx, '8x', x - 14, 224 + naik, '#fffdf2', 7);
    P(ctx, x + 4, 218 + naik, 20, 22, '#ffd166');
    teksPx(ctx, '2', x + 14, 224 + naik, '#5a4630', 7);
    lingkaran(ctx, x - 30, 214, 2, '#ffd166');
    lingkaran(ctx, x + 28, 214, 2, '#ffd166');
    teksPx(ctx, '8x + 2', x, 184, '#2aa85e', 6);
  }
  function gambarPapanBentukRapi(x) {
    papanLebar(x, ['5x-2+3x+4', '= 8x + 2'], 80);
  }

  /* --- p2-027: tangga kunang malam --- */
  function gambarTanggaKunangEmpat(x, t) {
    const tinggi = [3, 7, 11, 15], yb = 240;
    for (let i = 0; i < 4; i++) {
      const tx = x - 36 + i * 24, ty = yb - 14 - i * 12;
      P(ctx, tx, ty, 20, yb - ty, '#3a4a66');
      P(ctx, tx, ty, 20, 3, '#4a5a78');
      teksPx(ctx, String(tinggi[i]), tx + 10, ty + 5, '#fffdf2', 6);
      const kelip = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 3 + i));
      ctx.globalAlpha = kelip;
      lingkaran(ctx, tx + 10, ty - 5, 2, '#d8ffb0');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'TANGGA MENYALA', x, 190, '#8a94b8', 5);
  }
  function gambarPanahLompatEmpat(x) {
    for (let i = 0; i < 3; i++) {
      const ax = x - 28 + i * 28;
      P(ctx, ax, 222, 14, 2, '#d8ffb0');
      P(ctx, ax + 14, 220, 2, 6, '#d8ffb0');
      teksPx(ctx, '+4', ax + 7, 228, '#d8ffb0', 5);
    }
    P(ctx, x - 36, 244, 74, 2, '#3a4a66');
    teksPx(ctx, 'NAIK 4 TIAP LANGKAH', x, 184, '#8a94b8', 4);
  }
  function gambarAnakTanggaKeN(x) {
    P(ctx, x - 18, 218, 36, 26, '#3a4a66');
    P(ctx, x - 18, 218, 36, 3, '#4a5a78');
    teksPx(ctx, 'n', x, 224, '#d8ffb0', 8);
    teksPx(ctx, '4 x n - 1', x, 202, '#fffdf2', 6);
    P(ctx, x - 18, 244, 36, 2, '#3a4a66');
    lingkaran(ctx, x + 26, 224, 2, '#d8ffb0');
  }
  function gambarPapanRumusEmpatN(x) {
    papanLebar(x, ['4n - 1', 'n=1: 3', 'n=2: 7'], 46);
    lingkaran(ctx, x - 26, 206, 2, '#d8ffb0');
    lingkaran(ctx, x + 26, 200, 2, '#d8ffb0');
  }

  /* --- p2-028: tenda pendaki senja --- */
  function gambarRakTigaRansel(x) {
    P(ctx, x - 40, 214, 80, 4, '#8a5f38');                      // rak
    P(ctx, x - 38, 218, 4, 26, '#5f4426');
    P(ctx, x + 34, 218, 4, 26, '#5f4426');
    for (let i = 0; i < 3; i++) {
      const rx = x - 32 + i * 24;
      P(ctx, rx, 192, 18, 22, i === 1 ? '#3f8f6f' : '#63c8ff'); // ransel
      P(ctx, rx + 2, 188, 14, 4, '#2f5a74');
      teksPx(ctx, 'x', rx + 9, 198, '#fffdf2', 6);
    }
    teksPx(ctx, '3x', x, 244, '#2f5a74', 7);
    teksPx(ctx, 'TIGA RANSEL', x, 176, '#fffdf2', 5);
  }
  function gambarBatuLimaSendiri(x) {
    lingkaran(ctx, x, 226, 18, '#8a8070');
    lingkaran(ctx, x - 8, 218, 9, '#9a9080');
    lingkaran(ctx, x + 9, 224, 7, '#9a9080');
    teksPx(ctx, '5', x, 219, '#fffdf2', 9);
    P(ctx, x - 22, 244, 44, 2, '#6f665a');
    teksPx(ctx, 'KONSTANTA', x, 196, '#8a6a5a', 5);
  }
  function gambarPapanNamaBagian(x) {
    papanLebar(x, ['3 = KOEF', '5 = KONST'], 66);
    P(ctx, x - 40, 236, 10, 10, '#63c8ff');                     // ransel mini
    lingkaran(ctx, x + 40, 240, 5, '#8a8070');                  // batu mini
  }
  function gambarTendaBekalPenuh(x) {
    P(ctx, x - 28, 230, 56, 14, '#c9564b');                     // tenda
    P(ctx, x - 20, 216, 40, 14, '#d6665a');
    P(ctx, x - 12, 202, 24, 14, '#e0766a');
    P(ctx, x - 4, 226, 8, 18, '#5a3030');                       // pintu
    P(ctx, x - 30, 244, 60, 2, '#6f4a28');
    teksPx(ctx, '3x + 5', x, 190, '#fffdf2', 7);
    lingkaran(ctx, x + 38, 240, 4, '#ff9d4a');                  // api kecil
    P(ctx, x + 34, 244, 10, 2, '#6f4a28');
  }

  /* --- p2-029: ladang bunga pagi --- */
  function gambarPetakBungaA(x) {
    for (let i = 0; i < 2; i++) {
      const px = x - 26 + i * 30;
      P(ctx, px, 226, 24, 8, '#7a5c3a');                        // petak
      P(ctx, px + 2, 224, 20, 3, '#5f4426');
      for (let b = 0; b < 3; b++) {
        P(ctx, px + 5 + b * 6, 216, 2, 8, '#2aa85e');
        lingkaran(ctx, px + 6 + b * 6, 214, 3, '#fffdf2');
      }
      teksPx(ctx, 'a', px + 12, 240, '#fffdf2', 6);
    }
    teksPx(ctx, '2 PETAK a', x, 196, '#e88ab0', 5);
  }
  function gambarPetakBungaB(x) {
    for (let i = 0; i < 3; i++) {
      const px = x - 36 + i * 26;
      P(ctx, px, 226, 20, 8, '#7a5c3a');
      P(ctx, px + 2, 224, 16, 3, '#5f4426');
      for (let b = 0; b < 2; b++) {
        P(ctx, px + 4 + b * 7, 216, 2, 8, '#2aa85e');
        lingkaran(ctx, px + 5 + b * 7, 214, 3, '#e05a6a');
      }
      teksPx(ctx, 'b', px + 10, 240, '#fffdf2', 6);
    }
    teksPx(ctx, '3 PETAK b', x, 196, '#e05a6a', 5);
  }
  function gambarLadangTerbaca(x) {
    for (let i = 0; i < 5; i++) {
      const px = x - 40 + i * 17, warna = i < 2 ? '#fffdf2' : '#e05a6a';
      P(ctx, px, 222, 14, 7, '#7a5c3a');
      P(ctx, px + 6, 212, 2, 10, '#2aa85e');
      lingkaran(ctx, px + 7, 210, 3, warna);
    }
    teksPx(ctx, '2a + 3b', x, 196, '#fffdf2', 8);
    P(ctx, x - 42, 244, 86, 2, '#5f7a52');
  }
  function gambarPapanDuaA3B(x) {
    papanLebar(x, ['2a + 3b', 'a=2 b=1', '= 7'], 54);
    lingkaran(ctx, x - 30, 206, 3, '#fffdf2');
    lingkaran(ctx, x + 30, 212, 3, '#e05a6a');
  }

  /* --- p2-030: menara jaga malam --- */
  function gambarMenaraLimaMisi(x) {
    P(ctx, x - 20, 186, 40, 58, '#3a4a6e');                     // menara
    P(ctx, x - 24, 180, 48, 8, '#2e3c58');
    for (let i = 0; i < 5; i++) P(ctx, x - 14 + (i % 2) * 18, 192 + Math.floor(i / 2) * 14, 10, 9, '#ffd166');
    P(ctx, x - 6, 232, 12, 12, '#141d33');                      // pintu
    teksPx(ctx, 'LIMA MISI', x, 168, '#8a94b8', 5);
  }
  function gambarJendelaPolaBarisan(x) {
    P(ctx, x - 30, 200, 60, 40, '#141d33');
    P(ctx, x - 30, 200, 60, 3, '#3a4a6e');
    teksPx(ctx, '5 9 13 ?', x, 210, '#7dffa8', 7);
    teksPx(ctx, '4n + 1', x, 226, '#ffd166', 7);
    P(ctx, x - 30, 240, 60, 2, '#2e3c58');
    lingkaran(ctx, x + 36, 206, 2, '#ffd166');
  }
  function gambarJendelaKurungSuku(x) {
    P(ctx, x - 30, 200, 60, 40, '#141d33');
    P(ctx, x - 30, 200, 60, 3, '#3a4a6e');
    teksPx(ctx, '3(x+2)', x, 208, '#7dffa8', 6);
    teksPx(ctx, '= 3x + 6', x, 220, '#7dffa8', 6);
    teksPx(ctx, '4x+2x=6x', x, 232, '#ffd166', 5);
    P(ctx, x - 30, 240, 60, 2, '#2e3c58');
  }
  function gambarJendelaNilaiHuruf(x) {
    P(ctx, x - 30, 200, 60, 40, '#141d33');
    P(ctx, x - 30, 200, 60, 3, '#3a4a6e');
    teksPx(ctx, 'x = 3', x, 208, '#7dffa8', 6);
    teksPx(ctx, '2x + 1', x, 220, '#7dffa8', 6);
    teksPx(ctx, '= 7', x, 232, '#ffd166', 7);
    P(ctx, x - 30, 240, 60, 2, '#2e3c58');
    lingkaran(ctx, x + 36, 206, 2, '#7dffa8');
  }

  const OBJEK_GAMBAR = {
    api: gambarApi, tulang: gambarTulang, tablet: gambarTablet, nol: gambarNol,
    pohon: gambarPohon, tugu: gambarTugu, tanya: gambarTanya,
    batu: gambarBatu, kantong: gambarKantong, pagar: gambarPagar,
    menara: gambarMenara, gulungan: gambarGulungan, langkah: gambarLangkah, kotak: gambarKotak,
    lubang: gambarLubang, papan10: gambarPapan10, piring: gambarPiring, menaraAngka: gambarMenaraAngka,
    tali: gambarTali, sudut: gambarSudut, bata: gambarBata, piramidaKecil: gambarPiramidaKecil,
    kolom: gambarKolom, papanRX: gambarPapanRX, jamMatahari: gambarJamMatahari, kosong: gambarKosong,
    abakus: gambarAbakus, kelereng: gambarKelereng, geser: gambarGeser, kalkulator: gambarKalkulator,
    roda: gambarRoda, benang: gambarBenang, papan314: gambarPapan314, rodaKecil: gambarRodaKecil,
    neraca: gambarNeraca, takaran: gambarTakaran, koin: gambarKoin, tendaKecil: gambarTendaKecil,
    roket: gambarRoket, satelit: gambarSatelit, robot: gambarRobot, konstelasi: gambarKonstelasi,
    gerbang9: gambarGerbang9, rumahAngka: gambarRumahAngka, lampuJalan: gambarLampuJalan, papanSahabat: gambarPapanSahabat,
    kakiTangga: gambarKakiTangga, batuAngka: gambarBatuAngka, jedaBunga: gambarJedaBunga, puncakBendera: gambarPuncakBendera,
    papanMundur: gambarPapanMundur, roketKecil: gambarRoketKecil, benderaTurun: gambarBenderaTurun, nolNyala: gambarNolNyala,
    dermaga: gambarDermaga, kursiKapten: gambarKursiKapten, muatan: gambarMuatan, duaKursi: gambarDuaKursi,
    tiket: gambarTiket, kursi1: gambarKursi1, kursi10: gambarKursi10, kursi1000: gambarKursi1000,
    jemuran: gambarJemuran, rakSepatu: gambarRakSepatu, becakRoda: gambarBecakRoda, tumpukKue: gambarTumpukKue,
    bangkuTaman: gambarBangkuTaman, kausSendiri: gambarKausSendiri, manikGanjil: gambarManikGanjil, lampionPohon: gambarLampionPohon,
    toplesDua: gambarToplesDua, tandaBuka: gambarTandaBuka, tandaSama: gambarTandaSama, papanHarga: gambarPapanHarga,
    garisFinish: gambarGarisFinish, podium: gambarPodium, nomorDada: gambarNomorDada, bukuHalaman: gambarBukuHalaman,
    lampuTepi: gambarLampuTepi, manikBenang: gambarManikBenang, tetesan: gambarTetesan, tekaAngka: gambarTekaAngka,
    papanPlus: gambarPapanPlus, duaKeranjang: gambarDuaKeranjang, wadahGabung: gambarWadahGabung, papanEt: gambarPapanEt,
    papanMin: gambarPapanMin, kantongLima: gambarKantongLima, temanPergi: gambarTemanPergi, papanSisa: gambarPapanSisa,
    papanKali: gambarPapanKali, barisParade: gambarBarisParade, papan444: gambarPapan444, papanTahunX: gambarPapanTahunX,
    papanBagi: gambarPapanBagi, nampanKue: gambarNampanKue, piringMasing: gambarPiringMasing, papanObelus: gambarPapanObelus,
    papanEq: gambarPapanEq, timbangSetara: gambarTimbangSetara, timbangMiring: gambarTimbangMiring, papan1557: gambarPapan1557,
    rahangTerbuka: gambarRahangTerbuka, kartu93: gambarKartu93, kartuBalik: gambarKartuBalik, papanArah: gambarPapanArah,
    gerbangKurung: gambarGerbangKurung, papanDalam: gambarPapanDalam, papanTanpa: gambarPapanTanpa, papanUrutan: gambarPapanUrutan,
    papanKoma: gambarPapanKoma, kueUtuhSetengah: gambarKueUtuhSetengah, papan15: gambarPapan15, kueDuaKoma: gambarKueDuaKoma,
    delapanMiring: gambarDelapanMiring, jalanMelingkar: gambarJalanMelingkar, bintangTerbanyak: gambarBintangTerbanyak, papan1655: gambarPapan1655,
    bukuTerbuka: gambarBukuTerbuka, kartuKalimat: gambarKartuKalimat, papanKalimat2: gambarPapanKalimat2, papanTebak: gambarPapanTebak,
    lingkarPasir: gambarLingkarPasir, kelerengDua: gambarKelerengDua, kelerengTiga: gambarKelerengTiga, gabungLima: gambarGabungLima,
    telapak: gambarTelapak, angkatTiga: gambarAngkatTiga, angkatTigaEmpat: gambarAngkatTigaEmpat, jariPenuh: gambarJariPenuh,
    kotakSepuluh: gambarKotakSepuluh, limaDatang: gambarLimaDatang, tumpukTiga: gambarTumpukTiga, papanDelapanLima: gambarPapanDelapanLima,
    papanBersusun: gambarPapanBersusun, kolomSatuan: gambarKolomSatuan, kolomPuluhan: gambarKolomPuluhan, papanHasilTambah: gambarPapanHasilTambah,
    posHitung: gambarPosHitung, limaTujuh: gambarLimaTujuh, simpanSatu: gambarSimpanSatu, papanSimpan: gambarPapanSimpan,
    piringLima: gambarPiringLima, duaDimakan: gambarDuaDimakan, tigaTersisa: gambarTigaTersisa, bungkusNanti: gambarBungkusNanti,
    papanKurangBersusun: gambarPapanKurangBersusun, kurangSatuan: gambarKurangSatuan, kurangPuluhan: gambarKurangPuluhan, papanHasilKurang: gambarPapanHasilKurang,
    papanTakMuat: gambarPapanTakMuat, pinjamSatu: gambarPinjamSatu, duaBelasKurangLima: gambarDuaBelasKurangLima, papanHasilPinjam: gambarPapanHasilPinjam,
    tigaSahabat: gambarTigaSahabat, kalimatTambahDua: gambarKalimatTambahDua, kalimatKurangDua: gambarKalimatKurangDua, kartuEmpat: gambarKartuEmpat,
    layangEmpat: gambarLayangEmpat, layangDua: gambarLayangDua, layangEnam: gambarLayangEnam, papanCerita: gambarPapanCerita,
    kalengTujuh: gambarKalengTujuh, tigaDibagikan: gambarTigaDibagikan, permenEmpat: gambarPermenEmpat, papanPertanyaan: gambarPapanPertanyaan,
    papanTeka: gambarPapanTeka, jejakSembilan: gambarJejakSembilan, limaDitemukan: gambarLimaDitemukan, papanJawab: gambarPapanJawab,
    barisLima: gambarBarisLima, papanCepat: gambarPapanCepat, loncatLima: gambarLoncatLima, kantongKelereng: gambarKantongKelereng,
    pasangSandal: gambarPasangSandal, tiangLampu2: gambarTiangLampu2, tanggaLompat2: gambarTanggaLompat2, papanTabel2: gambarPapanTabel2,
    jariSatu: gambarJariSatu, jariDua: gambarJariDua, bungaKelopak: gambarBungaKelopak, papanJam: gambarPapanJam,
    gerbongSatu: gambarGerbongSatu, gerbongEmpat: gambarGerbongEmpat, nolEmas: gambarNolEmas, pijakanPuluhan: gambarPijakanPuluhan,
    segitigaTiga: gambarSegitigaTiga, kursiEmpat: gambarKursiEmpat, tanggaDua: gambarTanggaDua, gridTigaEmpat: gambarGridTigaEmpat,
    jalurEnam: gambarJalurEnam, tanggaTujuh: gambarTanggaTujuh, empatJalur: gambarEmpatJalur, benderaPuncak: gambarBenderaPuncak,
    jariSembilan: gambarJariSembilan, papan27: gambarPapan27, kartuSembilan: gambarKartuSembilan, papanSepuluh: gambarPapanSepuluh,
    kartu23: gambarKartu23, kaliSatuan: gambarKaliSatuan, kaliPuluhan: gambarKaliPuluhan, papan92: gambarPapan92,
    nampanSepuluh: gambarNampanSepuluh, satuSatu: gambarSatuSatu, piringKembar: gambarPiringKembar, rotiEnam: gambarRotiEnam,
    kueTujuh: gambarKueTujuh, kueTigaTiga: gambarKueTigaTiga, papanSisa2: gambarPapanSisa2, kueCek: gambarKueCek,
    kartu96: gambarKartu96, ikatSembilan: gambarIkatSembilan, turunkanEnam: gambarTurunkanEnam, papan32: gambarPapan32,
    tumpukan24: gambarTumpukan24, piringBalik: gambarPiringBalik, kartuKaliBagi: gambarKartuKaliBagi, tekaDuaPuluh: gambarTekaDuaPuluh,
    kueDapur: gambarKueDapur, garisTengah: gambarGarisTengah, piringSetengah: gambarPiringSetengah, potongTimpang: gambarPotongTimpang,
    mejaUltah: gambarMejaUltah, potongSilang: gambarPotongSilang, piringSeperempat: gambarPiringSeperempat, duaJadiSetengah: gambarDuaJadiSetengah,
    bukuResep: gambarBukuResep, penyebutBawah: gambarPenyebutBawah, pembilangAtas: gambarPembilangAtas, papanTigaEmpat: gambarPapanTigaEmpat,
    rotiTiga: gambarRotiTiga, rotiLima: gambarRotiLima, rotiDelapan: gambarRotiDelapan, papanKeluarga: gambarPapanKeluarga,
    kueKembar: gambarKueKembar, potongBeda: gambarPotongBeda, bandingPiring: gambarBandingPiring, kartuSenilai: gambarKartuSenilai,
    batangDua: gambarBatangDua, batangDelapan: gambarBatangDelapan, jebakTerbongkar: gambarJebakTerbongkar, papanPeringatan: gambarPapanPeringatan,
    kueEmpatNampan: gambarKueEmpatNampan, ambilSatuDua: gambarAmbilSatuDua, gabungTigaEmpat: gambarGabungTigaEmpat, papanAturanSenama: gambarPapanAturanSenama,
    kueTigaEmpat: gambarKueTigaEmpat, makanSatuPotong: gambarMakanSatuPotong, sisaDuaEmpat: gambarSisaDuaEmpat, papanKantin: gambarPapanKantin,
    piringUtuh: gambarPiringUtuh, piringSetengah2: gambarPiringSetengah2, campurSatuSetengah: gambarCampurSatuSetengah, butuhSetengah: gambarButuhSetengah,
    kelerengTikar: gambarKelerengTikar, bagiDuaPiring: gambarBagiDuaPiring, setengahLima: gambarSetengahLima, cobaDelapan: gambarCobaDelapan,
    kertasPersegi: gambarKertasPersegi, garisSilangKertas: gambarGarisSilangKertas, warnaiDuaKotak: gambarWarnaiDuaKotak, temanMembaca: gambarTemanMembaca,
    kueDelapanGelang: gambarKueDelapanGelang, dimakanTigaGel: gambarDimakanTigaGel, sisaLimaDelapan: gambarSisaLimaDelapan, lebihSetengah: gambarLebihSetengah,
    gelasUkur: gambarGelasUkur, gelasSetengah: gambarGelasSetengah, papanKepingan: gambarPapanKepingan, kartuSahabat: gambarKartuSahabat,
    kandangUtuh: gambarKandangUtuh, sepuluhBilik: gambarSepuluhBilik, bilikSatu: gambarBilikSatu, papanKepSepuluh: gambarPapanKepSepuluh,
    gerbangNolLima: gambarGerbangNolLima, gerbangSetengah: gambarGerbangSetengah, tamanSatuKue: gambarTamanSatuKue, gerbangSeperempat: gambarGerbangSeperempat,
    kartuTujuh: gambarKartuTujuh, kartuDuaLima: gambarKartuDuaLima, kacaPembesar: gambarKacaPembesar, papanSkor: gambarPapanSkor,
    lapanganSeratus: gambarLapanganSeratus, kotakSeratus: gambarKotakSeratus, ambilDuaLima: gambarAmbilDuaLima, papanPersen: gambarPapanPersen,
    bakPenuh: gambarBakPenuh, bakSetengah: gambarBakSetengah, bakKosong: gambarBakKosong, papanSatuKata: gambarPapanSatuKata,
    kueDiMeja: gambarKueDiMeja, kacaPecahan: gambarKacaPecahan, kacaDesimal: gambarKacaDesimal, kacaPersen: gambarKacaPersen,
    dompetBuka: gambarDompetBuka, lembarSeribu: gambarLembarSeribu, barisanLembar: gambarBarisanLembar, papanKoin: gambarPapanKoin,
    permenTigaRibu: gambarPermenTigaRibu, bayarLimaRibu: gambarBayarLimaRibu, kembalianDua: gambarKembalianDua, papanKurangKasir: gambarPapanKurangKasir,
    koinSenin: gambarKoinSenin, koinSelasa: gambarKoinSelasa, koinRabu: gambarKoinRabu, celenganBahagia: gambarCelenganBahagia,
    jendelaBentuk: gambarJendelaBentuk, rodaBentuk: gambarRodaBentuk, atapBentuk: gambarAtapBentuk, papanTigaBentuk: gambarPapanTigaBentuk,
    jalanLurus: gambarJalanLurus, tigaSisiTepi: gambarTigaSisiTepi, sikuKayu: gambarSikuKayu, papanSudut: gambarPapanSudut,
    benderaMulai: gambarBenderaMulai, jalanOval: gambarJalanOval, jejakKaki: gambarJejakKaki, papanPutaran: gambarPapanPutaran,
    sisiPanjang: gambarSisiPanjang, sisiLebar: gambarSisiLebar, patroliPutar: gambarPatroliPutar, papan26: gambarPapan26,
    pagarLantai: gambarPagarLantai, ubinPasang: gambarUbinPasang, ubinDuaBelas: gambarUbinDuaBelas, papanPagarKarpet: gambarPapanPagarKarpet,
    barisEnam: gambarBarisEnam, empatBaris: gambarEmpatBaris, hitungLompat: gambarHitungLompat, papan64: gambarPapan64,
    kotakUbin24: gambarKotakUbin24, segitigaSampir: gambarSegitigaSampir, duaSegitiga: gambarDuaSegitiga, papanSetengah: gambarPapanSetengah,
    pusatRoda: gambarPusatRoda, jariRoda: gambarJariRoda, taliKeliling: gambarTaliKeliling, papanPi: gambarPapanPi,
    daduBesar: gambarDaduBesar, kardusBesar: gambarKardusBesar, sisiEnamDadu: gambarSisiEnamDadu, papanIsi: gambarPapanIsi,
    papanMisi: gambarPapanMisi, jendelaPintu: gambarJendelaPintu, piringAtap: gambarPiringAtap, kotakMainan: gambarKotakMainan, papanDitemukan: gambarPapanDitemukan,
    penggarisRaksasa: gambarPenggarisRaksasa, jariKelingking: gambarJariKelingking, langkahMeter: gambarLangkahMeter, papanMeter: gambarPapanMeter,
    neracaPas: gambarNeracaPas, gulaKilo: gambarGulaKilo, telurKertas: gambarTelurKertas, papanKilo: gambarPapanKilo,
    gelasUkur250: gambarGelasUkur250, botolLiter: gambarBotolLiter, tekoTuang: gambarTekoTuang, papanLiter: gambarPapanLiter,
    jamRaksasa: gambarJamRaksasa, jarumDua: gambarJarumDua, detikBerlari: gambarDetikBerlari, papanEnamPuluh: gambarPapanEnamPuluh,
    kalenderTujuh: gambarKalenderTujuh, bulanFase: gambarBulanFase, kabisatEmpat: gambarKabisatEmpat, papanWaktu: gambarPapanWaktu,
    termometerBeku: gambarTermometerBeku, termometerDidih: gambarTermometerDidih, tubuhTigaTujuh: gambarTubuhTigaTujuh, papanDerajat: gambarPapanDerajat,
    lampuFestival: gambarLampuFestival, ubinPola: gambarUbinPola, gelangManik: gambarGelangManik, papanPola: gambarPapanPola,
    jejakHilang: gambarJejakHilang, kacaTeka: gambarKacaTeka, kartuTebak: gambarKartuTebak, papanBeda: gambarPapanBeda,
    kotakAjaib: gambarKotakAjaib, garisAjaib: gambarGarisAjaib, kuraLegenda: gambarKuraLegenda, papanLimaBelas: gambarPapanLimaBelas,
    lombaMulai: gambarLombaMulai, geserSatu: gambarGeserSatu, papanSeratusEnam: gambarPapanSeratusEnam, finishKilat: gambarFinishKilat,
    gerbangLabirin: gambarGerbangLabirin, jalurTiga: gambarJalurTiga, jalanBuntu: gambarJalanBuntu, papanKetiga: gambarPapanKetiga,
    tigaMenara: gambarTigaMenara, duelTanya: gambarDuelTanya, dominoLogika: gambarDominoLogika, papanKesimpulan: gambarPapanKesimpulan,
    khemahPapan: gambarKhemahPapan, papanAturan: gambarPapanAturan, satuPilihan: gambarSatuPilihan, papanSolusi: gambarPapanSolusi,
    gerbangJuara: gambarGerbangJuara, ujiPola: gambarUjiPola, ujiKali: gambarUjiKali, ujiHilang: gambarUjiHilang, ujiLogika: gambarUjiLogika,
    gerbangTambang: gambarGerbangTambang, tiangKedalaman: gambarTiangKedalaman, taliKeranjang: gambarTaliKeranjang, tanggaMinus: gambarTanggaMinus,
    jembatanAngka: gambarJembatanAngka, tiangNolTengah: gambarTiangNolTengah, panahDuaArah: gambarPanahDuaArah, langkahBilangan: gambarLangkahBilangan,
    termometerGanda: gambarTermometerGanda, papanBeku: gambarPapanBeku, esTumpuk: gambarEsTumpuk, duaKamarEs: gambarDuaKamarEs,
    bukuCatatan: gambarBukuCatatan, koinNampanLima: gambarKoinNampanLima, papanSaldoUtang: gambarPapanSaldoUtang, stempelLunas: gambarStempelLunas,
    tiangJurangDua: gambarTiangJurangDua, papanLebihKecil: gambarPapanLebihKecil, lenteraJurang: gambarLenteraJurang, papanUrutanNegatif: gambarPapanUrutanNegatif,
    tanggaDermaga: gambarTanggaDermaga, perahuNelayan: gambarPerahuNelayan, taliTurunPerahu: gambarTaliTurunPerahu, papanCatatanKapten: gambarPapanCatatanKapten,
    pintuMinusGanda: gambarPintuMinusGanda, kunciBalikArah: gambarKunciBalikArah, jejakLorong: gambarJejakLorong, papanBukaRahasia: gambarPapanBukaRahasia,
    papanPanahKiri: gambarPapanPanahKiri, tanggaPolaMinus: gambarTanggaPolaMinus, cerminDuaArah: gambarCerminDuaArah, papanAturanKali: gambarPapanAturanKali,
    mejaSortirPaket: gambarMejaSortirPaket, papanSamaBeda: gambarPapanSamaBeda, tigaKardusContoh: gambarTigaKardusContoh, sepedaKurirDua: gambarSepedaKurirDua,
    menaraLiftTambang: gambarMenaraLiftTambang, papanLimaMisi: gambarPapanLimaMisi, rodaTaliLift: gambarRodaTaliLift, gerbangLenteraDalam: gambarGerbangLenteraDalam,
    rakUbinDuaBelas: gambarRakUbinDuaBelas, barisSatuDuaBelas: gambarBarisSatuDuaBelas, petakDuaEnam: gambarPetakDuaEnam, petakTigaEmpat: gambarPetakTigaEmpat,
    batuKuari: gambarBatuKuari, paluPecahDua: gambarPaluPecahDua, bataPrimaTiga: gambarBataPrimaTiga, papanSusunPrima: gambarPapanSusunPrima,
    mejaBungkusDua: gambarMejaBungkusDua, papanPembagiKembar: gambarPapanPembagiKembar, bungkusanEnam: gambarBungkusanEnam, papanFPBEnam: gambarPapanFPBEnam,
    duaLampionPesta: gambarDuaLampionPesta, jalurDetikPesta: gambarJalurDetikPesta, titikBertemuDuaBelas: gambarTitikBertemuDuaBelas, papanKeluargaKelipatan: gambarPapanKeluargaKelipatan,
    papanTanggaBagi: gambarPapanTanggaBagi, anakTurunDua: gambarAnakTurunDua, tanggaSampaiSatu: gambarTanggaSampaiSatu, papanBacaSisiKiri: gambarPapanBacaSisiKiri,
    duaPetiKartuPrima: gambarDuaPetiKartuPrima, kartuSamaLingkar: gambarKartuSamaLingkar, ambilPangkatKecil: gambarAmbilPangkatKecil, papanDuaJalanSatuJawab: gambarPapanDuaJalanSatuJawab,
    galeriDuaBaris: gambarGaleriDuaBaris, lingkarPangkatAtas: gambarLingkarPangkatAtas, kaliSemuaGaleri: gambarKaliSemuaGaleri, papanSepakatTigaEnam: gambarPapanSepakatTigaEnam,
    papanDuaBelasPerDelapanBelas: gambarPapanDuaBelasPerDelapanBelas, pisauBagiEnam: gambarPisauBagiEnam, kartuDuaPerTiga: gambarKartuDuaPerTiga, papanRapiTuntas: gambarPapanRapiTuntas,
    pulauSeperempat: gambarPulauSeperempat, pulauSeperenam: gambarPulauSeperenam, titianDuaBelas: gambarTitianDuaBelas, papanJumlahLimaPerDuaBelas: gambarPapanJumlahLimaPerDuaBelas,
    mejaKasusFaktor: gambarMejaKasusFaktor, papanLimaKasus: gambarPapanLimaKasus, lupPemeriksa: gambarLupPemeriksa, gerbangKoprima: gambarGerbangKoprima,
    suratTersegelX: gambarSuratTersegelX, kotakKunciMisteri: gambarKotakKunciMisteri, amplopTerbukaEmpat: gambarAmplopTerbukaEmpat, papanSuratKalimat: gambarPapanSuratKalimat,
    rakKantongDuaTiga: gambarRakKantongDuaTiga, barisanKantongLima: gambarBarisanKantongLima, keranjangApelJeruk: gambarKeranjangApelJeruk, papanSukuSejenis: gambarPapanSukuSejenis,
    paletDuaKotak: gambarPaletDuaKotak, tigaPaletSejajar: gambarTigaPaletSejajar, kotakGelindingEnam: gambarKotakGelindingEnam, papanKaliBentuk: gambarPapanKaliBentuk,
    duaPotKaca: gambarDuaPotKaca, isianPotPertama: gambarIsianPotPertama, rakIsianSemua: gambarRakIsianSemua, papanKurungTerbuka: gambarPapanKurungTerbuka,
    papanSlotHuruf: gambarPapanSlotHuruf, koinNilaiEmpat: gambarKoinNilaiEmpat, rodaMesinHitung: gambarRodaMesinHitung, strukHasilSembilan: gambarStrukHasilSembilan,
    rakKartuBerantakan: gambarRakKartuBerantakan, tumpukanSejenis: gambarTumpukanSejenis, kartuJadiTertata: gambarKartuJadiTertata, papanBentukRapi: gambarPapanBentukRapi,
    tanggaKunangEmpat: gambarTanggaKunangEmpat, panahLompatEmpat: gambarPanahLompatEmpat, anakTanggaKeN: gambarAnakTanggaKeN, papanRumusEmpatN: gambarPapanRumusEmpatN,
    rakTigaRansel: gambarRakTigaRansel, batuLimaSendiri: gambarBatuLimaSendiri, papanNamaBagian: gambarPapanNamaBagian, tendaBekalPenuh: gambarTendaBekalPenuh,
    petakBungaA: gambarPetakBungaA, petakBungaB: gambarPetakBungaB, ladangTerbaca: gambarLadangTerbaca, papanDuaA3B: gambarPapanDuaA3B,
    menaraLimaMisi: gambarMenaraLimaMisi, jendelaPolaBarisan: gambarJendelaPolaBarisan, jendelaKurungSuku: gambarJendelaKurungSuku, jendelaNilaiHuruf: gambarJendelaNilaiHuruf,
  };

  function gambarStasiun(st, t) {
    const lewat = stasiun.indexOf(st) < aktif;
    if (stasiun.indexOf(st) === aktif) {
      gambarCahaya(st.x, GROUND - 10, 16, kat.color, t);
      const ay = 168 + Math.round(Math.sin(t * 3) * 2);   // panah pixel turun
      P(ctx, st.x - 1, ay, 3, 4, '#fffdf2');
      P(ctx, st.x - 3, ay + 3, 7, 2, '#fffdf2');
      P(ctx, st.x - 1, ay + 5, 3, 2, '#fffdf2');
    }
    const fn = OBJEK_GAMBAR[st.objek] || gambarTanya;
    fn(st.x, t);
    if (lewat || (st.akhir && selesai(topik.id))) gambarCentang(st.x, 172);
  }

  /* ---------- buble sapaan penduduk ---------- */
  function gambarBuble(npcX, baris) {
    ctx.font = '8px "Press Start 2P", monospace';
    let bw = 0;
    for (const b of baris) bw = Math.max(bw, ctx.measureText(b).width);
    bw = Math.ceil(bw) + 10;
    const bh = baris.length * 13 + 7;
    const bx = Math.max(2, Math.min(W - bw - 2, npcX - bw / 2));
    const by = GROUND - 10 - 9 - 6 - bh;
    P(ctx, bx + 1, by, bw - 2, bh, '#fffdf2');
    P(ctx, bx, by + 1, bw, bh - 2, '#fffdf2');
    ctx.fillStyle = '#2a3757';
    ctx.fillRect(bx, by, bw, 1); ctx.fillRect(bx, by + bh - 1, bw, 1);
    ctx.fillRect(bx, by, 1, bh); ctx.fillRect(bx + bw - 1, by, 1, bh);
    P(ctx, npcX - 2, by + bh, 4, 2, '#fffdf2');
    ctx.fillStyle = '#1c2740';
    ctx.textBaseline = 'top';
    for (let i = 0; i < baris.length; i++) ctx.fillText(baris[i], bx + 5, by + 4 + i * 13);
  }

  /* ---------- gambar utama ---------- */
  function gambarAwan(a, w1, w2) {
    const s = a.s;
    P(ctx, a.x, a.y + 4 * s, 26 * s, 6 * s, w1);
    P(ctx, a.x + 5 * s, a.y + 1 * s, 11 * s, 5 * s, w1);
    P(ctx, a.x + 15 * s, a.y + 2 * s, 8 * s, 4 * s, w2);
  }

  function draw(t) {
    ctx.drawImage(LATAR, 0, 0);

    for (const a of awan) gambarAwan(a, cfgTema.awan, cfgTema.awan2);
    for (const g of glifLangit) {
      ctx.globalAlpha = 0.3 + 0.18 * Math.sin(t * 2 + g.f * 3);
      teksPx(ctx, g.g, g.x, g.y + Math.sin(t + g.f) * 2, '#fffdf2', 9);
      ctx.globalAlpha = 1;
    }

    // partikel ambien khas tema
    for (const a of amb) {
      const kelip = 0.22 + 0.4 * (0.5 + 0.5 * Math.sin(t * 2 + a.f * 2));
      ctx.globalAlpha = kelip;
      P(ctx, a.x, a.y, a.jenis === 'kedip' ? 2 : 1, a.jenis === 'kedip' ? 2 : 1, a.warna);
      ctx.globalAlpha = 1;
    }

    // partikel objek
    for (const s of asap) {
      ctx.globalAlpha = 0.35 * (1 - s.umur / s.hidup);
      P(ctx, s.x, s.y, 2, 2, '#e8eef8');
      ctx.globalAlpha = 1;
    }
    for (const d of daun) {
      ctx.globalAlpha = 0.85 * (1 - d.umur / d.hidup);
      P(ctx, d.x, d.y, 2, 2, '#4fa55e');
      ctx.globalAlpha = 1;
    }
    for (const k of kilau) {
      const u = k.umur / k.hidup;
      ctx.globalAlpha = 1 - u;
      P(ctx, k.x, k.y - u * 10, 1, 1, '#fff3cf');
      ctx.globalAlpha = 1;
    }

    // stasiun cerita
    for (const st of stasiun) gambarStasiun(st, t);

    // penduduk bola-lentera + sapaan
    const dekat = Math.abs(player.x - NPC_X) < 46;
    K.gambar.bayangan(ctx, NPC_X, GROUND - 1, 10);
    K.gambar.bolaLentera(ctx, NPC_X, GROUND - 10, '#a5d8ff', '#4a7fc0', NPC.glif, t * 2);
    if (dekat && !document.body.classList.contains('dlg-buka')) gambarBuble(NPC_X, NPC.ucap);

    // Akio — bulatan emas murni
    K.gambar.bayangan(ctx, player.x, player.y + 1, 12);
    const fr = player.state === 'jalan' ? Math.floor(player.walkT / 13) % 4 : 0;
    K.gambar.akio(ctx, player.x, player.y, 1, player.squash, player.state === 'jalan' ? fr : 0);
  }

  /* ---------- loop ---------- */
  let last = 0;
  function loop(ts) {
    const dt = Math.min(0.05, (ts - last) / 1000 || 0.016);
    last = ts;
    update(dt);
    updatePartikel(dt, ts / 1000);
    draw(ts / 1000);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  /* ---------- intro & kembali ---------- */
  btnMasuk.addEventListener('click', () => {
    introEl.classList.add('pergi');
    setTimeout(() => { if (introEl.parentNode) introEl.parentNode.removeChild(introEl); }, 700);
  });
  btnKamp.addEventListener('click', () => { window.location.href = TUJU_KAMP; });

  /* ---------- API debug (QA) ---------- */
  window.PLDBG = {
    get: () => ({
      px: Math.round(player.x), state: player.state, target: player.target,
      aktif, judul: topik.id, tema: TEMA_NAMA, dialog: dlg ? dlg.judul : null,
      near: nearSt, selesai: selesai(topik.id),
      muat: !!muatEl.parentNode && muatEl.classList.contains('aktif'),
      asal: asal.k + ':' + asal.hal,
    }),
    ke: x => { if (!dlg) { player.target = Math.max(14, Math.min(W - 14, x)); player.tuju = null; } },
    keStasiun: i => tujuStasiun(Math.max(0, Math.min(stasiun.length - 1, i)), true),
    aksi: () => { if (nearSt && !dlg) lakukan(stasiun[aktif]); },
    pergi: () => btnPergi.click(),
    tutup: () => tutupDialog(),
    lewatiMuat: () => selesaiMuat(),
  };
})();
