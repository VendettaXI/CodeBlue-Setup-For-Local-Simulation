// BottomNav.jsx — Updated with Connect + Persona
//-------------------------------------------------------
import React from "react";

// Custom SVG icons
const DiscoverIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const MatchesIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const VentIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 2c3.6 0 6.6 2.5 7.5 6c2.4 .8 4 3 4 5.5c0 3.3 -2.7 6 -6 6h-9c-4.4 0 -8 -3.6 -8 -8a8 8 0 0 1 8 -8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ConnectIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="17" cy="17" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 14L10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PersonaIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Support both legacy prop names (currentPage/onNavigate) and new ones (active/onChange)
export default function BottomNav({ currentPage, onNavigate, active, onChange }) {
  const resolvedPage = active ?? currentPage ?? "discover";
  const resolvedNavigate = onChange ?? onNavigate;

  return (
    <div
      className="
        fixed bottom-0 inset-x-0 z-40
        flex justify-around items-center
        h-[64px] bg-white/95 backdrop-blur-md border-t border-slate-200/50
      "
    >
      <NavBtn
        icon={<DiscoverIcon />}
        label="Discover"
        active={resolvedPage === "discover"}
        onClick={() => resolvedNavigate && resolvedNavigate("discover")}
      />

      <NavBtn
        icon={<MatchesIcon />}
        label="Matches"
        active={resolvedPage === "matches"}
        onClick={() => resolvedNavigate && resolvedNavigate("matches")}
      />

      <NavBtn
        icon={<VentIcon />}
        label="Vent"
        active={resolvedPage === "vent"}
        onClick={() => resolvedNavigate && resolvedNavigate("vent")}
      />

      <NavBtn
        icon={<ConnectIcon />}
        label="Connect"
        active={resolvedPage === "connect"}
        onClick={() => resolvedNavigate && resolvedNavigate("connect")}
      />

      <NavBtn
        icon={<PersonaIcon />}
        label="Persona"
        active={resolvedPage === "persona"}
        onClick={() => resolvedNavigate && resolvedNavigate("persona")}
      />
    </div>
  );
}

function NavBtn({ icon, label, active, onClick }) {
  return (
    <button 
      className="flex items-center justify-center transition-transform" 
      onClick={onClick}
      aria-label={label}
      aria-current={active ? "page" : undefined}
    >
      <div
        className={`w-6 h-6 transition-all ${
          active ? "text-[#0F213A] scale-110" : "text-[rgba(15,33,58,0.45)] scale-100"
        }`}
      >
        {React.cloneElement(icon, { className: "w-full h-full" })}
      </div>
    </button>
  );
}