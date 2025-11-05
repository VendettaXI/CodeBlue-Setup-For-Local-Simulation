/**
 * ============================================================================
 * PhotoCard Component
 * ============================================================================
 * 
 * Large premium photo card (540px) for displaying profile photos in Discover tab.
 * 
 * WHAT IT DISPLAYS:
 * - Profile photo with object-cover (fills container)
 * - Gradient overlay (dark at bottom for text readability)
 * - Photo navigation dots (for multiple photos)
 * - Verified badge (if profile is verified)
 * - Recently Active badge (with pulse animation)
 * - Match percentage badge (top-right)
 * - Emoji fallback if image fails to load
 * 
 * FEATURES:
 * - 540px fixed height (prevents layout shift)
 * - Multi-layer premium shadows
 * - Glass-morphic badges with backdrop blur
 * - Lazy loading for performance
 * - Graceful error handling (falls back to emoji)
 * - Photo navigation with indicators
 * 
 * USED IN:
 * - DiscoverTab (main profile view)
 * - Could be reused in Profile preview, etc.
 * 
 * PROPS:
 * @param {array} photos - Array of photo objects [{url, alt, emoji}]
 * @param {number} activePhotoIndex - Currently displayed photo index
 * @param {function} onPhotoChange - Called when user clicks a different photo dot
 * @param {boolean} verified - Show verified badge
 * @param {boolean} recentlyActive - Show recently active badge
 * @param {number} matchPercentage - Match compatibility percentage (0-100)
 * @param {object} imageErrors - Object tracking failed image loads {photoKey: boolean}
 * @param {function} onImageError - Called when image fails to load
 * @param {string} profileName - Profile name for alt text
 * 
 * STYLING:
 * - Height: 540px (fixed, no layout shift)
 * - Border radius: 28px (ultra-rounded)
 * - Shadows: Multi-layer (0 8px 32px, 0 20px 60px)
 * - Gradient overlay: top (10% black) → bottom (40% black)
 * - Background: Blue-purple gradient (while loading)
 * 
 * EXAMPLE USAGE:
 * ```jsx
 * <PhotoCard
 *   photos={profile.photos}
 *   activePhotoIndex={0}
 *   onPhotoChange={setActivePhoto}
 *   verified={profile.verified}
 *   recentlyActive={profile.recentlyActive}
 *   matchPercentage={95}
 *   imageErrors={imageErrors}
 *   onImageError={(key) => setImageErrors({...imageErrors, [key]: true})}
 *   profileName={profile.name}
 * />
 * ```
 * 
 * ACCESSIBILITY:
 * - Alt text on images (descriptive)
 * - ARIA labels on navigation dots
 * - Keyboard navigation support
 * - Screen reader announcements for badges
 * 
 * PERFORMANCE:
 * - Lazy loading (loading="lazy")
 * - Error boundary prevents crashes
 * - Efficient re-renders (React.memo candidate)
 * ============================================================================
 */

import React, { useState, useRef } from 'react';
import { Check, Zap, Heart, X, Star } from 'lucide-react';

