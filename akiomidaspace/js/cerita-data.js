window.CERITA = (function () {
  'use strict';

  const PETA = {

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
          teks: 'Matematika itu bahasa untuk berpikir tentang bilangan, bentuk, dan pola — lahir dari kebutuhan manusia menghitung, menakar, dan berbagi dengan adil. Begitu polanya ketahuan, semua soal berubah menjadi temuan. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi kalau kamu menulis 100 di buku, ingatlah lingkaran kecil itu: pahlawan yang diam-dia menopang semua angka besar. Owalah, ternyata kosong pun bisa seberarti itu — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Pi seperti sahabat yang tak pernah putus di tengah jalan: 3,14159... terus dan terus menemani semua lingkaran. Owalah — ternyata rahasia seluruh lingkaran di dunia dipegang satu angka setia ini — Mudah, bukan?',
        },
      ],
    },

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

    'p1-010': {
      tema: 'future',
      npc: { glif: '?', ucap: ['Teknologi', 'menantimu!'] },
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
          objek: 'tugu', akhir: true, judul: 'Teknologi Dimulai Hari Ini',
          teks: 'Roket, satelit, robot, dan bintang-bintang itu sedang menunggu generasi yang gemar berhitung. Owalah — teknologi hebat ternyata dimulai dari angka yang kamu pelajari hari ini. Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Sepuluh angka saja, semua bilangan di dunia bisa ditulis — dari nol sampai milyaran. Tidak perlu seribu lambang, cukup sepuluh sahabat yang setia. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Pola +2 pada manik dan teka-teki tadi — semua deret angka punya aturannya masing-masing. Tugasmu bukan menghafal, tapi mengendus aturannya seperti detektif. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi setiap kamu menulis 3 + 2, itu undangan berkumpul: yang terpisah menjadi bersama, yang kecil menjadi banyak. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi bertemu minus jangan bingung: dia hanya mencatat yang berpindah. Di buku hitung dagang Eropa dulu, − lahir berdampingan dengan +, dan kata minus artinya lebih sedikit. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi kalau ada 3 piring dan tiap piring berisi 4 kue, tak perlu menghitung satu-satu: 3 × 4 = 12. Jurus singkat untuk pengulangan yang sama. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi saat membagi kue, jeruk, atau waktu bermain: hitung yang ada, bagi sama rata, semua puas. Berbagi adil ternyata juga matematika. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi setiap kalimat dengan tanda = menyimpan timbangan: kiri dan kanan harus setara. Kalau keseimbangan terjaga, jawabanmu jujur. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi 9 > 3 dan 2 < 6 kini mudah dibaca: mulut ke yang besar, lancip ke yang kecil. Setiap kartu angka di sekitarmu bisa kamu bacakan sendiri. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi kurung adalah pintu spesial dalam kalimat matematika: siapa tinggal di dalamnya, dia dihitung lebih dulu. Dengan pintu kecil itu, jawaban tak pernah ketukar. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi koma desimal adalah penjaga pintu: kiri untuk yang utuh, kanan untuk kepingan. 1,5 dan 2,5 kini bisa kamu tulis sendiri dengan tertib. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi ∞ bukan bilangan biasa: dia tanda untuk yang tak berujung. Barisan angka tak habis, langit tak bertepi, dan rasa ingin tahumu pun dipersilakan tumbuh tanpa batas. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi setiap kalimat matematika adalah cerita mini: ada siapa, ada peristiwa, ada akhirnya. Bacalah pelan-pelan, pahami dengan tenang — begitulah ilmu masuk dengan nyaman. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi penjumlahan itu menggabungkan kelompok yang terpisah menjadi satu, lalu menghitung semuanya dari awal. Dua dan tiga kini menjadi lima. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi sepuluh jari adalah alat hitung pertamamu: angkat yang diperlukan, hitung yang berdiri. Tiga dan empat berkumpul menjadi tujuh. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi menjumlah lewat 10 punya trik: penuhi dulu sampai sepuluh, sisanya tinggal ditumpuk. Delapan dan lima bertemu menjadi tiga belas. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi penjumlahan bersusun itu menyusun angka per kolom: satuan bertemu satuan, puluhan bertemu puluhan, dikerjakan dari kanan. 23 dan 14 menjadi 37. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi menyimpan itu mengantar kelebihan ke tempat yang benar: satuan yang penuh menitipkan satu ke kotak puluhan. 35 + 7 = 42, amanah tersalurkan rapi. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi pengurangan itu mencari sisa: hitung yang ada, catat yang pergi, hitung lagi yang tertinggal. Lima kue dimakan dua, sisanya tiga. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi pengurangan bersusun mengikuti adab yang sama: susun per kolom, kerjakan dari satuan lebih dulu. 47 kurang 23, sisanya jelas 24. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi jika satuan kurang, pinjam satu puluhan: satuan membesar menjadi 12, puluhan menyusut satu. 42 − 15 = 27 — seperti meminjam gula ke tetangga lalu mengembalikannya tepat waktu. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi keluarga angka adalah empat kalimat dari tiga anggota: dua tambah, dua kurang. Keluarga 3, 4, 7 tak akan pernah berganti anggota. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi soal cerita tambah itu ramah: temukan dua kelompok yang dipersatukan, tulis kalimatnya, lalu hitung. Empat layang-layang bertemu dua menjadi enam. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi soal cerita kurang menanyakan sisa: kenali angka awal, hitung yang pergi, kurangkan. Tujuh permen dibagikan tiga, tersisa empat. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi kalimat berlubang adalah teka-teki yang ramah: lihat jawabannya, hitung kekurangannya, temukan angkanya. Empat dan lima berkumpul menjadi sembilan. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi perkalian itu penjumlahan berkelompok sama rata: 3 x 5 artinya lima, ditambah lima, ditambah lima lagi. Kelompoknya rapi, jurusnya jadi singkat. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi tabel 2 itu ilmu berpasangan: tiap kelompok selalu berisi dua, hitungannya lompat dua-dua: 2, 4, 6, 8, 10. Sepasang demi sepasang sampai sepuluh. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi tabel 5 itu sahabat jari: 5, 10, 15, 20 — dan satu rahasia lagi, hasilnya selalu berakhir angka 5 atau 0. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi tabel 10 itu paling pemurah: hitung satu, dua, tiga... lalu taruh nol di belakangnya. Sepuluh, dua puluh, tiga puluh — kereta pun berangkat. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi tabel 3 dan tabel 4 adalah dua tangga sahabat: satu melangkah tiga-tiga, satu melangkah empat-empat, dan keduanya bertemu di 12. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi tabel 6 sampai 9 itu jalur pendakian: pijakannya makin berat, pemandangannya makin luas. Siapa bisa menaikinya, ia akan kuat menghitung apa pun. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi tabel 9 penuh rahasia yang ramah: jarinya menunjukkan jawaban, angka-angkanya selalu berjumlah 9, dan sepuluh kali dikurangi sekali pun cocok. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi perkalian bersusun itu urutannya tetap: satuan dulu, simpan bila penuh, puluhan kemudian, lalu kumpulkan. Dua puluh tiga kali empat menjadi sembilan puluh dua. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi pembagian itu seni berbagi rata: sebarkan bergantian satu-satu sampai tiap penerima sama banyak. Sepuluh kelereng untuk dua piring menjadi lima-lima. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi sisa bukanlah salah; ia hanya menunggu giliran berikutnya: 7 kue bagi 2 piring menjadi 3 dan 3, dengan 1 yang menunggu. Jangan lupa cek balik: kalikan dulu, tambahkan sisanya. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi pembagian bersusun itu menuruni tangga angka: bagi puluhan dulu, turunkan satuan, tulis jawabannya per anak tangga. Sembilan puluh enam dibagi tiga menjadi tiga puluh dua. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi kali dan bagi memang pasangan setia: 6 x 4 = 24 selalu berbalik menjadi 24 : 6 = 4. Bila ada angka hilang, cukup panggil pasangannya. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi setengah itu satu dari dua bagian yang sama besar: satu kue, satu garis lewat pusat, dua piring rata. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi seperempat itu satu dari empat bagian sama besar: dua garis bersilang di pusat, empat potongan rapi, satu untuk tiap tamu. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi setiap pecahan punya dua penjaga: penyebut di bawah menghitung jumlah potongan, pembilang di atas menunjuk yang diambil. Tiga per empat pun kini terbaca jelas. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi keluarga pecahan satu-per itu saudara serupa: 1/2, 1/3, 1/4, dan seterusnya — makin banyak bagiannya, makin ramping potongannya. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi pecahan senilai itu ukuran sama dengan rupa berbeda: 1/2, 2/4, 3/6 — sepanjang potongannya sama besar, nilainya tetap setengah. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi membandingkan pecahan satu-per itu mudah: penyebut kecil berarti potongan besar — 1/2 selalu menang atas 1/8. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi menjumlah pecahan senama itu seperti menggabung potongan sejenis: penyebut tetap, pembilang bertambah — 1/4 + 2/4 = 3/4. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi pengurangan pecahan senama itu santai: penyebut tetap, pembilang dikurang — 3/4 - 1/4 = 2/4, dan sisanya terbaca jelas di piring. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi pecahan campuran itu gabungan dua piring: angka utuh di depan, pecahan di belakang — satu utuh plus setengah ditulis 1 1/2, dibaca satu setengah. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi mencari setengah dari banyak itu seperti membagi dua rata: setengah dari 10 adalah 5, setengah dari 8 adalah 4. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi menggambar pecahan itu tiga langkah: gambar bentuknya, bagi sama besar, warnai sebanyak pembilang. 2/4 pun terbaca nyaris tanpa berpikir. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi gelanggang pecahan bisa ditaklukkan dengan bekal lama: membagi sama besar, membaca pembilang dan penyebut, serta mengenali setengah. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi 0,5 bukan angka aneh: dia setengah yang menulis dengan bahasa koma — nol utuh plus lima dari sepuluh kepingan. Setengah gelas, setengah jam, setengah jalan semua bisa dikenalnya. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi 0,1 itu satu dari sepuluh potongan sama besar — seperti satu bilik dari kandang berisi sepuluh. Dibaca nol koma satu, dan sepuluh kepingannya menjadi satu utuh. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi 0,5 dan 1/2 adalah saudara kembar yang lahir dengan nama berbeda, begitu pula 0,25 dan 1/4. Bahasa koma atau bahasa pecahan — nilai jawabannya tetap sama. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi membandingkan desimal: lihat dulu angka pertama setelah koma, lalu lanjut ke angka berikutnya bila sama. 0,7 tetap juara atas 0,25 sekalipun tulisannya lebih pendek. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi persen selalu bercerita tentang seratus: 25% berarti 25 dari 100, dan itu persis seperempat. Setiap kali bertemu tanda %, bayangkan kotak 100 kelereng itu. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi tiga angka persen ini bisa kamu simpan di luar kepala: 100% utuh, 50% setengah, 0% habis. Bak air di kebun saja sudah mengajarkannya dengan jujur. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi satu setengah memiliki tiga nama: 1/2, 0,5, dan 50%. Mana pun yang muncul di soal, kamu tahu isinya sama — tiga kunci untuk satu pintu yang sama. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi uang rupiah itu deretan angka yang bisa dipegang: 1.000, 2.000, 5.000, dan koin-koin kecilnya. Saat berbelanja, baca angkanya dengan teliti seperti membaca buku. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi kembalian tak perlu ditebak: uang dibayar dikurangi harga, sisanya kembali ke tangan. 5.000 dibayar, 3.000 dipakai, 2.000 kembali. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi menabung itu hitungan sederhana yang setia: 500, plus 500, plus 500 — jadi 1.500. Sedikit demi sedikit, lama-lama menjadi banyak. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Dunia ini dibangun dari bentuk-bentuk sederhana: jendela kotak, roda bulat, atap segitiga. Begitu mata terlatih mengenalnya, setiap benda tampak seperti kumpulan bentuk yang ramah. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi bentuk itu dibangun dari sisi, dan setiap pertemuan sisi meninggalkan bukaan bernama sudut. Hitung sisi dan sudutnya, maka bentuk apa pun langsung terbaca. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi keliling bukan kata sulit: jarak menyusuri pinggir sampai kembali ke tempat berangkat. Lapangan, meja, dan ponselmu semuanya punya keliling. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi keliling persegi panjang tak perlu dihafal buta: jumlahkan panjang dan lebarnya, lalu kali dua. Lapangan 8 dan 5 langkah itu terbukti berkeliling 26 langkah. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi luas itu banyak ubin yang dibutuhkan untuk menutupi seluruh bagian dalam. Pagar mengukur pinggir, ubin mengukur isi. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi luas persegi panjang itu baris kali kolom: 4 x 6 = 24 ubin. Rumus panjang kali lebar ternyata hanya cerita menata ubin yang dipersingkat. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi luas segitiga itu setengah kotak penyampirnya: 1/2 x alas x tinggi. Karpet segitiga tadi cukup dibeli 12 ubin, bukan 24. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi lingkaran punya pusat, jari-jari yang sama panjang dari pusat ke tepi, dan keliling yang kira-kira 3,14 kali diameternya. Satu bentuk, satu angka setia di mana-mana. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi kubus itu kotak sempurna berenam sisi sama besar, dan balok saudaranya yang sisi-sisinya tidak seragam. Keduanya punya isi — panjang, lebar, dan tinggi. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi begitu mata terlatih, kamar sendiri pun menjadi tempat berburu bentuk: jendela persegi, pintu persegi panjang, piring lingkaran, atap segitiga, dan kotak kubus. Malam ini 5 bentuk kalah cepat oleh detektif kecil. Owalah, ternyata begini toh — Mudah, bukan?',
        },
      ],
    },

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
          teks: 'Jadi sembilan angka tersusun agar tiap garis berjumlah 15, dan rahasianya 45 dibagi 3. Kotak ajaib ternyata teka-teki hitung yang sudah lama diulang dari zaman ke zaman, tanpa jalan pintas apa pun. Owalah, ternyata begini toh — rahasia paling indah adalah hitungan yang setia. Mudah, bukan?',
        },
      ],
    },

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

    'p3-001': {
      tema: 'bengkelMesin',
      npc: { glif: 'f(x)', ucap: ['Masukkan angka,', 'keluar kejutan!'] },
      stasiun: [
        {
          objek: 'mesinKotakEmas', judul: 'Mesin Ajaib di Bengkel',
          teks: 'Pagi di bengkel gunung, satu mesin kotak emas berdiri megah dengan corong besar di atas dan mulut kecil di bawah. Penduduk bengkel mengajak mencoba: masukkan bilangan ke corongnya, lalu tunggu mulut bawahnya berbicara. Masukkan 3 — keluar 6. Coba lagi, masukkan 3 sekali lagi — keluar 6 juga. Mesin ini tidak pernah berubah pikiran.',
        },
        {
          objek: 'corongMasukAngka', judul: 'Corong: Rumah Masukan',
          teks: 'Corong di atas mesin adalah pintu masukan. Bilangan apa pun boleh masuk: 1, 5, 10, bahkan 100. Yang penting satu per satu — satu bilangan masuk, satu hasil keluar. Corong itu sabar menerima semua tamu, dan setiap tamu diberi giliran dengan tertib.',
        },
        {
          objek: 'mulutKeluarEnam', judul: 'Mulut: Rumah Keluaran',
          teks: 'Mulut di bawah mesin adalah pintu keluaran. Ketika 3 masuk lewat corong, mesin bekerja sekejap, lalu 6 meluncur keluar. Masukan 3 selalu menghasilkan keluaran 6 — hari ini, besok, sebulan lagi, tetap 6. Keluaran itu hadiah yang tak pernah mengkhianati.',
        },
        {
          objek: 'papanMesinTetap', judul: 'Aturan yang Tetap',
          teks: 'Papan bengkel menuliskan rahasia mesin: aturannya tetap. Masukan yang sama selalu menghasilkan keluaran yang sama — itulah tanda mesin yang jujur. Mesin seperti ini punya nama keren: fungsi. Hitungan itu hanya alat; yang membuat mesin dipercaya adalah setianya pada aturan.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Fungsi Itu Mesin yang Setia!',
          teks: 'Corong menerima masukan, mulut menyodorkan keluaran, dan aturannya tetap selamanya. Owalah, ternyata begini toh — fungsi hanyalah mesin yang setia pada aturannya sendiri. Mudah, bukan?',
        },
      ],
    },

    'p3-002': {
      tema: 'mejaMesinPintar',
      npc: { glif: 'f', ucap: ['x masuk,', 'f(x) keluar!'] },
      stasiun: [
        {
          objek: 'mejaPercobaanPintar', judul: 'Meja Percobaan Sang Peneliti',
          teks: 'Siang di bengkel gunung, satu meja percobaan dipenuhi kartu dan mesin kecil. Mesin pintar itu diberi nama pendek: f. Penduduk menulis nama f pada label dan menempelkannya di dada mesin. Dari hari itu, mesin kecil punya identitas — dan identitas itulah kunci semua catatan percobaannya.',
        },
        {
          objek: 'kartuMasukX', judul: 'Kartu Masukan x',
          teks: 'Pada meja tergeletak kartu bertuliskan x. Huruf x adalah kotak kosong: bilangan apa pun boleh menempatinya. Hari ini x mengaku 3, besok x boleh mengaku 5. Kartu x masuk lewat corong mesin f, dan mesin langsung bekerja.',
        },
        {
          objek: 'kartuKeluarFx', judul: 'Kartu Keluaran f(3)',
          teks: 'Keluaran mesin f untuk masukan 3 ditulis f(3), dibaca "f dari 3". Ketika mesin pengganda menerima 3, hasilnya 6: jadi f(3) = 6. Perhatikan — tulisan itu bukan f kali 3; f(3) hanya tanda hasil mesin untuk masukan 3.',
        },
        {
          objek: 'papanBukanKali', judul: 'Bukan Perkalian Biasa',
          teks: 'Papan meja menegaskan: f adalah nama mesin, bukan bilangan yang bisa dikali. Karena itu f(3) = 6 dan f(5) = 10 — keduanya hasil mesin, bukan perkalian huruf. Mesin mana pun boleh diberi nama f; nama boleh sama, aturannya yang membedakan.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, f(x) Hanyalah Nama Hasil Mesin!',
          teks: 'x masuk, mesin bernama f bekerja, lalu f(x) keluar sebagai hasil. Owalah, ternyata begini toh — f(x) bukan perkalian aneh, melainkan nama keren untuk hasil mesin. Mudah, bukan?',
        },
      ],
    },

    'p3-003': {
      tema: 'papanAturanMesin',
      npc: { glif: '2x', ucap: ['Satu aturan,', 'semua taat!'] },
      stasiun: [
        {
          objek: 'mesinGandakanDua', judul: 'Mesin Pengganda di Taman',
          teks: 'Sore di taman lembah, satu mesin berdiri dengan label besar: kali dua. Aturannya sederhana sekali — setiap masukan digandakan. Mesin ini tidak memilih pilih tamu: semua masukan diperlakukan sama, semua digandakan dua kali.',
        },
        {
          objek: 'tigaMasukEnamKeluar', judul: 'Masuk 3, Keluar 6',
          teks: 'Masukkan 3: mesin berdengung sekejap, lalu 6 meluncur keluar. Cek bersama: dua kali tiga sama dengan enam. Masukkan 5 — keluar 10. Masukkan 10 — keluar 20. Keluaran selalu dua kali masukannya, tanpa satu pun pengecualian.',
        },
        {
          objek: 'deretKeluaranTali', judul: 'Barisan Keluaran di Tali',
          teks: 'Penduduk menggantungkan kartu pada tali kuning: masukan 1, 2, 3, 4 dan keluaran 2, 4, 6, 8. Lihat barisannya — keluaran berbaris rapi dengan jarak sama. Pola rapi seperti itu tanda mesin yang aturannya lurus dan setia.',
        },
        {
          objek: 'papanAturanTetap', judul: 'Rumus Mesin: y = 2x',
          teks: 'Papan taman menuliskan rumus mesin: y = 2x. Huruf y adalah nama keluaran, x adalah masukan. Dengan rumus itu, mesin bisa ditiru siapa pun di mana pun — cukup kalikan dua. Aturan yang tertulis jelas membuat semua orang bisa bekerja sama.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Satu Aturan Memerintah Semua Keluaran!',
          teks: 'Masuk 3 keluar 6, masuk 5 keluar 10, masuk 10 keluar 20 — satu aturan mengatur semuanya. Owalah, ternyata begini toh — y = 2x hanyalah cara menulis mesin pengganda. Mudah, bukan?',
        },
      ],
    },

    'p3-004': {
      tema: 'arsipTabel',
      npc: { glif: '(x,y)', ucap: ['Setiap x', 'punya teman!'] },
      stasiun: [
        {
          objek: 'mejaTabelDuaKolom', judul: 'Tabel Dua Kolom di Arsip',
          teks: 'Malam di ruang arsip gunung, lampu minyak menemani satu meja bertabel dua kolom. Kolom kiri bernama x untuk masukan, kolom kanan bernama y untuk keluaran. Mesin malam ini beraturan berbeda: kali dua lalu tambah satu — y = 2x + 1.',
        },
        {
          objek: 'pasanganSatuTiga', judul: 'Pasangan Pertama: 1 dan 3',
          teks: 'Masukkan 1: mesin menggandakan menjadi 2, lalu menambah satu menjadi 3. Jadi 1 bersanding dengan 3 — ditulis (1, 3). Cek cepat: dua kali satu tambah satu memang tiga. Pasangan pertama tercatat rapi di tabel.',
        },
        {
          objek: 'pasanganDuaLima', judul: 'Pasangan Kedua: 2 dan 5',
          teks: 'Masukkan 2: dua kali dua sama dengan empat, tambah satu jadi 5. Maka 2 bersanding dengan 5 — (2, 5). Tabel kini memuat dua pasangan, dan keduanya tunduk pada aturan yang sama: y = 2x + 1.',
        },
        {
          objek: 'papanSatuTeman', judul: 'Satu x, Satu Teman',
          teks: 'Papan arsip menuliskan hukum tabel: setiap x hanya punya satu teman y. Tidak ada antrean ganda, tidak ada teman tiba tiba diganti. Tabel adalah album pasangan mesin — catatan tertib yang bisa dipercaya sepenuhnya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tabel Adalah Album Pasangan Mesin!',
          teks: '1 bersanding dengan 3, 2 bersanding dengan 5, dan tak ada satu pun x yang dua kali berpindah teman. Owalah, ternyata begini toh — tabel hanyalah album foto pasangan masukan-keluaran. Mudah, bukan?',
        },
      ],
    },

    'p3-005': {
      tema: 'lapanganKisi',
      npc: { glif: '(2,4)', ucap: ['Pasangan', 'punya alamat!'] },
      stasiun: [
        {
          objek: 'kisiTaliLapangan', judul: 'Kisi Raksasa di Lapangan',
          teks: 'Pagi di lapangan lembah, tali-tali kuat ditarik melintang membentuk kisi raksasa. Tali mendatar disebut sumbu x, tali tegak disebut sumbu y, dan keduanya bertemu di titik nol. Lapangan biasa berubah menjadi peta besar untuk semua pasangan mesin.',
        },
        {
          objek: 'patokTitikDuaEmpat', judul: 'Patok di (2, 4)',
          teks: 'Ambil pasangan (2, 4): dari nol, maju dua ke kanan menyusuri sumbu x, lalu naik empat menyusuri sumbu y. Di persilangan itulah sebuah patok bendera ditancapkan. Pasangan masukan-keluaran kini punya alamat di lapangan — maju dulu, naik kemudian.',
        },
        {
          objek: 'tigaPatokMesin', judul: 'Titik-Titik Mesin Berdiri',
          teks: 'Patok berikutnya berdiri satu per satu: (1, 2), (2, 4), lalu (3, 6). Semuanya pasangan mesin y = 2x yang sama. Setiap pasangan diberi alamat sendiri, dan tidak ada dua patok yang berebut satu alamat.',
        },
        {
          objek: 'papanSatuAlamat', judul: 'Satu Pasangan, Satu Alamat',
          teks: 'Papan pinggir lapangan menegaskan: satu pasangan hanya punya satu titik. (2, 4) dan (4, 2) adalah dua alamat berbeda — jangan tertukar! Koordinat dari Hutan Simbol kini dipinjam mesin fungsi untuk memamerkan hasilnya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Pasangan Jadi Titik yang Bertetangga!',
          teks: 'Maju dua, naik empat, tancapkan patok — pasangan angka kini punya rumah di bidang. Owalah, ternyata begini toh — titik hanyalah alamat dari pasangan. Mudah, bukan?',
        },
      ],
    },

    'p3-006': {
      tema: 'jalanLurusNaik',
      npc: { glif: '2x+1', ucap: ['Titik rapi', 'jadi garis!'] },
      stasiun: [
        {
          objek: 'jalanMenanjakLurus', judul: 'Jalan Menanjak yang Lurus',
          teks: 'Siang di kaki lembah, satu jalan tanah menanjak lurus menuju punggung gunung. Tak ada belokan sedikit pun — jalan ini tahu tujuannya. Penduduk berkata, jalan lurus itu mirip sesuatu yang baru kita pelajari: grafik mesin yang setia.',
        },
        {
          objek: 'titikBerbarisRapi', judul: 'Titik Berbaris Rapi',
          teks: 'Di sepanjang jalan, patok-patok kecil berdiri beraturan: (1, 2), (2, 4), (3, 6), (4, 8). Semuanya pasangan mesin pengganda y = 2x. Jarak antar patok selalu sama — tanda bahwa mereka berbaris mengikuti satu aturan yang sama.',
        },
        {
          objek: 'taliSambungGaris', judul: 'Tali Menyambung Semuanya',
          teks: 'Seutas tali ditarik dari patok pertama ke patok terakhir. Kejutannya: tali berhimpit sempurna dengan semua patok — tak ada satu pun yang melenceng. Semua titik mesin tunduk pada satu garis yang sama.',
        },
        {
          objek: 'papanGarisLurus', judul: 'Mesin Garis Lurus',
          teks: 'Papan tepi jalan menuliskan penemuan hari ini: mesin dengan aturan kali tetap membuat titik-titiknya sejajar sempurna. Grafiknya bernama garis lurus. Makin banyak titik dicoba, makin yakin garis itu sungguh lurus.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Semua Titik Taat pada Satu Garis!',
          teks: 'Patok berbaris, tali menunjukkan jalan, dan semua titik mesin berhimpit rapi. Owalah, ternyata begini toh — grafik mesin pengganda adalah garis lurus yang setia. Mudah, bukan?',
        },
      ],
    },

    'p3-007': {
      tema: 'jembatanBergelombang',
      npc: { glif: 'naik', ucap: ['Grafik', 'punya arah!'] },
      stasiun: [
        {
          objek: 'jembatanNaikTurun', judul: 'Jembatan Naik-Turun Senja',
          teks: 'Senja di lembah, jembatan tali membentang naik dulu lalu turun. Penduduk menyeberang sambil membaca bentuknya: bagian mana yang mendaki, bagian mana yang menurun. Jembatan itu ternyata grafik raksasa yang bisa didaki kaki.',
        },
        {
          objek: 'panahMenanjakKanan', judul: 'Bagian Menanjak',
          teks: 'Di bagian menanjak, setiap langkah ke kanan membawa kita lebih tinggi. Itu tanda keluaran makin besar: masukan bertambah, keluaran ikut bertambah. Grafik menanjak berarti mesin sedang makin rajin — hasilnya kian tumbuh.',
        },
        {
          objek: 'panahMenurunKanan', judul: 'Bagian Menurun',
          teks: 'Di bagian menurun, langkah ke kanan justru membawa lebih rendah. Keluaran makin kecil: mesinnya seperti bola yang digulir menuruni bukit. Contoh mesinnya y = 10 − x: masuk 1 keluar 9, masuk 5 keluar 5, masuk 9 keluar 1.',
        },
        {
          objek: 'papanGrafikArah', judul: 'Grafik Punya Arah',
          teks: 'Papan ujung jembatan merangkum: menanjak berarti makin besar, menurun berarti makin kecil, mendatar berarti tak berubah. Tiga kata itu cukup untuk membaca arah grafik mana pun — cukup lihat ke mana jalan meluncur. Dari sekarang, setiap garis yang kamu temui bisa kamu bacakan arahnya seperti membaca jembatan.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Bentuk Grafik Menunjukkan Arah!',
          teks: 'Naik berarti tumbuh, turun berarti menyusut, datar berarti diam. Owalah, ternyata begini toh — membaca grafik semudah membaca jembatan. Mudah, bukan?',
        },
      ],
    },

    'p3-008': {
      tema: 'halamanLempar',
      npc: { glif: 'x2', ucap: ['Lengkung', 'sama dua sisi!'] },
      stasiun: [
        {
          objek: 'bolaLemparMelengkung', judul: 'Bola Melengkung di Siang Hari',
          teks: 'Siang di halaman lembah, bola dilempar tinggi lalu kembali: naik melengkung, turun melengkung. Jejaknya di udara bukan garis lurus, melainkan lengkung anggun. Penduduk bertanya-tanya — bentuk apa itu, dan bisakah digambar?',
        },
        {
          objek: 'jejakLengkungKertas', judul: 'Jejak yang Digambar',
          teks: 'Di kertas besar, titik-titik dihubungkan mengikuti jejak bola. Mesinnya bernama y = x²: masuk 1 keluar 1, masuk 2 keluar 4, masuk 3 keluar 9. Titik-titik itu membentuk lengkung yang sama persis dengan jejak bola tadi!',
        },
        {
          objek: 'lengkungCerminKanan', judul: 'Dua Sisi Berhadapan',
          teks: 'Perhatikan lengkungnya: sisi kiri dan sisi kanan berhadapan seperti di depan cermin. Masuk 2 keluar 4; masuk minus 2 juga keluar 4. Dua kali dua sama dengan empat, minus dua kali minus dua juga empat — keduanya kembar!',
        },
        {
          objek: 'papanSimetriParabola', judul: 'Nama Lengkung: Parabola',
          teks: 'Papan halaman menuliskan namanya: parabola. Lengkung simetris itu muncul pada lemparan bola, air pancur, bahkan kerucut cahaya lampu. Grafik kuadrat bukan sekadar gambar di kertas — ia tinggal di sekitar kita.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Jalur Bola adalah Grafik Kuadrat!',
          teks: 'Bola melengkung, kertas membuktikan, cermin menyatakan dua sisinya sama. Owalah, ternyata begini toh — y = x² hanyalah jalur bola yang digambar di kertas. Mudah, bukan?',
        },
      ],
    },

    'p3-009': {
      tema: 'posGrafik',
      npc: { glif: 'grafik', ucap: ['Grafik', 'bercerita!'] },
      stasiun: [
        {
          objek: 'papanGrafikEmber', judul: 'Papan Grafik di Pos Pandang',
          teks: 'Malam di pos pandang gunung, satu papan grafik menyala ditemani lampu minyak. Cerita yang digambarkan: sebuah ember diisi air kran. Garisnya menanjak beberapa saat, lalu mendatar terus. Apa yang sebenarnya terjadi pada ember itu?',
        },
        {
          objek: 'garisNaikKran', judul: 'Garis Naik: Kran Menyala',
          teks: 'Bagian menanjak adalah waktunya kran menyala: air masuk, air dalam ember bertambah terus. Dari 0 liter menjadi 18 liter dalam enam detik — garis memanjat dari nol menuju tinggi. Naiknya garis adalah naiknya air.',
        },
        {
          objek: 'garisDatarPenuh', judul: 'Garis Datar: Ember Penuh',
          teks: 'Lalu garis mendatar sempurna. Air tak bertambah lagi — ember penuh! Kran dimatikan, permukaan air diam di 18 liter. Garis datar itu bisu tapi jujur: tak ada yang berubah, tak ada yang tumpah.',
        },
        {
          objek: 'papanBacaCerita', judul: 'Grafik Perjalanan Juga Bercerita',
          teks: 'Papan kedua bercerita perjalanan: garis naik berarti berjalan, garis datar berarti berhenti istirahat, garis naik lagi berarti jalan lagi. Grafik adalah buku cerita bergambar — cukup dibaca naik-turunnya, ceritanya langsung terbongkar. Malam ini cobalah membaca satu grafik sendiri: tebak dulu ceritanya, cek kemudian.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Grafik adalah Buku Cerita Bergambar!',
          teks: 'Naik berarti terisi, datar berarti penuh, naik lagi berarti jalan lagi. Owalah, ternyata begini toh — grafik bercerita tanpa satu kata pun. Mudah, bukan?',
        },
      ],
    },

    'p3-010': {
      tema: 'balaiMesin',
      npc: { glif: 'mesin', ucap: ['Lima misi', 'menantimu!'] },
      stasiun: [
        {
          objek: 'limaLampuMisiMesin', judul: 'Balai Juara Lembah Mesin',
          teks: 'Malam di balai juara lembah, lima lampu misi menyala bergantian di atas panggung. Di tengahnya berdiri mesin-mesin yang kini menghadapi satu penantang: kamu. Selesaikan satu misi, satu lampu berubah hijau. Kelima lampu hijau adalah tiket gerbang juara.',
        },
        {
          objek: 'mesinTekaAturan', judul: 'Misi Satu: Tebak Aturan',
          teks: 'Misi pertama menampilkan tabel misterius: masuk 0 keluar 5, masuk 1 keluar 7, masuk 2 keluar 9. Beda keluarannya selalu dua — aturannya kali dua tambah lima! Buktikan: masuk 3 keluar 11. Lampu pertama menyala hijau.',
        },
        {
          objek: 'papanTabelTeka', judul: 'Misi Dua: Gambar Grafiknya',
          teks: 'Misi kedua meminjamkan penggaris: gambar grafik y = 3x. Hitung tiga pasangnya — masuk 1 keluar 3, masuk 2 keluar 6, masuk 3 keluar 9 — lalu tandai titiknya. Sambungkan: garis lurus yang menanjak! Lampu kedua hijau.',
        },
        {
          objek: 'gerbangJuaraLembah', judul: 'Misi Tiga sampai Lima',
          teks: 'Tiga ujian pamungkas menunggu di gerbang. Ujian pertama memeriksa simetri parabola: dua kali dua sama dengan empat, dan minus dua kali minus dua juga empat. Ujian kedua membaca grafik ember yang naik lalu datar, dan ujian ketiga membaca mesin y = 12 − 2x yang menurun setia: masuk 0 keluar 12, masuk 6 keluar 0. Gerbang juara perlahan terbuka.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kamu Ahli Mesin Lembah!',
          teks: 'Aturan ditebak, grafik digambar, cermin diperiksa, cerita dibaca, arah dibuktikan — lima misi, lima lampu hijau. Sepuluh dunia lembah mesin kini pernah kamu jelajahi. Owalah, ternyata begini toh — fungsi hanyalah mesin setia yang bisa kita baca. Mudah, bukan?',
        },
      ],
    },

    'p3-011': {
      tema: 'padangBarisan',
      npc: { glif: '2 4 6', ucap: ['Ikuti', 'barisannya!'] },
      stasiun: [
        {
          objek: 'batuBarisEnam', judul: 'Enam Batu Berbaris Rapi',
          teks: 'Pagi di padang pegunungan, enam batu putih berbaris lurus di rumput. Di tiap batu ada angka: 2, 4, 6, 8, 10, 12. Mereka berbaris seperti anak pendaki yang berangkat mendaki — rapi, tak ada yang melompat ke depan.',
        },
        {
          objek: 'papanJarakSama', judul: 'Rahasia Ada di Jarak',
          teks: 'Papan kecil di tepi barisan menulis petunjuk: ukur jarak antar tetangga! 4 sedikit di depan 2 sejauh dua langkah, 6 sejauh dua langkah dari 4, terus begitu sampai akhir. Rahasia barisan bukan di angkanya, tapi di jarak antar tetangganya yang selalu sama.',
        },
        {
          objek: 'jejakLangkahTetap', judul: 'Jejak Pendaki Berjarak Tetap',
          teks: 'Di tanah becek tercetak jejak kaki seorang pendaki, dan jarak setiap jejak itu sama panjang. Karena langkahnya tetap, jejaknya jadi barisan yang rapi. Barisan angka pun begitu: satu langkah tetap, anggotanya ikut tertata.',
        },
        {
          objek: 'papanRahasiaBarisan', judul: 'Tidak Perlu Hitung Semua',
          teks: 'Papan besar di ujung padang menulis tantangan: batu kesepuluh angkanya berapa? Tidak perlu menghitung satu-satu — cukup lihat tetangga terakhirnya. Dari 12, satu langkah lagi berarti 12 + 2 = 14. Temukan jaraknya, maka seluruh barisan jadi milikmu.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Barisan Itu Jejak Berjarak Sama!',
          teks: 'Angka boleh berganti-ganti, tapi jarak antar tetangganya tetap setia. Owalah, ternyata begini toh — barisan hanyalah jejak langkah yang berjarak sama, tinggal kita baca. Mudah, bukan?',
        },
      ],
    },

    'p3-012': {
      tema: 'tanggaTambah',
      npc: { glif: '+3', ucap: ['Tambah tiga', 'tiap langkah!'] },
      stasiun: [
        {
          objek: 'tanggaTambahTiga', judul: 'Tangga Batu Bernomor',
          teks: 'Siang di lereng gunung, sebuah tangga batu menanjak dengan angka di tiap anak tangganya: 5, 8, 11, 14. Naik satu anak tangga, angkanya bertambah tiga. Pendaki kecil mencoba melompati satu anak tangga — angkanya langsung menambah enam!',
        },
        {
          objek: 'papanBedaTetap', judul: 'Beda Itu Nama Jaraknya',
          teks: 'Di papan kayu tertulis satu kata penting: BEDA = 3. Beda adalah nama jarak antar tetangga dalam barisan tambah. Selama bedanya tetap, barisan itu disebut barisan tambah yang setia — ia tak pernah berubah pikiran.',
        },
        {
          objek: 'batuSukuBerikut', judul: 'Batu Keempat Menunggu Angka',
          teks: 'Ada satu batu kosong menunggu di atas: batu setelah 14. Mau tahu angkanya? Tambah saja tiga: 14 + 3 = 17. Batu itu menyala senang karena akhirnya punya nama.',
        },
        {
          objek: 'papanCekDuaKali', judul: 'Aturan Pendaki: Cek Dua Kali',
          teks: 'Papan terakhir mengajarkan kebiasaan pendaki hebat: sebelum percaya, cek dua kali. 5 + 3 = 8 dan 8 + 3 = 11 — dua langkah sudah sama, berarti bedanya benar-benar setia. Hitungan itu hanya alat. Bantu saja — dan alat yang diperiksa dua kali tak pernah menyesatkan.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Barisan Tambah Itu Tangga Berbeda Tetap!',
          teks: 'Naik satu langkah, tambah tiga; naik lagi, tambah tiga lagi. Owalah, ternyata begini toh — barisan tambah hanyalah tangga yang jarak antar anak tangganya selalu sama. Mudah, bukan?',
        },
      ],
    },

    'p3-013': {
      tema: 'ladangGandakan',
      npc: { glif: 'ganda', ucap: ['Dua kali', 'tiap baris!'] },
      stasiun: [
        {
          objek: 'bijiGandakan', judul: 'Satu Biji Bertunas Jadi Dua',
          teks: 'Sore di ladang pegunungan, petani menunjukkan biji ajaib milik alam: satu biji bertunas menjadi dua tanaman. Dua tanaman itu nanti berbuah biji lagi, dan lagi-lagi tiap biji menjadi dua. Alam punya cara tumbuhnya sendiri — dan cara itu bisa kita hitung.',
        },
        {
          objek: 'tumpukBijiLima', judul: 'Papan Biji Lima Baris',
          teks: 'Di papan ladang tersusun catatan biji: baris pertama 1, baris kedua 2, baris ketiga 4, baris keempat 8, baris kelima 16. Tiap baris dua kali baris sebelumnya — bukan bertambah, tapi digandakan. Coba sentuh hitungannya: 8 dikali dua jadi 16, dan seterusnya tanpa gagal.',
        },
        {
          objek: 'papanLedakanDua', judul: 'Tumbuhnya Meledak!',
          teks: 'Petani bertanya: kira-kira baris kesepuluh berapa? Lanjutkan: 32, 64, 128, 256, 512! Dari satu biji kecil menjadi lima ratus dua belas — tumbuhnya meledak-leledak. Barisan gandakan memang suka memberi kejutan yang besar.',
        },
        {
          objek: 'papanSukuKesepuluh', judul: 'Bandingkan: Tambah vs Gandakan',
          teks: 'Papan banding di bawah pohon: kalau biji hanya bertambah dua tiap baris, baris kesepuluh isinya cuma 20. Tapi karena digandakan, isinya 512 — dua puluh lima kali lipatnya! Hitungan itu hanya alat. Bantu saja — dan alat ini menunjukkan betapa hebatnya pertumbuhan alam.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Gandakan Itu Tumbuh Meledak!',
          teks: 'Satu jadi dua, dua jadi empat, empat jadi delapan — tanpa berhenti. Owalah, ternyata begini toh — barisan gandakan hanyalah cerita alam yang tiap langkahnya dua kali lipat. Mudah, bukan?',
        },
      ],
    },

    'p3-014': {
      tema: 'menaraSuku',
      npc: { glif: '3n+1', ucap: ['Langsung', 'lompat!'] },
      stasiun: [
        {
          objek: 'papanTigaNPlusSatu', judul: 'Papan Menyala: 3n + 1',
          teks: 'Malam di menara pendakian, sebuah papan menyala dengan tulisan 3n + 1. Huruf n adalah nomor suku: mau suku yang mana, tinggal sebut nomornya. Ini rumus murni, mesin pelompat barisan yang setia pada hitungannya.',
        },
        {
          objek: 'lompatanRumusCepat', judul: 'Uji Rumusnya Dulu',
          teks: 'Pendaki yang bijak tak langsung percaya — ia menguji. Suku pertama: 3 × 1 + 1 = 4. Suku kedua: 3 × 2 + 1 = 7. Suku ketiga: 3 × 3 + 1 = 10. Tiga-tiganya pas dengan barisan 4, 7, 10 — rumus ini setia.',
        },
        {
          objek: 'lampuSukuSeratus', judul: 'Suku Ke-100 Menyala!',
          teks: 'Tantangan menara: suku keseratus angkanya berapa? Menghitung satu-satu butuh seratus langkah. Dengan rumus: 3 × 100 + 1 = 301! Lampu suku keseratus langsung menyala, secepat kedipan mata.',
        },
        {
          objek: 'papanTanpaHitungSatu', judul: 'Tangga Lompat Pendaki',
          teks: 'Papan terakhir menulis perbandingan dua pendaki: yang satu naik tangga satu anak demi satu anak, yang lain memakai tangga lompat bernama rumus. Keduanya sampai — tapi yang memakai rumus sampai duluan dan tak kelelahan. Itulah gunanya suku ke-n.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Rumus Itu Tangga Lompat!',
          teks: 'Mau suku ke seratus? Masukkan 100, keluar 301. Owalah, ternyata begini toh — suku ke-n hanyalah tangga lompat yang membawamu langsung ke anggota mana pun. Mudah, bukan?',
        },
      ],
    },

    'p3-015': {
      tema: 'apiUnggunPasangan',
      npc: { glif: '5050', ucap: ['Pasangkan', 'ujungnya!'] },
      stasiun: [
        {
          objek: 'apiUnggunCerita', judul: 'Cerita di Depan Api Unggun',
          teks: 'Malam hangat di kemah pendakian, api unggun berdesir. Pembimbing mulai bercerita: ada seorang anak yang diminta guru menjumlahkan 1 + 2 + 3 sampai 100. Semua temannya menggaruk kepala — tapi anak itu selesai dalam sekejap mata!',
        },
        {
          objek: 'kartuPasanganSatuSeratus', judul: 'Rahasianya: Pasangkan Ujungnya',
          teks: 'Anak itu memasangkan angka dari dua ujung: 1 + 100 = 101, lalu 2 + 99 = 101, lalu 3 + 98 = 101. Semua pasangan berjumlah 101 yang sama! Ujung kiri bertemu ujung kanan, dan setiap pertemuan selalu berjarak sama.',
        },
        {
          objek: 'papanLimaPuluhPasang', judul: 'Lima Puluh Pasangan',
          teks: 'Berapa banyak pasangan? Angka 1 sampai 100 ada seratus buah, tiap pasangan memakan dua angka, jadi ada 50 pasangan. Maka jumlahnya 50 × 101 = 5050. Selesai — tanpa menghitung panjang lebar!',
        },
        {
          objek: 'papanHasilLimaNolLima', judul: 'Cara Lurus vs Cara Pasangan',
          teks: 'Coba uji dengan jumlah kecil dulu: 1 sampai 10. Cara pasangan: 1+10 = 11, ada 5 pasangan, jadi 55 — dan hitung lurus pun benar 55. Hitungan itu hanya alat. Bantu saja — dan pasangan membuat alatnya ringan dibawa.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Pasangan Ujung Menjumlah Cepat!',
          teks: 'Seratus angka selesai dengan lima puluh pasangan berjumlah 101. Owalah, ternyata begini toh — menjumlah barisan hanyalah soal memasangkan ujung-ujungnya. Mudah, bukan?',
        },
      ],
    },

    'p3-016': {
      tema: 'ladangBijiDua',
      npc: { glif: '1+2+4', ucap: ['Jumlahkan', 'barisannya!'] },
      stasiun: [
        {
          objek: 'kotakBijiBaris', judul: 'Kotak Biji Berbaris',
          teks: 'Pagi di ladang, lima kotak kayu berbaris di atas papan: isinya 1, 2, 4, 8, dan 16 biji. Petani menantang: kalau semua kotak digabung, berapa jumlah bijinya? Hitung bersama-sama, siapa tahu ada rahasianya.',
        },
        {
          objek: 'papanSatuKurang', judul: 'Jumlahnya Selalu Satu Kurang',
          teks: 'Mulai dari yang kecil: 1 + 2 = 3 — dan kotak berikutnya berisi 4. Jumlahnya satu kurang! Coba lagi: 1 + 2 + 4 = 7, dan berikutnya 8. Satu kurang lagi! Pola ini muncul terus seperti penjaga yang setia.',
        },
        {
          objek: 'gandakanTumpukDua', judul: '31 Mendekati 32',
          teks: 'Jumlah semua kotak: 1 + 2 + 4 + 8 + 16 = 31. Dan kotak rahasia berikutnya kalau ditambah pasti berisi 32. Jumlahnya 31 — satu kurang dari 32, selalu begitu, sejauh mana pun barisannya dijalankan.',
        },
        {
          objek: 'papanRahasiaDuaKali', judul: 'Rahasia Dua Kali Kurang Satu',
          teks: 'Papan terakhir membocorkan jurusnya: jumlahnya selalu dua kali anggota terakhir, kurang satu. Dua kali 16 kurang satu = 31 — pas! Sekarang kamu bisa menjawab tanpa menjumlah ulang dari awal. Petani tertawa lega: jurus ini menghemat waktunya tiap pagi.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Jumlahnya Satu Kurang dari Berikutnya!',
          teks: '1+2+4 jadi 7, dan 7 tinggal selisih satu dari 8. Owalah, ternyata begini toh — deret gandakan punya rahasia manis: jumlahnya selalu dua kali anggota terakhir, kurang satu. Mudah, bukan?',
        },
      ],
    },

    'p3-017': {
      tema: 'halamanKursiSegitiga',
      npc: { glif: '1 3 6', ucap: ['Susun', 'segitiga!'] },
      stasiun: [
        {
          objek: 'kursiSusunSegitiga', judul: 'Kursi Pertunjukan Berbentuk Segitiga',
          teks: 'Sore di halaman panggung gunung, kursi-kursi disusun untuk pertunjukan: baris paling depan 1 kursi, di belakangnya 2 kursi, lalu 3, lalu 4. Dari jauh susunannya membentuk segitiga besar yang rapi sekali. Bentuk inilah yang membuat barisan angkanya disebut bilangan segitiga.',
        },
        {
          objek: 'barisKursiBawah', judul: 'Menghitung Kursi Tiap Susunan',
          teks: 'Berapa kursi tiap ukuran? Segitiga kecil: cuma 1. Segitiga dua baris: 1 + 2 = 3. Tiga baris: 6. Empat baris: 10. Maka lahir barisan bilangan segitiga: 1, 3, 6, 10 — mereka disebut segitiga karena benar-benar bisa disusun jadi segitiga.',
        },
        {
          objek: 'papanTambahBarisBaru', judul: 'Tambah Baris, Bedanya Tumbuh',
          teks: 'Perhatikan cara mereka bertumbuh: dari 1 ke 3 nambah 2, dari 3 ke 6 nambah 3, dari 6 ke 10 nambah 4. Tiap baris baru panjangnya bertambah satu. Beda yang tumbuh teratur — itu tanda bilangan segitiga.',
        },
        {
          objek: 'papanSepuluhKursi', judul: 'Dua Segitiga Jadi Kotak!',
          teks: 'Kejutan papan terakhir: bawa dua segitiga sama, balikkan satunya, dan satukan — jadilah KOTAK! 1 + 3 = 4 = 2 × 2, lalu 3 + 6 = 9 = 3 × 3, lalu 6 + 10 = 16 = 4 × 4. Segitiga ternyata menyimpan kotak di dalam dirinya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Segitiga Menyimpan Kotak!',
          teks: '1, 3, 6, 10 — dan dua segitiga bertemu jadi kotak sempurna. Owalah, ternyata begini toh — bilangan segitiga hanyalah kursi yang berbaris mengerucut rapi. Mudah, bukan?',
        },
      ],
    },

    'p3-018': {
      tema: 'kebunPetakKuadrat',
      npc: { glif: 'n x n', ucap: ['Sisi kali', 'sisi!'] },
      stasiun: [
        {
          objek: 'petakSatuSatu', judul: 'Petak Kebun Pertama',
          teks: 'Siang di kebun sayur pegunungan, petani menunjukkan petak pertamanya: satu kotak kecil bersisi satu. Isinya satu tanaman — 1 × 1 = 1. Semua cerita besar selalu mulai dari langkah kecil yang rapi.',
        },
        {
          objek: 'petakDuaDua', judul: 'Diperluas Dua Kali Dua',
          teks: 'Tahun berikutnya petaknya diperluas: dua langkah kali dua langkah, isinya 2 × 2 = 4 tanaman. Bentuknya tetap kotak — hanya saja lebih besar dan lebih gemuk hasilnya. Hitung sendiri di tanah: dua kotak ke bawah, dua kotak ke samping, totalnya empat tanaman.',
        },
        {
          objek: 'petakTigaTiga', judul: 'Sisi Tumbuh, Isi Melompat',
          teks: 'Lalu 3 × 3 = 9, dan 4 × 4 = 16. Catatan kebun pun berbaris: 1, 4, 9, 16 — bilangan kuadrat, angka yang benar-benar berbentuk kotak. Sisi hanya tumbuh satu, tapi isinya melompat jauh.',
        },
        {
          objek: 'papanSisiKaliSisi', judul: 'Kejutan: Selisihnya Bilangan Ganjil!',
          teks: 'Papan di pagar membocorkan rahasia: lihat selisih antar kotak! 4 − 1 = 3, lalu 9 − 4 = 5, lalu 16 − 9 = 7 — bilangan ganjil berbaris rapi: 3, 5, 7. Maka kotak berikutnya pasti 16 + 9 = 25, dan benar 25 = 5 × 5. Kuadrat tumbuh dengan langkah ganjil!',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kuadrat Tumbuh Berlangkah Ganjil!',
          teks: '1, 4, 9, 16 — dengan selisih 3, 5, 7 yang tak pernah lari dari barisannya. Owalah, ternyata begini toh — bilangan kuadrat hanyalah petak kotak yang sisinya tumbuh satu per satu. Mudah, bukan?',
        },
      ],
    },

    'p3-019': {
      tema: 'tamanPolaSenja',
      npc: { glif: 'pola', ucap: ['Burulah', 'polanya!'] },
      stasiun: [
        {
          objek: 'bungaKelopakLima', judul: 'Kelopak yang Setia',
          teks: 'Sore di taman pegunungan, bunga-bunga biru mekar di tepi jalan. Hitung kelopaknya: satu, dua, tiga, empat, lima. Bunga sebelahnya? Juga lima. Bunga jenis ini memang setia pada polanya — tak pernah gila-gilaan menghitung kelopak.',
        },
        {
          objek: 'papanNadaBerulang', judul: 'Nada yang Berulang',
          teks: 'Di panggung taman, seseorang memetik gitar: do re mi fa sol la si, lalu kembali lagi ke do. Tangga nada berputar seperti roda — pola yang sama datang kembali setelah tujuh anak tangga. Telinga yang teliti bisa menangkap polanya.',
        },
        {
          objek: 'kalenderKabisatEmpat', judul: 'Kalender Juga Berpola',
          teks: 'Papan pengumuman taman menempel kalender: tahun kabisat datang berjarak empat tahun — 2024, lalu 2028, lalu 2032. Pola waktu yang bisa dihitung dan dicek, bukan ditebak-tebak. Karena itu kalender bisa disiapkan bertahun-tahun di muka.',
        },
        {
          objek: 'papanPolaSembunyi', judul: 'Pemburu Pola Tak Pernah Kehabisan',
          teks: 'Papan terakhir menulis: pola menyembunyi di mana-mana — di kelopak, di nada, di kalender, di anak tangga. Alat pemburu pola cuma tiga: mencatat, membandingkan, dan mengecek ulang. Hitungan itu hanya alat. Bantu saja — dan pola yang dicek tak pernah bohong.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Pola Ada di Mana-mana!',
          teks: 'Kelopak lima, nada berulang, kabisat berjarak empat — semua berbaris rapi kalau kita rajin mencatat. Owalah, ternyata begini toh — dunia penuh barisan yang menunggu ditemukan mata yang teliti. Mudah, bukan?',
        },
      ],
    },

    'p3-020': {
      tema: 'puncakPolaMalam',
      npc: { glif: 'misi', ucap: ['Lima api', 'menantimu!'] },
      stasiun: [
        {
          objek: 'limaApiMisiPuncak', judul: 'Lima Api di Puncak',
          teks: 'Malam di puncak Pegunungan Pola, lima api unggun menyala melingkar, satu untuk satu misi. Angin gunung berhembus pelan, api bergoyang seperti mengajak. Pendaki yang menyelesaikan satu misi akan melihat apinya berubah terang penuh.',
        },
        {
          objek: 'tekaBarisanPuncak', judul: 'Misi Satu dan Dua',
          teks: 'Api pertama menantang: lanjutkan barisan 20, 22, 24 — jaraknya dua, maka berikutnya 26. Api kedua menantang: suku ke-50 dari barisan 2n + 3? Masukkan lima puluh: 2 × 50 + 3 = 103. Dua api kini menyala terang.',
        },
        {
          objek: 'papanSukuKeSeratus', judul: 'Misi Tiga dan Empat',
          teks: 'Api ketiga: jumlah 1 sampai 10? Pasangkan ujungnya: 5 pasangan × 11 = 55. Api keempat: 1 + 2 + 4 + 8 + 16 + 32 = 63 — satu kurang dari 64, seperti biasa. Rahasia-rahasia lamamu kini bekerja untukmu.',
        },
        {
          objek: 'gerbangPuncakPola', judul: 'Misi Lima dan Gerbang Puncak',
          teks: 'Api kelima: segitiga ke-berapa pun tersusun dari 1 + 2 + 3 + 4 + 5 = 15 kursi. Lima api terang penuh, dan gerbang batu puncak terbuka perlahan. Udara dingin puncak terasa manis bagi yang berlatih dengan jujur.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kamu Pemburu Pola Puncak!',
          teks: 'Barisan dilanjutkan, rumus dilompati, jumlah dipasangkan, deret ditebak, segitiga disusun — lima api, lima kemenangan. Sepuluh dunia puncak pola kini pernah kamu jelajahi. Owalah, ternyata begini toh — barisan dan deret hanyalah jejak beraturan yang setia menunggu dibaca. Mudah, bukan?',
        },
      ],
    },

    'p3-021': {
      tema: 'bengkelPangkat',
      npc: { glif: '2x2x2', ucap: ['Kali berulang', 'jadi pangkat!'] },
      stasiun: [
        {
          objek: 'mesinPangkatTiga', judul: 'Mesin Pengali yang Setia',
          teks: 'Pagi di bengkel pangkat, sebuah mesin tua menyala siap bekerja. Tukangnya bilang: masukkan angka dua, lalu minta mesin mengali dua dengan dirinya sendiri tiga kali. Mesin pun bekerja dengan setia: 2 × 2 × 2 = 8. Pangkat sebenarnya hanya perkalian yang diulang — tak ada jalan pintas apa pun di dalamnya.',
        },
        {
          objek: 'papanTulisKaliUlang', judul: 'Angka Kecil di Atas Itu Apa?',
          teks: 'Papan tulis bengkel menunjukkan tulisan besar: 2 dengan angka kecil 4 di atasnya. Tukang menjelaskan: angka kecil itu bukan hiasan, ia pengingat berapa kali kita mengali. Jadi 2 pangkat empat berarti 2 × 2 × 2 × 2 = 16. Begitu juga 10 pangkat dua berarti 10 × 10 = 100.',
        },
        {
          objek: 'kartuPangkatKecil', judul: 'Kartu Ajakan Mengali',
          teks: 'Di meja ada kartu besar bertuliskan 2 dengan angka kecil 3 di atasnya. Kartu ini seperti undangan kecil: "ayo mengali dua kali tiga kali!" Siapa pun yang membacanya langsung tahu harus bekerja berapa kali. Angka kecil di atas itulah yang disebut pangkat — ajakan mengali yang ringkas.',
        },
        {
          objek: 'rakHasilDelapan', judul: 'Hasil yang Berbentuk',
          teks: 'Di rak pojok tersusun delapan kubus emas membentuk kubus kecil dua kali dua kali dua. Itulah wajah asli dari 2 pangkat tiga: hasilnya sungguh berbentuk dan bisa disentuh. Hitungan itu hanya alat — dan hasilnya bisa dilihat mata di rak bengkel.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Angka Kecil Ternyata Ajakan Mengali!',
          teks: 'Mesin mengali setia, angka kecil di atas memberi aba-aba, dan hasilnya tersusun rapi di rak bengkel. Owalah, ternyata begini toh — pangkat hanyalah perkalian yang diulang dengan rajin, tak lebih dari itu. Mudah, bukan?',
        },
      ],
    },

    'p3-022': {
      tema: 'mejaLipatKertas',
      npc: { glif: 'lipat', ucap: ['Lipat lagi', 'berlipat-lipat!'] },
      stasiun: [
        {
          objek: 'kertasLipatPertama', judul: 'Lipatan Pertama',
          teks: 'Siang di meja kerajinan, selembar kertas setebal 0,1 milimeter menunggu dilipat. Lipat sekali: jadilah dua lapis, tebalnya 0,2 milimeter. Lipat lagi: empat lapis. Kertas kecil ini punya kebiasaan yang luar biasa — setiap lipatan membuatnya berlipat dua.',
        },
        {
          objek: 'tumpukanLipatDelapan', judul: 'Delapan Lipatan Mengalahkan Buku',
          teks: 'Terus dilipat: 4 lapis, 8 lapis, 16 lapis — sampai lipatan kedelapan. Sekarang ada 256 lapis kertas dengan tebal 25,6 milimeter. Lebih tebal dari buku cerita! Coba hitung sendiri: 0,1 × 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 = 25,6. Tangan boleh lelah, angkanya tetap jujur.',
        },
        {
          objek: 'penggarisTebalTumpuk', judul: 'Kenapa Bisa Menggila Begini?',
          teks: 'Penggaris di meja mengukur tumpukan dan menunjukkan angka yang melompat-lompat. Rahasianya: lipatan tidak menambah sedikit demi sedikit, ia MENGALI dua kali setiap saat. Mengali berulang itulah yang membuat kecil menjadi raksasa dengan sangat cepat. Pangkat memang pekerja berlipat.',
        },
        {
          objek: 'papanJalanKeBulan', judul: 'Kejutan: Sampai ke Bulan!',
          teks: 'Papan di dinding menulis angka paling mengagetkan: kalau kertas bisa dilipat 42 kali, tebalnya jadi 439.804 kilometer — menembus bulan! Padahal jarak ke bulan cuma 384.400 kilometer. Tentu tangan kita berhenti jauh sebelum itu, tapi hitungannya benar: lipatan kecil, ledakan besar.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Lipatan Kecil Ternyata Ledakan!',
          teks: 'Dari 0,1 milimeter sampai menembus bulan — hanya dengan lipat dan lipat lagi, tanpa alat apa pun. Owalah, ternyata begini toh — pangkat adalah mesin pengganda yang tidur di dalam setiap kertas lipat. Mudah, bukan?',
        },
      ],
    },

    'p3-023': {
      tema: 'tamanBentukPangkat',
      npc: { glif: '2 dan 3', ucap: ['Luas dan isi', 'menunggumu!'] },
      stasiun: [
        {
          objek: 'petakRumputTigaTiga', judul: 'Petak Rumput Berbentuk Kotak',
          teks: 'Sore di taman bentuk, ada petak rumput berbentuk persegi bersisi tiga langkah. Petani menanam satu bunga di tiap kotak kecil. Hitung isinya: 3 × 3 = 9 bunga. Nah, itulah arti asli pangkat dua — luas sebuah persegi. Angka kecil 2 di atas ternyata menceritakan bentuk.',
        },
        {
          objek: 'kotakKayuKubik', judul: 'Kotak Kayu yang Berisi Ruang',
          teks: 'Di sebelahnya ada kotak kayu bersisi dua. Di dalamnya muat 2 × 2 × 2 = 8 ruang kecil. Inilah pangkat tiga: bukan lagi luas, tapi isi — seberapa banyak ruang di dalam kotak. Pangkat 3 menghitung dunia yang punya tinggi juga.',
        },
        {
          objek: 'papanLuasDanIsi', judul: 'Papan Taman: Luas dan Isi',
          teks: 'Papan kayu taman menulis dua kalimat penting: x pangkat dua artinya luas persegi bersisi x, dan x pangkat tiga artinya isi kubus bersisi x. Jadi pangkat bukan angka liar — ia punya bentuk yang bisa digambar di tanah. Kotak datar untuk pangkat dua, kotak penuh untuk pangkat tiga.',
        },
        {
          objek: 'patungBentukSaudara', judul: 'Dua Patung Bersaudara',
          teks: 'Di pusat taman berdiri dua patung batu bersanding: persegi pipih dan kubus gemuk. Pengunjung menyebut mereka saudara pangkat dua dan pangkat tiga. Dua saudara ini akan menemani semua hitungan luas dan isi sampai nanti. Mengenang bentuknya, kita tak pernah salah memanggilnya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Pangkat Ternyata Punya Bentuk!',
          teks: 'Bunga di petak persegi, ruang di dalam kubus — pangkat dua dan tiga tinggal di dalam bentuk. Owalah, ternyata begini toh — kuadrat dan kubik hanyalah cerita luas dan isi yang menyamar jadi angka. Mudah, bukan?',
        },
      ],
    },

    'p3-024': {
      tema: 'jalanPulangAkar',
      npc: { glif: '7x7', ucap: ['Jalan pulang', 'menanti!'] },
      stasiun: [
        {
          objek: 'gerbangRumahEmpatSembilan', judul: 'Gerbang Rumah Nomor 49',
          teks: 'Senja turun, dan kamu berdiri di depan gerbang rumah bernomor 49. Tapi pintunya bertanya dulu: "siapa yang dikali dirinya sendiri hasilnya 49?" Tidak ada angka lain di papan, hanya soal itu. Rumah nomor 49 ternyata punya kunci soal untuk semua tamu.',
        },
        {
          objek: 'jalanLangkahTujuh', judul: 'Tujuh Lampu Jalan Pulang',
          teks: 'Jalan pulangnya berpijak lampu: satu, dua, tiga, empat, lima, enam, tujuh lampu menyala. Dan keajaibannya: tujuh dikali tujuh hasilnya tepat 49! Maka kuncinya ditemukan — angka 7 adalah langkah pulang menuju rumah 49.',
        },
        {
          objek: 'papanAkarJalanBalik', judul: 'Papan: Akar adalah Jalan Balik',
          teks: 'Papan di tepi jalan menulis: akar 49 = 7, karena 7 × 7 = 49. Kalau pangkat itu pergi dari 7 menuju 49, maka akar adalah jalan pulang dari 49 kembali ke 7. Dua arah, satu jalan — pangkat pergi, akar pulang.',
        },
        {
          objek: 'lampuPulangPasangan', judul: 'Dua Lampu yang Saling Membalik',
          teks: 'Di ujung jalan ada dua lampu besar bertautan. Yang satu menyalakan perjalanan 7 menjadi 49, yang satunya membalik 49 kembali menjadi 7. Mereka selalu bekerja berpasangan: akar 16 = 4 karena 4 × 4 = 16, dan akar 81 = 9 karena 9 × 9 = 81. Satu jalan pulang untuk setiap pangkat.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Akar Ternyata Jalan Pulangnya Pangkat!',
          teks: 'Gerbang 49, tujuh lampu, dan dua lampu yang saling membalik — rumah pun tercapai. Owalah, ternyata begini toh — akar hanyalah jalan pulang dari pangkat, dan pangkat hanyalah pergi berangkatnya akar. Mudah, bukan?',
        },
      ],
    },

    'p3-025': {
      tema: 'kantorDetektifLog',
      npc: { glif: 'log2', ucap: ['Kasus baru', 'terbuka!'] },
      stasiun: [
        {
          objek: 'papanKasusDelapan', judul: 'Kasus Malam Ini: Siapa 8?',
          teks: 'Malam di kantor detektif pangkat, sebuah papan kasus tergantung besar. Tertulis: "2 pangkat berapa hasilnya 8?" Tidak ada nama pelaku, hanya pertanyaan itu. Detektif muda seperti kamu diminta mencari pangkat yang hilang itu.',
        },
        {
          objek: 'kartuSaksiDuaEmpat', judul: 'Kartu Saksi Berbaris',
          teks: 'Detektif membuka kartu-kartu saksi satu per satu: 2 pangkat satu sama 2, 2 pangkat dua sama 4, 2 pangkat tiga sama 8. Nah! Saksi ketiga melapor dengan benar — dia yang membuat 8. Kasus mulai terang benderang.',
        },
        {
          objek: 'lampuJawabanTiga', judul: 'Lampu Jawaban Menyala: Tiga!',
          teks: 'Di atas papan, lampu jawaban menyala besar-besaran dengan angka 3. Maka tertulis resmi: 2 pangkat 3 = 8, selesai malam ini. Detektif pangkat selalu bekerja begini: mencoba satu per satu sampai menemukan pangkat yang pas.',
        },
        {
          objek: 'mejaBerkasLog', judul: 'Meja Berkas Terselesaikan',
          teks: 'Di meja, berkas-berkas lama sudah tersusun rapi: log dua dari 8 sama 3, log dua dari 16 sama 4, log dua dari 32 sama 5. Semua berkas bercerita sama: logaritma adalah detektif yang bertanya "pangkat berapa?" lalu mencarinya dengan setia. Tidak ada kasus yang bikin bingung selamanya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Logaritma Ternyata Detektif Pangkat!',
          teks: 'Papan kasus, kartu saksi, lampu jawaban — kasus 8 terpecahkan dengan jawaban 3, dan berkas berikutnya pun menunggu. Owalah, ternyata begini toh — logaritma hanyalah detektif kecil yang mencari pangkat yang hilang. Mudah, bukan?',
        },
      ],
    },

    'p3-026': {
      tema: 'tanggaPangkatDuaArah',
      npc: { glif: 'turun', ucap: ['Naik turun', 'tangga pangkat!'] },
      stasiun: [
        {
          objek: 'anakTanggaNaikPangkat', judul: 'Tangga yang Naik: Kali Dua',
          teks: 'Pagi di lereng gunung, ada tangga batu yang naik ke atas. Anak tangganya berderet: 2, 4, 8, 16 — setiap naik satu langkah, angkanya dikali dua. Naik tangga pangkat ternyata sama seperti lipatan kertas: makin tinggi, makin besar dengan cepat.',
        },
        {
          objek: 'anakTanggaTurunBagi', judul: 'Tangga yang Turun: Bagi Dua',
          teks: 'Sekarang turunlah dari puncak: dari 8 turun ke 4, lalu 2, lalu 1. Setiap turun satu langkah, angkanya dibagi dua. Kalau naik itu mengali, maka turun itu membagi — tangga pangkat ternyata bisa dilalui dua arah.',
        },
        {
          objek: 'pijakanNolSatu', judul: 'Pijakan Nol: Tetap Satu',
          teks: 'Di pijakan bernomor nol, ada satu angka yang berkilau: 2 pangkat 0 sama 1. Kenapa? Karena naik nol langkah berarti tidak mengali sama sekali — angka tetap apa adanya, yaitu 1. Coba cek tangga lain: 3 pangkat 0 juga 1, bahkan 1000 pangkat 0 tetap 1. Semua berangkat dari satu.',
        },
        {
          objek: 'papanLanjutTurunSetengah', judul: 'Tangga Lanjut ke Bawah!',
          teks: 'Papan di bawah pijakan menulis kejutan: tangganya masih lanjut turun! Di bawah 1 ada 2 pangkat minus satu sama setengah, lalu 2 pangkat minus dua sama seperempat. Pangkat minus bukan angka marah — ia hanya mengajak membagi lebih dalam lagi.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tangga Pangkat Ternyata Dua Arah!',
          teks: 'Naik dikali dua, turun dibagi dua, pijakan nol tetap satu, dan bawahnya setengah-setengah lagi. Owalah, ternyata begini toh — pangkat hanyalah tangga yang bisa dinaiki dan dituruni dua arah. Mudah, bukan?',
        },
      ],
    },

    'p3-027': {
      tema: 'rumahKacaTumbuh',
      npc: { glif: '1 2 4', ucap: ['Tumbuh', 'berlipat!'] },
      stasiun: [
        {
          objek: 'cawanKoloniSatu', judul: 'Satu Tetes Hijau di Cawan',
          teks: 'Siang di rumah kaca, seorang ilmuwan menetesi cawan dengan satu tetes hijau kecil. Ia mencatat di buku: jam nol, koloni berjumlah satu. Lalu ia menunggu satu jam penuh dengan sabar. Yang terjadi berikutnya membuat catatannya makin panjang.',
        },
        {
          objek: 'cawanKoloniEmpat', judul: 'Barisan Catatan yang Berlipat',
          teks: 'Jam pertama koloni jadi dua, jam kedua jadi empat, jam ketiga jadi delapan. Catatannya berderap rapi: 1, 2, 4, 8, 16. Setiap jam koloni menggandakan dirinya sendiri — seperti kertas yang dilipat, tapi kali ini di dalam cawan. Barisan yang sama, alam yang berbeda.',
        },
        {
          objek: 'papanJamGandakan', judul: 'Rahasia: Jamnya Selalu Sama',
          teks: 'Papan di dinding rumah kaca menulis rahasia terpenting: waktu untuk menggandakan SELALU SAMA, satu jam setiap kali. Inilah denyut tumbuh berlipat — tidak semrawut, tapi setia pada iramanya. Karena jeda gandanya tetap, jumlahnya melompat makin cepat seperti anak tangga yang makin curam.',
        },
        {
          objek: 'papanDenyutSetia', judul: 'Catatan Ilmuwan yang Jujur',
          teks: 'Papan terakhir menulis: bambu dan banyak makhluk kecil tumbuh dengan denyut ganda seperti ini — itulah cara alam bertumbuh, dan mengamatinya adalah ilmu yang indah. Hitungan itu hanya alat. Bantu saja — ia mencatat keajaiban tumbuh dengan jujur, tanpa menjanjikan apa-apa.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Denyut Ganda Ternyata Irama Alam!',
          teks: 'Satu tetes jadi dua, dua jadi empat, empat jadi delapan — dengan jam yang tak pernah berubah sedikit pun. Owalah, ternyata begini toh — tumbuh berlipat hanyalah penggandaan alam yang setia waktu. Mudah, bukan?',
        },
      ],
    },

    'p3-028': {
      tema: 'lapanganBolaSenja',
      npc: { glif: 'setengah', ucap: ['Pantul lagi', 'setengah lagi!'] },
      stasiun: [
        {
          objek: 'bolaKaretDilepas', judul: 'Bola Dilepas dari Seratus',
          teks: 'Sore di lapangan, seorang anak melepaskan bola karet dari tinggi seratus. Bola jatuh, bunyi, lalu memantul. Tapi pantulan pertamanya tidak setinggi tadi — hanya setengahnya, yaitu 50. Bola ini punya kebiasaan yang bisa dihitung.',
        },
        {
          objek: 'garisPantulanLimaPuluh', judul: 'Pantulan yang Setia Setengah',
          teks: 'Dari 50, pantulan kedua hanya 25. Dari 25, pantulan ketiga cuma 12,5. Garis-garis tinggi di lapangan membentuk tangga menurun: 100, 50, 25, 12,5. Setiap pantul selalu setengah dari sebelumnya — bola ini memang pekerja yang patuh pada pola.',
        },
        {
          objek: 'papanTinggiMenurun', judul: 'Papan: Menurun dengan Teratur',
          teks: 'Papan tepi lapangan menulis deret pantulan itu berjajar: 100, 50, 25, 12,5. Makin kecil, tapi kecilnya TIDAK sembarangan — selalu tepat setengah. Ini seperti tangga pangkat yang dituruni: turun satu langkah, dibagi dua. Mengecil pun bisa teratur.',
        },
        {
          objek: 'papanKecilTeratur', judul: 'Ilmu Menyukai Pola yang Jujur',
          teks: 'Papan terakhir menutup pelajaran: para ilmuwan suka mengamati pantulan karena polanya jujur dan bisa dicek ulang kapan saja. Hitungan itu hanya alat — alat untuk membaca catatan pantulan yang sudah terjadi, bukan untuk menjanjikan apa-apa. Yang setia setengah itu polanya, bukan janjinya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Mengecil Ternyata Selalu Teratur!',
          teks: 'Seratus, lima puluh, dua puluh lima — bola mengecil dengan patuh setengah demi setengah sampai akhirnya diam. Owalah, ternyata begini toh — pangkat turun hanyalah membagi yang teratur, jujur, dan setia. Mudah, bukan?',
        },
      ],
    },

    'p3-029': {
      tema: 'observatoriumAngka',
      npc: { glif: 'x10', ucap: ['Raksasa & mini', 'tertata rapi!'] },
      stasiun: [
        {
          objek: 'teleskopArahLangit', judul: 'Teleskop dan Langit Malam',
          teks: 'Malam di observatorium, teleskop besar mengarah ke langit berbintang. Para ilmuwan di sini sibuk MENGHITUNG jumlah bintang — bukan menebak nasib dari bintang, karena itu haram dan tidak benar. Yang mereka lakukan hanyalah menghitung, mencatat, dan mengagumi ciptaan dengan jujur.',
        },
        {
          objek: 'papanBintangPuluhDua', judul: 'Angka 1 dengan 22 Nol!',
          teks: 'Papan hitam observatorium menulis perkiraan jumlah bintang: sekitar 10 pangkat 22. Itu artinya angka 1 diikuti 22 nol — panjang sekali kalau ditulis satu per satu! Maka ilmuwan memakai jalan pintas: tulis saja 10 dengan pangkat 22. Pangkat adalah jalan pintas untuk angka raksasa.',
        },
        {
          objek: 'penggarisRambutMini', judul: 'Rambut Mini yang Juga Punya Pangkat',
          teks: 'Di meja ada penggaris cermat mengukur sehelai rambut: lebarnya kira-kira 0,0001 meter, atau 0,1 milimeter. Angka ini ditulis ringkas dengan pangkat minus: 10 pangkat minus 4 meter. Jadi pangkat tidak hanya untuk yang raksasa — yang mini pun tertata rapi olehnya.',
        },
        {
          objek: 'bukuTulisPangkat', judul: 'Buku yang Menata Semua',
          teks: 'Buku catatan observatorium membuka halamannya: bintang sebesar 10 pangkat 22 dan rambut sekecil 10 pangkat minus 4, keduanya tertulis rapi di halaman yang sama. Dengan pangkat, angka raksasa dan mini bisa berjabat tangan. Koma bergeser satu, pangkat bergeser satu — begitu saja aturannya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Pangkat Ternyata Penata Angka!',
          teks: 'Bintang berjuta-juta dan rambut sehalus debu — keduanya tertata rapi oleh pangkat kecil yang ringkas. Owalah, ternyata begini toh — pangkat hanyalah penata angka yang membuat raksasa dan mini muat di satu halaman. Mudah, bukan?',
        },
      ],
    },

    'p3-030': {
      tema: 'puncakTanggaPangkat',
      npc: { glif: 'tangga!', ucap: ['Lima tangga', 'menyala!'] },
      stasiun: [
        {
          objek: 'limaTanggaMisiPangkat', judul: 'Lima Tangga Menyala di Puncak',
          teks: 'Malam di puncak Pegunungan Pola, lima anak tangga batu menyala satu per satu seperti menunggu diinjak. Satu tangga untuk satu misi. Pendaki yang menyelesaikan satu misi akan melihat tangganya terang penuh dan bersiap menaiki tangga berikutnya.',
        },
        {
          objek: 'papanMisiDuaLima', judul: 'Misi Satu dan Dua',
          teks: 'Tangga pertama menantang: berapa 2 pangkat 5? Hitung: 2 × 2 × 2 × 2 × 2 = 32. Tangga kedua menantang: akar dari 81? Cari angka yang dikali dirinya jadi 81 — yaitu 9, karena 9 × 9 = 81. Dua tangga kini menyala terang.',
        },
        {
          objek: 'papanMisiTigaEmpat', judul: 'Misi Tiga dan Empat',
          teks: 'Tangga ketiga bertanya seperti detektif: 2 pangkat berapa hasilnya 16? Saksi-saksinya: 2, 4, 8, 16 — jawabannya 4. Tangga keempat mengetes pijakan nol: berapa 3 pangkat 0? Ingat, naik nol langkah berarti tak mengali — tetap 1. Empat tangga terang berderet.',
        },
        {
          objek: 'gerbangJuaraTangga', judul: 'Misi Lima dan Gerbang Juara',
          teks: 'Tangga kelima: kertas 0,1 milimeter dilipat 10 kali jadi berapa lapis? Itu 2 pangkat 10 = 1024 lapis, tebalnya 102,4 milimeter — setinggi segelas air! Lima tangga terang penuh, dan gerbang juara batu terbuka perlahan. Tangga pangkat kini adalah teman lamamu.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kamu Penakluk Tangga Pangkat!',
          teks: 'Pangkat dikali, akar dipulangkan, detektif logaritma dipanggil, pijakan nol diinjak, dan lipatan dihitung — lima tangga, lima kemenangan. Owalah, ternyata begini toh — eksponen dan logaritma hanyalah tangga naik dan jalan pulang yang setia menunggu. Mudah, bukan?',
        },
      ],
    },

    'p3-031': {
      tema: 'lapanganPapanSkor',
      npc: { glif: 'kotak', ucap: ['Angka tertata', 'siap bekerja!'] },
      stasiun: [
        {
          objek: 'papanSkorGunung', judul: 'Papan Skor Batu di Lapangan',
          teks: 'Pagi di lapangan gunung, sebuah papan skor batu menyala dengan kotak-kotak angka rapi. Baris atas milik Tim A berisi 4, 7, 2; baris bawah milik Tim B berisi 9, 1, 5. Tiga kolomnya adalah tiga babak pertandingan. Angka yang tertata seperti ini punya nama: matriks — kotak angka yang siap bekerja.',
        },
        {
          objek: 'kotakAngkaBabak', judul: 'Enam Kotak yang Membicarakan Dua Tim',
          teks: 'Coba baca papan itu pelan-pelan: Tim A mendapat 4 di babak satu, 7 di babak dua, lalu 2 di babak tiga. Tim B mendapat 9, 1, lalu 5. Enam kotak kecil ternyata menyimpan satu cerita utuh tentang dua tim yang bertanding. Itulah kekuatan angka yang tertata — ia bercerita tanpa perlu kalimat panjang.',
        },
        {
          objek: 'garisBarisKolom', judul: 'Garis Pembatas yang Menata',
          teks: 'Garis-garis tipis di papan memisahkan baris dan kolom, dan itulah rahasia tata kotaknya. Baris berjalan mendatar dari kiri ke kanan, kolom berjalan tegak dari atas ke bawah. Kalau baris dan kolom kacau, ceritanya ikut kacau. Maka matriks selalu tertata rapi: barisnya diam di tempat, kolomnya pun begitu.',
        },
        {
          objek: 'lencanaTertataRapi', judul: 'Menambah Angka, Menang dengan Terang',
          teks: 'Tim A menjumlah skornya: 4 + 7 + 2 = 13. Tim B menjumlah skornya: 9 + 1 + 5 = 15. Maka Tim B menang 15 lawan 13 — dan semuanya terbaca hanya dari enam kotak kecil. Hitungan itu hanya alat. Bantu saja — alat yang menata skor supaya siapa pun bisa memeriksa ulang dengan jujur.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kotak Angka Ternyata Siap Bekerja!',
          teks: 'Papan skor batu itu kini terbaca habis: enam kotak, dua tim, tiga babak, satu pemenang. Owalah, ternyata begini toh — matriks hanyalah kotak-kotak angka yang tertata rapi supaya mudah dibaca, dicari, dan dijumlahkan. Mudah, bukan?',
        },
      ],
    },

    'p3-032': {
      tema: 'lorongPenginapan',
      npc: { glif: 'a23', ucap: ['Baris dulu,', 'kolom kemudian!'] },
      stasiun: [
        {
          objek: 'lorongPenginapanGunung', judul: 'Penginapan dengan Kamar Bernomor',
          teks: 'Siang di penginapan gunung, deretan kamar tersusun dua lantai, tiap lantai tiga kamar, dan tiap pintu diberi angka. Lantai satu berangka 5, 9, 3; lantai dua berangka 7, 2, 8. Susunan kamar seperti ini persis matriks: barisnya lantai, kolomnya kamar di sepanjang lorong.',
        },
        {
          objek: 'pintuKamarLantaiDua', judul: 'Mencari Kamar di Baris 2, Kolom 3',
          teks: 'Tamu bertanya: berapa isi kotak di baris 2, kolom 3? Caranya seperti mencari kamar: naik ke lantai 2 dulu, lalu berjalan ke kamar ke-3. Di sana terpampang angka 8. Singkatnya, alamat itu ditulis a dua-tiga — baris 2 dulu, kolom 3 kemudian, persis lantai dulu baru nomor kamarnya.',
        },
        {
          objek: 'papanUrutanAlamat', judul: 'Urutan Alamat Tak Boleh Ditukar',
          teks: 'Papan penginapan menulis aturan emas: baris dulu, kolom kemudian. Kalau ditukar, alamatnya berubah! Isi kotak baris 1 kolom 2 adalah 9, tapi isi kotak baris 2 kolom 1 adalah 7 — dua alamat yang mirip, isinya beda. Seperti kamar lantai 1 nomor 2 berbeda dengan lantai 2 nomor 1.',
        },
        {
          objek: 'kunciTukarAlamat', judul: 'Kunci Alamat untuk Semua Kotak',
          teks: 'Dengan jurus alamat baris-kolom, isi kotak mana pun bisa dipanggil namanya: baris 1 kolom 3 adalah 3, baris 2 kolom 2 adalah 2, baris 2 kolom 3 adalah 8. Satu kotak, satu alamat, tidak pernah ganda. Begitulah angka besar di matriks bisa ditemukan tanpa membaca semuanya satu per satu.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Setiap Kotak Ternyata Punya Alamat!',
          teks: 'Lantai dulu, kamar kemudian — dan tiap kotak angka langsung ketemu tanpa berpindah-pindah. Owalah, ternyata begini toh — alamat matriks hanyalah cara memanggil kotak: barisnya dulu, kolomnya kemudian, dan urutannya tak boleh ditukar. Mudah, bukan?',
        },
      ],
    },

    'p3-033': {
      tema: 'mejaPiknikSejawat',
      npc: { glif: '2+1', ucap: ['Jumlahkan', 'dengan pasangannya!'] },
      stasiun: [
        {
          objek: 'duaPiringKueSejawat', judul: 'Dua Piring Kue di Meja Piknik',
          teks: 'Sore di meja piknik gunung, ada dua piring kue bertuliskan kotak angka. Piring pertama berisi 2 dan 4 di barisnya, lalu 1 dan 3 di bawahnya. Piring kedua berisi 1 dan 0, lalu 2 dan 2. Tamu piknik ingin menjumlahkan keduanya — dan ada cara yang paling tertib di dunia.',
        },
        {
          objek: 'piringHasilSejawat', judul: 'Setiap Kotak Menjumlah Pasangannya',
          teks: 'Cara tertibnya begini: setiap kotak menjumlah dirinya dengan pasangan di alamat yang sama. Baris 1 kolom 1: 2 + 1 = 3. Baris 1 kolom 2: 4 + 0 = 4. Baris 2 kolom 1: 1 + 2 = 3. Baris 2 kolom 2: 3 + 2 = 5. Jadi hasilnya piring baru berisi 3 dan 4 di atas, 3 dan 5 di bawah.',
        },
        {
          objek: 'kotakUkuranBeda', judul: 'Kotak yang Tidak Bisa Dijumlah',
          teks: 'Di ujung meja ada kotak berukuran lain: dua baris dengan tiga kolom. Piring dua-dua itu tak bisa dijumlah dengannya — karena sebagian kotaknya tidak punya pasangan. Pasangan harus tinggal di alamat yang sama, baris dan kolomnya persis. Maka sebelum menjumlah, cek dulu: ukurannya harus sama.',
        },
        {
          objek: 'papanAturanSejawat', judul: 'Aturan Piknik yang Adil',
          teks: 'Papan piknik menulis aturannya: jumlahkan matriks berarti menjumlah tiap kotak dengan pasangannya di alamat yang sama. Tidak ada kotak yang melompat, tidak ada yang lewat. Semua sejawat, semua adil. Dengan aturan ini, dua papan skor pun bisa digabung jadi satu papan yang lebih besar ceritanya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Menjumlah Matriks Ternyata Kerja Berpasangan!',
          teks: 'Kotak bertemu pasangannya, menjumlah, lalu duduk di alamat yang sama di piring hasil. Owalah, ternyata begini toh — penjumlahan matriks hanyalah kerja berpasangan yang tertib: alamat sama, jumlahkan, selesai. Mudah, bukan?',
        },
      ],
    },

    'p3-034': {
      tema: 'dapurResepGanda',
      npc: { glif: 'dua porsi', ucap: ['Semua kotak', 'ikut dikali!'] },
      stasiun: [
        {
          objek: 'papanResepSatuPorsi', judul: 'Resep Satu Porsi di Dapur Gunung',
          teks: 'Pagi di dapur gunung, papan resep menulis takaran dalam kotak-kotak: baris atas 3 dan 1, baris bawah 2 dan 4 — mungkin sendok gula dan takaran tepung. Itu resep untuk satu porsi kue. Semua angkanya rapi, siap dipakai, dan tak ada yang boleh lupa dihitung.',
        },
        {
          objek: 'resepDigandakanDua', judul: 'Pelanggan Minta Dua Porsi!',
          teks: 'Tiba-tiba pesanan datang: dua porsi kue! Maka resep pun digandakan. Angka di depan — angka 2 — menyapa SEMUA kotak sekaligus: 3 jadi 6, 1 jadi 2, 2 jadi 4, 4 jadi 8. Tidak ada kotak yang terlewat, karena angka 2 itu menyapa semuanya secara adil, dari pojok pertama sampai pojok terakhir.',
        },
        {
          objek: 'timbanganBahanDobel', judul: 'Timbangan Membuktikan Hasilnya',
          teks: 'Timbangan dapur ikut memeriksa: takaran yang tadinya 3 sekarang memang 6, dan takaran yang tadinya 4 sekarang memang 8. Menggandakan matriks ternyata semudah menggandakan resep — kalikan bilangan itu ke setiap kotak, dan hasilnya tinggal dibaca rapi di kotak masing-masing. Tidak ada kotak yang perlu dihitung dua kali, karena sapaannya sudah selesai sekaligus.',
        },
        {
          objek: 'nampanKueDuaPorsi', judul: 'Dua Porsi Siap Disajikan',
          teks: 'Nampan pun berisi kue dua porsi, dan kotak resep barunya tertulis 6 dan 2 di atas, 4 dan 8 di bawah. Perhatikan bentuknya: ukuran kotak tidak berubah, tetap dua baris dua kolom — hanya isinya yang berlipat. Bilangan di depan matriks itu seperti pesanan: ia tak mengubah bentuk, ia hanya menyapa isinya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Menggandakan Matriks Ternyata Menyapa Semua!',
          teks: 'Satu angka di depan, empat kotak di dalam, semua terjawab dua kali lipat tanpa kecuali. Owalah, ternyata begini toh — menggandakan matriks hanyalah menyapa setiap kotak dengan bilangan yang sama, adil dari pojok pertama sampai terakhir. Mudah, bukan?',
        },
      ],
    },

    'p3-035': {
      tema: 'pelataranBarisKolom',
      npc: { glif: 'jabat', ucap: ['Baris sapa kolom,', 'kalikan sejawat!'] },
      stasiun: [
        {
          objek: 'barisAnakKiri', judul: 'Baris Anak-Anak di Kiri',
          teks: 'Siang di pelataran batu gunung, dua anak berdiri berbaris ke samping di kiri, memegang kartu 1 dan 2; di baris kedua dua anak lagi dengan kartu 3 dan 4. Di kanan, dua anak lain berdiri berkolom dengan kartu 5 dan 7; kolom kedua kartu 6 dan 8. Mereka akan bersalaman dengan tertib.',
        },
        {
          objek: 'kolomAnakKanan', judul: 'Sapaan Tertib: Kalikan, Lalu Jumlahkan',
          teks: 'Baris kiri menyapa kolom kanan: anak pertama bertukar kartu dengan tiap anggota kolom — kalikan sejawatnya lalu jumlahkan hasilnya. Kartu 1 menyapa 5: hasilnya 5. Kartu 2 menyapa 7: hasilnya 14. Jumlahkan: 5 + 14 = 19. Itulah isi kotak pertama matriks jawaban mereka.',
        },
        {
          objek: 'kartuHasilSembilanBelas', judul: 'Sembilan Sapaan, Empat Kotak Jawaban',
          teks: 'Sapaan terus berlanjut hingga semua baris selesai menyapa semua kolom. Hasilnya satu matriks jawaban: 19 dan 22 di baris atas, 43 dan 50 di baris bawah. Empat kotak jawaban dari delapan kartu yang saling mengalikan dan menjumlah — sapaan paling tertib di gunung memang punya hasil yang rapi.',
        },
        {
          objek: 'papanArahBerbeda', judul: 'Kejutan: Kalau Dibalik, Hasilnya Berubah!',
          teks: 'Papan pelataran menulis kejutan besar: coba kalau kolom kanan yang menyapa dulu! Hasilnya bukan lagi 19 di kotak pertama, melainkan 23 — karena arah sapanya berbeda. Jadi A kali B tidak sama dengan B kali A. Menyapa dari arah berbeda memberi jawaban berbeda, dan itu bukan salah — memang begitulah perkalian matriks.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Baris Ternyata Menyapa Kolom!',
          teks: 'Kalikan sejawat, jumlahkan, tulis di kotak pertemuan — dan ingat, arah sapanya tak boleh dibalik sembarangan. Owalah, ternyata begini toh — perkalian matriks hanyalah sapaan tertib antara baris dan kolom yang bekerja satu persatu. Mudah, bukan?',
        },
      ],
    },

    'p3-036': {
      tema: 'berandaDuaKakak',
      npc: { glif: '4 dan 3', ucap: ['Dua petunjuk', 'satu jawaban!'] },
      stasiun: [
        {
          objek: 'berandaDuaBangku', judul: 'Dua Kakak Beradik di Beranda',
          teks: 'Sore di beranda rumah gunung, dua kakak beradik duduk di bangku. Orang tua mereka menulis dua petunjuk di papan: jumlah umur kalian 7, dan selisih umur kalian 1. Petunjuk pertama saja belum cukup — banyak pasangan umur yang jumlahnya 7, seperti 5 dan 2, atau 6 dan 1.',
        },
        {
          objek: 'papanJumlahTujuh', judul: 'Petunjuk Kedua Memangkas Semuanya',
          teks: 'Nah, petunjuk kedua beraksi: selisihnya 1. Dari daftar tadi, cuma 4 dan 3 yang selisihnya tepat satu. Maka kakak berumur 4 dan adik berumur 3. Cek dengan dua petunjuk: 4 + 3 = 7 benar, dan 4 - 3 = 1 benar. Dua petunjuk bersama ternyata memangkas semua kemungkinan sampai tinggal satu jawaban.',
        },
        {
          objek: 'papanSelisihSatu', judul: 'Jurus Menjumlah Dua Petunjuk',
          teks: 'Ada jurus lebih cepat lagi: jumlahkan kedua petunjuk! 7 + 1 = 8, dan itu dua kali umur kakak, jadi kakak berumur 4. Tinggal dicoret dari jumlah: 7 - 4 = 3, itulah umur adik. Persamaan x + y = 7 dan x - y = 1 memang sahabat baik — dijumlahkan, angka y langsung hilang, x ketemu.',
        },
        {
          objek: 'kueAngkaEmpatTiga', judul: 'Dua Kue Ulang Tahun 4 dan 3',
          teks: 'Malamnya dibawakan dua kue kecil dengan angka 4 dan 3 — kakak dan adik kini tahu umurnya sendiri. Dua petunjuk yang dulunya cuma angka mati kini jadi cerita dua saudara. Inilah kekuatan sistem persamaan: petunjuk yang bingung sendirian, bila dipasangkan, bisa menemukan sesuatu yang pasti.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Dua Petunjuk Ternyata Saling Lengkapi!',
          teks: 'Jumlah 7, selisih 1 — dan dua umur langsung ketemu tanpa menebak-nebak. Owalah, ternyata begini toh — sistem persamaan hanyalah dua petunjuk yang saling membantu sampai jawabannya tinggal satu. Mudah, bukan?',
        },
      ],
    },

    'p3-037': {
      tema: 'persimpanganDuaJalan',
      npc: { glif: 'temu', ucap: ['Cari titik', 'tempat bertemu!'] },
      stasiun: [
        {
          objek: 'jalanTanjakDuaX', judul: 'Jalan Pertama yang Menanjak',
          teks: 'Senja di pegunungan, dua jalan batu membentang dan akan bertemu di suatu tempat. Jalan pertama punya aturan: dua langkah naik untuk setiap langkah ke samping — itulah garis y = 2x. Di langkah ke-1 ia sudah di ketinggian 2, di langkah ke-2 ia sudah di ketinggian 4.',
        },
        {
          objek: 'jalanTanggaPlusDua', judul: 'Jalan Kedua yang Landai',
          teks: 'Jalan kedua lebih landai: selalu dua tinggi lebih dari langkahnya — itulah garis y = x + 2. Di langkah ke-0 ia di ketinggian 2, di langkah ke-1 ia di 3, di langkah ke-2 ia di 4. Tunggu sebentar — di langkah ke-2, kedua jalan sama-sama berada di ketinggian 4!',
        },
        {
          objek: 'tiangTitikTemuDuaEmpat', judul: 'Tiang Penanda di Titik Temu (2, 4)',
          teks: 'Tepat di langkah 2, ketinggian 4, berdiri tiang penanda menyala: (2, 4). Di titik itulah dua jalan bertemu dan sama-sama setuju — dua aturan berbeda, satu tempat yang memenuhi keduanya. Titik temu dua garis itulah jawaban yang disetujui keduanya. Hitungan itu hanya alat — bantu saja mencari tempat damainya.',
        },
        {
          objek: 'duaJalanSejajarJauh', judul: 'Dua Jalan yang Tak Pernah Bertemu',
          teks: 'Kejauhan terlihat dua jalan lain yang berjalan berdampingan selamanya: keduanya menanjak dua setiap langkah, tapi salah satunya selalu tiga tinggi lebih dulu. Mereka tidak pernah bertemu — tak ada titik temu. Begitu juga garis sejajar: tak ada jawaban yang disetujui keduanya, dan itu juga jawaban yang jujur.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Titik Temu Ternyata Jawaban Kedua Garis!',
          teks: 'Dua aturan jalan, satu langkah yang memenuhi keduanya, satu tiang menyala sebagai tanda damai. Owalah, ternyata begini toh — mencari titik temu hanyalah mencari tempat di mana dua hitungan sama-sama benar. Mudah, bukan?',
        },
      ],
    },

    'p3-038': {
      tema: 'kelasRaporGunung',
      npc: { glif: '3x2', ucap: ['Data tertata', 'mudah dibaca!'] },
      stasiun: [
        {
          objek: 'papanRaporKelasKecil', judul: 'Rapor Tiga Anak di Kelas Kecil',
          teks: 'Siang di kelas kecil gunung, papan rapor menampung nilai tiga anak: Ayu, Budi, dan Citra. Tiap anak punya dua nilai: Matematika dan Menggambar. Ayu nilainya 8 dan 7, Budi 9 dan 6, Citra 7 dan 8. Enam nilai itu disusun jadi kotak tiga baris dua kolom — matriks 3 kali 2.',
        },
        {
          objek: 'kotakNilaiTigaAnak', judul: 'Setiap Baris Milik Satu Anak',
          teks: 'Cara bacanya gampang: satu baris milik satu anak. Baris kedua adalah Budi, kolom pertama milik Matematika, maka alamat baris 2 kolom 1 berisi 9 — nilai Matematika Budi. Tak perlu baca satu per satu; cari alamatnya, langsung ketemu. Data yang tertata rapi memang penurut dicari.',
        },
        {
          objek: 'kartuAlamatNilaiSembilan', judul: 'Menjumlah Kolom untuk Kelas',
          teks: 'Menghitung juga bisa: berapa jumlah nilai Matematika kelas? Baca kolom pertama turun: 8 + 9 + 7 = 24. Kolom Menggambar: 7 + 6 + 8 = 21. Satu papan kecil sekarang menceritakan tiga anak, dua pelajaran, dan dua rekap kelas sekaligus. Matriks memang rumah paling rapi untuk data.',
        },
        {
          objek: 'papanJumlahKolom', judul: 'Data Besar Tinggal Diperbesar',
          teks: 'Papan terakhir menyingkap rahasia sekolah besar: seratus anak hanya perlu seratus baris, dan sepuluh pelajaran cukup sepuluh kolom. Bentuknya tetap sama, cuma diperbesar. Nilai, stok buah, jadwal kereta — semuanya bisa tinggal di kotak baris-kolom yang sama. Yang penting tertata, karena tertata artinya mudah dibaca.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Matriks Ternyata Rumah Rapi Data!',
          teks: 'Baris untuk anak, kolom untuk pelajaran, alamat untuk mencari, jumlah untuk rekap. Owalah, ternyata begini toh — matriks hanyalah rumah rapi tempat data tinggal supaya mudah dibaca dan dihitung. Mudah, bukan?',
        },
      ],
    },

    'p3-039': {
      tema: 'gudangTigaKotak',
      npc: { glif: '1 2 3', ucap: ['Tiga kotak', 'satu trik!'] },
      stasiun: [
        {
          objek: 'tigaKotakHadiahAbc', judul: 'Tiga Kotak di Gudang Malam',
          teks: 'Malam di gudang gunung, tiga kotak hadiah berlabel A, B, dan C menunggu ditimbang. Penjaga gudang hanya sempat menimbang berpasangan: A bersama B beratnya 3, B bersama C beratnya 5, dan A bersama C beratnya 4. Tiga petunjuk, tiga kotak yang belum dikenali isinya.',
        },
        {
          objek: 'timbanganPasanganKotak', judul: 'Trik Gudang: Jumlahkan Semua Timbangan',
          teks: 'Penjaga lalu memakai trik pintar: jumlahkan ketiga timbangan! 3 + 5 + 4 = 12. Perhatikan: tiap kotak ikut tertimbang dua kali di angka itu — A ikut dua kali, B ikut dua kali, C ikut dua kali. Maka 12 adalah dua kali berat ketiga kotak, jadi berat ketiganya bersama adalah 6.',
        },
        {
          objek: 'papanTrikJumlahSemua', judul: 'Menarik Balik Satu per Satu',
          teks: 'Sekarang kotak-kotaknya tinggal ditarik balik dari jumlah 6. A bersama B beratnya 3, maka C sendirian beratnya 6 - 3 = 3. B bersama C beratnya 5, maka A sendirian beratnya 6 - 5 = 1. A bersama C beratnya 4, maka B sendirian beratnya 6 - 4 = 2. Ketiga rahasia terbuka tanpa menebak.',
        },
        {
          objek: 'lampuIsiTigaKotak', judul: 'Lampu Menyala: 1, 2, 3!',
          teks: 'Tiga lampu di atas kotak menyala berurutan: A berisi 1, B berisi 2, C berisi 3. Cek ulang dengan petunjuk asli: A + B = 1 + 2 = 3 benar; B + C = 2 + 3 = 5 benar; A + C = 1 + 3 = 4 benar. Tiga persamaan mencari tiga jawaban — kerja tim yang rapat, persis seperti papan angka besar.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tiga Petunjuk Ternyata Bisa Menimbang Balik!',
          teks: 'Jumlahkan semua timbangan, tarik balik satu per satu, dan tiga kotak langsung mengakui isinya. Owalah, ternyata begini toh — sistem tiga persamaan hanyalah trik menimbang yang rapi: gabungkan dulu, tarik balik kemudian. Mudah, bukan?',
        },
      ],
    },

    'p3-040': {
      tema: 'puncakPapanAngka',
      npc: { glif: 'papan!', ucap: ['Lima papan', 'menyala!'] },
      stasiun: [
        {
          objek: 'limaPapanMisiAngka', judul: 'Lima Papan Misi di Puncak Malam',
          teks: 'Malam di puncak Pegunungan Pola, lima papan angka menyala satu per satu seperti penjaga gerbang. Setiap papan menyimpan satu misi dari pelajaran papan angka: alamat, sejawat, gandakan, sapaan, dan sistem. Pendaki yang selesai satu misi akan melihat papan berikutnya terang penuh.',
        },
        {
          objek: 'papanMisiAlamatJumlah', judul: 'Misi Satu dan Dua: Alamat dan Sejawat',
          teks: 'Papan pertama menunjukkan papan skor lama: 4, 7, 2 di baris atas dan 9, 1, 5 di bawah — baris 2 kolom 1 berapa? Jawabnya 9, alamatnya benar sekali. Papan kedua menjumlah dua kotak kue: 2 + 1 di alamat yang sama, hasilnya 3. Dua papan menyala terang, tiga misi lagi menunggu.',
        },
        {
          objek: 'papanMisiSapaSistem', judul: 'Misi Tiga sampai Lima: Ganda, Sapa, Sistem',
          teks: 'Papan ketiga menggandakan resep 3, 1, 2, 4 menjadi 6, 2, 4, 8 — semua kotak terjawab dua kali lipat. Papan keempat mengajak menyapa: baris 2 dan 3 menyapa kolom 4 dan 5, hasilnya 2 x 4 + 3 x 5 = 23. Papan kelima meminta dua petunjuk: jumlah 7, selisih 1 — jawabannya 4 dan 3, persis dua saudara dulu itu.',
        },
        {
          objek: 'gerbangJuaraPapanAngka', judul: 'Gerbang Juara Papan Angka',
          teks: 'Lima papan kini menyala penuh, dan gerbang batu juara terbuka perlahan di depan puncak. Di baliknya tidak ada hadiah ajaib — hanya pemandangan deretan papan angka yang kini terasa seperti teman lama: kotaknya jelas, alamatnya tertib, sapaannya rapi, dan petunjuknya selalu saling membantu. Pendaki yang tadi takut angka kini berdiri paling tegak di depannya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kamu Penakluk Papan Angka Gunung!',
          teks: 'Alamat dipanggil, sejawat dijumlah, kotak digandakan, baris menyapa kolom, dan tiga kotak beratnya terjawab — lima misi, lima kemenangan. Owalah, ternyata begini toh — matriks dan sistem persamaan hanyalah papan angka yang tertata rapi menunggu untuk dibaca. Mudah, bukan?',
        },
      ],
    },
    'p3-041': {
      tema: 'padangSegitiga',
      npc: { glif: '3 sisi', ucap: ['Kenali tiga', 'sahabat sisi!'] },
      stasiun: [
        {
          objek: 'gerbangSegitigaRaksasa', judul: 'Gerbang Segitiga Raksasa di Padang',
          teks: 'Pagi di padang gunung, sebuah gerbang batu berbentuk segitiga siku berdiri raksasa. Sisi bawahnya terbentang datar seperti lantai, sisi kanannya berdiri tegak seperti dinding, dan satu sisi lagi miring dari puncak turun ke tanah. Tiga sisi ini adalah tiga sahabat yang akan menemanimu belajar sudut dan ukuran sepanjang penjuru ini.',
        },
        {
          objek: 'dindingTegakLantai', judul: 'Dinding Tegak dan Lantai Alas',
          teks: 'Dua sisi yang bertemu membentuk sudut siku punya nama yang mudah diingat. Sisi yang berdiri lurus ke atas disebut sisi tegak, dan sisi yang tergeletak datar di tanah disebut alas — seperti dinding dan lantai di rumah yang selalu bertemu di sudut. Kalau kertasmu sobek membentuk sudut siku, dua tepi yang bertemu itu persis seperti tegak dan alasnya.',
        },
        {
          objek: 'jalanPintasMiring', judul: 'Jalan Pintas Miring yang Terpanjang',
          teks: 'Sisi miring adalah jalan pintas dari puncak dinding langsung ke ujung lantai, dan ia selalu menjadi sisi paling panjang. Pada gerbang ini panjang ketiga sisinya 3, 4, dan 5 — dan miringnya adalah 5, lebih panjang dari 4 maupun 3. Buktinya bisa dihitung: 3 × 3 = 9 dan 4 × 4 = 16, lalu 9 + 16 = 25, persis 5 × 5!',
        },
        {
          objek: 'papanNamaSisi', judul: 'Nama Berubah Menurut Pandangan',
          teks: 'Papan di gerbang menulis rahasia terakhir: nama depan dan samping berubah menurut sudut yang memandang. Dari sudut di tanah, dinding tegak berada di depan mata; tapi dari sudut di puncak, dinding yang sama kini ada di samping. Yang tidak pernah berubah hanya sisi miring — ia tetap miring dari sudut mana pun kamu melihatnya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tiga Sisi Ternyata Punya Nama!',
          teks: 'Alas tergeletak di tanah, tegak berdiri membentuk sudut siku, dan miring melompat dari puncak ke tanah sebagai sisi terpanjang. Owalah, ternyata begini toh — segitiga siku hanyalah tiga sahabat dengan nama yang jelas: alas, tegak, dan miring yang tak pernah kalah panjang. Mudah, bukan?',
        },
      ],
    },

    'p3-042': {
      tema: 'lorongTanggaSandar',
      npc: { glif: '4/2', ucap: ['Tinggi dibagi', 'jaraknya!'] },
      stasiun: [
        {
          objek: 'lorongTigaTangga', judul: 'Tiga Tangga Bersandar di Lorong',
          teks: 'Siang di lorong gunung, tiga tangga bersandar pada dinding yang sama, dan tiap tangga membawa dua angka: berapa tingginya naik dan seberapa jauh maju di tanah. Tangga pertama naik 3 dan maju 3, tangga kedua naik 2 dan maju 4, tangga ketiga naik 4 dan maju 2. Tiga tangga, tiga watak yang berbeda rasa.',
        },
        {
          objek: 'papanNaikMaju', judul: 'Dua Angka Penanda Watak',
          teks: 'Papan kecil di tiap tangga menulis pasangan angkanya: naik 3 maju 3, naik 2 maju 4, dan naik 4 maju 2. Perhatikan tangga kedua: naiknya sedikit tapi majunya jauh, pasti ia landai. Sedangkan tangga ketiga naiknya tinggi tapi majunya pendek — sudah bisa ditebak, ia paling curam. Dua angka saja sudah cukup menceritakan watak sebuah tangga.',
        },
        {
          objek: 'tanggaPembagiCuram', judul: 'Membagi Tinggi dengan Jarak',
          teks: 'Cara mengukur curamnya begini: bagi tinggi naik dengan jarak maju. Tangga pertama: 3 ÷ 3 = 1. Tangga kedua: 2 ÷ 4 = 0,5. Tangga ketiga: 4 ÷ 2 = 2. Makin besar hasil baginya, makin curam tangganya — angka 2 berarti naik dua kali lebih cepat daripada maju. Perbandingan tinggi dan jarak ini punya nama: tangen.',
        },
        {
          objek: 'gelangCuramAman', judul: 'Pemilih Tangga yang Aman',
          teks: 'Pembangun lorong memasang gelang peringatan: tangga dengan angka 2 terlalu curam untuk anak kecil, yang 0,5 nyaman seperti jalan naik halaman, dan yang 1 pas untuk tangga rumah. Hitungan itu hanya alat. Bantu saja — alat kecil yang menjaga langkahmu aman setiap kali memilih tangga untuk dinaiki.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Curam Ternyata Bisa Dihitung!',
          teks: 'Tiga tangga bersandar, dua angka tiap tangga, satu pembagian kecil — dan wataknya langsung terbaca: 1, 0,5, dan 2. Owalah, ternyata begini toh — tangen hanyalah tinggi dibagi jarak, ukuran kecil yang memberitahu seberapa curam sebuah tangga. Mudah, bukan?',
        },
      ],
    },

    'p3-043': {
      tema: 'menaraSisiMiring',
      npc: { glif: 'sin', ucap: ['Tinggi dan alas', 'kawin miring!'] },
      stasiun: [
        {
          objek: 'menaraTanggaSenja', judul: 'Tangga Lima Meter di Menara Senja',
          teks: 'Senja di menara batu, satu tangga sepanjang 5 meter bersandar santai. Kakinya berjarak 3 meter dari menara, dan puncaknya menyentuh dinding pada ketinggian 4 meter. Tiga, empat, lima — segitiga siku yang sudah kau kenal kini memperkenalkan dua sahabat baru: sinus dan cosinus.',
        },
        {
          objek: 'kartuSinusEmpatLima', judul: 'Sinus: Tinggi di Atas Miring',
          teks: 'Sinus bertanya: seberapa tinggi tangga menjangkau, dibanding panjang tangganya? Tinggi yang tersentuh adalah 4, tangganya 5, maka sinusnya 4 ÷ 5 = 0,8. Artinya tangga ini mengubah 0,8 kali panjang badannya menjadi ketinggian — hampir seluruh tangga berdiri jadi tempat yang tinggi.',
        },
        {
          objek: 'kartuCosinusTigaLima', judul: 'Cosinus: Alas di Bawah Miring',
          teks: 'Cosinus sahabatnya bertanya soal kaki: seberapa jauh kakinya menyingkir dari menara, dibanding panjang tangga? Jaraknya 3, tangganya 5, maka cosinusnya 3 ÷ 5 = 0,6. Dua sahabat ini sama-sama membandingkan diri dengan sisi miring — yang satu menjaga ketinggian, yang satu menjaga kaki di tanah.',
        },
        {
          objek: 'papanKuadratSatu', judul: 'Kejutan Dua Sahabat',
          teks: 'Papan di menara menulis kejutan: kuadratkan kedua sahabat lalu jumlahkan! 0,8 × 0,8 = 0,64 dan 0,6 × 0,6 = 0,36. Jumlahnya 0,64 + 0,36 = 1, persis satu. Kejutannya: pada segitiga siku mana pun, dua sahabat ini selalu berjumlah satu begitu dikuadratkan — coba saja dengan tangga lain, angkanya tak pernah ingkar.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Dua Sahabat Ternyata Berjumlah Satu!',
          teks: 'Tangga lima meter membangkitkan sinus 0,8 dan cosinus 0,6 — dan saat dikuadratkan, keduanya berpadu menjadi tepat satu. Owalah, ternyata begini toh — sinus dan cosinus hanyalah dua cara mengawinkan sisi dengan sisi miring, dan keduanya sahabat yang tak terpisahkan. Mudah, bukan?',
        },
      ],
    },

    'p3-044': {
      tema: 'pelataranMiniatur',
      npc: { glif: 'rasio', ucap: ['Bentuk sama,', 'rasio sama!'] },
      stasiun: [
        {
          objek: 'duaMenaraBanding', judul: 'Menara Kecil dan Menara Besar',
          teks: 'Pagi di pelataran batu, dua menara berdiri berdampingan: satu miniatur dengan tinggi 4 dan alas 3, satu menara asli dua kali lipatnya — tinggi 8 dan alas 6. Tali silang dari puncak ke ujung alas: pada miniatur panjangnya 5, pada menara asli 10. Miniatur itu bukan mainan — ia adalah menara besar dalam ukuran saku.',
        },
        {
          objek: 'papanRasioSetia', judul: 'Rasio yang Tak Bergeser',
          teks: 'Bagi tinggi dengan miring pada miniatur: 4 ÷ 5 = 0,8. Sekarang pada menara asli: 8 ÷ 10 = 0,8. Coba juga alasnya: 3 ÷ 5 = 0,6 dan 6 ÷ 10 = 0,6. Semua angkanya sama persis! Dua kali lipat ukuran ternyata tidak menggeser perbandingannya sedikit pun — rasionya menunggu di tempat yang sama.',
        },
        {
          objek: 'tigaUkuranSebaris', judul: 'Tiga Ukuran Sepakat',
          teks: 'Pembawa model datang menambahkan menara ketiga tiga kali lipat: tinggi 12, alas 9, miring 15. Bagilah: 12 ÷ 15 = 0,8 dan 9 ÷ 15 = 0,6. Tiga ukuran yang berbeda-beda kini berdiri sepakat dengan rasio yang sama — kecil, sedang, besar, semuanya satu keluarga bentuk yang saling setia.',
        },
        {
          objek: 'kunciSebangun', judul: 'Kunci Sebangun untuk Belajar',
          teks: 'Karena itu para penjuru membuat miniatur dulu sebelum membangun yang asli. Bentuknya sama, perbandingannya sama, maka hitungan di miniatur pasti sah untuk yang besar. Segitiga-segitiga setia seperti ini disebut sebangun — bentuk kembar dengan ukuran bebas, sahabat terpercaya para pembangun.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Perbandingan Ternyata Setia!',
          teks: 'Miniatur 3-4-5, menara 6-8-10, model 9-12-15 — tiga ukuran, satu rasio 0,8 dan 0,6 yang tak pernah bergeser. Owalah, ternyata begini toh — segitiga sebangun hanyalah bentuk yang sama dengan ukuran berbeda, dan perbandingannya setia menunggu untuk dihitung. Mudah, bukan?',
        },
      ],
    },

    'p3-045': {
      tema: 'kebunBayangan',
      npc: { glif: '45!', ucap: ['Bayangan jadi', 'gurunya!'] },
      stasiun: [
        {
          objek: 'tongkatBayangan', judul: 'Tongkat Kecil dan Bayangannya',
          teks: 'Sore di kebun gunung, matahari rendah dan sebuah tongkat setinggi 2 meter tertancap di tanah. Bayangannya terbentang tepat 2 meter juga — panjang bayangan sama dengan panjang tongkatnya. Keanehan kecil ini adalah pintu rahasia untuk mengukur benda raksasa tanpa menyentuhnya sama sekali.',
        },
        {
          objek: 'pohonBayanganDuaBelas', judul: 'Bayangan Pohon yang Panjang',
          teks: 'Di ujung kebun, satu pohon tinggi melempar bayangan sepanjang 12 meter. Pohon itu terlalu tinggi untuk dipanjat, terlalu besar untuk diukur dengan meteran. Tapi bayangannya terbentang manis di tanah, ikut menyerah pada siapa pun yang mau membacanya dengan sabar.',
        },
        {
          objek: 'papanPerbandinganBayang', judul: 'Perbandingan Bayangan Menjawab',
          teks: 'Papan kebun menulis caranya: bagi tinggi dengan bayangan pada tongkat — 2 ÷ 2 = 1. Maka tinggi = 1 × bayangan. Tinggi pohon: 1 × 12 = 12 meter! Beribu-ribu tahun lalu, Thales di negeri Mesir mengukur piramida raksasa dengan cara yang sama: cukup tongkat, bayangan, dan satu pembagian kecil.',
        },
        {
          objek: 'buktiMemukulSama', judul: 'Rahasia Sudut Empat Lima',
          teks: 'Kenapa bayangan tongkat sama panjang dengan tongkatnya? Karena sore itu matahari tepat di sudut 45 derajat: naiknya sama banyak dengan majunya. Pada sudut istimewa ini bayangan selalu setia meniru tinggi — menara berbayangan 30 meter pasti tingginya 30 meter juga. Bisa dicek ulang kapan saja sore-sore!',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Pohon Raksasa Ternyata Bisa Diukur!',
          teks: 'Tongkat 2 meter, bayangan 2 meter, pembagian 1 — dan pohon yang tak terjamah langsung terjawab 12 meter. Owalah, ternyata begini toh — mengukur yang tak bisa disentuh hanyalah membaca perbandingan bayangan, warisan Thales yang masih hidup sampai hari ini. Mudah, bukan?',
        },
      ],
    },

    'p3-046': {
      tema: 'tamanAyunan',
      npc: { glif: 'ayun!', ucap: ['Naik turun', 'berulang setia!'] },
      stasiun: [
        {
          objek: 'ayunanTamanBunga', judul: 'Ayunan Bunga di Taman Gunung',
          teks: 'Siang di taman gunung, sebuah ayunan tali berayun santai di antara dua bunga. Ia melaju ke depan, melambat, berhenti sejenak, lalu meluncur kembali ke belakang. Gerak yang sepele ini ternyata menyimpan salah satu bentuk paling terkenal di seluruh matematika — gelombang.',
        },
        {
          objek: 'taliNaikTurun', judul: 'Naik, Turun, Naik Lagi',
          teks: 'Perhatikan tingginya. Dari titik diam, ayunan naik ke ketinggian 3 di depan, turun melewati titik diam, lalu naik ke ketinggian 3 di belakang, dan balik lagi. Naik, turun, naik, turun — tanpa lelah, tanpa tersesat, dan selalu kembali ke tempat yang sama dengan kecepatan yang sama.',
        },
        {
          objek: 'kertasGrafikAyunan', judul: 'Cerita Ayunan di Kertas',
          teks: 'Seorang tamu menggambar tinggi ayunan dari waktu ke waktu pada kertas, dan muncullah bentuk menakjubkan: bukit dan lembah yang bergantian rapi seperti perbukitan berulang. Bentuk itu bernama gelombang. Karena lahir dari gerak berulang yang setia, ia menjadi sahabat ayunan, riak laut, hingga denyut jantung.',
        },
        {
          objek: 'jamAyunanSetia', judul: 'Ritme yang Bisa Dipercaya',
          teks: 'Ayunan ini selalu butuh 2 detik melaju ke depan dan 2 detik pulang — satu putaran penuh 4 detik, tidak pernah terlambat. Kesetiaan itulah yang dipakai jam berpendulum berabad-abad lalu untuk menghitung waktu. Hitungan itu hanya alat. Bantu saja — alat yang mengingatkan manusia agar tak lupa waktunya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Ayunan Ternyata Gelombang!',
          teks: 'Naik ke 3, turun lewat titik diam, naik ke 3 lagi — dan di kertas, gerak itu hidup menjadi bukit-lembah gelombang yang rapi. Owalah, ternyata begini toh — gerak berulang yang setia ritmenya hanyalah gelombang yang sedang bernyanyi pelan. Mudah, bukan?',
        },
      ],
    },

    'p3-047': {
      tema: 'bukitRodaRaksasa',
      npc: { glif: '0-10', ucap: ['Roda berputar,', 'gelombang lahir!'] },
      stasiun: [
        {
          objek: 'rodaRaksasaMalam', judul: 'Roda Raksasa yang Menyala',
          teks: 'Malam di bukit gunung, sebuah roda raksasa menyala penuh lampu berputar pelan. Satu lampu kecil di tepi rodanya berkilat mengikuti perputaran. Kejadian kecil pada lampu itu adalah kunci lahirnya gelombang sinus yang sesungguhnya di depan matamu.',
        },
        {
          objek: 'lampuTepiRoda', judul: 'Lampu Kecil yang Naik-turun',
          teks: 'Saat roda berputar, lampu kecil itu naik dari tanah, merangkak sampai puncak 10 meter, lalu turun perlahan kembali ke 0. Naik lagi, turun lagi, berulang tanpa henti. Roda berputar mendatar di tempatnya, tapi lampu di tepinya menari naik-turun dengan anggun seperti penari kecil.',
        },
        {
          objek: 'papanTinggiLampu', judul: 'Catatan Tinggi yang Berulang',
          teks: 'Papan di kaki bukit mencatat tinggi lampu dari waktu ke waktu: 0, lalu 3, lalu 7, puncak 10, turun 7, 3, kembali 0, dan naik lagi. Baca tulisannya dari kiri ke kanan: bukit dan lembah berulang — persis gelombang! Naik-turun sebuah titik pada roda ternyata menggambar gelombang sinus dengan tangannya sendiri.',
        },
        {
          objek: 'kabinTurunNaik', judul: 'Batas Setia 0 sampai 10',
          teks: 'Ada satu janji yang tak pernah dilanggar. Tinggi lampu tak pernah melebihi 10 dan tak pernah di bawah 0 — sebesar apa pun rodanya berputar. Kabin-kabin pun naik-turun di antara angka itu dengan setia, membawa penumpang menikmati ritme yang sama sejak roda pertama kali berputar.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Roda Berputar Ternyata Melahirkan Gelombang!',
          teks: 'Lampu naik dari 0 ke 10, turun ke 0 lagi, dan catatannya menjadi bukit-lembah yang berulang selamanya. Owalah, ternyata begini toh — gelombang sinus adalah naik-turun sebuah titik pada lingkaran yang berputar, ditulis rapi baris demi baris. Mudah, bukan?',
        },
      ],
    },

    'p3-048': {
      tema: 'gerbangTigaSudut',
      npc: { glif: '30 45', ucap: ['Tiga sudut', 'paling setia!'] },
      stasiun: [
        {
          objek: 'tigaGerbangSudut', judul: 'Tiga Gerbang dengan Tiga Sudut',
          teks: 'Pagi di penjuru gunung, tiga gerbang segitiga siku berjajar megah: gerbang 45 derajat, gerbang 60 derajat, dan gerbang 30 derajat. Ketiganya paling sering dipanggil dalam soal-soal di seluruh dunia. Bukan karena ajaib, melainkan karena perbandingannya paling mudah digambar, dihitung, dan diingat.',
        },
        {
          objek: 'gerbangKembarEmpatLima', judul: 'Gerbang 45: Kakinya Kembar',
          teks: 'Gerbang 45 punya dua kaki sama panjang — misalnya naik 1 dan maju 1. Karena kembar, tinggi dan alasnya selalu bergantian posisi: tinggi ÷ miring sama dengan maju ÷ miring, keduanya 0,707. Dan tangennya: 1 ÷ 1 = 1, pas — tangga 45 derajat naik persis sejauh majunya, tidak lebih dan tidak kurang.',
        },
        {
          objek: 'gerbangSetengahTigaPuluh', judul: 'Gerbang 30: Setengah Sisi Miring',
          teks: 'Gerbang 30 lahir dari segitiga sama sisi yang dibelah dua menjadi kembar. Hadiahnya istimewa: sisi terpendek selalu setengah dari sisi miring. Miringnya 6? Tingginya pasti 3. Miringnya 2? Tingginya 1. Bisa dicek berkali-kali, jawabannya tak pernah berubah: 1 ÷ 2 = 0,5 — setengah selalu.',
        },
        {
          objek: 'gerbangEnamPuluhTinggi', judul: 'Gerbang 60: Kakinya Jangkung',
          teks: 'Gerbang 60 adalah belahan tadi — sudutnya di puncak segitiga sama sisi. Kakinya jangkung: tingginya 1,73 saat alasnya 1, dan tinggi ÷ miringnya 0,866. Tiga gerbang, tiga watak yang bisa dihitung ulang kapan pun oleh siapa pun — karena itulah mereka disebut sudut istimewa.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tiga Sudut Ternyata Sahabat Lama!',
          teks: '45 yang berkaki kembar, 30 yang setengah miring, dan 60 yang jangkung — ketiganya bisa digambar, dihitung, dan dipanggil lagi esok hari. Owalah, ternyata begini toh — sudut istimewa hanyalah tiga sahabat tua yang perbandingannya paling mudah diingat. Mudah, bukan?',
        },
      ],
    },

    'p3-049': {
      tema: 'kolamRiakMalam',
      npc: { glif: 'riak', ucap: ['Puncak ke puncak', 'jaraknya tetap!'] },
      stasiun: [
        {
          objek: 'kolamRiakBulan', judul: 'Kolam Malam dan Riak Pertama',
          teks: 'Malam di kolam gunung, bulan purnama tergeletak tenang di permukaan air. Sebuah riak kecil melaju dari tepi ke tepi, punggungnya naik turun membentuk gelombang halus yang berkilau. Malam ini kolam berubah menjadi kelas gelombang paling terbuka di dunia.',
        },
        {
          objek: 'kerikilJatuhTengah', judul: 'Kerikil Kecil, Riak Berbaris',
          teks: 'Seekor katak menjatuhkan kerikil, dan riak pun lahir berbaris rapi: satu riak, diikuti riak berikutnya, lalu berikutnya lagi. Puncak setiap riak menonjol manis di atas air, dan di antara dua puncak ada lembah yang menekuk pelan. Semua bergerak maju dengan tertib tanpa saling menabrak.',
        },
        {
          objek: 'puncakKePuncakEmpat', judul: 'Jarak Puncak ke Puncak',
          teks: 'Ukur jarak dari puncak satu riak ke puncak riak berikutnya: puncak pertama di tanda 2, puncak kedua di tanda 6, puncak ketiga di tanda 10. Selisihnya 6 − 2 = 4 dan 10 − 6 = 4 — selalu 4! Jarak puncak ke puncak yang tetap ini punya nama cantik: panjang gelombang.',
        },
        {
          objek: 'lembahRiakSetia', judul: 'Lembah yang Ikut Setia',
          teks: 'Lembah pun ikut setia. Lembah pertama di tanda 4, berikutnya di 8, lalu 12 — selisihnya juga selalu 4, dan selalu tersisip rapi di tengah antara dua puncak. Riak tak pernah berbohong tentang jaraknya; cukup ukur dua puncak, panjang gelombang langsung terjawab tanpa perlu menebak.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Riak Air Ternyata Teratur!',
          teks: 'Puncak di 2, 6, 10 dan lembah di 4, 8, 12 — semuanya berjarak 4 yang setia, di atas air yang tenang. Owalah, ternyata begini toh — riak air hanyalah gelombang yang berbaris teratur, dan panjang gelombang hanyalah jarak puncak ke puncak. Mudah, bukan?',
        },
      ],
    },

    'p3-050': {
      tema: 'puncakPengukurJauh',
      npc: { glif: 'ukur!', ucap: ['Lima misi', 'puncak menunggu!'] },
      stasiun: [
        {
          objek: 'menaraPengukurMalam', judul: 'Puncak Pengukur Jauh',
          teks: 'Malam di puncak tertinggi gunung, lima papan misi menyala berderet menghadap lembah yang luas. Masing-masing menyimpan soal tentang sisi, tangga, bayangan, dan riak. Seluruh ilmu penjuru pengukur sudah kau kumpulkan sejak gerbang segitiga raksasa di pagi hari.',
        },
        {
          objek: 'papanMisiSisiTangga', judul: 'Misi Satu dan Dua: Sisi dan Tangga',
          teks: 'Misi satu: segitiga bersisi 3, 4, dan 5 — mana sisi miringnya? Jawabnya 5, yang paling panjang, berhadapan langsung dengan sudut siku. Misi dua: tangga 5 meter menyentuh dinding di ketinggian 4 meter — tinggi ÷ miring = 4 ÷ 5 = 0,8. Sinus tangga itu 0,8, dan tak perlu memanjat untuk memastikannya.',
        },
        {
          objek: 'papanMisiBayangMenara', judul: 'Misi Tiga dan Empat: Bayangan dan Menara',
          teks: 'Misi tiga: matahari tepat 45 derajat dan pohon melempar bayangan 8 meter — berapa tingginya? Pada sudut ini bayangan meniru tinggi, jadi 8 meter juga. Misi empat: miniatur menara 3-4-5 berhadapan dengan menara asli 6-8-10 — alas ÷ miring: 6 ÷ 10 = 0,6, sama persis dengan 3 ÷ 5. Perbandingannya tetap setia.',
        },
        {
          objek: 'limaPapanMisiJauh', judul: 'Misi Lima: Setengah Sisi Miring',
          teks: 'Misi lima menunggu di papan terakhir: segitiga bersudut 30 derajat dengan sisi miring 6 — berapa sisi terpendeknya? Setengah dari miring: 6 ÷ 2 = 3. Lima papan kini menyala penuh, gerbang juara terbuka perlahan, dan seluruh lembah berkilau di bawah kaki sang pengukur jauh.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kamu Pengukur Jauh Sejati!',
          teks: 'Nama tiga sisi, tangen tangga, bayangan 45 derajat, rasio sebangun, dan setengah sisi miring — lima misi, lima kemenangan dengan hitungan yang bisa dicek ulang siapa pun. Owalah, ternyata begini toh — trigonometri hanyalah seni mengukur yang jauh dan tinggi dari tempat berdirimu sekarang. Mudah, bukan?',
        },
      ],
    },
    'p3-051': {
      tema: 'padangDuaPanah',
      npc: { glif: '5 dan 5', ucap: ['Besar saja', 'tak cukup!'] },
      stasiun: [
        {
          objek: 'duaPanahBerlawanan', judul: 'Dua Anak dan Satu Patok',
          teks: 'Pagi di padang gunung, sebuah patok batu berdiri di tengah lapangan dengan dua panah batu besar mengarah berlawanan. Ani melangkah lima langkah ke timur, sedangkan Budi melangkah lima langkah ke barat. Angka mereka sama-sama lima, tetapi tempat berdiri keduanya kini berjauhan. Di sinilah rahasia pertama vektor: angka biasa hanya bicara berapa banyak, sementara vektor juga bicara ke arah mana.',
        },
        {
          objek: 'papanBesarArah', judul: 'Angka Lima yang Dua Rupa',
          teks: 'Papan di pinggir padang menulis teka-teki sederhana: lima langkah timur dan lima langkah barat, mana yang benar? Jawabannya keduanya benar, sebab keduanya berbeda arah. Vektor menuliskannya dengan dua bagian: besarannya lima langkah, dan arahnya timur atau barat. Kalau arahnya tidak disebut, ceritanya jadi setengah — seperti undangan pesta tanpa alamat rumahnya.',
        },
        {
          objek: 'patokJarakSepuluh', judul: 'Mengukur Jarak Keduanya',
          teks: 'Sekarang ukur seberapa jauh Ani dan Budi terpisah. Ani berdiri 5 langkah di timur patok, Budi 5 langkah di barat patok, maka jarak mereka 5 + 5 = 10 langkah. Dua angka 5 yang sama rata ternyata menghasilkan jarak 10 saat menghadap arah berlawanan. Hitungannya sederhana, tetapi tanpa memperhatikan arah, siapa pun akan mengira mereka berdekatan.',
        },
        {
          objek: 'gerbangArahVektor', judul: 'Gerbang Bilangan Berarah',
          teks: 'Di ujung padang berdiri gerbang berukir dua panah silang, pintu masuk penjuru vektor. Di atasnya tertulis pesan pembuka: bilangan berarah membawa dua kabar sekaligus — seberapa jauh dan ke arah mana. Mulai sekarang, setiap panah yang kau temui di gunung akan bercerita tentang dua hal itu. Hitungan itu hanya alat, tetapi alat yang membuat arah terjelaskan dengan jelas.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Angka Sama Ternyata Bisa Berjauhan!',
          teks: 'Dua langkah lima yang sama rata, begitu arahnya berlawanan, jaraknya malah 10 langkah. Owalah, ternyata begini toh — vektor hanyalah bilangan yang jujur membawa dua kabar: besarnya dan arahnya, dan keduanya sama pentingnya. Mudah, bukan?',
        },
      ],
    },

    'p3-052': {
      tema: 'jalanRumahSekolah',
      npc: { glif: '4+3=5', ucap: ['Panah pintas', 'dua kabar!'] },
      stasiun: [
        {
          objek: 'jalanZigzagSekolah', judul: 'Jalan Berliku ke Sekolah',
          teks: 'Siang di lereng gunung, peta besar terbentang di papan batu: rumah di pojok bawah, sekolah di pojok atas. Jalan setapak berliku lewat toko, belok di taman, lalu menyusur sungai — panjangnya melelahkan. Tetapi di peta itu ada satu panah merah melukis garis lurus dari rumah tepat ke sekolah, pintas yang membuat semua anak penasaran.',
        },
        {
          objek: 'panahLurusTikus', judul: 'Panah Pintas yang Setia',
          teks: 'Panah merah itu adalah vektor perjalanan: ia tidak ikut berliku, ia hanya menyimpan dua kabar — sejauh mana sekolah dari rumah, dan ke arah mana harus menghadap. Jalan berliku bisa panjang atau pendek, tetapi panah pintas selalu sama, sebab arah rumah ke sekolah tak pernah berubah. Karena itu pemandu gunung suka menggambar panah daripada menceritakan seluruh jalan.',
        },
        {
          objek: 'segitigaJalanSiku', judul: 'Mengukur Panjang Pintas',
          teks: 'Sekarang hitung panjangnya. Dari rumah, jalan lurus dulu 4 langkah ke utara, lalu belok siku 3 langkah ke timur sampai sekolah. Panah pintas menghubungkan ujung ke ujung, dan panjangnya dijawab jurus penjuru kemarin: 4 × 4 = 16 dan 3 × 3 = 9, lalu 16 + 9 = 25 yang akarnya tepat 5. Jalan berliku 7 langkah, panah pintas hanya 5 — segitiga siku 3-4-5 ikut berjalan di peta sekolah!',
        },
        {
          objek: 'papanPetunjukPanah', judul: 'Dua Kabar dalam Satu Panah',
          teks: 'Papan penutup merangkum pelajaran siang itu: satu panah vektor membawa dua kabar sekaligus — panjangnya memberi tahu jarak, arahnya memberi tahu menghadap ke mana. Dua panah sama panjang tetapi menghadap beda arah adalah dua panah berbeda, persis dua angka 5 di padang pagi tadi. Kini setiap peta di gunung terasa lebih ramah: cukup baca panahnya, dua kabar langsung tertangkap.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Jalan Berliku Ternyata Punya Pintas!',
          teks: 'Berliku 4 lalu belok 3, panah pintasnya lurus 5 — segitiga siku lama ikut bekerja di peta. Owalah, ternyata begini toh — panah perjalanan hanyalah vektor yang merangkum seluruh jalan menjadi dua kabar: berapa jauh dan ke arah mana. Mudah, bukan?',
        },
      ],
    },

    'p3-053': {
      tema: 'lorongPanahSambung',
      npc: { glif: 'sambung!', ucap: ['Ujung ke ujung', 'jadi satu!'] },
      stasiun: [
        {
          objek: 'duaPanahBerturut', judul: 'Dua Panah di Lorong Batu',
          teks: 'Pagi di lorong gunung yang berumput, dua panah batu terbaruk berurutan di tanah. Panah pertama menyuruh maju 3 langkah, panah kedua menyuruh maju lagi 2 langkah ke arah yang sama. Seorang pengembara menatap keduanya dan bertanya: kalau keduanya dijalankan berturut-turut, sama kah hasilnya dengan satu panah saja? Lorong ini akan menjawabnya langkah demi langkah.',
        },
        {
          objek: 'panahJumlahTunggal', judul: 'Sambung Ekor ke Kepala',
          teks: 'Jurus penyambungan bekerja begini: kepala panah pertama disambung ekor panah kedua, lalu tarik satu panah baru dari ekor yang paling awal sampai kepala yang paling akhir. Maju 3 lalu maju 2 sama artinya dengan maju 5 sekaligus. Dua panah berturut-turut menjadi satu panah tunggal — itulah penjumlahan panah yang paling sederhana, cukup dibayangkan seperti berjalan biasa.',
        },
        {
          objek: 'jalurMundurSambung', judul: 'Ketika Kedua Panah Beda Arah',
          teks: 'Lorong berikutnya memberi soal balik: maju 3 langkah, lalu mundur 2 langkah. Sambung lagi dari ekor ke kepala, dan panah hasilnya hanya maju 1 langkah. Arah berlawanan saling menarik: 3 langkah maju ditebus 2 langkah mundur, menyisakan 1. Semakin sering berlatih menyambung, semakin cepat matamu membaca panah hasil tanpa perlu menghitung di tanah.',
        },
        {
          objek: 'papanUjungKeUjung', judul: 'Papan Jurus Ujung ke Ujung',
          teks: 'Di ujung lorong berdiri papan batu berukir dua panah menyambung. Petunjuknya singkat: bila panah dijalankan berturut-turut, panah jumlahnya ditarik dari ekor yang pertama sampai kepala yang terakhir. Tak perlu menghafal, cukup bayangkan berjalan: tempat berakhirnya perjalananmu itulah ujung panah jumlahnya. Berjalan bertahap atau sekali jalan, tempat berhentinya tetap sama.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Dua Panah Ternyata Jadi Satu!',
          teks: 'Maju 3 lalu maju 2 sama dengan maju 5; maju 3 lalu mundur 2 menyisakan maju 1. Owalah, ternyata begini toh — penjumlahan panah hanyalah cerita perjalanan: ujung perjalanan terakhir itulah kepala panah jumlahnya. Mudah, bukan?',
        },
      ],
    },

    'p3-054': {
      tema: 'lapanganPanahKembar',
      npc: { glif: '3 dan -3', ucap: ['Kembar menguatkan', 'lawan menghapus!'] },
      stasiun: [
        {
          objek: 'panahKembarSejajar', judul: 'Dua Panah Kembar di Lapangan',
          teks: 'Siang di lapangan gunung, dua panah batu berdiri berdampingan dengan panjang sama persis dan menghadap arah yang sama. Keduanya disebut panah kembar: sama besar, sama arah, dan boleh saling menggantikan di mana pun berdirinya. Dua anak menarik karung biji dengan panah kembar itu, maka karung bergerak sama jauhnya seolah ditarik satu kekuatan yang rapi.',
        },
        {
          objek: 'panahLawanBerbalik', judul: 'Panah Lawan yang Berbalik',
          teks: 'Di sisi lain lapangan berdiri satu panah lain: panjangnya sama 3, tetapi kepalanya berbalik ke arah sebaliknya. Panah ini disebut lawan dari panah tadi. Lawan tidak selalu jelek; ia hanya berjalan ke arah balik dengan kekuatan sama besar. Maju 3 dan mundur 3 adalah sepasang lawan yang setia menarik ke arah berlawanan.',
        },
        {
          objek: 'patokKembaliNol', judul: 'Kembali ke Patok Nol',
          teks: 'Sekarang uji keduanya sekaligus. Dari patok, maju 3 langkah, lalu jalankan panah lawan: mundur 3 langkah. Kakimu berhenti tepat di patok semula — tak maju, tak mundur. Dua panah itu saling meniadakan, dan perjalanan bersihnya nol. Sepasang panah lawan memang unik: digabungkan, keduanya pulang tanpa meninggalkan jejak langkah.',
        },
        {
          objek: 'papanAngkaMinus', judul: 'Menulis Mundur dengan Tanda Minus',
          teks: 'Papan lapangan mengajarkan cara menulisnya: maju ditulis 3, mundur ditulis −3, maka panah gabungan tertulis 3 + (−3) = 0. Tanda minus bukan hal buruk, ia hanya penanda arah balik. Begitu jalanmu di gunung berbalik arah, cukup ganti tandanya, lalu hitung seperti penjumlahan biasa. Angka dan arah kini tinggal satu tulisan yang rapi di papan.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Maju dan Mundur Ternyata Saling Menghapus!',
          teks: 'Kembar sama arah saling menguatkan, lawan berbalik arah saling menghapus, dan 3 + (−3) pulang tepat ke patok nol. Owalah, ternyata begini toh — panah lawan hanyalah kembar yang berbalik badan, dan jumlahnya selalu nol. Mudah, bukan?',
        },
      ],
    },

    'p3-055': {
      tema: 'tamanKisiKotak',
      npc: { glif: '3,2', ucap: ['Kanan dulu', 'baru naik!'] },
      stasiun: [
        {
          objek: 'kisiTaliHalaman', judul: 'Tali Kisi di Taman',
          teks: 'Siang di taman kebun gunung, dua gulung tali direntang membentuk kisi kotak besar di atas rumput, seperti papan catur raksasa yang rata. Setiap persilangan tali adalah alamat, dan setiap kotak bisa dihitung satu per satu. Di pojok kisi tertancap patok kecil bertanda mulai — seluruh permainan arah hari ini berangkat dari sana.',
        },
        {
          objek: 'kartuVektorTigaDua', judul: 'Kartu Perintah (3, 2)',
          teks: 'Sebuah kartu kayu tertancap di patok, bertuliskan dua angka berkurung: (3, 2). Aturannya ramah: angka pertama menyuruh jalan ke kanan, angka kedua menyuruh naik. Maka langkahkan 3 kotak ke kanan, lalu 2 kotak ke atas, dan tempelkan bendera di persilangan itu. Dua angka kecil ternyata cukup untuk menggambarkan satu panah utuh dari patok sampai bendera.',
        },
        {
          objek: 'kartuVektorDuaTiga', judul: 'Tukar Urutan, Arah Berubah',
          teks: 'Kartu kedua menantang: (2, 3). Angkanya tetap 3 dan 2, hanya posisinya ditukar. Jalankan lagi: 2 kotak ke kanan dulu, baru 3 ke atas — bendera kini tertancap di persilangan yang berbeda! Dua panah itu sama panjang, tetapi arahnya miring ke tempat lain. Urutan angka dalam kurung ternyata bukan hiasan; menukarnya berarti menuju tujuan yang berbeda.',
        },
        {
          objek: 'papanUrutanPenting', judul: 'Papan Angka Berpasangan',
          teks: 'Papan penutup taman merangkum hari itu: sepasang angka dalam kurung adalah alamat satu panah — angka pertama bicara kanan, angka kedua bicara naik. Tulis (3, 2) maka panah condong landai; tulis (2, 3) maka panah berdiri lebih tegak. Begitu terbiasa, seluruh kisi kotak di gunung terbaca seperti buku: setiap bendera punya alamat, dan setiap alamat memancangkan satu panah.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Dua Angka Ternyata Cukup Menunjuk Arah!',
          teks: 'Kanan 3 naik 2 tertulis (3, 2), dan begitu ditukar jadi (2, 3) bendera pindah tempat. Owalah, ternyata begini toh — vektor di kisi kotak hanyalah sepasang angka berkurung yang setia menjelaskan arah. Mudah, bukan?',
        },
      ],
    },

    'p3-056': {
      tema: 'dermagaPerahuSungai',
      npc: { glif: 'dayung!', ucap: ['Dua dorongan', 'satu luncuran!'] },
      stasiun: [
        {
          objek: 'perahuTepiDermaga', judul: 'Perahu Kecil di Dermaga Pagi',
          teks: 'Pagi di dermaga kayu gunung, perahu kecil berangkat menyeberangi sungai yang deras. Pendayungnya mengarahkan dayung tegak lurus ke seberang, berharap mendarat persis di pantai yang berhadapan. Tetapi air sungai punya usul lain: ia mendorong perahu ke hilir sambil perahu melaju ke seberang. Dua kekuatan bekerja bersama pada satu badan perahu.',
        },
        {
          objek: 'panahArusDeras', judul: 'Dua Panah di Badan Perahu',
          teks: 'Pandangi perahunya seperti membaca dua panah sekaligus. Panah pertama milik pendayung: menunjuk tegak ke seberang, panjangnya 4. Panah kedua milik arus: menunjuk menyusur hilir, panjangnya 3. Keduanya menarik perahu bersamaan, maka perahu meluncur ke arah paduan keduanya — bukan tegak lurus, bukan pula murni hilir, melainkan serong di antara keduanya.',
        },
        {
          objek: 'pantaiMendaratMiring', judul: 'Mendarat Serong 5 Langkah',
          teks: 'Berapa jauh perahu meluncur? Gunakan jurus siku: 4 × 4 = 16 dan 3 × 3 = 9, lalu 16 + 9 = 25 yang akarnya 5. Luncuran perahu tercatat 5 langkah serong — segitiga siku 3-4-5 kini hidup di air! Nelayan pintar membaca paduan ini sejak awal; kalau ingin mendarat tepat seberang, ia mendayung serong ke hulu supaya dorongan arus menyetel jalannya kembali ke pantai tujuan.',
        },
        {
          objek: 'papanHitungPaduan', judul: 'Papan Paduan Dua Panah',
          teks: 'Di dermaga berdiri papan batu bergambar dua panah bersatu menjadi satu. Petunjuknya: panah paduan ditarik dari ekor panah pertama menuju kepala panah kedua, persis jurus menyambung di lorong kemarin. Hitungan itu hanya alat bantu; yang terpenting adalah memahami bahwa setiap perahu di sungai membawa dua kekuatan, dan hasil akhirnya selalu satu panah baru yang bisa dihitung.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Perahu Ternyata Menyusun Dua Panah!',
          teks: 'Dayung menekan tegak 4, arus mendorong hilir 3, dan perahu meluncur serong 5. Owalah, ternyata begini toh — menyeberang sungai hanyalah menyambung dua panah yang bekerja bersama pada satu badan perahu. Mudah, bukan?',
        },
      ],
    },

    'p3-057': {
      tema: 'alunKotaBurung',
      npc: { glif: '2,3,4', ucap: ['Lorong, kamar,', 'lantai!'] },
      stasiun: [
        {
          objek: 'petaKotaDariAtas', judul: 'Kota yang Dilihat dari Atas',
          teks: 'Malam di alun kota gunung, lampu-lampu menyala membentuk petak-petak lurus seperti kisi raksasa. Dari kejauhan, seekor burung memandang kota dari atas: dari sana hanya terbaca dua arah, ke kanan dan ke maju. Peta kota di kertas memang cukup dua angka, tetapi burung tahu lebih banyak — kota yang sesungguhnya punya lorong, jendela, dan atap bertingkat.',
        },
        {
          objek: 'menaraTigaLantai', judul: 'Hotel Bertingkat di Pojok Kota',
          teks: 'Di pojok kisi lampu berdiri hotel bertingkat dengan lorong dan kamar di tiap lantai. Petugasnya menyebut alamat kamar dengan tiga angka: lorong ke-2, kamar ke-3, lantai ke-4. Dua angka pertama sudah bisa menemukan kamar di lantai mana pun, tetapi tanpa angka ketiga, koper tamu bisa tersesat naik-turun tangga sepanjang malam. Tiga angka, satu alamat yang tak mungkin salah.',
        },
        {
          objek: 'kartuAlamatTigaAngka', judul: 'Kartu Alamat (2, 3, 4)',
          teks: 'Sebut alamatnya berurutan seperti berhitung tangga: masuk lorong 2, jalan ke kamar 3, lalu naik lift ke lantai 4 — tertulis ringkas (2, 3, 4). Begitu pula burung yang terbang dari patok kota: ke kanan 2 petak, ke maju 3 petak, lalu mengepak naik 4 tingkat menuju jendela temannya. Tiga angka, tiga langkah, satu tempat berhenti yang pasti.',
        },
        {
          objek: 'burungTerbangAlamat', judul: 'Dunia Nyata Tiga Dimensi',
          teks: 'Papan penutup menggambarkan kubus dengan tiga panah tegak lurus dari satu patok: satu ke kanan, satu ke maju, satu ke atas. Pesannya sederhana: dunia tempat kita berdiri tidak bisa dijepit dua angka saja — panjang, lebar, dan tinggi harus disebut bersamaan. Sejak malam itu, setiap lampu kota terlihat seperti titik alamat yang menunggu dibaca tiga angkanya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Alamat Kota Ternyata Butuh Tiga Angka!',
          teks: 'Lorong 2, kamar 3, lantai 4 — tiga angka kecil menuntun koper dan burung sampai jendela yang tepat. Owalah, ternyata begini toh — alamat di ruang hanyalah alamat di kertas yang ditambah satu angka naik. Mudah, bukan?',
        },
      ],
    },

    'p3-058': {
      tema: 'menaraTanggaTiga',
      npc: { glif: '2 2 1', ucap: ['Tiga langkah', 'satu jarak!'] },
      stasiun: [
        {
          objek: 'tanggaTigaArahMenara', judul: 'Tangga Tiga Arah di Menara',
          teks: 'Senja di menara sarang gunung, anak tangganya unik: naik sambil menyamping, lalu berbelok ke depan sebelum sampai teras. Penjaga mencatat setiap kunjungan: maju 2 anak tangga, menyamping 2, lalu naik 1. Tiga angka itu terdengar panjang, tetapi penjaga berbisik: jarak lurusnya ternyata lebih pendek dari yang siapa pun sangka.',
        },
        {
          objek: 'liftMenaraTegak', judul: 'Lift yang Selalu Lurus',
          teks: 'Di sisi lain menara berdiri lift kecil yang hanya bergerak lurus dari dasar ke teras, tanpa menyamping, tanpa berbelok. Dari luar, lintasan lift dan lintasan tangga tampak berbeda jauh; dari dalam, keduanya berakhir di tempat yang sama. Di antara dua titik itu ada banyak jalan, tetapi jarak lurusnya hanya satu — dan jarak itulah yang dicari jurus pengukur ruang.',
        },
        {
          objek: 'papanJarakMiringTiga', judul: 'Menghitung Jarak Lurus',
          teks: 'Sekarang buktikan dengan hitungan. Maju 2 dan menyamping 2 dulu membentuk lantai siku, miringnya 2 × 2 = 4 dan 2 × 2 = 4, jumlahnya 8. Lalu naik 1 menyumbang 1 × 1 = 1, sehingga 4 + 4 + 1 = 9, dan akar 9 tepat 3. Tiga langkah tangga — maju 2, samping 2, naik 1 — panah lurusnya hanya 3! Jarak di ruang memang dihitung tiga arah sekaligus, lalu diambil akarnya.',
        },
        {
          objek: 'lintasanTerbangLurus', judul: 'Jalur Terbang Burung',
          teks: 'Seekor burung membuktikannya tanpa tangga: ia melepaskan diri dari dasar menara dan terbang lurus ke teras, menyibak udara hanya 3 satuan panjang. Pendaki yang tadi menghitung 2, 2, dan 1 kini tersenyum — jalur burung dan hitungannya berjumpa di angka yang sama. Mata penjuru ini perlahan terbuka: setiap jarak di ruang menyembunyikan tiga langkah yang bisa dihitung.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tiga Langkah Ternyata Satu Jarak Lurus!',
          teks: 'Maju 2, menyamping 2, naik 1, dan jarak lurusnya dijawab 4 + 4 + 1 = 9 yang akarnya 3 — persis jalur terbang burung. Owalah, ternyata begini toh — jarak di ruang hanyalah jurus segitiga siku lama yang ditambah satu sumbu naik. Mudah, bukan?',
        },
      ],
    },

    'p3-059': {
      tema: 'galeriTigaPandangan',
      npc: { glif: '3 foto', ucap: ['Depan, atas,', 'samping!'] },
      stasiun: [
        {
          objek: 'susunKubusMeja', judul: 'Empat Kubus di Meja Galeri',
          teks: 'Siang di galeri gunung yang sejuk, empat kubus kayu tersusun rapi di meja batu: satu kubus dasar, satu menyamping di kanannya, satu menyusur ke belakangnya, dan satu lagi bertumpuk di atas kubus dasar. Dari dekat, bentuknya jelas sekali. Tetapi pengelola galeri menutupnya dengan kain dan hanya menggantung tiga foto datar: pandangan depan, pandangan atas, dan pandangan samping.',
        },
        {
          objek: 'fotoDepanBentukL', judul: 'Foto Depan: Huruf L',
          teks: 'Foto pertama menampilkan huruf L dari tiga kotak: dua kotak berbaris di lantai, satu kotak bertengger di atas kotak kiri. Kubus yang menyusur ke belakang tak terlihat dari depan, sebab ia bersembunyi persis di belakang kubus dasar. Pandangan depan memang jujur, tetapi ia hanya bercerita tentang yang berhadapan dengannya.',
        },
        {
          objek: 'fotoAtasBentukSudut', judul: 'Foto Atas: Sudut Tiga Kotak',
          teks: 'Foto dari atas menampakkan tiga kotak membentuk sudut siku: satu pojok dasar, satu menyamping ke kanan, satu menyusur ke belakang. Kubus yang bertumpuk tak terlihat sama sekali, sebab ia tertutup atap kubus dasarnya. Pandangan atas jujur pada susunan lantainya, tetapi buta terhadap ketinggian — foto ini tak bisa membantu menemukan kubus yang naik ke atas.',
        },
        {
          objek: 'fotoSampingBentukSudut', judul: 'Foto Samping dan Kubus Tersembunyi',
          teks: 'Foto terakhir dari samping kembali menampilkan tiga kotak bersudut, hanya berputar arahnya. Coba hitung ulang: tiga foto, masing-masing 3 kotak, sedangkan kubus asli berjumlah 4 — setiap foto selalu menyembunyikan satu kubus di balik yang lain. Gabungkan ketiga foto di kepala, maka susunan utuh empat kubus terbongkar tanpa perlu membuka kainnya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tiga Foto Ternyata Cukup Membongkar Bentuk!',
          teks: 'Depan huruf L, atas sudut tiga kotak, samping sudut yang berputar — tiga pandangan datar menyimpan satu bentuk utuh empat kubus. Owalah, ternyata begini toh — membaca bentuk tiga dimensi hanyalah menggabungkan tiga foto rahasianya. Mudah, bukan?',
        },
      ],
    },

    'p3-060': {
      tema: 'puncakLintasLembah',
      npc: { glif: 'lembah!', ucap: ['Lima misi', 'menyala!'] },
      stasiun: [
        {
          objek: 'limaPapanMisiPanah', judul: 'Puncak Lintas Lembah',
          teks: 'Malam di puncak gunung, lima papan misi menyala berjajar menghadap lembah yang sunyi. Setiap papan menyimpan satu soal panah: arah, pintas, sambungan, alamat kisi, dan jarak ruang. Seluruh ilmu penjuru vektor sudah kau kumpulkan sejak patok dua anak di padang pagi — kini saatnya membuktikannya sekali jalan di ketinggian.',
        },
        {
          objek: 'papanMisiPanahArah', judul: 'Misi Satu dan Dua: Arah dan Pintas',
          teks: 'Misi satu: dua anak melangkah 5 ke timur dan 5 ke barat — berapa jarak keduanya? Jawabnya 5 + 5 = 10, arah berlawanan memang melebar. Misi dua: jalan sekolah maju 4 lalu belok 3 — berapa panah pintasnya? Jurus siku menjawab 16 + 9 = 25 yang akarnya 5. Dua papan menyala penuh, tiga misi lagi berkedip menunggu di sampingnya.',
        },
        {
          objek: 'papanMisiPanahSambung', judul: 'Misi Tiga dan Empat: Sambung dan Kisi',
          teks: 'Misi tiga: maju 3 lalu mundur 3 — di mana kakimu berhenti? Tepat di patok semula, sebab 3 + (−3) = 0. Misi empat: kartu kisi menuliskan (3, 2) — ke mana bendera tertancap? Kanan 3 kotak, naik 2 kotak, dan ingat: menukar urutannya berarti memindahkan tujuannya. Empat papan kini terang benderang menatap lembah.',
        },
        {
          objek: 'gerbangJuaraLintas', judul: 'Misi Lima dan Gerbang Juara',
          teks: 'Misi lima menanti di papan tertinggi: tangga menara maju 2, menyamping 2, naik 1 — berapa jarak lurusnya? 4 + 4 + 1 = 9, akarnya 3, persis jalur terbang burung. Lima papan menyala penuh dan gerbang batu juara terbuka menghadap lembah; tidak ada hadiah tersembunyi di baliknya, hanya kepuasan pendaki yang kini membaca seluruh lembah sebagai kumpulan panah yang tertata.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kamu Penakluk Lintas Lembah!',
          teks: 'Arah 10, pintas 5, sambungan 0, kisi (3, 2), dan jarak ruang 3 — lima misi panah selesai dengan hitungan yang bisa dicek ulang siapa pun. Hitungan itu hanya alat, tetapi alat yang setia menuntun langkah. Owalah, ternyata begini toh — vektor dan ruang hanyalah panah dan alamat yang sabar menunggu untuk dibaca. Mudah, bukan?',
        },
      ],
    },
    'p3-061': {
      tema: 'lorongLangkahSetengah',
      npc: { glif: 'setengah!', ucap: ['Langkah', 'setengah!'] },
      stasiun: [
        {
          objek: 'tembokCahayaSetengah', judul: 'Tembok Cahaya Sejauh Satu',
          teks: 'Pagi menyorot lorong berlantai batu, dan di ujungnya berdiri tembok cahaya berjarak tepat satu langkah penuh. Seorang penjaga lorong tersenyum memberi tantangan aneh: berjalanlah menuju tembok itu, tetapi setiap langkah hanya boleh menempuh setengah dari sisa jarak. Langkah pertama pun diambil, dan kakinya mendarat di tanda setengah — tembok masih setengah langkah di depan, tersenyum sabar menunggu.',
        },
        {
          objek: 'papanJejakLangkah', judul: 'Papan Jejak: 1/2, 1/4, 1/8',
          teks: 'Di sepanjang lorong tergantung papan-papan kayu yang mencatat jejak setiap langkah. Langkah pertama 1/2, langkah kedua 1/4, lalu 1/8, kemudian 1/16 — setiap langkah baru selalu setengah dari sisa jarak sebelumnya. Papan-papan itu membentangkan sebuah barisan yang tak pernah habis, dan tampak jelas pada semua papan itu: tidak satu pun langkah yang berhasil melewati tembok cahaya.',
        },
        {
          objek: 'kertasSisaJarang', judul: 'Sisa yang Makin Tipis',
          teks: 'Penjaga lorong mengajak menghitung bersama di depan papan kesepuluh. Setelah sepuluh langkah, jarak yang tersisa tinggal 1/1024 — lebih tipis daripada selembar kertas, nyaris tak terlihat oleh mata. Namun berapa pun langkah diambil lagi, sisa itu hanya makin mengecil tanpa pernah habis. Hitungan itu hanya alat untuk membaca jalan; alat itu berkata total langkah menuju satu, berdiri rapat di bawah angka 1 tanpa pernah menempel padanya.',
        },
        {
          objek: 'garisLantaiTotal', judul: 'Garis Lantai Menjumlah',
          teks: 'Lantai lorong ternyata juga bercerita; garis-garis kapur menandai tempat kakinya berhenti setiap kali melangkah. Tanda pertama di 0,5, tanda kedua di 0,75, tanda ketiga di 0,875, lalu 0,9375 — setiap tanda menjumlah seluruh langkah yang sudah ditempuh. Semua tanda itu berbaris rapi mendekati angka 1 di ujung lorong, tapi tidak ada satu pun yang menindih angka itu. Jumlah langkah naik terus, makin rapat ke satu, dan tak pernah melompat melewatinya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Berjalan Tanpa Pernah Sampai!',
          teks: 'Langkah 1/2, 1/4, 1/8 — sepuluh langkah sudah ditempuh dan sisanya cuma seperseribu lebih sedikit, lebih tipis dari kertas. Jalan terasa penuh langkah tanpa akhir, padahal totalnya tak pernah melewati satu. Owalah, ternyata begini toh — menuju satu boleh selamanya, asalkan tak pernah melompatinya. Mudah, bukan?',
        },
      ],
    },
    'p3-062': {
      tema: 'ladangSembilanMenempel',
      npc: { glif: '9-9-9', ucap: ['Sembilan', 'menempel!'] },
      stasiun: [
        {
          objek: 'tonggakSatuCahaya', judul: 'Tonggak Satu dan Cahaya 0,9',
          teks: 'Siang terang menyinari ladang lebar dengan sebuah tonggak batu di tengahnya, tertulis angka 1 besar-besar. Di dekat tonggak itu berdiri sebuah cahaya kunang pertama pada tanda 0,9 — hanya sepersepuluh langkah dari tonggak. Kunang itu berkedip penuh semangat, seolah ingin terus merayap mendekat ke tonggak angka 1 di hadapannya.',
        },
        {
          objek: 'tigaPapanSembilan', judul: 'Tiga Papan Sembilan',
          teks: 'Di tepi ladang berdiri tiga papan kayu berjajar yang masing-masing membawa satu kabar. Papan pertama menuliskan 0,9, papan kedua 0,99, dan papan ketiga 0,999 — setiap papan menambahkan satu sembilan di ekornya. Tiga papan itu seperti tiga langkah kunang yang makin rapat ke tonggak, dan pembaca cerdas akan langsung menyadari polanya: sembilan berikutnya, berikutnya, dan terus menempel tanpa lelah.',
        },
        {
          objek: 'papanJarakMengecil', judul: 'Jarak yang Dibagi Sepuluh',
          teks: 'Papan keempat di ladang itu istimewa karena tidak menuliskan angka sembilan, melainkan jaraknya. Jarak 0,9 ke 1 adalah 0,1; jarak 0,99 ke 1 tinggal 0,01; jarak 0,999 ke 1 mungil 0,001 — setiap sembilan baru membagi jarak menjadi sepuluh kali lebih tipis. Jarak itu menyusut cepat seperti embun yang menguap di pagi hari, namun untuk sembilan yang berhingga jumlahnya, jarak itu tetap ada.',
        },
        {
          objek: 'lorongMenujuSatu', judul: 'Dekat Tanpa Melampaui',
          teks: 'Sore mulai jatuh di ladang, dan kunang itu masih merayap di antara tanda-tanda 0,999, 0,9999, 0,99999. Seberapa pun banyak sembilan yang ditulis, angkanya tetap berdiri di bawah 1 — dekat tanpa melampaui, rapat tanpa menyentuh. Hitungan itu hanya alat yang jujur; alat itu menunjukkan tujuan kunang adalah angka 1 itu sendiri, dan mengejarnya dengan pola sembilan adalah cara yang setia. Kunang tak pernah lewat, tapi arahnya tak pernah bohong.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Sembilan yang Tak Pernah Lewat!',
          teks: '0,9, 0,99, 0,999 — sembilan boleh menempel seratus kali, angkanya tetap di bawah 1, sementara jaraknya terus dibagi sepuluh sampai nyaris tak terasa. Menyentuh 1 memang bukan jalannya, tapi menuju 1 adalah segenap hidupnya. Owalah, ternyata begini toh — dekat itu punya seni, dan sembilan menguasainya. Mudah, bukan?',
        },
      ],
    },
    'p3-063': {
      tema: 'stasiunKeretaNilai',
      npc: { glif: 'ke 3', ucap: ['Ke mana', 'menuju?'] },
      stasiun: [
        {
          objek: 'keretaMenujuPeron', judul: 'Kereta Menuju Peron',
          teks: 'Senja menghangatkan sebuah stasiun kecil tempat kereta mainan menggelinding di atas rel lurus. Seorang pelayan stasiun menuang teh lalu bertanya dengan nada bermain: bila kotak persneling digeser mendekati angka 2, ke mana hasil kotak lain yang selalu menambahkan satu akan bergerak? Kereta mulai melaju pelan, dan semua mata di peron menunggu jawaban yang sedang bergerak itu.',
        },
        {
          objek: 'papanJadwalDuaArah', judul: 'Papan Jadwal Dua Arah',
          teks: 'Papan jadwal stasiun menyala menampilkan dua baris angka yang saling menghadap. Dari kiri: saat persneling di 1,9 hasilnya 2,9; saat di 1,99 hasilnya 2,99 — makin rapat ke 2 dari bawah. Dari kanan: saat persneling di 2,1 hasilnya 3,1; saat di 2,01 hasilnya 3,01 — makin rapat ke 2 dari atas. Dua baris itu seperti dua kereta yang datang dari arah berlawanan menuju peron yang sama.',
        },
        {
          objek: 'titikSepakatTiga', judul: 'Dua Arah Sepakat di Tiga',
          teks: 'Kereta dari kiri membawa hasil 2,9 lalu 2,99 yang makin menempel di 3 dari bawah. Kereta dari kanan membawa hasil 3,1 lalu 3,01 yang makin menempel di 3 dari atas. Keduanya tak pernah tiba di persneling tepat 2, tetapi arah gerak keduanya sepakat menunjuk tempat yang sama: angka 3. Dua arah, satu tujuan, dan tak ada satu pun langkah yang bohong.',
        },
        {
          objek: 'pintuArahCukup', judul: 'Arah Cukup, Tak Perlu Tiba',
          teks: 'Pelayan stasiun menutup buku jadwalnya dan tersenyum memberi pelajaran terakhir malam itu. Limit tak pernah memaksa persneling benar-benar menyentuh angka 2; ia hanya membaca arah gerak hasil dari kedua sisi. Hitungan itu hanya alat yang menunjukkan tujuan, dan bila dua arah bersepakat, jawaban itu dipercaya. Kereta pun berhenti tepat di bawah lampu peron, membawa pulang satu ilmu yang sederhana namun kuat.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Limit Tak Pernah Memaksa Tiba!',
          teks: 'Dari kiri 2,9 lalu 2,99, dari kanan 3,1 lalu 3,01 — dua arah bergerak dan bersepakat di angka 3 tanpa persneling pernah menyentuh 2. Limit hanyalah seni membaca arah, bukan kewajiban tiba. Owalah, ternyata begini toh — jawaban bisa ditemukan dari geraknya, bukan dari kedatangannya. Mudah, bukan?',
        },
      ],
    },
    'p3-064': {
      tema: 'kebunAsimtot',
      npc: { glif: 'y=1/x', ucap: ['Dekat', 'tanpa sentuh!'] },
      stasiun: [
        {
          objek: 'kurvaBatuKebun', judul: 'Jalan Batu yang Menjauh',
          teks: 'Pagi di kebun taman membentangkan jalan batu melengkung yang mulai dari gerbang dan merayap menjauh. Seorang tukang kebun tua mengajak berjalan sambil bercerita: jalan ini mengikuti hitungan yang membagi satu dengan setiap langkah dari gerbang. Semakin jauh kaki melangkah dari gerbang, jalan batu itu makin rapat menempel ke pagar lurus yang membelah kebun di kejauhan.',
        },
        {
          objek: 'papanNilaiKebalikan', judul: 'Papan Nilai 1/x',
          teks: 'Di pinggir jalan batu berdiri papan kayu dengan tabel nilai yang tercatat rapi. Langkah 1 dari gerbang memberi tinggi 1; langkah 2 memberi 0,5; langkah 10 memberi 0,1; langkah 100 memberi 0,01 — makin jauh dari gerbang, makin rendah jalan itu mendekati tanah. Angka-angka itu berbaris turun dengan setia, mengikuti hitungan membagi satu dengan langkah, tanpa satu pun yang menyalahi aturan.',
        },
        {
          objek: 'pagarAsimtot', judul: 'Nama Garis Itu Asimtot',
          teks: 'Tukang kebun berhenti di depan pagar lurus yang membentang di kejauhan lalu menepuknya pelan. Jalan batu ini bisa berjalan sampai kapan pun, katanya, dan makin rapat ke pagar — tetapi tak akan pernah bersentuhan dengannya. Orang-orang pandai memberi nama pada persahabatan semacam itu: garis yang dikejar makin rapat tapi tak pernah tersentuh itu bernama asimtot.',
        },
        {
          objek: 'bungaDuaSisiPagar', judul: 'Sahabat di Dua Sisi Pagar',
          teks: 'Di dua sisi pagar kebun tumbuh deretan bunga yang sama rapatnya menghadap pagar. Jalan di sisi ini turun dari tinggi menuju tanah, dan di sisi seberang ada ceritanya yang lain yang naik dari kejauhan. Dekat tanpa menyentuh, setia tanpa berjabat — seperti dua sahabat yang selalu berjalan berdampingan di dua sisi tembok. Hitungan 1/x terbukti bisa dipercaya di kedua sisi: angkanya turun teratur, tak pernah menyentuh nol, dan tak pernah berbohong.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Garis yang Tak Pernah Tersentuh!',
          teks: 'Langkah 1, 2, 10, 100 — jalan batu turun dari 1 ke 0,5, lalu 0,1, lalu 0,01, makin rapat ke pagar tanpa pernah menempel. Persahabatan makin dekat tanpa tersentuh itu punya nama: asimtot. Owalah, ternyata begini toh — ada garis yang dirancang untuk selalu di dekat mata, tak pernah di tangan. Mudah, bukan?',
        },
      ],
    },
    'p3-065': {
      tema: 'bengkelTaliHalus',
      npc: { glif: 'potong!', ucap: ['Makin halus', 'jumlah tetap!'] },
      stasiun: [
        {
          objek: 'taliSatuMeter', judul: 'Tali Satu Meter di Meja',
          teks: 'Siang menerangi bengkel penjahit kecil dengan meja kayu di tengahnya. Terbentang sebuah tali merah sepanjang satu meter penuh, dan penjahit tua itu menggulung lengan bajunya dengan senyum lebar. Hari ini, katanya, kita akan memotong tali ini berkali-kali dan membuat keajaiban kecil: potongannya makin kecil, tetapi jumlahnya tak akan bergeser sejengkal pun.',
        },
        {
          objek: 'guntingEmpatPotong', judul: 'Gunting Memotong Dua Kali',
          teks: 'Gunting pertama membelah tali menjadi dua potong, masing-masing setengah meter. Gunting kedua membagi lagi menjadi empat potong, masing-masing seperempat meter; gunting berikutnya membuat delapan potong, masing-masing 0,125 meter. Potongan-potongan itu terbaris di meja seperti barisan kue yang makin mungil, dan masing-masing potongan adalah hasil membagi satu meter sama rata.',
        },
        {
          objek: 'mistarTotalSatu', judul: 'Susun Kembali di Mistar',
          teks: 'Penjahit tua mengajak menyusun seluruh potongan kembali di atas mistar panjang yang menempel di meja. Dua potong 0,5 tersusun jadi 1; empat potong 0,25 tersusun jadi 1; delapan potong 0,125 tersusun tetap 1 — jumlahnya persis satu meter, tak kurang sedikit pun. Potongan makin kecil dan makin banyak, tetapi bila disusun utuh kembali, mistar tak pernah melaporkan kehilangan apa pun.',
        },
        {
          objek: 'gulunganBenangHalus', judul: 'Benang Makin Halus',
          teks: 'Di sudut bengkel tergantung gulungan benang sehalus rambut, buatan penjahit yang memotong tali lebih jauh lagi dari biasanya. Enam belas potong 0,0625 tersusun kembali tetap satu meter; potong terus dan potongan jadi serbuk panjang, namun jumlahnya masih menempel di angka satu. Makin halus potongan, makin mulus totalnya — dan pintu ke ilmu luas di gunung nanti terbuka dari kebiasaan memotong yang sabar ini.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Dipotong Tak Pernah Berkurang!',
          teks: 'Dua potong 0,5, empat potong 0,25, delapan potong 0,125 — disusun kembali semuanya tetap satu meter persis. Potongan makin halus, jumlah tak bergeser walau sehelai pun. Owalah, ternyata begini toh — membagi halus bukan berarti mengurangi, ia hanya menghaluskan. Mudah, bukan?',
        },
      ],
    },
    'p3-066': {
      tema: 'bukitTanggaLandai',
      npc: { glif: '0,25', ucap: ['Tangga', 'menyamar!'] },
      stasiun: [
        {
          objek: 'tanggaDuaAnak', judul: 'Tangga Dua Anak',
          teks: 'Sore di bukit batu membentangkan tangga kayu tua dengan dua anak tangga raksasa. Bukit ini tingginya satu dan panjangnya satu, sehingga setiap anak tangga harus mengangkat kaki setinggi 0,5 — berat dan menantang. Pendaki muda yang pertama mencobanya mengeluh pelan, dan tangga tua itu berderit seolah ikut mengeluh bersama.',
        },
        {
          objek: 'tanggaEmpatAnak', judul: 'Tangga Empat Anak',
          teks: 'Tukang kayu desa datang membawa denah baru: tangga yang sama dibagi menjadi empat anak tangga. Kini setiap anak tangga hanya naik 0,25 — separuh dari sebelumnya, dan langkah kaki terasa jauh lebih ringan. Pendaki yang sama menaikinya sambil tersenyum, karena bukit yang sama kini terasa lebih lembut hanya karena tangganya makin banyak.',
        },
        {
          objek: 'lerengMulusBatu', judul: 'Lereng Batu Mulus',
          teks: 'Di sebelah tangga berdiri lereng batu mulus tanpa satu pun undakan, dan tukang kayu menantang mata siapa pun: coba bedakan dari kejauhan. Tangga sepuluh anak, masing-masing naik 0,1, terlihat nyaris sama dengan lereng mulus itu — garis batunya rapat dan landai. Dari jarak jauh mata tak lagi mampu membedakan undakan; hanya hitungan yang tahu bahwa di sana masih ada 0,1 yang tersembunyi di setiap langkah.',
        },
        {
          objek: 'gerbangKalkulusBukit', judul: 'Gerbang Lereng Kalkulus',
          teks: 'Di puncak bukit terbentang gerbang batu dengan ukiran tangga yang bertahap melebur menjadi garis landai. Tukang kayu menutup kisahnya dengan pesan yang tenang: bila undakan dibagi terus tanpa lelah, tangga menyamar jadi lereng mulus dan tak terbedakan lagi. Hitungan itu hanya alat yang menjaga pembagian tetap jujur, dan di balik gerbang inilah lereng kalkulus menanti para pendaki yang penasaran.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tangga Menyamar Jadi Landai!',
          teks: 'Dua anak naik 0,5, empat anak naik 0,25, sepuluh anak naik 0,1 — makin banyak undakan, makin tak terbedakan dari lereng mulus. Bukit yang sama bisa terasa berat atau lembut, tergantung siapa yang membagi undakannya. Owalah, ternyata begini toh — tangga dan lereng hanyalah saudara yang dipisahkan hitungan. Mudah, bukan?',
        },
      ],
    },
    'p3-067': {
      tema: 'lintasanKilasLari',
      npc: { glif: '2 m/s', ucap: ['Kilas', 'makin singkat!'] },
      stasiun: [
        {
          objek: 'lintasanRobotPelari', judul: 'Robot Pelari Sepuluh Meter',
          teks: 'Pagi cerah menyambut lintasan lari putih dengan papan skor di sisinya. Sebuah robot pelari kecil berdiri di garis start, dan wasit lintasan mengumumkan rencananya: robot ini menempuh sepuluh meter dalam lima detik penuh. Sepuluh dibagi lima menghasilkan dua, sehingga laju rata-ratanya dua meter tiap detik — angka pertama yang tertulis di papan skor.',
        },
        {
          objek: 'papanJendelaDetik', judul: 'Jendela Satu Detik',
          teks: 'Wasit memasang stopwatch dan menutup jendela pengamatan selebar satu detik. Dalam jendela itu robot melaju dua meter, dan dua dibagi satu tetap menghasilkan 2 m tiap detik. Papan skor menambahkan baris kedua yang persis sama dengan baris pertama, dan penonton mulai bergumam bahwa angka ini terlihat memang setia.',
        },
        {
          objek: 'stopwatchKilas', judul: 'Stopwatch Sepuluh Kilas',
          teks: 'Lalu wasit memperpendek jendela pengamatan hingga selebar kilas mata, 0,1 detik. Robot hanya menempuh 0,2 meter dalam jendela sekecil itu, tetapi 0,2 dibagi 0,1 tetap menghasilkan dua. Makin singkat jendela, makin jujur jawabannya — laju itu bukan sekadar rata-rata jauh, melainkan sesuatu yang hidup di setiap kilas. Papan skor kini memuat tiga baris dengan angka yang sama persis: dua.',
        },
        {
          objek: 'papanLajuSesaat', judul: 'Laju Sesaat',
          teks: 'Di akhir lintasan, wasit menutup pengumumannya dengan sorakan kecil penonton. Kelak di jalan yang menurun dan berubah-ubah kecepatan, jendela yang makin pendek inilah yang menangkap laju sesaat — kecepatan yang berlaku tepat di satu titik. Robot berhenti di garis akhir dengan angka dua yang setia mengikutinya dari start sampai selesai.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Jendela Kecil Menangkap Laju!',
          teks: 'Jendela lima detik, satu detik, lalu 0,1 detik — hasilnya tetap 2 m tiap detik, makin singkat makin jujur. Laju sesaat ternyata bisa ditangkap dengan memperkecil jendela pengamatan sampai selebar kilas. Owalah, ternyata begini toh — kecepatan sejati tinggal di dalam sekejap mata. Mudah, bukan?',
        },
      ],
    },
    'p3-068': {
      tema: 'telagaBijiMenipis',
      npc: { glif: '1/1000', ucap: ['Biji', 'menipis!'] },
      stasiun: [
        {
          objek: 'telagaBijiPertama', judul: 'Biji Pertama Setengah',
          teks: 'Malam menyelimuti telaga tenang yang memantulkan bulan purnama seperti cermin. Seekor burung hitam kecil hinggap di batang kayu miring sambil memegang butir biji pertama, lalu melemparkannya ke permukaan air. Satu biji terbagi dua kata telaga: hasilnya 0,5 — separuh telaga beriak lembut, dan angka pertama malam ini tercatat di permukaan yang berkilau.',
        },
        {
          objek: 'papanPembagiRaksasa', judul: 'Papan Pembagi Raksasa',
          teks: 'Di tepi telaga berdiri papan batu dengan daftar pembagi yang makin raksasa ke bawah. Satu dibagi sepuluh menghasilkan 0,1; satu dibagi seratus menghasilkan 0,01 — pembagi makin besar, hasil makin mungil. Daftar itu seperti tangga turun menuju kecil yang tak berujung, dan setiap undakannya membawa biji burung menjadi lebih halus dari sebelumnya.',
        },
        {
          objek: 'bijiSerbukHalus', judul: 'Serbuk Sebesar 0,001',
          teks: 'Burung itu kemudian menjatuhkan biji yang sudah terbagi seribu kali lipat kehalusannya. Satu dibagi seribu menghasilkan 0,001 — serbuk sebesar debu yang nyaris tak terlihat di permukaan air, hanya meninggalkan lingkaran riak paling mungil. Mata harus berjongkok dekat permukaan untuk mencarinya, dan itu pun butuh kesabaran ekstra dari siapa pun yang penasaran.',
        },
        {
          objek: 'permukaanAirTenang', judul: 'Menuju Nol Tanpa Menyentuh',
          teks: 'Permukaan telaga kembali tenang, dan bulan di dalamnya tampak jelas sambil menunggu pertanyaan terakhir. Berapa pun raksasa pembaginya, hasil 1/n tetap ada — makin menempel di nol, tapi tak pernah benar-benar nol selama pembaginya masih berhingga. Riak mungil itu selalu muncul, sekecil apa pun; nol hanyalah arah menuju, bukan tempat tiba.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kecil yang Tak Pernah Tiba di Nol!',
          teks: '0,5, lalu 0,1, lalu 0,01, lalu 0,001 — biji burung menipis seperti embun dan nyaris menghilang, tetapi riaknya selalu ada. Pembagi boleh jadi raksasa; hasilnya menempel di nol tanpa pernah menyentuhnya. Owalah, ternyata begini toh — menuju nol itu perjalanan yang setia, bukan titik berhenti. Mudah, bukan?',
        },
      ],
    },
    'p3-069': {
      tema: 'bengkelPoligonBulat',
      npc: { glif: '6-12-96', ucap: ['Makin', 'bulat!'] },
      stasiun: [
        {
          objek: 'rodaSegiEnam', judul: 'Roda Segi Enam Tukang',
          teks: 'Siang di bengkel tukang roda diwarnai serbuk kayu yang melayang di sekitar meja kerja. Di dinding tergantung roda kayu segi enam yang berputar pelan di atas roda gila — roda pertama yang dibuat tukang untuk meniru lingkaran. Dengan lingkaran berdiameter satu sebagai pembanding, keliling roda segi enam ini terhitung 3,0, sedikit kerdil dibanding lingkaran yang kelilingnya sekitar 3,14.',
        },
        {
          objek: 'rodaSegiDuaBelas', judul: 'Roda Segi Dua Belas',
          teks: 'Tukang roda menggantung karya keduanya: roda segi dua belas dengan sudut-sudut yang jauh lebih lembut. Keliling roda ini terhitung 3,11 — sudah menempel dekat ke 3,14 milik lingkaran. Sudut tajam segi enam kini terbagi dua jadi kemiringan kecil, dan roda itu berputar di roda gila dengan goyangan yang makin tak terasa.',
        },
        {
          objek: 'papanKelilingPoligon', judul: 'Papan Keliling Archimedes',
          teks: 'Di meja kerja terbentang papan ukir dengan daftar keliling yang makin panjang ke bawah. Segi enam 3,0; segi dua belas 3,11; lalu tukang menceritakan Archimedes yang memotong sudut terus-menerus sampai segi 96 dan menangkap angka 3,14 — dua angka milik lingkaran, hanya dengan geometri dan kesabaran. Tidak ada kalkulator di zamannya; yang ada hanya penggaris, poligon, dan keberanian membagi sudut tanpa lelah.',
        },
        {
          objek: 'rodaLingkaranSempurna', judul: 'Lingkaran Poligon Sempurna',
          teks: 'Di rak paling atas bengkel tersimpan roda lingkaran sempurna yang berputar paling mulus dari semuanya. Tukang roda mengetuknya pelan dan berbisik: bayangkan poligon yang sisi-sisinya dibagi terus tanpa henti — itulah lingkaran, poligon dengan sisi yang tak berhingga. Makin banyak sisi, makin sempurna bentuknya, dan angka 3,14 yang ditangkap Archimedes adalah pemberian poligon yang sabar.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Lingkaran Ternyata Poligon Sabar!',
          teks: 'Segi enam 3,0, segi dua belas 3,11, segi 96 punya 3,14 — makin banyak sisi, makin dekat ke keliling lingkaran. Archimedes menangkap dua angka itu tanpa mesin, cukup dengan membagi sudut sampai lelah. Owalah, ternyata begini toh — lingkaran hanyalah poligon yang membagi sisi selamanya. Mudah, bukan?',
        },
      ],
    },
    'p3-070': {
      tema: 'puncakTepiMenuju',
      npc: { glif: 'menuju!', ucap: ['Lima misi', 'tepi gunung!'] },
      stasiun: [
        {
          objek: 'limaPapanMisiMenuju', judul: 'Lima Papan di Tepi Gunung',
          teks: 'Malam di puncak gunung membentangkan lima papan misi menyala berjajar di tepi tebing, menghadap lembah yang sunyi di bawahnya. Setiap papan menyimpan satu soal menuju: langkah setengah, sembilan menempel, pembagi raksasa, pagar asimtot, dan poligon berputar. Seluruh ilmu penjuru limit sudah kau kumpulkan dari lorong setengah sampai bengkel roda — kini saatnya membuktikannya sekali jalan di ketinggian.',
        },
        {
          objek: 'papanMisiLangkahSembilan', judul: 'Misi Satu dan Dua: Langkah dan Sembilan',
          teks: 'Misi satu menanyakan jejak langkah di lorong pagi itu: 1/2 lalu 1/4 lalu 1/8 — ke mana jumlahnya menuju? Jawabnya menuju satu, rapat di bawah angka 1 tanpa pernah melompatinya. Misi dua menanyakan kunang ladang: 0,9 lalu 0,99 lalu 0,999 menuju ke mana? Menuju 1 juga, dengan jarak yang selalu dibagi sepuluh di setiap sembilan. Dua papan menyala penuh, tiga misi lagi berkedip menunggu di sampingnya.',
        },
        {
          objek: 'papanMisiPembagiAsimtot', judul: 'Misi Tiga dan Empat: Pembagi dan Asimtot',
          teks: 'Misi tiga menghadirkan biji burung malam: satu dibagi seribu menghasilkan 0,001 — menuju ke mana? Menuju nol, menempel tanpa pernah menyentuh. Misi empat menghadirkan jalan batu kebun pagi: pada langkah seratus, tinggi 1/x tinggal 0,01, makin rapat ke pagar yang tak pernah tersentuh. Empat papan kini terang benderang menatap lembah, dan angin puncak membawa suara riak telaga dari jauh.',
        },
        {
          objek: 'gerbangJuaraMenuju', judul: 'Misi Lima dan Gerbang Juara',
          teks: 'Misi lima menanti di papan tertinggi: Archimedes membagi sudut lingkaran berdiameter satu sampai segi 96 — kelilingnya menangkap angka berapa? 3,14, dua angka milik lingkaran yang lahir dari kesabaran membagi. Lima papan menyala penuh dan gerbang batu juara terbuka menghadap lembah; tak ada harta di baliknya, hanya kepuasan pembaca arah yang kini melihat seluruh lembah sebagai kumpulan perjalanan menuju.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kamu Pembaca Arah Sejati!',
          teks: 'Menuju 1 dari langkah dan sembilan, menuju 0 dari pembagi, menuju pagar dari asimtot, menuju 3,14 dari poligon — lima misi selesai dengan hitungan yang bisa dicek ulang siapa pun. Hitungan itu hanya alat, tetapi alat yang setia menunjukkan arah tanpa pernah berbohong. Owalah, ternyata begini toh — limit hanyalah seni membaca tujuan dari jejak geraknya. Mudah, bukan?',
        },
      ],
    },
    'p3-071': {
      tema: 'tamanKeranAir',
      npc: { glif: 'deras!', ucap: ['Lajunya', 'berubah!'] },
      stasiun: [
        {
          objek: 'keranBergantiDeras', judul: 'Keran yang Mau Deras',
          teks: 'Pagi menyambut taman berumput hijau, dan di tengahnya berdiri sebuah keran tua yang siap melayani. Pengelola taman membuka keran itu pelan-pelan, lalu memanggil pengunjung untuk mengamati air yang mengalir ke dalam gelas tinggi di bawahnya. Air pertama turun tenang, lalu tiba-tiba deras memenuhi gelas, dan sebelum penuh kerannya dipelankan lagi. Pengelola tersenyum dan berkata bahwa gelas itu sedang bercerita, dan ceritanya bukan tentang air, melainkan tentang laju.',
        },
        {
          objek: 'gelasPengukurAir', judul: 'Gelas yang Naik Tak Sama',
          teks: 'Gelas pengukur di bawah keran memiliki garis-garis angka yang rapi, dan air di dalamnya naik dengan ritme yang aneh. Detik pertama permukaan air naik 3 cm, detik kedua naik 3 cm lagi, lalu keran dibuka penuh dan permukaan melonjak 6 cm dalam satu detik. Sesudah itu keran dipelankan sehingga air hanya naik 1 cm di detik keempat. Empat detik berlalu, dan gelas kini berisi 13 cm air yang laju naiknya tidak pernah sama.',
        },
        {
          objek: 'papanLajuTigaSaat', judul: 'Papan Laju 3, 3, 6, 1',
          teks: 'Di samping gelas berdiri sebuah papan kecil yang mencatat setiap laju detik tadi. Tulisannya berbaris jujur: 3, 3, 6, lalu 1 cm tiap detik — empat angka untuk satu gelas yang sama. Dari papan itu terbaca jelas bahwa laju perubahan bisa berubah-ubah, walau yang diukur tetap air yang sama. Pengelola taman menepuk papan itu dan berkata bahwa inilah kerja pengukur laju: mencatat seberapa cepat sesuatu berubah di setiap saat.',
        },
        {
          objek: 'jamDetikTaman', judul: 'Alat Baca di Tiap Saat',
          teks: 'Pengelola lalu mengeluarkan jam detik dari saku dan menempelkan pita kecil pada garis 6 cm gelas. Hitungan itu hanya alat, dan alat itu berkata: pada detik ketiga air naik 6 cm, pada detik keempat tinggal 1 cm — laju di setiap saat punya angkanya sendiri. Bila air tadi diambil lajunya, dan laju itu digambar pada papan, maka terbentuklah deret 3, 3, 6, 1 yang hidup. Gelas kini bukan sekadar gelas; dia adalah kurva yang bisa dibaca lajunya di titik mana pun.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Satu Gelas Punya Banyak Laju!',
          teks: 'Deras lalu pelan — empat detik tadi membuktikan bahwa satu gelas air bisa punya banyak laju sekaligus: 3, 3, 6, dan 1. Yang dibaca pengukur bukan airnya, melainkan seberapa cepat airnya berubah di setiap saat. Owalah, ternyata begini toh — turunan adalah alat baca laju di tiap titik, dan laju itu boleh berubah sesuka kerannya. Mudah, bukan?',
        },
      ],
    },
    'p3-072': {
      tema: 'jalanRayaKilometer',
      npc: { glif: '40-80', ucap: ['Rata-rata', 'sesaat!'] },
      stasiun: [
        {
          objek: 'papanKilometerEnam', judul: 'Papan 60 Kilometer',
          teks: 'Siang terik menyinari jalan raya yang lurus, dan sebuah papan batu besar berdiri di tepinya dengan angka 60 kilometer. Keluarga pendatang baru saja menempuh seluruh jalan dari papan nol sampai papan itu, dan waktunya tepat satu jam. Ayah memandang papan itu bangga, sementara anaknya menyipitkan mata pada speedometer mobil yang kini diam di angka nol. Sebuah pertanyaan muncul: kalau jaraknya 60 dan waktunya 1 jam, apakah mobil tadi benar-benar selalu melaju 60?',
        },
        {
          objek: 'speedometerBergetar', judul: 'Speedometer yang Bergetar',
          teks: 'Anak itu membuka catatan perjalanan dan membacanya pelan-pelan di depan ayahnya. Setengah jam pertama, jarum speedometer setia di angka 40 — mobil menempuh 20 kilometer. Setengah jam berikutnya, jarum berdiri di angka 80 — mobil menempuh 40 kilometer. Dua puluh ditambah empat puluh sama dengan 60 kilometer, tepat satu penuh, namun jarum itu tak pernah sekali pun berdiri di angka 60.',
        },
        {
          objek: 'duaMobilRata', judul: 'Dua Mobil, Rata-rata Sama',
          teks: 'Di pos jalan raya, mobil lain berhenti dan ceritanya lebih heboh lagi. Mobil itu melaju 30 pada setengah jam pertama, lalu menyambar 90 pada setengah jam kedua — dan tetap menempuh 15 ditambah 45, sama 60 kilometer dalam satu jam. Rata-ratanya sama persis dengan mobil keluarga, padahal sepanjang jalan keduanya tidak pernah melaju sama. Rata-rata 60 itu seperti selimut besar yang menutupi semua kecepatan di baliknya.',
        },
        {
          objek: 'jamPerjalananSatu', judul: 'Satu Jam, Dua Jawaban',
          teks: 'Ayah menutup percakapan itu dengan menunjuk dua alat yang berbeda di mobilnya. Hitungan itu hanya alat, dan alat pembagi 60 : 1 menjawab rata-rata, sedangkan jarum speedometer menjawab laju sesaat — keduanya jujur, hanya saja pertanyaannya berbeda. Rata-rata meratakan seluruh perjalanan menjadi satu angka tenang, sementara speedometer membaca tiap saat dengan getarnya sendiri. Dari 40 ke 80, dari 30 ke 90, semuanya bisa bersembunyi di balik satu angka 60 yang tenang.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Rata-rata Tak Bercerita Sesaat!',
          teks: '60 kilometer dalam 1 jam memang bernilai rata-rata 60, tapi jarum speedometer tahu lebih banyak cerita: 40, 80, bahkan 30 dan 90 bisa sembunyi di baliknya. Rata-rata adalah jawaban untuk satu jam penuh, sedangkan laju sesaat adalah jawaban untuk detik ini juga. Owalah, ternyata begini toh — dua pertanyaan berbeda memanggil dua alat berbeda, dan keduanya tak saling berbohong. Mudah, bukan?',
        },
      ],
    },
    'p3-073': {
      tema: 'galeriGarisSinggung',
      npc: { glif: 'menempel', ucap: ['Pas satu', 'titik!'] },
      stasiun: [
        {
          objek: 'kurvaBukitHijau', judul: 'Bukit Rumput Melengkung',
          teks: 'Pagi ini sebuah galeri alam membuka pintunya untuk kurva bukit rumput yang halus dan hijau. Pengelola galeri membawa sebuah papan kayu panjang dan menantang setiap pengunjung: menapakkan papan itu pada bukit tanpa membuatnya goyang atau melayang. Rumput melengkung anggun dari lembah naik ke puncak lalu turun lagi, dan tampaknya tak ada satu papan lurus yang bisa mengikuti seluruh lengkungnya. Tantangannya bukan mengikuti seluruh bukit, melainkan menempel pas di satu titik saja.',
        },
        {
          objek: 'penggarisMenempel', judul: 'Papan yang Menempel Pas',
          teks: 'Papan kayu itu pertama kali diletakkan di lereng landai, dan ajaibnya ia menempel sempurna tanpa goyang sedikit pun. Maju satu langkah sepanjang papan, naik satu langkah — kemiringannya jelas terbaca: satu. Papan itu tak melayang di ujungnya dan tak menusuk tanah, karena dia hanya menuntut satu titik tempat dia berdiri. Pengunjung yang mencoba menggoyangkannya selalu gagal, seolah papan itu lahir untuk titik itu.',
        },
        {
          objek: 'titikTapakCahaya', judul: 'Titik Tapak Bercahaya',
          teks: 'Papan dipindah ke puncak bukit, dan di situ ia tergeletak datar sepenuhnya — kemiringan nol, tak miring ke kiri tak ke kanan. Lalu ia dipindah ke lereng curam dekat lembah, dan kali ini maju satu langkah membuatnya naik dua — miring lebih tegak dari sebelumnya. Setiap titik tapak di kurva kini menyala seperti tanda kecil, menandai tempat papan memilih untuk berdiri. Satu kurva, banyak titik, dan setiap titik punya kemiringannya sendiri.',
        },
        {
          objek: 'papanKemiringanSatu', judul: 'Pengintip Kemiringan',
          teks: 'Pengelola galeri memasang papan tulis kecil di depan bukit dan menuliskan satu kalimat pendek. Garis yang menempel pas di satu titik kurva namanya garis singgung, dan kemiringannya adalah laju kurva di titik itu. Jadi membaca kurva tak perlu menunggu sampai akhir — cukup tempelkan garis singgung, dan kemiringannya berkata kurva sedang naik seberapa cepat. Hitungan itu hanya alat, dan alat ini menempel di satu titik lalu berbisik tentang seluruh arah kurva di sekitarnya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Papan Pengintip Kemiringan!',
          teks: 'Di lereng landai kemiringannya satu, di puncak nol, di lereng curam dua — dan semua itu dibaca dari satu papan yang hanya menempel di satu titik. Garis singgung memang pengintip paling jujur: ia tak mengklaim mengikuti seluruh bukit, ia cukup berdiri pas di satu tempat. Owalah, ternyata begini toh — kemiringan garis singgung di satu titik adalah turunan kurva di titik itu. Mudah, bukan?',
        },
      ],
    },
    'p3-074': {
      tema: 'bengkelMesinPangkat',
      npc: { glif: 'x2 ke 2x', ucap: ['Pangkat', 'turun satu!'] },
      stasiun: [
        {
          objek: 'mesinPangkatTurun', judul: 'Mesin Pangkat Turun',
          teks: 'Siang membakar atap seng sebuah bengkel tua yang kini menghadirkan mesin paling ramai. Mesin itu punya pintu masuk bertuliskan x2 dan pintu keluar bertuliskan 2x, dengan roda gigi berputar di antaranya. Aturannya ditulis besar di badan mesin: pangkat turun ke depan menjadi pengali, lalu pangkatnya turun satu. Jadi x2 yang pangkatnya dua mengirim dua ke depan dan menyisakan x — dan begitulah 2x lahir.',
        },
        {
          objek: 'bolaKuadratLompat', judul: 'Lompatan Bola Kuadrat',
          teks: 'Di samping mesin, sebuah bola kecil menggelinding di lintasan kotak-kotak yang bercerita tentang x2. Detik pertama bola telah menempuh 1 meter, detik kedua 4 meter, detik ketiga 9 meter — angka-angka kuadrat yang dikenal baik. Lompatannya makin besar: dari 1 ke 4 lompatannya 3, dari 4 ke 9 lompatannya 5. Bola itu makin kencang, dan mesin di sampingnya seperti ingin ikut menjelaskan seberapa kencang.',
        },
        {
          objek: 'rodaGigiGanjil', judul: 'Gigi Ganjil 3, 5, 7, 9',
          teks: 'Pemilik bengkel menempelkan roda gigi berlabel pada sisi lintasan, satu gigi untuk setiap lompatan bola. Gigi-gigi itu bertuliskan 3, 5, 7, 9 — seluruhnya ganjil, dan makin besar tanpa terkecuali. Sementara itu pintu keluar mesin yang menghitung laju sesaat menuliskan 2, 4, 6, 8, 10 — seluruhnya genap dan rapi. Dua keluarga angka berdiri bersebelahan: ganjil dari lompatan per detik, genap dari laju di tiap detik.',
        },
        {
          objek: 'papanAturanPangkat', judul: 'Ganjil Duduk di Antara Genap',
          teks: 'Di papan aturan bengkel, pemiliknya menggambar garis dan menuliskan rahasia yang membuat semua yang membacanya tersenyum. Lompatan 3 duduk tepat di antara laju 2 dan 4; lompatan 5 di antara 4 dan 6; lompatan 7 di antara 6 dan 8; dan lompatan 9 di antara 8 dan 10. Setiap ganjil ternyata duduk manis tepat di tengah dua genap bertetangganya — pola yang tak pernah meleset sekali pun. Mesin pangkat turun itu benar-benar setia: beri dia x2, dia balas 2x, dan seluruh deret ikut tertata.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Pangkat Turun dan Rahasia Ganjil!',
          teks: 'Pangkat turun ke depan, pangkat turun satu — x2 berubah menjadi 2x, dan semua angka ikut tertata: ganjil 3, 5, 7, 9 dari lompatan, genap 2, 4, 6, 8, 10 dari laju sesaat. Dan ganjil selalu duduk tepat di antara dua genapnya. Owalah, ternyata begini toh — turunan x2 adalah 2x, aturan kecil yang menata deret besar. Mudah, bukan?',
        },
      ],
    },
    'p3-075': {
      tema: 'jalanBukitPanah',
      npc: { glif: 'naik!', ucap: ['Naik, turun,', 'nol!'] },
      stasiun: [
        {
          objek: 'panahNaikHijau', judul: 'Panah Hijau Menanjak',
          teks: 'Senja menyiram jalan berbukit dengan warna jeruk, dan di tepinya berdiri penjaga panah dengan koleksi tanda berwarna. Jalan di depan menanjak rajin: setiap maju satu langkah, kaki harus naik dua — dan penjaga menancapkan panah hijau di situ. Panah hijau itu berkata sederhana: di titik ini jalan sedang menanjak, lajunya positif. Pendaki yang membaca panah itu tahu persis apa yang harus dipersiapkan.',
        },
        {
          objek: 'papanBerhentiSesaat', judul: 'Berhenti Sejenak di Puncak',
          teks: 'Mendaki lagi dan lagi, para pendaki akhirnya tiba di puncak yang datar anehnya hanya selebar beberapa langkah. Di tempat ini maju satu langkah tak menaikkan dan tak menurunkan apa pun — datar sempurna sesaat. Penjaga panah menancapkan papan putih bertuliskan nol, dan papan itu diam tanpa arah. Menanjak sudah selesai, menurun belum mulai, dan di antara keduanya ada jeda kecil bernama laju nol.',
        },
        {
          objek: 'panahTurunMerah', judul: 'Panah Merah Menurun',
          teks: 'Setelah puncak, jalan berbalik arah: setiap maju satu langkah, kaki turun dua — jalan mulai menurunkan para pendakinya. Penjaga panah menancapkan panah merah, dan warnanya jujur menyatakan laju negatif. Turun bukan hal yang buruk di sini; ia cuma kebalikan dari naik, sama jujurnya, sama terukurnya. Yang menarik, panah merah dan panah hijau tak pernah bertemu langsung — selalu ada papan putih nol di antara mereka.',
        },
        {
          objek: 'jalanBergelombang', judul: 'Jalan Bergelombang Panah',
          teks: 'Dari puncak tadi, jalan membentang bergelombang: turun, naik, turun lagi, dan para pendaki membaca seluruh rute dengan tiga warna saja. Hijau berarti menanjak dengan laju positif, merah berarti menurun dengan laju negatif, dan putih nol menandai puncak atau lembah tempat jalan berhenti sejenak. Tiga tanda sederhana itu mampu menceritakan jalan sepanjang apa pun tanpa satu kata pun. Hitungan itu hanya alat baca arah, dan alat ini cuma butuh tiga warna.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tiga Warna Pembaca Jalan!',
          teks: 'Hijau untuk menanjak, merah untuk menurun, putih nol untuk berhenti sejenak — seluruh bukit tadi bisa dibaca cuma dengan tiga warna. Laju positif, negatif, dan nol adalah cara jalan bercerita, dan puncak selalu lahir di tempat laju menjadi nol. Owalah, ternyata begini toh — turunan adalah pembaca arah, dan arahnya cuma tiga. Mudah, bukan?',
        },
      ],
    },

    'p3-076': {
      tema: 'tamanAirMancur',
      npc: { glif: 'puncak!', ucap: ['Laju nol', 'di puncak!'] },
      stasiun: [
        {
          objek: 'airMancurMelengkung', judul: 'Lengkung Air Mancur',
          teks: 'Siang cerah menemani taman dengan air mancur yang meloncat melengkung anggun ke udara. Pengelola taman berdiri di sampingnya sambil memegang papan pencatat, dan dia melempar tantangan ke semua pengunjung: kapan persisnya air ini berada di titik paling tinggi? Mata memang bisa melihat lengkungnya, tapi pengelola ingin lebih dari itu — dia ingin titik puncak itu ditemukan dengan hitungan yang bisa dicek ulang siapa pun.',
        },
        {
          objek: 'papanTinggiEmpat', judul: 'Catatan Tinggi 0, 3, 4, 3, 0',
          teks: 'Papan pencatat itu akhirnya dibaca keras-keras untuk semua pengunjung taman. Di detik nol air masih di kolam, tingginya nol; detik pertama air di 3; detik kedua di 4; detik ketiga kembali 3; dan detik keempat air mendarat di kolam lagi. Lima angka itu — 0, 3, 4, 3, 0 — membentuk lengkung yang simetris sempurna. Puncaknya tampak di detik kedua, tinggi 4, namun pengelola belum puas dengan sekadar melihat.',
        },
        {
          objek: 'titikPuncakKilau', judul: 'Sesaat Diam di Atas',
          teks: 'Kini bagian paling seru: membaca laju naiknya air dari catatan tadi. Dari 0 ke 3 lajunya plus 3, dari 3 ke 4 lajunya plus 1, dari 4 ke 3 lajunya berubah jadi minus 1, lalu minus 3 saat jatuh ke kolam. Perhatikan saat yang ajaib: laju plus 1 berganti minus 1, dan di antara keduanya laju lewat nol. Di detik kedua itulah air sesaat diam di ketinggian 4 — tak naik, tak turun — dan itulah puncak yang dicari.',
        },
        {
          objek: 'kolamCipratan', judul: 'Pemburu Puncak Tak Menunggu',
          teks: 'Pengelola taman menutup pelajarannya dengan cipratan air yang berkilau di kolam. Pemburu puncak tak perlu menunggu air jatuh untuk tahu puncaknya; cukup baca di mana kenaikannya berhenti, karena di situlah tinggi mencapai maksimal. Hitungan itu hanya alat, dan alat ini menunjuk detik kedua sebagai puncak dengan tinggi 4, lalu air pun jatuh simetris kembali ke nol. Air mancur yang sama kini terbaca seperti buku: naik, diam sesaat, turun.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Pemburu Puncak Kecil!',
          teks: 'Tinggi 0, 3, 4, 3, 0 — dan puncaknya ketemu bukan dengan menebak, melainkan dengan membaca saat laju kenaikannya menjadi nol di detik kedua. Air sesaat diam di angka 4, lalu jatuh simetris seperti tak pernah naik. Owalah, ternyata begini toh — mencari puncak cukup dengan memburu laju nol, tak perlu menunggu semuanya selesai. Mudah, bukan?',
        },
      ],
    },
    'p3-077': {
      tema: 'tanggaLajuPercepatan',
      npc: { glif: 'tingkat', ucap: ['Turunkan', 'dua kali!'] },
      stasiun: [
        {
          objek: 'tanggaTigaAnakLaju', judul: 'Tangga Tiga Anak Tangga',
          teks: 'Pagi di lintasan lama membawa kabar baik: sebuah tangga raksasa berdiri dengan tiga anak tangga besar, masing-masing diberi nama. Anak pertama bernama jarak, anak kedua bernama laju, dan anak ketiga bernama percepatan. Penjaga lintasan menjelaskan bahwa naik anak tangga itu sama artinya dengan menurunkan — jarak menurunkan laju, dan laju menurunkan percepatan. Setiap anak tangga menceritakan sesuatu tentang anak di bawahnya.',
        },
        {
          objek: 'papanJarakBola', judul: 'Papan Jarak 1, 4, 9',
          teks: 'Sebuah bola kecil menggelinding menuruni bengkokan lintasan, dan papan jarak di tepiannya mencatat perjalanannya. Detik pertama bola menempuh 1 meter, detik kedua total 4 meter, detik ketiga total 9 meter — deret kuadrat 1, 4, 9 yang terbaca rapi. Anak tangga pertama telah terisi: itulah jarak bola di setiap detik. Sekarang tangga menunggu pendaki menaiki anak yang kedua.',
        },
        {
          objek: 'papanLajuNaikDua', judul: 'Anak Dua: Laju 2, 4, 6',
          teks: 'Menurunkan jarak menghasilkan laju, dan papan di anak tangga kedua menuliskan hasilnya: 2, 4, 6 meter tiap detik. Bola itu makin kencang — lajunya di detik pertama 2, kedua 4, ketiga 6, tanpa satu pun yang mundur. Anak tangga kedua kini juga terisi, dan penjaga lintasan bertanya menggoda: kalau laju sendiri ikut berubah, siapa yang mengukur perubahannya? Tangga masih punya satu anak lagi di atas.',
        },
        {
          objek: 'papanPercepatanDua', judul: 'Anak Tiga: Percepatan Tetap 2',
          teks: 'Anak tangga ketiga menunggu dengan papan terakhirnya, dan jawabannya justru paling tenang. Dari laju 2 ke 4 selisihnya 2, dari 4 ke 6 selisihnya juga 2 — percepatan bola itu tetap 2 tiap detik, tak pernah berubah. Turunkan dua kali: dari jarak lahir laju, dari laju lahir percepatan, seperti naik tangga gunung dua undakan. Penjaga lintasan tertawa puas; tangga tiga anak itu kini utuh seluruhnya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Turunan Bertingkat!',
          teks: 'Jarak 1, 4, 9 — turunkan sekali jadi laju 2, 4, 6 — turunkan lagi jadi percepatan 2 yang setia. Tiga papan, tiga cerita, satu tangga yang naik dari jarak sampai percepatan. Owalah, ternyata begini toh — turunan bisa diturunkan lagi, dan setiap tingkat bercerita tentang tingkat di bawahnya. Mudah, bukan?',
        },
      ],
    },
    'p3-078': {
      tema: 'lembahSenyumU',
      npc: { glif: 'senyum', ucap: ['Dasar', 'ketemu!'] },
      stasiun: [
        {
          objek: 'kurvaSenyumRaksasa', judul: 'Senyum Raksasa di Lembah',
          teks: 'Siang menerangi sebuah lembah yang bentuknya seperti senyum raksasa — kurva U hijau yang turun, melengkung, lalu naik lagi. Di mulut lembah terpasang papan besar: kurva ini tersenyum, dan tersenyum paling dalam terjadi di satu titik saja. Pengunjung dipersilakan mencari titik terendah lembah itu, dan papan menantang mereka menemukannya tanpa berjalan ke seluruh lembah. Sepertinya mustahil, tapi lembah ini punya petunjuk yang tersembunyi di lajunya.',
        },
        {
          objek: 'papanLembahNol', judul: 'Menurun, Diam, Menanjak',
          teks: 'Papan petunjuk lembah membaca laju kurvanya dari kiri ke kanan. Di sisi kiri lajunya minus 4 lalu minus 2 — kurva sedang menurun rajin. Di tengah lajunya nol — kurva diam sejenak. Di sisi kanan lajunya plus 2 lalu plus 4 — kurva menanjak makin semangat. Tiga fase itu berjalan berurutan seperti tontonan: menurun, diam, menanjak.',
        },
        {
          objek: 'titikTerendahKilau', judul: 'Titik Terendah Berkilau',
          teks: 'Tempat menurun menyerah pada menanjak itulah titik yang dicari-cari — dan dia berkilau kecil di dasar lembah. Di titik itu tinggi kurva tercatat minus 4, titik terendah seantero lembah, dengan laju nol yang tenang. Tidak ada titik lain di kurva yang lebih rendah, karena di kiri dia masih turun dan di kanan dia sudah naik. Lembah tak bisa bersembunyi dari pembaca laju; dasar senyumnya menyerah pada angka nol itu.',
        },
        {
          objek: 'burungLingkarLembah', judul: 'Burung Pembaca Lembah',
          teks: 'Seekor burung putih terbang melingkari lembah sambil menurunkan pita kecil dari paruhnya. Pita itu mengulang satu kebenaran sederhana yang berlaku di lembah mana pun: setiap turunan akhirnya diam, lalu naik. Hitungan itu hanya alat yang menemukan dasar senyum — cukup baca di mana laju menurun berhenti menjadi nol, dan di sanalah titik terendah berdiri. Burung itu terbang pergi, dan lembah tetap tersenyum dengan dasar yang kini tak tersembunyi lagi.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Dasar Senyum Ketemu!',
          teks: 'Menurun, diam, menanjak — tiga fase lembah itu menunjuk satu titik: dasar senyum di tinggi minus 4 dengan laju nol. Tak perlu menyusuri seluruh lembah, cukup buru tempat menurun berhenti. Owalah, ternyata begini toh — kurva bentuk U selalu menyerahkan titik terendahnya pada laju nol. Mudah, bukan?',
        },
      ],
    },
    'p3-079': {
      tema: 'jalanMotorSore',
      npc: { glif: '+5/s', ucap: ['Makin', 'kencang!'] },
      stasiun: [
        {
          objek: 'motorSoreKencang', judul: 'Motor dari Kampung',
          teks: 'Sore keemasan menyambut jalan desa yang berliku, dan sebuah motor berangkat pelan dari depan warung. Pemuda pengendaranya menoleh sambil tersenyum, karena motor tua itu punya kebiasaan yang menarik: ia berangkat pelan lalu makin kencang setiap detiknya. Teman-temannya di warung mengajak menghitung laju motor itu di tiap detik, dan perhitungan pun dimulai dengan tawa. Sore itu akan bercerita tentang laju yang punya laju.',
        },
        {
          objek: 'speedometerNaikTetap', judul: 'Jarum yang Naik Setia',
          teks: 'Jarum speedometer motor itu bergerak dengan disiplin yang mengagumkan. Di detik pertama lajunya 5 meter tiap detik, detik kedua 10, detik ketiga 15 — naik setia tanpa tersentak. Teman-teman di warung mencatat tiga angka itu di papan kecil: 5, 10, 15. Jarum itu tak pernah diam, dan justru kedisiplinannya itulah yang menyimpan pelajaran.',
        },
        {
          objek: 'papanDetikLima', judul: 'Bertambah Lima Tiap Detik',
          teks: 'Papan catat itu lalu dibaca dengan cara lain: bukan angkanya, tapi kenaikannya. Dari 5 ke 10 naik 5, dari 10 ke 15 naik 5 lagi — setiap detik laju bertambah tepat 5. Kenaikan laju yang tetap itulah yang disebut percepatan: laju dari laju, ukuran seberapa cepat kecepatan berubah. Motor tua itu ternyata tak asal kencang; ia menambah lajunya dengan hitungan yang setia tiap detik.',
        },
        {
          objek: 'jalanDesaMelengkung', judul: 'Tikungan yang Melambatkan',
          teks: 'Jalan desa tak pernah benar-benar rata; di tikungan tajam motor itu melambat untuk berbelok. Lajunya yang tadinya naik rajin kini turun — dan turunnya laju itu pun bernama percepatan, cuma tandanya negatif. Jalan desa punya cerita: lurus memanjang membuat laju naik setia, tikungan memangkasnya dengan sopan. Percepatan bukan cuma tentang makin kencang; ia membaca setiap perubahan laju, naik maupun turun.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Laju Punya Laju!',
          teks: 'Laju 5, 10, 15 — naik 5 tiap detik — itu percepatan: laju dari laju, dan dia bisa positif saat makin kencang atau negatif saat tikungan melambatkan. Motor tua itu mengajarinya tanpa membuka mulut. Owalah, ternyata begini toh — di balik setiap laju ada laju lain yang mengukur perubahannya. Mudah, bukan?',
        },
      ],
    },
    'p3-080': {
      tema: 'puncakLerengCuram',
      npc: { glif: 'lereng!', ucap: ['Ukur', 'tiap titik!'] },
      stasiun: [
        {
          objek: 'kompasKemiringan', judul: 'Kompas Kemiringan',
          teks: 'Malam turun di puncak gunung, dan bintang-bintang menyaksikan penjaga lereng membawa kompas aneh berjarum dua arah. Kompas itu bukan penunjuk utara; ia pengukur kemiringan — jarumnya berdiri miring mengikuti tanah tempat ia diletakkan. Penjaga lereng menyapa pendaki yang baru tiba dan menawarkan ujian terakhir: lima misi lereng, dan kompas ini menjadi satu-satunya alat yang boleh dibawa. Pendaki itu mengangguk, dan malam pun memulai ujiannya.',
        },
        {
          objek: 'limaPapanMisiLereng', judul: 'Lima Papan Menantang',
          teks: 'Lima papan batu menyala lembut di sepanjang lereng, masing-masing membawa satu misi dari dunia-dunia yang telah dikunjungi pendaki. Papan pertama minta laju gelas air: 3, 3, 6, 1 — laju yang berubah di tiap detik. Papan kedua minta beda rata-rata dan sesaat: 60 kilometer per jam bisa berarti 40 lalu 80. Papan ketiga minta laju x2: jawabannya 2x, di titik 3 bernilai 6.',
        },
        {
          objek: 'papanPuncakLembah', judul: 'Puncak dan Lembah Tak Bisa Sembunyi',
          teks: 'Papan keempat dan kelima menantang pendaki membuktikan kekuatan terbesar kompas itu. Puncak air mancur ada di detik kedua ketinggian 4, tepat ketika kenaikannya menjadi nol. Dasar lembah senyum ada di tengah, ketinggian minus 4, juga dengan laju nol. Puncak naik dan lembah turun ternyata sama-sama ditandai oleh satu tanda: laju nol — dan pendaki menjawab semuanya tanpa ragu.',
        },
        {
          objek: 'gerbangJuaraLereng', judul: 'Gerbang Juara Lereng',
          teks: 'Gerbang batu di puncak menyala penuh ketika misi terakhir terjawab, dan penjaga lereng berdiri tersenyum di sampingnya. Hitungan itu hanya alat, katanya, tapi malam ini alat itu berpindah tangan — kompas kemiringan kini milik pendaki. Dari laju yang berubah sampai puncak dan lembah, semua lereng di dunia ini kini bisa dibaca titik demi titik. Gerbang itu terbuka lebar, dan bintang-bintang seperti ikut bertepuk.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kompas Lereng di Tanganmu!',
          teks: 'Lima misi lereng selesai: laju gelas 3, 3, 6, 1; rata-rata 60 vs sesaat 40 dan 80; 2x di titik 3 bernilai 6; puncak air di detik 2 tinggi 4; dasar senyum di laju nol. Semuanya terjawab dengan satu alat yang sama. Owalah, ternyata begini toh — turunan adalah kompas kemiringan, dan kini kompas itu ada di tanganmu. Mudah, bukan?',
        },
      ],
    },
    'p3-081': {
      tema: 'ladangUbinKotak',
      npc: { glif: 'ubin!', ucap: ['Potong kecil,', 'jumlah besar!'] },
      stasiun: [
        {
          objek: 'papanUbinDuaBelas', judul: 'Ladang Penuh Ubin',
          teks: 'Pagi menyapa ladang batu berpetak milik tukang batu tua, dan setiap petak berisi satu ubin kotak yang sama besar. Ia menanam ubin membentuk persegi panjang empat langkah memanjang dan tiga langkah selebar, lalu menghitung bersama pengunjung sambil menunjuk satu per satu. Satu, dua, tiga, sampai dua belas — ladang itu berisi tepat dua belas ubin, dan tak ada satu pun yang setengah.',
        },
        {
          objek: 'tumpukanUbinTiga', judul: 'Tumpukan Tangga',
          teks: 'Di pinggir ladang ada tumpukan ubin berbentuk tangga: satu di baris paling atas, dua di tengah, tiga di dasar. Tukang batu menjumlah sambil melompati barisnya: satu tambah dua tambah tiga, jadilah enam. Tidak ada rumus yang dipakai; hanya menjumlah potongan demi potongan sampai habis.',
        },
        {
          objek: 'papanTigaSusun', judul: 'Dua Belas Bisa Banyak Bentuk',
          teks: 'Papan kayu di gerbang menampilkan tiga foto susunan ubin yang sama banyak. Dua belas ubin bisa berbaris satu baris panjang, bisa juga menjadi enam kali dua, atau rapi menjadi empat kali tiga. Bentuknya bertiga berbeda, tetapi jumlah ubinnya sama persis dua belas — jumlah tidak peduli bentuk.',
        },
        {
          objek: 'gerbangJumlahKotak', judul: 'Gerbang Potongan Kecil',
          teks: 'Gerbang batu berukir pola kotak-kotak kecil menyala lembut saat pengunjung melangkah pulang. Tukang batu berbisik bahwa rahasia ladang ini sederhana: benda besar hanyalah potongan-potongan kecil yang dijumlahkan. Siapa pun yang berani menghitung satu per satu, ia akan mengenal isi ladang apa pun.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Semua Itu Cuma Dijumlah!',
          teks: 'Hari ini ladang memberi dua belas ubin dari empat kali tiga, tangga enam dari satu tambah dua tambah tiga, dan tiga bentuk berbeda dengan jumlah yang sama. Semuanya selesai hanya dengan menjumlah potongan demi potongan. Owalah, ternyata begini toh — luas itu jumlah potongan kecil, dan menjumlah tidak butuh sulit-sulit. Mudah, bukan?',
        },
      ],
    },
    'p3-082': {
      tema: 'tamanKertasBerpetak',
      npc: { glif: 'petak!', ucap: ['Hitung petaknya', 'satu-satu!'] },
      stasiun: [
        {
          objek: 'segitigaKotakPetak', judul: 'Taman Kertas Berpetak',
          teks: 'Taman ini berlantai kertas raksasa bergaris petak, dan di atasnya sebuah lereng lurus membentuk segitiga dari sudut nol hingga puncak di ketinggian empat. Pengunjung diminta menghitung luas di bawah lereng itu dengan cara taman paling jujur: menghitung petak. Lantai berpetak membuat segala sesuatu bisa dihitung tanpa duga-duga.',
        },
        {
          objek: 'kotakKacaSetengah', judul: 'Kotak Kaca Setengah',
          teks: 'Ada petak yang tidak penuh dilewati lereng, dan taman menyiapkan kotak kaca setengah untuk itu. Empat petak terpotong persis separuh oleh garis lurus, dan setengah petak ditambah setengah petak menjadi satu petak utuh. Jadi hitungannya jujur: enam petak penuh plus dua petak utuh hasil empat setengahan.',
        },
        {
          objek: 'papanEnamSetengah', judul: 'Enam Penuh, Empat Setengah',
          teks: 'Papan taman menuliskan hitungan itu apa adanya: enam kotak penuh dan empat kotak setengah. Enam ditambah empat kali setengah sama dengan delapan. Lereng lurus yang tadinya terlihat licin kini menjadi delapan petak yang bisa dihitung dengan jari.',
        },
        {
          objek: 'penggarisLuasDelapan', judul: 'Penggaris Menyetujui',
          teks: 'Penjaga taman memakai penggaris segitiga raksasa untuk memeriksa: setengah kali empat kali empat, hasilnya delapan. Angka penggaris dan angka petak bertemu di tempat yang sama. Dua cara berbeda, satu jawaban — di situlah orang mulai percaya pada hitungannya sendiri.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Lereng Lurus Itu Delapan!',
          teks: 'Segitiga di bawah lereng lurus kini bukan lagi bentuk yang licin: enam petak penuh, empat setengah petak, dan penggaris sama-sama berujung di delapan. Menghitung petak dan memakai rumus ternyata berpapasan di angka yang sama. Owalah, ternyata begini toh — luas di bawah garis hanyalah petak yang dijumlah dengan jujur. Mudah, bukan?',
        },
      ],
    },
    'p3-083': {
      tema: 'bengkelIrisanTipis',
      npc: { glif: 'makin tipis', ucap: ['Makin tipis,', 'makin pas!'] },
      stasiun: [
        {
          objek: 'mesinIrisKertas', judul: 'Bengkel Iris Kertas',
          teks: 'Bengkel ini punya mesin yang mengiris kertas berpetak jadi pita-pita vertikal, dan tugasnya satu: menghitung luas lereng segitiga yang sama seperti di taman sebelah — delapan. Mesin bekerja dengan cara khas bengkel: tiap pita diganti persegi panjang yang rapi. Yang rapi itu memang mudah, tetapi ia harus setia menempel di lereng.',
        },
        {
          objek: 'duaPapanTepiKiriKanan', judul: 'Dua Papan dari Dua Tepi',
          teks: 'Dua papan di dinding bengkel menulis dua jawaban dari dua cara memasang persegi. Persegi yang menempel di kiri tiap pita menjumlah enam; persegi yang menempel di kanan menjumlah sepuluh. Jawaban sebenarnya delapan bersembunyi di antara keduanya, dan bengkel menuliskan hal itu tanpa malu: enam sampai sepuluh.',
        },
        {
          objek: 'papanKisaranDelapan', judul: 'Iris Makin Tipis',
          teks: 'Pemilik bengkel memutar tuas, pita dipotong dua kali lebih tipis, dan dua papan menulis angka baru: tujuh dan sembilan. Kisarannya menyempit dari enam-sepuluh menjadi tujuh-sembilan, makin rapat mengurung delapan. Dua sisi berjalan saling mendekat, dan di tengah-tengahnya jawaban tak ke mana-mana.',
        },
        {
          objek: 'timbanganDuaSisiIris', judul: 'Timbangan Dua Sisi',
          teks: 'Di meja akhir ada timbangan dengan dua wadah: kiri berisi persegi kiri, kanan berisi persegi kanan. Makin tipis irisannya, makin ringan beda kedua wadah — empat menjadi dua, dan nanti akan menjadi setengah. Hitungan itu hanya alat, ujar pemilik bengkel, tetapi alat ini punya dua sisi yang berbisik menuju satu angka yang sama.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Dua Sisi Ketemu di Delapan!',
          teks: 'Bengkel hari ini mengepung satu jawaban dari dua arah: enam dan sepuluh, lalu tujuh dan sembilan, dengan delapan selalu terkurung di tengah. Potongan makin tipis membuat kedua sisi tak bisa berbohong. Owalah, ternyata begini toh — integral mengiris tipis lalu menjumlah, dan dua sisi berpapasan di jawaban yang jujur. Mudah, bukan?',
        },
      ],
    },
    'p3-084': {
      tema: 'lorongBolakBalik',
      npc: { glif: 'pulang!', ucap: ['Pergi memecah,', 'pulang menjumlah!'] },
      stasiun: [
        {
          objek: 'pintuDuaArahLorong', judul: 'Lorong dengan Pintu Dua Arah',
          teks: 'Senja jatuh di lorong panjang yang punya dua pintu kembar menghadap arah berlawanan. Pintu pergi bertulis TURUNAN dan pintu pulang bertulis INTEGRAL; penjaga lorong menyebut keduanya jalan bolak-balik yang setia. Apa yang dipecah saat pergi, disusun kembali saat pulang — tak satu pun hilang di lorong ini.',
        },
        {
          objek: 'papanLajuLima', judul: 'Pergi: dari Laju ke Jarak',
          teks: 'Papan pintu pergi menampilkan penunggang dengan laju tetap lima langkah tiap detik. Lorong menyusun jaraknya detik demi detik: lima, sepuluh, lima belas, dua puluh. Menjumlah laju yang setia itu pekerjaan integral, dan papan menuliskan jawabannya dengan tenang: dua puluh langkah di detik keempat.',
        },
        {
          objek: 'papanJarakDuaPuluh', judul: 'Pulang: dari Jarak ke Laju',
          teks: 'Papan pintu pulang menerima angka dua puluh itu dan membaca ulang ceritanya. Jaraknya naik lima setiap detik, maka lajunya lima — persis laju semula. Menurunkan jarak kembali ke laju adalah pekerjaan turunan, dan kedua papan bertukar senyum: keduanya memang satu pasangan.',
        },
        {
          objek: 'cerminTurunanBalik', judul: 'Cermin di Ujung Lorong',
          teks: 'Di ujung lorong berdiri cermin lebar; siapa pun yang menghadapnya melihat jalan pulangnya sendiri. Turunan memecah cerita jadi laju, integral menyusun laju kembali jadi cerita, seperti dua sisi cermin yang tak bisa hidup sendirian. Hitungan itu hanya alat, kata penjaga lorong, tetapi alat ini punya arah pulang yang tak pernah salah.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Integral Itu Jalan Pulangnya Turunan!',
          teks: 'Lorong kembar ini menuntaskan satu perjalanan: laju lima disusun jadi jarak dua puluh, lalu jarak dua puluh dibaca balik jadi laju lima. Pergi dan pulang memakai dua pintu, tetapi ceritanya satu dan utuh. Owalah, ternyata begini toh — integral adalah jalan pulang si turunan, dua arah satu pasangan. Mudah, bukan?',
        },
      ],
    },
    'p3-085': {
      tema: 'tamanLengkungBatu',
      npc: { glif: 'mengepung!', ucap: ['Kurung lengkungnya,', 'jumlah kotaknya!'] },
      stasiun: [
        {
          objek: 'lengkungBatuSembilan', judul: 'Lengkung yang Tadinya Menakutkan',
          teks: 'Pagi menyala di taman batu yang lantainya berpetak, dan di atasnya membentang lengkung x kuadrat dari nol sampai tiga. Lengkung itu meliuk naik makin curam: di satu tingginya satu, di dua tingginya empat, di tiga tingginya sembilan. Pengunjung biasa menyerah pada bentuknya; taman ini menawarkan cara lain: iriskan.',
        },
        {
          objek: 'kotakTanggaBatuKurva', judul: 'Tangga Batu di Bawah Lengkung',
          teks: 'Tukang batu taman membangun tangga persegi menempel di bawah lengkung, satu anak tangga selebar satu petak. Tangga bawah menjumlah nol tambah satu tambah empat, hasilnya lima petak. Lengkungnya tak tertangkap rapi, tetapi tangga ini berjanji: aku tidak pernah melebihi lengkung.',
        },
        {
          objek: 'papanLimaEmpatBelas', judul: 'Tangga dari Atas: Lima sampai Empat Belas',
          teks: 'Tangga kedua dipasang dari atas lengkung, menutupinya dengan angkuh. Tangga atas menjumlah satu tambah empat tambah sembilan, hasilnya empat belas petak. Kini lengkung x kuadrat terkurung rapat: luasnya lebih besar dari lima dan lebih kecil dari empat belas.',
        },
        {
          objek: 'papanTepatSembilan', judul: 'Iris Tipis, Kurungan Menyempit',
          teks: 'Taman mengiris petak jadi dua kali lebih tipis, dan kurungan menyempit menjadi 6,875 sampai 11,375. Makin tipis irisannya, makin rapat dua tangga mengepung, dan jawabannya tak pernah berpindah: sembilan. Hitungan itu hanya alat, kata tukang batu, tetapi alat ini bisa mengurung lengkung se ganas apa pun.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Lengkung Terkurung di Sembilan!',
          teks: 'Lengkung x kuadrat dari nol sampai tiga hari ini dikalahkan bukan dengan rumus pamungkas, melainkan dengan tangga bawah lima dan tangga atas empat belas yang saling mendekat. Irisan makin tipis membuat kurungan makin pas, dan sembilan menunggu di tengahnya. Owalah, ternyata begini toh — luas di bawah lengkung pun bisa dikepung sampai tuntas. Mudah, bukan?',
        },
      ],
    },
    'p3-086': {
      tema: 'jalanKurirGrafik',
      npc: { glif: 'luasnya!', ucap: ['Luas di bawah laju', 'itu jaraknya!'] },
      stasiun: [
        {
          objek: 'kurirSepedaGrafik', judul: 'Kurir dan Papan Lajunya',
          teks: 'Siang terik tak menyurutkan kurir sepeda ini; ia mengayuh di jalan yang dipenuhi papan grafik raksasa. Grafiknya sederhana: garis laju mendatar di ketinggian dua meter tiap detik, dari detik nol sampai detik sepuluh. Kurir berhenti sejenak dan menantang pengunjung: berapa jarak yang kutempuh, tanpa melihat odometer?',
        },
        {
          objek: 'papanLajuKotakDua', judul: 'Kotak Laju Dua Kali Sepuluh',
          teks: 'Jawabannya tersimpan dalam kotak yang terbentuk di bawah garis laju: lebar sepuluh detik, tinggi dua meter tiap detik. Luas kotak itu dua kali sepuluh, dua puluh meter. Laju dikali waktu — atau, dengan bahasa ladang ubin: jumlahkan tinggi dua itu sepuluh kali.',
        },
        {
          objek: 'layarGrafikLaju', judul: 'Grafik Laju yang Naik',
          teks: 'Layar kedua menampilkan perjalanan lain: laju yang naik setia dari nol sampai empat selama sepuluh detik. Di bawahnya terbentuk bukan kotak, melainkan segitiga. Luas segitiga itu setengah kali sepuluh kali empat — dan lagi-lagi dua puluh meter, padahal grafiknya benar-benar berbeda.',
        },
        {
          objek: 'odometerBandingJarak', judul: 'Odometer Menyetujui',
          teks: 'Kurir membuka odometer sepedanya dan tertawa lebar: kedua perjalanan itu masing-masing dua puluh meter, tepat seperti hitungan luas. Grafik berbeda bisa punya jarak sama, karena yang dihitung bukan bentuknya melainkan luas di bawahnya. Hitungan itu hanya alat, kata kurir, tetapi alat ini bisa membaca jarak dari gambar.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Jarak Itu Luas di Bawah Grafik!',
          teks: 'Hari ini dua grafik laju berbicara: kotak dua kali sepuluh dan segitiga setengah kali sepuluh kali empat, keduanya bermuara di dua puluh meter. Odometer mengiyakan angka luas tanpa berdebat. Owalah, ternyata begini toh — membaca jarak dari grafik laju sama dengan menjumlah luas di bawahnya. Mudah, bukan?',
        },
      ],
    },
    'p3-087': {
      tema: 'menaraTintaHuruf',
      npc: { glif: 'summa!', ucap: ['Huruf S panjang,', 'artinya jumlah!'] },
      stasiun: [
        {
          objek: 'bukuHurufS', judul: 'Menara Tinta dan Buku S',
          teks: 'Malam di menara tinta diisi cahaya lentera dan deretan buku matematika tua. Di rak teratas terbuka satu halaman besar dengan huruf memanjang yang menyerupai S tegak. Penjaga menara menyapa: kau pasti pernah melihatnya di papan tulis dan mengira itu sulit; malam ini kau akan tahu ia sesederhana apa.',
        },
        {
          objek: 'penaBuluhTinta', judul: 'Pena Buluh Menulis Panjang',
          teks: 'Di meja kayu tergeletak pena buluh yang dulu menulis huruf itu. Ia bercerita dengan tinta di ujungnya: aku hanya menuliskan kata summa yang berarti jumlah, lalu S-ku dibuat panjang agar tak tertukar dengan S biasa. Huruf yang menakutkan di papan tulis ternyata cuma satu kata yang memanjang.',
        },
        {
          objek: 'gulunganSumma', judul: 'Gulungan Summa',
          teks: 'Gulungan tua dibuka pelan, memperlihatkan tulisan pertama huruf S memanjang itu. Di sampingnya tertulis artinya: jumlahkan potongan demi potongan, dari batas kiri sampai batas kanan. Persis seperti ladang ubin dan bengkel iris: integral hanyalah penjumlahan yang ditulis dengan huruf gagah.',
        },
        {
          objek: 'papanTahunTinta', judul: 'Tahun di Papan Tinta',
          teks: 'Papan peringatan menara menuliskan jejak waktunya: huruf S memanjang itu pertama kali muncul pada tahun seribu tujuh ratus tujuh puluh lima, ditulis tangan oleh Leibniz di catatan kecilnya. Sejak hari itu, jumlah potongan kecil punya lambang yang gagah dan mudah dikenali. Penjaga menara menutup papan itu dan berkata, alat tulis saja berubah, tetapi arti jumlahnya tetap sama sampai kini.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Itu Cuma Huruf S Memanjang!',
          teks: 'Menara tinta melipat ceritanya rapi: huruf integral adalah S dari kata summa, ditulis Leibniz pada 1675, dan artinya tidak lain jumlah. Segala yang menyeramkan tentang simbol itu runtuh dalam satu malam. Owalah, ternyata begini toh — tanda paling gagah di matematika hanyalah kata jumlah yang memanjang. Mudah, bukan?',
        },
      ],
    },
    'p3-088': {
      tema: 'guaTetesEmber',
      npc: { glif: 'tetes!', ucap: ['Tetes kecil,', 'ember penuh!'] },
      stasiun: [
        {
          objek: 'atapTetesanGua', judul: 'Gua yang Berkicau Tetes',
          teks: 'Malam membawa suara di gua ini: tetes-tetes air jatuh dari atap batu dengan irama yang tak pernah terlambat. Penjaga gua menempatkan pengunjung di bawah talang dan menunjuk ember tanah liat di lantai. Setiap detik, satu tetes dua mililiter jatuh tepat — dan gua ini menghitung apa pun yang setia.',
        },
        {
          objek: 'talangKacaMenetes', judul: 'Talang Kaca Penghitung',
          teks: 'Talang kaca menampung tetesan dan memajang hitungannya per menit: enam puluh tetes kali dua mililiter, seratus dua puluh mililiter tiap menit. Tetes tunggal terlihat remeh, tetapi talang ini tak pernah berhenti menjumlah. Kecil tidak berarti tak terhitung; ia hanya butuh teman bernama waktu.',
        },
        {
          objek: 'emberTetesMelebar', judul: 'Ember yang Membesar Diam-diam',
          teks: 'Ember tanah liat berkapasitas satu liter diletakkan di bawah tetes, dan permukaannya naik pelan-pelan. Seratus dua puluh mililiter di menit pertama, dua ratus empat puluh di menit kedua, dan terus bertambah setia. Penjumlahan kecil-kecil inilah wajah lain dari integral: menimbun potongan sampai jadi besar.',
        },
        {
          objek: 'papanDetikLimaRatus', judul: 'Papan di Detik Lima Ratus',
          teks: 'Papan batu di dinding gua menuliskan pertanyaan pengunjung-pengunjung lama. Kapan ember penuh? Jawabannya dihitung dengan tenang: seribu mililiter dibagi dua mililiter tiap detik, sama dengan lima ratus detik. Hitungan itu hanya alat, kata penjaga gua, tetapi alat ini tahu tepat kapan malam ini ember akan penuh.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tetes yang Dihitung Jadi Ember Penuh!',
          teks: 'Gua ini menuntaskan satu akumulasi sederhana: dua mililiter tiap detik, seratus dua puluh tiap menit, dan penuh seribu mililiter tepat di detik lima ratus. Tidak ada jalan pintas di dalamnya, hanya penjumlahan yang tak bolong. Owalah, ternyata begini toh — integral itu tetesan kecil yang dihitung setia sampai jadi ember penuh. Mudah, bukan?',
        },
      ],
    },
    'p3-089': {
      tema: 'kebunTerasering',
      npc: { glif: 'garis rata', ucap: ['Luas dibagi lebar', 'adalah rata!'] },
      stasiun: [
        {
          objek: 'teraseringTigaTingkat', judul: 'Kebun Terasering Lengkung',
          teks: 'Sore menyelimuti kebun terasering yang lerengnya mengikuti kurva x kuadrat dari nol sampai tiga. Petani tua membawa tugas aneh: mengganti seluruh lereng lengkung itu dengan sawah datar satu tingkat, asal jumlah airnya sama persis. Luas di bawah lengkung sudah dikenal dari taman batu: sembilan petak.',
        },
        {
          objek: 'garisRataKuning', judul: 'Garis Rata Kuning',
          teks: 'Petani menarik garis kuning mendatar dan menyodorkan syaratnya: tinggi garis kali lebar tiga harus sama dengan sembilan. Maka tinggi garis rata itu tiga — sembilan dibagi tiga. Sawah datar setinggi tiga kini menyimpan air sebanyak lereng lengkung semula.',
        },
        {
          objek: 'papanLuasSamaRata', judul: 'Dua Sawah, Air Sama',
          teks: 'Papan kebun membandingkan keduanya dengan gambar: lengkung di atas, garis rata di bawah, keduanya mampu menampung sembilan petak air. Bentuknya bertengkar, jumlahnya berdamai. Itulah pekerjaan garis rata: meratakan yang meliuk tanpa mencuri atau menambah sedikit pun.',
        },
        {
          objek: 'papanRataTigaKurva', judul: 'Bukan Tengah-Tengah!',
          teks: 'Seorang pengunjung protes. Bukankah rata artinya tengah-tengah, di antara nol dan sembilan, yaitu 4,5? Petani menggeleng dan menunjuk lengkungnya: kurva ini lebih lama duduk di ketinggian rendah, maka ratanya turun ke tiga. Rata-rata kurva bukan tengah-tengah nilai ujungnya — kenyataan yang membuat pengunjung terdiam lama.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Rata Itu Luas Dibagi Lebar!',
          teks: 'Terasering menutup pelajarannya bersih: luas sembilan dibagi lebar tiga memberi garis rata di ketinggian tiga, dan angka itu memang bukan tengah-tengah nol dan sembilan. Kurva punya selera duduknya sendiri, dan garis rata hanya menurutinya. Owalah, ternyata begini toh — nilai rata dari kurva adalah luas dibagi lebar. Mudah, bukan?',
        },
      ],
    },
    'p3-090': {
      tema: 'lembahLuasMalam',
      npc: { glif: 'jumlah!', ucap: ['Jumlah potongannya,', 'buktikan!'] },
      stasiun: [
        {
          objek: 'limaPapanMisiLuas', judul: 'Lembah Lima Papan',
          teks: 'Malam turun di lembah luas, dan lima papan batu menyala memanjang di sepanjang jalan pulang. Masing-masing membawa satu misi dari dunia-dunia yang telah dikunjungi: ladang ubin, taman berpetak, bengkel iris, lorong bolak-balik, dan gua tetes. Penjaga lembah menyerahkan satu tugas: jawab semuanya dengan satu senjata yang sama — menjumlah potongan.',
        },
        {
          objek: 'papanTantanganLuas', judul: 'Tiga Papan Pertama',
          teks: 'Papan pertama meminta isi tangga ubin: satu tambah dua tambah tiga, jawabannya enam. Papan kedua meminta luas di bawah lereng lurus sampai empat: enam penuh plus dua dari setengahan, jawabannya delapan. Papan ketiga meminta luas di bawah lengkung x kuadrat sampai tiga, yang terkurung rapat oleh lima dan empat belas: jawabannya sembilan.',
        },
        {
          objek: 'papanLembahSembilan', judul: 'Dua Papan Berikutnya',
          teks: 'Papan keempat menayangkan laju lima langkah tiap detik selama empat detik, dan lembah menjumlahnya: dua puluh langkah. Papan kelima menayangkan gua tetes dua mililiter per detik di ember seribu mililiter, dan lembah membagi dengan tenang: penuh di detik lima ratus. Lima jawaban menyala berjajar, tak satu pun mundur.',
        },
        {
          objek: 'gerbangJuaraLuas', judul: 'Gerbang Juara Luas',
          teks: 'Gerbang batu di ujung lembah menyala penuh ketika papan terakhir terjawab, dan penjaga lembah berdiri tersenyum di sampingnya. Hitungan itu hanya alat, katanya, tetapi malam ini alat itu menaklukkan lima dunia sekaligus: luas, lengkung, laju, dan tetes. Dari potongan kecil yang dijumlah, lembah memberi gelar juara luas kepada siapa pun yang tak gentar.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Lembah Luas Tuntas Dijumlah!',
          teks: 'Lima misi lembah selesai: enam ubin tangga, delapan di bawah lereng, sembilan di bawah lengkung, dua puluh langkah dari laju, dan lima ratus detik untuk ember penuh. Semuanya kalah oleh satu kebiasaan yang sama: mengiris lalu menjumlah. Owalah, ternyata begini toh — integral adalah seni menjumlah potongan kecil sampai dunia jadi terhitung. Mudah, bukan?',
        },
      ],
    },
    'p3-091': {
      tema: 'lemariPadanan',
      npc: { glif: 'padan!', ucap: ['Sapa semua', 'padanannya!'] },
      stasiun: [
        {
          objek: 'lemariKemejaTiga', judul: 'Lemari yang Bertanya',
          teks: 'Pagi hangat menyapa kamar kecil di rumah nenek, dan sebuah lemari kayu tua berdiri terbuka lebar. Di dalamnya tiga kemeja bersahabat tersampir rapi, kuning, biru, dan hijau, berdampingan dengan dua celana berwarna cokelat dan biru tua. Perjalanan ke desa nenek akan dimulai besok, dan penghuni kamar harus menyiapkan padanan pakaian untuk setiap hari. Lemari itu seolah bertanya: dari kemeja dan celana ini, ada berapa padanan yang bisa dibuat?',
        },
        {
          objek: 'papanEnamPadanan', judul: 'Setiap Kemeja Menyapa Semua Celana',
          teks: 'Di pintu lemari tertempel papan kecil bergambar kotak-kotak, dan gambar itu mengajarkan satu kebiasaan yang rapi. Kemeja kuning boleh berpadu dengan celana cokelat, boleh juga dengan celana biru tua; begitu pula kemeja biru, begitu pula kemeja hijau. Setiap kemeja menyapa semua celana, satu per satu, tanpa kecuali. Tiga kemeja kali dua celana, hasilnya enam padanan yang tersusun rapi di kotak gambar itu.',
        },
        {
          objek: 'kemejaBaruEmpat', judul: 'Satu Kemeja Baru, Dua Padanan Baru',
          teks: 'Minggu depan ada kemeja baru datang, warnanya merah bata, dan lemari akan berisi empat kemeja. Papan kotak itu menambahkan satu baris baru, dan baris itu langsung menyapa kedua celana sekaligus. Empat kemeja kali dua celana menjadi delapan padanan, dua lebih banyak dari kemarin. Satu kemeja kecil ternyata membawa dua padanan baru, karena satu pakaian baru harus menjabat tangan dengan semua pakaian pasangannya.',
        },
        {
          objek: 'jadwalSeminggu', judul: 'Cukup untuk Seminggu?',
          teks: 'Di dasar lemari ada jadwal pakaian sepekan, dan sepekan berarti tujuh hari yang tiap harinya ingin tampil beda. Enam padanan dulu tidak pernah cukup, delapan padanan masih kurang satu, dan kini lemari menambahkan satu celana lagi. Empat kemeja kali tiga celana, jadilah dua belas padanan. Dua belas melebihi tujuh hari dengan sisa lima cadangan, dan tak ada lagi pagi yang kehabisan padanan baru.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Lemari Kecil Punya Dua Belas Jawaban!',
          teks: 'Hari ini lemari tua memberi pelajaran yang tak pernah diduga: tiga kemeja dan dua celana menyusun enam padanan, satu kemeja baru menambah dua, satu celana baru menambah empat, dan hitungan berakhir di dua belas. Menghitung padanan ternyata sesederhana mengalikan pilihan yang satu dengan pilihan yang lain. Hitungan itu hanya alat. Bantu saja. Owalah, ternyata begini toh, lemari kecil menyimpan pilihan lebih banyak dari yang mata lihat. Mudah, bukan?',
        },
      ],
    },
    'p3-092': {
      tema: 'tamanBarisanFoto',
      npc: { glif: 'berbaris!', ucap: ['Tiga sahabat,', 'enam gaya!'] },
      stasiun: [
        {
          objek: 'podiumFotoTiga', judul: 'Tiga Sahabat dan Podium Foto',
          teks: 'Siang cerah menyambut tiga sahabat lama yang sepakat mengabadikan persahabatan mereka di podium foto taman. Podium itu punya tiga tempat berjajar, kiri, tengah, dan kanan, dan ketiganya menanti diisi. Ani, Bima, dan Cika saling pandang lalu tertawa, sebab belum sepakat siapa berdiri di mana. Pertanyaan sederhana pun muncul: ada berapa cara menempatkan tiga orang di tiga tempat itu?',
        },
        {
          objek: 'papanTigaDuaSatu', judul: 'Kiri, Tengah, Kanan',
          teks: 'Pengelola taman menunjuk papan hitung di sisi podium, dan hitungannya berjalan seperti pertanyaan berantai. Untuk tempat paling kiri ada tiga pilihan: Ani, Bima, atau Cika. Tempat tengah tinggal dua pilihan, dan tempat kanan otomatis tersisa satu. Tiga kali dua kali satu, hasilnya enam urutan berbeda untuk satu foto yang sama.',
        },
        {
          objek: 'albumEnamJepretan', judul: 'Enam Jepretan untuk Album',
          teks: 'Kamera mulai bekerja, dan album kecil menampung jepretan demi jepretan. Ani di kiri, Bima di tengah, Cika di kanan, jepret. Posisi ditukar sedikit dan wajah barisan langsung terasa beda, jepret lagi, sampai enam foto terkumpul. Tak ada dua foto yang benar-benar sama, karena urutan mengubah cerita barisan, dan enam urutan itulah seluruh kekayaan tiga sahabat.',
        },
        {
          objek: 'sahabatKeempatDatang', judul: 'Teman Baru Ikut Berbaris',
          teks: 'Tepat saat foto terakhir, Dina datang berlari dan ingin ikut, sehingga barisan kini berisi empat orang. Papan hitung menambah satu lantai: empat kali tiga kali dua kali satu, hasilnya dua puluh empat urutan. Dari enam menjadi dua puluh empat, bertambah empat kali lipat hanya karena satu orang bergabung. Tawa tiga sahabat pecah, sebab album yang tadinya ramping kini akan tebal.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Enam Foto dari Tiga Sahabat!',
          teks: 'Podium taman sore itu menyisihkan pelajaran manis: tempat kiri punya tiga pilihan, tengah tinggal dua, kanan tinggal satu, dan tiga kali dua kali satu berujung enam foto yang tak ada duanya. Ketika teman bertambah, hitungan melipatgandakan dirinya sendiri, dari enam melompat ke dua puluh empat. Owalah, ternyata begini toh, mengurutkan adalah mengalikan pilihan demi pilihan. Mudah, bukan?',
        },
      ],
    },
    'p3-093': {
      tema: 'lapanganPasanganSore',
      npc: { glif: 'sepasang!', ucap: ['Hitung pasangnya', 'tanpa dobel!'] },
      stasiun: [
        {
          objek: 'kertasEmpatNama', judul: 'Empat Nama di Kertas',
          teks: 'Sore menyala di lapangan desa, dan empat pemain muda menyiapkan giliran latihan estafet. Papan skor kecil dipakai menulis empat nama, dan aturannya satu: giliran pertama dijalani sepasang pemain, dua orang sekaligus. Kertas dan pensel keluar dari tas, lalu pertanyaan pertama terdengar: ada berapa pasang yang mungkin terpilih dari empat nama ini?',
        },
        {
          objek: 'papanDuaBelasSusunan', judul: 'Dua Belas Kertas, Satu Kebenaran',
          teks: 'Cara pertama menulis nama berurutan: Ani dulu lalu Bima, atau Bima dulu lalu Ani, dan begitu terus untuk semua kemungkinan. Empat nama kali tiga pasangan sisa, hasilnya dua belas kertas terpakai. Namun saat kertas-kertas itu dibaca lagi, dua kertas seperti Ani-Bima dan Bima-Ani ternyata menceritakan satu pasang yang sama. Sepasang pemain tak peduli siapa yang disebut lebih dulu, pasang itu tetap mereka berdua.',
        },
        {
          objek: 'bolaPasangEnam', judul: 'Enam Pasang Berjabat Tangan',
          teks: 'Cara kedua lebih hemat: bagi dua belas dengan dua, sebab setiap pasang selalu terhitung dua kali. Dua belas dibagi dua, jadilah enam pasang: Ani-Bima, Ani-Cika, Ani-Dina, Bima-Cika, Bima-Dina, dan Cika-Dina. Persis seperti empat orang yang saling berjabat tangan saat perpisahan, tidak ada yang dijabat dua kali, tidak ada yang terlewat, dan tangannya habis tepat enam kali.',
        },
        {
          objek: 'timGiliranMulai', judul: 'Giliran Dimulai, Hitungan Selesai',
          teks: 'Kertas-kertas urutan dipilah dan disisihkan, lalu enam slip pasangan dimasukkan ke dalam topi. Salah satu slip diambil, dua nama terbaca, dan latihan estafet dimulai dengan giliran pertama yang jelas. Memilih tanpa memedulikan urutan itulah kebiasaan baru yang dipelajari sore itu: cukup sekali menyebut, tidak perlu dua kali. Topi ditutup kembali, menunggu latihan berikutnya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Dua Belas Kertas Ternyata Enam Pasang!',
          teks: 'Lapangan sore itu meninggalkan pelajaran yang sering keliru dihitung orang: menulis nama berurutan menghasilkan dua belas, tetapi pasangan sesungguhnya hanya enam, karena setiap pasang selalu terhitung dua kali. Membagi dua belas dengan dua bukan trik sulit, hanya cara mengakui bahwa Ani-Bima dan Bima-Ani itu satu keluarga. Owalah, ternyata begini toh, memilih tanpa urutan tinggal dibagi dua. Mudah, bukan?',
        },
      ],
    },
    'p3-094': {
      tema: 'bazarPohonPilihan',
      npc: { glif: 'cabang!', ucap: ['Gambarkan', 'semua jalur!'] },
      stasiun: [
        {
          objek: 'tendaRotiTigaIsi', judul: 'Tenda Roti Pagi Bazar',
          teks: 'Pagi bazar desa beraroma roti hangat, dan tenda paling ramai menjual roti isi dengan tiga pilihan: cokelat, keju, dan selai. Setiap roti boleh ditemani dua minuman hangat, teh atau susu. Pembeli kecil kebingungan dengan senang, sebab pilihannya sedikit tetapi paduan rasanya banyak. Penjaga tenda tersenyum dan mengeluarkan selembar kertas besar dari bawah meja.',
        },
        {
          objek: 'pohonKertasCabang', judul: 'Pohon yang Tumbuh di Kertas',
          teks: 'Kertas besar itu ternyata gambar pohon, dan penjaga tenda menggambar cabangnya pelan-pelan. Batangnya bertiga, satu cabang untuk setiap isian roti, lalu dari tiap batang tumbuh dua cabang kecil untuk teh dan susu. Cokelat bercabang dua, keju bercabang dua, selai juga dua. Tiga kali dua, dan pohon itu berdiri dengan enam ujung jalur yang semuanya kelihatan.',
        },
        {
          objek: 'jalurEnamLampu', judul: 'Enam Jalur, Tak Ada yang Tertinggal',
          teks: 'Dua pembeli bermain mengikuti jalur pohon dengan jarinya sambil membaca keras-keras. Roti cokelat dengan teh, roti cokelat dengan susu, keju dengan teh, keju dengan susu, selai dengan teh, dan selai dengan susu, enam jalur lengkap. Ujung tiap jalur ditempeli lampu kecil, dan lampu itu menyala bergantian dari kiri ke kanan. Tak satu pun kemungkinan tersesat, sebab pohon menampakkan semuanya sekaligus.',
        },
        {
          objek: 'isianBaruEmpat', judul: 'Isian Baru Menumbuhkan Cabang',
          teks: 'Menjelang siang, penjaga tenda menaburkan isian baru, pisang karamel, dan pohon di kertas langsung tumbuh satu batang lagi. Batang pisang bercabang dua seperti saudaranya, dan jumlah jalur melompat dari enam menjadi delapan. Tambah satu pilihan di tangkai, tambah dua jalur di ujung, itulah kebiasaan pohon kemungkinan. Pembeli kecil bertepuk tangan, sebab pohon itu tumbuh tanpa membuat siapa pun pusing.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Semua Pilihan Bisa Digambar!',
          teks: 'Bazar pagi itu menyimpan rahasia berpikir yang rapi: alih-alih menebak berapa banyak paduan, penjaga tenda menggambarnya satu per satu menjadi pohon. Tiga isian kali dua minuman menjadi enam jalur, dan satu isian baru menumbuhkan dua jalur lagi. Hitungan itu hanya alat. Bantu saja. Owalah, ternyata begini toh, kemungkinan yang digambar lebih tenang daripada kemungkinan yang dihafal. Mudah, bukan?',
        },
      ],
    },
    'p3-095': {
      tema: 'rakBukuMalam',
      npc: { glif: 'berantai!', ucap: ['Empat kali tiga', 'kali dua kali satu!'] },
      stasiun: [
        {
          objek: 'rakEmpatBuku', judul: 'Empat Buku Menunggu Susunan',
          teks: 'Malam tenang menyapa sudut bacaan seorang pemuda, dan rak kayu kecil di depannya berisi empat buku kesayangan yang belum tersusun. Ada buku gunung, buku laut, buku bintang, dan buku hutan, masing-masing bersampul warna berbeda. Sebelum tidur, ia ingin menata urutan mereka di rak agar pagi terasa pas. Pertanyaan sederhana muncul di kepalanya: ada berapa cara menyusun empat buku itu?',
        },
        {
          objek: 'rantaiEmpatTigaDuaSatu', judul: 'Pengganda Berantai di Kertas',
          teks: 'Ia menulis hitungannya di kertas dan menyadari satu hal: rak tak peduli buku mana yang diletakkan lebih dulu, yang penting semua terisi. Tempat pertama punya empat pilihan, tempat kedua tinggal tiga, tempat ketiga tinggal dua, dan tempat terakhir menyambut sisa satu buku. Empat kali tiga kali dua kali satu, hasilnya dua puluh empat. Di kertas itu juga ia membaca tanda seru kecil tulisan gurunya: empat faktorial, tanda seru yang bukan teriakan, melainkan pengganda berantai.',
        },
        {
          objek: 'papanDuaEmpatSusunan', judul: 'Dua Puluh Empat Susunan',
          teks: 'Dari dua puluh empat susunan, ia hanya butuh satu untuk malam ini, tetapi daftar kecilnya menuliskan semuanya sekadar membuktikan. Susunan pertama ditulis, kedua, kelima, kesepuluh, sampai baris dua puluh empat memenuhi kertas. Tidak ada dua susunan yang sama persis, dan tidak ada satu pun yang hilang dari daftar. Rak kecil itu ternyata menyimpan dua puluh empat dunia yang berbeda urutan.',
        },
        {
          objek: 'bukuKelimaMeledak', judul: 'Buku Kelima Menggandakan Daftar',
          teks: 'Minggu depan ada buku kelima datang dari toko, sampulnya oranye cerah, dan daftar di kertas mendadak harus dihitung ulang. Lima kali empat kali tiga kali dua kali satu, hasilnya seratus dua puluh, daftar yang tadinya satu lembar kini butuh lima lembar. Satu buku baru melipatlimatkan semua susunan, sebab buku itu harus mencoba duduk di setiap celah rak. Ia tersenyum: buku berikutnya akan membawa seratus dua puluh menjadi tujuh ratus dua puluh.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tanda Seru Itu Pengganda Berantai!',
          teks: 'Malam itu rak buku kecil mengajarkan satu tanda baca yang luar biasa: empat kali tiga kali dua kali satu menjadi dua puluh empat, dan tanda seru pada empat faktorial adalah pengganda berantai, bukan teriakan. Satu buku tambahan melipat daftar menjadi seratus dua puluh, dan buku berikutnya menjanjikan tujuh ratus dua puluh. Owalah, ternyata begini toh, mengurutkan banyak benda tumbuh seperti bola salju. Mudah, bukan?',
        },
      ],
    },
    'p3-096': {
      tema: 'papanDuaKelas',
      npc: { glif: 'rentang!', ucap: ['Rata sama,', 'cerita beda!'] },
      stasiun: [
        {
          objek: 'duaPapanNilai', judul: 'Dua Papan, Dua Kelompok',
          teks: 'Siang terang membasahi halaman sekolah, dan dua papan data berdiri berdampingan dekat kantin. Papan pertama milik kelompok belajar A dengan lima nilai latihan: tujuh, tujuh, tujuh, tujuh, tujuh. Papan kedua milik kelompok B: tiga, lima, tujuh, sembilan, sebelas. Dari kejauhan kedua papan terlihat seimbang, dan anak-anak makan siang menduga keduanya sama persis.',
        },
        {
          objek: 'timbanganRataTujuh', judul: 'Timbangan Menyatakan Seri',
          teks: 'Penjaga data menghitung rata-rata kedua papan di depan penonton yang makin ramai. Kelompok A menjumlah tiga puluh lima lalu membagi lima, hasilnya tujuh. Kelompok B juga tiga puluh lima dibagi lima, hasilnya tujuh lagi. Timbangan rata-rata menyatakan seri sempurna, dan sebagian penonton mulai bubar karena yakin tak ada lagi yang perlu dibahas.',
        },
        {
          objek: 'mistarRentangNol', judul: 'Mistar Mengukur Sebaran',
          teks: 'Namun penjaga data belum menutup papan, dan ia mengeluarkan mistar panjang untuk mengukur hal lain: seberapa jauh angka-angka itu berjaler. Nilai kelompok A semua menempel di tujuh, rentangnya nol, rapat seperti kepingan koin yang ditumpuk. Nilai kelompok B berjalan dari tiga sampai sebelas, rentangnya delapan, menyebar seperti barisan burung. Rata-ratanya sama, sebarannya bertolak belakang.',
        },
        {
          objek: 'batangSebaranGanda', judul: 'Grafik Membongkar Rahasia',
          teks: 'Untuk memperjelas, penjaga data menggambar dua deret batang kecil di papan ketiga. Batang kelompok A berdiri seragam seperti pagar rapi tanpa celah, sedangkan batang kelompok B naik-turun membentuk tangga yang lebar. Penonton yang tadi bubar kini kembali menengok, sebab grafik itu membongkar rahasia yang disembunyikan angka tunggal. Dua kelompok dengan rata-rata sama ternyata membawa dua cerita yang sangat berbeda.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Rata Sama Ternyata Beda Cerita!',
          teks: 'Halaman sekolah hari itu memberi bekal yang akan dipakai seumur hidup: dua kelompok bisa berbagi rata-rata yang sama persis, tujuh dengan tujuh, sementara kehidupan sehari-harinya berjauhan. Rentang nol dan rentang delapan adalah dua wajah yang tak mampu ditunjukkan oleh satu angka rata-rata. Hitungan itu hanya alat. Bantu saja. Owalah, ternyata begini toh, rata-rata itu pengantar, rentanglah yang menceritakan sisanya. Mudah, bukan?',
        },
      ],
    },
    'p3-097': {
      tema: 'lorongRaporSore',
      npc: { glif: 'ringkas!', ucap: ['Lima angka', 'satu cerita!'] },
      stasiun: [
        {
          objek: 'susunanSembilanKartu', judul: 'Sembilan Nilai Berbaris',
          teks: 'Sore menyala di lorong rapor sekolah, dan wali kelas menyusun sembilan kartu nilai latihan di atas meja panjang. Kartu itu berjajar rapi dari kecil ke besar: empat, lima, lima, enam, tujuh, delapan, delapan, sembilan, sepuluh. Sembilan kartu terasa banyak untuk dibaca satu per satu setiap kali ada yang bertanya. Wali kelas lalu mengangkat papan kecilnya dan berkata, cukup lima angka untuk menceritakan semuanya.',
        },
        {
          objek: 'kartuMedianTujuh', judul: 'Yang Tepat di Tengah',
          teks: 'Jari pertama menunjuk kartu kelima, dan itu langsung menjadi angka pertama: tujuh, nilai yang berdiri tepat di tengah sembilan kartu. Empat nilai berjajar di kirinya dan empat di kanannya, sehingga separuh siswa berada di bawahnya dan separuh lagi di atasnya. Angka kedua dan ketiga menempel di ujung barisan: empat sebagai nilai paling kecil dan sepuluh sebagai nilai paling besar. Tiga angka sudah berdiri di papan, tinggal dua lagi.',
        },
        {
          objek: 'kotakKuartilGanda', judul: 'Memotong Barisan Dua Kali',
          teks: 'Jari kedua memotong barisan kartu menjadi dua regu, dan setiap regu diukur tengahnya juga. Regu bawah berisi empat, lima, lima, enam, dan tengahnya bertemu di lima. Regu atas berisi delapan, delapan, sembilan, sepuluh, dan tengahnya bertemu di delapan. Kuartil bawah lima dan kuartil atas delapan, dua potongan tadi adalah pinggiran kotak yang akan dilukis di papan.',
        },
        {
          objek: 'papanLimaAngka', judul: 'Kotak yang Menceritakan Semua',
          teks: 'Papan kecil itu akhirnya berisi lima angka berjajar: empat, lima, tujuh, delapan, sepuluh, dan dari angka-angka itu wali kelas menggambar kotak sederhana. Kotak membentang dari lima ke delapan dengan garis di tujuh, lalu dua kumis panjang menjulur ke empat dan ke sepuluh. Sembilan kartu kini diringkas tanpa membuang satu pun kebenarannya. Setiap orang yang lewat lorong sore itu cukup membaca satu kotak untuk memahami satu kelas.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Lima Angka Cukup Menceritakan!',
          teks: 'Lorong rapor sore itu menyimpan cara merangkum yang jujur: nilai terkecil empat, kuartil bawah lima, median tujuh, kuartil atas delapan, dan nilai terbesar sepuluh. Lima angka itu cukup menggantikan sembilan kartu, dan kotaknya bahkan menampakkan sebaran yang tak terlihat saat kartu dibaca satu per satu. Owalah, ternyata begini toh, data yang banyak bisa dipangkas tanpa menghilangkan ceritanya. Mudah, bukan?',
        },
      ],
    },
    'p3-098': {
      tema: 'galeriGrafikJujur',
      npc: { glif: 'sumbu!', ucap: ['Cek sumbunya', 'sebelum kagum!'] },
      stasiun: [
        {
          objek: 'duaBingkaiDonat', judul: 'Dua Bingkai, Satu Pasang Angka',
          teks: 'Siang itu galeri kecil di tepi jalan memajang dua bingkai grafik dari warung donat yang sama. Bingkai kiri dan bingkai kanan sama-sama menceritakan penjualan dua pekan: pekan pertama seratus donat, pekan kedua seratus lima donat. Angkanya satu pasang yang sama persis, tetapi kedua bingkai itu terlihat menceritakan dua kejadian yang berbeda jauh. Pengunjung galeri berdiri lama di antara keduanya, penasaran.',
        },
        {
          objek: 'bingkaiMenjulang', judul: 'Bingkai yang Menjulang',
          teks: 'Bingkai kiri memangkas sumbunya mulai dari seratus, sehingga batang pekan pertama tak tampak sama sekali dan batang pekan kedua menjulang penuh di atasnya. Pandangan pertama langsung berseru: penjualan meroket hebat! Padahal yang benar-benar terjadi hanya tambahan lima donat dari seratus. Batang itu tampak mengepul karena lantai bawahnya dipangkas, bukan karena donatnya bertambah banyak.',
        },
        {
          objek: 'bingkaiDariNol', judul: 'Bingkai yang Berangkat dari Nol',
          teks: 'Bingkai kanan memilih jalan sebaliknya: sumbunya berangkat dari nol, sehingga kedua batang berdiri hampir sama tinggi. Seratus dan seratus lima memang berselisih tipis, hanya lima persen dari batangnya, dan mata pun akhirnya melihat perbandingan yang jujur. Dari nol, tambahan lima donat tampak sekecil kenyataannya. Warung yang sama, angka yang sama, kesan yang berbeda jauh.',
        },
        {
          objek: 'papanCekSumbu', judul: 'Pertanyaan Penjernih Grafik',
          teks: 'Di bawah kedua bingkai, pemilik galeri menempel papan berisi tiga pertanyaan penjernih: sumbu ini mulai dari nol atau dipangkas, selisih batangnya berapa persen, dan batangnya utuh atau terpotong. Tiga pertanyaan itu cukup untuk menyelidiki grafik mana pun yang berusaha terlihat lebih heboh dari kenyataannya. Hitungan itu hanya alat. Bantu saja. Berita, iklan, dan papan angka di mana pun akan jadi lebih jujur bila ketiganya selalu diajukan lebih dulu.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Angka Sama, Ceritanya Beda!',
          teks: 'Galeri tepi jalan itu menyimpan kejutan paling berguna: dua grafik dengan angka seratus dan seratus lima yang sama persis bisa terlihat seperti dua berita berbeda, hanya karena satu sumbu dipangkas dan satu sumbu berangkat dari nol. Grafik tidak berbohong dengan angkanya, tetapi lantainya bisa membesar-besarkan cerita. Owalah, ternyata begini toh, cek sumbunya dulu, baru terkejut atau tenang. Mudah, bukan?',
        },
      ],
    },
    'p3-099': {
      tema: 'pelataranKoinSiang',
      npc: { glif: 'dua koin', ucap: ['Daftar dulu,', 'hitung kemudian!'] },
      stasiun: [
        {
          objek: 'duaKoinGubuk', judul: 'Dua Koin di Pelataran',
          teks: 'Siang terik membuat anak-anak pelataran gubuk bermain di bawah pohon, dan permainan estafet mereka menunggu satu hal: siapa berlari duluan. Dua koin tua diambil dari saku, sisi bergambar pohon disebut sisi gambar, dan sisi angka disebut sisi angka. Kedua koin akan dilempar bersamaan, dan semua mata menunggu. Sebelum melempar, anak tertua mengangkat tangan: mari kita daftar dulu semua hasil yang mungkin.',
        },
        {
          objek: 'pohonKoinEmpatJalur', judul: 'Pohon Empat Jalur',
          teks: 'Di tanah, anak tertua menggambar pohon dengan ranting kayu: koin pertama bercabang dua, gambar atau angka, lalu koin kedua bercabang dua lagi dari tiap cabang. Empat jalur pun berdiri: gambar-gambar, gambar-angka, angka-gambar, dan angka-angka. Jalur gambar-angka dan angka-gambar dihitung berbeda walaupun isi kelihatannya mirip, sebab koin pertama dan koin kedua adalah dua benda berbeda. Semua kemungkinan kini tampak berjajar di tanah, tak ada yang tersembunyi.',
        },
        {
          objek: 'papanSatuPerEmpat', judul: 'Satu dari Empat',
          teks: 'Hitungan pun lahir dari daftar itu. Dua koin sama-sama gambar hanya melalui satu jalur dari empat, peluangnya satu per empat, sama seperti dua koin sama-sama angka. Yang bercampur, satu gambar satu angka, melalui dua jalur sekaligus, peluangnya dua per empat. Maka lemparan campur dua kali lebih sering mungkin terjadi daripada lemparan kembar, bukan karena rahasia, melainkan karena jalurnya lebih banyak.',
        },
        {
          objek: 'pengingatAlatJujur', judul: 'Alat, Bukan Penentu',
          teks: 'Anak-anak melempar koin itu lagi dan lagi, dan daftar di tanah tidak pernah berkata jalur mana yang akan keluar berikutnya. Pohon kemungkinan hanya menampakkan semua jalan; yang memilih jalan bukan hitungan, dan tak seorang pun bisa memaksa koin. Hitungan itu hanya alat. Bantu saja. Anak tertua menepuk papan tanahnya: lengkapi daftarnya dulu, barulah bicara peluang.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Hitungannya Kemungkinan, Bukan Kepastian!',
          teks: 'Pelataran siang itu memberi pelajaran dua lapis: daftar lengkap dulu baru hitung, dan hasil lemparan selalu tetap rahasia sampai koin jatuh. Empat jalur, satu per empat untuk kembar, dua per empat untuk campur, dan seluruhnya berjumlah empat per empat, penuh sempurna. Owalah, ternyata begini toh, peluang menghitung kemungkinan, bukan menentukan kepastian. Mudah, bukan?',
        },
      ],
    },
    'p3-100': {
      tema: 'puncakDataMalam',
      npc: { glif: 'enam!', ucap: ['Semua sudah', 'kau pelajari!'] },
      stasiun: [
        {
          objek: 'papanMisiPadanan', judul: 'Misi Pertama: Padanan',
          teks: 'Malam paling jernih di puncak Pegunungan Pola, dan gerbang juara berdiri terbuka dengan lima papan misi menyala. Papan pertama menantang petualang menghitung padanan lemari: tiga kemeja dan dua celana. Satu kemeja menyapa dua celana, tiga kemeja menyapa enam kali. Angka enam pertama menyala di papan, dan langit malam ikut berkelip.',
        },
        {
          objek: 'papanMisiBarisan', judul: 'Misi Kedua: Barisan',
          teks: 'Papan kedua mengingatkan podium foto: tiga sahabat menempati tiga tempat, kiri, tengah, dan kanan. Tiga pilihan untuk kiri, dua untuk tengah, satu untuk kanan, dan tiga kali dua kali satu kembali menuntun ke enam. Angka enam kedua menyala berdampingan dengan yang pertama. Petualang tertawa kecil, sebab dua misi yang berbeda ternyata berujung pada tamu yang sama.',
        },
        {
          objek: 'papanMisiPasangan', judul: 'Misi Ketiga: Pasangan',
          teks: 'Papan ketiga memanggil kembali lapangan sore: empat nama, dua dipilih, urutan tak diperhatikan. Dua belas urutan dibagi dua, dan enam pasang berjabat tangan di ingatan. Untuk ketiga kalinya angka enam menyala, dan kini tiga papan berdiri bersaudara. Enam, enam, enam: tamu istimewa puncak yang datang lewat tiga pintu berbeda.',
        },
        {
          objek: 'papanMisiRentang', judul: 'Misi Keempat dan Kelima',
          teks: 'Papan keempat memakai dua kelompok nilai: rentang dari tiga sampai sebelas, hitungannya delapan. Papan kelima melempar dua koin bayangan di langit: dua koin sama-sama gambar hanya punya satu jalur dari empat, peluangnya satu per empat. Lima papan menyala penuh, dan gerbang juara berdenyut emas. Puncak menunggu langkah terakhir, yang hanya boleh dilalui siapa pun yang sudah jujur menghitung.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Puncak Ini Punya Nama: Hitung!',
          teks: 'Malam di puncak Pegunungan Pola menutup perjalanan panjang dengan lima misi yang menyala: enam padanan dari lemari, enam urutan dari podium, enam pasang dari lapangan, rentang delapan dari dua papan, dan satu per empat dari dua koin. Tiga angka enam lewat tiga pintu berbeda membuktikan satu hal, hitungan yang jujur selalu bertemu di tempat yang sama. Hitungan itu hanya alat. Bantu saja. Owalah, ternyata begini toh, puncak tertinggi pun bisa didaki dengan menghitung satu per satu. Mudah, bukan?',
        },
      ],
    },
    'p4-001': {
      tema: 'arsipSuratPagi',
      npc: { glif: 'pilah!', ucap: ['Pilah suratnya,', 'dengan jujur!'] },
      stasiun: [
        {
          objek: 'rakSuratKota', judul: 'Rak Surat di Kantor Kota',
          teks: 'Pagi di kantor pos kota dimulai dengan bunyi kresek pintu, dan tumpukan surat mengalir ke atas meja kayu yang sudah tua. Petugas muda memilah surat itu ke dalam dua rak berbeda, satu di kiri dan satu di kanan, sambil membacanya satu per satu dengan cermat. Ada surat yang isinya kabar biasa seperti kucing tetangga punya empat kaki, dan ada pula surat yang isinya pertanyaan atau ajakan. Rak kiri dan rak kanan ternyata menyimpan dua jenis kalimat yang berbeda watak.',
        },
        {
          objek: 'papanTigaKalimat', judul: 'Papan yang Memilah Tiga Rupa',
          teks: 'Di dinding kantor tergantung papan kayu dengan tiga saku berwarna, masing-masing diberi nama yang jelas. Saku pertama menampung kalimat berita yang bisa dinilai benar atau salah, saku kedua menampung pertanyaan yang menunggu jawaban, dan saku ketiga menampung perintah yang meminta gerakan. Kalimat yang bisa dinilai benar atau salah itu namanya pernyataan. Pertanyaan dan perintah bukan pernyataan, karena keduanya tak bisa distempel benar atau salah.',
        },
        {
          objek: 'stempelBenarSalah', judul: 'Stempel yang Hanya Bekerja Setengah Waktu',
          teks: 'Petugas muda mengambil stempel kayu bermuka dua, satu sisi BENAR dan satu sisi lagi SALAH, lalu mencobanya pada surat berita. Surat bertuliskan enam lebih banyak dari empat langsung menerima cap BENAR, dan surat bertuliskan sepuluh lebih kecil dari dua menerima cap SALAH. Tapi saat tiba di surat bertuliskan berapa umurmu, stempel itu diam saja dan tak mau menempel. Stempel jujur itu tahu batas kerjanya: ia hanya bertugas pada pernyataan.',
        },
        {
          objek: 'tumpukanPertanyaan', judul: 'Tumpukan yang Tak Butuh Penilaian',
          teks: 'Surat pertanyaan dan surat perintah ditaruh di tumpukan terpisah di ujung meja, dan tumpukan itu tidak sama sekali jelek atau salah. Mereka hanya punya tugas lain: pertanyaan menunggu jawaban, dan perintah menunggu tindakan dari tangan yang membaca. Tak ada satu pun dari mereka yang butuh nilai benar atau salah untuk bekerja. Kota itu berjalan tertib karena setiap kalimat tahu tugasnya masing-masing.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kalimat Ternyata Punya Watak Sendiri!',
          teks: 'Hari itu kantor pos mengajarkan pelajaran yang sederhana namun besar: tidak semua kalimat diciptakan sama, dan hanya pernyataan yang bisa dinilai benar atau salah. Pertanyaan menunggu jawaban, perintah menunggu gerakan, dan pernyataan menunggu stempel. Owalah, ternyata begini toh caranya mengenali kalimat, cukup tanyakan bisakah ia dinilai benar atau salah. Mudah, bukan?',
        },
      ],
    },
    'p4-002': {
      tema: 'tamanLampuHias',
      npc: { glif: 'hubung!', ucap: ['Sambung kata', 'dengan tepat!'] },
      stasiun: [
        {
          objek: 'lampuMerahKuning', judul: 'Dua Lampu di Taman Sore',
          teks: 'Senja turun perlahan di taman kota, dan di gerbang taman menggantung dua lampu hias: satu merah, satu kuning. Lampu-lampu itu bekerja bebas, kadang keduanya menyala bersama, kadang hanya satu yang berani hidup, kadang keduanya beristirahat sekaligus. Anak-anak yang lewat menghitung semua kemungkinan itu di papan kecil: nyala dan nyala, nyala dan mati, mati dan nyala, mati dan mati. Empat kemungkinan saja, tapi kata sambung kecil bisa mengubah semuanya.',
        },
        {
          objek: 'papanTigaKata', judul: 'Tiga Kata Sambung yang Bertugas',
          teks: 'Di batang gerbang tertempel papan kayu dengan tiga kata besar: DAN, ATAU, dan TIDAK. Kata DAN itu peminta sempurna, ia hanya puas bila dua-duanya menyala sekaligus. Kata ATAU lebih santai, ia puas bila salah satu menyala, dan bila dua-duanya menyala pun tetap boleh. Kata TIDAK adalah pembalik, ia melihat nyala lalu menyebutnya mati, melihat mati lalu menyebutnya nyala.',
        },
        {
          objek: 'gerbangCahayaGanda', judul: 'Dua Gerbang, Dua Sifat',
          teks: 'Gerbang pertama taman hanya terbuka bila lampu merah DAN lampu kuning menyala bersamaan, dan sore itu gerbang itu kerap menolak pengunjung yang datang terlalu cepat. Gerbang kedua lebih ramai pengunjung, karena ia terbuka bila merah ATAU kuning ada yang menyala, cukup satu saja. Dua gerbang memakai lampu yang sama tapi berperilaku berbeda, semata karena kata sambungnya berbeda. Kata kecil memang bisa mengubah watak seluruh gerbang.',
        },
        {
          objek: 'kotakBalikTidak', judul: 'Kotak Pembalik yang Setia',
          teks: 'Di sisi taman ada kotak kayu berisi satu tombol dan satu lampu kecil, dan di kotak itu tertulis satu aturan pendek: TIDAK. Bila tombolnya ditekan hingga nyala, lampu kecilnya justru mati; bila tombolnya dilepas hingga mati, lampu kecilnya justru menyala. Pembalik itu bekerja tanpa lelah dan tak pernah salah satu kali pun sepanjang sore. Anak-anak menamainya kotak kebalik, dan kotak itu tak pernah protes.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tiga Kata Kecil Mengatur Seluruh Taman!',
          teks: 'Malam itu taman kota menyala rapi, dan di balik keriuhan cahaya ada tiga kata kecil yang bekerja: DAN yang meminta lengkap, ATAU yang cukup sebagian, dan TIDAK yang selalu membalik. Sambungan itu bukan hiasan, melainkan aturan yang menentukan kapan gerbang terbuka dan kapan lampu berhenti. Owalah, ternyata begini toh cara lampu berbicara, cukup kenali dan, atau, dan tidak. Mudah, bukan?',
        },
      ],
    },
    'p4-003': {
      tema: 'kafeJendelaHujan',
      npc: { glif: 'janji!', ucap: ['Jika hujan,', 'payung siap!'] },
      stasiun: [
        {
          objek: 'jendelaTetesanKafe', judul: 'Jendela yang Menetes',
          teks: 'Hujan siang itu membasahi seluruh jalan kota, dan di jendela kafe sudut jalan tetes-tetes air berlomba merayap ke bawah. Di dinding kafe menggantung dua payung tua dengan papan kecil di antaranya, tertulis satu kalimat tegas: jika hujan, payung boleh dipinjam. Pemilik kafe menulisnya sekali saja, tapi kalimat itu bekerja setiap kali langit berubah warna. Sejak pagi tak ada satu pun tetes yang jatuh, dan payung-payung itu diam menunggu.',
        },
        {
          objek: 'papanJanjiPayung', judul: 'Janji yang Bersyarat',
          teks: 'Kalimat di papan itu punya dua bagian yang menyatu: bagian jika yang menyebut syaratnya, dan bagian maka yang menyebut isi janjinya. Syaratnya hujan, isi janjinya payung boleh dipinjam. Bentuk seperti itu namanya jika-maka, dan kota penuh dengan janji begini: jika malam tiba, lampu jalan menyala; jika dapur berasap, jendela dibuka. Janji bersyarat itu seperti pintu, ia baru berbicara saat syaratnya datang.',
        },
        {
          objek: 'payungTungguGantung', judul: 'Kapan Janji Mulai Diuji',
          teks: 'Seorang pelanggan menatap payung itu sambil bertanya-tanya, dan pagi yang cerah itu tak bisa dijadikan bukti apa-apa. Saat langit cerah, janji itu belum teruji sama sekali, tak bisa disebut dipenuhi dan tak bisa disebut dipatahkan. Janji baru mulai dinilai saat syaratnya benar-benar datang, yaitu saat hujan turun. Maka tunggu saja, langit kota selalu punya waktunya sendiri.',
        },
        {
          objek: 'jalurBasahPayung', judul: 'Langit Menepati Porsinya',
          teks: 'Lantai kafe memantul basah, dan payung pertama dicabut dari gantungannya oleh pengunjung yang datang kuyup. Janji di papan itu baru saja dipenuhi di depan semua orang: hujan benar-benar turun, dan payung benar-benar boleh dipinjam. Kalimat jika-maka yang dipenuhi terasa seperti teman yang datang tepat waktu. Kota yang basah itu nyaman, karena janji-janjinya jalan terus tanpa perlu diingatkan.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Janji Kecil Punya Pola yang Rapi!',
          teks: 'Sore itu hujan reda dan kafe kembali tenang, sementara papan kecilnya tetap tergantung setia menunggu hujan berikutnya. Pelajarannya jelas: jika-maka adalah janji bersyarat yang hanya dinilai saat syaratnya datang, dan saat syaratnya belum datang, janji itu diam dengan sopan. Owalah, ternyata begini toh bentuk sebuah janji, pisahkan syaratnya lalu tunggu waktunya. Mudah, bukan?',
        },
      ],
    },
    'p4-004': {
      tema: 'jalananSoreSemprot',
      npc: { glif: 'plesetan!', ucap: ['Cek kebalikannya', 'jangan buru-buru!'] },
      stasiun: [
        {
          objek: 'petugasSemprot', judul: 'Mobil Semprot di Sore Hari',
          teks: 'Sore itu matahari mulai merendah dan sebuah mobil semprot petugas kebersihan melaju pelan menyusuri jalan utama kota. Airnya menyembur lebar ke kiri dan ke kanan, meninggalkan jejak basah yang memantulkan cahaya jingga. Langit sepanjang sore itu jernih, tanpa satu awan hujan pun. Jalan jadi basah, tapi bukan karena langit yang bekerja.',
        },
        {
          objek: 'papanDuaArahKalimat', judul: 'Dua Papan yang Tampak Kembar',
          teks: 'Di tepi jalan berdiri dua papan informasi yang tulisannya nyaris kembar. Papan pertama tertulis: jika hujan, maka jalan basah. Papan kedua tertulis: jika jalan basah, maka hujan. Ramai orang lewat tanpa membaca dua kali, karena sepintas keduanya tampak seperti kalimat yang sama. Padahal arah pernyataannya berbalik, dan arah itulah yang penting.',
        },
        {
          objek: 'jalanBasahBerkilau', judul: 'Hari Ini Semprot, Bukan Hujan',
          teks: 'Papan pertama aman-aman saja hari itu, sebab tak ada hujan yang datang dan tak ada janji yang teruji. Tapi papan kedua langsung tumbang: jalan benar-benar basah, sementara hujan sama sekali tak turun. Seorang anak menunjuk mobil semprot yang menjauh dan tertawa lepas, papan kedua baru saja dikalahkan oleh satu sore yang basah. Kebalikan sebuah pernyataan memang mirip aslinya, tapi ia tidak otomatis ikut benar.',
        },
        {
          objek: 'sepedaLewatCepat', judul: 'Kesimpulan yang Aman Dipinjam',
          teks: 'Ada satu kesimpulan yang tetap kuat berdiri di sore itu: kalau jalanan kering, pasti langit tadi tidak hujan. Kesimpulan searah itu aman, karena jalan kering tak mungkin hadir bersama hujan yang benar-benar turun. Jadi dari satu pernyataan, ada kebalikan yang plesetan dan ada balik arah yang tetap setia. Yang membedakannya hanyalah arah alasan, dan arah itu harus dibaca dengan tenang.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Papan Kembar Ternyata Beda Watak!',
          teks: 'Malam turun di jalan yang perlahan mengering, dan dua papan tadi tetap berdiri berdampingan seperti tak terjadi apa-apa. Pelajarannya tinggal satu: kebalikan sebuah kalimat mirip aslinya, tapi kebenarannya harus dicek sendiri, tak bisa sekadar dititipkan. Owalah, ternyata begini toh cara membaca jika-maka, hati-hati pada arahnya sebelum menyimpulkan. Mudah, bukan?',
        },
      ],
    },
    'p4-005': {
      tema: 'galeriBurungPagi',
      npc: { glif: 'satu cukup!', ucap: ['Satu tandingan', 'cukup!'] },
      stasiun: [
        {
          objek: 'rakAngsaPutih', judul: 'Papan yang Percaya Diri',
          teks: 'Pagi di galeri alam kota, dan di ruang tengah menggantung papan kayu besar dengan tulisan tegas: semua angsa berwarna putih. Di bawahnya barisan angsa berdiri anggun, putih semua, dari ujung kiri sampai ujung kanan. Pengunjung pagi mengangguk-angguk, sebab mata mereka melihat putih di mana-mana. Papan itu tampak tak terbantahkan, dan semuanya berjalan damai selama bertahun-tahun.',
        },
        {
          objek: 'angsaHitamDatang', judul: 'Kotak dari Kota Jauh',
          teks: 'Suatu pagi tiba kotak pengiriman besar berstempel kota jauh di belahan dunia lain, dan isinya membuat galeri ribut sekejap. Sebuah angsa turun dari kotak itu dengan bulu hitam mengkilap dari kepala sampai ujung ekornya. Satu burung saja, tapi satu burung itu cukup untuk menjatuhkan tulisan besar di papan. Semua angsa putih? Kini tinggal cerita setengah jalan.',
        },
        {
          objek: 'papanSemuaVsAda', judul: 'Semua dan Ada Tak Sama Genggamannya',
          teks: 'Kurator galeri lalu mengganti papan itu dengan dua papan kecil yang lebih jujur. Papan pertama menuliskan kata ada: ada angsa putih, dan cukup satu contoh untuk membuat kata itu berdiri tegak. Papan kedua kini berhati-hati: banyak angsa putih, karena kata semua menuntut seluruh dunia setuju, dan cukup satu tandingan untuk menjatuhkannya. Kata semua dan kata ada ternyata memikul beban yang sangat berbeda.',
        },
        {
          objek: 'katalogSpesimen', judul: 'Katalog yang Kini Lebih Jujur',
          teks: 'Rak katalog galeri diperbarui sore itu, dan baris baru ditambahkan dengan tinta segar. Di sana kini tertulis bahwa angsa datang dalam beberapa warna, dan satu di antaranya hitam mengkilap dari kota jauh. Pengunjung lama membaca ulang katalog itu dan tersenyum, sebab galeri mereka jadi lebih jujur berkat satu burung. Sains kota belajar berdiri lagi dengan sikap yang lebih rendah hati.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Satu Burung Menggugurkan Sebuah Papan!',
          teks: 'Malam itu lampu galeri dimatikan satu per satu, dan angsa hitam itu tidur nyenyak di kandang barunya. Pelajarannya terpatri rapi: klaim tentang semua mudah jatuh oleh satu tandingan, dan klaim tentang ada cukup satu contoh untuk berdiri. Owalah, ternyata begini toh caranya menimbang kata semua dan ada, satu contoh bisa mengubah segalanya. Mudah, bukan?',
        },
      ],
    },
    'p4-006': {
      tema: 'pabrikDominoSiang',
      npc: { glif: 'rantai!', ucap: ['Satu dorongan,', 'semua jatuh!'] },
      stasiun: [
        {
          objek: 'barisanDomino', judul: 'Barisan Kartu yang Antre',
          teks: 'Di ruang produksi pabrik kartu kota, sebuah barisan panjang kartu domino berdiri tegak di atas lantai licin. Kartu-kartu itu baru selesai dicetak dan sedang menjalani ujian khusus: ujian keajekan berdiri. Barisannya lurus sempurna dari pintu sampai seberang ruangan, dan tiap kartu berjarak tetap dari kartu di depannya. Semua diam, menunggu satu peristiwa kecil yang akan mengubah semuanya.',
        },
        {
          objek: 'tombolDorongPertama', judul: 'Satu Dorongan Kecil',
          teks: 'Seorang pekerja menekan tombol kecil di kartu pertama, dan kartu itu condong, goyah, lalu jatuh dengan bunyi tok yang ringan. Kartu kedua terdorong tepat oleh kartu pertama, kartu ketiga oleh kartu kedua, dan begitu terus menyusuri barisan. Tak ada kartu yang jatuh sendiri; setiap kartu jatuh karena kartu di depannya yang jatuh lebih dulu. Bunyi tok-tok itu terdengar seperti barisan alasan yang sedang berjalan.',
        },
        {
          objek: 'papanRantaiAlasan', judul: 'Papan yang Meniru Barisan',
          teks: 'Di dinding pabrik tergantung papan besar bertuliskan langkah satu, langkah dua, langkah tiga, seperti barisan kartu yang dipindahkan ke kalimat. Matematika menyusun bukti dengan cara yang sama: setiap langkah berdiri di atas langkah sebelumnya, dan tiap langkah tidak boleh dipungkiri oleh siapa pun. Cukup satu langkah bohong, dan seluruh rantai ikut ragu sampai ke ujung. Karena itu pembuat bukti bekerja pelan-pelan, satu kartu demi satu kartu.',
        },
        {
          objek: 'lampuPabrikMenyala', judul: 'Ujung Rantai Akhirnya Menyala',
          teks: 'Kartu terakhir tumbang ketika sore sudah beranjak, dan bersamaan dengan itu lampu di ujung ruangan menyala hijau, tanda ujian lulus. Kesimpulan paling akhir itu seperti kartu terakhir: ia baru sah setelah seluruh rantai di depannya selesai bekerja. Menghitung berapa kartu yang jatuh tadi memang seru, tapi hitungan itu hanya alat. Bantu saja. Yang penting adalah rantainya, bukan sekadar jumlahnya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Alasan Berantai Ternyata Berbunyi Tok!',
          teks: 'Petugas memungut kartu-kartu itu satu per satu sambil tersenyum, esok akan diuji lagi dalam barisan yang lebih panjang. Pelajarannya menggema di ruang yang kini kosong: bukti adalah rantai alasan yang tiap matanya tak bisa dipungkiri, dan kesimpulan datang hanya setelah rantai tuntas. Owalah, ternyata begini toh cara alasan berjalan, satu dorongan kecil lalu berantai sampai ujung. Mudah, bukan?',
        },
      ],
    },
    'p4-007': {
      tema: 'lorongDominoMalam',
      npc: { glif: '+1 lagi!', ucap: ['Dua janji,', 'semua jatuh!'] },
      stasiun: [
        {
          objek: 'lorongDominoPanjang', judul: 'Lorong yang Tak Terlihat Ujungnya',
          teks: 'Malam di gudang pabrik, dan satu lorong kartu domino memanjang jauh ke kegelapan, lebih panjang dari yang bisa dilihat mata. Barisan itu tersusun dari kartu nomor satu, kartu nomor dua, kartu nomor tiga, dan terus tanpa terlihat berakhir di mana. Penjaga gudang menyebutnya lorong tak berujung, sebab barisan memang bisa dibuat terus dan terus. Pertanyaannya satu: kalau kartu pertama jatuh, berapa kartu yang akan mengikuti?',
        },
        {
          objek: 'kartuPertamaMenyala', judul: 'Janji Pertama: Kartu Awal Berani',
          teks: 'Penjaga menyalakan lampu kecil di kartu pertama, dan kartu itu jatuh seketika ketika disentuh ujung tongkatnya. Janji pertama pun tercatat di papan catatan: kartu pertama jatuh. Janji ini kelihatan sepele, hanya bicara tentang satu kartu di ujung depan. Tapi tanpa janji kecil ini, seluruh lorong akan berdiri diam selamanya.',
        },
        {
          objek: 'mistarJarakSama', judul: 'Janji Kedua: Jarak yang Setia',
          teks: 'Mistar panjang diletakkan menyusuri lantai, dan jarak antar kartu terbukti sama rata dari awal sampai ujung yang tak terlihat itu. Dari kesetiaan jarak itu lahir janji kedua: kalau kartu mana pun jatuh, maka tetangga di belakangnya pasti ikut jatuh. Janji ini tidak bicara tentang kartu tertentu, ia bicara tentang pasangan kartu mana saja di lorong itu. Dua janji kecil itu saja, tak lebih.',
        },
        {
          objek: 'ujungLorongTerang', judul: 'Maka Seluruh Lorong Tumbang',
          teks: 'Sekarang coba ikuti akibatnya pelan-pelan: kartu satu jatuh, maka kartu dua ikut; kartu dua jatuh, maka kartu tiga ikut, dan begitu terus tanpa henti sampai kartu ke seratus, ke seribu, dan lebih jauh lagi. Tak perlu menghitung satu per satu selamanya, cukup dua janji itu bekerja bersama. Cara berpikir begini punya nama resmi di matematika: induksi, tangga yang bisa didaki tanpa batas. Hitungan panjang? Hitungan itu hanya alat. Bantu saja.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Dua Janji Kecil Menjatuhkan Lorong Panjang!',
          teks: 'Fajar menyingsing ketika bunyi tok-tok terakhir hilang di ujung gudang, dan lorong itu terbentang tumbang seluruhnya. Pelajarannya sederhana namun dahsyat: janji tentang kartu pertama ditambah janji tentang tetangga, dua-duanya cukup untuk menguasai lorong tanpa ujung. Owalah, ternyata begini toh induksi bekerja, pijakkan langkah pertama lalu titipkan sisanya pada pola. Mudah, bukan?',
        },
      ],
    },
    'p4-008': {
      tema: 'menaraLantaiMalam',
      npc: { glif: 'M+1!', ucap: ['Anggap saja,', 'lalu cek!'] },
      stasiun: [
        {
          objek: 'menaraLantaiBanyak', judul: 'Menara yang Memancing Debat',
          teks: 'Malam di alun-alun kota, dan menara tangga raksasa itu berdiri dengan lantai demi lantai yang naik ke kegelapan. Warga suka berdebat satu hal: adakah lantai paling atas di menara ini? Ada yang bilang pasti ada, ada yang bilang tak mungkin ada, dan debat itu berlarut tanpa pemenang. Maka datanglah seorang pembaca papan dengan satu taktik aneh yang terkenal.',
        },
        {
          objek: 'papanAnggapSaja', judul: 'Taktik Aneh: Anggap Saja Ada',
          teks: 'Taktiknya tertulis di papan: anggap saja kita setuju bahwa ada lantai paling atas, kita beri nama lantai M. Sepakat? Sepakat. Lalu papan itu melanjutkan dengan pertanyaan pendek yang mengubah segalanya: dari lantai M, bisakah kita naik satu tangga lagi? Tentu bisa, tangganya masih menyambung ke atas. Berarti ada lantai M plus satu, dan ia lebih tinggi dari M.',
        },
        {
          objek: 'tanggaNaikSatu', judul: 'Kejanggalan yang Lahir Sendiri',
          teks: 'Di sinilah warga terdiam serentak: M plus satu lebih tinggi dari M, padahal M dijanjikan sebagai yang paling atas. Kejanggalan itu tidak dibawa dari luar, ia lahir dari anggapan yang kita setujui sendiri tadi. Satu-satunya pelaku yang masuk akal adalah anggapannya itu, maka anggapan pun gugur. Menara ternyata tak punya lantai teratas, dan tangganya memang dibangun untuk tak berujung.',
        },
        {
          objek: 'tandaKejanggalan', judul: 'Bilangan Pun Ikut Tersenyum',
          teks: 'Taktik yang sama bekerja di dunia angka, dan warga kota memakainya setiap kali ada yang mengaku punya bilangan bulat terbesar. Anggap saja ada, namai M, lalu tambahkan satu: M plus satu lebih besar dari M, jadi M bukan yang terbesar. Anggapan itu selalu kalah, berapa pun M yang ditunjuk. Menambah satu memang hitungan paling kecil di dunia, tapi hitungan itu hanya alat. Bantu saja. Yang besar justru gagasan pura-pura setuju lalu memeriksa.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Pura-pura Setuju Ternyata Taktik Tajam!',
          teks: 'Lampu menara mati paling akhir malam itu, dan tangganya tetap memanjat ke gelap tanpa terlihat habis. Pelajaran malam ini layak dibawa pulang: kalau sebuah anggapan melahirkan kejanggalan sendiri, anggapan itulah yang harus pulang duluan. Owalah, ternyata begini toh kontradiksi bekerja, setujui sebentar lalu biarkan kejanggalannya bicara. Mudah, bukan?',
        },
      ],
    },
    'p4-009': {
      tema: 'alunAlunPapanRaksasa',
      npc: { glif: 'sepakat!', ucap: ['Aturan kecil,', 'gedung besar!'] },
      stasiun: [
        {
          objek: 'lapakPapanGaris', judul: 'Papan Raksasa di Alun-Alun',
          teks: 'Pagi cerah di alun-alun kota, dan di tengahnya terhampar papan permainan raksasa yang garis-garisnya dicat putih di atas rumput. Di tepi papan tergantung kartu aturan main, dan warga berkeliling membacanya sambil menikmati angin pagi. Papan ini bukan sekadar tempat main, melainkan tempat kota berlatih menyepakati hal-hal kecil. Kartu pertamanya menantikan siapa pun yang mau membaca.',
        },
        {
          objek: 'duaPatokSatuTali', judul: 'Dua Patok, Satu Tali, Satu Garis',
          teks: 'Kartu pertama berbunyi begini: pilih dua patok di papan, lalu tarik satu tali melewati keduanya. Warga mencobanya berulang-ulang, dan hasilnya selalu sama: lewat dua patok itu ada tepat satu garis lurus, bukan dua, bukan nol. Tali kedua mau diletakkan ke arah mana pun selalu jatuh menimpa tali yang pertama. Kartu itu kemudian ditempel di dinding balai kota sebagai aturan yang disepakati bersama.',
        },
        {
          objek: 'kartuAturanDisepakati', judul: 'Sepakat di Awal, Bukan Hasil Hitung',
          teks: 'Ada yang bertanya, dari mana aturan itu berasal, dan jawabannya mengejutkan banyak orang. Aturan main seperti itu tidak lahir dari hitungan, ia disepakati di awal sebagai titik berangkat, sama seperti aturan main ludo yang tak pernah diperdebatkan di tengah permainan. Matematika menyebut aturan awal semacam ini aksioma, fondasi yang dipilih sederhana agar semua orang bisa mengikutinya. Dari sepakat yang kecil itu, seluruh permainan baru dimulai.',
        },
        {
          objek: 'tendaCaturKota', judul: 'Gedung Besar dari Aturan Kecil',
          teks: 'Sore itu warga membangun bentuk-bentuk di papan raksasa: segitiga, garis bagi, dan jalur lompat dari satu patok ke patok lain. Semua bentuk itu ternyata tunduk pada kartu aturan yang disepakati pagi tadi, tanpa satu pun bentuk yang membangkang. Matematika bekerja dengan cara yang sama: dari aksioma sederhana, teorema demi teorema dibangun seperti gedung bertingkat. Fondasinya kecil dan jujur, tapi menopang segalanya di atasnya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Aturan Kecil Menopang Gedung Besar!',
          teks: 'Petang menyapu alun-alun, dan papan raksasa itu ditinggalkan dengan bentuk-bentuk sore hari yang rapi. Pelajarannya terpatri di hati semua yang lewat: permainan dan matematika sama-sama berdiri di atas aturan yang disepakati di awal. Owalah, ternyata begini toh aksioma itu, aturan kecil yang jujur tempat segala sesuatu memulai. Mudah, bukan?',
        },
      ],
    },
    'p4-010': {
      tema: 'pengadilanBukti',
      npc: { glif: 'hakim!', ucap: ['Lima misi', 'menantimu!'] },
      stasiun: [
        {
          objek: 'papanMisiPilah', judul: 'Misi Pertama: Pilah Kalimatnya',
          teks: 'Ruang pengadilan bukti kota dibuka untuk umum, dan di muka pintu tergantung papan misi pertama. Tugasnya memilah kalimat yang berdatangan: mana pernyataan yang bisa dinilai benar atau salah, mana pertanyaan yang menunggu jawaban, dan mana perintah yang menunggu gerakan. Stempel BENAR dan SALAH tersedia di mejanya, tapi hanya boleh dipakai pada pernyataan. Siapa yang salah menempel, papan itu akan menegur dengan sopan.',
        },
        {
          objek: 'papanMisiJanji', judul: 'Misi Kedua: Pasang Janji Jika-Maka',
          teks: 'Misi kedua menantang pengunjung menyusun janji bersyarat dari potongan kalimat yang berserakan di meja panjang. Bagian jika harus dipasang dengan syaratnya, bagian maka dengan isi janjinya, dan arahnya tak boleh terbalik. Pengunjung juga diuji dengan papan kembar ala jalan semprot: kebalikan sebuah janji tak boleh langsung dianggap ikut benar. Yang berhasil menata arahnya dengan benar akan mendapat cap kecil berbentuk payung.',
        },
        {
          objek: 'papanMisiTandingan', judul: 'Misi Ketiga: Buru Satu Tandingan',
          teks: 'Misi ketiga memajang klaim besar bertuliskan semua burung di taman ini bertelur hijau, lengkap dengan keranjang telur tiruan. Tugas pengunjung mencari satu tandingan di antara foto-foto burung taman yang terpampang, cukup satu saja, tidak lebih. Saat foto burung yang bertelur biru ditemukan, klaim besar itu roboh dengan bunyi bel kecil. Satu tandingan memang cukup, dan papan itu mencatat namanya sebagai pemburu tandingan resmi.',
        },
        {
          objek: 'papanMisiKontradiksi', judul: 'Misi Keempat dan Kelima: Rantai dan Kejanggalan',
          teks: 'Dua misi terakhir menempati ruang paling dalam yang cahayanya kuning hangat. Misi keempat meminta pengunjung menjatuhkan barisan kartu alasan dari premis pertama sampai kesimpulan, tanpa satu langkah pun yang melompat. Misi kelima menyodorkan anggapan gelap tentang bilangan bulat terbesar, dan pengunjung harus menjatuhkannya lewat satu langkah tambah satu yang menggugurkan. Ruangan itu menutup hari dengan tepuk tangan dari pengunjung lain yang menonton.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kota Ini Sudah Punya Hakim Kecil!',
          teks: 'Hari di pengadilan bukti ditutup dengan papan skor yang menyala: lima misi, lima tanda tangan, dan banyak wajah lelah yang bahagia. Menghitung misi yang lulus memang menyenangkan, tapi hitungan itu hanya alat. Bantu saja. Kelima misi itu merangkum seluruh kota: pilah kalimatnya, susun janjinya, buru tandingannya, jatuhkan rantainya, dan uji anggapannya dengan kejanggalan. Owalah, ternyata begini toh rasanya menjadi hakim untuk alasan sendiri, ketat pada langkah, adil pada kesimpulan. Mudah, bukan?',
        },
      ],
    },
    'p4-011': {
      tema: 'halamanBermainSore',
      npc: { glif: 'dua angka!', ucap: ['Dua angka,', 'satu alamat!'] },
      stasiun: [
        {
          objek: 'petaHalamanKertas', judul: 'Peta Kertas di Meja Taman',
          teks: 'Sore itu taman bermain kota ramai seperti biasa, dan di meja piknik sudut taman seorang anak sedang menggambar peta halamannya sendiri dengan pensil yang sudah pendek. Ia menandai ayunan, perosotan, dan gundukan pasir besar di tengah, lalu mencoba menunjuk satu titik kecil di dekat gundukan itu pada temannya. Temannya bingung, sebab kata dari ayunan tiga langkah saja bisa berarti banyak tempat sekaligus. Satu angka ternyata belum cukup untuk menunjuk satu titik di peta.',
        },
        {
          objek: 'duaPatokTaman', judul: 'Dua Patok yang Bekerja Bersama',
          teks: 'Anak itu lalu menancapkan dua patok kecil di dua ujung halaman, satu di dekat ayunan dan satu di dekat perosotan, lalu mencoba lagi caranya menunjuk tempat. Kali ini ia menulis dua angka sekaligus: tiga langkah dari ayunan, dan dua langkah dari perosotan. Tempat itu sekarang tak mungkin tertukar lagi, karena hanya ada satu titik yang berjarak begitu dari kedua patok. Sepasang angka itu bekerja seperti alamat lengkap, dan alamat setengah saja selalu bikin orang tersesat.',
        },
        {
          objek: 'papanTinggiTanah', judul: 'Gundukan yang Tingginya Berlainan',
          teks: 'Di gundukan pasir itu anak-anak suka mengukur tingginya dengan tongkat bergaris, dan sore itu mereka menemukan sesuatu yang menarik. Titik dua langkah dari ayunan dan tiga langkah dari perosotan tingginya tujuh ruas, sementara titik tiga langkah dari ayunan dan dua langkah dari perosotan tingginya delapan ruas. Dua angkanya sama saja, hanya ditukar tempatnya, tapi tingginya berbeda. Ternyata pada sepasang angka, urutan itu punya arti, dan tanah halaman tahu artinya dengan baik.',
        },
        {
          objek: 'kartuAlamatDuaAngka', judul: 'Kartu Alamat Sepasang Angka',
          teks: 'Menjelang maghrib anak itu membuat kartu-kartu kecil berisi tantangan untuk teman-temannya, dan tiap kartu menuliskan sepasang angka seperti alamat rahasia. Siapa yang bisa berdiri tepat di alamat itu, ia berhak menendang bola pertama di pertandingan sore nanti. Semua cepat paham, sebab mereka sadar cara ini sama seperti alamat rumah: ada nama jalan dan ada nomornya, dan keduanya harus lengkap. Sepasang angka kecil ternyata cukup untuk memanggil siapa pun datang ke titik yang tepat.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Satu Titik Ternyata Beralamat Dua Angka!',
          teks: 'Malam itu lampu taman menyala, dan peta kertas buatan anak itu tetap terbuka di meja piknik menunggu main besok. Pelajaran sore itu sederhana: satu angka menunjuk banyak tempat, tapi sepasang angka menunjuk tepat satu titik, dan menukar urutannya bisa mengubah tempat itu sama sekali. Owalah, ternyata begini toh cara menunjuk titik, cukup beri dia alamat dua angka yang rapi. Mudah, bukan?',
        },
      ],
    },
    'p4-012': {
      tema: 'kantorPetaSiang',
      npc: { glif: 'segaris!', ucap: ['Setinggi sama,', 'segaris!'] },
      stasiun: [
        {
          objek: 'petaKonturGantung', judul: 'Peta Bukit yang Penuh Garis',
          teks: 'Pojok kantor pos kota menyimpan peta besar bukit di seberang sungai, dan peta itu dipenuhi garis-garis melingkar yang sering membuat orang baru heran. Para kurir bilang garis-garis itu bukan coretan hiasan, melainkan catatan ketinggian yang rapi. Semua tempat yang dilewati satu garis punya tinggi yang sama persis, seperti jalan setapak yang tak naik dan tak turun. Yang berdiri di garis yang sama itu sejajar, walau jaraknya jauh dan tak pernah bertemu.',
        },
        {
          objek: 'patokSetinggiSepuluh', judul: 'Patok yang Berjalan Mengelilingi',
          teks: 'Suatu siang petugas muda mencoba membuktikan kalimat itu dengan patok penanda bernomor sepuluh, dan ia berjalan pelan mengikuti garis yang memuat nomor itu di peta. Naik sedikit, turun sedikit, menyusuri lembah kecil, lalu memutar sisi bukit, dan tak kira-kira tingginya tetap sepuluh dari dasar. Saat kakinya kembali ke titik awal, ia tertawa lega, sebab garis itu ternyata melingkar tertutup. Tempat setinggi sama memang suka berkumpul dalam satu garis yang rapi.',
        },
        {
          objek: 'garisRapatRenggang', judul: 'Garis Rapat dan Garis Renggang',
          teks: 'Sisi barat bukit punya garis-garis yang berdempetan seperti sisir rapat, sementara sisi timur garisnya berjauhan santai, dan perbedaan itu ternyata punya makna besar. Di sisi rapat, dua garis bertetangga hanya berjarak beberapa langkah padahal tingginya melonjak, artinya tanahnya curam sekali. Di sisi renggang, jarak garisnya jauh untuk kenaikan tinggi yang sama, artinya jalannya landai dan enak dilangkahi. Peta itu jadi bisa dibaca seperti buku, tanpa perlu mendaki dulu untuk tahu.',
        },
        {
          objek: 'jalurLandaiMenepi', judul: 'Jalur Pilihan Kurir Peta',
          teks: 'Kurir tua yang tiap hari mengantar peta ke kota seberang selalu memilih sisi timur yang garisnya renggang, dan tak ada satu pun kiriman yang terlambat karena lelah. Pendaki muda yang ingin menantang dirinya justru memilih sisi barat yang rapat, dan pulang dengan napas tersengal namun hati senang. Satu peta yang sama melayani dua orang dengan keinginan berbeda, cukup dengan membaca kepadatan garisnya. Peta yang baik tak pernah memaksa, ia hanya menyampaikan keadaan tanah dengan jujur.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Garis-Garis Peta Ternyata Berbicara!',
          teks: 'Sore itu peta bukit digulung kembali ke raknya, dan rahasia garis-garisnya sudah dipegang oleh siapa pun yang mau membacanya. Pelajarannya ringkas: satu garis menyatukan tempat setinggi sama, garis rapat menandai curam, dan garis renggang menandai landai. Owalah, ternyata begini toh cara membaca bukit dari kertas, cukup ikuti bisikan garisnya. Mudah, bukan?',
        },
      ],
    },
    'p4-013': {
      tema: 'bukitPasirPagi',
      npc: { glif: 'satu arah!', ucap: ['Bekukan arahnya,', 'ukur jalannya!'] },
      stasiun: [
        {
          objek: 'gundukanPasirPagi', judul: 'Bukit Pasir Pagi Hari',
          teks: 'Pagi di taman kota, embun masih menggantung di rumput, dan bukit pasir yang dibuat petugas kebersihan sudah menunggu anak-anak datang. Di lerengnya terpasang dua jalan papan kecil yang saling menyiku, satu menuju arah timur dan satu menuju arah utara. Seorang anak berdiri tepat di pertemuan kedua papan itu, merasakan kakinya berada di satu titik yang sama, tapi matanya melihat dua jalan berbeda. Dari satu titik saja, tanah ternyata bisa punya dua cerita.',
        },
        {
          objek: 'tanggaUtaraBukit', judul: 'Membekukan Satu Arah',
          teks: 'Untuk mengukur kecuraman jalan timur, anak itu menyusurinya sambil menjaga kakinya tetap di papan timur saja, seolah jalan utara dibekukan tak boleh disentuh. Setiap langkah ke timur ia catat naik atau turun berapa ruas, dan angkanya rapi terkumpul satu baris. Lalu ia turun kembali dan melakukan hal yang sama di papan utara, kali ini timurnya yang dibekukan. Mengukur satu arah sambil membiarkan arah lain diam itulah cara paling jujur mengenali lereng.',
        },
        {
          objek: 'papanLajuDuaArah', judul: 'Dua Papan Laju yang Berbeda',
          teks: 'Di pertemuan papan itu tertempel dua angka hasil pengukuran pagi itu, dan keduanya jauh berbeda. Menyusuri timur, tanah turun dua belas ruas untuk setiap langkah, sedangkan menyusuri utara turunnya hanya empat ruas. Bukitnya sama, titiknya sama, tapi lajunya berbeda karena arah jalannya berbeda. Dua laju seperti itu oleh para pengukur tanah diberi nama turunan searah, dan keduanya hidup berdampingan di satu titik yang sama.',
        },
        {
          objek: 'benderaArahBeku', judul: 'Titik yang Timurnya Datar',
          teks: 'Di sisi lain bukit ada titik aneh yang bikin anak itu tersenyum lebar saat mengukurnya. Menyusuri timur dari titik itu, tanah datar sempurna, tak naik dan tak turun sedikit pun, seperti sedang berjalan di meja. Tapi begitu ia memutar ke jalan utara, tanah langsung turun dengan rajin. Datar di satu arah ternyata tak berarti datar di semua arah. Hitungan itu hanya alat. Bantu saja, yang menentukan tetap kaki yang benar-benar menyusuri jalannya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Satu Titik Ternyata Punya Banyak Laju!',
          teks: 'Siang itu anak-anak pulang dengan dua angka di setiap saku, dan bukit pasir tetap tenang seperti tak menyimpan rahasia. Pelajaran pagi itu tercatat rapi: dari satu titik, tiap arah punya laju naik turunnya sendiri, dan mengukurnya artinya membekukan arah lain sejenak. Owalah, ternyata begini toh membaca bukit dari satu titik, cukup tanyakan arah mana yang mau disusuri. Mudah, bukan?',
        },
      ],
    },
    'p4-014': {
      tema: 'lerengBatuMalam',
      npc: { glif: 'tercuram!', ucap: ['Ikuti panahnya,', 'paling curam!'] },
      stasiun: [
        {
          objek: 'lampuJalanLereng', judul: 'Lereng Batu di Bawah Lampu',
          teks: 'Malam itu lereng batu di sisi kota hanya disinari lampu jalan yang berdiri rajin, dan cahayanya jatuh membentuk lingkaran kuning di permukaan batu. Lingkaran cahaya itu menampakkan sesuatu yang siang sulit dilihat: permukaan lereng punya raut yang berbeda di tiap arah, ada yang landai seperti tangga tua, ada yang menyudut tajam. Sepeda tua milik penjaga taman terparkir di tepi, dan sebuah bola kecil tergeletak dekat tiang lampu. Malam yang tenang seperti ini cocok untuk mencoba satu keajaiban kecil.',
        },
        {
          objek: 'bolaGulungTurun', judul: 'Bola yang Selalu Tahu Jalan',
          teks: 'Penjaga taman melepas bola kecil itu tanpa dorongan sedikit pun, dan bola itu mulai menggelinding perlahan di antara lingkaran cahaya. Arah yang dipilihnya bukan sembarangan: ia tidak pernah memilih jalan yang landai, ia selalu menyusuri arah di mana tanah paling cepat merendah. Dua kali dicoba, dua kali arahnya sama persis, seperti mengikuti undangan yang tak terlihat. Bola memang tak bisa berpikir, tapi lereng berbicara kepadanya lewat kemiringan, dan bola cukup patuh.',
        },
        {
          objek: 'panahTercuramPapan', judul: 'Panah Rahasia di Papan',
          teks: 'Di tepi lereng berdiri papan petunjuk tua, dan penjaga taman menggambarnya ulang dengan kapur sambil menjelaskan ke teman-temannya. Kecuraman ke arah timur dan kecuraman ke arah utara bisa digabung menjadi satu panah tunggal, dan panah gabungan itu menunjuk arah yang paling curam dari semuanya. Menghadap ke balik panah, lereng turun paling tajam, itulah jalur pilihan si bola. Panah kecil itu punya nama besar di kalangan pengukur tanah, mereka menyebutnya gradien, si pembisik arah paling curam.',
        },
        {
          objek: 'katakMencariKolam', judul: 'Katak yang Ikut Panah',
          teks: 'Di bawah lampu itu juga seekor katak kecil sedang berangkat dari rerumputan menuju kolam hujan di dasar lereng, dan langkah-lompatannya menarik untuk ditonton. Setiap kali mendarat, ia berhenti sejenak, lalu melompat lagi ke arah yang sama seperti yang dipilih bola tadi. Tak ada yang mengajarinya peta atau panah, tapi lereng berbicara sama padanya seperti berbicara pada bola. Sampai akhirnya cipratan air kecil terdengar, dan katak itu tiba di rumahnya dengan arah yang tak pernah salah.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Lereng Ternyata Punya Panah Rahasia!',
          teks: 'Lampu jalan tetap menyala sampai dini hari, dan lereng batu kembali diam menyimpan panah rahasianya. Pelajaran malam itu sesederhana bunyi roda bola: gabungkan kecuraman tiap arah, dapat satu panah, dan panah itu menunjuk jalan paling curam. Owalah, ternyata begini toh bola dan katak tak pernah tersesat, mereka cukup ikut panah lereng. Mudah, bukan?',
        },
      ],
    },
    'p4-015': {
      tema: 'tamanBukitSore',
      npc: { glif: 'pelana!', ucap: ['Uji empat arah,', 'baru menilai!'] },
      stasiun: [
        {
          objek: 'benderaPuncakSemuaTurun', judul: 'Bendera di Puncak',
          teks: 'Sore di taman bukit kota, dan di puncaknya berkibar bendera merah yang dipasang klub pendaki mini minggu lalu. Berdiri tepat di bawah bendera itu terasa istimewa, sebab langkah ke arah mana pun akan selalu menuruni tanah. Ke timur turun, ke barat turun, ke utara dan selatan juga turun, semua arah sepakat. Tempat yang disepakati turun dari segala arah itulah yang pantas disebut puncak, dan bendera itu berdiri di tempat yang tepat.',
        },
        {
          objek: 'dasarLembahSemuaNaik', judul: 'Dasar Lembah yang Rendah Hati',
          teks: 'Di sisi lain taman ada lembah kecil yang air hujan suka berkumpul di sana, dan dasarnya ternyata punya watak yang kebalikan puncak. Siapa pun yang berdiri di titik terdalamnya lalu melangkah, kaki akan selalu menaiki tanah, ke arah mana pun langkah itu diarahkan. Semua arah sepakat naik, dan karena itu lembah pantas disebut dasar. Air hujan paling paham sifat ini, sebab itulah alasan mereka selalu berakhir di tempat yang sama.',
        },
        {
          objek: 'pelanaTanahKuda', judul: 'Tanah Berbentuk Pelana',
          teks: 'Tapi taman ini menyimpan satu tanah aneh di antara puncak dan lembah, dan tanah itu selalu memperdaya pendaki baru. Dari satu titiknya, melangkah ke timur tanah naik dengan rajin, tapi melangkah ke utara tanah justru turun dengan lancang. Dua arah bertengkar di satu titik yang sama, satu mengajak naik satu memaksa turun. Bentuk tanah seperti itu mirip pelana di punggung kuda, naik ke dua sisinya dan turun ke dua sisinya yang lain, dan pendaki tua menyebutnya tanah pelana.',
        },
        {
          objek: 'papanTigaCekArah', judul: 'Cara Kota Mengenali Tanah',
          teks: 'Sebelum memasang bendera di tempat baru, klub pendaki mini selalu menjalankan ujian kecil yang tertulis di papan aturan mereka. Uji langkah ke empat arah mata angin: bila semua turun, pasang bendera puncak; bila semua naik, catat sebagai dasar lembah; tapi bila hasilnya campur, tulislah jujur bahwa itu tanah pelana dan jangan buru-buru berdiri di atasnya. Aturan kecil itu sudah dua kali menyelamatkan mereka dari puncak palsu. Tanah tak pernah bohong, yang perlu jujur hanyalah cara kita mengujinya.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Tanah Ternyata Punya Tiga Watak!',
          teks: 'Matahari turun di balik puncak taman, dan bendera merah itu mengecil siluetnya sambil melambai pada lembah dan pelananya. Pelajaran sore itu rapi seperti papan aturan klub: semua turun berarti puncak, semua naik berarti dasar, dan campur naik-turun berarti pelana yang menipu. Owalah, ternyata begini toh mengenali tanah, cukup uji langkahmu ke beberapa arah. Mudah, bukan?',
        },
      ],
    },
    'p4-016': {
      tema: 'kolamKotaPagi',
      npc: { glif: 'kotak!', ucap: ['Potong kotak,', 'jumlahkan!'] },
      stasiun: [
        {
          objek: 'kolamKacaTamanKota', judul: 'Kolam yang Tak Bisa Ditimba',
          teks: 'Pagi di taman kota, kolam persegi tua itu mengemaskan airnya sampai memantul seperti kaca, dan dua petugas kebersihan berdiri di tepinya sambil menggaruk kepala. Mereka perlu melapor banyaknya air di kolam itu, tapi menimba satu per satu sampai kering jelas bukan pekerjaan yang masuk akal. Airnya jernih, dasarnya tampak, tapi berapa persis isi kolam itu tak seorang pun berani menjawab. Pertanyaan sederhana itu menunggu ide sederhana juga untuk menjawabnya.',
        },
        {
          objek: 'jaringKotakPermukaan', judul: 'Jaring Tali di Atas Air',
          teks: 'Ide itu datang dari anak penjaga kolam yang sedang membaca buku peta di pinggir taman: menggantungkan jaring tali di atas kolam sehingga permukaan air terbagi rapi jadi kotak-kotak kecil. Tiap kotak sekarang punya wilayahnya sendiri, dan wilayahnya sendiri punya kedalaman airnya sendiri. Kotak dekat keran bocor terlihat lebih dalam, kotak di sisi tepi dangkal kebiruan. Kolam yang tadinya satu gumpalan besar kini jadi kumpulan kotak kecil yang bisa diajak berbicara satu per satu.',
        },
        {
          objek: 'kolomAirSatuKotak', judul: 'Satu Kolom Kecil Berhitung',
          teks: 'Untuk satu kotak kecil, hitungannya ternyata semudah menghitung kue: luas kotak dikalikan tinggi air di kotak itu. Kotak pertama luasnya satu petak dan airnya sedalam dua ruas, maka kolom air di bawahnya berisi dua satuan air, dan angka itu dicatat di papan kecil. Kotak tetangganya kedalamannya tiga ruas, jadi isinya tiga. Satu kolom demi satu kolom diminta jujur menyebut isinya, dan papan kecil itu perlahan penuh angka yang rapi.',
        },
        {
          objek: 'papanJumlahSemuaKolom', judul: 'Jumlah Semua Kolom Kecil',
          teks: 'Terakhir, semua angka di papan kecil itu dijumlahkan, dan hasilnya menjadi laporan banyaknya air tanpa satu timba pun yang diangkat. Petugas mencoba memperhalus jaringnya menjadi kotak yang makin kecil, dan jumlahnya makin dekat ke angka yang sama dari arah yang lebih tepat. Makin halus kotaknya, makin halus pula jawabannya, begitulah kota itu belajar menghitung air. Hitungan itu hanya alat. Bantu saja, yang hebat tetap idenya membagi kolam jadi kotak.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Kolam Ternyata Bisa Dihitung dari Kotak!',
          teks: 'Jaring tali itu sorenya digulung kembali, dan laporan air kolam sudah tertempel rapi di papan pengumuman taman. Pelajaran pagi itu tercatat: bagilah permukaan jadi kotak, kalikan luas dengan tinggi airnya, lalu jumlahkan semua kotak, dan makin halus kotaknya makin tepat hasilnya. Owalah, ternyata begini toh menghitung kolam tanpa menimbanya, cukup minta tolong kotak-kotak kecil. Mudah, bukan?',
        },
      ],
    },
    'p4-017': {
      tema: 'bengkelSepedaSore',
      npc: { glif: 'estafet!', ucap: ['Laju menumpang,', 'dikalikan!'] },
      stasiun: [
        {
          objek: 'sepedaDiDudukan', judul: 'Sepeda di Dudukan Bengkel',
          teks: 'Sore itu bengkel sepeda sudut kota masih terang, dan sebuah sepeda merah tergantung di dudukan perbaikan dengan roda belakangnya melayang bebas di udara. Pemiliknya menunggu sambil menyeruput teh, sebab tuan bengkel sedang menjelaskan sesuatu yang katanya lebih menarik dari sekadar mengencangkan baut. Tangannya memutar pedal pelan-pelan, dan roda belakang ikut berputar seperti mendengar perintah dari jauh. Sepeda yang diam itu ternyata sedang menceritakan rantai perjalanan laju.',
        },
        {
          objek: 'gigiBesarGigiKecil', judul: 'Dua Gigi yang Bertukar Tenaga',
          teks: 'Tuan bengkel menunjuk dua roda gigi yang dihubungkan rantai hitam: gigi depan besar dengan empat puluh delapan lubang, dan gigi belakang kecil dengan enam belas lubang. Saat pedal menyelesaikan satu putaran penuh, rantai menyeret gigi belakang berganti tiga putaran penuh, sebab empat puluh delapan dibagi enam belas sama dengan tiga. Tenaga itu berpindah tanpa tersendat, dari kaki ke gigi besar, lalu lewat rantai ke gigi kecil. Gigi besar menukar tenaga jadi putaran lebih banyak, itulah rahasia sepeda.',
        },
        {
          objek: 'pedalBerputarRantai', judul: 'Laju yang Berpindah Batang',
          teks: 'Kaki pengendara yang rajin mengayun enam puluh putaran setiap menit, dan angka itu lalu berpindah batang demi batang seperti estafet. Roda belakang menerima enam puluh dikali tiga, jadi seratus delapan puluh putaran setiap menit, dan roda yang kelilingnya dua meter menyapu jalan tiga ratus enam puluh meter setiap menit. Tiga angka laju itu cukup dikalikan berurutan, dan jarak satu menit langsung jadi. Laju di sepeda tidak pernah melompat, ia menumpang dari pedal ke roda lewat rantai.',
        },
        {
          objek: 'papanJarakSejam', judul: 'Ganti Satu Gigi, Semua Berubah',
          teks: 'Untuk membuktikan rantai itu rapuh pada satu gigi saja, tuan bengkel memasang gigi belakang yang lebih besar, dua puluh empat lubang, lalu menghitung ulang di papan kapurnya. Empat puluh delapan dibagi dua puluh empat hanya dua, jadi roda belakang tinggal seratus dua puluh putaran per menit, dan jaraknya jatuh jadi dua ratus empat puluh meter. Satu gigi diganti, seluruh angka di ujung ikut berubah. Hitungan itu hanya alat. Bantu saja, yang menentukan tetap rantai yang benar-benar menghubungkan.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Laju Ternyata Menumpang Berantai!',
          teks: 'Malam itu sepeda merah turun dari dudukannya dengan gigi baru, dan pemiliknya mengayuh pulang sambil tersenyum menghitung dalam hati. Pelajaran bengkel itu ringkas: laju berpindah lewat rantai, dan cukup kalikan tiap mata rantai berurutan untuk tahu hasil di ujungnya. Owalah, ternyata begini toh sepeda menghitung jalan, pedal menggulung gigi, gigi menggulung roda. Mudah, bukan?',
        },
      ],
    },
    'p4-018': {
      tema: 'padangAnginSiang',
      npc: { glif: 'pusaran!', ucap: ['Balon uji sebar,', 'kincir uji putar!'] },
      stasiun: [
        {
          objek: 'rempahPanahAngin', judul: 'Padang yang Penuh Panah',
          teks: 'Siang di padang bunga tepi kota, dan para tukang kebun menancapkan rempah kecil di mana-mana, masing-masing memegang panah kertas yang menunjuk arah tiupan angin saat itu. Dari jauh padang itu tampak seperti ditenun dari ribuan panah kecil, tiap titik punya penunjuk arahnya sendiri. Angin tak bisa dilihat, tapi padang panah ini membuatnya terbaca seperti peta. Petani muda berdiri di tengahnya dan menyadari satu hal: watak angin di satu tempat tidak selalu sama dengan wataknya di tempat lain.',
        },
        {
          objek: 'balonTerbangMenjauh', judul: 'Balon yang Dilepas di Tengah',
          teks: 'Untuk menguji satu tempat, petani muda melepas balon kecil di tengah padang, dan panah-panah di sekelilingnya segera bicara. Semua panah di sekitar balon itu menghadap menjauh dari pusat, utara mengarah ke utara jauh, timur mengarah ke timur jauh, seperti pintu yang semua daunnya membuka keluar. Balon pun terangkat dan melayang makin jauh dari tempat ia dilepas. Tempat dengan angin yang suka menyebar keluar seperti itu mudah dikenali: lepas satu balon, dan ia tak pernah kembali.',
        },
        {
          objek: 'kincirPusaranBunga', judul: 'Kincir yang Berputar Sendiri',
          teks: 'Di sudut lain padang ada tempat yang panah-panahnya berperilaku lain, dan petani muda menancapkan kincir bunga kecil di sana untuk mengujinya. Panah di sisi kanan titik itu meniup ke arah yang berbeda dengan panah di sisi atasnya, dan beda arah itulah yang membuat kincir berputar pelan tanpa henti. Tak ada angin yang mendorong sesuatu menjauh dari sini, tapi ada putaran yang jelas terasa. Tempat semacam ini pantas disebut pusaran, rumah paling nyaman bagi kincir dan paling susah bagi balon.',
        },
        {
          objek: 'papanDuaUjiAngin', judul: 'Dua Uji Kecil untuk Angin',
          teks: 'Petani muda lalu menulis dua aturan uji di papan kecil tepi padang, dan aturannya cuma dua baris. Lepaskan balon: bila ia terdorong keluar meninggalkan tempatnya, angin di sana wataknya menyebar. Pasang kincir: bila ia berputar sendiri, angin di sana wataknya berputar. Dua alat murah itu cukup untuk membaca dua watak angin tanpa alat mahal sedikit pun. Padang panah, satu balon, satu kincir, dan angin yang tak terlihat jadi punya namanya masing-masing.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Angin Ternyata Punya Dua Watak!',
          teks: 'Sore itu rempah-rempan tetap menunjuk sesuai keinginan angin, dan papan uji kecil itu menunggu petani yang datang esok. Pelajaran padang itu sederhana: di satu tempat angin bisa suka menyebar keluar, di tempat lain ia bisa suka berputar, dan dua alat kecil cukup membedakannya. Owalah, ternyata begini toh membaca angin, cukup lepas balon dan pasang kincir. Mudah, bukan?',
        },
      ],
    },
    'p4-019': {
      tema: 'kebunPagarPagi',
      npc: { glif: 'pagar!', ucap: ['Cek syaratnya,', 'juara bisa pindah!'] },
      stasiun: [
        {
          objek: 'kebunPersegiKelilingDuaEmpat', judul: 'Pagar 24 Langkah',
          teks: 'Pagi itu kepala kebun kota mengumumkan tantangan yang membuat para penjaga kebun berdebat sepanjang jalan: siapa pun yang bisa membuat kebun terluas dari pagar sepanjang dua puluh empat langkah, ia boleh menanam bunga apa pun yang ia mau. Yang pertama membangun kebun delapan langkah kali empat, dan luasnya tiga puluh dua petak. Yang lain buru-buru memanjang kebunnya sampai sepuluh kali dua, tapi luasnya malah tinggal dua puluh. Pagar yang sama panjang, hasilnya jauh berbeda.',
        },
        {
          objek: 'bandingKebunPanjang', judul: 'Panjang Kalah dari Persegi',
          teks: 'Para penjaga kebun lalu menyusun semua percobaan mereka di papan kapur besar, dan polanya makin jelas dari baris ke baris. Kebun yang sisi-sisinya makin jomplang selalu kalah luas, sebab panjang yang molor itu memboros pagar untuk keuntungan luas yang kecil. Di ujung daftar, kebun enam langkah kali enam langkah berdiri paling tinggi dengan tiga puluh enam petak, dan bentuknya persegi sempurna. Sisi yang seimbang ternyata paling pandai memakai pagar, itulah juara tanpa sungai.',
        },
        {
          objek: 'kebunTepiSungaiTigaSisi', judul: 'Pindah ke Tepi Sungai',
          teks: 'Tahun berikutnya tantangan itu diulang, tapi kali ini lokasinya di tepi sungai, dan airnya setuju menjadi pagar gratis di satu sisi kebun. Dua puluh empat langkah pagar kini cukup dipakai untuk tiga sisi saja, dan perhitungan lamanya tak berlaku lagi. Kebun dua belas langkah kali enam langkah tampil dengan luas tujuh puluh dua petak, jauh mengungguli semua percobaan lama yang hanya tiga sisi. Cukup satu syarat berubah, dan juara lamanya langsung digulingkan.',
        },
        {
          objek: 'papanPersegiJuara', judul: 'Syarat Mengubah Juara',
          teks: 'Di papan kebun kini tertempel dua piala kertas yang menampilkan dua juara berbeda, dan pengunjung selalu berhenti membacanya dua kali. Tanpa sungai, juaranya persegi enam kali enam dengan tiga puluh enam petak; dengan sungai sebagai pagar gratis, juaranya dua belas kali enam dengan tujuh puluh dua petak. Tak ada yang curang di antara keduanya, hanya syarat batasnya saja yang berpindah. Hitungan itu hanya alat. Bantu saja, yang mengubah jawaban adalah bentuk pagar yang boleh dipakai.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Juara Luas Ternyata Ikut Pindah Pagar!',
          teks: 'Bunga-bunga tumbuh paling ramai di kebun tepi sungai itu, dan dua piala kertas tetap bergantian dipuji tiap pagi. Pelajaran dua tantangan itu rapi: dengan pagar penuh, persegi juara; begitu satu sisi dibayar gratis oleh sungai, jawaban terbaik melar dan memanjang. Owalah, ternyata begini toh mencari terluas, cek dulu syarat batasnya baru bangun pagarmu. Mudah, bukan?',
        },
      ],
    },
    'p4-020': {
      tema: 'jalanBukitPagi',
      npc: { glif: 'susur!', ucap: ['Puncak sama,', 'lelah beda!'] },
      stasiun: [
        {
          objek: 'duaJalanSatuPuncak', judul: 'Dua Jalan ke Puncak yang Sama',
          teks: 'Pagi itu dua kurir paket berdiri di kaki bukit kota dengan karung yang sama beratnya, dan di depan mereka membentang dua jalan menuju puncak yang sama. Jalan pertama lurus dan pendek, naik tegak seperti tangga raksasa, sedangkan jalan kedua berkelok santai mengitari lereng jauh lebih panjang. Kurir yang satu suka jalan cepat, yang lain suka jalan berselang-seling. Sebelum berangkat, keduanya bertaruh satu hal sederhana: mana yang membuat mereka lebih lelah melawan tanjakan.',
        },
        {
          objek: 'karungKurirBerat', judul: 'Kurir yang Menghitung Lelah',
          teks: 'Kurir pertama naik lewat jalan lurus dan sampai di puncak dengan napas tersengal, sementara kurir kedua datang beberapa saat kemudian lewat jalan berkelok, dan yang mengejutkan: lelah keduanya nyaris sama persis. Tanjakan memang tak pernah peduli jalannya seberapa panjang, ia hanya bertanya naik berapa ruas dari kaki ke puncak. Naiknya sama sepuluh ruas, maka tenaganya yang habis untuk naik juga sama. Gravitasi itu jujur, ia menghitung tinggi awal dan tinggi akhir, bukan kelokan yang dilewati.',
        },
        {
          objek: 'anginMenyilangJalan', judul: 'Angin yang Menyilang Pagi',
          teks: 'Tapi hari itu ada tamu ketiga di bukit: angin pagi yang meniup menyilang dari timur ke barat, dan dia tidak sejujur gravitasi. Di jalan lurus, angin menyilang sekali lewat saja, kasih dorongan kecil yang sama di sepanjang jalan pendek. Di jalan berkelok, kurir kedua berkali-kali membelokkan badan ke arah angin, dan tiap kelokan itu menambah letihnya sendiri. Lelahnya dua kurir kini jauh berbeda, padahal naiknya tetap sama sepuluh ruas.',
        },
        {
          objek: 'papanKerjaSamaTinggi', judul: 'Papan Kecil di Puncak',
          teks: 'Di puncak mereka berdua membetulkan papan tua yang sudah lama lapuk, dan menuliskan dua baris catatan untuk pendaki berikutnya. Baris pertama tentang tanjakan: naik sepuluh ruas, lelahnya sama, jalan mana pun yang dipilih. Baris kedua tentang angin: lelahnya ikut menurut jalan, makin banyak kelokan menyilang, makin berat. Dua baris itu sering dikutip anak-anak yang berkemah, sebab keduanya mengajarkan kapan pilihan jalan penting dan kapan tidak.',
        },
        {
          objek: 'tugu', akhir: true, judul: 'Owalah, Lelah Ternyata Ada yang Setia dan Berpindah!',
          teks: 'Matahari makin tinggi ketika dua kurir itu turun lewat jalan yang berbeda lagi, kali ini hanya untuk iseng membuktikan papan mereka. Pelajaran bukit itu tergantung rapi di puncak: melawan tanjakan, lelah hanya peduli naik berapa; melawan angin yang menyilang, lelah ikut menghitung jalannya. Owalah, ternyata begini toh memilih jalan, lihat dulu lawanmu yang mana, gravitasi atau angin. Mudah, bukan?',
        },
      ],
    },
  };

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
