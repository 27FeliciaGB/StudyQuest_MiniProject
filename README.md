# StudyQuest — Aplikasi Pengelolaan Tugas Mahasiswa

## 1. Tentang Proyek

StudyQuest adalah aplikasi sederhana berbasis terminal yang dibuat menggunakan JavaScript dan Node.js untuk membantu mahasiswa mengelola tugas kuliah.

Aplikasi ini memungkinkan pengguna untuk menambahkan tugas, melihat daftar tugas, mengubah status penyelesaian, mengedit informasi tugas, menghapus tugas, serta melihat ringkasan jumlah tugas.

Setiap tugas memiliki informasi berupa nama tugas, mata kuliah, tanggal tenggat (*deadline*), prioritas, dan status pengerjaan. Dengan informasi tersebut, pengguna dapat mengetahui tugas yang perlu diprioritaskan dan memantau perkembangan penyelesaian tugas kuliah.

Proyek ini dikembangkan sebagai sarana pembelajaran pemrograman, khususnya penggunaan fungsi, array, objek, modul JavaScript, validasi input, dan pengolahan data.

## 2. Tujuan Sistem

StudyQuest dibuat untuk membantu mahasiswa mengelola tugas kuliah secara lebih teratur melalui satu aplikasi sederhana.

Tujuan utama sistem ini adalah:

- Mempermudah pencatatan tugas dari berbagai mata kuliah.
- Membantu pengguna menentukan tugas berdasarkan tingkat prioritas.
- Memantau tenggat waktu dan status penyelesaian tugas.
- Menyediakan ringkasan jumlah tugas yang sudah selesai dan belum selesai.
- Menerapkan konsep dasar pemrograman dalam sebuah proyek yang dapat dijalankan.

## 3. Fitur Utama

### 3.1. Menambahkan Tugas

Pengguna dapat menambahkan tugas baru dengan mengisi nama tugas, mata kuliah, tanggal tenggat, dan tingkat prioritas. Sistem memeriksa apakah informasi wajib telah diisi dan apakah tanggal yang dimasukkan valid.

### 3.2. Melihat Daftar Tugas

Sistem menampilkan daftar tugas dalam bentuk tabel yang berisi ID, nama tugas, mata kuliah, deadline, prioritas, status, dan keterangan deadline.

Daftar tugas diurutkan berdasarkan prioritas, mulai dari tinggi, sedang, hingga rendah.

### 3.3. Mengubah Status Tugas

Pengguna dapat mengubah status tugas menjadi "Selesai" atau "Belum Selesai". Fitur ini membantu pengguna memantau perkembangan pengerjaan tugas.

### 3.4. Mengedit Detail Tugas

Pengguna dapat memperbarui nama tugas, mata kuliah, deadline, dan prioritas. Informasi yang tidak ingin diubah dapat dibiarkan kosong.

### 3.5. Menghapus Tugas

Pengguna dapat menghapus tugas berdasarkan ID. Sebelum penghapusan dilakukan, sistem meminta konfirmasi agar pengguna dapat membatalkan tindakan tersebut.

### 3.6. Melihat Ringkasan Tugas

Sistem menampilkan jumlah seluruh tugas, jumlah tugas yang selesai, dan jumlah tugas yang belum selesai.

### 3.7. Memeriksa Deadline

Sistem memberikan keterangan berdasarkan tanggal tenggat dan status tugas, yaitu:

- **Selesai:** tugas sudah diselesaikan.
- **Terlambat:** deadline sudah lewat dan tugas belum selesai.
- **Deadline Hari Ini:** deadline jatuh pada tanggal hari ini.
- **Belum Terlambat:** deadline belum lewat.
- **Deadline belum ditentukan:** tanggal tenggat tidak tersedia.

### 3.8. Validasi Input

Sistem memeriksa format tanggal menggunakan pola `YYYY-MM-DD` dan memastikan tanggal tersebut benar-benar valid. Sistem juga memeriksa nama tugas, mata kuliah, dan pilihan prioritas sebelum menerima data baru.

## 4. Alur Kerja Sistem

Secara umum, alur penggunaan StudyQuest adalah sebagai berikut:

