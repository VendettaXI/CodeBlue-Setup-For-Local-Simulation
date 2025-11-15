// src/App.jsx - Test Environment Router
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MatchProfile from "./pages/MatchProfile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home / Discovery */}
        <Route path="/" element={<Home />} />

        {/* Profile Preview Page */}
        <Route path="/profile/:id" element={<MatchProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
