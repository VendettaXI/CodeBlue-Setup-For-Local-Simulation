// Test component - Wave transition for hero card
import React from 'react';

const CARD_COLOR = "#FFFFFF";

/**
 * WaveTop - SVG wave with ECG-style trim on left and deeper right-weighted depression
 * Converted from React Native to React web
 */
export default function WaveTop({ width = "100%", height = 40, className = "" }) {
  return (
    <svg 
      viewBox="0 0 390 120" 
      width={width} 
      height={height} 
      preserveAspectRatio="none"
      className={className}
      style={{ display: 'block' }}
    >
      <path
        d="
          M0,120 
          L0,40 
          L26,40 
          L34,26 
          L44,46 
          L54,32 
          L64,46 
          L74,36 
          L84,40 
          C120,32 150,34 180,36 
          C215,38 245,42 270,38 
          C310,32 340,32 390,40 
          L390,120 Z
        "
        fill={CARD_COLOR}
      />
    </svg>
  );
}
