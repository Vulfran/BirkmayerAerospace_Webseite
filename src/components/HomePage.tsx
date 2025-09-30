import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface HomePageProps {
  translations: {
    logoText: string;
    subtitle: string;
    mainTitle: string;
    mainText1: string;
    mainText2: string;
    references: string;
    atAnyTime: string;
  };
  isMobile?: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ translations: t, isMobile = false }) => {
  return (
    <Container fluid className="p-0" style={{ minHeight: '100vh' }}>
      <Row className="g-0" style={{ minHeight: '100vh' }}>
        {/* Text Column */}
        <Col lg={6} className={`order-2 order-lg-1 ${isMobile ? 'px-4 py-3' : 'px-4 px-lg-5 py-4'}`}>
          {/* Logo Section - Tightened mobile spacing */}
          <div style={{ 
            height: isMobile ? '50px' : '80px',
            display: 'flex',
            alignItems: 'flex-end',
            marginBottom: isMobile ? '0.25rem' : '2rem',
            paddingTop: isMobile ? '0.5rem' : '0'
          }}>
            <h1 className="text-dark m-0" style={{ 
              fontSize: isMobile ? '1.8rem' : '2.5rem',
              fontWeight: 400,
              fontFamily: 'Times New Roman, serif',
              lineHeight: '1.1'
            }}>
              {t.logoText}
            </h1>
          </div>
          
          {/* Content Area - Fixed mobile height calculation */}
          <div style={{
            overflow: 'auto',
            maxHeight: isMobile ? 'auto' : 'calc(100vh - 120px)',
            paddingRight: isMobile ? '0' : '15px',
            paddingBottom: isMobile ? '1.25rem' : '90px',
            scrollBehavior: 'smooth'
          }}>
            {/* Subtitle with no top margin on mobile */}
            <h2 className={`text-dark ${isMobile ? 'mb-2 mt-0' : 'mb-3'}`} style={{
              fontSize: isMobile ? '1rem' : '1.25rem',
              fontWeight: 300,
              fontFamily: 'Times New Roman, serif',
              lineHeight: '1.2'
            }}>
              {t.subtitle}
            </h2>

            {/* Rest of the content remains unchanged */}
            <h3 className={`fw-light text-dark mb-4 ${isMobile ? 'fs-5' : 'fs-3'}`} style={{
              fontFamily: 'Times New Roman, serif',
              fontWeight: 400
            }}>
              {t.mainTitle}
            </h3>

            <div className={`text-dark lh-base ${isMobile ? 'fs-6' : 'fs-5'}`} style={{
              fontFamily: 'Arial, sans-serif',
              fontWeight: 300
            }}>
              <p className="mb-3" style={{color:"#696969"}}>{t.mainText1}</p>
              <p className="mb-4" style={{color:"#696969"}}>
                {t.mainText2}
              </p>
              <p className="mb-0" style={{color:"#696969"}}>
                {t.atAnyTime}{' '}
                <a
                  href="mailto:info@steidl-partner.de?subject=References Request"
                  className="text-dark text-decoration-underline"
                  style={{ textDecorationColor: 'rgba(0, 0, 0, 0.3)', color:'#696969' }}
                >
                  {t.references}
                </a>.
              </p>
            </div>
          </div>
        </Col>

        {/* Image Column - Fixed mobile height */}
        <Col lg={6} className={`p-0 order-1 order-lg-2`}>

          <div style={{ 
            height: isMobile ? '50vh' : '100vh',
            overflow: 'hidden'
          }}>
            <img
              src="https://steidl-partner.de/wp-content/themes/steidl/img/steidl-home-big.jpg"
              alt="Martin Steidl"
              className="h-[100vh] w-100"
              style={{
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;