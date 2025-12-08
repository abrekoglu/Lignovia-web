# 🗄️ LIGNOVIA E-Ticaret - Veritabanı Şema Tasarımı

Bu doküman, tüm veritabanı tablolarını, ilişkilerini ve detaylarını içerir.

---

## 📊 ER Diagram (Entity Relationship Diagram)

**Not:** ER diagram görsel olarak çizilebilir (draw.io, dbdiagram.io, vs.) ama şimdilik text-based tasarım yapacağız.

---

## 🔗 Tablo İlişkileri Genel Bakış

### Ana İlişkiler:

1. **User** → **Order** (1:N) - Bir kullanıcı birden fazla sipariş verebilir
2. **User** → **Address** (1:N) - Bir kullanıcının birden fazla adresi olabilir
3. **User** → **CartItem** (1:N) - Bir kullanıcının sepetinde birden fazla ürün olabilir
4. **User** → **Favorite** (1:N) - Bir kullanıcının birden fazla favorisi olabilir
5. **User** → **Review** (1:N) - Bir kullanıcı birden fazla yorum yapabilir
6. **User** → **Notification** (1:N) - Bir kullanıcıya birden fazla bildirim gönderilebilir
7. **User** → **UserConsent** (1:N) - Bir kullanıcının birden fazla izin kaydı olabilir
8. **User** → **SupportTicket** (1:N) - Bir kullanıcı birden fazla destek talebi açabilir
9. **User** → **AbandonedCart** (1:N) - Bir kullanıcının birden fazla terk edilmiş sepeti olabilir
10. **User** → **RecentlyViewed** (1:N) - Bir kullanıcı birden fazla ürün görüntüleyebilir

11. **Product** → **ProductVariant** (1:N) - Bir ürünün birden fazla varyantı olabilir
12. **Product** → **ProductImage** (1:N) - Bir ürünün birden fazla görseli olabilir
13. **Product** → **OrderItem** (1:N) - Bir ürün birden fazla siparişte yer alabilir
14. **Product** → **CartItem** (1:N) - Bir ürün birden fazla sepette olabilir
15. **Product** → **Favorite** (1:N) - Bir ürün birden fazla kullanıcının favorisi olabilir
16. **Product** → **Review** (1:N) - Bir ürüne birden fazla yorum yapılabilir
17. **Product** → **RecentlyViewed** (1:N) - Bir ürün birden fazla kullanıcı tarafından görüntülenebilir
18. **Product** → **Category** (N:M) - Bir ürün birden fazla kategoriye ait olabilir, bir kategoride birden fazla ürün olabilir

19. **Category** → **Category** (Self-referential, 1:N) - Kategoriler hiyerarşik (ana kategori > alt kategori)

20. **Order** → **OrderItem** (1:N) - Bir siparişte birden fazla ürün olabilir
21. **Order** → **Address** (N:1) - Bir sipariş bir fatura adresine sahiptir
22. **Order** → **Address** (N:1) - Bir sipariş bir kargo adresine sahiptir
23. **Order** → **Invoice** (1:1) - Bir sipariş bir faturaya sahip olabilir
24. **Order** → **Return** (1:N) - Bir siparişe birden fazla iade talebi olabilir

25. **ProductVariant** → **OrderItem** (N:1) - Bir sipariş kalemi bir varyanta ait olabilir
26. **ProductVariant** → **CartItem** (N:1) - Bir sepet öğesi bir varyanta ait olabilir

27. **Return** → **ReturnItem** (1:N) - Bir iade talebinde birden fazla ürün olabilir
28. **Return** → **ReturnReason** (N:1) - Bir iade talebi bir iade sebebine sahiptir

29. **Coupon** → **Order** (1:N) - Bir kupon birden fazla siparişte kullanılabilir

30. **HeroSlide** → (Bağımsız) - Hero slider için

31. **ShippingZone** → **ShippingRate** (1:N) - Bir kargo bölgesinde birden fazla kargo ücreti olabilir

32. **Faq** → **Faq** (Self-referential, opsiyonel) - FAQ kategorileri için

33. **AuditLog** → **User** (N:1) - Bir audit log bir kullanıcıya ait olabilir (admin işlemleri için)

---

## 📋 Detaylı Tablo Tasarımları

