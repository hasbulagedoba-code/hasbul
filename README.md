# hasbul — Perpustakaan Matematika

Situs belajar matematika dari dasar hingga PhD, dibungkus dunia hidup bernama Akiomida.

## Struktur

- `index.html` — pintu depan: tombol Mulai + banner iklan responsive
- `assets/js/ads.js` — mesin iklan (responsive, aktif di semua halaman via class `.ad-slot`)
- `akiomidaspace/index.html` — Dunia Akiomida: bola-bola menggelinding, pemandu Pilo, pintu 6 lantai
- `akiomidaspace/material/sejarah.html` — materi pertama: Sejarah Matematika
- `akiomidaspace/material/index.html` — pengalih otomatis ke ruang pertama

## Cara memasang iklan di halaman baru

Tambahkan blok berikut di halaman mana pun:

```html
<div class="ad-slot"></div>
<script src="assets/js/ads.js" defer></script>
```

(Sesuaikan jalur `assets/js/ads.js` sesuai kedalaman folder halaman tersebut.)

## Alur pengguna

Pintu depan → tombol **Mulai** → Dunia Akiomida → pintu **Lantai 1 (Dasar)** → Sejarah Matematika.
