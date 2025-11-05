import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import CodeBlueDating from "./CodeBlueDating.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { ToastProvider } from "./components/Toast.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary fallback="critical" context="App">
      <ToastProvider>
        <CodeBlueDating />
      </ToastProvider>
    </ErrorBoundary>
  </StrictMode>
);
