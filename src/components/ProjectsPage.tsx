import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProjectCarousel from './ProjectCarousel';

interface Project {
  title: string;
  subtitle: string;
  description: string;
}

interface ProjectsPageProps {
  projects: Project[];
  currentProject: number;
  setCurrentProject: (index: number) => void;
  pageTitle: string;
  isMobile?: boolean;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({
  projects,
  currentProject,
  setCurrentProject,
  pageTitle,
  isMobile = false
}) => {
  const handlePrevious = () => {
    setCurrentProject(currentProject > 0 ? currentProject - 1 : projects.length - 1);
  };

  const handleNext = () => {
    setCurrentProject(currentProject < projects.length - 1 ? currentProject + 1 : 0);
  };

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col className="d-flex align-items-center justify-content-center">
          <div className="p-4" style={{ maxWidth: '1000px', width: '100%' }}>
            <ProjectCarousel
              projects={projects}
              currentProject={currentProject}
              onPrevious={handlePrevious}
              onNext={handleNext}
              pageTitle={pageTitle}
              isMobile={isMobile}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectsPage;