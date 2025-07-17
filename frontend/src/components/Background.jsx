import React, { useMemo } from 'react';

/**
 * A modern, subtle, and animated background component that renders a
 * serene starfield effect. Easy on the eyes and highly performant.
 */
const ModernBackground = ({ particleCount = 70, style }) => {
  // Generate particle data once and memoize it
  const particles = useMemo(() => {
    const particleArray = [];
    for (let i = 0; i < particleCount; i++) {
      // Give each particle a unique, random style
      particleArray.push({
        id: i,
        // Spread particles across the entire viewport
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        // Vary size for depth
        size: `${Math.random() * 2 + 1}px`,
        // Vary opacity for a twinkling effect
        opacity: Math.random() * 0.5 + 0.2,
        // Vary animation duration and delay for a natural, non-uniform movement
        animationDuration: `${Math.random() * 15 + 20}s`,
        animationDelay: `${Math.random() * 10}s`,
      });
    }
    return particleArray;
  }, [particleCount]);

  return (
    <div style={{ ...styles.background, ...style }}>
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            ...styles.particle,
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            // Add a soft glow to some particles
            boxShadow: Math.random() > 0.7 ? '0 0 6px 2px rgba(255, 255, 255, 0.3)' : 'none',
          }}
        />
      ))}
      {/* Keyframes need to be in a <style> tag in React for CSS-in-JS */}
      <style>
        {`
          @keyframes drift {
            from {
              transform: translate(-20px, -20px);
            }
            to {
              transform: translate(20px, 20px);
            }
          }
        `}
      </style>
    </div>
  );
};

// --- STYLES ---
// Using CSS-in-JS for a self-contained component
const styles = {
  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    zIndex: -1,
    // A deep, soothing gradient that's easy on the eyes
    background: 'linear-gradient(to bottom, #000428, #000)',
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
    background: '#ffffff',
    borderRadius: '50%',
    // The 'drift' animation creates a gentle, slow movement
    animationName: 'drift',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate', // Move back and forth smoothly
  },
};

export default ModernBackground;