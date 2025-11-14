# ProfileCardTemplate - Component Documentation

## Overview

The `ProfileCardTemplate` is a reusable, customizable profile card component based on the design from `TestMatchProfile.jsx`. It provides a premium, modern interface for displaying user profiles in a dating app context.

## Features

### Visual Design
- **Hero Image**: 520px height with 24px rounded corners
- **Wave Separator**: Decorative wave overlay between image and info card
- **Action Buttons**: Right-aligned buttons for Pass, Super Like, and Like actions
- **Info Card**: Comprehensive profile information display
- **Responsive**: Works on mobile and desktop viewports

### Wave Modes
The component supports three wave separator modes:

1. **None** (`notchMode="none"`): Classic smooth wave separator
2. **Bubble** (`notchMode="bubble"`): U-shaped notch for action buttons
3. **Hybrid** (`notchMode="hybrid"`): Blended notch with smooth transitions (recommended)

### Sections
- **About**: Profile bio/description
- **Tags**: Interest/attribute tags
- **Prompts**: Question-answer pairs
- **Lifestyle**: Detailed information (department, hospital, shift, etc.)
- **Looking For**: Relationship goals

## Installation & Usage

### 1. Import the Component

```jsx
import ProfileCardTemplate from '../components/discover/ProfileCardTemplate';
```

### 2. Basic Usage

```jsx
<ProfileCardTemplate
  name="Sarah"
  age={29}
  imageUrl="https://example.com/photo.jpg"
  about="ICU Nurse based in the city..."
  tags={['ICU Nurse', 'Empathetic', 'Dogs']}
  prompts={[
    {
      question: 'My simple pleasures',
      answer: 'Short shows, the gym, and blasting music in the car.'
    }
  ]}
  lifestyle={{
    department: 'Emergency / ICU',
    hospital: 'Royal London Hospital',
    shift: 'Night Shift',
    distance: '2 miles away'
  }}
  lookingFor={['Long-term relationship', 'Open to short-term']}
  onPass={() => console.log('Pass')}
  onSuperLike={() => console.log('Super Like')}
  onLike={() => console.log('Like')}
  notchMode="hybrid"
/>
```

### 3. Run the Example

To see the component in action, you can use the included example file:

```jsx
import ProfileCardTemplateExample from '../screens/ProfileCardTemplateExample';

// In your router/navigation
<Route path="/profile-template-demo" component={ProfileCardTemplateExample} />
```

## Props Reference

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `name` | string | User's first name (default: 'Unknown') |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `age` | number | undefined | User's age |
| `imageUrl` | string | Default image | URL for the hero profile image |
| `about` | string | '' | About section text |
| `tags` | array | [] | Array of tag strings |
| `prompts` | array | [] | Array of prompt objects `{question, answer}` |
| `lifestyle` | object | {} | Lifestyle information object |
| `lookingFor` | array | [] | Relationship goal strings |
| `onPass` | function | undefined | Called when pass button is clicked |
| `onSuperLike` | function | undefined | Called when super like button is clicked |
| `onLike` | function | undefined | Called when like button is clicked |
| `notchMode` | string | 'hybrid' | Wave mode: 'none' \| 'bubble' \| 'hybrid' |
| `showWave` | boolean | true | Whether to show the wave separator |
| `waveControls` | object | {} | Custom wave parameters (advanced) |

### Lifestyle Object Structure

```javascript
{
  department: string,      // e.g., 'Emergency / ICU'
  hospital: string,        // e.g., 'Royal London Hospital'
  shift: string,          // e.g., 'Night Shift'
  distance: string,       // e.g., '2 miles away'
  loveLanguage: string,   // e.g., 'Physical touch • Words'
  pets: string,           // e.g., 'Dogs'
  smoking: string,        // e.g., 'Never'
  drinking: string,       // e.g., 'Occasionally'
  spiritual: string       // e.g., 'Yes'
}
```

### Prompts Array Structure

```javascript
[
  {
    question: 'My simple pleasures',
    answer: 'Short shows, the gym, and blasting music in the car.'
  },
  {
    question: 'Most spontaneous thing',
    answer: 'Took a 5am train to the coast after a night shift.'
  }
]
```

## Advanced Customization

### Custom Wave Controls

You can fine-tune the wave separator appearance:

```jsx
<ProfileCardTemplate
  name="Sarah"
  // ... other props
  notchMode="hybrid"
  waveControls={{
    baselineY: 60,
    troughY: 100,
    rightEndY: 90,
    troughX: 255,
    easingShift: 50,
    declineSharpness: 50,
    declineStartX: 140,
    notchCenterX: 356,
    notchWidth: 130,
    notchDepth: 60,
    notchSmoothing: 28
  }}
/>
```

