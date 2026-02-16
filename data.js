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
    story: 'The scent of Greek power and wisdom. Zeus, lord of Olympus, gives you an unforgettable presence.',
    category: 'winter',
    price: 450,
    originalPrice: 500,
    image: 'photos/zeus-perfume-8yeabxz2j.png',
    notes: {
      top: ['Thunder Essence', 'Electric Ozone', 'Stormy Bergamot'],
      heart: ['Divine Ambrosia', 'Olympian Cedar', 'Lightning Musk'],
      base: ['Thunderous Amber', 'Godly Leather', 'Eternal Resin']
    }
  },
  {
    id: 'osiris',
    nameEn: 'Osiris',
    story: 'In ancient Egyptian mythology, Osiris was the god of the afterlife, a figure of wisdom, justice, and transformation — a force that ruled beyond death and guided souls toward new beginnings.',
    category: 'winter',
    price: 450,
    originalPrice: 500,
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
    story: 'In ancient Greek mythology, the Trojan Horse was the wooden structure used by the Greeks to enter the city of Troy after years of war — a masterstroke of intelligence that changed history forever.',
    category: 'winter',
    price: 530,
    originalPrice: 600,
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
    story: "During the historic 'Battle of Khaybar', when the fortresses stood unbroken and fear filled the battlefield, Ali carried the banner with unmatched bravery. With unwavering resolve, he faced the formidable warrior 'Marhab', turning the tide of battle and sealing a moment that would echo through history as a testament to valor and faith.",
    category: 'winter',
    price: 450,
    originalPrice: 500,
    image: 'photos/1.png',
    notes: {
      top: ['Saffron', 'Nutmeg', 'Lavender'],
      heart: ['Agarwood (Oud)'],
      base: ['Patchouli', 'Musk']
    }
  },
];