// TEST SCREEN - New Discover/Match Profile Design
// This is a standalone test version - does NOT affect production code

import React, { useState } from 'react';
import TopTabSwitcher from '../components/test/TopTabSwitcher';
import WaveTop from '../components/test/WaveTop';
import HeartbeatIcon from '../components/test/HeartbeatIcon';
import PulseButton from '../components/test/PulseButton';
import { X, Heart } from 'lucide-react';

const C = {
  gunmetal: "rgba(15,33,58,0.90)",
  textSubtle: "rgba(15,33,58,0.70)",
  bg: "#F7F8FA",
  card: "#FFFFFF",
  border: "rgba(15,33,58,0.10)",
};

const RADII = { hero: 24, card: 24, button: 14 };

function Row({ label, value }) {
  return (
    <div className="mt-3 flex items-center gap-2.5">
      <div className="w-28 text-sm font-semibold" style={{ color: C.textSubtle }}>
        {label}
      </div>
      <div 
        className="flex-1 px-3 py-2.5 rounded-xl"
        style={{ 
          border: `1px solid ${C.border}`,
          backgroundColor: C.card
        }}
      >
        <div className="text-[15px] font-medium" style={{ color: C.gunmetal }}>
          {value}
        </div>
      </div>
    </div>
  );
}

export default function TestMatchProfile() {
  const [tab, setTab] = useState("discover");

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: C.bg }}
    >
      {/* Sticky header with back button */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b" style={{ borderColor: C.border }}>
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity"
            style={{ color: C.gunmetal }}
          >
            <X size={20} />
            <span>Back to Main App</span>
          </button>
          <div className="text-xs font-medium px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300">
            TEST MODE
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto overflow-y-auto pb-20">
        <TopTabSwitcher activeTab={tab} onTabChange={setTab} />

        {/* HERO IMAGE */}
        <div 
          className="mx-4 mt-2 relative overflow-hidden"
          style={{ borderRadius: RADII.hero }}
        >
          <img
            src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1400&auto=format&fit=crop"
            alt="Profile"
            className="w-full object-cover"
            style={{ height: 520, borderRadius: RADII.hero }}
          />
          
          {/* Name + Age ONLY (on image) */}
          <div 
            className="absolute left-4 bottom-4 right-32 pt-14"
          >
            <h1 
              className="text-white text-[28px] leading-[34px] font-bold"
              style={{
                textShadow: '0 2px 8px rgba(0,0,0,0.35)'
              }}
            >
              Sarah, 29
            </h1>
          </div>

          {/* Right-side thumb-zone actions */}
          <div className="absolute right-2.5 top-44 flex flex-col gap-4 items-center">
            {/* Pass button */}
            <button
              className="flex items-center justify-center"
              style={{
                width: 48,
                height: 48,
                borderRadius: RADII.button,
                border: `1px solid ${C.border}`,
                backgroundColor: 'rgba(255,255,255,0.75)',
                cursor: 'pointer',
              }}
              onClick={() => console.log('Pass')}
            >
              <X size={26} color={C.gunmetal} />
            </button>

            {/* Superlike with animated heartbeat */}
            <PulseButton onPress={() => console.log('Superlike!')}>
              <HeartbeatIcon />
            </PulseButton>

            {/* Like button */}
            <button
              className="flex items-center justify-center"
              style={{
                width: 48,
                height: 48,
                borderRadius: RADII.button,
                border: `1px solid ${C.border}`,
                backgroundColor: 'rgba(255,255,255,0.75)',
                cursor: 'pointer',
              }}
              onClick={() => console.log('Like')}
            >
              <Heart size={26} color={C.gunmetal} />
            </button>
          </div>
        </div>

        {/* INFO CARD WITH WAVE */}
        <div 
          className="mx-4 overflow-hidden cb-shadow-card"
          style={{
            marginTop: -28, // slightly deeper overlap to showcase wave
            borderBottomLeftRadius: RADII.card,
            borderBottomRightRadius: RADII.card,
            backgroundColor: C.card,
            border: `1px solid ${C.border}`,
          }}
        >
          <WaveTop spikeHeight={12} dipDepth={28} />
          
          <div className="px-4 pb-7">
            {/* About Section */}
            <h2 
              className="text-xl leading-7 font-semibold mt-2.5"
              style={{ color: C.gunmetal }}
            >
              About
            </h2>
            <p 
              className="mt-2 text-base leading-6"
              style={{ color: C.gunmetal, opacity: 0.9 }}
            >
              ICU Nurse based in the city. I love sunrise drives after night shifts, low-fi playlists, and weekend coffee walks.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {['ICU Nurse', 'Empathetic', 'Dogs'].map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-xl text-[13px] leading-[18px] font-medium"
                  style={{
                    border: `1px solid ${C.border}`,
                    color: C.gunmetal
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Prompt Cards */}
            <div 
              className="mt-4 p-3.5 rounded-2xl"
              style={{
                backgroundColor: C.card,
                border: `1px solid ${C.border}`
              }}
            >
              <h3 className="text-sm leading-5 font-bold mb-1.5" style={{ color: C.gunmetal }}>
                My simple pleasures
              </h3>
              <p className="text-[15px] leading-[22px]" style={{ color: C.gunmetal, opacity: 0.9 }}>
                Short shows, the gym, and blasting music in the car.
              </p>
            </div>

            <div 
              className="mt-4 p-3.5 rounded-2xl"
              style={{
                backgroundColor: C.card,
                border: `1px solid ${C.border}`
              }}
            >
              <h3 className="text-sm leading-5 font-bold mb-1.5" style={{ color: C.gunmetal }}>
                Most spontaneous thing
              </h3>
              <p className="text-[15px] leading-[22px]" style={{ color: C.gunmetal, opacity: 0.9 }}>
                Took a 5am train to the coast after a night shift just to watch the waves.
              </p>
            </div>

            {/* Lifestyle Section */}
            <h2 
              className="text-xl leading-7 font-semibold mt-6"
              style={{ color: C.gunmetal }}
            >
              Lifestyle
            </h2>
            <Row label="Department" value="Emergency / ICU" />
            <Row label="Hospital" value="Royal London Hospital" />
            <Row label="Shift" value="Night Shift" />
            <Row label="Distance" value="2 miles away" />
            <Row label="Love Language" value="Physical touch • Words" />
            <Row label="Pets" value="Dogs" />
            <Row label="Smoking" value="Never" />
            <Row label="Drinking" value="Occasionally" />
            <Row label="Spiritual" value="Yes" />

            {/* Looking For Section */}
            <h2 
              className="text-xl leading-7 font-semibold mt-6"
              style={{ color: C.gunmetal }}
            >
              Looking for
            </h2>
            <div className="flex flex-wrap gap-2 mt-2.5">
              {['Long-term relationship', 'Open to short-term', 'Not looking for hookups'].map(item => (
                <span
                  key={item}
                  className="px-3 py-2 rounded-xl text-[13px] leading-[18px] font-semibold"
                  style={{
                    border: `1px solid ${C.border}`,
                    color: C.gunmetal,
                    backgroundColor: C.card
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
