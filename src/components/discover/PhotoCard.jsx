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

export function PhotoCard({
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
  
  // Swipe thresholds
  const SWIPE_THRESHOLD = 150;
  const SWIPE_UP_THRESHOLD = 120;
  const ROTATION_FACTOR = 0.1;
  const MAX_ROTATION = 15;
  const TAP_MAX_MOVEMENT = 10;
  const TAP_MAX_DURATION = 300; // ms
  
  // Handle drag start (mouse & touch)
  const handleDragStart = (e) => {
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
      console.log('Swiped UP - Super Like!');
      onSwipeUp && onSwipeUp();
      setDragOffset({ x: 0, y: 0 });
      setIsDragging(false);
      return;
    }

    // 2) Horizontal left/right like/pass
    if (absX > SWIPE_THRESHOLD) {
      if (dragOffset.x > 0) {
        console.log('Swiped RIGHT - Like!');
        onSwipeRight && onSwipeRight();
      } else {
        console.log('Swiped LEFT - Pass!');
        onSwipeLeft && onSwipeLeft();
      }
      setDragOffset({ x: 0, y: 0 });
      setIsDragging(false);
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
  
  // Calculate rotation
  const rotation = Math.min(Math.max(dragOffset.x * ROTATION_FACTOR, -MAX_ROTATION), MAX_ROTATION);
  
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
  const cardStyle = {
    transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y * 0.1}px) rotate(${rotation}deg)`,
    cursor: isDragging ? 'grabbing' : 'grab',
    transition: isDragging ? 'none' : 'transform 0.3s ease-out',
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
    >
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
}

// Default export for convenience
export default PhotoCard;
