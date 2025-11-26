// src/test-env/pages/App.jsx
import React, { useState } from "react";

import DiscoverPage from "./DiscoverPage";
import MatchesPage from "./MatchesPage";
import VentSpace from "./VentSpacePage";
import ConnectPage from "./ConnectPage";

import BottomNav from "../components/BottomNav";

export default function App() {
  const [activeRoot, setActiveRoot] = useState("discover");

  const renderScreen = () => {
    switch (activeRoot) {
      case "discover":
        return <DiscoverPage />;
      case "matches":
        return <MatchesPage />;
      case "vent":
        return <VentSpace />;
      case "connect":
        return <ConnectPage />;
      default:
        return <DiscoverPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Main dynamic area */}
      <div className="flex-1 overflow-y-auto">
        {renderScreen()}
      </div>

      {/* Bottom navigation */}
      <BottomNav active={activeRoot} onChange={setActiveRoot} />
    </div>
  );
}