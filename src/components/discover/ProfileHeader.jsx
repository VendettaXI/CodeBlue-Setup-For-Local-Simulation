/**
 * ============================================================================
 * ProfileHeader Component
 * ============================================================================
 * 
 * Displays the profile name, age, role, and specialty with refined typography.
 * 
 * WHAT IT DISPLAYS:
 * - Name (28px, Sans-Serif Medium with gradient, slightly spaced)
 * - Age (gray, same as name, Sans-Serif Medium)
 * - Role icon (Briefcase in blue circle)
 * - Role and specialty text (17px, Sans-Serif Light, slightly spaced)
 * - More options button (3 dots)
 * 
 * FEATURES:
 * - Premium gradient text on name (gray-900 → gray-700)
 * - Icon container with subtle shadow
 * - Consistent typography hierarchy
 * - More menu button for future actions (report, share, etc.)
 * 
 * USED IN:
 * - DiscoverTab (below photo card)
 * - Could be reused in Profile view, Match preview, etc.
 * 
 * PROPS:
 * @param {string} name - User's first name
 * @param {number} age - User's age
 * @param {string} role - Healthcare professional role (e.g., "Registered Nurse")
 * @param {string} specialty - Specialty or department (optional, e.g., "Emergency Department")
 * @param {function} onMoreClick - Called when more options button is clicked (optional)
 * 
 * TYPOGRAPHY SYSTEM:
 * - Name/Age: 28px, font-medium (500), tracking-wide, gradient
 * - Role/Specialty: 17px, font-light (300), tracking-wide
 * - Icon: 24px circle, blue-50 background, blue-700 icon
 * 
 * STYLING:
 * - Name: 28px Medium, tracking-wide, gradient
 * - Age: gray-500, Medium, comma-separated
 * - Role: 17px Light, tracking-wide, with icon
 * - Specialty: gray-500, Light, separated by bullet
 * - Icon: 24px circle, blue-50 background, blue-700 icon
 * 
 * EXAMPLE USAGE:
 * ```jsx
 * <ProfileHeader
 *   name="Sarah"
 *   age={29}
 *   role="Registered Nurse"
 *   specialty="Emergency Department"
 *   onMoreClick={() => console.log('More options')}
 * />
 * ```
 * 
 * ACCESSIBILITY:
 * - Semantic heading (h2) with id for aria-labelledby
 * - Clear visual hierarchy
 * - High contrast text
 * - Touch-friendly more button (40x40px tap target)
 * ============================================================================
 */

import React from 'react';
import { Briefcase, MoreHorizontal } from 'lucide-react';

export const ProfileHeader = React.memo(function ProfileHeader({
  name,
  age,
  role,
  specialty,
  onMoreClick
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        {/* Name & Age - Sans-Serif Bold with gradient, slightly spaced */}
        <h2 
          id="profile-title" 
          className="text-[28px] font-bold cb-slightly-spaced leading-none bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 dark:from-gray-100 dark:via-gray-200 dark:to-gray-300 bg-clip-text text-transparent"
        >
          {name}
          {age && (
            <span className="text-gray-500 dark:text-gray-400 font-bold">{`, ${age}`}</span>
          )}
        </h2>
        
        {/* Role & Specialty - Sans-Serif Light 17px, slightly spaced */}
        {role && (
          <div className="mt-2 flex items-center gap-2 text-gray-700 dark:text-gray-300">
            {/* Briefcase Icon Container */}
            <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shadow-sm">
              <Briefcase className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </div>
            
            {/* Role & Specialty Text - Responsive: 16px → 17px at sm+ */}
            <p className="text-[16px] sm:text-[17px] font-light leading-tight cb-slightly-spaced">
              {role}
              {specialty && (
                <span className="text-gray-500 dark:text-gray-400 font-light">{` • ${specialty}`}</span>
              )}
            </p>
          </div>
        )}
      </div>
      
      {/* More Options Button */}
      {onMoreClick && (
        <button 
          onClick={onMoreClick}
          aria-label="More options"
          className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-400 transition-all border border-gray-100 dark:border-gray-700"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      )}
    </div>
  );
});

// Default export for convenience
export default ProfileHeader;
