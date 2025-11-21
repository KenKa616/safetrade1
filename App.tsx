import React, { useState, useMemo } from 'react';
import { Language, Category, Product } from './types';
import { MOCK_PRODUCTS, TRANSLATIONS } from './constants';
import { Header } from './components/Header';
import { StatsCard } from './components/StatsCard';
import { ProductList } from './components/ProductList';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Search } from 'lucide-react';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [globalTimeRange, setGlobalTimeRange] = useState<'daily' | 'monthly' | 'annual'>('monthly');
  const [searchQuery, setSearchQuery] = useState('');
  
  const t = TRANSLATIONS[language];

  // Filter products based on search query (Name or Barcode)
  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    if (!query) return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.barcode.includes(query)
    );
  }, [searchQuery]);

  // Calculate Totals based on filtered products
  const totals = useMemo(() => {
    return filteredProducts.reduce(
      (acc, product) => ({
        income: acc.income + product.income[globalTimeRange],
        expenses: acc.expenses + product.expenses[globalTimeRange],
        returns: acc.returns + product.returns[globalTimeRange],
      }),
      { income: 0, expenses: 0, returns: 0 }
    );
  }, [globalTimeRange, filteredProducts]);

  // Prepare Chart Data - Aggregate by Category
  const chartData = useMemo(() => {
    const algidaProducts = filteredProducts.filter(p => p.category === Category.ALGIDA);
    const unicaProducts = filteredProducts.filter(p => p.category === Category.UNICA);

    const sumMetric = (products: Product[], key: 'income' | 'expenses' | 'returns') => 
      products.reduce((sum, p) => sum + p[key][globalTimeRange], 0);

    return [
      {
        name: 'Algida',
        income: sumMetric(algidaProducts, 'income'),
        expenses: sumMetric(algidaProducts, 'expenses'),
        returns: sumMetric(algidaProducts, 'returns'),
      },
      {
        name: 'UNICA',
        income: sumMetric(unicaProducts, 'income'),
        expenses: sumMetric(unicaProducts, 'expenses'),
        returns: sumMetric(unicaProducts, 'returns'),
      },
    ];
  }, [globalTimeRange, filteredProducts]);

  const pieData = [
    { name: 'Algida', value: chartData[0].income },
    { name: 'UNICA', value: chartData[1].income },
  ];

  // Distribution in Red Tones as requested
  const PIE_COLORS = ['#dc2626', '#fca5a5']; 

  // Chart Tooltip Style
  const tooltipStyle = {
    backgroundColor: '#111827',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  };

  // Mock Images for Ads
  const leftAdImg = "https://placehold.co/200x300/2563eb/ffffff?text=UNICA+Clean";
  const rightAdImg = "https://placehold.co/200x300/2563eb/ffffff?text=Power+Scrub";

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '50px' }}>
      <Header language={language} setLanguage={setLanguage} t={t} />

      {/* Left Sidebar Ad (Cleaning) */}
      <div className="ad-sidebar ad-left">
        <div className="ad-content">
          <div className="ad-badge">NEW</div>
          <img src={leftAdImg} alt="Ad" className="ad-image" />
          <div className="ad-title">UNICA Pure</div>
          <p className="ad-text">Ultimate home hygiene for your family.</p>
        </div>
        <div className="ad-content">
           <div className="ad-badge">-20% OFF</div>
           <div className="ad-title">Bulk Buy</div>
           <p className="ad-text">Save on professional cleaning supplies.</p>
        </div>
      </div>

      {/* Right Sidebar Ad (Cleaning) */}
      <div className="ad-sidebar ad-right">
        <div className="ad-content">
          <div className="ad-badge">BEST SELLER</div>
          <img src={rightAdImg} alt="Ad" className="ad-image" />
          <div className="ad-title">Power Scrub</div>
          <p className="ad-text">Tough on stains, gentle on hands.</p>
        </div>
        <div className="ad-content">
           <div className="ad-title">Clean Pro</div>
           <p className="ad-text">Trusted by 10,000+ businesses daily.</p>
        </div>
      </div>

      <main className="container">
        
        {/* Dashboard Header with Search in the Middle */}
        <div className="dashboard-header">
           {/* Left: Title */}
           <h1 className="dashboard-title">{t.dashboardTitle}</h1>
           
           {/* Center: Search */}
           <div className="search-box">
              <Search className="search-icon" size={20} />
              <input 
                 type="text" 
                 placeholder={t.searchPlaceholder} 
                 className="search-input"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
           
           {/* Right: Toggles */}
           <div className="time-toggles">
              {(['daily', 'monthly', 'annual'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setGlobalTimeRange(range)}
                  className={globalTimeRange === range ? 'active' : ''}
                >
                  {t[range]}
                </button>
              ))}
           </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid-3">
          <StatsCard
            title={t.totalIncome}
            value={totals.income}
            type="income"
            currencySymbol={t.currency}
          />
          <StatsCard
            title={t.totalExpenses}
            value={totals.expenses}
            type="expense"
            currencySymbol={t.currency}
          />
          <StatsCard
            title={t.totalReturns}
            value={totals.returns}
            type="return"
            currencySymbol={t.currency}
          />
        </div>

        {/* Charts Section */}
        <div className="grid-main" style={{ margin: '40px 0' }}>
          {/* Bar Chart - Red Tones for Income and Expenses */}
          <div className="card">
            <h3 style={{ fontWeight: 800, margin: 0 }}>{t.income} vs {t.expenses}</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontWeight={600} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => new Intl.NumberFormat('en', { notation: 'compact' }).format(val)}/>
                  <Tooltip 
                    contentStyle={tooltipStyle}
                    itemStyle={{ color: '#fff' }}
                    cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                  />
                  <Legend iconType="circle" />
                  {/* Income (Light Red) and Expenses (Dark Red) */}
                  <Bar dataKey="income" fill="#f87171" name={t.income} radius={[6, 6, 0, 0]} barSize={50} />
                  <Bar dataKey="expenses" fill="#991b1b" name={t.expenses} radius={[6, 6, 0, 0]} barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart - Red Tones */}
          <div className="card">
            <h3 style={{ fontWeight: 800, margin: 0 }}>Distribution</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="none"/>
                    ))}
                  </Pie>
                  <Tooltip 
                     contentStyle={tooltipStyle}
                     itemStyle={{ color: '#fff' }}
                     formatter={(val: number) => new Intl.NumberFormat('en', { notation: 'compact' }).format(val)} 
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle"/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Product Sections */}
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '25px' }}>{t.products}</h2>
          
          <ProductList 
            products={filteredProducts} 
            category={Category.ALGIDA} 
            t={t} 
            currency={t.currency}
            timeRange={globalTimeRange}
          />
          
          <ProductList 
            products={filteredProducts} 
            category={Category.UNICA} 
            t={t} 
            currency={t.currency}
            timeRange={globalTimeRange}
          />
        </div>
      </main>
    </div>
  );
};

export default App;