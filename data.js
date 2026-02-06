// Instagram — all Instagram links go here
const INSTAGRAM_URL = 'https://www.instagram.com/rarete.eg?igsh=MWZtZzd3enBydWYyaw==';

// TikTok — change to your TikTok profile
const TIKTOK_URL = 'https://www.tiktok.com/@rarete.eg';

const CATEGORIES = {
  all: { title: 'All', titleEn: 'All' },
  summer: { title: 'Summer', titleEn: 'Summer' },
  winter: { title: 'Winter', titleEn: 'Winter' },
  offers: { title: 'Offers', titleEn: 'Offers' }
};

const PERFUMES = [
  {
    id: 'zeus',
    nameEn: 'Zeus',
    story: 'The scent of Greek power and wisdom. Zeus, lord of Olympus, gives you an unforgettable presence.',
    category: 'winter',
    price: 450,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80',
    notes: {
      top: ['Thunder Essence', 'Electric Ozone', 'Stormy Bergamot'],
      heart: ['Divine Ambrosia', 'Olympian Cedar', 'Lightning Musk'],
      base: ['Thunderous Amber', 'Godly Leather', 'Eternal Resin']
    }
  },
  {
    id: 'alexander',
    nameEn: 'Alexander the Great',
    story: 'The conqueror who changed the world. Boldness and ambition in every spray.',
    category: 'summer',
    price: 420,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80',
    notes: {
      top: ['Conquest Citrus', 'Victory Lime', 'Empire Grapefruit'],
      heart: ['Warrior Lavender', 'Conqueror\'s Rose', 'Battlefield Sage'],
      base: ['Royal Sandalwood', 'Triumphant Vanilla', 'Legendary Tonka']
    }
  },
  {
    id: 'osiris',
    nameEn: 'Osiris',
    story: 'The legend of life and rebirth. A deep scent that tells the eternal story of Egypt.',
    category: 'winter',
    price: 480,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80',
    notes: {
      top: ['Nile Water Lily', 'Sacred Incense', 'Desert Wind'],
      heart: ['Pharaoh\'s Myrrh', 'Eternal Frankincense', 'Rebirth Lotus'],
      base: ['Ancient Papyrus', 'Tomb Amber', 'Immortal Oud']
    }
  },
  {
    id: 'cleopatra',
    nameEn: 'Cleopatra',
    story: 'The queen\'s charm. Femininity and power in one fragrance.',
    category: 'summer',
    price: 440,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80',
    notes: {
      top: ['Queen\'s Rose', 'Royal Jasmine', 'Empress Peony'],
      heart: ['Seductive Ylang', 'Powerful Iris', 'Charming Tuberose'],
      base: ['Golden Honey', 'Luxurious Musk', 'Regal Patchouli']
    }
  },
  {
    id: 'apollo',
    nameEn: 'Apollo',
    story: 'God of light and the arts. Freshness and clarity for the day.',
    category: 'summer',
    price: 400,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1619994121345-228e4c2dce3b?w=600&q=80',
    notes: {
      top: ['Sunbeam Lemon', 'Radiant Orange', 'Golden Light'],
      heart: ['Solar Floral', 'Bright Neroli', 'Luminous Lavender'],
      base: ['Sunset Amber', 'Solar Wood', 'Eternal Light']
    }
  },
  {
    id: 'nefertiti',
    nameEn: 'Nefertiti',
    story: 'Beauty that never fades. A fragrance that evokes the spirit of the most beautiful queen.',
    category: 'offers',
    price: 350,
    originalPrice: 450,
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600&q=80',
    notes: {
      top: ['Beauty\'s Bloom', 'Radiant Magnolia', 'Elegant Freesia'],
      heart: ['Timeless Rose', 'Perfect Orchid', 'Divine Gardenia'],
      base: ['Eternal Vanilla', 'Smooth Cashmere', 'Unfading Beauty']
    }
  },
  {
    id: 'hades',
    nameEn: 'Hades',
    story: 'The mystery of the underworld. A dark, bold scent for the night.',
    category: 'winter',
    price: 470,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=80',
    notes: {
      top: ['Dark Smoke', 'Mysterious Cypress', 'Shadowy Black Pepper'],
      heart: ['Underworld Rose', 'Deep Vetiver', 'Eternal Night'],
      base: ['Dark Oud', 'Mysterious Leather', 'Abyssal Amber']
    }
  },
  {
    id: 'aphrodite',
    nameEn: 'Aphrodite',
    story: 'Goddess of love and beauty. An irresistible romantic fragrance.',
    category: 'summer',
    price: 430,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80',
    notes: {
      top: ['Love\'s First Blush', 'Passionate Pink Pepper', 'Romantic Bergamot'],
      heart: ['Goddess Rose', 'Seductive Jasmine', 'Enchanting Ylang'],
      base: ['Love Potion', 'Sensual Musk', 'Eternal Romance']
    }
  },
  {
    id: 'ramses',
    nameEn: 'Ramses',
    story: 'The greatness of the pharaohs. A fragrance fit for kings.',
    category: 'offers',
    price: 380,
    originalPrice: 480,
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80',
    notes: {
      top: ['Royal Spice', 'Pharaoh\'s Gold', 'Imperial Saffron'],
      heart: ['Temple Incense', 'Sacred Cedar', 'Divine Cinnamon'],
      base: ['Throne Oud', 'Royal Amber', 'Eternal Power']
    }
  }
];
