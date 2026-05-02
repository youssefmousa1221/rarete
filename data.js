/* ============================================================
   data.js — بيانات Rareté
   ============================================================
   📌 كل التعديلات اليدوية بتاعتك هنا في الأقسام دي:

   1. SOCIAL LINKS    — لينكات السوشيال ميديا
   2. BESTSELLERS     — IDs أكتر عطور مبيعاً (بتتحط في الـ Slider)
   3. PERFUMES        — قائمة العطور الكاملة
   4. CATEGORIES      — تعريف الكاتيجوريز

   🔴 مهم: أي ID في BESTSELLERS لازم يتطابق بالظبط مع id في PERFUMES
   ============================================================ */


/* ============================================================
   1. SOCIAL LINKS
   ⬇  غيّر اللينكات دي بتاعتك
   ============================================================ */
const INSTAGRAM_URL = 'https://www.instagram.com/rarete.eg?igsh=MWZtZzd3enBydWYyaw==';
const TIKTOK_URL    = 'https://www.tiktok.com/@rarete.eg';


/* ============================================================
   2. BESTSELLERS
   ⬇  ضع IDs العطور اللي هتتعرض في قسم "Best Sellers"
   ============================================================ */
const BESTSELLERS = ['osiris', 'trojan', 'Babel'];


/* ============================================================
   3. CATEGORIES
   ============================================================ */
const CATEGORIES = {
  all    : { title: 'All',     titleEn: 'All'     },
  summer : { title: 'Summer',  titleEn: 'Summer'  },
  winter : { title: 'Winter',  titleEn: 'Winter'  },
  offers : { title: 'Offers',  titleEn: 'Offers'  },
  forher : { title: 'For Her', titleEn: 'For Her' }
};


/* ============================================================
   4. PERFUMES
   ------------------------------------------------------------
   كل عطر عنده الحقول دي:
     id           — معرّف فريد (بالإنجليزي، بدون مسافات)
     nameEn       — الاسم إنجليزي
     outOfStock   — true = نفدت | false = متاح
     gender       — 'male' | 'female' | 'unisex'
     story        — القصة إنجليزي
     storyAr      — القصة عربي
     inspiredBy   — العطر الأصلي
     categories   — مصفوفة من مفاتيح CATEGORIES
     price        — السعر الحالي بالجنيه
     originalPrice — السعر قبل الخصم (احذفه لو مفيش خصم)
     image        — مسار الصورة من مجلد photos/
     notes        — { top: [], heart: [], base: [] }
   ============================================================ */
