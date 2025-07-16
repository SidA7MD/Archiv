import React from 'react';

export default function S1TD() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📂 Travaux Dirigés (TD)</h1>
      <p style={styles.description}>
        Browse directed work exercises and resources.
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: '64px 32px',
    minHeight: '80vh',
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#fff',
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
