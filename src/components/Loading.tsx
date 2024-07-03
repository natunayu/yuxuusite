import React from 'react';
import '../styles/Loading.css';

export const Loading: React.FC = () => {
  return (
    <div className="loading_background">
      <div className="solar-system">
        <div className="sun"></div>
        <div className="orbit mercury-orbit">
          <div className="planet"></div>
        </div>
        <div className="orbit venus-orbit">
          <div className="planet"></div>
        </div>
        <div className="orbit earth-orbit">
          <div className="planet"></div>
        </div>
      </div>
    </div>
  );
};