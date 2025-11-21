// src/test-env/pages/TestPagesDemo.jsx
// ------------------------------------------------------
// ROOT NAVIGATION WRAPPER FOR TEST ENVIRONMENT
// ------------------------------------------------------

import React, { useState } from "react";

// MAIN PAGES
import DiscoverPage from "./DiscoverPage";
import MatchesPage from "./MatchesPage";
import VentSpacePage from "./VentSpacePage";
import ConnectPage from "./ConnectPage";
import PersonaPage from "./PersonaPage";
import AppSettingsPage from "./AppSettingsPage";

// BOTTOM NAV COMPONENT
import BottomNav from "../components/BottomNav";

const TestPagesDemo = () => {
  const [activePage, setActivePage] = useState("discover");

  const renderPage = () => {
    switch (activePage) {
      case "discover":
        return <DiscoverPage />;
      case "matches":
        return <MatchesPage />;
      case "vent":
        return <VentSpacePage />;
      case "connect":
        return <ConnectPage />;
      case "persona":
        return <PersonaPage />;
      case "settings":
        return <AppSettingsPage />;
      default:
        return <DiscoverPage />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAFAFA]">
      {/* ACTIVE PAGE */}
      {/* NOTE: only non-discover pages get extra bottom padding now */}
      <div className={activePage === "discover" ? "" : "pb-20"}>
        {renderPage()}
      </div>

      {/* BOTTOM NAVIGATION (fixed at bottom inside BottomNav.jsx) */}
      <BottomNav currentPage={activePage} onNavigate={setActivePage} />
    </div>
  );
};

export default TestPagesDemo;