# CodeBlue Roadmap & MVP Specs

Last updated: Nov 5, 2025

This roadmap clarifies scope and priorities for moving screens/tabs from placeholders to production-ready MVPs. Discover is **in progress** (core mechanics present; needs UX polish and corrections). Matches, Home, Connect, Vent, Profile, and Settings are intentionally UX previews and will be iterated to MVPs post core polish (dark mode, accessibility, cross-browser QA).

## Priorities (sequence)

1) Core polish: Dark mode, Accessibility, Cross-browser QA
2) Discover refinements: UX corrections, edge cases, final polish
3) Profile & Settings MVP (edit flows, privacy/notification controls, achievements/stats)
4) Matches MVP (conversations list + threads)
5) Connect MVP (events list + detail + RSVP)
6) Vent MVP (rooms + realtime-like chat simulation)
7) Home MVP (actionable dashboard with real counters)

---

## Global contracts (applies to all MVPs)

- Error handling: User-friendly states, retry actions, and empty states.
- Loading: Skeletons for list and detail views.
- A11y: Proper roles/labels, keyboard navigation, focus management.
- Theming: Light/dark with WCAG AA contrast.
- Data: Local mock service now; injectable adapters to swap to real API later.

---

## Discover (in progress)

User value: Browse profiles, express interest, manage interactions.

Status: Core mechanics present (swipes, skeletons, persistence); needs UX polish and corrections.

Features
- Swipeable profiles with gestures (left/right/up).
- Photo cards with navigation, verified badges, match %.
- Profile info (name, age, role, hospital, shift, distance).
- Prompt cards (Hinge-style) with comment-first design and optional like.
- Action buttons (Pass/Favorite/Connect).
- Filters (age range, max distance).
- Activity history and stats.

Next steps
- Dark mode refinements (consistent surfaces, WCAG AA contrast).
- Accessibility pass (modals, keyboard flows, focus management).
- Cross-browser QA (touch gestures, backdrop-filter fallbacks).
- Edge-case handling (rapid swipes, empty states, offline).

---

## Profile & Settings MVP

User value: View and edit profile; control privacy, notifications, and preferences.

Features
- Profile view: Stats (views/likes/response rate), achievements, weekly activity chart, boosts/super likes count, "Who Likes You" preview (premium).
- Edit profile: Photos (up to 6), basic info (name/age/bio/role/specialty/hospital/shift), prompts (add/edit/remove), My Vibe (interests), dealbreakers.
- Settings: Privacy (pause profile, show last active, discovery on/off), dark mode toggle, messaging (read receipts), discovery (max distance, age range, show distance, interested in), notifications (push/email), account (phone/email/password/delete), logout.

Data contracts
- GET /profile/:userId -> { ...fields, stats, achievements, activity }
- PUT /profile { bio, photos, prompts, vibe, dealbreakers, ...fields }
- GET /settings -> { privacy, messaging, discovery, notifications, account }
- PUT /settings { ...updated fields }

Acceptance criteria
- Profile loads with skeleton; edit flows save optimistically with validation.
- Settings toggle/slider changes persist immediately; dark mode applies instantly.
- Keyboard/screen reader usable; focus management in edit modals.

Edge cases
- Incomplete profile; missing photos; empty prompts; invalid age range; network errors.

---

## Matches MVP

User value: Manage conversations from matches; read and send messages.

Features
- Conversations list with unread counts and timestamps.
- Conversation thread view (basic text messages).
- Compose box with send, Enter-to-send, Shift+Enter newline.
- Optimistic send + error toast on failure (mocked).
- Basic presence (online indicator) optional.

Data contracts
- GET /matches -> [{ id, name, role, avatarUrl?, unreadCount, lastMessage: { text, ts } }]
- GET /messages/:matchId -> [{ id, sender:'me'|'them', text, ts }]
- POST /messages/:matchId { text } -> { id, sender:'me', text, ts }

Acceptance criteria
- List loads with skeleton → data.
- Thread loads with skeleton → history; send appends immediately and persists.
- Keyboard and screen reader usable; focus kept in composer when appropriate.

Edge cases
- Empty thread; long messages; offline simulated error; rapid sends.

---

## Connect MVP (Events)

User value: Browse events, view details, and RSVP.

Features
- Events list (title, date/time, location, attending count).
- Event detail with description, attendees preview, RSVP button.
- RSVP toggle (optimistic) with toast feedback.

Data contracts
- GET /events -> [{ id, title, date, time, location, attendees, going, description? }]
- GET /events/:id -> { id, ...fields, attendeesList?: [{ id, name }] }
- POST /events/:id/rsvp { going:boolean } -> { going }

Acceptance criteria
- List and detail load with skeletons.
- RSVP toggles state locally and persists; handles errors gracefully.

Edge cases
- Past events; capacity full (future), network errors.

---

## Vent MVP (Support Rooms)

User value: Join topic rooms and exchange supportive messages (simulated real-time for now).

Features
- Rooms list with active counts and trending badge.
- Room view with message list, composer, and basic auto-scroll.
- Pseudo-realtime: periodic fetch or timeout-based bot reply for demo.

Data contracts
- GET /vent/rooms -> [{ id, name, description, active, trending }]
- GET /vent/rooms/:id/messages -> [{ id, sender, text, ts }]
- POST /vent/rooms/:id/messages { text } -> { id, sender:'me', text, ts }

Acceptance criteria
- Loading skeletons shown; messages append optimistically; scroll behavior sensible.
- Escape to close room; accessible labels and roles.

Edge cases
- Large history; fast message bursts; offline mode.

---

## Home MVP (Dashboard)

User value: Actionable overview that encourages engagement.

Features
- Today’s stats (views, likes, messages) + trends vs. last week.
- “Next best actions” (complete bio prompt, upload photo, reply to matches).
- Lightweight charts with accessible fallbacks.

Data contracts
- GET /dashboard -> {
  stats: { views:number, likes:number, messages:number },
  trends: [{ day:string, views:number, likes:number }],
  suggestions: [{ id, text, action:'open:profile'|'open:matches'|'open:prompts' }]
}

Acceptance criteria
- Stats visible with skeletons; actions navigate to relevant screens.
- Keyboard/reader usable; dark mode compliant.

Edge cases
- Zero state; partial data; slow load.

---

## Implementation notes

- Adapters: Implement a local adapter that returns Promises; later swap to fetch-based API adapter.
- State: Component-local for MVP; extract to a small data service module per domain (matches, events, vent, dashboard).
- Testing: Basic smoke tests (render + interaction) once lint/tests are introduced.

---

## Next steps

1) Finish core polish (dark mode, A11y, cross-browser).
2) Build Matches MVP with a local data adapter, then Connect and Vent.
3) Wire Home dashboard once the other three expose data entry points.
