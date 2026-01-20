# 🚀 Setup Guide - Signalton Payload CMS

Bu kılavuz, projeyi lokalinize kurmanız için adım adım talimatlar içerir.

---

## ⚠️ Önemli Not: Next.js 16 Uyumluluğu

Payload CMS şu anda resmi olarak **Next.js 15.x** destekliyor, ancak **Next.js 16** ile de çalışıyor.

**Neden --legacy-peer-deps?**
- Payload'ın peer dependency'leri Next.js 15.4.10 gerektiriyor
- Next.js 16.1.1 kullanıyoruz (en yeni özellikler için)
- `.npmrc` dosyası bu uyarıyı otomatik olarak hallediyor
- Production'da sorunsuz çalışıyor, sadece npm uyarısı

---

## 📋 Kurulum Adımları

### 1. Repoyu Klonlayın

```bash
git clone https://github.com/bektaso/signal.git
cd signal
```

### 2. Dependencies Yükleyin

```bash
npm install
```

> `.npmrc` dosyası sayesinde `--legacy-peer-deps` otomatik aktif olur.

**Beklenen Çıktı:**
```
npm warn using --legacy-peer-deps
added 1666 packages in 45s
```

Bu uyarı normaldir! Endişelenmeyin. ✅

### 3. Environment Variables Ayarlayın

`.env` dosyası oluşturun:

```bash
cp .env.example .env
```

Ardından `.env` dosyasını düzenleyin:

```env
# Payload CMS
DATABASE_URI=./signal.db
PAYLOAD_SECRET=dL6/OC6Cz/JEw7OVfwA52r0ElzvJV+PR/JYDkQ7x2uc=  # Değiştirin!

# Server URL
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# OpenAI API (opsiyonel - chatbot için)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Sanity (sadece migration için gerekli, yoksa silin)
NEXT_PUBLIC_SANITY_PROJECT_ID=3i2rg51e
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

**Yeni Secret Oluşturma:**
```bash
openssl rand -base64 32
```

Bu komutu çalıştırın ve çıktıyı `PAYLOAD_SECRET` değerine yapıştırın.

### 4. Development Server'ı Başlatın

```bash
npm run dev
```

**Server adresleri:**
- 🌐 Website: http://localhost:3000
- 🔧 Admin Panel: http://localhost:3000/admin
- 🔌 API: http://localhost:3000/api

### 5. İlk Admin Kullanıcısını Oluşturun

**Yöntem 1:** Tarayıcıdan

1. http://localhost:3000/admin adresine gidin
2. "Create First User" formunu doldurun
3. Admin olarak giriş yapın

**Yöntem 2:** Script ile

```bash
npm run payload:init
```

Bu komut otomatik olarak şu kullanıcıyı oluşturur:
- **Email:** `admin@signalton.com`
- **Password:** `admin123456`
- ⚠️ **İlk girişte mutlaka değiştirin!**

### 6. (Opsiyonel) Sanity Verilerini Migrate Edin

Eğer Sanity'de mevcut veriniz varsa:

```bash
npm run payload:migrate
```

Bu script:
- ✅ Tüm ürünleri Sanity'den çeker
- ✅ Payload CMS'e aktarır
- ✅ İlişkileri map eder

---

## 🧪 Test Etme

### Build Kontrolü

```bash
npm run build
```

### Production Server

```bash
npm run build
npm run start
```

---

## 🔧 Sorun Giderme

### Hata: "Module not found: Can't resolve '@payload-config'"

**Çözüm:**
```bash
# TypeScript cache'i temizleyin
rm -rf .next
npm run dev
```

### Hata: "Database is locked"

**Çözüm:**
```bash
# SQLite dosyasını silin ve yeniden oluşturun
rm signal.db
npm run payload:init
```

### Hata: "Failed to fetch fonts from Google"

**Normal:** Bu sadece build sırasında görünen bir uyarıdır. Production'da sorun olmaz.

---

## 📦 Production Deployment

### Vercel

1. GitHub'a push edin
2. Vercel'e import edin
3. Environment variables ekleyin:
   - `DATABASE_URI=mongodb://...` (MongoDB Atlas kullanın)
   - `PAYLOAD_SECRET=your-production-secret`
   - `NEXT_PUBLIC_SERVER_URL=https://your-domain.com`
   - `OPENAI_API_KEY=sk-...`

4. Deploy!

### Self-Hosted

```bash
# 1. Build
npm run build

# 2. Production server başlat
npm run start

# 3. PM2 ile daemonize (önerilen)
npm install -g pm2
pm2 start npm --name "signalton" -- start
pm2 save
pm2 startup
```

---

## 🎯 Önerilen Next Steps

1. ✅ Admin panelde ilk Page oluşturun
2. ✅ Bir kaç Product ekleyin
3. ✅ Media Library'ye görseller yükleyin
4. ✅ Ana sayfayı düzenleyin (blocks ekleyin)
5. ✅ Production secret'ı değiştirin

---

## 📚 Daha Fazla Bilgi

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Project README](./README.md)

---

**İyi çalışmalar! 🚀**
