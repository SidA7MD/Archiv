import React from 'react';

export default function S1Compositions() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🧾 Compositions</h1>
      <p style={styles.description}>
        Access your exam results and composition schedules.
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: '64px 32px',
    minHeight: '80vh',
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#f9fafb',
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
