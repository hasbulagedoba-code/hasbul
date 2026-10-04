/* =========================================================
   DUNIA AKIOMIDA — Utama (world-main.js)
   Kamera, input, gerbang dinamis, Pilo, HUD, loop render
   ========================================================= */
(function () {
  'use strict';
  const AK = window.AK;
  const TAU = AK.TAU, clamp = AK.clamp, lerp = AK.lerp, rand = AK.rand;

  const canvas = document.getElementById('panggung');
  const ctx = canvas.getContext('2d');
  const introEl = document.getElementById('intro');
  const hintEl = document.getElementById('hint');
  const chipEl = document.getElementById('chipWilayah');
  const chipNama = document.getElementById('chipNama');
  const chipSlogan = document.getElementById('chipSlogan');
  const btnKiri = document.getElementById('btnKiri');
  const btnKanan = document.getElementById('btnKanan');

  AK.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let VW = 0, VH = 0, dpr = 1;
  let camX = 0, started = false, last = 0;
  let manualUntil = -1, peek = 0;
  const keys = { left: false, right: false };

  /* ---------- pemain & penduduk jelly ---------- */
  const player = new AK.Jelly({ x: 240, y: 0, r: 26, player: true, col: AK.PALETTE[3] });
  player.cy = AK.groundYAt(player.cx) - player.r * 0.92;

  const residents = [];
  const residentSpots = [
    { x: 380, col: 0 }, { x: 660, col: 1 }, { x: 940, col: 6 },
    { x: 1700, col: 2 }, { x: 2100, col: 5 }, { x: 3000, col: 4 },
    { x: 4100, col: 0 }, { x: 5100, col: 2 }, { x: 6000, col: 5 },
  ];
  for (const s of residentSpots) {
    const j = new AK.Jelly({ x: s.x, y: 0, r: rand(17, 24), col: AK.PALETTE[s.col] });
    j.cy = AK.groundYAt(j.cx) - j.r * 0.92;
    residents.push(j);
  }
  const everyone = [player, ...residents];

  /* ---------- Pilo ---------- */
  const piloX = AK.ZONES[0].x - 85;
  const pilo = new AK.Pilo(piloX, AK.groundYAt(piloX) - 96);
  const glowGold = (() => {
    const c = document.createElement('canvas'); c.width = 64; c.height = 64;
    const g = c.getContext('2d');
    const rg = g.createRadialGradient(32, 32, 2, 32, 32, 30);
    rg.addColorStop(0, 'rgba(255,222,130,.9)'); rg.addColorStop(1, 'rgba(255,222,130,0)');
    g.fillStyle = rg; g.fillRect(0, 0, 64, 64);
    return c;
  })();

  const PILO_MSG = [
    'Selamat datang di Dunia Akiomida. Aku Pilo, pemandu perjalananmu di sini.',
    'Dunia ini punya enam wilayah. Setiap wilayah menyimpan satu peta materi matematika.',
    'Klik tanah untuk berjalan. Bola-bola di sini ramah — mereka suka ikut bermain.',
    'Gerbang Kamp Angka sudah terbuka. Di dalamnya ada sepuluh pos tur yang rapi.',
    'Wilayah lain masih disegel sementara. Kembali lagi nanti, dunia ini terus bertumbuh.',
  ];
  let msgIdx = 0, msgTimer = 0;

  /* ---------- kilau gerbang ---------- */
  const gateGlows = AK.ZONES.map(z => {
    const c = document.createElement('canvas'); c.width = 64; c.height = 64;
    const g = c.getContext('2d');
    const rg = g.createRadialGradient(32, 32, 2, 32, 32, 30);
    rg.addColorStop(0, z.gate.glow); rg.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = rg; g.fillRect(0, 0, 64, 64);
    return c;
  });
  const sparkleSeeds = AK.ZONES.map((z, i) => Array.from({ length: 6 }, (_, k) => rand(0, TAU) + k));

  let toast = { zone: -1, until: -1 };

  /* ---------- ukuran & bake ---------- */
  function sizeCanvas(rebake) {
    VW = window.innerWidth; VH = window.innerHeight;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = VW * dpr; canvas.height = VH * dpr;
    canvas.style.width = VW + 'px'; canvas.style.height = VH + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (rebake) AK.bakeAll(VW, VH, dpr);
    AK.initAmbient();
  }

  /* ---------- gerbang dinamis ---------- */
  function drawGateDynamic(z, i, t) {
    const sx = z.x - camX;
    if (sx < -260 || sx > VW + 260) return;
    const gy = AK.groundYAt(z.x), w = z.gateW, h = z.gateH;

    ctx.save();
    ctx.beginPath();
    AK.gatePath(ctx, sx, gy, w, h);
    ctx.clip();

    if (z.open) {
      ctx.fillStyle = z.gate.deep;
      ctx.fillRect(sx - w, gy - h * 1.3, w * 2, h * 1.5);
      for (let k = 0; k < 3; k++) {
        const ph = t * 0.55 + k * 2.1 + i;
        const bx = sx + Math.sin(ph) * w * 0.30;
        const by = gy - h * 0.52 + Math.cos(ph * 0.8) * h * 0.30;
        const rg = ctx.createRadialGradient(bx, by, 2, bx, by, w * 0.62);
        rg.addColorStop(0, z.gate.glow);
        rg.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.globalAlpha = 0.55 + Math.sin(t * 1.3 + k) * 0.15;
        ctx.fillStyle = rg;
        ctx.fillRect(bx - w, by - w, w * 2, w * 2);
      }
      ctx.globalAlpha = 0.25;
      const lg = ctx.createLinearGradient(0, gy - h, 0, gy);
      lg.addColorStop(0, 'rgba(255,255,255,.8)'); lg.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = lg;
      ctx.fillRect(sx - w / 2, gy - h, w, h);
      ctx.globalAlpha = 1;
    } else {
      const lg = ctx.createLinearGradient(0, gy - h, 0, gy);
      lg.addColorStop(0, 'rgba(38,48,64,.88)');
      lg.addColorStop(1, 'rgba(24,32,46,.94)');
      ctx.fillStyle = lg;
      ctx.fillRect(sx - w, gy - h * 1.3, w * 2, h * 1.5);
      ctx.globalAlpha = 0.16 + Math.sin(t * 0.8 + i * 2) * 0.06;
      ctx.fillStyle = z.gate.glow;
      ctx.fillRect(sx - w / 2, gy - h * 0.3, w, h * 0.3);
      ctx.globalAlpha = 1;
    }
    ctx.restore();

    // kilau mengorbit di gerbang terbuka
    if (z.open && !AK.reducedMotion) {
      const seeds = sparkleSeeds[i];
      for (let k = 0; k < seeds.length; k++) {
        const a = t * (0.5 + k * 0.07) + seeds[k];
        const px = sx + Math.cos(a) * w * 0.42;
        const py = gy - h * 0.55 + Math.sin(a) * h * 0.36;
        ctx.globalAlpha = 0.5 + Math.sin(a * 2.3) * 0.3;
        ctx.drawImage(gateGlows[i], px - 7, py - 7, 14, 14);
      }
      ctx.globalAlpha = 1;
    }

    // papan ajakan saat pemain dekat (gerbang terbuka)
    if (z.open && Math.abs(player.cx - z.x) < 170) {
      const label = 'Klik gerbang untuk masuk';
      ctx.font = '800 13px Nunito, sans-serif';
      const tw = ctx.measureText(label).width;
      const bw = tw + 34, bh = 30;
      const bx = sx - bw / 2, by = gy - h - 138 + Math.sin(t * 2.4) * 3;
      ctx.fillStyle = 'rgba(255,255,255,.94)';
      AK.rrect(ctx, bx, by, bw, bh, 15); ctx.fill();
      ctx.strokeStyle = z.gate.glow; ctx.lineWidth = 2;
      AK.rrect(ctx, bx, by, bw, bh, 15); ctx.stroke();
      ctx.fillStyle = '#2c4c6b';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(label, sx, by + bh / 2 + 1);
      // ekor kecil
      ctx.fillStyle = 'rgba(255,255,255,.94)';
      ctx.beginPath();
      ctx.moveTo(sx - 6, by + bh); ctx.lineTo(sx + 6, by + bh); ctx.lineTo(sx, by + bh + 8);
      ctx.closePath(); ctx.fill();
    }

    // gelembung toast gerbang tertutup
    if (toast.zone === i && t < toast.until) {
      drawBubbleAt(sx, gy - h - 150, 'Gerbang ini masih disegel. Pilo akan memberi kabar saat terbuka.');
    }
  }

  /* ---------- gelembung bicara ---------- */
  function drawBubbleAt(cx0, byTop, text) {
    ctx.font = '600 13.5px Nunito, sans-serif';
    const words = text.split(' ');
    const lines = []; let line = '';
    const maxW = 220;
    for (const w of words) {
      const test = line ? line + ' ' + w : w;
      if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = w; }
      else line = test;
    }
    if (line) lines.push(line);
    let bw = 0;
    for (const l of lines) bw = Math.max(bw, ctx.measureText(l).width);
    bw += 28;
    const lh = 19, bh = lines.length * lh + 18;
    let bx = cx0 - bw / 2;
    // jangan sampai terpotong tepi layar
    bx = Math.max(8, Math.min(bx, AK.VW - bw - 8));
    const tailX = Math.max(bx + 18, Math.min(cx0, bx + bw - 18));

    ctx.fillStyle = 'rgba(255,255,255,.95)';
    AK.rrect(ctx, bx, byTop - bh, bw, bh, 14); ctx.fill();
    ctx.strokeStyle = 'rgba(30,58,95,.18)'; ctx.lineWidth = 1.5;
    AK.rrect(ctx, bx, byTop - bh, bw, bh, 14); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(tailX - 7, byTop - 1); ctx.lineTo(tailX + 7, byTop - 1);
    ctx.lineTo(tailX, byTop + 8); ctx.closePath();
    ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.fill();

    ctx.fillStyle = '#33475e';
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    lines.forEach((l, li) => ctx.fillText(l, bx + 14, byTop - bh + 9 + li * lh));
  }

  /* ---------- kamera ---------- */
  function updateCamera(dt) {
    const follow = clamp(player.cx - VW * 0.45 + player.vx * 0.30, 0, Math.max(0, AK.WORLD_W - VW));
    let target = follow + peek * VW * 0.14;
    target = clamp(target, 0, Math.max(0, AK.WORLD_W - VW));
    const k = (AK.reducedMotion ? 4.5 : 3.2);
    if (performance.now() / 1000 < manualUntil) return;
    camX = lerp(camX, target, Math.min(1, dt * k));
    AK.camX = camX;
  }

  /* ---------- input ---------- */
  let pDown = false, pStartX = 0, pStartY = 0, pMoved = false, pStartCam = 0;

  canvas.addEventListener('pointerdown', (e) => {
    pDown = true; pMoved = false;
    pStartX = e.clientX; pStartY = e.clientY; pStartCam = camX;
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener('pointermove', (e) => {
    if (pDown) {
      const dx = e.clientX - pStartX, dy = e.clientY - pStartY;
      if (!pMoved && Math.hypot(dx, dy) > 9) { pMoved = true; canvas.classList.add('drag'); }
      if (pMoved) {
        camX = clamp(pStartCam - dx, 0, Math.max(0, AK.WORLD_W - VW));
        AK.camX = camX;
        manualUntil = performance.now() / 1000 + 2.2;
      }
    } else {
      // kursor pointer di atas gerbang / Pilo
      const wx = camX + e.clientX;
      let over = false;
      for (const z of AK.ZONES) {
        const gy = AK.groundYAt(z.x);
        if (Math.abs(wx - z.x) < 100 && e.clientY > gy - z.gateH - 140 && e.clientY < gy + 24) { over = true; break; }
      }
      if (Math.abs(wx - pilo.cx) < 46 && Math.abs(e.clientY - pilo.cy) < 46) over = true;
      canvas.style.cursor = over ? 'pointer' : 'grab';
    }
    // intip tepi (desktop)
    if (e.pointerType === 'mouse' && !pMoved) {
      peek = e.clientX < VW * 0.12 ? -1 : (e.clientX > VW * 0.88 ? 1 : 0);
    }
  });
  canvas.addEventListener('pointerup', (e) => {
    pDown = false; canvas.classList.remove('drag');
    if (pMoved) return;
    handleClick(e.clientX, e.clientY);
  });
  canvas.addEventListener('pointercancel', () => { pDown = false; canvas.classList.remove('drag'); });
  canvas.addEventListener('pointerleave', () => { peek = 0; });

  window.addEventListener('wheel', (e) => {
    if (!started) return;
    camX = clamp(camX + (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * 0.9,
      0, Math.max(0, AK.WORLD_W - VW));
    AK.camX = camX;
    manualUntil = performance.now() / 1000 + 2.2;
  }, { passive: true });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = true;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = true;
  });
  window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
  });

  function holdBtn(el, dir) {
    const on = (ev) => { ev.preventDefault(); keys[dir] = true; };
    const off = () => { keys[dir] = false; };
    el.addEventListener('pointerdown', on);
    el.addEventListener('pointerup', off);
    el.addEventListener('pointercancel', off);
    el.addEventListener('pointerleave', off);
  }
  holdBtn(btnKiri, 'left'); holdBtn(btnKanan, 'right');

  function handleClick(px, py) {
    if (!started) return;
    const wx = camX + px;

    // Pilo
    if (Math.abs(wx - pilo.cx) < 46 && Math.abs(py - pilo.cy) < 46) {
      pilo.poke();
      msgIdx = (msgIdx + 1) % PILO_MSG.length;
      msgTimer = 0;
      return;
    }
    // gerbang
    for (let i = 0; i < AK.ZONES.length; i++) {
      const z = AK.ZONES[i];
      const gy = AK.groundYAt(z.x);
      if (Math.abs(wx - z.x) < 100 && py > gy - z.gateH - 140 && py < gy + 24) {
        if (z.open) {
          bukaMuatan(z);
        } else {
          toast = { zone: i, until: performance.now() / 1000 + 2.8 };
        }
        return;
      }
    }
    // tanah → berjalan
    if (py > AK.groundYAt(wx) - 120) {
      player.targetX = clamp(wx, 40, AK.WORLD_W - 40);
      if (Math.abs(wx - player.cx) > 60 && player.grounded) player.jump(200);
      hideHint();
    }
  }

  /* ---------- layar muat gerbang ----------
     Iklan tidak lagi menumpang di dunia. Ia hanya tampil saat portal diklik:
     layar "menyiapkan bahan ajar" muncul 8 detik, lalu perjalanan
     dilanjutkan otomatis — tanpa hitungan detik. */
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
    muatAura.style.setProperty('--aura', warnaAura(z.gate.glow, 0.22));
    // slot iklan baru dipasang saat klik pertama (bukan saat halaman dibuka)
    if (!muatSlotTerpasang) {
      const slot = document.createElement('div');
      slot.className = 'ad-slot';
      muatSlot.appendChild(slot);   // ads.js otomatis menyuntik iklan ke sini
      muatSlotTerpasang = true;
    }
    muatEl.classList.add('aktif');
    muatEl.setAttribute('aria-hidden', 'false');
    muatTimer = setTimeout(() => { window.location.href = z.href; }, DURASI_MUAT);
  }

  function tutupMuatan() {
    clearTimeout(muatTimer);
    muatTimer = null;
    muatEl.classList.remove('aktif');
    muatEl.setAttribute('aria-hidden', 'true');
  }
  muatBatal.addEventListener('click', tutupMuatan);

  let hintHidden = false;
  function hideHint() {
    if (hintHidden) return;
    hintHidden = true;
    hintEl.classList.add('pudar');
  }
  setTimeout(hideHint, 14000);

  /* ---------- HUD wilayah ---------- */
  let curZone = -1;
  function updateHUD() {
    const zi = AK.zoneAt(player.cx);
    if (zi !== curZone) {
      curZone = zi;
      chipNama.textContent = AK.ZONES[zi].name;
      chipSlogan.textContent = AK.ZONES[zi].slogan;
      chipEl.classList.remove('tampil');
      void chipEl.offsetWidth;
      chipEl.classList.add('tampil');
    }
  }

  /* ---------- loop ---------- */
  function update(dt, t) {
    // kemudi tombol / keyboard
    if (keys.left || keys.right) {
      player.targetX = null;
      player.steerLock = true;
      const want = keys.left ? -250 : 250;
      player.vx += (want - player.vx) * Math.min(1, dt * 5);
      if (Math.abs(player.vx) > 30) hideHint();
    } else {
      player.steerLock = false;
    }
    for (const j of everyone) j.update(dt);
    pilo.update(dt);
    AK.updateAmbient(dt);
    updateCamera(dt);
    updateHUD();

    // pesan Pilo bergilir
    if (!AK.reducedMotion) {
      msgTimer += dt;
      if (msgTimer > 6.8) { msgTimer = 0; msgIdx = (msgIdx + 1) % PILO_MSG.length; }
    }
  }

  function render(t) {
    AK.drawSky(ctx, t, camX);
    AK.drawAmbientBack(ctx);
    AK.drawHills(ctx);
    AK.drawGround(ctx);

    for (let i = 0; i < AK.ZONES.length; i++) drawGateDynamic(AK.ZONES[i], i, t);

    const viewL = camX - 120, viewR = camX + VW + 120;
    for (const j of everyone) {
      if (j.cx < viewL || j.cx > viewR) continue;
      j.draw(ctx);
    }
    if (pilo.cx > viewL && pilo.cx < viewR) pilo.draw(ctx, glowGold);

    AK.drawAmbientFront(ctx, t);
    AK.drawVignette(ctx);

    // gelembung Pilo di lapisan paling atas
    if (started && pilo.cx > viewL && pilo.cx < viewR) {
      drawBubbleAt(pilo.cx - camX + 10, pilo.cy - pilo.r - 26, PILO_MSG[msgIdx]);
    }
  }

  function frame(ts) {
    const t = ts / 1000;
    if (!last) last = t;
    const dt = Math.min(0.033, t - last);
    last = t;
    update(dt, t);
    render(t);
    requestAnimationFrame(frame);
  }

  /* ---------- mulai ---------- */
  function start() {
    sizeCanvas(true);
    camX = clamp(player.cx - VW * 0.42, 0, Math.max(0, AK.WORLD_W - VW));
    AK.camX = camX;
    requestAnimationFrame(frame);
  }
  // kait debug (dipakai QA; tidak berpengaruh ke tampilan)
  window.AKDBG = { get: () => ({ camX: Math.round(camX), px: Math.round(player.cx), tx: player.targetX, vx: Math.round(player.vx), keys: { ...keys } }) };

  document.getElementById('btnMasuk').addEventListener('click', () => {
    introEl.classList.add('pergi');
    started = true;
    chipEl.classList.add('tampil');
    pilo.poke();
  });

  /* ---------- deteksi perangkat sentuh ---------- */
  if ('ontouchstart' in window || (navigator.maxTouchPoints || 0) > 0) {
    document.body.classList.add('perangkat-sentuh');
  }

  let rsTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(rsTimer);
    rsTimer = setTimeout(() => {
      const ratio = AK.WORLD_W > VW ? camX / (AK.WORLD_W - VW) : 0;
      sizeCanvas(true);
      camX = ratio * Math.max(0, AK.WORLD_W - VW);
      AK.camX = camX;
      pilo.baseY = AK.groundYAt(piloX) - 96;
      player.cy = Math.min(player.cy, AK.groundYAt(player.cx) - player.r * 0.92);
    }, 220);
  });

  // tunggu font agar teks papan nama terbaking rapi
  const fontReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  Promise.race([fontReady, new Promise(r => setTimeout(r, 1600))]).then(start);
})();
