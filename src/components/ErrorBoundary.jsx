/**
 * ============================================================================
 * ErrorBoundary Component
 * ============================================================================
 * 
 * React Error Boundary to catch and handle component errors gracefully.
 * 
 * WHAT IT DOES:
 * - Catches JavaScript errors anywhere in the child component tree
 * - Logs error details to the console
 * - Displays a friendly fallback UI instead of crashing the whole app
 * - Provides a "Try Again" button to reset the error state
 * 
 * FEATURES:
 * - Brand-themed fallback UI with gradient
 * - Retry mechanism to attempt recovery
 * - Console error reporting for debugging
 * - Accessible fallback with clear messaging
 * - Different fallback UI based on context (critical vs non-critical)
 * 
 * USAGE:
 * ```jsx
 * <ErrorBoundary fallback="section">
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 * 
 * PROPS:
 * @param {React.ReactNode} children - Components to wrap
 * @param {string} fallback - Fallback UI type: 'critical' | 'section' | 'minimal'
 * @param {string} context - Optional context name for error reporting (e.g., "Discover Tab")
 * 
 * FALLBACK TYPES:
 * - critical: Full-screen error (for app-level failures)
 * - section: Section-level error (for tab/view failures)
 * - minimal: Inline error (for small component failures)
 * ============================================================================
 */

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details to console
    console.error('🚨 Error Boundary caught an error:', {
      context: this.props.context || 'Unknown',
      error: error.toString(),
      errorInfo: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    });

    // Update state with error details
    this.setState({
      error,
      errorInfo
    });

    // TODO: Send to error reporting service (e.g., Sentry, LogRocket)
    // reportError({ error, errorInfo, context: this.props.context });
  }

  handleReset = () => {
    // Reset error state to attempt recovery
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      const { fallback = 'section', context = 'this section' } = this.props;

      // Critical full-screen error
      if (fallback === 'critical') {
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Something went wrong
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We encountered an unexpected error. Don't worry, your data is safe.
              </p>
              <button
                onClick={this.handleReset}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
                If this continues, please contact support
              </p>
            </div>
          </div>
        );
      }

      // Section-level error (for tabs, views)
      if (fallback === 'section') {
        return (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg mx-4 my-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                  Unable to load {context}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  We encountered a problem loading this section. Try refreshing.
                </p>
                <button
                  onClick={this.handleReset}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all inline-flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry
                </button>
              </div>
            </div>
          </div>
        );
      }

      // Minimal inline error
      return (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center gap-2 text-red-800 dark:text-red-300">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Error loading {context}</span>
            <button
              onClick={this.handleReset}
              className="ml-auto text-xs underline hover:no-underline"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
