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
import { X, Heart } from 'lucide-react';
import HeartbeatIcon from './HeartbeatIcon';
import PulseButton from './PulseButton';

export const ActionButtons = React.memo(function ActionButtons({
  onPass,
  onFavorite,
  onConnect,
  profileName = '',
  orientation = 'vertical' // 'vertical' (default) or 'horizontal'
}) {
  const RADII = { button: 14 };
  const C = {
    gunmetal: "rgba(15,33,58,0.90)",
    border: "rgba(15,33,58,0.10)",
  };

  return (
    <div
      className={`flex gap-4 items-center pointer-events-auto ${orientation === 'vertical' ? 'flex-col' : 'flex-row'}`}
      style={{ 
        zIndex: 'var(--z-dropdown, 40)'
      }}
    >
      {/* Pass button */}
      <button
        aria-label="Pass on this profile"
        className="flex items-center justify-center transition-all duration-300"
        style={{
          width: 48,
          height: 48,
          borderRadius: RADII.button,
          border: `1px solid ${C.border}`,
          backgroundColor: 'rgba(255,255,255,0.75)',
          cursor: 'pointer',
          boxShadow: '0 0 0 4px rgba(255,255,255,0.5), 0 8px 20px rgba(15,33,58,0.15)',
        }}
        onClick={onPass}
      >
        <X size={26} color={C.gunmetal} />
      </button>

      {/* Superlike/Favorite with animated heartbeat */}
      <div
        className="transition-all duration-300"
        style={{
          boxShadow: '0 0 0 4px rgba(255,255,255,0.5), 0 8px 20px rgba(15,33,58,0.15)',
          borderRadius: RADII.button,
        }}
      >
        <PulseButton onPress={onFavorite}>
          <HeartbeatIcon />
        </PulseButton>
      </div>

      {/* Like/Connect button */}
      <button
        aria-label="Send a like and connect"
        className="flex items-center justify-center transition-all duration-300"
        style={{
          width: 48,
          height: 48,
          borderRadius: RADII.button,
          border: `1px solid ${C.border}`,
          backgroundColor: 'rgba(255,255,255,0.75)',
          cursor: 'pointer',
          boxShadow: '0 0 0 4px rgba(255,255,255,0.5), 0 8px 20px rgba(15,33,58,0.15)',
        }}
        onClick={onConnect}
      >
        <Heart size={26} color={C.gunmetal} />
      </button>
    </div>
  );
});

// Default export for convenience
export default ActionButtons;
