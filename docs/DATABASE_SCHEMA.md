# 🗄️ LIGNOVIA E-Ticaret - Veritabanı Şema Dokümantasyonu

**Son Güncelleme:** 10 Aralık 2024  
**Durum:** ✅ Tamamlandı ve Veritabanına Uygulandı

---

## 📊 Tablo Özeti

Toplam **31 tablo** tanımlandı:

| #   | Tablo               | Açıklama                          | İlişkiler                                                             |
| --- | ------------------- | --------------------------------- | --------------------------------------------------------------------- |
| 1   | `User`              | Kullanıcı hesapları               | 1:N → Orders, Addresses, CartItems, Reviews, Favorites, Notifications |
| 2   | `Account`           | OAuth hesapları (NextAuth)        | N:1 → User                                                            |
| 3   | `Session`           | Oturumlar (NextAuth)              | N:1 → User                                                            |
| 4   | `VerificationToken` | Email doğrulama tokenları         | Bağımsız                                                              |
| 5   | `UserConsent`       | KVKK/GDPR izinleri                | N:1 → User                                                            |
| 6   | `Product`           | Ürünler                           | 1:N → Variants, Images, Reviews                                       |
| 7   | `ProductVariant`    | Ürün varyantları (renk, boyut)    | N:1 → Product                                                         |
| 8   | `Category`          | Kategoriler (hiyerarşik)          | Self-referential, N:M → Products                                      |
| 9   | `ProductCategory`   | Ürün-Kategori ilişkisi (junction) | N:1 → Product, Category                                               |
| 10  | `ProductImage`      | Ürün görselleri                   | N:1 → Product                                                         |
| 11  | `Order`             | Siparişler                        | N:1 → User, 1:N → OrderItems                                          |
| 12  | `OrderItem`         | Sipariş kalemleri                 | N:1 → Order, Product, ProductVariant                                  |
| 13  | `Address`           | Kullanıcı adresleri               | N:1 → User, 1:N → Orders                                              |
| 14  | `CartItem`          | Sepet öğeleri                     | N:1 → User, Product, ProductVariant                                   |
| 15  | `Coupon`            | İndirim kuponları                 | 1:N → Orders                                                          |
| 16  | `Invoice`           | Faturalar                         | 1:1 → Order                                                           |
| 17  | `Return`            | İade talepleri                    | N:1 → Order, 1:N → ReturnItems                                        |
| 18  | `ReturnItem`        | İade kalemleri                    | N:1 → Return, OrderItem                                               |
| 19  | `ReturnReason`      | İade sebepleri                    | 1:N → Returns                                                         |
| 20  | `Review`            | Ürün yorumları                    | N:1 → User, Product                                                   |
| 21  | `Favorite`          | Favoriler                         | N:1 → User, Product                                                   |
| 22  | `RecentlyViewed`    | Son görüntülenenler               | N:1 → User, Product                                                   |
| 23  | `Notification`      | Kullanıcı bildirimleri            | N:1 → User                                                            |
| 24  | `SmsLog`            | SMS gönderim kayıtları            | Bağımsız                                                              |
| 25  | `AuditLog`          | Admin işlem kayıtları             | N:1 → User                                                            |
| 26  | `SupportTicket`     | Destek talepleri                  | N:1 → User                                                            |
| 27  | `ShippingZone`      | Kargo bölgeleri                   | 1:N → ShippingRates                                                   |
| 28  | `ShippingRate`      | Kargo ücretleri                   | N:1 → ShippingZone                                                    |
| 29  | `HeroSlide`         | Ana sayfa slider                  | Bağımsız                                                              |
| 30  | `FAQ`               | Sıkça sorulan sorular             | Bağımsız                                                              |

---

## 🔑 Enum Types

