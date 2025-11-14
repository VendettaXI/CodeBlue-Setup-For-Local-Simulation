// New ProfileWave component - refined wave/notch separator per latest spec
// Adds live tweak controls via props. All units in SVG coordinate space.
import React from 'react';

export default function ProfileWave({
  width = 390,
  height = 200,
  className = '',
  baselineY = 66,
  troughY = 100,
  rightEndY = 90,
  troughX = 255,
  easingShift = 40,
  declineSharpness = 50,
  declineStartX = 110,
  notchMode = 'none', // 'none' | 'bubble' | 'hybrid'
  notchCenterX = 356,
  notchWidth = 130,
  notchDepth = 60,
  notchSmoothing = 28,
  debugStroke = false,
  premium = true, // enables gradient + subtle stroke polish
}) {
  // Derived helper coordinates
  const plateauStartX = 36; // where we finish initial smoothing (kept for future)
  const plateauEndX = 70;   // end of flat section before wave ramps
  const waveEntryX1 = declineStartX; // explicit control of drop start
  const waveEntryX2 = waveEntryX1 + easingShift; // horizontal spread
  const rightX = width;

  // Map declineSharpness (0-160) to vertical offset for wave control point
  const clampedSharp = Math.max(0, Math.min(160, declineSharpness));
  const basePortion = Math.min(1, clampedSharp / 100); // 0..1
  const extraPortion = Math.max(0, (clampedSharp - 100) / 60); // 0..1 for 100..160
  let declineYOffset = 6 + (basePortion * 10); // 6..16
  declineYOffset += extraPortion * 6; // 16..22
  if (clampedSharp < 20) declineYOffset = 4; // very sharp near zero

  // Build path string dynamically
  let d;
  const applyGradient = premium; // single flag for now

  if (notchMode === 'bubble' || notchMode === 'hybrid') {
    // Calculate notch boundaries
    const notchLeft = notchCenterX - (notchWidth / 2);
    const notchRight = notchCenterX + (notchWidth / 2);
    const notchBottom = baselineY + notchDepth;

    if (notchMode === 'bubble') {
      // Exact U-notch using paired elliptical arcs
      const rx = notchWidth / 2;
      const ry = notchDepth;
      d = [
        `M0 ${baselineY}`,
        `L ${notchLeft} ${baselineY}`,
        `A ${rx} ${ry} 0 0 1 ${notchCenterX} ${notchBottom}`,
        `A ${rx} ${ry} 0 0 1 ${notchRight} ${baselineY}`,
        `L ${rightX} ${baselineY}`,
        `L${rightX} ${height} L0 ${height} Z`
      ].join(' ');
    } else {
      // HYBRID: premium U-notch blended into baseline with mirrored cubic Beziers
      const s = Math.max(6, notchSmoothing);
      const approachStart = Math.max(plateauEndX + 10, notchLeft - s - 40);
      const preX = notchLeft - s;   // start blending into notch
      const postX = notchRight + s; // finish blending out of notch
      const depth = Math.max(8, notchDepth);
      const leftInnerX = Math.max(preX + s * 0.6, notchCenterX - notchWidth * 0.28);
      const rightInnerX = Math.min(postX - s * 0.6, notchCenterX + notchWidth * 0.28);
      const nearBottomY = baselineY + depth * 0.85;

      d = [
        `M0 ${baselineY}`,
        `C 20 ${baselineY} 40 ${baselineY} ${plateauEndX} ${baselineY}`,
        `C ${approachStart} ${baselineY} ${preX - s * 0.4} ${baselineY} ${preX} ${baselineY}`,
        `C ${preX + s * 0.6} ${baselineY} ${leftInnerX - s * 0.4} ${baselineY + depth * 0.35} ${leftInnerX} ${nearBottomY}`,
        `S ${notchCenterX - s * 0.2} ${baselineY + depth} ${notchCenterX} ${baselineY + depth}`,
        `S ${rightInnerX + s * 0.4} ${baselineY + depth * 0.35} ${rightInnerX} ${nearBottomY}`,
        `S ${postX - s * 0.6} ${baselineY} ${postX} ${baselineY}`,
        `S ${rightX - 10} ${baselineY} ${rightX} ${baselineY}`,
        `L${rightX} ${height} L0 ${height} Z`
      ].join(' ');
    }
  } else {
    // Original smooth wave (no notch)
    d = [
      `M0 ${baselineY}`,
      `C 20 ${baselineY} 40 ${baselineY} ${plateauEndX} ${baselineY}`,
      `C ${waveEntryX1} ${baselineY} ${waveEntryX2} ${baselineY + declineYOffset} ${(troughX - 20)} ${(troughY - 6)}`,
      `S ${(troughX + 15)} ${troughY} ${(troughX + 35)} ${(troughY - 4)}`,
      `S ${(troughX + 65)} ${(troughY - 8)} ${(troughX + 95)} ${(troughY - 10)}`,
      `S ${(troughX + 130)} ${rightEndY} ${rightX} ${rightEndY}`,
      `L${rightX} ${height} L0 ${height} Z`
    ].join(' ');
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
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
      <defs>
        {applyGradient && (
          <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#F8F9FB" />
            <stop offset="70%" stopColor="#EEF1F5" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        )}
        {applyGradient && (
          <filter id="innerShadow" x="-10%" y="-10%" width="120%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="rgba(0,0,0,0.06)" />
          </filter>
        )}
      </defs>
      <path d={d} fill={applyGradient ? 'url(#waveGradient)' : '#FFFFFF'} filter={applyGradient ? 'url(#innerShadow)' : undefined} />
      {applyGradient && notchMode !== 'none' && (
        <path d={d} fill="none" stroke="#FFFFFF" strokeOpacity={0.35} strokeWidth={0.8} />
      )}
      {debugStroke && <path d={d} fill="none" stroke="red" strokeWidth={2} />}
    </svg>
  );
}
