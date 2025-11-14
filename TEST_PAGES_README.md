# Test Pages Environment - CodeBlue Dating App

## 📁 New Structure

Successfully integrated the following into your test environment:

```
src/
├── ui/                          # NEW - Reusable UI Component Library
│   ├── theme-variables.css      # CSS variables (gunmetal navy design system)
│   ├── Theme.jsx                # Theme constants & tokens
│   ├── PageContainer.jsx/css    # Page layout wrapper
│   ├── Card.jsx/css             # Card component
│   ├── Tag.jsx/css              # Tag/chip component
│   ├── IconButton.jsx/css       # Icon button component
│   └── Typography.jsx/css       # Typography components (H1, Title, Body, etc.)
│
├── pages/                       # NEW - Test Page Components
│   ├── Home.jsx/css             # Discovery feed page (vertical scroll)
│   ├── MatchProfile.jsx/css     # Profile detail page (curved action buttons)
│   ├── App.jsx                  # Router for test pages
│   └── TestPagesDemo.jsx        # Demo launcher (no router needed)
│
├── components/                  # Existing production components
│   ├── tabs/                    # Main app tabs (unchanged)
│   ├── discover/                # Discovery components (unchanged)
│   ├── navigation/              # Navigation components (unchanged)
│   └── test/                    # Test components (safe to modify)
│
└── screens/                     # Existing screens
    └── TestMatchProfile.jsx     # Original test screen (unchanged)
```

## 🎨 Design System

### Gunmetal Navy Color Palette
- **Primary:** `#0F213A` - Signature gunmetal navy
- **Text Primary:** `rgba(15,25,33,0.95)`
- **Text Secondary:** `#71778A`
- **Background:** `#FCF9F9`
- **Accent Blue:** `#049BCD`
- **Accent Rose:** `#D87AB4`

### Typography Scale
- **Display:** 28px / 34px / 700 weight
- **Title:** 20px / 28px / 600 weight
- **Body:** 16px / 24px / 500 weight
- **Meta:** 13px / 18px / 500 weight
- **Caption:** 12px / 16px / 500 weight

## 🚀 How to Use

### Option 1: Router-Based Pages (Multi-Page App)

Use `src/pages/App.jsx` with React Router:

```jsx
import App from './pages/App';

// In your main.jsx or test file
root.render(<App />);
```

Routes:
- `/` - Home feed
- `/profile/:id` - Profile detail view

### Option 2: Demo Component (Single Component Testing)

Use `src/pages/TestPagesDemo.jsx` for quick testing without router:

```jsx
import TestPagesDemo from './pages/TestPagesDemo';

// In your main.jsx or test file
root.render(<TestPagesDemo />);
```

This provides:
- ✅ Pre-loaded sample profiles
- ✅ Navigation between Home and Profile views
- ✅ Working action handlers (heartbeat, like, pass)
- ✅ Back button for easy navigation

### Option 3: Individual Components

Import pages directly:

```jsx
import Home from './pages/Home';
import MatchProfile from './pages/MatchProfile';

// Use with your own state/props
<Home 
  profiles={yourProfiles}
  onOpenProfile={handleOpen}
  onHeartbeat={handleHeartbeat}
/>

<MatchProfile
  profile={selectedProfile}
  onLike={handleLike}
  onHeartbeat={handleHeartbeat}
  onPass={handlePass}
/>
```

## 🧩 UI Component Library Usage

### PageContainer
Provides consistent page layout and background:
```jsx
import PageContainer from '../ui/PageContainer';

<PageContainer className="your-custom-class">
  {/* Your content */}
</PageContainer>
```

### Card
Reusable card component with shadow and rounded corners:
```jsx
import Card from '../ui/Card';

<Card className="custom-card">
  {/* Card content */}
</Card>
```

### Tag
Pill-shaped tags for metadata:
```jsx
import Tag from '../ui/Tag';

<Tag variant="default">Night shifts</Tag>
<Tag variant="primary">Featured</Tag>
<Tag variant="accent">New</Tag>
```