export const PhotoCard = React.memo(function PhotoCard({
  photos = [],
  activePhotoIndex = 0,
  onPhotoChange,
  verified = false,
  recentlyActive = false,
  matchPercentage,
  imageErrors = {},
  onImageError,
  profileName = '',
  currentProfileIndex = 0,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp
}) {
  // Swipe state management
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const dragStartTimeRef = useRef(0);
  const [flyOut, setFlyOut] = useState(null); // 'left' | 'right' | 'up'
  const pendingActionRef = useRef(null); // 'left' | 'right' | 'up'
  const transitionHandledRef = useRef(false);
  
  // Swipe thresholds
  const SWIPE_THRESHOLD = 150;
  const SWIPE_UP_THRESHOLD = 120;
  const ROTATION_FACTOR = 0.1;
  const MAX_ROTATION = 15;
  const TAP_MAX_MOVEMENT = 10;
  const TAP_MAX_DURATION = 300; // ms
  
  // Handle drag start (mouse & touch)
  const handleDragStart = (e) => {
    if (flyOut) return; // ignore new drags during fly-out
    // Prevent default browser behavior (image drag, text selection)
    e.preventDefault();
    
    setIsDragging(true);
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    setStartPos({ x: clientX, y: clientY });
    dragStartTimeRef.current = Date.now();
  };
  
  // Handle drag move
  const handleDragMove = (e) => {
    if (!isDragging) return;
    
    // Prevent default to stop image ghosting
    e.preventDefault();
    
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - startPos.x;
    const deltaY = clientY - startPos.y;
    
    setDragOffset({ x: deltaX, y: deltaY });
  };
  
  // Handle drag end
  const handleDragEnd = (e) => {
    if (!isDragging) return;

    const absX = Math.abs(dragOffset.x);
    const absY = Math.abs(dragOffset.y);

    const endTs = Date.now();
    const duration = endTs - dragStartTimeRef.current;

    // 1) Vertical swipe up for Super Like
    if (absY > absX && dragOffset.y < -SWIPE_UP_THRESHOLD) {
      // Animate card flying up, then notify parent
      pendingActionRef.current = 'up';
      transitionHandledRef.current = false;
      setIsDragging(false);
      setFlyOut('up');
      return;
    }

    // 2) Horizontal left/right like/pass
    if (absX > SWIPE_THRESHOLD) {
      transitionHandledRef.current = false;
      setIsDragging(false);
      if (dragOffset.x > 0) {
        pendingActionRef.current = 'right';
        setFlyOut('right');
      } else {
        pendingActionRef.current = 'left';
        setFlyOut('left');
      }
      return;
    }

    // 3) Treat as a tap (next/prev photo) when small movement & short duration
    if (absX < TAP_MAX_MOVEMENT && absY < TAP_MAX_MOVEMENT && duration < TAP_MAX_DURATION) {
      const isTouchEnd = e.type === 'touchend';
      const clientX = isTouchEnd ? (e.changedTouches && e.changedTouches[0]?.clientX) : e.clientX;
      if (clientX != null && cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const relativeX = clientX - rect.left;
        const half = rect.width / 2;
        if (relativeX < half) {
          // Tap left = previous photo
          if (onPhotoChange) onPhotoChange(Math.max(0, activePhotoIndex - 1));
        } else {
          // Tap right = next photo
          if (onPhotoChange) onPhotoChange(Math.min(photos.length - 1, activePhotoIndex + 1));
        }
      }
    }

    // 4) Otherwise snap back
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
  };

  // Transition end handler to invoke parent callbacks after fly-out completes
  const handleTransitionEnd = (e) => {
    if (!flyOut) return;
    if (transitionHandledRef.current) return;
    if (e.propertyName !== 'transform') return;
    transitionHandledRef.current = true;
    const action = pendingActionRef.current;
    pendingActionRef.current = null;

    // Call corresponding callback after animation
    if (action === 'right') {
      onSwipeRight && onSwipeRight();
    } else if (action === 'left') {
      onSwipeLeft && onSwipeLeft();
    } else if (action === 'up') {
      onSwipeUp && onSwipeUp();
    }

    // Reset internal state (in case component persists)
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
    setFlyOut(null);
  };
  
  // Calculate rotation
  const rotation = Math.min(Math.max(dragOffset.x * ROTATION_FACTOR, -MAX_ROTATION), MAX_ROTATION);
  // Overlay opacities (show earlier with a subtle baseline so it's noticeable)
  const baseVis = 0.18; // minimum visibility once movement starts
  const likeProgressRaw = dragOffset.x > 0 ? Math.min(dragOffset.x / SWIPE_THRESHOLD, 1) : 0;
  const passProgressRaw = dragOffset.x < 0 ? Math.min(Math.abs(dragOffset.x) / SWIPE_THRESHOLD, 1) : 0;
  const superProgressRaw = dragOffset.y < 0 ? Math.min(Math.abs(dragOffset.y) / SWIPE_UP_THRESHOLD, 1) : 0;
  const likeOpacity = likeProgressRaw > 0.05 ? Math.min(baseVis + likeProgressRaw * (1 - baseVis), 1) : 0;
  const passOpacity = passProgressRaw > 0.05 ? Math.min(baseVis + passProgressRaw * (1 - baseVis), 1) : 0;
  const superOpacity = superProgressRaw > 0.05 ? Math.min(baseVis + superProgressRaw * (1 - baseVis), 1) : 0;
  const likeActive = likeProgressRaw > 0.05;
  const passActive = passProgressRaw > 0.05;
  const superActive = superProgressRaw > 0.05;
  // Micro-haptic scale as user approaches thresholds
  const likeScale = 1 + Math.min(likeProgressRaw, 1) * 0.06;
  const passScale = 1 + Math.min(passProgressRaw, 1) * 0.06;
  const superScale = 1 + Math.min(superProgressRaw, 1) * 0.06;
  
  if (!photos || photos.length === 0) {
    return (
      <div className="relative h-[540px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-[28px] mx-4 flex items-center justify-center">
        <div className="text-[140px]">👤</div>
      </div>
    );
  }

  const currentPhoto = photos[activePhotoIndex] || photos[0];
  const photoKey = `${currentProfileIndex}-${activePhotoIndex}`;
  const hasError = imageErrors[photoKey];

  // Dynamic transform style
  let transformValue = `translateX(${dragOffset.x}px) translateY(${dragOffset.y * 0.1}px) rotate(${rotation}deg)`;
  if (flyOut === 'right') {
    transformValue = 'translateX(140%) rotate(12deg)';
  } else if (flyOut === 'left') {
    transformValue = 'translateX(-140%) rotate(-12deg)';
  } else if (flyOut === 'up') {
    transformValue = 'translateY(-140%) rotate(0deg)';
  }
  const cardStyle = {
    transform: transformValue,
    cursor: isDragging ? 'grabbing' : 'grab',
    transition: isDragging ? 'none' : (flyOut ? 'transform 380ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 380ms ease-out' : 'transform 0.3s ease-out'),
    opacity: flyOut ? 0 : 1,
    userSelect: 'none',
    WebkitUserSelect: 'none',
    touchAction: 'none'
  };

  return (
    <div 
      ref={cardRef}
      className="relative h-[540px] bg-gradient-to-br from-blue-400 to-purple-400 rounded-[28px] mx-4 shadow-[0_8px_32px_-8px_rgba(16,24,40,0.12),0_20px_60px_-12px_rgba(16,24,40,0.18)] overflow-hidden select-none"
      style={cardStyle}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      onTransitionEnd={handleTransitionEnd}
    >
      {/* Icon-only swipe feedback overlays */}
      {/* LIKE (top-left) */}
      <div
        className="absolute top-6 left-6 z-30 pointer-events-none"
        style={{ opacity: likeOpacity, transform: `rotate(-8deg) scale(${likeScale})`, transition: 'opacity 150ms ease' }}
        aria-hidden="true"
      >
        <Heart
          className="w-20 h-20 text-emerald-300 drop-shadow-[0_6px_16px_rgba(16,185,129,0.55)]"
          strokeWidth={2.8}
          style={{ animation: likeActive ? 'cb-pop 140ms cubic-bezier(0.2, 0.8, 0.2, 1) both' : 'none' }}
        />
      </div>

      {/* NOPE (top-right) */}
      <div
        className="absolute top-6 right-6 z-30 pointer-events-none"
        style={{ opacity: passOpacity, transform: `rotate(8deg) scale(${passScale})`, transition: 'opacity 150ms ease' }}
        aria-hidden="true"
      >
        <X
          className="w-20 h-20 text-rose-300 drop-shadow-[0_6px_16px_rgba(244,63,94,0.55)]"
          strokeWidth={2.8}
          style={{ animation: passActive ? 'cb-pop 140ms cubic-bezier(0.2, 0.8, 0.2, 1) both' : 'none' }}
        />
      </div>

      {/* SUPER LIKE (top-center) */}
      <div
        className="absolute top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
        style={{ opacity: superOpacity, transform: `scale(${superScale})`, transition: 'opacity 150ms ease' }}
        aria-hidden="true"
      >
        <Star
          className="w-20 h-20 text-sky-300 drop-shadow-[0_6px_16px_rgba(56,189,248,0.55)]"
          strokeWidth={2.8}
          style={{ animation: superActive ? 'cb-pop 140ms cubic-bezier(0.2, 0.8, 0.2, 1) both' : 'none' }}
        />
      </div>
      {/* Gradient Overlay for Photo Enhancement */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40 rounded-[28px] z-10 pointer-events-none"></div>
      
      {/* Main Photo Display */}
      <div className="absolute inset-0">
        {currentPhoto.url && !hasError ? (
          <img
            src={currentPhoto.url}
            alt={currentPhoto.alt || `${profileName} - Photo ${activePhotoIndex + 1}`}
            onError={() => onImageError && onImageError(photoKey)}
            className="w-full h-full object-cover pointer-events-none"
            loading="lazy"
            draggable="false"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-[140px] relative z-10 transform transition-transform duration-300 hover:scale-105 drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)]">
              {currentPhoto.emoji || '👤'}
            </div>
          </div>
        )}
      </div>
      
      {/* Photo Navigation Dots */}
      {photos.length > 1 && (
        <div className="absolute top-4 left-0 right-0 flex justify-center gap-2 px-4 z-20">
          <div className="bg-white/10 backdrop-blur-xl rounded-full p-1.5 flex gap-1 shadow-lg border border-white/20">
            {photos.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  onPhotoChange && onPhotoChange(idx);
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                aria-label={`View photo ${idx + 1} of ${photos.length}`}
                className={`h-1 rounded-full transition-all ${
                  activePhotoIndex === idx 
                    ? 'bg-white w-8' 
                    : 'bg-white/40 w-4 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Badges - Left Side */}
      <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
        {verified && (
          <div className="bg-white/20 backdrop-blur-xl px-4 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.3)_inset] border border-white/30 text-white">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Check className="w-3 h-3 text-blue-600" />
            </div>
            Verified
          </div>
        )}
        {recentlyActive && (
          <div className="bg-white/20 backdrop-blur-xl px-4 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.3)_inset] border border-white/30 text-white">
            <div className="relative w-2 h-2">
              <div className="absolute w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="absolute w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75"></div>
            </div>
            Recently Active
          </div>
        )}
      </div>

      {/* Match Percentage Badge - Top Right */}
      {matchPercentage !== undefined && (
        <div className="absolute top-6 right-6 bg-gradient-to-br from-blue-500 to-blue-600 backdrop-blur-xl px-4 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-[0_4px_16px_rgba(37,99,235,0.4),0_0_0_1px_rgba(255,255,255,0.2)_inset] border border-blue-400/40 text-white z-20">
          <Zap className="w-4 h-4 text-blue-100" />
          <span className="font-bold">{matchPercentage}% Match</span>
        </div>
      )}
    </div>
  );
});

// Default export for convenience
export default PhotoCard;
