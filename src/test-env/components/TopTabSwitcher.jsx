// TopTabSwitcher.jsx
import React, { useEffect, useState } from "react";

const COLORS = {
  gunmetalActive: "#0F213A",
  gunmetalLight: "rgba(15,33,58,0.08)",
  textInactive: "rgba(15,33,58,0.6)",
  white: "#FFFFFF",
  lavenderAccent: "#A891CD", // lavender for Matches
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
      : `linear-gradient(135deg, ${COLORS.lavenderAccent}, #B8A0D8)`; // lavender fill for Matches

  const sliderShadow =
    activeTab === "discover"
      ? `0 0 0 1px rgba(15,33,58,0.20), 0 6px 18px rgba(15,33,58,0.35)`
      : `0 0 0 1px rgba(168,145,205,0.30), 0 6px 18px rgba(168,145,205,0.45)`;

  // NOTE: no outer padding/centering wrapper here.
  // Parent decides where to place the tab switcher.
  return (
    <div
      className="relative flex items-center p-1 rounded-full shadow-sm"
      style={{ backgroundColor: "#E9E3F5" }}
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
        className="relative flex items-center justify-center rounded-full focus:outline-none"
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
      </button>

      {/* Matches tab */}
      <button
        type="button"
        onClick={() => onTabChange("matches")}
        className="relative flex items-center justify-center rounded-full focus:outline-none"
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
      </button>
    </div>
  );
}