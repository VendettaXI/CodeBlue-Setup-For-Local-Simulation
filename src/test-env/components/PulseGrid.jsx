// src/test-env/components/PulseGrid.jsx
import React, { useEffect, useState } from "react";
import { HeartPulse } from "lucide-react";

// Simple compatibility tags – used when an answer exists
const compatibilityLabels = [
  "Vibes align 💙",
  "Opposites spark ⚡",
  "Could get interesting 👀",
  "Complementary energy 🤝",
  "Cute chaos match 🔥",
];

export default function PulseGrid({ profile, answeredMap = {}, onOpenQuestion }) {
  const pulseQuestions = profile?.pulseQuestions || [];
  const [answers, setAnswers] = useState(answeredMap);

  // keep local state in sync with DiscoverPage
  useEffect(() => {
    setAnswers(answeredMap);
  }, [answeredMap]);

  const handleCardClick = (item, index) => {
    if (!onOpenQuestion) return;
    onOpenQuestion(item, index);
  };

  return (
    <div className="mt-5 space-y-3">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0F213A]" />
          <h3 className="text-sm font-semibold text-slate-900">Pulse Check</h3>
        </div>
        <span className="text-[11px] text-slate-500">
          True / False ice-breakers
        </span>
      </div>

      {/* GRID – always 2 columns so cards sit side by side */}
      <div className="grid grid-cols-2 gap-3">
        {pulseQuestions.map((item, index) => {
          const record = answers[item.id];
          const isAnswered = record?.answered;
          const label = isAnswered
            ? compatibilityLabels[index % compatibilityLabels.length]
            : "Tap to answer";

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleCardClick(item, index)}
              className="flex h-full flex-col justify-between rounded-[22px]
                         border border-slate-100 bg-[#F4F6FC]
                         px-3.5 py-3 text-left shadow-[0_4px_12px_rgba(15,33,58,0.08)]
                         active:scale-[0.98] transition-transform"
            >
              {/* Top: label + question */}
              <div className="space-y-1.5 pr-1">
                {item.label && (
                  <p className="text-[11px] font-medium text-[#4B5875]">
                    • {item.label}
                  </p>
                )}
                <p className="text-[13px] leading-snug text-slate-900">
                  {item.question}
                </p>
              </div>

              {/* Bottom: helper / result + pulse icon */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">{label}</span>
                <span
                  className="inline-flex h-9 w-9 items-center justify-center
                             rounded-full bg-white
                             shadow-[0_3px_8px_rgba(15,33,58,0.18)]
                             border border-slate-200"
                >
                  <HeartPulse className="h-4 w-4 text-[#0F213A]" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}