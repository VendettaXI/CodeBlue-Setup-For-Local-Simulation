// DiscoverPage.jsx
import React, { useState } from "react";
import { Activity, Heart, X, Zap } from "lucide-react";

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

// SAMPLE DATA (you already pasted this; keeping it here so file is complete)
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

    // HERO PHOTO – face-centric female nurse
    photoUrl:
      "https://images.pexels.com/photos/6129683/pexels-photo-6129683.jpeg?auto=compress&cs=tinysrgb&w=800",

    // GLIMPSES – 4 real lifestyle photos
    photos: [
      "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/318419/pexels-photo-318419.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/450326/pexels-photo-450326.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],

    prompts: [
      {
        question: "Typical Sunday",
        answer:
          "Walking rescue dogs while sipping a big cup of vanilla latte.",
      },
      {
        question: "I'm looking for",
        answer:
          "Someone who enjoys quiet evenings after chaotic shifts.",
      },
    ],

    myVibe: ["Coffee", "Yoga", "Calm Energy", "Soft Life"],
  },

  // -------------------------------------------------------------
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
      "https://images.pexels.com/photos/3622645/pexels-photo-3622645.jpeg?auto=compress&cs=tinysrgb&w=600", // coffee counter
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600", // minimalist desk
      "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=600", // cozy cat
      "https://images.pexels.com/photos/2117937/pexels-photo-2117937.jpeg?auto=compress&cs=tinysrgb&w=600", // plant aesthetic
    ],

    prompts: [
      {
        question: "Shower thought",
        answer: "ER days feel long, but the stories last forever.",
      },
      {
        question: "After work you'll find me",
        answer: "At a cozy café with a book nobody asked me to read.",
      },
    ],

    myVibe: ["Introvert", "Books", "Calm", "Warm Lighting"],
  },

  // -------------------------------------------------------------
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
      "https://images.pexels.com/photos/1394882/pexels-photo-1394882.jpeg?auto=compress&cs=tinysrgb&w=600", // soft pastries
      "https://images.pexels.com/photos/3681649/pexels-photo-3681649.jpeg?auto=compress&cs=tinysrgb&w=600", // cozy café vibes
      "https://images.pexels.com/photos/3551714/pexels-photo-3551714.jpeg?auto=compress&cs=tinysrgb&w=600", // warm plants
      "https://images.pexels.com/photos/2062436/pexels-photo-2062436.jpeg?auto=compress&cs=tinysrgb&w=600", // books + mug
    ],

    prompts: [
      {
        question: "Best travel story",
        answer: "A local family in Lisbon taught me how to bake pastel de nata.",
      },
      {
        question: "Unusual skill",
        answer: "I can make any child laugh in under 10 seconds.",
      },
    ],

    myVibe: ["Pastries", "Warm", "Outgoing", "Soft Girl"],
  },

  // -------------------------------------------------------------
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
      "https://images.pexels.com/photos/3759085/pexels-photo-3759085.jpeg?auto=compress&cs=tinysrgb&w=600", // cozy candle desk
      "https://images.pexels.com/photos/3182778/pexels-photo-3182778.jpeg?auto=compress&cs=tinysrgb&w=600", // warm wood interior
      "https://images.pexels.com/photos/302901/pexels-photo-302901.jpeg?auto=compress&cs=tinysrgb&w=600", // latte art
      "https://images.pexels.com/photos/706377/pexels-photo-706377.jpeg?auto=compress&cs=tinysrgb&w=600", // soft shadows
    ],

    prompts: [
      {
        question: "My friends describe me as",
        answer: "A calm soul with a surprisingly dark humor streak.",
      },
      {
        question: "I'm most grateful for",
        answer: "Unhurried mornings and people with gentle hearts.",
      },
    ],

    myVibe: ["Warm Light", "Coffee", "Minimalist", "Calm Energy"],
  },

  // -------------------------------------------------------------
  {
    id: 5,
    name: "Elena",
    age: 33,
    distance: "5 miles away",
    location: "St. Mary's Hospital",
    role: "Radiographer",
    hospital: "St. Mary's Hospital",
    specialty: "Medical Imaging",
    shift: "Mixed Shifts",
    shiftCompatibility: 91,
    responseRate: "Replies within 3 hours",
    recentlyActive: true,

    photoUrl:
      "https://images.pexels.com/photos/5452206/pexels-photo-5452206.jpeg?auto=compress&cs=tinysrgb&w=800",

    photos: [
      "https://images.pexels.com/photos/984602/pexels-photo-984602.jpeg?auto=compress&cs=tinysrgb&w=600", // warm mountains
      "https://images.pexels.com/photos/713046/pexels-photo-713046.jpeg?auto=compress&cs=tinysrgb&w=600", // aesthetic candles
      "https://images.pexels.com/photos/17679/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600", // cozy hallway
      "https://images.pexels.com/photos/881127/pexels-photo-881127.jpeg?auto=compress&cs=tinysrgb&w=600", // soft food
    ],

    prompts: [
      {
        question: "Something I learned recently",
        answer: "Your energy introduces you before you even speak.",
      },
      {
        question: "My ideal Sunday",
        answer: "A museum visit, candle shopping, and sushi.",
      },
    ],

    myVibe: ["Art", "Candle Lover", "Warm", "Soft Minimalist"],
  },

  // -------------------------------------------------------------
  {
    id: 6,
    name: "Ryan",
    age: 28,
    distance: "0.9 miles away",
    location: "King's College Hospital",
    role: "Physiotherapist",
    hospital: "King's College Hospital",
    specialty: "Orthopedics",
    shift: "Day Shifts",
    shiftCompatibility: 89,
    responseRate: "Replies instantly",
    recentlyActive: true,

    photoUrl:
      "https://images.pexels.com/photos/7594403/pexels-photo-7594403.jpeg?auto=compress&cs=tinysrgb&w=800",

    photos: [
      "https://images.pexels.com/photos/265179/pexels-photo-265179.jpeg?auto=compress&cs=tinysrgb&w=600", // soft forest
      "https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&w=600", // warm dog
      "https://images.pexels.com/photos/230477/pexels-photo-230477.jpeg?auto=compress&cs=tinysrgb&w=600", // cozy reading
      "https://images.pexels.com/photos/105030/pexels-photo-105030.jpeg?auto=compress&cs=tinysrgb&w=600", // coffee + notebook
    ],

    prompts: [
      {
        question: "My love language",
        answer: "Acts of service and warm silence.",
      },
      {
        question: "A perfect date",
        answer: "Coffee → nature walk → unfiltered conversation.",
      },
    ],

    myVibe: ["Dogs", "Soft Life", "Outdoors", "Gentle Energy"],
  },

  // -------------------------------------------------------------
  {
    id: 7,
    name: "Chloe",
    age: 30,
    distance: "2.7 miles away",
    location: "Queen Charlotte Hospital",
    role: "Midwife",
    hospital: "Queen Charlotte Hospital",
    specialty: "Maternity & Delivery",
    shift: "Night Shifts",
    shiftCompatibility: 84,
    responseRate: "Replies within an hour",
    recentlyActive: false,

    photoUrl:
      "https://images.pexels.com/photos/5452207/pexels-photo-5452207.jpeg?auto=compress&cs=tinysrgb&w=800",

    photos: [
      "https://images.pexels.com/photos/327661/pexels-photo-327661.jpeg?auto=compress&cs=tinysrgb&w=600", // pastries
      "https://images.pexels.com/photos/349610/pexels-photo-349610.jpeg?auto=compress&cs=tinysrgb&w=600", // cozy café
      "https://images.pexels.com/photos/196666/pexels-photo-196666.jpeg?auto=compress&cs=tinysrgb&w=600", // flowers aesthetic
      "https://images.pexels.com/photos/446278/pexels-photo-446278.jpeg?auto=compress&cs=tinysrgb&w=600", // sunlight room
    ],

    prompts: [
      {
        question: "A random fact I love",
        answer:
          "Babies born at night tend to have calmer temperaments — maybe because it's quiet.",
      },
      {
        question: "My green flag",
        answer: "Kind voice, warm energy, intentional conversation.",
      },
    ],

    myVibe: ["Soft Girl", "Pastries", "Warm", "Flowers"],
  },

  // -------------------------------------------------------------
  {
    id: 8,
    name: "Samuel",
    age: 35,
    distance: "6 miles away",
    location: "London Heart Institute",
    role: "Cardiologist",
    hospital: "London Heart Institute",
    specialty: "Cardiology",
    shift: "Standard Shifts",
    shiftCompatibility: 90,
    responseRate: "Usually replies same day",
    recentlyActive: true,

    photoUrl:
      "https://images.pexels.com/photos/8460379/pexels-photo-8460379.jpeg?auto=compress&cs=tinysrgb&w=800",

    photos: [
      "https://images.pexels.com/photos/245240/pexels-photo-245240.jpeg?auto=compress&cs=tinysrgb&w=600", // wine dinner
      "https://images.pexels.com/photos/318319/pexels-photo-318319.jpeg?auto=compress&cs=tinysrgb&w=600", // cozy reading
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600", // night lights
      "https://images.pexels.com/photos/1170656/pexels-photo-1170656.jpeg?auto=compress&cs=tinysrgb&w=600", // warm food aesthetic
    ],

    prompts: [
      {
        question: "An overshare",
        answer: "I tear up during recovery stories more than I should.",
      },
      {
        question: "My ideal evening",
        answer: "Soft jazz, warm lighting, and someone worth listening to.",
      },
    ],

    myVibe: ["Wine", "Books", "Calm", "Romantic"],
  },
];

