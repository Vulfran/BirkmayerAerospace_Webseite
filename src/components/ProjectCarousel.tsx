import React from 'react';
import { Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  title: string;
  subtitle: string;
  description: string;
}

interface ProjectCarouselProps {
  projects: Project[];
  currentProject: number;
  onPrevious: () => void;
  onNext: () => void;
  pageTitle: string;
  isMobile?: boolean;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  projects,
  currentProject,
  onPrevious,
  onNext,
  pageTitle,
  isMobile = false
}) => {
  return (
    <div className="text-center">
      
      <div className="mb-4">
        <span className="text-danger fw-medium fs-5">
          {pageTitle} {currentProject + 1} / {projects.length}
        </span>
      </div>
      <div className={`${isMobile ? 'mobile-carousel-layout' : 'd-flex justify-content-between align-items-start'} mb-4`}>
        {!isMobile && (
          <Button
            variant="outline-secondary"
            className="rounded-circle d-flex align-items-center justify-content-center border-2 flex-shrink-0"
            style={{ width: '60px', height: '60px' }}
            onClick={onPrevious}
          >
            <ChevronLeft size={24} />
          </Button>
        )}
        <div className={`${isMobile ? 'mobile-carousel-content' : 'flex-grow-1 mx-4 text-start'}`} style={{ maxWidth: '700px' }}>
          <h3 className={`fw-semibold text-dark mb-3 ${isMobile ? 'fs-4' : 'display-6'}`}>
            {projects[currentProject].title}
          </h3>
          <h4 className={`text-muted mb-4 ${isMobile ? 'fs-6' : 'fs-5'}`}>
            {projects[currentProject].subtitle}
          </h4>
          <p className={`text-muted lh-lg ${isMobile ? 'fs-6' : 'fs-6'}`}>
            {projects[currentProject].description}
          </p>
        </div>

        {!isMobile && (
          <Button
            variant="outline-secondary"
            className="rounded-circle d-flex align-items-center justify-content-center border-2 flex-shrink-0"
            style={{ width: '60px', height: '60px' }}
            onClick={onNext}
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
              onClick={onPrevious}
            >
              <ChevronLeft size={20} />
            </Button>
            <Button
              variant="outline-secondary"
              className="rounded-circle d-flex align-items-center justify-content-center border-2"
              style={{ width: '50px', height: '50px' }}
              onClick={onNext}
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        )}
      </div>
      {isMobile && (
        <div className="d-flex justify-content-center gap-2 mt-4">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`rounded-circle border-0 ${index === currentProject ? 'bg-danger' : 'bg-secondary opacity-50'
                }`}
              style={{ width: '8px', height: '8px' }}
              onClick={() => { }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCarousel;