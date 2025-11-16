import React, { useState, useEffect } from "react";
import { HeartPulse, Lock } from "lucide-react";
import PulseAnswerModal from "./PulseAnswerModal";
import PremiumUpsellModal from "./PremiumUpsellModal";
import { addHeartCheckInboxEvent } from "../utils/inboxEvents";
import { savePulseAnswer, loadPulseAnswers } from "../utils/pulseStorage";

// Random compatibility tags
const compatibilityLabels = [
  "Vibes Align 💙",
  "Opposites Spark ⚡",
  "Could Get Interesting 👀",
  "Complementary Energy 🤝",
  "Cute Chaos Match 🔥",
];

const getRandomLabel = () =>
  compatibilityLabels[Math.floor(Math.random() * compatibilityLabels.length)];

export default function PulseGrid({
  profile,
  answeredMap = {},
  onOpenQuestion,
}) {
  const pulseQuestions = profile?.pulseQuestions || [];
  const [modal, setModal] = useState(null);
  const [premiumUpsell, setPremiumUpsell] = useState(false);
  const [answers, setAnswers] = useState(answeredMap);

  // Sync with DiscoverPage answered map
  useEffect(() => {
    setAnswers(answeredMap);
  }, [answeredMap]);

  const handleCardClick = (item, index) => {
    if (!onOpenQuestion) return;
    onOpenQuestion(item, index);
  };

  return (
    <div className="space-y-3 mt-4">
      {/* Section Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0F213A]" />
          <h3 className="text-sm font-semibold text-slate-900">Pulse Check</h3>
        </div>
        <span className="text-[11px] text-slate-500">
          True / False ice-breakers
        </span>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
        {pulseQuestions.map((item, index) => {
          const isAnswered = answers[item.id]?.answered;
          const label =
            answers[item.id]?.choice !== undefined
              ? compatibilityLabels[index % compatibilityLabels.length]
              : null;

          return (
            <div
              key={item.id}
              className="relative bg-white border border-slate-200/80 rounded-[20px] p-3 shadow-[0_2px_8px_rgba(15,33,58,0.05)] hover:shadow-[0_4px_14px_rgba(15,33,58,0.08)] transition-all"
            >
              {/* Pulse Button */}
              <button
                onClick={() => handleCardClick(item, index)}
                className="absolute top-2.5 right-2.5 w-9 h-9 rounded-xl bg-white/95 backdrop-blur-sm border border-slate-200 flex items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.10)] active:scale-90 hover:scale-105 transition"
              >
                <HeartPulse className="w-4 h-4 text-[#0F213A]" />
              </button>

              {/* Tag */}
              {item.label && (
                <p className="text-[11px] text-slate-600 font-semibold mb-1">
                  • {item.label}
                </p>
              )}

              {/* Question */}
              <p className="text-[13px] text-slate-800 leading-[1.35] font-medium pr-10">
                {item.question}
              </p>

              {/* Compatibility Label */}
              {isAnswered && (
                <p className="mt-2 text-xs text-slate-600 font-medium">
                  {label}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}