const DiscoverPage = () => {
  const [activeTab] = useState("discover");
  const [showFilters, setShowFilters] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(0);

  const profile = sampleProfiles[currentMatch];

  const handleNext = () => {
    setCurrentMatch((prev) => (prev + 1) % sampleProfiles.length);
  };

  if (activeTab !== "discover") return null;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Brand header */}
      <BrandHeader />

      {/* Discover title + Filters button */}
      <div className="px-4 py-3 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-900">Discover</h2>
        <button
          onClick={() => setShowFilters((s) => !s)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full shadow-sm border border-slate-200 hover:bg-slate-50 transition-all text-xs"
        >
          <svg
            className="w-4 h-4 text-slate-700"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="4" y1="6" x2="16" y2="6" />
            <line x1="8" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="12" y2="18" />
            <circle cx="18" cy="6" r="2" />
            <circle cx="6" cy="12" r="2" />
            <circle cx="14" cy="18" r="2" />
          </svg>
          <span className="font-medium text-slate-800">Filters</span>
        </button>
      </div>

      {/* Optional filters row */}
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

      {/* Case file profile view */}
      <div className="px-4 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-[26px] shadow-xl border border-slate-100 overflow-hidden">
            {/* HERO SECTION */}
            <div className="relative rounded-t-[26px] overflow-hidden">
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
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-black/35 backdrop-blur-sm text-xs text-white max-w-[260px]">
                  <span className="inline-flex items-center gap-1 min-w-0">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="truncate">
                      {profile.role ?? "Healthcare professional"}
                    </span>
                  </span>
                  {profile.hospital && (
                    <span className="hidden sm:inline text-white/80 truncate">
                      · {profile.hospital}
                    </span>
                  )}
                </div>

                {profile.shift && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 backdrop-blur text-[11px] text-slate-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                    {profile.shift}
                  </div>
                )}
              </div>

              {/* Top-right compatibility */}
              <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-white/60 shadow-sm">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-medium text-slate-900">
                  {profile.shiftCompatibility ?? 82}% match
                </span>
              </div>

              {/* View all photos pill */}
              <button
                type="button"
                className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-xs text-slate-800 shadow-[0_0_12px_rgba(0,0,0,0.18)] border border-slate-200/70"
              >
                <span className="w-1 h-1 rounded-full bg-slate-700" />
                <span>View all photos</span>
              </button>

              {/* Vertical action rail */}
              <div className="absolute inset-y-0 right-4 flex flex-col items-center justify-center gap-3 pointer-events-none">
                <button
                  type="button"
                  onClick={handleNext}
                  className="pointer-events-auto w-12 h-12 rounded-2xl bg-white/95 border border-slate-200/80 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                >
                  <X className="w-6 h-6 text-slate-700" />
                </button>

                <button
                    type="button"
                    onClick={() => console.log("Heartbeat", profile.name)}
                    className="pointer-events-auto w-12 h-12 rounded-2xl bg-white/95 border border-slate-200/80 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                >
                    <Activity className="w-6 h-6 text-[#0F213A]" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="pointer-events-auto w-12 h-12 rounded-2xl bg-white/95 border border-slate-200/80 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
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

            {/* ECG PULSE SEPARATOR */}
            <div className="relative bg-white">
              <div className="h-6 -mt-1 mb-1 flex items-center justify-center">
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
            </div>

            {/* BODY – CASE FILE INFO */}
            <div className="px-5 pb-5 pt-3 space-y-6 bg-white">
              {/* Vitals strip */}
              <div className="flex flex-wrap gap-2 text-[11px] text-slate-700">
                {/* Verified tag */}
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F213A]" />
                    Verified healthcare professional
                </span>

                {/* Shift compatibility */}
                {typeof profile.shiftCompatibility === "number" && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    Shift pattern compatible
                    </span>
                )}

                {/* Work / life balance */}
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Work/life balance: Medium
                </span>

                {/* Response rate */}
                {profile.responseRate && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-slate-800">
                    ⏱ {profile.responseRate}
                    </span>
                )}

                {/* Recently active */}
                {profile.recentlyActive && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Recently active
                    </span>
                )}
              </div>

              {/* Work & schedule – card */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F213A]" />
                  <h3 className="text-sm font-semibold text-slate-900">
                    Work & schedule
                  </h3>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 px-3.5 py-3 flex gap-3">
                  <div className="mt-1 flex-shrink-0 w-7 h-7 rounded-full bg-[#0F213A]/7 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-[#0F213A]" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Role & routine
                    </p>
                    <p className="text-sm text-slate-800 leading-relaxed">
                      {profile.hospital
                        ? `Working at ${profile.hospital}${
                            profile.specialty
                              ? ` in ${profile.specialty.toLowerCase()}`
                              : ""
                          }.`
                        : "Healthcare professional with a demanding schedule."}{" "}
                      {profile.shift &&
                        `Mostly on ${profile.shift.toLowerCase()}s, looking for someone who understands irregular hours.`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Personality & prompts */}
              {profile.prompts && profile.prompts.length > 0 && (
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

              {/* Glimpses */}
              {profile.photos && profile.photos.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F213A]" />
                    <h3 className="text-sm font-semibold text-slate-900">
                      Glimpses
                    </h3>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {profile.photos.map((ph, idx) =>
                      typeof ph === "string" && ph.startsWith("http") ? (
                        <div
                          key={idx}
                          className="flex-shrink-0 w-24 h-24 rounded-[18px] bg-slate-100 overflow-hidden border border-slate-100 shadow-[0_4px_10px_rgba(15,25,33,0.08)]"
                        >
                          <img
                            src={ph}
                            alt={`${profile.name} glimpse ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              )}

              {/* Their vibe – tags */}
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

            {/* Footer */}
            <div className="border-t border-slate-100 px-5 py-3 flex items-center justify-between bg-white/80 backdrop-blur-sm shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
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
  );
};

export default DiscoverPage;
