// HeroCard.jsx
// ------------------------------------------------------
// Hero profile card
// - Now fills available vertical space (parent controls height)
// - Keeps side margins (no full-width bleed)
// - 12px rounded corners for a softer, premium bubble
// - Photo navigation with tap zones and indicators
// ------------------------------------------------------

import React, { useState } from "react";
import { Activity, Heart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import HeartbeatAnimation from "./HeartbeatAnimation";

const HeroCard = ({ profile, onNext, onExpand }) => {
  const photos = profile.photos && profile.photos.length > 0 
    ? profile.photos 
    : profile.photoUrl 
      ? [profile.photoUrl] 
      : [];
  
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showHeartbeat, setShowHeartbeat] = useState(false);

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const currentPhoto = photos[currentPhotoIndex] || profile.photoUrl;

  const handleHeartbeat = () => {
    setShowHeartbeat(true);
    console.log("Heartbeat", profile.name);
  };

  const handleHeartbeatComplete = () => {
    setShowHeartbeat(false);
    onNext();
  };

  return (
    <>
      <AnimatePresence>
        {showHeartbeat && (
          <HeartbeatAnimation onComplete={handleHeartbeatComplete} />
        )}
      </AnimatePresence>

      <div className="h-full rounded-[12px] shadow-[0_18px_40px_rgba(15,33,58,0.26)] overflow-hidden">
      <div className="relative h-full">
        {/* Main image area fills the entire card height */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhotoIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            {currentPhoto ? (
              <img
                src={currentPhoto}
                alt={profile.name}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full bg-slate-200 flex items-center justify-center text-6xl">
                🩺
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Tap zones for photo navigation */}
        {photos.length > 1 && (
          <>
            <button
              onClick={handlePrevPhoto}
              className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer z-[1]"
              aria-label="Previous photo"
            />
            <button
              onClick={handleNextPhoto}
              className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer z-[1]"
              aria-label="Next photo"
            />
          </>
        )}

        {/* Photo indicators */}
        {photos.length > 1 && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-[15] pointer-events-none">
            {photos.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 rounded-full transition-all ${
                  idx === currentPhotoIndex
                    ? "w-6 bg-white"
                    : "w-1 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[rgba(15,33,58,0.95)] via-[rgba(15,33,58,0.7)] to-transparent" />

        {/* Top-left pills */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 w-[72%] pointer-events-none z-10">
          {/* ROLE pill */}
          <div
            className="inline-flex items-center gap-2 px-2 py-1 rounded-full 
              bg-black/35 backdrop-blur-sm text-xs text-white
              max-w-[145px] w-max overflow-hidden"
          >
            <span className="inline-flex items-center gap-1 overflow-hidden">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
              <span className="truncate max-w-[105px]">
                {profile.role ?? "Healthcare professional"}
              </span>
            </span>
          </div>

          {/* SHIFT pill */}
          {profile.shift && (
            <div
              className="
                pointer-events-auto
                inline-flex items-center gap-1.5
                px-3 py-[6px]
                rounded-full
                bg-[rgba(0,0,0,0.28)]
                backdrop-blur-sm
                text-[11px] text-white leading-tight
                max-w-fit
              "
              style={{ lineHeight: "1.15" }}
            >
              <span className="w-2 h-2 rounded-full bg-amber-300" />
              <span className="truncate">{profile.shift}</span>
            </div>
          )}
        </div>

        {/* More button */}
        <button
          type="button"
          onClick={onExpand}
          className="pointer-events-auto absolute bottom-4 right-4 inline-flex items-center gap-1
                px-2.5 py-1 rounded-full
                bg-white/35 backdrop-blur-sm
                border border-white/60
                text-[11px] text-white font-medium
                shadow-[0_0_12px_rgba(0,0,0,0.25)]
                active:scale-95 transition-all z-20"
        >
          <Activity className="w-3 h-3" />
          <span className="drop-shadow-sm">Dive</span>
        </button>

        {/* Action rail */}
        <div className="absolute inset-y-0 right-4 flex flex-col items-center justify-center gap-4 pointer-events-none z-20">
          {/* Dismiss */}
          <button
            type="button"
            onClick={onNext}
            className="pointer-events-auto w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.12)] hover:scale-105 transition-transform"
          >
            <X className="w-6 h-6 text-slate-700" />
          </button>

          {/* Pulse / heartbeat */}
          <button
            type="button"
            onClick={handleHeartbeat}
            className="pointer-events-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-violet-100 backdrop-blur-sm border border-purple-200 flex items-center justify-center shadow-[0_2px_10px_rgba(168,145,205,0.25)] transition-all active:scale-90 hover:scale-105 animate-[premiumPulseLoop_2s_ease-in-out_infinite]"
          >
            <Activity className="w-7 h-7 text-[#0F213A]" />
          </button>

          {/* Like */}
          <button
            type="button"
            onClick={onNext}
            className="pointer-events-auto w-12 h-12 rounded-2xl bg-white/95 border border-slate-200 flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.12)] hover:scale-105 transition-transform"
          >
            <Heart className="w-6 h-6 text-rose-500" />
          </button>
        </div>

        {/* Name overlay */}
        <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-14 flex flex-col justify-end">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-white text-2xl font-semibold drop-shadow">
                  {profile.name}, {profile.age}
                </span>
                {profile.distance && (
                  <span className="text-white/80 text-xs">
                    {profile.distance}
                  </span>
                )}
              </div>
              {profile.location && (
                <div className="text-white/80 text-xs mt-1">
                  {profile.location}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default HeroCard;