import React from "react";
import { X, HeartPulse } from "lucide-react";

export default function PremiumUpsellModal({ onClose, onUpgrade }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end justify-center z-[300]">
      
      <div className="w-full bg-white rounded-t-[28px] shadow-xl p-6 animate-slideUp relative">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-slate-400 hover:text-slate-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#0F213A]/10 flex items-center justify-center">
            <HeartPulse className="w-6 h-6 text-[#0F213A]" />
          </div>

          <div>
            <p className="text-[17px] font-semibold text-slate-900">
              Unlock HeartCheck Reveal 💙
            </p>
            <p className="text-[12px] text-slate-500 -mt-1">
              See how your rhythms match — instantly.
            </p>
          </div>
        </div>

        <button
          onClick={onUpgrade}
          className="w-full py-3 bg-[#0F213A] text-white rounded-xl font-medium shadow-sm"
        >
          Upgrade to Premium
        </button>

        <button
          onClick={onClose}
          className="mt-3 w-full py-2 text-slate-500 text-sm font-medium"
        >
          Maybe later
        </button>

      </div>
    </div>
  );
}
