# 📋 LIGNOVIA E-Ticaret - Yapılacaklar Listesi

Bu doküman, projenin adım adım ilerlemesi için detaylı yapılacaklar listesini içerir.

**Yaklaşım:** Her adım test edilmeden bir sonraki adıma geçilmeyecek. Her adımın performans ve güvenlik durumu kontrol edilecek.

---

## 🎯 Genel Yaklaşım

### Test Stratejisi

- ✅ Her adım sonrası manuel test
- ✅ **Her adımda Lighthouse performans testi** (90+ hedef)
- ✅ Güvenlik testi (Input validation, Rate limiting, Authentication)
- ✅ Cross-browser test (Chrome, Firefox, Safari, Edge)
- ✅ Mobile responsive test
- ✅ Accessibility test (Temel seviye)

### Commit Stratejisi

- ✅ **Her adım sonrası commit yapılacak**
- ✅ Anlamlı commit mesajları (Conventional Commits formatı önerilir)
- ✅ Örnek: `feat: add Tailwind CSS configuration`
- ✅ Örnek: `fix: resolve TypeScript errors in layout`
- ✅ Örnek: `chore: update dependencies`

### Branch Stratejisi

**Önerilen: Basit ve Etkili Yaklaşım**

```
main (veya master)
  └── develop (opsiyonel - büyük projeler için)
      └── feature/xxx (her önemli özellik için)
```

**Önerim:**

1. **main/master**: Production-ready kod (şimdilik burada çalışabiliriz)
2. **feature/xxx**: Büyük özellikler için (örn: `feature/authentication`, `feature/product-management`)
3. **hotfix/xxx**: Acil düzeltmeler için

**Başlangıç için:** `main` branch'inde çalışabiliriz. İleride büyük özellikler için feature branch'leri kullanabiliriz.

### Code Review

- ✅ Her adım sonrası kod incelemesi yapılacak
- ✅ Güvenlik açıkları kontrol edilecek
- ✅ Best practices uyumu kontrol edilecek
- ✅ Performans optimizasyonları değerlendirilecek

### Güvenlik Kontrol Listesi (Her Adım İçin)

- [ ] Input validation (Zod schemas)
- [ ] Authentication/Authorization kontrolü
- [ ] Rate limiting aktif mi?
- [ ] SQL injection koruması (Prisma kullanımı)
- [ ] XSS koruması (React escaping)
- [ ] Environment variables güvenli mi?
- [ ] Error messages hassas bilgi içermiyor mu?

### Performans Kontrol Listesi (Her Adım İçin)

- [ ] Lighthouse score 90+ (mümkünse)
- [ ] Bundle size makul mu?
- [ ] Image optimization yapıldı mı?
- [ ] Database query optimize edildi mi?
- [ ] Caching stratejisi uygun mu?

---

## 🚀 Faz 1: Proje Kurulumu ve Altyapı

### Adım 1.1: Next.js Projesi Oluşturma

**Hedef:** Çalışan Next.js 14 projesi

---

## 🚀 ADIM 1.1 BAŞLAMADAN ÖNCE

### 📋 Senin Yapman Gerekenler:

**1. Sistem Gereksinimleri Kontrolü:**

- [ ] Node.js 18+ yüklü mü? (`node --version` komutu ile kontrol et)
- [ ] npm yüklü mü? (`npm --version` komutu ile kontrol et)
- [ ] Git yüklü mü? (`git --version` komutu ile kontrol et)

**2. Klasör Hazırlığı:**

- [ ] Terminal/Command Prompt aç
- [ ] Proje klasörüne git: `cd C:\Users\Abrek\Desktop\Lignovia\web`
- [ ] Klasör boş mu kontrol et (yeni proje için)

**3. Hazırlık Kontrolü:**

- [ ] Internet bağlantısı var mı? (npm install için gerekli)
- [ ] Yeterli disk alanı var mı? (node_modules için ~500MB)

---

## 🔍 .md Dosyaları Gözden Geçirme

**Kontrol ediyorum...**

