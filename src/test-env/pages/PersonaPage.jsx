// src/test-env/pages/PersonaPage.jsx
// ------------------------------------------------------
// Persona Page (formerly HomePage Option B)
// Premium profile hub with:
// - Faint dark-rose tint background
// - Icon-enhanced cards (from HomePageAlt)
// - Profile preview card
// - Account, personality, safety, and settings cards
// ------------------------------------------------------

import React from "react";
import {
  Settings,
  PenSquare,
  ShieldCheck,
  HeartHandshake,
  Bell,
  Sparkles,
  User,
  Camera,
  BookHeart,
  HandHeart,
  Lock,
  MessageSquareHeart,
  Star,
  ChevronRight,
} from "lucide-react";

// ------------------------------------------------------
// MOCK USER DATA (replace later with real backend data)
// ------------------------------------------------------
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

  return (
    <div
      className="min-h-screen px-4 pb-20 pt-3"
      style={{
        background:
          "radial-gradient(circle at top, rgba(190,24,93,0.06), transparent 55%)",
      }}
    >
      <div className="max-w-3xl mx-auto space-y-4">
        {/* -------------------------------------------------- */}
        {/* GREETING BLOCK                                     */}
        {/* -------------------------------------------------- */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-medium tracking-wide text-rose-500/80">
              PERSONA • PROFILE HOME
            </span>
            <h1 className="mt-1 text-[21px] font-semibold text-slate-900">
              Hey, {currentUser.name.split(" ")[0]} 👋
            </h1>
            <p className="text-xs text-slate-500">
              Your profile identity. How you show up on CodeBlue.
            </p>
          </div>

          {/* App Settings shortcut */}
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-800 shadow-[0_4px_18px_rgba(15,33,58,0.16)] active:scale-95 transition"
          >
            <Settings className="h-4 w-4 text-rose-500" />
            <span>App settings</span>
          </button>
        </div>

        {/* -------------------------------------------------- */}
        {/* HERO PROFILE CARD                                   */}
        {/* -------------------------------------------------- */}
        <section
          className="
            rounded-[26px] border border-slate-100
            bg-white shadow-[0_18px_40px_rgba(15,33,58,0.22)]
            overflow-hidden
          "
        >
          {/* Header gradient */}
          <div className="bg-gradient-to-r from-[#0F213A] via-[#1b3353] to-[rgba(190,24,93,0.90)] px-5 pt-4 pb-4">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="rounded-full bg-gradient-to-tr from-rose-500/80 via-rose-400/60 to-slate-50 p-[2px] shadow-[0_0_0_1px_rgba(255,255,255,0.25)]">
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

              {/* Basic info */}
              <div className="flex flex-col gap-1 text-white">
                <div className="flex flex-wrap items-baseline gap-1.5">
                  <span className="text-[18px] font-semibold">
                    {currentUser.name}
                  </span>
                  <span className="text-xs text-white/80">• Profile preview</span>
                </div>
                <div className="text-xs text-white/85">
                  {currentUser.role} @ {currentUser.hospital}
                </div>
                <div className="text-[11px] text-white/70">
                  {currentUser.location} · {currentUser.shiftStyle}
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Progress pill */}
                <div className="inline-flex items-center gap-2 rounded-full bg-black/20 px-3 py-1 text-[11px] text-white">
                  <div className="relative h-5 w-5">
                    <svg viewBox="0 0 36 36" className="h-5 w-5 -rotate-90">
                      <path
                        d="M18 2.5a15.5 15.5 0 1 1 0 31 15.5 15.5 0 0 1 0-31"
                        fill="none"
                        stroke="rgba(255,255,255,0.18)"
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
                  <span className="font-semibold">{profileProgress}%</span>
                </div>

                {/* Intent */}
                <div className="inline-flex items-center gap-1.5 rounded-full bg-black/18 px-3 py-1 text-[11px] text-white/90">
                  <HeartHandshake className="h-3.5 w-3.5 text-rose-200" />
                  <span>{currentUser.intent}</span>
                </div>
              </div>

              {/* Preview */}
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Preview profile
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="px-5 pb-5 pt-4 space-y-5 bg-white">
            
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <StatCard
                title="Prompts"
                value={currentUser.promptsCompleted}
                subtitle="answered"
                icon={<BookHeart className="h-4 w-4 text-rose-500" />}
              />
              <StatCard
                title="Photos"
                value={currentUser.photosUploaded}
                subtitle="uploaded"
                icon={<Camera className="h-4 w-4 text-rose-500" />}
              />
              <StatCard
                title="Vent persona"
                value={currentUser.ventPersona}
                icon={<MessageSquareHeart className="h-4 w-4 text-rose-500" />}
              />
            </div>

            {/* Quick actions */}
            <div className="flex flex-wrap gap-2">
              <ActionButton
                icon={<PenSquare className="h-3.5 w-3.5" />}
                text="Edit profile"
                type="primary"
              />

              <ActionButton
                icon={<Settings className="h-3.5 w-3.5" />}
                text="Profile settings"
                type="secondary"
              />

              <ActionButton
                icon={<Bell className="h-3.5 w-3.5" />}
                text="App controls"
                type="rose"
              />
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- */}
        {/* ABOUT YOU                                           */}
        {/* -------------------------------------------------- */}
        <SectionCard
          title="About you"
          icon={<User className="h-4 w-4 text-[#0F213A]" />}
        >
          <p className="text-sm leading-relaxed text-slate-700">
            {currentUser.bio}
          </p>

          <div className="mt-4 grid gap-2 text-[11px] text-slate-600 sm:grid-cols-2">
            <InfoBox
              label="How you like to connect"
              value={currentUser.matchStyle}
              icon={<HeartHandshake className="h-4 w-4 text-rose-500" />}
            />
            <InfoBox
              label="What your profile whispers"
              value="Calm, emotionally aware, safe to exhale around."
              icon={<Star className="h-4 w-4 text-rose-500" />}
            />
          </div>
        </SectionCard>

        {/* -------------------------------------------------- */}
        {/* SAFETY CONTROLS                                    */}
        {/* -------------------------------------------------- */}
        <SectionCard
          title="Safety & controls"
          icon={<ShieldCheck className="h-4 w-4 text-emerald-500" />}
        >
          <SettingsRow
            title="Profile visibility"
            subtitle="Visible to healthcare workers within your filters."
          />
          <SettingsRow
            title="Vent Space persona"
            subtitle={currentUser.ventPersona}
          />
          <SettingsRow
            title="App noise & boundaries"
            subtitle="Control notifications & reminders."
          />
        </SectionCard>
      </div>
    </div>
  );
};

