window.AKJELLY = (function () {
  'use strict';
  const P = window.AK.P, lingkaran = window.AK.lingkaran;

  function kanvas(w, h) {
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    return cv;
  }

  const GLIF = {
    '1':    ['..#..', '.##..', '..#..', '..#..', '..#..', '..#..', '.###.'],
    'pi':   ['#####', '#...#', '#####', '#...#', '#...#', '#...#', '#...#'],
    'delta':['..#..', '.#.#.', '.#.#.', '#...#', '#...#', '#...#', '#####'],
    'eq':   ['.....', '#####', '.....', '#####', '.....', '.....', '.....'],
    'inf':  ['.#...#.', '#.###.#', '.#...#.'],
    'tanya':['.###.', '#...#', '....#', '...#.', '..#..', '.....', '..#..'],
  };

  function akioFrame(variasi) {
    const cv = kanvas(18, 18), c = cv.getContext('2d');
    const naik = variasi === 1 ? 1 : 0;
    const cy = 9 - naik;

    lingkaran(c, 9, cy + 1, 8, '#a86f1c');
    lingkaran(c, 9, cy, 7, '#f6c453');
    P(c, 5, 4 - naik, 3, 2, '#ffe9ad');
    P(c, 4, 6 - naik, 2, 2, '#ffe9ad');
    P(c, 7, 3 - naik, 2, 1, '#fff7dc');
    P(c, 6, 13 - naik, 6, 1, '#d98f2b');
    P(c, 7, 14 - naik, 4, 1, '#c9822a');
    return cv;
  }

  function buatAkio() {
    return {
      idle: akioFrame(0),
      jalan: [akioFrame(0), akioFrame(1), akioFrame(2), akioFrame(1)],
    };
  }

  function npcOrb(n, fase) {
    const cv = kanvas(16, 16), c = cv.getContext('2d');
    const naik = fase ? 1 : 0;

    lingkaran(c, 8, 8 - naik, 7, n.gelap);
    lingkaran(c, 8, 8 - naik, 6, n.warna);
    P(c, 3, 3 - naik, 2, 1, '#fffdf2');
    P(c, 2, 5 - naik, 1, 1, '#fffdf2');
    P(c, 5, 12 - naik, 6, 1, n.gelap);

    const g = GLIF[n.glif];
    const gw = g[0].length, gh = g.length;
    const gx = 8 - (gw >> 1), gy = 8 - (gh >> 1) - naik;
    for (let r = 0; r < gh; r++)
      for (let k = 0; k < gw; k++)
        if (g[r][k] === '#') P(c, gx + k, gy + r, 1, 1, '#fffdf2');
    return cv;
  }

  function buatNpc(n) { return [npcOrb(n, 0), npcOrb(n, 1)]; }

  const MINI = {
    plus: ['..#..', '..#..', '#####', '..#..', '..#..'],
    kali: ['#...#', '.#.#.', '..#..', '.#.#.', '#...#'],
    bagi: ['..#..', '.....', '#####', '.....', '..#..'],
  };
  function gambarMini(c, nama, x, y, col) {
    const g = MINI[nama];
    if (!g) return;
    const old = c.fillStyle;
    c.fillStyle = col;
    for (let r = 0; r < g.length; r++)
      for (let k = 0; k < g[r].length; k++)
        if (g[r][k] === '#') c.fillRect((x + k) | 0, (y + r) | 0, 1, 1);
    c.fillStyle = old;
  }

  return { buatAkio, buatNpc, gambarMini, MINI };
})();
