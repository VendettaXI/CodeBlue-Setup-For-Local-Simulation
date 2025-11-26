// src/test-env/pages/DiscoverPage.jsx
// ------------------------------------------------------
// Discover feed with full-height hero card + collapsed info card
// - HeroCard flexes to fill vertical space between header and info strip
// - Collapsed InfoCard sits consistently above bottom nav
// - Side margins preserved
// - No vertical scroll in collapsed mode; scroll only when expanded
// ------------------------------------------------------

import React, { useState, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";

import {
  TopTabSwitcher,
  PulseGrid,
  PulseAnswerModal,
  PremiumUpsellModal,
} from "../components";

import HeroCard from "../components/HeroCard";
import InfoCard from "../components/InfoCard";

import { addHeartCheckInboxEvent } from "../utils/inboxEvents";
import { savePulseAnswer, loadPulseAnswers } from "../utils/pulseStorage";

import {
  ENABLE_PREMIUM_GATE,
  ENABLE_INBOX_EVENTS,
  CURRENT_USER_NAME,
} from "../config/flags.js";

// ------------------------------------------------------
// SAMPLE PROFILES (same as before)
// ------------------------------------------------------
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

  // ----- Michael -----
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

  // ----- Aisha -----
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

  // ----- Daniel -----
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

// ------------------------------------------------------
// Build vital tag rows
// ------------------------------------------------------
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
  if (profile.snapshotMood)
    rowB.push({ id: "mood", kind: "mood", label: profile.snapshotMood });
  if (profile.snapshotIntent)
    rowB.push({ id: "intent", kind: "intent", label: profile.snapshotIntent });

  if (Array.isArray(profile.snapshotExtras)) {
    profile.snapshotExtras.forEach((label, idx) => {
      rowB.push({ id: `extra-${idx}`, kind: "extra", label });
    });
  }

  return { rowA, rowB };
};

// ------------------------------------------------------
// MAIN PAGE
// ------------------------------------------------------
const DiscoverPage = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const [showFilters, setShowFilters] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(0);
  const [infoExpanded, setInfoExpanded] = useState(false);

  const [pulseModalOpen, setPulseModalOpen] = useState(false);
  const [activePulseQuestion, setActivePulseQuestion] = useState(null);
  const [premiumUpsell, setPremiumUpsell] = useState(false);
  const [answeredPulse, setAnsweredPulse] = useState({});

  const profile = sampleProfiles[currentMatch];
  const { rowA, rowB } = getConnectionSnapshot(profile);

  // Load saved pulse answers
  useEffect(() => {
    if (!profile || !profile.id) return;
    const saved = loadPulseAnswers(profile.id);
    if (!saved) return;

    const idMap = {};
    if (Array.isArray(profile.pulseQuestions)) {
      profile.pulseQuestions.forEach((q, idx) => {
        const a = saved[idx];
        if (a) idMap[q.id] = { answered: true, choice: a.value };
      });
    }

    setAnsweredPulse((prev) => ({ ...prev, [profile.id]: idMap }));
  }, [profile.id]);

  // Next profile
  const handleNext = () => {
    setCurrentMatch((prev) => (prev + 1) % sampleProfiles.length);
    setPulseModalOpen(false);
    setActivePulseQuestion(null);
    setInfoExpanded(false);
  };

  // How many "My Secret Rhythms" cards to show (1 or 2)
  const rhythmCount =
    profile.secretRhythms && profile.secretRhythms.length > 0
      ? Math.min(profile.secretRhythms.length, profile.id % 2 === 0 ? 2 : 1)
      : 0;

  const handleOpenPulseQuestion = (question, index) => {
    if (!ENABLE_PREMIUM_GATE) {
      setPremiumUpsell(true);
      return;
    }

    setActivePulseQuestion({
      ...question,
      profileId: profile.id,
      index,
    });
    setPulseModalOpen(true);
  };

  const handleAnswerPulse = (choice) => {
    if (!activePulseQuestion) return;
    const { profileId, id, index } = activePulseQuestion;

    if (ENABLE_INBOX_EVENTS && ENABLE_PREMIUM_GATE) {
      addHeartCheckInboxEvent(profileId, CURRENT_USER_NAME);
    }

    setAnsweredPulse((prev) => ({
      ...prev,
      [profileId]: {
        ...(prev[profileId] || {}),
        [id]: { answered: true, choice },
      },
    }));

    if (typeof index === "number") {
      savePulseAnswer(profileId, index, {
        value: choice,
        result: "kept",
        revealed: ENABLE_PREMIUM_GATE,
      });
    }

    setPulseModalOpen(false);
    setActivePulseQuestion(null);
  };

  // Root: no scroll when collapsed, scroll when expanded
  const rootClassName =
    "min-h-screen bg-[#FAFAFA] px-4" +
    (infoExpanded ? " overflow-y-auto pt-3" : " overflow-hidden pt-3");

  return (
    <div className={rootClassName}>
      {/* Inner stack. When collapsed we lock height to viewport minus nav (64px). */}
      <div
        className="mx-auto flex w-full max-w-full flex-col gap-2 px-0"
        style={!infoExpanded ? { height: "calc(100vh - 64px)" } : undefined}
      >
        {/* -------------------------------------------------- */}
        {/* TOP: Tabs centered + filter icon on the right      */}
        {/* -------------------------------------------------- */}
        <div className="pt-1 pb-1 relative flex items-center justify-center">
          <TopTabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === "discover" && (
            <button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className="absolute right-0 inline-flex items-center justify-center rounded-full p-1.5 active:scale-95 transition"
            >
              <SlidersHorizontal
                className="w-4 h-4 text-[#0F213A]"
                strokeWidth={2.2}
              />
            </button>
          )}
        </div>

        {/* -------------------------------------------------- */}
        {/* DISCOVER TAB                                       */}
        {/* -------------------------------------------------- */}
        {activeTab === "discover" && (
          <div className="flex-1 flex flex-col">
            {/* Filters row (chips) */}
            {showFilters && (
              <div className="pb-2">
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

            {/* Main stack: Hero flexes, InfoCard pinned below */}
            <div className="flex-1 flex flex-col justify-between pb-4">
              {/* HERO TAKES AVAILABLE HEIGHT IN COLLAPSED STATE */}
              <div
                className={
                  infoExpanded
                    ? "h-[180px] w-full transition-all duration-300"
                    : "flex-1 min-h-[360px] w-full transition-all duration-300"
                }
              >
                <HeroCard profile={profile} onNext={handleNext} />
              </div>

              {/* COLLAPSED / EXPANDED INFO CARD */}
              <InfoCard
                infoExpanded={infoExpanded}
                rowA={rowA}
                rowB={rowB}
                profile={profile}
                rhythmCount={rhythmCount}
                answeredPulse={answeredPulse}
                PulseGrid={PulseGrid}
                onOpenPulseQuestion={handleOpenPulseQuestion}
                onExpand={() => setInfoExpanded(true)}
                onCollapse={() => setInfoExpanded(false)}
              />
            </div>
          </div>
        )}

        {/* -------------------------------------------------- */}
        {/* MATCHES TAB (placeholder)                          */}
        {/* -------------------------------------------------- */}
        {activeTab === "matches" && (
          <div className="flex-1 flex items-center justify-center px-4 text-center text-sm text-slate-500">
            Matches view coming next ✨
          </div>
        )}
      </div>

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

      {/* Premium upsell */}
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