export default PersonaPage;

// ------------------------------------------------------
// REUSABLE SUB-COMPONENTS
// ------------------------------------------------------

const StatCard = ({ title, value, subtitle, icon }) => (
  <div className="rounded-2xl border border-slate-100 bg-slate-50/60 px-3 py-2.5">
    <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
      {icon}
      {title}
    </div>
    <div className="mt-1 flex items-baseline gap-1">
      <span className="text-base font-semibold text-slate-900">{value}</span>
      {subtitle && <span className="text-[11px] text-slate-500">{subtitle}</span>}
    </div>
  </div>
);

const ActionButton = ({ icon, text, type }) => {
  const styles = {
    primary:
      "bg-[#0F213A] text-white shadow-[0_4px_14px_rgba(15,33,58,0.45)]",
    secondary:
      "border border-slate-200 bg-white text-slate-800 shadow-[0_3px_10px_rgba(15,33,58,0.18)]",
    rose:
      "border border-rose-100 bg-rose-50/60 text-rose-700 shadow-[0_3px_10px_rgba(190,24,93,0.28)]",
  };

  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-medium active:scale-95 transition ${styles[type]}`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

const SectionCard = ({ title, icon, children }) => (
  <section className="rounded-[22px] border border-slate-100 bg-white/85 px-4 py-4 shadow-[0_10px_26px_rgba(15,33,58,0.12)] space-y-3">
    <div className="flex items-center gap-2">
      {icon}
      <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
    </div>
    {children}
  </section>
);

const InfoBox = ({ label, value, icon }) => (
  <div className="rounded-2xl border border-slate-100 bg-slate-50/60 px-3 py-2.5">
    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
      {icon}
      {label}
    </div>
    <div className="mt-1 text-[12px] text-slate-800">{value}</div>
  </div>
);

const SettingsRow = ({ title, subtitle }) => (
  <button className="flex w-full items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 px-3 py-2.5 text-left hover:bg-slate-50 transition">
    <div>
      <div className="text-[12px] font-medium text-slate-900">{title}</div>
      <div className="text-[11px] text-slate-600">{subtitle}</div>
    </div>
    <ChevronRight className="h-4 w-4 text-slate-400" />
  </button>
);