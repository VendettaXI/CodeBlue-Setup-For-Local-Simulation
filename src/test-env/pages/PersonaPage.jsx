// src/test-env/pages/PersonaPage.jsx
// ------------------------------------------------------
// OPTION B – Premium Profile Home (gunmetal + lavender)
// - Gunmetal (#0F213A) as primary
// - Lavender (#A891CD) for accents and secondary actions
// - Clean, premium aesthetic with soft colors
// ------------------------------------------------------

import React from "react";
import {
  Settings,
  PenSquare,
  ChevronRight,
  ShieldCheck,
  HeartHandshake,
  Bell,
  Sparkles,
} from "lucide-react";
import { useNavigation } from "./TestPagesDemo";

const currentUser = {
  name: "Sarah M.",
  role: "Emergency Nurse",
  hospital: "Royal London Hospital",
  location: "London, UK",
  bio: "Soft-hearted, night-shift survivor. I like quiet coffee, sunsets and people who ask real questions.",
  avatarUrl:
    "https://images.pexels.com/photos/6129681/pexels-photo-6129681.jpeg?auto=compress&cs=tinysrgb&w=400",
  shiftStyle: "Mostly night shifts",
  intent: "Soft-built long term",
  matchStyle: "Calm energy, honest conversations, slow-burn closeness.",
  profileCompletion: 78,
  promptsCompleted: 4,
  photosUploaded: 6,
  ventPersona: "Soft but honest",
};

const PersonaPage = () => {
  const profileProgress = currentUser.profileCompletion;
  const { navigate } = useNavigation();

  return (
    <div
      className="min-h-screen px-4 pb-24 pt-3"
      style={{ backgroundColor: "#F8F7FA" }}
    >
      <div className="max-w-3xl mx-auto space-y-3">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-slate-900">
            Hey, {currentUser.name.split(" ")[0]}
          </h1>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 shadow-sm active:scale-95 transition hover:bg-slate-50"
            onClick={() => navigate("settings")}
          >
            <Settings className="h-4 w-4 text-[#0F213A]" />
            <span>App settings</span>
          </button>
        </div>

        {/* HERO CARD */}
        <section className="rounded-[26px] border border-slate-100 bg-white shadow-md overflow-hidden">
          {/* Hero gradient header - gunmetal primary */}
          <div className="bg-gradient-to-r from-[#0F213A] via-[#1b3353] to-[#0F213A] px-4 pt-3 pb-3">
            <div className="flex items-center gap-4">

              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="rounded-full bg-white/20 p-[2px] shadow">
                  <div className="h-14 w-14 overflow-hidden rounded-full bg-slate-200">
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0F213A] bg-emerald-400" />
              </div>

              {/* Name */}
              <div className="flex flex-col gap-1 text-white">
                <span className="text-[18px] font-semibold">
                  {currentUser.name}
                </span>
                <div className="text-xs text-white/85">
                  {currentUser.role} @ {currentUser.hospital}
                </div>
                <div className="text-[11px] text-white/70">
                  {currentUser.location} · {currentUser.shiftStyle}
                </div>
              </div>
            </div>

            {/* Progress + intent */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">

                {/* Progress pill */}
                <div className="inline-flex items-center gap-2 rounded-full bg-black/20 px-3 py-1 text-[11px] text-white">
                  <div className="relative h-5 w-5">
                    <svg viewBox="0 0 36 36" className="h-5 w-5 -rotate-90">
                      <path
                        d="M18 2.5a15.5 15.5 0 1 1 0 31 15.5 15.5 0 0 1 0-31"
                        fill="none"
                        stroke="rgba(255,255,255,0.14)"
                        strokeWidth="3.4"
                      />
                      <path
                        d="M18 2.5a15.5 15.5 0 1 1 0 31 15.5 15.5 0 0 1 0-31"
                        fill="none"
                        stroke="white"
                        strokeWidth="3.4"
                        strokeDasharray={`${profileProgress * 0.97}, 100`}
                      />
                    </svg>
                  </div>
                  <span className="font-semibold">
                    {profileProgress}% profile
                  </span>
                </div>

                {/* Intent */}
                <div className="inline-flex items-center gap-1.5 rounded-full bg-black/25 px-3 py-1 text-[11px] text-white">
                  <HeartHandshake className="h-3.5 w-3.5 text-rose-200" />
                  <span>{currentUser.intent}</span>
                </div>
              </div>

              {/* Preview */}
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] text-white active:scale-95 transition hover:bg-white/15"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Preview profile
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="px-4 pb-4 pt-3 space-y-5 bg-white">

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <QuickStat label="Prompts" value={currentUser.promptsCompleted} />
              <QuickStat label="Photos" value={currentUser.photosUploaded} />
              <QuickStat label="Vent persona" value={currentUser.ventPersona} />
            </div>

            {/* Quick actions */}
            <div className="flex flex-wrap gap-2">
              <PrimaryButton icon={PenSquare} label="Edit profile" />
              <SecondaryButton icon={Settings} label="Profile settings" />
              <AccentButton icon={Bell} label="App controls" />
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="rounded-[22px] border border-slate-100 bg-white px-3 py-3 shadow">
          <Section title="About you" />
          <p className="text-sm leading-relaxed text-slate-700 mt-2">
            {currentUser.bio}
          </p>
        </section>

        {/* SAFETY */}
        <section className="rounded-[22px] border border-slate-100 bg-white px-3 py-3 shadow space-y-3">
          <Section title="Safety & controls" icon={ShieldCheck} />
          <SafetyItem
            title="Profile visibility"
            desc="Visible to healthcare workers within your filters."
          />
          <SafetyItem
            title="Vent Space persona"
            desc={`${currentUser.ventPersona} · linked to your main profile.`}
          />
          <SafetyItem
            title="App noise & boundaries"
            desc="Control notifications, push reminders and who can reach you."
          />
        </section>
      </div>
    </div>
  );
};

