import React from 'react';

export default function TP() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💻 Travaux Pratiques (TP)</h1>
      <p style={styles.description}>
        Access your hands-on lab sessions and coding practices.
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: '64px 32px',
    minHeight: '80vh',
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#f6f8fb',
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
