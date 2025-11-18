// InfoCard.jsx — FIXED HEIGHT, HORIZONTAL LAYOUT (FINAL VERSION)
// --------------------------------------------------------------
// Features:
// - Fully stable collapsed height (never changes dynamically)
// - Row A: horizontal scroll
// - Row B: horizontal scroll
// - "More" button floats on its own row (never overlaps pills)
// - Expanded state unchanged
// - Premium spacing, rounding & shadows
// --------------------------------------------------------------

import React from "react";
import { Activity } from "lucide-react";
import SnapshotPill from "./SnapshotPill";

/* Section Title (used only in expanded state) */
const SectionTitle = ({ title }) => (
  <div className="flex items-center gap-2">
    <span className="w-1.5 h-1.5 rounded-full bg-[#0F213A]" />
    <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
  </div>
);

const InfoCard = ({
  infoExpanded,
  rowA,
  rowB,
  rhythmCount,
  profile,
  onExpand,
  onCollapse,
  PulseGrid,
  answeredPulse,
  onOpenPulseQuestion,
}) => {
  return (
    <div className="relative z-10 px-3 mt-3">

      {/* ------------------------------------------------------ */}
      {/* COLLAPSED STATE — FIXED HEIGHT + HORIZONTAL SCROLL     */}
      {/* ------------------------------------------------------ */}

      {!infoExpanded ? (
        <div
          className="
            rounded-[24px]
            bg-white
            border border-slate-200/70
            shadow-[0_8px_22px_rgba(15,33,58,0.15)]
            px-4
            pt-3 pb-4
            h-[150px]
            flex flex-col
            justify-between
          "
        >
          {/* --- TOP: More button --- */}
          <div className="flex justify-end mb-2">
            <button
              onClick={onExpand}
              className="
                inline-flex items-center gap-1.5
                px-3 py-[6px]
                rounded-full bg-[#0F213A]
                text-[11px] text-white font-medium
                shadow-[0_3px_10px_rgba(15,33,58,0.45)]
                active:scale-95 transition
              "
            >
              <Activity className="w-3.5 h-3.5 text-white" />
              More
            </button>
          </div>

          {/* --- ROW A (Vitals) — horizontal scroll --- */}
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 pr-2">
              {rowA.map((tag) => (
                <SnapshotPill key={tag.id} kind={tag.kind} label={tag.label} />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-slate-200/60 my-2"></div>

          {/* --- ROW B — horizontal scroll --- */}
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 pr-2">
              {rowB.map((tag) => (
                <SnapshotPill key={tag.id} kind={tag.kind} label={tag.label} />
              ))}
            </div>
          </div>
        </div>
      ) : (

        /* ------------------------------------------------------ */
        /* EXPANDED STATE (unchanged)                            */
        /* ------------------------------------------------------ */

        <div
          className="
            rounded-[26px]
            bg-white
            border border-slate-100
            shadow-[0_14px_36px_rgba(15,33,58,0.18)]
            overflow-hidden
          "
        >
          {/* Hide Button */}
          <div className="px-5 pt-3 pb-2 flex justify-end bg-white">
            <button
              onClick={onCollapse}
              className="
                inline-flex items-center gap-1.5
                px-3 py-[6px]
                rounded-full
                bg-slate-50
                text-[11px] text-slate-700
                border border-slate-200
                shadow-[0_2px_6px_rgba(15,33,58,0.12)]
                active:scale-95
                transition
              "
            >
              <Activity className="w-3.5 h-3.5 text-[#0F213A]" />
              Hide
            </button>
          </div>

          {/* Expanded Content */}
          <div className="px-5 pb-6 pt-2 flex flex-col gap-7 bg-white">
            
            {/* Tags */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {rowA.map((tag) => (
                  <SnapshotPill key={tag.id} kind={tag.kind} label={tag.label} />
                ))}
              </div>

              <div className="h-[1px] bg-slate-200/70" />

              <div className="flex flex-wrap gap-2">
                {rowB.map((tag) => (
                  <SnapshotPill key={tag.id} kind={tag.kind} label={tag.label} />
                ))}
              </div>
            </div>

            {/* Secret Rhythms */}
            {rhythmCount > 0 && (
              <div className="space-y-3">
                <SectionTitle title="My Secret Rhythms" />

                <div className="space-y-3">
                  {profile.secretRhythms.slice(0, rhythmCount).map((r, idx) => (
                    <div
                      key={idx}
                      className="
                        rounded-2xl border border-slate-100
                        bg-slate-50/70 px-4 py-3 flex gap-3
                      "
                    >
                      <Activity className="w-4 h-4 text-[#0F213A]/80 mt-1" />
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                          {r.question}
                        </div>
                        <div className="mt-1 text-sm text-slate-800 leading-relaxed">
                          {r.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pulse Grid */}
            {profile.pulseQuestions?.length > 0 && (
              <PulseGrid
                profile={profile}
                answeredMap={answeredPulse[profile.id] || {}}
                onOpenQuestion={onOpenPulseQuestion}
              />
            )}

            {/* Personality */}
            {profile.prompts?.length > 0 && (
              <div className="space-y-3">
                <SectionTitle title="Personality & prompts" />

                <div className="space-y-3">
                  {profile.prompts.slice(0, 2).map((p, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3"
                    >
                      <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        {p.question}
                      </div>
                      <div className="mt-1 text-sm text-slate-800">{p.answer}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Glimpses */}
            {profile.photos?.length > 0 && (
              <div className="space-y-3">
                <SectionTitle title="Glimpses" />

                <div className="flex gap-3 overflow-x-auto pb-1">
                  {profile.photos.map((ph, idx) => (
                    <div
                      key={idx}
                      className="
                        flex-shrink-0 w-24 h-24 rounded-[18px]
                        overflow-hidden bg-slate-100 border border-slate-100
                        shadow-[0_4px_10px_rgba(15,25,33,0.08)]
                      "
                    >
                      <img src={ph} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vibe */}
            {profile.myVibe?.length > 0 && (
              <div className="space-y-3">
                <SectionTitle title="Their vibe" />

                <div className="flex flex-wrap gap-2">
                  {profile.myVibe.map((v, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-slate-100 text-xs text-slate-800"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default InfoCard;