```prisma
enum UserRole {
  USER
  ADMIN
}

enum AddressType {
  SHIPPING
  BILLING
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  RETURNED
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}

enum ReturnStatus {
  PENDING
  APPROVED
  REJECTED
  PROCESSING
  COMPLETED
}

enum NotificationType {
  ORDER
  SHIPPING
  PROMOTION
  SYSTEM
  REVIEW
}

enum ConsentType {
  EMAIL_MARKETING
  SMS_MARKETING
  COOKIES
  PRIVACY_POLICY
  TERMS_OF_SERVICE
}

enum TicketStatus {
  OPEN
  IN_PROGRESS
  WAITING_CUSTOMER
  RESOLVED
  CLOSED
}

enum TicketPriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}
```

---

## 📋 Detaylı Tablo Yapıları

### 1. User (Kullanıcılar)

| Alan             | Tip       | Açıklama                 |
| ---------------- | --------- | ------------------------ |
| id               | String    | Primary key (cuid)       |
| email            | String    | Unique, kullanıcı emaili |
| password         | String?   | Hashed password          |
| name             | String?   | Ad soyad                 |
| phone            | String?   | Telefon numarası         |
| image            | String?   | Profil fotoğrafı URL     |
| role             | UserRole  | USER veya ADMIN          |
| isActive         | Boolean   | Aktif/Pasif durumu       |
| emailVerified    | DateTime? | Email doğrulama tarihi   |
| twoFactorEnabled | Boolean   | 2FA aktif mi?            |
| twoFactorSecret  | String?   | 2FA secret key           |
| backupCodes      | String[]  | 2FA backup kodları       |
| deletedAt        | DateTime? | Soft delete tarihi       |
| deletedBy        | String?   | Silen admin ID           |
| createdAt        | DateTime  | Oluşturma tarihi         |
| updatedAt        | DateTime  | Güncelleme tarihi        |

**Index'ler:** email, role, isActive

---

### 2. Product (Ürünler)

| Alan            | Tip       | Açıklama                   |
| --------------- | --------- | -------------------------- |
| id              | String    | Primary key                |
| name            | String    | Ürün adı (TR)              |
| nameEn          | String?   | Ürün adı (EN)              |
| slug            | String    | URL-friendly slug (unique) |
| description     | String?   | Açıklama (TR)              |
| descriptionEn   | String?   | Açıklama (EN)              |
| price           | Decimal   | Fiyat (TRY)                |
| priceUsd        | Decimal?  | Fiyat (USD)                |
| priceEur        | Decimal?  | Fiyat (EUR)                |
| comparePrice    | Decimal?  | Karşılaştırma fiyatı       |
| stock           | Int       | Stok adedi                 |
| categoryId      | String    | Ana kategori ID            |
| sku             | String?   | Stok kodu (unique)         |
| weight          | Decimal?  | Ağırlık (kg)               |
| dimensions      | String?   | Boyutlar                   |
| material        | String?   | Malzeme                    |
| taxRate         | Decimal   | KDV oranı (varsayılan: 20) |
| isActive        | Boolean   | Aktif mi?                  |
| isFeatured      | Boolean   | Öne çıkan mı?              |
| metaTitle       | String?   | SEO başlık                 |
| metaDescription | String?   | SEO açıklama               |
| deletedAt       | DateTime? | Soft delete                |
| deletedBy       | String?   | Silen admin                |
| createdAt       | DateTime  | Oluşturma tarihi           |
| updatedAt       | DateTime  | Güncelleme tarihi          |

**Index'ler:** categoryId, isActive, isFeatured, slug, createdAt

---

### 3. Category (Kategoriler)

| Alan            | Tip       | Açıklama                   |
| --------------- | --------- | -------------------------- |
| id              | String    | Primary key                |
| name            | String    | Kategori adı (TR)          |
| nameEn          | String?   | Kategori adı (EN)          |
| slug            | String    | URL-friendly slug (unique) |
| description     | String?   | Açıklama (TR)              |
| descriptionEn   | String?   | Açıklama (EN)              |
| imageUrl        | String?   | Kategori görseli           |
| parentId        | String?   | Üst kategori ID (self-ref) |
| order           | Int       | Sıralama                   |
| isActive        | Boolean   | Aktif mi?                  |
| metaTitle       | String?   | SEO başlık                 |
| metaDescription | String?   | SEO açıklama               |
| deletedAt       | DateTime? | Soft delete                |
| deletedBy       | String?   | Silen admin                |
| createdAt       | DateTime  | Oluşturma                  |
| updatedAt       | DateTime  | Güncelleme                 |

