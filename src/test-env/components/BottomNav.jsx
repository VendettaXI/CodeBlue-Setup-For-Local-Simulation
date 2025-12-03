// BottomNav.jsx — Updated with Connect + Persona
//-------------------------------------------------------
import React from "react";
import { Home, Heart, Wind, Users, User } from "lucide-react";

const COLORS = {
  active: "#0F213A",
  inactive: "rgba(15,33,58,0.45)",
  lavenderTint: "var(--tint-lavender-12)",
};

export default function BottomNav({ currentPage, onNavigate }) {
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
        active={currentPage === "discover"}
        onClick={() => onNavigate("discover")}
      />

      <NavBtn
        icon={<Heart />}
        label="Matches"
        active={currentPage === "matches"}
        onClick={() => onNavigate("matches")}
      />

      <NavBtn
        icon={<Wind />}
        label="Vent"
        active={currentPage === "vent"}
        onClick={() => onNavigate("vent")}
      />

      <NavBtn
        icon={<Users />}
        label="Connect"
        active={currentPage === "connect"}
        onClick={() => onNavigate("connect")}
      />

      <NavBtn
        icon={<User />}
        label="Persona"
        active={currentPage === "persona"}
        onClick={() => onNavigate("persona")}
      />
    </div>
  );
}

function NavBtn({ icon, label, active, onClick }) {
  return (
    <button className="flex items-center justify-center" onClick={onClick}>
      <div
        className={`w-6 h-6 ${
          active ? "text-[#0F213A]" : "text-[rgba(15,33,58,0.45)]"
        }`}
      >
        {React.cloneElement(icon, { className: "w-full h-full" })}
      </div>
    </button>
  );
}