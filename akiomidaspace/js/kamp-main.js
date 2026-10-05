/* =========================================================
   KAMP ANGKA — Mesin Dunia Hidup (kamp-main.js)
   - Satu layar tetap: tanpa kamera, tanpa geser.
   - Belajar lewat DIALOG NPC: dekati penduduk, tekan TANYA.
   - Aktivitas "Bantu Bangun Tenda": jawab hitung, tiang berdiri.
   - Mata minus: A-/A+ (berbagi setelan dengan Dunia), teks besar.
   - Syariah: semua tokoh bulatan bermotif angka, tanpa wajah.
   ========================================================= */
(function () {
  'use strict';

  const K = window.KAMP;
  const { W, H, GROUND } = K;

  /* ---------- penduduk & bahasan (sumber: ruang Sejarah Matematika) ---------- */
  const NPCS = [
    { id: 'satu', nama: 'KAK SATU', x: 96, warna: '#63c8ff', gelap: '#1c6fb4', glif: '1', aksi: 'TANYA',
      ket: 'Dari mana angka bermula',
      halaman: [
        'Selamat datang di Kamp Angka! Aku Kak Satu, penjaga pintu kamp. Semua cerita matematika di dunia ini dimulai dari sini.',
        'Tahukah kamu? Dulu tidak ada angka. Gembala zaman batu membawa kantong batu: satu batu untuk satu domba. Domba keluar, satu batu dipindah. Domba pulang, batu dikembalikan.',
        'Kalau masih ada batu tersisa, berarti ada domba yang belum pulang. Owalah... ternyata begitu toh! Menghitung itu awalnya cuma menjodohkan: satu batu, satu domba.',
        'Jadi angka lahir dari kebutuhan menjaga supaya tidak ada yang hilang. Sampai hari ini itu tetap tugas matematika. Yuk berkenalan dengan teman-teman kamp!',
      ] },
    { id: 'dua', nama: 'KAK DUA', x: 178, warna: '#4fe3c8', gelap: '#0d8a74', glif: '2', aksi: 'TANYA',
      ket: 'Kisah 60 detik & mengukur bumi',
      halaman: [
        'Mari menghangat di dekat api! Aku Kak Dua, juru masak kamp. Sambil menunggu air mendidih, dengarkan ceritaku.',
        'Di kota Babilonia kuno, orang menghitung dengan kelipatan ENAM PULUH. Karena itu sampai sekarang: satu jam sama dengan 60 menit, satu menit sama dengan 60 detik. Jejaknya masih ada di jam dindingmu!',
        'Di Mesir, Sungai Nil suka meluap lalu menghapus batas sawah. Tiap tahun orang mengukur ulang tanahnya. Geo berarti bumi, metron berarti ukuran. Jadi... geometri itu "mengukur bumi"!',
        'Owalah, ternyata banjir tahunan itulah yang melahirkan ilmu mengukur. Hitungan yang rapi membuat pembagian tanah adil, tidak ada pihak yang ditipu.',
      ] },
    { id: 'bangun', nama: 'BU BANGUN', x: 292, warna: '#ffd166', gelap: '#c07d0c', glif: '3', aksi: 'BANTU BANGUN', mode: 'bangun',
      ket: 'Bantu tenda kamp berdiri',
      intro: [
        'Halo, tukang bangun melapor! Aku Bu Bangun. Lihat tenda di sebelahku? Kerangkanya sudah berdiri, tapi tiangnya masih kurang.',
        'Mau bantu? Jawab pertanyaan hitungku. Setiap jawaban benar, satu tiang berdiri. Hitung saja pelan-pelan — kamp ini dibangun dengan santai.',
      ],
      selesai: [
        'TENDA BERDIRI! Kamp kita makin layak huni berkat hitunganmu. Terima kasih, Pembangun Kamp!',
        'Ingat ya: menambah itu gampang kalau dihitung maju pelan-pelan. Dua... tiga... empat. Kamu resmi jadi Pembangun Kamp Angka!',
      ] },
    { id: 'nol', nama: 'KAK NOL', x: 448, warna: '#bb8fff', gelap: '#6a3fc0', glif: '0', aksi: 'TANYA',
      ket: 'Kisah nol & kata algoritma',
      halaman: [
        'Ssst... aku Kak Nol, penjaga gudang. Spesialitasku angka paling muda tapi paling ajaib: NOL. Dulu orang tidak punya tanda untuk "tidak ada".',
        'Tahun 628, Brahmagupta dari India menuliskan aturan nol: bilangan apa pun ditambah nol hasilnya tetap bilangan itu sendiri. Kekosongan akhirnya dianggap sah sebagai angka!',
        'Dan tahukah kamu? Kata ALGORITMA berasal dari nama orang: Al-Khawarizmi, ilmuwan Baitul Hikmah di Baghdad. Setiap komputer mengikuti langkah rapi yang diambil dari namanya.',
        'Tahun 1202, Fibonacci membawa angka 0 sampai 9 ke pasar Eropa. Hitungan yang jelas membuat jual beli lebih jujur. Matematika yang baik menopang muamalah yang adil.',
      ] },
  ];

  /* soal aktivitas bangun tenda (hitung anak: maju & berkelompok) */
  const SOAL = [
    { t: 'Tenda butuh 5 tiang. Sudah berdiri 2. Berapa tiang lagi yang harus dipasang?',
      opsi: ['2', '3', '4'], benar: 1,
      betul: 'Benar! Dari 2 menuju 5: tiga langkah lagi. Satu tiang berdiri!',
      salah: 'Hitung maju pelan-pelan dari 2: tiga... empat... lima. Berapa langkah itu?' },
    { t: 'Kayu unggun disusun 3 tumpukan, tiap tumpukan berisi 2 kayu. Semuanya berapa kayu?',
      opsi: ['5', '6', '8'], benar: 1,
      betul: 'Benar! 2... 4... 6. Menjumlah berulang seperti ini adalah bibit dari perkalian!',
      salah: 'Coba hitung tumpuk demi tumpuk: 2, tambah 2 jadi 4, tambah 2 lagi jadi...?' },
    { t: 'Jalan setapak kamp butuh 8 batu. Sudah terpasang 6. Masih kurang berapa batu?',
      opsi: ['1', '2', '3'], benar: 1,
      betul: 'Benar! 6... 7... 8, kurang 2 batu. Jalan kamp siap ditempuh!',
      salah: 'Mulai dari 6 lalu hitung maju sampai 8: tujuh, delapan. Berapa batu yang dilewati?' },
  ];

  /* ---------- elemen halaman ---------- */
  const layar = document.getElementById('layar');
  const ctx = layar.getContext('2d');
  const chipSlogan = document.getElementById('chipSlogan');
  const hintEl = document.getElementById('hint');
  const introEl = document.getElementById('intro');
  const btnMasuk = document.getElementById('btnMasuk');
  const btnDunia = document.getElementById('btnDunia');
  const aksiBtn = document.getElementById('aksiBtn');
  const dialogEl = document.getElementById('dialog');
  const dlgNama = document.getElementById('dlgNama');
  const dlgTeks = document.getElementById('dlgTeks');
  const dlgTitik = document.getElementById('dlgTitik');
  const dlgUmpan = document.getElementById('dlgUmpan');
  const dlgJawab = document.getElementById('dlgJawab');
  const btnLanjut = document.getElementById('btnLanjut');
  const btnTutup = document.getElementById('btnTutup');

  const adalahSentuh = window.matchMedia('(pointer: coarse)').matches
    || 'ontouchstart' in window
    || (navigator.maxTouchPoints || 0) > 0
    || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (adalahSentuh) document.body.classList.add('coarse', 'kontrol-aktif');

  /* ---------- ukuran panggung: dunia utuh selalu muat ---------- */
  function pasUkuran() {
    const vw = window.innerWidth, vh = window.innerHeight;
    const lanskap = vw > vh;
    const cadangan = adalahSentuh ? (lanskap ? 96 : 150) : 26;
    const k = Math.max(0.55, Math.min((vw - 18) / W, (vh - cadangan - 18) / H));
    layar.style.width = Math.floor(W * k) + 'px';
    layar.style.height = Math.floor(H * k) + 'px';
  }
  window.addEventListener('resize', pasUkuran);
  pasUkuran();

  /* ---------- ukuran tulisan A- / A+ (berbagi setelan dengan Dunia) ---------- */
  const LANGKAH_SKALA = [1, 1.15, 1.3, 1.5];
  let idxSkala = 0;
  try {
    const s = parseInt(localStorage.getItem('akio-skala') || '0', 10);
    if (s >= 0 && s < LANGKAH_SKALA.length) idxSkala = s;
  } catch (e) { /* abaikan */ }
  function terapSkala() {
    document.documentElement.style.setProperty('--skala', LANGKAH_SKALA[idxSkala]);
    try { localStorage.setItem('akio-skala', String(idxSkala)); } catch (e) { /* abaikan */ }
    const min = document.getElementById('btnMin');
    const plus = document.getElementById('btnPlus');
    if (min) min.disabled = idxSkala === 0;
    if (plus) plus.disabled = idxSkala === LANGKAH_SKALA.length - 1;
  }
  document.getElementById('btnMin').addEventListener('click', () => {
    if (idxSkala > 0) { idxSkala--; terapSkala(); }
  });
  document.getElementById('btnPlus').addEventListener('click', () => {
    if (idxSkala < LANGKAH_SKALA.length - 1) { idxSkala++; terapSkala(); }
  });
  terapSkala();

  /* ---------- kemajuan bangun tersimpan ---------- */
  let tiang = 0;
  try { tiang = Math.max(0, Math.min(3, parseInt(localStorage.getItem('kamp-tiang') || '0', 10) || 0)); } catch (e) { /* abaikan */ }
  const selesai = tiang >= 3;
  if (selesai && chipSlogan) chipSlogan.textContent = 'Tenda sudah berdiri berkatmu';

  /* ---------- latar & tokoh ---------- */
  let bg = K.bakeBG();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => { bg = K.bakeBG(); }).catch(() => {});
  }

  const player = { x: 26, y: GROUND, vx: 0, dir: 1, state: 'diam', walkT: 0, target: null, squash: 0, tujuNpc: null };
  const npcs = NPCS.map((n, i) => ({ ...n, i, bob: i * 1.3 }));

  /* ---------- partikel & kehidupan ---------- */
  const awan = [{ x: 40, y: 22, v: 4.2, s: 1 }, { x: 250, y: 40, v: 3.1, s: 1.3 }];
  const simbolLangit = [
    { x: 90, y: 56, g: '+', v: 4.6, f: 0 },
    { x: 270, y: 78, g: '\u00d7', v: 3.3, f: 2.1 },
    { x: 380, y: 48, g: '\u00f7', v: 4.1, f: 4.2 },
  ];
  let asap = [], kilau = [], confetti = [];
  const rand = (a, b) => a + Math.random() * (b - a);

  /* ---------- input ---------- */
  const keys = { kiri: false, kanan: false };
  addEventListener('keydown', e => {
    if (document.body.classList.contains('dlg-buka')) return;
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') { keys.kiri = true; e.preventDefault(); }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { keys.kanan = true; e.preventDefault(); }
    if ((e.key === 'Enter' || e.key === ' ') && npcDekat && !player.tujuNpc) { bukaDialog(npcDekat); e.preventDefault(); }
  });
  addEventListener('keyup', e => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.kiri = false;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.kanan = false;
  });

  function ikatTombol(id, sisi) {
    const el = document.getElementById(id);
    if (!el) return;
    const tekan = e => { e.preventDefault(); keys[sisi] = true; el.classList.add('tahan'); };
    const lepas = e => { e.preventDefault(); keys[sisi] = false; el.classList.remove('tahan'); };
    el.addEventListener('pointerdown', tekan);
    el.addEventListener('pointerup', lepas);
    el.addEventListener('pointercancel', lepas);
    el.addEventListener('pointerleave', lepas);
    el.addEventListener('contextmenu', e => e.preventDefault());
  }
  ikatTombol('btnKiri', 'kiri');
  ikatTombol('btnKanan', 'kanan');

  /* ketuk layar: ke penduduk (berkenalan otomatis) atau ke titik jalan */
  layar.addEventListener('pointerdown', e => {
    if (document.body.classList.contains('dlg-buka')) return;
    e.preventDefault();
    const r = layar.getBoundingClientRect();
    const wx = (e.clientX - r.left) / r.width * W;
    const wy = (e.clientY - r.top) / r.height * H;
    for (const n of npcs) {
      if (Math.abs(wx - n.x) < 22 && wy > 170) { tujuNpc(n); return; }
    }
    if (wy > GROUND - 60) {
      player.target = Math.max(14, Math.min(466, wx));
      player.tujuNpc = null;
      hilangkanHint();
    }
  });

  /* tombol aksi besar (TANYA / BANTU BANGUN) — dekat penduduk */
  let npcDekat = null;
  aksiBtn.addEventListener('pointerdown', e => {
    e.preventDefault();
    if (npcDekat) bukaDialog(npcDekat);
  });

  function tujuNpc(n) {
    if (document.body.classList.contains('dlg-buka')) return;
    const sisi = player.x < n.x ? -22 : 22;
    player.target = Math.max(14, Math.min(466, n.x + sisi));
    player.tujuNpc = n;
    hilangkanHint();
  }

  /* ---------- panel TUGAS DI KAMP: pilih penduduk → Akio berjalan ke dia ---------- */
  const tugasEl = document.getElementById('tugas');
  function sudahBaca(id) {
    try { return localStorage.getItem('kamp-baca-' + id) === '1'; } catch (e) { return false; }
  }
  function tandaiBaca(id) {
    try { localStorage.setItem('kamp-baca-' + id, '1'); } catch (e) { /* abaikan */ }
  }
  function segarTugas() {
    if (!tugasEl) return;
    let html = '<div class="tg-kepala">'
      + '<span class="tg-judul">TUGAS DI KAMP</span>'
      + '<span class="tg-sub">Ketuk penduduk — Akio akan berjalan ke dia</span>'
      + '</div>';
    for (const n of npcs) {
      let status;
      if (n.mode === 'bangun') {
        status = selesaiBangun()
          ? '<span class="tg-status siap">JADI!</span>'
          : '<span class="tg-status">TIANG ' + tiang + '/3</span>';
      } else {
        status = sudahBaca(n.id)
          ? '<span class="tg-status siap">SUDAH</span>'
          : '<span class="tg-status">TANYA</span>';
      }
      html += '<button class="tg-baris" data-id="' + n.id + '" type="button"'
        + ' aria-label="Berjalan ke ' + n.nama + '">'
        + '<span class="tg-no" style="--zc:' + n.warna + '">' + n.glif + '</span>'
        + '<span class="tg-teks"><b>' + n.nama + '</b><i>' + n.ket + '</i></span>'
        + status
        + '</button>';
    }
    tugasEl.innerHTML = html;
  }
  if (tugasEl) tugasEl.addEventListener('click', e => {
    const baris = e.target.closest('.tg-baris');
    if (!baris) return;
    const n = npcs.find(nn => nn.id === baris.dataset.id);
    if (n) tujuNpc(n);
  });
  segarTugas();

  /* ---------- dialog ---------- */
  let dlg = null;                                   // { npc, hal, mode, soal, terjawab }
  function bukaDialog(n) {
    if (dlg) return;
    player.target = null; player.vx = 0;
    dlg = { npc: n, hal: 0, mode: n.mode === 'bangun' && !selesaiBangun() ? 'intro' : 'cerita', soal: 0 };
    document.body.classList.add('dlg-buka');
    aksiBtn.classList.remove('tampil');
    dialogEl.classList.add('aktif');
    tampilHalaman();
  }
  function tutupDialog() {
    if (dlg) {
      const n = dlg.npc;
      if ((dlg.mode === 'cerita' && dlg.hal >= n.halaman.length - 1)
        || dlg.mode === 'selesai' || dlg.mode === 'tamat') tandaiBaca(n.id);
    }
    dlg = null;
    document.body.classList.remove('dlg-buka');
    dialogEl.classList.remove('aktif');
    dlgJawab.style.display = 'none';
    dlgUmpan.style.display = 'none';
    btnLanjut.style.display = '';
    btnLanjut.textContent = 'LANJUT';
    segarTugas();
  }
  function selesaiBangun() { return tiang >= 3; }

  function tampilHalaman() {
    const n = dlg.npc;
    dlgNama.textContent = n.nama;
    dlgNama.style.color = n.warna;
    dlgUmpan.style.display = 'none';
    btnLanjut.style.display = '';
    btnLanjut.textContent = 'LANJUT';

    if (dlg.mode === 'cerita') {
      dlgTeks.textContent = n.halaman[dlg.hal];
      dlgTitik.textContent = (dlg.hal + 1) + '/' + n.halaman.length;
      btnLanjut.textContent = dlg.hal >= n.halaman.length - 1 ? 'SELESAI' : 'LANJUT';
    } else if (dlg.mode === 'intro') {
      dlgTeks.textContent = n.intro[dlg.hal];
      dlgTitik.textContent = (dlg.hal + 1) + '/' + n.intro.length;
      btnLanjut.textContent = dlg.hal >= n.intro.length - 1 ? 'MULAI BANGUN' : 'LANJUT';
    } else if (dlg.mode === 'selesai') {
      dlgTeks.textContent = n.selesai[dlg.hal];
      dlgTitik.textContent = (dlg.hal + 1) + '/' + n.selesai.length;
      btnLanjut.textContent = dlg.hal >= n.selesai.length - 1 ? 'SELESAI' : 'LANJUT';
    } else if (dlg.mode === 'soal') {
      const s = SOAL[dlg.soal];
      dlgTeks.textContent = s.t;
      dlgTitik.textContent = 'SOAL ' + (dlg.soal + 1) + '/' + SOAL.length;
      btnLanjut.style.display = 'none';
      dlgJawab.style.display = 'flex';
      bangunOpsi(s);
    } else if (dlg.mode === 'tamat') {
      dlgTeks.textContent = 'Tenda selesai berdiri dan jalan batu siap! Kamp Angka makin hidup berkat hitunganmu.';
      dlgTitik.textContent = 'SELESAI';
      btnLanjut.textContent = 'SELESAI';
    }
  }

  function bangunOpsi(s) {
    dlgJawab.innerHTML = '';
    s.opsi.forEach((o, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'dlg-opsi';
      b.textContent = o;
      b.addEventListener('click', () => jawabSoal(i));
      dlgJawab.appendChild(b);
    });
  }

  function jawabSoal(i) {
    if (!dlg || dlg.mode !== 'soal') return;
    const s = SOAL[dlg.soal];
    const benar = i === s.benar;
    dlgUmpan.style.display = 'block';
    dlgUmpan.textContent = benar ? s.betul : s.salah;
    dlgUmpan.className = benar ? 'dlg-umpan ok' : 'dlg-umpan no';
    if (benar) {
      dlgJawab.style.display = 'none';
      btnLanjut.style.display = '';
      btnLanjut.textContent = dlg.soal >= SOAL.length - 1 ? 'PASANG TERAKHIR' : 'LANJUT';
      tiang++;
      try { localStorage.setItem('kamp-tiang', String(tiang)); } catch (e) { /* abaikan */ }
      ledakKilau(268, 236);
      segarTugas();
    } else {
      Array.prototype.forEach.call(dlgJawab.children, b => { b.disabled = true; });
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'dlg-opsi ulang';
      b.textContent = 'COBA LAGI';
      b.addEventListener('click', () => tampilHalaman());
      dlgJawab.appendChild(b);
    }
  }

  btnLanjut.addEventListener('click', () => {
    if (!dlg) return;
    const n = dlg.npc;
    if (dlg.mode === 'cerita') {
      if (dlg.hal >= n.halaman.length - 1) tutupDialog();
      else { dlg.hal++; tampilHalaman(); }
    } else if (dlg.mode === 'intro') {
      if (dlg.hal >= n.intro.length - 1) { dlg.mode = 'soal'; dlg.soal = 0; tampilHalaman(); }
      else { dlg.hal++; tampilHalaman(); }
    } else if (dlg.mode === 'soal') {
      if (dlg.soal >= SOAL.length - 1) {
        ledakKilau(268, 226); ledakKilau(252, 232); ledakKilau(284, 232);
        if (chipSlogan) chipSlogan.textContent = 'Tenda sudah berdiri berkatmu';
        dlg.mode = 'tamat';
        tampilHalaman();
      } else { dlg.soal++; tampilHalaman(); }
    } else if (dlg.mode === 'selesai') {
      if (dlg.hal >= n.selesai.length - 1) tutupDialog();
      else { dlg.hal++; tampilHalaman(); }
    } else if (dlg.mode === 'tamat') {
      tutupDialog();
    }
  });
  btnTutup.addEventListener('click', tutupDialog);

  /* ---------- hint & chip ---------- */
  const hintDasar = adalahSentuh
    ? 'Ketuk tanah untuk berjalan \u00b7 dekati penduduk lalu tekan tombolnya'
    : 'Tekan \u2190 \u2192 untuk berjalan \u00b7 dekati penduduk lalu tekan Enter';
  hintEl.textContent = hintDasar;
  let hintHilang = false;
  function hilangkanHint() { if (!hintHilang) { hintHilang = true; hintEl.classList.add('pudar'); } }
  setTimeout(hilangkanHint, 14000);

  /* ---------- partikel ---------- */
  function ledakKilau(x, y) {
    for (let i = 0; i < 14; i++) {
      confetti.push({ x, y, vx: rand(-34, 34), vy: rand(-70, -26), hidup: rand(0.5, 1), umur: 0,
        col: ['#ffd166', '#7dffa8', '#63c8ff', '#fff3cf'][Math.floor(rand(0, 4))] });
    }
  }

  function updatePartikel(dt, t) {
    if (Math.random() < dt * 2.4) asap.push({ x: 144 + rand(-1, 1), y: 232, vy: rand(-11, -7), vx: rand(-3, 1), hidup: rand(2, 3.2), umur: 0, s: rand(2, 3) });
    for (const s of asap) { s.umur += dt; s.x += s.vx * dt; s.y += s.vy * dt; s.vy *= 1 - dt * 0.2; }
    asap = asap.filter(s => s.umur < s.hidup);
    for (const k of kilau) k.umur += dt;
    kilau = kilau.filter(k => k.umur < k.hidup);
    for (const cf of confetti) { cf.umur += dt; cf.x += cf.vx * dt; cf.y += cf.vy * dt; cf.vy += 90 * dt; }
    confetti = confetti.filter(cf => cf.umur < cf.hidup);
    for (const a of awan) { a.x += a.v * dt; if (a.x > 500) a.x = -60; }
    for (const s of simbolLangit) { s.x += s.v * dt; s.f += dt; if (s.x > 495) { s.x = -15; s.y = rand(40, 90); } }
  }

  /* ---------- pembaruan ---------- */
  const KECEPATAN = 108;
  function update(dt, t) {
    const dlgBuka = document.body.classList.contains('dlg-buka');
    player.squash = Math.max(0, player.squash - dt * 4);

    if (!dlgBuka) {
      const arah = (keys.kiri ? -1 : 0) + (keys.kanan ? 1 : 0);
      if (arah !== 0) {
        player.target = null; player.tujuNpc = null;
        player.vx += (arah * KECEPATAN - player.vx) * Math.min(1, dt * 10);
        player.dir = arah; player.state = 'jalan';
      } else if (player.target != null) {
        const dx = player.target - player.x;
        player.vx = Math.max(-KECEPATAN, Math.min(KECEPATAN, dx * 6));
        if (Math.abs(dx) > 2) { player.dir = dx > 0 ? 1 : -1; player.state = 'jalan'; }
        else { player.x = player.target; player.vx = 0; player.target = null; player.state = 'diam'; player.squash = 0.6; }
      } else {
        player.vx *= 1 - Math.min(1, dt * 9);
        if (Math.abs(player.vx) < 4) { player.vx = 0; player.state = 'diam'; }
      }
      if (Math.abs(player.vx) > 6 && !hintHilang) hilangkanHint();
      player.x += player.vx * dt;
      player.x = Math.max(14, Math.min(466, player.x));
      player.walkT += Math.abs(player.vx) * dt;

      // tiba di penduduk yang dituju → otomatis berkenalan
      if (player.tujuNpc && Math.abs(player.x - player.tujuNpc.x) < 26) {
        const n = player.tujuNpc;
        player.tujuNpc = null; player.vx = 0; player.state = 'diam';
        bukaDialog(n);
      }
    }

    // penduduk terdekat → tombol aksi
    npcDekat = null;
    if (!dlgBuka) {
      let terbaik = 1e9;
      for (const n of npcs) {
        const d = Math.abs(player.x - n.x);
        if (d < 34 && d < terbaik) { terbaik = d; npcDekat = n; }
      }
    }
    if (npcDekat) {
      const habis = npcDekat.mode === 'bangun' && selesaiBangun();
      aksiBtn.textContent = habis ? 'TANYA' : npcDekat.aksi;
      aksiBtn.classList.add('tampil');
    } else {
      aksiBtn.classList.remove('tampil');
    }

    for (const n of npcs) n.bob += dt * 2;
  }

  /* ---------- gambar ---------- */
  function gambarAwan(a) {
    const s = a.s;
    K.gambar.P(ctx, a.x, a.y + 4 * s, 26 * s, 6 * s, '#fffdf2');
    K.gambar.P(ctx, a.x + 5 * s, a.y + 1 * s, 11 * s, 5 * s, '#fffdf2');
    K.gambar.P(ctx, a.x + 15 * s, a.y + 2 * s, 8 * s, 4 * s, '#e8f4fa');
  }

  function draw(t) {
    ctx.drawImage(bg, 0, 0);
    K.gambar.bendera(ctx, t);
    K.gambar.tendaBangun(ctx, tiang, selesaiBangun(), t);
    K.gambar.apiUnggun(ctx, t);

    for (const a of awan) gambarAwan(a);
    for (const s of simbolLangit) {
      ctx.globalAlpha = 0.3 + 0.18 * Math.sin(t * 2 + s.f * 3);
      K.gambar.teksPx(ctx, s.g, s.x, s.y + Math.sin(t + s.f) * 2, '#fffdf2', 9);
      ctx.globalAlpha = 1;
    }

    // penduduk bola-lentera
    for (const n of npcs) {
      K.gambar.bayangan(ctx, n.x, GROUND - 1, 10);
      K.gambar.bolaLentera(ctx, n.x, GROUND - 10, n.warna, n.gelap, n.glif, n.bob);
    }

    // konfetti & asap
    for (const s of asap) {
      const u = s.umur / s.hidup;
      ctx.globalAlpha = 0.5 * (1 - u);
      const ss = Math.max(1, Math.round(s.s * (1 - u * 0.5)));
      K.gambar.P(ctx, s.x, s.y, ss, ss, '#dfe6f0');
      ctx.globalAlpha = 1;
    }
    for (const cf of confetti) {
      ctx.globalAlpha = 1 - cf.umur / cf.hidup;
      K.gambar.P(ctx, cf.x, cf.y, 2, 2, cf.col);
      ctx.globalAlpha = 1;
    }

    // Akio paling depan — bulatan emas, tak pernah keluar layar
    K.gambar.bayangan(ctx, player.x, player.y + 1, 12);
    const fr = player.state === 'jalan' ? Math.floor(player.walkT / 13) % 4 : 0;
    K.gambar.akio(ctx, player.x, player.y, 1, player.squash, player.state === 'jalan' ? fr : 0);
  }

  /* ---------- loop ---------- */
  let last = 0;
  function loop(ts) {
    const dt = Math.min(0.05, (ts - last) / 1000 || 0.016);
    last = ts;
    update(dt, ts / 1000);
    updatePartikel(dt, ts / 1000);
    draw(ts / 1000);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  /* ---------- intro & kembali ---------- */
  if (selesai) {
    const cat = document.getElementById('introSelesai');
    if (cat) cat.style.display = '';
  }
  btnMasuk.addEventListener('click', () => {
    introEl.classList.add('pergi');
    setTimeout(() => { if (introEl.parentNode) introEl.parentNode.removeChild(introEl); }, 700);
  });
  btnDunia.addEventListener('click', () => { window.location.href = 'index.html'; });

  /* ---------- API debug (QA) ---------- */
  window.KAMPDBG = {
    get: () => ({
      px: Math.round(player.x), vx: Math.round(player.vx), state: player.state,
      target: player.target, near: npcDekat ? npcDekat.id : null,
      dlg: dlg ? dlg.mode + ':' + dlg.hal : null, tiang,
      skala: LANGKAH_SKALA[idxSkala],
    }),
    ke: x => { player.target = Math.max(14, Math.min(466, x)); player.tujuNpc = null; },
    tanya: id => { const n = npcs.find(nn => nn.id === id); if (n) tujuNpc(n); },
    jawab: i => jawabSoal(i),
    lanjut: () => btnLanjut.click(),
  };
})();