1. Pengguna menjalankan aplikasi melalui terminal.
2. Sistem menampilkan menu utama.
3. Pengguna memilih menu sesuai kebutuhan.
4. Sistem meminta input atau menampilkan informasi tugas.
5. Sistem memproses data sesuai pilihan pengguna.
6. Sistem menampilkan hasil pemrosesan.
7. Pengguna dapat kembali ke menu utama atau memilih menu keluar.

Menu utama aplikasi terdiri atas:

| Pilihan | Fungsi |
| 1 | Menambahkan tugas |
| 2 | Melihat daftar tugas |
| 3 | Mengubah status tugas |
| 4 | Mengedit detail tugas |
| 5 | Menghapus tugas |
| 6 | Melihat ringkasan tugas |
| 0 | Keluar dari aplikasi |

## 5. Teknologi yang Digunakan

- **JavaScript:** bahasa pemrograman yang digunakan untuk membuat logika aplikasi.
- **Node.js:** lingkungan untuk menjalankan JavaScript di luar browser.
- **Node.js Readline Promises API:** digunakan untuk menerima input pengguna melalui terminal secara asinkron.
- **ES Modules:** sistem modul JavaScript yang menggunakan `import` dan `export` untuk memisahkan kode ke beberapa file.
- **Array dan Object:** digunakan untuk menyimpan dan mengelola informasi tugas selama aplikasi berjalan.
- **Git dan GitHub:** digunakan untuk mengelola versi kode dan menyimpan proyek secara daring.

## 6. Struktur File Proyek

```text
StudyQuest_MiniProject/
├── main.js
├── function.js
├── utils.js
├── data.js
├── task.json
├── tasks.json
├── package.json
└── README.md
```

Penjelasan fungsi file:

### `main.js`

Merupakan file utama yang mengatur jalannya aplikasi. File ini menampilkan menu, menerima input pengguna, memvalidasi data, memanggil fungsi pengelolaan tugas, dan menampilkan hasilnya.

### `function.js`

Digunakan untuk menempatkan fungsi utama pengelolaan tugas, seperti menambahkan, menampilkan, mengubah, dan menghapus tugas. Fungsi-fungsi tersebut dipanggil oleh `main.js`.

### `utils.js`

Berisi fungsi pendukung untuk memproses informasi tugas, antara lain:

- `formatTanggal()`: mengubah tanggal dari format `YYYY-MM-DD` menjadi format tanggal Indonesia yang lebih mudah dibaca.
- `warnaPrioritas()`: menentukan warna berdasarkan tingkat prioritas tugas.
- `cekDeadline()`: memeriksa kondisi deadline berdasarkan tanggal dan status tugas.
- `hitungTugasSelesai()`: menghitung jumlah tugas yang berstatus selesai.
- `hitungTugasBelumSelesai()`: menghitung jumlah tugas yang belum selesai.
- `urutkanPrioritas()`: mengurutkan tugas berdasarkan tingkat prioritas.

### `data.js`

Berisi data awal tugas dalam bentuk array objek serta fungsi `setDaftarTugas()` untuk mengganti data daftar tugas pada modul tersebut.

### `task.json` dan `tasks.json`

Kedua file ini memiliki ekstensi JSON, yang merupakan format teks untuk menyimpan data terstruktur. Peran sebenarnya dalam aplikasi perlu disesuaikan dengan isi file dan apakah kode program menggunakannya.

### `package.json`

Berisi informasi dan konfigurasi proyek Node.js, seperti nama proyek, pengaturan modul, serta skrip dan dependensi jika tersedia.

### `README.md`

Dokumen yang menjelaskan tujuan, fitur, cara menjalankan, dan struktur proyek agar mudah dipahami oleh pengguna maupun pengembang lain.

## 7. Penjelasan Teknis Sistem

### 7.1. Pengelolaan Data

Informasi tugas direpresentasikan menggunakan objek JavaScript. Setiap objek tugas memiliki atribut `id`, `nama`, `mataKuliah`, `deadline`, `prioritas`, dan `status`.

Kumpulan objek tugas disimpan dalam array sehingga dapat diolah menggunakan fungsi JavaScript, seperti `filter()`, `find()`, dan `sort()`.

### 7.2. Pemisahan Modul

Kode dibagi menjadi beberapa file agar lebih terstruktur. `main.js` berfokus pada interaksi pengguna, `function.js` menangani operasi tugas, sedangkan `utils.js` menyediakan fungsi pendukung.

