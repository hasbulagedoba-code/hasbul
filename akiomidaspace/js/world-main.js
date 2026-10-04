/* =========================================================
   DUNIA AKIOMIDA — Utama (world-main.js)
   Kamera hidup, input, gerbang dinamis, Akio, penduduk NPC, HUD, loop render
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
  const keys = { left: false, right: false };

  /* ---------- pemain & penduduk jelly ---------- */
  const player = new AK.Jelly({ x: 240, y: 0, r: 26, player: true, col: AK.PALETTE[3] });
  player.cy = AK.groundYAt(player.cx) - player.r * 0.92;

  const residents = [];
  /* dua penduduk di tiap wilayah — dunia terasa berpenghuni */
  const NPC_SPOTS = [
    { z: 0, dx: -185, col: 4 }, { z: 0, dx: 210, col: 1 },
    { z: 1, dx: -240, col: 1 }, { z: 1, dx: 175, col: 6 },
    { z: 2, dx: -160, col: 7 }, { z: 2, dx: 235, col: 2 },
    { z: 3, dx: -180, col: 0 }, { z: 3, dx: 205, col: 5 },
    { z: 4, dx: -195, col: 5 }, { z: 4, dx: 150, col: 3 },
    { z: 5, dx: -170, col: 2 }, { z: 5, dx: 215, col: 0 },
  ];
  let npi = 0;
  for (const s of NPC_SPOTS) {
    const x = AK.ZONES[s.z].x + s.dx;
    const j = new AK.Jelly({ x, y: 0, r: rand(16, 22), col: AK.PALETTE[s.col] });
    j.cy = AK.groundYAt(j.cx) - j.r * 0.92;
    // dua penduduk satu wilayah bicara kalimat berbeda, bergiliran tidak bersamaan
    j.say = { idx: npi % 2, until: -1, nextIn: 2.5 + npi * 2.1 };
    residents.push(j);
    npi++;
  }
  const everyone = [player, ...residents];

  /* sapaan penduduk per wilayah — runtut, hangat, tanpa metafora aneh */
  const NPC_LINES = [
    ['Selamat datang di Kamp Angka! Api unggun kami selalu disiapkan.',
     'Dari sini perjalananmu dimulai. Pelan-pelan saja.'],
    ['Daun di hutan ini berjatuhan pelan. Coba hitung yang lewatmu.',
     'Setiap tanda di batu punya arti. Kami menjaganya setiap hari.'],
    ['Udara gunung ini segar sekali. Awan di atasnya berulang dengan rapi.',
     'Kami menyusun batu dari yang kecil ke besar. Itu pekerjaan favorit kami.'],
    ['Rumah-rumah di kota ini dibangun dengan alasan yang runtut.',
     'Lentera menyala setiap sore. Sudah menjadi kebiasaan kami.'],
    ['Kristal di lembah ini berpendar saat ada yang datang berkunjung.',
     'Sunyi di lembah ini membantu berpikir dengan jernih.'],
    ['Salju di puncak turun satu per satu, tak pernah bertumpuk mendadak.',
     'Gerbang di sini masih disegel. Kami menunggu kabar baik.'],
  ];

  /* ---------- Akio & penduduk ---------- */
  const akioX = AK.ZONES[0].x - 150;
  const akio = new AK.Akio(akioX, AK.groundYAt(akioX) - 96);
  const glowGold = (() => {
    const c = document.createElement('canvas'); c.width = 64; c.height = 64;
    const g = c.getContext('2d');
    const rg = g.createRadialGradient(32, 32, 2, 32, 32, 30);
    rg.addColorStop(0, 'rgba(255,222,130,.9)'); rg.addColorStop(1, 'rgba(255,222,130,0)');
    g.fillStyle = rg; g.fillRect(0, 0, 64, 64);
    return c;
  })();

  const AKIO_MSG = [
    'Selamat datang di Dunia Akiomida. Aku Akio, pemandu perjalananmu di sini.',
    'Dunia ini punya enam wilayah. Setiap wilayah menyimpan satu peta materi matematika.',
    'Klik tanah untuk berjalan. Penduduk di tiap wilayah senang menyapamu.',
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
      drawBubbleAt(sx, gy - h - 150, 'Gerbang ini masih disegel. Akio akan memberi kabar saat terbuka.');
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
    // jangan sampai terpotong tepi layar — horizontal & vertikal selaras dengan tokohnya
    bx = Math.max(8, Math.min(bx, AK.VW - bw - 8));
    const by = Math.max(8, Math.min(byTop - bh, AK.H - bh - 8));
    const ekor = (by === byTop - bh);   // ekor hanya saat gelembung benar-benar di atas tokoh
    const tailX = Math.max(bx + 18, Math.min(cx0, bx + bw - 18));

    ctx.fillStyle = 'rgba(255,255,255,.95)';
    AK.rrect(ctx, bx, by, bw, bh, 14); ctx.fill();
    ctx.strokeStyle = 'rgba(30,58,95,.18)'; ctx.lineWidth = 1.5;
    AK.rrect(ctx, bx, by, bw, bh, 14); ctx.stroke();
    if (ekor) {
      ctx.beginPath();
      ctx.moveTo(tailX - 7, by + bh - 1); ctx.lineTo(tailX + 7, by + bh - 1);
      ctx.lineTo(tailX, by + bh + 8); ctx.closePath();
      ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.fill();
    }

    ctx.fillStyle = '#33475e';
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    lines.forEach((l, li) => ctx.fillText(l, bx + 14, by + 9 + li * lh));
  }

  /* ---------- kamera hidup ----------
     Layar tidak digeser manual: kamera selalu mengikuti pemain
     dengan halus, dan bernapas pelan saat berdiri diam. */
  function updateCamera(dt, t) {
    const follow = clamp(player.cx - VW * 0.45 + player.vx * 0.36, 0, Math.max(0, AK.WORLD_W - VW));
    let target = follow + Math.sin(t * 0.5) * 3;
    target = clamp(target, 0, Math.max(0, AK.WORLD_W - VW));
    const k = (AK.reducedMotion ? 6 : 5);
    camX = lerp(camX, target, Math.min(1, dt * k));
    AK.camX = camX;
  }

  /* ---------- input ----------
     Layar tidak bisa digeser manual — kamera hidup mengalir sendiri.
     Sentuhan pendek = berjalan/menyapa; sapuan panjang diabaikan. */
  let pDown = false, pStartX = 0, pStartY = 0, pMoved = false;

  canvas.addEventListener('pointerdown', (e) => {
    pDown = true; pMoved = false;
    pStartX = e.clientX; pStartY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener('pointermove', (e) => {
    if (pDown) {
      const dx = e.clientX - pStartX, dy = e.clientY - pStartY;
      if (!pMoved && Math.hypot(dx, dy) > 9) pMoved = true;
    } else {
      // kursor pointer di atas gerbang / Akio / penduduk
      const wx = camX + e.clientX;
      let over = false;
      for (const z of AK.ZONES) {
        const gy = AK.groundYAt(z.x);
        if (Math.abs(wx - z.x) < 100 && e.clientY > gy - z.gateH - 140 && e.clientY < gy + 24) { over = true; break; }
      }
      if (Math.abs(wx - akio.cx) < 46 && Math.abs(e.clientY - akio.cy) < 46) over = true;
      for (const r of residents) {
        if (Math.abs(wx - r.cx) < r.r + 14 && Math.abs(e.clientY - r.cy) < r.r + 14) { over = true; break; }
      }
      canvas.style.cursor = over ? 'pointer' : 'default';
    }
  });
  canvas.addEventListener('pointerup', (e) => {
    pDown = false;
    if (pMoved) return;
    handleClick(e.clientX, e.clientY);
  });
  canvas.addEventListener('pointercancel', () => { pDown = false; });

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

    // Akio
    if (Math.abs(wx - akio.cx) < 46 && Math.abs(py - akio.cy) < 46) {
      akio.poke();
      msgIdx = (msgIdx + 1) % AKIO_MSG.length;
      msgTimer = 0;
      return;
    }
    // penduduk: menyapa saat diklik
    for (const r of residents) {
      if (Math.abs(wx - r.cx) < r.r + 16 && Math.abs(py - r.cy) < r.r + 16) {
        r.poke();
        const zi = AK.zoneAt(r.cx);
        r.say.idx = (r.say.idx + 1) % NPC_LINES[zi].length;
        r.say.until = performance.now() / 1000 + 4.5;
        r.say.nextIn = rand(7, 12);
        return;
      }
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
    akio.update(dt);
    AK.updateAmbient(dt);
    updateCamera(dt, t);
    updateHUD();

    // pesan Akio bergilir
    if (!AK.reducedMotion) {
      msgTimer += dt;
      if (msgTimer > 6.8) { msgTimer = 0; msgIdx = (msgIdx + 1) % AKIO_MSG.length; }
    }
    // penduduk menyapa sendiri saat pemain lewat di dekatnya
    if (!AK.reducedMotion) {
      for (const r of residents) {
        r.say.nextIn -= dt;
        const near = Math.abs(player.cx - r.cx) < 170;
        if (near && r.say.nextIn <= 0) {
          r.say.until = t + 4.5;
          r.say.nextIn = rand(6, 11);
        }
        if (!near) {
          if (r.say.until > t + 1.2) r.say.until = t + 1.2;   // berhenti bicara saat pemain menjauh
          else if (t > r.say.until) r.say.until = -1;
        }
      }
    }
  }

  function render(t) {
    AK.drawSky(ctx, t, camX);
    AK.drawAmbientBack(ctx);
    AK.drawHills(ctx);
    AK.drawGround(ctx);
    AK.drawActivity(ctx, t);

    for (let i = 0; i < AK.ZONES.length; i++) drawGateDynamic(AK.ZONES[i], i, t);

    const viewL = camX - 120, viewR = camX + VW + 120;
    for (const j of everyone) {
      if (j.cx < viewL || j.cx > viewR) continue;
      j.draw(ctx);
    }
    if (akio.cx > viewL && akio.cx < viewR) akio.draw(ctx, glowGold);

    AK.drawAmbientFront(ctx, t);
    AK.drawVignette(ctx);

    // gelembung Akio & penduduk di lapisan paling atas
    if (started && akio.cx > viewL && akio.cx < viewR) {
      drawBubbleAt(akio.cx - camX + 10, akio.cy - akio.r - 26, AKIO_MSG[msgIdx]);
    }
    for (const r of residents) {
      if (r.say.until <= 0 || t > r.say.until) continue;
      const rsx = r.cx - camX;
      if (rsx < 90 || rsx > AK.VW - 90) continue;   // tanpa bubble tempelan di tepi layar
      if (r.cx < viewL || r.cx > viewR) continue;
      const zi = AK.zoneAt(r.cx);
      drawBubbleAt(rsx, r.cy - r.r - 14, NPC_LINES[zi][r.say.idx]);
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
    akio.poke();
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
      akio.baseY = AK.groundYAt(akioX) - 96;
      player.cy = Math.min(player.cy, AK.groundYAt(player.cx) - player.r * 0.92);
    }, 220);
  });

  // tunggu font agar teks papan nama terbaking rapi
  const fontReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  Promise.race([fontReady, new Promise(r => setTimeout(r, 1600))]).then(start);
})();
