// src/components/SnapshotPill.jsx
import React from "react";

const SnapshotIcon = ({ kind }) => {
  switch (kind) {
    case "verified":
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3 6.5 5.2v5.7c0 4.1 2.3 7.1 5.5 8.1 3.2-1 5.5-4 5.5-8.1V5.2L12 3z" />
          <path d="m9.5 12 1.6 1.7 3.4-3.4" />
        </svg>
      );
    case "shift":
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 12.5A7.5 7.5 0 0 1 11.5 4 6 6 0 1 0 20 12.5z" />
        </svg>
      );
    case "match":
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 2 6 13h4l-1 9 7-11h-4z" />
        </svg>
      );
    case "mood":
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="8" />
          <path d="M9 10h.01M15 10h.01" />
          <path d="M8.5 14.5c1 .8 2.1 1.2 3.5 1.2s2.5-.4 3.5-1.2" />
        </svg>
      );
    case "intent":
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11.5 20s-3.3-2.2-5.1-4.5C4.3 13.5 4.2 10.4 6.5 9c1.4-.9 3.1-.3 4 1 .9-1.3 2.6-1.9 4-1 2.3 1.4 2.2 4.5.1 6.5-1.8 2.3-5.1 4.5-5.1 4.5z" />
        </svg>
      );
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 21s-4-2.6-6.2-5.4C3.1 13.5 3 9.5 6 8c2-1 4 1 4 1s2-2 4-1c3 1.5 2.9 5.5.2 7.6C16 18.4 12 21 12 21z" />
        </svg>
      );
  }
};

const SnapshotPill = ({ kind, label }) => (
  <div className="inline-flex items-center rounded-full bg-slate-100 pr-3 pl-1 py-1">
    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0F213A] text-white shadow-[0_3px_10px_rgba(15,33,58,0.45)] mr-1.5">
      <SnapshotIcon kind={kind} />
    </div>
    <span className="text-[11px] text-slate-800 whitespace-nowrap">
      {label}
    </span>
  </div>
);

export default SnapshotPill;