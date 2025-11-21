// DiscoverPage.jsx
import React, { useState, useEffect } from "react";
import {
  Activity,
  Heart,
  X,
  SlidersHorizontal,
} from "lucide-react";

import {
  TopTabSwitcher,
  PulseGrid,
  PulseAnswerModal,
  PremiumUpsellModal,
  BrandHeader,
  Toast
} from "../components";

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


// --- Snapshot icons -------------------------------------------------

const SnapshotIcon = ({ kind }) => {
  switch (kind) {
    case "verified":
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3 6.5 5.2v5.7c0 4.1 2.3 7.1 5.5 8.1 3.2-1 5.5-4 5.5-8.1V5.2L12 3z" />
          <path d="m9.5 12 1.6 1.7 3.4-3.4" />
        </svg>
      );
    case "shift":
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 12.5A7.5 7.5 0 0 1 11.5 4 6 6 0 1 0 20 12.5z" />
        </svg>
      );
    case "match":
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 2 6 13h4l-1 9 7-11h-4z" />
        </svg>
      );
    case "mood":
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="8" />
          <path d="M9 10h.01M15 10h.01" />
          <path d="M8.5 14.5c1 .8 2.1 1.2 3.5 1.2s2.5-.4 3.5-1.2" />
        </svg>
      );
    case "intent":
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11.5 20s-3.3-2.2-5.1-4.5C4.3 13.5 4.2 10.4 6.5 9c1.4-.9 3.1-.3 4 1 .9-1.3 2.6-1.9 4-1 2.3 1.4 2.2 4.5.1 6.5-1.8 2.3-5.1 4.5-5.1 4.5z" />
        </svg>
      );
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 21s-4-2.6-6.2-5.4C3.1 13.5 3 9.5 6 8c2-1 4 1 4 1s2-2 4-1c3 1.5 2.9 5.5.2 7.6C16 18.4 12 21 12 21z" />
        </svg>
      );
  }
};

const SnapshotPill = ({ kind, label }) => (
  <div className="inline-flex items-center rounded-full bg-slate-100 pr-3 pl-1 py-1">
    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0F213A] text-white shadow-[0_3px_10px_rgba(15,33,58,0.45)] mr-1.5">
      <SnapshotIcon kind={kind} />
    </div>
    <span className="text-[11px] text-slate-800 whitespace-nowrap">
      {label}
    </span>
  </div>
);

// SAMPLE DATA
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

    photoUrl:
      "https://images.pexels.com/photos/6129681/pexels-photo-6129681.jpeg?auto=compress&cs=tinysrgb&w=800",

    photos: [
      "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/318419/pexels-photo-318419.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/450326/pexels-photo-450326.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],

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

    // Connection snapshot
    snapshotMood: "Warm introvert energy",
    snapshotIntent: "Slow-built long term",
    snapshotExtras: ["Soft spot giver", "Sunday cuddles coded"],

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

    snapshotMood: "Quiet storm brain",
    snapshotIntent: "Soft but honest",
    snapshotExtras: ["Plot-twist humour", "Brunch over fancy"],
    pulseChecks: [],
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

    snapshotMood: "Sunlit softie",
    snapshotIntent: "Playful long term",
    snapshotExtras: ["Chaos but gentle", "Big-sister humour"],
    pulseChecks: [],
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

    snapshotMood: "Quiet anchor energy",
    snapshotIntent: "Home-cooking nights",
    snapshotExtras: ["Cat approval required"],
    pulseChecks: [],
  },
];

// build snapshot rows
const getConnectionSnapshot = (profile) => {
  const rowA = [
    { id: "verified", kind: "verified", label: "Clinically verified" },
  ];

  if (profile.shift) {
    rowA.push({ id: "shift", kind: "shift", label: profile.shift });
  }

  if (typeof profile.shiftCompatibility === "number") {
    rowA.push({
      id: "match",
      kind: "match",
      label: `${profile.shiftCompatibility}% shift match`,
    });
  }

  const rowB = [];
  if (profile.snapshotMood) {
    rowB.push({
      id: "mood",
      kind: "mood",
      label: profile.snapshotMood,
    });
  }
  if (profile.snapshotIntent) {
    rowB.push({
      id: "intent",
      kind: "intent",
      label: profile.snapshotIntent,
    });
  }
  if (Array.isArray(profile.snapshotExtras)) {
    profile.snapshotExtras.forEach((label, idx) =>
      rowB.push({
        id: `extra-${idx}`,
        kind: "extra",
        label,
      })
    );
  }

  return { rowA, rowB };
};

