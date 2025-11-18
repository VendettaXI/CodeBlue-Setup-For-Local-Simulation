import React from "react";
import { Activity, Heart, X } from "lucide-react";

const HeroCard = ({ profile, onNext }) => {
  return (
    <div className="bg-white rounded-[26px] shadow-xl border border-slate-100 overflow-hidden">
      <div className="relative">
        {profile.photoUrl ? (
          <img
            src={profile.photoUrl}
            alt={profile.name}
            className="w-full h-[560px] object-cover object-center"
          />
        ) : (
          <div className="w-full h-[560px] bg-slate-200 flex items-center justify-center text-6xl">
            {profile.photos?.[0] ?? "🩺"}
          </div>
        )}

        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[rgba(15,33,58,0.9)] via-[rgba(15,33,58,0.55)] to-transparent" />

        {/* Top-left pills */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 w-[72%] pointer-events-none">
          {/* Role pill */}
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

          {/* Shift pill */}
          {profile.shift && (
            <div
              className="pointer-events-auto inline-flex items-center gap-1.5
                         px-3 py-[6px] rounded-full
                         bg-[rgba(0,0,0,0.28)] backdrop-blur-sm
                         text-[11px] text-white leading-tight max-w-fit"
              style={{ lineHeight: "1.15" }}
            >
              <span className="w-2 h-2 rounded-full bg-amber-300" />
              <span className="truncate">{profile.shift}</span>
            </div>
          )}
        </div>

        {/* View all photos pill */}
        <button
          type="button"
          className="absolute bottom-4 right-4 inline-flex items-center gap-1.5
                     px-3 py-1.5 rounded-full
                     bg-white/35 backdrop-blur-sm
                     border border-white/60
                     text-xs text-white font-medium
                     shadow-[0_0_12px_rgba(0,0,0,0.25)]
                     transition-all"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
          <span className="drop-shadow-sm">View all photos</span>
        </button>

        {/* Action rail */}
        <div className="absolute inset-y-0 right-4 flex flex-col items-center justify-center gap-3.5 pointer-events-none">
          {/* Dismiss */}
          <button
            type="button"
            onClick={onNext}
            className="pointer-events-auto w-12 h-12 rounded-2xl bg-white
                       border border-slate-200 flex items-center justify-center
                       shadow-[0_2px_10px_rgba(0,0,0,0.12)]
                       hover:scale-105 transition-transform"
          >
            <X className="w-6 h-6 text-slate-700" />
          </button>

          {/* Pulse / heartbeat */}
          <button
            type="button"
            onClick={(e) => {
              e.currentTarget.classList.add("animate-pulseGlow");
              setTimeout(() => {
                e.currentTarget.classList.remove("animate-pulseGlow");
              }, 400);
              console.log("Heartbeat", profile.name);
            }}
            className="pointer-events-auto w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-sm
                       border border-slate-200 flex items-center justify-center
                       shadow-[0_2px_10px_rgba(0,0,0,0.12)]
                       transition-all active:scale-90 hover:scale-105
                       animate-[premiumPulseLoop_2s_ease-in-out_infinite]"
          >
            <Activity className="w-6 h-6 text-[#0F213A]" />
          </button>

          {/* Like */}
          <button
            type="button"
            onClick={onNext}
            className="pointer-events-auto w-12 h-12 rounded-2xl bg-white/95
                       border border-slate-200 flex items-center justify-center
                       shadow-[0_2px_10px_rgba(0,0,0,0.12)]
                       hover:scale-105 transition-transform"
          >
            <Heart className="w-6 h-6 text-rose-500" />
          </button>
        </div>

        {/* Name + meta */}
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
  );
};

export default HeroCard;