import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../components/Home.module.css';

const sections = [
  { id: 'S1', colorClass: styles.s1, label: 'S1', path: '/s1' },
  { id: 'S2', colorClass: styles.s2, label: 'S2', path: '/s2' },
  { id: 'S3', colorClass: styles.s3, label: 'S3', path: '/s3' },
  { id: 'S4', colorClass: styles.s4, label: 'S4', path: '/s4' },
  { id: 'S5', colorClass: styles.s5, label: 'S5', path: '/s5' }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {sections.map((section) => (
        <div key={section.id} className={styles.card}>
          <div className={`${styles.curveTop} ${section.colorClass}`}>
            <span className={styles.label}>{section.label}</span>
          </div>
          <div className={styles.content}>
            <button
              className={styles.button}
              onClick={() => navigate(section.path)}
            >
              Ouvrir <span className={styles.arrow}>➜</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
