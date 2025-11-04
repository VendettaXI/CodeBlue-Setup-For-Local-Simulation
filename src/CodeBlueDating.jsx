/**
 * ============================================================================
 * CodeBlue Dating App - Main Component
 * ============================================================================
 * 
 * A premium dating app for healthcare professionals with Hinge/Bumble-level UI.
 * 
 * ARCHITECTURE:
 * - Single-file component (React hooks-based, no classes)
 * - 5 main tabs: Discover, Matches, Home, Connect, Vent
 * - Additional screens: Profile, EditProfile, Settings
 * - Dark mode support with localStorage persistence
 * - CSS-in-JS via injected style tag (see useCodeBlueTheme)
 * 
 * KEY FEATURES:
 * - Profile swiping with like/pass actions
 * - Match management and messaging
 * - Anonymous support rooms (Vent tab)
 * - Events and community features
 * - User achievements and statistics
 * - Premium subscription options
 * 
 * STATE MANAGEMENT:
 * - All state managed via React useState hooks
 * - No external state libraries (Redux/Zustand)
 * - Local storage for dark mode and user preferences
 * 
 * STYLING:
 * - TailwindCSS utility classes
 * - Custom CSS variables (--cb-* prefix)
 * - Inter font family from Google Fonts
 * - Glassmorphism and shadow effects
 * 
 * ICONS:
 * - Lucide React icon library (45+ icons imported)
 * 
 * EXPORTS:
 * - CodeBlueDating (default): Main component
 * - toggleCodeBlueTheme: Dark mode toggle utility
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Home, Users, Cloud, Shield, User, ChevronRight, X, Check, Send, MapPin, Briefcase, Clock, Zap, Lock, Star, Camera, Plus, AlertCircle, TrendingUp, Award, Bell, Settings, Filter, SlidersHorizontal, Sparkles, Coffee, Phone, Video, Image, Mic, MoreHorizontal, ThumbsUp, Share2, Bookmark, Eye, EyeOff, Globe, Calendar, Mail, Info, LogOut, Crown, Edit, BarChart3, Activity, Target, Flame, Trophy, Moon, Sun, Stethoscope, Building2 } from 'lucide-react';

// Component imports
import { ActionButtons } from './components/discover/ActionButtons';
import { PhotoCard } from './components/discover/PhotoCard';
import { ProfileHeader } from './components/discover/ProfileHeader';
import { InfoChips } from './components/discover/InfoChips';
import { PromptCard } from './components/discover/PromptCard';
import { VibeTagsList } from './components/discover/VibeTagsList';
import { DiscoverTab } from './components/tabs/DiscoverTab';
import { MatchesTab } from './components/tabs/MatchesTab';
import { HomeTab } from './components/tabs/HomeTab';
import { ConnectTab } from './components/tabs/ConnectTab';
import { VentTab } from './components/tabs/VentTab';

// Note: ActionTray component removed - action buttons are now componentized

/**
 * useCodeBlueTheme Hook
 * =====================
 * Injects Inter font and global CSS theme tokens into the document.
 * 
 * This hook dynamically creates and inserts:
 * 1. Google Fonts link for Inter font family
 * 2. Global CSS with custom properties and utility classes
 * 
 * CSS INJECTION APPROACH:
 * - Creates <link> element for fonts
 * - Creates <style> element with CSS variables and classes
 * - Only injects once (checks for existing elements by ID)
 * - Uses template literals for CSS content
 * 
 * CUSTOM PROPERTIES:
 * - --cb-bg, --cb-navy-deep, --cb-navy, --cb-navy-soft: Brand colors
 * - --cb-text, --cb-text-muted: Typography colors
 * - --cb-surface, --cb-surface-muted, --cb-border: UI surfaces
 * - --transition-fast/base/slow/springy: Animation timings
 * - --z-header/modal/dropdown/tooltip: Z-index layers
 * 
 * UTILITY CLASSES:
 * - .cb-wordmark-blue: Gradient text effect
 * - .cb-shadow-card: Card shadow
 * - .cb-glass: Glassmorphism effect
 * - .cb-chip-light: Light chip style
 * - .cb-reveal: Fade-up animation
 * - Typography: .cb-display, .cb-title, .cb-subtitle, .cb-body, .cb-meta
 * 
 * DARK MODE:
 * - Activated by adding .dark class to <html> element
 * - Overrides colors and shadows for dark theme
 */
