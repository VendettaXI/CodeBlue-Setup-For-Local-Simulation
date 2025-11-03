# CodeBlue Dating App - Quick Code Reference

## 📍 File Line Number Guide

Use these line numbers to quickly navigate to specific sections in `CodeBlueDating.jsx`:

### Imports & Setup (Lines 1-75)
- **Lines 1-2**: React and Lucide icon imports
- **Lines 6-75**: `useCodeBlueTheme` hook (CSS injection)

### Main Component Start (Line 248)
- **Line 248**: `const CodeBlueDating = ()` component declaration

### State Management (Lines 250-450)
- **Lines 260-290**: Dark mode state and effects
- **Lines 295-305**: Navigation state
- **Lines 308-320**: User profile state
- **Lines 325-340**: Tab & navigation state
- **Lines 345-365**: Settings state
- **Lines 370-395**: Edit profile state

### Data Constants (Lines 400-650)
- **Lines 405-430**: `allPrompts` - Available prompt questions
- **Lines 435-450**: `vibeCategories` - Interest categories
- **Lines 455-540**: `sampleProfiles` - Swipeable profiles
- **Lines 545-550**: `myMatches` - Match conversations
- **Lines 555-560**: `whoLikesYou` - Premium feature data
- **Lines 565-575**: `ventTopics` - Support room categories
- **Lines 580-590**: `events` - Community events
- **Lines 595-605**: `dailyInsights` - Home tab stats
- **Lines 610-625**: `achievements` - Gamification badges
- **Lines 630-645**: `weeklyActivity` - Chart data

### Utility Components (Lines 650-730)
- **Lines 655-690**: `ToggleSwitch` component
- **Lines 695-720**: `SettingItem` component
- **Lines 725-730**: `Section` component

### Screen Renders (Lines 730-2880)

#### Splash Screen (Lines 735-820)
- Welcome screen with CodeBlue branding
- "Get Started" button

#### Main App Container (Lines 825-2875)
Navigation structure with 5 tabs

##### Discover Tab (Lines 830-1100)
- **Lines 835-850**: Filter button and header
- **Lines 855-950**: Profile card render
- **Lines 955-980**: Prompt display logic
- **Lines 985-1020**: Like/Pass action buttons
- **Lines 1025-1100**: Empty state and filters modal

##### Matches Tab (Lines 1105-1350)
- **Lines 1110-1140**: Premium "Who Likes You" section
- **Lines 1145-1220**: Match list render
- **Lines 1225-1350**: Conversation view

##### Home Tab (Lines 1355-1750)
- **Lines 1360-1420**: Profile completion card
- **Lines 1425-1500**: Daily insights section
- **Lines 1505-1620**: Upcoming events list
- **Lines 1625-1700**: Achievement badges
- **Lines 1705-1750**: Activity chart

##### Connect Tab (Lines 1755-1950)
- **Lines 1760-1850**: Hospital/team search
- **Lines 1855-1920**: Shift compatibility
- **Lines 1925-1950**: Networking features

##### Vent Tab (Lines 1955-2150)
- **Lines 1960-2050**: Support room list
- **Lines 2055-2150**: Active room view

#### Profile Screen (Lines 2155-2380)
- **Lines 2160-2220**: Header with back button
- **Lines 2225-2280**: Photo gallery
- **Lines 2285-2350**: Prompts display
- **Lines 2355-2380**: Vibe tags

#### Edit Profile Screen (Lines 2385-2650)
- **Lines 2390-2450**: Edit navigation
- **Lines 2455-2510**: Photo upload section
- **Lines 2515-2580**: Bio edit section
- **Lines 2585-2640**: Prompts edit section
- **Lines 2645-2650**: Vibe selection

#### Settings Screen (Lines 2655-2875)
- **Lines 2660-2710**: Account settings
- **Lines 2715-2770**: Privacy settings
- **Lines 2775-2820**: Discovery preferences
- **Lines 2825-2860**: Notification settings
- **Lines 2865-2875**: Logout and legal links

### Exports (Lines 2880-2995)
- **Line 2881**: Default export (CodeBlueDating)
- **Lines 2884-2889**: toggleCodeBlueTheme utility
- **Lines 2895-2990**: Developer roadmap comments

## 🔍 Quick Search Terms

Use Ctrl+F (Cmd+F on Mac) with these terms to find specific features:

### Screens
- `currentScreen === 'splash'` - Splash screen
- `currentScreen === 'main'` - Main app
- `currentScreen === 'profile'` - Profile view
- `currentScreen === 'edit-profile'` - Edit profile
- `currentScreen === 'settings'` - Settings

