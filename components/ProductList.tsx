import React, { useState } from 'react';
import { Product, Category, TranslationDict, FinancialMetrics } from '../types';
import { Package, ChevronDown, ChevronUp, TrendingUp, TrendingDown, RefreshCw, Barcode } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  category: Category;
  t: TranslationDict;
  currency: string;
  timeRange: 'daily' | 'monthly' | 'annual';
}

export const ProductList: React.FC<ProductListProps> = ({ products, category, t, currency, timeRange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const filteredProducts = products.filter(p => p.category === category);

  // Helper to get the right metric based on selection
  const getMetric = (metrics: FinancialMetrics) => metrics[timeRange];

  const isAlgida = category === Category.ALGIDA;
  const headerClass = isAlgida ? 'bg-algida' : 'bg-unica';
  const sectionTitle = isAlgida ? t.algidaSection : t.unicaSection;

  return (
    <div className="card" style={{ padding: 0, border: 'none', overflow: 'hidden', marginBottom: '40px' }}>
      {/* Section Header */}
      <div 
        className={`section-header ${headerClass}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <Package size={24} />
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>{sectionTitle}</h2>
        </div>
        {isExpanded ? <ChevronUp color="white" /> : <ChevronDown color="white" />}
      </div>

      {/* Table */}
      {isExpanded && (
        <div style={{ overflowX: 'auto' }}>
          <table className="product-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Image</th>
                <th>{t.barcode}</th>
                <th>{t.productName}</th>
                <th className="text-right">{t.price}</th>
                <th className="text-right">{t.income}</th>
                <th className="text-right">{t.expenses}</th>
                <th className="text-right">{t.returns}</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img src={product.imageUrl} alt={product.name} className="product-img" />
                  </td>
                  <td>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Barcode size={14} />
                        <span className="barcode-badge">{product.barcode}</span>
                     </div>
                  </td>
                  <td>
                    <div className="font-bold" style={{ color: '#111827' }}>{product.name}</div>
                  </td>
                  <td className="text-right font-bold">
                    {currency}{product.price.toFixed(2)}
                  </td>
                  <td className="text-right font-bold text-green">
                    {currency}{getMetric(product.income).toLocaleString()}
                  </td>
                  <td className="text-right font-bold text-red">
                    {currency}{getMetric(product.expenses).toLocaleString()}
                  </td>
                  <td className="text-right font-bold text-orange">
                    {currency}{getMetric(product.returns).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};