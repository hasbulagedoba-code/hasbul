window.KAMP = (function () {
  'use strict';

  const W = 480, H = 270, GROUND = 246;

  function P(c, x, y, w, h, col) { c.fillStyle = col; c.fillRect(x | 0, y | 0, w, h); }
  function lingkaran(c, cx, cy, r, col) {
    for (let y = -r; y <= r; y++) {
      const ww = Math.floor(Math.sqrt(r * r - y * y));
      P(c, cx - ww, cy + y, ww * 2 + 1, 1, col);
    }
  }
  function gunung(c, apexX, apexY, setW, baseY, col) {
    for (let y = apexY; y <= baseY; y++) {
      const u = (y - apexY) / (baseY - apexY);
      const ww = Math.max(1, Math.round(setW * u));
      P(c, apexX - ww, y, ww * 2 + 1, 1, col);
    }
  }
  function pohon(c, x, tanahY, s) {
    const r = 7 * s, tg = 9 * s;
    P(c, x - 1, tanahY - tg, 3, tg, '#6b4a2c');
    P(c, x - 1, tanahY - tg, 1, tg, '#553a20');
    lingkaran(c, x, tanahY - tg - r + 2, r, '#3f8f4f');
    lingkaran(c, x - r * 0.6, tanahY - tg - r + 6, Math.round(r * 0.7), '#357a43');
    lingkaran(c, x + r * 0.55, tanahY - tg - r + 5, Math.round(r * 0.65), '#357a43');
    lingkaran(c, x - 2, tanahY - tg - r + 1, Math.round(r * 0.55), '#4fa55e');
  }
  function teksPx(c, txt, x, y, col, size) {
    c.font = (size || 8) + 'px "Press Start 2P", monospace';
    c.textBaseline = 'top';
    c.fillStyle = col;
    c.fillText(txt, Math.round(x - c.measureText(txt).width / 2), Math.round(y));
  }

  function bakeBG() {
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const c = cv.getContext('2d');

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

    gunung(c, 74, 84, 58, 186, '#a9c8e2');
    gunung(c, 214, 74, 70, 186, '#98bcd9');
    gunung(c, 396, 88, 62, 186, '#a9c8e2');
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

    P(c, 46, 196, 4, 42, '#7a5230');
    P(c, 76, 196, 4, 42, '#7a5230');
    P(c, 34, 168, 58, 32, '#8a5f38');
    P(c, 34, 168, 58, 3, '#a3744a');
    P(c, 36, 198, 54, 2, '#6b4a2c');
    teksPx(c, 'KAMP', 63, 174, '#ffe9a3');
    teksPx(c, 'ANGKA', 63, 186, '#fffdf2');

    for (let r = 0; r < 3; r++)
      for (let i = 0; i < 4 - r; i++)
        P(c, 210 + i * 7 + r * 3, 234 - r * 4, 7, 4, r % 2 ? '#8a5a30' : '#7a4e28');
    P(c, 213, 234, 2, 4, '#5f3d1e');

    for (let i = 0; i < 5; i++) {
      const sx = 352 + (i % 3) * 7, sy = 240 - (i % 2) * 4;
      lingkaran(c, sx, sy, 3, '#9aa6b8');
      P(c, sx - 1, sy - 2, 2, 1, '#c3ccda');
    }

    for (let y = 0; y <= 34; y++) {
      const ww = Math.round(y * 0.85);
      P(c, 334 - ww, 210 + y, ww * 2 + 1, 1, '#c98a4b');
    }
    P(c, 334, 214, 1, 32, '#a96f35');
    P(c, 328, 238, 12, 8, '#5f4426');
    P(c, 331, 240, 6, 6, '#3a2a18');
    P(c, 302, 244, 64, 2, '#b58a4a');

    P(c, 392, 224, 22, 16, '#8a5f38');
    P(c, 392, 224, 22, 3, '#a3744a');
    P(c, 394, 231, 18, 2, '#6b4a2c');
    P(c, 396, 240, 18, 14, '#7a5230');
    P(c, 396, 240, 18, 3, '#8f6238');
    P(c, 404, 246, 4, 4, '#5f4426');
    P(c, 434, 190, 3, 56, '#8a5f38');
    lingkaran(c, 435, 188, 2, '#ffd166');

    pohon(c, 16, 238, 1.3);
    pohon(c, 130, 234, 1);
    pohon(c, 312, 234, 1.1);
    pohon(c, 470, 236, 1.2);

    return cv;
  }

  function apiUnggun(c, t) {
    P(c, 136, 242, 16, 3, '#6e4522');
    P(c, 140, 240, 9, 2, '#8a5a30');
    const naik = Math.sin(t * 9) * 1.5;
    P(c, 141, 234 + naik, 7, 7 - naik * 0.5, '#ff6b35');
    P(c, 142, 231 + naik, 5, 5, '#ff9d4a');
    P(c, 143, 229 + naik, 3, 4, '#ffd166');
  }

  function bendera(c, t) {
    for (let r = 0; r < 9; r++) {
      const gel = Math.sin(t * 3 + r * 0.7) * 1.5;
      P(c, 437 + Math.round(gel), 191 + r, 14, 1, r < 4 ? '#63c8ff' : '#1c6fb4');
    }
    teksPx(c, '1', 444, 192, '#fffdf2', 7);
  }

  function tendaBangun(c, tiang, selesai, t) {
    P(c, 236, 244, 64, 2, '#b58a4a');

    P(c, 240, 240, 3, 6, '#8a6a45');
    P(c, 293, 240, 3, 6, '#8a6a45');
    if (selesai) {
      for (let y = 0; y <= 36; y++) {
        const ww = Math.round(y * 0.9);
        P(c, 268 - ww, 208 + y, ww * 2 + 1, 1, '#d09a55');
      }
      P(c, 268, 212, 1, 34, '#a96f35');
      P(c, 262, 238, 12, 8, '#5f4426');
      P(c, 265, 240, 6, 6, '#3a2a18');
      teksPx(c, '1', 268, 220, '#fff3cf', 7);
    } else {

      const px3 = [250, 286, 268];
      for (let i = 0; i < tiang; i++) {
        const tg = 10 + i * 6;
        P(c, px3[i] - 1, 244 - tg, 3, tg, '#c98a4b');
        P(c, px3[i] - 1, 244 - tg, 1, tg, '#a96f35');
      }
      if (tiang > 0) P(c, 248, 244 - 16, 42, 2, '#8a6a45');
      teksPx(c, 'BUTUH TIANG', 268, 250 - 30, '#e8eef8', 6);
    }
  }

  function bolaLentera(c, x, y, warna, gelap, glif, bob) {
    const yy = y - Math.round(Math.abs(Math.sin(bob)) * 2);
    lingkaran(c, x, yy, 9, gelap);
    lingkaran(c, x - 1, yy - 2, 8, warna);
    P(c, x - 4, yy - 6, 3, 2, '#ffffff');
    teksPx(c, glif, x, yy - 4, '#fffdf2', 8);
  }

  function akio(c, x, y, scale, sq, jalan) {
    const r = Math.max(2, Math.round(9 * scale));
    const yy = y - Math.round((jalan ? Math.abs(Math.sin(jalan)) * 2 : 0));
    c.save();
    c.translate(x, yy);
    c.scale(1 + sq * 0.14, 1 - sq * 0.14);
    lingkaran(c, 0, -r, r, '#d98f2b');
    lingkaran(c, -1, -r - 1, r - 1, '#f6c453');
    lingkaran(c, -Math.round(r * 0.35), -r - Math.round(r * 0.3), Math.max(1, Math.round(r * 0.28)), '#fff3cf');
    c.restore();
  }

  function bayangan(c, x, y, w) {
    c.fillStyle = 'rgba(20,26,40,.22)';
    c.fillRect(Math.round(x - w / 2), Math.round(y - 1), Math.round(w), 2);
  }

  return {
    W, H, GROUND, bakeBG,
    gambar: { apiUnggun, bendera, tendaBangun, bolaLentera, akio, bayangan, teksPx, lingkaran, P },
  };
})();
