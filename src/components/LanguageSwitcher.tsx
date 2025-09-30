import React from 'react';

interface LanguageSwitcherProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="d-flex align-items-center gap-2 text-white">
      <span 
        className={`cursor-pointer ${currentLanguage === 'de' ? 'text-danger fw-medium' : ''}`}
        style={{ cursor: 'pointer', fontSize: '14px' }}
        onClick={() => onLanguageChange('de')}
      >
        de
      </span>
      <span className="text-muted">|</span>
      <span 
        className={`cursor-pointer ${currentLanguage === 'en' ? 'text-danger fw-medium' : ''}`}
        style={{ cursor: 'pointer', fontSize: '14px' }}
        onClick={() => onLanguageChange('en')}
      >
        en
      </span>
    </div>
  );
};

export default LanguageSwitcher;