### IconButton
Circular icon buttons with variants:
```jsx
import IconButton from '../ui/IconButton';

<IconButton 
  ariaLabel="Like"
  onClick={handleClick}
  variant="default"  // default | primary | accent
  size="default"     // default | small | large
>
  <YourIcon />
</IconButton>
```

### Typography
Semantic typography components:
```jsx
import { H1, Title, Body, Meta, Caption } from '../ui/Typography';

<H1>Main Heading</H1>
<Title>Section Title</Title>
<Body>Body text content</Body>
<Meta>Metadata text</Meta>
<Caption>Small caption text</Caption>
```

## 📦 Dependencies

Installed packages:
- ✅ `react-router-dom` - For routing between pages
- ✅ `react` 19.1.1
- ✅ `lucide-react` - For icons (already installed)

## 🎯 Key Features

### Home Page
- **Vertical scrolling feed** (Tinder/Bumble style but scrollable)
- **Photo cards** with gradient overlay
- **Name/age overlay** at bottom
- **Quick heartbeat action** (top-right icon)
- **Role/workplace pill** (top-left)
- **Tag chips** below photo
- **Filter chips** (For you, New, Nearby, On call now)
- **Filter button** (top-right)

### MatchProfile Page
- **Full-screen photo** with gradient
- **Curved action buttons** (right side, vertically stacked)
  - Heart icon (Like)
  - Heart + ECG icon (Heartbeat)
  - X icon (Pass)
- **Name/age/role overlay** on photo
- **About section** below photo
- **Highlights tags** section
- **Swipe hint** at bottom

## 🔧 Customization

### Modify Theme
Edit `src/ui/theme-variables.css` or `src/ui/Theme.jsx`:

```css
:root {
  --primary-solid: #YourColor;
  --radius-card: 16px;  /* Adjust corner radius */
  --shadow-card: 0 8px 20px rgba(0,0,0,0.1);
}
```

### Add More Profiles
Edit `src/pages/TestPagesDemo.jsx` or pass your own array:

```jsx
const myProfiles = [
  {
    id: 1,
    name: "Name",
    age: 28,
    role: "Role",
    workplace: "Hospital",
    location: "City, State",
    distance: "X km away",
    photoUrl: "url",
    tags: ["tag1", "tag2"],
    about: "Bio text...",
  },
  // ... more profiles
];
```

## ✅ Build Status

Build successful with **0 errors**:
- Bundle size: 318.00 KB (89.79 KB gzipped)
- Build time: ~13s
- All imports resolved correctly
- Theme system integrated

## 🔗 Integration with Main App

The new test environment is **completely isolated** from your main CodeBlue app:

### Main App (Unchanged)
- `src/CodeBlueDating.jsx` - Main app component
- `src/components/tabs/` - Production tabs
- `src/components/discover/` - Production components
- `src/components/navigation/` - Production navigation

### Test Environment (New)
- `src/pages/` - Test pages (Home, MatchProfile)
- `src/ui/` - UI component library
- No conflicts with production code

## 🚦 Quick Start Commands

```bash
# Install dependencies (if needed)
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview build
npm preview
```

## 📝 Notes

1. **Router vs Demo**: Choose between `App.jsx` (with routing) or `TestPagesDemo.jsx` (single component) based on your testing needs

2. **Production Independence**: All test code lives in `src/pages/` and `src/ui/` - your main app in `src/CodeBlueDating.jsx` remains untouched

3. **Theme Consistency**: Both environments use the same gunmetal navy design system for visual consistency

4. **Mobile-First**: All components are responsive and optimized for mobile viewports

5. **Accessibility**: Proper ARIA labels, semantic HTML, and keyboard navigation support included

## 🐛 Troubleshooting

**Build errors?**
- Ensure `react-router-dom` is installed: `npm install react-router-dom`
- Check all imports point to correct paths

**Styles not showing?**
- Verify `src/index.css` imports `./ui/theme-variables.css`
- Clear browser cache and restart dev server

**Components not found?**
- All UI components are in `src/ui/`
- All pages are in `src/pages/`
- Check import paths are correct

## 🎉 You're All Set!

The test environment is ready to use. Start with `TestPagesDemo.jsx` for the easiest testing experience, or dive into individual components for more control.

Happy coding! 💙
