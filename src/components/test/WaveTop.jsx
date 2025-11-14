// Test component - Wave transition overlay for hero card bottom
import React from 'react';

/**
 * WaveTop - Smooth wave transition from hero image to white info card
 * Uses exact SVG path from design mockup
 */
export default function WaveTop({ className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 390 200" 
      preserveAspectRatio="none"
      className={className}
      style={{ 
        display: 'block',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '200px',
        zIndex: 10
      }}
    >
      {/* White card area below the wave */}
      <path
        d="M0,90
           C 80,55 160,55 245,75
           S 345,105 390,90
           L390,200 L0,200 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}
