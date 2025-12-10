# LIGNOVIA E-Ticaret - Kapsam Dokümanı

## 📋 Proje Özeti

LIGNOVIA markası için modern, performanslı, güvenli ve ölçeklenebilir e-ticaret platformu. Ahşap mutfak ürünleri ve ahşap dekorasyon ürünleri satışı için tasarlanmıştır.

---

## 🎯 Temel Özellikler

### 1. Kullanıcı Tarafı (Frontend - Müşteri)

#### 1.1 Ana Sayfa

- ✅ Hero Section (Slider - Admin panelinden yönetilebilir)
  - Kampanya/indirim görselleri
  - CTA butonları
- ✅ Öne Çıkan Ürünler (4 ürün grid)
- ✅ Kategori Kartları (Grid düzeni)
- ✅ About Us Bölümü (Küçük preview + ayrı sayfa)
- ✅ Newsletter Signup
- ✅ Footer (İletişim, sosyal medya, linkler)

#### 1.2 Ürün Kataloğu

- ✅ Ürün Listeleme Sayfası
  - Grid/List görünüm seçenekleri
  - Sayfalama (Pagination)
  - Sıralama (Fiyat, popülerlik, yenilik)
  - Filtreleme:
    - Kategori/Alt kategori
    - Fiyat aralığı
    - Varyant filtreleri (renk, boyut vb.)
    - Stok durumu
- ✅ Gelişmiş Arama
  - Full-text search
  - Kategori bazlı arama
  - Otomatik tamamlama (Autocomplete)
  - Arama sonuç sayfası

#### 1.3 Ürün Detay Sayfası

- ✅ Ürün Görselleri
  - Ana görsel + 10 adete kadar galeri
  - Slider görünümü
  - Thumbnail navigasyonu (alt kısımda)
  - Hover zoom efekti
  - Lightbox görünümü
- ✅ Ürün Bilgileri
  - Başlık, açıklama
  - Fiyat (TRY, USD, EUR)
  - Varyant seçimi (buton/dropdown - dinamik)
  - Stok durumu
  - Ürün özellikleri
