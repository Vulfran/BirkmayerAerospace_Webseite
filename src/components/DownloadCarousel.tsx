import React from 'react';
import { Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Download {
  title: string;
  subtitle: string;
  description: string;
}

interface DownloadCarouselProps {
  downloads: Download[];
  currentDownload: number;
  onPrevious: () => void;
  onNext: () => void;
  pageTitle: string;
}

const DownloadCarousel: React.FC<DownloadCarouselProps> = ({
  downloads,
  currentDownload,
  onPrevious,
  onNext,
  pageTitle
}) => {
  return (
    <div className="text-center">
      <div className="mb-4">
        <span className="text-danger fw-medium fs-5">
          {pageTitle} {currentDownload + 1} / {downloads.length}
        </span>
      </div>
      <div className="d-flex justify-content-between align-items-start mb-4">
        <Button 
          variant="outline-secondary" 
          className="rounded-circle d-flex align-items-center justify-content-center border-2"
          style={{ width: '60px', height: '60px' }}
          onClick={onPrevious}
        >
          <ChevronLeft size={24} />
        </Button>
        <div className="flex-grow-1 mx-4 text-start" style={{ maxWidth: '700px' }}>
          <h3 className="display-6 fw-semibold text-dark mb-3">
            {downloads[currentDownload].title}
          </h3>
          <h4 className="fs-5 text-muted mb-4">
            {downloads[currentDownload].subtitle}
          </h4>
          <p className="fs-6 text-muted lh-lg mb-4">
            {downloads[currentDownload].description}
          </p>
          <div>
            <a 
              href="#" 
              className="text-danger fw-medium text-decoration-underline"
              onClick={(e) => e.preventDefault()}
            >
              Download PDF
            </a>
          </div>
        </div>
        <Button 
          variant="outline-secondary" 
          className="rounded-circle d-flex align-items-center justify-content-center border-2"
          style={{ width: '60px', height: '60px' }}
          onClick={onNext}
        >
          <ChevronRight size={24} />
        </Button>
      </div>
    </div>
  );
};

export default DownloadCarousel;