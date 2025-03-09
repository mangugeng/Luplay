# Luplay

Luplay adalah platform streaming video yang menyediakan berbagai konten original series dan film. Platform ini dibangun menggunakan Next.js dan Firebase.

## Fitur

- Streaming video
- Manajemen konten (Series, Episode, Trailer)
- Sistem watchlist
- Berbagi konten ke media sosial
- Responsive design untuk mobile dan desktop
- Filter dan pengurutan episode

## Teknologi

- Next.js 13+
- Firebase (Firestore)
- TypeScript
- Tailwind CSS
- Styled Components
- Headless UI

## Instalasi

1. Clone repository
```bash
git clone https://github.com/mangugeng/luplay.git
cd luplay
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env.local
```
Isi `.env.local` dengan kredensial Firebase Anda.

4. Jalankan development server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Struktur Proyek

```
luplay/
├── app/               # Next.js app router
├── components/        # React components
├── lib/              # Utility functions & configurations
├── public/           # Static assets
└── styles/           # Global styles
```

## Kontribusi

Silakan buat issue atau pull request untuk berkontribusi pada proyek ini.

## Lisensi

[MIT License](LICENSE)
