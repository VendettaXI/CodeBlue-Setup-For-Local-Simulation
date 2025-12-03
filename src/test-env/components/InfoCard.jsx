// src/test-env/components/InfoCard.jsx
// --------------------------------------------------------------
// Collapsed = 2x2 vital grid + centered gradient "More" pill tab
// Expanded = full detail view with Secret Rhythms, PulseGrid, etc.
// --------------------------------------------------------------

import React from "react";
import { motion } from "framer-motion";
import { Activity, Shield, Moon, Zap, Heart } from "lucide-react";
// SnapshotPill deprecated in favor of unified VitalPill styling

const SectionTitle = ({ title }) => (
  <div className="flex items-center gap-2">
    <span className="w-1.5 h-1.5 rounded-full bg-[#0F213A]" />
    <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
  </div>
);

const kindToIcon = (kind) => {
  switch (kind) {
    case "verified":
      return Shield;
    case "shift":
      return Moon;
    case "match":
      return Zap;
    case "intent":
      return Activity;
    case "mood":
      return Heart;
    default:
      return Heart;
  }
};

const VitalPill = ({ label, Icon }) => (
  <div className="flex items-center gap-2 rounded-full px-2.5 py-0.5 text-[11px] font-medium text-slate-800 bg-white/80 backdrop-blur-sm shadow-sm">
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(15,33,58,0.98)] text-white">
      <Icon className="h-3.5 w-3.5" />
    </span>
    <span className="truncate">{label}</span>
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
  const allVitals = [...rowA, ...rowB];
  const visibleVitals = allVitals.slice(0, 4);
  const remainingCount = allVitals.length - visibleVitals.length;

  return (
    <div className="relative z-10 px-3 mt-3">
      {/* ------------------------------------------------------ */}
      {/* COLLAPSED STATE */}
      {/* ------------------------------------------------------ */}
      {!infoExpanded ? (
        <motion.div
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
          onClick={onExpand}
          className="relative rounded-[38px] bg-gradient-to-br from-purple-100 via-violet-100 to-purple-50/80 border border-slate-200/70 px-4 pt-2 pb-2.5 cursor-pointer"
        >
          {/* Header removed per request */}

          {/* Vital pills grid (2x2) */}
          {/* Vitals output: grid or horizontal scroll if more than 4 total */}
          {allVitals.length <= 4 ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
              {visibleVitals.map((tag) => {
                const Icon = kindToIcon(tag.kind);
                return <VitalPill key={tag.id} label={tag.label} Icon={Icon} />;
              })}
            </div>
          ) : (
            <div className="relative -mx-4 px-4">
              <div className="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory">
                {allVitals.map((tag) => {
                  const Icon = kindToIcon(tag.kind);
                  return (
                    <div key={tag.id} className="snap-start">
                      <VitalPill label={tag.label} Icon={Icon} />
                    </div>
                  );
                })}
              </div>
              {/* Edge fades */}
              <div className="pointer-events-none absolute left-0 top-0 h-full w-12 rounded-l-[24px] bg-gradient-to-r from-purple-100 via-purple-100/70 to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-16 rounded-r-[24px] bg-gradient-to-l from-purple-100 via-purple-100/70 to-transparent" />
            </div>
          )}
        </motion.div>
      ) : (
        /* ------------------------------------------------------ */
        /* EXPANDED STATE */
        /* ------------------------------------------------------ */
        <motion.div
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
        >
          {/* Hide Button */}
          <div className="flex justify-end mb-3">
            <button
              onClick={onCollapse}
              className="inline-flex items-center gap-1.5 px-3 py-[6px] rounded-full bg-slate-50 text-[11px] text-slate-700 border border-slate-200 shadow-[0_2px_6px_rgba(15,33,58,0.12)] active:scale-95 transition"
            >
              <Activity className="w-3.5 h-3.5 text-[#0F213A]" />
              Hide
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* Vitals Section (first) */}
            <div className="rounded-t-[38px] rounded-b-[12px] bg-white border border-slate-100 shadow-sm px-5 py-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {rowA.map((tag) => {
                  const Icon = kindToIcon(tag.kind);
                  return <VitalPill key={tag.id} label={tag.label} Icon={Icon} />;
                })}
              </div>
              <div className="h-[1px] bg-slate-200/70 my-2" />
              <div className="flex flex-wrap gap-2">
                {rowB.map((tag) => {
                  const Icon = kindToIcon(tag.kind);
                  return <VitalPill key={tag.id} label={tag.label} Icon={Icon} />;
                })}
              </div>
            </div>

            {/* Secret Rhythms */}
            {rhythmCount > 0 && (
              <div className="rounded-[12px] bg-white border border-slate-100 shadow-sm px-5 py-4">
                <SectionTitle title="My Secret Rhythms" />
                <div className="space-y-3 mt-2">
                  {profile.secretRhythms.slice(0, rhythmCount).map((r, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3 flex gap-3"
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

            {/* Glimpses */}
            {profile.photos?.length > 0 && (
              <div className="rounded-[12px] bg-white border border-slate-100 shadow-sm px-5 py-4">
                <SectionTitle title="Glimpses" />
                <div className="flex gap-3 overflow-x-auto no-scrollbar mt-2">
                  {profile.photos.map((ph, idx) => (
                    <div
                      key={idx}
                      className="flex-shrink-0 w-24 h-24 rounded-[18px] overflow-hidden bg-slate-100 border border-slate-100 shadow-[0_4px_10px_rgba(15,25,33,0.08)]"
                    >
                      <img
                        src={ph}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pulse Grid */}
            {profile.pulseQuestions?.length > 0 && (
              <div className="rounded-[12px] bg-white border border-slate-100 shadow-sm px-5 py-4">
                <div className="mt-2">
                  <PulseGrid
                    profile={profile}
                    answeredMap={answeredPulse[profile.id] || {}}
                    onOpenQuestion={onOpenPulseQuestion}
                  />
                </div>
              </div>
            )}

            {/* Prompts */}
            {profile.prompts?.length > 0 && (
              <div className="rounded-[12px] bg-white border border-slate-100 shadow-sm px-5 py-4">
                <SectionTitle title="Personality & prompts" />
                <div className="space-y-3 mt-2">
                  {profile.prompts.slice(0, 2).map((p, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3"
                    >
                      <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        {p.question}
                      </div>
                      <div className="mt-1 text-sm text-slate-800">
                        {p.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vibe */}
            {profile.myVibe?.length > 0 && (
              <div className="rounded-b-[38px] rounded-t-[12px] bg-white border border-slate-100 shadow-sm px-5 py-4">
                <SectionTitle title="Their vibe" />
                <div className="flex flex-wrap gap-2 mt-2">
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
        </motion.div>
      )}
    </div>
  );
};

export default InfoCard;