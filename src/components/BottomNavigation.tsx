import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';

interface BottomNavigationProps {
  pages: string[];
  currentPage: number;
  onNavClick: (index: number) => void;
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  isMobile: boolean;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  pages,
  currentPage,
  onNavClick,
  currentLanguage,
  onLanguageChange,
  isMobile
}) => {
  const handleMobileNavClick = (index: number) => {
    if (isMobile && index < 6) {
      const pageIds = ['home', 'projects', 'about', 'fact-profile', 'downloads', 'contact'];
      const element = document.getElementById(pageIds[index]);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavClick(index);
    }
  };

  if (isMobile) {
    return null;
  }

  return (
    <nav 
      className="position-fixed bottom-0 start-0 end-0 text-white d-flex align-items-center px-5 gap-5"
      style={{ 
        backgroundColor: '#2c2c2c', 
        height: '70px',
        zIndex: 1000 
      }}
    >
      {pages.map((page, index) => (
        <button
          key={index}
          className={`btn btn-link text-white text-decoration-none px-0 py-2 position-relative ${
            currentPage === index ? 'fw-medium' : 'fw-normal'
          }`}
          onClick={() => handleMobileNavClick(index)}
          style={{ 
            border: 'none',
            fontSize: '16px',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          {page}
          {currentPage === index && (
            <div 
              className="position-absolute "
              style={{ height: '2px', transform: 'translateY(5px)' }}
            />
          )}
        </button>
      ))}
      <div className="ms-auto">
        <LanguageSwitcher
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
        />
      </div>
    </nav>
  );
};

export default BottomNavigation;