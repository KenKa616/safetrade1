export enum Category {
  ALGIDA = 'Algida',
  UNICA = 'UNICA'
}

export type Language = 'en' | 'az';

export interface FinancialMetrics {
  daily: number;
  monthly: number;
  annual: number;
}

export interface Product {
  id: string;
  barcode: string;
  name: string;
  imageUrl: string;
  category: Category;
  price: number;
  income: FinancialMetrics;
  expenses: FinancialMetrics;
  returns: FinancialMetrics;
}

export interface TranslationDict {
  dashboardTitle: string;
  totalIncome: string;
  totalExpenses: string;
  totalReturns: string;
  daily: string;
  monthly: string;
  annual: string;
  productName: string;
  price: string;
  income: string;
  expenses: string;
  returns: string;
  category: string;
  algidaSection: string;
  unicaSection: string;
  switchLanguage: string;
  viewDetails: string;
  currency: string;
  overview: string;
  products: string;
  searchPlaceholder: string;
  barcode: string;
}