// — Helper Components (gunmetal + lavender color scheme)

const QuickStat = ({ label, value }) => (
  <div className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2.5 hover:bg-slate-100/50 transition">
    <div className="text-[11px] font-semibold text-slate-500">{label}</div>
    <div className="mt-1 text-base font-semibold text-[#0F213A]">{value}</div>
  </div>
);

const Section = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-2 mb-1">
    {Icon && <Icon className="h-4 w-4 text-[#0F213A]" />}
    <span className="text-sm font-semibold text-slate-900">{title}</span>
  </div>
);

const SafetyItem = ({ title, desc }) => (
  <button className="flex w-full items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2.5 text-left hover:bg-slate-100/50 transition">
    <div>
      <div className="text-[12px] font-medium text-[#0F213A]">{title}</div>
      <div className="text-[11px] text-slate-600">{desc}</div>
    </div>
    <ChevronRight className="h-4 w-4 text-slate-400" />
  </button>
);

const PrimaryButton = ({ icon: Icon, label }) => (
  <button className="inline-flex items-center gap-1.5 rounded-full bg-[#0F213A] px-3.5 py-1.5 text-[11px] font-medium text-white hover:bg-[#0F213A]/90 active:scale-95 transition shadow-sm">
    <Icon className="h-3.5 w-3.5" />
    {label}
  </button>
);

const SecondaryButton = ({ icon: Icon, label }) => (
  <button className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-medium text-slate-800 hover:bg-slate-50 active:scale-95 transition">
    <Icon className="h-3.5 w-3.5 text-slate-600" />
    {label}
  </button>
);

const AccentButton = ({ icon: Icon, label }) => (
  <button className="inline-flex items-center gap-1.5 rounded-full border border-[#A891CD]/40 bg-[rgba(168,145,205,0.1)] px-3.5 py-1.5 text-[11px] font-medium text-[#0F213A] hover:bg-[rgba(168,145,205,0.15)] active:scale-95 transition">
    <Icon className="h-3.5 w-3.5" />
    {label}
  </button>
);

export default PersonaPage;
