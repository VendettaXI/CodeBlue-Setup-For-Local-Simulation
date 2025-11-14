/**
 * ============================================================================
 * HeartbeatIcon Component - PRODUCTION VERSION
 * ============================================================================
 * 
 * Animated heart icon with ECG pulse line for Superlike/Favorite button.
 * Originally from test environment, now integrated into production.
 * 
 * FEATURES:
 * - Heart outline with stroke
 * - Animated ECG pulse line
 * - CSS-based animation (900ms loop)
 * - Customizable size and color
 * 
 * PROPS:
 * @param {number} size - Icon size in pixels (default: 28)
 * @param {string} color - Stroke color (default: gunmetal)
 * 
 * USED IN:
 * - ActionButtons (Favorite/Superlike button)
 * ============================================================================
 */

import React, { useEffect, useState } from 'react';

export default function HeartbeatIcon({ size = 28, color = "rgba(15,33,58,0.90)" }) {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // Restart animation loop
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 900); // Match animation duration

    return () => clearInterval(interval);
  }, []);

  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {/* Heart outline */}
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
        stroke={color}
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* ECG pulse line - animated */}
      <path
        key={animationKey}
        d="M4 12h3l1.8-2.8 2.2 5 1.7-4 1.5 2.5H20"
        stroke={color}
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray="26"
        strokeDashoffset="26"
        style={{
          animation: 'ecgPulse 0.9s ease-in-out forwards'
        }}
      />
      <style>{`
        @keyframes ecgPulse {
          0% { stroke-dashoffset: 26; }
          66% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  );
}