### Wave Control Parameters

| Parameter | Description | Range |
|-----------|-------------|-------|
| `baselineY` | Starting Y position | 50-80 |
| `troughY` | Wave depth Y position | 90-115 |
| `rightEndY` | Ending Y position | 80-100 |
| `troughX` | Wave center X position | 200-300 |
| `easingShift` | Horizontal spread | 20-70 |
| `declineSharpness` | Drop steepness | 0-160 |
| `declineStartX` | Drop start X position | 80-220 |
| `notchCenterX` | Notch center X | 300-390 |
| `notchWidth` | Notch width | 70-140 |
| `notchDepth` | Notch depth | 25-80 |
| `notchSmoothing` | Hybrid mode smoothing | 10-40 |

## Dependencies

The component requires these dependencies (already in the test components):
- `ProfileWave` - Wave separator component
- `HeartbeatIcon` - Animated heartbeat icon
- `PulseButton` - Button with pulse animation
- `lucide-react` - Icons (X, Heart)

## Styling

The component uses inline styles for colors and dimensions to ensure consistency:

```javascript
const C = {
  gunmetal: "rgba(15,33,58,0.90)",
  textSubtle: "rgba(15,33,58,0.70)",
  bg: "#F7F8FA",
  card: "#FFFFFF",
  border: "rgba(15,33,58,0.10)",
};

const RADII = { 
  hero: 24,    // Hero image border radius
  card: 24,    // Info card border radius
  button: 14   // Action button border radius
};
```

## Accessibility

The component includes:
- Semantic HTML structure
- ARIA labels on action buttons
- Keyboard accessible buttons
- High contrast text for readability
- Alt text on images

## Examples

### Minimal Profile

```jsx
<ProfileCardTemplate
  name="Alex"
  age={28}
  about="Emergency room doctor who loves hiking."
  onLike={() => handleLike()}
/>
```

### Full Profile

```jsx
<ProfileCardTemplate
  name="Sarah"
  age={29}
  imageUrl="https://example.com/sarah.jpg"
  about="ICU Nurse based in the city. I love sunrise drives..."
  tags={['ICU Nurse', 'Empathetic', 'Dogs', 'Coffee Lover']}
  prompts={[
    { question: 'My simple pleasures', answer: 'Short shows, the gym...' },
    { question: 'Most spontaneous thing', answer: 'Took a 5am train...' }
  ]}
  lifestyle={{
    department: 'Emergency / ICU',
    hospital: 'Royal London Hospital',
    shift: 'Night Shift',
    distance: '2 miles away',
    loveLanguage: 'Physical touch • Words',
    pets: 'Dogs',
    smoking: 'Never',
    drinking: 'Occasionally',
    spiritual: 'Yes'
  }}
  lookingFor={['Long-term relationship', 'Open to short-term']}
  onPass={handlePass}
  onSuperLike={handleSuperLike}
  onLike={handleLike}
  notchMode="hybrid"
/>
```

### Without Wave

```jsx
<ProfileCardTemplate
  name="Jordan"
  age={30}
  about="Paramedic with a love for adventure."
  showWave={false}
  onLike={handleLike}
/>
```

## Tips & Best Practices

1. **Image URLs**: Use optimized images (WebP, compressed JPEGs) for better performance
2. **Prompts**: Keep answers concise (2-3 sentences) for better readability
3. **Tags**: Limit to 3-5 tags to avoid visual clutter
4. **Wave Mode**: 
   - Use 'hybrid' for modern, polished look
   - Use 'bubble' for clearer button separation
   - Use 'none' for classic simplicity
5. **Action Handlers**: Always provide feedback (console.log, analytics, state updates)
6. **Lifestyle Fields**: Only include relevant fields (component auto-hides empty ones)

## Troubleshooting

### Images Not Loading
- Verify `imageUrl` is accessible
- Check for CORS issues
- Provide a fallback image URL

### Wave Not Showing
- Ensure `showWave={true}` is set
- Check that `ProfileWave` component is imported
- Verify wave control values are within recommended ranges

### Buttons Not Responding
- Verify action handler functions are passed
- Check console for JavaScript errors
- Ensure buttons are not covered by other elements

## Future Enhancements

Potential improvements for future versions:
- Multiple photo support with swipe
- Video profile support
- Verified badge display
- Match percentage indicator
- Dark mode support
- Custom color themes
- Animation on card entry
- Skeleton loading states

## License

This component is part of the CodeBlue Dating App project.

## Support

For issues or questions, please refer to the main project documentation or create an issue in the repository.
