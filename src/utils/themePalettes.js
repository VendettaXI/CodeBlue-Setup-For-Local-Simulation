/**
 * ============================================================================
 * Theme Palette System
 * ============================================================================
 * 
 * Manages color palette switching across the app.
 * Each palette maintains consistent contrast ratios and accessibility.
 * 
 * PALETTES:
 * - Classic Blue (NHS-inspired, current default)
 * - Purple Dreams (romantic, elegant)
 * - Pink Passion (warm, friendly)
 * - Green Vitality (fresh, energetic)
 * 
 * USAGE:
 * ```js
 * import { getPalette, setPalette, PALETTES } from './utils/themePalettes';
 * 
 * // Get current palette
 * const currentPalette = getPalette();
 * 
 * // Switch to new palette
 * setPalette('purple');
 * ```
 * ============================================================================
 */

/**
 * Available theme palettes
 * Each palette defines colors for different UI contexts
 */
export const PALETTES = {
  blue: {
    id: 'blue',
    name: 'Classic Blue',
    description: 'NHS-inspired professional palette',
    colors: {
      // Primary navigation/brand
      navContainer: '#122c34',      // Gunmetal - dark container
      navActive: '#ffffff',          // White - active pill background
      
      // Tab-specific accent colors
      discover: '#ec4899',           // Pink - matches like button
      matches: '#44cfcb',            // Robin egg blue - notifications
      home: '#4ea5d9',              // Picton blue - analytics
      connect: '#10b981',            // Emerald - events
      vent: '#6366f1',              // Indigo - support
      
      // Gradients
      gradientStart: '#4ea5d9',     // Picton blue
      gradientMid: '#44cfcb',       // Robin egg blue
      gradientEnd: '#224870',       // Indigo dye
      
      // UI elements
      buttonPrimary: '#4ea5d9',
      buttonSecondary: '#44cfcb',
      cardBg: '#ffffff',
      textPrimary: '#122c34',
      textSecondary: '#64748b',
    }
  },
  
  purple: {
    id: 'purple',
    name: 'Purple Dreams',
    description: 'Romantic and elegant vibes',
    colors: {
      navContainer: '#4c1d95',      // Deep purple
      navActive: '#ffffff',
      
      discover: '#ec4899',           // Pink (keep consistent)
      matches: '#a78bfa',            // Light purple
      home: '#8b5cf6',              // Medium purple
      connect: '#10b981',            // Emerald (keep consistent)
      vent: '#6366f1',              // Indigo (keep consistent)
      
      gradientStart: '#8b5cf6',     // Violet
      gradientMid: '#a78bfa',       // Light purple
      gradientEnd: '#7c3aed',       // Purple
      
      buttonPrimary: '#8b5cf6',
      buttonSecondary: '#a78bfa',
      cardBg: '#ffffff',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
    }
  },
  
  pink: {
    id: 'pink',
    name: 'Pink Passion',
    description: 'Warm and friendly atmosphere',
    colors: {
      navContainer: '#831843',      // Deep pink/rose
      navActive: '#ffffff',
      
      discover: '#ec4899',           // Hot pink
      matches: '#f472b6',            // Light pink
      home: '#fb7185',              // Rose
      connect: '#10b981',            // Emerald (consistency)
      vent: '#a855f7',              // Purple (softer than blue)
      
      gradientStart: '#ec4899',     // Pink
      gradientMid: '#f472b6',       // Light pink
      gradientEnd: '#db2777',       // Deep pink
      
      buttonPrimary: '#ec4899',
      buttonSecondary: '#f472b6',
      cardBg: '#ffffff',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
    }
  },
  
  green: {
    id: 'green',
    name: 'Green Vitality',
    description: 'Fresh and energetic feel',
    colors: {
      navContainer: '#064e3b',      // Deep green
      navActive: '#ffffff',
      
      discover: '#ec4899',           // Pink (consistency)
      matches: '#34d399',            // Emerald
      home: '#10b981',              // Green
      connect: '#059669',            // Deep green
      vent: '#0891b2',              // Cyan (nature-inspired)
      
      gradientStart: '#10b981',     // Emerald
      gradientMid: '#34d399',       // Light green
      gradientEnd: '#059669',       // Deep green
      
      buttonPrimary: '#10b981',
      buttonSecondary: '#34d399',
      cardBg: '#ffffff',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
    }
  }
};

/**
 * Default palette ID
 */
const DEFAULT_PALETTE = 'blue';

/**
 * LocalStorage key for theme preference
 */
const STORAGE_KEY = 'codeblue_theme_palette';

/**
 * Get the currently active palette
 * @returns {object} Palette object with colors
 */
export function getPalette() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && PALETTES[saved]) {
      return PALETTES[saved];
    }
  } catch (error) {
    console.warn('Failed to load saved palette:', error);
  }
  return PALETTES[DEFAULT_PALETTE];
}

/**
 * Get the currently active palette ID
 * @returns {string} Palette ID (e.g., 'blue', 'purple')
 */
export function getCurrentPaletteId() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && PALETTES[saved]) {
      return saved;
    }
  } catch (error) {
    console.warn('Failed to load saved palette ID:', error);
  }
  return DEFAULT_PALETTE;
}

/**
 * Set a new active palette
 * @param {string} paletteId - ID of palette to activate ('blue', 'purple', 'pink', 'green')
 * @returns {object} The activated palette object
 */
export function setPalette(paletteId) {
  if (!PALETTES[paletteId]) {
    console.error(`Invalid palette ID: ${paletteId}`);
    return getPalette();
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, paletteId);
    
    // Dispatch custom event for components to listen to
    window.dispatchEvent(new CustomEvent('themechange', { 
      detail: { paletteId, palette: PALETTES[paletteId] }
    }));
    
    return PALETTES[paletteId];
  } catch (error) {
    console.error('Failed to save palette preference:', error);
    return PALETTES[paletteId];
  }
}

/**
 * Get all available palettes
 * @returns {object} All palette definitions
 */
export function getAllPalettes() {
  return PALETTES;
}

/**
 * Generate CSS custom properties for a palette
 * @param {object} palette - Palette object
 * @returns {string} CSS custom properties string
 */
export function generateCSSVariables(palette) {
  const { colors } = palette;
  return `
    --cb-nav-container: ${colors.navContainer};
    --cb-nav-active: ${colors.navActive};
    --cb-discover: ${colors.discover};
    --cb-matches: ${colors.matches};
    --cb-home: ${colors.home};
    --cb-connect: ${colors.connect};
    --cb-vent: ${colors.vent};
    --cb-gradient-start: ${colors.gradientStart};
    --cb-gradient-mid: ${colors.gradientMid};
    --cb-gradient-end: ${colors.gradientEnd};
    --cb-button-primary: ${colors.buttonPrimary};
    --cb-button-secondary: ${colors.buttonSecondary};
    --cb-card-bg: ${colors.cardBg};
    --cb-text-primary: ${colors.textPrimary};
    --cb-text-secondary: ${colors.textSecondary};
  `.trim();
}

export default {
  PALETTES,
  getPalette,
  getCurrentPaletteId,
  setPalette,
  getAllPalettes,
  generateCSSVariables
};
