# Rareté — Backend Setup

## قاعدة البيانات والإشعارات

### 1. تثبيت المتطلبات

```bash
npm install
```

### 2. إعداد Gmail للإشعارات

1. افتح [Google Account Security](https://myaccount.google.com/security)
2. فعّل **2-Step Verification** إن لم يكن مفعلاً
3. أنشئ **App Password**: [App Passwords](https://myaccount.google.com/apppasswords)
4. اختر Gmail وافتح بريدك، انسخ كلمة المرور (16 حرف)
5. ضعها في ملف `.env`:

```
GMAIL_USER=youssef1221.wolf@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
PORT=3000
```

### 3. تشغيل السيرفر

```bash
npm start
```

ثم افتح: **http://localhost:3000**

### 4. قاعدة البيانات

- **SQLite** — ملف: `rarete.db`
- **الجدول customers**: معلومات العميل (اسم، تليفون، عنوان، بريد)
- **الجدول orders**: الطلبات مع إجمالي وتاريخ
- **الجدول order_items**: بنود الطلب (منتج، كمية، سعر، إجمالي)

### 5. تصدير Excel

تحميل ملف Excel محدث بكل الطلبات:

```
http://localhost:3000/api/export/excel
```

**الشيتات:**
1. **Orders** — الطلبات مع العميل والرقم والعنوان ورقم الاحتياطي وقائمة المنتجات
2. **Order Items** — بنود كل طلب (منتج، كمية، سعر)
3. **Sales by Perfume** — عدد مبيعات كل عطر

**تحديث تلقائي:** في كل مرة تفتح الرابط يُنشأ ملف جديد بأحدث البيانات. يمكنك حفظ الرابط كـ Bookmark وتحميل ملف محدث عند الحاجة.

### 6. APIs

| Method | URL | الوصف |
|--------|-----|-------|
| POST | /api/orders | إرسال طلب جديد |
| GET | /api/orders | قائمة الطلبات |
| GET | /api/orders/:id | تفاصيل طلب |
| GET | /api/export/excel | تحميل Excel |

### 7. الإشعارات

عند كل طلب جديد، يُرسل إيميل إلى: **youssef1221.wolf@gmail.com** يحتوي على:
- رقم الطلب
- بيانات العميل (اسم، تليفون، عنوان)
- المنتجات والكميات
- الإجمالي
