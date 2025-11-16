// DiscoverPage.jsx
import React, { useState, useEffect } from "react";
import {
  Activity,
  Heart,

  X,
  Zap,
  SlidersHorizontal,
  CheckCircle2,
} from "lucide-react";
import PulseAnswerModal from "../components/PulseAnswerModal";
import PremiumUpsellModal from "../components/PremiumUpsellModal";
import PulseGrid from "../components/PulseGrid";

import { addHeartCheckInboxEvent } from "../utils/inboxEvents";
import { savePulseAnswer, loadPulseAnswers } from "../utils/pulseStorage";

import {
  ENABLE_PULSE_CHECK,
  ENABLE_PREMIUM_GATE,
  ENABLE_INBOX_EVENTS,
  CURRENT_USER_NAME,
} from "../config/flags.js";

// Inline logo icon: heart + ECG pulse (gunmetal navy)
const LogoIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#0F213A"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Heart outline */}
    <path
      d="
        M12 20.4
        c-3.7-3 -6.3-5.4 -8-7.6 
        C2 10.7 1.7 8.1 3.4 6.3
        c1.7-1.7 4.5-1.9 6.3 -0.4
        c0.8 0.7 1.6 1.6 2.1 2.4
        c0.5 -0.8 1.3 -1.7 2.1 -2.4
        c1.8 -1.5 4.6 -1.3 6.3 0.4
        c1.7 1.8 1.4 4.4 0.4 6.5
        c-1.7 2.2 -4.3 4.6 -8.1 7.6
      "
    />
    {/* ECG pulse, spaced inside heart */}
    <path
      d="
        M5.2 12
        h3.0
        l1.0 -2.3
        l2.0 5.3
        l2.0 -5.5
        l1.7 3.8
        h3.8
      "
    />
  </svg>
);

// Brand header (logo + app name + tagline)
const BrandHeader = () => (
  <div className="px-4 pt-4 pb-1 flex items-center gap-3">
    <div className="shrink-0">
      <LogoIcon />
    </div>
    <div className="flex flex-col leading-tight">
      <span className="text-[21px] font-semibold text-slate-900">
        CodeBlue
      </span>
      <span className="text-[12px] text-slate-500 -mt-[2px]">
        For healthcare connections
      </span>
    </div>
  </div>
);

