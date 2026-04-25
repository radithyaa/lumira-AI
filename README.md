# 🌟 Lumira

<img width="2427" height="1365" alt="Thumbnail (1)" src="https://github.com/user-attachments/assets/844af3a7-d841-460d-be15-81bae28608c8" />

**Lumira** adalah aplikasi asisten pribadi cerdas yang dirancang untuk membantu Anda memahami diri sendiri lebih dalam dan mencapai potensi maksimal Anda. Dengan pendekatan berbasis kepribadian (MBTI) dan manajemen tujuan, Lumira menjadi teman setia dalam perjalanan pengembangan diri Anda.

Aplikasi ini dibangun dengan arsitektur **Offline-First**, memastikan Anda tetap produktif dan dapat mengakses data penting kapan saja, di mana saja, bahkan tanpa koneksi internet.

---

## 🚀 Tech Stack

Lumira menggunakan teknologi modern yang berfokus pada kecepatan pengembangan dan performa maksimal:

### Core Architecture
- **Monorepo:** [Turborepo](https://turbo.build/) untuk manajemen workspace yang efisien.
- **Runtime:** [Bun](https://bun.sh/) untuk eksekusi JavaScript yang sangat cepat.

### Mobile (Client)
- **Framework:** [Expo](https://expo.dev/) / React Native.
- **Local Database:** [WatermelonDB](https://nozbe.github.io/WatermelonDB/) (Sistem sinkronisasi offline-first yang sangat responsif).
- **Styling:** [NativeWind](https://www.nativewind.dev/) (Tailwind CSS untuk Native).
- **Form Management:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/).

### Backend (Server)
- **Framework:** [Hono](https://hono.dev/) (Framework web minimalis dan cepat).
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/) (TypeScript-first ORM).
- **Database:** [PostgreSQL](https://www.postgresql.org/).
- **Authentication:** [Better-Auth](https://better-auth.com/) (Sistem autentikasi modern dan aman).

---

## 🛠️ Persiapan Pengembangan

Ikuti langkah-langkah berikut untuk menjalankan proyek di lingkungan lokal Anda:

### 1. Prasyarat
- Pastikan Anda sudah menginstal **Bun** (`curl -fsSL https://bun.sh/install | bash`).
- Pastikan Anda memiliki instance **PostgreSQL** yang berjalan.

### 2. Instalasi Dependensi
Jalankan perintah berikut di root direktori:
```bash
bun install
```

### 3. Konfigurasi Environment
Buat file `.env` di direktori berikut berdasarkan contoh yang ada:

- **`apps/server/.env`**: Isi dengan kredensial database dan rahasia autentikasi.
- **`apps/native/.env`**: (Jika diperlukan) untuk konfigurasi API URL.

### 4. Setup Database
Dorong skema database ke PostgreSQL Anda:
```bash
bun run db:push
```

---

## 🏃 Menjalankan Aplikasi

Anda dapat menjalankan seluruh sistem (Server + Mobile) dengan satu perintah:

```bash
bun run dev
```

Atau jalankan secara terpisah:

- **Server saja:** `bun run dev:server` (Berjalan di `http://localhost:3000`)
- **Mobile saja:** `bun run dev:native`

> **Catatan:** Untuk menjalankan aplikasi mobile, gunakan aplikasi **Expo Go** di ponsel Anda atau jalankan emulator Android/iOS.

---

## 📂 Struktur Proyek

```text
lumira/
├── apps/
│   ├── native/      # Aplikasi Mobile (Expo/React Native)
│   └── server/      # Backend API (Hono)
├── packages/
│   ├── auth/        # Konfigurasi & Logika Better-Auth
│   ├── config/      # Shared configuration (TSConfig, dll)
│   └── db/          # Skema Drizzle & Migrasi Database
└── README.md
```

---

## ✨ Fitur Utama (Sedang Dikembangkan)

- [x] **Offline-First Sync:** Data tersimpan secara lokal dan otomatis sinkron saat online.
- [x] **Smart Forms:** Validasi formulir yang ketat dengan Zod dan React Hook Form.
- [x] **Modern Auth:** Login aman dengan berbagai provider.
- [ ] **MBTI Integration:** Personalisasi pengalaman berdasarkan tipe kepribadian.
- [ ] **Progress Tracking:** Visualisasi pencapaian tujuan pengguna.

---
