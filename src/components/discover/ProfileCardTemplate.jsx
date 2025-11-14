/**
 * ============================================================================
 * ProfileCardTemplate Component
 * ============================================================================
 * 
 * A reusable profile card template based on the TestMatchProfile design.
 * Features a hero image with wave overlay, action buttons, and detailed info card.
 * 
 * DESIGN FEATURES:
 * - Hero image (520px height) with rounded corners (24px radius)
 * - Wave separator between image and info card (with optional notch mode)
 * - Right-side action buttons (Pass, Super Like, Like)
 * - Name and age overlay on image
 * - Comprehensive info card with About, Tags, Prompts, Lifestyle, and Looking For sections
 * 
 * WAVE MODES:
 * - 'none': Classic smooth wave separator
 * - 'bubble': U-shaped notch for action buttons
 * - 'hybrid': Blended notch with smooth transitions
 * 
 * PROPS:
 * @param {string} name - User's first name
 * @param {number} age - User's age
 * @param {string} imageUrl - URL for the hero profile image
 * @param {string} about - About section text
 * @param {array} tags - Array of tag strings (e.g., ['ICU Nurse', 'Empathetic', 'Dogs'])
 * @param {array} prompts - Array of prompt objects {question: string, answer: string}
 * @param {object} lifestyle - Lifestyle info object with keys like department, hospital, shift, distance, etc.
 * @param {array} lookingFor - Array of relationship goal strings
 * @param {function} onPass - Called when pass button is clicked
 * @param {function} onSuperLike - Called when super like button is clicked
 * @param {function} onLike - Called when like button is clicked
 * @param {string} notchMode - Wave notch mode: 'none' | 'bubble' | 'hybrid'
 * @param {boolean} showWave - Whether to show the wave separator (default: true)
 * @param {object} waveControls - Optional wave customization parameters
 * 
 * EXAMPLE USAGE:
 * ```jsx
 * <ProfileCardTemplate
 *   name="Sarah"
 *   age={29}
 *   imageUrl="https://images.unsplash.com/photo-1582750433449-648ed127bb54"
 *   about="ICU Nurse based in the city. I love sunrise drives after night shifts..."
 *   tags={['ICU Nurse', 'Empathetic', 'Dogs']}
 *   prompts={[
 *     { question: 'My simple pleasures', answer: 'Short shows, the gym, and blasting music in the car.' },
 *     { question: 'Most spontaneous thing', answer: 'Took a 5am train to the coast...' }
 *   ]}
 *   lifestyle={{
 *     department: 'Emergency / ICU',
 *     hospital: 'Royal London Hospital',
 *     shift: 'Night Shift',
 *     distance: '2 miles away'
 *   }}
 *   lookingFor={['Long-term relationship', 'Open to short-term']}
 *   onPass={() => console.log('Pass')}
 *   onSuperLike={() => console.log('Super Like')}
 *   onLike={() => console.log('Like')}
 *   notchMode="hybrid"
 * />
 * ```
 * 
 * ACCESSIBILITY:
 * - Semantic HTML structure
 * - ARIA labels on action buttons
 * - Keyboard accessible
 * - High contrast text
 * 
 * ============================================================================
 */

import React from 'react';
import { X, Heart } from 'lucide-react';
import ProfileWave from '../test/ProfileWave';
import HeartbeatIcon from '../test/HeartbeatIcon';
import PulseButton from '../test/PulseButton';

const C = {
  gunmetal: "rgba(15,33,58,0.90)",
  textSubtle: "rgba(15,33,58,0.70)",
  bg: "#F7F8FA",
  card: "#FFFFFF",
  border: "rgba(15,33,58,0.10)",
};

const RADII = { hero: 24, card: 24, button: 14 };

