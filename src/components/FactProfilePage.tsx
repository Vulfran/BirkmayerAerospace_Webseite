import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

interface FactProfilePageProps {
  translations: {
    factProfileTitle: string;
    factProfileIntro1: string;
    factProfileIntro2: string;
    yourName: string;
    yourEmail: string;
    yourPhone: string;
    consentText: string;
    send: string;
  };
}

const FactProfilePage: React.FC<FactProfilePageProps> = ({ translations: t }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consent: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col className="d-flex align-items-center justify-content-center">
          <div className="p-5" style={{ maxWidth: '800px', width: '100%' }}>
            <h1 className="fw-normal text-dark mb-4 text-start" style={{ fontSize: '2rem' }}>
              {t.factProfileTitle}
            </h1>
            <div className="text-start mb-4 text-muted">
              <p className="fs-6 mb-2">{t.factProfileIntro1}</p>
              <p className="fs-6">{t.factProfileIntro2}</p>
            </div>
            <Form onSubmit={handleSubmit} className="mt-4 text-start">
              <Form.Group className="mb-3">
                <Form.Control 
                  type="text" 
                  name="name"
                  placeholder={t.yourName}
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border-2 p-3 fs-6"
                  style={{ backgroundColor: '#ffffff', maxWidth: '600px' }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control 
                  type="email" 
                  name="email"
                  placeholder={t.yourEmail}
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-2 p-3 fs-6"
                  style={{ backgroundColor: '#ffffff', maxWidth: '600px' }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control 
                  type="tel" 
                  name="phone"
                  placeholder={t.yourPhone}
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="border-2 p-3 fs-6"
                  style={{ backgroundColor: '#ffffff', maxWidth: '600px' }}
                />
              </Form.Group>
              <div className='d-flex align-items-center justify-items-center mb-4' style={{ maxWidth: '600px' }}>
              <div className="d-flex align-items-center mb-4" style={{ maxWidth: '600px' }}>
                <Form.Check 
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  className="me-3"
                  style={{ transform: 'scale(1.2)' }}
                />
                <span className="text-muted small lh-sm">
                  {t.consentText}
                </span>
              </div>
              <Button 
                variant="danger" 
                type="submit"
                className="rounded-0 fs-6"
                disabled={!formData.consent || !formData.name || !formData.email}
                style={{ maxWidth: '70px', width: '100%' }}
              >
                {t.send}
              </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FactProfilePage;