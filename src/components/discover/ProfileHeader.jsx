/**
 * ============================================================================
 * ProfileHeader Component
 * ============================================================================
 * 
 * Displays the profile name, age, role, and specialty with premium typography.
 * 
 * WHAT IT DISPLAYS:
 * - Name (32-36px, bold, gradient text)
 * - Age (gray, next to name)
 * - Role icon (Briefcase in blue circle)
 * - Role and specialty text
 * - More options button (3 dots)
 * 
 * FEATURES:
 * - Premium gradient text on name (gray-900 → gray-700)
 * - Tight tracking for modern look
 * - Icon container with subtle shadow
 * - Responsive text sizing (32px → 36px on larger screens)
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
 * STYLING:
 * - Name: 32-36px, font-black, tracking-tight, gradient
 * - Age: gray-500, bold, comma-separated
 * - Role: 15-16px, bold, with icon
 * - Specialty: gray-500, separated by bullet
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
 * 
 * TYPOGRAPHY:
 * - Font weight: 900 (black) for name
 * - Letter spacing: -0.025em (tight tracking)
 * - Line height: 1 (leading-none) for compact display
 * - Gradient: Creates depth and premium feel
 * ============================================================================
 */

import React from 'react';
import { Briefcase, MoreHorizontal } from 'lucide-react';

export function ProfileHeader({
  name,
  age,
  role,
  specialty,
  onMoreClick
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        {/* Name & Age with Premium Gradient */}
        <h2 
          id="profile-title" 
          className="text-[32px] sm:text-[36px] font-black tracking-tight leading-none bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent"
        >
          {name}
          {age && (
            <span className="text-gray-500 font-bold">{`, ${age}`}</span>
          )}
        </h2>
        
        {/* Role & Specialty with Icon */}
        {role && (
          <div className="mt-2 flex items-center gap-2 text-gray-700">
            {/* Briefcase Icon Container */}
            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shadow-sm">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
            </div>
            
            {/* Role & Specialty Text */}
            <p className="text-[15px] sm:text-base font-bold leading-tight tracking-tight">
              {role}
              {specialty && (
                <span className="text-gray-500 font-semibold">{` • ${specialty}`}</span>
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
          className="p-2 hover:bg-gray-50 rounded-full text-gray-600 transition-all border border-gray-100"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

// Default export for convenience
export default ProfileHeader;
