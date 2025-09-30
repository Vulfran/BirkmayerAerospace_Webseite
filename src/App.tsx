import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import StaticLogo from './components/StaticLogo';
import HomePage from './components/HomePage';
import ProjectsPage from './components/ProjectsPage';
import AboutPage from './components/AboutPage';
import FactProfilePage from './components/FactProfilePage';
import DownloadsPage from './components/DownloadsPage';
import ContactPage from './components/ContactPage';
import BottomNavigation from './components/BottomNavigation';

import { translations } from './data/translations';
import { projects } from './data/projectsData';
import { downloads } from './data/downloadsData';
import { useResponsive } from './hooks/useResponsive';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentProject, setCurrentProject] = useState(0);
  const [currentDownload, setCurrentDownload] = useState(0);
  const [language, setLanguage] = useState('en');
  const [slideDirection, setSlideDirection] = useState('');
  const { isMobile } = useResponsive();

  const t = translations[language as keyof typeof translations];

  const handleNavClick = (index: number) => {
    if (index === 6) { 
      window.open('/privacy', '_blank');
    } else {
      const direction = index > currentPage ? 'slide-left' : 'slide-right';
      setSlideDirection(direction);
      setTimeout(() => {
        setCurrentPage(index);
        setSlideDirection('');
      }, 300);
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };
  useEffect(() => {
    const handlePrivacyRoute = () => {
      if (window.location.pathname === '/privacy') {
        document.body.innerHTML = `
          <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: white; z-index: 9999; overflow-y: auto;">
            <div style="position: absolute; top: 20px; right: 20px; z-index: 10000;">
              <button onclick="window.close()" style="background: none; border: none; font-size: 24px; cursor: pointer; padding: 10px;">✕</button>
            </div>
            <div style="max-width: 800px; margin: 0 auto; padding: 60px 20px 20px;">
              <h1 style="font-size: 2.5rem; margin-bottom: 2rem; color: #333;">${t.privacyTitle}</h1>
              <div style="font-size: 1rem; line-height: 1.6; color: #666;">
                <h3 style="font-size: 1.3rem; color: #333; margin-top: 2rem; margin-bottom: 1rem;">${t.dataProtection}</h3>
                <p>${t.dataProtectionText}</p>
                <h3 style="font-size: 1.3rem; color: #333; margin-top: 2rem; margin-bottom: 1rem;">${t.informationWeCollect}</h3>
                <p>${t.informationWeCollectText}</p>
                <h3 style="font-size: 1.3rem; color: #333; margin-top: 2rem; margin-bottom: 1rem;">${t.howWeUse}</h3>
                <p>${t.howWeUseText}</p>
                <h3 style="font-size: 1.3rem; color: #333; margin-top: 2rem; margin-bottom: 1rem;">${t.dataSecurity}</h3>
                <p>${t.dataSecurityText}</p>
                <h3 style="font-size: 1.3rem; color: #333; margin-top: 2rem; margin-bottom: 1rem;">${t.contact}</h3>
                <p>${t.contactPrivacyText}</p>
              </div>
            </div>
          </div>
        `;
      }
    };

    handlePrivacyRoute();
  }, [language]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 0: 
        return <HomePage translations={t} />;
      case 1: 
        return (
          <ProjectsPage
            projects={projects}
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
            pageTitle={t.pages[1]}
          />
        );
      case 2: 
        return <AboutPage translations={t} />;
      case 3: 
        return <FactProfilePage translations={t} />;
      case 4: 
        return (
          <DownloadsPage
            downloads={downloads}
            currentDownload={currentDownload}
            setCurrentDownload={setCurrentDownload}
            pageTitle={t.pages[4]}
          />
        );
      case 5: 
        return <ContactPage translations={t} />;
      default: 
        return <HomePage translations={t} />;
    }
  };

  const renderMobileLayout = () => (
    <div className="mobile-layout">
      <StaticLogo isMobile={isMobile} />
      <div className="mobile-pages" style={{ paddingTop: '140px' }}>
        <div className="mobile-page" id="home">
          <HomePage translations={t} />
        </div>
        <div className="mobile-page" id="projects">
          <ProjectsPage
            projects={projects}
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
            pageTitle={t.pages[1]}
          />
        </div>
        <div className="mobile-page" id="about">
          <AboutPage translations={t} />
        </div>
        <div className="mobile-page" id="fact-profile">
          <FactProfilePage translations={t} />
        </div>
        <div className="mobile-page" id="downloads">
          <DownloadsPage
            downloads={downloads}
            currentDownload={currentDownload}
            setCurrentDownload={setCurrentDownload}
            pageTitle={t.pages[4]}
          />
        </div>
        <div className="mobile-page" id="contact">
          <ContactPage translations={t} />
        </div>
      </div>
      <BottomNavigation
        pages={t.pages}
        currentPage={currentPage}
        onNavClick={handleNavClick}
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
        isMobile={isMobile}
      />
    </div>
  );

  const renderDesktopLayout = () => (
  <div className="desktop-layout" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <StaticLogo isMobile={isMobile} />
    
      <div className={`carousel-content ${slideDirection}`}>
        {renderCurrentPage()}
     
    </div>
    <BottomNavigation
      pages={t.pages}
      currentPage={currentPage}
      onNavClick={handleNavClick}
      currentLanguage={language}
      onLanguageChange={handleLanguageChange}
      isMobile={isMobile}
    />
  </div>
);

  return isMobile ? renderMobileLayout() : renderDesktopLayout();
};

export default App;