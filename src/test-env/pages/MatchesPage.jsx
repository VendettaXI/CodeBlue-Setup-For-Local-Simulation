// src/test-env/pages/MatchesPage.jsx
import React from "react";
import { Heart, Search } from "lucide-react";

// ---- Sample data ----------------------------------------------------

const newMatches = [
  {
    id: 1,
    name: "Sarah",
    role: "Registered Nurse",
    avatar:
      "https://images.pexels.com/photos/6129681/pexels-photo-6129681.jpeg?auto=compress&cs=tinysrgb&w=200",
    online: true,
  },
  {
    id: 2,
    name: "Michael",
    role: "Emergency Physician",
    avatar:
      "https://images.pexels.com/photos/8460098/pexels-photo-8460098.jpeg?auto=compress&cs=tinysrgb&w=200",
    online: true,
  },
  {
    id: 3,
    name: "Aisha",
    role: "Paediatric Nurse",
    avatar:
      "https://images.pexels.com/photos/6129683/pexels-photo-6129683.jpeg?auto=compress&cs=tinysrgb&w=200",
    online: false,
  },
  {
    id: 4,
    name: "Daniel",
    role: "Clinical Pharmacist",
    avatar:
      "https://images.pexels.com/photos/9451525/pexels-photo-9451525.jpeg?auto=compress&cs=tinysrgb&w=200",
    online: true,
  },
];

const chatThreads = [
  {
    id: 1,
    name: "Sarah",
    avatar:
      "https://images.pexels.com/photos/6129681/pexels-photo-6129681.jpeg?auto=compress&cs=tinysrgb&w=200",
    lastMessage: "I finally finished my night shift 😭",
    timeAgo: "2m",
    isUnread: true,
    shiftLabel: "Night shift brain",
    status: "online",
  },
  {
    id: 2,
    name: "Michael",
    avatar:
      "https://images.pexels.com/photos/8460098/pexels-photo-8460098.jpeg?auto=compress&cs=tinysrgb&w=200",
    lastMessage: "Sunday brunch sounds perfect ☕",
    timeAgo: "1h",
    isUnread: false,
    shiftLabel: "Post-ED debrief",
    status: "away",
  },
  {
    id: 3,
    name: "Aisha",
    avatar:
      "https://images.pexels.com/photos/6129683/pexels-photo-6129683.jpeg?auto=compress&cs=tinysrgb&w=200",
    lastMessage: "How was your on-call? 💛",
    timeAgo: "5m",
    isUnread: true,
    shiftLabel: "Soft life check-in",
    status: "online",
  },
  {
    id: 4,
    name: "Daniel",
    avatar:
      "https://images.pexels.com/photos/9451525/pexels-photo-9451525.jpeg?auto=compress&cs=tinysrgb&w=200",
    lastMessage: "Made it home, finally off rota duty.",
    timeAgo: "3h",
    isUnread: false,
    shiftLabel: "Pharmacy calm",
    status: "offline",
  },
  {
    id: 5,
    name: "ICU Night Crew",
    avatar:
      "https://images.pexels.com/photos/8460125/pexels-photo-8460125.jpeg?auto=compress&cs=tinysrgb&w=200",
    lastMessage: "We owe ourselves a proper debrief 🧠",
    timeAgo: "Yesterday",
    isUnread: true,
    shiftLabel: "Group chat",
    status: "offline",
  },
];

// ---- Small helper components ----------------------------------------

const SectionLabel = ({ children }) => (
  <p className="text-[11px] font-semibold tracking-[0.12em] text-slate-400 uppercase">
    {children}
  </p>
);

const OnlineDot = ({ status }) => {
  let color = "#10B981"; // online
  if (status === "away") color = "#F59E0B";
  if (status === "offline") color = "#9CA3AF";

  return (
    <span
      className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-white"
      style={{ backgroundColor: color }}
    />
  );
};

// ---- Main page ------------------------------------------------------

const MatchesPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#FFFAFC" }} // VERY FAINT ROSE
    >
      <div className="flex-1 px-5 pt-5 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[26px] font-semibold text-slate-900 tracking-tight">
            Messages
          </h1>

          <div className="flex items-center gap-3">
            <button className="h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center">
              <Search className="w-4 h-4 text-slate-500" />
            </button>
            <button className="h-9 w-9 rounded-full bg-[#D6406D] shadow-[0_6px_18px_rgba(214,64,109,0.35)] flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </button>
          </div>
        </div>

        {/* New Matches — TRUE GRID */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <SectionLabel>New matches</SectionLabel>
            <button className="text-[12px] font-medium text-[#D6406D]">
              See all
            </button>
          </div>

          {/* HARD RESET of old horizontal scroll styles */}
          <div className="w-full overflow-visible !flex-none !block">

            <div className="grid grid-cols-4 gap-5">
              {newMatches.map((match) => (
                <div key={match.id} className="flex flex-col items-center text-center">
                  
                  {/* Avatar wrapper */}
                  <div className="relative mb-2">
                    <div className="h-[70px] w-[70px] rounded-full bg-gradient-to-tr from-[#D6406D] to-[#F28BAA] p-[2px] shadow-[0_8px_20px_rgba(214,64,109,0.28)]">
                      <div className="h-full w-full rounded-full bg-white overflow-hidden">
                        <img
                          src={match.avatar}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    {match.online && <OnlineDot status="online" />}
                  </div>

                  <p className="text-[13px] font-medium text-slate-800 truncate max-w-[72px]">
                    {match.name}
                  </p>

                  <p className="text-[11px] text-slate-400 truncate max-w-[72px]">
                    {match.role}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Rhythm banner */}
        <section className="mb-6">
          <div className="rounded-[20px] bg-white shadow-lg px-4 py-4">
            <p className="text-[14px] font-semibold text-slate-900 mb-1">
              You&apos;re approaching your rhythm limit
            </p>
            <p className="text-[12px] text-slate-500 mb-3">
              When too many people are waiting for a reply, send a few messages
              or close chats before starting new ones.
            </p>

            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: "70%",
                  background:
                    "linear-gradient(90deg, #D6406D 0%, #F28BAA 100%)",
                }}
              />
            </div>
          </div>
        </section>

        {/* Chats */}
        <section className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <SectionLabel>Chats</SectionLabel>
            <p className="text-[12px] text-slate-400">
              {chatThreads.length} active
            </p>
          </div>

          {chatThreads.map((thread) => (
            <button
              key={thread.id}
              className="w-full rounded-[22px] bg-white px-4 py-3 flex items-center shadow-md active:scale-[0.99] transition-transform"
            >
              <div className="relative mr-3 shrink-0">
                <div className="h-[52px] w-[52px] rounded-full bg-slate-200 overflow-hidden">
                  <img
                    src={thread.avatar}
                    alt={thread.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <OnlineDot status={thread.status} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[15px] font-semibold text-slate-900 truncate pr-2">
                    {thread.name}
                  </p>
                  <span className="text-[11px] text-slate-400">
                    {thread.timeAgo}
                  </span>
                </div>
                <p
                  className={`text-[13px] truncate ${
                    thread.isUnread
                      ? "text-[#D6406D] font-medium"
                      : "text-slate-500"
                  }`}
                >
                  {thread.lastMessage}
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-[2px] text-[11px] text-slate-500">
                    {thread.shiftLabel}
                  </span>
                </div>
              </div>

              {thread.isUnread && (
                <span className="ml-3 h-2.5 w-2.5 rounded-full bg-[#D6406D]" />
              )}
            </button>
          ))}
        </section>
      </div>
    </div>
  );
};

export default MatchesPage;