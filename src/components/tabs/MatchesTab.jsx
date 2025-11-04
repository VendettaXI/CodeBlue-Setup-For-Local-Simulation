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
    <div className="px-6 py-6">
      {/* Who Likes You Section */}
      <div className="bg-gradient-to-br from-pink-500 via-pink-600 to-rose-600 rounded-2xl p-6 mb-6 text-white cb-shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Who Likes You</h3>
              <p className="text-sm opacity-90">{whoLikesYou.length} people are interested</p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6" />
        </div>
        {loading ? (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="cb-card rounded-2xl p-4 min-w-[200px] bg-white dark:bg-gray-800 relative overflow-hidden">
                <div className="w-16 h-16 rounded-xl bg-gray-200 dark:bg-gray-700 mb-2" />
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
                <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="absolute inset-0 cb-shimmer" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {whoLikesYou.map((person, idx) => (
              <div key={idx} className="cb-card rounded-2xl p-4 min-w-[200px] bg-white">
                <div className="text-4xl mb-2">{person.photo}</div>
                <h4 className="font-bold text-lg">{person.name}</h4>
                <p className="text-sm opacity-90 mb-2">{person.role}</p>
                <div className="flex items-center gap-1 text-sm">
                  <Zap className="w-4 h-4" />
                  <span className="cb-chip font-semibold border border-white/30">{person.compatibility}% Match</span>
                </div>
                <p className="text-xs opacity-75 mt-2 line-clamp-2">{person.preview}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Matches List */}
      <div className="space-y-3 mb-24">
        {loading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <MatchCardSkeleton key={idx} index={idx} />
          ))
        ) : (
          myMatches.map(match => (
            <button
              key={match.id}
              onClick={() => setSelectedMatch(match)}
              className="w-full cb-card rounded-2xl p-4 cb-shadow-card hover:border-blue-300 hover:scale-[1.02] transition-all text-left"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 text-3xl">{match.photo}</div>
                  {match.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100">{match.name}</h3>
                    {match.yourTurn && (
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold">
                        Your turn
                      </span>
                    )}
                  </div>
                  <p className={`text-sm ${match.unread ? 'text-gray-900 dark:text-gray-100 font-semibold' : 'text-gray-600 dark:text-gray-400'}`}>
                    {match.lastMessage}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{match.time}</div>
                  {match.unread && (
                    <div className="w-3 h-3 bg-pink-500 rounded-full ml-auto"></div>
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
