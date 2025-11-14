// LEGACY WaveTop component preserved for reference
// Previous implementation of wave separator before new ProfileWave redesign
import React from 'react';

export default function WaveTopLegacy({ className = "" }) {
  return (
    <svg 
      viewBox="0 0 390 200" 
      width="100%" 
      height="200"
      preserveAspectRatio="none"
      className={className}
      style={{ 
        display: 'block',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
      }}
    >
      <path
        d="M0,90 C 80,55 160,55 245,75 S 345,105 390,90 L390,200 L0,200 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}
