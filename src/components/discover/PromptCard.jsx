/**
 * ============================================================================
 * PromptCard Component
 * ============================================================================
 * 
 * Hinge-style prompt card with question/answer and message interaction.
 * 
 * WHAT IT DISPLAYS:
 * - Prompt question (15px, Sans-Serif Medium, slightly spaced)
 * - Text answer OR voice note button (17px, Sans-Serif Light, slightly spaced)
 * - Message button (pink heart icon on right side)
 * 
 * FEATURES:
 * - Text prompts: Display answer as justified paragraph
 * - Voice prompts: Gradient button with play icon, duration
 * - Message button (heart icon) with hover states
 * - Staggered reveal animation
 * - Border changes on hover (gray → blue)
 * - Scale animation on hover (1.01)
 * 
 * USED IN:
 * - DiscoverTab (below info chips)
 * - Profile view, Match preview
 * 
 * PROPS:
 * @param {string} question - Prompt question text
 * @param {string} answer - Answer text or voice note title
 * @param {'text'|'voice'} type - Answer type
 * @param {string} duration - Voice note duration (e.g., "0:48")
 * @param {number} index - Card index for animation delay
 * @param {function} onComment - Message button (heart icon) handler
 * @param {function} onPlayVoice - Voice note play handler (optional)
 * 
 * TYPOGRAPHY SYSTEM:
 * - Question: 15px, font-medium (500), tracking-wide, gray-600
 * - Answer: 17px, font-light (300), tracking-wide, gray-900
 * - Voice button: Gradient blue, play icon, shadow
 * - System font stack for body text (Inter fallback chain)
 * 
 * STYLING:
 * - Card: White bg, rounded-2xl, border, shadow-lg on hover
 * - Message icon: Pink heart outline (#ec4899), 38x38px
 * - Answer text: Justified alignment, Light weight
 * - Voice button: Gradient blue, play icon, shadow
 * 
 * EXAMPLE USAGE:
 * ```jsx
 * <PromptCard
 *   question="My perfect Sunday is..."
 *   answer="Brunch with friends, a long walk in the park..."
 *   type="text"
 *   index={0}
 *   onComment={() => console.log('message')}
 * />
 * ```
 * 
 * ACCESSIBILITY:
 * - aria-label on message button
 * - Semantic button elements
 * - Keyboard accessible
 * ============================================================================
 */

import React from 'react';
import { ThumbsUp, MessageCircle } from 'lucide-react';

export const PromptCard = React.memo(function PromptCard({
  question,
  answer,
  type = 'text',
  duration,
  likes = 0,
  isLiked = false,
  index = 0,
  onLike,
  onComment,
  onPlayVoice
}) {
  return (
    <div 
      className="cb-card rounded-2xl p-6 border group hover:shadow-lg hover:scale-[1.01] hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 cb-reveal bg-[var(--cb-surface-muted)] text-gray-900 dark:text-gray-100" 
      style={{ animationDelay: `${index * 70}ms` }}
    >
      {/* Question - Responsive: 14px → 15px at sm+, Sans-Serif Bold, less prominent color */}
      <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-500/90 dark:text-gray-400/90 mb-2 leading-tight cb-slightly-spaced">
        {question}
      </h3>

      {/* Answer - Responsive: 16px → 17px at sm+, Sans-Serif Light, slightly spaced */}
      {type === 'text' ? (
        <div className="flex items-center justify-between">
          <p className="text-[16px] sm:text-[17px] font-light text-gray-900 dark:text-gray-100 leading-relaxed mb-5 text-justify cb-slightly-spaced">
            {answer}
          </p>
          {/* Message Button - right side with heart icon */}
          <button 
            onClick={onComment}
            aria-label={`Message about prompt: ${question}`}
            className="ml-3 flex items-center justify-center transition-all hover:scale-110"
            style={{ minWidth: '2.8rem' }}
          >
            {/* Pink heart outline icon */}
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="#ec4899" strokeWidth="2" fill="none"/>
            </svg>
          </button>
        </div>
      ) : (
        <button 
          onClick={onPlayVoice}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-indigo-500 dark:to-fuchsia-600 text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:from-blue-700 hover:to-blue-800 hover:scale-105 transition-all shadow-[0_4px_16px_rgba(37,99,235,0.25)] mb-5"
          aria-label={`Play voice note: ${answer}`}
        >
          {/* Play Icon */}
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
          </div>
          {/* Voice Note Info */}
          <div className="text-left text-white">
            <div className="text-sm font-bold">{answer}</div>
            <div className="text-xs opacity-90 font-medium">{duration}</div>
          </div>
        </button>
      )}

      {/* Only Comment Button for voice type, no like */}
      {/* No like button or count */}
    </div>
  );
});

export default PromptCard;
