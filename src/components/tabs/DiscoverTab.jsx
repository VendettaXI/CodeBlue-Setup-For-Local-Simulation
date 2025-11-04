/**
 * ============================================================================
 * DiscoverTab Component
 * ============================================================================
 * 
 * Main discovery screen with swipeable profiles and filter modal.
 * 
 * FEATURES:
 * - Swipeable profile cards with photos
 * - Profile details with prompts and vibe tags
 * - Comprehensive filter modal
 * - Pass/Favorite/Connect actions
 * - Empty state when no profiles
 * 
 * USES SUB-COMPONENTS:
 * - PhotoCard: Profile photos with badges
 * - ActionButtons: Pass/Favorite/Connect
 * - ProfileHeader: Name, age, role
 * - InfoChips: Specialty, hospital, shift, etc.
 * - PromptCard: Hinge-style prompts
 * - VibeTagsList: Interests and dealbreakers
 */

import React from 'react';
import { X } from 'lucide-react';
import { PhotoCard } from '../discover/PhotoCard';
import { ActionButtons } from '../discover/ActionButtons';
import { ProfileHeader } from '../discover/ProfileHeader';
import { InfoChips } from '../discover/InfoChips';
import { PromptCard } from '../discover/PromptCard';
import { VibeTagsList } from '../discover/VibeTagsList';

export function DiscoverTab({
  sampleProfiles,
  currentMatch,
  setCurrentMatch,
  activePrompt,
  setActivePrompt,
  imageErrors,
  setImageErrors,
  showFilters,
  setShowFilters,
  maxDistance,
  setMaxDistance,
  ageRange,
  setAgeRange
}) {
  return (
    <div className="min-h-full bg-[#FAFAFA]">
      <div className="h-2"></div>

      {sampleProfiles[currentMatch] ? (
        <div className="max-w-2xl mx-auto">
          {/* Photo Card with Action Buttons */}
          <div className="relative">
            <PhotoCard
              photos={sampleProfiles[currentMatch].photos}
              activePhotoIndex={activePrompt}
              onPhotoChange={setActivePrompt}
              verified={sampleProfiles[currentMatch].verified}
              recentlyActive={sampleProfiles[currentMatch].recentlyActive}
              matchPercentage={sampleProfiles[currentMatch].shiftCompatibility}
              imageErrors={imageErrors}
              onImageError={(photoKey) => setImageErrors(prev => ({ ...prev, [photoKey]: true }))}
              profileName={sampleProfiles[currentMatch].name}
              currentProfileIndex={currentMatch}
            />
            
            <ActionButtons
              onPass={() => setCurrentMatch((currentMatch + 1) % sampleProfiles.length)}
              onFavorite={() => {
                const name = sampleProfiles[currentMatch].name;
                alert(`Added ${name} to your favorites ⭐`);
              }}
              onConnect={() => {
                alert('Match! 💙 ' + sampleProfiles[currentMatch].name);
                setCurrentMatch((currentMatch + 1) % sampleProfiles.length);
              }}
              profileName={sampleProfiles[currentMatch].name}
            />
          </div>

          {/* Profile Details Card */}
          <article aria-labelledby="profile-title" className="relative -mt-10 mx-4 cb-card rounded-[28px] p-6 shadow-[0_-4px_24px_rgba(0,0,0,0.06),0_8px_32px_rgba(0,0,0,0.08)] mb-24 z-40">
            <ProfileHeader
              name={sampleProfiles[currentMatch].name}
              age={sampleProfiles[currentMatch].age}
              role={sampleProfiles[currentMatch].role}
              specialty={sampleProfiles[currentMatch].specialty}
              onMoreClick={() => console.log('More options for', sampleProfiles[currentMatch].name)}
            />

            <InfoChips
              specialty={sampleProfiles[currentMatch].specialty}
              hospital={sampleProfiles[currentMatch].hospital}
              shift={sampleProfiles[currentMatch].shift}
              distance={sampleProfiles[currentMatch].distance}
              mutualConnections={sampleProfiles[currentMatch].mutualConnections}
              responseRate={sampleProfiles[currentMatch].responseRate}
            />

            <div className="space-y-4">
              {sampleProfiles[currentMatch].prompts.map((prompt, idx) => (
                <PromptCard
                  key={idx}
                  question={prompt.question}
                  answer={prompt.answer}
                  type={prompt.type}
                  duration={prompt.duration}
                  likes={prompt.likes}
                  index={idx}
                  onLike={() => console.log('Liked prompt:', prompt.question)}
                  onComment={() => console.log('Comment on:', prompt.question)}
                  onPlayVoice={() => console.log('Play voice:', prompt.answer)}
                />
              ))}
            </div>

            <VibeTagsList
              vibes={sampleProfiles[currentMatch].myVibe}
              dealbreakers={sampleProfiles[currentMatch].dealbreakers}
            />
          </article>
        </div>
      ) : (
        <div className="flex items-center justify-center h-96 mb-24">
          <div className="text-center">
            <div className="text-6xl mb-4">💙</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No more profiles!</h3>
            <p className="text-gray-600">Check back later for new matches</p>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center">
          <div className="bg-white rounded-t-3xl w-full max-w-md max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-6 pt-6 pb-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Distance */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Distance: {maxDistance} miles</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-900"
                />
              </div>

              {/* Age Range */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Age Range: {ageRange[0]} - {ageRange[1]}</label>
                <div className="flex gap-4">
                  <input
                    type="range"
                    min="18"
                    max="65"
                    value={ageRange[0]}
                    onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
                    className="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-900"
                  />
                  <input
                    type="range"
                    min="18"
                    max="65"
                    value={ageRange[1]}
                    onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                    className="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-900"
                  />
                </div>
              </div>

              {/* Healthcare Role */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Healthcare Role</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Nurse', 'Doctor', 'Paramedic', 'Therapist', 'Admin', 'Any'].map((role) => (
                    <button key={role} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-all">
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shift Compatibility */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Shift Preference</label>
                <div className="flex flex-wrap gap-2">
                  {['Day Shift', 'Night Shift', 'Rotating', 'Any'].map((shift) => (
                    <button key={shift} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-purple-50 hover:text-purple-700 transition-all">
                      {shift}
                    </button>
                  ))}
                </div>
              </div>

              {/* Relationship Goals */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Looking For</label>
                <div className="flex flex-wrap gap-2">
                  {['Long-term', 'Casual', 'Friends', 'Not sure'].map((goal) => (
                    <button key={goal} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-pink-50 hover:text-pink-700 transition-all">
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Show Only */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Show Only</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all">
                    <input type="checkbox" className="w-5 h-5 text-blue-900 rounded" />
                    <span className="cb-chip text-sm font-medium text-gray-700 border border-white/30">Verified profiles</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all">
                    <input type="checkbox" className="w-5 h-5 text-blue-900 rounded" />
                    <span className="text-sm font-medium text-gray-700">Recently active</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all">
                    <input type="checkbox" className="w-5 h-5 text-blue-900 rounded" />
                    <span className="text-sm font-medium text-gray-700">High compatibility (80%+)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-200 flex gap-3">
              <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all">
                Reset
              </button>
              <button 
                onClick={() => setShowFilters(false)}
                className="flex-1 bg-gradient-to-r from-blue-900 to-blue-800 text-white py-3 rounded-2xl font-bold hover:from-blue-800 hover:to-blue-700 transition-all cb-shadow-card"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DiscoverTab;
