/**
 * Matches Tab - Who Likes You & Match Conversations
 */

import React, { useEffect, useState } from 'react';
import { Heart, Zap, ChevronRight } from 'lucide-react';
import { MatchCardSkeleton } from '../skeletons/MatchCardSkeleton';

export function MatchesTab({ whoLikesYou, myMatches, setSelectedMatch }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6">
      {/* Who Likes You Section - Responsive */}
      <div className="bg-gradient-to-br from-pink-500 via-pink-600 to-rose-600 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 text-white cb-shadow-card">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-xl font-bold">Who Likes You</h3>
              <p className="text-xs sm:text-sm opacity-90">{whoLikesYou.length} people are interested</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
        </div>
        {loading ? (
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="cb-card rounded-2xl p-3 sm:p-4 min-w-[160px] sm:min-w-[200px] bg-white dark:bg-gray-800 relative overflow-hidden">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gray-200 dark:bg-gray-700 mb-2" />
                <div className="h-3 sm:h-4 w-20 sm:w-24 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
                <div className="h-2 sm:h-3 w-24 sm:w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                <div className="h-2 sm:h-3 w-20 sm:w-28 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="absolute inset-0 cb-shimmer" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
            {whoLikesYou.map((person, idx) => (
              <div key={idx} className="cb-card rounded-2xl p-3 sm:p-4 min-w-[160px] sm:min-w-[200px] bg-white dark:bg-gray-800">
                <div className="text-3xl sm:text-4xl mb-2">{person.photo}</div>
                <h4 className="font-bold text-sm sm:text-lg truncate">{person.name}</h4>
                <p className="text-xs sm:text-sm opacity-90 mb-2 truncate">{person.role}</p>
                <div className="flex items-center gap-1 text-xs sm:text-sm">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="cb-chip font-semibold border border-white/30 text-[10px] sm:text-xs">{person.compatibility}% Match</span>
                </div>
                <p className="text-[10px] sm:text-xs opacity-75 mt-2 line-clamp-2">{person.preview}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Matches List - Responsive */}
      <div className="space-y-2 sm:space-y-3 mb-24">
        {loading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <MatchCardSkeleton key={idx} index={idx} />
          ))
        ) : (
          myMatches.map(match => (
            <button
              key={match.id}
              onClick={() => setSelectedMatch(match)}
              className="w-full cb-card rounded-2xl p-3 sm:p-4 cb-shadow-card hover:border-blue-300 hover:scale-[1.02] transition-all text-left"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 text-2xl sm:text-3xl flex items-center justify-center">{match.photo}</div>
                  {match.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                    <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100 truncate">{match.name}</h3>
                    {match.yourTurn && (
                      <span className="bg-blue-100 text-blue-700 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-bold flex-shrink-0">
                        Your turn
                      </span>
                    )}
                  </div>
                  <p className={`text-xs sm:text-sm line-clamp-1 ${match.unread ? 'text-gray-900 dark:text-gray-100 font-semibold' : 'text-gray-600 dark:text-gray-400'}`}>
                    {match.lastMessage}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-[10px] sm:text-xs text-gray-500/90 dark:text-gray-400/90 mb-1 sm:mb-2">{match.time}</div>
                  {match.unread && (
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-pink-500 rounded-full ml-auto"></div>
                  )}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default MatchesTab;
