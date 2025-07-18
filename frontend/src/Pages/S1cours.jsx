import React from "react";
import { Link } from "react-router-dom";
import {
  FaLanguage,
  FaLaptopCode,
  FaDatabase,
  FaNetworkWired,
  FaGlobe,
} from "react-icons/fa";

const cardBackgroundGradients = [
  "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", // strong blue
  "linear-gradient(135deg, #0f2027 0%, #203a43 100%)", // deep navy/gray
  "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)", // teal to green
  "linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)", // orange to yellow
  "linear-gradient(135deg, #4568dc 0%, #b06ab3 100%)", // clean blue-purple
  "linear-gradient(135deg, #dd5e89 0%, #f7bb97 100%)", // vibrant rose
  "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)", // sky blue to deep blue
  "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)", // vivid purple
  "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)", // gold/orange
];


const iconMap = {
  Français: <FaLanguage aria-label="Français" />,
  Anglais: <FaLanguage aria-label="Anglais" />,
  "Programmation C++": <FaLaptopCode aria-label="Programmation C++" />,
  "Base de données": <FaDatabase aria-label="Base de données" />,
  "Concepts de base Réseau": <FaNetworkWired aria-label="Réseau" />,
  "Base informatique": <FaLaptopCode aria-label="Base informatique" />,
  "Technologies Web": <FaGlobe aria-label="Web" />,
};

function slugify(text) {
  return text
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+|-+$/g, "");
}

function CourseCard({ course, index }) {
  const icon =
      course.icon ||
      iconMap[course.name] ||
      <span style={styles.initial}>{course.name.charAt(0)}</span>;

  const cardStyle = {
    ...styles.card,
    background: cardBackgroundGradients[index % cardBackgroundGradients.length],
  };

  return (
      <Link to={`/cours/${slugify(course.name)}`} style={{ textDecoration: 'none' }}>
        <div style={cardStyle} className="course-card">
          <div style={styles.avatarWrapper}>
            <div style={styles.avatar}>{icon}</div>
          </div>
          <div style={styles.cardContent}>
            <h3 style={styles.courseTitle}>{course.name}</h3>
            <p style={styles.courseDesc}>Cours de {course.name}</p>
          </div>
        </div>
      </Link>
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
             Cours S1
          </h1>
        </header>
        <Section title="Cours Principaux" courses={mainCourses} />
        <Section title="Autres Cours" courses={secondaryCourses} />
        <style>{`
        body {
          background-color: #f8f9fa;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .course-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .course-card:hover {
          transform: translateY(-10px) scale(1.03);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2) !important;
        }

        /* Media Query for smaller screens */
       @media (max-width: 768px) {
          .course-card {
            min-height: 240px !important;
            padding: 25px 15px !important;
          }
          
          .course-card .avatar {
            width: 60px !important;
            height: 60px !important;
            font-size: 1.8rem !important;
          }
          
          .course-card .course-title {
            font-size: 1.1rem !important;
            margin: 0 0 8px !important;
          }
          
          .course-card .course-desc {
            font-size: 0.85rem !important;
          }
          
          .grid {
            gap: 20px !important;
          }
          
          .container {
            padding: 30px 20px !important;
          }
          
          .title {
            font-size: 2rem !important;
            margin-bottom: 40px !important;
          }

          .section-title {
            font-size: 1.3rem !important;
            margin-bottom: 30px !important;
          }
        }

        /* Mobile devices */
        @media (max-width: 480px) {
          .course-card {
            min-height: 200px !important;
            padding: 20px 15px !important;
            border-radius: 18px !important;
          }
          
          .course-card .avatar {
            width: 50px !important;
            height: 50px !important;
            font-size: 1.5rem !important;
          }
          
          .course-card .course-title {
            font-size: 1rem !important;
          }
          
          .course-card .course-desc {
            font-size: 0.8rem !important;
          }
          
          .grid {
            gap: 15px !important;
          }
          
          .container {
            padding: 20px 15px !important;
          }
          
          .title {
            font-size: 1.8rem !important;
            margin-bottom: 30px !important;
          }

          .section-title {
            font-size: 1.2rem !important;
            margin-bottom: 20px !important;
            padding-bottom: 8px !important;
          }
        }

        /* Very small devices */
        @media (max-width: 360px) {
          .course-card {
            min-height: 180px !important;
          }
          
          .title {
            font-size: 1.6rem !important;
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
    padding: "60px 40px 80px",
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2.8rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: 80,
  },
  section: {
    marginBottom: 80,
  },
  sectionTitle: {
    fontSize: "1.5rem",
    color: "#34495e",
    borderBottom: "2px solid #e0e0e0",
    paddingBottom: 12,
    marginBottom: 50,
    fontWeight: 700,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "80px",
    justifyItems: "center",
  },
  card: {
    position: "relative",
    width: "400px",
    maxWidth: 290,
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
    cursor: "pointer",
  },
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