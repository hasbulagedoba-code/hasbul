/* =========================================================
   DUNIA AKIOMIDA — Lingkungan (world-env.js)
   DUNIA SATU LAYAR TETAP 480x270 (pixel art, tanpa kamera)
   Semua wilayah selalu terlihat: tidak ada lagi layar geser.
   Penduduk = bola-lentera bermotif angka/simbol (bukan makhluk hidup).
   ========================================================= */
window.AK = (function () {
  'use strict';

  const W = 480, H = 270;
  const GROUND = 240;          // garis jalan (kaki tokoh)
  const PATH_BAWAH = 254;      // batas bawah jalan setapak

  /* ---------- enam wilayah: semuanya di satu layar ---------- */
  const ZONES = [
    { name: 'Kamp Angka',        slogan: 'Wilayah permulaan perjalanan',  href: 'kamp-angka-matematika.html',        open: true,  x: 40,  biome: 'kamp',
      color: '#63c8ff', deep: '#1c6fb4', label: ['KAMP', 'ANGKA'] },
    { name: 'Hutan Simbol',      slogan: 'Wilayah bahasa dan tanda',      href: 'hutan-simbol-matematika.html',      open: false, x: 118, biome: 'hutan',
      color: '#4fe3c8', deep: '#0d8a74', label: ['HUTAN', 'SIMBOL'] },
    { name: 'Pegunungan Pola',   slogan: 'Wilayah susunan dan bentuk',    href: 'pegunungan-pola-matematika.html',   open: false, x: 196, biome: 'gunung',
      color: '#ffd166', deep: '#c07d0c', label: ['PEGUNUNGAN', 'POLA'] },
    { name: 'Kota Bukti',        slogan: 'Wilayah alasan dan pembuktian', href: 'kota-bukti-matematika.html',        open: false, x: 274, biome: 'kota',
      color: '#ff9d9d', deep: '#bd5a5f', label: ['KOTA', 'BUKTI'] },
    { name: 'Lembah Kedalaman',  slogan: 'Wilayah pemahaman yang dalam',  href: 'lembah-kedalaman-matematika.html',  open: false, x: 352, biome: 'lembah',
      color: '#bb8fff', deep: '#6a3fc0', label: ['LEMBAH', 'KEDALAMAN'] },
    { name: 'Puncak Riset',      slogan: 'Wilayah para penjelajah terdepan', href: 'puncak-riset-matematika.html',   open: false, x: 430, biome: 'salju',
      color: '#a5d8ff', deep: '#4a7fc0', label: ['PUNCAK', 'RISET'] },
  ];

  /* ---------- penduduk: BOLA-LANTERA WILAYAH (syariah: bukan makhluk hidup,
     tanpa wajah/anggota badan) — satu per wilayah, selalu di tempatnya ---------- */
  const NPCS = [
    { zone: 0, x: 72,  warna: '#63c8ff', gelap: '#1c6fb4', glif: '1',
      ucap: [['Selamat', 'datang!'], ['Ayo mulai', 'dari sini!']] },
    { zone: 1, x: 92,  warna: '#4fe3c8', gelap: '#0d8a74', glif: 'pi',
      ucap: [['Simbol itu', 'bahasa!'], ['Awas', 'tersesat!']] },
    { zone: 2, x: 226, warna: '#ffd166', gelap: '#c07d0c', glif: 'delta',
      ucap: [['Temukan', 'polanya!'], ['Pola itu', 'seru!']] },
    { zone: 3, x: 312, warna: '#ff9d9d', gelap: '#bd5a5f', glif: 'eq',
      ucap: [['Buktikan', 'dengannya!'], ['Segera', 'hadir!']] },
    { zone: 4, x: 384, warna: '#bb8fff', gelap: '#6a3fc0', glif: 'inf',
      ucap: [['Makin dalam,', 'makin paham!'], ['Segera', 'hadir!']] },
    { zone: 5, x: 462, warna: '#a5d8ff', gelap: '#4a7fc0', glif: 'tanya',
      ucap: [['Sampai jumpa', 'di puncak!'], ['Segera', 'hadir!']] },
  ];

  /* ---------- alat gambar pixel ---------- */
  function P(c, x, y, w, h, col) { c.fillStyle = col; c.fillRect(x | 0, y | 0, w, h); }
  function lingkaran(c, cx, cy, r, col) {
    for (let y = -r; y <= r; y++) {
      const ww = Math.floor(Math.sqrt(r * r - y * y));
      P(c, cx - ww, cy + y, ww * 2 + 1, 1, col);
    }
  }
  function gunung(c, apexX, apexY, setW, baseY, col, colSalju) {
    for (let y = apexY; y <= baseY; y++) {
      const u = (y - apexY) / (baseY - apexY);
      const ww = Math.max(1, Math.round(setW * u));
      P(c, apexX - ww, y, ww * 2 + 1, 1, col);
    }
    if (colSalju) {
      const capB = apexY + Math.round((baseY - apexY) * 0.26);
      for (let y = apexY; y <= capB; y++) {
        const u = (y - apexY) / (baseY - apexY);
        const ww = Math.max(1, Math.round(setW * u));
        P(c, apexX - ww, y, ww * 2 + 1, 1, colSalju);
      }
    }
  }
  function pohon(c, x, tanahY, s) {   // s = skala 1..2
    const r = 7 * s, tg = 9 * s;
    P(c, x - 1, tanahY - tg, 3, tg, '#6b4a2c');
    P(c, x - 1, tanahY - tg, 1, tg, '#553a20');
    lingkaran(c, x, tanahY - tg - r + 2, r, '#3f8f4f');
    lingkaran(c, x - r * 0.6, tanahY - tg - r + 6, Math.round(r * 0.7), '#357a43');
    lingkaran(c, x + r * 0.55, tanahY - tg - r + 5, Math.round(r * 0.65), '#357a43');
    lingkaran(c, x - 2, tanahY - tg - r + 1, Math.round(r * 0.55), '#4fa55e');
  }

  // glif pixel untuk lencana nomor pintu (penghubung ke daftar wilayah)
  const DIGIT = {
    '1': ['..#..', '.##..', '..#..', '..#..', '..#..', '..#..', '.###.'],
    '2': ['.###.', '#...#', '....#', '..##.', '.#...', '#....', '#####'],
    '3': ['####.', '....#', '....#', '.###.', '....#', '....#', '####.'],
    '4': ['...#.', '..##.', '.#.#.', '#..#.', '#####', '...#.', '...#.'],
    '5': ['#####', '#....', '####.', '....#', '....#', '#...#', '.###.'],
    '6': ['.###.', '#....', '####.', '#...#', '#...#', '#...#', '.###.'],
  };

  /* ---------- papan nama: semua label di ketinggian sama ---------- */
  const PLAQUE_Y = 116;
  function papanNama(c, z, urut) {
    const font = '8px "Press Start 2P", monospace';
    c.font = font;
    const w1 = c.measureText(z.label[0]).width;
    const w2 = c.measureText(z.label[1]).width;
    const bw = Math.max(38, Math.ceil(Math.max(w1, w2)) + 12);
    const bh = 27;
    const bx = Math.round(z.x - bw / 2), by = PLAQUE_Y;
    // tiang papan
    P(c, z.x - 1, by + bh, 3, Math.max(6, z.atapY - by - bh), '#5d4a30');
    P(c, z.x - 1, by + bh, 1, Math.max(6, z.atapY - by - bh), '#4a3a24');
    // papan
    P(c, bx - 2, by - 2, bw + 4, bh + 4, '#37476f');
    P(c, bx, by, bw, bh, '#141d33');
    P(c, bx + 1, by + 1, bw - 2, 2, '#1c2740');
    P(c, bx + 2, by + 2, 1, 1, '#ffd166');
    P(c, bx + bw - 3, by + 2, 1, 1, '#ffd166');
    c.fillStyle = z.color;
    c.textBaseline = 'top';
    c.font = font;
    c.fillText(z.label[0], Math.round(z.x - w1 / 2), by + 5);
    c.fillText(z.label[1], Math.round(z.x - w2 / 2), by + 15);

    // lencana NOMOR BESAR di atas papan — terbaca mata minus, penghubung
    // ke daftar wilayah di layar (nomor sama warna sama)
    const g = DIGIT[String(urut + 1)];
    P(c, z.x - 10, 90, 20, 24, '#10182b');
    P(c, z.x - 10, 90, 20, 1, z.color);
    P(c, z.x - 10, 113, 20, 1, z.color);
    P(c, z.x - 10, 90, 1, 24, z.color);
    P(c, z.x + 9, 90, 1, 24, z.color);
    for (let r = 0; r < 7; r++)
      for (let k = 0; k < 5; k++)
        if (g[r][k] === '#') P(c, z.x - 5 + k * 2, 94 + r * 2, 2, 2, '#fffdf2');
    P(c, z.x - 1, 114, 2, 2, '#37476f');
  }

  /* ---------- pintu gerbang (ceruk + bingkai kayu) ---------- */
  function pintu(c, z) {
    const x = z.x, gy = GROUND;
    P(c, x - 11, gy - 34, 22, 34, '#141a2b');                 // ceruk gelap
    lingkaranPotong(c, x, gy - 33, 11, '#141a2b', gy - 44);   // lengkung atas ceruk
    P(c, x - 13, gy - 36, 4, 36, '#8a5a30');                  // bingkai kiri
    P(c, x + 9, gy - 36, 4, 36, '#6e4522');                   // bingkai kanan
    for (let y = gy - 44; y < gy - 33; y++) {                 // bingkai lengkung
      const u = (gy - 44 - y) / 11;
      const ww = Math.round(13 * Math.sqrt(Math.max(0, 1 - u * u)));
      P(c, x - ww - 2, y, 2, 1, '#8a5a30');
      P(c, x + ww, y, 2, 1, '#6e4522');
    }
    P(c, x - 13, gy - 2, 26, 2, '#4a3a24');                   // ambang
    if (!z.open) {                                            // papan disegel
      P(c, x - 10, gy - 26, 20, 4, '#8a6a43');
      P(c, x - 9, gy - 17, 18, 4, '#7a5c3a');
      P(c, x - 10, gy - 26, 20, 1, '#a3825a');
      P(c, x - 1, gy - 28, 3, 5, '#c9c9d4');                 // gembok
      P(c, x - 1, gy - 30, 3, 2, '#8a8a98');
      P(c, x, gy - 27, 1, 2, '#5a5a68');
    }
  }
  function lingkaranPotong(c, cx, cy, r, col, batasY) {
    for (let y = -r; y <= r; y++) {
      const yy = cy + y;
      if (yy > batasY) continue;
      const ww = Math.floor(Math.sqrt(r * r - y * y));
      P(c, cx - ww, yy, ww * 2 + 1, 1, col);
    }
  }

  /* ---------- bangunan per wilayah ---------- */
  function bangunanKamp(c, z) {
    const x = z.x, gy = GROUND;
    z.atapY = 150;
    // gerbang kayu kamp
    P(c, x - 26, gy - 66, 8, 66, '#8a5a30');
    P(c, x - 26, gy - 66, 3, 66, '#6e4522');
    P(c, x + 18, gy - 66, 8, 66, '#8a5a30');
    P(c, x + 23, gy - 66, 3, 66, '#6e4522');
    P(c, x - 30, gy - 74, 60, 10, '#a56a38');
    P(c, x - 30, gy - 74, 60, 3, '#b87c46');
    P(c, x - 30, gy - 66, 60, 2, '#7a4c26');
    // spanduk biru
    P(c, x - 18, gy - 64, 36, 16, z.color);
    P(c, x - 18, gy - 64, 36, 3, '#8fdcff');
    P(c, x - 18, gy - 50, 36, 2, z.deep);
    P(c, x - 18, gy - 64, 3, 16, z.deep);
    P(c, x + 15, gy - 64, 3, 16, z.deep);
    // tenda kecil di kiri
    P(c, x - 48, gy - 30, 3, 30, '#8a5a30');
    for (let i = 0; i < 16; i++) P(c, x - 47 + i, gy - 30 + Math.round(i * 0.45), 16 - i, 1, i < 8 ? '#d98f4a' : '#c07d3a');
    pintu(c, z);
  }
  function bangunanHutan(c, z) {
    const x = z.x, gy = GROUND;
    z.atapY = 104;
    P(c, x - 22, gy - 92, 44, 92, '#7a4e28');                  // batang raksasa
    P(c, x - 22, gy - 92, 8, 92, '#5e3a1c');
    P(c, x + 12, gy - 92, 10, 92, '#5e3a1c');
    for (let i = 0; i < 5; i++) P(c, x - 18 + i * 9, gy - 80 + (i % 2) * 18, 2, 12, '#4a2e14');
    lingkaran(c, x, gy - 108, 36, '#3f8f4f');                  // tajuk
    lingkaran(c, x - 30, gy - 96, 22, '#357a43');
    lingkaran(c, x + 30, gy - 97, 23, '#357a43');
    lingkaran(c, x - 10, gy - 124, 20, '#4fa55e');
    lingkaran(c, x + 16, gy - 120, 17, '#4fa55e');
    P(c, x - 8, gy - 40, 4, 14, '#2f6b3a');                    // sulur
    P(c, x + 16, gy - 48, 3, 18, '#2f6b3a');
    pintu(c, z);
  }
  function bangunanGunung(c, z) {
    const x = z.x, gy = GROUND;
    z.atapY = 156;
    P(c, x - 27, gy - 54, 54, 54, '#9aa7b8');
    P(c, x - 27, gy - 54, 5, 54, '#7e8ca0');
    for (let r = 0; r < 4; r++) for (let k = 0; k < 6; k++)
      P(c, x - 24 + k * 9 + (r % 2) * 4, gy - 50 + r * 12, 8, 1, '#8794a8');
    // atap salju
    for (let i = 0; i < 31; i++) P(c, x - 30 + i, gy - 58 + Math.abs(i - 15), 1, Math.max(2, 16 - Math.abs(i - 15)), '#cfd9e6');
    for (let i = 4; i < 27; i++) P(c, x - 30 + i, gy - 56 + Math.abs(i - 15), 1, 2, '#eef4fa');
    P(c, x + 16, gy - 76, 7, 22, '#7e8ca0');                   // cerobong
    P(c, x + 16, gy - 76, 7, 3, '#9aa7b8');
    P(c, x - 6, gy - 44, 12, 6, '#ffd98a');                    // jendela hangat
    P(c, x - 6, gy - 44, 12, 1, '#c9a35a');
    pintu(c, z);
  }
  function bangunanKota(c, z) {
    const x = z.x, gy = GROUND;
    z.atapY = 142;
    P(c, x - 28, gy - 90, 56, 90, '#b5716b');
    P(c, x - 28, gy - 90, 6, 90, '#96555a');
    for (let r = 0; r < 8; r++) for (let k = 0; k < 5; k++)
      P(c, x - 24 + k * 11 + (r % 2) * 5, gy - 84 + r * 11, 9, 1, '#a05f5e');
    for (let i = -28; i < 28; i += 8) P(c, x + i, gy - 98, 5, 8, '#b5716b');  // dinding gerbang
    P(c, x - 28, gy - 92, 56, 3, '#c98d84');
    P(c, x - 8, gy - 70, 5, 9, '#2a2130');                     // jendela
    P(c, x + 4, gy - 70, 5, 9, '#2a2130');
    P(c, x - 8, gy - 70, 5, 2, '#ffd98a');
    P(c, x + 4, gy - 70, 5, 2, '#ffd98a');
    P(c, x - 9, gy - 44, 18, 5, '#ff9d9d');                    // bendera merah
    P(c, x - 9, gy - 44, 18, 2, '#ffc3c3');
    P(c, x - 9, gy - 39, 18, 2, '#bd5a5f');
    pintu(c, z);
  }
  function bangunanLembah(c, z) {
    const x = z.x, gy = GROUND;
    z.atapY = 178;
    lingkaran(c, x - 12, gy - 26, 30, '#8d83a8');
    lingkaran(c, x + 16, gy - 20, 26, '#7c729c');
    lingkaran(c, x + 2, gy - 44, 24, '#9c92b8');
    P(c, x - 30, gy - 30, 60, 30, '#8d83a8');
    P(c, x - 30, gy - 6, 60, 6, '#6b5f92');
    P(c, x - 8, gy - 78, 5, 40, '#8d83a8');                    // tangan batas stalagmit
    P(c, x + 14, gy - 64, 4, 26, '#7c729c');
    // kristal di depan batu
    P(c, x - 26, gy - 16, 4, 16, '#bb8fff'); P(c, x - 25, gy - 19, 2, 4, '#d9c4ff');
    P(c, x + 24, gy - 12, 4, 12, '#bb8fff'); P(c, x + 25, gy - 15, 2, 3, '#d9c4ff');
    P(c, x - 44, gy - 8, 4, 8, '#d98fb0');                     // jamur
    P(c, x - 45, gy - 10, 6, 3, '#f2b8cc');
    pintu(c, z);
  }
  function bangunanSalju(c, z) {
    const x = z.x, gy = GROUND;
    z.atapY = 146;
    P(c, x - 22, gy - 70, 44, 70, '#aebdcd');
    P(c, x - 22, gy - 70, 5, 70, '#8fa2b5');
    for (let r = 0; r < 6; r++) P(c, x - 19, gy - 62 + r * 11, 38, 1, '#9db0c2');
    for (let y = 0; y <= 22; y++) {                            // kubah observatorium
      const ww = Math.round(24 * Math.sqrt(Math.max(0, 1 - (y * y) / (22 * 22))));
      P(c, x - ww, gy - 92 + y, ww * 2 + 1, 1, '#cdd6de');
    }
    P(c, x + 2, gy - 92, 5, 24, '#4a7fc0');                    // celah teleskop
    P(c, x - 2, gy - 94, 10, 3, '#8fa2b5');
    P(c, x - 30, gy - 4, 60, 4, '#eef4fa');                    // salju di kaki
    P(c, x - 12, gy - 52, 8, 8, '#2a3346');                    // jendela
    P(c, x - 11, gy - 51, 6, 2, '#ffd98a');
    pintu(c, z);
  }

  const BANGUNAN = { kamp: bangunanKamp, hutan: bangunanHutan, gunung: bangunanGunung, kota: bangunanKota, lembah: bangunanLembah, salju: bangunanSalju };

  /* ---------- panggung statis: dibakar SEKALI, bukan tiap frame ---------- */
  function bakeBG() {
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const c = cv.getContext('2d');

    // langit pita (gaya pixel, tanpa gradasi halus)
    P(c, 0, 0, W, 52, '#6fc3ec');
    P(c, 0, 52, W, 44, '#8fd4f4');
    P(c, 0, 96, W, 40, '#b7e5f8');
    P(c, 0, 136, W, 36, '#d9f1fa');
    P(c, 0, 172, W, 18, '#f2ecd4');

    // matahari pixel + sinar
    lingkaran(c, 416, 30, 16, '#fff7dc');
    lingkaran(c, 416, 30, 12, '#ffeead');
    lingkaran(c, 416, 30, 9, '#ffd166');
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4 + 0.4;
      P(c, 416 + Math.round(Math.cos(a) * 20), 30 + Math.round(Math.sin(a) * 20), 2, 2, '#ffeead');
    }

    // pegunungan latar
    gunung(c, 64, 112, 92, 190, '#b3c9e4', '#e4eef8');
    gunung(c, 192, 96, 122, 190, '#c2d4ea', null);
    gunung(c, 336, 108, 104, 190, '#b3c9e4', '#e4eef8');
    gunung(c, 462, 120, 84, 190, '#c2d4ea', null);
    P(c, 0, 186, W, 4, '#d3e2f2');

    // hutan latar di belakang gedung
    const pohonX = [6, 22, 52, 70, 100, 148, 166, 214, 246, 292, 322, 372, 404, 448, 470];
    for (let i = 0; i < pohonX.length; i++) pohon(c, pohonX[i], 206, i % 3 === 0 ? 2 : 1);
    P(c, 0, 204, W, 3, '#43844a');

    // bangunan keenam wilayah
    for (const z of ZONES) BANGUNAN[z.biome](c, z);

    // papan nama + lencana nomor — SEMUA tujuan terbaca jelas di ketinggian sama
    ZONES.forEach((z, i) => papanNama(c, z, i));

    // lampu jalan
    for (const lx of [78, 234, 312, 392]) {
      P(c, lx, GROUND - 30, 2, 30, '#3a3f52');
      P(c, lx - 3, GROUND - 36, 8, 7, '#2a2f42');
      P(c, lx - 2, GROUND - 35, 6, 5, '#ffd98a');
      P(c, lx - 1, GROUND - 2, 4, 2, '#2a2f42');
    }

    // semak & batu pengisi
    for (const sx of [92, 106, 250, 264, 368, 466]) {
      lingkaran(c, sx, GROUND - 4, 6, '#4f9a55');
      lingkaran(c, sx + 5, GROUND - 3, 5, '#43844a');
    }
    for (const rx of [62, 158, 336, 414]) P(c, rx, GROUND - 3, 5, 3, '#8d93a4');

    // jalan setapak membentang dari ujung ke ujung — penghubung semua pintu
    P(c, 0, GROUND, W, PATH_BAWAH - GROUND, '#d9b98a');
    P(c, 0, GROUND, W, 2, '#e8cf9f');
    P(c, 0, PATH_BAWAH - 2, W, 2, '#b99a6c');
    for (let i = 0; i < 40; i++) {
      const sx = (i * 61 + 13) % W;
      P(c, sx, GROUND + 4 + (i * 7) % 8, 4, 2, '#c9a876');
    }

    // padang rumput depan
    P(c, 0, PATH_BAWAH, W, H - PATH_BAWAH, '#5fae4d');
    P(c, 0, PATH_BAWAH, W, 2, '#74c25e');
    for (let i = 0; i < 70; i++) {
      const sx = (i * 37 + 5) % W, sy = PATH_BAWAH + 3 + (i * 11) % (H - PATH_BAWAH - 4);
      P(c, sx, sy, 2, 1, '#4c9440');
    }

    return cv;
  }

  /* ---------- sprite cahaya gerbang (dibuat sekali, dipulas tiap frame) ---------- */
  function makeGlow(color, r) {
    const cv = document.createElement('canvas');
    cv.width = cv.height = r * 2;
    const c = cv.getContext('2d');
    const g = c.createRadialGradient(r, r, 2, r, r, r);
    g.addColorStop(0, color);
    g.addColorStop(0.55, color + '88');
    g.addColorStop(1, color + '00');
    c.fillStyle = g;
    c.fillRect(0, 0, r * 2, r * 2);
    return cv;
  }

  return { W, H, GROUND, PATH_BAWAH, ZONES, NPCS, bakeBG, makeGlow, P, lingkaran };
})();
