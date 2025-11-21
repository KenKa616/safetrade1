import React from 'react';
import { Globe } from 'lucide-react';
import { Language, TranslationDict } from '../types';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDict;
}

export const Header: React.FC<HeaderProps> = ({ language, setLanguage, t }) => {
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'az' : 'en');
  };

  return (
    <header>
      <div className="container flex justify-between items-center">
        {/* Logo Area */}
        <div className="logo-container">
          <div className="logo-box">
            <span>ST</span>
          </div>
          <div className="brand-name">
            <span className="text-safe">Safe</span><span className="text-trade">Trade</span>
          </div>
        </div>

        {/* Controls */}
        <div>
          <button
            onClick={toggleLanguage}
            className="lang-btn"
          >
            <Globe size={16} />
            {t.switchLanguage}
          </button>
        </div>
      </div>
    </header>
  );
};