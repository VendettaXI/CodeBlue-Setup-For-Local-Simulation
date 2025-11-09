// Test component - Wave transition for hero card
import React from 'react';

const CARD_COLOR = "#FFFFFF";
const LINE_COLOR = "rgba(15,33,58,0.28)"; // subtle gunmetal line

/**
 * WaveTop - SVG wave with ECG-style trim on left and deeper right-weighted depression
 * Converted from React Native to React web
 */
// Props allow quick tuning during design iteration
export default function WaveTop({
  width = "100%",
  height = 40,
  className = "",
  spikeHeight = 10, // ECG spike amplitude (px in viewBox units)
  dipDepth = 24,   // Right-side dip depth
  lineColor = LINE_COLOR,
  fillColor = CARD_COLOR,
} ) {
  return (
    <svg 
      viewBox="0 0 390 120" 
      width={width} 
      height={height} 
      preserveAspectRatio="none"
      className={className}
      style={{ display: 'block' }}
    >
      {/**
       * Geometry notes (viewBox 390x120):
       * - Baseline around y=40
       * - ECG: small pre-baseline, quick up (spike), sharp down, recover
       * - Smooth shoulder into long shallow wave
       * - Deeper right-side dip (baseline + dipDepth)
       */}

      {/* Filled body under the custom top edge */}
      <path
        d={`
          M0,120
          L0,40
          L22,40
          L28,${40 - spikeHeight}
          L36,40
          L44,${40 + Math.max(spikeHeight - 4, 4)}
          L52,40
          C 80,38 106,38 134,39
          C 168,40 196,42 226,40
          C 258,38 286,36 312,38
          C 332,39 352,42 ${390 - 32},${40 + dipDepth}
          C ${390 - 16},${40 + dipDepth + 2} 382,${40 + dipDepth} 390,${40 + dipDepth - 2}
          L390,120 Z
        `}
        fill={fillColor}
      />

      {/* Thin edge stroke overlay to match design screenshot */}
      <path
        d={`
          M0,40
          L22,40
          L28,${40 - spikeHeight}
          L36,40
          L44,${40 + Math.max(spikeHeight - 4, 4)}
          L52,40
          C 80,38 106,38 134,39
          C 168,40 196,42 226,40
          C 258,38 286,36 312,38
          C 332,39 352,42 ${390 - 32},${40 + dipDepth}
          C ${390 - 16},${40 + dipDepth + 2} 382,${40 + dipDepth} 390,${40 + dipDepth - 2}
        `}
        fill="none"
        stroke={lineColor}
        strokeWidth={1.2}
      />

      {/* Soft shadow below the edge for depth on dark backgrounds */}
      <path
        d={`
          M0,41
          L22,41
          L28,${41 - spikeHeight}
          L36,41
          L44,${41 + Math.max(spikeHeight - 4, 4)}
          L52,41
          C 80,39 106,39 134,40
          C 168,41 196,43 226,41
          C 258,39 286,37 312,39
          C 332,40 352,43 ${390 - 32},${41 + dipDepth}
          C ${390 - 16},${41 + dipDepth + 2} 382,${41 + dipDepth} 390,${41 + dipDepth - 2}
        `}
        fill="none"
        stroke="rgba(15,33,58,0.10)"
        strokeWidth={2}
      />
    </svg>
  );
}
