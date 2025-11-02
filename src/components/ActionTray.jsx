import React from 'react';
import { X, Star, Heart as LucideHeart } from 'lucide-react';

// Design-first prototype for the action buttons tray.
// - Three variants: 'center' (floating circular buttons), 'pill' (pill-shaped tray with icons), 'floating' (elevated rounded tray)
// - Accessible (aria-labels, role="toolbar")
// - Micro-interactions: hover scale, active press, shadow layering
// - Simple SVG icons included inline to avoid extra deps in the prototype

export default function ActionTray({
  variant = 'center', // 'center' | 'pill' | 'floating'
  onReject = () => {},
  onStar = () => {},
  onAccept = () => {},
  className = '',
  visible = true,
}) {
  if (!visible) return null;

  const baseBtn = 'flex items-center justify-center rounded-full shadow-lg transform transition-all duration-200';

  // Variant renderers
  if (variant === 'pill') {
    return (
      <div
        role="toolbar"
        aria-label="Profile actions"
        className={`mx-auto max-w-[420px] bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-2xl flex items-center justify-between gap-4 ${className}`}
        style={{ boxShadow: '0 10px 30px rgba(18, 38, 51, 0.18)' }}
      >
        <button
          aria-label="Like"
          onClick={onAccept}
          className={`${baseBtn} w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:scale-105 active:scale-95`}
        >
          <LucideHeart className="w-6 h-6" />
        </button>

        <button
          aria-label="Super"
          onClick={onStar}
          className={`${baseBtn} w-10 h-10 bg-blue-500 text-white hover:scale-105 active:scale-95`}
        >
          <Star className="w-5 h-5" />
        </button>

        <button
          aria-label="Pass"
          onClick={onReject}
          className={`${baseBtn} w-10 h-10 bg-white text-gray-700 hover:scale-105 active:scale-95`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    );
  }

  // New sophisticated standalone buttons - no tray/container
  if (variant === 'floating') {
    return (
      <div
        role="toolbar"
        aria-label="Profile actions"
  className={`absolute left-1/2 -translate-x-1/2 bottom-24 flex items-center justify-center gap-6 ${className}`}
        style={{ zIndex: 'var(--z-dropdown, 40)' }}
      >
        <button
          aria-label="Pass"
          onClick={onReject}
          className={`${baseBtn} w-14 h-14 bg-white text-gray-600 shadow-[0_12px_30px_rgba(17,24,39,0.18)] hover:shadow-[0_16px_36px_rgba(17,24,39,0.22)]
            hover:text-gray-900 hover:-translate-y-1 active:translate-y-0 active:shadow-md
            transition-all duration-150 ease-out border border-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400/70`}
        >
          <X className="w-6 h-6" />
        </button>

        <button
          aria-label="Favorite"
          onClick={onStar}
          className={`${baseBtn} w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-[0_12px_30px_rgba(17,24,39,0.18)] hover:shadow-[0_16px_36px_rgba(17,24,39,0.22)]
            hover:from-blue-500 hover:to-blue-600 hover:-translate-y-1 active:translate-y-0 active:shadow-md
            transition-all duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400/70`}
        >
          <Star className="w-6 h-6" />
        </button>

        <button
          aria-label="Connect"
          onClick={onAccept}
          className={`${baseBtn} w-16 h-16 bg-gradient-to-br from-blue-700 to-blue-900
            text-white shadow-[0_18px_36px_rgba(8,20,48,0.28)] hover:shadow-[0_22px_44px_rgba(8,20,48,0.32)] hover:-translate-y-1 active:translate-y-0
            transition-all duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400/70`}
        >
          <LucideHeart className="w-7 h-7" />
        </button>
      </div>
    );
  }

  // default: center (three floating circular buttons, centered and overlapping card)
  return (
    <div
      role="toolbar"
      aria-label="Profile actions"
      className={`absolute left-1/2 -translate-x-1/2 -bottom-6 flex items-end gap-6 ${className}`}
    >
      <button
        aria-label="Pass"
        onClick={onReject}
        className={`${baseBtn} w-16 h-16 bg-white text-gray-700 hover:scale-105 active:scale-95`}
        style={{ boxShadow: '0 12px 24px rgba(15, 23, 42, 0.12)' }}
      >
        <RejectIcon />
      </button>

      <button
        aria-label="Super"
        onClick={onStar}
        className={`${baseBtn} w-16 h-16 bg-blue-500 text-white hover:scale-105 active:scale-95`}
        style={{ boxShadow: '0 12px 24px rgba(30, 64, 175, 0.12)' }}
      >
        <StarIcon />
      </button>

      <button
        aria-label="Like"
        onClick={onAccept}
        className={`${baseBtn} w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:scale-105 active:scale-95`}
        style={{ boxShadow: '0 16px 36px rgba(219, 39, 119, 0.18)' }}
      >
        <HeartIcon />
      </button>
    </div>
  );
}
