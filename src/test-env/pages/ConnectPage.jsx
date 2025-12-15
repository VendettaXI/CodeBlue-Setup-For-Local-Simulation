// src/test-env/pages/ConnectPage.jsx
// ------------------------------------------------------
// CONNECT PAGE (Elegant Social Discovery)
// Purpose:
//  - Help healthcare workers find micro-communities
//  - Join circles, groups, wellness spaces, hobbies
//  - Hybrid of Hinge aesthetics + soft rose aura
//  - Premium, minimal, emotional UI
// ------------------------------------------------------

import React from "react";
import {
  Users,
  HeartHandshake,
  Sparkles,
  Coffee,
  Activity,
  MessageCircle,
  Flame,
  ChevronRight,
  Compass,
  Calendar,
} from "lucide-react";

// Mock discovery groups (replace later with backend)
const circles = [
  {
    id: 1,
    title: "Night Shift Survivors",
    members: "14.8k healthcare workers",
    desc: "A safe circle for exhausted night warriors — decompress, laugh, breathe.",
    icon: <Activity className="h-5 w-5 text-white" />,
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: 2,
    title: "Soft Life Nurses Club",
    members: "9.2k nurses",
    desc: "Intentional rest, gentle routines, emotional softness & healthy boundaries.",
    icon: <Coffee className="h-5 w-5 text-white" />,
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: 3,
    title: "Healthcare Couples Lounge",
    members: "5.4k couples",
    desc: "For CodeBlue couples to keep bonding, date, play & stay emotionally connected.",
    icon: <HeartHandshake className="h-5 w-5 text-white" />,
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: 4,
    title: "Fitness & Scrubs",
    members: "7.7k workers",
    desc: "Shift-friendly workouts, body care, healthy meal ideas & group fitness buddies.",
    icon: <Flame className="h-5 w-5 text-white" />,
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
];

const ConnectPage = () => {
  return (
    <div
      className="min-h-screen px-4 pt-3 pb-24"
      style={{
        backgroundColor: "#F8F7FA",
      }}
    >
      <div className="max-w-3xl mx-auto space-y-3">
        {/* -------------------------------------------------- */}
        {/* HEADER                                             */}
        {/* -------------------------------------------------- */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-[#0F213A]">
            Find Your People
          </h1>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border-2 border-purple-200 bg-white/90 px-4 py-2 text-xs font-medium text-[#0F213A] shadow-[0_4px_16px_rgba(168,145,205,0.2)] hover:bg-purple-50 hover:border-purple-300 active:scale-95 transition-all"
          >
            <Compass className="h-4 w-4 text-purple-600" />
            Explore
          </button>
        </div>

        {/* -------------------------------------------------- */}
        {/* YOUR CONNECTION VIBE (styled like VentSpace quick vent card) */}
        {/* -------------------------------------------------- */}
        <div className="rounded-[22px] border border-slate-200 bg-white/90 shadow-[0_8px_26px_rgba(15,33,58,0.15)] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#0F213A]" />
              <h3 className="text-sm font-semibold text-[#0F213A]">
                Your Connection Vibe
              </h3>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            What you're naturally drawn to right now.
          </p>

          <div className="space-y-2">
            <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3 hover:bg-purple-50/60 hover:border-purple-300/60 hover:scale-[1.01] transition-all duration-300">
              <div className="text-left">
                <div className="text-sm font-medium text-[#0F213A]">
                  Soft social circles for emotional rest
                </div>
                <div className="text-xs text-[#0F213A]/60 mt-0.5">
                  You match well with calm & emotionally aware groups.
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-purple-500 flex-shrink-0 ml-2" />
            </button>

            <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3 hover:bg-purple-50/60 hover:border-purple-300/60 hover:scale-[1.01] transition-all duration-300">
              <div className="text-left">
                <div className="text-sm font-medium text-[#0F213A]">
                  Shift-friendly connection routines
                </div>
                <div className="text-xs text-[#0F213A]/60 mt-0.5">
                  Evening chats, slow weekends, soft bonding.
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-purple-500 flex-shrink-0 ml-2" />
            </button>
          </div>
        </div>

        {/* -------------------------------------------------- */}
        {/* DISCOVER CIRCLES — GRID                           */}
        {/* -------------------------------------------------- */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-[#0F213A] flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-600" />
            Healthcare circles you might like
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 auto-rows-[280px]">
            {circles.map((c) => (
              <button
                key={c.id}
                className="group h-full rounded-[10px] border border-white/30 shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-4 text-left hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)] hover:scale-[1.02] transition-all duration-300 flex flex-col relative overflow-hidden"
                style={{ background: c.gradient }}
              >
                {/* Overlay for depth */}
                <div className="absolute inset-0 bg-black/5" />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="rounded-xl bg-white/25 backdrop-blur-sm p-2.5 flex-shrink-0">
                      {c.icon}
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-[15px] font-bold text-white line-clamp-2 drop-shadow-md">
                        {c.title}
                      </span>
                      <span className="text-[11px] text-white/80 mt-0.5">
                        {c.members}
                      </span>
                    </div>
                  </div>

                  <p className="flex-1 text-[13px] leading-relaxed text-white/90 line-clamp-5 mb-3">
                    {c.desc}
                  </p>

                  <div className="mt-auto inline-flex items-center gap-1.5 text-[12px] font-semibold text-white">
                    Join circle
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------- */}
        {/* EVENTS PREVIEW (future expansion)                  */}
        {/* -------------------------------------------------- */}
        <section className="mt-6 space-y-3">
          <h2 className="text-sm font-semibold text-[#0F213A] flex items-center gap-2">
            <Calendar className="h-4 w-4 text-purple-600" />
            Upcoming soft-life events
          </h2>

          <button
            type="button"
            className="w-full rounded-[10px] border border-white/30 px-4 py-5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)] hover:scale-[1.01] transition-all duration-300 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
          >
            <div className="absolute inset-0 bg-black/5" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="text-[13px] font-semibold text-white drop-shadow-md">
                  Healthcare coffee chats ☕
                </div>
                <div className="text-[11px] text-white/80 mt-[2px]">
                  Sunday · Soft conversations · London
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-white" />
            </div>
          </button>

          <button
            type="button"
            className="w-full rounded-[10px] border border-white/30 px-4 py-5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)] hover:scale-[1.01] transition-all duration-300 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}
          >
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="text-[13px] font-semibold text-white drop-shadow-md">
                  Night shift cool-down walks 🌙
                </div>
                <div className="text-[11px] text-white/80 mt-[2px]">
                  Wednesdays · Thames River · Calm energy
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-white" />
            </div>
          </button>
        </section>
      </div>
    </div>
  );
};

export default ConnectPage;
