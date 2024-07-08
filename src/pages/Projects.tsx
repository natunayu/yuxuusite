import React, { useState } from 'react';
import '../styles/Projects.css';
import Apps from './projects_pages/Apps';
import Arts from './projects_pages/Arts';
import Services from './projects_pages/Services';

const projects = [
  { id: 'apps', title: 'Apps', image: '/projects/Apps.png' },
  { id: 'services', title: 'Services', image: '/projects/Services.png' },
  { id: 'arts', title: 'Arts', image: '/projects/Arts.png' },
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleProjectClick = (id: string) => {
    setSelectedProject(id);
  };

  const handleBackClick = () => {
    setSelectedProject(null);
  };

  const renderProjectComponent = () => {
    switch (selectedProject) {
      case 'apps':
        return <Apps />;
      case 'services':
        return <Services />;
      case 'arts':
        return <Arts />;
      default:
        return null;
    }
  };

  return (
    <div className="project_container">
      {!selectedProject ? (
        <>
          <h1>My Projects</h1>
          <div className="gallery">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project.id)}
                className="project-item"
              >
                <img src={project.image} alt={project.title} className="project-image" />
                <div className="project-title">{project.title}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="project-details">
          <button className="back-button" onClick={handleBackClick}>Back to Projects</button>
          {renderProjectComponent()}
        </div>
      )}
    </div>
  );
};

export default Projects;
