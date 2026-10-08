/* =========================================================
   PETA CERITA — naskah living-art tiap judul (cerita-data.js)
   - pelajaran.html?id=... membuka dunia cerita bergaya sama:
     satu layar tetap, jejak stasiun bercahaya, Akio berjalan.
   - Tiap judul punya rasa sendiri: tema latar (tema), penduduk
     pemandu (npc: glif + sapaan), dan stasiun berobjek unik —
     supaya tiap petualangan terasa beda, bukan mesin cetak.
   - PETA[id].stasiun = urutan tahap; tahap terakhir (akhir:true)
     adalah penutup cerita berisi payoff "Owalah, mudah bukan?".
   - Judul yang belum punya naskah otomatis mendapat dunia
     fallback (teaser + catatan segera hadir).
   - Syariah: cerita netral, muamalah adil, penduduk dunia =
     bola-lentera tanpa wajah; tiada makhluk berwajah.
   ========================================================= */
window.CERITA = (function () {
  'use strict';

  const PETA = {
    /* ============ PINTU 2 — HUTAN SIMBOL ============ */

    /* ----- p2-001 · Angka di Bawah Nol — gerbang tambang dengan lift keranjang ----- */
    'p2-001': {
      tema: 'tambang',
      npc: { glif: '-1', ucap: ['Makin turun,', 'makin kecil!'] },
      stasiun: [
        {
          objek: 'gerbangTambang', judul: 'Pintu ke Bawah Tanah',
          teks: 'Di bibir hutan berdiri gerbang tambang kayu dengan papan tulisan besar, dan di sampingnya bergantung keranjang lift pada tali kokoh. Gedung biasa punya lantai di atas tanah bernomor 1, 2, 3. Tetapi tambang punya lantai di bawah tanah, dan lantai itu ditulis dengan tanda minus: −1, −2, −3. Tanda minus bukan tanda sedih — ia tanda alamat yang berarti "di bawah nol".',
        },
        {
          objek: 'tiangKedalaman', judul: 'Tanda di Tiap Lantai',
          teks: 'Di lorong tambang berdiri tiang kedalaman dengan tiga papan kecil tersusun dari atas ke bawah: −1, −2, lalu −3. Papan di atas tanah tetap bernomor 0. Turun satu lantai, angkanya berkurang satu: dari 0 ke −1, dari −1 ke −2. Seperti menuruni tangga sambil menghitung langkah mundur.',
        },
        {
          objek: 'taliKeranjang', judul: 'Keranjang Turun Tiga Lantai',
          teks: 'Sekarang keranjang lift menuruni tambang. Mulai dari lantai 0, tali digulir perlahan: berhenti pertama di −1, berhenti kedua di −2, berhenti ketiga di −3. Hitung bersama: tiga kali turun, dan angka berubah 0, −1, −2, −3. Keranjang berhenti tepat di papan −3, lantai paling dalam hari ini.',
        },
        {
          objek: 'tanggaMinus', judul: 'Makin Turun, Makin Kecil',
          teks: 'Di dinding tambang terpampang tangga angka menurun: −1 di paling atas, lalu −2, lalu −3 di paling bawah, dengan panah menunjuk ke bawah bertuliskan "makin kecil". Jadi −2 lebih kecil dari −1, dan −3 lebih kecil lagi dari −2. Makin dalam kita turun di bawah nol, makin kecil pula angkanya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Di Bawah Pun Ada Angka!',
          teks: 'Jadi angka tidak berhenti di nol: ia berlanjut ke bawah dengan tanda minus sebagai tanda alamat. Lantai −1, −2, −3 kini terasa seperti lantai biasa — cuma letaknya di bawah tanah. Owalah, ternyata begini toh — minus itu hanya penunjuk arah ke bawah. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-002 · Garis Bilangan Dua Arah — jembatan kayu dengan tiang nol ----- */
    'p2-002': {
      tema: 'jembatan',
      npc: { glif: '0', ucap: ['Nol di tengah,', 'dua arah!'] },
      stasiun: [
        {
          objek: 'jembatanAngka', judul: 'Jembatan Angka',
          teks: 'Di tengah hutan membentang jembatan kayu yang unik: setiap papan tangganya bertuliskan angka. Dari kiri ke kanan terbaca −3, −2, −1, 0, lalu 1, 2, 3. Jembatan inilah garis bilangan: angka berbaris rapi dengan jarak yang sama, dan nol berdiri tepat di tengah-tengah.',
        },
        {
          objek: 'tiangNolTengah', judul: 'Tiang Nol di Tengah',
          teks: 'Di tengah jembatan berdiri tiang dengan lampu bertanda 0. Dua papan arah kecil menempel di tiang: satu menunjuk ke kanan, satu menunjuk ke kiri. Ke kanan angka makin besar: 1, 2, 3. Ke kiri angka makin kecil: −1, −2, −3. Tiang nol adalah alamat permulaan untuk kedua arah.',
        },
        {
          objek: 'panahDuaArah', judul: 'Dua Panah Tanpa Ujung',
          teks: 'Di kedua ujung jembatan berdiri papan panah: panah kanan dan panah kiri, keduanya menghilang ke dalam kabut hutan. Artinya garis bilangan tidak berhenti di 3 dan tidak berhenti di −3: ia terus berlanjut tanpa ujung ke dua arah. Selamanya ada angka baru, di kanan maupun di kiri.',
        },
        {
          objek: 'langkahBilangan', judul: 'Jarak dari Nol',
          teks: 'Perhatikan jejak kaki di papan jembatan: dari 0 melangkah dua kali ke kanan sampai 2, dan dari 0 melangkah dua kali ke kiri sampai −2. Jauhnya sama persis, kananya saja yang berbeda. Angka 2 dan −2 memang saudara kembar: sama-sama dua langkah dari nol, arahnya saja bertolak belakang.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Garis yang Membuka Dua Dunia!',
          teks: 'Garis bilangan kini terbentang dalam kepalamu: nol di tengah, kanan bertambah besar, kiri bertambah kecil, tanpa ujung di kedua sisi. Setiap soal bilangan negatif akan berjalan di atas jembatan ini. Owalah, ternyata begini toh — cukup satu jalan lurus, dua arah, dan semuanya jelas. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-003 · Suhu di Bawah Nol — gudang es dengan dua termometer ----- */
    'p2-003': {
      tema: 'kutub',
      npc: { glif: '°', ucap: ['Makin dingin,', 'makin turun!'] },
      stasiun: [
        {
          objek: 'termometerGanda', judul: 'Dua Termometer Bersanding',
          teks: 'Di gudang es berdiri dua termometer raksasa bersisian. Punya cairan naik sampai tanda 5 derajat di atas nol. Temannya justru turun sampai −5 derajat, di bawah garis nol. Keduanya memakai skala yang sama; bedanya hanya arah: satu mengukur panas di atas nol, satu mengukur dingin di bawah nol.',
        },
        {
          objek: 'papanBeku', judul: 'Garis Ajaib Nol Derajat',
          teks: 'Di papan gudang tertulis aturan penting: 0 derajat adalah tempat air membeku. Lihat garis beku di papan itu: di atas garis air tetap cair, di bawah garis air berubah menjadi es. Nol derajat adalah batas alam antara cair dan beku — itulah sebabnya garis nol di termometer begitu istimewa.',
        },
        {
          objek: 'esTumpuk', judul: 'Satu Blok Satu Derajat',
          teks: 'Di pojok gudang, lima blok es disusun menumpuk di bawah garis nol papan pengukur. Setiap blok menurunkan suhu satu derajat: satu blok −1, dua blok −2, sampai lima blok −5. Makin tinggi tumpukan es, makin dalam angkanya turun di bawah nol, dan makin dingin ruangan itu.',
        },
        {
          objek: 'duaKamarEs', judul: 'Kamar Mana Lebih Dingin?',
          teks: 'Dua pintu kamar es berdiri berdampingan. Kamar A bertanda −3 derajat dengan tumpukan tiga blok es. Kamar B bertanda −8 derajat dengan tumpukan delapan blok es. Mana yang lebih dingin? Kamar B! Delapan blok turun lebih dalam dari tiga blok, jadi −8 lebih dingin daripada −3.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Dingin Pun Dihitung!',
          teks: 'Suhu kini punya bahasa: nol derajat tempat air membeku, di atasnya panas bertambah, di bawahnya dingin bertambah. −5 derajat kini terbaca jelas: lima derajat lebih dingin dari es. Owalah, ternyata begini toh — termometer cuma garis bilangan berdiri tegak. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-004 · Utang & Saldo — kios pasar dengan buku catatan jujur ----- */
    'p2-004': {
      tema: 'kios',
      npc: { glif: 'Rp', ucap: ['Catatan jujur,', 'muamalah adil!'] },
      stasiun: [
        {
          objek: 'bukuCatatan', judul: 'Buku Catatan Kios',
          teks: 'Di kios pasar terbuka buku catatan besar milik penjaga kios. Seorang pembeli menjajan tiga kue dengan janji membayar nanti, maka halaman buku ditulis: utang 3, ditandai angka −3. Angka minus di buku itu berarti "masih kurang tiga" — catatan yang jujur, tak ada yang disembunyikan.',
        },
        {
          objek: 'koinNampanLima', judul: 'Membayar Lima Koin',
          teks: 'Esok harinya pembeli datang kembali dengan nampan berisi lima koin. Tiga koin dipakai melunasi utang tadi, dan dua koin tersisa di nampan. Lima koin datang, tiga koin masuk kotak kios, dua koin kembali dipegang pembeli. Hitungannya jelas: 5 dikurangi 3 sama dengan 2.',
        },
        {
          objek: 'papanSaldoUtang', judul: 'Saldo Berganti Wajah',
          teks: 'Papan saldo di kios menceritakan perjalanan itu: mulai dari −3, dibayar 5, berakhir +2. Saldo minus berarti masih utang, saldo nol berarti lunas bersih, dan saldo plus berarti ada sisa. Tanda minus dan plus seperti dua sisi buku: satu sisi kekurangan, satu sisi kelebihan.',
        },
        {
          objek: 'stempelLunas', judul: 'Stempel LUNAS',
          teks: 'Halaman bertulis −3 kini menerima cap besar bertuliskan LUNAS — utangnya sudah diganti penuh. Halaman baru dibuka, dan di situ tercatat saldo +2 milik pembeli. Dari utang −3 menjadi tabungan +2: buku catatan kios membuktikan bahwa angka negatif dan positif saling menyapa dengan adil.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Minus Itu Catatan Jujur!',
          teks: 'Angka negatif ternyata penjaga kejujuran: −3 berarti kurang tiga, dan selama dilunasi dengan adil, saldo kembali bersih bahkan berakhir +2. Catatan yang terang membuat jual beli tenang untuk kedua pihak. Owalah, ternyata begini toh — minus cuma cara jujur menulis kekurangan. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-005 · Membandingkan Negatif — jurang berkabut dengan tiang kedalaman ----- */
    'p2-005': {
      tema: 'jurang',
      npc: { glif: '-8', ucap: ['Makin dalam,', 'makin kecil!'] },
      stasiun: [
        {
          objek: 'tiangJurangDua', judul: 'Dua Tiang di Jurang',
          teks: 'Di sisi jurang berkabut tertancap dua tiang kedalaman. Tiang pertama menancap sampai tanda −3, tiang kedua turun jauh lebih dalam sampai −8. Dua-duanya di bawah bibir jurang yang bertanda nol, tetapi tiang −8 menembus kegelapan yang jauh lebih dalam.',
        },
        {
          objek: 'papanLebihKecil', judul: 'Angka Mana Lebih Kecil?',
          teks: 'Papan di bibir jurang menulis perbandingan: −8 < −3. Hati-hati, ini jebakan klasik! Angka 8 memang terlihat lebih besar daripada 3, tetapi tanda minus membalik segalanya: −8 justru lebih kecil daripada −3, karena −8 lebih jauh turun dari nol. Makin jauh ke kiri di garis bilangan, makin kecil nilainya.',
        },
        {
          objek: 'lenteraJurang', judul: 'Lentera Mengukur Kedalaman',
          teks: 'Untuk membuktikannya, dua lentera digantung dari bibir jurang dengan tali. Lentera pertama berhenti di tanda −3: talinya pendek, cahayanya masih terang. Lentera kedua turun sampai −8: talinya panjang sekali, dan cahayanya mulai tenggelam dalam gelap. Tali yang lebih panjang artinya lebih jauh dari nol — dan jauh dari nol ke bawah berarti lebih kecil.',
        },
        {
          objek: 'papanUrutanNegatif', judul: 'Barisan yang Tertib',
          teks: 'Papan terakhir menyusun angka dari yang terbesar ke yang terkecil: 3, 1, 0, −1, −3, lalu −8 di ujung bawah. Barisan ini seperti tangga menurun: setiap anak tangga turun, nilai angkanya mengecil. Begitu barisan tertib, membandingkan dua angka negatif tinggal membaca siapa yang berdiri lebih rendah.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Jebakan Negatif Terbongkar!',
          teks: 'Rahasia membandingkan negatif kini terbuka: jangan lihat panjang angkanya, lihat kedalamannya dari nol. −8 turun lebih dalam dari −3, maka −8 lebih kecil. Owalah, ternyata begini toh — cukup bayangkan jurang, dan semua perbandingan jelas. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-006 · Jalan Maju & Mundur — dermaga dengan garis air nol ----- */
    'p2-006': {
      tema: 'pelabuhan',
      npc: { glif: '-2', ucap: ['Naik turun', 'dermaga!'] },
      stasiun: [
        {
          objek: 'tanggaDermaga', judul: 'Tangga Dermaga dan Garis Air',
          teks: 'Di pelabuhan kecil, tangga kayu menuruni dermaga ke air. Garis permukaan air bertanda 0. Anak tangga di atas air bernomor 1, 2, 3, 4; anak tangga di bawah air bernomor −1, −2, −3, −4. Dermaga ini adalah garis bilangan yang menegak: air adalah nolnya, dan inilah panggung latihan maju-mundur kita.',
        },
        {
          objek: 'perahuNelayan', judul: 'Perahu di Anak Tangga Tiga',
          teks: 'Sebuah perahu nelayan kecil terikat rapi di anak tangga bertanda 3. Mulut perahu menyentuh tangga tepat pada angka 3 — itu posisi permulaan cerita hari ini. Ingat baik-baik angkanya: mulai dari 3.',
        },
        {
          objek: 'taliTurunPerahu', judul: 'Air Surut Lima Tangga',
          teks: 'Malam itu air surut, dan perahu ikut turun mengikuti air: lima anak tangga ke bawah. Hitung turunnya: dari 3 melewati 2, lalu 1, lalu 0, lalu −1, dan mendarat di −2. Lima langkah turun dari mulai 3, kaki perahu berhenti tepat di anak tangga −2, dua tangga di bawah garis air.',
        },
        {
          objek: 'papanCatatanKapten', judul: 'Catatan Kapten',
          teks: 'Kapten perahu mencatat kejadian di papan catatannya: mulai 3, turun 5, mendarat −2. Turun itulah arti tambah dengan negatif, maka catatannya ditulis 3 + (−5) = −2. Menambah bilangan negatif sama artinya dengan melangkah mundur sebanyak angkanya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Maju Mundur Kini Jelas!',
          teks: 'Tambah dengan bilangan negatif ternyata cuma jalan mundur: mulai 3, mundur 5, tiba di −2. Angka minus di dalam kurung adalah pesan arah, bukan hambatan. Owalah, ternyata begini toh — dermaga mengajarkan hitungan lebih jelas daripada papan tulis. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-007 · Kurang yang Membalik — terowongan dengan dua pintu minus ----- */
    'p2-007': {
      tema: 'terowongan',
      npc: { glif: '+5', ucap: ['Minus ketemu', 'minus!'] },
      stasiun: [
        {
          objek: 'pintuMinusGanda', judul: 'Dua Pintu Bertanda Minus',
          teks: 'Di dalam terowongan hutan berjejer dua pintu kecil, dan keduanya memakai tanda yang sama: minus. Pintu pertama bertanda −, pintu kedua di belakangnya juga bertanda −. Penjelajah yang melihat dua tanda minus berjajar biasanya berpikir jalannya makin mundur. Tetapi terowongan ini menyimpan kejutan.',
        },
        {
          objek: 'kunciBalikArah', judul: 'Kunci Pembalik Arah',
          teks: 'Di gantungan terowongan tergantung kunci emas pembalik arah. Ketika pintu minus dibuka dengan kunci ini, arah mundur di dalamnya justru terbalik menjadi maju. Mengurangkan bilangan negatif artinya membalik arahnya: mundur yang dibalik menjadi maju. Konon buku tua "Sembilan Babal" dari China kuno sudah mencatat aturan pembalikan seperti ini berabad-abad yang lalu.',
        },
        {
          objek: 'jejakLorong', judul: 'Jejak Maju di Lorong',
          teks: 'Sekarang mari melangkah. Mulai dari penanda lantai 3, rencananya mundur 2 — tetapi pintu minus membaliknya menjadi maju 2. Jejak kaki menerangi lorong: dari 3 maju ke 4, lalu ke 5. Kaki berhenti di penanda 5, dua langkah lebih jauh dari posisi awal.',
        },
        {
          objek: 'papanBukaRahasia', judul: 'Rahasia Terbukti',
          teks: 'Di dinding ujung terowongan terpampang papan rahasianya: 3 − (−2) = 3 + 2 = 5. Dua tanda minus yang bertemu saling meneutralkan menjadi maju. Mengurangkan negatif sama artinya dengan menambah — jebakan terowongan kini tinggal trik ramah yang sudah kamu kuasai.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Dua Minus Jadi Maju!',
          teks: 'Kurang dengan bilangan negatif ternyata pintu balik: 3 − (−2) berubah menjadi 3 + 2, dan jawabannya 5. Dua tanda minus bertemu, arahnya justru maju. Owalah, ternyata begini toh — terowongan menakutkan pun cuma soal membalik arah. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-008 · Dua Balikan Jadi Positif — papan arah, tangga pola, dua cermin ----- */
    'p2-008': {
      tema: 'balik',
      npc: { glif: '6', ucap: ['Dua balikan', 'kembali!'] },
      stasiun: [
        {
          objek: 'papanPanahKiri', judul: 'Papan Petunjuk Menoleh',
          teks: 'Di persimpangan hutan berdiri papan petunjuk dengan panah menunjuk ke kiri. Panah kiri inilah arti tanda minus pada perkalian: melawan arah. Bila bilangan positif berjalan ke kanan, bilangan ber-tanda-minus berjalan ke kiri. Sederhana: minus adalah pesan untuk berbalik.',
        },
        {
          objek: 'tanggaPolaMinus', judul: 'Tangga yang Naik Mundur',
          teks: 'Di papan samping tersusun tangga pola untuk (−2) dikali sesuatu: kali 3 hasilnya −6, kali 2 hasilnya −4, kali 1 hasilnya −2, kali 0 hasilnya 0. Lalu kejutannya: kali −1 hasilnya 2, kali −2 hasilnya 4, kali −3 hasilnya 6! Setiap anak tangga selalu naik dua — karena pengali yang minus membalik arah tangga menjadi naik.',
        },
        {
          objek: 'cerminDuaArah', judul: 'Dua Cermin Pas',
          teks: 'Kedua cermin di pondok hutan menghadap satu sama lain. Sebuah panah di depan cermin pertama tampak terbalik arahnya; lihat pantulannya di cermin kedua — panah kembali menunjuk arah semula! Dibalik sekali arah berubah, dibalik dua kali arah kembali seperti awal. Itulah rahasia (−2) × (−3) = 6: dua kali balik, hasilnya positif.',
        },
        {
          objek: 'papanAturanKali', judul: 'Papan Aturan Tanda',
          teks: 'Papan terakhir merangkum semua: plus kali plus sama dengan plus, plus kali minus sama dengan minus, minus kali plus sama dengan minus, dan minus kali minus sama dengan plus. Dengan papan ini, (−2) × (−3) terbaca pasti: dua tanda sama bertemu, hasilnya plus 6.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Dua Balikan Pulang ke Rumah!',
          teks: 'Membalik arah dua kali ternyata pulang ke arah semula: (−2) × (−3) = 6, positif sejati. Kejutan paling manis bilangan negatif kini menjadi milikmu. Owalah, ternyata begini toh — cukup ingat cermin dua kali, dan semua aturan tanda jelas. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-009 · Aturan Tanda Pembagian — meja sortir kurir dua arah ----- */
    'p2-009': {
      tema: 'kurir',
      npc: { glif: '÷', ucap: ['Tanda sama,', 'satu hasil!'] },
      stasiun: [
        {
          objek: 'mejaSortirPaket', judul: 'Meja Sortir Paket',
          teks: 'Di pos kurir hutan, paket-paket bertanda plus dan minus menunggu di meja sortir. Bakul kanan untuk paket bertanda plus, bakul kiri untuk paket bertanda minus. Kurir hutan membagi tugas dengan tertib: setiap paket harus masuk bakul yang sesuai tandanya.',
        },
        {
          objek: 'papanSamaBeda', judul: 'Aturan Kurir',
          teks: 'Di dinding pos tergantung papan aturan kurir: tanda yang sama bertemu, hasilnya plus; tanda yang berbeda bertemu, hasilnya minus. Aturan ini setia untuk kali dan juga bagi. Dua hal yang serumpun selalu berbagi aturan — seperti kurir dan saudaranya si pembagi.',
        },
        {
          objek: 'tigaKardusContoh', judul: 'Tiga Kardus Contoh',
          teks: 'Tiga kardus contoh bersandar di meja, masing-masing dengan tulisannya. Kardus pertama: (−6) ÷ 2 = −3, tandanya beda jadi minus. Kardus kedua: 6 ÷ (−2) = −3, lagi-lagi beda tanda jadi minus. Kardus ketiga: (−6) ÷ (−2) = 3, tanda sama bertemu, hasilnya plus. Tiga contoh, satu aturan.',
        },
        {
          objek: 'sepedaKurirDua', judul: 'Sepeda Dua Arah',
          teks: 'Sepeda kurir parkir di depan pos dengan panah dua arah: alamat kanan untuk hasil plus, alamat kiri untuk hasil minus. Membagi (−6) dengan (−2)? Tanda sama, maka sepeda melaju ke kanan menuju 3. Membagi 6 dengan (−2)? Tanda beda, sepeda berbelok ke kiri menuju −3.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Aturan Tanda Terkurung!',
          teks: 'Pembagian bilangan negatif kini tertunduk rapi: tanda sama melahirkan plus, tanda beda melahirkan minus — sama persis dengan sahabatnya si perkalian. Owalah, ternyata begini toh — cukup satu aturan untuk dua jurus. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-010 · Tantangan Lantai Bawah — menara lift tambang lima misi ----- */
    'p2-010': {
      tema: 'lift',
      npc: { glif: '!', ucap: ['Semua jurus,', 'satu misi!'] },
      stasiun: [
        {
          objek: 'menaraLiftTambang', judul: 'Menara Lift Tambang',
          teks: 'Di akhir penjuru hutan berdiri menara lift tambang dengan papan lantai lengkap: 4, 3, 2, 1, 0, −1, −2, −3, −4 dari atas ke bawah. Keranjang lift siap bergerak naik-turun. Semua jurus bilangan negatif yang sudah kamu kuasai kini dipanggil untuk satu misi besar.',
        },
        {
          objek: 'papanLimaMisi', judul: 'Papan Lima Misi',
          teks: 'Papan misi menampilkan lima soal. Misi satu: (−4) + 7 = ? Misi dua: (−10) ÷ (−5) = ? Misi tiga: 6 − (−4) = ? Misi empat: (−3) × (−2) = ? Misi lima: mana yang lebih dingin, −9 atau −2? Lima pintu teka-teki, satu kunci yang sudah kamu pegang semuanya.',
        },
        {
          objek: 'rodaTaliLift', judul: 'Roda Pengangkut Bekerja',
          teks: 'Roda tali mulai berputar saat jawaban diisi satu per satu: (−4) + 7 = 3, lalu (−10) ÷ (−5) = 2, lalu 6 − (−4) = 10, lalu (−3) × (−2) = 6, dan yang paling dingin adalah −9. Setiap jawaban benar memutar roda sekali lagi — dan lift turun semakin dalam menuju gerbang terakhir.',
        },
        {
          objek: 'gerbangLenteraDalam', judul: 'Gerbang Paling Dalam',
          teks: 'Lift berhenti di lantai −4, dan di sanalah gerbang batu paling dalam terbuka dengan lentera menyala di atasnya. Lima misi, lima jawaban benar, satu gerbang terbuka. Penjuru Bilangan Negatif resmi kamu taklukkan dari puncak 4 sampai dasar −4.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Juara Lantai Bawah Tanah!',
          teks: 'Menjumlah, mengurang, mengali, membagi, dan membandingkan bilangan negatif — semuanya kini dalam genggamanmu. Tenar judul pertama Hutan Simbol terlampaui, dan sembilan penjuru lagi menunggu di gerbang pusat. Owalah, ternyata begini toh — berani turun ke bawah nol, semua lantai jadi ramah. Mudah, bukan?',
        },
      ],
    },
    /* ----- p2-011 · Faktor: Pasangan Pengali — pelataran ubin hutan ----- */
    'p2-011': {
      tema: 'pelataran',
      npc: { glif: '3x4', ucap: ['Pasangan pengali,', 'hasil tetap sama!'] },
      stasiun: [
        {
          objek: 'rakUbinDuaBelas', judul: 'Dua Belas Ubin di Pelataran',
          teks: 'Di tengah hutan simbol terbentang pelataran batu yang asyik: di tengahnya berdiri rak kayu berisi dua belas ubin persegi berwarna hijau lumut. Tukang pelataran memberi tantangan sederhana: tata seluruh ubin menjadi persegi panjang yang rapi, tanpa ubin bersisa dan tanpa kekurangan. Ada berapa cara menatanya? Nah, pasangan bilangan yang hasil kalinya dua belas itulah yang disebut faktor — pembagi yang membuat pembagian habis, sisanya nol.',
        },
        {
          objek: 'barisSatuDuaBelas', judul: 'Tata Paling Panjang',
          teks: 'Cara pertama: susun semua ubin menjadi satu barisan panjang membentang dari ujung ke ujung. Satu baris berisi dua belas ubin, dan hitungannya pas: 1 x 12 = 12. Maka 1 dan 12 berpasangan — keduanya faktor dari 12. Tata paling panjang ini juga paling mudah dikenali: semua ubin berdiri sebaris tanpa celah tersisip.',
        },
        {
          objek: 'petakDuaEnam', judul: 'Dua Baris Enam Ubin',
          teks: 'Cara kedua membelah barisan panjang itu menjadi dua baris sejajar. Setiap baris berisi enam ubin, dan dua kali enam hasilnya tetap dua belas: 2 x 6 = 12. Pasangan baru pun tercatat: 2 dan 6 juga faktor dari 12. Perhatikan, ubin tetap sama dua belas buah; hanya susunannya yang berganti bentuk.',
        },
        {
          objek: 'petakTigaEmpat', judul: 'Tiga Baris Empat Ubin',
          teks: 'Cara ketiga menata menjadi tiga baris pendek. Setiap baris berisi empat ubin, dan tiga kali empat tetap dua belas: 3 x 4 = 12. Kini pasangan ketiga tersimpan rapi: 3 dan 4. Jadi faktor dari 12 adalah 1, 2, 3, 4, 6, dan 12 — enam bilangan yang semuanya habis membagi 12 tanpa sisa.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Pasangan Pengali Lengkap!',
          teks: 'Faktor ternyata cuma pasangan pengali: 1 dan 12, 2 dan 6, 3 dan 4 — semuanya hasil kalinya tetap 12. Begitu menyusun ubin, daftar faktor terlihat tanpa perlu menghafal. Owalah, ternyata begini toh — faktor itu cuma cara-cara menata bilangan yang sama. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-012 · Faktorisasi Prima — kuari batu hutan ----- */
    'p2-012': {
      tema: 'kuari',
      npc: { glif: '2', ucap: ['Pecah sampai', 'bata prima!'] },
      stasiun: [
        {
          objek: 'batuKuari', judul: 'Batu Besar Bernama 12',
          teks: 'Di penjuru kuari hutan, batu besar bermata dua belas tergeletak di antara tumpukan kerikil. Tukang batu hutan mengucek tangannya: batu sebesar ini terlalu berat untuk diangkat satu-satu. Maka ia memakai resep lama: pecah batu berulang kali sampai tinggal bata-bata kecil yang tak bisa dipecah lagi. Bata terakhir itu bernama bilangan prima.',
        },
        {
          objek: 'paluPecahDua', judul: 'Palu Pertama Turun',
          teks: 'Palu pertama turun menghantam di tengah batu 12, dan batu itu retak jadi dua bagian: bagian 2 dan bagian 6. Catat terus: 12 = 2 x 6. Tapi tukang batu mengetuk bagian 6 sekali lagi, karena 6 masih bisa dipecah menjadi 2 dan 3. Palu hanya berhenti ketika tak ada bagian yang bisa dipecah lagi.',
        },
        {
          objek: 'bataPrimaTiga', judul: 'Bata yang Tak Bisa Dipecah',
          teks: 'Sekarang di lantai kuari tersusun tiga bata kecil: bata 2, bata 2, dan bata 3. Coba dipecah? Bata 2 hanya bisa dibagi 1 dan 2 dirinya, bata 3 hanya bisa dibagi 1 dan 3 dirinya. Tak ada celah lagi — itulah tanda bilangan prima. Bata-bata inilah potongan paling dasar dari batu 12.',
        },
        {
          objek: 'papanSusunPrima', judul: 'Resep Bata Batu 12',
          teks: 'Papan di gerbang kuari menulis resep pekerjaan hari itu: 12 = 2 x 2 x 3. Tiga bata prima dikalikan kembali, hasilnya persis batu semula. Faktorisasi prima artinya memecah bilangan sampai seluruh potongannya berupa bilangan prima — resep paling dasar yang tak bisa dipecah lebih jauh lagi.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Batu Besar Jadi Bata Prima!',
          teks: 'Batu 12 kini tinggal kenangan: ia lahir kembali sebagai 2 x 2 x 3, tiga bata prima yang kokoh. Setiap bilangan lebih dari satu punya resep bata prima sendiri, dan resep itu tidak berubah. Owalah, ternyata begini toh — faktorisasi prima cuma memecah batu sampai bata terkecilnya. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-013 · FPB — stan bungkusan hadiah ----- */
    'p2-013': {
      tema: 'bungkusan',
      npc: { glif: '6', ucap: ['Dibagi rata,', 'tanpa sisa!'] },
      stasiun: [
        {
          objek: 'mejaBungkusDua', judul: 'Dua Tumpukan Hadiah',
          teks: 'Di stan bungkusan hutan, dua tumpukan hadiah menunggu: dua belas pensil warna dan delapan belas permen lembut. Pemilik stan ingin membungkusnya menjadi beberapa bungkusan yang isinya sama persis — semua bungkusan berisi pensil sama banyak dan permen sama banyak, tanpa sisa. Berapa banyak bungkusan yang bisa dibuat? Detektif pembagi dipanggil.',
        },
        {
          objek: 'papanPembagiKembar', judul: 'Pembagi yang Berkenalan',
          teks: 'Papan bantuan menuliskan pembagi masing-masing tumpukan. Pembagi 12: 1, 2, 3, 4, 6, 12. Pembagi 18: 1, 2, 3, 6, 9, 18. Lalu digarisbawahi yang muncul di kedua daftar: 1, 2, 3, dan 6. Empat bilangan ini adalah pembagi bersama — yang membuat dua tumpukan bisa dibagi rata dengan jumlah bungkusan yang sama.',
        },
        {
          objek: 'bungkusanEnam', judul: 'Enam Bungkusan Terisi Penuh',
          teks: 'Maka dibuatlah enam bungkusan kertas warna. Setiap bungkusan menerima dua pensil dari tumpukan pertama, karena 12 : 6 = 2, dan tiga permen dari tumpukan kedua, karena 18 : 6 = 3. Enam bungkusan terisi penuh, tak ada pensil atau permen yang menganggur. Semua penerima bungkusan berhak isinya sama persis.',
        },
        {
          objek: 'papanFPBEnam', judul: 'Terbesar di Antara yang Sama',
          teks: 'Sebenarnya bisa juga memakai tiga bungkusan atau dua bungkusan, tetapi bungkusannya justru sedikit. Pembagi bersama terbesar dari 12 dan 18 adalah 6 — inilah FPB, faktor persekutuan terbesar. Dengan FPB, pembagian jadi paling banyak bungkusannya sekaligus tetap rata. Itulah cara pembagi terbesar bekerja.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Bagi Rata Tanpa Sisa!',
          teks: 'FPB 12 dan 18 ternyata cuma jawaban dari satu pertanyaan: berapa bungkusan terbanyak agar semua terisi sama rata? Jawabannya 6, dan tiap bungkusan berisi 2 pensil plus 3 permen. Owalah, ternyata begini toh — FPB itu seni membagi rata yang paling jujur. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-014 · KPK — pesta lampion malam hutan ----- */
    'p2-014': {
      tema: 'pestaLampu',
      npc: { glif: '12', ucap: ['Nyalanya', 'bertemu!'] },
      stasiun: [
        {
          objek: 'duaLampionPesta', judul: 'Dua Lampion Bergaya',
          teks: 'Malam pesta lampion di hutan simbol. Lampion biru menyala berulang setiap empat detik, sedangkan lampion kuning menyala setiap enam detik. Penonton berbisik: kapan kedua lampion menyala bersama pada hitungan yang sama? Mari kita buktikan dengan garis detik, bukan dengan tebakan.',
        },
        {
          objek: 'jalurDetikPesta', judul: 'Garis Detik Menyala',
          teks: 'Di tanah pesta terbentang jalur detik bertanda 0 sampai 12. Lampion biru menyalakan cahaya di detik 4, lalu 8, lalu 12 — melompat empat demi empat. Lampion kuning menyala di detik 6, lalu 12 — melompat enam demi enam. Kedua jejak cahaya itu berjalan sendiri-sendiri, sampai pada suatu titik mereka berpapasan.',
        },
        {
          objek: 'titikBertemuDuaBelas', judul: 'Nyala Bersama Pertama',
          teks: 'Di detik 12, lampion biru dan kuning menyala pada saat yang sama — kerlap-kerlipnya bercampur jadi satu cahaya emas. Itulah kelipatan bersama pertama dari 4 dan 6. Bukan detik 8, karena di detik itu hanya biru yang menyala; dan bukan detik 6, karena hanya kuning yang bersinar. Pertemuan pertama mereka memang di 12.',
        },
        {
          objek: 'papanKeluargaKelipatan', judul: 'Keluarga Kelipatan',
          teks: 'Papan pesta merangkum keluarga kelipatannya. Kelipatan 4: 4, 8, 12, 16, 20, 24. Kelipatan 6: 6, 12, 18, 24. Yang muncul di kedua keluarga: 12, 24, dan terus berlanjut. Yang terkecil di antaranya bernama KPK — kelipatan persekutuan terkecil. Maka KPK 4 dan 6 adalah 12, waktu nyala bersama pertama.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Nyala Bersama Ditemukan!',
          teks: 'KPK ternyata cuma mencari perjumpaan pertama dua lompatan: empat demi empat dan enam demi enam, bersua di detik 12. Dua lampu itu akan menyala bersama lagi di 24, 36, dan seterusnya — tetapi 12 selalu yang pertama. Owalah, ternyata begini toh — KPK itu titik perjumpaan kelipatan. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-015 · Jurus Tabel Prima — paviliun buku tua ----- */
    'p2-015': {
      tema: 'bukuTua',
      npc: { glif: '1', ucap: ['Turunkan,', 'bagi lagi!'] },
      stasiun: [
        {
          objek: 'papanTanggaBagi', judul: 'Tangga Pembagian',
          teks: 'Di paviliun buku tua hutan tergantung papan bergambar tangga dengan angka 24 di puncaknya. Tukang hitung hutan menyebutnya tabel prima: cara menurunkan bilangan anak tangga demi anak tangga sambil membagi. Aturannya cuma satu: bagi selalu dengan prima terkecil yang bisa, turunkan hasilnya, lalu bagi lagi.',
        },
        {
          objek: 'anakTurunDua', judul: 'Turunkan, Lalu Bagi Dua',
          teks: 'Anak tangga pertama: 24 dibagi 2 sama dengan 12, dan angka 12 diturunkan ke bawah di samping tanda pemisah. Anak tangga kedua: 12 dibagi 2 lagi, hasilnya 6, turun lagi. Tukang hitung tidak menebak-nebak; ia membagi dengan 2 berulang kali karena 2 adalah prima terkecil yang masih habis membagi.',
        },
        {
          objek: 'tanggaSampaiSatu', judul: 'Berhenti di Satu',
          teks: 'Tangga berlanjut: 6 dibagi 2 sama dengan 3, lalu 3 tak bisa dibagi 2 lagi. Maka tukang hitung memindahkan jurusnya: 3 dibagi 3 sama dengan 1. Di angka 1 tangga berhenti — tak ada bilangan yang lagi-lagi bisa membaginya. Semua pembagi yang dipakai tergantung rapi di sisi tangga: 2, 2, 2, dan 3.',
        },
        {
          objek: 'papanBacaSisiKiri', judul: 'Baca Sisi Kiri Tangga',
          teks: 'Papan terakhir mengajari cara membacanya: kalikan seluruh pembagi di sisi kiri tangga. Hasilnya 2 x 2 x 2 x 3 = 24, persis bilangan awal. Tabel prima ini rapi karena tak ada faktor yang terlupa — semua bata prima muncul sesuai urutan, dari yang terkecil sampai tangga habis di 1.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tangga Rapi Tanpa Lupa!',
          teks: 'Faktorisasi 24 ternyata sekadar menuruni tangga: bagi dengan 2 berulang-ulang, lalu 3, berhenti di 1. Sisi kiri tangga langsung memberi 2 x 2 x 2 x 3 tanpa satu bata pun hilang. Owalah, ternyata begini toh — tabel prima cuma tangga turun yang tertib. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-016 · FPB dari Faktorisasi — pondok kartu prima ----- */
    'p2-016': {
      tema: 'pondokKartu',
      npc: { glif: '3', ucap: ['Ambil yang', 'sama saja!'] },
      stasiun: [
        {
          objek: 'duaPetiKartuPrima', judul: 'Dua Peti Kartu Prima',
          teks: 'Di pondok kartu hutan tersimpan dua peti berisi kartu prima. Peti pertama adalah hasil faktorisasi 12: kartu 2, kartu 2, dan kartu 3. Peti kedua adalah faktorisasi 18: kartu 2, kartu 3, dan kartu 3. Hari ini pondok mengajarkan jurus cepat mencari FPB tanpa mendaftar semua pembagi satu per satu.',
        },
        {
          objek: 'kartuSamaLingkar', judul: 'Kartu yang Berduaan',
          teks: 'Letakkan kartu kedua peti berdampingan, lalu lingkari kartu yang punya pasangan di peti lawannya. Kartu 2 dari peti 12 berpasangan dengan kartu 2 milik peti 18. Kartu 3 juga menemukan pasangannya di peti seberang. Yang dilingkari itulah faktor persekutuannya: prima-prima yang dimiliki kedua bilangan sekaligus.',
        },
        {
          objek: 'ambilPangkatKecil', judul: 'Ambil yang Terkecil',
          teks: 'Aturan pondok: dari setiap pasangan, ambil sebanyak yang dimiliki oleh peti yang lebih sedikit. Prima 2 hanya diambil satu kali, prima 3 juga hanya satu kali. Kalikan yang terambil: 2 x 3 = 6. Maka FPB 12 dan 18 adalah 6, ditemukan cuma dalam tiga langkah singkat.',
        },
        {
          objek: 'papanDuaJalanSatuJawab', judul: 'Dua Jalan, Satu Jawaban',
          teks: 'Papan pondok menyandingkan dua jalan menuju jawaban yang sama. Kemarin, daftar pembagi 12 dan 18 memunculkan angka terbesar bersama: 6. Hari ini, kartu prima berpasangan juga bermuara di 2 x 3 = 6. Dua jalan berbeda, satu jawaban sama persis — tanda bahwa FPB memang milik kedua bilangan itu.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kartu Sama Menuntun!',
          teks: 'Mencari FPB lewat faktorisasi ternyata cuma menjodohkan kartu prima yang sama lalu mengalikannya: 2 dan 3 berkenalan jadi 6. Kalau bilangannya besar dan daftar pembaginya panjang, jalan kartu prima ini jauh lebih cepat. Owalah, ternyata begini toh — FPB itu kartu sama yang dikalikan. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-017 · KPK dari Faktorisasi — galeri barisan prima ----- */
    'p2-017': {
      tema: 'galeri',
      npc: { glif: '36', ucap: ['Semua prima,', 'pangkat atas!'] },
      stasiun: [
        {
          objek: 'galeriDuaBaris', judul: 'Galeri Dua Baris Prima',
          teks: 'Di galeri hutan bergantung dua papan barisan. Papan pertama memajang faktorisasi 12: 2 x 2 x 3. Papan kedua memajang faktorisasi 18: 2 x 3 x 3. Pengunjung galeri sedang mencari sesuatu yang berbeda dari FPB: bukan yang sama saja, melainkan semua prima dengan jumlah terbanyaknya.',
        },
        {
          objek: 'lingkarPangkatAtas', judul: 'Lingkari yang Terbanyak',
          teks: 'Ambil pena, lalu lingkari setiap prima dengan jumlah terbanyak di antara kedua papan. Prima 2 muncul dua kali di papan 12 dan satu kali di papan 18 — maka lingkari dua kali: 2 x 2. Prima 3 muncul satu kali di papan 12 dan dua kali di papan 18 — lingkari dua kali: 3 x 3. Tak ada satu pun prima yang tertinggal di galeri.',
        },
        {
          objek: 'kaliSemuaGaleri', judul: 'Kalikan Semua yang Dilingkari',
          teks: 'Sekarang kalikan seluruh lingkaran: 2 x 2 x 3 x 3. Hitung pelannya: 2 x 2 sama dengan 4, 3 x 3 sama dengan 9, lalu 4 x 9 = 36. Maka KPK 12 dan 18 adalah 36 — bilangan yang mampu menampung seluruh kelipatan prima dari kedua papan galeri.',
        },
        {
          objek: 'papanSepakatTigaEnam', judul: 'Galeri Sepakat: 36',
          teks: 'Galeri memeriksa jawabannya dengan daftar kelipatan. Kelipatan 12: 12, 24, 36, 48. Kelipatan 18: 18, 36, 54. Yang berpapasan pertama memang 36 — sama persis dengan hasil lingkaran tadi. Faktorisasi dengan jumlah terbanyak memang setia menunjuk KPK.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Semua Prima Ikut Pulang!',
          teks: 'KPK lewat faktorisasi ternyata cuma satu kebiasaan: ambil semua prima, pilih yang terbanyak, kalikan semuanya — 2 x 2 x 3 x 3 = 36. Berbeda dengan FPB yang hanya membawa kartu sama sebanyak paling sedikit, KPK membawa semua kartu sebanyak paling banyak. Owalah, ternyata begini toh — dua jurus bersaudara itu tinggal soal ambil sedikit atau ambil semua. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-018 · Menyederhanakan Pecahan — tanur roti hutan ----- */
    'p2-018': {
      tema: 'tanur',
      npc: { glif: '2/3', ucap: ['Bagi FPB,', 'jadi rapi!'] },
      stasiun: [
        {
          objek: 'papanDuaBelasPerDelapanBelas', judul: 'Dua Belas dari Delapan Belas',
          teks: 'Di tanur roti hutan, loyang besar terbagi delapan belas kotak kecil, dan dua belas kotak di antaranya terisi roti cokelat. Papan kios menulis porsi hari ini: 12/18. Angkanya terlihat panjang, dan pembeli yakin ada cara menulisnya lebih sederhana tanpa mengubah banyaknya roti sedikit pun.',
        },
        {
          objek: 'pisauBagiEnam', judul: 'Pisau FPB Enam',
          teks: 'Pemanggang memakai pisau FPB. Pembagi bersama terbesar 12 dan 18 adalah 6, maka seluruh loyang dikelompokkan per enam kotak. Bagian atas: 12 : 6 = 2. Bagian bawah: 18 : 6 = 3. Pembilang dan penyebut dibagi dengan angka yang sama — karena itulah nilainya tidak bergeser sedikit pun.',
        },
        {
          objek: 'kartuDuaPerTiga', judul: 'Wajah Baru yang Senilai',
          teks: 'Di kartu harga baru tertulis 2/3. Lihat loyangnya: dua dari tiga kelompok besar terisi — banyaknya roti persis sama dengan sebelumnya, hanya penandaannya yang lebih ringkas. 12/18 dan 2/3 adalah dua nama untuk porsi yang sama, seperti nama panggilan dan nama lengkap satu orang yang sama.',
        },
        {
          objek: 'papanRapiTuntas', judul: 'Rapi Sampai Selesai',
          teks: 'Papan kios menutup pelajarannya: pecahan masih bisa disederhanakan bila pembilang dan penyebutnya punya faktor bersama. Coba periksa 2/3: faktor 2 hanyalah 1 dan 2, faktor 3 hanyalah 1 dan 3 — tak ada kesamaan selain 1. Maka 2/3 sudah dalam bentuk paling sederhana, dan di situ pena berhenti.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Pecahan Rapi Terbaca!',
          teks: 'Menyederhanakan pecahan ternyata cuma satu gerakan: bagi atas dan bawah dengan FPB-nya — 12/18 dibagi 6 menjadi 2/3. Porsinya tidak berkurang sedikit pun, tulisannya saja yang merapikan diri. Owalah, ternyata begini toh — pecahan rapi itu pecahan yang sudah dibagi FPB. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-019 · Samakan Penyebut — titian batu dua pulau ----- */
    'p2-019': {
      tema: 'titianBatu',
      npc: { glif: '12', ucap: ['Penyebut sama,', 'tenang!'] },
      stasiun: [
        {
          objek: 'pulauSeperempat', judul: 'Pulau Seperempat',
          teks: 'Di danau hutan simbol terdapat dua pulau kecil yang dihubungkan titian batu. Pulau pertama terbagi empat kepingan batu, dan satu kepingan menyala keemasan — itulah 1/4. Kalau cahaya itu ingin digabung dengan cahaya pulau seberang, kepingannya harus berukuran sama dulu.',
        },
        {
          objek: 'pulauSeperenam', judul: 'Pulau Seperenam',
          teks: 'Pulau kedua terbagi enam kepingan batu dengan satu kepingan menyala pula — itulah 1/6. Masalahnya terlihat jelas: kepingan pulau pertama berukuran seperempat, kepingan pulau kedua berukuran seperenam. Beda ukuran seperti batu besar dan batu kecil, dan penyebut yang berbeda tak boleh langsung dijumlahkan.',
        },
        {
          objek: 'titianDuaBelas', judul: 'Titian Dua Belas Kepingan',
          teks: 'Maka dibangun titian batu dengan dua belas kepingan seragam — dua belas adalah KPK dari 4 dan 6. Di atas titian, 1/4 membesar jadi 3/12 karena satu kepingan seperempat sama luasnya dengan tiga kepingan perduabelas. Demikian pula 1/6 menjadi 2/12. Kini kedua pecahan bicara dalam bahasa kepingan yang sama.',
        },
        {
          objek: 'papanJumlahLimaPerDuaBelas', judul: 'Menyeberang, Menambah Isi',
          teks: 'Baru setelah penyebutnya sama, penjumlahan berjalan tenang: 3/12 + 2/12 = 5/12. Pembilang yang dijumlah, penyebut tetap bertahan di 12. Hasilnya 5/12 — luas gabungan kedua pulau yang menyala. Tanpa menyamakan penyebut dulu, jawaban akan meleset; dengan KPK, semuanya berjalan pelan dan benar.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Dua Pulau Terhubung!',
          teks: 'Menjumlah pecahan beda penyebut ternyata cuma membangun titian: cari KPK penyebut, ubah 1/4 jadi 3/12 dan 1/6 jadi 2/12, lalu jumlahkan menjadi 5/12. Setelah bahasanya sama, hitungannya semudah menyeberang batu yang rata. Owalah, ternyata begini toh — KPK itu jembatan para penyebut. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-020 · Tantangan Detektif Faktor — kantor pohon raksasa ----- */
    'p2-020': {
      tema: 'kantorPohon',
      npc: { glif: '?', ucap: ['Lima kasus,', 'satu lup!'] },
      stasiun: [
        {
          objek: 'mejaKasusFaktor', judul: 'Kantor Detektif Faktor',
          teks: 'Di pangkal pohon raksasa hutan simbol terbuka kantor detektif faktor, lengkap dengan meja penuh berkas dan lampu meja menyala. Lima berkas kasus menunggu di atas meja, dan semuanya soal faktor, FPB, dan KPK. Detektif muda — itu kamu hari ini — dipersilakan duduk dan membuka berkas pertama.',
        },
        {
          objek: 'papanLimaKasus', judul: 'Papan Lima Kasus',
          teks: 'Papan kasus menuliskan semuanya. Kasus satu: sebutkan faktor 15. Kasus dua: faktorisasi prima 20. Kasus tiga: FPB dari 8 dan 12. Kasus empat: KPK dari 3 dan 5. Kasus lima: sederhanakan 10/15. Lima kasus, lima jurus yang sudah kamu latih sepanjang penjuru ini.',
        },
        {
          objek: 'lupPemeriksa', judul: 'Lup Diperiksa Satu-Satu',
          teks: 'Lup ditembakkan ke tiap berkas. Kasus satu: faktor 15 adalah 1, 3, 5, 15. Kasus dua: 20 = 2 x 2 x 5. Kasus tiga: FPB 8 dan 12 adalah 4. Kasus empat: KPK 3 dan 5 adalah 15, karena keduanya tak berbagi prima. Kasus lima: 10/15 dibagi 5 menjadi 2/3. Lima kasus, lima centang hijau.',
        },
        {
          objek: 'gerbangKoprima', judul: 'Gerbang Koprima',
          teks: 'Berkas terakhir membuka gerbang koprima. Dua bilangan disebut koprima bila faktor bersamanya hanya 1 — contohnya 8 dan 9: yang satu berisi bata 2 semua, yang satu berisi bata 3 semua. Pasangan koprima juga yang membuat 3 dan 5 langsung ber-KPK 15. Mengenali koprima mempercepat banyak hitungan di penjuru ini.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Detektif Faktor Bersertifikat!',
          teks: 'Faktor, faktorisasi prima, FPB, KPK, penyederhanaan pecahan, sampai koprima — seluruh berkas penjuru Faktor tertutup rapi. Kembalilah ke gerbang pusat hutan: delapan penjuru lain masih menyimpan kasus yang menanti detektif. Owalah, ternyata begini toh — faktor dan keluarganya cuma kasus yang selesai dengan memecah bilangan. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-021 · Huruf Pengganti Angka — kantor pos surat tersegel ----- */
    'p2-021': {
      tema: 'posRahasia',
      npc: { glif: 'x', ucap: ['Si x itu', 'kotak misteri!'] },
      stasiun: [
        {
          objek: 'suratTersegelX', judul: 'Surat Bernama x',
          teks: 'Di kantor pos hutan terdapat satu surat bersegel lilin emas: alamatnya tidak menulis nama, hanya sebuah huruf besar x. Tukang pos menjelaskan, huruf itu adalah tempat kosong yang menunggu bilangan — begitu isinya ketahuan, surat langsung bisa dibawa berjalan. Jadi x bukan nama orang, melainkan kotak misteri yang menampung sebuah bilangan.',
        },
        {
          objek: 'kotakKunciMisteri', judul: 'Kotak Berkunci',
          teks: 'Di rak sebelah terdapat kotak kayu berkunci dengan huruf x terukir di tutupnya. Tukang pos mengetuk-ngetuknya: di dalam kotak itu tersimpan sebuah bilangan, dan seluruh hutan sudah sepakat memakai huruf x untuk menunjuk bilangan tersembunyi itu. Ketika kuncinya ditemukan, kotak terbuka, dan bilangan di dalamnya berhenti menjadi teka-teki.',
        },
        {
          objek: 'amplopTerbukaEmpat', judul: 'Kotak Terbuka: Isinya 4',
          teks: 'Kunci ditemukan, dan kotak misteri terbuka lebar: di dalamnya tergeletak kartu angka 4 berkilau. Artinya x = 4. Mulai sekarang, setiap kali huruf x muncul, kita boleh menggantinya dengan 4 — karena itulah isinya. Huruf dan bilangan tinggal menukar tempat, dan teka-teki selesai.',
        },
        {
          objek: 'papanSuratKalimat', judul: 'Kalimat dengan Huruf',
          teks: 'Papan pengumuman kantor pos menuliskan kalimat matematika pertama kita: x + 1 = 5. Kalau x adalah 4, maka 4 + 1 memang 5 — kalimat itu benar. Inilah aljabar pertama: kalimat matematika yang memakai huruf untuk menampung bilangan yang belum diketahui. Begitu hurufnya ketahuan, kalimat langsung bisa diperiksa kebenarannya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Huruf Bisa Jadi Angka!',
          teks: 'Huruf x ternyata cuma kotak yang menampung bilangan: begitu isinya ketahuan, huruf diganti bilangan dan semua hitungan jalan sendiri. Kalimat x + 1 = 5 langsung terbaca benar saat x = 4. Owalah, ternyata begini toh — aljabar cuma kotak misteri yang dibuka. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-022 · Suku Sejenis Berkumpul — kebun apel senja ----- */
    'p2-022': {
      tema: 'kebunApel',
      npc: { glif: '5x', ucap: ['Apel dengan apel,', 'jeruk dengan jeruk!'] },
      stasiun: [
        {
          objek: 'rakKantongDuaTiga', judul: 'Dua Kantong dan Tiga Kantong',
          teks: 'Senja turun di kebun apel hutan. Pet panen menyusun kantong di rak: dua kantong merah dan tiga kantong kuning, dan setiap kantong berisi porsi buah yang sama banyak, ditandai huruf x. Dua kantong itu ditulis 2x — dua porsi x; tiga kantong itu ditulis 3x — tiga porsi x. Bentuk 2x + 3x muncul sendiri di rak panen hari ini.',
        },
        {
          objek: 'barisanKantongLima', judul: 'Semua Kantong Berjajar',
          teks: 'Karena merah dan kuning sama-sama berisi porsi x, semua kantong boleh digabung jadi satu barisan: satu, dua, tiga, empat, lima. Lima kantong berisi porsi x berarti 5x. Maka 2x + 3x = 5x — yang sejenis boleh digabung, tinggal hitung banyak kantongnya.',
        },
        {
          objek: 'keranjangApelJeruk', judul: 'Apel dan Jeruk Tak Dicampur',
          teks: 'Di meja sebelah ada keranjang yang berbeda: keranjang apel dan keranjang jeruk. Pet panen tidak mencampurnya, karena apel dan jeruk beda jenis. Di aljabar juga begitu: 2a + 3b tidak bisa dijadikan satu angka, karena a dan b beda jenis. Beda jenis tetap dipisah — apel dengan apel, jeruk dengan jeruk.',
        },
        {
          objek: 'papanSukuSejenis', judul: 'Papan Suku Sejenis',
          teks: 'Papan kebun merangkum aturan panen: suku sejenis boleh digabung, suku beda jenis tetap berdiri sendiri. 2x + 3x = 5x karena sama-sama x; 2a + 3b tetap 2a + 3b karena a dan b berbeda. Dengan aturan ini, bentuk panjang bisa dirapikan tanpa takut salah.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Sejenis Boleh Digabung!',
          teks: 'Menggabung suku ternyata cuma panen yang tertib: kantong yang sama isi boleh dihitung bersama, yang beda isi tetap di keranjangnya sendiri. 2x + 3x jadi 5x, dan 2a + 3b tetap santai berdua. Owalah, ternyata begini toh — aljabar mengikuti aturan kebun. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-023 · Mengali Bentuk Aljabar — gudang palet kotak ----- */
    'p2-023': {
      tema: 'gudangTumpuk',
      npc: { glif: '6x', ucap: ['Kali semuanya', 'sekaligus!'] },
      stasiun: [
        {
          objek: 'paletDuaKotak', judul: 'Satu Palet Dua Kotak',
          teks: 'Di gudang simbol hutan, palet kayu pertama ditarik keluar: di atasnya tersusun dua kotak yang identik, dan setiap kotak berisi porsi barang sebesar x. Satu palet berisi dua kotak, maka isinya ditulis 2x. Palet inilah bintang utama pengiriman hari ini.',
        },
        {
          objek: 'tigaPaletSejajar', judul: 'Tiga Palet Dipesan',
          teks: 'Pengurus gudang mencatat pesanan besar: tiga palet seperti itu. Tiga palet yang masing-masing berisi 2x ditulis 3 x 2x. Perhatikan angka tiga di depan: ia mengalikan seluruh isi palet, bukan satu kotak saja. Angka yang menempel di depan bentuk aljabar punya nama: koefisien.',
        },
        {
          objek: 'kotakGelindingEnam', judul: 'Semua Kotak Turun ke Lantai',
          teks: 'Untuk membuktikannya, seluruh kotak diturunkan dari palet dan berjajar di lantai gudang: satu, dua, tiga, empat, lima, enam. Tiga palet berisi masing-masing dua kotak sama dengan enam kotak. Maka 3 x 2x = 6x — koefisien 3 benar-benar menyapa semua kotak.',
        },
        {
          objek: 'papanKaliBentuk', judul: 'Papan Pengiriman',
          teks: 'Papan gudang menulis catatan resmi hari ini: 3 x 2x = 6x. Caranya mudah: kalikan angkanya dulu — 3 x 2 sama dengan 6 — lalu tuliskan hurufnya. Berlaku juga untuk bentuk lain, seperti 4 x 3a = 12a. Koefisien selalu ikut terkalikan seluruhnya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Koefisien Ikut Sekalian!',
          teks: 'Mengali bentuk aljabar ternyata cuma memuat ulang palet: tiga palet isi dua kotak sama dengan enam kotak berjajar. Angka di depan ikut mengalikan semuanya, hurufnya tetap menempel. Owalah, ternyata begini toh — 3 x 2x cuma soal enam kotak. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-024 · Membuka Kurung — rumah kaca kuncup ----- */
    'p2-024': {
      tema: 'kacaKuncup',
      npc: { glif: '2(', ucap: ['Sapa semua', 'di dalam kurung!'] },
      stasiun: [
        {
          objek: 'duaPotKaca', judul: 'Dua Pot di Rumah Kaca',
          teks: 'Di rumah kaca hutan berdiri dua pot kaca yang persis kembar. Setiap pot menampung satu paket tanaman yang sama: satu bibit muda berlabel x dan tiga kuncup bunga. Tulisan resminya: tiap pot berisi x + 3, dan jumlah potnya dua. Maka seluruh isian rumah kaca ditulis 2(x + 3).',
        },
        {
          objek: 'isianPotPertama', judul: 'Kurung Masih Menggenggam',
          teks: 'Kaca pot pertama digeser, dan isinya terlihat jelas: satu bibit x berdiri di tengah, dikelilingi tiga kuncup. Tanda kurung itu ibarat dinding kaca: ia menggenggam x + 3 supaya dianggap satu paket utuh. Selama kurung masih tertutup, paket itu belum dibagikan ke siapa pun.',
        },
        {
          objek: 'rakIsianSemua', judul: 'Semua Paket Terbuka',
          teks: 'Kini kedua pot dibuka sekaligus dan isinya disusun di rak panen: bibit x dari pot pertama dan bibit x dari pot kedua bergabung menjadi 2x; tiga kuncup dari pot pertama dan tiga kuncup dari pot kedua bergabung menjadi 6 kuncup. Angka 2 di luar kurung menyapa semuanya: 2(x + 3) = 2x + 6.',
        },
        {
          objek: 'papanKurungTerbuka', judul: 'Papan Tukang Kebun',
          teks: 'Papan tukang kebun merangkum cara membuka kurung: angka di luar menyapa setiap anggota di dalam, tak ada yang terlewat. 2(x + 3) menjadi 2x + 6, karena 2 x x = 2x dan 2 x 3 = 6. Lupa menyapa satu anggota saja, hasilnya langsung meleset.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Semua Anggota Tersapa!',
          teks: 'Membuka kurung ternyata cuma membuka dua pot kembar: paket x + 3 dibagikan dua kali, lahirlah 2x dan 6. Angka di luar menyapa semua anggota di dalam — rapi tanpa sisa. Owalah, ternyata begini toh — kurung cuma paket yang dibuka pelan-pelan. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-025 · Menyisipkan Nilai — bengkel mesin stempel ----- */
    'p2-025': {
      tema: 'mesinStempel',
      npc: { glif: 'x=4', ucap: ['Ganti huruf,', 'lalu hitung!'] },
      stasiun: [
        {
          objek: 'papanSlotHuruf', judul: 'Mesin dengan Slot Kosong',
          teks: 'Di bengkel hutan berdiri mesin stempel papan nama dengan satu slot kosong berlabel x di panelnya. Papan pekerjaan menuliskan tugas hari ini: hitung 2x + 1. Masalahnya, slot x masih kosong — mesin menolak berputar sebelum huruf itu diganti bilangan.',
        },
        {
          objek: 'koinNilaiEmpat', judul: 'Koin Angka 4 Disisipkan',
          teks: 'Pemilik bengkel mengambil koin angka 4 dan menambahkannya ke slot x. Seketika panel berbunyi: x = 4 diterima. Menyisipkan nilai seperti ini punya nama resmi: substitusi — mengganti huruf dengan bilangan yang sudah diketahui, lalu membiarkan mesin menghitung.',
        },
        {
          objek: 'rodaMesinHitung', judul: 'Roda Mesin Berputar',
          teks: 'Roda mesin berputar menghitung pelan-pelan: 2x berarti 2 x 4, sama dengan 8; lalu 8 + 1 sama dengan 9. Setiap langkah tercatat di panel: ganti dulu, kalikan dulu, baru tambahkan. Urutannya penting, dan mesin tidak pernah melompat.',
        },
        {
          objek: 'strukHasilSembilan', judul: 'Struk Keluar: Hasil 9',
          teks: 'Ding! Struk hasil tercetak: 2x + 1 = 9 ketika x = 4. Struk itu juga menuliskan pesan kecil: bilangan boleh berganti-ganti — coba lain kali x = 2, hasilnya 2 x 2 + 1 = 5. Substitusi bekerja untuk bilangan apa pun yang disisipkan.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Ganti Lalu Hitung!',
          teks: 'Menyisipkan nilai ternyata cuma dua langkah: ganti huruf dengan bilangannya, lalu hitung sesuai urutan. x = 4 membuat 2x + 1 menjadi 9 — dan bilangan lain pun akan dikerjakan sama rapi. Owalah, ternyata begini toh — substitusi cuma mesin yang diberi koin angka. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-026 · Merapikan Bentuk Panjang — teras kamar senja ----- */
    'p2-026': {
      tema: 'kamarRapi',
      npc: { glif: '8x', ucap: ['Kumpulkan', 'yang sejenis!'] },
      stasiun: [
        {
          objek: 'rakKartuBerantakan', judul: 'Kartu Berserakan',
          teks: 'Di teras kamar hutan, angin tadi malam membenarkan kartu-kartu hitung di rak: 5x, −2, 3x, dan 4 berserakan tak berurutan. Bentuk panjang 5x − 2 + 3x + 4 memang terlihat ramai — seperti kamar yang belum dirapikan. Sebelum dihitung, kumpulkan dulu kartunya.',
        },
        {
          objek: 'tumpukanSejenis', judul: 'Dua Tumpukan Terbentuk',
          teks: 'Perapian dimulai: kartu yang ada huruf x-nya dikumpulkan ke tumpukan kiri — ada 5x dan 3x. Kartu angka biasa dikumpulkan ke tumpukan kanan — ada −2 dan 4. Dua tumpukan berdiri jelas, tidak ada kartu yang tertinggal di lantai.',
        },
        {
          objek: 'kartuJadiTertata', judul: 'Hitung Tiap Tumpukan',
          teks: 'Tumpukan kiri dihitung: 5x + 3x sama dengan 8x — suku sejenis yang bergabung, persis kantong panen kemarin. Tumpukan kanan dihitung: −2 + 4 sama dengan 2. Kini rak tampak lapang: cuma dua kartu rapi yang tersisa, 8x dan 2 — semuanya terhitung tanpa satu pun kartu tertukar.',
        },
        {
          objek: 'papanBentukRapi', judul: 'Rak Kembali Rapi',
          teks: 'Papan kamar menempelkan hasil perapian: 5x − 2 + 3x + 4 = 8x + 2. Bentuk panjang yang ramai kini pendek dan mudah dibaca. Rahasianya cuma satu: kumpulkan suku sejenis, hitung masing-masing, tulis ulang dengan tertib.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Rapikan Dulu Beres!',
          teks: 'Merapikan bentuk aljabar ternyata sama dengan merapikan kamar: pilah dulu yang sejenis, gabungkan, lalu susun ulang. 5x − 2 + 3x + 4 tinggal 8x + 2 — ringkas dan tak ada kartu yang hilang. Owalah, ternyata begini toh — bentuk panjang cuma kamar yang menunggu dirapikan. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-027 · Pola Jadi Rumus — tangga kunang-kunang malam ----- */
    'p2-027': {
      tema: 'kunangTangga',
      npc: { glif: '4n', ucap: ['Naik empat', 'tiap langkah!'] },
      stasiun: [
        {
          objek: 'tanggaKunangEmpat', judul: 'Tangga yang Menyala',
          teks: 'Malam tiba di hutan simbol, dan tangga batu tua mulai menyalakan lampunya: kunang-kunang hinggap di anak tangga bernilai 3, lalu 7, lalu 11, lalu 15. Deretan cahayanya membentuk pola yang tertib — naik dari bawah ke atas tanpa sekali pun meleset.',
        },
        {
          objek: 'panahLompatEmpat', judul: 'Lompatan Empat-Demi-Empat',
          teks: 'Dari 3 ke 7 naik 4. Dari 7 ke 11 naik 4 lagi. Dari 11 ke 15 naik 4 juga. Setiap langkah tangga selalu naik empat — itulah beda yang setia pada barisan ini. Pola yang setia seperti ini bisa dituliskan jadi rumus, sehingga kita tidak perlu menghitung anak tangga satu-satu.',
        },
        {
          objek: 'anakTanggaKeN', judul: 'Anak Tangga Ke-n',
          teks: 'Sekarang sebut anak tangga mana pun dengan n: anak tangga pertama n = 1, kedua n = 2, ketiga n = 3. Tiap langkah naik 4, ditulis 4 x n. Tapi cek dulu: 4 x 1 = 4, padahal anak tangga pertama bernilai 3 — selisihnya 1. Maka rumusnya 4n − 1.',
        },
        {
          objek: 'papanRumusEmpatN', judul: 'Rumus Diuji Semua Anak Tangga',
          teks: 'Papan uji di kaki tangga memeriksa rumusnya satu per satu: n = 1 memberi 4 x 1 − 1 = 3 — benar; n = 2 memberi 4 x 2 − 1 = 7 — benar; n = 3 memberi 4 x 3 − 1 = 11 — benar; n = 4 memberi 4 x 4 − 1 = 15 — benar lagi. Rumus 4n − 1 resmi menjadi nama tangga kunang itu.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Pola Muat Satu Baris!',
          teks: 'Pola barisan ternyata bisa dikunci dalam rumus: lihat lompatannya (naik 4), tulis 4n, lalu betulkan selisihnya (−1). Deret 3, 7, 11, 15 kini muat dalam satu baris: 4n − 1 — anak tangga keberapa pun bisa dijawab cepat. Owalah, ternyata begini toh — rumus cuma pola yang ditulis ringkas. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-028 · Koefisien & Konstanta — tenda pendaki senja ----- */
    'p2-028': {
      tema: 'tendaPendaki',
      npc: { glif: '3x', ucap: ['Yang menempel', 'koefisien namanya!'] },
      stasiun: [
        {
          objek: 'rakTigaRansel', judul: 'Tiga Ransel Kembar',
          teks: 'Di depan tenda pendaki hutan, tiga ransel kembar tergantung rapi di rak. Setiap ransel berisi porsi bekal yang sama banyak, ditandai huruf x. Tiga ransel berisi x ditulis 3x — dan angka tiga yang menempel di depan x itu punya nama: koefisien, si penghitung banyaknya kelompok.',
        },
        {
          objek: 'batuLimaSendiri', judul: 'Batu Berdiri Sendiri',
          teks: 'Di samping rak, satu batu besar berukir angka 5 berdiri sendiri tanpa menempel ransel apa pun. Ia tidak membawa huruf — namanya konstanta: bilangan yang tetap, tidak berubah walau isi ransel berganti. Dalam bentuk 3x + 5, dialah tamu yang berdiri sendiri.',
        },
        {
          objek: 'papanNamaBagian', judul: 'Papan Nama Bagian',
          teks: 'Papan depan tenda membagi-bagikan nama dengan jelas: 3 adalah koefisien, x adalah huruf penampung bilangan, dan 5 adalah konstanta. Tiap bagian punya tugas: koefisien menghitung banyak kelompok, huruf menampung isinya, konstanta berdiri tetap.',
        },
        {
          objek: 'tendaBekalPenuh', judul: 'Catatan Bekal Pendaki',
          teks: 'Buku catatan tenda menuliskan bekal rombongan hari ini: 3x + 5 — tiga ransel berisi x plus lima roti tambahan. Kalau besok ranselnya bertambah satu, bentuknya berubah jadi 4x + 5: koefisien boleh berganti, tetapi konstanta 5 tetap duduk di tempatnya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Nama Tiap Bagian!',
          teks: 'Di 3x + 5 ternyata ada alamat lengkap: 3 si koefisien yang menempel, x si huruf penampung, dan 5 si konstanta yang berdiri sendiri. Mengenali nama tiap bagian membuat bentuk aljabar tak lagi terlihat ramai. Owalah, ternyata begini toh — bentuk aljabar cuma tim kecil dengan tugas masing-masing. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-029 · Membaca Bentuk Aljabar — ladang bunga pagi ----- */
    'p2-029': {
      tema: 'ladangBunga',
      npc: { glif: '2a', ucap: ['Bentuk', 'punya cerita!'] },
      stasiun: [
        {
          objek: 'petakBungaA', judul: 'Dua Petak Bunga a',
          teks: 'Pagi di ladang bunga hutan. Di sebelah kiri terbentang dua petak bunga putih, dan setiap petak berisi sejumput bunga yang jumlahnya ditandai huruf a. Dua petak berisi a ditulis 2a — kalimat singkat untuk dua kelompok a.',
        },
        {
          objek: 'petakBungaB', judul: 'Tiga Petak Bunga b',
          teks: 'Di sebelah kanan ladang, tiga petak bunga merah tersusun berjajar. Setiap petak berisi sejumput bunga berlabel b. Tiga petak berisi b ditulis 3b — tiga kelompok b. Ladang hari ini menanam dua jenis kelompok: kelompok a dan kelompok b.',
        },
        {
          objek: 'ladangTerbaca', judul: 'Ladang Jadi Kalimat',
          teks: 'Penjaga ladang membaca seluruh petak dalam satu kalimat pendek: 2a + 3b — dua kelompok a ditambah tiga kelompok b. Bentuk aljabar memang kalimat singkat tentang banyak bilangan: ia menceritakan susunan kelompok tanpa perlu menyebut jumlah bunganya satu-satu.',
        },
        {
          objek: 'papanDuaA3B', judul: 'Kalimat yang Bisa Diisi',
          teks: 'Papan ladang mencoba kalimatnya dengan isi nyata: bila a = 2 dan b = 1, maka 2a + 3b sama dengan 2 x 2 + 3 x 1, yaitu 7. Bila isinya berganti, kalimatnya pun ikut menyesuaikan. Itulah kekuatan bentuk aljabar: satu tulisan, berbagai kemungkinan isi.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Bentuk Punya Cerita!',
          teks: 'Membaca 2a + 3b ternyata sama dengan membaca ladang: dua petak berlabel a dan tiga petak berlabel b, berjajar rapi dalam satu kalimat. Begitu huruf-hurufnya diberi isi, kalimat itu menghitung dirinya sendiri. Owalah, ternyata begini toh — bentuk aljabar cuma ladang yang ditulis singkat. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-030 · Tantangan Rumus Hutan — menara jaga malam ----- */
    'p2-030': {
      tema: 'menaraTantang',
      npc: { glif: '?', ucap: ['Lima misi', 'di menara!'] },
      stasiun: [
        {
          objek: 'menaraLimaMisi', judul: 'Menara Lima Misi',
          teks: 'Di penjuru terakhir Aljabar Pertama berdiri menara jaga tua dengan lima jendela menyala. Papan di kakinya menuliskan lima misi rumus: rumuskan barisan, buka kurung, gabungkan suku, sisipkan nilai, dan baca bentuk aljabar. Selesaikan satu misi, satu jendela makin terang.',
        },
        {
          objek: 'jendelaPolaBarisan', judul: 'Misi Barisan dan Rumusnya',
          teks: 'Jendela pertama menampilkan barisan 5, 9, 13, dan satu kartu tanda tanya. Bedanya empat terus-menerus, maka tanda tanya itu 17. Jendela kedua meminta rumusnya: naik 4 ditulis 4n, dan karena 4 x 1 = 4 tetapi barisannya mulai dari 5, diperlukan koreksi +1 — rumusnya 4n + 1. Dua jendela pun menyala lebih terang.',
        },
        {
          objek: 'jendelaKurungSuku', judul: 'Misi Kurung dan Suku',
          teks: 'Jendela ketiga menguji kurung: 3(x + 2) dibuka dengan menyapa kedua anggota — hasilnya 3x + 6. Jendela keempat menguji suku sejenis: 4x + 2x digabung menjadi 6x. Dua pemeriksaan itu lulus, dan dua jendela lagi ikut menyala.',
        },
        {
          objek: 'jendelaNilaiHuruf', judul: 'Misi Terakhir: Sisipkan Nilai',
          teks: 'Jendela puncak memberi soal pamungkas: bila x = 3, berapakah 2x + 1? Ganti dulu hurufnya: 2 x 3 sama dengan 6, lalu 6 + 1 sama dengan 7. Jendela puncak menyala paling terang — lima misi rumus hutan resmi selesai.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Ahli Rumus Hutan!',
          teks: 'Barisan dilanjutkan, kurung dibuka, suku digabung, nilai disisipkan — semua jurus Aljabar Pertama kini ada di genggamanmu. Kembalilah ke gerbang pusat hutan: tujuh penjuru lain masih menunggu penjelajah yang pandai membaca huruf. Owalah, ternyata begini toh — aljabar cuma bahasa rapi untuk bilangan yang belum ketahuan. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-031 · Timbangan Persamaan — pasar senja dua mangkuk ----- */
    'p2-031': {
      tema: 'pasarSenja',
      npc: { glif: 'x', ucap: ['Dua sisi', 'harus pas!'] },
      stasiun: [
        {
          objek: 'neracaDagang', judul: 'Neraca Pedagang Pasar',
          teks: 'Senja turun di pasar hutan. Pedagang tua masih berjaga di balik neraca besarnya: mangkuk kiri memuat kotak misteri berlabel x ditambah tiga beban kecil, mangkuk kanan memuat tujuh beban yang sama. Lihat baik-baik: kedua mangkuk berdiri rata, tidak ada yang turun, tidak ada yang naik. Itulah gambaran persamaan — nilai sisi kiri persis sama dengan sisi kanan, dan x + 3 = 7 adalah tulisan singkat untuk keseimbangan itu.',
        },
        {
          objek: 'isiMangkukKiri', judul: 'Isi Mangkuk Kiri',
          teks: 'Mangkuk kiri diturunkan dan isinya dihitung satu per satu: satu kotak misteri x, lalu tiga beban kecil. Jadi sisi kiri berisi x + 3 — kotaknya belum kita ketahui isinya, tetapi tiga beban itu sudah jelas terlihat. Pedagang menjelaskan, selama kedua sisi masih seimbang, apa pun isi kotak itu, jumlah kiri harus sama dengan tujuh di kanan. Persamaan selalu menyimpan janji itu: dua sisi yang sama berat.',
        },
        {
          objek: 'mangkukTujuh', judul: 'Tujuh Beban di Kanan',
          teks: 'Mangkuk kanan pun diperlihatkan: satu, dua, tiga, empat, lima, enam, tujuh beban kecil tersusun rapi. Tujuh adalah bilangan yang sudah diketahui — dialah pasangan berat dari seluruh isi kiri. Kalau beban kanan ditambah satu, mangkuk kanan turun dan timbangan berat sebelah; kalau satu beban diambil, kiri justru lebih berat. Maka pedagang selalu menambah atau mengurangi kedua sisi bersamaan, agar neraca tetap rata.',
        },
        {
          objek: 'papanKiriKanan', judul: 'Papan Aturan Pasar',
          teks: 'Papan depan pasar menuliskan aturan emas pedagang: apa yang terjadi di kiri, harus ikut terjadi di kanan. Inilah arti tanda sama dengan (=): kedua sisi berjumlah persis sama. x + 3 = 7 bukan perintah, melainkan kabar baik — ia memberitahu bahwa dua sisi itu seimbang, dan tugas kita tinggal mencari isi kotak x yang membuat keseimbangan itu benar-benar terjadi.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Dua Sisi Harus Pas!',
          teks: 'Persamaan ternyata cuma timbangan yang tertulis: sisi kiri dan sisi kanan berjanji berjumlah sama, dan kita tinggal menjaga keseimbangan itu. Owalah, ternyata begini toh — tanda sama dengan itu janji dua sisi untuk tetap pas. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-032 · Mencari Nilai x — dermaga ikan fajar ----- */
    'p2-032': {
      tema: 'dermagaIkan',
      npc: { glif: '4', ucap: ['Lepas tiga', 'dari dua sisi!'] },
      stasiun: [
        {
          objek: 'timbanganIkan', judul: 'Neraca Hasil Laut',
          teks: 'Fajar di dermaga hutan. Nelayan menimbang hasil lautnya dengan neraca tua: di mangkuk kiri ada keranjang misteri berlabel x dan tiga ikan segar; di mangkuk kanan ada tujuh ikan yang sudah dihitung. Neraca berdiri rata, maka tulisan ceritanya begini: x + 3 = 7. Keranjang x masih menyembunyikan isinya, tetapi keseimbangan itu sudah membocorkan banyak hal.',
        },
        {
          objek: 'tigaIkanDiambil', judul: 'Tiga Ikan Lepas Bersamaan',
          teks: 'Nelayan lalu melakukan hal yang adil: ia mengambil tiga ikan dari mangkuk kiri, dan sekaligus tiga ikan dari mangkuk kanan. Kedua sisi sama-sama berkurang tiga, sehingga neraca tetap rata — tidak berubah sedikit pun. Mengurangi kedua sisi dengan jumlah yang sama selalu aman, karena selisihnya saling meniadakan dan timbangan tidak tahu apa-apa.',
        },
        {
          objek: 'keranjangSendiri', judul: 'Keranjang Tinggal Sendirian',
          teks: 'Sekarang mangkuk kiri hanya dihuni keranjang x, dan mangkuk kanan tinggal empat ikan: 7 dikurangi 3 sama dengan 4. Neraca masih rata, artinya berat keranjang persis sama dengan empat ikan. Maka terbukalah jawabannya: x = 4. Kotak misteri itu akhirnya terbuka, dan isinya empat.',
        },
        {
          objek: 'papanGeserRuas', judul: 'Papan Catatan Nelayan',
          teks: 'Papan dermaga mencatat langkah tadi dengan ringkas: x + 3 = 7, pindahkan +3 ke sisi seberang sehingga berubah jadi −3, maka x = 7 − 3, yaitu x = 4. Angka yang pindah ruas selalu berganti tanda — tambah menjadi kurang, kurang menjadi tambah. Itulah jurus pertama detektif persamaan: geser ke seberang, balikkan tandanya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Pindah Ruas Balik Tanda!',
          teks: 'Mencari x ternyata cuma melepas beban yang sama dari kedua sisi: +3 pindah ke seberang berubah −3, dan x langsung terlihat. x + 3 = 7 bermuara pada x = 4 — dan begitu dicek, 4 + 3 memang 7. Owalah, ternyata begini toh — cari x itu cuma soal memindahkan angka dengan sopan. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-033 · Kali & Bagi pada x — kandang ayam pagi ----- */
    'p2-033': {
      tema: 'kandangPagi',
      npc: { glif: '5', ucap: ['Dua kandang,', 'sama isinya!'] },
      stasiun: [
        {
          objek: 'duaKandangTutup', judul: 'Dua Kandang Kembar',
          teks: 'Pagi di kandang hutan. Dua kandang kayu kembar berdiri bersebelahan, pintunya masih tertutup, dan setiap kandang berisi ayam yang jumlahnya sama persis — kita tandai dengan huruf x. Papan tulis di pagar menuliskan kabar dari petugas: jumlah ayam kedua kandang bersama-sama ada 10. Tulisannya pendek dan rapi: 2x = 10.',
        },
        {
          objek: 'sepuluhAyamHitung', judul: 'Sepuluh Ayam Berhitung',
          teks: 'Pintu halaman terbuka, dan sepuluh ayam keluar berjajar di tanah: mereka dibagi menjadi dua kelompok yang sama banyak — lima berjalan ke halaman kiri, lima ke halaman kanan. Tampak jelas sekarang bahwa dua kandang berisi 10 ayam berarti tiap kandang menampung setengahnya. Membagi dua sisi dengan angka yang sama tidak pernah merusak keseimbangan.',
        },
        {
          objek: 'kandangDibukaLima', judul: 'Kandang Terbuka: Isinya Lima',
          teks: 'Pintu kandang pertama dibuka lebar: lima ayam berkicau riang di dalamnya. Maka x = 5 — karena 2 x 5 memang 10. Yang semula dikali dua, sekarang dibagi dua; kedua langkah itu selalu saling membalik. Kandang kedua pun dibuka, dan isinya sama persis: lima. Dua kandang kembar, dua jawaban kembar.',
        },
        {
          objek: 'papanBagiDua', judul: 'Papan Petugas Kandang',
          teks: 'Papan petugas merangkum jurusnya: bila 2x = 10, bagi kedua sisi dengan 2, maka x = 5. Berlaku juga sebaliknya: bila x = 5 lalu kedua sisi dikali 2, kembali ke 2x = 10. Kali dan bagi adalah dua kembar yang selalu saling membuka pintu — dan keseimbangan tidak pernah terusik asal keduanya bekerja di kedua sisi sekaligus.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kali dan Bagi Kembar!',
          teks: 'Mengerjakan 2x = 10 ternyata sama dengan membagi rata isi dua kandang: bagi kedua sisi dengan dua, dan x = 5 langsung berdiri. Kali dan bagi ternyata saling membalik — seperti menutup dan membuka kandang yang sama. Owalah, ternyata begini toh — semua itu cuma soal membagi rata. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-034 · Persamaan Dua Langkah — toko roti sore ----- */
    'p2-034': {
      tema: 'tokoRoti',
      npc: { glif: '11', ucap: ['Kurangi dulu,', 'baru bagi!'] },
      stasiun: [
        {
          objek: 'nampanDuaTiga', judul: 'Meja Toko Roti',
          teks: 'Sore di toko roti hutan, dan wangi roti hangat memenuhi ruangan. Di meja jualan tersusun dua nampan yang identik — tiap nampan berisi x roti — dan satu piring berisi tiga roti lepas. Nota menuliskan totalnya: 11 roti. Kalimat matematisnya: 2x + 3 = 11, dua nampan misteri ditambah tiga roti lepas.',
        },
        {
          objek: 'piringTigaDipindah', judul: 'Piring Tiga Roti Dipindah',
          teks: 'Pemilik toko mulai merapikan: piring berisi tiga roti itu dipindah ke rak bawah, keluar dari hitungan meja. Total meja kini 11 dikurangi 3, sama dengan 8 — dan dua nampan itulah isinya. Pada persamaan, langkah pertama selalu seperti ini: singkirkan dulu yang berdiri sendiri, dengan mengurangi kedua sisi sekaligus.',
        },
        {
          objek: 'nampanDibagiDua', judul: 'Dua Nampan Dibagi Rata',
          teks: 'Sekarang tinggal 2x = 8: dua nampan berisi sama banyak, jumlahnya delapan. Roti dihitung dan dibagi rata ke kedua nampan: empat dan empat. Maka x = 4, dan tiap nampan memang berisi empat roti sejak awal. Cek sekali lagi: 2 x 4 + 3 sama dengan 8 + 3, yaitu 11 — nota kembali pas.',
        },
        {
          objek: 'papanDuaLangkah', judul: 'Papan Nota Dua Langkah',
          teks: 'Papan nota menuliskan urutan resminya: 2x + 3 = 11; kurangi kedua sisi dengan 3, menjadi 2x = 8; bagi kedua sisi dengan 2, menjadi x = 4. Dua langkah pelan: dahulukan yang berdiri sendiri, barulah bagikan yang menempel. Urutan inilah yang membuat persamaan panjang tetap tertib seperti dapur toko roti.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Dua Langkah Tuntas!',
          teks: 'Persamaan dua langkah ternyata cuma urusan dapur: singkirkan dulu roti yang lepas, lalu bagi rata isi nampan. 2x + 3 = 11 melangkah santai jadi 2x = 8, lalu x = 4 — dan pemeriksaan ulang membuktikannya. Owalah, ternyata begini toh — pelan-pelan, dua langkah saja. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-035 · x di Dua Sisi — taman jungkat-jungkit siang ----- */
    'p2-035': {
      tema: 'tamanJungkit',
      npc: { glif: '3x', ucap: ['Kumpulkan x', 'di satu sisi!'] },
      stasiun: [
        {
          objek: 'jungkatKantong', judul: 'Jungkat-Jungkit Seimbang',
          teks: 'Siang di taman hutan. Sebuah jungkat-jungkit panjang berdiri rata dengan muatan di kedua ujungnya: sisi kiri berisi tiga kantong kecil berlabel x plus dua batu; sisi kanan berisi satu kantong kecil x plus sepuluh batu. Jungkat-jungkit tidak miring sama sekali, maka tulisan keseimbangannya: 3x + 2 = x + 10 — x muncul di dua sisi sekaligus.',
        },
        {
          objek: 'satuKantongDiambil', judul: 'Satu Kantong Turun Bersama',
          teks: 'Anak-anak lalu mengambil satu kantong x dari sisi kiri, dan sekaligus satu kantong x dari sisi kanan — dilepas sama rata, jungkat-jungkit tetap rata. Yang tersisa di kiri 2x + 2, dan di kanan tinggal 10. Cara ini disebut mengumpulkan x: setiap kantong yang sama di dua sisi boleh saling dicabut, dan keseimbangan tidak pernah tersinggung.',
        },
        {
          objek: 'duaBatuDiambil', judul: 'Dua Batu Ikut Dipilah',
          teks: 'Jungkat-jungkit masih rata, tetapi papan penjaga taman minta lebih rapi lagi: dua batu di kiri dicabut, dan dua batu di kanan dicabut juga. Kini kiri murni 2x dan kanan murni 8. Semua batu sudah berkumpul di satu sisi, semua kantong x di sisi yang satunya — persis tatanan yang dicitrakan papan penjaga taman.',
        },
        {
          objek: 'papanKumpulkanX', judul: 'Papan Penjaga Taman',
          teks: 'Papan penjaga menuliskan langkah penuhnya: 3x + 2 = x + 10; cabang satu kantong dari tiap sisi, jadi 2x + 2 = 10; cabang dua batu dari tiap sisi, jadi 2x = 8; bagi dua, maka x = 4. Periksa kembali: kiri 3 x 4 + 2 sama dengan 14, kanan 4 + 10 juga 14 — jungkat-jungkit benar-benar seimbang.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, x Berkumpul Satu Sisi!',
          teks: 'Persamaan dengan x di dua sisi ternyata cuma jungkat-jungkit yang dirapikan: pindahkan semua x ke satu sisi, semua angka ke sisi lain, lalu selesaikan seperti biasa. 3x + 2 = x + 10 berakhir tenang di x = 4. Owalah, ternyata begini toh — timbangannya cuma minta dipilah. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-036 · Memeriksa Jawaban — meja lampu malam ----- */
    'p2-036': {
      tema: 'mejaKoreksi',
      npc: { glif: '=', ucap: ['Cek ulang,', 'baru sahih!'] },
      stasiun: [
        {
          objek: 'lembarJawaban', judul: 'Lembar Jawaban di Meja',
          teks: 'Malam tiba, dan di meja belajar hutan tergeletak satu lembar jawaban: 2x + 3 = 11, dengan kesimpulan x = 4. Lampu belajar menyala terang, dan tugas malam ini satu: memeriksa kembali apakah jawaban itu benar-benar sahih. Detektif yang baik tidak berhenti sebelum membuktikan temuannya sendiri.',
        },
        {
          objek: 'lampuPeriksaKiri', judul: 'Lampu Menyapu Sisi Kiri',
          teks: 'Lampu digeser ke sisi kiri lembar: ganti x dengan 4, lalu hitung 2 x 4 + 3. Kali dulu, jadi 8; tambah kemudian, jadi 11. Sisi kiri tercatat berjumlah 11. Setiap langkah dihitung pelan — kali dulu sebelum tambah — persis urutan yang dikerjakan mesin stempel di penjuru aljabar kemarin.',
        },
        {
          objek: 'lampuPeriksaKanan', judul: 'Lampu Menyapu Sisi Kanan',
          teks: 'Lampu lalu berpindah ke sisi kanan lembar: di sana hanya tertulis 11, tanpa perlu dihitung lagi. Maka dibandingkanlah: kiri 11, kanan 11 — sama persis. Tanda sama dengan berjanji jujur, dan malam ini janji itu terbukti. Jawaban x = 4 lolos pemeriksaan dengan sempurna.',
        },
        {
          objek: 'stempelSahih', judul: 'Stempel Hijau Meja',
          teks: 'Pemilik meja mengambil stempel hijau dan menekannya di pojok lembar: SAHIH. Sejak malam itu, memeriksa jawaban jadi kebiasaan yang menyenangkan — masukkan nilai x ke persamaan awal, hitung kedua sisi, lalu lihat apakah keduanya bertemu di angka yang sama. Kalau belum sama, tak apa: detektif tinggal mengulang langkahnya dengan lebih teliti.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Jawaban Sahih Terbukti!',
          teks: 'Memeriksa jawaban ternyata cuma memutar waktu sedikit: kembalikan x ke persamaan awal, hitung kiri dan kanan, lalu pastikan keduanya sama. x = 4 pada 2x + 3 = 11 terbukti sahih karena 8 + 3 memang 11. Owalah, ternyata begini toh — detektif hebat selalu memeriksa ulang temuannya. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-037 · Lebih dari & Kurang dari — gerbang wahana siang ----- */
    'p2-037': {
      tema: 'gerbangWahana',
      npc: { glif: '>', ucap: ['Rahang terbuka', 'ke yang besar!'] },
      stasiun: [
        {
          objek: 'papanMulutTanda', judul: 'Papan Gerbang Wahana',
          teks: 'Di gerbang wahana hutan berdiri papan kayu dengan dua tanda rahang terukir: > dan <. Penjaga gerbang menjelaskan, dua tanda itu adalah penjaga yang sangat jujur: rahangnya selalu terbuka lebar ke bilangan yang lebih besar, dan ujung lancipnya menunjuk yang lebih kecil. Rahang ini tak pernah salah sasaran sejak zaman dulu.',
        },
        {
          objek: 'buayaTandaLima', judul: 'Rahang Terbuka ke Lima',
          teks: 'Kartu contoh pertama ditempel di papan: 5 > 3. Lihat rahangnya — mulut terbuka lebar menghadap angka 5, karena lima lebih besar dari tiga. Bacaannya: lima lebih dari tiga. Kalau kartu ditukar menjadi 3 < 5, rahangnya tetap terbuka ke lima; yang berubah hanya posisi ujung lancipnya.',
        },
        {
          objek: 'buayaTandaDua', judul: 'Rahang Menutup ke Dua',
          teks: 'Kartu kedua bertuliskan 2 < 3. Kini rahang terbuka ke kanan, menghadap angka 3, karena tiga lebih besar dari dua; ujung lancipnya menunjuk angka 2 yang lebih kecil. Jadi tanda > dan < selalu punya dua sisi cerita: mulut untuk yang besar, lancip untuk yang kecil. Sekali terbiasa, kartu angka apa pun langsung terbaca.',
        },
        {
          objek: 'xLebihTigaKumpul', judul: 'x Lebih dari Tiga',
          teks: 'Papan terakhir menulis kalimat dengan huruf: x > 3. Ini pertidaksamaan — x tidak lagi punya satu jawaban, melainkan banyak: 4 boleh, 5 boleh, 6 boleh, dan seterusnya, semua bilangan yang lebih besar dari 3. Bandingkan dengan persamaan x = 4 yang jawabannya tunggal. Pertidaksamaan bicara tentang wilayah, bukan satu titik.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Rahangnya Tak Pernah Salah!',
          teks: 'Membaca > dan < ternyata tinggal mengikuti rahang jujur itu: terbuka ke yang lebih besar, lancip ke yang lebih kecil. Dan saat huruf x ikut bermain, x > 3 membuka pintu bagi banyak jawaban sekaligus. Owalah, ternyata begini toh — tanda pertidaksamaan cuma penjaga gerbang yang setia arah. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-038 · Garis Pertidaksamaan — landasan lampu malam ----- */
    'p2-038': {
      tema: 'landasanLampu',
      npc: { glif: 'x>3', ucap: ['Panah menyala', 'ke kanan!'] },
      stasiun: [
        {
          objek: 'garisLampuTitik', judul: 'Garis Lampu Bilangan',
          teks: 'Malam di landasan hutan. Lampu-lampu kecil tertanam membentuk garis lurus, dan tiap lampu diberi nomor: −1, 0, 1, 2, 3, 4, 5, 6. Itulah garis bilangan versi hutan — setiap titik adalah alamat sebuah bilangan, tersusun rapi dari kecil di kiri sampai besar di kanan. Malam ini, garis lampu itu akan menampilkan pertidaksamaan.',
        },
        {
          objek: 'tiangTigaLubang', judul: 'Tiang di Angka Tiga',
          teks: 'Di lampu bernomor 3 berdiri tiang kecil dengan cincin TERBUKA — bolong di tengah, tidak diisi penuh. Cincin terbuka itu punya arti penting: angka 3 sendiri tidak ikut menjadi jawaban, karena kalimatnya x > 3 — lebih besar dari 3, bukan angka 3-nya. Kalau kalimatnya membolehkan sama dengan, cincin itu baru diisi penuh dan angka 3 ikut menjadi jawaban.',
        },
        {
          objek: 'panahMenyalaKanan', judul: 'Panah Lampu Menyala',
          teks: 'Tiba-tiba lampu-lampu di kanan angka 3 menyala berurutan: 4 menyala, 5 menyala, 6 menyala, dan panah cahaya melanjutkan sampai tepi landasan. Itulah wajah jawaban x > 3 — bukan satu lampu, melainkan seluruh deret lampu di kanan 3, tanpa henti. Setiap lampu yang menyala adalah bilangan yang membuat kalimat itu benar.',
        },
        {
          objek: 'papanBanyakJawaban', judul: 'Papan Banyaknya Jawaban',
          teks: 'Papan landasan merangkum malam ini: x > 3 digambar dengan cincin terbuka di 3 dan panah ke kanan; x < 3 digambar dengan cincin terbuka di 3 dan panah ke kiri. Arah panah selalu mengikuti arah rahang tandanya. Pertidaksamaan memang ramah — jawabannya bukan satu titik, melainkan sejalan lampu yang menyala bersama.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Jawabannya Sejalan!',
          teks: 'Menggambar pertidaksamaan ternyata cuma menyalakan lampu: cincin terbuka di angka batasnya, lalu panah menyala ke arah yang dijanjikan rahang tanda. x > 3 pun berubah dari tulisan menjadi deret lampu 4, 5, 6, dan seterusnya. Owalah, ternyata begini toh — jawaban pertidaksamaan itu sejalan, bukan sendirian. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-039 · Pertidaksamaan Dua Langkah — kios es sore ----- */
    'p2-039': {
      tema: 'kiosEs',
      npc: { glif: '<', ucap: ['Kurangi dulu,', 'panah setia!'] },
      stasiun: [
        {
          objek: 'gelasDuaSatuBatu', judul: 'Kios Es Batu',
          teks: 'Sore di kios minuman hutan. Di meja ada dua gelas besar — masing-masing berisi x es batu — dan satu es batu lepas berdiri di nampan. Penjaga kios menuliskan batas harinya di papan: jumlah es batu semua harus kurang dari sembilan. Kalimatnya pendek: 2x + 1 < 9.',
        },
        {
          objek: 'papanKurangSembilan', judul: 'Papan Batas Sembilan',
          teks: 'Papan batas itu penting: bila es batu mencapai sembilan atau lebih, gelas akan meluap dan meja kios banjir. Maka tanda < berdiri di sana sebagai penjaga — jumlah seluruhnya harus tetap di bawah 9. Penjaga kios menghitung stok tiap sore dengan aturan yang sama, supaya tiap gelas terisi pas dan tak ada yang tumpah.',
        },
        {
          objek: 'esBatuDiambil', judul: 'Satu Batu Dipindah Dulu',
          teks: 'Langkah pertama mengikuti kebiasaan setia: yang berdiri sendiri dipindah dulu. Es batu di nampan diambil dari hitungan, dan karena kedua sisi sama-sama dikurangi 1, kalimatnya tetap seimbang: 2x < 8. Batasnya berubah menjadi delapan — dua gelas berisi es batu bersama-sama harus kurang dari 8.',
        },
        {
          objek: 'papanXKurangEmpat', judul: 'Dua Gelas Dibagi Rata',
          teks: 'Kini kedua gelas dibagi rata: 8 dibagi 2 sama dengan 4, maka x < 4 — isi tiap gelas harus kurang dari 4 es batu. Uji cepat: bila x = 3, jumlahnya 2 x 3 + 1 sama dengan 7, masih kurang dari 9 — aman; bila x = 4, jumlahnya 9 — tepat di batas, dan itu dilarang oleh tanda <. Maka panah jawabannya menunjuk ke kiri dari 4.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Panahnya Tetap Setia!',
          teks: 'Pertidaksamaan dua langkah ternyata setia pada persamaan: kurangi dulu yang berdiri sendiri, bagi rata yang menempel, dan panah jawaban tetap mengikuti arah tandanya. 2x + 1 < 9 berakhir tenang di x < 4. Owalah, ternyata begini toh — bedanya cuma ujung panah, sisanya sama. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-040 · Tantangan Timbangan Hutan — balai timbangan malam ----- */
    'p2-040': {
      tema: 'balaiTimbangan',
      npc: { glif: '!', ucap: ['Lima misi', 'terakhir!'] },
      stasiun: [
        {
          objek: 'balaiLimaMisi', judul: 'Balai Timbangan Besar',
          teks: 'Di ujung penjuru persamaan berdiri balai besar hutan, dan di jantungnya menggantung timbangan emas raksasa yang berkilau malam itu. Papan balai menuliskan lima misi terakhir: selesaikan persamaan satu langkah, persamaan dua langkah, persamaan ber-x di dua sisi, lalu dua pertidaksamaan. Satu misi selesai, satu lentera balai menyala.',
        },
        {
          objek: 'misiPersamaanDua', judul: 'Misi Dua Persamaan',
          teks: 'Misi pertama dan kedua menyala bergantian: 4x = 12 diselesaikan dengan membagi dua sisi dengan 4, jadi x = 3; lalu 2x + 5 = 11 diselesaikan dua langkah — kurangi 5 menjadi 2x = 6, bagi 2, jadi x = 3 juga. Dua lentera pertama menyalakan sudut balai dengan hangat, dan timbangan emas bergoyang pelan merayakan.',
        },
        {
          objek: 'misiDuaSisi', judul: 'Misi x di Dua Sisi',
          teks: 'Misi ketiga paling menantang: 5x + 2 = 2x + 14. Semua x dikumpulkan ke kiri — cabang 2x dari kedua sisi, jadi 3x + 2 = 14; lalu semua angka ke kanan — cabang 2, jadi 3x = 12; bagi 3, dan x = 4. Periksa: kiri 5 x 4 + 2 sama dengan 22, kanan 2 x 4 + 14 juga 22 — seimbang sempurna, lentera ketiga menyala.',
        },
        {
          objek: 'misiPertidaksamaan', judul: 'Misi Dua Pertidaksamaan',
          teks: 'Dua misi terakhir memakai rahang: x + 2 > 6 dipindah 2-nya menjadi x > 4 — panah ke kanan dari 4; lalu 3x − 1 < 11 menjadi 3x < 12, dibagi 3 menjadi x < 4 — panah ke kiri dari 4. Lima lentera kini menyala penuh, dan timbangan emas balai berdenting pelan merayakan. Gerbang penjuru persamaan terbuka!',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Penjaga Timbangan Hutan!',
          teks: 'Persamaan maupun pertidaksamaan ternyata satu keluarga: sama-sama menjaga keseimbangan — yang satu dengan tanda sama dengan, yang satu dengan rahang dan panah. Kumpulkan x, singkirkan yang berdiri sendiri, bagi rata, dan selalu periksa ulang. Owalah, ternyata begini toh — timbangan hutan kini berbicara padamu. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-041 · Rasio: Perbandingan — dapur jus mangga senja ----- */
    'p2-041': {
      tema: 'dapurJus',
      npc: { glif: '2:3', ucap: ['Dua banding', 'tiga!'] },
      stasiun: [
        {
          objek: 'gelasManggaDua', judul: 'Dua Gelas Mangga, Tiga Gelas Air',
          teks: 'Senja turun di dapur hutan. Kakak Beruang menuang jus mangga andalannya: dua gelas penuh bubuk mangga, kemudian tiga gelas air matang. Di papan dapur ia menulis dua angka dipisah titik dua: 2 : 3. Yang penting bukan jumlah total gelasnya, melainkan pasangannya — setiap dua takaran mangga selalu berjumpa tiga takaran air. Tulisan pendek itulah yang disebut rasio: cara rapi membandingkan dua kelompok.',
        },
        {
          objek: 'papanDuaTiga', judul: 'Dibaca: Dua Banding Tiga',
          teks: 'Rasio 2 : 3 dibaca dua banding tiga. Angka pertama menceritakan kelompok mangga, angka kedua kelompok air, dan titik dua di tengah berfungsi seperti jembatan kecil yang menyatukan keduanya. Jika mangganya dua gelas, airnya tiga gelas; jika mangganya empat gelas, airnya enam gelas — pasangan itu tetap. Membaca rasio artinya membaca cerita dua kelompok dalam satu napas.',
        },
        {
          objek: 'jusKebalik', judul: 'Coba Tukar Urutannya!',
          teks: 'Malam itu adik ikut mencoba, tetapi ia menukar urutan: tiga gelas mangga untuk dua gelas air. Hasilnya? Jus ternyata pekat sekali, manisnya menusuk lidah! Padahal angkanya sama — dua dan tiga. Ternyata rasio menempel pada urutan ceritanya: 2 : 3 berarti mangga dulu, air belakangan; menukar posisinya berarti menukar jusnya. Angka yang sama dengan urutan yang berbeda adalah cerita yang berbeda.',
        },
        {
          objek: 'papanUrutanRasio', judul: 'Papan Resep Kakak Beruang',
          teks: 'Papan resep kakak beruang menutup pelajaran malam: rasio membandingkan dua kelompok sebagaimana urutan penyebutannya. 2 : 3 selalu berarti mangga dulu lalu air, dan takaran total boleh diperbesar — empat banding enam, enam banding sembilan — asal pasangannya tetap dipelihara. Siapa menjaga pasangan itu, jusnya selalu pas; siapa menukarnya, jusnya berubah wajah.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Rasio Itu Pasangan Angka!',
          teks: 'Rasio ternyata cuma pasangan angka yang berjalan bergandengan: 2 : 3 berarti dua takaran mangga untuk setiap tiga takaran air, dengan urutan yang menyertai cerita. Tukar urutan, berubahlah rasa; gandakan keduanya, rasa tetap setia. Owalah, ternyata begini toh — rasio cuma cara rapi menuliskan perbandingan. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-042 · Skala Peta — menara pandang siang ----- */
    'p2-042': {
      tema: 'menaraPeta',
      npc: { glif: '1000', ucap: ['Peta kecil,', 'dunia besar!'] },
      stasiun: [
        {
          objek: 'mejaPetaGulung', judul: 'Peta di Menara Pandang',
          teks: 'Siang cerah di menara pandang hutan. Penjaga menara membuka gulungan peta tua di meja bundar: hutan seakan mengerut menjadi selembar kertas, lengkap dengan jalan, sungai, dan menara ini sendiri yang kini sebesar kelingking. Di pojok peta tertulis dua angka kecil dengan titik dua: 1 : 1000. Angka malu-malu itu ternyata menyimpan rahasia terbesar peta.',
        },
        {
          objek: 'jengkalTunggal', judul: 'Satu Jengkal di Peta',
          teks: 'Penjaga menara menempelkan jengkal tangannya di peta. "Satu jengkal di sini," katanya, "mewakili seribu jengkal di jalan sungguhan." Itulah arti 1 : 1000 — satu banding seribu. Angka kiri menceritakan ukuran di peta, angka kanan ukuran di dunia nyata. Peta adalah dunia yang dipangkas rapi dengan gunting rasio.',
        },
        {
          objek: 'tigaJengkalJalan', judul: 'Tiga Jengkal Berlari Jauh',
          teks: 'Maka diujilah: jarak antara menara dan sungai di peta sepanjang tiga jengkal. Kalikan tiga dengan seribu, dan jalan sungguhannya menjadi tiga ribu jengkal — cukup untuk berjalan sore hari sampai kaki lelah. Tiga jengkal kecil di kertas menyimpan ribuan jengkal petualangan. Semakin besar angka kanannya, semakin luas dunia yang tersembunyi di kertas.',
        },
        {
          objek: 'papanSkalaSeribu', judul: 'Papan Kaki Menara',
          teks: 'Papan di kaki menara menuliskan aturan membaca skala: angka kiri untuk peta, angka kanan untuk jalan sebenarnya. 1 : 1000 dibaca satu banding seribu; kalau tertulis 1 : 500, satu jengkal peta hanya mewakili lima ratus jengkal jalan. Skala seperti kunci — ia memberi tahu berapa kali dunia dimampatkan agar muat di atas kertas.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Peta Kecil Dunia Besar!',
          teks: 'Skala peta ternyata cuma rasio yang setia: 1 : 1000 berarti satu jengkal di kertas menjaga seribu jengkal di jalan. Kalikan jarak di peta dengan angka kanan, dan dunia nyata langsung terbentang. Owalah, ternyata begini toh — peta kecil mampu menjawab jalan yang besar. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-043 · Harga Satuan — kios permen pagi ----- */
    'p2-043': {
      tema: 'kiosPermen',
      npc: { glif: '500', ucap: ['Satu permen', 'berapa?'] },
      stasiun: [
        {
          objek: 'kantongEnamPermen', judul: 'Kantong Enam Permen',
          teks: 'Pagi di pasar hutan. Kios pertama memajang kantong berisi enam permen warna-warni dengan nota tertulis tiga ribu. Pembeli kecil mengernyit: murah atau mahal, ya? Kantong besar memang tampak menggoda, tetapi kios di seberang juga berteriak menawarkan empat permen seharga dua ribu empat ratus. Mana yang sebenarnya lebih hemat?',
        },
        {
          objek: 'notaTigaRibu', judul: 'Nota Kios Pertama',
          teks: 'Rahasia membandingkan harga ada pada satu pertanyaan: berapa harga satu permen? Di kios pertama, tiga ribu dibagi enam permen sama dengan lima ratus — jadi satu permen lima ratus. Angka itulah harga satuan: harga untuk kepingan tunggal, diperoleh dengan membagi total dan banyaknya. Cara ini membuat semua kantong bisa berdiri di garis start yang sama.',
        },
        {
          objek: 'permenLimaRatus', judul: 'Satu Permen Lima Ratus',
          teks: 'Sekarang giliran kios seberang: dua ribu empat ratus dibagi empat sama dengan enam ratus. Satu permen di sana berharga enam ratus. Bandingkan dengan lima ratus di kios pertama — lima ratus lebih kecil, artinya lebih hemat. Uji balik pun cocok: lima ratus dikali enam sama dengan tiga ribu, persis nota kios pertama.',
        },
        {
          objek: 'papanDuaKios', judul: 'Papan Detektif Harga',
          teks: 'Papan detektif harga di dinding pasar menuliskan temuan hari ini: kantong kios kedua totalnya lebih kecil — dua ribu empat ratus memang lebih sedikit dari tiga ribu — tetapi per-permennya lebih mahal. Total kecil belum tentu paling hemat; harga satuanlah yang jujur. Detektif pasar selalu bertanya dulu: satu keping berapa?',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Harga Satuan Bongkar Rahasia!',
          teks: 'Harga satuan ternyata cuma soal membagi rata: total dibagi banyaknya, dan setiap kantong langsung berbicara jujur. Tiga ribu untuk enam permen berarti lima ratus per keping — dan perbandingan antar kios menjadi adil. Owalah, ternyata begini toh — harga satuan membongkar rahasia yang paling hemat. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-044 · Proporsi Tetap Setia — dapur kue ulang tahun malam ----- */
    'p2-044': {
      tema: 'dapurKue',
      npc: { glif: '4:6', ucap: ['Gandakan', 'semuanya!'] },
      stasiun: [
        {
          objek: 'kartuResepDuaTiga', judul: 'Resep untuk Empat Teman',
          teks: 'Malam di dapur hutan berbau manis. Beruang koki menyiapkan kue ulang tahun untuk empat teman: resepnya dua takar gula bertemu tiga takar tepung. Ia menulisnya di kartu resep: 2 : 3 — dua banding tiga. Kue kecil itu selalu jadi favorit, karena rasa manis-lembutnya terasa pas di lidah siapa pun yang datang.',
        },
        {
          objek: 'mangkokGandaEmpat', judul: 'Tamu Bertambah Dua Kali',
          teks: 'Besok pesta berdua kali lebih ramai — delapan teman akan datang. Beruang koki tersenyum dan menggandakan semua takaran sekaligus: gula dari dua menjadi empat takar, tepung dari tiga menjadi enam takar. Kartu resep baru menuliskan 4 : 6 — empat banding enam. Semua angka membesar bersama-sama, tak ada yang tertinggal di rumah.',
        },
        {
          objek: 'duaKueSamaRasa', judul: 'Dua Kue, Satu Rasa',
          teks: 'Dua kue pun jadi: kue kecil dari resep lama dan kue besar dari resep baru. Ditiup lilinnya dan dicicipi bergantian — rasanya sama persis! Ternyata 2 : 3 dan 4 : 6 adalah rasio kembar: kalikan silang, dua kali enam sama dengan tiga kali empat. Jumlahnya membesar, tetapi perbandingannya tetap setia pada rasa aslinya.',
        },
        {
          objek: 'papanProporsiSetia', judul: 'Papan Dapur Malam',
          teks: 'Papan dapur malam itu menuliskan nama ilmunya: proporsi — rasio yang tetap setia meski jumlahnya membesar atau mengecil. Boleh dikali dua, dikali tiga, dibagi dua; asal semua angka digerakkan bersama, perbandingannya tak akan lari ke mana-mana. Resep yang setia adalah proporsi yang hidup di dapur setiap hari.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Resepnya Setia Diperbesar!',
          teks: 'Proporsi ternyata rasio yang tak kenal lupa: diperbesar sekali pun, 2 : 3 tetap berjumpa 4 : 6 dengan rasa yang sama persis. Syaratnya cuma satu — semua takaran bergerak bersama. Owalah, ternyata begini toh — resep bisa membesar tanpa kehilangan dirinya. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-045 · Kecepatan & Waktu — lintasan lari siang ----- */
    'p2-045': {
      tema: 'lintasanLari',
      npc: { glif: '60', ucap: ['Tempo setia', 'tiap menit!'] },
      stasiun: [
        {
          objek: 'garisStartKelinci', judul: 'Garis Start Lomba',
          teks: 'Siang di padang lomba hutan. Garis start memanjang, dua pelari siap: kelinci yang terkenal cepat dan kancil sahabatnya. Juri katak meniup peluit sambil membawa papan catatan: kelinci melangkah enam puluh langkah setiap satu menit — tidak lebih, tidak kurang, tempo yang setia seperti detak jantung yang teratur.',
        },
        {
          objek: 'kelinciEnamPuluh', judul: 'Tempo Kelinci',
          teks: 'Menit pertama berlalu: enam puluh langkah tertulis di papan juri. Kelinci melangkah rapi dengan jarak yang sama tiap menit, seperti kereta yang tak pernah terlambat. Angka enam puluh itulah kecepatannya — rasio antara jarak yang dilalui dan waktu yang dipakai. Kecepatan selalu berjalan berdua dengan kata "tiap": enam puluh langkah tiap menit.',
        },
        {
          objek: 'duaMenitSeratus', judul: 'Dua Menit Berlalu',
          teks: 'Menit kedua berlalu, dan papan juri menuliskan seratus dua puluh; menit ketiga, seratus delapan puluh. Tempo enam puluh tiap menit dijahit berulang-ulang: satu menit enam puluh, dua menit seratus dua puluh, tiga menit seratus delapan puluh. Waktu makin panjang, jarak ikut memanjang dengan rasio yang tak bergeser sedikit pun.',
        },
        {
          objek: 'papanTempoJarak', judul: 'Papan Juri Lomba',
          teks: 'Papan juri menutup lomba dengan aturannya: kecepatan merangkai jarak dan waktu seperti benang dua sisi kain — tahu satu menitnya, kalikan waktu untuk mendapat jarak; tahu jaraknya, bagi kecepatan untuk mendapat waktu. Kelinci menang penuh sorakan, tetapi pemenang sebenarnya adalah rasio enam puluh banding satu yang setia di papan juri.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kecepatan Penjahit Rapi!',
          teks: 'Kecepatan ternyata rasio yang menjahit jarak dan waktu: enam puluh langkah tiap menit berarti dua menit seratus dua puluh, tiga menit seratus delapan puluh — cukup kalikan atau bagi, tempo tak pernah meleset. Owalah, ternyata begini toh — kecepatan cuma perbandingan yang disiplin. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-046 · Rasio Bertemu Persen — kios donat sore ----- */
    'p2-046': {
      tema: 'kotakDonat',
      npc: { glif: '75%', ucap: ['Tiga bahasa', 'satu rasa!'] },
      stasiun: [
        {
          objek: 'kotakDelapanDonat', judul: 'Kotak Delapan Donat',
          teks: 'Sore di kios donat hutan. Kotak karton dibuka: delapan donat menghuninya, enam berselimut cokelat dan dua bertabur stroberi. Pemilik kios berbisik kepada pembeli kecil, "Enam dari delapan adalah cokelat." Angka itu juga bisa ditulis 6 : 8 — enam banding delapan — rasio donat cokelat terhadap seluruh isi kotak yang manis.',
        },
        {
          objek: 'susunTigaDariEmpat', judul: 'Disederhanakan: 3 dari 4',
          teks: 'Pembeli kecil mencoba merapikan: enam dan delapan sama-sama bisa dibagi dua, sehingga 6 : 8 menyusut rapi menjadi 3 : 4 — tiga dari setiap empat donat. Tidak ada yang berubah, hanya tulisannya yang lebih ramping. Coba bayangkan empat donat berjajar: tiga di antaranya cokelat, satu stroberi. Persis seperti isi kotak besar tadi.',
        },
        {
          objek: 'papanTujuhLima', judul: 'Papan Kios: 75 Persen',
          teks: 'Kios donat punya papan harga khusus: pemiliknya menuliskan 75 persen cokelat. Dari mana angka itu? Dari 3 : 4 — kalikan keduanya sampai sisi kanannya menjadi seratus: tiga kali dua puluh lima sama dengan tujuh puluh lima, empat kali dua puluh lima sama dengan seratus. Kata "persen" memang berarti per seratus, dan 75 per 100 itulah jawabannya.',
        },
        {
          objek: 'papanTigaBahasa', judul: 'Tiga Kostum Satu Tokoh',
          teks: 'Maka malam itu pembeli kecil mengerti: rasio, pecahan, dan persen adalah tiga kostum untuk satu tokoh. 3 : 4 memakai kostum rasio, tiga per empat memakai kostum pecahan, dan 75% memakai kostum persen — tokohnya tetap satu: bagian cokelat dari keseluruhan donat. Memilih kostum yang mana pun, ceritanya tetap sama.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tiga Kostum Satu Makna!',
          teks: 'Rasio, pecahan, dan persen ternyata satu keluarga: 3 : 4, tiga per empat, dan 75% hanyalah tiga kostum untuk satu makna. Ubah kelipatannya sampai berbasis seratus, dan persen muncul dengan senyum. Owalah, ternyata begini toh — tiga bahasa, satu perbandingan. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-047 · Skala Miniatur — toko mainan sore ----- */
    'p2-047': {
      tema: 'tokoMiniatur',
      npc: { glif: '1:24', ucap: ['Kali 24,', 'jadi raksasa!'] },
      stasiun: [
        {
          objek: 'rakMobilMainan', judul: 'Rak Mobil Mainan',
          teks: 'Sore di toko mainan hutan. Rak paling atas memajang mobil merah ramping dengan label kecil: skala 1 : 24. Pemilik toko menepuk label itu sambil tersenyum, "Angka satu adalah mobil mainanmu; angka dua puluh empat adalah mobil sebenarnya di jalan raya. Setiap satu bagian di mainanmu, ada dua puluh empat bagian di aslinya."',
        },
        {
          objek: 'penggarisDuaPuluh', judul: 'Mengukur dengan Penggaris',
          teks: 'Penggaris pun keluar bermain. Panjang mobil mainan diukur dari kap mesin sampai bagasi: dua puluh sentimeter rapi. Angka kecil itu menjadi batu loncatan — sekarang tugas kita hanya mengalikannya dengan dua puluh empat, sesuai janji yang tertulis di skala. Penggaris dan skala bekerja berpasangan seperti dua sahabat karib.',
        },
        {
          objek: 'mobilJadiRaksasa', judul: 'Kali Dua Puluh Empat',
          teks: 'Dua puluh dikali dua puluh empat sama dengan empat ratus delapan puluh. Mobil sebenarnya panjangnya empat ratus delapan puluh sentimeter — hampir lima meter! Sebesar mobil keluarga yang parkir di depan rumah. Mainan sekecil telapak tangan ternyata menampung mobil raksasa di dalam skala kecilnya; cukup dikali, dunia langsung membesar.',
        },
        {
          objek: 'papanKaliDuaEmpat', judul: 'Papan Pemilik Toko',
          teks: 'Papan pemilik toko menuliskan jalan pulangnya: mobil asli dibagi dua puluh empat, kembali menjadi mainan; mainan dikali dua puluh empat, tumbuh menjadi asli. Skala 1 : 24 selalu berjalan dua arah. Itulah kekuatan rasio — ia bisa mengecilkan apa pun agar muat di rak, lalu membesarkannya lagi tanpa kehilangan bentuk aslinya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Mainan Menjadi Raksasa!',
          teks: 'Skala miniatur ternyata rasio dua arah: ukur mainanmu, kali dua puluh empat, dan mobil asli langsung berdiri; bagi kembali, mainannya kembali mungil. Dua puluh sentimeter menjadi empat ratus delapan puluh hanya dengan satu langkah kali. Owalah, ternyata begini toh — angka kecil bisa membesarkan dunia. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-048 · Berbalik Nilai — kerja bakti gali sumur pagi ----- */
    'p2-048': {
      tema: 'sumurDesa',
      npc: { glif: '24', ucap: ['Makin banyak,', 'makin cepat!'] },
      stasiun: [
        {
          objek: 'galianEmpatPekerja', judul: 'Empat Pekerja, Enam Hari',
          teks: 'Pagi di desa hutan, semua warga berkumpul di tanah kosong: sumur baru akan digali. Empat pekerja berangkat sejak pagi, dan kalender dinding menandai enam lingkaran yang dicoreti satu per satu sampai sumur jadi. Enam hari penuh untuk empat orang — catatan pertama ditulis di papan desa: empat pekerja, enam hari.',
        },
        {
          objek: 'galianDelapanPekerja', judul: 'Delapan Pekerja Datang',
          teks: 'Desa sebelah mendengar kabar dan mengirim bantuan: kini delapan pekerja bekerja bersama, dua kali lebih ramai dari sebelumnya. Kalender baru pun dicoret lebih cepat — tiga lingkaran saja, sumur selesai! Papan desa menuliskan catatan kedua: delapan pekerja, tiga hari. Sumurnya sama dalamnya; yang berubah hanya waktu tunggu.',
        },
        {
          objek: 'papanKaliSilang', judul: 'Rahasia Angka 24',
          teks: 'Kepala desa menyipitkan mata dan menemukan rahasia di balik dua catatan itu: empat kali enam sama dengan dua puluh empat, dan delapan kali tiga juga dua puluh empat. Total kerja tidak pernah berpindah — ia hanya berganti tangan. Jika enam pekerja yang datang, dua puluh empat dibagi enam sama dengan empat hari. Semua catatan berjumpa di angka yang sama.',
        },
        {
          objek: 'papanBerbalikNilai', judul: 'Papan Kepala Desa',
          teks: 'Papan kepala desa menuliskan namanya: perbandingan berbalik nilai — bila satu sisi naik, pasangannya turun dengan rapi, seperti jungkat-jungkit angka yang seimbang. Makin banyak pekerja, makin singkat hari; makin sedikit pekerja, makin panjang hari. Yang bekerja hanyalah total kerja yang setia: jumlah pekerja dikali hari, selalu dua puluh empat.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Angka 24 Tak Pernah Pindah!',
          teks: 'Berbalik nilai ternyata jungkat-jungkit angka: empat pekerja enam hari, delapan pekerja tiga hari, enam pekerja empat hari — pekerja dikali hari selalu dua puluh empat. Satu sisi naik, pasangannya turun, dan keseimbangan tak pernah runtuh. Owalah, ternyata begini toh — total kerja cuma pindah tangan, bukan berubah. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-049 · Resep & Takaran — warung kelontong malam ----- */
    'p2-049': {
      tema: 'dapurWarung',
      npc: { glif: '8', ucap: ['Semua ikut', 'digandakan!'] },
      stasiun: [
        {
          objek: 'bukuResepWarung', judul: 'Buku Resep Warung',
          teks: 'Malam di warung kelontong hutan. Buku resep terbuka di rak: kuah favorit untuk empat mangkuk butuh dua mangkok tepung, satu sendok garam, dan tiga gelas kaldu. Tulisannya berjejer rapi seperti barisan kecil yang saling berpegangan tangan. Malam ini warung terasa tenang — atau begitulah dugaan semua orang.',
        },
        {
          objek: 'delapanTamuDatang', judul: 'Delapan Tamu Mendadak!',
          teks: 'Tiba-tiba pintu terbuka lebar: rombongan musafir masuk, delapan mangkuk dipesan sekaligus! Pemilik warung hampir tersedak tehnya — pesanan menjadi dua kali lipat. Ia menarik napas panjang dan membuka buku resep lagi: kalau mangkuknya digandakan, takaran pun harus digandakan. Itulah undang-undang dapur yang tak pernah tertulis.',
        },
        {
          objek: 'semuaIkutGanda', judul: 'Semua Takaran Ikut Dobel',
          teks: 'Mangkok tepung dari dua menjadi empat, sendok garam dari satu menjadi dua, gelas kaldu dari tiga menjadi enam — semua bahan bergerak bersama tanpa kecuali. Kuah untuk delapan mangkuk pun siap dalam kedipan mata, dan rasanya persis seperti resep asli. Dobel mangkuk, dobel segalanya; itulah janji yang harus ditepati takaran.',
        },
        {
          objek: 'papanTakaranUtuh', judul: 'Papan Dapur: SEMUA IKUT',
          teks: 'Papan dapur warung menuliskan peringatan lucu dari kejadian lama: suatu malam garam hampir terlupa digandakan — kuahnya jadi hambar, dan tamu pun saling melirik bingung. Satu bahan yang tidak ikut bergerak bisa mengubah seluruh rasa. Maka tulisan besar terpampang: SEMUA IKUT — proporsi hanya setia bila semua takaran bergerak serempak.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Semuanya Ikut Bergoyang!',
          teks: 'Resep ganda ternyata cuma proporsi yang mengajak semua bahan menari: tamu dobel berarti tepung, garam, dan kaldu ikut dobel — dua menjadi empat, satu menjadi dua, tiga menjadi enam. Satu yang tertinggal, rasa berubah wajah. Owalah, ternyata begini toh — dapur adalah tempat proporsi paling lezat. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-050 · Tantangan Skala Hutan — gua peta karun malam ----- */
    'p2-050': {
      tema: 'petaKarun',
      npc: { glif: '5', ucap: ['Lima segel', 'menunggu!'] },
      stasiun: [
        {
          objek: 'petaKarunTerkunci', judul: 'Peta Karun Bermata Lima',
          teks: 'Malam di gua paling dalam hutan. Peta karun tua tergantung bercahaya redup, dengan lima segel bernomor menutupi lokasi harta. Penjaga gua menceritakan: hanya ahli rasio yang mampu membukanya — satu segel terbuka untuk satu jawaban tepat. Malam ini segel-segel itu mulai bergetar pelan, seakan menunggu pemiliknya datang.',
        },
        {
          objek: 'misiRasioSkala', judul: 'Segel Satu dan Dua',
          teks: 'Segel satu dan dua menyala bersamaan. Segel satu menanyakan rasio: 4 : 6 disederhanakan menjadi 2 : 3 — kedua angka dibagi dua, pasangannya tetap. Segel dua menanyakan skala: peta berskala 1 : 100 menunjukkan jarak lima sentimeter, maka jalan sebenarnya lima ratus sentimeter. Dua segel pun berguguran, dan peta makin terang menyala.',
        },
        {
          objek: 'misiHargaPersen', judul: 'Segel Tiga dan Empat',
          teks: 'Segel tiga dan empat ikut menyala. Segel tiga soal harga satuan: delapan buah seharga empat ribu berarti lima ratus sebuah — total dibagi banyaknya. Segel empat soal persen: tiga dari empat sama dengan tujuh puluh lima persen, karena tiga kali dua puluh lima sama dengan tujuh puluh lima. Peta kini bercahaya hampir penuh; tinggal satu segel gelap.',
        },
        {
          objek: 'misiBerbalikPeta', judul: 'Segel Lima: Peta Terbuka',
          teks: 'Segel terakhir menantang: enam pekerja menyelesaikan jembatan dalam empat hari; berapa hari untuk dua belas pekerja? Enam kali empat sama dengan dua puluh empat, maka dua puluh empat dibagi dua belas sama dengan dua hari. Segel kelima berguguran, dan seluruh peta menyala penuh — karun itu ternyata jurnal ahli hitung tua berisi rahasia resep dan skala hutan!',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Ahli Rasio Membaca Segala Peta!',
          teks: 'Lima segel ternyata cuma lima soal rasio berkostum: perbandingan, skala, harga satuan, persen, dan berbalik nilai — semua memakai jurus yang sama: jaga pasangannya, bagi ratanya, kalikan bersamanya. Owalah, ternyata begini toh — rasio adalah kunci yang membuka segala peta. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-051 · Mengenal Sudut — gerbang benteng fajar ----- */
    'p2-051': {
      tema: 'gerbangSiku',
      npc: { glif: '90', ucap: ['Bukaan pintu', 'ada ukurannya!'] },
      stasiun: [
        {
          objek: 'gerbangTerbukaSiku', judul: 'Gerbang yang Membuka Lebar',
          teks: 'Fajar menyingsing di gerbang benteng hutan. Penjaga mendorong daun pintu besar hingga membuka lebar, lalu menunjuk celahnya. "Lihat," katanya, "bukaan antara pintu dan tembok itu punya ukuran." Bukan panjangnya yang diukur, melainkan keterbukaannya — dari tempat kedua garis itu bertemu sampai ke kedua ujungnya. Bukaan itulah yang disebut sudut: ia selalu lahir dari dua garis yang berjumpa di satu titik.',
        },
        {
          objek: 'sikuKayuTukang', judul: 'Siku Kayu Sang Tukang',
          teks: 'Penjaga mengeluarkan siku kayu dari sakunya dan menempelkannya di pojok gerbang. Siku kayu itu membentuk bukaan yang pas — tidak sempit, tidak melar. "Bukaan seperti ini bernama sudut siku," katanya, "ukurannya sembilan puluh derajat. Namanya memang diambil dari siku lengan kita: bukaan yang pas saat kita menyapa teman." Tukang bangun membawa siku ke mana-mana, karena sudut siku adalah bukaan paling setia untuk pojok rumah.',
        },
        {
          objek: 'pembukaLancipTumpul', judul: 'Tiga Bukaan, Tiga Nama',
          teks: 'Gerbang itu pun dicoba dibuka dengan tiga cara. Dibuka sedikit saja, bukaannya sempit dan lancip — lebih kecil dari siku. Dibuka sampai siku kayu pas menempel, itulah sudut siku sembilan puluh derajat. Dibuka lebih lebar lagi, bukaannya menjadi tumpul — lebih besar dari siku. Lancip artinya kurus, siku artinya pas, tumpul artinya lebar. Tiga nama sederhana untuk tiga bukaan yang berbeda.',
        },
        {
          objek: 'papanJenisSudut', judul: 'Papan Penjaga Gerbang',
          teks: 'Papan kayu di sisi gerbang menuliskan pelajaran pagi itu: sudut adalah bukaan dua garis yang bertemu di satu titik; lancip lebih kecil dari sembilan puluh derajat, siku tepat sembilan puluh, tumpul lebih besar dari sembilan puluh. Penjaga tersenyum, "Sudut ada di mana-mana: buku yang terbuka, jendela, jemuran, bahkan belah ketupat si kakak." Siapa membiasakan diri melihat bukaan, sedetik pun langsung mengenali namanya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Bukaan Punya Nama dan Ukuran!',
          teks: 'Sudut ternyata cuma bukaan dua garis yang bertemu, dan bukaan itu punya tiga nama akrab: lancip yang sempit, siku yang pas sembilan puluh derajat, dan tumpul yang lebar. Owalah, ternyata begini toh — setiap pintu yang membuka sedang memperkenalkan sudut kepada kita. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-052 · Sudut Garis Lurus — jembatan siang ----- */
    'p2-052': {
      tema: 'jembatanRata',
      npc: { glif: '70', ucap: ['Selalu berdua', 'berjumlah 180!'] },
      stasiun: [
        {
          objek: 'dekJembatanLurus', judul: 'Dek Jembatan yang Lurus',
          teks: 'Siang di jembatan hutan. Deknya lurus memanjang dari ujung ke ujung, bagai garis yang ditarik tanpa melengkung. Penjaga jembatan mengusap dek itu dan berkata, "Garis lurus ini menyimpan angka ajaib: seratus delapan puluh derajat." Sebab garis lurus adalah separuh dari putaran penuh — dan separuh putaran penuh tepat berjumlah seratus delapan puluh derajat.',
        },
        {
          objek: 'duaSudutBerbagi', judul: 'Dua Sudut Berbagi Satu Garis',
          teks: 'Di tengah dek berdiri sebuah tiang, dan di sekelilingnya dua tanda sudut menghadap ke arah yang berlawanan. Penjaga menjelaskan, "Kedua sudut itu berbagi satu garis lurus: yang satu di kiri tiang, yang satu di kanan." Karena garisnya sendiri berjumlah seratus delapan puluh derajat, maka dua sudut yang berbagi garis itu pun selalu berjumlah seratus delapan puluh derajat. Mereka membagi rata warisan garisnya.',
        },
        {
          objek: 'sudutSeratusSepuluh', judul: 'Sudut 110 Menyala',
          teks: 'Petunjuk lalu lintas di jembatan itu menyala: sudut pertama terukur seratus sepuluh derajat. Berapa pasangannya? Tinggal dikurangkan: seratus delapan puluh dikurangi seratus sepuluh sama dengan tujuh puluh. Tanpa mengukur ulang pun jawabannya pasti: sudut kedua berjumlah tujuh puluh derajat. Mereka ibarat dua sahabat yang berbagi satu jajang — kalau yang satu ambil seratus sepuluh, sisanya untuk yang kembarannya.',
        },
        {
          objek: 'papanSelaluBerdua', judul: 'Papan Penengah Jembatan',
          teks: 'Papan penengah di ujung jembatan menuliskan temuan hari ini: dua sudut di garis lurus selalu berjumlah seratus delapan puluh — mereka tidak pernah berselisih, garis lurus menjadi penengahnya. Coba sudut lain: bila yang pertama empat puluh, pasangannya seratus empat puluh; bila yang pertama sembilan puluh, pasangannya juga sembilan puluh. Pasangan itu selalu berdua, dan jumlahnya tak pernah bergeser walau sedikit.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Garis Lurus Jadi Penengah!',
          teks: 'Dua sudut di garis lurus ternyata selalu berbagi seratus delapan puluh derajat: kenali yang satu, pasangannya langsung ketahuan tanpa perlu mengukur lagi. Owalah, ternyata begini toh — garis lurus adalah penengah paling jujur di hutan. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-053 · Sudut Bertemu di Titik — bukit kincir siang ----- */
    'p2-053': {
      tema: 'putaranKincir',
      npc: { glif: '360', ucap: ['Satu putaran', 'penuh 360!'] },
      stasiun: [
        {
          objek: 'kincirPenuh', judul: 'Kincir yang Berputar Penuh',
          teks: 'Siang cerah di bukit kincir. Empat bilah kincir berputar pelan, sekali lagi sekali, sampai kembali ke arah semula. Penjaga bukit bertepuk tangan, "Satu putaran penuh itu berjumlah tiga ratus enam puluh derajat!" Jadi bila sebuah garis berputar sampai kembali ke tempatnya berdiri, ia baru saja menempuh tiga ratus enam puluh derajat — angka si putaran penuh.',
        },
        {
          objek: 'empatSudutBertemu', judul: 'Empat Bilah di Poros',
          teks: 'Kincir berhenti, dan keempat bilahnya berhenti di poros yang sama. Di titik poros itu terbentuk empat sudut sekaligus, duduk berdampingan mengelilingi satu titik. Penjaga berkata, "Sudut-sudut yang berkumpul di satu titik selalu berjumlah tiga ratus enam puluh derajat — sama dengan satu putaran penuh." Sebab keempatnya bersama-sama mengisi seluruh ruang di sekeliling titik itu.',
        },
        {
          objek: 'sudutSisaKincir', judul: 'Sisa yang Menutup',
          teks: 'Kincir terhenti pada posisi yang aneh: sudut pertama seratus dua puluh, sudut kedua sembilan puluh, sudut ketiga sembilan puluh. Ketiganya berjumlah tiga ratus. Sisa ruang di poros tinggal enam puluh derajat — itulah ukuran sudut keempat, tanpa perlu diukur langsung. Semakin banyak sudut yang sudah diketahui, semakin kecil sisa yang harus dicari: kurangkan dari tiga ratus enam puluh, dan yang tertinggal itulah jawabannya.',
        },
        {
          objek: 'papanPutaranPenuh', judul: 'Papan Poros Bukit',
          teks: 'Papan di kaki bukit menuliskan pelajaran poros: semua sudut yang bertemu di satu titik berjumlah tiga ratus enam puluh derajat. Jarum jam pun demikian — dari angka dua belas kembali ke dua belas, ia melalui tiga ratus enam puluh derajat. Kincir berhenti di posisi mana pun, jumlah sudut di porosnya tetap tiga ratus enam puluh; yang berubah cuma pembagian di antara para sudut.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Satu Putaran Selalu 360!',
          teks: 'Sudut yang berkumpul di satu titik ternyata selalu mengisi satu putaran penuh: tiga ratus enam puluh derajat, tak lebih dan tak kurang. Kenali sebagian, sisanya langsung ketahuan. Owalah, ternyata begini toh — poros kincir menyimpan pelajaran yang sama dengan jarum jam. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-054 · Rahasia Segitiga — meja kertas malam ----- */
    'p2-054': {
      tema: 'mejaKertas',
      npc: { glif: '180', ucap: ['Robek lalu', 'buktikan!'] },
      stasiun: [
        {
          objek: 'segitigaKertasTiga', judul: 'Segitiga dari Kertas',
          teks: 'Malam di meja kerja hutan. Seorang penerang lampu memotong kertas menjadi segitiga, lalu menandai ketiga sudutnya dengan tiga warna: lima puluh, enam puluh, dan tujuh puluh derajat. Ia menggoyangkan segitiganya sambil bertanya, "Tebak: apa rahasia yang disimpan ketiga sudut ini?" Meja itu hening sejenak — lalu ia tersenyum, sebab jawabannya bisa dibuktikan dengan tangan sendiri.',
        },
        {
          objek: 'robekTigaSudut', judul: 'Robek Ketiga Sudutnya',
          teks: 'Lalu dilakukanlah eksperimen paling sering diulang di seluruh hutan: ketiga sudut segitiga kertas itu dirobek satu per satu. Robekan kecil berisi tiap sudut, lengkap dengan tandanya, terkatung-katung di atas meja. "Jangan takut merusak segitiganya," kata penerang lampu, "justru dengan merobeknya, rahasianya baru mau bicara." Segitiga itu pun menjadi tiga kepingan kecil yang siap dipanggil bersaksi.',
        },
        {
          objek: 'tempelJadiGaris', judul: 'Tempel Berjajar: Garis Lurus!',
          teks: 'Ketiga kepingan sudut ditempel berjajar di atas satu garis, sisi ke sisi. Dan terjadilah kejutan malam itu: ketiganya menyambung rapat membentuk garis lurus sempurna! Garis lurus berjumlah seratus delapan puluh derajat — maka lima puluh ditambah enam puluh ditambah tujuh puluh memang seratus delapan puluh. Segitiga ternyata menyembunyikan garis lurus di dalam perutnya, dan hanya robekan kecil yang sanggup membuktikannya.',
        },
        {
          objek: 'papanBuktiRobek', judul: 'Papan Bukti Malam',
          teks: 'Papan bukti di dinding meja menuliskan kesimpulan: jumlah ketiga sudut segitiga selalu seratus delapan puluh derajat, bagaimanapun bentuknya. Segitiga kurus, segitiga gemuk, segitiga hampir tegak — semua punya rahasia yang sama. Coba cek: empat puluh ditambah enam puluh ditambah delapan puluh, seratus delapan puluh; tiga puluh ditambah tujuh puluh ditambah delapan puluh, tetap seratus delapan puluh. Siapa pun boleh merobek kertasnya sendiri — jawabannya tak pernah berubah.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Segitiga Menyimpan Garis Lurus!',
          teks: 'Ketiga sudut segitiga ternyata selalu berjumlah seratus delapan puluh derajat — dan buktinya bisa dibuat malam ini juga: robek ketiga sudutnya, tempel berjajar, jadilah garis lurus. Owalah, ternyata begini toh — segitiga memang menyimpan garis lurus di perutnya. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-055 · Segiempat & Sudutnya — rumah jendela senja ----- */
    'p2-055': {
      tema: 'jendelaRumah',
      npc: { glif: '4x90', ucap: ['Dua segitiga', 'bersandar!'] },
      stasiun: [
        {
          objek: 'jendelaEmpatSiku', judul: 'Jendela Empat Sudut Siku',
          teks: 'Senja turun di rumah kayu hutan, dan jendelanya mulai menyala hangat. Jendela itu berbentuk persegi panjang dengan empat sudut yang semuanya siku. Empat sudut siku dikali sembilan puluh derajat, hasilnya tiga ratus enam puluh — tepat satu putaran penuh! Persoalannya lalu meloncat: apakah segiempat bentuk lain juga berjumlah tiga ratus enam puluh, atau hanya jendela yang patuh ini?',
        },
        {
          objek: 'duaSegitigaSahabat', judul: 'Dua Segitiga Bersandar',
          teks: 'Bapak kayu datang membawa jawaban yang manis. Ia menggambar diagonal pada jendela, sehingga segiempat terbelah menjadi dua segitiga yang bersandar satu sama lain. "Tahu sudah pelajaran kemarin: tiap segitiga berjumlah seratus delapan puluh derajat." Dua segitiga berarti dua kali seratus delapan puluh. Perhatikan pula: potongan diagonal itu membelah dua sudut jendela, sehingga saat disatukan kembali, tak ada sudut yang hilang.',
        },
        {
          objek: 'gabungSegiempat', judul: 'Dua Jadi Satu',
          teks: 'Seratus delapan puluh ditambah seratus delapan puluh sama dengan tiga ratus enam puluh — jawabannya sama dengan jendela yang empat sudutnya siku! Jadi segiempat apa pun, berapapun bentuknya, jumlah keempat sudutnya selalu tiga ratus enam puluh derajat. Coba cek bentuk paling miring sekalipun: tiga puluh ditambah seratus lima puluh, enam puluh ditambah seratus dua puluh — dua pasang, keduanya berjumpa di tiga ratus enam puluh.',
        },
        {
          objek: 'papanDuaKaliSeratus', judul: 'Papan Rumah Senja',
          teks: 'Papan di dinding rumah menuliskan pelajaran senja itu: jumlah sudut segiempat selalu tiga ratus enam puluh derajat, karena segiempat adalah dua segitiga yang bersandar — seratus delapan puluh kali dua. Rumah paling bengkok pun tetap patuh pada angka ini. Maka begitulah keluarga sudut: segitiga seratus delapan puluh, segiempat tiga ratus enam puluh — angkanya berlipat, kebiasaannya setia.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Dua Seratus Delapan Puluh Berjumpa Lagi!',
          teks: 'Jumlah sudut segiempat ternyata selalu tiga ratus enam puluh derajat — cukup lihat dia sebagai dua segitiga bersandar, dan dua seratus delapan puluh langsung berjumpa. Owalah, ternyata begini toh — jendela, pintu, dan papan tulis semuanya memakai rahasia yang sama. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-056 · Garis Sejajar Terpotong — rel kereta pagi ----- */
    'p2-056': {
      tema: 'relKereta',
      npc: { glif: '=Z', ucap: ['Sudut kembar', 'di rel!'] },
      stasiun: [
        {
          objek: 'relSejajarKereta', judul: 'Dua Rel yang Tak Pernah Bertemu',
          teks: 'Pagi di lintasan kereta hutan. Dua rel membentang lurus berdampingan: jarangnya sama, arahnya sama, dan keduanya tak pernah bertemu di ujung mana pun. Hubungan setia seperti itu punya nama: sejajar. Petugas rel berkata, "Rel boleh tak pernah bertemu, tetapi keduanya tetap saling meniru — dan pengikutnya justru sebuah garis miring yang akan datang sebentar lagi."',
        },
        {
          objek: 'garisMiringTerpotong', judul: 'Garis Miring Mengutip',
          teks: 'Lalu datanglah tiang sinyal yang miring, melintang memotong kedua rel sekaligus. Di setiap tempat ia berjumpa rel, terbentuklah sudut. Sekilas tampak empat sudut di rel atas dan empat sudut di rel bawah — banyak sekali! Namun petugas rel menyeringai, "Tenang, tidak ada satu pun sudut di sini yang perlu diukur dua kali. Garis miring ini cuma sekali mengutip, lalu menyalinnya ke rel sebelah."',
        },
        {
          objek: 'sudutZBerpasangan', judul: 'Sudut Kembar Pola Z',
          teks: 'Perhatikan polanya: satu sudut di rel atas dan satu sudut di rel bawah menempel pada garis miring yang sama, membentuk huruf Z. Sudut-sudut posisi Z itu selalu sama besar — sama sekali sama, bukan mirip. Pola huruf F pun demikian: sudut yang sejajar arahnya saling menyalin. Sebab kedua rel itu sejajar, sehingga kemiringan yang sama harus membentuk bukaan yang sama di kedua tempat.',
        },
        {
          objek: 'papanPolaSejajar', judul: 'Papan Petugas Rel',
          teks: 'Papan petugas di tepi lintasan menuliskan hukum pagi itu: bila dua garis sejajar dipotong sebuah garis miring, sudut-sudut yang berpasangan sama besar — pola Z sama, pola F sama, dan seisi rel pun rapi. Berapa pun kemiringan tiang sinyal, baik seratus sepuluh derajat maupun enam puluh, kedua rel tetap mendapat salinan yang sama persis. Sampai ujung lintasan, pola itu tak pernah lelah.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Sejajar Berarti Kembar!',
          teks: 'Garis sejajar yang dipotong garis miring ternyata memakai sudut kembar: pola Z sama besar, pola F sama besar, dan tak ada yang perlu diukur dua kali. Owalah, ternyata begini toh — rel kereta adalah papan tulis terpanjang untuk pelajaran sudut. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-057 · Teorema Pythagoras — lantai ubin siang ----- */
    'p2-057': {
      tema: 'lantaiUbin',
      npc: { glif: '25', ucap: ['Ubin miring', 'menyimpan rahasia!'] },
      stasiun: [
        {
          objek: 'segitigaUbinSiku', judul: 'Segitiga Siku di Lantai',
          teks: 'Siang di lantai ubin hutan yang putih bersih. Pengatur ubin menata ubin-ubin kecil menjadi sebuah segitiga siku-siku: sisi alas tiga kotak, sisi tegak empat kotak, dan sisi miring lima kotak. Lalu ia membawa tiga tali, masing-masing akan dipakai membentuk kotak di ketiga sisi segitiga itu. "Hari ini," katanya, "lantai ini akan membuktikan rahasia yang dipakai tukang bangun sejak kuno."',
        },
        {
          objek: 'kotakSembilanAlas', judul: 'Kotak Kecil Bersisi 3',
          teks: 'Tali pertama ditarik mengelilingi sisi alas, membentuk kotak bersisi tiga. Berapa ubin kecil yang muat di dalamnya? Tiga baris berisi tiga: tiga kali tiga sama dengan sembilan. Perhatikan: sisi segitiga diukur dengan kotak, dan luasnya pun dihitung dengan kotak — sisi tiga menghasilkan sembilan. Angka sembilan itulah yang kelak dipakai untuk membandingkan dengan dua kotak lainnya.',
        },
        {
          objek: 'kotakEnamBelasTinggi', judul: 'Kotak Bersisi 4',
          teks: 'Tali kedua mengelilingi sisi tegak, membentuk kotak bersisi empat. Empat baris berisi empat: empat kali empat sama dengan enam belas ubin kecil. Kini dua kotak sudah punya angka masing-masing: sembilan di alas, enam belas di tegak. Pengatur ubin berbisik, "Sekarang jumlahkan keduanya, lalu lihat apa yang terjadi pada kotak terbesar yang menempel di sisi miring."',
        },
        {
          objek: 'kotakDuaLimaMiring', judul: 'Kotak Besar Bersisi 5',
          teks: 'Tali ketiga membentuk kotak besar di sisi miring: lima kali lima sama dengan dua puluh lima. Dan kejutannya terbuka: sembilan ditambah enam belas sama dengan dua puluh lima — persis sama! Luas kotak di sisi miring selalu sama dengan jumlah luas dua kotak lainnya. Itulah teorema Pythagoras: kali-diri-lalu-jumlahkan pada dua sisi siku, dan sisi miring tak pernah memungkiri. Konon tukang bangun memakainya sejak zaman kuno, jauh sebelum ada alat ukur modern.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Ubin Miring Membuktikan Sendiri!',
          teks: 'Rahasia segitiga siku ternyata bisa dibaca di lantai: kotak sisi tiga berisi sembilan, kotak sisi empat berisi enam belas, dan keduanya berjumpa tepat di kotak sisi lima yang berisi dua puluh lima. Owalah, ternyata begini toh — kali-diri lalu jumlahkan, dan sisi miring selalu setia. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-058 · Segitiga Andalan 3-4-5 — bengkel meja siang ----- */
    'p2-058': {
      tema: 'bengkelMeja',
      npc: { glif: '3 4 5', ucap: ['Meja goyang?', 'pasang palang!'] },
      stasiun: [
        {
          objek: 'mejaGoyangEmpat', judul: 'Meja yang Goyang',
          teks: 'Siang di bengkel tukang kayu. Sebuah meja empat kaki di bawa masuk sambil goyang-goyang — ditempel sedikit saja ia berayun seperti perahu. Tukang kayu memeriksanya dan langsung menemukan biang keladinya: satu pojok meja tidak siku, bukaannya sedikit meleset dari sembilan puluh derajat. "Kaki sudah sama panjang," katanya, "tetapi sudutnya yang bohong. Untuk sudut, kami punya jurus andalan berupa tiga potongan palang."',
        },
        {
          objek: 'palangDiagonal', judul: 'Palang Diagonal 5 Jengkal',
          teks: 'Tukang kayu mengukur dua sisi pojok meja: tiga jengkal ke arah panjang, empat jengkal ke arah lebar. Lalu ia memotong satu palang selebat lima jengkal dan memaku palang itu secara diagonal, menjembatani ujung kedua sisi. Palang diagonal itu kini duduk di sisi miring sebuah segitiga siku — segitiga bersisi tiga, empat, lima, segitiga paling ternama di dunia tukang bangun.',
        },
        {
          objek: 'mejaKokohSiku', judul: 'Meja Berhenti Goyang',
          teks: 'Sesaat setelah palang dipaku, meja itu berhenti goyang — ditempak sedikit pun tak berayun! Sebab segitiga bersisi tiga, empat, lima selalu membentuk sudut siku yang sempurna: tiga kali tiga ditambah empat kali empat sama dengan sembilan ditambah enam belas, dan hasilnya dua puluh lima, persis lima kali lima. Palang kecil itu memaksa pojok meja kembali ke sembilan puluh derajat, dan meja pun kokoh seperti baru.',
        },
        {
          objek: 'papanTigaEmpatLima', judul: 'Papan Rahasia Tukang',
          teks: 'Papan di dinding bengkel menuliskan jurus yang diwariskan turun-temurun: pasangan tiga-empat-lima selalu membentuk sudut siku, karena sembilan ditambah enam belas sama dengan dua puluh lima. Perbesar dua kali menjadi enam-delapan-sepuluh, sudutnya tetap siku; konon tukang bangun sejak kuno memakai pasangan ajaib ini sebelum alat pengukur sudut ditemukan. Tiga potongan kayu murahan ternyata lebih jujur daripada mata paling tajam.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Palang Kecil Menyelamatkan Meja!',
          teks: 'Meja goyang ternyata cuma butuh segitiga andalan tiga-empat-lima: sembilan ditambah enam belas sama dengan dua puluh lima, sudut siku pun kembali, dan goyangan pun pamit. Owalah, ternyata begini toh — palang diagonal adalah matematika yang memaku dirinya sendiri. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-059 · Mencari Sisi yang Hilang — tangga dinding malam ----- */
    'p2-059': {
      tema: 'dindingTangga',
      npc: { glif: '6-8-10', ucap: ['Tangga, dinding,', 'tanah!'] },
      stasiun: [
        {
          objek: 'tanggaSandingDinding', judul: 'Tangga Sanding Dinding',
          teks: 'Malam di halaman menara. Sebuah tangga sepanjang sepuluh meter disandarkan ke dinding, dan di bawahnya terbentuk segitiga siku: tangga menjadi sisi miring, dinding menjadi sisi tegak, dan tanah menjadi sisi alas. Penjaga menara berkata, "Tangga ini punya tiga sahabat: panjang tangga, jarak kakinya dari dinding, dan tinggi puncaknya. Kalau dua di antaranya diketahui, yang ketiga tak mungkin bersembunyi."',
        },
        {
          objek: 'jarakEnamLangkah', judul: 'Kaki Tangga Enam Meter',
          teks: 'Petugas mengukur jarak kaki tangga dari dinding: enam meter. Itulah sisi alas segitiga. Kini dua data sudah di tangan — tangga sepuluh meter, alas enam meter — dan tinggi puncaknya tinggal menunggu untuk dipanggil. Caranya memakai jurus kemarin: kali-diri dulu setiap sisi yang diketahui. Sepuluh kali sepuluh sama dengan seratus, enam kali enam sama dengan tiga puluh enam.',
        },
        {
          objek: 'tinggiDelapanPuncak', judul: 'Puncak di Delapan Meter',
          teks: 'Sisi miring selalu paling besar, maka sisi tegak dicari dengan mengurangkan: seratus dikurangi tiga puluh enam sama dengan enam puluh empat. Angka enam puluh empat itu adalah kali-diri dari tinggi puncak — berapa yang bila dikali dirinya sendiri menghasilkan enam puluh empat? Delapan! Maka puncak tangga menempel di dinding tepat delapan meter dari tanah. Tangga, dinding, dan tanah membentuk segitiga enam-delapan-sepuluh yang saling menjaga.',
        },
        {
          objek: 'papanSisiHilang', judul: 'Papan Pencari yang Hilang',
          teks: 'Papan di dinding menara menuliskan jurus pencari yang hilang: kali-diri sisi yang diketahui, kurangkan yang lebih besar dari yang kecil, lalu temukan bilangan yang kali-dirinya menghasilkan sisa itu. Coba ditukar: bila kaki tangga dipindah menjauh menjadi delapan meter, tingginya justru turun menjadi enam — seratus dikurangi enam puluh empat sama dengan tiga puluh enam. Tangga yang makin jauh dari dinding memang makin rendah panjatnya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tangga Menemukan Tingginya!',
          teks: 'Sisi yang hilang ternyata tak pernah benar-benar hilang: kali-diri yang diketahui, kurangkan, lalu panggil bilangan yang kali-dirinya cocok — seratus dikurangi tiga puluh enam sama dengan enam puluh empat, dan delapan pun muncul. Owalah, ternyata begini toh — tangga, dinding, dan tanah memang trio yang tak bisa bersembunyi satu sama lain. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-060 · Tantangan Sudut Hutan — balai geometri malam ----- */
    'p2-060': {
      tema: 'balaiGeometri',
      npc: { glif: '45', ucap: ['Lima misi', 'menantimu!'] },
      stasiun: [
        {
          objek: 'arenaMisiGeometri', judul: 'Balai Lima Misi Geometri',
          teks: 'Malam di balai geometri, aula paling dalam hutan simbol. Lima lentera besar menyala di dinding, dan tiap lentera menjaga satu misi sudut. Penjaga balai — bola-lentera tanpa wajah yang berdiri tenang — menyapa tanpa suara, sebab balai ini hanya menerima pembaca yang cermat. Papan di tengah menuliskan: selesaikan kelima misi, dan penjuru geometri akan menyimpan namamu di jantung hutan.',
        },
        {
          objek: 'misiBukaanSudut', judul: 'Misi Satu dan Dua',
          teks: 'Misi satu membuka pintu balai: bukaan pintu itu harus dikenali — sembilan puluh derajat, maka pintu terbuka dengan sudut siku yang sempurna. Misi dua menantang di garis lurus: satu sudut berukuran seratus lima, berapa pasangannya? Seratus delapan puluh dikurangi seratus lima sama dengan tujuh puluh lima. Dua lentera pertama pun melemas cahayanya, seolah mengangguk puas.',
        },
        {
          objek: 'misiSegitigaPutaran', judul: 'Misi Tiga dan Empat',
          teks: 'Misi tiga memotong kertas segitiga: dua sudutnya empat puluh dan enam puluh, berapa sudut ketiga? Seratus delapan puluh dikurangi seratus, tinggal delapan puluh. Misi empat menghentikan kincir balai di posisi ganjil: tiga sudut porosnya seratus dua puluh, seratus lima puluh, dan empat puluh — sisa porosnya lima puluh, sebab tiga ratus enam puluh dikurangi tiga ratus sepuluh sama dengan lima puluh. Dua lentera lagi menyala penuh.',
        },
        {
          objek: 'misiPythagorasHutan', judul: 'Misi Lima: Segitiga Andalan',
          teks: 'Lentera terakhir menjaga misi paling dijaga di balai ini: sebuah segitiga siku dengan kaki enam dan tinggi delapan — berapa sisinya miring? Kali-diri keduanya: tiga puluh enam ditambah enam puluh empat sama dengan seratus. Bilangan apa yang kali-dirinya seratus? Sepuluh! Lentera kelima menyala, seluruh balai bermandikan cahaya emas, dan lima misi geometri pun selesai dalam satu malam yang sama.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Detektif Sudut Hutan!',
          teks: 'Lima misi ternyata memakai lima jurus yang sudah akrab: kenali bukaannya, kurangkan dari seratus delapan puluh di garis lurus, kurangkan dari tiga ratus enam puluh di titik, jumlahkan sudut segitiga, dan kali-diri untuk sisi miring. Owalah, ternyata begini toh — penjuru geometri adalah rumah bagi detektif yang cermat. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-061 · Kubus: Sisi & Isi — siang bengkel kado, enam kartu persegi ----- */
    'p2-061': {
      tema: 'mejaKado',
      npc: { glif: '54', ucap: ['Enam kartu,', 'lengkap semua!'] },
      stasiun: [
        {
          objek: 'kotakKadoKubus', judul: 'Kotak Kado Bersegi Sama',
          teks: 'Meja kado di bengkel hutan menyediakan kotak kado berbentuk kubus dengan sisi tiga senti. Kubus adalah kotak istimewa: keenam sisinya persegi dan sama besar, seperti dadu mainan. Coba lihat dari depan, dari atas, lalu dari samping — semuanya tampilan persegi yang kembar. Inilah rahasia pertama kubus: satu bentuk, enam wajah yang seragam.',
        },
        {
          objek: 'kartuPersegiEnam', judul: 'Enam Kartu Membungkus Sempurna',
          teks: 'Tukang kado menyiapkan enam kartu persegi, tiap kartu berukuran tiga senti kali tiga senti. Satu kartu menutup satu sisi: luasnya tiga kali tiga sama dengan sembilan sentimeter persegi. Enam kartu itu ditempel satu per satu — depan, belakang, kiri, kanan, atas, bawah — dan kotak tertutup rapat tanpa sisa kertas. Jadi luas permukaan kubus enam kali sembilan sama dengan lima puluh empat. Angka lima puluh empat itu jawaban dari enam wajah kubus.',
        },
        {
          objek: 'kubusSusunIsi', judul: 'Isi Ruang yang Tersembunyi',
          teks: 'Kalau kulitnya sudah jelas, sekarang isi ruangnya. Bayangkan kubus kecil bersisi satu senti, lalu susun di dalam kotak: satu lantai muat tiga kali tiga sama dengan sembilan kubus kecil, dan ada tiga lantai dari bawah ke atas. Sembilan dikali tiga sama dengan dua puluh tujuh kubus kecil mengisi penuh. Itulah volume kotak kado: dua puluh tujuh sentimeter kubik. Kulit dihitung dari luar; isi dihitung dari lapisan di dalam.',
        },
        {
          objek: 'papanKubusJurus', judul: 'Jurus Kubus di Papan Bengkel',
          teks: 'Papan bengkel menuliskan dua jurus kubus sekali baca: luas permukaan enam kali sisi kali sisi, dan volume sisi kali sisi kali sisi. Uji sekali lagi dengan sisi tiga: enam kali sembilan sama dengan lima puluh empat, dan tiga kali tiga kali tiga sama dengan dua puluh tujuh. Dua jawaban tadi kembali persis. Jurus yang benar selalu membawa kita ke tempat yang sama, seberapa sering pun diuji.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kubus Terbuka Semua Sisinya!',
          teks: 'Kubus ternyata cuma punya dua pertanyaan: berapa kulitnya dan berapa isinya. Kulit dijawab enam kartu persegi, isi dijawab tumpukan kubus kecil. Owalah, ternyata begini toh — bentuk paling rapi di dunia juga paling gampang dihitung. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-062 · Balok & Permukaannya — pagi lantai bengkel, kardus jadi jaring ----- */
    'p2-062': {
      tema: 'lantaiJaring',
      npc: { glif: '88', ucap: ['Tiga pasang', 'kembar!'] },
      stasiun: [
        {
          objek: 'kardusBalokUtuh', judul: 'Kardus Pipih di Lantai Bengkel',
          teks: 'Pagi di lantai bengkel hutan, sebuah kardus balok bersandar tenang. Panjangnya enam senti, lebarnya empat, tingginya dua. Balok itu seperti kubus yang diulur: sisinya persegi panjang, bukan persegi lagi. Keenam sisinya tersusun rapi menjadi tiga pasang: depan dan belakang, atas dan bawah, kiri dan kanan — tiga kembaran yang menunggu dihitung.',
        },
        {
          objek: 'jaringBalokRata', judul: 'Kardus Dibongkar Jadi Jaring',
          teks: 'Kardusnya direkat lalu dibongkar perlahan sampai terbentang pipih di lantai — jaring balok! Sekarang semua sisi terlihat sekaligus tanpa perlu memutar-mutar kotak. Hitung bersama: dua persegi panjang besar berukuran enam kali empat, dua sedang berukuran enam kali dua, dan dua kecil berukuran empat kali dua. Tidak ada sisi yang sembunyi; jaring membongkar semua rahasia sekaligus.',
        },
        {
          objek: 'pasangKembarTiga', judul: 'Tiga Pasang, Tiga Jawaban',
          teks: 'Tiap pasang dihitung satu per satu. Pasang depan-belakang: dua kali enam kali empat sama dengan empat puluh delapan. Pasang atas-bawah: dua kali enam kali dua sama dengan dua puluh empat. Pasang kiri-kanan: dua kali empat kali dua sama dengan enam belas. Jumlahkan semuanya: empat puluh delapan tambah dua puluh empat tambah enam belas sama dengan delapan puluh delapan sentimeter persegi. Itulah luas permukaan kardus kita.',
        },
        {
          objek: 'papanJumlahEnamSisi', judul: 'Jurus Tiga Kali Lalu Jumlahkan',
          teks: 'Papan di dinding menuliskan jurus balok: kalikan luas tiap macam sisi dengan dua, lalu jumlahkan ketiganya. Uji ulang: empat puluh delapan, dua puluh empat, dan enam belas berjalan pulang ke delapan puluh delapan. Kardus mana pun ukurannya diubah, jurus ini tetap jalan: tiga perkalian, satu penjumlahan. Tidak perlu menghitung enam sisi satu-satu lagi.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Jaring Membongkar Semua Sisi!',
          teks: 'Balok ternyata hanya kubus yang terulur, dan jaringnya membuktikan keenam sisinya tak pernah sembunyi. Tiga pasang kembar, tiga perkalian, satu penjumlahan. Owalah, ternyata begini toh — membongkar kardus pun bisa jadi ilmu luas permukaan. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-063 · Volume Balok — sore dapur, laci kotak susu dua lapis ----- */
    'p2-063': {
      tema: 'dapurSusun',
      npc: { glif: '48', ucap: ['Susun lapis', 'demi lapis!'] },
      stasiun: [
        {
          objek: 'laciKosongEnamEmpat', judul: 'Laci Kosong yang Menunggu',
          teks: 'Sore di dapur hutan, sebuah laci kotak susu menunggu diisi. Laci itu berukuran enam kotak memanjang dan empat kotak melebar — seperti papan catur yang lonjong. Pertanyaannya sederhana: berapa kotak susu kecil yang bisa muat mengisi laci sampai penuh sampai ke atas? Jawabannya tidak ditebak; jawabannya disusun satu per satu sampai laci berkata penuh.',
        },
        {
          objek: 'kubusSusuSusun', judul: 'Lantai Pertama: Dua Puluh Empat',
          teks: 'Kotak susu kecil disusun berjajar di lantai laci: enam kotak ke kanan, empat baris ke belakang. Enam kali empat sama dengan dua puluh empat — lantai pertama penuh rapi tanpa celah. Satu lapis demi satu lapis adalah cara paling jujur menghitung isi: tidak ada kotak yang menggantung di udara, semua bersandar pada tumpukan di bawahnya.',
        },
        {
          objek: 'susunDuaLapis', judul: 'Lapis Kedua: Empat Puluh Delapan',
          teks: 'Lantai kedua disusun lagi dua puluh empat kotak di atas lantai pertama, dan tinggi laci memang tepat untuk dua lapis. Dua puluh empat tambah dua puluh empat sama dengan empat puluh delapan kotak susu mengisi penuh. Hitung pintasnya: enam kali empat kali dua sama dengan empat puluh delapan. Panjang kali lebar kali tinggi — tiga ukuran, satu jawaban.',
        },
        {
          objek: 'papanPanjangLebarTinggi', judul: 'Jurus Panjang-Lebar-Tinggi di Dinding',
          teks: 'Papan dapur menuliskan jurus volume balok: panjang kali lebar kali tinggi. Laci tadi membuktikannya: enam kali empat kali dua sama dengan empat puluh delapan. Coba bayangkan laci serupa yang tingginya tiga lapis — jawabannya bergeser jadi tujuh puluh dua, cukup tambah satu kali dua puluh empat lagi. Makin tinggi laci, makin banyak lapisan, makin besar isinya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Isi Laci Terhitung Sampai Atas!',
          teks: 'Volume balok ternyata cuma soal menyusun: satu lantai dihitung dulu, lalu dikalikan banyak lapisnya. Owalah, ternyata begini toh — panjang kali lebar kali tinggi adalah cerita tentang tumpukan yang rapi. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-064 · Prisma Segitiga — senja kaki bukit, atap rumah kartu diseret ----- */
    'p2-064': {
      tema: 'atapPrisma',
      npc: { glif: '120', ucap: ['Atap rumah', 'punya isi!'] },
      stasiun: [
        {
          objek: 'rumahAtapPrisma', judul: 'Atap Rumah di Kaki Bukit',
          teks: 'Senja menyapa rumah mainan di kaki bukit hutan, dan atapnya berbentuk prisma segitiga: penampangnya segitiga, badannya memanjang seperti roti lapis. Prisma itu gampang dikenali — bayangkan satu kartu segitiga yang diseret lurus sejauh panjang atap. Jejak seretan itulah yang mengisi seluruh ruang di bawah genteng.',
        },
        {
          objek: 'kartuSegitigaAlas', judul: 'Luas Kartu Segitiga: Dua Belas',
          teks: 'Kartu segitiga di penampang atap punya alas enam senti dan tinggi segitiga empat senti. Rumus luas segitiga adalah alas kali tinggi dibagi dua: enam kali empat sama dengan dua puluh empat, lalu dibagi dua jadi dua belas sentimeter persegi. Kenapa dibagi dua? Sebuah persegi enam kali empat pasti bisa dipotong jadi dua segitiga kembar — kartu kita adalah separuhnya.',
        },
        {
          objek: 'geserSegitigaAtap', judul: 'Diseret Sepuluh Kali: Seratus Dua Puluh',
          teks: 'Sekarang kartu segitiga itu diseret sepanjang atap dari ujung depan sampai ujung belakang, sejauh sepuluh senti. Setiap geseran satu senti menyapu luas dua belas sentimeter persegi, dan geseran itu terjadi sepuluh kali: dua belas kali sepuluh sama dengan seratus dua puluh. Itulah volume atap prisma — seratus dua puluh sentimeter kubik isi ruang genteng.',
        },
        {
          objek: 'papanLuasKaliPanjang', judul: 'Jurus Prisma di Papan Senja',
          teks: 'Papan di teras menuliskan jurus prisma: volume sama dengan luas alas dikali tinggi prisma — atau panjang seretannya. Uji lagi: dua belas kali sepuluh sama dengan seratus dua puluh, cocok persis dengan hitungan seretan tadi. Prisma apa pun — penampang segitiga, segilima, bahkan berbentuk hati — semuanya dihitung dengan cara yang sama: luas kartunya, kali jarak seretnya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Atap Ternyata Roti Lapis Angka!',
          teks: 'Prisma segitiga ternyata cuma kartu segitiga yang diseret: hitung luas kartunya, kalikan panjang seretan. Owalah, ternyata begini toh — atap rumah menyimpan pelajaran volume yang bisa diseret dengan tangan. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-065 · Tabung: Si Kaleng — siang kantin, label kaleng terbentang ----- */
    'p2-065': {
      tema: 'rakKaleng',
      npc: { glif: '44', ucap: ['Benangnya', 'melingkar!'] },
      stasiun: [
        {
          objek: 'kalengSusuRak', judul: 'Rak Kaleng di Kantin Hutan',
          teks: 'Siang di kantin hutan, rak berisi kaleng susu berkilauan. Kaleng punya bentuk yang namanya tabung: dua tutup berbentuk lingkaran, dan badan yang melengkung mulus. Berbeda dengan kubus dan balok yang bertumpu pada persegi, tabung bertumpu pada lingkaran. Jadi untuk mengukurnya kita perlu jurus bundar yang baru: keliling lingkaran.',
        },
        {
          objek: 'duaTutupBundar', judul: 'Dua Tutup, Satu Ukuran',
          teks: 'Tutup kaleng dicungkil pelan-pelan, dan ternyata berpasangan: satu di atas, satu di bawah, sama bundar sama besar. Jejari tiap tutup tujuh senti. Maka tabung itu bisa dibayangkan sebagai dua piring bundar yang dijajarkan oleh badan melengkung di tengah. Dua tutup itulah atap dan dasar kaleng — wajah atas dan wajah bawah si tabung.',
        },
        {
          objek: 'benangKelilingEmpat', judul: 'Benang Keliling: Empat Puluh Empat',
          teks: 'Seutas benang dililit sekali mengikuti lingkar kaleng, lalu diregangkan di atas penggaris: empat puluh empat senti. Cocok dengan hitungan keliling lingkaran — dua kali dua puluh dua per tujuh kali tujuh sama dengan empat puluh empat. Benang itu alat, hitungan itu alat juga; keduanya saling menjaga supaya tidak ada yang salah ukur.',
        },
        {
          objek: 'labelTerbentang', judul: 'Label Dikupas: Persegi Panjang!',
          teks: 'Ini momen paling mengejutkan di kantin: label kaleng dikupas pelan dari sambungannya, lalu... terbentang! Bentuknya persegi panjang, bukan bulat. Lebar kertas label sama dengan keliling kaleng, empat puluh empat senti; tingginya sama dengan tinggi kaleng. Selimut tabung ternyata cuma persegi panjang yang dipeluk melingkar sampai ujungnya bertemu lagi.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tabung Ternyata Kaleng Berlabel!',
          teks: 'Tabung ternyata cuma dua lingkaran plus satu kertas yang dipeluk bundar. Kupas labelnya, dan rahasianya terbentang rata di lantai. Owalah, ternyata begini toh — si kaleng di dapur menyimpan pelajaran geometri yang bundar. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-066 · Luas Selimut Tabung — malam bengkel, kertas digulung jadi tabung ----- */
    'p2-066': {
      tema: 'bengkelGulung',
      npc: { glif: '440', ucap: ['Gulung dan', 'ukur!'] },
      stasiun: [
        {
          objek: 'kertasGulungSelimut', judul: 'Kertas yang Mengaku Tabung',
          teks: 'Malam di bengkel hutan, selembar kertas persegi panjang tergulung menjadi tabung tanpa tutup. Melepas gulungan, kertasnya kembali rata; menggulung lagi, ia jadi tabung lagi. Bentuk bundar dan bentuk rata ternyata cuma dua rupa untuk kertas yang sama. Malam ini kita belajar menghitung luas kertas itu: luas selimut tabung.',
        },
        {
          objek: 'gulungDiBotol', judul: 'Gulungan Menempel di Botol',
          teks: 'Gulungan kertas dipasangkan pada botol besar yang tingginya sepuluh senti, dan kertasnya melingkar pas memeluk badan botol. Lebar kertas yang melingkar itu harus sama dengan keliling botol — kalau kurang, ada celah; kalau lebih, ada lipatan. Di bengkel ini kertasnya dipotong pas: lebarnya empat puluh empat senti, sama seperti keliling kaleng susu di kantin kemarin.',
        },
        {
          objek: 'papanKelilingTinggi', judul: 'Lebar Kali Tinggi Kertas',
          teks: 'Kertas dibentangkan di meja bengkel dan diukur dua arah: lebarnya mengikuti keliling lingkaran, empat puluh empat senti; tingginya mengikuti tinggi tabung, sepuluh senti. Maka luas selimut sama persis dengan luas persegi panjang itu: lebar kali tinggi. Tak ada rumus baru yang rumit — hanya perkalian persegi panjang yang sudah lama kita kenal.',
        },
        {
          objek: 'hitungSelimutEmpat', judul: 'Empat Ratus Empat Puluh',
          teks: 'Saatnya menghitung: empat puluh empat kali sepuluh sama dengan empat ratus empat puluh sentimeter persegi. Itulah luas selimut tabung kita. Boleh dicek dengan cara tukang bengkel: alasi tabung di atas kertas berpetak lalu hitung petaknya satu per satu — hasilnya akan berkumpul di angka yang sama. Hitungan dan petakan berjabat tangan.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Selimut Tabung Terbentang Rata!',
          teks: 'Luas selimut ternyata cuma luas kertasnya: keliling lingkaran dikali tinggi tabung. Owalah, ternyata begini toh — rumus bundar yang paling ramai itu diam-diam persegi panjang yang dipeluk bundar. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-067 · Kenalan Kerucut & Bola — pagi bukit pasir, tiga tuangan jadi satu ----- */
    'p2-067': {
      tema: 'bukitPasir',
      npc: { glif: 'x3', ucap: ['Tiga cangkir', 'sama satu!'] },
      stasiun: [
        {
          objek: 'topiKerucutPasir', judul: 'Topi Ulang Tahun Berisi Pasir',
          teks: 'Pagi di bukit pasir hutan, sebuah topi ulang tahun berbentuk kerucut berdiri di atas pasir halus. Kerucut punya alas bundar dan puncak runcing — seperti es krim cone yang berdiri sopan. Kalau kerucut ini diisi pasir sampai penuh, berapa banyak pasir yang tertampung? Bukit pasir ini punya cara paling jujur untuk menjawab: menuang dan menghitung.',
        },
        {
          objek: 'tabungPasirSama', judul: 'Teman Seukuran: Si Tabung',
          teks: 'Di samping topi berdiri tabung pasir bersisi tebal, dan ukurannya sengaja dijodohkan: alasnya sama bundar sama besar dengan alas topi, tingginya juga sama persis. Dua wadah ini seperti saudara yang lahir dari lingkaran yang sama — bedanya cuma satu punya puncak runcing, satunya beratap datar. Sekarang, siapa yang lebih banyak menampung pasir?',
        },
        {
          objek: 'tuangTigaCangkir', judul: 'Satu, Dua, Tiga — Penuh Pas!',
          teks: 'Topi kerucut dicelup penuh ke pasir, lalu isinya dituang hati-hati ke tabung. Tuang pertama: tabung baru sepertiga penuh. Tuang kedua: tinggal sepertiga lagi yang kosong. Tuang ketiga: tabung pas penuh sampai bibirnya! Tiga cangkir kerucut sama dengan satu tabung — jadi volume kerucut sepertiga volume tabung yang seukuran. Ini bisa diulang siapa pun di taman pasir, dan hasilnya selalu tiga.',
        },
        {
          objek: 'bolaSepakTaman', judul: 'Bola Sepak Juga Punya Isi',
          teks: 'Di tepi bukit, bola sepak bersandar sambil menunggu giliran. Bola juga punya volume — isi ruang di balik kulitnya yang bundar sempurna. Untuk kenalan hari ini cukup satu hal: bola dihitung mulai dari jari-jarinya, dan rumus lengkapnya menunggu di petualangan yang lebih tinggi. Yang penting hari ini: kerucut sepertiga tabung, dan bola menunggu giliran dengan sabar.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tiga Tuangan Sama Satu Tabung!',
          teks: 'Kerucut dan tabung ternyata saudara: sama alas, sama tinggi, beda tiga kali isi. Owalah, ternyata begini toh — bukit pasir adalah laboratorium yang bisa dikunjungi kapan saja, gratis setiap hari. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-068 · Liter & Sentimeter Kubik — siang meja ukur, kubus bening sepuluh senti ----- */
    'p2-068': {
      tema: 'mejaLiter',
      npc: { glif: '1L', ucap: ['Seribu kubus', 'satu liter!'] },
      stasiun: [
        {
          objek: 'kubusSepuluhSepuluh', judul: 'Kubus Bening Sepuluh Senti',
          teks: 'Di meja ukur air berdiri kubus bening bersisi sepuluh senti. Kalau diisi kubus kecil bersisi satu senti, satu lantainya memuat sepuluh kali sepuluh sama dengan seratus kubus, dan ada sepuluh lantai dari dasar sampai tutup. Seratus kali sepuluh sama dengan seribu kubus kecil. Angka seribu itu bukan kebetulan — ia gerbang menuju liter.',
        },
        {
          objek: 'botolLiterSatu', judul: 'Kubus Itu Menampung Satu Liter',
          teks: 'Kubus bening itu lalu diisi air dari botol besar, dan airnya berhenti tepat di bibir kubus saat satu liter habis dituang. Maka dunia sepakat menulis: satu liter sama dengan seribu sentimeter kubik. Setiap kubus kecil bersisi satu senti itu menampung satu mililiter — seribu titik kecil berkumpul jadi satu liter penuh.',
        },
        {
          objek: 'gelasBagiEmpat', judul: 'Empat Gelas Satu Liter',
          teks: 'Liter bisa dipecah menjadi gelas-gelas: gelas ukur di meja ini menampung dua ratus lima puluh mililiter. Empat kali dua ratus lima puluh sama dengan seribu mililiter — empat gelas penuh berjabatan dengan satu liter. Maka minum delapan gelas air sehari sama dengan dua liter — hitungan yang gampang diingat sekaligus baik untuk tubuh.',
        },
        {
          objek: 'papanLiterKubik', judul: 'Papan Satuan yang Bersaudara',
          teks: 'Papan di meja menuliskan keluarga satuan isi: seribu sentimeter kubik sama dengan seribu mililiter sama dengan satu liter; dan satu mililiter sama dengan satu sentimeter kubik. Uji dengan botol air minum: tulisan enam ratus mililiter sama artinya enam ratus sentimeter kubik — sedikit lebih dari separuh kubus bening tadi. Satuan isi ternyata satu keluarga besar yang bersahabat.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kubus dan Liter Ternyata Saudara!',
          teks: 'Satu liter ternyata cuma kubus sepuluh senti yang diisi air penuh; seribu kubus kecil seribu mililiter. Owalah, ternyata begini toh — satuan isi berjabat tangan dalam satu keluarga yang rukun. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-069 · Mengukur Isi Benda Nyata — senja toko ikan, akuarium-ember-botol ----- */
    'p2-069': {
      tema: 'tokoAkuarium',
      npc: { glif: '60L', ucap: ['Ukur dulu,', 'hitung kemudian!'] },
      stasiun: [
        {
          objek: 'akuariumTokoSore', judul: 'Toko Ikan Saat Senja',
          teks: 'Senja turun di toko ikan hutan, dan akuarium kaca berkilau memantulkan lampu kuning. Pemilik toko — bola-lentera tanpa wajah yang bergerak tenang — ingin tahu berapa liter air yang dibutuhkan akuarium terbesarnya. Sebelum mengangkat galon, ia selalu mengukur dulu: panjang, lebar, tinggi. Mengukur dulu, hitung kemudian — begitu urutan tukang yang teliti.',
        },
        {
          objek: 'ukurAkuariumTigaSisi', judul: 'Lima Puluh Kali Tiga Puluh Kali Empat Puluh',
          teks: 'Meteran pita menyapu tiga sisi akuarium: panjang lima puluh senti, lebar tiga puluh senti, tinggi empat puluh senti. Volumenya lima puluh kali tiga puluh kali empat puluh sama dengan enam puluh ribu sentimeter kubik. Dan ingat gerbang kemarin: seribu sentimeter kubik sama dengan satu liter. Maka enam puluh ribu dibagi seribu sama dengan enam puluh liter air.',
        },
        {
          objek: 'emberDuaPuluh', judul: 'Tiga Ember Pas Penuh',
          teks: 'Ember penampung toko menampung dua puluh ribu sentimeter kubik, sama dengan dua puluh liter. Berapa kali ember itu harus diangkut? Enam puluh liter dibagi dua puluh liter sama dengan tiga kali — tiga angkut penuh, dan akuarium tepat terisi sampai batas aman. Tidak ada air tumpah percuma, tidak ada galon menganggur; muamalah toko ikan berjalan hemat dan rapi.',
        },
        {
          objek: 'botolSatuSetengah', judul: 'Kalau Cuma Punya Botol Kecil',
          teks: 'Botol kecil toko menampung seribu lima ratus sentimeter kubik — satu setengah liter. Berapa botol untuk mengisi akuarium? Enam puluh dibagi satu setengah sama dengan empat puluh botol. Wah, empat puluh kali bolak-balik! Maka pemilik toko memilih ember besar. Peralatan boleh berbeda, jawabannya tetap enam puluh liter — hitungan yang setia menemani pilihan mana pun.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Akuarium Tahu Isinya Sendiri!',
          teks: 'Akuarium, ember, dan botol ternyata bisa diwawancara lewat meteran: ukur tiga sisinya, kalikan, lalu bagi seribu. Owalah, ternyata begini toh — liter di sekitar kita cuma menunggu dihitung. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-070 · Tantangan Gudang Bentuk — malam gudang, lima misi mandor ----- */
    'p2-070': {
      tema: 'gudangKardus',
      npc: { glif: '27', ucap: ['Lima misi', 'gudang!'] },
      stasiun: [
        {
          objek: 'gudangKardusMalam', judul: 'Gudang yang Menantang Malam',
          teks: 'Malam di gudang bentuk, lentera-lentera kecil menyala di antara tumpukan kardus. Penjaga gudang — bola-lentera tanpa wajah — menyalakan papan tantangan di pintu: lima misi untuk siapa pun yang percaya diri menghitung isi dan kulit kardus. Mandor yang cermat tidak menebak; ia mengukur, mengalikan, lalu menjawab dengan tenang.',
        },
        {
          objek: 'misiKardusTigaUkuran', judul: 'Misi Satu dan Dua: Ukur dan Banding',
          teks: 'Misi satu: kardus A berukuran empat kali dua kali tiga — isinya dua puluh empat kubus kecil. Misi dua: bandingkan kardus B yang bersisi dua, isinya delapan, dengan kardus C yang bersisi tiga, isinya dua puluh tujuh. Meski A memanjang, juara isi tetap C: dua puluh tujuh mengalahkan dua puluh empat dengan selisih tipis. Ukuran yang kelihatan besar belum tentu berisi paling banyak — itulah kenapa mandor menghitung, bukan menebak.',
        },
        {
          objek: 'misiKubusMuatKardus', judul: 'Misi Tiga: Berapa Kardus Kecil Muat?',
          teks: 'Misi tiga menyodorkan kubus besar bersisi empat — isinya empat kali empat kali empat sama dengan enam puluh empat — dan kardus kecil bersisi dua yang isinya delapan. Berapa kardus kecil muat mengisi kubus besar? Enam puluh empat dibagi delapan sama dengan delapan kardus rapi. Kubus besar itu seperti gedung berlantai-lantai, dan kardus kecil adalah kamar-kamarnya.',
        },
        {
          objek: 'misiTangkiDanKado', judul: 'Misi Empat dan Lima: Tangki dan Kado',
          teks: 'Misi empat: tangki berukuran lima kali empat kali tiga — enam puluh sentimeter kubik, berarti enam puluh liter air siap diangkut kereta dorong gudang. Misi lima: kado kubus bersisi lima — luas pembungkusnya enam kali lima kali lima sama dengan seratus lima puluh sentimeter persegi. Dua puluh empat, delapan, dua puluh tujuh, enam puluh empat, enam puluh, seratus lima puluh — semua angka gudang hari ini lahir dari perkalian yang sama.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Mandor Muda Lulus Lima Misi!',
          teks: 'Lima misi ternyata memakai satu jurus yang sama lima kali: ukur sisinya, kalikan untuk isi, jumlahkan kulitnya bila perlu. Owalah, ternyata begini toh — gudang penuh kardus adalah kelas volume paling nyata. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-071 · Sumbu X & Sumbu Y — pagi lapangan persimpangan patok nol ----- */
    'p2-071': {
      tema: 'pertigaanNol',
      npc: { glif: 'x,y', ucap: ['Dua jalan,', 'satu titik!'] },
      stasiun: [
        {
          objek: 'patokNolPersimpangan', judul: 'Dua Jalan Bertemu di Patok Nol',
          teks: 'Pagi di lapangan hutan, dua jalan tanah saling bersilang membentuk huruf besar: satu mendatar lebar, satu menanjak lurus. Di tempat mereka bertemu tertancap patok batu bermahkota angka nol. Penduduk hutan menyebutnya patok nol — titik kelahiran semua alamat. Sebelum ada persimpangan ini, orang harus menggambarkan letak sesuatu dengan banyak kalimat; kini cukup dua bilangan kecil.',
        },
        {
          objek: 'papanSumbuDuaArah', judul: 'Papan Nama: Sumbu X dan Sumbu Y',
          teks: 'Di sisi persimpangan berdiri dua papan nama. Jalan mendatar diberi nama sumbu x, jalan menanjak diberi nama sumbu y. Keduanya memanjang dua arah: sumbu x berjalan ke kanan dengan bilangan makin besar dan ke kiri dengan bilangan makin kecil, begitu pula sumbu y ke atas dan ke bawah. Dua nama sederhana, dua arah tak berujung — dan keduanya selalu berbagi satu patok nol yang sama di tengah.',
        },
        {
          objek: 'rumahTitikPertama', judul: 'Rumah Pertama yang Punya Alamat',
          teks: 'Sedikit ke kanan patok nol berdiri rumah kecil pertama di lapangan ini. Alamatnya dituliskan pada papan pintu: tiga, dua. Artinya maju tiga langkah menyusuri sumbu x, lalu naik dua langkah menyusuri sumbu y — sampailah di rumah itu. Semua titik di lapangan kini bisa diberi alamat dengan cara yang sama: dua bilangan, satu maju satu naik, berangkat selalu dari patok nol.',
        },
        {
          objek: 'papanJalanBertemu', judul: 'Jurus Alamat di Persimpangan',
          teks: 'Papan kayu di tepi jalan merangkum jurus persimpangan: berangkat dari nol, maju sejauh bilangan pertama, naik sejauh bilangan kedua, titik ditemukan. Uji sekali lagi: alamat dua, satu berarti maju dua lalu naik satu. Tidak ada yang perlu dihafal banyak — hanya dua langkah berurutan yang selalu sama, seberapa jauh pun lapangan itu diperluas.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Dua Jalan Membuat Semua Alamat!',
          teks: 'Dua jalan polos ternyata sedang merahasiakan keajaiban: begitu bersilang di nol, seluruh lapangan langsung punya sistem alamat. Owalah, ternyata begini toh — sumbu x dan sumbu y adalah dua jalan yang melahirkan jutaan alamat sekaligus. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-072 · Membaca Titik (x, y) — siang halaman engkle berkotak ----- */
    'p2-072': {
      tema: 'tanggaTitik',
      npc: { glif: '(3,2)', ucap: ['X dulu,', 'Y kemudian!'] },
      stasiun: [
        {
          objek: 'lantaiKotakHalaman', judul: 'Halaman Berkotak-Kotak',
          teks: 'Siang di halaman hutan, lantai rumput digambar menjadi kotak-kotak besar seperti permainan engkle raksasa. Garis kotaknya sejajar dengan dua sumbu persimpangan lapangan, jadi tiap petak bisa dihitung: berapa langkah ke kanan, berapa petak ke atas. Halaman biasa berubah menjadi papan permainan alamat — dan tiap petak punya nama dua bilangannya sendiri.',
        },
        {
          objek: 'langkahTigaDua', judul: 'Tiga Langkah Maju, Dua Langkah Naik',
          teks: 'Sebut alamat tiga, dua: berdiri di patok nol, maju tiga kotak ke kanan menyusuri sumbu x, lalu naik dua kotak ke atas menyusuri sumbu y. Letakkan batu penanda di kotak itu — itulah titik tiga koma dua. Urutannya setia seperti resep: bilangan pertama bicara maju, bilangan kedua bicara naik. Begitu terbiasa, satu pasang angka langsung terasa seperti lokasi yang bisa dikunjungi.',
        },
        {
          objek: 'titikTertukarDuaTiga', judul: 'Ketika Urutan Tertukar',
          teks: 'Sekarang cobalah menulis alamatnya terbalik: dua, tiga. Maju dua kotak, naik tiga kotak — batu penanda mendarat di kotak yang berbeda dari tadi! Dua bilangan yang sama, tapi ditukar urutannya, membawa kita ke tempat lain. Di titik tiga koma dua berdiri rumah kecil; di titik dua koma tiga ternyata rumah tetangganya. Alamat bukan sekadar angka — urutannya adalah jiwanya.',
        },
        {
          objek: 'papanXpuluhanY', judul: 'Jurus Setia: X Dulu, Y Kemudian',
          teks: 'Papan di pagar halaman menuliskan jurus yang menjaga semua alamat tetap jujur: bilangan pertama selalu x, bilangan kedua selalu y. Ditulis dalam kurung dan dipisah koma, seperti tiga koma dua. Kalau sedang ragu, ulangi langkah pelan: maju dulu sejauh x, baru naik sejauh y. Jurus yang dijaga urutannya tak pernah salah menempatkan titik.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Urutan Alamat Itu Serius!',
          teks: 'Tertukar satu urutan, sampailah di rumah tetangga — halaman engkle ini membuktikan bahwa membaca titik itu soal disiplin kecil yang manis. Owalah, ternyata begini toh: x dulu, y kemudian, dan semua titik tak mungkin keliru rumah. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-073 · Empat Daerah Kuadran — sore alun-alun empat pojok ----- */
    'p2-073': {
      tema: 'bazarEmpatPojok',
      npc: { glif: '(-,+)', ucap: ['Empat daerah,', 'satu alun-alun!'] },
      stasiun: [
        {
          objek: 'alunAlunDuaJalan', judul: 'Alun-Alun yang Dibelah Dua Jalan',
          teks: 'Sore di alun-alun hutan, dua jalan batu saling bersilang tepat di tengah, membelah lapangan menjadi empat daerah yang sama besar. Jalan pertama adalah sumbu x, jalan kedua adalah sumbu y, dan pertemuan keduanya adalah patok nol. Empat daerah itu punya nama resmi: daerah satu, dua, tiga, dan empat — dihitung berlawanan arah jarum jam mulai dari daerah kanan-atas.',
        },
        {
          objek: 'lampuEmpatPojok', judul: 'Empat Pojok, Empat Lampu',
          teks: 'Tiap daerah menancapkan satu lampu tanda. Daerah satu di kanan-atas: kedua bilangannya positif, seperti tiga koma dua. Daerah dua di kiri-atas: x-nya negatif, y-nya tetap positif. Daerah tiga di kiri-bawah keduanya negatif, dan daerah empat di kanan-bawah x positif y negatif. Empat lampu itu seperti empat siswa yang memakai seragam berbeda tanda — sekali lihat tandanya, langsung ketahuan rumah daerahnya.',
        },
        {
          objek: 'kiosDaerahSatu', judul: 'Kios di Daerah Satu',
          teks: 'Kios jajanan berdiri di daerah satu, dan alamat papan pintunya tiga, dua. Perhatikan tanda kedua bilangannya: sama-sama positif. Di daerah mana pun sebuah titik berdiri, tandanya tak pernah diam: alamat selalu membocorkan daerahnya tanpa perlu bertanya. Titik dengan x negatif dan y positif tak mungkin tinggal di daerah satu — tandanya tidak cocok, seperti sepatu yang tidak pas dipakai.',
        },
        {
          objek: 'papanTandaKuadran', judul: 'Tanda Alamat Membocorkan Daerah',
          teks: 'Papan besar di tengah alun-alun merangkum semua aturan tanda: kanan-atas dua positif, kiri-atas minus lalu positif, kiri-bawah dua minus, kanan-bawah positif lalu minus. Uji dengan cepat: alamat minus empat koma minus dua — kedua bilangan minus — pasti tinggal di daerah tiga. Tidak perlu menggambar dulu; cukup baca tandanya, daerahnya langsung terjawab.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Alamat Membocorkan Daerahnya!',
          teks: 'Empat daerah ternyata cukup dikawal empat pola tanda, dan setiap alamat otomatis taat pada polanya. Owalah, ternyata begini toh — membaca kuadran semudah membaca tanda plus dan minus pada alamatnya. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-074 · Menggambar Titik — malam galeri papan hitam ----- */
    'p2-074': {
      tema: 'galeriTitik',
      npc: { glif: '(2,5)', ucap: ['Tempel', 'di alamatnya!'] },
      stasiun: [
        {
          objek: 'papanHitamGaleri', judul: 'Galeri Papan Hitam Malam Ini',
          teks: 'Malam di galeri hutan, satu papan hitam raksasa digantung diterangi lampu kuning hangat. Permukaannya digambar garis-garis samar membentuk kisi, dengan sumbu x melintang di tengah dan sumbu y menegak melalui patok nol. Malam ini galeri memakai sistem baru: tiap kartu yang dipajang wajib menulis alamat koordinatnya, sehingga pengunjung bisa menemukan letaknya tanpa disesatkan.',
        },
        {
          objek: 'kartuAlamatDuaLima', judul: 'Kartu Pertama: Dua, Lima',
          teks: 'Kartu pertama menulis alamat dua, lima. Kurator — bola-lampu tanpa wajah — membawanya ke kisi: maju dua langkah ke kanan di sumbu x, naik lima langkah di sumbu y, lalu menempelkan kartu tepat di persilangan garis. Satu alamat, satu titik, tidak boleh sedikit pun meleset. Pengunjung yang datang besok akan menemukan kartu itu di tempat yang sama, karena alamat tidak pernah berpindah sendiri.',
        },
        {
          objek: 'kartuMinusTigaEmpat', judul: 'Kartu Kedua: Minus Tiga, Empat',
          teks: 'Kartu kedua membawa kejutan: alamatnya minus tiga, koma empat. Minus tiga artinya maju ke arah sebaliknya — tiga langkah ke kiri dari patok nol — lalu naik empat langkah ke atas. Kartu itu menempel di daerah kiri-atas, dan tepat di titik yang diminta. Bilangan minus bukan musuh; ia hanya petunjuk arah yang jujur, memberi tahu ke mana langkah harus dibalik.',
        },
        {
          objek: 'kartuNolMinusDua', judul: 'Kartu Ketiga: Nol, Minus Dua',
          teks: 'Kartu ketiga memakai alamat nol, koma minus dua. Maju nol langkah — jadi tetap di patok nol — lalu turun dua langkah menyusuri sumbu y. Kartu itu mendarat tepat di badan sumbu y, dua petak di bawah nol. Ternyata titik boleh berdiri langsung di jalan besar; ia hanya tidak masuk ke daerah mana pun. Tiga kartu terpasang, tiap-tiap satu di alamatnya sendiri, dan tak ada dua kartu berbagi satu titik.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Satu Alamat Satu Titik!',
          teks: 'Galeri malam ini membuktikan satu hal yang tenang: alamat koordinat itu unik, satu alamat hanya dimiliki satu titik, tak pernah kembar. Owalah, ternyata begini toh — menggambar titik hanyalah kebiasaan dua langkah: baca alamatnya, lalu tempel dengan setia. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-075 · Garis dari Tabel — pagi meja arsip benang ----- */
    'p2-075': {
      tema: 'arsipBenang',
      npc: { glif: 'y=2x', ucap: ['Tabel tertib,', 'garis lurus!'] },
      stasiun: [
        {
          objek: 'tabelXyArsip', judul: 'Tabel x dan y di Meja Arsip',
          teks: 'Pagi di meja arsip hutan, sebuah lembar tabel terbentang rapi. Kolom kirinya bernama x, kolom kanannya bernama y, dan di antara keduanya berdiri perjanjian kecil: y sama dengan dua kali x. Pilih x sama dengan satu, hitung y jadi dua; pilih x dua, y jadi empat; pilih x tiga, y jadi enam. Tabel itu seperti dapur: masukkan bahan x, keluar masakan y dengan resep yang setia.',
        },
        {
          objek: 'pakuTigaTitik', judul: 'Tiga Paku Ditanam Tepat',
          teks: 'Lembar tabel lalu diletakkan di atas papan gabus bergaris, dan tiga paku kecil ditancapkan satu per satu. Paku pertama di alamat satu koma dua, paku kedua di dua koma empat, paku ketiga di tiga koma enam — tepat seperti isi tabel, tanpa satu pun digeser. Menanam paku ini adalah langkah paling penting sebelum menarik garis, karena garis tak mau lahir dari titik yang asal tempel.',
        },
        {
          objek: 'benangTertarikLurus', judul: 'Benang Ditarik — Lurus!',
          teks: 'Sekarang bagian yang paling memuaskan: benang merah ditarik menyentuh ketiga paku sekaligus. Ternyata tanpa dipaksa, benang itu berbaris lurus sempurna, menyusuri ketiga titik dari kiri bawah ke kanan atas. Titik yang lahir dari tabel yang tertib otomatis berbaris rapi — inilah keajaiban senyap dari perjanjian y sama dengan dua kali x. Tabel yang tertib melahirkan garis yang lurus.',
        },
        {
          objek: 'papanGarisLahir', judul: 'Tabel, Titik, lalu Garis',
          teks: 'Papan arsip menuliskan tiga langkah melahirkan grafik: pilih x, hitung y, tandai titiknya, lalu hubungkan. Coba resep lain — y sama dengan x tambah satu — dan paku-pakunya akan kembali berbaris lurus dengan kemiringan yang beda. Selama hitungan tabelnya jujur, garisnya tak pernah menari sendiri. Grafik yang indah selalu dimulai dari tabel yang disiplin.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tabel Tertib Melahirkan Garis!',
          teks: 'Tiga paku, satu benang, dan garis lurus muncul sendiri tanpa disuruh — meja arsip pagi ini jadi ruang kelahiran grafik. Owalah, ternyata begini toh: garis lurus hanyalah titik-titik tabel yang setia resep. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-076 · Kemiringan Garis — siang dua tangga tanjakan ----- */
    'p2-076': {
      tema: 'jalanTanjak',
      npc: { glif: '2/1', ucap: ['Naik dua,', 'maju satu!'] },
      stasiun: [
        {
          objek: 'tanggaCuramNaikDua', judul: 'Tangga Curam si Kemiringan Dua',
          teks: 'Siang di kaki bukit hutan, tangga pertama menanjak menantang. Anak tangganya punya kebiasaan yang bisa dihitung: setiap satu langkah maju ke depan, tangga ini naik dua langkah ke atas. Rasionya dua banding satu, dan itulah kemiringannya — angka dua. Penduduk hutan menyebut tangga ini si curam, karena angka kemiringannya paling besar di antara semua jalur bukit.',
        },
        {
          objek: 'tanggaLandaiNaikSatu', judul: 'Tangga Landai si Kemiringan Satu',
          teks: 'Tangga kedua di sisi lain bukit bersikap lembut: setiap satu langkah maju, ia naik satu langkah saja. Kemiringannya satu banding satu — angka satu. Naik dua puluh langkah berarti maju dua puluh langkah juga, seperti menuruni tangga yang dijinakkan. Dua tangga menuju puncak yang sama, tapi angka kemiringan mereka bicara beda: dua itu terjal, satu itu santai.',
        },
        {
          objek: 'pendakiDuaJalan', judul: 'Dua Pendaki Membanding Jalur',
          teks: 'Dua pendaki bola-lampu berangkat bersama, satu lewat jalur curam, satu lewat jalur landai. Yang di jalur curam naik enam langkah hanya setelah maju tiga; yang landai masih butuh maju enam untuk naik enam. Puncaknya sama, lelahnya beda — dan keduanya bisa dihitung sebelum melangkah: cukup bagi naik dengan maju, keluarlah kemiringannya. Angka kecil itu jujur tentang seberapa kerja kaki.',
        },
        {
          objek: 'papanKemiringanDua', judul: 'Papan Jalur: Naik Dua, Maju Satu',
          teks: 'Papan penunjuk jalur menuliskan resep kemiringan dengan singkat: naik dibagi maju. Jalur curam: dua dibagi satu sama dengan dua. Jalur landai: satu dibagi satu sama dengan satu. Makin besar angkanya, makin tegak jalannya; makin kecil, makin memanjang santainya. Sekali paham, semua tanjakan di dunia langsung bisa dibandingkan lewat satu bilangan saja.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kemiringan Itu Angka!',
          teks: 'Dua tangga menuju puncak yang sama ternyata dibedakan hanya oleh satu bilangan kecil yang jujur. Owalah, ternyata begini toh — kemiringan adalah naik dibagi maju, dan angkanya langsung terasa di kaki. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-077 · Grafik Perjalanan — malam pos jalan papan jadwal ----- */
    'p2-077': {
      tema: 'papanPerjalanan',
      npc: { glif: 'km', ucap: ['Grafik', 'bercerita!'] },
      stasiun: [
        {
          objek: 'papanWaktuJarakPos', judul: 'Papan Jadwal yang Bercerita',
          teks: 'Malam di pos jalan hutan, sebuah papan besar menyala: sumbu mendatarnya waktu, sumbu tegaknya jarak tempuh dalam kilometer. Kurir pulang membawa catatan perjalanannya, dan penjaga pos menggambar garis di papan berdasarkan catatan itu. Anehnya, garis itu seperti ikut bicara — tiap belokan dan tiap datarnya menyimpan satu peristiwa dari jalan.',
        },
        {
          objek: 'garisDatarBerhenti', judul: 'Garis Mendatar: Sedang Berhenti',
          teks: 'Di tengah papan, garis mendatar panjang: naiknya nol selama sepuluh menit. Apa maksudnya? Jarak tidak bertambah sama sekali — berarti kurir sedang berhenti, mungkin mengobrol di warung bakso tepi jalan. Garis mendatar adalah bahasa diam untuk kata berhenti. Tidak perlu tulisan, tidak perlu cerita lisan: papan cukup memanjangkan garisnya, dan semua orang langsung paham.',
        },
        {
          objek: 'garisMiringMelaju', judul: 'Garis Miring: Sedang Melaju',
          teks: 'Setelah bagian datar, garis menanjak tajam: sepuluh kilometer terlalui dalam sepuluh menit — jarak terus bertambah. Itulah bahasa grafik untuk kata melaju. Miring makin tegak berarti laju makin kencang; miring landai berarti santai saja. Sekali pandang, isi perjalanan kurir terbaca semua: berangkat, melaju, berhenti jajan, melaju lagi sampai pos. Grafik ternyata buku cerita yang ditulis garis.',
        },
        {
          objek: 'papanCeritaPerjalanan', judul: 'Membaca Cerita Tanpa Kata',
          teks: 'Penjaga pos merangkum di papan kecil: sumbu waktu dan sumbu jarak bila dipasangkan membuat perjalanan bisa digambar. Titik naik artinya bergerak, titik datar artinya istirahat, dan pukul setiap perubahan tercatat jelas. Kalau besok ada petualang baru menanyakan isi perjalanan kurir, tak perlu menebak — cukup baca garisnya, karena garis tak pernah berkhianat pada kejadian yang digambar.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Grafik Bisa Bercerita!',
          teks: 'Mendatar berarti berhenti, miring berarti melaju — papan jadwal malam ini membuktikan bahwa garis bisa menceritakan perjalanan tanpa satu kata pun. Owalah, ternyata begini toh: grafik perjalanan itu buku cerita paling jujur yang pernah digambar. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-078 · Titik Potong Sumbu — senja gerbang awal jalan ----- */
    'p2-078': {
      tema: 'gerbangAwal',
      npc: { glif: 'x=0', ucap: ['Semua cerita', 'mulai di sini!'] },
      stasiun: [
        {
          objek: 'gerbangSumbuYSenja', judul: 'Gerbang di Sumbu Y',
          teks: 'Senja di jalan kecil hutan, sebuah gerbang kayu berdiri tepat di badan sumbu y, tinggi dan tenang. Papan gerbangnya menulis: semua garis punya rumah awal di sini. Rumah awal itu adalah titik tempat garis menyentuh sumbu y — tempat x-nya nol. Setiap jalan cerita butuh titik mulai, dan bagi garis lurus, titik mulainya selalu terletak di gerbang ini.',
        },
        {
          objek: 'titikAwalNolEmpat', judul: 'Alamat Awal: Nol, Empat',
          teks: 'Di pagar gerbang tergantung penanda berisi alamat nol, koma empat. Baca pelan: x-nya nol berarti maju nol langkah — tidak bergeser sedikit pun dari sumbu y — lalu naik empat langkah ke atas. Di titik itulah garis kelak memijak tanah pertamanya. Alamat awal memang istimewa: ia satu-satunya alamat garis yang x-nya pasti nol, dan karena itu ia mudah dikenali di kisi mana pun.',
        },
        {
          objek: 'garisLewatGerbang', judul: 'Garis yang Selalu Lewat Rumah Awalnya',
          teks: 'Sekarang garis digambar melewati titik awal itu lalu menjalar ke kanan atas, melewati alamat satu koma enam, dua koma delapan, tiga koma sepuluh. Geser ke alamat mana pun di garis itu, hitungannya tetap patuh pada kebiasaan yang sama: y sama dengan dua kali x tambah empat. Dan coba masukkan x nol — jawabannya empat lagi, tepat di gerbang. Garis boleh sejauh apa pun berjalan, ia tetap pulang mampir ke rumah awalnya.',
        },
        {
          objek: 'papanRumahAwal', judul: 'Rumah Awal Setiap Garis',
          teks: 'Papan kecil di bawah gerbang merangkum: titik potong sumbu y adalah alamat garis ketika x sama dengan nol. Garis yang rumah awalnya di nol koma empat beda cerita dengan garis yang rumah awalnya di nol koma minus dua — keduanya naik dengan kebiasaan sama tapi berangkat dari lantai yang berbeda. Banyak cerita matematika dimulai dari membaca titik potong ini lebih dulu.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Garis Selalu Pulang ke Awalnya!',
          teks: 'Garis yang menjauh sejauh apa pun ternyata selalu menyimpan alamat rumahnya di sumbu y, di tempat x bernilai nol. Owalah, ternyata begini toh — titik potong adalah kaki gerbang tempat semua cerita garis dimulai. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-079 · Peta Harta Karun — pagi taman dijaring tali ----- */
    'p2-079': {
      tema: 'tamanBenderaX',
      npc: { glif: '(5,3)', ucap: ['Maju lima,', 'naik tiga!'] },
      stasiun: [
        {
          objek: 'taliGridTaman', judul: 'Taman yang Dijaring Tali',
          teks: 'Pagi di taman hutan, tali-tali putih diregangkan di atas rumput membentuk kisi besar, dengan dua tali utama lebih tebal sebagai sumbu x dan sumbu y yang bersilang di patok nol. Taman biasa berubah menjadi bidang koordinat raksasa: tiap persilangan tali punya alamat dua bilangan. Yang tadinya rumput tak bertuan, kini tiap petaknya bisa dipanggil dengan namanya.',
        },
        {
          objek: 'petaTamanKertas', judul: 'Peta dengan Alamat',
          teks: 'Di papan informasi taman terselip peta tua bergambar kisi yang sama, dan di sudutnya tertulis satu baris kecil: alamat karun adalah lima, tiga. Peta itu tak menggambar gambar rumit dan tak memberi teka-teki panjang; ia hanya menuliskan alamat. Penduduk hutan tertawa membacanya — dulu mereka menggali seisi taman, kini karun cukup dipanggil lewat dua bilangannya.',
        },
        {
          objek: 'benderaXMerah', judul: 'Bendera X Ditanam',
          teks: 'Dua tali kecil disilang membentuk huruf X di atas rumput: tanda mulai di patok nol, maju lima langkah menyusuri sumbu x, lalu naik tiga langkah menyusuri sumbu y. Di persilangan kelima-kekanan dan ketiga-keatas itulah bendera merah ditanam. Tak ada langkah yang dibuang, tak ada sudut taman yang digali sia-sia — alamat lima koma tiga langsung mengantarkan tangan ke tempat yang tepat.',
        },
        {
          objek: 'petiHartaTeralamat', judul: 'Peti yang Teralamat Pas',
          teks: 'Sekop menyentuh tanah tepat di kaki bendera, dan peti kayu terangkat dari rumput yang dijaraknya sejak tadi. Isinya bukan emas: buku jurnal ahli hitung tua berisi peta-peta beralamat. Di sampulnya tertulis satu kalimat yang ditulis ulang generasi demi generasi: karun di taman ini ditemukan karena dihitung dua langkah — maju lalu naik — bukan karena asal menggali. Hitungan adalah alat; alamat yang benar tak butuh keberuntungan.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, X Menandai Alamatnya!',
          teks: 'Tanpa menggali seisi taman, karun terangkat tepat di alamatnya: maju lima, naik tiga. Owalah, ternyata begini toh — koordinat adalah peta yang paling hemat tenaga, dan X hanyalah bendera kecil untuk alamat yang sudah pasti. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-080 · Tantangan Alamat Hutan — malam menara lima lampion ----- */
    'p2-080': {
      tema: 'menaraSinyal',
      npc: { glif: '5 misi', ucap: ['Lima lampion', 'menyala!'] },
      stasiun: [
        {
          objek: 'menaraSinyalLima', judul: 'Menara Sinyal Lima Lampion',
          teks: 'Malam penutup penjuru koordinat: menara sinyal tinggi berdiri di lapangan kisi, memasang lima lampion bernomor. Setiap lampion menyimpan satu misi alamat, dan kelima-limanya harus selesai sebelum lampion terakhir padam. Penjaga menara — bola-lampu tanpa wajah — membuka papan tantangan: tandai, baca, tentukan daerah, ukur kemiringan, lalu gambar garisnya. Malam ini seluruh hutan jadi peta.',
        },
        {
          objek: 'misiTandaiEmpatDua', judul: 'Lampion Satu dan Dua: Tandai dan Baca',
          teks: 'Lampion satu meminta titik empat, dua ditandai di kisi: maju empat, naik dua, bendera kecil ditanam pas. Lampion dua membalik arahnya: sebuah titik menyala di kisi, dan tugasnya membaca alamatnya — maju tiga, naik tiga, jadi tiga koma tiga. Dua arah latihan itu saling menguatkan: bisa menempatkan titik dari alamatnya, dan bisa membacakan alamat dari titiknya.',
        },
        {
          objek: 'misiKuadranSinyal', judul: 'Lampion Tiga: Daerah Mana?',
          teks: 'Lampion tiga menyodorkan alamat minus tiga, koma minus dua dan menanyakan daerahnya tanpa menggambar. Baca tandanya: x minus, y minus — keduanya negatif — maka titik itu tinggal di daerah tiga, pojok kiri-bawah. Tanda alamat memang selalu membocorkan rumah daerahnya. Satu detik membaca tanda, satu jawaban tenang: lampion tiga padam dengan kemenangannya.',
        },
        {
          objek: 'misiGarisTabelAkhir', judul: 'Lampion Empat dan Lima: Miring dan Garis',
          teks: 'Lampion empat menantang kemiringan: sebuah jalur naik tiga setiap maju satu — berarti kemiringannya tiga, si paling tegak malam ini. Lampion lima menutup dengan tabel: y sama dengan x tambah satu. Isi tabelnya satu per satu: x nol jadi satu, x satu jadi dua, x dua jadi tiga — tiga titik ditanam, benang ditarik, dan garis lurus menyala di kisi malam. Lima lampion padam serempak, lapangan berkilau rapi.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Seluruh Hutan Jadi Peta!',
          teks: 'Lima misi ternyata memakai dua langkah yang sama berulang: maju lalu naik, baca tanda, hitung naik dibagi maju, isi tabel sampai garis lahir. Owalah, ternyata begini toh — kuasai sumbu, dan seluruh hutan berubah jadi peta yang ramah. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-081 · Data: Kumpulan Angka — pagi kandang burung pengamatan ----- */
    'p2-081': {
      tema: 'kandangData',
      npc: { glif: '7 angka', ucap: ['Kumpulan angka', 'punya cerita!'] },
      stasiun: [
        {
          objek: 'kandangBurungPagi', judul: 'Pagi di Kandang Burung Hutan',
          teks: 'Pagi di tepi hutan, kandang burung kecil dipenuhi kunjungan. Burung-burung liar datang meminjam mangkuk biji, dan penjaga kandang selalu menjawab satu pertanyaan yang sama tiap hari: berapa burung yang datang? Hari ini jawabannya lima. Satu angka saja belum menceritakan apa-apa — tapi penjaga tidak berhenti di satu hari. Ia bertekad mengulang pertanyaan yang sama, hari demi hari.',
        },
        {
          objek: 'papanCatatTujuhHari', judul: 'Tujuh Hari, Tujuh Angka',
          teks: 'Selama tujuh hari, papan catat di kandang menampung jawaban-jawaban itu: dua, lima, tiga, lima, enam, lima, empat. Tujuh angka sederhana hasil pengamatan yang sungguh terjadi — itulah yang disebut data. Data bukan angka karangan; ia lahir dari mengamati dan mencatat dengan jujur. Papan catat itu seperti album foto: tiap angka adalah potret satu hari di kandang.',
        },
        {
          objek: 'barisanAngkaKunjungan', judul: 'Kumpulan Angka Menyimpan Kebiasaan',
          teks: 'Sekarang bacalah pelan-pelan barisan angka di papan: dua, lima, tiga, lima, enam, lima, empat. Ada angka yang berulang-ulang — lima muncul tiga kali! Ternyata burung-burung hutan punya kebiasaan: jumlah kunjungan paling sering lima. Satu angka diam-diam, tapi kumpulannya berbisik tentang kebiasaan. Data yang terkumpul rapi ternyata mampu menceritakan kebiasaan yang tak terlihat mata kasar.',
        },
        {
          objek: 'papanPertanyaanSama', judul: 'Data Itu Jawaban yang Diulang',
          teks: 'Papan besar di dekat kandang menuliskan rahasia kecil: data adalah kumpulan jawaban dari pertanyaan yang sama, diulang dengan setia. Pertanyaan bisa apa saja: berapa burung datang, berapa tinggi tanaman, berapa derajat cuaca hari ini. Yang penting satu: pertanyaannya sama, jawabannya dicatat jujur. Kumpulan jawaban itulah yang kemudian bercerita — dan sepanjang seri ini kita akan belajar membacanya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kumpulan Angka Bisa Bercerita!',
          teks: 'Tujuh hari mengulang satu pertanyaan, dan kumpulan angka yang tadinya terlihat diam ternyata menyimpan kebiasaan burung. Owalah, ternyata begini toh — data itu bukan sekadar tumpukan angka, ia kumpulan jawaban yang siap bercerita. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-082 · Mean: Rata-rata — siang meja dapur gelas air ----- */
    'p2-082': {
      tema: 'mejaGelasRata',
      npc: { glif: '12:3', ucap: ['Bagi sama rata', 'untuk semua!'] },
      stasiun: [
        {
          objek: 'gelasTigaBedatinggi', judul: 'Tiga Gelas, Tiga Tinggi',
          teks: 'Siang di meja dapur hutan, tiga gelas berdiri berderet dengan air yang tidak sama tinggi: gelas pertama berisi tiga, gelas kedua berisi empat, gelas ketiga berisi lima. Tiga sahabat bola-lentera datang minum, tapi ada yang gelisah — airnya timpang, tidak adil. Satu gelas banyak, satu gelas sedikit. Bagaimana caranya membagi supaya semua merasa sama?',
        },
        {
          objek: 'tekoTampungSemua', judul: 'Tuang Semua Air ke Teko',
          teks: 'Lalu muncul ide sederhana yang cerdas: tuangkan semua air ke dalam satu teko. Gelas tiga dituang, gelas empat dituang, gelas lima dituang — air bergabung dan teko kini menampung dua belas. Inilah langkah pertama jurus rata-rata: jumlahkan semua. Yang tadinya berpencah dan timpang kini berkumpul jadi satu, siap dibagi dengan adil.',
        },
        {
          objek: 'gelasTigaRataEmpat', judul: 'Bagi Ulang Sama Tinggi',
          teks: 'Dari teko, air dituang ulang ke tiga gelas asal, kali ini dengan teliti. Dua belas dibagi tiga — tiap gelas menerima empat. Sekarang lihat: ketiga gelas berdiri sama tinggi, tak ada yang iri! Tinggi empat itulah rata-rata — seberapa isi tiap gelas kalau semua dipaksa sama. Rata-rata adalah keadilan dalam angka: gabungkan, lalu bagi rata.',
        },
        {
          objek: 'papanCaraMean', judul: 'Jurus Rata-rata di Papan Dapur',
          teks: 'Papan di dinding dapur menuliskan jurusnya dengan rapi: jumlahkan semua data, lalu bagi dengan banyaknya data. Uji dengan contoh lain: enam tambah tujuh tambah delapan sama dengan dua puluh satu, dibagi tiga gelas — rata-ratanya tujuh. Hitungan itu hanya alat, dan alat ini paling jujur: ia tak pernah memihak gelas mana pun. Semua data ikut ditimbang, semuanya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Rata-rata Itu Bagi yang Adil!',
          teks: 'Tiga gelas timpang dituang jadi satu, dibagi ulang, dan kini sama tinggi — rata-rata lahir dari keadilan meja dapur. Owalah, ternyata begini toh: jumlahkan semua, bagi banyaknya, dan semua data diperlakukan sama. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-083 · Median: Nilai Tengah — sore halaman batu susun ----- */
    'p2-083': {
      tema: 'susunBatuSore',
      npc: { glif: 'tengah', ucap: ['Nilai tengah', 'tahan sentak!'] },
      stasiun: [
        {
          objek: 'batuLimaBersusun', judul: 'Lima Batu Bersusun Sore Ini',
          teks: 'Sore di halaman hutan, lima batu diukur ukarannya lalu disusun berbaris dari yang terkecil sampai yang terbesar: empat, lima, enam, delapan, dua belas. Barisan itu rapi seperti antre yang patuh — kecil di kiri, besar di kanan, tanpa satu pun bolak-balik. Menyusun dari kecil ke besar adalah langkah pertama sebelum mencari satu batu istimewa: batu yang berdiri tepat di tengah.',
        },
        {
          objek: 'batuKetigaTengah', judul: 'Batu Tengah Itulah Median',
          teks: 'Hitung barisan itu: satu, dua, tiga — batu ketiga berdiri di tengah persis, dengan dua batu di kirinya dan dua batu di kanannya. Ukurannya enam, dan itulah median: nilai tengah data yang sudah tersusun. Tidak perlu menjumlah, tidak perlu membagi. Cukup susun, lalu tunjuk yang di tengah. Sederhana seperti menunjuk anak ketiga dari antrean yang berjumlah lima.',
        },
        {
          objek: 'ujungPergiTengahTetap', judul: 'Ujung Pergi, Tengah Diam di Tempat',
          teks: 'Kini pengujian paling seru: batu terbesar dua belas diganti batu raksasa seratus! Barisan menjadi empat, lima, enam, delapan, seratus. Ujung kanan kini menggila besarnya — tapi lihat batu ketiga: ia tetap enam, sama sekali tak bergeser. Ujung boleh liar sebesar apa pun, nilai tengah tak terseret. Inilah kekuatan tenang median: ia tahan banting terhadap angka-angka ekstrem.',
        },
        {
          objek: 'papanMedianAman', judul: 'Papan: Median Tak Terseret Ujung',
          teks: 'Papan di pagar halaman merangkum pelajaran sore ini: median adalah nilai tengah data yang sudah disusun dari kecil ke besar. Rata-rata bisa ikut terseret kalau ada data ekstrem, tapi median bertahan di posisinya — karena posisinya ditentukan oleh urutan, bukan oleh besaran ujung. Karena itu median dipakai saat data punya angka jauh: ia mewakili yang tengah dengan setia.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Nilai Tengah Kokoh!',
          teks: 'Batu raksasa datang menggantikan ujung, dan nilai tengah tetap diam di posisinya tanpa digeser sedikit pun. Owalah, ternyata begini toh — median itu batu tengah yang kokoh: susun datanya, tunjuk yang di tengah, selesai. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-084 · Modus: Paling Sering Muncul — siang rak sandal ----- */
    'p2-084': {
      tema: 'rakSandalSiang',
      npc: { glif: '5 kali', ucap: ['Paling sering', 'itulah juara!'] },
      stasiun: [
        {
          objek: 'rakSandalSembilan', judul: 'Rak Sandal Sembilan Buah',
          teks: 'Siang di depan rumah pohon, rak sandal menampung sembilan sandal milik para tamu: ada yang merah, ada yang biru, ada yang kuning. Penjaga rak penasaran: warna apa yang paling sering dipakai tamu-tamu ini? Pertanyaan kecil semacam ini adalah pintu masuk modus — data yang paling sering muncul di antara kumpulannya. Semua sandal dicatat warnanya, satu per satu, tanpa ada yang terlewat.',
        },
        {
          objek: 'sandalMerahTumpuk', judul: 'Merah Menumpuk Tertinggi',
          teks: 'Hasil penghitungan disusun menumpuk: sandal merah berjumlah lima, dan tumpukannya berdiri paling tinggi di rak. Sekali pandang, siapa juaranya langsung terlihat tanpa membaca angka lagi — merah! Lima kemunculan, paling sering di antara semua warna. Itulah modus: nilai yang paling sering hadir. Tidak ada hitungan panjang, tidak ada rumus; cukup hitung kemunculan, lalu angkat jempol untuk yang tertinggi.',
        },
        {
          objek: 'duaWarnaSisa', judul: 'Biru dan Kuning Ikut Dihitung',
          teks: 'Tumpukan lain juga dihitung dengan jujur: biru muncul tiga kali, kuning hanya satu. Ketiganya adalah datanya; merah hanya salah satu dari mereka — tapi ia yang paling rajin muncul. Modus tidak pernah sembunyi: ia terlihat dari frekuensinya. Dan jika suatu hari tidak ada yang berulang sama sekali, maka dunia itu belum punya modus — data yang tak pernah mengulang tak punya juara kemunculan.',
        },
        {
          objek: 'papanModusJawara', judul: 'Papan: Modus Si Juara Kemunculan',
          teks: 'Papan dekat rak menuliskan pelajarannya: modus adalah nilai yang paling sering muncul dalam data. Berbeda dengan rata-rata yang harus menjumlah dan membagi, modus hanya butuh penghitungan kemunculan. Ia jawaban untuk pertanyaan "mana yang paling sering?" — rute yang paling sering dilalui, warna yang paling sering dipakai, angka yang paling sering keluar. Juara frekuensi, itulah modus.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Sekali Pandang Modus Ketemu!',
          teks: 'Sembilan sandal dihitung warnanya, dan tumpukan merah langsung berdiri tertinggi sebagai juara kemunculan. Owalah, ternyata begini toh — modus itu nilai paling sering muncul, terlihat bahkan sebelum angka selesai dibaca. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-085 · Diagram Batang — pagi lapangan panen tongkat ----- */
    'p2-085': {
      tema: 'lapanganBatang',
      npc: { glif: '6-3-9', ucap: ['Tinggi rendah', 'langsung terbaca!'] },
      stasiun: [
        {
          objek: 'tongkatPanenTiga', judul: 'Tiga Tongkat Hasil Panen',
          teks: 'Pagi di lapangan panen hutan, tiga tongkat kayu ditancapkan berderet di tanah, masing-masing mewakili satu buah: tongkat mangga setinggi enam, tongkat jambu setinggi tiga, tongkat pisang setinggi sembilan. Tingginya dihitung dari jumlah panen hari ini. Tanpa disadari, para penduduk baru saja membuat diagram batang — tongkat yang berdiri tegak menaraikan angka, tinggi rendahnya bercerita.',
        },
        {
          objek: 'batangPisangSembilan', judul: 'Batang Tertinggi: Pisang Sembilan',
          teks: 'Mata penduduk langsung tertuju ke tongkat paling tinggi: pisang, dengan sembilan. Mereka belum membaca satu angka pun di papan, tapi jawaban "panen apa paling banyak?" sudah terjawab. Inilah keajaiban diagram batang: mata bisa membaca perbandingan lebih cepat daripada membaca angka. Batang yang menjulang berbicara sendiri — juara tak perlu ditunjuk, ia sudah berdiri paling atas.',
        },
        {
          objek: 'batangJambuTerpendek', judul: 'Batang Terpendek: Jambu Tiga',
          teks: 'Di sisi lain, tongkat jambu berdiri paling pendek dengan angka tiga. Bandingkan dengan pisang: sembilan banding tiga — pisang tiga kali lipat jambu! Perbandingan yang biasanya butuh hitungan kini tampak langsung dari beda tinggi batang. Diagram batang menjadikan angka-angka di papan sebagai tinggi-tinggi yang bisa dilihat mata: makin banyak, makin tinggi; makin sedikit, makin pendek.',
        },
        {
          objek: 'papanBacaSekali', judul: 'Membaca Diagram Batang dengan Benar',
          teks: 'Papan panen merangkum jurus membacanya: satu batang mewakili satu kelompok, tinggi batang mewakili jumlahnya, dan semua batang berdiri di dasar yang sama agar adil dibandingkan. Tanpa dasar yang rata, perbandingan jadi bohong. Dengan dasar yang rata, sekali pandang semua terbaca: mana juara, mana sisa, mana yang setara. Diagram batang adalah cerita yang digambar dengan tinggi.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Batang Tinggi Bercerita!',
          teks: 'Tiga tongkat berdiri di lapangan, dan tanpa membaca satu angka pun semua orang tahu juaranya pisang sembilan. Owalah, ternyata begini toh — diagram batang mengubah angka jadi tinggi yang terlihat mata. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-086 · Diagram Garis — sore meja suhu piknik ----- */
    'p2-086': {
      tema: 'mejaSuhuSore',
      npc: { glif: '20-28', ucap: ['Naik turun', 'bercerita!'] },
      stasiun: [
        {
          objek: 'kertasSuhuLimaTitik', judul: 'Lima Titik Suhu di Kertas Piknik',
          teks: 'Sore di meja piknik hutan, sebuah kertas terbentang berisi catatan suhu hari ini. Suhu diukur lima kali, satu pengukuran satu titik: pagi dua puluh, siang awal dua puluh empat, siang penuh dua puluh delapan, petang dua puluh enam, dan malam dua puluh dua. Lima titik itu adalah data pengamatan hari ini — catatan yang sungguh terjadi, ditulis setiap kali termometer ditengok.',
        },
        {
          objek: 'garisSuhuNaik', judul: 'Garis Menanjak: Makin Panas',
          teks: 'Sekarang titik-titik itu dihubungkan garis. Dari pagi ke siang, garis menanjak: dua puluh naik ke dua puluh empat, lalu ke dua puluh delapan. Menanjaknya garis membisikkan satu kata: makin panas. Setiap langkah naiknya bisa dibaca — naik empat, naik empat lagi. Garis yang menanjak adalah cara mata membaca perubahan tanpa membaca satu angka pun: kaki jalannya naik, suhunya ikut naik.',
        },
        {
          objek: 'garisSuhuTurun', judul: 'Garis Menurun: Makin Sejuk',
          teks: 'Lalu dari siang penuh ke petang, garis berbalik menurun: dua puluh delapan turun ke dua puluh enam, dan malam mendarat di dua puluh dua. Turunnya itu bercerita: udara makin sejuk menjelang malam. Perhatikan — diagram ini membacakan catatan yang sudah terjadi, seperti membaca ulang buku harian. Apa yang terjadi hari ini tertulis jelas di naik-turunnya garis, tanpa kata, tanpa kalimat.',
        },
        {
          objek: 'papanDenyutData', judul: 'Denyut yang Bercerita Tanpa Kata',
          teks: 'Papan di tepi meja menuliskan pelajarannya: diagram garis menghubungkan titik-titik data agar perubahan terlihat — naik, turun, atau datar. Garis ini seperti denyut: ia membacakan riwayat, bukan menakar hal-hal di luar ilmunya. Yang ia kerjakan hanya satu: menata catatan yang sudah dicatat agar naik-turunnya bisa dipahami sekali pandang. Titik adalah kejadian, garis adalah hubungannya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Garis Punya Denyut Cerita!',
          teks: 'Lima titik suhu dihubungkan, dan garisnya membacakan seluruh hari: menanjak saat panas datang, menurun saat sejuk menyapa. Owalah, ternyata begini toh — diagram garis adalah denyut catatan yang bercerita tanpa kata. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-087 · Diagram Lingkaran — malam meja kue pesta ----- */
    'p2-087': {
      tema: 'mejaKueMalam',
      npc: { glif: '40%', ucap: ['Lingkaran penuh', 'porsinya semua!'] },
      stasiun: [
        {
          objek: 'kueBulatPestaMalam', judul: 'Kue Bulat untuk Sepuluh Anak',
          teks: 'Malam di ruang pesta hutan, satu kue bulat besar terhampar di meja dengan sepuluh lilin menyala di sekelilingnya. Sepuluh anak bola-lentera datang merayakan, dan sebelum meniup lilin, satu pertanyaan muncul: rasa apa yang paling digemari? Hasil penghitungan tangannya: empat anak memilih coklat, tiga memilih stroberi, dan tiga memilih vanila. Sepuluh pilihan, satu kue bulat — bagaimana menggambarnya sekali pandang?',
        },
        {
          objek: 'irisanCoklatEmpat', judul: 'Irisan Terlebar: Coklat Empat Persepuluh',
          teks: 'Kue lalu dibagi irisan sesuai pilihan: coklat mendapat empat dari sepuluh bagian — irisan paling lebar di kue! Empat dari sepuluh disebut juga empat puluh persen. Sekali pandang, semua anak langsung melihat rasa juara malam ini tanpa perlu berhitung ulang: irisan coklat memang berdiri paling gemuk. Diagram lingkaran mengubah hitungan menjadi porsi yang bisa dilihat mata.',
        },
        {
          objek: 'irisanStroberiVanila', judul: 'Dua Irisan Kembar: Stroberi dan Vanila',
          teks: 'Sisanya menarik: stroberi mendapat tiga dari sepuluh, vanila juga tiga dari sepuluh — dua irisan kembar yang sama lebar, masing-masing tiga puluh persen. Tidak ada yang berdebat porsi lebih besar, karena ukuran irisannya memang setara. Lingkaran penuh kini terbagi tiga: coklat empat puluh, stroberi tiga puluh, vanila tiga puluh — seluruh sepuluh anak sudah terwakili di atas meja.',
        },
        {
          objek: 'papanPenuhSeratus', judul: 'Lingkaran Penuh = Seratus Persen',
          teks: 'Papan di dinding pesta menuliskan aturannya: lingkaran penuh berarti seluruh data, yaitu seratus persen. Cek malam ini: empat puluh tambah tiga puluh tambah tiga puluh — tepat seratus, tak kurang setetes pun. Semua irisan selalu berbagi satu lingkaran yang sama, karena semuanya adalah bagian dari satu kelompok. Diagram lingkaran menjawab pertanyaan porsi: siapa berapa bagian dari semuanya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Satu Kue Memuat Semua Data!',
          teks: 'Sepuluh pilihan diubah menjadi tiga irisan di satu kue bulat, dan juara rasa malam ini terlihat sebelum lilin padam. Owalah, ternyata begini toh — diagram lingkaran memuat semua data dalam satu lingkaran penuh. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-088 · Membaca Tabel — pagi gerai buah pasar ----- */
    'p2-088': {
      tema: 'geraiTabelPasar',
      npc: { glif: '4x3', ucap: ['Baris kolom', 'data rapi!'] },
      stasiun: [
        {
          objek: 'geraiBuahPagi', judul: 'Gerai Buah di Pasar Pagi',
          teks: 'Pagi di pasar hutan, gerai buah segar berdiri dengan keranjang penuh: mangga, jambu, dan pisang dari panen empat hari terakhir. Penjual mencatat semuanya, tapi catatan yang berserakan membuatnya pusing — mana hari Senin, mana yang pisang? Maka ia menyusun ulang catatannya ke dalam tabel: data yang ditata rapi di baris dan kolom, seperti menata baju di almari.',
        },
        {
          objek: 'rakBarisKolom', judul: 'Almari Berbaris dan Berkolom',
          teks: 'Tabel itu seperti almari: empat laci memanjang ke bawah untuk empat hari — Senin, Selasa, Rabu, Kamis — dan tiga bilah melebar untuk tiga buah. Empat baris kali tiga kolom menghasilkan dua belas kotak, dan tiap kotak menyimpan satu angka panen. Baris menceritakan satu hari, kolom menceritakan satu buah. Dengan rumah yang tertib, tiap angka langsung punya alamat dan tak ada yang tersesat.',
        },
        {
          objek: 'papanTabelPanen', judul: 'Isi Tabel yang Mulai Bercerita',
          teks: 'Angka-angka mengisi tabel: Senin memuat mangga empat, jambu dua, pisang satu; Selasa mangga tiga, jambu lima, pisang dua; Rabu mangga lima, jambu satu, pisang empat; Kamis mangga dua, jambu dua, pisang tiga. Baca menurun di kolom mangga: empat tambah tiga tambah lima tambah dua — empat belas! Mangga juara panen empat hari ini, sementara jambu dan pisang sama-sama sepuluh.',
        },
        {
          objek: 'papanBacaJudulDulu', judul: 'Jurus Membaca: Judul Dulu, Isi Kemudian',
          teks: 'Papan gerai menuliskan jurus membaca tabel dengan dua langkah: baca dulu judul baris dan kolomnya, baru isi kotaknya dipahami. Kotak yang isinya empat tak bermakna sebelum kita tahu ia milik baris mana dan kolom apa — empat di Senin-kolom mangga berbeda cerita dengan empat di Kamis-kolom pisang. Judul adalah alamat, isi adalah ceritanya. Baca judul dulu, dan tabel langsung berbicara.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tabel Rapi Langsung Bicara!',
          teks: 'Catatan berserakan disusun jadi dua belas kotak tertib, dan juara panen mangga empat belas langsung terbaca dari kolomnya. Owalah, ternyata begini toh — tabel itu almari data: rapi dulu, bercerita kemudian. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-089 · Rentang Data — siang dua ladang bersebelahan ----- */
    'p2-089': {
      tema: 'duaLadangRentang',
      npc: { glif: '13-1', ucap: ['Rata sama,', 'rentang beda!'] },
      stasiun: [
        {
          objek: 'ladangKompakTujuh', judul: 'Ladang Kompak di Kiri',
          teks: 'Siang di dua ladang bersebelahan, tiga tanaman ladang kiri diukur tingginya: enam, tujuh, delapan. Rata-ratanya tujuh — hasil gabungan dua puluh satu dibagi tiga. Ketiga tanamannya hampir sama tinggi, berdiri rapi seperti barisan pasukan yang latihan teratur. Ladang ini disebut kompak: datanya bergerombol dekat, tak ada yang menginjak batas jauh. Semuanya terasa seragam dan tenang.',
        },
        {
          objek: 'ladangMenyebarTujuh', judul: 'Ladang Menyebar di Kanan',
          teks: 'Ladang kanan mengejutkan: tingginya satu, tujuh, dan tiga belas. Jumlahkan semua — dua puluh satu — dibagi tiga: rata-ratanya juga tujuh! Rata-rata kedua ladang sama persis, tapi lihat wajah ladangnya: satu tanaman kerdil jauh, satu menjulang jauh, tak ada yang mirip tetangganya. Rata-rata yang sama ternyata bisa menyembunyikan dua cerita yang berbeda jauh. Ada rahasia yang belum terbongkar.',
        },
        {
          objek: 'garisUkurRentang', judul: 'Mengukur Rentang: Terbesar Kurang Terkecil',
          teks: 'Rahasianya dibongkar dengan satu jurus: rentang, yaitu data terbesar dikurangi data terkecil. Ladang kiri: delapan kurang enam sama dengan dua — rentangnya kecil, data memang rapat. Ladang kanan: tiga belas kurang satu sama dengan dua belas — rentangnya enam kali lipat! Rentang mengukur seberapa berjauhan datanya. Rata-rata menyamarkan, rentang membongkar: dua angka ini selalu bekerja berdua.',
        },
        {
          objek: 'papanRataSamaBeda', judul: 'Papan: Rata-rata Sama, Cerita Beda',
          teks: 'Papan di antara dua ladang menuliskan pelajaran hari ini: rata-rata menceritakan pusat data, rentang menceritakan sebarannya. Keduanya alat bantu yang saling melengkapi — hitungan itu hanya alat, dan membaca keduanya bersama membuat kita jujur pada data. Data kompak dengan rentang kecil terasa teratur; data menyebar dengan rentang besar menuntut perhatian lebih. Satu angka saja tidak cukup cerita.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Rentang Membongkar Rahasia!',
          teks: 'Dua ladang dengan rata-rata sama ternyata menyimpan wajah berbeda, dan rentang membongkarnya: dua banding dua belas. Owalah, ternyata begini toh — terbesar kurang terkecil, dan sebaran data terbaca jujur. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-090 · Tantangan Data Hutan — malam balai riset lima misi ----- */
    'p2-090': {
      tema: 'balaiRisetMalam',
      npc: { glif: '30', ucap: ['Lima misi', 'satu data!'] },
      stasiun: [
        {
          objek: 'balaiRisetLentera', judul: 'Balai Riset Malam Ini Terbuka',
          teks: 'Malam di balai riset hutan, lentera-lentera menyala di atas meja panjang, dan lima misi tertulis di papan pengumuman: satu peneliti muda harus memeriksa data pengamatan burung lima hari terakhir. Semua ilmu yang dipelajari sepanjang penjuru ini — data, rata-rata, median, modus, diagram, tabel, rentang — kini menunggu dipakai bersama. Satu set data, lima pertanyaan; mari buktikan bahwa kumpulan angka bisa menjawab banyak hal.',
        },
        {
          objek: 'papanDataLimaHari', judul: 'Data Lima Hari di Papan Riset',
          teks: 'Papan riset memuat datanya dengan jujur: kunjungan burung lima hari terakhir tercatat tiga, lima, lima, tujuh, sepuluh. Lima angka hasil pengamatan yang setia — pertanyaan yang sama dijawab lima kali, tiap jawaban dicatat. Data sekecil ini sudah cukup kaya: ia siap menjawab lima misi di papan, satu per satu, dengan hitungan yang bisa diperiksa ulang siapa pun.',
        },
        {
          objek: 'misiTotalMeanEnam', judul: 'Misi Satu dan Dua: Total dan Rata-rata',
          teks: 'Misi pertama menjumlah: tiga tambah lima tambah lima tambah tujuh tambah sepuluh sama dengan tiga puluh — total tiga puluh kunjungan dalam lima hari. Misi kedua membaginya: tiga puluh dibagi lima hari sama dengan enam — rata-rata enam kunjungan per hari. Jurus dapur dari penjuru gelas air dipakai lagi di sini: jumlahkan semua, bagi banyaknya. Rata-rata tak pernah kehabisan pekerjaan.',
        },
        {
          objek: 'misiMedianModus', judul: 'Misi Tiga dan Empat: Median dan Modus',
          teks: 'Misi ketiga menyusun data dari kecil ke besar — tiga, lima, lima, tujuh, sepuluh — dan menunjuk yang di tengah: lima, itulah median. Misi keempat menghitung kemunculan: lima muncul dua kali, lebih sering dari angka lain mana pun — itulah modus. Dua jurus dari dua dunia berbeda, halaman batu dan rak sandal, kini dipakai berdampingan di meja riset yang sama. Data yang setia selalu bisa dijawab dengan jurus yang sama.',
        },
        {
          objek: 'misiRentangTujuh', judul: 'Misi Lima: Rentang Data',
          teks: 'Misi terakhir mengukur sebarannya: terbesar sepuluh kurang terkecil tiga sama dengan tujuh — rentangnya tujuh kunjungan, artinya harinya cukup berbeda-beda dari yang tenang sampai yang ramai. Kelima misi selesai dengan hitungan yang jujur dan bisa dicek ulang: hitungan itu hanya alat, penelitilah yang menjaga kejujurannya. Lima pertanyaan, satu set data — dan semua terjawab tanpa sisa.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Satu Data Jawab Lima Misi!',
          teks: 'Total tiga puluh, rata-rata enam, median lima, modus lima, rentang tujuh — satu set data mampu menjawab lima misi sekaligus. Owalah, ternyata begini toh — statistika kecil hanyalah kumpulan jurus jujur untuk membaca angka pengamatan. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-091 · Peluang Itu Apa? — pagi gerbang garis 0-1 ----- */
    'p2-091': {
      tema: 'gerbangKemungkinan',
      npc: { glif: '0-1', ucap: ['Dari nol ke satu,', 'semua mungkin!'] },
      stasiun: [
        {
          objek: 'gerbangGarisNolSatu', judul: 'Gerbang Garis 0 sampai 1',
          teks: 'Pagi di hutan simbol, satu gerbang tua berdiri dengan garis cahaya membentang di atasnya: ujung kiri bernomor nol, ujung kanan bernomor satu. Penjaga gerbang menjelaskan pelan-pelan, garis inilah rumah semua kemungkinan. Nol artinya mustahil — tak akan pernah terjadi. Satu artinya pasti — tanpa ragu sedikit pun. Dan di antara keduanya terbentang dunia mungkin, tempat semua kejutan hidup bermain.',
        },
        {
          objek: 'penandaMustahil', judul: 'Ujung Nol: Mustahil',
          teks: 'Tunjuk ujung kiri gerbang: nol, rumahnya hal yang mustahil. Ikan hutan terbang menyusuri langit? Mustahil — peluangnya nol, sebab ikan tak punya sayap. Angka nol di garis ini bukan penanda sedikit, melainkan penanda tak pernah. Apa pun yang ditaruh di sini tak akan pernah terjadi, berapa pun lama kita menunggu. Ujung nol adalah wilayah paling tenang: tak ada kejutan yang bisa datang dari sana.',
        },
        {
          objek: 'penandaPasti', judul: 'Ujung Satu: Pasti',
          teks: 'Ujung kanan bernomor satu: rumahnya hal yang pasti. Gerbang ini berdiri di atas tanah? Pasti — peluangnya satu, selama gerbangnya tak dipindahkan. Peluang satu artinya tak ada kemungkinan lain: semua hasil berhimpun di satu jawaban yang sama. Beda dengan nol yang tak pernah, satu adalah selalu. Dua ujung garis ini ibarat dua tembok: di antara keduanya, dunia mungkin bermain bebas.',
        },
        {
          objek: 'duniaDiAntara', judul: 'Di Antara Keduanya: Dunia Mungkin',
          teks: 'Di tengah garis itulah hidup terjadi. Koin bisa angka bisa gambar, hujan bisa turun bisa tidak, dadu bisa mendarat di sisi mana pun. Semua bermain di antara nol dan satu — tidak mustahil, belum pasti. Peluang hanyalah cara mengukur: seberapa dekat suatu kejutan berdiri ke nol atau ke satu. Hitungan itu hanya alat, membantu kita mengenali kemungkinan — bukan memaksakan hasil. Garis 0 sampai 1 kini jadi peta kejutan.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Semua Kemungkinan Tinggal di 0 sampai 1!',
          teks: 'Nol mustahil, satu pasti, dan di antaranya terbentang dunia mungkin yang ramai. Owalah, ternyata begini toh — peluang hanyalah alamat di garis itu: makin dekat nol makin langka, makin dekat satu makin dekat pasti. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-092 · Koin: Dua Sisi — siang lapangan bola lempar koin ----- */
    'p2-092': {
      tema: 'lapanganKoin',
      npc: { glif: 'A/G', ucap: ['Dua sisi,', 'sama berkuasa!'] },
      stasiun: [
        {
          objek: 'koinLemparKapten', judul: 'Koin Berputar di Udara',
          teks: 'Siang di lapangan bola hutan, dua kapten tim berdiri di tengah lapangan. Wasit melempar satu koin ke udara — koin berputar dan berputar, kilauannya menyapu rumput. Sebelum jatuh, semua menahan napas: angka atau gambar? Beginilah cara dua tim menentukan siapa yang menendang duluan, dan rahasianya sederhana sekali: koin punya dua sisi yang sama rata, tanpa pihak yang lebih istimewa.',
        },
        {
          objek: 'sisiAngkaGambar', judul: 'Dua Sisi, Dua Kemungkinan',
          teks: 'Koin itu hanya punya dua sisi: sisi angka dan sisi gambar. Tidak ada sisi ketiga yang bersembunyi, tidak ada sisi yang lebih gemuk. Jadi kemungkinannya hanya dua, dan keduanya sama kuat: satu kemungkinan angka dari dua total, ditulis satu per dua. Setengah kemungkinan milik angka, setengah kemungkinan milik gambar — seadil-adilnya pembagian yang pernah ada.',
        },
        {
          objek: 'papanAdilDua', judul: 'Adil untuk Dua Pihak',
          teks: 'Papan pinggir lapangan menuliskan kenapa koin yang dipilih: karena adil untuk dua pihak. Kapten mana pun tak bisa curang — peluang keduanya persis satu per dua, tak lebih sedikit, tak lebih banyak. Waspada: koin adil ini alat untuk menentukan giliran main, bukan alat taruhan; yang seperti itu haram dan tak kami ajarkan. Lemparkan koin untuk mulai permainan, lalu biarkan dua sisi yang sama berkuasa.',
        },
        {
          objek: 'duaTimSetara', judul: 'Setengah Itu Setimbang',
          teks: 'Bayangkan satu kue kemungkinan dibagi dua piring sama besar: satu piring untuk angka, satu untuk gambar. Jika koin dilempar sepuluh kali, biasanya angka dan gambar berbagi hasil hampir sama banyak — tak selalu persis lima-lima, tapi selalu mendekat. Makin banyak lemparan, makin jelas keseimbangannya. Inilah pesan koin: ketika kemungkinan dibagi rata, tak ada pihak yang dirugikan.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Koin Adil karena Dua Sisinya Setara!',
          teks: 'Dua sisi, dua kemungkinan, satu per dua untuk tiap pihak — dan lemparan koin jadi cara paling adil menentukan yang mulai. Owalah, ternyata begini toh — setengah kemungkinan berarti setimbang sempurna. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-093 · Dadu: Enam Kemungkinan — malam papan permainan keluarga ----- */
    'p2-093': {
      tema: 'mejaUlarTangga',
      npc: { glif: '1/6', ucap: ['Enam sisi,', 'sama setia!'] },
      stasiun: [
        {
          objek: 'papanUlarTangga', judul: 'Malam Papan Permainan Keluarga',
          teks: 'Malam di teras rumah pohon, keluarga bola-lentera duduk melingkar di sekeliling papan permainan ular tangga. Di atas meja tergeletak satu dadu kecil — kubus dengan enam sisi. Sebelum giliran pertama dimulai, kakek mengangkat dadu itu tinggi-tinggi dan berkata, kubus kecil ini menyimpan enam kemungkinan, dan semuanya harus kita hormati sama besar. Malam itu, permainan dimulai dari hitungan.',
        },
        {
          objek: 'daduEnamSisi', judul: 'Kubus dengan Enam Sisi',
          teks: 'Dadu adalah kubus: enam sisi rata, tiap sisi menampung satu angka dari satu sampai enam. Saat dilempar, satu dari enam sisi itulah yang muncul menghadap atas. Enam kemungkinan, tiap kemungkinan satu bagian — ditulis satu per enam. Tidak ada sisi yang lebih sering muncul, tidak ada angka yang lebih disayang dadu; tiap sisi menandatangani perjanjian yang sama rata.',
        },
        {
          objek: 'enamKemungkinan', judul: 'Satu per Enam, Enam Kali Enam',
          teks: 'Cek kejujurannya dengan pecahan: enam kemungkinan, tiap sisi satu per enam. Jumlahkan semuanya — satu per enam diulang enam kali sama dengan enam per enam, tepat satu! Artinya tak ada kemungkinan yang hilang dan tak ada yang menyusup masuk. Angka empat muncul sekali dari enam — jarang terasa, tapi tetap mungkin; angka mana pun sama: satu per enam, tak lebih dan tak kurang.',
        },
        {
          objek: 'papanMainAdil', judul: 'Main Adil, Tanpa Taruhan',
          teks: 'Papan dekat meja menuliskan aturan keluarga ini: dadu dilempar untuk keseruan bermain bersama — giliran, langkah, dan tawa — bukan untuk taruhan sepeser pun; yang seperti itu haram dan tak kami ajarkan. Menghitung satu per enam membantu kita menghargai permainan: hasil mana pun datang dengan peluang yang sama, yang menang boleh bangga, yang kalah boleh tertawa. Itulah main yang adil.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Enam Sisi Berarti Enam Peluang Setara!',
          teks: 'Kubus kecil itu ternyata menyimpan enam kemungkinan yang berbagi rata: satu per enam untuk tiap sisi, dan jumlahnya tepat satu. Owalah, ternyata begini toh — dadu setia karena tak memihak sisi mana pun. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-094 · Pasti & Mustahil — fajar puncak bukit ----- */
    'p2-094': {
      tema: 'puncakPasti',
      npc: { glif: '0 1', ucap: ['Ujung nol,', 'ujung satu!'] },
      stasiun: [
        {
          objek: 'matahariTimurPasti', judul: 'Fajar di Puncak Hutan',
          teks: 'Fajar menyingsing di puncak bukit hutan, bola-bola cahaya pendaki menunggu pemandangan terbaik: matahari muncul dari timur, seperti setiap pagi sepanjang ingatan hutan. Seorang pendaki tua bertanya, seberapa yakin matahari terbit dari timur lagi besok? Semua menjawab bersama: seyakin-eyakinya — karena matahari tak pernah sekali pun lupa alamatnya. Itulah peluang satu: pasti, selalu, tanpa kecuali.',
        },
        {
          objek: 'koinBerdiriSulit', judul: 'Koin yang Berdiri Tegak',
          teks: 'Pendaki kecil lalu melempar koin ke permukaan batu rata, dan semua tertawa lepas: koinnya berdiri tegak di tepinya! Seberapa langka kejadian itu? Hampir tak pernah terjadi — peluangnya mendekati nol. Kata hampir penting di sini: secara hitung masih ada celah sekecil debu, tapi begitu kecilnya sehingga seluruh hutan tak akan menunggunya. Nol adalah alamat hal yang tak pernah datang.',
        },
        {
          objek: 'garisDuaUjung', judul: 'Dua Ujung Garis Kemungkinan',
          teks: 'Di puncak, garis cahaya terhampar dari kaki bukit ke lembah: ujung kiri bernilai nol, ujung kanan bernilai satu. Matahari terbit berdiri kokoh di ujung satu; koin yang berdiri tegak nyaris menempel di ujung nol. Dua ujung ini berbeda total, tapi punya kesamaan: keduanya jarang dihuni. Hampir semua kejutan dunia — hujan, koin, dadu, pertemuan — memilih tinggal di tengah garis.',
        },
        {
          objek: 'papanAntaranya', judul: 'Mengenali Dua Ujung dengan Bijak',
          teks: 'Papan puncak menuliskan pelajarannya: kenali mana yang benar-benar pasti, kenali mana yang mustahil, dan jangan menyeragamkan keduanya. Menghitung peluang membantu kita tak mudah kaget: yang pasti tak perlu dipertaruhkan, yang mustahil tak perlu ditunggu. Hitungan itu hanya alat — membantu langkah menjadi tenang. Sisanya adalah dunia mungkin di tengah garis, tempat semua petualangan hidup.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Pasti dan Mustahil Tinggal di Dua Ujung!',
          teks: 'Matahari timur berdiri di peluang satu, koin yang berdiri tegak nyaris menyentuh nol — dua ujung garis kemungkinan kini punya wajah. Owalah, ternyata begini toh — peluang satu berarti selalu, peluang nol berarti tak pernah. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-095 · Roda Putar Peluang — senja festival roda warna ----- */
    'p2-095': {
      tema: 'festivalRoda',
      npc: { glif: '3/4', ucap: ['Irisan lebar,', 'sering terpilih!'] },
      stasiun: [
        {
          objek: 'rodaPutarFestival', judul: 'Roda Putar di Festival Senja',
          teks: 'Senja di festival hutan, satu roda putar raksasa menyala dengan lampu warna-warni. Rodanya dibagi irisan-irisan: merah menguasai tiga perempat roda, biru hanya satu perempat. Anak-anak bola-lentera mengantre memutar, dan penjaga roda berteriak, sebelum memutar, baca dulu rodanya — roda selalu jujur tentang kecenderungannya! Kilauan irisan merah dan biru terlihat dari jauh.',
        },
        {
          objek: 'irisanMerahLebar', judul: 'Irisan Lebar Sering Dihampiri',
          teks: 'Roda berputar pelan lalu berhenti... di merah! Diputar lagi — merah lagi. Tiga perempat roda diwariskan pada merah: setiap jarum berhenti, tiga dari empat kemungkinan arahnya jatuh di wilayah merah. Ditulis tiga per empat. Makin lebar irisan sebuah warna, makin sering ia disinggahi — mata bisa membacanya langsung bahkan sebelum sempat menghitung. Itulah kejujuran roda yang paling terlihat.',
        },
        {
          objek: 'irisanBiruSempit', judul: 'Irisan Sempit Jarang Terpilih',
          teks: 'Biru hanya memegang satu perempat roda: satu dari empat kemungkinan. Jarum kadang-kadang mampir ke biru, tapi hampir selalu melanjutkan perjalanan ke merah. Peluang biru ditulis satu per empat — langka, tapi tetap mungkin! Inilah keindahan roda: warna langka tetap punya kesempatan, hanya saja kesempatannya sempit. Cek jumlahnya: tiga per empat tambah satu per empat, tepat satu roda penuh.',
        },
        {
          objek: 'papanLuasIrisan', judul: 'Luas Irisan Sama dengan Peluang',
          teks: 'Papan festival menuliskan rumus roda: peluang sebuah warna sama dengan luas irisannya dibagi luas roda penuh. Separuh roda berarti separuh peluang, seperempat roda berarti seperempat peluang. Karena itu roda bisa dirancang dengan sengaja: atur lebar irisannya, dan peluangnya akan mengikuti. Hitungan itu hanya alat — roda yang berputar adil dan pemutar yang jujur, itulah yang membuat permainan indah.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Irisan Lebar Berarti Peluang Lebar!',
          teks: 'Tiga perempat roda untuk merah, satu perempat untuk biru — peluang terbaca langsung dari lebar irisannya. Owalah, ternyata begini toh — roda putar hanyalah kue kemungkinan yang dibagi dengan jujur. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-096 · Kantong Kelereng — pagi kios mainan ----- */
    'p2-096': {
      tema: 'kiosKelereng',
      npc: { glif: '3M1B', ucap: ['Tiga merah,', 'satu biru!'] },
      stasiun: [
        {
          objek: 'kantongKelerengEmpat', judul: 'Kantong Kelereng di Kios Mainan',
          teks: 'Pagi di kios mainan hutan, satu kantong kain tergantung di rak dengan tanda tanya besar. Isinya empat kelereng: tiga merah dan satu biru. Pembeli kecil berpikir, kalau aku mengambil satu tanpa melihat, warna apa yang paling mungkin pulang bersamaku? Tangannya menjangkau masuk, tapi rasa tangan tak bisa memilih — yang bisa memilih hanyalah hitungan isi kantong.',
        },
        {
          objek: 'kelerengMerahTiga', judul: 'Tiga dari Empat untuk Merah',
          teks: 'Buka kantongnya dan hitung: tiga kelereng merah dari empat kelereng seluruhnya. Maka peluang merah adalah tiga per empat — tiga jalan menuju merah dari empat jalan yang mungkin. Hampir selalu, tangan yang masuk akan pulang membawa merah. Tiga per empat itu dekat ke ujung satu: sering, biasa, nyaris teman lama. Tapi hati-hati — nyaris satu bukan berarti satu.',
        },
        {
          objek: 'kelerengBiruSatu', judul: 'Satu dari Empat untuk Biru',
          teks: 'Biru hanya punya satu jalan dari empat: peluangnya satu per empat. Langka, istimewa, dan karena itu dirindukan! Saat tangan akhirnya membawa biru keluar, seluruh kios bersorak — kemungkinan yang sempit memang paling meriah saat kejadian. Tiga per empat tambah satu per empat sama dengan empat per empat: tepat satu, tak ada kemungkinan yang kabur dari kantong.',
        },
        {
          objek: 'papanTigaPerEmpat', judul: 'Hitung Isinya, Peluang Terbaca',
          teks: 'Papan kios menuliskan jurusnya: hitung dulu berapa kelereng warna yang dicari, hitung pula seluruh isinya, lalu susun pecahannya — warna yang dicari di atas, jumlah total di bawah. Kantong mana pun kini bisa dibaca tanpa menebak-nebak. Hitungan itu hanya alat; yang membuka kantong dengan niat baik tetap yang menentukan sikapnya. Kantong kelereng adalah kelas peluang pertama yang paling ramah.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Isi Kantong Membocorkan Peluangnya!',
          teks: 'Tiga merah dari empat berarti tiga per empat, satu biru berarti satu per empat, dan jumlahnya tepat satu. Owalah, ternyata begini toh — peluang kantong tak pernah rahasia selama isinya dihitung. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-097 · Peluang sebagai Pecahan — siang kelas hutan ----- */
    'p2-097': {
      tema: 'kelasPecahan',
      npc: { glif: '=1', ucap: ['Semuanya berjumlah', 'tepat satu!'] },
      stasiun: [
        {
          objek: 'papanSemuaPecahan', judul: 'Kelas Kecil di Pinggir Hutan',
          teks: 'Siang di kelas hutan yang berdinding papan angka, pelajaran hari ini menyatukan semua dunia yang baru dijelajahi: koin, dadu, roda, dan kantong kelereng. Guru kelas menuliskan satu kalimat besar: semua peluang adalah pecahan, dan pecahan itu selalu tinggal di antara nol dan satu. Koin satu per dua, dadu satu per enam, kelereng tiga per empat — semuanya kini tampak satu keluarga besar.',
        },
        {
          objek: 'kelerengEnamIsi', judul: 'Contoh Baru: Dua dan Empat',
          teks: 'Kantong baru dibawa masuk: dua kelereng merah dan empat biru, enam seluruhnya. Peluang merah dua per enam, peluang biru empat per enam. Cek ujung-ujungnya: dua per enam lebih besar dari nol — merah mungkin terjadi; empat per enam lebih kecil dari satu — biru belum pasti. Semua pecahan peluang tak pernah keluar dari pagar nol-satu. Itu kontrak yang tak pernah dilanggar pecahan peluang.',
        },
        {
          objek: 'jumlahSelaluSatu', judul: 'Jumlahkan Semuanya: Tepat Satu',
          teks: 'Sekarang jumlahkan semua kemungkinan kantong itu: dua per enam tambah empat per enam sama dengan enam per enam — tepat satu! Koin: satu per dua tambah satu per dua, satu. Roda: tiga per empat tambah satu per empat, satu. Apa pun dunianya, semua kemungkinan berbagi satu kue yang sama dan menghabiskannya sampai remah terakhir. Tak lebih, tak kurang — inilah tanda hitungan peluang yang jujur.',
        },
        {
          objek: 'koinSetengahSetengah', judul: 'Pagar Nol-Satu Penjaga Kejujuran',
          teks: 'Pagar nol-satu berguna untuk memeriksa hitungan: ada peluang yang tertulis tujuh per enam? Mustahil — tak ada yang bisa lebih mungkin daripada pasti. Ada peluang minus? Juga tak mungkin — kemungkinan tak pernah berhutang. Jika jumlah semua peluang bukan satu, pasti ada kemungkinan yang tertinggal atau dobel. Hitungan itu hanya alat, tapi alat ini setia menjaga kejujuran — pecahan peluang yang benar selalu rapi di pagar nol-satu.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Semua Peluang Adalah Pecahan di Pagar 0-1!',
          teks: 'Satu per dua, satu per enam, tiga per empat — semuanya pecahan antara nol dan satu, dan jumlah semuanya selalu tepat satu. Owalah, ternyata begini toh — peluang hanyalah pecahan yang berbagi satu kue kemungkinan. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-098 · Mendaftar Kemungkinan — senja teras dua koin ----- */
    'p2-098': {
      tema: 'terasDuaKoin',
      npc: { glif: 'A-G', ucap: ['Daftar dulu,', 'hitung kemudian!'] },
      stasiun: [
        {
          objek: 'duaKoinLempar', judul: 'Dua Koin di Teras Senja',
          teks: 'Senja di teras rumah daun, dua sahabat bola-lentera melempar dua koin sekaligus dan berdebat soal kemungkinannya. Satu berkata, kemungkinannya cuma dua: dua angka atau campur. Sahabatnya menyipitkan cahayanya, yakin? Maka mereka menemukan cara yang lebih jujur: mendaftar semua hasil satu per satu, tanpa melewatkan satu pun. Selembar kertas dan arang pun disiapkan di meja kecil.',
        },
        {
          objek: 'daftarEmpatHasil', judul: 'Daftarnya Ternyata Empat',
          teks: 'Daftar itu dimulai: koin pertama angka dan koin kedua angka — A-A. Koin pertama angka, koin kedua gambar — A-G. Lalu koin pertama gambar, koin kedua angka — G-A. Terakhir, keduanya gambar — G-G. Hitung barisnya: EMPAT kemungkinan, bukan dua! Rahasianya terkuak: A-G dan G-A terlihat kembar, padahal mereka dua kejadian berbeda — koin pertamanya yang berbeda cerita. Daftar berhasil menangkap si kembar itu.',
        },
        {
          objek: 'hasilCampurDua', judul: 'Campur Menang Dua dari Empat',
          teks: 'Dengan daftar lengkap, peluang langsung terbaca: dua angka satu per empat, dua gambar satu per empat, campur dua per empat — dua kali lipat saudaranya! Tadinya si sahabat mengira campur sama peluangnya dengan dua angka; daftar membongkar kekeliruannya. Menebak membuat kita yakin tanpa bukti, mendaftar membuat kita yakin karena bisa dicek. Empat baris kecil di kertas ternyata lebih kuat dari rasa yakin.',
        },
        {
          objek: 'papanDaftarDulu', judul: 'Jurus: Daftar Dulu, Hitung Kemudian',
          teks: 'Papan teras menuliskan jurus emas penjuru ini: daftar dulu semua kemungkinan, baru hitung peluangnya. Daftar itu seperti menata kursi sebelum pesta — tanpa daftar, satu tamu bisa terlewat dan hitungan melenceng. Hitungan itu hanya alat; daftarlah yang memastikan alat itu dipakai jujur. Besok siapa pun yang melempar dua koin, kertas kecil itu sudah siap: A-A, A-G, G-A, G-G — lengkap, jelas, adil.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Mendaftar Melahirkan Kemungkinan Tersembunyi!',
          teks: 'Dua koin yang katanya hanya punya dua kemungkinan ternyata menyimpan empat — A-G dan G-A ternyata dua tamu berbeda. Owalah, ternyata begini toh — daftar dulu, hitung kemudian, dan tak ada kemungkinan yang lolos. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-099 · Peluang di Sekitar Kita — sore teras langit mendung ----- */
    'p2-099': {
      tema: 'terasMendung',
      npc: { glif: '4/5', ucap: ['Baca tanda,', 'siap payung!'] },
      stasiun: [
        {
          objek: 'langitAwanGelap', judul: 'Langit Mendung di Sore Hari',
          teks: 'Sore di tepi hutan, langit berubah kelabu: awan tebal menggelondong rendah, udara berbau tanah basah, dan burung-burung terbang rendah mencari tempat berlindung. Semua tanda itu sudah lama dikenal penduduk hutan. Tapi tanda saja belum cukup untuk memutuskan — maka dibukalah buku catatan cuaca hutan: dari sepuluh sore terakhir berlangit seperti ini, apa saja yang terjadi?',
        },
        {
          objek: 'sepuluhLangitLalu', judul: 'Catatan Sepuluh Sore Lalu',
          teks: 'Buku catatan menjawab dengan jujur: dari sepuluh sore berlangit mendung seperti ini, delapan kali hujan turun, dua kali hanya berawan lalu cerah kembali. Delapan dari sepuluh ditulis delapan per sepuluh — atau empat per lima. Peluang hujan malam ini kira-kira empat per lima: dekat ke satu, jauh dari nol. Tapi buku itu juga menuliskan dua sore yang selamat — kemungkinan cerah tak pernah benar-benar nol.',
        },
        {
          objek: 'payungSiapSedia', judul: 'Payung yang Siap di Pojok',
          teks: 'Dengan peluang empat per lima, keputusannya mudah: payung diambil dan dibawa. Bukan karena hujan dipastikan datang, melainkan karena kemungkinannya besar dan payung ringan dijinjing. Kalau ternyata hujan tak turun, tak ada yang rugi — hanya payung yang menunggu dengan sabar. Begitulah peluang membantu memilih: bukan menjanjikan hasil, melainkan menyiapkan langkah untuk kemungkinan yang lebih besar.',
        },
        {
          objek: 'papanBacaTanda', judul: 'Membaca Tanda, Tanpa Menjanjikan',
          teks: 'Papan dekat teras menuliskan batas yang penting: kita boleh membaca tanda-tanda langit dan menghitung kemungkinannya dari catatan yang jujur — itu ilmu. Yang tak boleh: mengaku tahu pasti apa yang akan terjadi, sebab langit tetap menyimpan keputusannya sendiri. Hitungan itu hanya alat. Ia membantu kita bawa payung, menanam di musimnya, dan jaga badan — sisanya, biarkan sore menentukan dirinya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Peluang Membantu Kita Siap, Bukan Menjanjikan!',
          teks: 'Delapan dari sepuluh sore mendung membawa hujan, dan empat per lima cukup untuk mengambil payung. Owalah, ternyata begini toh — peluang di sekitar kita hanyalah tanda yang dihitung jujur, agar langkah kita siap. Mudah, bukan?',
        },
      ],
    },

    /* ----- p2-100 · Tantangan Peluang Hutan — malam balai juara lima misi ----- */
    'p2-100': {
      tema: 'balaiPeluang',
      npc: { glif: '10/10', ucap: ['Lima misi', 'penjuru pamungkas!'] },
      stasiun: [
        {
          objek: 'balaiJuaraPeluang', judul: 'Balai Juara Malam Ini Terbuka',
          teks: 'Malam di balai juara hutan, lima lentera menyala di atas meja panjang dan papan pengumuman berkilau: lima misi peluang untuk penjuru pamungkas. Semua ilmu yang dipelajari sepanjang penjuru ini — garis nol-satu, koin, dadu, roda, kantong, pecahan, dan daftar kemungkinan — kini menunggu dipakai bersama. Siapa menyelesaikan kelima misinya dengan hitungan yang jujur, dialah jagoan peluang hutan.',
        },
        {
          objek: 'misiKoinDua', judul: 'Misi Satu dan Dua: Koin dan Dadu',
          teks: 'Misi pertama melempar koin: berapa peluang muncul angka? Dua sisi, satu yang dicari — satu per dua. Misi kedua menggelindingkan dadu: berapa peluang muncul enam? Enam sisi, satu yang dicari — satu per enam. Dua jawaban cepat untuk dua alat main tua; garis nol-satu mengangguk: satu per dua dan satu per enam berdiri rapi di tengah, tak mustahil dan belum pasti. Lentera pertama dan kedua menyala terang.',
        },
        {
          objek: 'misiRodaBiru', judul: 'Misi Tiga: Roda Biru Sempit',
          teks: 'Misi ketiga membawa roda festival: irisan biru hanya seperempat roda, merah tiga perempat. Peluang biru? Satu per empat. Peluang merah? Tiga per empat. Cek penjumlahannya: satu per empat tambah tiga per empat sama dengan satu — roda penuh, tak ada kemungkinan bocor. Lentera ketiga menyala, dan bayangannya jatuh tepat di papan jurus luas irisan yang dipelajari sore festival dulu.',
        },
        {
          objek: 'misiKelerengLima', judul: 'Misi Empat: Kantong Lima Kelereng',
          teks: 'Misi keempat menggoyangkan kantong: dua kelereng merah, tiga biru, lima seluruhnya. Peluang merah dua per lima, peluang biru tiga per lima, jumlahnya lima per lima — tepat satu lagi! Pemeriksa lalu menambahkan ujian kecil: daftarkan hasil lempar dua koin. Empat baris ditulis: A-A, A-G, G-A, G-G — dan peluang dua angka jadi satu per empat. Lentera keempat menyala paling terang malam itu.',
        },
        {
          objek: 'misiDuaKoinSeperempat', judul: 'Misi Lima dan Sertifikat Jagoan',
          teks: 'Misi terakhir menutup semuanya: jelaskan kenapa jumlah semua peluang selalu satu. Jawabannya tertulis di papan balai: karena semua kemungkinan berbagi satu kue yang sama dan menghabiskannya bersama-sama. Hitungan itu hanya alat — yang jagoan bukan yang paling cepat, melainkan yang paling jujur menghitungnya. Sertifikat jagoan peluang ditandatangani lima lentera, dan seluruh hutan bertepuk tangan malam itu.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Penjuru Peluang Tuntas dengan Hitungan Jujur!',
          teks: 'Satu per dua, satu per enam, satu per empat, dua per lima, satu per empat — lima misi, satu penjuru selesai, dan seratus judul Pintu Kedua kini utuh. Owalah, ternyata begini toh — peluang hanyalah kejujuran yang dihitung: daftar dulu, jumlahkan tepat satu, lalu siapkan payung. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-001 · Matematika Itu Apa Sih? — siang cerah, jejak pertama ----- */
    'p1-001': {
      stasiun: [
        {
          objek: 'api', judul: 'Dulu, Sebelum Ada Angka',
          teks: 'Begitu lama sekali yang lalu, seorang gembala belum punya angka untuk menghitung dombanya. Maka tiap satu domba keluar pagi, ia menyimpan satu batu kecil ke dalam kantong. Sorenya domba pulang satu, satu batu pun dikeluarkan lagi. Saat kantong kosong, lega: semua domba aman! Owalah — menghitung ternyata cuma menjodohkan satu-satu.',
        },
        {
          objek: 'tulang', judul: 'Goresan Pertama di Tulang',
          teks: 'Ribuan tahun lalu, manusia menorehkan goresan kecil pada tulang dan kayu: satu goresan artinya satu hari, satu domba, atau satu tangkai padi. Mirip kamu membuat garis di dinding untuk menghitung hari menuju Lebaran. Dari sini lahir gagasan agung: jumlah bisa dituliskan, bukan hanya diingat.',
        },
        {
          objek: 'tablet', judul: 'Angka Mulai Punya Tulisan',
          teks: 'Di kota kuno Babel, orang menekan-nekan tanah liat lunak menjadi tanda angka; di Mesir, mereka menulis di papirus. Kemudian orang India merancang angka 0 sampai 9, dan ilmuwan seperti Al-Khawarizmi membawanya berkeliling dunia hingga menjadi angka yang kamu pakai hari ini. Bentuknya boleh beda-beda, isinya tetap satu: cerita tentang jumlah.',
        },
        {
          objek: 'nol', judul: 'Nol, Pahlawan Kecil',
          teks: 'Nol tampak seperti lingkaran kosong, padahal dialah pahlawan paling berjasa. Berkat nol, angka 1 bisa berdiri di depan menjadi 10, lalu 100, lalu seribu. Ibarat piring kosong yang memberi tempat kue ditata lebih tinggi, nol memberi tempat agar angka lain naik kelas.',
        },
        {
          objek: 'pohon', judul: 'Pola Ada di Mana-mana',
          teks: 'Perhatikan: kelopak bunga, jari di tanganmu, denting air, dan langkah kaki — semuanya berulang dengan aturan tertentu. Matematika adalah bahasa untuk mendengarkan pola-pola itu. Siapa sudah lancar melihat pola, soal apa pun terasa seperti teka-teki yang ramah.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Jadi, Matematika Itu Apa?',
          teks: 'Matematika itu bahasa untuk berpikir tentang bilangan, bentuk, dan pola — lahir dari kebutuhan manusia menghitung, menakar, dan berbagi dengan adil. Begitu polanya ketahuan, semua soal berubah menjadi temuan. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-002 · Berhitung Zaman Batu — senja di padang gembala ----- */
    'p1-002': {
      tema: 'senja',
      npc: { glif: '1', ucap: ['Satu batu,', 'satu domba!'] },
      stasiun: [
        {
          objek: 'api', judul: 'Api Unggun Gembala',
          teks: 'Sore tiba, kawanan domba mulai pulang perlahan. Gembala tua duduk menghangatkan diri di api unggun, sambil menata batu-batu kecil di sampingnya. Itulah cara manusia pertama kali "berhitung" — bukan dengan angka, tapi dengan menjodohkan satu-satu.',
        },
        {
          objek: 'batu', judul: 'Satu Batu, Satu Domba',
          teks: 'Perhatikan tumpukan batu itu: tambah satu domba, masuk satu batu; domba pulang, satu batu dikembalikan. Hitungan tersimpan rapi tanpa perlu menulis apa pun. Trik sesederhana ini ternyata dipakai hampir semua bangsa di dunia.',
        },
        {
          objek: 'kantong', judul: 'Kantong Ingatan Pertama',
          teks: 'Batu-batu hitungan lalu disimpan dalam kantong kulit yang digantung di tiang. Kantong itu seperti memori pertama umat manusia: isi kantong menceritakan isi kandang. Dari sini manusia sadar — jumlah bisa dipegang, dipindah, dan dibandingkan.',
        },
        {
          objek: 'pagar', judul: 'Hitung Tanpa Menghitung',
          teks: 'Ada jurus yang lebih lincah lagi: lepas domba satu per satu lewat pintu pagar, sambil jari menekuk satu-satu. Saat semua jari sudah menekuk, pas! Domba dan jari habis bersama. Menjodohkan satu-satu seperti inilah bibit dari semua berhitung.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Ternyata Begini!',
          teks: 'Berhitung zaman batu ternyata sesederhana itu: domba dijodohkan dengan batu, batu dijodohkan dengan jari. Setiap anak yang menghitung permen di genggaman sedang mengulang kisah ribuan tahun itu. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-003 · Kisah Al-Khawarizmi — malam di Baitul Hikmah ----- */
    'p1-003': {
      tema: 'malam',
      npc: { glif: 'A', ucap: ['Langkah rapi,', 'hasil rapi!'] },
      stasiun: [
        {
          objek: 'menara', judul: 'Rumah Para Ilmuwan',
          teks: 'Di kota Baghdad berdiri Baitul Hikmah, rumah bagi para pencinta ilmu. Malam-malam mereka dihabiskan membaca, menghitung, dan saling bertanya di bawah cahaya lentera. Salah satu penghuninya bernama Al-Khawarizmi.',
        },
        {
          objek: 'gulungan', judul: 'Kitab yang Merapikan Dunia',
          teks: 'Al-Khawarizmi menulis kitab tentang merapikan hitungan: cara menambah, mengurang, dan menyelesaikan soal langkah demi langkah. Gulungan-gulungan itu kemudian berlayar ke benua lain dan mengubah cara seluruh dunia berhitung.',
        },
        {
          objek: 'langkah', judul: 'Resep Rapi Bernama Algoritma',
          teks: 'Cara berpikirnya berupa langkah yang tertib: kerjakan ini dulu, baru itu, lalu selesai. Namanya diabadikan menjadi kata ALGORITMA — resep langkah rapi yang kini dipatuhi setiap komputer di dunia. Kata yang kamu ucapkan sehari-hari ternyata nama orang!',
        },
        {
          objek: 'kotak', judul: 'Al-Jabr, Menata Kotak Kosong',
          teks: 'Ia juga menulis tentang al-jabr: menyusun ulang kotak-kotak yang isinya belum diketahui, sampai jawabannya ketahuan. Ilmu itu kelak dinamai ALJABAR. Owalah — ternyata menyelesaikan soal ibarat melengkapi kotak yang rapi!',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Warisan yang Masih Hidup',
          teks: 'Setiap kali sebuah mesin mengerjakan langkah dengan tertib, di sanalah jejak Al-Khawarizmi masih hidup. Ilmuwan tekun dan jujur itu membuktikan: ilmu yang bermanfaat bisa melampaui zamannya berabad-abad. Owalah, ternyata begini toh — cukup merapikan langkah, namanya diabadikan dunia. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-004 · Si Nol, Sang Pahlawan Kecil — senja ungu penuh angka ----- */
    'p1-004': {
      tema: 'ungu',
      npc: { glif: '0', ucap: ['Nol itu', 'berjasa!'] },
      stasiun: [
        {
          objek: 'lubang', judul: 'Lingkaran Kosong yang Dibenci',
          teks: 'Dulu banyak orang menganggap nol aneh: "kosong kok ditulis?" Bahkan ada tempat yang melarangnya. Padahal sebuah lingkaran kecil ini menyimpan kekuatan terbesar di dunia angka.',
        },
        {
          objek: 'papan10', judul: 'Trik 1 Jadi 10',
          teks: 'Taruh 1 di belakang nol: jadi 10. Taruh lagi: 100. Nol ibarat tangga ajaib — tiap satu nol membuat angka naik satu lantai. Satu lingkaran kecil, tangganya tinggi sekali!',
        },
        {
          objek: 'piring', judul: 'Piring Kosong Penata Kue',
          teks: 'Ibaratnya begini: piring kosong bukan berarti tak berguna. Justru karena kosong, kue bisa ditata rapi bertingkat. Nol memberi tempat duduk bagi angka lain supaya nilainya jelas dan tidak ketukar-ketukir.',
        },
        {
          objek: 'menaraAngka', judul: 'Menara Angka Tanpa Ujung',
          teks: 'Berkat nol, manusia bisa menulis angka sebesar apa pun tanpa mengarang lambang baru: 10, 100, 1.000, 1.000.000. Bayangkan kalau tiap naik tingkat harus membuat simbol baru — repot sekali, kan?',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Pahlawan Kecil Dunia Angka',
          teks: 'Jadi kalau kamu menulis 100 di buku, ingatlah lingkaran kecil itu: pahlawan yang diam-dia menopang semua angka besar. Owalah, ternyata kosong pun bisa seberarti itu — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-005 · Piramida & Tali 3-4-5 — gurun terik, langit kuning ----- */
    'p1-005': {
      tema: 'gurun',
      npc: { glif: '3', ucap: ['Tali 3-4-5,', 'sudut tegak!'] },
      stasiun: [
        {
          objek: 'tali', judul: 'Tali Bersimpul di Gurun',
          teks: 'Di padang gurun Mesir kuno, para tukang bangunan memegang tali panjang bersimpul: simpul-simpulnya berjarak sama. Dari alat sesederhana ini, bangunan paling megah di dunia berhasil berdiri.',
        },
        {
          objek: 'sudut', judul: 'Jurus Simpul 3-4-5',
          teks: 'Bentuklah tali menjadi tiga sisi: 3 ruas, 4 ruas, dan 5 ruas — tiap ruas sama panjang. Ajaibnya, sudut di antara sisi 3 dan sisi 4 selalu tegak lurus — rapi seperti buku siku. Tukang gurun memakainya dalam pekerjaannya tanpa mesin apa pun.',
        },
        {
          objek: 'bata', judul: 'Baris Rapi, Dinding Tegak',
          teks: 'Bata demi bata dipasang mengikuti sudut tali itu. Karena sudutnya benar-benar tegak, dinding tidak miring walau naik puluhan meter. Kerapian itu lahir dari hitungan, bukan dari kebetulan.',
        },
        {
          objek: 'piramidaKecil', judul: 'Piramida Berdiri Megah',
          teks: 'Beginilah piramida tetap kokoh sampai ribuan tahun: dasar datar, sudut tegak, tinggi terukur. Bangunannya rumit, alatnya sederhana — cukup tali bersimpul, tim kerja teliti, dan kesabaran luar biasa.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Rumus Kecil, Karya Besar',
          teks: 'Trik 3-4-5 yang konon mereka pakai kini kita kenal sebagai keajaiban segitiga siku-siku. Owalah — alat paling agung di balik piramida ternyata cuma tali! Hitungan kecil bisa menopang karya besar. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-006 · Angka Romawi yang Aneh — kota batu berkabut ----- */
    'p1-006': {
      tema: 'kota',
      npc: { glif: 'X', ucap: ['I, II, III...', 'capek ya!'] },
      stasiun: [
        {
          objek: 'kolom', judul: 'Kota Batu Berangka Pahat',
          teks: 'Bangsa Romawi membangun kota megah dari batu, dan angka mereka dipahat di dinding: I, II, III, V, X. Terlihat gagah dan anggun — tapi coba cobalah menghitung dengannya, rasakan sendiri.',
        },
        {
          objek: 'papanRX', judul: 'Menambah Itu Melelahkan',
          teks: 'Ingin menulis 8? Harus VIII. Ingin 49? XLIX — campur aduk kurang dan tambah. Tanpa nilai tempat, angka besar berubah jadi goresan panjang. Sedangkan angka kita cukup digeser posisinya: 9, 90, 900.',
        },
        {
          objek: 'jamMatahari', judul: 'Jam Matahari Kuno',
          teks: 'Makanya penunjuk waktu mereka memakai bayangan matahari, bukan hitungan kilat. Mereka hebat membangun jalan dan akuaduk — tapi urusan berhitung bisa bikin jari kram!',
        },
        {
          objek: 'kosong', judul: 'Mereka Tak Punya Nol',
          teks: 'Paling lucu dari semuanya: angka Romawi tidak punya nol. Ada panggung batu, tapi tanpa pemainnya. Tanpa nol, tidak ada 10, 100, atau seribu yang mudah ditulis.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Terima Kasih, Angka Kita',
          teks: 'Karena itulah dunia perlahan beralih ke angka 0-9 yang ringan dihitung. Coba hitung 23 + 45 pakai gaya Romawi, lalu pakai angka kita — rasakan bedanya! Owalah, angka yang ringan itu hadiah. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-007 · Abakus, Kalkulator Kuno — ruang kayu hangat ----- */
    'p1-007': {
      tema: 'kayu',
      npc: { glif: '+', ucap: ['Geser butir,', 'hitung cepat!'] },
      stasiun: [
        {
          objek: 'abakus', judul: 'Bingkai Ajaib Berbutir',
          teks: 'Sebelum ada kalkulator, ada abakus: bingkai kayu berisi butir yang bisa digeser di sepanjang batangnya. Pedagang tua di pasar memakainya lebih cepat daripada orang menghitung pakai kertas!',
        },
        {
          objek: 'kelereng', judul: 'Setiap Butir Ada Tempatnya',
          teks: 'Batang pertama untuk satuan, berikutnya untuk puluhan, lalu ratusan. Butir digeser ke atas berarti dihitung, turun berarti dilepas. Posisi butir menggantikan angka tertulis — angka yang bisa dipegang!',
        },
        {
          objek: 'geser', judul: 'Geser Kiri, Geser Kanan',
          teks: 'Tambah 10? Geser satu butir di batang puluhan. Kurang 5? Turunkan butirnya kembali. Hitungan menjadi permainan tangan yang jeli dan ringan — dan hampir tak pernah salah jika telaten.',
        },
        {
          objek: 'kalkulator', judul: 'Dari Kayu ke Saku',
          teks: 'Zaman berganti, ilmu abakus menurun ke mesin hitung, lalu kalkulator, lalu komputer. Tapi kalau dipikir-pikir, butir yang digeser dan angka di dalam komputer tetap satu keluarga: aturan nilai tempat.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Kalkulator Pertama di Dunia',
          teks: 'Owalah — kalkulator pertama ternyata sekadar kayu dan butir! Kadang alat paling sederhana justru paling tahan lama. Di beberapa toko tua, bunyi klik abakus masih terdengar sampai hari ini. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-008 · Kisah Pi yang Tak Selesai — malam penuh lingkaran ----- */
    'p1-008': {
      tema: 'malam2',
      npc: { glif: '3', ucap: ['3,14', 'terus terus!'] },
      stasiun: [
        {
          objek: 'roda', judul: 'Lingkaran yang Menggoda',
          teks: 'Para pengukur zaman kuno penasaran: seberapa panjang sih keliling lingkaran? Mereka memutar roda, menghitung langkahnya, dan menemukan keanehan yang sama persis di setiap roda. Apa itu?',
        },
        {
          objek: 'benang', judul: 'Benang Pembungkus Ajaib',
          teks: 'Caranya sederhana: bungkus lingkaran dengan benang, lalu tarik benang itu melintasi tengah lingkaran. Hasilnya selalu sama: keliling itu sekitar tiga kali setengah diameternya — di roda apa pun, sebesar apa pun!',
        },
        {
          objek: 'papan314', judul: '3,14 yang Tak Pernah Selesai',
          teks: 'Angka itu lalu dinamai pi: 3,14 dan terus tanpa ujung, tanpa pola yang berulang. Manusia berlomba memperkirakan angkanya sampai hari ini, dan pi tetap setia tak selesai. Angka paling rajin bekerja sedunia!',
        },
        {
          objek: 'rodaKecil', judul: 'Pi Ada di Mana-mana',
          teks: 'Setiap lingkaran memakai pi yang sama: piring di meja, roda sepeda, matahari yang tampak bulat, sampai gelombang air yang melingkar. Dua benda bulat berbeda ukuran, satu angka rahasia yang sama.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Angka Paling Setia Sedunia',
          teks: 'Pi seperti sahabat yang tak pernah putus di tengah jalan: 3,14159... terus dan terus menemani semua lingkaran. Owalah — ternyata rahasia seluruh lingkaran di dunia dipegang satu angka setia ini — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-009 · Timbangan Pasar & Kejujuran — pasar siang ramai ----- */
    'p1-009': {
      tema: 'pasar',
      npc: { glif: '=', ucap: ['Timbang jujur,', 'hati tenang!'] },
      stasiun: [
        {
          objek: 'neraca', judul: 'Neraca di Ujung Pasar',
          teks: 'Di pasar yang ramai, barang ditimbang dengan neraca: dua piring menggantung saling menyeimbang. Di itulah kejujuran diuji — sedikit saja beratnya dibohongi, orang lain ikut dirugikan.',
        },
        {
          objek: 'takaran', judul: 'Takaran yang Boleh Dipercaya',
          teks: 'Satu gelas takaran harus sama untuk semua pembeli: pagi, siang, maupun sore. Das beras, liter minyak, sero gandum — ukuran yang jujur membuat pembeli dan penjual sama-sama tenang hatinya.',
        },
        {
          objek: 'koin', judul: 'Harga yang Adil',
          teks: 'Timbangan jujur menolong menetapkan harga yang adil: tidak mengambil hak orang lain, tidak pula merugi sendiri. Muamalah yang bersih seperti itu membawa keberkahan bagi kedua pihak.',
        },
        {
          objek: 'tendaKecil', judul: 'Reputasi Penjual Jujur',
          teks: 'Pembeli datang lagi dan lagi ke tenda yang tak pernah curang. Kepercayaan itu tak bisa dibeli sekaligus — ia tumbuh pelan-pelan dari timbangan yang setiap hari tetap lurus.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Matematika Penjaga Kejujuran',
          teks: 'Menimbang, menakar, menghitung — semua itu matematika. Dan matematika yang jujur menjaga muamalah tetap bersih. Owalah — ternyata angka juga punya akhlak! Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-010 · Matematika Masa Depan — malam peluncuran antariksa ----- */
    'p1-010': {
      tema: 'future',
      npc: { glif: '?', ucap: ['Masa depan', 'menantimu!'] },
      stasiun: [
        {
          objek: 'roket', judul: 'Roket Menunggu Hitungan',
          teks: 'Roket tidak boleh terbang dengan nekat: setiap bahan bakar, arah, dan detik peluncuran dihitung matang dulu. Satu angka meleset sedikit saja, lintasannya bisa jauh tersesat di angkasa.',
        },
        {
          objek: 'satelit', judul: 'Juru Foto di Angkasa',
          teks: 'Satelit mengorbit bumi dengan takaran yang cermat: terlalu lambat ia jatuh, terlalu cepat ia kabur. Berkat hitungan yang pas itu, peta, cuaca, dan sinyal bisa sampai ke genggamanmu.',
        },
        {
          objek: 'robot', judul: 'Robot Murid Paling Patuh',
          teks: 'Robot hanya tahu apa yang diajarkan lewat langkah rapi: algoritma. Ia patuh sempurna — kalau hitungannya benar hasilnya indah, kalau salah, dia dengan setia menabrak dinding. Algoritma yang baik dimulai dari hitungan yang benar.',
        },
        {
          objek: 'konstelasi', judul: 'Peta Bintang Para Penjelajah',
          teks: 'Kapal antariksa menavigasi dengan membaca posisi bintang dan jarak antar planet — matematika murni yang tergambar di langit malam. Peta langit semacam itu selalu ditulis dengan angka.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Masa Depan Dimulai Hari Ini',
          teks: 'Roket, satelit, robot, dan bintang-bintang itu sedang menunggu generasi yang gemar berhitung. Owalah — masa depan ternyata dimulai dari angka yang kamu pelajari hari ini. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-011 · Kenalan 0 Sampai 9 — pagi lembut di Kampung Angka ----- */
    'p1-011': {
      tema: 'kampung',
      npc: { glif: '9', ucap: ['Sepuluh sahabat,', 'cukup semuanya!'] },
      stasiun: [
        {
          objek: 'gerbang9', judul: 'Gerbang Kampung Angka',
          teks: 'Di ujung jalan berdiri sebuah kampung kecil bernama Kampung Angka. Penduduknya cuma sepuluh: 0, 1, 2, sampai 9. Kelihatan sedikit? Padahal siapa pun di alam semesta — dari harga permen sampai jumlah bintang — bisa ditulis memakai sepuluh sahabat ini.',
        },
        {
          objek: 'rumahAngka', judul: 'Sepuluh Rumah Mungil',
          teks: 'Setiap angka punya rumah sendiri: rumah 0 di ujung jalan, rumah 9 di ujung satunya. Melangkah dari pintu ke pintu, kamu berkenalan satu-satu: nol, satu, dua, tiga... Sepuluh teman, semuanya ramah, tak ada yang sombong.',
        },
        {
          objek: 'lampuJalan', judul: 'Tidak Boleh Ada yang Hilang',
          teks: 'Dulu ada yang menyarankan, "Buang saja angka 7, jarang terpakai." Begitu 7 pergi, menulis 7 apel, 17 kelereng, sampai 70 hari langsung kacau! Maka penduduk kampung sepakat: sepuluh sahabat itu harus lengkap, tak boleh satu pun hilang.',
        },
        {
          objek: 'papanSahabat', judul: 'Bersatu Jadi Nama Baru',
          teks: 'Sahabat-sahabat kecil itu bisa berjejer membentuk nama baru: 3 dan 1 menjadi 31, 9 dan 9 menjadi 99. Coba kira-kira, berapa banyak nama angka yang bisa lahir dari sepuluh sahabat? Jawabannya: tak pernah habis!',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Cukup Sepuluh!',
          teks: 'Sepuluh angka saja, semua bilangan di dunia bisa ditulis — dari nol sampai milyaran. Tidak perlu seribu lambang, cukup sepuluh sahabat yang setia. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-012 · Berhitung Maju 1-10 — fajar di Gunung Tangga ----- */
    'p1-012': {
      tema: 'tangga',
      npc: { glif: '2', ucap: ['Satu langkah,', 'naik satu!'] },
      stasiun: [
        {
          objek: 'kakiTangga', judul: 'Kaki Tangga Batu',
          teks: 'Di kaki gunung terbentang tangga batu raksasa. Anak tangga pertama bertuliskan 1. Dulu gembala menghitung dombanya, sekarang kamu menghitung langkahmu — semua petualangan berhitung dimulai dari anak tangga pertama ini.',
        },
        {
          objek: 'batuAngka', judul: 'Tiap Langkah Naik Satu',
          teks: 'Naik ke anak tangga berikutnya: 2. Satu langkah lagi: 3. Berhitung maju artinya selalu menambah satu di setiap anak tangga — seperti naik tangga sungguhan, tak bisa loncat-loncat sebelum kuat. Perlahan, tapi pasti sampai.',
        },
        {
          objek: 'jedaBunga', judul: 'Istirahat di Anak Tangga Lima',
          teks: 'Di anak tangga kelima tumbuh bunga kecil. Berhenti sejenak boleh, asal ingat posisi: tadi 4, sekarang 5, berikutnya 6. Yang penting bukan cepatnya — yang penting tak ada anak tangga yang terlewat.',
        },
        {
          objek: 'puncakBendera', judul: 'Puncak Sepuluh',
          teks: 'Sepuluh anak tangga, dan di puncak sebuah bendera berkibar: 10! Menoleh ke bawah, semua angka yang kamu lewati berbaris rapi: 1, 2, 3, 4, 5, 6, 7, 8, 9. Jarak satu ke angka sesudahnya selalu satu kaki — tak lebih, tak kurang.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Naiknya Mudah!',
          teks: 'Berhitung maju ternyata cuma soal tangga: tiap langkah naik satu. Kalau nanti ada soal "hitung 1 sampai 10", bayangkan kakimu menapak anak tangga satu-satu. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-013 · Berhitung Mundur 10-0 — fajar bukit peluncuran ----- */
    'p1-013': {
      tema: 'fajar',
      npc: { glif: '!', ucap: ['Sepuluh...', 'nol, terbang!'] },
      stasiun: [
        {
          objek: 'papanMundur', judul: 'Papan Hitung Mundur',
          teks: 'Di puncak bukit berdiri papan kayu besar: 10, 9, 8, sampai 0. Para penjaga peluncuran membaca papan seperti ini sebelum roket lepas landas. Hitung mundur bukan berhitung terbalik asal-asalan — dia tetap rapi, hanya melangkah turun satu-satu.',
        },
        {
          objek: 'roketKecil', judul: 'Roket Kecil Menunggu',
          teks: 'Roket kecil di padang ini sudah siap. Ia tak boleh terbang sebelum hitungan tuntas: 10... 9... 8... Tiap angka lebih kecil satu dari sebelumnya, menuju momen yang ditunggu-tunggu. Kesabaran selalu punya hadiah besar.',
        },
        {
          objek: 'benderaTurun', judul: 'Meluncur Turun Lewat Bendera',
          teks: 'Saking serunya, ada yang berlatih lewat bukit: kereta luncur melewati bendera 10, 9, 8, 7... Makin turun makin seru, tapi angkanya tetap tertib: dari 10 ke 9, dari 9 ke 8 — selalu kurang satu.',
        },
        {
          objek: 'nolNyala', judul: 'Nol: Detik Paling Seru',
          teks: '...3, 2, 1, 0 — TERBANG! Lihat, nol yang tadinya dianggap kosong justru jadi bagian paling penting di hitung mundur: ia menandai mulainya aksi. Tanpa menyentuh nol, roket tak boleh naik.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Terbanglah!',
          teks: 'Berhitung mundur ternyata tangga yang sama dengan berhitung maju — cuma kamu turun, bukan naik: kurang satu tiap langkah. Kalau ingin menghitung mundur saat lomba dimulai, kamu sudah punya jurusnya. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-014 · Nilai Tempat: Puluhan — siang pelabuhan kapal ----- */
    'p1-014': {
      tema: 'kapal',
      npc: { glif: 'K', ucap: ['Pindah kursi,', 'kuasa naik!'] },
      stasiun: [
        {
          objek: 'dermaga', judul: 'Dermaga Kapal Angka',
          teks: 'Di dermaga bersandar sebuah kapal khusus bernama Puluhan. Aturan lautnya satu saja: angka yang duduk di kursi depan menjadi kapten. Kursi di kapal ini bukan tempat duduk biasa — kursi menentukan kekuatan.',
        },
        {
          objek: 'kursiKapten', judul: 'Angka 1 Naik ke Kursi Kapten',
          teks: 'Angka 1 semula duduk di kursi belakang: nilainya masih 1, kecil dan sederhana. Begitu pindah ke kursi kapten di haluan — ta-da! — kekuatannya langsung sepuluh kali lipat: 10. Angkanya sama, kursinya yang mengubah segalanya.',
        },
        {
          objek: 'muatan', judul: 'Muatan Sepuluh Peti',
          teks: 'Kenapa bisa sepuluh kali? Kursi kapten mengurus muatan sepuluh peti sekaligus, sedangkan kursi belakang hanya mengurus satu peti. Nilai tempat itu sebenarnya soal tanggung jawab: makin depan kursinya, makin banyak yang diurus.',
        },
        {
          objek: 'duaKursi', judul: 'Dua Kursi Berdampingan',
          teks: 'Sekarang dudukkan 1 dan 2 berdampingan menjadi 12. Angka 1 di kursi puluhan mengurus sepuluh, angka 2 di kursi satuan mengurus dua. Badan mereka sama kecilnya, tapi posisi membuat kekuatannya beda jauh.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kursi Itu Hebat!',
          teks: 'Jadi setiap kali kamu menulis 10, ingat: itu angka 1 yang baru saja naik ke kursi kapten. Posisi bisa mengubah kekuatan sepuluh kali lipat — seperti kapten di atas kapal. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-015 · Ratusan & Ribuan — malam panggung tirai merah ----- */
    'p1-015': {
      tema: 'panggung',
      npc: { glif: '*', ucap: ['Naik baris,', 'besar 10 kali!'] },
      stasiun: [
        {
          objek: 'tiket', judul: 'Tiket Pertunjukan Angka',
          teks: 'Malam ini panggung besar menyala dengan spanduk: Pertunjukan Kekuatan Angka. Tugasmu satu: menyaksikan kursi demi kursi naik, dari yang paling kecil sampai yang paling agung. Pegang tiketmu — lampu mulai meredup.',
        },
        {
          objek: 'kursi1', judul: 'Kursi Paling Bawah: Satuan',
          teks: 'Panggung paling bawah dihuni kursi satuan. Angka di sini mengurus satu-satu — kecil, tapi jujur dan tak pernah sombong. Tanpa kursi satuan, tidak akan pernah ada 1, 2, sampai 9. Semua pertunjukan dimulai dari dia.',
        },
        {
          objek: 'kursi10', judul: 'Naik Satu Baris: Puluhan',
          teks: 'Geser satu baris ke kiri, kekuatan melonjak sepuluh kali! Angka 1 yang sama, begitu duduk di kursi puluhan nilainya jadi 10. Dari kursi inilah 20, 30, sampai 90 lahir. Sorot lampu menyala untuknya.',
        },
        {
          objek: 'kursi1000', judul: 'Baris Teratas: Ratusan & Ribuan',
          teks: 'Naik lagi: kursi ratusan — 1 kini bernilai 100. Naik sekali lagi: kursi ribuan — 1 kini bernilai 1.000! Setiap naik satu baris, kekuatannya membesar sepuluh kali. Barisnya tinggi, tapi aturannya tetap sederhana.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Posisi Itu Hebat!',
          teks: 'Ratusan, ribuan, bahkan jutaan — semuanya cuma angka 1 yang pindah kursi baris demi baris. Tidak ada trik yang rumit, hanya nilai tempat yang tertib. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-016 · Angka Genap Berpasangan — siang halaman jemuran ----- */
    'p1-016': {
      tema: 'jemur',
      npc: { glif: '4', ucap: ['Berpasangan', 'rapi!'] },
      stasiun: [
        {
          objek: 'jemuran', judul: 'Jemuran Kaos Kaki',
          teks: 'Halaman ini dipenuhi tali jemuran yang bergoyang. Kaos kaki dijemur berpasangan dua-dua, tak ada yang sendirian. Hitung pasangannya sambil menunjuk: 2, 4, 6, 8 — selamat datang di keluarga genap.',
        },
        {
          objek: 'rakSepatu', judul: 'Rak Sepatu yang Rapi',
          teks: 'Sepatu pun punya aturan sama: tiap sepatu pasti punya teman kaki. Jumlah yang bisa berpasangan rapi tanpa sisa itulah angka genap — 2, 4, 6, 8. Kalau ada yang menganggur tanpa pasangan, dia bukan anggota keluarga genap.',
        },
        {
          objek: 'becakRoda', judul: 'Roda Becak yang Agak Lain',
          teks: 'Nah, becak punya tiga roda: dua di samping, satu di depan. Coba pasangkan dua-dua — tersisa satu roda tanpa teman! Tiga itu bukan genap. Angka genap adalah yang habis berpasangan sampai tak tersisa satu pun.',
        },
        {
          objek: 'tumpukKue', judul: 'Kue Dibagi Dua Sama Rata',
          teks: 'Enam kue mau dibagi untuk dua anak. Karena 6 itu genap, pembagiannya mulus: tiap anak dapat tiga, tak ada yang menangis iri. Angka genap memang pandai berbagi dua sama rata tanpa sisa.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Genap Itu Pas!',
          teks: 'Angka genap ternyata cuma satu hal: bisa berpasangan dua-dua sampai habis — seperti sepatu dan kaos kaki. Lihat jemuran di rumahmu nanti, kamu sudah tahu namanya. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-017 · Angka Ganjil Sisa Satu — sore taman lampion ----- */
    'p1-017': {
      tema: 'taman',
      npc: { glif: '5', ucap: ['Sisa satu,', 'tetap seru!'] },
      stasiun: [
        {
          objek: 'bangkuTaman', judul: 'Bangku di Taman Sore',
          teks: 'Sore ini lima penduduk kecil duduk berpasangan dua-dua di bangku taman. Empat mendapat teman, satu duduk sendiri sambil menikmati angin. Itulah tanda khas angka ganjil: selalu sisa satu saat berpasangan.',
        },
        {
          objek: 'kausSendiri', judul: 'Satu Kaus yang Menganggur',
          teks: 'Tiga kaus kaki dijemur: dua berjodoh rapi, satu menyangkut sendiri menganggur. Jumlah yang selalu sisa satu itu bernama ganjil: 1, 3, 5, 7, 9. Si kaus menganggur sebenarnya beruntung — dia jadi tanda matematika!',
        },
        {
          objek: 'manikGanjil', judul: 'Manik Tujuh Butir',
          teks: 'Tujuh manik disusun berpasangan: satu pasang, dua pasang, tiga pasang — dan satu manik keemasan tersisa di ujung. Tiga pasang tambah satu sama dengan tujuh. Begitulah ganjil: selalu pasangan penuh ditambah satu.',
        },
        {
          objek: 'lampionPohon', judul: 'Lampion Dua Pohon',
          teks: 'Lima lampion hendak digantung di dua pohon. Pohon ini dapat dua, pohon itu dapat tiga — tak pernah sama rata, selalu ada yang lebih. Makanya orang suka menggantung lampion ganjil: 5, 7, 9 — biar ada satu tepat di tengah sebagai penyeimbang.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Sisa Satu Itu Ganjil!',
          teks: 'Genap dan ganjil ternyata cuma soal pasangan: habis dibagi dua itu genap, sisa satu itu ganjil. Sepatu di rak dan kaus di jemuran sudah mengajarkannya duluan. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-018 · Membandingkan Angka — siang toko permen ----- */
    'p1-018': {
      tema: 'permen',
      npc: { glif: '>', ucap: ['Mulut buka,', 'arah banyak!'] },
      stasiun: [
        {
          objek: 'toplesDua', judul: 'Dua Toples Permen',
          teks: 'Di toko permen ada dua toples: toples merah berisi 7, toples biru berisi 9. Mana yang lebih banyak? Hitung satu-satu, atau pasangkan dua-dua — toples biru ternyata punya dua ekstra. Sembilan lebih banyak dari tujuh.',
        },
        {
          objek: 'tandaBuka', judul: 'Tanda Mulut yang Lapar',
          teks: 'Untuk menuliskannya dipakai tanda > dan < — seperti mulut yang lapar: selalu terbuka lebar ke arah yang lebih banyak. 9 > 7 berarti sembilan lebih besar; 7 < 9 berarti tujuh lebih kecil. Mulutnya tak pernah salah arah!',
        },
        {
          objek: 'tandaSama', judul: 'Kalau Sama Banyak?',
          teks: 'Kadang kedua toples berisi sama: 8 dan 8. Maka tanda = maju ke panggung: dua garis kembar sejajar, artinya sama banyak. Tidak ada pihak yang menang, tidak ada yang kalah — cocok untuk berbagi adil.',
        },
        {
          objek: 'papanHarga', judul: 'Membandingkan itu Berguna',
          teks: 'Tanda-tanda ini bukan main-main saja: penjual memakainya menulis harga mana yang lebih murah, Ibu memakainya menimbang takaran beras mana yang lebih berat. Rumusnya satu: hitung dulu dengan jujur, baru bandingkan.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Mulutnya Tahu Arah!',
          teks: 'Membandingkan angka ternyata sesederhana itu: yang banyak ditelan mulut terbuka, yang sama banyak dijodohkan garis kembar. Besok saat memilih dua tumpukan permen, kamu sudah tahu tandanya. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-019 · Urutan: Pertama & Kedua — siang lapangan lomba ----- */
    'p1-019': {
      tema: 'lomba',
      npc: { glif: '1', ucap: ['Juara itu', 'posisi!'] },
      stasiun: [
        {
          objek: 'garisFinish', judul: 'Garis Finis Merah Putih',
          teks: 'Di lapangan ini garis finis membelah angin. Lima pelari berlari kencang, dan yang pertama menyentuh pita itulah juara. Perhatikan: urutan tidak menanyakan besar atau kecilnya pelari — hanya siapa tiba lebih dulu.',
        },
        {
          objek: 'podium', judul: 'Podium Juara 1, 2, 3',
          teks: 'Di podium, paling tinggi untuk juara pertama, berikutnya juara kedua, lalu juara ketiga. Di sini angka tidak menghitung jumlah — dia menyebut posisi. Namanya bilangan urutan: pertama, kedua, ketiga.',
        },
        {
          objek: 'nomorDada', judul: 'Nomor di Dada Pelari',
          teks: 'Pelari memakai nomor dada: 4, 5, 6. Nomor itu bukan nilai dan bukan jumlah — dia cuma nama panggilan. Pelari bernomor dada 7 boleh saja finis pertama! Jumlah dan posisi memang dua pekerjaan yang berbeda.',
        },
        {
          objek: 'bukuHalaman', judul: 'Urutan Ada di Mana-mana',
          teks: 'Pulang nanti kamu akan bertemu urutan terus: halaman pertama buku, lantai pertama rumah, tanggal pertama bulan. Semuanya menunjuk posisi — bukan menghitung banyaknya. Itulah keajaiban bilangan urutan.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Pertama Itu Posisi!',
          teks: 'Angka ternyata punya dua topeng: satu untuk jumlah (ada berapa), satu untuk posisi (yang ke berapa). Jadi kalau kamu diumumkan juara pertama, itu posisimu — dan posisi itu juga matematika. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-020 · Pola Angka Naik — malam taman batu & denting air ----- */
    'p1-020': {
      tema: 'pola',
      npc: { glif: '+', ucap: ['Temukan', 'aturannya!'] },
      stasiun: [
        {
          objek: 'lampuTepi', judul: 'Lampu Taman yang Berulang',
          teks: 'Jalan taman malam ini diterangi lampu yang berulang: biru, kuning, biru, kuning. Bukan ngasal — ada aturannya. Angka juga suka berbaris dengan aturan seperti itu, dan aturannya bernama pola.',
        },
        {
          objek: 'manikBenang', judul: 'Manik +2 Berbaris',
          teks: 'Manik disusun berkelompok di benang: kelompok 2, kelompok 4, kelompok 6, kelompok 8. Dari kelompok ke kelompok, jumlah butirnya selalu ditambah dua. Pola +2 itulah detak lagunya — kalau aturannya ketahuan, kamu berani menebak kelompok berikutnya: sepuluh!',
        },
        {
          objek: 'tetesan', judul: 'Denting Air yang Tertib',
          teks: 'Dari talang jatuh tetes air ke baskom: duk... duk... duk. Alam juga gemar pola — detak jantung, langkah kaki, kibaran bunga. Siapa hafal polanya, bisa mendahului kejadian: denting berikutnya pasti datang tepat waktu.',
        },
        {
          objek: 'tekaAngka', judul: 'Teka-teki Angka Rahasia',
          teks: 'Sekarang giliranmu: 3, 5, 7, ... angka rahasia berikutnya apa? Endus dulu polanya: selalu tambah dua. Maka jawabannya 9! Menemukan aturan itu seperti menemukan kunci pintu — begitu terbuka, deret seribu angka tinggal kamu ajak berbaris.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Polanya Ketahuan!',
          teks: 'Pola +2 pada manik dan teka-teki tadi — semua deret angka punya aturannya masing-masing. Tugasmu bukan menghafal, tapi mengendus aturannya seperti detektif. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-021 · Tanda Tambah (+) — padang siang, dua jalan bertemu ----- */
    'p1-021': {
      tema: 'plus',
      npc: { glif: 'T', ucap: ['Gabung jadi', 'satu!'] },
      stasiun: [
        {
          objek: 'papanPlus', judul: 'Tanda yang Mengundang',
          teks: 'Di padang ini dua jalan bertemu menjadi satu. Bentuknya persis tanda plus: dua garis bersilang. Sejak dulu tanda + dipahami sebagai undangan berkumpul — yang di kiri dan yang di kanan dipersilakan menjadi satu rombongan.',
        },
        {
          objek: 'duaKeranjang', judul: 'Dua Keranjang Bertemu',
          teks: 'Keranjang kiri berisi 3 permen, keranjang kanan berisi 2 permen. Mau menggabungkannya? Tulis: 3 + 2. Tanda plus di antara keduanya berkata: silakan, kumpulkan keduanya jadi satu.',
        },
        {
          objek: 'wadahGabung', judul: 'Jadi Satu Wadah',
          teks: 'Tuangkan ke satu wadah, lalu hitung dari awal: 1, 2, 3, 4, 5. Jadi 3 + 2 = 5. Menambah itu menggabungkan isi, kemudian menghitung semuanya bersama-sama.',
        },
        {
          objek: 'papanEt', judul: 'Lahir dari Kata "Dan"',
          teks: 'Lebih dari lima ratus tahun lalu, di buku hitung dagang Eropa, tanda + mula-mula muncul di cetakan. Konon bentuknya lahir dari kata et (artinya "dan") yang ditulis tergesa-gesa sampai melengkung menjadi +. Tanda gabungmu ternyata keturunan kata kecil "dan"!',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Gabung Itu Mudah!',
          teks: 'Jadi setiap kamu menulis 3 + 2, itu undangan berkumpul: yang terpisah menjadi bersama, yang kecil menjadi banyak. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-022 · Tanda Kurang (−) — peron keberangkatan senja ----- */
    'p1-022': {
      tema: 'peron',
      npc: { glif: '-', ucap: ['Berkurang,', 'jangan sedih!'] },
      stasiun: [
        {
          objek: 'papanMin', judul: 'Satu Garis yang Jujur',
          teks: 'Tanda kurang hanya satu garis datar: −. Bukan tanda sedih, lho. Dia pencatat yang jujur: ada yang berpindah tempat, dimakan, atau dibagikan — maka yang ada tadi kini tinggal sebagian.',
        },
        {
          objek: 'kantongLima', judul: 'Kantong 5 Permen',
          teks: 'Pagi tadi kantong ini penuh: 5 permen. Hitung dulu sebelum berangkat: 1, 2, 3, 4, 5. Berangkat dengan bekal lengkap, hati pun tenang.',
        },
        {
          objek: 'temanPergi', judul: 'Teman Berangkat Membawa 2',
          teks: 'Seorang teman berangkat membawa 2 permen untuk bekalnya. Lihat dia melangkah pergi. Maka kita tulis: 5 − 2. Tanda minus mencatat: dari 5, ada 2 yang berpindah.',
        },
        {
          objek: 'papanSisa', judul: 'Hitung yang Tersisa',
          teks: 'Sekarang hitung sisa kantong: 1, 2, 3. Jadi 5 − 2 = 3. Berkurang bukan berarti rugi — 2 permen itu kini menggembirakan temanmu di jalan!',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Min Itu Jujur!',
          teks: 'Jadi bertemu minus jangan bingung: dia hanya mencatat yang berpindah. Di buku hitung dagang Eropa dulu, − lahir berdampingan dengan +, dan kata minus artinya lebih sedikit. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-023 · Tanda Kali (×) — lapangan parade siang ----- */
    'p1-023': {
      tema: 'parade',
      npc: { glif: 'x', ucap: ['Baris rapi,', 'hitung kilat!'] },
      stasiun: [
        {
          objek: 'papanKali', judul: 'Tanda Silang Sang Kilat',
          teks: 'Perkenalkan tanda silang: ×. Dia jurus singkat untuk menjumlah yang sama berulang-ulang. Tanpa dia, tulisanmu panjang sekali dan mulutmu capek membacanya.',
        },
        {
          objek: 'barisParade', judul: 'Parade 3 Baris Isi 4',
          teks: 'Lihat parade di lapangan: 3 baris, tiap baris berisi 4 penduduk. Tulisnya 3 × 4 — artinya angka 4 diulang 3 kali. Hitung satu baris: 4. Dua baris: 8. Tiga baris: 12.',
        },
        {
          objek: 'papan444', judul: 'Jalan Pintasnya',
          teks: 'Kalau ditulis panjang: 4 + 4 + 4 = 12. Tanda kali adalah jalan pintas kalimat itu: 3 × 4 = 12. Tujuannya sama, tapi lebih kilat dan tak melelahkan.',
        },
        {
          objek: 'papanTahunX', judul: 'Si Muda di Antara Tanda',
          teks: 'Tanda + sudah berusia lebih dari lima ratus tahun, sedangkan tanda × baru dipakai sekitar tahun 1631 oleh seorang ahli hitung di Inggris. Usianya muda, tetapi jasanya besar: perkalian jadi ringan untuk semua orang.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kilat Tapi Tertib!',
          teks: 'Jadi kalau ada 3 piring dan tiap piring berisi 4 kue, tak perlu menghitung satu-satu: 3 × 4 = 12. Jurus singkat untuk pengulangan yang sama. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-024 · Tanda Bagi (÷) — ruang makan siang hangat ----- */
    'p1-024': {
      tema: 'meja',
      npc: { glif: ':', ucap: ['Bagi rata,', 'hati tenang!'] },
      stasiun: [
        {
          objek: 'papanBagi', judul: 'Tanda yang Menuntun Berbagi',
          teks: 'Tanda bagi berupa satu garis dengan sebutir titik di atas dan sebutir di bawah: ÷. Garis tengahnya seperti pembatas nampan, dan dua titiknya menandai dua pihak yang akan berbagi.',
        },
        {
          objek: 'nampanKue', judul: 'Nampan 8 Kue',
          teks: 'Di nampan tersusun 8 kue. Dua anak hendak berbagi sama rata. Sebelum membagi, sepakati dulu: bagi itu adil, tak boleh ada yang merasa dikalahkan.',
        },
        {
          objek: 'piringMasing', judul: 'Dua Piring, Isi 4-4',
          teks: 'Bagikan bergantian: satu untuk piring kiri, satu untuk piring kanan, sampai nampan kosong. Hasilnya tiap piring berisi 4. Ditulis: 8 ÷ 2 = 4. Itulah pekerjaan tanda bagi.',
        },
        {
          objek: 'papanObelus', judul: 'Nama Tuanya: Obelus',
          teks: 'Nama tua tanda ÷ adalah obelus. Ia mulai dipakai sebagai tanda bagi dalam buku hitung tahun 1659 karya seorang penghitung dari Swiss. Bentuknya sederhana, tugasnya mulia: menuntun berbagi adil.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Adil Itu Gampang!',
          teks: 'Jadi saat membagi kue, jeruk, atau waktu bermain: hitung yang ada, bagi sama rata, semua puas. Berbagi adil ternyata juga matematika. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-025 · Tanda Sama Dengan (=) — ruang timbangan pagi biru ----- */
    'p1-025': {
      tema: 'setara',
      npc: { glif: 'S', ucap: ['Kiri kanan,', 'harus setara!'] },
      stasiun: [
        {
          objek: 'papanEq', judul: 'Dua Garis Kembar',
          teks: 'Tanda sama dengan berupa dua garis kembar yang sejajar: =. Dia penjaga keseimbangan kalimat matematika — apa pun di sisi kiri harus bernilai sama persis dengan di sisi kanan.',
        },
        {
          objek: 'timbangSetara', judul: 'Timbangan yang Seimbang',
          teks: 'Lihat timbangan ini: piring kiri memuat 3 + 4, piring kanan memuat 7. Keduanya rata. Maka kalimat 3 + 4 = 7 benar — kedua sisinya bernilai sama.',
        },
        {
          objek: 'timbangMiring', judul: 'Kalau Tidak Rata?',
          teks: 'Sekarang piring kiri menulis 5, piring kanan menulis 8. Timbangan miring: nilainya tidak sama, maka tanda = tak boleh dipakai. Yang pas tanda rahang <, mulutnya membuka ke 8 yang lebih berat — kalimat 5 < 8 benar kembali.',
        },
        {
          objek: 'papan1557', judul: 'Pencipta Tanda =',
          teks: 'Tanda = diperkenalkan tahun 1557 oleh Robert Recorde, penghitung dari Britania. Konon ia memilih dua garis sejajar karena tak ada dua hal yang lebih sama daripada sepasang garis kembar sepanjang itu.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Setara Itu Tenang!',
          teks: 'Jadi setiap kalimat dengan tanda = menyimpan timbangan: kiri dan kanan harus setara. Kalau keseimbangan terjaga, jawabanmu jujur. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-026 · Lebih Besar & Kecil (> <) — padang tanduk siang ----- */
    'p1-026': {
      tema: 'tanduk',
      npc: { glif: '<', ucap: ['Mulutnya', 'ke yang besar!'] },
      stasiun: [
        {
          objek: 'rahangTerbuka', judul: 'Rahang yang Selalu Lapar',
          teks: 'Tanda > dan < seperti sepasang rahang yang terbuka lebar. Rahang ini tak pernah salah sasaran: mulutnya selalu membuka ke bilangan yang lebih besar, dan ujung lancipnya menunjuk yang lebih kecil.',
        },
        {
          objek: 'kartu93', judul: 'Kartu 9 > 3',
          teks: 'Kartu ini menulis 9 > 3. Lihat titik-titiknya: kelompok kiri berisi 9, kelompok kanan berisi 3. Mulut lebar membuka ke 9 — baca: sembilan lebih besar dari tiga.',
        },
        {
          objek: 'kartuBalik', judul: 'Kartu 2 < 6',
          teks: 'Sekarang dibalik: 2 < 6. Kelompok kiri berisi 2, kanan berisi 6. Mulut lebar membuka ke 6, ujung lancip menunjuk 2 — baca: dua lebih kecil dari enam. Tandanya sama, arahnya yang mengubah makna.',
        },
        {
          objek: 'papanArah', judul: 'Rahasia Mengingat',
          teks: 'Rahasia kecilnya: bayangkan rahang lapar yang selalu ingin menyantap lebih banyak, maka mulutnya membuka ke bilangan besar. Kalau kedua sisi sama banyak, rahang digantikan tanda sama dengan.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Arahnya Jelas!',
          teks: 'Jadi 9 > 3 dan 2 < 6 kini mudah dibaca: mulut ke yang besar, lancip ke yang kecil. Setiap kartu angka di sekitarmu bisa kamu bacakan sendiri. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-027 · Tanda Kurung ( ) — desa sore dua rumah ----- */
    'p1-027': {
      tema: 'desa',
      npc: { glif: '(', ucap: ['Dalam dulu,', 'baru di luar!'] },
      stasiun: [
        {
          objek: 'gerbangKurung', judul: 'Sepasang Pintu Spesial',
          teks: 'Tanda kurung selalu berpasangan: satu di kiri, satu di kanan, melingkupi angka di dalamnya. Angka yang berdiri di dalam pasangan pintu ini selalu dihitung lebih dulu — dia tamu spesial yang tak boleh menunggu.',
        },
        {
          objek: 'papanDalam', judul: 'Dalam Kurung Dulu',
          teks: 'Coba kalimat ini: (2 + 3) × 2. Hormati tamu spesialnya: dalam kurung dihitung dulu — 2 + 3 = 5. Baru dikalikan: 5 × 2 = 10. Hasilnya sepuluh.',
        },
        {
          objek: 'papanTanpa', judul: 'Tanpa Pintu, Berubah!',
          teks: 'Sekarang pintunya dibuka: 2 + 3 × 2. Kalau dihitung sekadar dari kiri, jawabannya 10 — padahal yang benar 8! Aturannya: kali didahulukan, jadi 3 × 2 = 6, baru 2 + 6 = 8. Satu pasang pintu kecil ternyata mengubah segalanya.',
        },
        {
          objek: 'papanUrutan', judul: 'Urutan Hormat Berhitung',
          teks: 'Urutan lengkapnya: kurung dihitung paling dulu, lalu kali dan bagi, terakhir tambah dan kurang. Ibarat antre di desa: tamu spesial masuk lebih dulu, yang lain menunggu giliran dengan tertib.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Dalam Itu Duluan!',
          teks: 'Jadi kurung adalah pintu spesial dalam kalimat matematika: siapa tinggal di dalamnya, dia dihitung lebih dulu. Dengan pintu kecil itu, jawaban tak pernah ketukar. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-028 · Tanda Koma Desimal — toko kue malam hangat ----- */
    'p1-028': {
      tema: 'kue',
      npc: { glif: ',', ucap: ['Utuh dulu,', 'lalu kepingan!'] },
      stasiun: [
        {
          objek: 'papanKoma', judul: 'Pintu Kecil Dua Dunia',
          teks: 'Koma kecil di bawah ini adalah pintu antara dua dunia angka: di sisi kiri tinggal angka utuh, di sisi kanan mulai kepingannya. Satu tanda begitu kecil, tetapi memisahkan dua hal dengan sangat tertib.',
        },
        {
          objek: 'kueUtuhSetengah', judul: 'Satu Utuh, Setengah Lagi',
          teks: 'Lihat nampan: satu kue utuh dan sepotong setengah kue. Tulisnya 1,5 — koma berkata: di kiriku satu kue utuh, di kananku kepingannya. Setengah ditulis 5 karena satu kue dibayangkan terbelah 10 kepingan, dan setengahnya berarti 5 kepingan.',
        },
        {
          objek: 'papan15', judul: 'Membaca 1,5',
          teks: 'Di papan tertulis 1,5. Dibaca: satu koma lima. Kirinya 1 utuh, kanannya 5 persepuluh — sama artinya dengan setengah. Nampan di depanmu mengiyakan: satu kue utuh plus setengah kue.',
        },
        {
          objek: 'kueDuaKoma', judul: 'Dua Utuh, Setengah Lagi',
          teks: 'Kalau ada 2 kue utuh dan setengah kue lagi, tulis 2,5: dua utuh di kiri koma, kepingan di kanannya. Coba tambah: 1,5 + 1 = 2,5 — utuh bertambah utuh, kepingan tetap setengah. Pas!',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kecil Tapi Penting!',
          teks: 'Jadi koma desimal adalah penjaga pintu: kiri untuk yang utuh, kanan untuk kepingan. 1,5 dan 2,5 kini bisa kamu tulis sendiri dengan tertib. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-029 · Simbol Tak Hingga (∞) — bukit malam bintang lebat ----- */
    'p1-029': {
      tema: 'malamdalam',
      npc: { glif: '8', ucap: ['Tanpa ujung,', 'tanpa dinding!'] },
      stasiun: [
        {
          objek: 'delapanMiring', judul: 'Delapan yang Tidur Miring',
          teks: 'Lambang ini seperti delapan yang tidur miring: ∞. Namanya tak hingga — artinya tak berujung. Coba barisan angka: 1, 2, 3, 4, 5... seumur hidup menghitung pun barisnya tak pernah selesai.',
        },
        {
          objek: 'jalanMelingkar', judul: 'Jalan yang Lenyap di Bukit',
          teks: 'Lihat jalan di bukit: ia berkelok, lalu lenyap di balik tanjakan, seolah tak berakhir. Barisan angka juga begitu — setiap angka yang kamu sebut, angka berikutnya sudah berdiri menunggu.',
        },
        {
          objek: 'bintangTerbanyak', judul: 'Langit Penuh Bintang',
          teks: 'Coba hitung bintang malam ini! Berapa pun yang sudah kamu sebutkan, langit masih menyimpan lebih banyak lagi. Inilah rumah si ∞: tempat yang tak bisa dihitung habis.',
        },
        {
          objek: 'papan1655', judul: 'Tahun 1655',
          teks: 'Lambang ∞ mula-mula ditulis tahun 1655 oleh John Wallis, penghitung dari Britania. Kenapa bentuknya seperti itu? Konon tak seorang pun tahu pasti — mungkin dari delapan yang dimiringkan, mungkin dari lambang tua lain. Yang jelas, dunia jatuh cinta padanya sampai sekarang.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tanpa Ujung!',
          teks: 'Jadi ∞ bukan bilangan biasa: dia tanda untuk yang tak berujung. Barisan angka tak habis, langit tak bertepi, dan rasa ingin tahumu pun dipersilakan tumbuh tanpa batas. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-030 · Membaca Kalimat Matematika — perpustakaan malam ----- */
    'p1-030': {
      tema: 'perpus',
      npc: { glif: 'B', ucap: ['Baca pelan,', 'paham tuntas!'] },
      stasiun: [
        {
          objek: 'bukuTerbuka', judul: 'Kalimat di Halaman Buku',
          teks: 'Di halaman buku terbentang: 2 + 3 = 5. Matematika pun punya kalimat! Bilangan adalah namanya, tanda adalah kata kerjanya, dan hasil adalah akhir ceritanya.',
        },
        {
          objek: 'kartuKalimat', judul: 'Bongkar Jadi Kartu Kata',
          teks: 'Bongkar kalimatnya menjadi kartu: dua, tambah, tiga, sama dengan, lima. Dibaca pelan-pelan dari kiri ke kanan: dua ditambah tiga sama dengan lima. Ternyata membaca matematika sama nikmatnya dengan membaca buku cerita.',
        },
        {
          objek: 'papanKalimat2', judul: 'Kalimat Kedua',
          teks: 'Kalimat lain di papan: 6 − 1 = 5. Dibaca: enam dikurangi satu sama dengan lima. Ceritanya: ada 6 bola, satu dibawa pergi, tinggallah 5. Setiap kalimat matematika menyimpan cerita kecil seperti ini.',
        },
        {
          objek: 'papanTebak', judul: 'Giliranmu Menutup',
          teks: 'Sekarang kalimatnya belum selesai: 3 + 2 = ? Hitung berkumpulnya: 3 dan 2 jadi 5. Kalimat lengkapnya: 3 + 2 = 5. Kamu baru saja membaca, memahami, lalu menyelesaikan sebuah kalimat matematika.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kalimatnya Terbaca!',
          teks: 'Jadi setiap kalimat matematika adalah cerita mini: ada siapa, ada peristiwa, ada akhirnya. Bacalah pelan-pelan, pahami dengan tenang — begitulah ilmu masuk dengan nyaman. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-031 · Penjumlahan Pertama — pagi lingkar pasir kelereng ----- */
    'p1-031': {
      tema: 'lingkar',
      npc: { glif: '5', ucap: ['Dua dan tiga', 'jadi lima!'] },
      stasiun: [
        {
          objek: 'lingkarPasir', judul: 'Lingkar Pasir Kita',
          teks: 'Di lingkar pasir ini kelereng menjadi sahabat bermain sejak lama. Permainannya sederhana: kelereng digulung pelan lalu berhenti berdampingan. Hari ini lingkar kita berubah menjadi tempat belajar angka.',
        },
        {
          objek: 'kelerengDua', judul: 'Dua Kelereng Biru',
          teks: 'Pertama, dua kelereng biru berhenti di lingkar. Hitung bersama: satu, dua. Jumlahnya dua.',
        },
        {
          objek: 'kelerengTiga', judul: 'Tiga Kelereng Merah',
          teks: 'Kemudian tiga kelereng merah bergulir masuk. Hitung juga: satu, dua, tiga. Jumlahnya tiga.',
        },
        {
          objek: 'gabungLima', judul: 'Digabung Jadi Lima',
          teks: 'Sekarang kelereng biru dan merah berkumpul dalam satu lingkar. Hitung semuanya: satu, dua, tiga, empat, lima. Tulisannya: 2 + 3 = 5. Menggabungkan dua kelompok lalu menghitung dari awal — itulah penjumlahan pertama.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Jadi Satu Kelompok!',
          teks: 'Jadi penjumlahan itu menggabungkan kelompok yang terpisah menjadi satu, lalu menghitung semuanya dari awal. Dua dan tiga kini menjadi lima. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-032 · Berhitung dengan Jari — ruang kelas pagi ----- */
    'p1-032': {
      tema: 'kelas',
      npc: { glif: 'J', ucap: ['Jari siap', 'menghitung!'] },
      stasiun: [
        {
          objek: 'telapak', judul: 'Alat Hitung Bawaan',
          teks: 'Buka kedua tanganmu: sepuluh jari selalu siap menghitung di mana saja, tanpa alat apa pun. Sejak dulu, jari menjadi alat hitung pertama bagi anak-anak di seluruh dunia.',
        },
        {
          objek: 'angkatTiga', judul: 'Angkat Tiga Jari',
          teks: 'Coba angkat tiga jari, sisanya menekuk. Hitung yang berdiri: satu, dua, tiga. Tiga jari berdiri, dua jari menekuk — satu tangan tetap berisi lima jari.',
        },
        {
          objek: 'angkatTigaEmpat', judul: 'Tangan Kiri Tiga, Kanan Empat',
          teks: 'Sekarang tangan kiri mengangkat tiga jari, tangan kanan empat jari. Hitung semua yang berdiri: satu sampai tujuh. Jadi 3 + 4 = 7.',
        },
        {
          objek: 'jariPenuh', judul: 'Sepuluh, Penuh!',
          teks: 'Angkat sembilan, satu jari menekuk — hampir penuh. Angkat sepuluh: kedua tangan membuka lebar. Dari kosong sampai sepuluh, jari selalu sanggup menemani berhitung.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Alat di Tangan Sendiri!',
          teks: 'Jadi sepuluh jari adalah alat hitung pertamamu: angkat yang diperlukan, hitung yang berdiri. Tiga dan empat berkumpul menjadi tujuh. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-033 · Menjumlah Lewat 10 — gudang senja, kotak sepuluh ----- */
    'p1-033': {
      tema: 'gudang',
      npc: { glif: '8', ucap: ['Isi dulu sampai', 'sepuluh!'] },
      stasiun: [
        {
          objek: 'kotakSepuluh', judul: 'Kotak Berisi Delapan',
          teks: 'Di gudang berdiri kotak berisi sepuluh tempat: lima di baris atas, lima di baris bawah. Kotak ini sudah berisi 8 bungkah, dua tempat masih kosong.',
        },
        {
          objek: 'limaDatang', judul: 'Datang Lima Bungkah',
          teks: 'Pengantar tiba membawa 5 bungkah baru. Lebih banyak daripada tempat kosong? Sabar — isi yang kosong lebih dulu. Ada 2 tempat kosong, maka 2 bungkah masuk dan kotak menjadi penuh.',
        },
        {
          objek: 'tumpukTiga', judul: 'Sisanya Ditumpuk',
          teks: 'Sisa 3 bungkah tak kebagian tempat, maka ditumpuk rapi di atas kotak. Hitung isi gudang sekarang: 10 bungkah di dalam kotak, 3 di puncak tumpukan.',
        },
        {
          objek: 'papanDelapanLima', judul: 'Catatan Gudang',
          teks: 'Di papan catatan tertulis: 8 + 5 = 13. Caranya: penuhi kotak sampai 10 lebih dulu, sisanya 3 ditumpuk di atas. Hasilnya tetap 13.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Penuh Dulu Sisanya!',
          teks: 'Jadi menjumlah lewat 10 punya trik: penuhi dulu sampai sepuluh, sisanya tinggal ditumpuk. Delapan dan lima bertemu menjadi tiga belas. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-034 · Penjumlahan Bersusun — meja tulis malam berlampu ----- */
    'p1-034': {
      tema: 'tulis',
      npc: { glif: '2', ucap: ['Satuan di bawah', 'satuan!'] },
      stasiun: [
        {
          objek: 'papanBersusun', judul: 'Angka Berbaris Rapi',
          teks: 'Malam ini kita menyusun angka seperti barisan yang rapi: satuan duduk di bawah satuan, puluhan di bawah puluhan. Lihat papan: 23 berdiri di atas, 14 di bawahnya, ditahan garis lurus.',
        },
        {
          objek: 'kolomSatuan', judul: 'Kolom Satuan Dulu',
          teks: 'Kerjakan kolom satuan lebih dulu: 3 ditambah 4 menjadi 7. Tulis 7 di kolom satuan.',
        },
        {
          objek: 'kolomPuluhan', judul: 'Kolom Puluhan Menyusul',
          teks: 'Lalu kolom puluhan: 2 ditambah 1 menjadi 3. Tulis 3 di tempatnya. Baca hasilnya pelan-pelan: tiga puluh tujuh.',
        },
        {
          objek: 'papanHasilTambah', judul: 'Catatan Lengkap',
          teks: 'Papan catatan kini lengkap: 23 + 14 = 37. Tidak ada angka yang tersesat, karena setiap angka tinggal di kolomnya masing-masing.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Rapi Itu Mudah!',
          teks: 'Jadi penjumlahan bersusun itu menyusun angka per kolom: satuan bertemu satuan, puluhan bertemu puluhan, dikerjakan dari kanan. 23 dan 14 menjadi 37. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-035 · Menyimpan ke Puluhan — fajar pos hitung dua kotak ----- */
    'p1-035': {
      tema: 'menara',
      npc: { glif: '9', ucap: ['Titipan rapi,', 'hitungan amanah!'] },
      stasiun: [
        {
          objek: 'posHitung', judul: 'Pos Hitung Dua Kotak',
          teks: 'Di pos hitung ada dua kotak: kotak kecil untuk keping satuan, kotak besar untuk ikat puluhan. Angka 35 tinggal di sini: 3 ikat di kotak besar, 5 keping di kotak kecil.',
        },
        {
          objek: 'limaTujuh', judul: 'Lima + Tujuh = Dua Belas',
          teks: 'Sekarang datang 7 keping untuk ditambahkan. Kotak kecil hanya sanggup menampung sampai 9, maka kepingnya dihitung dulu: 5 + 7 = 12. Dua belas — terlalu ramai untuk satu kotak kecil!',
        },
        {
          objek: 'simpanSatu', judul: 'Satu Disimpan ke Sebelah',
          teks: 'Maka 2 keping ditulis di kolom satuan, sedangkan 1 keping yang berpindah menjadi puluhan disimpan ke kolom sebelah — dicatat rapi seperti titipan yang dijaga amanah.',
        },
        {
          objek: 'papanSimpan', judul: 'Simpanan Dihitung Juga',
          teks: 'Kotak besar menerima simpanan itu: 3 ikat lama ditambah 1 ikat baru menjadi 4 ikat. Hasilnya 35 + 7 = 42. Titipan terbayar penuh.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Amanah Tersalurkan!',
          teks: 'Jadi menyimpan itu mengantar kelebihan ke tempat yang benar: satuan yang penuh menitipkan satu ke kotak puluhan. 35 + 7 = 42, amanah tersalurkan rapi. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-036 · Pengurangan Pertama — sore piknik alas tenun ----- */
    'p1-036': {
      tema: 'piknik',
      npc: { glif: 'k', ucap: ['Lima kue,', 'sisa tiga!'] },
      stasiun: [
        {
          objek: 'piringLima', judul: 'Piring Lima Kue',
          teks: 'Meja piknik menyajikan piring berisi 5 kue. Hitung dulu sebelum disantap: satu, dua, tiga, empat, lima.',
        },
        {
          objek: 'duaDimakan', judul: 'Dua Dimakan',
          teks: 'Dua kue diambil dan dimakan dengan selera. Maka kita tulis 5 − 2: tanda kurang mencatat, dari lima ada dua yang pergi.',
        },
        {
          objek: 'tigaTersisa', judul: 'Tiga Tersisa di Piring',
          teks: 'Piring kini menyisakan 3 kue. Hitung lagi: satu, dua, tiga. Jadi 5 − 2 = 3.',
        },
        {
          objek: 'bungkusNanti', judul: 'Bungkus untuk Nanti',
          teks: 'Tiga kue sisa dibungkus rapi untuk esok hari. Berkurang bukan berarti kehilangan: yang dimakan mengenyangkan, yang tersisa dijaga baik-baik.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Sisa Itu Jelas!',
          teks: 'Jadi pengurangan itu mencari sisa: hitung yang ada, catat yang pergi, hitung lagi yang tertinggal. Lima kue dimakan dua, sisanya tiga. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-037 · Pengurangan Bersusun — malam kantor hitung lampu minyak ----- */
    'p1-037': {
      tema: 'kantor',
      npc: { glif: 'L', ucap: ['Susun rapi,', 'kurang tertib!'] },
      stasiun: [
        {
          objek: 'papanKurangBersusun', judul: 'Susun Dulu, Kurang Kemudian',
          teks: 'Di meja hitung, pengurangan pun disusun rapi seperti penjumlahan: 47 berdiri di atas, 23 di bawahnya. Satuan bertemu satuan, puluhan bertemu puluhan.',
        },
        {
          objek: 'kurangSatuan', judul: 'Kolom Satuan Dulu',
          teks: 'Kolom satuan dulu: 7 dikurangi 3 menjadi 4. Tulis 4 di bawah kolom satuan.',
        },
        {
          objek: 'kurangPuluhan', judul: 'Kolom Puluhan Menyusul',
          teks: 'Lalu kolom puluhan: 4 dikurangi 2 menjadi 2. Tulis 2 di tempatnya. Baca hasilnya: dua puluh empat.',
        },
        {
          objek: 'papanHasilKurang', judul: 'Catatan Selesai',
          teks: 'Catatan selesai: 47 − 23 = 24. Bersusun membuat pengurangan tertib — tak ada angka yang tertukar tempat.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tertib Itu Tenang!',
          teks: 'Jadi pengurangan bersusun mengikuti adab yang sama: susun per kolom, kerjakan dari satuan lebih dulu. 47 kurang 23, sisanya jelas 24. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-038 · Teknik Meminjam — sore kampung tetangga ----- */
    'p1-038': {
      tema: 'tetangga',
      npc: { glif: 'M', ucap: ['Pinjam satu,', 'kembalikan!'] },
      stasiun: [
        {
          objek: 'papanTakMuat', judul: 'Satuan Kurang, Bagaimana?',
          teks: 'Kita kurangi 15 dari 42. Kolom satuan menuliskan 2 di atas dan 5 di bawah. Bagaimana mengurangi 5 dari 2? Tenang — ada teknik tua yang terkenal: meminjam.',
        },
        {
          objek: 'pinjamSatu', judul: 'Pinjam Satu Puluhan',
          teks: 'Dari kolom puluhan dipinjam satu ikat: angka 4 menyusut menjadi 3. Ikat itu dibuka menjadi 10 keping dan menghampiri satuan — kini 2 keping dan 10 keping berkumpul menjadi 12.',
        },
        {
          objek: 'duaBelasKurangLima', judul: 'Dua Belas Kurang Lima',
          teks: 'Satuan pun sanggup: 12 − 5 = 7. Tulis 7 di kolom satuan.',
        },
        {
          objek: 'papanHasilPinjam', judul: 'Pinjaman Tercatat',
          teks: 'Kolom puluhan melanjutkan: 3 dikurangi 1 menjadi 2. Hasilnya 42 − 15 = 27. Pinjaman satu ikat tercatat wajar — tak ada yang hilang.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Pinjam Itu Solusi!',
          teks: 'Jadi jika satuan kurang, pinjam satu puluhan: satuan membesar menjadi 12, puluhan menyusut satu. 42 − 15 = 27 — seperti meminjam gula ke tetangga lalu mengembalikannya tepat waktu. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-039 · Keluarga Angka — pagi teras kayu empat kartu ----- */
    'p1-039': {
      tema: 'teras',
      npc: { glif: 'F', ucap: ['Satu keluarga,', 'empat kalimat!'] },
      stasiun: [
        {
          objek: 'tigaSahabat', judul: 'Tiga Sahabat Angka',
          teks: 'Di teras ini berkumpul tiga sahabat angka: 3, 4, dan 7. Mereka sekeluarga — selalu hadir bersama dalam kalimat-kalimat yang anggotanya tak pernah berganti.',
        },
        {
          objek: 'kalimatTambahDua', judul: 'Dua Kalimat Tambah',
          teks: 'Kalimat tambah keluarga ini ada dua: 3 + 4 = 7 dan 4 + 3 = 7. Posisi boleh ditukar, jumlahnya tetap 7.',
        },
        {
          objek: 'kalimatKurangDua', judul: 'Dua Kalimat Kurang',
          teks: 'Kalimat kurangnya juga dua: 7 − 3 = 4 dan 7 − 4 = 3. Yang terbesar berkurang oleh salah satu sahabatnya, sisanya sahabat yang satu lagi.',
        },
        {
          objek: 'kartuEmpat', judul: 'Empat Kartu Satu Keluarga',
          teks: 'Empat kartu tergantung berderet: dua kartu tambah, dua kartu kurang — semuanya hanya memakai 3, 4, dan 7. Hafal satu kartu, tiga kartu lainnya terbuka sendiri.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Sekeluarga Selamanya!',
          teks: 'Jadi keluarga angka adalah empat kalimat dari tiga anggota: dua tambah, dua kurang. Keluarga 3, 4, 7 tak akan pernah berganti anggota. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-040 · Soal Cerita Tambah — siang bukit angin layang-layang ----- */
    'p1-040': {
      tema: 'layang',
      npc: { glif: '6', ucap: ['Empat plus dua', 'jadi enam!'] },
      stasiun: [
        {
          objek: 'layangEmpat', judul: 'Cerita di Bukit',
          teks: 'Budi bermain layang-layang di bukit yang berangin. Empat layang-layang miliknya menari di langit. Cerita hari ini dimulai dari angka 4.',
        },
        {
          objek: 'layangDua', judul: 'Ibu Membawa 2 Lagi',
          teks: 'Ibu tiba membawa 2 layang-layang baru hasil belian. Maka cerita berkata: 4 ditambah 2. Tulisan singkatnya: 4 + 2.',
        },
        {
          objek: 'layangEnam', judul: 'Hitung Semuanya',
          teks: 'Sekarang hitung layang-layang di langit: satu, dua, tiga, empat, lima, enam. Jawabannya: 4 + 2 = 6.',
        },
        {
          objek: 'papanCerita', judul: 'Kalimat Dari Cerita',
          teks: 'Papan di bukit menuliskan kalimat cerita: 4 + 2 = 6. Soal cerita hanyalah kisah yang memakai angka — cari yang digabung, tulis kalimatnya, hitung.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Cerita Jadi Hitungan!',
          teks: 'Jadi soal cerita tambah itu ramah: temukan dua kelompok yang dipersatukan, tulis kalimatnya, lalu hitung. Empat layang-layang bertemu dua menjadi enam. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-041 · Soal Cerita Kurang — sore halaman bangku berbagi ----- */
    'p1-041': {
      tema: 'berbagi',
      npc: { glif: '7', ucap: ['Tujuh permen,', 'tiga pergi!'] },
      stasiun: [
        {
          objek: 'kalengTujuh', judul: 'Tujuh Permen di Kaleng',
          teks: 'Kaleng permen di bangku halaman berisi 7 permen. Dina membukanya dan menghitung: satu sampai tujuh. Cerita dimulai: ada 7.',
        },
        {
          objek: 'tigaDibagikan', judul: 'Tiga Dibagikan',
          teks: 'Tiga permen dibagikan kepada teman yang lewat. Satu, dua, tiga — tiga permen berpindah tangan. Ceritanya: dari 7, ada 3 yang pergi. Tulisnya: 7 − 3.',
        },
        {
          objek: 'permenEmpat', judul: 'Sisa Empat di Kaleng',
          teks: 'Kaleng ditutup kembali, isinya tinggal 4. Hitung sisa: satu, dua, tiga, empat. Jawabannya: 7 − 3 = 4.',
        },
        {
          objek: 'papanPertanyaan', judul: 'Pertanyaan Tersembunyi',
          teks: 'Di papan cerita tertulis soalnya: ada 7 permen, 3 dibagikan, sisa berapa? Setiap soal cerita menyimpan pertanyaan — temukan dulu pertanyaannya, baru hitung.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Sisanya Terjawab!',
          teks: 'Jadi soal cerita kurang menanyakan sisa: kenali angka awal, hitung yang pergi, kurangkan. Tujuh permen dibagikan tiga, tersisa empat. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-042 · Tantangan Tambah-Kurang — malam kabut papan misteri ----- */
    'p1-042': {
      tema: 'misteri',
      npc: { glif: '?', ucap: ['Siapa angka', 'yang hilang?'] },
      stasiun: [
        {
          objek: 'papanTeka', judul: 'Angka yang Kabur',
          teks: 'Di papan misteri tertulis: 4 + ? = 9. Satu angka membawa diri dan meninggalkan lubang. Kalimat matematika kini berlubang — dan kamulah detektif yang menjaga kasus ini.',
        },
        {
          objek: 'jejakSembilan', judul: 'Jejak di Tempat Kejadian',
          teks: 'Jejak di tempat kejadian terbaca: 9 titik cahaya berhenti di papan, itu nilai akhir kalimat. Empat di antaranya berdiri dekat angka 4 di sisi kiri.',
        },
        {
          objek: 'limaDitemukan', judul: 'Hitung Kekurangannya',
          teks: 'Detektif menghitung kekurangannya: dari 4 menuju 9 ada 5 langkah. Maka angka yang kabur adalah 5 — kalimat kembali utuh: 4 + 5 = 9.',
        },
        {
          objek: 'papanJawab', judul: 'Kasus Ditutup',
          teks: 'Papan misteri kini tertulis 4 + 5 = 9. Kasus ditutup: angka yang hilang ditemukan dengan menghitung mundur dari jawaban.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Detektif Angka!',
          teks: 'Jadi kalimat berlubang adalah teka-teki yang ramah: lihat jawabannya, hitung kekurangannya, temukan angkanya. Empat dan lima berkumpul menjadi sembilan. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-043 · Kali Itu Tambah Cepat — fajar padang latihan berbaris ----- */
    'p1-043': {
      tema: 'barisan',
      npc: { glif: 'C', ucap: ['Kali itu', 'jurus cepat!'] },
      stasiun: [
        {
          objek: 'barisLima', judul: 'Barisan Bola-Lentera',
          teks: 'Bola-lentera berbaris rapi di padang latihan: tiga baris, tiap baris tepat lima. Hitung panjang sambil lompat lima-lima: lima, sepuluh, lima belas. Kelompok yang sama rata beginilah kesukaan para juru hitung.',
        },
        {
          objek: 'papanCepat', judul: 'Dua Tulisan, Satu Jawaban',
          teks: 'Papan latihan menulis dua kalimat sekaligus: 5 + 5 + 5 = 15 dan 3 x 5 = 15. Jawabannya sama persis! Tanda x itu ajakan: ambil 3 kali kelompok lima — penjumlahan yang sama, tulisan lebih pendek.',
        },
        {
          objek: 'loncatLima', judul: 'Jalan Pijakan Lima-Lima',
          teks: 'Ada dua jalan menuju bendera: jalan biasa yang harus dilangkah satu-satu, dan jalan pijakan besar berlabel 5, 10, 15. Tiga lompatan saja, sampai! Perkalian seperti lompatan lima-lima: lebih cepat, tujuannya sama.',
        },
        {
          objek: 'kantongKelereng', judul: 'Tiga Kantong Sama Isi',
          teks: 'Tiga kantong tergantung di gantungan, tiap kantong berisi 5 kelereng. Semuanya ada 15 kelereng, tulisnya 3 x 5 = 15. Benda apa pun boleh dihitung begini — asal kelompoknya sama rata, tanda x sah dipakai.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Jurus Singkat!',
          teks: 'Jadi perkalian itu penjumlahan berkelompok sama rata: 3 x 5 artinya lima, ditambah lima, ditambah lima lagi. Kelompoknya rapi, jurusnya jadi singkat. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-044 · Tabel Perkalian 2 — malam jalan lentera sepasang ----- */
    'p1-044': {
      tema: 'pasangan',
      npc: { glif: 'D', ucap: ['Lompat dua-dua,', 'selalu genap!'] },
      stasiun: [
        {
          objek: 'pasangSandal', judul: 'Sandal Selalu Berpasangan',
          teks: 'Rak sandal di pinggir jalan berisi 5 pasang. Satu pasang berisi 2 sandal, dua pasang berisi 4, tiga pasang berisi 6 — karena setiap pasang selalu dua, hitungannya melompat dua-dua.',
        },
        {
          objek: 'tiangLampu2', judul: 'Lentera Sepasang Tiang',
          teks: 'Lampu jalan di dunia ini selalu berpasangan: tiap tiang menggantung 2 lentera. Lima tiang berturut-turut: 2, 4, 6, 8, 10. Hitungan tabel 2 memang selalu berakhir genap.',
        },
        {
          objek: 'tanggaLompat2', judul: 'Tangga Lompat Dua',
          teks: 'Tangga taman berpijak bernomor: 2, 4, 6, 8, 10. Naik satu pijakan berarti tambah dua. Inilah tabel 2: tidak ada langkah ganjil di sana, semuanya melompat rapi.',
        },
        {
          objek: 'papanTabel2', judul: 'Papan Panjang Tabel 2',
          teks: 'Papan panjang di ujung jalan menuliskan lima baris: 2 x 1 = 2, 2 x 2 = 4, 2 x 3 = 6, 2 x 4 = 8, 2 x 5 = 10. Barisannya persis hitungan pasangan di jalan tadi — dua, empat, enam, delapan, sepuluh. Hafal lima baris ini, kamu sudah menguasai awal tabel 2.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Selalu Genap!',
          teks: 'Jadi tabel 2 itu ilmu berpasangan: tiap kelompok selalu berisi dua, hitungannya lompat dua-dua: 2, 4, 6, 8, 10. Sepasang demi sepasang sampai sepuluh. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-045 · Tabel Perkalian 5 — sore taman bunga kelopak lima ----- */
    'p1-045': {
      tema: 'lima',
      npc: { glif: 'V', ucap: ['Lima demi lima!', 'Berakhir 5 atau 0!'] },
      stasiun: [
        {
          objek: 'jariSatu', judul: 'Satu Tangan Lima Jari',
          teks: 'Angkat satu tangan: 5 jari mengucup. Satu kelompok berisi lima, tulisnya 1 x 5 = 5. Bahan pertama tabel 5 memang sudah terbawa sejak lahir — ada di tanganmu sendiri.',
        },
        {
          objek: 'jariDua', judul: 'Dua Tangan Sepuluh Jari',
          teks: 'Angkat kedua tangan: 5 + 5 = 10 jari. Dua kelompok berisi lima, tulisnya 2 x 5 = 10. Hanya dengan dua tangan, dua baris tabel sudah selesai.',
        },
        {
          objek: 'bungaKelopak', judul: 'Empat Bunga Lima Kelopak',
          teks: 'Empat bunga taman berkelopak lima-lima: satu bunga 5 kelopak, dua bunga 10, tiga bunga 15, empat bunga 20 — tulisnya 4 x 5 = 20. Hitung kelopaknya sambil lompat lima-lima: 5, 10, 15, 20.',
        },
        {
          objek: 'papanJam', judul: 'Jarum Menit Lima-Lima',
          teks: 'Papan jam besar menolong kamu: dari angka 12 ke 1 itu 5 menit, ke 2 itu 10 menit, ke 3 itu 15 menit, ke 4 itu 20 menit. Jarum menit pun ternyata berjalan lima-lima!',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Lima Itu Ramah!',
          teks: 'Jadi tabel 5 itu sahabat jari: 5, 10, 15, 20 — dan satu rahasia lagi, hasilnya selalu berakhir angka 5 atau 0. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-046 · Tabel Perkalian 10 — malam stasiun kereta barang ----- */
    'p1-046': {
      tema: 'stasiun',
      npc: { glif: 'O', ucap: ['Nol di belakang,', 'puluhan meluncur!'] },
      stasiun: [
        {
          objek: 'gerbongSatu', judul: 'Gerbong Penuh Sepuluh',
          teks: 'Satu gerbong kecil dimuati 10 peti: dua baris, tiap baris lima. Penuh rapi tanpa sisa! Satu kelompok berisi sepuluh, tulisnya 1 x 10 = 10.',
        },
        {
          objek: 'gerbongEmpat', judul: 'Empat Gerbong Berangkat',
          teks: 'Kereta malam tersusun dari 4 gerbong, tiap gerbong berisi 10 peti. Hitung muatannya lompat puluhan: 10, 20, 30, 40. Empat kelompok berisi sepuluh, maka 4 x 10 = 40 — dan nol selalu duduk manis di belakang.',
        },
        {
          objek: 'nolEmas', judul: 'Nol Emas Melompat',
          teks: 'Papan stasiun menuliskan: 2 x 10 = 20. Lihat nolnya berkilat! Setiap kali tabel 10 dihitung, nol emas melompat ke belakang angka: 1 jadi 10, 2 jadi 20, 3 jadi 30.',
        },
        {
          objek: 'pijakanPuluhan', judul: 'Pijakan Lompat Puluhan',
          teks: 'Di ujung peron ada pijakan besar berlabel 10, 20, 30. Dari nol, tiga lompatan saja sudah sampai 30! Tabel 10 memang jurus paling gampang: sebut angkanya, taruh nol.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Cukup Tambah Nol!',
          teks: 'Jadi tabel 10 itu paling pemurah: hitung satu, dua, tiga... lalu taruh nol di belakangnya. Sepuluh, dua puluh, tiga puluh — kereta pun berangkat. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-047 · Tabel Perkalian 3 & 4 — pagi bengkel kayu berjendela ----- */
    'p1-047': {
      tema: 'bengkel',
      npc: { glif: 'G', ucap: ['Tangga tiga &', 'tangga empat!'] },
      stasiun: [
        {
          objek: 'segitigaTiga', judul: 'Segitiga Punya Tiga Sisi',
          teks: 'Bengkel menyimpan 4 papan segitiga, tiap segitiga punya 3 sisi. Satu segitiga 3, dua segitiga 6, tiga segitiga 9, empat segitiga 12. Tangga tabel 3 naik bertiga-tiga.',
        },
        {
          objek: 'kursiEmpat', judul: 'Kursi Punya Empat Kaki',
          teks: 'Di sudut bengkel berdiri 4 kursi buatan tangan, tiap kursi bertumpu pada 4 kaki. Satu kursi 4 kaki, dua kursi 8, tiga kursi 12, empat kursi 16. Tangga tabel 4 naik berempat-empat.',
        },
        {
          objek: 'tanggaDua', judul: 'Dua Tangga Bertemu di 12',
          teks: 'Dua tangga kelipatan dipasang berdampingan: tangga 3 naik lewat 3, 6, 9, 12; tangga 4 naik lewat 4, 8, 12, 16. Lihat, keduanya bertumpu di pijakan yang sama: 12 — karena 3 x 4 dan 4 x 3 memang sama besar.',
        },
        {
          objek: 'gridTigaEmpat', judul: 'Kotak Isi 3 x 4',
          teks: 'Papan latihan berkotak 3 baris dan 4 kolom, seluruhnya berisi 12 bola. Diurutkan per baris jadi 3 x 4; diurutkan per kolom jadi 4 x 3. Jawabannya tetap 12 — urutan tidak mengubah banyaknya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Dua Tangga Sahabat!',
          teks: 'Jadi tabel 3 dan tabel 4 adalah dua tangga sahabat: satu melangkah tiga-tiga, satu melangkah empat-empat, dan keduanya bertemu di 12. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-048 · Tabel Perkalian 6-9 — senja tebing jalur pendakian ----- */
    'p1-048': {
      tema: 'tebing',
      npc: { glif: 'H', ucap: ['Makin tinggi,', 'makin kuat!'] },
      stasiun: [
        {
          objek: 'jalurEnam', judul: 'Jalur Kelipatan Enam',
          teks: 'Jalur pendakian pertama berpijak kelipatan 6: 6, 12, 18, 24, 30, 36. Enam langkah berat di awal, tetapi pijakannya teratur — itulah tabel 6.',
        },
        {
          objek: 'tanggaTujuh', judul: 'Tangga Kelipatan Tujuh',
          teks: 'Jalur kedua melangkah tujuh-tujuh: 7, 14, 21, 28, 35, 42. Enam pijakan membawa pendaki sampai 42 — itulah hasil 7 x 6.',
        },
        {
          objek: 'empatJalur', judul: 'Empat Jalur Berdampingan',
          teks: 'Papan petunjuk menampilkan empat jalur naik sekaligus: 6 x 8 = 48, 7 x 8 = 56, 8 x 8 = 64, 9 x 8 = 72. Makin tinggi jalurnya, makin tinggi hasilnya — semuanya keluarga kelipatan 8.',
        },
        {
          objek: 'benderaPuncak', judul: 'Puncak Para Jenius',
          teks: 'Di puncak tertancap bendera dengan papan tulis: 9 x 9 = 81. Mendaki tabel 6 sampai 9 memang sedikit berat, tetapi pendaki yang tekun selalu sampai — dan berat itulah tanda kamu naik kelas.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Pendaki Tabel!',
          teks: 'Jadi tabel 6 sampai 9 itu jalur pendakian: pijakannya makin berat, pemandangannya makin luas. Siapa bisa menaikinya, ia akan kuat menghitung apa pun. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-049 · Trik Perkalian 9 — malam kemah api unggun ----- */
    'p1-049': {
      tema: 'kemah',
      npc: { glif: 'N', ucap: ['Jari tahu', 'rahasia 9!'] },
      stasiun: [
        {
          objek: 'jariSembilan', judul: 'Trik Jari 9 x 3',
          teks: 'Letakkan 10 jari di atas meja kayu. Tekuk jari yang ketiga dari kiri, lalu baca: di kirinya berdiri 2 jari, di kanannya berdiri 7 jari. Maka 9 x 3 = 27!',
        },
        {
          objek: 'papan27', judul: 'Rahasia di Balik 27',
          teks: 'Api unggun menerangi papan: 9 x 3 = 27, lalu 2 + 7 = 9. Perhatikan, jawaban tabel 9 punya kebiasaan manis: bila angka-angkanya dijumlahkan, hasilnya selalu kembali ke 9.',
        },
        {
          objek: 'kartuSembilan', judul: 'Tiga Kartu Bukti',
          teks: 'Tiga kartu bukti digantung di tiang kemah: 18, 45, dan 81. Angka 18 dijumlahkan: 1 + 8 = 9. Angka 45: 4 + 5 = 9. Angka 81: 8 + 1 = 9. Tabel 9 memang keluarga angka 9.',
        },
        {
          objek: 'papanSepuluh', judul: 'Jalan Pintas Lain',
          teks: 'Papan kedua menunjukkan jalan pintas lain: 10 x 5 = 50, lalu 50 - 5 = 45. Ambil sepuluh kali dulu, kurangi satu kelompok — hasilnya 9 x 5 = 45. Sama persis dengan tabelnya!',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Jari Sang Penyuluh!',
          teks: 'Jadi tabel 9 penuh rahasia yang ramah: jarinya menunjukkan jawaban, angka-angkanya selalu berjumlah 9, dan sepuluh kali dikurangi sekali pun cocok. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-050 · Perkalian Bersusun — pagi ruang belajar terang ----- */
    'p1-050': {
      tema: 'terang',
      npc: { glif: 'R', ucap: ['Satuan dulu,', 'puluhan kemudian!'] },
      stasiun: [
        {
          objek: 'kartu23', judul: 'Soal di Papan Tulis',
          teks: 'Papan pagi ini menulis soal bersusun: 23 x 4. Angka 3 menjaga tempat satuan, angka 2 menjaga tempat puluhan. Kita kalikan satu-satu, selalu mulai dari satuan.',
        },
        {
          objek: 'kaliSatuan', judul: 'Satuan Dulu: 3 x 4',
          teks: 'Satuan berhitung lebih dulu: 3 x 4 = 12. Tulis 2 di tempat satuan, lalu simpan 1 di atas puluhan — sepuluh itu tidak hilang, hanya dititipkan rapi.',
        },
        {
          objek: 'kaliPuluhan', judul: 'Puluhan Kemudian: 2 x 4',
          teks: 'Sekarang giliran puluhan: 2 x 4 = 8. Jangan lupa simpanan tadi: 8 + 1 = 9. Maka di tempat puluhan tertulis 9.',
        },
        {
          objek: 'papan92', judul: 'Kumpulkan: 92',
          teks: 'Hasil akhir terbaca rapi: 23 x 4 = 92. Sembilan ikat puluhan dan 2 keping satuan berdiri berdampingan. Kerja besar selesai berkat langkah kecil yang tertib.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Bersusun Itu Rapi!',
          teks: 'Jadi perkalian bersusun itu urutannya tetap: satuan dulu, simpan bila penuh, puluhan kemudian, lalu kumpulkan. Dua puluh tiga kali empat menjadi sembilan puluh dua. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-051 · Bagi Itu Membagi Rata — siang halaman bazar kanopi ----- */
    'p1-051': {
      tema: 'bazar',
      npc: { glif: 'b', ucap: ['Bagi sama rata,', 'semua senang!'] },
      stasiun: [
        {
          objek: 'nampanSepuluh', judul: 'Sepuluh Kelereng, Dua Piring',
          teks: 'Di meja bazar ada nampan berisi 10 kelereng dan 2 piring kosong. Tugasmu membagi rata: 10 : 2. Semua kelereng harus mendapat tempat, tak boleh ada piring yang isinya lebih banyak.',
        },
        {
          objek: 'satuSatu', judul: 'Dibagikan Bergantian',
          teks: 'Bagikan bergantian satu-satu: satu untuk piring kiri, satu untuk piring kanan. Setelah lima kali giliran, nampan kosong dan tiap piring berisi 5 kelereng.',
        },
        {
          objek: 'piringKembar', judul: 'Sama Banyak, Sama Adil',
          teks: 'Kedua piring kini sama isi: lima dan lima. Maka 10 : 2 = 5. Pembagian rata artinya tiap penerima mendapat bagian yang sama banyak — itulah keadilan yang paling sederhana.',
        },
        {
          objek: 'rotiEnam', judul: 'Roti untuk Tiga Kantong',
          teks: 'Latihan kedua di meja sebelah: 6 roti untuk 3 kantong. Dibagikan bergantian, tiap kantong berisi 2 roti. Maka 6 : 3 = 2 — dan hasil pembagian selalu bisa dicek ulang.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Adil Itu Gampang!',
          teks: 'Jadi pembagian itu seni berbagi rata: sebarkan bergantian satu-satu sampai tiap penerima sama banyak. Sepuluh kelereng untuk dua piring menjadi lima-lima. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-052 · Pembagian dengan Sisa — senja warung kue lampu gantung ----- */
    'p1-052': {
      tema: 'warung',
      npc: { glif: 'w', ucap: ['Sisa satu?', 'Bukan masalah!'] },
      stasiun: [
        {
          objek: 'kueTujuh', judul: 'Tujuh Kue di Nampan',
          teks: 'Warung hampir tutup; tersisa 7 kue di nampan dan 2 piring di meja. Nenek membagi rata: 7 : 2. Bisakah kedua piring mendapat bagian sama banyak?',
        },
        {
          objek: 'kueTigaTiga', judul: 'Tiga-Tiga, Sisa Satu',
          teks: 'Dibagikan bergantian satu-satu: piring kiri mendapat 3, piring kanan mendapat 3 — lalu di nampan tinggal 1 kue yang tak lagi punya pasangan. Itulah sisa: 7 : 2 = 3 sisa 1.',
        },
        {
          objek: 'papanSisa2', judul: 'Papan Catatan Warung',
          teks: 'Papan catatan menuliskan hasilnya: 7 : 2 = 3 sisa 1. Angka 3 menceritakan isi tiap piring; angka 1 menceritakan kue yang menunggu giliran hari esok.',
        },
        {
          objek: 'kueCek', judul: 'Cek Balik Tetap Tujuh',
          teks: 'Nenek selalu cek balik: 2 x 3 = 6, lalu 6 + 1 = 7. Cocok! Selama hasil kali ditambah sisa kembali ke angka awal, pembagianmu pasti benar.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Sisa Itu Menunggu!',
          teks: 'Jadi sisa bukanlah salah; ia hanya menunggu giliran berikutnya: 7 kue bagi 2 piring menjadi 3 dan 3, dengan 1 yang menunggu. Jangan lupa cek balik: kalikan dulu, tambahkan sisanya. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-053 · Pembagian Bersusun — malam lorong tangga lampu menyala ----- */
    'p1-053': {
      tema: 'lorong',
      npc: { glif: 'P', ucap: ['Turunkan', 'satu per satu!'] },
      stasiun: [
        {
          objek: 'kartu96', judul: 'Soal Tangga Panjang',
          teks: 'Di lorong berdiri papan bersusun: 96 : 3. Angka 9 menaungi 9 ikat puluhan; angka 6 adalah 6 keping satuan. Bagian demi bagian akan diturunkan menyusuri tangga.',
        },
        {
          objek: 'ikatSembilan', judul: 'Puluhan Dulu: 9 Ikat',
          teks: 'Bagikan ikat puluhan lebih dulu: 9 ikat untuk 3 piring, tiap piring mendapat 1 ikat. Tulis 3 di tempat puluhan — karena 9 : 3 = 3 puluhan.',
        },
        {
          objek: 'turunkanEnam', judul: 'Turunkan Enam Keping',
          teks: 'Sekarang keping satuan diturunkan: 6 keping untuk 3 piring, tiap piring mendapat 2 keping. Tulis 2 di tempat satuan. Tangga sudah dituruni sampai anak terakhir!',
        },
        {
          objek: 'papan32', judul: 'Sampai Bawah: 32',
          teks: 'Jawaban terbaca di ujung tangga: 96 : 3 = 32. Tiap piring berisi 3 ikat puluhan dan 2 keping. Cek balik pun cocok: 3 x 32 = 96.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Turun Tangga Rapi!',
          teks: 'Jadi pembagian bersusun itu menuruni tangga angka: bagi puluhan dulu, turunkan satuan, tulis jawabannya per anak tangga. Sembilan puluh enam dibagi tiga menjadi tiga puluh dua. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-054 · Tantangan Kali-Bagi — malam arena obor turnamen ----- */
    'p1-054': {
      tema: 'arena',
      npc: { glif: 'U', ucap: ['Kali dan bagi,', 'pasangan setia!'] },
      stasiun: [
        {
          objek: 'tumpukan24', judul: 'Enam Tumpukan, Empat Isi',
          teks: 'Obor-obor menyala di arena: 6 tumpukan bola, tiap tumpukan berisi 4. Kalimat perkaliannya: 6 x 4 = 24. Hitung semuanya satu per satu: dua puluh empat bola.',
        },
        {
          objek: 'piringBalik', judul: 'Dibalik Jadi Pembagian',
          teks: 'Kini bola-bola itu dipindahkan ke 6 piring sama rata: tiap piring berisi 4. Kalimatnya berbalik arah: 24 : 6 = 4. Hasil kali tadi menjadi angka awal pembagian.',
        },
        {
          objek: 'kartuKaliBagi', judul: 'Empat Kartu Satu Arena',
          teks: 'Empat kartu juara tergantung berderet: 6 x 4 = 24, 4 x 6 = 24, 24 : 6 = 4, 24 : 4 = 6. Kali dan bagi saling membuka kartu satu sama lain — isinya selalu seirama.',
        },
        {
          objek: 'tekaDuaPuluh', judul: 'Teka Malam Ini',
          teks: 'Teka penutup menyala di papan tengah: ? x 5 = 20. Arena berbisik: cek dengan bagi — 20 : 5 = 4. Maka yang bersembunyi adalah 4, dan kalimat kembali utuh: 4 x 5 = 20.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Pasangan Seumur Hidup!',
          teks: 'Jadi kali dan bagi memang pasangan setia: 6 x 4 = 24 selalu berbalik menjadi 24 : 6 = 4. Bila ada angka hilang, cukup panggil pasangannya. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-055 · Setengah Itu 1/2 — siang dapur keluarga ----- */
    'p1-055': {
      tema: 'dapur',
      npc: { glif: 'f', ucap: ['Setengah itu', 'dua sama besar!'] },
      stasiun: [
        {
          objek: 'kueDapur', judul: 'Satu Kue di Talenan',
          teks: 'Dapur siang ini harum; di talenan tergeletak satu kue bulat utuh. Ibu hendak membagikannya untuk dua orang, dengan syarat satu: kedua orang harus mendapat bagian sama besar. Perhatikan kuenya — masih utuh, dan belum boleh dimakan siapa pun.',
        },
        {
          objek: 'garisTengah', judul: 'Satu Garis Lewat Tengah',
          teks: 'Ibu menaruh pisau dan menarik satu garis lurus yang lewat pusat kue. Satu tebasan membuat kue terbagi menjadi dua bagian yang sama besar. Lewat pusat itulah kuncinya: garis yang meleset dari tengah membuat satu sisi besar dan satu sisi kecil.',
        },
        {
          objek: 'piringSetengah', judul: 'Tiap Piring Satu Bagian',
          teks: 'Kini tiap piring memuat satu bagian. Bagian itu disebut setengah, ditulis 1/2 — satu potongan dari dua potongan sama besar. Dua orang, dua bagian, tak ada yang lebih dan tak ada yang kurang. Adil itulah rasa setengah yang benar.',
        },
        {
          objek: 'potongTimpang', judul: 'Bila Tidak Sama Besar',
          teks: 'Lihat peringatan di piring sebelah: bila garis potongnya meleset, bagian jadi timpang — satu besar, satu kecil. Yang kecil pasti keberatan, dan potongan seperti itu belum boleh bernama setengah. Kata sama besar memang wajib ada di setiap pecahan.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Itu Setengah!',
          teks: 'Jadi setengah itu satu dari dua bagian yang sama besar: satu kue, satu garis lewat pusat, dua piring rata. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-056 · Seperempat Itu 1/4 — sore pesta ulang tahun ----- */
    'p1-056': {
      tema: 'ultah',
      npc: { glif: 'e', ucap: ['Empat potongan', 'sama besar!'] },
      stasiun: [
        {
          objek: 'mejaUltah', judul: 'Kue untuk Empat Tamu',
          teks: 'Pesta ulang tahun sore ini menyambut empat tamu, dan kuenya masih utuh di tengah meja. Satu kue harus dibagikan kepada empat orang sampai tiap tamu menerima bagian sama besar. Jawabnya ada pada dua garis potong.',
        },
        {
          objek: 'potongSilang', judul: 'Dua Garis Saling Menyilang',
          teks: 'Satu garis lurus lewat pusat membagi kue menjadi dua. Lalu satu garis lagi ditarik menyilang garis pertama di pusat: kini kue terbagi empat potongan yang sama besar. Dua garis yang bersilang di tengah adalah jurus membagi empat.',
        },
        {
          objek: 'piringSeperempat', judul: 'Satu Potongan Satu Tamu',
          teks: 'Tiap tamu menerima satu potongan dari empat potongan sama besar. Namanya seperempat, ditulis 1/4. Angka 1 menceritakan satu potongan di piring; angka 4 menceritakan kue yang dibagi empat.',
        },
        {
          objek: 'duaJadiSetengah', judul: 'Dua Potongan Bersaudara',
          teks: 'Bila dua potongan seperempat diletakkan berdampingan, keduanya menyatu membentuk setengah kue. Maka 2/4 sama dengan 1/2 — dua nama untuk ukuran yang sama. Pecahan memang suka berganti nama, tetapi ukurannya tidak pernah bohong.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Empat Sama Besar!',
          teks: 'Jadi seperempat itu satu dari empat bagian sama besar: dua garis bersilang di pusat, empat potongan rapi, satu untuk tiap tamu. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-057 · Pembilang & Penyebut — malam ruang buku resep ----- */
    'p1-057': {
      tema: 'resep',
      npc: { glif: 'p', ucap: ['Atas diambil,', 'bawah dibagi!'] },
      stasiun: [
        {
          objek: 'bukuResep', judul: 'Resep Kue di Halaman Lama',
          teks: 'Di rak resep terbuka sebuah buku tua; halamannya menggambar kue yang dibagi empat sama besar, dengan tiga potongan diletakkan di piring. Penulis resep menandainya 3/4. Dua angka itu punya nama dan tugas masing-masing.',
        },
        {
          objek: 'penyebutBawah', judul: 'Penyebut: Angka Bawah',
          teks: 'Angka bawah pada 3/4 bernama penyebut. Tugasnya menjaga jumlah potongan: kue dibagi empat sama besar. Bila penyebutnya berubah, seluruh potongan ikut berubah — karena itu ia duduk di bawah, menopang semuanya.',
        },
        {
          objek: 'pembilangAtas', judul: 'Pembilang: Angka Atas',
          teks: 'Angka atas pada 3/4 bernama pembilang. Ia menunjuk bagian yang diambil: tiga potongan diletakkan di piring. Pembilang menghitung yang dibawa pergi, dan satu potongan sisanya tetap tinggal di talenan.',
        },
        {
          objek: 'papanTigaEmpat', judul: 'Cara Membacanya',
          teks: '3/4 dibaca tiga per empat. Begitu juga 1/2 dibaca satu per dua — orang biasa menyebutnya setengah — dan 1/4 dibaca seperempat. Begitu nama pembilang dan penyebut sudah hafal, semua tulisan pecahan langsung bisa dibaca nyaring.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Nama Dua Angka!',
          teks: 'Jadi setiap pecahan punya dua penjaga: penyebut di bawah menghitung jumlah potongan, pembilang di atas menunjuk yang diambil. Tiga per empat pun kini terbaca jelas. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-058 · Keluarga Pecahan 1/n — pagi meja teh roti ----- */
    'p1-058': {
      tema: 'teh',
      npc: { glif: '/', ucap: ['Makin dibagi,', 'makin kecil!'] },
      stasiun: [
        {
          objek: 'rotiTiga', judul: 'Roti bagi Tiga',
          teks: 'Meja teh pagi ini menyajikan roti dan tiga piring. Satu roti dipotong tiga sama besar, tiap piring menerima satu potongan: satu per tiga, ditulis 1/3. Tiga potongan itu bila digabung kembali menjadi roti utuh.',
        },
        {
          objek: 'rotiLima', judul: 'Roti bagi Lima',
          teks: 'Roti kedua dipotong lebih banyak: lima potongan sama besar untuk lima piring. Tiap potongan kini bernilai 1/5. Perhatikan ukurannya — potongan 1/5 lebih ramping daripada 1/3, karena roti yang sama harus menanggung lebih banyak pembagian.',
        },
        {
          objek: 'rotiDelapan', judul: 'Roti bagi Delapan',
          teks: 'Roti ketiga paling rajin dibagi: delapan potongan sama besar, dan satu potongannya, 1/8, menjadi yang paling kecil di meja. Makin ramai penerima bagiannya, makin ramping tiap potongan — itulah hukum meja teh.',
        },
        {
          objek: 'papanKeluarga', judul: 'Papan Keluarga Satu-Per',
          teks: 'Papan dinding menuliskan keluarga besar itu berderet: 1/2, 1/3, 1/4, 1/5, 1/8. Semuanya sekeluarga — masing-masing satu potongan dari kue yang dibagi sama besar, hanya jumlah bagiannya yang berbeda. Makin ke bawah, pembaginya makin banyak dan potongannya makin kecil.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Makin Dibagi Makin Kecil!',
          teks: 'Jadi keluarga pecahan satu-per itu saudara serupa: 1/2, 1/3, 1/4, dan seterusnya — makin banyak bagiannya, makin ramping potongannya. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-059 · Pecahan Senilai — siang meja kue kembar ----- */
    'p1-059': {
      tema: 'kembar',
      npc: { glif: 'E', ucap: ['Rupa beda,', 'ukuran sama!'] },
      stasiun: [
        {
          objek: 'kueKembar', judul: 'Dua Kue Kembar',
          teks: 'Di meja berdampingan terdapat dua kue kembar: sama bulat, sama besar, dari loyang yang sama. Kue A akan dibagi dua; kue B akan dibagi empat. Pertanyaannya: bisakah bagian keduanya sama besar walau potongannya berbeda jumlah?',
        },
        {
          objek: 'potongBeda', judul: 'Dua Cara Memotong',
          teks: 'Kue A dipotong lewat pusat dan satu potongannya diambil: itulah 1/2. Kue B dipotong dua garis bersilang dan dua potongannya diambil: itulah 2/4. Sekarang kedua ambilan ditaruh di piring bersebelahan.',
        },
        {
          objek: 'bandingPiring', judul: 'Diletakkan Berdampingan',
          teks: 'Piring keduanya disandingkan, dan ukurannya sama persis! Satu dari dua ternyata sama besar dengan dua dari empat. Maka 1/2 = 2/4: rupa potongannya beda, ukurannya bersaudara. Pecahan seperti ini bernama pecahan senilai.',
        },
        {
          objek: 'kartuSenilai', judul: 'Keluarga Besar Setengah',
          teks: 'Papan di dinding menuliskan keluarganya yang panjang: 1/2 = 2/4 = 3/6 = 4/8. Tiga dari enam, empat dari delapan — makin banyak dipotong, makin banyak pula yang harus diambil, dan ukurannya tetap setengah. Seperti dipanggil Kak, Bang, atau Abang: namanya beda, orangnya tetap sama.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Ukuran Tak Bohong!',
          teks: 'Jadi pecahan senilai itu ukuran sama dengan rupa berbeda: 1/2, 2/4, 3/6 — sepanjang potongannya sama besar, nilainya tetap setengah. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-060 · Membandingkan Pecahan — siang ladang kakao ----- */
    'p1-060': {
      tema: 'cokelat',
      npc: { glif: 'c', ucap: ['Awas jebak', 'angka besar!'] },
      stasiun: [
        {
          objek: 'batangDua', judul: 'Batang Cokelat bagi Dua',
          teks: 'Ladang kakao ini menyimpan dua batang cokelat kembar. Batang pertama ditekuk di tengah lalu dipatahkan: jadilah dua potongan sama besar, tiap potongan bernilai 1/2. Potongannya gemuk dan mengenyangkan.',
        },
        {
          objek: 'batangDelapan', judul: 'Batang Cokelat bagi Delapan',
          teks: 'Batang kedua dipotong lebih rajin: delapan potongan sama besar, tiap potongan bernilai 1/8. Potongannya ramping-ramping, nyaris seperti keping kecil.',
        },
        {
          objek: 'jebakTerbongkar', judul: 'Jebak Angka Terbongkar',
          teks: 'Di sini jebaknya menunggu: angka 8 tampak lebih besar daripada angka 2, padahal potongan 1/2 justru lebih banyak cokelatnya daripada 1/8. Penyebut yang besar artinya kue dibagi banyak-banyak, jadi tiap potongan ikut mengecil.',
        },
        {
          objek: 'papanPeringatan', judul: 'Papan Peringatan Ladang',
          teks: 'Papan peringatan menuliskan urutannya dengan jelas: 1/2 > 1/4 > 1/8. Untuk potongan satu-per seperti ini, makin kecil penyebutnya, makin besar potongannya. Ingat baik-baik, supaya tidak tertukar saat memilih bagian.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Jebak Terlewati!',
          teks: 'Jadi membandingkan pecahan satu-per itu mudah: penyebut kecil berarti potongan besar — 1/2 selalu menang atas 1/8. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-061 · Menjumlah Pecahan Senama — senja nampan kue bulat ----- */
    'p1-061': {
      tema: 'nampan',
      npc: { glif: 'a', ucap: ['Senama boleh', 'digabung!'] },
      stasiun: [
        {
          objek: 'kueEmpatNampan', judul: 'Kue Bulat Dibagi Empat',
          teks: 'Nampan senja ini menyajikan satu kue bulat yang telah dibagi empat potongan sama besar. Di sisi nampan berdiri dua piring kosong yang menunggu diisi. Potongan-potongan itu sejenis: semuanya seperempat.',
        },
        {
          objek: 'ambilSatuDua', judul: 'Piring Kiri dan Piring Kanan',
          teks: 'Piring kiri menerima satu potongan: isinya 1/4. Piring kanan menerima dua potongan: isinya 2/4. Sekarang keduanya akan digabung menjadi satu piring sajian.',
        },
        {
          objek: 'gabungTigaEmpat', judul: 'Digabung: Tiga Per Empat',
          teks: 'Potongan-potongan itu dipindahkan ke satu piring: satu potong bertemu dua potong menjadi tiga potong. Maka 1/4 + 2/4 = 3/4. Di nampan tinggal satu potongan sendirian, karena empat potongan sudah tiga yang pergi.',
        },
        {
          objek: 'papanAturanSenama', judul: 'Aturan Nampan',
          teks: 'Papan catatan toko menuliskan aturannya: bila penyebutnya sama, penyebut tetap duduk di tempat dan pembilangnya yang dijumlahkan. Tetapi potongan yang beda ukuran tidak boleh digabung begitu saja — samakan dulu ukurannya, baru boleh bertemu.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Gabung Senama!',
          teks: 'Jadi menjumlah pecahan senama itu seperti menggabung potongan sejenis: penyebut tetap, pembilang bertambah — 1/4 + 2/4 = 3/4. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-062 · Kurang Pecahan Senama — pagi kantin sekolah ----- */
    'p1-062': {
      tema: 'kantin',
      npc: { glif: 'm', ucap: ['Ambil satu,', 'sisanya jelas!'] },
      stasiun: [
        {
          objek: 'kueTigaEmpat', judul: 'Piring Berisi Tiga Per Empat',
          teks: 'Kantin pagi ini baru membuka; di piring meja depan berbaris tiga potongan kue, sementara kuenya semula dibagi empat sama besar. Isi piring itu ditulis 3/4 — tiga dari empat potongan.',
        },
        {
          objek: 'makanSatuPotong', judul: 'Satu Potongan Dimakan',
          teks: 'Seorang pembeli membeli satu potongan untuk sarapan. Dari tiga potongan di piring, satu pergi meninggalkan tempat kosong kecil. Yang tersisa kini tinggal dua potongan.',
        },
        {
          objek: 'sisaDuaEmpat', judul: 'Sisa Dua Per Empat',
          teks: 'Kalimat kantinnya begini: 3/4 - 1/4 = 2/4. Tiga dikurangi satu tinggal dua, dan penyebutnya tetap empat. Menariknya, 2/4 itu sama besar dengan 1/2 — persis setengah kue, temuan pecahan senilai yang lalu.',
        },
        {
          objek: 'papanKantin', judul: 'Papan Catatan Kantin',
          teks: 'Papan kantin menuliskan aturan pengurangannya: bila penyebutnya sama, penyebut tetap dan pembilang yang dikurangkan. Hitung potongan yang pergi, maka sisanya otomatis terbaca di piring.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kurang Senama!',
          teks: 'Jadi pengurangan pecahan senama itu santai: penyebut tetap, pembilang dikurang — 3/4 - 1/4 = 2/4, dan sisanya terbaca jelas di piring. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-063 · Pecahan Campuran — malam meja saji keluarga ----- */
    'p1-063': {
      tema: 'saji',
      npc: { glif: 'q', ucap: ['Utuh plus', 'setengah!'] },
      stasiun: [
        {
          objek: 'piringUtuh', judul: 'Piring Pertama: Satu Utuh',
          teks: 'Meja saji malam ini menyiapkan kue untuk dua piring. Piring pertama menerima satu kue utuh tanpa kekurangan sedikit pun. Utuh itu artinya satu penuh, ditulis dengan angka 1.',
        },
        {
          objek: 'piringSetengah2', judul: 'Piring Kedua: Setengah',
          teks: 'Piring kedua mendapat sambungan cerita: satu kue lain dibagi dua sama besar, dan satu potongannya diletakkan di piring itu. Isinya setengah, ditulis 1/2.',
        },
        {
          objek: 'campurSatuSetengah', judul: 'Digabung: Satu Setengah',
          teks: 'Kini kedua piring disandingkan: satu kue utuh berdampingan dengan satu potongan setengah. Tulisnya 1 1/2, dibaca satu setengah. Angka utuhnya berdiri di depan, pecahannya mengikuti di belakang — itulah pecahan campuran.',
        },
        {
          objek: 'butuhSetengah', judul: 'Hampir Mencapai Dua',
          teks: 'Pecahan campuran itu hanya setengah langkah dari dua kue utuh. Bila satu potong setengah lagi ditambahkan, setengah dan setengah menyatu menjadi satu utuh — dan meja saji lengkap dengan dua kue penuh.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Utuh Plus Pecahan!',
          teks: 'Jadi pecahan campuran itu gabungan dua piring: angka utuh di depan, pecahan di belakang — satu utuh plus setengah ditulis 1 1/2, dibaca satu setengah. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-064 · Bagian dari Banyak — sore tikar bermain ----- */
    'p1-064': {
      tema: 'tikar',
      npc: { glif: 'h', ucap: ['Setengah dari', 'sepuluh itu lima!'] },
      stasiun: [
        {
          objek: 'kelerengTikar', judul: 'Sepuluh Kelereng di Tikar',
          teks: 'Sore di tikar bermain ini terhampar 10 kelereng warna-warni. Dua pemain hendak membaginya dengan adil, dan kata kuncinya: tiap pemain harus menerima setengah dari semuanya.',
        },
        {
          objek: 'bagiDuaPiring', judul: 'Dua Piring Bergantian',
          teks: 'Kelereng dibagikan bergantian satu-satu ke dua piring: satu untuk piring kiri, satu untuk piring kanan. Setelah sepuluh kali giliran, kedua piring masing-masing berisi 5 kelereng.',
        },
        {
          objek: 'setengahLima', judul: 'Satu Piring Itu Setengahnya',
          teks: 'Maka setengah dari 10 adalah 5 — kelereng dalam satu piring. Ditulis: 1/2 dari 10 = 5. Menyebutnya pun boleh dengan dua cara: membagi dua rata, atau mengambil setengahnya; hasilnya sama.',
        },
        {
          objek: 'cobaDelapan', judul: 'Coba dengan Delapan Bola',
          teks: 'Cara yang sama berlaku untuk benda lain: 8 bola warna dibagi dua rata ke dua piring, tiap piring menerima 4. Berarti setengah dari 8 adalah 4. Pecahan memang bisa menyentuh benda utuh yang keping-kepingnya dihitung.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Bagi Dua Rata!',
          teks: 'Jadi mencari setengah dari banyak itu seperti membagi dua rata: setengah dari 10 adalah 5, setengah dari 8 adalah 4. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-065 · Menggambar Pecahan — malam meja gambar ----- */
    'p1-065': {
      tema: 'kertas',
      npc: { glif: 'g', ucap: ['Warnai dua', 'dari empat!'] },
      stasiun: [
        {
          objek: 'kertasPersegi', judul: 'Persegi di Kertas Gambar',
          teks: 'Meja gambar malam ini menyediakan kertas dan penggaris. Tugasnya menggambar pecahan, dimulai dari satu persegi besar di tengah kertas. Bentuk apa pun sebenarnya boleh — persegi paling mudah dipotong rapi.',
        },
        {
          objek: 'garisSilangKertas', judul: 'Dua Garis Membagi Empat',
          teks: 'Satu garis menegak di tengah persegi, lalu satu garis mendatar menyilangnya: tergambar empat kotak kecil yang sama besar. Dua garis bersilang memang jurus pembagi empat, sama seperti di kuenya.',
        },
        {
          objek: 'warnaiDuaKotak', judul: 'Warnai Dua Kotak',
          teks: 'Sekarang warnai dua kotak dari empat kotak. Gambar itu kini bercerita: dua dari empat, ditulis 2/4. Banyak kotak yang diwarnai menjadi pembilang; banyak seluruh kotak menjadi penyebut — pecahan terbaca langsung dari gambar.',
        },
        {
          objek: 'temanMembaca', judul: 'Gambar Tak Bisa Dibohongi',
          teks: 'Kelebihan menggambar: teman bisa memeriksa gambar tanpa takut salah baca. Matanya melihat dua kotak terisi dari empat kotak, dan itu berarti setengah persegi — karena 2/4 sama dengan 1/2. Gambar membuat pecahan jadi jujur.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Pecahan Terlihat!',
          teks: 'Jadi menggambar pecahan itu tiga langkah: gambar bentuknya, bagi sama besar, warnai sebanyak pembilang. 2/4 pun terbaca nyaris tanpa berpikir. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-066 · Tantangan Potongan Kue — malam gelanggang kuis ----- */
    'p1-066': {
      tema: 'gelanggang',
      npc: { glif: 'Z', ucap: ['Empat teka', 'pecahan!'] },
      stasiun: [
        {
          objek: 'kueDelapanGelang', judul: 'Teka Pertama: Dibagi Delapan',
          teks: 'Gelanggang kuis malam ini memanggang satu kue besar yang dibagi delapan potongan sama besar. Teka pertamanya: berapa nilai satu potongan? Jawabnya 1/8 — satu dari delapan bagian.',
        },
        {
          objek: 'dimakanTigaGel', judul: 'Teka Kedua: Tiga Dimakan',
          teks: 'Teka kedua menyusul: tiga potongan dimakan tamu undangan. Yang terlanjur dimakan ditulis 3/8. Gelanggang menyemangati: masih ada potongan tersisa, jangan menyerah!',
        },
        {
          objek: 'sisaLimaDelapan', judul: 'Teka Ketiga: Berapa Sisa?',
          teks: 'Dari delapan potongan, tiga sudah pergi; tersisa lima potongan di loyang. Maka sisanya 5/8. Uji baliknya manis: 3/8 dan 5/8 bila digabung kembali menjadi 8/8 — satu kue utuh.',
        },
        {
          objek: 'lebihSetengah', judul: 'Teka Bonus: Lebih dari Setengah?',
          teks: 'Teka bonusnya paling licin: apakah sisa 5/8 lebih banyak daripada setengah kue? Setengah kue sama dengan 4/8, dan 5/8 melampaui 4/8. Maka sisanya lebih dari setengah — pemirsa gelanggang bertepuk tangan.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Juara Pecahan!',
          teks: 'Jadi gelanggang pecahan bisa ditaklukkan dengan bekal lama: membagi sama besar, membaca pembilang dan penyebut, serta mengenali setengah. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-067 · Kenalan Angka Koma — siang warung es, gelas ukur ----- */
    'p1-067': {
      tema: 'es',
      npc: { glif: '0,5', ucap: ['Utuh dulu,', 'kepingan kemudian!'] },
      stasiun: [
        {
          objek: 'gelasUkur', judul: 'Gelas Ukur Satu Utuh',
          teks: 'Di meja warung es ini berdiri gelas ukur dengan satu garis merah di badannya. Garis itu menandai satu gelas penuh — satu utuh. Selama air belum menyentuh garis, kita sebut: belum satu utuh.',
        },
        {
          objek: 'gelasSetengah', judul: 'Dituang Setengah Gelas',
          teks: 'Air dituang perlahan sampai berhenti tepat di garis tengah. Kini gelas berisi setengah dari satu utuh. Angkanya ditulis 0,5 — nol utuh, lalu koma, lalu lima dari sepuluh kepingan.',
        },
        {
          objek: 'papanKepingan', judul: 'Di Belakang Koma, Potongan Kecil',
          teks: 'Papan warung menuliskan aturannya: angka di depan koma menghitung yang utuh, angka di belakang koma menghitung potongan kecilnya. Kepingan itu lahir karena satu utuh dibayangkan terbelah sepuluh. Maka 0,5 berarti 5 potongan dari 10 potongan — persis setengah. Konon tanda koma dipilih para ahli hitung dulu agar utuh dan kepingannya tidak ketukar — tanda kecil, tugas besar.',
        },
        {
          objek: 'kartuSahabat', judul: 'Dua Kartu Sahabat',
          teks: 'Di dinding warung bergantung dua kartu berdampingan: kartu 0,5 dan kartu 1/2. Isinya sama persis — setengah — hanya bahasanya berbeda. Sepasang sahabat ini akan sering bertemu dalam hitunganmu ke depan.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Koma Itu Ramah!',
          teks: 'Jadi 0,5 bukan angka aneh: dia setengah yang menulis dengan bahasa koma — nol utuh plus lima dari sepuluh kepingan. Setengah gelas, setengah jam, setengah jalan semua bisa dikenalnya. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-068 · Persepuluhan 0,1 — pagi kandang sepuluh bilik ----- */
    'p1-068': {
      tema: 'kandang',
      npc: { glif: '0,1', ucap: ['Satu bilik,', 'satu persepuluh!'] },
      stasiun: [
        {
          objek: 'kandangUtuh', judul: 'Satu Kandang Utuh',
          teks: 'Pagi ini kandang kelinci baru selesai dibangun: satu kandang panjang, utuh tanpa dibagi-bagi. Papan pintunya menuliskan angka 1. Satu utuh — sebelum dibagi, itulah seluruhnya.',
        },
        {
          objek: 'sepuluhBilik', judul: 'Dibagi Sepuluh Bilik',
          teks: 'Kini kandang dibagi menjadi 10 bilik sama besar. Hitung sekatnya satu per satu: tidak ada bilik yang lebih lebar, tidak ada yang lebih sempit. Tiap bilik adalah satu potongan dari sepuluh potongan sama besar.',
        },
        {
          objek: 'bilikSatu', judul: 'Nilai Satu Bilik',
          teks: 'Satu bilik dituliskan nilainya: 0,1 — dibaca nol koma satu. Artinya satu potongan dari sepuluh potongan sama besar. Sepuluh bilik berdiri berjajar, dan tiap bilik membawa nilai yang sama.',
        },
        {
          objek: 'papanKepSepuluh', judul: 'Kumpulkan Sepuluh Kepingan',
          teks: 'Di papan tertulis: 10 keping 0,1 menjadi 1 utuh. Buktikan dengan kandangnya: bilik 1 sampai bilik 10 bila digabung kembali, kandang itu utuh kembali seperti sedia kala. Persepuluhan itu ramah — dikumpulkan sepuluh selalu kembali ke satu.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Persepuluhan Jelas!',
          teks: 'Jadi 0,1 itu satu dari sepuluh potongan sama besar — seperti satu bilik dari kandang berisi sepuluh. Dibaca nol koma satu, dan sepuluh kepingannya menjadi satu utuh. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-069 · Desimal & Pecahan Saudara — sore taman dua gerbang ----- */
    'p1-069': {
      tema: 'gerbangDua',
      npc: { glif: '=', ucap: ['Dua nama,', 'satu arti!'] },
      stasiun: [
        {
          objek: 'gerbangNolLima', judul: 'Gerbang Bertuliskan 0,5',
          teks: 'Taman ini punya dua gerbang yang saling berhadapan. Gerbang kiri menuliskan 0,5 dengan tanda koma. Siapa pun yang lewat gerbang ini tiba di satu taman yang sama.',
        },
        {
          objek: 'gerbangSetengah', judul: 'Gerbang Bertuliskan 1/2',
          teks: 'Gerbang kanan menuliskan 1/2 dengan garis pecahan. Bentuk tulisannya beda, tetapi tujuannya sama: taman yang sama persis. Tidak ada jalur yang lebih jauh — keduanya sejauh sama.',
        },
        {
          objek: 'tamanSatuKue', judul: 'Satu Taman, Satu Kue',
          teks: 'Di tengah taman, satu meja menyiapkan kue yang sama untuk siapa pun yang datang, dari gerbang mana pun ia masuk. Maka 0,5 = 1/2 — dua nama untuk satu nilai yang sama.',
        },
        {
          objek: 'gerbangSeperempat', judul: 'Pasangan Saudara Lain',
          teks: 'Di sudut taman berdiri pasangan saudara kedua: gerbang 0,25 dan gerbang 1/4. Sekali lagi dua nama, satu arti — seperempat. Kini kamu punya dua bahasa: bahasa koma dan bahasa pecahan.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Dua Bahasa Satu Arti!',
          teks: 'Jadi 0,5 dan 1/2 adalah saudara kembar yang lahir dengan nama berbeda, begitu pula 0,25 dan 1/4. Bahasa koma atau bahasa pecahan — nilai jawabannya tetap sama. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-070 · Membandingkan Desimal — malam panggung juri ----- */
    'p1-070': {
      tema: 'juri',
      npc: { glif: '>', ucap: ['Lihat angka', 'pertamanya!'] },
      stasiun: [
        {
          objek: 'kartuTujuh', judul: 'Kartu 0,7 di Panggung Kiri',
          teks: 'Panggung juri malam ini mengangkat kartu 0,7. Kartunya pendek: hanya satu angka di belakang koma. Dibaca nol koma tujuh — artinya tujuh dari sepuluh kepingan.',
        },
        {
          objek: 'kartuDuaLima', judul: 'Kartu 0,25 di Panggung Kanan',
          teks: 'Kartu kanan lebih panjang tulisannya: 0,25, dua angka di belakang koma. Dibaca nol koma dua lima — artinya dua puluh lima dari seratus kepingan. Banyak orang langsung mengira kartu yang panjang pasti lebih besar. Tunggu dulu!',
        },
        {
          objek: 'kacaPembesar', judul: 'Kaca Pembesar Angka Pertama',
          teks: 'Juri mengambil kaca pembesar dan menunjuk angka pertama setelah koma: di kiri angka 7, di kanan angka 2. Karena 7 lebih besar dari 2, kartu kiri terbukti unggul. Membandingkan desimal dimulai dari angka pertama setelah koma.',
        },
        {
          objek: 'papanSkor', judul: 'Keputusan di Papan Skor',
          teks: 'Papan skor menuliskan keputusan juri: 0,7 > 0,25. Panjang tulisan tidak menentukan besar nilai — yang menentukan adalah angka pertama setelah koma. Sekarang kamu tak mudah tertipu oleh kartu yang panjang.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Jebakan Terbongkar!',
          teks: 'Jadi membandingkan desimal: lihat dulu angka pertama setelah koma, lalu lanjut ke angka berikutnya bila sama. 0,7 tetap juara atas 0,25 sekalipun tulisannya lebih pendek. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-071 · Persen Itu Apa? — siang lapangan seratus ubin ----- */
    'p1-071': {
      tema: 'petak',
      npc: { glif: '%', ucap: ['Dari seratus!', 'Itu persen!'] },
      stasiun: [
        {
          objek: 'lapanganSeratus', judul: 'Lapangan Seratus Ubin',
          teks: 'Lapangan permainan ini dipenuhi ubin warna-warni yang dipasang berderet rapi. Hitung sisinya: 10 ubin sepanjang lapangan, 10 ubin selebarnya — seluruhnya 100 ubin. Angka 100 itulah rumah dari semua persen.',
        },
        {
          objek: 'kotakSeratus', judul: 'Kotak 100 Kelereng',
          teks: 'Di pinggir lapangan ada kotak berisi kelereng warna-warni. Bila dihitung satu-satu, isinya tepat 100 butir. Satu butir kelereng berarti satu dari seratus — itulah satu persen.',
        },
        {
          objek: 'ambilDuaLima', judul: 'Ambil 25 Kelereng',
          teks: 'Seorang pemain mengambil 25 kelereng dari kotak, sisanya kembali tertata rapi. Yang diambil itu ditulis 25% — dibaca dua puluh lima persen, artinya 25 dari 100. Persen memang bermakna "dari seratus".',
        },
        {
          objek: 'papanPersen', judul: 'Papan Rahasia Persen',
          teks: 'Di papan tertulis: 25% = 25 dari 100 = 1/4 — seperempat! Konon tanda % tumbuh dari tulisan pedagang lama: kata per cento (artinya dari seratus) yang ditulis makin ringkas sampai menjadi dua lingkaran kecil bergaris. Mengambil 25 dari 100 kelereng sama artinya dengan mengambil seperempat dari semuanya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Persen Terbuka!',
          teks: 'Jadi persen selalu bercerita tentang seratus: 25% berarti 25 dari 100, dan itu persis seperempat. Setiap kali bertemu tanda %, bayangkan kotak 100 kelereng itu. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-072 · Persen Favorit 50% — senja bak air kebun ----- */
    'p1-072': {
      tema: 'tangki',
      npc: { glif: '1/2', ucap: ['Setengah,', 'paling gampang!'] },
      stasiun: [
        {
          objek: 'bakPenuh', judul: 'Bak Penuh: 100%',
          teks: 'Sore ini bak air di kebun baru saja diisi sampai tepi. Permukaan air menyentuh garis tertinggi yang berlabel 100%. Seratus persen artinya utuh — tidak ada satu tetes pun yang kurang.',
        },
        {
          objek: 'bakSetengah', judul: 'Bak Setengah: 50%',
          teks: 'Air dipakai untuk menyiram taman, permukaannya turun sampai garis tengah berlabel 50%. Lima puluh persen artinya lima puluh dari seratus — persis setengah bak. Angka ini sahabat lamamu: 50% itu 1/2, sama seperti 0,5.',
        },
        {
          objek: 'bakKosong', judul: 'Bak Kosong: 0%',
          teks: 'Sisa air terakhir dipakai untuk kolam ikan, dan bak kini kering sampai dasar. Garis dasarnya berlabel 0%. Nol persen artinya tidak ada sama sekali — semuanya sudah dipakai dengan bermanfaat.',
        },
        {
          objek: 'papanSatuKata', judul: 'Tiga Kembar Bak Air',
          teks: 'Di papan kebun berdiri tiga kalimat pendek: 100% utuh, 50% setengah, 0% habis. Persen menyederhanakan cerita panjang menjadi satu kata yang ringkas. Karena itulah tiga angka ini paling sering dipakai sehari-hari.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Setengah Terbaca!',
          teks: 'Jadi tiga angka persen ini bisa kamu simpan di luar kepala: 100% utuh, 50% setengah, 0% habis. Bak air di kebun saja sudah mengajarkannya dengan jujur. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-073 · Tiga Rupa Satu Makna — malam ruang cermin ----- */
    'p1-073': {
      tema: 'kaca',
      npc: { glif: '3', ucap: ['Tiga rupa,', 'satu makna!'] },
      stasiun: [
        {
          objek: 'kueDiMeja', judul: 'Setengah Kue di Meja Tengah',
          teks: 'Ruang cermin malam ini menata satu kue di meja tengah, dan yang tersisa adalah setengah kue dari acara tadi. Sisa inilah yang akan dicermin tiga kali malam ini. Perhatikan bentuknya baik-baik sebelum cermin mulai bekerja.',
        },
        {
          objek: 'kacaPecahan', judul: 'Cermin Pertama: Bahasa Pecahan',
          teks: 'Cermin pertama menuliskan namanya: 1/2. Satu dari dua potongan sama besar — itulah bahasa pecahan. Cermin ini menggambarkan kue yang dibagi dua, lalu satu potongannya diambil.',
        },
        {
          objek: 'kacaDesimal', judul: 'Cermin Kedua: Bahasa Koma',
          teks: 'Cermin kedua menulis 0,5 — nol utuh, koma, lalu lima dari sepuluh kepingan. Itulah bahasa koma yang dikenalkan gelas ukur dan kandang persepuluhan dulu. Isinya tetap setengah kue yang sama.',
        },
        {
          objek: 'kacaPersen', judul: 'Cermin Ketiga: Bahasa Persen',
          teks: 'Cermin ketiga menulis 50% — lima puluh dari seratus, persen sahabat setengah itu. Tiga cermin, tiga tulisan, tetapi kue di setiap cermin tak berubah: semuanya setengah. Maka 1/2 = 0,5 = 50% — tiga rupa, satu makna.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tiga Kunci Satu Pintu!',
          teks: 'Jadi satu setengah memiliki tiga nama: 1/2, 0,5, dan 50%. Mana pun yang muncul di soal, kamu tahu isinya sama — tiga kunci untuk satu pintu yang sama. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-074 · Kenalan Uang Rupiah — siang toko kelontong ----- */
    'p1-074': {
      tema: 'toko',
      npc: { glif: 'R', ucap: ['Uang itu', 'angka nyata!'] },
      stasiun: [
        {
          objek: 'dompetBuka', judul: 'Dompet Terbuka',
          teks: 'Di toko kelontong ini seorang pembeli membuka dompetnya. Di dalamnya tersusun lembaran berwarna dan koin berbagai ukuran. Uang rupiah adalah angka yang bisa dipegang — setiap lembar menyebut nilainya sendiri dengan jelas.',
        },
        {
          objek: 'lembarSeribu', judul: 'Lembar 1.000',
          teks: 'Lembar pertama menunjukkan angka 1.000 — dibaca seribu rupiah. Angka 1 berdiri diikuti tiga nol di belakangnya. Lembar ini sering dipakai untuk membeli permen atau kue kecil.',
        },
        {
          objek: 'barisanLembar', judul: 'Dua Ribu & Lima Ribu',
          teks: 'Di belakangnya berbaris lembar 2.000 dan lembar 5.000. Nilainya berlapis-lapis: 5.000 lebih besar dari 2.000, dan 2.000 lebih besar dari 1.000. Baca angka depannya dengan teliti — satu angka mengubah seluruh nilai.',
        },
        {
          objek: 'papanKoin', judul: 'Koin Juga Punya Nilai',
          teks: 'Di piring kaca tersusun koin-koin rupiah, dan salah satunya bernilai 500. Koin dan lembar sama-sama sah dipakai berbelanja. Semua nilai itu tertulis jelas dan jujur — tidak ada yang menyembunyikan harganya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Uang Terbaca!',
          teks: 'Jadi uang rupiah itu deretan angka yang bisa dipegang: 1.000, 2.000, 5.000, dan koin-koin kecilnya. Saat berbelanja, baca angkanya dengan teliti seperti membaca buku. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-075 · Belanja & Kembalian — sore meja kasir warung ----- */
    'p1-075': {
      tema: 'kasir',
      npc: { glif: '2', ucap: ['Kurang harga,', 'jadi kembalian!'] },
      stasiun: [
        {
          objek: 'permenTigaRibu', judul: 'Harga di Rak',
          teks: 'Papan harga di rak menuliskan jelas: permen sebungkus 3.000 rupiah. Harga yang tertulis membuat pembeli dan penjual sama-sama tahu nilainya. Inilah muamalah yang baik: tak ada yang bersembunyi.',
        },
        {
          objek: 'bayarLimaRibu', judul: 'Membayar 5.000',
          teks: 'Pembeli menyerahkan lembar 5.000 ke meja kasir. Lembar itu bernilai lebih besar dari harga permen. Kasir pun mulai berhitung: berapa yang harus kembali ke pembeli?',
        },
        {
          objek: 'kembalianDua', judul: 'Kembalian 2.000',
          teks: 'Kasir menghitung: 5.000 dikurangi 3.000 sama dengan 2.000. Maka kembalian yang diserahkan adalah lembar 2.000. Hitungannya jujur dan pas — tak ada yang kelebihan, tak ada yang kekurangan.',
        },
        {
          objek: 'papanKurangKasir', judul: 'Kembalian Itu Pengurangan',
          teks: 'Di papan kasir tertulis kalimatnya: 5.000 - 3.000 = 2.000. Setiap perhitungan kembalian adalah latihan pengurangan yang nyata — bukan cuma soal di buku, tetapi ilmu yang dipakai saat berbelanja.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kasir Terbaca!',
          teks: 'Jadi kembalian tak perlu ditebak: uang dibayar dikurangi harga, sisanya kembali ke tangan. 5.000 dibayar, 3.000 dipakai, 2.000 kembali. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-076 · Menabung Seribu — pagi meja celengan ----- */
    'p1-076': {
      tema: 'celengan',
      npc: { glif: '1', ucap: ['Sedikit demi', 'sedikit jadi!'] },
      stasiun: [
        {
          objek: 'koinSenin', judul: 'Senin: Koin Pertama',
          teks: 'Pagi ini seorang anak menitipkan satu koin 500 ke celengannya. Papan catatan menuliskan: Senin 500. Koin pertama itu masih sendirian, tetapi ceritanya baru dimulai.',
        },
        {
          objek: 'koinSelasa', judul: 'Selasa: Koin Kedua',
          teks: 'Hari Selasa, koin 500 kedua masuk menemani yang pertama. Catatannya kini berbunyi: 500 + 500 = 1.000. Dua koin kecil sudah menyusun satu ribu — nilai tempat bekerja dengan setia.',
        },
        {
          objek: 'koinRabu', judul: 'Rabu: Koin Ketiga',
          teks: 'Koin ketiga masuk pada hari Rabu, dan catatan makin panjang: 500 + 500 + 500 = 1.500. Tiga koin ternyata melampaui seribu — seribu lima ratus rupiah sudah terkumpul rapi.',
        },
        {
          objek: 'celenganBahagia', judul: 'Celengan yang Setia',
          teks: 'Celengan itu tak pernah mengeluh menunggu, dan isinya bertambah sesuai catatan: 1.500 rupiah. Menabung adalah matematika yang sabar — angka kecil yang rajin mengumpulkan dirinya menjadi besar. Suatu hari nanti, tabungan itu akan menolong kebutuhan yang lebih berguna.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tabungan Tumbuh!',
          teks: 'Jadi menabung itu hitungan sederhana yang setia: 500, plus 500, plus 500 — jadi 1.500. Sedikit demi sedikit, lama-lama menjadi banyak. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-077 · Dunia Bentuk Datar — siang halaman galeri bentuk ----- */
    'p1-077': {
      tema: 'kotak',
      npc: { glif: '2D', ucap: ['Bentuk ada', 'di mana-mana!'] },
      stasiun: [
        {
          objek: 'jendelaBentuk', judul: 'Jendela Berbentuk Kotak',
          teks: 'Halaman kamp ini penuh benda yang bentuknya rapi. Jendela rumah pertama berbentuk kotak: empat sisi lurus dengan empat sudut yang sama. Lihat ke mana pun, kotak itu setia menemani — ada di pintu, meja, dan papan tulis.',
        },
        {
          objek: 'rodaBentuk', judul: 'Roda Berbentuk Bulat',
          teks: 'Roda sepeda yang bersandar di tembok berbentuk bulat sempurna: tidak punya satu sudut pun. Berkat bentuknya yang melingkar, roda dapat berputar mulus tanpa tersentak. Bayangkan bila roda berbentuk kotak — perjalanannya pasti berguncang!',
        },
        {
          objek: 'atapBentuk', judul: 'Atap Berbentuk Segitiga',
          teks: 'Rumah kecil di ujung halaman memakai atap segitiga: dua garis miring bertemu di puncak. Bentuk itu membuat air hujan mudah mengalir turun ke kedua sisinya. Kotak, bulat, segitiga — tiga bentuk ini hampir selalu kita temui berdampingan.',
        },
        {
          objek: 'papanTigaBentuk', judul: 'Papan Tiga Sahabat Bentuk',
          teks: 'Di papan depan tertulis tiga sahabat bentuk: kotak dengan empat sisi lurus, lingkaran yang melingkar rapi, dan segitiga dengan tiga sisinya. Mulai sekarang, coba bermain menghitung: berapa banyak bentuk kotak yang ada di kamarmu?',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Dunia Penuh Bentuk!',
          teks: 'Dunia ini dibangun dari bentuk-bentuk sederhana: jendela kotak, roda bulat, atap segitiga. Begitu mata terlatih mengenalnya, setiap benda tampak seperti kumpulan bentuk yang ramah. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-078 · Garis, Sisi & Sudut — fajar jalan lurus tukang kayu ----- */
    'p1-078': {
      tema: 'garisSisi',
      npc: { glif: 'I', ucap: ['Sisi bertemu,', 'sudut jadi!'] },
      stasiun: [
        {
          objek: 'jalanLurus', judul: 'Garis Itu Lurus Terus',
          teks: 'Fajar ini jalan kamp terlihat jelas: garis putih panjang yang lurus terus tanpa tikungan. Garis adalah jejak terpendek dari satu titik ke titik lain. Berjalan di atasnya, tak ada satu pun arah yang berubah.',
        },
        {
          objek: 'tigaSisiTepi', judul: 'Tiga Garis Jadi Segitiga',
          teks: 'Di bawah pohon tersusun tiga garis kayu yang ujungnya saling bertemu membentuk segitiga. Garis yang bertemu di ujung berubah nama menjadi sisi. Tiga sisi yang bertemu — itulah segitiga, bentuk pertama yang lahir dari pertemuan garis.',
        },
        {
          objek: 'sikuKayu', judul: 'Sudut Siku Sang Tegap',
          teks: 'Di meja tukang kayu tergeletak alat berbentuk L untuk memeriksa sudut. Kedua lengannya bertemu membentuk sudut siku — bukaan paling tegap, sama seperti pojok kertas bukumu. Jadi sudut itu bukan benda, melainkan bukaan di antara dua sisi yang bertemu.',
        },
        {
          objek: 'papanSudut', judul: 'Papan Aturan Sisi & Sudut',
          teks: 'Di papan tertulis aturannya: garis menjadi sisi ketika ujungnya bertemu, dan bukaan di pertemuan itu bernama sudut. Kotak membawa empat sudut, segitiga membawa tiga. Bentuk-bentuk di dunia ini sesungguhnya permainan sisi dan sudut.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Bentuk Terbaca!',
          teks: 'Jadi bentuk itu dibangun dari sisi, dan setiap pertemuan sisi meninggalkan bukaan bernama sudut. Hitung sisi dan sudutnya, maka bentuk apa pun langsung terbaca. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-079 · Keliling Itu Jalan Keliling — pagi lapangan oval ----- */
    'p1-079': {
      tema: 'jalanPutar',
      npc: { glif: 'Q', ucap: ['Satu putaran', 'penuh!'] },
      stasiun: [
        {
          objek: 'benderaMulai', judul: 'Bendera Titik Mulai',
          teks: 'Pagi ini lapangan kamp membentang dengan jalan mengelilingi rumputnya. Sebatang bendera kecil ditanam di tepi jalan sebagai titik mulai. Lomba keliling apa pun harus berangkat dan berakhir di titik yang sama.',
        },
        {
          objek: 'jalanOval', judul: 'Jalan yang Setia di Pinggir',
          teks: 'Perhatikan jalan itu: ia menyusuri tepi lapangan terus-menerus dan tidak pernah memotong ke tengah rumput. Jalan seperti ini disebut jalur keliling, karena seluruh badannya berada di pinggir lapangan.',
        },
        {
          objek: 'jejakKaki', judul: 'Melanggar sampai Kembali',
          teks: 'Seorang pelari menapak jalurnya langkah demi langkah, melewati tikungan dan rumput, sampai tiba persis di bendera tadi. Jarak satu putaran penuh yang ia lalui itulah keliling lapangan. Kembali ke titik mulai adalah tanda putarannya sah.',
        },
        {
          objek: 'papanPutaran', judul: 'Papan Satu Putaran',
          teks: 'Di papan tertulis: keliling adalah jarak jalan menyusuri pinggir sampai kembali ke titik awal. Kata keliling pada bangun datar memang dipinjam dari kebiasaan berjalan keliling ini. Keliling meja, keliling kandang — semuanya jarak satu putaran penuh.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Keliling Terjawab!',
          teks: 'Jadi keliling bukan kata sulit: jarak menyusuri pinggir sampai kembali ke tempat berangkat. Lapangan, meja, dan ponselmu semuanya punya keliling. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-080 · Keliling Persegi Panjang — sore patroli lapangan 8x5 ----- */
    'p1-080': {
      tema: 'patroli',
      npc: { glif: '26', ucap: ['Dua panjang,', 'dua lebar!'] },
      stasiun: [
        {
          objek: 'sisiPanjang', judul: 'Sisi Panjang 8 Langkah',
          teks: 'Sore ini penjaga kamp mengukur lapangan persegi panjangnya dengan langkah kaki. Sisi panjangnya ditempuh 8 langkah penuh, dari pojok sampai pojok. Angka 8 dituliskan di papan tepi agar tak terlupa.',
        },
        {
          objek: 'sisiLebar', judul: 'Sisi Lebar 5 Langkah',
          teks: 'Lalu ia berbalik dan mengukur sisi pendek lapangan: 5 langkah. Kini lapangan terbaca jelas — panjang 8 langkah, lebar 5 langkah. Dua ukuran saja sudah cukup untuk mengenal seluruh lapangan.',
        },
        {
          objek: 'patroliPutar', judul: 'Patroli Satu Putaran',
          teks: 'Tiap petang penjaga berpatroli mengelilingi lapangan: 8 langkah, lalu 5, lalu 8 lagi, lalu 5 lagi, sampai kembali ke pojok mula. Semuanya 8 + 5 + 8 + 5 = 26 langkah. Dua sisi panjang dan dua sisi lebar — itulah seluruh keliling lapangan.',
        },
        {
          objek: 'papan26', judul: 'Rumus yang Dipersingkat',
          teks: 'Di papan tertulis cerita patroli versi ringkas: (8 + 5) x 2 = 26. Artinya, jumlahkan dulu sisi panjang dan lebarnya, lalu kali dua karena masing-masing punya pasangan. Rumus hanyalah cerita berjalan keliling yang ditulis lebih pendek.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Keliling Terhitung!',
          teks: 'Jadi keliling persegi panjang tak perlu dihafal buta: jumlahkan panjang dan lebarnya, lalu kali dua. Lapangan 8 dan 5 langkah itu terbukti berkeliling 26 langkah. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-081 · Luas Itu Pasang Ubin — siang lantai baru 3x4 ubin ----- */
    'p1-081': {
      tema: 'ubin',
      npc: { glif: '12', ucap: ['Pagar pinggir,', 'ubin isi!'] },
      stasiun: [
        {
          objek: 'pagarLantai', judul: 'Pagar Keliling Dipasang Dulu',
          teks: 'Siang ini sepetak halaman akan dijadikan lantai baru. Tukang bangunan memasang pagarnya lebih dulu, mengelilingi tepi halaman dengan pas. Pagar hanya menandai sejauh mana wilayahnya — bagian dalamnya masih kosong.',
        },
        {
          objek: 'ubinPasang', judul: 'Ubin Masuk Satu per Satu',
          teks: 'Setelah pagar berdiri, ubin persegi dibawa masuk dan dipasang dari pojok, satu per satu. Lihat: sebagian lantai sudah tertutup ubin rapat, sebagian masih menampakkan tanah. Pagar di pinggir, ubin mengisi bagian dalam — inilah bedanya.',
        },
        {
          objek: 'ubinDuaBelas', judul: 'Menghitung Isi Lantai',
          teks: 'Lantai kecil itu ternyata menampung 12 ubin: hitung barisannya, ada 3 baris dan tiap baris berisi 4 ubin. Seluruh ubin itu bekerja sama menutupi isi lantai sampai tak tersisa tanah. Banyaknya ubin penutup itulah yang disebut luas.',
        },
        {
          objek: 'papanPagarKarpet', judul: 'Papan Pagar & Ubin',
          teks: 'Di papan tertulis pengingatnya: keliling adalah panjang pagarnya, luas adalah banyak ubin yang menutup isinya. Keliling bertanya "berapa panjang jalan kelilingnya?", luas bertanya "berapa ubin menutupi seluruhnya?". Dua pertanyaan berbeda untuk satu lantai yang sama.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Luas Terbuka!',
          teks: 'Jadi luas itu banyak ubin yang dibutuhkan untuk menutupi seluruh bagian dalam. Pagar mengukur pinggir, ubin mengukur isi. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-082 · Luas Persegi Panjang — sore ubin 4 baris berisi 6 ----- */
    'p1-082': {
      tema: 'barisUbin',
      npc: { glif: '24', ucap: ['Baris kali', 'kolom!'] },
      stasiun: [
        {
          objek: 'barisEnam', judul: 'Satu Baris Berisi 6',
          teks: 'Sore ini lantai yang lebih besar mulai dibangun. Ubin pertama disusun menjadi satu baris lurus berisi 6 ubin. Baris pertama inilah patungan seluruh lantai.',
        },
        {
          objek: 'empatBaris', judul: 'Empat Baris Rapat',
          teks: 'Baris kedua, ketiga, dan keempat menyusul dipasang tepat di bawah baris pertama. Kini ada 4 baris, dan tiap baris berisi 6 ubin tanpa celah. Menghitungnya pun ringan: 6 + 6 + 6 + 6 = 24 ubin.',
        },
        {
          objek: 'hitungLompat', judul: 'Trik Lompat Kelipatan',
          teks: 'Seorang tukang menghitung dengan lompatan: 6, 12, 18, 24 — hanya empat kali melompat dan seluruh lantai selesai dihitung! Itulah jurus perkalian yang dikenalkan di penjuru kali dulu. 4 baris berisi 6 ubin sama artinya dengan 4 x 6 = 24.',
        },
        {
          objek: 'papan64', judul: 'Papan Hitung Kilat',
          teks: 'Di papan tertulis: 4 baris berisi 6 ubin, maka 4 x 6 = 24 ubin. Tidak perlu menempelkan ubin satu per satu untuk mengetahui isinya. Hitungan bisa selesai di kertas sebelum ubin dibawa ke lantai.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Hitung Kilat Jadi!',
          teks: 'Jadi luas persegi panjang itu baris kali kolom: 4 x 6 = 24 ubin. Rumus panjang kali lebar ternyata hanya cerita menata ubin yang dipersingkat. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-083 · Segitiga Setengah Kotak — malam bengkel karpet segitiga ----- */
    'p1-083': {
      tema: 'karpet',
      npc: { glif: '1/2', ucap: ['Setengah', 'kotak cukup!'] },
      stasiun: [
        {
          objek: 'kotakUbin24', judul: 'Pesanan Kotak 24 Ubin',
          teks: 'Malam ini bengkel karpet menerima pesanan berbentuk kotak berukuran 4 baris berisi 6 ubin. Hitung cepatnya sudah hafal: 4 x 6 = 24 ubin. Lalu pelanggan bertanya — bila karpetnya dipotong segitiga, berapa ubin yang perlu dibeli?',
        },
        {
          objek: 'segitigaSampir', judul: 'Segitiga di Dalam Kotak',
          teks: 'Pemilik bengkel menggambar segitiga raksasa di dalam kotak itu: alasnya membentang di sisi bawah, puncaknya menyentuh sisi atas — ibarat selimut yang menyampir menutupi separuh kotak. Kedua sisinya miring persis menghubungkan pojok-pojok kotak.',
        },
        {
          objek: 'duaSegitiga', judul: 'Dua Segitiga Satu Kotak',
          teks: 'Rahasianya terbuka saat segitiga kembarannya dibalik: segitiga pertama menutup 12 ubin, segitiga kembarannya juga 12, dan 12 + 12 = 24 — kotak penuh! Maka satu segitiga pasti setengah kotaknya. Tidak perlu menghitung ubin segitiga satu per satu.',
        },
        {
          objek: 'papanSetengah', judul: 'Papan Resep Setengah',
          teks: 'Di papan tertulis resepnya: luas segitiga = 1/2 x alas x tinggi. Contoh kotak tadi: 1/2 x 6 x 4 = 12 ubin. Alas dan tinggi adalah ukuran kotak yang menyampirinya, lalu ambil separuhnya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Cukup Setengah!',
          teks: 'Jadi luas segitiga itu setengah kotak penyampirnya: 1/2 x alas x tinggi. Karpet segitiga tadi cukup dibeli 12 ubin, bukan 24. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-084 · Lingkaran Si Bulat — malam bengkel roda & Pi ----- */
    'p1-084': {
      tema: 'rodaDunia',
      npc: { glif: '3,14', ucap: ['Dari pusat', 'ke tepi!'] },
      stasiun: [
        {
          objek: 'pusatRoda', judul: 'Titik Pusat Roda',
          teks: 'Malam ini bengkel roda menyala penuh. Sebuah roda kayu baru diletakkan di meja kerja, dengan lubang kecil di tengahnya sebagai tanda pusat. Pusat itu ibarat rumah roda: seluruh bagian roda menjaga jarak yang setia kepadanya.',
        },
        {
          objek: 'jariRoda', judul: 'Jari-Jari yang Sama Panjang',
          teks: 'Dari pusat dipancarkan jari-jari roda menuju tepinya. Ada tiga jari-jari digambar sebagai contoh, dan panjang ketiganya sama persis. Dari pusat ke tepi, tak pernah lebih panjang, tak pernah lebih pendek — itulah jari-jari.',
        },
        {
          objek: 'taliKeliling', judul: 'Tali Melilit Sekeliling',
          teks: 'Seutas tali dipakai melilit tepi roda satu putaran penuh, lalu dibentangkan lurus di lantai. Panjang tali itulah keliling lingkaran — sama seperti jalan keliling lapangan dulu, hanya kali ini melingkar bulat.',
        },
        {
          objek: 'papanPi', judul: 'Papan Temuan Angka Setia',
          teks: 'Di papan tertulis temuan bengkel: keliling lingkaran kira-kira 3,14 kali diameternya — diameter adalah jarak dari tepi ke tepi melalui pusat. Angka 3,14 itu bernama Pi; konon para ahli hitung sudah lama sekali memburu angka setia ini. Roda besar maupun kecil menaati angka yang sama.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Roda Setia!',
          teks: 'Jadi lingkaran punya pusat, jari-jari yang sama panjang dari pusat ke tepi, dan keliling yang kira-kira 3,14 kali diameternya. Satu bentuk, satu angka setia di mana-mana. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-085 · Kenalan Kubus & Balok — siang gudang kardus ----- */
    'p1-085': {
      tema: 'kardus',
      npc: { glif: '3D', ucap: ['Punya isi,', 'bukan datar!'] },
      stasiun: [
        {
          objek: 'daduBesar', judul: 'Dadu, Kotak Sempurna',
          teks: 'Di rak gudang terguling dadu raksasa milik permainan kamp. Dadu itu kubus: seluruh sisinya berbentuk kotak yang sama besar. Tidak ada sisi yang lebih panjang — semua menghadap ke segala arah dengan rapi.',
        },
        {
          objek: 'kardusBesar', judul: 'Kardus, Saudara yang Dipanjangkan',
          teks: 'Di lantai berdiri kardus berbentuk balok. Balok adalah saudara kubus: sisinya juga kotak, tetapi tidak semua sama besar — ada yang panjang, ada yang lebar, ada yang pendek. Kardus, lemari, dan buku tebal sering berbentuk seperti ini.',
        },
        {
          objek: 'sisiEnamDadu', judul: 'Membuka Kulit Kubus',
          teks: 'Kubus dibuka di atas kertas: empat kotak berjajar, ditambah satu kotak menempel di atas dan satu di bawah. Hitung bersama: 1, 2, 3, 4, 5, 6 — enam sisi itulah seluruh kulit kubus. Teman datarnya hanya satu lembar, bentuk tiga dimensi punya kulit lebih banyak.',
        },
        {
          objek: 'papanIsi', judul: 'Papan Naik Kelas ke 3D',
          teks: 'Di papan tertulis: bentuk datar hanya punya panjang dan lebar, sedangkan kubus dan balok punya satu lagi — isi. Karena itulah mereka disebut bentuk tiga dimensi: punya ruang, bisa menampung, dan terasa mantap saat dipegang. Dunia datar tadi naik kelas menjadi dunia berisi.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Bentuk Punya Isi!',
          teks: 'Jadi kubus itu kotak sempurna berenam sisi sama besar, dan balok saudaranya yang sisi-sisinya tidak seragam. Keduanya punya isi — panjang, lebar, dan tinggi. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-086 · Detektif Bentuk di Sekitar — malam kamar 5 bentuk ----- */
    'p1-086': {
      tema: 'kamarMalam',
      npc: { glif: '5!', ucap: ['Lima bentuk', 'menanti!'] },
      stasiun: [
        {
          objek: 'papanMisi', judul: 'Misi Detektif Bentuk',
          teks: 'Malam ini seorang detektif kecil menerima misi: temukan 5 bentuk di kamar sebelum tidur. Di papan misi tersusun 5 kotak kosong yang harus dicoret satu per satu. Lampu tidur dinyalakan, misi pun dimulai.',
        },
        {
          objek: 'jendelaPintu', judul: 'Dua Bentuk di Dinding',
          teks: 'Lampu tidur menyapu dinding: jendela berbentuk persegi — centang pertama; pintu berbentuk persegi panjang — centang kedua. Dua bentuk ditemukan tanpa perlu keluar kamar. Detektif mencoret dua kotak pertama di papan misinya.',
        },
        {
          objek: 'piringAtap', judul: 'Dua Bentuk Lagi di Sudut Kamar',
          teks: 'Di meja belajar terdapat piring berbentuk lingkaran — centang ketiga. Rumah-rumahan di pojok kamar membawa atap segitiga — centang keempat. Kini empat kotak misi telah tercoret, tinggal satu lagi.',
        },
        {
          objek: 'kotakMainan', judul: 'Bentuk Kelima: Kotak Mainan',
          teks: 'Yang terakhir tersimpan di bawah ranjang: kotak mainan berbentuk kubus — bentuk kelima ditemukan! Daftar misi lengkap: persegi, persegi panjang, lingkaran, segitiga, kubus. Lima bentuk, lima centang, misi tuntas.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Mata Detektif Tajam!',
          teks: 'Jadi begitu mata terlatih, kamar sendiri pun menjadi tempat berburu bentuk: jendela persegi, pintu persegi panjang, piring lingkaran, atap segitiga, dan kotak kubus. Malam ini 5 bentuk kalah cepat oleh detektif kecil. Owalah, ternyata begini toh — mudah, bukan?',
        },
      ],
    },

    /* ----- p1-087 · Panjang: cm & m — fajar jalan pengukur bermarka ----- */
    'p1-087': {
      tema: 'penggaris',
      npc: { glif: 'cm', ucap: ['Dunia bisa', 'diukur!'] },
      stasiun: [
        {
          objek: 'penggarisRaksasa', judul: 'Penggaris Raksasa di Jalan',
          teks: 'Di ujung kamp berbaring sebuah penggaris sepanjang pagar: kayunya bergaris dari nol sampai seratus. Sepanjang itulah satu meter, dan setiap kotak kecilnya bernilai satu sentimeter. Hitung kotaknya bersama: sepuluh kotak membentuk satu batang panjang, dan sepuluh batang panjang penuhi seluruh penggaris. Jadi 1 meter sama dengan 100 sentimeter.',
        },
        {
          objek: 'jariKelingking', judul: 'Pengukur Bawaan Sejak Lahir',
          teks: 'Sebuah tangan menguji penggaris itu: jari kelingkingnya menempel pas dari garis nol sampai kotak pertama. Kira-kira itulah lebar satu sentimeter pada tangan anak-anak maupun orang dewasa. Tubuh kita memang alat ukur pertama: jari, jengkal tangan, dan langkah kaki semuanya bisa menjadi patokan dadakan.',
        },
        {
          objek: 'langkahMeter', judul: 'Langkah yang Sejengkal Pas',
          teks: 'Di jalan bermarka, seorang pengukur berjalan besar-besar: satu langkahnya mendarat tepat di garis kapur berikutnya. Markanya berjarak satu meter satu sama lain, dan langkah besarnya kira-kira sejauh itu. Sepuluh langkah rapi berarti kira-kira sepuluh meter jalan sudah terlewati.',
        },
        {
          objek: 'papanMeter', judul: 'Konon, dari Bumi Lahirlah Meter',
          teks: 'Papan di bawah menara membaca cerita: konon para ilmuwan di negeri Prancis menghitung jarak dari kutub utara sampai garis tengah bumi, lalu membaginya sepuluh juta. Sepanjang itulah mereka menetapkan satu meter. Sejak itu, orang di mana pun bisa menyepakati ukuran yang sama.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Semua Bisa Diukur!',
          teks: 'Jadi satu meter berisi seratus sentimeter, jari kelingking kira-kira satu sentimeter, dan satu langkah besar kira-kira satu meter. Dari penggaris raksasa tadi sampai langkah kakimu, semua panjang kini punya bahasa yang sama. Owalah, ternyata begini toh — mengukur itu hanya menjodohkan benda dengan garis. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-088 · Berat: gram & kg — siang bazar timbangan jujur ----- */
    'p1-088': {
      tema: 'bazarBerat',
      npc: { glif: 'kg', ucap: ['Timbangan jujur', 'tak bohong!'] },
      stasiun: [
        {
          objek: 'neracaPas', judul: 'Neraca yang Seimbang Sempurna',
          teks: 'Di lapak pertama tergantung neraca dua piring, dan hari ini ia tak bergoyang sedikit pun. Piring kiri memikul satu bungkus besar bertanda 500, piring kanan memikul dua bungkus kecil masing-masing 250. Dua ratus lima puluh ditambah dua ratus lima puluh tepat lima ratus — pas sudah, seimbang tanpa berat sebelah.',
        },
        {
          objek: 'gulaKilo', judul: 'Bungkus Besar Sang Kilogram',
          teks: 'Di lapak sebelah tersusun bungkus gula yang biasa dibawa pulang para pembeli: satu bungkus utuh beratnya satu kilogram. Di papan tertulis persahabatan angkanya: 1 kilogram sama dengan 1.000 gram. Berarti setengah kilogram adalah 500 gram — persis berat bungkus di neraca tadi.',
        },
        {
          objek: 'telurKertas', judul: 'Perbandingan yang Mengagetkan',
          teks: 'Pada timbangan kecil berdampingan dua benda yang jauh berbeda bobotnya: sebutir telur dan selembar kertas. Telur itu kira-kira lima puluh gram, sedangkan kertas cuma kira-kira lima gram. Berarti berat sepuluh lembar kertas hampir sama dengan satu butir telur — betapa ringannya sesuatu tetap bisa tercatat.',
        },
        {
          objek: 'papanKilo', judul: 'Konon, Kilogram Lahir dari Air',
          teks: 'Papan bazar menceritakan asalnya: konon para ilmuwan dulu menimbang satu liter air murni, lalu berat itulah yang mereka jadikan satu kilogram. Kemudian dibuat pula batang rujukan yang disimpan istimewa di museum negeri Prancis. Sejak itu, setiap timbangan di dunia berbicara bahasa yang sama.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Berat Punya Bahasa!',
          teks: 'Jadi 1 kilogram sama dengan 1.000 gram, setengah kilogram 500 gram, telur kira-kira 50 gram, dan kertas kira-kira 5 gram. Neraca jujur tidak bisa dibohongi, dan kini kamu paham bahasanya. Owalah, ternyata begini toh — menimbang itu cuma membandingkan dengan patokan yang disepakati. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-089 · Takaran: liter & ml — sore dapur takaran ----- */
    'p1-089': {
      tema: 'takaranAir',
      npc: { glif: 'ml', ucap: ['Takar rata,', 'masak jadi!'] },
      stasiun: [
        {
          objek: 'gelasUkur250', judul: 'Gelas Ukur Sang Pengukur Setia',
          teks: 'Di dapur takaran berdiri satu gelas ukur dengan garis-garis kecil di badannya. Air di dalamnya berhenti tepat pada garis 250, artinya 250 mililiter. Gelas air minum di rumah biasanya kira-kira sesegelas itu — jadi angka 250 bukan angka asing, dia teman minummu sendiri.',
        },
        {
          objek: 'botolLiter', judul: 'Botol Besar dan Papan Persahabatan',
          teks: 'Di sampingnya berdiri botol tinggi bertanda 1 liter, dengan papan persahabatan di bawahnya: 1 liter sama dengan 1.000 mililiter. Kalau gelas tadi mengangkut 250, botol ini menampung empat kali lipatnya. Mililiter itu kepingan kecil, liter adalah utuhannya.',
        },
        {
          objek: 'tekoTuang', judul: 'Empat Gelas Jadi Satu Liter',
          teks: 'Teko menuang perlahan, dan empat gelas ukur berbaris menerimanya bergantian. Setiap gelas diisi sampai garis 250, sehingga 250 ditambah 250 ditambah 250 ditambah 250 genap 1.000 mililiter. Tuangannya berhenti tepat: empat gelas penuh jadi satu liter.',
        },
        {
          objek: 'papanLiter', judul: 'Konon, Air Menyatukan Dua Ukuran',
          teks: 'Papan dapur menuliskan rahasia lama: konon, berat satu liter air murni itulah yang dulu dijadikan satu kilogram. Karena itu takaran dan berat ibarat saudara kandung — satu liter air kira-kira seberat satu kilogram. Dari dapur sampai laboratorium, keduanya tetap berjabat tangan.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Dapur Jadi Laboratorium!',
          teks: 'Jadi 1 liter sama dengan 1.000 mililiter, satu gelas kira-kira 250 mililiter, dan empat gelas penuh genap satu liter. Dengan takaran yang rata, resep apa pun bisa diulang dengan rasa yang sama. Owalah, ternyata begini toh — memasak di dapur adalah laboratorium takaran. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-090 · Jam & Menit — senja menara jam berlonceng ----- */
    'p1-090': {
      tema: 'menaraJam',
      npc: { glif: '60', ucap: ['Waktu berdetak', 'teratur!'] },
      stasiun: [
        {
          objek: 'jamRaksasa', judul: 'Menara dengan Lingkar Waktu',
          teks: 'Di pusat kota berdiri menara dengan jam raksasa yang berdetak pelan. Lingkarannya berisi angka 1 sampai 12, dan dua jarum berjalan di atasnya. Yang pendek berjalan santai menandai jam, yang panjang berjalan penuh semangat menandai menit — pandailah membedakan keduanya.',
        },
        {
          objek: 'jarumDua', judul: 'Membaca Jam Pukul Tiga',
          teks: 'Sekarang jam menunjukkan pukul tiga tepat: jarum pendek berdiri di angka 3, jarum panjang berteduh di angka 12. Artinya tiga jam penuh lewat dan nol menit tambahan. Kalau jarum panjang maju satu angka, itu berarti lima menit berlalu — dua belas angka kali lima menit genap enam puluh.',
        },
        {
          objek: 'detikBerlari', judul: 'Tangga Detik ke Jam',
          teks: 'Di bawah lonceng tergantung papan berisi tangga waktu: 1 menit berisi 60 detik, dan 1 jam berisi 60 menit. Detik adalah langkah terkecil yang berbunyi tik... tik... tik. Dari detik naik ke menit, dari menit naik ke jam — seperti tangga yang naik enam puluh langkah sekaligus.',
        },
        {
          objek: 'papanEnamPuluh', judul: 'Konon, 60 Itu Angka Adil',
          teks: 'Papan menara menjelaskan rahasia angka enam puluh: konon bangsa Babilonia kuno memilihnya karena mudah dibagi rata. Enam puluh bisa terbagi adil ke 2, ke 3, ke 4, ke 5, dan ke 6 tanpa sisa — coba hitung: 30, 20, 15, 12, lalu 10. Wah, waktu memang diurus oleh angka yang adil.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Detak Punya Aturan!',
          teks: 'Jadi 60 detik satu menit, 60 menit satu jam, dan jarum pendek menandai jam sementara yang panjang menandai menit. Angka 60 dipilih konon karena paling adil saat dibagi rata. Owalah, ternyata begini toh — waktu berdetak dengan aturan yang bisa kamu baca sendiri. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-091 · Hari, Minggu & Kalender — malam arsip waktu ----- */
    'p1-091': {
      tema: 'arsipWaktu',
      npc: { glif: '7', ucap: ['Tujuh hari,', 'satu minggu!'] },
      stasiun: [
        {
          objek: 'kalenderTujuh', judul: 'Kalender dengan Tujuh Pilar',
          teks: 'Di arsip waktu tergantung kalender raksasa dengan tujuh kolom bertanda Senin sampai Minggu. Satu baris penuh berarti satu minggu lewat, dan kolomnya berganti terus tanpa pernah bingung. Tujuh hari itu berputar seperti roda: hari ini Jumat, besok Sabtu, dan kembali lagi tepat sesudah Minggu.',
        },
        {
          objek: 'bulanFase', judul: 'Konon, Bulan Mengajari Berhitung',
          teks: 'Di jendela arsip tampak bulan berganti bentuk: muda, purnama, lalu menyusut lagi. Konon satu seputaran penuhnya kira-kira tiga puluh hari, dan dari gerak itulah orang zaman dulu menamai waktu "bulan". Langit ternyata guru berhitung yang pertama.',
        },
        {
          objek: 'kabisatEmpat', judul: 'Tahun yang Sisa Seperempat',
          teks: 'Papan arsip membuka hitungan panjang: setahun kira-kira 365 hari, tetapi sebenarnya ada sisa seperempat hari yang menganggur. Karena itu, biasanya tiap empat tahun sekali keempat seperempat itu digabung menjadi satu hari ekstra di bulan Februari. Tahun dengan 366 hari itu namanya tahun kabisat — kalender pun tetap presisi.',
        },
        {
          objek: 'papanWaktu', judul: 'Buku Catatan Paling Rajin',
          teks: 'Di lemari arsip tersimpan kalender-kalender setahun penuh, dan tak satu pun halamannya bolong. Kalender adalah buku catatan waktu: minggu merapikan hari, bulan merapikan minggu, tahun merapikan bulan. Siapa pun yang bisa membacanya dijamin tak pernah kehilangan tanggal.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Waktu Tertata Rapi!',
          teks: 'Jadi tujuh hari satu minggu, kira-kira tiga puluh hari satu bulan, dan setahun kira-kira 365 hari dengan hari ekstra tiap empat tahun. Waktu tidak pernah kacau karena sudah lama diatur dengan hitungan. Owalah, ternyata begini toh — kalender hanyalah buku catatan yang paling rajin. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-092 · Panas & Dingin: Suhu — siang kota dua iklim ----- */
    'p1-092': {
      tema: 'duaIklim',
      npc: { glif: 'C', ucap: ['Dingin panas', 'terukur!'] },
      stasiun: [
        {
          objek: 'termometerBeku', judul: 'Garis Nol: Tempat Air Membeku',
          teks: 'Di sisi kota yang bersalju berdiri termometer raksasa, dan cairannya diam di garis nol. Di situ gelas air berubah menjadi es: di tempat biasa, air membeku pada 0 derajat. Semakin jauh turun di bawah nol, semakin tebal pula bekunya.',
        },
        {
          objek: 'termometerDidih', judul: 'Garis Seratus: Tempat Air Mendidih',
          teks: 'Di sisi hangat, panci besar mendesis mengepul di atas tungku, dan termometer di dekatnya naik sampai garis seratus. Di dapur biasa, air mendidih pada 100 derajat — uapnya menari naik ke langit-langit. Dari nol sampai seratus, itulah jalan yang dilalui air dari es sampai uap.',
        },
        {
          objek: 'tubuhTigaTujuh', judul: 'Angka Tubuh Kita Sendiri',
          teks: 'Di antara dua sisi kota ada papan kecil bertanda 37. Kira-kira itulah suhu tubuh kita saat sehat — tidak sedingin es, tidak sepanas mendidih. Kalau termometer menunjuk jauh di atas angka itu, biasanya seseorang sedang demam dan perlu banyak istirahat.',
        },
        {
          objek: 'papanDerajat', judul: 'Konon, Nama Ilmuwan Jadi Nama Skala',
          teks: 'Papan kota menceritakan asal-usulnya: skala derajat ini konon diambil dari nama ilmuwan Swedia bernama Celsius. Jadi tiap kali orang menyebut 25 derajat Celsius, mereka ikut mengenangnya. Satu ide sederhana — garis nol dan garis seratus — kini dipakai termometer di seluruh dunia.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Panas Dingin Terukur!',
          teks: 'Jadi air membeku di 0 derajat, mendidih di 100 derajat, dan tubuh kita sehat di kira-kira 37 derajat. Suhu adalah jam-nya panas dan dingin: bukan kira-kira terasa, tapi terukur jelas. Owalah, ternyata begini toh — derajat hanya garis yang disepakati bersama. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-093 · Pola Berulang — malam festival lampu berpola ----- */
    'p1-093': {
      tema: 'festivalPola',
      npc: { glif: 'AB', ucap: ['Pola itu', 'bisa diulang!'] },
      stasiun: [
        {
          objek: 'lampuFestival', judul: 'Lampu yang Suka Meniru Diri',
          teks: 'Festival teka-teki dibuka oleh tali lampu gantung: merah, biru, merah, biru, merah, biru — begitu terus sampai ujung gerbang. Polanya rapi: setelah merah selalu biru, setelah biru selalu merah. Coba lanjutkan polanya sebelum melihat lampu ketujuh — dia berdiri tepat setelah biru, jadi pasti merah.',
        },
        {
          objek: 'ubinPola', judul: 'Ubin yang Berbaris Tertib',
          teks: 'Di jalan festival, ubin menyusun pola sendiri: segitiga, bulat, segitiga, bulat, segitiga, bulat. Para pengunjung melangkah sambil berbisik polanya, dan tak seorang pun tersandung. Satu kelompok kecil — segitiga lalu bulat — diulang-ulang tanpa lelah, itulah satu pasal pola.',
        },
        {
          objek: 'gelangManik', judul: 'Gelang yang Selalu Kembali',
          teks: 'Di lapak manik, seorang penjual merangkai gelang dengan urutan kuning, hijau, kuning, hijau sampai melingkar penuh. Yang menarik, gelang itu tak punya ujung: polanya berputar dan kembali ke awal tanpa pernah kacau. Menemukan pola sama dengan menemukan aturan yang setia diulang.',
        },
        {
          objek: 'papanPola', judul: 'Papan Rahasia Para Penemu Pola',
          teks: 'Papan besar di gerbang menulis: menemukan pola itu menemukan jalan pintas berpikir. Sebab kalau aturannya ketahuan, langkah berikutnya bisa dihitung tanpa perlu menunggu. Otak yang terbiasa mencari pola akan cepat menangkap apa pun yang berulang — dari lagu, dari hari, sampai dari angka.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Pola Bisa Ditebak!',
          teks: 'Jadi merah-biru berulang, segitiga-bulat berulang, dan kuning-hijau berputar tanpa ujung. Pola itu aturan yang berulang, dan aturan yang berulang selalu bisa dilanjutkan. Owalah, ternyata begini toh — melanjutkan pola pun jadi mudah begitu aturannya ketahuan. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-094 · Angka yang Hilang — malam kantor detektif teka-teki ----- */
    'p1-094': {
      tema: 'kantorTeka',
      npc: { glif: '6', ucap: ['Pelaku sudah', 'ditemukan!'] },
      stasiun: [
        {
          objek: 'jejakHilang', judul: 'Jejak Angka Terputus',
          teks: 'Malam ini kantor teka-teki menerima laporan: jejak angka 2, 4, ?, 8 ternyata bolong di tengah. Kartu tanda tanya digantung di papan jejak, dan detektif kecil dipanggil untuk menyelidikinya. Satu-satunya petunjuk: pelakunya seorang angka yang bersembunyi di antara 4 dan 8.',
        },
        {
          objek: 'kacaTeka', judul: 'Kaca Pembesar Meneliti Lompatan',
          teks: 'Detektif mengangkat kaca pembesar dan meneliti jarak antar angka. Dari 2 ke 4 melompat dua langkah; tak ada jejak yang terlewat. Kalau pelompat ini setia, lompatannya dari 4 ke angka berikutnya pun mestinya dua langkah lagi.',
        },
        {
          objek: 'kartuTebak', judul: 'Pelaku Ditemukan di Balik Loker',
          teks: 'Loker ketiga dibuka, dan tersenyumlah detektif: kartu angka 6 tersimpan di dalamnya. Empat ditambah dua memang enam, dan enam ditambah dua memang delapan — jejaknya nyambung sempurna. Kasus 2, 4, 6, 8 resmi ditutup dengan satu kartu bukti.',
        },
        {
          objek: 'papanBeda', judul: 'Papan Ciri: Beda Tetangga Sama',
          teks: 'Di papan kasus ditulis ciri pelakunya: pada barisan naik yang tertib, beda antar tetangga selalu sama. 2 ke 4 beda 2, 4 ke 6 beda 2, 6 ke 8 beda 2 — tiga kali lompatan yang seragam. Begitu beda tetangga ketahuan, angka mana pun yang hilang bisa dipanggil pulang.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Detektif Angka Berhasil!',
          teks: 'Jadi 2, 4, 6, 8 naik rapi dua demi dua, dan si tanda tanya ternyata cuma 6 yang iseng sembunyi. Detektif angka tak butuh keberuntungan — dia hanya membaca lompatannya dengan teliti. Owalah, ternyata begini toh — mencari yang hilang hanyalah mengikuti jejak beda tetangga. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-095 · Kotak Ajaib Angka — malam paviliun kotak 3x3 ----- */
    'p1-095': {
      tema: 'paviliun',
      npc: { glif: '15', ucap: ['Semua garis', 'berjumlah 15!'] },
      stasiun: [
        {
          objek: 'kotakAjaib', judul: 'Paviliun dengan Kotak Bercahaya',
          teks: 'Di paviliun ujung festival tergantung kotak ajaib tiga kali tiga: 4, 9, 2 di baris paling atas; 3, 5, 7 di tengah; 8, 1, 6 di bawahnya. Semua angka 1 sampai 9 terpakai, tak ada yang diulang. Konon kotak seperti ini pernah muncul di gambar punggung kura-kura sungai di negeri China kuno.',
        },
        {
          objek: 'garisAjaib', judul: 'Setiap Garis Bernilai Sama',
          teks: 'Lampu sorot berjalan menyusuri kotak: baris atas 4 ditambah 9 ditambah 2 genap 15. Baris tengah 3, 5, 7 juga 15; baris bawah 8, 1, 6 tetap 15. Bahkan tiga kolomnya dan dua garis diagonalnya ikut menyusul — semua berjumlah 15 tanpa kecuali.',
        },
        {
          objek: 'kuraLegenda', judul: 'Kura-Kura Sang Pembawa Pola',
          teks: 'Patung kura-kura batu duduk tenang di sudut paviliun, punggungnya penuh titik-titik tersusun tiga baris. Cerita rakyat menyebut pola itu ditemukan dulu di punggung kura-kura sungai ketika banjir surut. Benar atau tidak, yang pasti polanya murni hitungan: rapi, adil, dan tak pernah berubah.',
        },
        {
          objek: 'papanLimaBelas', judul: 'Mengapa Harus 15? Ini Buktinya',
          teks: 'Papan bukti membongkar rahasianya dengan hitungan biasa: jumlah semua angka 1 sampai 9 ialah 45. Kotak itu punya tiga baris, dan tiap baris wajib sama berat; 45 dibagi 3 genap 15. Jadi angka 15 bukan kebetulan semata — dia keharusan yang bisa dihitung siapa pun.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kotak Ajaib Terbongkar!',
          teks: 'Jadi sembilan angka tersusun agar tiap garis berjumlah 15, dan rahasianya 45 dibagi 3. Kotak ajaib ternyata bukan mantra — dia teka-teki hitung yang sudah lama diulang dari zaman ke zaman. Owalah, ternyata begini toh — rahasia paling indah adalah hitungan yang setia. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-096 · Hitung Cepat di Kepala — siang arena lomba hitung ----- */
    'p1-096': {
      tema: 'arenaGeser',
      npc: { glif: '116', ucap: ['Geser sedikit,', 'hitung ringan!'] },
      stasiun: [
        {
          objek: 'lombaMulai', judul: 'Ajang Lomba Hitung Kilat',
          teks: 'Arena hitung cepat menyala dengan papan soal pertama: 99 ditambah 17. Peserta yang menghitung dengan jari mulai berkeringat, tetapi juara bertahan malah tersenyum. Dia tahu jurus rahasia yang tak pernah gagal: geser sedikit, hitungan jadi ringan.',
        },
        {
          objek: 'geserSatu', judul: 'Satu Kelereng Pindah Tempat',
          teks: 'Di meja juri dua tumpukan kelereng bertanda 99 dan 17. Sang juara memindahkan satu kelereng dari tumpukan 17 ke tumpukan 99: kini 100 berdiri rapi dan 17 menjadi 16. Jumlah totalnya tidak berkurang sedikit pun — kelereng hanya pindah rumah.',
        },
        {
          objek: 'papanSeratusEnam', judul: 'Hasil yang Tampak Sekilas',
          teks: 'Papan jawaban menyala: 100 ditambah 16 sama dengan 116. Tak perlu bersusun, tak perlu menyimpan ke puluhan — jawaban langsung tampak sebelum mata. Jadi 99 ditambah 17 tetap 116, hanya jalannya lebih landai.',
        },
        {
          objek: 'finishKilat', judul: 'Ujian Kilat di Garis Akhir',
          teks: 'Di garis akhir menunggu soal kedua: 98 ditambah 27. Kali ini dua kelereng berpindah — 98 menjadi 100, dan 27 menjadi 25. Papan juara menulis hasilnya sebelum peluit berbunyi: 100 ditambah 25 genap 125.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Cepat Itu Sah!',
          teks: 'Jadi 99+17=100+16=116 dan 98+27=100+25=125 — dua-duanya hanya trik memindah kelereng. Matematika membolehkan jalan pintas asal jumlahnya tak berubah sepeser pun. Owalah, ternyata begini toh — menggeser sedikit membuat kepala ringan. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-097 · Labirin Angka — senja labirin lampion kelipatan 3 ----- */
    'p1-097': {
      tema: 'labirin',
      npc: { glif: '3', ucap: ['Kelipatan tiga', 'satu-satunya!'] },
      stasiun: [
        {
          objek: 'gerbangLabirin', judul: 'Gerbang yang Pemilih',
          teks: 'Senja tiba, dan labirin lampion menyalakan gerbangnya dengan papan peringatan: lewati hanya kelipatan 3. Setiap pintu di dalamnya memakai nomor, dan nomor yang bukan kelipatan tiga akan menutup jalan. Hanya pencacah yang teliti yang bisa lolos dengan selamat.',
        },
        {
          objek: 'jalurTiga', judul: 'Jalan Raya Berkelipatan Tiga',
          teks: 'Jalur utamanya memanjang dengan batu pipih bernomor: 3, 6, 9, 12, 15, 18. Setiap loncatan menambah tiga, dan benar saja — semua nomornya habis dibagi tiga. Semakin jauh dilangkahi, semakin panjang daftarnya: 21, 24, 27, 30 masih menunggu di depan.',
        },
        {
          objek: 'jalanBuntu', judul: 'Dua Pintu yang Menipu',
          teks: 'Di percabangan menunggu dua pintu menggoda: nomor 14 dan nomor 25. Pintu 14 terbuka sedikit lalu macet — 14 tidak habis dibagi 3; pintu 25 macet juga, karena 25 juga bukan kelipatannya. Dua-duanya jalan buntu, dan labirin tertawa pelan di balik lampionnya.',
        },
        {
          objek: 'papanKetiga', judul: 'Jurus Hitung: Jumlahkan Digitnya',
          teks: 'Di pusat labirin terpahat jurus rahasianya: untuk mengecek kelipatan 3, jumlahkan digitnya. Angka 27 menjadi 2 ditambah 7 sama dengan 9, dan 9 habis dibagi 3 — berarti 27 lolos. Angka 12 menjadi 1 ditambah 2 sama dengan 3, juga lolos; inilah kompas paling cepat di dalam labirin.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Labirin Selesai!',
          teks: 'Jadi jalur 3, 6, 9, 12, 15, 18 terus melompat tiga demi tiga, dan pintu 14 serta 25 tertutup rapat. Dengan jurus menjumlahkan digit, cek kelipatan tiga bisa dilakukan tanpa berhitung lama. Owalah, ternyata begini toh — labirin pun tunduk pada aturan kelipatan. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-098 · Logika Si A & Si B — pagi lapangan tiga menara ----- */
    'p1-098': {
      tema: 'duelLogika',
      npc: { glif: 'A', ucap: ['Tak perlu', 'meteran!'] },
      stasiun: [
        {
          objek: 'tigaMenara', judul: 'Tiga Menara Bola-Lentera',
          teks: 'Di lapangan pagi berdiri tiga menara bertingkat dengan bola-lentera di puncaknya: si A di menara tertinggi, si B di menara tengah, si C di menara pendek. Mereka tak bertengkar; mereka hanya berdiri dalam urutan yang bisa dibuktikan. Penonton datang untuk satu hal: membaca urutan dengan logika.',
        },
        {
          objek: 'duelTanya', judul: 'Pertanyaan Tanpa Meteran',
          teks: 'Papan di tengah lapangan menuliskan dua fakta: si A lebih tinggi dari si B, dan si B lebih tinggi dari si C. Lalu pertanyaannya: siapa yang paling tinggi, dan siapa yang paling pendek? Tak ada meteran yang dibagikan — hanya nalar yang diperbolehkan masuk arena.',
        },
        {
          objek: 'dominoLogika', judul: 'Rantai Logika Seperti Domino',
          teks: 'Si pemandu menata domino: kartu "A lebih dari B" bersandar pada kartu "B lebih dari C". Begitu tumbang berurutan, muncul kesimpulan ketiga yang tak tertulis: si A pasti lebih tinggi dari si C. Logika bekerja persis begitu — dua fakta yang bersambung bisa melahirkan fakta baru.',
        },
        {
          objek: 'papanKesimpulan', judul: 'Kesimpulan yang Tak Bisa Dibantah',
          teks: 'Papan akhir menuliskan jawaban lengkap: A paling tinggi, C paling pendek, dan B berada di antaranya. Menariknya, tak ada seorang pun yang perlu mengukur A dan C secara langsung. Urutan tadi sudah rapi dari rantai fakta — begitulah logika: hitungan yang berpikir.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Logika Menguntai!',
          teks: 'Jadi A lebih tinggi dari B, B lebih tinggi dari C, dan kesimpulannya mengalir sendiri: A juara tinggi, C juara pendek. Dua fakta yang bersambung cukup untuk membuka fakta ketiga tanpa alat ukur. Owalah, ternyata begini toh — logika itu menguntai kepastian. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-099 · Sudoku Mini 4x4 — malam khemah sudoku ----- */
    'p1-099': {
      tema: 'khemahSudoku',
      npc: { glif: '4', ucap: ['Tanpa ulang,', 'pasti tertib!'] },
      stasiun: [
        {
          objek: 'khemahPapan', judul: 'Khemah dengan Papan Angka',
          teks: 'Di khemah paling ramai tergantung papan empat kali empat dengan sebagian kotaknya terisi angka. Konon teka seperti ini lahir di majalah Amerika, lalu dipopulerkan di negeri Jepang dengan nama Sudoku — artinya kurang lebih "angkanya harus tunggal". Sekarang giliranmu menyelesaikannya.',
        },
        {
          objek: 'papanAturan', judul: 'Tiga Aturan yang Tak Bisa Ditolak',
          teks: 'Papan aturan khemah menuliskan tiga pasal: tiap baris harus berisi 1 sampai 4, tiap kolom juga, dan tiap kotak kecil dua kali dua pun sama. Tidak boleh ada angka yang berulang di barisnya, kolomnya, atau kotaknya. Singkatnya: satu angka, satu kursi, tak boleh rebutan.',
        },
        {
          objek: 'satuPilihan', judul: 'Taktik Satu-Satunya Pilihan',
          teks: 'Detektif sudoku menunjukkan taktiknya pada baris yang sudah berisi 1, 2, dan 3. Satu kursi kosong tersisa di baris itu, dan satu-satunya angka yang belum tampak ialah 4. Kalau empat angka harus hadir tanpa ulang, kotak kosong itu memang tak punya pilihan lain.',
        },
        {
          objek: 'papanSolusi', judul: 'Papan Penuh yang Tertib Sempurna',
          teks: 'Papan solusi menyala penuh: 1, 2, 3, 4 di baris pertama; 3, 4, 1, 2 di baris kedua; 2, 1, 4, 3 di baris ketiga; dan 4, 3, 2, 1 di baris keempat. Periksa cepat membuktikan: tiap baris, tiap kolom, dan tiap kotak kecil memuat 1 sampai 4 tanpa yang berulang. Sudoku pun tersenyum lega.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Sudoku Terpecahkan!',
          teks: 'Jadi papan empat kali empat itu cukup empat angka, asal tiap baris, kolom, dan kotak kecilnya tak ada yang berulang. Taktik andalanmu: cari baris yang tinggal satu kursi kosong, biar jawabannya memaksa sendiri. Owalah, ternyata begini toh — sudoku hanya soal disiplin angka. Mudah, bukan?',
        },
      ],
    },

    /* ----- p1-100 · Tantangan Juara Kamp — malam arena juara, penutup 100 judul ----- */
    'p1-100': {
      tema: 'arenaJuara',
      npc: { glif: '100', ucap: ['Seratus judul,', 'kamu luar biasa!'] },
      stasiun: [
        {
          objek: 'gerbangJuara', judul: 'Gerbang Pesta Seratus Judul',
          teks: 'Malam penutupan festival tiba: gerbang juara menyala dengan empat lampu misi dan papan besar bertuliskan Juara Kamp. Di atasnya terbaca angka 100 — jumlah seluruh judul yang pernah kamu jelajahi di Pintu 1. Empat ujian menantimu; lewati satu, satu lampu menyala.',
        },
        {
          objek: 'ujiPola', judul: 'Ujian Pertama: Lanjutkan Polanya',
          teks: 'Lampu pertama menampilkan deret angka: 2, 4, 6, dan sebuah kartu tanda tanya. Beda antar tetangganya dua, dua, dan dua lagi — deret ini naik dengan setia. Jadi tanda tanya itu pasti 8, dan lampu pertama pun menyala hijau.',
        },
        {
          objek: 'ujiKali', judul: 'Ujian Kedua: Kali yang Tertib',
          teks: 'Ujian kedua menggelar tiga kelompok kotak, tiap kelompok berisi 4 kelereng. Tiga kelompok berisi empat artinya 3 × 4, sama seperti 4 + 4 + 4. Hitung kelerengnya satu per satu: genap 12 — lampu kedua ikut menyala.',
        },
        {
          objek: 'ujiHilang', judul: 'Ujian Ketiga: Cari yang Hilang',
          teks: 'Papan ketiga menulis kalimat bermata kosong: 4 ditambah berapa sama dengan 9? Cara tercepat ialah membaliknya: 9 kurang 4 sama dengan 5. Maka si hilang adalah 5 — kalimatnya kini utuh: 4 + 5 = 9.',
        },
        {
          objek: 'ujiLogika', judul: 'Ujian Keempat: Baca Urutannya',
          teks: 'Ujian pamungkas menyandingkan tiga bola-lentera: si A lebih tinggi dari si B, si B lebih tinggi dari si C. Tanpa meteran, urutannya sudah terbaca: A paling tinggi dan C paling pendek. Lampu keempat menyala, dan gerbang juara terbuka lebar.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kamu Juara Kamp!',
          teks: 'Jadi pola dilanjutkan, perkalian dihitung, angka hilang dipanggil, dan urutan logika dibaca — empat ujian, empat lampu hijau. Seratus judul Pintu 1 kini pernah kamu jejaki, dari kisah angka sampai teka-teki paling seru. Gelar Juara Kamp resmi milikmu. Owalah, ternyata begini toh — semua ilmu besar dimulai dari langkah kecil yang rapi. Mudah, bukan?',
        },
      ],
    },
  };

  /* dunia fallback untuk judul yang belum punya naskah */
  function untuk(topik) {
    if (PETA[topik.id]) return PETA[topik.id];
    return {
      stasiun: [
        { objek: 'tanya', judul: topik.judul, teks: topik.teaser },
        {
          objek: 'tugu', akhir: true, judul: 'Bahasan Segera Hadir',
          teks: 'Cerita lengkap judul ini sedang ditulis di khemah sebelah. Kembali lagi nanti — jejaknya akan tetap menyala menunggumu di kamp.',
        },
      ],
    };
  }

  return { untuk };
})();
