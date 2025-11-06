/**
 * Home Tab - Dashboard with stats, top match, and profile completion
 */

import React from 'react';
import { User, TrendingUp, Heart, Sparkles, Zap, Users, Award, Check } from 'lucide-react';

export function HomeTab({
  setCurrentScreen,
  userProfile,
  dailyInsights,
  sampleProfiles,
  setActiveTab
}) {
  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 relative">
      {/* Profile shortcut - Responsive */}
      <button
        onClick={() => setCurrentScreen('profile')}
        title="Open profile"
        className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center cb-shadow-card hover:scale-105 transition-transform"
      >
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-lg sm:text-xl">
          {userProfile && userProfile.photos && userProfile.photos[0] ? (
            (typeof userProfile.photos[0] === 'string' && userProfile.photos[0].startsWith('http')) ? (
              <img src={userProfile.photos[0]} alt={userProfile.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-base sm:text-lg leading-none">{userProfile.photos[0]}</span>
            )
          ) : (
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
          )}
        </div>
      </button>

      <div className="mb-4 sm:mb-6 pr-12 sm:pr-14">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2">Welcome Back, Venice! 👋</h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Here's what's happening today</p>
      </div>

      {/* Quick Stats - Responsive */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-3 sm:p-5 text-white cb-shadow-card">
          <div className="text-2xl sm:text-3xl font-bold mb-0.5 sm:mb-1">{dailyInsights.profileViews}</div>
          <div className="text-xs sm:text-sm opacity-90 leading-tight">Profile Views Today</div>
          <div className="flex items-center gap-1 mt-1.5 sm:mt-2 text-[10px] sm:text-xs">
            <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span>+5 from yesterday</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-3 sm:p-5 text-white cb-shadow-card">
          <div className="text-2xl sm:text-3xl font-bold mb-0.5 sm:mb-1">{dailyInsights.newLikes}</div>
          <div className="text-xs sm:text-sm opacity-90">New Likes</div>
          <div className="flex items-center gap-1 mt-1.5 sm:mt-2 text-[10px] sm:text-xs">
            <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
            <span>Check them out!</span>
          </div>
        </div>
      </div>

      {/* Top Match Highlight - Responsive */}
      <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 cb-card shadow-sm dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">Your Top Match Today</h3>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-400 to-purple-400 flex-shrink-0">
            {sampleProfiles[0].photos[0].url ? (
              <img 
                src={sampleProfiles[0].photos[0].url} 
                alt={sampleProfiles[0].photos[0].alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl" style={{display: sampleProfiles[0].photos[0].url ? 'none' : 'flex'}}>
              {sampleProfiles[0].photos[0].emoji || '👤'}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 truncate">{sampleProfiles[0].name}, {sampleProfiles[0].age}</h4>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1.5 sm:mb-2 truncate">{sampleProfiles[0].role}</p>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600 dark:text-green-300" />
                <span className="cb-chip text-[10px] sm:text-xs font-bold text-green-700 dark:text-green-200 border border-white/30">{sampleProfiles[0].shiftCompatibility}% Match</span>
              </div>
              <div className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600 dark:text-blue-300" />
                <span className="text-[10px] sm:text-xs font-bold text-blue-700 dark:text-blue-200">{sampleProfiles[0].mutualConnections} mutual</span>
              </div>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setActiveTab('discover')}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-bold hover:from-pink-600 hover:to-rose-700 transition-all cb-shadow-card"
        >
          View Profile
        </button>
      </div>

      {/* Profile Completion - Responsive */}
      {userProfile.profileComplete < 100 && (
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 sm:p-6 text-white mb-4 sm:mb-6 cb-shadow-card">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Award className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold">Complete Your Profile</h3>
              <p className="text-xs sm:text-sm opacity-90">{userProfile.profileComplete}% complete</p>
            </div>
          </div>
          <div className="h-1.5 sm:h-2 bg-white bg-opacity-20 dark:bg-gray-700 rounded-full overflow-hidden mb-3 sm:mb-4">
            <div className="h-full bg-white dark:bg-gray-300 rounded-full" style={{width: `${userProfile.profileComplete}%`}}></div>
          </div>
          <p className="text-xs sm:text-sm mb-3 sm:mb-4">Complete profiles get 5x more matches! Add these to stand out:</p>
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Check className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Add 2 more photos</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Check className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Record a voice prompt</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Check className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Add your vibe</span>
            </div>
          </div>
          <button className="w-full bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-bold mt-3 sm:mt-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
            Continue Setup
          </button>
        </div>
      )}

      {/* Tip of the Day - Responsive */}
      <div className="bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-700 rounded-2xl p-4 sm:p-5 mb-24">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 dark:bg-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-sm sm:text-base text-blue-900 dark:text-blue-100 mb-0.5 sm:mb-1">Tip of the Day</h3>
            <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200">{dailyInsights.tip}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeTab;
