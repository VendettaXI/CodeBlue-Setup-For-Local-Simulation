/**
 * ============================================================================
 * InfoChips Component
 * ============================================================================
 * 
 * Grid of colorful information chips displaying profile details with gradients.
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
 * - Enhanced category-colored gradients per chip type (more visible)
 * - Compact chip size
 * - Typography hierarchy with Medium labels, Light values
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
 * TYPOGRAPHY SYSTEM:
 * - Labels: 15px, font-medium (500), tracking-wide, uppercase, gray-600
 * - Values: 17px, font-light (300), tracking-wide, gray-900
 * - System font stack ensures consistent reading experience
 * 
 * STYLING:
 * - Grid: 2 cols (mobile) → 3 cols (sm+)
 * - Gap: 0.5rem (8px)
 * - Chip: More visible gradient background, rounded-xl, compact padding
 * - Icon: 28px square, rounded-lg, category color
 * - Padding: px-2.5 py-1.5 (compact)
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

export const InfoChips = React.memo(function InfoChips({
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
      gradient: 'from-blue-100 to-indigo-100',
      darkGradient: 'dark:from-blue-900/40 dark:to-indigo-900/40',
      iconBg: 'bg-blue-100 dark:bg-blue-800/50',
      iconColor: 'text-blue-700 dark:text-blue-400'
    },
    {
      icon: Building2,
      label: 'Hospital',
      value: hospital || '—',
      gradient: 'from-purple-100 to-pink-100',
      darkGradient: 'dark:from-purple-900/40 dark:to-pink-900/40',
      iconBg: 'bg-purple-100 dark:bg-purple-800/50',
      iconColor: 'text-purple-700 dark:text-purple-400'
    },
    {
      icon: Clock,
      label: 'Shift',
      value: shift || '—',
      gradient: 'from-amber-100 to-orange-100',
      darkGradient: 'dark:from-amber-900/40 dark:to-orange-900/40',
      iconBg: 'bg-amber-100 dark:bg-amber-800/50',
      iconColor: 'text-amber-700 dark:text-amber-400'
    },
    {
      icon: MapPin,
      label: 'Distance',
      value: distance || '—',
      gradient: 'from-green-100 to-emerald-100',
      darkGradient: 'dark:from-green-900/40 dark:to-emerald-900/40',
      iconBg: 'bg-green-100 dark:bg-green-800/50',
      iconColor: 'text-green-700 dark:text-green-400'
    },
    {
      icon: Users,
      label: 'Mutual',
      value: `${mutualConnections} mutual`,
      gradient: 'from-indigo-100 to-blue-100',
      darkGradient: 'dark:from-indigo-900/40 dark:to-blue-900/40',
      iconBg: 'bg-indigo-100 dark:bg-indigo-800/50',
      iconColor: 'text-indigo-700 dark:text-indigo-400'
    },
    // Conditionally add response rate chip
    ...(responseRate ? [{
      icon: Zap,
      label: 'Response',
      value: responseRate,
      gradient: 'from-pink-100 to-rose-100',
      darkGradient: 'dark:from-pink-900/40 dark:to-rose-900/40',
      iconBg: 'bg-pink-100 dark:bg-pink-800/50',
      iconColor: 'text-pink-700 dark:text-pink-400'
    }] : [])
  ];

  return (
    <div 
      className="mb-5 sm:mb-6 grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2" 
      role="list" 
      aria-label="Profile information"
    >
      {chips.map((item, idx) => (
        <div
          key={idx}
          role="listitem"
          aria-label={`${item.label}: ${item.value}`}
          className={`bg-gradient-to-br ${item.gradient} ${item.darkGradient} rounded-xl px-2 sm:px-2.5 py-1.5 flex items-center gap-2 sm:gap-2.5 min-w-0 shadow-sm border border-white/60 dark:border-gray-700/50 hover:scale-105 transition-transform duration-200 cb-reveal`}
          style={{ animationDelay: `${idx * 60}ms` }}
        >
          {/* Icon Container */}
          <div className={`w-6 h-6 sm:w-7 sm:h-7 ${item.iconBg} rounded-lg flex items-center justify-center shadow-sm flex-shrink-0`}>
            <item.icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${item.iconColor}`} />
          </div>
          
          {/* Label & Value - Responsive: labels 11→15px, values 13→17px, slightly spaced */}
          <div className="min-w-0">
            <div className="text-[11px] sm:text-[15px] font-bold cb-slightly-spaced uppercase text-gray-500/90 dark:text-gray-400/90">
              {item.label}
            </div>
            <div className="text-[13px] sm:text-[17px] font-light text-gray-900 dark:text-gray-100 truncate cb-slightly-spaced" title={item.value}>
              {item.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

// Default export for convenience
export default InfoChips;
