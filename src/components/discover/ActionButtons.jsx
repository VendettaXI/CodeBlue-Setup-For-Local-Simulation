/**
 * ============================================================================
 * ActionButtons Component
 * ============================================================================
 * 
 * The three premium action buttons for profile interactions in Discover tab.
 * 
 * WHAT IT DISPLAYS:
 * - Pass Button (X) - White, 64px, left position
 * - Favorite Button (Star) - Blue gradient, 64px, center
 * - Connect Button (Heart) - Pink gradient, 80px (primary), right position
 * 
 * FEATURES:
 * - Premium shadows with color-specific glows
 * - Hover animations (scale, translate, rotate)
 * - Active press states
 * - Focus-visible outlines for accessibility
 * - ARIA labels for screen readers
 * 
 * USED IN:
 * - DiscoverTab (below profile photo card)
 * 
 * PROPS:
 * @param {function} onPass - Called when Pass (X) is clicked
 * @param {function} onFavorite - Called when Favorite (Star) is clicked
 * @param {function} onConnect - Called when Connect (Heart) is clicked
 * @param {string} profileName - Name for alert messages (optional)
 * 
 * STYLING:
 * - Positioned absolutely at bottom-24 of parent
 * - Centered horizontally with left-1/2 -translate-x-1/2
 * - Gap of 24px between buttons
 * - z-index: var(--z-dropdown, 40) for layering
 * 
 * EXAMPLE USAGE:
 * ```jsx
 * <ActionButtons
 *   onPass={() => skipToNextProfile()}
 *   onFavorite={() => addToFavorites(profile.id)}
 *   onConnect={() => sendLike(profile.id)}
 *   profileName={profile.name}
 * />
 * ```
 * 
 * ACCESSIBILITY:
 * - aria-label on each button describes action
 * - Keyboard accessible (Tab navigation)
 * - Focus indicators visible (blue outline)
 * - Touch-friendly sizes (64px, 80px)
 * 
 * ANIMATIONS:
 * - Hover: scale(1.1), translateY(-4px)
 * - Hover Pass: rotate(6deg)
 * - Hover Favorite: rotate(-6deg)
 * - Active: scale(0.95), translateY(0)
 * - Transition: 300ms cubic-bezier ease-out
 * ============================================================================
 */

import React from 'react';
import { X, Star, Heart } from 'lucide-react';

export const ActionButtons = React.memo(function ActionButtons({
  onPass,
  onFavorite,
  onConnect,
  profileName = ''
}) {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 bottom-24 flex items-center justify-center gap-6 pointer-events-auto"
      style={{ zIndex: 'var(--z-dropdown, 40)' }}
    >
      {/* Pass Button (X) - White with subtle shadow */}
      <button
        aria-label="Pass on this profile"
        onClick={onPass}
        className="flex items-center justify-center rounded-full w-16 h-16 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-100 dark:border-gray-700 shadow-[0_4px_16px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.04),0_0_0_1px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:shadow-[0_8px_24px_rgba(0,0,0,0.12),0_4px_8px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:text-gray-900 dark:hover:text-gray-100 hover:scale-110 hover:-translate-y-1 hover:rotate-6 active:scale-95 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        <X className="w-7 h-7" />
      </button>

      {/* Favorite Button (Star) - Blue gradient with glow */}
      <button
        aria-label="Add to favorites"
        onClick={onFavorite}
        className="flex items-center justify-center rounded-full w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white shadow-[0_6px_20px_rgba(59,130,246,0.35),0_2px_8px_rgba(37,99,235,0.2),0_0_0_1px_rgba(255,255,255,0.1)_inset] dark:shadow-[0_6px_20px_rgba(59,130,246,0.5),0_2px_8px_rgba(37,99,235,0.3)] transition-all duration-300 ease-out hover:shadow-[0_8px_28px_rgba(59,130,246,0.45),0_4px_12px_rgba(37,99,235,0.3)] dark:hover:shadow-[0_8px_28px_rgba(59,130,246,0.6)] hover:from-blue-400 hover:to-blue-500 dark:hover:from-blue-500 dark:hover:to-blue-600 hover:scale-110 hover:-translate-y-1 hover:-rotate-6 active:scale-95 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        <Star className="w-7 h-7" />
      </button>

      {/* Connect Button (Heart) - Pink gradient, PRIMARY ACTION (larger) */}
      <button
        aria-label="Send a like and connect"
        onClick={onConnect}
        className="flex items-center justify-center rounded-full w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 dark:from-pink-600 dark:to-pink-700 text-white shadow-[0_8px_28px_rgba(236,72,153,0.4),0_4px_12px_rgba(219,39,119,0.25),0_0_0_1px_rgba(255,255,255,0.15)_inset] dark:shadow-[0_8px_28px_rgba(236,72,153,0.5),0_4px_12px_rgba(219,39,119,0.35)] transition-all duration-300 ease-out hover:shadow-[0_12px_36px_rgba(236,72,153,0.5),0_6px_16px_rgba(219,39,119,0.35)] dark:hover:shadow-[0_12px_36px_rgba(236,72,153,0.6)] hover:from-pink-400 hover:to-pink-500 dark:hover:from-pink-500 dark:hover:to-pink-600 hover:scale-110 hover:-translate-y-1.5 active:scale-95 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
      >
        <Heart className="w-8 h-8" />
      </button>
    </div>
  );
});

// Default export for convenience
export default ActionButtons;