### Tabs
- `activeTab === 'discover'` - Discover/swipe tab
- `activeTab === 'matches'` - Matches tab
- `activeTab === 'home'` - Home dashboard
- `activeTab === 'connect'` - Connect tab
- `activeTab === 'vent'` - Vent support rooms

### State Variables
- `const [darkMode` - Dark mode state
- `const [currentMatch` - Current swipe index
- `const [selectedMatch` - Open conversation
- `const [ventRoom` - Active support room
- `const [showFilters` - Filters modal

### Data
- `const sampleProfiles` - Profile data
- `const myMatches` - Match conversations
- `const whoLikesYou` - Premium feature
- `const ventTopics` - Support rooms
- `const events` - Community events

### Components
- `const ToggleSwitch` - Toggle component
- `const SettingItem` - Settings row
- `const Section` - Settings section

## 🎯 Common Code Patterns

### Conditional Rendering
```javascript
{currentScreen === 'splash' && (
  // Splash screen JSX
)}

{activeTab === 'discover' && (
  // Discover tab JSX
)}
```

### State Updates
```javascript
// Simple boolean toggle
setDarkMode(!darkMode);

// Update object state
setUserProfile(prev => ({
  ...prev,
  name: 'New Name'
}));

// Navigation
setCurrentScreen('main');
setActiveTab('matches');
```

### Event Handlers
```javascript
// Button click
onClick={() => setCurrentScreen('profile')}

// Input change
onChange={(e) => setBio(e.target.value)}

// Toggle
onChange={(newValue) => setReadReceipts(newValue)}
```

## 🏷️ CSS Class Patterns

### Layout
```jsx
className="flex flex-col h-full"           // Full height column
className="grid grid-cols-2 gap-4"         // 2-column grid
className="absolute inset-0"               // Cover parent
```

### Spacing
```jsx
className="p-5"                             // Padding all sides
className="px-5 py-3"                       // Horizontal/vertical
className="mt-4 mb-6"                       // Margin top/bottom
className="gap-4"                           // Grid/flex gap
```

### Typography
```jsx
className="cb-title"                        // Title style
className="cb-eyebrow"                      // Section header
className="cb-meta"                         // Small uppercase
className="text-sm text-gray-500"           // Size and color
```

### Custom Classes
```jsx
className="cb-card"                         // Card surface
className="cb-shadow-card"                  // Card shadow
className="cb-glass"                        // Glassmorphism
className="cb-reveal"                       // Fade-up animation
```

### Interactive
```jsx
className="hover:bg-gray-50"                // Hover effect
className="active:scale-95"                 // Press effect
className="transition-all duration-300"     // Smooth transition
```

## 🔧 Modification Checklist

### Adding a New Screen
1. ✅ Add new screen constant (e.g., 'my-new-screen')
2. ✅ Add navigation handler to switch to new screen
3. ✅ Add conditional render: `{currentScreen === 'my-new-screen' && (...)}`
4. ✅ Add back navigation to return to previous screen
5. ✅ Test navigation flow

### Adding a New Tab
1. ✅ Add tab button in main navigation bar
2. ✅ Add new tab constant (e.g., 'my-tab')
3. ✅ Add onClick handler: `onClick={() => setActiveTab('my-tab')}`
4. ✅ Add active state styling
5. ✅ Add tab content: `{activeTab === 'my-tab' && (...)}`

### Adding New State
1. ✅ Add useState hook with initial value
2. ✅ Add JSDoc comment explaining purpose
3. ✅ Use state in render logic
4. ✅ Add update handlers where needed

### Modifying Theme
1. ✅ Find `useCodeBlueTheme` hook (line 6)
2. ✅ Modify CSS variables in `:root` section
3. ✅ Update dark mode overrides if needed
4. ✅ Test in both light and dark mode

## 💡 Pro Tips

1. **Use VSCode Folding**: Collapse sections you're not working on
2. **Search by Comment**: Comments start sections (use Ctrl+F)
3. **Follow the Pattern**: New features should match existing code style
4. **Test Dark Mode**: Always test changes in both themes
5. **Check Mobile**: The app is mobile-first, test responsive behavior

## 🚨 Important Notes

- **Line numbers may shift** as you add/remove code
- **Always save before testing** - Vite hot reload requires saved files
- **Check console for errors** - Open browser DevTools
- **Backup before major changes** - Use git or copy the file

## 📖 Learning Resources

- **React Hooks**: https://react.dev/reference/react
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev/icons
- **Vite**: https://vitejs.dev/guide

---

**Last Updated**: Based on current file structure (2900+ lines)

Use this guide alongside DOCUMENTATION.md for complete understanding!
