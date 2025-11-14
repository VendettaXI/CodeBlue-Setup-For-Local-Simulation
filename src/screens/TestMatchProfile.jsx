// TEST SCREEN - New Discover/Match Profile Design
// This is a standalone test version - does NOT affect production code

import React, { useState } from 'react';
import TopTabSwitcher from '../components/test/TopTabSwitcher';
import ProfileWave from '../components/test/ProfileWave';
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
  const [showWave, setShowWave] = useState(true);
  const [debugStroke, setDebugStroke] = useState(false);
  const [notchMode, setNotchMode] = useState('none'); // 'none' | 'bubble' | 'hybrid'
  const [controls, setControls] = useState({
    baselineY: 66,
    troughY: 100,
    rightEndY: 90,
    troughX: 255,
    easingShift: 40,
    declineSharpness: 50,
    declineStartX: 110,
    notchCenterX: 356,
    notchWidth: 130,
    notchDepth: 60,
    notchSmoothing: 28,
  });

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
        {/* Wave live controls panel (dev only) */}
        <div className="mx-4 mt-4 mb-2 p-3 rounded-xl text-[11px] leading-[14px]" style={{ background: '#ffffff', border: `1px solid ${C.border}` }}>
          <div className="flex items-center justify-between mb-2">
            <span style={{ color: C.gunmetal, fontWeight: 600 }}>Wave Controls</span>
            <div className="flex gap-2">
              <button
                onClick={() => setDebugStroke(v => !v)}
                className="px-2 py-1 rounded-md text-[11px] font-medium border"
                style={{ borderColor: debugStroke ? '#ef4444' : C.border, color: debugStroke ? '#ef4444' : C.gunmetal }}
              >{debugStroke ? 'Debug ON' : 'Debug'}</button>
              <button
                onClick={() => setShowWave(v => !v)}
                className="px-2 py-1 rounded-md text-[11px] font-medium border"
                style={{ borderColor: C.border }}
              >{showWave ? 'Hide' : 'Show'}</button>
            </div>
          </div>
          
          {/* Notch Mode Selector */}
          <div className="mb-3 flex gap-2">
            <span className="text-[10px] font-semibold mr-2" style={{ color: C.gunmetal }}>MODE:</span>
            {['none', 'bubble', 'hybrid'].map(mode => (
              <button
                key={mode}
                onClick={() => setNotchMode(mode)}
                className="px-2 py-1 rounded-md border text-[11px] font-medium"
                style={{ 
                  borderColor: notchMode === mode ? '#3b82f6' : C.border,
                  backgroundColor: notchMode === mode ? '#dbeafe' : 'transparent',
                  color: notchMode === mode ? '#1e40af' : C.gunmetal
                }}
              >
                {mode === 'none' ? 'Wave' : mode === 'bubble' ? 'Bubble ⃝' : 'Hybrid ⚡'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {Object.entries({
              baselineY: { min: 50, max: 80, step: 1, show: true },
              troughY: { min: 90, max: 115, step: 1, show: notchMode === 'none' },
              rightEndY: { min: 80, max: 100, step: 1, show: notchMode === 'none' },
              troughX: { min: 200, max: 300, step: 1, show: notchMode === 'none' },
              easingShift: { min: 20, max: 70, step: 1, show: notchMode !== 'bubble' },
              declineSharpness: { min: 0, max: 160, step: 1, show: notchMode === 'none' },
              declineStartX: { min: 80, max: 220, step: 1, show: notchMode !== 'bubble' },
              notchCenterX: { min: 300, max: 390, step: 1, show: notchMode !== 'none' },
              notchWidth: { min: 70, max: 140, step: 1, show: notchMode !== 'none' },
              notchDepth: { min: 25, max: 80, step: 1, show: notchMode !== 'none' },
              notchSmoothing: { min: 10, max: 40, step: 1, show: notchMode === 'hybrid' },
            }).filter(([, cfg]) => cfg.show !== false).map(([key, cfg]) => (
              <label key={key} className="flex flex-col gap-1">
                <span style={{ color: C.gunmetal }}>{key}</span>
                <input
                  type="range"
                  min={cfg.min}
                  max={cfg.max}
                  step={cfg.step}
                  value={controls[key]}
                  onChange={e => setControls(c => ({ ...c, [key]: Number(e.target.value) }))}
                />
                <span style={{ color: C.textSubtle }}>{controls[key]}</span>
              </label>
            ))}
          </div>
          <div className="mt-3 mb-1 text-[10px] font-semibold" style={{ color: C.gunmetal }}>PRESETS</div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => {
                setControls({ baselineY: 66, troughY: 100, rightEndY: 90, troughX: 255, easingShift: 40, declineSharpness: 50, declineStartX: 110, notchCenterX: 356, notchWidth: 130, notchDepth: 60 });
                setNotchMode('none');
              }}
              className="px-2 py-1 rounded-md border text-[11px] font-medium"
              style={{ borderColor: C.border }}
            >Reset Default</button>
            <button
              onClick={() => {
                setControls({ baselineY: 60, troughY: 100, rightEndY: 90, troughX: 255, easingShift: 40, declineSharpness: 50, declineStartX: 110, notchCenterX: 356, notchWidth: 130, notchDepth: 60 });
                setNotchMode('bubble');
              }}
              className="px-2 py-1 rounded-md border text-[11px]"
              style={{ borderColor: C.border }}
            >Bubble Notch ⃝</button>
            <button
              onClick={() => {
                setControls({ baselineY: 60, troughY: 100, rightEndY: 90, troughX: 255, easingShift: 50, declineSharpness: 50, declineStartX: 140, notchCenterX: 356, notchWidth: 130, notchDepth: 60, notchSmoothing: 28 });
                setNotchMode('hybrid');
              }}
              className="px-2 py-1 rounded-md border text-[11px]"
              style={{ borderColor: C.border }}
            >Hybrid Ejected ⚡</button>
            <button
              onClick={() => {
                setControls({ baselineY: 68, troughY: 95, rightEndY: 88, troughX: 260, easingShift: 35, declineSharpness: 90, declineStartX: 130, notchCenterX: 350, notchWidth: 100, notchDepth: 45 });
                setNotchMode('none');
              }}
              className="px-2 py-1 rounded-md border text-[11px]"
              style={{ borderColor: C.border }}
            >Subtle Wave</button>
            <button
              onClick={() => {
                setControls({ baselineY: 62, troughY: 110, rightEndY: 94, troughX: 245, easingShift: 60, declineSharpness: 20, declineStartX: 100, notchCenterX: 350, notchWidth: 100, notchDepth: 45 });
                setNotchMode('none');
              }}
              className="px-2 py-1 rounded-md border text-[11px]"
              style={{ borderColor: C.border }}
            >Dramatic Wave</button>
            <button
              onClick={() => setControls({ baselineY: 58, troughY: 115, rightEndY: 98, troughX: 235, easingShift: 70, declineSharpness: 5, declineStartX: 90 })}
              className="px-2 py-1 rounded-md border text-[11px]"
              style={{ borderColor: C.border }}
            >Sharp Deep</button>
            <button
              onClick={() => setControls({ baselineY: 64, troughY: 102, rightEndY: 92, troughX: 250, easingShift: 45, declineSharpness: 60, declineStartX: 120 })}
              className="px-2 py-1 rounded-md border text-[11px]"
              style={{ borderColor: C.border }}
            >Balanced</button>
          </div>
          <div className="mt-2 flex gap-2 flex-wrap">
            <button
              onClick={() => setControls(c => ({ ...c, troughY: Math.min(115, c.troughY + 2) }))}
              className="px-2 py-1 rounded-md border text-[11px]"
              style={{ borderColor: C.border }}
            >+ Deeper</button>
            <button
              onClick={() => setControls(c => ({ ...c, troughY: Math.max(90, c.troughY - 2) }))}
              className="px-2 py-1 rounded-md border text-[11px]"
              style={{ borderColor: C.border }}
            >- Shallower</button>
            <button
              onClick={() => setControls(c => ({ ...c, declineSharpness: Math.max(0, c.declineSharpness - 10) }))}
              className="px-2 py-1 rounded-md border text-[11px]"
              style={{ borderColor: C.border }}
            >↓ Sharper Drop</button>
            <button
              onClick={() => setControls(c => ({ ...c, declineSharpness: Math.min(100, c.declineSharpness + 10) }))}
              className="px-2 py-1 rounded-md border text-[11px]"
              style={{ borderColor: C.border }}
            >↑ Gentler Drop</button>
          </div>
        </div>
        <TopTabSwitcher activeTab={tab} onTabChange={setTab} />

        {/* HERO IMAGE with wave overlay at bottom */}
        <div 
          className="mx-4 mt-2 relative"
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
            className="absolute left-4 bottom-24 right-32"
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
          <div 
            className="absolute right-2.5 flex flex-col gap-4 items-center"
            style={{
              top: notchMode !== 'none' ? '310px' : '176px', // Moved completely above notch
              transition: 'top 0.3s ease'
            }}
          >
            {/* Pass button */}
            <button
              className="flex items-center justify-center transition-all duration-300"
              style={{
                width: 48,
                height: 48,
                borderRadius: RADII.button,
                border: `1px solid ${C.border}`,
                backgroundColor: 'rgba(255,255,255,0.75)',
                cursor: 'pointer',
                boxShadow: notchMode !== 'none' 
                  ? '0 0 0 4px rgba(255,255,255,0.5), 0 8px 20px rgba(15,33,58,0.15)' 
                  : 'none',
                transform: notchMode !== 'none' ? 'translateY(-18px)' : 'none',
              }}
              onClick={() => console.log('Pass')}
            >
              <X size={26} color={C.gunmetal} />
            </button>

            {/* Superlike with animated heartbeat */}
            <div
              className="transition-all duration-300"
              style={{
                boxShadow: notchMode !== 'none' 
                  ? '0 0 0 4px rgba(255,255,255,0.5), 0 8px 20px rgba(15,33,58,0.15)' 
                  : 'none',
                borderRadius: RADII.button,
                transform: notchMode !== 'none' ? 'translateY(-18px)' : 'none',
              }}
            >
              <PulseButton onPress={() => console.log('Superlike!')}>
                <HeartbeatIcon />
              </PulseButton>
            </div>

            {/* Like button */}
            <button
              className="flex items-center justify-center transition-all duration-300"
              style={{
                width: 48,
                height: 48,
                borderRadius: RADII.button,
                border: `1px solid ${C.border}`,
                backgroundColor: 'rgba(255,255,255,0.75)',
                cursor: 'pointer',
                boxShadow: notchMode !== 'none' 
                  ? '0 0 0 4px rgba(255,255,255,0.5), 0 8px 20px rgba(15,33,58,0.15)' 
                  : 'none',
                transform: notchMode !== 'none' ? 'translateY(-18px)' : 'none',
              }}
              onClick={() => console.log('Like')}
            >
              <Heart size={26} color={C.gunmetal} />
            </button>
          </div>

          {/* New wave separator (ProfileWave) between hero image and info card */}
          {showWave && (
            <ProfileWave 
              baselineY={controls.baselineY}
              troughY={controls.troughY}
              rightEndY={controls.rightEndY}
              troughX={controls.troughX}
              easingShift={controls.easingShift}
              declineSharpness={controls.declineSharpness}
              declineStartX={controls.declineStartX}
              notchMode={notchMode}
              notchCenterX={controls.notchCenterX}
              notchWidth={controls.notchWidth}
              notchDepth={controls.notchDepth}
              notchSmoothing={controls.notchSmoothing}
              debugStroke={debugStroke}
            />
          )}
        </div>

        {/* INFO CARD - sits directly below hero with no gap */}
        <div 
          className="mx-4 overflow-hidden"
          style={{
            marginTop: -2,
            borderBottomLeftRadius: RADII.card,
            borderBottomRightRadius: RADII.card,
            backgroundColor: C.card,
            border: `1px solid ${C.border}`,
            borderTop: 'none',
          }}
        >
          
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
