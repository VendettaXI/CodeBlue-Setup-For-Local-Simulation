# Test Match Profile Design - Implementation Guide

**Created:** November 8, 2025  
**Status:** 🧪 Sandbox/Test Version  
**Purpose:** Preview new Discover page UI design without affecting production code

---

## 🎯 What Was Created

This is a **standalone test implementation** of a redesigned match profile screen based on the provided React Native design samples. All code is isolated and does not affect your current production Discover tab.

---

## 📁 Files Created

### 1. **Test Screen**
- `src/screens/TestMatchProfile.jsx` (Main test screen component)

### 2. **Test Components** (in `src/components/test/`)
- `TopTabSwitcher.jsx` - Animated pill-style tab switcher (Discover/Matches)
- `WaveTop.jsx` - SVG wave transition with ECG spike
- `HeartbeatIcon.jsx` - Animated heart with ECG pulse line
- `PulseButton.jsx` - Button with expanding pulse ring animation

### 3. **Main App Integration**
- Modified `src/CodeBlueDating.jsx` to add:
  - Lazy-loaded import for TestMatchProfile
  - New screen route: `currentScreen === 'test-match-profile'`
  - Developer menu item in Settings to access test screen

---

## 🚀 How to Access the Test Screen

### Method 1: Via Settings (Recommended)
1. Start your dev server: `npm run dev`
2. Open the app in browser
3. Navigate to: **Profile → Settings**
4. Scroll down to **"Developer"** section
5. Click **"🧪 Test New Discover Design"**
6. You'll see the new design with a yellow "TEST MODE" badge

### Method 2: Direct URL Access
You can also manually set the screen state in browser console:
```javascript
// In browser DevTools console:
window.location.reload(); // Then click through to Settings
```

---

## 🎨 Design Features Implemented

### ✅ Curved Wave Transition
- SVG wave with ECG-style spike on left edge
- Deeper right-side dip for visual interest
- Smooth transition between hero image and info card

### ✅ Name + Age on Image Only
- Profile name and age displayed directly on hero photo
- Removed occupation from image (cleaner, less CV-like)
- Text shadow for readability over photos

### ✅ Right-Side Thumb-Zone Actions
- Action buttons float on right side of image (not bottom)
- 3 buttons: Pass (X), Superlike (Heartbeat), Like (Heart)
- Positioned for easy one-handed thumb reach

### ✅ Animated Heartbeat Superlike
- Custom heartbeat icon with ECG pulse line inside heart
- CSS-based animation (converted from React Native Reanimated)
- Smooth pulse effect on loop

### ✅ Expanding Pulse Button
- PulseButton component with ring animation
- Scale bounce effect on press
- Expanding ring fades out radially

### ✅ Pill-Style Tab Switcher
- Light gunmetal background: `rgba(15,33,58,0.08)`
- Dark active tab: `#0F213A`
- Smooth sliding animation between Discover/Matches
- Icons: ECG wave for Discover, Heart for Matches

### ✅ Info Card Layout
- **About Section:** Bio text, tags (ICU Nurse, Empathetic, Dogs)
- **Prompt Cards:** Hinge-style question/answer format
- **Lifestyle Section:** Icon + label + value boxes in rows
  - Department, Hospital, Shift, Distance
  - Love Language, Pets, Smoking, Drinking, Spiritual
- **Looking For:** Pill-style preference chips

### ✅ Design System
- Colors: Gunmetal `#0F213A`, white cards, soft borders
- Medical + romantic aesthetic maintained
- Soft shadows, clean rounded corners (24px hero, 14px buttons)
- Clean typography hierarchy

---

## 🔧 Technical Implementation Notes

### React Native → React Web Conversion
All components were converted from React Native to web-compatible React:

1. **Animations:**
   - React Native Reanimated → CSS animations + transitions
   - `useSharedValue` → `useState` + CSS classes
   - `withTiming` → CSS `transition` properties

