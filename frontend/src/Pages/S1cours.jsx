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
          transform: translateY(-10px) scale(1.03);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }

        /* Media Query for smaller screens */
        @media (max-width: 768px) {
          .course-card {
            min-height: 280px !important;
            max-width: 90% !important; /* Allow card to be more fluid */
            padding: 25px 15px !important;
          }
          .course-card .avatar {
            width: 70px !important;
            height: 70px !important;
            font-size: 2rem !important;
          }
          .course-card .course-title {
            font-size: 1.2rem !important;
          }
          .course-card .course-desc {
            font-size: 0.9rem !important;
          }
          .grid {
            grid-template-columns: 1fr !important; /* Single column on mobile */
            gap: 30px !important;
          }
          .container {
             padding: 40px 20px !important;
          }
           .title {
            font-size: 2.5rem !important;
            margin-bottom: 60px !important;
          }
        }
      `}</style>
      </main>
  );
}

const styles = {
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "60px 40px 80px", // Increased container padding
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2.8rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: 80, // Increased margin
  },
  section: {
    marginBottom: 80, // Increased margin
  },
  sectionTitle: {
    fontSize: "1.5rem",
    color: "#34495e",
    borderBottom: "2px solid #e0e0e0",
    paddingBottom: 12,
    marginBottom: 50, // Increased margin
    fontWeight: 700,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "80px", // Increased gap between cards
    justifyItems: "center",
  },
  // CARD
  card: {
    position: "relative",
    width: "100%",
    maxWidth: 290, // Slightly increased max-width for balance
    minHeight: 320,
    color: "#fff",
    borderRadius: 24,
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    overflow: "hidden",
  },
  cardMenu: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    display: "flex",
    justifyContent: "space-between",
    fontSize: "1.2rem",
    color: "rgba(255, 255, 255, 0.8)",
  },
  backArrow: { cursor: "pointer", userSelect: "none" },
  menuDots: { cursor: "pointer", userSelect: "none", fontWeight: "bold" },
  avatarWrapper: {
    marginBottom: 25,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.25)",
    border: "2px solid rgba(255, 255, 255, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.5rem",
    backdropFilter: "blur(5px)",
  },
  initial: {
    fontWeight: 700,
    fontSize: "2.3rem",
  },
  cardContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  courseTitle: {
    fontSize: "1.4rem",
    fontWeight: 700,
    margin: "0 0 10px",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
  },
  courseDesc: {
    fontSize: "0.95rem",
    fontWeight: 400,
    opacity: 0.9,
    lineHeight: 1.5,
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
  },
};