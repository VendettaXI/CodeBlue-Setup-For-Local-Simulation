// BottomNav.jsx — Updated with Connect + Persona
//-------------------------------------------------------
import React from "react";
import { Home, Heart, Wind, Users, User } from "lucide-react";

// Support both legacy prop names (currentPage/onNavigate) and new ones (active/onChange)
export default function BottomNav({ currentPage, onNavigate, active, onChange }) {
  const resolvedPage = active ?? currentPage ?? "discover";
  const resolvedNavigate = onChange ?? onNavigate;

  return (
    <div
      className="
        fixed bottom-0 inset-x-0 
        flex justify-around items-center
        h-[64px]
      "
    >
      <NavBtn
        icon={<Home />}
        label="Discover"
        active={resolvedPage === "discover"}
        onClick={() => resolvedNavigate && resolvedNavigate("discover")}
      />

      <NavBtn
        icon={<Heart />}
        label="Matches"
        active={resolvedPage === "matches"}
        onClick={() => resolvedNavigate && resolvedNavigate("matches")}
      />

      <NavBtn
        icon={<Wind />}
        label="Vent"
        active={resolvedPage === "vent"}
        onClick={() => resolvedNavigate && resolvedNavigate("vent")}
      />

      <NavBtn
        icon={<Users />}
        label="Connect"
        active={resolvedPage === "connect"}
        onClick={() => resolvedNavigate && resolvedNavigate("connect")}
      />

      <NavBtn
        icon={<User />}
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