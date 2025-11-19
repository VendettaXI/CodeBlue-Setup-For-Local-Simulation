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
    icon: <Activity className="h-5 w-5 text-rose-600" />,
  },
  {
    id: 2,
    title: "Soft Life Nurses Club",
    members: "9.2k nurses",
    desc: "Intentional rest, gentle routines, emotional softness & healthy boundaries.",
    icon: <Coffee className="h-5 w-5 text-rose-600" />,
  },
  {
    id: 3,
    title: "Healthcare Couples Lounge",
    members: "5.4k couples",
    desc: "For CodeBlue couples to keep bonding, date, play & stay emotionally connected.",
    icon: <HeartHandshake className="h-5 w-5 text-rose-600" />,
  },
  {
    id: 4,
    title: "Fitness & Scrubs",
    members: "7.7k workers",
    desc: "Shift-friendly workouts, body care, healthy meal ideas & group fitness buddies.",
    icon: <Flame className="h-5 w-5 text-rose-600" />,
  },
];

const ConnectPage = () => {
  return (
    <div
      className="min-h-screen px-4 pt-3 pb-20"
      style={{
        background:
          "radial-gradient(circle at top, rgba(190,24,93,0.065), transparent 60%)",
      }}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* -------------------------------------------------- */}
        {/* HEADER                                             */}
        {/* -------------------------------------------------- */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-medium tracking-wide text-rose-500/80">
              CONNECT • DISCOVER CIRCLES
            </span>
            <h1 className="mt-1 text-[21px] font-semibold text-slate-900">
              Find your people 🤍
            </h1>
            <p className="mt-[2px] text-xs text-slate-500">
              Soft communities made for healthcare workers.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-800 shadow-[0_3px_14px_rgba(15,33,58,0.18)] active:scale-95 transition"
          >
            <Compass className="h-4 w-4 text-rose-600" />
            Explore
          </button>
        </div>

        {/* -------------------------------------------------- */}
        {/* FEATURED TOP STRIPE                                */}
        {/* -------------------------------------------------- */}
        <div className="rounded-[22px] overflow-hidden shadow-[0_10px_28px_rgba(15,33,58,0.15)] border border-slate-100 bg-white">
          <div className="px-5 py-4 flex items-center justify-between bg-gradient-to-r from-[#0F213A] to-[#1b3353] text-white">
            <div>
              <h3 className="text-[15px] font-semibold">Your Connection Vibe</h3>
              <p className="text-[11px] text-white/80 mt-[2px]">
                What you're naturally drawn to right now.
              </p>
            </div>

            <Sparkles className="h-6 w-6 text-white/90" />
          </div>

          <div className="px-5 py-5 space-y-3 bg-white">
            <button className="flex w-full items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 px-3 py-3 text-left hover:bg-slate-50 transition">
              <div>
                <div className="text-[13px] font-medium text-slate-900">
                  Soft social circles for emotional rest
                </div>
                <div className="text-[11px] text-slate-500">
                  You match well with calm & emotionally aware groups.
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400" />
            </button>

            <button className="flex w-full items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 px-3 py-3 text-left hover:bg-slate-50 transition">
              <div>
                <div className="text-[13px] font-medium text-slate-900">
                  Shift-friendly connection routines
                </div>
                <div className="text-[11px] text-slate-500">
                  Evening chats, slow weekends, soft bonding.
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* -------------------------------------------------- */}
        {/* DISCOVER CIRCLES — GRID                           */}
        {/* -------------------------------------------------- */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <Users className="h-4 w-4 text-[#0F213A]" />
            Healthcare circles you might like
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {circles.map((c) => (
              <button
                key={c.id}
                className="group rounded-2xl border border-slate-200 bg-white shadow-[0_6px_18px_rgba(15,33,58,0.12)] p-4 text-left hover:bg-rose-50/40 hover:border-rose-200 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-rose-50 p-2 shadow-[0_0_0_1px_rgba(190,24,93,0.18)]">
                    {c.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-semibold text-slate-900">
                      {c.title}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {c.members}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-[12px] leading-relaxed text-slate-700">
                  {c.desc}
                </p>

                <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-rose-600">
                  Join circle
                  <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------- */}
        {/* EVENTS PREVIEW (future expansion)                  */}
        {/* -------------------------------------------------- */}
        <section className="mt-6 space-y-3">
          <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#0F213A]" />
            Upcoming soft-life events
          </h2>

          <button
            type="button"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left shadow-[0_6px_18px_rgba(15,33,58,0.12)] hover:bg-rose-50/40 transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[13px] font-medium text-slate-900">
                  Healthcare coffee chats ☕
                </div>
                <div className="text-[11px] text-slate-500 mt-[2px]">
                  Sunday · Soft conversations · London
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400" />
            </div>
          </button>

          <button
            type="button"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left shadow-[0_6px_18px_rgba(15,33,58,0.12)] hover:bg-rose-50/40 transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[13px] font-medium text-slate-900">
                  Night shift cool-down walks 🌙
                </div>
                <div className="text-[11px] text-slate-500 mt-[2px]">
                  Wednesdays · Thames River · Calm energy
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400" />
            </div>
          </button>
        </section>
      </div>
    </div>
  );
};

export default ConnectPage;