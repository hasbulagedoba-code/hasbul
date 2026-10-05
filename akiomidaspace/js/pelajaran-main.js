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
  const PARTIKEL_OBJEK = { api: 'asap', roket: 'asap', pohon: 'daun', tugu: 'kilau', konstelasi: 'kilau' };

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
