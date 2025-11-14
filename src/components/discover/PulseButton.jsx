/**
 * ============================================================================
 * PulseButton Component - PRODUCTION VERSION
 * ============================================================================
 * 
 * Animated button with expanding pulse ring effect for Favorite action.
 * Originally from test environment, now integrated into production.
 * 
 * FEATURES:
 * - Expanding ring animation on press
 * - Scale bounce effect on icon
 * - CSS-based animations (300ms duration)
 * - Semi-transparent white background
 * 
 * PROPS:
 * @param {function} onPress - Callback when button is pressed
 * @param {ReactNode} children - Icon or content to display inside button
 * 
 * USED IN:
 * - ActionButtons (wraps HeartbeatIcon for Favorite button)
 * ============================================================================
 */

import React, { useState } from 'react';

export default function PulseButton({ onPress, children }) {
  const [isPulsing, setIsPulsing] = useState(false);

  const handlePress = () => {
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 300);
    onPress && onPress();
  };

  return (
    <button
      onClick={handlePress}
      className="relative"
      style={{
        width: 48,
        height: 48,
        borderRadius: 14,
        border: '1px solid rgba(15,33,58,0.10)',
        backgroundColor: 'rgba(255,255,255,0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      {/* Pulse ring */}
      <div
        className={`absolute inset-0 rounded-full border-2 border-[rgba(15,33,58,0.18)] pointer-events-none ${
          isPulsing ? 'animate-pulse-ring' : 'opacity-0'
        }`}
        style={{ width: 48, height: 48 }}
      />
      
      {/* Icon with scale animation */}
      <div className={isPulsing ? 'animate-scale-bounce' : ''}>
        {children}
      </div>

      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.01); opacity: 0.35; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes scale-bounce {
          0% { transform: scale(1); }
          50% { transform: scale(1.12); }
          100% { transform: scale(1); }
        }
        .animate-pulse-ring {
          animation: pulse-ring 300ms ease-out;
        }
        .animate-scale-bounce {
          animation: scale-bounce 260ms ease-out;
        }
      `}</style>
    </button>
  );
}
