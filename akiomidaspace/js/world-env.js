/* =========================================================
   DUNIA AKIOMIDA — Lingkungan (world-env.js)
   Konstanta, zona virtual, baking lapisan statis, partikel
   ========================================================= */
window.AK = (function () {
  'use strict';

  const TAU = Math.PI * 2;
  const rand  = (a, b) => a + Math.random() * (b - a);
  const randi = (a, b) => Math.floor(rand(a, b + 1));
  const clamp = (v, a, b) => v < a ? a : (v > b ? b : v);
  const lerp  = (a, b, t) => a + (b - a) * t;

  const WORLD_W = 6400;

  /* ---------- enam wilayah (nama virtual, tanpa jenjang sekolah) ---------- */
  const ZONES = [
    { name: 'Kamp Angka',        slogan: 'Wilayah permulaan perjalanan',   href: 'kamp-angka-matematika.html',    open: true,  x: 520,  biome: 'kamp',
      gate: { glow: '#63c8ff', deep: '#1c6fb4', stone: '#c9b28f', stoneD: '#a3895f', plate: '#8a6a43' } },
    { name: 'Hutan Simbol',      slogan: 'Wilayah bahasa dan tanda',        href: 'hutan-simbol-matematika.html',      open: false, x: 1560, biome: 'hutan',
      gate: { glow: '#4fe3c8', deep: '#0d8a74', stone: '#b9c9b2', stoneD: '#8fa58c', plate: '#5d7a55' } },
    { name: 'Pegunungan Pola',   slogan: 'Wilayah susunan dan bentuk',      href: 'pegunungan-pola-matematika.html',      open: false, x: 2600, biome: 'gunung',
      gate: { glow: '#ffd166', deep: '#c07d0c', stone: '#cfc3ae', stoneD: '#a8977c', plate: '#8a7454' } },
    { name: 'Kota Bukti',        slogan: 'Wilayah alasan dan pembuktian',   href: 'kota-bukti-matematika.html',  open: false, x: 3640, biome: 'kota',
      gate: { glow: '#ff9d9d', deep: '#bd5a5f', stone: '#d8c6c2', stoneD: '#ab8f8c', plate: '#96685f' } },
    { name: 'Lembah Kedalaman',  slogan: 'Wilayah pemahaman yang dalam',    href: 'lembah-kedalaman-matematika.html', open: false, x: 4680, biome: 'lembah',
      gate: { glow: '#bb8fff', deep: '#6a3fc0', stone: '#b7aecb', stoneD: '#8d83a8', plate: '#6b5f92' } },
    { name: 'Puncak Riset',      slogan: 'Wilayah para penjelajah terdepan', href: 'puncak-riset-matematika.html', open: false, x: 5720, biome: 'salju',
      gate: { glow: '#a5d8ff', deep: '#4a7fc0', stone: '#cdd6de', stoneD: '#9fb0c0', plate: '#64798f' } },
  ];
  ZONES.forEach((z, i) => { z.gateW = 108; z.gateH = 196 + i * 8; });

  const AK = { TAU, rand, randi, clamp, lerp, WORLD_W, ZONES };

  /* ---------- ukuran & medan ---------- */
  AK.H = 800; AK.VW = 1280;
  function groundYAt(x) {
    return AK.H * 0.80 + Math.sin(x * 0.0019) * 9 + Math.sin(x * 0.00063 + 1.7) * 15;
  }
  AK.groundYAt = groundYAt;

  function zoneAt(x) {
    let idx = 0;
    for (let i = 0; i < ZONES.length; i++) if (x >= ZONES[i].x - 520) idx = i;
    return idx;
  }
  AK.zoneAt = zoneAt;

  /* ---------- geometri gerbang (dipakai bake & gambar dinamis) ---------- */
  function gatePath(ctx, x, gy, w, h) {
    ctx.moveTo(x - w / 2, gy + 6);
    ctx.lineTo(x - w / 2, gy - h * 0.55);
    ctx.quadraticCurveTo(x - w / 2, gy - h, x, gy - h);
    ctx.quadraticCurveTo(x + w / 2, gy - h, x + w / 2, gy - h * 0.55);
    ctx.lineTo(x + w / 2, gy + 6);
    ctx.closePath();
  }
  AK.gatePath = gatePath;

  /* =========================================================
     SPRITE KECIL (awan, cahaya)
     ========================================================= */
  function rrect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  AK.rrect = rrect;

  function makeCloud() {
    const c = document.createElement('canvas'); c.width = 240; c.height = 100;
    const g = c.getContext('2d');
    const blob = (x, y, r) => {
      const rg = g.createRadialGradient(x, y - r * 0.25, r * 0.2, x, y, r);
      rg.addColorStop(0, 'rgba(255,255,255,.95)');
      rg.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = rg; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill();
    };
    blob(70, 62, 40); blob(120, 48, 50); blob(170, 62, 38); blob(120, 70, 42);
    return c;
  }
  function makeGlow(color) {
    const c = document.createElement('canvas'); c.width = 64; c.height = 64;
    const g = c.getContext('2d');
    const rg = g.createRadialGradient(32, 32, 2, 32, 32, 30);
    rg.addColorStop(0, color); rg.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = rg; g.fillRect(0, 0, 64, 64);
    return c;
  }

  /* =========================================================
     PROPERTI WILAYAH (digambar sekali ke kanvas tanah)
     ========================================================= */
  function treeRound(ctx, x, y, s, base, dark, light) {
    ctx.strokeStyle = '#8a6a48'; ctx.lineWidth = 7 * s; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 4 * s, y - 22 * s, x + 2 * s, y - 40 * s); ctx.stroke();
    const blob = (bx, by, r, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(bx, by, r, 0, TAU); ctx.fill(); };
    blob(x - 15 * s, y - 46 * s, 20 * s, dark);
    blob(x + 14 * s, y - 50 * s, 22 * s, dark);
    blob(x, y - 62 * s, 24 * s, base);
    blob(x - 7 * s, y - 66 * s, 15 * s, light);
  }

  function pineTree(ctx, x, y, s, base, dark, snow) {
    ctx.fillStyle = '#7d5c3e';
    ctx.fillRect(x - 3 * s, y - 12 * s, 6 * s, 14 * s);
    const tri = (ty, w, col) => {
      ctx.fillStyle = col; ctx.beginPath();
      ctx.moveTo(x, ty); ctx.lineTo(x - w, ty + 26 * s); ctx.lineTo(x + w, ty + 26 * s);
      ctx.closePath(); ctx.fill();
    };
    tri(y - 78 * s, 16 * s, dark); tri(y - 58 * s, 22 * s, base); tri(y - 36 * s, 28 * s, dark);
    if (snow) {
      ctx.fillStyle = 'rgba(255,255,255,.9)';
      ctx.beginPath(); ctx.moveTo(x, y - 84 * s); ctx.lineTo(x - 9 * s, y - 68 * s); ctx.lineTo(x + 9 * s, y - 68 * s); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(x - 15 * s, y - 50 * s); ctx.lineTo(x - 22 * s, y - 38 * s); ctx.lineTo(x - 8 * s, y - 38 * s); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(x + 15 * s, y - 50 * s); ctx.lineTo(x + 22 * s, y - 38 * s); ctx.lineTo(x + 8 * s, y - 38 * s); ctx.closePath(); ctx.fill();
    }
  }

  function tent(ctx, x, y, s, colA, colB) {
    ctx.fillStyle = colA;
    ctx.beginPath(); ctx.moveTo(x - 46 * s, y); ctx.lineTo(x, y - 62 * s); ctx.lineTo(x + 46 * s, y); ctx.closePath(); ctx.fill();
    ctx.fillStyle = colB;
    ctx.beginPath(); ctx.moveTo(x - 13 * s, y); ctx.lineTo(x, y - 40 * s); ctx.lineTo(x + 13 * s, y); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#7d5c3e'; ctx.lineWidth = 2.5 * s; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x, y - 62 * s); ctx.lineTo(x, y - 80 * s); ctx.stroke();
    ctx.fillStyle = '#f28f8f';
    const w = Math.sin(x) * 4;
    ctx.beginPath(); ctx.moveTo(x, y - 80 * s); ctx.lineTo(x + 20 * s + w, y - 74 * s); ctx.lineTo(x, y - 70 * s); ctx.closePath(); ctx.fill();
  }

  function campfire(ctx, x, y) {
    ctx.strokeStyle = '#7d5c3e'; ctx.lineWidth = 7; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x - 16, y - 4); ctx.lineTo(x + 16, y - 10); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - 16, y - 10); ctx.lineTo(x + 16, y - 4); ctx.stroke();
    ctx.fillStyle = '#9aa4ad';
    for (let i = 0; i < 5; i++) { const a = i / 5 * TAU; ctx.beginPath(); ctx.arc(x + Math.cos(a) * 26, y + 4, 5, 0, TAU); ctx.fill(); }
    const fl = (w, h, col) => {
      ctx.fillStyle = col; ctx.beginPath();
      ctx.moveTo(x, y - h); ctx.quadraticCurveTo(x + w, y - h * 0.4, x, y);
      ctx.quadraticCurveTo(x - w, y - h * 0.4, x, y); ctx.fill();
    };
    fl(13, 34, '#ff9d4d'); fl(8, 22, '#ffd166');
  }

  function symbolStone(ctx, x, y, s, glyph) {
    ctx.fillStyle = '#a9b6a4';
    ctx.beginPath(); ctx.ellipse(x, y - 16 * s, 24 * s, 18 * s, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.28)';
    ctx.beginPath(); ctx.ellipse(x - 7 * s, y - 22 * s, 9 * s, 6 * s, -0.4, 0, TAU); ctx.fill();
    ctx.fillStyle = '#5d7a55';
    ctx.font = '800 ' + Math.round(20 * s) + 'px Nunito, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(glyph, x, y - 15 * s);
  }

  function boulder(ctx, x, y, s) {
    ctx.fillStyle = '#b3a68e';
    ctx.beginPath();
    ctx.moveTo(x - 30 * s, y); ctx.lineTo(x - 24 * s, y - 26 * s); ctx.lineTo(x - 4 * s, y - 34 * s);
    ctx.lineTo(x + 20 * s, y - 24 * s); ctx.lineTo(x + 30 * s, y); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.22)';
    ctx.beginPath(); ctx.ellipse(x - 8 * s, y - 24 * s, 10 * s, 6 * s, -0.3, 0, TAU); ctx.fill();
    ctx.strokeStyle = '#8a7c62'; ctx.lineWidth = 2 * s;
    ctx.beginPath(); ctx.arc(x, y - 16 * s, 8 * s, 0.4, 5.2); ctx.stroke();
    ctx.beginPath(); ctx.arc(x, y - 16 * s, 4.5 * s, 3.4, 8.4); ctx.stroke();
  }

  function house(ctx, x, y, s, wall, roof) {
    // dinding bergradasi — tidak lagi datar sekotak
    const wg = ctx.createLinearGradient(x, y - 52 * s, x, y);
    wg.addColorStop(0, '#ffffff'); wg.addColorStop(0.18, wall); wg.addColorStop(1, wall);
    ctx.fillStyle = wg;
    rrect(ctx, x - 44 * s, y - 52 * s, 88 * s, 52 * s, 8 * s); ctx.fill();
    // cerobong — rumah di kota punya aktivitas (asap hangat)
    ctx.fillStyle = '#c9a685';
    rrect(ctx, x + 24 * s, y - 86 * s, 11 * s, 24 * s, 3 * s); ctx.fill();
    ctx.fillStyle = roof;
    ctx.beginPath(); ctx.moveTo(x - 56 * s, y - 50 * s); ctx.lineTo(x, y - 92 * s); ctx.lineTo(x + 56 * s, y - 50 * s); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,.08)';
    ctx.beginPath(); ctx.moveTo(x - 56 * s, y - 50 * s); ctx.lineTo(x, y - 92 * s); ctx.lineTo(x + 8 * s, y - 50 * s); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#8a6a48';
    ctx.beginPath(); ctx.arc(x, y - 18 * s, 13 * s, Math.PI, 0);
    ctx.rect(x - 13 * s, y - 18 * s, 26 * s, 18 * s); ctx.fill();
    ctx.fillStyle = '#bfe0f5';
    ctx.beginPath(); ctx.arc(x - 26 * s, y - 34 * s, 8 * s, 0, TAU); ctx.fill();
    ctx.strokeStyle = wall; ctx.lineWidth = 2 * s; ctx.stroke();
  }

  function lanternPost(ctx, x, y) {
    ctx.strokeStyle = '#6b5340'; ctx.lineWidth = 5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 64); ctx.quadraticCurveTo(x, y - 74, x + 12, y - 74); ctx.stroke();
    ctx.fillStyle = '#ffd166'; rrect(ctx, x + 6, y - 70, 12, 16, 4); ctx.fill();
    ctx.fillStyle = 'rgba(255,209,102,.30)';
    ctx.beginPath(); ctx.arc(x + 12, y - 62, 16, 0, TAU); ctx.fill();
  }

  function column(ctx, x, y, s) {
    ctx.fillStyle = '#e2d5c8'; ctx.fillRect(x - 10 * s, y - 74 * s, 20 * s, 74 * s);
    ctx.fillStyle = '#c8b8a8';
    ctx.fillRect(x - 10 * s, y - 74 * s, 4 * s, 74 * s);
    ctx.fillRect(x + 2 * s, y - 74 * s, 4 * s, 74 * s);
    ctx.fillStyle = '#efe4d8';
    rrect(ctx, x - 15 * s, y - 82 * s, 30 * s, 10 * s, 3 * s); ctx.fill();
    rrect(ctx, x - 14 * s, y - 6 * s, 28 * s, 8 * s, 3 * s); ctx.fill();
  }

  function crystal(ctx, x, y, s, col) {
    const shard = (dx, w, h, a) => {
      ctx.fillStyle = col; ctx.globalAlpha = a;
      ctx.beginPath();
      ctx.moveTo(x + dx, y); ctx.lineTo(x + dx - w, y - h * 0.42); ctx.lineTo(x + dx - w * 0.5, y - h);
      ctx.lineTo(x + dx + w * 0.55, y - h * 0.62); ctx.lineTo(x + dx + w, y); ctx.closePath(); ctx.fill();
      ctx.globalAlpha = Math.min(1, a + 0.2);
      ctx.beginPath();
      ctx.moveTo(x + dx - w * 0.5, y - h); ctx.lineTo(x + dx - w, y - h * 0.42); ctx.lineTo(x + dx - w * 0.2, y - h * 0.36);
      ctx.closePath(); ctx.fill();
      ctx.globalAlpha = 1;
    };
    shard(-20 * s, 9 * s, 34 * s, 0.75); shard(16 * s, 10 * s, 40 * s, 0.8); shard(0, 12 * s, 58 * s, 0.9);
  }

  function flower(ctx, x, y, col) {
    ctx.strokeStyle = '#5d9950'; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 2, y - 6, x, y - 11); ctx.stroke();
    ctx.fillStyle = col;
    for (let i = 0; i < 5; i++) {
      const a = i / 5 * TAU;
      ctx.beginPath(); ctx.arc(x + Math.cos(a) * 3.2, y - 12 + Math.sin(a) * 3.2, 2.4, 0, TAU); ctx.fill();
    }
    ctx.fillStyle = '#ffd166'; ctx.beginPath(); ctx.arc(x, y - 12, 1.8, 0, TAU); ctx.fill();
  }

  function grassTuft(ctx, x, y, col) {
    ctx.strokeStyle = col; ctx.lineWidth = 1.8; ctx.lineCap = 'round';
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath(); ctx.moveTo(x + i * 3, y);
      ctx.quadraticCurveTo(x + i * 5, y - 7, x + i * 7, y - 12 - (i === 0 ? 4 : 0)); ctx.stroke();
    }
  }

  /* =========================================================
     BAKE: perbukitan & tanah megadunia
     ========================================================= */
  const bake = {};
  AK.bake = bake;

  function bakeHills(vw, p, colTop, colBot, bumps) {
    const Wf = Math.ceil(vw + WORLD_W * p);
    const hd = Math.min(AK.dpr || 1, 1.6);   // bukit lembut — cukup 1.6x, kanvas tetap ringan
    const c = document.createElement('canvas');
    c.width = Wf * hd; c.height = AK.H * hd;
    c._dpr = hd;
    const g = c.getContext('2d'); g.scale(hd, hd);
    const gyMin = AK.H * 0.80 - 60;
    const ridge = (x) => gyMin - 92 - (Math.sin(x * 0.0021) * 90 + Math.sin(x * 0.0057 + 2.1) * 34 + Math.sin(x * 0.011 + 4.2) * 12);
    const grad = g.createLinearGradient(0, gyMin - 200, 0, gyMin + 40);
    grad.addColorStop(0, colTop); grad.addColorStop(1, colBot);
    g.fillStyle = grad;
    g.beginPath(); g.moveTo(0, AK.H);
    for (let x = 0; x <= Wf; x += 6) g.lineTo(x, ridge(x));   // langkah rapat — garis bukit mulus, tidak bersegi
    g.lineTo(Wf, AK.H); g.closePath(); g.fill();
    if (bumps) {
      g.fillStyle = 'rgba(255,255,255,.09)';
      for (let x = 30; x < Wf; x += 150) {
        const y = ridge(x);
        g.beginPath(); g.arc(x + rand(-40, 40), y + rand(6, 26), rand(6, 14), 0, TAU); g.fill();
      }
    }
    return c;
  }

  function drawPropCluster(g, z) {
    const x = z.x;
    switch (z.biome) {
      case 'kamp':
        tent(g, x - 230, groundYAt(x - 230) + 2, 0.9, '#f3c98b', '#e0a765');
        tent(g, x - 320, groundYAt(x - 320) + 4, 0.7, '#a8d8ea', '#7fb9d4');
        campfire(g, x - 165, groundYAt(x - 165) + 2);
        treeRound(g, x + 250, groundYAt(x + 250), 1.05, '#7cc47f', '#63ad68', '#a5e08a');
        treeRound(g, x + 340, groundYAt(x + 340), 0.8, '#8fce7e', '#74b56c', '#b2e89a');
        break;
      case 'hutan':
        treeRound(g, x - 280, groundYAt(x - 280), 1.35, '#5fae72', '#4b9460', '#8fd49a');
        treeRound(g, x - 170, groundYAt(x - 170), 1.1, '#6fbc7c', '#58a367', '#9edda6');
        treeRound(g, x + 240, groundYAt(x + 240), 1.25, '#5fae72', '#4b9460', '#8fd49a');
        treeRound(g, x + 330, groundYAt(x + 330), 0.95, '#6fbc7c', '#58a367', '#9edda6');
        symbolStone(g, x - 90, groundYAt(x - 90) + 2, 1.0, '+');
        symbolStone(g, x + 100, groundYAt(x + 100) + 2, 0.9, '=');
        symbolStone(g, x + 175, groundYAt(x + 175) + 2, 0.8, '?');
        break;
      case 'gunung':
        boulder(g, x - 250, groundYAt(x - 250) + 2, 1.15);
        boulder(g, x + 300, groundYAt(x + 300) + 2, 0.9);
        pineTree(g, x - 150, groundYAt(x - 150), 1.0, '#4f9a68', '#3f8256');
        pineTree(g, x + 160, groundYAt(x + 160), 1.15, '#4f9a68', '#3f8256');
        pineTree(g, x + 250, groundYAt(x + 250), 0.85, '#5aa873', '#478a5e');
        break;
      case 'kota':
        house(g, x - 235, groundYAt(x - 235) + 2, 1.0, '#f2e3cf', '#d98f6b');
        house(g, x + 245, groundYAt(x + 245) + 2, 0.85, '#ead4c4', '#c97b5a');
        column(g, x - 100, groundYAt(x - 100) + 2, 1.0);
        column(g, x + 130, groundYAt(x + 130) + 2, 0.9);
        lanternPost(g, x + 40, groundYAt(x + 40) + 2);
        break;
      case 'lembah':
        crystal(g, x - 240, groundYAt(x - 240) + 2, 1.1, 'rgba(150,110,235,.85)');
        crystal(g, x + 265, groundYAt(x + 265) + 2, 0.9, 'rgba(178,140,255,.85)');
        crystal(g, x + 350, groundYAt(x + 350) + 2, 0.7, 'rgba(150,110,235,.7)');
        pineTree(g, x - 120, groundYAt(x - 120), 0.9, '#5c8f9e', '#4a7684');
        treeRound(g, x + 160, groundYAt(x + 160), 0.95, '#6f8fb0', '#5a7694', '#93b4d2');
        g.fillStyle = 'rgba(255,255,255,.13)';
        g.beginPath(); g.ellipse(x - 60, groundYAt(x - 60) + 8, 150, 26, 0, 0, TAU); g.fill();
        g.beginPath(); g.ellipse(x + 120, groundYAt(x + 120) + 6, 120, 20, 0, 0, TAU); g.fill();
        break;
      case 'salju':
        pineTree(g, x - 260, groundYAt(x - 260), 1.2, '#4f8a68', '#3f7256', true);
        pineTree(g, x - 160, groundYAt(x - 160), 0.95, '#549470', '#43785c', true);
        pineTree(g, x + 240, groundYAt(x + 240), 1.1, '#4f8a68', '#3f7256', true);
        boulder(g, x + 130, groundYAt(x + 130) + 2, 0.8);
        g.fillStyle = 'rgba(255,255,255,.75)';
        g.beginPath(); g.ellipse(x - 80, groundYAt(x - 80) + 6, 60, 12, 0, 0, TAU); g.fill();
        g.beginPath(); g.ellipse(x + 200, groundYAt(x + 200) + 6, 80, 14, 0, 0, TAU); g.fill();
        break;
    }
  }

  function drawPortalStatic(g, z) {
    const x = z.x, gy = groundYAt(x), w = z.gateW, h = z.gateH;
    const G = z.gate;
    g.fillStyle = 'rgba(0,0,0,.10)';
    g.beginPath(); g.ellipse(x, gy + 8, 150, 22, 0, 0, TAU); g.fill();
    g.fillStyle = G.stone;
    g.beginPath(); g.ellipse(x, gy + 2, 132, 18, 0, 0, TAU); g.fill();
    g.fillStyle = G.stoneD;
    g.beginPath(); g.ellipse(x, gy + 2, 100, 13, 0, 0, TAU); g.fill();
    const px = w / 2 + 20;
    const pil = (sx) => {
      const grd = g.createLinearGradient(sx - 14, 0, sx + 14, 0);
      grd.addColorStop(0, G.stoneD); grd.addColorStop(0.5, G.stone); grd.addColorStop(1, G.stoneD);
      g.fillStyle = grd;
      rrect(g, sx - 14, gy - h - 4, 28, h + 10, 7); g.fill();
      g.fillStyle = G.stone;
      rrect(g, sx - 19, gy - h - 14, 38, 13, 6); g.fill();
    };
    pil(x - px); pil(x + px);
    g.strokeStyle = G.stoneD; g.lineWidth = 20; g.lineCap = 'round';
    g.beginPath();
    g.moveTo(x - px, gy - h + 2);
    g.quadraticCurveTo(x - px, gy - h - 36, x, gy - h - 36);
    g.quadraticCurveTo(x + px, gy - h - 36, x + px, gy - h + 2);
    g.stroke();
    g.strokeStyle = G.stone; g.lineWidth = 12;
    g.beginPath();
    g.moveTo(x - px, gy - h + 2);
    g.quadraticCurveTo(x - px, gy - h - 36, x, gy - h - 36);
    g.quadraticCurveTo(x + px, gy - h - 36, x + px, gy - h + 2);
    g.stroke();
    g.fillStyle = G.stoneD;
    g.beginPath(); g.ellipse(x, gy - h - 36, 11, 13, 0, 0, TAU); g.fill();
    const label = z.name;
    g.font = '800 17px Nunito, sans-serif';
    const tw = g.measureText(label).width;
    const pw = Math.max(tw + 46, 130), ph = 42;
    const py = gy - h - 96;
    g.fillStyle = 'rgba(0,0,0,.12)';
    rrect(g, x - pw / 2 + 3, py + 4, pw, ph, 12); g.fill();
    g.fillStyle = G.plate;
    rrect(g, x - pw / 2, py, pw, ph, 12); g.fill();
    g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 2;
    rrect(g, x - pw / 2 + 3, py + 3, pw - 6, ph - 6, 9); g.stroke();
    g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(label, x, py + ph / 2 + 1);
    const chipW = 86, chipH = 22, cy = py + ph + 9;
    g.fillStyle = z.open ? '#2f9e6e' : 'rgba(90,104,126,.92)';
    rrect(g, x - chipW / 2, cy, chipW, chipH, 11); g.fill();
    g.fillStyle = '#fff'; g.font = '800 10.5px Nunito, sans-serif';
    g.fillText(z.open ? 'TERBUKA' : 'SEGERA', x, cy + chipH / 2 + 0.5);
  }

  /* =========================================================
     TANAH — dibake per UBIN (tile 760px) dengan cache LRU.
     Dulu satu kanvas 6400px: 20+ juta piksel — melebihi batas
     kanvas iOS dan memakan ~80MB. Kini hanya ubin terlihat
     yang hidup di memori: ringan di semua perangkat.
     ========================================================= */
  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function paintGroundRange(g, x0, x1, seed) {
    const H = AK.H;
    const gyMin = H * 0.80 - 26;
    const rnd = mulberry32(seed);
    const rndi = (a, b) => a + Math.floor(rnd() * (b - a + 1));

    const grad = g.createLinearGradient(0, gyMin - 10, 0, H);
    grad.addColorStop(0, '#93d183'); grad.addColorStop(0.5, '#7fc26f'); grad.addColorStop(1, '#67ad5c');
    g.fillStyle = grad; g.fillRect(x0, gyMin - 6, x1 - x0, H - gyMin + 6);

    // bercak cahaya lembut menggantikan pita kotak — rumput terasa menyatu
    for (let i = 0; i < 5; i++) {
      const x = x0 + rnd() * (x1 - x0), y = gyMin + 20 + rnd() * (H - gyMin - 50);
      const rg = g.createRadialGradient(x, y, 4, x, y, 90 + rnd() * 100);
      rg.addColorStop(0, 'rgba(255,255,235,.05)'); rg.addColorStop(1, 'rgba(255,255,235,0)');
      g.fillStyle = rg;
      g.beginPath(); g.ellipse(x, y, 170, 46, 0, 0, TAU); g.fill();
    }

    const pathY = (x) => groundYAt(x) + 52 + Math.sin(x * 0.004) * 9;
    g.fillStyle = '#ecdcae';
    g.beginPath(); g.moveTo(x0, pathY(x0));
    for (let x = x0; x <= x1; x += 12) g.lineTo(x, pathY(x));
    for (let x = x1; x >= x0; x -= 12) g.lineTo(x, pathY(x) + 46);
    g.closePath(); g.fill();
    g.strokeStyle = 'rgba(160,132,84,.28)'; g.lineWidth = 2;
    g.beginPath(); g.moveTo(x0, pathY(x0));
    for (let x = x0; x <= x1; x += 12) g.lineTo(x, pathY(x));
    g.stroke();
    g.beginPath(); g.moveTo(x0, pathY(x0) + 46);
    for (let x = x0; x <= x1; x += 12) g.lineTo(x, pathY(x) + 46);
    g.stroke();
    g.fillStyle = 'rgba(160,132,84,.30)';
    for (let i = 0; i < 12; i++) {
      const x = x0 + rnd() * (x1 - x0);
      g.beginPath(); g.ellipse(x, pathY(x) + 6 + rnd() * 34, 2 + rnd() * 2.5, 1.4 + rnd() * 1.2, 0, 0, TAU); g.fill();
    }

    const petalCols = ['#ffffff', '#ffc9d6', '#ffe3ae', '#d9c7ff', '#ffd166'];
    for (let i = 0; i < 38; i++) {
      const x = x0 + rnd() * (x1 - x0), y = groundYAt(x) + 4 + rnd() * (H - groundYAt(x) - 12);
      if (Math.abs(y - pathY(x)) < 30) continue;
      if (rnd() < 0.42) flower(g, x, y, petalCols[rndi(0, petalCols.length - 1)]);
      else grassTuft(g, x, y, rnd() < 0.5 ? '#5d9950' : '#4f8a44');
    }
    g.fillStyle = 'rgba(140,150,140,.5)';
    for (let i = 0; i < 6; i++) {
      const x = x0 + rnd() * (x1 - x0), y = groundYAt(x) + 6 + rnd() * (H - groundYAt(x) - 16);
      if (Math.abs(y - pathY(x)) < 26) continue;
      g.beginPath(); g.ellipse(x, y, 4 + rnd() * 5, 3 + rnd() * 2.5, 0, 0, TAU); g.fill();
    }

    for (const z of ZONES) {
      if (z.x > x0 - 520 && z.x < x1 + 520) drawPropCluster(g, z);
    }
    for (const z of ZONES) {
      if (z.x > x0 - 260 && z.x < x1 + 260) drawPortalStatic(g, z);
    }
  }

  const TILE_W = 760;
  const tileCache = new Map();   // idx → {c, x0, w, last}
  let tileTick = 0;
  const TILE_KEEP = 5;

  function bakeTile(idx) {
    const x0 = idx * TILE_W;
    const w = Math.min(TILE_W, WORLD_W - x0);
    const c = document.createElement('canvas');
    c.width = Math.ceil(w * AK.dpr); c.height = AK.H * AK.dpr;
    const g = c.getContext('2d');
    g.scale(AK.dpr, AK.dpr);
    g.translate(-x0, 0);
    paintGroundRange(g, x0 - 12, x0 + w + 12, idx * 2654435761 + 1234);
    return { c, x0, w };
  }

  AK.drawGround = function (ctx) {
    if (!AK.H || AK.VW <= 0) return;
    const total = Math.ceil(WORLD_W / TILE_W);
    const first = Math.max(0, Math.floor((AK.camX - 60) / TILE_W));
    const lastI = Math.min(total - 1, Math.floor((AK.camX + AK.VW + 60) / TILE_W));
    tileTick++;
    for (let i = first; i <= lastI; i++) {
      let t = tileCache.get(i);
      if (!t) { t = bakeTile(i); tileCache.set(i, t); }
      t.last = tileTick;
      ctx.drawImage(t.c, t.x0 - AK.camX, 0, t.w, AK.H);
    }
    // buang ubin yang tak terlihat agar memori tetap ramping
    if (tileCache.size > TILE_KEEP) {
      for (const [k, v] of tileCache) {
        if (v.last < tileTick - 1) tileCache.delete(k);
        if (tileCache.size <= TILE_KEEP) break;
      }
    }
  };

  function bakeVignette(vw, vh) {
    const c = document.createElement('canvas');
    c.width = vw * AK.dpr; c.height = vh * AK.dpr;
    const g = c.getContext('2d'); g.scale(AK.dpr, AK.dpr);
    const rg = g.createRadialGradient(vw / 2, vh / 2, Math.min(vw, vh) * 0.42, vw / 2, vh / 2, Math.max(vw, vh) * 0.74);
    rg.addColorStop(0, 'rgba(25,45,70,0)');
    rg.addColorStop(1, 'rgba(25,45,70,.22)');
    g.fillStyle = rg; g.fillRect(0, 0, vw, vh);
    const lg = g.createLinearGradient(0, vh - 130, 0, vh);
    lg.addColorStop(0, 'rgba(25,45,70,0)'); lg.addColorStop(1, 'rgba(25,45,70,.12)');
    g.fillStyle = lg; g.fillRect(0, vh - 130, vw, 130);
    bake.vignette = c;
  }

  function bakeAll(vw, vh, dpr) {
    AK.VW = vw; AK.H = vh; AK.dpr = dpr;
    tileCache.clear();   // ubin lama tak berlaku — ukuran berubah
    bake.hillsFar = bakeHills(vw, 0.10, '#c3d5ec', '#e2ecf8', false);
    bake.hillsMid = bakeHills(vw, 0.26, '#a5d49b', '#8cc687', true);
    bakeVignette(vw, vh);
  }
  AK.bakeAll = bakeAll;

  /* =========================================================
     LANGIT (digambar tiap frame — murah)
     ========================================================= */
  let skyGrad = null, skyKey = '';
  let fogGrad = null, fogKey = '';
  function drawSky(ctx, t, camX) {
    const vw = AK.VW, vh = AK.H;
    const key = vw + 'x' + vh;
    if (skyKey !== key) {
      skyGrad = ctx.createLinearGradient(0, 0, 0, vh);
      skyGrad.addColorStop(0, '#6fb0e3');
      skyGrad.addColorStop(0.40, '#a5d2ef');
      skyGrad.addColorStop(0.62, '#ffe9c4');
      skyGrad.addColorStop(0.80, '#ffd9a0');
      skyGrad.addColorStop(1, '#ffcf92');
      skyKey = key;
    }
    ctx.fillStyle = skyGrad; ctx.fillRect(0, 0, vw, vh);

    const sx = vw * 0.70 - camX * 0.05, sy = vh * 0.20;
    const rg = ctx.createRadialGradient(sx, sy, 4, sx, sy, 170);
    rg.addColorStop(0, 'rgba(255,246,214,.95)');
    rg.addColorStop(0.25, 'rgba(255,224,150,.55)');
    rg.addColorStop(1, 'rgba(255,224,150,0)');
    ctx.fillStyle = rg; ctx.fillRect(sx - 180, sy - 180, 360, 360);
    ctx.fillStyle = '#fff8e0';
    ctx.beginPath(); ctx.arc(sx, sy, 42, 0, TAU); ctx.fill();

    if (!AK.reducedMotion) {
      ctx.save(); ctx.translate(sx, sy);
      for (let i = 0; i < 5; i++) {
        const a = t * 0.03 + i * TAU / 5 + 0.4;
        ctx.save(); ctx.rotate(a);
        const lg = ctx.createLinearGradient(0, 0, 620, 0);
        lg.addColorStop(0, 'rgba(255,240,200,.085)');
        lg.addColorStop(1, 'rgba(255,240,200,0)');
        ctx.fillStyle = lg;
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(620, -30); ctx.lineTo(620, 30); ctx.closePath(); ctx.fill();
        ctx.restore();
      }
      ctx.restore();
    }
  }
  AK.drawSky = drawSky;

  function drawLayer(ctx, img, p) {
    if (!img) return;
    const d = img._dpr || AK.dpr || 1;
    const maxOff = img.width / d - AK.VW;
    const off = Math.min(AK.camX * p, Math.max(0, maxOff));
    ctx.drawImage(img, off * d, 0, AK.VW * d, AK.H * d, 0, 0, AK.VW, AK.H);
  }
  AK.drawHills = function (ctx) {
    drawLayer(ctx, bake.hillsFar, 0.10);
    drawLayer(ctx, bake.hillsMid, 0.26);
    // kabut horizon — menjahit bukit dan tanah agar menyatu
    const key = 'h' + AK.VW + 'x' + AK.H;
    if (fogKey !== key) {
      fogGrad = ctx.createLinearGradient(0, AK.H * 0.62, 0, AK.H * 0.84);
      fogGrad.addColorStop(0, 'rgba(233,238,246,0)');
      fogGrad.addColorStop(0.55, 'rgba(233,238,246,.16)');
      fogGrad.addColorStop(1, 'rgba(233,238,246,0)');
      fogKey = key;
    }
    ctx.fillStyle = fogGrad; ctx.fillRect(0, AK.H * 0.62, AK.VW, AK.H * 0.22);
  };
  AK.drawVignette = function (ctx) {
    if (bake.vignette) ctx.drawImage(bake.vignette, 0, 0, AK.VW, AK.H);
  };

  /* =========================================================
     AWAN / SERBUK / KUNANG / KUPU / BURUNG / ASAP
     ========================================================= */
  const clouds = [], pollen = [], fireflies = [], birds = [], butterflies = [], smoke = [];
  const leaves = [], snow = [], mist = [], sparks = [];
  let cloudSprite = null, glowWhite = null, glowViolet = null, glowWarm = null;
  let smokeTimer = 0, chimTimerA = 0, chimTimerB = 0, sparkTimer = 0;

  /* jangkar aktivitas industri — posisi mengikuti properti yang dibake */
  const FIRE = { x: ZONES[0].x - 165 };
  const CHIMNEY = [
    { x: ZONES[3].x - 235 + 29, s: 1.0 },
    { x: ZONES[3].x + 245 + 24, s: 0.85 },
  ];
  const WINDOW = [
    { x: ZONES[3].x - 235 - 26, s: 1.0 },
    { x: ZONES[3].x + 245 - 22, s: 0.85 },
  ];
  const LANTERN = { x: ZONES[3].x + 40 };
  const CRYSTAL = [
    { x: ZONES[4].x - 240, s: 1.1 },
    { x: ZONES[4].x + 265, s: 0.9 },
    { x: ZONES[4].x + 350, s: 0.7 },
  ];
  const fireY    = () => groundYAt(FIRE.x) - 6;
  const chimTopY = (c) => groundYAt(c.x) - 90 * c.s;
  const winY     = (w) => groundYAt(w.x) - 34 * w.s;
  const lanY     = () => groundYAt(LANTERN.x) - 62;
  const cryY     = (c) => groundYAt(c.x) - 30 * c.s;

  AK.initAmbient = function () {
    cloudSprite = makeCloud();
    glowWhite = makeGlow('rgba(255,255,255,.9)');
    glowViolet = makeGlow('rgba(200,160,255,.95)');
    glowWarm = makeGlow('rgba(255,190,110,.95)');
    clouds.length = 0; pollen.length = 0; fireflies.length = 0; birds.length = 0;
    butterflies.length = 0; leaves.length = 0; snow.length = 0; mist.length = 0;
    for (let i = 0; i < 11; i++) clouds.push({
      x: rand(-200, WORLD_W), y: rand(30, AK.H * 0.36),
      s: rand(0.75, 1.7), v: rand(4, 10), a: rand(0.5, 0.92)
    });
    for (let i = 0; i < 52; i++) {
      const x = rand(0, WORLD_W);
      pollen.push({ x, y: rand(groundYAt(x) - 250, groundYAt(x) - 10), r: rand(1.2, 2.6), ph: rand(0, TAU), sp: rand(0.5, 1.2) });
    }
    for (let i = 0; i < 14; i++) {
      const x = ZONES[4].x + rand(-420, 420);
      fireflies.push({ x, y: rand(groundYAt(x) - 190, groundYAt(x) - 16), ph: rand(0, TAU), sp: rand(0.6, 1.4) });
    }
    for (let i = 0; i < 7; i++) birds.push({ x: rand(0, WORLD_W), y: rand(50, AK.H * 0.26), v: rand(11, 22), ph: rand(0, TAU) });
    butterflies.push({ ax: ZONES[0].x + 180, ay: 0, t: rand(0, 9), col: '#ffffff' });
    butterflies.push({ ax: ZONES[1].x - 120, ay: 0, t: rand(0, 9), col: '#ffd166' });
    butterflies.push({ ax: ZONES[2].x - 60,  ay: 0, t: rand(0, 9), col: '#a5d8ff' });
    butterflies.push({ ax: ZONES[3].x - 200, ay: 0, t: rand(0, 9), col: '#f687b3' });
    butterflies.push({ ax: ZONES[4].x + 150, ay: 0, t: rand(0, 9), col: '#e2d0fc' });
    // Hutan Simbol: dedaunan berjatuhan pelan
    for (let i = 0; i < 34; i++) {
      const x = ZONES[1].x + rand(-380, 420);
      leaves.push({
        x, y: rand(groundYAt(x) - 240, groundYAt(x) - 10),
        v: rand(20, 38), ph: rand(0, TAU), sp: rand(0.8, 1.8),
        r: rand(2.4, 4.2), col: ['#7cc47f', '#a5e08a', '#e0a765', '#8fd49a'][randi(0, 3)]
      });
    }
    // Puncak Riset: salju turun satu per satu
    for (let i = 0; i < 52; i++) {
      const x = ZONES[5].x + rand(-460, 460);
      snow.push({
        x, y: rand(groundYAt(x) - 300, groundYAt(x) - 6),
        v: rand(13, 26), ph: rand(0, TAU), sp: rand(0.5, 1.3), r: rand(1.2, 2.6)
      });
    }
    // Pegunungan Pola: kabut tanah berarak
    for (let i = 0; i < 6; i++) {
      const x = ZONES[2].x + rand(-420, 420);
      mist.push({
        x, y: groundYAt(x) - rand(6, 42), w: rand(150, 260), h: rand(16, 26),
        v: rand(4, 9) * (Math.random() < 0.5 ? -1 : 1), a: rand(0.05, 0.10)
      });
    }
  };

  AK.updateAmbient = function (dt) {
    const rm = AK.reducedMotion;
    if (!rm) {
      for (const c of clouds) { c.x += c.v * dt; if (c.x > WORLD_W + 300) c.x = -300; }
      for (const p of pollen) p.ph += dt * p.sp;
      for (const f of fireflies) f.ph += dt * f.sp;
      for (const b of birds) { b.x += b.v * dt; b.ph += dt * 7; if (b.x > WORLD_W + 60) b.x = -60; }
      for (const bf of butterflies) bf.t += dt;
      for (const l of leaves) {
        l.ph += dt * l.sp;
        l.y += l.v * dt;
        l.x += Math.sin(l.ph) * 16 * dt;
        if (l.y > groundYAt(l.x) - 3) { l.y = groundYAt(l.x) - 250; l.x = ZONES[1].x + rand(-380, 420); }
      }
      for (const s of snow) {
        s.ph += dt * s.sp;
        s.y += s.v * dt;
        s.x += Math.sin(s.ph) * 10 * dt;
        if (s.y > groundYAt(s.x) - 2) { s.y = groundYAt(s.x) - 300; s.x = ZONES[5].x + rand(-460, 460); }
      }
      for (const m of mist) {
        m.x += m.v * dt;
        if (m.x < ZONES[2].x - 520) m.x = ZONES[2].x + 520;
        if (m.x > ZONES[2].x + 520) m.x = ZONES[2].x - 520;
      }
      // asap hangat unggun kamp
      smokeTimer -= dt;
      if (smokeTimer <= 0) {
        smokeTimer = 0.75;
        smoke.push({ x: FIRE.x + rand(-4, 4), y: fireY() - 28, age: 0, drift: rand(-6, 6), warm: true });
      }
      // asap cerobong rumah kota — tanda ada yang memasak
      chimTimerA -= dt; chimTimerB -= dt;
      if (chimTimerA <= 0) { chimTimerA = 1.15; smoke.push({ x: CHIMNEY[0].x + rand(-3, 3), y: chimTopY(CHIMNEY[0]), age: 0, drift: rand(-5, 5), warm: false }); }
      if (chimTimerB <= 0) { chimTimerB = 1.35; smoke.push({ x: CHIMNEY[1].x + rand(-3, 3), y: chimTopY(CHIMNEY[1]), age: 0, drift: rand(-5, 5), warm: false }); }
      if (smoke.length > 14) smoke.shift();
      for (const s of smoke) { s.age += dt; s.y -= (20 + s.age * 6) * dt; s.x += s.drift * dt; }
      for (let i = smoke.length - 1; i >= 0; i--) if (smoke[i].age > 3.4) smoke.splice(i, 1);
      // percikan api unggun
      sparkTimer -= dt;
      if (sparkTimer <= 0) {
        sparkTimer = rand(0.18, 0.4);
        sparks.push({ x: FIRE.x + rand(-8, 8), y: fireY() - 8, vy: rand(-90, -55), vx: rand(-12, 12), age: 0, life: rand(0.5, 0.9) });
      }
      for (const s of sparks) { s.age += dt; s.x += s.vx * dt; s.y += s.vy * dt; s.vy += 60 * dt; }
      for (let i = sparks.length - 1; i >= 0; i--) if (sparks[i].age > sparks[i].life) sparks.splice(i, 1);
    }
  };

  /* aktivitas industri: digambar DI ATAS tanah, DI BAWAH karakter */
  AK.drawActivity = function (ctx, t) {
    // api unggun menyala-nyala
    const fx = FIRE.x - AK.camX;
    if (fx > -70 && fx < AK.VW + 70) {
      const fy = fireY();
      const pulse = 0.82 + Math.sin(t * 9) * 0.12 + Math.sin(t * 23) * 0.06;
      ctx.globalAlpha = 0.5 * pulse;
      ctx.drawImage(glowWarm, fx - 44, fy - 44, 88, 88);
      const fl = (w, h, col) => {
        ctx.fillStyle = col; ctx.beginPath();
        ctx.moveTo(fx, fy - h * pulse);
        ctx.quadraticCurveTo(fx + w * pulse, fy - h * 0.4, fx, fy);
        ctx.quadraticCurveTo(fx - w * pulse, fy - h * 0.4, fx, fy); ctx.fill();
      };
      fl(13, 34, '#ff9d4d'); fl(8, 22, '#ffd166'); fl(4, 11, '#fff3cf');
      for (const s of sparks) {
        const sx = s.x - AK.camX;
        ctx.globalAlpha = Math.max(0, 1 - s.age / s.life) * 0.85;
        ctx.fillStyle = '#ffcf7a';
        ctx.beginPath(); ctx.arc(sx, s.y, 1.6, 0, TAU); ctx.fill();
      }
    }
    // jendela rumah hangat — ada yang tinggal di dalamnya
    for (let i = 0; i < WINDOW.length; i++) {
      const w = WINDOW[i], sx = w.x - AK.camX;
      if (sx < -40 || sx > AK.VW + 40) continue;
      ctx.globalAlpha = 0.26 + Math.sin(t * 2.6 + i * 2.1) * 0.08;
      ctx.drawImage(glowWarm, sx - 22, winY(w) - 22, 44, 44);
    }
    // lentera kota bernapas
    const lx = LANTERN.x - AK.camX;
    if (lx > -40 && lx < AK.VW + 40) {
      ctx.globalAlpha = 0.30 + Math.sin(t * 3.1) * 0.07;
      ctx.drawImage(glowWarm, lx + 12 - 24, lanY() - 24, 48, 48);
    }
    // kristal lembah berdenyut
    for (let i = 0; i < CRYSTAL.length; i++) {
      const c = CRYSTAL[i], sx = c.x - AK.camX;
      if (sx < -60 || sx > AK.VW + 60) continue;
      const r = 54 * c.s;
      ctx.globalAlpha = 0.16 + Math.sin(t * 1.5 + i * 1.9) * 0.10;
      ctx.drawImage(glowViolet, sx - r, cryY(c) - r, r * 2, r * 2);
    }
    // kabut tanah pegunungan berarak
    for (const m of mist) {
      const sx = m.x - AK.camX;
      if (sx < -m.w - 40 || sx > AK.VW + m.w + 40) continue;
      ctx.globalAlpha = m.a;
      ctx.fillStyle = '#eef4fa';
      ctx.beginPath(); ctx.ellipse(sx, m.y, m.w / 2, m.h / 2, 0, 0, TAU); ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  AK.drawAmbientBack = function (ctx) {
    const off = AK.camX * 0.16;
    for (const c of clouds) {
      const sx = c.x - off;
      if (sx < -260 || sx > AK.VW + 260) continue;
      ctx.globalAlpha = c.a;
      ctx.drawImage(cloudSprite, sx - 120 * c.s, c.y - 50 * c.s, 240 * c.s, 100 * c.s);
    }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = 'rgba(60,80,100,.55)'; ctx.lineWidth = 2; ctx.lineCap = 'round';
    for (const b of birds) {
      const sx = b.x - AK.camX * 0.5;
      if (sx < -20 || sx > AK.VW + 20) continue;
      const f = Math.sin(b.ph) * 4;
      ctx.beginPath();
      ctx.moveTo(sx - 7, b.y + f * 0.4); ctx.quadraticCurveTo(sx - 2, b.y - 4 - f, sx, b.y);
      ctx.quadraticCurveTo(sx + 2, b.y - 4 - f, sx + 7, b.y + f * 0.4);
      ctx.stroke();
    }
  };

  AK.drawAmbientFront = function (ctx, t) {
    for (const p of pollen) {
      const sx = p.x - AK.camX;
      if (sx < -20 || sx > AK.VW + 20) continue;
      const yy = p.y + Math.sin(p.ph) * 12;
      ctx.globalAlpha = 0.30 + Math.sin(p.ph * 1.7) * 0.15;
      ctx.drawImage(glowWhite, sx - p.r * 3, yy - p.r * 3, p.r * 6, p.r * 6);
    }
    for (const f of fireflies) {
      const sx = f.x - AK.camX;
      if (sx < -20 || sx > AK.VW + 20) continue;
      const yy = f.y + Math.sin(f.ph) * 14;
      const a = Math.pow(Math.max(0, Math.sin(f.ph * 1.3)), 2) * 0.85 + 0.1;
      ctx.globalAlpha = a;
      ctx.drawImage(glowViolet, sx - 9, yy - 9, 18, 18);
      ctx.fillStyle = '#efe6ff';
      ctx.beginPath(); ctx.arc(sx, yy, 1.7, 0, TAU); ctx.fill();
    }
    for (const s of smoke) {
      const sx = s.x - AK.camX;
      if (sx < -30 || sx > AK.VW + 30) continue;
      ctx.globalAlpha = Math.max(0, 0.30 * (1 - s.age / 3.4));
      ctx.fillStyle = s.warm ? '#f5efe4' : '#eef2f5';
      ctx.beginPath(); ctx.arc(sx, s.y, 5 + s.age * 4.5, 0, TAU); ctx.fill();
    }
    // dedaunan berjatuhan
    for (const l of leaves) {
      const sx = l.x - AK.camX;
      if (sx < -20 || sx > AK.VW + 20) continue;
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = l.col;
      ctx.save(); ctx.translate(sx, l.y + Math.sin(l.ph) * 4); ctx.rotate(Math.sin(l.ph * 0.9) * 0.8);
      ctx.beginPath(); ctx.ellipse(0, 0, l.r, l.r * 0.55, 0, 0, TAU); ctx.fill();
      ctx.restore();
    }
    // salju turun perlahan
    for (const s of snow) {
      const sx = s.x - AK.camX;
      if (sx < -12 || sx > AK.VW + 12) continue;
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.arc(sx, s.y + Math.sin(s.ph) * 3, s.r, 0, TAU); ctx.fill();
    }
    if (!AK.reducedMotion) {
      for (const bf of butterflies) {
        const wx = bf.ax + Math.sin(bf.t * 0.7) * 90 + Math.sin(bf.t * 0.23) * 60;
        const wy = groundYAt(wx) - 60 + Math.sin(bf.t * 1.1) * 34;
        const sx = wx - AK.camX;
        if (sx < -30 || sx > AK.VW + 30) continue;
        const flap = 0.25 + Math.abs(Math.cos(bf.t * 9)) * 0.75;
        ctx.save(); ctx.translate(sx, wy);
        ctx.fillStyle = bf.col; ctx.globalAlpha = 0.9;
        ctx.save(); ctx.scale(flap, 1);
        ctx.beginPath(); ctx.ellipse(-5, -2, 6, 4, -0.5, 0, TAU); ctx.fill();
        ctx.restore();
        ctx.save(); ctx.scale(flap, 1);
        ctx.beginPath(); ctx.ellipse(5, -2, 6, 4, 0.5, 0, TAU); ctx.fill();
        ctx.restore();
        ctx.fillStyle = '#5a4632';
        ctx.beginPath(); ctx.ellipse(0, -1, 1.4, 4, 0, 0, TAU); ctx.fill();
        ctx.restore();
      }
    }
    ctx.globalAlpha = 1;
  };

  AK.reducedMotion = false;
  return AK;
})();
