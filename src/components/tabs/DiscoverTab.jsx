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

import React, { useEffect, useState } from 'react';
import { X, RotateCcw } from 'lucide-react';
import { PhotoCard } from '../discover/PhotoCard';
import { ActionButtons } from '../discover/ActionButtons';
import { ProfileHeader } from '../discover/ProfileHeader';
import { InfoChips } from '../discover/InfoChips';
import { PromptCard } from '../discover/PromptCard';
import { VibeTagsList } from '../discover/VibeTagsList';
import { PhotoCardSkeleton } from '../skeletons/PhotoCardSkeleton';
import { PromptCardSkeleton } from '../skeletons/PromptCardSkeleton';

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
  addPromptComment
}) {
  // Maintain a small stack of recent swipes for Undo
  const [lastSwipes, setLastSwipes] = useState([]); // { index, action, photoIndex, ts }
  const [loading, setLoading] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const MAX_STACK = 10;

  // Comment modal state
  const [commentKey, setCommentKey] = useState(null);
  const [commentText, setCommentText] = useState('');

  const handleAction = (action) => {
    // Record last state before advancing
    setLastSwipes((prev) => {
      const next = [{ index: currentMatch, action, photoIndex: activePrompt, ts: Date.now() }, ...prev];
      return next.slice(0, MAX_STACK);
    });
    // Trigger transition, then advance
    setTransitioning(true);
    setTimeout(() => {
      setCurrentMatch((currentMatch + 1) % sampleProfiles.length);
      setTransitioning(false);
    }, 300); // match CSS transition duration
  };

  const undoLast = () => {
    setLastSwipes((prev) => {
      if (!prev.length) return prev;
      const [last, ...rest] = prev;
      setCurrentMatch(last.index);
      setActivePrompt(last.photoIndex ?? 0);
      return rest;
    });
  };

  // Keyboard controls: Left = pass, Right = like, Up = super like, Z/Backspace = undo
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
        console.log('⌨️ ArrowRight → Like');
        // mimic like path (alert + advance)
        alert('Match! 💙 ' + sampleProfiles[currentMatch].name);
        handleAction('right');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        console.log('⌨️ ArrowUp → Super Like');
        alert(`Super Liked ⭐ ${sampleProfiles[currentMatch].name}`);
        handleAction('up');
      } else if (e.key === 'Backspace' || e.key.toLowerCase() === 'z') {
        e.preventDefault();
        console.log('⌨️ Undo last swipe');
        undoLast();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentMatch, activePrompt, showFilters, sampleProfiles]);
  return (
    <div className="min-h-full bg-[#FAFAFA]">
      <div className="h-2"></div>

      {loading ? (
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <PhotoCardSkeleton />
          </div>
          <article className="relative -mt-10 mx-4 cb-card rounded-[28px] p-6 shadow-[0_-4px_24px_rgba(0,0,0,0.06),0_8px_32px_rgba(0,0,0,0.08)] mb-24 z-40">
            {/* Profile header skeleton */}
            <div className="mb-4">
              <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
              <div className="h-3 w-56 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            {/* Info chips skeleton */}
            <div className="flex flex-wrap gap-2 mb-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-8 w-28 bg-gray-200 dark:bg-gray-700 rounded-full" />
              ))}
            </div>
            {/* Prompt skeletons */}
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <PromptCardSkeleton key={i} index={i} />
              ))}
            </div>
          </article>
        </div>
      ) : sampleProfiles[currentMatch] ? (
        <div 
          className="max-w-2xl mx-auto"
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? 'translateY(12px)' : 'translateY(0)',
            transition: 'opacity 300ms ease-out, transform 300ms ease-out'
          }}
        >
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
              onSwipeLeft={() => {
                console.log('👈 Swiped LEFT - Pass on', sampleProfiles[currentMatch].name);
                handleAction('left');
              }}
              onSwipeRight={() => {
                console.log('👉 Swiped RIGHT - Like', sampleProfiles[currentMatch].name);
                alert('Match! 💙 ' + sampleProfiles[currentMatch].name);
                handleAction('right');
              }}
              onSwipeUp={() => {
                const name = sampleProfiles[currentMatch].name;
                console.log('⬆️ Swiped UP - Super Like', name);
                alert(`Super Liked ⭐ ${name}`);
                handleAction('up');
              }}
            />

            {/* Undo button */}
            <button
              onClick={undoLast}
              disabled={!lastSwipes.length}
              aria-label="Undo last swipe"
              className={`absolute left-6 bottom-24 flex items-center gap-2 px-3 py-2 rounded-full border text-sm font-semibold transition-all ${lastSwipes.length ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 shadow dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]' : 'bg-white/70 dark:bg-gray-800/70 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'}`}
              style={{ zIndex: 'var(--z-dropdown, 40)' }}
            >
              <RotateCcw className="w-4 h-4" />
              Undo
            </button>
            
            <ActionButtons
              onPass={() => {
                console.log('❌ Pass (button)');
                handleAction('left');
              }}
              onFavorite={() => {
                const name = sampleProfiles[currentMatch].name;
                alert(`Added ${name} to your favorites ⭐`);
              }}
              onConnect={() => {
                alert('Match! 💙 ' + sampleProfiles[currentMatch].name);
                handleAction('right');
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
              {sampleProfiles[currentMatch].prompts.map((prompt, idx) => {
                const pKey = `${sampleProfiles[currentMatch].id}:${idx}`;
                const isLiked = likedPrompts && likedPrompts.has && likedPrompts.has(pKey);
                const likeCount = (prompt.likes || 0) + (isLiked ? 1 : 0);
                return (
                  <PromptCard
                    key={idx}
                    question={prompt.question}
                    answer={prompt.answer}
                    type={prompt.type}
                    duration={prompt.duration}
                    likes={likeCount}
                    isLiked={!!isLiked}
                    index={idx}
                    onLike={() => togglePromptLike && togglePromptLike(pKey)}
                    onComment={() => {
                      setCommentKey(pKey);
                      setCommentText('');
                    }}
                    onPlayVoice={() => console.log('Play voice:', prompt.answer)}
                  />
                );
              })}
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
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">No more profiles!</h3>
            <p className="text-gray-600 dark:text-gray-400">Check back later for new matches</p>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-t-3xl w-full max-w-md max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-900 px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Filters</h2>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Distance */}
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">Distance: {maxDistance} miles</label>
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
                <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">Age Range: {ageRange[0]} - {ageRange[1]}</label>
                <div className="flex gap-4">
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
                <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">Healthcare Role</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Nurse', 'Doctor', 'Paramedic', 'Therapist', 'Admin', 'Any'].map((role) => (
                    <button key={role} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-400 transition-all">
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

      {/* Comment Modal */}
      {commentKey && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[80vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Add a comment</h3>
              <button onClick={() => setCommentKey(null)} className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={4}
                maxLength={240}
                placeholder="Share a thoughtful reply…"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-gray-900 resize-none"
              />
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{commentText.length}/240</span>
                <span>Be kind and constructive</span>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setCommentKey(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!commentText.trim()) return;
                    addPromptComment && addPromptComment(commentKey, commentText.trim());
                    setCommentKey(null);
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all"
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
