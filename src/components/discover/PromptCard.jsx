/**
 * ============================================================================
 * PromptCard Component
 * ============================================================================
 * 
 * Hinge-style prompt card with question/answer and social interactions.
 * 
 * WHAT IT DISPLAYS:
 * - Prompt question (uppercase, small, gray)
 * - Text answer OR voice note button
 * - Like button with count
 * - Comment button
 * 
 * FEATURES:
 * - Text prompts: Display answer as paragraph
 * - Voice prompts: Gradient button with play icon, duration
 * - Like/Comment buttons with hover states
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
 * @param {number} likes - Number of likes
 * @param {number} index - Card index for animation delay
 * @param {function} onLike - Like button handler
 * @param {function} onComment - Comment button handler
 * @param {function} onPlayVoice - Voice note play handler (optional)
 * 
 * STYLING:
 * - Card: White bg, rounded-2xl, border, shadow-lg on hover
 * - Question: 13px bold uppercase, gray-600
 * - Text answer: 15px medium, gray-900
 * - Voice button: Gradient blue, play icon, shadow
 * - Action buttons: Gray-50 bg → pink/blue on hover
 * 
 * EXAMPLE USAGE:
 * ```jsx
 * <PromptCard
 *   question="My perfect Sunday is..."
 *   answer="Brunch with friends, a long walk in the park..."
 *   type="text"
 *   likes={12}
 *   index={0}
 *   onLike={() => console.log('liked')}
 *   onComment={() => console.log('comment')}
 * />
 * ```
 * 
 * ACCESSIBILITY:
 * - aria-label on like/comment buttons
 * - Semantic button elements
 * - Keyboard accessible
 * ============================================================================
 */

import React from 'react';
import { ThumbsUp, MessageCircle } from 'lucide-react';

export function PromptCard({
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
      className="cb-card rounded-2xl p-6 border group hover:shadow-lg hover:scale-[1.01] hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 cb-reveal" 
      style={{ animationDelay: `${index * 70}ms` }}
    >
      {/* Question */}
      <h3 className="text-[13px] font-bold tracking-wide uppercase text-gray-600 dark:text-gray-400 mb-3 leading-tight">
        {question}
      </h3>

      {/* Answer - Text or Voice */}
      {type === 'text' ? (
        <p className="text-gray-900 dark:text-gray-100 leading-relaxed mb-5 text-[15px] font-medium">
          {answer}
        </p>
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
          <div className="text-left">
            <div className="text-sm font-bold">{answer}</div>
            <div className="text-xs opacity-90 font-medium">{duration}</div>
          </div>
        </button>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        {/* Like Button */}
        <button 
          onClick={onLike}
          aria-label={`Like prompt: ${question}`}
          className={`flex items-center gap-2 text-sm transition-all group/like ${isLiked ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'}`}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isLiked ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-gray-50 dark:bg-gray-800 group-hover/like:bg-blue-50 dark:group-hover/like:bg-blue-900/30'}`} style={{ animation: isLiked ? 'cb-pop 140ms cubic-bezier(0.2, 0.8, 0.2, 1) both' : 'none' }}>
            <ThumbsUp className={`w-4 h-4 ${isLiked ? 'text-blue-600 dark:text-blue-400' : ''}`} />
          </div>
          <span className="font-semibold">{likes}</span>
        </button>

        {/* Comment Button */}
        <button 
          onClick={onComment}
          aria-label={`Comment on prompt: ${question}`}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all group/comment"
        >
          <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover/comment:bg-cyan-50 dark:group-hover/comment:bg-cyan-900/30 transition-colors">
            <MessageCircle className="w-4 h-4" />
          </div>
          <span className="font-semibold">Comment</span>
        </button>
      </div>
    </div>
  );
}

export default PromptCard;