// SAMPLE DATA
// Each profile has:
// - hero photo (photoUrl)
// - glimpses (photos[])
// - prompts[]  -> Personality & prompts
// - secretRhythms[] -> "My Secret Rhythms" section
// - pulseQuestions[] -> Pulse Check grid
const sampleProfiles = [
  {
    id: 1,
    name: "Sarah",
    age: 29,
    distance: "2 miles away",
    location: "Emergency Department",
    role: "Registered Nurse",
    hospital: "Royal London Hospital",
    specialty: "Emergency Medicine",
    shift: "Night Shift",
    shiftCompatibility: 95,
    responseRate: "Usually responds in 2 hours",
    recentlyActive: true,

    // HERO PHOTO – warm, face-centric portrait (option C)
    photoUrl:
      "https://images.pexels.com/photos/6129681/pexels-photo-6129681.jpeg?auto=compress&cs=tinysrgb&w=800",

    // GLIMPSES – 4 lifestyle photos
    photos: [
      "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/318419/pexels-photo-318419.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/450326/pexels-photo-450326.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],

    // "My Secret Rhythms"
    secretRhythms: [
      {
        question: "What resets my mind after a night shift",
        answer:
          "Walking rescue dogs while sipping a big cup of vanilla latte and pretending my phone doesn’t exist for an hour.",
      },
      {
        question: "The part of my day I secretly look forward to",
        answer:
          "That quiet moment when I finally take my scrubs off, light a candle and catch up on messages from people I care about.",
      },
    ],

    // Pulse Check questions (True / False)
    pulseQuestions: [
      {
        id: "s1",
        label: "Night-shift confession",
        question:
          "I’ve definitely had cereal for dinner after a 12-hour shift and called it ‘self care’.",
        tone: "funny",
        correctAnswer: true,
      },
      {
        id: "s2",
        label: "Soft spot",
        question:
          "I’d rather cancel plans than miss my Sunday dog walk and coffee ritual.",
        tone: "romantic",
        correctAnswer: true,
      },
    ],

    // Personality & prompts
    prompts: [
      {
        question: "Typical Sunday",
        answer:
          "Brunch after a night shift, then disappearing into a good book until I fall asleep on the couch.",
      },
      {
        question: "I'm looking for",
        answer:
          "Someone who enjoys quiet evenings after chaotic shifts and doesn’t mind late-night coffee dates.",
      },
    ],

    myVibe: ["Coffee", "Yoga", "Calm Energy", "Soft Life"],

    pulseChecks: [
      "I fall deeper when someone remembers small details.",
      "I like clingy softness if it's with the right person.",
      "My humor gets darker when I trust someone.",
      "I rewatch sweet messages too many times.",
    ],
  },

  {
    id: 2,
    name: "Michael",
    age: 34,
    distance: "1.4 miles away",
    location: "Downtown General",
    role: "Emergency Physician",
    hospital: "Downtown General Hospital",
    specialty: "Emergency Medicine",
    shift: "Rotating Shifts",
    shiftCompatibility: 88,
    responseRate: "Replies within a day",
    recentlyActive: true,

    photoUrl:
      "https://images.pexels.com/photos/8460098/pexels-photo-8460098.jpeg?auto=compress&cs=tinysrgb&w=800",

    photos: [
      "https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/210205/pexels-photo-210205.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],

    secretRhythms: [
      {
        question: "If you ever wonder where I am",
        answer:
          "Probably grabbing a late coffee, listening to a podcast and replaying the wildest case from my shift in my head.",
      },
      {
        question: "My emotional reset button",
        answer:
          "An evening run by the river with my favourite playlist, then hot shower and takeout on the sofa.",
      },
    ],

    pulseQuestions: [
      {
        id: "m1",
        label: "Plot twist lover",
        question:
          "I secretly enjoy when the ER gets a bit chaotic, as long as everyone walks out okay.",
        tone: "dark",
        correctAnswer: true,
      },
      {
        id: "m2",
        label: "Date style",
        question:
          "My ideal first date is brunch after a long run, not a fancy dinner.",
        tone: "romantic",
        correctAnswer: true,
      },
    ],

    prompts: [
      {
        question: "A shower thought",
        answer:
          "ER shifts are plot twists — unpredictable but weirdly addictive.",
      },
      {
        question: "After work you'll find me",
        answer:
          "Running by the river with a podcast and hunting down the best brunch spot in the neighbourhood.",
      },
    ],

    myVibe: ["Runner", "Introvert", "Podcasts", "Brunch Lover"],

    pulseChecks: [
      "I fall deeper when someone remembers small details.",
      "I like clingy softness if it's with the right person.",
      "My humor gets darker when I trust someone.",
      "I rewatch sweet messages too many times.",
    ],
  },

  {
    id: 3,
    name: "Aisha",
    age: 27,
    distance: "3 miles away",
    location: "Children's Hospital",
    role: "Pediatric Nurse",
    hospital: "Children's Hospital London",
    specialty: "Pediatrics",
    shift: "Day Shifts",
    shiftCompatibility: 92,
    responseRate: "Replies within minutes",
    recentlyActive: true,

    photoUrl:
      "https://images.pexels.com/photos/6129683/pexels-photo-6129683.jpeg?auto=compress&cs=tinysrgb&w=800",

    photos: [
      "https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1445416/pexels-photo-1445416.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/414660/pexels-photo-414660.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],

    secretRhythms: [
      {
        question: "The hour I feel most alive",
        answer:
          "That golden 4pm sunlight on the children’s ward when everyone’s finally calm and laughing.",
      },
      {
        question: "My soft routine no one sees",
        answer:
          "Face mask, sleepy playlist, journaling three things I’m grateful for and sending one sweet voice note to someone I love.",
      },
    ],

    pulseQuestions: [
      {
        id: "a1",
        label: "Kid at heart",
        question:
          "I still know the words to at least three cartoon theme songs by heart.",
        tone: "funny",
        correctAnswer: true,
      },
      {
        id: "a2",
        label: "Perfect weekend",
        question:
          "My perfect weekend involves sunshine, a picnic blanket and people I love more than any party.",
        tone: "wholesome",
        correctAnswer: true,
      },
    ],

    prompts: [
      {
        question: "Best travel story",
        answer:
          "I got adopted by a group of kids during a beach cleanup in Spain and we built the most chaotic sandcastle village.",
      },
      {
        question: "Unusual skill",
        answer: "I can calm crying babies AND crying adults.",
      },
    ],

    myVibe: ["Baking", "Soft Life", "Outgoing", "Sunsets"],

    pulseChecks: [
      "I fall deeper when someone remembers small details.",
      "I like clingy softness if it's with the right person.",
      "My humor gets darker when I trust someone.",
      "I rewatch sweet messages too many times.",
    ],
  },

  {
    id: 4,
    name: "Daniel",
    age: 31,
    distance: "1 mile away",
    location: "Royal Free Hospital",
    role: "Clinical Pharmacist",
    hospital: "Royal Free Hospital",
    specialty: "Pharmacy",
    shift: "Standard Shifts",
    shiftCompatibility: 85,
    responseRate: "Usually replies in 1 hour",
    recentlyActive: false,

    photoUrl:
      "https://images.pexels.com/photos/9451525/pexels-photo-9451525.jpeg?auto=compress&cs=tinysrgb&w=800",

    photos: [
      "https://images.pexels.com/photos/349730/pexels-photo-349730.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1000447/pexels-photo-1000447.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],

    secretRhythms: [
      {
        question: "A moment I protect every day",
        answer:
          "Making dinner with a podcast playing and my phone in another room. It’s my tiny daily reset.",
      },
      {
        question: "The rhythm I hope someone will share with me",
        answer:
          "Slow Sunday mornings: coffee, vinyl records and planning a lazy day together.",
      },
    ],

    pulseQuestions: [
      {
        id: "d1",
        label: "Quiet rebel",
        question:
          "I’d pick a cosy night cooking at home over a loud night out 9 times out of 10.",
        tone: "romantic",
        correctAnswer: true,
      },
      {
        id: "d2",
        label: "Cat agenda",
        question:
          "If my cat doesn’t approve of you, there’s a 90% chance we’re not going on a second date.",
        tone: "funny",
        correctAnswer: true,
      },
    ],

    prompts: [
      {
        question: "My friends describe me as",
        answer:
          "The calm one with a suspicious ability to fix everything — from meds to broken printers.",
      },
      {
        question: "I'm most grateful for",
        answer:
          "People who ask 'How are YOU doing?' even when they need support more.",
      },
    ],

    myVibe: ["Music", "Cooking", "Cycling", "Calm Energy"],

    pulseChecks: [
      "I fall deeper when someone remembers small details.",
      "I like clingy softness if it's with the right person.",
      "My humor gets darker when I trust someone.",
      "I rewatch sweet messages too many times.",
    ],
  },
];

// Small chip for hospital in vitals
const HospitalChip = ({ name }) => {
  if (!name) return null;

  return (
    <span
      className="
        inline-flex items-center gap-1.5
        px-2.5 py-1
        rounded-full
        bg-slate-100
        text-[11px] text-slate-800
        max-w-[190px]
        overflow-hidden
        whitespace-nowrap
      "
    >
      {/* Mini hospital icon */}
      <svg
        viewBox="0 0 20 20"
        className="w-3.5 h-3.5 text-[#0F213A]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Building box */}
        <rect x="4" y="5" width="12" height="11" rx="2" />
        {/* Door */}
        <rect x="9" y="11" width="2" height="5" rx="0.8" />
        {/* Cross */}
        <path d="M10 7 v3" />
        <path d="M8.5 8.5 h3" />
      </svg>

      <span className="truncate">{name}</span>
    </span>
  );
};

const DiscoverPage = () => {
  const [activeTab] = useState("discover");
  const [showFilters, setShowFilters] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(0);

  // NEW: collapsed / expanded info card state
  const [infoExpanded, setInfoExpanded] = useState(false);

  // Pulse modal + answers
  const [pulseModalOpen, setPulseModalOpen] = useState(false);
  const [activePulseQuestion, setActivePulseQuestion] = useState(null);
  const [premiumUpsell, setPremiumUpsell] = useState(false);
  // shape: { [profileId]: { [questionId]: { answered: true, choice: 'true'|'false' } } }
  const [answeredPulse, setAnsweredPulse] = useState({});

  const profile = sampleProfiles[currentMatch];

  // Load saved pulse answers for current profile and merge into answeredPulse map
  useEffect(() => {
    if (!profile || !profile.id) return;
    const savedByIndex = loadPulseAnswers(profile.id);
    if (!savedByIndex || typeof savedByIndex !== "object") return;
    const idMap = {};
    if (Array.isArray(profile.pulseQuestions)) {
      profile.pulseQuestions.forEach((q, idx) => {
        const a = savedByIndex[idx];
        if (a) {
          idMap[q.id] = { answered: true, choice: a.value };
        }
      });
    }
    setAnsweredPulse((prev) => ({ ...prev, [profile.id]: idMap }));
  }, [profile.id]);

  const handleNext = () => {
    setCurrentMatch((prev) => (prev + 1) % sampleProfiles.length);
    // close any open modal when moving to next match
    setPulseModalOpen(false);
    setActivePulseQuestion(null);
    setInfoExpanded(false);
  };

  if (activeTab !== "discover") return null;

  // Decide how many "My Secret Rhythms" prompts to show (1 or 2) – deterministic, not random
  const rhythmCount =
    profile.secretRhythms && profile.secretRhythms.length > 0
      ? Math.min(profile.secretRhythms.length, profile.id % 2 === 0 ? 2 : 1)
      : 0;

  const handleOpenPulseQuestion = (question, index) => {
    // Premium gate: replace with real subscription flag when available
    const isPremium = ENABLE_PREMIUM_GATE;

    if (!isPremium) {
      setPremiumUpsell(true);
    } else {
      setActivePulseQuestion({
        ...question,
        profileId: profile.id,
        profileName: profile.name,
        index,
      });
      setPulseModalOpen(true);
    }
  };

  const clearPulseAnswersForProfile = () => {
    try {
      if (!profile || !profile.id) return;
      localStorage.removeItem(`pulseAnswers_${profile.id}`);
      setAnsweredPulse((prev) => ({ ...prev, [profile.id]: {} }));
      console.log(`Cleared pulse answers for profile ${profile.id}`);
    } catch (err) {
      console.error("Failed to clear pulse answers:", err);
    }
  };

  const handleAnswerPulse = (choice) => {
    if (!activePulseQuestion) return;
    const { profileId, id, profileName, index } = activePulseQuestion;

    // Trigger inbox event (premium users only)
    const isPremium = ENABLE_PREMIUM_GATE; // TODO: Replace with real premium status when available
    if (ENABLE_INBOX_EVENTS && isPremium) {
      addHeartCheckInboxEvent(profileId, CURRENT_USER_NAME);
    }

    setAnsweredPulse((prev) => {
      const prevForProfile = prev[profileId] || {};
      return {
        ...prev,
        [profileId]: {
          ...prevForProfile,
          [id]: { answered: true, choice },
        },
      };
    });

    // Persist this answer by card index for the profile
    if (typeof index === "number") {
      const newAnswer = {
        value: choice,
        result: "kept", // placeholder for compatibility label if needed later
        revealed: isPremium,
      };
      savePulseAnswer(profileId, index, newAnswer);
    }

    setPulseModalOpen(false);
    setActivePulseQuestion(null);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Brand header */}
      <BrandHeader />

      {/* Discover title + Filters button */}
      <div className="px-4 py-3 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-900">Discover</h2>
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center gap-1.5
               px-3 py-1.5 rounded-full
               bg-white/50 backdrop-blur-sm 
               border border-white/70
               text-xs font-medium text-gray-700
               shadow-[0_1px_4px_rgba(0,0,0,0.1)]
               active:scale-95 transition"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-700" />
            Filters
          </button>
          {ENABLE_PULSE_CHECK && (
            <button
              type="button"
              onClick={clearPulseAnswersForProfile}
              className="text-[11px] text-slate-500 hover:text-slate-700 underline decoration-dotted"
              title="Clear saved PulseCheck answers for this profile"
            >
              Clear Pulse
            </button>
          )}
        </div>
      </div>

      {/* Simple filters row */}
      {showFilters && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1.5 text-xs rounded-full bg-white border border-slate-200 text-slate-800">
              For you
            </button>
            <button className="px-3 py-1.5 text-xs rounded-full bg-white border border-slate-200 text-slate-500">
              New
            </button>
            <button className="px-3 py-1.5 text-xs rounded-full bg-white border border-slate-200 text-slate-500">
              Nearby
            </button>
            <button className="px-3 py-1.5 text-xs rounded-full bg-white border border-slate-200 text-slate-500">
              On call
            </button>
          </div>
        </div>
      )}

      {/* CASE FILE PROFILE VIEW */}
      <div className="px-4 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="relative pb-10">
            {/* HERO CARD – full rounded, own shadow */}
            <div className="bg-white rounded-[26px] shadow-xl border border-slate-100 overflow-hidden">
              <div className="relative">
                {profile.photoUrl ? (
                  <img
                    src={profile.photoUrl}
                    alt={profile.name}
                    className="w-full h-[560px] object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-[560px] bg-slate-200 flex items-center justify-center text-6xl">
                    {profile.photos?.[0] ?? "🩺"}
                  </div>
                )}

                {/* Bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[rgba(15,33,58,0.9)] via-[rgba(15,33,58,0.55)] to-transparent" />

                {/* Top-left pills */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 w-[72%] pointer-events-none">
                  {/* ROLE pill (no hospital) */}
                  <div
                    className="inline-flex items-center gap-2 px-2 py-1 rounded-full 
                          bg-black/35 backdrop-blur-sm text-xs text-white
                          max-w-[145px] w-max overflow-hidden"
                  >
                    <span className="inline-flex items-center gap-1 overflow-hidden">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="truncate max-w-[105px]">
                        {profile.role ?? "Healthcare professional"}
                      </span>
                    </span>
                  </div>

                  {/* SHIFT pill */}
                  {profile.shift && (
                    <div
                      className="
                        pointer-events-auto
                        inline-flex items-center gap-1.5
                        px-3 py-[6px]
                        rounded-full
                        bg-[rgba(0,0,0,0.28)]
                        backdrop-blur-sm
                        text-[11px] text-white leading-tight
                        max-w-fit
                      "
                      style={{ lineHeight: "1.15" }}
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-300"></span>
                      <span className="truncate">{profile.shift}</span>
                    </div>
                  )}
                </div>

                {/* Top-right compatibility */}
                <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur border border-white/60 shadow-sm">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-medium text-slate-900">
                    {profile.shiftCompatibility ?? 82}% match
                  </span>
                </div>

                {/* View all photos pill */}
                <button
                  type="button"
                  className="absolute bottom-4 right-4 inline-flex items-center gap-1.5
                            px-3 py-1.5 rounded-full
                            bg-white/35 backdrop-blur-sm
                            border border-white/60
                            text-xs text-white font-medium
                            shadow-[0_0_12px_rgba(0,0,0,0.25)]
                            transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/90"></span>
                  <span className="drop-shadow-sm">View all photos</span>
                </button>

                {/* Vertical action rail */}
                <div className="absolute inset-y-0 right-4 flex flex-col items-center justify-center gap-3.5 pointer-events-none">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="pointer-events-auto w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.12)] hover:scale-105 transition-transform"
                  >
                    <X className="w-6 h-6 text-slate-700" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.currentTarget.classList.add("animate-pulseGlow");
                      setTimeout(() => {
                        e.currentTarget.classList.remove("animate-pulseGlow");
                      }, 400);
                      console.log("Heartbeat", profile.name);
                    }}
                    className="pointer-events-auto w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200 flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.12)] transition-all active:scale-90 hover:scale-105 animate-[premiumPulseLoop_2s_ease-in-out_infinite]"
                  >
                    <Activity className="w-6 h-6 text-[#0F213A]" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="pointer-events-auto w-12 h-12 rounded-2xl bg-white/95 border border-slate-200 flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.12)] hover:scale-105 transition-transform"
                  >
                    <Heart className="w-6 h-6 text-rose-500" />
                  </button>
                </div>

                {/* Name + basic info on gradient */}
                <div className="absolute inset-x-0 bottom-0 px-5 pb-4 pt-10 flex flex-col justify-end">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-white text-2xl font-semibold drop-shadow">
                          {profile.name}, {profile.age}
                        </span>
                        {profile.distance && (
                          <span className="text-white/80 text-xs">
                            {profile.distance}
                          </span>
                        )}
                      </div>
                      {profile.location && (
                        <div className="text-white/80 text-xs mt-1">
                          {profile.location}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FLOATING COLLAPSIBLE INFO CARD */}
            <div className="relative z-10 -mt-7 px-3">
              <div className="bg-white rounded-[24px] shadow-[0_18px_40px_rgba(15,33,58,0.18)] border border-slate-100 overflow-hidden">
                {/* ECG + expand header strip */}
                <div className="relative bg-white">
                  <div className="h-7 flex items-center justify-center">
                    <svg
                      viewBox="0 0 200 24"
                      className="w-40 h-4 text-slate-300"
                      fill="none"
                    >
                      <path
                        d="M0 12 H60 L75 4 L90 20 L105 6 L120 18 H200"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <button
                    type="button"
                    onClick={() => setInfoExpanded((v) => !v)}
                    className="absolute top-1 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 border border-slate-200 text-[11px] text-slate-700 shadow-[0_1px_6px_rgba(15,33,58,0.18)] active:scale-95 transition"
                  >
                    <Activity className="w-3.5 h-3.5 text-[#0F213A]" />
                    <span className="hidden sm:inline">
                      {infoExpanded ? "Hide full profile" : "Open full profile"}
                    </span>
                    <span className="sm:hidden">
                      {infoExpanded ? "Hide" : "More"}
                    </span>
                  </button>
                </div>

                {/* BODY – CASE FILE INFO */}
                <div className="px-5 pb-5 pt-2 space-y-6 bg-white">
                  {/* Vitals strip (always visible) */}
                  <div className="space-y-1">
                    {/* PRIMARY ROW */}
                    <div className="flex flex-wrap gap-2 [&>*]:whitespace-nowrap">
                      {/* Verified */}
                      <span
                        className="inline-flex items-center gap-1 
                          px-2 py-[5px] 
                          rounded-full 
                          bg-slate-100 
                          text-[11px] text-slate-800
                        "
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0F213A]" />
                        Verified healthcare professional
                      </span>

                      {/* Hospital */}
                      {profile.hospital && (
                        <HospitalChip name={profile.hospital} />
                      )}

                      {/* Shift compatibility */}
                      {typeof profile.shiftCompatibility === "number" && (
                        <span
                          className="inline-flex items-center gap-1 
                            px-2 py-[5px] 
                            rounded-full 
                            bg-slate-100 
                            text-[11px] text-slate-800
                          "
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                          Shift pattern compatible
                        </span>
                      )}
                    </div>

                    {/* SECONDARY ROW */}
                    <div className="flex flex-wrap gap-2 mt-1 [&>*]:whitespace-nowrap">
                      <span
                        className="inline-flex items-center gap-1 
                          px-2 py-[5px] 
                          rounded-full 
                          bg-slate-100 
                          text-[11px] text-slate-800
                        "
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        Work/life balance: Medium
                      </span>

                      {profile.responseRate && (
                        <span
                          className="inline-flex items-center gap-1 
                            px-2 py-[5px] 
                            rounded-full 
                            bg-slate-100 
                            text-[11px] text-slate-800
                          "
                        >
                          ⏱ {profile.responseRate}
                        </span>
                      )}

                      {profile.recentlyActive && (
                        <span
                          className="
                            inline-flex items-center gap-1 
                            px-2 py-[5px] 
                            rounded-full 
                            bg-emerald-50 
                            text-[11px] text-emerald-700
                          "
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Recently active
                        </span>
                      )}
                    </div>
                  </div>

                  {/* My Secret Rhythms – only when expanded */}
                  {rhythmCount > 0 && infoExpanded && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0F213A]" />
                        <h3 className="text-sm font-semibold text-slate-900">
                          My Secret Rhythms
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {profile.secretRhythms
                          .slice(0, rhythmCount)
                          .map((r, idx) => (
                            <div
                              key={idx}
                              className="rounded-2xl border border-slate-100 bg-slate-50/70 px-3 py-2.5 flex gap-2"
                            >
                              <div className="mt-1">
                                <Activity className="w-4 h-4 text-[#0F213A]/80" />
                              </div>
                              <div>
                                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                  {r.question}
                                </div>
                                <div className="mt-1 text-sm text-slate-800 leading-relaxed">
                                  {r.answer}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Pulse Check grid – only when expanded */}
                  {ENABLE_PULSE_CHECK &&
                    infoExpanded &&
                    profile.pulseQuestions &&
                    profile.pulseQuestions.length > 0 && (
                      <PulseGrid
                        profile={profile}
                        answeredMap={answeredPulse[profile.id] || {}}
                        onOpenQuestion={handleOpenPulseQuestion}
                      />
                    )}

                  {/* Personality & prompts – only when expanded */}
                  {profile.prompts &&
                    profile.prompts.length > 0 &&
                    infoExpanded && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0F213A]" />
                          <h3 className="text-sm font-semibold text-slate-900">
                            Personality & prompts
                          </h3>
                        </div>
                        <div className="space-y-3">
                          {profile.prompts.slice(0, 2).map((p, idx) => (
                            <div
                              key={idx}
                              className="rounded-2xl border border-slate-100 bg-slate-50/70 px-3 py-2.5"
                            >
                              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                {p.question}
                              </div>
                              <div className="mt-1 text-sm text-slate-800">
                                {p.answer}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Glimpses – visible collapsed & expanded */}
                  {profile.photos && profile.photos.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0F213A]" />
                        <h3 className="text-sm font-semibold text-slate-900">
                          Glimpses
                        </h3>
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-1">
                        {profile.photos.map((ph, idx) => (
                          <div
                            key={idx}
                            className="flex-shrink-0 w-24 h-24 rounded-[18px] bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-100 shadow-[0_4px_10px_rgba(15,25,33,0.08)]"
                          >
                            <img
                              src={ph}
                              alt={`${profile.name}'s glimpse ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Their vibe – visible collapsed & expanded */}
                  {profile.myVibe && profile.myVibe.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0F213A]" />
                        <h3 className="text-sm font-semibold text-slate-900">
                          Their vibe
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {profile.myVibe.map((v, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full bg-slate-100 text-xs text-slate-800"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer inside floating card */}
                <div className="border-t border-slate-100 px-5 py-3 flex items-center justify-between bg-white/80 backdrop-blur-sm">
                  <div className="text-xs text-slate-500">
                    Case {currentMatch + 1} of {sampleProfiles.length}
                  </div>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-800 hover:bg-slate-100"
                  >
                    Next suggested match <span className="text-sm">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pulse modal (lives at page level so it overlays everything cleanly) */}
      {pulseModalOpen && activePulseQuestion && (
        <PulseAnswerModal
          question={activePulseQuestion.question}
          onAnswer={handleAnswerPulse}
          onClose={() => {
            setPulseModalOpen(false);
            setActivePulseQuestion(null);
          }}
        />
      )}

      {/* Premium upsell modal */}
      {premiumUpsell && (
        <PremiumUpsellModal
          onClose={() => setPremiumUpsell(false)}
          onUpgrade={() => {
            console.log("Redirect to premium purchase");
            setPremiumUpsell(false);
          }}
        />
      )}
    </div>
  );
};

export default DiscoverPage;