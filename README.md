# 🌳 LIGNOVIA E-Ticaret Platformu

Modern, performanslı, güvenli ve ölçeklenebilir e-ticaret platformu. Ahşap mutfak ürünleri ve ahşap dekorasyon ürünleri satışı için tasarlanmıştır.

---

## 📚 Dokümantasyon

Bu proje için hazırlanmış detaylı dokümantasyon:

1. **[TECHNOLOGY_STACK.md](./TECHNOLOGY_STACK.md)** - Kullanılan teknolojiler, kütüphaneler ve altyapı
2. **[SCOPE_DOCUMENT.md](./SCOPE_DOCUMENT.md)** - Proje kapsamı, özellikler ve gereksinimler
3. **[ROADMAP.md](./ROADMAP.md)** - Adım adım geliştirme planı ve yol haritası

---

## 🎯 Proje Özeti

### Temel Özellikler

- ✅ Modern, minimalist ve ürün odaklı tasarım
- ✅ Yüksek performans (SSR/SSG, Image optimization)
- ✅ Güvenli ödeme sistemi (iyzico)
- ✅ Çoklu dil desteği (TR, EN)
- ✅ Çoklu para birimi (TRY, USD, EUR)
- ✅ Dark mode desteği
- ✅ Real-time bildirimler
- ✅ Gelişmiş admin paneli
- ✅ SEO-optimized
- ✅ Mobil öncelikli tasarım

### Teknoloji Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Supabase)
- **Authentication**: NextAuth.js v5
- **Payment**: iyzico
- **Image**: Cloudinary
- **Email**: Resend
- **Hosting**: Vercel

---

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Node.js 18+
- npm veya yarn
- Git

### Kurulum

```bash
# Repository'yi klonla
git clone [repository-url]

# Dependencies yükle
npm install

# Environment variables ayarla
cp .env.example .env.local

# Veritabanı migration'ları çalıştır
npx prisma migrate dev

# Development server'ı başlat
npm run dev
```

---

## 📋 Proje Yapısı

```
lignovia-web/
├── app/                    # Next.js App Router
│   ├── (customer)/        # Müşteri sayfaları
│   ├── (admin)/           # Admin paneli
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── customer/         # Müşteri components
│   └── admin/            # Admin components
├── lib/                  # Utility functions
├── prisma/               # Prisma schema & migrations
├── public/               # Static files
├── styles/               # Global styles
└── types/                # TypeScript types
```

---

## 🎨 Tasarım Sistemi

### Renk Paleti

- **Primary**: #4A3A2C (Koyu kahve)
- **Secondary**: #D6C2B5 (Açık bej)
- **Accent**: #C97A5A (Terracotta)
- **Background Light**: #FAF7F2
- **Background Dark**: #1E1A17

### Tipografi

- **Body**: Inter
- **Logo**: Raleway Thin

---

## 📅 Geliştirme Planı

Proje 6 ana fazda geliştirilecek:

1. **Faz 1**: Proje Kurulumu ve Altyapı (1-2 hafta)
2. **Faz 2**: Temel Backend ve Veritabanı (3-4 hafta)
3. **Faz 3**: Frontend - Müşteri Tarafı (4-5 hafta)
4. **Faz 4**: Admin Paneli (3-4 hafta)
5. **Faz 5**: Entegrasyonlar ve Optimizasyon (2-3 hafta)
6. **Faz 6**: Test ve Deployment (1-2 hafta)

**Toplam Tahmini Süre: 14-20 hafta**

Detaylı plan için [ROADMAP.md](./ROADMAP.md) dosyasına bakın.

---

## 🔐 Güvenlik

- JWT Authentication
- Password hashing (bcrypt)
- Rate limiting
- CAPTCHA (Login/Register)
- Input validation (Zod)
- SQL Injection protection (Prisma)
- XSS protection (React)
- CSRF protection
- Security headers

---

## 📊 Performans Hedefleri

- **Lighthouse Score**: 90+
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.5s
- **Cumulative Layout Shift (CLS)**: < 0.1

---

## 🌍 Çoklu Dil ve Para Birimi

- **Diller**: Türkçe (TR), İngilizce (EN)
- **Para Birimleri**: TRY, USD, EUR
- URL-based routing: `/tr`, `/en`
- Otomatik para birimi dönüşümü

---

## 📱 Responsive Tasarım

- Mobile First Approach
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

---

## 🧪 Test

- Unit tests (Jest)
- Integration tests
- E2E tests (Playwright)
- Manual testing checklist

---

## 📦 Deployment

- **Hosting**: Vercel
- **Database**: Supabase (PostgreSQL)
- **CDN**: Vercel Edge Network + Cloudinary
- **Monitoring**: Sentry, Vercel Analytics

---

## 📝 Lisans

[Lisans bilgisi buraya eklenecek]

---

## 👥 Katkıda Bulunanlar

[Katkıda bulunanlar listesi]

---

## 📞 İletişim

[İletişim bilgileri]

---

**Son Güncelleme**: 8 Aralık 2024

---

## 📈 İlerleme Durumu

Detaylı ilerleme durumu için [PROGRESS.md](./PROGRESS.md) dosyasına bakın.

**Güncel Durum:** Faz 1 - Adım 1.5 (Font Kurulumu) sırada

### ✅ Tamamlanan Adımlar (Faz 1)
- Adım 1.1: Next.js Projesi ✅
- Adım 1.2: TypeScript, ESLint, Prettier ✅
- Adım 1.3: Git Repository ✅
- Adım 1.4: Tailwind CSS, shadcn/ui, LIGNOVIA Renk Paleti ✅
