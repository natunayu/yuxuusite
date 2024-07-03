import React from 'react';
import '../styles/Profile.css';
import '../styles/Midnight.css'

const About: React.FC = () => {

  return (
    <div className="page-container">
      
      <div className="page-content">
      <h1>About me</h1>
        <div className="intro-box">
          <img src="path/to/photo.jpg" alt="Profile Photo" className="profile-photo" />
          <div className="intro-text">
            <p>うおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおおお</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
