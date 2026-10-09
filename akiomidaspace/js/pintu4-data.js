window.P4 = (function () {
  'use strict';

  const KATEGORI = [
    { id: 'k1',  nama: 'Logika & Seni Pembuktian', label: ['LOGIKA', 'BUKTI'],
      sub: 'Kalimat, alasan, dan bukti rapi', jumlah: 10,
      color: '#ff9d9d', deep: '#bd5a5f',
      ucap: ['Buktikan', 'dengannya!'] },
    { id: 'k2',  nama: 'Kalkulus Multivariabel', label: ['MULTI', 'VARIABEL'],
      sub: 'Fungsi banyak peubah & integral lipat', jumlah: 10,
      color: '#ffb86b', deep: '#b0622a',
      ucap: ['Banyak peubah,', 'satu alasan!'] },
    { id: 'k3',  nama: 'Aljabar Linear Formal', label: ['ALJABAR', 'LINEAR'],
      sub: 'Ruang vektor & transformasi', jumlah: 10,
      color: '#ffe08a', deep: '#b8860b',
      ucap: ['Kotak besar', 'kerja rapi!'] },
    { id: 'k4',  nama: 'Analisis Real', label: ['ANALISIS', 'REAL'],
      sub: 'Bilangan real & epsilon-delta', jumlah: 10,
      color: '#d4f28a', deep: '#6a9c2a',
      ucap: ['Gali makna', 'bilangan!'] },
    { id: 'k5',  nama: 'Persamaan Diferensial', label: ['PERSAMAAN', 'TURUNAN'],
      sub: 'Persamaan yang berisi turunan', jumlah: 10,
      color: '#9df2a8', deep: '#2a9c50',
      ucap: ['Turunan dalam', 'persamaan!'] },
    { id: 'k6',  nama: 'Teori Peluang', label: ['PELUANG', 'RUANG'],
      sub: 'Daftar dulu, hitung kemudian', jumlah: 10,
      color: '#7ff2d8', deep: '#1f9c84',
      ucap: ['Daftar dulu,', 'hitung kemudian!'] },
    { id: 'k7',  nama: 'Statistika Inferensia', label: ['INFERENSIA', 'SAMPLING'],
      sub: 'Menyimpulkan populasi dari sampel', jumlah: 10,
      color: '#a5e8ff', deep: '#2a7fc0',
      ucap: ['Cuplik kecil,', 'simpul jujur!'] },
    { id: 'k8',  nama: 'Matematika Diskrit & Graf', label: ['DISKRIT', 'GRAF'],
      sub: 'Graf, pohon, dan jaringan', jumlah: 10,
      color: '#b8d8ff', deep: '#4a6fc0',
      ucap: ['Titik & sisi', 'bersahutan!'] },
    { id: 'k9',  nama: 'Aljabar Abstrak', label: ['ALJABAR', 'ABSTRAK'],
      sub: 'Grup, ring, dan field', jumlah: 10,
      color: '#c8b6ff', deep: '#6a4fc0',
      ucap: ['Aturan umum', 'untuk semua!'] },
    { id: 'k10', nama: 'Metode Numerik', label: ['METODE', 'NUMERIK'],
      sub: 'Jawaban hampiran yang terkendali', jumlah: 10,
      color: '#f2a8d8', deep: '#a83a78',
      ucap: ['Mendekat', 'terkendali!'] },
    { id: 'k11', nama: 'Zakat, Waris & Muamalah', label: ['ZAKAT', 'WARIS'],
      sub: 'Hitungan bagian & pembagian adil', jumlah: 10,
      color: '#f8e8a0', deep: '#b09a3a',
      ucap: ['Bagi dengan', 'adil!'] },
  ];

  const TOPIK = [

    { id: 'p4-001', k: 1, n: 1, judul: 'Kalimat yang Bisa Dinilai',
      teaser: 'Di kantor pos kota, surat dipilah dua: yang bisa distempel BENAR atau SALAH, dan yang hanya bertanya atau memerintah. Pernyataan adalah kalimat yang bisa dinilai benar atau salah!' },
    { id: 'p4-002', k: 1, n: 2, judul: 'Dan, Atau, Tidak',
      teaser: 'Lampu hias taman berbicara lewat tiga kata sambung: DAN minta dua-duanya, ATAU cukup salah satu, TIDAK selalu membalik. Tiga kata kecil yang mengubah watak gerbang!' },
    { id: 'p4-003', k: 1, n: 3, judul: 'Jika...Maka',
      teaser: 'Papan kafe berbunyi: jika hujan, payung boleh dipinjam. Janji bersyarat hanya dinilai saat syaratnya datang — sebelum itu, ia diam dengan sopan!' },
    { id: 'p4-004', k: 1, n: 4, judul: 'Kebalikan yang Plesetan',
      teaser: 'Jalan basah setelah disemprot petugas: papan jika-maka tetap benar, tapi kebalikannya tumbang. Kebalikan pernyataan tidak otomatis ikut benar!' },
    { id: 'p4-005', k: 1, n: 5, judul: 'Satu Tandingan Cukup',
      teaser: 'Papan galeri "semua angsa putih" tumbang oleh satu angsa hitam. Klaim semua digugurkan satu contoh; klaim ada cukup satu contoh untuk berdiri!' },
    { id: 'p4-006', k: 1, n: 6, judul: 'Domino Alasan',
      teaser: 'Satu dorongan kecil di pabrik: kartu jatuh berantai karena kartu sebelumnya. Bukti adalah rantai alasan yang tiap langkahnya tak bisa dipungkiri!' },
    { id: 'p4-007', k: 1, n: 7, judul: 'Domino Tak Berujung',
      teaser: 'Lorong kartu tanpa ujung: cukup dua janji kecil — kartu pertama jatuh, dan tetangga ikut — maka semua kartu jatuh sampai selamanya. Itu induksi!' },
    { id: 'p4-008', k: 1, n: 8, judul: 'Pura-pura Sebaliknya',
      teaser: 'Anggap menara punya lantai teratas, lalu naik satu lagi: janggal! Kontradiksi menggugurkan anggapan lewat kejanggalan yang lahir sendiri. Bilangan bulat juga tak punya yang terbesar!' },
    { id: 'p4-009', k: 1, n: 9, judul: 'Aturan Main yang Disepakati',
      teaser: 'Dua patok, satu tali: lewat dua titik ada tepat satu garis lurus. Aksioma adalah aturan main yang disepakati di awal — dari aturan kecil, gedung besar dibangun!' },
    { id: 'p4-010', k: 1, n: 10, judul: 'Tantangan Pengadilan Bukti',
      teaser: 'Lima misi pamungkas: pilah kalimat, pasang jika-maka, buru tandingan, jatuhkan domino, uji anggapan. Jadilah hakim kecil paling jujur di Kota Bukti!' },
    { id: 'p4-011', k: 2, n: 1, judul: 'Dua Angka untuk Satu Tempat',
      teaser: 'Tinggi gundukan pasir tak bisa ditunjuk satu angka saja: butuh dua, dari ayunan dan dari perosotan. Sepasang angka adalah alamat lengkap satu titik!' },
    { id: 'p4-012', k: 2, n: 2, judul: 'Garis Setinggi di Peta',
      teaser: 'Peta bukit dipenuhi garis-garis yang sering dikira coretan: semua tempat di satu garis sama tinggi. Garis rapat artinya curam, garis renggang artinya landai!' },
    { id: 'p4-013', k: 2, n: 3, judul: 'Dua Jalan, Dua Laju',
      teaser: 'Berdiri di satu titik bukit, jalan ke timur dan jalan ke utara punya kemiringan berbeda. Menyusuri satu arah sambil membekukan arah lain: begitu cara membaca lereng!' },
    { id: 'p4-014', k: 2, n: 4, judul: 'Arah Paling Curam',
      teaser: 'Bola yang dilepas di lereng selalu tahu jalannya, dan katak pun tahu. Gabungan kecuraman timur dan utara jadi satu panah rahasia: si pembisik arah tercuram!' },
    { id: 'p4-015', k: 2, n: 5, judul: 'Puncak, Lembah, dan Pelana',
      teaser: 'Di puncak, langkah ke mana pun turun; di dasar lembah, langkah ke mana pun naik. Tapi ada tanah pelana: naik ke dua sisi, turun ke dua sisi — puncak palsu!' },
    { id: 'p4-016', k: 2, n: 6, judul: 'Kolam dari Kotak-Kotak',
      teaser: 'Banyak air kolam bisa dilapor tanpa menimba satu timba pun: susun kotak-kotak kecil, kalikan luas dengan tinggi airnya, jumlahkan semua. Makin halus, makin tepat!' },
    { id: 'p4-017', k: 2, n: 7, judul: 'Roda Menggulung Roda',
      teaser: 'Sepeda berjalan karena laju berestafet: pedal menggulung gigi, gigi menggulung roda. Kalikan tiap mata rantai berurutan, jarak satu menit langsung ketemu!' },
    { id: 'p4-018', k: 2, n: 8, judul: 'Padang Angin Berpanah',
      teaser: 'Ribuan rempah memegang panah arah angin: ada tempat angin menyebar keluar seperti payung terbuka, ada tempat angin berputar seperti pusaran. Balon dan kincir tahu bedanya!' },
    { id: 'p4-019', k: 2, n: 9, judul: 'Terbaik di Balik Pagar',
      teaser: 'Pagar 24 langkah, kebun terluas: persegi juara. Pindahkan pagar ke tepi sungai yang bayar gratis satu sisi, juaranya berubah! Syarat batas menggeser jawaban terbaik.' },
    { id: 'p4-020', k: 2, n: 10, judul: 'Puncak Sama, Lelah Beda',
      teaser: 'Dua jalan naik ke puncak yang sama: gravitasi menghitung sama, sebab ia hanya peduli naik berapa. Tapi angin yang menyilang bikin lelahnya beda!'},
  ];

  function topikKategori(k) { return TOPIK.filter(t => t.k === k); }
  function katById(id) { return KATEGORI.find(k => k.id === id) || null; }
  function topikById(id) { return TOPIK.find(t => t.id === id) || null; }
  function topikLain(id, arah) {
    const t = topikById(id);
    if (!t) return null;
    const daftar = topikKategori(t.k);
    const i = daftar.findIndex(x => x.id === id);
    return daftar[i + arah] || null;
  }

  return { KATEGORI, TOPIK, topikKategori, katById, topikById, topikLain };
})();
