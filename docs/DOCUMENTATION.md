# CodeBlue Dating App - Documentation

## Overview
CodeBlue is a premium dating app for healthcare professionals with Hinge/Bumble-level UI polish. This document provides a comprehensive guide for developers new to the codebase.

## 🎯 Project Structure

```
codeblue_ready/
├── src/
│   ├── CodeBlueDating.jsx     # Main application (2900+ lines)
│   ├── main.jsx                # App entry point
│   ├── index.css               # Tailwind imports
│   └── components/
│       ├── ActionTray.jsx      # Action button component
│       └── ActionTrayPreview.jsx
├── index.html                  # HTML template
├── package.json                # Dependencies
├── tailwind.config.js          # Tailwind configuration
├── vite.config.js              # Vite build configuration
└── postcss.config.js           # PostCSS configuration

## 📚 Key Technologies

- **React 18+**: Hooks-based architecture (no class components)
- **Vite 7.1.12**: Build tool and dev server
- **TailwindCSS 3.4.13**: Utility-first CSS framework
- **Lucide React 0.552.0**: Icon library (45+ icons)
- **CSS-in-JS**: Via injected `<style>` tag (see `useCodeBlueTheme`)

## 🏗️ Architecture

### Single-File Component Approach
The entire app is currently in one file (`CodeBlueDating.jsx`) for rapid prototyping. This is intentional but should be refactored for production.

### Screen Hierarchy
```
App Root
├── Splash Screen (initial landing)
└── Main App
    ├── Discover Tab (swipe/like profiles)
    ├── Matches Tab (conversations)
    ├── Home Tab (dashboard, stats, events)
    ├── Connect Tab (networking features)
    ├── Vent Tab (anonymous support rooms)
    ├── Profile Screen (view others' profiles)
    ├── Edit Profile Screen (edit your profile)
    └── Settings Screen (app preferences)
```

## 🎨 Styling System

### Custom CSS Variables (--cb-* prefix)
```css
--cb-bg              # Background color
--cb-navy-deep       # Primary dark navy
--cb-navy            # Primary navy
--cb-navy-soft       # Light navy
--cb-text            # Primary text color
--cb-text-muted      # Secondary text color
--cb-surface         # Card background
--cb-surface-muted   # Muted surface
--cb-border          # Border color
```

### Utility Classes
- `.cb-wordmark-blue` - Gradient text effect for branding
- `.cb-shadow-card` - Card shadow styling
- `.cb-glass` - Glassmorphism effect
- `.cb-reveal` - Fade-up animation
- `.cb-chip-light` - Light chip styling

### Typography Classes
- `.cb-display` - Largest heading (800 weight)
- `.cb-title` - Section titles (700 weight)
- `.cb-subtitle` - Subsection titles (600 weight)
- `.cb-body` - Body text (500 weight)
- `.cb-meta` - Small uppercase labels
- `.cb-eyebrow` - Section headers

## 💾 State Management

### State Organization (20+ useState hooks)

**1. Theme & Appearance**
- `darkMode` - Boolean for dark/light theme
- `toggleDarkMode()` - Function to switch themes

**2. Navigation**
- `currentScreen` - Top-level screen (splash | main | profile | edit-profile | settings)
- `activeTab` - Active tab in main screen (discover | matches | home | connect | vent)
- `currentMatch` - Index of currently displayed profile
- `selectedMatch` - Which match conversation is open
- `ventRoom` - Active support room (null if not in room)

**3. User Profile**
- `userProfile` - Complete user profile object
- `profilePhotos` - Array of up to 6 photos
- `bio` - User bio text
- `selectedPrompts` - Prompt responses array
- `selectedVibe` - Interest/vibe tags
- `dealbreakers` - Selected dealbreakers

**4. UI States**
- `activePrompt` - Which prompt is displayed in swipe view
- `showFilters` - Discovery filters modal visibility
- `editSection` - Active profile edit section

**5. Settings**
- Privacy: `showLastActive`, `pauseProfile`, `enableDiscovery`
- Messaging: `readReceipts`
- Discovery: `showDistance`, `maxDistance`, `ageRange`
- Notifications: `pushNotifications`, `emailNotifications`

## 📊 Data Structures

### sampleProfiles (Discover Tab)
Array of profile objects for swiping:
```javascript
{
  id: number,
  name: string,
  age: number,
  role: string,              // Healthcare role
  hospital: string,
  distance: number,          // in km
  photos: string[],          // Emoji placeholders
  prompts: [{
    question: string,
    answer: string,
    type: 'text'
  }],
  verified: boolean,
  vibe: string[],            // Interest tags
  mutualConnections: number
}
```

### myMatches (Matches Tab)
Array of matched users with conversations:
```javascript
{
  id: number,
  name: string,
  role: string,
  photo: string,
  lastMessage: string,
  unread: boolean,
  time: string,              // Relative time
  online: boolean,
  yourTurn: boolean          // Whose turn to respond
}
```

### ventTopics (Vent Tab)
Anonymous support room categories:
```javascript
{
  id: number,
  name: string,
  description: string,
  icon: string,              // Emoji
  active: number,            // Active users count
  gradient: string,          // Tailwind gradient classes
  trending: boolean
}
```

### events (Community Events)
```javascript
{
  id: number,
  title: string,
  date: string,
  time: string,
  location: string,
  attendees: number,
  going: number,             // Mutual connections attending
  image: string,             // Emoji placeholder
  category: string           // Wellness, Support, Social, etc.
}
```

## 🧩 Utility Components

### ToggleSwitch
iOS-style toggle for settings
```jsx
<ToggleSwitch 
  enabled={state} 
  onChange={(newValue) => setState(newValue)} 
/>
```

### SettingItem
Reusable settings row
```jsx
<SettingItem
  icon={Icon}
  label="Setting Name"
  description="Optional description"
  action={<ToggleSwitch ... />}
  showChevron={true}
  onClick={() => {}}
/>
```

### Section
Settings section container
```jsx
<Section title="Section Header">
  {children}
</Section>
```

## 🎯 Feature Highlights

### 1. Discover Tab
- Tinder-style swipe interface
- Profile cards with prompts
- Like/Pass actions
- Filters for preferences

### 2. Matches Tab
- Active conversations
- Unread indicators
- "Your turn" prompts
- Premium "Who Likes You" section (blurred)

### 3. Home Tab
- Daily insights and stats
- Community events
- Achievement badges
- Activity charts

### 4. Connect Tab
- Professional networking
- Hospital search
- Shift compatibility

### 5. Vent Tab
- Anonymous support rooms
- Healthcare-specific topics
- Active user counts
- Safe space for processing difficult experiences

## 🚀 Development Commands

```bash
# Install dependencies
npm install

# Start development server (port 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Dark Mode

### How It Works
1. Theme stored in `localStorage` as 'light' or 'dark'
2. `.dark` class added to `<html>` element
3. CSS variables and classes respond to `.dark` class
4. System preference detected on first load if no saved preference

### Toggle Programmatically
```javascript
import { toggleCodeBlueTheme } from './CodeBlueDating';
toggleCodeBlueTheme(); // Switches theme
```

## 🔧 Recommended Refactoring

### For Production (when file exceeds 3000 lines):

**1. Split into Modules**
```
src/
├── screens/
│   ├── SplashScreen.jsx
│   ├── DiscoverTab.jsx
│   ├── MatchesTab.jsx
│   ├── HomeTab.jsx
│   ├── ConnectTab.jsx
│   ├── VentTab.jsx
│   ├── ProfileScreen.jsx
│   ├── EditProfileScreen.jsx
│   └── SettingsScreen.jsx
├── components/
│   ├── ToggleSwitch.jsx
│   ├── SettingItem.jsx
│   └── Section.jsx
├── hooks/
│   ├── useCodeBlueTheme.js
│   └── useDarkMode.js
├── data/
│   ├── profiles.js
│   ├── matches.js
│   ├── ventTopics.js
│   └── events.js
└── styles/
    └── codeblue-theme.css
```

**2. Extract CSS**
Move template literal CSS to separate file and import normally.

**3. Add State Management**
Consider Zustand for complex state (lightweight alternative to Redux).

## 🐛 Known Limitations

- ⚠️ Sample data only (no real backend)
- ⚠️ No real-time updates (requires WebSocket)
- ⚠️ Emoji placeholders instead of actual images
- ⚠️ No NHS verification process
- ⚠️ localStorage only (no database)
- ⚠️ No error boundaries
- ⚠️ No loading states

## 📝 Code Comments

The codebase has extensive inline comments:
- **File header**: Project overview and architecture
- **Hook documentation**: useCodeBlueTheme hook explained
- **State sections**: All state variables documented
- **Data constants**: Purpose and structure of each dataset
- **Utility components**: Props and usage explained
- **Developer roadmap**: Future enhancements and refactoring guide

## 🎓 For New Developers

### Quick Start Guide
1. Read the file header in `CodeBlueDating.jsx` (lines 1-50)
2. Understand the state architecture (lines 250-450)
3. Review data structures (lines 450-650)
4. Explore one screen at a time (search for screen names)
5. Check developer roadmap at end of file

### Common Tasks

**Add a new profile:**
Add object to `sampleProfiles` array (around line 470)

**Add new setting:**
1. Add useState hook in settings section
2. Add SettingItem in Settings screen render
3. Connect toggle to state

**Modify theme colors:**
Edit CSS variables in `useCodeBlueTheme` hook (around line 90)

**Add new tab:**
1. Add tab button in main navigation
2. Add new activeTab case in render logic
3. Create new screen content

## 🔒 Security Notes

- All data currently client-side only
- No authentication implemented
- No API integration
- localStorage is not encrypted
- **Do not use for real user data without backend**

## 🎉 Credits

Built with modern React patterns and premium UI/UX design inspired by Hinge and Bumble.

---

**Need Help?**
Check the inline comments throughout `CodeBlueDating.jsx` - they're comprehensive and explain every major section!
