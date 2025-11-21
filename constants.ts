import { Product, Category, TranslationDict, Language } from './types';

export const TRANSLATIONS: Record<Language, TranslationDict> = {
  en: {
    dashboardTitle: "Sales Dashboard",
    totalIncome: "Total Income",
    totalExpenses: "Total Expenses",
    totalReturns: "Total Returns",
    daily: "Daily",
    monthly: "Monthly",
    annual: "Annual",
    productName: "Product",
    price: "Price",
    income: "Income",
    expenses: "Expenses",
    returns: "Returns",
    category: "Category",
    algidaSection: "Algida (Ice Creams)",
    unicaSection: "UNICA (Cleaning)",
    switchLanguage: "Azərbaycan dili",
    viewDetails: "View Details",
    currency: "₼",
    overview: "Financial Overview",
    products: "Product Catalog",
    searchPlaceholder: "Search by product name or barcode...",
    barcode: "Barcode"
  },
  az: {
    dashboardTitle: "Satış Paneli",
    totalIncome: "Ümumi Gəlir",
    totalExpenses: "Ümumi Xərclər",
    totalReturns: "Ümumi Qaytarılmalar",
    daily: "Günlük",
    monthly: "Aylıq",
    annual: "İllik",
    productName: "Məhsul",
    price: "Qiymət",
    income: "Gəlir",
    expenses: "Xərclər",
    returns: "Qaytarılmalar",
    category: "Kateqoriya",
    algidaSection: "Algida (Dondurmalar)",
    unicaSection: "UNICA (Təmizlik Vasitələri)",
    switchLanguage: "English",
    viewDetails: "Detallara bax",
    currency: "₼",
    overview: "Maliyyə İcmalı",
    products: "Məhsul Kataloqu",
    searchPlaceholder: "Məhsul adı və ya barkod ilə axtar...",
    barcode: "Barkod"
  }
};

// Helper to generate random metrics in MILLIONS
// Base input 100 means ~100k daily, ~3M monthly
const generateMetrics = (base: number) => ({
  daily: Math.floor(base * 10000 * (0.8 + Math.random() * 0.4)),
  monthly: Math.floor(base * 30 * 10000 * (0.8 + Math.random() * 0.4)),
  annual: Math.floor(base * 365 * 10000 * (0.8 + Math.random() * 0.4)),
});

const iceCreamImg = "https://placehold.co/100x100/e5e7eb/dc2626?text=Ice+Cream";
const cleaningImg = "https://placehold.co/100x100/e5e7eb/2563eb?text=Clean";

// --- Product Generation Logic ---

const generateProducts = (
  count: number, 
  category: Category, 
  baseNames: string[], 
  startId: number, 
  baseBarcode: number,
  img: string
): Product[] => {
  const products: Product[] = [];
  const suffixes = ['Classic', 'Large', 'Mini', 'Special', 'Premium', 'Max', 'Ultra', 'Lite', 'Gold', 'Family Pack'];
  const flavors = ['Vanilla', 'Chocolate', 'Strawberry', 'Caramel', 'Almond', 'Cookie', 'Berry', 'Mint', 'Lemon', 'Hazelnut'];
  const scents = ['Lemon', 'Lavender', 'Pine', 'Ocean', 'Rose', 'Spring', 'Citrus', 'Apple', 'Fresh', 'Original'];

  for (let i = 0; i < count; i++) {
    const baseName = baseNames[i % baseNames.length];
    let variant = "";
    
    if (category === Category.ALGIDA) {
        // Mix flavors and suffixes for variety
        const flav = flavors[(i + Math.floor(i / baseNames.length)) % flavors.length];
        variant = `${baseName} ${flav}`;
    } else {
        // Mix scents and suffixes
        const scent = scents[(i + Math.floor(i / baseNames.length)) % scents.length];
        variant = `${baseName} ${scent}`;
    }

    const price = 1.0 + (Math.random() * 10); // Random price between 1 and 11
    const incomeBase = 50 + (Math.random() * 200); // Random base for metrics

    products.push({
      id: category === Category.ALGIDA ? `a${startId + i}` : `u${startId + i}`,
      barcode: (baseBarcode + i).toString(),
      name: variant,
      imageUrl: img,
      category: category,
      price: Number(price.toFixed(2)),
      income: generateMetrics(incomeBase),
      expenses: generateMetrics(incomeBase * 0.6), // Expenses roughly 60% of income
      returns: generateMetrics(incomeBase * 0.05), // Returns roughly 5% of income
    });
  }
  return products;
};

// 1. Algida Base Names
const algidaBases = [
  'Magnum', 'Cornetto', 'Twister', 'Solero', 'Carte D\'Or', 
  'Viennetta', 'Maxibon', 'Calippo', 'Feast', 'Nogger', 
  'Fruttare', 'Paddle Pop', 'Swedish Glace', 'Ben & Jerry\'s', 'Wall\'s'
];

// 2. Unica Base Names
const unicaBases = [
  'Domestos', 'Cif Cream', 'Sunlight', 'Omo Powder', 'Comfort', 
  'Glorix', 'Handy Andy', 'Glass Cleaner', 'Toilet Duck', 'Degreaser', 
  'Air Freshener', 'Scrubber', 'Dish Gel', 'Floor Shine', 'Surface Spray'
];

// Generate 60 Algida Products
const algidaProducts = generateProducts(
  60, 
  Category.ALGIDA, 
  algidaBases, 
  1000, 
  869063701000, 
  iceCreamImg
);

// Generate 50 UNICA Products
const unicaProducts = generateProducts(
  50, 
  Category.UNICA, 
  unicaBases, 
  2000, 
  400063702000, 
  cleaningImg
);

export const MOCK_PRODUCTS: Product[] = [
  ...algidaProducts,
  ...unicaProducts
];
