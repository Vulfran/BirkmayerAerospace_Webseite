import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface HomePageProps {
  translations: {
    mainTitle: string;
    subtitle: string;
    mainText1: string;
    mainText2: string;
    references: string;
    atAnyTime: string;
  };
  isMobile?: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ translations: t, isMobile = false }) => {
  return (
    <Container fluid className="h-100 p-0">
      <Row className="h-100 g-0">
        <Col lg={6} className="d-flex order-2 order-lg-1">
          <div className={`px-4 px-lg-5 py-5 w-100 d-flex align-items-start mt-20 ${isMobile ? 'mobile-content-no-padding' : ''}`}>
            <div className="main-content w-100 " style={{ paddingTop: isMobile ? '2rem' : '0' }}>
              <h2 className={`text-danger mb-3 fw-medium ${isMobile ? 'fs-5' : 'fs-4'}`}>
                {t.subtitle}
              </h2>

              <h3 className={`fw-bold text-dark mt-4 mb-4 ${isMobile ? 'fs-4' : 'fs-2'}`} style={{ fontFamily:'Times New Roman, serif' }}>
                {t.mainTitle}
              </h3>

              <div className={`text-dark lh-lg ${isMobile ? 'fs-6' : 'fs-6'}`}>
                <p className="mb-4" style={{color:"#696969"}}>{t.mainText1}</p>
                <p className="mb-0" style={{color:"#696969"}}>
                  {t.mainText2}{' '}
                  <a
                    href="mailto:info@steidl-partner.de?subject=References Request"
                    className="text-dark fw-medium text-decoration-underline"
                    style={{ textDecorationColor: 'rgba(0, 0, 0, 0.3)', color:'#696969' }}
                  >
                    {t.references}
                  </a>{' '}
                  {t.atAnyTime}.
                </p>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={6} className="p-0 order-1 order-lg-2">
          <div className="h-100 d-flex align-items-center justify-content-center bg-light">
<img src="https://steidl-partner.de/wp-content/themes/steidl/img/steidl-home-big.jpg"
              alt="Martin Steidl"
              className="w-100 h-100"
              style={{ objectFit: 'cover', minHeight: isMobile ? '300px' : '400px' }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;