### 1. `users` - Kullanıcılar

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified DateTime?
  name          String?
  password      String?   // Hashed password (bcrypt)
  image         String?   // Profile picture URL (Cloudinary)
  phone         String?
  role          UserRole  @default(USER)
  isActive      Boolean   @default(true)
  twoFactorEnabled Boolean @default(false)
  twoFactorSecret String?
  backupCodes   String[] // JSON array of backup codes
  deletedAt     DateTime? // Soft delete
  deletedBy     String?   // Admin user ID who deleted
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  addresses        Address[]
  orders           Order[]
  cartItems        CartItem[]
  favorites        Favorite[]
  reviews          Review[]
  notifications    Notification[]
  consents         UserConsent[]
  supportTickets   SupportTicket[]
  abandonedCarts   AbandonedCart[]
  recentlyViewed   RecentlyViewed[]
  auditLogs        AuditLog[] // Admin actions
  sessions         Session[] // NextAuth

  @@index([email])
  @@index([role])
  @@index([deletedAt])
  @@map("users")
}
```

````

**İlişkiler:**
- `orders` → Order (1:N)
- `addresses` → Address (1:N)
- `cartItems` → CartItem (1:N)
- `favorites` → Favorite (1:N)
- `reviews` → Review (1:N)
- `notifications` → Notification (1:N)
- `consents` → UserConsent (1:N)
- `supportTickets` → SupportTicket (1:N)
- `abandonedCarts` → AbandonedCart (1:N)
- `recentlyViewed` → RecentlyViewed (1:N)

---

### 2. `products` - Ürünler

```prisma
model Product {
  id              String   @id @default(cuid())
  name            String   // TR
  nameEn          String?  // EN
  slug            String   @unique
  description     String?  // TR
  descriptionEn   String?  // EN
  sku             String   @unique
  price           Decimal  @db.Decimal(10, 2) // Base price in TRY
  priceUsd        Decimal? @db.Decimal(10, 2)
  priceEur        Decimal? @db.Decimal(10, 2)
  taxRate         Decimal  @default(20) @db.Decimal(5, 2) // KDV oranı (%)
  stock           Int      @default(0)
  lowStockThreshold Int    @default(10)
  weight          Decimal? @db.Decimal(10, 2) // kg
  dimensions      Json?    // {length, width, height} in cm
  isActive        Boolean  @default(true)
  isFeatured      Boolean  @default(false)
  metaTitle       String?
  metaDescription String?
  deletedAt       DateTime? // Soft delete
  deletedBy       String?   // Admin user ID who deleted
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  categories      ProductCategory[]
  variants        ProductVariant[]
  images          ProductImage[]
  orderItems      OrderItem[]
  cartItems       CartItem[]
  favorites       Favorite[]
  reviews         Review[]
  recentlyViewed  RecentlyViewed[]

  @@index([slug])
  @@index([sku])
  @@index([isActive])
  @@index([isFeatured])
  @@index([createdAt])
  @@index([deletedAt])
  @@map("products")
}
````

````

**İlişkiler:**
- `categories` → ProductCategory (N:M through junction table)
- `variants` → ProductVariant (1:N)
- `images` → ProductImage (1:N)
- `orderItems` → OrderItem (1:N)
- `cartItems` → CartItem (1:N)
- `favorites` → Favorite (1:N)
- `reviews` → Review (1:N)
- `recentlyViewed` → RecentlyViewed (1:N)

---

### 3. `categories` - Kategoriler (Hiyerarşik)

