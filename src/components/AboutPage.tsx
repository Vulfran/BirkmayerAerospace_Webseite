import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface AboutPageProps {
  translations: {
    aboutTitle: string;
    aboutSubtitle: string;
    aboutPersonal: string;
    aboutText1: string;
    aboutText2: string;
    references: string;
    aboutText3: string;
  };
  isMobile?: boolean;
}

const AboutPage: React.FC<AboutPageProps> = ({ translations: t, isMobile = false }) => {
  return (
    <div className="position-relative" style={{ height: '100vh', overflow: 'hidden' }}>
      <Container fluid className="h-100 p-0">
        <Row className="h-100 g-0">
          <Col lg={4} className="d-flex align-items-start justify-content-center p-0 order-2 order-lg-1">
            <div className={`w-100 h-100 d-flex align-items-center justify-content-center px-4 ${isMobile ? 'about-mobile-image' : ''}`} 
                 style={{ 
                   paddingTop: isMobile ? '20px' : '140px', 
                   paddingBottom: isMobile ? '20px' : '100px' 
                 }}>
              <img
                src="https://steidl-partner.de/wp-content/themes/steidl/img/steidl-about-big.jpg"
                alt="Martin Steidl"
                className="   w-100 h-100"
                style={{ objectFit: 'cover', minHeight: isMobile ? '300px' : '400px' }}
              />
            </div>
        </Col>

        {/* Text Column - With proper scrolling */}
        <Col lg={8} className={`order-1 order-lg-2 ${isMobile ? 'px-3 py-4' : 'px-5 pt-5'}`}>
          <div style={{
            overflow: 'auto',
            maxHeight: isMobile ? 'calc(100vh - 300px)' : '95vh',
            paddingRight: isMobile ? '0' : '15px',
            paddingBottom: '80px', // Padding for navbar
            scrollBehavior: 'smooth'
          }}>
            <h2 className={`fw-normal text-dark mb-3 ${isMobile ? 'fs-3' : 'display-4'}`}>
              {t.aboutTitle}
            </h2>
            <p className={`text-muted mb-2 ${isMobile ? 'fs-6' : 'fs-5'}`}>
              {t.aboutSubtitle}
            </p>
            <p className={`text-muted mb-4 ${isMobile ? 'fs-6' : 'fs-6'}`}>
              {t.aboutPersonal}
            </p>
            <div className={`text-muted lh-lg ${isMobile ? 'fs-6' : 'fs-6'}`}>
              <p className="mb-4">{t.aboutText1}</p>
              <p className="mb-0">
                {t.aboutText2}{' '}
                <a
                  href="mailto:info@steidl-partner.de?subject=References Request"
                  className="text-dark fw-medium text-decoration-underline"
                >
                  {t.references}
                </a>{' '}
                {t.aboutText3}
              </p>
            </div>
          </div>
          
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default AboutPage;