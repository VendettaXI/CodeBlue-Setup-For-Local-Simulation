# CodeBlue Roadmap & MVP Specs

Last updated: Nov 6, 2025

⚠️ **Current Status:** Frontend prototype with hardcoded data. This roadmap outlines the path from UI demo to production-ready MVP with backend integration.

**What Exists Now:**
- ✅ Premium UI design across all tabs (Hinge/Bumble quality)
- ✅ Dark mode, accessibility (WCAG AA), responsive design
- ✅ Frontend interactions (swipes, skeletons, like/comment UI)

**What's Missing for Real MVP:**
- ❌ Backend API server and database
- ❌ User authentication and accounts
- ❌ Real data (currently hardcoded samples)
- ❌ Messaging system (UI exists, no backend)
- ❌ File upload/storage
- ❌ Matching algorithm

This roadmap assumes backend development will proceed in parallel with frontend refinements.

## Priorities (sequence)

**Phase 1: Backend Foundation (Critical)**
1) Set up backend API (Node.js/Express or Python/FastAPI)
2) Database setup (PostgreSQL/MongoDB/Supabase)
3) User authentication (Auth0, Firebase, or custom JWT)
4) Profile CRUD endpoints
5) Image upload/storage (Cloudinary, S3, or similar)

**Phase 2: Core Dating Features**
6) Discover backend: Profile fetching, filtering, matching algorithm
7) Like/Match system: Mutual likes → match creation
8) Messaging backend: WebSocket server for real-time chat
9) Matches tab integration: Connect frontend to backend

**Phase 3: Community Features**
10) Connect backend: Events CRUD, RSVP system
11) Vent backend: Anonymous chat rooms with WebSocket
12) Home dashboard: Real-time stats and insights

**Phase 4: Polish & Production**
13) Push notifications
14) Analytics and monitoring
15) Performance optimization
16) Security audit
17) Production deployment

---

## Global contracts (applies to all MVPs)

**Frontend (Already Implemented):**
- ✅ Error handling: User-friendly states, retry actions, and empty states
- ✅ Loading: Skeletons for list and detail views
- ✅ A11y: Proper roles/labels, keyboard navigation, focus management
- ✅ Theming: Light/dark with WCAG AA contrast

**Backend (To Be Implemented):**
- ⚠️ Data layer: RESTful API or GraphQL endpoints
- ⚠️ Authentication: Secure user sessions and token management
- ⚠️ Real-time: WebSocket connections for messaging and live updates
- ⚠️ Storage: Image upload, CDN integration, database persistence
- ⚠️ Validation: Server-side input validation and sanitization

---

## Discover (Frontend Complete, Backend Needed)

User value: Browse profiles, express interest, manage interactions.

**Frontend Status:** ✅ UI complete with swipe gestures, skeletons, responsive design
**Backend Status:** ❌ All data is hardcoded samples - needs full backend integration

**Frontend Features (Implemented):**
- ✅ Swipeable profiles with drag physics (left/right/up)
- ✅ Photo cards with navigation, badges, compatibility %
- ✅ Profile info (name, age, role, hospital, shift, distance)
- ✅ Prompt cards (Hinge-style) with comment and like UI
- ✅ Action buttons (Pass/Favorite/Connect)
- ✅ Filter modal (age range, max distance, role, shift)
- ✅ Skeleton loading states
- ✅ Dark mode and accessibility

**Backend Needed:**
- ❌ GET /api/profiles - Fetch profiles based on filters and algorithm
- ❌ POST /api/profiles/:id/like - Record like action
- ❌ POST /api/profiles/:id/pass - Record pass action
- ❌ POST /api/prompts/:id/like - Like a specific prompt
- ❌ POST /api/prompts/:id/comment - Comment on prompt
- ❌ Matching algorithm: Compatibility scoring based on specialty, shift, location, interests

---

## Profile & Settings MVP

User value: View and edit profile; control privacy, notifications, and preferences.

**Frontend Status:** ✅ UI components exist in HomeTab/Settings modal
**Backend Status:** ❌ No user accounts, profile CRUD, or settings persistence

**Frontend Features (Partially Implemented):**
- ⚠️ Profile view UI: Stats display (hardcoded), achievements layout
- ⚠️ Edit profile modal: Photo grid, bio textarea, prompts form
- ✅ Settings modal: Dark mode toggle (localStorage only)
- ⚠️ Privacy toggles: UI exists but no backend

