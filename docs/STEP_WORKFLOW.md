# 🔄 Adım İş Akışı - LIGNOVIA E-Ticaret

Bu doküman, her adımın nasıl ilerleyeceğini detaylı olarak açıklar.

---

## 📋 Genel İş Akışı

### Her Adım İçin Standart Süreç:

```
1. Adıma Başlamadan Önce
   ↓
2. .md Dosyalarını Gözden Geçirme
   ↓
3. Akışa Uygun Olmayan Durumları İletme
   ↓
4. Senin Onayın
   ↓
5. Adımı Tamamlama (Ben)
   ↓
6. Sorular Sorma (Gerekirse)
   ↓
7. Adım Bitti - Yapman Gerekenler Listesi
   ↓
8. Test Senaryoları
   ↓
9. Sen Testleri Yap
   ↓
10. "Tamam" Dediğinde → Sonraki Adıma Geçiş
```

---

## 🎯 Her Adım İçin Detaylı Süreç

### 1️⃣ Adıma Başlamadan Önce

**Ben yapacağım:**

- [ ] Önceki adımın tamamlandığını kontrol et
- [ ] İlgili .md dosyalarını oku (TODO_LIST.md, ROADMAP.md, SCOPE_DOCUMENT.md, TECHNOLOGY_STACK.md)
- [ ] Akışa uygun olmayan durumları tespit et
- [ ] **Senin yapman gerekenleri listele**
- [ ] **Sorman gereken soruları hazırla**

**Sen yapacaksın:**

- [ ] Listelenen hazırlıkları yap
- [ ] Soruları cevapla
- [ ] Onay ver

---

### 2️⃣ .md Dosyalarını Gözden Geçirme

**Kontrol edilecek dosyalar:**

