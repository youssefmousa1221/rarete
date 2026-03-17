// Instagram — all Instagram links go here
const INSTAGRAM_URL = 'https://www.instagram.com/rarete.eg?igsh=MWZtZzd3enBydWYyaw==';

// TikTok — change to your TikTok profile
const TIKTOK_URL = 'https://www.tiktok.com/@rarete.eg';

const CATEGORIES = {
  all: { title: 'All', titleEn: 'All' },
  summer: { title: 'Summer', titleEn: 'Summer' },
  winter: { title: 'Winter', titleEn: 'Winter' },
  offers: { title: 'Offers', titleEn: 'Offers' },
  forher: { title: 'For Her', titleEn: 'For Her' }
};

const BESTSELLERS = ['osiris', 'trojan', 'Babel']; 
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
      top: ['Raspberry', 'Incense', 'Saffron','Gerranium'],
      heart: ['Oud', 'Benzoin', 'Rose'],
      base: ['Incense', 'Amberwood', 'Leather']
    }
  },
  {
    id: 'osiris',
    nameEn: 'Osiris',
    outOfStock: false,
    gender: 'male',
    story: 'In ancient Egyptian mythology, Osiris was the god of the afterlife, a figure of wisdom, justice, and transformation — a force that ruled beyond death and guided souls toward new beginnings.',
    storyAr: 'في الأسطورة المصرية القديمة، كان أوزيس إله العالم الآخر، تجسيداً للحكمة والعدالة والتحول — قوة تحكم ما بعد الموت وترشد الأرواح نحو بداية جديدة.',
    inspiredBy: 'Stronger With You Intensely',
    categories: ['winter'],
    price: 260,
    originalPrice: 310,
    image: 'photos/download (6).png',
    notes: {
      top: ['Pink Pepper', 'Juniper', 'Violet'],
      heart: ['Toffee', 'Cinnamon', 'Lavender', 'Sage'],
      base: ['Vanilla', 'Amber', 'Tonka Bean', 'Suede']
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
      top: ['Cinnamon', 'Orange Blossom', 'Cardamom', 'Bergamot'],
      heart: ['Bourbon Vanilla', 'Elemi'],
      base: ['Praline', 'Musk', 'Ambroxan', 'Guaiac Wood', 'Tonka', 'Candied Almond']
    }
  },
  {
    id: 'haydara',
    nameEn: 'Haydara',
    outOfStock: true,
    gender: 'male',
    story: 'During the historic "Battle of Khaybar", when the fortresses stood unbroken and fear filled the battlefield, Ali carried the banner with unmatched bravery. With unwavering resolve, he faced the formidable warrior "Marhab", turning the tide of battle and sealing a moment that would echo through history as a testament to valor and faith.',
    storyAr: 'خلال معركة خيبر التاريخية، عندما كانت الحصون منيعة والخوف يملأ ساحة المعركة، حمل علي الراية بشجاعة لا نظير لها. بعزم راسخ، واجه المقاتل المخيف "مرحب"، وحول مسار المعركة وختم لحظة ستتردد أصداؤها في التاريخ كشهادة على الشجاعة والإيمان.',
    inspiredBy: 'Oud for Greatness',
    categories: ['winter'],
    price: 300,
    originalPrice: 360,
    image: 'photos/1.png',
    notes: {
      top: ['Saffron', 'Nutmeg', 'Lavender'],
      heart: ['Agarwood (Oud)'],
      base: ['Patchouli', 'Musk']
    }
  },
  {
    id: 'Ramadan Bundle',
    nameEn: 'Ramadan Bundle',
    outOfStock: true,
    gender: 'male',
    story: 'A special bundle featuring Osiris and Haydara fragrances.',
    storyAr: 'حزمة خاصة تحتوي على عطرين أوزيريس وحيدرا.',
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
    story: 'Rising from the lands between the Tigris and Euphrates, Babylon stood as a beacon of civilization, where legends were born and empires were crowned. Under the reign of Nebuchadnezzar II, its walls touched the sky and its gates shone in blue and gold. Within its glory stood wonders like the Hanging Gardens of Babel — a testament to vision, power, and eternal beauty.',
    storyAr: 'توسطت أراضي ما بين النهرين، وقف بابل شعلة للحضارة حيث وُلدت الأساطير وتوجت الإمبراطوريات. في عهد نبوخذنصر الثاني،لامست جدران السماء وأبوابهم تألق بالأزرق والذهب. في مجدها وقفت عجائب مثل الحدائق المعلقة في بابل — شهادة على الرؤية والقوة والجمال الأبدي.',
    inspiredBy: 'Khamrah Qahwa',
    categories: ['winter','forher'],
    price: 280,
    originalPrice: 335,
    image: 'photos/babel-Ishtar Gate (1).png',
    notes: {
      top: ['Cinnamon', 'Cardamom', 'Ginger'],
      heart: ['Praline','Candied Fruits','White Flowers'],
      base: ['Vanilla', 'Coffee','Tonka Bean','Benzoin','Musk']
    }
  }
];
