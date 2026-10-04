# hasbul — Perpustakaan Matematika

Situs belajar matematika dari dasar hingga PhD, dibungkus dunia terbuka bernama Akiomida.

## Struktur

- `index.html` — pintu depan: tombol Mulai + banner iklan responsive
- `assets/js/ads.js` — mesin iklan (responsive, aktif di semua halaman via class `.ad-slot`)
- `akiomidaspace/index.html` — dunia terbuka Akiomida: kamera berjalan, bola menggelinding, pemandu Pilo, 6 gerbang wilayah
- `akiomidaspace/lantai-1-dasar-matematika.html` — peta tur Lantai 1: Kamp Angka (Dasar/SD)
- `akiomidaspace/lantai-2-matematika-smp.html` — peta tur Lantai 2: Hutan Simbol (SMP)
- `akiomidaspace/lantai-3-matematika-sma.html` — peta tur Lantai 3: Pegunungan Pola (SMA)
- `akiomidaspace/lantai-4-matematika-sarjana.html` — peta tur Lantai 4: Kota Bukti (S1)
- `akiomidaspace/lantai-5-matematika-magister.html` — peta tur Lantai 5: Lembah Kedalaman (S2)
- `akiomidaspace/lantai-6-matematika-doktoral.html` — peta tur Lantai 6: Puncak Riset (S3/PhD)
- `akiomidaspace/material/sejarah-matematika.html` — materi pertama yang terbuka: Sejarah Matematika
- `akiomidaspace/material/sejarah.html` — pengalih ke alamat baru

## Nama wilayah (virtual) vs level

| Wilayah | Lantai | Level |
|---------|--------|-------|
| Kamp Angka | 1 | Dasar (SD) |
| Hutan Simbol | 2 | Menengah Pertama (SMP) |
| Pegunungan Pola | 3 | Menengah Atas (SMA) |
| Kota Bukti | 4 | Sarjana (S1) |
| Lembah Kedalaman | 5 | Magister (S2) |
| Puncak Riset | 6 | Doktoral (S3/PhD) |

## Cara memasang iklan di halaman baru

Tambahkan blok berikut di halaman mana pun:

```html
<div class="ad-slot"></div>
<script src="assets/js/ads.js" defer></script>
```

(Sesuaikan jalur `assets/js/ads.js` sesuai kedalaman folder halaman tersebut.)

## Alur pengguna

Pintu depan → tombol **Mulai** → Dunia Akiomida (jelajah bebas: drag, panah, atau klik tanah) → gerbang wilayah → peta tur lantai → pos yang bertanda BUKA → halaman materi.
