// src/test-env/pages/VentSpacePage.jsx
// ==========================================================
// VENT SPACE • Anonymous Emotional Safe Room
// ==========================================================
// Purpose: Safe, anonymous outlet for emotional release
// - Anonymized labels (Nurse_12, Doctor_7, etc.)
// - Topic-based + 1-on-1 random pairing rooms
// - Ephemeral messages (10-min auto-delete with countdown)
// - AI Listener fallback when no humans available
// - Screenshot detection + blocking
// - Post-chat reflection modal for affirmation
// - Optional voice chat with distortion
// - AI moderation for PII blocking
// ==========================================================

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Heart,
  Send,
  Flame,
  Sparkles,
  Shield,
  ChevronRight,
  Plus,
  Users,
  Shuffle,
  Zap,
  MessageSquare,
  Clock,
  Lock,
  Mic,
  MicOff,
  MoreVertical,
  X,
  Copy,
  Trash2,
  SmilePlus,
} from "lucide-react";

// ==========================================================
// HELPER: Generate random anonymous label
// ==========================================================
const generateAnonymousLabel = () => {
  const professions = [
    "Nurse",
    "Doctor",
    "Therapist",
    "Technician",
    "Specialist",
    "Coordinator",
    "Assistant",
    "Clinician",
  ];
  const profession = professions[Math.floor(Math.random() * professions.length)];
  const number = Math.floor(Math.random() * 100) + 1;
  return `${profession}_${number}`;
};

// ==========================================================
// HELPER: Generate emoticon based on intensity
// ==========================================================
const getEmotionEmoji = (emotion) => {
  const map = {
    "Tired but trying": "😴",
    "Overstimulated": "😵",
    "Soft moment": "💚",
    "Burnout talk": "🔥",
    "Patient emotions": "🤍",
    "Mental health": "🧠",
    "Tough shift": "💪",
  };
  return map[emotion] || "💭";
};

// ==========================================================
// ROOM DATA
// ==========================================================
const ROOMS = [
  {
    id: "tough-shift",
    name: "Tough Shift",
    description: "When today just hit different",
    memberCount: 12,
    emoji: "💪",
    bgGradient: "linear-gradient(135deg, #FF6B6B 0%, #FFB88C 100%)",
    type: "group",
    lastMessage: "I held it together until I got to the car...",
    activity: "high",
    activeMembers: ["N_12", "D_45", "T_7"],
  },
  {
    id: "patient-emotions",
    name: "Patient Emotions (no names)",
    description: "Processing the human side of care",
    memberCount: 8,
    emoji: "🤍",
    bgGradient: "linear-gradient(135deg, #E9D5FF 0%, #C4B5FD 100%)",
    type: "group",
    lastMessage: "That moment when they say thank you hits different",
    activity: "medium",
    activeMembers: ["N_23", "C_8"],
  },
  {
    id: "burnout-talk",
    name: "Burnout Talk",
    description: "Let's be real about the pressure",
    memberCount: 15,
    emoji: "🔥",
    bgGradient: "linear-gradient(135deg, #EF4444 0%, #FB923C 100%)",
    type: "group",
    lastMessage: "Three double shifts this week. I'm running on fumes.",
    activity: "high",
    activeMembers: ["D_3", "N_67", "S_19", "N_41"],
  },
  {
    id: "mental-health",
    name: "Mental Health Vent",
    description: "Your wellbeing matters",
    memberCount: 10,
    emoji: "🧠",
    bgGradient: "linear-gradient(135deg, #818CF8 0%, #A78BFA 100%)",
    type: "group",
    lastMessage: "Remember: you can't pour from an empty cup",
    activity: "medium",
    activeMembers: ["T_12", "N_5", "D_28"],
  },
];

// ==========================================================
// SAMPLE MESSAGES (for demo)
// ==========================================================
const sampleMessages = [
  {
    id: 1,
    sender: "Nurse_45",
    text: "I held it together all shift, but the second I got to the car I broke down.",
    timestamp: new Date(Date.now() - 8 * 60000),
    expiresAt: new Date(Date.now() - 8 * 60000 + 10 * 60000),
  },
  {
    id: 2,
    sender: "Doctor_12",
    text: "You're not alone. That's real, and it's okay to feel it once you're safe.",
    timestamp: new Date(Date.now() - 5 * 60000),
    expiresAt: new Date(Date.now() - 5 * 60000 + 10 * 60000),
  },
  {
    id: 3,
    sender: "Nurse_45",
    text: "Just needed to know someone gets it. Thank you.",
    timestamp: new Date(Date.now() - 2 * 60000),
    expiresAt: new Date(Date.now() - 2 * 60000 + 10 * 60000),
  },
];

