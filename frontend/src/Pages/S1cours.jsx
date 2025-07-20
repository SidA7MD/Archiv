import React from "react";
import { Link } from "react-router-dom";
import {
  FaLanguage,
  FaLaptopCode,
  FaDatabase,
  FaNetworkWired,
  FaGlobe,
  FaCalculator,
  FaChartLine,
} from "react-icons/fa";

const premiumGradients = [
  { gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#667eea" }, // Royal Blue-Purple
  { gradient: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)", color: "#ff6b6b" }, // Vibrant Red-Orange
  { gradient: "linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)", color: "#4ecdc4" }, // Teal-Green
  { gradient: "linear-gradient(135deg, #45b7d1 0%, #96c93d 100%)", color: "#45b7d1" }, // Sky Blue-Lime
  { gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", color: "#f093fb" }, // Pink-Coral
  { gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", color: "#4facfe" }, // Electric Blue
  { gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", color: "#43e97b" }, // Emerald-Cyan
  { gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", color: "#fa709a" }, // Rose-Gold
  { gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)", color: "#a8edea" }, // Mint-Pink
];

const iconMap = {
  "Programmation C++": <FaLaptopCode />,
  "Base de données": <FaDatabase />,
  "Concepts de base Réseau": <FaNetworkWired />,
  "Base informatique": <FaLaptopCode />,
  "Technologies Web": <FaGlobe />,
  Algèbre: <FaCalculator />,
  Analyse: <FaChartLine />,
};

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function CourseCard({ course, index }) {
  const icon = course.icon || iconMap[course.name] || course.name.charAt(0).toUpperCase();
  const gradientData = premiumGradients[index % premiumGradients.length];
  const gradient = gradientData.gradient;
  const color = gradientData.color;

  const cardStyle = {
    position: 'relative',
    width: 'clamp(280px, 30vw, 320px)',
    height: 'clamp(350px, 40vw, 400px)',
    background: 'white',
    borderRadius: '24px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const curveTopStyle = {
    height: 'clamp(200px, 25vw, 260px)',
    background: gradient,
    borderBottomLeftRadius: '80% 40%',
    borderBottomRightRadius: '80% 40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
  };

  const decorativeStyle1 = {
    position: 'absolute',
    top: 'clamp(-40px, -8vw, -50px)',
    right: 'clamp(-40px, -8vw, -50px)',
    width: 'clamp(100px, 18vw, 140px)',
    height: 'clamp(100px, 18vw, 140px)',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    animation: 'float 6s ease-in-out infinite',
  };

  const decorativeStyle2 = {
    position: 'absolute',
    bottom: 'clamp(-20px, -4vw, -25px)',
    left: 'clamp(-20px, -4vw, -25px)',
    width: 'clamp(70px, 14vw, 90px)',
    height: 'clamp(70px, 14vw, 90px)',
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '50%',
    animation: 'float 4s ease-in-out infinite reverse',
  };

  const decorativeStyle3 = {
    position: 'absolute',
    top: '50%',
    right: '15%',
    width: 'clamp(30px, 6vw, 50px)',
    height: 'clamp(30px, 6vw, 50px)',
    background: 'rgba(255, 255, 255, 0.06)',
    borderRadius: '50%',
    animation: 'float 5s ease-in-out infinite',
  };

  const iconContainerStyle = {
    width: 'clamp(60px, 12vw, 80px)',
    height: 'clamp(60px, 12vw, 80px)',
    borderRadius: '18px',
    background: 'rgba(255, 255, 255, 0.25)',
    border: '2px solid rgba(255, 255, 255, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    backdropFilter: 'blur(15px)',
    marginBottom: 'clamp(12px, 2vw, 16px)',
    zIndex: 2,
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  };

  const titleStyle = {
    fontSize: 'clamp(1.1rem, 2.8vw, 1.4rem)',
    fontWeight: '700',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    zIndex: 2,
    margin: 0,
    textAlign: 'center',
    lineHeight: '1.2',
    padding: '0 clamp(8px, 2vw, 16px)',
  };

  const contentStyle = {
    padding: 'clamp(16px, 3vw, 20px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'clamp(120px, 14vw, 140px)',
  };

  const buttonStyle = {
    background: `linear-gradient(135deg, ${color}15, ${color}08)`,
    border: `1px solid ${color}20`,
    color: color,
    padding: 'clamp(10px, 2vw, 12px) clamp(16px, 3vw, 20px)',
    borderRadius: '16px',
    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    outline: 'none',
    position: 'relative',
    overflow: 'hidden',
  };

  const handleCardHover = (e, isHovering) => {
    if (isHovering) {
      e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
      e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
    } else {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
    }
  };

  const handleButtonHover = (e, isHovering) => {
    if (isHovering) {
      e.currentTarget.style.background = `linear-gradient(135deg, ${color}25, ${color}15)`;
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = `0 8px 20px ${color}25`;
    } else {
      e.currentTarget.style.background = `linear-gradient(135deg, ${color}15, ${color}08)`;
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => handleCardHover(e, true)}
      onMouseLeave={(e) => handleCardHover(e, false)}
    >
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(180deg); }
          }
          
          @media (max-width: 768px) {
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-4px) rotate(90deg); }
            }
          }
        `}
      </style>
      
      {/* Curved Header */}
      <div style={curveTopStyle}>
        <div style={decorativeStyle1}></div>
        <div style={decorativeStyle2}></div>
        <div style={decorativeStyle3}></div>
        
        <div style={iconContainerStyle}>
          {typeof icon === 'string' ? (
            <span style={{ fontWeight: '700' }}>{icon}</span>
          ) : (
            icon
          )}
        </div>
        
        <h3 style={titleStyle}>{course.name}</h3>
      </div>

      {/* Content */}
      <div style={contentStyle}>        
        <Link to={`/cours/${slugify(course.name)}`} style={{ textDecoration: 'none', width: '100%' }}>
          <button
            style={buttonStyle}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
          >
            Ouvrir
            <span style={{ fontSize: '12px', opacity: 0.8 }}>→</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

function Section({ title, courses, icon }) {
  const sectionStyle = {
    marginBottom: 'clamp(60px, 10vw, 80px)',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: 'clamp(40px, 8vw, 60px)',
  };

  const titleStyle = {
    fontSize: 'clamp(1.8rem, 5vw, 2.4rem)',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'clamp(12px, 3vw, 20px)',
    lineHeight: '1.1',
  };

  const gridStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'clamp(20px, 4vw, 32px)',
    justifyContent: 'center',
    alignItems: 'flex-start',
  };

  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>
          <span style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>{icon}</span>
          {title}
        </h2>
      </div>
      <div style={gridStyle}>
        {courses.map((course, i) => (
          <CourseCard course={course} index={i} key={course.name} />
        ))}
      </div>
    </section>
  );
}

export default function CoursS1() {
  const mainCourses = [
    { name: "Algèbre", icon: <FaCalculator /> },
    { name: "Analyse", icon: <FaChartLine /> },
    { name: "Programmation C++", icon: <FaLaptopCode /> },
    { name: "Base de données", icon: <FaDatabase /> },
  ];

  const secondaryCourses = [
    { name: "Concepts de base Réseau", icon: <FaNetworkWired /> },
    { name: "Base informatique", icon: <FaLaptopCode /> },
    { name: "Technologies Web", icon: <FaGlobe /> },
  ];

  const containerStyle = {
    maxWidth: '1600px',
    margin: '0 auto',
    padding: 'clamp(40px, 8vw, 80px) clamp(20px, 4vw, 40px)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    minHeight: '100vh',
  };

  return (
    <main style={containerStyle}>      
      <Section 
        title="Cours Principaux" 
        courses={mainCourses} 
        icon="📚"
      />
      
      <Section 
        title="Autres Cours" 
        courses={secondaryCourses} 
        icon="💻"
      />
    </main>
  );
}