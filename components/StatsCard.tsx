import React from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  type: 'income' | 'expense' | 'return';
  currencySymbol: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, type, currencySymbol }) => {
  let icon = null;
  let iconColor = '';

  switch (type) {
    case 'income':
      iconColor = '#16a34a'; // Green
      icon = <ArrowUpRight size={24} color={iconColor} />;
      break;
    case 'expense':
      iconColor = '#dc2626'; // Red
      icon = <ArrowDownRight size={24} color={iconColor} />;
      break;
    case 'return':
      iconColor = '#d97706'; // Orange
      icon = <DollarSign size={24} color={iconColor} />;
      break;
  }

  // Format large numbers (e.g. 40,000,000 -> 40M)
  const formattedValue = new Intl.NumberFormat('en-US', {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1
  }).format(value);

  return (
    <div className="card">
      <p className="stat-label">{title}</p>
      <h3 className="stat-value">
        {currencySymbol}{formattedValue}
      </h3>
      <div className="card-icon">
        {icon}
      </div>
    </div>
  );
};