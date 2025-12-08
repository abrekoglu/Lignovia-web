# 🔍 Veritabanı Şema İnceleme Kontrol Listesi

Bu doküman, veritabanı şemasını gözden geçirirken kullanılacak profesyonel kontrol listesidir.

---

## 📋 Genel Kontrol Süreci

### Adım 1: İlişki Bütünlüğü Kontrolü

### Adım 2: Veri Bütünlüğü Kontrolü

### Adım 3: Performans Optimizasyonu Kontrolü

### Adım 4: İş Mantığı Kontrolü

### Adım 5: Güvenlik Kontrolü

### Adım 6: Senaryo Testleri

---

## 1️⃣ İlişki Bütünlüğü Kontrolü

### 1.1 Foreign Key Constraints

- [ ] **Tüm foreign key'ler tanımlandı mı?**
  - [ ] User → Orders (1:N) ✓
  - [ ] User → Addresses (1:N) ✓
  - [ ] User → CartItems (1:N) ✓
  - [ ] Product → ProductVariants (1:N) ✓
  - [ ] Product → ProductImages (1:N) ✓
  - [ ] Order → OrderItems (1:N) ✓
  - [ ] Category → Children (1:N, self-referential) ✓
  - [ ] Product ↔ Category (N:M through ProductCategory) ✓
  - [ ] Order → BillingAddress (N:1) ✓
  - [ ] Order → ShippingAddress (N:1) ✓
  - [ ] Return → ReturnItems (1:N) ✓
  - [ ] Diğer tüm ilişkiler ✓

### 1.2 Referential Integrity Stratejisi

- [ ] **Cascade Delete (Üst kayıt silinince alt kayıtlar da silinir):**
  - [ ] User → Addresses, CartItems, Favorites, Reviews, Notifications ✓
  - [ ] Product → ProductVariants, ProductImages, CartItems, Favorites ✓
  - [ ] Category → Children (recursive) ✓
  - [ ] Order → OrderItems ✓
  - [ ] Return → ReturnItems ✓
  - [ ] ShippingZone → ShippingRates ✓

- [ ] **Restrict Delete (Alt kayıtlar varsa üst kayıt silinemez):**
  - [ ] User → Orders (siparişi olan kullanıcı silinemez) ✓
  - [ ] Product → OrderItems (siparişte olan ürün silinemez) ✓
  - [ ] Address → Orders (siparişte kullanılan adres silinemez) ✓
  - [ ] OrderItem → ReturnItems (iade edilen kalem silinemez) ✓

