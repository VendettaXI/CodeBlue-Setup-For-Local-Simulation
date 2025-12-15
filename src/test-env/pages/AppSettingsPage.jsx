// src/test-env/pages/AppSettingsPage.jsx
// ------------------------------------------------------
// APP SETTINGS • Premium Control Center
// - Gunmetal navy as primary (#0F213A)
// - Faint dark-rose tint background
// - Soft cards, premium dividers
// - Complete settings with Profile, Appearance, Safety, Discovery, Activity, Notifications, Account
// ------------------------------------------------------

import React, { useState } from "react";
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
  Sun,
  Eye,
  EyeOff,
  Calendar,
  Globe,
  MapPin,
  Heart,
  Activity,
  Mail,
  Phone,
  Settings,
  LogOut,
  Check,
  Users,
  MessageCircle,
} from "lucide-react";

const AppSettingsPage = () => {
  // Settings state
  const [pauseProfile, setPauseProfile] = useState(false);
  const [showLastActive, setShowLastActive] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [readReceipts, setReadReceipts] = useState(true);
  const [enableDiscovery, setEnableDiscovery] = useState(true);
  const [maxDistance, setMaxDistance] = useState(50);
  const [ageRange, setAgeRange] = useState([25, 45]);
  const [showDistance, setShowDistance] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  return (
    <div
      className="min-h-screen px-4 pt-4 pb-24"
      style={{
        backgroundColor: "#F8F7FA",
      }}
    >
      <div className="max-w-3xl mx-auto">

        {/* -------------------------------------------------- */}
        {/* HEADER */}
        {/* -------------------------------------------------- */}
        <div className="mb-6">
          <h1 className="text-lg font-semibold text-[#0F213A]">
            Settings
          </h1>
        </div>

        {/* -------------------------------------------------- */}
        {/* PROFILE SECTION */}
        {/* -------------------------------------------------- */}
        <SectionCard title="Profile">
          <SettingsRow 
            icon={<User className="w-5 h-5" />} 
            label="Edit Profile" 
            description="Photos, prompts, bio, my vibe"
          />
          <SettingsRow 
            icon={<ShieldCheck className="w-5 h-5" />} 
            label="Verification" 
            description="NHS email verified"
            action={
              <div className="flex items-center gap-1">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-xs font-medium text-green-600">Verified</span>
              </div>
            }
          />
          <SettingsRow 
            icon={<Eye className="w-5 h-5" />} 
            label="Pause Profile" 
            description="Hide from discovery while keeping matches"
            action={<ToggleSwitch enabled={pauseProfile} onChange={setPauseProfile} />}
          />
          <SettingsRow 
            icon={<Calendar className="w-5 h-5" />} 
            label="Show Last Active" 
            description="Let matches see when you were last online"
            action={<ToggleSwitch enabled={showLastActive} onChange={setShowLastActive} />}
          />
        </SectionCard>

        {/* -------------------------------------------------- */}
        {/* APPEARANCE SECTION */}
        {/* -------------------------------------------------- */}
        <SectionCard title="Appearance">
          <SettingsRow 
            icon={darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />} 
            label="Dark Mode" 
            description="Toggle between light and dark theme"
            action={<ToggleSwitch enabled={darkMode} onChange={setDarkMode} />}
          />
        </SectionCard>

        {/* -------------------------------------------------- */}
        {/* SAFETY & PRIVACY SECTION */}
        {/* -------------------------------------------------- */}
        <SectionCard title="Safety & Privacy">
          <SettingsRow 
            icon={<Lock className="w-5 h-5" />} 
            label="Privacy Settings" 
            description="Control who can see your profile"
          />
          <SettingsRow 
            icon={<Users className="w-5 h-5" />} 
            label="Block List" 
            description="Manage blocked contacts"
          />
          <SettingsRow 
            icon={<MessageCircle className="w-5 h-5" />} 
            label="Read Receipts" 
            description="Let matches know when you've read messages"
            action={<ToggleSwitch enabled={readReceipts} onChange={setReadReceipts} />}
          />
          <SettingsRow 
            icon={<ShieldCheck className="w-5 h-5" />} 
            label="Photo Verification" 
            description="Verify your identity with a selfie"
            action={<span className="text-xs font-medium text-slate-400">Not verified</span>}
          />
        </SectionCard>

        {/* -------------------------------------------------- */}
        {/* DISCOVERY SETTINGS SECTION */}
        {/* -------------------------------------------------- */}
        <SectionCard title="Discovery Settings">
          <SettingsRow 
            icon={<Globe className="w-5 h-5" />} 
            label="Enable Discovery" 
            description="Be discoverable in the card stack"
            action={<ToggleSwitch enabled={enableDiscovery} onChange={setEnableDiscovery} />}
          />
          <SettingsRow 
            icon={<MapPin className="w-5 h-5" />} 
            label="Location" 
            description="Waterloo, Ontario, Canada"
          />
          
          {/* Distance Slider */}
          <div className="py-4 border-b border-slate-200 last:border-b-0">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#0F213A]/70" />
                <div>
                  <p className="font-normal text-slate-900">Maximum Distance</p>
                  <p className="text-sm font-light text-slate-500">{maxDistance} miles</p>
                </div>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={maxDistance}
              onChange={(e) => setMaxDistance(e.target.value)}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#A891CD]"
            />
          </div>

          {/* Age Range Slider */}
          <div className="py-4 border-b border-slate-200 last:border-b-0">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-[#0F213A]/70" />
                <div>
                  <p className="font-normal text-slate-900">Age Range</p>
                  <p className="text-sm font-light text-slate-500">{ageRange[0]} - {ageRange[1]} years</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <input
                type="range"
                min="18"
                max="65"
                value={ageRange[0]}
                onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#A891CD]"
              />
              <input
                type="range"
                min="18"
                max="65"
                value={ageRange[1]}
                onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#A891CD]"
              />
            </div>
          </div>

          <SettingsRow 
            icon={<Heart className="w-5 h-5" />} 
            label="Interested In" 
            description="Healthcare professionals"
          />
          <SettingsRow 
            icon={showDistance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />} 
            label="Show Distance" 
            description="Display distance on profiles"
            action={<ToggleSwitch enabled={showDistance} onChange={setShowDistance} />}
          />
        </SectionCard>

        {/* -------------------------------------------------- */}
        {/* ACTIVITY SECTION */}
        {/* -------------------------------------------------- */}
        <SectionCard title="Activity">
          <SettingsRow 
            icon={<Activity className="w-5 h-5" />} 
            label="Discovery History" 
            description="View your swipe history and stats"
          />
        </SectionCard>

        {/* -------------------------------------------------- */}
        {/* NOTIFICATIONS SECTION */}
        {/* -------------------------------------------------- */}
        <SectionCard title="Notifications">
          <SettingsRow 
            icon={<Bell className="w-5 h-5" />} 
            label="Push Notifications" 
            description="Get notified about matches and messages"
            action={<ToggleSwitch enabled={pushNotifications} onChange={setPushNotifications} />}
          />
          <SettingsRow 
            icon={<Mail className="w-5 h-5" />} 
            label="Email Notifications" 
            description="Receive updates via email"
            action={<ToggleSwitch enabled={emailNotifications} onChange={setEmailNotifications} />}
          />
        </SectionCard>

        {/* -------------------------------------------------- */}
        {/* ACCOUNT SECTION */}
        {/* -------------------------------------------------- */}
        <SectionCard title="Account">
          <SettingsRow 
            icon={<Phone className="w-5 h-5" />} 
            label="Phone Number" 
            description="+1 343-542-1282"
          />
          <SettingsRow 
            icon={<Mail className="w-5 h-5" />} 
            label="Email" 
            description="heart@healthcare.ca"
          />
          <SettingsRow 
            icon={<Settings className="w-5 h-5" />} 
            label="App Settings" 
            description="Language, units, data usage"
          />
        </SectionCard>

        {/* -------------------------------------------------- */}
        {/* DANGER ZONE */}
        {/* -------------------------------------------------- */}
        <div className="mb-6">
          <button 
            className="w-full py-3 px-4 text-red-600 font-semibold flex items-center justify-center gap-2 bg-white rounded-[22px] border border-slate-200 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </div>

        {/* -------------------------------------------------- */}
        {/* FOOTER */}
        {/* -------------------------------------------------- */}
        <div className="text-center text-xs text-slate-500 mb-6">
          <p>Version 1.0.0 • CODE BLUE DATING</p>
          <p className="mt-1">© 2025 Healthcare Professionals Network</p>
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
  <section className="rounded-[22px] border border-slate-200 bg-white/90 shadow-[0_8px_22px_rgba(15,33,58,0.15)] px-3 py-3 space-y-3 mb-6">
    <h2 className="text-sm font-semibold text-[#0F213A] flex items-center gap-2 px-2">
      <span className="h-1.5 w-1.5 rounded-full bg-[#0F213A]" />
      {title}
    </h2>
    <div className="space-y-0 last:border-b-0">
      {children}
    </div>
  </section>
);

const SettingsRow = ({ icon, label, description, action }) => (
  <div className="flex items-center justify-between py-4 px-2 border-b border-slate-200 last:border-b-0">
    <div className="flex items-center gap-3">
      <div className="text-[#0F213A]/70">{icon}</div>
      <div>
        <p className="text-sm font-medium text-slate-900">{label}</p>
        {description && (
          <p className="text-xs text-slate-500 mt-0.5">{description}</p>
        )}
      </div>
    </div>
    <div className="flex items-center gap-2">
      {action}
      {!action && <ChevronRight className="w-5 h-5 text-slate-300" />}
    </div>
  </div>
);

const ToggleSwitch = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      enabled ? 'bg-[#0F213A]' : 'bg-slate-300'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);
