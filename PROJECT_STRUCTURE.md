# CodeBlue Project Structure - Updated Nov 14, 2025

## Complete Directory Tree

```
codeblue_ready/
│
├── docs/                                    # Documentation
│   ├── PROJECT_STATUS.md
│   ├── ROADMAP.md
│   ├── SESSION_HANDOFF_NOV14.md
│   └── ... (20+ documentation files)
│
├── src/
│   │
│   ├── ui/                                  # ✨ NEW - UI Component Library
│   │   ├── theme-variables.css              # CSS variables (gunmetal navy)
│   │   ├── Theme.jsx                        # Theme constants
│   │   ├── PageContainer.jsx/css            # Page wrapper
│   │   ├── Card.jsx/css                     # Card component
│   │   ├── Tag.jsx/css                      # Tag component
│   │   ├── IconButton.jsx/css               # Icon button
│   │   └── Typography.jsx/css               # Text components
│   │
│   ├── pages/                               # ✨ NEW - Test Pages
│   │   ├── Home.jsx/css                     # Discovery feed page
│   │   ├── MatchProfile.jsx/css             # Profile detail page
│   │   ├── App.jsx                          # Router for pages
│   │   └── TestPagesDemo.jsx                # Demo launcher
│   │
│   ├── components/                          # Production Components
│   │   ├── tabs/                            # Main app tabs
│   │   │   ├── HomeTab.jsx
│   │   │   ├── DiscoverTab.jsx
│   │   │   ├── ConnectTab.jsx
│   │   │   ├── MatchesTab.jsx
│   │   │   └── VentTab.jsx
│   │   │
│   │   ├── discover/                        # Discovery components
│   │   │   ├── PhotoCard.jsx
│   │   │   ├── ProfileHeader.jsx
│   │   │   ├── ActionButtons.jsx
│   │   │   ├── LifestyleRows.jsx
│   │   │   ├── HeartbeatIcon.jsx
│   │   │   ├── PulseButton.jsx
│   │   │   ├── PromptCard.jsx
│   │   │   ├── InfoChips.jsx
│   │   │   └── VibeTagsList.jsx
│   │   │
│   │   ├── navigation/                      # Navigation components
│   │   │   └── TopTabSwitcher.jsx
│   │   │
│   │   ├── skeletons/                       # Loading skeletons
│   │   │   ├── PhotoCardSkeleton.jsx
│   │   │   ├── MatchCardSkeleton.jsx
│   │   │   └── PromptCardSkeleton.jsx
│   │   │
│   │   ├── test/                            # Test components (isolated)
│   │   │   ├── HeartbeatIcon.jsx
│   │   │   ├── PulseButton.jsx
│   │   │   ├── TopTabSwitcher.jsx
│   │   │   ├── ProfileWave.jsx
│   │   │   ├── WaveTop.jsx
│   │   │   └── WaveTop_legacy.jsx
│   │   │
│   │   ├── ErrorBoundary.jsx
│   │   └── Toast.jsx
│   │
│   ├── screens/
│   │   └── TestMatchProfile.jsx
│   │
│   ├── styles/
│   │   └── codeblue-theme.css               # Main theme file
│   │
│   ├── utils/
│   │   └── discoveryPersistence.js
│   │
│   ├── CodeBlueDating.jsx                   # Main app component
│   ├── main.jsx                             # Entry point
│   └── index.css                            # Global styles
│
├── TEST_PAGES_README.md                     # ✨ NEW - Usage guide
├── TEST_PAGES_INTEGRATION_SUMMARY.md        # ✨ NEW - Integration summary
├── PROJECT_STRUCTURE.md                     # ✨ NEW - This file
│
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── index.html
```

## Component Dependencies

### Main App (Production)
```
CodeBlueDating.jsx
└── Tabs
    ├── HomeTab
    ├── DiscoverTab
    │   ├── TopTabSwitcher (from navigation/)
    │   ├── PhotoCard (from discover/)
    │   ├── ActionButtons (from discover/)
    │   │   ├── HeartbeatIcon (from discover/)
    │   │   └── PulseButton (from discover/)
    │   └── LifestyleRows (from discover/)
    ├── ConnectTab
    ├── MatchesTab
    │   └── TopTabSwitcher (from navigation/)
    └── VentTab
```

### Test Environment (Isolated)
```
Option 1: Router-Based
pages/App.jsx (with react-router-dom)
├── Home (/)
│   ├── PageContainer
│   ├── Card
│   ├── Tag
│   └── IconButton
└── MatchProfile (/profile/:id)
    ├── PageContainer
    ├── Tag
    └── IconButton

Option 2: Demo Component
pages/TestPagesDemo.jsx
├── Home
│   └── (same UI components)
└── MatchProfile
    └── (same UI components)
```

## File Organization Logic

