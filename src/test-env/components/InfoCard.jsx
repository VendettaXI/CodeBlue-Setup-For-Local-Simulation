// src/test-env/components/InfoCard.jsx
// --------------------------------------------------------------
// Collapsed = 2x2 vital grid + centered gradient "More" pill tab
// Expanded = full detail view with Secret Rhythms, PulseGrid, etc.
// --------------------------------------------------------------

import React from "react";
import { Activity, Shield, Moon, Zap, Heart } from "lucide-react";
import SnapshotPill from "./SnapshotPill";

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
  <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-800 shadow-[0_4px_12px_rgba(15,33,58,0.12)]">
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(15,33,58,0.98)] text-white shadow-[0_4px_10px_rgba(15,33,58,0.55)]">
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
        <div className="relative rounded-[38px] bg-white border border-slate-200/70 px-4 pt-3 pb-4">
          {/* "More" pill tab */}
          <button
            onClick={onExpand}
            className="absolute left-1/2 -translate-x-[calc(50%-8px)] -top-3 px-3 py-1.5 rounded-full text-[11px] font-medium text-white shadow-[0_3px_8px_rgba(15,33,58,0.3)] bg-gradient-to-r from-[#0F213A] via-[#141f2e] to-black active:scale-95 transition"
            style={{ transform: "translate(-50%, -8px)" }}
          >
            <Activity className="inline-block w-3.5 h-3.5 mr-1 align-middle text-white" />
            More{remainingCount > 0 ? ` · +${remainingCount}` : ""}
          </button>

          {/* Header */}
          <div className="mb-3 flex items-center gap-2 justify-start">
            <span className="h-1.5 w-1.5 rounded-full bg-[rgba(15,33,58,0.86)]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
              Vitals at a glance
            </p>
          </div>

          {/* Vital pills grid (2x2) */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
            {visibleVitals.map((tag) => {
              const Icon = kindToIcon(tag.kind);
              return <VitalPill key={tag.id} label={tag.label} Icon={Icon} />;
            })}
          </div>
        </div>
      ) : (
        /* ------------------------------------------------------ */
        /* EXPANDED STATE */
        /* ------------------------------------------------------ */
        <>
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
                {rowA.map((tag) => (
                  <SnapshotPill key={tag.id} kind={tag.kind} label={tag.label} />
                ))}
              </div>
              <div className="h-[1px] bg-slate-200/70 my-2" />
              <div className="flex flex-wrap gap-2">
                {rowB.map((tag) => (
                  <SnapshotPill key={tag.id} kind={tag.kind} label={tag.label} />
                ))}
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

            {/* Glimpses */}
            {profile.photos?.length > 0 && (
              <div className="rounded-[12px] bg-white border border-slate-100 shadow-sm px-5 py-4">
                <SectionTitle title="Glimpses" />
                <div className="flex gap-3 overflow-x-auto pb-1 mt-2">
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
        </>
      )}
    </div>
  );
};

export default InfoCard;