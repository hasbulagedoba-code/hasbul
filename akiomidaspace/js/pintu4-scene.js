window.P4SCENE = (function () {
  'use strict';

  const K = window.KAMP;
  const W = 480, H = 270, GROUND = 246;
  const P = K.gambar.P, lingkaran = K.gambar.lingkaran;

  const STASIUN_X = [90, 200, 310, 420];
  const GERBANG_X = i => 30 + i * 42;
  const PANAH_Y = 204;

  const cache = new Map();
  function kosongkan() { cache.clear(); }

  function gedung(c, x, y, w, h, col, colGelap) {
    P(c, x, y, w, h, col);
    P(c, x, y, w, 4, colGelap);
    P(c, x, y, 3, h, colGelap);
    for (let r = 0; r < Math.floor((h - 14) / 13); r++) {
      for (let k = 0; k < Math.floor((w - 6) / 11); k++) {
        P(c, x + 4 + k * 11, y + 8 + r * 13, 6, 8, r % 2 === k % 2 ? '#ffd98a' : '#2a2130');
      }
    }
  }

  function bakarDasar(c) {
    P(c, 0, 0, W, 46, '#a8d8f0');
    P(c, 0, 46, W, 42, '#b8e0f4');
    P(c, 0, 88, W, 40, '#c8e8f8');
    P(c, 0, 128, W, 24, '#d8f0fc');

    lingkaran(c, 418, 30, 11, '#ffe9a3');
    lingkaran(c, 418, 30, 8, '#ffd166');

    gedung(c, 6, 96, 54, 88, '#c4a48c', '#a8846c');
    gedung(c, 64, 118, 42, 66, '#b5716b', '#96555a');
    gedung(c, 108, 88, 58, 96, '#c8b49a', '#ac987e');
    gedung(c, 168, 126, 46, 58, '#b8a48c', '#9c8870');
    gedung(c, 216, 104, 54, 80, '#b5716b', '#96555a');
    gedung(c, 272, 120, 44, 64, '#c4b096', '#a8947a');
    gedung(c, 318, 92, 58, 92, '#b8a48c', '#9c8870');
    gedung(c, 378, 124, 42, 60, '#c8b49a', '#ac987e');
    gedung(c, 422, 100, 52, 84, '#b5716b', '#96555a');
    P(c, 186, 76, 6, 14, '#75583f');
    P(c, 180, 70, 18, 7, '#8a5a3a');

    P(c, 0, 168, W, 10, '#c8c0b0');
    P(c, 0, 178, W, 6, '#d4ccb8');

    for (let i = 0; i < 12; i++) {
      const tx = 16 + i * 42;
      P(c, tx - 1, 176, 2, 12, '#6e5236');
      lingkaran(c, tx, 172, 6, '#3f8f4f');
      lingkaran(c, tx - 3, 176, 4, '#357a43');
    }

    P(c, 0, 190, W, 56, '#c4b8a4');
    for (let i = 0; i < 64; i++) {
      const gx = (i * 53) % W, gy = 194 + (i * 29) % 44;
      P(c, gx, gy, 2, 1, i % 2 ? '#b4a894' : '#d0c4b0');
    }
    for (const bx of [54, 148, 276, 388]) {
      P(c, bx - 8, 208, 16, 4, '#8a8078');
      lingkaran(c, bx, 202, 6, '#4f9a55');
      lingkaran(c, bx - 3, 204, 4, '#43844a');
    }
    for (const fx of [96, 238, 348, 446]) {
      P(c, fx, 214, 2, 2, '#ff9d9d');
      P(c, fx, 216, 1, 3, '#4f9a55');
    }

    P(c, 0, 236, W, 24, '#8a8274');
    P(c, 0, 236, W, 2, '#6e685c');
    P(c, 0, 258, W, 2, '#6e685c');
    for (let i = 0; i < 14; i++) {
      const px2 = (i * 41) % W;
      P(c, px2, 246, 12, 2, '#c8c0b0');
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

    P(c, cx - 2, bottom, 4, GROUND - bottom, '#75583f');
    P(c, cx - 2, bottom, 1, GROUND - bottom, '#5c4430');

    P(c, bx - 2, top - 2, bw + 4, bh + 4, '#5c4430');
    P(c, bx, top, bw, bh, '#f0e8d8');
    P(c, bx + 1, top + 1, bw - 2, 2, '#d4c4a8');

    c.font = fontPx + 'px "Press Start 2P", monospace';
    c.textBaseline = 'top';
    c.fillStyle = '#4a3a24';
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

    P(c, gx - 10, 212, 3, 34, '#b5716b');
    P(c, gx + 7, 212, 3, 34, '#96555a');
    for (let y = -10; y <= 0; y++) {
      const yy = 213 + y;
      if (yy > 213) continue;
      const ww = Math.round(10 * Math.sqrt(Math.max(0, 1 - (y * y) / 121)));
      P(c, gx - ww - 2, yy, 2, 1, '#b5716b');
      P(c, gx + ww, yy, 2, 1, '#96555a');
    }
    P(c, gx - 10, 244, 20, 2, '#7a4a4e');

    P(c, gx - 5, 226, 10, 20, gelap);
    P(c, gx - 5, 226, 10, 2, warna);

    P(c, gx - 13, 218, 2, 12, '#3f8f4f');
    lingkaran(c, gx - 12, 216, 4, '#4f9a55');

    const by = i % 2 === 0 ? 94 : 130;
    c.font = '8px "Press Start 2P", monospace';
    const w1 = c.measureText(kat.label[0]).width;
    const w2 = c.measureText(kat.label[1]).width;
    const bw = Math.ceil(Math.max(w1, w2)) + 12;
    const bx = Math.max(2, Math.min(W - bw - 2, Math.round(gx - bw / 2)));
    P(c, gx - 1, by + 32, 3, Math.max(4, 212 - by - 32), '#5c4430');
    P(c, bx - 2, by - 2, bw + 4, 36, '#5c4430');
    P(c, bx, by, bw, 32, '#f0e8d8');
    P(c, bx + 1, by + 1, bw - 2, 2, '#d4c4a8');
    P(c, bx + 2, by + 2, 1, 1, '#bd5a5f');
    P(c, bx + bw - 3, by + 2, 1, 1, '#bd5a5f');
    c.fillStyle = gelap;
    c.textBaseline = 'top';
    c.fillText(kat.label[0], Math.round(gx - w1 / 2), by + 5);
    c.fillText(kat.label[1], Math.round(gx - w2 / 2), by + 17);

    lencana(c, gx, by - 19, String(i + 1), warna, '#141a2b');
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
    P(c, Math.round(xTengah) - 1, by + bh, 3, GROUND - by - bh, '#5c4430');
    P(c, bx - 2, by - 2, bw + 4, bh + 4, '#5c4430');
    P(c, bx, by, bw, bh, '#f0e8d8');
    P(c, bx + 1, by + 1, bw - 2, 2, '#d4c4a8');
    c.fillStyle = '#4a3a24';
    c.textBaseline = 'top';
    for (let i = 0; i < baris.length; i++)
      c.fillText(baris[i], Math.round(xTengah - c.measureText(baris[i]).width / 2), by + 4 + i * 11);
  }

  function papanArea(c, kat, hal, nHal) {
    c.font = '8px "Press Start 2P", monospace';
    const nama = kat.nama.toUpperCase();
    const wn = c.measureText(nama).width;

    P(c, Math.round(W / 2 - wn / 2) - 7, 12, wn + 14, 20, '#5c4430');
    P(c, Math.round(W / 2 - wn / 2) - 5, 14, wn + 10, 16, '#f0e8d8');
    c.fillStyle = kat.deep;
    c.textBaseline = 'top';
    c.fillText(nama, Math.round(W / 2 - wn / 2), 19);

    const lp = 'LAPISAN ' + (hal + 1) + '/' + nHal;
    c.font = '7px "Press Start 2P", monospace';
    const wl = c.measureText(lp).width;
    P(c, W - 10 - wl - 12, 12, wl + 12, 17, '#5c4430');
    P(c, W - 8 - wl - 12, 14, wl + 8, 13, '#f0e8d8');
    c.fillStyle = '#4a3a24';
    c.fillText(lp, W - 4 - wl - 12, 18);
  }

  function bakarPusat() {
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const c = cv.getContext('2d');
    bakarDasar(c);
    const KAT = window.P4.KATEGORI;

    for (let i = 0; i < KAT.length; i++) gerbang(c, GERBANG_X(i), KAT[i], i);

    for (const sx of [55, 147, 239, 331, 423]) {
      lingkaran(c, sx, GROUND - 4, 5, '#9a9284');
      lingkaran(c, sx + 4, GROUND - 3, 4, '#8a8274');
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
      lencana(c, STASIUN_X[i], puncak - 19, String(t.n), kat.color, '#141a2b');
    }

    const prevAda = hal > 0, nextAda = hal < nHal - 1;
    papanPanah(c, 34, prevAda ? ['< MUNDUR'] : ['< PUSAT']);
    papanPanah(c, W - 34, nextAda ? ['MAJU >'] : ['PUSAT >']);

    for (const sx of [145, 255, 365]) {
      lingkaran(c, sx, GROUND - 4, 5, '#9a9284');
      lingkaran(c, sx + 4, GROUND - 3, 4, '#8a8274');
    }
    return cv;
  }

  function bakar(key) {
    if (cache.has(key)) return cache.get(key);
    let cv;
    if (key === 'pusat') cv = bakarPusat();
    else {
      const m = /^k(\d+):(\d+)$/.exec(key);
      const kat = window.P4.KATEGORI[parseInt(m[1], 10) - 1];
      const hal = parseInt(m[2], 10);
      const daftar = window.P4.topikKategori(parseInt(m[1], 10)).slice(hal * 4, hal * 4 + 4);
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
