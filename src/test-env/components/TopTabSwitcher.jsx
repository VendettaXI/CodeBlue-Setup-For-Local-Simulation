// TopTabSwitcher.jsx
import React, { useEffect, useState } from "react";

const COLORS = {
  gunmetalActive: "#0F213A",
  gunmetalLight: "rgba(15,33,58,0.08)",
  textInactive: "rgba(15,33,58,0.6)",
  white: "#FFFFFF",
  roseAccent: "#F9738F", // soft rose for Matches
};

export default function TopTabSwitcher({ activeTab, onTabChange }) {
  const [sliderPos, setSliderPos] = useState(
    activeTab === "discover" ? 0 : 1
  );

  useEffect(() => {
    setSliderPos(activeTab === "discover" ? 0 : 1);
  }, [activeTab]);

  const segmentWidth = 104;
  const segmentHeight = 34;

  const sliderBackground =
    activeTab === "discover"
      ? `linear-gradient(135deg, ${COLORS.gunmetalActive}, ${COLORS.gunmetalActive})`
      : `linear-gradient(135deg, ${COLORS.roseAccent}, #FB7185)`; // rose fill for Matches

  const sliderShadow =
    activeTab === "discover"
      ? `0 0 0 1px rgba(15,33,58,0.20), 0 6px 18px rgba(15,33,58,0.35)`
      : `0 0 0 1px rgba(249,113,139,0.30), 0 6px 18px rgba(248,113,133,0.45)`;

  // NOTE: no outer padding/centering wrapper here.
  // Parent decides where to place the tab switcher.
  return (
    <div
      className="relative flex items-center p-1 rounded-full shadow-sm"
      style={{ backgroundColor: COLORS.gunmetalLight }}
    >
      {/* Animated slider */}
      <div
        className="absolute rounded-full transition-transform duration-250 ease-out"
        style={{
          width: segmentWidth,
          height: segmentHeight,
          background: sliderBackground,
          transform: `translateX(${sliderPos * segmentWidth}px)`,
          boxShadow: sliderShadow,
        }}
      />

      {/* Discover tab */}
      <button
        type="button"
        onClick={() => onTabChange("discover")}
        className="relative flex items-center justify-center gap-1.5 rounded-full focus:outline-none"
        style={{
          width: segmentWidth,
          height: segmentHeight,
          color:
            activeTab === "discover" ? COLORS.white : COLORS.textInactive,
          fontWeight: 600,
          fontSize: 14,
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        <span>Discover</span>
        <svg width={24} height={11} viewBox="0 0 24 12">
          <path
            d="M1 6h4l1.4-4 2.4 8 2-6 2 4h8"
            stroke={
              activeTab === "discover" ? COLORS.white : COLORS.textInactive
            }
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </button>

      {/* Matches tab */}
      <button
        type="button"
        onClick={() => onTabChange("matches")}
        className="relative flex items-center justify-center gap-1.5 rounded-full focus:outline-none"
        style={{
          width: segmentWidth,
          height: segmentHeight,
          color:
            activeTab === "matches" ? COLORS.white : COLORS.textInactive,
          fontWeight: 600,
          fontSize: 14,
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        <span>Matches</span>
        <svg width={20} height={12} viewBox="0 0 24 24">
          <path
            d="M12 21s-4-2.6-6.2-5.4C3.1 13.5 3 9.5 6 8c2-1 4 1 4 1s2-2 4-1c3 1.5 2.9 5.5.2 7.6C16 18.4 12 21 12 21z"
            stroke={
              activeTab === "matches" ? COLORS.white : COLORS.textInactive
            }
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </button>
    </div>
  );
}