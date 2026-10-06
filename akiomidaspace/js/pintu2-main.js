/* =========================================================
   PINTU 2 — MESIN DUNIA 100 JUDUL (pintu2-main.js)
   Hutan Simbol: satu layar tetap 480x270, tanpa kamera.
   PUSAT: 10 gerbang penjuru. AREA: 4 papan judul per lapisan.
   Tugas user: gerakkan Akio ke papan judul -> judul dijelaskan,
   bila mau lanjut -> redirect ke halaman bahasan (pelajaran.html).
   Mata minus: panel daftar huruf besar, A-/A+, dialog besar.
   Syariah: penduduk bola-lentera tanpa wajah, isi netral & adil.
   ========================================================= */
(function () {
  'use strict';

  const PD = window.P2, S = window.P2SCENE, K = window.KAMP;
  const W = S.W, H = S.H, GROUND = S.GROUND;
  const { P, teksPx, lingkaran } = K.gambar;

  /* ---------- elemen ---------- */
  const layar = document.getElementById('layar');
  const ctx = layar.getContext('2d');
  const introEl = document.getElementById('intro');
  const btnMasuk = document.getElementById('btnMasuk');
  const btnDunia = document.getElementById('btnDunia');
  const aksiBtn = document.getElementById('aksiBtn');
  const dialogEl = document.getElementById('dialog');
  const dlgNama = document.getElementById('dlgNama');
  const dlgJudul = document.getElementById('dlgJudul');
  const dlgTeks = document.getElementById('dlgTeks');
  const dlgTitik = document.getElementById('dlgTitik');
  const btnLanjut = document.getElementById('btnLanjut');
  const btnTutup = document.getElementById('btnTutup');
  const daftarEl = document.getElementById('daftar');
  const btnDaftar = document.getElementById('btnDaftar');

  const adalahSentuh = window.matchMedia('(pointer: coarse)').matches
    || 'ontouchstart' in window
    || (navigator.maxTouchPoints || 0) > 0
    || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (adalahSentuh) document.body.classList.add('coarse', 'kontrol-aktif');

  /* ---------- ukuran panggung ---------- */
  function pasUkuran() {
    const vw = window.innerWidth, vh = window.innerHeight;
    const lanskap = vw > vh;
    const cadangan = adalahSentuh ? (lanskap ? 96 : 150) : 26;
    const k = Math.max(0.55, Math.min((vw - 18) / W, (vh - cadangan - 18) / H));
    layar.style.width = Math.floor(W * k) + 'px';
    layar.style.height = Math.floor(H * k) + 'px';
  }
  window.addEventListener('resize', () => { pasUkuran(); });
  pasUkuran();

  /* ---------- A- / A+ (berbagi setelan dengan Dunia) ---------- */
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

  /* ---------- kemajuan baca (tersimpan) ---------- */
  function sudah(id) {
    try { return localStorage.getItem('pintu2-baca-' + id) === '1'; } catch (e) { return false; }
  }
  function tandaiBaca(id) {
    try { localStorage.setItem('pintu2-baca-' + id, '1'); } catch (e) { /* abaikan */ }
  }
  function terbaca(k) {
    return PD.topikKategori(k).filter(t => sudah(t.id)).length;
  }
  function totalTerbaca() {
    return PD.TOPIK.filter(t => sudah(t.id)).length;
  }

  /* ---------- keadaan dunia ---------- */
  let layarSkr = { mode: 'pusat' };                  // atau {mode:'area', k, hal}
  // Masuk langsung ke penjuru tertentu (?k=..&hal=..) — dipakai tombol kembali dari halaman bahasan
  try {
    const q = new URLSearchParams(window.location.search);
    const qk = parseInt(q.get('k') || '', 10);
    const qh = parseInt(q.get('hal') || '', 10);
    if (qk >= 1 && qk <= PD.KATEGORI.length) {
      const maksHal = Math.ceil(PD.KATEGORI[qk - 1].jumlah / 4) - 1;
      if (qh >= 0 && qh <= maksHal) layarSkr = { mode: 'area', k: qk, hal: qh };
    }
  } catch (e) { /* abaikan */ }
  const player = { x: 36, y: GROUND, vx: 0, dir: 1, state: 'diam', walkT: 0, target: null, tuju: null, squash: 0 };

  function kunciLayar() {
    return layarSkr.mode === 'pusat' ? 'pusat' : 'k' + layarSkr.k + ':' + layarSkr.hal;
  }
  function nHal(k) { return Math.ceil(PD.KATEGORI[k - 1].jumlah / 4); }
  function daftarStasiun() {
    if (layarSkr.mode !== 'area') return [];
    return PD.topikKategori(layarSkr.k).slice(layarSkr.hal * 4, layarSkr.hal * 4 + 4);
  }
  function katAktif() {
    return layarSkr.mode === 'area' ? PD.KATEGORI[layarSkr.k - 1] : null;
  }

  /* ---------- objek interaktif layar aktif ---------- */
  function objek() {
    if (layarSkr.mode === 'pusat') {
      const g = [];
      for (let i = 0; i < PD.KATEGORI.length; i++) g.push({ type: 'gerbang', x: S.GERBANG_X(i), i });
      return g;
    }
    const daftar = daftarStasiun();
    const o = [];
    for (let i = 0; i < daftar.length; i++) o.push({ type: 'judul', x: S.STASIUN_X[i], t: daftar[i] });
    o.push({ type: 'panah', x: 34, arah: 'kiri' });
    o.push({ type: 'panah', x: W - 34, arah: 'kanan' });
    o.push({ type: 'npc', x: 255, i: -1 });
    return o;
  }

  /* ---------- transisi antar layar (pudar, tanpa geser) ---------- */
  const DUR_TRANS = 0.18;
  let trans = null;                                  // {fase, t, tujuan, masukX, terbuka?}
  let tungguBuka = null;                             // topic id yg dibuka otomatis usai transisi

  function mulaiTransisi(tujuan, masukX, bukaId) {
    if (trans) return;
    trans = { fase: 'keluar', t: 0, tujuan, masukX };
    tungguBuka = bukaId || null;
    player.target = null; player.tuju = null; player.vx = 0;
  }
  function terapTransisi() {
    layarSkr = trans.tujuan;
    player.x = Math.max(14, Math.min(W - 14, trans.masukX));
    player.vx = 0; player.state = 'diam';
    segarDaftar();
  }

  /* ---------- partikel & kehidupan ---------- */
  const awan = [{ x: 40, y: 22, v: 4.2, s: 1 }, { x: 250, y: 40, v: 3.1, s: 1.3 }];
  const simbolLangit = [
    { x: 90, y: 56, g: '+', v: 4.6, f: 0 },
    { x: 270, y: 78, g: 'x', v: 3.3, f: 2.1 },
    { x: 380, y: 48, g: '=', v: 4.1, f: 4.2 },
  ];
  let kilau = [];
  const rand = (a, b) => a + Math.random() * (b - a);

  /* ---------- input ---------- */
  const keys = { kiri: false, kanan: false };
  addEventListener('keydown', e => {
    if (document.body.classList.contains('dlg-buka')) return;
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') { keys.kiri = true; e.preventDefault(); }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { keys.kanan = true; e.preventDefault(); }
    if ((e.key === 'Enter' || e.key === ' ') && nearObj && !trans) { lakukan(nearObj); e.preventDefault(); }
  });
  addEventListener('keyup', e => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.kiri = false;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.kanan = false;
  });

  function ikatTombol(id, sisi) {
    const el = document.getElementById(id);
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
    if (document.body.classList.contains('dlg-buka') || trans) return;
    e.preventDefault();
    const r = layar.getBoundingClientRect();
    const wx = (e.clientX - r.left) / r.width * W;
    const wy = (e.clientY - r.top) / r.height * H;
    if (wy > 130) {
      for (const o of objek()) {
        if (o.type === 'npc') continue;
        if (Math.abs(wx - o.x) < 26) { tujuObject(o); return; }
      }
    }
    if (wy > GROUND - 60) {
      player.target = Math.max(14, Math.min(W - 14, wx));
      player.tuju = null;
    }
  });

  /* ---------- menuju objek & aksi ---------- */
  function tujuObject(o) {
    if (trans || document.body.classList.contains('dlg-buka')) return;
    const offset = o.type === 'judul' ? -22 : (o.type === 'gerbang' ? 0 : 0);
    player.target = Math.max(14, Math.min(W - 14, o.x + offset));
    player.tuju = o;
  }

  function lakukan(o) {
    if (o.type === 'gerbang') {
      if (o.i >= 0) mulaiTransisi({ mode: 'area', k: o.i + 1, hal: 0 }, 36);
      return;
    }
    if (o.type === 'panah') {
      if (layarSkr.mode === 'pusat') return;
      const k = layarSkr.k, gx = S.GERBANG_X(k - 1);
      if (o.arah === 'kiri') {
        if (layarSkr.hal > 0) mulaiTransisi({ mode: 'area', k, hal: layarSkr.hal - 1 }, W - 36);
        else mulaiTransisi({ mode: 'pusat' }, Math.min(W - 14, gx + 22));
      } else {
        if (layarSkr.hal < nHal(k) - 1) mulaiTransisi({ mode: 'area', k, hal: layarSkr.hal + 1 }, 36);
        else mulaiTransisi({ mode: 'pusat' }, Math.max(14, gx - 22));
      }
      return;
    }
    if (o.type === 'judul') bukaDialog(o.t);
  }

  /* ---------- objek terdekat (tombol aksi besar + Enter) ---------- */
  let nearObj = null;
  aksiBtn.addEventListener('pointerdown', e => {
    e.preventDefault();
    if (nearObj && !trans) lakukan(nearObj);
  });

  /* ---------- dialog judul ---------- */
  let dlg = null;
  function bukaDialog(t) {
    if (dlg || trans) return;
    player.target = null; player.tuju = null; player.vx = 0; player.state = 'diam';
    const kat = PD.KATEGORI[t.k - 1];
    dlg = t;
    document.body.classList.add('dlg-buka');
    aksiBtn.classList.remove('tampil');
    dlgNama.textContent = kat.nama.toUpperCase();
    dlgNama.style.color = kat.color;
    dlgJudul.textContent = t.judul;
    dlgJudul.style.color = kat.color;
    dlgTeks.textContent = t.teaser;
    tandaiBaca(t.id);
    dlgTitik.textContent = 'JUDUL ' + t.n + '/' + kat.jumlah + ' \u00b7 ' + totalTerbaca() + '/100';
    segarDaftar();
    dialogEl.classList.add('aktif');
  }
  function tutupDialog() {
    dlg = null;
    document.body.classList.remove('dlg-buka');
    dialogEl.classList.remove('aktif');
    segarDaftar();
  }
  btnTutup.addEventListener('click', tutupDialog);
  btnLanjut.addEventListener('click', () => {
    if (!dlg) return;
    const halT = Math.floor((dlg.n - 1) / 4);
    // lanjut -> halaman bahasan; bawa asal penjuru agar tombol kembali tak loncat ke pusat kamp
    window.location.href = 'pelajaran.html?id=' + dlg.id + '&k=' + dlg.k + '&hal=' + halT;
  });

  /* ---------- panel daftar (mata minus) ---------- */
  function segarDaftar() {
    if (!daftarEl) return;
    let html = '';
    if (layarSkr.mode === 'pusat') {
      html += '';
      PD.KATEGORI.forEach((kat, i) => {
        const baca = terbaca(i + 1);
        const penuh = baca >= kat.jumlah;
        html += '<button class="df-baris' + (penuh ? ' tujuan' : '') + '" data-g="' + i + '" type="button">'
          + '<span class="df-no" style="--zc:' + kat.color + '">' + (i + 1) + '</span>'
          + '<span class="df-teks"><b>' + kat.nama + '</b><i>' + kat.sub + '</i></span>'
          + '<span class="df-status' + (penuh ? ' siap' : '') + '">' + baca + '/' + kat.jumlah + '</span>'
          + '</button>';
      });
    } else {
      const kat = katAktif();
      html += '<div class="df-kepala"><span class="df-judul">' + kat.nama.toUpperCase() + '</span>'
        + '<span class="df-sub">Lapisan ' + (layarSkr.hal + 1) + '/' + nHal(layarSkr.k) + ' \u00b7 ketuk judul</span></div>'
        + '<button class="df-baris" data-pusat="1" type="button">'
        + '<span class="df-no" style="--zc:#ffd166">&lt;</span>'
        + '<span class="df-teks"><b>Ke Pusat Hutan</b><i>semua penjuru</i></span>'
        + '<span class="df-status">PUSAT</span></button>';
      const daftar = PD.topikKategori(layarSkr.k);
      for (let i = 0; i < daftar.length; i++) {
        const t = daftar[i];
        const diLayar = Math.floor(i / 4) === layarSkr.hal;
        html += '<button class="df-baris' + (diLayar ? ' tujuan' : '') + '" data-t="' + t.id + '" type="button">'
          + '<span class="df-no" style="--zc:' + kat.color + '">' + t.n + '</span>'
          + '<span class="df-teks"><b>' + t.judul + '</b><i>Judul ' + t.n + ' dari ' + kat.jumlah + '</i></span>'
          + '<span class="df-status' + (sudah(t.id) ? ' siap' : '') + '">' + (sudah(t.id) ? 'SUDAH' : 'BARU') + '</span>'
          + '</button>';
      }
    }
    daftarEl.innerHTML = html;
  }
  if (daftarEl) daftarEl.addEventListener('click', e => {
    const baris = e.target.closest('.df-baris');
    if (!baris || trans) return;
    if (baris.dataset.pusat) { mulaiTransisi({ mode: 'pusat' }, 240); return; }
    if (baris.dataset.g !== undefined) {
      const i = parseInt(baris.dataset.g, 10);
      tujuObject({ type: 'gerbang', x: S.GERBANG_X(i), i });
      return;
    }
    if (baris.dataset.t) {
      const t = PD.topikById(baris.dataset.t);
      if (!t) return;
      const halT = Math.floor((t.n - 1) / 4);
      if (layarSkr.mode === 'area' && layarSkr.k === t.k && halT === layarSkr.hal) {
        const daftar = daftarStasiun();
        const idx = daftar.findIndex(x => x.id === t.id);
        if (idx >= 0) { tujuObject({ type: 'judul', x: S.STASIUN_X[idx], t }); }
      } else {
        mulaiTransisi({ mode: 'area', k: t.k, hal: halT }, 36, t.id);
      }
    }
  });
  if (btnDaftar) btnDaftar.addEventListener('click', () => {
    daftarEl.classList.toggle('buka');
    btnDaftar.classList.toggle('tahan');
  });
  segarDaftar();

  /* ---------- pembaruan ---------- */
  const KECEPATAN = 108;
  function update(dt) {
    const dlgBuka = document.body.classList.contains('dlg-buka');

    // transisi pudar
    if (trans) {
      aksiBtn.classList.remove('tampil');
      trans.t += dt;
      if (trans.fase === 'keluar' && trans.t >= DUR_TRANS) { terapTransisi(); trans.fase = 'masuk'; trans.t = 0; }
      else if (trans.fase === 'masuk' && trans.t >= DUR_TRANS) {
        trans = null;
        if (tungguBuka) {
          const daftar = daftarStasiun();
          const idx = daftar.findIndex(x => x.id === tungguBuka);
          tungguBuka = null;
          if (idx >= 0) tujuObject({ type: 'judul', x: S.STASIUN_X[idx], t: daftar[idx] });
        }
      }
      return;
    }
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
        if (player.tuju) { const o = player.tuju; player.tuju = null; lakukan(o); }
      }
    } else {
      player.vx *= 1 - Math.min(1, dt * 9);
      if (Math.abs(player.vx) < 4) { player.vx = 0; player.state = 'diam'; }
    }
    player.x = Math.max(14, Math.min(W - 14, player.x + player.vx * dt));
    player.walkT += Math.abs(player.vx) * dt;

    // objek terdekat -> tombol aksi
    nearObj = null;
    let terbaik = 1e9;
    for (const o of objek()) {
      if (o.type === 'npc') continue;
      const d = Math.abs(player.x - o.x);
      if (d < 26 && d < terbaik) { terbaik = d; nearObj = o; }
    }
    if (nearObj) {
      aksiBtn.textContent = nearObj.type === 'gerbang' ? 'MASUK' : nearObj.type === 'judul' ? 'LIHAT JUDUL' : 'PERGI';
      aksiBtn.classList.add('tampil');
    } else {
      aksiBtn.classList.remove('tampil');
    }

    // kilau di papan judul yang belum dibaca
    if (layarSkr.mode === 'area') {
      const daftar = daftarStasiun();
      for (let i = 0; i < daftar.length; i++) {
        if (sudah(daftar[i].id)) continue;
        if (Math.random() < dt * 1.6) kilau.push({
          x: S.STASIUN_X[i] + rand(-16, 16), y: rand(150, 190),
          hidup: rand(0.5, 0.9), umur: 0,
        });
      }
    }
    for (const kl of kilau) kl.umur += dt;
    kilau = kilau.filter(kl => kl.umur < kl.hidup);
  }

  function updatePartikel(dt, t) {
    for (const a of awan) { a.x += a.v * dt; if (a.x > 500) a.x = -60; }
    for (const s of simbolLangit) { s.x += s.v * dt; s.f += dt; if (s.x > 495) { s.x = -15; s.y = rand(40, 90); } }
  }

  /* ---------- gambar ---------- */
  function gambarAwan(a) {
    const s = a.s;
    P(ctx, a.x, a.y + 4 * s, 26 * s, 6 * s, '#fffdf2');
    P(ctx, a.x + 5 * s, a.y + 1 * s, 11 * s, 5 * s, '#fffdf2');
    P(ctx, a.x + 15 * s, a.y + 2 * s, 8 * s, 4 * s, '#e8f4fa');
  }

  function gambarBuble(npcX, baris) {
    ctx.font = '8px "Press Start 2P", monospace';
    let bw = 0;
    for (const b of baris) bw = Math.max(bw, ctx.measureText(b).width);
    bw = Math.ceil(bw) + 10;
    const bh = baris.length * 13 + 7;
    const bx = Math.max(2, Math.min(W - bw - 2, npcX - bw / 2));
    const by = GROUND - 10 - 9 - 6 - bh;             // di atas bola penduduk
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

  function draw(t) {
    ctx.drawImage(S.bakar(kunciLayar()), 0, 0);

    // denyut cahaya gerbang di pusat
    if (layarSkr.mode === 'pusat') {
      for (let i = 0; i < PD.KATEGORI.length; i++) {
        const kat = PD.KATEGORI[i];
        ctx.globalAlpha = 0.30 + 0.20 * Math.sin(t * 2.2 + i * 1.3);
        ctx.drawImage(S.glow(kat.color), S.GERBANG_X(i) - 28, 196, 56, 56);
        ctx.globalAlpha = 1;
      }
    }

    for (const a of awan) gambarAwan(a);
    for (const s of simbolLangit) {
      ctx.globalAlpha = 0.3 + 0.18 * Math.sin(t * 2 + s.f * 3);
      teksPx(ctx, s.g, s.x, s.y + Math.sin(t + s.f) * 2, '#fffdf2', 9);
      ctx.globalAlpha = 1;
    }

    // penduduk bola-lentera + buble sapaan saat didekati
    const npcX = layarSkr.mode === 'pusat' ? 239 : 255;
    const ucap = layarSkr.mode === 'pusat'
      ? ['Pilih jalur,', 'penjelajah!']
      : (katAktif() ? katAktif().ucap : ['Selamat', 'menjelajah!']);
    const dekat = Math.abs(player.x - npcX) < 46;
    const glif = layarSkr.mode === 'pusat' ? '2' : (layarSkr.k === 10 ? '?' : String(layarSkr.k));
    K.gambar.bayangan(ctx, npcX, GROUND - 1, 10);
    K.gambar.bolaLentera(ctx, npcX, GROUND - 10, '#4fe3c8', '#0d8a74', glif, t * 2);
    if (dekat && !document.body.classList.contains('dlg-buka')) gambarBuble(npcX, ucap);

    // kilau papan belum dibaca
    for (const kl of kilau) {
      const u = kl.umur / kl.hidup;
      ctx.globalAlpha = 1 - u;
      P(ctx, kl.x, kl.y - u * 8, 1, 1, '#fff3cf');
      ctx.globalAlpha = 1;
    }

    // Akio — bulatan emas murni
    K.gambar.bayangan(ctx, player.x, player.y + 1, 12);
    const fr = player.state === 'jalan' ? Math.floor(player.walkT / 13) % 4 : 0;
    K.gambar.akio(ctx, player.x, player.y, 1, player.squash, player.state === 'jalan' ? fr : 0);

    // transisi pudar
    if (trans) {
      const u = Math.min(1, trans.t / DUR_TRANS);
      ctx.globalAlpha = trans.fase === 'keluar' ? u : 1 - u;
      ctx.fillStyle = '#0d1424';
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;
    }
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

  /* ---------- latar dibakar ulang saat font pixel tiba ---------- */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => { S.kosongkan(); segarDaftar(); }).catch(() => { });
  }

  /* ---------- intro & kembali ---------- */
  btnMasuk.addEventListener('click', () => {
    introEl.classList.add('pergi');
    setTimeout(() => { if (introEl.parentNode) introEl.parentNode.removeChild(introEl); }, 700);
  });
  btnDunia.addEventListener('click', () => { window.location.href = 'index.html'; });

  /* ---------- API debug (QA) ---------- */
  window.P2DBG = {
    get: () => ({
      px: Math.round(player.x), state: player.state, target: player.target,
      layar: kunciLayar(), dekat: nearObj ? nearObj.type : null,
      dialog: dlg ? dlg.id : null, trans: trans ? trans.fase : null,
      terbaca: totalTerbaca(),
    }),
    ke: x => { if (!trans) { player.target = Math.max(14, Math.min(W - 14, x)); player.tuju = null; } },
    keJudul: id => {
      const t = PD.topikById(id);
      if (!t) return;
      const halT = Math.floor((t.n - 1) / 4);
      if (layarSkr.mode === 'area' && layarSkr.k === t.k && halT === layarSkr.hal) {
        const daftar = daftarStasiun();
        const idx = daftar.findIndex(x => x.id === id);
        if (idx >= 0) tujuObject({ type: 'judul', x: S.STASIUN_X[idx], t: daftar[idx] });
      } else mulaiTransisi({ mode: 'area', k: t.k, hal: halT }, 36, id);
    },
    keGerbang: i => tujuObject({ type: 'gerbang', x: S.GERBANG_X(i), i }),
    aksi: () => { if (nearObj) lakukan(nearObj); },
    lanjut: () => btnLanjut.click(),
    tutup: () => tutupDialog(),
  };
})();