Pemisahan ini membantu pengembang memahami, menguji, dan memperbaiki bagian program tanpa harus menempatkan seluruh kode dalam satu file.

### 7.3. Pemrosesan Input

Aplikasi menggunakan `readline/promises` untuk menerima input melalui terminal. Dengan `async` dan `await`, program dapat menunggu jawaban pengguna sebelum melanjutkan ke langkah berikutnya.

### 7.4. Validasi Tanggal

Fungsi `tanggalValid()` memeriksa pola tanggal dan memastikan bahwa tanggal, bulan, dan tahun yang dimasukkan sesuai dengan tanggal kalender yang sebenarnya.

Sebagai contoh, format `2026-10-24` dapat diterima, sedangkan tanggal yang tidak valid seperti `2026-02-30` ditolak.

### 7.5. Pengurutan Prioritas

Fungsi `urutkanPrioritas()` memberikan urutan angka pada setiap tingkat prioritas:

1. Tinggi
2. Sedang
3. Rendah

Selanjutnya, fungsi `sort()` mengurutkan daftar berdasarkan angka tersebut. Operator spread (`...`) digunakan untuk membuat salinan array sebelum pengurutan sehingga array sumber tidak diurutkan langsung oleh fungsi tersebut.

### 7.6. Penghitungan Ringkasan

Fungsi `filter()` digunakan untuk memilih tugas berdasarkan statusnya. Jumlah hasil penyaringan kemudian dihitung menggunakan properti `length`.

Dengan demikian, sistem dapat menampilkan jumlah tugas selesai dan belum selesai tanpa menghitungnya satu per satu secara manual.

### 7.7. Pemeriksaan Deadline

Sistem membandingkan tanggal deadline dengan tanggal hari ini. Jika deadline sudah lewat dan tugas belum selesai, sistem memberikan keterangan "Terlambat". Jika tanggal deadline sama dengan hari ini, sistem menampilkan "Deadline Hari Ini".

Pemeriksaan ini dilakukan berdasarkan tanggal kalender, bukan jam tertentu.

## 8. Cara Menjalankan Aplikasi

### Persyaratan

- Node.js sudah terpasang di komputer.
- Terminal atau Command Prompt tersedia.

Periksa instalasi Node.js dengan perintah:

```bash
node -v
```

### Langkah Menjalankan

1. Unduh proyek atau salin repository menggunakan perintah:

```bash
git clone https://github.com/27FeliciaGB/StudyQuest_MiniProject.git
```

2. Masuk ke folder proyek:

```bash
cd StudyQuest_MiniProject
```

3. Jalankan aplikasi:

```bash
node main.js
```

4. Pilih menu yang tersedia dengan memasukkan angka pilihan pada terminal.

Jika proyek membutuhkan dependensi tambahan, ikuti konfigurasi yang tercantum dalam `package.json`.

## 9. Batasan Sistem

Versi saat ini merupakan aplikasi berbasis terminal. Berdasarkan kode yang tersedia, data tugas dikelola menggunakan array JavaScript selama aplikasi berjalan. Penyimpanan permanen ke database atau file JSON belum dapat dipastikan.

Oleh karena itu, penyimpanan data setelah aplikasi ditutup perlu dikembangkan dan diuji secara terpisah jika ingin mempertahankan perubahan tugas.

## 10. Rencana Pengembangan

Beberapa pengembangan yang dapat dilakukan selanjutnya adalah:

- Menambahkan penyimpanan data permanen menggunakan file JSON atau database.
- Menambahkan fitur pencarian dan penyaringan tugas.
- Menambahkan pengingat deadline.
- Mengembangkan antarmuka grafis agar aplikasi lebih mudah digunakan.
- Menambahkan pengujian untuk memastikan setiap fitur berjalan dengan benar.

## 11. Penutup

StudyQuest merupakan proyek pembelajaran yang menerapkan dasar-dasar pemrograman JavaScript dalam aplikasi pengelolaan tugas mahasiswa. Melalui proyek ini, pengembang dapat mempelajari pengolahan data, modularisasi kode, validasi input, operasi CRUD (*Create, Read, Update, Delete*), serta pengelolaan versi menggunakan Git dan GitHub.

## Pengembang

**Felicia GB**

GitHub: [27FeliciaGB](https://github.com/27FeliciaGB)