const PERFUMES = [
  {
    id: 'zeus',
    nameEn: 'Zeus',
    outOfStock: true,
    gender: 'male',
    story: 'The scent of Greek power and wisdom. Zeus, lord of Olympus, gives you an unforgettable presence.',
    storyAr: 'رائحة القوة والحكمة اليونانية. زيوس، سيد الأولمب، يمنحك حضوراً لا يُنسى.',
    inspiredBy: 'Ombre Nomade',
    categories: ['winter'],
    price: 330,
    originalPrice: 395,
    image: 'photos/zeus-perfume-8yeabxz2j.png',
    notes: {
      top  : ['Raspberry', 'Incense', 'Saffron', 'Geranium'],
      heart: ['Oud', 'Benzoin', 'Rose'],
      base : ['Incense', 'Amberwood', 'Leather']
    }
  },
  {
    id: 'osiris',
    nameEn: 'Osiris',
    outOfStock: false,
    gender: 'male',
    story: 'In ancient Egyptian mythology, Osiris was the god of the afterlife, a figure of wisdom, justice, and transformation — a force that ruled beyond death and guided souls toward new beginnings.',
    storyAr: 'في الأسطورة المصرية القديمة، كان أوزيريس إله العالم الآخر، تجسيداً للحكمة والعدالة والتحول — قوة تحكم ما بعد الموت وترشد الأرواح نحو بداية جديدة.',
    inspiredBy: 'Stronger With You Intensely',
    categories: ['winter'],
    price: 260,
    originalPrice: 310,
    image: 'photos/download (6).png',
    notes: {
      top  : ['Pink Pepper', 'Juniper', 'Violet'],
      heart: ['Toffee', 'Cinnamon', 'Lavender', 'Sage'],
      base : ['Vanilla', 'Amber', 'Tonka Bean', 'Suede']
    }
  },
  {
    id: 'trojan',
    nameEn: 'Trojan',
    outOfStock: false,
    gender: 'male',
    story: 'In ancient Greek mythology, the Trojan Horse was the wooden structure used by the Greeks to enter the city of Troy after years of war — a masterstroke of intelligence that changed history forever.',
    storyAr: 'في الأسطورة اليونانية القديمة، كان الحصان الخشبي الذي استخدمه اليونانيون للدخول إلى مدينة طروادة بعد سنوات من الحرب — خطة ذكية غيرت التاريخ إلى الأبد.',
    inspiredBy: 'ALTHAÏR',
    categories: ['winter'],
    price: 280,
    originalPrice: 335,
    image: 'photos/trojan-forge-ottmsbkk6.png',
    notes: {
      top  : ['Cinnamon', 'Orange Blossom', 'Cardamom', 'Bergamot'],
      heart: ['Bourbon Vanilla', 'Elemi'],
      base : ['Praline', 'Musk', 'Ambroxan', 'Guaiac Wood', 'Tonka', 'Candied Almond']
    }
  },
  {
    id: 'haydara',
    nameEn: 'Haydara',
    outOfStock: true,
    gender: 'male',
    story: 'During the historic Battle of Khaybar, when the fortresses stood unbroken and fear filled the battlefield, Ali carried the banner with unmatched bravery. With unwavering resolve, he faced the formidable warrior Marhab, turning the tide of battle and sealing a moment that echoes through history as a testament to valor and faith.',
    storyAr: 'خلال معركة خيبر التاريخية، عندما كانت الحصون منيعة والخوف يملأ ساحة المعركة، حمل علي الراية بشجاعة لا نظير لها. بعزم راسخ، واجه المقاتل المخيف "مرحب"، وحوّل مسار المعركة ليختم لحظة ستتردد أصداؤها في التاريخ شهادةً على الشجاعة والإيمان.',
    inspiredBy: 'Oud for Greatness',
    categories: ['winter'],
    price: 300,
    originalPrice: 360,
    image: 'photos/1.png',
    notes: {
      top  : ['Saffron', 'Nutmeg', 'Lavender'],
      heart: ['Agarwood (Oud)'],
      base : ['Patchouli', 'Musk']
    }
  },
  {
    id: 'Ramadan Bundle',
    nameEn: 'Ramadan Bundle',
    outOfStock: true,
    gender: 'male',
    story: 'A special bundle featuring Osiris and Haydara fragrances.',
    storyAr: 'حزمة خاصة تحتوي على عطري أوزيريس وحيدرا.',
    inspiredBy: '',
    categories: ['offers'],
    price: 499,
    originalPrice: 670,
    image: 'photos/FLORA_Onboarding_Ramadan_Bundle_Display_2026-02-18_00-13.png'
  },
  {
    id: 'Babel',
    nameEn: 'Babel',
    outOfStock: true,
    gender: 'unisex',
    story: 'Rising from the lands between the Tigris and Euphrates, Babylon stood as a beacon of civilization, where legends were born and empires were crowned. Under the reign of Nebuchadnezzar II, its walls touched the sky and its gates shone in blue and gold. Within its glory stood the Hanging Gardens — a testament to vision, power, and eternal beauty.',
    storyAr: 'من أراضي ما بين النهرين، وقفت بابل منارةً للحضارة حيث وُلدت الأساطير وتوجت الإمبراطوريات. في عهد نبوخذنصر الثاني، لامست جدرانها السماء وتألقت أبوابها بالأزرق والذهب — شهادة على الرؤية والقوة والجمال الأبدي.',
    inspiredBy: 'Khamrah Qahwa',
    categories: ['winter', 'forher'],
    price: 280,
    originalPrice: 335,
    image: 'photos/babel-Ishtar Gate (1).png',
    notes: {
      top  : ['Cinnamon', 'Cardamom', 'Ginger'],
      heart: ['Praline', 'Candied Fruits', 'White Flowers'],
      base : ['Vanilla', 'Coffee', 'Tonka Bean', 'Benzoin', 'Musk']
    }
  }
];