```prisma
model Category {
  id            String   @id @default(cuid())
  name          String   // TR
  nameEn        String?  // EN
  slug          String   @unique
  description   String?  // TR
  descriptionEn String?  // EN
  image         String?  // Category image URL (Cloudinary)
  parentId      String?  // Self-referential for hierarchical structure
  order         Int      @default(0) // Display order
  isActive      Boolean  @default(true)
  metaTitle     String?
  metaDescription String?
  deletedAt     DateTime? // Soft delete
  deletedBy     String?   // Admin user ID who deleted
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Relations
  parent        Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id], onDelete: SetNull)
  children      Category[] @relation("CategoryHierarchy")
  products      ProductCategory[]

  // Note: onDelete: SetNull - Üst kategori silinince alt kategoriler bağımsız olur

  @@index([slug])
  @@index([parentId])
  @@index([isActive])
  @@map("categories")
}
````

**İlişkiler:**

- `parent` → Category (Self-referential, N:1)
- `children` → Category (Self-referential, 1:N)
- `products` → ProductCategory (N:M through junction table)

---

### 4. `product_categories` - Ürün-Kategori İlişkisi (Junction Table)

```prisma
model ProductCategory {
  id         String   @id @default(cuid())
  productId  String
  categoryId String
  createdAt  DateTime @default(now())

  // Relations
  product    Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  category   Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  @@unique([productId, categoryId])
  @@index([productId])
  @@index([categoryId])
  @@map("product_categories")
}
```

**İlişkiler:**

- `product` → Product (N:1)
- `category` → Category (N:1)

---

### 5. `product_variants` - Ürün Varyantları

```prisma
model ProductVariant {
  id          String   @id @default(cuid())
  productId   String
  name        String   // Variant name (e.g., "Red - Large")
  sku         String   @unique
  price       Decimal? @db.Decimal(10, 2) // Override product price if different
  stock       Int      @default(0)
  attributes  Json     // {color: "Red", size: "Large", material: "Wood"}
  image       String?  // Variant-specific image URL
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  product     Product   @relation(fields: [productId], references: [id], onDelete: Cascade)
  orderItems  OrderItem[]
  cartItems   CartItem[]

  @@index([productId])
  @@index([sku])
  @@map("product_variants")
}
```

**İlişkiler:**

- `product` → Product (N:1, Cascade delete)
- `orderItems` → OrderItem (1:N)
- `cartItems` → CartItem (1:N)

---

### 6. `product_images` - Ürün Görselleri

```prisma
model ProductImage {
  id          String   @id @default(cuid())
  productId   String
  url         String   // Cloudinary URL
  alt         String?
  order       Int      @default(0) // Display order
  isPrimary   Boolean  @default(false) // Main image
  createdAt   DateTime @default(now())

  // Relations
  product     Product  @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@index([productId])
  @@index([isPrimary])
  @@map("product_images")
}
```

**İlişkiler:**

- `product` → Product (N:1, Cascade delete)

---

### 7. `orders` - Siparişler

```prisma
model Order {
  id                String      @id @default(cuid())
  orderNumber       String      @unique // Human-readable order number
  userId            String
  status            OrderStatus @default(PENDING)
  subtotal          Decimal     @db.Decimal(10, 2)
  tax               Decimal     @db.Decimal(10, 2) // KDV
  shippingCost      Decimal    @default(0) @db.Decimal(10, 2)
  discount          Decimal     @default(0) @db.Decimal(10, 2) // Coupon discount
  total             Decimal     @db.Decimal(10, 2)
  currency          String      @default("TRY")
  paymentMethod     String?     // "iyzico", "cash", etc.
  paymentStatus     PaymentStatus @default(PENDING)
  paymentId         String?     // iyzico payment ID
  billingAddressId  String
  shippingAddressId String
  shippingMethod    String?     // Shipping company
  trackingNumber    String?
  notes             String?     // Admin notes
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt

  // Relations
  user              User        @relation(fields: [userId], references: [id], onDelete: Restrict)
  billingAddress    Address     @relation("BillingAddress", fields: [billingAddressId], references: [id], onDelete: Restrict)
  shippingAddress   Address     @relation("ShippingAddress", fields: [shippingAddressId], references: [id], onDelete: Restrict)
  items             OrderItem[]
  invoice           Invoice?
  returns           Return[]
  coupon            Coupon?     @relation(fields: [couponId], references: [id], onDelete: SetNull)
  couponId          String?

  @@index([userId])
  @@index([orderNumber])
  @@index([status])
  @@index([createdAt])
  @@map("orders")
}
```

**İlişkiler:**

- `user` → User (N:1, Restrict delete)
- `billingAddress` → Address (N:1, Restrict delete)
- `shippingAddress` → Address (N:1, Restrict delete)
- `items` → OrderItem (1:N)
- `invoice` → Invoice (1:1)
- `returns` → Return (1:N)
- `coupon` → Coupon (N:1, SetNull on delete)

---

### 8. `order_items` - Sipariş Kalemleri

```prisma
model OrderItem {
  id            String   @id @default(cuid())
  orderId       String
  productId     String
  variantId     String?
  quantity      Int
  price         Decimal  @db.Decimal(10, 2) // Price at time of order
  taxRate       Decimal  @db.Decimal(5, 2) // KDV oranı
  subtotal      Decimal  @db.Decimal(10, 2) // quantity * price
  tax           Decimal  @db.Decimal(10, 2) // KDV amount
  total         Decimal  @db.Decimal(10, 2) // subtotal + tax
  createdAt     DateTime @default(now())

  // Relations
  order         Order         @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product       Product      @relation(fields: [productId], references: [id], onDelete: Restrict)
  variant       ProductVariant? @relation(fields: [variantId], references: [id], onDelete: SetNull)

  @@index([orderId])
  @@index([productId])
  @@map("order_items")
}
```

**İlişkiler:**

- `order` → Order (N:1, Cascade delete)
- `product` → Product (N:1, Restrict delete)
- `variant` → ProductVariant (N:1, SetNull on delete)

---

### 9. `addresses` - Adresler

```prisma
model Address {
  id            String      @id @default(cuid())
  userId        String
  type          AddressType // BILLING or SHIPPING
  firstName     String
  lastName      String
  company       String?
  addressLine1 String
  addressLine2 String?
  city          String
  state         String?    // İl
  postalCode    String
  country       String      @default("TR")
  phone         String?
  isDefault     Boolean     @default(false)
  deletedAt     DateTime?   // Soft delete
  deletedBy     String?     // Admin user ID who deleted
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  // Relations
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  billingOrders     Order[] @relation("BillingAddress")
  shippingOrders    Order[] @relation("ShippingAddress")

  @@index([userId])
  @@index([type])
  @@map("addresses")
}
```

**İlişkiler:**

- `user` → User (N:1, Cascade delete)
- `billingOrders` → Order (1:N)
- `shippingOrders` → Order (1:N)

---

### 10. `cart_items` - Sepet Öğeleri

```prisma
model CartItem {
  id          String   @id @default(cuid())
  userId      String
  productId   String
  variantId   String?
  quantity    Int      @default(1)
  reservedUntil DateTime? // Stock reservation expiry
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  user        User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  product     Product         @relation(fields: [productId], references: [id], onDelete: Cascade)
  variant     ProductVariant? @relation(fields: [variantId], references: [id], onDelete: Cascade)

  @@unique([userId, productId, variantId])
  @@index([userId])
  @@index([reservedUntil]) // For cleanup of expired reservations
  @@map("cart_items")
}
```

**İlişkiler:**

- `user` → User (N:1, Cascade delete)
- `product` → Product (N:1, Cascade delete)
- `variant` → ProductVariant (N:1, Cascade delete)

---

### 11. `favorites` - Favoriler

```prisma
model Favorite {
  id        String   @id @default(cuid())
  userId    String
  productId String
  createdAt DateTime @default(now())

  // Relations
  user      User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([userId, productId])
  @@index([userId])
  @@index([productId])
  @@map("favorites")
}
```

**İlişkiler:**

- `user` → User (N:1, Cascade delete)
- `product` → Product (N:1, Cascade delete)

---

### 12. `reviews` - Ürün Yorumları

```prisma
model Review {
  id          String   @id @default(cuid())
  userId      String
  productId   String
  rating      Int      // 1-5 stars
  title       String?
  comment     String?
  isApproved  Boolean  @default(false)
  isVerified  Boolean  @default(false) // Verified purchase
  helpfulCount Int     @default(0)
  deletedAt   DateTime? // Soft delete (spam için)
  deletedBy   String?   // Admin user ID who deleted
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  user        User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  product     Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@index([productId])
  @@index([userId])
  @@index([isApproved])
  @@index([rating])
  @@index([deletedAt])
  @@map("reviews")
}
```

**İlişkiler:**

- `user` → User (N:1, Cascade delete)
- `product` → Product (N:1, Cascade delete)

---

### 13. `coupons` - Kuponlar

```prisma
model Coupon {
  id              String      @id @default(cuid())
  code            String      @unique
  type            DiscountType // PERCENTAGE or FIXED
  value           Decimal     @db.Decimal(10, 2) // Discount amount or percentage
  minPurchase     Decimal?    @db.Decimal(10, 2) // Minimum order amount
  maxDiscount     Decimal?    @db.Decimal(10, 2) // Maximum discount (for percentage)
  usageLimit      Int?        // Total usage limit
  usedCount       Int         @default(0)
  validFrom       DateTime
  validUntil      DateTime
  isActive        Boolean     @default(true)
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  // Relations
  orders          Order[]

  @@index([code])
  @@index([isActive])
  @@index([validUntil])
  @@map("coupons")
}
```

**İlişkiler:**

- `orders` → Order (1:N)

---

### 14. `notifications` - Bildirimler

```prisma
model Notification {
  id        String           @id @default(cuid())
  userId    String
  type      NotificationType
  title     String
  message   String
  link      String?
  isRead    Boolean          @default(false)
  createdAt DateTime         @default(now())

  // Relations
  user      User             @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([isRead])
  @@index([createdAt])
  @@map("notifications")
}
```

**İlişkiler:**

- `user` → User (N:1, Cascade delete)

---

### 15. `returns` - İade Talepleri

```prisma
model Return {
  id            String        @id @default(cuid())
  orderId      String
  userId       String
  reasonId     String
  status       ReturnStatus   @default(PENDING)
  returnNumber String         @unique
  description  String?
  images       String[]       // Array of image URLs (damaged products)
  refundAmount Decimal?       @db.Decimal(10, 2)
  refundedAt   DateTime?
  createdAt    DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  // Relations
  order        Order         @relation(fields: [orderId], references: [id], onDelete: Restrict)
  user         User          @relation(fields: [userId], references: [id], onDelete: Restrict)
  reason       ReturnReason  @relation(fields: [reasonId], references: [id], onDelete: Restrict)
  items        ReturnItem[]

  @@index([orderId])
  @@index([userId])
  @@index([status])
  @@index([returnNumber])
  @@map("returns")
}
```

**İlişkiler:**

- `order` → Order (N:1, Restrict delete)
- `user` → User (N:1, Restrict delete)
- `reason` → ReturnReason (N:1, Restrict delete)
- `items` → ReturnItem (1:N)

---

### 16. `return_items` - İade Kalemleri

```prisma
model ReturnItem {
  id          String   @id @default(cuid())
  returnId    String
  orderItemId String
  quantity   Int
  reason     String?  // Item-specific reason
  createdAt  DateTime @default(now())

  // Relations
  return      Return   @relation(fields: [returnId], references: [id], onDelete: Cascade)
  orderItem   OrderItem @relation(fields: [orderItemId], references: [id], onDelete: Restrict)

  @@index([returnId])
  @@map("return_items")
}
```

**İlişkiler:**

- `return` → Return (N:1, Cascade delete)
- `orderItem` → OrderItem (N:1, Restrict delete)

---

### 17. `return_reasons` - İade Sebepleri

```prisma
model ReturnReason {
  id          String   @id @default(cuid())
  name        String   // TR
  nameEn      String?  // EN
  description String?
  isActive    Boolean  @default(true)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  returns     Return[]

  @@index([isActive])
  @@map("return_reasons")
}
```

**İlişkiler:**

- `returns` → Return (1:N)

---

### 18. `abandoned_carts` - Terk Edilen Sepetler

```prisma
model AbandonedCart {
  id            String    @id @default(cuid())
  userId        String?
  email         String?   // For guest users
  cartData      Json      // Serialized cart items
  lastReminderAt DateTime?
  reminderCount  Int       @default(0)
  recovered     Boolean   @default(false)
  recoveredAt    DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  user          User?     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([email])
  @@index([recovered])
  @@index([createdAt])
  @@map("abandoned_carts")
}
```

**İlişkiler:**

- `user` → User (N:1, Cascade delete, Optional)

---

### 19. `recently_viewed` - Son Görüntülenen Ürünler

```prisma
model RecentlyViewed {
  id        String   @id @default(cuid())
  userId    String
  productId String
  viewedAt  DateTime @default(now())

  // Relations
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([userId, productId])
  @@index([userId])
  @@index([productId])
  @@index([viewedAt])
  @@map("recently_viewed")
}
```

**İlişkiler:**

- `user` → User (N:1, Cascade delete)
- `product` → Product (N:1, Cascade delete)

---

### 20. `user_consents` - KVKK İzinleri

```prisma
model UserConsent {
  id                String   @id @default(cuid())
  userId            String
  consentType       ConsentType
  isAccepted        Boolean
  ipAddress         String?
  userAgent         String?
  acceptedAt        DateTime @default(now())
  revokedAt        DateTime?

  // Relations
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([consentType])
  @@map("user_consents")
}
```

**İlişkiler:**

- `user` → User (N:1, Cascade delete)

---

### 21. `audit_logs` - İşlem Kayıtları

```prisma
model AuditLog {
  id          String   @id @default(cuid())
  userId      String?  // Admin user who performed the action
  action      String   // Action type (e.g., "PRODUCT_CREATED", "ORDER_UPDATED")
  entityType  String   // Entity type (e.g., "Product", "Order")
  entityId    String   // ID of the affected entity
  changes     Json?    // Before/after changes
  ipAddress   String?
  userAgent   String?
  createdAt   DateTime @default(now())

  // Relations
  user        User?    @relation(fields: [userId], references: [id], onDelete: SetNull)

  @@index([userId])
  @@index([action])
  @@index([entityType])
  @@index([entityId])
  @@index([createdAt])
  @@map("audit_logs")
}
```

**İlişkiler:**

- `user` → User (N:1, SetNull on delete, Optional)

---

### 22. `invoices` - Faturalar

```prisma
model Invoice {
  id              String   @id @default(cuid())
  orderId         String   @unique
  invoiceNumber   String   @unique
  pdfUrl          String?  // PDF file URL
  eInvoiceId      String?  // GIB e-fatura ID
  eInvoiceStatus  String?  // "SENT", "FAILED", etc.
  sentAt          DateTime?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  order           Order    @relation(fields: [orderId], references: [id], onDelete: Restrict)

  @@index([orderId])
  @@index([invoiceNumber])
  @@map("invoices")
}
```

**İlişkiler:**

- `order` → Order (1:1, Restrict delete)

---

### 23. `sms_logs` - SMS Geçmişi

```prisma
model SmsLog {
  id          String   @id @default(cuid())
  phone       String
  message     String
  status      String   // "SENT", "FAILED", "DELIVERED"
  provider    String?  // SMS provider name
  providerId  String?   // Provider's message ID
  error       String?
  sentAt      DateTime @default(now())

  @@index([phone])
  @@index([status])
  @@index([sentAt])
  @@map("sms_logs")
}
```

**İlişkiler:**

- (Bağımsız - user relation yok, phone number ile takip)

---

### 24. `support_tickets` - Destek Talepleri

```prisma
model SupportTicket {
  id          String          @id @default(cuid())
  userId      String
  ticketNumber String         @unique
  category    String
  subject     String
  message     String
  status      TicketStatus    @default(OPEN)
  priority    TicketPriority  @default(MEDIUM)
  assignedTo  String?         // Admin user ID
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt

  // Relations
  user        User            @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([status])
  @@index([ticketNumber])
  @@map("support_tickets")
}
```

**İlişkiler:**

- `user` → User (N:1, Cascade delete)

---

### 25. `faqs` - SSS

```prisma
model Faq {
  id          String   @id @default(cuid())
  question    String   // TR
  questionEn  String?  // EN
  answer      String   // TR
  answerEn    String?  // EN
  category    String?
  order       Int      @default(0)
  isActive    Boolean  @default(true)
  viewCount   Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([category])
  @@index([isActive])
  @@map("faqs")
}
```

**İlişkiler:**

- (Bağımsız - self-referential olabilir ama şimdilik basit tutuyoruz)

---

### 26. `hero_slides` - Hero Slider

```prisma
model HeroSlide {
  id          String   @id @default(cuid())
  title       String?  // TR
  titleEn     String?  // EN
  description String?  // TR
  descriptionEn String? // EN
  image       String   // Image URL (Cloudinary)
  ctaText     String?  // CTA button text
  ctaLink     String?  // CTA button link
  order       Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([isActive])
  @@index([order])
  @@map("hero_slides")
}
```

**İlişkiler:**

- (Bağımsız)

---

### 27. `shipping_zones` - Kargo Bölgeleri

```prisma
model ShippingZone {
  id          String   @id @default(cuid())
  name        String   // TR
  nameEn      String?  // EN
  countries   String[] // Country codes array
  states      String[] // State/Province codes array (for TR: il codes)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  rates       ShippingRate[]

  @@index([isActive])
  @@map("shipping_zones")
}
```

**İlişkiler:**

- `rates` → ShippingRate (1:N)

---

### 28. `shipping_rates` - Kargo Ücretleri

```prisma
model ShippingRate {
  id            String   @id @default(cuid())
  zoneId        String
  name          String   // Shipping method name
  minWeight     Decimal? @db.Decimal(10, 2) // kg
  maxWeight     Decimal? @db.Decimal(10, 2) // kg
  minPrice      Decimal? @db.Decimal(10, 2) // Minimum order amount for free shipping
  basePrice     Decimal  @db.Decimal(10, 2) // Base shipping cost
  pricePerKg    Decimal? @db.Decimal(10, 2) // Additional cost per kg
  estimatedDays Int?     // Estimated delivery days
  isActive      Boolean  @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Relations
  zone          ShippingZone @relation(fields: [zoneId], references: [id], onDelete: Cascade)

  @@index([zoneId])
  @@index([isActive])
  @@map("shipping_rates")
}
```

**İlişkiler:**

- `zone` → ShippingZone (N:1, Cascade delete)

---

### 29. `sessions` - NextAuth Sessions

```prisma
model Session {
  id           String   @id
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("sessions")
}
```

**İlişkiler:**

- `user` → User (N:1, Cascade delete)

---

### 30. `accounts` - NextAuth Accounts (OAuth)

```prisma
model Account {
  id                String  @id
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
  @@map("accounts")
}
```

**İlişkiler:**

- `user` → User (N:1, Cascade delete)

---

### 31. `verification_tokens` - NextAuth Verification Tokens

```prisma
model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}
```

**İlişkiler:**

- (Bağımsız)

---

## 🔑 Enum Types

```prisma
enum UserRole {
  USER
  ADMIN
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
  COMPLETED
  FAILED
  REFUNDED
}