function Row({ label, value }) {
  if (!value) return null;
  
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

export default function ProfileCardTemplate({
  name = 'Unknown',
  age,
  imageUrl = 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1400&auto=format&fit=crop',
  about = '',
  tags = [],
  prompts = [],
  lifestyle = {},
  lookingFor = [],
  onPass,
  onSuperLike,
  onLike,
  notchMode = 'hybrid',
  showWave = true,
  waveControls = {}
}) {
  // Default wave controls with customization override
  const defaultWaveControls = {
    baselineY: 60,
    troughY: 100,
    rightEndY: 90,
    troughX: 255,
    easingShift: 50,
    declineSharpness: 50,
    declineStartX: 140,
    notchCenterX: 356,
    notchWidth: 130,
    notchDepth: 60,
    notchSmoothing: 28,
  };

  const finalWaveControls = { ...defaultWaveControls, ...waveControls };

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: C.bg }}
    >
      <div className="max-w-md mx-auto overflow-y-auto pb-20">
        {/* HERO IMAGE with wave overlay at bottom */}
        <div 
          className="mx-4 mt-2 relative"
          style={{ borderRadius: RADII.hero }}
        >
          <img
            src={imageUrl}
            alt={`${name}'s profile`}
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
              {name}{age && `, ${age}`}
            </h1>
          </div>

          {/* Right-side thumb-zone actions */}
          <div 
            className="absolute right-2.5 flex flex-col gap-4 items-center"
            style={{
              top: notchMode !== 'none' ? '310px' : '176px',
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
              onClick={onPass}
              aria-label="Pass"
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
              <PulseButton onPress={onSuperLike} aria-label="Super Like">
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
              onClick={onLike}
              aria-label="Like"
            >
              <Heart size={26} color={C.gunmetal} />
            </button>
          </div>

          {/* Wave separator between hero image and info card */}
          {showWave && (
            <ProfileWave 
              baselineY={finalWaveControls.baselineY}
              troughY={finalWaveControls.troughY}
              rightEndY={finalWaveControls.rightEndY}
              troughX={finalWaveControls.troughX}
              easingShift={finalWaveControls.easingShift}
              declineSharpness={finalWaveControls.declineSharpness}
              declineStartX={finalWaveControls.declineStartX}
              notchMode={notchMode}
              notchCenterX={finalWaveControls.notchCenterX}
              notchWidth={finalWaveControls.notchWidth}
              notchDepth={finalWaveControls.notchDepth}
              notchSmoothing={finalWaveControls.notchSmoothing}
              debugStroke={false}
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
            {about && (
              <>
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
                  {about}
                </p>
              </>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
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
            )}

            {/* Prompt Cards */}
            {prompts.map((prompt, idx) => (
              <div 
                key={idx}
                className="mt-4 p-3.5 rounded-2xl"
                style={{
                  backgroundColor: C.card,
                  border: `1px solid ${C.border}`
                }}
              >
                <h3 className="text-sm leading-5 font-bold mb-1.5" style={{ color: C.gunmetal }}>
                  {prompt.question}
                </h3>
                <p className="text-[15px] leading-[22px]" style={{ color: C.gunmetal, opacity: 0.9 }}>
                  {prompt.answer}
                </p>
              </div>
            ))}

            {/* Lifestyle Section */}
            {Object.keys(lifestyle).length > 0 && (
              <>
                <h2 
                  className="text-xl leading-7 font-semibold mt-6"
                  style={{ color: C.gunmetal }}
                >
                  Lifestyle
                </h2>
                {lifestyle.department && <Row label="Department" value={lifestyle.department} />}
                {lifestyle.hospital && <Row label="Hospital" value={lifestyle.hospital} />}
                {lifestyle.shift && <Row label="Shift" value={lifestyle.shift} />}
                {lifestyle.distance && <Row label="Distance" value={lifestyle.distance} />}
                {lifestyle.loveLanguage && <Row label="Love Language" value={lifestyle.loveLanguage} />}
                {lifestyle.pets && <Row label="Pets" value={lifestyle.pets} />}
                {lifestyle.smoking && <Row label="Smoking" value={lifestyle.smoking} />}
                {lifestyle.drinking && <Row label="Drinking" value={lifestyle.drinking} />}
                {lifestyle.spiritual && <Row label="Spiritual" value={lifestyle.spiritual} />}
              </>
            )}

            {/* Looking For Section */}
            {lookingFor.length > 0 && (
              <>
                <h2 
                  className="text-xl leading-7 font-semibold mt-6"
                  style={{ color: C.gunmetal }}
                >
                  Looking for
                </h2>
                <div className="flex flex-wrap gap-2 mt-2.5">
                  {lookingFor.map((item, idx) => (
                    <span
                      key={idx}
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
