/* =========================================================
   PINTU 2 — BAKER LATAR PER LAYAR (pintu2-scene.js)
   Hutan Simbol: kanopi rimbun, sulur gantung, kabut tipis,
   lantai lumut, jalan daun. Setiap layar (pusat + lapisan
   penjuru) dibakar SEKALI ke kanvas offscreen. Tidak ada
   kamera — tiap layar tetap 480x270 utuh.
   ========================================================= */
window.P2SCENE = (function () {
  'use strict';

  const K = window.KAMP;
  const W = 480, H = 270, GROUND = 246;          // samakan dengan kamp-scene
  const P = K.gambar.P, lingkaran = K.gambar.lingkaran;

  const STASIUN_X = [90, 200, 310, 420];         // 4 judul per lapisan
  const GERBANG_X = i => 32 + i * 46;            // 10 gerbang di pusat
  const PANAH_Y = 204;                            // papan panah di tepi jalan

  /* ---------- cache latar ---------- */
  const cache = new Map();
  function kosongkan() { cache.clear(); }

  /* ---------- dasar alam hutan (sama semua layar) ---------- */
  function bakarDasar(c) {
    // langit hijau tembus kanopi
    P(c, 0, 0, W, 46, '#aee6c4');
    P(c, 0, 46, W, 42, '#9adcb4');
    P(c, 0, 88, W, 40, '#b2e2c0');
    P(c, 0, 128, W, 24, '#c2e8ca');

    // kanopi lebat menutup langit atas
    const kanopi = [
      [20, 14, 30, '#2a6d3c'], [70, 8, 34, '#357a43'], [124, 16, 30, '#2f7a44'],
      [178, 6, 32, '#2a6d3c'], [232, 14, 30, '#357a43'], [286, 4, 34, '#2f7a44'],
      [340, 12, 32, '#2a6d3c'], [394, 8, 32, '#357a43'], [448, 16, 30, '#2f7a44'],
      [474, 6, 28, '#2a6d3c'],
    ];
    for (const [kx, ky, kr, kol] of kanopi) {
      lingkaran(c, kx, ky, kr, kol);
      lingkaran(c, kx - kr * 0.4, ky + kr * 0.5, Math.round(kr * 0.6), kol);
      lingkaran(c, kx + kr * 0.45, ky + kr * 0.45, Math.round(kr * 0.55), kol);
    }
    // kilau cahaya matahari menembus daun (benda: berkas cahaya)
    lingkaran(c, 104, 44, 5, '#f2ffd8');
    lingkaran(c, 104, 44, 2, '#ffffff');
    lingkaran(c, 356, 38, 4, '#f2ffd8');

    // sulur gantung dari kanopi
    const sulur = [46, 148, 262, 372, 452];
    for (let i = 0; i < sulur.length; i++) {
      const sx = sulur[i];
      const panjang = 26 + (i % 3) * 12;
      P(c, sx, 30, 2, panjang, '#3d8a4e');
      for (let d = 6; d < panjang - 2; d += 9) {
        lingkaran(c, sx - 3, 30 + d, 3, '#4fa55e');
        lingkaran(c, sx + 4, 30 + d + 4, 2, '#3d8a4e');
      }
      lingkaran(c, sx + 1, 30 + panjang + 1, 3, '#57b066');
    }

    // batang raksasa di kedua tepi
    P(c, 0, 60, 26, 186, '#6b4a2c');
    P(c, 0, 60, 6, 186, '#553a20');
    for (let y = 74; y < 240; y += 22) P(c, 8, y, 14, 2, '#5f4426');
    P(c, 454, 76, 26, 170, '#6b4a2c');
    P(c, 474, 76, 6, 170, '#553a20');
    for (let y = 92; y < 240; y += 20) P(c, 460, y, 14, 2, '#5f4426');
    // akar melebar
    lingkaran(c, 16, 244, 12, '#6b4a2c');
    lingkaran(c, 464, 244, 12, '#6b4a2c');

    // pohon-pohon kejauhan
    const jauh = [58, 96, 142, 186, 236, 282, 328, 374, 414];
    for (let i = 0; i < jauh.length; i++) {
      const tx = jauh[i], ty = 168 + (i % 3) * 3;
      P(c, tx - 1, ty, 3, 16, '#4a6b3a');
      lingkaran(c, tx, ty - 4, 8, '#41653c');
      lingkaran(c, tx - 5, ty + 1, 5, '#3a5c36');
      lingkaran(c, tx + 5, ty + 2, 5, '#3a5c36');
    }
    P(c, 0, 184, W, 22, '#5e8a56');               // semak lembap kejauhan
    for (let i = 0; i < 12; i++) {
      const mx = 10 + i * 40;
      lingkaran(c, mx, 186 + (i % 2) * 3, 7, '#558a52');
    }

    // kabut tipis di atas tanah
    P(c, 0, 178, W, 8, '#d8efe0');
    P(c, 0, 186, W, 4, '#e4f4e8');

    // tanah lumut
    P(c, 0, 190, W, 56, '#57a04a');
    for (let i = 0; i < 70; i++) {
      const gx = (i * 53) % W, gy = 194 + (i * 29) % 44;
      P(c, gx, gy, 2, 1, i % 2 ? '#4c9440' : '#68b95a');
    }
    for (const fx of [64, 214, 318, 428]) {        // pakis kecil
      P(c, fx, 210, 2, 8, '#3d7a40');
      lingkaran(c, fx + 4, 209, 4, '#4c9440');
      lingkaran(c, fx - 4, 211, 3, '#3d7a40');
    }

    // jalan setapak daun
    P(c, 0, 236, W, 24, '#c9a876');
    P(c, 0, 236, W, 2, '#b58a5e');
    P(c, 0, 258, W, 2, '#b58a5e');
    for (let i = 0; i < 30; i++) {
      const px2 = (i * 37) % W, py2 = 240 + (i * 13) % 16;
      P(c, px2, py2, 3, 2, i % 3 ? '#b89668' : '#d9bd8e');   // daun gugur
    }
    for (const dx of [40, 160, 300, 434]) {        // daun lembah di tepi jalan
      lingkaran(c, dx, 238, 3, '#a3744a');
      lingkaran(c, dx + 4, 240, 2, '#c9a876');
    }
  }

  /* ---------- pemenggal judul utk papan pixel ---------- */
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

  /* ---------- papan judul (stasiun) — papan kayu hutan ---------- */
  function papanJudul(c, cx, lines, fontPx) {
    c.font = fontPx + 'px "Press Start 2P", monospace';
    let bw = 0;
    for (const b of lines) bw = Math.max(bw, c.measureText(b).width);
    bw = Math.ceil(bw) + 10;
    const bh = lines.length * (fontPx + 4) + 8;
    const bottom = 196, top = bottom - bh;
    const bx = Math.round(cx - bw / 2);
    // tiang
    P(c, cx - 1, bottom, 3, GROUND - bottom, '#5f4426');
    P(c, cx - 1, bottom, 1, GROUND - bottom, '#4a341c');
    // papan + bingkai kayu tua
    P(c, bx - 2, top - 2, bw + 4, bh + 4, '#1e3a2a');
    P(c, bx, top, bw, bh, '#122419');
    P(c, bx + 1, top + 1, bw - 2, 2, '#1c3524');
    // teks
    c.font = fontPx + 'px "Press Start 2P", monospace';
    c.textBaseline = 'top';
    c.fillStyle = '#eafff2';
    for (let i = 0; i < lines.length; i++)
      c.fillText(lines[i], Math.round(cx - c.measureText(lines[i]).width / 2), top + 4 + i * (fontPx + 4));
    return top;                                    // y puncak papan (untuk lencana & kilau)
  }

  /* ---------- lencana nomor di atas papan ---------- */
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
    return y - 2;                                  // puncak lencana
  }

  /* ---------- gerbang kecil penjuru (pusat) — gerbang kayu tertutup sulur ---------- */
  function gerbang(c, gx, kat, i) {
    const warna = kat.color, gelap = kat.deep;
    // ceruk pintu + lengkung
    P(c, gx - 8, 214, 16, 32, '#0f1f16');
    for (let y = -8; y <= 0; y++) {
      const yy = 214 + y;
      if (yy > 214) continue;
      const ww = Math.floor(Math.sqrt(64 - y * y));
      P(c, gx - ww, yy, ww * 2 + 1, 1, '#0f1f16');
    }
    // bingkai kayu
    P(c, gx - 10, 212, 3, 34, '#6b4a2c');
    P(c, gx + 7, 212, 3, 34, '#553a20');
    for (let y = -10; y <= 0; y++) {
      const yy = 213 + y;
      if (yy > 213) continue;
      const ww = Math.round(10 * Math.sqrt(Math.max(0, 1 - (y * y) / 121)));
      P(c, gx - ww - 2, yy, 2, 1, '#6b4a2c');
      P(c, gx + ww, yy, 2, 1, '#553a20');
    }
    P(c, gx - 10, 244, 20, 2, '#4a341c');
    // garis cahaya di dalam ceruk (warna penjuru)
    P(c, gx - 5, 226, 10, 20, gelap);
    P(c, gx - 5, 226, 10, 2, warna);
    // sulur memeluk bingkai
    P(c, gx - 11, 216, 2, 14, '#3d8a4e');
    lingkaran(c, gx - 10, 214, 3, '#4fa55e');
    // papan nama dua baris (tinggi selang-seling biar tak bertabrakan)
    const by = i % 2 === 0 ? 94 : 130;
    c.font = '8px "Press Start 2P", monospace';
    const w1 = c.measureText(kat.label[0]).width;
    const w2 = c.measureText(kat.label[1]).width;
    const bw = Math.ceil(Math.max(w1, w2)) + 12;
    const bx = Math.max(2, Math.min(W - bw - 2, Math.round(gx - bw / 2)));   // jangan terpotong tepi
    P(c, gx - 1, by + 32, 3, Math.max(4, 212 - by - 32), '#4a341c');
    P(c, bx - 2, by - 2, bw + 4, 36, '#1e3a2a');
    P(c, bx, by, bw, 32, '#122419');
    P(c, bx + 1, by + 1, bw - 2, 2, '#1c3524');
    P(c, bx + 2, by + 2, 1, 1, '#a8e8c0');
    P(c, bx + bw - 3, by + 2, 1, 1, '#a8e8c0');
    c.fillStyle = warna;
    c.textBaseline = 'top';
    c.fillText(kat.label[0], Math.round(gx - w1 / 2), by + 5);
    c.fillText(kat.label[1], Math.round(gx - w2 / 2), by + 17);
    // lencana nomor
    lencana(c, gx, by - 19, String(i + 1), warna, '#0f1f16');
  }

  /* ---------- papan panah tepi ---------- */
  function papanPanah(c, xTengah, baris) {
    c.font = '7px "Press Start 2P", monospace';
    let bw = 0;
    for (const b of baris) bw = Math.max(bw, c.measureText(b).width);
    bw = Math.ceil(bw) + 12;
    const bh = baris.length * 11 + 8;
    let bx = Math.round(xTengah - bw / 2);
    bx = Math.max(2, Math.min(W - bw - 2, bx));
    const by = PANAH_Y;
    P(c, Math.round(xTengah) - 1, by + bh, 3, GROUND - by - bh, '#4a341c');
    P(c, bx - 2, by - 2, bw + 4, bh + 4, '#1e3a2a');
    P(c, bx, by, bw, bh, '#122419');
    P(c, bx + 1, by + 1, bw - 2, 2, '#1c3524');
    c.fillStyle = '#a8e8c0';
    c.textBaseline = 'top';
    for (let i = 0; i < baris.length; i++)
      c.fillText(baris[i], Math.round(xTengah - c.measureText(baris[i]).width / 2), by + 4 + i * 11);
  }

  /* ---------- papan judul area (atas, nama penjuru) ---------- */
  function papanArea(c, kat, hal, nHal) {
    c.font = '8px "Press Start 2P", monospace';
    const nama = kat.nama.toUpperCase();
    const wn = c.measureText(nama).width;
    // papan nama penjuru — tengah atas (kiri-atas dipakai chip HTML)
    P(c, Math.round(W / 2 - wn / 2) - 7, 12, wn + 14, 20, '#1e3a2a');
    P(c, Math.round(W / 2 - wn / 2) - 5, 14, wn + 10, 16, '#122419');
    c.fillStyle = kat.color;
    c.textBaseline = 'top';
    c.fillText(nama, Math.round(W / 2 - wn / 2), 19);
    // lapisan — kanan atas
    const lp = 'LAPISAN ' + (hal + 1) + '/' + nHal;
    c.font = '7px "Press Start 2P", monospace';
    const wl = c.measureText(lp).width;
    P(c, W - 10 - wl - 12, 12, wl + 12, 17, '#1e3a2a');
    P(c, W - 8 - wl - 12, 14, wl + 8, 13, '#122419');
    c.fillStyle = '#eafff2';
    c.fillText(lp, W - 4 - wl - 12, 18);
  }

  /* ---------- bakar PUSAT ---------- */
  function bakarPusat() {
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const c = cv.getContext('2d');
    bakarDasar(c);
    const KAT = window.P2.KATEGORI;
    // 10 gerbang selang-seling tinggi
    for (let i = 0; i < KAT.length; i++) gerbang(c, GERBANG_X(i), KAT[i], i);
    // semak kecil pengisi antar gerbang
    for (const sx of [55, 147, 239, 331, 423]) {
      lingkaran(c, sx, GROUND - 4, 5, '#4c9440');
      lingkaran(c, sx + 4, GROUND - 3, 4, '#3d7a40');
    }
    return cv;
  }

  /* ---------- bakar LAPISAN AREA ---------- */
  function bakarArea(kat, hal, daftar) {
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const c = cv.getContext('2d');
    bakarDasar(c);
    const nHal = Math.ceil(kat.jumlah / 4);
    papanArea(c, kat, hal, nHal);
    // 4 stasiun judul
    for (let i = 0; i < daftar.length; i++) {
      const t = daftar[i];
      const bj = barisJudul(t.judul);
      const puncak = papanJudul(c, STASIUN_X[i], bj.lines, bj.fontPx);
      lencana(c, STASIUN_X[i], puncak - 19, String(t.n), kat.color, '#0f1f16');
    }
    // papan panah tepi
    const prevAda = hal > 0, nextAda = hal < nHal - 1;
    papanPanah(c, 34, prevAda ? ['< MUNDUR'] : ['< PUSAT']);
    papanPanah(c, W - 34, nextAda ? ['MAJU >'] : ['PUSAT >']);
    // semak & batu pengisi
    for (const sx of [145, 255, 365]) {
      lingkaran(c, sx, GROUND - 4, 5, '#4c9440');
      lingkaran(c, sx + 4, GROUND - 3, 4, '#3d7a40');
    }
    return cv;
  }

  function bakar(key) {
    if (cache.has(key)) return cache.get(key);
    let cv;
    if (key === 'pusat') cv = bakarPusat();
    else {
      // format: 'k<k>:<hal>'
      const m = /^k(\d+):(\d+)$/.exec(key);
      const kat = window.P2.KATEGORI[parseInt(m[1], 10) - 1];
      const hal = parseInt(m[2], 10);
      const daftar = window.P2.topikKategori(parseInt(m[1], 10)).slice(hal * 4, hal * 4 + 4);
      cv = bakarArea(kat, hal, daftar);
    }
    cache.set(key, cv);
    return cv;
  }

  /* ---------- sprite cahaya gerbang (dibuat sekali per warna) ---------- */
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
