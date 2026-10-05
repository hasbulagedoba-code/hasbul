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
