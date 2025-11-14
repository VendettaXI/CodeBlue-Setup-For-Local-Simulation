// Test Pages Demo Launcher - Case File Discover View
import React from "react";
import DiscoverPage from "./DiscoverPage";

// Sample profiles matching the case file design
const testProfiles = [
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
  },
  {
    id: 3,
    name: "Emily",
    age: 27,
    role: "Paramedic",
    specialty: "Emergency Medical Services",
    hospital: "London Ambulance Service",
    shift: "Day Shift",
    distance: "1.5 miles away",
    photos: [
      { emoji: "👩‍⚕️" },
      { emoji: "🚑" },
      { emoji: "🏃‍♀️" }
    ],
    verified: true,
    recentlyActive: true,
    responseRate: "Usually responds in 3 hours",
    prompts: [
      { question: "Best way to ask me out", answer: "Just be direct and honest. I appreciate authenticity over pickup lines.", type: "text", likes: 20 },
      { question: "Dating me is like", answer: "An adventure with unexpected turns - much like my shifts!", type: "text", likes: 17 }
    ],
    myVibe: ["Fitness", "Adrenaline", "Team sports", "Podcasts"],
    shiftCompatibility: 88,
    commonInterests: 2,
    mutualConnections: 1
  }
];

function TestPagesDemo() {
  return (
    <div className="test-pages-demo min-h-screen">
      <DiscoverPage profiles={testProfiles} />
    </div>
  );
}

export default TestPagesDemo;
