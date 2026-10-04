/* =========================================================
   DUNIA AKIOMIDA — Utama (world-main.js)
   Kamera hidup, input, gerbang dinamis, Akio, penduduk NPC, HUD, loop render
   ========================================================= */
(function () {
  'use strict';
  const AK = window.AK;
  const TAU = AK.TAU, clamp = AK.clamp, lerp = AK.lerp, rand = AK.rand;

  const canvas = document.getElementById('panggung');
  const ctx = canvas.getContext('2d', { alpha: false });
  const introEl = document.getElementById('intro');
  const hintEl = document.getElementById('hint');
  const chipEl = document.getElementById('chipWilayah');
  const chipNama = document.getElementById('chipNama');
  const chipSlogan = document.getElementById('chipSlogan');

  AK.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let VW = 0, VH = 0, started = false, last = 0;
  /* Resolusi awal dibatasi 1.75x — cukup tajam, jauh lebih ringan dari 2x.
     Bila perangkat berat, kualitas adaptif menurunkannya bertahap sampai 1x. */
  let dpr = Math.min(1.75, window.devicePixelRatio || 1);
  let camX = 0;
  const keys = { left: false, right: false };

  /* ---------- pemain & penduduk jelly ---------- */
  /* pemain warna khas (karang lembut) — Akio tetap satu-satunya bola EMAS ber-mahkota
     supaya tidak ada lagi kebingungan "karakterku yang mana?" */
  const player = new AK.Jelly({ x: 240, y: 0, r: 26, player: true, col: AK.PALETTE[0] });
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

  /* ---------- sekuen masuk gerbang ----------
     Karakter TIDAK tiba-tiba hilang: ia berjalan ke gerbang,
     tersedot lembut ke pusatnya (masih terlihat), BARU layar
     'menyiapkan bahan ajar' muncul menggantikan dunia. */
  const masuk = { fase: 'idle', z: null, t: 0 };   // idle | jalan | telan | selesai
  const T_TELAN = 1.05;

  /* ---------- efek kaki: riak langkah & debu mendarat ---------- */
  const ripples = [];   // { x, y, t }  — lingkaran halus saat tanah diklik
  const dust = [];      // { x, y, vx, vy, age, life, r } — debu pendaratan

  /* ---------- ukuran & bake ---------- */
  function sizeCanvas(rebake) {
    VW = window.innerWidth; VH = window.innerHeight;
    canvas.width = Math.max(1, Math.round(VW * dpr));
    canvas.height = Math.max(1, Math.round(VH * dpr));
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
      // tiga pendaran mengambang — sprite yang sama, nol gradien baru per frame
      const rr = w * 0.62;
      for (let k = 0; k < 3; k++) {
        const ph = t * 0.55 + k * 2.1 + i;
        const bx = sx + Math.sin(ph) * w * 0.30;
        const by = gy - h * 0.52 + Math.cos(ph * 0.8) * h * 0.30;
        ctx.globalAlpha = 0.55 + Math.sin(t * 1.3 + k) * 0.15;
        ctx.drawImage(gateGlows[i], bx - rr, by - rr, rr * 2, rr * 2);
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

    // saat pemain tersedot: aura gerbang menguat perlahan — karakter tetap terlihat
    if (masuk.z === z && masuk.fase !== 'idle') {
      const u = masuk.fase === 'telan' ? clamp(masuk.t / T_TELAN, 0, 1) : 0;
      const gsz = w * (2.2 + u * 1.8);
      ctx.globalAlpha = 0.30 + u * 0.5 + Math.sin(t * 7) * 0.05;
      ctx.drawImage(gateGlows[i], sx - gsz / 2, gy - h * 0.45 - gsz / 2, gsz, gsz);
      ctx.globalAlpha = 1;
    }

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
  }

  /* papan ajakan & toast gerbang — digambar di gelombang UI paling atas
     supaya tak pernah tertimpa atau menimpa gelembung bicara */
  function drawGateUI(z, i, t) {
    const sx = z.x - camX;
    if (sx < -260 || sx > VW + 260) return;
    const gy = AK.groundYAt(z.x), h = z.gateH;

    // toast gerbang tertutup (jawaban langsung atas klik) — prioritas tertinggi
    if (toast.zone === i && t < toast.until) {
      drawBubbleAt(sx, gy - h - 150, 'Gerbang ini masih disegel. Akio akan memberi kabar saat terbuka.');
      return;
    }

    // papan ajakan saat pemain dekat (gerbang terbuka, tidak sedang masuk)
    if (z.open && masuk.fase === 'idle' && Math.abs(player.cx - z.x) < 170) {
      const label = 'Klik gerbang untuk masuk';
      ctx.font = '800 13px Nunito, sans-serif';
      const tw = ctx.measureText(label).width;
      const bw = tw + 34, bh = 30;
      const bx = sx - bw / 2, by = gy - h - 138 + Math.sin(t * 2.4) * 3;
      const rc = { x: bx, y: by, w: bw, h: bh + 8 };
      if (!rectsOverlap(rc)) {
        bubbleRects.push(rc);
        ctx.fillStyle = 'rgba(255,255,255,.94)';
        AK.rrect(ctx, bx, by, bw, bh, 15); ctx.fill();
        ctx.strokeStyle = z.gate.glow; ctx.lineWidth = 2;
        AK.rrect(ctx, bx, by, bw, bh, 15); ctx.stroke();
        ctx.fillStyle = '#2c4c6b';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(label, sx, by + bh / 2 + 1);
        ctx.fillStyle = 'rgba(255,255,255,.94)';
        ctx.beginPath();
        ctx.moveTo(sx - 6, by + bh); ctx.lineTo(sx + 6, by + bh); ctx.lineTo(sx, by + bh + 8);
        ctx.closePath(); ctx.fill();
      }
    }
  }

  /* ---------- gelembung bicara ----------
     Semua gelembung mendaftar kotaknya dulu: yang bertabrakan dengan
     gelembung lain ATAU dengan badan tokoh mana pun dilewati —
     tidak ada lagi teks menutupi wajah karakter. */
  let bubbleRects = [];
  let charRects = [];
  function rectsOverlap(rc) {
    for (const q of bubbleRects) {
      if (rc.x < q.x + q.w && rc.x + rc.w > q.x && rc.y < q.y + q.h && rc.y + rc.h > q.y) return true;
    }
    for (const q of charRects) {
      if (rc.x < q.x + q.w && rc.x + rc.w > q.x && rc.y < q.y + q.h && rc.y + rc.h > q.y) return true;
    }
    return false;
  }
  function drawBubbleAt(cx0, byTop, text) {
    ctx.font = '600 13.5px Nunito, sans-serif';
    const words = text.split(' ');
    const lines = []; let line = '';
    const maxW = Math.min(220, AK.VW - 40);
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

    // anti-tumpang tindih: kotak ini boleh tampil hanya jika bebas
    const rc = { x: bx, y: by, w: bw, h: bh + (ekor ? 8 : 0) };
    if (rectsOverlap(rc)) return false;
    bubbleRects.push(rc);

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
    return true;
  }

  /* ---------- kamera hidup — dengan JAMINAN KERAS ----------
     Kamera selalu mengikuti pemain, dan pemain TIDAK PERNAH boleh
     keluar dari pita aman layar (22%–72% lebar layar) — apa pun
     yang terjadi (lompatan dt, lag, sapuan cepat), posisinya
     dikoreksi seketika. Inilah yang dulu membuat "karakter hilang
     dan kamera kemana-mana"; sekarang mustahil terulang. */
  function updateCamera(dt, t) {
    const maxCam = Math.max(0, AK.WORLD_W - VW);
    const follow = player.cx - VW * 0.45 + clamp(player.vx, -320, 320) * 0.18;
    let target = clamp(follow, 0, maxCam);
    if (masuk.fase === 'idle' && Math.abs(player.vx) < 20) target += Math.sin(t * 0.5) * 3;
    target = clamp(target, 0, maxCam);
    camX = lerp(camX, target, Math.min(1, dt * 6.5));
    // pita aman: layar pemain antara 22% dan 72% lebar jendela
    const bandMin = Math.max(0, player.cx - VW * 0.72);
    const bandMax = Math.min(maxCam, player.cx - VW * 0.22);
    if (bandMin <= bandMax) camX = clamp(camX, bandMin, bandMax);
    AK.camX = camX;
  }

  /* ---------- input — satu bahasa untuk semua perangkat ----------
     TIDAK ADA tombol lagi. Ketuk tanah = berjalan ke titik itu
     (responsif sejak tekanan pertama, bukan menunggu lepas).
     Tahan & geser = menuntun: jari berada di mana, karakter
     berjalan ke sana. Keyboard tetap didukung. Kamera mengalir
     sendiri dan dijamin tidak pernah kehilangan karakter. */
  let pDown = false, pStartX = 0, pStartY = 0, pMoved = false;

  function tunjukJalan(px, py, denganRiak) {
    const wx = camX + px;
    player.targetX = clamp(wx, 40, AK.WORLD_W - 40);
    if (denganRiak) ripples.push({ x: wx, y: AK.groundYAt(wx), t: 0 });
    hideHint();
  }

  canvas.addEventListener('pointerdown', (e) => {
    if (!started) return;
    if (masuk.fase === 'telan' || masuk.fase === 'selesai') return;
    pDown = true; pMoved = false;
    pStartX = e.clientX; pStartY = e.clientY;
    try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
    const diTanah = e.clientY > AK.groundYAt(camX + e.clientX) - 120;
    if (masuk.fase === 'jalan') {
      // klik tanah saat menuju gerbang = batal halus, jalan ke titik baru
      if (diTanah) { masuk.fase = 'idle'; masuk.z = null; tunjukJalan(e.clientX, e.clientY, true); }
    } else if (diTanah) {
      tunjukJalan(e.clientX, e.clientY, true);
    }
  });
  canvas.addEventListener('pointermove', (e) => {
    if (pDown) {
      const dx = e.clientX - pStartX, dy = e.clientY - pStartY;
      if (!pMoved && Math.hypot(dx, dy) > 9) pMoved = true;
      // tahan & geser: karakter terus mengejar ujung jari/kursor
      if (pMoved && masuk.fase === 'idle' &&
          e.clientY > AK.groundYAt(camX + e.clientX) - 120) {
        tunjukJalan(e.clientX, e.clientY, false);
      }
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
    const wasDrag = pMoved;
    pDown = false;
    if (wasDrag) return;   // sapuan = menuntun, bukan klik
    handleClick(e.clientX, e.clientY);
  });
  canvas.addEventListener('pointercancel', () => { pDown = false; });
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = true;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = true;
  });
  window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
  });
  window.addEventListener('blur', () => { keys.left = false; keys.right = false; });

  function handleClick(px, py) {
    if (!started) return;
    // saat pemain sedang tersedot gerbang, dunia dikunci penuh
    if (masuk.fase === 'telan' || masuk.fase === 'selesai') return;
    const wx = camX + px;

    // sedang berjalan menuju gerbang — klik tanah membatalkan dengan halus
    if (masuk.fase === 'jalan') {
      if (py > AK.groundYAt(wx) - 120) {
        masuk.fase = 'idle'; masuk.z = null;
        player.targetX = clamp(wx, 40, AK.WORLD_W - 40);
        ripples.push({ x: wx, y: AK.groundYAt(wx), t: 0 });
      }
      return;
    }

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
          // karakter berjalan sendiri ke gerbang — tetap terlihat sepanjang jalan
          masuk.fase = 'jalan'; masuk.z = z; masuk.t = 0;
          player.targetX = z.x;
          hideHint();
        } else {
          toast = { zone: i, until: performance.now() / 1000 + 2.8 };
        }
        return;
      }
    }
    // tanah → berjalan (riak halus sebagai umpan balik)
    if (py > AK.groundYAt(wx) - 120) {
      player.targetX = clamp(wx, 40, AK.WORLD_W - 40);
      ripples.push({ x: wx, y: AK.groundYAt(wx), t: 0 });
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
    // salah klik: pemain muncul lagi di depan gerbang dengan pop halus
    if (masuk.fase === 'selesai') {
      const z = masuk.z;
      player.cx = clamp(z.x - z.gateW * 0.9, 40, AK.WORLD_W - 40);
      player.cy = AK.groundYAt(player.cx) - player.r * 0.92;
      player.vx = 0; player.vy = 0;
      player.grounded = true;
      player.masukScale = 0.25;
      player.popUp = true;
      masuk.fase = 'idle';
      masuk.z = null;
    }
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
    // pop kembali dari salah klik: pemain membesar mulus lalu mendarat
    if (player.popUp && player.masukScale != null) {
      player.masukScale += dt * 2.6;
      if (player.masukScale >= 1) {
        player.masukScale = null; player.popUp = false;
        player.impact(430);
      }
    }

    // sekuen masuk gerbang: jalan → tersedot → layar muat
    if (masuk.fase === 'jalan') {
      player.targetX = masuk.z.x;
      if (Math.abs(masuk.z.x - player.cx) < 34) {
        player.targetX = null; player.vx = 0;
        player.grounded = false;
        masuk.fase = 'telan'; masuk.t = 0;
      }
    } else if (masuk.fase === 'telan') {
      masuk.t += dt;
      const u = clamp(masuk.t / T_TELAN, 0, 1);
      const e = u * u * (3 - 2 * u);   // smoothstep — makin akhir makin cepat, alami
      // lantai 0.28: karakter mengecil TETAPI tetap terlihat sampai overlay naik
      player.masukScale = 1 - 0.72 * e;
      const gy = AK.groundYAt(masuk.z.x);
      player.cx = lerp(player.cx, masuk.z.x, Math.min(1, dt * 9));
      player.cy = lerp(player.cy, gy - masuk.z.gateH * 0.40, Math.min(1, dt * 5.2));
      player.vx = 0; player.vy = 0;
      player.rot += dt * 1.2;
      if (u >= 1) { masuk.fase = 'selesai'; bukaMuatan(masuk.z); }
    }

    // kemudi tombol / keyboard (terkunci saat sedang masuk gerbang)
    if (masuk.fase === 'idle' && (keys.left || keys.right)) {
      player.targetX = null;
      player.steerLock = true;
      const want = keys.left ? -250 : 250;
      player.vx += (want - player.vx) * Math.min(1, dt * 3.8);   // tanjak masuk mulus
      if (Math.abs(player.vx) > 30) hideHint();
    } else if (masuk.fase === 'idle') {
      player.steerLock = false;
    }
    for (const j of everyone) j.update(dt);
    AK.avoidX = player.cx;   // NPC menjauh dari sini saat memilih arah wander

    // saling menjelak — tapi PEMAIN TIDAK PERNAH digeser tanpa input:
    // dulu NPC yang berjalan menabrak pemain ikut mendorongnya berkali-kali,
    // sehingga karakter "melaju sendiri" saat dibiarkan. Kini hanya NPC yang mengalah.
    for (let a = 0; a < everyone.length; a++) {
      for (let b = a + 1; b < everyone.length; b++) {
        const A = everyone[a], B = everyone[b];
        if (A.masukScale != null || B.masukScale != null) continue;
        const dx = B.cx - A.cx, min = (A.r + B.r) * 0.8;
        const adx = Math.abs(dx);
        if (adx > 0.01 && adx < min && Math.abs(A.cy - B.cy) < (A.r + B.r) * 0.85) {
          const push = (min - adx) * Math.min(1, dt * 3);
          const sgn = dx < 0 ? -1 : 1;
          if (A.isPlayer) {
            B.cx = clamp(B.cx + push * sgn, 30, AK.WORLD_W - 30);
          } else if (B.isPlayer) {
            A.cx = clamp(A.cx - push * sgn, 30, AK.WORLD_W - 30);
          } else {
            A.cx = clamp(A.cx - push * 0.5 * sgn, 30, AK.WORLD_W - 30);
            B.cx = clamp(B.cx + push * 0.5 * sgn, 30, AK.WORLD_W - 30);
          }
        }
      }
    }

    // debu pendaratan — dunia terasa berbobot & hidup
    for (const j of everyone) {
      if (j.lastImpact > 0.3) {
        const gyj = AK.groundYAt(j.cx);
        const n = Math.round(3 + j.lastImpact * 6);
        for (let i2 = 0; i2 < n; i2++) {
          dust.push({
            x: j.cx + rand(-10, 10), y: gyj - rand(0, 6),
            vx: rand(-46, 46), vy: rand(-64, -16) * (0.6 + j.lastImpact * 0.5),
            age: 0, life: rand(0.35, 0.7), r: rand(2, 4.6)
          });
        }
        j.lastImpact = 0;
      }
    }
    for (let i = dust.length - 1; i >= 0; i--) {
      const s = dust[i];
      s.age += dt; s.x += s.vx * dt; s.y += s.vy * dt; s.vy += 54 * dt; s.vx *= Math.pow(0.4, dt);
      if (s.age > s.life) dust.splice(i, 1);
    }
    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].t += dt;
      if (ripples[i].t > 0.6) ripples.splice(i, 1);
    }

    akio.update(dt);
    AK.updateAmbient(dt);
    updateCamera(dt, t);
    updateHUD();

    // pesan Akio bergilir — hanya setelah masuk dunia & pemain di dekatnya
    const akioNear = Math.abs(player.cx - akio.cx) < 480;
    if (started && !AK.reducedMotion && akioNear) {
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

  function drawRipples(ctx) {
    for (const r of ripples) {
      const u = r.t / 0.6;
      ctx.globalAlpha = (1 - u) * 0.5;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(r.x - camX, r.y, 8 + u * 40, (8 + u * 40) * 0.3, 0, 0, TAU);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function drawDust(ctx) {
    for (const s of dust) {
      ctx.globalAlpha = Math.max(0, 1 - s.age / s.life) * 0.5;
      ctx.fillStyle = '#e8e0cb';
      ctx.beginPath(); ctx.arc(s.x - camX, s.y, s.r, 0, TAU); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function render(t) {
    AK.drawSky(ctx, t, camX);
    AK.drawAmbientBack(ctx);
    AK.drawHills(ctx);
    AK.drawGround(ctx);
    AK.drawActivity(ctx, t);
    drawRipples(ctx);

    for (let i = 0; i < AK.ZONES.length; i++) drawGateDynamic(AK.ZONES[i], i, t);

    const viewL = camX - 120, viewR = camX + VW + 120;
    for (const j of everyone) {
      if (j.cx < viewL || j.cx > viewR) continue;
      j.draw(ctx);
    }
    drawDust(ctx);
    if (akio.cx > viewL && akio.cx < viewR) akio.draw(ctx, glowGold);

    AK.drawAmbientFront(ctx, t);
    AK.drawVignette(ctx);

    /* ---------- gelombang UI: gelembung anti-tumpuk ---------- */
    bubbleRects = [];
    charRects = [];
    // badan tokoh jadi zona terlarang bagi gelembung — wajah tak pernah tertutup teks
    const addCharRect = (j, ekstraAtas) => {
      const R = j.r * ((j.masukScale != null) ? Math.max(0.25, j.masukScale) : 1);
      charRects.push({ x: j.cx - camX - R - 5, y: j.cy - R - (ekstraAtas || 5), w: R * 2 + 10, h: R * 2 + (ekstraAtas || 5) + 5 });
    };
    addCharRect(player);
    if (akio.cx > viewL && akio.cx < viewR) addCharRect(akio, 24);   // +mahkota
    for (const r of residents) if (r.cx > viewL && r.cx < viewR) addCharRect(r);
    // toast gerbang tertutup — jawaban langsung, prioritas tertinggi
    for (let i = 0; i < AK.ZONES.length; i++) {
      const z = AK.ZONES[i];
      if (toast.zone === i && t < toast.until) drawGateUI(z, i, t);
    }
    // Akio — hanya bicara saat pemain di dekatnya
    const akioNear = started && Math.abs(player.cx - akio.cx) < 480;
    if (akioNear && akio.cx > viewL && akio.cx < viewR) {
      drawBubbleAt(akio.cx - camX + 10, akio.cy - akio.r - 38, AKIO_MSG[msgIdx]);
    }
    // penduduk — yang paling dekat pemain tampil lebih dulu
    const talkers = residents
      .filter(r => r.say.until > 0 && t < r.say.until && r.cx > viewL && r.cx < viewR)
      .sort((a, b) => Math.abs(a.cx - player.cx) - Math.abs(b.cx - player.cx));
    for (const r of talkers) {
      const rsx = r.cx - camX;
      if (rsx < 90 || rsx > AK.VW - 90) continue;   // tanpa bubble tempelan di tepi layar
      const zi = AK.zoneAt(r.cx);
      drawBubbleAt(rsx, r.cy - r.r - 16, NPC_LINES[zi][r.say.idx]);
    }
    // papan ajakan gerbang — paling akhir, mundur bila tempatnya dipakai
    for (let i = 0; i < AK.ZONES.length; i++) {
      const z = AK.ZONES[i];
      if (!(toast.zone === i && t < toast.until)) drawGateUI(z, i, t);
    }
  }

  /* ---------- kualitas adaptif ----------
     Bila rata-rata fps di bawah 42 dua kali berturut-turut (dan dunia
     sedang tenang), resolusi kanvas diturunkan bertahap sampai 1x —
     dunia tetap mulus di perangkat mana pun, tanpa pengaturan manual. */
  let fpsAcc = 0, fpsN = 0, fpsStreak = 0;
  function monitorFps(raw) {
    if (raw > 0.0005 && raw < 1) { fpsAcc += raw; fpsN++; }
    if (fpsN < 45) return;
    const avg = fpsAcc / fpsN; fpsAcc = 0; fpsN = 0;
    if (avg > 1 / 42 && masuk.fase === 'idle') {
      if (++fpsStreak >= 2 && dpr > 1.01) {
        fpsStreak = 0;
        dpr = Math.max(1, dpr - 0.25);
        sizeCanvas(true);
      }
    } else {
      fpsStreak = 0;
    }
  }

  function frame(ts) {
    const t = ts / 1000;
    if (!last) last = t;
    const raw = t - last;
    last = t;
    const dt = clamp(raw, 0, 0.033);
    update(dt, t);
    if (started) render(t);   // intro masih menutupi kanvas — render hemat
    monitorFps(raw);
    requestAnimationFrame(frame);
  }

  /* ---------- mulai ----------
     Dunia langsung hidup tanpa menunggu font — layar tidak pernah
     kosong. Papan nama gerbang dibake ulang begitu Nunito siap. */
  function start() {
    sizeCanvas(true);
    camX = clamp(player.cx - VW * 0.42, 0, Math.max(0, AK.WORLD_W - VW));
    AK.camX = camX;
    render(0);   // satu frame pemanasan — dunia sudah siap di balik intro
    requestAnimationFrame(frame);
  }
  start();
  const fontReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  Promise.race([fontReady, new Promise(r => setTimeout(r, 1600))]).then(() => {
    AK.bakeAll(VW, VH, dpr);   // papan nama kini terbaking dengan font Nunito
  });

  // kait debug (dipakai QA; tidak berpengaruh ke tampilan)
  window.AKDBG = { get: () => ({ camX: Math.round(camX), px: Math.round(player.cx), tx: player.targetX, vx: Math.round(player.vx), dpr, masuk: masuk.fase, npc: residents.map(r => ({ x: Math.round(r.cx), y: Math.round(r.cy), r: r.r })) }) };

  document.getElementById('btnMasuk').addEventListener('click', () => {
    introEl.classList.add('pergi');
    started = true;
    chipEl.classList.add('tampil');
    akio.poke();
  });

  let rsTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(rsTimer);
    rsTimer = setTimeout(() => {
      sizeCanvas(true);
      // kamera langsung menampung pemain — tidak ada lompatan, tidak ada hilang
      camX = clamp(player.cx - VW * 0.45, 0, Math.max(0, AK.WORLD_W - VW));
      AK.camX = camX;
      akio.baseY = AK.groundYAt(akioX) - 96;
      player.cy = Math.min(player.cy, AK.groundYAt(player.cx) - player.r * 0.92);
    }, 220);
  });
})();
