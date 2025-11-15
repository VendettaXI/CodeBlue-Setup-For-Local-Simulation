import React from "react";
import { X } from "lucide-react";

export default function PulseAnswerModal({
  question,
  onAnswer,
  onClose
}) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end justify-center z-[200]">
      
      {/* SHEET CONTAINER */}
      <div className="w-full bg-white rounded-t-[28px] shadow-xl p-6 animate-slideUp relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-slate-400 hover:text-slate-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* SECTION LABEL */}
        <p className="text-[11px] text-slate-500 uppercase font-semibold mb-1 tracking-wide">
          Pulse Check
        </p>

        {/* QUESTION */}
        <p className="text-[18px] font-semibold text-slate-900 leading-snug mb-5 pr-6">
          {question}
        </p>

        {/* ANSWER BUTTONS */}
        <div className="flex gap-3 mb-5">
          <button
            onClick={() => onAnswer(true)}
            className="flex-1 py-3 rounded-xl bg-[#0F213A] text-white font-medium shadow-sm"
          >
            True
          </button>

          <button
            onClick={() => onAnswer(false)}
            className="flex-1 py-3 rounded-xl bg-slate-200 text-slate-800 font-medium shadow-sm"
          >
            False
          </button>
        </div>

        {/* CANCEL */}
        <button
          onClick={onClose}
          className="w-full py-2 text-slate-500 text-sm font-medium"
        >
          Cancel
        </button>

      </div>
    </div>
  );
}
