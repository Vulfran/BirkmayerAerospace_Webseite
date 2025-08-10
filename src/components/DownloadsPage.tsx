import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

interface Download {
  title: string;
  description: string;
  url: string;
}

interface DownloadsPageProps {
  downloads: Download[];
  currentDownload: number;
  setCurrentDownload: (index: number) => void;
  pageTitle: string;
  isMobile?: boolean;
}

const DownloadsPage: React.FC<DownloadsPageProps> = ({
  downloads,
  currentDownload,
  setCurrentDownload,
  pageTitle,
  isMobile = false
}) => {
  const handlePrevious = () => {
    setCurrentDownload(currentDownload > 0 ? currentDownload - 1 : downloads.length - 1);
  };

  const handleNext = () => {
    setCurrentDownload(currentDownload < downloads.length - 1 ? currentDownload + 1 : 0);
  };

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col className="d-flex align-items-center justify-content-center">
          <div className="text-center p-4" style={{ maxWidth: '1000px', width: '100%' }}>
            <div className="mb-4">
              <span className="text-danger fw-medium fs-5">
                {pageTitle} {currentDownload + 1} / {downloads.length}
              </span>
            </div>
            <div className={`${isMobile ? 'mobile-carousel-layout' : 'd-flex justify-content-between align-items-start'} mb-4`}>
              {!isMobile && (
                <Button
                  variant="outline-secondary"
                  className="rounded-circle d-flex align-items-center justify-content-center border-2 flex-shrink-0"
                  style={{ width: '60px', height: '60px' }}
                  onClick={handlePrevious}
                >
                  <ChevronLeft size={24} />
                </Button>
              )}
              <div className={`${isMobile ? 'mobile-carousel-content' : 'flex-grow-1 mx-4 text-start'}`} style={{ maxWidth: '700px' }}>
                <h3 className={`fw-semibold text-dark mb-3 ${isMobile ? 'fs-4' : 'display-6'}`}>
                  {downloads[currentDownload].title}
                </h3>
                <p className={`text-muted lh-lg mb-4 ${isMobile ? 'fs-6' : 'fs-6'}`}>
                  {downloads[currentDownload].description}
                </p>
                <a
                  href={downloads[currentDownload].url}
                  className="btn btn-outline-danger"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download PDF
                </a>
              </div>

              {!isMobile && (
                <Button
                  variant="outline-secondary"
                  className="rounded-circle d-flex align-items-center justify-content-center border-2 flex-shrink-0"
                  style={{ width: '60px', height: '60px' }}
                  onClick={handleNext}
                >
                  <ChevronRight size={24} />
                </Button>
              )}
              {isMobile && (
                <div className="mobile-carousel-buttons">
                  <Button
                    variant="outline-secondary"
                    className="rounded-circle d-flex align-items-center justify-content-center border-2"
                    style={{ width: '50px', height: '50px' }}
                    onClick={handlePrevious}
                  >
                    <ChevronLeft size={20} />
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="rounded-circle d-flex align-items-center justify-content-center border-2"
                    style={{ width: '50px', height: '50px' }}
                    onClick={handleNext}
                  >
                    <ChevronRight size={20} />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DownloadsPage;