const SnapshotIconPage_DEBUG = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const [showFilters, setShowFilters] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(0);
  const [infoExpanded, setInfoExpanded] = useState(false);

  // Pulse modal + answers
  const [pulseModalOpen, setPulseModalOpen] = useState(false);
  const [activePulseQuestion, setActivePulseQuestion] = useState(null);
  const [premiumUpsell, setPremiumUpsell] = useState(false);
  const [answeredPulse, setAnsweredPulse] = useState({});

  const profile = sampleProfiles[currentMatch];
  const { rowA, rowB } = getConnectionSnapshot(profile);

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
    setPulseModalOpen(false);
    setActivePulseQuestion(null);
    setInfoExpanded(false);
  };

  // Decide how many "My Secret Rhythms" prompts to show (1 or 2)
  const rhythmCount =
    profile.secretRhythms && profile.secretRhythms.length > 0
      ? Math.min(profile.secretRhythms.length, profile.id % 2 === 0 ? 2 : 1)
      : 0;

  const handleOpenPulseQuestion = (question, index) => {
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

    const isPremium = ENABLE_PREMIUM_GATE;
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

    if (typeof index === "number") {
      const newAnswer = {
        value: choice,
        result: "kept",
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

      {/* Top tab switcher */}
      <TopTabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "discover" && (
        <>
          {/* Discover title + Filters button */}
          <div className="px-4 py-3 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-900">
              Discover
            </h2>
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
          <div className="px-4 pb-16">
            <div className="max-w-3xl mx-auto transition-all">
              <div className="relative pb-8">
                {/* HERO CARD */}
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
                      {/* ROLE pill */}
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
                          <span className="truncate">
                            {profile.shift}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* (match badge removed – now part of vitals strip) */}

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
                      <span className="drop-shadow-sm">
                        View all photos
                      </span>
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
                          e.currentTarget.classList.add(
                            "animate-pulseGlow"
                          );
                          setTimeout(() => {
                            e.currentTarget.classList.remove(
                              "animate-pulseGlow"
                            );
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

                    {/* Name overlay – nudged up slightly */}
                    <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-14 flex flex-col justify-end">
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

                {/* COLLAPSIBLE INFO CARD */}
                <div className="relative z-10 -mt-7 px-3">
                  {!infoExpanded ? (
                    // COLLAPSED – dual layer glass
                    <div className="
                      rounded-[28px]
                      bg-white/20
                      backdrop-blur-2xl
                      border border-white/60
                      shadow-[0_25px_60px_rgba(15,33,58,0.40)]
                    ">
                      <div className="m-[4px] rounded-[24px] bg-white/90 shadow-[0_12px_28px_rgba(15,33,58,0.22)] px-4 py-2.5">
                        <div className="flex items-center justify-end mb-2">
                            <button
                              type="button"
                              onClick={() => setInfoExpanded(true)}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F213A] 
                                        text-[11px] text-white shadow-[0_4px_12px_rgba(15,33,58,0.5)] 
                                        active:scale-95 transition"
                            >
                              <Activity className="w-3.5 h-3.5 text-white" />
                              <span>More</span>
                            </button>
                          </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex flex-wrap gap-2">
                            {rowA.map((tag) => (
                              <SnapshotPill
                                key={tag.id}
                                kind={tag.kind}
                                label={tag.label}
                              />
                            ))}
                          </div>
                          <div className="h-[1px] bg-slate-100 my-1" />
                          <div className="flex flex-wrap gap-2">
                            {rowB.slice(0, 4).map((tag) => (
                              <SnapshotPill
                                key={tag.id}
                                kind={tag.kind}
                                label={tag.label}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // EXPANDED – matte, full profile content
                    <div className="bg-white rounded-[26px] shadow-[0_18px_40px_rgba(15,33,58,0.18)] border border-slate-100 overflow-hidden">
                      {/* Header tiny strip with Hide */}
                      <div className="px-5 pt-3 pb-1 flex justify-end bg-white">
                        <button
                          type="button"
                          onClick={() => setInfoExpanded(false)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 text-[11px] text-slate-700 border border-slate-200 shadow-[0_1px_4px_rgba(15,33,58,0.15)] active:scale-95 transition"
                        >
                          <Activity className="w-3.5 h-3.5 text-[#0F213A]" />
                          <span>Hide</span>
                        </button>
                      </div>

                      {/* BODY */}
                      <div className="px-5 pb-5 pt-1 flex flex-col gap-6 bg-white">
                        {/* Vitals strip */}
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-2">
                            {rowA.map((tag) => (
                              <SnapshotPill
                                key={tag.id}
                                kind={tag.kind}
                                label={tag.label}
                              />
                            ))}
                          </div>
                          <div className="h-[1px] bg-slate-100" />
                          <div className="flex flex-wrap gap-2">
                            {rowB.map((tag) => (
                              <SnapshotPill
                                key={tag.id}
                                kind={tag.kind}
                                label={tag.label}
                              />
                            ))}
                          </div>
                        </div>

                        {/* My Secret Rhythms */}
                        {rhythmCount > 0 && (
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

                        {/* Pulse Check grid */}
                        {ENABLE_PULSE_CHECK &&
                          profile.pulseQuestions &&
                          profile.pulseQuestions.length > 0 && (
                            <PulseGrid
                              profile={profile}
                              answeredMap={
                                answeredPulse[profile.id] || {}
                              }
                              onOpenQuestion={handleOpenPulseQuestion}
                            />
                          )}

                        {/* Personality & prompts */}
                        {profile.prompts &&
                          profile.prompts.length > 0 && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0F213A]" />
                                <h3 className="text-sm font-semibold text-slate-900">
                                  Personality & prompts
                                </h3>
                              </div>
                              <div className="space-y-3">
                                {profile.prompts
                                  .slice(0, 2)
                                  .map((p, idx) => (
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

                        {/* Glimpses – expanded only */}
                        {infoExpanded &&
                          profile.photos &&
                          profile.photos.length > 0 && (
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
                                      alt={`${profile.name}'s glimpse ${
                                        idx + 1
                                      }`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                        {/* Their vibe – expanded only */}
                        {infoExpanded &&
                          profile.myVibe &&
                          profile.myVibe.length > 0 && (
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "matches" && (
        <div className="px-4 pt-6 text-center text-sm text-slate-500">
          Matches view coming next ✨
        </div>
      )}

      {/* Pulse modal */}
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

export default SnapshotIconPage_DEBUG;