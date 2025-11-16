# 🚨 CRITICAL: Which Files to Edit

## THE PROBLEM
The test environment and main app have IDENTICAL copies of components right now. You MUST edit the correct files or changes will leak!

---

## ✅ TO EDIT TEST ENVIRONMENT (Route: /dev)

**ONLY EDIT FILES IN `src/test-env/`**

### Test Environment Structure:
```
src/test-env/
├── pages/
│   └── DiscoverPage.jsx          ← EDIT THIS for test Discover page
├── components/                    ← EDIT THESE for test components  
│   ├── PulseAnswerModal.jsx
│   ├── PremiumUpsellModal.jsx
│   └── ...
└── utils/                         ← EDIT THESE for test utilities
    ├── inboxEvents.js
    ├── pulseStorage.js
    └── discoveryPersistence.js
```

### How Test Environment Works:
1. User visits `/dev` route
2. `src/main.jsx` loads `src/test-env/pages/TestPagesDemo.jsx`
3. TestPagesDemo renders `src/test-env/pages/DiscoverPage.jsx`
4. DiscoverPage imports from `src/test-env/components/`
5. Components import from `src/test-env/utils/`

**Everything stays in `src/test-env/` directory!**

---

## ✅ TO EDIT MAIN APP (Route: /)

**ONLY EDIT FILES IN `src/` (but NOT `src/test-env/`)**

### Main App Structure:
```
src/
├── CodeBlueDating.jsx             ← Main app entry point
├── components/
│   ├── tabs/
│   │   └── DiscoverTab.jsx        ← Main Discover tab
│   ├── PulseAnswerModal.jsx
│   └── ...
└── utils/
    ├── inboxEvents.js
    └── ...
```

### How Main App Works:
1. User visits `/` route
2. `src/main.jsx` loads `src/CodeBlueDating.jsx`
3. CodeBlueDating lazy loads `src/components/tabs/DiscoverTab.jsx`
4. DiscoverTab imports from `src/components/`
5. Components import from `src/utils/`

**Everything stays in `src/` directory (excluding `src/test-env/`)!**

---

## 🔴 COMMON MISTAKES

### ❌ WRONG: Editing main components thinking they're test
```bash
# This affects MAIN APP, not test!
nano src/components/tabs/DiscoverTab.jsx          # ❌ MAIN APP
nano src/components/PulseAnswerModal.jsx           # ❌ MAIN APP
```

### ✅ CORRECT: Editing test environment
```bash
# This affects TEST ENV only
nano src/test-env/pages/DiscoverPage.jsx          # ✅ TEST ENV
nano src/test-env/components/PulseAnswerModal.jsx # ✅ TEST ENV
```

---

## 🧪 HOW TO TEST YOUR CHANGES

### Test Environment Changes:
```bash
npm run dev
# Open browser to: http://localhost:5173/dev
# Check your changes in the test environment
```

### Main App Changes:
```bash
npm run dev
# Open browser to: http://localhost:5173/
# Check your changes in the main app
```

---

## 📋 FILE COMPARISON

| Feature | Main App File | Test Environment File |
|---------|--------------|----------------------|
| Discover View | `src/components/tabs/DiscoverTab.jsx` | `src/test-env/pages/DiscoverPage.jsx` |
| Pulse Modal | `src/components/PulseAnswerModal.jsx` | `src/test-env/components/PulseAnswerModal.jsx` |
| Utilities | `src/utils/*.js` | `src/test-env/utils/*.js` |

**Currently these files are IDENTICAL (copied on Nov 15, 10:08 AM)**

---

## 🎯 ISOLATION CHECK

Run this to verify isolation:
```bash
# Check if test imports from main (should be empty)
grep -r "from '../../" src/test-env/pages/
# Should show: from "../components/" (correct)

# Check if main imports from test (should be ONLY main.jsx)
grep -r "test-env" src/*.jsx src/components/
# Should show: ONLY src/main.jsx importing TestPagesDemo
```

---

## 💡 REMEMBER

- `/` route = Main App = `src/` files
- `/dev` route = Test Env = `src/test-env/` files
- They are COMPLETELY separate
- Changes in one DO NOT affect the other
- Always double-check which file you're editing!

