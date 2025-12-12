# Product API Test Results

## ✅ Test Edilen Endpoint'ler

### 1. GET /api/products (Liste)

- **Status:** ✅ Çalışıyor
- **Test:** `http://localhost:3000/api/products`
- **Sonuç:** Başarılı, boş liste döndü (henüz ürün yok)
- **Response:**

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 0,
    "totalPages": 0,
    "hasNext": false,
    "hasPrev": false
  }
}
```

### 2. GET /api/products (Filtreleme)

- **Status:** ✅ Çalışıyor
- **Test:** `http://localhost:3000/api/products?page=1&limit=5&featured=true`
- **Sonuç:** Filtreleme parametreleri doğru çalışıyor

## 📝 Test Senaryoları

### Test Kategorisi Oluşturuldu

- **ID:** `cmj1os0xc000010zivy6v8wwe`
- **Name:** Test Kategori
- **Slug:** test-kategori

### Admin Kullanıcısı Oluşturuldu

- **Email:** `admin@lignovia.com`
- **Password:** `admin123456`
- **Role:** ADMIN
- **ID:** `cmj1osuip0000131x5pxdi64s`

## 🔧 Manuel Test Komutları

### 1. Ürün Listesi (GET)

```bash
# Basit liste
curl http://localhost:3000/api/products

# Filtreleme ile
curl "http://localhost:3000/api/products?page=1&limit=5&categoryId=CATEGORY_ID&featured=true&search=test"
```

### 2. Ürün Oluşturma (POST - Admin Gerekli)

```bash
# Önce admin olarak giriş yapın ve cookie'yi alın
# Sonra:
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Cookie: YOUR_SESSION_COOKIE" \
  -d '{
    "name": "Test Ürün",
    "description": "Test açıklama",
    "price": 299.99,
    "categoryId": "cmj1os0xc000010zivy6v8wwe",
    "stock": 10,
    "sku": "TEST-001"
  }'
```

### 3. Ürün Detayı (GET)

```bash
curl http://localhost:3000/api/products/PRODUCT_ID
# veya slug ile:
curl http://localhost:3000/api/products/product-slug
```

### 4. Ürün Güncelleme (PATCH - Admin Gerekli)

```bash
curl -X PATCH http://localhost:3000/api/products/PRODUCT_ID \
  -H "Content-Type: application/json" \
  -H "Cookie: YOUR_SESSION_COOKIE" \
  -d '{
    "name": "Güncellenmiş Ürün Adı",
    "price": 349.99
  }'
```

### 5. Ürün Silme (DELETE - Admin Gerekli)

```bash
curl -X DELETE http://localhost:3000/api/products/PRODUCT_ID \
  -H "Cookie: YOUR_SESSION_COOKIE"
```

## 🧪 Browser ile Test

1. **GET Endpoint'leri:** Direkt browser'da açabilirsiniz
   - `http://localhost:3000/api/products`
   - `http://localhost:3000/api/products?page=1&limit=5&featured=true`

2. **POST/PATCH/DELETE Endpoint'leri:**
   - Browser DevTools > Network tab kullanın
   - Veya Postman/Insomnia gibi araçlar kullanın
   - Admin olarak giriş yapıp cookie'yi kopyalayın

## 📋 Test Checklist

- [x] GET /api/products - Liste endpoint'i çalışıyor
- [x] GET /api/products - Filtreleme parametreleri çalışıyor
- [ ] POST /api/products - Ürün oluşturma (Admin cookie gerekli)
- [ ] GET /api/products/[id] - Ürün detayı
- [ ] PATCH /api/products/[id] - Ürün güncelleme (Admin cookie gerekli)
- [ ] DELETE /api/products/[id] - Ürün silme (Admin cookie gerekli)
- [ ] Yetkilendirme testleri (401/403 hataları)

## 🔐 Admin Cookie Alma

1. `http://localhost:3000/auth/login` adresine gidin
2. `admin@lignovia.com` / `admin123456` ile giriş yapın
3. Browser DevTools > Application > Cookies
4. `authjs.session-token` veya `next-auth.session-token` cookie'sini kopyalayın
5. API isteklerinde `Cookie: authjs.session-token=YOUR_TOKEN` header'ını ekleyin
