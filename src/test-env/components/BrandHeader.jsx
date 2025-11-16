// src/components/BrandHeader.jsx
import React from "react";

const BrandHeader = () => {
  return (
    <div className="px-4 pt-4 pb-1 flex items-center gap-3">
      <div className="shrink-0">
        <svg
          className="w-7 h-7"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0F213A"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* HEART OUTLINE */}
          <path
            d="
              M12 20.4
              c-3.7-3 -6.3-5.4 -8-7.6 
              C2 10.7 1.7 8.1 3.4 6.3
              c1.7-1.7 4.5-1.9 6.3 -0.4
              c0.8 0.7 1.6 1.6 2.1 2.4
              c0.5 -0.8 1.3 -1.7 2.1 -2.4
              c1.8 -1.5 4.6 -1.3 6.3 0.4
              c1.7 1.8 1.4 4.4 0.4 6.5
              c-1.7 2.2 -4.3 4.6 -8.1 7.6
            "
          />
          {/* ECG PULSE (centered & not touching borders) */}
          <path
            d="
              M5.2 12
              h3.0
              l1.0 -2.3
              l2.0 5.3
              l2.0 -5.5
              l1.7 3.8
              h3.8
            "
          />
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[21px] font-semibold text-slate-900">
          CodeBlue
        </span>
        <span className="text-[12px] text-slate-500 -mt-[2px]">
          For healthcare connections
        </span>
      </div>
    </div>
  );
};

export default BrandHeader;
