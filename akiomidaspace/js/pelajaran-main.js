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

  /* ---------- judul & asal penjuru dari URL ---------- */
  const qs = new URLSearchParams(window.location.search);
  const topik = P1.topikById(qs.get('id') || '');
  if (!topik) { window.location.replace('kamp-angka-dunia.html'); return; }
  const kat = P1.KATEGORI[topik.k - 1];
  const cerita = CER.untuk(topik);
  document.title = topik.judul + ' | Pintu 1 — Perpustakaan Matematika';

  // asal penjuru untuk tombol kembali (fallback: penjuru judul ini)
  const asalK = parseInt(qs.get('k') || '', 10);
  const asalHal = parseInt(qs.get('hal') || '', 10);
  const asal = (asalK >= 1 && asalK <= P1.KATEGORI.length)
    ? { k: asalK, hal: (asalHal >= 0 && asalHal <= Math.ceil(P1.KATEGORI[asalK - 1].jumlah / 4) - 1) ? asalHal : 0 }
    : { k: topik.k, hal: Math.floor((topik.n - 1) / 4) };
  const TUJU_KAMP = 'kamp-angka-dunia.html?k=' + asal.k + '&hal=' + asal.hal;

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
  const PARTIKEL_OBJEK = { api: 'asap', roket: 'asap', roketKecil: 'asap', pohon: 'daun', tugu: 'kilau', konstelasi: 'kilau', delapanMiring: 'kilau', bintangTerbanyak: 'kilau' };

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
      const lanjut = P1.topikLain(topik.id, 1);
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
      const lanjut = P1.topikLain(topik.id, 1);
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
