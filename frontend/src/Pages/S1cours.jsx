import React from 'react';
import {
  FaLanguage,
  FaLaptopCode,
  FaDatabase,
  FaNetworkWired,
  FaGlobe,
} from 'react-icons/fa';

const CoursS1 = () => {
  const mainCourses = [
    { name: 'Français', icon: <FaLanguage /> },
    { name: 'Anglais', icon: <FaLanguage /> },
    { name: 'Algèbre', icon: null },
    { name: 'Analyse', icon: null },
    { name: 'Programmation C++', icon: <FaLaptopCode /> },
    { name: 'Base de données', icon: <FaDatabase /> },
  ];

  const secondaryCourses = [
    { name: 'Concepts de base Réseau', icon: <FaNetworkWired /> },
    { name: 'Base informatique', icon: <FaLaptopCode /> },
    { name: 'Technologies Web', icon: <FaGlobe /> },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📚 Cours S1</h1>

      <Section title="Cours Principaux" courses={mainCourses} />
      <Section title="Autres Cours" courses={secondaryCourses} />
    </div>
  );
};

const Section = ({ title, courses }) => (
  <div style={styles.section}>
    <h2 style={styles.sectionTitle}>{title}</h2>
    <div style={styles.grid}>
      {courses.map((course, index) => (
        <CourseCard key={index} course={course} index={index} />
      ))}
    </div>
  </div>
);

const CourseCard = ({ course, index }) => {
  const gradients = [
    'linear-gradient(135deg, #667eea, #764ba2)',
    'linear-gradient(135deg, #a18cd1, #fbc2eb)',
    'linear-gradient(135deg, #f6d365, #fda085)',
    'linear-gradient(135deg, #84fab0, #8fd3f4)',
    'linear-gradient(135deg, #fccb90, #d57eeb)',
    'linear-gradient(135deg, #f093fb, #f5576c)',
    'linear-gradient(135deg, #4facfe, #00f2fe)',
    'linear-gradient(135deg, #43e97b, #38f9d7)',
    'linear-gradient(135deg, #ff9a9e, #fad0c4)',
  ];
  const background = gradients[index % gradients.length];

  return (
    <div
      style={{
        ...styles.card,
        background,
      }}
    >
      <div style={styles.iconWrap}>
        {course.icon ? (
          course.icon
        ) : (
          <span style={styles.initial}>{course.name.charAt(0)}</span>
        )}
      </div>
      <h3 style={styles.courseTitle}>{course.name}</h3>
      <p style={styles.courseDesc}>Cours de {course.name}</p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: `'Segoe UI', sans-serif`,
  },
  title: {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2d3748',
    marginBottom: '40px',
  },
  section: {
    marginBottom: '60px',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    color: '#4a5568',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '10px',
    marginBottom: '25px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '20px',
  },
  card: {
    borderRadius: '20px',
    padding: '24px',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
    cursor: 'pointer',
  },
  iconWrap: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.8rem',
    marginBottom: '16px',
  },
  initial: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#fff',
  },
  courseTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '6px',
  },
  courseDesc: {
    fontSize: '0.9rem',
    opacity: 0.9,
  },
};

export default CoursS1;
