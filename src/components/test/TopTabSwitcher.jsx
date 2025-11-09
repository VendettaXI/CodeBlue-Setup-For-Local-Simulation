// Test component - Pill-style tab switcher with animated slider
import React, { useEffect, useState } from 'react';

const COLORS = {
  gunmetalActive: "#0F213A",
  gunmetalLight: "rgba(15,33,58,0.08)",
  textInactive: "rgba(15,33,58,0.6)",
  white: "#FFFFFF",
};

/**
 * TopTabSwitcher - Animated pill tab switcher
 * Converted from React Native Reanimated to CSS transitions
 */
export default function TopTabSwitcher({ activeTab, onTabChange }) {
  const [sliderPos, setSliderPos] = useState(activeTab === "discover" ? 0 : 1);

  useEffect(() => {
    setSliderPos(activeTab === "discover" ? 0 : 1);
  }, [activeTab]);

  return (
    <div className="pt-2 pb-3 flex justify-center">
      <div
        className="relative flex items-center p-1 rounded-full"
        style={{ backgroundColor: COLORS.gunmetalLight }}
      >
        {/* Animated slider background */}
        <div
          className="absolute rounded-full transition-transform duration-300 ease-out"
          style={{
            width: 120,
            height: 40,
            backgroundColor: COLORS.gunmetalActive,
            transform: `translateX(${sliderPos * 120}px)`,
          }}
        />

        {/* Discover Tab */}
        <button
          onClick={() => onTabChange("discover")}
          className="relative flex items-center justify-center gap-1.5 rounded-full"
          style={{
            width: 120,
            height: 40,
            color: activeTab === "discover" ? COLORS.white : COLORS.textInactive,
            fontWeight: 600,
            fontSize: 15,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          <span>Discover</span>
          {/* ECG icon */}
          <svg width={26} height={12} viewBox="0 0 24 12">
            <path
              d="M1 6h4l1.5-4 2.5 8 2-6 2 4h8"
              stroke={activeTab === "discover" ? COLORS.white : COLORS.textInactive}
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>

        {/* Matches Tab */}
        <button
          onClick={() => onTabChange("matches")}
          className="relative flex items-center justify-center gap-1.5 rounded-full"
          style={{
            width: 120,
            height: 40,
            color: activeTab === "matches" ? COLORS.white : COLORS.textInactive,
            fontWeight: 600,
            fontSize: 15,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          <span>Matches</span>
          {/* Heart icon */}
          <svg width={22} height={12} viewBox="0 0 24 24">
            <path
              d="M12 21s-4-2.6-6.2-5.4C3.1 13.5 3 9.5 6 8c2-1 4 1 4 1s2-2 4-1c3 1.5 2.9 5.5.2 7.6C16 18.4 12 21 12 21z"
              stroke={activeTab === "matches" ? COLORS.white : COLORS.textInactive}
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
