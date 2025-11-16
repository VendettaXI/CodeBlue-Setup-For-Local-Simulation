/**
 * ============================================================================
 * Discovery Actions Persistence Utility
 * ============================================================================
 * 
 * Manages swipe history persistence in localStorage.
 * 
 * FEATURES:
 * - Save pass/favorite/connect actions
 * - Restore history on app load
 * - Limit history to prevent bloat (max 1000 entries)
 * - Timestamp tracking for analytics
 * - Profile ID tracking for later backend sync
 * 
 * DATA STRUCTURE:
 * {
 *   profileId: string | number,
 *   profileName: string,
 *   action: 'pass' | 'favorite' | 'connect',
 *   timestamp: ISO string,
 *   photoIndex: number (which photo was active)
 * }
 * 
 * USAGE:
 * ```jsx
 * import { saveAction, getActionHistory, clearHistory } from './utils/discoveryPersistence';
 * 
 * // Save an action
 * saveAction({
 *   profileId: profile.id,
 *   profileName: profile.name,
 *   action: 'connect',
 *   photoIndex: 0
 * });
 * 
 * // Get all history
 * const history = getActionHistory();
 * 
 * // Get history by action type
 * const favorites = getActionHistory('favorite');
 * ```
 * ============================================================================
 */

const STORAGE_KEY = 'codeblue_discovery_history';
const MAX_HISTORY_SIZE = 1000; // Prevent localStorage bloat

/**
 * Save a swipe action to localStorage
 * @param {Object} action - Action details
 * @param {string|number} action.profileId - Profile identifier
 * @param {string} action.profileName - Profile name for display
 * @param {'pass'|'favorite'|'connect'} action.action - Action type
 * @param {number} action.photoIndex - Active photo index
 */
export function saveAction({ profileId, profileName, action, photoIndex = 0 }) {
  try {
    const history = getActionHistory();
    
    const newEntry = {
      profileId,
      profileName,
      action,
      photoIndex,
      timestamp: new Date().toISOString()
    };

    // Add to beginning of array (most recent first)
    const updatedHistory = [newEntry, ...history];

    // Limit size to prevent localStorage overflow
    const trimmedHistory = updatedHistory.slice(0, MAX_HISTORY_SIZE);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
    
    console.log('💾 Saved action:', { profileName, action });
    return true;
  } catch (error) {
    console.error('❌ Failed to save action:', error);
    return false;
  }
}

/**
 * Get action history from localStorage
 * @param {string} filterAction - Optional: filter by action type ('pass', 'favorite', 'connect')
 * @returns {Array} Array of action objects
 */
export function getActionHistory(filterAction = null) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const history = JSON.parse(stored);

    // Filter by action type if specified
    if (filterAction) {
      return history.filter(item => item.action === filterAction);
    }

    return history;
  } catch (error) {
    console.error('❌ Failed to load action history:', error);
    return [];
  }
}

/**
 * Get action statistics
 * @returns {Object} Stats object with counts
 */
export function getActionStats() {
  const history = getActionHistory();

  return {
    total: history.length,
    passes: history.filter(a => a.action === 'pass').length,
    favorites: history.filter(a => a.action === 'favorite').length,
    connects: history.filter(a => a.action === 'connect').length,
    todayCount: history.filter(a => {
      const actionDate = new Date(a.timestamp);
      const today = new Date();
      return actionDate.toDateString() === today.toDateString();
    }).length
  };
}

/**
 * Clear all action history
 * @returns {boolean} Success status
 */
export function clearHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('🗑️ Cleared action history');
    return true;
  } catch (error) {
    console.error('❌ Failed to clear history:', error);
    return false;
  }
}

/**
 * Check if a profile was already acted upon
 * @param {string|number} profileId - Profile identifier
 * @returns {Object|null} Previous action if exists, null otherwise
 */
export function getPreviousAction(profileId) {
  const history = getActionHistory();
  return history.find(item => item.profileId === profileId) || null;
}

export default {
  saveAction,
  getActionHistory,
  getActionStats,
  clearHistory,
  getPreviousAction
};
