(function () {
  'use strict';

  const K = window.KAMP, P1 = window.P1, CER = window.CERITA;
  const { P, teksPx, lingkaran } = K.gambar;
  const W = K.W, H = K.H, GROUND = K.GROUND;

  const qs = new URLSearchParams(window.location.search);
  const idAwal = qs.get('id') || '';
  const apakahP3 = idAwal.indexOf('p3-') === 0 && window.P3;
  const apakahP2 = !apakahP3 && idAwal.indexOf('p2-') === 0 && window.P2;
  const DATA = apakahP3 ? window.P3 : (apakahP2 ? window.P2 : P1);
  const DUNIA_ASAL = apakahP3 ? 'pegunungan-pola-dunia.html'
    : (apakahP2 ? 'hutan-simbol-dunia.html' : 'kamp-angka-dunia.html');
  const NAMA_PINTU = apakahP3 ? 'Pintu 3' : (apakahP2 ? 'Pintu 2' : 'Pintu 1');
  const topik = DATA.topikById(idAwal);
  if (!topik) { window.location.replace(DUNIA_ASAL); return; }
  const kat = DATA.KATEGORI[topik.k - 1];
  const cerita = CER.untuk(topik);
  document.title = topik.judul + ' | ' + NAMA_PINTU + ' — Perpustakaan Matematika';

  const asalK = parseInt(qs.get('k') || '', 10);
  const asalHal = parseInt(qs.get('hal') || '', 10);
  const asal = (asalK >= 1 && asalK <= DATA.KATEGORI.length)
    ? { k: asalK, hal: (asalHal >= 0 && asalHal <= Math.ceil(DATA.KATEGORI[asalK - 1].jumlah / 4) - 1) ? asalHal : 0 }
    : { k: topik.k, hal: Math.floor((topik.n - 1) / 4) };
  const TUJU_KAMP = DUNIA_ASAL + '?k=' + asal.k + '&hal=' + asal.hal;

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

  const ST_X_MULAI = 45, ST_X_AKHIR = 425;
  const stasiun = cerita.stasiun.map((s, i) => ({
    ...s,
    x: Math.round(ST_X_MULAI + (ST_X_AKHIR - ST_X_MULAI) * i / (cerita.stasiun.length - 1)),
  }));
  const NPC = cerita.npc || { glif: 'i', ucap: ['Ikuti jejak', 'bercahaya!'] };
  const NPC_X = 88;

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

  const LANGKAH_SKALA = [1, 1.15, 1.3, 1.5];
  let idxSkala = 0;
  try {
    const s = parseInt(localStorage.getItem('akio-skala') || '0', 10);
    if (s >= 0 && s < LANGKAH_SKALA.length) idxSkala = s;
  } catch (e) {  }
  function terapSkala() {
    document.documentElement.style.setProperty('--skala', LANGKAH_SKALA[idxSkala]);
    try { localStorage.setItem('akio-skala', String(idxSkala)); } catch (e) {  }
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

  function tandaiSelesai(idt) {
    try { localStorage.setItem('cerita-selesai-' + idt, '1'); } catch (e) {  }
  }
  function selesai(idt) {
    try { return localStorage.getItem('cerita-selesai-' + idt) === '1'; } catch (e) { return false; }
  }

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
    muatSlot.appendChild(slot);
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

  let aktif = 0;
  let dlg = null;
  const player = { x: 20, y: GROUND, vx: 0, dir: 1, state: 'diam', walkT: 0, target: null, tuju: null, squash: 0 };

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
    pasarSenja: { glif: ['x', '+3', '7'], awan: '#ffe2c4', awan2: '#ffd9b0' },
    dermagaIkan: { glif: ['x', '3', '4'], awan: '#e8f6f8', awan2: '#d8eef2' },
    kandangPagi: { glif: ['2x', '5', '10'], awan: '#fff2d8', awan2: '#ffe8c4' },
    tokoRoti: { glif: ['2x', '+3', '11'], awan: '#ffe8c8', awan2: '#ffdcb4' },
    tamanJungkit: { glif: ['3x', 'x', '4'], awan: '#eafaf0', awan2: '#d8f2e2' },
    mejaKoreksi: { glif: ['=', '11', '4'], awan: null, awan2: null },
    gerbangWahana: { glif: ['>', '<', 'x'], awan: '#e8f8f4', awan2: '#d4f0ea' },
    landasanLampu: { glif: ['x>3', '3', '4'], awan: null, awan2: null },
    kiosEs: { glif: ['<', '9', '4'], awan: '#ffe8e0', awan2: '#ffd8cc' },
    balaiTimbangan: { glif: ['x', '?', '!'], awan: null, awan2: null },
    dapurJus: { glif: ['2:3', '2', '3'], awan: '#ffe2c4', awan2: '#ffd9b0' },
    menaraPeta: { glif: ['1:1000', '5', '5000'], awan: '#e8f6fa', awan2: '#d8eef6' },
    kiosPermen: { glif: ['6', '3000', '500'], awan: '#ffe4ec', awan2: '#ffdde6' },
    dapurKue: { glif: ['2:3', '4', '6'], awan: null, awan2: null },
    lintasanLari: { glif: ['60', '120', '180'], awan: '#e8f8f4', awan2: '#d8f2ea' },
    kotakDonat: { glif: ['3:4', '75%', '8'], awan: '#f8e4d8', awan2: '#f0d8ca' },
    tokoMiniatur: { glif: ['1:24', '20', '480'], awan: '#ffe8c8', awan2: '#ffdcb4' },
    sumurDesa: { glif: ['4', '6', '24'], awan: '#eafaf0', awan2: '#d8f2e2' },
    dapurWarung: { glif: ['2', '1', '8'], awan: null, awan2: null },
    petaKarun: { glif: ['?', '24', '!'], awan: null, awan2: null },
    gerbangSiku: { glif: ['30', '90', '120'], awan: '#f8e4c4', awan2: '#f0dab4' },
    jembatanRata: { glif: ['180', '110', '70'], awan: '#e0f2fa', awan2: '#d4eaf4' },
    putaranKincir: { glif: ['360', '90', '4x'], awan: '#e6f6ee', awan2: '#d8f0e4' },
    mejaKertas: { glif: ['3', '180', '!'], awan: null, awan2: null },
    jendelaRumah: { glif: ['90', '180', '360'], awan: '#ffe0c0', awan2: '#f8d4b0' },
    relKereta: { glif: ['Z', '=', 'Z'], awan: '#e8f0f6', awan2: '#dce8f0' },
    lantaiUbin: { glif: ['9', '16', '25'], awan: '#eef6fc', awan2: '#e2f0f8' },
    bengkelMeja: { glif: ['3', '4', '5'], awan: '#f8e6c0', awan2: '#f0dcb0' },
    dindingTangga: { glif: ['6', '8', '10'], awan: null, awan2: null },
    balaiGeometri: { glif: ['45', '90', '180'], awan: null, awan2: null },
    mejaKado: { glif: ['6', '9', '27'], awan: '#fdeec8', awan2: '#f8e4b4' },
    lantaiJaring: { glif: ['6x4', '24', '88'], awan: '#eef8d8', awan2: '#e2f2ca' },
    dapurSusun: { glif: ['6', '4', '48'], awan: '#ffe2c4', awan2: '#f8d4ac' },
    atapPrisma: { glif: ['12', '10', '120'], awan: '#ffd9b0', awan2: '#f8ccb4' },
    rakKaleng: { glif: ['44', '14', '22/7'], awan: '#e4f2fa', awan2: '#d8eaf4' },
    bengkelGulung: { glif: ['44', '10', '440'], awan: null, awan2: null },
    bukitPasir: { glif: ['1', '2', '3'], awan: '#fbeed4', awan2: '#f4e4c0' },
    mejaLiter: { glif: ['10', '1000', '1L'], awan: '#e0f4fa', awan2: '#d4ecf6' },
    tokoAkuarium: { glif: ['50', '30', '60L'], awan: '#ffd8b0', awan2: '#f4c8a4' },
    gudangKardus: { glif: ['8', '27', '64'], awan: null, awan2: null },
    pertigaanNol: { glif: ['x', 'y', '0'], awan: '#e6f6ee', awan2: '#d8f0e4' },
    tanggaTitik: { glif: ['(3,2)', '3', '2'], awan: '#fdeec8', awan2: '#f8e4b4' },
    bazarEmpatPojok: { glif: ['4', '+', '-'], awan: '#ffd9b0', awan2: '#f8ccb4' },
    galeriTitik: { glif: ['(2,5)', '(-3,4)', '(0,-2)'], awan: null, awan2: null },
    arsipBenang: { glif: ['y', '2x', '6'], awan: '#eef8d8', awan2: '#e2f2ca' },
    jalanTanjak: { glif: ['2/1', '1/1', '!'], awan: '#e8f4fc', awan2: '#dceef8' },
    papanPerjalanan: { glif: ['km', 't', '!'], awan: null, awan2: null },
    gerbangAwal: { glif: ['x=0', '0', '4'], awan: '#ffd9b0', awan2: '#f8ccb4' },
    tamanBenderaX: { glif: ['X', '(5,3)', '!'], awan: '#e4f6d8', awan2: '#daf0cc' },
    menaraSinyal: { glif: ['5', '?', '!'], awan: null, awan2: null },
    kandangData: { glif: ['7', '5', '?'], awan: '#e8f4e0', awan2: '#dcf0d4' },
    mejaGelasRata: { glif: ['3', '4', '5'], awan: '#e4f6fa', awan2: '#d8f0f4' },
    susunBatuSore: { glif: ['4', '6', '100'], awan: '#ffd9b0', awan2: '#f8ccb4' },
    rakSandalSiang: { glif: ['5', '3', '1'], awan: '#fdeec8', awan2: '#f8e4b4' },
    lapanganBatang: { glif: ['6', '3', '9'], awan: '#eef8d8', awan2: '#e2f2ca' },
    mejaSuhuSore: { glif: ['20', '28', '22'], awan: '#ffd8b0', awan2: '#f4c8a4' },
    mejaKueMalam: { glif: ['40%', '30', '3'], awan: null, awan2: null },
    geraiTabelPasar: { glif: ['4x3', 'r', 'k'], awan: '#e0f4fa', awan2: '#d4ecf6' },
    duaLadangRentang: { glif: ['7', '2', '12'], awan: '#e6f6ee', awan2: '#d8f0e4' },
    balaiRisetMalam: { glif: ['3', '5', '10'], awan: null, awan2: null },
    gerbangKemungkinan: { glif: ['0', '1', '?'], awan: '#e2f2ee', awan2: '#d6ece6' },
    lapanganKoin: { glif: ['A', 'G', '!'], awan: '#e8f4e0', awan2: '#dcf0d4' },
    mejaUlarTangga: { glif: ['6', '1/6', '!'], awan: null, awan2: null },
    puncakPasti: { glif: ['1', '0', '!'], awan: '#ffd9b0', awan2: '#f8ccb4' },
    festivalRoda: { glif: ['3/4', '1/4', '!'], awan: '#fdeec8', awan2: '#f8e4b4' },
    kiosKelereng: { glif: ['3', '1', '?'], awan: '#e4f6fa', awan2: '#d8f0f4' },
    kelasPecahan: { glif: ['2/6', '4/6', '=1'], awan: '#eef8d8', awan2: '#e2f2ca' },
    terasDuaKoin: { glif: ['A', 'G', '4'], awan: '#ffd8b0', awan2: '#f4c8a4' },
    terasMendung: { glif: ['4/5', '!', '?'], awan: '#d8e4ec', awan2: '#ccd8e4' },
    balaiPeluang: { glif: ['1/2', '1/6', '1/4'], awan: null, awan2: null },
    bengkelMesin: { glif: ['f', 'x', '2'], awan: '#fffdf2', awan2: '#f5ecd4' },
    mejaMesinPintar: { glif: ['x', 'f(x)', '?'], awan: '#fffdf2', awan2: '#e8f4fa' },
    papanAturanMesin: { glif: ['x2', '3', '6'], awan: '#ffe2c4', awan2: '#ffd9b0' },
    arsipTabel: { glif: ['1', '3', 'x'], awan: null, awan2: null },
    lapanganKisi: { glif: ['(2,4)', 'x', 'y'], awan: '#fffdf2', awan2: '#e8f4fa' },
    jalanLurusNaik: { glif: ['2x', '+1', 'y'], awan: '#fffdf2', awan2: '#e8f4fa' },
    jembatanBergelombang: { glif: ['naik', 'turun', 'y'], awan: '#ffe2c4', awan2: '#ffd9b0' },
    halamanLempar: { glif: ['x2', '1', '4'], awan: '#fffdf2', awan2: '#e8f4fa' },
    posGrafik: { glif: ['x', 'y', '!'], awan: null, awan2: null },
    balaiMesin: { glif: ['f', '?', '!'], awan: null, awan2: null },
    padangBarisan: { glif: ['2', '4', '6'], awan: '#f2f8e4', awan2: '#e6f0d4' },
    tanggaTambah: { glif: ['+3', '5', '8'], awan: '#eef8f2', awan2: '#e0f0e6' },
    ladangGandakan: { glif: ['1', '2', '4'], awan: null, awan2: null },
    menaraSuku: { glif: ['3n+1', 'n', '301'], awan: null, awan2: null },
    apiUnggunPasangan: { glif: ['101', '50', '5050'], awan: null, awan2: null },
    ladangBijiDua: { glif: ['1+2', '4', '8'], awan: '#f0f8e4', awan2: '#e4f0d4' },
    halamanKursiSegitiga: { glif: ['1', '3', '6'], awan: '#fdeec8', awan2: '#f8e4b4' },
    kebunPetakKuadrat: { glif: ['1', '4', '9'], awan: '#eef8e0', awan2: '#e2f0d0' },
    tamanPolaSenja: { glif: ['5', '7', '4'], awan: '#ffd9b0', awan2: '#f8ccb4' },
    puncakPolaMalam: { glif: ['20', '22', '?'], awan: null, awan2: null },
    bengkelPangkat: { glif: ['2', '8', 'x3'], awan: '#fdeec8', awan2: '#f8e4b4' },
    mejaLipatKertas: { glif: ['2', '4', 'x2'], awan: '#fffdf2', awan2: '#e8f4fa' },
    tamanBentukPangkat: { glif: ['3x3', '9', '8'], awan: '#ffd9b0', awan2: '#f8ccb4' },
    jalanPulangAkar: { glif: ['7x7', '49', '7'], awan: '#ffd9b0', awan2: '#f8c8a8' },
    kantorDetektifLog: { glif: ['log2', '8', '3'], awan: null, awan2: null },
    tanggaPangkatDuaArah: { glif: ['2', '1', '1/2'], awan: '#fdeec8', awan2: '#f8e4b4' },
    rumahKacaTumbuh: { glif: ['1', '2', '4'], awan: '#eef8e0', awan2: '#e2f0d0' },
    lapanganBolaSenja: { glif: ['100', '50', '25'], awan: '#ffd9b0', awan2: '#f8c8a8' },
    observatoriumAngka: { glif: ['x10', '22', '4'], awan: null, awan2: null },
    puncakTanggaPangkat: { glif: ['2x2', '32', '?'], awan: null, awan2: null },
    lapanganPapanSkor: { glif: ['4', '7', '9'], awan: '#fdeec8', awan2: '#f8e4b4' },
    lorongPenginapan: { glif: ['2', '3', '8'], awan: '#fffdf2', awan2: '#e8f4fa' },
    mejaPiknikSejawat: { glif: ['2+1', '3', '5'], awan: '#ffd9b0', awan2: '#f8ccb4' },
    dapurResepGanda: { glif: ['x2', '6', '8'], awan: '#fdeec8', awan2: '#f8e4b4' },
    pelataranBarisKolom: { glif: ['1x5', '2x7', '19'], awan: '#fffdf2', awan2: '#e8f4fa' },
    berandaDuaKakak: { glif: ['7', '1', '4+3'], awan: '#ffd9b0', awan2: '#f8ccb4' },
    persimpanganDuaJalan: { glif: ['2x', 'x+2', '(2,4)'], awan: '#ffd9b0', awan2: '#f8c8a8' },
    kelasRaporGunung: { glif: ['8', '9', '24'], awan: '#fffdf2', awan2: '#e8f4fa' },
    gudangTigaKotak: { glif: ['A', 'B', 'C'], awan: null, awan2: null },
    puncakPapanAngka: { glif: ['23', '4+3', '?'], awan: null, awan2: null },
    padangSegitiga: { glif: ['3-4-5', 'siku', '5'], awan: '#fdeec8', awan2: '#f8e4b4' },
    lorongTanggaSandar: { glif: ['4/2', '0,5', '2'], awan: '#fffdf2', awan2: '#e8f4fa' },
    menaraSisiMiring: { glif: ['4/5', '0,8', '0,6'], awan: '#ffd9b0', awan2: '#f8c8a8' },
    pelataranMiniatur: { glif: ['6-8-10', '9-12-15', 'rasio'], awan: '#fffdf2', awan2: '#e8f4fa' },
    kebunBayangan: { glif: ['45', '2=2', '12'], awan: '#ffd9b0', awan2: '#f8ccb4' },
    tamanAyunan: { glif: ['ayun', '3', '0'], awan: '#fdeec8', awan2: '#f8e4b4' },
    bukitRodaRaksasa: { glif: ['0-10', '10', '0'], awan: null, awan2: null },
    gerbangTigaSudut: { glif: ['30', '45', '60'], awan: '#fdeec8', awan2: '#f8e4b4' },
    kolamRiakMalam: { glif: ['4', '2', '6'], awan: null, awan2: null },
    puncakPengukurJauh: { glif: ['0,8', '0,6', 'ukur'], awan: null, awan2: null },
    padangDuaPanah: { glif: ['5', '5', '10'], awan: '#fdeec8', awan2: '#f8e4b4' },
    jalanRumahSekolah: { glif: ['4', '3', '5'], awan: '#fffdf2', awan2: '#e8f4fa' },
    lorongPanahSambung: { glif: ['+3', '+2', '5'], awan: '#eef8e0', awan2: '#e2f0d0' },
    lapanganPanahKembar: { glif: ['3', '-3', '0'], awan: '#fffdf2', awan2: '#e8f4fa' },
    tamanKisiKotak: { glif: ['(3,2)', 'x', 'y'], awan: '#eef8e0', awan2: '#e2f0d0' },
    dermagaPerahuSungai: { glif: ['arus', '4', '5'], awan: '#fffdf2', awan2: '#e8f4fa' },
    alunKotaBurung: { glif: ['x', 'y', 'z'], awan: null, awan2: null },
    menaraTanggaTiga: { glif: ['2', '2', '3'], awan: '#ffd9b0', awan2: '#f8ccb4' },
    galeriTigaPandangan: { glif: ['depan', 'atas', 'samping'], awan: '#fffdf2', awan2: '#e8f4fa' },
    puncakLintasLembah: { glif: ['arah', 'siku', '?'], awan: null, awan2: null },
    lorongLangkahSetengah: { glif: ['1/2', '1/4', '1/8'], awan: '#fdeec8', awan2: '#f8e4b4' },
    ladangSembilanMenempel: { glif: ['0,9', '0,99', '1'], awan: '#fffdf2', awan2: '#e8f4fa' },
    stasiunKeretaNilai: { glif: ['1,9', '2,9', '3'], awan: '#ffd9b0', awan2: '#f8ccb4' },
    kebunAsimtot: { glif: ['x', '1/x', '0'], awan: '#eef8e0', awan2: '#f4f0d8' },
    bengkelTaliHalus: { glif: ['1', '0,5', '0,125'], awan: '#fffdf2', awan2: '#e8f4fa' },
    bukitTanggaLandai: { glif: ['0,5', '0,25', '0,1'], awan: '#ffe0b8', awan2: '#f8d4a8' },
    lintasanKilasLari: { glif: ['10', '5', '2'], awan: '#fdeec8', awan2: '#f8e4b4' },
    telagaBijiMenipis: { glif: ['1/2', '1/100', '0'], awan: null, awan2: null },
    bengkelPoligonBulat: { glif: ['6', '12', '96'], awan: '#fffdf2', awan2: '#e8f4fa' },
    puncakTepiMenuju: { glif: ['?', '1', '0'], awan: null, awan2: null },
    tamanKeranAir: { glif: ['3', '6', '1'], awan: '#fff3d8', awan2: '#e8f4fa' },
    jalanRayaKilometer: { glif: ['40', '60', '80'], awan: '#fffdf2', awan2: '#e8f4fa' },
    galeriGarisSinggung: { glif: ['1', '0', 'tumpu'], awan: '#eef8e0', awan2: '#f4f0d8' },
    bengkelMesinPangkat: { glif: ['x2', '2x', '?'], awan: '#fffdf2', awan2: '#e8f4fa' },
    jalanBukitPanah: { glif: ['+2', '0', '-2'], awan: '#ffe0b8', awan2: '#f8d4a8' },
    tamanAirMancur: { glif: ['0', '4', '0'], awan: '#e8f4fa', awan2: '#fffdf2' },
    tanggaLajuPercepatan: { glif: ['1', '4', '9'], awan: '#fdeec8', awan2: '#f8e4b4' },
    lembahSenyumU: { glif: ['-4', '0', 'U'], awan: '#fffdf2', awan2: '#e8f4fa' },
    jalanMotorSore: { glif: ['5', '10', '15'], awan: '#ffd9b0', awan2: '#f8ccb4' },
    ladangUbinKotak: { glif: ['12 ubin', '1+2+3', 'susun'], awan: '#fff3d8', awan2: '#e8f4fa' },
    tamanKertasBerpetak: { glif: ['y=x', '6 penuh', '8 petak'], awan: '#fffdf2', awan2: '#e8f4fa' },
    bengkelIrisanTipis: { glif: ['6 dan 10', '7 dan 9', 'menuju 8'], awan: '#fff3d8', awan2: '#f8e4b4' },
    lorongBolakBalik: { glif: ['laju 5', '4 detik', '20 m'], awan: '#ffd9b0', awan2: '#f8ccb4' },
    tamanLengkungBatu: { glif: ['x^2', '5 dan 14', 'tepat 9'], awan: '#fff3d8', awan2: '#e8f4fa' },
    jalanKurirGrafik: { glif: ['laju 2', '10 detik', 'jarak 20'], awan: '#fffdf2', awan2: '#e8f4fa' },
    menaraTintaHuruf: { glif: ['huruf S', 'summa', '1675'], awan: null, awan2: null },
    guaTetesEmber: { glif: ['2 mL', '1000 mL', 'detik 500'], awan: null, awan2: null },
    kebunTerasering: { glif: ['9 per 3', '3 tingkat', '9 per 2'], awan: '#ffe0b8', awan2: '#f8d4a8' },
    lembahLuasMalam: { glif: ['6 kotak', 'luas 9', '20 & 500'], awan: null, awan2: null },
    puncakLerengCuram: { glif: ['?', '0', 'juara'], awan: null, awan2: null },
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
    pasarSenja: { jenis: 'drift', warna: '#ffd166', y: [186, 240], n: 9 },
    dermagaIkan: { jenis: 'kilau', warna: '#d0f4ff', y: [150, 184], n: 10 },
    kandangPagi: { jenis: 'drift', warna: '#ffe9a3', y: [186, 240], n: 9 },
    tokoRoti: { jenis: 'naik', warna: '#ffe9a3', y: [60, 244], n: 8 },
    tamanJungkit: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    mejaKoreksi: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 180], n: 14 },
    gerbangWahana: { jenis: 'kedip', warna: '#ffd166', y: [16, 180], n: 14 },
    landasanLampu: { jenis: 'kedip', warna: '#d8e8ff', y: [16, 200], n: 20 },
    kiosEs: { jenis: 'kilau', warna: '#d8f0fa', y: [186, 240], n: 8 },
    balaiTimbangan: { jenis: 'kedip', warna: '#ffd166', y: [16, 200], n: 18 },
    dapurJus: { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 9 },
    menaraPeta: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    kiosPermen: { jenis: 'jatuh', warna: '#ffb8d8', y: [16, 244], n: 10 },
    dapurKue: { jenis: 'naik', warna: '#ffe9a3', y: [60, 244], n: 8 },
    lintasanLari: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    kotakDonat: { jenis: 'drift', warna: '#ffd9c4', y: [186, 240], n: 9 },
    tokoMiniatur: { jenis: 'kilau', warna: '#ffe9a3', y: [186, 240], n: 7 },
    sumurDesa: { jenis: 'drift', warna: '#d8f0fa', y: [150, 240], n: 8 },
    dapurWarung: { jenis: 'naik', warna: '#fff3cf', y: [60, 244], n: 8 },
    petaKarun: { jenis: 'kedip', warna: '#ffd166', y: [16, 200], n: 16 },
    gerbangSiku: { jenis: 'drift', warna: '#ffe9a3', y: [186, 240], n: 9 },
    jembatanRata: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    putaranKincir: { jenis: 'drift', warna: '#d8f2e2', y: [186, 240], n: 8 },
    mejaKertas: { jenis: 'jatuh', warna: '#f5ecd4', y: [16, 244], n: 10 },
    jendelaRumah: { jenis: 'naik', warna: '#ffd9a3', y: [60, 244], n: 9 },
    relKereta: { jenis: 'drift', warna: '#e8dcc8', y: [186, 240], n: 9 },
    lantaiUbin: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 8 },
    bengkelMeja: { jenis: 'naik', warna: '#e8dcc8', y: [100, 244], n: 8 },
    dindingTangga: { jenis: 'kedip', warna: '#d0d8e8', y: [16, 140], n: 20 },
    balaiGeometri: { jenis: 'kedip', warna: '#ffd166', y: [16, 200], n: 16 },
    mejaKado: { jenis: 'kilau', warna: '#ffe9a3', y: [186, 240], n: 8 },
    lantaiJaring: { jenis: 'drift', warna: '#e8dca0', y: [186, 240], n: 9 },
    dapurSusun: { jenis: 'naik', warna: '#fff3cf', y: [100, 244], n: 8 },
    atapPrisma: { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 9 },
    rakKaleng: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    bengkelGulung: { jenis: 'kedip', warna: '#ffd166', y: [16, 200], n: 14 },
    bukitPasir: { jenis: 'jatuh', warna: '#f5e8c8', y: [16, 244], n: 10 },
    mejaLiter: { jenis: 'naik', warna: '#d8f0fa', y: [60, 244], n: 8 },
    tokoAkuarium: { jenis: 'naik', warna: '#a5d8ff', y: [60, 244], n: 9 },
    gudangKardus: { jenis: 'kedip', warna: '#ffd166', y: [16, 200], n: 15 },
    pertigaanNol: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    tanggaTitik: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    bazarEmpatPojok: { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 10 },
    galeriTitik: { jenis: 'kedip', warna: '#cdd9f5', y: [16, 140], n: 22 },
    arsipBenang: { jenis: 'drift', warna: '#ffe9c4', y: [186, 240], n: 8 },
    jalanTanjak: { jenis: 'kilau', warna: '#fffdf2', y: [150, 240], n: 9 },
    papanPerjalanan: { jenis: 'kedip', warna: '#ffd166', y: [16, 200], n: 16 },
    gerbangAwal: { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 9 },
    tamanBenderaX: { jenis: 'jatuh', warna: '#a8e6a0', y: [16, 244], n: 9 },
    menaraSinyal: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 200], n: 16 },
    kandangData: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    mejaGelasRata: { jenis: 'naik', warna: '#d8f0fa', y: [60, 244], n: 8 },
    susunBatuSore: { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 9 },
    rakSandalSiang: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    lapanganBatang: { jenis: 'jatuh', warna: '#ffe9a3', y: [16, 244], n: 9 },
    mejaSuhuSore: { jenis: 'drift', warna: '#ffd8b0', y: [186, 240], n: 9 },
    mejaKueMalam: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 200], n: 15 },
    geraiTabelPasar: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    duaLadangRentang: { jenis: 'drift', warna: '#ffe9c4', y: [186, 240], n: 9 },
    balaiRisetMalam: { jenis: 'kedip', warna: '#cdd9f5', y: [16, 150], n: 20 },
    gerbangKemungkinan: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    lapanganKoin: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    mejaUlarTangga: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 200], n: 16 },
    puncakPasti: { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 9 },
    festivalRoda: { jenis: 'jatuh', warna: '#ff9db8', y: [16, 244], n: 12 },
    kiosKelereng: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    kelasPecahan: { jenis: 'drift', warna: '#ffe9c4', y: [186, 240], n: 9 },
    terasDuaKoin: { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 9 },
    terasMendung: { jenis: 'jatuh', warna: '#a5d8ff', y: [16, 244], n: 14 },
    balaiPeluang: { jenis: 'kedip', warna: '#d8ccf5', y: [16, 150], n: 18 },
    bengkelMesin: { jenis: 'kilau', warna: '#ffe9a3', y: [186, 240], n: 8 },
    mejaMesinPintar: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    papanAturanMesin: { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 9 },
    arsipTabel: { jenis: 'kedip', warna: '#cdd9f5', y: [16, 150], n: 22 },
    lapanganKisi: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    jalanLurusNaik: { jenis: 'kilau', warna: '#fff3cf', y: [186, 240], n: 9 },
    jembatanBergelombang: { jenis: 'drift', warna: '#ffd166', y: [186, 240], n: 10 },
    halamanLempar: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    posGrafik: { jenis: 'kedip', warna: '#fffdf2', y: [16, 150], n: 22 },
    balaiMesin: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 180], n: 14 },
    padangBarisan: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    tanggaTambah: { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 9 },
    ladangGandakan: { jenis: 'drift', warna: '#ffe9c4', y: [186, 240], n: 9 },
    menaraSuku: { jenis: 'kedip', warna: '#cdd9f5', y: [16, 150], n: 22 },
    apiUnggunPasangan: { jenis: 'naik', warna: '#ffb85e', y: [140, 244], n: 12 },
    ladangBijiDua: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    halamanKursiSegitiga: { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 9 },
    kebunPetakKuadrat: { jenis: 'jatuh', warna: '#a8e6a0', y: [16, 244], n: 9 },
    tamanPolaSenja: { jenis: 'drift', warna: '#ffe9c4', y: [186, 240], n: 10 },
    puncakPolaMalam: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 180], n: 16 },
    bengkelPangkat: { jenis: 'kilau', warna: '#fff3cf', y: [186, 240], n: 8 },
    mejaLipatKertas: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 9 },
    tamanBentukPangkat: { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 9 },
    jalanPulangAkar: { jenis: 'drift', warna: '#ffe9c4', y: [186, 240], n: 10 },
    kantorDetektifLog: { jenis: 'kedip', warna: '#cdd9f5', y: [16, 150], n: 22 },
    tanggaPangkatDuaArah: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    rumahKacaTumbuh: { jenis: 'jatuh', warna: '#a8e6a0', y: [16, 244], n: 9 },
    lapanganBolaSenja: { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 10 },
    observatoriumAngka: { jenis: 'kedip', warna: '#fffdf2', y: [16, 150], n: 24 },
    puncakTanggaPangkat: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 180], n: 16 },
    lapanganPapanSkor: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 8 },
    lorongPenginapan: { jenis: 'kedip', warna: '#d0d8e8', y: [16, 140], n: 16 },
    mejaPiknikSejawat: { jenis: 'drift', warna: '#ffe9a3', y: [186, 240], n: 9 },
    dapurResepGanda: { jenis: 'naik', warna: '#fff3cf', y: [60, 244], n: 8 },
    pelataranBarisKolom: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 8 },
    berandaDuaKakak: { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 9 },
    persimpanganDuaJalan: { jenis: 'drift', warna: '#ffd166', y: [186, 240], n: 10 },
    kelasRaporGunung: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    gudangTigaKotak: { jenis: 'kedip', warna: '#ffd166', y: [16, 200], n: 15 },
    puncakPapanAngka: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 180], n: 16 },
    padangSegitiga: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 8 },
    lorongTanggaSandar: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    menaraSisiMiring: { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 10 },
    pelataranMiniatur: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 8 },
    kebunBayangan: { jenis: 'drift', warna: '#ffe9a3', y: [186, 240], n: 9 },
    tamanAyunan: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    bukitRodaRaksasa: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 180], n: 20 },
    gerbangTigaSudut: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 8 },
    kolamRiakMalam: { jenis: 'kedip', warna: '#cdd9f5', y: [16, 150], n: 18 },
    puncakPengukurJauh: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 180], n: 16 },
    padangDuaPanah: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 8 },
    jalanRumahSekolah: { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 9 },
    lorongPanahSambung: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    lapanganPanahKembar: { jenis: 'drift', warna: '#ffe9a3', y: [186, 240], n: 10 },
    tamanKisiKotak: { jenis: 'kilau', warna: '#fffdf2', y: [186, 240], n: 8 },
    dermagaPerahuSungai: { jenis: 'kilau', warna: '#cfe8ff', y: [186, 240], n: 10 },
    alunKotaBurung: { jenis: 'kedip', warna: '#cdd9f5', y: [16, 150], n: 18 },
    menaraTanggaTiga: { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 9 },
    galeriTigaPandangan: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 8 },
    puncakLintasLembah: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 180], n: 16 },
    lorongLangkahSetengah: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 8 },
    ladangSembilanMenempel: { jenis: 'drift', warna: '#ffd9a3', y: [186, 240], n: 9 },
    stasiunKeretaNilai: { jenis: 'kilau', warna: '#ffe9c8', y: [186, 240], n: 10 },
    kebunAsimtot: { jenis: 'drift', warna: '#d8f0c8', y: [186, 240], n: 8 },
    bengkelTaliHalus: { jenis: 'kilau', warna: '#fff4d8', y: [186, 240], n: 7 },
    bukitTanggaLandai: { jenis: 'drift', warna: '#ffe0b0', y: [186, 240], n: 9 },
    lintasanKilasLari: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 10 },
    telagaBijiMenipis: { jenis: 'kedip', warna: '#a8c8ff', y: [16, 180], n: 14 },
    bengkelPoligonBulat: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 9 },
    puncakTepiMenuju: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 180], n: 16 },
    tamanKeranAir: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 9 },
    jalanRayaKilometer: { jenis: 'kilau', warna: '#fff4d8', y: [186, 240], n: 10 },
    galeriGarisSinggung: { jenis: 'drift', warna: '#d8f0c8', y: [186, 240], n: 8 },
    bengkelMesinPangkat: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 9 },
    jalanBukitPanah: { jenis: 'drift', warna: '#ffe0b0', y: [186, 240], n: 9 },
    tamanAirMancur: { jenis: 'kilau', warna: '#e8f4ff', y: [186, 240], n: 10 },
    tanggaLajuPercepatan: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 9 },
    lembahSenyumU: { jenis: 'drift', warna: '#d8e8f0', y: [186, 240], n: 8 },
    jalanMotorSore: { jenis: 'drift', warna: '#ffe0b0', y: [186, 240], n: 9 },
    ladangUbinKotak: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 9 },
    tamanKertasBerpetak: { jenis: 'kilau', warna: '#e8f4ff', y: [186, 240], n: 10 },
    bengkelIrisanTipis: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 9 },
    lorongBolakBalik: { jenis: 'drift', warna: '#ffd8a8', y: [186, 240], n: 9 },
    tamanLengkungBatu: { jenis: 'kilau', warna: '#fff4d8', y: [186, 240], n: 8 },
    jalanKurirGrafik: { jenis: 'kilau', warna: '#fff8e0', y: [186, 240], n: 9 },
    menaraTintaHuruf: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 180], n: 14 },
    guaTetesEmber: { jenis: 'kedip', warna: '#a8e8f0', y: [16, 180], n: 12 },
    kebunTerasering: { jenis: 'drift', warna: '#ffe0b0', y: [186, 240], n: 9 },
    lembahLuasMalam: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 180], n: 16 },
    puncakLerengCuram: { jenis: 'kedip', warna: '#ffe9a3', y: [16, 180], n: 14 },
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
  const PARTIKEL_OBJEK = { api: 'asap', roket: 'asap', roketKecil: 'asap', pohon: 'daun', tugu: 'kilau', konstelasi: 'kilau', delapanMiring: 'kilau', bintangTerbanyak: 'kilau', tekoTuang: 'asap', termometerDidih: 'asap', kotakAjaib: 'kilau', jamRaksasa: 'kilau', lampuFestival: 'kilau', gerbangJuara: 'kilau', kuraLegenda: 'kilau', kunciBalikArah: 'kilau', tiangNolTengah: 'kilau', gerbangLenteraDalam: 'kilau', menaraLiftTambang: 'kilau', stempelLunas: 'kilau', lenteraJurang: 'kilau', termometerGanda: 'kilau', rodaTaliLift: 'kilau', batuKuari: 'asap', paluPecahDua: 'kilau', papanSusunPrima: 'kilau', duaLampionPesta: 'kilau', titikBertemuDuaBelas: 'kilau', papanTanggaBagi: 'kilau', pisauBagiEnam: 'kilau', titianDuaBelas: 'kilau', mejaKasusFaktor: 'kilau', gerbangKoprima: 'kilau', suratTersegelX: 'kilau', kotakKunciMisteri: 'kilau', amplopTerbukaEmpat: 'kilau', barisanKantongLima: 'kilau', kotakGelindingEnam: 'asap', duaPotKaca: 'kilau', isianPotPertama: 'kilau', koinNilaiEmpat: 'kilau', rodaMesinHitung: 'asap', strukHasilSembilan: 'kilau', tanggaKunangEmpat: 'kilau', anakTanggaKeN: 'kilau', papanKurungTerbuka: 'kilau', papanRumusEmpatN: 'kilau', tendaBekalPenuh: 'kilau', petakBungaA: 'daun', petakBungaB: 'daun', ladangTerbaca: 'kilau', papanDuaA3B: 'kilau', menaraLimaMisi: 'kilau', jendelaNilaiHuruf: 'kilau', neracaDagang: 'kilau', timbanganIkan: 'kilau', tigaIkanDiambil: 'kilau', kandangDibukaLima: 'kilau', piringTigaDipindah: 'kilau', jungkatKantong: 'kilau', stempelSahih: 'kilau', buayaTandaLima: 'kilau', panahMenyalaKanan: 'kilau', gelasDuaSatuBatu: 'kilau', balaiLimaMisi: 'kilau', misiDuaSisi: 'kilau', gelasManggaDua: 'kilau', papanDuaTiga: 'kilau', jusKebalik: 'kilau', papanUrutanRasio: 'kilau', mejaPetaGulung: 'kilau', jengkalTunggal: 'kilau', tigaJengkalJalan: 'kilau', papanSkalaSeribu: 'kilau', kantongEnamPermen: 'kilau', notaTigaRibu: 'kilau', permenLimaRatus: 'kilau', papanDuaKios: 'kilau', kartuResepDuaTiga: 'kilau', mangkokGandaEmpat: 'kilau', duaKueSamaRasa: 'kilau', papanProporsiSetia: 'kilau', garisStartKelinci: 'kilau', kelinciEnamPuluh: 'kilau', duaMenitSeratus: 'kilau', papanTempoJarak: 'kilau', kotakDelapanDonat: 'kilau', susunTigaDariEmpat: 'kilau', papanTujuhLima: 'kilau', papanTigaBahasa: 'kilau', rakMobilMainan: 'kilau', penggarisDuaPuluh: 'kilau', mobilJadiRaksasa: 'kilau', papanKaliDuaEmpat: 'kilau', galianEmpatPekerja: 'asap', galianDelapanPekerja: 'asap', papanKaliSilang: 'kilau', papanBerbalikNilai: 'kilau', bukuResepWarung: 'kilau', delapanTamuDatang: 'kilau', semuaIkutGanda: 'kilau', papanTakaranUtuh: 'kilau', petaKarunTerkunci: 'kilau', misiRasioSkala: 'kilau', misiHargaPersen: 'kilau', misiBerbalikPeta: 'kilau', gerbangTerbukaSiku: 'kilau', sikuKayuTukang: 'kilau', pembukaLancipTumpul: 'kilau', papanJenisSudut: 'kilau', dekJembatanLurus: 'kilau', duaSudutBerbagi: 'kilau', sudutSeratusSepuluh: 'kilau', papanSelaluBerdua: 'kilau', kincirPenuh: 'kilau', empatSudutBertemu: 'kilau', sudutSisaKincir: 'kilau', papanPutaranPenuh: 'kilau', segitigaKertasTiga: 'kilau', robekTigaSudut: 'kilau', tempelJadiGaris: 'kilau', papanBuktiRobek: 'kilau', jendelaEmpatSiku: 'kilau', duaSegitigaSahabat: 'kilau', gabungSegiempat: 'kilau', papanDuaKaliSeratus: 'kilau', relSejajarKereta: 'kilau', garisMiringTerpotong: 'kilau', sudutZBerpasangan: 'kilau', papanPolaSejajar: 'kilau', segitigaUbinSiku: 'kilau', kotakSembilanAlas: 'kilau', kotakEnamBelasTinggi: 'kilau', kotakDuaLimaMiring: 'kilau', mejaGoyangEmpat: 'asap', palangDiagonal: 'asap', mejaKokohSiku: 'kilau', papanTigaEmpatLima: 'kilau', tanggaSandingDinding: 'kilau', jarakEnamLangkah: 'kilau', tinggiDelapanPuncak: 'kilau', papanSisiHilang: 'kilau', arenaMisiGeometri: 'kilau', misiBukaanSudut: 'kilau', misiSegitigaPutaran: 'kilau', misiPythagorasHutan: 'kilau', kotakKadoKubus: 'kilau', kartuPersegiEnam: 'kilau', kubusSusunIsi: 'kilau', papanKubusJurus: 'kilau', kardusBalokUtuh: 'kilau', jaringBalokRata: 'kilau', pasangKembarTiga: 'kilau', papanJumlahEnamSisi: 'kilau', laciKosongEnamEmpat: 'kilau', kubusSusuSusun: 'kilau', susunDuaLapis: 'kilau', papanPanjangLebarTinggi: 'kilau', rumahAtapPrisma: 'kilau', kartuSegitigaAlas: 'kilau', geserSegitigaAtap: 'kilau', papanLuasKaliPanjang: 'kilau', kalengSusuRak: 'kilau', duaTutupBundar: 'kilau', benangKelilingEmpat: 'kilau', labelTerbentang: 'kilau', kertasGulungSelimut: 'kilau', gulungDiBotol: 'kilau', papanKelilingTinggi: 'kilau', hitungSelimutEmpat: 'kilau', topiKerucutPasir: 'asap', tabungPasirSama: 'kilau', tuangTigaCangkir: 'asap', bolaSepakTaman: 'kilau', kubusSepuluhSepuluh: 'kilau', botolLiterSatu: 'kilau', gelasBagiEmpat: 'kilau', papanLiterKubik: 'kilau', akuariumTokoSore: 'kilau', ukurAkuariumTigaSisi: 'kilau', emberDuaPuluh: 'kilau', botolSatuSetengah: 'kilau', gudangKardusMalam: 'kilau', misiKardusTigaUkuran: 'kilau', misiKubusMuatKardus: 'kilau', misiTangkiDanKado: 'kilau', patokNolPersimpangan: 'kilau', papanSumbuDuaArah: 'kilau', rumahTitikPertama: 'kilau', papanJalanBertemu: 'kilau', lantaiKotakHalaman: 'kilau', langkahTigaDua: 'kilau', titikTertukarDuaTiga: 'kilau', papanXpuluhanY: 'kilau', alunAlunDuaJalan: 'kilau', lampuEmpatPojok: 'kilau', kiosDaerahSatu: 'kilau', papanTandaKuadran: 'kilau', papanHitamGaleri: 'kilau', kartuAlamatDuaLima: 'kilau', kartuMinusTigaEmpat: 'kilau', kartuNolMinusDua: 'kilau', tabelXyArsip: 'kilau', pakuTigaTitik: 'kilau', benangTertarikLurus: 'kilau', papanGarisLahir: 'kilau', tanggaCuramNaikDua: 'kilau', tanggaLandaiNaikSatu: 'kilau', pendakiDuaJalan: 'asap', papanKemiringanDua: 'kilau', papanWaktuJarakPos: 'kilau', garisDatarBerhenti: 'kilau', garisMiringMelaju: 'kilau', papanCeritaPerjalanan: 'kilau', gerbangSumbuYSenja: 'kilau', titikAwalNolEmpat: 'kilau', garisLewatGerbang: 'kilau', papanRumahAwal: 'kilau', taliGridTaman: 'kilau', petaTamanKertas: 'kilau', benderaXMerah: 'kilau', petiHartaTeralamat: 'asap', menaraSinyalLima: 'kilau', misiTandaiEmpatDua: 'kilau', misiKuadranSinyal: 'kilau', misiGarisTabelAkhir: 'kilau', kandangBurungPagi: 'kilau', papanCatatTujuhHari: 'kilau', barisanAngkaKunjungan: 'kilau', papanPertanyaanSama: 'kilau', gelasTigaBedatinggi: 'kilau', tekoTampungSemua: 'asap', gelasTigaRataEmpat: 'kilau', papanCaraMean: 'kilau', batuLimaBersusun: 'asap', batuKetigaTengah: 'kilau', ujungPergiTengahTetap: 'asap', papanMedianAman: 'kilau', rakSandalSembilan: 'kilau', sandalMerahTumpuk: 'kilau', duaWarnaSisa: 'kilau', papanModusJawara: 'kilau', tongkatPanenTiga: 'kilau', batangPisangSembilan: 'kilau', batangJambuTerpendek: 'kilau', papanBacaSekali: 'kilau', kertasSuhuLimaTitik: 'kilau', garisSuhuNaik: 'kilau', garisSuhuTurun: 'kilau', papanDenyutData: 'kilau', kueBulatPestaMalam: 'kilau', irisanCoklatEmpat: 'kilau', irisanStroberiVanila: 'kilau', papanPenuhSeratus: 'kilau', geraiBuahPagi: 'kilau', rakBarisKolom: 'kilau', papanTabelPanen: 'kilau', papanBacaJudulDulu: 'kilau', ladangKompakTujuh: 'kilau', ladangMenyebarTujuh: 'asap', garisUkurRentang: 'kilau', papanRataSamaBeda: 'kilau', balaiRisetLentera: 'kilau', papanDataLimaHari: 'kilau', misiTotalMeanEnam: 'kilau', misiMedianModus: 'kilau', misiRentangTujuh: 'kilau', gerbangGarisNolSatu: 'kilau', penandaMustahil: 'kilau', penandaPasti: 'kilau', duniaDiAntara: 'kilau', koinLemparKapten: 'kilau', sisiAngkaGambar: 'kilau', papanAdilDua: 'kilau', duaTimSetara: 'kilau', papanUlarTangga: 'kilau', daduEnamSisi: 'kilau', enamKemungkinan: 'kilau', papanMainAdil: 'kilau', matahariTimurPasti: 'kilau', koinBerdiriSulit: 'kilau', garisDuaUjung: 'kilau', papanAntaranya: 'kilau', rodaPutarFestival: 'kilau', irisanMerahLebar: 'kilau', irisanBiruSempit: 'kilau', papanLuasIrisan: 'kilau', kantongKelerengEmpat: 'kilau', kelerengMerahTiga: 'kilau', kelerengBiruSatu: 'kilau', papanTigaPerEmpat: 'kilau', papanSemuaPecahan: 'kilau', kelerengEnamIsi: 'kilau', jumlahSelaluSatu: 'kilau', koinSetengahSetengah: 'kilau', duaKoinLempar: 'kilau', daftarEmpatHasil: 'kilau', hasilCampurDua: 'kilau', papanDaftarDulu: 'kilau', langitAwanGelap: 'kilau', sepuluhLangitLalu: 'kilau', payungSiapSedia: 'kilau', papanBacaTanda: 'kilau', balaiJuaraPeluang: 'kilau', misiKoinDua: 'kilau', misiRodaBiru: 'kilau', misiKelerengLima: 'kilau', misiDuaKoinSeperempat: 'kilau', mesinKotakEmas: 'asap', corongMasukAngka: 'kilau', mulutKeluarEnam: 'kilau', papanMesinTetap: 'kilau', mejaPercobaanPintar: 'kilau', kartuMasukX: 'kilau', kartuKeluarFx: 'kilau', papanBukanKali: 'kilau', mesinGandakanDua: 'asap', tigaMasukEnamKeluar: 'kilau', deretKeluaranTali: 'kilau', papanAturanTetap: 'kilau', mejaTabelDuaKolom: 'kilau', pasanganSatuTiga: 'kilau', pasanganDuaLima: 'kilau', papanSatuTeman: 'kilau', kisiTaliLapangan: 'kilau', patokTitikDuaEmpat: 'kilau', tigaPatokMesin: 'kilau', papanSatuAlamat: 'kilau', jalanMenanjakLurus: 'kilau', titikBerbarisRapi: 'kilau', taliSambungGaris: 'kilau', papanGarisLurus: 'kilau', jembatanNaikTurun: 'kilau', panahMenanjakKanan: 'kilau', panahMenurunKanan: 'kilau', papanGrafikArah: 'kilau', bolaLemparMelengkung: 'kilau', jejakLengkungKertas: 'kilau', lengkungCerminKanan: 'kilau', papanSimetriParabola: 'kilau', papanGrafikEmber: 'kilau', garisNaikKran: 'kilau', garisDatarPenuh: 'kilau', papanBacaCerita: 'kilau', limaLampuMisiMesin: 'kilau', mesinTekaAturan: 'asap', papanTabelTeka: 'kilau', gerbangJuaraLembah: 'kilau', batuBarisEnam: 'kilau', papanJarakSama: 'kilau', jejakLangkahTetap: 'asap', papanRahasiaBarisan: 'kilau', tanggaTambahTiga: 'kilau', papanBedaTetap: 'kilau', batuSukuBerikut: 'kilau', papanCekDuaKali: 'kilau', bijiGandakan: 'daun', tumpukBijiLima: 'kilau', papanLedakanDua: 'kilau', papanSukuKesepuluh: 'kilau', papanTigaNPlusSatu: 'kilau', lompatanRumusCepat: 'asap', lampuSukuSeratus: 'kilau', papanTanpaHitungSatu: 'kilau', apiUnggunCerita: 'asap', kartuPasanganSatuSeratus: 'kilau', papanLimaPuluhPasang: 'kilau', papanHasilLimaNolLima: 'kilau', kotakBijiBaris: 'kilau', papanSatuKurang: 'kilau', gandakanTumpukDua: 'asap', papanRahasiaDuaKali: 'kilau', kursiSusunSegitiga: 'kilau', barisKursiBawah: 'kilau', papanTambahBarisBaru: 'kilau', papanSepuluhKursi: 'kilau', petakSatuSatu: 'daun', petakDuaDua: 'daun', petakTigaTiga: 'daun', papanSisiKaliSisi: 'kilau', bungaKelopakLima: 'daun', papanNadaBerulang: 'kilau', kalenderKabisatEmpat: 'kilau', papanPolaSembunyi: 'kilau', limaApiMisiPuncak: 'asap', tekaBarisanPuncak: 'kilau', papanSukuKeSeratus: 'kilau', gerbangPuncakPola: 'kilau', mesinPangkatTiga: 'asap', papanTulisKaliUlang: 'kilau', kartuPangkatKecil: 'kilau', rakHasilDelapan: 'kilau', kertasLipatPertama: 'kilau', tumpukanLipatDelapan: 'kilau', penggarisTebalTumpuk: 'kilau', papanJalanKeBulan: 'kilau', petakRumputTigaTiga: 'daun', kotakKayuKubik: 'kilau', papanLuasDanIsi: 'kilau', patungBentukSaudara: 'kilau', gerbangRumahEmpatSembilan: 'kilau', jalanLangkahTujuh: 'kilau', papanAkarJalanBalik: 'kilau', lampuPulangPasangan: 'kilau', papanKasusDelapan: 'kilau', kartuSaksiDuaEmpat: 'kilau', lampuJawabanTiga: 'kilau', mejaBerkasLog: 'kilau', anakTanggaNaikPangkat: 'kilau', anakTanggaTurunBagi: 'kilau', pijakanNolSatu: 'kilau', papanLanjutTurunSetengah: 'kilau', cawanKoloniSatu: 'daun', cawanKoloniEmpat: 'daun', papanJamGandakan: 'kilau', papanDenyutSetia: 'kilau', bolaKaretDilepas: 'kilau', garisPantulanLimaPuluh: 'kilau', papanTinggiMenurun: 'kilau', papanKecilTeratur: 'kilau', teleskopArahLangit: 'kilau', papanBintangPuluhDua: 'kilau', penggarisRambutMini: 'kilau', bukuTulisPangkat: 'kilau', limaTanggaMisiPangkat: 'kilau', papanMisiDuaLima: 'kilau', papanMisiTigaEmpat: 'kilau', gerbangJuaraTangga: 'kilau', papanSkorGunung: 'kilau', kotakAngkaBabak: 'kilau', garisBarisKolom: 'kilau', lencanaTertataRapi: 'kilau', lorongPenginapanGunung: 'kilau', pintuKamarLantaiDua: 'kilau', papanUrutanAlamat: 'kilau', kunciTukarAlamat: 'kilau', duaPiringKueSejawat: 'kilau', piringHasilSejawat: 'kilau', kotakUkuranBeda: 'kilau', papanAturanSejawat: 'kilau', papanResepSatuPorsi: 'kilau', resepDigandakanDua: 'kilau', timbanganBahanDobel: 'asap', nampanKueDuaPorsi: 'kilau', barisAnakKiri: 'kilau', kolomAnakKanan: 'kilau', kartuHasilSembilanBelas: 'kilau', papanArahBerbeda: 'kilau', berandaDuaBangku: 'kilau', papanJumlahTujuh: 'kilau', papanSelisihSatu: 'kilau', kueAngkaEmpatTiga: 'kilau', jalanTanjakDuaX: 'kilau', jalanTanggaPlusDua: 'kilau', tiangTitikTemuDuaEmpat: 'kilau', duaJalanSejajarJauh: 'kilau', papanRaporKelasKecil: 'kilau', kotakNilaiTigaAnak: 'kilau', kartuAlamatNilaiSembilan: 'kilau', papanJumlahKolom: 'kilau', tigaKotakHadiahAbc: 'kilau', timbanganPasanganKotak: 'kilau', papanTrikJumlahSemua: 'kilau', lampuIsiTigaKotak: 'kilau', limaPapanMisiAngka: 'kilau', papanMisiAlamatJumlah: 'kilau', papanMisiSapaSistem: 'kilau', gerbangJuaraPapanAngka: 'kilau', gerbangSegitigaRaksasa: 'kilau', dindingTegakLantai: 'kilau', jalanPintasMiring: 'kilau', papanNamaSisi: 'kilau', lorongTigaTangga: 'kilau', papanNaikMaju: 'kilau', tanggaPembagiCuram: 'kilau', gelangCuramAman: 'kilau', menaraTanggaSenja: 'kilau', kartuSinusEmpatLima: 'kilau', kartuCosinusTigaLima: 'kilau', papanKuadratSatu: 'kilau', duaMenaraBanding: 'kilau', papanRasioSetia: 'kilau', tigaUkuranSebaris: 'kilau', kunciSebangun: 'kilau', tongkatBayangan: 'kilau', pohonBayanganDuaBelas: 'kilau', papanPerbandinganBayang: 'kilau', buktiMemukulSama: 'kilau', ayunanTamanBunga: 'kilau', taliNaikTurun: 'kilau', kertasGrafikAyunan: 'kilau', jamAyunanSetia: 'kilau', rodaRaksasaMalam: 'kilau', lampuTepiRoda: 'kilau', papanTinggiLampu: 'kilau', kabinTurunNaik: 'kilau', tigaGerbangSudut: 'kilau', gerbangKembarEmpatLima: 'kilau', gerbangSetengahTigaPuluh: 'kilau', gerbangEnamPuluhTinggi: 'kilau', kolamRiakBulan: 'kilau', kerikilJatuhTengah: 'kilau', puncakKePuncakEmpat: 'kilau', lembahRiakSetia: 'kilau', menaraPengukurMalam: 'kilau', papanMisiSisiTangga: 'kilau', papanMisiBayangMenara: 'kilau', limaPapanMisiJauh: 'kilau', duaPanahBerlawanan: 'kilau', papanBesarArah: 'kilau', patokJarakSepuluh: 'kilau', gerbangArahVektor: 'kilau', jalanZigzagSekolah: 'kilau', panahLurusTikus: 'kilau', segitigaJalanSiku: 'kilau', papanPetunjukPanah: 'kilau', duaPanahBerturut: 'kilau', panahJumlahTunggal: 'kilau', jalurMundurSambung: 'kilau', papanUjungKeUjung: 'kilau', panahKembarSejajar: 'kilau', panahLawanBerbalik: 'kilau', patokKembaliNol: 'kilau', papanAngkaMinus: 'kilau', kisiTaliHalaman: 'daun', kartuVektorTigaDua: 'kilau', kartuVektorDuaTiga: 'kilau', papanUrutanPenting: 'kilau', perahuTepiDermaga: 'kilau', panahArusDeras: 'kilau', pantaiMendaratMiring: 'kilau', papanHitungPaduan: 'kilau', petaKotaDariAtas: 'kilau', menaraTigaLantai: 'kilau', kartuAlamatTigaAngka: 'kilau', burungTerbangAlamat: 'kilau', tanggaTigaArahMenara: 'kilau', liftMenaraTegak: 'asap', papanJarakMiringTiga: 'kilau', lintasanTerbangLurus: 'kilau', susunKubusMeja: 'kilau', fotoDepanBentukL: 'kilau', fotoAtasBentukSudut: 'kilau', fotoSampingBentukSudut: 'kilau', limaPapanMisiPanah: 'kilau', papanMisiPanahArah: 'kilau', papanMisiPanahSambung: 'kilau', gerbangJuaraLintas: 'kilau', tembokCahayaSetengah: 'kilau', papanJejakLangkah: 'kilau', kertasSisaJarang: 'kilau', garisLantaiTotal: 'kilau', tonggakSatuCahaya: 'kilau', tigaPapanSembilan: 'kilau', papanJarakMengecil: 'kilau', lorongMenujuSatu: 'kilau', keretaMenujuPeron: 'asap', papanJadwalDuaArah: 'kilau', titikSepakatTiga: 'kilau', pintuArahCukup: 'kilau', kurvaBatuKebun: 'kilau', papanNilaiKebalikan: 'kilau', pagarAsimtot: 'kilau', bungaDuaSisiPagar: 'daun', taliSatuMeter: 'kilau', guntingEmpatPotong: 'kilau', mistarTotalSatu: 'kilau', gulunganBenangHalus: 'kilau', tanggaDuaAnak: 'kilau', tanggaEmpatAnak: 'kilau', lerengMulusBatu: 'kilau', gerbangKalkulusBukit: 'kilau', lintasanRobotPelari: 'asap', papanJendelaDetik: 'kilau', stopwatchKilas: 'kilau', papanLajuSesaat: 'kilau', telagaBijiPertama: 'kilau', papanPembagiRaksasa: 'kilau', bijiSerbukHalus: 'kilau', permukaanAirTenang: 'kilau', rodaSegiEnam: 'asap', rodaSegiDuaBelas: 'asap', papanKelilingPoligon: 'kilau', rodaLingkaranSempurna: 'kilau', limaPapanMisiMenuju: 'kilau', papanMisiLangkahSembilan: 'kilau', papanMisiPembagiAsimtot: 'kilau', gerbangJuaraMenuju: 'kilau', keranBergantiDeras: 'daun', gelasPengukurAir: 'kilau', papanLajuTigaSaat: 'kilau', jamDetikTaman: 'kilau', papanKilometerEnam: 'kilau', speedometerBergetar: 'kilau', duaMobilRata: 'kilau', jamPerjalananSatu: 'kilau', kurvaBukitHijau: 'kilau', penggarisMenempel: 'kilau', titikTapakCahaya: 'kilau', papanKemiringanSatu: 'kilau', mesinPangkatTurun: 'asap', bolaKuadratLompat: 'kilau', rodaGigiGanjil: 'kilau', papanAturanPangkat: 'kilau', panahNaikHijau: 'kilau', papanBerhentiSesaat: 'kilau', panahTurunMerah: 'kilau', jalanBergelombang: 'kilau', airMancurMelengkung: 'kilau', papanTinggiEmpat: 'kilau', titikPuncakKilau: 'kilau', kolamCipratan: 'kilau', tanggaTigaAnakLaju: 'kilau', papanJarakBola: 'kilau', papanLajuNaikDua: 'kilau', papanPercepatanDua: 'kilau', kurvaSenyumRaksasa: 'kilau', papanLembahNol: 'kilau', titikTerendahKilau: 'kilau', burungLingkarLembah: 'kilau', motorSoreKencang: 'asap', speedometerNaikTetap: 'kilau', papanDetikLima: 'kilau', jalanDesaMelengkung: 'asap', kompasKemiringan: 'kilau', limaPapanMisiLereng: 'kilau', papanPuncakLembah: 'kilau', gerbangJuaraLereng: 'kilau', papanUbinDuaBelas: 'kilau', tumpukanUbinTiga: 'kilau', papanTigaSusun: 'kilau', gerbangJumlahKotak: 'kilau', segitigaKotakPetak: 'kilau', kotakKacaSetengah: 'kilau', papanEnamSetengah: 'kilau', penggarisLuasDelapan: 'kilau', mesinIrisKertas: 'asap', duaPapanTepiKiriKanan: 'kilau', papanKisaranDelapan: 'kilau', timbanganDuaSisiIris: 'kilau', pintuDuaArahLorong: 'kilau', papanLajuLima: 'kilau', papanJarakDuaPuluh: 'kilau', cerminTurunanBalik: 'kilau', lengkungBatuSembilan: 'kilau', kotakTanggaBatuKurva: 'kilau', papanLimaEmpatBelas: 'kilau', papanTepatSembilan: 'kilau', kurirSepedaGrafik: 'kilau', papanLajuKotakDua: 'kilau', layarGrafikLaju: 'kilau', odometerBandingJarak: 'kilau', bukuHurufS: 'kilau', penaBuluhTinta: 'kilau', gulunganSumma: 'kilau', papanTahunTinta: 'kilau', atapTetesanGua: 'kilau', talangKacaMenetes: 'kilau', emberTetesMelebar: 'kilau', papanDetikLimaRatus: 'kilau', teraseringTigaTingkat: 'daun', garisRataKuning: 'kilau', papanLuasSamaRata: 'kilau', papanRataTigaKurva: 'kilau', limaPapanMisiLuas: 'kilau', papanTantanganLuas: 'kilau', papanLembahSembilan: 'kilau', gerbangJuaraLuas: 'kilau', };

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

  let nearSt = false;
  aksiBtn.textContent = 'LIHAT CERITA';

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

    const st = stasiun[aktif];
    nearSt = Math.abs(player.x - (st.x - 18)) < 20 || Math.abs(player.x - st.x) < 26;
    if (nearSt && !dlg) aksiBtn.classList.add('tampil');
    else aksiBtn.classList.remove('tampil');

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

  function gunungSaljuDi(c, apexX, apexY, setW, baseY, col, colSalju) {
    gunungDi(c, apexX, apexY, setW, baseY, col);
    const capB = apexY + Math.round((baseY - apexY) * 0.28);
    for (let y = apexY; y <= capB; y++) {
      const u = (y - apexY) / (baseY - apexY);
      const ww = Math.max(1, Math.round(setW * u));
      P(c, apexX - ww, y, ww * 2 + 1, 1, colSalju);
    }
  }
  function pinusDi(c, warna, warnaGelap) {
    for (let i = 0; i < 12; i++) {
      const tx = 14 + i * 40, ty = 184 + (i % 3) * 2;
      P(c, tx - 1, ty - 2, 2, 5, '#4a3620');
      for (let l = 0; l < 3; l++) {
        const lw = 8 - l * 2;
        P(c, tx - lw, ty - 12 + l * 5, lw * 2 + 1, 5, i % 2 ? warna : warnaGelap);
      }
    }
  }

  function bakarLatar() {
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const c = cv.getContext('2d');

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
      for (let i = 0; i < 12; i++) {
        const gx = (i * 71 + 15) % (W - 16) + 8, gy = 214 + (i * 11) % 20;
        P(c, gx, gy, 1, 4, '#c9b060');
        P(c, gx + 1, gy + 1, 1, 3, '#b8a052');
      }
    }

    else if (TEMA_NAMA === 'malam') {
      P(c, 0, 0, W, 50, '#16224a');
      P(c, 0, 50, W, 45, '#1b2a58');
      P(c, 0, 95, W, 40, '#21336a');
      P(c, 0, 135, W, 25, '#283d7a');
      lingkaran(c, 416, 34, 11, '#f2ecd8');
      lingkaran(c, 421, 31, 9, '#1b2a58');
      lingkaran(c, 416, 34, 14, 'rgba(242,236,216,.12)');
      for (let i = 0; i < 26; i++) {
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
      gunungDi(c, 80, 100, 66, 186, '#e8cf96');
      gunungDi(c, 230, 88, 76, 186, '#ddc183');
      gunungDi(c, 408, 104, 60, 186, '#e8cf96');
      P(c, 0, 150, W, 36, '#e8cf96');
      tanah(c, '#eed79b', '#e2c98b', '#f5e2ae');
      jalan(c, '#d4b26b', '#bd9c58', '#c9a75e', '#e0c784');
      for (let i = 0; i < 3; i++) {
        const px3 = 60 + i * 150;
        P(c, px3, 196, 3, 18, '#8a6a3c');
        P(c, px3 - 6, 194, 6, 2, '#5f8f4f');
        P(c, px3 + 3, 194, 6, 2, '#5f8f4f');
        P(c, px3 - 2, 190, 8, 2, '#6b9f58');
      }
      batuDekor(c);
    }

    else if (TEMA_NAMA === 'kota') {
      P(c, 0, 0, W, 46, '#dfe9ee');
      P(c, 0, 46, W, 46, '#d5e2ea');
      P(c, 0, 92, W, 36, '#ccdae4');
      P(c, 0, 128, W, 24, '#c3d2de');
      for (let i = 0; i < 7; i++) {
        const bx = 20 + i * 68, bw = 34 + (i % 3) * 10, bh = 40 + (i % 2) * 26;
        P(c, bx, 186 - bh, bw, bh, i % 2 ? '#98a7b6' : '#a9b6c4');
        P(c, bx - 3, 186 - bh - 6, bw + 6, 6, i % 2 ? '#a9b6c4' : '#b5c1cd');
        for (let j = 0; j < 3; j++) P(c, bx + 5 + j * 9, 186 - bh + 8, 3, bh - 14, i % 2 ? '#8a99a8' : '#98a7b6');
      }
      P(c, 0, 150, W, 36, '#b5c1cd');
      tanah(c, '#b3bcc7', '#a6b0bc', '#c1cad4');
      jalan(c, '#9fa9b5', '#8d97a3', '#98a2ae', '#b0bac6');
      for (let i = 0; i < 9; i++) {
        const lx = (i * 53) % W;
        P(c, lx, 240, 1, 16, '#8d97a3');
      }
    }

    else if (TEMA_NAMA === 'kayu') {
      const papan = ['#a8763e', '#9d6f3a', '#936736', '#8a5f32'];
      for (let r = 0; r < 4; r++) {
        P(c, 0, r * 44, W, 44, papan[r]);
        P(c, 0, r * 44, W, 2, '#7a5329');
        for (let j = 0; j < 5; j++) P(c, (j * 97 + r * 41) % W, r * 44 + 4, 2, 40, '#8a5f32');
      }
      P(c, 0, 176, W, 10, '#6b4a2c');
      P(c, 40, 118, 92, 5, '#7a5329');
      P(c, 46, 100, 16, 18, '#c98a4b'); P(c, 66, 106, 12, 12, '#8f6238'); P(c, 84, 102, 14, 16, '#b3854a');
      P(c, 348, 118, 92, 5, '#7a5329');
      P(c, 356, 102, 14, 16, '#b3854a'); P(c, 376, 100, 16, 18, '#c98a4b'); P(c, 398, 108, 12, 10, '#8f6238');
      P(c, 0, 186, W, 84, '#c99a5b');
      for (let r = 0; r < 6; r++) P(c, 0, 192 + r * 13, W, 2, '#b3854a');
      for (let j = 0; j < 8; j++) P(c, (j * 61 + 20) % W, 192 + (j % 5) * 13, 2, 13, '#b3854a');
      P(c, 0, 236, W, 24, '#d4ab68');
      P(c, 0, 236, W, 2, '#c09050');
      P(c, 0, 258, W, 2, '#c09050');
    }

    else if (TEMA_NAMA === 'pasar') {
      P(c, 0, 0, W, 46, '#a8e0f5');
      P(c, 0, 46, W, 42, '#98d8f2');
      P(c, 0, 88, W, 40, '#a8e0f5');
      P(c, 0, 128, W, 24, '#b9e8f8');
      lingkaran(c, 430, 28, 11, '#ffe9a3');
      lingkaran(c, 430, 28, 8, '#ffd166');
      const warnaBendera = ['#63c8ff', '#ffd166', '#ff9d9d', '#7dffa8'];
      for (let i = 0; i <= 16; i++) {
        const bx2 = i * 30, by2 = 62 + Math.round(Math.sin(i / 16 * Math.PI) * 8);
        if (i < 16) {
          P(c, bx2, by2 + 2, 30, 1, '#8a6a3c');
          P(c, bx2 + 8, by2 + 3, 8, 7, warnaBendera[i % 4]);
          P(c, bx2 + 8, by2 + 10, 8, 2, warnaBendera[i % 4]);
        }
      }
      for (let i = 0; i < 5; i++) {
        const tx = 30 + i * 95;
        for (let y = 0; y <= 14; y++) {
          const ww = Math.round(y * 0.9);
          P(c, tx - ww, 172 + y, ww * 2 + 1, 1, i % 2 ? '#c98a4b' : '#b3854a');
        }
      }
      tanah(c, '#d3c08e', '#c4b080', '#e0d0a0');
      jalan(c, '#c9b57e', '#b09a64', '#bfa872', '#d9c68e');
      for (let i = 0; i < 8; i++) {
        const cx2 = (i * 113 + 40) % (W - 30) + 15;
        P(c, cx2, 224, 12, 9, '#a3744a');
        P(c, cx2, 224, 12, 2, '#b58a4a');
      }
    }

    else if (TEMA_NAMA === 'malam2') {
      P(c, 0, 0, W, 52, '#141c44');
      P(c, 0, 52, W, 46, '#1a2450');
      P(c, 0, 98, W, 38, '#202c5c');
      P(c, 0, 136, W, 24, '#263468');
      for (let i = 0; i < 28; i++) {
        const sx = (i * 61 + 7) % (W - 10) + 5, sy = 8 + (i * 27) % 136;
        P(c, sx, sy, i % 5 === 0 ? 2 : 1, i % 5 === 0 ? 2 : 1, i % 3 ? '#fffdf2' : '#cdd9f5');
      }
      lingkaran(c, 120, 54, 26, 'rgba(205,217,245,.10)');
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

    else if (TEMA_NAMA === 'future') {
      P(c, 0, 0, W, 52, '#0a1030');
      P(c, 0, 52, W, 48, '#0d1540');
      P(c, 0, 100, W, 40, '#111b52');
      P(c, 0, 140, W, 20, '#152061');
      for (let i = 0; i < 34; i++) {
        const sx = (i * 59 + 11) % (W - 10) + 5, sy = 6 + (i * 31) % 148;
        P(c, sx, sy, i % 6 === 0 ? 2 : 1, i % 6 === 0 ? 2 : 1, i % 3 ? '#fffdf2' : '#8fd0f0');
      }
      lingkaran(c, 64, 8, 24, '#3a6fa8');
      lingkaran(c, 58, 2, 18, '#4a7fc0');
      P(c, 44, 16, 40, 3, '#2f5f92');
      gunungDi(c, 140, 108, 80, 186, '#1c2648');
      gunungDi(c, 380, 118, 70, 186, '#1c2648');
      P(c, 300, 150, 8, 36, '#26314f');
      P(c, 296, 154, 16, 3, '#26314f');
      P(c, 296, 166, 16, 3, '#26314f');
      P(c, 303, 148, 2, 2, '#4fe3c8');
      P(c, 0, 150, W, 36, '#1e2948');
      P(c, 0, 182, W, 88, '#3a4258');
      for (let r = 0; r < 5; r++) P(c, 0, 190 + r * 16, W, 1, '#2e3648');
      for (let i = 0; i < 12; i++) P(c, (i * 41 + 20) % W, 190 + (i % 4) * 16, 2, 1, '#4fe3c8');
      P(c, 0, 236, W, 24, '#333c50');
      P(c, 0, 236, W, 2, '#454f68');
      P(c, 0, 258, W, 2, '#454f68');
      for (let i = 0; i < 10; i++) P(c, (i * 48 + 24) % W, 244 + (i % 3) * 6, 6, 1, '#4fe3c8');
    }

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

    else if (TEMA_NAMA === 'tangga') {
      P(c, 0, 0, W, 40, '#ffdfb0');
      P(c, 0, 40, W, 40, '#ffd9a8');
      P(c, 0, 80, W, 40, '#cfe8f0');
      P(c, 0, 120, W, 32, '#bfe2ee');
      lingkaran(c, 96, 118, 20, '#ffd166');
      lingkaran(c, 96, 118, 15, '#ffe9a3');
      gunungDi(c, 330, 96, 70, 186, '#b8cfde');
      gunungDi(c, 440, 108, 56, 186, '#c6dbe6');
      for (let s = 0; s < 9; s++) {
        const sx = 26 + s * 16, sy = 179 - s * 7, sw = 64 + s * 2;
        P(c, sx, sy, sw, 7, s % 2 ? '#c9b8a0' : '#d4c4ac');
        P(c, sx, sy, sw, 2, '#e4d6c0');
      }
      P(c, 0, 150, W, 36, '#9cc4a8');
      hutanDi(c, '#4a7a56', '#40704c');
      tanah(c, '#8fbf8a', '#7fb07a', '#a0cf98');
      jalan(c, '#d4b890', '#b89a70', '#c8a880', '#e8d0a8');
    }

    else if (TEMA_NAMA === 'fajar') {
      P(c, 0, 0, W, 40, '#ffb87a');
      P(c, 0, 40, W, 44, '#ffa868');
      P(c, 0, 84, W, 40, '#f8a070');
      P(c, 0, 124, W, 26, '#f0b090');
      lingkaran(c, 240, 132, 22, '#ffe9a3');
      lingkaran(c, 240, 132, 16, '#ffd166');
      gunungDi(c, 70, 96, 60, 186, '#c87a5e');
      gunungDi(c, 400, 104, 64, 186, '#d08868');
      for (let y = 0; y <= 34; y++) {
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

    else if (TEMA_NAMA === 'kapal') {
      P(c, 0, 0, W, 46, '#9fe0f8');
      P(c, 0, 46, W, 42, '#8fd8f4');
      P(c, 0, 88, W, 40, '#a8e4f8');
      P(c, 0, 128, W, 24, '#bcecf8');
      lingkaran(c, 430, 30, 11, '#ffe9a3');
      lingkaran(c, 430, 30, 8, '#ffd166');
      P(c, 0, 152, W, 34, '#3aa8c8');
      P(c, 0, 152, W, 2, '#5fc0dc');
      for (let i = 0; i < 12; i++) {
        const wx = (i * 47 + 10) % W, wy = 158 + (i * 7) % 24;
        P(c, wx, wy, 10, 1, i % 2 ? '#6fd0e8' : '#2f98b8');
      }
      P(c, 92, 150, 24, 4, '#8a5f38');
      P(c, 92, 150, 24, 1, '#a3744a');
      P(c, 103, 134, 2, 16, '#5f4426');
      for (let y = 0; y < 14; y++) P(c, 105, 135 + y, Math.round(12 * y / 14) + 1, 1, '#fffdf2');
      P(c, 300, 138, 4, 16, '#8a5f38');
      P(c, 380, 142, 4, 12, '#8a5f38');
      P(c, 0, 186, W, 84, '#c9a875');
      for (let r = 0; r < 5; r++) P(c, 0, 192 + r * 16, W, 2, '#b89058');
      P(c, 0, 236, W, 24, '#d9bc88');
      P(c, 0, 236, W, 2, '#b89058');
      P(c, 0, 258, W, 2, '#b89058');
    }

    else if (TEMA_NAMA === 'panggung') {
      P(c, 0, 0, W, 60, '#2a1a3e');
      P(c, 0, 60, W, 60, '#322050');
      P(c, 0, 120, W, 36, '#3a2860');
      for (let y = 0; y < 150; y++) {
        const lk = 34 + Math.round(Math.sin(y * 0.22) * 3);
        P(c, 0, y, lk, 1, '#8a2838');
        P(c, lk - 4, y, 4, 1, '#a83a4a');
        const ln = 34 + Math.round(Math.sin(y * 0.2 + 2) * 3);
        P(c, W - ln, y, ln, 1, '#8a2838');
        P(c, W - ln, y, 4, 1, '#a83a4a');
      }
      P(c, 0, 0, W, 10, '#6a2030');
      P(c, 0, 10, W, 3, '#8a2838');
      for (let i = 0; i < 3; i++) {
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
      P(c, 0, 186, W, 84, '#7a5a48');
      for (let r = 0; r < 5; r++) P(c, 0, 192 + r * 16, W, 1, '#6a4c3c');
      P(c, 0, 236, W, 24, '#8a6850');
      P(c, 0, 236, W, 2, '#6a4c3c');
      P(c, 0, 258, W, 2, '#6a4c3c');
    }

    else if (TEMA_NAMA === 'jemur') {
      P(c, 0, 0, W, 46, '#a8e4f8');
      P(c, 0, 46, W, 42, '#98dcf4');
      P(c, 0, 88, W, 40, '#b0e8f8');
      P(c, 0, 128, W, 24, '#c4f0fc');
      lingkaran(c, 52, 30, 11, '#ffe9a3');
      lingkaran(c, 52, 30, 8, '#ffd166');
      P(c, 250, 108, 120, 78, '#e8d8c0');
      P(c, 250, 108, 120, 4, '#d4c0a8');
      P(c, 262, 122, 18, 16, '#8fd0e8');
      P(c, 292, 122, 18, 16, '#8fd0e8');
      P(c, 322, 122, 18, 16, '#8fd0e8');
      P(c, 352, 128, 10, 20, '#8a5f38');
      P(c, 0, 160, W, 3, '#c9a763');
      P(c, 0, 176, W, 3, '#c9a763');
      for (let i = 0; i < 12; i++) P(c, 8 + i * 42, 156, 6, 30, '#d9b877');
      P(c, 0, 186, W, 84, '#8fc97e');
      tanah(c, '#8fc97e', '#80b970', '#a0d78e');
      jalan(c, '#c9b57e', '#b09a64', '#bfa872', '#d9c68e');
      bungaDi(c, '#f2b8cc', '#ffd166');
    }

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
      for (let i = 0; i < 3; i++) {
        const lx = 90 + i * 150;
        P(c, lx, 168, 2, 18, '#5f6b7c');
        lingkaran(c, lx + 1, 165, 3, '#ffe9a3');
      }
      tanah(c, '#7fae6e', '#719e60', '#8fbe7e');
      jalan(c, '#c9a763', '#ad8c50', '#b8945a', '#d9bd85');
      bungaDi(c, '#f2b8cc', '#d9c4ff');
    }

    else if (TEMA_NAMA === 'permen') {
      for (let x2 = 0; x2 < W; x2 += 24) {
        P(c, x2, 0, 12, 90, '#ffd9e0');
        P(c, x2 + 12, 0, 12, 90, '#c9f0e0');
        P(c, x2, 90, 12, 96, '#ffe8f0');
        P(c, x2 + 12, 90, 12, 96, '#d9f4ec');
      }
      P(c, 30, 118, 130, 4, '#b89058');
      for (let i = 0; i < 4; i++) {
        const jx = 42 + i * 30;
        P(c, jx - 7, 108, 14, 10, '#f8e8f0');
        P(c, jx - 7, 108, 14, 3, '#ffd166');
        P(c, jx - 6, 114, 12, 4, i % 2 ? '#ff9d9d' : '#8fd0ff');
      }
      P(c, 320, 118, 130, 4, '#b89058');
      for (let i = 0; i < 4; i++) {
        const jx = 332 + i * 30;
        P(c, jx - 7, 108, 14, 10, '#f8e8f0');
        P(c, jx - 7, 108, 14, 3, '#ffd166');
        P(c, jx - 6, 114, 12, 4, i % 2 ? '#7dffa8' : '#bb8fff');
      }
      P(c, 0, 186, W, 84, '#f8d8c0');
      for (let r = 0; r < 4; r++) P(c, 0, 196 + r * 22, W, 2, '#e8c0a8');
      P(c, 0, 236, W, 24, '#ffd0d8');
      P(c, 0, 236, W, 2, '#e8b0c0');
      P(c, 0, 258, W, 2, '#e8b0c0');
      for (let i = 0; i < 8; i++) P(c, (i * 61 + 25) % W, 240 + (i % 3) * 8, 3, 3, ['#ff9d9d', '#7dffa8', '#63c8ff'][i % 3]);
    }

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
      P(c, 0, 186, W, 84, '#c86a4a');
      for (let r = 0; r < 4; r++) P(c, 0, 192 + r * 18, W, 1, '#e8907a');
      for (let i = 0; i < 7; i++) P(c, (i * 73 + 30) % W, 190 + (i % 3) * 18, 12, 1, '#f2f2f2');
      P(c, 0, 236, W, 24, '#b85a3e');
      P(c, 0, 236, W, 2, '#984830');
      P(c, 0, 258, W, 2, '#984830');
      for (let i = 0; i < 10; i++) P(c, (i * 49 + 20) % W, 240 + (i % 3) * 8, 4, 4, '#d87a5a');
    }

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
      lingkaran(c, 80, 158, 20, '#2a7a6e');
      lingkaran(c, 80, 158, 15, '#3a9a84');
      for (let i = 0; i < 5; i++) P(c, 62 + i * 9, 152 + (i % 2) * 7, 6, 1, '#4fc8b0');
      for (let i = 0; i < 6; i++) {
        const bx = 150 + i * 28, by = 166 + (i % 2) * 6;
        lingkaran(c, bx, by, 5, i % 2 ? '#3a6a5e' : '#457a6c');
      }
      tanah(c, '#2a6a58', '#245e4e', '#307a64');
      jalan(c, '#4a7a68', '#3a6556', '#446f60', '#5a8f7c');
      for (let i = 0; i < 8; i++) P(c, (i * 55 + 22) % W, 242 + (i % 3) * 6, 5, 1, '#6fbfa8');
    }

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
      for (let i = 0; i < 7; i++) {
        P(c, 330 + i * 10, 250 - i * 9, 30 - i * 2, 7, i % 2 ? '#e3c58c' : '#d9b877');
      }
      bungaDi(c, '#ffb86b', '#f2b8cc');
    }

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
      P(c, 0, 180, W, 90, '#b8834e');
      for (let r = 0; r < 5; r++) P(c, 0, 188 + r * 17, W, 2, '#a3723f');
      P(c, 0, 180, W, 3, '#e0b070');
      P(c, 96, 128, 4, 52, '#5a4a3a');
      P(c, 88, 122, 20, 6, '#3a3228');
      P(c, 92, 128, 12, 8, '#ffe9a3');
      for (let i = 0; i < 9; i++) P(c, (i * 61 + 18) % W, 196 + (i % 4) * 16, 3, 2, '#8a6a40');
    }

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
      for (let r = 0; r < 3; r++) {
        for (let i = 0; i < 12; i++) P(c, 10 + i * 36, 200 + r * 22, 18, 2, '#f2f8ee');
      }
      P(c, 40, 158, 2, 22, '#8a6a3c');
      P(c, 42, 158, 10, 6, '#ff9d9d');
      P(c, 388, 154, 2, 24, '#8a6a3c');
      P(c, 390, 154, 10, 6, '#63c8ff');
      for (let i = 0; i < 6; i++) P(c, (i * 77 + 25) % W, 240 + (i % 3) * 8, 3, 3, '#6fae52');
    }

    else if (TEMA_NAMA === 'meja') {
      P(c, 0, 0, W, 60, '#f5d9b0');
      P(c, 0, 60, W, 60, '#f0cf9f');
      P(c, 0, 120, W, 66, '#eac694');
      P(c, 60, 34, 52, 40, '#bfe0f2');
      P(c, 60, 34, 52, 2, '#8a5f38');
      P(c, 84, 34, 3, 40, '#8a5f38');
      P(c, 60, 53, 52, 2, '#8a5f38');
      P(c, 300, 34, 52, 40, '#bfe0f2');
      P(c, 300, 34, 52, 2, '#8a5f38');
      P(c, 324, 34, 3, 40, '#8a5f38');
      P(c, 300, 53, 52, 2, '#8a5f38');
      lingkaran(c, 208, 20, 7, '#ffe9a3');
      lingkaran(c, 208, 20, 4, '#ffd166');
      P(c, 207, 0, 2, 12, '#8a5f38');
      P(c, 0, 186, W, 30, '#c9a05e');
      P(c, 0, 186, W, 3, '#e0bd80');
      P(c, 0, 216, W, 54, '#a3763c');
      for (let r = 0; r < 3; r++) P(c, 0, 224 + r * 16, W, 2, '#8a5f30');
      for (let i = 0; i < 6; i++) P(c, (i * 83 + 30) % W, 230 + (i % 3) * 12, 4, 3, '#8a5f30');
    }

    else if (TEMA_NAMA === 'setara') {
      P(c, 0, 0, W, 50, '#cfe0f2');
      P(c, 0, 50, W, 50, '#c2d6ec');
      P(c, 0, 100, W, 44, '#b5cbe4');
      P(c, 0, 144, W, 42, '#a8c0dc');
      P(c, 56, 30, 56, 46, '#e8f2fc');
      P(c, 56, 30, 56, 2, '#7a94b4');
      P(c, 82, 30, 3, 46, '#7a94b4');
      P(c, 56, 52, 56, 2, '#7a94b4');
      lingkaran(c, 306, 44, 10, '#fff3cf');
      lingkaran(c, 306, 44, 7, '#ffe9a3');
      P(c, 286, 96, 90, 3, '#9a7a4a');
      for (let i = 0; i < 4; i++) {
        P(c, 294 + i * 20, 82 + (i % 2) * 4, 8, 12, '#c9a763');
      }
      P(c, 0, 186, W, 30, '#b0c4dc');
      P(c, 0, 186, W, 2, '#9ab0cc');
      P(c, 0, 216, W, 54, '#a4bcc8');
      for (let r = 0; r < 3; r++) P(c, 0, 224 + r * 16, W, 1, '#94acbc');
      for (let i = 0; i < 7; i++) P(c, (i * 67 + 20) % W, 232 + (i % 3) * 10, 3, 2, '#8ca4b8');
    }

    else if (TEMA_NAMA === 'tanduk') {
      P(c, 0, 0, W, 46, '#a8e0f6');
      P(c, 0, 46, W, 42, '#98d8f2');
      P(c, 0, 88, W, 40, '#b2e4f6');
      P(c, 0, 128, W, 24, '#c4ecf8');
      lingkaran(c, 428, 30, 11, '#ffe9a3');
      lingkaran(c, 428, 30, 8, '#ffd166');
      gunungDi(c, 80, 86, 56, 186, '#a0c48a');
      gunungDi(c, 230, 78, 66, 186, '#8fb47a');
      P(c, 148, 128, 3, 14, '#f2f2ee');
      P(c, 144, 124, 4, 4, '#f2f2ee');
      P(c, 140, 120, 4, 4, '#f2f2ee');
      P(c, 151, 124, 4, 4, '#f2f2ee');
      P(c, 155, 120, 4, 4, '#f2f2ee');
      P(c, 322, 124, 3, 16, '#f2f2ee');
      P(c, 318, 120, 4, 4, '#f2f2ee');
      P(c, 314, 116, 4, 4, '#f2f2ee');
      P(c, 325, 120, 4, 4, '#f2f2ee');
      P(c, 329, 116, 4, 4, '#f2f2ee');
      P(c, 0, 150, W, 36, '#90b478');
      tanah(c, '#7cb854', '#6ca848', '#8cc862');
      jalan(c, '#d9c088', '#c2a870', '#c9b076', '#e3cc96');
      bungaDi(c, '#ffd166', '#f2b8cc');
    }

    else if (TEMA_NAMA === 'desa') {
      P(c, 0, 0, W, 40, '#ffd9a3');
      P(c, 0, 40, W, 40, '#f8cd8f');
      P(c, 0, 80, W, 38, '#f2c17d');
      P(c, 0, 118, W, 32, '#eab66e');
      lingkaran(c, 402, 118, 15, '#ffb86b');
      lingkaran(c, 402, 118, 11, '#ff9d4a');
      P(c, 0, 150, W, 36, '#d9a86a');
      for (const hx of [70, 350]) {
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

    else if (TEMA_NAMA === 'kue') {
      P(c, 0, 0, W, 70, '#4a3448');
      P(c, 0, 70, W, 60, '#553d52');
      P(c, 0, 130, W, 56, '#5f465c');
      lingkaran(c, 96, 26, 8, '#ffe9a3');
      lingkaran(c, 96, 26, 5, '#fff3cf');
      P(c, 95, 0, 2, 18, '#3a2a38');
      lingkaran(c, 336, 22, 8, '#ffe9a3');
      lingkaran(c, 336, 22, 5, '#fff3cf');
      P(c, 335, 0, 2, 14, '#3a2a38');
      P(c, 60, 88, 120, 4, '#6a4a2e');
      for (let i = 0; i < 5; i++) {
        P(c, 70 + i * 22, 78, 14, 10, '#f8d8c0');
        lingkaran(c, 77 + i * 22, 78, 7, i % 2 ? '#ff9db8' : '#ffd166');
      }
      P(c, 300, 92, 110, 4, '#6a4a2e');
      for (let i = 0; i < 4; i++) {
        P(c, 310 + i * 24, 80, 16, 12, '#f8d8c0');
        lingkaran(c, 318 + i * 24, 80, 8, i % 2 ? '#a8e8d8' : '#ff9db8');
      }
      P(c, 0, 186, W, 30, '#7a5848');
      P(c, 0, 186, W, 2, '#8f6a56');
      P(c, 0, 216, W, 54, '#684838');
      for (let r = 0; r < 3; r++) P(c, 0, 224 + r * 16, W, 1, '#5a3e30');
      for (let i = 0; i < 8; i++) P(c, (i * 57 + 24) % W, 228 + (i % 3) * 12, 3, 3, ['#ff9db8', '#ffd166', '#a8e8d8'][i % 3]);
    }

    else if (TEMA_NAMA === 'malamdalam') {
      P(c, 0, 0, W, 50, '#0a1830');
      P(c, 0, 50, W, 46, '#0e2040');
      P(c, 0, 96, W, 40, '#132a4e');
      P(c, 0, 136, W, 24, '#183458');
      for (let i = 0; i < 34; i++) {
        const sx = (i * 61 + 7) % (W - 10) + 5, sy = 6 + (i * 25) % 128;
        P(c, sx, sy, i % 4 === 0 ? 2 : 1, i % 4 === 0 ? 2 : 1, i % 3 ? '#fffdf2' : '#a8c4f0');
      }
      lingkaran(c, 420, 32, 10, '#e8eef8');
      lingkaran(c, 424, 29, 8, '#0e2040');
      gunungDi(c, 80, 94, 56, 186, '#0c1e38');
      gunungDi(c, 230, 84, 68, 186, '#102444');
      P(c, 0, 150, W, 36, '#122440');
      tanah(c, '#1a3048', '#162a40', '#203854');
      for (let i = 0; i < 14; i++) {
        const wx = 150 + Math.round(Math.sin(i * 0.8) * 46) + i * 8;
        P(c, wx, 248 - i * 6, 14, 4, '#2e4462');
      }
      for (let i = 0; i < 6; i++) P(c, (i * 71 + 30) % W, 240 + (i % 3) * 7, 4, 2, '#243c58');
    }

    else if (TEMA_NAMA === 'perpus') {
      P(c, 0, 0, W, 74, '#2e2438');
      P(c, 0, 74, W, 58, '#372c44');
      P(c, 0, 132, W, 54, '#403450');
      P(c, 44, 0, 3, 22, '#8a5f38');
      lingkaran(c, 46, 26, 8, '#ffe9a3');
      lingkaran(c, 46, 26, 5, '#fff3cf');
      P(c, 376, 0, 3, 26, '#8a5f38');
      lingkaran(c, 378, 30, 8, '#ffe9a3');
      lingkaran(c, 378, 30, 5, '#fff3cf');
      P(c, 26, 84, 130, 4, '#5a4028');
      for (let i = 0; i < 9; i++) {
        P(c, 32 + i * 13, 66, 10, 18, ['#c86a4a', '#4a8fc8', '#5aa05a', '#c8a03e', '#8a5fc8'][i % 5]);
      }
      P(c, 300, 88, 130, 4, '#5a4028');
      for (let i = 0; i < 9; i++) {
        P(c, 306 + i * 13, 68, 10, 20, ['#5aa05a', '#c8a03e', '#c86a4a', '#8a5fc8', '#4a8fc8'][i % 5]);
      }
      P(c, 0, 186, W, 30, '#4a3a52');
      P(c, 0, 186, W, 2, '#5a4660');
      P(c, 0, 216, W, 54, '#3a2e44');
      for (let r = 0; r < 3; r++) P(c, 0, 224 + r * 16, W, 1, '#332840');
      for (let i = 0; i < 9; i++) P(c, (i * 51 + 20) % W, 230 + (i % 3) * 12, 3, 2, '#6a5478');
    }

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
      lingkaran(c, 240, 244, 44, '#e8d5a8');
      lingkaran(c, 240, 244, 38, '#f2e2b8');
      for (let i = 0; i < 10; i++) P(c, 200 + (i * 17) % 80, 226 + (i % 3) * 9, 2, 1, '#d9c28c');
      bungaDi(c, '#ffb86b', '#f2b8cc');
    }

    else if (TEMA_NAMA === 'kelas') {
      P(c, 0, 0, W, 60, '#dff0d8');
      P(c, 0, 60, W, 60, '#d2e8ca');
      P(c, 0, 120, W, 66, '#c4e0ba');
      P(c, 40, 30, 110, 52, '#8fae7a');
      P(c, 44, 34, 102, 44, '#3a5a48');
      P(c, 52, 42, 24, 2, '#c8dcc8'); P(c, 52, 50, 40, 2, '#c8dcc8');
      P(c, 76, 58, 20, 2, '#c8dcc8'); P(c, 104, 42, 30, 2, '#c8dcc8');
      P(c, 320, 26, 48, 38, '#bfe4f2');
      P(c, 320, 26, 48, 2, '#8fae7a'); P(c, 342, 26, 3, 38, '#8fae7a'); P(c, 320, 44, 48, 2, '#8fae7a');
      P(c, 0, 186, W, 30, '#c9b98a');
      P(c, 0, 186, W, 2, '#b8a878');
      P(c, 0, 216, W, 54, '#bfae80');
      for (let r = 0; r < 3; r++) P(c, 0, 224 + r * 16, W, 1, '#ac9a6c');
      for (let i = 0; i < 6; i++) P(c, (i * 79 + 30) % W, 230 + (i % 3) * 12, 3, 2, '#9a8a5e');
    }

    else if (TEMA_NAMA === 'gudang') {
      P(c, 0, 0, W, 64, '#5a4632');
      P(c, 0, 64, W, 60, '#66523a');
      P(c, 0, 124, W, 62, '#725e42');
      lingkaran(c, 76, 26, 9, '#ffd9a3');
      lingkaran(c, 76, 26, 5, '#fff3cf');
      P(c, 75, 0, 2, 17, '#3a2c1e');
      lingkaran(c, 348, 22, 9, '#ffd9a3');
      lingkaran(c, 348, 22, 5, '#fff3cf');
      P(c, 347, 0, 2, 13, '#3a2c1e');
      for (let i = 0; i < 5; i++) {
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

    else if (TEMA_NAMA === 'tulis') {
      P(c, 0, 0, W, 62, '#2a3450');
      P(c, 0, 62, W, 58, '#313c5c');
      P(c, 0, 120, W, 66, '#38446a');
      P(c, 60, 26, 50, 40, '#8fb8d8');
      lingkaran(c, 92, 40, 6, '#f2ecd8');
      P(c, 60, 26, 50, 2, '#1e2740'); P(c, 84, 26, 3, 40, '#1e2740'); P(c, 60, 45, 50, 2, '#1e2740');
      P(c, 320, 32, 90, 3, '#1e2740');
      for (let i = 0; i < 7; i++) P(c, 326 + i * 12, 16 + (i % 2) * 3, 8, 16, ['#c86a4a', '#4a8fc8', '#5aa05a', '#c8a03e'][i % 4]);
      lingkaran(c, 240, 18, 8, '#ffe9a3');
      lingkaran(c, 240, 18, 5, '#fff3cf');
      P(c, 239, 0, 2, 10, '#1e2740');
      P(c, 0, 186, W, 30, '#3c4868');
      P(c, 0, 186, W, 2, '#2e3854');
      P(c, 0, 216, W, 54, '#445078');
      for (let r = 0; r < 3; r++) P(c, 0, 224 + r * 16, W, 1, '#3a4666');
    }

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
      P(c, 402, 128, 34, 30, '#c9b57e');
      P(c, 399, 122, 40, 6, '#a3875a');
      P(c, 414, 142, 10, 10, '#5f4426');
      P(c, 402, 138, 26, 2, '#8a6a3c');
    }

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
      for (let r = 0; r < 3; r++) {
        for (let i = 0; i < 9; i++)
          P(c, 120 + i * 26 + r * 8, 226 + r * 12, 13, 5, (i + r) % 2 ? '#e86a5a' : '#fffdf2');
      }
      for (let i = 0; i < 9; i++) P(c, (i * 61 + 15) % W, 214 + (i % 3) * 6, 1, 4, '#c9b060');
    }

    else if (TEMA_NAMA === 'kantor') {
      P(c, 0, 0, W, 58, '#4a3a2e');
      P(c, 0, 58, W, 60, '#54423a');
      P(c, 0, 118, W, 68, '#5e4a42');
      for (let i = 0; i < 3; i++) {
        const lx = 90 + i * 150;
        P(c, lx, 0, 2, 20, '#2e241c');
        lingkaran(c, lx + 1, 26, 8, '#ffd166');
        lingkaran(c, lx + 1, 26, 5, '#fff3cf');
      }
      P(c, 40, 84, 120, 4, '#3a2c20');
      for (let i = 0; i < 8; i++) P(c, 46 + i * 14, 68 + (i % 2) * 4, 10, 16, i % 2 ? '#c9a763' : '#a3875a');
      P(c, 310, 84, 120, 4, '#3a2c20');
      for (let i = 0; i < 8; i++) P(c, 316 + i * 14, 68 + (i % 2) * 4, 10, 16, i % 2 ? '#a3875a' : '#c9a763');
      P(c, 0, 186, W, 30, '#6a5648');
      P(c, 0, 186, W, 2, '#58463a');
      P(c, 0, 216, W, 54, '#7a6250');
      for (let r = 0; r < 3; r++) P(c, 0, 224 + r * 16, W, 1, '#685444');
      for (let i = 0; i < 6; i++) P(c, (i * 87 + 22) % W, 232 + (i % 3) * 10, 4, 2, '#58463a');
    }

    else if (TEMA_NAMA === 'tetangga') {
      P(c, 0, 0, W, 40, '#ffd9a3');
      P(c, 0, 40, W, 40, '#f8cd8f');
      P(c, 0, 80, W, 38, '#f2c17d');
      P(c, 0, 118, W, 32, '#eab66e');
      lingkaran(c, 60, 112, 13, '#ffb86b');
      lingkaran(c, 60, 112, 9, '#ff9d4a');
      P(c, 0, 150, W, 36, '#d9a86a');
      for (const hx of [96, 300]) {
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

    else if (TEMA_NAMA === 'teras') {
      P(c, 0, 0, W, 70, '#ffe8d0');
      P(c, 0, 70, W, 60, '#f8dcc0');
      P(c, 0, 130, W, 56, '#f0d0b0');
      P(c, 0, 0, W, 6, '#8a5f38');
      P(c, 30, 0, 8, 70, '#a3744a');
      P(c, 442, 0, 8, 70, '#a3744a');
      P(c, 60, 92, 110, 3, '#8a5f38');
      for (let i = 0; i < 4; i++) {
        P(c, 70 + i * 26, 82, 14, 10, i % 2 ? '#e86a5a' : '#ffd166');
        lingkaran(c, 77 + i * 26, 80, 5, i % 2 ? '#ff9d9d' : '#f2b8cc');
      }
      P(c, 330, 90, 90, 3, '#8a5f38');
      for (let i = 0; i < 3; i++) P(c, 344 + i * 26, 80, 14, 10, i % 2 ? '#ffd166' : '#e86a5a');
      P(c, 0, 186, W, 84, '#c98a4b');
      for (let r = 0; r < 6; r++) P(c, 0, 192 + r * 14, W, 2, '#b8763c');
      P(c, 0, 236, W, 24, '#d9a05e');
      P(c, 0, 236, W, 2, '#b8763c');
      P(c, 0, 258, W, 2, '#b8763c');
    }

    else if (TEMA_NAMA === 'layang') {
      P(c, 0, 0, W, 46, '#a8e0f8');
      P(c, 0, 46, W, 42, '#98d8f2');
      P(c, 0, 88, W, 40, '#b2e4f8');
      P(c, 0, 128, W, 24, '#c4ecf8');
      lingkaran(c, 430, 30, 12, '#ffe9a3');
      lingkaran(c, 430, 30, 9, '#ffd166');
      for (let i = 0; i < 6; i++) {
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
      P(c, 40, 176, 90, 4, '#a3744a');
      P(c, 44, 180, 4, 10, '#8a5f38'); P(c, 122, 180, 4, 10, '#8a5f38');
      P(c, 360, 174, 90, 4, '#a3744a');
      P(c, 364, 178, 4, 10, '#8a5f38'); P(c, 442, 178, 4, 10, '#8a5f38');
      for (let i = 0; i < 8; i++) P(c, (i * 67 + 30) % W, 216 + (i % 3) * 12, 1, 4, '#8a7040');
    }

    else if (TEMA_NAMA === 'misteri') {
      P(c, 0, 0, W, 52, '#141a34');
      P(c, 0, 52, W, 48, '#182042');
      P(c, 0, 100, W, 40, '#1c2650');
      P(c, 0, 140, W, 20, '#202c58');
      for (let i = 0; i < 22; i++) {
        const sx = (i * 73 + 11) % (W - 10) + 5, sy = 8 + (i * 29) % 120;
        P(c, sx, sy, i % 5 === 0 ? 2 : 1, i % 5 === 0 ? 2 : 1, i % 3 ? '#fffdf2' : '#cdd9f5');
      }
      lingkaran(c, 424, 32, 15, 'rgba(232,238,248,.10)');
      lingkaran(c, 424, 32, 10, '#e8eef8');
      gunungDi(c, 120, 100, 62, 186, '#182244');
      gunungDi(c, 360, 108, 58, 186, '#1a2650');
      P(c, 0, 150, W, 36, '#26325c');
      for (let i = 0; i < 9; i++) P(c, (i * 53 + 15) % W, 152 + (i % 3) * 8, 26, 2, 'rgba(255,253,242,.08)');
      tanah(c, '#223058', '#1c2a4e', '#2a3a66');
      jalan(c, '#3a4a78', '#324068', '#384872', '#465684');
      for (let i = 0; i < 7; i++) P(c, (i * 71 + 25) % W, 240 + (i % 3) * 8, 4, 2, '#2c3c64');
    }

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
      for (let r = 0; r < 3; r++) {
        P(c, 40 + r * 14, 196 + r * 16, W - 90, 1, 'rgba(255,253,242,.28)');
        for (let i = 0; i < 9; i++) P(c, 46 + i * 44, 196 + r * 16, 6, 1, 'rgba(255,253,242,.5)');
      }
    }

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
      for (let i = 0; i < 4; i++) {
        const lx = 60 + i * 118;
        P(c, lx, 156, 2, 26, '#3a4a78');
        lingkaran(c, lx - 3, 154, 2, '#ffd166');
        lingkaran(c, lx + 5, 154, 2, '#ffd166');
      }
      hutanDi(c, '#1a352c', '#162e26');
      tanah(c, '#32603e', '#2c5638', '#3d7048');
      jalan(c, '#a98f60', '#8f774c', '#a3875a', '#bfa470');
    }

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
      for (let i = 0; i < 6; i++) {
        const fx = 34 + i * 74, fy = 200 + (i % 3) * 14;
        for (let p = 0; p < 5; p++) {
          const a = p * Math.PI * 2 / 5 - Math.PI / 2;
          P(c, fx + Math.round(Math.cos(a) * 4), fy + Math.round(Math.sin(a) * 4), 2, 2, '#f2b8cc');
        }
        P(c, fx, fy, 2, 2, '#ffd166');
      }
    }

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
      P(c, 0, 158, W, 2, '#5a6a94');
      P(c, 0, 166, W, 2, '#5a6a94');
      for (let i = 0; i < 15; i++) P(c, 8 + i * 32, 160, 12, 2, '#3a4a78');
      for (let i = 0; i < 5; i++) {
        const lx = 40 + i * 100;
        P(c, lx, 172, 2, 14, '#3a4a78');
        lingkaran(c, lx + 1, 170, 2.4, '#ffd166');
      }
      tanah(c, '#32603e', '#2c5638', '#3d7048');
      jalan(c, '#a98f60', '#8f774c', '#a3875a', '#bfa470');
    }

    else if (TEMA_NAMA === 'bengkel') {
      P(c, 0, 0, W, 52, '#c89868');
      P(c, 0, 52, W, 48, '#bd8c5c');
      P(c, 0, 100, W, 44, '#b28252');
      P(c, 0, 144, W, 38, '#a87848');
      for (let i = 0; i < 3; i++) {
        const wx = 56 + i * 150;
        P(c, wx, 58, 52, 42, '#8a6a44');
        P(c, wx + 4, 62, 44, 34, '#bfe4f5');
        P(c, wx + 4, 62, 44, 12, '#d8f0fa');
        P(c, wx + 24, 62, 3, 34, '#8a6a44');
        P(c, wx + 4, 76, 44, 3, '#8a6a44');
      }
      P(c, 0, 148, W, 4, '#8a6a44');
      for (let i = 0; i < 8; i++) P(c, (i * 61 + 23) % W, 30 + (i % 3) * 8, 10, 2, '#8a6a44');
      tanah(c, '#a8845c', '#98764e', '#b8946a');
      jalan(c, '#c9a763', '#ad8c50', '#b8945a', '#d9bd85');
    }

    else if (TEMA_NAMA === 'tebing') {
      P(c, 0, 0, W, 42, '#ffd9a8');
      P(c, 0, 42, W, 40, '#fccd94');
      P(c, 0, 82, W, 38, '#f4bd82');
      P(c, 0, 120, W, 30, '#ecb072');
      lingkaran(c, 396, 110, 14, '#ffb86b');
      lingkaran(c, 396, 110, 10, '#ff9d4a');
      P(c, 40, 66, 120, 120, '#b08060');
      P(c, 48, 78, 104, 10, '#c09070');
      P(c, 48, 104, 88, 10, '#c09070');
      P(c, 48, 130, 72, 10, '#c09070');
      P(c, 330, 84, 110, 102, '#a87858');
      P(c, 340, 96, 92, 10, '#ba8a68');
      P(c, 340, 122, 76, 10, '#ba8a68');
      P(c, 0, 150, W, 36, '#c09878');
      tanah(c, '#c8a068', '#b89058', '#d8b078');
      jalan(c, '#d9bd85', '#c2a56e', '#c9ad74', '#e3cd96');
      for (let i = 0; i < 8; i++) P(c, (i * 67 + 21) % W, 218 + (i % 3) * 10, 3, 2, '#8a7048');
    }

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
      for (let i = 0; i < 6; i++) {
        const tx = 24 + i * 88;
        P(c, tx, 168, 3, 16, '#0e1a30');
        P(c, tx - 6, 156, 15, 12, '#0e1a30');
        P(c, tx - 3, 146, 9, 10, '#122140');
      }
      P(c, 0, 150, W, 36, '#1e3050');
      P(c, 330, 172, 34, 20, '#26365c');
      P(c, 344, 162, 6, 30, '#26365c');
      P(c, 337, 184, 20, 8, '#101a34');
      tanah(c, '#2c5238', '#264a32', '#376044');
      jalan(c, '#a98f60', '#8f774c', '#a3875a', '#bfa470');
      for (let i = 0; i < 6; i++) P(c, (i * 77 + 33) % W, 190 + (i % 3) * 14, 1, 1, '#ffe9a3');
    }

    else if (TEMA_NAMA === 'terang') {
      P(c, 0, 0, W, 54, '#f2e8d4');
      P(c, 0, 54, W, 48, '#ecdec4');
      P(c, 0, 102, W, 44, '#e4d4ba');
      P(c, 0, 146, W, 36, '#dcccb0');
      for (let i = 0; i < 2; i++) {
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

    else if (TEMA_NAMA === 'bazar') {
      P(c, 0, 0, W, 46, '#9fdcf5');
      P(c, 0, 46, W, 42, '#8fd3f0');
      P(c, 0, 88, W, 40, '#a5e0f5');
      P(c, 0, 128, W, 24, '#b7e8f8');
      lingkaran(c, 430, 30, 12, '#ffe9a3');
      lingkaran(c, 430, 30, 9, '#ffd166');
      P(c, 0, 150, W, 36, '#b8a888');
      for (let i = 0; i < 4; i++) {
        const kx = 24 + i * 118;
        P(c, kx, 140, 92, 16, i % 2 ? '#d86a6a' : '#4aa8a0');
        for (let s = 0; s < 5; s++) P(c, kx + s * 19, 140, 10, 16, i % 2 ? '#f0a0a0' : '#7cc8c0');
        P(c, kx + 6, 156, 3, 30, '#8a6a44');
        P(c, kx + 82, 156, 3, 30, '#8a6a44');
      }
      tanah(c, '#a8b068', '#98a058', '#b8c078');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
    }

    else if (TEMA_NAMA === 'warung') {
      P(c, 0, 0, W, 42, '#ffd9a8');
      P(c, 0, 42, W, 40, '#fccd94');
      P(c, 0, 82, W, 38, '#f4bd82');
      P(c, 0, 120, W, 30, '#ecb072');
      lingkaran(c, 90, 112, 13, '#ffb86b');
      lingkaran(c, 90, 112, 9, '#ff9d4a');
      P(c, 250, 84, 160, 68, '#a87848');
      P(c, 250, 84, 160, 10, '#8a6238');
      P(c, 262, 108, 40, 30, '#5f4426');
      P(c, 262, 108, 40, 30, 'rgba(255,209,102,.35)');
      P(c, 330, 104, 56, 40, '#5f4426');
      P(c, 333, 107, 50, 34, '#ffd9a3');
      P(c, 348, 142, 14, 10, '#5f4426');
      P(c, 0, 150, W, 36, '#c09878');
      for (let i = 0; i < 3; i++) {
        const lx = 280 + i * 34;
        P(c, lx, 152, 1, 8, '#5f4426');
        lingkaran(c, lx, 163, 3, '#ffd166');
      }
      tanah(c, '#b89868', '#a88858', '#c8a878');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
    }

    else if (TEMA_NAMA === 'lorong') {
      P(c, 0, 0, W, 52, '#141c3a');
      P(c, 0, 52, W, 48, '#182246');
      P(c, 0, 100, W, 44, '#1c2850');
      P(c, 0, 144, W, 38, '#202e56');
      P(c, 0, 148, W, 4, '#2a3a68');
      for (let i = 0; i < 8; i++) {
        const lx = 30 + i * 60;
        P(c, lx, 160, 8, 10, '#2a3a68');
        lingkaran(c, lx + 4, 165, 3, '#ffd166');
        P(c, lx + 3, 170, 3, 12, 'rgba(255,209,102,.18)');
      }
      P(c, 300, 170, 180, 6, '#26365e');
      tanah(c, '#26365c', '#203052', '#2d3f68');
      jalan(c, '#3a4a78', '#324068', '#384872', '#465684');
      for (let i = 0; i < 7; i++) P(c, (i * 71 + 25) % W, 240 + (i % 3) * 8, 4, 2, '#2c3c64');
    }

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
      P(c, 20, 150, 100, 4, '#32426a');
      P(c, 12, 144, 116, 6, '#32426a');
      P(c, 360, 150, 100, 4, '#32426a');
      P(c, 352, 144, 116, 6, '#32426a');
      for (let i = 0; i < 4; i++) {
        const ox = 150 + i * 60;
        P(c, ox, 158, 2, 16, '#5f4426');
        lingkaran(c, ox + 1, 154, 3, '#ffd166');
        P(c, ox, 148, 3, 5, 'rgba(255,209,102,.25)');
      }
      tanah(c, '#2c4a48', '#264240', '#376058');
      jalan(c, '#a98f60', '#8f774c', '#a3875a', '#bfa470');
    }

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
      P(c, 26, 118, 130, 4, '#a8825a');
      for (let j = 0; j < 3; j++) {
        const jx = 40 + j * 38;
        P(c, jx, 102, 22, 16, j % 2 ? '#d8e8f8' : '#f8e2c8');
        P(c, jx + 4, 98, 14, 4, '#a8825a');
        P(c, jx + 6, 106, 4, 10, j % 2 ? '#ffd166' : '#ff9d9d');
      }
      P(c, 322, 118, 130, 4, '#a8825a');
      P(c, 352, 104, 26, 14, '#e8b06a');
      P(c, 356, 100, 10, 4, '#a8825a');
      P(c, 380, 108, 14, 10, '#d8e8f8');
      P(c, 384, 104, 8, 4, '#a8825a');
      P(c, 0, 178, W, 4, '#c9a97e');
      tanah(c, '#e0c9a0', '#d4bd92', '#ead6b2');
      jalan(c, '#c9a763', '#ad8c50', '#b8945a', '#d9bd85');
      for (let i = 0; i < 10; i++) P(c, (i * 47) % W, 186 + (i % 3) * 14, 1, 12, '#d4bd92');
    }

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

    else if (TEMA_NAMA === 'penggaris') {
      P(c, 0, 0, W, 44, '#ffe3b8');
      P(c, 0, 44, W, 42, '#ffdcae');
      P(c, 0, 86, W, 44, '#fbd6a0');
      P(c, 0, 130, W, 52, '#f5cd96');
      lingkaran(c, 76, 34, 10, '#ffe9a3');
      lingkaran(c, 76, 34, 7, '#ffd166');
      P(c, 0, 158, W, 24, '#f0c48c');
      P(c, 60, 118, 300, 26, '#d9a866');
      P(c, 60, 118, 300, 3, '#e8bc7e');
      for (let i = 0; i < 20; i++) P(c, 70 + i * 14, 118, 2, i % 2 ? 8 : 13, '#b8874c');
      P(c, 404, 140, 4, 42, '#a8825a');
      lingkaran(c, 406, 132, 10, '#e8bc7e');
      lingkaran(c, 406, 132, 7, '#c99b5c');
      tanah(c, '#a8c46a', '#98b45c', '#b8d47c');
      jalan(c, '#e0c188', '#c8a86a', '#d4b477', '#eed2a0');
    }

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

    else if (TEMA_NAMA === 'tambang') {
      P(c, 0, 0, W, 46, '#4a3428');
      P(c, 0, 46, W, 46, '#553c2c');
      P(c, 0, 92, W, 46, '#60452f');
      P(c, 0, 138, W, 44, '#6b4e34');
      for (let i = 0; i < 3; i++) {
        P(c, 0, 34 + i * 44, W, 6, '#3a2c1e');
        for (let k = 0; k < 5; k++) P(c, 24 + k * 100 + (i % 2) * 26, 40 + i * 44, 5, 22, '#3a2c1e');
      }
      P(c, 83, 0, 2, 30, '#2a2018');
      lingkaran(c, 84, 38, 8, '#ffd9a3');
      lingkaran(c, 84, 38, 4, '#fff3cf');
      P(c, 329, 0, 2, 46, '#2a2018');
      lingkaran(c, 330, 54, 7, '#ffd9a3');
      lingkaran(c, 330, 54, 3, '#fff3cf');
      P(c, 0, 176, W, 6, '#5a4230');
      tanah(c, '#6b5236', '#5f4830', '#7a5e3e');
      jalan(c, '#8a6a44', '#75573a', '#7d5f3e', '#96764e');
    }

    else if (TEMA_NAMA === 'jembatan') {
      P(c, 0, 0, W, 46, '#a8e0c8');
      P(c, 0, 46, W, 46, '#98d8bc');
      P(c, 0, 92, W, 46, '#b0e2ca');
      P(c, 0, 138, W, 44, '#c0e8d2');
      P(c, 4, 70, 18, 112, '#6b4a2c');
      lingkaran(c, 12, 62, 24, '#2f7a44');
      lingkaran(c, 34, 78, 16, '#2a6d3c');
      P(c, 458, 82, 18, 100, '#6b4a2c');
      lingkaran(c, 468, 74, 22, '#2f7a44');
      lingkaran(c, 446, 90, 15, '#2a6d3c');
      P(c, 150, 40, 2, 60, '#3d8a4e');
      lingkaran(c, 151, 104, 4, '#4fa55e');
      P(c, 320, 30, 2, 74, '#3d8a4e');
      lingkaran(c, 321, 108, 4, '#4fa55e');
      P(c, 0, 166, W, 16, '#dff2e6');
      hutanDi(c, '#2f7a44', '#2a6d3c');
      tanah(c, '#6fb858', '#63aa4e', '#7fc764');
      jalan(c, '#c9a876', '#b58a5e', '#b89668', '#d9bd8e');
    }

    else if (TEMA_NAMA === 'kutub') {
      P(c, 0, 0, W, 46, '#dceef8');
      P(c, 0, 46, W, 46, '#d0e8f4');
      P(c, 0, 92, W, 46, '#e0f0fa');
      P(c, 0, 138, W, 44, '#ecf7fc');
      lingkaran(c, 60, 178, 18, '#f4fbff');
      lingkaran(c, 84, 182, 14, '#eaf4fa');
      lingkaran(c, 400, 180, 20, '#f4fbff');
      lingkaran(c, 426, 183, 13, '#eaf4fa');
      for (let i = 0; i < 10; i++) {
        const kx = 120 + i * 26, ky = 150 + (i % 3) * 8;
        P(c, kx, ky, 3, 3, '#ffffff');
        P(c, kx + 3, ky + 1, 2, 2, '#d8ecf8');
      }
      P(c, 210, 120, 2, 62, '#a8c8dc');
      lingkaran(c, 211, 118, 6, '#c8e0ee');
      tanah(c, '#d8e8f0', '#c8dce8', '#e4f0f6');
      jalan(c, '#b8ccd8', '#a4bacc', '#acc2d0', '#c6d8e2');
    }

    else if (TEMA_NAMA === 'kios') {
      P(c, 0, 0, W, 46, '#a5ddf5');
      P(c, 0, 46, W, 46, '#9ad5ee');
      P(c, 0, 92, W, 46, '#b2e2f7');
      P(c, 0, 138, W, 44, '#c2e9fa');
      P(c, 20, 138, 130, 8, '#c9564b');
      for (let k = 0; k < 8; k++) P(c, 22 + k * 16, 138, 8, 8, k % 2 ? '#fffdf2' : '#c9564b');
      P(c, 330, 138, 130, 8, '#3f8f6f');
      for (let k = 0; k < 8; k++) P(c, 332 + k * 16, 138, 8, 8, k % 2 ? '#fffdf2' : '#3f8f6f');
      P(c, 30, 146, 4, 36, '#7a5230'); P(c, 136, 146, 4, 36, '#7a5230');
      P(c, 340, 146, 4, 36, '#7a5230'); P(c, 446, 146, 4, 36, '#7a5230');
      P(c, 60, 168, 26, 14, '#8a6a44');
      P(c, 66, 162, 14, 6, '#a3825a');
      P(c, 380, 166, 30, 16, '#8a6a44');
      hutanDi(c, '#2f7a44', '#2a6d3c');
      tanah(c, '#a8c868', '#98b85c', '#b8d474');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
    }

    else if (TEMA_NAMA === 'jurang') {
      P(c, 0, 0, W, 46, '#b8bcd4');
      P(c, 0, 46, W, 46, '#aab0cc');
      P(c, 0, 92, W, 46, '#c6cae0');
      P(c, 0, 138, W, 44, '#d4d8e8');
      P(c, 0, 40, 30, 142, '#5a5e78');
      P(c, 6, 60, 4, 100, '#4c5068');
      P(c, 450, 52, 30, 130, '#5a5e78');
      P(c, 468, 74, 4, 100, '#4c5068');
      P(c, 0, 150, W, 32, '#dfe2f0');
      P(c, 0, 160, W, 12, '#e8eaf4');
      tanah(c, '#8a8ea6', '#7e829a', '#989cb2');
      jalan(c, '#6e7288', '#5e6278', '#64687e', '#7a7e94');
      for (let i = 0; i < 6; i++) {
        P(c, 60 + i * 70, 230 + (i % 2) * 8, 4, 3, '#565a70');
      }
    }

    else if (TEMA_NAMA === 'pelabuhan') {
      P(c, 0, 0, W, 46, '#9fd8f2');
      P(c, 0, 46, W, 46, '#8fd0ee');
      P(c, 0, 92, W, 46, '#a8dcf5');
      P(c, 0, 138, W, 44, '#bce4f8');
      P(c, 0, 146, W, 36, '#3f8fb8');
      P(c, 0, 146, W, 3, '#5aa8cc');
      for (let i = 0; i < 7; i++) P(c, 20 + i * 66, 154 + (i % 2) * 8, 12, 2, '#5aa8cc');
      P(c, 398, 128, 2, 20, '#4a3a28');
      P(c, 400, 130, 16, 10, '#fffdf2');
      P(c, 60, 148, 3, 34, '#4a3a28');
      P(c, 200, 150, 3, 32, '#4a3a28');
      tanah(c, '#c9a876', '#b89668', '#d9bd8e');
      jalan(c, '#b89668', '#a3825a', '#ab8a5e', '#c9b082');
      for (let i = 0; i < 5; i++) P(c, 40 + i * 100, 190 + (i % 2) * 30, 40, 2, '#b0906a');
    }

    else if (TEMA_NAMA === 'terowongan') {
      P(c, 0, 0, W, 46, '#2e2836');
      P(c, 0, 46, W, 46, '#363044');
      P(c, 0, 92, W, 46, '#3e3850');
      P(c, 0, 138, W, 44, '#464058');
      for (let i = 0; i < 5; i++) P(c, 20 + i * 110, 0, 10, 182, '#2a2432');
      for (let i = 0; i < 4; i++) {
        const lx = 70 + i * 110, ly = 60 + (i % 2) * 50;
        P(c, lx, ly - 10, 2, 10, '#1c1822');
        lingkaran(c, lx + 1, ly, 7, '#ffd9a3');
        lingkaran(c, lx + 1, ly, 3, '#fff3cf');
      }
      tanah(c, '#4a4458', '#403a4e', '#544e62');
      jalan(c, '#5a5468', '#4e485c', '#524c60', '#665e74');
    }

    else if (TEMA_NAMA === 'balik') {
      P(c, 0, 0, W, 46, '#a8e0b4');
      P(c, 0, 46, W, 46, '#98d6a6');
      P(c, 0, 92, W, 46, '#b4e6c0');
      P(c, 0, 138, W, 44, '#c4ecd0');
      P(c, 90, 120, 3, 40, '#7a5230');
      P(c, 78, 112, 28, 10, '#8fbf9a');
      P(c, 356, 110, 3, 46, '#7a5230');
      P(c, 342, 100, 30, 12, '#8fbf9a');
      P(c, 344, 103, 12, 2, '#fffdf2');
      lingkaran(c, 230, 84, 10, '#f2ffe0');
      lingkaran(c, 230, 84, 6, '#fffdf2');
      hutanDi(c, '#2f7a44', '#2a6d3c');
      tanah(c, '#7ec46a', '#70b65e', '#8cd276');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
      bungaDi(c, '#ffd166', '#f2b8cc');
    }

    else if (TEMA_NAMA === 'kurir') {
      P(c, 0, 0, W, 46, '#ffd9a3');
      P(c, 0, 46, W, 46, '#ffcf94');
      P(c, 0, 92, W, 46, '#f8c48c');
      P(c, 0, 138, W, 44, '#f2ba85');
      lingkaran(c, 398, 128, 14, '#ffb86b');
      lingkaran(c, 398, 128, 9, '#ffd166');
      P(c, 40, 128, 110, 5, '#8a5f38');
      for (let k = 0; k < 4; k++) P(c, 48 + k * 26, 112, 16, 16, k % 2 ? '#a3744a' : '#8a6a44');
      P(c, 300, 132, 120, 5, '#8a5f38');
      for (let k = 0; k < 4; k++) P(c, 308 + k * 28, 118, 18, 14, k % 2 ? '#8a6a44' : '#a3744a');
      hutanDi(c, '#4a6b3a', '#416030');
      tanah(c, '#b0a060', '#a29055', '#c0b070');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
    }

    else if (TEMA_NAMA === 'lift') {
      P(c, 0, 0, W, 46, '#5a6070');
      P(c, 0, 46, W, 46, '#646a7c');
      P(c, 0, 92, W, 46, '#6e7488');
      P(c, 0, 138, W, 44, '#787e92');
      for (let i = 0; i < 6; i++) P(c, 24 + i * 88, 0, 8, 182, '#485060');
      for (let i = 0; i < 4; i++) P(c, 0, 40 + i * 40, W, 4, '#485060');
      lingkaran(c, 240, 44, 22, '#3a4252');
      lingkaran(c, 240, 44, 14, '#485060');
      lingkaran(c, 240, 44, 4, '#646a7c');
      P(c, 238, 66, 4, 60, '#3a4252');
      P(c, 104, 30, 2, 20, '#2a3038');
      lingkaran(c, 105, 52, 7, '#ffd9a3');
      lingkaran(c, 105, 52, 3, '#fff3cf');
      tanah(c, '#5a6070', '#505666', '#646a7c');
      jalan(c, '#6e7488', '#5e6478', '#646a7e', '#7a8094');
    }

    else if (TEMA_NAMA === 'pelataran') {
      P(c, 0, 0, W, 46, '#b8ecab');
      P(c, 0, 46, W, 46, '#a6e09c');
      P(c, 0, 92, W, 46, '#c2f0b4');
      P(c, 0, 138, W, 44, '#cdf4c0');
      P(c, 40, 96, 10, 86, '#7fae62');
      P(c, 430, 92, 10, 90, '#7fae62');
      P(c, 30, 92, 30, 8, '#6f9e54');
      P(c, 420, 88, 30, 8, '#6f9e54');
      for (let i = 0; i < 9; i++) P(c, 120 + i * 28, 150 + (i % 2) * 10, 22, 10, i % 2 ? '#d8f2c8' : '#b8e0a8');
      hutanDi(c, '#2f7a44', '#2a6d3c');
      tanah(c, '#a0c860', '#92ba54', '#aed46e');
      jalan(c, '#cfc09a', '#b8a884', '#c2b490', '#dccfae');
      bungaDi(c, '#ffd166', '#f2b8cc');
    }

    else if (TEMA_NAMA === 'kuari') {
      P(c, 0, 0, W, 46, '#c8c2b2');
      P(c, 0, 46, W, 46, '#bcb6a6');
      P(c, 0, 92, W, 46, '#d2ccb8');
      P(c, 0, 138, W, 44, '#dad4c2');
      P(c, 0, 60, 90, 40, '#a89e88');
      P(c, 10, 74, 70, 26, '#968c76');
      P(c, 400, 52, 80, 50, '#a89e88');
      P(c, 414, 68, 60, 34, '#968c76');
      for (let i = 0; i < 6; i++) lingkaran(c, 120 + i * 56, 172, 5, '#b0a690');
      P(c, 0, 168, W, 4, '#8a8070');
      pohonKecil(c, 110, 182, 1.4);
      pohonKecil(c, 372, 182, 1.2);
      tanah(c, '#b8ac92', '#ac9f84', '#c6ba9e');
      jalan(c, '#a89c82', '#948a72', '#9c927a', '#b4a88e');
    }

    else if (TEMA_NAMA === 'bungkusan') {
      P(c, 0, 0, W, 46, '#f5e6c8');
      P(c, 0, 46, W, 46, '#eeddbb');
      P(c, 0, 92, W, 46, '#f8ead0');
      P(c, 0, 138, W, 44, '#fdf0d8');
      P(c, 80, 30, 200, 2, '#c9564b');
      P(c, 150, 32, 2, 18, '#c9564b');
      P(c, 240, 32, 2, 22, '#3f8f6f');
      lingkaran(c, 151, 54, 5, '#ffd166');
      lingkaran(c, 241, 58, 5, '#3f8f6f');
      hutanDi(c, '#3f8f5f', '#357f52');
      tanah(c, '#c8b478', '#bca66c', '#d4c288');
      jalan(c, '#d9c48c', '#c2a874', '#c9b07c', '#e3d19e');
      bungaDi(c, '#ffd166', '#ff9db8');
    }

    else if (TEMA_NAMA === 'pestaLampu') {
      P(c, 0, 0, W, 46, '#1c2440');
      P(c, 0, 46, W, 46, '#22304e');
      P(c, 0, 92, W, 46, '#28385a');
      P(c, 0, 138, W, 44, '#2f4266');
      lingkaran(c, 60, 30, 3, '#fffdf2');
      lingkaran(c, 200, 22, 2, '#e8ecf8');
      lingkaran(c, 350, 34, 2, '#fffdf2');
      lingkaran(c, 430, 24, 3, '#e8ecf8');
      P(c, 0, 52, W, 2, '#3a3050');
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

    else if (TEMA_NAMA === 'bukuTua') {
      P(c, 0, 0, W, 46, '#6b5238');
      P(c, 0, 46, W, 46, '#755c40');
      P(c, 0, 92, W, 46, '#7d6344');
      P(c, 0, 138, W, 44, '#876c4c');
      P(c, 60, 100, 120, 82, '#4a3826');
      P(c, 330, 96, 120, 86, '#4a3826');
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

    else if (TEMA_NAMA === 'pondokKartu') {
      P(c, 0, 0, W, 46, '#4c4468');
      P(c, 0, 46, W, 46, '#544c72');
      P(c, 0, 92, W, 46, '#5c547c');
      P(c, 0, 138, W, 44, '#645c86');
      lingkaran(c, 246, 66, 10, '#e8e2ff');
      lingkaran(c, 246, 66, 5, '#fdfaff');
      P(c, 200, 120, 90, 62, '#3a3050');
      P(c, 190, 104, 110, 18, '#5a4a7a');
      P(c, 232, 150, 26, 32, '#241c38');
      P(c, 60, 140, 3, 42, '#332c4a');
      P(c, 46, 128, 30, 12, '#4a3f66');
      P(c, 420, 136, 3, 46, '#332c4a');
      P(c, 406, 124, 30, 12, '#4a3f66');
      hutanDi(c, '#2c3a50', '#243044');
      tanah(c, '#5c5a72', '#525066', '#666480');
      jalan(c, '#6e6a86', '#5c5a74', '#62607c', '#7c7894');
    }

    else if (TEMA_NAMA === 'galeri') {
      P(c, 0, 0, W, 46, '#dff2e8');
      P(c, 0, 46, W, 46, '#d2ecdf');
      P(c, 0, 92, W, 46, '#e6f6ec');
      P(c, 0, 138, W, 44, '#eefaf2');
      P(c, 70, 108, 70, 52, '#8a6a44');
      P(c, 76, 114, 58, 40, '#f2ecd4');
      P(c, 96, 128, 18, 12, '#7fc764');
      P(c, 340, 104, 70, 56, '#8a6a44');
      P(c, 346, 110, 58, 44, '#f2ecd4');
      P(c, 366, 122, 18, 14, '#63b8ff');
      P(c, 0, 170, W, 8, '#c2e2d2');
      hutanDi(c, '#2f7a44', '#2a6d3c');
      tanah(c, '#8cc89a', '#80bc8e', '#9ad4a6');
      jalan(c, '#e8dfc8', '#d2c9b0', '#dcd3ba', '#f2e9d2');
    }

    else if (TEMA_NAMA === 'tanur') {
      P(c, 0, 0, W, 46, '#f2c894');
      P(c, 0, 46, W, 46, '#ecbd84');
      P(c, 0, 92, W, 46, '#f5d0a0');
      P(c, 0, 138, W, 44, '#f8d8ac');
      P(c, 150, 60, 26, 60, '#8a5f38');
      P(c, 144, 54, 38, 10, '#6b4a2c');
      lingkaran(c, 163, 44, 6, '#e8e2d4');
      lingkaran(c, 178, 36, 5, '#efe8d8');
      lingkaran(c, 190, 30, 4, '#f5efe2');
      P(c, 300, 120, 110, 62, '#c97b4a');
      P(c, 292, 108, 126, 14, '#a85c34');
      lingkaran(c, 355, 140, 12, '#3a2a1c');
      lingkaran(c, 355, 140, 7, '#ff9d4a');
      lingkaran(c, 355, 140, 3, '#ffd166');
      hutanDi(c, '#4a6b3a', '#416030');
      tanah(c, '#c8a068', '#bc945c', '#d4ac74');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
    }

    else if (TEMA_NAMA === 'titianBatu') {
      P(c, 0, 0, W, 46, '#bfe8e2');
      P(c, 0, 46, W, 46, '#b2e0d8');
      P(c, 0, 92, W, 46, '#caece6');
      P(c, 0, 138, W, 44, '#d8f2ec');
      P(c, 0, 150, W, 32, '#7fc8c0');
      P(c, 0, 150, W, 3, '#a0dcd4');
      for (let i = 0; i < 7; i++) P(c, 14 + i * 68, 158 + (i % 2) * 8, 16, 2, '#a0dcd4');
      lingkaran(c, 60, 176, 8, '#a8c8b8');
      lingkaran(c, 420, 178, 9, '#a8c8b8');
      hutanDi(c, '#2f7a44', '#2a6d3c');
      tanah(c, '#9cc8a0', '#8ebc92', '#aad4ae');
      jalan(c, '#b8b0a0', '#a29a8a', '#aaa292', '#c8c0b0');
    }

    else if (TEMA_NAMA === 'kantorPohon') {
      P(c, 0, 0, W, 46, '#2a5a3c');
      P(c, 0, 46, W, 46, '#2f6444');
      P(c, 0, 92, W, 46, '#356e4c');
      P(c, 0, 138, W, 44, '#3d7854');
      P(c, 150, 60, 130, 70, '#24482f');
      P(c, 144, 54, 142, 8, '#1c3a26');
      P(c, 168, 76, 26, 22, '#ffd166');
      P(c, 236, 76, 26, 22, '#ffd166');
      P(c, 196, 120, 40, 8, '#1c3a26');
      P(c, 60, 110, 8, 72, '#4a341c');
      P(c, 415, 104, 8, 78, '#4a341c');
      lingkaran(c, 64, 100, 16, '#2f7a44');
      lingkaran(c, 419, 94, 18, '#2f7a44');
      hutanDi(c, '#1e5232', '#184428');
      tanah(c, '#4a7a50', '#427048', '#56865c');
      jalan(c, '#6e8a62', '#5c7852', '#647e58', '#7e9870');
    }

    else if (TEMA_NAMA === 'posRahasia') {
      P(c, 0, 0, W, 46, '#c8ecda');
      P(c, 0, 46, W, 46, '#bce6d0');
      P(c, 0, 92, W, 46, '#d2f0e0');
      P(c, 0, 138, W, 44, '#dcf4e6');
      P(c, 70, 70, 120, 2, '#7a5230');
      for (let i = 0; i < 3; i++) P(c, 84 + i * 38, 72 + (i % 2) * 4, 16, 12, i % 2 ? '#f5ecd4' : '#ffe9c4');
      P(c, 340, 96, 46, 56, '#3f6f5a');
      P(c, 336, 88, 54, 10, '#2f5a46');
      P(c, 356, 112, 14, 14, '#ffd166');
      hutanDi(c, '#2f7a44', '#2a6d3c');
      tanah(c, '#a8d890', '#9acc84', '#b6e29e');
      jalan(c, '#d9c48c', '#c2a874', '#c9b07c', '#e3d19e');
      bungaDi(c, '#ffd166', '#f2b8cc');
    }

    else if (TEMA_NAMA === 'kebunApel') {
      P(c, 0, 0, W, 46, '#ffcf94');
      P(c, 0, 46, W, 46, '#f8c48c');
      P(c, 0, 92, W, 46, '#f2ba85');
      P(c, 0, 138, W, 44, '#eab078');
      lingkaran(c, 90, 70, 12, '#ff9d6b');
      lingkaran(c, 90, 70, 7, '#ffd166');
      for (let i = 0; i < 5; i++) {
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

    else if (TEMA_NAMA === 'gudangTumpuk') {
      P(c, 0, 0, W, 46, '#eef2e4');
      P(c, 0, 46, W, 46, '#e4ecda');
      P(c, 0, 92, W, 46, '#f2f6ea');
      P(c, 0, 138, W, 44, '#f6f8ee');
      P(c, 40, 120, 120, 4, '#8a5f38');
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

    else if (TEMA_NAMA === 'kacaKuncup') {
      P(c, 0, 0, W, 46, '#d8f4e0');
      P(c, 0, 46, W, 46, '#ccf0d8');
      P(c, 0, 92, W, 46, '#e2f8e8');
      P(c, 0, 138, W, 44, '#eafcec');
      P(c, 300, 108, 100, 50, '#b8dcc8');
      for (let i = 0; i < 4; i++) P(c, 306 + i * 24, 112, 20, 42, '#d8f2e2');
      P(c, 296, 100, 108, 4, '#9cc8b0');
      P(c, 296, 100, 8, 12, '#9cc8b0');
      P(c, 396, 100, 8, 12, '#9cc8b0');
      hutanDi(c, '#3f8f5f', '#357f52');
      tanah(c, '#b0dc90', '#a2d084', '#bee69e');
      jalan(c, '#d9e4c0', '#c2d0a8', '#cad8b0', '#e4eec8');
      bungaDi(c, '#ffd166', '#f2b8cc');
    }

    else if (TEMA_NAMA === 'mesinStempel') {
      P(c, 0, 0, W, 46, '#f2e4c8');
      P(c, 0, 46, W, 46, '#ecdcb8');
      P(c, 0, 92, W, 46, '#f6ecd0');
      P(c, 0, 138, W, 44, '#faf2d8');
      P(c, 320, 76, 12, 60, '#8a5f38');
      P(c, 310, 70, 32, 8, '#6f4a28');
      P(c, 328, 60, 8, 12, '#9aa6b8');
      lingkaran(c, 332, 54, 5, '#e8e2d4');
      P(c, 70, 116, 90, 4, '#8a5f38');
      P(c, 78, 102, 18, 14, '#c9985a');
      P(c, 102, 102, 18, 14, '#b8874a');
      hutanDi(c, '#3f7a4a', '#356d40');
      tanah(c, '#c8b080', '#bca474', '#d4bc8c');
      jalan(c, '#c2b490', '#ac9e7a', '#b4a684', '#cec0a0');
    }

    else if (TEMA_NAMA === 'kamarRapi') {
      P(c, 0, 0, W, 46, '#e8c8a8');
      P(c, 0, 46, W, 46, '#e0be9c');
      P(c, 0, 92, W, 46, '#f0d2b0');
      P(c, 0, 138, W, 44, '#f6dcb8');
      P(c, 40, 84, 130, 70, '#8a6a44');
      P(c, 56, 98, 24, 20, '#ffd166');
      P(c, 128, 98, 24, 20, '#ffd166');
      P(c, 36, 78, 138, 8, '#6f4a28');
      P(c, 300, 96, 110, 58, '#7a5c3a');
      P(c, 316, 110, 22, 18, '#ffd166');
      P(c, 372, 110, 22, 18, '#ffcf94');
      P(c, 296, 90, 118, 8, '#5f4426');
      hutanDi(c, '#4a6b3a', '#416030');
      tanah(c, '#c8a878', '#bc9c6c', '#d4b488');
      jalan(c, '#d9c48c', '#c2a874', '#c9b07c', '#e3d19e');
    }

    else if (TEMA_NAMA === 'kunangTangga') {
      P(c, 0, 0, W, 46, '#141c30');
      P(c, 0, 46, W, 46, '#182238');
      P(c, 0, 92, W, 46, '#1c2840');
      P(c, 0, 138, W, 44, '#202e48');
      lingkaran(c, 400, 40, 10, '#f2e8c8');
      lingkaran(c, 396, 38, 8, '#141c30');
      for (let i = 0; i < 5; i++) P(c, 150 + i * 22, 150 - i * 8, 20, 8 + i * 8, '#243252');
      hutanDi(c, '#0f1a2a', '#0c1626');
      tanah(c, '#2a3a54', '#24344c', '#30405c');
      jalan(c, '#3a4a66', '#32425a', '#364660', '#42526e');
    }

    else if (TEMA_NAMA === 'tendaPendaki') {
      P(c, 0, 0, W, 46, '#f2c094');
      P(c, 0, 46, W, 46, '#ecb68a');
      P(c, 0, 92, W, 46, '#e6ac80');
      P(c, 0, 138, W, 44, '#e0a478');
      gunungDi(c, 90, 96, 120, 182, '#8a6a7c');
      gunungDi(c, 330, 88, 140, 182, '#7a5c6e');
      lingkaran(c, 250, 62, 12, '#ffcf94');
      for (let i = 0; i < 3; i++) P(c, 60 + i * 10, 168 - i * 6, 8, 4, '#5f7a52');
      hutanDi(c, '#3d6b34', '#35602c');
      tanah(c, '#a8b06a', '#9ca45e', '#b6be76');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
    }

    else if (TEMA_NAMA === 'ladangBunga') {
      P(c, 0, 0, W, 46, '#cdeefc');
      P(c, 0, 46, W, 46, '#c2e8f8');
      P(c, 0, 92, W, 46, '#d8f2fa');
      P(c, 0, 138, W, 44, '#e2f6fc');
      lingkaran(c, 70, 40, 11, '#fff3cf');
      lingkaran(c, 70, 40, 6, '#fffdf2');
      hutanDi(c, '#4a8a54', '#427d4a');
      tanah(c, '#8cc46a', '#7eb65e', '#9ad076');
      jalan(c, '#e0d4a8', '#c8bc90', '#d0c498', '#ead8b4');
      bungaDi(c, '#ff9db8', '#ffd166');
      bungaDi(c, '#f2b8cc', '#ffefd2');
    }

    else if (TEMA_NAMA === 'menaraTantang') {
      P(c, 0, 0, W, 46, '#161e34');
      P(c, 0, 46, W, 46, '#1a2440');
      P(c, 0, 92, W, 46, '#1e2a48');
      P(c, 0, 138, W, 44, '#223050');
      P(c, 190, 52, 60, 130, '#2a3858');
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

    else if (TEMA_NAMA === 'pasarSenja') {
      P(c, 0, 0, W, 46, '#f8c48c');
      P(c, 0, 46, W, 46, '#f0ba80');
      P(c, 0, 92, W, 46, '#e8b078');
      P(c, 0, 138, W, 44, '#e0a670');
      lingkaran(c, 80, 68, 11, '#ff9d6b');
      lingkaran(c, 80, 68, 6, '#ffd166');
      for (let i = 0; i < 3; i++) {
        const tx = 240 + i * 56;
        P(c, tx, 118, 44, 26, i % 2 ? '#c9564b' : '#f5ecd4');
        P(c, tx - 2, 114, 48, 7, i % 2 ? '#a3443c' : '#e3d6b4');
        P(c, tx + 20, 144, 4, 16, '#6f4a28');
      }
      hutanDi(c, '#3d6b34', '#35602c');
      tanah(c, '#c8b088', '#bca47c', '#d4bc94');
      jalan(c, '#d9c48c', '#c2a874', '#c9b07c', '#e3d19e');
    }

    else if (TEMA_NAMA === 'dermagaIkan') {
      P(c, 0, 0, W, 46, '#d8ecf4');
      P(c, 0, 46, W, 46, '#cce4f0');
      P(c, 0, 92, W, 46, '#c0dcea');
      P(c, 0, 138, W, 44, '#b4d6e6');
      P(c, 300, 132, 120, 50, '#8cc2d8');
      P(c, 300, 132, 120, 3, '#a8d4e4');
      P(c, 336, 120, 34, 12, '#6f4a28');
      P(c, 342, 108, 22, 12, '#f5ecd4');
      P(c, 352, 96, 3, 14, '#8a5f38');
      hutanDi(c, '#3f7a4a', '#356d40');
      tanah(c, '#b8b09a', '#aca28c', '#c4bca6');
      jalan(c, '#c8c0a8', '#b2aa92', '#bab29a', '#d4ccb4');
    }

    else if (TEMA_NAMA === 'kandangPagi') {
      P(c, 0, 0, W, 46, '#ffe2b8');
      P(c, 0, 46, W, 46, '#f8d8a8');
      P(c, 0, 92, W, 46, '#f2ce98');
      P(c, 0, 138, W, 44, '#ecc488');
      lingkaran(c, 66, 42, 10, '#fff3cf');
      lingkaran(c, 66, 42, 5, '#fffdf2');
      P(c, 290, 110, 56, 44, '#a3744a');
      P(c, 284, 102, 68, 10, '#7a5230');
      P(c, 306, 128, 18, 26, '#6f4a28');
      for (let i = 0; i < 4; i++) P(c, 40 + i * 24, 136, 5, 22, '#8a5f38');
      P(c, 36, 142, 96, 4, '#8a5f38');
      hutanDi(c, '#4a7a50', '#427048');
      tanah(c, '#b8cc88', '#acc07c', '#c4d894');
      jalan(c, '#d8cca0', '#c0b488', '#c8bc90', '#e2d6ac');
    }

    else if (TEMA_NAMA === 'tokoRoti') {
      P(c, 0, 0, W, 46, '#f8d8b0');
      P(c, 0, 46, W, 46, '#f0cca4');
      P(c, 0, 92, W, 46, '#e8c098');
      P(c, 0, 138, W, 44, '#e0b88c');
      P(c, 310, 84, 66, 62, '#b8874a');
      P(c, 304, 76, 78, 10, '#8a5f38');
      P(c, 324, 100, 16, 14, '#ffd166');
      P(c, 348, 100, 16, 14, '#ffcf94');
      P(c, 330, 128, 20, 18, '#6f4a28');
      P(c, 368, 60, 8, 14, '#9aa6b8');
      lingkaran(c, 372, 52, 5, '#e8e2d4');
      hutanDi(c, '#4a6b3a', '#416030');
      tanah(c, '#c8a878', '#bc9c6c', '#d4b488');
      jalan(c, '#d9c48c', '#c2a874', '#c9b07c', '#e3d19e');
    }

    else if (TEMA_NAMA === 'tamanJungkit') {
      P(c, 0, 0, W, 46, '#cdeefc');
      P(c, 0, 46, W, 46, '#c2e8f8');
      P(c, 0, 92, W, 46, '#d8f2fa');
      P(c, 0, 138, W, 44, '#e2f6fc');
      lingkaran(c, 72, 40, 11, '#fff3cf');
      lingkaran(c, 72, 40, 6, '#fffdf2');
      P(c, 320, 128, 70, 5, '#6f4a28');
      P(c, 351, 133, 8, 22, '#6f4a28');
      P(c, 320, 118, 12, 10, '#e3b23c');
      P(c, 378, 118, 12, 10, '#c9564b');
      hutanDi(c, '#4a8a54', '#427d4a');
      tanah(c, '#8cc46a', '#7eb65e', '#9ad076');
      jalan(c, '#e0d4a8', '#c8bc90', '#d0c498', '#ead8b4');
      bungaDi(c, '#ffd166', '#f2b8cc');
    }

    else if (TEMA_NAMA === 'mejaKoreksi') {
      P(c, 0, 0, W, 46, '#1a2238');
      P(c, 0, 46, W, 46, '#1e2844');
      P(c, 0, 92, W, 46, '#223050');
      P(c, 0, 138, W, 44, '#263458');
      P(c, 320, 96, 60, 66, '#2a3858');
      for (let i = 0; i < 3; i++) P(c, 328 + i * 18, 106, 12, 20, i % 2 ? '#3a4a6e' : '#344262');
      P(c, 60, 108, 8, 30, '#8a5f38');
      P(c, 48, 100, 32, 9, '#5f4426');
      lingkaran(c, 64, 114, 4, '#ffe9a3');
      lingkaran(c, 64, 114, 7, 'rgba(255,233,163,0.25)');
      hutanDi(c, '#101a2c', '#0d1622');
      tanah(c, '#2a3a54', '#24344c', '#30405c');
      jalan(c, '#3a4a66', '#32425a', '#364660', '#42526e');
    }

    else if (TEMA_NAMA === 'gerbangWahana') {
      P(c, 0, 0, W, 46, '#c8f0e8');
      P(c, 0, 46, W, 46, '#bce8e0');
      P(c, 0, 92, W, 46, '#d2f4ec');
      P(c, 0, 138, W, 44, '#dcf8f0');
      P(c, 310, 88, 14, 66, '#c9564b');
      P(c, 376, 88, 14, 66, '#c9564b');
      P(c, 306, 74, 88, 16, '#ffd166');
      teksPx(c, 'WAHANA', 350, 78, '#8a5f38', 5);
      lingkaran(c, 96, 56, 9, '#f2b8cc');
      P(c, 94, 64, 5, 6, '#e8e2d4');
      hutanDi(c, '#3f8f5f', '#357f52');
      tanah(c, '#a8d890', '#9acc84', '#b6e29e');
      jalan(c, '#d9e4c0', '#c2d0a8', '#cad8b0', '#e4eec8');
    }

    else if (TEMA_NAMA === 'landasanLampu') {
      P(c, 0, 0, W, 46, '#12182c');
      P(c, 0, 46, W, 46, '#161e36');
      P(c, 0, 92, W, 46, '#1a2440');
      P(c, 0, 138, W, 44, '#1e2a4a');
      for (let i = 0; i < 6; i++) lingkaran(c, 40 + i * 76, 26 + (i % 2) * 18, 1.5, '#dfe6f5');
      for (let i = 0; i < 4; i++) {
        const lx = 90 + i * 100;
        P(c, lx, 60, 3, 100, '#243252');
        lingkaran(c, lx + 1, 58, 4, '#ffe9a3');
        lingkaran(c, lx + 1, 58, 7, 'rgba(255,233,163,0.2)');
      }
      hutanDi(c, '#0f1626', '#0c1220');
      tanah(c, '#263048', '#202a40', '#2c3650');
      jalan(c, '#364262', '#2e3a58', '#323e5e', '#3e4a6a');
    }

    else if (TEMA_NAMA === 'kiosEs') {
      P(c, 0, 0, W, 46, '#f8d0b0');
      P(c, 0, 46, W, 46, '#f0c6a4');
      P(c, 0, 92, W, 46, '#e8bc98');
      P(c, 0, 138, W, 44, '#e0b28c');
      P(c, 330, 104, 60, 42, '#a3744a');
      P(c, 322, 96, 76, 10, '#c9564b');
      P(c, 342, 118, 14, 20, '#d8f0fa');
      P(c, 364, 118, 14, 20, '#e8f8fc');
      P(c, 336, 88, 52, 8, '#ffd166');
      P(c, 360, 96, 3, 10, '#8a5f38');
      hutanDi(c, '#4a7a50', '#427048');
      tanah(c, '#c8b088', '#bca47c', '#d4bc94');
      jalan(c, '#d9c48c', '#c2a874', '#c9b07c', '#e3d19e');
    }

    else if (TEMA_NAMA === 'balaiTimbangan') {
      P(c, 0, 0, W, 46, '#161e34');
      P(c, 0, 46, W, 46, '#1a2440');
      P(c, 0, 92, W, 46, '#1e2a48');
      P(c, 0, 138, W, 44, '#223050');
      P(c, 190, 56, 100, 126, '#2a3858');
      P(c, 182, 46, 116, 12, '#222e4c');
      P(c, 206, 70, 20, 24, '#ffd166');
      P(c, 254, 70, 20, 24, '#ffcf94');
      P(c, 236, 88, 8, 30, '#ffd166');
      lingkaran(c, 240, 126, 9, '#ffd166');
      for (let i = 0; i < 4; i++) lingkaran(c, 50 + i * 116, 30 + (i % 2) * 20, 1.5, '#dfe6f5');
      hutanDi(c, '#101a30', '#0d1526');
      tanah(c, '#2e3c58', '#283650', '#344262');
      jalan(c, '#42526e', '#3a4a64', '#3e4e6a', '#4a5a76');
    }

    else if (TEMA_NAMA === 'dapurJus') {
      P(c, 0, 0, W, 46, '#f8c896');
      P(c, 0, 46, W, 46, '#f0bc88');
      P(c, 0, 92, W, 46, '#e8b078');
      P(c, 0, 138, W, 44, '#e0a670');
      lingkaran(c, 74, 64, 10, '#ff9d6b');
      lingkaran(c, 74, 64, 5, '#ffd166');
      P(c, 320, 118, 60, 10, '#a3744a');
      P(c, 326, 106, 8, 12, '#ffb86b');
      P(c, 338, 106, 8, 12, '#ff9d9d');
      P(c, 350, 106, 8, 12, '#ffd166');
      lingkaran(c, 180, 120, 16, '#357a43');
      lingkaran(c, 168, 128, 10, '#2f6b3a');
      lingkaran(c, 192, 128, 10, '#2f6b3a');
      for (let i = 0; i < 3; i++) lingkaran(c, 172 + i * 10, 124 + (i % 2) * 5, 2.5, '#ff8f5a');
      hutanDi(c, '#3d6b34', '#35602c');
      tanah(c, '#c8b088', '#bca47c', '#d4bc94');
      jalan(c, '#d9c48c', '#c2a874', '#c9b07c', '#e3d19e');
    }

    else if (TEMA_NAMA === 'menaraPeta') {
      P(c, 0, 0, W, 46, '#cfeef8');
      P(c, 0, 46, W, 46, '#c2e6f4');
      P(c, 0, 92, W, 46, '#b6def0');
      P(c, 0, 138, W, 44, '#aad6ea');
      P(c, 300, 104, 12, 78, '#8a5f38');
      P(c, 288, 92, 36, 10, '#a3744a');
      P(c, 304, 82, 3, 12, '#6f4a28');
      P(c, 304, 80, 14, 9, '#ffd166');
      P(c, 316, 130, 8, 52, '#8a5f38');
      P(c, 292, 148, 44, 4, '#a3744a');
      hutanDi(c, '#4a8a56', '#41804c');
      tanah(c, '#b4d8a0', '#a8cc94', '#c0e2ac');
      jalan(c, '#d0e0b0', '#bacfa0', '#c2d6a6', '#dcebb8');
    }

    else if (TEMA_NAMA === 'kiosPermen') {
      P(c, 0, 0, W, 46, '#ffe4ec');
      P(c, 0, 46, W, 46, '#ffdde6');
      P(c, 0, 92, W, 46, '#f8d4e0');
      P(c, 0, 138, W, 44, '#f2ccd8');
      lingkaran(c, 66, 42, 10, '#fff3cf');
      lingkaran(c, 66, 42, 5, '#fffdf2');
      P(c, 300, 118, 54, 28, '#f5ecd4');
      for (let i = 0; i < 3; i++) P(c, 296 + i * 20, 108, 18, 9, i % 2 ? '#f08fa8' : '#fbdce4');
      P(c, 324, 126, 5, 20, '#8a5f38');
      P(c, 306, 132, 42, 4, '#a3744a');
      for (let i = 0; i < 4; i++) lingkaran(c, 48 + i * 72, 60 + (i % 2) * 22, 2.5, '#f7b8cc');
      hutanDi(c, '#4f8a5e', '#467e54');
      tanah(c, '#e0ccba', '#d4c0ac', '#e8d4c2');
      jalan(c, '#e8d8c0', '#d2c2a8', '#dacab0', '#f0e2ca');
    }

    else if (TEMA_NAMA === 'dapurKue') {
      P(c, 0, 0, W, 46, '#1a2440');
      P(c, 0, 46, W, 46, '#1e2a48');
      P(c, 0, 92, W, 46, '#223050');
      P(c, 0, 138, W, 44, '#263658');
      lingkaran(c, 60, 40, 8, '#fff3cf');
      lingkaran(c, 56, 38, 8, '#1a2440');
      for (let i = 0; i < 5; i++) lingkaran(c, 110 + i * 70, 30 + (i % 2) * 18, 1.5, '#dfe6f5');
      P(c, 288, 84, 84, 66, '#5f4426');
      P(c, 282, 76, 96, 10, '#4a3520');
      P(c, 318, 62, 10, 14, '#3d2c18');
      P(c, 296, 96, 22, 20, '#ffd166');
      P(c, 340, 96, 22, 20, '#ffcf94');
      P(c, 320, 118, 12, 32, '#4a3520');
      hutanDi(c, '#121c34', '#0e1628');
      tanah(c, '#2c3854', '#26324c', '#323e5a');
      jalan(c, '#3e4c68', '#364460', '#3a4864', '#46546e');
    }

    else if (TEMA_NAMA === 'lintasanLari') {
      P(c, 0, 0, W, 46, '#d4f2fa');
      P(c, 0, 46, W, 46, '#c8ecf6');
      P(c, 0, 92, W, 46, '#bce4f0');
      P(c, 0, 138, W, 44, '#b0dcea');
      P(c, 296, 128, 84, 54, '#d8787a');
      for (let i = 0; i < 4; i++) P(c, 296, 136 + i * 12, 84, 2, '#f5ecd4');
      P(c, 372, 112, 4, 18, '#8a5f38');
      P(c, 376, 112, 16, 10, '#ffd166');
      P(c, 336, 100, 26, 16, '#f5ecd4');
      P(c, 332, 96, 34, 5, '#a3744a');
      hutanDi(c, '#4a8a56', '#41804c');
      tanah(c, '#b8d898', '#accc8c', '#c4e2a4');
      jalan(c, '#e0d0a8', '#ccbc94', '#d4c49c', '#ecdcb4');
    }

    else if (TEMA_NAMA === 'kotakDonat') {
      P(c, 0, 0, W, 46, '#f8d4c4');
      P(c, 0, 46, W, 46, '#f2c8b6');
      P(c, 0, 92, W, 46, '#ecbca6');
      P(c, 0, 138, W, 44, '#e6b096');
      lingkaran(c, 82, 70, 12, '#ff9d6b');
      lingkaran(c, 82, 70, 6, '#ffd166');
      P(c, 304, 112, 52, 34, '#f5d8b8');
      P(c, 298, 102, 64, 10, '#e8a86b');
      for (let i = 0; i < 3; i++) P(c, 302 + i * 20, 100, 16, 4, '#f8c48c');
      P(c, 328, 122, 5, 24, '#8a5f38');
      lingkaran(c, 318, 120, 3.5, '#c98a5a');
      lingkaran(c, 318, 120, 1.5, '#f5d8b8');
      hutanDi(c, '#42704a', '#3a6642');
      tanah(c, '#d8bca0', '#ccb094', '#e0c4a8');
      jalan(c, '#e8d4b4', '#d2be9e', '#dac6a6', '#f2debe');
    }

    else if (TEMA_NAMA === 'tokoMiniatur') {
      P(c, 0, 0, W, 46, '#f8d0a0');
      P(c, 0, 46, W, 46, '#f0c494');
      P(c, 0, 92, W, 46, '#e8b886');
      P(c, 0, 138, W, 44, '#e0ac78');
      lingkaran(c, 70, 60, 11, '#ff9d6b');
      lingkaran(c, 70, 60, 5, '#ffd166');
      P(c, 290, 82, 80, 68, '#b8874a');
      P(c, 284, 74, 92, 10, '#8a5f38');
      P(c, 298, 96, 20, 16, '#ffd166');
      P(c, 342, 96, 20, 16, '#ffcf94');
      P(c, 322, 104, 14, 46, '#6f4a28');
      P(c, 296, 118, 68, 3, '#a3744a');
      for (let i = 0; i < 4; i++) P(c, 300 + i * 16, 112, 8, 6, i % 2 ? '#e0766a' : '#6fb8e8');
      hutanDi(c, '#3d6b3f', '#355f37');
      tanah(c, '#d4b48c', '#c8a880', '#dcc098');
      jalan(c, '#e2c69c', '#ccb090', '#d4b894', '#eed2a8');
    }

    else if (TEMA_NAMA === 'sumurDesa') {
      P(c, 0, 0, W, 46, '#e8f8e0');
      P(c, 0, 46, W, 46, '#dcf2d4');
      P(c, 0, 92, W, 46, '#d0ecc8');
      P(c, 0, 138, W, 44, '#c4e6bc');
      lingkaran(c, 64, 40, 10, '#fff3cf');
      lingkaran(c, 64, 40, 5, '#fffdf2');
      P(c, 290, 104, 14, 22, '#8a5f38');
      P(c, 332, 104, 14, 22, '#8a5f38');
      P(c, 282, 94, 72, 12, '#a3744a');
      P(c, 288, 86, 60, 9, '#7a5230');
      P(c, 316, 106, 3, 14, '#5f4426');
      P(c, 312, 120, 11, 8, '#6f4a28');
      P(c, 356, 112, 34, 26, '#c9985a');
      P(c, 352, 104, 42, 9, '#7a5230');
      hutanDi(c, '#4f8a5e', '#467e54');
      tanah(c, '#bcd8a0', '#b0cc94', '#c8e4ac');
      jalan(c, '#d4e4b0', '#bed49c', '#c6dca2', '#e0f0bc');
    }

    else if (TEMA_NAMA === 'dapurWarung') {
      P(c, 0, 0, W, 46, '#16283a');
      P(c, 0, 46, W, 46, '#1a3044');
      P(c, 0, 92, W, 46, '#1e384e');
      P(c, 0, 138, W, 44, '#22405a');
      for (let i = 0; i < 5; i++) lingkaran(c, 60 + i * 84, 28 + (i % 2) * 20, 1.5, '#dfe6f5');
      P(c, 286, 88, 86, 62, '#3d2c18');
      P(c, 280, 80, 98, 10, '#2e2014');
      P(c, 296, 102, 18, 22, '#ffd166');
      P(c, 338, 102, 18, 22, '#ffcf94');
      P(c, 322, 104, 12, 46, '#241a0e');
      P(c, 276, 96, 8, 6, '#ffd166');
      P(c, 372, 96, 8, 6, '#ffd166');
      hutanDi(c, '#101e2e', '#0c1826');
      tanah(c, '#26384a', '#203040', '#2c3e50');
      jalan(c, '#36485c', '#2e4052', '#324456', '#3e5064');
    }

    else if (TEMA_NAMA === 'petaKarun') {
      P(c, 0, 0, W, 46, '#1e1a3c');
      P(c, 0, 46, W, 46, '#241e46');
      P(c, 0, 92, W, 46, '#2a2450');
      P(c, 0, 138, W, 44, '#302a5a');
      for (let i = 0; i < 6; i++) lingkaran(c, 46 + i * 76, 26 + (i % 2) * 16, 1.5, '#efe8ff');
      lingkaran(c, 96, 52, 9, '#efe8ff');
      lingkaran(c, 96, 52, 7, '#fffdf2');
      P(c, 280, 74, 100, 76, '#1c1834');
      lingkaran(c, 330, 74, 38, '#14112a');
      P(c, 292, 92, 6, 58, '#1c1834');
      lingkaran(c, 306, 128, 3, '#ffd166');
      lingkaran(c, 318, 132, 3, '#ffcf94');
      lingkaran(c, 330, 128, 3, '#ffd166');
      hutanDi(c, '#161230', '#120e28');
      tanah(c, '#2e2a52', '#282448', '#342e5c');
      jalan(c, '#403a68', '#38325c', '#3c3658', '#484272');
    }

    else if (TEMA_NAMA === 'gerbangSiku') {
      P(c, 0, 0, W, 46, '#f8d8a8');
      P(c, 0, 46, W, 46, '#f0cc98');
      P(c, 0, 92, W, 46, '#e8c088');
      P(c, 0, 138, W, 44, '#e0b478');
      lingkaran(c, 68, 58, 11, '#ff9d6b');
      lingkaran(c, 68, 58, 5, '#ffd166');
      P(c, 282, 88, 12, 94, '#7a5a44');
      P(c, 366, 88, 12, 94, '#7a5a44');
      P(c, 274, 80, 28, 10, '#8a6a50');
      P(c, 358, 80, 28, 10, '#8a6a50');
      P(c, 294, 118, 72, 64, '#93745a');
      P(c, 322, 130, 22, 52, '#4a3a2c');
      for (let i = 0; i < 4; i++) P(c, 278 + i * 34, 76, 8, 5, '#8a6a50');
      hutanDi(c, '#5a7a48', '#50703e');
      tanah(c, '#d4c498', '#c8b88c', '#e0d0a4');
      jalan(c, '#e2d2a8', '#ccbc92', '#d4c49a', '#eee0b8');
    }

    else if (TEMA_NAMA === 'jembatanRata') {
      P(c, 0, 0, W, 46, '#d4f0fa');
      P(c, 0, 46, W, 46, '#c8e8f4');
      P(c, 0, 92, W, 46, '#bce0ee');
      P(c, 0, 138, W, 44, '#b0d8e8');
      P(c, 276, 132, 104, 8, '#8a6f4a');
      P(c, 296, 140, 8, 42, '#7a5f3a');
      P(c, 348, 140, 8, 42, '#7a5f3a');
      P(c, 272, 124, 6, 8, '#a3855a');
      P(c, 380, 124, 6, 8, '#a3855a');
      hutanDi(c, '#4a8a56', '#41804c');
      tanah(c, '#b4d8a0', '#a8cc94', '#c0e2ac');
      jalan(c, '#d0e0b0', '#bacfa0', '#c2d6a6', '#dcebb8');
    }

    else if (TEMA_NAMA === 'putaranKincir') {
      P(c, 0, 0, W, 46, '#d8f4fa');
      P(c, 0, 46, W, 46, '#cceef4');
      P(c, 0, 92, W, 46, '#c0e8ee');
      P(c, 0, 138, W, 44, '#b4e0e6');
      P(c, 316, 98, 12, 84, '#e8dcc8');
      P(c, 310, 90, 24, 9, '#d8c8b0');
      P(c, 300, 66, 3, 34, '#c8b89c');
      P(c, 340, 66, 3, 34, '#c8b89c');
      P(c, 306, 78, 34, 3, '#c8b89c');
      P(c, 306, 88, 34, 3, '#c8b89c');
      lingkaran(c, 321, 84, 3, '#a3855a');
      hutanDi(c, '#4a8a56', '#41804c');
      tanah(c, '#b8dca0', '#acd094', '#c4e4ac');
      jalan(c, '#d4e4b0', '#bed49c', '#c6dca2', '#e0f0bc');
    }

    else if (TEMA_NAMA === 'mejaKertas') {
      P(c, 0, 0, W, 46, '#1a2240');
      P(c, 0, 46, W, 46, '#1e2848');
      P(c, 0, 92, W, 46, '#222e50');
      P(c, 0, 138, W, 44, '#263458');
      for (let i = 0; i < 5; i++) lingkaran(c, 64 + i * 84, 30 + (i % 2) * 18, 1.5, '#dfe6f5');
      lingkaran(c, 96, 52, 8, '#fff3cf');
      lingkaran(c, 93, 50, 8, '#1a2240');
      P(c, 288, 108, 84, 46, '#3d3050');
      P(c, 282, 100, 96, 9, '#2e2440');
      P(c, 300, 118, 20, 18, '#ffd166');
      P(c, 338, 118, 20, 18, '#ffcf94');
      hutanDi(c, '#121a34', '#0e1428');
      tanah(c, '#2a3450', '#242e48', '#303a58');
      jalan(c, '#3a4462', '#323c58', '#36405c', '#424c6a');
    }

    else if (TEMA_NAMA === 'jendelaRumah') {
      P(c, 0, 0, W, 46, '#f8c8a0');
      P(c, 0, 46, W, 46, '#f0bc94');
      P(c, 0, 92, W, 46, '#e8b088');
      P(c, 0, 138, W, 44, '#e0a47c');
      lingkaran(c, 78, 64, 12, '#ff9d6b');
      lingkaran(c, 78, 64, 6, '#ffd166');
      P(c, 290, 96, 80, 64, '#a3744a');
      P(c, 284, 88, 92, 10, '#7a5230');
      P(c, 300, 112, 22, 20, '#ffd166');
      P(c, 342, 112, 22, 20, '#ffcf94');
      P(c, 322, 116, 14, 44, '#5f4426');
      P(c, 344, 84, 8, 16, '#6f4a28');
      hutanDi(c, '#3d6b34', '#35602c');
      tanah(c, '#d4b48c', '#c8a880', '#dcc098');
      jalan(c, '#e2c69c', '#ccb090', '#d4b894', '#eed2a8');
    }

    else if (TEMA_NAMA === 'relKereta') {
      P(c, 0, 0, W, 46, '#e8f0f8');
      P(c, 0, 46, W, 46, '#dce8f2');
      P(c, 0, 92, W, 46, '#d0e0ec');
      P(c, 0, 138, W, 44, '#c4d8e6');
      lingkaran(c, 64, 40, 10, '#fff3cf');
      lingkaran(c, 64, 40, 5, '#fffdf2');
      P(c, 292, 88, 66, 30, '#3d6a70');
      P(c, 286, 80, 78, 9, '#2e565c');
      P(c, 300, 96, 12, 12, '#b8dce0');
      P(c, 322, 96, 12, 12, '#b8dce0');
      P(c, 288, 118, 84, 4, '#8a5f38');
      for (let i = 0; i < 9; i++) P(c, 292 + i * 9, 122, 6, 2, '#6f4a28');
      hutanDi(c, '#4f8a5e', '#467e54');
      tanah(c, '#c8d4a8', '#bcc898', '#d4e0b4');
      jalan(c, '#d8e2b8', '#c2ce9c', '#cad6a4', '#e4eebe');
    }

    else if (TEMA_NAMA === 'lantaiUbin') {
      P(c, 0, 0, W, 46, '#e8f4fc');
      P(c, 0, 46, W, 46, '#dcf0f8');
      P(c, 0, 92, W, 46, '#d0eaf4');
      P(c, 0, 138, W, 44, '#c4e4f0');
      lingkaran(c, 70, 42, 10, '#fff3cf');
      lingkaran(c, 70, 42, 5, '#fffdf2');
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 2; j++)
          P(c, 296 + i * 18, 108 + j * 18, 16, 16, (i + j) % 2 ? '#f0f6fa' : '#d8e8f0');
      }
      P(c, 292, 102, 88, 3, '#a8bcd0');
      hutanDi(c, '#4a8a56', '#41804c');
      tanah(c, '#c4e0d0', '#b8d4c4', '#d0ecdc');
      jalan(c, '#dcf0e0', '#c6e0d0', '#cee8d8', '#e8f8ec');
    }

    else if (TEMA_NAMA === 'bengkelMeja') {
      P(c, 0, 0, W, 46, '#f8e0b8');
      P(c, 0, 46, W, 46, '#f0d4a8');
      P(c, 0, 92, W, 46, '#e8c898');
      P(c, 0, 138, W, 44, '#e0bc88');
      lingkaran(c, 72, 56, 11, '#ff9d6b');
      lingkaran(c, 72, 56, 5, '#ffd166');
      P(c, 286, 88, 86, 68, '#b8874a');
      P(c, 280, 80, 98, 10, '#8a5f38');
      P(c, 298, 100, 20, 18, '#ffd166');
      P(c, 342, 100, 20, 18, '#ffcf94');
      P(c, 322, 106, 14, 50, '#6f4a28');
      for (let i = 0; i < 3; i++) P(c, 292 + i * 26, 92, 3, 8, '#5f4426');
      hutanDi(c, '#3d6b3f', '#355f37');
      tanah(c, '#d8bc94', '#ccb088', '#e4c8a0');
      jalan(c, '#e2c89c', '#ccb292', '#d4ba9c', '#eed4ac');
    }

    else if (TEMA_NAMA === 'dindingTangga') {
      P(c, 0, 0, W, 46, '#16243c');
      P(c, 0, 46, W, 46, '#1a2a46');
      P(c, 0, 92, W, 46, '#1e3050');
      P(c, 0, 138, W, 44, '#22365a');
      for (let i = 0; i < 5; i++) lingkaran(c, 58 + i * 88, 28 + (i % 2) * 16, 1.5, '#dfe6f5');
      P(c, 292, 60, 88, 122, '#2a3c5e');
      P(c, 286, 52, 100, 9, '#223050');
      P(c, 310, 96, 18, 20, '#ffd166');
      P(c, 344, 120, 18, 20, '#ffcf94');
      P(c, 306, 78, 3, 12, '#4a5a78');
      P(c, 318, 86, 3, 12, '#4a5a78');
      P(c, 330, 94, 3, 12, '#4a5a78');
      hutanDi(c, '#101c30', '#0c1828');
      tanah(c, '#263652', '#20304a', '#2c3e5a');
      jalan(c, '#36485c', '#2e4052', '#324456', '#3e5064');
    }

    else if (TEMA_NAMA === 'balaiGeometri') {
      P(c, 0, 0, W, 46, '#1c1a3a');
      P(c, 0, 46, W, 46, '#221e44');
      P(c, 0, 92, W, 46, '#28244e');
      P(c, 0, 138, W, 44, '#2e2a58');
      for (let i = 0; i < 6; i++) lingkaran(c, 48 + i * 78, 26 + (i % 2) * 14, 1.5, '#efe8ff');
      lingkaran(c, 92, 50, 9, '#efe8ff');
      lingkaran(c, 92, 50, 7, '#fffdf2');
      P(c, 286, 76, 12, 106, '#3a3260');
      P(c, 362, 76, 12, 106, '#3a3260');
      P(c, 278, 66, 104, 11, '#4a4078');
      P(c, 324, 52, 3, 14, '#4a4078');
      P(c, 327, 52, 12, 8, '#ffd166');
      P(c, 292, 108, 8, 8, '#ffd166');
      P(c, 360, 108, 8, 8, '#ffd166');
      hutanDi(c, '#141228', '#100e22');
      tanah(c, '#2c2850', '#26224a', '#322e58');
      jalan(c, '#3e3a68', '#36325e', '#3a3664', '#464274');
    }

    else if (TEMA_NAMA === 'mejaKado') {
      P(c, 0, 0, W, 46, '#cdeafc');
      P(c, 0, 46, W, 46, '#c2e2f6');
      P(c, 0, 92, W, 46, '#b6daf0');
      P(c, 0, 138, W, 44, '#aad2ea');
      P(c, 40, 96, 34, 26, '#e8f4fc');
      P(c, 56, 96, 3, 26, '#b4a07c');
      P(c, 40, 108, 34, 3, '#b4a07c');
      P(c, 340, 92, 44, 30, '#c8a06a');
      P(c, 344, 98, 16, 5, '#ff9db8');
      P(c, 364, 98, 16, 5, '#9fd8e8');
      P(c, 344, 108, 16, 5, '#ffd166');
      P(c, 364, 108, 16, 5, '#a8e6a0');
      hutanDi(c, '#588a52', '#4e8048');
      tanah(c, '#d8c8a0', '#ccbc94', '#e2d2aa');
      jalan(c, '#e0d0a8', '#cac098', '#d2c89e', '#eee0bc');
    }

    else if (TEMA_NAMA === 'lantaiJaring') {
      P(c, 0, 0, W, 46, '#e4f6d8');
      P(c, 0, 46, W, 46, '#daf0cc');
      P(c, 0, 92, W, 46, '#ceeac0');
      P(c, 0, 138, W, 44, '#c2e4b4');
      P(c, 60, 108, 24, 20, '#c8a06a');
      P(c, 60, 100, 24, 8, '#d8b078');
      P(c, 92, 116, 18, 12, '#c8a06a');
      P(c, 330, 104, 26, 24, '#c8a06a');
      P(c, 330, 96, 26, 8, '#d8b078');
      hutanDi(c, '#5a9058', '#508650');
      tanah(c, '#c8dc9c', '#bcd090', '#d4e6a8');
      jalan(c, '#d8e6b4', '#c2d4a4', '#ccdcb0', '#e6f0c4');
    }

    else if (TEMA_NAMA === 'dapurSusun') {
      P(c, 0, 0, W, 46, '#f8d8a8');
      P(c, 0, 46, W, 46, '#f0cc98');
      P(c, 0, 92, W, 46, '#e8c088');
      P(c, 0, 138, W, 44, '#e0b478');
      lingkaran(c, 92, 58, 10, '#ffb066');
      P(c, 320, 96, 60, 6, '#a0784a');
      P(c, 328, 78, 12, 18, '#e8f0f4');
      P(c, 326, 74, 16, 4, '#c8d8e0');
      P(c, 352, 82, 10, 14, '#ffd9c4');
      hutanDi(c, '#6a6a3e', '#5e6036');
      tanah(c, '#d8c498', '#ccb88c', '#e0cfa4');
      jalan(c, '#e2cea6', '#ccba8e', '#d4c298', '#eee0b8');
    }

    else if (TEMA_NAMA === 'atapPrisma') {
      P(c, 0, 0, W, 46, '#f8b884');
      P(c, 0, 46, W, 46, '#f0ac78');
      P(c, 0, 92, W, 46, '#e8a06c');
      P(c, 0, 138, W, 44, '#e09460');
      lingkaran(c, 84, 66, 11, '#ff8850');
      P(c, 296, 118, 60, 30, '#93745a');
      for (let i = 0; i < 5; i++) P(c, 296 + i * 6, 114 - i * 5, 60 - i * 12, 5, '#7a5a44');
      P(c, 322, 130, 12, 18, '#4a3a2c');
      hutanDi(c, '#5a6a40', '#4e6036');
      tanah(c, '#d4b88c', '#c8ac80', '#dcc498');
      jalan(c, '#dcc4a0', '#c6b08a', '#ceb894', '#e8d4b0');
    }

    else if (TEMA_NAMA === 'rakKaleng') {
      P(c, 0, 0, W, 46, '#d8f0fa');
      P(c, 0, 46, W, 46, '#cce8f4');
      P(c, 0, 92, W, 46, '#c0e0ee');
      P(c, 0, 138, W, 44, '#b4d8e8');
      P(c, 316, 84, 64, 6, '#8a6f4a');
      P(c, 316, 116, 64, 6, '#8a6f4a');
      for (let i = 0; i < 5; i++) {
        P(c, 320 + i * 12, 68, 9, 16, '#c8d8e0');
        P(c, 320 + i * 12, 68, 9, 4, '#e8788a');
        P(c, 320 + i * 12, 100, 9, 16, '#c8d8e0');
        P(c, 320 + i * 12, 100, 9, 4, '#7dc8a0');
      }
      hutanDi(c, '#4e8a52', '#447e48');
      tanah(c, '#c4d8b0', '#b8cca4', '#d0e0bc');
      jalan(c, '#d2e0b8', '#bccfa4', '#c4d8ac', '#deebc4');
    }

    else if (TEMA_NAMA === 'bengkelGulung') {
      P(c, 0, 0, W, 46, '#1c1a3a');
      P(c, 0, 46, W, 46, '#221e44');
      P(c, 0, 92, W, 46, '#28244e');
      P(c, 0, 138, W, 44, '#2e2a58');
      for (let i = 0; i < 5; i++) lingkaran(c, 60 + i * 90, 30 + (i % 2) * 12, 1.5, '#efe8ff');
      P(c, 70, 84, 8, 8, '#ffd166');
      P(c, 73, 76, 2, 8, '#4a4078');
      ctx.globalAlpha = 0.14; lingkaran(c, 74, 92, 14, '#ffd166'); ctx.globalAlpha = 1;
      P(c, 350, 100, 44, 8, '#4a4078');
      P(c, 354, 108, 4, 24, '#3a3260');
      P(c, 386, 108, 4, 24, '#3a3260');
      hutanDi(c, '#141228', '#100e22');
      tanah(c, '#2c2850', '#26224a', '#322e58');
      jalan(c, '#3e3a68', '#36325e', '#3a3664', '#464274');
    }

    else if (TEMA_NAMA === 'bukitPasir') {
      P(c, 0, 0, W, 46, '#f6ecd0');
      P(c, 0, 46, W, 46, '#f0e4c4');
      P(c, 0, 92, W, 46, '#eadcba');
      P(c, 0, 138, W, 44, '#e4d4b0');
      lingkaran(c, 70, 54, 9, '#ffd166');
      lingkaran(c, 250, 130, 26, '#e8d4a0');
      lingkaran(c, 250, 146, 30, '#e0cc94');
      lingkaran(c, 356, 138, 20, '#e8d4a0');
      hutanDi(c, '#6a8a4e', '#5e7e44');
      tanah(c, '#ecdcb4', '#e0d0a4', '#f0e2be');
      jalan(c, '#f0e2c0', '#dccca0', '#e4d4b0', '#f8ecc8');
    }

    else if (TEMA_NAMA === 'mejaLiter') {
      P(c, 0, 0, W, 46, '#d8f2fa');
      P(c, 0, 46, W, 46, '#ccecf6');
      P(c, 0, 92, W, 46, '#c0e4f0');
      P(c, 0, 138, W, 44, '#b4dcea');
      P(c, 44, 96, 36, 28, '#e8f6fc');
      P(c, 61, 96, 3, 28, '#8ab4c4');
      P(c, 44, 109, 36, 3, '#8ab4c4');
      P(c, 330, 104, 24, 20, '#a8d8e8');
      P(c, 336, 96, 12, 8, '#a8d8e8');
      hutanDi(c, '#528a58', '#487e4e');
      tanah(c, '#c0dcd4', '#b4d0c8', '#cce2da');
      jalan(c, '#d4e8e0', '#bed8cc', '#c6ded4', '#e0f0e6');
    }

    else if (TEMA_NAMA === 'tokoAkuarium') {
      P(c, 0, 0, W, 46, '#f4c098');
      P(c, 0, 46, W, 46, '#ecb48c');
      P(c, 0, 92, W, 46, '#e4a880');
      P(c, 0, 138, W, 44, '#dc9c74');
      lingkaran(c, 96, 60, 10, '#ff9d6b');
      P(c, 300, 88, 80, 40, '#6a5a6e');
      P(c, 306, 96, 30, 22, '#a8e0e8');
      P(c, 342, 96, 30, 22, '#a8e0e8');
      for (let i = 0; i < 3; i++) lingkaran(c, 314 + i * 10, 106, 1.5, '#ff9d6b');
      hutanDi(c, '#5a5640', '#4e4c36');
      tanah(c, '#c8b090', '#bca484', '#d0b89a');
      jalan(c, '#d2ba9c', '#bca686', '#c4ae90', '#dec8aa');
    }

    else if (TEMA_NAMA === 'gudangKardus') {
      P(c, 0, 0, W, 46, '#201c3a');
      P(c, 0, 46, W, 46, '#262244');
      P(c, 0, 92, W, 46, '#2c284e');
      P(c, 0, 138, W, 44, '#322e58');
      for (let i = 0; i < 5; i++) lingkaran(c, 70 + i * 86, 26 + (i % 2) * 12, 1.5, '#efe8ff');
      P(c, 320, 92, 60, 5, '#4a4078');
      P(c, 320, 122, 60, 5, '#4a4078');
      P(c, 324, 76, 14, 14, '#c8a06a');
      P(c, 342, 80, 12, 10, '#b8905a');
      P(c, 326, 104, 12, 16, '#c8a06a');
      P(c, 344, 108, 10, 12, '#b8905a');
      hutanDi(c, '#16142c', '#121024');
      tanah(c, '#302c54', '#2a264c', '#36325e');
      jalan(c, '#424068', '#3a3660', '#3e3a64', '#4a4672');
    }

    else if (TEMA_NAMA === 'pertigaanNol') {
      P(c, 0, 0, W, 46, '#e8f8ec');
      P(c, 0, 46, W, 46, '#dcf2e2');
      P(c, 0, 92, W, 46, '#d0ecda');
      P(c, 0, 138, W, 44, '#c4e6d2');
      lingkaran(c, 72, 52, 9, '#ffd166');
      P(c, 320, 96, 40, 26, '#dcecd0');
      P(c, 336, 88, 8, 10, '#b4a07c');
      hutanDi(c, '#5a9058', '#508650');
      tanah(c, '#c8dc9c', '#bcd090', '#d4e6a8');
      jalan(c, '#d8e6b4', '#c2d4a4', '#ccdcb0', '#e6f0c4');
      P(c, 0, 240, W, 3, '#a8b878');
      P(c, 236, 236, 3, 24, '#a8b878');
      P(c, 232, 240, 11, 3, '#8a6f4a');
    }

    else if (TEMA_NAMA === 'tanggaTitik') {
      P(c, 0, 0, W, 46, '#fdeec8');
      P(c, 0, 46, W, 46, '#f8e4b4');
      P(c, 0, 92, W, 46, '#f2dca4');
      P(c, 0, 138, W, 44, '#ecd494');
      lingkaran(c, 380, 50, 9, '#ffcf66');
      P(c, 40, 100, 34, 24, '#e8f4fc');
      P(c, 56, 100, 3, 24, '#b4a07c');
      hutanDi(c, '#5e8a52', '#527e48');
      tanah(c, '#d4d8a0', '#c8cc94', '#dce0aa');
      jalan(c, '#dee2b0', '#c8cc9a', '#d0d4a4', '#e8ecbc');
      for (let i = 0; i < 6; i++) {
        P(c, 60 + i * 52, 246, 1, 14, '#b8bc88');
        P(c, 30 + i * 84, 240 + (i % 2) * 8, 2, 10, '#b8bc88');
      }
    }

    else if (TEMA_NAMA === 'bazarEmpatPojok') {
      P(c, 0, 0, W, 46, '#f8c8a0');
      P(c, 0, 46, W, 46, '#f0bc94');
      P(c, 0, 92, W, 46, '#e8b088');
      P(c, 0, 138, W, 44, '#e0a47c');
      lingkaran(c, 88, 62, 10, '#ff9d6b');
      P(c, 330, 98, 50, 24, '#c8906a');
      P(c, 330, 92, 50, 7, '#a86a4a');
      hutanDi(c, '#5e6a40', '#526036');
      tanah(c, '#d8c0a0', '#ccb494', '#e0caa8');
      jalan(c, '#dcc4a4', '#c6ae8e', '#ceb694', '#e8d0b0');
      P(c, 0, 244, W, 3, '#b89a76');
      P(c, 240, 236, 3, 24, '#b89a76');
    }

    else if (TEMA_NAMA === 'galeriTitik') {
      P(c, 0, 0, W, 46, '#1c1a3a');
      P(c, 0, 46, W, 46, '#221e44');
      P(c, 0, 92, W, 46, '#28244e');
      P(c, 0, 138, W, 44, '#2e2a58');
      for (let i = 0; i < 5; i++) lingkaran(c, 60 + i * 90, 30 + (i % 2) * 12, 1.5, '#efe8ff');
      P(c, 76, 88, 8, 8, '#ffd166');
      P(c, 79, 80, 2, 8, '#4a4078');
      ctx.globalAlpha = 0.14; lingkaran(c, 80, 96, 14, '#ffd166'); ctx.globalAlpha = 1;
      hutanDi(c, '#141228', '#100e22');
      tanah(c, '#2c2850', '#26224a', '#322e58');
      jalan(c, '#3e3a68', '#36325e', '#3a3664', '#464274');
    }

    else if (TEMA_NAMA === 'arsipBenang') {
      P(c, 0, 0, W, 46, '#eef8d8');
      P(c, 0, 46, W, 46, '#e4f2cc');
      P(c, 0, 92, W, 46, '#d8ecbe');
      P(c, 0, 138, W, 44, '#cce4b0');
      P(c, 44, 96, 36, 28, '#f6fce8');
      P(c, 61, 96, 3, 28, '#a4b488');
      P(c, 330, 104, 30, 20, '#c8a06a');
      P(c, 334, 98, 22, 6, '#d8b078');
      hutanDi(c, '#588a4e', '#4c7e44');
      tanah(c, '#ccd8a8', '#c0cc9c', '#d8e4b4');
      jalan(c, '#d8e2b8', '#c2cea4', '#cad6b0', '#e4eec0');
    }

    else if (TEMA_NAMA === 'jalanTanjak') {
      P(c, 0, 0, W, 46, '#dcf0fa');
      P(c, 0, 46, W, 46, '#d0e8f4');
      P(c, 0, 92, W, 46, '#c4e0ee');
      P(c, 0, 138, W, 44, '#b8d8e8');
      lingkaran(c, 90, 52, 9, '#ffd166');
      gunungDi(c, 350, 96, 90, 182, '#8ab088');
      gunungDi(c, 350, 128, 46, 182, '#78a078');
      hutanDi(c, '#528a58', '#487e4e');
      tanah(c, '#c4d8b0', '#b8cca4', '#d0e0bc');
      jalan(c, '#d2e0b8', '#bccfa4', '#c4d8ac', '#deebc4');
    }

    else if (TEMA_NAMA === 'papanPerjalanan') {
      P(c, 0, 0, W, 46, '#1e1c40');
      P(c, 0, 46, W, 46, '#242048');
      P(c, 0, 92, W, 46, '#2a2650');
      P(c, 0, 138, W, 44, '#302c58');
      for (let i = 0; i < 5; i++) lingkaran(c, 70 + i * 86, 26 + (i % 2) * 12, 1.5, '#efe8ff');
      P(c, 320, 92, 52, 30, '#3a3468');
      P(c, 316, 86, 60, 7, '#4a4078');
      P(c, 344, 74, 3, 14, '#4a4078');
      P(c, 338, 78, 15, 3, '#ffd166');
      hutanDi(c, '#16142c', '#121024');
      tanah(c, '#302c54', '#2a264c', '#36325e');
      jalan(c, '#424068', '#3a3660', '#3e3a64', '#4a4672');
    }

    else if (TEMA_NAMA === 'gerbangAwal') {
      P(c, 0, 0, W, 46, '#f8c8a0');
      P(c, 0, 46, W, 46, '#f0bc94');
      P(c, 0, 92, W, 46, '#e8b088');
      P(c, 0, 138, W, 44, '#e0a47c');
      lingkaran(c, 96, 62, 10, '#ff9d6b');
      P(c, 316, 100, 44, 22, '#93745a');
      P(c, 336, 92, 10, 8, '#7a5a44');
      hutanDi(c, '#5a6a40', '#4e6036');
      tanah(c, '#d4b88c', '#c8ac80', '#dcc498');
      jalan(c, '#dcc4a0', '#c6b08a', '#ceb894', '#e8d4b0');
    }

    else if (TEMA_NAMA === 'tamanBenderaX') {
      P(c, 0, 0, W, 46, '#e4f6d8');
      P(c, 0, 46, W, 46, '#daf0cc');
      P(c, 0, 92, W, 46, '#ceeac0');
      P(c, 0, 138, W, 44, '#c2e4b4');
      lingkaran(c, 76, 52, 9, '#ffd166');
      P(c, 330, 104, 26, 18, '#c8a06a');
      P(c, 328, 98, 30, 6, '#a8824e');
      hutanDi(c, '#5a9058', '#508650');
      tanah(c, '#c8dc9c', '#bcd090', '#d4e6a8');
      jalan(c, '#d8e6b4', '#c2d4a4', '#ccdcb0', '#e6f0c4');
    }

    else if (TEMA_NAMA === 'menaraSinyal') {
      P(c, 0, 0, W, 46, '#201c3a');
      P(c, 0, 46, W, 46, '#262244');
      P(c, 0, 92, W, 46, '#2c284e');
      P(c, 0, 138, W, 44, '#322e58');
      for (let i = 0; i < 5; i++) lingkaran(c, 70 + i * 86, 26 + (i % 2) * 12, 1.5, '#efe8ff');
      P(c, 330, 70, 5, 112, '#4a4078');
      P(c, 318, 66, 30, 6, '#4a4078');
      P(c, 322, 84, 5, 6, '#ffd166');
      P(c, 340, 96, 5, 6, '#ffe9a3');
      hutanDi(c, '#16142c', '#121024');
      tanah(c, '#302c54', '#2a264c', '#36325e');
      jalan(c, '#424068', '#3a3660', '#3e3a64', '#4a4672');
    }

    else if (TEMA_NAMA === 'kandangData') {
      P(c, 0, 0, W, 46, '#e8f4e0');
      P(c, 0, 46, W, 46, '#dcf0d4');
      P(c, 0, 92, W, 46, '#d0ecc4');
      P(c, 0, 138, W, 44, '#c4e6b4');
      lingkaran(c, 80, 52, 9, '#ffd166');
      P(c, 322, 96, 40, 26, '#c8a878');
      P(c, 318, 90, 48, 7, '#a8845a');
      P(c, 336, 112, 12, 10, '#8a6a48');
      hutanDi(c, '#5a9058', '#508650');
      tanah(c, '#cde0a8', '#c1d49c', '#d9eab4');
      jalan(c, '#d8e6b4', '#c2d4a4', '#ccdcb0', '#e6f0c4');
    }

    else if (TEMA_NAMA === 'mejaGelasRata') {
      P(c, 0, 0, W, 46, '#e4f6fa');
      P(c, 0, 46, W, 46, '#d8f0f4');
      P(c, 0, 92, W, 46, '#cceaf0');
      P(c, 0, 138, W, 44, '#c0e4ec');
      lingkaran(c, 372, 50, 9, '#ffd166');
      P(c, 40, 100, 36, 28, '#f8fcf4');
      P(c, 57, 100, 3, 28, '#a4b488');
      P(c, 330, 108, 34, 18, '#d8b078');
      P(c, 328, 102, 38, 6, '#b8905a');
      hutanDi(c, '#588a4e', '#4c7e44');
      tanah(c, '#d0d8b0', '#c4cca4', '#dce4bc');
      jalan(c, '#dae2ba', '#c4cca2', '#ccd4ac', '#e6eec2');
    }

    else if (TEMA_NAMA === 'susunBatuSore') {
      P(c, 0, 0, W, 46, '#f8c8a0');
      P(c, 0, 46, W, 46, '#f0bc94');
      P(c, 0, 92, W, 46, '#e8b088');
      P(c, 0, 138, W, 44, '#e0a47c');
      lingkaran(c, 92, 64, 10, '#ff9d6b');
      P(c, 324, 100, 42, 22, '#93745a');
      P(c, 320, 94, 6, 28, '#7a5a44');
      P(c, 350, 94, 6, 28, '#7a5a44');
      hutanDi(c, '#5e6a40', '#526036');
      tanah(c, '#dcc8a4', '#d0bc98', '#e4d4b0');
      jalan(c, '#e0cca8', '#cab490', '#d2bc98', '#e8d8b4');
    }

    else if (TEMA_NAMA === 'rakSandalSiang') {
      P(c, 0, 0, W, 46, '#fdeec8');
      P(c, 0, 46, W, 46, '#f8e4b4');
      P(c, 0, 92, W, 46, '#f2dca4');
      P(c, 0, 138, W, 44, '#ecd494');
      lingkaran(c, 84, 52, 9, '#ffcf66');
      P(c, 320, 78, 44, 40, '#c8906a');
      P(c, 314, 70, 56, 9, '#a86a4a');
      P(c, 336, 96, 12, 14, '#5a4430');
      hutanDi(c, '#5e8a52', '#527e48');
      tanah(c, '#d8d8a4', '#ccc898', '#e4e4b0');
      jalan(c, '#dee2b0', '#c8cc9a', '#d0d4a4', '#e8ecbc');
    }

    else if (TEMA_NAMA === 'lapanganBatang') {
      P(c, 0, 0, W, 46, '#eef8d8');
      P(c, 0, 46, W, 46, '#e4f2cc');
      P(c, 0, 92, W, 46, '#d8ecbe');
      P(c, 0, 138, W, 44, '#cce4b0');
      lingkaran(c, 76, 54, 9, '#ffd166');
      P(c, 326, 104, 38, 20, '#c8a06a');
      P(c, 322, 98, 46, 7, '#a8824e');
      hutanDi(c, '#5a9058', '#508650');
      tanah(c, '#cadca4', '#bed098', '#d6e8b0');
      jalan(c, '#d6e4b0', '#c0d2a0', '#c8daa8', '#e2eec0');
      for (let i = 0; i < 5; i++) P(c, 40 + i * 90, 238, 2, 2, '#a8bc80');
    }

    else if (TEMA_NAMA === 'mejaSuhuSore') {
      P(c, 0, 0, W, 46, '#ffd8b0');
      P(c, 0, 46, W, 46, '#f4c8a4');
      P(c, 0, 92, W, 46, '#ecbc98');
      P(c, 0, 138, W, 44, '#e4b08c');
      lingkaran(c, 96, 66, 10, '#ff9d6b');
      P(c, 330, 102, 44, 20, '#a8886a');
      P(c, 336, 122, 4, 14, '#8a6a48');
      P(c, 364, 122, 4, 14, '#8a6a48');
      hutanDi(c, '#5a6a40', '#4e6036');
      tanah(c, '#dcc4a0', '#d0b894', '#e4d0ac');
      jalan(c, '#e0caa6', '#cab490', '#d2bc98', '#e8d8b4');
    }

    else if (TEMA_NAMA === 'mejaKueMalam') {
      P(c, 0, 0, W, 46, '#241c38');
      P(c, 0, 46, W, 46, '#2a2244');
      P(c, 0, 92, W, 46, '#30284e');
      P(c, 0, 138, W, 44, '#362e58');
      for (let i = 0; i < 5; i++) lingkaran(c, 70 + i * 86, 26 + (i % 2) * 12, 1.5, '#efe8ff');
      P(c, 96, 74, 2, 10, '#4a4078');
      P(c, 92, 84, 10, 7, '#ffd166');
      ctx.globalAlpha = 0.12; lingkaran(c, 97, 90, 12, '#ffd166'); ctx.globalAlpha = 1;
      P(c, 320, 92, 48, 26, '#3a3468');
      hutanDi(c, '#1c1830', '#181428');
      tanah(c, '#342e5a', '#2e2854', '#3a3462');
      jalan(c, '#464074', '#3e3868', '#423c6e', '#504a80');
    }

    else if (TEMA_NAMA === 'geraiTabelPasar') {
      P(c, 0, 0, W, 46, '#e0f4fa');
      P(c, 0, 46, W, 46, '#d4ecf6');
      P(c, 0, 92, W, 46, '#c8e4f0');
      P(c, 0, 138, W, 44, '#bcdcea');
      lingkaran(c, 88, 52, 9, '#ffd166');
      P(c, 316, 90, 52, 30, '#e8d0a8');
      P(c, 312, 84, 60, 8, '#c8a878');
      hutanDi(c, '#588a4e', '#4c7e44');
      tanah(c, '#d0dcac', '#c4d0a0', '#dce8b8');
      jalan(c, '#d8e2b8', '#c2cea4', '#cad6b0', '#e4eec0');
    }

    else if (TEMA_NAMA === 'duaLadangRentang') {
      P(c, 0, 0, W, 46, '#e6f6ee');
      P(c, 0, 46, W, 46, '#d8f0e4');
      P(c, 0, 92, W, 46, '#cceada');
      P(c, 0, 138, W, 44, '#c0e4ce');
      lingkaran(c, 80, 52, 9, '#ffd166');
      P(c, 60, 118, 26, 10, '#8aa860');
      P(c, 396, 106, 26, 22, '#7a9a52');
      hutanDi(c, '#5a9058', '#508650');
      tanah(c, '#c8dc9c', '#bcd090', '#d4e6a8');
      jalan(c, '#d8e6b4', '#c2d4a4', '#ccdcb0', '#e6f0c4');
      P(c, 238, 200, 3, 52, '#b0c48c');
    }

    else if (TEMA_NAMA === 'balaiRisetMalam') {
      P(c, 0, 0, W, 46, '#1e1a36');
      P(c, 0, 46, W, 46, '#242040');
      P(c, 0, 92, W, 46, '#2a2648');
      P(c, 0, 138, W, 44, '#302c52');
      for (let i = 0; i < 5; i++) lingkaran(c, 70 + i * 86, 26 + (i % 2) * 12, 1.5, '#efe8ff');
      P(c, 100, 70, 2, 12, '#4a4078');
      P(c, 96, 82, 10, 7, '#ffe9a3');
      ctx.globalAlpha = 0.12; lingkaran(c, 101, 88, 12, '#ffe9a3'); ctx.globalAlpha = 1;
      P(c, 318, 96, 50, 24, '#38325e');
      hutanDi(c, '#16122a', '#120e24');
      tanah(c, '#302a52', '#2a244c', '#36305c');
      jalan(c, '#443e6c', '#3c3664', '#403a68', '#4e4878');
    }

    else if (TEMA_NAMA === 'gerbangKemungkinan') {
      P(c, 0, 0, W, 46, '#e2f2ee');
      P(c, 0, 46, W, 46, '#d6ece6');
      P(c, 0, 92, W, 46, '#cae6de');
      P(c, 0, 138, W, 44, '#bfe0d6');
      lingkaran(c, 84, 50, 9, '#ffd166');
      P(c, 300, 78, 10, 60, '#9a8a6a');
      P(c, 366, 78, 10, 60, '#9a8a6a');
      P(c, 294, 72, 88, 8, '#b0a080');
      hutanDi(c, '#5a9058', '#508650');
      tanah(c, '#c4dcac', '#b8d0a0', '#d0e4b8');
      jalan(c, '#d8e6b4', '#c2d4a4', '#ccdcb0', '#e6f0c4');
    }

    else if (TEMA_NAMA === 'lapanganKoin') {
      P(c, 0, 0, W, 46, '#e8f4e0');
      P(c, 0, 46, W, 46, '#dcf0d4');
      P(c, 0, 92, W, 46, '#d0ecc4');
      P(c, 0, 138, W, 44, '#c4e6b4');
      lingkaran(c, 396, 48, 9, '#ffd166');
      P(c, 60, 108, 44, 26, '#e8e8e0');
      for (let i = 0; i < 4; i++) P(c, 64 + i * 12, 114, 2, 14, '#a8b898');
      hutanDi(c, '#5a9058', '#508650');
      tanah(c, '#bcd88a', '#b0cc7e', '#c8e296');
      jalan(c, '#d4e8ac', '#bed494', '#c6dc9e', '#e0f0b8');
    }

    else if (TEMA_NAMA === 'mejaUlarTangga') {
      P(c, 0, 0, W, 46, '#1c1830');
      P(c, 0, 46, W, 46, '#221e38');
      P(c, 0, 92, W, 46, '#282342');
      P(c, 0, 138, W, 44, '#2e284c');
      for (let i = 0; i < 6; i++) lingkaran(c, 50 + i * 70, 22 + (i % 2) * 10, 1.5, '#e8e0ff');
      P(c, 92, 84, 2, 14, '#5a5090');
      P(c, 86, 78, 14, 8, '#ffe9a3');
      ctx.globalAlpha = 0.12; lingkaran(c, 93, 84, 13, '#ffe9a3'); ctx.globalAlpha = 1;
      P(c, 330, 92, 46, 24, '#3a3460');
      hutanDi(c, '#141028', '#100c20');
      tanah(c, '#322c56', '#2c264e', '#383260');
      jalan(c, '#464070', '#3e3868', '#423c6c', '#504878');
    }

    else if (TEMA_NAMA === 'puncakPasti') {
      P(c, 0, 0, W, 46, '#ffd9b0');
      P(c, 0, 46, W, 46, '#f8ccb4');
      P(c, 0, 92, W, 46, '#f0c0a4');
      P(c, 0, 138, W, 44, '#e8b494');
      lingkaran(c, 120, 96, 13, '#ffb86b');
      lingkaran(c, 120, 96, 9, '#ffd166');
      gunungDi(c, 300, 88, 60, 186, '#c89a88');
      hutanDi(c, '#6a6a48', '#5e5e3e');
      tanah(c, '#dcc4a0', '#d0b894', '#e4d0ac');
      jalan(c, '#e2cca8', '#ccb490', '#d4bc98', '#ead4b0');
    }

    else if (TEMA_NAMA === 'festivalRoda') {
      P(c, 0, 0, W, 46, '#fdeec8');
      P(c, 0, 46, W, 46, '#f8e4b4');
      P(c, 0, 92, W, 46, '#f2dca4');
      P(c, 0, 138, W, 44, '#ecd494');
      lingkaran(c, 380, 56, 10, '#ff9d6b');
      for (let i = 0; i < 5; i++) {
        P(c, 40 + i * 26, 90 + (i % 2) * 8, 12, 8, ['#ff9db8', '#7dffa8', '#ffd166', '#a8c8ff', '#e0a8ff'][i]);
      }
      hutanDi(c, '#5e8a52', '#527e48');
      tanah(c, '#d8d8a4', '#ccc898', '#e4e4b0');
      jalan(c, '#dee2b0', '#c8cc9a', '#d0d4a4', '#e8ecbc');
    }

    else if (TEMA_NAMA === 'kiosKelereng') {
      P(c, 0, 0, W, 46, '#e4f6fa');
      P(c, 0, 46, W, 46, '#d8f0f4');
      P(c, 0, 92, W, 46, '#cceaf0');
      P(c, 0, 138, W, 44, '#c0e4ec');
      lingkaran(c, 76, 50, 9, '#ffd166');
      P(c, 320, 96, 44, 28, '#d8b078');
      P(c, 316, 88, 52, 8, '#b8905a');
      hutanDi(c, '#588a4e', '#4c7e44');
      tanah(c, '#d0d8b0', '#c4cca4', '#dce4bc');
      jalan(c, '#dae2ba', '#c4cca2', '#ccd4ac', '#e6eec2');
    }

    else if (TEMA_NAMA === 'kelasPecahan') {
      P(c, 0, 0, W, 46, '#eef8d8');
      P(c, 0, 46, W, 46, '#e4f2cc');
      P(c, 0, 92, W, 46, '#d8ecbe');
      P(c, 0, 138, W, 44, '#cce4b0');
      lingkaran(c, 400, 46, 9, '#ffd166');
      P(c, 70, 100, 48, 30, '#c8a878');
      P(c, 66, 92, 56, 9, '#a8845a');
      hutanDi(c, '#5a9058', '#508650');
      tanah(c, '#cadca4', '#bed098', '#d6e8b0');
      jalan(c, '#d6e4b0', '#c0d2a0', '#c8daa8', '#e2eec0');
    }

    else if (TEMA_NAMA === 'terasDuaKoin') {
      P(c, 0, 0, W, 46, '#ffd8b0');
      P(c, 0, 46, W, 46, '#f4c8a4');
      P(c, 0, 92, W, 46, '#ecbc98');
      P(c, 0, 138, W, 44, '#e4b08c');
      lingkaran(c, 386, 108, 12, '#ff9d6b');
      P(c, 56, 92, 40, 26, '#b09068');
      P(c, 50, 82, 52, 11, '#8a6a44');
      hutanDi(c, '#5e6a40', '#526036');
      tanah(c, '#dcc8a4', '#d0bc98', '#e4d4b0');
      jalan(c, '#e0cca8', '#cab490', '#d2bc98', '#e8d8b4');
    }

    else if (TEMA_NAMA === 'terasMendung') {
      P(c, 0, 0, W, 46, '#c8d4de');
      P(c, 0, 46, W, 46, '#bcc8d4');
      P(c, 0, 92, W, 46, '#b0bcc8');
      P(c, 0, 138, W, 44, '#a4b0be');
      P(c, 40, 40, 42, 10, '#98a4b4');
      P(c, 52, 32, 22, 10, '#98a4b4');
      P(c, 250, 58, 50, 11, '#8e9aac');
      P(c, 262, 49, 26, 11, '#8e9aac');
      P(c, 340, 26, 38, 9, '#98a4b4');
      hutanDi(c, '#4a5c46', '#40523c');
      tanah(c, '#9eb088', '#92a47c', '#aab892');
      jalan(c, '#c2ceb0', '#aebc9c', '#b6c4a4', '#d0dabc');
    }

    else if (TEMA_NAMA === 'balaiPeluang') {
      P(c, 0, 0, W, 46, '#221c3e');
      P(c, 0, 46, W, 46, '#282246');
      P(c, 0, 92, W, 46, '#2e2850');
      P(c, 0, 138, W, 44, '#342e58');
      for (let i = 0; i < 6; i++) lingkaran(c, 40 + i * 74, 20 + (i % 2) * 11, 1.5, '#efe8ff');
      for (let i = 0; i < 5; i++) {
        P(c, 74 + i * 76, 66, 2, 9, '#4a4078');
        P(c, 70 + i * 76, 75, 10, 8, '#ffd166');
      }
      P(c, 330, 98, 44, 22, '#3c3464');
      hutanDi(c, '#181432', '#14102a');
      tanah(c, '#342e5c', '#2e2854', '#3a3364');
      jalan(c, '#484078', '#403870', '#443c74', '#524a80');
    }

    else if (TEMA_NAMA === 'bengkelMesin') {
      P(c, 0, 0, W, 46, '#f8ecd4');
      P(c, 0, 46, W, 46, '#f2e4c8');
      P(c, 0, 92, W, 46, '#eadcc0');
      P(c, 0, 138, W, 44, '#e2d4b8');
      lingkaran(c, 82, 48, 9, '#ffd166');
      gunungSaljuDi(c, 160, 76, 62, 182, '#a89a86', '#f0eae0');
      gunungSaljuDi(c, 356, 88, 54, 182, '#b8a894', '#f0eae0');
      pinusDi(c, '#4a7a52', '#3e6c46');
      P(c, 292, 108, 54, 34, '#8a6a48');
      P(c, 286, 100, 66, 10, '#6e5238');
      lingkaran(c, 319, 126, 7, '#5a4430');
      lingkaran(c, 319, 126, 3, '#8a6a48');
      tanah(c, '#c4b294', '#b8a688', '#d0bea0');
      jalan(c, '#b8a488', '#a29074', '#a8967a', '#c4b094');
    }

    else if (TEMA_NAMA === 'mejaMesinPintar') {
      P(c, 0, 0, W, 46, '#dceffc');
      P(c, 0, 46, W, 46, '#d0e8f8');
      P(c, 0, 92, W, 46, '#c4e0f4');
      P(c, 0, 138, W, 44, '#b8d8f0');
      lingkaran(c, 400, 44, 9, '#ffd166');
      gunungSaljuDi(c, 90, 82, 58, 182, '#9ab4cc', '#eef6fc');
      gunungSaljuDi(c, 300, 74, 66, 182, '#8aa8c4', '#eef6fc');
      pinusDi(c, '#3f7a50', '#336c44');
      P(c, 60, 116, 48, 28, '#c8a878');
      P(c, 56, 112, 56, 6, '#a8845a');
      tanah(c, '#bcd0a8', '#b0c49c', '#c8dcb4');
      jalan(c, '#c8d8b4', '#b2c49e', '#bacaa6', '#d4e2c0');
    }

    else if (TEMA_NAMA === 'papanAturanMesin') {
      P(c, 0, 0, W, 46, '#ffdfae');
      P(c, 0, 46, W, 46, '#f8d4a0');
      P(c, 0, 92, W, 46, '#f0c894');
      P(c, 0, 138, W, 44, '#e8bc88');
      lingkaran(c, 120, 104, 12, '#ff9d6b');
      gunungSaljuDi(c, 320, 84, 60, 182, '#b09078', '#f8e8d4');
      pinusDi(c, '#5a7a46', '#4c6c3c');
      P(c, 80, 104, 44, 30, '#c8a878');
      P(c, 76, 96, 52, 9, '#a8845a');
      tanah(c, '#d8c8a0', '#ccbc94', '#e4d4ac');
      jalan(c, '#dccca4', '#c6b68e', '#cebda0', '#e8d8b0');
    }

    else if (TEMA_NAMA === 'arsipTabel') {
      P(c, 0, 0, W, 46, '#171a30');
      P(c, 0, 46, W, 46, '#1c2038');
      P(c, 0, 92, W, 46, '#222642');
      P(c, 0, 138, W, 44, '#282c4a');
      for (let i = 0; i < 7; i++) lingkaran(c, 44 + i * 66, 22 + (i % 2) * 9, 1.5, '#e8ecff');
      gunungDi(c, 130, 88, 62, 182, '#2c3050');
      gunungDi(c, 350, 78, 58, 182, '#323660');
      pinusDi(c, '#222a3a', '#1c2432');
      P(c, 300, 112, 46, 28, '#383c60');
      P(c, 318, 104, 4, 10, '#4a4078');
      P(c, 314, 114, 12, 8, '#ffd166');
      ctx.globalAlpha = 0.14; lingkaran(c, 320, 118, 12, '#ffd166'); ctx.globalAlpha = 1;
      tanah(c, '#303454', '#2a2e4c', '#383c60');
      jalan(c, '#404468', '#383c5c', '#3c4064', '#4a4e72');
    }

    else if (TEMA_NAMA === 'lapanganKisi') {
      P(c, 0, 0, W, 46, '#d8f2fa');
      P(c, 0, 46, W, 46, '#cceef8');
      P(c, 0, 92, W, 46, '#c0e8f4');
      P(c, 0, 138, W, 44, '#b4e2f0');
      lingkaran(c, 76, 46, 9, '#ffd166');
      gunungSaljuDi(c, 380, 80, 56, 182, '#9ab8cc', '#f0f8fc');
      pinusDi(c, '#47804e', '#3b7244');
      for (let i = 0; i < 5; i++) P(c, 40 + i * 22, 118, 2, 26, '#88a8b8');
      for (let j = 0; j < 3; j++) P(c, 40, 118 + j * 13, 92, 2, '#88a8b8');
      tanah(c, '#c2d8b0', '#b6cca4', '#cedab8');
      jalan(c, '#ccdcb8', '#b6caa2', '#bed2b0', '#d8e6c4');
    }

    else if (TEMA_NAMA === 'jalanLurusNaik') {
      P(c, 0, 0, W, 46, '#cfeafc');
      P(c, 0, 46, W, 46, '#c2e2f8');
      P(c, 0, 92, W, 46, '#b6daf4');
      P(c, 0, 138, W, 44, '#aad2f0');
      lingkaran(c, 414, 40, 9, '#ffd166');
      gunungSaljuDi(c, 150, 70, 70, 182, '#98b4cc', '#f0f7fc');
      gunungSaljuDi(c, 360, 92, 52, 182, '#a4bcd2', '#f0f7fc');
      for (let i = 0; i < 4; i++) P(c, 96 + i * 76, 150 - i * 22, 3, 10, '#7a6248');
      tanah(c, '#c0d4b8', '#b4c8ac', '#cce0c0');
      jalan(c, '#c4c2a8', '#aeac90', '#b6b49c', '#d0ceba');
    }

    else if (TEMA_NAMA === 'jembatanBergelombang') {
      P(c, 0, 0, W, 46, '#ffd9a8');
      P(c, 0, 46, W, 46, '#f8cc98');
      P(c, 0, 92, W, 46, '#f0bf8c');
      P(c, 0, 138, W, 44, '#e8b280');
      lingkaran(c, 368, 112, 12, '#ff8a5c');
      gunungDi(c, 110, 90, 60, 182, '#a08278');
      gunungDi(c, 300, 80, 62, 182, '#94786e');
      for (let i = 0; i < 9; i++) {
        const by = 128 + (i < 4 ? -i * 4 : -(8 - i) * 4);
        P(c, 40 + i * 28, by, 28, 3, '#6a5040');
      }
      pinusDi(c, '#5a5a40', '#4c4c34');
      tanah(c, '#d4bc94', '#c8b088', '#e0c8a0');
      jalan(c, '#d8c098', '#c2aa82', '#cab290', '#e4ccb8');
    }

    else if (TEMA_NAMA === 'halamanLempar') {
      P(c, 0, 0, W, 46, '#e2f2fc');
      P(c, 0, 46, W, 46, '#d8ecf8');
      P(c, 0, 92, W, 46, '#cce6f4');
      P(c, 0, 138, W, 44, '#c0e0f0');
      lingkaran(c, 96, 44, 9, '#ffd166');
      gunungSaljuDi(c, 330, 78, 60, 182, '#9cb0c8', '#f0f6fc');

      for (let i = 0; i <= 8; i++) {
        const px4 = 150 + i * 16;
        const py4 = 128 - Math.round(38 * Math.sin(Math.PI * i / 8));
        lingkaran(c, px4, py4, 1.5, '#f2b8cc');
      }
      pinusDi(c, '#4a8054', '#3e7248');
      P(c, 44, 116, 44, 28, '#d0b088');
      P(c, 40, 108, 52, 9, '#a8845a');
      tanah(c, '#c8dca8', '#bcd09c', '#d4e6b4');
      jalan(c, '#d0e0b4', '#bacba0', '#c2d4a8', '#dceaba');
    }

    else if (TEMA_NAMA === 'posGrafik') {
      P(c, 0, 0, W, 46, '#141a34');
      P(c, 0, 46, W, 46, '#1a2040');
      P(c, 0, 92, W, 46, '#20263e');
      P(c, 0, 138, W, 44, '#262e4a');
      for (let i = 0; i < 8; i++) lingkaran(c, 34 + i * 60, 20 + (i % 2) * 10, 1.5, '#f0f4ff');
      gunungDi(c, 170, 84, 64, 182, '#2a3050');
      gunungDi(c, 380, 92, 54, 182, '#303656');
      pinusDi(c, '#1e2a34', '#18222c');
      P(c, 320, 96, 4, 46, '#4a4068');
      P(c, 308, 88, 28, 12, '#3a3460');
      P(c, 316, 92, 12, 6, '#ffd166');
      ctx.globalAlpha = 0.15; lingkaran(c, 322, 95, 13, '#ffd166'); ctx.globalAlpha = 1;
      tanah(c, '#2c304c', '#262a44', '#343854');
      jalan(c, '#3a3e60', '#32364e', '#363a58', '#44486a');
    }

    else if (TEMA_NAMA === 'balaiMesin') {
      P(c, 0, 0, W, 46, '#1e1c3e');
      P(c, 0, 46, W, 46, '#242048');
      P(c, 0, 92, W, 46, '#2a2652');
      P(c, 0, 138, W, 44, '#302c5a');
      for (let i = 0; i < 6; i++) lingkaran(c, 40 + i * 74, 20 + (i % 2) * 11, 1.5, '#efeaff');
      for (let i = 0; i < 5; i++) {
        P(c, 74 + i * 76, 62, 2, 10, '#443c74');
        P(c, 70 + i * 76, 72, 10, 9, '#7ff2d8');
      }
      P(c, 316, 100, 52, 26, '#3c3a72');
      gunungDi(c, 120, 90, 58, 182, '#262248');
      pinusDi(c, '#1c2238', '#161c30');
      tanah(c, '#322e58', '#2c2850', '#383460');
      jalan(c, '#464276', '#3e3a6a', '#423e70', '#504c80');
    }

    else if (TEMA_NAMA === 'padangBarisan') {
      P(c, 0, 0, W, 46, '#f6f2d4');
      P(c, 0, 46, W, 46, '#efeac8');
      P(c, 0, 92, W, 46, '#e8e2be');
      P(c, 0, 138, W, 44, '#e0dab4');
      lingkaran(c, 88, 46, 9, '#ffd166');
      gunungSaljuDi(c, 170, 78, 60, 182, '#a8a08c', '#f4efe2');
      gunungSaljuDi(c, 366, 88, 52, 182, '#b8b09a', '#f4efe2');
      pinusDi(c, '#4a7a50', '#3e6c44');
      for (let i = 0; i < 4; i++) P(c, 320 + i * 16, 168, 10, 5, '#e8e2d0');
      tanah(c, '#c6d6a2', '#bacc96', '#d2e0ae');
      jalan(c, '#ccdcb8', '#b6caa2', '#bed2aa', '#d8e6c4');
    }

    else if (TEMA_NAMA === 'tanggaTambah') {
      P(c, 0, 0, W, 46, '#d8f0fa');
      P(c, 0, 46, W, 46, '#cce8f4');
      P(c, 0, 92, W, 46, '#c0e0ee');
      P(c, 0, 138, W, 44, '#b4d8e8');
      lingkaran(c, 404, 42, 9, '#ffd166');
      gunungSaljuDi(c, 84, 82, 58, 182, '#9ab4c8', '#f0f8fc');
      gunungSaljuDi(c, 336, 74, 62, 182, '#8aa8c0', '#f0f8fc');
      pinusDi(c, '#3f7a4e', '#336c42');
      for (let i = 0; i < 4; i++) P(c, 300 + i * 18, 148 - i * 9, 18, 9, '#a89478');
      tanah(c, '#c0d4a8', '#b4c89c', '#ccdeb4');
      jalan(c, '#c8dab2', '#b2c69c', '#bad0a6', '#d4e2be');
    }

    else if (TEMA_NAMA === 'ladangGandakan') {
      P(c, 0, 0, W, 46, '#ffdfae');
      P(c, 0, 46, W, 46, '#f8d49e');
      P(c, 0, 92, W, 46, '#f0c892');
      P(c, 0, 138, W, 44, '#e8bc86');
      lingkaran(c, 116, 100, 12, '#ff9d6b');
      gunungSaljuDi(c, 330, 84, 58, 182, '#b0907a', '#f8e8d4');
      pinusDi(c, '#5a7a46', '#4c6c3c');
      P(c, 64, 112, 50, 30, '#8a6a48');
      P(c, 58, 104, 62, 10, '#6e5238');
      tanah(c, '#dcc69e', '#d0ba92', '#e4d0aa');
      jalan(c, '#e0cca6', '#cab68e', '#d2c098', '#e8d6b0');
    }

    else if (TEMA_NAMA === 'menaraSuku') {
      P(c, 0, 0, W, 46, '#161a30');
      P(c, 0, 46, W, 46, '#1b1f38');
      P(c, 0, 92, W, 46, '#212542');
      P(c, 0, 138, W, 44, '#272b4a');
      for (let i = 0; i < 8; i++) lingkaran(c, 36 + i * 58, 20 + (i % 2) * 10, 1.5, '#e8ecff');
      gunungDi(c, 150, 86, 62, 182, '#292d4e');
      gunungDi(c, 380, 92, 54, 182, '#2f3356');
      pinusDi(c, '#1d2734', '#171f2a');
      P(c, 316, 92, 20, 52, '#3a3e64');
      P(c, 310, 84, 32, 10, '#464a76');
      P(c, 322, 100, 8, 8, '#ffd166');
      ctx.globalAlpha = 0.15; lingkaran(c, 326, 104, 12, '#ffd166'); ctx.globalAlpha = 1;
      tanah(c, '#2c3050', '#262a46', '#34385a');
      jalan(c, '#3a3e64', '#323650', '#363a5c', '#44486e');
    }

    else if (TEMA_NAMA === 'apiUnggunPasangan') {
      P(c, 0, 0, W, 46, '#141226');
      P(c, 0, 46, W, 46, '#1a1730');
      P(c, 0, 92, W, 46, '#201c38');
      P(c, 0, 138, W, 44, '#262240');
      for (let i = 0; i < 7; i++) lingkaran(c, 40 + i * 64, 20 + (i % 2) * 9, 1.5, '#f0ecff');
      gunungDi(c, 130, 88, 60, 182, '#241f42');
      gunungDi(c, 372, 90, 56, 182, '#2a254a');
      pinusDi(c, '#1c2038', '#161a2e');
      P(c, 76, 122, 34, 24, '#4a4068');
      P(c, 74, 118, 38, 6, '#5a5080');
      ctx.globalAlpha = 0.13; lingkaran(c, 250, 200, 26, '#ffb85e'); ctx.globalAlpha = 1;
      tanah(c, '#2e2a4c', '#282444', '#363054');
      jalan(c, '#423c6c', '#3a3460', '#3e3868', '#4c4678');
    }

    else if (TEMA_NAMA === 'ladangBijiDua') {
      P(c, 0, 0, W, 46, '#eef6d4');
      P(c, 0, 46, W, 46, '#e6f0c8');
      P(c, 0, 92, W, 46, '#deeabc');
      P(c, 0, 138, W, 44, '#d6e2b4');
      lingkaran(c, 72, 46, 9, '#ffd166');
      gunungSaljuDi(c, 356, 80, 56, 182, '#a0b088', '#f2f6e0');
      pinusDi(c, '#47804e', '#3b7244');
      for (let i = 0; i < 3; i++) P(c, 60 + i * 26, 150, 18, 8, '#a89468');
      tanah(c, '#c8d8a4', '#bccc98', '#d4e2b0');
      jalan(c, '#cedcb8', '#b8caa0', '#c0d2ac', '#d8e6c0');
    }

    else if (TEMA_NAMA === 'halamanKursiSegitiga') {
      P(c, 0, 0, W, 46, '#ffddaa');
      P(c, 0, 46, W, 46, '#f8d29e');
      P(c, 0, 92, W, 46, '#f0c692');
      P(c, 0, 138, W, 44, '#e8ba86');
      lingkaran(c, 348, 102, 11, '#ff9d6b');
      gunungSaljuDi(c, 96, 82, 56, 182, '#b09078', '#f8e8d4');
      pinusDi(c, '#587a44', '#4a6c3a');
      for (let r = 0; r < 3; r++) for (let i = 0; i <= r; i++) P(c, 330 + i * 12 - r * 6, 130 + r * 8, 8, 6, '#8a6a48');
      tanah(c, '#dcc8a0', '#d0bc94', '#e4d2ac');
      jalan(c, '#e0cea6', '#caba92', '#d2c29a', '#e8d8b0');
    }

    else if (TEMA_NAMA === 'kebunPetakKuadrat') {
      P(c, 0, 0, W, 46, '#d4f0e0');
      P(c, 0, 46, W, 46, '#c8e8d6');
      P(c, 0, 92, W, 46, '#bce0cc');
      P(c, 0, 138, W, 44, '#b0d8c2');
      lingkaran(c, 396, 44, 9, '#ffd166');
      gunungSaljuDi(c, 90, 80, 58, 182, '#96b4a4', '#f0f8f2');
      gunungSaljuDi(c, 340, 86, 52, 182, '#8aa89a', '#f0f8f2');
      pinusDi(c, '#3a7a4e', '#2e6c40');
      for (let j = 0; j < 2; j++) for (let i = 0; i < 3; i++) P(c, 300 + i * 14, 136 + j * 12, 10, 8, '#7aa05a');
      tanah(c, '#bcd8ac', '#b0cca0', '#c8e0b8');
      jalan(c, '#c4deae', '#aec8a0', '#b6d2a6', '#cee4ba');
    }

    else if (TEMA_NAMA === 'tamanPolaSenja') {
      P(c, 0, 0, W, 46, '#ffd8b8');
      P(c, 0, 46, W, 46, '#f8ccb0');
      P(c, 0, 92, W, 46, '#f0c0a4');
      P(c, 0, 138, W, 44, '#e8b498');
      lingkaran(c, 108, 96, 11, '#ff9d7b');
      gunungSaljuDi(c, 342, 84, 56, 182, '#b48a80', '#f8e4d8');
      pinusDi(c, '#5a7a4e', '#4c6c42');
      for (let i = 0; i < 5; i++) {
        P(c, 250 + i * 24, 158, 2, 10, '#4a7a3e');
        lingkaran(c, 251 + i * 24, 154, 4, '#c88ac0');
      }
      tanah(c, '#dcc4a0', '#d0b894', '#e4ceaa');
      jalan(c, '#e0c8a8', '#cab290', '#d2ba9c', '#e8d2b2');
    }

    else if (TEMA_NAMA === 'puncakPolaMalam') {
      P(c, 0, 0, W, 46, '#1a1e36');
      P(c, 0, 46, W, 46, '#20243e');
      P(c, 0, 92, W, 46, '#262a46');
      P(c, 0, 138, W, 44, '#2c3050');
      for (let i = 0; i < 8; i++) lingkaran(c, 34 + i * 58, 20 + (i % 2) * 10, 1.5, '#eef2ff');
      gunungSaljuDi(c, 170, 72, 66, 182, '#333a5e', '#d8e0f4');
      gunungSaljuDi(c, 390, 84, 54, 182, '#3a4166', '#d8e0f4');
      pinusDi(c, '#1e2438', '#181e2e');
      for (let i = 0; i < 5; i++) {
        P(c, 130 + i * 40, 166, 6, 4, '#6a4a2a');
        ctx.globalAlpha = 0.6; lingkaran(c, 133 + i * 40, 164, 2.5, '#ffb85e'); ctx.globalAlpha = 1;
      }
      tanah(c, '#303450', '#2a2e48', '#383c58');
      jalan(c, '#3e4266', '#363a58', '#3a3e5e', '#484c70');
    }

    else if (TEMA_NAMA === 'bengkelPangkat') {
      P(c, 0, 0, W, 46, '#f8ecd0');
      P(c, 0, 46, W, 46, '#f2e4c0');
      P(c, 0, 92, W, 46, '#ecdcb2');
      P(c, 0, 138, W, 44, '#e4d4a4');
      lingkaran(c, 88, 46, 9, '#ffd166');
      gunungSaljuDi(c, 176, 78, 58, 182, '#a8987e', '#f6eeda');
      gunungSaljuDi(c, 372, 86, 52, 182, '#b6a68c', '#f6eeda');
      pinusDi(c, '#4e7a4a', '#426c3e');
      P(c, 306, 128, 64, 42, '#8a6a48');
      P(c, 300, 120, 76, 10, '#6e5238');
      P(c, 336, 142, 12, 12, '#ffd166');
      ctx.globalAlpha = 0.18; lingkaran(c, 342, 148, 10, '#ffd166'); ctx.globalAlpha = 1;
      tanah(c, '#d8c8a0', '#ccbc94', '#e0d2ac');
      jalan(c, '#d4c49c', '#c8b890', '#cec098', '#e0d0a8');
    }

    else if (TEMA_NAMA === 'mejaLipatKertas') {
      P(c, 0, 0, W, 46, '#d8f0fa');
      P(c, 0, 46, W, 46, '#cce8f4');
      P(c, 0, 92, W, 46, '#c0e0ee');
      P(c, 0, 138, W, 44, '#b4d8e8');
      lingkaran(c, 404, 42, 9, '#ffd166');
      gunungSaljuDi(c, 92, 82, 56, 182, '#9ab4c8', '#f0f8fc');
      gunungSaljuDi(c, 344, 76, 60, 182, '#8aa8c0', '#f0f8fc');
      pinusDi(c, '#3f7a4e', '#336c42');
      for (let i = 0; i < 3; i++) P(c, 296 + i * 14, 158 - i * 6, 16, 6, '#fffdf2');
      tanah(c, '#c6d6b0', '#bacaa4', '#d2e0bc');
      jalan(c, '#ccdcbe', '#c0d0b2', '#c6d6b8', '#d8e6ca');
    }

    else if (TEMA_NAMA === 'tamanBentukPangkat') {
      P(c, 0, 0, W, 46, '#ffdfae');
      P(c, 0, 46, W, 46, '#f8d49e');
      P(c, 0, 92, W, 46, '#f0c892');
      P(c, 0, 138, W, 44, '#e8bc86');
      lingkaran(c, 116, 100, 12, '#ff9d6b');
      gunungSaljuDi(c, 338, 84, 58, 182, '#b0907a', '#f8e8d4');
      pinusDi(c, '#5a7a46', '#4c6c3c');
      for (let i = 0; i < 4; i++) {
        P(c, 60 + i * 22, 152, 5, 18, '#7a5230');
      }
      P(c, 56, 158, 96, 4, '#8a6244');
      tanah(c, '#dcc69e', '#d0ba92', '#e4d0aa');
      jalan(c, '#e0cca6', '#cab68e', '#d2c098', '#e8d6b0');
    }

    else if (TEMA_NAMA === 'jalanPulangAkar') {
      P(c, 0, 0, W, 46, '#f4c8a0');
      P(c, 0, 46, W, 46, '#ecc098');
      P(c, 0, 92, W, 46, '#e2b48e');
      P(c, 0, 138, W, 44, '#d8a884');
      lingkaran(c, 330, 108, 11, '#ff8a5a');
      gunungSaljuDi(c, 96, 80, 60, 182, '#a8846a', '#f2d8c0');
      gunungDi(c, 384, 90, 50, 182, '#b8907a');
      pinusDi(c, '#5e6a44', '#505c3a');
      for (let i = 0; i < 3; i++) {
        P(c, 120 + i * 60, 148, 3, 22, '#6a4a32');
        ctx.globalAlpha = 0.7; lingkaran(c, 121.5 + i * 60, 146, 3.5, '#ffd166'); ctx.globalAlpha = 1;
      }
      tanah(c, '#d4b894', '#c8ac8a', '#dec4a0');
      jalan(c, '#d8bc98', '#ccb090', '#d2b694', '#e4c8a6');
    }

    else if (TEMA_NAMA === 'kantorDetektifLog') {
      P(c, 0, 0, W, 46, '#161a30');
      P(c, 0, 46, W, 46, '#1b1f38');
      P(c, 0, 92, W, 46, '#212542');
      P(c, 0, 138, W, 44, '#272b4a');
      for (let i = 0; i < 8; i++) lingkaran(c, 36 + i * 58, 20 + (i % 2) * 10, 1.5, '#e8ecff');
      gunungDi(c, 150, 86, 62, 182, '#292d4e');
      gunungDi(c, 384, 92, 52, 182, '#2f3356');
      pinusDi(c, '#1d2734', '#171f2a');
      P(c, 310, 96, 70, 48, '#3a3e64');
      P(c, 304, 88, 82, 10, '#464a76');
      P(c, 326, 110, 12, 10, '#ffd166');
      ctx.globalAlpha = 0.16; lingkaran(c, 332, 115, 12, '#ffd166'); ctx.globalAlpha = 1;
      tanah(c, '#2c3050', '#262a46', '#34385a');
      jalan(c, '#3a3e64', '#323650', '#363a5c', '#44486e');
    }

    else if (TEMA_NAMA === 'tanggaPangkatDuaArah') {
      P(c, 0, 0, W, 46, '#d8f0fa');
      P(c, 0, 46, W, 46, '#cce8f4');
      P(c, 0, 92, W, 46, '#c0e0ee');
      P(c, 0, 138, W, 44, '#b4d8e8');
      lingkaran(c, 78, 44, 9, '#ffd166');
      gunungSaljuDi(c, 180, 76, 62, 182, '#9ab4c8', '#f0f8fc');
      gunungSaljuDi(c, 388, 88, 50, 182, '#8aa8c0', '#f0f8fc');
      pinusDi(c, '#3f7a4e', '#336c42');
      for (let i = 0; i < 5; i++) P(c, 300 + i * 15, 152 - i * 7, 16, 7 + i * 7, '#a89478');
      tanah(c, '#c0d4a8', '#b4c89c', '#ccdeb4');
      jalan(c, '#c8dab2', '#b2c69c', '#bad0a6', '#d4e2be');
    }

    else if (TEMA_NAMA === 'rumahKacaTumbuh') {
      P(c, 0, 0, W, 46, '#dff4ea');
      P(c, 0, 46, W, 46, '#d4eee2');
      P(c, 0, 92, W, 46, '#c8e8da');
      P(c, 0, 138, W, 44, '#bce0d0');
      lingkaran(c, 402, 44, 9, '#ffd166');
      gunungSaljuDi(c, 100, 82, 54, 182, '#8ab0a0', '#f0faf4');
      pinusDi(c, '#3e7a52', '#326c46');
      P(c, 300, 118, 86, 52, '#d8ecf0');
      P(c, 296, 110, 94, 10, '#b8d8dc');
      P(c, 318, 130, 12, 16, '#ffffff'); P(c, 344, 130, 12, 16, '#ffffff'); P(c, 366, 130, 12, 16, '#ffffff');
      tanah(c, '#c2dcb8', '#b6d0ac', '#cee4c4');
      jalan(c, '#c8e0be', '#bcd4b2', '#c2dab8', '#d4e8ca');
    }

    else if (TEMA_NAMA === 'lapanganBolaSenja') {
      P(c, 0, 0, W, 46, '#ffdfae');
      P(c, 0, 46, W, 46, '#f8d49e');
      P(c, 0, 92, W, 46, '#f0c892');
      P(c, 0, 138, W, 44, '#e8bc86');
      lingkaran(c, 358, 96, 12, '#ff9d6b');
      gunungSaljuDi(c, 90, 84, 56, 182, '#b0907a', '#f8e8d4');
      pinusDi(c, '#5a7a46', '#4c6c3c');
      P(c, 250, 148, 100, 3, '#8a6a48');
      for (let i = 0; i < 3; i++) P(c, 262 + i * 32, 151, 4, 10, '#7a5a3c');
      tanah(c, '#d8c298', '#ccb68c', '#e0cca4');
      jalan(c, '#dcc69e', '#d0ba92', '#d6c09a', '#e8d2aa');
    }

    else if (TEMA_NAMA === 'observatoriumAngka') {
      P(c, 0, 0, W, 46, '#10142c');
      P(c, 0, 46, W, 46, '#161a34');
      P(c, 0, 92, W, 46, '#1c2040');
      P(c, 0, 138, W, 44, '#222648');
      for (let i = 0; i < 9; i++) lingkaran(c, 30 + i * 52, 18 + (i % 3) * 9, 1.5, '#eef2ff');
      lingkaran(c, 400, 34, 6, '#f0ecff');
      gunungDi(c, 150, 88, 62, 182, '#252a4a');
      gunungDi(c, 380, 94, 54, 182, '#2b3052');
      pinusDi(c, '#1c2634', '#161e2a');
      P(c, 286, 128, 90, 36, '#3a4066');
      lingkaran(c, 331, 128, 22, '#484e78');
      P(c, 331, 106, 10, 10, '#ffd166');
      ctx.globalAlpha = 0.14; lingkaran(c, 331, 128, 26, '#ffd166'); ctx.globalAlpha = 1;
      tanah(c, '#2a2e4c', '#242846', '#323654');
      jalan(c, '#3a3e66', '#323654', '#363a5e', '#444870');
    }

    else if (TEMA_NAMA === 'puncakTanggaPangkat') {
      P(c, 0, 0, W, 46, '#1a1e36');
      P(c, 0, 46, W, 46, '#20243e');
      P(c, 0, 92, W, 46, '#262a46');
      P(c, 0, 138, W, 44, '#2c3050');
      for (let i = 0; i < 8; i++) lingkaran(c, 34 + i * 58, 20 + (i % 2) * 10, 1.5, '#eef2ff');
      gunungSaljuDi(c, 168, 72, 64, 182, '#333a5e', '#d8e0f4');
      gunungSaljuDi(c, 386, 84, 52, 182, '#3a4166', '#d8e0f4');
      pinusDi(c, '#1e2438', '#181e2e');
      for (let i = 0; i < 4; i++) {
        P(c, 130 + i * 18, 158 - i * 8, 18, 8 + i * 8, '#3e4266');
        ctx.globalAlpha = 0.55; lingkaran(c, 139 + i * 18, 155 - i * 8, 2, '#ffe9a3'); ctx.globalAlpha = 1;
      }
      tanah(c, '#303450', '#2a2e48', '#383c58');
      jalan(c, '#3e4266', '#363a58', '#3a3e5e', '#484c70');
    }

    else if (TEMA_NAMA === 'lapanganPapanSkor') {
      P(c, 0, 0, W, 46, '#f8ecd0');
      P(c, 0, 46, W, 46, '#f2e4c0');
      P(c, 0, 92, W, 46, '#ecdcb2');
      P(c, 0, 138, W, 44, '#e4d4a4');
      lingkaran(c, 84, 46, 9, '#ffd166');
      gunungSaljuDi(c, 170, 80, 58, 182, '#a8987e', '#f6eeda');
      gunungSaljuDi(c, 378, 86, 50, 182, '#b6a68c', '#f6eeda');
      pinusDi(c, '#4e7a4a', '#426c3e');
      P(c, 296, 122, 68, 48, '#7a6248');
      P(c, 290, 114, 80, 10, '#5e4a34');
      for (let i = 0; i < 6; i++) {
        P(c, 304 + (i % 3) * 18, 132 + Math.floor(i / 3) * 16, 12, 10, '#2c3a54');
        ctx.globalAlpha = 0.5 + 0.3 * Math.sin(i); lingkaran(c, 310 + (i % 3) * 18, 137 + Math.floor(i / 3) * 16, 2, '#ffd166'); ctx.globalAlpha = 1;
      }
      tanah(c, '#d8c8a0', '#ccbc94', '#e0d2ac');
      jalan(c, '#d4c49c', '#c8b890', '#cec098', '#e0d0a8');
    }

    else if (TEMA_NAMA === 'lorongPenginapan') {
      P(c, 0, 0, W, 46, '#d8f0fa');
      P(c, 0, 46, W, 46, '#cce8f4');
      P(c, 0, 92, W, 46, '#c0e0ee');
      P(c, 0, 138, W, 44, '#b4d8e8');
      lingkaran(c, 404, 42, 9, '#ffd166');
      gunungSaljuDi(c, 90, 82, 56, 182, '#9ab4c8', '#f0f8fc');
      pinusDi(c, '#3f7a4e', '#336c42');
      P(c, 300, 112, 92, 58, '#c8a878');
      P(c, 294, 104, 104, 10, '#a8885c');
      for (let l = 0; l < 2; l++) for (let k = 0; k < 3; k++) {
        P(c, 312 + k * 26, 122 + l * 26, 14, 16, '#6a4a30');
        ctx.globalAlpha = 0.35; lingkaran(c, 319 + k * 26, 130 + l * 26, 3, '#ffd166'); ctx.globalAlpha = 1;
      }
      tanah(c, '#c6d6b0', '#bacaa4', '#d2e0bc');
      jalan(c, '#ccdcbe', '#c0d0b2', '#c6d6b8', '#d8e6ca');
    }

    else if (TEMA_NAMA === 'mejaPiknikSejawat') {
      P(c, 0, 0, W, 46, '#ffdfae');
      P(c, 0, 46, W, 46, '#f8d49e');
      P(c, 0, 92, W, 46, '#f0c892');
      P(c, 0, 138, W, 44, '#e8bc86');
      lingkaran(c, 112, 100, 12, '#ff9d6b');
      gunungSaljuDi(c, 340, 84, 58, 182, '#b0907a', '#f8e8d4');
      pinusDi(c, '#5a7a46', '#4c6c3c');
      for (let i = 0; i < 2; i++) {
        P(c, 250 + i * 54, 150, 40, 4, '#8a6244');
        P(c, 254 + i * 54, 154, 4, 8, '#7a5230'); P(c, 282 + i * 54, 154, 4, 8, '#7a5230');
      }
      tanah(c, '#dcc69e', '#d0ba92', '#e4d0aa');
      jalan(c, '#e0cca6', '#cab68e', '#d2c098', '#e8d6b0');
    }

    else if (TEMA_NAMA === 'dapurResepGanda') {
      P(c, 0, 0, W, 46, '#f8ecd0');
      P(c, 0, 46, W, 46, '#f0e2c4');
      P(c, 0, 92, W, 46, '#e8dab8');
      P(c, 0, 138, W, 44, '#e0d2ac');
      lingkaran(c, 78, 44, 9, '#ffd166');
      gunungSaljuDi(c, 182, 78, 56, 182, '#a8987e', '#f6eeda');
      pinusDi(c, '#4e7a4a', '#426c3e');
      P(c, 310, 118, 76, 52, '#b8845c');
      P(c, 304, 110, 88, 10, '#96683e');
      P(c, 344, 92, 14, 18, '#8a5c38');
      ctx.globalAlpha = 0.3 + 0.2 * Math.sin(1); lingkaran(c, 351, 84, 5, '#fff3cf'); ctx.globalAlpha = 1;
      P(c, 322, 134, 12, 14, '#ffd166'); P(c, 348, 134, 12, 14, '#ffd166');
      tanah(c, '#d8c8a0', '#ccbc94', '#e0d2ac');
      jalan(c, '#d4c49c', '#c8b890', '#cec098', '#e0d0a8');
    }

    else if (TEMA_NAMA === 'pelataranBarisKolom') {
      P(c, 0, 0, W, 46, '#d8ecf8');
      P(c, 0, 46, W, 46, '#cce4f2');
      P(c, 0, 92, W, 46, '#c0dcec');
      P(c, 0, 138, W, 44, '#b4d4e6');
      lingkaran(c, 400, 44, 9, '#ffd166');
      gunungSaljuDi(c, 88, 80, 58, 182, '#9ab4c8', '#f0f8fc');
      gunungSaljuDi(c, 388, 88, 50, 182, '#8aa8c0', '#f0f8fc');
      pinusDi(c, '#3f7a4e', '#336c42');
      for (let i = 0; i < 3; i++) P(c, 292 + i * 26, 126, 10, 44, '#a8987e');
      P(c, 286, 118, 70, 8, '#8a7a5e');
      tanah(c, '#c8d8c0', '#bccab4', '#d4e0cc');
      jalan(c, '#cedec4', '#c2d0b8', '#c8d6be', '#dce6d0');
    }

    else if (TEMA_NAMA === 'berandaDuaKakak') {
      P(c, 0, 0, W, 46, '#ffdfae');
      P(c, 0, 46, W, 46, '#f8d49e');
      P(c, 0, 92, W, 46, '#f0c892');
      P(c, 0, 138, W, 44, '#e8bc86');
      lingkaran(c, 348, 96, 12, '#ff9d6b');
      gunungSaljuDi(c, 96, 82, 56, 182, '#b0907a', '#f8e8d4');
      pinusDi(c, '#5a7a46', '#4c6c3c');
      P(c, 296, 120, 84, 50, '#c89068');
      P(c, 288, 112, 100, 10, '#a06a44');
      P(c, 300, 146, 74, 4, '#8a5c38');
      P(c, 306, 138, 16, 8, '#6a4224'); P(c, 344, 138, 16, 8, '#6a4224');
      tanah(c, '#dcc69e', '#d0ba92', '#e4d0aa');
      jalan(c, '#e0cca6', '#cab68e', '#d2c098', '#e8d6b0');
    }

    else if (TEMA_NAMA === 'persimpanganDuaJalan') {
      P(c, 0, 0, W, 46, '#f4c8a0');
      P(c, 0, 46, W, 46, '#ecc098');
      P(c, 0, 92, W, 46, '#e2b48e');
      P(c, 0, 138, W, 44, '#d8a884');
      lingkaran(c, 320, 106, 11, '#ff8a5a');
      gunungSaljuDi(c, 92, 80, 58, 182, '#a8846a', '#f2d8c0');
      gunungDi(c, 390, 90, 50, 182, '#b8907a');
      pinusDi(c, '#5e6a44', '#505c3a');
      P(c, 196, 148, 10, 14, '#6a4a32');
      P(c, 176, 148, 50, 4, '#8a6244');
      tanah(c, '#d4b894', '#c8ac8a', '#dec4a0');
      jalan(c, '#d8bc98', '#ccb090', '#d2b694', '#e4c8a6');
    }

    else if (TEMA_NAMA === 'kelasRaporGunung') {
      P(c, 0, 0, W, 46, '#e4f4e0');
      P(c, 0, 46, W, 46, '#d8eecf');
      P(c, 0, 92, W, 46, '#cce8c4');
      P(c, 0, 138, W, 44, '#c0e0b8');
      lingkaran(c, 402, 44, 9, '#ffd166');
      gunungSaljuDi(c, 94, 82, 54, 182, '#9ab8a8', '#f0faf4');
      pinusDi(c, '#3e7a52', '#326c46');
      P(c, 300, 116, 88, 54, '#d8c8a8');
      P(c, 294, 108, 100, 10, '#b8a888');
      P(c, 314, 130, 14, 14, '#7a9a68'); P(c, 342, 130, 14, 14, '#7a9a68'); P(c, 366, 130, 14, 14, '#7a9a68');
      tanah(c, '#c8dcbe', '#bcd0b2', '#d4e4ca');
      jalan(c, '#cee2c4', '#c2d6b8', '#c8dcc0', '#dae8ce');
    }

    else if (TEMA_NAMA === 'gudangTigaKotak') {
      P(c, 0, 0, W, 46, '#1a1e36');
      P(c, 0, 46, W, 46, '#20243e');
      P(c, 0, 92, W, 46, '#262a46');
      P(c, 0, 138, W, 44, '#2c3050');
      for (let i = 0; i < 8; i++) lingkaran(c, 36 + i * 58, 20 + (i % 2) * 10, 1.5, '#e8ecff');
      gunungDi(c, 150, 86, 62, 182, '#292d4e');
      gunungDi(c, 384, 92, 52, 182, '#2f3356');
      pinusDi(c, '#1d2734', '#171f2a');
      P(c, 306, 116, 78, 58, '#3a3e64');
      P(c, 300, 108, 90, 10, '#464a76');
      P(c, 318, 134, 10, 10, '#ffd166'); P(c, 338, 134, 10, 10, '#ffd166'); P(c, 358, 134, 10, 10, '#ffd166');
      ctx.globalAlpha = 0.15; lingkaran(c, 343, 139, 14, '#ffd166'); ctx.globalAlpha = 1;
      tanah(c, '#2c3050', '#262a46', '#34385a');
      jalan(c, '#3a3e64', '#323650', '#363a5c', '#44486e');
    }

    else if (TEMA_NAMA === 'puncakPapanAngka') {
      P(c, 0, 0, W, 46, '#1a1e36');
      P(c, 0, 46, W, 46, '#20243e');
      P(c, 0, 92, W, 46, '#262a46');
      P(c, 0, 138, W, 44, '#2c3050');
      for (let i = 0; i < 8; i++) lingkaran(c, 34 + i * 58, 20 + (i % 2) * 10, 1.5, '#eef2ff');
      gunungSaljuDi(c, 168, 72, 64, 182, '#333a5e', '#d8e0f4');
      gunungSaljuDi(c, 386, 84, 52, 182, '#3a4166', '#d8e0f4');
      pinusDi(c, '#1e2438', '#181e2e');
      for (let i = 0; i < 4; i++) {
        P(c, 118 + i * 24, 150 - i * 6, 16, 12, '#3e4266');
        ctx.globalAlpha = 0.55; lingkaran(c, 126 + i * 24, 154 - i * 6, 2, '#ffe9a3'); ctx.globalAlpha = 1;
      }
      tanah(c, '#303450', '#2a2e48', '#383c58');
      jalan(c, '#3e4266', '#363a58', '#3a3e5e', '#484c70');
    }

    else if (TEMA_NAMA === 'padangSegitiga') {
      P(c, 0, 0, W, 46, '#ffefc4');
      P(c, 0, 46, W, 46, '#f8e6b4');
      P(c, 0, 92, W, 46, '#f0dca4');
      P(c, 0, 138, W, 44, '#e8d294');
      lingkaran(c, 74, 42, 10, '#ffd166');
      gunungSaljuDi(c, 356, 84, 56, 182, '#b8a488', '#f6eeda');
      pinusDi(c, '#5c7a44', '#4e6c3a');
      P(c, 110, 152, 96, 6, '#8a7256');
      P(c, 110, 158, 6, 32, '#8a7256');
      P(c, 200, 158, 6, 32, '#8a7256');
      P(c, 110, 146, 6, 6, '#9a8266');
      P(c, 122, 152, 6, 6, '#9a8266');
      P(c, 134, 158, 6, 6, '#9a8266');
      P(c, 146, 164, 6, 6, '#9a8266');
      ctx.globalAlpha = 0.5; lingkaran(c, 176, 172, 3, '#ffe9a3'); ctx.globalAlpha = 1;
      tanah(c, '#d8cc9c', '#ccc092', '#e2d8a8');
      jalan(c, '#d4c894', '#c8bc88', '#cec49a', '#e0d6ac');
    }

    else if (TEMA_NAMA === 'lorongTanggaSandar') {
      P(c, 0, 0, W, 46, '#d8f0fa');
      P(c, 0, 46, W, 46, '#cce8f4');
      P(c, 0, 92, W, 46, '#c0e0ee');
      P(c, 0, 138, W, 44, '#b4d8e8');
      lingkaran(c, 380, 44, 9, '#fff3b0');
      gunungSaljuDi(c, 84, 80, 54, 182, '#9ab4c8', '#f0f8fc');
      pinusDi(c, '#4a7a52', '#3e6c46');
      P(c, 268, 96, 10, 92, '#8a7a62');
      P(c, 258, 96, 30, 8, '#9a8a72');
      P(c, 278, 160, 20, 4, '#6e5a44');
      P(c, 282, 170, 20, 4, '#6e5a44');
      P(c, 286, 180, 20, 4, '#6e5a44');
      ctx.globalAlpha = 0.5; lingkaran(c, 302, 100, 3, '#ffe9a3'); ctx.globalAlpha = 1;
      tanah(c, '#c6d6b0', '#bacaa4', '#d2e0bc');
      jalan(c, '#ccdcbe', '#c0d0b2', '#c6d6b8', '#d8e6ca');
    }

    else if (TEMA_NAMA === 'menaraSisiMiring') {
      P(c, 0, 0, W, 46, '#ffd9a8');
      P(c, 0, 46, W, 46, '#f8ce98');
      P(c, 0, 92, W, 46, '#f0c288');
      P(c, 0, 138, W, 44, '#e8b478');
      lingkaran(c, 106, 108, 11, '#ff9d6b');
      gunungSaljuDi(c, 350, 82, 58, 182, '#a8846a', '#f8dcc0');
      pinusDi(c, '#5a6a46', '#4c5c3a');
      P(c, 210, 118, 26, 70, '#7a6248');
      P(c, 206, 112, 34, 8, '#66503a');
      P(c, 214, 124, 24, 4, '#c89060');
      P(c, 216, 134, 22, 4, '#c89060');
      ctx.globalAlpha = 0.5; lingkaran(c, 240, 118, 3, '#ffd166'); ctx.globalAlpha = 1;
      tanah(c, '#d8bc94', '#ccb088', '#e2c89e');
      jalan(c, '#d4b88e', '#c8ac82', '#ceb488', '#e0c498');
    }

    else if (TEMA_NAMA === 'pelataranMiniatur') {
      P(c, 0, 0, W, 46, '#ffefc4');
      P(c, 0, 46, W, 46, '#f8e6b4');
      P(c, 0, 92, W, 46, '#f0dca4');
      P(c, 0, 138, W, 44, '#e8d294');
      lingkaran(c, 62, 44, 9, '#ffd166');
      gunungSaljuDi(c, 390, 86, 50, 182, '#b0a084', '#f4ecd8');
      pinusDi(c, '#567646', '#48683a');
      P(c, 250, 164, 120, 12, '#8a7256');
      P(c, 258, 176, 10, 14, '#6e5a44'); P(c, 352, 176, 10, 14, '#6e5a44');
      P(c, 276, 144, 8, 20, '#a89078'); P(c, 284, 132, 8, 12, '#96806a');
      P(c, 318, 150, 10, 14, '#a89078'); P(c, 328, 142, 9, 10, '#96806a');
      ctx.globalAlpha = 0.5; lingkaran(c, 280, 128, 2.5, '#ffe9a3'); lingkaran(c, 332, 138, 2.5, '#ffe9a3'); ctx.globalAlpha = 1;
      tanah(c, '#d8cc9c', '#ccc092', '#e2d8a8');
      jalan(c, '#d4c894', '#c8bc88', '#cec49a', '#e0d6ac');
    }

    else if (TEMA_NAMA === 'kebunBayangan') {
      P(c, 0, 0, W, 46, '#ffdfae');
      P(c, 0, 46, W, 46, '#f8d49e');
      P(c, 0, 92, W, 46, '#f0c892');
      P(c, 0, 138, W, 44, '#e8bc86');
      lingkaran(c, 84, 96, 12, '#ff9d6b');
      gunungSaljuDi(c, 372, 84, 54, 182, '#b08a70', '#f8e0c8');
      pinusDi(c, '#5e6e42', '#506036');
      P(c, 236, 128, 6, 62, '#7a5c3e');
      P(c, 242, 128, 6, 62, '#8a6a48');
      ctx.globalAlpha = 0.35;
      P(c, 248, 186, 130, 3, '#6a5238');
      P(c, 90, 188, 300, 2, '#7a6244');
      ctx.globalAlpha = 1;
      tanah(c, '#dcc69e', '#d0ba92', '#e4d0aa');
      jalan(c, '#e0cca6', '#cab68e', '#d2c098', '#e8d6b0');
    }

    else if (TEMA_NAMA === 'tamanAyunan') {
      P(c, 0, 0, W, 46, '#ffdfae');
      P(c, 0, 46, W, 46, '#f8d49e');
      P(c, 0, 92, W, 46, '#f0c892');
      P(c, 0, 138, W, 44, '#e8bc86');
      lingkaran(c, 396, 42, 9, '#ffd166');
      gunungSaljuDi(c, 90, 82, 56, 182, '#b0a084', '#f4ecd8');
      pinusDi(c, '#4e7a4a', '#426c3e');
      P(c, 262, 108, 8, 84, '#8a6a48');
      P(c, 322, 108, 8, 84, '#8a6a48');
      P(c, 254, 100, 84, 9, '#9a7a54');
      P(c, 276, 118, 4, 44, '#6e5a44'); P(c, 312, 118, 4, 44, '#6e5a44');
      P(c, 272, 160, 48, 8, '#c89060');
      tanah(c, '#dcc69e', '#d0ba92', '#e4d0aa');
      jalan(c, '#e0cca6', '#cab68e', '#d2c098', '#e8d6b0');
    }

    else if (TEMA_NAMA === 'bukitRodaRaksasa') {
      P(c, 0, 0, W, 46, '#1a1e36');
      P(c, 0, 46, W, 46, '#20243e');
      P(c, 0, 92, W, 46, '#262a46');
      P(c, 0, 138, W, 44, '#2c3050');
      for (let i = 0; i < 8; i++) lingkaran(c, 40 + i * 54, 18 + (i % 2) * 12, 1.5, '#eef2ff');
      lingkaran(c, 318, 84, 38, '#3e4468');
      lingkaran(c, 318, 84, 33, '#2c3050');
      for (let i = 0; i < 8; i++) {
        const sud = i * Math.PI / 4;
        ctx.globalAlpha = 0.55; lingkaran(c, 318 + 33 * Math.cos(sud), 84 + 33 * Math.sin(sud), 2, '#ffe9a3'); ctx.globalAlpha = 1;
      }
      P(c, 314, 122, 8, 66, '#3a4166');
      gunungSaljuDi(c, 92, 92, 52, 182, '#333a5e', '#d8e0f4');
      pinusDi(c, '#1e2438', '#181e2e');
      tanah(c, '#303450', '#2a2e48', '#383c58');
      jalan(c, '#3e4266', '#363a58', '#3a3e5e', '#484c70');
    }

    else if (TEMA_NAMA === 'gerbangTigaSudut') {
      P(c, 0, 0, W, 46, '#ffefc4');
      P(c, 0, 46, W, 46, '#f8e6b4');
      P(c, 0, 92, W, 46, '#f0dca4');
      P(c, 0, 138, W, 44, '#e8d294');
      lingkaran(c, 70, 40, 9, '#ffd166');
      gunungSaljuDi(c, 400, 84, 48, 182, '#b8a488', '#f6eeda');
      pinusDi(c, '#567a48', '#486c3c');
      for (let i = 0; i < 3; i++) {
        const gx = 150 + i * 70;
        P(c, gx, 148, 44, 5, '#8a7256');
        P(c, gx, 153, 5, 36, '#8a7256'); P(c, gx + 39, 153, 5, 36, '#8a7256');
        ctx.globalAlpha = 0.5; lingkaran(c, gx + 22, 146, 3, '#ffe9a3'); ctx.globalAlpha = 1;
      }
      tanah(c, '#d8cc9c', '#ccc092', '#e2d8a8');
      jalan(c, '#d4c894', '#c8bc88', '#cec49a', '#e0d6ac');
    }

    else if (TEMA_NAMA === 'kolamRiakMalam') {
      P(c, 0, 0, W, 46, '#141830');
      P(c, 0, 46, W, 46, '#181c38');
      P(c, 0, 92, W, 46, '#1c2040');
      P(c, 0, 138, W, 44, '#20244a');
      for (let i = 0; i < 7; i++) lingkaran(c, 46 + i * 58, 20 + (i % 2) * 9, 1.5, '#eef2ff');
      lingkaran(c, 64, 52, 9, '#e8ecf8');
      gunungSaljuDi(c, 346, 88, 54, 182, '#2c3252', '#c8d2ea');
      pinusDi(c, '#1a2036', '#141a2c');
      P(c, 120, 178, 240, 12, '#2a3454');
      for (let i = 0; i < 5; i++) {
        ctx.globalAlpha = 0.5 + 0.25 * Math.sin(i * 2);
        P(c, 132 + i * 46, 182 + (i % 2) * 3, 30, 2, '#9fb8f0');
        ctx.globalAlpha = 1;
      }
      tanah(c, '#283050', '#222a48', '#303858');
      jalan(c, '#343c5e', '#2c3454', '#30385a', '#3c4468');
    }

    else if (TEMA_NAMA === 'puncakPengukurJauh') {
      P(c, 0, 0, W, 46, '#161a34');
      P(c, 0, 46, W, 46, '#1a1e3c');
      P(c, 0, 92, W, 46, '#1e2244');
      P(c, 0, 138, W, 44, '#242850');
      for (let i = 0; i < 9; i++) lingkaran(c, 30 + i * 52, 16 + (i % 3) * 11, 1.5, '#eef2ff');
      gunungSaljuDi(c, 66, 84, 60, 182, '#303658', '#d8e0f4');
      gunungSaljuDi(c, 392, 92, 50, 182, '#384062', '#d8e0f4');
      pinusDi(c, '#1c2240', '#161c30');
      P(c, 200, 128, 16, 8, '#3e4468');
      P(c, 206, 120, 14, 6, '#4a5078');
      P(c, 218, 116, 8, 5, '#5a6088');
      for (let i = 0; i < 4; i++) {
        P(c, 280 + i * 26, 158 - i * 7, 18, 12, '#3e4466');
        ctx.globalAlpha = 0.55; lingkaran(c, 289 + i * 26, 162 - i * 7, 2, '#ffe9a3'); ctx.globalAlpha = 1;
      }
      tanah(c, '#2c3050', '#262a48', '#343858');
      jalan(c, '#3a3e60', '#323656', '#363a5c', '#44486c');
    }

    else if (TEMA_NAMA === 'padangDuaPanah') {
      P(c, 0, 0, W, 46, '#ffefc4');
      P(c, 0, 46, W, 46, '#f8e6b4');
      P(c, 0, 92, W, 46, '#f0dca4');
      P(c, 0, 138, W, 44, '#e8d294');
      lingkaran(c, 64, 40, 10, '#ffd166');
      gunungSaljuDi(c, 356, 84, 56, 182, '#b8a488', '#f6eeda');
      pinusDi(c, '#5c7a44', '#4e6c3a');
      P(c, 186, 156, 6, 34, '#8a7256');
      P(c, 150, 160, 34, 4, '#9a8266');
      P(c, 196, 160, 34, 4, '#9a8266');
      ctx.globalAlpha = 0.5; lingkaran(c, 142, 158, 3, '#ffe9a3'); lingkaran(c, 238, 158, 3, '#ffe9a3'); ctx.globalAlpha = 1;
      tanah(c, '#d8cc9c', '#ccc092', '#e2d8a8');
      jalan(c, '#d4c894', '#c8bc88', '#cec49a', '#e0d6ac');
    }

    else if (TEMA_NAMA === 'jalanRumahSekolah') {
      P(c, 0, 0, W, 46, '#d8f0fa');
      P(c, 0, 46, W, 46, '#cce8f4');
      P(c, 0, 92, W, 46, '#c0e0ee');
      P(c, 0, 138, W, 44, '#b4d8e8');
      lingkaran(c, 396, 40, 9, '#fff3b0');
      gunungSaljuDi(c, 60, 80, 54, 182, '#9ab4c8', '#f0f8fc');
      pinusDi(c, '#4a7a52', '#3e6c46');
      P(c, 84, 158, 44, 34, '#c8845c');
      P(c, 80, 150, 52, 10, '#a85c3a');
      P(c, 100, 174, 10, 18, '#6e4a30');
      P(c, 300, 138, 56, 54, '#b8c4d8');
      P(c, 296, 130, 64, 10, '#8a94b0');
      P(c, 310, 148, 10, 12, '#4a5878'); P(c, 330, 148, 10, 12, '#4a5878');
      P(c, 310, 166, 10, 12, '#4a5878'); P(c, 330, 166, 10, 12, '#4a5878');
      ctx.globalAlpha = 0.5; lingkaran(c, 328, 124, 3, '#ffe9a3'); ctx.globalAlpha = 1;
      tanah(c, '#c6d6b0', '#bacaa4', '#d2e0bc');
      jalan(c, '#ccdcbe', '#c0d0b2', '#c6d6b8', '#d8e6ca');
    }

    else if (TEMA_NAMA === 'lorongPanahSambung') {
      P(c, 0, 0, W, 46, '#eef8e0');
      P(c, 0, 46, W, 46, '#e4f0d0');
      P(c, 0, 92, W, 46, '#d8e8c4');
      P(c, 0, 138, W, 44, '#cce0b8');
      lingkaran(c, 84, 42, 9, '#ffd166');
      gunungSaljuDi(c, 396, 84, 50, 182, '#9aa884', '#f0f6e4');
      pinusDi(c, '#567a48', '#486c3c');
      P(c, 120, 160, 26, 4, '#6e5a44');
      P(c, 146, 168, 26, 4, '#6e5a44');
      P(c, 172, 176, 26, 4, '#6e5a44');
      ctx.globalAlpha = 0.5; lingkaran(c, 134, 158, 3, '#ffe9a3'); ctx.globalAlpha = 1;
      tanah(c, '#ccd8b0', '#c0cca4', '#d8e4bc');
      jalan(c, '#d4e0bc', '#c8d4b0', '#cedab4', '#dee8c8');
    }

    else if (TEMA_NAMA === 'lapanganPanahKembar') {
      P(c, 0, 0, W, 46, '#fffdf2');
      P(c, 0, 46, W, 46, '#f2f8ea');
      P(c, 0, 92, W, 46, '#e8f2dc');
      P(c, 0, 138, W, 44, '#dcecd0');
      lingkaran(c, 372, 42, 9, '#ffd166');
      gunungSaljuDi(c, 88, 82, 56, 182, '#a8b08c', '#f2f8e8');
      pinusDi(c, '#4e7a4a', '#426c3e');
      P(c, 196, 150, 5, 44, '#8a6a48');
      P(c, 201, 150, 5, 44, '#8a6a48');
      P(c, 190, 146, 30, 5, '#9a7a54');
      ctx.globalAlpha = 0.5; lingkaran(c, 205, 144, 3, '#ffe9a3'); ctx.globalAlpha = 1;
      tanah(c, '#d8cc9c', '#ccc092', '#e2d8a8');
      jalan(c, '#d4c894', '#c8bc88', '#cec49a', '#e0d6ac');
    }

    else if (TEMA_NAMA === 'tamanKisiKotak') {
      P(c, 0, 0, W, 46, '#eef8e0');
      P(c, 0, 46, W, 46, '#e4f0d0');
      P(c, 0, 92, W, 46, '#d8e8c4');
      P(c, 0, 138, W, 44, '#cce0b8');
      lingkaran(c, 70, 40, 9, '#ffd166');
      gunungSaljuDi(c, 380, 86, 48, 182, '#9aa884', '#f0f6e4');
      pinusDi(c, '#567a48', '#486c3c');
      for (let i = 0; i < 5; i++) P(c, 150 + i * 36, 158, 2, 40, '#8a7a5c');
      for (let i = 0; i < 3; i++) P(c, 150, 158 + i * 20, 146, 2, '#8a7a5c');
      P(c, 150, 154, 6, 6, '#c85a2a');
      tanah(c, '#ccd8b0', '#c0cca4', '#d8e4bc');
      jalan(c, '#d4e0bc', '#c8d4b0', '#cedab4', '#dee8c8');
    }

    else if (TEMA_NAMA === 'dermagaPerahuSungai') {
      P(c, 0, 0, W, 46, '#d8f0fa');
      P(c, 0, 46, W, 46, '#cce8f4');
      P(c, 0, 92, W, 46, '#c0e0ee');
      P(c, 0, 138, W, 44, '#b4d8e8');
      lingkaran(c, 90, 42, 9, '#fff3b0');
      gunungSaljuDi(c, 350, 80, 56, 182, '#8ca8bc', '#e8f4fa');
      pinusDi(c, '#4a7a52', '#3e6c46');
      P(c, 120, 168, 96, 8, '#8a6a48');
      P(c, 128, 176, 8, 22, '#6e5238'); P(c, 200, 176, 8, 22, '#6e5238');
      P(c, 262, 172, 58, 10, '#8a6a48');
      P(c, 268, 182, 46, 12, '#7a5638');
      P(c, 288, 156, 5, 18, '#5e4a34');
      ctx.globalAlpha = 0.4; lingkaran(c, 150, 200, 3, '#fffdf2'); lingkaran(c, 240, 206, 3, '#fffdf2'); ctx.globalAlpha = 1;
      tanah(c, '#b8ccd8', '#acc0cc', '#c4d6e0');
      jalan(c, '#bccfdc', '#b0c4d0', '#b6c9d6', '#c8dae4');
    }

    else if (TEMA_NAMA === 'alunKotaBurung') {
      P(c, 0, 0, W, 46, '#141830');
      P(c, 0, 46, W, 46, '#181c38');
      P(c, 0, 92, W, 46, '#1c2040');
      P(c, 0, 138, W, 44, '#20244a');
      for (let i = 0; i < 8; i++) lingkaran(c, 36 + i * 54, 18 + (i % 2) * 10, 1.5, '#eef2ff');
      lingkaran(c, 352, 44, 9, '#e8ecf8');
      gunungSaljuDi(c, 60, 88, 52, 182, '#2c3252', '#c8d2ea');
      pinusDi(c, '#1a2036', '#141a2c');
      P(c, 150, 132, 34, 56, '#2c3454');
      P(c, 196, 148, 28, 40, '#343c60');
      P(c, 236, 122, 38, 66, '#2c3454');
      P(c, 286, 152, 26, 36, '#343c60');
      for (let i = 0; i < 3; i++) {
        ctx.globalAlpha = 0.5 + 0.3 * Math.sin(i * 1.8);
        P(c, 158, 140 + i * 14, 6, 7, '#ffe9a3'); P(c, 172, 140 + i * 14, 6, 7, '#ffe9a3');
        ctx.globalAlpha = 1;
      }
      tanah(c, '#283050', '#222a48', '#303858');
      jalan(c, '#343c5e', '#2c3454', '#30385a', '#3c4468');
    }

    else if (TEMA_NAMA === 'menaraTanggaTiga') {
      P(c, 0, 0, W, 46, '#ffd9a8');
      P(c, 0, 46, W, 46, '#f8ce98');
      P(c, 0, 92, W, 46, '#f0c288');
      P(c, 0, 138, W, 44, '#e8b478');
      lingkaran(c, 104, 104, 11, '#ff9d6b');
      gunungSaljuDi(c, 366, 82, 56, 182, '#a8846a', '#f8dcc0');
      pinusDi(c, '#5a6a46', '#4c5c3a');
      P(c, 176, 120, 22, 130, '#7a6248');
      P(c, 172, 114, 30, 8, '#66503a');
      for (let i = 0; i < 4; i++) P(c, 198 + i * 10, 224 - i * 18, 8, 4, '#9a7a54');
      ctx.globalAlpha = 0.5; lingkaran(c, 187, 132, 3, '#ffd166'); ctx.globalAlpha = 1;
      tanah(c, '#d8bc94', '#ccb088', '#e2c89e');
      jalan(c, '#d4b88e', '#c8ac82', '#ceb488', '#e0c498');
    }

    else if (TEMA_NAMA === 'galeriTigaPandangan') {
      P(c, 0, 0, W, 46, '#fffdf2');
      P(c, 0, 46, W, 46, '#f2f0e4');
      P(c, 0, 92, W, 46, '#e8e6d8');
      P(c, 0, 138, W, 44, '#dcdac8');
      lingkaran(c, 388, 42, 9, '#ffd166');
      gunungSaljuDi(c, 66, 84, 52, 182, '#a8a48c', '#f4f2e4');
      pinusDi(c, '#4e7a4a', '#426c3e');
      P(c, 220, 120, 130, 8, '#8a7256');
      P(c, 228, 128, 8, 62, '#6e5a44'); P(c, 334, 128, 8, 62, '#6e5a44');
      P(c, 236, 96, 30, 22, '#3e4266');
      P(c, 274, 96, 30, 22, '#3e4266');
      P(c, 312, 96, 30, 22, '#3e4266');
      ctx.globalAlpha = 0.4; lingkaran(c, 251, 92, 2.5, '#ffe9a3'); lingkaran(c, 289, 92, 2.5, '#ffe9a3'); lingkaran(c, 327, 92, 2.5, '#ffe9a3'); ctx.globalAlpha = 1;
      tanah(c, '#d8cc9c', '#ccc092', '#e2d8a8');
      jalan(c, '#d4c894', '#c8bc88', '#cec49a', '#e0d6ac');
    }

    else if (TEMA_NAMA === 'puncakLintasLembah') {
      P(c, 0, 0, W, 46, '#161a34');
      P(c, 0, 46, W, 46, '#1a1e3c');
      P(c, 0, 92, W, 46, '#1e2244');
      P(c, 0, 138, W, 44, '#242850');
      for (let i = 0; i < 9; i++) lingkaran(c, 32 + i * 52, 16 + (i % 3) * 11, 1.5, '#eef2ff');
      gunungSaljuDi(c, 74, 84, 58, 182, '#303658', '#d8e0f4');
      gunungSaljuDi(c, 386, 90, 50, 182, '#384062', '#d8e0f4');
      pinusDi(c, '#1c2240', '#161c30');
      for (let i = 0; i < 4; i++) {
        P(c, 240 + i * 30, 160 - i * 8, 20, 10, '#3e4466');
        ctx.globalAlpha = 0.5; lingkaran(c, 250 + i * 30, 156 - i * 8, 2, '#ffe9a3'); ctx.globalAlpha = 1;
      }
      P(c, 150, 140, 26, 5, '#4a5078');
      P(c, 150, 145, 5, 40, '#3a4166'); P(c, 171, 145, 5, 40, '#3a4166');
      tanah(c, '#2c3050', '#262a48', '#343858');
      jalan(c, '#3a3e60', '#323656', '#363a5c', '#44486c');
    }


    else if (TEMA_NAMA === 'lorongLangkahSetengah') {
      P(c, 0, 0, W, 46, '#f2e2c4');
      P(c, 0, 46, W, 46, '#ecd8b4');
      P(c, 0, 92, W, 46, '#e4ceac');
      P(c, 0, 138, W, 44, '#dcc49e');
      lingkaran(c, 404, 34, 11, '#fff2d0');
      gunungDi(c, 70, 88, 62, 186, '#c8ac88');
      gunungDi(c, 388, 82, 54, 186, '#bca07e');
      P(c, 320, 150, 16, 32, '#9a7e5c');
      P(c, 316, 144, 24, 7, '#8a6e4c');
      for (let i = 0; i < 3; i++) P(c, 322 + i * 4, 152 + i * 8, 8, 4, '#ffe9a3');
      pinusDi(c, '#8a7a4c', '#6e6440');
      tanah(c, '#a8926e', '#9a8562', '#b49e7a');
      jalan(c, '#c9ae86', '#b0966e', '#b69c74', '#d4ba92');
      for (let i = 0; i < 5; i++) P(c, 60 + i * 78, 200 - (i % 2) * 6, 22, 3, '#fff2d0');
    }

    else if (TEMA_NAMA === 'ladangSembilanMenempel') {
      P(c, 0, 0, W, 46, '#9fdcf5');
      P(c, 0, 46, W, 46, '#8fd3f0');
      P(c, 0, 92, W, 46, '#a5e0f5');
      P(c, 0, 138, W, 44, '#b7e8f8');
      lingkaran(c, 60, 32, 11, '#ffe9a3');
      lingkaran(c, 60, 32, 8, '#ffd166');
      gunungDi(c, 120, 84, 60, 186, '#a9c8e2');
      gunungDi(c, 350, 90, 52, 186, '#98bcd9');
      P(c, 96, 152, 10, 30, '#9a8266');
      P(c, 88, 146, 26, 8, '#8a7256');
      P(c, 330, 158, 8, 24, '#9a8266');
      P(c, 324, 152, 20, 7, '#8a7256');
      hutanDi(c, '#2f7a44', '#2a6d3c');
      tanah(c, '#7ec850', '#6fb844', '#8fd15c');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
      for (let i = 0; i < 7; i++) {
        ctx.globalAlpha = 0.6;
        lingkaran(c, 30 + i * 62, 196 + (i % 3) * 12, 2, '#ffe9a3');
        ctx.globalAlpha = 1;
      }
    }

    else if (TEMA_NAMA === 'stasiunKeretaNilai') {
      P(c, 0, 0, W, 40, '#ffd9a3');
      P(c, 0, 40, W, 44, '#f8c48c');
      P(c, 0, 84, W, 48, '#f0b47e');
      P(c, 0, 132, W, 50, '#e2a470');
      lingkaran(c, 396, 118, 14, '#ffb86b');
      lingkaran(c, 396, 118, 10, '#ff9d4a');
      gunungDi(c, 90, 92, 58, 186, '#c08a8a');
      gunungDi(c, 370, 98, 50, 186, '#b07c80');
      P(c, 30, 120, 70, 62, '#7a6248');
      P(c, 26, 112, 78, 9, '#5e4a34');
      for (let i = 0; i < 3; i++) P(c, 38 + i * 20, 132, 12, 12, '#ffe9a3');
      P(c, 0, 182, W, 5, '#5e4a34');
      P(c, 20, 176, 5, 6, '#5e4a34'); P(c, 60, 176, 5, 6, '#5e4a34'); P(c, 100, 176, 5, 6, '#5e4a34');
      P(c, 180, 128, 12, 54, '#6e5638');
      P(c, 168, 122, 36, 8, '#5e4a34');
      tanah(c, '#a88c64', '#9a7e58', '#b49870');
      jalan(c, '#8a7256', '#6e5a42', '#7a6448', '#967e60');
    }

    else if (TEMA_NAMA === 'kebunAsimtot') {
      P(c, 0, 0, W, 46, '#e8f4d8');
      P(c, 0, 46, W, 46, '#def0cc');
      P(c, 0, 92, W, 46, '#d4eac0');
      P(c, 0, 138, W, 44, '#cae4b4');
      lingkaran(c, 424, 30, 10, '#fff2d0');
      P(c, 0, 158, W, 4, '#8a9a68');
      for (let i = 0; i < 12; i++) P(c, i * 40 + 8, 150, 4, 12, '#7a8a58');
      for (let i = 0; i < 9; i++) lingkaran(c, 12 + i * 48, 172 - i * 2, 5 - i * 0.3, '#5a8a4c');
      hutanDi(c, '#3f7a44', '#376d3c');
      tanah(c, '#8ec45e', '#7eb450', '#9cd26c');
      jalan(c, '#c9b884', '#b0a06c', '#b8a874', '#d4c490');
      bungaDi(c, '#ffb86b', '#f2b8cc');
    }

    else if (TEMA_NAMA === 'bengkelTaliHalus') {
      P(c, 0, 0, W, 46, '#f5e6c8');
      P(c, 0, 46, W, 46, '#eedcba');
      P(c, 0, 92, W, 46, '#e6d2ae');
      P(c, 0, 138, W, 44, '#dcc8a2');
      lingkaran(c, 52, 32, 10, '#fff2d0');
      gunungDi(c, 130, 90, 60, 186, '#c4a882');
      gunungDi(c, 366, 96, 52, 186, '#b89c76');
      P(c, 300, 128, 84, 54, '#8a6e4c');
      P(c, 294, 120, 96, 9, '#6e5638');
      for (let i = 0; i < 2; i++) P(c, 310 + i * 36, 142, 14, 14, '#ffe9a3');
      P(c, 320, 166, 44, 4, '#c85a2a');
      P(c, 320, 162, 44, 4, '#a8442a');
      tanah(c, '#b09a70', '#a28c62', '#bca678');
      jalan(c, '#c9ae86', '#b0966e', '#b69c74', '#d4ba92');
      for (let i = 0; i < 5; i++) P(c, 44 + i * 12, 160, 9, 3, '#c85a2a');
    }

    else if (TEMA_NAMA === 'bukitTanggaLandai') {
      P(c, 0, 0, W, 40, '#ffe0b8');
      P(c, 0, 40, W, 44, '#f8d4a8');
      P(c, 0, 84, W, 48, '#f0c898');
      P(c, 0, 132, W, 50, '#e6bc8a');
      lingkaran(c, 88, 116, 13, '#ffb86b');
      lingkaran(c, 88, 116, 9, '#ff9d4a');
      gunungDi(c, 150, 88, 62, 186, '#c89a78');
      gunungDi(c, 400, 94, 54, 186, '#b88c6c');
      for (let i = 0; i < 5; i++) {
        P(c, 240 + i * 18, 176 - i * 5, 16, 5, '#8a6e4c');
        P(c, 240 + i * 18, 176 - i * 5 - 5, 4, 5, '#9a7e5c');
      }
      pinusDi(c, '#7a6a42', '#645634');
      tanah(c, '#a8925e', '#9a8452', '#b49e6a');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
      batuDekor(c);
    }

    else if (TEMA_NAMA === 'lintasanKilasLari') {
      P(c, 0, 0, W, 46, '#f2e8d0');
      P(c, 0, 46, W, 46, '#eadcc0');
      P(c, 0, 92, W, 46, '#e2d4b4');
      P(c, 0, 138, W, 44, '#d8c8a6');
      lingkaran(c, 412, 32, 11, '#ffe9a3');
      lingkaran(c, 412, 32, 8, '#ffd166');
      gunungDi(c, 100, 88, 58, 186, '#c0ac8a');
      gunungDi(c, 378, 94, 52, 186, '#b4a07e');
      P(c, 200, 140, 90, 42, '#7a6a52');
      P(c, 194, 132, 102, 9, '#5e5238');
      for (let i = 0; i < 2; i++) P(c, 214 + i * 34, 152, 18, 13, '#ffe9a3');
      P(c, 0, 182, W, 6, '#c86a4a');
      P(c, 0, 182, W, 2, '#e8906a');
      for (let i = 0; i < 8; i++) P(c, 24 + i * 56, 176, 4, 6, '#fff2d0');
      tanah(c, '#9ec45e', '#8eb450', '#aad26c');
      jalan(c, '#e8e0c8', '#c8bfa4', '#d4ccb4', '#f2ead4');
    }

    else if (TEMA_NAMA === 'telagaBijiMenipis') {
      P(c, 0, 0, W, 46, '#141a34');
      P(c, 0, 46, W, 46, '#181e3c');
      P(c, 0, 92, W, 46, '#1c2244');
      P(c, 0, 138, W, 44, '#222850');
      for (let i = 0; i < 10; i++) lingkaran(c, 26 + i * 44, 18 + (i % 3) * 13, 1.5, '#eef2ff');
      lingkaran(c, 396, 40, 12, '#f4f0d8');
      lingkaran(c, 392, 38, 9, '#141a34');
      gunungSaljuDi(c, 78, 86, 58, 182, '#2c3254', '#c8d0ec');
      gunungSaljuDi(c, 382, 92, 50, 182, '#343a5c', '#c8d0ec');
      pinusDi(c, '#1a2038', '#141a2e');
      P(c, 120, 168, 150, 14, '#2a3a6a');
      P(c, 130, 166, 6, 3, '#a8c8ff');
      P(c, 200, 172, 5, 3, '#a8c8ff');
      tanah(c, '#2c3050', '#262a48', '#343858');
      jalan(c, '#3a3e60', '#323656', '#363a5c', '#44486c');
    }

    else if (TEMA_NAMA === 'bengkelPoligonBulat') {
      P(c, 0, 0, W, 46, '#f5ead0');
      P(c, 0, 46, W, 46, '#eee0c4');
      P(c, 0, 92, W, 46, '#e6d6b8');
      P(c, 0, 138, W, 44, '#dccca8');
      lingkaran(c, 64, 32, 10, '#ffe9a3');
      gunungDi(c, 110, 90, 58, 186, '#c8ae86');
      gunungDi(c, 384, 96, 52, 186, '#bca27c');
      P(c, 290, 126, 94, 56, '#8a6e4c');
      P(c, 284, 118, 106, 9, '#6e5638');
      for (let i = 0; i < 3; i++) lingkaran(c, 314 + i * 22, 150, 8 - i, '#c8a06a');
      P(c, 306, 162, 62, 5, '#a8845a');
      tanah(c, '#b29c72', '#a48e64', '#bea87c');
      jalan(c, '#c9ae86', '#b0966e', '#b69c74', '#d4ba92');
      for (let i = 0; i < 6; i++) P(c, 40 + i * 14, 156, 10, 3, '#a8845a');
    }

    else if (TEMA_NAMA === 'puncakTepiMenuju') {
      P(c, 0, 0, W, 46, '#171b36');
      P(c, 0, 46, W, 46, '#1b1f3e');
      P(c, 0, 92, W, 46, '#1f2346');
      P(c, 0, 138, W, 44, '#252952');
      for (let i = 0; i < 9; i++) lingkaran(c, 30 + i * 50, 16 + (i % 3) * 12, 1.5, '#eef2ff');
      gunungSaljuDi(c, 66, 82, 60, 182, '#2e3460', '#d4dcf4');
      gunungSaljuDi(c, 390, 88, 52, 182, '#363c64', '#d4dcf4');
      pinusDi(c, '#1c2240', '#161c30');
      for (let i = 0; i < 5; i++) {
        P(c, 108 + i * 56, 158 - (i % 2) * 7, 22, 12, '#3e4466');
        P(c, 108 + i * 56, 170 - (i % 2) * 7, 4, 8, '#323856');
        ctx.globalAlpha = 0.55;
        lingkaran(c, 119 + i * 56, 163 - (i % 2) * 7, 2.5, '#ffe9a3');
        ctx.globalAlpha = 1;
      }
      P(c, 330, 148, 30, 5, '#4a5078');
      P(c, 330, 153, 5, 30, '#3a4166'); P(c, 355, 153, 5, 30, '#3a4166');
      tanah(c, '#2c3050', '#262a48', '#343858');
      jalan(c, '#3a3e60', '#323656', '#363a5c', '#44486c');
    }


    else if (TEMA_NAMA === 'tamanKeranAir') {
      P(c, 0, 0, W, 46, '#f5e8cc');
      P(c, 0, 46, W, 46, '#eee0c0');
      P(c, 0, 92, W, 46, '#e6d8b6');
      P(c, 0, 138, W, 44, '#dccfac');
      lingkaran(c, 410, 30, 11, '#fff2d0');
      gunungDi(c, 84, 88, 58, 186, '#c8b48c');
      gunungDi(c, 386, 94, 50, 186, '#bca87e');
      P(c, 140, 128, 62, 58, '#7a6248');
      P(c, 134, 120, 74, 9, '#5e4a34');
      for (let i = 0; i < 2; i++) P(c, 152 + i * 26, 144, 14, 14, '#ffe9a3');
      pinusDi(c, '#7a8a4c', '#646e40');
      tanah(c, '#8ec45e', '#7eb450', '#9cd26c');
      jalan(c, '#c9b884', '#b0a06c', '#b8a874', '#d4c490');
      bungaDi(c, '#ffb86b', '#f2b8cc');
    }

    else if (TEMA_NAMA === 'jalanRayaKilometer') {
      P(c, 0, 0, W, 46, '#9fdcf5');
      P(c, 0, 46, W, 46, '#8fd3f0');
      P(c, 0, 92, W, 46, '#a5e0f5');
      P(c, 0, 138, W, 44, '#b7e8f8');
      lingkaran(c, 60, 32, 11, '#ffe9a3');
      lingkaran(c, 60, 32, 8, '#ffd166');
      gunungDi(c, 130, 86, 60, 186, '#a9c8e2');
      gunungDi(c, 378, 92, 52, 186, '#98bcd9');
      P(c, 292, 134, 68, 52, '#c2cad6');
      P(c, 286, 126, 80, 9, '#8a94a4');
      for (let i = 0; i < 2; i++) P(c, 306 + i * 26, 150, 14, 13, '#ffe9a3');
      tanah(c, '#9ec45e', '#8eb450', '#aad26c');
      jalan(c, '#b8c0cc', '#8a94a4', '#a8b0bc', '#d0d6de');
      for (let i = 0; i < 7; i++) P(c, 16 + i * 68, 244, 26, 4, '#fff2d0');
    }

    else if (TEMA_NAMA === 'galeriGarisSinggung') {
      P(c, 0, 0, W, 46, '#eef8e0');
      P(c, 0, 46, W, 46, '#e4f2d4');
      P(c, 0, 92, W, 46, '#dcecca');
      P(c, 0, 138, W, 44, '#d2e4be');
      lingkaran(c, 424, 30, 10, '#fff2d0');
      gunungDi(c, 110, 96, 64, 186, '#a8c89a');
      gunungDi(c, 372, 100, 56, 186, '#9cb88e');
      P(c, 60, 150, 90, 3, '#c85a2a');
      P(c, 142, 128, 3, 25, '#a8442a');
      P(c, 330, 118, 3, 35, '#a8442a');
      P(c, 330, 150, 56, 3, '#c85a2a');
      tanah(c, '#8ec45e', '#7eb450', '#9cd26c');
      jalan(c, '#d8d0b0', '#c0b896', '#c8c0a0', '#e8e0c4');
      batuDekor(c);
    }

    else if (TEMA_NAMA === 'bengkelMesinPangkat') {
      P(c, 0, 0, W, 46, '#f5ead0');
      P(c, 0, 46, W, 46, '#eee0c4');
      P(c, 0, 92, W, 46, '#e6d6b8');
      P(c, 0, 138, W, 44, '#dccca8');
      lingkaran(c, 66, 32, 10, '#ffe9a3');
      gunungDi(c, 116, 90, 56, 186, '#c8ae86');
      gunungDi(c, 390, 96, 50, 186, '#bca27c');
      P(c, 284, 122, 100, 64, '#8a6e4c');
      P(c, 278, 114, 112, 9, '#6e5638');
      for (let i = 0; i < 3; i++) P(c, 296 + i * 26, 138, 15, 15, '#ffe9a3');
      P(c, 300, 162, 66, 5, '#a8845a');
      P(c, 70, 132, 26, 26, '#c8a06a');
      P(c, 76, 138, 14, 14, '#e8d8b0');
      tanah(c, '#b29c72', '#a48e64', '#bea87c');
      jalan(c, '#c9ae86', '#b0966e', '#b69c74', '#d4ba92');
      for (let i = 0; i < 5; i++) P(c, 48 + i * 14, 160, 9, 3, '#a8845a');
    }

    else if (TEMA_NAMA === 'jalanBukitPanah') {
      P(c, 0, 0, W, 46, '#ffd9a3');
      P(c, 0, 46, W, 46, '#f8cc92');
      P(c, 0, 92, W, 46, '#f0be84');
      P(c, 0, 138, W, 44, '#e4b078');
      lingkaran(c, 90, 112, 13, '#ffb86b');
      lingkaran(c, 90, 112, 9, '#ff9d4a');
      gunungDi(c, 160, 84, 62, 186, '#c89a78');
      gunungDi(c, 402, 90, 54, 186, '#b88c6c');
      pinusDi(c, '#7a6a42', '#645634');
      tanah(c, '#a8925e', '#9a8452', '#b49e6a');
      jalan(c, '#d9b877', '#c2a05e', '#c9a763', '#e3c58c');
      for (let i = 0; i < 6; i++) P(c, 40 + i * 70, 212 + (i % 2) * 10, 14, 4, i % 2 ? '#e85a5a' : '#4fa55e');
    }

    else if (TEMA_NAMA === 'tamanAirMancur') {
      P(c, 0, 0, W, 46, '#a5e0f5');
      P(c, 0, 46, W, 46, '#98d8f0');
      P(c, 0, 92, W, 46, '#aedff7');
      P(c, 0, 138, W, 44, '#bfe9fa');
      lingkaran(c, 52, 30, 11, '#ffe9a3');
      lingkaran(c, 52, 30, 8, '#ffd166');
      gunungDi(c, 120, 88, 58, 186, '#9cc4dc');
      gunungDi(c, 380, 94, 50, 186, '#8cb8d2');
      P(c, 150, 100, 3, 30, '#8a7256');
      ctx.globalAlpha = 0.7;
      lingkaran(c, 130, 96, 8, '#d8f0fa');
      lingkaran(c, 172, 94, 10, '#d8f0fa');
      lingkaran(c, 151, 84, 7, '#e8f6fc');
      ctx.globalAlpha = 1;
      pinusDi(c, '#4a8a54', '#3c7444');
      tanah(c, '#8ec45e', '#7eb450', '#9cd26c');
      P(c, 110, 210, 80, 18, '#5a9ad8');
      P(c, 110, 210, 80, 4, '#8ac4f0');
      jalan(c, '#c9b884', '#b0a06c', '#b8a874', '#d4c490');
      bungaDi(c, '#ffb86b', '#f2b8cc');
    }

    else if (TEMA_NAMA === 'tanggaLajuPercepatan') {
      P(c, 0, 0, W, 46, '#f2e8d0');
      P(c, 0, 46, W, 46, '#eadcc0');
      P(c, 0, 92, W, 46, '#e2d4b4');
      P(c, 0, 138, W, 44, '#d8c8a6');
      lingkaran(c, 414, 32, 11, '#ffe9a3');
      lingkaran(c, 414, 32, 8, '#ffd166');
      gunungDi(c, 96, 88, 58, 186, '#c0ac8a');
      gunungDi(c, 374, 94, 52, 186, '#b4a07e');
      for (let i = 0; i < 5; i++) P(c, 250 + i * 18, 178 - i * 6, 16, 5, '#8a6e4c');
      tanah(c, '#9ec45e', '#8eb450', '#aad26c');
      jalan(c, '#e8e0c8', '#c8bfa4', '#d4ccb4', '#f2ead4');
      P(c, 60, 150, 34, 8, '#8a6e4c');
      P(c, 78, 142, 34, 8, '#8a6e4c');
    }

    else if (TEMA_NAMA === 'lembahSenyumU') {
      P(c, 0, 0, W, 46, '#fffdf2');
      P(c, 0, 46, W, 46, '#f2f4e4');
      P(c, 0, 92, W, 46, '#e8f0d8');
      P(c, 0, 138, W, 44, '#dceacc');
      lingkaran(c, 400, 30, 10, '#ffe9a3');
      gunungDi(c, 40, 70, 80, 186, '#a8c89a');
      gunungDi(c, 440, 70, 80, 186, '#a8c89a');
      P(c, 118, 96, 84, 90, '#b8d4a8');
      P(c, 278, 96, 84, 90, '#b8d4a8');
      P(c, 130, 100, 60, 86, '#9cb88e');
      P(c, 290, 100, 60, 86, '#9cb88e');
      hutanDi(c, '#5a8a4c', '#4c7a40');
      tanah(c, '#8ec45e', '#7eb450', '#9cd26c');
      jalan(c, '#d8d0b0', '#c0b896', '#c8c0a0', '#e8e0c4');
      bungaDi(c, '#ffb86b', '#f2b8cc');
    }

    else if (TEMA_NAMA === 'jalanMotorSore') {
      P(c, 0, 0, W, 46, '#ffd9b0');
      P(c, 0, 46, W, 46, '#f8cca0');
      P(c, 0, 92, W, 46, '#f0bc8c');
      P(c, 0, 138, W, 44, '#e4ac78');
      lingkaran(c, 386, 118, 14, '#ffb86b');
      lingkaran(c, 386, 118, 10, '#ff9d4a');
      gunungDi(c, 84, 90, 56, 186, '#c08a70');
      gunungDi(c, 356, 96, 50, 186, '#b47c64');
      P(c, 120, 134, 58, 52, '#8a6a52');
      P(c, 114, 126, 70, 9, '#6e523c');
      P(c, 132, 148, 13, 13, '#ffe9a3');
      P(c, 252, 140, 46, 46, '#9a7a5c');
      P(c, 246, 132, 58, 8, '#7a5e44');
      P(c, 264, 152, 12, 12, '#ffe9a3');
      tanah(c, '#a8925e', '#9a8452', '#b49e6a');
      jalan(c, '#c9ae86', '#b0966e', '#b69c74', '#d4ba92');
      for (let i = 0; i < 4; i++) P(c, 34 + i * 108, 178, 3, 10, '#6e523c');
    }

    else if (TEMA_NAMA === 'puncakLerengCuram') {
      P(c, 0, 0, W, 46, '#171b36');
      P(c, 0, 46, W, 46, '#1b1f3e');
      P(c, 0, 92, W, 46, '#1f2346');
      P(c, 0, 138, W, 44, '#252952');
      for (let i = 0; i < 11; i++) lingkaran(c, 22 + i * 42, 16 + (i % 3) * 12, 1.5, '#eef2ff');
      gunungSaljuDi(c, 74, 80, 60, 182, '#2e3460', '#d4dcf4');
      gunungSaljuDi(c, 396, 86, 54, 182, '#363c64', '#d4dcf4');
      pinusDi(c, '#1c2240', '#161c30');
      for (let i = 0; i < 5; i++) {
        P(c, 132 + i * 54, 156 - (i % 2) * 6, 24, 11, '#3e4466');
        P(c, 132 + i * 54, 167 - (i % 2) * 6, 3, 8, '#323856');
        ctx.globalAlpha = 0.5;
        lingkaran(c, 144 + i * 54, 161 - (i % 2) * 6, 2.5, '#ffe9a3');
        ctx.globalAlpha = 1;
      }
      tanah(c, '#2c3050', '#262a48', '#343858');
      jalan(c, '#3a3e60', '#323656', '#363a5c', '#44486c');
    }

    else if (TEMA_NAMA === 'ladangUbinKotak') {
      P(c, 0, 0, W, 46, '#ffe9c8');
      P(c, 0, 46, W, 46, '#ffd9a8');
      P(c, 0, 92, W, 46, '#f8c890');
      P(c, 0, 138, W, 44, '#f0b878');
      lingkaran(c, 396, 30, 16, '#fff3d8');
      lingkaran(c, 396, 30, 11, '#fffdf2');
      gunungDi(c, 80, 96, 56, 182, '#c89068');
      gunungDi(c, 372, 100, 50, 182, '#b8825c');
      pinusDi(c, '#7a9a50', '#688240');
      for (let i = 0; i < 6; i++) {
        P(c, 66 + i * 62, 168 + (i % 2) * 4, 20, 14, '#b8c88a');
        P(c, 66 + i * 62, 168 + (i % 2) * 4, 20, 2, '#d0dc9e');
        P(c, 76 + i * 62, 168 + (i % 2) * 4, 1, 14, '#9aa870');
        P(c, 66 + i * 62, 174 + (i % 2) * 4, 20, 1, '#9aa870');
      }
      tanah(c, '#c0b078', '#b0a068', '#ccc088');
      jalan(c, '#d8c090', '#c0a878', '#c8b080', '#e4d0a0');
    }

    else if (TEMA_NAMA === 'tamanKertasBerpetak') {
      P(c, 0, 0, W, 46, '#eef6ff');
      P(c, 0, 46, W, 46, '#e4eef8');
      P(c, 0, 92, W, 46, '#dce8f4');
      P(c, 0, 138, W, 44, '#d4e0ee');
      for (let i = 0; i < 12; i++) P(c, i * 40, 0, 1, 182, '#c4d4e4');
      for (let j = 0; j < 5; j++) P(c, 0, j * 38, W, 1, '#c4d4e4');
      P(c, 30, 40, 150, 2, '#8aa8c8');
      P(c, 30, 40, 2, 90, '#8aa8c8');
      for (let i = 0; i < 8; i++) {
        lingkaran(c, 44 + i * 52, 158, 3, '#f0a8b8');
        lingkaran(c, 44 + i * 52, 161, 2, '#8aa858');
      }
      tanah(c, '#d8e4f0', '#c8d6e8', '#e0eaf4');
      jalan(c, '#e8f0f8', '#d8e2ec', '#dce6f0', '#f0f6fc');
      for (let i = 0; i < 10; i++) P(c, 10 + i * 48, 186 + (i % 3) * 14, 1, 240, '#c8d8e8');
      for (let j = 0; j < 3; j++) P(c, 0, 192 + j * 18, W, 1, '#c8d8e8');
    }

    else if (TEMA_NAMA === 'bengkelIrisanTipis') {
      P(c, 0, 0, W, 46, '#f8e8d0');
      P(c, 0, 46, W, 46, '#f0dcc0');
      P(c, 0, 92, W, 46, '#e8d0b0');
      P(c, 0, 138, W, 44, '#e0c8a0');
      P(c, 40, 60, 130, 8, '#a87850');
      P(c, 44, 68, 122, 30, '#8a6040');
      for (let i = 0; i < 7; i++) P(c, 50 + i * 16, 72, 4, 24, ['#e8b0b0', '#b0d8e8', '#f0d8a0', '#b8e0b8', '#d8b8e8', '#e8c8a0', '#a8c8e0'][i]);
      P(c, 300, 60, 130, 8, '#a87850');
      P(c, 304, 68, 122, 30, '#8a6040');
      for (let i = 0; i < 7; i++) P(c, 310 + i * 16, 72, 4, 24, ['#b0d8e8', '#e8c8a0', '#b8e0b8', '#e8b0b0', '#a8c8e0', '#f0d8a0', '#d8b8e8'][i]);
      lingkaran(c, 240, 30, 9, '#fff8e0');
      ctx.globalAlpha = 0.4;
      lingkaran(c, 240, 30, 15, '#fff8e0');
      ctx.globalAlpha = 1;
      tanah(c, '#c8a878', '#b89868', '#d4b888');
      jalan(c, '#a8885e', '#967850', '#a08258', '#b89868');
    }

    else if (TEMA_NAMA === 'lorongBolakBalik') {
      P(c, 0, 0, W, 46, '#ffd9b0');
      P(c, 0, 46, W, 46, '#f8c898');
      P(c, 0, 92, W, 46, '#e8a878');
      P(c, 0, 138, W, 44, '#d89060');
      lingkaran(c, 90, 120, 14, '#ffdfb0');
      gunungDi(c, 0, 104, 120, 182, '#a87858');
      gunungDi(c, 360, 112, 120, 182, '#986850');
      P(c, 30, 118, 34, 64, '#7a5240');
      P(c, 34, 126, 26, 56, '#5c3c2e');
      P(c, 416, 118, 34, 64, '#7a5240');
      P(c, 420, 126, 26, 56, '#5c3c2e');
      lingkaran(c, 47, 150, 3, '#ffe9a3');
      lingkaran(c, 433, 150, 3, '#ffe9a3');
      tanah(c, '#b8906a', '#a8805c', '#c4a078');
      jalan(c, '#c8a078', '#b09068', '#b89870', '#d4b088');
    }

    else if (TEMA_NAMA === 'tamanLengkungBatu') {
      P(c, 0, 0, W, 46, '#fff3d8');
      P(c, 0, 46, W, 46, '#f8e8c0');
      P(c, 0, 92, W, 46, '#f0dcb0');
      P(c, 0, 138, W, 44, '#e8d0a0');
      lingkaran(c, 70, 28, 12, '#fffdf2');
      for (let i = 0; i < 14; i++) {
        P(c, 20 + i * 32, 40 + (i % 4) * 32, 30, 2, '#d8c090');
        P(c, 20 + i * 32, 40 + (i % 4) * 32, 2, 26, '#d8c090');
      }
      for (let i = 0; i < 9; i++) P(c, 240 + i * 20, 176 - Math.round((i * i) / 5), 18, 8, '#c8a878');
      for (let i = 0; i < 6; i++) {
        P(c, 40 + i * 68, 170, 14, 12, '#9ab070');
        P(c, 45 + i * 68, 164, 4, 8, '#88a060');
      }
      tanah(c, '#d4c494', '#c4b484', '#e0d0a0');
      jalan(c, '#c8b088', '#b09870', '#b8a078', '#d4c098');
    }

    else if (TEMA_NAMA === 'jalanKurirGrafik') {
      P(c, 0, 0, W, 46, '#e8f4fa');
      P(c, 0, 46, W, 46, '#d8ecf4');
      P(c, 0, 92, W, 46, '#cce4ee');
      P(c, 0, 138, W, 44, '#c0dce8');
      P(c, 60, 40, 40, 8, '#fffdf2');
      P(c, 68, 34, 24, 8, '#fffdf2');
      P(c, 300, 56, 44, 9, '#fffdf2');
      P(c, 310, 49, 24, 9, '#fffdf2');
      P(c, 348, 110, 96, 62, '#8a9ab0');
      P(c, 354, 116, 84, 50, '#e8f0f8');
      P(c, 360, 152, 12, 8, '#5c7aa8');
      P(c, 372, 144, 12, 8, '#5c7aa8');
      P(c, 384, 136, 12, 8, '#5c7aa8');
      P(c, 396, 128, 12, 8, '#5c7aa8');
      P(c, 408, 120, 12, 8, '#5c7aa8');
      tanah(c, '#b8c8a0', '#a8b890', '#c4d4ac');
      jalan(c, '#98a0aa', '#888f9a', '#9098a2', '#a8b0ba');
      for (let i = 0; i < 7; i++) P(c, 24 + i * 70, 190, 26, 3, '#e8eef4');
    }

    else if (TEMA_NAMA === 'menaraTintaHuruf') {
      P(c, 0, 0, W, 46, '#1a1e3a');
      P(c, 0, 46, W, 46, '#1e2244');
      P(c, 0, 92, W, 46, '#222650');
      P(c, 0, 138, W, 44, '#262a5a');
      for (let i = 0; i < 10; i++) lingkaran(c, 24 + i * 46, 14 + (i % 3) * 14, 1.5, '#eef2ff');
      P(c, 24, 70, 100, 112, '#3a3258');
      for (let j = 0; j < 4; j++) {
        P(c, 28, 78 + j * 27, 92, 3, '#5a5078');
        for (let i = 0; i < 7; i++) P(c, 34 + i * 12, 68 + j * 27, 8, 10, ['#8a5a68', '#5a788a', '#8a7a5a', '#6a8a6a', '#7a6a9a', '#8a6a5a', '#5a6a8a'][i]);
      }
      P(c, 336, 70, 110, 112, '#3a3258');
      for (let j = 0; j < 4; j++) {
        P(c, 340, 78 + j * 27, 102, 3, '#5a5078');
        for (let i = 0; i < 8; i++) P(c, 346 + i * 12, 68 + j * 27, 8, 10, ['#5a788a', '#8a7a5a', '#7a6a9a', '#8a5a68', '#6a8a6a', '#5a6a8a', '#8a6a5a', '#8a7a5a'][i]);
      }
      lingkaran(c, 240, 96, 5, '#ffdf8a');
      ctx.globalAlpha = 0.35;
      lingkaran(c, 240, 96, 14, '#ffdf8a');
      ctx.globalAlpha = 1;
      P(c, 238, 101, 5, 8, '#8a6a4a');
      tanah(c, '#3a3454', '#322c4a', '#423c60');
      jalan(c, '#4a4468', '#403a5c', '#443e60', '#524c74');
    }

    else if (TEMA_NAMA === 'guaTetesEmber') {
      P(c, 0, 0, W, 46, '#232838');
      P(c, 0, 46, W, 46, '#262b3e');
      P(c, 0, 92, W, 46, '#2a2f44');
      P(c, 0, 138, W, 44, '#2e3450');
      for (let i = 0; i < 12; i++) {
        const tinggi = 14 + (i % 4) * 12;
        P(c, 14 + i * 38, 0, 10, tinggi, '#1c2130');
        P(c, 16 + i * 38, tinggi, 6, 6, '#1c2130');
      }
      for (let i = 0; i < 8; i++) {
        ctx.globalAlpha = 0.5;
        P(c, 40 + i * 50, 60 + (i % 3) * 30, 1.5, 16, '#a8e8f0');
        ctx.globalAlpha = 1;
        lingkaran(c, 40.5 + i * 50, 80 + (i % 3) * 30, 1.5, '#a8e8f0');
      }
      lingkaran(c, 120, 176, 10, '#3a4a68');
      ctx.globalAlpha = 0.4;
      lingkaran(c, 120, 176, 15, '#a8e8f0');
      ctx.globalAlpha = 1;
      gunungDi(c, 250, 130, 130, 182, '#20263a');
      gunungDi(c, 380, 140, 100, 182, '#1c2234');
      tanah(c, '#2c3248', '#262c40', '#323a54');
      jalan(c, '#38405c', '#303850', '#343c56', '#404868');
    }

    else if (TEMA_NAMA === 'kebunTerasering') {
      P(c, 0, 0, W, 46, '#ffe0b8');
      P(c, 0, 46, W, 46, '#f8cc98');
      P(c, 0, 92, W, 46, '#f0b878');
      P(c, 0, 138, W, 44, '#e8a860');
      lingkaran(c, 420, 150, 13, '#ffdf9a');
      lingkaran(c, 420, 150, 9, '#fff3c8');
      for (let i = 0; i < 5; i++) {
        P(c, 40 + i * 30, 108 - i * 4, 26, 6, '#8a6a4a');
        P(c, 40 + i * 30, 102 - i * 4, 26, 6, '#7aa050');
        P(c, 40 + i * 30, 100 - i * 4, 26, 3, '#90b060');
      }
      gunungDi(c, 220, 110, 90, 182, '#c08858');
      gunungDi(c, 300, 122, 80, 182, '#b07c50');
      for (let i = 0; i < 4; i++) {
        P(c, 60 + i * 108, 168, 80, 8, '#88ac58');
        P(c, 60 + i * 108, 164, 80, 5, '#98bc68');
        P(c, 60 + i * 108, 176, 80, 6, '#7a9a4a');
      }
      tanah(c, '#c8a068', '#b89058', '#d4b078');
      jalan(c, '#d0a878', '#b89068', '#c49e70', '#dcb884');
    }

    else if (TEMA_NAMA === 'lembahLuasMalam') {
      P(c, 0, 0, W, 46, '#171b36');
      P(c, 0, 46, W, 46, '#1b1f3e');
      P(c, 0, 92, W, 46, '#1f2346');
      P(c, 0, 138, W, 44, '#252952');
      for (let i = 0; i < 12; i++) lingkaran(c, 18 + i * 38, 14 + (i % 4) * 11, 1.5, '#eef2ff');
      gunungSaljuDi(c, 60, 78, 66, 182, '#2c3258', '#c8d0ec');
      gunungSaljuDi(c, 400, 88, 56, 182, '#323864', '#c8d0ec');
      pinusDi(c, '#1e2444', '#182038');
      for (let i = 0; i < 4; i++) {
        P(c, 150 + i * 62, 158 + (i % 2) * 5, 22, 10, '#3e4466');
        P(c, 150 + i * 62, 168 + (i % 2) * 5, 3, 7, '#323856');
        ctx.globalAlpha = 0.55;
        lingkaran(c, 161 + i * 62, 163 + (i % 2) * 5, 2.5, '#ffe9a3');
        ctx.globalAlpha = 1;
      }
      tanah(c, '#2a2e4e', '#242846', '#323658');
      jalan(c, '#383c5e', '#303454', '#34385a', '#424668');
    }

    return cv;
  }
  const LATAR = bakarLatar();

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

  function gambarBatu(x) {
    lingkaran(ctx, x - 8, 243, 3, '#9aa6b8');
    lingkaran(ctx, x - 2, 243, 3, '#a9b6c4');
    lingkaran(ctx, x + 4, 243, 3, '#9aa6b8');
    lingkaran(ctx, x - 5, 238, 3, '#a9b6c4');
    lingkaran(ctx, x + 1, 238, 3, '#b8c2d2');
    lingkaran(ctx, x - 2, 233, 3, '#c3ccda');
    P(ctx, x - 3, 232, 2, 1, '#e2e8f0');
    P(ctx, x + 1, 237, 2, 1, '#d3dae6');
    lingkaran(ctx, x + 12, 245, 2, '#9aa6b8');
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

  function gambarLubang(x) {
    P(ctx, x - 10, 238, 20, 8, '#9aa6b8');
    P(ctx, x - 12, 234, 24, 4, '#b8c2d2');
    lingkaran(ctx, x, 220, 10, '#7a8698');
    lingkaran(ctx, x, 220, 7, '#39445a');
    for (let i = 0; i < 12; i++) {
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
    P(ctx, x + 12, 245, 8, 2, '#f3efe4');
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
    P(ctx, x - 10, 212, 3, 34, '#c98a4b');
    P(ctx, x - 10, 243, 34, 3, '#c98a4b');
    for (let i = 0; i <= 32; i++) {
      P(ctx, x - 9 + i, Math.round(242 - i * 0.94), 1, 2, '#c98a4b');
    }
    P(ctx, x - 10, 240, 4, 3, '#ffd166');
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
    P(ctx, x - 1, 212, 2, 13, '#5f4426');
    P(ctx, x + 4, 222, 3, 1, '#5f6b7c');
    P(ctx, x - 7, 226, 3, 1, '#5f6b7c');
  }
  function gambarKosong(x) {
    P(ctx, x - 10, 238, 20, 8, '#9aa6b8');
    P(ctx, x - 12, 234, 24, 4, '#b8c2d2');
    for (let i = 0; i < 12; i++) {
      const a = i * Math.PI / 6;
      P(ctx, x + Math.round(Math.cos(a) * 9) - 1, 220 + Math.round(Math.sin(a) * 9) - 1, 2, 2, '#8fa2c8');
    }
  }

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
    P(ctx, x + 13, 240, 8, 6, '#a3744a');
    P(ctx, x + 13, 240, 8, 2, '#b58a4a');
  }

  function gambarRoket(x, t) {
    P(ctx, x - 18, 196, 4, 50, '#4a5468');
    P(ctx, x - 22, 202, 12, 3, '#4a5468');
    P(ctx, x - 22, 214, 12, 3, '#4a5468');
    P(ctx, x - 22, 226, 12, 3, '#4a5468');
    for (let i = 0; i < 6; i++) {
      P(ctx, x - 6 + i * 0.5, 202 + i, 12 - i, 1, '#ff6b35');
    }
    P(ctx, x - 6, 208, 12, 30, '#d3dae6');
    P(ctx, x - 6, 208, 3, 30, '#b8c2d2');
    lingkaran(ctx, x, 218, 3, '#4a7fc0');
    lingkaran(ctx, x, 218, 2, '#a5d8ff');
    P(ctx, x - 10, 230, 4, 10, '#ff6b35');
    P(ctx, x + 6, 230, 4, 10, '#ff6b35');
    P(ctx, x - 8, 240, 16, 2, '#ff6b35');
    const flicker = Math.sin(t * 11) * 2;
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

  function gambarPapanPlus(x, t) {
    gambarCahaya(x, 222, 12, '#ffd166', t);
    P(ctx, x - 2, 232, 4, 16, '#7a5230');
    P(ctx, x - 10, 216, 20, 5, '#ffd166');
    P(ctx, x - 2.5, 208, 5, 21, '#ffd166');
    P(ctx, x - 10, 216, 20, 5, '#ffe9a3');
    P(ctx, x - 9, 209, 3, 4, '#fff3cf');
    P(ctx, x + 6, 211, 2, 2, '#fff8e0');
    P(ctx, x - 14, 221, 2, 2, '#fff8e0');
  }
  function gambarDuaKeranjang(x, t) {
    const keranjang = (kx, n) => {
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
    for (let i = 0; i < 5; i++) {
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

  function gambarPapanMin(x, t) {
    gambarCahaya(x, 218, 12, '#a5d8ff', t);
    P(ctx, x - 2, 232, 4, 16, '#7a5230');
    P(ctx, x - 11, 214, 22, 5, '#a5d8ff');
    P(ctx, x - 11, 214, 22, 2, '#d0e6ff');
    P(ctx, x + 8, 208, 2, 2, '#d0e6ff');
  }
  function gambarKantongLima(x, t) {
    P(ctx, x - 12, 236, 24, 14, '#c9a05e');
    P(ctx, x - 10, 250, 20, 2, '#a3763c');
    P(ctx, x - 13, 234, 26, 3, '#b8863e');
    for (let i = 0; i < 5; i++) {
      lingkaran(ctx, x - 9 + i * 4.5, 240, 2.4, '#ff8fb0');
      P(ctx, x - 10 + i * 4.5, 239, 1, 1, '#ffc2d4');
    }
    teksPx(ctx, '5', x, 252, '#fffdf2', 6);
  }
  function gambarTemanPergi(x, t) {
    const maju = Math.round(Math.sin(t * 1.4) * 3);
    K.gambar.bayangan(ctx, x + 8 + maju, 251, 7);
    K.gambar.bolaLentera(ctx, x + 8 + maju, 244, '#a5d8ff', '#4a7fc0', '', t * 2);
    P(ctx, x + 16 + maju, 246, 8, 7, '#c9a05e');
    for (let i = 0; i < 2; i++) {
      lingkaran(ctx, x + 18 + maju + i * 4, 245, 2, '#ff8fb0');
    }
    const debu = Math.floor(t * 6) % 3;
    for (let i = 0; i < 2; i++) {
      P(ctx, x - 6 - i * 5 - debu, 250 - i * 2, 2, 1, 'rgba(255,253,242,.5)');
    }
    teksPx(ctx, '-2', x - 4, 232, '#a5d8ff', 6);
  }
  function gambarPapanSisa(x, t) {
    papanLebar(x, ['5-2=3'], 46);
    P(ctx, x - 8, 238, 16, 3, '#b8863e');
    P(ctx, x - 6, 241, 12, 4, '#a3743a');
    for (let i = 0; i < 3; i++) {
      lingkaran(ctx, x - 4 + i * 4, 237, 2.2, '#ff8fb0');
    }
  }

  function gambarPapanKali(x, t) {
    gambarCahaya(x, 220, 12, '#ffd166', t);
    P(ctx, x - 2, 232, 4, 16, '#7a5230');
    for (let i = -3; i <= 3; i++) {
      P(ctx, x + i - 1, 216 + Math.abs(i), 3, 3, '#ffd166');
      P(ctx, x + i - 1, 226 - Math.abs(i), 3, 3, '#ffd166');
    }
    P(ctx, x - 5, 212, 2, 2, '#fff3cf');
    P(ctx, x + 6, 222, 2, 2, '#fff3cf');
  }
  function gambarBarisParade(x, t) {
    teksPx(ctx, '3 x 4', x, 200, '#ffe9a3', 6);
    for (let r = 0; r < 3; r++) {
      P(ctx, x - 20, 212 + r * 11, 40, 1, 'rgba(255,253,242,.35)');
      for (let k = 0; k < 4; k++) {
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

  function gambarPapanBagi(x, t) {
    gambarCahaya(x, 220, 12, '#7dffa8', t);
    P(ctx, x - 2, 232, 4, 16, '#7a5230');
    P(ctx, x - 9, 216, 18, 4, '#7dffa8');
    lingkaran(ctx, x, 209, 2.6, '#7dffa8');
    lingkaran(ctx, x, 227, 2.6, '#7dffa8');
    P(ctx, x + 7, 206, 2, 2, '#c8ffd8');
  }
  function gambarNampanKue(x, t) {
    P(ctx, x - 27, 244, 54, 4, '#c9a763');
    P(ctx, x - 27, 244, 54, 1, '#e0c784');
    for (let i = 0; i < 8; i++) {
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
      for (let i = 0; i < n; i++) {
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

  function gambarPapanEq(x, t) {
    gambarCahaya(x, 220, 12, '#ffe9a3', t);
    P(ctx, x - 2, 232, 4, 16, '#7a5230');
    P(ctx, x - 10, 212, 20, 4, '#ffe9a3');
    P(ctx, x - 10, 221, 20, 4, '#ffe9a3');
    P(ctx, x - 10, 212, 20, 1, '#fff8e0');
    P(ctx, x - 10, 221, 20, 1, '#fff8e0');
  }
  function gambarTimbangSetara(x, t) {
    P(ctx, x - 10, 250, 20, 2, '#7a5230');
    P(ctx, x - 2, 224, 4, 26, '#8a5f38');
    P(ctx, x - 22, 224, 44, 2, '#a3744a');
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
    for (let i = -22; i <= 22; i++) {
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

  function gambarRahangTerbuka(x, t) {
    const napas = Math.sin(t * 2) * 1.5;
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
    for (let i = 0; i < 9; i++) {
      lingkaran(ctx, x - 18 + (i % 3) * 4, 226 + Math.floor(i / 3) * 4, 1.4, '#4a8fc8');
    }
    for (let i = 0; i < 3; i++) {
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
    for (let i = 0; i < 6; i++) {
      lingkaran(ctx, x + 10 + (i % 3) * 4, 226 + Math.floor(i / 3) * 4, 1.4, '#ff9d9d');
    }
  }
  function gambarPapanArah(x, t) {
    papanLebar(x, ['> besar', '< kecil'], 54);
  }

  function gambarGerbangKurung(x, t) {
    gambarCahaya(x, 230, 13, '#ffd166', t);
    P(ctx, x - 16, 210, 4, 38, '#ffd166');
    P(ctx, x - 19, 210, 7, 4, '#ffd166');
    P(ctx, x - 19, 244, 7, 4, '#ffd166');
    P(ctx, x + 12, 210, 4, 38, '#ffd166');
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

  function gambarPapanKoma(x, t) {
    gambarCahaya(x, 224, 12, '#ff9db8', t);
    P(ctx, x - 2, 232, 4, 16, '#7a5230');
    P(ctx, x - 3, 210, 6, 9, '#ff9db8');
    P(ctx, x - 1, 219, 4, 5, '#ff9db8');
    P(ctx, x - 1, 224, 2, 3, '#c86a8a');
    teksPx(ctx, 'utuh kepingan', x, 206, '#ffd0d8', 6);
  }
  function gambarKueUtuhSetengah(x, t) {
    P(ctx, x - 24, 244, 48, 4, '#c9a763');
    lingkaran(ctx, x - 13, 238, 7, '#f2c17d');
    lingkaran(ctx, x - 13, 236, 5, '#ffd9a3');
    P(ctx, x - 16, 232, 3, 2, '#fff3cf');
    ctx.fillStyle = '#f2c17d';
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
    for (let i = 0; i < 2; i++) {
      lingkaran(ctx, x - 16 + i * 16, 238, 7, '#f2c17d');
      lingkaran(ctx, x - 16 + i * 16, 236, 5, '#ffd9a3');
      P(ctx, x - 19 + i * 16, 232, 3, 2, '#fff3cf');
    }
    ctx.fillStyle = '#f2c17d';
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

  function gambarDelapanMiring(x, t) {
    gambarCahaya(x, 226, 14, '#a8e8d8', t);
    ctx.strokeStyle = '#a8e8d8';
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
    for (let i = 0; i < 9; i++) {
      const jx = x - 22 + i * 5 + Math.round(Math.sin(i * 0.9) * 6);
      const jy = 246 - i * 3;
      P(ctx, jx, jy, 8, 3, i % 2 ? '#4a6a8e' : '#5a7aa0');
      if (i % 3 === 0) P(ctx, jx + 3, jy - 2, 1, 1, 'rgba(255,253,242,.6)');
    }
    teksPx(ctx, 'tanpa ujung', x + 2, 210, '#a8c4f0', 6);
  }
  function gambarBintangTerbanyak(x, t) {
    for (let i = 0; i < 18; i++) {
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

  function gambarBukuTerbuka(x, t) {
    P(ctx, x - 20, 240, 40, 3, '#8a5f38');
    P(ctx, x - 19, 228, 18, 12, '#f8f4e8');
    P(ctx, x + 1, 228, 18, 12, '#f8f4e8');
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
    lingkaran(ctx, x - 2, 239, 4, '#4a8fc8');
    lingkaran(ctx, x + 5, 234, 4, '#4a8fc8');
    lingkaran(ctx, x + 12, 240, 4, '#e86a5a');
    lingkaran(ctx, x + 19, 234, 4, '#e86a5a');
    lingkaran(ctx, x + 26, 239, 4, '#e86a5a');
    teksPx(ctx, '2+3=5', x + 12, 212, '#7dffa8', 7);
  }

  function jariTangan(x, y, naik) {
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

  function kotakIsiSepuluh(x, y, isi) {
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
    for (let i = 0; i < 3; i++) {
      P(ctx, x + 32 + (i % 2) * 8, 218 - Math.floor(i / 2) * 8, 7, 7, '#c9a763');
      P(ctx, x + 32 + (i % 2) * 8, 218 - Math.floor(i / 2) * 8, 7, 2, '#e0c784');
    }
    teksPx(ctx, '5 datang', x + 16, 240, '#ffe9a3', 6);
  }
  function gambarTumpukTiga(x, t) {
    kotakIsiSepuluh(x, 196, 10);
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 8, 190 - i * 8, 8, 7, '#c9a763');
      P(ctx, x - 8, 190 - i * 8, 8, 2, '#e0c784');
    }
    teksPx(ctx, '3', x + 6, 172, '#ffe9a3', 7);
  }
  function gambarPapanDelapanLima(x, t) {
    papanLebar(x, ['8+5', '= 13'], 46);
  }

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

  function gambarPosHitung(x, t) {
    P(ctx, x - 22, 224, 3, 22, '#6a4c2e');
    P(ctx, x + 14, 224, 3, 22, '#6a4c2e');
    P(ctx, x - 26, 196, 28, 24, '#8a6a44');
    for (let i = 0; i < 3; i++) {
      const bx = x - 24 + (i % 2) * 10, by = 206 - Math.floor(i / 2) * 10;
      P(ctx, bx, by, 9, 9, '#c9a763');
      P(ctx, bx, by + 3, 9, 2, '#8a6a44');
    }
    P(ctx, x + 6, 202, 24, 16, '#8a6a44');
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
    teksPx(ctx, '1', x + 14, 211, '#ff9d9d', 8);
    P(ctx, x - 6, 219, 16, 1, '#ff9d9d');
    P(ctx, x + 7, 217, 3, 3, '#ff9d9d'); P(ctx, x + 7, 221, 3, 3, '#ff9d9d');
    teksPx(ctx, '2', x + 14, 230, '#7dffa8', 8);
    P(ctx, x - 26, 246, 52, 2, '#141d33');
  }
  function gambarPapanSimpan(x, t) {
    papanLebar(x, ['35+7', '= 42'], 46);
  }

  function piringKue(x, jml, makan) {
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
    P(ctx, x - 14, 232, 28, 13, '#f8f2e4');
    P(ctx, x - 14, 232, 28, 2, '#e8dcc8');
    P(ctx, x - 1, 232, 2, 13, '#c9a763');
    P(ctx, x - 14, 238, 28, 1, '#c9a763');
    teksPx(ctx, '3 dijaga', x, 220, '#ffe9a3', 6);
  }

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

  function gambarPapanTakMuat(x, t) {
    papanBersusun3(x, '42', '15', '?', '-', 42, '#ff9d9d');
  }
  function gambarPinjamSatu(x, t) {
    gambarCahaya(x + 18, 224, 12, '#ff9d9d', t);
    P(ctx, x - 2, 226, 14, 14, '#c9a763');
    P(ctx, x - 2, 232, 14, 2, '#8a6a44');
    teksPx(ctx, '1', x + 5, 228, '#5f4426', 7);
    P(ctx, x + 14, 232, 12, 1, '#ff9d9d');
    P(ctx, x + 24, 230, 3, 3, '#ff9d9d'); P(ctx, x + 24, 234, 3, 3, '#ff9d9d');
    for (let i = 0; i < 10; i++)
      lingkaran(ctx, x + 30 + (i % 5) * 4, 230 + Math.floor(i / 5) * 6, 1.6, '#ffe9a3');
    teksPx(ctx, '4 jadi 3', x + 4, 210, '#ffe9a3', 6);
    teksPx(ctx, 'jadi 12', x + 34, 212, '#ffe9a3', 6);
  }
  function gambarDuaBelasKurangLima(x, t) {
    for (let i = 0; i < 12; i++) {
      const dx = x - 2 + (i % 6) * 8, dy = 226 + Math.floor(i / 6) * 9;
      if (i < 5) P(ctx, dx - 2, dy + 1, 8, 1, '#ff9d9d');
      lingkaran(ctx, dx, dy, 2.4, i < 5 ? '#c86a8a' : '#ffe9a3');
    }
    teksPx(ctx, '12-5=7', x + 16, 210, '#7dffa8', 7);
  }
  function gambarPapanHasilPinjam(x, t) {
    papanLebar(x, ['42-15', '= 27'], 48);
  }

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
    layanganPixel(x - 10, 224, '#ffd166', '#ff9d9d');
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

  function gambarKalengTujuh(x, t) {
    P(ctx, x - 10, 226, 20, 20, '#9aa6b8');
    P(ctx, x - 10, 226, 20, 2, '#c3ccda');
    P(ctx, x - 12, 224, 24, 3, '#8a94a8');
    for (let i = 0; i < 7; i++) {
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
    P(ctx, x + 16, 244, 20, 3, '#c9a763');
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

  function gambarPapanTeka(x, t) {
    papanLebar(x, ['4+?=9'], 48);
    gambarCahaya(x, 214, 10, '#a8c4f0', t);
  }
  function gambarJejakSembilan(x, t) {
    for (let i = 0; i < 9; i++) {
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
    P(ctx, x + 36, 178, 2, 34, '#7a5230');
    P(ctx, x + 38, 178, 9, 6, '#ff9d9d');
    for (let i = 0; i < 7; i++) P(ctx, x - 4 + i * 5, 236, 2, 2, 'rgba(255,253,242,.5)');
    teksPx(ctx, '3 lompatan!', x + 6, 172, '#ffe9a3', 6);
  }
  function gambarKantongKelereng(x, t) {
    P(ctx, x - 22, 196, 48, 3, '#7a5230');
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

  function gambarPasangSandal(x, t) {
    P(ctx, x - 24, 208, 54, 3, '#7a5230');
    for (let p = 0; p < 5; p++) {
      const px = x - 22 + p * 12;
      P(ctx, px, 202, 4, 6, '#c9a763'); P(ctx, px, 200, 3, 2, '#e0c784');
      P(ctx, px + 5, 202, 4, 6, '#a5d8ff'); P(ctx, px + 5, 200, 3, 2, '#d0ecff');
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
    for (let n = 1; n <= 4; n++) {
      const a = n * Math.PI / 6;
      teksPx(ctx, String(n), cx + Math.round(Math.sin(a) * 11), cy - Math.round(Math.cos(a) * 11) - 2, '#c07d0c', 5);
    }
    P(ctx, cx, cy, 2, 10, '#2a3757');
    P(ctx, cx + 1, cy + 9, 6, 2, '#2a3757');
    P(ctx, cx, cy - 8, 2, 8, '#8a94a8');
    lingkaran(ctx, cx + 1, cy, 2, '#c07d0c');
    teksPx(ctx, 'tiap angka = 5 menit', x + 4, 176, '#ffe9a3', 5);
    teksPx(ctx, '20 menit', cx + 20, 226, '#7dffa8', 6);
  }

  function gambarGerbongSatu(x, t) {
    P(ctx, x - 6, 202, 36, 26, '#9aa6b8');
    P(ctx, x - 6, 202, 36, 3, '#c3ccda');
    for (let i = 0; i < 10; i++) {
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
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 8 + i * 14, 200 - (i === 1 ? 3 : 0), 2, 2, '#ffe9a3');
      P(ctx, x - 3 + i * 14, 198 - (i === 1 ? 3 : 0), 2, 2, '#ffe9a3');
    }
    teksPx(ctx, 'dari 0, 3 lompatan', x + 4, 186, '#ffe9a3', 5);
  }

  function gambarSegitigaTiga(x, t) {
    for (let s = 0; s < 4; s++) {
      const cx = x - 24 + s * 16;
      P(ctx, cx - 7, 218, 14, 2, '#c98a4b');
      P(ctx, cx - 7, 214, 2, 4, '#c98a4b'); P(ctx, cx + 5, 214, 2, 4, '#c98a4b');
      P(ctx, cx - 5, 208, 2, 6, '#c98a4b'); P(ctx, cx + 3, 208, 2, 6, '#c98a4b');
      P(ctx, cx - 2, 202, 4, 6, '#c98a4b');
      teksPx(ctx, String((s + 1) * 3), cx, 190, '#fffdf2', 6);
    }
    teksPx(ctx, 'tiap segitiga 3 sisi', x + 4, 178, '#ffe9a3', 5);
  }
  function gambarKursiEmpat(x, t) {
    for (let k = 0; k < 4; k++) {
      const cx = x - 24 + k * 16;
      P(ctx, cx - 5, 208, 10, 3, '#a3744a');
      P(ctx, cx + 3, 196, 2, 12, '#a3744a');
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
    P(ctx, x - 16, 236, 36, 10, '#8a7048');
    P(ctx, x - 8, 228, 20, 8, '#9a8058');
    P(ctx, x + 6, 186, 2, 44, '#7a5230');
    P(ctx, x + 8, 186, 10, 7, '#ff9d9d');
    P(ctx, x + 8, 193, 7, 4, '#f0b8b8');
    teksPx(ctx, '9 x 9 = 81', x - 2, 172, '#ffd166', 7);
  }

  function gambarJariSembilan(x, t) {
    P(ctx, x - 24, 224, 52, 6, '#8a6a44');
    P(ctx, x - 20, 230, 3, 16, '#7a5230'); P(ctx, x + 20, 230, 3, 16, '#7a5230');
    for (let i = 0; i < 10; i++) {
      const fx = x - 20 + i * 5;
      if (i === 2) {
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
    P(ctx, x - 30, 188, 60, 3, '#7a5230');
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

  function gambarKartu23(x, t) {
    papanBersusun3(x, '23', '4', '', 'x', 42);
  }
  function gambarKaliSatuan(x, t) {
    papanBersusun3(x, '23', '4', '2', 'x', 42);
    teksPx(ctx, '1', x - 9, 192, '#ff9d9d', 7);
    P(ctx, x - 8, 198, 1, 3, '#ff9d9d');
  }
  function gambarKaliPuluhan(x, t) {
    papanBersusun3(x, '23', '4', '92', 'x', 42);
  }
  function gambarPapan92(x, t) {
    papanLebar(x, ['23 x 4', '= 92'], 48);
    teksPx(ctx, '9 ikat, 2 keping', x, 186, '#c07d0c', 5);
  }

  function gambarNampanSepuluh(x, t) {
    P(ctx, x - 14, 222, 46, 7, '#a3744a');
    P(ctx, x - 14, 222, 46, 2, '#bd8a5a');
    for (let i = 0; i < 10; i++)
      lingkaran(ctx, x - 10 + (i % 5) * 8, 214 + Math.floor(i / 5) * 7, 2.6, i % 2 ? '#a5d8ff' : '#ffe9a3');
    for (let p = 0; p < 2; p++) {
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
      for (let i = 0; i < 5; i++)
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
      P(ctx, kx - 5, 226, 11, 12, '#c9a763');
      P(ctx, kx - 5, 226, 11, 2, '#e0c784');
      P(ctx, kx - 2, 223, 5, 3, '#8a6a44');
      for (let r = 0; r < 2; r++)
        lingkaran(ctx, kx, 218 - r * 6, 2.6, '#e8b06a');
    }
    teksPx(ctx, '6 : 3 = 2', x + 10, 198, '#7dffa8', 7);
  }

  function gambarKueTujuh(x, t) {
    P(ctx, x - 14, 224, 44, 7, '#a3744a');
    for (let i = 0; i < 7; i++) {
      const kx = x - 10 + (i % 4) * 9, ky = 212 + Math.floor(i / 4) * 9;
      lingkaran(ctx, kx, ky, 3.2, '#f2c17d');
      lingkaran(ctx, kx, ky - 1, 2, '#ffd9a3');
    }
    for (let p = 0; p < 2; p++) {
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
    lingkaran(ctx, x + 30, 240, 3.2, '#f2c17d');
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

  function gambarKartu96(x, t) {
    teksPx(ctx, '9 ikat & 6 keping', x, 178, '#ffe9a3', 5);
    P(ctx, x - 27, 188, 54, 52, '#1e2a44');
    P(ctx, x - 27, 188, 54, 2, '#37476f');
    teksPx(ctx, '96 : 3', x, 193, '#fffdf2', 7);
    P(ctx, x - 21, 206, 42, 1, '#5a6a94');
    for (let i = 0; i < 9; i++) {
      const bx = x - 20 + i * 5;
      P(ctx, bx, 211, 4, 6, '#c9a763');
      P(ctx, bx, 213, 4, 1, '#8a6a44');
    }
    for (let i = 0; i < 6; i++)
      lingkaran(ctx, x - 19 + i * 5, 225, 1.8, '#ffe9a3');
    P(ctx, x - 27, 236, 54, 2, '#141d33');
    P(ctx, x - 22, 238, 3, 8, '#7a5230'); P(ctx, x + 19, 238, 3, 8, '#7a5230');
  }
  function gambarIkatSembilan(x, t) {
    for (let p = 0; p < 3; p++) {
      const px = x + 2 + p * 14;
      lingkaran(ctx, px, 242, 6, '#e8e0d0');
      lingkaran(ctx, px, 242, 4, '#f8f2e4');
      P(ctx, px - 3, 230, 7, 8, '#c9a763');
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
      for (let k = 0; k < 2; k++)
        lingkaran(ctx, px - 2 + k * 5, 234, 2, '#ffe9a3');
      teksPx(ctx, '2', px, 222, '#7dffa8', 5);
    }
    teksPx(ctx, '6 keping', x + 10, 206, '#a5d8ff', 5);
  }
  function gambarPapan32(x, t) {
    papanLebar(x, ['96 : 3', '= 32', '3x32=96'], 58);
  }

  function gambarTumpukan24(x, t) {
    for (let s = 0; s < 6; s++) {
      const sx = x - 20 + s * 10;
      for (let b = 0; b < 4; b++)
        lingkaran(ctx, sx, 218 - b * 6, 2.4, s % 2 ? '#a5d8ff' : '#ffe9a3');
      P(ctx, sx - 4, 222, 9, 2, '#8a6a44');
    }
    teksPx(ctx, '6 x 4 = 24', x + 5, 188, '#7dffa8', 7);
  }
  function gambarPiringBalik(x, t) {
    for (let p = 0; p < 6; p++) {
      const px = x - 20 + p * 10;
      P(ctx, px - 4, 220, 9, 2, '#a3744a');
      for (let b = 0; b < 4; b++)
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

  function potongKue(c, cx, by, r, col) {
    for (let dy = 0; dy <= r; dy++) {
      const w = Math.round(Math.sqrt(Math.max(0, r * r - dy * dy)));
      P(c, cx, by - dy, w, 1, col);
    }
  }
  function setengahKue(c, cx, by, r, col) {
    for (let dy = 0; dy <= r; dy++) {
      const w = Math.round(2 * Math.sqrt(Math.max(0, r * r - dy * dy)));
      P(c, cx - Math.round(w / 2), by - dy, w, 1, col);
    }
  }
  function kotakRangka(x, y, w, h, col) {
    P(ctx, x, y, w, 1, col);
    P(ctx, x, y + h - 1, w, 1, col);
    P(ctx, x, y, 1, h, col);
    P(ctx, x + w - 1, y, 1, h, col);
  }

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

  function gambarKueDelapanGelang(x, t) {
    lingkaran(ctx, x, 235, 13, '#e8b06a');
    lingkaran(ctx, x, 233, 5, '#f2b8cc');
    P(ctx, x - 1, 220, 2, 30, '#8a5f38');
    P(ctx, x - 12, 234, 24, 2, '#8a5f38');
    for (let d = -3; d <= 3; d++) {
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

  function gambarGerbangTambang(x) {
    P(ctx, x - 32, 184, 64, 8, '#6b4a2c');
    P(ctx, x - 30, 192, 7, 54, '#7a5230');
    P(ctx, x + 23, 192, 7, 54, '#5f4426');
    P(ctx, x - 23, 196, 46, 50, '#241a10');
    P(ctx, x - 16, 186, 32, 11, '#8a5f38');
    teksPx(ctx, 'TAMBANG', x, 189, '#ffe9a3', 6);
    P(ctx, x + 2, 192, 1, 24, '#c9c9d4');
    P(ctx, x - 4, 216, 12, 8, '#7a5230');
    P(ctx, x - 4, 216, 12, 2, '#96764e');
    const lantai = [['0', 208], ['-1', 218], ['-2', 228], ['-3', 238]];
    for (let i = 0; i < 4; i++) {
      P(ctx, x - 42, lantai[i][1], 13, 9, '#141d33');
      P(ctx, x - 42, lantai[i][1], 13, 1, '#4fe3c8');
      teksPx(ctx, lantai[i][0], x - 35, lantai[i][1] + 2, '#fffdf2', 6);
    }
  }

  function gambarTiangKedalaman(x) {
    P(ctx, x - 1, 186, 3, 60, '#5f4426');
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
    lingkaran(ctx, x, 190, 6, '#3a3f52');
    lingkaran(ctx, x, 190, 2, '#78809a');
    P(ctx, x, 196, 2, 34, '#c9c9d4');
    const simpul = [['-1', 202], ['-2', 212], ['-3', 222]];
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 2, simpul[i][1], 6, 2, '#8a8a98');
      teksPx(ctx, simpul[i][0], x + 12, simpul[i][1] - 2, '#eafff2', 6);
    }
    P(ctx, x - 7, 230, 16, 10, '#7a5230');
    P(ctx, x - 7, 230, 16, 2, '#96764e');
    P(ctx, x - 5, 228, 3, 2, '#c9c9d4'); P(ctx, x + 3, 228, 3, 2, '#c9c9d4');
    teksPx(ctx, '-3', x - 16, 232, '#eafff2', 6);
  }

  function gambarTanggaMinus(x) {
    const anak = [['0', 200], ['-1', 212], ['-2', 224], ['-3', 236]];
    for (let i = 0; i < 4; i++) {
      P(ctx, x - 30 + i * 12, anak[i][1], 14, 8, '#8a5f38');
      P(ctx, x - 30 + i * 12, anak[i][1], 14, 2, '#a3744a');
      teksPx(ctx, anak[i][0], x - 23 + i * 12, anak[i][1] - 8, '#eafff2', 6);
    }
    P(ctx, x + 26, 202, 2, 32, '#a8e8c0');
    P(ctx, x + 22, 230, 10, 2, '#a8e8c0');
    P(ctx, x + 24, 234, 6, 2, '#a8e8c0');
    teksPx(ctx, 'KECIL', x + 26, 194, '#a8e8c0', 6);
  }

  function gambarJembatanAngka(x) {
    P(ctx, x - 43, 226, 86, 5, '#8a5f38');
    P(ctx, x - 43, 231, 86, 2, '#6b4a2c');
    const urut = ['-3', '-2', '-1', '0', '1', '2', '3'];
    for (let i = 0; i < 7; i++) {
      const px2 = x - 39 + i * 13;
      P(ctx, px2 - 1, 212, 3, 14, '#5f4426');
      teksPx(ctx, urut[i], px2 + 1, i % 2 === 0 ? 198 : 204, '#eafff2', 6);
    }
    P(ctx, x - 45, 240, 90, 2, '#4a341c');
  }

  function gambarTiangNolTengah(x, t) {
    P(ctx, x - 2, 200, 5, 46, '#5f4426');
    const nyala = Math.sin(t * 3) * 1.2;
    lingkaran(ctx, x, 196, 7 + nyala, '#ffd166');
    lingkaran(ctx, x, 196, 4, '#fff3cf');
    teksPx(ctx, '0', x, 184, '#fffdf2', 8);
    P(ctx, x - 30, 222, 24, 10, '#1e3a2a');
    teksPx(ctx, 'KECIL', x - 18, 224, '#a8e8c0', 6);
    P(ctx, x + 6, 222, 24, 10, '#1e3a2a');
    teksPx(ctx, 'BESAR', x + 18, 224, '#a8e8c0', 6);
  }

  function gambarPanahDuaArah(x) {
    P(ctx, x - 22, 212, 3, 34, '#5f4426');
    P(ctx, x + 19, 212, 3, 34, '#5f4426');
    P(ctx, x - 34, 200, 24, 12, '#141d33');
    P(ctx, x - 30, 205, 14, 2, '#a8e8c0');
    P(ctx, x - 33, 203, 3, 6, '#a8e8c0');
    P(ctx, x + 10, 200, 24, 12, '#141d33');
    P(ctx, x + 16, 205, 14, 2, '#a8e8c0');
    P(ctx, x + 30, 203, 3, 6, '#a8e8c0');
    ctx.globalAlpha = 0.5;
    lingkaran(ctx, x - 40, 220, 8, '#e8f4ee');
    lingkaran(ctx, x + 40, 224, 8, '#e8f4ee');
    ctx.globalAlpha = 1;
  }

  function gambarLangkahBilangan(x) {
    P(ctx, x - 30, 240, 60, 2, '#4a341c');
    teksPx(ctx, '0', x, 244, '#fffdf2', 6);
    P(ctx, x - 1, 236, 3, 4, '#a8e8c0');
    for (let i = 1; i <= 2; i++) {
      lingkaran(ctx, x + i * 10, 238, 2, '#c9a876');
      lingkaran(ctx, x - i * 10, 242, 2, '#c9a876');
    }
    P(ctx, x + 22, 228, 14, 10, '#1e3a2a');
    teksPx(ctx, '2', x + 29, 230, '#eafff2', 6);
    P(ctx, x - 36, 228, 14, 10, '#1e3a2a');
    teksPx(ctx, '-2', x - 29, 230, '#eafff2', 6);
    P(ctx, x + 18, 246, 20, 2, '#a8e8c0');
    P(ctx, x - 38, 246, 20, 2, '#a8e8c0');
  }

  function gambarTermometerGanda(x) {
    P(ctx, x - 3, 188, 4, 52, '#c8d8e2');
    const tingkat = [['5', 196], ['0', 214], ['-5', 232]];
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 6, tingkat[i][1], 10, 2, '#78809a');
      teksPx(ctx, tingkat[i][0], x, tingkat[i][1] - 9, '#2f5a74', 6);
    }
    P(ctx, x - 16, 196, 6, 42, '#eef4fa');
    lingkaran(ctx, x - 13, 240, 5, '#ff6b6b');
    P(ctx, x - 15, 216, 2, 24, '#ff6b6b');
    P(ctx, x + 10, 196, 6, 42, '#eef4fa');
    lingkaran(ctx, x + 13, 240, 5, '#4a7fc0');
    P(ctx, x + 11, 232, 2, 8, '#4a7fc0');
  }

  function gambarPapanBeku(x) {
    papanLebar(x, ['0 AIR', 'MEMBEKU'], 52);
    P(ctx, x - 30, 240, 60, 2, '#7db8e8');
    for (let i = 0; i < 5; i++) P(ctx, x - 24 + i * 11, 244, 3, 3, '#ffffff');
    for (let i = 0; i < 4; i++) P(ctx, x - 18 + i * 11, 236, 2, 2, '#4a90c8');
  }

  function gambarEsTumpuk(x) {
    P(ctx, x + 12, 196, 3, 46, '#c8d8e2');
    teksPx(ctx, '0', x + 14, 190, '#2f5a74', 6);
    teksPx(ctx, '-5', x + 14, 234, '#2f5a74', 6);
    for (let i = 0; i < 5; i++) {
      P(ctx, x - 14, 236 - i * 9, 22, 8, '#cdeefc');
      P(ctx, x - 14, 236 - i * 9, 22, 2, '#ffffff');
      P(ctx, x - 10, 238 - i * 9, 4, 2, '#a8d8f0');
    }
    teksPx(ctx, 'BLOK', x - 6, 190, '#2f5a74', 6);
  }

  function gambarDuaKamarEs(x) {
    P(ctx, x - 30, 200, 24, 46, '#9cc4dc');
    P(ctx, x - 27, 204, 18, 42, '#c8e0ee');
    P(ctx, x + 6, 200, 24, 46, '#7aa8c4');
    P(ctx, x + 9, 204, 18, 42, '#a8cde2');
    teksPx(ctx, '-3', x - 18, 192, '#2f5a74', 7);
    teksPx(ctx, '-8', x + 18, 192, '#2f5a74', 7);
    for (let i = 0; i < 3; i++) P(ctx, x - 25 + i * 7, 240, 5, 4, '#ffffff');
    for (let i = 0; i < 8; i++) P(ctx, x + 10 + (i % 4) * 4, 240 - Math.floor(i / 4) * 5, 3, 4, '#ffffff');
    teksPx(ctx, 'A', x - 18, 248, '#2f5a74', 6);
    teksPx(ctx, 'B', x + 18, 248, '#2f5a74', 6);
  }

  function gambarBukuCatatan(x) {
    P(ctx, x - 26, 206, 26, 36, '#f2ecd4');
    P(ctx, x + 2, 206, 26, 36, '#f2ecd4');
    P(ctx, x - 1, 204, 3, 40, '#8a6a44');
    teksPx(ctx, 'UTANG', x - 13, 212, '#bd5a5f', 6);
    teksPx(ctx, '-3', x - 13, 226, '#3a2a08', 8);
    teksPx(ctx, 'KUE', x + 15, 212, '#6b4a2c', 6);
    for (let i = 0; i < 3; i++) P(ctx, x + 9 + i * 7, 224, 5, 5, '#c98a4b');
    P(ctx, x - 30, 244, 62, 2, '#5f4426');
  }

  function gambarKoinNampanLima(x) {
    P(ctx, x - 22, 240, 44, 5, '#8a5f38');
    P(ctx, x - 22, 240, 44, 1, '#a3744a');
    const kx = [x - 16, x - 8, x, x + 8, x + 16];
    for (let i = 0; i < 5; i++) {
      lingkaran(ctx, kx[i], 234, 4, i < 3 ? '#c9971c' : '#ffd166');
      lingkaran(ctx, kx[i] - 1, 233, 1, '#fff3cf');
    }
    P(ctx, x - 18, 246, 26, 2, '#bd5a5f');
    teksPx(ctx, 'UTANG', x - 14, 250, '#ffd166', 5);
    P(ctx, x + 6, 246, 20, 2, '#2aa85e');
    teksPx(ctx, 'SISA', x + 16, 250, '#7dffa8', 5);
  }

  function gambarPapanSaldoUtang(x) {
    papanLebar(x, ['-3 UTANG', 'BAYAR 5', 'SISA +2'], 58);
  }

  function gambarStempelLunas(x) {
    P(ctx, x - 20, 208, 34, 32, '#f2ecd4');
    teksPx(ctx, '-3', x - 12, 214, '#3a2a08', 7);
    P(ctx, x - 18, 218, 12, 2, '#bd5a5f');
    P(ctx, x - 17, 222, 34, 12, '#2aa85e');
    teksPx(ctx, 'LUNAS', x, 225, '#fffdf2', 6);
    P(ctx, x + 18, 226, 16, 14, '#f2ecd4');
    teksPx(ctx, '+2', x + 26, 230, '#2aa85e', 6);
    P(ctx, x - 2, 196, 4, 12, '#5f4426');
    lingkaran(ctx, x, 194, 4, '#8a5f38');
  }

  function gambarTiangJurangDua(x) {
    P(ctx, x - 44, 188, 14, 58, '#4c5068');
    P(ctx, x + 30, 188, 14, 58, '#4c5068');
    teksPx(ctx, '0', x, 192, '#ffd166', 6);
    P(ctx, x - 1, 196, 3, 3, '#ffd166');
    P(ctx, x - 20, 208, 2, 14, '#78809a');
    P(ctx, x - 26, 220, 14, 9, '#141d33');
    teksPx(ctx, '-3', x - 19, 222, '#fffdf2', 6);
    P(ctx, x + 14, 216, 2, 24, '#78809a');
    P(ctx, x + 8, 236, 14, 9, '#141d33');
    teksPx(ctx, '-8', x + 15, 238, '#fffdf2', 6);
  }

  function gambarPapanLebihKecil(x) {
    P(ctx, x - 36, 200, 72, 26, '#122419');
    P(ctx, x - 36, 200, 72, 2, '#1e3a2a');
    teksPx(ctx, '-8 < -3', x, 205, '#fffdf2', 7);
    teksPx(ctx, 'MAKIN KECIL', x, 216, '#a8e8c0', 6);
    P(ctx, x - 28, 226, 3, 20, '#4a341c');
    P(ctx, x + 25, 226, 3, 20, '#4a341c');
  }

  function gambarLenteraJurang(x) {
    P(ctx, x - 15, 190, 1, 16, '#c9c9d4');
    lingkaran(ctx, x - 15, 210, 4, '#ffd166');
    lingkaran(ctx, x - 15, 210, 2, '#fff3cf');
    teksPx(ctx, '-3', x - 25, 200, '#eafff2', 6);
    P(ctx, x + 14, 190, 1, 40, '#c9c9d4');
    lingkaran(ctx, x + 14, 234, 4, '#ffd166');
    lingkaran(ctx, x + 14, 234, 2, '#fff3cf');
    teksPx(ctx, '-8', x + 24, 206, '#eafff2', 6);
    P(ctx, x - 22, 186, 44, 3, '#4c5068');
  }

  function gambarPapanUrutanNegatif(x) {
    P(ctx, x - 16, 194, 32, 50, '#122419');
    P(ctx, x - 16, 194, 32, 2, '#1e3a2a');
    const urut = ['3', '1', '0', '-1', '-3', '-8'];
    for (let i = 0; i < 6; i++) teksPx(ctx, urut[i], x, 198 + i * 7.5, '#eafff2', 6);
    P(ctx, x + 20, 198, 2, 38, '#a8e8c0');
    P(ctx, x + 16, 234, 10, 2, '#a8e8c0');
    teksPx(ctx, 'KECIL', x + 20, 240, '#a8e8c0', 6);
  }

  function gambarTanggaDermaga(x) {
    P(ctx, x - 34, 202, 14, 4, '#8a5f38');
    P(ctx, x - 30, 206, 3, 40, '#6b4a2c');
    P(ctx, x - 10, 196, 2, 50, '#6b4a2c');
    P(ctx, x + 8, 196, 2, 50, '#6b4a2c');
    const anak = [['4', 198], ['3', 205], ['2', 212], ['1', 219], ['0', 226], ['-1', 233], ['-2', 240]];
    for (let i = 0; i < 7; i++) {
      P(ctx, x - 8, anak[i][1], 16, 2, '#8a5f38');
      teksPx(ctx, anak[i][0], x + 15, anak[i][1] - 2, '#eafff2', 6);
    }
    P(ctx, x - 30, 226, 40, 2, '#4a90c8');
    for (let i = 0; i < 4; i++) P(ctx, x - 28 + i * 10, 229, 6, 1, '#7db8e8');
  }

  function gambarPerahuNelayan(x) {
    P(ctx, x - 14, 230, 28, 4, '#7a5230');
    P(ctx, x - 11, 226, 22, 4, '#96764e');
    P(ctx, x, 210, 2, 16, '#5f4426');
    P(ctx, x + 2, 210, 9, 6, '#ff9d9d');
    P(ctx, x - 8, 226, 5, 4, '#c98a4b');
    teksPx(ctx, '3', x - 22, 226, '#eafff2', 7);
    P(ctx, x - 18, 222, 2, 24, '#6b4a2c');
    for (let i = 0; i < 3; i++) P(ctx, x - 18, 224 + i * 8, 8, 2, '#8a5f38');
    P(ctx, x - 28, 246, 56, 2, '#4a90c8');
  }

  function gambarTaliTurunPerahu(x) {
    P(ctx, x - 8, 238, 20, 4, '#7a5230');
    P(ctx, x - 6, 234, 16, 4, '#96764e');
    P(ctx, x + 2, 220, 2, 14, '#5f4426');
    P(ctx, x + 4, 220, 8, 5, '#ff9d9d');
    const jejak = [['3', 198], ['2', 206], ['1', 214], ['0', 222], ['-1', 230]];
    for (let i = 0; i < 5; i++) {
      P(ctx, x - 10, jejak[i][1], 6, 2, '#c9a876');
      teksPx(ctx, jejak[i][0], x - 18, jejak[i][1] - 3, '#eafff2', 6);
    }
    teksPx(ctx, '-2', x - 18, 236, '#ffd166', 7);
    P(ctx, x - 24, 246, 48, 2, '#4a90c8');
  }

  function gambarPapanCatatanKapten(x) {
    P(ctx, x - 30, 198, 60, 32, '#141d33');
    P(ctx, x - 30, 198, 60, 2, '#37476f');
    teksPx(ctx, 'MULAI 3', x, 203, '#fffdf2', 6);
    teksPx(ctx, 'TURUN 5', x, 213, '#ff9d9d', 6);
    teksPx(ctx, 'DARAT -2', x, 223, '#7dffa8', 6);
    P(ctx, x - 24, 234, 48, 11, '#8a5f38');
    teksPx(ctx, '3 + (-5) = -2', x, 236, '#3a2a08', 5);
  }

  function gambarPintuMinusGanda(x) {
    P(ctx, x - 34, 194, 68, 52, '#241f2c');
    lingkaran(ctx, x, 194, 34, '#241f2c');
    P(ctx, x - 44, 194, 88, 4, '#1a1620');
    P(ctx, x - 22, 218, 16, 28, '#3a2f42');
    teksPx(ctx, '-', x - 14, 221, '#ff9d9d', 8);
    P(ctx, x + 6, 218, 16, 28, '#3a2f42');
    teksPx(ctx, '-', x + 14, 221, '#ff9d9d', 8);
    P(ctx, x - 8, 244, 16, 2, '#78809a');
  }

  function gambarKunciBalikArah(x, t) {
    P(ctx, x - 8, 194, 2, 14, '#5f4426');
    lingkaran(ctx, x - 8, 214, 6, '#ffd166');
    lingkaran(ctx, x - 8, 214, 2, '#4a341c');
    P(ctx, x - 3, 213, 16, 3, '#ffd166');
    P(ctx, x + 10, 216, 2, 5, '#ffd166');
    P(ctx, x + 14, 216, 2, 4, '#ffd166');
    P(ctx, x - 36, 224, 14, 2, '#78809a');
    P(ctx, x - 39, 222, 3, 6, '#78809a');
    teksPx(ctx, 'MUNDUR', x - 30, 232, '#78809a', 5);
    P(ctx, x + 22, 224, 14, 2, '#ffd166');
    P(ctx, x + 36, 222, 3, 6, '#ffd166');
    teksPx(ctx, 'MAJU', x + 30, 232, '#ffd166', 5);
    const kilau = Math.sin(t * 4) * 1;
    lingkaran(ctx, x - 8, 206 + kilau, 1, '#fff3cf');
  }

  function gambarJejakLorong(x) {
    const plang = [['3', x - 16], ['4', x - 2], ['5', x + 12]];
    for (let i = 0; i < 3; i++) {
      P(ctx, plang[i][1], 236, 12, 9, '#141d33');
      P(ctx, plang[i][1], 236, 12, 1, '#7dffa8');
      teksPx(ctx, plang[i][0], plang[i][1] + 6, 238, '#fffdf2', 6);
    }
    lingkaran(ctx, x - 8, 232, 2, '#c9a876');
    lingkaran(ctx, x + 6, 232, 2, '#c9a876');
    P(ctx, x - 30, 236, 12, 2, '#ffd166');
    P(ctx, x - 33, 234, 3, 6, '#ffd166');
  }

  function gambarPapanBukaRahasia(x) {
    P(ctx, x - 36, 202, 72, 26, '#122419');
    P(ctx, x - 36, 202, 72, 2, '#1e3a2a');
    teksPx(ctx, '3 - (-2)', x, 206, '#fffdf2', 7);
    teksPx(ctx, '= 3 + 2 = 5', x, 216, '#7dffa8', 7);
    P(ctx, x - 30, 228, 3, 18, '#4a341c');
    P(ctx, x + 27, 228, 3, 18, '#4a341c');
    teksPx(ctx, 'RAHASIA', x, 242, '#ffd166', 6);
  }

  function gambarPapanPanahKiri(x) {
    P(ctx, x - 2, 208, 4, 38, '#5f4426');
    P(ctx, x - 20, 196, 40, 14, '#141d33');
    P(ctx, x - 20, 196, 40, 2, '#37476f');
    P(ctx, x - 13, 202, 16, 2, '#7dffa8');
    P(ctx, x - 16, 200, 3, 6, '#7dffa8');
    P(ctx, x - 18, 202, 2, 2, '#7dffa8');
    teksPx(ctx, 'MINUS', x, 220, '#ffe9a3', 6);
  }

  function gambarTanggaPolaMinus(x) {
    const tangga = ['-6', '-4', '-2', '0', '2', '4', '6'];
    for (let i = 0; i < 7; i++) {
      const px2 = x - 36 + i * 12, py2 = 242 - i * 7;
      P(ctx, px2, py2, 12, 7, '#8a5f38');
      P(ctx, px2, py2, 12, 2, '#a3744a');
      teksPx(ctx, tangga[i], px2 + 6, py2 - 8, '#eafff2', 6);
    }
    P(ctx, x - 38, 190, 2, 10, '#a8e8c0');
    P(ctx, x - 40, 192, 6, 2, '#a8e8c0');
  }

  function gambarCerminDuaArah(x) {
    P(ctx, x - 24, 202, 8, 2, '#5f4426');
    P(ctx, x - 24, 240, 8, 2, '#5f4426');
    P(ctx, x - 21, 204, 3, 36, '#a8d8f0');
    P(ctx, x + 16, 202, 8, 2, '#5f4426');
    P(ctx, x + 16, 240, 8, 2, '#5f4426');
    P(ctx, x + 18, 204, 3, 36, '#a8d8f0');
    P(ctx, x - 8, 222, 14, 2, '#ff9d9d');
    P(ctx, x - 11, 220, 3, 6, '#ff9d9d');
    P(ctx, x - 8, 208, 14, 2, '#7dffa8');
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

  function gambarMejaSortirPaket(x) {
    P(ctx, x - 24, 226, 48, 4, '#8a5f38');
    P(ctx, x - 22, 230, 3, 16, '#6b4a2c');
    P(ctx, x + 19, 230, 3, 16, '#6b4a2c');
    P(ctx, x - 20, 218, 18, 8, '#5f4426');
    P(ctx, x - 18, 216, 14, 2, '#7a5230');
    teksPx(ctx, '+', x - 11, 206, '#7dffa8', 8);
    P(ctx, x + 2, 218, 18, 8, '#5f4426');
    P(ctx, x + 4, 216, 14, 2, '#7a5230');
    teksPx(ctx, '-', x + 11, 206, '#ff9d9d', 8);
    P(ctx, x - 17, 220, 5, 4, '#c98a4b');
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
    for (let i = 0; i < 3; i++) {
      const kx = x - 22 + i * 15;
      P(ctx, kx, 236, 14, 12, '#a3744a');
      P(ctx, kx, 236, 14, 2, '#c9975e');
      P(ctx, kx + 6, 234, 2, 4, '#8a6a44');
    }
  }

  function gambarSepedaKurirDua(x) {
    lingkaran(ctx, x - 10, 238, 7, '#2a2f42');
    lingkaran(ctx, x - 10, 238, 2, '#78809a');
    lingkaran(ctx, x + 10, 238, 7, '#2a2f42');
    lingkaran(ctx, x + 10, 238, 2, '#78809a');
    P(ctx, x - 9, 231, 18, 2, '#bd5a5f');
    P(ctx, x - 2, 226, 7, 2, '#5f4426');
    P(ctx, x + 7, 224, 2, 8, '#5f4426');
    P(ctx, x + 8, 214, 12, 2, '#7dffa8');
    P(ctx, x + 20, 212, 3, 6, '#7dffa8');
    teksPx(ctx, '+', x + 26, 212, '#7dffa8', 6);
    P(ctx, x - 20, 214, 12, 2, '#ff9d9d');
    P(ctx, x - 23, 212, 3, 6, '#ff9d9d');
    teksPx(ctx, '-', x - 27, 212, '#ff9d9d', 6);
    P(ctx, x - 2, 220, 8, 4, '#c98a4b');
  }

  function gambarMenaraLiftTambang(x) {
    P(ctx, x - 14, 188, 3, 58, '#4a5468');
    P(ctx, x + 11, 188, 3, 58, '#4a5468');
    for (let i = 0; i < 6; i++) P(ctx, x - 14, 190 + i * 10, 28, 1, '#3a4252');
    P(ctx, x - 10, 232, 20, 14, '#8a5f38');
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
    lingkaran(ctx, x, 204, 13, '#3a3f52');
    lingkaran(ctx, x, 204, 8, '#565e78');
    lingkaran(ctx, x, 204, 3, '#78809a');
    const putar = Math.floor(t * 2) % 4;
    for (let i = 0; i < 4; i++) {
      const a = putar * Math.PI / 2 + i * Math.PI / 2;
      P(ctx, x + Math.round(Math.cos(a) * 6), 204 + Math.round(Math.sin(a) * 6), 2, 2, '#78809a');
    }
    P(ctx, x, 217, 2, 24, '#c9c9d4');
    P(ctx, x - 6, 240, 14, 8, '#8a5f38');
    P(ctx, x - 6, 240, 14, 2, '#a3744a');
  }

  function gambarGerbangLenteraDalam(x) {
    P(ctx, x - 18, 204, 36, 6, '#485060');
    P(ctx, x - 16, 210, 6, 36, '#565e78');
    P(ctx, x + 10, 210, 6, 36, '#565e78');
    P(ctx, x - 10, 220, 20, 26, '#141a2b');
    lingkaran(ctx, x, 198, 5, '#ffd166');
    lingkaran(ctx, x, 198, 2, '#fff3cf');
    P(ctx, x - 1, 189, 2, 5, '#2a3038');
    P(ctx, x + 16, 214, 13, 9, '#141d33');
    teksPx(ctx, '-4', x + 22, 216, '#fffdf2', 6);
  }

  function gambarRakUbinDuaBelas(x) {
    P(ctx, x - 30, 188, 60, 4, '#8a5f38');
    P(ctx, x - 28, 192, 4, 54, '#5f4426');
    P(ctx, x + 24, 192, 4, 54, '#5f4426');
    for (let i = 0; i < 12; i++) {
      const ux = x - 24 + (i % 4) * 13, uy = 196 + Math.floor(i / 4) * 16;
      P(ctx, ux, uy, 11, 14, '#7dffa8');
      P(ctx, ux, uy, 11, 2, '#a8ffc4');
    }
    teksPx(ctx, '12 UBIN', x, 250, '#2aa85e', 6);
  }

  function gambarBarisSatuDuaBelas(x) {
    for (let i = 0; i < 12; i++) P(ctx, x - 42 + i * 7, 222, 6, 18, '#7dffa8');
    P(ctx, x - 42, 240, 85, 2, '#4a341c');
    P(ctx, x - 42, 244, 85, 2, '#2aa85e');
    teksPx(ctx, '1 x 12 = 12', x, 204, '#2aa85e', 6);
  }

  function gambarPetakDuaEnam(x) {
    for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) {
      const ux = x - 30 + i * 10, uy = 210 + r * 16;
      P(ctx, ux, uy, 9, 15, '#7dffa8');
      P(ctx, ux, uy, 9, 2, '#a8ffc4');
    }
    P(ctx, x - 31, 244, 61, 2, '#2aa85e');
    teksPx(ctx, '2 x 6 = 12', x, 196, '#2aa85e', 6);
  }

  function gambarPetakTigaEmpat(x) {
    for (let r = 0; r < 3; r++) for (let i = 0; i < 4; i++) {
      const ux = x - 34 + i * 10, uy = 200 + r * 15;
      P(ctx, ux, uy, 9, 14, '#7dffa8');
      P(ctx, ux, uy, 9, 2, '#a8ffc4');
    }
    teksPx(ctx, '3 x 4 = 12', x, 186, '#2aa85e', 6);
    P(ctx, x + 10, 200, 36, 46, '#1e2a44');
    teksPx(ctx, '1 2 3', x + 28, 205, '#7dffa8', 6);
    teksPx(ctx, '4 6 12', x + 28, 216, '#7dffa8', 6);
    teksPx(ctx, 'FAKTOR', x + 28, 238, '#fffdf2', 5);
  }

  function gambarBatuKuari(x) {
    lingkaran(ctx, x, 222, 22, '#968c76');
    lingkaran(ctx, x - 10, 214, 10, '#a89e88');
    lingkaran(ctx, x + 12, 226, 8, '#a89e88');
    teksPx(ctx, '12', x, 216, '#fffdf2', 8);
    P(ctx, x - 30, 244, 60, 2, '#8a8070');
    teksPx(ctx, 'BATU BESAR', x, 190, '#e8dcc8', 5);
  }

  function gambarPaluPecahDua(x) {
    lingkaran(ctx, x - 12, 224, 12, '#968c76');
    teksPx(ctx, '2', x - 12, 219, '#fffdf2', 7);
    lingkaran(ctx, x + 12, 226, 15, '#968c76');
    teksPx(ctx, '6', x + 12, 221, '#fffdf2', 7);
    P(ctx, x - 3, 190, 3, 14, '#5f4426');
    P(ctx, x - 10, 186, 18, 8, '#8a5f38');
    teksPx(ctx, '12 = 2 x 6', x, 204, '#ffd166', 6);
  }

  function gambarBataPrimaTiga(x) {
    const bata = [['2', x - 22], ['2', x], ['3', x + 22]];
    for (let i = 0; i < 3; i++) {
      P(ctx, bata[i][1] - 8, 218, 17, 16, '#b8a888');
      P(ctx, bata[i][1] - 8, 218, 17, 3, '#d0c4a8');
      teksPx(ctx, bata[i][0], bata[i][1], 223, '#5a4630', 7);
    }
    P(ctx, x - 30, 244, 60, 2, '#8a8070');
    teksPx(ctx, 'PRIMA', x, 206, '#ffd166', 6);
    teksPx(ctx, '12 = 2 x 2 x 3', x, 240, '#e8dcc8', 6);
  }

  function gambarPapanSusunPrima(x) {
    papanLebar(x, ['12 =', '2 x 2 x 3'], 56);
    lingkaran(ctx, x - 20, 196, 4, '#ffd166');
    lingkaran(ctx, x + 20, 196, 4, '#ffd166');
  }

  function gambarMejaBungkusDua(x) {
    P(ctx, x - 38, 240, 76, 4, '#8a5f38');
    P(ctx, x - 30, 210, 18, 30, '#4a7fc0');
    P(ctx, x - 30, 210, 18, 3, '#7fb0e0');
    teksPx(ctx, '12', x - 21, 200, '#2f5a74', 7);
    teksPx(ctx, 'PENSIL', x - 21, 190, '#2f5a74', 5);
    P(ctx, x + 12, 206, 22, 34, '#c9564b');
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
      P(ctx, bx, 214, 13, 16, '#f2ecd4');
      P(ctx, bx, 214, 13, 3, '#d8ccb0');
      P(ctx, bx + 4, 211, 5, 4, '#c9564b');
      teksPx(ctx, '2', bx + 3, 220, '#8a3a32', 5);
      teksPx(ctx, '3', bx + 9, 220, '#2f5a74', 5);
    }
    P(ctx, x - 40, 240, 78, 3, '#8a5f38');
    teksPx(ctx, '2 PENSIL 3 PERMEN', x, 186, '#fffdf2', 5);
    teksPx(ctx, '6 BUNGKUSAN', x, 196, '#ffd166', 6);
  }

  function gambarPapanFPBEnam(x) {
    papanLebar(x, ['FPB', '12 & 18 = 6'], 80);
    teksPx(ctx, 'TERBESAR', x, 190, '#ffd166', 6);
  }

  function gambarDuaLampionPesta(x, t) {
    P(ctx, x - 30, 188, 60, 2, '#3a3050');
    P(ctx, x - 22, 190, 2, 12, '#3a3050'); P(ctx, x + 20, 190, 2, 8, '#3a3050');
    const naikB = Math.sin(t * 2) * 1.5, naikK = Math.sin(t * 2 + 1.5) * 1.5;
    lingkaran(ctx, x - 21, 214 + naikB, 11, '#4a90c8');
    lingkaran(ctx, x - 21, 214 + naikB, 4, '#a8d8f8');
    teksPx(ctx, '4', x - 30, 210 + naikB, '#a8d8f8', 6);
    lingkaran(ctx, x + 21, 212 + naikK, 11, '#ffd166');
    lingkaran(ctx, x + 21, 212 + naikK, 4, '#fff3cf');
    teksPx(ctx, '6', x + 30, 208 + naikK, '#ffe9a3', 6);
  }

  function gambarJalurDetikPesta(x) {
    P(ctx, x - 42, 226, 84, 2, '#55655e');
    for (let i = 0; i <= 12; i++) P(ctx, x - 42 + i * 7, 222, 1, 4, '#7c8c86');
    const biru = [4, 8, 12], kuning = [6, 12];
    for (let i = 0; i < 3; i++) {
      const px2 = x - 42 + biru[i] * 7;
      lingkaran(ctx, px2, 216, 4, '#4a90c8');
      lingkaran(ctx, px2, 216, 1, '#a8d8f8');
    }
    for (let i = 0; i < 2; i++) {
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
    lingkaran(ctx, x, 206, 18, '#ffd166');
    ctx.globalAlpha = 1;
    lingkaran(ctx, x, 206, 10, '#ffd166');
    lingkaran(ctx, x, 206, 4, '#fff3cf');
    teksPx(ctx, 'DETIK 12', x, 190, '#ffe9a3', 6);
    P(ctx, x - 1, 220, 3, 22, '#55655e');
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

  function gambarPapanTanggaBagi(x) {
    P(ctx, x - 26, 192, 40, 54, '#1e2a44');
    P(ctx, x - 26, 192, 40, 2, '#37476f');
    P(ctx, x + 12, 192, 2, 54, '#37476f');
    const kiri = ['24', '12', '6', '3', '1'];
    for (let i = 0; i < 5; i++) teksPx(ctx, kiri[i], x - 14, 196 + i * 10, '#fffdf2', 6);
    const kanan = ['2', '2', '2', '3'];
    for (let i = 0; i < 4; i++) teksPx(ctx, kanan[i], x + 22, 196 + i * 10, '#ffd166', 6);
    P(ctx, x - 22, 246, 3, 6, '#7a5230'); P(ctx, x + 9, 246, 3, 6, '#7a5230');
    teksPx(ctx, 'TABEL PRIMA', x, 252, '#ffe9a3', 5);
  }

  function gambarAnakTurunDua(x) {
    P(ctx, x - 1, 190, 3, 14, '#7dffa8');
    P(ctx, x - 5, 202, 11, 3, '#7dffa8');
    P(ctx, x - 3, 204, 7, 3, '#7dffa8');
    teksPx(ctx, '24 : 2 = 12', x, 214, '#7dffa8', 6);
    teksPx(ctx, '12 : 2 = 6', x, 228, '#7dffa8', 6);
    teksPx(ctx, 'BAGI 2 TERUS', x, 244, '#ffe9a3', 5);
  }

  function gambarTanggaSampaiSatu(x) {
    const anak = [['6', 208], ['3', 222], ['1', 236]];
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 20 + i * 12, anak[i][1], 16, 10, '#8a5f38');
      P(ctx, x - 20 + i * 12, anak[i][1], 16, 2, '#a3744a');
      teksPx(ctx, anak[i][0], x - 12 + i * 12, anak[i][1] - 8, '#fffdf2', 6);
    }
    lingkaran(ctx, x + 26, 232, 6, '#ffd166');
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

  function gambarDuaPetiKartuPrima(x) {
    P(ctx, x - 40, 218, 34, 24, '#8a5f38');
    P(ctx, x - 40, 218, 34, 3, '#a3744a');
    teksPx(ctx, '12', x - 23, 206, '#ffd166', 6);
    teksPx(ctx, '2 2 3', x - 23, 226, '#fffdf2', 5);
    P(ctx, x + 6, 214, 34, 28, '#7a5230');
    P(ctx, x + 6, 214, 34, 3, '#96764e');
    teksPx(ctx, '18', x + 23, 202, '#ffd166', 6);
    teksPx(ctx, '2 3 3', x + 23, 222, '#fffdf2', 5);
    P(ctx, x - 44, 246, 88, 2, '#5a4630');
  }

  function gambarKartuSamaLingkar(x) {
    ctx.globalAlpha = 0.3;
    lingkaran(ctx, x - 26, 214, 10, '#7dffa8');
    lingkaran(ctx, x - 26, 236, 10, '#7dffa8');
    lingkaran(ctx, x + 10, 214, 10, '#7dffa8');
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
    P(ctx, x - 26, 210, 14, 16, '#7dffa8');
    teksPx(ctx, '2', x - 19, 214, '#1c5a2c', 7);
    teksPx(ctx, '+', x - 4, 214, '#ffd166', 7);
    P(ctx, x + 6, 210, 14, 16, '#7dffa8');
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

  function gambarGaleriDuaBaris(x) {
    P(ctx, x - 44, 194, 88, 36, '#f2ecd4');
    P(ctx, x - 44, 194, 88, 3, '#8a6a44'); P(ctx, x - 44, 227, 88, 3, '#8a6a44');
    P(ctx, x - 44, 194, 3, 36, '#8a6a44'); P(ctx, x + 41, 194, 3, 36, '#8a6a44');
    teksPx(ctx, '12 = 2 x 2 x 3', x, 202, '#2aa85e', 6);
    teksPx(ctx, '18 = 2 x 3 x 3', x, 214, '#2aa85e', 6);
    teksPx(ctx, 'GALERI PRIMA', x, 240, '#8a6a44', 5);
  }

  function gambarLingkarPangkatAtas(x) {
    ctx.globalAlpha = 0.3;
    lingkaran(ctx, x - 8, 206, 9, '#ffd166');
    lingkaran(ctx, x + 4, 206, 9, '#ffd166');
    lingkaran(ctx, x + 6, 228, 9, '#ffd166');
    lingkaran(ctx, x + 18, 228, 9, '#ffd166');
    ctx.globalAlpha = 1;
    teksPx(ctx, '12: 2 2 3', x - 8, 202, '#fffdf2', 6);
    teksPx(ctx, '18: 2 3 3', x - 8, 224, '#fffdf2', 6);
    teksPx(ctx, 'PANGKAT TERBESAR', x, 248, '#ffe9a3', 5);
  }

  function gambarKaliSemuaGaleri(x) {
    teksPx(ctx, '2 x 2 x 3 x 3', x, 204, '#7dffa8', 6);
    teksPx(ctx, '= 36', x, 220, '#fffdf2', 8);
    lingkaran(ctx, x, 242, 10, '#ffd166');
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

  function gambarPapanDuaBelasPerDelapanBelas(x) {
    for (let i = 0; i < 18; i++) {
      const ux = x - 36 + (i % 6) * 12, uy = 196 + Math.floor(i / 6) * 15;
      P(ctx, ux, uy, 11, 14, i < 12 ? '#c98a4b' : '#f2ecd4');
      P(ctx, ux, uy, 11, 2, i < 12 ? '#e0a86b' : '#ffffff');
    }
    teksPx(ctx, '12/18', x, 244, '#fffdf2', 7);
  }

  function gambarPisauBagiEnam(x) {
    teksPx(ctx, '12 : 6 = 2', x, 196, '#ffd166', 6);
    teksPx(ctx, '18 : 6 = 3', x, 208, '#ffd166', 6);
    P(ctx, x - 16, 226, 26, 3, '#c9c9d4');
    P(ctx, x + 10, 224, 8, 7, '#5f4426');
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 30 + i * 22, 236, 20, 2, '#7dffa8');
      teksPx(ctx, '6', x - 20 + i * 22, 240, '#7dffa8', 5);
    }
  }

  function gambarKartuDuaPerTiga(x) {
    P(ctx, x - 18, 198, 36, 44, '#f2ecd4');
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

  function gambarPulauSeperempat(x) {
    P(ctx, x - 24, 210, 48, 26, '#8fbf9a');
    P(ctx, x - 24, 210, 48, 3, '#a8d8b0');
    for (let i = 0; i < 4; i++) P(ctx, x - 24 + i * 12, 216, 11, 18, i === 0 ? '#ffd166' : '#6f9e74');
    teksPx(ctx, '1/4', x, 188, '#ffe9a3', 7);
    teksPx(ctx, '4 KEPINGAN', x, 198, '#c8d8d0', 5);
  }

  function gambarPulauSeperenam(x) {
    P(ctx, x - 36, 210, 72, 26, '#8fbf9a');
    P(ctx, x - 36, 210, 72, 3, '#a8d8b0');
    for (let i = 0; i < 6; i++) P(ctx, x - 36 + i * 12, 216, 11, 18, i === 0 ? '#ffd166' : '#6f9e74');
    teksPx(ctx, '1/6', x, 188, '#ffe9a3', 7);
    teksPx(ctx, '6 KEPINGAN', x, 198, '#c8d8d0', 5);
  }

  function gambarTitianDuaBelas(x) {
    for (let i = 0; i < 12; i++) P(ctx, x - 42 + i * 7, 224, 6, 14, i < 3 ? '#ffd166' : (i < 5 ? '#ffb86b' : '#b8b0a0'));
    P(ctx, x - 44, 240, 88, 2, '#a29a8a');
    teksPx(ctx, 'TITIAN 12', x, 190, '#c8d8d0', 5);
    teksPx(ctx, '1/4 = 3/12', x, 200, '#ffe9a3', 5);
    teksPx(ctx, '1/6 = 2/12', x, 210, '#ffd9a3', 5);
  }

  function gambarPapanJumlahLimaPerDuaBelas(x) {
    papanLebar(x, ['3/12 + 2/12', '= 5/12'], 78);
    teksPx(ctx, 'PENYEBUT SAMA', x, 190, '#7dffa8', 5);
  }

  function gambarMejaKasusFaktor(x) {
    P(ctx, x - 30, 224, 60, 4, '#8a5f38');
    P(ctx, x - 24, 228, 4, 18, '#5f4426'); P(ctx, x + 20, 228, 4, 18, '#5f4426');
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 22 + i * 16, 210, 14, 14, '#f2ecd4');
      P(ctx, x - 22 + i * 16, 210, 14, 2, '#d8ccb0');
    }
    P(ctx, x + 28, 196, 2, 14, '#5f4426');
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
    lingkaran(ctx, x - 6 + goyang, 208, 12, '#a8d8f8');
    lingkaran(ctx, x - 6 + goyang, 208, 8, '#e8f4fc');
    lingkaran(ctx, x - 10 + goyang, 204, 2, '#ffffff');
    P(ctx, x + 2 + goyang, 217, 3, 12, '#5f4426');
    teksPx(ctx, '15: 1 3 5 15', x - 14, 232, '#7dffa8', 5);
    teksPx(ctx, '20 = 2 x 2 x 5', x + 10, 188, '#a8d8f8', 5);
  }

  function gambarGerbangKoprima(x) {
    P(ctx, x - 26, 200, 7, 46, '#7a5230');
    P(ctx, x + 19, 200, 7, 46, '#7a5230');
    P(ctx, x - 30, 192, 60, 8, '#8a5f38');
    teksPx(ctx, 'KOPRIMA', x, 182, '#ffd166', 6);
    lingkaran(ctx, x - 16, 222, 8, '#b8a888');
    teksPx(ctx, '8', x - 16, 218, '#5a4630', 7);
    lingkaran(ctx, x + 14, 222, 8, '#b8a888');
    teksPx(ctx, '9', x + 14, 218, '#5a4630', 7);
    teksPx(ctx, 'SAMA: 1', x, 240, '#7dffa8', 5);
  }

  function gambarSuratTersegelX(x, t) {
    P(ctx, x - 30, 206, 60, 36, '#f5ecd4');
    P(ctx, x - 30, 206, 60, 3, '#e3d6b4');
    P(ctx, x - 30, 209, 30, 15, '#efe2c0');
    P(ctx, x, 209, 30, 15, '#efe2c0');
    const naik = Math.sin(t * 3) * 1.5;
    lingkaran(ctx, x, 229, 7, '#c9564b');
    lingkaran(ctx, x, 229, 5, '#e0766a');
    teksPx(ctx, 'x', x, 224 + naik * 0.3, '#fffdf2', 7);
    teksPx(ctx, 'SURAT UNTUK x', x, 196, '#2f5a46', 5);
    P(ctx, x - 30, 244, 60, 2, '#8a6a44');
  }
  function gambarKotakKunciMisteri(x) {
    P(ctx, x - 26, 214, 52, 30, '#a3744a');
    P(ctx, x - 26, 214, 52, 5, '#c9985a');
    P(ctx, x - 26, 228, 52, 2, '#7a5230');
    teksPx(ctx, 'x', x, 219, '#5f4426', 8);
    P(ctx, x - 5, 228, 10, 8, '#ffd166');
    lingkaran(ctx, x - 2, 229, 2, '#c07d0c');
    lingkaran(ctx, x + 2, 229, 2, '#c07d0c');
    P(ctx, x + 34, 224, 4, 12, '#ffd166');
    lingkaran(ctx, x + 36, 220, 4, '#ffd166');
    lingkaran(ctx, x + 36, 220, 2, '#a3744a');
    teksPx(ctx, 'KOTAK MISTERI', x, 196, '#2f5a46', 5);
    P(ctx, x - 26, 244, 52, 2, '#8a6a44');
  }
  function gambarAmplopTerbukaEmpat(x, t) {
    P(ctx, x - 28, 216, 56, 26, '#f5ecd4');
    P(ctx, x - 28, 216, 56, 3, '#e3d6b4');
    P(ctx, x - 20, 204, 40, 14, '#efe2c0');
    const naik = Math.sin(t * 4) * 1.5;
    P(ctx, x - 9, 192 + naik, 18, 20, '#fffdf2');
    teksPx(ctx, '4', x, 196 + naik, '#2aa85e', 8);
    lingkaran(ctx, x - 16, 190, 1.5, '#ffd166');
    lingkaran(ctx, x + 16, 196, 1.5, '#ffd166');
    teksPx(ctx, 'x = 4', x, 246, '#2aa85e', 6);
  }
  function gambarPapanSuratKalimat(x) {
    papanLebar(x, ['x + 1 = 5', 'x = 4'], 52);
    P(ctx, x - 34, 230, 8, 12, '#f5ecd4');
    P(ctx, x + 26, 230, 8, 12, '#f5ecd4');
    lingkaran(ctx, x - 30, 233, 2, '#c9564b');
    lingkaran(ctx, x + 30, 233, 2, '#c9564b');
  }

  function gambarRakKantongDuaTiga(x) {
    P(ctx, x - 40, 210, 80, 4, '#8a5f38');
    P(ctx, x - 38, 214, 4, 30, '#5f4426');
    P(ctx, x + 34, 214, 4, 30, '#5f4426');
    for (let i = 0; i < 5; i++) {
      const kx = x - 34 + i * 15, merah = i < 2;
      P(ctx, kx, 190, 12, 20, merah ? '#c9564b' : '#e3b23c');
      P(ctx, kx + 3, 186, 6, 4, merah ? '#a3443c' : '#c2952e');
      teksPx(ctx, 'x', kx + 6, 196, '#fffdf2', 6);
    }
    teksPx(ctx, '2x', x - 26, 244, '#c9564b', 7);
    teksPx(ctx, '3x', x + 14, 244, '#c2952e', 7);
  }
  function gambarBarisanKantongLima(x) {
    for (let i = 0; i < 5; i++) {
      const kx = x - 38 + i * 16;
      P(ctx, kx, 214, 13, 22, i < 2 ? '#c9564b' : '#e3b23c');
      P(ctx, kx + 4, 210, 5, 4, '#8a5f38');
      teksPx(ctx, 'x', kx + 6, 221, '#fffdf2', 6);
    }
    P(ctx, x - 40, 240, 80, 2, '#2aa85e');
    teksPx(ctx, '5x', x, 244, '#2aa85e', 7);
    teksPx(ctx, '2x + 3x = 5x', x, 196, '#2aa85e', 6);
  }
  function gambarKeranjangApelJeruk(x) {
    P(ctx, x - 34, 224, 28, 6, '#8a5f38');
    P(ctx, x - 32, 230, 24, 14, '#a3744a');
    P(ctx, x + 6, 224, 28, 6, '#8a5f38');
    P(ctx, x + 8, 230, 24, 14, '#a3744a');
    lingkaran(ctx, x - 26, 222, 3, '#e05a4a');
    lingkaran(ctx, x - 18, 220, 3, '#e05a4a');
    lingkaran(ctx, x - 22, 225, 3, '#c94a3c');
    lingkaran(ctx, x + 14, 222, 3, '#ff9d4a');
    lingkaran(ctx, x + 22, 220, 3, '#ff9d4a');
    lingkaran(ctx, x + 18, 225, 3, '#e88a30');
    P(ctx, x - 1, 206, 3, 26, '#5f4426');
    P(ctx, x - 9, 206, 19, 8, '#1e2a44');
    teksPx(ctx, 'BEDA', x + 0.5, 207, '#fffdf2', 4);
    teksPx(ctx, '2a', x - 22, 184, '#e05a4a', 6);
    teksPx(ctx, '3b', x + 20, 184, '#e88a30', 6);
  }
  function gambarPapanSukuSejenis(x) {
    papanLebar(x, ['2x + 3x', '= 5x'], 48);
    P(ctx, x - 40, 236, 10, 10, '#c9564b');
    P(ctx, x + 30, 236, 10, 10, '#e3b23c');
  }

  function gambarPaletDuaKotak(x) {
    P(ctx, x - 26, 238, 52, 4, '#8a5f38');
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

  function gambarDuaPotKaca(x) {
    for (let p = 0; p < 2; p++) {
      const px = x - 24 + p * 34;
      P(ctx, px, 214, 22, 26, '#cfeee0');
      P(ctx, px, 214, 22, 3, '#eafaf2');
      P(ctx, px - 2, 238, 26, 5, '#9cc8b0');
      P(ctx, px + 9, 196, 3, 18, '#2aa85e');
      lingkaran(ctx, px + 10, 194, 4, '#5ee89b');
      lingkaran(ctx, px + 3, 202, 3, '#ffd166');
      lingkaran(ctx, px + 17, 202, 3, '#ffd166');
      lingkaran(ctx, px + 4, 208, 3, '#ffd166');
      teksPx(ctx, 'x+3', px + 11, 246, '#2f7a44', 5);
    }
  }
  function gambarIsianPotPertama(x) {
    P(ctx, x - 20, 212, 40, 28, '#cfeee0');
    P(ctx, x - 20, 238, 40, 5, '#9cc8b0');
    P(ctx, x - 4, 190, 3, 22, '#2aa85e');
    lingkaran(ctx, x - 2, 188, 4, '#5ee89b');
    teksPx(ctx, 'x', x + 10, 192, '#2aa85e', 7);
    for (let i = 0; i < 3; i++) lingkaran(ctx, x - 14 + i * 10, 230, 3, '#ffd166');
    teksPx(ctx, 'ISI SATU POT', x, 186, '#2f7a44', 5);
  }
  function gambarRakIsianSemua(x) {
    P(ctx, x - 38, 220, 76, 4, '#8a5f38');
    P(ctx, x - 36, 224, 4, 20, '#5f4426');
    P(ctx, x + 32, 224, 4, 20, '#5f4426');
    for (let i = 0; i < 2; i++) {
      const bx = x - 30 + i * 18;
      P(ctx, bx, 204, 12, 16, '#5ee89b');
      teksPx(ctx, 'x', bx + 6, 208, '#1e5a3c', 6);
    }
    for (let i = 0; i < 6; i++) lingkaran(ctx, x - 4 + (i % 3) * 9, 209 + Math.floor(i / 3) * 7, 3, '#ffd166');
    P(ctx, x - 17, 186, 34, 15, '#1e2a44');
    teksPx(ctx, '2x + 6', x, 190, '#7dffa8', 6);
    teksPx(ctx, 'SEMUA DI RAK', x, 244, '#1e5a3c', 5);
  }
  function gambarPapanKurungTerbuka(x) {
    papanLebar(x, ['2(x+3)', '= 2x + 6'], 62);
    lingkaran(ctx, x - 36, 214, 3, '#ffd166');
    lingkaran(ctx, x + 36, 220, 3, '#ffd166');
  }

  function gambarPapanSlotHuruf(x) {
    P(ctx, x - 26, 200, 52, 40, '#54647c');
    P(ctx, x - 26, 200, 52, 4, '#6a7a92');
    P(ctx, x - 18, 208, 36, 12, '#141d33');
    teksPx(ctx, '2x + 1', x, 210, '#7dffa8', 6);
    P(ctx, x - 8, 226, 16, 8, '#141d33');
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
    lingkaran(ctx, x - 20 - masuk, 230, 7, '#ffd166');
    lingkaran(ctx, x - 20 - masuk, 230, 5, '#ffe9a3');
    teksPx(ctx, '4', x - 20 - masuk, 226, '#a3742a', 7);
    teksPx(ctx, 'x = 4', x, 246, '#ffd166', 6);
  }
  function gambarRodaMesinHitung(x, t) {
    P(ctx, x - 26, 200, 52, 40, '#54647c');
    P(ctx, x - 18, 208, 36, 12, '#141d33');
    teksPx(ctx, '2 x 4 = 8', x, 210, '#7dffa8', 5);
    const putar = Math.floor(t * 2) % 4;
    lingkaran(ctx, x, 232, 8, '#3a465c');
    lingkaran(ctx, x, 232, 6, '#6a7a92');
    P(ctx, x - 1, 225 + putar, 2, 6, '#ffd166');
    teksPx(ctx, '8 + 1 = 9', x, 184, '#ffd166', 6);
  }
  function gambarStrukHasilSembilan(x) {
    P(ctx, x - 20, 198, 40, 34, '#fffdf2');
    P(ctx, x - 20, 198, 40, 3, '#e8e2d4');
    teksPx(ctx, '2x + 1', x, 204, '#2f5a74', 5);
    teksPx(ctx, '= 9', x, 214, '#2aa85e', 6);
    P(ctx, x - 8, 226, 16, 2, '#c9564b');
    P(ctx, x - 6, 232, 12, 2, '#c9564b');
    teksPx(ctx, 'x = 4', x, 240, '#2f5a74', 5);
    lingkaran(ctx, x + 26, 202, 3, '#ffd166');
  }

  function gambarRakKartuBerantakan(x) {
    P(ctx, x - 36, 238, 72, 4, '#8a5f38');
    P(ctx, x - 30, 226, 16, 10, '#c9564b');
    teksPx(ctx, '5x', x - 24, 228, '#fffdf2', 5);
    P(ctx, x - 8, 230, 12, 8, '#e3b23c');
    teksPx(ctx, '-2', x - 3, 231, '#5a4630', 5);
    P(ctx, x + 8, 222, 16, 12, '#3f8f6f');
    teksPx(ctx, '3x', x + 14, 224, '#fffdf2', 5);
    P(ctx, x + 26, 232, 10, 8, '#63c8ff');
    teksPx(ctx, '4', x + 29, 233, '#1c4a74', 5);
    P(ctx, x - 12, 210, 8, 10, '#e8e2d4');
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

  function gambarRakTigaRansel(x) {
    P(ctx, x - 40, 214, 80, 4, '#8a5f38');
    P(ctx, x - 38, 218, 4, 26, '#5f4426');
    P(ctx, x + 34, 218, 4, 26, '#5f4426');
    for (let i = 0; i < 3; i++) {
      const rx = x - 32 + i * 24;
      P(ctx, rx, 192, 18, 22, i === 1 ? '#3f8f6f' : '#63c8ff');
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
    P(ctx, x - 40, 236, 10, 10, '#63c8ff');
    lingkaran(ctx, x + 40, 240, 5, '#8a8070');
  }
  function gambarTendaBekalPenuh(x) {
    P(ctx, x - 28, 230, 56, 14, '#c9564b');
    P(ctx, x - 20, 216, 40, 14, '#d6665a');
    P(ctx, x - 12, 202, 24, 14, '#e0766a');
    P(ctx, x - 4, 226, 8, 18, '#5a3030');
    P(ctx, x - 30, 244, 60, 2, '#6f4a28');
    teksPx(ctx, '3x + 5', x, 190, '#fffdf2', 7);
    lingkaran(ctx, x + 38, 240, 4, '#ff9d4a');
    P(ctx, x + 34, 244, 10, 2, '#6f4a28');
  }

  function gambarPetakBungaA(x) {
    for (let i = 0; i < 2; i++) {
      const px = x - 26 + i * 30;
      P(ctx, px, 226, 24, 8, '#7a5c3a');
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

  function gambarMenaraLimaMisi(x) {
    P(ctx, x - 20, 186, 40, 58, '#3a4a6e');
    P(ctx, x - 24, 180, 48, 8, '#2e3c58');
    for (let i = 0; i < 5; i++) P(ctx, x - 14 + (i % 2) * 18, 192 + Math.floor(i / 2) * 14, 10, 9, '#ffd166');
    P(ctx, x - 6, 232, 12, 12, '#141d33');
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

  function gambarNeracaDagang(x, t) {
    const goyang = Math.sin(t * 2.2) * 1.2;
    P(ctx, x - 3, 216, 6, 28, '#6f4a28');
    P(ctx, x - 14, 242, 28, 4, '#8a5f38');
    P(ctx, x - 52 + goyang, 210, 104, 4, '#5f4426');
    P(ctx, x - 40 + goyang, 214, 24, 3, '#8a5f38');
    P(ctx, x + 16 - goyang, 214, 24, 3, '#8a5f38');
    P(ctx, x - 44 + goyang, 217, 32, 8, '#c9985a');
    P(ctx, x + 12 - goyang, 217, 32, 8, '#c9985a');
    P(ctx, x - 36 + goyang, 208, 12, 10, '#a3744a');
    teksPx(ctx, 'x', x - 30 + goyang, 210, '#fffdf2', 6);
    for (let i = 0; i < 3; i++) P(ctx, x - 22 + goyang + i * 7, 212, 5, 5, '#9aa6b8');
    for (let i = 0; i < 7; i++) P(ctx, x + 14 - goyang + i * 4.4, 212, 3.4, 5, '#b8c2d2');
    teksPx(ctx, 'x + 3', x - 22, 196, '#ffd166', 6);
    teksPx(ctx, '7', x + 28 - goyang, 196, '#d3dae6', 7);
  }
  function gambarIsiMangkukKiri(x, t) {
    const naik = Math.sin(t * 3) * 1.5;
    P(ctx, x - 22, 222, 44, 22, '#c9985a');
    P(ctx, x - 22, 222, 44, 3, '#e0b878');
    P(ctx, x - 16, 202 + naik, 20, 20, '#a3744a');
    P(ctx, x - 16, 202 + naik, 20, 3, '#c9985a');
    teksPx(ctx, 'x', x - 6, 208 + naik, '#ffd166', 8);
    for (let i = 0; i < 3; i++) {
      P(ctx, x + 8 + i * 8, 216, 6, 6, '#9aa6b8');
      P(ctx, x + 9 + i * 8, 214, 4, 2, '#b8c2d2');
    }
    teksPx(ctx, '1 KOTAK + 3 BEBAN', x, 192, '#8a5f38', 4);
    P(ctx, x - 22, 244, 44, 2, '#8a5f38');
  }
  function gambarMangkukTujuh(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 3);
    P(ctx, x - 34, 228, 68, 12, '#c9985a');
    P(ctx, x - 34, 228, 68, 3, '#e0b878');
    for (let i = 0; i < 7; i++) {
      const bx = x - 30 + i * 9, naik = (i % 2) * 4;
      P(ctx, bx, 218 - naik + denyut * 0.8, 7, 10 - naik * 0.4, i % 2 ? '#9aa6b8' : '#b8c2d2');
    }
    teksPx(ctx, '7 BEBAN', x, 196, '#ffd166', 6);
  }
  function gambarPapanKiriKanan(x) {
    papanLebar(x, ['KIRI = KANAN', 'x + 3 = 7'], 86);
    P(ctx, x - 40, 238, 8, 8, '#9aa6b8');
    P(ctx, x + 32, 238, 8, 8, '#9aa6b8');
  }

  function gambarTimbanganIkan(x, t) {
    const goyang = Math.sin(t * 2) * 1.2;
    P(ctx, x - 3, 218, 6, 26, '#6f4a28');
    P(ctx, x - 14, 242, 28, 4, '#8a5f38');
    P(ctx, x - 50 + goyang, 212, 100, 4, '#5f4426');
    P(ctx, x - 42 + goyang, 216, 34, 7, '#8a5f38');
    P(ctx, x + 12 - goyang, 216, 34, 7, '#8a5f38');
    P(ctx, x - 40 + goyang, 206, 12, 11, '#a3744a');
    teksPx(ctx, 'x', x - 34 + goyang, 208, '#ffd166', 6);
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 26 + goyang + i * 5.5, 210, 4.5, 3, '#7db8e8');
      P(ctx, x - 22.5 + goyang + i * 5.5, 210, 2, 3, '#5a90c0');
    }
    for (let i = 0; i < 7; i++) {
      P(ctx, x + 14 - goyang + i * 4.2, 211, 3.4, 3, '#7db8e8');
    }
    teksPx(ctx, 'x + 3', x - 22, 196, '#2f5a46', 6);
    teksPx(ctx, '7', x + 30 - goyang, 196, '#2f5a46', 7);
  }
  function gambarTigaIkanDiambil(x, t) {
    const goyang = Math.sin(t * 2.6) * 1.5;
    P(ctx, x - 38, 226, 30, 10, '#8a5f38');
    P(ctx, x + 8, 226, 30, 10, '#8a5f38');
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 32 + i * 9 + goyang, 240, 6, 3, '#7db8e8');
      P(ctx, x - 27 + i * 9 + goyang, 240, 2, 3, '#5a90c0');
    }
    for (let i = 0; i < 3; i++) {
      P(ctx, x + 14 + i * 9 - goyang, 240, 6, 3, '#7db8e8');
    }
    teksPx(ctx, 'KEDUA SISI -3', x, 196, '#2f5a46', 5);
    P(ctx, x - 30, 218, 3, 8, '#b8c2d2');
    P(ctx, x - 31, 224, 5, 2, '#b8c2d2');
    P(ctx, x + 28, 218, 3, 8, '#b8c2d2');
    P(ctx, x + 27, 224, 5, 2, '#b8c2d2');
  }
  function gambarKeranjangSendiri(x, t) {
    const bob = Math.sin(t * 2.4) * 1.5;
    P(ctx, x - 34, 228, 26, 12, '#8a5f38');
    P(ctx, x + 8, 228, 26, 12, '#8a5f38');
    P(ctx, x - 30, 216 + bob, 18, 14, '#a3744a');
    P(ctx, x - 30, 216 + bob, 18, 3, '#c9985a');
    teksPx(ctx, 'x', x - 21, 220 + bob, '#ffd166', 8);
    for (let i = 0; i < 4; i++) {
      P(ctx, x + 11 + i * 5.6, 221, 4.4, 3, '#7db8e8');
      P(ctx, x + 15 + i * 5.6, 221, 2, 3, '#5a90c0');
    }
    teksPx(ctx, 'x = 4', x, 196, '#2aa85e', 7);
    P(ctx, x - 36, 244, 72, 2, '#8a5f38');
  }
  function gambarPapanGeserRuas(x) {
    papanLebar(x, ['x + 3 = 7', 'x = 7 - 3 = 4'], 92);
    P(ctx, x - 42, 236, 10, 8, '#7db8e8');
    P(ctx, x - 39, 234, 4, 3, '#5a90c0');
  }

  function gambarDuaKandangTutup(x, t) {
    const bob = Math.sin(t * 2) * 1;
    P(ctx, x - 34, 212, 30, 32, '#a3744a');
    P(ctx, x - 40, 206, 42, 7, '#7a5230');
    P(ctx, x - 26, 226, 12, 18, '#6f4a28');
    P(ctx, x + 4, 212, 30, 32, '#a3744a');
    P(ctx, x - 2, 206, 42, 7, '#7a5230');
    P(ctx, x + 12, 226, 12, 18, '#6f4a28');
    teksPx(ctx, 'x', x - 19, 216 + bob, '#ffd166', 6);
    teksPx(ctx, 'x', x + 19, 216 + bob, '#ffd166', 6);
    teksPx(ctx, '2x = 10', x, 196, '#5f4426', 6);
    P(ctx, x - 40, 244, 80, 2, '#8a5f38');
  }
  function gambarSepuluhAyamHitung(x, t) {
    const goyang = Math.sin(t * 4) * 1;
    for (let i = 0; i < 5; i++) {
      const ay = x - 36 + i * 14;
      P(ctx, ay, 226 + goyang, 9, 8, '#fffdf2');
      P(ctx, ay + 6, 223 + goyang * 0.5, 4, 4, '#fffdf2');
      P(ctx, ay + 9, 224 + goyang * 0.5, 2, 1, '#e0766a');
      P(ctx, ay + 2, 234 + goyang, 1, 4, '#e3b23c');
      P(ctx, ay + 6, 234 + goyang, 1, 4, '#e3b23c');
    }
    for (let i = 0; i < 5; i++) {
      const ay = x + 6 + i * 14 - (i === 4 ? 4 : 0);
      P(ctx, ay, 226 + goyang * (i % 2), 9, 8, '#f2d8b8');
      P(ctx, ay + 6, 223 + goyang * (i % 2), 4, 4, '#f2d8b8');
      P(ctx, ay + 9, 224 + goyang * (i % 2), 2, 1, '#e0766a');
      P(ctx, ay + 2, 234 + goyang * (i % 2), 1, 4, '#e3b23c');
      P(ctx, ay + 6, 234 + goyang * (i % 2), 1, 4, '#e3b23c');
    }
    teksPx(ctx, '10 = 5 + 5', x, 196, '#5f4426', 6);
    P(ctx, x - 44, 244, 88, 2, '#8a5f38');
  }
  function gambarKandangDibukaLima(x, t) {
    const bob = Math.sin(t * 3) * 1;
    P(ctx, x - 26, 210, 52, 34, '#a3744a');
    P(ctx, x - 32, 204, 64, 7, '#7a5230');
    P(ctx, x - 26, 210, 52, 2, '#e3b23c');
    for (let i = 0; i < 5; i++) {
      const ay = x - 21 + i * 9;
      P(ctx, ay, 228 + (i % 2) * 2, 7, 6, '#fffdf2');
      P(ctx, ay + 5, 226 + (i % 2) * 2, 3, 3, '#fffdf2');
      P(ctx, ay + 7, 227 + (i % 2) * 2, 1.5, 1, '#e0766a');
    }
    teksPx(ctx, 'x = 5', x, 196 + bob * 0.4, '#2aa85e', 7);
    P(ctx, x - 32, 244, 64, 2, '#8a5f38');
  }
  function gambarPapanBagiDua(x) {
    papanLebar(x, ['2x = 10', 'x = 5'], 52);
    P(ctx, x - 38, 238, 9, 7, '#fffdf2');
    P(ctx, x - 34, 236, 3, 3, '#fffdf2');
  }

  function gambarNampanDuaTiga(x, t) {
    const wangi = Math.sin(t * 2) * 1;
    P(ctx, x - 38, 232, 26, 6, '#c9985a');
    P(ctx, x - 34, 222, 18, 10, '#e3b23c');
    P(ctx, x + 12, 232, 26, 6, '#c9985a');
    P(ctx, x + 16, 222, 18, 10, '#e3b23c');
    teksPx(ctx, 'x', x - 25, 224, '#5f4426', 6);
    teksPx(ctx, 'x', x + 25, 224, '#5f4426', 6);
    P(ctx, x - 8, 240, 18, 4, '#f5ecd4');
    for (let i = 0; i < 3; i++) P(ctx, x - 6 + i * 6, 236, 5, 4, '#d9a054');
    lingkaran(ctx, x - 10, 214 + wangi, 1.5, '#f8ecd4');
    lingkaran(ctx, x - 6, 208 + wangi, 1.5, '#f2e2c8');
    teksPx(ctx, '2x + 3 = 11', x, 196, '#8a5f38', 6);
    P(ctx, x - 40, 244, 80, 2, '#8a5f38');
  }
  function gambarPiringTigaDipindah(x, t) {
    const goyang = Math.sin(t * 2.4) * 1;
    P(ctx, x - 26, 214, 52, 5, '#8a5f38');
    P(ctx, x - 22, 219, 4, 24, '#6f4a28');
    P(ctx, x + 18, 219, 4, 24, '#6f4a28');
    P(ctx, x - 8 - goyang, 236, 16, 4, '#f5ecd4');
    for (let i = 0; i < 3; i++) P(ctx, x - 6 - goyang + i * 6, 232, 5, 4, '#d9a054');
    P(ctx, x - 6, 206, 14, 5, '#e3b23c');
    teksPx(ctx, '11 - 3 = 8', x, 196, '#8a5f38', 6);
    P(ctx, x - 34, 244, 68, 2, '#8a5f38');
  }
  function gambarNampanDibagiDua(x, t) {
    const bob = Math.sin(t * 2.2) * 1;
    P(ctx, x - 36, 232, 30, 6, '#c9985a');
    P(ctx, x + 6, 232, 30, 6, '#c9985a');
    for (let g = 0; g < 2; g++) {
      for (let i = 0; i < 4; i++) {
        P(ctx, x - 32 + g * 42 + i * 7, 224 + bob * 0.5, 6, 5, '#e3b23c');
        P(ctx, x - 32 + g * 42 + i * 7, 223 + bob * 0.5, 6, 1, '#f2ca6e');
      }
    }
    teksPx(ctx, 'x = 4', x, 196, '#2aa85e', 7);
    P(ctx, x - 40, 244, 80, 2, '#8a5f38');
  }
  function gambarPapanDuaLangkah(x) {
    papanLebar(x, ['2x + 3 = 11', 'x = 4'], 80);
    P(ctx, x - 38, 236, 7, 5, '#e3b23c');
    P(ctx, x + 31, 236, 7, 5, '#e3b23c');
  }

  function gambarJungkatKantong(x, t) {
    const goyang = Math.sin(t * 2) * 1;
    P(ctx, x - 3, 224, 6, 20, '#6f4a28');
    P(ctx, x - 18, 242, 36, 4, '#8a5f38');
    P(ctx, x - 48 + goyang, 216, 96, 4, '#5f4426');
    P(ctx, x - 42 + goyang, 204, 10, 12, '#c9564b');
    P(ctx, x - 30 + goyang, 206, 10, 10, '#c9564b');
    P(ctx, x - 20 + goyang, 208, 10, 8, '#c9564b');
    P(ctx, x - 38 + goyang, 200, 5, 5, '#9aa6b8');
    P(ctx, x - 31 + goyang, 202, 5, 5, '#9aa6b8');
    P(ctx, x + 30 + goyang, 206, 10, 11, '#e3b23c');
    teksPx(ctx, 'x', x + 35 + goyang, 208, '#5f4426', 5);
    for (let i = 0; i < 5; i++) P(ctx, x + 12 + goyang + i * 3.6, 208, 3.2, 5, '#9aa6b8');
    for (let i = 0; i < 5; i++) P(ctx, x + 30 + goyang + i * 3.2, 200, 3, 5, '#9aa6b8');
    teksPx(ctx, '3x + 2', x - 22, 194, '#c9564b', 5);
    teksPx(ctx, 'x + 10', x + 32, 194, '#c2952e', 5);
  }
  function gambarSatuKantongDiambil(x, t) {
    const turun = Math.sin(t * 2.6) * 2;
    P(ctx, x - 40, 218, 22, 12, '#8a5f38');
    P(ctx, x + 18, 218, 22, 12, '#8a5f38');
    P(ctx, x - 36, 206, 10, 12, '#c9564b');
    P(ctx, x - 24, 208, 10, 10, '#c9564b');
    P(ctx, x + 22, 206, 10, 12, '#e3b23c');
    teksPx(ctx, '2x + 2', x - 28, 196, '#c9564b', 5);
    teksPx(ctx, '10', x + 28, 196, '#c2952e', 6);
    P(ctx, x - 8, 228 + turun, 16, 12, '#a3744a');
    P(ctx, x - 8, 228 + turun, 16, 3, '#c9985a');
    teksPx(ctx, 'x', x, 232 + turun, '#fffdf2', 6);
    P(ctx, x - 40, 244, 80, 2, '#8a5f38');
  }
  function gambarDuaBatuDiambil(x, t) {
    const bob = Math.sin(t * 2) * 1;
    P(ctx, x - 30, 226, 22, 12, '#8a5f38');
    P(ctx, x + 8, 226, 22, 12, '#8a5f38');
    P(ctx, x - 26, 214 + bob, 10, 12, '#c9564b');
    P(ctx, x - 14, 216 + bob, 10, 10, '#c9564b');
    for (let i = 0; i < 4; i++) P(ctx, x + 11 + i * 5, 218 + bob * 0.5, 4, 6, '#9aa6b8');
    for (let i = 0; i < 4; i++) P(ctx, x + 11 + i * 5, 212 + bob * 0.5, 4, 5, '#9aa6b8');
    P(ctx, x - 4, 240, 4, 4, '#9aa6b8');
    P(ctx, x + 2, 240, 4, 4, '#b8c2d2');
    teksPx(ctx, '2x = 8', x, 184 + bob * 0.4, '#2aa85e', 7);
    P(ctx, x - 34, 244, 68, 2, '#8a5f38');
  }
  function gambarPapanKumpulkanX(x) {
    papanLebar(x, ['3x + 2 = x + 10', 'x = 4'], 106);
    P(ctx, x - 44, 238, 6, 6, '#c9564b');
    P(ctx, x + 38, 238, 6, 6, '#e3b23c');
  }

  function gambarLembarJawaban(x, t) {
    const bob = Math.sin(t * 2) * 1;
    P(ctx, x - 29, 206 + bob, 58, 36, '#f5ecd4');
    P(ctx, x - 29, 206 + bob, 58, 3, '#e3d6b4');
    teksPx(ctx, '2x + 3 = 11', x, 214 + bob, '#2a3757', 5);
    teksPx(ctx, 'x = 4', x, 228 + bob, '#2aa85e', 6);
    P(ctx, x - 21, 238 + bob, 42, 2, '#d8ccb0');
    teksPx(ctx, 'LEMBAR JAWABAN', x, 196, '#ffe9a3', 4);
  }
  function gambarLampuPeriksaKiri(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 3);
    P(ctx, x + 26, 200, 5, 24, '#8a5f38');
    P(ctx, x + 14, 194, 28, 8, '#5f4426');
    lingkaran(ctx, x + 20, 204, 4, '#ffe9a3');
    lingkaran(ctx, x + 20, 204, 6 + denyut * 2, 'rgba(255,233,163,0.25)');
    P(ctx, x - 23, 226, 46, 22, '#f5ecd4');
    teksPx(ctx, '2 x 4 + 3', x, 233, '#2a3757', 5);
    teksPx(ctx, '= 11', x, 242, '#2aa85e', 5);
    teksPx(ctx, 'SISI KIRI', x, 196, '#ffe9a3', 5);
  }
  function gambarLampuPeriksaKanan(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 3 + 1);
    P(ctx, x + 26, 200, 5, 24, '#8a5f38');
    P(ctx, x + 14, 194, 28, 8, '#5f4426');
    lingkaran(ctx, x + 20, 204, 4, '#ffe9a3');
    lingkaran(ctx, x + 20, 204, 6 + denyut * 2, 'rgba(255,233,163,0.25)');
    P(ctx, x - 23, 226, 46, 22, '#f5ecd4');
    teksPx(ctx, '11 = 11', x, 233, '#2a3757', 5);
    teksPx(ctx, 'SAMA', x, 242, '#2aa85e', 5);
    teksPx(ctx, 'KANAN JUGA 11', x, 184, '#ffe9a3', 4);
  }
  function gambarStempelSahih(x, t) {
    const tekan = Math.sin(t * 2.4) > 0.6 ? 2 : 0;
    P(ctx, x - 22, 214 + tekan, 44, 24, '#f5ecd4');
    P(ctx, x - 22, 214 + tekan, 44, 3, '#e3d6b4');
    P(ctx, x - 8, 200 + tekan, 28, 16, '#2aa85e');
    P(ctx, x - 4, 216 + tekan, 20, 4, '#1d7a45');
    teksPx(ctx, 'SAHIH', x + 6, 204 + tekan, '#fffdf2', 5);
    teksPx(ctx, 'STEMPEL HIJAU', x, 192, '#7dffa8', 4);
    lingkaran(ctx, x - 14, 224 + tekan, 2, '#2aa85e');
    lingkaran(ctx, x - 14, 232 + tekan, 2, '#7dffa8');
  }

  function gambarPapanMulutTanda(x, t) {
    const bob = Math.sin(t * 2) * 1;
    P(ctx, x - 26, 206 + bob, 52, 30, '#1e2a44');
    P(ctx, x - 26, 206 + bob, 52, 3, '#37476f');
    P(ctx, x - 4, 236 + bob, 3, 10, '#7a5230');
    P(ctx, x + 8, 236 + bob, 3, 10, '#7a5230');
    teksPx(ctx, '>', x - 10, 214 + bob, '#ffd166', 12);
    teksPx(ctx, '<', x + 10, 214 + bob, '#ffd166', 12);
    teksPx(ctx, 'RAHANG JUJUR', x, 196, '#1e2a44', 4);
  }
  function gambarBuayaTandaLima(x, t) {
    P(ctx, x - 24, 216, 48, 26, '#f5ecd4');
    P(ctx, x - 24, 216, 48, 3, '#e3d6b4');
    teksPx(ctx, '5', x - 14, 222, '#c9564b', 9);
    teksPx(ctx, '>', x - 2, 219, '#2a3757', 12);
    teksPx(ctx, '3', x + 10, 222, '#1c6fb4', 9);
    teksPx(ctx, '5 > 3', x, 206, '#1e2a44', 6);
    P(ctx, x - 26, 244, 52, 2, '#8a5f38');
  }
  function gambarBuayaTandaDua(x, t) {
    P(ctx, x - 24, 216, 48, 26, '#f5ecd4');
    P(ctx, x - 24, 216, 48, 3, '#e3d6b4');
    teksPx(ctx, '2', x - 14, 224, '#1c6fb4', 9);
    teksPx(ctx, '<', x + 2, 219, '#2a3757', 12);
    teksPx(ctx, '3', x + 12, 222, '#c9564b', 9);
    teksPx(ctx, '2 < 3', x, 206, '#1e2a44', 6);
    P(ctx, x - 26, 244, 52, 2, '#8a5f38');
  }
  function gambarXLebihTigaKumpul(x, t) {
    const bob = Math.sin(t * 2.2) * 1.5;
    P(ctx, x - 30, 222, 60, 4, '#b8c2d2');
    P(ctx, x - 12, 219, 3, 10, '#b8c2d2');
    lingkaran(ctx, x - 10.5, 214, 4, '#1e2a44');
    lingkaran(ctx, x - 10.5, 214, 4, '#1e2a44');
    for (let i = 0; i < 3; i++) {
      const lx = x - 2 + i * 10;
      lingkaran(ctx, lx, 220 + bob * (i % 2), 3, '#ffd166');
      teksPx(ctx, String(4 + i), lx, 230, '#fffdf2', 4);
    }
    P(ctx, x + 32, 217, 8, 3, '#ffd166');
    P(ctx, x + 36, 215, 4, 2, '#ffd166');
    P(ctx, x + 36, 220, 4, 2, '#ffd166');
    teksPx(ctx, 'x > 3', x, 196, '#2aa85e', 7);
    P(ctx, x - 34, 244, 68, 2, '#8a5f38');
  }

  function gambarGarisLampuTitik(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 2.6);
    P(ctx, x - 42, 226, 84, 3, '#3a4a6e');
    for (let i = 0; i < 8; i++) {
      const lx = x - 38 + i * 10.5;
      const nyala = i >= 4 ? 0.4 + denyut * 0.6 : 0.85;
      ctx.globalAlpha = nyala;
      lingkaran(ctx, lx, 222, 2.5, i >= 4 ? '#ffd166' : '#a8b8d8');
      ctx.globalAlpha = 1;
      teksPx(ctx, i === 0 ? '-1' : String(i - 1), lx, 230, '#a8b8d8', 4);
    }
    teksPx(ctx, 'GARIS LAMPU', x, 196, '#ffe9a3', 5);
    P(ctx, x - 44, 244, 88, 2, '#2e3c58');
  }
  function gambarTiangTigaLubang(x, t) {
    const bob = Math.sin(t * 2) * 1;
    P(ctx, x - 40, 228, 80, 3, '#3a4a6e');
    P(ctx, x - 2, 200 + bob, 4, 28, '#8a5f38');
    lingkaran(ctx, x, 194 + bob, 6, '#1e2a44');
    lingkaran(ctx, x, 194 + bob, 6, '#1e2a44');
    lingkaran(ctx, x, 194 + bob, 3, '#243252');
    teksPx(ctx, '3', x, 232, '#ffe9a3', 6);
    teksPx(ctx, '3 TIDAK IKUT', x, 182 + bob * 0.4, '#ffe9a3', 4);
    P(ctx, x - 44, 244, 88, 2, '#2e3c58');
  }
  function gambarPanahMenyalaKanan(x, t) {
    const gelombang = Math.sin(t * 3);
    P(ctx, x - 42, 230, 84, 3, '#3a4a6e');
    lingkaran(ctx, x - 30, 226, 4, '#1e2a44');
    lingkaran(ctx, x - 30, 226, 4, '#1e2a44');
    teksPx(ctx, '3', x - 30, 236, '#a8b8d8', 5);
    for (let i = 0; i < 5; i++) {
      const lx = x - 20 + i * 10;
      const naik = Math.sin(t * 4 + i) * 1.5;
      ctx.globalAlpha = 0.75 + 0.25 * Math.sin(t * 5 + i * 2);
      lingkaran(ctx, lx, 224 + naik, 3, '#ffd166');
      ctx.globalAlpha = 1;
      teksPx(ctx, String(4 + i), lx, 236, '#ffe9a3', 4);
    }
    P(ctx, x + 32, 223, 10, 3, '#ffd166');
    P(ctx, x + 40, 221, 4, 2, '#ffe9a3');
    P(ctx, x + 40, 226, 4, 2, '#ffe9a3');
    teksPx(ctx, 'x > 3', x - 2, 184, '#ffd166', 7);
    P(ctx, x - 44, 244, 88, 2, '#2e3c58');
  }
  function gambarPapanBanyakJawaban(x) {
    papanLebar(x, ['CINCIN TERBUKA', 'PANAH KANAN'], 100);
    lingkaran(ctx, x - 42, 240, 3, '#1e2a44');
    lingkaran(ctx, x - 42, 240, 3, '#1e2a44');
    P(ctx, x + 36, 239, 8, 2, '#ffd166');
  }

  function gambarGelasDuaSatuBatu(x, t) {
    const kilap = Math.sin(t * 3) * 1;
    P(ctx, x - 32, 210, 20, 34, '#d8f0fa');
    P(ctx, x - 30, 216, 16, 4, '#9ad4f0');
    P(ctx, x - 27, 222, 5, 5, '#e8f8fc');
    P(ctx, x - 20, 224, 5, 5, '#e8f8fc');
    P(ctx, x - 4, 210, 20, 34, '#d8f0fa');
    P(ctx, x - 2, 216, 16, 4, '#9ad4f0');
    P(ctx, x + 1, 222, 5, 5, '#e8f8fc');
    P(ctx, x + 8, 224, 5, 5, '#e8f8fc');
    P(ctx, x + 18, 244, 8, 6, '#e8f8fc');
    P(ctx, x + 12, 250, 18, 2, '#c9985a');
    teksPx(ctx, 'x', x - 22, 228 + kilap * 0.3, '#5a90c0', 5);
    teksPx(ctx, 'x', x + 6, 228 + kilap * 0.3, '#5a90c0', 5);
    teksPx(ctx, '2x + 1 < 9', x, 196, '#2f5a46', 6);
    P(ctx, x - 36, 244, 72, 2, '#8a5f38');
  }
  function gambarPapanKurangSembilan(x, t) {
    const bob = Math.sin(t * 2) * 1;
    P(ctx, x - 24, 208 + bob, 48, 30, '#1e2a44');
    P(ctx, x - 24, 208 + bob, 48, 3, '#37476f');
    P(ctx, x - 2, 238 + bob, 3, 8, '#7a5230');
    P(ctx, x + 10, 238 + bob, 3, 8, '#7a5230');
    teksPx(ctx, '< 9', x, 218 + bob, '#ffd166', 10);
    teksPx(ctx, 'BATAS KIOS', x, 194, '#2f5a46', 4);
  }
  function gambarEsBatuDiambil(x, t) {
    const bob = Math.sin(t * 2.4) * 1;
    P(ctx, x - 34, 218, 22, 28, '#d8f0fa');
    P(ctx, x + 12, 218, 22, 28, '#d8f0fa');
    P(ctx, x - 30, 226 + bob, 6, 6, '#e8f8fc');
    P(ctx, x + 18, 226 + bob, 6, 6, '#e8f8fc');
    P(ctx, x - 4, 240, 6, 6, '#e8f8fc');
    P(ctx, x + 4, 240, 5, 5, '#d8f0fa');
    teksPx(ctx, '2x < 8', x, 184 + bob * 0.4, '#2aa85e', 7);
    P(ctx, x - 38, 244, 76, 2, '#8a5f38');
  }
  function gambarPapanXKurangEmpat(x) {
    papanLebar(x, ['2x < 8', 'x < 4'], 48);
    P(ctx, x - 40, 240, 6, 6, '#e8f8fc');
    P(ctx, x + 34, 240, 6, 6, '#e8f8fc');
  }

  function gambarBalaiLimaMisi(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 2.4);
    P(ctx, x - 34, 196, 68, 50, '#2a3858');
    P(ctx, x - 40, 188, 80, 10, '#222e4c');
    for (let i = 0; i < 5; i++) {
      const lx = x - 28 + i * 14;
      ctx.globalAlpha = 0.7 + 0.3 * Math.sin(t * 3 + i);
      P(ctx, lx, 206, 8, 12, '#ffd166');
      ctx.globalAlpha = 1;
      P(ctx, lx + 2, 218, 4, 4, '#8a5f38');
    }
    lingkaran(ctx, x, 232, 6 + denyut * 2, 'rgba(255,209,102,0.3)');
    lingkaran(ctx, x, 232, 5, '#ffd166');
    P(ctx, x - 1, 238, 2, 8, '#ffd166');
    teksPx(ctx, 'LIMA MISI', x, 180, '#ffe9a3', 5);
    P(ctx, x - 38, 244, 76, 2, '#1e2a44');
  }
  function gambarMisiPersamaanDua(x, t) {
    const bob = Math.sin(t * 2) * 1;
    P(ctx, x - 30, 208 + bob, 60, 34, '#1e2a44');
    P(ctx, x - 30, 208 + bob, 60, 3, '#37476f');
    P(ctx, x - 2, 242 + bob, 3, 6, '#7a5230');
    teksPx(ctx, '4x = 12', x, 216 + bob, '#ffe9a3', 5);
    teksPx(ctx, 'x = 3', x, 228 + bob, '#7dffa8', 5);
    teksPx(ctx, '2x + 5 = 11', x, 238 + bob, '#ffe9a3', 4);
    teksPx(ctx, 'DUA LENTERA', x, 192, '#ffe9a3', 4);
    lingkaran(ctx, x - 38, 212 + bob, 2.5, '#ffd166');
    lingkaran(ctx, x + 38, 212 + bob, 2.5, '#ffd166');
  }
  function gambarMisiDuaSisi(x, t) {
    const bob = Math.sin(t * 2.2) * 1;
    P(ctx, x - 34, 210 + bob, 68, 34, '#1e2a44');
    P(ctx, x - 34, 210 + bob, 68, 3, '#37476f');
    P(ctx, x - 3, 244 + bob, 3, 4, '#7a5230');
    teksPx(ctx, '5x + 2 = 2x + 14', x, 218 + bob, '#ffe9a3', 4);
    teksPx(ctx, 'x = 4', x, 230 + bob, '#7dffa8', 6);
    teksPx(ctx, '22 = 22', x, 240 + bob, '#ffd166', 4);
    teksPx(ctx, 'SEIMBANG', x, 194, '#7dffa8', 4);
  }
  function gambarMisiPertidaksamaan(x) {
    papanLebar(x, ['x > 4', 'x < 4'], 52);
    P(ctx, x - 44, 226, 20, 3, '#3a4a6e');
    lingkaran(ctx, x - 38, 222, 3, '#1e2a44');
    lingkaran(ctx, x - 38, 222, 3, '#1e2a44');
    P(ctx, x - 34, 221, 8, 2, '#ffd166');
    P(ctx, x + 24, 226, 20, 3, '#3a4a6e');
    lingkaran(ctx, x + 38, 222, 3, '#1e2a44');
    lingkaran(ctx, x + 38, 222, 3, '#1e2a44');
    P(ctx, x + 24, 221, 8, 2, '#ffd166');
    teksPx(ctx, 'RAHANG MENYALA', x, 194, '#ffe9a3', 4);
  }

  function gambarGelasManggaDua(x, t) {
    const bob = Math.sin(t * 2.4) * 1;
    P(ctx, x - 40, 240, 80, 4, '#8a5f38');
    for (let i = 0; i < 2; i++) {
      const gx = x - 32 + i * 16;
      P(ctx, gx, 218 + bob * (i ? 1 : 0), 12, 22, '#ffb86b');
      P(ctx, gx, 218 + bob * (i ? 1 : 0), 12, 3, '#ffd9a3');
    }
    for (let i = 0; i < 3; i++) {
      const gx = x + 4 + i * 15;
      P(ctx, gx, 218 - bob * (i ? 1 : 0), 11, 22, '#a8d8f0');
      P(ctx, gx, 218 - bob * (i ? 1 : 0), 11, 3, '#d4ecfa');
    }
    teksPx(ctx, '2 : 3', x, 196, '#8a4f28', 7);
  }
  function gambarPapanDuaTiga(x) {
    papanLebar(x, ['2 : 3', 'DUA BANDING TIGA'], 112);
    P(ctx, x - 60, 238, 10, 8, '#ffb86b');
    P(ctx, x + 50, 238, 10, 8, '#a8d8f0');
  }
  function gambarJusKebalik(x, t) {
    const goyang = Math.sin(t * 5) * 1.5;
    P(ctx, x - 40, 240, 80, 4, '#8a5f38');
    P(ctx, x - 30, 214 + goyang, 22, 26, '#e07636');
    P(ctx, x - 30, 214 + goyang, 22, 3, '#f0975a');
    teksPx(ctx, '3 : 2', x - 19, 240 - 8, '#fffdf2', 5);
    P(ctx, x + 8, 214, 22, 26, '#cfe4f0');
    teksPx(ctx, 'PEKAT!', x + 19, 196, '#c85a28', 6);
    P(ctx, x + 2, 200, 3, 8, '#c85a28');
    P(ctx, x + 2, 209, 3, 2, '#c85a28');
  }
  function gambarPapanUrutanRasio(x) {
    papanLebar(x, ['MANGGA DULU', 'AIR BELAKANG'], 90);
    lingkaran(ctx, x - 50, 234, 5, '#ffb86b');
    lingkaran(ctx, x + 50, 234, 5, '#a8d8f0');
  }

  function gambarMejaPetaGulung(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 2.2);
    P(ctx, x - 36, 230, 72, 12, '#8a5f38');
    P(ctx, x - 40, 242, 8, 6, '#6f4a28');
    P(ctx, x + 32, 242, 8, 6, '#6f4a28');
    P(ctx, x - 28, 220, 56, 10, '#f5ecd4');
    P(ctx, x - 28, 220, 56, 2, '#d8d0b8');
    P(ctx, x - 22, 224, 20, 2, '#7db8e8');
    P(ctx, x - 6, 222, 26, 2, '#c9b07c');
    teksPx(ctx, '1 : 1000', x + 4, 232, '#5f4426', 4);
    lingkaran(ctx, x, 208, 6 + denyut * 2, 'rgba(255,209,102,0.25)');
    teksPx(ctx, 'PETA HUTAN', x, 196, '#5f4426', 4);
  }
  function gambarJengkalTunggal(x, t) {
    const naik = Math.sin(t * 2) * 1;
    P(ctx, x - 42, 232, 20, 4, '#8a5f38');
    P(ctx, x - 42, 228, 3, 8, '#a3744a');
    P(ctx, x - 23, 228, 3, 8, '#a3744a');
    teksPx(ctx, '1', x - 32, 220 + naik, '#5f4426', 6);
    P(ctx, x - 6, 232, 72, 4, '#8a5f38');
    for (let i = 0; i < 8; i++) P(ctx, x - 4 + i * 9, 237, 5, 2, '#a3744a');
    teksPx(ctx, '1000', x + 30, 220 - naik, '#2f5a46', 7);
    P(ctx, x - 8, 226, 3, 6, '#b8c2d2');
    P(ctx, x - 5, 228, 3, 4, '#b8c2d2');
    teksPx(ctx, 'SATU JENGKAL', x, 196, '#5f4426', 4);
  }
  function gambarTigaJengkalJalan(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 3);
    for (let i = 0; i < 3; i++) P(ctx, x - 36 + i * 10, 228, 8, 6, '#f5ecd4');
    teksPx(ctx, '3', x - 21, 216, '#5f4426', 7);
    P(ctx, x - 10, 230, 4, 4, '#b8c2d2');
    P(ctx, x - 8, 232, 4, 4, '#b8c2d2');
    P(ctx, x - 6, 230, 4, 4, '#b8c2d2');
    for (let i = 0; i < 10; i++) P(ctx, x + 0 + i * 7, 230, 5, 4, i % 2 ? '#8a5f38' : '#a3744a');
    teksPx(ctx, '3000', x + 34, 218 + denyut * 1.5, '#2f5a46', 7);
    teksPx(ctx, 'KALI 1000', x, 196, '#2f5a46', 5);
  }
  function gambarPapanSkalaSeribu(x) {
    papanLebar(x, ['SKALA', '1 : 1000'], 62);
    P(ctx, x - 38, 234, 12, 4, '#f5ecd4');
    P(ctx, x + 28, 234, 16, 4, '#8a5f38');
  }

  function gambarKantongEnamPermen(x, t) {
    const bob = Math.sin(t * 2.2) * 1;
    P(ctx, x - 20, 218 + bob, 40, 24, '#e8c890');
    P(ctx, x - 24, 212 + bob, 48, 8, '#d8b878');
    P(ctx, x - 20, 242, 40, 3, '#b89858');
    for (let i = 0; i < 6; i++) {
      const px = x - 15 + (i % 3) * 11, py = 224 + Math.floor(i / 3) * 9;
      lingkaran(ctx, px + 3, py + 3, 3.5, ['#e05a6a', '#ffb86b', '#7db8e8', '#7de89b', '#e8a0d8', '#ffd166'][i]);
    }
    teksPx(ctx, '6 PERMEN', x, 196, '#8a4f28', 5);
  }
  function gambarNotaTigaRibu(x, t) {
    const naik = Math.sin(t * 2.6) * 1.2;
    P(ctx, x - 20, 212 + naik, 40, 30, '#fffdf2');
    P(ctx, x - 20, 212 + naik, 40, 3, '#e8e2d2');
    P(ctx, x - 14, 222 + naik, 28, 2, '#b8b09a');
    P(ctx, x - 14, 228 + naik, 28, 2, '#b8b09a');
    teksPx(ctx, '3000 : 6', x, 234 + naik, '#5f4426', 5);
    teksPx(ctx, 'TOTAL DIBAGI', x, 196, '#8a4f28', 4);
    lingkaran(ctx, x + 30, 240, 4, '#ffd166');
    teksPx(ctx, '=', x + 30, 226, '#5f4426', 6);
  }
  function gambarPermenLimaRatus(x, t) {
    const putar = Math.sin(t * 3) * 1;
    lingkaran(ctx, x - 14, 228 + putar, 8, '#e05a6a');
    lingkaran(ctx, x - 14, 228 + putar, 5, '#f08f9a');
    teksPx(ctx, '1', x - 14, 212, '#8a4f28', 6);
    lingkaran(ctx, x + 14, 228 - putar, 7, '#ffd166');
    lingkaran(ctx, x + 14, 228 - putar, 4.5, '#ffe9a3');
    teksPx(ctx, '500', x + 14, 212, '#8a4f28', 6);
    teksPx(ctx, 'SATU KEPING', x, 196, '#8a4f28', 4);
    P(ctx, x - 36, 244, 72, 2, '#d8b878');
  }
  function gambarPapanDuaKios(x) {
    papanLebar(x, ['A: 500', 'B: 600'], 56);
    lingkaran(ctx, x - 46, 236, 4, '#e05a6a');
    lingkaran(ctx, x + 46, 236, 4, '#9aa6b8');
    teksPx(ctx, 'HEMAT', x - 46, 222, '#2aa85e', 4);
    teksPx(ctx, 'MAHAL', x + 46, 222, '#c85a28', 4);
  }

  function gambarKartuResepDuaTiga(x, t) {
    const bob = Math.sin(t * 2) * 1;
    P(ctx, x - 26, 212 + bob, 52, 32, '#fffdf2');
    P(ctx, x - 26, 212 + bob, 52, 3, '#ffd166');
    teksPx(ctx, '2 : 3', x, 222 + bob, '#5f4426', 8);
    P(ctx, x - 20, 234 + bob, 12, 4, '#e8e2d2');
    P(ctx, x - 4, 234 + bob, 20, 4, '#e8e2d2');
    teksPx(ctx, 'GULA : TEPUNG', x, 196, '#ffd166', 4);
    P(ctx, x - 4, 244, 8, 2, '#4a3520');
  }
  function gambarMangkokGandaEmpat(x, t) {
    const bob = Math.sin(t * 2.4) * 1;
    P(ctx, x - 42, 240, 84, 4, '#4a3520');
    P(ctx, x - 36, 224 + bob, 32, 12, '#e8e2d2');
    for (let i = 0; i < 4; i++) lingkaran(ctx, x - 31 + i * 8, 220 + bob, 3.5, '#fffdf2');
    teksPx(ctx, '4', x - 20, 208 + bob, '#ffd166', 7);
    P(ctx, x + 6, 224 - bob, 36, 12, '#e8e2d2');
    for (let i = 0; i < 6; i++) lingkaran(ctx, x + 10 + i * 6, 220 - bob, 3, '#f0e8d0');
    teksPx(ctx, '6', x + 24, 208 - bob, '#ffd166', 7);
    teksPx(ctx, '4 : 6', x, 196, '#ffe9a3', 7);
  }
  function gambarDuaKueSamaRasa(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 3);
    P(ctx, x - 42, 240, 84, 4, '#4a3520');
    P(ctx, x - 34, 228, 30, 12, '#f0c890');
    P(ctx, x - 34, 224, 30, 5, '#f8e8d0');
    P(ctx, x - 21, 216, 3, 9, '#e05a6a');
    ctx.globalAlpha = 0.5 + denyut * 0.5;
    P(ctx, x - 21, 212, 3, 4, '#ffd166');
    ctx.globalAlpha = 1;
    P(ctx, x + 6, 216, 36, 24, '#f0c890');
    P(ctx, x + 6, 212, 36, 5, '#f8e8d0');
    P(ctx, x + 22, 204, 3, 9, '#e05a6a');
    ctx.globalAlpha = 0.5 + denyut * 0.5;
    P(ctx, x + 22, 200, 3, 4, '#ffd166');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'RASA SAMA', x, 196, '#ffe9a3', 5);
  }
  function gambarPapanProporsiSetia(x) {
    papanLebar(x, ['2 : 3 = 4 : 6', 'SETIA'], 92);
    lingkaran(ctx, x - 52, 232, 4, '#f0c890');
    lingkaran(ctx, x + 52, 232, 5, '#f0c890');
  }

  function gambarGarisStartKelinci(x, t) {
    const goyang = Math.sin(t * 4) * 1;
    P(ctx, x - 40, 238, 80, 3, '#fffdf2');
    P(ctx, x - 34, 226 + goyang, 10, 9, '#fffdf2');
    P(ctx, x - 25, 222 + goyang, 5, 5, '#fffdf2');
    P(ctx, x - 22, 218 + goyang, 2, 5, '#fffdf2');
    P(ctx, x + 8, 226 - goyang, 10, 9, '#e8a050');
    P(ctx, x + 17, 222 - goyang, 5, 5, '#e8a050');
    P(ctx, x + 20, 216 - goyang, 2, 7, '#8a5f38');
    teksPx(ctx, 'SIAP?', x, 196, '#2f5a46', 5);
  }
  function gambarKelinciEnamPuluh(x, t) {
    const lompat = Math.abs(Math.sin(t * 4)) * 4;
    P(ctx, x - 20, 232 - lompat, 16, 12, '#fffdf2');
    P(ctx, x - 5, 226 - lompat, 7, 6, '#fffdf2');
    P(ctx, x - 2, 220 - lompat, 2, 7, '#fffdf2');
    P(ctx, x + 1, 220 - lompat, 2, 7, '#fffdf2');
    P(ctx, x - 16, 244 - lompat, 4, 2, '#e8e2d2');
    teksPx(ctx, '60', x + 26, 226, '#2f5a46', 9);
    teksPx(ctx, 'TIAP MENIT', x, 196, '#2f5a46', 4);
    P(ctx, x - 36, 244, 72, 2, '#c4e2a4');
  }
  function gambarDuaMenitSeratus(x, t) {
    const naik = Math.sin(t * 2.2) * 1;
    P(ctx, x - 34, 232, 22, 8, '#1e2a44');
    teksPx(ctx, '1:60', x - 23, 235, '#ffe9a3', 4);
    P(ctx, x - 8, 224, 36, 8, '#1e2a44');
    teksPx(ctx, '2:120', x + 10, 227, '#ffe9a3', 4);
    P(ctx, x + 32, 216, 46, 8, '#1e2a44');
    teksPx(ctx, '3:180', x + 55, 219, '#ffe9a3', 4);
    teksPx(ctx, 'TEMPO SAMA', x, 196 + naik * 0.5, '#2f5a46', 5);
  }
  function gambarPapanTempoJarak(x) {
    papanLebar(x, ['JARAK : WAKTU', '60 TIAP MENIT'], 98);
    P(ctx, x - 56, 234, 8, 8, '#fffdf2');
    P(ctx, x - 51, 231, 4, 4, '#fffdf2');
  }

  function gambarKotakDelapanDonat(x, t) {
    const bob = Math.sin(t * 2) * 1;
    P(ctx, x - 40, 222 + bob, 80, 22, '#f5d8b8');
    P(ctx, x - 40, 218 + bob, 80, 5, '#e8c090');
    for (let i = 0; i < 8; i++) {
      const dx = x - 34 + (i % 4) * 18, dy = 228 + Math.floor(i / 4) * 9;
      lingkaran(ctx, dx + 4, dy + 3, 4, i < 6 ? '#a06a3a' : '#f08fb0');
      lingkaran(ctx, dx + 4, dy + 3, 1.5, '#f5d8b8');
    }
    teksPx(ctx, '6 : 8', x, 196, '#8a4f28', 7);
  }
  function gambarSusunTigaDariEmpat(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 3);
    for (let i = 0; i < 4; i++) {
      const dx = x - 30 + i * 20;
      lingkaran(ctx, dx, 230, 7, i < 3 ? '#a06a3a' : '#f08fb0');
      lingkaran(ctx, dx, 230, 2.5, '#f5d8b8');
    }
    ctx.globalAlpha = denyut;
    teksPx(ctx, '3 COKELAT 1 STROBERI', x, 216, '#8a4f28', 3);
    ctx.globalAlpha = 1;
    teksPx(ctx, '3 DARI 4', x, 196, '#8a4f28', 6);
    P(ctx, x - 38, 244, 76, 2, '#e8c090');
  }
  function gambarPapanTujuhLima(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 2.6);
    P(ctx, x - 30, 208, 60, 36, '#1e2a44');
    P(ctx, x - 30, 208, 60, 3, '#37476f');
    P(ctx, x - 3, 244, 3, 4, '#7a5230');
    teksPx(ctx, '75%', x, 222, '#ffd166', 12);
    teksPx(ctx, 'PER 100', x, 236, '#dfe6f5', 4);
    gambarCahaya(x, 226, 12, '#ffd166', t);
    teksPx(ctx, '3/4 = 75%', x, 196 + denyut * 0.5, '#8a4f28', 5);
  }
  function gambarPapanTigaBahasa(x) {
    papanLebar(x, ['3/4 = 75%', '3 : 4'], 66);
    lingkaran(ctx, x - 40, 234, 4, '#a06a3a');
    lingkaran(ctx, x - 31, 234, 4, '#a06a3a');
    lingkaran(ctx, x - 22, 234, 4, '#a06a3a');
    lingkaran(ctx, x - 13, 234, 4, '#f08fb0');
    teksPx(ctx, 'SATU MAKNA', x + 22, 238, '#8a4f28', 3);
  }

  function gambarRakMobilMainan(x, t) {
    const bob = Math.sin(t * 2.2) * 1;
    P(ctx, x - 38, 226, 76, 4, '#8a5f38');
    P(ctx, x - 38, 244, 76, 3, '#6f4a28');
    P(ctx, x - 24, 214 + bob, 30, 10, '#e05a5a');
    P(ctx, x - 16, 208 + bob, 14, 8, '#e05a5a');
    lingkaran(ctx, x - 17, 225 + bob, 3, '#3a3a4a');
    lingkaran(ctx, x - 1, 225 + bob, 3, '#3a3a4a');
    teksPx(ctx, 'SKALA 1 : 24', x + 12, 216, '#5f4426', 4);
    teksPx(ctx, 'MOBIL MAINAN', x, 196, '#5f4426', 4);
  }
  function gambarPenggarisDuaPuluh(x, t) {
    const naik = Math.sin(t * 2) * 1;
    P(ctx, x - 36, 228, 72, 8, '#f5d878');
    for (let i = 0; i < 10; i++) P(ctx, x - 33 + i * 7, 228, 1, 4, '#b89848');
    P(ctx, x - 20, 214 + naik, 30, 10, '#e05a5a');
    P(ctx, x - 12, 208 + naik, 14, 8, '#e05a5a');
    lingkaran(ctx, x - 13, 225 + naik, 3, '#3a3a4a');
    lingkaran(ctx, x + 3, 225 + naik, 3, '#3a3a4a');
    teksPx(ctx, '20 CM', x, 196, '#8a4f28', 6);
  }
  function gambarMobilJadiRaksasa(x, t) {
    const goyang = Math.sin(t * 2.4) * 1;
    P(ctx, x - 40, 226, 80, 14, '#e05a5a');
    P(ctx, x - 20, 216, 28, 12, '#e05a5a');
    P(ctx, x - 14, 218, 8, 6, '#a8d8f0');
    lingkaran(ctx, x - 24, 241, 5, '#3a3a4a');
    lingkaran(ctx, x + 24, 241, 5, '#3a3a4a');
    teksPx(ctx, '480 CM', x, 200 + goyang * 0.6, '#2f5a46', 7);
    teksPx(ctx, 'JADI RAKSASA', x, 188, '#2f5a46', 4);
  }
  function gambarPapanKaliDuaEmpat(x) {
    papanLebar(x, ['20 x 24', '= 480'], 52);
    P(ctx, x - 34, 234, 14, 5, '#e05a5a');
    lingkaran(ctx, x - 31, 240, 2, '#3a3a4a');
    lingkaran(ctx, x - 23, 240, 2, '#3a3a4a');
  }

  function gambarGalianEmpatPekerja(x, t) {
    const kerja = Math.sin(t * 5) * 1.5;
    P(ctx, x - 16, 238, 32, 8, '#8a6a48');
    P(ctx, x - 10, 232, 20, 7, '#6f5236');
    for (let i = 0; i < 4; i++) {
      const px = x - 33 + i * 22;
      ctx.globalAlpha = 0.85;
      lingkaran(ctx, px, 226 + (i % 2) * kerja, 5, '#ffd166');
      ctx.globalAlpha = 1;
      lingkaran(ctx, px, 226 + (i % 2) * kerja, 3.5, '#fff3cf');
      P(ctx, px + 4, 224 + (i % 2) * kerja + kerja, 5, 2, '#8a5f38');
    }
    P(ctx, x + 34, 214, 18, 22, '#fffdf2');
    teksPx(ctx, '6', x + 43, 222, '#5f4426', 7);
    teksPx(ctx, '4 PEKERJA', x, 196, '#4a3520', 4);
  }
  function gambarGalianDelapanPekerja(x, t) {
    const kerja = Math.sin(t * 7) * 1.5;
    P(ctx, x - 16, 238, 32, 8, '#8a6a48');
    P(ctx, x - 10, 232, 20, 7, '#6f5236');
    for (let i = 0; i < 8; i++) {
      const px = x - 38 + i * 11, atas = i < 4;
      ctx.globalAlpha = 0.85;
      lingkaran(ctx, px, (atas ? 220 : 230) + (i % 2) * kerja, 5, '#ffd166');
      ctx.globalAlpha = 1;
      lingkaran(ctx, px, (atas ? 220 : 230) + (i % 2) * kerja, 3.5, '#fff3cf');
    }
    P(ctx, x + 38, 214, 18, 22, '#fffdf2');
    teksPx(ctx, '3', x + 47, 222, '#5f4426', 7);
    teksPx(ctx, '8 PEKERJA', x, 196, '#4a3520', 4);
  }
  function gambarPapanKaliSilang(x) {
    papanLebar(x, ['4 x 6 = 24', '8 x 3 = 24'], 76);
    lingkaran(ctx, x - 44, 234, 3, '#ffd166');
    lingkaran(ctx, x + 44, 234, 3, '#ffd166');
    teksPx(ctx, 'SAMA!', x, 192, '#2aa85e', 4);
  }
  function gambarPapanBerbalikNilai(x, t) {
    const goyang = Math.sin(t * 2) * 2;
    P(ctx, x - 3, 238, 6, 8, '#7a5230');
    P(ctx, x - 34 + goyang, 228, 68, 3, '#8a5f38');
    teksPx(ctx, '4x6', x - 24 + goyang, 220, '#2f5a46', 5);
    teksPx(ctx, '8x3', x + 22 - goyang, 214, '#2aa85e', 5);
    lingkaran(ctx, x - 24 + goyang, 231, 3.5, '#ffd166');
    lingkaran(ctx, x + 22 - goyang, 231, 3.5, '#ffd166');
    teksPx(ctx, 'BERBALIK NILAI', x, 196, '#4a3520', 4);
  }

  function gambarBukuResepWarung(x, t) {
    const bob = Math.sin(t * 2) * 1;
    P(ctx, x - 30, 216 + bob, 60, 28, '#7a5230');
    P(ctx, x - 28, 218 + bob, 28, 24, '#fffdf2');
    P(ctx, x + 2, 218 + bob, 26, 24, '#fffdf2');
    P(ctx, x - 24, 224 + bob, 18, 2, '#b8b09a');
    P(ctx, x - 24, 230 + bob, 18, 2, '#b8b09a');
    P(ctx, x + 6, 224 + bob, 16, 2, '#b8b09a');
    P(ctx, x + 6, 230 + bob, 16, 2, '#b8b09a');
    teksPx(ctx, '4 MANGKUK', x, 196, '#ffe9a3', 4);
    teksPx(ctx, '2:1:3', x, 208 + bob, '#5f4426', 5);
  }
  function gambarDelapanTamuDatang(x, t) {
    const goyang = Math.sin(t * 3) * 1;
    P(ctx, x - 40, 238, 80, 3, '#3d2c18');
    for (let i = 0; i < 8; i++) {
      const px = x - 36 + i * 10;
      P(ctx, px, 230, 7, 8, i % 2 ? '#c9985a' : '#b8874a');
      P(ctx, px, 226, 7, 3, '#a3744a');
      ctx.globalAlpha = 0.8;
      lingkaran(ctx, px + 3, 220 + (i % 2) * goyang, 3, '#ffd166');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, '8 PESAN!', x, 196, '#ffe9a3', 6);
  }
  function gambarSemuaIkutGanda(x, t) {
    const naik = Math.sin(t * 2.6) * 1;
    P(ctx, x - 40, 240, 80, 3, '#3d2c18');
    teksPx(ctx, '2 > 4', x - 26, 226 + naik, '#ffe9a3', 5);
    teksPx(ctx, '1 > 2', x, 226 - naik, '#ffe9a3', 5);
    teksPx(ctx, '3 > 6', x + 26, 226 + naik, '#ffe9a3', 5);
    P(ctx, x - 27, 234, 3, 6, '#7dffa8');
    P(ctx, x - 1, 234, 3, 6, '#7dffa8');
    P(ctx, x + 25, 234, 3, 6, '#7dffa8');
    teksPx(ctx, 'SEMUA x 2', x, 196, '#7dffa8', 5);
  }
  function gambarPapanTakaranUtuh(x) {
    papanLebar(x, ['SEMUA IKUT', 'GARAM JUGA!'], 86);
    lingkaran(ctx, x - 48, 232, 4, '#fffdf2');
    P(ctx, x - 49, 236, 2, 8, '#c9c9d2');
    lingkaran(ctx, x + 48, 232, 4, '#fffdf2');
    P(ctx, x + 47, 236, 2, 8, '#c9c9d2');
  }

  function gambarPetaKarunTerkunci(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 2.8);
    P(ctx, x - 34, 208, 68, 34, '#e8d8a8');
    P(ctx, x - 34, 208, 68, 3, '#d8c488');
    P(ctx, x - 2, 200, 4, 9, '#8a5f38');
    P(ctx, x - 24, 216, 16, 2, '#a89060');
    P(ctx, x - 4, 220, 20, 2, '#a89060');
    for (let i = 0; i < 5; i++) {
      const sx = x - 28 + i * 14;
      ctx.globalAlpha = 0.6 + denyut * 0.4;
      lingkaran(ctx, sx, 232, 5.5, '#c85a28');
      ctx.globalAlpha = 1;
      lingkaran(ctx, sx, 232, 4, '#e07636');
      teksPx(ctx, String(i + 1), sx, 230, '#fffdf2', 5);
    }
    teksPx(ctx, 'LIMA SEGEL', x, 196, '#ffd166', 5);
  }
  function gambarMisiRasioSkala(x, t) {
    const bob = Math.sin(t * 2.2) * 1;
    P(ctx, x - 38, 214 + bob, 76, 30, '#1e2a44');
    P(ctx, x - 38, 214 + bob, 76, 3, '#37476f');
    P(ctx, x - 3, 244 + bob, 3, 4, '#7a5230');
    teksPx(ctx, '4:6 > 2:3', x, 224 + bob, '#ffd166', 5);
    teksPx(ctx, '1:100: 5>500', x, 236 + bob, '#7dffa8', 4);
    teksPx(ctx, 'SEGEL 1-2', x, 196, '#ffd166', 4);
    lingkaran(ctx, x - 44, 228 + bob, 2.5, '#ffd166');
    lingkaran(ctx, x + 44, 228 + bob, 2.5, '#ffd166');
  }
  function gambarMisiHargaPersen(x, t) {
    const bob = Math.sin(t * 2) * 1;
    P(ctx, x - 38, 214 + bob, 76, 30, '#1e2a44');
    P(ctx, x - 38, 214 + bob, 76, 3, '#37476f');
    P(ctx, x - 3, 244 + bob, 3, 4, '#7a5230');
    teksPx(ctx, '4000:8 > 500', x, 224 + bob, '#ffd166', 4);
    teksPx(ctx, '3/4 = 75%', x, 236 + bob, '#7dffa8', 5);
    teksPx(ctx, 'SEGEL 3-4', x, 196, '#ffd166', 4);
    lingkaran(ctx, x - 44, 228 + bob, 2.5, '#ffd166');
    lingkaran(ctx, x + 44, 228 + bob, 2.5, '#ffd166');
  }
  function gambarMisiBerbalikPeta(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 3.4);
    P(ctx, x - 34, 210, 68, 32, '#e8d8a8');
    P(ctx, x - 34, 210, 68, 3, '#ffd166');
    P(ctx, x - 24, 220, 16, 2, '#c85a28');
    P(ctx, x - 2, 226, 20, 2, '#c85a28');
    P(ctx, x + 14, 218, 12, 2, '#c85a28');
    ctx.globalAlpha = 0.5 + denyut * 0.5;
    lingkaran(ctx, x + 20, 234, 4, '#ffd166');
    lingkaran(ctx, x - 20, 234, 4, '#ffd166');
    ctx.globalAlpha = 1;
    gambarCahaya(x, 226, 14, '#ffd166', t);
    teksPx(ctx, 'TERBUKA!', x, 196, '#ffd166', 6);
    P(ctx, x - 36, 244, 72, 2, '#161230');
  }

  function gambarGerbangTerbukaSiku(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 2.4);
    P(ctx, x - 40, 210, 16, 36, '#7a5a44');
    P(ctx, x - 44, 204, 24, 7, '#8a6a50');
    P(ctx, x - 8, 216, 6, 28, '#a3744a');
    P(ctx, x - 3, 218, 6, 26, '#b8874a');
    P(ctx, x + 2, 220, 6, 24, '#c9985a');
    P(ctx, x + 30, 210, 14, 36, '#7a5a44');
    lingkaran(ctx, x - 8, 244, 3, '#ffd166');
    ctx.globalAlpha = 0.4 + denyut * 0.4;
    lingkaran(ctx, x + 12, 232, 3, '#ffd166');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'BUKAAN PINTU', x, 196, '#5f4426', 4);
  }
  function gambarSikuKayuTukang(x) {
    P(ctx, x - 42, 244, 84, 3, '#8a5f38');
    P(ctx, x - 10, 214, 7, 30, '#c98a4b');
    P(ctx, x - 10, 237, 30, 7, '#c98a4b');
    P(ctx, x - 10, 214, 7, 2, '#e0a869');
    lingkaran(ctx, x - 7, 240, 2.5, '#8a5f38');
    teksPx(ctx, 'SIKU: 90 PAS', x, 196, '#5f4426', 5);
  }
  function gambarPembukaLancipTumpul(x) {
    P(ctx, x - 46, 240, 92, 2, '#8a5f38');

    P(ctx, x - 34, 224, 3, 16, '#e07636');
    P(ctx, x - 34, 240, 16, 3, '#e07636');
    teksPx(ctx, 'L', x - 30, 214, '#c85a28', 5);

    P(ctx, x - 2, 226, 3, 14, '#2f8a56');
    P(ctx, x - 2, 240, 14, 3, '#2f8a56');
    teksPx(ctx, 'S', x + 2, 218, '#1f6a42', 5);

    P(ctx, x + 28, 232, 3, 8, '#6f7fc0');
    P(ctx, x + 28, 240, 14, 3, '#6f7fc0');
    teksPx(ctx, 'T', x + 36, 224, '#4a5aa0', 5);
    teksPx(ctx, 'LANCIP SIKU TUMPUL', x, 196, '#5f4426', 4);
  }
  function gambarPapanJenisSudut(x) {
    papanLebar(x, ['LANCIP', 'SIKU 90', 'TUMPUL'], 56);
    P(ctx, x - 46, 230, 3, 12, '#e07636');
    P(ctx, x - 46, 240, 10, 2, '#e07636');
    P(ctx, x + 44, 234, 3, 8, '#6f7fc0');
    P(ctx, x + 44, 240, 12, 2, '#6f7fc0');
  }

  function gambarDekJembatanLurus(x, t) {
    const naik = Math.sin(t * 2.2) * 1;
    P(ctx, x - 46, 230 + naik, 92, 8, '#8a6f4a');
    P(ctx, x - 46, 230 + naik, 92, 2, '#a3855a');
    P(ctx, x - 30, 238 + naik, 6, 8, '#7a5f3a');
    P(ctx, x + 24, 238 + naik, 6, 8, '#7a5f3a');
    P(ctx, x - 44, 226 + naik, 3, 4, '#ffd166');
    P(ctx, x + 41, 226 + naik, 3, 4, '#ffd166');
    teksPx(ctx, 'GARIS LURUS 180', x, 196, '#2f5a46', 5);
  }
  function gambarDuaSudutBerbagi(x) {
    P(ctx, x - 46, 236, 92, 3, '#5f4426');
    P(ctx, x - 2, 218, 4, 18, '#8a5f38');
    lingkaran(ctx, x, 236, 3, '#ffd166');
    P(ctx, x - 22, 228, 3, 8, '#e07636');
    P(ctx, x - 22, 234, 8, 2, '#e07636');
    P(ctx, x + 14, 228, 3, 8, '#2f8a56');
    P(ctx, x + 8, 234, 6, 2, '#2f8a56');
    teksPx(ctx, 'BERBAGI SATU GARIS', x, 196, '#2f5a46', 4);
  }
  function gambarSudutSeratusSepuluh(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 3);
    P(ctx, x - 46, 240, 92, 3, '#5f4426');
    P(ctx, x - 2, 226, 4, 14, '#8a5f38');
    P(ctx, x + 3, 224, 4, 3, '#8a5f38');
    ctx.globalAlpha = 0.5 + denyut * 0.5;
    teksPx(ctx, '110', x - 26, 224, '#c85a28', 6);
    ctx.globalAlpha = 1;
    teksPx(ctx, '?', x + 24, 224, '#2f8a56', 7);
    teksPx(ctx, '110 DAN ?', x, 196, '#2f5a46', 5);
  }
  function gambarPapanSelaluBerdua(x) {
    papanLebar(x, ['110 + 70', '= 180'], 60);
    lingkaran(ctx, x - 44, 234, 4, '#e07636');
    lingkaran(ctx, x + 44, 234, 4, '#2f8a56');
    P(ctx, x - 40, 234, 80, 2, '#b8c2d2');
  }

  function gambarKincirPenuh(x, t) {
    P(ctx, x - 2, 214, 5, 32, '#8a6f4a');
    const cx = x, cy = 210;
    for (let b = 0; b < 4; b++) {
      const a = t * 0.9 + b * Math.PI / 2;
      for (let s = 2; s <= 14; s += 2)
        P(ctx, cx + Math.cos(a) * s - 1, cy + Math.sin(a) * s - 1, 3, 3, b % 2 ? '#f5ecd4' : '#d8b878');
    }
    lingkaran(ctx, cx, cy, 3, '#ffd166');
    teksPx(ctx, 'PUTARAN PENUH', x, 196, '#2f5a46', 5);
  }
  function gambarEmpatSudutBertemu(x) {
    P(ctx, x - 40, 233, 80, 2, '#5f4426');
    P(ctx, x - 1, 214, 2, 40, '#5f4426');
    lingkaran(ctx, x, 234, 3.5, '#ffd166');
    lingkaran(ctx, x - 24, 226, 2.5, '#e07636');
    lingkaran(ctx, x + 24, 226, 2.5, '#2f8a56');
    lingkaran(ctx, x - 24, 242, 2.5, '#6f7fc0');
    lingkaran(ctx, x + 24, 242, 2.5, '#c98a4b');
    teksPx(ctx, 'EMPAT DI SATU TITIK', x, 196, '#2f5a46', 5);
  }
  function gambarSudutSisaKincir(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 3.2);
    P(ctx, x - 36, 236, 30, 2, '#5f4426');
    P(ctx, x - 8, 236, 26, 2, '#5f4426');
    P(ctx, x + 8, 214, 2, 24, '#5f4426');
    lingkaran(ctx, x - 8, 236, 3, '#ffd166');
    teksPx(ctx, '120', x - 26, 224, '#e07636', 5);
    teksPx(ctx, '90', x + 10, 228, '#2f8a56', 5);
    teksPx(ctx, '90', x + 16, 214, '#6f7fc0', 5);
    ctx.globalAlpha = 0.4 + denyut * 0.5;
    lingkaran(ctx, x - 20, 244, 3, '#ffd166');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'SISA 60', x, 196, '#c85a28', 6);
  }
  function gambarPapanPutaranPenuh(x) {
    papanLebar(x, ['SATU PUTARAN', '= 360'], 88);
    for (let b = 0; b < 4; b++) {
      const a = b * Math.PI / 2;
      P(ctx, x + 46 + Math.cos(a) * 6 - 1, 230 + Math.sin(a) * 6 - 1, 2, 2, '#ffd166');
    }
    lingkaran(ctx, x - 46, 230, 4, '#d8b878');
  }

  function gambarSegitigaKertasTiga(x, t) {
    const naik = Math.sin(t * 2) * 1;
    P(ctx, x - 36, 230 + naik, 72, 3, '#8a5f38');
    P(ctx, x - 24, 230 + naik, 48, 2, '#f5ecd4');
    P(ctx, x - 14, 212 + naik, 34, 2, '#f5ecd4');
    P(ctx, x - 24, 230 + naik, 2, 20, '#f5ecd4');
    P(ctx, x + 10, 214 + naik, 2, 18, '#f5ecd4');
    lingkaran(ctx, x - 23, 229 + naik, 2.5, '#e07636');
    lingkaran(ctx, x - 13, 213 + naik, 2.5, '#2f8a56');
    lingkaran(ctx, x + 11, 229 + naik, 2.5, '#6f7fc0');
    teksPx(ctx, 'SEGITIGA KERTAS', x, 196, '#ffe9a3', 5);
  }
  function gambarRobekTigaSudut(x, t) {
    P(ctx, x - 36, 244, 72, 3, '#8a5f38');
    const p1 = Math.sin(t * 3) * 2, p2 = Math.sin(t * 3 + 2) * 2, p3 = Math.sin(t * 3 + 4) * 2;
    P(ctx, x - 26, 224 + p1, 12, 10, '#e07636');
    P(ctx, x - 6, 222 + p2, 12, 12, '#2f8a56');
    P(ctx, x + 14, 226 + p3, 12, 8, '#6f7fc0');
    lingkaran(ctx, x - 20, 226 + p1, 1.5, '#fffdf2');
    lingkaran(ctx, x, 224 + p2, 1.5, '#fffdf2');
    lingkaran(ctx, x + 20, 228 + p3, 1.5, '#fffdf2');
    P(ctx, x - 2, 240, 4, 6, '#b8c2d2');
    P(ctx, x + 3, 240, 4, 6, '#b8c2d2');
    teksPx(ctx, 'ROBEK 3 SUDUT', x, 196, '#ffe9a3', 5);
  }
  function gambarTempelJadiGaris(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 2.8);
    P(ctx, x - 46, 232, 92, 4, '#f5ecd4');
    P(ctx, x - 44, 228, 22, 3, '#e07636');
    P(ctx, x - 20, 228, 22, 3, '#2f8a56');
    P(ctx, x + 4, 228, 22, 3, '#6f7fc0');
    ctx.globalAlpha = 0.4 + denyut * 0.4;
    P(ctx, x - 46, 226, 92, 2, '#ffd166');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'JADI GARIS LURUS!', x, 196, '#ffd166', 6);
  }
  function gambarPapanBuktiRobek(x) {
    papanLebar(x, ['50+60+70', '= 180'], 62);
    P(ctx, x - 44, 232, 10, 8, '#f5ecd4');
    P(ctx, x + 36, 232, 10, 8, '#f5ecd4');
  }

  function gambarJendelaEmpatSiku(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 2.2);
    P(ctx, x - 30, 210, 60, 36, '#8a5f38');
    P(ctx, x - 26, 214, 52, 28, '#ffd166');
    P(ctx, x - 26, 214, 52, 2, '#ffcf94');
    P(ctx, x - 1, 214, 2, 28, '#8a5f38');
    P(ctx, x - 26, 227, 52, 2, '#8a5f38');
    lingkaran(ctx, x - 26, 214, 2.5, '#fffdf2');
    lingkaran(ctx, x + 26, 214, 2.5, '#fffdf2');
    lingkaran(ctx, x - 26, 242, 2.5, '#fffdf2');
    lingkaran(ctx, x + 26, 242, 2.5, '#fffdf2');
    ctx.globalAlpha = 0.3 + denyut * 0.3;
    lingkaran(ctx, x, 226, 34, 'rgba(255,209,102,0.3)');
    ctx.globalAlpha = 1;
    teksPx(ctx, '4 SIKU', x, 196, '#c85a28', 6);
  }
  function gambarDuaSegitigaSahabat(x) {
    P(ctx, x - 34, 212, 68, 34, '#6f7fc0');
    P(ctx, x - 34, 212, 34, 34, '#e07636');
    P(ctx, x - 34, 212, 3, 34, '#c85a28');
    P(ctx, x - 34, 212, 34, 3, '#c85a28');
    P(ctx, x - 6, 212, 3, 34, '#4a5aa0');
    for (let i = 0; i < 10; i++) P(ctx, x - 34 + i * 3.5, 212 + i * 3.4, 3, 3, '#c85a28');
    teksPx(ctx, '180', x - 24, 222, '#fffdf2', 5);
    teksPx(ctx, '180', x + 14, 222, '#fffdf2', 5);
    teksPx(ctx, 'DUA SEGITIGA', x, 196, '#c85a28', 5);
  }
  function gambarGabungSegiempat(x, t) {
    const naik = Math.sin(t * 2.4) * 1;
    P(ctx, x - 44, 226 + naik, 20, 20, '#e07636');
    P(ctx, x - 12, 226 - naik, 20, 20, '#2f8a56');
    teksPx(ctx, '+', x - 26, 230, '#fffdf2', 7);
    P(ctx, x + 16, 222, 28, 28, '#ffd166');
    P(ctx, x + 16, 222, 28, 2, '#ffe9a3');
    teksPx(ctx, '180+180', x, 196, '#ffe9a3', 5);
  }
  function gambarPapanDuaKaliSeratus(x) {
    papanLebar(x, ['180 + 180', '= 360'], 64);
    lingkaran(ctx, x - 46, 232, 4, '#e07636');
    lingkaran(ctx, x - 46, 242, 4, '#2f8a56');
    lingkaran(ctx, x + 46, 236, 5, '#ffd166');
  }

  function gambarRelSejajarKereta(x) {
    P(ctx, x - 46, 220, 92, 3, '#8a6f4a');
    P(ctx, x - 46, 238, 92, 3, '#8a6f4a');
    for (let i = 0; i < 9; i++) P(ctx, x - 42 + i * 10, 220, 3, 21, '#6f4a28');
    lingkaran(ctx, x - 20, 200, 5, '#e05a6a');
    P(ctx, x - 28, 200, 10, 5, '#e05a6a');
    P(ctx, x - 20, 205, 3, 3, '#5f4426');
    teksPx(ctx, 'SEJAJAR', x, 196, '#2f5a46', 6);
  }
  function gambarGarisMiringTerpotong(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 2.6);
    P(ctx, x - 46, 218, 92, 3, '#8a6f4a');
    P(ctx, x - 46, 240, 92, 3, '#8a6f4a');
    for (let i = 0; i < 4; i++) P(ctx, x - 8 + i * 2, 206 + i * 9, 4, 4, '#c98a4b');
    P(ctx, x + 2, 206, 4, 4, '#c98a4b');
    ctx.globalAlpha = 0.4 + denyut * 0.4;
    lingkaran(ctx, x - 6, 219, 2.5, '#ffd166');
    lingkaran(ctx, x + 8, 241, 2.5, '#ffd166');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'TERPOTONG MIRING', x, 196, '#2f5a46', 5);
  }
  function gambarSudutZBerpasangan(x, t) {
    const kedip = Math.sin(t * 4) > 0;
    P(ctx, x - 38, 216, 30, 3, '#8a6f4a');
    P(ctx, x - 10, 216, 3, 24, '#c98a4b');
    P(ctx, x - 10, 240, 32, 3, '#8a6f4a');
    ctx.globalAlpha = kedip ? 1 : 0.35;
    lingkaran(ctx, x - 40, 210, 2.5, '#ffd166');
    P(ctx, x - 44, 208, 8, 2, '#ffd166');
    lingkaran(ctx, x + 24, 246, 2.5, '#ffd166');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'POLA Z KEMBAR', x, 196, '#2f5a46', 5);
  }
  function gambarPapanPolaSejajar(x) {
    papanLebar(x, ['SEJAJAR =', 'SUDUT SAMA'], 78);
    P(ctx, x - 44, 228, 12, 2, '#8a6f4a');
    P(ctx, x - 44, 236, 12, 2, '#8a6f4a');
    P(ctx, x + 34, 226, 3, 14, '#c98a4b');
  }

  function gambarSegitigaUbinSiku(x) {
    P(ctx, x - 34, 240, 36, 3, '#e07636');
    P(ctx, x - 34, 216, 3, 27, '#2f8a56');
    for (let i = 0; i < 9; i++) P(ctx, x - 32 + i * 3.6, 216 + i * 2.7, 3, 3, '#ffd166');
    teksPx(ctx, '3', x - 20, 244, '#c85a28', 5);
    teksPx(ctx, '4', x - 40, 224, '#1f6a42', 5);
    teksPx(ctx, '5', x + 8, 222, '#c08a2c', 5);
    teksPx(ctx, 'SIKU 3-4-5', x, 196, '#5f4426', 5);
  }
  function gambarKotakSembilanAlas(x) {
    for (let r = 0; r < 3; r++) for (let cI = 0; cI < 3; cI++)
      P(ctx, x - 21 + cI * 15, 214 + r * 12, 13, 10, (r + cI) % 2 ? '#f0d8b8' : '#e8c8a0');
    teksPx(ctx, '3x3 = 9', x, 196, '#c85a28', 6);
  }
  function gambarKotakEnamBelasTinggi(x) {
    for (let r = 0; r < 4; r++) for (let cI = 0; cI < 4; cI++)
      P(ctx, x - 27 + cI * 15, 212 + r * 10, 13, 8, (r + cI) % 2 ? '#b8dcc8' : '#a8d0ba');
    teksPx(ctx, '4x4 = 16', x, 196, '#1f6a42', 6);
  }
  function gambarKotakDuaLimaMiring(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 3);
    for (let r = 0; r < 5; r++) for (let cI = 0; cI < 5; cI++)
      P(ctx, x - 33 + cI * 14, 210 + r * 8, 12, 7, (r + cI) % 2 ? '#ffd166' : '#f0c878');
    ctx.globalAlpha = 0.35 + denyut * 0.3;
    lingkaran(ctx, x, 229, 40, 'rgba(255,209,102,0.35)');
    ctx.globalAlpha = 1;
    teksPx(ctx, '5x5 = 25', x, 196, '#c08a2c', 6);
  }

  function gambarMejaGoyangEmpat(x, t) {
    const goyang = Math.sin(t * 6) * 2;
    P(ctx, x - 38, 226 + goyang, 76, 8, '#a3744a');
    P(ctx, x - 34, 234, 5, 14, '#8a5f38');
    P(ctx, x - 12, 234 + goyang * 0.4, 5, 12, '#8a5f38');
    P(ctx, x + 8, 234 - goyang * 0.4, 5, 12, '#8a5f38');
    P(ctx, x + 30, 234, 5, 14, '#8a5f38');
    teksPx(ctx, 'GOYANG!', x, 196, '#c85a28', 6);
  }
  function gambarPalangDiagonal(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 3);
    P(ctx, x - 36, 244, 44, 3, '#8a5f38');
    P(ctx, x - 36, 214, 3, 33, '#8a5f38');
    for (let i = 0; i < 11; i++) P(ctx, x - 34 + i * 3.4, 214 + i * 2.8, 4, 3, '#ffd166');
    ctx.globalAlpha = 0.35 + denyut * 0.3;
    lingkaran(ctx, x - 14, 228, 26, 'rgba(255,209,102,0.3)');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'PALANG 5', x, 196, '#c08a2c', 6);
  }
  function gambarMejaKokohSiku(x) {
    P(ctx, x - 36, 226, 72, 8, '#a3744a');
    P(ctx, x - 32, 234, 5, 14, '#8a5f38');
    P(ctx, x + 28, 234, 5, 14, '#8a5f38');
    for (let i = 0; i < 10; i++) P(ctx, x - 30 + i * 6, 230 + i * 1.8, 4, 3, '#ffd166');
    lingkaran(ctx, x - 38, 226, 3, '#2f8a56');
    teksPx(ctx, 'KOKOH!', x, 196, '#1f6a42', 6);
  }
  function gambarPapanTigaEmpatLima(x) {
    papanLebar(x, ['9 + 16', '= 25'], 48);
    P(ctx, x - 44, 230, 3, 12, '#8a5f38');
    P(ctx, x - 44, 240, 10, 2, '#8a5f38');
    lingkaran(ctx, x + 44, 234, 4, '#ffd166');
  }

  function gambarTanggaSandingDinding(x, t) {
    P(ctx, x + 14, 200, 4, 46, '#8a6f4a');
    P(ctx, x - 44, 244, 60, 3, '#5f4426');
    for (let i = 0; i < 9; i++) P(ctx, x - 34 + i * 5, 242 - i * 4.6, 4, 4, '#ffd166');
    P(ctx, x - 36, 244, 3, 3, '#ffd166');
    P(ctx, x + 10, 202, 3, 3, '#ffd166');
    teksPx(ctx, 'TANGGA 10', x, 196, '#ffe9a3', 5);
  }
  function gambarJarakEnamLangkah(x) {
    P(ctx, x + 20, 208, 4, 38, '#8a6f4a');
    P(ctx, x - 44, 244, 64, 3, '#5f4426');
    P(ctx, x - 38, 238, 52, 2, '#a5d8ff');
    P(ctx, x - 40, 234, 3, 6, '#a5d8ff');
    P(ctx, x + 12, 234, 3, 6, '#a5d8ff');
    teksPx(ctx, '6', x - 14, 224, '#a5d8ff', 7);
    teksPx(ctx, 'JARAK 6', x, 196, '#a5d8ff', 5);
  }
  function gambarTinggiDelapanPuncak(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 3);
    P(ctx, x + 20, 204, 4, 42, '#8a6f4a');
    P(ctx, x - 44, 244, 64, 3, '#5f4426');
    P(ctx, x + 24, 208, 14, 2, '#7dffa8');
    P(ctx, x + 24, 208, 2, 36, '#7dffa8');
    ctx.globalAlpha = 0.4 + denyut * 0.4;
    lingkaran(ctx, x + 25, 208, 3, '#7dffa8');
    ctx.globalAlpha = 1;
    teksPx(ctx, '8', x + 30, 218, '#7dffa8', 7);
    teksPx(ctx, 'TINGGI 8', x, 196, '#7dffa8', 5);
  }
  function gambarPapanSisiHilang(x) {
    papanLebar(x, ['100-36=64', 'PUNCAK: 8'], 78);
    lingkaran(ctx, x - 46, 234, 4, '#a5d8ff');
    P(ctx, x + 44, 228, 3, 14, '#7dffa8');
  }

  function gambarArenaMisiGeometri(x, t) {
    P(ctx, x - 46, 210, 92, 36, '#3a3260');
    P(ctx, x - 50, 202, 100, 9, '#4a4078');
    for (let i = 0; i < 5; i++) {
      const nyala = Math.sin(t * 2.5 + i) > 0;
      lingkaran(ctx, x - 38 + i * 19, 224, 4, nyala ? '#ffd166' : '#6a5a9a');
      P(ctx, x - 39 + i * 19, 216, 2, 4, '#4a4078');
    }
    teksPx(ctx, 'LIMA MISI', x, 196, '#ffd166', 6);
  }
  function gambarMisiBukaanSudut(x, t) {
    P(ctx, x - 40, 226, 3, 18, '#e07636');
    P(ctx, x - 40, 242, 16, 2, '#e07636');
    teksPx(ctx, '90', x - 34, 228, '#e07636', 5);
    P(ctx, x - 8, 238, 44, 3, '#2f8a56');
    teksPx(ctx, '105', x + 2, 226, '#2f8a56', 4);
    teksPx(ctx, '?', x + 30, 226, '#ffd166', 6);
    teksPx(ctx, 'MISI 1 & 2', x, 196, '#ffe9a3', 6);
  }
  function gambarMisiSegitigaPutaran(x, t) {
    P(ctx, x - 34, 244, 28, 3, '#e07636');
    P(ctx, x - 34, 226, 3, 21, '#e07636');
    for (let i = 0; i < 8; i++) P(ctx, x - 32 + i * 3.4, 226 + i * 2.4, 3, 3, '#e07636');
    teksPx(ctx, '80?', x - 26, 216, '#ffd166', 5);
    for (let b = 0; b < 4; b++) {
      const a = t + b * Math.PI / 2;
      P(ctx, x + 22 + Math.cos(a) * 7 - 1, 234 + Math.sin(a) * 7 - 1, 2, 2, '#ffd166');
    }
    lingkaran(ctx, x + 22, 234, 2, '#fffdf2');
    teksPx(ctx, '?', x + 36, 224, '#ffd166', 6);
    teksPx(ctx, 'MISI 3 & 4', x, 196, '#ffe9a3', 6);
  }
  function gambarMisiPythagorasHutan(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 3.2);
    P(ctx, x - 36, 244, 36, 3, '#7dffa8');
    P(ctx, x - 36, 214, 3, 33, '#a5d8ff');
    for (let i = 0; i < 12; i++) P(ctx, x - 33 + i * 3, 214 + i * 2.6, 3, 3, '#ffd166');
    ctx.globalAlpha = 0.4 + denyut * 0.4;
    teksPx(ctx, '?', x + 8, 222, '#ffd166', 8);
    ctx.globalAlpha = 1;
    teksPx(ctx, '6 & 8', x - 40, 200, '#a5d8ff', 4);
    teksPx(ctx, 'MIRING ?', x, 196, '#ffe9a3', 6);
  }

  function gambarKotakKadoKubus(x, t) {
    const bob = Math.sin(t * 2) * 1.5;
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    P(ctx, x - 26, 216 + bob, 32, 26, '#e8788a');
    P(ctx, x - 26, 212 + bob, 32, 5, '#f4a0b0');
    P(ctx, x + 6, 216 + bob, 8, 26, '#c85a6e');
    P(ctx, x - 12, 212 + bob, 5, 30, '#ffd166');
    P(ctx, x - 26, 226 + bob, 32, 4, '#ffd166');
    lingkaran(ctx, x - 10, 210 + bob, 3, '#ffd166');
    teksPx(ctx, 'KUBUS SISI 3', x, 196, '#c85a6e', 5);
  }
  function gambarKartuPersegiEnam(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    for (let i = 0; i < 6; i++) {
      const kx = x - 39 + (i % 3) * 27, ky = 210 + Math.floor(i / 3) * 17;
      const nyala = i === Math.floor(t * 2) % 6;
      P(ctx, kx, ky, 22, 13, nyala ? '#ffd166' : '#9fd8e8');
      P(ctx, kx + 2, ky + 2, 18, 9, nyala ? '#ffe9a3' : '#b8e4f0');
    }
    teksPx(ctx, '6 KARTU 3x3', x, 196, '#9fd8e8', 5);
  }
  function gambarKubusSusunIsi(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    const warna = ['#9fd8e8', '#7dc8a0', '#ffd166'];
    for (let l = 0; l < 3; l++) {
      const ly = 234 - l * 9;
      const atas = l === 2;
      ctx.globalAlpha = atas ? 0.6 + 0.4 * (0.5 + 0.5 * Math.sin(t * 3)) : 1;
      for (let k = 0; k < 3; k++) {
        P(ctx, x - 24 + k * 17, ly, 15, 8, warna[l]);
        P(ctx, x - 24 + k * 17, ly, 15, 2, '#fffdf2');
      }
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, '3x3x3 = 27', x, 196, '#ffd166', 5);
  }
  function gambarPapanKubusJurus(x) {
    papanLebar(x, ['LP 6x9=54', 'V 3x3x3=27'], 92);
    lingkaran(ctx, x - 50, 234, 3, '#ffd166');
    lingkaran(ctx, x + 50, 234, 3, '#9fd8e8');
  }

  function gambarKardusBalokUtuh(x, t) {
    const bob = Math.sin(t * 1.8) * 1;
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    P(ctx, x - 32, 218 + bob, 52, 26, '#c8a06a');
    P(ctx, x - 32, 214 + bob, 52, 5, '#d8b078');
    P(ctx, x + 20, 218 + bob, 12, 26, '#a8824e');
    P(ctx, x - 8, 218 + bob, 5, 26, '#e8d8b8');
    teksPx(ctx, '6 x 4 x 2', x, 198, '#d8b078', 5);
  }
  function gambarJaringBalokRata(x, t) {
    P(ctx, x - 40, 246, 80, 2, '#8a6f4a');
    P(ctx, x - 30, 206, 26, 12, '#e0c088');
    P(ctx, x - 30, 240, 26, 5, '#e0c088');
    P(ctx, x - 40, 222, 10, 18, '#c8a06a');
    P(ctx, x + 24, 222, 10, 18, '#c8a06a');
    ctx.globalAlpha = Math.sin(t * 3) > 0 ? 1 : 0.55;
    P(ctx, x - 28, 220, 26, 18, '#d8b078');
    ctx.globalAlpha = 1;
    P(ctx, x - 28, 220, 26, 2, '#f0e0c0');
    teksPx(ctx, 'JARING RATA', x, 196, '#e0c088', 5);
  }
  function gambarPasangKembarTiga(x, t) {
    P(ctx, x - 44, 244, 88, 3, '#5f4426');
    P(ctx, x - 44, 232, 24, 10, '#9fd8e8');
    teksPx(ctx, '48', x - 32, 220, '#9fd8e8', 5);
    P(ctx, x - 14, 236, 28, 6, '#7dc8a0');
    teksPx(ctx, '24', x, 224, '#7dc8a0', 5);
    P(ctx, x + 20, 238, 18, 6, '#ffd166');
    teksPx(ctx, '16', x + 29, 226, '#ffd166', 5);
    teksPx(ctx, '3 PASANG', x, 196, '#ffe9a3', 5);
  }
  function gambarPapanJumlahEnamSisi(x) {
    papanLebar(x, ['48+24+16', '= 88'], 80);
    P(ctx, x + 46, 234, 2, 10, '#7dffa8');
  }

  function gambarLaciKosongEnamEmpat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    for (let b = 0; b < 4; b++)
      for (let k = 0; k < 6; k++)
        P(ctx, x - 30 + k * 10, 222 + b * 5, 9, 4, '#8a6a44');
    P(ctx, x - 32, 220, 66, 2, '#a8824e');
    const denyut = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.35 + denyut * 0.35;
    teksPx(ctx, 'MUAT ?', x, 206, '#ffd166', 5);
    ctx.globalAlpha = 1;
    teksPx(ctx, '6 x 4', x, 196, '#ffd166', 6);
  }
  function gambarKubusSusuSusun(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    for (let b = 0; b < 4; b++)
      for (let k = 0; k < 6; k++)
        P(ctx, x - 30 + k * 10, 222 + b * 5, 9, 4, (k + b) % 2 ? '#e8f0f4' : '#d0dde4');
    P(ctx, x - 32, 220, 66, 2, '#a8824e');
    teksPx(ctx, '6x4 = 24', x, 206, '#fffdf2', 5);
    teksPx(ctx, 'SATU LANTAI', x, 196, '#e8f0f4', 5);
  }
  function gambarSusunDuaLapis(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 3);
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    for (let b = 0; b < 4; b++)
      for (let k = 0; k < 6; k++)
        P(ctx, x - 30 + k * 10, 231 + b * 3.4, 9, 3, '#e8f0f4');
    ctx.globalAlpha = 0.7 + denyut * 0.3;
    for (let b = 0; b < 4; b++)
      for (let k = 0; k < 6; k++)
        P(ctx, x - 30 + k * 10, 224 + b * 3.4, 9, 3, '#ffd166');
    ctx.globalAlpha = 1;
    teksPx(ctx, '24 + 24 = 48', x, 206, '#ffd166', 5);
    teksPx(ctx, '6x4x2', x, 196, '#fffdf2', 5);
  }
  function gambarPapanPanjangLebarTinggi(x) {
    papanLebar(x, ['6x4x2 = 48', 'P x L x T'], 90);
    lingkaran(ctx, x - 49, 236, 3, '#ffd166');
  }

  function gambarRumahAtapPrisma(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    P(ctx, x - 26, 224, 36, 20, '#d8b078');
    P(ctx, x - 12, 234, 9, 10, '#5a4430');
    for (let i = 0; i < 6; i++) {
      P(ctx, x - 26 + i * 3, 222 - i * 3.4, 36 - i * 6, 4, '#c85a4a');
    }
    teksPx(ctx, 'PRISMA', x, 196, '#b45a3a', 6);
  }
  function gambarKartuSegitigaAlas(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    for (let i = 0; i < 8; i++)
      P(ctx, x - 24 + i * 1.6, 238 - i * 2.4, 24 - i * 3.2, 2.4, '#7dc8a0');
    P(ctx, x - 24, 240, 24, 2, '#a8e6c0');
    teksPx(ctx, '6', x - 12, 244, '#7dffa8', 4);
    P(ctx, x - 26, 224, 2, 18, '#7dffa8');
    teksPx(ctx, '4', x - 34, 224, '#7dffa8', 4);
    teksPx(ctx, '(6x4):2 = 12', x, 206, '#7dc8a0', 4);
    teksPx(ctx, 'LUAS ALAS', x, 196, '#7dffa8', 5);
  }
  function gambarGeserSegitigaAtap(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    P(ctx, x - 38, 226, 76, 2, '#8a6f4a');
    ctx.globalAlpha = 0.35;
    P(ctx, x - 38, 229, 76, 3, '#e8d4a0');
    ctx.globalAlpha = 1;
    const geser = Math.sin(t * 2.2) * 28;
    P(ctx, x - 4 + geser, 210, 4, 16, '#ffd166');
    P(ctx, x + 3 + geser, 215, 4, 11, '#e8b84a');
    P(ctx, x + 10 + geser, 220, 4, 6, '#c8943a');
    teksPx(ctx, '12 x 10 = 120', x, 196, '#ffd166', 5);
  }
  function gambarPapanLuasKaliPanjang(x) {
    papanLebar(x, ['12 x 10', '= 120'], 76);
    lingkaran(ctx, x - 44, 234, 3, '#ffd166');
  }

  function gambarKalengSusuRak(x, t) {
    const kilau = 0.5 + 0.5 * Math.sin(t * 2.8);
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    P(ctx, x - 14, 212, 24, 32, '#c8d8e0');
    P(ctx, x - 14, 210, 24, 4, '#9fb2c8');
    P(ctx, x - 14, 242, 24, 4, '#9fb2c8');
    P(ctx, x - 14, 222, 24, 10, '#e8788a');
    ctx.globalAlpha = 0.4 + kilau * 0.5;
    P(ctx, x - 10, 214, 3, 28, '#fffdf2');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'TABUNG', x, 196, '#9fd8e8', 6);
  }
  function gambarDuaTutupBundar(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    lingkaran(ctx, x - 22, 228, 12, '#9fb2c8');
    lingkaran(ctx, x - 22, 228, 9, '#c8d8e0');
    lingkaran(ctx, x + 22, 234, 12, '#9fb2c8');
    lingkaran(ctx, x + 22, 234, 9, '#c8d8e0');
    teksPx(ctx, 'r=7', x - 22, 210, '#7dffa8', 5);
    teksPx(ctx, 'SAMA BUNDAR', x, 196, '#9fd8e8', 5);
  }
  function gambarBenangKelilingEmpat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    P(ctx, x - 34, 214, 22, 30, '#c8d8e0');
    P(ctx, x - 34, 224, 22, 8, '#e8788a');
    const lilit = (t * 40) % 28;
    P(ctx, x - 35, 215 + lilit, 24, 2, '#ffd166');
    P(ctx, x + 0, 240, 34, 2, '#a5d8ff');
    P(ctx, x, 236, 2, 6, '#a5d8ff');
    P(ctx, x + 32, 236, 2, 6, '#a5d8ff');
    teksPx(ctx, '44', x + 16, 228, '#a5d8ff', 6);
    teksPx(ctx, 'KELILING 44', x, 196, '#a5d8ff', 5);
  }
  function gambarLabelTerbentang(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    P(ctx, x - 36, 220, 14, 24, '#c8d8e0');
    P(ctx, x - 36, 226, 14, 8, '#e8788a');
    const denyut = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.55 + denyut * 0.45;
    P(ctx, x - 18, 224, 44, 14, '#f4e8d0');
    P(ctx, x - 18, 224, 44, 4, '#e8788a');
    ctx.globalAlpha = 1;
    teksPx(ctx, '44 SENTI', x + 4, 212, '#ffd166', 4);
    teksPx(ctx, 'PERSEGI PANJANG!', x, 196, '#ffe9a3', 5);
  }

  function gambarKertasGulungSelimut(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#4a4078');
    const gulung = 0.5 + 0.5 * Math.sin(t * 1.6);
    P(ctx, x - 32, 220, 26, 24, '#f4e8d0');
    P(ctx, x - 32, 220, 26, 2, '#d8c8a8');
    ctx.globalAlpha = 0.5 + gulung * 0.5;
    lingkaran(ctx, x + 20, 232, 12, '#f4e8d0');
    lingkaran(ctx, x + 20, 232, 7, '#e0d0b0');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'RATA = TABUNG', x, 196, '#ffe9a3', 5);
  }
  function gambarGulungDiBotol(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#4a4078');
    P(ctx, x - 8, 216, 20, 28, '#7dc8a0');
    P(ctx, x - 2, 208, 8, 8, '#7dc8a0');
    P(ctx, x - 8, 220, 20, 12, '#f4e8d0');
    P(ctx, x + 14, 216, 2, 28, '#ffd166');
    teksPx(ctx, '10', x + 20, 218, '#ffd166', 5);
    teksPx(ctx, 'LEBAR 44', x, 196, '#ffe9a3', 5);
  }
  function gambarPapanKelilingTinggi(x) {
    papanLebar(x, ['44 x 10', 'SELIMUT'], 78);
    lingkaran(ctx, x - 44, 236, 3, '#ffd166');
  }
  function gambarHitungSelimutEmpat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#4a4078');
    for (let b = 0; b < 5; b++)
      for (let k = 0; k < 10; k++)
        P(ctx, x - 30 + k * 6, 222 + b * 4.4, 5, 3.6, (k + b) % 2 ? '#f4e8d0' : '#e0d0b0');
    teksPx(ctx, '44 x 10 = 440', x, 206, '#ffd166', 5);
    const denyut = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.5 + denyut * 0.5;
    teksPx(ctx, '440', x, 196, '#7dffa8', 7);
    ctx.globalAlpha = 1;
  }

  function gambarTopiKerucutPasir(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#e0cc94');
    for (let i = 0; i < 10; i++)
      P(ctx, x - 26 + i * 1.3, 240 - i * 2.6, 26 - i * 2.6, 2.6, '#e8788a');
    P(ctx, x - 26, 238, 26, 3, '#c85a6e');
    teksPx(ctx, 'KERUCUT', x, 206, '#c85a6e', 5);
    teksPx(ctx, 'ISI PASIR', x, 196, '#a8683a', 5);
  }
  function gambarTabungPasirSama(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#e0cc94');
    P(ctx, x - 10, 214, 24, 28, '#c8a86a');
    P(ctx, x - 10, 212, 24, 3, '#a8884a');
    P(ctx, x - 8, 230, 20, 12, '#e8d4a0');
    teksPx(ctx, 'SAMA ALAS', x, 206, '#8a6a3a', 5);
    teksPx(ctx, 'SAMA TINGGI', x, 196, '#a8683a', 5);
  }
  function gambarTuangTigaCangkir(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#e0cc94');
    P(ctx, x - 6, 216, 26, 28, '#c8a86a');
    P(ctx, x - 6, 214, 26, 3, '#a8884a');
    const tahap = Math.floor(t / 1.6) % 4;
    const isi = [0, 9, 18, 27][tahap];
    if (isi > 0) P(ctx, x - 4, 242 - isi, 22, isi, '#e8d4a0');
    for (let i = 0; i < tahap; i++) lingkaran(ctx, x - 24, 236 - i * 9, 2.5, '#ffd166');
    teksPx(ctx, '1  2  3', x + 32, 224, '#c9971c', 6);
    teksPx(ctx, '3x PENUH!', x, 196, '#a8683a', 5);
  }
  function gambarBolaSepakTaman(x, t) {
    const bob = Math.sin(t * 2.2) * 2;
    P(ctx, x - 40, 244, 80, 3, '#e0cc94');
    lingkaran(ctx, x, 228 + bob, 13, '#fffdf2');
    lingkaran(ctx, x - 3, 224 + bob, 4, '#2a2a3a');
    lingkaran(ctx, x + 6, 230 + bob, 3, '#2a2a3a');
    lingkaran(ctx, x - 9, 232 + bob, 3, '#2a2a3a');
    lingkaran(ctx, x, 240 + bob, 2, '#2a2a3a');
    teksPx(ctx, 'BOLA', x, 196, '#5a4a30', 6);
  }

  function gambarKubusSepuluhSepuluh(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b4dcea');
    for (let b = 0; b < 5; b++)
      for (let k = 0; k < 5; k++)
        P(ctx, x - 25 + k * 10, 220 + b * 5, 9, 4.4, (k + b) % 2 ? '#a8d8e8' : '#c8ecf4');
    P(ctx, x - 27, 218, 54, 2, '#7aa8c0');
    teksPx(ctx, '10x10x10 = 1000', x, 196, '#1e5a7a', 5);
  }
  function gambarBotolLiterSatu(x, t) {
    const gel = 0.5 + 0.5 * Math.sin(t * 2);
    P(ctx, x - 40, 244, 80, 3, '#b4dcea');
    P(ctx, x - 10, 210, 20, 34, '#a8d8e8');
    P(ctx, x - 4, 202, 8, 8, '#a8d8e8');
    P(ctx, x - 4, 200, 8, 3, '#7aa8c0');
    P(ctx, x - 8, 218, 28, 2, '#1e5a7a');
    teksPx(ctx, '1L', x + 16, 214, '#1e5a7a', 5);
    ctx.globalAlpha = 0.4 + gel * 0.4;
    P(ctx, x - 8, 226, 16, 16, '#5ab8d8');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'SATU LITER', x, 196, '#1e5a7a', 5);
  }
  function gambarGelasBagiEmpat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b4dcea');
    for (let i = 0; i < 4; i++) {
      const penuh = Math.sin(t * 2 - i * 1.2) > 0;
      P(ctx, x - 30 + i * 16, 226, 12, 18, '#e8f6fc');
      if (penuh) P(ctx, x - 29 + i * 16, 232, 10, 11, '#5ab8d8');
    }
    teksPx(ctx, '4 x 250 = 1000', x, 206, '#1e5a7a', 4);
    teksPx(ctx, 'EMPAT GELAS', x, 196, '#1e5a7a', 5);
  }
  function gambarPapanLiterKubik(x) {
    papanLebar(x, ['1000 cm3', '= 1 LITER'], 84);
    lingkaran(ctx, x - 48, 236, 3, '#5ab8d8');
  }

  function gambarAkuariumTokoSore(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c8b090');
    P(ctx, x - 30, 214, 60, 30, '#a8e0e8');
    P(ctx, x - 28, 222, 56, 20, '#5ab8d8');
    for (let i = 0; i < 3; i++) {
      const ix = x - 20 + ((t * 14 + i * 40) % 44);
      P(ctx, ix, 228 + i * 5, 6, 3, '#ff9d6b');
      P(ctx, ix - 2, 228 + i * 5, 2, 3, '#ff8850');
    }
    teksPx(ctx, 'AKUARIUM', x, 196, '#8a5a3a', 6);
  }
  function gambarUkurAkuariumTigaSisi(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c8b090');
    P(ctx, x - 26, 218, 52, 26, '#a8e0e8');
    P(ctx, x - 24, 226, 48, 16, '#5ab8d8');
    P(ctx, x - 26, 242, 52, 2, '#ffd166');
    teksPx(ctx, '50', x, 234, '#ffd166', 5);
    P(ctx, x + 28, 218, 2, 26, '#7dffa8');
    teksPx(ctx, '40', x + 36, 218, '#7dffa8', 5);
    teksPx(ctx, '30', x, 208, '#a5d8ff', 5);
    teksPx(ctx, '50x30x40', x, 196, '#8a5a3a', 5);
  }
  function gambarEmberDuaPuluh(x, t) {
    const goyang = Math.sin(t * 3) * 1.5;
    P(ctx, x - 40, 244, 80, 3, '#c8b090');
    P(ctx, x - 16 + goyang, 220, 28, 24, '#8a9aa8');
    P(ctx, x - 14 + goyang, 228, 24, 14, '#5ab8d8');
    P(ctx, x - 18 + goyang, 218, 36, 3, '#6a7a88');
    teksPx(ctx, '20L', x + 28, 226, '#ffd166', 5);
    for (let i = 0; i < 3; i++) lingkaran(ctx, x - 34, 236 - i * 8, 2.5, '#ffd166');
    teksPx(ctx, '3 EMBER', x, 196, '#8a5a3a', 5);
  }
  function gambarBotolSatuSetengah(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c8b090');
    P(ctx, x - 6, 222, 14, 22, '#a8d8e8');
    P(ctx, x - 2, 216, 6, 6, '#a8d8e8');
    P(ctx, x - 2, 214, 6, 2, '#7aa8c0');
    P(ctx, x - 5, 230, 12, 12, '#5ab8d8');
    teksPx(ctx, '1,5L', x + 20, 228, '#ffd166', 5);
    teksPx(ctx, '40 BOTOL', x, 196, '#8a5a3a', 5);
  }

  function gambarGudangKardusMalam(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#424068');
    P(ctx, x - 34, 228, 22, 16, '#c8a06a');
    P(ctx, x - 30, 214, 18, 14, '#b8905a');
    P(ctx, x + 6, 232, 26, 12, '#c8a06a');
    P(ctx, x + 12, 220, 18, 12, '#b8905a');
    const nyala = Math.sin(t * 2.5) > 0;
    lingkaran(ctx, x - 44, 218, 3, nyala ? '#ffd166' : '#6a5a9a');
    lingkaran(ctx, x + 44, 218, 3, nyala ? '#6a5a9a' : '#ffd166');
    teksPx(ctx, 'GUDANG', x, 196, '#ffd166', 6);
  }
  function gambarMisiKardusTigaUkuran(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#424068');
    P(ctx, x - 38, 234, 22, 10, '#c8a06a');
    teksPx(ctx, 'A 24', x - 27, 222, '#e8dcc8', 4);
    P(ctx, x - 6, 236, 10, 8, '#b8905a');
    teksPx(ctx, 'B 8', x - 1, 224, '#e8dcc8', 4);
    P(ctx, x + 16, 230, 16, 14, '#d8b078');
    teksPx(ctx, 'C 27', x + 24, 218, '#ffd166', 4);
    teksPx(ctx, 'C JUARA', x, 196, '#ffe9a3', 5);
  }
  function gambarMisiKubusMuatKardus(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 2.6);
    P(ctx, x - 40, 244, 80, 3, '#424068');
    P(ctx, x - 20, 212, 36, 32, '#8a7aa8');
    P(ctx, x - 20, 212, 36, 2, '#a898c8');
    for (let l = 0; l < 2; l++)
      for (let k = 0; k < 2; k++)
        P(ctx, x - 16 + k * 18, 218 + l * 12, 14, 10, '#c8a06a');
    ctx.globalAlpha = 0.4 + denyut * 0.4;
    teksPx(ctx, '64:8 = 8 KARDUS', x, 196, '#7dffa8', 5);
    ctx.globalAlpha = 1;
  }
  function gambarMisiTangkiDanKado(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#424068');
    P(ctx, x - 30, 224, 24, 20, '#5ab8d8');
    P(ctx, x - 32, 222, 28, 3, '#3a7a9a');
    P(ctx, x - 28, 230, 20, 12, '#3a8ab8');
    teksPx(ctx, '60L', x - 18, 210, '#a5d8ff', 5);
    P(ctx, x + 8, 226, 22, 18, '#e8788a');
    P(ctx, x + 16, 226, 5, 18, '#ffd166');
    P(ctx, x + 8, 232, 22, 4, '#ffd166');
    lingkaran(ctx, x + 18, 224, 3, '#ffd166');
    teksPx(ctx, '150', x + 18, 210, '#ff9db8', 5);
    teksPx(ctx, 'MISI 4 & 5', x, 196, '#ffe9a3', 5);
  }

  function gambarPatokNolPersimpangan(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 2.4);
    P(ctx, x - 40, 244, 80, 3, '#8a9a68');
    P(ctx, x - 40, 226, 80, 2, '#a8b878');
    P(ctx, x - 1, 210, 3, 34, '#a8b878');
    P(ctx, x - 5, 236, 11, 8, '#8a6f4a');
    P(ctx, x - 4, 230, 9, 7, '#b8905a');
    ctx.globalAlpha = 0.6 + denyut * 0.4;
    teksPx(ctx, '0', x, 222, '#ffd166', 6);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'PATOK NOL', x, 196, '#7dffa8', 5);
  }
  function gambarPapanSumbuDuaArah(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    P(ctx, x - 30, 226, 24, 10, '#1e2a44');
    P(ctx, x - 19, 236, 3, 8, '#7a5230');
    teksPx(ctx, 'X', x - 18, 228, '#9fd8e8', 5);
    P(ctx, x + 6, 210, 22, 10, '#1e2a44');
    P(ctx, x + 16, 220, 3, 16, '#7a5230');
    teksPx(ctx, 'Y', x + 17, 212, '#ffd166', 5);
    const arah = Math.sin(t * 3) > 0 ? 1 : 0;
    if (arah) { P(ctx, x - 2, 230, 4, 2, '#9fd8e8'); P(ctx, x + 2, 229, 2, 4, '#9fd8e8'); }
    teksPx(ctx, 'DUA SUMBU', x, 196, '#ffe9a3', 5);
  }
  function gambarRumahTitikPertama(x, t) {
    const bob = Math.sin(t * 2) * 1;
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    P(ctx, x - 22, 218 + bob, 32, 26, '#d8b078');
    P(ctx, x - 26, 212 + bob, 40, 7, '#c85a4a');
    P(ctx, x - 12, 232 + bob, 9, 12, '#5a4430');
    P(ctx, x - 21, 224 + bob, 9, 8, '#ffd9a3');
    teksPx(ctx, '(3,2)', x + 26, 236, '#fffdf2', 5);
    teksPx(ctx, 'ALAMAT PERTAMA', x, 196, '#ff9db8', 5);
  }
  function gambarPapanJalanBertemu(x) {
    papanLebar(x, ['MULAI NOL', 'MAJU + NAIK'], 82);
    lingkaran(ctx, x - 51, 232, 3, '#7dffa8');
  }

  function gambarLantaiKotakHalaman(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    for (let b = 0; b < 4; b++)
      for (let k = 0; k < 5; k++)
        P(ctx, x - 36 + k * 16, 218 + b * 7, 15, 6, (k + b) % 2 ? '#c8cc94' : '#d8dca4');
    const gelap = Math.floor(t * 2) % 20;
    ctx.globalAlpha = 0.5 + 0.5 * Math.sin(t * 3);
    P(ctx, x - 4, 218 + 7 * Math.min(2, gelap), 15, 6, '#ffd166');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'LANTAI KOTAK', x, 196, '#c8cc94', 5);
  }
  function gambarLangkahTigaDua(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    for (let i = 0; i < 3; i++) P(ctx, x - 34 + i * 12, 238, 8, 4, '#9fd8e8');
    for (let i = 0; i < 2; i++) P(ctx, x - 2, 230 - i * 8, 8, 4, '#ffd166');
    P(ctx, x + 8, 220, 8, 8, '#ff9db8');
    teksPx(ctx, '(3,2)', x + 12, 210, '#ff9db8', 5);
    teksPx(ctx, '3 MAJU 2 NAIK', x, 196, '#ffe9a3', 5);
  }
  function gambarTitikTertukarDuaTiga(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    P(ctx, x - 28, 226, 18, 18, '#d8b078');
    P(ctx, x - 31, 222, 24, 5, '#c85a4a');
    P(ctx, x + 8, 214, 18, 30, '#b8905a');
    P(ctx, x + 5, 210, 24, 5, '#a86a4a');
    const kedip = 0.5 + 0.5 * Math.sin(t * 4);
    ctx.globalAlpha = 0.5 + kedip * 0.5;
    teksPx(ctx, 'BUKAN SAMA', x, 200, '#ff9db8', 5);
    ctx.globalAlpha = 1;
    teksPx(ctx, '(3,2) vs (2,3)', x, 190, '#ffd166', 5);
  }
  function gambarPapanXpuluhanY(x) {
    papanLebar(x, ['X DULU', 'Y KEMUDIAN'], 72);
    lingkaran(ctx, x + 46, 234, 3, '#ffd166');
  }

  function gambarAlunAlunDuaJalan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9a68');
    P(ctx, x - 40, 230, 80, 2, '#b89a76');
    P(ctx, x - 1, 208, 3, 36, '#b89a76');
    const denyut = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.5 + denyut * 0.5;
    teksPx(ctx, '4 DAERAH', x, 196, '#ffd166', 6);
    ctx.globalAlpha = 1;
  }
  function gambarLampuEmpatPojok(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    const tanda = ['(+,+)', '(-,+)', '(-,-)', '(+,-)'];
    const warna = ['#ffd166', '#9fd8e8', '#ff9db8', '#7dffa8'];
    for (let i = 0; i < 4; i++) {
      const lx = x - 30 + (i % 2) * 60, ly = 216 + Math.floor(i / 2) * 14;
      const nyala = Math.sin(t * 3 + i * 1.6) > 0;
      ctx.globalAlpha = nyala ? 1 : 0.45;
      P(ctx, lx, ly, 12, 8, warna[i]);
      ctx.globalAlpha = 1;
      teksPx(ctx, tanda[i], lx + 6, ly - 6, warna[i], 4);
    }
    teksPx(ctx, 'TANDA POJOK', x, 196, '#ffe9a3', 5);
  }
  function gambarKiosDaerahSatu(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    P(ctx, x - 20, 224, 36, 20, '#c8906a');
    P(ctx, x - 24, 218, 44, 7, '#a86a4a');
    P(ctx, x - 16, 230, 10, 14, '#5a4430');
    teksPx(ctx, '(3,2)', x + 22, 232, '#fffdf2', 5);
    teksPx(ctx, 'KIOS DAERAH 1', x, 196, '#ffd166', 5);
  }
  function gambarPapanTandaKuadran(x) {
    papanLebar(x, ['+ +   - +', '- -   + -'], 84);
    teksPx(ctx, 'DAERAH I-IV', x, 190, '#9fd8e8', 5);
  }

  function gambarPapanHitamGaleri(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3664');
    P(ctx, x - 34, 210, 68, 34, '#1e2a44');
    P(ctx, x - 34, 210, 68, 2, '#37476f');
    for (let i = 1; i < 5; i++) P(ctx, x - 34 + i * 13, 212, 1, 30, '#2a3a58');
    P(ctx, x - 34, 226, 68, 1, '#5a6a8a');
    P(ctx, x, 212, 1, 30, '#5a6a8a');
    const denyut = 0.5 + 0.5 * Math.sin(t * 2.2);
    ctx.globalAlpha = 0.5 + denyut * 0.5;
    teksPx(ctx, 'GALERI', x, 196, '#ffd166', 6);
    ctx.globalAlpha = 1;
  }
  function gambarKartuAlamatDuaLima(x, t) {
    const bob = Math.sin(t * 2) * 1;
    P(ctx, x - 40, 244, 80, 3, '#3a3664');
    P(ctx, x - 16, 218 + bob, 32, 22, '#f6ecd4');
    P(ctx, x - 12, 224 + bob, 24, 3, '#c85a4a');
    P(ctx, x - 12, 231 + bob, 18, 3, '#c85a4a');
    P(ctx, x - 1, 216 + bob, 3, 3, '#ffd166');
    teksPx(ctx, '(2,5)', x, 212, '#ffd166', 5);
    teksPx(ctx, 'KARTU 1', x, 196, '#ffe9a3', 5);
  }
  function gambarKartuMinusTigaEmpat(x, t) {
    const bob = Math.sin(t * 2.4) * 1;
    P(ctx, x - 40, 244, 80, 3, '#3a3664');
    P(ctx, x - 18, 220 + bob, 36, 20, '#f6ecd4');
    P(ctx, x - 14, 226 + bob, 28, 3, '#9fd8e8');
    P(ctx, x - 14, 233 + bob, 20, 3, '#9fd8e8');
    P(ctx, x - 1, 218 + bob, 3, 3, '#ffd166');
    teksPx(ctx, '(-3,4)', x, 214, '#9fd8e8', 5);
    teksPx(ctx, 'KARTU 2', x, 196, '#ffe9a3', 5);
  }
  function gambarKartuNolMinusDua(x, t) {
    const bob = Math.sin(t * 2.8) * 1;
    P(ctx, x - 40, 244, 80, 3, '#3a3664');
    P(ctx, x - 14, 222 + bob, 28, 18, '#f6ecd4');
    P(ctx, x - 10, 228 + bob, 20, 3, '#7dffa8');
    P(ctx, x - 10, 234 + bob, 14, 3, '#7dffa8');
    P(ctx, x - 1, 220 + bob, 3, 3, '#ffd166');
    teksPx(ctx, '(0,-2)', x, 216, '#7dffa8', 5);
    teksPx(ctx, 'DI SUMBU Y', x, 196, '#ffe9a3', 5);
  }

  function gambarTabelXyArsip(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    P(ctx, x - 22, 208, 44, 36, '#f6ecd4');
    P(ctx, x - 22, 214, 44, 1, '#a4b488');
    P(ctx, x - 1, 208, 1, 36, '#a4b488');
    teksPx(ctx, 'x  y', x, 202, '#6a8a4e', 5);
    teksPx(ctx, '1  2', x, 224, '#5a4430', 5);
    teksPx(ctx, '2  4', x, 231, '#5a4430', 5);
    teksPx(ctx, '3  6', x, 238, '#5a4430', 5);
    teksPx(ctx, 'y=2x', x + 32, 214, '#ffd166', 5);
    teksPx(ctx, 'TABEL SETIA', x, 196, '#ffe9a3', 5);
  }
  function gambarPakuTigaTitik(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    P(ctx, x - 30, 210, 60, 34, '#c8a06a');
    P(ctx, x - 30, 210, 60, 2, '#d8b078');
    for (let i = 1; i < 4; i++) P(ctx, x - 30 + i * 15, 212, 1, 30, '#b8905a');
    for (let i = 1; i < 3; i++) P(ctx, x - 29, 210 + i * 11, 60, 1, '#b8905a');
    const titik = [[-15, 12], [0, 1], [15, -10]];
    for (let i = 0; i < 3; i++) {
      const nyala = Math.sin(t * 3 + i * 2) > 0;
      lingkaran(ctx, x + titik[i][0], 226 + titik[i][1], 2.5, nyala ? '#ffd166' : '#ff9db8');
    }
    teksPx(ctx, '3 PAKU PAS', x, 196, '#ffe9a3', 5);
  }
  function gambarBenangTertarikLurus(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    P(ctx, x - 30, 210, 60, 34, '#c8a06a');
    P(ctx, x - 30, 210, 60, 2, '#d8b078');
    for (let i = 1; i < 4; i++) P(ctx, x - 30 + i * 15, 212, 1, 30, '#b8905a');
    lingkaran(ctx, x - 15, 238, 2.5, '#ff9db8');
    lingkaran(ctx, x, 227, 2.5, '#ff9db8');
    lingkaran(ctx, x + 15, 216, 2.5, '#ff9db8');
    const kilau = 0.5 + 0.5 * Math.sin(t * 4);
    ctx.globalAlpha = 0.6 + kilau * 0.4;
    P(ctx, x - 15, 236, 16, 1, '#ff6b6b');
    P(ctx, x, 226, 15, 1, '#ff6b6b');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'LURUS!', x, 200, '#ff9db8', 6);
    teksPx(ctx, 'BENANG TARIK', x, 190, '#ffe9a3', 5);
  }
  function gambarPapanGarisLahir(x) {
    papanLebar(x, ['TABEL', 'TITIK -> GARIS'], 80);
    lingkaran(ctx, x - 49, 234, 3, '#7dffa8');
  }

  function gambarTanggaCuramNaikDua(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    for (let i = 0; i < 4; i++) {
      const tx = x - 30 + i * 8, ty = 238 - i * 12;
      P(ctx, tx, ty, 8, 3, '#d8b078');
      P(ctx, tx, ty, 2, 12, '#a8824e');
    }
    P(ctx, x + 6, 186, 6, 60, '#c85a4a');
    teksPx(ctx, '2/1', x + 24, 210, '#a86a2a', 6);
    teksPx(ctx, 'SI CURAM', x, 196, '#c85a6e', 5);
  }
  function gambarTanggaLandaiNaikSatu(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    for (let i = 0; i < 4; i++) {
      const tx = x - 32 + i * 14, ty = 240 - i * 5;
      P(ctx, tx, ty, 10, 3, '#9fd8e8');
      P(ctx, tx, ty, 2, 8, '#6a9ab8');
    }
    teksPx(ctx, '1/1', x + 26, 218, '#9fd8e8', 6);
    teksPx(ctx, 'SI LANDAI', x, 196, '#7dffa8', 5);
  }
  function gambarPendakiDuaJalan(x, t) {
    P(ctx, x - 44, 244, 88, 3, '#5f4426');
    const naik = Math.abs(Math.sin(t * 3)) * 2;
    P(ctx, x - 26, 234 - naik, 6, 10, '#ffd166');
    lingkaran(ctx, x - 23, 232 - naik, 2.5, '#ffe9a3');
    P(ctx, x + 20, 238 - naik * 0.5, 6, 8, '#9fd8e8');
    lingkaran(ctx, x + 23, 236 - naik * 0.5, 2.5, '#c0ecfc');
    P(ctx, x - 6, 226, 3, 18, '#8a6f4a');
    P(ctx, x - 6, 226, 8, 4, '#7dffa8');
    teksPx(ctx, 'PUNCAK SAMA', x, 196, '#ffe9a3', 5);
  }
  function gambarPapanKemiringanDua(x) {
    papanLebar(x, ['NAIK : MAJU', '2/1 = 2'], 76);
    lingkaran(ctx, x - 47, 234, 3, '#ffd166');
  }

  function gambarPapanWaktuJarakPos(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3664');
    P(ctx, x - 30, 206, 60, 38, '#1e2a44');
    P(ctx, x - 30, 206, 60, 2, '#37476f');
    P(ctx, x - 26, 238, 52, 1, '#5a6a8a');
    P(ctx, x - 26, 210, 1, 28, '#5a6a8a');
    const denyut = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.6 + denyut * 0.4;
    P(ctx, x - 26, 232, 14, 1, '#ffd166');
    P(ctx, x - 12, 232, 6, 1, '#ffd166');
    P(ctx, x - 6, 224, 10, 8, '#3a5a8a');
    P(ctx, x - 6, 224, 10, 1, '#ffd166');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'WAKTU-JARAK', x, 196, '#ffe9a3', 5);
  }
  function gambarGarisDatarBerhenti(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3664');
    P(ctx, x - 30, 226, 60, 2, '#ffd166');
    P(ctx, x + 14, 214, 10, 12, '#c8906a');
    P(ctx, x + 11, 211, 16, 4, '#a86a4a');
    const asapWarung = Math.abs(Math.sin(t * 2));
    ctx.globalAlpha = 0.4 + asapWarung * 0.4;
    P(ctx, x + 18, 208, 2, 3, '#e8e2ff');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'DATAR = BERHENTI', x, 196, '#ff9db8', 5);
  }
  function gambarGarisMiringMelaju(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3664');
    P(ctx, x - 26, 242, 3, 3, '#ffd166');
    P(ctx, x - 23, 236, 3, 3, '#ffd166');
    P(ctx, x - 20, 230, 3, 3, '#ffd166');
    P(ctx, x - 17, 224, 3, 3, '#ffd166');
    P(ctx, x - 14, 218, 3, 3, '#ffd166');
    P(ctx, x - 11, 212, 3, 3, '#ffd166');
    const lari = Math.sin(t * 6) * 1.5;
    P(ctx, x + 12, 220 + lari, 6, 12, '#9fd8e8');
    lingkaran(ctx, x + 15, 218 + lari, 2.5, '#c0ecfc');
    teksPx(ctx, 'MIRING = MELAJU', x, 196, '#7dffa8', 5);
  }
  function gambarPapanCeritaPerjalanan(x) {
    papanLebar(x, ['BACA GARIS', 'TANPA KATA'], 76);
    lingkaran(ctx, x + 47, 234, 3, '#9fd8e8');
  }

  function gambarGerbangSumbuYSenja(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 2);
    P(ctx, x - 40, 244, 80, 3, '#8a6f4a');
    P(ctx, x - 2, 198, 4, 46, '#7a5a44');
    P(ctx, x - 14, 202, 28, 6, '#93745a');
    P(ctx, x - 8, 212, 16, 8, '#a8824e');
    ctx.globalAlpha = 0.45 + denyut * 0.3;
    teksPx(ctx, 'SUMBU Y', x - 20, 186, '#ffe9a3', 5);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'GERBANG AWAL', x, 200, '#c85a6e', 5);
  }
  function gambarTitikAwalNolEmpat(x, t) {
    const bob = Math.sin(t * 2.6) * 1;
    P(ctx, x - 40, 244, 80, 3, '#8a6f4a');
    P(ctx, x - 1, 200, 3, 44, '#b89a76');
    P(ctx, x - 6, 222 + bob, 12, 8, '#ffd166');
    teksPx(ctx, '(0,4)', x + 16, 224 + bob, '#ffd166', 5);
    teksPx(ctx, 'ALAMAT AWAL', x, 196, '#ffe9a3', 5);
  }
  function gambarGarisLewatGerbang(x, t) {
    const kilau = 0.5 + 0.5 * Math.sin(t * 3.4);
    P(ctx, x - 40, 244, 80, 3, '#8a6f4a');
    P(ctx, x - 1, 200, 3, 44, '#b89a76');
    for (let i = 0; i < 5; i++) {
      P(ctx, x - 28 + i * 12, 240 - i * 8, 4, 3, i === 2 ? '#ffd166' : '#7dffa8');
    }
    ctx.globalAlpha = 0.5 + kilau * 0.5;
    teksPx(ctx, '(0,4)', x - 22, 214, '#ffd166', 5);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'SELALU MAMPIR', x, 196, '#9fd8e8', 5);
  }
  function gambarPapanRumahAwal(x) {
    papanLebar(x, ['X = 0', 'RUMAH AWAL'], 74);
    lingkaran(ctx, x - 46, 234, 3, '#ffd166');
  }

  function gambarTaliGridTaman(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#7d9a58');
    P(ctx, x - 30, 210, 60, 34, '#88a868');
    for (let i = 1; i < 4; i++) P(ctx, x - 30 + i * 15, 210, 1, 34, '#f0f4dc');
    for (let i = 1; i < 3; i++) P(ctx, x - 30, 210 + i * 11, 60, 1, '#f0f4dc');
    P(ctx, x - 2, 210, 2, 34, '#ffd166');
    P(ctx, x - 30, 226, 60, 2, '#ffd166');
    teksPx(ctx, 'KISI TALI', x, 196, '#7dffa8', 5);
  }
  function gambarPetaTamanKertas(x, t) {
    const bob = Math.sin(t * 2) * 1;
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    P(ctx, x - 18, 214 + bob, 36, 28, '#f6ecd4');
    for (let i = 1; i < 4; i++) P(ctx, x - 18 + i * 9, 216 + bob, 1, 24, '#c8b88c');
    for (let i = 1; i < 3; i++) P(ctx, x - 17, 215 + bob + i * 9, 34, 1, '#c8b88c');
    teksPx(ctx, '5,3', x + 24, 220 + bob, '#c85a4a', 5);
    lingkaran(ctx, x + 9, 226 + bob, 2, '#c85a4a');
    teksPx(ctx, 'PETA ALAMAT', x, 196, '#ffe9a3', 5);
  }
  function gambarBenderaXMerah(x, t) {
    const kibar = Math.sin(t * 4) * 2;
    P(ctx, x - 40, 244, 80, 3, '#7d9a58');
    P(ctx, x - 1, 200, 3, 44, '#7a5230');
    P(ctx, x + 2, 202 + kibar * 0.2, 18, 5, '#c85a4a');
    P(ctx, x + 2, 207 + kibar * 0.2, 18, 5, '#a8424a');
    teksPx(ctx, 'X', x + 9, 209 + kibar * 0.2, '#ffe9a3', 5);
    teksPx(ctx, 'X DITEMUKAN!', x, 196, '#7dffa8', 5);
  }
  function gambarPetiHartaTeralamat(x, t) {
    const denyut = 0.5 + 0.5 * Math.sin(t * 3);
    P(ctx, x - 40, 244, 80, 3, '#7d9a58');
    P(ctx, x - 20, 226, 32, 18, '#8a6f4a');
    P(ctx, x - 22, 220, 36, 7, '#a8824e');
    P(ctx, x - 6, 220, 4, 24, '#ffd166');
    ctx.globalAlpha = 0.5 + denyut * 0.5;
    teksPx(ctx, '!', x + 20, 216, '#ffd166', 6);
    ctx.globalAlpha = 1;
    P(ctx, x + 26, 230, 3, 14, '#8a6f4a');
    P(ctx, x + 24, 242, 7, 3, '#9aa6b8');
    teksPx(ctx, 'JURNAL HITUNG', x, 196, '#ffe9a3', 5);
  }

  function gambarMenaraSinyalLima(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3664');
    P(ctx, x - 3, 196, 6, 48, '#4a4078');
    P(ctx, x - 14, 192, 28, 6, '#4a4078');
    for (let i = 0; i < 5; i++) {
      const nyala = Math.floor(t * 2.5) % 5 === i;
      const lx = x - 20 + i * 10;
      ctx.globalAlpha = nyala ? 1 : 0.35;
      lingkaran(ctx, lx, 184, 3, '#ffd166');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, '5 LAMPION', x, 196, '#ffe9a3', 5);
  }
  function gambarMisiTandaiEmpatDua(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3664');
    P(ctx, x - 28, 210, 56, 32, '#1e2a44');
    for (let i = 1; i < 5; i++) P(ctx, x - 28 + i * 11, 212, 1, 28, '#2a3a58');
    for (let i = 1; i < 3; i++) P(ctx, x - 27, 210 + i * 11, 54, 1, '#2a3a58');
    P(ctx, x + 12, 216, 5, 5, '#7dffa8');
    const nyala = 0.5 + 0.5 * Math.sin(t * 4);
    ctx.globalAlpha = 0.5 + nyala * 0.5;
    lingkaran(ctx, x - 6, 227, 2.5, '#ffd166');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'TANDAI & BACA', x, 196, '#ffe9a3', 5);
  }
  function gambarMisiKuadranSinyal(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3664');
    P(ctx, x - 26, 208, 52, 34, '#1e2a44');
    P(ctx, x - 26, 224, 52, 1, '#5a6a8a');
    P(ctx, x - 1, 210, 1, 30, '#5a6a8a');
    const kedip = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.4 + kedip * 0.6;
    lingkaran(ctx, x - 14, 234, 2.5, '#ff9db8');
    ctx.globalAlpha = 1;
    teksPx(ctx, '(-3,-2)', x + 8, 238, '#ff9db8', 5);
    teksPx(ctx, 'DAERAH MANA?', x, 196, '#ffd166', 5);
  }
  function gambarMisiGarisTabelAkhir(x, t) {
    const kilau = 0.5 + 0.5 * Math.sin(t * 3.2);
    P(ctx, x - 40, 244, 80, 3, '#3a3664');
    P(ctx, x - 26, 208, 52, 34, '#1e2a44');
    P(ctx, x - 26, 236, 52, 1, '#5a6a8a');
    P(ctx, x - 26, 210, 1, 26, '#5a6a8a');
    for (let i = 0; i < 4; i++) {
      lingkaran(ctx, x - 22 + i * 12, 234 - i * 6, 2, '#7dffa8');
    }
    ctx.globalAlpha = 0.6 + kilau * 0.4;
    P(ctx, x - 22, 232, 34, 1, '#ffd166');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'y=x+1', x + 20, 214, '#ffd166', 5);
    teksPx(ctx, 'GARIS AKHIR', x, 196, '#7dffa8', 5);
  }

  function gambarKandangBurungPagi(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9a68');
    P(ctx, x - 22, 212, 44, 32, '#c8a878');
    P(ctx, x - 26, 206, 52, 7, '#a8845a');
    P(ctx, x - 8, 226, 16, 18, '#8a6a48');
    const burung = Math.sin(t * 3) > 0;
    if (burung) {
      P(ctx, x + 26, 214, 5, 4, '#4a7fc0');
      P(ctx, x + 31, 212, 3, 3, '#4a7fc0');
      P(ctx, x + 24, 216 - Math.sin(t * 6) * 2, 5, 2, '#9fd8e8');
    }
    P(ctx, x - 2, 240, 6, 4, '#d8b078');
    teksPx(ctx, 'BERAPA BURUNG?', x, 196, '#1e6a3a', 5);
  }
  function gambarPapanCatatTujuhHari(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    P(ctx, x - 30, 208, 60, 30, '#1e2a44');
    P(ctx, x - 30, 208, 60, 2, '#37476f');
    const angka = ['2', '5', '3', '5', '6', '5', '4'];
    for (let i = 0; i < 7; i++) {
      const hidup = Math.floor(t * 2) % 7 === i;
      ctx.globalAlpha = hidup ? 1 : 0.55;
      teksPx(ctx, angka[i], x - 27 + i * 9, 220, hidup ? '#ffd166' : '#fffdf2', 5);
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, '7 HARI', x, 236, '#9fd8e8', 4);
    teksPx(ctx, 'PAPAN CATAT', x, 196, '#8a6a2a', 5);
  }
  function gambarBarisanAngkaKunjungan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    const angka = ['2', '5', '3', '5', '6', '5', '4'];
    for (let i = 0; i < 7; i++) {
      const kartu = x - 35 + i * 10;
      const lima = angka[i] === '5';
      const nyala = lima ? 0.5 + 0.5 * Math.sin(t * 4) : 0;
      P(ctx, kartu, 218, 8, 12, lima ? '#ffd166' : '#3a4a68');
      ctx.globalAlpha = nyala * 0.7;
      P(ctx, kartu + 1, 219, 6, 10, '#fffdf2');
      ctx.globalAlpha = 1;
      teksPx(ctx, angka[i], kartu + 4, 221, lima ? '#1e2a44' : '#fffdf2', 5);
    }
    teksPx(ctx, '5 MUNCUL 3 KALI', x, 196, '#8a5a1a', 5);
  }
  function gambarPapanPertanyaanSama(x) {
    papanLebar(x, ['PERTANYAAN', 'SAMA DIULANG'], 78);
    lingkaran(ctx, x - 46, 230, 3, '#7dffa8');
    lingkaran(ctx, x + 46, 230, 3, '#7dffa8');
  }

  function gambarGelasTigaBedatinggi(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    const h = [3, 4, 5];
    for (let i = 0; i < 3; i++) {
      const gx = x - 26 + i * 20;
      P(ctx, gx, 240 - h[i] * 4, 12, h[i] * 4, '#a5d8ff');
      P(ctx, gx - 1, 238 - h[i] * 4, 14, 3, '#e8f4fa');
      P(ctx, gx - 1, 238 - h[i] * 4, 2, h[i] * 4 + 5, '#e8f4fa');
      P(ctx, gx + 11, 238 - h[i] * 4, 2, h[i] * 4 + 5, '#e8f4fa');
      teksPx(ctx, String(h[i]), gx + 6, 244 - h[i] * 4 - 8, '#9fd8e8', 4);
    }
    teksPx(ctx, 'TAK SAMA TINGGI', x, 196, '#2a6a8a', 5);
  }
  function gambarTekoTampungSemua(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    P(ctx, x - 14, 220, 28, 20, '#d8b078');
    P(ctx, x + 14, 224, 8, 4, '#d8b078');
    P(ctx, x - 16, 218, 10, 4, '#d8b078');
    P(ctx, x - 12, 226, 24, 4, '#b8905a');
    const denyut = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.5 + denyut * 0.5;
    teksPx(ctx, '12', x, 206, '#ffd166', 8);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'GABUNG SEMUA', x, 196, '#2a6a8a', 5);
  }
  function gambarGelasTigaRataEmpat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    for (let i = 0; i < 3; i++) {
      const gx = x - 26 + i * 20;
      P(ctx, gx, 224, 12, 16, '#a5d8ff');
      P(ctx, gx - 1, 222, 14, 3, '#e8f4fa');
      P(ctx, gx - 1, 222, 2, 21, '#e8f4fa');
      P(ctx, gx + 11, 222, 2, 21, '#e8f4fa');
      teksPx(ctx, '4', gx + 6, 210, '#7dffa8', 5);
    }
    const kilau = 0.5 + 0.5 * Math.sin(t * 3.4);
    ctx.globalAlpha = 0.5 + kilau * 0.5;
    teksPx(ctx, 'SAMA TINGGI!', x, 196, '#1e6a3a', 6);
    ctx.globalAlpha = 1;
  }
  function gambarPapanCaraMean(x) {
    papanLebar(x, ['JUMLAH SEMUA', 'BAGI BANYAK'], 84);
    lingkaran(ctx, x + 50, 232, 3, '#ffd166');
  }

  function gambarBatuLimaBersusun(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9a68');
    const u = [4, 5, 6, 8, 12];
    for (let i = 0; i < 5; i++) {
      const bx = x - 32 + i * 14;
      P(ctx, bx, 240 - u[i], 12, u[i], '#b8a488');
      P(ctx, bx, 240 - u[i], 12, 2, '#d8c8a8');
      teksPx(ctx, String(u[i]), bx + 6, 236 - u[i], '#8a7a60', 4);
    }
    teksPx(ctx, 'KECIL KE BESAR', x, 196, '#a86a2a', 5);
  }
  function gambarBatuKetigaTengah(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9a68');
    const u = [4, 5, 6, 8, 12];
    for (let i = 0; i < 5; i++) {
      const bx = x - 32 + i * 14;
      P(ctx, bx, 240 - u[i], 12, u[i], i === 2 ? '#ffd166' : '#b8a488');
      P(ctx, bx, 240 - u[i], 12, 2, i === 2 ? '#fffdf2' : '#d8c8a8');
    }
    const kilau = 0.5 + 0.5 * Math.sin(t * 3.2);
    ctx.globalAlpha = 0.5 + kilau * 0.5;
    teksPx(ctx, 'TENGAH = 6', x + 2, 218, '#ffd166', 6);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'MEDIAN', x, 196, '#a86a2a', 5);
  }
  function gambarUjungPergiTengahTetap(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9a68');
    const u = [4, 5, 6, 8, 100];
    for (let i = 0; i < 5; i++) {
      const bx = x - 36 + i * 16;
      P(ctx, bx, 240 - Math.min(u[i], 26), Math.min(12, 6 + u[i] / 8), Math.min(u[i], 26), i === 2 ? '#ffd166' : (i === 4 ? '#c85a4a' : '#b8a488'));
    }
    const kedip = 0.5 + 0.5 * Math.sin(t * 4);
    ctx.globalAlpha = 0.5 + kedip * 0.5;
    teksPx(ctx, 'TETAP 6!', x - 18, 206, '#1e6a3a', 6);
    ctx.globalAlpha = 1;
    teksPx(ctx, '100 DI UJUNG', x + 22, 196, '#c85a4a', 5);
  }
  function gambarPapanMedianAman(x) {
    papanLebar(x, ['SUSUN DULU', 'TUNJUK TENGAH'], 82);
    lingkaran(ctx, x - 48, 228, 3, '#ffd166');
  }

  function gambarRakSandalSembilan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    P(ctx, x - 30, 212, 60, 3, '#8a6a48');
    const tumpuk = [5, 3, 1];
    const warna = ['#c85a4a', '#4a7fc0', '#d8b84a'];
    for (let g = 0; g < 3; g++) {
      const gx = x - 26 + g * 24;
      for (let i = 0; i < tumpuk[g]; i++) P(ctx, gx, 210 - i * 6, 16, 5, warna[g]);
    }
    teksPx(ctx, '5-3-1', x + 34, 226, '#fffdf2', 5);
    teksPx(ctx, '9 SANDAL', x, 196, '#8a6a2a', 5);
  }
  function gambarSandalMerahTumpuk(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    for (let i = 0; i < 5; i++) {
      const nyala = i === 4 ? 0.5 + 0.5 * Math.sin(t * 4) : 0;
      P(ctx, x - 8, 214 - i * 6, 16, 5, '#c85a4a');
      ctx.globalAlpha = nyala;
      P(ctx, x - 7, 215 - i * 6, 14, 3, '#ff9db8');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'JUARA!', x + 14, 196 - 24, '#ffd166', 6);
    teksPx(ctx, 'MERAH = 5', x, 196, '#a83a4a', 5);
  }
  function gambarDuaWarnaSisa(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    for (let i = 0; i < 3; i++) P(ctx, x - 24, 226 - i * 6, 16, 5, '#4a7fc0');
    for (let i = 0; i < 1; i++) P(ctx, x + 8, 232 - i * 6, 16, 5, '#d8b84a');
    teksPx(ctx, '3', x - 16, 210, '#9fd8e8', 5);
    teksPx(ctx, '1', x + 16, 224, '#ffe9a3', 5);
    const kedip = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.4 + kedip * 0.6;
    teksPx(ctx, 'JUJUR DIHITUNG', x, 196, '#2a6a8a', 5);
    ctx.globalAlpha = 1;
  }
  function gambarPapanModusJawara(x) {
    papanLebar(x, ['PALING SERING', 'ITULAH MODUS'], 86);
    lingkaran(ctx, x + 50, 230, 3, '#ff9db8');
  }

  function gambarTongkatPanenTiga(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9a68');
    const tinggi = [6, 3, 9];
    const nama = ['MANGGA', 'JAMBU', 'PISANG'];
    for (let i = 0; i < 3; i++) {
      const bx = x - 26 + i * 24;
      P(ctx, bx, 240 - tinggi[i] * 2, 10, tinggi[i] * 2, i === 2 ? '#7dffa8' : '#b8905a');
      teksPx(ctx, nama[i], bx + 5, 246, i === 2 ? '#7dffa8' : '#a8824e', 4);
    }
    teksPx(ctx, 'PANEN HARI INI', x, 196, '#5a7a2a', 5);
  }
  function gambarBatangPisangSembilan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9a68');
    P(ctx, x - 6, 222, 12, 18, '#7dffa8');
    const panah = Math.sin(t * 3) * 2;
    P(ctx, x + 12, 216 + panah, 4, 2, '#ffd166');
    P(ctx, x + 14, 218 + panah, 3, 2, '#ffd166');
    P(ctx, x + 14, 214 + panah, 3, 2, '#ffd166');
    teksPx(ctx, '9', x, 214, '#ffd166', 8);
    teksPx(ctx, 'PISANG MENJULANG', x, 196, '#1e6a3a', 5);
  }
  function gambarBatangJambuTerpendek(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9a68');
    P(ctx, x - 20, 234, 10, 6, '#c85a4a');
    P(ctx, x + 10, 222, 12, 18, '#7dffa8');
    const kedip = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.5 + kedip * 0.5;
    teksPx(ctx, '9 = 3 x 3', x, 208, '#8a5a1a', 6);
    ctx.globalAlpha = 1;
    teksPx(ctx, '3 KALI LIPAT!', x, 196, '#6a4a1a', 5);
  }
  function gambarPapanBacaSekali(x) {
    papanLebar(x, ['SEKALI PANDANG', 'JUARA TERBACA'], 88);
    lingkaran(ctx, x - 52, 230, 3, '#7dffa8');
  }

  function gambarKertasSuhuLimaTitik(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#a8886a');
    P(ctx, x - 28, 204, 56, 34, '#f8fcf4');
    const titik = [20, 24, 28, 26, 22];
    for (let i = 0; i < 5; i++) {
      const tx = x - 24 + i * 12;
      const ty = 232 - (titik[i] - 18) * 0.8;
      const hidup = Math.floor(t * 2) % 5 === i;
      lingkaran(ctx, tx, ty, hidup ? 2.5 : 1.5, hidup ? '#ffd166' : '#c85a4a');
    }
    teksPx(ctx, '20 24 28 26 22', x, 196, '#c85a4a', 5);
  }
  function gambarGarisSuhuNaik(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#a8886a');
    P(ctx, x - 26, 238, 52, 1, '#8a7a60');
    for (let i = 0; i < 3; i++) {
      lingkaran(ctx, x - 20 + i * 20, 234 - i * 8, 2, '#ffd166');
    }
    const kilau = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.5 + kilau * 0.5;
    P(ctx, x - 20, 232, 20, 1, '#ff9d6b');
    P(ctx, x, 224, 20, 1, '#ff9d6b');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'MAKIN PANAS', x, 196, '#b85a2a', 5);
  }
  function gambarGarisSuhuTurun(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#a8886a');
    P(ctx, x - 26, 238, 52, 1, '#8a7a60');
    for (let i = 0; i < 3; i++) {
      lingkaran(ctx, x - 20 + i * 20, 216 + i * 8, 2, '#9fd8e8');
    }
    const kilau = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.5 + kilau * 0.5;
    P(ctx, x - 20, 218, 20, 1, '#9fd8e8');
    P(ctx, x, 226, 20, 1, '#9fd8e8');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'MAKIN SEJUK', x, 196, '#9fd8e8', 5);
  }
  function gambarPapanDenyutData(x) {
    papanLebar(x, ['NAIK-TURUN', 'SUDAH TERJADI'], 84);
    lingkaran(ctx, x + 48, 234, 3, '#9fd8e8');
  }

  function gambarKueBulatPestaMalam(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    lingkaran(ctx, x, 226, 16, '#f2d8a8');
    lingkaran(ctx, x, 226, 12, '#fff0d8');
    for (let i = 0; i < 5; i++) {
      const sudut = i * 1.256 + t * 1.2;
      const lx = x + Math.cos(sudut) * 9, ly = 226 + Math.sin(sudut) * 9;
      const nyala = Math.sin(t * 5 + i) > 0;
      P(ctx, lx - 1, ly - 4, 2, 5, nyala ? '#ffd166' : '#c85a4a');
    }
    teksPx(ctx, '10 ANAK', x, 196, '#ffe9a3', 5);
  }
  function gambarIrisanCoklatEmpat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    lingkaran(ctx, x, 226, 15, '#f2d8a8');
    lingkaran(ctx, x, 226, 12, '#8a5a38');
    lingkaran(ctx, x + 8, 220, 6, '#f2d8a8');
    const kilau = 0.5 + 0.5 * Math.sin(t * 3.6);
    ctx.globalAlpha = 0.5 + kilau * 0.5;
    teksPx(ctx, '40%', x + 22, 220, '#ffd166', 7);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'IRISAN TERLEBAR', x, 196, '#ffd166', 5);
  }
  function gambarIrisanStroberiVanila(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    lingkaran(ctx, x - 14, 226, 11, '#ff9db8');
    lingkaran(ctx, x + 14, 226, 11, '#fff0d8');
    teksPx(ctx, '30%', x - 14, 206, '#ff9db8', 5);
    teksPx(ctx, '30%', x + 14, 206, '#fffdf2', 5);
    const kembar = 0.5 + 0.5 * Math.sin(t * 2.8);
    ctx.globalAlpha = 0.4 + kembar * 0.6;
    teksPx(ctx, 'KEMBAR SAMA BESAR', x, 196, '#ffe9a3', 5);
    ctx.globalAlpha = 1;
  }
  function gambarPapanPenuhSeratus(x) {
    papanLebar(x, ['40+30+30', '= 100 PERSEN'], 80);
    lingkaran(ctx, x - 46, 232, 3, '#ffd166');
  }

  function gambarGeraiBuahPagi(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    P(ctx, x - 24, 218, 44, 8, '#c8a878');
    P(ctx, x - 22, 226, 4, 18, '#8a6a48');
    P(ctx, x + 14, 226, 4, 18, '#8a6a48');
    P(ctx, x - 28, 204, 52, 8, '#e8d0a8');
    const buah = ['#ffd166', '#c85a4a', '#7dffa8'];
    for (let i = 0; i < 3; i++) lingkaran(ctx, x - 14 + i * 14, 215, 4, buah[i]);
    teksPx(ctx, 'GERAI PAGI', x, 196, '#8a6a2a', 5);
  }
  function gambarRakBarisKolom(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    P(ctx, x - 24, 208, 48, 34, '#1e2a44');
    for (let b = 0; b < 4; b++)
      for (let k = 0; k < 3; k++) {
        const hidup = Math.floor(t * 2) % 12 === b * 3 + k;
        P(ctx, x - 22 + k * 15, 211 + b * 8, 13, 6, hidup ? '#ffd166' : '#2a3a58');
      }
    teksPx(ctx, '4x3 = 12 KOTAK', x, 196, '#2a6a8a', 5);
  }
  function gambarPapanTabelPanen(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5f4426');
    P(ctx, x - 28, 206, 56, 36, '#f8fcf4');
    const isi = [[4, 2, 1], [3, 5, 2], [5, 1, 4], [2, 2, 3]];
    const nyalaKol = Math.floor(t) % 2 === 0;
    for (let b = 0; b < 4; b++)
      for (let k = 0; k < 3; k++)
        teksPx(ctx, String(isi[b][k]), x - 16 + k * 14, 212 + b * 8, k === 0 && nyalaKol ? '#c85a4a' : '#3a4a68', 5);
    teksPx(ctx, 'MANGGA 14 JUARA', x, 196, '#c85a4a', 5);
  }
  function gambarPapanBacaJudulDulu(x) {
    papanLebar(x, ['JUDUL DULU', 'ISI KEMUDIAN'], 82);
    lingkaran(ctx, x - 48, 232, 3, '#ffd166');
  }

  function gambarLadangKompakTujuh(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9a68');
    const t1 = [6, 7, 8];
    for (let i = 0; i < 3; i++) {
      const tx = x - 22 + i * 20;
      P(ctx, tx, 240 - t1[i] * 1.6, 6, t1[i] * 1.6, '#5a9058');
      P(ctx, tx - 3, 238 - t1[i] * 1.6, 12, 4, '#7dffa8');
    }
    teksPx(ctx, '6-7-8', x, 212, '#7dffa8', 5);
    teksPx(ctx, 'LADANG KOMPAK', x, 196, '#5a7a2a', 5);
  }
  function gambarLadangMenyebarTujuh(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9a68');
    const t2 = [1, 7, 13];
    for (let i = 0; i < 3; i++) {
      const tx = x - 26 + i * 24;
      P(ctx, tx, 240 - t2[i] * 1.8, 6, t2[i] * 1.8, '#c85a4a');
      P(ctx, tx - 3, 238 - t2[i] * 1.8, 12, 4, '#ffd166');
    }
    teksPx(ctx, '1-7-13', x, 214, '#8a5a1a', 5);
    const kedip = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.4 + kedip * 0.6;
    teksPx(ctx, 'MENYEBAR!', x, 196, '#a83a4a', 6);
    ctx.globalAlpha = 1;
  }
  function gambarGarisUkurRentang(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9a68');
    P(ctx, x - 30, 232, 24, 2, '#7dffa8');
    teksPx(ctx, '2', x - 18, 224, '#7dffa8', 6);
    P(ctx, x + 6, 232, 30, 2, '#ff9db8');
    teksPx(ctx, '12', x + 21, 224, '#ff9db8', 6);
    const kilau = 0.5 + 0.5 * Math.sin(t * 3.2);
    ctx.globalAlpha = 0.5 + kilau * 0.5;
    teksPx(ctx, 'UKUR JAUH-DEKAT', x, 196, '#8a5a1a', 5);
    ctx.globalAlpha = 1;
  }
  function gambarPapanRataSamaBeda(x) {
    papanLebar(x, ['RATA SAMA', 'RENTANG BEDA'], 82);
    lingkaran(ctx, x + 48, 230, 3, '#7dffa8');
  }

  function gambarBalaiRisetLentera(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    P(ctx, x - 30, 222, 60, 6, '#4a4078');
    P(ctx, x - 28, 228, 4, 16, '#3a3464');
    P(ctx, x + 24, 228, 4, 16, '#3a3464');
    for (let i = 0; i < 3; i++) {
      const nyala = Math.sin(t * 3 + i * 2) > 0;
      P(ctx, x - 18 + i * 18, 214, 6, 8, nyala ? '#ffe9a3' : '#8a7a60');
      ctx.globalAlpha = 0.1;
      if (nyala) lingkaran(ctx, x - 15 + i * 18, 218, 7, '#ffe9a3');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'BALAI RISET', x, 196, '#ffe9a3', 5);
  }
  function gambarPapanDataLimaHari(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    P(ctx, x - 28, 210, 56, 30, '#1e2a44');
    const d = ['3', '5', '5', '7', '10'];
    for (let i = 0; i < 5; i++) {
      const hidup = Math.floor(t * 2) % 5 === i;
      ctx.globalAlpha = hidup ? 1 : 0.6;
      teksPx(ctx, d[i], x - 22 + i * 11, 222, hidup ? '#ffd166' : '#cdd9f5', 6);
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'DATA 5 HARI', x, 200, '#9fd8e8', 5);
  }
  function gambarMisiTotalMeanEnam(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    papanLebar(x, ['30 : 5 = 6'], 58);
    const kilau = 0.5 + 0.5 * Math.sin(t * 3.4);
    ctx.globalAlpha = 0.5 + kilau * 0.5;
    teksPx(ctx, 'RATA-RATA 6', x, 198, '#7dffa8', 5);
    ctx.globalAlpha = 1;
  }
  function gambarMisiMedianModus(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    papanLebar(x, ['TENGAH 5', 'MODUS 5'], 62);
    const kedip = 0.5 + 0.5 * Math.sin(t * 3.6);
    ctx.globalAlpha = 0.5 + kedip * 0.5;
    teksPx(ctx, '5-5 MENANG', x, 198, '#ffd166', 5);
    ctx.globalAlpha = 1;
  }
  function gambarMisiRentangTujuh(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    papanLebar(x, ['10 - 3 = 7'], 58);
    const kilau = 0.5 + 0.5 * Math.sin(t * 3.2);
    ctx.globalAlpha = 0.5 + kilau * 0.5;
    teksPx(ctx, 'RENTANG 7', x, 198, '#ff9db8', 5);
    ctx.globalAlpha = 1;
  }

  function gambarGerbangGarisNolSatu(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9a68');
    P(ctx, x - 30, 196, 8, 48, '#9a8a6a');
    P(ctx, x + 22, 196, 8, 48, '#9a8a6a');
    P(ctx, x - 30, 190, 60, 7, '#b0a080');
    const al = 0.55 + 0.35 * Math.sin(t * 2.4);
    ctx.globalAlpha = al;
    P(ctx, x - 22, 200, 44, 2, '#ffd166');
    ctx.globalAlpha = 1;
    teksPx(ctx, '0', x - 26, 206, '#1e6a3a', 5);
    teksPx(ctx, '1', x + 23, 206, '#1e6a3a', 5);
    teksPx(ctx, 'GARIS 0-1', x, 182, '#1e6a3a', 5);
  }
  function gambarPenandaMustahil(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9a68');
    P(ctx, x - 3, 216, 5, 28, '#7a5230');
    P(ctx, x - 24, 202, 48, 16, '#1e2a44');
    teksPx(ctx, 'MUSTAHIL', x, 207, '#fffdf2', 5);
    const ikan = Math.sin(t * 1.6);
    P(ctx, x + 26, 226 - Math.abs(ikan) * 0, 8, 5, '#4a7fc0');
    P(ctx, x + 32, 228, 4, 3, '#4a7fc0');
    P(ctx, x + 34, 214 + Math.sin(t * 5) * 1, 2, 2, '#7db8e0');
    teksPx(ctx, 'IKAN TAK TERBANG', x, 190, '#1e6a3a', 5);
  }
  function gambarPenandaPasti(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9a68');
    P(ctx, x - 3, 216, 5, 28, '#7a5230');
    P(ctx, x - 20, 202, 40, 16, '#1e2a44');
    teksPx(ctx, 'PASTI', x, 207, '#ffd166', 5);
    const naik = 0.5 + 0.5 * Math.sin(t * 2);
    ctx.globalAlpha = 0.6 + naik * 0.4;
    lingkaran(ctx, x + 28, 222, 6, '#ffd166');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'MATAHARI TIMUR', x, 190, '#1e6a3a', 5);
  }
  function gambarDuniaDiAntara(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9a68');
    P(ctx, x - 34, 208, 68, 2, '#7a6a4a');
    lingkaran(ctx, x - 34, 209, 2.5, '#c85a6e');
    lingkaran(ctx, x + 34, 209, 2.5, '#2aa85e');
    const denyut = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.5 + denyut * 0.5;
    lingkaran(ctx, x, 209, 3.5, '#ffd166');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'DUNIA MUNGKIN', x, 188, '#1e6a3a', 5);
    teksPx(ctx, 'DI ANTARA', x, 196, '#8a6a2a', 5);
  }

  function gambarKoinLemparKapten(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a4a');
    const putar = Math.abs(Math.sin(t * 4));
    P(ctx, x - 1 - 7 * putar, 206, 2 + 14 * putar, 14, '#ffd166');
    P(ctx, x - 1 - 5 * putar, 208 + 4 * (1 - putar), 2 + 10 * putar, 6, '#ffe9a3');
    P(ctx, x - 30, 226, 10, 16, '#4a7fc0');
    P(ctx, x + 20, 226, 10, 16, '#c85a6e');
    lingkaran(ctx, x - 25, 222, 5, '#fffdf2');
    lingkaran(ctx, x + 25, 222, 5, '#fffdf2');
    teksPx(ctx, 'LEMPAR KOIN!', x, 188, '#1e6a3a', 5);
  }
  function gambarSisiAngkaGambar(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a4a');
    P(ctx, x - 22, 208, 20, 20, '#ffd166');
    teksPx(ctx, 'A', x - 12, 214, '#8a6a2a', 7);
    P(ctx, x + 2, 208, 20, 20, '#ffe9a3');
    lingkaran(ctx, x + 12, 217, 5, '#c85a6e');
    teksPx(ctx, 'G', x + 12, 214, '#8a6a2a', 7);
    const al = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.5 + al * 0.5;
    teksPx(ctx, 'DUA SISI', x, 190, '#1e6a3a', 5);
    ctx.globalAlpha = 1;
  }
  function gambarPapanAdilDua(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a4a');
    P(ctx, x - 3, 214, 5, 30, '#7a5230');
    P(ctx, x - 28, 198, 56, 18, '#1e2a44');
    teksPx(ctx, '1 DARI 2', x, 204, '#ffd166', 5);
    const al = 0.5 + 0.5 * Math.sin(t * 2.2);
    ctx.globalAlpha = 0.5 + al * 0.5;
    teksPx(ctx, 'ADIL DUA PIHAK', x, 184, '#1e6a3a', 5);
    ctx.globalAlpha = 1;
  }
  function gambarDuaTimSetara(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a4a');
    P(ctx, x - 30, 214, 26, 14, '#4a7fc0');
    P(ctx, x + 4, 214, 26, 14, '#c85a6e');
    lingkaran(ctx, x - 17, 206, 6, '#fffdf2');
    lingkaran(ctx, x + 17, 206, 6, '#fffdf2');
    const timbang = Math.sin(t * 2.4) * 1.5;
    P(ctx, x - 1, 196, 2, 8, '#7a5230');
    P(ctx, x - 10, 194 + timbang, 20, 2, '#7a5230');
    teksPx(ctx, 'SETIMBANG', x, 182, '#1e6a3a', 5);
  }

  function gambarPapanUlarTangga(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    P(ctx, x - 28, 206, 56, 34, '#1e2a44');
    for (let i = 1; i < 5; i++) P(ctx, x - 28 + i * 11, 208, 1, 30, '#2a3a58');
    for (let i = 1; i < 3; i++) P(ctx, x - 27, 206 + i * 11, 54, 1, '#2a3a58');
    P(ctx, x - 6, 222, 12, 2, '#7dffa8');
    P(ctx, x + 4, 226, 6, 2, '#7dffa8');
    P(ctx, x - 20, 212, 8, 2, '#ffd166');
    P(ctx, x - 14, 218, 8, 2, '#ffd166');
    teksPx(ctx, 'ULAR TANGGA', x, 196, '#ffe9a3', 5);
  }
  function gambarDaduEnamSisi(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    P(ctx, x - 14, 210, 28, 28, '#fffdf2');
    P(ctx, x - 14, 210, 28, 2, '#e8e8e0');
    const gilir = Math.floor(t * 2) % 6 + 1;
    const titik = { 1: [[0, 0]], 2: [[-6, -6], [6, 6]], 3: [[-6, -6], [0, 0], [6, 6]],
      4: [[-6, -6], [6, -6], [-6, 6], [6, 6]], 5: [[-6, -6], [6, -6], [0, 0], [-6, 6], [6, 6]],
      6: [[-6, -6], [6, -6], [-6, 0], [6, 0], [-6, 6], [6, 6]] }[gilir];
    for (const [dx, dy] of titik) lingkaran(ctx, x + dx, 224 + dy, 2.2, '#2a3757');
    teksPx(ctx, 'SISI ' + gilir, x, 198, '#ffe9a3', 5);
  }
  function gambarEnamKemungkinan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    for (let i = 0; i < 6; i++) {
      const al = Math.floor(t * 2) % 6 === i ? 1 : 0.55;
      ctx.globalAlpha = al;
      P(ctx, x - 30 + i * 10, 214, 8, 20, '#ffd166');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, '6 x 1/6 = 1', x, 200, '#7dffa8', 5);
    teksPx(ctx, 'ENAM KEMUNGKINAN', x, 190, '#ffe9a3', 5);
  }
  function gambarPapanMainAdil(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    P(ctx, x - 3, 216, 5, 28, '#4a4078');
    papanLebar(x, ['MAIN ADIL', 'TANPA TARUHAN'], 66);
    const al = 0.5 + 0.5 * Math.sin(t * 2.8);
    ctx.globalAlpha = 0.5 + al * 0.5;
    teksPx(ctx, 'KELUARGA BERSAMA', x, 186, '#ffe9a3', 5);
    ctx.globalAlpha = 1;
  }

  function gambarMatahariTimurPasti(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b8906a');
    const naik = 0.5 + 0.5 * Math.sin(t * 1.8);
    lingkaran(ctx, x, 220 - naik * 8, 11, '#ffb86b');
    lingkaran(ctx, x, 220 - naik * 8, 8, '#ffd166');
    P(ctx, x - 34, 236, 68, 8, '#a8785a');
    teksPx(ctx, 'TIMUR', x + 24, 226, '#5a3a24', 5);
    teksPx(ctx, 'PELUANG 1', x, 196, '#8a5a3a', 5);
  }
  function gambarKoinBerdiriSulit(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b8906a');
    P(ctx, x - 18, 232, 36, 10, '#c8b898');
    const goyang = Math.sin(t * 5) * 0.6;
    P(ctx, x - 2 + goyang, 210, 4, 22, '#ffd166');
    P(ctx, x - 1 + goyang, 212, 2, 18, '#ffe9a3');
    teksPx(ctx, 'HAMPIR MUSTAHIL', x, 196, '#8a5a3a', 5);
    teksPx(ctx, 'PELUANG 0', x, 188, '#8a5a3a', 5);
  }
  function gambarGarisDuaUjung(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b8906a');
    P(ctx, x - 34, 218, 68, 2, '#7a6a4a');
    const al = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.6 + al * 0.4;
    lingkaran(ctx, x - 34, 219, 3, '#c85a6e');
    lingkaran(ctx, x + 34, 219, 3, '#2aa85e');
    ctx.globalAlpha = 1;
    teksPx(ctx, '0', x - 37, 224, '#8a5a3a', 5);
    teksPx(ctx, '1', x + 32, 224, '#8a5a3a', 5);
    lingkaran(ctx, x, 219, 2.5, '#ffd166');
    teksPx(ctx, 'DUA UJUNG', x, 196, '#8a5a3a', 5);
  }
  function gambarPapanAntaranya(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b8906a');
    P(ctx, x - 3, 216, 5, 28, '#7a5230');
    P(ctx, x - 30, 200, 60, 18, '#1e2a44');
    teksPx(ctx, '0 ... 1', x, 206, '#ffd166', 5);
    teksPx(ctx, 'HIJAU DI TENGAH', x, 194, '#2aa85e', 5);
    teksPx(ctx, 'KENALI UJUNGNYA', x, 186, '#8a5a3a', 5);
  }

  function gambarRodaPutarFestival(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#a8845a');
    lingkaran(ctx, x, 216, 26, '#8a6a4a');
    lingkaran(ctx, x, 216, 23, '#f8e8c8');
    const sudut = t * 1.2;
    for (let i = 0; i < 8; i++) {
      const a0 = sudut + i * Math.PI / 4, a1 = a0 + Math.PI / 4;
      const warna = i % 4 === 3 ? '#4a7fc0' : '#c85a6e';
      ctx.beginPath();
      ctx.moveTo(x, 216);
      ctx.arc(x, 216, 22, a0, a1);
      ctx.closePath();
      ctx.fillStyle = warna;
      ctx.globalAlpha = 0.85;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    lingkaran(ctx, x, 216, 4, '#8a6a4a');
    P(ctx, x - 2, 216, 4, 30, '#8a6a4a');
    teksPx(ctx, 'PUTAR!', x, 182, '#a85a3a', 5);
  }
  function gambarIrisanMerahLebar(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#a8845a');
    const al = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.65 + al * 0.35;
    ctx.beginPath();
    ctx.moveTo(x, 222);
    ctx.arc(x, 222, 24, 0, Math.PI * 1.5);
    ctx.closePath();
    ctx.fillStyle = '#c85a6e';
    ctx.fill();
    ctx.globalAlpha = 1;
    teksPx(ctx, 'MERAH 3/4', x, 196, '#a85a3a', 5);
  }
  function gambarIrisanBiruSempit(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#a8845a');
    ctx.beginPath();
    ctx.moveTo(x, 222);
    ctx.arc(x, 222, 24, 0, Math.PI * 0.5);
    ctx.closePath();
    ctx.fillStyle = '#4a7fc0';
    ctx.fill();
    const kedip = 0.5 + 0.5 * Math.sin(t * 3.4);
    ctx.globalAlpha = 0.5 + kedip * 0.5;
    teksPx(ctx, 'BIRU 1/4', x + 14, 228, '#d8e8f8', 5);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'LANGKA TAPI MUNGKIN', x, 196, '#a85a3a', 5);
  }
  function gambarPapanLuasIrisan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#a8845a');
    P(ctx, x - 3, 216, 5, 28, '#7a5230');
    papanLebar(x, ['LUAS =', 'PELUANG'], 56);
    const al = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.5 + al * 0.5;
    teksPx(ctx, 'ATUR IRISANNYA', x, 186, '#a85a3a', 5);
    ctx.globalAlpha = 1;
  }

  function gambarKantongKelerengEmpat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a5a');
    P(ctx, x - 14, 212, 28, 24, '#c8a878');
    P(ctx, x - 10, 208, 20, 6, '#a8845a');
    const goyang = Math.sin(t * 3) * 1;
    P(ctx, x - 14 + goyang, 212, 28, 2, '#b89868');
    for (let i = 0; i < 4; i++) lingkaran(ctx, x - 9 + i * 6, 238, 2.5, i < 3 ? '#c85a6e' : '#4a7fc0');
    teksPx(ctx, '3 MERAH 1 BIRU', x, 196, '#1e6a3a', 5);
  }
  function gambarKelerengMerahTiga(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a5a');
    for (let i = 0; i < 3; i++) {
      const al = 0.6 + 0.4 * Math.sin(t * 3 + i * 2);
      ctx.globalAlpha = al;
      lingkaran(ctx, x - 16 + i * 16, 222, 7, '#c85a6e');
      lingkaran(ctx, x - 18 + i * 16, 220, 2.5, '#e88a9a');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'MERAH 3/4', x, 198, '#a83a4a', 5);
    teksPx(ctx, 'SERING MENDAMPINGI', x, 190, '#1e6a3a', 5);
  }
  function gambarKelerengBiruSatu(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a5a');
    const al = 0.6 + 0.4 * Math.sin(t * 3.6);
    ctx.globalAlpha = al;
    lingkaran(ctx, x, 222, 7, '#4a7fc0');
    lingkaran(ctx, x - 2, 220, 2.5, '#a8d0f0');
    ctx.globalAlpha = 1;
    P(ctx, x - 12, 228, 24, 2, '#c9a763');
    teksPx(ctx, 'BIRU 1/4', x, 198, '#d8e8f8', 5);
    teksPx(ctx, 'LANGKA ISTIMEWA', x, 190, '#1e6a3a', 5);
  }
  function gambarPapanTigaPerEmpat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a5a');
    P(ctx, x - 3, 216, 5, 28, '#7a5230');
    papanLebar(x, ['3/4 + 1/4', '= 1'], 52);
    const al = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.5 + al * 0.5;
    teksPx(ctx, 'HITUNG ISINYA', x, 190, '#1e6a3a', 5);
    ctx.globalAlpha = 1;
  }

  function gambarPapanSemuaPecahan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9a68');
    P(ctx, x - 30, 202, 60, 30, '#1e2a44');
    P(ctx, x - 30, 202, 60, 2, '#37476f');
    P(ctx, x - 24, 216, 48, 1, '#5a6a8a');
    lingkaran(ctx, x - 24, 216.5, 2, '#c85a6e');
    lingkaran(ctx, x + 24, 216.5, 2, '#2aa85e');
    const kedip = 0.5 + 0.5 * Math.sin(t * 2.8);
    ctx.globalAlpha = 0.5 + kedip * 0.5;
    lingkaran(ctx, x - 8, 216.5, 2, '#ffd166');
    lingkaran(ctx, x + 8, 216.5, 2, '#7dffa8');
    ctx.globalAlpha = 1;
    teksPx(ctx, '0 ----- 1', x, 224, '#9fd8e8', 5);
    teksPx(ctx, 'SEMUA PECAHAN', x, 192, '#1e6a3a', 5);
  }
  function gambarKelerengEnamIsi(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9a68');
    P(ctx, x - 16, 214, 32, 22, '#c8a878');
    for (let i = 0; i < 2; i++) lingkaran(ctx, x - 8 + i * 8, 222, 3, '#c85a6e');
    for (let i = 0; i < 4; i++) lingkaran(ctx, x - 12 + i * 8, 232, 3, '#4a7fc0');
    teksPx(ctx, '2 MERAH 4 BIRU', x, 198, '#1e6a3a', 5);
    teksPx(ctx, '2/6 + 4/6', x, 190, '#8a6a2a', 5);
  }
  function gambarJumlahSelaluSatu(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9a68');
    P(ctx, x - 10, 208, 20, 24, '#2aa85e');
    P(ctx, x - 10, 208, 20, 3, '#7dffa8');
    P(ctx, x - 2, 208, 3, 24, '#7dffa8');
    const al = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.5 + al * 0.5;
    teksPx(ctx, 'TEPAT SATU', x, 196, '#1e6a3a', 5);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'TAK LEBIH TAK KURANG', x, 188, '#8a6a2a', 5);
  }
  function gambarKoinSetengahSetengah(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9a68');
    P(ctx, x - 18, 212, 18, 18, '#ffd166');
    P(ctx, x - 18, 221, 18, 9, '#ffe9a3');
    P(ctx, x + 2, 212, 18, 18, '#ffe9a3');
    P(ctx, x + 2, 212, 9, 18, '#ffd166');
    teksPx(ctx, '1/2', x - 9, 217, '#8a6a2a', 5);
    teksPx(ctx, '+1/2', x + 11, 217, '#8a6a2a', 5);
    teksPx(ctx, 'PAGAR 0-1', x, 196, '#1e6a3a', 5);
  }

  function gambarDuaKoinLempar(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#a8845a');
    const p1 = Math.abs(Math.sin(t * 3.2)), p2 = Math.abs(Math.cos(t * 2.7));
    P(ctx, x - 12 - 5 * p1, 206, 2 + 10 * p1, 10, '#ffd166');
    P(ctx, x + 6 - 5 * p2, 212, 2 + 10 * p2, 10, '#ffe9a3');
    P(ctx, x - 22, 230, 16, 8, '#4a7fc0');
    P(ctx, x + 8, 230, 16, 8, '#c85a6e');
    teksPx(ctx, 'DUA KOIN!', x, 194, '#8a5a3a', 5);
  }
  function gambarDaftarEmpatHasil(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#a8845a');
    P(ctx, x - 18, 202, 36, 36, '#f8f0dc');
    const daftar = ['A-A', 'A-G', 'G-A', 'G-G'];
    for (let i = 0; i < 4; i++) {
      const al = Math.floor(t * 2) % 4 === i ? 1 : 0.6;
      ctx.globalAlpha = al;
      teksPx(ctx, daftar[i], x - 10, 206 + i * 8, '#8a5a3a', 5);
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'EMPAT HASIL!', x, 194, '#a85a3a', 5);
  }
  function gambarHasilCampurDua(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#a8845a');
    P(ctx, x - 28, 210, 18, 18, '#ffd166');
    teksPx(ctx, '1/4', x - 19, 215, '#8a6a2a', 5);
    P(ctx, x - 4, 206, 18, 22, '#7dffa8');
    teksPx(ctx, '2/4', x + 5, 213, '#1e6a3a', 7);
    P(ctx, x + 20, 210, 18, 18, '#ffe9a3');
    teksPx(ctx, '1/4', x + 29, 215, '#8a6a2a', 5);
    teksPx(ctx, 'CAMPUR 2X LIPAT', x, 196, '#a85a3a', 5);
  }
  function gambarPapanDaftarDulu(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#a8845a');
    P(ctx, x - 3, 216, 5, 28, '#7a5230');
    papanLebar(x, ['DAFTAR DULU', 'HITUNG KEMUDIAN'], 70);
    const al = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.5 + al * 0.5;
    teksPx(ctx, 'JURUS EMAS', x, 186, '#a85a3a', 5);
    ctx.globalAlpha = 1;
  }

  function gambarLangitAwanGelap(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#7a8a6a');
    P(ctx, x - 30, 202, 44, 12, '#5a6a7a');
    P(ctx, x - 18, 196, 24, 8, '#5a6a7a');
    P(ctx, x + 18, 208, 30, 10, '#4e5e6e');
    const tetes = Math.sin(t * 6);
    for (let i = 0; i < 3; i++) P(ctx, x - 20 + i * 18, 220 + (tetes + i) % 1 * 14, 1, 4, '#a5d8ff');
    teksPx(ctx, 'MENDUNG', x, 188, '#3a4a5a', 5);
  }
  function gambarSepuluhLangitLalu(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#7a8a6a');
    P(ctx, x - 32, 210, 64, 26, '#1e2a44');
    P(ctx, x - 32, 210, 64, 2, '#37476f');
    for (let i = 0; i < 10; i++) {
      const hujan = i < 8;
      const al = Math.floor(t * 2) % 10 === i ? 1 : 0.7;
      ctx.globalAlpha = al;
      P(ctx, x - 30 + i * 6, 216, 5, 12, hujan ? '#4a7fc0' : '#ffd166');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, '8 DARI 10', x, 234, '#9fd8e8', 5);
    teksPx(ctx, 'CATATAN JUJUR', x, 194, '#3a4a5a', 5);
  }
  function gambarPayungSiapSedia(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#7a8a6a');
    P(ctx, x - 1, 216, 2, 22, '#7a5230');
    ctx.beginPath();
    ctx.arc(x, 216, 16, Math.PI, 0);
    ctx.closePath();
    ctx.fillStyle = '#c85a6e';
    ctx.fill();
    P(ctx, x - 16, 214, 32, 2, '#a83a4a');
    const al = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.5 + al * 0.5;
    teksPx(ctx, 'BAWA PAYUNG', x, 194, '#3a4a5a', 5);
    ctx.globalAlpha = 1;
  }
  function gambarPapanBacaTanda(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#7a8a6a');
    P(ctx, x - 3, 216, 5, 28, '#7a5230');
    papanLebar(x, ['BACA TANDA', 'BUKAN MENJANJI-'], 72);
    const al = 0.5 + 0.5 * Math.sin(t * 2.2);
    ctx.globalAlpha = 0.5 + al * 0.5;
    teksPx(ctx, 'HITUNGAN ALAT', x, 186, '#3a4a5a', 5);
    ctx.globalAlpha = 1;
  }

  function gambarBalaiJuaraPeluang(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    P(ctx, x - 26, 200, 52, 40, '#2e2850');
    P(ctx, x - 30, 194, 60, 8, '#4a4078');
    for (let i = 0; i < 5; i++) {
      const nyala = Math.floor(t * 2.5) % 5 === i;
      ctx.globalAlpha = nyala ? 1 : 0.4;
      lingkaran(ctx, x - 20 + i * 10, 210, 3, '#ffd166');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'BALAI JUARA', x, 184, '#ffe9a3', 5);
  }
  function gambarMisiKoinDua(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    P(ctx, x - 16, 214, 14, 14, '#ffd166');
    teksPx(ctx, '1/2', x - 9, 218, '#8a6a2a', 5);
    P(ctx, x + 4, 212, 16, 16, '#fffdf2');
    lingkaran(ctx, x + 12, 220, 2.2, '#2a3757');
    teksPx(ctx, '1/6', x + 12, 232, '#ffe9a3', 5);
    const al = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.5 + al * 0.5;
    teksPx(ctx, 'MISI 1-2', x, 198, '#7dffa8', 5);
    ctx.globalAlpha = 1;
  }
  function gambarMisiRodaBiru(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    ctx.beginPath();
    ctx.moveTo(x, 222);
    ctx.arc(x, 222, 18, 0, Math.PI * 1.5);
    ctx.closePath();
    ctx.fillStyle = '#c85a6e';
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x, 222);
    ctx.arc(x, 222, 18, 0, Math.PI * 0.5);
    ctx.closePath();
    ctx.fillStyle = '#4a7fc0';
    ctx.fill();
    lingkaran(ctx, x, 222, 3, '#2e2850');
    teksPx(ctx, '1/4 + 3/4', x, 198, '#ffe9a3', 5);
  }
  function gambarMisiKelerengLima(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    P(ctx, x - 14, 214, 28, 20, '#c8a878');
    for (let i = 0; i < 2; i++) lingkaran(ctx, x - 7 + i * 8, 221, 2.5, '#c85a6e');
    for (let i = 0; i < 3; i++) lingkaran(ctx, x - 10 + i * 8, 230, 2.5, '#4a7fc0');
    teksPx(ctx, '2/5 + 3/5', x, 200, '#ffe9a3', 5);
    teksPx(ctx, 'MISI 4', x, 192, '#7dffa8', 5);
  }
  function gambarMisiDuaKoinSeperempat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    P(ctx, x - 20, 206, 34, 30, '#f8f0dc');
    teksPx(ctx, 'A-A', x - 16, 210, '#8a5a3a', 5);
    teksPx(ctx, 'A-G', x - 2, 210, '#8a5a3a', 5);
    teksPx(ctx, 'G-A', x - 16, 220, '#8a5a3a', 5);
    teksPx(ctx, 'G-G', x - 2, 220, '#8a5a3a', 5);
    teksPx(ctx, '1/4', x - 12, 230, '#a83a4a', 5);
    teksPx(ctx, 'DUA ANGKA', x + 20, 216, '#ffd166', 5);
    teksPx(ctx, 'MISI 5', x, 196, '#7dffa8', 5);
  }

  function gambarMesinKotakEmas(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a58');
    P(ctx, x - 14, 200, 28, 30, '#d9a832');
    P(ctx, x - 12, 202, 24, 3, '#f2cc66');
    P(ctx, x - 8, 192, 16, 9, '#b8882a');
    P(ctx, x - 5, 186, 10, 7, '#d9a832');
    P(ctx, x - 4, 230, 8, 6, '#b8882a');
    const uap = Math.sin(t * 3.2);
    ctx.globalAlpha = 0.5 + uap * 0.3;
    lingkaran(ctx, x - 2, 182 + uap * 2, 3, '#fff8e0');
    lingkaran(ctx, x + 4, 178 + uap * 3, 2, '#fff8e0');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'MESIN FUNGSI', x, 170, '#5a4020', 5);
  }
  function gambarCorongMasukAngka(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a58');
    P(ctx, x - 12, 214, 24, 8, '#b8882a');
    for (let i = 0; i < 3; i++) P(ctx, x - 8 + i * 7, 222 - i * 2, 4, 6 + i * 2, '#d9a832');
    P(ctx, x - 3, 234, 6, 10, '#8a6a24');
    const jatuh = Math.abs(Math.sin(t * 2.6));
    teksPx(ctx, '3', x, 208 + jatuh * 4, '#c85a2a', 7);
    teksPx(ctx, 'MASUKAN', x, 188, '#5a4020', 5);
  }
  function gambarMulutKeluarEnam(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a58');
    P(ctx, x - 26, 214, 22, 18, '#b8882a');
    P(ctx, x - 4, 222, 8, 10, '#6a4e18');
    const luncur = Math.abs(Math.sin(t * 2.2));
    teksPx(ctx, '6', x + 12 + luncur * 10, 218, '#c85a2a', 8);
    ctx.globalAlpha = 0.4 + 0.3 * Math.sin(t * 4);
    lingkaran(ctx, x + 8, 226, 2, '#ffd166');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'KELUARAN 6', x, 190, '#5a4020', 5);
  }
  function gambarPapanMesinTetap(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a58');
    P(ctx, x - 3, 214, 5, 30, '#7a5230');
    P(ctx, x - 27, 196, 54, 18, '#1e2a44');
    teksPx(ctx, 'ATURAN', x, 200, '#ffd166', 5);
    teksPx(ctx, 'TETAP', x, 208, '#fffdf2', 5);
    const al = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.4 + al * 0.4;
    teksPx(ctx, 'SAMA MASUK = SAMA HASIL', x, 184, '#8a6a2a', 5);
    ctx.globalAlpha = 1;
  }

  function gambarMejaPercobaanPintar(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a58');
    P(ctx, x - 22, 216, 44, 5, '#a8845a');
    P(ctx, x - 19, 221, 4, 23, '#8a6a44');
    P(ctx, x + 15, 221, 4, 23, '#8a6a44');
    P(ctx, x - 8, 200, 16, 16, '#4a7fc0');
    P(ctx, x - 6, 202, 12, 3, '#7db8e0');
    const al = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.5 + al * 0.5;
    teksPx(ctx, 'f', x, 205, '#ffd166', 8);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'MESIN NAMANYA f', x, 186, '#2a5a3a', 5);
  }
  function gambarKartuMasukX(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a58');
    P(ctx, x - 10, 196, 20, 24, '#f8f0dc');
    teksPx(ctx, 'x', x, 203, '#2a3a58', 8);
    const turun = Math.abs(Math.sin(t * 2.4));
    P(ctx, x - 1, 224 + turun * 4, 3, 8, '#c85a2a');
    P(ctx, x - 4, 230 + turun * 4, 9, 3, '#c85a2a');
    teksPx(ctx, 'KARTU MASUK', x, 186, '#2a5a3a', 5);
  }
  function gambarKartuKeluarFx(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a58');
    P(ctx, x - 16, 200, 32, 22, '#f8f0dc');
    teksPx(ctx, 'f(3)=6', x, 206, '#2a3a58', 6);
    const al = 0.5 + 0.5 * Math.sin(t * 3.4);
    ctx.globalAlpha = 0.5 + al * 0.5;
    lingkaran(ctx, x, 196, 2.5, '#ffd166');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'f DARI 3', x, 188, '#2a5a3a', 5);
  }
  function gambarPapanBukanKali(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a58');
    P(ctx, x - 3, 214, 5, 30, '#7a5230');
    P(ctx, x - 28, 198, 56, 18, '#1e2a44');
    teksPx(ctx, 'BUKAN', x, 201, '#ff9d9d', 5);
    teksPx(ctx, 'KALI', x, 209, '#ff9d9d', 5);
    teksPx(ctx, 'NAMA HASIL MESIN', x, 184, '#2a5a3a', 5);
  }

  function gambarMesinGandakanDua(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a58');
    P(ctx, x - 15, 202, 30, 28, '#4a7fc0');
    P(ctx, x - 12, 205, 24, 4, '#7db8e0');
    P(ctx, x - 12, 214, 24, 10, '#1e2a44');
    teksPx(ctx, 'X2', x, 216, '#ffd166', 7);
    const dengung = Math.sin(t * 5);
    ctx.globalAlpha = 0.35 + dengung * 0.2;
    lingkaran(ctx, x + 18, 210, 4, '#fffdf2');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'MESIN KALI DUA', x, 186, '#6a4a20', 5);
  }
  function gambarTigaMasukEnamKeluar(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a58');
    P(ctx, x - 24, 208, 16, 16, '#f8f0dc');
    teksPx(ctx, '3', x - 16, 211, '#2a3a58', 7);
    P(ctx, x + 8, 208, 16, 16, '#f8f0dc');
    teksPx(ctx, '6', x + 16, 211, '#c85a2a', 7);
    const al = 0.5 + 0.5 * Math.sin(t * 3.6);
    P(ctx, x - 5, 215, 11, 2, '#2aa85e');
    ctx.globalAlpha = 0.4 + al * 0.6;
    P(ctx, x + 4, 212, 2, 2, '#2aa85e');
    P(ctx, x + 4, 218, 2, 2, '#2aa85e');
    P(ctx, x + 6, 215, 2, 6, '#2aa85e');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'MASUK 3 KELUAR 6', x, 190, '#6a4a20', 5);
  }
  function gambarDeretKeluaranTali(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a58');
    P(ctx, x - 34, 200, 68, 2, '#7a5230');
    for (let i = 0; i < 4; i++) {
      const al = 0.4 + 0.3 * Math.sin(t * 2.6 + i * 1.2);
      ctx.globalAlpha = 0.6 + al * 0.4;
      P(ctx, x - 30 + i * 17, 202, 13, 14, '#f8f0dc');
      ctx.globalAlpha = 1;
      teksPx(ctx, String(2 * (i + 1)), x - 24 + i * 17, 205, '#c85a2a', 6);
      P(ctx, x - 24 + i * 17, 218, 1, 6, '#7a5230');
    }
    teksPx(ctx, '2 4 6 8', x, 186, '#6a4a20', 5);
  }
  function gambarPapanAturanTetap(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a58');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 22, 194, 44, 20, '#1e2a44');
    teksPx(ctx, 'y = 2x', x, 200, '#ffd166', 7);
    const al = 0.5 + 0.5 * Math.sin(t * 2.2);
    ctx.globalAlpha = 0.4 + al * 0.4;
    teksPx(ctx, 'RUMUS MESIN', x, 182, '#6a4a20', 5);
    ctx.globalAlpha = 1;
  }

  function gambarMejaTabelDuaKolom(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    P(ctx, x - 24, 206, 48, 26, '#f8f0dc');
    P(ctx, x - 24, 206, 48, 3, '#a8845a');
    P(ctx, x - 1, 206, 2, 26, '#a8845a');
    for (let i = 0; i < 2; i++) P(ctx, x - 23, 214 + i * 8, 46, 1, '#d8c8a8');
    teksPx(ctx, 'x', x - 12, 209, '#2a3a58', 5);
    teksPx(ctx, 'y', x + 11, 209, '#c85a2a', 5);
    const al = 0.5 + 0.5 * Math.sin(t * 2.8);
    ctx.globalAlpha = 0.5 + al * 0.5;
    lingkaran(ctx, x + 30, 200, 3, '#ffd166');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'TABEL PASANGAN', x, 186, '#ffe9a3', 5);
  }
  function gambarPasanganSatuTiga(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    P(ctx, x - 15, 204, 30, 22, '#f8f0dc');
    teksPx(ctx, '(1,3)', x, 211, '#2a3a58', 6);
    const al = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.4 + al * 0.4;
    lingkaran(ctx, x, 200, 2.5, '#ffd166');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'PASANGAN 1 3', x, 190, '#ffe9a3', 5);
  }
  function gambarPasanganDuaLima(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    P(ctx, x - 15, 204, 30, 22, '#f8f0dc');
    teksPx(ctx, '(2,5)', x, 211, '#2a3a58', 6);
    const al = 0.5 + 0.5 * Math.sin(t * 3.2 + 1.5);
    ctx.globalAlpha = 0.4 + al * 0.4;
    lingkaran(ctx, x, 200, 2.5, '#7dffa8');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'PASANGAN 2 5', x, 190, '#ffe9a3', 5);
  }
  function gambarPapanSatuTeman(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 27, 194, 54, 20, '#1e2a44');
    teksPx(ctx, 'SATU x', x, 198, '#7dffa8', 5);
    teksPx(ctx, 'SATU TEMAN', x, 206, '#fffdf2', 5);
    const al = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.4 + al * 0.4;
    teksPx(ctx, 'HUKUM TABEL', x, 182, '#ffe9a3', 5);
    ctx.globalAlpha = 1;
  }

  function gambarKisiTaliLapangan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a58');
    for (let i = 0; i < 5; i++) P(ctx, x - 24 + i * 12, 196, 2, 40, '#88a8b8');
    for (let j = 0; j < 4; j++) P(ctx, x - 24, 198 + j * 12, 50, 2, '#88a8b8');
    teksPx(ctx, 'y', x - 30, 198, '#2a5a48', 6);
    teksPx(ctx, 'x', x + 30, 232, '#2a5a48', 6);
    const al = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.4 + al * 0.4;
    lingkaran(ctx, x, 222, 3, '#ffd166');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'KISI LAPANGAN', x, 184, '#2a5a48', 5);
  }
  function gambarPatokTitikDuaEmpat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a58');
    P(ctx, x - 18, 206, 2, 38, '#88a8b8');
    P(ctx, x - 18, 206, 38, 2, '#88a8b8');
    P(ctx, x - 2, 216, 4, 28, '#7a5230');
    const al = 0.5 + 0.5 * Math.sin(t * 3.4);
    ctx.globalAlpha = 0.6 + al * 0.4;
    P(ctx, x - 7, 208, 14, 9, '#ffd166');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'MAJU 2 NAIK 4', x, 194, '#2a5a48', 5);
    teksPx(ctx, '(2,4)', x, 186, '#2a5a48', 5);
  }
  function gambarTigaPatokMesin(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a58');
    const titik = [[-22, 232], [-4, 224], [14, 216]];
    for (let i = 0; i < titik.length; i++) {
      P(ctx, titik[i][0] + x - 1, titik[i][1] - 14, 3, 14, '#7a5230');
      const al = 0.4 + 0.3 * Math.sin(t * 2.8 + i);
      ctx.globalAlpha = 0.6 + al * 0.4;
      lingkaran(ctx, titik[i][0] + x, titik[i][1] - 17, 3, '#ffd166');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, '(1,2) (2,4) (3,6)', x, 192, '#2a5a48', 5);
  }
  function gambarPapanSatuAlamat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a58');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 27, 194, 54, 20, '#1e2a44');
    teksPx(ctx, '(2,4)', x - 13, 200, '#7dffa8', 5);
    teksPx(ctx, '(4,2)', x + 14, 200, '#ff9d9d', 5);
    teksPx(ctx, 'BEDA!', x, 207, '#ffd166', 5);
    teksPx(ctx, 'SATU PASANGAN SATU TITIK', x, 182, '#2a5a48', 5);
  }

  function gambarJalanMenanjakLurus(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a58');
    for (let i = 0; i < 7; i++) P(ctx, x - 30 + i * 10, 234 - i * 5, 10, 5, '#c4c2a8');
    P(ctx, x - 3, 200, 5, 14, '#7a5230');
    P(ctx, x - 3, 200, 16, 3, '#8a5f38');
    const al = 0.5 + 0.5 * Math.sin(t * 2.2);
    ctx.globalAlpha = 0.4 + al * 0.4;
    teksPx(ctx, 'TANPA BELOK', x, 188, '#2a5a48', 5);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'JALAN LURUS', x, 196, '#2a5a48', 5);
  }
  function gambarTitikBerbarisRapi(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a58');
    const pat = [[-24, 234], [-8, 226], [8, 218], [24, 210]];
    for (let i = 0; i < pat.length; i++) {
      const al = 0.4 + 0.3 * Math.sin(t * 3 + i * 1.4);
      ctx.globalAlpha = 0.6 + al * 0.4;
      lingkaran(ctx, pat[i][0] + x, pat[i][1], 3.5, '#ffd166');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'JARAK SAMA', x, 196, '#2a5a48', 5);
    teksPx(ctx, 'TITIK RAPI', x, 188, '#2a5a48', 5);
  }
  function gambarTaliSambungGaris(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a58');
    const al = 0.55 + 0.35 * Math.sin(t * 2.6);
    ctx.globalAlpha = al;
    for (let i = 0; i < 26; i++) P(ctx, x - 26 + i * 2, 234 - i * 0.92, 2, 2, '#ffd166');
    ctx.globalAlpha = 1;
    lingkaran(ctx, x - 24, 233, 3, '#fffdf2');
    lingkaran(ctx, x + 25, 211, 3, '#fffdf2');
    teksPx(ctx, 'SEMPURNA SEJAJAR', x, 192, '#2a5a48', 5);
  }
  function gambarPapanGarisLurus(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a58');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 26, 194, 52, 20, '#1e2a44');
    teksPx(ctx, 'GARIS', x, 198, '#ffd166', 5);
    teksPx(ctx, 'LURUS', x, 206, '#fffdf2', 5);
    const al = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.4 + al * 0.4;
    teksPx(ctx, 'GRAFIK MESIN', x, 182, '#2a5a48', 5);
    ctx.globalAlpha = 1;
  }

  function gambarJembatanNaikTurun(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a58');
    for (let i = 0; i < 6; i++) {
      const by = i < 3 ? 226 - i * 6 : 226 - (5 - i) * 6;
      P(ctx, x - 30 + i * 10, by, 10, 4, '#6a5040');
      P(ctx, x - 27 + i * 10, by + 4, 2, 246 - by - 6, '#5a4034');
    }
    const al = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.4 + al * 0.4;
    teksPx(ctx, 'GRAFIK BISA DIDAKI', x, 186, '#6a4a20', 5);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'NAIK LALU TURUN', x, 194, '#6a4a20', 5);
  }
  function gambarPanahMenanjakKanan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a58');
    const al = 0.55 + 0.35 * Math.sin(t * 3);
    ctx.globalAlpha = al;
    for (let i = 0; i < 12; i++) P(ctx, x - 22 + i * 3, 232 - i * 2.2, 3, 3, '#2aa85e');
    P(ctx, x + 12, 206, 8, 3, '#2aa85e');
    P(ctx, x + 14, 202, 3, 6, '#2aa85e');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'MAKIN BESAR', x, 192, '#6a4a20', 5);
  }
  function gambarPanahMenurunKanan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a58');
    const al = 0.55 + 0.35 * Math.sin(t * 3 + 1);
    ctx.globalAlpha = al;
    for (let i = 0; i < 12; i++) P(ctx, x - 22 + i * 3, 210 + i * 2.2, 3, 3, '#c85a6e');
    P(ctx, x + 12, 236, 8, 3, '#c85a6e');
    P(ctx, x + 14, 234, 3, 6, '#c85a6e');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'MAKIN KECIL', x, 192, '#6a4a20', 5);
  }
  function gambarPapanGrafikArah(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a58');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 28, 192, 56, 22, '#1e2a44');
    for (let i = 0; i < 4; i++) P(ctx, x - 22 + i * 3, 200 + i * 2, 3, 2, '#7dffa8');
    for (let i = 0; i < 4; i++) P(ctx, x - 4 + i * 3, 208 - i * 2, 3, 2, '#ff9d9d');
    P(ctx, x + 12, 198, 12, 2, '#ffd166');
    teksPx(ctx, 'NAIK TURUN DATAR', x, 214, '#fffdf2', 5);
    teksPx(ctx, 'GRAFIK PUNYA ARAH', x, 180, '#6a4a20', 5);
  }

  function gambarBolaLemparMelengkung(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a58');
    const fase = Math.sin(t * 2.2);
    const bx = x + fase * 14, by = 206 - Math.abs(fase) * 8;
    lingkaran(ctx, bx, by, 5, '#c85a2a');
    lingkaran(ctx, bx - 1, by - 1, 3, '#ff9d6b');
    for (let i = 0; i <= 8; i++) {
      const px4 = x - 22 + i * 5.5;
      const py4 = 232 - Math.round(26 * Math.sin(Math.PI * i / 8));
      ctx.globalAlpha = 0.25 + 0.4 * Math.abs(Math.sin(t + i));
      lingkaran(ctx, px4, py4, 1.5, '#f2b8cc');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'BOLA MELENGKUNG', x, 186, '#2a5a3a', 5);
  }
  function gambarJejakLengkungKertas(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a58');
    P(ctx, x - 26, 198, 52, 36, '#f8f0dc');
    const dot = [[-18, 226, '1'], [-6, 216, '4'], [8, 204, '9']];
    for (let i = 0; i < dot.length; i++) {
      const al = 0.4 + 0.3 * Math.sin(t * 3 + i * 1.4);
      ctx.globalAlpha = 0.6 + al * 0.4;
      lingkaran(ctx, dot[i][0] + x, dot[i][1], 3, '#c85a6e');
      ctx.globalAlpha = 1;
      teksPx(ctx, dot[i][2], dot[i][0] + x + 8, dot[i][1] - 3, '#8a5a6a', 5);
    }
    teksPx(ctx, 'JEJAK y = x2', x, 188, '#2a5a3a', 5);
  }
  function gambarLengkungCerminKanan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a58');
    P(ctx, x - 1, 198, 2, 40, '#88a8b8');
    for (let i = 0; i <= 5; i++) {
      const dy = i * i * 1.6;
      const al = 0.45 + 0.35 * Math.sin(t * 2.6 + i);
      ctx.globalAlpha = al + 0.3;
      lingkaran(ctx, x - 20 + i * 4, 232 - dy, 2, '#7dffa8');
      lingkaran(ctx, x + 20 - i * 4, 232 - dy, 2, '#7dffa8');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'CERMIN DUA SISI', x, 188, '#2a5a3a', 5);
  }
  function gambarPapanSimetriParabola(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a58');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 26, 194, 52, 20, '#1e2a44');
    teksPx(ctx, 'PARABOLA', x, 198, '#ffd166', 5);
    teksPx(ctx, 'SIMETRIS', x, 206, '#fffdf2', 5);
    const al = 0.5 + 0.5 * Math.sin(t * 2.2);
    ctx.globalAlpha = 0.4 + al * 0.4;
    teksPx(ctx, 'SAMA DUA SISI', x, 182, '#2a5a3a', 5);
    ctx.globalAlpha = 1;
  }

  function gambarPapanGrafikEmber(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    P(ctx, x - 22, 196, 44, 40, '#1e2a44');
    const al = 0.55 + 0.35 * Math.sin(t * 2.8);
    ctx.globalAlpha = al;
    for (let i = 0; i < 6; i++) P(ctx, x - 18 + i * 3, 228 - i * 4, 3, 2, '#7dffa8');
    for (let i = 0; i < 6; i++) P(ctx, x + 0 + i * 3, 204, 3, 2, '#7dffa8');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'GRAFIK EMBER', x, 186, '#ffe9a3', 5);
  }
  function gambarGarisNaikKran(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    P(ctx, x - 16, 202, 12, 6, '#88a8b8');
    P(ctx, x - 12, 208, 4, 6, '#88a8b8');
    const tetes = Math.abs(Math.sin(t * 4));
    P(ctx, x - 11, 216 + tetes * 8, 2, 3, '#7db8e0');
    P(ctx, x - 18, 232, 16, 10, '#4a7fc0');
    P(ctx, x - 16, 234, 12, 3, '#7db8e0');
    teksPx(ctx, 'AIR BERTAMBAH', x, 190, '#ffe9a3', 5);
  }
  function gambarGarisDatarPenuh(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    P(ctx, x - 14, 226, 28, 16, '#4a7fc0');
    P(ctx, x - 12, 228, 24, 3, '#7db8e0');
    P(ctx, x - 12, 232, 24, 2, '#7db8e0');
    const al = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.4 + al * 0.4;
    P(ctx, x - 22, 226, 44, 2, '#7dffa8');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'EMBER PENUH 18L', x, 190, '#ffe9a3', 5);
  }
  function gambarPapanBacaCerita(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3464');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 28, 192, 56, 22, '#1e2a44');
    for (let i = 0; i < 5; i++) P(ctx, x - 24 + i * 3, 208 - i * 3, 3, 2, '#7dffa8');
    P(ctx, x - 9, 194, 14, 2, '#ffd166');
    for (let i = 0; i < 5; i++) P(ctx, x + 6 + i * 3, 194 - i * 3, 3, 2, '#7dffa8');
    teksPx(ctx, 'NAIK DATAR NAIK', x, 215, '#fffdf2', 5);
    teksPx(ctx, 'BACA CERITANYA', x, 180, '#ffe9a3', 5);
  }

  function gambarLimaLampuMisiMesin(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#443c74');
    for (let i = 0; i < 5; i++) {
      const nyala = Math.sin(t * 3 + i * 1.3) > 0;
      P(ctx, x - 26 + i * 13, 214, 2, 22, '#443c74');
      ctx.globalAlpha = nyala ? 1 : 0.35;
      lingkaran(ctx, x - 25 + i * 13, 210, 4, nyala ? '#7dffa8' : '#2a3a58');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'LIMA MISI', x, 192, '#7ff2d8', 5);
  }
  function gambarMesinTekaAturan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#443c74');
    P(ctx, x - 14, 202, 28, 30, '#4a7fc0');
    P(ctx, x - 11, 205, 22, 4, '#7db8e0');
    const al = 0.5 + 0.5 * Math.sin(t * 3.4);
    ctx.globalAlpha = 0.5 + al * 0.5;
    teksPx(ctx, '?', x, 210, '#ffd166', 10);
    ctx.globalAlpha = 1;
    const uap = Math.sin(t * 3);
    ctx.globalAlpha = 0.4 + uap * 0.25;
    lingkaran(ctx, x + 6, 198 + uap * 2, 2.5, '#fff8e0');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'TEBAK ATURAN', x, 186, '#7ff2d8', 5);
  }
  function gambarPapanTabelTeka(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#443c74');
    P(ctx, x - 3, 210, 5, 34, '#7a5230');
    P(ctx, x - 24, 190, 48, 24, '#1e2a44');
    teksPx(ctx, '0-5', x - 14, 194, '#7dffa8', 5);
    teksPx(ctx, '1-7', x + 1, 194, '#7dffa8', 5);
    teksPx(ctx, '2-9', x + 16, 194, '#7dffa8', 5);
    teksPx(ctx, 'ATURANNYA?', x, 204, '#ffd166', 5);
    teksPx(ctx, 'MISI TEBAK', x, 180, '#7ff2d8', 5);
  }
  function gambarGerbangJuaraLembah(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#443c74');
    P(ctx, x - 26, 198, 7, 46, '#5a5090');
    P(ctx, x + 19, 198, 7, 46, '#5a5090');
    P(ctx, x - 28, 190, 56, 9, '#6a5aa8');
    for (let i = 0; i < 5; i++) {
      const al = 0.4 + 0.35 * Math.sin(t * 2.6 + i * 1.1);
      ctx.globalAlpha = 0.5 + al * 0.5;
      lingkaran(ctx, x - 20 + i * 10, 195, 2.5, '#ffd166');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'GERBANG JUARA', x, 178, '#7ff2d8', 5);
  }

  function gambarBatuBarisEnam(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#7a9a5a');
    const angka = [2, 4, 6, 8, 10, 12];
    const mana = Math.floor(t * 2) % 6;
    for (let i = 0; i < 6; i++) {
      const sx = x - 32 + i * 13;
      P(ctx, sx - 5, 228, 11, 8, '#e8e2d0');
      P(ctx, sx - 4, 226, 9, 3, '#f4efe2');
      teksPx(ctx, String(angka[i]), sx, 216, '#3a4a2a', 5);
      if (i === mana) { ctx.globalAlpha = 0.45 + 0.25 * Math.sin(t * 6); lingkaran(ctx, sx, 230, 8, '#ffe9a3'); ctx.globalAlpha = 1; }
    }
    teksPx(ctx, 'BARISAN SETIA', x, 188, '#2a5a3a', 5);
  }
  function gambarPapanJarakSama(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#7a9a5a');
    P(ctx, x - 3, 216, 5, 28, '#7a5230');
    P(ctx, x - 24, 198, 48, 20, '#1e2a44');
    teksPx(ctx, 'JARAK', x, 201, '#ffd166', 5);
    teksPx(ctx, 'SELALU 2', x, 209, '#fffdf2', 5);
    const al = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.4 + al * 0.5;
    P(ctx, x - 14, 222, 12, 2, '#2aa85e');
    P(ctx, x - 3, 221, 2, 4, '#2aa85e');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'UKUR TETANGGA', x, 184, '#2a5a3a', 5);
  }
  function gambarJejakLangkahTetap(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#7a9a5a');
    for (let i = 0; i < 5; i++) {
      const al = 0.4 + 0.3 * Math.sin(t * 2.4 + i * 1.3);
      ctx.globalAlpha = 0.5 + al * 0.5;
      P(ctx, x - 26 + i * 13, 230, 5, 8, '#8a6a48');
      P(ctx, x - 26 + i * 13, 228, 5, 3, '#a8845a');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'JEJAK BERJARAK SAMA', x, 190, '#2a5a3a', 5);
  }
  function gambarPapanRahasiaBarisan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#7a9a5a');
    P(ctx, x - 3, 214, 5, 30, '#7a5230');
    P(ctx, x - 28, 194, 56, 22, '#1e2a44');
    teksPx(ctx, '12 + 2 = ?', x, 198, '#ffd166', 6);
    const al = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.4 + al * 0.6;
    teksPx(ctx, '14', x + 14, 207, '#7dffa8', 7);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'TAK PERLU HITUNG SEMUA', x, 182, '#2a5a3a', 4);
  }

  function gambarTanggaTambahTiga(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#7a9a5a');
    const s = [5, 8, 11, 14];
    const mana = Math.floor(t * 2) % 4;
    for (let i = 0; i < 4; i++) {
      const sx = x - 30 + i * 16, sy = 236 - i * 9;
      P(ctx, sx, sy, 15, 9 + i * 9, '#a89478');
      teksPx(ctx, String(s[i]), sx + 7, sy - 8, '#3a4a2a', 5);
      if (i === mana) { ctx.globalAlpha = 0.45 + 0.25 * Math.sin(t * 6); lingkaran(ctx, sx + 7, sy - 4, 8, '#ffe9a3'); ctx.globalAlpha = 1; }
    }
    teksPx(ctx, 'NAIK = +3', x, 186, '#2a5a3a', 5);
  }
  function gambarPapanBedaTetap(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#7a9a5a');
    P(ctx, x - 3, 214, 5, 30, '#7a5230');
    P(ctx, x - 24, 196, 48, 20, '#1e2a44');
    teksPx(ctx, 'BEDA = 3', x, 200, '#ffd166', 6);
    const al = 0.5 + 0.5 * Math.sin(t * 2.2);
    ctx.globalAlpha = 0.4 + al * 0.5;
    teksPx(ctx, 'SETIA', x, 209, '#7dffa8', 5);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'JARAK TETANGGA', x, 182, '#2a5a3a', 4);
  }
  function gambarBatuSukuBerikut(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#7a9a5a');
    P(ctx, x - 22, 228, 16, 10, '#e8e2d0');
    teksPx(ctx, '14', x - 14, 218, '#3a4a2a', 5);
    P(ctx, x + 6, 226, 18, 12, '#f4efe2');
    const al = 0.5 + 0.5 * Math.sin(t * 3.2);
    ctx.globalAlpha = 0.4 + al * 0.6;
    teksPx(ctx, '17', x + 15, 214, '#c85a2a', 8);
    ctx.globalAlpha = 1;
    teksPx(ctx, '14 + 3 = 17', x, 190, '#2a5a3a', 5);
  }
  function gambarPapanCekDuaKali(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#7a9a5a');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 27, 192, 54, 22, '#1e2a44');
    teksPx(ctx, 'CEK DUA KALI', x, 195, '#ffd166', 5);
    teksPx(ctx, '5+3=8', x - 13, 204, '#fffdf2', 5);
    teksPx(ctx, '8+3=11', x + 10, 204, '#fffdf2', 5);
    const al = 0.5 + 0.5 * Math.sin(t * 2.8);
    ctx.globalAlpha = 0.4 + al * 0.5;
    teksPx(ctx, 'SAMA = SETIA', x, 180, '#7dffa8', 4);
    ctx.globalAlpha = 1;
  }

  function gambarBijiGandakan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#9a7a50');
    P(ctx, x - 5, 234, 10, 6, '#8a6a3a');
    const tumbuh = 0.5 + 0.5 * Math.sin(t * 2.2);
    P(ctx, x - 1, 226 - tumbuh * 4, 2, 9, '#3e7a3e');
    ctx.globalAlpha = 0.6 + tumbuh * 0.4;
    P(ctx, x - 7, 222 - tumbuh * 4, 6, 3, '#4a9a4a');
    P(ctx, x + 1, 219 - tumbuh * 4, 6, 3, '#4a9a4a');
    ctx.globalAlpha = 1;
    teksPx(ctx, '1 JADI 2', x, 190, '#6a4a20', 5);
  }
  function gambarTumpukBijiLima(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#9a7a50');
    const baris = [1, 2, 4, 8, 16];
    const mana = Math.floor(t * 2.4) % 5;
    for (let r = 0; r < 5; r++) {
      const sy = 238 - r * 8, n = baris[r];
      for (let i = 0; i < n; i++) {
        const px = x - (n - 1) * 2 + i * 4;
        ctx.globalAlpha = r === mana ? 1 : 0.55;
        lingkaran(ctx, px, sy, 1.6, '#d9a832');
        ctx.globalAlpha = 1;
      }
      teksPx(ctx, String(n), x + 24, sy - 3, '#6a4a20', 4);
    }
    teksPx(ctx, 'TIAP BARIS x2', x, 186, '#6a4a20', 5);
  }
  function gambarPapanLedakanDua(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#9a7a50');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 27, 192, 54, 22, '#1e2a44');
    teksPx(ctx, '32 64 128', x, 195, '#fffdf2', 5);
    const geser = Math.floor(t * 2) % 2;
    ctx.globalAlpha = 0.6 + 0.4 * Math.sin(t * 4);
    teksPx(ctx, geser ? '256' : '512!', x, 204, '#ffd166', 6);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'TUMBUH MELEDAK', x, 180, '#6a4a20', 4);
  }
  function gambarPapanSukuKesepuluh(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#9a7a50');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 27, 192, 54, 22, '#1e2a44');
    teksPx(ctx, 'TAMBAH=20', x, 195, '#a8b8d8', 5);
    const al = 0.5 + 0.5 * Math.sin(t * 3.4);
    ctx.globalAlpha = 0.4 + al * 0.6;
    teksPx(ctx, 'GANDA=512', x, 204, '#ffd166', 6);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'BARIS KE-10', x, 180, '#6a4a20', 5);
  }

  function gambarPapanTigaNPlusSatu(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3e64');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 24, 192, 48, 22, '#1e2a44');
    const al = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.5 + al * 0.5;
    teksPx(ctx, '3n+1', x, 196, '#ffd166', 8);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'NOMOR SUKU = n', x, 208, '#7ff2d8', 4);
    teksPx(ctx, 'PAPAN MENYALA', x, 178, '#7ff2d8', 5);
  }
  function gambarLompatanRumusCepat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3e64');
    for (let i = 0; i < 4; i++) P(ctx, x - 28 + i * 15, 236 - i * 5, 12, 4 + i * 5, '#4a4e78');
    const lompat = Math.abs(Math.sin(t * 3));
    const ix = x - 26 + ((t * 20) % 46), iy = 230 - lompat * 12;
    P(ctx, ix, iy, 5, 8, '#ffd166');
    P(ctx, ix, iy - 3, 4, 4, '#ffe9a3');
    teksPx(ctx, 'LOMPAT LANGSUNG', x, 186, '#7ff2d8', 5);
  }
  function gambarLampuSukuSeratus(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3e64');
    P(ctx, x - 2, 200, 4, 44, '#4a4e78');
    const al = 0.5 + 0.5 * Math.sin(t * 4);
    ctx.globalAlpha = 0.5 + al * 0.5;
    lingkaran(ctx, x, 196, 7, '#ffd166');
    ctx.globalAlpha = 1;
    lingkaran(ctx, x, 196, 4, '#ffe9a3');
    teksPx(ctx, '301', x + 14, 206, '#7dffa8', 8);
    teksPx(ctx, 'SUKU KE-100', x, 184, '#7ff2d8', 5);
  }
  function gambarPapanTanpaHitungSatu(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3e64');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 27, 192, 54, 22, '#1e2a44');
    teksPx(ctx, 'TANGGA', x, 195, '#ffd166', 6);
    teksPx(ctx, 'LOMPAT', x, 204, '#ffd166', 6);
    const al = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.4 + al * 0.5;
    teksPx(ctx, 'RUMUS', x, 181, '#7dffa8', 5);
    ctx.globalAlpha = 1;
  }

  function gambarApiUnggunCerita(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3460');
    P(ctx, x - 14, 236, 28, 4, '#6a4a2a');
    P(ctx, x - 10, 240, 20, 4, '#553a20');
    const api = Math.sin(t * 7);
    lingkaran(ctx, x, 230 + api * 1.5, 7, '#ff9d4a');
    lingkaran(ctx, x, 228 + api * 2, 4.5, '#ffd166');
    lingkaran(ctx, x, 226 + api * 2.5, 2.5, '#fff3cf');
    const uap = Math.sin(t * 3);
    ctx.globalAlpha = 0.35 + uap * 0.2;
    lingkaran(ctx, x + 2, 216 + uap * 3, 3, '#c8c0d8');
    lingkaran(ctx, x - 3, 208 + uap * 4, 2.5, '#c8c0d8');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'API UNGGUN', x, 186, '#ffd166', 5);
  }
  function gambarKartuPasanganSatuSeratus(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3460');
    P(ctx, x - 30, 218, 15, 20, '#f8f0dc');
    teksPx(ctx, '1', x - 22, 224, '#2a3a58', 7);
    P(ctx, x - 12, 226, 4, 2, '#ffd166');
    P(ctx, x + 12, 218, 17, 20, '#f8f0dc');
    teksPx(ctx, '100', x + 20, 224, '#2a3a58', 5);
    const al = 0.5 + 0.5 * Math.sin(t * 3.4);
    ctx.globalAlpha = 0.4 + al * 0.6;
    teksPx(ctx, '=101', x, 222, '#7dffa8', 7);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'PASANGAN UJUNG', x, 188, '#ffd166', 5);
  }
  function gambarPapanLimaPuluhPasang(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3460');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 27, 192, 54, 22, '#1e2a44');
    teksPx(ctx, '50 PASANGAN', x, 195, '#ffd166', 5);
    teksPx(ctx, 'x 101', x, 204, '#fffdf2', 6);
    const al = 0.5 + 0.5 * Math.sin(t * 2.8);
    ctx.globalAlpha = 0.4 + al * 0.5;
    teksPx(ctx, 'SEMUA = 101', x, 181, '#7dffa8', 4);
    ctx.globalAlpha = 1;
  }
  function gambarPapanHasilLimaNolLima(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3460');
    P(ctx, x - 3, 210, 5, 34, '#7a5230');
    P(ctx, x - 26, 190, 52, 24, '#1e2a44');
    teksPx(ctx, '1 s/d 100', x, 193, '#a8b8d8', 5);
    const al = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.5 + al * 0.5;
    teksPx(ctx, '5050', x, 202, '#ffd166', 9);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'SEKEJAP MATA', x, 178, '#ffd166', 4);
  }

  function gambarKotakBijiBaris(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#7a9a5a');
    const isi = [1, 2, 4, 8, 16];
    const mana = Math.floor(t * 2) % 5;
    for (let i = 0; i < 5; i++) {
      const bx = x - 32 + i * 14;
      P(ctx, bx, 228, 12, 12, '#a89468');
      P(ctx, bx, 228, 12, 2, '#c8b488');
      const n = isi[i];
      for (let d = 0; d < Math.min(n, 8); d++) {
        const px = bx + 2 + (d % 4) * 3, py = 231 + Math.floor(d / 4) * 3;
        lingkaran(ctx, px, py, 1.2, '#d9a832');
      }
      if (i === mana) { ctx.globalAlpha = 0.4 + 0.2 * Math.sin(t * 6); lingkaran(ctx, bx + 6, 234, 8, '#ffe9a3'); ctx.globalAlpha = 1; }
      teksPx(ctx, String(n), bx + 6, 218, '#3a4a2a', 4);
    }
    teksPx(ctx, 'GABUNG SEMUA', x, 186, '#2a5a3a', 5);
  }
  function gambarPapanSatuKurang(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#7a9a5a');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 27, 192, 54, 22, '#1e2a44');
    teksPx(ctx, '1+2=3', x - 13, 195, '#fffdf2', 5);
    const al = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.4 + al * 0.6;
    teksPx(ctx, '-> 4', x + 12, 195, '#ffd166', 6);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'SATU KURANG!', x, 206, '#7dffa8', 5);
    teksPx(ctx, 'POLA SETIA', x, 180, '#2a5a3a', 4);
  }
  function gambarGandakanTumpukDua(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#7a9a5a');
    P(ctx, x - 28, 224, 18, 14, '#a89468');
    teksPx(ctx, '31', x - 19, 228, '#3a4a2a', 7);
    P(ctx, x + 10, 222, 20, 16, '#c8b488');
    teksPx(ctx, '32', x + 20, 226, '#6a4a20', 8);
    const al = 0.5 + 0.5 * Math.sin(t * 3.6);
    P(ctx, x - 7, 230, 13, 2, '#2aa85e');
    ctx.globalAlpha = 0.4 + al * 0.6;
    teksPx(ctx, 'SELISIH 1', x, 216, '#c85a2a', 5);
    ctx.globalAlpha = 1;
    teksPx(ctx, '31 MENDEKATI 32', x, 186, '#2a5a3a', 5);
  }
  function gambarPapanRahasiaDuaKali(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#7a9a5a');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 28, 192, 56, 22, '#1e2a44');
    teksPx(ctx, '2x TERAKHIR', x, 195, '#ffd166', 5);
    teksPx(ctx, 'KURANG 1', x, 204, '#fffdf2', 5);
    const al = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.4 + al * 0.5;
    teksPx(ctx, '2x16-1=31', x, 181, '#7dffa8', 4);
    ctx.globalAlpha = 1;
  }

  function gambarKursiSusunSegitiga(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#9a7a50');
    const mana = Math.floor(t * 2) % 4;
    for (let r = 0; r < 4; r++) {
      for (let i = 0; i <= r; i++) {
        const kx = x - 6 - r * 7 + i * 14, ky = 238 - r * 10;
        P(ctx, kx, ky, 9, 8, '#8a6a48');
        P(ctx, kx, ky - 3, 9, 3, '#a8845a');
        if (r === mana) { ctx.globalAlpha = 0.35 + 0.2 * Math.sin(t * 5); lingkaran(ctx, kx + 4, ky, 6, '#ffe9a3'); ctx.globalAlpha = 1; }
      }
    }
    teksPx(ctx, 'BARIS 1 2 3 4', x, 186, '#6a4a20', 5);
  }
  function gambarBarisKursiBawah(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#9a7a50');
    for (let i = 0; i < 4; i++) {
      const kx = x - 24 + i * 14;
      const al = 0.4 + 0.3 * Math.sin(t * 2.6 + i * 1.2);
      ctx.globalAlpha = 0.5 + al * 0.5;
      P(ctx, kx, 230, 10, 10, '#8a6a48');
      ctx.globalAlpha = 1;
      teksPx(ctx, String(i + 1), kx + 5, 218, '#6a4a20', 5);
    }
    const al2 = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.4 + al2 * 0.6;
    teksPx(ctx, '= 10', x, 206, '#c85a2a', 7);
    ctx.globalAlpha = 1;
    teksPx(ctx, '1+2+3+4', x, 188, '#6a4a20', 5);
  }
  function gambarPapanTambahBarisBaru(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#9a7a50');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 26, 192, 52, 22, '#1e2a44');
    teksPx(ctx, '+2 +3 +4', x, 197, '#ffd166', 6);
    const al = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.4 + al * 0.5;
    teksPx(ctx, 'TUMBUH SATU', x, 207, '#7dffa8', 4);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'TIAP BARIS BARU', x, 180, '#6a4a20', 4);
  }
  function gambarPapanSepuluhKursi(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#9a7a50');
    P(ctx, x - 3, 210, 5, 34, '#7a5230');
    P(ctx, x - 28, 190, 56, 24, '#1e2a44');
    teksPx(ctx, '1+3=4', x - 15, 193, '#fffdf2', 5);
    teksPx(ctx, '3+6=9', x + 1, 193, '#fffdf2', 5);
    teksPx(ctx, '6+10=16', x + 14, 193, '#fffdf2', 4);
    const al = 0.5 + 0.5 * Math.sin(t * 3.2);
    ctx.globalAlpha = 0.5 + al * 0.5;
    teksPx(ctx, 'JADI KOTAK!', x, 203, '#ffd166', 6);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'DUA SEGITIGA', x, 178, '#6a4a20', 4);
  }

  function gambarPetakSatuSatu(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a58');
    P(ctx, x - 8, 230, 16, 14, '#8a6a44');
    P(ctx, x - 6, 232, 12, 10, '#7a5a38');
    const tumbuh = 0.5 + 0.5 * Math.sin(t * 2.4);
    P(ctx, x - 1, 224 - tumbuh * 3, 2, 7, '#3e7a3e');
    lingkaran(ctx, x, 222 - tumbuh * 3, 2.5, '#4a9a4a');
    teksPx(ctx, '1x1 = 1', x, 190, '#2a5a3a', 6);
  }
  function gambarPetakDuaDua(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a58');
    P(ctx, x - 14, 228, 28, 16, '#8a6a44');
    for (let j = 0; j < 2; j++) for (let i = 0; i < 2; i++) P(ctx, x - 12 + i * 13, 230 + j * 7, 11, 5, '#7a5a38');
    const al = 0.5 + 0.5 * Math.sin(t * 2.8);
    ctx.globalAlpha = 0.4 + al * 0.4;
    lingkaran(ctx, x - 6, 233, 2, '#4a9a4a');
    lingkaran(ctx, x + 7, 240, 2, '#4a9a4a');
    ctx.globalAlpha = 1;
    teksPx(ctx, '2x2 = 4', x, 190, '#2a5a3a', 6);
  }
  function gambarPetakTigaTiga(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a58');
    P(ctx, x - 20, 224, 40, 20, '#8a6a44');
    for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) P(ctx, x - 18 + i * 13, 226 + j * 6, 11, 4, '#7a5a38');
    const al = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.4 + al * 0.5;
    teksPx(ctx, '3x3=9  4x4=16', x, 210, '#2a5a3a', 5);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'SISI TUMBUH SATU', x, 188, '#2a5a3a', 4);
  }
  function gambarPapanSisiKaliSisi(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#6a9a58');
    P(ctx, x - 3, 210, 5, 34, '#7a5230');
    P(ctx, x - 28, 190, 56, 24, '#1e2a44');
    teksPx(ctx, 'SELISIH', x, 193, '#a8b8d8', 5);
    const al = 0.5 + 0.5 * Math.sin(t * 3.4);
    ctx.globalAlpha = 0.5 + al * 0.5;
    teksPx(ctx, '3 5 7', x, 201, '#ffd166', 8);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'GANJIL BERBARIS', x, 211, '#7dffa8', 4);
    teksPx(ctx, '16+9=25', x, 178, '#2a5a3a', 5);
  }

  function gambarBungaKelopakLima(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#9a7a50');
    P(ctx, x - 1, 228, 2, 16, '#4a7a3e');
    for (let i = 0; i < 5; i++) {
      const a = t * 0.8 + i * (Math.PI * 2 / 5);
      const px = x + Math.cos(a) * 7, py = 220 + Math.sin(a) * 7;
      lingkaran(ctx, px, py, 4, '#c88ac0');
    }
    lingkaran(ctx, x, 220, 3, '#ffd166');
    teksPx(ctx, '5 KELOPAK', x, 190, '#6a4a20', 5);
  }
  function gambarPapanNadaBerulang(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#9a7a50');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 28, 192, 56, 22, '#1e2a44');
    const nada = ['DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI'];
    const mana = Math.floor(t * 3) % 7;
    teksPx(ctx, nada[mana], x, 196, '#ffd166', 7);
    teksPx(ctx, '...KEMBALI KE DO', x, 207, '#7dffa8', 4);
    teksPx(ctx, 'TANGGA NADA', x, 180, '#6a4a20', 5);
  }
  function gambarKalenderKabisatEmpat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#9a7a50');
    P(ctx, x - 14, 224, 28, 18, '#f4efe2');
    P(ctx, x - 14, 224, 28, 4, '#c85a2a');
    P(ctx, x - 10, 220, 2, 5, '#8a6a48');
    P(ctx, x + 8, 220, 2, 5, '#8a6a48');
    const hal = Math.floor(t * 1.5) % 3;
    teksPx(ctx, ['2024', '2028', '2032'][hal], x, 232, '#2a3a58', 6);
    const al = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.4 + al * 0.5;
    teksPx(ctx, 'BERJARAK 4', x, 212, '#c85a2a', 5);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'KALENDER KABISAT', x, 186, '#6a4a20', 4);
  }
  function gambarPapanPolaSembunyi(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#9a7a50');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 27, 192, 54, 22, '#1e2a44');
    teksPx(ctx, 'POLA DI', x, 195, '#ffd166', 6);
    teksPx(ctx, 'MANA-MANA', x, 204, '#ffd166', 6);
    const al = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.4 + al * 0.5;
    lingkaran(ctx, x + 20, 210, 4, '#7dffa8');
    P(ctx, x + 23, 213, 4, 2, '#7dffa8');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'CATAT BANDING CEK', x, 180, '#6a4a20', 4);
  }

  function gambarLimaApiMisiPuncak(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3e4266');
    for (let i = 0; i < 5; i++) {
      const fx = x - 28 + i * 14;
      P(ctx, fx - 3, 238, 7, 3, '#6a4a2a');
      const api = Math.sin(t * 6 + i * 1.3);
      ctx.globalAlpha = 0.7 + api * 0.3;
      lingkaran(ctx, fx, 234 + api * 1.5, 3.5, '#ff9d4a');
      lingkaran(ctx, fx, 232 + api * 2, 2, '#ffd166');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'LIMA MISI', x, 192, '#7ff2d8', 5);
  }
  function gambarTekaBarisanPuncak(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3e4266');
    P(ctx, x - 16, 216, 32, 26, '#5a6088');
    P(ctx, x - 14, 218, 28, 3, '#6a7098');
    teksPx(ctx, '20 22 24', x, 224, '#fffdf2', 5);
    const al = 0.5 + 0.5 * Math.sin(t * 3.2);
    ctx.globalAlpha = 0.4 + al * 0.6;
    teksPx(ctx, '?', x, 231, '#ffd166', 9);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'LANJUTKAN!', x, 186, '#7ff2d8', 5);
  }
  function gambarPapanSukuKeSeratus(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3e4266');
    P(ctx, x - 3, 210, 5, 34, '#7a5230');
    P(ctx, x - 27, 190, 54, 24, '#1e2a44');
    teksPx(ctx, '55', x - 14, 194, '#7dffa8', 8);
    teksPx(ctx, '63', x + 12, 194, '#7dffa8', 8);
    const al = 0.5 + 0.5 * Math.sin(t * 2.8);
    ctx.globalAlpha = 0.4 + al * 0.5;
    teksPx(ctx, 'PASANGAN  DERET', x, 205, '#ffd166', 4);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'DUA RAHASIA', x, 178, '#7ff2d8', 5);
  }
  function gambarGerbangPuncakPola(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3e4266');
    P(ctx, x - 26, 198, 7, 46, '#5a6088');
    P(ctx, x + 19, 198, 7, 46, '#5a6088');
    P(ctx, x - 28, 190, 56, 9, '#6a7098');
    for (let i = 0; i < 5; i++) {
      const al = 0.4 + 0.35 * Math.sin(t * 2.6 + i * 1.1);
      ctx.globalAlpha = 0.5 + al * 0.5;
      lingkaran(ctx, x - 20 + i * 10, 195, 2.5, '#7ff2d8');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'GERBANG PUNCAK', x, 178, '#7ff2d8', 5);
  }

  function gambarMesinPangkatTiga(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8c8a0');
    P(ctx, x - 20, 210, 40, 34, '#8a6a48');
    P(ctx, x - 24, 204, 48, 8, '#6e5238');
    P(ctx, x - 8, 194, 16, 12, '#4a3a28');
    const ma = 0.4 + 0.3 * Math.sin(t * 3);
    ctx.globalAlpha = ma; P(ctx, x - 6, 184, 3, 10, '#e8e2d0'); P(ctx, x + 2, 180, 3, 8, '#e8e2d0'); ctx.globalAlpha = 1;
    P(ctx, x - 12, 218, 24, 12, '#1e2a44');
    teksPx(ctx, '8', x, 220, '#ffd166', 7);
    P(ctx, x + 12, 222, 6, 6, '#ff8a5a');
    teksPx(ctx, '2x2x2 = 8', x, 186, '#5a4a2a', 5);
  }
  function gambarPapanTulisKaliUlang(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8c8a0');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 28, 192, 56, 22, '#1e2a44');
    teksPx(ctx, '2x2x2x2=16', x, 197, '#fffdf2', 5);
    const al = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.4 + al * 0.5;
    teksPx(ctx, '4 KALI', x, 206, '#7dffa8', 5);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'KALI BERULANG', x, 180, '#5a4a2a', 4);
  }
  function gambarKartuPangkatKecil(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8c8a0');
    P(ctx, x - 16, 206, 32, 38, '#fffdf2');
    P(ctx, x - 14, 208, 28, 34, '#f0ecd8');
    teksPx(ctx, '2', x - 4, 220, '#3a4a2a', 10);
    teksPx(ctx, '3', x + 8, 210, '#c85a2a', 6);
    const al = 0.5 + 0.5 * Math.sin(t * 3.2);
    ctx.globalAlpha = 0.4 + al * 0.5;
    lingkaran(ctx, x + 8, 212, 7, '#ffe9a3');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'ANGKA AJAKAN', x, 192, '#5a4a2a', 4);
  }
  function gambarRakHasilDelapan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8c8a0');
    P(ctx, x - 26, 238, 52, 5, '#6e5238');
    P(ctx, x - 26, 214, 52, 5, '#6e5238');
    P(ctx, x - 28, 210, 4, 34, '#8a6a48'); P(ctx, x + 24, 210, 4, 34, '#8a6a48');
    const mana = Math.floor(t * 2) % 8;
    for (let i = 0; i < 8; i++) {
      const sx = x - 20 + (i % 4) * 11, sy = i < 4 ? 224 : 200;
      P(ctx, sx, sy, 9, 9, '#ffd166');
      P(ctx, sx + 1, sy + 1, 7, 3, '#ffe9a3');
      if (i === mana) { ctx.globalAlpha = 0.45 + 0.25 * Math.sin(t * 6); lingkaran(ctx, sx + 4, sy + 4, 7, '#fff3cf'); ctx.globalAlpha = 1; }
    }
    teksPx(ctx, 'DELAPAN KUBUS', x, 186, '#5a4a2a', 4);
  }

  function gambarKertasLipatPertama(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 22, 220, 44, 18, '#fffdf2');
    const buka = 0.5 + 0.5 * Math.sin(t * 2.2);
    ctx.globalAlpha = 0.35 + buka * 0.6;
    P(ctx, x, 220, 22, 18, '#e8e4d0');
    ctx.globalAlpha = 1;
    P(ctx, x - 1, 218, 2, 22, '#b8b4a0');
    teksPx(ctx, '2 LAPIS = 0,2 MM', x, 202, '#3a4a2a', 4);
    teksPx(ctx, 'LIPAT = x2', x, 188, '#3a4a2a', 5);
  }
  function gambarTumpukanLipatDelapan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    for (let i = 0; i < 8; i++) {
      P(ctx, x - 20 - i, 236 - i * 3, 40 + i * 2, 3, '#fffdf2');
    }
    const al = 0.5 + 0.5 * Math.sin(t * 2.8);
    ctx.globalAlpha = 0.4 + al * 0.6;
    teksPx(ctx, '256 LAPIS', x, 204, '#c85a2a', 7);
    ctx.globalAlpha = 1;
    teksPx(ctx, '8 LIPAT', x, 190, '#3a4a2a', 5);
  }
  function gambarPenggarisTebalTumpuk(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 6, 200, 10, 44, '#d8b878');
    for (let i = 0; i < 6; i++) P(ctx, x - 6, 204 + i * 7, 5, 1.5, '#8a6a48');
    const mana = Math.floor(t * 2) % 3;
    if (mana === 0) { P(ctx, x - 14, 234, 8, 8, '#fffdf2'); }
    else if (mana === 1) { P(ctx, x + 6, 218, 10, 24, '#fffdf2'); }
    else { P(ctx, x + 6, 206, 14, 36, '#fffdf2'); }
    teksPx(ctx, 'MAKIN TEBAL', x, 188, '#3a4a2a', 5);
  }
  function gambarPapanJalanKeBulan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 28, 190, 56, 24, '#1e2a44');
    lingkaran(ctx, x + 12, 198, 6, '#e8ecff');
    const al = 0.5 + 0.5 * Math.sin(t * 2.2);
    ctx.globalAlpha = 0.4 + al * 0.6;
    teksPx(ctx, '42 LIPAT', x - 10, 194, '#ffd166', 6);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'SAMPAI BULAN!', x, 206, '#7dffa8', 5);
    teksPx(ctx, 'LIPATAN = LEDAKAN', x, 178, '#3a4a2a', 4);
  }

  function gambarPetakRumputTigaTiga(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#dcc69e');
    for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) {
      P(ctx, x - 21 + k * 15, 218 + r * 8, 13, 6, r === 0 ? '#a8d878' : '#98cc6a');
      const al = 0.5 + 0.5 * Math.sin(t * 3 + r * 2 + k);
      ctx.globalAlpha = 0.4 + al * 0.6;
      lingkaran(ctx, x - 14 + k * 15, 220 + r * 8, 2, '#ff9db8');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, '3x3 = 9 BUNGA', x, 202, '#5a4a2a', 5);
  }
  function gambarKotakKayuKubik(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#dcc69e');
    P(ctx, x - 16, 220, 32, 24, '#b08858');
    P(ctx, x - 16, 214, 32, 8, '#c89a68');
    P(ctx, x + 14, 218, 8, 24, '#8a6a48');
    const mana = Math.floor(t * 2) % 2;
    if (mana === 0) { P(ctx, x - 8, 226, 8, 8, '#8a6244'); P(ctx, x + 2, 226, 8, 8, '#8a6244'); P(ctx, x - 8, 236, 8, 8, '#8a6244'); P(ctx, x + 2, 236, 8, 8, '#8a6244'); }
    const al = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.4 + al * 0.5;
    teksPx(ctx, '8 RUANG', x, 206, '#5a4a2a', 6);
    ctx.globalAlpha = 1;
    teksPx(ctx, '2x2x2', x, 192, '#5a4a2a', 5);
  }
  function gambarPapanLuasDanIsi(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#dcc69e');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 28, 192, 56, 22, '#f4e8cc');
    P(ctx, x - 28, 192, 56, 2, '#8a6244');
    teksPx(ctx, 'x2 = LUAS', x, 197, '#5a4a2a', 5);
    teksPx(ctx, 'x3 = ISI', x, 205, '#c85a2a', 5);
    const al = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.4 + al * 0.5;
    teksPx(ctx, 'PANGKAT PUNYA BENTUK', x, 182, '#5a4a2a', 4);
    ctx.globalAlpha = 1;
  }
  function gambarPatungBentukSaudara(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#dcc69e');
    P(ctx, x - 24, 226, 20, 18, '#b8b4a8');
    P(ctx, x + 2, 214, 20, 30, '#a8a498');
    P(ctx, x - 28, 244, 28, 3, '#8a8478'); P(ctx, x - 2, 244, 28, 3, '#8a8478');
    const al = 0.5 + 0.5 * Math.sin(t * 2);
    ctx.globalAlpha = 0.4 + al * 0.5;
    teksPx(ctx, '2 & 3', x, 200, '#5a4a2a', 7);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'SAUDARA PANGKAT', x, 188, '#5a4a2a', 4);
  }

  function gambarGerbangRumahEmpatSembilan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d4b894');
    P(ctx, x - 22, 198, 8, 46, '#8a6a48'); P(ctx, x + 14, 198, 8, 46, '#8a6a48');
    P(ctx, x - 26, 190, 52, 10, '#6e5238');
    teksPx(ctx, '49', x, 185, '#ffd166', 7);
    const al = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.4 + al * 0.5;
    P(ctx, x - 8, 218, 16, 26, '#5a3a24');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'RUMAH 49', x, 178, '#5a4a2a', 5);
  }
  function gambarJalanLangkahTujuh(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d4b894');
    const mana = Math.floor(t * 2.5) % 7;
    for (let i = 0; i < 7; i++) {
      const sx = x - 30 + i * 10;
      P(ctx, sx, 234 - (i % 2) * 3, 8, 4, '#a8845a');
      ctx.globalAlpha = 0.5 + 0.5 * Math.sin(t * 4 + i);
      lingkaran(ctx, sx + 4, 231 - (i % 2) * 3, i === mana ? 5 : 2.5, i === mana ? '#ffe9a3' : '#ffd166');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, '7 LANGKAH KE 49', x, 196, '#5a4a2a', 5);
  }
  function gambarPapanAkarJalanBalik(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d4b894');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 28, 192, 56, 22, '#1e2a44');
    teksPx(ctx, '49 -> 7', x, 197, '#ffd166', 6);
    const al = 0.5 + 0.5 * Math.sin(t * 2.8);
    ctx.globalAlpha = 0.4 + al * 0.5;
    teksPx(ctx, '7x7 = 49', x, 206, '#7dffa8', 5);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'JALAN BALIK', x, 180, '#5a4a2a', 5);
  }
  function gambarLampuPulangPasangan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d4b894');
    P(ctx, x - 12, 210, 3, 34, '#6a4a32'); P(ctx, x + 9, 210, 3, 34, '#6a4a32');
    P(ctx, x - 16, 202, 11, 9, '#3a3e64'); P(ctx, x + 5, 202, 11, 9, '#3a3e64');
    const ganti = Math.floor(t * 2) % 2;
    ctx.globalAlpha = ganti ? 0.9 : 0.25; lingkaran(ctx, x - 10.5, 206, 5, '#ffd166'); ctx.globalAlpha = 1;
    ctx.globalAlpha = ganti ? 0.25 : 0.9; lingkaran(ctx, x + 10.5, 206, 5, '#7dffa8'); ctx.globalAlpha = 1;
    teksPx(ctx, 'PERGI & PULANG', x, 186, '#5a4a2a', 4);
  }

  function gambarPapanKasusDelapan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3e64');
    P(ctx, x - 3, 212, 5, 32, '#5a6088');
    P(ctx, x - 28, 190, 56, 24, '#1e2a44');
    teksPx(ctx, 'KASUS: 8', x, 194, '#ffd166', 6);
    const al = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.4 + al * 0.6;
    teksPx(ctx, '2 pangkat? = 8', x, 206, '#cdd9f5', 4);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'KANTOR DETEKTIF', x, 178, '#7ff2d8', 4);
  }
  function gambarKartuSaksiDuaEmpat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3e64');
    const saksi = ['2', '4', '8'];
    const mana = Math.floor(t * 2) % 3;
    for (let i = 0; i < 3; i++) {
      const sx = x - 20 + i * 15;
      P(ctx, sx, 210 + (i === mana ? -4 : 0), 13, 20, '#f0ecd8');
      teksPx(ctx, saksi[i], sx + 6, 216 + (i === mana ? -4 : 0), i === mana ? '#c85a2a' : '#3a4a2a', 7);
    }
    teksPx(ctx, 'JEJAK SAKSI', x, 192, '#7ff2d8', 5);
  }
  function gambarLampuJawabanTiga(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3e64');
    P(ctx, x - 3, 212, 5, 32, '#5a6088');
    const al = 0.5 + 0.5 * Math.sin(t * 3.4);
    ctx.globalAlpha = 0.3 + al * 0.4;
    lingkaran(ctx, x, 202, 15, '#7dffa8');
    ctx.globalAlpha = 1;
    lingkaran(ctx, x, 202, 9, '#7dffa8');
    teksPx(ctx, '3', x, 196, '#1e2a44', 9);
    teksPx(ctx, 'JAWABAN: 3', x, 182, '#7ff2d8', 5);
  }
  function gambarMejaBerkasLog(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3e64');
    P(ctx, x - 24, 228, 48, 6, '#8a6a48');
    P(ctx, x - 20, 234, 4, 10, '#6e5238'); P(ctx, x + 16, 234, 4, 10, '#6e5238');
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 16 + i * 3, 220 - i * 3, 30 - i * 6, 3, '#f0ecd8');
    }
    const mana = Math.floor(t * 2) % 3;
    ctx.globalAlpha = 0.5 + 0.5 * Math.sin(t * 3);
    teksPx(ctx, ['3', '4', '5'][mana], x + 20, 214 - mana * 3, '#ffd166', 6);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'BERKAS SELESAI', x, 192, '#7ff2d8', 4);
  }

  function gambarAnakTanggaNaikPangkat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c0d4a8');
    const s = [2, 4, 8, 16];
    const mana = Math.floor(t * 2) % 4;
    for (let i = 0; i < 4; i++) {
      const sx = x - 30 + i * 16, sy = 236 - i * 9;
      P(ctx, sx, sy, 15, 9 + i * 9, '#a89478');
      teksPx(ctx, String(s[i]), sx + 7, sy - 8, '#3a4a2a', 5);
      if (i === mana) { ctx.globalAlpha = 0.45 + 0.25 * Math.sin(t * 6); lingkaran(ctx, sx + 7, sy - 4, 8, '#ffe9a3'); ctx.globalAlpha = 1; }
    }
    teksPx(ctx, 'NAIK = KALI 2', x, 184, '#3a4a2a', 5);
  }
  function gambarAnakTanggaTurunBagi(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c0d4a8');
    const s = [8, 4, 2, 1];
    const mana = Math.floor(t * 2) % 4;
    for (let i = 0; i < 4; i++) {
      const sx = x - 30 + i * 16, sy = 200 + i * 9;
      P(ctx, sx, sy, 15, 9 + (3 - i) * 9, '#a89478');
      teksPx(ctx, String(s[i]), sx + 7, sy - 8, '#3a4a2a', 5);
      if (i === mana) { ctx.globalAlpha = 0.45 + 0.25 * Math.sin(t * 6); lingkaran(ctx, sx + 7, sy - 4, 8, '#a8e6a0'); ctx.globalAlpha = 1; }
    }
    teksPx(ctx, 'TURUN = BAGI 2', x, 184, '#3a4a2a', 5);
  }
  function gambarPijakanNolSatu(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c0d4a8');
    P(ctx, x - 18, 232, 36, 12, '#a89478');
    const al = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.4 + al * 0.6;
    teksPx(ctx, '1', x, 216, '#c85a2a', 11);
    ctx.globalAlpha = 1;
    teksPx(ctx, '2 PANGKAT 0 = 1', x, 196, '#3a4a2a', 5);
    teksPx(ctx, 'SEMUA BERANGKAT DARI SATU', x, 186, '#3a4a2a', 4);
  }
  function gambarPapanLanjutTurunSetengah(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c0d4a8');
    P(ctx, x - 3, 214, 5, 30, '#7a5230');
    P(ctx, x - 26, 194, 52, 22, '#1e2a44');
    teksPx(ctx, '1/2', x - 13, 198, '#ffd166', 7);
    teksPx(ctx, '1/4', x + 9, 198, '#7dffa8', 7);
    const al = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.4 + al * 0.5;
    teksPx(ctx, 'MASIH TURUN!', x, 208, '#cdd9f5', 4);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'PANGKAT MINUS', x, 182, '#3a4a2a', 5);
  }

  function gambarCawanKoloniSatu(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c2dcb8');
    P(ctx, x - 14, 224, 28, 12, '#d8ecf0');
    P(ctx, x - 16, 220, 32, 5, '#b8d8dc');
    const al = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.4 + al * 0.6;
    lingkaran(ctx, x, 228, 2.5, '#3e7a52');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'JAM 0: SATU', x, 204, '#3a5a4a', 5);
    teksPx(ctx, 'CATATAN PERTAMA', x, 192, '#3a5a4a', 4);
  }
  function gambarCawanKoloniEmpat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c2dcb8');
    P(ctx, x - 14, 224, 28, 12, '#d8ecf0');
    P(ctx, x - 16, 220, 32, 5, '#b8d8dc');
    for (let i = 0; i < 4; i++) {
      const al = 0.4 + 0.3 * Math.sin(t * 4 + i * 1.6);
      ctx.globalAlpha = 0.4 + al;
      lingkaran(ctx, x - 8 + (i % 2) * 10, 226 + Math.floor(i / 2) * 6, 2.2, '#3e7a52');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'JAM 2: EMPAT', x, 204, '#3a5a4a', 5);
    teksPx(ctx, 'TIAP JAM MENGGANDAKAN', x, 192, '#3a5a4a', 4);
  }
  function gambarPapanJamGandakan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c2dcb8');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 28, 192, 56, 22, '#f4e8cc');
    teksPx(ctx, '1 2 4 8 16', x, 197, '#3a5a4a', 5);
    const al = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.4 + al * 0.5;
    teksPx(ctx, 'TIAP JAM x2', x, 206, '#c85a2a', 5);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'IRAMA SETIA', x, 182, '#3a5a4a', 5);
  }
  function gambarPapanDenyutSetia(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c2dcb8');
    P(ctx, x - 3, 214, 5, 30, '#7a5230');
    P(ctx, x - 27, 194, 54, 22, '#1e2a44');
    const al = 0.5 + 0.5 * Math.sin(t * 2.2);
    ctx.globalAlpha = 0.4 + al * 0.5;
    teksPx(ctx, 'ALAM TUMBUH BERLIPAT', x, 198, '#7dffa8', 4);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'HITUNGAN HANYA ALAT', x, 206, '#fffdf2', 4);
    teksPx(ctx, 'DENYUT SETIA', x, 182, '#3a5a4a', 5);
  }

  function gambarBolaKaretDilepas(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8c298');
    P(ctx, x - 3, 200, 4, 44, '#8a6a48');
    teksPx(ctx, '100', x - 12, 194, '#5a4a2a', 4);
    const turun = (Math.sin(t * 2) + 1) / 2;
    lingkaran(ctx, x + 10, 204 + turun * 36, 6, '#3a6ea8');
    P(ctx, x + 9, 197 + turun * 36, 3, 3, '#d8e8f8');
    teksPx(ctx, 'JATUH DARI 100', x, 186, '#5a4a2a', 4);
  }
  function gambarGarisPantulanLimaPuluh(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8c298');
    const al = 0.5 + 0.5 * Math.sin(t * 2.8);
    ctx.globalAlpha = 0.4 + al * 0.6;
    for (let i = 0; i < 6; i++) P(ctx, x - 24 + i * 8, 222, 5, 2, '#c85a2a');
    ctx.globalAlpha = 1;
    lingkaran(ctx, x + 14, 216, 5, '#3a6ea8');
    teksPx(ctx, 'PANTUL: 50', x, 204, '#5a4a2a', 5);
    teksPx(ctx, 'SETENGAHNYA', x, 192, '#5a4a2a', 4);
  }
  function gambarPapanTinggiMenurun(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8c298');
    P(ctx, x - 3, 212, 5, 32, '#7a5230');
    P(ctx, x - 28, 192, 56, 22, '#f4e8cc');
    teksPx(ctx, '100 50 25', x, 197, '#5a4a2a', 5);
    const al = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.4 + al * 0.5;
    teksPx(ctx, '12,5', x, 205, '#c85a2a', 5);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'SETENGAH TERUS', x, 182, '#5a4a2a', 4);
  }
  function gambarPapanKecilTeratur(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8c298');
    P(ctx, x - 3, 214, 5, 30, '#7a5230');
    P(ctx, x - 26, 194, 52, 22, '#1e2a44');
    const al = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.4 + al * 0.5;
    teksPx(ctx, 'TANGGA PANGKAT TURUN', x, 198, '#7dffa8', 4);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'TURUN = BAGI 2', x, 206, '#ffd166', 4);
    teksPx(ctx, 'POLA JUJUR', x, 182, '#5a4a2a', 5);
  }

  function gambarTeleskopArahLangit(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#2a2e4c');
    P(ctx, x - 6, 224, 4, 20, '#5a6088'); P(ctx, x + 4, 224, 4, 20, '#5a6088'); P(ctx, x - 1, 236, 4, 8, '#5a6088');
    P(ctx, x - 10, 214, 20, 7, '#484e78');
    P(ctx, x + 6, 206, 12, 8, '#5a6088');
    const al = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.4 + al * 0.6;
    lingkaran(ctx, x + 16, 196, 2, '#fffdf2');
    lingkaran(ctx, x + 22, 188, 1.5, '#fffdf2');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'MENGHITUNG BINTANG', x, 182, '#7ff2d8', 4);
  }
  function gambarPapanBintangPuluhDua(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#2a2e4c');
    P(ctx, x - 3, 212, 5, 32, '#5a6088');
    P(ctx, x - 28, 190, 56, 24, '#1e2a44');
    teksPx(ctx, '10 PANGKAT 22', x, 194, '#ffd166', 4);
    const al = 0.5 + 0.5 * Math.sin(t * 2.2);
    ctx.globalAlpha = 0.4 + al * 0.6;
    teksPx(ctx, '1 + 22 NOL', x, 204, '#7dffa8', 5);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'ANGKA RAKSASA', x, 178, '#7ff2d8', 4);
  }
  function gambarPenggarisRambutMini(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#2a2e4c');
    P(ctx, x - 22, 222, 44, 12, '#d8b878');
    for (let i = 0; i < 7; i++) P(ctx, x - 20 + i * 6, 222, 1.5, 4, '#8a6a48');
    P(ctx, x - 18, 216, 34, 1.5, '#e8e2d0');
    const al = 0.5 + 0.5 * Math.sin(t * 2.8);
    ctx.globalAlpha = 0.4 + al * 0.6;
    teksPx(ctx, '0,1 MM', x + 4, 208, '#ffd166', 5);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'RAMBUT MINI', x, 198, '#7ff2d8', 5);
  }
  function gambarBukuTulisPangkat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#2a2e4c');
    P(ctx, x - 22, 220, 44, 20, '#f0ecd8');
    P(ctx, x - 22, 220, 4, 20, '#c8b490');
    P(ctx, x - 2, 220, 2, 20, '#d0c4a8');
    const mana = Math.floor(t * 2) % 2;
    teksPx(ctx, mana ? 'x10' : '10^22', x + 6, 226, '#3a4a2a', 5);
    ctx.globalAlpha = 0.4 + 0.3 * Math.sin(t * 3);
    teksPx(ctx, 'RAKSASA + MINI', x, 208, '#7dffa8', 4);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'JALAN PINTAS TULIS', x, 192, '#7ff2d8', 4);
  }

  function gambarLimaTanggaMisiPangkat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3e4266');
    const mana = Math.floor(t * 1.6) % 5;
    for (let i = 0; i < 5; i++) {
      const sx = x - 32 + i * 14, sy = 236 - i * 7;
      P(ctx, sx, sy, 13, 8 + i * 7, '#3e4266');
      ctx.globalAlpha = i === mana ? 0.9 : 0.3;
      lingkaran(ctx, sx + 6, sy - 3, 2.5, '#ffe9a3');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'LIMA TANGGA MISI', x, 182, '#7ff2d8', 4);
  }
  function gambarPapanMisiDuaLima(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3e4266');
    P(ctx, x - 3, 212, 5, 32, '#5a6088');
    P(ctx, x - 28, 192, 56, 22, '#1e2a44');
    teksPx(ctx, '32', x - 14, 196, '#ffd166', 7);
    teksPx(ctx, '9', x + 12, 196, '#7dffa8', 7);
    const al = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.4 + al * 0.5;
    teksPx(ctx, '2^5  AKAR81', x, 206, '#cdd9f5', 4);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'MISI 1 & 2', x, 180, '#7ff2d8', 5);
  }
  function gambarPapanMisiTigaEmpat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3e4266');
    P(ctx, x - 3, 212, 5, 32, '#5a6088');
    P(ctx, x - 28, 192, 56, 22, '#1e2a44');
    teksPx(ctx, '4', x - 13, 196, '#ffd166', 7);
    teksPx(ctx, '1', x + 11, 196, '#7dffa8', 7);
    const al = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.4 + al * 0.5;
    teksPx(ctx, 'LOG2(16)  3^0', x, 206, '#cdd9f5', 4);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'MISI 3 & 4', x, 180, '#7ff2d8', 5);
  }
  function gambarGerbangJuaraTangga(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3e4266');
    P(ctx, x - 26, 198, 7, 46, '#5a6088');
    P(ctx, x + 19, 198, 7, 46, '#5a6088');
    P(ctx, x - 28, 190, 56, 9, '#6a7098');
    for (let i = 0; i < 5; i++) {
      const al = 0.4 + 0.35 * Math.sin(t * 2.8 + i * 1.2);
      ctx.globalAlpha = 0.5 + al * 0.5;
      lingkaran(ctx, x - 20 + i * 10, 195, 2.5, '#ffe9a3');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'GERBANG JUARA', x, 178, '#7ff2d8', 5);
  }

  function gambarPapanSkorGunung(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8c8a0');
    P(ctx, x - 3, 206, 6, 38, '#6e5238');
    P(ctx, x - 30, 168, 60, 40, '#7a6248');
    P(ctx, x - 34, 160, 68, 10, '#5e4a34');
    const mana = Math.floor(t * 2) % 6;
    for (let i = 0; i < 6; i++) {
      const sx = x - 22 + (i % 3) * 16, sy = 172 + Math.floor(i / 3) * 15;
      P(ctx, sx, sy, 13, 12, '#2c3a54');
      if (i === mana) { ctx.globalAlpha = 0.5; lingkaran(ctx, sx + 6, sy + 6, 8, '#ffd166'); ctx.globalAlpha = 1; }
      teksPx(ctx, '472915'[i], sx + 2, sy + 5, '#ffe9a3', 6);
    }
    teksPx(ctx, 'TIM A VS TIM B', x, 150, '#5a4a2a', 4);
  }
  function gambarKotakAngkaBabak(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8c8a0');
    P(ctx, x - 24, 196, 48, 30, '#8a6a48');
    P(ctx, x - 26, 188, 52, 8, '#6e5238');
    const lang = Math.floor(t * 2.4) % 3;
    for (let k = 0; k < 3; k++) {
      P(ctx, x - 18 + k * 14, 202, 11, 9, '#2c3a54');
      teksPx(ctx, '472'[k], x - 15 + k * 14, 204, k === lang ? '#7dffa8' : '#ffe9a3', 5);
      P(ctx, x - 18 + k * 14, 214, 11, 9, '#2c3a54');
      teksPx(ctx, '915'[k], x - 15 + k * 14, 216, '#ffe9a3', 5);
      teksPx(ctx, 'B' + (k + 1), x - 15 + k * 14, 226, '#5a4a2a', 4);
    }
    teksPx(ctx, '3 BABAK', x, 178, '#5a4a2a', 4);
  }
  function gambarGarisBarisKolom(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8c8a0');
    P(ctx, x - 20, 190, 40, 36, '#e8dcc0');
    P(ctx, x - 20, 190, 40, 2, '#6e5238'); P(ctx, x - 20, 244, 40, 2, '#6e5238');
    P(ctx, x - 20, 190, 2, 36, '#6e5238'); P(ctx, x + 18, 190, 2, 36, '#6e5238');
    const mulai = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.4 + mulai * 0.6;
    P(ctx, x - 20, 207, 40, 2, '#2aa85e');
    P(ctx, x - 2, 190, 2, 36, '#c85a2a');
    ctx.globalAlpha = 0.4 + (1 - mulai) * 0.6;
    P(ctx, x - 20, 226, 40, 2, '#2aa85e'); P(ctx, x - 2, 190, 2, 36, '#c85a2a');
    ctx.globalAlpha = 1;
    teksPx(ctx, mulai > 0.5 ? 'BARIS ->' : '| KOLOM', x, 178, '#5a4a2a', 4);
  }
  function gambarLencanaTertataRapi(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8c8a0');
    P(ctx, x - 4, 214, 8, 30, '#8a6a48');
    const den = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x, 200, 14, '#ffe9a3'); ctx.globalAlpha = 1;
    lingkaran(ctx, x, 200, 11, '#ffd166');
    lingkaran(ctx, x, 200, 8, '#fff3cf');
    teksPx(ctx, '15:13', x - 11, 197, '#5a4a2a', 5);
    P(ctx, x - 12, 210, 4, 8, '#c85a2a'); P(ctx, x + 8, 210, 4, 8, '#c85a2a');
    teksPx(ctx, 'MENANG TERTATA', x, 178, '#5a4a2a', 4);
  }

  function gambarLorongPenginapanGunung(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 28, 186, 56, 58, '#c8a878');
    P(ctx, x - 32, 178, 64, 10, '#a8885c');
    for (let l = 0; l < 2; l++) for (let k = 0; k < 3; k++) {
      const ny = 190 + l * 26, nx = x - 20 + k * 15;
      P(ctx, nx, ny, 11, 18, '#6a4a30');
      teksPx(ctx, (l + 1) + '-' + (k + 1), nx - 2, ny + 20, '#5a4a2a', 4);
      if (l === 1 && k === 2) { ctx.globalAlpha = 0.4 + 0.25 * Math.sin(t * 3); lingkaran(ctx, nx + 5, ny + 8, 9, '#ffd166'); ctx.globalAlpha = 1; }
    }
    teksPx(ctx, 'LANTAI-KAMAR', x, 168, '#3a4a2a', 4);
  }
  function gambarPintuKamarLantaiDua(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 16, 186, 32, 58, '#c8a878');
    P(ctx, x - 13, 192, 26, 52, '#6a4a30');
    const den = 0.5 + 0.5 * Math.sin(t * 2.8);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x, 218, 12, '#ffd166'); ctx.globalAlpha = 1;
    teksPx(ctx, '2-3', x - 8, 212, '#ffe9a3', 7);
    lingkaran(ctx, x + 8, 220, 2, '#ffd166');
    teksPx(ctx, 'ISINYA 8', x, 176, '#3a4a2a', 5);
  }
  function gambarPapanUrutanAlamat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 3, 204, 6, 40, '#6a4a30');
    P(ctx, x - 24, 186, 48, 20, '#e8dcc0');
    P(ctx, x - 24, 186, 48, 2, '#6a4a30'); P(ctx, x - 24, 206, 48, 2, '#6a4a30');
    teksPx(ctx, 'LANTAI DULU', x - 21, 190, '#c85a2a', 4);
    teksPx(ctx, 'KAMAR KEMUDIAN', x - 22, 198, '#2aa85e', 4);
    const panah = Math.sin(t * 3) > 0 ? '>' : '>>';
    teksPx(ctx, panah, x + 28, 194, '#5a4a2a', 5);
    teksPx(ctx, 'BARIS - KOLOM', x, 174, '#3a4a2a', 4);
  }
  function gambarKunciTukarAlamat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 14, 238, 28, 6, '#8a6a48');
    const goyang = Math.sin(t * 4) * 0.2;
    ctx.save(); ctx.translate(x - 8, 238); ctx.rotate(goyang);
    P(ctx, -2, -18, 4, 18, '#ffd166'); lingkaran(ctx, 0, -20, 4, '#ffd166');
    ctx.restore();
    ctx.save(); ctx.translate(x + 8, 238); ctx.rotate(-goyang);
    P(ctx, -2, -14, 4, 14, '#ffe9a3'); lingkaran(ctx, 0, -16, 3, '#ffe9a3');
    ctx.restore();
    const bolak = Math.floor(t * 2) % 2;
    teksPx(ctx, bolak ? '9 -> 7' : '7 -> 9', x, 200, '#c85a2a', 5);
    teksPx(ctx, 'TUKAR = BEDA ISI', x, 182, '#3a4a2a', 4);
  }

  function gambarDuaPiringKueSejawat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#dcc69e');
    P(ctx, x - 30, 226, 60, 6, '#8a6244');
    P(ctx, x - 26, 232, 4, 12, '#7a5230'); P(ctx, x + 22, 232, 4, 12, '#7a5230');
    for (let p = 0; p < 2; p++) {
      const px = x - 20 + p * 40;
      lingkaran(ctx, px, 214, 13, '#fffdf2');
      lingkaran(ctx, px, 214, 10, '#f0e4c8');
      for (let i = 0; i < 4; i++) P(ctx, px - 7 + (i % 2) * 8, 208 + Math.floor(i / 2) * 7, 6, 5, p ? '#ffd166' : '#ffb85e');
    }
    teksPx(ctx, 'DUA PIRING', x, 186, '#6a4a2a', 4);
  }
  function gambarPiringHasilSejawat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#dcc69e');
    P(ctx, x - 3, 232, 6, 12, '#7a5230');
    const den = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.25 + den * 0.3; lingkaran(ctx, x, 212, 18, '#ffe9a3'); ctx.globalAlpha = 1;
    lingkaran(ctx, x, 212, 15, '#fffdf2');
    const hasil = '3435';
    for (let i = 0; i < 4; i++) {
      P(ctx, x - 10 + (i % 2) * 11, 200 + Math.floor(i / 2) * 11, 9, 9, '#ffd166');
      teksPx(ctx, hasil[i], x - 8 + (i % 2) * 11, 202 + Math.floor(i / 2) * 11, '#5a4a2a', 5);
    }
    teksPx(ctx, 'PIRING HASIL', x, 184, '#6a4a2a', 4);
  }
  function gambarKotakUkuranBeda(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#dcc69e');
    P(ctx, x - 28, 204, 44, 30, '#d8b8a0');
    const blokir = 0.5 + 0.5 * Math.sin(t * 3.4);
    ctx.globalAlpha = 0.4 + blokir * 0.6;
    P(ctx, x - 28, 218, 44, 2, '#c85a2a');
    ctx.globalAlpha = 1;
    for (let i = 0; i < 6; i++) P(ctx, x - 26 + (i % 3) * 13, 206 + Math.floor(i / 3) * 13, 10, 10, '#fffdf2');
    teksPx(ctx, '2X3', x + 24, 214, '#c85a2a', 6);
    teksPx(ctx, 'TAK PUNYA PASANGAN', x, 190, '#6a4a2a', 4);
  }
  function gambarPapanAturanSejawat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#dcc69e');
    P(ctx, x - 3, 206, 6, 38, '#7a5230');
    P(ctx, x - 30, 178, 60, 30, '#1e2a44');
    P(ctx, x - 30, 178, 60, 3, '#37476f');
    teksPx(ctx, 'ALAMAT SAMA', x - 26, 184, '#7dffa8', 5);
    teksPx(ctx, 'JUMLAHKAN', x - 21, 194, '#ffe9a3', 5);
    const den = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.4 + den * 0.6; teksPx(ctx, 'SEJAWAT!', x, 210, '#2aa85e', 5); ctx.globalAlpha = 1;
    teksPx(ctx, 'ATURAN PIKNIK', x, 168, '#6a4a2a', 4);
  }

  function gambarPapanResepSatuPorsi(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8c8a0');
    P(ctx, x - 3, 208, 6, 36, '#8a6a48');
    P(ctx, x - 22, 180, 44, 30, '#fffdf2');
    P(ctx, x - 22, 180, 44, 2, '#c8b890'); P(ctx, x - 22, 210, 44, 2, '#c8b890');
    teksPx(ctx, '3 1', x - 10, 188, '#5a4a2a', 6);
    teksPx(ctx, '2 4', x - 10, 198, '#5a4a2a', 6);
    teksPx(ctx, '1 PORSI', x, 168, '#5a4a2a', 4);
  }
  function gambarResepDigandakanDua(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8c8a0');
    P(ctx, x - 3, 208, 6, 36, '#8a6a48');
    P(ctx, x - 22, 180, 44, 30, '#fff3cf');
    P(ctx, x - 22, 180, 44, 2, '#d8b890'); P(ctx, x - 22, 210, 44, 2, '#d8b890');
    teksPx(ctx, '6 2', x - 10, 188, '#c85a2a', 6);
    teksPx(ctx, '4 8', x - 10, 198, '#c85a2a', 6);
    const den = 0.5 + 0.5 * Math.sin(t * 4);
    ctx.globalAlpha = 0.4 + den * 0.6;
    lingkaran(ctx, x + 24, 190, 9, '#ffd166');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'X2', x + 19, 186, '#5a4a2a', 6);
    teksPx(ctx, '2 PORSI', x, 168, '#5a4a2a', 4);
  }
  function gambarTimbanganBahanDobel(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8c8a0');
    P(ctx, x - 3, 226, 6, 18, '#8a6a48');
    P(ctx, x - 16, 240, 32, 4, '#6e5238');
    P(ctx, x - 18, 216, 36, 10, '#8a6a48');
    const uap = Math.sin(t * 3);
    ctx.globalAlpha = 0.35; lingkaran(ctx, x - 8, 206 + uap * 2, 3, '#fffdf2'); lingkaran(ctx, x + 6, 202 - uap * 2, 2.5, '#fffdf2'); ctx.globalAlpha = 1;
    const bolak = Math.floor(t * 1.6) % 2;
    teksPx(ctx, bolak ? '3' : '6', x - 6, 229, '#5a4a2a', 5);
    teksPx(ctx, bolak ? '3=6' : '4=8', x + 8, 204, '#c85a2a', 5);
    teksPx(ctx, 'CEK TIMBANGAN', x, 190, '#5a4a2a', 4);
  }
  function gambarNampanKueDuaPorsi(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8c8a0');
    P(ctx, x - 26, 224, 52, 8, '#b8845c');
    P(ctx, x - 22, 232, 4, 12, '#96683e'); P(ctx, x + 18, 232, 4, 12, '#96683e');
    for (let i = 0; i < 4; i++) {
      P(ctx, x - 20 + (i % 2) * 24, 208 + Math.floor(i / 2) * 12, 18, 10, '#ffd166');
      P(ctx, x - 20 + (i % 2) * 24, 208 + Math.floor(i / 2) * 12, 18, 3, '#ffe9a3');
    }
    teksPx(ctx, '6 2 / 4 8', x, 196, '#5a4a2a', 5);
    teksPx(ctx, 'SIAP DIJAMU', x, 184, '#5a4a2a', 4);
  }

  function gambarBarisAnakKiri(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c8d8c0');
    for (let i = 0; i < 2; i++) {
      const px = x - 14 + i * 28;
      P(ctx, px - 5, 220, 10, 16, '#3e5a72');
      lingkaran(ctx, px, 214, 6, '#e8c8a0');
      P(ctx, px + 6, 222, 9, 10, '#fffdf2');
      const den = Math.floor(t * 2) % 2 === i;
      teksPx(ctx, '12'[i], px + 9, 224, den ? '#c85a2a' : '#5a4a2a', 5);
    }
    teksPx(ctx, 'BARIS KIRI 1 2', x, 202, '#3a4a2a', 4);
  }
  function gambarKolomAnakKanan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c8d8c0');
    for (let i = 0; i < 2; i++) {
      const py = 236 - i * 26;
      P(ctx, x - 5, py, 10, 16, '#5a3e72');
      lingkaran(ctx, x, py - 6, 6, '#e8c8a0');
      P(ctx, x + 6, py + 2, 9, 10, '#fffdf2');
      const den = Math.floor(t * 2) % 2 === i;
      teksPx(ctx, '57'[i], x + 9, py + 4, den ? '#2aa85e' : '#3a4a2a', 5);
    }
    teksPx(ctx, 'KOLOM KANAN 5 7', x, 190, '#3a4a2a', 4);
  }
  function gambarKartuHasilSembilanBelas(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c8d8c0');
    P(ctx, x - 3, 230, 6, 14, '#8a7a5e');
    const den = 0.5 + 0.5 * Math.sin(t * 3.2);
    ctx.globalAlpha = 0.25 + den * 0.35; lingkaran(ctx, x, 206, 18, '#ffe9a3'); ctx.globalAlpha = 1;
    P(ctx, x - 18, 184, 36, 28, '#fffdf2');
    P(ctx, x - 18, 184, 36, 2, '#c8b890'); P(ctx, x - 18, 212, 36, 2, '#c8b890');
    teksPx(ctx, '19', x - 8, 194, '#2aa85e', 9);
    teksPx(ctx, '1X5+2X7', x, 176, '#3a4a2a', 4);
  }
  function gambarPapanArahBerbeda(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c8d8c0');
    P(ctx, x - 3, 206, 6, 38, '#8a7a5e');
    P(ctx, x - 30, 178, 60, 30, '#1e2a44');
    P(ctx, x - 30, 178, 60, 3, '#37476f');
    teksPx(ctx, 'AXB BUKAN BXA', x - 26, 184, '#ffe9a3', 5);
    const bolak = Math.floor(t * 2.4) % 2;
    teksPx(ctx, bolak ? '19' : '23', x - 6, 196, bolak ? '#7dffa8' : '#ff9db8', 6);
    teksPx(ctx, 'ARAHHYA BEDA', x, 168, '#3a4a2a', 4);
  }

  function gambarBerandaDuaBangku(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#dcc69e');
    P(ctx, x - 30, 234, 60, 4, '#8a5c38');
    for (let i = 0; i < 2; i++) {
      const px = x - 16 + i * 32, py = i ? 232 : 226;
      P(ctx, px - 6, py - 18, 12, 20, i ? '#5a7a9a' : '#7a5a9a');
      lingkaran(ctx, px, py - 24, 7, '#e8c8a0');
    }
    const den = Math.floor(t * 2) % 2;
    teksPx(ctx, den ? 'KAKAK' : 'ADIK', x, 192, '#6a4a2a', 4);
    teksPx(ctx, 'DUA SAUDARA', x, 180, '#6a4a2a', 4);
  }
  function gambarPapanJumlahTujuh(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#dcc69e');
    P(ctx, x - 3, 206, 6, 38, '#7a5230');
    P(ctx, x - 28, 176, 56, 30, '#1e2a44');
    P(ctx, x - 28, 176, 56, 3, '#37476f');
    teksPx(ctx, 'JUMLAH', x - 22, 182, '#ffe9a3', 5);
    const den = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.4 + den * 0.6;
    teksPx(ctx, '4+3=7', x - 14, 194, '#7dffa8', 6);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'PETUNJUK PERTAMA', x, 166, '#6a4a2a', 4);
  }
  function gambarPapanSelisihSatu(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#dcc69e');
    P(ctx, x - 3, 206, 6, 38, '#7a5230');
    P(ctx, x - 28, 176, 56, 30, '#1e2a44');
    P(ctx, x - 28, 176, 56, 3, '#37476f');
    teksPx(ctx, 'SELISIH', x - 20, 182, '#ffe9a3', 5);
    const den = 0.5 + 0.5 * Math.sin(t * 3 + 1);
    ctx.globalAlpha = 0.4 + den * 0.6;
    teksPx(ctx, '4-3=1', x - 14, 194, '#ffd166', 6);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'PETUNJUK KEDUA', x, 166, '#6a4a2a', 4);
  }
  function gambarKueAngkaEmpatTiga(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#dcc69e');
    P(ctx, x - 24, 226, 48, 6, '#8a6244');
    P(ctx, x - 20, 232, 4, 12, '#7a5230'); P(ctx, x + 16, 232, 4, 12, '#7a5230');
    for (let i = 0; i < 2; i++) {
      const px = x - 14 + i * 28;
      P(ctx, px - 9, 210, 18, 16, '#ffb8d8');
      P(ctx, px - 9, 210, 18, 4, '#ffd166');
      const den = 0.5 + 0.5 * Math.sin(t * 3 + i * 2);
      ctx.globalAlpha = 0.4 + den * 0.6; lingkaran(ctx, px, 204, 2.5, '#ff9db8'); ctx.globalAlpha = 1;
      teksPx(ctx, '43'[i], px - 4, 214, '#5a4a2a', 7);
    }
    teksPx(ctx, 'KUE 4 DAN 3', x, 188, '#6a4a2a', 4);
  }

  function gambarJalanTanjakDuaX(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d4b894');
    for (let i = 0; i < 4; i++) {
      P(ctx, x - 22 + i * 12, 236 - i * 12, 13, 4, '#a8846a');
      const den = Math.floor(t * 2) % 4 === i;
      if (den) { ctx.globalAlpha = 0.5; lingkaran(ctx, x - 16 + i * 12, 234 - i * 12, 5, '#ffd166'); ctx.globalAlpha = 1; }
    }
    teksPx(ctx, 'Y=2X', x + 12, 196, '#6a4a2a', 6);
    teksPx(ctx, 'JALAN MENANJAK', x, 178, '#6a4a2a', 4);
  }
  function gambarJalanTanggaPlusDua(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d4b894');
    for (let i = 0; i < 4; i++) {
      P(ctx, x - 22 + i * 12, 240 - i * 6, 13, 3, '#b8907a');
      const den = Math.floor(t * 2 + 1) % 4 === i;
      if (den) { ctx.globalAlpha = 0.5; lingkaran(ctx, x - 16 + i * 12, 238 - i * 6, 4.5, '#7dffa8'); ctx.globalAlpha = 1; }
    }
    teksPx(ctx, 'Y=X+2', x + 12, 220, '#6a4a2a', 6);
    teksPx(ctx, 'JALAN LANDAI', x, 200, '#6a4a2a', 4);
  }
  function gambarTiangTitikTemuDuaEmpat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d4b894');
    P(ctx, x - 3, 200, 6, 44, '#6a4a32');
    const den = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x, 190, 14, '#ffe9a3'); ctx.globalAlpha = 1;
    P(ctx, x - 17, 178, 34, 20, '#e8dcc0');
    P(ctx, x - 17, 178, 34, 2, '#6a4a32'); P(ctx, x - 17, 198, 34, 2, '#6a4a32');
    teksPx(ctx, '(2,4)', x - 12, 184, '#c85a2a', 7);
    teksPx(ctx, 'TITIK TEMU', x, 166, '#6a4a2a', 4);
  }
  function gambarDuaJalanSejajarJauh(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d4b894');
    for (let i = 0; i < 6; i++) {
      P(ctx, x - 24 + i * 9, 226 - i * 3, 5, 2, '#a8846a');
      P(ctx, x - 24 + i * 9, 240 - i * 3, 5, 2, '#b8907a');
    }
    const geser = Math.sin(t * 2) * 2;
    ctx.globalAlpha = 0.5;
    P(ctx, x + 28, 218 + geser, 3, 14, '#8a6a48'); P(ctx, x + 34, 218 - geser, 3, 14, '#8a6a48');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'SEJAJAR', x, 204, '#6a4a2a', 5);
    teksPx(ctx, 'TAK PERNAH BERTEMU', x, 190, '#6a4a2a', 4);
  }

  function gambarPapanRaporKelasKecil(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c8dcbe');
    P(ctx, x - 3, 202, 6, 42, '#8a7a5e');
    P(ctx, x - 28, 158, 56, 44, '#fffdf2');
    P(ctx, x - 28, 158, 56, 3, '#b8a888'); P(ctx, x - 28, 202, 56, 3, '#b8a888');
    teksPx(ctx, '8 7', x - 8, 164, '#5a4a2a', 5);
    teksPx(ctx, '9 6', x - 8, 174, '#5a4a2a', 5);
    teksPx(ctx, '7 8', x - 8, 184, '#5a4a2a', 5);
    teksPx(ctx, 'A B C', x + 24, 174, '#2aa85e', 4);
    teksPx(ctx, 'RAPOR KELAS', x, 146, '#3a4a2a', 4);
  }
  function gambarKotakNilaiTigaAnak(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c8dcbe');
    P(ctx, x - 22, 186, 44, 50, '#e8f0e0');
    P(ctx, x - 22, 186, 44, 2, '#8a9a78'); P(ctx, x - 22, 236, 44, 2, '#8a9a78');
    P(ctx, x - 22, 186, 2, 50, '#8a9a78'); P(ctx, x + 0, 186, 2, 50, '#8a9a78'); P(ctx, x + 22, 186, 2, 50, '#8a9a78');
    const mana = Math.floor(t * 2.4) % 3;
    const angka = '896787';
    for (let i = 0; i < 6; i++) {
      const ny = 190 + Math.floor(i / 2) * 15, nx = x - 18 + (i % 2) * 24;
      teksPx(ctx, angka[i], nx, ny, Math.floor(i / 2) === mana ? '#c85a2a' : '#5a4a2a', 5);
    }
    teksPx(ctx, '3X2', x + 30, 208, '#2aa85e', 5);
    teksPx(ctx, 'NILAI 3 ANAK', x, 172, '#3a4a2a', 4);
  }
  function gambarKartuAlamatNilaiSembilan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c8dcbe');
    P(ctx, x - 3, 230, 6, 14, '#8a7a5e');
    const den = 0.5 + 0.5 * Math.sin(t * 3.4);
    ctx.globalAlpha = 0.25 + den * 0.35; lingkaran(ctx, x, 208, 17, '#ffe9a3'); ctx.globalAlpha = 1;
    P(ctx, x - 16, 188, 32, 26, '#fffdf2');
    P(ctx, x - 16, 188, 32, 2, '#b8a888'); P(ctx, x - 16, 214, 32, 2, '#b8a888');
    teksPx(ctx, '9', x - 4, 194, '#2aa85e', 9);
    teksPx(ctx, 'BARIS 2 KOL 1', x, 176, '#3a4a2a', 4);
  }
  function gambarPapanJumlahKolom(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c8dcbe');
    P(ctx, x - 3, 206, 6, 38, '#8a7a5e');
    P(ctx, x - 30, 176, 60, 30, '#1e2a44');
    P(ctx, x - 30, 176, 60, 3, '#37476f');
    const den = Math.floor(t * 2) % 2;
    teksPx(ctx, den ? 'MATEMATIKA' : 'MENGGAMBAR', x - 26, 182, '#ffe9a3', 4);
    teksPx(ctx, den ? '24' : '21', x - 8, 192, den ? '#7dffa8' : '#ffd166', 7);
    teksPx(ctx, 'JUMLAH KOLOM', x, 166, '#3a4a2a', 4);
  }

  function gambarTigaKotakHadiahAbc(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3e64');
    for (let i = 0; i < 3; i++) {
      const px = x - 22 + i * 22, den = Math.floor(t * 2) % 3 === i;
      P(ctx, px, 216, 18, 24, den ? '#8a6a3e' : '#6e5230');
      P(ctx, px, 216, 18, 4, den ? '#ffd166' : '#b8a888');
      P(ctx, px + 7, 224, 4, 4, '#ffd166');
      ctx.globalAlpha = den ? 0.5 : 0; lingkaran(ctx, px + 9, 222, 10, '#ffe9a3'); ctx.globalAlpha = 1;
      teksPx(ctx, 'ABC'[i], px + 6, 226, den ? '#ffe9a3' : '#8fa2c8', 5);
    }
    teksPx(ctx, 'TIGA KOTAK', x, 202, '#ffe9a3', 4);
  }
  function gambarTimbanganPasanganKotak(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3e64');
    P(ctx, x - 3, 226, 6, 18, '#5a6088');
    P(ctx, x - 18, 242, 36, 3, '#464a76');
    const miring = Math.sin(t * 2.2) * 0.25;
    ctx.save(); ctx.translate(x, 226); ctx.rotate(miring);
    P(ctx, -22, 0, 44, 3, '#6a7098');
    P(ctx, -24, 3, 10, 8, '#ffd166'); P(ctx, 14, 3, 10, 8, '#ffd166');
    ctx.restore();
    const bolak = Math.floor(t * 1.8) % 3;
    teksPx(ctx, '354'[bolak], x - 2, 198, '#ffe9a3', 7);
    teksPx(ctx, '3+5+4=12', x, 184, '#7ff2d8', 4);
  }
  function gambarPapanTrikJumlahSemua(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3e64');
    P(ctx, x - 3, 206, 6, 38, '#464a76');
    P(ctx, x - 30, 176, 60, 32, '#1e2a44');
    P(ctx, x - 30, 176, 60, 3, '#37476f');
    teksPx(ctx, '3+5+4=12', x - 24, 182, '#ffe9a3', 5);
    const den = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.4 + den * 0.6;
    teksPx(ctx, 'SEMUA=6', x - 20, 194, '#7dffa8', 6);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'TRIK GUDANG', x, 166, '#8fa2c8', 4);
  }
  function gambarLampuIsiTigaKotak(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a3e64');
    P(ctx, x - 24, 232, 48, 6, '#464a76');
    const mana = Math.floor(t * 2.6) % 3;
    for (let i = 0; i < 3; i++) {
      const px = x - 18 + i * 18;
      const nyala = i === mana;
      ctx.globalAlpha = nyala ? 0.55 : 0.12; lingkaran(ctx, px, 214, nyala ? 10 : 7, '#ffe9a3'); ctx.globalAlpha = 1;
      lingkaran(ctx, px, 214, 6, nyala ? '#ffd166' : '#5a6088');
      teksPx(ctx, '123'[i], px - 4, 211, nyala ? '#5a4a2a' : '#2c3050', 6);
    }
    teksPx(ctx, 'A=1 B=2 C=3', x, 194, '#7ff2d8', 4);
  }

  function gambarLimaPapanMisiAngka(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3e4266');
    for (let i = 0; i < 5; i++) {
      const px = x - 26 + i * 13, nyala = Math.floor(t * 2.4) % 5 === i;
      P(ctx, px, 214 - (i % 2) * 6, 11, 16 + (i % 2) * 6, nyala ? '#6a7098' : '#4a5076');
      ctx.globalAlpha = nyala ? 0.6 : 0.12; lingkaran(ctx, px + 5, 218 - (i % 2) * 6, 5, '#ffe9a3'); ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'LIMA MISI', x, 198, '#ffe9a3', 4);
  }
  function gambarPapanMisiAlamatJumlah(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3e4266');
    P(ctx, x - 3, 206, 6, 38, '#464a76');
    P(ctx, x - 30, 176, 60, 32, '#1e2a44');
    P(ctx, x - 30, 176, 60, 3, '#37476f');
    teksPx(ctx, '2-KOL1? = 9', x - 24, 182, '#7dffa8', 4);
    teksPx(ctx, '2+1 = 3', x - 20, 194, '#ffe9a3', 5);
    teksPx(ctx, 'MISI 1 & 2', x, 166, '#8fa2c8', 4);
  }
  function gambarPapanMisiSapaSistem(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3e4266');
    P(ctx, x - 3, 206, 6, 38, '#464a76');
    P(ctx, x - 30, 176, 60, 32, '#1e2a44');
    P(ctx, x - 30, 176, 60, 3, '#37476f');
    teksPx(ctx, '2X4+3X5=23', x - 26, 182, '#7dffa8', 4);
    teksPx(ctx, '7 & 1 -> 4,3', x - 22, 194, '#ffe9a3', 5);
    teksPx(ctx, 'MISI 3-5', x, 166, '#8fa2c8', 4);
  }
  function gambarGerbangJuaraPapanAngka(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3e4266');
    P(ctx, x - 26, 198, 7, 46, '#5a6088');
    P(ctx, x + 19, 198, 7, 46, '#5a6088');
    P(ctx, x - 28, 190, 56, 9, '#6a7098');
    for (let i = 0; i < 5; i++) {
      const al = 0.4 + 0.35 * Math.sin(t * 2.8 + i * 1.2);
      ctx.globalAlpha = 0.5 + al * 0.5;
      lingkaran(ctx, x - 20 + i * 10, 195, 2.5, '#ffe9a3');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'PAPAN JUARA', x, 178, '#7ff2d8', 5);
  }

  function gambarGerbangSegitigaRaksasa(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    P(ctx, x - 34, 244, 68, 6, '#8a7256');
    P(ctx, x - 34, 244, 6, 56, '#9a8266');
    P(ctx, x + 28, 190, 6, 60, '#9a8266');
    P(ctx, x - 34, 238, 68, 6, '#8a7256');
    for (let i = 0; i < 5; i++) P(ctx, x - 28 + i * 12, 232 - i * 11, 10, 5, '#9a8266');
    const jalan = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.3 + jalan * 0.5; lingkaran(ctx, x + 2, 212, 10, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, '3-4-5', x - 30, 250, '#5a4a2a', 4);
  }
  function gambarDindingTegakLantai(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    P(ctx, x - 26, 172, 10, 72, '#a89078');
    P(ctx, x - 26, 240, 52, 4, '#96806a');
    const den = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.35 + den * 0.4; lingkaran(ctx, x - 21, 239, 7, '#ffd166'); ctx.globalAlpha = 1;
    teksPx(ctx, 'SIKU', x - 8, 252, '#5a4a2a', 4);
    teksPx(ctx, 'TEGAK', x - 33, 164, '#5a4a2a', 4);
    teksPx(ctx, 'ALAS', x + 6, 232, '#5a4a2a', 4);
  }
  function gambarJalanPintasMiring(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    P(ctx, x - 24, 224, 14, 20, '#b6a68c');
    P(ctx, x - 24, 224, 14, 20, '#b6a68c');
    P(ctx, x - 6, 204, 18, 40, '#a8987e');
    P(ctx, x + 16, 182, 24, 62, '#96806a');
    const mana = Math.floor(t * 2) % 3;
    if (mana === 0) { ctx.globalAlpha = 0.5; lingkaran(ctx, x - 17, 234, 8, '#ffe9a3'); ctx.globalAlpha = 1; }
    if (mana === 1) { ctx.globalAlpha = 0.5; lingkaran(ctx, x + 3, 224, 9, '#ffe9a3'); ctx.globalAlpha = 1; }
    if (mana === 2) { ctx.globalAlpha = 0.55; lingkaran(ctx, x + 28, 214, 11, '#7dffa8'); ctx.globalAlpha = 1; }
    teksPx(ctx, '5', x + 25, 210, '#fffdf2', 6);
    teksPx(ctx, 'MIRING PANJANG', x - 14, 172, '#5a4a2a', 4);
  }
  function gambarPapanNamaSisi(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    P(ctx, x - 4, 202, 8, 42, '#6e5238');
    P(ctx, x - 30, 172, 60, 34, '#7a6248');
    P(ctx, x - 34, 164, 68, 9, '#5e4a34');
    const mana = Math.floor(t * 1.6) % 3;
    const nama = ['ALAS', 'TEGAK', 'MIRING'];
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 24, 178 + i * 9, 48, 7, i === mana ? '#3e4266' : '#2c3a54');
      teksPx(ctx, nama[i], x - 16, 179 + i * 9, i === mana ? '#7dffa8' : '#ffe9a3', 5);
    }
  }
  function gambarLorongTigaTangga(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 30, 160, 8, 84, '#8a7a62');
    P(ctx, x - 30, 160, 56, 7, '#9a8a72');
    const mana = Math.floor(t * 1.4) % 3;
    for (let i = 0; i < 3; i++) {
      const tx = x - 24 + i * 16;
      const warna = i === mana ? '#ffd166' : '#6e5a44';
      P(ctx, tx, 196, 4, 48, warna);
      P(ctx, tx + 10, 214, 4, 30, warna);
      P(ctx, tx, 196, 14, 4, warna);
      if (i === mana) { ctx.globalAlpha = 0.45; lingkaran(ctx, tx + 7, 210, 7, '#ffe9a3'); ctx.globalAlpha = 1; }
    }
    teksPx(ctx, '3 TANGGA', x + 16, 154, '#5a4a2a', 4);
  }
  function gambarPapanNaikMaju(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 4, 200, 8, 44, '#6e5238');
    P(ctx, x - 28, 170, 56, 34, '#7a6248');
    P(ctx, x - 32, 162, 64, 9, '#5e4a34');
    const pas = [['3', '3'], ['2', '4'], ['4', '2']];
    const mana = Math.floor(t * 1.8) % 3;
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 22, 176 + i * 9, 44, 7, i === mana ? '#3e4266' : '#2c3a54');
      teksPx(ctx, pas[i][0], x - 18, 177 + i * 9, '#ffe9a3', 5);
      teksPx(ctx, pas[i][1], x + 4, 177 + i * 9, i === mana ? '#7dffa8' : '#ffe9a3', 5);
    }
    teksPx(ctx, 'NAIK MAJU', x, 154, '#5a4a2a', 4);
  }
  function gambarTanggaPembagiCuram(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 22, 176, 6, 68, '#8a7256');
    for (let i = 0; i < 3; i++) P(ctx, x - 18 + i * 12, 238 - i * 22, 12, 5, '#9a7a54');
    P(ctx, x + 12, 176, 6, 68, '#8a7256');
    const mana = Math.floor(t * 2) % 3;
    const angka = ['1', '0,5', '2'];
    for (let i = 0; i < 3; i++) {
      teksPx(ctx, angka[i], x - 4 + i * 12, 228 - i * 22, i === mana ? '#7dffa8' : '#ffe9a3', 5);
    }
    teksPx(ctx, '1  0,5  2', x, 164, '#5a4a2a', 4);
  }
  function gambarGelangCuramAman(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 4, 206, 8, 38, '#6e5238');
    const den = 0.5 + 0.5 * Math.sin(t * 3.2);
    P(ctx, x - 28, 178, 56, 26, den > 0.5 ? '#ffd166' : '#f2c14e');
    P(ctx, x - 32, 170, 64, 9, '#5e4a34');
    teksPx(ctx, '0,5 AMAN', x - 20, 182, '#5a4a2a', 5);
    P(ctx, x - 14, 208, 28, 7, '#c85a2a');
    teksPx(ctx, '2 CURAM', x - 19, 219, '#5a4a2a', 4);
  }
  function gambarMenaraTanggaSenja(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8bc94');
    P(ctx, x - 30, 132, 24, 112, '#7a6248');
    P(ctx, x - 34, 126, 32, 8, '#66503a');
    P(ctx, x - 6, 152, 5, 8, '#9a7a54');
    P(ctx, x - 1, 162, 5, 8, '#9a7a54');
    P(ctx, x + 4, 172, 5, 8, '#9a7a54');
    P(ctx, x + 9, 182, 5, 8, '#9a7a54');
    P(ctx, x + 14, 192, 5, 8, '#9a7a54');
    P(ctx, x + 19, 202, 5, 8, '#9a7a54');
    P(ctx, x + 24, 212, 5, 8, '#9a7a54');
    P(ctx, x - 30, 240, 62, 4, '#8a6a48');
    const jalan = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.3 + jalan * 0.5; lingkaran(ctx, x - 8, 148, 9, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, '5', x + 8, 236, '#5a4a2a', 5);
    teksPx(ctx, '4', x - 12, 128, '#5a4a2a', 5);
    teksPx(ctx, '3', x + 20, 240, '#5a4a2a', 5);
  }
  function gambarKartuSinusEmpatLima(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8bc94');
    P(ctx, x - 26, 178, 52, 62, '#f4e8c8');
    P(ctx, x - 26, 178, 52, 62, '#f4e8c8');
    P(ctx, x - 30, 170, 60, 9, '#8a6a48');
    const den = 0.5 + 0.5 * Math.sin(t * 2.8);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x, 209, 30, '#ffd166'); ctx.globalAlpha = 1;
    teksPx(ctx, 'SIN', x - 8, 184, '#b04a2a', 5);
    teksPx(ctx, '4/5=0,8', x - 19, 196, '#5a4a2a', 5);
    P(ctx, x - 18, 210, 36, 20, '#2c3a54');
    P(ctx, x - 18, 210, 29, 20, '#3e6ca8');
    teksPx(ctx, 'T', x - 4, 212, '#ffe9a3', 4);
  }
  function gambarKartuCosinusTigaLima(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8bc94');
    P(ctx, x - 26, 178, 52, 62, '#e8f0f4');
    P(ctx, x - 30, 170, 60, 9, '#4a6a88');
    const den = 0.5 + 0.5 * Math.sin(t * 2.8 + 2);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x, 209, 30, '#9fd8f0'); ctx.globalAlpha = 1;
    teksPx(ctx, 'COS', x - 11, 184, '#2a6a8a', 5);
    teksPx(ctx, '3/5=0,6', x - 19, 196, '#3a4a5a', 5);
    P(ctx, x - 18, 210, 36, 20, '#2c3a54');
    P(ctx, x - 18, 210, 22, 20, '#3e8ca8');
    teksPx(ctx, 'K', x - 4, 212, '#ffe9a3', 4);
  }
  function gambarPapanKuadratSatu(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8bc94');
    P(ctx, x - 4, 198, 8, 46, '#6e5238');
    P(ctx, x - 32, 168, 64, 32, '#2c3a54');
    P(ctx, x - 36, 160, 72, 9, '#5e4a34');
    teksPx(ctx, '0,64+0,36', x - 25, 172, '#ffe9a3', 5);
    teksPx(ctx, '= 1', x + 8, 182, '#7dffa8', 5);
    const den = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.3 + den * 0.4;
    P(ctx, x - 20, 210, 17, 17, '#3e6ca8');
    P(ctx, x + 3, 210, 17, 17, '#3e8ca8');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'SAHABAT', x - 18, 234, '#5a4a2a', 4);
  }
  function gambarDuaMenaraBanding(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    P(ctx, x - 26, 200, 14, 44, '#a89078');
    P(ctx, x - 12, 224, 10, 20, '#b6a68c');
    P(ctx, x + 4, 172, 18, 72, '#96806a');
    P(ctx, x + 26, 208, 12, 36, '#a89078');
    const jalan = 0.5 + 0.5 * Math.sin(t * 2.2);
    ctx.globalAlpha = 0.3 + jalan * 0.4;
    P(ctx, x - 19, 192, 30, 2, '#ffe9a3');
    P(ctx, x + 4, 164, 34, 2, '#ffe9a3');
    ctx.globalAlpha = 1;
    teksPx(ctx, '3-4-5', x - 27, 192, '#5a4a2a', 4);
    teksPx(ctx, '6-8-10', x + 2, 164, '#5a4a2a', 4);
  }
  function gambarPapanRasioSetia(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    P(ctx, x - 4, 200, 8, 44, '#6e5238');
    P(ctx, x - 30, 170, 60, 32, '#7a6248');
    P(ctx, x - 34, 162, 68, 9, '#5e4a34');
    const mana = Math.floor(t * 1.7) % 2;
    teksPx(ctx, '4/5 = 8/10', x - 22, 176, mana === 0 ? '#7dffa8' : '#ffe9a3', 5);
    teksPx(ctx, '0,8 & 0,6', x - 19, 186, mana === 1 ? '#7dffa8' : '#ffe9a3', 5);
    teksPx(ctx, 'SETIA', x - 12, 196, '#ffd166', 5);
  }
  function gambarTigaUkuranSebaris(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    P(ctx, x - 30, 216, 10, 28, '#a89078');
    P(ctx, x - 12, 196, 14, 48, '#96806a');
    P(ctx, x + 10, 172, 18, 72, '#8a7256');
    const mana = Math.floor(t * 1.5) % 3;
    const posX = [-25, -5, 19];
    if (mana >= 0) { ctx.globalAlpha = 0.45; lingkaran(ctx, x + posX[mana] + 5, 230 - mana * 22, 8, '#ffe9a3'); ctx.globalAlpha = 1; }
    teksPx(ctx, 'x1 x2 x3', x - 16, 162, '#5a4a2a', 4);
  }
  function gambarKunciSebangun(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    P(ctx, x - 4, 214, 8, 30, '#8a6a48');
    const den = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x, 202, 14, '#ffe9a3'); ctx.globalAlpha = 1;
    lingkaran(ctx, x - 2, 198, 9, '#ffd166');
    P(ctx, x + 4, 200, 18, 6, '#ffd166');
    P(ctx, x + 18, 200, 4, 10, '#e0b040');
    P(ctx, x - 30, 226, 12, 12, '#3e6ca8');
    P(ctx, x + 16, 226, 18, 12, '#2c5a8a');
    teksPx(ctx, 'SEBANGUN', x - 20, 164, '#5a4a2a', 4);
  }
  function gambarTongkatBayangan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#dcc69e');
    P(ctx, x - 6, 170, 6, 74, '#8a6a48');
    lingkaran(ctx, x - 3, 166, 4, '#ffd166');
    ctx.globalAlpha = 0.4;
    P(ctx, x, 240, 46, 4, '#7a6244');
    P(ctx, x, 244, 46, 3, '#6a5238');
    ctx.globalAlpha = 1;
    const den = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x + 23, 243, 8, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, '2 = 2', x - 12, 158, '#5a4a2a', 5);
  }
  function gambarPohonBayanganDuaBelas(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#dcc69e');
    P(ctx, x - 6, 148, 9, 96, '#7a5c3e');
    lingkaran(ctx, x - 2, 140, 16, '#4e7a4a');
    lingkaran(ctx, x - 14, 150, 11, '#5a8a54');
    lingkaran(ctx, x + 10, 152, 10, '#5a8a54');
    ctx.globalAlpha = 0.35;
    P(ctx, x - 2, 240, 66, 4, '#6a5238');
    P(ctx, x - 2, 244, 66, 3, '#5a4432');
    ctx.globalAlpha = 1;
    const den = 0.5 + 0.5 * Math.sin(t * 2.2);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x + 30, 243, 9, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, '12', x + 26, 230, '#5a4a2a', 5);
  }
  function gambarPapanPerbandinganBayang(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#dcc69e');
    P(ctx, x - 4, 202, 8, 42, '#6e5238');
    P(ctx, x - 30, 172, 60, 32, '#f4e8c8');
    P(ctx, x - 34, 164, 68, 9, '#8a6a48');
    teksPx(ctx, '2/2 = 1', x - 14, 178, '#b04a2a', 5);
    teksPx(ctx, '1x12=12', x - 17, 188, '#5a4a2a', 5);
    const den = 0.5 + 0.5 * Math.sin(t * 2.8);
    teksPx(ctx, den > 0.5 ? 'POHON!' : 'TERJAWAB', x - 17, 197, '#2a6a3a', 4);
  }
  function gambarBuktiMemukulSama(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#dcc69e');
    lingkaran(ctx, x - 16, 176, 10, '#ff9d6b');
    const jalan = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.3 + jalan * 0.5;
    P(ctx, x - 12, 184, 5, 5, '#ffd166');
    P(ctx, x - 6, 190, 5, 5, '#ffd166');
    P(ctx, x, 196, 5, 5, '#ffd166');
    P(ctx, x + 6, 202, 5, 5, '#ffd166');
    ctx.globalAlpha = 1;
    P(ctx, x + 10, 206, 6, 38, '#8a6a48');
    P(ctx, x + 6, 240, 30, 4, '#7a6244');
    teksPx(ctx, '45!', x - 22, 158, '#b04a2a', 6);
    teksPx(ctx, 'NAIK=MAJU', x - 20, 248, '#5a4a2a', 4);
  }
  function gambarAyunanTamanBunga(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#dcc69e');
    P(ctx, x - 24, 160, 7, 84, '#8a6a48');
    P(ctx, x + 17, 160, 7, 84, '#8a6a48');
    P(ctx, x - 30, 152, 60, 9, '#9a7a54');
    const ayun = Math.sin(t * 1.8) * 10;
    P(ctx, x - 9 + ayun, 162, 4, 46, '#6e5a44');
    P(ctx, x + 5 + ayun, 162, 4, 46, '#6e5a44');
    P(ctx, x - 12 + ayun, 206, 24, 8, '#c89060');
    lingkaran(ctx, x - 34, 238, 4, '#e878a0');
    lingkaran(ctx, x + 33, 238, 4, '#e8b0c8');
    teksPx(ctx, 'AYUN', x - 10, 140, '#5a4a2a', 4);
  }
  function gambarTaliNaikTurun(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#dcc69e');
    P(ctx, x - 4, 156, 8, 6, '#8a7256');
    const naik = (0.5 + 0.5 * Math.sin(t * 2.2)) * 36;
    P(ctx, x - 14, 162, 3, 34 + naik, '#6e5a44');
    P(ctx, x + 11, 162, 3, 34 + naik, '#6e5a44');
    P(ctx, x - 17, 196 + naik, 34, 9, '#c89060');
    teksPx(ctx, '3', x + 22, 190 + naik, '#b04a2a', 6);
    teksPx(ctx, 'NAIK-TURUN', x - 24, 148, '#5a4a2a', 4);
  }
  function gambarKertasGrafikAyunan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#dcc69e');
    P(ctx, x - 28, 172, 56, 66, '#f8f4e4');
    P(ctx, x - 28, 204, 56, 2, '#b8b0a0');
    P(ctx, x - 28, 172, 2, 66, '#b8b0a0');
    for (let i = 0; i < 7; i++) {
      const ting = [4, 12, 22, 26, 22, 12, 4][i];
      P(ctx, x - 24 + i * 8, 203 - ting, 6, ting, i % 2 ? '#9fd8f0' : '#3e6ca8');
    }
    const mana = Math.floor(t * 2.4) % 7;
    P(ctx, x - 24 + mana * 8, 169, 6, 3, '#c85a2a');
    teksPx(ctx, 'GELOMBANG', x - 22, 246, '#5a4a2a', 4);
  }
  function gambarJamAyunanSetia(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#dcc69e');
    P(ctx, x - 14, 160, 28, 34, '#8a6a48');
    P(ctx, x - 18, 154, 36, 8, '#6e5238');
    const ayun = Math.sin(t * 2) * 7;
    P(ctx, x - 2 + ayun * 0.3, 194, 3, 24, '#6e5a44');
    lingkaran(ctx, x - 1 + ayun, 222, 5, '#ffd166');
    teksPx(ctx, '4 DETIK', x + 20, 200, '#5a4a2a', 4);
    teksPx(ctx, 'SETIA', x - 12, 246, '#5a4a2a', 4);
  }
  function gambarRodaRaksasaMalam(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#303450');
    lingkaran(ctx, x, 176, 40, '#3e4468');
    lingkaran(ctx, x, 176, 34, '#2c3050');
    lingkaran(ctx, x, 176, 4, '#5a6088');
    for (let i = 0; i < 8; i++) {
      const sud = t * 0.9 + i * Math.PI / 4;
      const lx = x + 34 * Math.cos(sud), ly = 176 + 34 * Math.sin(sud);
      ctx.globalAlpha = 0.55 + 0.35 * Math.sin(t * 3 + i);
      lingkaran(ctx, lx, ly, 3, '#ffe9a3');
      ctx.globalAlpha = 1;
    }
    P(ctx, x - 3, 216, 6, 28, '#3a4166');
    teksPx(ctx, 'RODA MALAM', x - 22, 248, '#7ff2d8', 4);
  }
  function gambarLampuTepiRoda(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#303450');
    lingkaran(ctx, x - 6, 196, 24, '#3e4468');
    lingkaran(ctx, x - 6, 196, 20, '#2c3050');
    const sud = t * 1.4;
    const lx = x - 6 + 20 * Math.cos(sud), ly = 196 + 20 * Math.sin(sud);
    P(ctx, x - 26, 196, 40, 1, '#3e4468');
    ctx.globalAlpha = 0.6 + 0.4 * Math.sin(t * 4);
    lingkaran(ctx, lx, ly, 4, '#ffd166');
    lingkaran(ctx, lx, ly, 7, '#ffe9a3');
    ctx.globalAlpha = 1;
    P(ctx, x + 22, 172, 2, 48, '#5a6088');
    teksPx(ctx, '10', x + 26, 168, '#ffe9a3', 5);
    teksPx(ctx, '0', x + 26, 218, '#ffe9a3', 5);
  }
  function gambarPapanTinggiLampu(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#303450');
    P(ctx, x - 4, 198, 8, 46, '#3a4166');
    P(ctx, x - 30, 170, 60, 32, '#2c3a54');
    P(ctx, x - 34, 162, 68, 9, '#3e4468');
    for (let i = 0; i < 7; i++) {
      const ting = [4, 10, 18, 24, 18, 10, 4][i];
      P(ctx, x - 26 + i * 8, 200 - ting, 6, ting, '#4a6fa8');
    }
    const mana = Math.floor(t * 2.6) % 7;
    const urut = ['0', '3', '7', '10', '7', '3', '0'];
    teksPx(ctx, urut[mana], x - 24 + mana * 8, 168, '#7dffa8', 4);
    teksPx(ctx, 'PUNCAK 10', x - 20, 250, '#7ff2d8', 4);
  }
  function gambarKabinTurunNaik(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#303450');
    P(ctx, x + 18, 168, 3, 76, '#5a6088');
    const naik = (0.5 + 0.5 * Math.sin(t * 1.6)) * 44;
    P(ctx, x + 10, 172 + naik, 14, 3, '#3e4468');
    P(ctx, x + 6, 175 + naik, 22, 16, '#c89060');
    P(ctx, x + 10, 178 + naik, 6, 6, '#ffe9a3');
    lingkaran(ctx, x - 12, 190, 18, '#3e4468');
    lingkaran(ctx, x - 12, 190, 15, '#2c3050');
    teksPx(ctx, '0-10', x - 20, 164, '#7ff2d8', 5);
    teksPx(ctx, 'SETIA', x - 12, 250, '#7ff2d8', 4);
  }
  function gambarTigaGerbangSudut(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    const sudut = ['45', '60', '30'];
    const mana = Math.floor(t * 1.6) % 3;
    for (let i = 0; i < 3; i++) {
      const gx = x - 30 + i * 24;
      P(ctx, gx, 216, 20, 4, '#8a7256');
      P(ctx, gx, 220, 4, 24, '#9a8266');
      P(ctx, gx + 16, 220, 4, 24, '#9a8266');
      ctx.globalAlpha = i === mana ? 0.6 : 0.25;
      lingkaran(ctx, gx + 10, 214, 6, '#ffe9a3');
      ctx.globalAlpha = 1;
      teksPx(ctx, sudut[i], gx + 5, 246, i === mana ? '#b04a2a' : '#5a4a2a', 4);
    }
    teksPx(ctx, 'ISTIMEWA', x - 20, 162, '#5a4a2a', 4);
  }
  function gambarGerbangKembarEmpatLima(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    P(ctx, x - 24, 196, 48, 5, '#8a7256');
    P(ctx, x - 24, 201, 6, 43, '#9a8266');
    P(ctx, x + 18, 201, 6, 43, '#9a8266');
    for (let i = 0; i < 4; i++) P(ctx, x - 18 + i * 10, 190 - i * 5, 9, 4, '#9a8266');
    const den = 0.5 + 0.5 * Math.sin(t * 2.8);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x - 3, 192, 9, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, '1 = 1', x - 11, 176, '#b04a2a', 5);
    teksPx(ctx, '45 KEMBAR', x - 21, 248, '#5a4a2a', 4);
  }
  function gambarGerbangSetengahTigaPuluh(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    P(ctx, x - 24, 226, 48, 5, '#8a7256');
    P(ctx, x - 24, 231, 6, 13, '#9a8266');
    P(ctx, x + 18, 201, 6, 43, '#9a8266');
    for (let i = 0; i < 5; i++) P(ctx, x - 18 + i * 8, 224 - i * 5, 8, 4, '#9a8266');
    const den = 0.5 + 0.5 * Math.sin(t * 2.6 + 1);
    teksPx(ctx, '1/2', x - 6, 206, den > 0.5 ? '#2a6a3a' : '#5a8a5a', 6);
    teksPx(ctx, '6->3', x + 22, 216, '#5a4a2a', 4);
    teksPx(ctx, '30 SETENGAH', x - 25, 248, '#5a4a2a', 4);
  }
  function gambarGerbangEnamPuluhTinggi(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    P(ctx, x - 20, 182, 44, 5, '#8a7256');
    P(ctx, x - 20, 187, 6, 57, '#9a8266');
    P(ctx, x + 18, 222, 6, 22, '#9a8266');
    for (let i = 0; i < 6; i++) P(ctx, x - 16 + i * 6, 178 - i * 2, 6, 4, '#9a8266');
    const den = 0.5 + 0.5 * Math.sin(t * 2.4 + 2);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x + 2, 178, 9, '#ffd166'); ctx.globalAlpha = 1;
    teksPx(ctx, '1,73', x + 24, 200, '#b04a2a', 5);
    teksPx(ctx, '60 JANGKUNG', x - 25, 248, '#5a4a2a', 4);
  }
  function gambarKolamRiakBulan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#283050');
    P(ctx, x - 36, 200, 72, 44, '#1c2440');
    P(ctx, x - 36, 200, 72, 3, '#344068');
    lingkaran(ctx, x - 18, 182, 8, '#e8ecf8');
    ctx.globalAlpha = 0.4; lingkaran(ctx, x - 18, 210, 6, '#e8ecf8'); ctx.globalAlpha = 1;
    for (let i = 0; i < 3; i++) {
      const r = 8 + ((t * 10 + i * 12) % 24);
      ctx.globalAlpha = 0.5 - (r - 8) * 0.016;
      ctx.strokeStyle = '#9fb8f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x + 12, 222, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'KOLAM MALAM', x - 26, 190, '#7ff2d8', 4);
  }
  function gambarKerikilJatuhTengah(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#283050');
    P(ctx, x - 36, 206, 72, 38, '#1c2440');
    const jatuh = (t * 20) % 40;
    P(ctx, x + 2, 168 + jatuh * 0.8, 6, 5, '#8a8a9a');
    for (let i = 0; i < 3; i++) {
      const r = 5 + ((t * 8 + i * 9) % 18);
      ctx.globalAlpha = 0.6 - (r - 5) * 0.025;
      ctx.strokeStyle = '#9fb8f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x + 4, 226, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    lingkaran(ctx, x + 4, 226, 4, '#a8a8bc');
    teksPx(ctx, 'KERIKIL', x - 22, 178, '#7ff2d8', 4);
  }
  function gambarPuncakKePuncakEmpat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#283050');
    P(ctx, x - 34, 238, 68, 3, '#344068');
    for (let i = 0; i < 7; i++) {
      const ting = [8, 22, 8, 22, 8, 22, 8][i];
      P(ctx, x - 30 + i * 10, 236 - ting, 8, ting, i % 2 ? '#9fb8f0' : '#344068');
    }
    const mana = Math.floor(t * 2) % 2;
    teksPx(ctx, '2', x - 28, 232, mana ? '#7dffa8' : '#ffe9a3', 4);
    teksPx(ctx, '6', x - 8, 210, mana ? '#ffe9a3' : '#7dffa8', 4);
    teksPx(ctx, '10', x + 12, 210, '#7dffa8', 4);
    teksPx(ctx, 'JARAK 4', x - 16, 164, '#7ff2d8', 5);
  }
  function gambarLembahRiakSetia(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#283050');
    P(ctx, x - 36, 206, 72, 38, '#1c2440');
    for (let i = 0; i < 6; i++) {
      const ting = [20, 8, 20, 8, 20, 8][i];
      P(ctx, x - 30 + i * 11, 226 - ting, 9, ting, i % 2 ? '#344068' : '#9fb8f0');
    }
    const den = 0.5 + 0.5 * Math.sin(t * 2.4);
    teksPx(ctx, '4 8 12', x - 14, 200, den > 0.5 ? '#7dffa8' : '#ffe9a3', 5);
    teksPx(ctx, 'LEMBAH SETIA', x - 25, 250, '#7ff2d8', 4);
  }
  function gambarMenaraPengukurMalam(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#2c3050');
    P(ctx, x - 12, 150, 24, 94, '#3e4468');
    P(ctx, x - 16, 144, 32, 8, '#4a5078');
    P(ctx, x - 6, 128, 3, 18, '#5a6088');
    P(ctx, x - 3, 128, 14, 9, '#c85a2a');
    for (let i = 0; i < 5; i++) {
      ctx.globalAlpha = 0.4 + 0.4 * Math.sin(t * 2.6 + i * 1.1);
      lingkaran(ctx, x - 34 + i * 17, 236, 3, '#ffe9a3');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'PUNCAK', x - 16, 118, '#7ff2d8', 5);
  }
  function gambarPapanMisiSisiTangga(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#2c3050');
    P(ctx, x - 4, 200, 8, 44, '#3a4166');
    P(ctx, x - 32, 168, 64, 34, '#2c3a54');
    P(ctx, x - 36, 160, 72, 9, '#3e4468');
    const mana = Math.floor(t * 1.8) % 2;
    teksPx(ctx, 'SISI: 5', x - 12, 174, mana === 0 ? '#7dffa8' : '#ffe9a3', 5);
    teksPx(ctx, 'TANGGA 0,8', x - 24, 186, mana === 1 ? '#7dffa8' : '#ffe9a3', 5);
    teksPx(ctx, 'MISI 1-2', x - 16, 196, '#ffd166', 5);
  }
  function gambarPapanMisiBayangMenara(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#2c3050');
    P(ctx, x - 4, 200, 8, 44, '#3a4166');
    P(ctx, x - 32, 168, 64, 34, '#2c3a54');
    P(ctx, x - 36, 160, 72, 9, '#3e4468');
    const mana = Math.floor(t * 1.8 + 1) % 2;
    teksPx(ctx, 'BAYANG 8', x - 20, 174, mana === 0 ? '#7dffa8' : '#ffe9a3', 5);
    teksPx(ctx, '6/10=0,6', x - 19, 186, mana === 1 ? '#7dffa8' : '#ffe9a3', 5);
    teksPx(ctx, 'MISI 3-4', x - 16, 196, '#ffd166', 5);
  }
  function gambarLimaPapanMisiJauh(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#2c3050');
    for (let i = 0; i < 5; i++) {
      const px = x - 32 + i * 15;
      P(ctx, px, 226 - i * 12, 12, 9 + i * 12, '#3e4468');
      P(ctx, px - 2, 218 - i * 12, 16, 8, '#4a5078');
      ctx.globalAlpha = 0.4 + 0.35 * Math.sin(t * 2.8 + i * 1.2);
      lingkaran(ctx, px + 6, 214 - i * 12, 2.5, '#ffe9a3');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, '6/2 = 3', x - 14, 152, '#7dffa8', 5);
    teksPx(ctx, 'MISI 5', x - 12, 246, '#7ff2d8', 4);
  }
  function gambarDuaPanahBerlawanan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    P(ctx, x - 4, 196, 8, 48, '#8a7256');
    P(ctx, x - 36, 200, 30, 8, '#9a8266');
    P(ctx, x - 40, 194, 8, 8, '#9a8266');
    P(ctx, x + 6, 200, 30, 8, '#9a8266');
    P(ctx, x + 34, 194, 8, 8, '#9a8266');
    const den = 0.5 + 0.5 * Math.sin(t * 2.2);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x - 34, 198, 6, '#ffe9a3'); lingkaran(ctx, x + 34, 198, 6, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, '5', x - 30, 184, '#5a4a2a', 6);
    teksPx(ctx, '5', x + 24, 184, '#5a4a2a', 6);
    teksPx(ctx, 'PATOK', x - 13, 252, '#5a4a2a', 4);
  }
  function gambarPapanBesarArah(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    P(ctx, x - 4, 204, 8, 40, '#6e5238');
    P(ctx, x - 30, 172, 60, 36, '#7a6248');
    P(ctx, x - 34, 164, 68, 9, '#5e4a34');
    teksPx(ctx, '5 TIMUR', x - 26, 178, '#ffe9a3', 5);
    teksPx(ctx, '5 BARAT', x - 26, 192, '#7dffa8', 5);
    const mana = Math.floor(t * 2) % 2;
    ctx.globalAlpha = 0.5; lingkaran(ctx, mana === 0 ? x - 32 : x + 32, 190, 5, '#ffe9a3'); ctx.globalAlpha = 1;
  }
  function gambarPatokJarakSepuluh(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    P(ctx, x - 30, 200, 6, 44, '#9a8266');
    P(ctx, x + 24, 200, 6, 44, '#9a8266');
    P(ctx, x - 2, 216, 4, 28, '#8a7256');
    const jalan = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.3 + jalan * 0.5; lingkaran(ctx, x, 214, 9, '#7dffa8'); ctx.globalAlpha = 1;
    teksPx(ctx, '10', x - 7, 226, '#5a4a2a', 6);
    teksPx(ctx, 'JARAK', x - 14, 194, '#5a4a2a', 4);
  }
  function gambarGerbangArahVektor(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    P(ctx, x - 34, 186, 6, 58, '#8a7256');
    P(ctx, x + 28, 186, 6, 58, '#8a7256');
    P(ctx, x - 34, 178, 68, 8, '#8a7256');
    P(ctx, x - 30, 168, 4, 10, '#9a8266');
    P(ctx, x - 26, 172, 12, 4, '#9a8266');
    P(ctx, x + 14, 172, 12, 4, '#9a8266');
    P(ctx, x + 26, 168, 4, 10, '#9a8266');
    const den = 0.5 + 0.5 * Math.sin(t * 2.8);
    ctx.globalAlpha = 0.3 + den * 0.45; lingkaran(ctx, x, 196, 10, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, 'VEKTOR', x - 18, 252, '#5a4a2a', 5);
  }
  function gambarJalanZigzagSekolah(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 28, 232, 18, 4, '#8a7a5c');
    P(ctx, x - 10, 222, 18, 4, '#8a7a5c');
    P(ctx, x + 8, 212, 18, 4, '#8a7a5c');
    P(ctx, x - 32, 210, 12, 24, '#c8845c');
    P(ctx, x - 34, 204, 16, 7, '#a85c3a');
    P(ctx, x + 18, 188, 16, 26, '#b8c4d8');
    P(ctx, x + 16, 182, 20, 6, '#8a94b0');
    const mana = Math.floor(t * 1.8) % 3;
    ctx.globalAlpha = 0.5; lingkaran(ctx, x - 19 + mana * 18, 228 - mana * 10, 4, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, 'SEKOLAH', x + 8, 170, '#5a4a2a', 4);
  }
  function gambarPanahLurusTikus(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 26, 196, 44, 4, '#c85a2a');
    P(ctx, x + 18, 190, 8, 4, '#c85a2a');
    P(ctx, x + 18, 202, 8, 4, '#c85a2a');
    P(ctx, x + 24, 194, 6, 8, '#c85a2a');
    const den = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.35 + den * 0.4; lingkaran(ctx, x, 194, 7, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, 'PINTAS', x - 12, 252, '#5a4a2a', 5);
  }
  function gambarSegitigaJalanSiku(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 22, 238, 42, 4, '#8a7a5c');
    P(ctx, x + 16, 208, 4, 34, '#8a7a5c');
    for (let i = 0; i < 5; i++) P(ctx, x - 20 + i * 8, 234 - i * 7, 7, 4, '#c85a2a');
    teksPx(ctx, '4', x - 6, 248, '#5a4a2a', 5);
    teksPx(ctx, '3', x + 22, 222, '#5a4a2a', 5);
    teksPx(ctx, '5', x - 4, 196, '#5a4a2a', 5);
  }
  function gambarPapanPetunjukPanah(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 4, 200, 8, 44, '#6e5238');
    P(ctx, x - 30, 170, 60, 34, '#7a6248');
    P(ctx, x - 34, 162, 68, 9, '#5e4a34');
    teksPx(ctx, 'JARAK', x - 22, 176, '#ffe9a3', 5);
    teksPx(ctx, 'ARAH', x - 16, 190, '#7dffa8', 5);
    const den = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x + 26, 178, 5, '#ffe9a3'); ctx.globalAlpha = 1;
  }
  function gambarDuaPanahBerturut(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 30, 214, 22, 4, '#6e5a44');
    P(ctx, x - 12, 208, 6, 4, '#6e5a44');
    P(ctx, x - 12, 220, 6, 4, '#6e5a44');
    P(ctx, x + 2, 200, 22, 4, '#9a8266');
    P(ctx, x + 20, 194, 6, 4, '#9a8266');
    P(ctx, x + 20, 206, 6, 4, '#9a8266');
    const mana = Math.floor(t * 2) % 2;
    ctx.globalAlpha = 0.5; lingkaran(ctx, mana === 0 ? x - 16 : x + 14, mana === 0 ? 214 : 200, 6, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, '3', x - 22, 224, '#5a4a2a', 5);
    teksPx(ctx, '2', x + 8, 210, '#5a4a2a', 5);
  }
  function gambarPanahJumlahTunggal(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 30, 202, 48, 5, '#7dffa8');
    P(ctx, x + 18, 196, 6, 5, '#7dffa8');
    P(ctx, x + 18, 208, 6, 5, '#7dffa8');
    P(ctx, x + 24, 200, 6, 9, '#7dffa8');
    const den = 0.5 + 0.5 * Math.sin(t * 2.8);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x, 200, 8, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, 'JADI 5', x - 14, 252, '#5a4a2a', 5);
  }
  function gambarJalurMundurSambung(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 28, 212, 24, 4, '#6e5a44');
    P(ctx, x - 8, 206, 6, 4, '#6e5a44');
    P(ctx, x - 8, 218, 6, 4, '#6e5a44');
    P(ctx, x - 8, 212, 18, 4, '#c85a2a');
    P(ctx, x + 6, 206, 6, 4, '#c85a2a');
    P(ctx, x + 6, 218, 6, 4, '#c85a2a');
    P(ctx, x + 2, 228, 12, 4, '#7dffa8');
    P(ctx, x + 10, 226, 5, 4, '#7dffa8');
    P(ctx, x + 10, 230, 5, 4, '#7dffa8');
    teksPx(ctx, 'SISA 1', x - 8, 194, '#5a4a2a', 5);
  }
  function gambarPapanUjungKeUjung(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 4, 202, 8, 42, '#6e5238');
    P(ctx, x - 28, 172, 56, 34, '#7a6248');
    P(ctx, x - 32, 164, 64, 9, '#5e4a34');
    P(ctx, x - 20, 182, 14, 3, '#ffe9a3');
    P(ctx, x - 6, 182, 14, 3, '#ffe9a3');
    P(ctx, x + 8, 180, 5, 3, '#ffe9a3');
    P(ctx, x + 8, 187, 5, 3, '#ffe9a3');
    teksPx(ctx, 'UJUNG KEPALA', x - 29, 216, '#5a4a2a', 4);
  }
  function gambarPanahKembarSejajar(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    P(ctx, x - 26, 202, 24, 4, '#9a8266');
    P(ctx, x - 26, 210, 24, 4, '#9a8266');
    P(ctx, x + 2, 202, 24, 4, '#9a8266');
    P(ctx, x + 2, 210, 24, 4, '#9a8266');
    P(ctx, x - 4, 202, 5, 12, '#9a8266');
    P(ctx, x + 24, 202, 5, 12, '#9a8266');
    const den = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x - 14, 206, 6, '#ffe9a3'); lingkaran(ctx, x + 14, 206, 6, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, 'KEMBAR', x - 15, 188, '#5a4a2a', 5);
  }
  function gambarPanahLawanBerbalik(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    P(ctx, x - 26, 206, 24, 4, '#9a8266');
    P(ctx, x - 4, 202, 5, 12, '#9a8266');
    P(ctx, x + 2, 206, 24, 4, '#c85a2a');
    P(ctx, x + 24, 202, 5, 12, '#c85a2a');
    const mana = Math.floor(t * 1.6) % 2;
    ctx.globalAlpha = 0.5; lingkaran(ctx, mana === 0 ? x - 14 : x + 14, 206, 6, mana === 0 ? '#ffe9a3' : '#ff9d8a'); ctx.globalAlpha = 1;
    teksPx(ctx, 'LAWAN', x - 13, 188, '#5a4a2a', 5);
  }
  function gambarPatokKembaliNol(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    P(ctx, x - 2, 198, 5, 46, '#8a7256');
    P(ctx, x - 5, 194, 11, 6, '#9a8266');
    const den = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.3 + den * 0.5; lingkaran(ctx, x, 220, 8, '#7dffa8'); ctx.globalAlpha = 1;
    teksPx(ctx, '3', x - 24, 230, '#5a4a2a', 6);
    teksPx(ctx, '-3', x + 12, 230, '#5a4a2a', 6);
    teksPx(ctx, '0', x - 3, 182, '#5a4a2a', 6);
  }
  function gambarPapanAngkaMinus(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    P(ctx, x - 4, 198, 8, 46, '#6e5238');
    P(ctx, x - 30, 166, 60, 34, '#7a6248');
    P(ctx, x - 34, 158, 68, 9, '#5e4a34');
    teksPx(ctx, '3+(-3)=0', x - 28, 174, '#7dffa8', 5);
    teksPx(ctx, 'NOL', x - 9, 186, '#ffe9a3', 5);
  }
  function gambarKisiTaliHalaman(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    for (let i = 0; i < 5; i++) P(ctx, x - 30 + i * 14, 190, 2, 54, '#8a7a5c');
    for (let i = 0; i < 3; i++) P(ctx, x - 30, 190 + i * 26, 58, 2, '#8a7a5c');
    const mana = Math.floor(t * 1.4) % 5;
    ctx.globalAlpha = 0.5; lingkaran(ctx, x - 29 + mana * 14, 216, 4, '#7dffa8'); ctx.globalAlpha = 1;
    teksPx(ctx, 'KISI', x + 14, 178, '#5a4a2a', 5);
  }
  function gambarKartuVektorTigaDua(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 6, 206, 6, 38, '#6e5238');
    P(ctx, x - 24, 178, 42, 30, '#f4e8c8');
    P(ctx, x - 24, 178, 42, 5, '#c8a06a');
    teksPx(ctx, '(3,2)', x - 18, 186, '#5a4a2a', 6);
    P(ctx, x + 14, 226, 3, 18, '#c85a2a');
    P(ctx, x + 17, 226, 8, 5, '#c85a2a');
    const den = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.35 + den * 0.4; lingkaran(ctx, x + 16, 224, 5, '#ffe9a3'); ctx.globalAlpha = 1;
  }
  function gambarKartuVektorDuaTiga(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 6, 206, 6, 38, '#6e5238');
    P(ctx, x - 24, 178, 42, 30, '#f4e8c8');
    P(ctx, x - 24, 178, 42, 5, '#c8a06a');
    teksPx(ctx, '(2,3)', x - 18, 186, '#5a4a2a', 6);
    P(ctx, x + 14, 210, 3, 34, '#2aa85e');
    P(ctx, x + 17, 210, 8, 5, '#2aa85e');
    const den = 0.5 + 0.5 * Math.sin(t * 2.8 + 1);
    ctx.globalAlpha = 0.35 + den * 0.4; lingkaran(ctx, x + 16, 208, 5, '#7dffa8'); ctx.globalAlpha = 1;
  }
  function gambarPapanUrutanPenting(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 4, 200, 8, 44, '#6e5238');
    P(ctx, x - 30, 168, 60, 36, '#7a6248');
    P(ctx, x - 34, 160, 68, 9, '#5e4a34');
    const mana = Math.floor(t * 1.8) % 2;
    teksPx(ctx, '(3,2)', x - 24, 174, mana === 0 ? '#7dffa8' : '#ffe9a3', 5);
    teksPx(ctx, '(2,3)', x - 24, 190, mana === 1 ? '#7dffa8' : '#ffe9a3', 5);
    teksPx(ctx, 'BEDA', x - 12, 204, '#ffe9a3', 4);
  }
  function gambarPerahuTepiDermaga(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b8ccd8');
    P(ctx, x - 30, 186, 8, 58, '#8a6a48');
    P(ctx, x - 30, 198, 34, 5, '#8a6a48');
    const goyang = Math.sin(t * 2.2) * 2;
    P(ctx, x - 24, 218 + goyang, 42, 9, '#8a6a48');
    P(ctx, x - 18, 210 + goyang, 30, 9, '#7a5638');
    P(ctx, x - 2, 192 + goyang, 4, 20, '#5e4a34');
    ctx.globalAlpha = 0.4; lingkaran(ctx, x + 12, 236, 3, '#fffdf2'); lingkaran(ctx, x + 22, 240, 2.5, '#fffdf2'); ctx.globalAlpha = 1;
    teksPx(ctx, 'SEBERANG', x - 24, 174, '#5a4a2a', 4);
  }
  function gambarPanahArusDeras(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b8ccd8');
    for (let i = 0; i < 4; i++) {
      const geser = (t * 14 + i * 18) % 60;
      P(ctx, x - 34 + geser, 200 + (i % 2) * 16, 12, 3, '#7aa8c8');
      P(ctx, x - 22 + geser, 199 + (i % 2) * 16, 3, 5, '#7aa8c8');
    }
    teksPx(ctx, 'ARUS 3', x - 18, 178, '#5a4a2a', 5);
  }
  function gambarPantaiMendaratMiring(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b8ccd8');
    for (let i = 0; i < 5; i++) P(ctx, x - 24 + i * 9, 238 - i * 8, 7, 4, '#c85a2a');
    P(ctx, x + 22, 202, 6, 4, '#c85a2a');
    P(ctx, x + 22, 210, 6, 4, '#c85a2a');
    P(ctx, x + 28, 204, 6, 10, '#c85a2a');
    teksPx(ctx, '5 SERONG', x - 12, 216, '#5a4a2a', 5);
    teksPx(ctx, '4', x - 2, 250, '#5a4a2a', 5);
    teksPx(ctx, '3', x + 26, 226, '#5a4a2a', 5);
  }
  function gambarPapanHitungPaduan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b8ccd8');
    P(ctx, x - 4, 200, 8, 44, '#6e5238');
    P(ctx, x - 28, 168, 56, 36, '#7a6248');
    P(ctx, x - 32, 160, 64, 9, '#5e4a34');
    P(ctx, x - 20, 176, 16, 3, '#ffe9a3');
    P(ctx, x - 4, 179, 12, 3, '#ffe9a3');
    P(ctx, x - 4, 172, 12, 3, '#ffe9a3');
    teksPx(ctx, '4+3=5', x - 18, 188, '#7dffa8', 5);
  }
  function gambarPetaKotaDariAtas(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#283050');
    for (let i = 0; i < 5; i++) P(ctx, x - 30 + i * 13, 194, 2, 50, '#3e4468');
    for (let i = 0; i < 4; i++) P(ctx, x - 30, 194 + i * 16, 54, 2, '#3e4468');
    const mana = Math.floor(t * 1.4) % 5;
    ctx.globalAlpha = 0.5; lingkaran(ctx, x - 29 + mana * 13, 210, 4, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, 'KOTA', x + 16, 180, '#7ff2d8', 5);
  }
  function gambarMenaraTigaLantai(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#283050');
    P(ctx, x - 16, 158, 30, 86, '#2c3454');
    P(ctx, x - 20, 150, 38, 9, '#343c60');
    for (let i = 0; i < 3; i++) {
      ctx.globalAlpha = 0.45 + 0.3 * Math.sin(t * 2.2 + i * 1.4);
      P(ctx, x - 8, 168 + i * 24, 6, 9, '#ffe9a3'); P(ctx, x + 4, 168 + i * 24, 6, 9, '#ffe9a3');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, '3 LANTAI', x - 22, 136, '#7ff2d8', 4);
  }
  function gambarKartuAlamatTigaAngka(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#283050');
    P(ctx, x - 6, 204, 6, 40, '#3a4166');
    P(ctx, x - 24, 176, 42, 30, '#f4e8c8');
    P(ctx, x - 24, 176, 42, 5, '#c8a06a');
    teksPx(ctx, '(2,3,4)', x - 21, 184, '#5a4a2a', 5);
    const den = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.35 + den * 0.4; lingkaran(ctx, x, 170, 5, '#ffe9a3'); ctx.globalAlpha = 1;
  }
  function gambarBurungTerbangAlamat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#283050');
    P(ctx, x - 18, 220, 12, 6, '#3e4468');
    P(ctx, x + 8, 196, 14, 30, '#2c3454');
    const naik = (t * 12) % 40;
    P(ctx, x - 12, 216 - naik, 6, 3, '#eef2ff');
    P(ctx, x - 14, 216 - naik, 3, 3, '#eef2ff');
    ctx.globalAlpha = 0.5; lingkaran(ctx, x - 9, 214 - naik, 2.5, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, 'NAIK 4', x + 4, 182, '#7ff2d8', 4);
  }
  function gambarTanggaTigaArahMenara(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8bc94');
    P(ctx, x - 26, 150, 22, 94, '#7a6248');
    P(ctx, x - 30, 144, 30, 8, '#66503a');
    P(ctx, x - 4, 238, 4, 6, '#9a7a54');
    P(ctx, x + 2, 230, 4, 14, '#9a7a54');
    P(ctx, x + 8, 222, 4, 22, '#9a7a54');
    P(ctx, x + 14, 214, 4, 30, '#9a7a54');
    const mana = Math.floor(t * 1.6) % 4;
    ctx.globalAlpha = 0.5; lingkaran(ctx, x - 2 + mana * 6, 236 - mana * 8, 4, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, '2 2 1', x + 6, 200, '#5a4a2a', 5);
  }
  function gambarLiftMenaraTegak(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8bc94');
    P(ctx, x - 14, 146, 24, 98, '#8a7a62');
    P(ctx, x - 8, 152, 12, 84, '#5a5044');
    const naik = (t * 16) % 76;
    P(ctx, x - 8, 228 - naik, 12, 10, '#c8a05c');
    ctx.globalAlpha = 0.4; lingkaran(ctx, x - 2, 233 - naik, 4, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, 'LURUS', x + 12, 140, '#5a4a2a', 4);
  }
  function gambarPapanJarakMiringTiga(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8bc94');
    P(ctx, x - 4, 198, 8, 46, '#6e5238');
    P(ctx, x - 30, 166, 60, 34, '#7a6248');
    P(ctx, x - 34, 158, 68, 9, '#5e4a34');
    teksPx(ctx, '4+4+1', x - 24, 172, '#ffe9a3', 5);
    teksPx(ctx, '=9', x - 12, 184, '#7dffa8', 5);
    teksPx(ctx, 'JARAK 3', x - 24, 252, '#5a4a2a', 4);
  }
  function gambarLintasanTerbangLurus(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8bc94');
    P(ctx, x - 20, 226, 10, 18, '#7a6248');
    P(ctx, x + 10, 172, 14, 72, '#7a6248');
    P(ctx, x + 6, 164, 22, 9, '#66503a');
    for (let i = 0; i < 3; i++) P(ctx, x - 12 + i * 7, 220 - i * 18, 5, 3, '#e8d8b0');
    const terbang = (t * 10) % 60;
    P(ctx, x - 10 + terbang * 0.3, 222 - terbang, 5, 3, '#fffdf2');
    ctx.globalAlpha = 0.4; lingkaran(ctx, x - 8 + terbang * 0.3, 220 - terbang, 3, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, '3', x - 18, 192, '#5a4a2a', 6);
  }
  function gambarSusunKubusMeja(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    P(ctx, x - 34, 226, 68, 6, '#8a7256');
    P(ctx, x - 30, 232, 8, 12, '#6e5a44'); P(ctx, x + 22, 232, 8, 12, '#6e5a44');
    P(ctx, x - 22, 210, 14, 16, '#a87048');
    P(ctx, x - 22, 196, 14, 14, '#c89060');
    P(ctx, x - 6, 196, 14, 14, '#b87f52');
    P(ctx, x - 22, 182, 14, 14, '#b87f52');
    const den = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x - 8, 190, 5, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, '4 KUBUS', x + 8, 182, '#5a4a2a', 4);
  }
  function gambarFotoDepanBentukL(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    P(ctx, x - 4, 202, 8, 42, '#6e5238');
    P(ctx, x - 26, 168, 52, 36, '#3e4266');
    P(ctx, x - 30, 160, 60, 9, '#5e4a34');
    P(ctx, x - 18, 190, 12, 10, '#7dffa8');
    P(ctx, x - 4, 190, 12, 10, '#7dffa8');
    P(ctx, x - 18, 178, 12, 10, '#7dffa8');
    teksPx(ctx, 'DEPAN', x - 16, 252, '#5a4a2a', 4);
  }
  function gambarFotoAtasBentukSudut(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    P(ctx, x - 4, 202, 8, 42, '#6e5238');
    P(ctx, x - 26, 168, 52, 36, '#3e4266');
    P(ctx, x - 30, 160, 60, 9, '#5e4a34');
    P(ctx, x - 18, 190, 12, 10, '#ffe9a3');
    P(ctx, x - 4, 190, 12, 10, '#ffe9a3');
    P(ctx, x - 18, 176, 12, 12, '#ffe9a3');
    teksPx(ctx, 'ATAS', x - 11, 252, '#5a4a2a', 4);
  }
  function gambarFotoSampingBentukSudut(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8cc9c');
    P(ctx, x - 4, 202, 8, 42, '#6e5238');
    P(ctx, x - 26, 168, 52, 36, '#3e4266');
    P(ctx, x - 30, 160, 60, 9, '#5e4a34');
    P(ctx, x - 18, 190, 12, 10, '#7db8ff');
    P(ctx, x - 18, 178, 12, 10, '#7db8ff');
    P(ctx, x - 4, 190, 12, 10, '#7db8ff');
    teksPx(ctx, 'SAMPING', x - 21, 252, '#5a4a2a', 4);
  }
  function gambarLimaPapanMisiPanah(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#2c3050');
    for (let i = 0; i < 5; i++) {
      const px = x - 32 + i * 15;
      P(ctx, px, 228 - i * 12, 12, 9 + i * 12, '#3e4468');
      P(ctx, px - 2, 220 - i * 12, 16, 8, '#4a5078');
      ctx.globalAlpha = 0.4 + 0.35 * Math.sin(t * 2.6 + i * 1.1);
      lingkaran(ctx, px + 6, 216 - i * 12, 2.5, '#ffe9a3');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'PUNCAK', x - 17, 148, '#7ff2d8', 5);
  }
  function gambarPapanMisiPanahArah(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#2c3050');
    P(ctx, x - 4, 200, 8, 44, '#3a4166');
    P(ctx, x - 30, 168, 60, 34, '#2c3a54');
    P(ctx, x - 34, 160, 68, 9, '#3e4468');
    teksPx(ctx, '5+5=10', x - 25, 172, '#ffe9a3', 5);
    teksPx(ctx, '3-4-5', x - 22, 186, '#7dffa8', 5);
  }
  function gambarPapanMisiPanahSambung(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#2c3050');
    P(ctx, x - 4, 200, 8, 44, '#3a4166');
    P(ctx, x - 30, 168, 60, 34, '#2c3a54');
    P(ctx, x - 34, 160, 68, 9, '#3e4468');
    teksPx(ctx, '3+(-3)=0', x - 27, 172, '#ffe9a3', 4);
    teksPx(ctx, '(3,2)', x - 17, 186, '#7dffa8', 5);
  }
  function gambarGerbangJuaraLintas(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#2c3050');
    P(ctx, x - 34, 182, 6, 62, '#3e4468');
    P(ctx, x + 28, 182, 6, 62, '#3e4468');
    P(ctx, x - 34, 174, 68, 9, '#4a5078');
    P(ctx, x - 28, 168, 4, 8, '#5a6088');
    P(ctx, x + 24, 168, 4, 8, '#5a6088');
    const jalan = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.3 + jalan * 0.5; lingkaran(ctx, x, 208, 10, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, 'JUARA', x - 15, 252, '#7ff2d8', 5);
  }
  function gambarTembokCahayaSetengah(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#a8926e');
    P(ctx, x + 18, 168, 16, 76, '#d8c898');
    P(ctx, x + 18, 168, 16, 8, '#c0ae7c');
    const den = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.25 + den * 0.5; lingkaran(ctx, x + 26, 206, 14, '#ffe9a3'); ctx.globalAlpha = 1;
    P(ctx, x - 26, 236, 10, 6, '#8a7256');
    ctx.globalAlpha = 0.4 + den * 0.4; lingkaran(ctx, x - 21, 232, 5, '#fff2d0'); ctx.globalAlpha = 1;
    teksPx(ctx, '1', x + 23, 156, '#5a4a2a', 7);
    teksPx(ctx, '1/2', x - 30, 222, '#5a4a2a', 5);
  }
  function gambarPapanJejakLangkah(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#a8926e');
    P(ctx, x - 4, 200, 8, 44, '#6e5238');
    P(ctx, x - 32, 168, 64, 38, '#7a6248');
    P(ctx, x - 36, 160, 72, 9, '#5e4a34');
    const mana = Math.floor(t * 2) % 3;
    const baris = ['1/2', '1/4', '1/8'];
    for (let i = 0; i < 3; i++) {
      teksPx(ctx, baris[i], x - 20, 176 + i * 10, i === mana ? '#ffe9a3' : '#e8d8b0', 5);
    }
    ctx.globalAlpha = 0.4 + (0.5 + 0.5 * Math.sin(t * 2.4)) * 0.4;
    lingkaran(ctx, x + 22, 180 + mana * 10, 4, '#ffe9a3');
    ctx.globalAlpha = 1;
  }
  function gambarKertasSisaJarang(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#a8926e');
    P(ctx, x - 6, 214, 12, 30, '#8a7256');
    P(ctx, x - 18, 208, 36, 8, '#9a8266');
    P(ctx, x - 12, 196, 24, 2, '#fff2d0');
    P(ctx, x - 12, 199, 24, 1, '#e8e0c8');
    const den = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x, 190, 8, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, '1/1024', x - 18, 182, '#5a4a2a', 5);
    teksPx(ctx, 'TIPIS', x - 14, 252, '#5a4a2a', 4);
  }
  function gambarGarisLantaiTotal(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#a8926e');
    P(ctx, x - 34, 216, 70, 4, '#fff2d0');
    for (let i = 0; i < 5; i++) P(ctx, x - 34 + i * 17, 210, 3, 12, '#8a7256');
    const mana = Math.min(3, Math.floor(t * 1.6) % 5);
    ctx.globalAlpha = 0.5 + 0.4 * (0.5 + 0.5 * Math.sin(t * 2.6));
    lingkaran(ctx, x - 34 + mana * 17 + 1, 204, 5, '#ffe9a3');
    ctx.globalAlpha = 1;
    teksPx(ctx, '0,5', x - 36, 196, '#5a4a2a', 4);
    teksPx(ctx, '0,93', x - 2, 196, '#5a4a2a', 4);
    teksPx(ctx, '1', x + 28, 196, '#c85a2a', 6);
  }
  function gambarTonggakSatuCahaya(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x + 14, 176, 18, 68, '#9a8266');
    P(ctx, x + 10, 168, 26, 10, '#8a7256');
    teksPx(ctx, '1', x + 19, 190, '#5a4a2a', 8);
    P(ctx, x - 34, 238, 10, 4, '#8a7256');
    const den = 0.5 + 0.5 * Math.sin(t * 2.8);
    ctx.globalAlpha = 0.4 + den * 0.5; lingkaran(ctx, x - 29, 232, 6, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, '0,9', x - 38, 218, '#5a4a2a', 4);
  }
  function gambarTigaPapanSembilan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 30 + i * 22, 200 - i * 8, 18, 30 + i * 8, '#7a6248');
      P(ctx, x - 33 + i * 22, 194 - i * 8, 24, 7, '#5e4a34');
    }
    teksPx(ctx, '0,9', x - 28, 210, '#e8d8b0', 4);
    teksPx(ctx, '0,99', x - 8, 204, '#e8d8b0', 4);
    teksPx(ctx, '0,999', x + 12, 198, '#e8d8b0', 4);
    const mana = Math.floor(t * 2.2) % 3;
    ctx.globalAlpha = 0.45 + 0.35 * (0.5 + 0.5 * Math.sin(t * 2.8));
    lingkaran(ctx, x - 21 + mana * 22, 190 - mana * 8, 4, '#ffe9a3');
    ctx.globalAlpha = 1;
  }
  function gambarPapanJarakMengecil(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 4, 202, 8, 42, '#6e5238');
    P(ctx, x - 30, 168, 60, 40, '#7a6248');
    P(ctx, x - 34, 160, 68, 9, '#5e4a34');
    const leb = [26, 14, 6];
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 26, 174 + i * 11, leb[i], 6, '#ffe9a3');
      teksPx(ctx, ['0,1', '0,01', '0,001'][i], x - 24 + leb[i], 176 + i * 11, '#e8d8b0', 4);
    }
    const den = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x + 26, 186, 6, '#fff2d0'); ctx.globalAlpha = 1;
  }
  function gambarLorongMenujuSatu(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x + 26, 178, 10, 66, '#9a8266');
    P(ctx, x + 22, 170, 18, 9, '#8a7256');
    teksPx(ctx, '1', x + 26, 186, '#5a4a2a', 7);
    for (let i = 0; i < 5; i++) P(ctx, x - 30 + i * 10, 240, 6, 2, '#fff2d0');
    const mana = Math.min(4, Math.floor(t * 2) % 6);
    ctx.globalAlpha = 0.5 + 0.4 * (0.5 + 0.5 * Math.sin(t * 3));
    lingkaran(ctx, x - 30 + mana * 10 + 3, 234, 4, '#ffe9a3');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'MENUJU', x - 22, 188, '#5a4a2a', 4);
  }
  function gambarKeretaMenujuPeron(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c8b08c');
    const geser = Math.sin(t * 1.4) * 8;
    P(ctx, x - 34 + geser, 210, 34, 18, '#c85a2a');
    P(ctx, x - 30 + geser, 200, 12, 10, '#e8d8b0');
    P(ctx, x - 14 + geser, 202, 8, 8, '#5e4a34');
    lingkaran(ctx, x - 26 + geser, 230, 4, '#5e4a34');
    lingkaran(ctx, x - 12 + geser, 230, 4, '#5e4a34');
    P(ctx, x + 10, 190, 22, 38, '#8a7256');
    P(ctx, x + 6, 182, 30, 9, '#6e5638');
    teksPx(ctx, 'PERON', x + 2, 172, '#5a4a2a', 4);
    const den = 0.5 + 0.5 * Math.sin(t * 3.2);
    ctx.globalAlpha = 0.3 + den * 0.3; lingkaran(ctx, x - 20 + geser, 192, 4, '#e8e0c8'); ctx.globalAlpha = 1;
  }
  function gambarPapanJadwalDuaArah(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c8b08c');
    P(ctx, x - 4, 198, 8, 46, '#6e5238');
    P(ctx, x - 32, 162, 64, 42, '#3e4466');
    P(ctx, x - 36, 154, 72, 9, '#5e4a34');
    const mana = Math.floor(t * 2) % 2;
    teksPx(ctx, 'KIRI 2,99', x - 28, 172, mana === 0 ? '#ffe9a3' : '#a8b0d0', 4);
    teksPx(ctx, 'KANAN 3,01', x - 28, 186, mana === 1 ? '#ffe9a3' : '#a8b0d0', 4);
    teksPx(ctx, 'MENUJU 3', x - 28, 198, '#7dffa8', 4);
    ctx.globalAlpha = 0.4 + 0.3 * (0.5 + 0.5 * Math.sin(t * 2.6));
    lingkaran(ctx, x, 158, 5, '#ffe9a3');
    ctx.globalAlpha = 1;
  }
  function gambarTitikSepakatTiga(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c8b08c');
    P(ctx, x - 2, 182, 6, 62, '#8a7256');
    P(ctx, x - 8, 174, 18, 9, '#6e5638');
    teksPx(ctx, '3', x - 3, 188, '#ffe9a3', 7);
    P(ctx, x - 32, 206, 22, 4, '#c85a2a');
    P(ctx, x - 14, 200, 7, 4, '#c85a2a');
    P(ctx, x - 14, 212, 7, 4, '#c85a2a');
    P(ctx, x + 12, 206, 22, 4, '#7dffa8');
    P(ctx, x + 10, 200, 7, 4, '#7dffa8');
    P(ctx, x + 10, 212, 7, 4, '#7dffa8');
    const den = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.35 + den * 0.5; lingkaran(ctx, x + 1, 200, 9, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, 'SEPAKAT', x - 20, 252, '#5a4a2a', 4);
  }
  function gambarPintuArahCukup(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c8b08c');
    P(ctx, x - 28, 180, 8, 64, '#8a7256');
    P(ctx, x + 20, 180, 8, 64, '#8a7256');
    P(ctx, x - 28, 172, 56, 9, '#6e5638');
    P(ctx, x - 20, 184, 40, 60, '#5e4a34');
    P(ctx, x - 12, 196, 24, 32, '#3e3224');
    const den = 0.5 + 0.5 * Math.sin(t * 2.2);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x, 212, 10, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, 'ARAH', x - 12, 162, '#5a4a2a', 5);
  }
  function gambarKurvaBatuKebun(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x + 30, 168, 6, 76, '#8a9a68');
    for (let i = 0; i < 6; i++) P(ctx, x - 24 + i * 9, 234 - i * 3, 8, 3, '#c9b884');
    P(ctx, x + 24, 202, 8, 3, '#c9b884');
    P(ctx, x + 26, 214, 8, 3, '#c9b884');
    const mana = Math.floor(t * 2) % 6;
    ctx.globalAlpha = 0.5 + 0.4 * (0.5 + 0.5 * Math.sin(t * 2.8));
    lingkaran(ctx, x - 20 + mana * 9, 232 - mana * 3, 4, '#ffe9a3');
    ctx.globalAlpha = 1;
    teksPx(ctx, '1/x', x - 6, 158, '#5a4a2a', 5);
  }
  function gambarPapanNilaiKebalikan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 4, 200, 8, 44, '#6e5238');
    P(ctx, x - 32, 166, 64, 40, '#7a6248');
    P(ctx, x - 36, 158, 72, 9, '#5e4a34');
    const mana = Math.floor(t * 1.8) % 4;
    const nilai = ['x1=1', 'x2=0,5', 'x10=0,1', 'x100=0,01'];
    for (let i = 0; i < 4; i++) teksPx(ctx, nilai[i], x - 28, 174 + i * 9, i === mana ? '#ffe9a3' : '#e8d8b0', 4);
    ctx.globalAlpha = 0.4; lingkaran(ctx, x + 24, 180, 5, '#ffe9a3'); ctx.globalAlpha = 1;
  }
  function gambarPagarAsimtot(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    for (let i = 0; i < 5; i++) P(ctx, x + 8 + i * 7, 176 + i * 2, 4, 68 - i * 2, '#8a9a68');
    P(ctx, x + 6, 182, 36, 3, '#7a8a58');
    for (let i = 0; i < 5; i++) lingkaran(ctx, x - 34 + i * 10, 232 - i * 11, 3, '#c9b884');
    const den = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.25 + den * 0.35;
    lingkaran(ctx, x + 6, 214, 6, '#ffe9a3');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'ASIMTOT', x - 22, 252, '#5a4a2a', 4);
  }
  function gambarBungaDuaSisiPagar(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c6d6b0');
    P(ctx, x - 2, 172, 5, 72, '#8a9a68');
    P(ctx, x - 8, 180, 17, 3, '#7a8a58');
    const goyang = Math.sin(t * 2.2) * 2;
    for (let i = 0; i < 3; i++) {
      lingkaran(ctx, x - 20 + i * 7 + goyang, 214 - i * 6, 3, '#f2b8cc');
      lingkaran(ctx, x + 8 + i * 7 + goyang, 214 - i * 6, 3, '#ffb86b');
    }
    lingkaran(ctx, x - 13 + goyang, 200, 3.5, '#f2b8cc');
    lingkaran(ctx, x + 15 + goyang, 200, 3.5, '#ffb86b');
    teksPx(ctx, 'DUA SISI', x - 20, 252, '#5a4a2a', 4);
  }
  function gambarTaliSatuMeter(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#e6d2ae');
    P(ctx, x - 34, 214, 6, 18, '#8a7256');
    P(ctx, x + 28, 214, 6, 18, '#8a7256');
    const gel = Math.sin(t * 2) * 2;
    P(ctx, x - 30, 220 + gel, 58, 3, '#c85a2a');
    P(ctx, x - 30, 217, 3, 6, '#a8442a');
    P(ctx, x + 25, 217, 3, 6, '#a8442a');
    teksPx(ctx, '1 M', x - 8, 198, '#5a4a2a', 6);
    teksPx(ctx, 'UTUH', x - 12, 252, '#5a4a2a', 4);
  }
  function gambarGuntingEmpatPotong(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#e6d2ae');
    const buka = Math.sin(t * 3) * 4;
    P(ctx, x - 20, 196 - buka, 22, 4, '#c0c8d8');
    P(ctx, x - 20, 204 + buka, 22, 4, '#c0c8d8');
    P(ctx, x + 2, 190 - buka, 10, 5, '#c85a2a');
    P(ctx, x + 2, 206 + buka, 10, 5, '#c85a2a');
    for (let i = 0; i < 4; i++) P(ctx, x - 24 + i * 13, 228, 10, 4, '#c85a2a');
    teksPx(ctx, '4 x 0,25', x - 22, 214, '#5a4a2a', 4);
    teksPx(ctx, 'POTONG', x - 16, 252, '#5a4a2a', 4);
  }
  function gambarMistarTotalSatu(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#e6d2ae');
    P(ctx, x - 34, 222, 70, 10, '#e8e0c8');
    for (let i = 0; i < 8; i++) P(ctx, x - 30 + i * 8, 222, 1, 4, '#8a7256');
    const mana = Math.floor(t * 2.4) % 4;
    for (let i = 0; i < 4; i++) {
      P(ctx, x - 30 + i * 17, 214, 15, 5, i === mana ? '#ffe9a3' : '#c85a2a');
    }
    const den = 0.5 + 0.5 * Math.sin(t * 2.8);
    ctx.globalAlpha = 0.4 + den * 0.4; lingkaran(ctx, x + 36, 226, 5, '#7dffa8'); ctx.globalAlpha = 1;
    teksPx(ctx, 'TOTAL 1', x - 18, 198, '#5a4a2a', 5);
  }
  function gambarGulunganBenangHalus(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#e6d2ae');
    P(ctx, x - 4, 196, 8, 48, '#8a7256');
    lingkaran(ctx, x, 182, 16, '#b09a70');
    lingkaran(ctx, x, 182, 10, '#c8b088');
    lingkaran(ctx, x, 182, 5, '#9a8262');
    const putar = Math.floor(t * 6) % 8;
    for (let i = 0; i < 4; i++) {
      const a = (putar + i * 2) * Math.PI / 4;
      lingkaran(ctx, x + Math.cos(a) * 13, 182 + Math.sin(a) * 13, 1.5, '#fff2d0');
    }
    P(ctx, x + 16, 200, 20, 1, '#c85a2a');
    teksPx(ctx, '0,0625', x - 16, 252, '#5a4a2a', 4);
  }
  function gambarTanggaDuaAnak(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#e6bc8a');
    P(ctx, x - 30, 228, 30, 16, '#8a7256');
    P(ctx, x, 212, 30, 32, '#9a8266');
    P(ctx, x - 30, 224, 30, 4, '#ffe9a3');
    P(ctx, x, 208, 30, 4, '#ffe9a3');
    teksPx(ctx, '0,5', x - 20, 232, '#5a4a2a', 4);
    teksPx(ctx, '0,5', x + 10, 216, '#5a4a2a', 4);
    const den = 0.5 + 0.5 * Math.sin(t * 2.2);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x - 15, 220, 6, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, '2 TANGGA', x - 20, 252, '#5a4a2a', 4);
  }
  function gambarTanggaEmpatAnak(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#e6bc8a');
    for (let i = 0; i < 4; i++) {
      P(ctx, x - 32 + i * 16, 232 - i * 8, 16, 12 + i * 8, i % 2 === 0 ? '#9a8266' : '#8a7256');
      P(ctx, x - 32 + i * 16, 232 - i * 8, 16, 3, '#ffe9a3');
    }
    teksPx(ctx, '0,25', x - 24, 238, '#5a4a2a', 4);
    teksPx(ctx, '4 TANGGA', x - 20, 252, '#5a4a2a', 4);
    const mana = Math.floor(t * 2.4) % 4;
    ctx.globalAlpha = 0.45; lingkaran(ctx, x - 24 + mana * 16, 228 - mana * 8, 5, '#fff2d0'); ctx.globalAlpha = 1;
  }
  function gambarLerengMulusBatu(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#e6bc8a');
    P(ctx, x - 30, 244, 60, 3, '#c8b088');
    P(ctx, x - 30, 238, 8, 6, '#9a8266');
    P(ctx, x + 22, 200, 8, 44, '#9a8266');
    for (let i = 0; i < 6; i++) P(ctx, x - 26 + i * 8, 238 - i * 7, 8, 3, '#c8b088');
    const mana = Math.floor(t * 1.4) % 2;
    if (mana === 0) {
      for (let i = 0; i < 6; i++) P(ctx, x - 26 + i * 8, 238 - i * 7, 8, 3, '#ffe9a3');
    } else {
      P(ctx, x - 30, 238, 60, 3, '#7dffa8');
      P(ctx, x - 26, 233, 8, 3, '#7dffa8');
      P(ctx, x - 18, 226, 8, 3, '#7dffa8');
      P(ctx, x - 10, 219, 8, 3, '#7dffa8');
      P(ctx, x - 2, 212, 8, 3, '#7dffa8');
      P(ctx, x + 6, 205, 8, 3, '#7dffa8');
    }
    teksPx(ctx, 'SAMA SAJA', x - 22, 190, '#5a4a2a', 4);
  }
  function gambarGerbangKalkulusBukit(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#e6bc8a');
    P(ctx, x - 30, 172, 10, 72, '#8a7256');
    P(ctx, x + 20, 172, 10, 72, '#8a7256');
    P(ctx, x - 34, 162, 68, 11, '#6e5638');
    P(ctx, x - 20, 182, 40, 62, '#5e4a34');
    for (let i = 0; i < 4; i++) P(ctx, x - 16 + i * 9, 236 - i * 11, 7, 4, '#ffe9a3');
    const den = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x, 208, 11, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, 'KALKULUS', x - 22, 152, '#5a4a2a', 5);
  }
  function gambarLintasanRobotPelari(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8c8a6');
    P(ctx, x - 36, 236, 72, 5, '#c86a4a');
    P(ctx, x - 36, 232, 72, 2, '#e8906a');
    const goyang = Math.sin(t * 2.6) * 6;
    P(ctx, x - 10 + goyang, 216, 20, 12, '#7a8ab0');
    lingkaran(ctx, x - 5 + goyang, 230, 4, '#5e4a34');
    lingkaran(ctx, x + 5 + goyang, 230, 4, '#5e4a34');
    P(ctx, x - 4 + goyang, 210, 8, 6, '#a8b4d0');
    P(ctx, x - 32, 196, 30, 22, '#7a6a52');
    P(ctx, x - 36, 188, 38, 8, '#5e5238');
    teksPx(ctx, '10 M 5 D', x - 28, 202, '#ffe9a3', 4);
    teksPx(ctx, 'START', x - 34, 252, '#5a4a2a', 4);
  }
  function gambarPapanJendelaDetik(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8c8a6');
    P(ctx, x - 4, 200, 8, 44, '#6e5238');
    P(ctx, x - 28, 164, 56, 42, '#3e4466');
    P(ctx, x - 32, 156, 64, 9, '#5e4a34');
    teksPx(ctx, 'JENDELA 1 D', x - 24, 172, '#a8b0d0', 4);
    teksPx(ctx, '2', x - 4, 182, '#ffe9a3', 8);
    teksPx(ctx, 'M TIAP DETIK', x - 24, 198, '#7dffa8', 4);
    const den = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.35 + den * 0.4; lingkaran(ctx, x + 20, 184, 6, '#ffe9a3'); ctx.globalAlpha = 1;
  }
  function gambarStopwatchKilas(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8c8a6');
    P(ctx, x - 2, 190, 4, 10, '#8a7256');
    lingkaran(ctx, x, 216, 24, '#e8e0c8');
    lingkaran(ctx, x, 216, 20, '#f6f0dc');
    lingkaran(ctx, x, 216, 3, '#5e4a34');
    const a = t * 4;
    P(ctx, x + Math.cos(a) * 15, 216 + Math.sin(a) * 15, 2, 2, '#c85a2a');
    for (let i = 0; i < 4; i++) {
      const na = i * Math.PI / 2;
      P(ctx, x + Math.round(Math.cos(na) * 17), 216 + Math.round(Math.sin(na) * 17), 2, 2, '#8a7256');
    }
    teksPx(ctx, '0,1 D', x - 12, 252, '#5a4a2a', 5);
    teksPx(ctx, '0,2 M', x - 12, 178, '#5a4a2a', 5);
  }
  function gambarPapanLajuSesaat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#d8c8a6');
    P(ctx, x - 4, 198, 8, 46, '#6e5238');
    P(ctx, x - 30, 160, 60, 44, '#3e4466');
    P(ctx, x - 34, 152, 68, 9, '#5e4a34');
    const mana = Math.floor(t * 2) % 3;
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 24, 168 + i * 11, 48, 7, i === mana ? '#5a6288' : '#3e4466');
      teksPx(ctx, '2', x - 8, 170 + i * 11, '#ffe9a3', 5);
      teksPx(ctx, ['5 D', '1 D', '0,1 D'][i], x + 4, 170 + i * 11, '#a8b0d0', 4);
    }
    teksPx(ctx, 'SESAAT', x - 16, 144, '#7dffa8', 4);
  }
  function gambarTelagaBijiPertama(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#2c3050');
    lingkaran(ctx, x, 226, 26, '#3a5a9a');
    lingkaran(ctx, x, 226, 22, '#4a6ab0');
    for (let i = 0; i < 3; i++) {
      const r = 6 + i * 6 + Math.sin(t * 2 + i) * 2;
      ctx.globalAlpha = 0.5 - i * 0.13;
      lingkaran(ctx, x, 226, r, '#a8c8ff');
      ctx.globalAlpha = 1;
    }
    P(ctx, x + 18, 198, 3, 22, '#6e5638');
    P(ctx, x + 8, 194, 12, 5, '#3e3224');
    lingkaran(ctx, x + 8, 196, 3, '#3e3224');
    P(ctx, x + 5, 198, 3, 2, '#ffb86b');
    teksPx(ctx, '0,5', x - 26, 214, '#a8c8ff', 5);
    teksPx(ctx, 'TELAGA', x - 16, 252, '#7d8ab0', 4);
  }
  function gambarPapanPembagiRaksasa(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#2c3050');
    P(ctx, x - 4, 200, 8, 44, '#3a4166');
    P(ctx, x - 30, 166, 60, 40, '#3e4466');
    P(ctx, x - 34, 158, 68, 9, '#323856');
    const mana = Math.floor(t * 2) % 2;
    P(ctx, x - 24, 176, 30, 6, '#a8c8ff');
    teksPx(ctx, '0,1', x + 10, 178, mana === 0 ? '#ffe9a3' : '#8890b8', 4);
    P(ctx, x - 24, 190, 12, 6, '#a8c8ff');
    teksPx(ctx, '0,01', x + 10, 192, mana === 1 ? '#ffe9a3' : '#8890b8', 4);
    teksPx(ctx, '10 & 100', x - 24, 200, '#8890b8', 4);
    ctx.globalAlpha = 0.4; lingkaran(ctx, x + 22, 172, 4, '#a8c8ff'); ctx.globalAlpha = 1;
  }
  function gambarBijiSerbukHalus(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#2c3050');
    P(ctx, x - 32, 226, 64, 12, '#3a5a9a');
    for (let i = 0; i < 3; i++) {
      const r = 3 + i * 3 + Math.sin(t * 2.4 + i) * 1;
      ctx.globalAlpha = 0.55 - i * 0.15;
      lingkaran(ctx, x + 6, 232, r, '#a8c8ff');
      ctx.globalAlpha = 1;
    }
    lingkaran(ctx, x - 14, 218, 12, '#8890b8');
    lingkaran(ctx, x - 14, 218, 9, '#c8d0ec');
    P(ctx, x - 6, 226, 6, 4, '#8890b8');
    lingkaran(ctx, x - 14, 218, 2, '#ffe9a3');
    teksPx(ctx, '0,001', x - 14, 198, '#a8c8ff', 5);
    teksPx(ctx, 'TAK TERLIHAT', x - 24, 252, '#7d8ab0', 4);
  }
  function gambarPermukaanAirTenang(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#2c3050');
    P(ctx, x - 34, 214, 68, 22, '#3a5a9a');
    for (let i = 0; i < 5; i++) {
      const gel = Math.sin(t * 1.8 + i) * 3;
      P(ctx, x - 28 + i * 13, 220 + (i % 2) * 6 + gel, 9, 2, '#4a6ab0');
    }
    lingkaran(ctx, x + 12, 224, 6, '#f4f0d8');
    ctx.globalAlpha = 0.4;
    lingkaran(ctx, x - 20, 228, 4, '#8890b8');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'MENUJU 0', x - 22, 196, '#a8c8ff', 5);
    teksPx(ctx, 'TANPA MENYENTUH', x - 34, 252, '#7d8ab0', 4);
  }
  function gambarRodaSegiEnam(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#e6d6b8');
    P(ctx, x - 4, 216, 8, 28, '#8a7256');
    lingkaran(ctx, x, 194, 24, '#c8a06a');
    lingkaran(ctx, x, 194, 20, '#d8b47c');
    P(ctx, x - 20, 192, 40, 5, '#b0885a');
    P(ctx, x - 3, 174, 5, 40, '#b0885a');
    lingkaran(ctx, x, 194, 4, '#6e5638');
    const a = t * 2;
    ctx.globalAlpha = 0.5 + 0.4 * (0.5 + 0.5 * Math.sin(t * 3));
    lingkaran(ctx, x + Math.cos(a) * 22, 194 + Math.sin(a) * 22, 3, '#ffe9a3');
    ctx.globalAlpha = 1;
    teksPx(ctx, '6 SISI 3,0', x - 24, 252, '#5a4a2a', 4);
  }
  function gambarRodaSegiDuaBelas(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#e6d6b8');
    P(ctx, x - 4, 216, 8, 28, '#8a7256');
    lingkaran(ctx, x, 192, 26, '#c8a06a');
    lingkaran(ctx, x, 192, 23, '#d8b47c');
    for (let i = 0; i < 6; i++) {
      const a = i * Math.PI / 3 + 0.26;
      P(ctx, x + Math.round(Math.cos(a) * 21), 192 + Math.round(Math.sin(a) * 21), 3, 3, '#b0885a');
    }
    lingkaran(ctx, x, 192, 4, '#6e5638');
    const a2 = t * 2.6;
    ctx.globalAlpha = 0.5 + 0.4 * (0.5 + 0.5 * Math.sin(t * 3.2));
    lingkaran(ctx, x + Math.cos(a2) * 24, 192 + Math.sin(a2) * 24, 3, '#ffe9a3');
    ctx.globalAlpha = 1;
    teksPx(ctx, '12 SISI 3,11', x - 28, 252, '#5a4a2a', 4);
  }
  function gambarPapanKelilingPoligon(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#e6d6b8');
    P(ctx, x - 4, 198, 8, 46, '#6e5238');
    P(ctx, x - 30, 158, 60, 46, '#7a6248');
    P(ctx, x - 34, 150, 68, 9, '#5e4a34');
    const mana = Math.floor(t * 1.8) % 3;
    teksPx(ctx, '6 = 3,0', x - 24, 168, mana === 0 ? '#ffe9a3' : '#e8d8b0', 4);
    teksPx(ctx, '12 = 3,11', x - 24, 180, mana === 1 ? '#ffe9a3' : '#e8d8b0', 4);
    teksPx(ctx, '96 = 3,14', x - 24, 192, mana === 2 ? '#ffe9a3' : '#e8d8b0', 4);
    ctx.globalAlpha = 0.4 + 0.3 * (0.5 + 0.5 * Math.sin(t * 2.8));
    lingkaran(ctx, x + 22, 182, 5, '#7dffa8');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'ARCHIMEDES', x - 26, 140, '#5a4a2a', 4);
  }
  function gambarRodaLingkaranSempurna(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#e6d6b8');
    P(ctx, x - 4, 218, 8, 26, '#8a7256');
    lingkaran(ctx, x, 192, 27, '#d8b47c');
    lingkaran(ctx, x, 192, 24, '#e8c88c');
    lingkaran(ctx, x, 192, 4, '#6e5638');
    const a = t * 3;
    for (let i = 0; i < 4; i++) {
      const na = a + i * Math.PI / 2;
      lingkaran(ctx, x + Math.cos(na) * 24, 192 + Math.sin(na) * 24, 2, '#b0885a');
    }
    const den = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.3 + den * 0.45; lingkaran(ctx, x, 192, 30, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, '3,14', x - 12, 156, '#5a4a2a', 6);
  }
  function gambarLimaPapanMisiMenuju(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#2c3050');
    for (let i = 0; i < 5; i++) {
      P(ctx, x - 34 + i * 16, 206 - (i % 2) * 6, 12, 24 + (i % 2) * 6, '#3e4466');
      P(ctx, x - 36 + i * 16, 200 - (i % 2) * 6, 16, 7, '#323856');
      ctx.globalAlpha = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(t * 2.4 + i * 0.8));
      lingkaran(ctx, x - 28 + i * 16, 212 - (i % 2) * 6, 2.5, '#ffe9a3');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, '5 MISI', x - 14, 252, '#7d8ab0', 5);
    teksPx(ctx, 'MENUJU', x - 16, 184, '#ffe9a3', 5);
  }
  function gambarPapanMisiLangkahSembilan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#2c3050');
    P(ctx, x - 4, 198, 8, 46, '#3a4166');
    P(ctx, x - 32, 160, 64, 44, '#3e4466');
    P(ctx, x - 36, 152, 72, 9, '#323856');
    const mana = Math.floor(t * 1.8) % 2;
    teksPx(ctx, '1/2 1/4 1/8', x - 28, 172, mana === 0 ? '#ffe9a3' : '#8890b8', 4);
    teksPx(ctx, '0,9 0,99', x - 28, 186, mana === 1 ? '#ffe9a3' : '#8890b8', 4);
    teksPx(ctx, 'MENUJU 1', x - 28, 198, '#7dffa8', 4);
    ctx.globalAlpha = 0.4; lingkaran(ctx, x + 24, 166, 4, '#ffe9a3'); ctx.globalAlpha = 1;
  }
  function gambarPapanMisiPembagiAsimtot(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#2c3050');
    P(ctx, x - 4, 198, 8, 46, '#3a4166');
    P(ctx, x - 32, 160, 64, 44, '#3e4466');
    P(ctx, x - 36, 152, 72, 9, '#323856');
    const mana = Math.floor(t * 1.8) % 2;
    teksPx(ctx, '1/1000 = 0,001', x - 30, 172, mana === 0 ? '#ffe9a3' : '#8890b8', 4);
    teksPx(ctx, 'x100 = 0,01', x - 30, 186, mana === 1 ? '#ffe9a3' : '#8890b8', 4);
    teksPx(ctx, 'MENUJU 0', x - 28, 198, '#7dffa8', 4);
    ctx.globalAlpha = 0.4; lingkaran(ctx, x + 24, 166, 4, '#a8c8ff'); ctx.globalAlpha = 1;
  }
  function gambarGerbangJuaraMenuju(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#2c3050');
    P(ctx, x - 32, 176, 8, 68, '#4a5078');
    P(ctx, x + 24, 176, 8, 68, '#4a5078');
    P(ctx, x - 36, 166, 72, 11, '#3e4466');
    P(ctx, x - 24, 188, 48, 56, '#363c64');
    const den = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.3 + den * 0.5; lingkaran(ctx, x, 214, 11, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, 'JUARA', x - 15, 252, '#7ff2d8', 5);
  }
  function gambarKeranBergantiDeras(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b0d488');
    P(ctx, x + 6, 158, 12, 44, '#8a94a4');
    P(ctx, x - 4, 154, 26, 10, '#6a7484');
    P(ctx, x - 14, 158, 12, 6, '#6a7484');
    const deras = Math.sin(t * 1.6) > 0;
    const lebar = deras ? 5 : 2;
    ctx.globalAlpha = 0.75;
    P(ctx, x - 8 - lebar / 2, 166, lebar, Math.min(76, (t * 40) % 80), '#5a9ad8');
    ctx.globalAlpha = 1;
    const den = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x + 12, 148, 5, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, 'AIR', x - 22, 188, '#3f6a34', 5);
    teksPx(ctx, deras ? 'DERAS' : 'PELAN', x - 26, 200, '#3f6a34', 4);
  }
  function gambarGelasPengukurAir(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b0d488');
    P(ctx, x - 14, 164, 28, 80, '#e8f4fa');
    P(ctx, x - 11, 168, 22, 72, '#d0ecf8');
    const isi = Math.min(76, Math.floor((t * 9) % 80));
    P(ctx, x - 11, 240 - isi, 22, isi, '#5a9ad8');
    P(ctx, x - 11, 240 - isi, 22, 2, '#8ac4f0');
    for (let i = 0; i < 4; i++) P(ctx, x + 8, 236 - i * 18, 8, 2, '#6a7484');
    teksPx(ctx, '13', x + 20, 176, '#3f6a34', 6);
    teksPx(ctx, 'CM', x + 20, 188, '#3f6a34', 4);
  }
  function gambarPapanLajuTigaSaat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b0d488');
    P(ctx, x - 4, 198, 8, 46, '#6e5238');
    P(ctx, x - 32, 164, 64, 40, '#7a6248');
    P(ctx, x - 36, 156, 72, 9, '#5e4a34');
    const baris = ['3', '3', '6', '1'];
    const mana = Math.floor(t * 2.2) % 4;
    for (let i = 0; i < 4; i++) {
      P(ctx, x - 26, 170 + i * 8, 14, 6, i === mana ? '#ffe9a3' : '#c8b088');
      teksPx(ctx, baris[i], x - 8, 172 + i * 8, i === mana ? '#c85a2a' : '#5a4a2a', 5);
    }
    teksPx(ctx, 'LAJU', x + 12, 166, '#3f6a34', 4);
  }
  function gambarJamDetikTaman(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b0d488');
    P(ctx, x - 5, 208, 10, 36, '#6e5238');
    lingkaran(ctx, x, 188, 22, '#e8f4fa');
    lingkaran(ctx, x, 188, 18, '#fffdf2');
    const sudut = (t * 1.57) % 6.283;
    const nx = x + Math.sin(sudut) * 13, ny = 188 - Math.cos(sudut) * 13;
    P(ctx, Math.min(x, nx), Math.min(188, ny), Math.abs(nx - x) + 2, Math.abs(ny - 188) + 2, '#c85a2a');
    lingkaran(ctx, x, 188, 3, '#5a4a2a');
    teksPx(ctx, 'DET', x - 9, 158, '#3f6a34', 4);
  }
  function gambarPapanKilometerEnam(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c0c8b0');
    P(ctx, x - 22, 200, 6, 44, '#8a94a4');
    P(ctx, x + 16, 200, 6, 44, '#8a94a4');
    P(ctx, x - 30, 158, 60, 44, '#4a6fa0');
    P(ctx, x - 33, 152, 66, 8, '#3a5a84');
    const den = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.25 + den * 0.35; lingkaran(ctx, x + 24, 162, 6, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, '60', x - 16, 172, '#fffdf2', 9);
    teksPx(ctx, 'KM', x - 10, 190, '#d8e4f4', 5);
  }
  function gambarSpeedometerBergetar(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c0c8b0');
    P(ctx, x - 5, 214, 10, 30, '#6a7484');
    lingkaran(ctx, x, 186, 26, '#3a4048');
    lingkaran(ctx, x, 186, 21, '#e8ecf0');
    for (let i = 0; i < 5; i++) {
      const a = 2.4 + i * 0.85;
      P(ctx, x + Math.sin(a) * 15 - 1, 186 - Math.cos(a) * 15 - 1, 2, 2, '#8a94a4');
    }
    const miring = Math.sin(t * 2.4) * 0.8;
    const a = 3.6 + miring;
    P(ctx, x + Math.sin(a) * 16 - 1, 186 - Math.cos(a) * 16 - 1, 3, 3, '#c85a2a');
    lingkaran(ctx, x, 186, 3, '#5a626c');
    teksPx(ctx, '40', x - 26, 208, '#5a626c', 4);
    teksPx(ctx, '80', x + 18, 208, '#5a626c', 4);
  }
  function gambarDuaMobilRata(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c0c8b0');
    P(ctx, x - 36, 238, 72, 2, '#8a94a4');
    const geserA = Math.sin(t * 1.8) * 12;
    const geserB = Math.sin(t * 1.8 + 2.4) * 12;
    P(ctx, x - 28 + geserA, 214, 18, 10, '#c85a5a');
    P(ctx, x - 24 + geserA, 208, 10, 7, '#e88080');
    lingkaran(ctx, x - 23 + geserA, 225, 3, '#3a4048');
    lingkaran(ctx, x - 13 + geserA, 225, 3, '#3a4048');
    P(ctx, x - 4 + geserB, 192, 18, 10, '#5a8ac8');
    P(ctx, x + geserB, 186, 10, 7, '#88b0e0');
    lingkaran(ctx, x + 1 + geserB, 203, 3, '#3a4048');
    lingkaran(ctx, x + 11 + geserB, 203, 3, '#3a4048');
    teksPx(ctx, 'A', x - 34, 196, '#c85a5a', 5);
    teksPx(ctx, 'B', x - 10, 174, '#5a8ac8', 5);
    teksPx(ctx, '60', x + 26, 214, '#5a626c', 5);
  }
  function gambarJamPerjalananSatu(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c0c8b0');
    P(ctx, x - 5, 212, 10, 32, '#8a94a4');
    lingkaran(ctx, x, 190, 20, '#3a5a84');
    lingkaran(ctx, x, 190, 16, '#d8e4f4');
    P(ctx, x - 1, 178, 2, 13, '#4a6fa0');
    P(ctx, x - 1, 190, 9, 2, '#4a6fa0');
    lingkaran(ctx, x, 190, 2, '#c85a2a');
    teksPx(ctx, '60:1', x - 12, 158, '#5a626c', 5);
    const den = 0.5 + 0.5 * Math.sin(t * 2);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x, 190, 18, '#ffe9a3'); ctx.globalAlpha = 1;
  }
  function gambarKurvaBukitHijau(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b0d488');
    for (let i = 0; i < 12; i++) {
      const yy = 214 - Math.round(26 * Math.sin((i / 11) * 3.14));
      P(ctx, x - 34 + i * 6, yy, 6, 244 - yy, '#6aa84e');
    }
    P(ctx, x - 34, 238, 72, 6, '#5a9440');
    const mana = Math.floor((t * 1.4) % 12);
    const yy2 = 214 - Math.round(26 * Math.sin((mana / 11) * 3.14));
    ctx.globalAlpha = 0.5 + 0.4 * (0.5 + 0.5 * Math.sin(t * 3));
    lingkaran(ctx, x - 31 + mana * 6, yy2 - 3, 4, '#ffe9a3');
    ctx.globalAlpha = 1;
  }
  function gambarPenggarisMenempel(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b0d488');
    for (let i = 0; i < 10; i++) {
      const yy = 216 - Math.round(20 * Math.sin((i / 9) * 3.14));
      P(ctx, x - 32 + i * 7, yy, 7, 244 - yy, '#6aa84e');
    }
    ctx.save();
    ctx.translate(x, 196);
    ctx.rotate(-0.5);
    P(ctx, -34, -5, 68, 10, '#e8a05a');
    P(ctx, -34, -5, 68, 3, '#c85a2a');
    for (let i = 0; i < 6; i++) P(ctx, -28 + i * 11, -5, 2, 4, '#8a4a20');
    ctx.restore();
    const den = 0.5 + 0.5 * Math.sin(t * 2.8);
    ctx.globalAlpha = 0.4 + den * 0.4; lingkaran(ctx, x, 196, 6, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, 'PAS', x + 14, 180, '#3f6a34', 4);
  }
  function gambarTitikTapakCahaya(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b0d488');
    for (let i = 0; i < 12; i++) {
      const yy = 214 - Math.round(26 * Math.sin((i / 11) * 3.14));
      P(ctx, x - 34 + i * 6, yy, 6, 244 - yy, '#6aa84e');
    }
    const mana = Math.floor((t * 1.1) % 12);
    const yy2 = 214 - Math.round(26 * Math.sin((mana / 11) * 3.14));
    const den = 0.5 + 0.5 * Math.sin(t * 3.2);
    ctx.globalAlpha = 0.5 + den * 0.4;
    lingkaran(ctx, x - 31 + mana * 6, yy2 - 2, 5, '#ffe9a3');
    lingkaran(ctx, x - 31 + mana * 6, yy2 - 2, 3, '#fffdf2');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'TAPAK', x - 18, 156, '#3f6a34', 4);
  }
  function gambarPapanKemiringanSatu(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b0d488');
    P(ctx, x - 4, 200, 8, 44, '#6e5238');
    P(ctx, x - 30, 162, 60, 42, '#7a6248');
    P(ctx, x - 34, 154, 68, 9, '#5e4a34');
    const nilai = ['1', '0', '2'];
    const nama = ['LANDAI', 'PUNCAK', 'CURAM'];
    const mana = Math.floor(t * 1.8) % 3;
    for (let i = 0; i < 3; i++) {
      teksPx(ctx, nama[i], x - 26, 172 + i * 11, i === mana ? '#ffe9a3' : '#c8b088', 4);
      teksPx(ctx, nilai[i], x + 12, 172 + i * 11, i === mana ? '#c85a2a' : '#5a4a2a', 5);
    }
  }
  function gambarMesinPangkatTurun(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c0a878');
    P(ctx, x - 30, 158, 60, 86, '#8a6e4c');
    P(ctx, x - 36, 150, 72, 9, '#6e5638');
    P(ctx, x - 24, 168, 20, 16, '#4a3a24');
    P(ctx, x + 4, 168, 20, 16, '#4a3a24');
    teksPx(ctx, 'x2', x - 20, 172, '#ffe9a3', 5);
    teksPx(ctx, '2x', x + 8, 172, '#ffe9a3', 5);
    const panah = Math.round(Math.sin(t * 2.4) * 3);
    P(ctx, x - 3, 190 + panah, 6, 3, '#c85a2a');
    P(ctx, x - 5, 186 + panah, 3, 3, '#c85a2a');
    P(ctx, x + 2, 186 + panah, 3, 3, '#c85a2a');
    const den = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x, 222, 8, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, 'TURUN', x - 16, 234, '#5a4a2a', 4);
  }
  function gambarBolaKuadratLompat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c0a878');
    P(ctx, x - 36, 236, 72, 2, '#8a7256');
    const kotak = [1, 4, 9];
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 32 + i * 24, 210, 20, 26, i === 0 ? '#7a6248' : '#6e5638');
      teksPx(ctx, String(kotak[i]), x - 26 + i * 24, 218, '#ffe9a3', 5);
    }
    const mana = Math.floor(t * 2) % 3;
    const melompat = Math.abs(Math.sin(t * 4)) * 14;
    lingkaran(ctx, x - 22 + mana * 24, 204 - melompat, 5, '#c85a2a');
    teksPx(ctx, '1-4-9', x - 16, 166, '#5a4a2a', 4);
  }
  function gambarRodaGigiGanjil(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c0a878');
    for (let i = 0; i < 3; i++) {
      const gx = x - 22 + i * 22, gy = 198 - i * 4;
      lingkaran(ctx, gx, gy, 9 - i, '#c8a06a');
      lingkaran(ctx, gx, gy, 5 - i * 0.5, '#e8d8b0');
      const putar = t * (1.2 + i * 0.4);
      P(ctx, gx + Math.sin(putar) * (8 - i) - 1, gy - Math.cos(putar) * (8 - i) - 1, 3, 3, '#8a6a3a');
      teksPx(ctx, ['3', '5', '7'][i], gx - 3, gy + 12, '#5a4a2a', 5);
    }
    const den = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.35 + den * 0.4; lingkaran(ctx, x + 24, 224, 7, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, 'GANJIL', x - 18, 234, '#5a4a2a', 4);
  }
  function gambarPapanAturanPangkat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c0a878');
    P(ctx, x - 4, 200, 8, 44, '#6e5238');
    P(ctx, x - 32, 160, 64, 44, '#7a6248');
    P(ctx, x - 36, 152, 72, 9, '#5e4a34');
    teksPx(ctx, 'x2 -> 2x', x - 22, 168, '#ffe9a3', 5);
    const baris = [['3', '2-4'], ['5', '4-6'], ['7', '6-8'], ['9', '8-10']];
    const mana = Math.floor(t * 1.8) % 4;
    for (let i = 0; i < 4; i++) {
      teksPx(ctx, baris[i][0], x - 26, 182 + i * 6, mana === i ? '#ffe9a3' : '#c8b088', 4);
      teksPx(ctx, baris[i][1], x - 6, 182 + i * 6, mana === i ? '#ffe9a3' : '#c8b088', 4);
    }
    teksPx(ctx, 'ANTARA', x + 8, 190, '#c85a2a', 4);
  }
  function gambarPanahNaikHijau(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c0aa78');
    P(ctx, x - 5, 214, 10, 30, '#6e5238');
    const naik = Math.sin(t * 2.2) * 4;
    P(ctx, x - 20, 192 + naik, 34, 8, '#4fa55e');
    P(ctx, x + 8, 182 + naik, 8, 18, '#4fa55e');
    P(ctx, x + 10, 178 + naik, 4, 6, '#4fa55e');
    P(ctx, x - 12, 184 + naik, 4, 4, '#4fa55e');
    const den = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x - 3, 188 + naik, 7, '#d8f0c8'); ctx.globalAlpha = 1;
    teksPx(ctx, '+2', x + 16, 208, '#3f6a34', 5);
  }
  function gambarPapanBerhentiSesaat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c0aa78');
    P(ctx, x - 4, 206, 8, 38, '#6e5238');
    P(ctx, x - 26, 172, 52, 36, '#f2ead4');
    P(ctx, x - 30, 164, 60, 9, '#6e5238');
    const den = 0.5 + 0.5 * Math.sin(t * 1.6);
    ctx.globalAlpha = 0.2 + den * 0.3; lingkaran(ctx, x, 190, 12, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, '0', x - 4, 182, '#5a4a2a', 10);
    teksPx(ctx, 'SEJENAK', x - 22, 216, '#5a4a2a', 4);
  }
  function gambarPanahTurunMerah(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c0aa78');
    P(ctx, x - 5, 214, 10, 30, '#6e5238');
    const turun = Math.sin(t * 2.2) * 4;
    P(ctx, x - 14, 190 - turun, 34, 8, '#e85a5a');
    P(ctx, x - 16, 184 - turun, 8, 18, '#e85a5a');
    P(ctx, x - 14, 204 - turun, 4, 6, '#e85a5a');
    P(ctx, x + 12, 182 - turun, 4, 4, '#e85a5a');
    const den = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x + 3, 192 - turun, 7, '#f8d8d8'); ctx.globalAlpha = 1;
    teksPx(ctx, '-2', x - 32, 208, '#a83a3a', 5);
  }
  function gambarJalanBergelombang(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c0aa78');
    for (let i = 0; i < 12; i++) {
      const yy = 214 - Math.round(14 * Math.sin((i / 11) * 6.283));
      P(ctx, x - 34 + i * 6, yy, 6, 4, '#d9b877');
    }
    const warna = ['#4fa55e', '#f2ead4', '#e85a5a'];
    const mana = Math.floor(t * 1.5) % 3;
    const yy2 = 214 - Math.round(14 * Math.sin(((t * 6) % 12) / 11 * 6.283));
    ctx.globalAlpha = 0.5 + 0.4 * (0.5 + 0.5 * Math.sin(t * 3));
    lingkaran(ctx, x - 31 + Math.round((t * 6) % 12) * 6, yy2 - 4, 4, warna[mana]);
    ctx.globalAlpha = 1;
    teksPx(ctx, 'HIJAU PUTIH MERAH', x - 34, 164, '#5a4a2a', 4);
  }
  function gambarAirMancurMelengkung(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b0d488');
    P(ctx, x - 3, 180, 6, 30, '#8a7256');
    P(ctx, x - 10, 174, 20, 7, '#6e5a3c');
    for (let i = 0; i < 7; i++) {
      const u = (t * 0.9 + i / 7) % 1;
      const ax = x - 26 + u * 52;
      const ay = 196 - Math.round(46 * Math.sin(u * 3.14));
      ctx.globalAlpha = 0.8 - u * 0.4;
      lingkaran(ctx, ax, ay, 3, '#8ac4f0');
      ctx.globalAlpha = 1;
    }
    P(ctx, x - 30, 230, 60, 8, '#5a9ad8');
    P(ctx, x - 30, 230, 60, 3, '#8ac4f0');
  }
  function gambarPapanTinggiEmpat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b0d488');
    P(ctx, x - 4, 196, 8, 48, '#6e5238');
    P(ctx, x - 30, 158, 60, 42, '#7a6248');
    P(ctx, x - 34, 150, 68, 9, '#5e4a34');
    const baris = ['0', '3', '4', '3', '0'];
    const mana = Math.floor(t * 2) % 5;
    for (let i = 0; i < 5; i++) {
      teksPx(ctx, baris[i], x - 24 + i * 11, 172 + (i === 2 ? -6 : 0), i === mana ? '#ffe9a3' : '#c8b088', 5);
    }
    teksPx(ctx, 'PUNCAK', x - 20, 160, '#c85a2a', 4);
    teksPx(ctx, 'DETIK 2', x - 18, 192, '#5a4a2a', 4);
  }
  function gambarTitikPuncakKilau(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b0d488');
    for (let i = 0; i < 12; i++) {
      const u = i / 11;
      const yy = 196 - Math.round(34 * Math.sin(u * 3.14));
      P(ctx, x - 34 + i * 6, yy, 6, 244 - yy, '#6aa84e');
    }
    const den = 0.5 + 0.5 * Math.sin(t * 3.4);
    ctx.globalAlpha = 0.5 + den * 0.4;
    lingkaran(ctx, x, 160, 6, '#ffe9a3');
    lingkaran(ctx, x, 160, 3.5, '#fffdf2');
    ctx.globalAlpha = 1;
    teksPx(ctx, '4', x + 10, 156, '#3f6a34', 7);
    teksPx(ctx, 'SESAAT DIAM', x - 26, 234, '#3f6a34', 4);
  }
  function gambarKolamCipratan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b0d488');
    P(ctx, x - 30, 214, 60, 22, '#5a9ad8');
    P(ctx, x - 30, 214, 60, 4, '#8ac4f0');
    for (let i = 0; i < 5; i++) {
      const u = (t * 1.6 + i / 5) % 1;
      const cxp = x - 22 + i * 11;
      const cyp = 208 - Math.abs(Math.sin(u * 3.14)) * 16;
      ctx.globalAlpha = 0.7 - u * 0.4;
      lingkaran(ctx, cxp, cyp, 2.5, '#8ac4f0');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'CIPRAT', x - 18, 190, '#3f6a34', 4);
  }
  function gambarTanggaTigaAnakLaju(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b0d488');
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 30 + i * 22, 226 - i * 26, 22, 8, '#8a6e4c');
      P(ctx, x + 6 - 22 + i * 22, 234 - i * 26, 4, 8, '#6e5238');
    }
    const nama = ['JARAK', 'LAJU', 'PERCEP'];
    const mana = Math.floor(t * 1.5) % 3;
    for (let i = 0; i < 3; i++) {
      teksPx(ctx, nama[i], x - 38 + i * 24, 218 - i * 26, i === mana ? '#c85a2a' : '#5a4a2a', 4);
    }
    const den = 0.5 + 0.5 * Math.sin(t * 2.6);
    ctx.globalAlpha = 0.35 + den * 0.4; lingkaran(ctx, x + 22, 178, 6, '#ffe9a3'); ctx.globalAlpha = 1;
  }
  function gambarPapanJarakBola(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b0d488');
    P(ctx, x - 4, 200, 8, 44, '#6e5238');
    P(ctx, x - 30, 162, 60, 42, '#7a6248');
    P(ctx, x - 34, 154, 68, 9, '#5e4a34');
    const mana = Math.floor(t * 2) % 3;
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 24, 172 + i * 10, 14, 7, i === mana ? '#ffe9a3' : '#c8b088');
      teksPx(ctx, ['1', '4', '9'][i], x - 4, 174 + i * 10, i === mana ? '#c85a2a' : '#5a4a2a', 5);
    }
    lingkaran(ctx, x + 18, 216, 5, '#c85a2a');
    teksPx(ctx, 'M', x + 14, 196, '#5a4a2a', 4);
  }
  function gambarPapanLajuNaikDua(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b0d488');
    P(ctx, x - 4, 200, 8, 44, '#6e5238');
    P(ctx, x - 30, 162, 60, 42, '#7a6248');
    P(ctx, x - 34, 154, 68, 9, '#5e4a34');
    const mana = Math.floor(t * 2) % 3;
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 24, 172 + i * 10, 14, 7, i === mana ? '#ffe9a3' : '#c8b088');
      teksPx(ctx, ['2', '4', '6'][i], x - 4, 174 + i * 10, i === mana ? '#c85a2a' : '#5a4a2a', 5);
      P(ctx, x + 12, 176 + i * 10, 3, 5, '#4fa55e');
      P(ctx, x + 11, 175 + i * 10, 5, 2, '#4fa55e');
    }
    teksPx(ctx, 'M/S', x + 16, 168, '#5a4a2a', 4);
  }
  function gambarPapanPercepatanDua(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b0d488');
    P(ctx, x - 5, 208, 10, 36, '#6e5238');
    P(ctx, x - 28, 168, 56, 42, '#7a6248');
    P(ctx, x - 32, 160, 64, 9, '#5e4a34');
    const den = 0.5 + 0.5 * Math.sin(t * 2.8);
    ctx.globalAlpha = 0.3 + den * 0.4; lingkaran(ctx, x, 188, 10, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, '+2', x - 8, 178, '#ffe9a3', 8);
    teksPx(ctx, 'TETAP', x - 15, 198, '#c8b088', 4);
  }
  function gambarKurvaSenyumRaksasa(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b0d488');
    for (let i = 0; i < 13; i++) {
      const u = i / 12;
      const yy = 182 + Math.round(44 * Math.pow(2 * u - 1, 2));
      P(ctx, x - 34 + i * 5.5, yy, 6, 244 - yy, '#6aa84e');
    }
    const mana = Math.floor((t * 1.2) % 13);
    const u2 = mana / 12;
    const yy2 = 182 + Math.round(44 * Math.pow(2 * u2 - 1, 2));
    ctx.globalAlpha = 0.5 + 0.4 * (0.5 + 0.5 * Math.sin(t * 3));
    lingkaran(ctx, x - 31 + mana * 5.5, yy2 - 3, 4, '#ffe9a3');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'U', x + 24, 186, '#3f6a34', 8);
  }
  function gambarPapanLembahNol(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b0d488');
    P(ctx, x - 4, 200, 8, 44, '#6e5238');
    P(ctx, x - 30, 162, 60, 42, '#7a6248');
    P(ctx, x - 34, 154, 68, 9, '#5e4a34');
    const fase = ['TURUN', 'DIAM', 'NAIK'];
    const angka = ['-4-2', '0', '+2+4'];
    const mana = Math.floor(t * 1.6) % 3;
    for (let i = 0; i < 3; i++) {
      teksPx(ctx, fase[i], x - 26, 170 + i * 11, i === mana ? '#ffe9a3' : '#c8b088', 4);
      teksPx(ctx, angka[i], x + 4, 170 + i * 11, i === mana ? '#c85a2a' : '#5a4a2a', 4);
    }
  }
  function gambarTitikTerendahKilau(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b0d488');
    for (let i = 0; i < 13; i++) {
      const u = i / 12;
      const yy = 182 + Math.round(44 * Math.pow(2 * u - 1, 2));
      P(ctx, x - 34 + i * 5.5, yy, 6, 244 - yy, '#6aa84e');
    }
    const den = 0.5 + 0.5 * Math.sin(t * 3.2);
    ctx.globalAlpha = 0.5 + den * 0.4;
    lingkaran(ctx, x, 230, 6, '#ffe9a3');
    lingkaran(ctx, x, 230, 3.5, '#fffdf2');
    ctx.globalAlpha = 1;
    teksPx(ctx, '-4', x + 10, 226, '#3f6a34', 6);
    teksPx(ctx, 'DASAR', x - 26, 160, '#3f6a34', 4);
  }
  function gambarBurungLingkarLembah(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#b0d488');
    for (let i = 0; i < 11; i++) {
      const u = i / 10;
      const yy = 196 + Math.round(28 * Math.pow(2 * u - 1, 2));
      P(ctx, x - 30 + i * 6, yy, 6, 244 - yy, '#6aa84e');
    }
    const sudut = t * 1.6;
    const bx = x + Math.sin(sudut) * 26;
    const by = 176 + Math.abs(Math.cos(sudut)) * 10;
    const kepak = Math.sin(t * 8) > 0 ? 4 : 0;
    P(ctx, bx - 6, by - kepak, 5, 3, '#fffdf2');
    P(ctx, bx + 2, by - kepak, 5, 3, '#fffdf2');
    P(ctx, bx - 1, by, 3, 3, '#e8e0c8');
    teksPx(ctx, 'TURUN-DIAM-NAIK', x - 34, 158, '#3f6a34', 4);
  }
  function gambarMotorSoreKencang(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c8ac84');
    P(ctx, x - 22, 226, 34, 5, '#5a626c');
    P(ctx, x - 14, 216, 12, 12, '#c85a2a');
    P(ctx, x - 4, 210, 14, 14, '#c85a2a');
    P(ctx, x - 2, 206, 6, 6, '#8a4a20');
    P(ctx, x + 12, 220, 14, 4, '#5a626c');
    lingkaran(ctx, x - 18, 234, 6, '#3a4048');
    lingkaran(ctx, x - 18, 234, 2.5, '#8a94a4');
    lingkaran(ctx, x + 16, 234, 6, '#3a4048');
    lingkaran(ctx, x + 16, 234, 2.5, '#8a94a4');
    const ngorok = Math.sin(t * 7) > 0;
    P(ctx, x - 32, 222, ngorok ? 8 : 5, 2, '#d8d0b8');
    P(ctx, x - 34, 228, ngorok ? 10 : 6, 2, '#d8d0b8');
    teksPx(ctx, 'BRRM', x + 22, 210, '#5a4a2a', 4);
  }
  function gambarSpeedometerNaikTetap(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c8ac84');
    P(ctx, x - 5, 214, 10, 30, '#6a7484');
    lingkaran(ctx, x, 186, 26, '#3a4048');
    lingkaran(ctx, x, 186, 21, '#e8ecf0');
    for (let i = 0; i < 4; i++) {
      const a = 2.6 + i * 0.7;
      P(ctx, x + Math.sin(a) * 15 - 1, 186 - Math.cos(a) * 15 - 1, 2, 2, '#8a94a4');
    }
    const mana = Math.floor(t * 1.5) % 3;
    const a = 2.6 + mana * 0.7;
    P(ctx, x + Math.sin(a) * 16 - 1, 186 - Math.cos(a) * 16 - 1, 3, 3, '#c85a2a');
    lingkaran(ctx, x, 186, 3, '#5a626c');
    teksPx(ctx, ['5', '10', '15'][mana], x + 14, 158, '#c85a2a', 5);
  }
  function gambarPapanDetikLima(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c8ac84');
    P(ctx, x - 4, 200, 8, 44, '#6e5238');
    P(ctx, x - 30, 162, 60, 42, '#7a6248');
    P(ctx, x - 34, 154, 68, 9, '#5e4a34');
    const mana = Math.floor(t * 1.8) % 3;
    for (let i = 0; i < 3; i++) {
      teksPx(ctx, ['5', '10', '15'][i], x - 24 + i * 15, 176, i === mana ? '#ffe9a3' : '#c8b088', 5);
    }
    const den = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalAlpha = 0.35 + den * 0.4; lingkaran(ctx, x + 14, 194, 6, '#ffe9a3'); ctx.globalAlpha = 1;
    teksPx(ctx, '+5', x + 8, 188, '#c85a2a', 6);
    teksPx(ctx, 'TIAP DETIK', x - 26, 196, '#5a4a2a', 4);
  }
  function gambarJalanDesaMelengkung(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#c8ac84');
    for (let i = 0; i < 12; i++) {
      const yy = 212 + Math.round(10 * Math.sin((i / 11) * 3.14));
      P(ctx, x - 34 + i * 6, yy, 6, 244 - yy, '#b69c74');
    }
    P(ctx, x - 34, 208, 72, 3, '#c9ae86');
    const u = (t * 0.5) % 1;
    const mx = x - 30 + u * 60;
    const my = 204 + Math.round(10 * Math.sin((u * 11 / 11) * 3.14));
    lingkaran(ctx, mx, my, 4, '#c85a2a');
    teksPx(ctx, 'TIKUNGAN', x - 24, 166, '#5a4a2a', 4);
  }
  function gambarKompasKemiringan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a4166');
    P(ctx, x - 5, 214, 10, 30, '#323856');
    lingkaran(ctx, x, 186, 24, '#4a5078');
    lingkaran(ctx, x, 186, 19, '#d8dcf4');
    const miring = Math.sin(t * 1.4) * 0.6;
    P(ctx, x + Math.sin(0.5 + miring) * 15 - 1, 186 - Math.cos(0.5 + miring) * 15 - 1, 3, 3, '#7ff2d8');
    P(ctx, x + Math.sin(3.6 - miring) * 15 - 1, 186 - Math.cos(3.6 - miring) * 15 - 1, 3, 3, '#f28ab8');
    lingkaran(ctx, x, 186, 3, '#2e3460');
    teksPx(ctx, 'MIRING', x - 18, 156, '#7ff2d8', 4);
  }
  function gambarLimaPapanMisiLereng(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a4166');
    for (let i = 0; i < 5; i++) {
      P(ctx, x - 34 + i * 15, 176 - (i % 2) * 4, 12, 30 + (i % 2) * 4, '#3e4466');
      P(ctx, x - 36 + i * 15, 170 - (i % 2) * 4, 16, 7, '#323856');
      const mana = Math.floor(t * 2) % 5;
      ctx.globalAlpha = i === mana ? 0.9 : 0.2;
      lingkaran(ctx, x - 28 + i * 15, 186 - (i % 2) * 4, 2.5, '#ffe9a3');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'LIMA MISI', x - 24, 216, '#7ff2d8', 4);
  }
  function gambarPapanPuncakLembah(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a4166');
    P(ctx, x - 4, 200, 8, 44, '#323856');
    P(ctx, x - 30, 162, 60, 42, '#3e4466');
    P(ctx, x - 34, 154, 68, 9, '#2e3456');
    const mana = Math.floor(t * 1.6) % 2;
    teksPx(ctx, 'PUNCAK 4', x - 26, 172, mana === 0 ? '#ffe9a3' : '#8890b8', 4);
    teksPx(ctx, 'LEMBAH -4', x - 26, 184, mana === 1 ? '#ffe9a3' : '#8890b8', 4);
    teksPx(ctx, 'LAJU 0', x - 20, 196, '#7ff2d8', 4);
  }
  function gambarGerbangJuaraLereng(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a4166');
    P(ctx, x - 26, 158, 10, 86, '#4a5078');
    P(ctx, x + 16, 158, 10, 86, '#4a5078');
    P(ctx, x - 30, 148, 60, 12, '#3e4466');
    const den = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.3 + den * 0.5;
    P(ctx, x - 16, 166, 32, 78, '#ffe9a3');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'JUARA', x - 15, 186, '#323856', 5);
    teksPx(ctx, 'LERENG', x - 15, 198, '#323856', 4);
  }
  function gambarPapanUbinDuaBelas(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a50');
    P(ctx, x - 6, 210, 12, 34, '#7a6a44');
    P(ctx, x - 34, 168, 68, 44, '#8a6a44');
    P(ctx, x - 37, 162, 74, 8, '#6e5236');
    const mana = Math.floor(t * 3) % 12;
    for (let i = 0; i < 12; i++) {
      const bx = x - 28 + (i % 4) * 15, by = 176 + Math.floor(i / 4) * 11;
      P(ctx, bx, by, 13, 9, i === mana ? '#ffe9a3' : '#c8b070');
      P(ctx, bx, by, 13, 1, i === mana ? '#fff8e0' : '#dcc890');
    }
    teksPx(ctx, '4x3=12', x - 16, 156, '#6e5236', 4);
  }
  function gambarTumpukanUbinTiga(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a50');
    const lompat = Math.sin(t * 3) > 0.4 ? 2 : 0;
    P(ctx, x - 27, 224, 54, 12, '#c8b070');
    P(ctx, x - 18, 212 - (lompat === 1 ? 0 : 0), 36, 12, '#b8a060');
    P(ctx, x - 9, 200 - lompat, 18, 12, '#ffe9a3');
    P(ctx, x - 27, 224, 54, 2, '#e0d090');
    P(ctx, x - 18, 212, 36, 2, '#d0c080');
    P(ctx, x - 9, 200 - lompat, 18, 2, '#fff8e0');
    teksPx(ctx, '1+2+3', x - 14, 184 - lompat, '#8a6a44', 4);
  }
  function gambarPapanTigaSusun(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a50');
    P(ctx, x - 5, 216, 10, 28, '#7a6a44');
    P(ctx, x - 32, 178, 64, 40, '#8a6a44');
    P(ctx, x - 35, 172, 70, 7, '#6e5236');
    const mana = Math.floor(t * 1.8) % 3;
    for (let i = 0; i < 12; i++) {
      P(ctx, x - 28 + i * 4, 180, 3, 4, mana === 0 ? '#ffe9a3' : '#c8b070');
    }
    for (let i = 0; i < 12; i++) {
      P(ctx, x - 28 + (i % 6) * 8, 188 + Math.floor(i / 6) * 5, 6, 3, mana === 1 ? '#ffe9a3' : '#b8a060');
    }
    for (let i = 0; i < 12; i++) {
      P(ctx, x - 28 + (i % 4) * 8, 202 + Math.floor(i / 4) * 5, 6, 3, mana === 2 ? '#ffe9a3' : '#a89058');
    }
    teksPx(ctx, 'SAMA', x - 10, 164, '#fffdf2', 4);
  }
  function gambarGerbangJumlahKotak(x, t) {
    const pulsa = 0.5 + 0.3 * Math.sin(t * 2.2);
    P(ctx, x - 40, 244, 80, 3, '#8a7a50');
    P(ctx, x - 34, 150, 14, 94, '#9a8460');
    P(ctx, x + 20, 150, 14, 94, '#9a8460');
    P(ctx, x - 38, 138, 76, 14, '#8a7452');
    P(ctx, x - 30, 158, 10, 10, '#c8b070');
    P(ctx, x + 20, 158, 10, 10, '#c8b070');
    P(ctx, x - 30, 172, 10, 10, '#b8a060');
    P(ctx, x + 20, 172, 10, 10, '#b8a060');
    ctx.globalAlpha = pulsa;
    P(ctx, x - 16, 160, 32, 84, '#ffe9a3');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'JUMLAH', x - 16, 128, '#6e5236', 4);
  }
  function gambarSegitigaKotakPetak(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9ab0');
    P(ctx, x - 34, 152, 68, 92, '#f0f6fc');
    for (let i = 0; i <= 8; i++) P(ctx, x - 34 + i * 8.5, 152, 1, 92, '#c8d8e8');
    for (let j = 0; j <= 8; j++) P(ctx, x - 34, 152 + j * 11.5, 68, 1, '#c8d8e8');
    for (let j = 0; j < 8; j++) {
      P(ctx, x - 34, 244 - (j + 1) * 11.5, (j + 1) * 8.5, 11.5, j % 2 ? '#b8d8b0' : '#a8cc9e');
    }
    const gerak = (t * 20) % 68;
    P(ctx, x - 34 + gerak, 152, 2, 92, '#f28ab8');
    P(ctx, x - 34, 152, 68, 2, '#6a90b8');
  }
  function gambarKotakKacaSetengah(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9ab0');
    const hidup = 0.45 + 0.3 * Math.sin(t * 2.6);
    for (let i = 0; i < 4; i++) {
      P(ctx, x - 30 + i * 16, 196, 14, 22, '#c8e4f0');
      ctx.globalAlpha = hidup;
      P(ctx, x - 30 + i * 16, 196, 14, 11, '#8ac4e0');
      ctx.globalAlpha = 1;
      P(ctx, x - 30 + i * 16, 206, 14, 1, '#6aa8c8');
    }
    P(ctx, x - 34, 224, 68, 3, '#8aa8b8');
    for (let i = 0; i < 6; i++) P(ctx, x - 28 + i * 11, 228, 9, 10, '#b8d8b0');
    teksPx(ctx, '1/2', x - 8, 178, '#5c88a8', 5);
  }
  function gambarPapanEnamSetengah(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9ab0');
    P(ctx, x - 5, 214, 10, 30, '#7a8a9a');
    P(ctx, x - 32, 172, 64, 44, '#3e4a58');
    P(ctx, x - 35, 165, 70, 8, '#2e3a46');
    const mana = Math.floor(t * 2) % 3;
    teksPx(ctx, '6 PENUH', x - 26, 180, mana === 0 ? '#ffe9a3' : '#8890b8', 4);
    teksPx(ctx, '4 SETENGAH', x - 29, 192, mana === 1 ? '#ffe9a3' : '#8890b8', 4);
    teksPx(ctx, '= 8', x - 8, 204, mana === 2 ? '#7ff2d8' : '#8890b8', 5);
  }
  function gambarPenggarisLuasDelapan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9ab0');
    P(ctx, x - 30, 164, 4, 80, '#e8d8b0');
    P(ctx, x + 26, 164, 4, 80, '#e8d8b0');
    P(ctx, x - 30, 240, 60, 4, '#e8d8b0');
    P(ctx, x - 30, 164, 60, 3, '#d8c898');
    for (let i = 0; i < 5; i++) P(ctx, x - 30 + i * 12, 164 + i * 16, 10, 2, '#a89868');
    const geser = 0.5 + 0.5 * Math.sin(t * 1.6);
    P(ctx, x - 26 + geser * 46, 196, 4, 48, '#f28ab8');
    lingkaran(ctx, x - 24 + geser * 46, 194, 3, '#f28ab8');
    teksPx(ctx, '8', x + 30, 156, '#6a8a58', 7);
  }
  function gambarMesinIrisKertas(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a50');
    P(ctx, x - 28, 178, 56, 66, '#a89878');
    P(ctx, x - 32, 172, 64, 8, '#8a7a5c');
    P(ctx, x - 24, 190, 48, 40, '#e8e0cc');
    for (let i = 0; i < 6; i++) P(ctx, x - 20 + i * 8, 190, 2, 40, i % 2 ? '#c8c0ac' : '#d8d0bc');
    const turun = 8 + Math.round(Math.abs(Math.sin(t * 2.4)) * 8);
    P(ctx, x - 24, 176 + turun, 48, 3, '#c85050');
    P(ctx, x - 4, 158, 8, 16 + turun, '#7a6a50');
    lingkaran(ctx, x, 154, 5, '#8a7a5c');
    teksPx(ctx, 'IRIS', x - 10, 148, '#6e5236', 4);
  }
  function gambarDuaPapanTepiKiriKanan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a50');
    const mana = Math.floor(t * 1.8) % 2;
    P(ctx, x - 34, 190, 28, 40, '#3e4a58');
    P(ctx, x - 36, 184, 32, 7, '#2e3a46');
    P(ctx, x + 6, 190, 28, 40, '#3e4a58');
    P(ctx, x + 4, 184, 32, 7, '#2e3a46');
    teksPx(ctx, 'KIRI', x - 28, 196, mana === 0 ? '#ffe9a3' : '#8890b8', 4);
    teksPx(ctx, '6', x - 24, 208, mana === 0 ? '#7ff2d8' : '#8890b8', 6);
    teksPx(ctx, 'KANAN', x + 9, 196, mana === 1 ? '#ffe9a3' : '#8890b8', 4);
    teksPx(ctx, '10', x + 12, 208, mana === 1 ? '#7ff2d8' : '#8890b8', 6);
    teksPx(ctx, '8 di antara', x - 22, 162, '#6e5236', 4);
  }
  function gambarPapanKisaranDelapan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a50');
    P(ctx, x - 6, 212, 12, 32, '#7a6a44');
    P(ctx, x - 34, 170, 68, 44, '#3e4a58');
    P(ctx, x - 37, 163, 74, 8, '#2e3a46');
    const rapat = 0.5 + 0.5 * Math.sin(t * 1.5);
    teksPx(ctx, '6', x - 30 + rapat * 2, 182, '#f28ab8', 6);
    teksPx(ctx, '8', x - 5, 176, '#ffe9a3', 8);
    teksPx(ctx, '10', x + 16 - rapat * 2, 182, '#7ff2d8', 6);
    P(ctx, x - 26 + rapat * 3, 192, 6, 2, '#8890b8');
    P(ctx, x + 16 - rapat * 3, 192, 6, 2, '#8890b8');
  }
  function gambarTimbanganDuaSisiIris(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a50');
    P(ctx, x - 3, 180, 6, 64, '#7a6a50');
    const miring = Math.sin(t * 1.8) * 5;
    P(ctx, x - 30, 180 + miring, 60, 4, '#8a7a5c');
    P(ctx, x - 36, 186 + miring, 20, 4, '#6a5c44');
    P(ctx, x + 16, 186 - miring, 20, 4, '#6a5c44');
    P(ctx, x - 32, 176 + miring, 16, 4, '#c8b070');
    P(ctx, x + 18, 176 - miring, 16, 8, '#c8b070');
    lingkaran(ctx, x, 176, 5, '#9a8a68');
    teksPx(ctx, '4', x - 30, 164 + miring, '#ffe9a3', 5);
    teksPx(ctx, '2', x + 22, 164 - miring, '#7ff2d8', 5);
  }
  function gambarPintuDuaArahLorong(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#7a6a50');
    const mana = Math.floor(t * 1.4) % 2;
    P(ctx, x - 34, 156, 26, 88, '#6a5a40');
    P(ctx, x - 30, 162, 18, 82, mana === 0 ? '#a8845c' : '#8a6c4a');
    P(ctx, x + 8, 156, 26, 88, '#6a5a40');
    P(ctx, x + 12, 162, 18, 82, mana === 1 ? '#a8845c' : '#8a6c4a');
    ctx.globalAlpha = mana === 0 ? 0.5 : 0.15;
    P(ctx, x - 30, 162, 18, 82, '#ffe9a3');
    ctx.globalAlpha = mana === 1 ? 0.5 : 0.15;
    P(ctx, x + 12, 162, 18, 82, '#7ff2d8');
    ctx.globalAlpha = 1;
    teksPx(ctx, 'TURUNAN', x - 35, 144, '#f2d8ab', 3);
    teksPx(ctx, 'INTEGRAL', x + 5, 144, '#abf2dd', 3);
  }
  function gambarPapanLajuLima(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#7a6a50');
    P(ctx, x - 5, 214, 10, 30, '#6a5a40');
    P(ctx, x - 32, 172, 64, 44, '#3e4a58');
    P(ctx, x - 35, 165, 70, 8, '#2e3a46');
    const mana = Math.floor(t * 2.5) % 4;
    const angka = ['5', '10', '15', '20'];
    for (let i = 0; i < 4; i++) {
      teksPx(ctx, angka[i], x - 28 + i * 15, 186, i === mana ? '#ffe9a3' : '#8890b8', i === mana ? 6 : 5);
    }
    teksPx(ctx, 'LAKU', x - 10, 172, '#8890b8', 4);
  }
  function gambarPapanJarakDuaPuluh(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#7a6a50');
    P(ctx, x - 6, 210, 12, 34, '#6a5a40');
    P(ctx, x - 34, 166, 68, 46, '#3e4a58');
    P(ctx, x - 37, 159, 74, 8, '#2e3a46');
    const geser = (t * 24) % 56;
    P(ctx, x - 30, 200, 56, 3, '#5a6a80');
    P(ctx, x - 30 + geser, 194, 6, 6, '#ffe9a3');
    teksPx(ctx, '20', x - 10, 172, '#7ff2d8', 8);
    teksPx(ctx, 'LANGKAH', x - 20, 208, '#8890b8', 4);
  }
  function gambarCerminTurunanBalik(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#7a6a50');
    P(ctx, x - 26, 158, 52, 86, '#8a7a5c');
    const kilau = 0.5 + 0.3 * Math.sin(t * 2.4);
    ctx.globalAlpha = kilau;
    P(ctx, x - 21, 163, 42, 76, '#c8e0e8');
    ctx.globalAlpha = 1;
    const atas = (t * 40) % 60;
    P(ctx, x - 18, 163 + atas, 3, 3, '#ffe9a3');
    P(ctx, x + 15, 235 - atas, 3, 3, '#7ff2d8');
    teksPx(ctx, '<->', x - 8, 150, '#6a5a40', 5);
  }
  function gambarLengkungBatuSembilan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#9a8a60');
    P(ctx, x - 34, 150, 68, 94, '#e8dcc0');
    for (let i = 0; i < 9; i++) {
      const px = i / 8 * 60;
      const py = (i / 8) * (i / 8) * 81;
      lingkaran(ctx, x - 34 + px, 244 - py - 2, 2, '#f28ab8');
    }
    for (let i = 1; i <= 3; i++) {
      lingkaran(ctx, x - 34 + i * 20, 244 - i * i * 9, 3.5, Math.floor(t * 2) % 3 === i - 1 ? '#ffe9a3' : '#b8885c');
      teksPx(ctx, String(i * i), x - 34 + i * 20 - 4, 244 - i * i * 9 - 14, '#8a6a44', 4);
    }
    P(ctx, x - 34, 244, 68, 2, '#8a6a44');
  }
  function gambarKotakTanggaBatuKurva(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#9a8a60');
    P(ctx, x - 34, 154, 68, 90, '#e8dcc0');
    for (let j = 0; j < 3; j++) {
      P(ctx, x - 34 + j * 20 + 2, 244 - (j + 1) * 27, 20, (j + 1) * 27, j % 2 ? '#c8b070' : '#b8a060');
    }
    for (let i = 0; i < 10; i++) {
      const px = i / 9 * 60;
      const py = (i / 9) * (i / 9) * 81;
      lingkaran(ctx, x - 34 + px, 244 - py - 3, 2, '#f28ab8');
    }
    const mana = Math.floor(t * 2) % 3;
    P(ctx, x - 32 + mana * 20, 244 - (mana + 1) * 27, 20, 3, '#ffe9a3');
    teksPx(ctx, '5', x - 32, 162, '#6e5236', 5);
  }
  function gambarPapanLimaEmpatBelas(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#9a8a60');
    P(ctx, x - 5, 212, 10, 32, '#8a7a54');
    P(ctx, x - 34, 170, 68, 44, '#3e4a58');
    P(ctx, x - 37, 163, 74, 8, '#2e3a46');
    const mana = Math.floor(t * 1.8) % 2;
    teksPx(ctx, 'ATAS 14', x - 27, 180, mana === 0 ? '#ffe9a3' : '#8890b8', 4);
    teksPx(ctx, 'BAWAH 5', x - 27, 194, mana === 1 ? '#ffe9a3' : '#8890b8', 4);
    P(ctx, x - 24, 203, 48, 2, '#7ff2d8');
    teksPx(ctx, '9 di tengah', x - 24, 158, '#6e5236', 4);
  }
  function gambarPapanTepatSembilan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#9a8a60');
    P(ctx, x - 6, 210, 12, 34, '#8a7a54');
    P(ctx, x - 34, 168, 68, 44, '#3e4a58');
    P(ctx, x - 37, 161, 74, 8, '#2e3a46');
    const denyut = 0.6 + 0.4 * Math.sin(t * 2.8);
    ctx.globalAlpha = denyut;
    teksPx(ctx, '9', x - 7, 178, '#ffe9a3', 12);
    ctx.globalAlpha = 1;
    teksPx(ctx, '6,875', x - 31, 200, '#f2b8d8', 4);
    teksPx(ctx, '11,375', x + 5, 200, '#b8e8f2', 4);
  }
  function gambarKurirSepedaGrafik(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9aa0');
    P(ctx, x - 34, 168, 30, 22, '#8a9ab0');
    P(ctx, x - 32, 160, 26, 2, '#5c7aa8');
    for (let i = 0; i < 4; i++) {
      P(ctx, x - 30 + i * 6, 152 + i * 2, 4, 8, '#5c7aa8');
    }
    const putar = t * 5;
    lingkaran(ctx, x - 18, 226, 9, '#4a5460');
    lingkaran(ctx, x - 18, 226, 6, '#8890a0');
    P(ctx, x - 18 + Math.cos(putar) * 6, 226 + Math.sin(putar) * 6, 2, 2, '#e8f0f8');
    lingkaran(ctx, x + 8, 226, 9, '#4a5460');
    lingkaran(ctx, x + 8, 226, 6, '#8890a0');
    P(ctx, x + 8 + Math.cos(putar) * 6, 226 + Math.sin(putar) * 6, 2, 2, '#e8f0f8');
    P(ctx, x - 18, 208, 26, 3, '#6a7480');
    lingkaran(ctx, x - 4, 196, 5, '#f2c8a0');
    P(ctx, x - 12, 190, 10, 6, '#c85050');
  }
  function gambarPapanLajuKotakDua(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9aa0');
    P(ctx, x - 5, 214, 10, 30, '#7a868e');
    P(ctx, x - 34, 168, 68, 48, '#3e4a58');
    P(ctx, x - 37, 161, 74, 8, '#2e3a46');
    P(ctx, x - 28, 176, 40, 6, '#5a6a80');
    for (let i = 0; i < 5; i++) {
      ctx.globalAlpha = 0.35 + 0.25 * Math.sin(t * 2 + i);
      P(ctx, x - 28 + i * 8, 182, 7, 22, '#7ff2d8');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, '2x10', x - 26, 208, '#8890b8', 4);
    teksPx(ctx, '=20', x + 2, 208, '#ffe9a3', 4);
  }
  function gambarLayarGrafikLaju(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9aa0');
    P(ctx, x - 32, 158, 64, 60, '#2a3448');
    P(ctx, x - 28, 162, 56, 52, '#8ac4a8');
    P(ctx, x - 28, 212, 56, 2, '#5c88a8');
    P(ctx, x - 28, 162, 2, 52, '#5c88a8');
    for (let i = 0; i <= 10; i++) {
      const px = i / 10 * 52;
      const py = (i / 10) * 44;
      lingkaran(ctx, x - 26 + px, 212 - py, 2, Math.floor(t * 4) % 11 === i ? '#ffe9a3' : '#3a6858');
    }
    const isiT = 0.5 + 0.35 * Math.sin(t * 2);
    ctx.globalAlpha = isiT;
    for (let j = 0; j < 5; j++) P(ctx, x - 26, 212 - j * 9, 26 + j * 6.5, 5, '#d8f0c0');
    ctx.globalAlpha = 1;
    teksPx(ctx, '0-4', x + 34, 214, '#6a9a80', 4);
  }
  function gambarOdometerBandingJarak(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a9aa0');
    P(ctx, x - 30, 192, 60, 30, '#3e4a58');
    P(ctx, x - 26, 198, 52, 18, '#1e2836');
    for (let i = 0; i < 4; i++) {
      const naik = i === 3 ? Math.floor(t * 2) % 10 : [0, 0, 2][i];
      teksPx(ctx, String(naik), x - 23 + i * 13, 202, i === 3 ? '#ffe9a3' : '#c8d0dc', 6);
    }
    teksPx(ctx, 'METER', x - 12, 226, '#8890b8', 4);
    teksPx(ctx, '20', x - 8, 172, '#7ff2d8', 7);
  }
  function gambarBukuHurufS(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a90');
    P(ctx, x - 32, 190, 64, 30, '#8a6a54');
    P(ctx, x - 32, 188, 31, 4, '#e8e0d0');
    P(ctx, x + 1, 188, 31, 4, '#e8e0d0');
    P(ctx, x - 32, 186, 64, 3, '#6a5240');
    P(ctx, x - 30, 164, 28, 24, '#f4efe4');
    P(ctx, x + 2, 164, 28, 24, '#f4efe4');
    const denyut = 0.55 + 0.35 * Math.sin(t * 2.2);
    ctx.globalAlpha = denyut;
    teksPx(ctx, 'S', x - 22, 168, '#7a5aa8', 11);
    ctx.globalAlpha = 1;
    for (let i = 0; i < 3; i++) P(ctx, x + 5, 168 + i * 6, 18, 1, '#a898c8');
    teksPx(ctx, 'SUMMA', x - 16, 226, '#5a4a6a', 4);
  }
  function gambarPenaBuluhTinta(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a90');
    P(ctx, x - 34, 224, 68, 20, '#6a5240');
    P(ctx, x - 34, 222, 68, 3, '#e8e0d0');
    const panjang = 20 + Math.round((0.5 + 0.5 * Math.sin(t * 1.4)) * 30);
    for (let i = 0; i < panjang; i += 2) {
      P(ctx, x - 30 + i, 216 + Math.round(Math.sin(i * 0.4) * 2), 2, 2, '#4a3a6a');
    }
    P(ctx, x - 32 + panjang, 198, 4, 20, '#c8b890');
    P(ctx, x - 31 + panjang, 194, 2, 5, '#3a2a5a');
    lingkaran(ctx, x - 30 + panjang, 192, 2, '#4a3a6a');
    teksPx(ctx, 'summa', x + 4, 228, '#e8e0d0', 4);
  }
  function gambarGulunganSumma(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a90');
    const buka = 14 + Math.round((0.5 + 0.5 * Math.sin(t * 1.2)) * 24);
    P(ctx, x - buka, 178, buka * 2, 56, '#f0e8d4');
    for (let j = 0; j < 3; j++) P(ctx, x - buka + 8, 188 + j * 12, buka * 2 - 16, 2, '#b8a888');
    P(ctx, x - buka - 4, 174, 6, 64, '#c8b890');
    P(ctx, x + buka - 2, 174, 6, 64, '#c8b890');
    lingkaran(ctx, x - buka - 1, 174, 3, '#d8c8a0');
    lingkaran(ctx, x + buka + 1, 174, 3, '#d8c8a0');
    teksPx(ctx, 'S', x - 6, 192, '#7a5aa8', 12);
  }
  function gambarPapanTahunTinta(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a90');
    P(ctx, x - 5, 212, 10, 32, '#6a5a70');
    P(ctx, x - 34, 170, 68, 44, '#3a3454');
    P(ctx, x - 37, 163, 74, 8, '#2a2644');
    const mana = Math.floor(t * 1.6) % 2;
    teksPx(ctx, '1675', x - 16, 178, mana === 0 ? '#ffe9a3' : '#8890b8', 8);
    teksPx(ctx, 'LEIBNIZ', x - 21, 196, mana === 1 ? '#7ff2d8' : '#8890b8', 4);
    lingkaran(ctx, x + 26, 176, 2.5, '#ffe9a3');
  }
  function gambarAtapTetesanGua(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5a6280');
    P(ctx, x - 36, 140, 72, 12, '#3a4160');
    for (let i = 0; i < 6; i++) {
      P(ctx, x - 32 + i * 12, 152, 6, 8 + (i % 3) * 6, '#2c3350');
      P(ctx, x - 31 + i * 12, 160 + (i % 3) * 6, 4, 4, '#242a44');
    }
    const jatuh = (t * 44) % 60;
    lingkaran(ctx, x - 14, 168 + jatuh, 2, '#a8e8f0');
    lingkaran(ctx, x + 22, 168 + ((jatuh + 30) % 60), 2, '#a8e8f0');
    P(ctx, x - 26, 228, 52, 16, '#2c3350');
    ctx.globalAlpha = 0.5;
    P(ctx, x - 26, 228, 52, 5, '#a8e8f0');
    ctx.globalAlpha = 1;
  }
  function gambarTalangKacaMenetes(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5a6280');
    P(ctx, x - 34, 186, 68, 8, '#88b8c8');
    P(ctx, x - 34, 186, 68, 3, '#c0e0ea');
    P(ctx, x - 30, 194, 60, 3, '#6a98a8');
    const isi = 0.4 + 0.4 * Math.sin(t * 1.6);
    ctx.globalAlpha = 0.7;
    P(ctx, x - 32, 176 + Math.round((1 - isi) * 8), 64, 8, '#a8e8f0');
    ctx.globalAlpha = 1;
    const jatuh = (t * 50) % 26;
    lingkaran(ctx, x - 20, 198 + jatuh, 1.8, '#a8e8f0');
    lingkaran(ctx, x + 14, 198 + ((jatuh + 13) % 26), 1.8, '#a8e8f0');
    teksPx(ctx, '120/mL', x - 16, 164, '#c0e8f0', 4);
  }
  function gambarEmberTetesMelebar(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5a6280');
    P(ctx, x - 22, 188, 44, 56, '#8a6a4a');
    P(ctx, x - 24, 184, 48, 6, '#9a7a56');
    const isi = Math.floor((t * 14) % 48);
    ctx.globalAlpha = 0.8;
    P(ctx, x - 19, 244 - isi, 38, isi, '#5ca8c8');
    ctx.globalAlpha = 1;
    P(ctx, x - 19, 244 - isi, 38, 2, '#a8e8f0');
    const jatuh = (t * 60) % 44;
    lingkaran(ctx, x, 160 + jatuh, 2, '#a8e8f0');
    P(ctx, x - 26, 176, 4, 12, '#6a5240');
    P(ctx, x + 22, 176, 4, 12, '#6a5240');
    teksPx(ctx, '1 L', x + 26, 190, '#c0e8f0', 4);
  }
  function gambarPapanDetikLimaRatus(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#5a6280');
    P(ctx, x - 6, 212, 12, 32, '#4a5268');
    P(ctx, x - 34, 170, 68, 44, '#2e3450');
    P(ctx, x - 37, 163, 74, 8, '#222844');
    const mana = Math.floor(t * 1.8) % 2;
    teksPx(ctx, '500', x - 14, 178, mana === 0 ? '#ffe9a3' : '#8890b8', 8);
    teksPx(ctx, 'DETIK', x - 14, 198, mana === 1 ? '#7ff2d8' : '#8890b8', 4);
    teksPx(ctx, '1000 mL', x - 20, 156, '#a8e8f0', 4);
  }
  function gambarTeraseringTigaTingkat(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a50');
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 34 + i * 22, 244 - 12 - i * 24, 24, 10, '#88ac58');
      P(ctx, x - 34 + i * 22, 240 - i * 24, 24, 4, '#98bc68');
      P(ctx, x - 34 + i * 22, 234 - i * 24, 24, 6, '#8a6a4a');
      const goyang = Math.sin(t * 2 + i) * 1.5;
      P(ctx, x - 26 + i * 22 + goyang, 238 - i * 24, 2, 4, '#d8e8a0');
    }
    lingkaran(ctx, x + 28, 158, 8, '#ffdf9a');
    teksPx(ctx, '3', x - 6, 148, '#6a9a50', 6);
  }
  function gambarGarisRataKuning(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a50');
    P(ctx, x - 34, 152, 68, 92, '#e8dcc0');
    for (let i = 0; i < 10; i++) {
      const px = i / 9 * 60;
      const py = (i / 9) * (i / 9) * 81;
      lingkaran(ctx, x - 34 + px, 244 - py - 3, 2, '#f28ab8');
    }
    for (let i = 0; i < 3; i++) P(ctx, x - 34 + i * 20 + 2, 244 - (i + 1) * 27, 20, (i + 1) * 27, '#b8d8a8');
    const geser = 217 + Math.round((0.5 + 0.5 * Math.sin(t * 1.4)) * 5);
    P(ctx, x - 34, geser, 68, 3, '#e8d060');
    teksPx(ctx, 'RATA 3', x - 20, 160, '#8a7430', 4);
  }
  function gambarPapanLuasSamaRata(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a50');
    P(ctx, x - 34, 172, 30, 40, '#3e4a58');
    P(ctx, x - 32, 210, 26, 3, '#5c88a8');
    for (let i = 0; i < 3; i++) P(ctx, x - 30 + i * 9, 204 - i * 14, 7, 14 + i * 6, '#b8d8a8');
    P(ctx, x + 4, 172, 30, 40, '#3e4a58');
    const denyut = 0.5 + 0.4 * Math.sin(t * 2.4);
    ctx.globalAlpha = denyut;
    P(ctx, x + 7, 198, 24, 14, '#e8d060');
    ctx.globalAlpha = 1;
    teksPx(ctx, '=', x - 2, 186, '#ffe9a3', 8);
    teksPx(ctx, '9', x - 22, 162, '#b8e8a0', 5);
    teksPx(ctx, '9', x + 12, 162, '#ffe9a3', 5);
  }
  function gambarPapanRataTigaKurva(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#8a7a50');
    P(ctx, x - 6, 212, 10, 32, '#7a6a44');
    P(ctx, x - 34, 170, 68, 44, '#3e4a58');
    P(ctx, x - 37, 163, 74, 8, '#665236');
    const mana = Math.floor(t * 2) % 2;
    teksPx(ctx, '3', x - 14, 178, mana === 0 ? '#7ff2d8' : '#8890b8', 8);
    teksPx(ctx, 'BUKAN 4,5', x - 26, 198, mana === 1 ? '#ffe9a3' : '#8890b8', 4);
  }
  function gambarLimaPapanMisiLuas(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a4166');
    for (let i = 0; i < 5; i++) {
      P(ctx, x - 34 + i * 15, 176 - (i % 2) * 4, 12, 30 + (i % 2) * 4, '#3e4466');
      P(ctx, x - 36 + i * 15, 170 - (i % 2) * 4, 16, 7, '#323856');
      const mana = Math.floor(t * 2) % 5;
      ctx.globalAlpha = i === mana ? 0.9 : 0.2;
      lingkaran(ctx, x - 28 + i * 15, 186 - (i % 2) * 4, 2.5, '#d4f28a');
      ctx.globalAlpha = 1;
    }
    teksPx(ctx, 'LIMA MISI', x - 24, 216, '#c8e88a', 4);
  }
  function gambarPapanTantanganLuas(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a4166');
    P(ctx, x - 5, 212, 10, 32, '#323856');
    P(ctx, x - 34, 170, 68, 44, '#3e4466');
    P(ctx, x - 37, 163, 74, 8, '#2e3456');
    const mana = Math.floor(t * 2) % 3;
    teksPx(ctx, '6', x - 26, 182, mana === 0 ? '#d4f28a' : '#8890b8', 7);
    teksPx(ctx, '8', x - 6, 182, mana === 1 ? '#d4f28a' : '#8890b8', 7);
    teksPx(ctx, '9', x + 14, 182, mana === 2 ? '#d4f28a' : '#8890b8', 7);
    teksPx(ctx, 'JUMLAH', x - 20, 200, '#8890b8', 4);
  }
  function gambarPapanLembahSembilan(x, t) {
    P(ctx, x - 40, 244, 80, 3, '#3a4166');
    P(ctx, x - 6, 212, 12, 32, '#323856');
    P(ctx, x - 34, 170, 68, 44, '#3e4466');
    P(ctx, x - 37, 163, 74, 8, '#2e3456');
    const mana = Math.floor(t * 1.8) % 2;
    teksPx(ctx, '20', x - 24, 180, mana === 0 ? '#ffe9a3' : '#8890b8', 7);
    teksPx(ctx, '500', x + 2, 180, mana === 1 ? '#7ff2d8' : '#8890b8', 6);
    teksPx(ctx, 'LAJU & TETES', x - 27, 200, '#8890b8', 3);
  }
  function gambarGerbangJuaraLuas(x, t) {
    const pulsa = 0.45 + 0.3 * Math.sin(t * 2);
    P(ctx, x - 40, 244, 80, 3, '#3a4166');
    P(ctx, x - 34, 148, 14, 96, '#3e4466');
    P(ctx, x + 20, 148, 14, 96, '#3e4466');
    P(ctx, x - 38, 136, 76, 14, '#323856');
    P(ctx, x - 36, 132, 80, 5, '#4a5078');
    ctx.globalAlpha = pulsa;
    P(ctx, x - 17, 158, 34, 86, '#d4f28a');
    ctx.globalAlpha = 1;
    P(ctx, x - 4, 116, 8, 16, '#323856');
    P(ctx, x + 4, 116, 18, 11, '#d4f28a');
    teksPx(ctx, 'JUARA', x - 14, 122, '#c8e88a', 4);
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
    neracaDagang: gambarNeracaDagang, isiMangkukKiri: gambarIsiMangkukKiri, mangkukTujuh: gambarMangkukTujuh, papanKiriKanan: gambarPapanKiriKanan,
    timbanganIkan: gambarTimbanganIkan, tigaIkanDiambil: gambarTigaIkanDiambil, keranjangSendiri: gambarKeranjangSendiri, papanGeserRuas: gambarPapanGeserRuas,
    duaKandangTutup: gambarDuaKandangTutup, sepuluhAyamHitung: gambarSepuluhAyamHitung, kandangDibukaLima: gambarKandangDibukaLima, papanBagiDua: gambarPapanBagiDua,
    nampanDuaTiga: gambarNampanDuaTiga, piringTigaDipindah: gambarPiringTigaDipindah, nampanDibagiDua: gambarNampanDibagiDua, papanDuaLangkah: gambarPapanDuaLangkah,
    jungkatKantong: gambarJungkatKantong, satuKantongDiambil: gambarSatuKantongDiambil, duaBatuDiambil: gambarDuaBatuDiambil, papanKumpulkanX: gambarPapanKumpulkanX,
    lembarJawaban: gambarLembarJawaban, lampuPeriksaKiri: gambarLampuPeriksaKiri, lampuPeriksaKanan: gambarLampuPeriksaKanan, stempelSahih: gambarStempelSahih,
    papanMulutTanda: gambarPapanMulutTanda, buayaTandaLima: gambarBuayaTandaLima, buayaTandaDua: gambarBuayaTandaDua, xLebihTigaKumpul: gambarXLebihTigaKumpul,
    garisLampuTitik: gambarGarisLampuTitik, tiangTigaLubang: gambarTiangTigaLubang, panahMenyalaKanan: gambarPanahMenyalaKanan, papanBanyakJawaban: gambarPapanBanyakJawaban,
    gelasDuaSatuBatu: gambarGelasDuaSatuBatu, papanKurangSembilan: gambarPapanKurangSembilan, esBatuDiambil: gambarEsBatuDiambil, papanXKurangEmpat: gambarPapanXKurangEmpat,
    balaiLimaMisi: gambarBalaiLimaMisi, misiPersamaanDua: gambarMisiPersamaanDua, misiDuaSisi: gambarMisiDuaSisi, misiPertidaksamaan: gambarMisiPertidaksamaan,
    gelasManggaDua: gambarGelasManggaDua, papanDuaTiga: gambarPapanDuaTiga, jusKebalik: gambarJusKebalik, papanUrutanRasio: gambarPapanUrutanRasio,
    mejaPetaGulung: gambarMejaPetaGulung, jengkalTunggal: gambarJengkalTunggal, tigaJengkalJalan: gambarTigaJengkalJalan, papanSkalaSeribu: gambarPapanSkalaSeribu,
    kantongEnamPermen: gambarKantongEnamPermen, notaTigaRibu: gambarNotaTigaRibu, permenLimaRatus: gambarPermenLimaRatus, papanDuaKios: gambarPapanDuaKios,
    kartuResepDuaTiga: gambarKartuResepDuaTiga, mangkokGandaEmpat: gambarMangkokGandaEmpat, duaKueSamaRasa: gambarDuaKueSamaRasa, papanProporsiSetia: gambarPapanProporsiSetia,
    garisStartKelinci: gambarGarisStartKelinci, kelinciEnamPuluh: gambarKelinciEnamPuluh, duaMenitSeratus: gambarDuaMenitSeratus, papanTempoJarak: gambarPapanTempoJarak,
    kotakDelapanDonat: gambarKotakDelapanDonat, susunTigaDariEmpat: gambarSusunTigaDariEmpat, papanTujuhLima: gambarPapanTujuhLima, papanTigaBahasa: gambarPapanTigaBahasa,
    rakMobilMainan: gambarRakMobilMainan, penggarisDuaPuluh: gambarPenggarisDuaPuluh, mobilJadiRaksasa: gambarMobilJadiRaksasa, papanKaliDuaEmpat: gambarPapanKaliDuaEmpat,
    galianEmpatPekerja: gambarGalianEmpatPekerja, galianDelapanPekerja: gambarGalianDelapanPekerja, papanKaliSilang: gambarPapanKaliSilang, papanBerbalikNilai: gambarPapanBerbalikNilai,
    bukuResepWarung: gambarBukuResepWarung, delapanTamuDatang: gambarDelapanTamuDatang, semuaIkutGanda: gambarSemuaIkutGanda, papanTakaranUtuh: gambarPapanTakaranUtuh,
    petaKarunTerkunci: gambarPetaKarunTerkunci, misiRasioSkala: gambarMisiRasioSkala, misiHargaPersen: gambarMisiHargaPersen, misiBerbalikPeta: gambarMisiBerbalikPeta,
    gerbangTerbukaSiku: gambarGerbangTerbukaSiku, sikuKayuTukang: gambarSikuKayuTukang, pembukaLancipTumpul: gambarPembukaLancipTumpul, papanJenisSudut: gambarPapanJenisSudut,
    dekJembatanLurus: gambarDekJembatanLurus, duaSudutBerbagi: gambarDuaSudutBerbagi, sudutSeratusSepuluh: gambarSudutSeratusSepuluh, papanSelaluBerdua: gambarPapanSelaluBerdua,
    kincirPenuh: gambarKincirPenuh, empatSudutBertemu: gambarEmpatSudutBertemu, sudutSisaKincir: gambarSudutSisaKincir, papanPutaranPenuh: gambarPapanPutaranPenuh,
    segitigaKertasTiga: gambarSegitigaKertasTiga, robekTigaSudut: gambarRobekTigaSudut, tempelJadiGaris: gambarTempelJadiGaris, papanBuktiRobek: gambarPapanBuktiRobek,
    jendelaEmpatSiku: gambarJendelaEmpatSiku, duaSegitigaSahabat: gambarDuaSegitigaSahabat, gabungSegiempat: gambarGabungSegiempat, papanDuaKaliSeratus: gambarPapanDuaKaliSeratus,
    relSejajarKereta: gambarRelSejajarKereta, garisMiringTerpotong: gambarGarisMiringTerpotong, sudutZBerpasangan: gambarSudutZBerpasangan, papanPolaSejajar: gambarPapanPolaSejajar,
    segitigaUbinSiku: gambarSegitigaUbinSiku, kotakSembilanAlas: gambarKotakSembilanAlas, kotakEnamBelasTinggi: gambarKotakEnamBelasTinggi, kotakDuaLimaMiring: gambarKotakDuaLimaMiring,
    mejaGoyangEmpat: gambarMejaGoyangEmpat, palangDiagonal: gambarPalangDiagonal, mejaKokohSiku: gambarMejaKokohSiku, papanTigaEmpatLima: gambarPapanTigaEmpatLima,
    tanggaSandingDinding: gambarTanggaSandingDinding, jarakEnamLangkah: gambarJarakEnamLangkah, tinggiDelapanPuncak: gambarTinggiDelapanPuncak, papanSisiHilang: gambarPapanSisiHilang,
    arenaMisiGeometri: gambarArenaMisiGeometri, misiBukaanSudut: gambarMisiBukaanSudut, misiSegitigaPutaran: gambarMisiSegitigaPutaran, misiPythagorasHutan: gambarMisiPythagorasHutan,
    kotakKadoKubus: gambarKotakKadoKubus, kartuPersegiEnam: gambarKartuPersegiEnam, kubusSusunIsi: gambarKubusSusunIsi, papanKubusJurus: gambarPapanKubusJurus,
    kardusBalokUtuh: gambarKardusBalokUtuh, jaringBalokRata: gambarJaringBalokRata, pasangKembarTiga: gambarPasangKembarTiga, papanJumlahEnamSisi: gambarPapanJumlahEnamSisi,
    laciKosongEnamEmpat: gambarLaciKosongEnamEmpat, kubusSusuSusun: gambarKubusSusuSusun, susunDuaLapis: gambarSusunDuaLapis, papanPanjangLebarTinggi: gambarPapanPanjangLebarTinggi,
    rumahAtapPrisma: gambarRumahAtapPrisma, kartuSegitigaAlas: gambarKartuSegitigaAlas, geserSegitigaAtap: gambarGeserSegitigaAtap, papanLuasKaliPanjang: gambarPapanLuasKaliPanjang,
    kalengSusuRak: gambarKalengSusuRak, duaTutupBundar: gambarDuaTutupBundar, benangKelilingEmpat: gambarBenangKelilingEmpat, labelTerbentang: gambarLabelTerbentang,
    kertasGulungSelimut: gambarKertasGulungSelimut, gulungDiBotol: gambarGulungDiBotol, papanKelilingTinggi: gambarPapanKelilingTinggi, hitungSelimutEmpat: gambarHitungSelimutEmpat,
    topiKerucutPasir: gambarTopiKerucutPasir, tabungPasirSama: gambarTabungPasirSama, tuangTigaCangkir: gambarTuangTigaCangkir, bolaSepakTaman: gambarBolaSepakTaman,
    kubusSepuluhSepuluh: gambarKubusSepuluhSepuluh, botolLiterSatu: gambarBotolLiterSatu, gelasBagiEmpat: gambarGelasBagiEmpat, papanLiterKubik: gambarPapanLiterKubik,
    akuariumTokoSore: gambarAkuariumTokoSore, ukurAkuariumTigaSisi: gambarUkurAkuariumTigaSisi, emberDuaPuluh: gambarEmberDuaPuluh, botolSatuSetengah: gambarBotolSatuSetengah,
    gudangKardusMalam: gambarGudangKardusMalam, misiKardusTigaUkuran: gambarMisiKardusTigaUkuran, misiKubusMuatKardus: gambarMisiKubusMuatKardus, misiTangkiDanKado: gambarMisiTangkiDanKado,
    patokNolPersimpangan: gambarPatokNolPersimpangan, papanSumbuDuaArah: gambarPapanSumbuDuaArah, rumahTitikPertama: gambarRumahTitikPertama, papanJalanBertemu: gambarPapanJalanBertemu,
    lantaiKotakHalaman: gambarLantaiKotakHalaman, langkahTigaDua: gambarLangkahTigaDua, titikTertukarDuaTiga: gambarTitikTertukarDuaTiga, papanXpuluhanY: gambarPapanXpuluhanY,
    alunAlunDuaJalan: gambarAlunAlunDuaJalan, lampuEmpatPojok: gambarLampuEmpatPojok, kiosDaerahSatu: gambarKiosDaerahSatu, papanTandaKuadran: gambarPapanTandaKuadran,
    papanHitamGaleri: gambarPapanHitamGaleri, kartuAlamatDuaLima: gambarKartuAlamatDuaLima, kartuMinusTigaEmpat: gambarKartuMinusTigaEmpat, kartuNolMinusDua: gambarKartuNolMinusDua,
    tabelXyArsip: gambarTabelXyArsip, pakuTigaTitik: gambarPakuTigaTitik, benangTertarikLurus: gambarBenangTertarikLurus, papanGarisLahir: gambarPapanGarisLahir,
    tanggaCuramNaikDua: gambarTanggaCuramNaikDua, tanggaLandaiNaikSatu: gambarTanggaLandaiNaikSatu, pendakiDuaJalan: gambarPendakiDuaJalan, papanKemiringanDua: gambarPapanKemiringanDua,
    papanWaktuJarakPos: gambarPapanWaktuJarakPos, garisDatarBerhenti: gambarGarisDatarBerhenti, garisMiringMelaju: gambarGarisMiringMelaju, papanCeritaPerjalanan: gambarPapanCeritaPerjalanan,
    gerbangSumbuYSenja: gambarGerbangSumbuYSenja, titikAwalNolEmpat: gambarTitikAwalNolEmpat, garisLewatGerbang: gambarGarisLewatGerbang, papanRumahAwal: gambarPapanRumahAwal,
    taliGridTaman: gambarTaliGridTaman, petaTamanKertas: gambarPetaTamanKertas, benderaXMerah: gambarBenderaXMerah, petiHartaTeralamat: gambarPetiHartaTeralamat,
    menaraSinyalLima: gambarMenaraSinyalLima, misiTandaiEmpatDua: gambarMisiTandaiEmpatDua, misiKuadranSinyal: gambarMisiKuadranSinyal, misiGarisTabelAkhir: gambarMisiGarisTabelAkhir,
    kandangBurungPagi: gambarKandangBurungPagi, papanCatatTujuhHari: gambarPapanCatatTujuhHari, barisanAngkaKunjungan: gambarBarisanAngkaKunjungan, papanPertanyaanSama: gambarPapanPertanyaanSama,
    gelasTigaBedatinggi: gambarGelasTigaBedatinggi, tekoTampungSemua: gambarTekoTampungSemua, gelasTigaRataEmpat: gambarGelasTigaRataEmpat, papanCaraMean: gambarPapanCaraMean,
    batuLimaBersusun: gambarBatuLimaBersusun, batuKetigaTengah: gambarBatuKetigaTengah, ujungPergiTengahTetap: gambarUjungPergiTengahTetap, papanMedianAman: gambarPapanMedianAman,
    rakSandalSembilan: gambarRakSandalSembilan, sandalMerahTumpuk: gambarSandalMerahTumpuk, duaWarnaSisa: gambarDuaWarnaSisa, papanModusJawara: gambarPapanModusJawara,
    tongkatPanenTiga: gambarTongkatPanenTiga, batangPisangSembilan: gambarBatangPisangSembilan, batangJambuTerpendek: gambarBatangJambuTerpendek, papanBacaSekali: gambarPapanBacaSekali,
    kertasSuhuLimaTitik: gambarKertasSuhuLimaTitik, garisSuhuNaik: gambarGarisSuhuNaik, garisSuhuTurun: gambarGarisSuhuTurun, papanDenyutData: gambarPapanDenyutData,
    kueBulatPestaMalam: gambarKueBulatPestaMalam, irisanCoklatEmpat: gambarIrisanCoklatEmpat, irisanStroberiVanila: gambarIrisanStroberiVanila, papanPenuhSeratus: gambarPapanPenuhSeratus,
    geraiBuahPagi: gambarGeraiBuahPagi, rakBarisKolom: gambarRakBarisKolom, papanTabelPanen: gambarPapanTabelPanen, papanBacaJudulDulu: gambarPapanBacaJudulDulu,
    ladangKompakTujuh: gambarLadangKompakTujuh, ladangMenyebarTujuh: gambarLadangMenyebarTujuh, garisUkurRentang: gambarGarisUkurRentang, papanRataSamaBeda: gambarPapanRataSamaBeda,
    balaiRisetLentera: gambarBalaiRisetLentera, papanDataLimaHari: gambarPapanDataLimaHari, misiTotalMeanEnam: gambarMisiTotalMeanEnam, misiMedianModus: gambarMisiMedianModus, misiRentangTujuh: gambarMisiRentangTujuh,
    gerbangGarisNolSatu: gambarGerbangGarisNolSatu, penandaMustahil: gambarPenandaMustahil, penandaPasti: gambarPenandaPasti, duniaDiAntara: gambarDuniaDiAntara,
    koinLemparKapten: gambarKoinLemparKapten, sisiAngkaGambar: gambarSisiAngkaGambar, papanAdilDua: gambarPapanAdilDua, duaTimSetara: gambarDuaTimSetara,
    papanUlarTangga: gambarPapanUlarTangga, daduEnamSisi: gambarDaduEnamSisi, enamKemungkinan: gambarEnamKemungkinan, papanMainAdil: gambarPapanMainAdil,
    matahariTimurPasti: gambarMatahariTimurPasti, koinBerdiriSulit: gambarKoinBerdiriSulit, garisDuaUjung: gambarGarisDuaUjung, papanAntaranya: gambarPapanAntaranya,
    rodaPutarFestival: gambarRodaPutarFestival, irisanMerahLebar: gambarIrisanMerahLebar, irisanBiruSempit: gambarIrisanBiruSempit, papanLuasIrisan: gambarPapanLuasIrisan,
    kantongKelerengEmpat: gambarKantongKelerengEmpat, kelerengMerahTiga: gambarKelerengMerahTiga, kelerengBiruSatu: gambarKelerengBiruSatu, papanTigaPerEmpat: gambarPapanTigaPerEmpat,
    papanSemuaPecahan: gambarPapanSemuaPecahan, kelerengEnamIsi: gambarKelerengEnamIsi, jumlahSelaluSatu: gambarJumlahSelaluSatu, koinSetengahSetengah: gambarKoinSetengahSetengah,
    duaKoinLempar: gambarDuaKoinLempar, daftarEmpatHasil: gambarDaftarEmpatHasil, hasilCampurDua: gambarHasilCampurDua, papanDaftarDulu: gambarPapanDaftarDulu,
    langitAwanGelap: gambarLangitAwanGelap, sepuluhLangitLalu: gambarSepuluhLangitLalu, payungSiapSedia: gambarPayungSiapSedia, papanBacaTanda: gambarPapanBacaTanda,
    balaiJuaraPeluang: gambarBalaiJuaraPeluang, misiKoinDua: gambarMisiKoinDua, misiRodaBiru: gambarMisiRodaBiru, misiKelerengLima: gambarMisiKelerengLima, misiDuaKoinSeperempat: gambarMisiDuaKoinSeperempat,

    mesinKotakEmas: gambarMesinKotakEmas, corongMasukAngka: gambarCorongMasukAngka, mulutKeluarEnam: gambarMulutKeluarEnam, papanMesinTetap: gambarPapanMesinTetap,
    mejaPercobaanPintar: gambarMejaPercobaanPintar, kartuMasukX: gambarKartuMasukX, kartuKeluarFx: gambarKartuKeluarFx, papanBukanKali: gambarPapanBukanKali,
    mesinGandakanDua: gambarMesinGandakanDua, tigaMasukEnamKeluar: gambarTigaMasukEnamKeluar, deretKeluaranTali: gambarDeretKeluaranTali, papanAturanTetap: gambarPapanAturanTetap,
    mejaTabelDuaKolom: gambarMejaTabelDuaKolom, pasanganSatuTiga: gambarPasanganSatuTiga, pasanganDuaLima: gambarPasanganDuaLima, papanSatuTeman: gambarPapanSatuTeman,
    kisiTaliLapangan: gambarKisiTaliLapangan, patokTitikDuaEmpat: gambarPatokTitikDuaEmpat, tigaPatokMesin: gambarTigaPatokMesin, papanSatuAlamat: gambarPapanSatuAlamat,
    jalanMenanjakLurus: gambarJalanMenanjakLurus, titikBerbarisRapi: gambarTitikBerbarisRapi, taliSambungGaris: gambarTaliSambungGaris, papanGarisLurus: gambarPapanGarisLurus,
    jembatanNaikTurun: gambarJembatanNaikTurun, panahMenanjakKanan: gambarPanahMenanjakKanan, panahMenurunKanan: gambarPanahMenurunKanan, papanGrafikArah: gambarPapanGrafikArah,
    bolaLemparMelengkung: gambarBolaLemparMelengkung, jejakLengkungKertas: gambarJejakLengkungKertas, lengkungCerminKanan: gambarLengkungCerminKanan, papanSimetriParabola: gambarPapanSimetriParabola,
    papanGrafikEmber: gambarPapanGrafikEmber, garisNaikKran: gambarGarisNaikKran, garisDatarPenuh: gambarGarisDatarPenuh, papanBacaCerita: gambarPapanBacaCerita,
    limaLampuMisiMesin: gambarLimaLampuMisiMesin, mesinTekaAturan: gambarMesinTekaAturan, papanTabelTeka: gambarPapanTabelTeka, gerbangJuaraLembah: gambarGerbangJuaraLembah,

    batuBarisEnam: gambarBatuBarisEnam, papanJarakSama: gambarPapanJarakSama, jejakLangkahTetap: gambarJejakLangkahTetap, papanRahasiaBarisan: gambarPapanRahasiaBarisan,
    tanggaTambahTiga: gambarTanggaTambahTiga, papanBedaTetap: gambarPapanBedaTetap, batuSukuBerikut: gambarBatuSukuBerikut, papanCekDuaKali: gambarPapanCekDuaKali,
    bijiGandakan: gambarBijiGandakan, tumpukBijiLima: gambarTumpukBijiLima, papanLedakanDua: gambarPapanLedakanDua, papanSukuKesepuluh: gambarPapanSukuKesepuluh,
    papanTigaNPlusSatu: gambarPapanTigaNPlusSatu, lompatanRumusCepat: gambarLompatanRumusCepat, lampuSukuSeratus: gambarLampuSukuSeratus, papanTanpaHitungSatu: gambarPapanTanpaHitungSatu,
    apiUnggunCerita: gambarApiUnggunCerita, kartuPasanganSatuSeratus: gambarKartuPasanganSatuSeratus, papanLimaPuluhPasang: gambarPapanLimaPuluhPasang, papanHasilLimaNolLima: gambarPapanHasilLimaNolLima,
    kotakBijiBaris: gambarKotakBijiBaris, papanSatuKurang: gambarPapanSatuKurang, gandakanTumpukDua: gambarGandakanTumpukDua, papanRahasiaDuaKali: gambarPapanRahasiaDuaKali,
    kursiSusunSegitiga: gambarKursiSusunSegitiga, barisKursiBawah: gambarBarisKursiBawah, papanTambahBarisBaru: gambarPapanTambahBarisBaru, papanSepuluhKursi: gambarPapanSepuluhKursi,
    petakSatuSatu: gambarPetakSatuSatu, petakDuaDua: gambarPetakDuaDua, petakTigaTiga: gambarPetakTigaTiga, papanSisiKaliSisi: gambarPapanSisiKaliSisi,
    bungaKelopakLima: gambarBungaKelopakLima, papanNadaBerulang: gambarPapanNadaBerulang, kalenderKabisatEmpat: gambarKalenderKabisatEmpat, papanPolaSembunyi: gambarPapanPolaSembunyi,
    limaApiMisiPuncak: gambarLimaApiMisiPuncak, tekaBarisanPuncak: gambarTekaBarisanPuncak, papanSukuKeSeratus: gambarPapanSukuKeSeratus, gerbangPuncakPola: gambarGerbangPuncakPola,

    mesinPangkatTiga: gambarMesinPangkatTiga, papanTulisKaliUlang: gambarPapanTulisKaliUlang, kartuPangkatKecil: gambarKartuPangkatKecil, rakHasilDelapan: gambarRakHasilDelapan,
    kertasLipatPertama: gambarKertasLipatPertama, tumpukanLipatDelapan: gambarTumpukanLipatDelapan, penggarisTebalTumpuk: gambarPenggarisTebalTumpuk, papanJalanKeBulan: gambarPapanJalanKeBulan,
    petakRumputTigaTiga: gambarPetakRumputTigaTiga, kotakKayuKubik: gambarKotakKayuKubik, papanLuasDanIsi: gambarPapanLuasDanIsi, patungBentukSaudara: gambarPatungBentukSaudara,
    gerbangRumahEmpatSembilan: gambarGerbangRumahEmpatSembilan, jalanLangkahTujuh: gambarJalanLangkahTujuh, papanAkarJalanBalik: gambarPapanAkarJalanBalik, lampuPulangPasangan: gambarLampuPulangPasangan,
    papanKasusDelapan: gambarPapanKasusDelapan, kartuSaksiDuaEmpat: gambarKartuSaksiDuaEmpat, lampuJawabanTiga: gambarLampuJawabanTiga, mejaBerkasLog: gambarMejaBerkasLog,
    anakTanggaNaikPangkat: gambarAnakTanggaNaikPangkat, anakTanggaTurunBagi: gambarAnakTanggaTurunBagi, pijakanNolSatu: gambarPijakanNolSatu, papanLanjutTurunSetengah: gambarPapanLanjutTurunSetengah,
    cawanKoloniSatu: gambarCawanKoloniSatu, cawanKoloniEmpat: gambarCawanKoloniEmpat, papanJamGandakan: gambarPapanJamGandakan, papanDenyutSetia: gambarPapanDenyutSetia,
    bolaKaretDilepas: gambarBolaKaretDilepas, garisPantulanLimaPuluh: gambarGarisPantulanLimaPuluh, papanTinggiMenurun: gambarPapanTinggiMenurun, papanKecilTeratur: gambarPapanKecilTeratur,
    teleskopArahLangit: gambarTeleskopArahLangit, papanBintangPuluhDua: gambarPapanBintangPuluhDua, penggarisRambutMini: gambarPenggarisRambutMini, bukuTulisPangkat: gambarBukuTulisPangkat,
    limaTanggaMisiPangkat: gambarLimaTanggaMisiPangkat, papanMisiDuaLima: gambarPapanMisiDuaLima, papanMisiTigaEmpat: gambarPapanMisiTigaEmpat, gerbangJuaraTangga: gambarGerbangJuaraTangga,
    papanSkorGunung: gambarPapanSkorGunung, kotakAngkaBabak: gambarKotakAngkaBabak, garisBarisKolom: gambarGarisBarisKolom, lencanaTertataRapi: gambarLencanaTertataRapi,
    lorongPenginapanGunung: gambarLorongPenginapanGunung, pintuKamarLantaiDua: gambarPintuKamarLantaiDua, papanUrutanAlamat: gambarPapanUrutanAlamat, kunciTukarAlamat: gambarKunciTukarAlamat,
    duaPiringKueSejawat: gambarDuaPiringKueSejawat, piringHasilSejawat: gambarPiringHasilSejawat, kotakUkuranBeda: gambarKotakUkuranBeda, papanAturanSejawat: gambarPapanAturanSejawat,
    papanResepSatuPorsi: gambarPapanResepSatuPorsi, resepDigandakanDua: gambarResepDigandakanDua, timbanganBahanDobel: gambarTimbanganBahanDobel, nampanKueDuaPorsi: gambarNampanKueDuaPorsi,
    barisAnakKiri: gambarBarisAnakKiri, kolomAnakKanan: gambarKolomAnakKanan, kartuHasilSembilanBelas: gambarKartuHasilSembilanBelas, papanArahBerbeda: gambarPapanArahBerbeda,
    berandaDuaBangku: gambarBerandaDuaBangku, papanJumlahTujuh: gambarPapanJumlahTujuh, papanSelisihSatu: gambarPapanSelisihSatu, kueAngkaEmpatTiga: gambarKueAngkaEmpatTiga,
    jalanTanjakDuaX: gambarJalanTanjakDuaX, jalanTanggaPlusDua: gambarJalanTanggaPlusDua, tiangTitikTemuDuaEmpat: gambarTiangTitikTemuDuaEmpat, duaJalanSejajarJauh: gambarDuaJalanSejajarJauh,
    papanRaporKelasKecil: gambarPapanRaporKelasKecil, kotakNilaiTigaAnak: gambarKotakNilaiTigaAnak, kartuAlamatNilaiSembilan: gambarKartuAlamatNilaiSembilan, papanJumlahKolom: gambarPapanJumlahKolom,
    tigaKotakHadiahAbc: gambarTigaKotakHadiahAbc, timbanganPasanganKotak: gambarTimbanganPasanganKotak, papanTrikJumlahSemua: gambarPapanTrikJumlahSemua, lampuIsiTigaKotak: gambarLampuIsiTigaKotak,
    limaPapanMisiAngka: gambarLimaPapanMisiAngka, papanMisiAlamatJumlah: gambarPapanMisiAlamatJumlah, papanMisiSapaSistem: gambarPapanMisiSapaSistem, gerbangJuaraPapanAngka: gambarGerbangJuaraPapanAngka,
    gerbangSegitigaRaksasa: gambarGerbangSegitigaRaksasa, dindingTegakLantai: gambarDindingTegakLantai, jalanPintasMiring: gambarJalanPintasMiring, papanNamaSisi: gambarPapanNamaSisi,
    lorongTigaTangga: gambarLorongTigaTangga, papanNaikMaju: gambarPapanNaikMaju, tanggaPembagiCuram: gambarTanggaPembagiCuram, gelangCuramAman: gambarGelangCuramAman,
    menaraTanggaSenja: gambarMenaraTanggaSenja, kartuSinusEmpatLima: gambarKartuSinusEmpatLima, kartuCosinusTigaLima: gambarKartuCosinusTigaLima, papanKuadratSatu: gambarPapanKuadratSatu,
    duaMenaraBanding: gambarDuaMenaraBanding, papanRasioSetia: gambarPapanRasioSetia, tigaUkuranSebaris: gambarTigaUkuranSebaris, kunciSebangun: gambarKunciSebangun,
    tongkatBayangan: gambarTongkatBayangan, pohonBayanganDuaBelas: gambarPohonBayanganDuaBelas, papanPerbandinganBayang: gambarPapanPerbandinganBayang, buktiMemukulSama: gambarBuktiMemukulSama,
    ayunanTamanBunga: gambarAyunanTamanBunga, taliNaikTurun: gambarTaliNaikTurun, kertasGrafikAyunan: gambarKertasGrafikAyunan, jamAyunanSetia: gambarJamAyunanSetia,
    rodaRaksasaMalam: gambarRodaRaksasaMalam, lampuTepiRoda: gambarLampuTepiRoda, papanTinggiLampu: gambarPapanTinggiLampu, kabinTurunNaik: gambarKabinTurunNaik,
    tigaGerbangSudut: gambarTigaGerbangSudut, gerbangKembarEmpatLima: gambarGerbangKembarEmpatLima, gerbangSetengahTigaPuluh: gambarGerbangSetengahTigaPuluh, gerbangEnamPuluhTinggi: gambarGerbangEnamPuluhTinggi,
    kolamRiakBulan: gambarKolamRiakBulan, kerikilJatuhTengah: gambarKerikilJatuhTengah, puncakKePuncakEmpat: gambarPuncakKePuncakEmpat, lembahRiakSetia: gambarLembahRiakSetia,
    menaraPengukurMalam: gambarMenaraPengukurMalam, papanMisiSisiTangga: gambarPapanMisiSisiTangga, papanMisiBayangMenara: gambarPapanMisiBayangMenara, limaPapanMisiJauh: gambarLimaPapanMisiJauh,
    duaPanahBerlawanan: gambarDuaPanahBerlawanan, papanBesarArah: gambarPapanBesarArah, patokJarakSepuluh: gambarPatokJarakSepuluh, gerbangArahVektor: gambarGerbangArahVektor,
    jalanZigzagSekolah: gambarJalanZigzagSekolah, panahLurusTikus: gambarPanahLurusTikus, segitigaJalanSiku: gambarSegitigaJalanSiku, papanPetunjukPanah: gambarPapanPetunjukPanah,
    duaPanahBerturut: gambarDuaPanahBerturut, panahJumlahTunggal: gambarPanahJumlahTunggal, jalurMundurSambung: gambarJalurMundurSambung, papanUjungKeUjung: gambarPapanUjungKeUjung,
    panahKembarSejajar: gambarPanahKembarSejajar, panahLawanBerbalik: gambarPanahLawanBerbalik, patokKembaliNol: gambarPatokKembaliNol, papanAngkaMinus: gambarPapanAngkaMinus,
    kisiTaliHalaman: gambarKisiTaliHalaman, kartuVektorTigaDua: gambarKartuVektorTigaDua, kartuVektorDuaTiga: gambarKartuVektorDuaTiga, papanUrutanPenting: gambarPapanUrutanPenting,
    perahuTepiDermaga: gambarPerahuTepiDermaga, panahArusDeras: gambarPanahArusDeras, pantaiMendaratMiring: gambarPantaiMendaratMiring, papanHitungPaduan: gambarPapanHitungPaduan,
    petaKotaDariAtas: gambarPetaKotaDariAtas, menaraTigaLantai: gambarMenaraTigaLantai, kartuAlamatTigaAngka: gambarKartuAlamatTigaAngka, burungTerbangAlamat: gambarBurungTerbangAlamat,
    tanggaTigaArahMenara: gambarTanggaTigaArahMenara, liftMenaraTegak: gambarLiftMenaraTegak, papanJarakMiringTiga: gambarPapanJarakMiringTiga, lintasanTerbangLurus: gambarLintasanTerbangLurus,
    susunKubusMeja: gambarSusunKubusMeja, fotoDepanBentukL: gambarFotoDepanBentukL, fotoAtasBentukSudut: gambarFotoAtasBentukSudut, fotoSampingBentukSudut: gambarFotoSampingBentukSudut,
    limaPapanMisiPanah: gambarLimaPapanMisiPanah, papanMisiPanahArah: gambarPapanMisiPanahArah, papanMisiPanahSambung: gambarPapanMisiPanahSambung, gerbangJuaraLintas: gambarGerbangJuaraLintas,
    tembokCahayaSetengah: gambarTembokCahayaSetengah, papanJejakLangkah: gambarPapanJejakLangkah, kertasSisaJarang: gambarKertasSisaJarang, garisLantaiTotal: gambarGarisLantaiTotal,
    tonggakSatuCahaya: gambarTonggakSatuCahaya, tigaPapanSembilan: gambarTigaPapanSembilan, papanJarakMengecil: gambarPapanJarakMengecil, lorongMenujuSatu: gambarLorongMenujuSatu,
    keretaMenujuPeron: gambarKeretaMenujuPeron, papanJadwalDuaArah: gambarPapanJadwalDuaArah, titikSepakatTiga: gambarTitikSepakatTiga, pintuArahCukup: gambarPintuArahCukup,
    kurvaBatuKebun: gambarKurvaBatuKebun, papanNilaiKebalikan: gambarPapanNilaiKebalikan, pagarAsimtot: gambarPagarAsimtot, bungaDuaSisiPagar: gambarBungaDuaSisiPagar,
    taliSatuMeter: gambarTaliSatuMeter, guntingEmpatPotong: gambarGuntingEmpatPotong, mistarTotalSatu: gambarMistarTotalSatu, gulunganBenangHalus: gambarGulunganBenangHalus,
    tanggaDuaAnak: gambarTanggaDuaAnak, tanggaEmpatAnak: gambarTanggaEmpatAnak, lerengMulusBatu: gambarLerengMulusBatu, gerbangKalkulusBukit: gambarGerbangKalkulusBukit,
    lintasanRobotPelari: gambarLintasanRobotPelari, papanJendelaDetik: gambarPapanJendelaDetik, stopwatchKilas: gambarStopwatchKilas, papanLajuSesaat: gambarPapanLajuSesaat,
    telagaBijiPertama: gambarTelagaBijiPertama, papanPembagiRaksasa: gambarPapanPembagiRaksasa, bijiSerbukHalus: gambarBijiSerbukHalus, permukaanAirTenang: gambarPermukaanAirTenang,
    rodaSegiEnam: gambarRodaSegiEnam, rodaSegiDuaBelas: gambarRodaSegiDuaBelas, papanKelilingPoligon: gambarPapanKelilingPoligon, rodaLingkaranSempurna: gambarRodaLingkaranSempurna,
    limaPapanMisiMenuju: gambarLimaPapanMisiMenuju, papanMisiLangkahSembilan: gambarPapanMisiLangkahSembilan, papanMisiPembagiAsimtot: gambarPapanMisiPembagiAsimtot, gerbangJuaraMenuju: gambarGerbangJuaraMenuju,
    keranBergantiDeras: gambarKeranBergantiDeras, gelasPengukurAir: gambarGelasPengukurAir, papanLajuTigaSaat: gambarPapanLajuTigaSaat, jamDetikTaman: gambarJamDetikTaman,
    papanKilometerEnam: gambarPapanKilometerEnam, speedometerBergetar: gambarSpeedometerBergetar, duaMobilRata: gambarDuaMobilRata, jamPerjalananSatu: gambarJamPerjalananSatu,
    kurvaBukitHijau: gambarKurvaBukitHijau, penggarisMenempel: gambarPenggarisMenempel, titikTapakCahaya: gambarTitikTapakCahaya, papanKemiringanSatu: gambarPapanKemiringanSatu,
    mesinPangkatTurun: gambarMesinPangkatTurun, bolaKuadratLompat: gambarBolaKuadratLompat, rodaGigiGanjil: gambarRodaGigiGanjil, papanAturanPangkat: gambarPapanAturanPangkat,
    panahNaikHijau: gambarPanahNaikHijau, papanBerhentiSesaat: gambarPapanBerhentiSesaat, panahTurunMerah: gambarPanahTurunMerah, jalanBergelombang: gambarJalanBergelombang,
    airMancurMelengkung: gambarAirMancurMelengkung, papanTinggiEmpat: gambarPapanTinggiEmpat, titikPuncakKilau: gambarTitikPuncakKilau, kolamCipratan: gambarKolamCipratan,
    tanggaTigaAnakLaju: gambarTanggaTigaAnakLaju, papanJarakBola: gambarPapanJarakBola, papanLajuNaikDua: gambarPapanLajuNaikDua, papanPercepatanDua: gambarPapanPercepatanDua,
    kurvaSenyumRaksasa: gambarKurvaSenyumRaksasa, papanLembahNol: gambarPapanLembahNol, titikTerendahKilau: gambarTitikTerendahKilau, burungLingkarLembah: gambarBurungLingkarLembah,
    motorSoreKencang: gambarMotorSoreKencang, speedometerNaikTetap: gambarSpeedometerNaikTetap, papanDetikLima: gambarPapanDetikLima, jalanDesaMelengkung: gambarJalanDesaMelengkung,
    papanUbinDuaBelas: gambarPapanUbinDuaBelas, tumpukanUbinTiga: gambarTumpukanUbinTiga, papanTigaSusun: gambarPapanTigaSusun, gerbangJumlahKotak: gambarGerbangJumlahKotak,
    segitigaKotakPetak: gambarSegitigaKotakPetak, kotakKacaSetengah: gambarKotakKacaSetengah, papanEnamSetengah: gambarPapanEnamSetengah, penggarisLuasDelapan: gambarPenggarisLuasDelapan,
    mesinIrisKertas: gambarMesinIrisKertas, duaPapanTepiKiriKanan: gambarDuaPapanTepiKiriKanan, papanKisaranDelapan: gambarPapanKisaranDelapan, timbanganDuaSisiIris: gambarTimbanganDuaSisiIris,
    pintuDuaArahLorong: gambarPintuDuaArahLorong, papanLajuLima: gambarPapanLajuLima, papanJarakDuaPuluh: gambarPapanJarakDuaPuluh, cerminTurunanBalik: gambarCerminTurunanBalik,
    lengkungBatuSembilan: gambarLengkungBatuSembilan, kotakTanggaBatuKurva: gambarKotakTanggaBatuKurva, papanLimaEmpatBelas: gambarPapanLimaEmpatBelas, papanTepatSembilan: gambarPapanTepatSembilan,
    kurirSepedaGrafik: gambarKurirSepedaGrafik, papanLajuKotakDua: gambarPapanLajuKotakDua, layarGrafikLaju: gambarLayarGrafikLaju, odometerBandingJarak: gambarOdometerBandingJarak,
    bukuHurufS: gambarBukuHurufS, penaBuluhTinta: gambarPenaBuluhTinta, gulunganSumma: gambarGulunganSumma, papanTahunTinta: gambarPapanTahunTinta,
    atapTetesanGua: gambarAtapTetesanGua, talangKacaMenetes: gambarTalangKacaMenetes, emberTetesMelebar: gambarEmberTetesMelebar, papanDetikLimaRatus: gambarPapanDetikLimaRatus,
    teraseringTigaTingkat: gambarTeraseringTigaTingkat, garisRataKuning: gambarGarisRataKuning, papanLuasSamaRata: gambarPapanLuasSamaRata, papanRataTigaKurva: gambarPapanRataTigaKurva,
    limaPapanMisiLuas: gambarLimaPapanMisiLuas, papanTantanganLuas: gambarPapanTantanganLuas, papanLembahSembilan: gambarPapanLembahSembilan, gerbangJuaraLuas: gambarGerbangJuaraLuas,
    kompasKemiringan: gambarKompasKemiringan, limaPapanMisiLereng: gambarLimaPapanMisiLereng, papanPuncakLembah: gambarPapanPuncakLembah, gerbangJuaraLereng: gambarGerbangJuaraLereng,
  };

  function gambarStasiun(st, t) {
    const lewat = stasiun.indexOf(st) < aktif;
    if (stasiun.indexOf(st) === aktif) {
      gambarCahaya(st.x, GROUND - 10, 16, kat.color, t);
      const ay = 168 + Math.round(Math.sin(t * 3) * 2);
      P(ctx, st.x - 1, ay, 3, 4, '#fffdf2');
      P(ctx, st.x - 3, ay + 3, 7, 2, '#fffdf2');
      P(ctx, st.x - 1, ay + 5, 3, 2, '#fffdf2');
    }
    const fn = OBJEK_GAMBAR[st.objek] || gambarTanya;
    fn(st.x, t);
    if (lewat || (st.akhir && selesai(topik.id))) gambarCentang(st.x, 172);
  }

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

    for (const a of amb) {
      const kelip = 0.22 + 0.4 * (0.5 + 0.5 * Math.sin(t * 2 + a.f * 2));
      ctx.globalAlpha = kelip;
      P(ctx, a.x, a.y, a.jenis === 'kedip' ? 2 : 1, a.jenis === 'kedip' ? 2 : 1, a.warna);
      ctx.globalAlpha = 1;
    }

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

    for (const st of stasiun) gambarStasiun(st, t);

    const dekat = Math.abs(player.x - NPC_X) < 46;
    K.gambar.bayangan(ctx, NPC_X, GROUND - 1, 10);
    K.gambar.bolaLentera(ctx, NPC_X, GROUND - 10, '#a5d8ff', '#4a7fc0', NPC.glif, t * 2);
    if (dekat && !document.body.classList.contains('dlg-buka')) gambarBuble(NPC_X, NPC.ucap);

    K.gambar.bayangan(ctx, player.x, player.y + 1, 12);
    const fr = player.state === 'jalan' ? Math.floor(player.walkT / 13) % 4 : 0;
    K.gambar.akio(ctx, player.x, player.y, 1, player.squash, player.state === 'jalan' ? fr : 0);
  }

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

  btnMasuk.addEventListener('click', () => {
    introEl.classList.add('pergi');
    setTimeout(() => { if (introEl.parentNode) introEl.parentNode.removeChild(introEl); }, 700);
  });
  btnKamp.addEventListener('click', () => { window.location.href = TUJU_KAMP; });

  btnKamp.innerHTML = '&#8592; ' + (apakahP3 ? 'GUNUNG' : (apakahP2 ? 'HUTAN' : 'KAMP'));

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
