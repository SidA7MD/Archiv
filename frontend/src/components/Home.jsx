import React from 'react';
import { useNavigate } from 'react-router-dom';

const sections = [
  { 
    id: 'S1', 
    label: 'S1', 
    path: '/s1',
    gradient: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)',
    description: 'Premier Semestre',
    color: '#ff6a00'
  },
  { 
    id: 'S2', 
    label: 'S2', 
    path: '/s2',
    gradient: 'linear-gradient(135deg, #a100ff 0%, #c900ff 100%)',
    description: 'Deuxième Semestre',
    color: '#a100ff'
  },
  { 
    id: 'S3', 
    label: 'S3', 
    path: '/s3',
    gradient: 'linear-gradient(135deg, #3c41c5 0%, #8c52ff 100%)',
    description: 'Troisième Semestre',
    color: '#3c41c5'
  },
  { 
    id: 'S4', 
    label: 'S4', 
    path: '/s4',
    gradient: 'linear-gradient(135deg, #00c896 0%, #00e0d6 100%)',
    description: 'Quatrième Semestre',
    color: '#00c896'
  },
  { 
    id: 'S5', 
    label: 'S5', 
    path: '/s5',
    gradient: 'linear-gradient(135deg, #facc15 0%, #fb923c 100%)',
    description: 'Cinquième Semestre',
    color: '#facc15'
  }
];

const Home = () => {
  const navigate = useNavigate();

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'clamp(1rem, 3vw, 2rem)',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    padding: 'clamp(1rem, 4vw, 2rem)',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const cardStyle = {
    width: 'clamp(280px, 30vw, 320px)',
    height: 'clamp(350px, 40vw, 400px)',
    borderRadius: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    backgroundColor: 'white',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    position: 'relative',
  };

  const curveTopStyle = (gradient) => ({
    height: 'clamp(200px, 25vw, 260px)',
    background: gradient,
    borderBottomLeftRadius: '80% 40%',
    borderBottomRightRadius: '80% 40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 'clamp(1.8rem, 4vw, 2.2rem)',
    fontWeight: '700',
    position: 'relative',
    overflow: 'hidden',
  });

  const decorativeElementStyle1 = {
    position: 'absolute',
    top: '-40px',
    right: '-40px',
    width: 'clamp(80px, 15vw, 120px)',
    height: 'clamp(80px, 15vw, 120px)',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
  };

  const decorativeElementStyle2 = {
    position: 'absolute',
    bottom: '-20px',
    left: '-20px',
    width: 'clamp(60px, 12vw, 80px)',
    height: 'clamp(60px, 12vw, 80px)',
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '50%',
  };

  const labelStyle = {
    fontSize: 'clamp(1.8rem, 4vw, 2.2rem)',
    fontWeight: '700',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    zIndex: 2,
    marginBottom: '8px',
  };

  const descriptionStyle = {
    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
    opacity: 0.9,
    fontWeight: '500',
    zIndex: 2,
  };

  const contentStyle = {
    padding: 'clamp(1rem, 3vw, 1.5rem)',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const buttonStyle = (color) => ({
    background: `linear-gradient(135deg, ${color}15, ${color}08)`,
    border: `1px solid ${color}20`,
    color: color,
    borderRadius: '16px',
    padding: 'clamp(0.7rem, 2vw, 0.8rem) clamp(1.2rem, 3vw, 1.6rem)',
    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    outline: 'none',
    width: '100%',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  });

  const arrowStyle = {
    transition: 'transform 0.3s ease',
    fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
  };

  const handleCardHover = (e, isHovering) => {
    if (isHovering) {
      e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
      e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.12)';
    } else {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
    }
  };

  const handleButtonHover = (e, isHovering, color) => {
    if (isHovering) {
      e.currentTarget.style.background = `linear-gradient(135deg, ${color}25, ${color}15)`;
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = `0 8px 20px ${color}25`;
      e.currentTarget.querySelector('.arrow').style.transform = 'translateX(4px)';
    } else {
      e.currentTarget.style.background = `linear-gradient(135deg, ${color}15, ${color}08)`;
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.querySelector('.arrow').style.transform = 'translateX(0)';
    }
  };

  return (
    <div style={containerStyle}>
      {sections.map((section) => (
        <div 
          key={section.id} 
          style={cardStyle}
          onMouseEnter={(e) => handleCardHover(e, true)}
          onMouseLeave={(e) => handleCardHover(e, false)}
          onClick={() => navigate(section.path)}
        >
          <div style={curveTopStyle(section.gradient)}>
            {/* Decorative Elements */}
            <div style={decorativeElementStyle1}></div>
            <div style={decorativeElementStyle2}></div>
            
            <span style={labelStyle}>{section.label}</span>
            <span style={descriptionStyle}>{section.description}</span>
          </div>
          
          <div style={contentStyle}>
            <button
              style={buttonStyle(section.color)}
              onMouseEnter={(e) => handleButtonHover(e, true, section.color)}
              onMouseLeave={(e) => handleButtonHover(e, false, section.color)}
              onClick={(e) => {
                e.stopPropagation();
                navigate(section.path);
              }}
            >
              Ouvrir 
              <span className="arrow" style={arrowStyle}>→</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;