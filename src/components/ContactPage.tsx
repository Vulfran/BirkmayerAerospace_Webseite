import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface ContactPageProps {
  translations: {
    contactTitle: string;
    contactText1: string;
    contactText2: string;
  };
  isMobile: boolean;
}

const ContactPage: React.FC<ContactPageProps> = ({ translations: t, isMobile }) => {
  return (
    <div className="position-relative" style={{ minHeight: isMobile ? 'auto' : '100vh', overflow: 'hidden' }}>
      <Container fluid className={isMobile ? 'p-0' : 'h-100 p-0'}>
        <Row className={isMobile ? 'g-0' : 'h-100 g-0'}>
          <Col lg={6} className={`d-flex mt-40 order-2 order-lg-1 bg-white ${isMobile ? 'py-3' : ''}`}>
            <div className={` w-100 ${isMobile ? 'py-2' : 'px-lg-5 py-5'}`} 
                 style={{ 
                   marginBottom: isMobile ? '0' : '100px',
                   paddingTop: isMobile ? '0' : '0'
                 }}>
              <div className={isMobile ? 'mb-3' : 'mb-4'}>
                <h2 className={`text-danger ${isMobile ? 'fs-5 mb-3' : 'fs-3 mb-4'}`} 
                    style={{ fontWeight: '400', fontFamily: 'Times New Roman, serif' }}>
                  I look forward to your inquiries!
                </h2>

                <div className="text-muted" style={{ lineHeight: '1.6', fontSize: isMobile ? '0.9rem' : '1rem' }}>
                  <p className="mb-1">
                    <strong className="text-dark">Martin Steidl</strong>
                  </p>
                  <p className="mb-1">Moreller Weg 31</p>
                  <p className={isMobile ? 'mb-3' : 'mb-4'}>D-52074 Aachen</p>

                  <p className="mb-1">
                    <span className="text-dark">Phone</span>&nbsp;&nbsp;+49 (0) 241 89 42 372
                  </p>
                  <p className="mb-1">
                    <span className="text-dark">Fax</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+49 (0) 241 89 42 382
                  </p>
                  <p className="mb-1">
                    <span className="text-dark">Mobile</span>&nbsp;+49 (0) 173 21 02 729
                  </p>
                  <p className={isMobile ? 'mb-3' : 'mb-4'}>
                    <span className="text-dark">E-mail</span>&nbsp;&nbsp;m.steidl@steidl-partner.de
                  </p>

                  <p className="mb-1" style={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}>
                    Responsible for content as per §5 of the German Telemedia Act: Martin Steidl
                  </p>
                  <p className="mb-0" style={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}>
                    VAT identification number as per § 27a of the German Value Added Tax Act: DE 230 809 403.
                  </p>
                </div>
              </div>
            </div>
          </Col>
          {!isMobile && (
            <Col lg={6} className="p-0 order-1 order-lg-2">
              <div className="h-100 position-relative">
                <img
                  src="https://steidl-partner.de/wp-content/themes/steidl/img/steidl-kontakt-big.jpg"
                  alt="Martin Steidl"
                  className="h-[100vh] w-100"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ContactPage;