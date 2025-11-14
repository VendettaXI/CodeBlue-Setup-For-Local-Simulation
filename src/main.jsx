import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CodeBlueDating from "./CodeBlueDating.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { ToastProvider } from "./components/Toast.jsx";
import TestPagesDemo from "./pages/TestPagesDemo.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary fallback="critical" context="App">
      <ToastProvider>
        <Router>
          <Routes>
            {/* Production app (default) */}
            <Route path="/" element={<CodeBlueDating />} />

            {/* Developer test samples */}
            <Route path="/dev" element={<TestPagesDemo />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ToastProvider>
    </ErrorBoundary>
  </StrictMode>
);