enum AddressType {
  BILLING
  SHIPPING
}

enum DiscountType {
  PERCENTAGE
  FIXED
}

enum NotificationType {
  ORDER_CONFIRMED
  ORDER_SHIPPED
  ORDER_DELIVERED
  ORDER_CANCELLED
  RETURN_APPROVED
  RETURN_REJECTED
  LOW_STOCK
  SYSTEM
}

enum ReturnStatus {
  PENDING
  APPROVED
  REJECTED
  PROCESSING
  COMPLETED
}

enum ConsentType {
  EMAIL_MARKETING
  SMS_MARKETING
  COOKIES_ANALYTICS
  COOKIES_MARKETING
}

enum TicketStatus {
  OPEN
  IN_PROGRESS
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

## 📊 Index Stratejisi

### Performance Indexes:

- Foreign key'lerde index (otomatik Prisma tarafından)
- Sık sorgulanan alanlarda index (email, slug, status, createdAt)
- Composite index'ler (userId + productId gibi unique constraint'ler için)

### Önemli Index'ler:

- `users.email` (unique)
- `products.slug` (unique)
- `products.sku` (unique)
- `orders.orderNumber` (unique)
- `orders.userId` + `orders.status` (composite query için)
- `cart_items.userId` + `cart_items.reservedUntil` (cleanup için)
- `notifications.userId` + `notifications.isRead` (user notifications için)