**Backend Needed:**
- ❌ POST /auth/register - User registration
- ❌ POST /auth/login - User authentication
- ❌ GET /api/profile/:userId - Fetch user profile with stats
- ❌ PUT /api/profile - Update profile (bio, photos, prompts, vibe, dealbreakers)
- ❌ POST /api/profile/photos - Upload profile photos to CDN
- ❌ GET /api/settings - Fetch user settings
- ❌ PUT /api/settings - Update privacy, notifications, discovery preferences
- ❌ DELETE /api/account - Account deletion

**Data Requirements:**
- User accounts table (id, email, password_hash, created_at)
- Profiles table (user_id, bio, role, specialty, hospital, shift, photos_urls)
- Settings table (user_id, privacy_settings, notification_preferences)

---

## Matches MVP

User value: Manage conversations from matches; read and send messages.

**Frontend Status:** ✅ UI complete with match cards, chat layout
**Backend Status:** ❌ No messaging system, all matches are hardcoded

**Frontend Features (Implemented):**
- ✅ "Who Likes You" section UI with gradient cards
- ✅ Conversations list with avatars, last message, timestamps
- ✅ Unread indicators and "Your turn" badges
- ✅ Online status indicators
- ⚠️ Chat thread UI exists but not functional

**Backend Needed:**
- ❌ GET /api/matches - Fetch user's matches
- ❌ GET /api/likes/received - Fetch who liked the user
- ❌ POST /api/matches/:matchId/messages - Send message
- ❌ GET /api/matches/:matchId/messages - Fetch conversation history
- ❌ WebSocket server for real-time messaging
- ❌ POST /api/matches/:matchId/read - Mark messages as read
- ❌ Matching logic: When user A likes user B who already liked user A → create match

**Data Requirements:**
- Matches table (id, user1_id, user2_id, created_at, last_message_at)
- Messages table (id, match_id, sender_id, content, sent_at, read_at)
- Likes table (id, liker_id, liked_id, created_at)

---

## Connect MVP (Events)

User value: Browse events, view details, and RSVP.

**Frontend Status:** ✅ UI complete with event cards, RSVP buttons
**Backend Status:** ❌ All events are hardcoded, no RSVP functionality

**Frontend Features (Implemented):**
- ✅ Buddy Mode toggle card with gradient
- ✅ Event cards with emoji, title, date, location, attendee count
- ✅ Category badges (Wellness, Support, Social)
- ✅ RSVP button UI
- ✅ "Create Your Own Event" button

**Backend Needed:**
- ❌ GET /api/events - Fetch upcoming events
- ❌ GET /api/events/:id - Fetch event details
- ❌ POST /api/events - Create new event
- ❌ POST /api/events/:id/rsvp - Toggle RSVP status
- ❌ GET /api/events/my-rsvps - Fetch user's RSVPs
- ❌ DELETE /api/events/:id - Delete event (creator only)

**Data Requirements:**
- Events table (id, creator_id, title, description, date, time, location, category, emoji)
- Event_RSVPs table (id, event_id, user_id, created_at)
- Past events; capacity full (future), network errors.

---

## Vent MVP (Support Rooms)

User value: Join topic rooms and exchange supportive messages anonymously.

**Frontend Status:** ✅ UI complete with room cards, safety notice, crisis resources
**Backend Status:** ❌ No real chat rooms, all data is hardcoded

**Frontend Features (Implemented):**
- ✅ Anonymous room cards (Burnout, Imposter Syndrome, Night Shift, etc.)
- ✅ Community stats display (40 online, 24/7, 100% anonymous)
- ✅ Safety notice with guidelines
- ✅ 1-on-1 anonymous chat button
- ✅ Crisis resources card

**Backend Needed:**
- ❌ GET /api/vent/rooms - Fetch available rooms with active counts
- ❌ WebSocket /ws/vent/:roomId - Join anonymous chat room
- ❌ POST /api/vent/1on1/match - Pair users for private anonymous chat
- ❌ AI moderation system for patient privacy (detect PHI/PII)
- ❌ Auto-delete system: Messages auto-delete after session
- ❌ Crisis resource integration: Actual phone call functionality

---

## Home MVP (Dashboard)

User value: Actionable overview that encourages engagement.

**Frontend Status:** ✅ UI complete with stats cards, top match, profile completion
**Backend Status:** ❌ All stats are hardcoded, no real data

**Frontend Features (Implemented):**
- ✅ Stats cards: Profile views (40), New likes (12) - hardcoded
- ✅ Top match highlight card with compatibility %
- ✅ Profile completion progress bar (hardcoded %)
- ✅ Tip of the Day card

**Backend Needed:**
- ❌ GET /api/dashboard/stats - Real profile views, likes, matches today
- ❌ GET /api/dashboard/top-match - Algorithm-based recommendation
- ❌ GET /api/profile/completion - Calculate completion percentage
- ❌ GET /api/insights/daily - Personalized tip based on activity

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
