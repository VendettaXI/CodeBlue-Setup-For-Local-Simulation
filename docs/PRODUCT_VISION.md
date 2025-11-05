# CodeBlue Product Vision & Concept Guide

Last updated: Nov 5, 2025

This living document captures the original concept ideas, north-star UX quality bar, unique differentiators, and a flexible feature/roadmap view to keep all contributors aligned. It is intentionally non-binding and open to well-reasoned changes and bold, thoughtful proposals.

## Purpose

Build a safe, premium-feeling dating and community app for healthcare workers that:
- Feels intimate, supportive, and emotionally freeing.
- Helps users find connection (romantic or platonic) and process tough experiences.
- Stays valuable after matching via community, wellness, and relationship-growth tools.

## Design inspiration and quality bar

- Primary UI inspiration: Hinge-level elegance and clarity; intent is to match or surpass this quality.
- Visual language: Modern, sophisticated, accessible, and emotionally warm.
- Current web app is a local simulation and design reference; mobile remains a strong target platform.

## Unique differentiators (must-keep ideas)

- Shift Sync matching: Respect schedules and routines unique to healthcare.
- Anonymous Vent Space: Topic rooms and 1:1 decompression with ephemeral storage (TTL), screenshot guidance, optional voice with distortion.
- Buddy Mode: Platonic connections and themed groups (Night Shift Crew, New Nurses Circle, Wellness & Coffee, etc.).
- AI Listener and Safety: Empathetic fallback when no one’s online, and content moderation to prevent PII and harm.
- Verified healthcare community: Trust and safety via healthcare domain/email or vetted verification methods.

## Free vs Premium feature intent (draft, non-final)

Principles
- Free should be meaningful: allow real connection and core usage.
- Premium should add clear value (convenience, visibility, wellness/community extras), not gate basic humanity.

Free (indicative)
- Basic matching and swiping; unlimited likes; messages with matches.
- Profile verification; basic filters (age, distance, shift patterns); mutual connections.
- Safety features (block/report); basic event browsing; Buddy Mode basics.

Premium Tiers (draft – subject to change)
- Professional (~£9.99): See Who Likes You; 1x Boost/month; Priority Likes; Recently Active; Rewind; unlimited Super Likes (or weekly quota); advanced filters (specialty/hospital/education/interests); read receipts; pre-match comments; priority messaging; more privacy controls; no ads; anonymous browsing.
- Premium Plus (~£14.99): All above + Vent Space unlimited; AI Listener; exclusive/hosted events; verified professional badge; Passport/Travel/Global discovery; compatibility insights; daily top picks; standout feed; relationship tools (couple mode/date assistant/tips).
- VIP (~£24.99): All above + weekly boosts and a monthly super boost; VIP badge; priority support; VIP events; optional background checks; video-date setup concierge.

À la carte (examples)
- Super Like packs; Boost packs; Vent Space day pass; event tickets; Rewind packs.

Ethical note
- Consider NHS discounts/subsidy models; maintain accessibility for those who need the platform most.

## Roadmap overview

- Core polish first: Dark mode completeness, Accessibility (ARIA/keyboard/focus), Cross-browser responsive QA.
- Parallel: refine Discover (UX corrections, edge cases).
- Then iterative MVPs by screen/tab:
  1) Profile & Settings: Actionable self-view, edit flows, privacy/notification controls.
  2) Matches: Conversations list + threads, optimistic send, basic presence.
  3) Connect: Events list/detail with RSVP, attendees preview.
  4) Vent: Rooms + messages with ephemeral storage and pseudo-realtime.
  5) Home: Actionable dashboard with stats and next-best-actions.

See `docs/ROADMAP.md` for detailed MVP scope, data contracts, acceptance criteria, and edge cases for each screen.

## Implementation paths (flexible)

- Current repository: React + Vite web app used for concepting, simulation, and design polish.
- Mobile direction (from prior notes): React Native (Expo) for cross-platform reach; Node/TypeScript backend; Postgres + Redis; Firestore/Supabase or Socket.IO for realtime; S3-compatible storage; OpenAI/Anthropic for moderation.
- This document intentionally does not lock the stack. Treat backend and mobile choices as candidate paths, to be finalized with product/engineering tradeoffs.

## Product principles

- Safety and compliance: Verification without over-collecting PII, moderation for ethics/PII, GDPR features (export/delete/consent/retention).
- Accessibility: WCAG AA contrast, keyboard flows, screen-reader labels, focus management.
- Performance: Snappy interactions, lightweight bundles, progressive loading, skeletons.
- Openness to change: Radical but reasonable proposals are welcome; prefer data- and user-feedback-driven iteration.

## Change policy

This is a living guide. When direction changes, update this file and the roadmap. Link major shifts from `docs/PROJECT_STATUS.md` for easy discovery.