**Özellik:** parentId ile hiyerarşik yapı desteklenir.

---

### 4. Order (Siparişler)

| Alan              | Tip           | Açıklama                      |
| ----------------- | ------------- | ----------------------------- |
| id                | String        | Primary key                   |
| userId            | String        | Kullanıcı ID                  |
| orderNumber       | String        | Sipariş numarası (unique)     |
| subtotal          | Decimal       | Ara toplam                    |
| tax               | Decimal       | KDV tutarı                    |
| shippingCost      | Decimal       | Kargo ücreti                  |
| discount          | Decimal       | İndirim tutarı                |
| totalAmount       | Decimal       | Genel toplam                  |
| currency          | String        | Para birimi (varsayılan: TRY) |
| status            | OrderStatus   | Sipariş durumu                |
| shippingAddressId | String        | Teslimat adresi ID            |
| billingAddressId  | String        | Fatura adresi ID              |
| paymentMethod     | String?       | Ödeme yöntemi                 |
| paymentId         | String?       | Ödeme ID (iyzico)             |
| paymentStatus     | PaymentStatus | Ödeme durumu                  |
| couponId          | String?       | Kupon ID                      |
| trackingNumber    | String?       | Kargo takip no                |
| notes             | String?       | Notlar                        |
| shippedAt         | DateTime?     | Kargoya verilme tarihi        |
| deliveredAt       | DateTime?     | Teslim tarihi                 |
| createdAt         | DateTime      | Oluşturma                     |
| updatedAt         | DateTime      | Güncelleme                    |

**Index'ler:** userId, orderNumber, status, paymentStatus, createdAt, [userId, status]

---

### 5. Coupon (Kuponlar)

| Alan           | Tip       | Açıklama               |
| -------------- | --------- | ---------------------- |
| id             | String    | Primary key            |
| code           | String    | Kupon kodu (unique)    |
| description    | String?   | Açıklama               |
| discountType   | String    | percentage veya fixed  |
| discountValue  | Decimal   | İndirim değeri         |
| minOrderAmount | Decimal?  | Minimum sipariş tutarı |
| maxDiscount    | Decimal?  | Maksimum indirim       |
| usageLimit     | Int?      | Kullanım limiti        |
| usageCount     | Int       | Kullanım sayısı        |
| isActive       | Boolean   | Aktif mi?              |
| startsAt       | DateTime? | Başlangıç tarihi       |
| expiresAt      | DateTime? | Bitiş tarihi           |
| createdAt      | DateTime  | Oluşturma              |
| updatedAt      | DateTime  | Güncelleme             |

---

### 6. Return (İade Talepleri)

| Alan         | Tip          | Açıklama               |
| ------------ | ------------ | ---------------------- |
| id           | String       | Primary key            |
| orderId      | String       | Sipariş ID             |
| userId       | String       | Kullanıcı ID           |
| returnNumber | String       | İade numarası (unique) |
| reasonId     | String       | İade sebebi ID         |
| description  | String?      | Açıklama               |
| images       | String[]     | Görsel URL'leri        |
| status       | ReturnStatus | İade durumu            |
| refundAmount | Decimal?     | İade tutarı            |
| refundedAt   | DateTime?    | İade tarihi            |
| adminNotes   | String?      | Admin notları          |
| createdAt    | DateTime     | Oluşturma              |
| updatedAt    | DateTime     | Güncelleme             |

---

### 7. Notification (Bildirimler)

| Alan      | Tip              | Açıklama          |
| --------- | ---------------- | ----------------- |
| id        | String           | Primary key       |
| userId    | String           | Kullanıcı ID      |
| type      | NotificationType | Bildirim tipi     |
| title     | String           | Başlık            |
| message   | String           | Mesaj             |
| link      | String?          | Yönlendirme linki |
| isRead    | Boolean          | Okundu mu?        |
| createdAt | DateTime         | Oluşturma         |

