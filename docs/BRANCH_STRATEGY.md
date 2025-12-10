# 🌿 Branch Stratejisi - LIGNOVIA E-Ticaret

## 📋 Genel Bakış

Bu doküman, projenin Git branch yönetimi stratejisini açıklar.

---

## 🎯 Önerilen Strateji: Basit ve Etkili

### Branch Yapısı

```
main (veya master)
  ├── develop (opsiyonel - büyük projeler için)
  │   ├── feature/authentication
  │   ├── feature/product-management
  │   └── feature/admin-panel
  └── hotfix/critical-bug
```

---

## 🌳 Branch Türleri

### 1. **main** (veya **master**)

- **Amaç:** Production-ready kod
- **Kullanım:** Sadece test edilmiş, çalışan kod
- **Koruma:** Merge protection (opsiyonel)
- **Not:** Başlangıç için burada çalışabiliriz

### 2. **develop** (Opsiyonel)

- **Amaç:** Development branch
- **Kullanım:** Tüm feature'lar buraya merge edilir
- **Not:** Küçük projeler için gerekli değil, main'de çalışabiliriz

### 3. **feature/xxx**

- **Amaç:** Yeni özellik geliştirme
- **Örnekler:**
  - `feature/authentication`
  - `feature/product-management`
  - `feature/admin-dashboard`
  - `feature/checkout-flow`
- **Kullanım:** Büyük özellikler için
- **Merge:** Feature tamamlandığında main'e merge edilir

### 4. **hotfix/xxx**

- **Amaç:** Production'da kritik bug düzeltmeleri
- **Örnekler:**
  - `hotfix/payment-error`
  - `hotfix/security-vulnerability`
- **Kullanım:** Acil düzeltmeler için
- **Merge:** Düzeltme yapıldıktan sonra main'e merge edilir

---

## 🚀 Başlangıç Stratejisi

### Önerilen: Main Branch'te Başla

**Neden?**

- Tek geliştirici (veya küçük ekip)
- Hızlı iterasyon
- Basit yönetim
- Her adım test ediliyor ve commit ediliyor

**Ne Zaman Feature Branch Kullanmalı?**

- Büyük özellikler geliştirirken (örn: Authentication sistemi)
- Deneysel özellikler test ederken
- Bir özellik üzerinde uzun süre çalışırken

---

## 📝 Commit Mesajları

### Conventional Commits Formatı

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type'lar:

- `feat`: Yeni özellik
- `fix`: Bug düzeltmesi
- `docs`: Dokümantasyon
- `style`: Formatting, missing semi colons, etc.
- `refactor`: Code refactoring
- `test`: Test ekleme/düzenleme
- `chore`: Build process, auxiliary tools

### Örnekler:

```
feat: add Tailwind CSS configuration
fix: resolve TypeScript errors in layout
chore: update dependencies
docs: update README with setup instructions
refactor: improve authentication middleware
test: add unit tests for utility functions
```

---

## 🔄 Workflow Örnekleri

### Senaryo 1: Küçük Adım (Main'de)

```bash
# 1. Değişiklik yap
# 2. Test et
# 3. Commit
git add .
git commit -m "feat: add Tailwind CSS configuration"
# 4. Push
git push origin main
```

### Senaryo 2: Büyük Özellik (Feature Branch)

```bash
# 1. Feature branch oluştur
git checkout -b feature/authentication

# 2. Değişiklikler yap
# 3. Test et
# 4. Commit'ler yap
git commit -m "feat: add NextAuth.js setup"
git commit -m "feat: add login page"
git commit -m "feat: add register page"

# 5. Main'e merge et
git checkout main
git merge feature/authentication

# 6. Feature branch'i sil (opsiyonel)
git branch -d feature/authentication
```

---

## ✅ Best Practices

1. **Küçük, sık commit'ler yap**
   - Her adım sonrası commit
   - Anlamlı commit mesajları

2. **Test etmeden commit yapma**
   - Her commit çalışan kod olmalı
   - Test edilmiş kod commit et

3. **Main branch'i temiz tut**
   - Sadece çalışan kod
   - Broken code commit etme

4. **Feature branch'leri kısa tut**
   - Uzun süre açık kalan branch'ler merge conflict yaratır
   - Feature tamamlandığında hemen merge et

5. **Pull before Push**
   - Her push öncesi pull yap
   - Conflict'leri önle

---

## 🎯 Proje İçin Öneri

**Başlangıç:** `main` branch'inde çalış

- Her adım test ediliyor
- Her adım commit ediliyor
- Basit ve hızlı

**İleride:** Büyük özellikler için feature branch kullan

- Authentication sistemi → `feature/authentication`
- Admin paneli → `feature/admin-panel`
- Checkout flow → `feature/checkout`

---

## 📚 Kaynaklar

- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

---

**Not:** Bu strateji proje ilerledikçe güncellenebilir. Esnek olalım! 🚀
