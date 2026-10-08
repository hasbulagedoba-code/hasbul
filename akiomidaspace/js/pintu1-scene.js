window.P1SCENE = (function () {
  'use strict';

  const K = window.KAMP;
  const W = 480, H = 270, GROUND = 246;
  const P = K.gambar.P, lingkaran = K.gambar.lingkaran;

  const STASIUN_X = [90, 200, 310, 420];
  const GERBANG_X = i => 32 + i * 46;
  const PANAH_Y = 204;

  const cache = new Map();
  function kosongkan() { cache.clear(); }

  function bakarDasar(c) {

    P(c, 0, 0, W, 46, '#9fdcf5');
    P(c, 0, 46, W, 42, '#8fd3f0');
    P(c, 0, 88, W, 40, '#a5e0f5');
    P(c, 0, 128, W, 24, '#b7e8f8');

    lingkaran(c, 434, 30, 12, '#ffe9a3');
    lingkaran(c, 434, 30, 9, '#ffd166');
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4;
      P(c, 434 + Math.round(Math.cos(a) * 15), 30 + Math.round(Math.sin(a) * 15), 2, 2, '#ffe9a3');
    }

    const gunung = (apexX, apexY, setW, baseY, col) => {
      for (let y = apexY; y <= baseY; y++) {
        const u = (y - apexY) / (baseY - apexY);
        const ww = Math.max(1, Math.round(setW * u));
        P(c, apexX - ww, y, ww * 2 + 1, 1, col);
      }
    };
    gunung(74, 84, 58, 186, '#a9c8e2');
    gunung(214, 74, 70, 186, '#98bcd9');
    gunung(396, 88, 62, 186, '#a9c8e2');
    P(c, 0, 150, W, 36, '#93bfd8');

    for (let i = 0; i < 14; i++) {
      const tx = 8 + i * 34, ty = 176 + (i % 3) * 2;
      lingkaran(c, tx, ty, 5, '#2f7a44');
      lingkaran(c, tx - 3, ty + 2, 3, '#2a6d3c');
    }

    P(c, 0, 182, W, 88, '#7ec850');
    for (let i = 0; i < 60; i++) {
      const gx = (i * 53) % W, gy = 186 + (i * 29) % 48;
      P(c, gx, gy, 2, 1, i % 2 ? '#6fb844' : '#8fd15c');
    }
    P(c, 0, 236, W, 24, '#d9b877');
    P(c, 0, 236, W, 2, '#c2a05e');
    P(c, 0, 258, W, 2, '#c2a05e');
    for (let i = 0; i < 26; i++) {
      const px2 = (i * 41) % W, py2 = 240 + (i * 13) % 16;
      P(c, px2, py2, 3, 2, i % 3 ? '#c9a763' : '#e3c58c');
    }
  }

  function barisJudul(judul) {
    const kata = judul.toUpperCase().replace('÷', ':').replace('−', '-').replace('×', 'X').split(' ');
    const maxKata = Math.max.apply(null, kata.map(w => w.length));
    const fontPx = maxKata > 12 ? 7 : 8;
    const maxChars = fontPx === 8 ? 12 : 13;
    const lines = [];
    let cur = '';
    for (const w of kata) {
      if (cur === '') cur = w;
      else if ((cur + ' ' + w).length <= maxChars) cur += ' ' + w;
      else { lines.push(cur); cur = w; }
    }
    if (cur) lines.push(cur);
    return { lines, fontPx };
  }

  function papanJudul(c, cx, lines, fontPx) {
    c.font = fontPx + 'px "Press Start 2P", monospace';
    let bw = 0;
    for (const b of lines) bw = Math.max(bw, c.measureText(b).width);
    bw = Math.ceil(bw) + 10;
    const bh = lines.length * (fontPx + 4) + 8;
    const bottom = 196, top = bottom - bh;
    const bx = Math.round(cx - bw / 2);

    P(c, cx - 1, bottom, 3, GROUND - bottom, '#7a5230');
    P(c, cx - 1, bottom, 1, GROUND - bottom, '#5f3d1e');

    P(c, bx - 2, top - 2, bw + 4, bh + 4, '#37476f');
    P(c, bx, top, bw, bh, '#141d33');
    P(c, bx + 1, top + 1, bw - 2, 2, '#1c2740');

    c.font = fontPx + 'px "Press Start 2P", monospace';
    c.textBaseline = 'top';
    c.fillStyle = '#fffdf2';
    for (let i = 0; i < lines.length; i++)
      c.fillText(lines[i], Math.round(cx - c.measureText(lines[i]).width / 2), top + 4 + i * (fontPx + 4));
    return top;
  }

  function lencana(c, cx, y, txt, warna, gelap) {
    c.font = '9px "Press Start 2P", monospace';
    const w = Math.ceil(Math.max(14, c.measureText(txt).width + 10));
    const x = Math.round(cx - w / 2);
    P(c, x, y, w, 15, gelap);
    P(c, x, y, w, 1, warna);
    P(c, x, y + 14, w, 1, warna);
    P(c, x, y, 1, 15, warna);
    P(c, x + w - 1, y, 1, 15, warna);
    c.fillStyle = '#fffdf2';
    c.textBaseline = 'top';
    c.fillText(txt, Math.round(cx - c.measureText(txt).width / 2), y + 3);
    return y - 2;
  }

  function gerbang(c, gx, kat, i) {
    const warna = kat.color, gelap = kat.deep;

    P(c, gx - 8, 214, 16, 32, '#141a2b');
    for (let y = -8; y <= 0; y++) {
      const yy = 214 + y;
      if (yy > 214) continue;
      const ww = Math.floor(Math.sqrt(64 - y * y));
      P(c, gx - ww, yy, ww * 2 + 1, 1, '#141a2b');
    }

    P(c, gx - 10, 212, 3, 34, '#8a5a30');
    P(c, gx + 7, 212, 3, 34, '#6e4522');
    for (let y = -10; y <= 0; y++) {
      const yy = 213 + y;
      if (yy > 213) continue;
      const ww = Math.round(10 * Math.sqrt(Math.max(0, 1 - (y * y) / 121)));
      P(c, gx - ww - 2, yy, 2, 1, '#8a5a30');
      P(c, gx + ww, yy, 2, 1, '#6e4522');
    }
    P(c, gx - 10, 244, 20, 2, '#4a3a24');

    P(c, gx - 5, 226, 10, 20, gelap);
    P(c, gx - 5, 226, 10, 2, warna);

    const by = i % 2 === 0 ? 94 : 130;
    c.font = '8px "Press Start 2P", monospace';
    const w1 = c.measureText(kat.label[0]).width;
    const w2 = c.measureText(kat.label[1]).width;
    const bw = Math.ceil(Math.max(w1, w2)) + 12;
    const bx = Math.max(2, Math.min(W - bw - 2, Math.round(gx - bw / 2)));
    P(c, gx - 1, by + 32, 3, Math.max(4, 212 - by - 32), '#5f3d1e');
    P(c, bx - 2, by - 2, bw + 4, 36, '#37476f');
    P(c, bx, by, bw, 32, '#141d33');
    P(c, bx + 1, by + 1, bw - 2, 2, '#1c2740');
    P(c, bx + 2, by + 2, 1, 1, '#ffd166');
    P(c, bx + bw - 3, by + 2, 1, 1, '#ffd166');
    c.fillStyle = warna;
    c.textBaseline = 'top';
    c.fillText(kat.label[0], Math.round(gx - w1 / 2), by + 5);
    c.fillText(kat.label[1], Math.round(gx - w2 / 2), by + 17);

    lencana(c, gx, by - 19, String(i + 1), warna, '#10182b');
  }

  function papanPanah(c, xTengah, baris) {
    c.font = '7px "Press Start 2P", monospace';
    let bw = 0;
    for (const b of baris) bw = Math.max(bw, c.measureText(b).width);
    bw = Math.ceil(bw) + 12;
    const bh = baris.length * 11 + 8;
    let bx = Math.round(xTengah - bw / 2);
    bx = Math.max(2, Math.min(W - bw - 2, bx));
    const by = PANAH_Y;
    P(c, Math.round(xTengah) - 1, by + bh, 3, GROUND - by - bh, '#5f3d1e');
    P(c, bx - 2, by - 2, bw + 4, bh + 4, '#37476f');
    P(c, bx, by, bw, bh, '#141d33');
    P(c, bx + 1, by + 1, bw - 2, 2, '#1c2740');
    c.fillStyle = '#ffd166';
    c.textBaseline = 'top';
    for (let i = 0; i < baris.length; i++)
      c.fillText(baris[i], Math.round(xTengah - c.measureText(baris[i]).width / 2), by + 4 + i * 11);
  }

  function papanArea(c, kat, hal, nHal) {
    c.font = '8px "Press Start 2P", monospace';
    const nama = kat.nama.toUpperCase();
    const wn = c.measureText(nama).width;

    P(c, Math.round(W / 2 - wn / 2) - 7, 12, wn + 14, 20, '#37476f');
    P(c, Math.round(W / 2 - wn / 2) - 5, 14, wn + 10, 16, '#141d33');
    c.fillStyle = kat.color;
    c.textBaseline = 'top';
    c.fillText(nama, Math.round(W / 2 - wn / 2), 19);

    const lp = 'LAPISAN ' + (hal + 1) + '/' + nHal;
    c.font = '7px "Press Start 2P", monospace';
    const wl = c.measureText(lp).width;
    P(c, W - 10 - wl - 12, 12, wl + 12, 17, '#37476f');
    P(c, W - 8 - wl - 12, 14, wl + 8, 13, '#141d33');
    c.fillStyle = '#e8eef8';
    c.fillText(lp, W - 4 - wl - 12, 18);
  }

  function bakarPusat() {
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const c = cv.getContext('2d');
    bakarDasar(c);
    const KAT = window.P1.KATEGORI;

    for (let i = 0; i < KAT.length; i++) gerbang(c, GERBANG_X(i), KAT[i], i);

    for (const sx of [55, 147, 239, 331, 423]) {
      lingkaran(c, sx, GROUND - 4, 5, '#4f9a55');
      lingkaran(c, sx + 4, GROUND - 3, 4, '#43844a');
    }
    return cv;
  }

  function bakarArea(kat, hal, daftar) {
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const c = cv.getContext('2d');
    bakarDasar(c);
    const nHal = Math.ceil(kat.jumlah / 4);
    papanArea(c, kat, hal, nHal);

    for (let i = 0; i < daftar.length; i++) {
      const t = daftar[i];
      const bj = barisJudul(t.judul);
      const puncak = papanJudul(c, STASIUN_X[i], bj.lines, bj.fontPx);
      lencana(c, STASIUN_X[i], puncak - 19, String(t.n), kat.color, '#10182b');
    }

    const prevAda = hal > 0, nextAda = hal < nHal - 1;
    papanPanah(c, 34, prevAda ? ['< MUNDUR'] : ['< PUSAT']);
    papanPanah(c, W - 34, nextAda ? ['MAJU >'] : ['PUSAT >']);

    for (const sx of [145, 255, 365]) {
      lingkaran(c, sx, GROUND - 4, 5, '#4f9a55');
      lingkaran(c, sx + 4, GROUND - 3, 4, '#43844a');
    }
    return cv;
  }

  function bakar(key) {
    if (cache.has(key)) return cache.get(key);
    let cv;
    if (key === 'pusat') cv = bakarPusat();
    else {

      const m = /^k(\d+):(\d+)$/.exec(key);
      const kat = window.P1.KATEGORI[parseInt(m[1], 10) - 1];
      const hal = parseInt(m[2], 10);
      const daftar = window.P1.topikKategori(parseInt(m[1], 10)).slice(hal * 4, hal * 4 + 4);
      cv = bakarArea(kat, hal, daftar);
    }
    cache.set(key, cv);
    return cv;
  }

  const glowCache = new Map();
  function glow(warna) {
    if (glowCache.has(warna)) return glowCache.get(warna);
    const cv = document.createElement('canvas');
    cv.width = cv.height = 56;
    const c = cv.getContext('2d');
    const g = c.createRadialGradient(28, 28, 2, 28, 28, 28);
    g.addColorStop(0, warna);
    g.addColorStop(0.55, warna + '88');
    g.addColorStop(1, warna + '00');
    c.fillStyle = g;
    c.fillRect(0, 0, 56, 56);
    glowCache.set(warna, cv);
    return cv;
  }

  return { W, H, GROUND, STASIUN_X, GERBANG_X, PANAH_Y, barisJudul, bakar, kosongkan, glow };
})();
