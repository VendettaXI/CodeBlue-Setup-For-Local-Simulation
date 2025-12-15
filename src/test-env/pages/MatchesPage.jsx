// src/test-env/pages/MatchesPage.jsx
import React, { useState } from "react";
import { Heart, Search, X, ChevronRight } from "lucide-react";
import ChatPage from "./ChatPage";

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
    unreadCount: 3,
    shiftLabel: "Night shift brain",
    status: "online",
    isTyping: true,
  },
  {
    id: 2,
    name: "Michael",
    avatar:
      "https://images.pexels.com/photos/8460098/pexels-photo-8460098.jpeg?auto=compress&cs=tinysrgb&w=200",
    lastMessage: "Sunday brunch sounds perfect ☕",
    timeAgo: "1h",
    isUnread: false,
    unreadCount: 0,
    shiftLabel: "Post-ED debrief",
    status: "away",
    isTyping: false,
  },
  {
    id: 3,
    name: "Aisha",
    avatar:
      "https://images.pexels.com/photos/6129683/pexels-photo-6129683.jpeg?auto=compress&cs=tinysrgb&w=200",
    lastMessage: "How was your on-call? 💛",
    timeAgo: "5m",
    isUnread: true,
    unreadCount: 1,
    shiftLabel: "Soft life check-in",
    status: "online",
    isTyping: false,
  },
  {
    id: 4,
    name: "Daniel",
    avatar:
      "https://images.pexels.com/photos/9451525/pexels-photo-9451525.jpeg?auto=compress&cs=tinysrgb&w=200",
    lastMessage: "Made it home, finally off rota duty.",
    timeAgo: "3h",
    isUnread: false,
    unreadCount: 0,
    shiftLabel: "Pharmacy calm",
    status: "offline",
    isTyping: false,
  },
  {
    id: 5,
    name: "ICU Night Crew",
    avatar:
      "https://images.pexels.com/photos/8460125/pexels-photo-8460125.jpeg?auto=compress&cs=tinysrgb&w=200",
    lastMessage: "We owe ourselves a proper debrief 🧠",
    timeAgo: "Yesterday",
    isUnread: true,
    unreadCount: 12,
    shiftLabel: "Group chat",
    status: "offline",
    isTyping: false,
    isGroup: true,
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

const TypingIndicator = () => (
  <div className="flex gap-1 items-center">
    <div className="flex gap-0.5">
      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0ms", animationDuration: "1s" }} />
      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms", animationDuration: "1s" }} />
      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "300ms", animationDuration: "1s" }} />
    </div>
    <span className="text-[11px] text-purple-500 ml-1">typing...</span>
  </div>
);

// ---- Main page ------------------------------------------------------

const MatchesPage = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);

  // If a chat is selected, show ChatPage
  if (selectedChat) {
    return (
      <ChatPage 
        contact={selectedChat}
        onBack={() => setSelectedChat(null)}
      />
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#F8F7FA" }}
    >
      <div className="flex-1 px-5 pt-5 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          {!searchOpen ? (
            <h1 className="text-[26px] font-semibold text-[#0F213A] tracking-tight">
              Matches
            </h1>
          ) : (
            <div className="flex-1 flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-sm outline-none bg-transparent"
                autoFocus
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-3">
            {!searchOpen && (
              <button 
                onClick={() => setSearchOpen(true)}
                className="h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center"
              >
                <Search className="w-4 h-4 text-slate-500" />
              </button>
            )}
            <button className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-400 to-violet-400 shadow-[0_6px_18px_rgba(168,145,205,0.4)] flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </button>
          </div>
        </div>

        {/* New Matches — Horizontal preview card */}
        <section className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <SectionLabel>New matches</SectionLabel>
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-purple-100 text-[10px] font-semibold text-purple-600">
                {newMatches.length}
              </span>
            </div>
            <button className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/85 px-3 py-1 text-[12px] font-semibold text-[#0F213A] shadow-sm hover:-translate-y-0.5 transition">
              See all
              <ChevronRight className="h-3.5 w-3.5 text-purple-500" />
            </button>
          </div>

          {/* Horizontal scrollable container */}
          <div className="rounded-[8px] shadow-lg overflow-x-auto overflow-y-hidden" style={{ backgroundColor: "rgba(168, 145, 205, 0.35)", scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
            <div className="inline-flex gap-2.5 p-3.5 min-w-min">
              {newMatches.map((match) => (
                <button
                  key={match.id}
                  className="relative w-[120px] h-[180px] flex-shrink-0 rounded-[6px] overflow-hidden shadow-[0_6px_18px_rgba(0,0,0,0.25)] bg-slate-200/80 text-left group active:scale-[0.96] transition">
                >
                  <img
                    src={match.avatar}
                    alt={match.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#0F213A]/80 opacity-85 group-hover:opacity-95 transition" />

                  {match.online && (
                    <span className="absolute top-2.5 left-2.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-white/80" />
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-3 space-y-0.5">
                    <p className="text-[13px] font-semibold text-white drop-shadow-md truncate">
                      {match.name}
                    </p>
                    <p className="text-[11px] text-white/80 truncate">
                      {match.role}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Rhythm banner */}
        <section className="mb-3">
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
                    "linear-gradient(90deg, #A891CD 0%, #B8A0D8 100%)",
                }}
              />
            </div>
          </div>
        </section>

        {/* Chats */}
        <section className="space-y-2">
          <div className="flex items-center justify-between mb-1.5">
            <SectionLabel>Chats</SectionLabel>
            <p className="text-[12px] text-slate-400">
              {chatThreads.length} active
            </p>
          </div>

          {chatThreads.map((thread) => (
            <button
              key={thread.id}
              onClick={() => setSelectedChat({
                name: thread.name,
                avatar: thread.avatar,
                status: thread.status,
                shiftLabel: thread.shiftLabel
              })}
              className="w-full rounded-[10px] bg-white px-3 py-2.5 flex items-center border border-slate-200/70 active:scale-[0.99] transition-transform"
            >
              <div className="relative mr-3 shrink-0">
                {thread.isGroup ? (
                  <div className="h-[52px] w-[52px] rounded-full bg-gradient-to-br from-purple-200 to-violet-200 overflow-hidden flex items-center justify-center">
                    <img
                      src={thread.avatar}
                      alt={thread.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-[52px] w-[52px] rounded-full bg-slate-200 overflow-hidden">
                    <img
                      src={thread.avatar}
                      alt={thread.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                {!thread.isGroup && <OnlineDot status={thread.status} />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[15px] font-semibold text-[#0F213A] truncate pr-2">
                    {thread.name}
                  </p>
                  <span className="text-[11px] text-slate-400">
                    {thread.timeAgo}
                  </span>
                </div>
                
                {thread.isTyping ? (
                  <TypingIndicator />
                ) : (
                  <p
                    className={`text-[13px] truncate ${
                      thread.isUnread
                        ? "text-purple-600 font-medium"
                        : "text-slate-500"
                    }`}
                  >
                    {thread.lastMessage}
                  </p>
                )}

                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-[2px] text-[11px] text-slate-500">
                    {thread.shiftLabel}
                  </span>
                </div>
              </div>

              {thread.isUnread && thread.unreadCount > 0 && (
                <span className="ml-3 h-5 min-w-[20px] px-1.5 rounded-full bg-purple-500 text-white text-[11px] font-semibold flex items-center justify-center">
                  {thread.unreadCount > 9 ? "9+" : thread.unreadCount}
                </span>
              )}
            </button>
          ))}
        </section>
      </div>
    </div>
  );
};

export default MatchesPage;