- ✅ Ürün Açıklaması (Tab'lar)
  - Detaylar
  - Özellikler
  - Bakım talimatları
- ✅ Ürün Yorumları ve Puanlama
  - 5 yıldız rating sistemi
  - Yorum yazma (giriş yapmış kullanıcılar)
  - Yorum listeleme
  - Yorum filtreleme (en yeni, en yüksek puan)
- ✅ İlgili Ürünler (Alt kısım)
- ✅ Favorilere Ekleme
- ✅ Paylaşım Butonları (Sosyal medya)

#### 1.4 Sepet

- ✅ Sepet Drawer (Sağdan açılan)
  - Ürün listesi
  - Miktar değiştirme
  - Ürün silme
  - Toplam fiyat
  - Kargo hesaplama (varsa)
- ✅ Sepet Sayfası (Ayrı sayfa - opsiyonel)
- ✅ Sepet veritabanında saklanır (giriş yapmış kullanıcılar)

#### 1.5 Checkout (Ödeme)

- ✅ Adım 1: Adres Seçimi
  - Fatura adresi seçimi/ekleme
  - Kargo adresi seçimi/ekleme
  - Adres formu
- ✅ Adım 2: Kargo Seçimi
  - Kargo firması seçimi (ileride entegrasyon)
  - Kargo ücreti hesaplama
- ✅ Adım 3: Ödeme
  - iyzico entegrasyonu
  - 3D Secure
  - Taksit seçenekleri
  - Ödeme özeti
- ✅ Adım 4: Onay
  - Sipariş özeti
  - Sipariş numarası
  - Email bildirimi

#### 1.6 Kullanıcı Paneli

- ✅ Profil Yönetimi
  - Kişisel bilgiler
  - Şifre değiştirme
  - Profil fotoğrafı
  - İki faktörlü kimlik doğrulama (2FA) kurulumu
- ✅ Adres Yönetimi
  - Fatura adresleri listesi
  - Kargo adresleri listesi
  - Adres ekleme/düzenleme/silme
  - Varsayılan adres seçimi
- ✅ Sipariş Takibi
  - Sipariş listesi
  - Sipariş detayı
  - Sipariş durumu (Beklemede, Hazırlanıyor, Kargoda, Teslim Edildi)
  - Fatura indirme (PDF)
  - Sipariş iptal talebi
- ✅ İade/İptal Yönetimi
  - İade talep formu
  - İade sebebi seçimi
  - Fotoğraf yükleme (hasarlı ürün için)
  - İade takibi (durum, numara)
  - İptal talebi
- ✅ Favoriler
  - Favori ürünler listesi
  - Favorilerden silme
- ✅ Son Görüntülenen Ürünler
  - Son görüntülenen ürünler listesi
  - Tarayıcıda saklama (LocalStorage)
- ✅ Bildirimler
  - Real-time bildirimler
  - Bildirim geçmişi
  - Okundu/okunmadı durumu
  - Web push notification tercihleri
- ✅ KVKK Yönetimi
  - KVKK izin yönetimi (Email, SMS pazarlama)
  - Çerez tercihleri
  - Veri silme talebi
  - Veri itiraz hakkı

#### 1.7 Kimlik Doğrulama

- ✅ Kayıt Ol
  - Email/Şifre
  - Google OAuth
  - Facebook Login (opsiyonel)
  - Apple Sign In (opsiyonel)
  - Email doğrulama
  - CAPTCHA
  - KVKK onay checkbox'ları
  - Mesafeli satış sözleşmesi onayı
- ✅ Giriş Yap
  - Email/Şifre
  - Google OAuth
  - Facebook Login (opsiyonel)
  - Apple Sign In (opsiyonel)
  - "Beni Hatırla" özelliği
  - Şifremi Unuttum
  - İki faktörlü kimlik doğrulama (2FA)
- ✅ Şifre Sıfırlama
  - Email ile link gönderme
  - SMS ile kod gönderme (opsiyonel)
  - Yeni şifre belirleme

#### 1.8 Çoklu Dil ve Para Birimi

- ✅ Dil Seçimi (TR, EN)
  - URL-based routing (/tr, /en)
  - Dil değiştirme dropdown
  - Tüm içerikler çevrilir
- ✅ Para Birimi (TRY, USD, EUR)
  - Para birimi seçimi
  - Otomatik dönüşüm (API ile)
  - Fiyat gösterimi
  - KDV dahil/hariç gösterimi

#### 1.9 Dark Mode

- ✅ Light/Dark tema geçişi
- ✅ Kullanıcı tercihi kaydedilir
- ✅ Sistem tercihine göre otomatik seçim

#### 1.10 Yasal Sayfalar ve Uyumluluk

- ✅ KVKK Aydınlatma Metni sayfası
- ✅ Mesafeli Satış Sözleşmesi sayfası
- ✅ Tüketici Hakları sayfası
- ✅ Çerez Politikası sayfası
- ✅ Gizlilik Politikası sayfası
- ✅ Kullanım Koşulları sayfası
- ✅ Çerez Onay Banner'ı (KVKK uyumlu)
- ✅ Ön Bilgilendirme Formu (Checkout'ta)

#### 1.11 Sepet Gelişmiş Özellikler

- ✅ Abandoned Cart Recovery
  - Terk edilen sepet takibi
  - Otomatik email hatırlatma (1 saat, 24 saat, 3 gün)
  - SMS hatırlatma (opsiyonel)
  - Sepet kurtarma linki
- ✅ Stok Rezervasyonu
  - Sepete eklenen ürünler için rezervasyon
  - Rezervasyon süresi (30 dakika)
  - Otomatik rezervasyon iptali

---

### 2. Admin Paneli

#### 2.1 Dashboard

- ✅ Genel İstatistikler
  - Toplam satış
  - Günlük/haftalık/aylık grafikler
  - Sipariş sayıları
  - Kullanıcı sayıları
  - En çok satan ürünler
  - Stok uyarıları
- ✅ Son Aktiviteler
  - Son siparişler
  - Son kullanıcılar
  - Son ürün eklemeleri

#### 2.2 Ürün Yönetimi

- ✅ Ürün Listesi
  - Arama ve filtreleme
  - Toplu işlemler (aktif/pasif, silme)
- ✅ Ürün Ekleme/Düzenleme
  - Temel bilgiler (başlık, açıklama, SKU)
  - Kategori seçimi
  - Fiyat (TRY, USD, EUR)
  - KDV oranı seçimi (%1, %10, %20)
  - KDV dahil/hariç fiyat gösterimi
  - Stok yönetimi
  - Varyant yönetimi (renk, boyut vb.)
  - Görsel yükleme (Ana görsel + 10 adete kadar)
  - SEO ayarları (meta title, description)
  - Durum (Aktif/Pasif)
- ✅ Ürün Varyantları
  - Varyant tipleri (renk, boyut, malzeme vb.)
  - Varyant kombinasyonları
  - Varyant bazlı fiyat/stok
  - Varyant görselleri

#### 2.3 Kategori Yönetimi

- ✅ Kategori Listesi
  - Hiyerarşik görünüm (Ana kategori > Alt kategori)
  - Drag & drop ile sıralama
- ✅ Kategori Ekleme/Düzenleme
  - Kategori adı (TR, EN)
  - Açıklama
  - Üst kategori seçimi (ilişki yönetimi)
  - Kategori görseli
  - SEO ayarları
  - Durum (Aktif/Pasif)
- ✅ Kategori İlişkileri
  - Alt kategori ekleme/çıkarma
  - Kategori taşıma (üst kategori değiştirme)

#### 2.4 Sipariş Yönetimi

- ✅ Sipariş Listesi
  - Filtreleme (tarih, durum, kullanıcı)
  - Arama (sipariş no, müşteri adı)
- ✅ Sipariş Detayı
  - Müşteri bilgileri
  - Ürün listesi
  - Fatura adresi
  - Kargo adresi
  - Ödeme bilgileri
  - Sipariş durumu değiştirme
  - Not ekleme
  - Fatura oluşturma (PDF)
  - E-fatura gönderimi (GIB entegrasyonu)
- ✅ Sipariş Durumları
  - Beklemede
  - Onaylandı
  - Hazırlanıyor
  - Kargoya Verildi
  - Teslim Edildi
  - İptal Edildi
  - İade
- ✅ İade/İptal Yönetimi
  - İade talepleri listesi
  - İade onay/red süreci
  - İade sebep kategorileri yönetimi
  - İade işleme (ürün geri alma, para iadesi, stok geri ekleme)
  - İptal onay/red
  - İade raporları

#### 2.5 Stok Yönetimi

- ✅ Stok Listesi
  - Düşük stok uyarıları
  - Stok geçmişi
- ✅ Stok Güncelleme
  - Toplu stok güncelleme
  - Stok hareket kayıtları
  - Otomatik stok düşürme (sipariş onaylandığında)

#### 2.6 Kullanıcı Yönetimi

- ✅ Kullanıcı Listesi
  - Arama ve filtreleme
  - Rol bazlı filtreleme
- ✅ Kullanıcı Detayı
  - Profil bilgileri
  - Sipariş geçmişi
  - Adres bilgileri
  - Rol değiştirme (Admin/User)
  - Kullanıcı durumu (Aktif/Pasif)

#### 2.7 İçerik Yönetimi

- ✅ Hero Slider Yönetimi
  - Görsel yükleme
  - Başlık, açıklama, CTA butonu
  - Sıralama
  - Durum (Aktif/Pasif)
- ✅ About Us Sayfası
  - İçerik düzenleme (TR, EN)
  - Görsel ekleme
- ✅ Diğer Sayfalar
  - İletişim
  - Kargo ve İade Politikası
  - Gizlilik Politikası
  - Kullanım Koşulları

#### 2.8 Mail Sistemi

- ✅ Otomatik Mail Şablonları
  - Sipariş onayı
  - Kargo bilgilendirme
  - Şifre sıfırlama
  - Hoş geldin maili
  - Abonelik onayı
  - İade onayı
  - Abandoned cart hatırlatma
- ✅ Mail Gönderimi
  - Resend entegrasyonu
  - Mail geçmişi
  - Mail durumu takibi

#### 2.13 SMS Sistemi

- ✅ SMS Gateway Entegrasyonu
  - Netgsm, İleti Merkezi veya benzeri servis
- ✅ SMS Şablonları
  - Sipariş onayı
  - Kargo bilgilendirme
  - İade onayı
  - Şifre sıfırlama (opsiyonel)
  - Abandoned cart hatırlatma
- ✅ SMS Yönetimi
  - SMS geçmişi
  - SMS durumu takibi
  - SMS izin yönetimi

#### 2.9 Bildirim Sistemi

- ✅ Admin Bildirimleri
  - Yeni sipariş bildirimi
  - Düşük stok uyarısı
  - Yeni kullanıcı bildirimi
  - Sistem hataları
- ✅ Real-time Bildirimler
  - WebSocket/Socket.io entegrasyonu
  - Bildirim geçmişi
  - Okundu/okunmadı durumu

#### 2.10 Kupon ve İndirim Yönetimi

- ✅ Kupon Oluşturma
  - Kupon kodu
  - İndirim tipi (Yüzde/Sabit tutar)
  - Minimum sepet tutarı
  - Kullanım limiti
  - Geçerlilik tarihi
- ✅ Kupon Listesi
  - Kullanım istatistikleri
  - Durum (Aktif/Pasif)
- ✅ Toplu İndirimler
  - Kategori bazlı indirim
  - Ürün bazlı indirim
  - Tarih bazlı kampanyalar

#### 2.11 Yorum ve Rating Yönetimi

- ✅ Yorum Listesi
  - Onay bekleyen yorumlar
  - Yorum onaylama/reddetme
  - Yorum düzenleme/silme
  - Spam filtreleme

#### 2.12 Raporlar ve Analitik

- ✅ Satış Raporları
  - Tarih aralığı seçimi
  - Kategori bazlı satış
  - Ürün bazlı satış
  - KDV raporları
  - İade raporları
- ✅ Kullanıcı Analitiği
  - Yeni kayıtlar
  - Aktif kullanıcılar
  - Dönüşüm oranları
  - Müşteri segmentasyonu
- ✅ Arama Analitiği
  - En çok aranan kelimeler
  - Sonuç bulunamayan aramalar
  - Arama trendleri
- ✅ Gelişmiş Raporlar
  - Ürün performans raporları
  - Kampanya etkinlik raporları
  - Dönüşüm funnel analizi
  - Rapor export (PDF, Excel, CSV)

#### 2.14 Audit Trail (İşlem Kayıtları)

- ✅ Admin İşlem Kayıtları
  - Kim, ne zaman, ne yaptı?
  - Ürün değişiklikleri
  - Sipariş değişiklikleri
  - Fiyat değişiklikleri
  - Kullanıcı değişiklikleri
- ✅ Audit Log Görüntüleme
  - Filtreleme ve arama
  - Log export (PDF, CSV)

#### 2.15 E-Fatura Sistemi

- ✅ E-Fatura Entegrasyonu
  - GIB (Gelir İdaresi Başkanlığı) entegrasyonu
  - E-fatura gönderimi
  - E-arşiv fatura
- ✅ Fatura Yönetimi
  - Fatura şablonları
  - KDV detayları
  - Fatura PDF oluşturma
  - Fatura geçmişi

#### 2.16 Kargo Yönetimi

- ✅ Kargo Firması Entegrasyonları
  - Aras Kargo API
  - Yurtiçi Kargo API
  - MNG Kargo API
  - PTT Kargo API
  - Sürat Kargo API
- ✅ Kargo İşlemleri
  - Kargo takip numarası otomatik gönderimi
  - Kargo etiketi oluşturma (PDF)
  - Toplu kargo etiketi
  - Kargo durumu güncelleme
- ✅ Kargo Ücreti Hesaplama
  - Ağırlık bazlı
  - Hacim bazlı
  - Mesafe bazlı
  - Sabit ücret
  - Ücretsiz kargo eşiği
  - Kargo bölgeleri (İl, ilçe bazlı)

#### 2.17 Müşteri Destek Sistemi

- ✅ Ticket Sistemi
  - Destek talebi oluşturma (müşteri)
  - Ticket yönetimi (admin)
  - Ticket kategorileri
  - Ticket durum takibi
  - Ticket geçmişi
- ✅ SSS (FAQ) Yönetimi
  - SSS sayfası
  - SSS kategorileri
  - SSS arama
  - SSS yönetimi (admin)
- ✅ Canlı Destek (Live Chat)
  - Live chat entegrasyonu (Intercom, Tawk.to, vs.)
  - Chat widget
  - Chat geçmişi

---

### 3. Teknik Özellikler

#### 3.1 Performans

- ✅ Server-Side Rendering (SSR)
- ✅ Static Site Generation (SSG)
- ✅ Image Optimization (Next.js Image + Cloudinary)
- ✅ Code Splitting
- ✅ Lazy Loading
- ✅ CDN (Vercel Edge Network)
- ✅ Caching (Redis)
- ✅ Database Query Optimization

#### 3.2 SEO

- ✅ Meta Tags (Title, Description)
- ✅ Open Graph Tags
- ✅ Twitter Cards
- ✅ Schema.org JSON-LD
  - Product schema
  - Organization schema
  - Breadcrumb schema
- ✅ Sitemap.xml (Otomatik)
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ Hreflang Tags (Çoklu dil)

#### 3.3 Güvenlik

- ✅ HTTPS/SSL
- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ Rate Limiting
- ✅ CAPTCHA (Login/Register)
- ✅ Input Validation (Zod)
- ✅ SQL Injection Protection (Prisma)
- ✅ XSS Protection (React)
- ✅ CSRF Protection
- ✅ Security Headers (helmet)

#### 3.4 Analytics

- ✅ Google Analytics 4 (GA4)
- ✅ Vercel Analytics
- ✅ Google Search Console
- ✅ Custom Events Tracking

---

### 4. Gelecek Özellikler (Post-MVP)

#### 4.1 Gelişmiş Özellikler

- Ürün karşılaştırma
- Ürün önerileri (AI-based)
- Sosyal medya entegrasyonu
- Affiliate programı
- Gift card sistemi
- Wholesale fiyatlandırma
- Ürün paketleri (Bundles)
- Çoklu depo yönetimi

---

## 📊 Veritabanı Şeması (Özet)

### Ana Tablolar

- `users` - Kullanıcılar
- `products` - Ürünler
- `categories` - Kategoriler
- `product_variants` - Ürün varyantları
- `product_images` - Ürün görselleri
- `orders` - Siparişler
- `order_items` - Sipariş kalemleri
- `addresses` - Adresler
- `cart_items` - Sepet öğeleri
- `favorites` - Favoriler
- `reviews` - Yorumlar
- `coupons` - Kuponlar
- `notifications` - Bildirimler
- `hero_slides` - Hero slider
- `sessions` - Oturumlar (NextAuth)
- `returns` - İade talepleri
- `return_items` - İade kalemleri
- `return_reasons` - İade sebepleri
- `abandoned_carts` - Terk edilen sepetler
- `recently_viewed` - Son görüntülenen ürünler
- `user_consents` - KVKK izinleri
- `audit_logs` - İşlem kayıtları
- `invoices` - Faturalar
- `sms_logs` - SMS geçmişi
- `support_tickets` - Destek talepleri
- `faqs` - SSS
- `shipping_zones` - Kargo bölgeleri
- `shipping_rates` - Kargo ücretleri

---

## 🎨 Tasarım Gereksinimleri

### Renk Paleti

- Primary: #4A3A2C (Koyu kahve)
- Secondary: #D6C2B5 (Açık bej)
- Accent: #C97A5A (Terracotta)
- Background Light: #FAF7F2
- Background Dark: #1E1A17
- Text: #3E342B (Light), #E7DFD9 (Dark)

### Tipografi

- Body: Inter
- Logo: Raleway Thin

### Tasarım Prensipleri

- Minimalist
- Modern
- Ürün odaklı
- Mobil öncelikli
- Sade animasyonlar

---

## 📱 Responsive Tasarım

- Mobile First Approach
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

---

## ✅ MVP Kapsamı (İlk Aşama)

### Müşteri Tarafı

1. Ana sayfa (Hero, öne çıkan ürünler, kategoriler)
2. Ürün listeleme ve arama
3. Ürün detay sayfası
4. Sepet ve checkout
5. Kullanıcı kayıt/giriş (Email + Google)
6. Kullanıcı paneli (Profil, sipariş takibi, adresler)
7. Çoklu dil (TR, EN)
8. Para birimi (TRY, USD, EUR)
9. Dark mode

### Admin Paneli

1. Dashboard (Temel istatistikler)
2. Ürün yönetimi (CRUD)
3. Kategori yönetimi (Hiyerarşik)
4. Sipariş yönetimi
5. Stok yönetimi
6. Kullanıcı yönetimi
7. Hero slider yönetimi
8. Temel mail şablonları

### Teknik

1. iyzico entegrasyonu
2. Cloudinary entegrasyonu
3. Resend entegrasyonu
4. Temel SEO
5. Google Analytics
6. Temel güvenlik önlemleri

---

## 🚫 MVP Dışında Kalanlar (Sonraki Aşamalar)

1. Gelişmiş arama ve filtreleme (Full-text search)
2. Real-time bildirimler (WebSocket)
3. Ürün yorumları ve rating
4. Favoriler
5. Kupon sistemi
6. Ürün karşılaştırma
7. Kargo entegrasyonu
8. Gelişmiş raporlar
9. Toplu işlemler (Admin)

---

## 📝 Notlar

- Tüm özellikler responsive olacak
- Performance hedefi: Lighthouse 90+
- SEO-optimized
- Security-first approach
- Type-safe (TypeScript)
- Modern best practices
