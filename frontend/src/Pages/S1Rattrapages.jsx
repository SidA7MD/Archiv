import React from 'react';

export default function S1Rattrapages() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🔁 Rattrapages</h1>
      <p style={styles.description}>
        Resit exams and make-up sessions will appear here.
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: '64px 32px',
    minHeight: '80vh',
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#f0f2f7',
  },
  title: {
    fontSize: '32px',
    marginBottom: '16px',
    color: '#333',
  },
  description: {
    fontSize: '16px',
    color: '#666',
  },
};
