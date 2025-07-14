import React from 'react';
import './Background.css';

const Background = () => {
  return (
    <div className="animated-background">
      <div className="particles">
        {[...Array(60)].map((_, i) => (
          <span 
            key={i} 
            className="particle" 
            style={{
              '--rand-x': Math.random(),
              '--rand-y': Math.random()
            }} 
          />
        ))}
      </div>
    </div>
  );
};

export default Background;