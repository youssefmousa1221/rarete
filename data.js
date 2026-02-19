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

const PERFUMES = [
  {
    id: 'zeus',
    nameEn: 'Zeus',
    story: 'Inspired by "Ombre Nomade".The scent of Greek power and wisdom. Zeus, lord of Olympus, gives you an unforgettable presence.',
    category: 'winter',
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
    story: 'Inspired by "Stronger With You Intensely". In ancient Egyptian mythology, Osiris was the god of the afterlife, a figure of wisdom, justice, and transformation — a force that ruled beyond death and guided souls toward new beginnings.',
    category: 'winter',
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
    story: 'Inspired by "ALTHAÏR". In ancient Greek mythology, the Trojan Horse was the wooden structure used by the Greeks to enter the city of Troy after years of war — a masterstroke of intelligence that changed history forever.',
    category: 'winter',
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
    story: 'Inspired by "oud for greatness". During the historic "Battle of Khaybar", when the fortresses stood unbroken and fear filled the battlefield, Ali carried the banner with unmatched bravery. With unwavering resolve, he faced the formidable warrior "Marhab", turning the tide of battle and sealing a moment that would echo through history as a testament to valor and faith.',
    category: 'winter',
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
    story: '"Osiris" Inspired by"Stronger With You Intensely" & "Haydara" Inspired by "oud for greatness"',
    category: 'offers',
    price: 499,
    originalPrice: 670,
    image: 'photos/FLORA_Onboarding_Ramadan_Bundle_Display_2026-02-18_00-13.png',
  
  }

];