---

## 🔒 Cascade Delete Stratejisi

### Cascade Delete (Üst kayıt silinince alt kayıtlar da silinir):

- User → Addresses, CartItems, Favorites, Reviews, Notifications, etc.
- Product → ProductVariants, ProductImages, CartItems, Favorites
- Category → Children (recursive)
- Order → OrderItems
- Return → ReturnItems

### Restrict Delete (Üst kayıt silinemez, alt kayıtlar varsa):

- User → Orders (siparişi olan kullanıcı silinemez)
- Product → OrderItems (siparişte olan ürün silinemez)
- Address → Orders (siparişte kullanılan adres silinemez)

### SetNull Delete (Üst kayıt silinince alt kayıttaki referans null olur):

- User → AuditLogs (audit log'lar kalır ama user null olur)
- Coupon → Orders (kupon silinince order'daki couponId null olur)

---

## ⚠️ Önemli Notlar

1. **Soft Delete:** Önerilen tablolarda `deletedAt` field'ı eklendi (User, Product, Category)
2. **Timestamps:** Tüm tablolarda `createdAt` ve `updatedAt` var
3. **Multi-language:** Product, Category gibi tablolarda TR ve EN alanlar var
4. **Currency:** Fiyatlar TRY, USD, EUR için ayrı alanlar var
5. **KDV:** Tax rate ve tax amount hesaplamaları için alanlar var
6. **Stock Reservation:** CartItem'da `reservedUntil` ile stok rezervasyonu
7. **Audit Trail:** Tüm admin işlemleri AuditLog'da kaydedilecek
8. **Order History:** Order tablosunda status değişiklikleri AuditLog ile takip edilecek (ayrı tablo gerekmez)

---

## ✅ Profesyonel Kontrol Listesi

### 1. İlişki Bütünlüğü Kontrolü

- [ ] **Foreign Key Constraints:** Tüm foreign key'ler tanımlandı mı?
- [ ] **Referential Integrity:** Cascade/Restrict/SetNull stratejileri doğru mu?
- [ ] **Circular Dependencies:** Döngüsel bağımlılık var mı? (kontrol edildi: yok)
- [ ] **Orphan Records:** Alt kayıtlar üst kayıt olmadan var olabilir mi? (gerekli yerlerde Restrict var)
- [ ] **Self-Referential Relations:** Category hiyerarşisi doğru mu? (parentId ile)

### 2. Veri Bütünlüğü Kontrolü

- [ ] **Unique Constraints:** Email, SKU, Order Number gibi unique alanlar doğru mu?
- [ ] **Required Fields:** Zorunlu alanlar (NOT NULL) doğru mu?
- [ ] **Default Values:** Default değerler mantıklı mı? (isActive: true, stock: 0, vs.)
- [ ] **Data Types:** Decimal, Int, String, Boolean tipleri uygun mu?
- [ ] **String Lengths:** VARCHAR length'ler yeterli mi? (SKU, email, vs.)

### 3. Performans Optimizasyonu

- [ ] **Primary Keys:** Tüm tablolarda primary key var mı? (cuid() kullanılıyor)
- [ ] **Index Strategy:** Sık sorgulanan alanlarda index var mı?
  - [ ] Foreign key'lerde index (otomatik)
  - [ ] Email, slug, SKU gibi unique alanlarda index
  - [ ] Status, isActive gibi filter alanlarında index
  - [ ] createdAt, updatedAt gibi sort alanlarında index
- [ ] **Composite Indexes:** Multi-column query'ler için composite index var mı?
  - [ ] userId + productId (favorites, cart_items)
  - [ ] userId + status (orders)
  - [ ] productId + isActive (products)
- [ ] **Query Patterns:** En sık yapılacak query'ler için index'ler yeterli mi?

### 4. İş Mantığı Kontrolü

- [ ] **Business Rules:** İş kuralları veritabanı seviyesinde uygulanıyor mu?
  - [ ] Stock kontrolü (quantity >= 0)
  - [ ] Fiyat kontrolü (price >= 0)
  - [ ] Rating kontrolü (1-5 arası)
  - [ ] Email format kontrolü (application seviyesinde)
- [ ] **State Transitions:** Order status, Return status geçişleri mantıklı mı?
- [ ] **Calculated Fields:** Subtotal, tax, total gibi hesaplanan alanlar doğru mu?

### 5. Güvenlik Kontrolü

- [ ] **Sensitive Data:** Password, API keys gibi hassas veriler hash'leniyor mu?
- [ ] **Audit Trail:** Kritik işlemler log'lanıyor mu? (AuditLog tablosu var)
- [ ] **Soft Delete:** Hassas veriler soft delete ile mi siliniyor? (User, Product, Category)
- [ ] **Data Retention:** Log tabloları için retention policy var mı? (SMS logs, audit logs)

### 6. Çoklu Dil ve Para Birimi

- [ ] **Multi-language Fields:** TR ve EN alanlar eksiksiz mi?
  - [ ] Product: name, nameEn, description, descriptionEn ✓
  - [ ] Category: name, nameEn, description, descriptionEn ✓
  - [ ] FAQ: question, questionEn, answer, answerEn ✓
- [ ] **Currency Support:** TRY, USD, EUR için alanlar var mı?
  - [ ] Product: price, priceUsd, priceEur ✓
  - [ ] Order: currency field ✓

### 7. KDV ve Vergi Hesaplamaları

- [ ] **Tax Rate:** Ürün bazlı KDV oranı var mı? (Product.taxRate)
- [ ] **Tax Calculation:** Sipariş seviyesinde KDV hesaplaması var mı?
  - [ ] OrderItem: taxRate, tax ✓
  - [ ] Order: tax (toplam) ✓
- [ ] **Tax Display:** KDV dahil/hariç gösterim için alanlar yeterli mi?

### 8. Stok Yönetimi

- [ ] **Stock Tracking:** Stok takibi için alanlar var mı?
  - [ ] Product: stock, lowStockThreshold ✓
  - [ ] ProductVariant: stock ✓
- [ ] **Stock Reservation:** Sepet için stok rezervasyonu var mı?
  - [ ] CartItem: reservedUntil ✓
- [ ] **Stock History:** Stok hareket kayıtları için tablo var mı? (İleride eklenebilir)

### 9. Ödeme ve Fatura

- [ ] **Payment Tracking:** Ödeme durumu takibi var mı?
  - [ ] Order: paymentStatus, paymentId, paymentMethod ✓
- [ ] **Invoice Management:** Fatura yönetimi için tablo var mı?
  - [ ] Invoice tablosu ✓
  - [ ] E-fatura entegrasyonu için alanlar var mı? (eInvoiceId, eInvoiceStatus) ✓

### 10. İade ve İptal

- [ ] **Return Process:** İade süreci için tablolar var mı?
  - [ ] Return, ReturnItem, ReturnReason ✓
- [ ] **Return Tracking:** İade durumu takibi var mı? (Return.status)
- [ ] **Refund Tracking:** Para iadesi takibi var mı? (Return.refundAmount, refundedAt)

### 11. Bildirim ve İletişim

- [ ] **Notifications:** Kullanıcı bildirimleri için tablo var mı? (Notification)
- [ ] **Email Logs:** Email gönderim kayıtları var mı? (İleride eklenebilir - şimdilik Resend log'ları kullanılabilir)
- [ ] **SMS Logs:** SMS gönderim kayıtları var mı? (SmsLog)

### 12. KVKK ve Yasal Uyumluluk

- [ ] **User Consents:** KVKK izinleri için tablo var mı? (UserConsent)
- [ ] **Consent Types:** İzin tipleri eksiksiz mi? (Email, SMS, Cookies)
- [ ] **Data Deletion:** Kullanıcı veri silme talebi için alan var mı? (UserConsent ile takip edilebilir)

### 13. Admin ve Audit

- [ ] **Audit Logs:** Admin işlem kayıtları için tablo var mı? (AuditLog)
- [ ] **User Roles:** Rol yönetimi var mı? (User.role enum)
- [ ] **2FA Support:** İki faktörlü kimlik doğrulama için alanlar var mı?
  - [ ] User: twoFactorEnabled, twoFactorSecret, backupCodes ✓

### 14. SEO ve İçerik

- [ ] **SEO Fields:** Meta title, description alanları var mı?
  - [ ] Product: metaTitle, metaDescription ✓
  - [ ] Category: metaTitle, metaDescription ✓
- [ ] **Slug Fields:** URL-friendly slug'lar var mı?
  - [ ] Product: slug (unique) ✓
  - [ ] Category: slug (unique) ✓

### 15. Ölçeklenebilirlik

- [ ] **Pagination Support:** createdAt, updatedAt index'leri var mı? (sayfalama için)
- [ ] **Archive Strategy:** Eski veriler için archive stratejisi var mı? (Soft delete ile)
- [ ] **Partitioning:** Büyük tablolar için partition stratejisi gerekli mi? (İleride)

### 16. Migration ve Versiyonlama

- [ ] **Migration Strategy:** Prisma migration stratejisi hazır mı?
- [ ] **Data Migration:** Mevcut veri migration planı var mı?
- [ ] **Backward Compatibility:** Schema değişiklikleri geriye dönük uyumlu mu?

---

## 📋 Soft Delete Önerisi

### ✅ Önerilen: Soft Delete Ekle

**Neden?**

- Veri kaybını önler
- Yasal gereksinimler (KVKK - veri saklama süreleri)
- İş sürekliliği (yanlışlıkla silinen verileri geri getirme)
- Audit trail (silinen verilerin geçmişi)

**Hangi Tablolarda?**

- ✅ `users` - Kullanıcı verileri önemli
- ✅ `products` - Ürün geçmişi önemli
- ✅ `categories` - Kategori hiyerarşisi korunmalı
- ❌ `orders` - Siparişler asla silinmemeli (Restrict)
- ❌ `order_items` - Sipariş kalemleri asla silinmemeli
- ✅ `addresses` - Adres geçmişi önemli (siparişlerde kullanılmış olsa bile)
- ❌ `cart_items` - Sepet öğeleri silinebilir (hard delete OK)
- ✅ `reviews` - Yorumlar soft delete ile (spam için)

**Implementation:**

```prisma
model User {
  // ... existing fields
  deletedAt DateTime? // Soft delete
  deletedBy String?   // Who deleted (admin user ID)

  @@index([deletedAt])
}

model Product {
  // ... existing fields
  deletedAt DateTime?
  deletedBy String?

  @@index([deletedAt])
}
```

**Query Strategy:**

- Default query'lerde `WHERE deletedAt IS NULL` filtresi
- Admin panelinde silinen kayıtları görüntüleme seçeneği
- Permanent delete için ayrı endpoint (sadece admin)

---

## 📋 Order History Önerisi

### ✅ Önerilen: Mevcut Yapı Yeterli (Order + AuditLog)

**Neden Ayrı Tablo Gerekmez?**

- `Order.status` field'ı mevcut durumu tutuyor
- `Order.updatedAt` field'ı son güncelleme zamanını tutuyor
- `AuditLog` tablosu tüm status değişikliklerini kaydediyor
- Order timeline için AuditLog'dan çekilebilir

**Order History İçin Yeterli Veriler:**

- ✅ Order tablosunda: status, createdAt, updatedAt
- ✅ AuditLog tablosunda: Tüm status değişiklikleri (action: "ORDER_STATUS_CHANGED")
- ✅ OrderItem tablosunda: Sipariş kalemleri (değişmez)

**Eğer Daha Detaylı İstersek:**
Opsiyonel olarak `order_status_history` tablosu eklenebilir:

```prisma
model OrderStatusHistory {
  id          String   @id @default(cuid())
  orderId    String
  fromStatus OrderStatus?
  toStatus   OrderStatus
  changedBy  String?  // Admin user ID
  note       String?
  createdAt  DateTime @default(now())

  order      Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)

  @@index([orderId])
  @@index([createdAt])
  @@map("order_status_history")
}
```

**Önerim:** Şimdilik mevcut yapı yeterli. İleride ihtiyaç olursa `OrderStatusHistory` tablosu eklenebilir.

---

## 🔍 Ek Kontroller

### 17. Veri Tutarlılığı

- [ ] **Calculated Fields Sync:** Subtotal, tax, total alanları tutarlı mı?
  - OrderItem: subtotal = quantity \* price
  - OrderItem: tax = subtotal \* (taxRate / 100)
  - OrderItem: total = subtotal + tax
  - Order: tax = SUM(OrderItem.tax)
  - Order: total = subtotal + tax + shippingCost - discount
- [ ] **Stock Consistency:** Stok tutarlılığı kontrol edilecek mi?
  - Product.stock = SUM(ProductVariant.stock) olmalı mı? (Hayır, variant'lar ayrı stok tutabilir)

### 18. Senaryo Testleri

- [ ] **Edge Cases:** Edge case'ler düşünüldü mü?
  - [ ] Kullanıcı silinince aktif siparişleri var mı? (Restrict ile engellendi)
  - [ ] Ürün silinince aktif siparişlerde var mı? (Restrict ile engellendi)
  - [ ] Kategori silinince alt kategoriler ne olacak? (Cascade veya SetNull)
  - [ ] Kupon silinince kullanılmış siparişlerde ne olacak? (SetNull - couponId null olur)

### 19. Performans Senaryoları

- [ ] **Büyük Veri Setleri:** 100K+ ürün, 1M+ sipariş için performans?
  - [ ] Index'ler yeterli mi?
  - [ ] Query optimization gerekli mi?
  - [ ] Pagination tüm listelerde var mı?

### 20. Backup ve Recovery

- [ ] **Critical Tables:** Kritik tablolar belirlendi mi?
  - Orders, OrderItems (asla kaybolmamalı)
  - Users (KVKK gereksinimleri)
  - Products (iş sürekliliği)
- [ ] **Backup Strategy:** Backup stratejisi hazır mı? (Supabase otomatik backup)

---

## 🎯 Sonuç ve Onay

### Soft Delete: ✅ EKLENMELİ

- User, Product, Category, Address, Review tablolarına `deletedAt` ve `deletedBy` eklenecek

### Order History: ✅ MEVCUT YAPI YETERLİ

- Order + AuditLog kombinasyonu yeterli
- İleride ihtiyaç olursa OrderStatusHistory tablosu eklenebilir

### Kontrol Listesi: ✅ GÜNCELLENDİ

- 20 kategoride detaylı kontrol listesi eklendi
- Her kategori için spesifik kontroller tanımlandı

---

**Bu şema Prisma schema dosyasına dönüştürülecek ve Faz 2'de implement edilecek.**
