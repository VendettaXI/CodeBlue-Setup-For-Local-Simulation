// src/test-env/pages/AppSettingsPage.jsx
// ------------------------------------------------------
// APP SETTINGS • Premium Control Center
// - Gunmetal navy as primary (#0F213A)
// - Faint dark-rose tint background
// - Soft cards, premium dividers
// - Notification, privacy, security, preferences, about
// ------------------------------------------------------

import React from "react";
import {
  Bell,
  Lock,
  ShieldCheck,
  User,
  Volume2,
  Moon,
  ChevronRight,
  Info,
  Wifi,
  Smartphone,
  MessageSquareHeart,
} from "lucide-react";

const AppSettingsPage = () => {
  return (
    <div
      className="min-h-screen px-4 pt-4 pb-24"
      style={{
        background:
          "radial-gradient(circle at top, rgba(190,24,93,0.06), transparent 60%)",
      }}
    >
      <div className="max-w-3xl mx-auto space-y-6">

        {/* -------------------------------------------------- */}
        {/* HEADER */}
        {/* -------------------------------------------------- */}
        <div className="flex flex-col mb-1">
          <span className="text-xs font-medium tracking-wide text-[#0F213A]/70">
            APP • SETTINGS
          </span>
          <h1 className="mt-1 text-[21px] font-semibold text-[#0F213A]">
            Control your space ⚙️
          </h1>
          <p className="text-xs text-slate-500">
            Your preferences, notifications and boundaries in one place.
          </p>
        </div>

        {/* -------------------------------------------------- */}
        {/* SECTION CARD COMPONENT */}
        {/* -------------------------------------------------- */}
        <SectionCard title="Notifications & Alerts">
          <SettingsRow icon={<Bell />} label="Push notifications" />
          <SettingsRow icon={<Volume2 />} label="Sound & vibration" />
          <SettingsRow
            icon={<MessageSquareHeart />}
            label="New match alerts"
          />
          <SettingsRow
            icon={<User />}
            label="Message previews"
          />
        </SectionCard>

        <SectionCard title="Privacy & Safety">
          <SettingsRow icon={<ShieldCheck />} label="Safety controls" />
          <SettingsRow icon={<Lock />} label="Blocking & reporting" />
          <SettingsRow icon={<Moon />} label="Do Not Disturb mode" />
        </SectionCard>

        <SectionCard title="Vent Space Preferences">
          <SettingsRow icon={<User />} label="Vent persona" />
          <SettingsRow icon={<ShieldCheck />} label="Anonymous mode rules" />
          <SettingsRow icon={<MessageSquareHeart />} label="Emotional triggers filter" />
        </SectionCard>

        <SectionCard title="Account & Device">
          <SettingsRow icon={<Smartphone />} label="Device management" />
          <SettingsRow icon={<Wifi />} label="Network preferences" />
          <SettingsRow icon={<User />} label="Manage account" />
        </SectionCard>

        <SectionCard title="About CodeBlue">
          <SettingsRow icon={<Info />} label="Terms & policies" />
          <SettingsRow icon={<Info />} label="App version 1.0.0" />
        </SectionCard>

        <div className="text-center text-[11px] text-slate-500 mt-8 mb-6">
          Made with soft hearts for the healthcare community.
        </div>
      </div>
    </div>
  );
};

export default AppSettingsPage;

/* ------------------------------------------------------ */
/* SMALL COMPONENTS                                       */
/* ------------------------------------------------------ */

const SectionCard = ({ title, children }) => (
  <section className="rounded-[22px] border border-slate-200 bg-white/90 shadow-[0_8px_22px_rgba(15,33,58,0.15)] px-4 py-4 space-y-3">
    <h2 className="text-sm font-semibold text-[#0F213A] flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-[#0F213A]" />
      {title}
    </h2>
    <div className="divide-y divide-slate-200">{children}</div>
  </section>
);

const SettingsRow = ({ icon, label }) => (
  <button
    type="button"
    className="
      flex w-full items-center justify-between py-3
      text-left hover:bg-slate-50/70 transition rounded-xl px-1
    "
  >
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-100">
        {React.cloneElement(icon, { className: "h-4 w-4 text-[#0F213A]" })}
      </div>
      <span className="text-[13px] font-medium text-slate-800">{label}</span>
    </div>
    <ChevronRight className="h-4 w-4 text-slate-400" />
  </button>
);