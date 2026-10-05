/* =========================================================
   DUNIA AKIOMIDA — Mesin Utama (world-main.js)
   PRINSIP:
   - Layar TETAP 480x270: tidak ada kamera, tidak ada geser.
     camX abadi 0 — karakter mustahil hilang dari pandangan.
   - Tugas user jelas: gerakkan Akio (bulatan emas) ke pintu wilayah.
   - Ramah MATA MINUS: daftar wilayah bernomor dengan huruf besar,
     tombol A- / A+ untuk memperbesar semua tulisan, label AKIO besar,
     tombol MASUK besar di mobile.
   - SYARIAH: tidak ada makhluk hidup — burung & kupu-kupu diganti
     simbol matematika melayang.
   ========================================================= */
(function () {
  'use strict';

  const AK = window.AK;
  const { W, H, GROUND } = AK;

  /* ---------- elemen ---------- */
  const layar = document.getElementById('layar');
  const ctx = layar.getContext('2d');
  const chipEl = document.getElementById('chipWilayah');
  const chipNama = document.getElementById('chipNama');
  const chipSlogan = document.getElementById('chipSlogan');
  const hintEl = document.getElementById('hint');
  const introEl = document.getElementById('intro');
  const btnMasuk = document.getElementById('btnMasuk');
  const legendaEl = document.getElementById('legenda');
  const btnLegenda = document.getElementById('btnLegenda');
  const labelAkio = document.getElementById('labelAkio');
  const btnMasukPintu = document.getElementById('btnMasukPintu');

  const adalahSentuh = window.matchMedia('(pointer: coarse)').matches
    || 'ontouchstart' in window
    || (navigator.maxTouchPoints || 0) > 0
    || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (adalahSentuh) document.body.classList.add('coarse', 'kontrol-aktif');

  /* ---------- ukuran panggung: dunia utuh selalu muat ---------- */
  let rectCache = null;
  function pasUkuran() {
    const vw = window.innerWidth, vh = window.innerHeight;
    // landscape: tombol ada di sudut, tak menutupi kanvas tengah — cadangan kecil
    const lanskap = vw > vh;
    const cadangan = adalahSentuh ? (lanskap ? 100 : 150) : 26;
    const k = Math.max(0.55, Math.min((vw - 18) / W, (vh - cadangan - 18) / H));
    layar.style.width = Math.floor(W * k) + 'px';
    layar.style.height = Math.floor(H * k) + 'px';
    rectCache = layar.getBoundingClientRect();
  }
  window.addEventListener('resize', () => { pasUkuran(); });
  pasUkuran();

  /* ---------- UKURAN TULISAN (mata minus): A- / A+ tersimpan ---------- */
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

  /* ---------- DAFTAR WILAYAH: nama besar, bisa diketuk untuk pergi ---------- */
  (function bangunLegenda() {
    if (!legendaEl) return;
    let html = '<div class="leg-kepala">'
      + '<span class="leg-judul">TUGASMU</span>'
      + '<span class="leg-sub">Gerakkan Akio ke pintu bernomor</span>'
      + '</div>';
    AK.ZONES.forEach((z, i) => {
      const status = z.open
        ? '<span class="leg-status buka">TERBUKA</span>'
        : '<span class="leg-status">SEGERA</span>';
      html += '<button class="leg-baris' + (z.open ? ' tujuan' : '') + '" data-z="' + i + '" type="button"'
        + ' aria-label="Pergi ke ' + z.name + '">'
        + '<span class="leg-no" style="--zc:' + z.color + ';--zd:' + z.deep + '">' + (i + 1) + '</span>'
        + '<span class="leg-teks"><b>' + z.name + '</b><i>' + z.slogan + '</i></span>'
        + status
        + '</button>';
    });
    legendaEl.innerHTML = html;
    legendaEl.addEventListener('click', e => {
      const baris = e.target.closest('.leg-baris');
      if (!baris) return;
      const z = AK.ZONES[parseInt(baris.dataset.z, 10)];
      if (z) ketukPintu(z);
    });
  })();
  if (btnLegenda) btnLegenda.addEventListener('click', () => {
    legendaEl.classList.toggle('buka');
    btnLegenda.classList.toggle('tahan');
  });

  /* ---------- latar dibakar sekali; dibakar ulang saat font pixel tiba ---------- */
  let bg = AK.bakeBG();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => { bg = AK.bakeBG(); }).catch(() => {});
  }

  /* ---------- cahaya gerbang (sprite jadi, nol gradien per frame) ---------- */
  const glow = AK.ZONES.map(z => AK.makeGlow(z.color, 30));

  /* ---------- tokoh ---------- */
  const akio = window.AKJELLY.buatAkio();
  const player = {
    x: 20, y: 249, vx: 0, dir: 1, state: 'diam', walkT: 0, target: null,
    scale: 1, squash: 0, masuk: null, pop: 0,
  };

  const npcs = AK.NPCS.map((n, i) => ({
    ...n, i, frames: window.AKJELLY.buatNpc(n), ft: Math.random() * 2, fi: 0,
    fasaT: i * 1.15, k: 0, tampil: false,          // giliran bicara: tak saling menumpuk
  }));

  /* ---------- partikel & kehidupan (syariah: hanya benda & simbol) ---------- */
  const awan = [
    { x: 40, y: 26, v: 4.5, s: 1 }, { x: 230, y: 52, v: 3.2, s: 1.3 }, { x: 380, y: 18, v: 5.4, s: 0.8 },
  ];
  // simbol matematika melayang di langit (pengganti burung)
  const simbolLangit = [
    { x: 70, y: 42, g: 'plus', v: 5.2, f: 0 },
    { x: 250, y: 70, g: 'kali', v: 3.4, f: 2.1 },
    { x: 352, y: 34, g: 'bagi', v: 4.3, f: 4.2 },
  ];
  let asap = [], percik = [], daun = [], salju = [], kilau = [], teks = [], simbolHutan = [];
  let tDaun = 0, tSalju = 0, tPercik = 0, tKilau = 0, tSimbol = 0;
  const rand = (a, b) => a + Math.random() * (b - a);

  /* ---------- input ---------- */
  const keys = { kiri: false, kanan: false };

  addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') { keys.kiri = true; e.preventDefault(); }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { keys.kanan = true; e.preventDefault(); }
    if ((e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') && !player.masuk) {
      const zk = AK.ZONES.find(z => z.open);
      if (zk && Math.abs(player.x - zk.x) < 26) { ketukPintu(zk); e.preventDefault(); }
    }
  });
  addEventListener('keyup', e => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.kiri = false;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.kanan = false;
  });

  function ikatTombol(id, sisi) {
    const el = document.getElementById(id);
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

  /* ketuk layar: ke pintu, atau ke titik tanah */
  layar.addEventListener('pointerdown', e => {
    e.preventDefault();
    const r = layar.getBoundingClientRect();
    const wx = (e.clientX - r.left) / r.width * W;
    const wy = (e.clientY - r.top) / r.height * H;
    for (const z of AK.ZONES) {
      if (Math.abs(wx - z.x) < 26 && wy > 120) { ketukPintu(z); return; }
    }
    if (wy > GROUND - 46 && wy < 268 && !player.masuk) {
      player.target = Math.max(12, Math.min(468, wx));
    }
  });

  /* tombol MASUK besar (mobile) — pintu terbuka di dekatmu */
  if (btnMasukPintu) {
    btnMasukPintu.addEventListener('pointerdown', e => {
      e.preventDefault();
      const zk = AK.ZONES.find(z => z.open);
      if (zk) ketukPintu(zk);
    });
  }

  function ketukPintu(z) {
    if (player.masuk) return;
    if (z.open) {
      player.target = z.x;                       // berjalan menuju pintu, terserap saat tiba
      hilangkanHint();
    } else {
      teks.push({ x: z.x, y: 150, txt: 'SEGERA HADIR!', t: 0, col: '#ffd166' });
      pesanHint(z.name + ' — segera hadir!');
      const n = npcs.find(nn => nn.zone === AK.ZONES.indexOf(z));
      if (n) { n.tampil = true; n.k = n.ucap.length - 1; n.fasaT = 0; }
    }
  }

  /* ---------- layar muat gerbang (alur iklan dipertahankan) ---------- */
  const muatEl = document.getElementById('muat');
  const muatJudul = document.getElementById('muatJudul');
  const muatAura = document.getElementById('muatAura');
  const muatSlot = document.getElementById('muatSlot');
  const muatBatal = document.getElementById('muatBatal');
  const DURASI_MUAT = 8000;
  let muatTimer = null, muatSlotTerpasang = false;

  function warnaAura(hex, alpha) {
    const n = parseInt(hex.slice(1), 16);
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + alpha + ')';
  }
  function bukaMuatan(z) {
    if (muatEl.classList.contains('aktif')) return;
    muatJudul.textContent = 'Membuka ' + z.name;
    muatAura.style.setProperty('--aura', warnaAura(z.color, 0.22));
    if (!muatSlotTerpasang) {
      const slot = document.createElement('div');
      slot.className = 'ad-slot';
      muatSlot.appendChild(slot);                // ads.js otomatis menyuntik iklan
      muatSlotTerpasang = true;
    }
    muatEl.classList.add('aktif');
    muatEl.setAttribute('aria-hidden', 'false');
    muatTimer = setTimeout(() => { window.location.href = z.href; }, DURASI_MUAT);
  }
  function tutupMuatan() {
    clearTimeout(muatTimer); muatTimer = null;
    muatEl.classList.remove('aktif');
    muatEl.setAttribute('aria-hidden', 'true');
    if (player.masuk && player.masuk.fase === 'selesai') {
      const z = player.masuk.z;
      player.x = Math.max(12, z.x - 26); player.y = 249;
      player.vx = 0; player.target = null;
      player.scale = 0.25; player.pop = 1;       // muncul lagi dengan pop halus
      player.masuk = null;
    }
  }
  muatBatal.addEventListener('click', tutupMuatan);

  /* ---------- hint & chip ---------- */
  const hintDasar = adalahSentuh
    ? 'Ketuk pintu bernomor atau daftar wilayah'
    : 'Tekan \u2190 \u2192 untuk berjalan \u00b7 klik pintu wilayah untuk masuk';
  hintEl.textContent = hintDasar;
  let hintHilang = false, hintTimer = null;
  function hilangkanHint() { if (!hintHilang) { hintHilang = true; hintEl.classList.add('pudar'); } }
  function pesanHint(txt) {                      // pesan sesaat dengan huruf besar (mata minus)
    clearTimeout(hintTimer);
    hintEl.textContent = txt;
    hintEl.classList.remove('pudar');
    hintTimer = setTimeout(() => {
      hintEl.textContent = hintDasar;
      if (hintHilang) hintEl.classList.add('pudar');
    }, 2600);
  }
  setTimeout(hilangkanHint, 13000);

  let chipZone = -2;
  function perbaruiChip() {
    let zi = -1;
    for (let i = 0; i < AK.ZONES.length; i++) if (Math.abs(player.x - AK.ZONES[i].x) < 30) zi = i;
    if (zi !== chipZone) {
      chipZone = zi;
      if (zi >= 0) {
        chipNama.textContent = AK.ZONES[zi].name;
        chipSlogan.textContent = AK.ZONES[zi].slogan;
      } else {
        chipNama.textContent = 'Dunia Akiomida';
        chipSlogan.textContent = 'Gerakkan Akio ke pintu tujuan';
      }
      chipEl.classList.remove('tampil');
      void chipEl.offsetWidth;
      chipEl.classList.add('tampil');
    }
  }

  /* ---------- label AKIO mengikuti bola (huruf besar, mudah dibaca) ---------- */
  let labelPos = '';
  function perbaruiLabelAkio() {
    if (!rectCache || !labelAkio) return;
    const vw = window.innerWidth;
    let sx = rectCache.left + player.x / W * rectCache.width;
    sx = Math.max(52, Math.min(vw - 52, sx));      // tak terpotong di tepi layar
    const sy = rectCache.top + (player.y - 24 * player.scale) / H * rectCache.height;
    const key = (sx | 0) + ':' + (sy | 0);
    if (key !== labelPos) {
      labelPos = key;
      labelAkio.style.transform = 'translate(' + sx.toFixed(1) + 'px,' + sy.toFixed(1) + 'px) translate(-50%,-100%)';
    }
  }

  /* ---------- pembaruan ---------- */
  const KECEPATAN = 112, MASUK_LAMA = 0.8;
  let diamDiPintu = 0;

  function update(dt, t) {
    // pop kembali dari salah klik
    if (player.pop) {
      player.scale = Math.min(1, player.scale + dt * 3);
      if (player.scale >= 1) { player.pop = 0; player.squash = 1; }
    }
    player.squash = Math.max(0, player.squash - dt * 4);

    // sekuen masuk gerbang
    if (player.masuk) {
      const m = player.masuk;
      if (m.fase === 'jalan') {
        player.target = m.z.x;
        gerak(dt);
        if (Math.abs(player.x - m.z.x) < 6) {
          player.vx = 0; player.target = null;
          m.fase = 'telan'; m.t = 0;
        }
      } else if (m.fase === 'telan') {
        m.t += dt;
        const u = Math.min(1, m.t / MASUK_LAMA);
        const e = u * u * (3 - 2 * u);
        player.scale = 1 - 0.7 * e;                          // mengecil TETAP terlihat
        player.x += (m.z.x - player.x) * Math.min(1, dt * 8);
        player.y = 249 - 30 * e;                             // naik ke mulut pintu
        if (u >= 1) { m.fase = 'selesai'; bukaMuatan(m.z); }
      }
      perbaruiChip();
      perbaruiLabelAkio();
      if (btnMasukPintu) btnMasukPintu.classList.remove('tampil');
      return;
    }

    gerak(dt);

    // pintu kamp angka (wilayah terbuka):
    // masuk bila MENJUJUK pintu secara sengaja, atau berhenti di depannya.
    // Jalan lewat saja tidak menyerap — pemain bebas menyeberangi dunia.
    const zk = AK.ZONES[0];
    const diPintu = Math.abs(player.x - zk.x) < 10;
    if (zk.open && diPintu && (player.target === zk.x || player.state === 'diam')) {
      diamDiPintu += dt;
      if (player.target === zk.x || diamDiPintu > 0.4) {
        player.target = null; player.vx = 0;
        player.masuk = { z: zk, fase: 'jalan', t: 0 };
        diamDiPintu = 0;
        hilangkanHint();
      }
    } else {
      diamDiPintu = 0;
    }

    // tombol MASUK besar muncul saat dekat pintu terbuka (mobile)
    if (btnMasukPintu) {
      btnMasukPintu.classList.toggle('tampil', adalahSentuh && diPintu);
    }

    // NPC: goyangan + giliran bicara
    for (const n of npcs) {
      n.ft += dt; n.fi = Math.floor(n.ft / 1.6) % 2;
      const dekat = Math.abs(player.x - n.x) < 30;
      if (dekat) { n.tampil = true; }
      else {
        n.fasaT += dt;
        if (n.tampil && n.fasaT > 2.7) { n.tampil = false; n.fasaT = 0; }
        else if (!n.tampil && n.fasaT > 1.5) { n.k = (n.k + 1) % n.ucap.length; n.tampil = true; n.fasaT = 0; }
      }
    }

    perbaruiChip();
    perbaruiLabelAkio();
  }

  function gerak(dt) {
    const arah = (keys.kiri ? -1 : 0) + (keys.kanan ? 1 : 0);
    if (arah !== 0 && !player.pop) {
      player.target = null;
      player.vx += (arah * KECEPATAN - player.vx) * Math.min(1, dt * 10);
      player.dir = arah; player.state = 'jalan';
    } else if (player.target != null) {
      const dx = player.target - player.x;
      player.vx = Math.max(-KECEPATAN, Math.min(KECEPATAN, dx * 6));
      if (Math.abs(dx) > 2) { player.dir = dx > 0 ? 1 : -1; player.state = 'jalan'; }
      else { player.x = player.target; player.vx = 0; player.target = null; player.state = 'diam'; player.squash = 0.6; }
    } else {
      player.vx *= 1 - Math.min(1, dt * 9);
      if (Math.abs(player.vx) < 4) { player.vx = 0; player.state = 'diam'; }
    }
    if (Math.abs(player.vx) > 6 && !hintHilang) hilangkanHint();
    player.x += player.vx * dt;
    player.x = Math.max(12, Math.min(468, player.x));        // tak pernah keluar layar
    player.walkT += Math.abs(player.vx) * dt;
  }

  /* ---------- partikel kehidupan ---------- */
  function updatePartikel(dt, t) {
    // asap cerobong pegunungan + api unggun kamp
    if (Math.random() < dt * 2.2) asap.push({ x: 219 + rand(-1, 1), y: 162, vy: rand(-11, -7), vx: rand(-3, 1), hidup: rand(2.2, 3.4), umur: 0, s: rand(2, 3) });
    if (Math.random() < dt * 1.6) asap.push({ x: 24 + rand(-2, 2), y: 234, vy: rand(-13, -9), vx: rand(-2, 2), hidup: rand(1.6, 2.6), umur: 0, s: rand(1.5, 2.5) });
    for (const s of asap) { s.umur += dt; s.x += s.vx * dt; s.y += s.vy * dt; s.vy *= 1 - dt * 0.2; }
    asap = asap.filter(s => s.umur < s.hidup);

    // percikan api unggun
    tPercik += dt;
    if (tPercik > 0.5) {
      tPercik = 0;
      for (let i = 0; i < 2; i++) percik.push({ x: 24 + rand(-3, 3), y: 240, vx: rand(-9, 9), vy: rand(-34, -20), hidup: rand(0.4, 0.8), umur: 0 });
    }
    // percikan paron kota bukti
    if (Math.random() < dt * 1.4) for (let i = 0; i < 3; i++) percik.push({ x: 304 + rand(-2, 2), y: 242, vx: rand(-14, 14), vy: rand(-30, -14), hidup: rand(0.3, 0.6), umur: 0 });
    for (const s of percik) { s.umur += dt; s.x += s.vx * dt; s.y += s.vy * dt; s.vy += 70 * dt; }
    percik = percik.filter(s => s.umur < s.hidup);

    // daun gugur hutan simbol
    tDaun += dt;
    if (tDaun > 1.1) {
      tDaun = 0;
      daun.push({ x: rand(88, 150), y: 102, f: rand(0, 6), hidup: 0 });
    }
    for (const d of daun) { d.hidup += dt; d.f += dt * 2.4; d.y += 14 * dt; d.x += Math.sin(d.f) * 12 * dt; }
    daun = daun.filter(d => d.y < 250);

    // salju puncak riset
    tSalju += dt;
    if (tSalju > 0.4) {
      tSalju = 0;
      salju.push({ x: rand(398, 468), y: 128, f: rand(0, 6) });
    }
    for (const s of salju) { s.f += dt * 2; s.y += 11 * dt; s.x += Math.sin(s.f) * 7 * dt; }
    salju = salju.filter(s => s.y < 252);

    // kilau di pintu kamp angka (wilayah terbuka)
    tKilau += dt;
    if (tKilau > 0.55) {
      tKilau = 0;
      kilau.push({ x: 40 + rand(-9, 9), y: rand(212, 240), hidup: rand(0.5, 0.9), umur: 0 });
    }
    for (const k of kilau) k.umur += dt;
    kilau = kilau.filter(k => k.umur < k.hidup);

    // simbol matematika melayang di hutan simbol (pengganti kupu-kupu)
    tSimbol += dt;
    if (tSimbol > 1.8) {
      tSimbol = 0;
      const g = ['plus', 'kali', 'bagi'][Math.floor(rand(0, 3))];
      simbolHutan.push({ x: rand(86, 152), y: rand(170, 210), g, f: rand(0, 6), hidup: rand(3.5, 5.5), umur: 0 });
    }
    for (const s of simbolHutan) { s.umur += dt; s.f += dt; s.y -= 5 * dt; s.x += Math.sin(s.f * 1.4) * 6 * dt; }
    simbolHutan = simbolHutan.filter(s => s.umur < s.hidup);

    // teks melayang
    for (const T of teks) T.t += dt;
    teks = teks.filter(T => T.t < 1.5);

    // awan & simbol langit
    for (const a of awan) { a.x += a.v * dt; if (a.x > 500) a.x = -60; }
    for (const s of simbolLangit) { s.x += s.v * dt; s.f += dt; if (s.x > 495) { s.x = -15; s.y = rand(28, 84); } }
  }

  /* ---------- gambar ---------- */
  function P(x, y, w, h, col) { ctx.fillStyle = col; ctx.fillRect(x | 0, y | 0, w, h); }
  const mini = window.AKJELLY.gambarMini;

  function gambarAwan(a) {
    const s = a.s;
    P(a.x, a.y + 4 * s, 26 * s, 6 * s, '#fffdf2');
    P(a.x + 5 * s, a.y + 1 * s, 11 * s, 5 * s, '#fffdf2');
    P(a.x + 15 * s, a.y + 2 * s, 8 * s, 4 * s, '#e8f4fa');
  }
  function gambarBayangan(x, y, w) {
    ctx.fillStyle = 'rgba(20,26,40,.22)';
    ctx.fillRect((x - w / 2) | 0, (y - 1) | 0, w, 2);
  }
  function gambarApi(t) {
    P(18, 244, 12, 3, '#6e4522');               // kayu unggun
    P(21, 242, 7, 2, '#8a5a30');
    const naik = Math.sin(t * 9) * 1.5;
    P(21, 236 + naik, 6, 6 - naik * 0.5, '#ff6b35');
    P(22, 233 + naik, 4, 5, '#ff9d4a');
    P(23, 231 + naik, 2, 4, '#ffd166');
  }
  function gambarParon() {
    P(300, 243, 9, 4, '#6e7f92');
    P(302, 241, 5, 2, '#8fa2b5');
    P(301, 247, 7, 2, '#4a5668');
  }
  function gambarTeleskop(t) {
    const naik = Math.round((Math.sin(t * 0.6) + 1) * 2);   // 0..4 — teleskop menoleh pelan
    for (let i = 0; i < 8; i++) P(433 + i, 151 - Math.round(i * naik / 8), 1, 2, '#3d5f8f');
    P(440 + (naik > 2 ? 0 : 0), 150 - Math.round(7 * naik / 8), 2, 2, '#ffd166');
  }
  function gambarKristal(t) {
    const p = 0.5 + 0.5 * Math.sin(t * 2.4);
    ctx.globalAlpha = 0.35 + 0.4 * p;
    P(326, 228, 4, 10, '#d9c4ff');
    P(376, 231, 4, 8, '#d9c4ff');
    ctx.globalAlpha = 1;
  }
  function gambarPanahTerbuka(t) {
    // panah memantul di atas pintu wilayah terbuka — tujuan tak mungkin salah
    const zx = 40, ay = 160 + Math.round(Math.sin(t * 4) * 2);
    P(zx - 4, ay + 1, 8, 2, '#0e1526');          // bayang panah
    P(zx - 3, ay - 1, 6, 2, '#0e1526');
    P(zx - 3, ay - 2, 6, 2, '#7dffa8');
    P(zx - 2, ay, 4, 2, '#7dffa8');
    P(zx - 1, ay + 2, 2, 2, '#7dffa8');
  }

  function gambarBuble(n, kananTerakhir) {
    if (!n.tampil) return kananTerakhir;
    const baris = n.ucap[n.k];
    ctx.font = '10px "Press Start 2P", monospace';
    let terpanjang = 0;
    for (const b of baris) terpanjang = Math.max(terpanjang, ctx.measureText(b).width);
    const bw = Math.ceil(terpanjang) + 10, bh = baris.length * 13 + 7;
    const bx = Math.max(2, Math.min(W - bw - 2, n.x - bw / 2));
    if (bx < kananTerakhir + 6) return kananTerakhir;   // buble lain sedang tampil di dekatnya: tunggu giliran
    const orbAtas = 224;
    const by = orbAtas - bh - 6;
    P(bx + 1, by, bw - 2, bh, '#fffdf2');
    P(bx, by + 1, bw, bh - 2, '#fffdf2');
    ctx.fillStyle = '#2a3757';
    ctx.fillRect(bx, by, bw, 1); ctx.fillRect(bx, by + bh - 1, bw, 1);
    ctx.fillRect(bx, by, 1, bh); ctx.fillRect(bx + bw - 1, by, 1, bh);
    P(n.x - 2, by + bh, 4, 2, '#fffdf2');       // ekor buble menuju bola-lentera
    P(n.x - 1, by + bh + 2, 2, 3, '#fffdf2');
    ctx.fillStyle = '#1c2740';
    ctx.textBaseline = 'top';
    for (let i = 0; i < baris.length; i++) ctx.fillText(baris[i], bx + 5, by + 4 + i * 13);
    return bx + bw;
  }

  function gambarTeksMelayang(T) {
    const u = T.t / 1.5;
    const y = Math.round(T.y - u * 16);
    ctx.font = '10px "Press Start 2P", monospace';
    ctx.textBaseline = 'top';
    ctx.globalAlpha = u > 0.7 ? 1 - (u - 0.7) / 0.3 : 1;
    ctx.fillStyle = '#141d33';
    ctx.fillText(T.txt, Math.round(T.x - ctx.measureText(T.txt).width / 2) + 1, y + 1);
    ctx.fillStyle = T.col;
    ctx.fillText(T.txt, Math.round(T.x - ctx.measureText(T.txt).width / 2), y);
    ctx.globalAlpha = 1;
  }

  function draw(t) {
    ctx.drawImage(bg, 0, 0);

    // denyut cahaya gerbang
    for (let i = 0; i < AK.ZONES.length; i++) {
      const z = AK.ZONES[i];
      ctx.globalAlpha = 0.42 + 0.22 * Math.sin(t * 2.2 + i * 1.3);
      ctx.drawImage(glow[i], z.x - 30, 196, 60, 60);
      ctx.globalAlpha = 1;
    }

    for (const a of awan) gambarAwan(a);
    // simbol langit — berkedip lembut (bukan burung, hanya simbol)
    for (const s of simbolLangit) {
      ctx.globalAlpha = 0.3 + 0.18 * Math.sin(t * 2 + s.f * 3);
      mini(ctx, s.g, s.x, s.y + Math.sin(t + s.f) * 2, '#fffdf2');
      ctx.globalAlpha = 1;
    }

    gambarApi(t);
    gambarParon();
    gambarTeleskop(t);
    gambarKristal(t);
    gambarPanahTerbuka(t);

    // simbol hutan simbol melayang (pengganti kupu-kupu)
    for (const s of simbolHutan) {
      const u = s.umur / s.hidup;
      ctx.globalAlpha = u < 0.2 ? u / 0.2 : u > 0.75 ? (1 - u) / 0.25 : 1;
      mini(ctx, s.g, s.x + Math.sin(s.f) * 2, s.y, '#bff7ea');
      ctx.globalAlpha = 1;
    }

    // penduduk: bola-lentera wilayah (tanpa wajah)
    for (const n of npcs) {
      gambarBayangan(n.x, 247, 9);
      ctx.drawImage(n.frames[n.fi], Math.round(n.x - 8), 224 - (n.fi ? 1 : 0));
    }

    // Akio — bulatan emas murni, selalu terlihat, tak pernah tertelan layar
    gambarBayangan(player.x, player.y + 1, 12 * player.scale);
    const fr = player.masuk || player.pop
      ? akio.idle
      : (player.state === 'jalan' ? akio.jalan[Math.floor(player.walkT / 13) % 4] : akio.idle);
    const sq = player.squash * 0.14;
    const sw = 18 * player.scale * (1 + sq), sh = 18 * player.scale * (1 - sq);
    ctx.drawImage(fr, Math.round(player.x - sw / 2), Math.round(player.y - sh), Math.max(2, Math.round(sw)), Math.max(2, Math.round(sh)));

    // partikel
    for (const s of asap) {
      const u = s.umur / s.hidup;
      ctx.globalAlpha = 0.5 * (1 - u);
      const ss = Math.max(1, Math.round(s.s * (1 - u * 0.5)));
      P(s.x, s.y, ss, ss, '#dfe6f0');
      ctx.globalAlpha = 1;
    }
    for (const s of percik) {
      ctx.globalAlpha = 1 - s.umur / s.hidup;
      P(s.x, s.y, 1, 1, s.y < 238 ? '#ffd166' : '#ff9d4a');
      ctx.globalAlpha = 1;
    }
    for (const d of daun) P(d.x, d.y, 2, 1, '#4fa55e');
    for (const s of salju) P(s.x, s.y, 1, 1, '#eef4fa');
    for (const k of kilau) {
      const u = k.umur / k.hidup;
      ctx.globalAlpha = 1 - u;
      P(k.x, k.y - u * 8, 1, 1, '#fff3cf');
      ctx.globalAlpha = 1;
    }

    // buble bicara paling depan — bergantian, tak pernah saling menimpa
    let bubKanan = -999;
    for (const n of npcs) bubKanan = Math.max(bubKanan, gambarBuble(n, bubKanan));
    for (const T of teks) gambarTeksMelayang(T);
  }

  /* ---------- loop ---------- */
  let last = 0;
  function loop(ts) {
    const dt = Math.min(0.05, (ts - last) / 1000 || 0.016);
    last = ts;
    update(dt, ts / 1000);
    updatePartikel(dt, ts / 1000);
    draw(ts / 1000);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  /* ---------- intro ---------- */
  btnMasuk.addEventListener('click', () => {
    introEl.classList.add('pergi');
    setTimeout(() => { if (introEl.parentNode) introEl.parentNode.removeChild(introEl); }, 700);
  });

  /* ---------- API debug (QA) ---------- */
  window.AKDBG = {
    get: () => ({
      camX: 0,                                   // kamera abadi: tidak ada geser
      px: Math.round(player.x), py: Math.round(player.y),
      vx: Math.round(player.vx), dir: player.dir,
      state: player.state, target: player.target,
      masuk: player.masuk ? player.masuk.fase : null,
      muatAktif: muatEl.classList.contains('aktif'),
      skala: LANGKAH_SKALA[idxSkala],
    }),
    ke: x => { player.target = Math.max(12, Math.min(468, x)); },  // QA: perintahkan berjalan
  };
})();
