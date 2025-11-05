/**
 * ============================================================================
 * Error Boundary Test Utilities
 * ============================================================================
 * 
 * Helper components and utilities for testing error boundaries in development.
 * 
 * USAGE:
 * Import and temporarily add to a component to test error handling:
 * 
 * ```jsx
 * import { ThrowError } from './components/ErrorBoundaryTest';
 * 
 * // Add button in your component
 * <ThrowError message="Test error from Discover Tab" />
 * ```
 * 
 * IMPORTANT: Remove all ThrowError components before deploying to production!
 * ============================================================================
 */

import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * Component that throws an error when clicked - for testing error boundaries
 */
export function ThrowError({ message = 'Test error' }) {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error(message);
  }

  return (
    <button
      onClick={() => setShouldThrow(true)}
      className="fixed bottom-32 right-4 z-50 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700 transition-all flex items-center gap-2 text-sm font-semibold"
      aria-label="Trigger test error"
    >
      <AlertTriangle className="w-4 h-4" />
      Test Error
    </button>
  );
}

/**
 * Component that throws an error after a delay
 */
export function ThrowErrorDelayed({ delay = 2000, message = 'Delayed test error' }) {
  const [countdown, setCountdown] = useState(delay / 1000);
  const [shouldThrow, setShouldThrow] = useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShouldThrow(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (shouldThrow) {
    throw new Error(message);
  }

  return (
    <div className="fixed bottom-32 right-4 z-50 bg-orange-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold">
      Error in {countdown}s...
    </div>
  );
}

export default { ThrowError, ThrowErrorDelayed };