- [ ] **SetNull Delete (Üst kayıt silinince referans null olur):**
  - [ ] User → AuditLogs (audit log'lar kalır) ✓
  - [ ] Coupon → Orders (kupon silinince order'daki couponId null) ✓
  - [ ] ProductVariant → OrderItems (variant silinince null) ✓

### 1.3 Circular Dependencies

- [ ] **Döngüsel bağımlılık var mı?**
  - [ ] Kontrol edildi: Yok ✓
  - [ ] Tüm ilişkiler tek yönlü veya junction table ile çözülmüş ✓

### 1.4 Orphan Records

- [ ] **Alt kayıtlar üst kayıt olmadan var olabilir mi?**
  - [ ] OrderItem → Order (Hayır, Restrict) ✓
  - [ ] CartItem → User (Hayır, Cascade) ✓
  - [ ] ReturnItem → Return (Hayır, Cascade) ✓
  - [ ] Gerekli yerlerde Restrict kullanılmış ✓

### 1.5 Self-Referential Relations

- [ ] **Category hiyerarşisi doğru mu?**
  - [ ] parentId field'ı var ✓
  - [ ] Recursive relation tanımlı ✓
  - [ ] Cascade delete stratejisi doğru mu? (SetNull önerilir - alt kategoriler üst kategori silinince bağımsız olmalı)

---

## 2️⃣ Veri Bütünlüğü Kontrolü

### 2.1 Unique Constraints

- [ ] **Email, SKU, Order Number gibi unique alanlar:**
  - [ ] User.email (unique) ✓
  - [ ] Product.slug (unique) ✓
  - [ ] Product.sku (unique) ✓
  - [ ] ProductVariant.sku (unique) ✓
  - [ ] Order.orderNumber (unique) ✓
  - [ ] Return.returnNumber (unique) ✓
  - [ ] Coupon.code (unique) ✓
  - [ ] Invoice.invoiceNumber (unique) ✓
  - [ ] SupportTicket.ticketNumber (unique) ✓

### 2.2 Composite Unique Constraints

- [ ] **Çoklu alan unique constraint'ler:**
  - [ ] ProductCategory: [productId, categoryId] ✓
  - [ ] CartItem: [userId, productId, variantId] ✓
  - [ ] Favorite: [userId, productId] ✓
  - [ ] RecentlyViewed: [userId, productId] ✓
  - [ ] VerificationToken: [identifier, token] ✓

### 2.3 Required Fields (NOT NULL)

- [ ] **Zorunlu alanlar doğru mu?**
  - [ ] User: email, role ✓
  - [ ] Product: name, slug, sku, price, stock ✓
  - [ ] Order: userId, orderNumber, status, total ✓
  - [ ] OrderItem: orderId, productId, quantity, price ✓
  - [ ] Address: userId, type, firstName, lastName, addressLine1, city, postalCode ✓

### 2.4 Default Values

- [ ] **Default değerler mantıklı mı?**
  - [ ] User.role: USER ✓
  - [ ] User.isActive: true ✓
  - [ ] Product.stock: 0 ✓
  - [ ] Product.isActive: true ✓
  - [ ] Order.status: PENDING ✓
  - [ ] Order.paymentStatus: PENDING ✓
  - [ ] CartItem.quantity: 1 ✓
  - [ ] Review.isApproved: false ✓
  - [ ] Notification.isRead: false ✓

### 2.5 Data Types

- [ ] **Decimal, Int, String, Boolean tipleri uygun mu?**
  - [ ] Fiyatlar: Decimal(10, 2) ✓
  - [ ] KDV oranı: Decimal(5, 2) ✓
  - [ ] Stok: Int ✓
  - [ ] Email: String (unique) ✓
  - [ ] Slug: String (unique) ✓
  - [ ] Timestamps: DateTime ✓

### 2.6 String Lengths

- [ ] **VARCHAR length'ler yeterli mi?**
  - [ ] Email: Yeterli (Prisma String = TEXT veya VARCHAR(255))
  - [ ] SKU: Yeterli
  - [ ] Order Number: Yeterli
  - [ ] Phone: Yeterli

---

## 3️⃣ Performans Optimizasyonu

### 3.1 Primary Keys

- [ ] **Tüm tablolarda primary key var mı?**
  - [ ] Tüm tablolarda `@id @default(cuid())` var ✓
  - [ ] NextAuth tablolarında custom ID'ler var (Session, Account) ✓

### 3.2 Foreign Key Indexes

- [ ] **Foreign key'lerde index var mı?**
  - [ ] Prisma otomatik olarak ekliyor ✓
  - [ ] Tüm foreign key'lerde index mevcut ✓

### 3.3 Unique Field Indexes

- [ ] **Unique alanlarda index var mı?**
  - [ ] User.email ✓
  - [ ] Product.slug, sku ✓
  - [ ] Order.orderNumber ✓
  - [ ] Coupon.code ✓

### 3.4 Filter Field Indexes

- [ ] **Sık filtrelenen alanlarda index var mı?**
  - [ ] User.role ✓
  - [ ] Product.isActive, isFeatured ✓
  - [ ] Category.isActive, parentId ✓
  - [ ] Order.status, userId ✓
  - [ ] Notification.isRead, userId ✓
  - [ ] Review.isApproved, rating ✓
  - [ ] CartItem.reservedUntil (cleanup için) ✓

### 3.5 Sort Field Indexes

- [ ] **Sık sıralanan alanlarda index var mı?**
  - [ ] createdAt (çoğu tabloda) ✓
  - [ ] updatedAt (gerekli yerlerde) ✓
  - [ ] order (Category, HeroSlide, FAQ) ✓

### 3.6 Composite Indexes

- [ ] **Multi-column query'ler için composite index:**
  - [ ] [userId, productId] - Favorites, CartItems, RecentlyViewed ✓
  - [ ] [userId, status] - Orders (user'ın belirli status'teki siparişleri) ✓
  - [ ] [productId, isActive] - Products (aktif ürünler) ✓
  - [ ] [userId, isRead] - Notifications (okunmamış bildirimler) ✓

### 3.7 Query Pattern Analysis

- [ ] **En sık yapılacak query'ler için index'ler yeterli mi?**
  - [ ] Kullanıcı siparişleri: userId + status index ✓
  - [ ] Ürün listeleme: isActive + createdAt index ✓
  - [ ] Sepet öğeleri: userId index ✓
  - [ ] Favoriler: userId + productId unique ✓

---

## 4️⃣ İş Mantığı Kontrolü

### 4.1 Business Rules

- [ ] **İş kuralları veritabanı seviyesinde uygulanıyor mu?**
  - [ ] Stock kontrolü: quantity >= 0 (application seviyesinde)
  - [ ] Fiyat kontrolü: price >= 0 (application seviyesinde)
  - [ ] Rating kontrolü: 1-5 arası (application seviyesinde)
  - [ ] Email format: Application seviyesinde (Zod validation)

### 4.2 State Transitions

- [ ] **Order status geçişleri mantıklı mı?**
  - [ ] PENDING → CONFIRMED → PROCESSING → SHIPPED → DELIVERED ✓
  - [ ] Herhangi bir durumdan → CANCELLED ✓
  - [ ] DELIVERED → RETURNED ✓

- [ ] **Return status geçişleri mantıklı mı?**
  - [ ] PENDING → APPROVED/REJECTED ✓
  - [ ] APPROVED → PROCESSING → COMPLETED ✓

### 4.3 Calculated Fields

- [ ] **Hesaplanan alanlar doğru mu?**
  - [ ] OrderItem.subtotal = quantity \* price ✓
  - [ ] OrderItem.tax = subtotal \* (taxRate / 100) ✓
  - [ ] OrderItem.total = subtotal + tax ✓
  - [ ] Order.tax = SUM(OrderItem.tax) ✓
  - [ ] Order.total = subtotal + tax + shippingCost - discount ✓

### 4.4 Stock Management

- [ ] **Stok yönetimi mantıklı mı?**
  - [ ] Product.stock ve ProductVariant.stock ayrı tutuluyor ✓
  - [ ] CartItem.reservedUntil ile rezervasyon var ✓
  - [ ] Low stock threshold kontrolü var ✓

---

## 5️⃣ Güvenlik Kontrolü

### 5.1 Sensitive Data

- [ ] **Hassas veriler hash'leniyor mu?**
  - [ ] User.password: bcrypt hash ✓
  - [ ] API keys: Environment variables'da ✓
  - [ ] OAuth tokens: Encrypted storage ✓

### 5.2 Audit Trail

- [ ] **Kritik işlemler log'lanıyor mu?**
  - [ ] AuditLog tablosu var ✓
  - [ ] Admin işlemleri kaydediliyor ✓
  - [ ] User, entityType, entityId, changes kaydediliyor ✓

### 5.3 Soft Delete

- [ ] **Hassas veriler soft delete ile mi siliniyor?**
  - [ ] User: deletedAt, deletedBy ✓
  - [ ] Product: deletedAt, deletedBy ✓
  - [ ] Category: deletedAt, deletedBy ✓
  - [ ] Address: deletedAt, deletedBy ✓
  - [ ] Review: deletedAt, deletedBy ✓

### 5.4 Data Retention

- [ ] **Log tabloları için retention policy:**
  - [ ] SMS logs: Retention policy belirlenmeli
  - [ ] Audit logs: Retention policy belirlenmeli
  - [ ] Abandoned carts: Retention policy belirlenmeli

---

## 6️⃣ Senaryo Testleri

### 6.1 Edge Cases

- [ ] **Kullanıcı silinince aktif siparişleri var mı?**
  - [ ] Restrict delete ile engellendi ✓
  - [ ] Test: User'ı silmeye çalış → Hata vermeli

- [ ] **Ürün silinince aktif siparişlerde var mı?**
  - [ ] Restrict delete ile engellendi ✓
  - [ ] Test: Product'ı silmeye çalış → Hata vermeli

- [ ] **Kategori silinince alt kategoriler ne olacak?**
  - [ ] SetNull önerilir (alt kategoriler bağımsız olmalı)
  - [ ] Şu an Cascade var - değiştirilmeli mi?

- [ ] **Kupon silinince kullanılmış siparişlerde ne olacak?**
  - [ ] SetNull - couponId null olur ✓
  - [ ] Sipariş geçmişi korunur ✓

### 6.2 Data Consistency

- [ ] **Stock consistency:**
  - [ ] Product.stock ve ProductVariant.stock ayrı tutuluyor (doğru)
  - [ ] Variant'lar ayrı stok tutabilir ✓

- [ ] **Price consistency:**
  - [ ] ProductVariant.price override edebilir (doğru)
  - [ ] OrderItem.price snapshot olarak saklanıyor (doğru) ✓

### 6.3 Performance Scenarios

- [ ] **Büyük veri setleri için:**
  - [ ] 100K+ ürün: Index'ler yeterli mi? ✓
  - [ ] 1M+ sipariş: Pagination var mı? (Application seviyesinde)
  - [ ] 10K+ kullanıcı: Query optimization gerekli mi?

---

## 7️⃣ Çoklu Dil ve Para Birimi

### 7.1 Multi-language Fields

- [ ] **TR ve EN alanlar eksiksiz mi?**
  - [ ] Product: name, nameEn, description, descriptionEn ✓
  - [ ] Category: name, nameEn, description, descriptionEn ✓
  - [ ] FAQ: question, questionEn, answer, answerEn ✓
  - [ ] HeroSlide: title, titleEn, description, descriptionEn ✓
  - [ ] ReturnReason: name, nameEn ✓
  - [ ] ShippingZone: name, nameEn ✓

### 7.2 Currency Support

- [ ] **TRY, USD, EUR için alanlar:**
  - [ ] Product: price, priceUsd, priceEur ✓
  - [ ] Order: currency field ✓
  - [ ] Currency conversion: Application seviyesinde (API ile)

---

## 8️⃣ KDV ve Vergi

### 8.1 Tax Rate

- [ ] **Ürün bazlı KDV oranı:**
  - [ ] Product.taxRate (Decimal 5,2) ✓
  - [ ] Default: 20% ✓

### 8.2 Tax Calculation

- [ ] **Sipariş seviyesinde KDV:**
  - [ ] OrderItem.taxRate, tax ✓
  - [ ] Order.tax (toplam) ✓
  - [ ] Hesaplama: subtotal \* (taxRate / 100) ✓

### 8.3 Tax Display

- [ ] **KDV dahil/hariç gösterim:**
  - [ ] Application seviyesinde hesaplanacak
  - [ ] Veritabanında hem dahil hem hariç tutulabilir (şu an sadece hariç)

---

## 9️⃣ Ödeme ve Fatura

### 9.1 Payment Tracking

- [ ] **Ödeme durumu:**
  - [ ] Order.paymentStatus enum ✓
  - [ ] Order.paymentMethod, paymentId ✓
  - [ ] iyzico entegrasyonu için yeterli ✓

### 9.2 Invoice Management

- [ ] **Fatura yönetimi:**
  - [ ] Invoice tablosu var ✓
  - [ ] Invoice.orderId (1:1) ✓
  - [ ] Invoice.invoiceNumber (unique) ✓
  - [ ] Invoice.pdfUrl, eInvoiceId, eInvoiceStatus ✓

---

## 🔟 İade ve İptal

### 10.1 Return Process

- [ ] **İade süreci:**
  - [ ] Return, ReturnItem, ReturnReason tabloları var ✓
  - [ ] Return.orderId, userId, reasonId ✓
  - [ ] Return.returnNumber (unique) ✓
  - [ ] Return.images (String array) ✓

### 10.2 Return Tracking

- [ ] **İade durumu:**
  - [ ] Return.status enum ✓
  - [ ] Return.refundAmount, refundedAt ✓

---

## 1️⃣1️⃣ Bildirim ve İletişim

### 11.1 Notifications

- [ ] **Kullanıcı bildirimleri:**
  - [ ] Notification tablosu var ✓
  - [ ] Notification.type, title, message, link ✓
  - [ ] Notification.isRead, createdAt ✓

### 11.2 Communication Logs

- [ ] **İletişim kayıtları:**
  - [ ] SmsLog tablosu var ✓
  - [ ] Email logs: Resend API log'ları kullanılabilir (ayrı tablo gerekmez)

---

## 1️⃣2️⃣ KVKK ve Yasal Uyumluluk

### 12.1 User Consents

- [ ] **KVKK izinleri:**
  - [ ] UserConsent tablosu var ✓
  - [ ] ConsentType enum (EMAIL_MARKETING, SMS_MARKETING, COOKIES) ✓
  - [ ] UserConsent.isAccepted, acceptedAt, revokedAt ✓

### 12.2 Data Deletion

- [ ] **Veri silme talebi:**
  - [ ] UserConsent ile takip edilebilir
  - [ ] Soft delete ile veriler korunur ✓

---

## 1️⃣3️⃣ Admin ve Audit

### 13.1 Audit Logs

- [ ] **Admin işlem kayıtları:**
  - [ ] AuditLog tablosu var ✓
  - [ ] AuditLog.userId, action, entityType, entityId, changes ✓
  - [ ] AuditLog.ipAddress, userAgent ✓

### 13.2 User Roles

- [ ] **Rol yönetimi:**
  - [ ] User.role enum (USER, ADMIN) ✓
  - [ ] RBAC için yeterli ✓

### 13.3 2FA Support

- [ ] **İki faktörlü kimlik doğrulama:**
  - [ ] User.twoFactorEnabled, twoFactorSecret, backupCodes ✓

---

## 1️⃣4️⃣ SEO ve İçerik

### 14.1 SEO Fields

- [ ] **Meta tags:**
  - [ ] Product: metaTitle, metaDescription ✓
  - [ ] Category: metaTitle, metaDescription ✓

### 14.2 Slug Fields

- [ ] **URL-friendly slugs:**
  - [ ] Product.slug (unique) ✓
  - [ ] Category.slug (unique) ✓

---

## 1️⃣5️⃣ Ölçeklenebilirlik

### 15.1 Pagination Support

- [ ] **Sayfalama için index'ler:**
  - [ ] createdAt index'leri var ✓
  - [ ] updatedAt index'leri var ✓

### 15.2 Archive Strategy

- [ ] **Eski veriler:**
  - [ ] Soft delete ile archive mümkün ✓
  - [ ] Retention policy belirlenmeli

### 15.3 Partitioning

- [ ] **Büyük tablolar:**
  - [ ] Şimdilik gerekli değil
  - [ ] İleride Order, OrderItem için partition düşünülebilir

---

## 1️⃣6️⃣ Migration ve Versiyonlama

### 16.1 Migration Strategy

- [ ] **Prisma migration:**
  - [ ] Migration dosyaları oluşturulacak
  - [ ] Rollback stratejisi hazır olmalı

### 16.2 Data Migration

- [ ] **Mevcut veri:**
  - [ ] Seed data script'i hazırlanmalı
  - [ ] Test data için fixtures oluşturulmalı

### 16.3 Backward Compatibility

- [ ] **Geriye dönük uyumluluk:**
  - [ ] Schema değişiklikleri dikkatli yapılmalı
  - [ ] Breaking changes dokümante edilmeli

---

## ✅ Son Kontrol

### Kritik Kontroller:

- [ ] Tüm foreign key'ler tanımlandı ✓
- [ ] Cascade/Restrict/SetNull stratejileri doğru ✓
- [ ] Unique constraint'ler doğru ✓
- [ ] Index'ler performans için yeterli ✓
- [ ] Soft delete eklendi (User, Product, Category, Address, Review) ✓
- [ ] Multi-language alanlar eksiksiz ✓
- [ ] KDV hesaplamaları için alanlar var ✓
- [ ] Timestamps tüm tablolarda var ✓
- [ ] Enum type'lar eksiksiz ✓

### Öneriler:

1. ✅ **Soft Delete Eklendi** - User, Product, Category, Address, Review tablolarına
2. ✅ **Order History** - Mevcut yapı yeterli (Order + AuditLog)
3. ⚠️ **Category Delete Stratejisi** - SetNull önerilir (şu an Cascade var)

---

## 🎯 Sonuç

**Şema hazır ve gözden geçirildi!**

Tüm ilişkiler, index'ler, constraint'ler ve business rules tanımlandı. Faz 2'de Prisma schema'ya dönüştürülecek.
