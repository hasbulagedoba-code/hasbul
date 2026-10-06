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
          teks: 'Nol tampak seperti lingkaran kosong, padahal dialah pahlawan paling sakti. Berkat nol, angka 1 bisa berdiri di depan menjadi 10, lalu 100, lalu seribu. Ibarat piring kosong yang memberi tempat kue ditata lebih tinggi, nol memberi tempat agar angka lain naik kelas.',
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
      npc: { glif: '0', ucap: ['Nol itu', 'sakti!'] },
      stasiun: [
        {
          objek: 'lubang', judul: 'Lingkaran Kosong yang Dibenci',
          teks: 'Dulu banyak orang menganggap nol aneh: "kosong kok ditulis?" Bahkan ada tempat yang melarangnya. Padahal sebuah lingkaran kecil ini menyimpan kekuatan terbesar di dunia angka.',
        },
        {
          objek: 'papan10', judul: 'Sulap 1 Jadi 10',
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
          teks: 'Kapal antariksa menavigasi dengan membaca posisi bintang dan jarak antar planet — matematika murni yang tergambar di langit malam. Peta masa depan selalu ditulis dengan angka.',
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
          teks: 'Di dermaga bersandar sebuah kapal sakti bernama Puluhan. Aturan lautnya satu saja: angka yang duduk di kursi depan menjadi kapten. Kursi di kapal ini bukan tempat duduk biasa — kursi menentukan kekuatan.',
        },
        {
          objek: 'kursiKapten', judul: 'Angka 1 Naik ke Kursi Kapten',
          teks: 'Angka 1 semula duduk di kursi belakang: nilainya masih 1, kecil dan sederhana. Begitu pindah ke kursi kapten di haluan — ta-da! — kekuatannya langsung sepuluh kali lipat: 10. Angkanya sama, kursinya yang mengubah nasib.',
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
          objek: 'tugu', akhir: true, judul: 'Owalah, Kursi Itu Sakti!',
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
          objek: 'tugu', akhir: true, judul: 'Owalah, Posisi Itu Sakti!',
          teks: 'Ratusan, ribuan, bahkan jutaan — semuanya cuma angka 1 yang pindah kursi baris demi baris. Tidak ada sihir yang rumit, hanya nilai tempat yang tertib. Mudah, bukan?',
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
