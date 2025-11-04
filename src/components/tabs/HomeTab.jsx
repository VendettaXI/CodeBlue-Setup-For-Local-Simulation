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
    <div className="px-6 py-6 relative">
      {/* Profile shortcut */}
      <button
        onClick={() => setCurrentScreen('profile')}
        title="Open profile"
        className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center cb-shadow-card hover:scale-105 transition-transform"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 text-xl">
          {userProfile && userProfile.photos && userProfile.photos[0] ? (
            (typeof userProfile.photos[0] === 'string' && userProfile.photos[0].startsWith('http')) ? (
              <img src={userProfile.photos[0]} alt={userProfile.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg leading-none">{userProfile.photos[0]}</span>
            )
          ) : (
            <User className="w-6 h-6 text-gray-700" />
          )}
        </div>
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back, Venice! 👋</h2>
        <p className="text-gray-600">Here's what's happening today</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white cb-shadow-card">
          <div className="text-3xl font-bold mb-1">{dailyInsights.profileViews}</div>
          <div className="text-sm opacity-90">Profile Views Today</div>
          <div className="flex items-center gap-1 mt-2 text-xs">
            <TrendingUp className="w-3 h-3" />
            <span>+5 from yesterday</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-5 text-white cb-shadow-card">
          <div className="text-3xl font-bold mb-1">{dailyInsights.newLikes}</div>
          <div className="text-sm opacity-90">New Likes</div>
          <div className="flex items-center gap-1 mt-2 text-xs">
            <Heart className="w-3 h-3 fill-current" />
            <span>Check them out!</span>
          </div>
        </div>
      </div>

      {/* Top Match Highlight */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-bold text-gray-900">Your Top Match Today</h3>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-400 to-purple-400 flex-shrink-0">
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
            <div className="w-full h-full flex items-center justify-center text-3xl" style={{display: sampleProfiles[0].photos[0].url ? 'none' : 'flex'}}>
              {sampleProfiles[0].photos[0].emoji || '👤'}
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold text-gray-900">{sampleProfiles[0].name}, {sampleProfiles[0].age}</h4>
            <p className="text-sm text-gray-600 mb-2">{sampleProfiles[0].role}</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                <Zap className="w-3 h-3 text-green-600" />
                <span className="cb-chip text-xs font-bold text-green-700 border border-white/30">{sampleProfiles[0].shiftCompatibility}% Match</span>
              </div>
              <div className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded-full">
                <Users className="w-3 h-3 text-blue-600" />
                <span className="text-xs font-bold text-blue-700">{sampleProfiles[0].mutualConnections} mutual</span>
              </div>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setActiveTab('discover')}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3 rounded-xl font-bold hover:from-pink-600 hover:to-rose-700 transition-all cb-shadow-card"
        >
          View Profile
        </button>
      </div>

      {/* Profile Completion */}
      {userProfile.profileComplete < 100 && (
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white mb-6 cb-shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-bold">Complete Your Profile</h3>
              <p className="text-sm opacity-90">{userProfile.profileComplete}% complete</p>
            </div>
          </div>
          <div className="h-2 bg-white bg-opacity-20 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-white rounded-full" style={{width: `${userProfile.profileComplete}%`}}></div>
          </div>
          <p className="text-sm mb-4">Complete profiles get 5x more matches! Add these to stand out:</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4" />
              <span>Add 2 more photos</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4" />
              <span>Record a voice prompt</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4" />
              <span>Add your vibe</span>
            </div>
          </div>
          <button className="w-full bg-white text-purple-600 py-3 rounded-xl font-bold mt-4 hover:bg-gray-50 transition-all">
            Continue Setup
          </button>
        </div>
      )}

      {/* Tip of the Day */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-t-2xl p-5 mb-24">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-blue-900 mb-1">Tip of the Day</h3>
            <p className="text-sm text-blue-800">{dailyInsights.tip}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeTab;