function useCodeBlueTheme() {
  useEffect(() => {
    // Inter font
    if (!document.getElementById("inter-font-link")) {
      const link = document.createElement("link");
      link.id = "inter-font-link";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
    document.body.style.fontFamily =
      'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif';

    // Global CSS tokens (lavender base + navy gradient + shadows)
    if (!document.getElementById("cb-theme-style")) {
      const style = document.createElement("style");
      style.id = "cb-theme-style";
      style.innerHTML = `
        /* Typography refinements for premium spacing */
        html, body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        body { line-height: 1.5; letter-spacing: 0; font-feature-settings: 'liga' 1, 'kern' 1; }
        h1,h2,h3 { letter-spacing: -0.01em; }
        .cb-heading { letter-spacing: 0.04em; text-transform: uppercase; font-weight: 600; font-size: 0.875rem; }
        /* Typography hierarchy */
        .cb-display{ font-weight: 800; letter-spacing: -0.02em; line-height: 1.1; }
        .cb-title{ font-weight: 700; letter-spacing: -0.015em; }
        .cb-subtitle{ font-weight: 600; letter-spacing: -0.01em; }
        .cb-body{ font-weight: 500; letter-spacing: 0; }
        .cb-meta{ font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; font-size: 0.75rem; opacity:.75 }
        .cb-eyebrow{ font-weight:700; letter-spacing:.18em; text-transform:uppercase; font-size:.8rem; color: #6B7280; }

        /* Text shadow utilities for subtle depth */
        .cb-textshadow-sm{ text-shadow: 0 1px 1px rgba(16,24,40,.18); }
        .cb-textshadow{ text-shadow: 0 1px 2px rgba(16,24,40,.22); }
        .cb-textshadow-lg{ text-shadow: 0 2px 8px rgba(16,24,40,.22), 0 1px 2px rgba(16,24,40,.28); }
  /* Reveal animation */
  @keyframes cb-fade-up{ from{ opacity:0; transform:translateY(6px);} to{ opacity:1; transform:translateY(0);} }
  .cb-reveal{ animation: cb-fade-up var(--transition-base) both; }
  @media (prefers-reduced-motion: reduce){
    .cb-reveal{ animation: none !important; opacity: 1 !important; transform: none !important; }
  }
  /* A11y utility */
  .sr-only{ position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
        
        /* Enhanced Navigation Styling */
        .cb-nav-tabs {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(8px);
          border-radius: 9999px; /* Fully rounded pill */
          padding: 4px;
          display: inline-flex;
          gap: 4px;
          border: 1px solid rgba(0,0,0,0.1);
        }
        
        .cb-nav-tab {
          padding: 8px 16px;
          border-radius: 9999px; /* Fully rounded pill */
          font-weight: 600;
          transition: all 0.3s ease;
          position: relative;
          color: #666;
        }
        
        /* Active state defaults (fallback) */
        .cb-nav-tab.active {
          color: #fff;
          background: linear-gradient(135deg, #4ea5d9, #44cfcb);
          border: none;
          box-shadow: 0 4px 12px rgba(78,165,217,0.35), 0 2px 4px rgba(0,0,0,0.1);
        }

        /* Variant: Discover active */
        .cb-nav-tab.cb-nav-tab--discover.active{
          background: linear-gradient(135deg, #4ea5d9, #44cfcb); /* Picton → Robin egg */
        }

        /* Variant: Matches active */
        .cb-nav-tab.cb-nav-tab--matches.active{
          background: linear-gradient(135deg, #224870, #4ea5d9); /* Indigo dye → Picton */
          box-shadow: 0 4px 12px rgba(34,72,112,0.35), 0 2px 4px rgba(0,0,0,0.12);
        }
        
        /* Default hover (for Discover) */
        .cb-nav-tab.cb-nav-tab--discover:not(.active):hover {
          background: linear-gradient(135deg, #44cfcb, #4ea5d9); /* Robin egg blue to Picton Blue */
          color: #fff;
        }

        /* Variant hover for Matches - must be after default */
        .cb-nav-tab.cb-nav-tab--matches:not(.active):hover{
          background: linear-gradient(135deg, #224870, #4ea5d9); /* Indigo → Picton - same as active */
          color: #fff;
        }

        .cb-nav-tab:focus-visible{
          outline: 2px solid #4ea5d9;
          outline-offset: 2px;
        }
        
        .dark .cb-nav-tabs {
          background: rgba(30,30,40,0.8);
          border-color: rgba(255,255,255,0.1);
        }
        
        .dark .cb-nav-tab {
          color: #999;
        }
        
        .dark .cb-nav-tab.active {
          color: #fff;
          background: rgba(255,255,255,0.1);
        }

        :root{
          /* Colors */
          --cb-bg:#F8F7FB;
          --cb-navy-deep:#0F213A;
          --cb-navy:#14325A;
          --cb-navy-soft:#2A4F82;
          --cb-text:#111827;
          --cb-surface:#FFFFFF;
          --cb-surface-muted:#F8FAFC;
          --cb-border: rgba(15,23,42,.08);
          --cb-text-muted:#6B7280;
          
          /* Z-index layers */
          --z-header: 30;
          --z-modal: 50;
          --z-dropdown: 40;
          --z-tooltip: 60;
          
          /* Transitions */
          /* Transitions */
          --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
          --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
          --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
          --transition-springy: 500ms cubic-bezier(0.5, 0, 0.5, 1.5);
          
          /* Animations */
          --scale-hover: scale(1.05);
          --scale-press: scale(0.98);
        }
        html,body{ 
          background:var(--cb-bg); 
          color:var(--cb-text); 
          transition: background-color var(--transition-base), color var(--transition-base);
        }
        .cb-wordmark-blue{
          background:linear-gradient(90deg,var(--cb-navy-deep),var(--cb-navy),var(--cb-navy-soft));
          -webkit-background-clip:text; background-clip:text; color:transparent;
        }
        .cb-shadow-card{ box-shadow:0 1px 2px rgba(16,24,40,.06), 0 8px 24px -8px rgba(16,24,40,.08); }
        .cb-chip{ backdrop-filter:blur(8px); background:rgba(255,255,255,.2); color:#fff }
  .cb-divider{ border-top:1px solid var(--cb-border); }
        /* Optional dark mode (toggle by adding/removing .dark on <html>) */
        html.dark, .dark body{ background:#0F213A; color:#E5E7EB; }
        .dark .cb-wordmark-blue{
          background:linear-gradient(90deg,#0066FF,#7C3AED,#A855F7);
          -webkit-background-clip:text; background-clip:text; color:transparent;
        }
        .dark .cb-shadow-card{ box-shadow:0 1px 2px rgba(0,0,0,.35), 0 8px 24px -8px rgba(0,0,0,.5); }
        
        /* Dark mode color overrides */
        .dark {
          --cb-bg: #0F213A;
          --cb-text: #E5E7EB;
          --cb-text-muted: #9CA3AF;
          --cb-surface: #1E293B;
          --cb-surface-muted: #334155;
          --cb-border: rgba(255,255,255,0.1);
        }
        
        /* Dark mode component overrides */
        .dark .cb-card {
          background: var(--cb-surface);
          border-color: var(--cb-border);
        }
        .dark .cb-chip-light {
          background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.05));
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 1px 0 rgba(255,255,255,0.05) inset, 0 6px 16px -8px rgba(0,0,0,0.3);
        }
        .dark .cb-chip-light:hover {
          box-shadow: 0 1px 0 rgba(255,255,255,0.08) inset, 0 8px 22px -8px rgba(0,0,0,0.4);
        }
        .dark .cb-eyebrow {
          color: #9CA3AF;
        }

        .cb-glass {
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          background: rgba(255,255,255,0.25);
          border: 1px solid rgba(255,255,255,0.4);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        .cb-glass:hover {
          background: rgba(255,255,255,0.35);
          box-shadow: 0 6px 25px rgba(0,0,0,0.25);
        }
        .dark .cb-glass {
          background: rgba(30,30,40,0.4);
          border-color: rgba(255,255,255,0.2);
          box-shadow: 0 6px 25px rgba(0,0,0,0.5);
        }
  /* Info chip for light cards (uniform, Hinge-like) */
  .cb-chip-light{ background:linear-gradient(180deg,var(--cb-surface), var(--cb-surface-muted)); border:1px solid var(--cb-border); box-shadow: 0 1px 0 rgba(255,255,255,.7) inset, 0 6px 16px -8px rgba(15,23,42,.15); }
    .cb-chip-light:hover{ box-shadow: 0 1px 0 rgba(255,255,255,.7) inset, 0 8px 22px -8px rgba(15,23,42,.28); }
    /* Neutral card surface */
    .cb-card{ background:var(--cb-surface); border:1px solid var(--cb-border); }
              `;
      document.head.appendChild(style);
    }
  }, []);
}

/**
 * ============================================================================
 * CodeBlueDating Component (Main App)
 * ============================================================================
 * 
 * Root component that manages the entire dating app experience.
 * 
 * SCREEN HIERARCHY:
 * - 'splash': Initial landing screen with branding
 * - 'main': Primary app with 5 tabs (discover, matches, home, connect, vent)
 * - 'profile': View user profile details
 * - 'edit-profile': Edit your own profile
 * - 'settings': App settings and preferences
 * 
 * STATE ARCHITECTURE:
 * This component uses 20+ useState hooks organized into logical groups:
 * 
 * 1. THEME & APPEARANCE
 *    - darkMode: Boolean for dark/light theme
 *    - toggleDarkMode(): Function to switch themes
 * 
 * 2. NAVIGATION
 *    - currentScreen: Which top-level screen is active
 *    - activeTab: Which tab in main screen (discover, matches, home, connect, vent)
 *    - currentMatch: Index of currently displayed profile in Discover
 *    - selectedMatch: Which match conversation is open
 *    - ventRoom: Which vent support room is active
 * 
 * 3. USER PROFILE DATA
 *    - userProfile: Current user's complete profile object
 *    - profilePhotos: Array of up to 6 photo slots
 *    - bio: User bio text
 *    - selectedPrompts: User's prompt responses
 *    - myVibe: Array of selected vibe tags
 *    - dealbreakers: Array of selected dealbreaker tags
 * 
 * 4. UI STATES
 *    - activePrompt: Which prompt is being displayed in swipe view
 *    - showFilters: Discovery filters modal visibility
 *    - editSection: Which profile edit section is active
 * 
 * 5. SETTINGS & PREFERENCES
 *    - Privacy: showLastActive, pauseProfile, enableDiscovery
 *    - Messaging: readReceipts
 *    - Discovery: showDistance, maxDistance, ageRange
 *    - Notifications: pushNotifications, emailNotifications
 * 
 * 6. DATA CONSTANTS (see below for full data structures)
 *    - sampleProfiles: Array of profiles for Discover swiping
 *    - myMatches: Array of matched users with messages
 *    - whoLikesYou: Array of users who liked you (premium feature)
 *    - ventTopics: Array of anonymous support room categories
 *    - events: Array of community events
 *    - achievements: User achievement badges
 * 
 * DESIGN PHILOSOPHY:
 * - Premium feel with subtle animations and glassmorphism
 * - Hinge/Bumble-inspired card-based layouts
 * - Healthcare-focused features (shift scheduling, hospital search)
 * - Mental health support via anonymous Vent rooms
 * - Professional networking integrated with dating
 */
const CodeBlueDating = () => {
  // ========================================================================
  // THEME INITIALIZATION
  // ========================================================================
  useCodeBlueTheme();
  
  // ========================================================================
  // DARK MODE STATE & MANAGEMENT
  // ========================================================================
  
  // Dark mode state - initialized from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Toggle dark mode and persist to localStorage
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  // Detect system theme preference on first load if no user preference saved
  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (!stored) {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', prefersDark);
        localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
        setDarkMode(prefersDark);
      }
    } catch {}
  }, []);

  // Apply dark mode class to HTML element whenever darkMode changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);
  
  // ========================================================================
  // NAVIGATION STATE
  // ========================================================================
  
  // Controls which top-level screen is displayed
  // Values: 'splash' | 'main' | 'profile' | 'edit-profile' | 'settings'
  const [currentScreen, setCurrentScreen] = useState('splash');
  
  // ========================================================================
  // USER PROFILE STATE
  // ========================================================================
  
  // Current user's complete profile data
  const [userProfile, setUserProfile] = useState({
    name: 'Venice Dawn',
    role: 'Registered Nurse',
    profileComplete: 75,
    location: 'London, UK',
    age: 24,
    photos: ['👩‍⚕️', '🌙', '☕', '📚'],
    bio: "Registered Nurse passionate about emergency care and animal welfare. Coffee enthusiast, yoga lover, and believer in work-life balance.",
    prompts: [],
    myVibe: [],
    dealbreakers: []
  });
  
  // ========================================================================
  // TAB & NAVIGATION STATE (Main Screen)
  // ========================================================================
  
  // Which tab is active in the main screen
  // Values: 'discover' | 'matches' | 'home' | 'connect' | 'vent'
  const [activeTab, setActiveTab] = useState('discover');
  
  // Index of currently displayed profile in Discover swipe view
  const [currentMatch, setCurrentMatch] = useState(0);
  
  // Selected match for viewing conversation (null when no conversation open)
  const [selectedMatch, setSelectedMatch] = useState(null);
  
  // Active vent room for anonymous support (null when not in a room)
  const [ventRoom, setVentRoom] = useState(null);
  
  // Which prompt is being shown in Discover card view
  const [activePrompt, setActivePrompt] = useState(0);
  
  // Track image load errors for fallback to emoji
  const [imageErrors, setImageErrors] = useState({});
  
  // Discovery filters modal visibility
  const [showFilters, setShowFilters] = useState(false);

  // ========================================================================
  // PROMPT INTERACTIONS STATE (Likes & Comments) with persistence
  // ========================================================================

  const [likedPrompts, setLikedPrompts] = useState(() => {
    try {
      const raw = localStorage.getItem('likedPrompts');
      const arr = raw ? JSON.parse(raw) : [];
      return new Set(arr);
    } catch {
      return new Set();
    }
  });

  const [promptComments, setPromptComments] = useState(() => {
    try {
      const raw = localStorage.getItem('promptComments');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const togglePromptLike = (key) => {
    setLikedPrompts(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      try { localStorage.setItem('likedPrompts', JSON.stringify([...next])); } catch {}
      return next;
    });
  };

  const addPromptComment = (key, text) => {
    setPromptComments(prev => {
      const existing = prev[key] || [];
      const next = { ...prev, [key]: [...existing, { text, ts: Date.now() }] };
      try { localStorage.setItem('promptComments', JSON.stringify(next)); } catch {}
      return next;
    });
  };

  // ========================================================================
  // SETTINGS STATE
  // ========================================================================
  
  // Privacy Settings
  const [showLastActive, setShowLastActive] = useState(true);  // Show "Active 2h ago" status
  const [pauseProfile, setPauseProfile] = useState(false);     // Temporarily hide profile from discovery
  const [enableDiscovery, setEnableDiscovery] = useState(true); // Allow others to discover your profile
  
  // Messaging Settings
  const [readReceipts, setReadReceipts] = useState(true);      // Send read receipts in messages
  
  // Discovery Preferences
  const [showDistance, setShowDistance] = useState(true);      // Show distance on profiles
  const [maxDistance, setMaxDistance] = useState(50);          // Maximum distance for discovery (in miles/km)
  const [ageRange, setAgeRange] = useState([25, 45]);          // Age range for discovery [min, max]
  
  // Notification Settings
  const [pushNotifications, setPushNotifications] = useState(true);  // Enable push notifications
  const [emailNotifications, setEmailNotifications] = useState(true); // Enable email notifications

  // ========================================================================
  // EDIT PROFILE STATE
  // ========================================================================
  
  // Which profile editing section is active
  // Values: null | 'photos' | 'info' | 'prompts' | 'vibe' | 'preview'
  const [editSection, setEditSection] = useState(null);
  
  // Profile photos array (up to 6 slots, empty string for unused slots)
  const [profilePhotos, setProfilePhotos] = useState(['👩‍⚕️', '🌙', '☕', '📚', '', '']);
  
  // User bio text
  const [bio, setBio] = useState("Registered Nurse passionate about emergency care and animal welfare. Coffee enthusiast, yoga lover, and believer in work-life balance.");
  
  // Selected prompt responses (array of objects with question, answer, type)
  const [selectedPrompts, setSelectedPrompts] = useState([
    { id: 1, question: "Typical Sunday", answer: "Helping walk the older pups at the shelter.", type: "text" },
    { id: 2, question: "I'm looking for", answer: "Someone who understands that 3am coffee dates might be our normal.", type: "text" },
    { id: 3, question: "Green flag I look for", answer: "Makes me laugh even when I'm exhausted.", type: "text" }
  ]);
  const [selectedVibe, setSelectedVibe] = useState(["Coffee", "Yoga", "Animal Welfare", "Reading"]);
  const [dealbreakers, setDealbreakers] = useState(["Smoking"]);

  // ========================================================================
  // DATA CONSTANTS - PROMPTS & VIBES
  // ========================================================================
  
  // Available prompt questions for profile creation
  // Users can select from these to showcase their personality
  const allPrompts = [
    "Typical Sunday", "I'm looking for", "Green flag I look for", "My ideal date",
    "I geek out on", "We'll get along if", "My simple pleasures", "Two truths and a lie",
    "Best travel story", "My therapy is", "I'm weirdly attracted to", "Change my mind about",
    "Biggest dating red flag", "Most spontaneous thing I've done", "I know the best spot for",
    "The key to my heart is", "I'm overly competitive about", "A life goal of mine",
    "I want someone who", "Give me travel tips for", "The way to win me over is",
    "My most controversial opinion", "I recently discovered", "Together we could",
    "My greatest strength", "I'll know I've met the one when", "My love language is",
    "I'm the type of texter who", "After work you'll find me", "A perfect day includes"
  ];

  // Vibe categories for profile self-expression
  // Organized by category with multiple options per category
  // Users can select multiple vibes to showcase interests and lifestyle
  const vibeCategories = {
    "Wellness": ["Yoga", "Meditation", "Running", "Gym", "Cycling", "Swimming", "Hiking", "Dance"],
    "Food & Drink": ["Coffee", "Cooking", "Wine Tasting", "Baking", "Foodie Adventures", "Tea", "Craft Beer"],
    "Creative": ["Photography", "Painting", "Writing", "Music", "Singing", "Playing Instruments", "Drawing"],
    "Social": ["Concerts", "Theater", "Museums", "Travel", "Volunteering", "Board Games", "Karaoke"],
    "Relaxation": ["Reading", "Movies", "TV Shows", "Podcasts", "Gaming", "Netflix", "Spa Days"],
    "Nature": ["Camping", "Gardening", "Beach", "Stargazing", "Animal Welfare", "Nature Walks"],
    "Learning": ["Language Learning", "DIY Projects", "Astronomy", "History", "Science", "Philosophy"]
  };
  
  // ========================================================================
  // DATA CONSTANTS - SAMPLE PROFILES (Discover Tab)
  // ========================================================================
  
  /**
   * Sample profiles for the Discover/swipe feature.
   * Each profile contains:
   * - id: Unique identifier
   * - name: User's first name
   * - age: User's age
   * - role: Healthcare professional role
   * - hospital: Workplace
   * - distance: Distance in km
   * - photos: Array of photo objects with {url, alt, emoji} - emoji is fallback
   * - prompts: Array of prompt responses {question, answer, type}
   * - verified: Boolean for verification status
   * - vibe: Array of interest tags
   */
const sampleProfiles = [
    {
      id: 1,
      name: "Sarah",
      age: 29,
      role: "Registered Nurse",
      specialty: "Emergency Department",
      hospital: "Royal London Hospital",
      shift: "Night Shift",
      distance: "2 miles away",
      photos: [
        { url: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&h=1000&fit=crop", alt: "Sarah smiling in scrubs", emoji: "👩‍⚕️" },
        { url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=1000&fit=crop", alt: "Sarah with her dog at night", emoji: "🌙" },
        { url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=1000&fit=crop", alt: "Sarah enjoying coffee", emoji: "☕" },
        { url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=1000&fit=crop", alt: "Sarah reading a book", emoji: "📚" }
      ],
      verified: true,
      recentlyActive: true,
      responseRate: "Usually responds in 2 hours",
      prompts: [
        { question: "Typical Sunday", answer: "Helping walk the older pups at the shelter. There's something therapeutic about their wagging tails after a tough week.", type: "text", likes: 12 },
        { question: "I'm looking for", answer: "Someone who understands that 3am coffee dates might be our normal, and that's perfectly okay.", type: "text", likes: 24 },
        { question: "Green flag I look for", answer: "Makes me laugh even when I'm exhausted from a 12-hour shift.", type: "text", likes: 18 },
        { question: "Voice note: My ideal date", answer: "Listen to my idea...", type: "voice", duration: "0:45", likes: 31 }
      ],
      myVibe: ["Coffee", "Yoga", "Animal Welfare", "Reading"],
      dealbreakers: ["Smoking"],
      shiftCompatibility: 95,
      commonInterests: 3,
      mutualConnections: 2
    },
    {
      id: 2,
      name: "James",
      age: 32,
      role: "Junior Doctor",
      specialty: "Cardiology",
      hospital: "St Thomas Hospital",
      shift: "Rotating Shifts",
      distance: "5 miles away",
      photos: [
        { url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=1000&fit=crop", alt: "James in white coat", emoji: "👨‍⚕️" },
        { url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=1000&fit=crop", alt: "James running outdoors", emoji: "🏃" },
        { url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=1000&fit=crop", alt: "James traveling", emoji: "✈️" },
        { url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=1000&fit=crop", alt: "James cooking", emoji: "🍳" }
      ],
      verified: true,
      recentlyActive: false,
      responseRate: "Usually responds in 1 day",
      prompts: [
        { question: "My simple pleasures", answer: "Early morning runs before the city wakes up. That quiet time keeps me sane.", type: "text", likes: 15 },
        { question: "We'll get along if", answer: "You can appreciate both spontaneous adventures and lazy Sunday brunches.", type: "text", likes: 28 },
        { question: "I geek out on", answer: "Trying to recreate restaurant dishes at home. My kitchen experiments are 50/50 success rate.", type: "text", likes: 22 },
        { question: "Ideal date", answer: "Exploring a new part of London, finding a hidden café, and talking for hours.", type: "text", likes: 19 }
      ],
      myVibe: ["Running", "Travel", "Cooking", "Photography"],
      dealbreakers: [],
      shiftCompatibility: 78,
      commonInterests: 1,
      mutualConnections: 0
    }
  ];

  // ========================================================================
  // DATA CONSTANTS - MATCHES & CONNECTIONS
  // ========================================================================
  
  /**
   * My Matches - Active conversations with matched users
   * Each match contains:
   * - id, name, role, photo: Basic profile info
   * - lastMessage: Last message in conversation
   * - unread: Boolean for unread status
   * - time: Relative time of last message
   * - online: Boolean for online status
   * - yourTurn: Boolean indicating if it's your turn to respond
   */
  const myMatches = [
    { id: 1, name: "Emma", role: "Paramedic", photo: "👩‍⚕️", lastMessage: "See you Friday! 😊", unread: false, time: "2h ago", online: true, yourTurn: false },
    { id: 2, name: "Alex", role: "Nurse", photo: "👨‍⚕️", lastMessage: "How was your shift?", unread: true, time: "5m ago", online: true, yourTurn: true },
    { id: 3, name: "Maya", role: "Doctor", photo: "👩‍⚕️", lastMessage: "That sounds amazing!", unread: false, time: "1d ago", online: false, yourTurn: false }
  ];

  /**
   * Who Likes You - Users who have liked your profile (Premium feature)
   * Blurred until user upgrades to premium subscription
   * Each entry contains:
   * - name, role, photo: Basic profile info
   * - preview: Snippet of their like/comment
   * - compatibility: Percentage match score (algorithm-based)
   */
  const whoLikesYou = [
    { name: "David", role: "Surgeon", photo: "👨‍⚕️", preview: "Loved your answer about...", compatibility: 92 },
    { name: "Lisa", role: "Pharmacist", photo: "👩‍⚕️", preview: "100% yes. I'm in.", compatibility: 88 },
    { name: "Tom", role: "Paramedic", photo: "👨‍⚕️", preview: "We should grab coffee...", compatibility: 85 }
  ];

  // ========================================================================
  // DATA CONSTANTS - VENT SUPPORT ROOMS
  // ========================================================================
  
  /**
   * Vent Topics - Anonymous support rooms for mental health
   * Healthcare-specific categories for processing difficult experiences
   * Each topic includes:
   * - id, name, description: Room identification
   * - icon: Emoji representation
   * - active: Number of currently active users
   * - gradient: Tailwind gradient classes for visual distinction
   * - trending: Boolean for trending badge
   */
  const ventTopics = [
    { id: 1, name: "Shift Burnout", description: "Share your exhaustion with others who get it", icon: "😮‍💨", active: 12, gradient: "from-orange-400 to-red-500", trending: true },
    { id: 2, name: "Difficult Cases", description: "Process challenging situations safely", icon: "💭", active: 8, gradient: "from-blue-700 to-blue-900", trending: false },
    { id: 3, name: "Loss & Grief", description: "A compassionate space for processing loss", icon: "🕊️", active: 5, gradient: "from-blue-400 to-blue-600", trending: false },
    { id: 4, name: "Team Dynamics", description: "Navigate workplace relationships and stress", icon: "👥", active: 15, gradient: "from-green-500 to-emerald-600", trending: true }
  ];

  // ========================================================================
  // DATA CONSTANTS - COMMUNITY & EVENTS
  // ========================================================================
  
  /**
   * Events - Community events for healthcare professionals
   * Facilitates in-person meetups and networking
   * Each event includes:
   * - id, title, date, time, location: Event details
   * - attendees: Total number of people attending
   * - going: Number of mutual connections attending
   * - image: Emoji placeholder for event image
   * - category: Event type (Wellness, Support, Social, etc.)
   */
  const events = [
    { id: 1, title: "Healthcare Workers Yoga & Brunch", date: "Nov 2", time: "10:00 AM", location: "Hyde Park", attendees: 24, going: 3, image: "🧘", category: "Wellness" },
    { id: 2, title: "Mental Health Support Circle", date: "Nov 5", time: "7:00 PM", location: "Online", attendees: 45, going: 8, image: "🧠", category: "Support" },
    { id: 3, title: "Night Shift Coffee Meetup", date: "Nov 8", time: "11:00 PM", location: "Shoreditch", attendees: 18, going: 2, image: "☕", category: "Social" }
  ];

  // ========================================================================
  // DATA CONSTANTS - USER ANALYTICS & GAMIFICATION
  // ========================================================================
  
  /**
   * Daily Insights - Quick stats shown on Home tab
   * Provides engagement metrics and personalized tips
   */
  const dailyInsights = {
    profileViews: 23,
    newLikes: 5,
    compatibility: "95% with Sarah",
    tip: "Complete your voice prompt to get 2x more matches!"
  };

  /**
   * Achievements - Gamification badges to encourage engagement
   * Each achievement includes:
   * - id, name, icon, description: Badge details
   * - unlocked: Boolean indicating if user has earned it
   */
  const achievements = [
    { id: 1, name: "First Match", icon: "💙", unlocked: true, description: "Made your first connection" },
    { id: 2, name: "Verified Hero", icon: "✅", unlocked: true, description: "Completed NHS verification" },
    { id: 3, name: "Night Owl", icon: "🌙", unlocked: true, description: "Active during night shifts" },
    { id: 4, name: "100 Likes", icon: "💯", unlocked: false, description: "Receive 100 profile likes" },
    { id: 5, name: "Social Butterfly", icon: "🦋", unlocked: false, description: "Attend 5 community events" },
    { id: 6, name: "Conversation Starter", icon: "💬", unlocked: true, description: "Send 50 messages" }
  ];

  /**
   * Weekly Activity - Chart data for profile engagement
   * Shows daily views and likes for the past week
   * Used to visualize profile performance trends
   */
  const weeklyActivity = [
    { day: "Mon", views: 15, likes: 3 },
    { day: "Tue", views: 23, likes: 5 },
    { day: "Wed", views: 18, likes: 2 },
    { day: "Thu", views: 31, likes: 7 },
    { day: "Fri", views: 28, likes: 4 },
    { day: "Sat", views: 12, likes: 1 },
    { day: "Sun", views: 20, likes: 3 }
  ];

  // ========================================================================
  // UTILITY COMPONENTS
  // ========================================================================
  
  /**
   * ToggleSwitch Component
   * Reusable iOS-style toggle switch for settings
   * Props:
   * - enabled: Boolean state
   * - onChange: Callback function when toggled
   */
  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-[var(--cb-navy)]' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  /**
   * SettingItem Component
   * Reusable row component for settings screens
   * Props:
   * - icon: Lucide React icon component
   * - label: Main text label
   * - description: Optional secondary text
   * - action: Right-side action element (toggle, button, etc.)
   * - showChevron: Boolean to show/hide chevron icon
   * - onClick: Optional click handler
   */
  const SettingItem = ({ icon: Icon, label, description, action, showChevron = true, onClick }) => (
    <div 
      onClick={onClick}
      className={`flex items-center justify-between py-4 border-b border-gray-100 ${onClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
    >
      <div className="flex items-center gap-4">
        <Icon className="w-6 h-6 text-gray-600" />
        <div>
          <p className="font-semibold text-gray-900">{label}</p>
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {action}
        {showChevron && <ChevronRight className="w-5 h-5 text-gray-400" />}
      </div>
    </div>
  );

  /**
   * Section Component
   * Reusable section container for settings
   * Props:
   * - title: Section header text
   * - children: Content to render inside section
   */
  const Section = ({ title, children }) => (
    <div className="mb-6">
      <h2 className="cb-eyebrow mb-3 px-5">
        {title}
      </h2>
      <div className="cb-card rounded-lg px-5 cb-shadow-card">
        {children}
      </div>
    </div>
  );

  // EDIT PROFILE SCREEN
  if (currentScreen === 'edit-profile') {
    return (
      <div className="min-h-screen bg-[#F8F7FB]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950 text-white px-5 py-4 sticky top-0 z-20">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <button 
              onClick={() => {
                setCurrentScreen('profile');
                setEditSection(null);
              }}
              className="flex items-center gap-1 font-semibold"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
            <h1 className="text-lg font-bold">Edit Profile</h1>
            <button 
              onClick={() => {
                setCurrentScreen('profile');
                setEditSection(null);
              }}
              className="font-bold text-green-400"
            >
              Done
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-5 py-6 pb-24">
          {/* Profile Completion */}
          <div className="bg-white rounded-2xl cb-shadow-card p-5 mb-6 cb-shadow-card">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Profile Strength</h3>
                <p className="text-sm text-gray-600">{userProfile.profileComplete}% Complete</p>
              </div>
              <div className="text-3xl">
                {userProfile.profileComplete === 100 ? '🎉' : '💪'}
              </div>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-full transition-all duration-500"
                style={{width: `${userProfile.profileComplete}%`}}
              ></div>
            </div>
            {userProfile.profileComplete < 100 && (
              <p className="text-xs text-gray-500 mt-2">Complete all sections to get 5x more matches!</p>
            )}
          </div>

          {/* Quick Preview */}
          <button 
            onClick={() => setEditSection('preview')}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-5 mb-6 cb-shadow-card hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye className="w-6 h-6" />
                <div className="text-left">
                  <h3 className="font-bold">Preview Profile</h3>
                  <p className="text-sm opacity-90">See how others see you</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6" />
            </div>
          </button>

          {/* Edit Sections - Clean Professional Style */}
          <div className="bg-white rounded-2xl cb-shadow-card overflow-hidden cb-shadow-card">
            {/* Photos */}
            <button 
              onClick={() => setEditSection('photos')}
              className="w-full p-5 hover:bg-gray-50 transition-all text-left border-b border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Camera className="w-6 h-6 text-gray-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Photos</h3>
                    <p className="text-sm text-gray-500">{profilePhotos.filter(p => p).length} of 6 added</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            {/* Basic Info */}
            <button 
              onClick={() => setEditSection('info')}
              className="w-full p-5 hover:bg-gray-50 transition-all text-left border-b border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <User className="w-6 h-6 text-gray-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Basic Info</h3>
                    <p className="text-sm text-gray-500">Name, bio, role, location</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            {/* Prompts */}
            <button 
              onClick={() => setEditSection('prompts')}
              className="w-full p-5 hover:bg-gray-50 transition-all text-left border-b border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <MessageCircle className="w-6 h-6 text-gray-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Prompts</h3>
                    <p className="text-sm text-gray-500">{selectedPrompts.length} prompts added</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            {/* My Vibe */}
            <button 
              onClick={() => setEditSection('vibe')}
              className="w-full p-5 hover:bg-gray-50 transition-all text-left border-b border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Sparkles className="w-6 h-6 text-gray-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">My Vibe</h3>
                    <p className="text-sm text-gray-500">{selectedVibe.length} interests selected</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            {/* Relationship Goals */}
            <button 
              onClick={() => setEditSection('goals')}
              className="w-full p-5 hover:bg-gray-50 transition-all text-left border-b border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Heart className="w-6 h-6 text-gray-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Looking For</h3>
                    <p className="text-sm text-gray-500">Long-term, open to short</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            {/* Communication Style */}
            <button 
              onClick={() => setEditSection('communication')}
              className="w-full p-5 hover:bg-gray-50 transition-all text-left border-b border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <MessageCircle className="w-6 h-6 text-gray-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Communication Style</h3>
                    <p className="text-sm text-gray-500">Empty</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            {/* Education */}
            <button 
              onClick={() => setEditSection('education')}
              className="w-full p-5 hover:bg-gray-50 transition-all text-left border-b border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Award className="w-6 h-6 text-gray-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Education</h3>
                    <p className="text-sm text-gray-500">Empty</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            {/* Dealbreakers */}
            <button 
              onClick={() => setEditSection('dealbreakers')}
              className="w-full p-5 hover:bg-gray-50 transition-all text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <AlertCircle className="w-6 h-6 text-gray-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Dealbreakers</h3>
                    <p className="text-sm text-gray-500">{dealbreakers.length} dealbreaker{dealbreakers.length !== 1 ? 's' : ''} set</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          </div>

          {/* Edit Section Modals */}
          {editSection === 'photos' && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4">
              <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto cb-shadow-card">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
                  <h2 className="text-xl font-bold text-gray-900">Manage Photos</h2>
                  <button onClick={() => setEditSection(null)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Camera className="w-5 h-5 text-blue-700 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p className="font-semibold mb-1">Photo Tips:</p>
                        <ul className="space-y-1">
                          <li>• Add 4-6 photos for best results</li>
                          <li>• Include at least one clear face photo</li>
                          <li>• Show your hobbies and personality</li>
                          <li>• Avoid group photos as primary</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {profilePhotos.map((photo, idx) => (
                      <div key={idx} className="relative aspect-square">
                        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-6xl border-2 border-gray-200 relative overflow-hidden group">
                          {photo ? (
                            <>
                              {photo}
                              <button 
                                onClick={() => {
                                  const newPhotos = [...profilePhotos];
                                  newPhotos[idx] = '';
                                  setProfilePhotos(newPhotos);
                                }}
                                className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-5 h-5 text-white" />
                              </button>
                              {idx === 0 && (
                                <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-lg text-xs font-bold">
                                  Primary
                                </div>
                              )}
                            </>
                          ) : (
                            <button className="w-full h-full flex flex-col items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                              <Plus className="w-8 h-8 text-gray-400" />
                              <span className="text-xs font-semibold text-gray-500">Add Photo</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setEditSection(null)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-indigo-500 dark:to-fuchsia-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {editSection === 'info' && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4">
              <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto cb-shadow-card">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
                  <h2 className="text-xl font-bold text-gray-900">Basic Info</h2>
                  <button onClick={() => setEditSection(null)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      defaultValue="Venice"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Age</label>
                    <input 
                      type="number" 
                      defaultValue="24"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">About Me</label>
                    <textarea 
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      maxLength={500}
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-gray-900 resize-none"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-gray-500">Write a bio that shows your personality</p>
                      <p className="text-xs text-gray-500">{bio.length}/500</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Role</label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-gray-900">
                      <option>Registered Nurse</option>
                      <option>Junior Doctor</option>
                      <option>Senior Doctor</option>
                      <option>Consultant</option>
                      <option>Surgeon</option>
                      <option>Paramedic</option>
                      <option>Pharmacist</option>
                      <option>Therapist</option>
                      <option>Healthcare Assistant</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Specialty</label>
                    <input 
                      type="text" 
                      defaultValue="Emergency Department"
                      placeholder="e.g., Emergency, Cardiology, Pediatrics"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Hospital/Trust</label>
                    <input 
                      type="text" 
                      defaultValue="Royal London Hospital"
                      placeholder="Where do you work?"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Typical Shift</label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-gray-900">
                      <option>Day Shift</option>
                      <option>Night Shift</option>
                      <option>Rotating Shifts</option>
                      <option>On-Call</option>
                      <option>Flexible Hours</option>
                    </select>
                  </div>

                  <button 
                    onClick={() => setEditSection(null)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-indigo-500 dark:to-fuchsia-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {editSection === 'prompts' && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4">
              <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto cb-shadow-card">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
                  <h2 className="text-xl font-bold text-gray-900">Edit Prompts</h2>
                  <button onClick={() => setEditSection(null)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-purple-700 mt-0.5" />
                      <div className="text-sm text-purple-800">
                        <p className="font-semibold mb-1">Prompt Tips:</p>
                        <p>Choose prompts that showcase your personality and give conversation starters. Add 3-5 prompts for best results!</p>
                      </div>
                    </div>
                  </div>

                  {/* Current Prompts */}
                  <div className="space-y-3 mb-6">
                    <h3 className="font-bold text-gray-900">Your Prompts</h3>
                    {selectedPrompts.map((prompt, idx) => (
                      <div key={idx} className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-bold text-sm text-gray-700">{prompt.question}</p>
                          <button 
                            onClick={() => {
                              const newPrompts = selectedPrompts.filter((_, i) => i !== idx);
                              setSelectedPrompts(newPrompts);
                            }}
                            className="text-red-500 hover:text-red-600"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <textarea 
                          defaultValue={prompt.answer}
                          onChange={(e) => {
                            const newPrompts = [...selectedPrompts];
                            newPrompts[idx].answer = e.target.value;
                            setSelectedPrompts(newPrompts);
                          }}
                          rows={3}
                          maxLength={200}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm resize-none"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Add New Prompt */}
                  {selectedPrompts.length < 5 && (
                    <div className="space-y-3">
                      <h3 className="font-bold text-gray-900">Choose a Prompt</h3>
                      <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
                        {allPrompts.filter(p => !selectedPrompts.find(sp => sp.question === p)).map((prompt, idx) => (
                          <button 
                            key={idx}
                            onClick={() => {
                              if (selectedPrompts.length < 5) {
                                setSelectedPrompts([...selectedPrompts, { id: Date.now(), question: prompt, answer: "", type: "text" }]);
                              }
                            }}
                            className="text-left px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                          >
                            <p className="font-medium text-gray-900">{prompt}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={() => setEditSection(null)}
                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-indigo-500 dark:to-fuchsia-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all"
                  >
                    Save Prompts
                  </button>
                </div>
              </div>
            </div>
          )}

          {editSection === 'vibe' && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4">
              <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto cb-shadow-card">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
                  <h2 className="text-xl font-bold text-gray-900">My Vibe</h2>
                  <button onClick={() => setEditSection(null)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="bg-pink-50 border-2 border-pink-200 rounded-2xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Heart className="w-5 h-5 text-pink-700 mt-0.5" />
                      <div className="text-sm text-pink-800">
                        <p className="font-semibold mb-1">Show Your Vibe:</p>
                        <p>Select 5-10 interests that best represent you. This helps find compatible matches!</p>
                      </div>
                    </div>
                  </div>

                  {/* Selected Interests */}
                  {selectedVibe.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-bold text-gray-900 mb-3">Selected ({selectedVibe.length})</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedVibe.map((vibe, idx) => (
                          <button 
                            key={idx}
                            onClick={() => setSelectedVibe(selectedVibe.filter(v => v !== vibe))}
                            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-all flex items-center gap-2"
                          >
                            {vibe}
                            <X className="w-4 h-4" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Categories */}
                  <div className="space-y-4">
                    {Object.entries(vibeCategories).map(([category, items]) => (
                      <div key={category}>
                        <h3 className="font-bold text-gray-700 mb-2 text-sm">{category}</h3>
                        <div className="flex flex-wrap gap-2">
                          {items.map((item, idx) => (
                            <button 
                              key={idx}
                              onClick={() => {
                                if (selectedVibe.includes(item)) {
                                  setSelectedVibe(selectedVibe.filter(v => v !== item));
                                } else if (selectedVibe.length < 10) {
                                  setSelectedVibe([...selectedVibe, item]);
                                }
                              }}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                selectedVibe.includes(item)
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setEditSection(null)}
                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-indigo-500 dark:to-fuchsia-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all"
                  >
                    Save My Vibe
                  </button>
                </div>
              </div>
            </div>
          )}

          {editSection === 'preview' && (
            <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-blue-900 z-50 overflow-y-auto">
              <div className="min-h-screen p-4">
                <div className="max-w-md mx-auto">
                  <div className="flex items-center justify-between mb-4">
                    <button 
                      onClick={() => setEditSection(null)}
                      className="w-10 h-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <h2 className="text-white font-bold">Profile Preview</h2>
                    <div className="w-10"></div>
                  </div>

                  {/* Preview Card */}
                  <div className="bg-white rounded-3xl cb-shadow-card overflow-hidden cb-shadow-card">
                    <div className="relative w-full h-[66vh] overflow-hidden rounded-t-3xl">
                      <div className="absolute inset-0 flex items-center justify-center opacity-30">
                        <div className="text-9xl">{profilePhotos[0] || '👤'}</div>
                      </div>
                      <div className="absolute top-6 left-6">
                        <div className="cb-chip rounded-full px-3 py-1.5 text-xs sm:text-sm border border-white/30 flex items-center gap-2 font-semibold">
                          <Check className="w-4 h-4" />
                          Verified
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">Venice, 24</h3>
                      <p className="text-gray-600 mb-4">Registered Nurse • Royal London</p>
                      <p className="text-gray-700 mb-4">{bio}</p>
                      {selectedVibe.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {selectedVibe.map((vibe, idx) => (
                            <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                              {vibe}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-center text-white text-sm mt-4 opacity-75">
                    This is how your profile appears to others
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // PROFILE SCREEN (NEW!)
  if (currentScreen === 'profile') {
    const maxViews = Math.max(...weeklyActivity.map(d => d.views));
    
    return (
      <div className="min-h-screen bg-[#F8F7FB]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950 text-white px-5 py-4 sticky top-0 z-20">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <button 
              onClick={() => setCurrentScreen('main')}
              className="flex items-center gap-1 font-semibold"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              Back
            </button>
            <h1 className="text-lg font-bold">My Profile</h1>
            <button 
              onClick={() => setCurrentScreen('settings')}
              className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-all"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-5 py-6 pb-24">
          {/* Profile Header with Animated Ring */}
          <div className="relative mb-6">
            <div className="bg-white rounded-3xl cb-shadow-card p-6 cb-shadow-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  {/* Animated gradient ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-900 via-purple-600 to-pink-500 animate-spin" style={{ animationDuration: '3s' }}></div>
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center text-white text-3xl font-bold m-1">
                    VG
                  </div>
                  <button className="absolute bottom-1 right-1 w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center border-2 border-white cb-shadow-card">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-bold text-gray-900">Venice Dawn</h2>
                    <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                      <Check className="w-4 h-4 text-blue-900" />
                      <span className="cb-chip text-xs font-bold text-blue-900 border border-white/30">Verified</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Registered Nurse • NHS</p>
                  <p className="text-xs text-gray-500">London, UK • 24 years old</p>
                </div>
              </div>

              {/* Profile Strength */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-700" />
                    <span className="font-bold text-gray-900">Profile Strength</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-900">{userProfile.profileComplete}%</span>
                </div>
                <div className="h-3 bg-white rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-full transition-all duration-500"
                    style={{width: `${userProfile.profileComplete}%`}}
                  ></div>
                </div>
                <p className="text-xs text-gray-600">Complete profiles get 5x more matches!</p>
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white py-3 rounded-xl font-bold hover:from-blue-800 hover:to-blue-700 transition-all cb-shadow-card flex items-center justify-center gap-2"
                onClick={() => setCurrentScreen('edit-profile')}
              >
                <Edit className="w-5 h-5" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Weekly Activity Dashboard */}
          <div className="cb-card rounded-3xl cb-shadow-card p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="cb-title text-lg font-bold text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-700" />
                Weekly Activity
              </h3>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            
            {/* Activity Chart */}
            <div className="flex items-end justify-between gap-2 h-32 mb-4">
              {weeklyActivity.map((day, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <div className="relative w-full bg-gray-100 rounded-t-lg overflow-hidden" style={{height: `${(day.views / maxViews) * 100}%`, minHeight: '20px'}}>
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600 to-blue-400"></div>
                  </div>
                  <span className="text-xs font-semibold text-gray-500">{day.day}</span>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 text-center">
                <Eye className="w-5 h-5 text-blue-700 mx-auto mb-1" />
                <div className="text-2xl font-bold text-gray-900">156</div>
                <div className="text-xs text-gray-600">Total Views</div>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-3 text-center">
                <Heart className="w-5 h-5 text-pink-600 mx-auto mb-1" />
                <div className="text-2xl font-bold text-gray-900">23</div>
                <div className="text-xs text-gray-600">Likes</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 text-center">
                <Zap className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <div className="text-2xl font-bold text-gray-900">89%</div>
                <div className="text-xs text-gray-600">Response</div>
              </div>
            </div>
          </div>

          {/* Best Performing Content */}
          <div className="cb-card rounded-3xl p-6 mb-6 text-gray-900 cb-shadow-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h3 className="cb-title text-lg font-bold">Your Best Content</h3>
                <p className="text-sm opacity-90">This week's top performer</p>
              </div>
            </div>
            <div className="rounded-xl p-4 border" style={{borderColor:'var(--cb-border)', background:'var(--cb-surface)'}}>
              <p className="text-sm mb-2 opacity-90">"Typical Sunday" prompt</p>
              <p className="font-semibold mb-3">"Helping walk the older pups at the shelter..."</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="font-bold">47 likes</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span className="font-bold">12 comments</span>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="cb-card rounded-3xl cb-shadow-card p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <h3 className="cb-title text-lg font-bold text-gray-900">Achievements</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {achievements.map(achievement => (
                <div 
                  key={achievement.id}
                  className={`rounded-xl p-4 text-center transition-all ${
                    achievement.unlocked 
                      ? 'bg-slate-50 border border-[color:var(--cb-border)]' 
                      : 'bg-slate-50 border border-[color:var(--cb-border)] opacity-60'
                  }`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <div className="text-xs font-bold text-gray-900 mb-1">{achievement.name}</div>
                  <div className="text-xs text-gray-500">{achievement.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Super Likes */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white cb-shadow-card">
              <Star className="w-8 h-8 mb-3" />
              <div className="text-3xl font-bold mb-1">5</div>
              <div className="text-sm opacity-90">Super Likes</div>
              <button className="mt-3 w-full bg-white text-blue-700 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-all">
                Get More
              </button>
            </div>

            {/* Boosts */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-5 text-white cb-shadow-card">
              <Zap className="w-8 h-8 mb-3" />
              <div className="text-3xl font-bold mb-1">2</div>
              <div className="text-sm opacity-90">Boosts Left</div>
              <button className="mt-3 w-full bg-white text-purple-700 py-2 rounded-lg font-semibold text-sm hover:bg-purple-50 transition-all">
                Use Now
              </button>
            </div>
          </div>

          {/* Who Likes You Preview */}
          <div className="cb-card rounded-3xl cb-shadow-card p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="cb-title text-lg font-bold text-gray-900">Who Likes You</h3>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex gap-3">
              {whoLikesYou.slice(0, 3).map((person, idx) => (
                <div key={idx} className="flex-1 relative">
                  <div className="aspect-square bg-slate-100 rounded-2xl flex items-center justify-center text-5xl">
                    <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3 rounded-xl font-bold hover:from-pink-600 hover:to-rose-700 transition-all">
              See All {whoLikesYou.length}
            </button>
          </div>

          {/* Subscription Status (neutral) */}
          <div className="cb-card rounded-3xl p-6 cb-shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <h3 className="cb-title text-xl font-bold text-gray-900">Upgrade to Premium</h3>
                <p className="text-sm text-gray-600">Unlock exclusive features</p>
              </div>
            </div>
            <div className="space-y-2 mb-4 text-gray-800">
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>See everyone who likes you</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Unlimited likes & super likes</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Advanced matching filters</span>
              </div>
            </div>
            <button className="w-full bg-blue-900 text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition-all cb-shadow-card">
              View Plans
            </button>
          </div>

          {/* Account Links */}
          <div className="mt-6 cb-card rounded-2xl overflow-hidden cb-shadow-card">
            <button 
              onClick={() => setCurrentScreen('settings')}
              className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-all border-b border-gray-100"
            >
              <div className="flex items-center gap-4">
                <Settings className="w-6 h-6 text-gray-600" />
                <span className="font-semibold text-gray-900">Settings & Privacy</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-all border-b border-gray-100">
              <div className="flex items-center gap-4">
                <Shield className="w-6 h-6 text-gray-600" />
                <span className="font-semibold text-gray-900">Safety & Security</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-all">
              <div className="flex items-center gap-4">
                <Info className="w-6 h-6 text-gray-600" />
                <span className="font-semibold text-gray-900">Help Center</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SETTINGS SCREEN
  if (currentScreen === 'settings') {
    return (
      <div className="min-h-screen bg-[#F8F7FB]">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
            <button 
              onClick={() => setCurrentScreen('profile')}
              className="text-blue-900 font-semibold flex items-center gap-1"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              Back
            </button>
            <h1 className="text-xl font-bold text-gray-900">Settings</h1>
            <button className="text-blue-900 font-semibold">Done</button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto py-6 pb-24">
          {/* Profile Settings */}
          <Section title="Profile">
            <SettingItem
              icon={User}
              label="Edit Profile"
              description="Photos, prompts, bio, my vibe"
              action={null}
              onClick={() => setCurrentScreen('edit-profile')}
            />
            <SettingItem
              icon={Shield}
              label="Verification"
              description="NHS email verified"
              action={
                <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="cb-chip text-xs font-medium text-green-600 border border-white/30">Verified</span>
                </div>
              }
              showChevron={false}
            />
            <SettingItem
              icon={pauseProfile ? EyeOff : Eye}
              label="Pause Profile"
              description="Hide from discovery while keeping matches"
              action={<ToggleSwitch enabled={pauseProfile} onChange={setPauseProfile} />}
              showChevron={false}
            />
            <SettingItem
              icon={Calendar}
              label="Show Last Active Status"
              description="Let matches see when you were last online"
              action={<ToggleSwitch enabled={showLastActive} onChange={setShowLastActive} />}
              showChevron={false}
            />
          </Section>

          {/* Appearance */}
          <Section title="Appearance">
            <SettingItem
              icon={darkMode ? Moon : Sun}
              label="Dark Mode"
              description="Toggle between light and dark theme"
              action={<ToggleSwitch enabled={darkMode} onChange={toggleDarkMode} />}
              showChevron={false}
            />
          </Section>

          {/* Safety & Privacy */}
          <Section title="Safety & Privacy">
            <SettingItem
              icon={Lock}
              label="Privacy Settings"
              description="Control who can see your profile"
              action={null}
            />
            <SettingItem
              icon={Users}
              label="Block List"
              description="Manage blocked contacts"
              action={null}
            />
            <SettingItem
              icon={MessageCircle}
              label="Read Receipts"
              description="Let matches know when you've read messages"
              action={<ToggleSwitch enabled={readReceipts} onChange={setReadReceipts} />}
              showChevron={false}
            />
            <SettingItem
              icon={Shield}
              label="Photo Verification"
              description="Verify your identity with a selfie"
              action={
                <span className="text-xs font-medium text-gray-400">Not verified</span>
              }
            />
          </Section>

          {/* Discovery Settings */}
          <Section title="Discovery Settings">
            <SettingItem
              icon={Globe}
              label="Enable Discovery"
              description="Be discoverable in the card stack"
              action={<ToggleSwitch enabled={enableDiscovery} onChange={setEnableDiscovery} />}
              showChevron={false}
            />
            <SettingItem
              icon={MapPin}
              label="Location"
              description="Waterloo, Ontario, Canada"
              action={null}
            />
            
            {/* Distance Slider */}
            <div className="py-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-gray-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Maximum Distance</p>
                    <p className="text-sm text-gray-500">{maxDistance} miles</p>
                  </div>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={maxDistance}
                onChange={(e) => setMaxDistance(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
              />
            </div>

            {/* Age Range Slider */}
            <div className="py-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <Users className="w-6 h-6 text-gray-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Age Range</p>
                    <p className="text-sm text-gray-500">{ageRange[0]} - {ageRange[1]} years</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <input
                  type="range"
                  min="18"
                  max="65"
                  value={ageRange[0]}
                  onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
                />
                <input
                  type="range"
                  min="18"
                  max="65"
                  value={ageRange[1]}
                  onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
                />
              </div>
            </div>

            <SettingItem
              icon={Heart}
              label="Interested In"
              description="Men"
              action={null}
            />
            <SettingItem
              icon={showDistance ? Eye : EyeOff}
              label="Show Distance"
              description="Display distance on profiles"
              action={<ToggleSwitch enabled={showDistance} onChange={setShowDistance} />}
              showChevron={false}
            />
          </Section>

          {/* Notifications */}
          <Section title="Notifications">
            <SettingItem
              icon={Bell}
              label="Push Notifications"
              description="Get notified about matches and messages"
              action={<ToggleSwitch enabled={pushNotifications} onChange={setPushNotifications} />}
              showChevron={false}
            />
            <SettingItem
              icon={Mail}
              label="Email Notifications"
              description="Receive updates via email"
              action={<ToggleSwitch enabled={emailNotifications} onChange={setEmailNotifications} />}
              showChevron={false}
            />
          </Section>

          {/* Account Settings */}
          <Section title="Account">
            <SettingItem
              icon={Phone}
              label="Phone Number"
              description="+1 343-542-1282"
              action={null}
            />
            <SettingItem
              icon={Mail}
              label="Email"
              description="vendettageuhr@gmail.com"
              action={null}
            />
            <SettingItem
              icon={Settings}
              label="App Settings"
              description="Language, units, data usage"
              action={null}
            />
          </Section>

          {/* Danger Zone */}
          <div className="mx-5 mb-6">
            <button 
              onClick={() => setCurrentScreen('splash')}
              className="w-full py-4 text-red-600 font-semibold flex items-center justify-center gap-2 bg-white rounded-lg border border-gray-200 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Log Out
            </button>
          </div>

          <div className="mx-5 mb-20 text-center">
            <p className="text-sm text-gray-500">Version 1.0.0 • CODE BLUE DATING</p>
            <p className="text-xs text-gray-400 mt-1">© 2025 Healthcare Professionals Network</p>
          </div>
        </div>
      </div>
    );
  }

  // Splash Screen
  if (currentScreen === 'splash') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden" style={{background: 'linear-gradient(135deg, var(--cb-navy-deep) 0%, var(--cb-navy) 50%, var(--cb-navy-soft) 100%)'}}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        <div className="text-center max-w-md relative z-10">
          <div className="mb-8">
            <div className="text-7xl mb-6">💙</div>
            <h1 className="mb-3 tracking-tight flex items-baseline justify-center gap-2">
              <span className="text-5xl font-light tracking-widest uppercase">CODE</span>
              <span className="text-6xl font-black italic tracking-wide cb-wordmark-blue">Blue</span>
            </h1>
            <p className="text-blue-200 text-xl font-light">Where Healthcare Heroes Connect</p>
          </div>
          <div className="space-y-4 mt-12">
            <button
              onClick={() => {
                setUserProfile(prev => ({ ...prev, name: "Venice Dawn", role: "Registered Nurse", profileComplete: 75 }));
                setCurrentScreen('main');
              }}
              className="w-full bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 cb-shadow-card"
            >
              Get Started
            </button>
            <button
              onClick={() => {
                setUserProfile(prev => ({ ...prev, name: "Venice Dawn", role: "Registered Nurse", profileComplete: 75 }));
                setCurrentScreen('main');
              }}
              className="w-full border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all cb-shadow-card"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main App with Tabs
  if (currentScreen === 'main') {
    return (
      <div className="min-h-screen bg-[var(--cb-bg)] flex flex-col">
        {/* Enhanced header with sophisticated navigation */}
        <div className="sticky top-0 z-[var(--z-header)] bg-gradient-to-b from-white to-transparent dark:from-gray-900">
          <div className="px-4 py-3 flex justify-center items-center relative">
            <div className="cb-nav-tabs">
              <button 
                onClick={() => setActiveTab('discover')}
                className={`cb-nav-tab cb-nav-tab--discover ${activeTab === 'discover' ? 'active' : ''}`}
              >
                Discover
              </button>
              <button 
                onClick={() => setActiveTab('matches')}
                className={`cb-nav-tab cb-nav-tab--matches ${activeTab === 'matches' ? 'active' : ''}`}
              >
                Matches
              </button>
            </div>
            
            {activeTab === 'discover' && (
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 px-3 py-1.5 rounded-full transition-colors border-2 text-[#122c34] border-[#122c34] bg-transparent hover:bg-[rgba(18,44,52,0.06)] focus:outline-none focus:ring-2 focus:ring-[#4ea5d9]/40"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-sm font-medium">Filters</span>
                <div className="flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-semibold border border-[#122c34] text-[#122c34]">3</div>
              </button>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto pb-20">
          {activeTab === 'discover' && (
            <DiscoverTab
              sampleProfiles={sampleProfiles}
              currentMatch={currentMatch}
              setCurrentMatch={setCurrentMatch}
              activePrompt={activePrompt}
              setActivePrompt={setActivePrompt}
              imageErrors={imageErrors}
              setImageErrors={setImageErrors}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              maxDistance={maxDistance}
              setMaxDistance={setMaxDistance}
              ageRange={ageRange}
              setAgeRange={setAgeRange}
              likedPrompts={likedPrompts}
              togglePromptLike={togglePromptLike}
              promptComments={promptComments}
              addPromptComment={addPromptComment}
            />
          )}

          {activeTab === 'matches' && (
            <MatchesTab
              whoLikesYou={whoLikesYou}
              myMatches={myMatches}
              setSelectedMatch={setSelectedMatch}
            />
          )}

          {activeTab === 'home' && (
            <HomeTab
              setCurrentScreen={setCurrentScreen}
              userProfile={userProfile}
              dailyInsights={dailyInsights}
              sampleProfiles={sampleProfiles}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'connect' && (
            <ConnectTab events={events} />
          )}

          {activeTab === 'vent' && (
            <VentTab
              ventRoom={ventRoom}
              setVentRoom={setVentRoom}
              ventTopics={ventTopics}
            />
          )}
        </div>

        {/* Bottom Tab Navigation - Modern Nested Pill Design */}
        {/* Inspired by iOS/Instagram pattern: colored container with white active pill */}
        <div className="fixed bottom-0 left-0 right-0 z-40 pb-6 px-4">
          <div className="max-w-md mx-auto">
            {/* Gunmetal container with nested white active pill */}
            <div 
              className="rounded-full px-3 py-3"
              style={{
                background: '#122c34', // Gunmetal
                boxShadow: '0 10px 40px rgba(18, 44, 52, 0.3), 0 2px 8px rgba(0, 0, 0, 0.15)'
              }}
            >
              {/* Navigation items */}
              <div className="flex justify-around items-center gap-1">
                {/* Discover */}
                <button
                  onClick={() => setActiveTab('discover')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 min-w-[56px]"
                  style={{
                    background: activeTab === 'discover' 
                      ? '#ffffff'
                      : 'transparent',
                    boxShadow: activeTab === 'discover' 
                      ? '0 4px 12px rgba(0, 0, 0, 0.15)'
                      : 'none'
                  }}
                >
                  <Heart className={`w-5 h-5 transition-all ${activeTab === 'discover' ? 'text-[#ec4899] fill-[#ec4899]' : 'text-white/70'}`} />
                  {activeTab === 'discover' && (
                    <span className="text-sm font-semibold text-[#122c34]">Discover</span>
                  )}
                </button>

                {/* Matches */}
                <button
                  onClick={() => setActiveTab('matches')}
                  className="relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 min-w-[56px]"
                  style={{
                    background: activeTab === 'matches' 
                      ? '#ffffff'
                      : 'transparent',
                    boxShadow: activeTab === 'matches' 
                      ? '0 4px 12px rgba(0, 0, 0, 0.15)'
                      : 'none'
                  }}
                >
                  <MessageCircle className={`w-5 h-5 transition-all ${activeTab === 'matches' ? 'text-[#44cfcb] fill-[#44cfcb]' : 'text-white/70'}`} />
                  {activeTab === 'matches' && (
                    <span className="text-sm font-semibold text-[#44cfcb]">Matches</span>
                  )}
                  {/* Notification Badge */}
                  {activeTab !== 'matches' && (
                    <span 
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                      style={{ backgroundColor: '#44cfcb', border: '2px solid #122c34' }}
                    >
                      3
                    </span>
                  )}
                </button>

                {/* Home */}
                <button
                  onClick={() => setActiveTab('home')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 min-w-[56px]"
                  style={{
                    background: activeTab === 'home' 
                      ? '#ffffff'
                      : 'transparent',
                    boxShadow: activeTab === 'home' 
                      ? '0 4px 12px rgba(0, 0, 0, 0.15)'
                      : 'none'
                  }}
                >
                  <Home className={`w-5 h-5 transition-all ${activeTab === 'home' ? 'text-[#4ea5d9] fill-[#4ea5d9]' : 'text-white/70'}`} />
                  {activeTab === 'home' && (
                    <span className="text-sm font-semibold text-[#4ea5d9]">Home</span>
                  )}
                </button>

                {/* Connect */}
                <button
                  onClick={() => setActiveTab('connect')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 min-w-[56px]"
                  style={{
                    background: activeTab === 'connect' 
                      ? '#ffffff'
                      : 'transparent',
                    boxShadow: activeTab === 'connect' 
                      ? '0 4px 12px rgba(0, 0, 0, 0.15)'
                      : 'none'
                  }}
                >
                  <Users className={`w-5 h-5 transition-all ${activeTab === 'connect' ? 'text-[#10b981] fill-[#10b981]' : 'text-white/70'}`} />
                  {activeTab === 'connect' && (
                    <span className="text-sm font-semibold text-[#10b981]">Connect</span>
                  )}
                </button>

                {/* Vent */}
                <button
                  onClick={() => setActiveTab('vent')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 min-w-[56px]"
                  style={{
                    background: activeTab === 'vent' 
                      ? '#ffffff'
                      : 'transparent',
                    boxShadow: activeTab === 'vent' 
                      ? '0 4px 12px rgba(0, 0, 0, 0.15)'
                      : 'none'
                  }}
                >
                  <Cloud className={`w-5 h-5 transition-all ${activeTab === 'vent' ? 'text-[#6366f1] fill-[#6366f1]' : 'text-white/70'}`} />
                  {activeTab === 'vent' && (
                    <span className="text-sm font-semibold text-[#6366f1]">Vent</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 
        ================================================================
        GLASS MORPHISM BACKUP (OPTION 3) - Uncomment to restore
        ================================================================
        
        <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-6">
          <div className="max-w-md mx-auto">
            <div 
              className="relative overflow-hidden rounded-3xl"
              style={{
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
              }}
            >
              <div className="flex justify-around items-center px-3 py-4">
                <button onClick={() => setActiveTab('discover')} className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300" style={{ background: activeTab === 'discover' ? '#4ea5d9' : 'transparent', boxShadow: activeTab === 'discover' ? '0 4px 16px rgba(78, 165, 217, 0.3)' : 'none' }}>
                  <Heart className={`w-6 h-6 transition-all ${activeTab === 'discover' ? 'text-white fill-white' : 'text-gray-500'}`} />
                  {activeTab === 'discover' && <span className="text-xs font-medium text-white">Discover</span>}
                </button>
                (repeat pattern for other tabs)
              </div>
            </div>
          </div>
        </div>
        
        ================================================================
        */}
      </div>
    );
  }

  return null;
};

// ============================================================================
// EXPORTS & DEVELOPER NOTES
// ============================================================================

/**
 * DEVELOPER ROADMAP & FUTURE ENHANCEMENTS
 * ========================================
 * 
 * RECOMMENDED REFACTORING (if file grows beyond 3000 lines):
 * 1. Extract data constants to separate files:
 *    - src/data/profiles.js (sampleProfiles)
 *    - src/data/matches.js (myMatches, whoLikesYou)
 *    - src/data/ventTopics.js (ventTopics)
 *    - src/data/events.js (events)
 * 
 * 2. Split screens into separate components:
 *    - src/screens/SplashScreen.jsx
 *    - src/screens/DiscoverTab.jsx
 *    - src/screens/MatchesTab.jsx
 *    - src/screens/HomeTab.jsx
 *    - src/screens/ConnectTab.jsx
 *    - src/screens/VentTab.jsx
 *    - src/screens/ProfileScreen.jsx
 *    - src/screens/EditProfileScreen.jsx
 *    - src/screens/SettingsScreen.jsx
 * 
 * 3. Move utility components to src/components/:
 *    - src/components/ToggleSwitch.jsx
 *    - src/components/SettingItem.jsx
 *    - src/components/Section.jsx
 * 
 * 4. Extract hooks:
 *    - src/hooks/useCodeBlueTheme.js
 *    - src/hooks/useDarkMode.js
 * 
 * 5. Move CSS to separate file:
 *    - src/styles/codeblue-theme.css
 *    - Import via normal CSS instead of template literal injection
 * 
 * BACKEND INTEGRATION CHECKLIST:
 * - [ ] Replace sample data with API calls
 * - [ ] Implement authentication (NHS verification)
 * - [ ] Set up real-time messaging (Socket.io or similar)
 * - [ ] Integrate image upload for profile photos
 * - [ ] Connect to matching algorithm service
 * - [ ] Implement push notifications
 * - [ ] Add payment gateway for premium subscriptions
 * - [ ] Set up analytics tracking
 * 
 * FEATURE ADDITIONS TO CONSIDER:
 * - Voice prompts (audio recordings on profiles)
 * - Video chat integration
 * - Advanced filters (hospital, specialization, shift patterns)
 * - Shared shift calendar for date planning
 * - Group events and RSVP system
 * - Report/block functionality
 * - Profile verification flow
 * - In-app safety resources
 * 
 * PERFORMANCE OPTIMIZATIONS:
 * - Implement React.memo for expensive components
 * - Add useMemo for computed values
 * - Lazy load tab content
 * - Virtualize long lists (matches, profiles)
 * - Optimize image loading with lazy loading
 * 
 * ACCESSIBILITY IMPROVEMENTS:
 * - Add ARIA labels to all interactive elements
 * - Implement keyboard navigation
 * - Test with screen readers
 * - Add focus management for modals
 * - Ensure color contrast meets WCAG AA standards
 * 
 * TESTING STRATEGY:
 * - Unit tests for utility functions
 * - Component tests with React Testing Library
 * - E2E tests for critical user flows (sign up, match, message)
 * - Visual regression tests for UI consistency
 * 
 * STATE MANAGEMENT MIGRATION (if needed):
 * If state becomes too complex, consider:
 * - Zustand (lightweight, recommended)
 * - Redux Toolkit (if complex async logic needed)
 * - React Query (for server state)
 * 
 * KNOWN LIMITATIONS:
 * - Sample data only (no real matching algorithm)
 * - No real-time updates (requires WebSocket)
 * - Emoji placeholders instead of actual images
 * - No actual NHS verification process
 * - localStorage only (no persistent backend)
 * - No error boundaries
 * - No loading states for async operations
 */

export default CodeBlueDating;

/**
 * toggleCodeBlueTheme Utility Function
 * =====================================
 * Programmatically toggles dark/light theme
 * Can be called from outside the component (e.g., browser console, tests)
 * 
 * Usage:
 * import { toggleCodeBlueTheme } from './CodeBlueDating';
 * toggleCodeBlueTheme(); // Switches theme
 */
export const toggleCodeBlueTheme = () => {
  try {
    const isDark = document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', !isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  } catch {}
};
