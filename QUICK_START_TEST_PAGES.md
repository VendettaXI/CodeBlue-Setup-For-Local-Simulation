# 🚀 Quick Start Guide - Test Pages

## TL;DR - Get Started in 30 Seconds

### Option 1: Demo Component (Easiest)
```jsx
// In main.jsx or any test file
import TestPagesDemo from './pages/TestPagesDemo';

root.render(<TestPagesDemo />);
```
✅ **What you get:**
- Home feed with 3 sample profiles
- Click any profile to see detail view
- Working heartbeat, like, and pass actions
- Back button to return to feed

### Option 2: Router (Multi-Page App)
```jsx
// In main.jsx or any test file
import App from './pages/App';

root.render(<App />);
```
✅ **Routes:**
- `/` - Home feed
- `/profile/:id` - Profile detail

---

## 📁 What Was Added

```
src/
├── ui/           # 6 reusable components (Card, Tag, IconButton, etc.)
├── pages/        # 4 pages (Home, MatchProfile, App, TestPagesDemo)
└── ... (main app unchanged)
```

**Total:** 22 new files, 0 conflicts with production code

---

## 🎨 UI Components Available

### Quick Import Reference
```jsx
import PageContainer from '../ui/PageContainer';
import Card from '../ui/Card';
import Tag from '../ui/Tag';
import IconButton from '../ui/IconButton';
import { H1, Title, Body } from '../ui/Typography';
```

### Component Examples
```jsx
// Card
<Card className="my-card">Content</Card>

// Tag
<Tag variant="default">Tag text</Tag>
<Tag variant="primary">Featured</Tag>
<Tag variant="accent">New</Tag>

// IconButton
<IconButton 
  ariaLabel="Like" 
  onClick={handleClick}
  variant="default"  // default | primary | accent
  size="default"     // small | default | large
>
  <YourIcon />
</IconButton>

// Typography
<H1>Main Heading</H1>
<Title>Section Title</Title>
<Body>Body text</Body>
```

---

## 🎯 Pages Overview

### Home Page
- Vertical scrolling feed (like Instagram/Twitter)
- Photo cards with gradient overlays
- Quick heartbeat action (top-right)
- Filter chips (For you, New, Nearby, On call now)
- Click card to view profile

### MatchProfile Page
- Full-screen photo with overlay
- Curved action buttons (right side):
  - ❤️ Like
  - 💓 Heartbeat
  - ❌ Pass
- About section
- Tags/highlights

---

## 🔧 Customize Sample Data

Edit `src/pages/TestPagesDemo.jsx`:

```jsx
const testProfiles = [
  {
    id: 1,
    name: "Your Name",
    age: 28,
    role: "Your Role",
    workplace: "Your Hospital",
    location: "City, State",
    distance: "X km away",
    photoUrl: "https://your-image-url.jpg",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    about: "Your bio text here...",
  },
  // Add more profiles...
];
```

---

## 🎨 Theme Customization

Edit `src/ui/theme-variables.css`:

```css
:root {
  --primary-solid: #0F213A;      /* Main color */
  --background: #FCF9F9;         /* Page background */
  --radius-card: 24px;           /* Card corners */
  --shadow-card: 0 18px 40px rgba(15,25,33,0.12);
}
```

---

## ✅ Build Status

```bash
✓ Build successful
✓ 0 errors, 0 warnings
✓ Bundle: 318.00 KB (89.79 kB gzipped)
✓ Dependencies: react-router-dom installed
✓ Production code: Untouched
```

---

## 📚 Full Documentation

- **TEST_PAGES_README.md** - Complete usage guide
- **TEST_PAGES_INTEGRATION_SUMMARY.md** - Integration details
- **PROJECT_STRUCTURE.md** - Full directory structure

---

## 🐛 Troubleshooting

**Nothing showing up?**
```jsx
// Make sure you're rendering the demo component
import TestPagesDemo from './pages/TestPagesDemo';
root.render(<TestPagesDemo />);
```

**Build errors?**
```bash
npm install react-router-dom
npm run build
```

**Styles not loading?**
- Check `src/index.css` imports `./ui/theme-variables.css`
- Clear cache and restart dev server

---

## 🎉 You're Ready!

1. Import `TestPagesDemo`
2. Render it
3. Open browser at `http://localhost:5173`
4. See your new pages in action!

**Need more help?** Check `TEST_PAGES_README.md` for detailed instructions.