**Index'ler:** userId, isRead, [userId, isRead], createdAt

---

### 8. AuditLog (İşlem Kayıtları)

| Alan       | Tip      | Açıklama           |
| ---------- | -------- | ------------------ |
| id         | String   | Primary key        |
| userId     | String?  | Admin kullanıcı ID |
| action     | String   | İşlem tipi         |
| entityType | String   | Tablo adı          |
| entityId   | String   | Kayıt ID           |
| changes    | Json?    | Değişiklikler      |
| ipAddress  | String?  | IP adresi          |
| userAgent  | String?  | Tarayıcı bilgisi   |
| createdAt  | DateTime | Oluşturma          |

---

## 🔗 İlişki Stratejileri

### Cascade Delete (Üst silinince alt da silinir)

- User → Addresses, CartItems, Favorites, Reviews, Notifications, Consents
- Product → Variants, Images, CartItems, Favorites
- Order → OrderItems
- Return → ReturnItems
- ShippingZone → ShippingRates

### Restrict Delete (Alt varsa üst silinemez)

- User → Orders (siparişi olan kullanıcı silinemez)
- Product → OrderItems (siparişte olan ürün silinemez)

### SetNull Delete (Üst silinince referans null olur)

- User → AuditLogs (log kalır, user null olur)
- Coupon → Orders (kupon silinince couponId null)
- Category → Parent (üst kategori silinince alt bağımsız)

---

## 📊 Index Stratejisi

### Primary Keys

- Tüm tablolarda `cuid()` kullanılıyor

### Unique Indexes

- User.email
- Product.slug, Product.sku
- Order.orderNumber
- Category.slug
- Coupon.code
- Invoice.invoiceNumber
- Return.returnNumber
- SupportTicket.ticketNumber

### Filter Indexes

- User.role, User.isActive
- Product.isActive, Product.isFeatured
- Order.status, Order.paymentStatus
- Notification.isRead
- Review.isApproved

### Composite Indexes

- Order: [userId, status]
- Notification: [userId, isRead]
- CartItem: [userId, productId, variantId] (unique)
- Favorite: [userId, productId] (unique)
- RecentlyViewed: [userId, productId] (unique)

---

## ✅ Özellik Kontrol Listesi

### Çoklu Dil Desteği ✅

- Product: name/nameEn, description/descriptionEn
- Category: name/nameEn, description/descriptionEn
- FAQ: question/questionEn, answer/answerEn
- HeroSlide: title/titleEn, description/descriptionEn
- ReturnReason: name/nameEn
- ShippingZone/Rate: name/nameEn

### Çoklu Para Birimi ✅

- Product: price (TRY), priceUsd, priceEur
- Order: currency field

### KDV Hesaplama ✅

- Product.taxRate (varsayılan: %20)
- OrderItem: taxRate, tax, subtotal, total
- Order: subtotal, tax, totalAmount

### Soft Delete ✅

- User: deletedAt, deletedBy
- Product: deletedAt, deletedBy
- Category: deletedAt, deletedBy
- Address: deletedAt, deletedBy
- Review: deletedAt, deletedBy

### SEO ✅

- Product: metaTitle, metaDescription, slug
- Category: metaTitle, metaDescription, slug

### 2FA ✅

- User: twoFactorEnabled, twoFactorSecret, backupCodes

### KVKK/GDPR ✅

- UserConsent tablosu
- ConsentType enum (EMAIL_MARKETING, SMS_MARKETING, COOKIES, vb.)

### Stok Yönetimi ✅

- Product.stock
- ProductVariant.stock
- CartItem.reservedUntil (stok rezervasyonu)

### İade Sistemi ✅

- Return, ReturnItem, ReturnReason tabloları
- ReturnStatus enum

---

## 🎯 Sonuç

Veritabanı şeması tamamlandı ve Supabase'e başarıyla uygulandı. Tüm tablolar, ilişkiler ve index'ler tanımlandı.

**Dosya:** `prisma/schema.prisma`  
**Veritabanı:** Supabase PostgreSQL  
**ORM:** Prisma 7.1.0
