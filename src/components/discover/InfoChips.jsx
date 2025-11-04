/**
 * ============================================================================
 * InfoChips Component
 * ============================================================================
 * 
 * Grid of colorful information chips displaying profile details.
 * 
 * WHAT IT DISPLAYS:
 * - Specialty (blue gradient)
 * - Hospital (purple gradient)
 * - Shift (amber gradient)
 * - Distance (green gradient)
 * - Mutual connections (indigo gradient)
 * - Response rate (pink gradient, conditional)
 * 
 * FEATURES:
 * - Category-colored gradients per chip type
 * - Icon containers with matching colors
 * - Hover scale animation (1.05)
 * - Staggered reveal animation (60ms delay per chip)
 * - Responsive grid (2 cols mobile, 3 cols desktop)
 * - Truncated text with ellipsis
 * 
 * USED IN:
 * - DiscoverTab (below profile header)
 * - Could be reused in Profile view, Match preview
 * 
 * PROPS:
 * @param {string} specialty - Healthcare specialty
 * @param {string} hospital - Hospital/workplace name
 * @param {string} shift - Shift type (Day, Night, Rotating)
 * @param {string} distance - Distance from user (e.g., "2 miles away")
 * @param {number} mutualConnections - Number of mutual connections
 * @param {string} responseRate - Response time description (optional)
 * 
 * STYLING:
 * - Grid: 2 cols (mobile) → 3 cols (sm+)
 * - Gap: 0.5rem (8px)
 * - Chip: Gradient background, rounded-xl, shadow-sm
 * - Icon: 28px square, rounded-lg, category color
 * - Label: 10px, bold, uppercase, tracking-wide
 * - Value: 13px, bold, truncated
 * 
 * EXAMPLE USAGE:
 * ```jsx
 * <InfoChips
 *   specialty="Emergency Department"
 *   hospital="Royal London Hospital"
 *   shift="Night Shift"
 *   distance="2 miles away"
 *   mutualConnections={2}
 *   responseRate="Usually responds in 2 hours"
 * />
 * ```
 * 
 * ACCESSIBILITY:
 * - role="list" on container
 * - role="listitem" on each chip
 * - aria-label with full context on each chip
 * - Screen reader friendly
 * 
 * ANIMATIONS:
 * - .cb-reveal fade-up animation
 * - Staggered delays (0ms, 60ms, 120ms, 180ms, etc.)
 * - Hover: scale(1.05) with 200ms duration
 * - Respects prefers-reduced-motion
 * ============================================================================
 */

import React from 'react';
import { Stethoscope, Building2, Clock, MapPin, Users, Zap } from 'lucide-react';

export function InfoChips({
  specialty,
  hospital,
  shift,
  distance,
  mutualConnections = 0,
  responseRate
}) {
  // Define chip data with conditional response rate
  const chips = [
    {
      icon: Stethoscope,
      label: 'Specialty',
      value: specialty || '—',
      gradient: 'from-blue-50 to-blue-100/50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-700'
    },
    {
      icon: Building2,
      label: 'Hospital',
      value: hospital || '—',
      gradient: 'from-purple-50 to-purple-100/50',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-700'
    },
    {
      icon: Clock,
      label: 'Shift',
      value: shift || '—',
      gradient: 'from-amber-50 to-amber-100/50',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-700'
    },
    {
      icon: MapPin,
      label: 'Distance',
      value: distance || '—',
      gradient: 'from-green-50 to-green-100/50',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-700'
    },
    {
      icon: Users,
      label: 'Mutual',
      value: `${mutualConnections} mutual`,
      gradient: 'from-indigo-50 to-indigo-100/50',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-700'
    },
    // Conditionally add response rate chip
    ...(responseRate ? [{
      icon: Zap,
      label: 'Response',
      value: responseRate,
      gradient: 'from-pink-50 to-pink-100/50',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-700'
    }] : [])
  ];

  return (
    <div 
      className="mb-6 grid grid-cols-2 sm:grid-cols-3 gap-2" 
      role="list" 
      aria-label="Profile information"
    >
      {chips.map((item, idx) => (
        <div
          key={idx}
          role="listitem"
          aria-label={`${item.label}: ${item.value}`}
          className={`bg-gradient-to-br ${item.gradient} rounded-xl px-3 py-2.5 flex items-center gap-2.5 min-w-0 shadow-sm border border-white/60 hover:scale-105 transition-transform duration-200 cb-reveal`}
          style={{ animationDelay: `${idx * 60}ms` }}
        >
          {/* Icon Container */}
          <div className={`w-7 h-7 ${item.iconBg} rounded-lg flex items-center justify-center shadow-sm`}>
            <item.icon className={`w-3.5 h-3.5 ${item.iconColor}`} />
          </div>
          
          {/* Label & Value */}
          <div className="min-w-0">
            <div className="text-[10px] font-bold tracking-wider uppercase text-gray-500">
              {item.label}
            </div>
            <div className="text-[13px] font-bold text-gray-900 truncate">
              {item.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Default export for convenience
export default InfoChips;