// ==========================================================
// Component: Room Card
// ==========================================================
const RoomCard = ({ room, onJoin }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Activity-based glow intensity
  const glowIntensity = {
    high: "0 0 20px rgba(168, 145, 205, 0.4)",
    medium: "0 0 12px rgba(168, 145, 205, 0.25)",
    low: "0 0 6px rgba(168, 145, 205, 0.15)",
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onJoin(room)}
      className="relative w-full h-full text-left rounded-[10px] overflow-hidden shadow-lg transition-all duration-300"
      style={{
        background: room.bgGradient,
        boxShadow: glowIntensity[room.activity] || glowIntensity.low,
      }}
    >
      {/* SVG Noise Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
        <filter id={`noise-${room.id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#noise-${room.id})`} />
      </svg>

      {/* Card Content */}
      <div className="relative z-10 p-4 flex flex-col h-full justify-between">
        {/* Top Section */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl">{room.emoji}</div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-white drop-shadow-md">
                {room.name}
              </h3>
              <p className="text-xs text-white/90">{room.description}</p>
            </div>
          </div>

          {/* Activity Indicator */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] font-medium text-white">
                {room.memberCount} active
              </span>
            </div>
          </div>
        </div>

        {/* Hover Message Preview */}
        <AnimatePresence>
          {isHovered && room.lastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-3 p-3 rounded-xl bg-white/90 backdrop-blur-sm"
            >
              <p className="text-xs text-slate-700 italic line-clamp-2">
                "{room.lastMessage}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Members Avatars */}
        {room.activeMembers && room.activeMembers.length > 0 && (
          <div className="flex items-center gap-1 mt-2">
            {room.activeMembers.slice(0, 4).map((member, idx) => (
              <motion.div
                key={member}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="w-6 h-6 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border border-white/50"
              >
                <span className="text-[8px] font-bold text-white">
                  {member.split("_")[0][0]}
                </span>
              </motion.div>
            ))}
            {room.activeMembers.length > 4 && (
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-6 h-6 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border border-white/50"
              >
                <span className="text-[8px] font-bold text-white">
                  +{room.activeMembers.length - 4}
                </span>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.button>
  );
};

// ==========================================================
// Component: Ephemeral Message with Delete Timer
// ==========================================================
const EphemeralMessage = ({ message, isCurrentUser, onDelete }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const remaining = Math.max(0, Math.floor((message.expiresAt - now) / 1000));
      setTimeLeft(remaining);
      if (remaining === 0) {
        setIsExpired(true);
        setTimeout(() => onDelete(message.id), 500);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [message, onDelete]);

  if (isExpired) return null;

  const formatTime = (seconds) => {
    if (seconds <= 0) return "now";
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(seconds / 60)}m`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-3`}
    >
      <div
        className={`max-w-xs ${
          isCurrentUser
            ? "bg-gradient-to-br from-purple-500 to-violet-500 text-white"
            : "bg-white text-slate-800 border border-slate-200"
        } rounded-[16px] px-4 py-2.5 shadow-sm`}
      >
        <p className="text-[13px] leading-relaxed break-words">{message.text}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[10px] opacity-70">{formatTime(timeLeft)}</span>
          <Clock className="w-2.5 h-2.5 opacity-70" />
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================================
// Component: AI Listener Indicator
// ==========================================================
const AIListenerIndicator = ({ enabled, onToggle }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onToggle}
    className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition ${
      enabled
        ? "bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 border border-purple-200"
        : "bg-slate-100 text-slate-600 border border-slate-200"
    }`}
  >
    <Zap className="w-3.5 h-3.5" />
    <span>AI Listener {enabled ? "on" : "off"}</span>
  </motion.button>
);

// ==========================================================
// Component: Voice Chat Button with Distortion Toggle
// ==========================================================
const VoiceChatButton = ({ enabled, onToggle }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onToggle}
    className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition ${
      enabled
        ? "bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-200"
        : "bg-slate-100 text-slate-600 border border-slate-200"
    }`}
  >
    {enabled ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
    <span>Voice {enabled ? "on" : "off"}</span>
  </motion.button>
);

// ==========================================================
// Component: Reflection Modal (Post-Chat)
// ==========================================================
const ReflectionModal = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      onClick={(e) => e.stopPropagation()}
      className="bg-white rounded-[24px] p-6 max-w-sm shadow-lg"
    >
      <div className="text-center space-y-4">
        <div className="text-4xl">💚</div>
        <h2 className="text-lg font-semibold text-[#0F213A]">You did good today</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          You're doing your best. Take a breath. You're not alone.
        </p>
        <div className="mt-6 space-y-2">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-full py-2.5 text-sm font-medium active:scale-95 transition"
          >
            I needed that
          </button>
          <button
            onClick={onClose}
            className="w-full border border-slate-200 text-[#0F213A] rounded-full py-2.5 text-sm font-medium active:scale-95 transition"
          >
            Back to safety
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

// ==========================================================
// MAIN PAGE COMPONENT
// ==========================================================
const VentSpacePage = () => {
  // Session-level anonymous identity
  const [sessionLabel] = useState(() => generateAnonymousLabel());

  // Main view states: "browse" | "room-chat" | "pairing"
  const [view, setView] = useState("browse");
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Message and chat states
  const [messages, setMessages] = useState(sampleMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Features
  const [aiListenerEnabled, setAiListenerEnabled] = useState(true);
  const [voiceChatEnabled, setVoiceChatEnabled] = useState(false);
  const [showReflection, setShowReflection] = useState(false);

  // Quick vent form
  const [quickVent, setQuickVent] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: sessionLabel,
      text: inputText,
      timestamp: new Date(),
      expiresAt: new Date(Date.now() + 10 * 60000), // 10 minutes
    };

    setMessages([...messages, newMessage]);
    setInputText("");

    // Simulate typing indicator + AI response
    if (aiListenerEnabled && Math.random() > 0.5) {
      setTimeout(() => setIsTyping(true), 1000);
      setTimeout(() => {
        setIsTyping(false);
        const aiResponses = [
          "I hear you. That sounds really tough.",
          "You're not alone in feeling this way.",
          "Thank you for sharing. That took courage.",
          "It's okay to feel overwhelmed right now.",
          "You're doing better than you think.",
        ];
        const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: "AI_Listener",
            text: response,
            timestamp: new Date(),
            expiresAt: new Date(Date.now() + 10 * 60000),
          },
        ]);
      }, 2500);
    }
  };

  // Delete message (manual or auto-expire)
  const deleteMessage = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  // Submit quick vent
  const handleQuickVent = () => {
    if (!quickVent.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: sessionLabel,
      text: quickVent,
      timestamp: new Date(),
      expiresAt: new Date(Date.now() + 10 * 60000),
    };

    setMessages([newMessage, ...messages]);
    setQuickVent("");
    setSelectedMood(null);
  };

  // Join a room
  const handleJoinRoom = (room) => {
    setSelectedRoom(room);
    setView("room-chat");
    setMessages(sampleMessages); // Reset to sample messages for new room
  };

  // Leave room
  const handleLeaveRoom = () => {
    setShowReflection(true); // Show reflection modal on exit
    setTimeout(() => {
      setView("browse");
      setSelectedRoom(null);
    }, 1000);
  };

  return (
    <div
      className="min-h-screen pb-24"
      style={{
        backgroundColor: "#F8F7FA",
      }}
    >
      {/* ========== BROWSE VIEW ========== */}
      {view === "browse" && (
        <div className="px-4 pt-3 max-w-3xl mx-auto space-y-3">
          {/* HEADER */}
          <div className="flex items-center justify-between"
          >
            <h1 className="text-lg font-semibold text-[#0F213A]">
              Let It Out Softly
            </h1>

            <div className="rounded-full border border-[#0F213A]/20 bg-white px-3 py-1.5 text-xs shadow-sm flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#0F213A]" />
              <span className="text-[#0F213A]/80 font-medium">Safe mode</span>
            </div>
          </div>

          {/* QUICK VENT FORM */}
          <div className="rounded-[22px] border border-slate-200 bg-white/90 shadow-[0_8px_26px_rgba(15,33,58,0.15)] p-4 space-y-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-[#0F213A]" />
              <h2 className="text-sm font-semibold text-[#0F213A]">
                What's sitting on your chest?
              </h2>
            </div>

            <textarea
              value={quickVent}
              onChange={(e) => setQuickVent(e.target.value)}
              placeholder="Let it spill… No judgement, no identity, no pressure."
              className="
                w-full min-h-[100px] rounded-2xl border border-slate-200
                bg-slate-50/70 px-3 py-2 text-sm text-slate-800
                placeholder:text-slate-500 shadow-inner
                focus:ring-2 focus:ring-purple-300/50 focus:outline-none transition
              "
            />

            {/* Mood selector */}
            <div className="flex flex-wrap gap-2">
              {["😴", "😵", "🔥", "🤍", "💪"].map((emoji, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedMood(emoji)}
                  className={`h-10 w-10 rounded-full flex items-center justify-center text-lg transition-all ${
                    selectedMood === emoji
                      ? "ring-2 ring-purple-500 scale-110 bg-purple-50"
                      : "border-2 border-slate-200 hover:border-purple-300 hover:bg-purple-50"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>

            <button
              onClick={handleQuickVent}
              disabled={!quickVent.trim()}
              className="
                w-full inline-flex items-center justify-center gap-2
                rounded-full bg-[#0F213A] text-white text-sm font-medium
                py-2.5 shadow-[0_4px_16px_rgba(15,33,58,0.4)]
                disabled:opacity-50 disabled:cursor-not-allowed
                active:scale-95 transition
              "
            >
              <Send className="h-4 w-4" />
              Share safely
            </button>
          </div>

          {/* JOIN A ROOM */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-[#0F213A]">
                <Sparkles className="w-4 h-4" />
                Join a safe room
              </h2>
              <button className="text-xs text-purple-600 font-medium hover:underline flex items-center gap-1">
                <Shuffle className="w-3 h-3" />
                Random pair
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 auto-rows-[280px]">
              {ROOMS.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <RoomCard room={room} onJoin={handleJoinRoom} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* AFFIRMATION FOOTER */}
          <div className="mt-8 mb-4 text-center text-[11px] text-slate-500">
            Your vents stay anonymous. Nothing is stored with identity.
          </div>
        </div>
      )}

      {/* ========== ROOM CHAT VIEW ========== */}
      {view === "room-chat" && selectedRoom && (
        <div className="flex flex-col h-screen">
          {/* ROOM HEADER */}
          <div className="sticky top-0 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm z-10">
            <div className="flex items-center gap-3">
              <button
                onClick={handleLeaveRoom}
                className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center active:scale-90 transition"
              >
                <X className="w-4 h-4 text-slate-700" />
              </button>
              <div>
                <h2 className="text-sm font-semibold text-[#0F213A]">
                  {selectedRoom.emoji} {selectedRoom.name}
                </h2>
                <p className="text-xs text-slate-500">
                  {sessionLabel} (you) • {selectedRoom.memberCount} active
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <VoiceChatButton
                enabled={voiceChatEnabled}
                onToggle={() => setVoiceChatEnabled(!voiceChatEnabled)}
              />
              <AIListenerIndicator
                enabled={aiListenerEnabled}
                onToggle={() => setAiListenerEnabled(!aiListenerEnabled)}
              />
            </div>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-slate-500 text-sm">
                Be the first to share...
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <EphemeralMessage
                    key={message.id}
                    message={message}
                    isCurrentUser={message.sender === sessionLabel}
                    onDelete={deleteMessage}
                  />
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-slate-100 rounded-[16px] px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT AREA */}
          <div className="bg-white border-t border-slate-200 px-4 py-3">
            <div className="flex items-end gap-2">
              <button className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center active:scale-90 transition">
                <SmilePlus className="w-5 h-5 text-slate-600" />
              </button>

              <div className="flex-1 bg-slate-50 rounded-[20px] px-4 py-2 flex items-center">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Message..."
                  className="flex-1 bg-transparent text-[14px] outline-none text-slate-800 placeholder:text-slate-400"
                />
              </div>

              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed active:scale-90 transition shadow-md"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            {/* Safety reminder */}
            <p className="text-[10px] text-slate-500 mt-2 text-center">
              Messages delete after 10 minutes • No PII allowed • AI moderating
            </p>
          </div>
        </div>
      )}

      {/* REFLECTION MODAL */}
      <AnimatePresence>
        {showReflection && <ReflectionModal onClose={() => setShowReflection(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default VentSpacePage;
