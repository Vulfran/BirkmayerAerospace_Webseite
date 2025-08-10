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
                style={{ maxHeight: isMobile ? '100vh' : '100vh', objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          </Col>

          <Col lg={8} className="d-flex align-items-center order-1 order-lg-2">
            <div className="px-5 py-4 w-100" style={{ marginBottom: isMobile ? '0' : '100px' }}>
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