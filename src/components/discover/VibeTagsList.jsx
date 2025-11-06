/**
 * ============================================================================
 * VibeTagsList Component
 * ============================================================================
 * 
 * Display lists of vibe tags and dealbreakers with gradient styling.
 * 
 * WHAT IT DISPLAYS:
 * - "My Vibe" section: Blue gradient tags
 * - "Dealbreakers" section: Red gradient tags (conditional)
 * - Section headers with uppercase styling
 * 
 * FEATURES:
 * - Responsive flex-wrap layout
 * - Hover scale animation (1.05)
 * - Color-coded gradients (blue for vibes, red for dealbreakers)
 * - Border and shadow effects
 * - Conditional rendering of dealbreakers
 * 
 * USED IN:
 * - DiscoverTab (below prompts)
 * - Profile view, Match details
 * 
 * PROPS:
 * @param {string[]} vibes - Array of vibe tags (interests, traits)
 * @param {string[]} dealbreakers - Array of dealbreaker tags (optional)
 * 
 * TYPOGRAPHY SYSTEM:
 * - Section headers: 15px, font-medium (500), tracking-wide, uppercase
 * - Tag text: 15px, font-light (300), tracking-wide
 * - Rounded-full pills with gradient backgrounds
 * 
 * STYLING:
 * - Vibe tags: Blue gradient (from-blue-50 to-blue-100/60)
 * - Dealbreaker tags: Red gradient (from-red-50 to-red-100/60)
 * - Padding: px-4 py-2.5
 * - Gap: 0.5rem (8px)
 * 
 * EXAMPLE USAGE:
 * ```jsx
 * <VibeTagsList
 *   vibes={['Coffee addict', 'Night shift warrior', 'Bookworm']}
 *   dealbreakers={['Smoking', 'Poor communication']}
 * />
 * ```
 * 
 * ACCESSIBILITY:
 * - Semantic HTML with proper heading hierarchy
 * - Screen reader friendly tag lists
 * - Clear visual distinction between vibes and dealbreakers
 * ============================================================================
 */

import React from 'react';

export const VibeTagsList = React.memo(function VibeTagsList({
  vibes = [],
  dealbreakers = []
}) {
  return (
    <div className="mt-5 sm:mt-6 space-y-3 sm:space-y-4">
      {/* My Vibe Section */}
      {vibes.length > 0 && (
        <div>
          <h3 className="text-[13px] sm:text-[15px] font-bold cb-slightly-spaced uppercase text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">
            My Vibe
          </h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {vibes.map((vibe, idx) => (
              <span 
                key={idx}
                className="bg-gradient-to-br from-blue-50 to-blue-100/60 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-700 dark:text-blue-300 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-[13px] sm:text-[15px] font-light cb-slightly-spaced border border-blue-200/60 dark:border-blue-700/40 shadow-sm hover:scale-105 hover:shadow-md transition-all duration-200"
              >
                {vibe}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Dealbreakers Section */}
      {dealbreakers.length > 0 && (
        <div>
          <h3 className="text-[13px] sm:text-[15px] font-bold cb-slightly-spaced uppercase text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">
            Dealbreakers
          </h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {dealbreakers.map((deal, idx) => (
              <span 
                key={idx}
                className="bg-gradient-to-br from-red-50 to-red-100/60 dark:from-red-900/30 dark:to-red-800/20 text-red-700 dark:text-red-300 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-[13px] sm:text-[15px] font-light cb-slightly-spaced border border-red-200/60 dark:border-red-700/40 shadow-sm hover:scale-105 hover:shadow-md transition-all duration-200"
              >
                {deal}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default VibeTagsList;
