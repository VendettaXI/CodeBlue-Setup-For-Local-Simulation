/**
 * Connect Tab - Events, Meetups, and Buddy Mode
 */

import React from 'react';
import { Users, Calendar, MapPin, Plus } from 'lucide-react';

export function ConnectTab({ events }) {
  return (
    <div className="px-6 py-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Events & Meetups</h2>
      
      {/* Buddy Mode Toggle */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 mb-6 text-white cb-shadow-card dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Buddy Mode</h3>
              <p className="text-sm opacity-90">Find platonic connections</p>
            </div>
          </div>
          <button className="bg-white text-green-600 px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-50 transition-all">
            Try Now
          </button>
        </div>
        <p className="text-sm opacity-90">Connect with healthcare professionals for friendship, support, and shared activities.</p>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {events.map(event => (
          <div key={event.id} className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden cb-shadow-card dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:border-blue-300 dark:hover:border-blue-600 hover:scale-[1.02] transition-all">
            <div className="flex">
              <div className="w-20 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-4xl flex-shrink-0">
                {event.image}
              </div>
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{event.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    event.category === 'Wellness' ? 'bg-green-100 text-green-700' :
                    event.category === 'Support' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {event.category}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} going</span>
                    </div>
                    {event.going > 0 && (
                      <span className="text-blue-600 font-semibold">
                        {event.going} friends attending
                      </span>
                    )}
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-all">
                    RSVP
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Event Button */}
      <button className="w-full mt-6 mb-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all cb-shadow-card flex items-center justify-center gap-2">
        <Plus className="w-5 h-5" />
        Create Your Own Event
      </button>
    </div>
  );
}

export default ConnectTab;
