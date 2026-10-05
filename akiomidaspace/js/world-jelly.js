/* =========================================================
   DUNIA AKIOMIDA — Sprite Pixel (world-jelly.js)
   Akio si pemandu keemasan (satu-satunya emas bermahkota)
   dan penduduk per wilayah. Semua digambar piksel demi piksel.
   ========================================================= */
window.AKJELLY = (function () {
  'use strict';
  const P = window.AK.P, lingkaran = window.AK.lingkaran;

  function kanvas(w, h) {
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    return cv;
  }

  /* ---------- AKIO: bola emas bermahkota (18 x 21) ---------- */
  function akioFrame(langkah, kedip) {
    const cv = kanvas(18, 21), c = cv.getContext('2d');
    const bob = (langkah === 1 || langkah === 3) ? -1 : 0;

    // mahkota — hanya Akio yang memakainya
    P(c, 6, 2 + bob, 1, 3, '#ffd166');
    P(c, 8, 1 + bob, 1, 4, '#ffd166');
    P(c, 10, 2 + bob, 1, 3, '#ffd166');
    P(c, 5, 5 + bob, 9, 2, '#e0a32e');
    P(c, 5, 5 + bob, 9, 1, '#f6c453');

    // badan bola emas
    lingkaran(c, 9, 12 + bob, 6, '#a86f1c');
    lingkaran(c, 9, 12 + bob, 5, '#f6c453');
    P(c, 5, 8 + bob, 3, 2, '#ffe9ad');
    P(c, 5, 10 + bob, 1, 2, '#ffe9ad');

    // wajah
    if (kedip) {
      P(c, 6, 11 + bob, 2, 1, '#3a2a08');
      P(c, 11, 11 + bob, 2, 1, '#3a2a08');
    } else {
      P(c, 6, 10 + bob, 2, 2, '#3a2a08');
      P(c, 11, 10 + bob, 2, 2, '#3a2a08');
      P(c, 6, 10 + bob, 1, 1, '#fffdf2');
      P(c, 11, 10 + bob, 1, 1, '#fffdf2');
    }
    P(c, 4, 14 + bob, 2, 1, '#ff9d6b');
    P(c, 13, 14 + bob, 2, 1, '#ff9d6b');
    P(c, 8, 15 + bob, 3, 1, '#7a4a10');

    // sepatu — langkah kaki
    const off = langkah === 1 ? -1 : langkah === 3 ? 1 : 0;
    P(c, 5 + off, 18, 3, 2, '#8a5a24');
    P(c, 10 - off, 19, 3, 2, '#6e4522');
    return cv;
  }

  function buatAkio() {
    return {
      idle: akioFrame(0, false),
      kedip: akioFrame(0, true),
      jalan: [akioFrame(0, false), akioFrame(1, false), akioFrame(2, false), akioFrame(3, false)],
    };
  }

  /* ---------- PENDUDUK (16 x 20) ---------- */
  function npcFrame(n, fase) {
    const cv = kanvas(16, 20), c = cv.getContext('2d');
    const bob = fase ? -1 : 0;

    // kaki
    P(c, 5, 17, 2, 2, '#5a4632');
    P(c, 9, 17, 2, 2, '#5a4632');
    // badan
    P(c, 4, 8 + bob, 8, 9, n.baju);
    P(c, 4, 8 + bob, 2, 9, n.bajuD);
    P(c, 3, 9 + bob, 1, 5, n.bajuD);
    P(c, 12, 9 + bob, 1, 5, n.bajuD);
    // kepala
    lingkaran(c, 8, 5 + bob, 3, '#f2c99a');
    P(c, 6, 4 + bob, 1, 2, '#3a2a08');
    P(c, 9, 4 + bob, 1, 2, '#3a2a08');

    // penutup kepala per daerah
    if (n.jenis === 'topi') {          // topi jerami petani angka
      P(c, 3, 3 + bob, 10, 1, n.topi);
      P(c, 5, 1 + bob, 6, 2, n.topi);
      P(c, 5, 2 + bob, 6, 1, '#c2a271');
    } else if (n.jenis === 'daun') {   // tudung dedaunan
      P(c, 4, 1 + bob, 8, 4, n.topi);
      P(c, 5, 0 + bob, 6, 1, n.topi);
      P(c, 8, 0 + bob, 1, 1, '#4fa55e');
    } else if (n.jenis === 'rajut') {  // kupluk rajut pendaki
      P(c, 4, 1 + bob, 8, 3, n.topi);
      P(c, 7, 0 + bob, 2, 2, '#fffdf2');
    } else if (n.jenis === 'helm') {   // helm tukang bangunan bukti
      P(c, 4, 2 + bob, 8, 3, n.topi);
      P(c, 4, 4 + bob, 8, 1, '#6e7f92');
      P(c, 8, 2 + bob, 1, 1, '#ffd166');
    } else if (n.jenis === 'tudung') { // jubah penjelajah kedalaman
      P(c, 4, 1 + bob, 8, 5, n.topi);
      P(c, 6, 3 + bob, 4, 3, '#f2c99a');
    } else if (n.jenis === 'kupluk') { // parka peneliti puncak
      P(c, 4, 1 + bob, 8, 4, n.topi);
      P(c, 4, 4 + bob, 8, 1, '#e8eef8');
    }
    return cv;
  }

  function buatNpc(n) { return [npcFrame(n, 0), npcFrame(n, 1)]; }

  return { buatAkio, buatNpc };
})();
