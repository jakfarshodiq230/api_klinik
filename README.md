# API Klinik

API Klinik ini menyediakan layanan untuk mengelola data pasien, dokter, jadwal, dan rekam medis di sebuah klinik. API ini memungkinkan aplikasi frontend untuk mendaftar pasien, mengelola janji temu, serta menyimpan dan mengelola data medis pasien. API ini dapat digunakan oleh aplikasi atau sistem lain yang membutuhkan integrasi dengan layanan klinik.

## Fitur

- **Pendaftaran Pasien:** Menambahkan dan mengelola data pasien.
- **Manajemen Dokter:** Menambah dan mengelola data dokter yang tersedia di klinik.
- **Jadwal Pemeriksaan:** Menjadwalkan janji temu untuk pasien dengan dokter.
- **Rekam Medis:** Menyimpan dan mengelola informasi rekam medis pasien.
- **Autentikasi dan Otorisasi:** Sistem login dan hak akses untuk admin, dokter, dan pasien.

## Teknologi yang Digunakan

- **Backend Framework:**
  - `Node.js` - Runtime environment untuk menjalankan JavaScript di server.
  - `Express.js` - Framework web untuk membangun REST API.
- **Database:**
  - `MySQL` - Database relasional yang digunakan untuk menyimpan data aplikasi.
  - `Sequelize` - ORM (Object-Relational Mapper) untuk Node.js yang digunakan untuk berinteraksi dengan MySQL.
- **Autentikasi:**
  - `JWT (JSON Web Token)` - Digunakan untuk autentikasi dan manajemen token.
- **Validasi Input:**
  - `Joi` - Digunakan untuk memvalidasi data input dari pengguna.
- **Dokumentasi API:**
  - `Swagger` - Digunakan untuk mendokumentasikan API secara otomatis.

## Instalasi

Ikuti langkah-langkah berikut untuk menginstal dan menjalankan API ini:

1. Clone repositori ini:
   ```bash
   git clone https://github.com/jakfarshodiq230/api_klinik.git
   cd api-klinik
   ```
