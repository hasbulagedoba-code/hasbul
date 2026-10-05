/* =========================================================
   PETA CERITA — MESIN DUNIA BAHASAN (pelajaran-main.js)
   - Satu layar tetap 480x270: tanpa kamera, tanpa geser.
   - Jejak stasiun cerita: tiap judul = petualangan pendek.
     Stasiun aktif menyala; selesai = diberi tanda centang.
   - Tugas user: gerakkan Akio ke stasiun -> cerita terbuka
     lewat dialog besar. Tombol PERGI mengantar ke tahap
     berikutnya (Akio berjalan sendiri ke jejak yang menyala).
   - Visual hidup: api unggun, asap, daun gugur, kilau bintang,
     awan & glif matematika melayang, penduduk bola-lentera.
   - Mata minus: A-/A+ (satu setelan dengan seluruh dunia),
     dialog huruf besar, tombol aksi besar.
   - Syariah: penduduk bola-lentera tanpa wajah, isi netral.
   ========================================================= */
(function () {
  'use strict';

  const K = window.KAMP, P1 = window.P1, CER = window.CERITA;
  const { P, teksPx, lingkaran } = K.gambar;
  const W = K.W, H = K.H, GROUND = K.GROUND;

  /* ---------- judul dari URL ---------- */
  const id = new URLSearchParams(window.location.search).get('id') || '';
  const topik = P1.topikById(id);
  if (!topik) { window.location.replace('kamp-angka-dunia.html'); return; }
  const kat = P1.KATEGORI[topik.k - 1];
  const cerita = CER.untuk(topik);

  document.title = topik.judul + ' | Pintu 1 — Perpustakaan Matematika';

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
  const NPC_X = 88;
  const UCAP_NPC = ['Ikuti jejak', 'bercahaya!'];

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

  /* ---------- keadaan dunia ---------- */
  let aktif = 0;                                     // indeks stasiun aktif
  let dlg = null;                                    // stasiun yang dialognya terbuka
  const player = { x: 20, y: GROUND, vx: 0, dir: 1, state: 'diam', walkT: 0, target: null, tuju: null, squash: 0 };

  /* ---------- partikel & kehidupan ---------- */
  const awan = [{ x: 60, y: 24, v: 4.0, s: 1 }, { x: 280, y: 44, v: 3.0, s: 1.25 }];
  const glifLangit = [
    { x: 100, y: 58, g: '1', v: 4.4, f: 0 },
    { x: 262, y: 80, g: '+', v: 3.2, f: 2.1 },
    { x: 390, y: 50, g: '?', v: 4.0, f: 4.4 },
    { x: 180, y: 40, g: '0', v: 3.6, f: 6.0 },
  ];
  const rand = (a, b) => a + Math.random() * (b - a);
  let asap = [], daun = [], kilau = [], bungaAir = [];

  /* ---------- input ---------- */
  const keys = { kiri: false, kanan: false };
  addEventListener('keydown', e => {
    if (document.body.classList.contains('dlg-buka')) return;
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
    if (document.body.classList.contains('dlg-buka')) return;
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
      btnTutup.textContent = '\u2190 KEMBALI KE KAMP';
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
    if (dlg && dlg.akhir) { window.location.href = 'kamp-angka-dunia.html'; return; }
    tutupDialog();
  });
  btnPergi.addEventListener('click', () => {
    if (!dlg) return;
    if (dlg.akhir) {
      const lanjut = P1.topikLain(topik.id, 1);
      if (lanjut) window.location.href = 'pelajaran.html?id=' + lanjut.id;
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

    // partikel hidup
    const apiSt = stasiun.find(s => s.objek === 'api');
    if (apiSt && Math.random() < dt * 2.2) asap.push({ x: apiSt.x + rand(-2, 3), y: 226, hidup: rand(1.0, 1.6), umur: 0 });
    const pohonSt = stasiun.find(s => s.objek === 'pohon');
    if (pohonSt && Math.random() < dt * 1.4) daun.push({ x: pohonSt.x + rand(-12, 12), y: 200, hidup: rand(1.8, 2.6), umur: 0, goyang: rand(0, 6) });
    const tuguSt = stasiun.find(s => s.objek === 'tugu');
    if (tuguSt && Math.random() < dt * 1.8) kilau.push({ x: tuguSt.x + rand(-9, 9), y: rand(196, 216), hidup: rand(0.6, 1.1), umur: 0 });
    if (Math.random() < dt * 1.2) bungaAir.push({ x: rand(20, W - 20), y: 252, hidup: rand(0.8, 1.4), umur: 0 });
    for (const s of asap) { s.umur += dt; s.y -= dt * 9; s.x += Math.sin(s.umur * 5) * 0.2; }
    asap = asap.filter(s => s.umur < s.hidup);
    for (const d of daun) { d.umur += dt; d.y += dt * 14; d.x += Math.sin(d.umur * 3 + d.goyang) * 0.35; }
    daun = daun.filter(d => d.umur < d.hidup && d.y < GROUND - 2);
    for (const k of kilau) k.umur += dt;
    kilau = kilau.filter(k => k.umur < k.hidup);
    for (const b of bungaAir) b.umur += dt;
    bungaAir = bungaAir.filter(b => b.umur < b.hidup);
  }

  function updatePartikel(dt, t) {
    for (const a of awan) { a.x += a.v * dt; if (a.x > 500) a.x = -60; }
    for (const g of glifLangit) { g.x += g.v * dt; g.f += dt; if (g.x > 495) { g.x = -15; g.y = rand(38, 92); } }
  }

  /* ---------- latar dibakar sekali ---------- */
  function bakarLatar() {
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const c = cv.getContext('2d');

    // langit pita pixel
    P(c, 0, 0, W, 46, '#9fdcf5');
    P(c, 0, 46, W, 42, '#8fd3f0');
    P(c, 0, 88, W, 40, '#a5e0f5');
    P(c, 0, 128, W, 24, '#b7e8f8');

    // matahari pixel
    lingkaran(c, 430, 30, 12, '#ffe9a3');
    lingkaran(c, 430, 30, 9, '#ffd166');
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4;
      P(c, 430 + Math.round(Math.cos(a) * 15), 30 + Math.round(Math.sin(a) * 15), 2, 2, '#ffe9a3');
    }

    // pegunungan dua lapis
    function gunung(apexX, apexY, setW, baseY, col) {
      for (let y = apexY; y <= baseY; y++) {
        const u = (y - apexY) / (baseY - apexY);
        const ww = Math.max(1, Math.round(setW * u));
        P(c, apexX - ww, y, ww * 2 + 1, 1, col);
      }
    }
    gunung(80, 84, 56, 186, '#a9c8e2');
    gunung(220, 74, 68, 186, '#98bcd9');
    gunung(400, 88, 60, 186, '#a9c8e2');
    P(c, 0, 150, W, 36, '#93bfd8');

    // hutan tipis di kejauhan
    for (let i = 0; i < 14; i++) {
      const tx = 8 + i * 34, ty = 176 + (i % 3) * 2;
      lingkaran(c, tx, ty, 5, '#2f7a44');
      lingkaran(c, tx - 3, ty + 2, 3, '#2a6d3c');
    }

    // tanah rumput
    P(c, 0, 182, W, 88, '#7ec850');
    for (let i = 0; i < 60; i++) {
      const gx = (i * 53) % W, gy = 186 + (i * 29) % 48;
      P(c, gx, gy, 2, 1, i % 2 ? '#6fb844' : '#8fd15c');
    }

    // jalan setapak tanah
    P(c, 0, 236, W, 24, '#d9b877');
    P(c, 0, 236, W, 2, '#c2a05e');
    P(c, 0, 258, W, 2, '#c2a05e');
    for (let i = 0; i < 26; i++) {
      const px2 = (i * 41) % W, py2 = 240 + (i * 13) % 16;
      P(c, px2, py2, 3, 2, i % 3 ? '#c9a763' : '#e3c58c');
    }

    // batu & bunga penyejimbang
    for (let i = 0; i < 5; i++) {
      const bx = 30 + i * 97, by = 226 + (i % 2) * 5;
      lingkaran(c, bx, by, 3, '#9aa6b8');
      P(c, bx - 1, by - 2, 2, 1, '#c3ccda');
    }
    for (let i = 0; i < 10; i++) {
      const fx = (i * 89 + 25) % (W - 20) + 10, fy = 214 + (i * 7) % 18;
      P(c, fx, fy, 2, 2, i % 2 ? '#ffb86b' : '#f2b8cc');
      P(c, fx, fy + 2, 1, 2, '#4fa55e');
    }

    return cv;
  }
  const LATAR = bakarLatar();

  /* ---------- gambar stasiun ---------- */
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

  function gambarApi(x, t) {
    P(ctx, x - 10, 244, 20, 3, '#6e4522');
    P(ctx, x - 6, 242, 9, 2, '#8a5a30');
    lingkaran(ctx, x - 10, 243, 2, '#9aa6b8');
    lingkaran(ctx, x + 10, 243, 2, '#9aa6b8');
    const naik = Math.sin(t * 9) * 1.5;
    P(ctx, x - 4, 236 + naik, 8, 7 - naik * 0.5, '#ff6b35');
    P(ctx, x - 3, 233 + naik, 6, 5, '#ff9d4a');
    P(ctx, x - 2, 231 + naik, 4, 4, '#ffd166');
    // tumpukan batu hitung (cerita gembala)
    lingkaran(ctx, x + 18, 244, 3, '#9aa6b8');
    lingkaran(ctx, x + 23, 244, 3, '#b8c2d2');
    lingkaran(ctx, x + 20, 240, 3, '#9aa6b8');
    P(ctx, x + 19, 239, 2, 1, '#c3ccda');
  }

  function gambarTulang(x) {
    P(ctx, x - 14, 240, 28, 6, '#8a8f9c');            // lempeng batu
    P(ctx, x - 14, 240, 28, 2, '#a3aabc');
    P(ctx, x - 11, 234, 22, 6, '#f3efe4');            // batang tulang
    lingkaran(ctx, x - 12, 236, 3, '#fffdf2');
    lingkaran(ctx, x + 12, 236, 3, '#fffdf2');
    lingkaran(ctx, x - 12, 236, 2, '#e8e2d2');
    for (let i = 0; i < 4; i++) P(ctx, x - 7 + i * 4, 234, 1, 6, '#8a7a5a');   // goresan hitung
  }

  function gambarTablet(x) {
    P(ctx, x - 12, 246, 4, 8, '#7a5230');
    P(ctx, x + 9, 246, 4, 8, '#7a5230');
    P(ctx, x - 14, 244, 29, 3, '#8a5f38');            // dudukan kayu
    P(ctx, x - 12, 220, 24, 24, '#c98a4b');           // tablet tanah liat
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
    P(ctx, x - 14, 214, 6, 32, '#9aa6b8');            // pilar kiri
    P(ctx, x + 9, 214, 6, 32, '#9aa6b8');
    P(ctx, x - 14, 214, 6, 2, '#c3ccda');
    P(ctx, x + 9, 214, 6, 2, '#c3ccda');
    P(ctx, x - 16, 210, 33, 5, '#8a8f9c');            // palang atas
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
    // buah simetris: pola berulang
    for (let i = 0; i < 3; i++) {
      P(ctx, x - 7 + i * 7, 214 + (i % 2) * 4, 2, 2, '#ff9d9d');
    }
  }

  function gambarTugu(x, t) {
    P(ctx, x - 14, 244, 28, 4, '#8a8f9c');
    P(ctx, x - 9, 216, 18, 28, '#b8c2d2');
    P(ctx, x - 9, 216, 18, 3, '#d3dae6');
    P(ctx, x - 12, 212, 24, 5, '#9aa6b8');
    gambarCahaya(x, 200, 13, '#ffd166', t);
    const bob = Math.round(Math.sin(t * 2.2) * 1.5);
    const sy = 194 + bob;
    P(ctx, x - 1, sy - 5, 3, 11, '#ffd166');          // bintang pixel
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

  function gambarStasiun(st, t) {
    const lewat = stasiun.indexOf(st) < aktif;
    if (stasiun.indexOf(st) === aktif) {
      gambarCahaya(st.x, GROUND - 10, 16, kat.color, t);
      const ay = 168 + Math.round(Math.sin(t * 3) * 2);   // panah pixel turun
      P(ctx, st.x - 1, ay, 3, 4, '#fffdf2');
      P(ctx, st.x - 3, ay + 3, 7, 2, '#fffdf2');
      P(ctx, st.x - 1, ay + 5, 3, 2, '#fffdf2');
    }
    if (st.objek === 'api') gambarApi(st.x, t);
    else if (st.objek === 'tulang') gambarTulang(st.x);
    else if (st.objek === 'tablet') gambarTablet(st.x);
    else if (st.objek === 'nol') gambarNol(st.x, t);
    else if (st.objek === 'pohon') gambarPohon(st.x, t);
    else if (st.objek === 'tugu') gambarTugu(st.x, t);
    else gambarTanya(st.x, t);
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
  function gambarAwan(a) {
    const s = a.s;
    P(ctx, a.x, a.y + 4 * s, 26 * s, 6 * s, '#fffdf2');
    P(ctx, a.x + 5 * s, a.y + 1 * s, 11 * s, 5 * s, '#fffdf2');
    P(ctx, a.x + 15 * s, a.y + 2 * s, 8 * s, 4 * s, '#e8f4fa');
  }

  function draw(t) {
    ctx.drawImage(LATAR, 0, 0);

    for (const a of awan) gambarAwan(a);
    for (const g of glifLangit) {
      ctx.globalAlpha = 0.3 + 0.18 * Math.sin(t * 2 + g.f * 3);
      teksPx(ctx, g.g, g.x, g.y + Math.sin(t + g.f) * 2, '#fffdf2', 9);
      ctx.globalAlpha = 1;
    }

    // partikel hidup
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
    for (const b of bungaAir) {
      ctx.globalAlpha = 0.5 * (1 - b.umur / b.hidup);
      P(ctx, b.x, b.y - b.umur * 6, 1, 1, '#fffdf2');
      ctx.globalAlpha = 1;
    }

    // stasiun cerita
    for (const st of stasiun) gambarStasiun(st, t);

    // penduduk bola-lentera + sapaan
    const dekat = Math.abs(player.x - NPC_X) < 46;
    K.gambar.bayangan(ctx, NPC_X, GROUND - 1, 10);
    K.gambar.bolaLentera(ctx, NPC_X, GROUND - 10, '#a5d8ff', '#4a7fc0', 'i', t * 2);
    if (dekat && !document.body.classList.contains('dlg-buka')) gambarBuble(NPC_X, UCAP_NPC);

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
  btnKamp.addEventListener('click', () => { window.location.href = 'kamp-angka-dunia.html'; });

  /* ---------- API debug (QA) ---------- */
  window.PLDBG = {
    get: () => ({
      px: Math.round(player.x), state: player.state, target: player.target,
      aktif, judul: topik.id, dialog: dlg ? dlg.judul : null,
      near: nearSt, selesai: selesai(topik.id),
    }),
    ke: x => { if (!dlg) { player.target = Math.max(14, Math.min(W - 14, x)); player.tuju = null; } },
    keStasiun: i => tujuStasiun(Math.max(0, Math.min(stasiun.length - 1, i)), true),
    aksi: () => { if (nearSt && !dlg) lakukan(stasiun[aktif]); },
    pergi: () => btnPergi.click(),
    tutup: () => tutupDialog(),
  };
})();