### Production Code (Stable)
- **src/CodeBlueDating.jsx** - Main app, sample data, state management
- **src/components/tabs/** - Production tab views
- **src/components/discover/** - Reusable discovery components
- **src/components/navigation/** - Navigation components
- **src/styles/** - Main theme and styles

### Test Environment (Experimental)
- **src/ui/** - Reusable UI component library
- **src/pages/** - Test pages (Home, MatchProfile, demos)
- **src/components/test/** - Experimental components
- **src/screens/** - Test screens

### Documentation
- **docs/** - Comprehensive project documentation
- **TEST_PAGES_*.md** - Test environment documentation
- **STATUS_SUMMARY.md** - Quick project status
- **README.md** - Main readme

## Import Paths Quick Reference

### UI Components (New)
```jsx
import PageContainer from '../ui/PageContainer';
import Card from '../ui/Card';
import Tag from '../ui/Tag';
import IconButton from '../ui/IconButton';
import { H1, Title, Body, Meta, Caption } from '../ui/Typography';
import { colors, radius, shadows, spacing, typography } from '../ui/Theme';
```

### Test Pages (New)
```jsx
import Home from '../pages/Home';
import MatchProfile from '../pages/MatchProfile';
import TestPagesDemo from '../pages/TestPagesDemo';
```

### Production Components (Existing)
```jsx
// From components/tabs/
import DiscoverTab from '../components/tabs/DiscoverTab';

// From components/discover/
import ActionButtons from '../components/discover/ActionButtons';
import LifestyleRows from '../components/discover/LifestyleRows';

// From components/navigation/
import TopTabSwitcher from '../components/navigation/TopTabSwitcher';
```

## Theme System

### CSS Variables (src/ui/theme-variables.css)
```css
--primary-solid: #0F213A
--text-primary: rgba(15, 25, 33, 0.95)
--background: #FCF9F9
--card: #FFFFFF
--radius-card: 24px
--shadow-card: 0 18px 40px rgba(15, 25, 33, 0.12)
```

### JS Constants (src/ui/Theme.jsx)
```javascript
colors.primarySolid = "#0F213A"
radius.card = "24px"
shadows.card = "0 18px 40px rgba(15,25,33,0.12)"
typography.display = { size: "28px", lineHeight: "34px", weight: 700 }
```

### Main Theme (src/styles/codeblue-theme.css)
```css
--cb-primary: rgba(15,33,58,0.9)
--cb-text-primary: rgba(15,25,33,0.95)
--cb-radius-card: 24px
```

## Build Output

```
dist/
├── index.html (0.40 kB)
├── assets/
│   ├── index-BtjdshVu.css (75.24 kB / 11.99 kB gzipped)
│   ├── TopTabSwitcher-*.js (1.87 kB)
│   ├── ConnectTab-*.js (4.31 kB)
│   ├── MatchesTab-*.js (5.16 kB)
│   ├── HomeTab-*.js (7.55 kB)
│   ├── VentTab-*.js (9.42 kB)
│   ├── DiscoverTab-*.js (17.04 kB)
│   ├── TestMatchProfile-*.js (17.93 kB)
│   └── index-*.js (318.00 kB / 89.79 kB gzipped)
```

**Total Bundle:** 318.00 kB (89.79 kB gzipped)  
**Build Time:** ~13-15 seconds

## Key Isolation Boundaries

### What's Protected
- ✅ Main app (`CodeBlueDating.jsx`) never imports from `pages/`
- ✅ Production tabs never import from `pages/`
- ✅ Test components in `components/test/` isolated from production
- ✅ UI library in `ui/` is optional - production doesn't depend on it

### What's Shared
- ⚡ CSS theme variables (both environments use gunmetal navy)
- ⚡ Global styles (`index.css`)
- ⚡ Tailwind CSS utilities
- ⚡ React/Vite build system

## Component Count by Directory

| Directory | Components | Lines of Code (approx) |
|-----------|-----------|----------------------|
| `src/ui/` | 6 | 400 |
| `src/pages/` | 4 | 800 |
| `src/components/tabs/` | 5 | 1,500 |
| `src/components/discover/` | 9 | 1,200 |
| `src/components/navigation/` | 1 | 100 |
| `src/components/test/` | 6 | 600 |
| `src/components/skeletons/` | 3 | 300 |
| `src/components/` (root) | 2 | 200 |
| **Total** | **36** | **~5,100** |

## Status Summary

### Production App
- **Status:** ✅ Stable, fully functional
- **Bundle:** 318.00 kB (89.79 kB gzipped)
- **Errors:** 0
- **Components:** 29
- **Features:** Discovery, Matches, Connect, Home, Vent tabs

### Test Environment
- **Status:** ✅ Ready to use
- **Components:** 10 (6 UI + 4 pages)
- **Dependencies:** react-router-dom installed
- **Isolation:** Complete - no conflicts with production
- **Documentation:** Complete usage guide included

---

**Last Updated:** November 14, 2025  
**Build:** Successful (0 errors, 0 warnings)  
**Integration:** Complete and tested
