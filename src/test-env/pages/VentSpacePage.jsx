// src/test-env/pages/VentSpacePage.jsx
// ------------------------------------------------------
// VENT SPACE • Emotional Safe Room
// - Gunmetal-first design (#0F213A)
// - Ultra-soft, premium emotional UI
// - For venting, expressing, releasing pressure
// - Anonymous feel, warm but not childish
// - Dark-rose only for micro accents
// ------------------------------------------------------

import React, { useState } from "react";
import {
  MessageCircle,
  Heart,
  Send,
  Flame,
  Sparkles,
  Shield,
  ChevronRight,
} from "lucide-react";

// Mock vent posts (later replaced by backend)
const sampleVents = [
  {
    id: 1,
    emotion: "Tired but trying",
    text: "Today a patient hugged me and I had to pretend I wasn’t emotionally exhausted. I just needed to breathe for a minute.",
    timestamp: "2h ago",
    intensity: 2,
  },
  {
    id: 2,
    emotion: "Overstimulated",
    text: "The ward was so loud I couldn't hear my own thoughts. I feel guilty for wanting silence.",
    timestamp: "5h ago",
    intensity: 3,
  },
  {
    id: 3,
    emotion: "Soft moment",
    text: "A kid told me, ‘You're my favourite nurse.’ I think that healed something in me today.",
    timestamp: "1d ago",
    intensity: 1,
  },
];

const VentSpacePage = () => {
  const [vent, setVent] = useState("");
  const [posts, setPosts] = useState(sampleVents);

  const postVent = () => {
    if (!vent.trim()) return;
    const newPost = {
      id: Date.now(),
      emotion: "Shared anonymously",
      text: vent.trim(),
      timestamp: "just now",
      intensity: 2,
    };
    setPosts([newPost, ...posts]);
    setVent("");
  };

  return (
    <div
      className="min-h-screen px-4 pt-3 pb-20"
      style={{
        background:
          "radial-gradient(circle at top, rgba(15,33,58,0.12), transparent 55%)",
      }}
    >
      <div className="max-w-3xl mx-auto space-y-6">

        {/* -------------------------------------------------- */}
        {/* HEADER                                            */}
        {/* -------------------------------------------------- */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-medium tracking-wide text-[#0F213A]/70">
              VENT • SAFE SPACE
            </span>
            <h1 className="mt-1 text-[21px] font-semibold text-[#0F213A]">
              Let it out softly 🤍
            </h1>
            <p className="text-xs text-slate-500">
              Anonymous emotional release for healthcare workers.
            </p>
          </div>

          <div className="rounded-full border border-[#0F213A]/20 bg-white px-3 py-1.5 text-xs shadow-sm flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#0F213A]" />
            <span className="text-[#0F213A]/80 font-medium">Safe mode</span>
          </div>
        </div>

        {/* -------------------------------------------------- */}
        {/* WRITE A VENT                                      */}
        {/* -------------------------------------------------- */}
        <div className="rounded-[22px] border border-slate-200 bg-white/90 shadow-[0_8px_26px_rgba(15,33,58,0.15)] p-4 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <MessageCircle className="h-4 w-4 text-[#0F213A]" />
            <h2 className="text-sm font-semibold text-[#0F213A]">
              What’s sitting on your chest?
            </h2>
          </div>

          <textarea
            value={vent}
            onChange={(e) => setVent(e.target.value)}
            placeholder="Let it spill… No judgement, no identity, no pressure."
            className="
              w-full min-h-[90px] rounded-2xl border border-slate-200
              bg-slate-50/70 px-3 py-2 text-sm text-slate-800
              placeholder:text-slate-500 shadow-inner
              focus:ring-2 focus:ring-[#0F213A]/20 focus:outline-none
            "
          />

          <button
            onClick={postVent}
            className="
              w-full inline-flex items-center justify-center gap-2
              rounded-full bg-[#0F213A] text-white text-sm font-medium
              py-2 shadow-[0_4px_16px_rgba(15,33,58,0.4)]
              active:scale-95 transition
            "
          >
            <Send className="h-4 w-4" />
            Share safely
          </button>
        </div>

        {/* -------------------------------------------------- */}
        {/* RECENT EMOTIONS (pill selector future feature)     */}
        {/* -------------------------------------------------- */}
        <div className="flex items-center gap-2 mt-2">
          <Sparkles className="h-4 w-4 text-[#0F213A]" />
          <h2 className="text-sm font-semibold text-[#0F213A]">
            Today’s emotional weather
          </h2>
        </div>

        {/* -------------------------------------------------- */}
        {/* FEED OF VENTS                                     */}
        {/* -------------------------------------------------- */}
        <div className="space-y-4">
          {posts.map((p) => (
            <div
              key={p.id}
              className="
                rounded-[22px] border border-slate-200 bg-white/95 
                shadow-[0_6px_18px_rgba(15,33,58,0.12)] p-4
              "
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-[13px] font-medium text-[#0F213A]">
                  {p.emotion}
                </div>
                <span className="text-[11px] text-slate-500">{p.timestamp}</span>
              </div>

              <p className="text-[13px] leading-relaxed text-slate-700">
                {p.text}
              </p>

              {/* Micro emotion meter */}
              <div className="mt-3 flex items-center gap-1.5">
                {Array.from({ length: p.intensity }).map((_, i) => (
                  <Flame
                    key={i}
                    className="h-3.5 w-3.5 text-rose-500/70"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* -------------------------------------------------- */}
        {/* FOOTER BLOCK                                      */}
        {/* -------------------------------------------------- */}
        <div className="mt-8 mb-4 text-center text-[11px] text-slate-500">
          Your vents stay anonymous. Nothing is stored with identity.
        </div>
      </div>
    </div>
  );
};

export default VentSpacePage;