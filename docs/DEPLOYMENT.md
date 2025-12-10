# 🚀 LIGNOVIA - Deployment Rehberi

Bu doküman, LIGNOVIA e-ticaret platformunun Vercel'e deployment sürecini açıklar.

---

## 📋 Vercel Deployment Adımları

### 1. Vercel Hesabı ve GitHub Bağlantısı

1. **Vercel hesabı oluştur:**
   - https://vercel.com adresine git
   - "Sign Up" ile GitHub hesabınla giriş yap
   - GitHub hesabını Vercel'e bağla

2. **GitHub Repository'yi bağla:**
   - Vercel Dashboard > "Add New Project"
   - GitHub repository'ni seç: `abrekoglu/Lignovia-web`
   - "Import" butonuna tıkla

---

### 2. Proje Konfigürasyonu

Vercel otomatik olarak Next.js projesini algılar. Şu ayarları kontrol et:

- **Framework Preset:** Next.js (otomatik algılanır)
- **Root Directory:** `.` (proje root)
- **Build Command:** `npm run build` (otomatik)
- **Output Directory:** `.next` (otomatik)
- **Install Command:** `npm install` (otomatik)

---

### 3. Environment Variables Ekle

Vercel Dashboard > Project Settings > Environment Variables

**Tüm environment variables'ları ekle:**

#### Database
```
DATABASE_URL=postgresql://...
```

#### Cloudinary
```
CLOUDINARY_CLOUD_NAME=dn0x34z9t
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

#### Resend
```
RESEND_API_KEY=re_xxx
```

#### iyzico (Sandbox)
```
IYZICO_API_KEY=sandbox-xxx
IYZICO_SECRET_KEY=sandbox-xxx
IYZICO_BASE_URL=https://sandbox-api.iyzipay.com
```

#### Google OAuth
```
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx
NEXTAUTH_URL=https://your-project.vercel.app
NEXTAUTH_SECRET=goBIeqAVcQ9obs6xLuQ2Ws6Pf9XCCB/SV6bFdHJko8Q=
```

**Önemli:**
- Her variable için **Environment** seç: `Production`, `Preview`, `Development`
- `NEXTAUTH_URL` için production URL'ini kullan: `https://your-project.vercel.app`

---

### 4. İlk Deployment

1. **Deploy butonuna tıkla**
2. Vercel otomatik olarak:
   - Repository'yi clone eder
   - Dependencies yükler (`npm install`)
   - Prisma client generate eder (`postinstall` script)
   - Build yapar (`npm run build`)
   - Deploy eder

3. **Deployment tamamlandığında:**
   - Deployment URL'i gösterilir: `https://lignovia-web-xxx.vercel.app`
   - Production URL: `https://lignovia-web.vercel.app` (custom domain eklenebilir)

---

### 5. Deployment Sonrası Kontroller

#### ✅ Build Kontrolü
- [ ] Build başarılı mı? (Vercel Dashboard > Deployments)
- [ ] Build log'larında hata var mı?

#### ✅ Environment Variables Kontrolü
- [ ] Tüm environment variables eklendi mi?
- [ ] `NEXTAUTH_URL` production URL'ine güncellendi mi?

#### ✅ Site Kontrolü
- [ ] Site açılıyor mu?
- [ ] Console'da hata var mı? (Browser DevTools)
- [ ] API endpoints çalışıyor mu?
  - `/api/test/cloudinary`
  - `/api/test/resend`
  - `/api/test/iyzico`
  - `/api/test/google-oauth`

#### ✅ Database Kontrolü
- [ ] Prisma client generate edildi mi?
- [ ] Database connection çalışıyor mu?

---

### 6. Custom Domain (Opsiyonel)

1. Vercel Dashboard > Project Settings > Domains
2. Custom domain ekle
3. DNS ayarlarını yap (Vercel'in verdiği talimatlara göre)
4. SSL otomatik olarak aktif olur

---

## 🔧 Vercel CLI (Opsiyonel)

CLI ile de deploy edebilirsin:

```bash
# Vercel CLI kurulumu
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Production deploy
vercel --prod
```

---

## 📝 Notlar

- **Build Time:** Vercel her commit'te otomatik deploy yapar
- **Preview Deployments:** Her PR için preview URL oluşturulur
- **Environment Variables:** Her environment (Production, Preview, Development) için ayrı ayrı ayarlanabilir
- **Prisma:** `postinstall` script'i otomatik olarak `prisma generate` çalıştırır

---

## 🐛 Sorun Giderme

### Build Hatası
- Build log'larını kontrol et
- Environment variables eksik olabilir
- Prisma generate hatası olabilir

### Database Connection Hatası
- `DATABASE_URL` doğru mu?
- Supabase connection pooling aktif mi?

### API Endpoint Hatası
- Environment variables eklendi mi?
- API key'ler doğru mu?

---

**Son Güncelleme:** 10 Aralık 2024