2. **Styling:**
   - React Native StyleSheet → Inline styles + Tailwind classes
   - `View` → `div`
   - `Text` → `span`/`p`/`h1-h6`
   - `Pressable` → `button`
   - `SafeAreaView` → `div` with proper styling

3. **SVG:**
   - `react-native-svg` → standard web `<svg>` elements
   - Same path data preserved for visual consistency

4. **Images:**
   - `<Image source={uri}>` → `<img src={url}>`
   - Same Unsplash photo used as sample

---

## 🛡️ Safety Features

### No Production Code Affected
- ✅ All new files in isolated directories (`test/`, `screens/`)
- ✅ Current DiscoverTab unchanged
- ✅ Existing components untouched
- ✅ No breaking changes to navigation or state management

### Easy to Remove
If you want to remove the test screen later:
```bash
# Delete test files
rm -rf src/components/test
rm src/screens/TestMatchProfile.jsx

# Remove from CodeBlueDating.jsx:
# 1. Import line for TestMatchProfile
# 2. Screen route (if currentScreen === 'test-match-profile')
# 3. Developer section in Settings
```

---

## 🔄 Next Steps

### If You Like the Design:
1. **Keep testing** - Try different screen sizes, dark mode, interactions
2. **Gather feedback** - Show to team/users
3. **Merge features** - Gradually integrate into production DiscoverTab:
   - Replace current PhotoCard with wave transition
   - Add heartbeat icon to action buttons
   - Update tab switcher component
   - Reorganize profile info layout

### If You Want Changes:
1. **Modify test files** - All in `src/components/test/` and `src/screens/TestMatchProfile.jsx`
2. **Iterate quickly** - Changes won't affect main app
3. **Compare side-by-side** - Keep old Discover tab for reference

### Integration Checklist (When Ready):
- [ ] Update `PhotoCard.jsx` with wave transition
- [ ] Create new `HeartbeatButton.jsx` for Superlike
- [ ] Replace top tab switcher in main app
- [ ] Update profile info layout in DiscoverTab
- [ ] Add lifestyle row components
- [ ] Test with real sample data
- [ ] QA across devices and browsers
- [ ] Update documentation

---

## 📊 File Size Impact

**New Files Added:**
- TestMatchProfile.jsx: ~9 KB
- TopTabSwitcher.jsx: ~2 KB  
- WaveTop.jsx: ~1 KB
- HeartbeatIcon.jsx: ~2 KB
- PulseButton.jsx: ~2 KB

**Total:** ~16 KB (lazy-loaded, won't affect main bundle)

**Modified Files:**
- CodeBlueDating.jsx: +~25 lines (import, route, menu item)

---

## 🐛 Known Limitations

1. **Sample Data Only:** Uses hardcoded profile data (not connected to app state)
2. **No Swipe Gestures:** Test screen focuses on layout, not interactions
3. **Single Profile:** Shows one profile (Sarah, 29) - not connected to discovery flow
4. **No Backend:** Like production app, this is frontend UI only

---

## 💡 Tips for Testing

1. **Responsive Testing:**
   - Resize browser window to test mobile sizes
   - Use DevTools device toolbar (iPhone 12 Pro, Pixel 5, etc.)

2. **Dark Mode:**
   - Test screen doesn't fully support dark mode yet
   - Can be added if needed

3. **Performance:**
   - Check animation smoothness
   - Inspect CSS animations in DevTools
   - Monitor frame rate during interactions

4. **Accessibility:**
   - Tab through with keyboard
   - Test with screen reader
   - Check color contrast ratios

---

## 📞 Support

If you encounter any issues or want to modify the design:
1. All test files are clearly marked with comments
2. File structure is simple and modular
3. Each component is self-contained
4. No dependencies on production code

**Happy testing!** 🎉

---

**Remember:** This is a sandbox environment. Feel free to experiment without fear of breaking the main app!
