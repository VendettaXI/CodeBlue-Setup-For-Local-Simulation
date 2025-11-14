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

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { X, Heart } from 'lucide-react';
import { PhotoCard } from '../discover/PhotoCard';
import { ActionButtons } from '../discover/ActionButtons';
import { ProfileHeader } from '../discover/ProfileHeader';
import { InfoChips } from '../discover/InfoChips';
import { PromptCard } from '../discover/PromptCard';
import { VibeTagsList } from '../discover/VibeTagsList';
import { PhotoCardSkeleton } from '../skeletons/PhotoCardSkeleton';
import { PromptCardSkeleton } from '../skeletons/PromptCardSkeleton';
import { saveAction } from '../../utils/discoveryPersistence';
import { useToast } from '../Toast';
import TopTabSwitcher from '../test/TopTabSwitcher';
import HeartbeatIcon from '../test/HeartbeatIcon';
import PulseButton from '../test/PulseButton';

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
  setAgeRange,
  likedPrompts,
  togglePromptLike,
  promptComments,
  addPromptComment,
  currentTab = 'discover',
  onTabChange
}) {
  const [loading, setLoading] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const { addToast } = useToast();

  // Comment modal state
  const [commentKey, setCommentKey] = useState(null);
  const [commentText, setCommentText] = useState('');

  // Memoize current profile to avoid unnecessary recalculations
  const currentProfile = useMemo(() => 
    sampleProfiles[currentMatch],
    [sampleProfiles, currentMatch]
  );

  const handleAction = useCallback((action) => {
    // Save action to localStorage for history/analytics
    const profile = currentProfile;
    const actionType = action === 'left' ? 'pass' : action === 'right' ? 'connect' : 'favorite';
    
    saveAction({
      profileId: currentMatch, // Using index as ID for now
      profileName: profile.name,
      action: actionType,
      photoIndex: activePrompt
    });

    // Show toast notification
    if (actionType === 'connect') {
      addToast(`You matched with ${profile.name}!`, {
        type: 'match',
        profileName: profile.name,
        duration: 5000
      });
    } else if (actionType === 'favorite') {
      addToast(`Added ${profile.name} to favorites ⭐`, {
        type: 'success',
        duration: 3000
      });
    }

    // Trigger transition, then advance
    setTransitioning(true);
    setTimeout(() => {
      setCurrentMatch((currentMatch + 1) % sampleProfiles.length);
      setTransitioning(false);
    }, 300); // match CSS transition duration
  }, [currentProfile, currentMatch, activePrompt, addToast, setCurrentMatch, sampleProfiles.length]);

  // Keyboard controls: Left = pass, Right = like, Up = super like
  useEffect(() => {
    // Simulate initial fetch to show skeletons
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (showFilters) return; // avoid interfering with modal
      // Do not trigger when typing in inputs/textareas
      const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        console.log('⌨️ ArrowLeft → Pass');
        handleAction('left');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        console.log('⌨️ ArrowRight → Connect');
        handleAction('right');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        console.log('⌨️ ArrowUp → Favorite');
        handleAction('up');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleAction, showFilters]);
  return (
    <div className="min-h-full">
      {/* Top Tab Switcher */}
      <div className="flex items-center justify-between mb-2 px-4 relative">
        {onTabChange && <TopTabSwitcher activeTab={currentTab} onTabChange={onTabChange} />}
        <button
          className="cb-filter-btn ml-auto px-3 py-1.5 rounded-full bg-white dark:bg-gray-900 shadow border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-semibold text-sm absolute right-0 top-0"
          onClick={() => setShowFilters(true)}
        >
          Filters 3
        </button>
      </div>

      {loading ? (
        <div className="max-w-2xl mx-auto px-0 sm:px-4">
          <div className="relative">
            <PhotoCardSkeleton />
          </div>
          <article className="relative -mt-10 mx-4 cb-card rounded-[28px] p-4 sm:p-6 shadow-[0_-4px_24px_rgba(0,0,0,0.06),0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_36px_rgba(0,0,0,0.45)] border dark:border-gray-700/60 mb-24 z-40">
            {/* Profile header skeleton */}
            <div className="mb-3 sm:mb-4">
              <div className="h-4 sm:h-5 w-32 sm:w-40 bg-gray-200 dark:bg-gray-700 rounded mb-1.5 sm:mb-2" />
              <div className="h-2.5 sm:h-3 w-44 sm:w-56 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            {/* Info chips skeleton */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-7 sm:h-8 w-24 sm:w-28 bg-gray-200 dark:bg-gray-700 rounded-full" />
              ))}
            </div>
            {/* Prompt skeletons */}
            <div className="space-y-3 sm:space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <PromptCardSkeleton key={i} index={i} />
              ))}
            </div>
          </article>
        </div>
      ) : sampleProfiles[currentMatch] ? (
        <div 
          className="max-w-2xl mx-auto px-0 sm:px-4"
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? 'translateY(12px)' : 'translateY(0)',
            transition: 'opacity 300ms ease-out, transform 300ms ease-out'
          }}
        >
          {/* Photo Card with Action Buttons overlayed */}
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
              onSwipeLeft={() => {
                console.log('👈 Swiped LEFT - Pass on', sampleProfiles[currentMatch].name);
                handleAction('left');
              }}
              onSwipeRight={() => {
                console.log('👉 Swiped RIGHT - Connect', sampleProfiles[currentMatch].name);
                handleAction('right');
              }}
              onSwipeUp={() => {
                const name = sampleProfiles[currentMatch].name;
                console.log('⬆️ Swiped UP - Favorite', name);
                handleAction('up');
              }}
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full flex justify-center pb-4 z-10">
              <ActionButtons
                onPass={() => {
                  console.log('❌ Pass (button)');
                  handleAction('left');
                }}
                onFavorite={() => {
                  console.log('⭐ Favorite (button)');
                  handleAction('up');
                }}
                onConnect={() => {
                  console.log('💙 Connect (button)');
                  handleAction('right');
                }}
                profileName={sampleProfiles[currentMatch].name}
              />
            </div>
          </div>

          {/* Profile Details Card - Responsive with new text arrangement */}
          <article aria-labelledby="profile-title" className="relative -mt-10 mx-4 cb-card rounded-[28px] p-4 sm:p-6 shadow-[0_-4px_24px_rgba(0,0,0,0.06),0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_36px_rgba(0,0,0,0.45)] border dark:border-gray-700/60 mb-24 z-40">
            
            <div className="px-0 pb-3">
              {/* About Section */}
              <h2 className="text-xl leading-7 font-semibold mt-2.5 text-gray-900 dark:text-gray-100">
                About
              </h2>
              <p className="mt-2 text-base leading-6 text-gray-900 dark:text-gray-100 opacity-90">
                {sampleProfiles[currentMatch].prompts[0]?.answer || 'ICU Nurse based in the city. I love sunrise drives after night shifts, low-fi playlists, and weekend coffee walks.'}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {(sampleProfiles[currentMatch].myVibe?.slice(0, 3) || ['ICU Nurse', 'Empathetic', 'Dogs']).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl text-[13px] leading-[18px] font-medium border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 mt-4">
              {sampleProfiles[currentMatch].prompts.slice(0, 2).map((prompt, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="text-sm leading-5 font-bold mb-1.5 text-gray-900 dark:text-gray-100">
                    {prompt.question}
                  </h3>
                  <p className="text-[15px] leading-[22px] text-gray-900 dark:text-gray-100 opacity-90">
                    {prompt.answer}
                  </p>
                </div>
              ))}
            </div>

            {/* Lifestyle Section */}
            <h2 className="text-xl leading-7 font-semibold mt-6 text-gray-900 dark:text-gray-100">
              Lifestyle
            </h2>
            
            <InfoChips
              specialty={sampleProfiles[currentMatch].specialty}
              hospital={sampleProfiles[currentMatch].hospital}
              shift={sampleProfiles[currentMatch].shift}
              distance={sampleProfiles[currentMatch].distance}
              mutualConnections={sampleProfiles[currentMatch].mutualConnections}
              responseRate={sampleProfiles[currentMatch].responseRate}
            />

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
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">No more profiles!</h3>
            <p className="text-gray-600 dark:text-gray-400">Check back later for new matches</p>
          </div>
        </div>
      )}

      {/* Filter Modal - Responsive */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-t-3xl w-full max-w-md max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-900 px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Filters</h2>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
              {/* Distance */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">Distance: {maxDistance} miles</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(e.target.value)}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-900 dark:accent-blue-500"
                />
              </div>

              {/* Age Range */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">Age Range: {ageRange[0]} - {ageRange[1]}</label>
                <div className="flex gap-3 sm:gap-4">
                  <input
                    type="range"
                    min="18"
                    max="65"
                    value={ageRange[0]}
                    onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
                    className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-900 dark:accent-blue-500"
                  />
                  <input
                    type="range"
                    min="18"
                    max="65"
                    value={ageRange[1]}
                    onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                    className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-900 dark:accent-blue-500"
                  />
                </div>
              </div>

              {/* Healthcare Role */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">Healthcare Role</label>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  {['Nurse', 'Doctor', 'Paramedic', 'Therapist', 'Admin', 'Any'].map((role) => (
                    <button key={role} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-xs sm:text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-400 transition-all">
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shift Compatibility */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">Shift Preference</label>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {['Day Shift', 'Night Shift', 'Rotating', 'Any'].map((shift) => (
                    <button key={shift} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-xs sm:text-sm font-medium hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-400 transition-all">
                      {shift}
                    </button>
                  ))}
                </div>
              </div>

              {/* Relationship Goals */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">Looking For</label>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {['Long-term', 'Casual', 'Friends', 'Not sure'].map((goal) => (
                    <button key={goal} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-xs sm:text-sm font-medium hover:bg-pink-50 dark:hover:bg-pink-900/30 hover:text-pink-700 dark:hover:text-pink-400 transition-all">
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Show Only */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">Show Only</label>
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
                    <input type="checkbox" className="w-4 h-4 sm:w-5 sm:h-5 text-blue-900 dark:text-blue-500 rounded" />
                    <span className="cb-chip text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 border border-white/30">Verified profiles</span>
                  </label>
                  <label className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
                    <input type="checkbox" className="w-4 h-4 sm:w-5 sm:h-5 text-blue-900 dark:text-blue-500 rounded" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Recently active</span>
                  </label>
                  <label className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
                    <input type="checkbox" className="w-4 h-4 sm:w-5 sm:h-5 text-blue-900 dark:text-blue-500 rounded" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">High compatibility (80%+)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-white dark:bg-gray-900 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 dark:border-gray-700 flex gap-2 sm:gap-3">
              <button className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-2.5 sm:py-3 rounded-2xl text-sm sm:text-base font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                Reset
              </button>
              <button 
                onClick={() => setShowFilters(false)}
                className="flex-1 bg-gradient-to-r from-blue-900 to-blue-800 text-white py-2.5 sm:py-3 rounded-2xl text-sm sm:text-base font-bold hover:from-blue-800 hover:to-blue-700 transition-all cb-shadow-card"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comment Modal - Responsive */}
      {commentKey && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[80vh] overflow-hidden">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-900">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">Add a comment</h3>
              <button onClick={() => setCommentKey(null)} className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={4}
                maxLength={240}
                placeholder="Share a thoughtful reply…"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-gray-900 resize-none"
              />
              <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500/90">
                <span>{commentText.length}/240</span>
                <span>Be kind and constructive</span>
              </div>
              <div className="flex gap-2 sm:gap-3 pt-1 sm:pt-2">
                <button
                  onClick={() => setCommentKey(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!commentText.trim()) return;
                    addPromptComment && addPromptComment(commentKey, commentText.trim());
                    setCommentKey(null);
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-bold hover:from-blue-700 hover:to-blue-800 transition-all"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DiscoverTab;