✅ **TODO_LIST.md:** Adım 1.1 tanımlı ve detaylı
✅ **ROADMAP.md:** Faz 1, Adım 1.1 ile uyumlu
✅ **TECHNOLOGY_STACK.md:** Next.js 14, TypeScript, App Router seçimleri tutarlı
✅ **SCOPE_DOCUMENT.md:** Kapsam ile uyumlu

**Akışa Uygunluk:** ✅ Tüm dosyalar uyumlu, sorun yok.

---

## ❓ Sorular

**1. Node.js versiyonu:**

- Node.js versiyonun kaç? (18+ olmalı)

**2. Package manager tercihi:**

- npm mi, yoksa yarn mı kullanmak istersin? (npm önerilir)

**3. Proje klasörü:**

- Klasör zaten var mı, yoksa yeni mi oluşturulacak?
- Eğer varsa, içinde dosya var mı? (boş olmalı)

**4. Git repository:**

- Git repository şimdi mi oluşturulsun, yoksa sonra mı? (Adım 1.3'te yapılacak ama şimdi de olabilir)

---

## ✅ Onay

**Hazırlıklar tamamlandı mı?**

- [ ] Node.js 18+ yüklü
- [ ] npm yüklü
- [ ] Terminal hazır
- [ ] Proje klasörüne gittin
- [ ] Soruları cevapladın

**Onay verdiğinde adıma başlayacağım! 🚀**

#### 🔧 Adım İçeriği (Ben Yapacağım):

- [ ] Next.js 14 projesi oluştur (TypeScript, App Router, ESLint)
- [ ] Proje yapısını kontrol et
- [ ] `npm run dev` ile çalıştır
- [ ] Tarayıcıda `http://localhost:3000` açılıyor mu kontrol et

---

## ✅ ADIM 1.1 TAMAMLANDI - Yapman Gerekenler

### 🧪 Test Senaryoları

**1. Temel Çalışma Testi:**

- [ ] Terminal'de `npm run dev` komutunu çalıştır
- [ ] Development server başladı mı? (Terminal'de "Ready" mesajı görünmeli)
- [ ] Tarayıcıda `http://localhost:3000` aç
- [ ] Next.js welcome sayfası görünüyor mu?

**2. Console Hata Kontrolü:**

- [ ] Browser Console'u aç (F12 > Console)
- [ ] Kırmızı hata mesajı var mı? (olmamalı)
- [ ] Sarı uyarı mesajı var mı? (kritik değil, ama not al)

**3. Terminal Hata Kontrolü:**

- [ ] Terminal'de kırmızı hata mesajı var mı? (olmamalı)
- [ ] TypeScript compilation hatası var mı? (olmamalı)

**4. Dosya Yapısı Kontrolü:**

- [ ] `app/` klasörü var mı?
- [ ] `app/layout.tsx` dosyası var mı?
- [ ] `app/page.tsx` dosyası var mı?
- [ ] `package.json` dosyası var mı?
- [ ] `tsconfig.json` dosyası var mı?
- [ ] `.gitignore` dosyası var mı?

**5. Lighthouse Performans Testi:**

- [ ] Chrome DevTools'u aç (F12)
- [ ] "Lighthouse" sekmesine git
- [ ] "Generate report" butonuna tıkla
- [ ] Sonuçları kontrol et:
  - Performance: 80+ (ilk adım için yeterli, 90+ hedef)
  - Accessibility: 90+ hedef
  - Best Practices: 90+ hedef
  - SEO: 90+ hedef
- [ ] Sonuçları not al (screenshot alabilirsin)

**6. Network Performans Testi:**

- [ ] Network tab'ı aç (F12 > Network)
- [ ] Sayfayı yenile (Ctrl+R veya F5)
- [ ] İlk yükleme süresi < 3s mi?
- [ ] Bundle size'ları kontrol et (main.js, main.css)

**7. Güvenlik Kontrolü:**

- [ ] `.env.local` dosyası var mı? (şimdilik olmayabilir, sorun değil)
- [ ] `.gitignore` dosyasında `.env.local` var mı?
- [ ] Kodda API key, password gibi hassas bilgiler var mı? (olmamalı)

**8. Code Review:**

- [ ] `package.json` dosyasını aç ve kontrol et
  - Next.js versiyonu 14.x mi?
  - TypeScript var mı?
  - React 18.x mi?
- [ ] `tsconfig.json` dosyasını kontrol et
  - Strict mode aktif mi?
- [ ] Oluşturulan dosyalar temiz görünüyor mu?

---

## ✅ Test Sonucu

**Tüm testler başarılı mı?**

- [ ] Evet, tüm testler başarılı → "Tamam" de
- [ ] Hayır, sorunlar var → Sorunları belirt, düzelteceğim

**"Tamam" dediğinde sonraki adıma geçişe hazırız! 🎉**

---

### Adım 1.2: TypeScript ve ESLint Konfigürasyonu

**Hedef:** Type-safe ve lint edilmiş kod

#### 📋 Adımdan Önce - Senin Yapman Gerekenler:

- [ ] Adım 1.1 tamamlandı ve onaylandı mı?
- [ ] Development server çalışıyor mu? (`npm run dev`)

#### 🔧 Adım İçeriği (Ben Yapacağım):

- [ ] TypeScript strict mode aktif mi kontrol et
- [ ] ESLint kurallarını kontrol et
- [ ] Prettier kurulumu ve konfigürasyonu
- [ ] `.prettierrc` ve `.prettierignore` oluştur
- [ ] Husky ve lint-staged kurulumu (opsiyonel - sonra eklenebilir)

#### ✅ Adımdan Sonra - Senin Yapman Gerekenler:

**1. Test Et:**

- [ ] VS Code'da (veya IDE'nde) TypeScript hataları gösteriliyor mu kontrol et
- [ ] ESLint uyarıları gösteriliyor mu kontrol et
- [ ] Terminal'de `npm run lint` komutunu çalıştır - hata var mı?
- [ ] Prettier format çalışıyor mu? (`npm run format` varsa)

**2. Lighthouse Testi Yap:**

- [ ] Chrome DevTools > Lighthouse
- [ ] Yeni report oluştur
- [ ] Performans skorunu karşılaştır (önceki adımla)
- [ ] Skor düştü mü? (Düşmemeli)

**3. Code Review:**

- [ ] `tsconfig.json` dosyasını kontrol et
- [ ] `eslint.config.js` (veya `.eslintrc`) dosyasını kontrol et
- [ ] `.prettierrc` dosyasını kontrol et
- [ ] Konfigürasyonlar mantıklı görünüyor mu?

**4. Onay Ver:**

- [ ] Tüm testler başarılı mı?
- [ ] Devam edebilir miyiz?

**✅ Onay:** Bu adım tamamlandı mı? Devam edelim mi?

---

### Adım 1.3: Git Repository Kurulumu

**Hedef:** Version control aktif

#### 📋 Adımdan Önce - Senin Yapman Gerekenler:

- [ ] Adım 1.2 tamamlandı ve onaylandı mı?
- [ ] Git yüklü mü kontrol et (`git --version`)
- [ ] GitHub/GitLab hesabın hazır mı? (Remote repository için)
- [ ] Terminal'de proje klasöründe olduğundan emin ol

#### 🔧 Adım İçeriği (Ben Yapacağım):

- [ ] Git repository başlat (`git init`)
- [ ] `.gitignore` dosyası oluştur (Next.js, Node.js, IDE, env files)
- [ ] İlk commit yap
- [ ] Remote repository bağla (GitHub/GitLab) - **Senin yapman gerekecek**

#### ✅ Adımdan Sonra - Senin Yapman Gerekenler:

**1. Git Kontrolü:**

- [ ] Terminal'de `git status` komutunu çalıştır
- [ ] `.env.local` listede görünmüyor mu? (görünmemeli - ignore edilmeli)
- [ ] `node_modules` listede görünmüyor mu? (görünmemeli)

**2. Remote Repository Bağla (Eğer Ben Yapmadıysam):**

- [ ] GitHub/GitLab'da yeni repository oluştur
- [ ] Repository URL'ini al
- [ ] Terminal'de: `git remote add origin [repository-url]`
- [ ] `git remote -v` ile kontrol et

**3. İlk Push (Opsiyonel - şimdi veya sonra):**

- [ ] `git push -u origin main` (veya `master`)

**4. Güvenlik Kontrolü:**

- [ ] `.env.local` dosyası commit edilmedi mi kontrol et
- [ ] `git log` ile commit geçmişini kontrol et
- [ ] Hassas bilgiler commit edilmedi mi?

**5. Onay Ver:**

- [ ] Git repository düzgün çalışıyor mu?
- [ ] `.gitignore` doğru çalışıyor mu?
- [ ] Devam edebilir miyiz?

**✅ Onay:** Bu adım tamamlandı mı? Devam edelim mi?

---

### Adım 1.4: Tailwind CSS Kurulumu

**Hedef:** Styling framework hazır

#### 📋 Adımdan Önce - Senin Yapman Gerekenler:

- [ ] Adım 1.3 tamamlandı ve onaylandı mı?
- [ ] Development server çalışıyor mu?

#### 🔧 Adım İçeriği (Ben Yapacağım):

- [ ] Tailwind CSS kurulumu
- [ ] `tailwind.config.js` oluştur
- [ ] LIGNOVIA renk paletini ekle
- [ ] Custom CSS variables tanımla
- [ ] Dark mode konfigürasyonu
- [ ] Test sayfası oluştur (renkler, dark mode)

#### ✅ Adımdan Sonra - Senin Yapman Gerekenler:

**1. Görsel Test:**

- [ ] Tarayıcıda test sayfasını aç
- [ ] Renkler doğru görünüyor mu? (LIGNOVIA renk paleti)
  - Primary: #4A3A2C (Koyu kahve)
  - Secondary: #D6C2B5 (Açık bej)
  - Accent: #C97A5A (Terracotta)
- [ ] Dark mode toggle butonuna tıkla
- [ ] Dark mode geçişi çalışıyor mu?
- [ ] Dark mode'da renkler doğru mu?

**2. Responsive Test:**

- [ ] Browser DevTools'da responsive mode'u aç (Ctrl+Shift+M)
- [ ] Mobile görünümü test et (< 768px)
- [ ] Tablet görünümü test et (768px - 1024px)
- [ ] Desktop görünümü test et (> 1024px)
- [ ] Breakpoints doğru çalışıyor mu?

**3. Lighthouse Testi:**

- [ ] Chrome DevTools > Lighthouse
- [ ] Yeni report oluştur
- [ ] Performance skorunu kontrol et
- [ ] CSS bundle size makul mu? (Network tab'da kontrol et)

**4. Code Review:**

- [ ] `tailwind.config.js` dosyasını kontrol et
- [ ] Renk paleti doğru eklenmiş mi?
- [ ] Dark mode konfigürasyonu doğru mu?

**5. Onay Ver:**

- [ ] Tüm testler başarılı mı?
- [ ] Renkler ve dark mode çalışıyor mu?
- [ ] Devam edebilir miyiz?

**✅ Onay:** Bu adım tamamlandı mı? Devam edelim mi?

---

### Adım 1.5: shadcn/ui Kurulumu

**Hedef:** UI component library hazır

#### 📋 Adımdan Önce - Senin Yapman Gerekenler:

- [ ] Adım 1.4 tamamlandı ve onaylandı mı?
- [ ] Development server çalışıyor mu?

#### 🔧 Adım İçeriği (Ben Yapacağım):

- [ ] shadcn/ui kurulumu
- [ ] `components.json` konfigürasyonu
- [ ] İlk component'i ekle (Button)
- [ ] Test sayfasında kullan

#### ✅ Adımdan Sonra - Senin Yapman Gerekenler:

**1. Görsel Test:**

- [ ] Test sayfasında Button component görünüyor mu?
- [ ] Button'a tıklanabiliyor mu?
- [ ] Styling doğru mu? (LIGNOVIA renklerine uygun mu?)

**2. Accessibility Test:**

- [ ] Button'a Tab ile focus olabiliyor mu?
- [ ] Enter/Space ile tıklanabiliyor mu?
- [ ] Screen reader için uygun mu? (Temel kontrol)

**3. Lighthouse Testi:**

- [ ] Chrome DevTools > Lighthouse
- [ ] Yeni report oluştur
- [ ] Accessibility skorunu kontrol et (90+ hedef)

**4. Code Review:**

- [ ] `components.json` dosyasını kontrol et
- [ ] Component dosyaları doğru yerde mi?

**5. Onay Ver:**

- [ ] Component çalışıyor mu?
- [ ] Devam edebilir miyiz?

**✅ Onay:** Bu adım tamamlandı mı? Devam edelim mi?

---

### Adım 1.6: Font Kurulumu ✅ TAMAMLANDI

**Hedef:** Inter ve Raleway Thin fontları + Logo aktif

#### Tamamlandı:

- [x] Inter font kurulumu (next/font) ✅
- [x] Raleway font kurulumu (thin dahil tüm weight'ler) ✅
- [x] CSS variables (--font-inter, --font-raleway) ✅
- [x] Tailwind font-family (font-sans, font-display) ✅
- [x] Logo SVG dosyaları (light/dark versiyonlar) ✅
- [x] Logo component (otomatik tema değişimi) ✅
- [x] Design System sayfası güncellendi ✅

---

### Adım 1.6: Supabase ve Prisma Kurulumu ✅ TAMAMLANDI

**Not:** ROADMAP.md'de bu adım 1.3 olarak numaralandırılmış, ancak kronolojik sıra 1.6'dır.

**Hedef:** Veritabanı bağlantısı hazır

#### ✅ Tamamlanan İşlemler:

- [x] Supabase hesabı ve projesi oluşturuldu ✅
- [x] Prisma 7.x kurulumu yapıldı ✅
- [x] prisma/schema.prisma (31 tablo) ✅
- [x] prisma.config.ts konfigürasyonu ✅
- [x] lib/prisma.ts client singleton ✅
- [x] .env dosyası (DATABASE_URL) ✅
- [x] Veritabanı senkronize edildi (db push) ✅
- [x] package.json db script'leri ✅

---

### Adım 1.7: External Services ✅ TAMAMLANDI

**Not:** ROADMAP.md'de bu adım 1.4 olarak numaralandırılmış.

#### ✅ Tamamlanan İşlemler:

- [x] Cloudinary hesabı ve konfigürasyonu ✅
  - [x] cloudinary ve next-cloudinary paketleri kuruldu
  - [x] lib/cloudinary.ts oluşturuldu
  - [x] Image presets tanımlandı
  - [x] Test endpoint: /api/test/cloudinary
- [x] Resend hesabı ve API key ✅
  - [x] resend paketi kuruldu
  - [x] lib/email.ts oluşturuldu
  - [x] Email templates hazırlandı
  - [x] Test endpoint: /api/test/resend
- [x] iyzico test hesabı (Sandbox) ✅
  - [x] iyzipay paketi kuruldu
  - [x] lib/iyzico.ts oluşturuldu
  - [x] Test cards tanımlandı
  - [x] Test endpoint: /api/test/iyzico
- [x] Google OAuth credentials ✅
  - [x] Test endpoint: /api/test/google-oauth
  - [x] NEXTAUTH_SECRET oluşturuldu

---

### Adım 1.8: Vercel Deployment Setup (SIRADAKİ ADIM)

**Not:** ROADMAP.md'de bu adım 1.5 olarak numaralandırılmış (Development Environment & DevOps).

**Hedef:** Vercel'de development environment hazır

#### 📋 Adımdan Önce - Senin Yapman Gerekenler:

- [ ] Adım 1.7 tamamlandı ve onaylandı mı? ✅
- [ ] **Vercel hesabı oluştur** (https://vercel.com)
- [ ] GitHub/GitLab hesabını Vercel'e bağla
- [ ] Git repository'yi push et (eğer henüz push etmediysen)
- [ ] `.env` dosyasındaki tüm environment variables'ları not al

#### 🔧 Adım İçeriği (Ben Yapacağım):

- [ ] Vercel CLI kurulumu (opsiyonel - dashboard'dan da yapılabilir)
- [ ] Vercel proje konfigürasyonu

#### ✅ Adımdan Sonra - Senin Yapman Gerekenler:

**1. Environment Variables Kontrolü:**

- [ ] `.env.local` dosyasında Cloudinary credentials var mı?
- [ ] Credentials doğru mu?
- [ ] `.env.local` commit edilmedi mi?

**2. Image Upload Testi:**

- [ ] Test sayfası/endpoint'i var mı? (Ben oluşturacağım)
- [ ] Küçük bir test görseli yükle
- [ ] Upload başarılı mı?
- [ ] Image URL doğru mu? (Cloudinary URL formatında mı?)

**3. Image Transformation Testi:**

- [ ] Image URL'ine transformation parametreleri ekle (örn: `?w=200`)
- [ ] Transformation çalışıyor mu?
- [ ] Resized image doğru mu?

**4. Güvenlik Kontrolü:**

- [ ] API Secret `.env.local`'de mi?
- [ ] Cloudinary Dashboard'da security settings kontrol et:
  - Signed uploads aktif mi? (opsiyonel)
  - Allowed file types sınırlı mı?

**5. Onay Ver:**

- [ ] Image upload çalışıyor mu?
- [ ] Güvenlik kontrolleri başarılı mı?
- [ ] Devam edebilir miyiz?

**✅ Onay:** Bu adım tamamlandı mı? Devam edelim mi?

---

### Adım 1.7b: External Services - Resend

**Hedef:** Resend hesabı ve konfigürasyonu

#### 📋 Adımdan Önce - Senin Yapman Gerekenler:

- [ ] Adım 1.8 tamamlandı ve onaylandı mı?
- [ ] **Resend hesabı oluştur** (https://resend.com)
- [ ] Resend Dashboard'dan API key al
- [ ] Domain verify et (opsiyonel - şimdilik test email ile başlayabiliriz)
- [ ] API key'i not al

#### 🔧 Adım İçeriği (Ben Yapacağım):

- [ ] Environment variables ekle (`.env.local`)
- [ ] Resend SDK kurulumu
- [ ] Test email utility oluştur
- [ ] Test email gönder

#### ✅ Adımdan Sonra - Senin Yapman Gerekenler:

**1. Environment Variables Kontrolü:**

- [ ] `.env.local` dosyasında Resend API key var mı?
- [ ] API key doğru mu?
- [ ] `.env.local` commit edilmedi mi?

**2. Email Gönderim Testi:**

- [ ] Test endpoint'i/sayfası var mı? (Ben oluşturacağım)
- [ ] Test email gönder
- [ ] Email gönderimi başarılı mı? (Terminal'de log kontrol et)
- [ ] Email inbox'a ulaştı mı? (Spam klasörünü de kontrol et)

**3. Email Format Kontrolü:**

- [ ] Email düzgün görünüyor mu?
- [ ] HTML format doğru mu? (eğer HTML email gönderdiysek)

**4. Güvenlik Kontrolü:**

- [ ] API key `.env.local`'de mi?
- [ ] Resend Dashboard'da rate limits kontrol et

**5. Onay Ver:**

- [ ] Email gönderimi çalışıyor mu?
- [ ] Email ulaşıyor mu?
- [ ] Devam edebilir miyiz?

**✅ Onay:** Bu adım tamamlandı mı? Devam edelim mi?

---

### Adım 1.7c: External Services - iyzico (Test)

**Hedef:** iyzico test hesabı hazır

#### 📋 Adımdan Önce - Senin Yapman Gerekenler:

- [ ] Adım 1.9 tamamlandı ve onaylandı mı?
- [ ] **iyzico test hesabı oluştur** (https://dev.iyzipay.com)
- [ ] Test API credentials al:
  - API Key
  - Secret Key
- [ ] **ÖNEMLİ:** Test credentials kullan (Production değil!)
- [ ] Credentials'ları not al

#### 🔧 Adım İçeriği (Ben Yapacağım):

- [ ] Environment variables ekle (`.env.local`)
- [ ] iyzico SDK kurulumu
- [ ] Test connection utility oluştur
- [ ] Test connection yap

#### ✅ Adımdan Sonra - Senin Yapman Gerekenler:

**1. Environment Variables Kontrolü:**

- [ ] `.env.local` dosyasında iyzico credentials var mı?
- [ ] **Test credentials kullanılıyor mu?** (Production değil!)
- [ ] `.env.local` commit edilmedi mi?

**2. API Connection Testi:**

- [ ] Test endpoint'i var mı? (Ben oluşturacağım)
- [ ] API connection test et
- [ ] Connection başarılı mı? (Terminal'de log kontrol et)

**3. Güvenlik Kontrolü:**

- [ ] API keys `.env.local`'de mi?
- [ ] **Test credentials kullanılıyor mu?** (Production credentials değil!)
- [ ] iyzico Dashboard'da test mode aktif mi?

**4. Onay Ver:**

- [ ] API connection çalışıyor mu?
- [ ] Test credentials kullanılıyor mu?
- [ ] Devam edebilir miyiz?

**✅ Onay:** Bu adım tamamlandı mı? Devam edelim mi?

---

### Adım 1.7d: Google OAuth Setup

**Hedef:** Google OAuth credentials hazır

#### 📋 Adımdan Önce - Senin Yapman Gerekenler:

- [ ] Adım 1.10 tamamlandı ve onaylandı mı?
- [ ] **Google Cloud Console'a git** (https://console.cloud.google.com)
- [ ] Yeni proje oluştur (veya mevcut projeyi seç)
- [ ] **APIs & Services > Credentials** bölümüne git
- [ ] **Create Credentials > OAuth client ID** seç
- [ ] Application type: **Web application** seç
- [ ] Authorized redirect URIs ekle:
  - `http://localhost:3000/api/auth/callback/google` (development)
  - `https://your-domain.vercel.app/api/auth/callback/google` (production - sonra eklenebilir)
- [ ] Client ID ve Client Secret'ı not al

#### 🔧 Adım İçeriği (Ben Yapacağım):

- [ ] Environment variables ekle (`.env.local`)
- [ ] NextAuth.js konfigürasyonuna Google provider ekle (ileride)

#### ✅ Adımdan Sonra - Senin Yapman Gerekenler:

**1. Environment Variables Kontrolü:**

- [ ] `.env.local` dosyasında Google OAuth credentials var mı?
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
- [ ] Credentials doğru mu?
- [ ] `.env.local` commit edilmedi mi?

**2. OAuth Configuration Kontrolü:**

- [ ] Google Cloud Console'da redirect URI doğru mu?
- [ ] Client ID ve Secret eşleşiyor mu?

**3. Güvenlik Kontrolü:**

- [ ] Client Secret `.env.local`'de mi?
- [ ] Google Cloud Console'da OAuth consent screen ayarları yapıldı mı?

**4. Onay Ver:**

- [ ] OAuth credentials hazır mı?
- [ ] Güvenlik kontrolleri başarılı mı?
- [ ] Devam edebilir miyiz?

**Not:** OAuth login testi ileride authentication sistemi kurulduğunda yapılacak.

**✅ Onay:** Bu adım tamamlandı mı? Devam edelim mi?

---

### Adım 1.8: Vercel Development Setup

**Hedef:** Vercel'de development environment hazır

#### 📋 Adımdan Önce - Senin Yapman Gerekenler:

- [ ] Adım 1.11 tamamlandı ve onaylandı mı?
- [ ] **Vercel hesabı oluştur** (https://vercel.com)
- [ ] GitHub/GitLab hesabını Vercel'e bağla
- [ ] Git repository'yi push et (eğer henüz push etmediysen)
- [ ] `.env.local` dosyasındaki tüm environment variables'ları not al

#### 🔧 Adım İçeriği (Ben Yapacağım):

- [ ] Vercel CLI kurulumu (opsiyonel - dashboard'dan da yapılabilir)
- [ ] Vercel proje konfigürasyonu

#### ✅ Adımdan Sonra - Senin Yapman Gerekenler:

**1. Vercel Proje Oluştur:**

- [ ] Vercel Dashboard'a git
- [ ] **Add New Project** butonuna tıkla
- [ ] Git repository'ni seç
- [ ] Framework Preset: **Next.js** seç
- [ ] Root Directory: `.` (veya proje root'u)
- [ ] **Deploy** butonuna tıkla

**2. Environment Variables Ekle:**

- [ ] Vercel Dashboard > Project Settings > Environment Variables
- [ ] `.env.local` dosyasındaki tüm variables'ları ekle:
  - Database URL (Supabase)
  - Cloudinary credentials
  - Resend API key
  - iyzico credentials
  - Google OAuth credentials
  - Diğer tüm environment variables
- [ ] Her variable için environment seç (Development, Preview, Production)
- [ ] **Save** butonuna tıkla

**3. Deployment Kontrolü:**

- [ ] Deployment başarılı mı? (Vercel Dashboard'da kontrol et)
- [ ] Deployment URL'ini aç (örn: `https://your-project.vercel.app`)
- [ ] Site açılıyor mu?
- [ ] Console'da hata var mı? (Browser DevTools)

**4. Environment Variables Testi:**

- [ ] Site çalışıyor mu? (Database connection, external services)
- [ ] Hata var mı? (Environment variables eksik/yanlış olabilir)

**5. Lighthouse Testi (Production):**

- [ ] Vercel URL'inde Lighthouse testi yap
- [ ] Performance skorunu kontrol et
- [ ] Production build performansı iyi mi?

**6. Onay Ver:**

- [ ] Deployment başarılı mı?
- [ ] Site çalışıyor mu?
- [ ] Environment variables doğru mu?
- [ ] Devam edebilir miyiz?

**✅ Onay:** Bu adım tamamlandı mı? Devam edelim mi?

---

## 📝 Genel Notlar

### Her Adım İçin Standart Süreç:

1. **Adımdan Önce:**
   - Önceki adım tamamlandı mı kontrol et
   - Gerekli hazırlıkları yap (hesap oluşturma, tool kurulumu, vs.)

2. **Adım Sırasında:**
   - Ben kodları yazacağım ve değişiklikleri yapacağım
   - Sen sadece izleyebilirsin veya başka işlerle ilgilenebilirsin

3. **Adımdan Sonra:**
   - **Sen test edeceksin** (görsel, fonksiyonel, performans)
   - **Sen Lighthouse testi yapacaksın**
   - **Sen code review yapacaksın**
   - **Sen onay vereceksin**

4. **Commit:**
   - Ben commit mesajını hazırlayacağım
   - Sen commit yapabilirsin veya ben yapabilirim (tercihine göre)

### Test Araçları:

- **Lighthouse:** Chrome DevTools > Lighthouse sekmesi
- **Network Tab:** Chrome DevTools > Network sekmesi
- **Console:** Chrome DevTools > Console sekmesi
- **Responsive Mode:** Chrome DevTools > Toggle device toolbar (Ctrl+Shift+M)

### Güvenlik Kontrolü:

Her adımda şunları kontrol et:

- `.env.local` commit edilmedi mi?
- API keys kodda hardcode edilmedi mi?
- Hassas bilgiler public'te değil mi?

---

## 🎯 Sonraki Adımlar

Faz 1 tamamlandıktan sonra Faz 2'ye (Temel Backend ve Veritabanı) geçilecek.

**İlk adıma başlamak için hazır mısın? 🚀**