- `TODO_LIST.md` - Adım detayları
- `ROADMAP.md` - Genel plan
- `SCOPE_DOCUMENT.md` - Kapsam
- `TECHNOLOGY_STACK.md` - Teknoloji seçimleri
- `DATABASE_SCHEMA.md` - Veritabanı şeması (Faz 2'de)
- `BRANCH_STRATEGY.md` - Git stratejisi

**Kontrol edilecek durumlar:**

- [ ] Adım sırası doğru mu?
- [ ] Önceki adımlara bağımlılık var mı?
- [ ] Teknoloji seçimleri tutarlı mı?
- [ ] Kapsam dokümanıyla uyumlu mu?
- [ ] Roadmap'teki sırayla uyumlu mu?

---

### 3️⃣ Akışa Uygun Olmayan Durumları İletme

**İletilecek durumlar:**

- Çakışan adımlar
- Eksik bağımlılıklar
- Teknoloji uyumsuzlukları
- Kapsam dışına çıkan durumlar
- Öneriler ve alternatifler

---

### 4️⃣ Onay

**Sen onayladıktan sonra:**

- Adımı tamamlamaya başlayacağım
- Kod yazacağım
- Konfigürasyon yapacağım
- Gerekli dosyaları oluşturacağım

---

### 5️⃣ Adımı Tamamlama

**Ben yapacağım:**

- Kod yazma
- Konfigürasyon
- Dosya oluşturma
- Gerekli kurulumlar

**Sen yapmayacaksın:**

- Kod yazma (sadece test edeceksin)

---

### 6️⃣ Sorular Sorma

**Gerekirse soracağım:**

- Belirsiz durumlar
- Tercih gerektiren konular
- Alternatif yaklaşımlar
- Onay gerektiren değişiklikler

---

### 7️⃣ Adım Bitti - Yapman Gerekenler

**Senin yapman gerekenler:**

- Test etme
- Lighthouse testi
- Güvenlik kontrolü
- Code review
- Onay verme

**Detaylı liste her adım için ayrı ayrı verilecek.**

---

### 8️⃣ Test Senaryoları

**Her adım için:**

- Görsel test senaryoları
- Fonksiyonel test senaryoları
- Performans test senaryoları
- Güvenlik test senaryoları
- Cross-browser test senaryoları

**Sen bu senaryoları test edeceksin.**

---

### 9️⃣ Test Sonucu

**"Tamam" dediğinde:**

- Adım başarıyla tamamlandı
- Sonraki adıma geçişe hazırız
- Commit yapılabilir

**Sorun varsa:**

- Sorunları belirt
- Düzeltmeleri yapacağım
- Tekrar test edeceksin

---

## 📝 Notlar

- Her adım sonrası commit yapılacak
- Her adım sonrası dokümantasyon güncellenecek
- Her adım sonrası test yapılacak
- Her adım sonrası onay alınacak

---

## 📊 ADIM GÜNCELLEME MATRİSİ

Her adımda hangi .md dosyaları güncellenir:

| Adım Türü | PROGRESS | ROADMAP | TODO_LIST | DB_SCHEMA | TECH_STACK |
|-----------|:--------:|:-------:|:---------:|:---------:|:----------:|
| Kurulum adımları | ✅ | ✅ | ✅ | - | ✅ |
| Veritabanı değişiklikleri | ✅ | - | ✅ | ✅ | - |
| Yeni özellik | ✅ | ✅ | ✅ | - | - |
| Bug fix | ✅ | - | - | - | - |
| Konfigürasyon | ✅ | - | ✅ | - | ✅ |
| Entegrasyon | ✅ | ✅ | ✅ | - | ✅ |

### Güncelleme Kuralları:

1. **PROGRESS.md** - Her adım tamamlandığında güncelle
2. **ROADMAP.md** - Faz değişikliklerinde güncelle
3. **TODO_LIST.md** - Her adım öncesi ve sonrası güncelle
4. **DATABASE_SCHEMA.md** - Veritabanı değişikliklerinde güncelle
5. **TECHNOLOGY_STACK.md** - Yeni teknoloji/kütüphane eklendiğinde güncelle

---

## ✅ DEFINITION OF DONE (DoD) KRİTERLERİ

Bir adımın "tamamlandı" sayılabilmesi için:

### 🔧 Kod Kriterleri
- [ ] Kod yazıldı ve çalışıyor
- [ ] Lint hataları yok (`npm run lint`)
- [ ] Type hataları yok (`npm run type-check`)
- [ ] Build başarılı (`npm run build`)

### 📝 Dokümantasyon Kriterleri
- [ ] İlgili .md dosyaları güncellendi
- [ ] Kod yorumları eklendi (gerekirse)
- [ ] README güncel

### 🧪 Test Kriterleri
- [ ] Manuel test yapıldı
- [ ] Edge case'ler kontrol edildi
- [ ] Cross-browser test (gerekirse)
- [ ] Mobile test (gerekirse)

### 🔒 Güvenlik Kriterleri
- [ ] Hassas veri .env'de
- [ ] Input validation var
- [ ] XSS koruması var
- [ ] SQL injection koruması var (Prisma)

### 🚀 Performans Kriterleri
- [ ] Gereksiz re-render yok
- [ ] Image optimization var
- [ ] Bundle size kontrol edildi

### 📦 Git Kriterleri
- [ ] Anlamlı commit mesajı
- [ ] Branch isimlendirmesi doğru
- [ ] Push yapıldı

---

## 🚦 ADIM DURUMU GÖSTERGELERİ

| Emoji | Durum | Açıklama |
|-------|-------|----------|
| ⏳ | Bekliyor | Henüz başlanmadı |
| 🟡 | Devam Ediyor | Üzerinde çalışılıyor |
| 🟠 | Review Bekliyor | Kod tamamlandı, test bekleniyor |
| ✅ | Tamamlandı | DoD kriterleri karşılandı |
| ❌ | Bloklandı | Bir engel var |
| 🔄 | Revizyon | Düzeltme gerekiyor |

---

**Bu süreç tüm adımlar için geçerli olacak! 🚀**
