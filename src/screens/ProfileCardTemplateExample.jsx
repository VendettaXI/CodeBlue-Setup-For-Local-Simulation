/**
 * ============================================================================
 * ProfileCardTemplateExample - Demo of ProfileCardTemplate Usage
 * ============================================================================
 * 
 * This file demonstrates how to use the ProfileCardTemplate component with
 * sample data. You can use this as a reference for implementing profile cards
 * in your own screens.
 * 
 * FEATURES DEMONSTRATED:
 * - Basic usage with all props
 * - Different wave modes (none, bubble, hybrid)
 * - Custom wave controls
 * - Event handlers for actions
 * 
 * USAGE:
 * Import this component in your routing or navigation to see the demo.
 * 
 * ============================================================================
 */

import React, { useState } from 'react';
import ProfileCardTemplate from '../components/discover/ProfileCardTemplate';

const SAMPLE_PROFILES = [
  {
    name: 'Sarah',
    age: 29,
    imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1400&auto=format&fit=crop',
    about: 'ICU Nurse based in the city. I love sunrise drives after night shifts, low-fi playlists, and weekend coffee walks.',
    tags: ['ICU Nurse', 'Empathetic', 'Dogs'],
    prompts: [
      {
        question: 'My simple pleasures',
        answer: 'Short shows, the gym, and blasting music in the car.'
      },
      {
        question: 'Most spontaneous thing',
        answer: 'Took a 5am train to the coast after a night shift just to watch the waves.'
      }
    ],
    lifestyle: {
      department: 'Emergency / ICU',
      hospital: 'Royal London Hospital',
      shift: 'Night Shift',
      distance: '2 miles away',
      loveLanguage: 'Physical touch • Words',
      pets: 'Dogs',
      smoking: 'Never',
      drinking: 'Occasionally',
      spiritual: 'Yes'
    },
    lookingFor: ['Long-term relationship', 'Open to short-term', 'Not looking for hookups']
  },
  {
    name: 'Emily',
    age: 31,
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1400&auto=format&fit=crop',
    about: 'Pediatric nurse who loves kids, animals, and adventure. Always up for trying new restaurants and exploring hiking trails.',
    tags: ['Pediatric Nurse', 'Adventurous', 'Cats'],
    prompts: [
      {
        question: 'Perfect weekend',
        answer: 'Hiking in the morning, brunch with friends, then a cozy evening with a good book.'
      }
    ],
    lifestyle: {
      department: 'Pediatrics',
      hospital: 'St. Mary\'s Hospital',
      shift: 'Day Shift',
      distance: '5 miles away',
      pets: 'Cats',
      smoking: 'Never',
      drinking: 'Socially'
    },
    lookingFor: ['Long-term relationship', 'Shared adventures']
  },
  {
    name: 'Michael',
    age: 34,
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1400&auto=format&fit=crop',
    about: 'ER Doctor with a passion for teaching and mentorship. Love cooking, photography, and staying active.',
    tags: ['ER Doctor', 'Teacher', 'Foodie'],
    prompts: [
      {
        question: 'You should message me if',
        answer: 'You\'re ready for deep conversations and spontaneous food adventures.'
      },
      {
        question: 'I geek out on',
        answer: 'Medical podcasts, photography gear, and trying to perfect my pasta carbonara.'
      }
    ],
    lifestyle: {
      department: 'Emergency',
      hospital: 'City General Hospital',
      shift: 'Rotating',
      distance: '3 miles away',
      loveLanguage: 'Quality time',
      pets: 'No pets (allergies)',
      smoking: 'Never',
      drinking: 'Occasionally'
    },
    lookingFor: ['Long-term relationship', 'Life partner']
  }
];

export default function ProfileCardTemplateExample() {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [notchMode, setNotchMode] = useState('hybrid'); // 'none' | 'bubble' | 'hybrid'
  
  const currentProfile = SAMPLE_PROFILES[currentProfileIndex];

  const handlePass = () => {
    console.log('Passed on', currentProfile.name);
    nextProfile();
  };

  const handleSuperLike = () => {
    console.log('Super liked', currentProfile.name);
    nextProfile();
  };

  const handleLike = () => {
    console.log('Liked', currentProfile.name);
    nextProfile();
  };

  const nextProfile = () => {
    setCurrentProfileIndex((prev) => (prev + 1) % SAMPLE_PROFILES.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Controls Panel */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-bold text-gray-900">
              ProfileCardTemplate Demo
            </h1>
            <div className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-300">
              {currentProfileIndex + 1} / {SAMPLE_PROFILES.length}
            </div>
          </div>
          
          {/* Wave Mode Selector */}
          <div className="flex gap-2">
            <span className="text-sm font-semibold text-gray-700 mr-2">Wave Mode:</span>
            {['none', 'bubble', 'hybrid'].map(mode => (
              <button
                key={mode}
                onClick={() => setNotchMode(mode)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  notchMode === mode
                    ? 'bg-blue-500 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {mode === 'none' ? 'Wave' : mode === 'bubble' ? 'Bubble' : 'Hybrid'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <ProfileCardTemplate
        name={currentProfile.name}
        age={currentProfile.age}
        imageUrl={currentProfile.imageUrl}
        about={currentProfile.about}
        tags={currentProfile.tags}
        prompts={currentProfile.prompts}
        lifestyle={currentProfile.lifestyle}
        lookingFor={currentProfile.lookingFor}
        onPass={handlePass}
        onSuperLike={handleSuperLike}
        onLike={handleLike}
        notchMode={notchMode}
        showWave={true}
      />
    </div>
  );
}
