/**
 * Vent Tab - Anonymous Support Rooms
 */

import React from 'react';
import { Shield, ChevronRight, TrendingUp, Lock, AlertCircle, Phone } from 'lucide-react';

export function VentTab({ ventRoom, setVentRoom, ventTopics }) {
  return (
    <div className="px-6 py-6">
      {!ventRoom ? (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Anonymous Vent Space 💭</h2>
            <p className="text-gray-600 dark:text-gray-400">A safe space to release and be heard</p>
          </div>

          {/* Vent Stats */}
          <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 rounded-2xl p-6 text-white mb-6 cb-shadow-card dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <h3 className="text-xl font-bold mb-4">Community Support 24/7</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white bg-opacity-10 rounded-xl p-4 text-center backdrop-blur-sm">
                <div className="font-bold text-2xl mb-1">40</div>
                <div className="text-xs opacity-90">People Online</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-xl p-4 text-center backdrop-blur-sm">
                <div className="font-bold text-2xl mb-1">24/7</div>
                <div className="text-xs opacity-90">Available</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-xl p-4 text-center backdrop-blur-sm">
                <div className="font-bold text-2xl mb-1">100%</div>
                <div className="text-xs opacity-90">Anonymous</div>
              </div>
            </div>
          </div>

          {/* Safety Notice */}
          <div className="bg-green-50 dark:bg-green-900/30 border-2 border-green-200 dark:border-green-700 rounded-2xl p-5 mb-6 flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-bold text-green-900 dark:text-green-100 mb-2">Your Safety Matters</h3>
              <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                <li>• All conversations are anonymous and auto-delete</li>
                <li>• AI moderation protects patient privacy</li>
                <li>• Professional support available 24/7</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            {ventTopics.map(topic => (
              <button
                key={topic.id}
                onClick={() => setVentRoom(topic)}
                className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 cb-shadow-card dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:border-blue-300 dark:hover:border-blue-600 hover:scale-[1.02] transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${topic.gradient} rounded-2xl flex items-center justify-center text-3xl cb-shadow-card flex-shrink-0`}>
                    {topic.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{topic.name}</h3>
                      {topic.trending && (
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{topic.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{topic.active} people online</span>
                      <span className="text-gray-500 dark:text-gray-400">• Active now</span>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                </div>
              </button>
            ))}

            <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 rounded-2xl p-6 text-white cb-shadow-card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Lock className="w-6 h-6" />
                    <h3 className="text-xl font-bold">1-on-1 Anonymous Chat</h3>
                  </div>
                  <p className="text-blue-100 text-sm">Get paired with another healthcare professional for private, anonymous support.</p>
                </div>
              </div>
              <button className="bg-white dark:bg-gray-800 text-blue-900 dark:text-blue-400 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 dark:hover:bg-gray-700 w-full transition-all cb-shadow-card">
                Start Private Chat
              </button>
            </div>

            {/* Crisis Resources */}
            <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-700 rounded-2xl p-5 mb-24">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-red-900 dark:text-red-100 mb-2">Need Immediate Help?</h3>
                <p className="text-sm text-red-800 dark:text-red-200 mb-3">If you're in crisis, please reach out to professional support:</p>
                  <div className="space-y-2">
                    <button className="w-full bg-red-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all flex items-center justify-center gap-2">
                      <Phone className="w-5 h-5" />
                      Call Crisis Hotline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="mb-24">
          <button
            onClick={() => setVentRoom(null)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4 hover:text-gray-900 dark:hover:text-gray-100 font-semibold"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            Back to rooms
          </button>

          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden cb-shadow-card dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
            <div className={`bg-gradient-to-r ${ventRoom.gradient} px-6 py-5 flex items-center gap-4 text-white`}>
              <div className={`w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-sm`}>
                {ventRoom.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">{ventRoom.name}</h3>
                <p className="text-sm opacity-90">Anonymous • {ventRoom.active} online • Auto-deletes in 10 min</p>
              </div>
              {ventRoom.trending && (
                <div className="bg-white bg-opacity-20 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 backdrop-blur-sm">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </div>
              )}
            </div>

            <div className="h-96 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900/50 space-y-4">
              <div className="bg-blue-600 text-white rounded-2xl p-5 max-w-sm shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-sm">Nurse_42</div>
                  <span className="text-xs opacity-75">2 min ago</span>
                </div>
                <p className="text-sm leading-relaxed">Just finished a brutal 12-hour shift. Completely drained. Anyone else struggling to decompress?</p>
              </div>
              <div className="bg-blue-700 text-white rounded-2xl p-5 max-w-sm ml-auto shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-sm">Doctor_18</div>
                  <span className="text-xs opacity-75">1 min ago</span>
                </div>
                <p className="text-sm leading-relaxed">You're not alone. The night shifts are especially rough. Take care of yourself 💙</p>
              </div>
              <div className="bg-green-600 text-white rounded-2xl p-5 max-w-sm shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-sm">EMT_77</div>
                  <span className="text-xs opacity-75">Just now</span>
                </div>
                <p className="text-sm leading-relaxed">Same here. What helps me is a quick walk outside before heading home. Fresh air makes a difference.</p>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-gray-800 border-t-2 border-gray-100 dark:border-gray-700">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Type anonymously..."
                  className="flex-1 px-5 py-3 bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all">
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

export default VentTab;
