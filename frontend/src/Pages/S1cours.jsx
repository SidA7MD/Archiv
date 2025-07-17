import React from "react";
import {
  FaLanguage,
  FaLaptopCode,
  FaDatabase,
  FaNetworkWired,
  FaGlobe,
} from "react-icons/fa";

// Unique, vibrant gradients for each card's background
const cardBackgroundGradients = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
  "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
  "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  "linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
];

// Map course names to icons for fallback
const iconMap = {
  Français: <FaLanguage aria-label="Français" />,
  Anglais: <FaLanguage aria-label="Anglais" />,
  "Programmation C++": <FaLaptopCode aria-label="Programmation C++" />,
  "Base de données": <FaDatabase aria-label="Base de données" />,
  "Concepts de base Réseau": <FaNetworkWired aria-label="Réseau" />,
  "Base informatique": <FaLaptopCode aria-label="Base informatique" />,
  "Technologies Web": <FaGlobe aria-label="Web" />,
};

function CourseCard({ course, index }) {
  const icon =
    course.icon ||
    iconMap[course.name] ||
    <span style={styles.initial}>{course.name.charAt(0)}</span>;

  // Apply a unique gradient to each card
  const cardStyle = {
    ...styles.card,
    background: cardBackgroundGradients[index % cardBackgroundGradients.length],
  };

  return (
    <div style={cardStyle} className="course-card">
      <div style={styles.cardMenu}>
        <span style={styles.backArrow} aria-label="back" tabIndex={0}>←</span>
        <span style={styles.menuDots} aria-label="menu" tabIndex={0}>⋮</span>
      </div>
      <div style={styles.avatarWrapper}>
        <div style={styles.avatar}>{icon}</div>
      </div>
      <div style={styles.cardContent}>
        <h3 style={styles.courseTitle}>{course.name}</h3>
        <p style={styles.courseDesc}>Cours de {course.name}</p>
      </div>
    </div>
  );
}

function Section({ title, courses }) {
  return (
    <section
      aria-labelledby={title.replace(/\s+/g, "-").toLowerCase()}
      style={styles.section}
    >
      <h2
        id={title.replace(/\s+/g, "-").toLowerCase()}
        style={styles.sectionTitle}
      >
        {title}
      </h2>
      <div style={styles.grid}>
        {courses.map((course, i) => (
          <CourseCard course={course} index={i} key={course.name} />
        ))}
      </div>
    </section>
  );
}

export default function CoursS1() {
  const mainCourses = [
    { name: "Français", icon: <FaLanguage /> },
    { name: "Anglais", icon: <FaLanguage /> },
    { name: "Algèbre" },
    { name: "Analyse" },
    { name: "Programmation C++", icon: <FaLaptopCode /> },
    { name: "Base de données", icon: <FaDatabase /> },
  ];

  const secondaryCourses = [
    { name: "Concepts de base Réseau", icon: <FaNetworkWired /> },
    { name: "Base informatique", icon: <FaLaptopCode /> },
    { name: "Technologies Web", icon: <FaGlobe /> },
  ];

  return (
    <main style={styles.container}>
      <header>
        <h1 style={styles.title} aria-label="Cours S1">
          📚 Cours S1
        </h1>
      </header>
      <Section title="Cours Principaux" courses={mainCourses} />
      <Section title="Autres Cours" courses={secondaryCourses} />
      <style>{`
        body {
          background-color: #f8f9fa;
        }
        .course-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .course-card:hover {
          transform: translateY(-12px) scale(1.04);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </main>
  );
}

const styles = {
  container: {
    maxWidth: 1400,
    margin: "0 auto",
    padding: "60px 40px 80px", // Increased vertical padding
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
    // background: "#f8f9fa",
    minHeight: "100vh",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: 80, // Increased margin
  },
  section: {
    marginBottom: 80, // Increased margin
  },
  sectionTitle: {
    fontSize: "1.6rem",
    color: "#34495e",
    borderBottom: "2px solid #e0e0e0",
    paddingBottom: 15,
    marginBottom: 50, // Increased margin
    fontWeight: 700,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: "60px", // LOTS OF GAP
    justifyItems: "center",
  },
  // CARD
  card: {
    position: "relative",
    width: "100%",
    maxWidth: 350,
    minHeight: 400,
    color: "#fff",
    borderRadius: 28,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
    padding: "50px 20px",
    // marginleft: "auto",
    // marginRight: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    overflow: "hidden",
  },
  cardMenu: {
    position: "absolute",
    top: 25,
    left: 25,
    right: 25,
    display: "flex",
    justifyContent: "space-between",
    fontSize: "1.3rem",
    color: "rgba(255, 255, 255, 0.8)",
  },
  backArrow: { cursor: "pointer", userSelect: "none" },
  menuDots: { cursor: "pointer", userSelect: "none", fontWeight: "bold" },
  avatarWrapper: {
    marginBottom: 35, // Increased margin
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.25)",
    border: "2px solid rgba(255, 255, 255, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3rem",
    backdropFilter: "blur(5px)",
  },
  initial: {
    fontWeight: 700,
    fontSize: "2.8rem",
  },
  cardContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  courseTitle: {
    fontSize: "1.7rem",
    fontWeight: 700,
    margin: "0 0 12px",
    textShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
  },
  courseDesc: {
    fontSize: "1.05rem",
    fontWeight: 400,
    opacity: 0.9,
    lineHeight: 1.6,
    textShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
  },
};