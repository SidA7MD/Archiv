import React from 'react';

export default function S1devoirs() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 Devoirs</h1>
      <p style={styles.description}>
        View and submit your assignments here.
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: '64px 32px',
    minHeight: '80vh',
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#fefefe',
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
