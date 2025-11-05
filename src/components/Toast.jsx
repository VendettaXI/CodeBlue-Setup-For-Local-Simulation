/**
 * ============================================================================
 * Toast Notification System
 * ============================================================================
 * 
 * Lightweight custom toast system themed to match CodeBlue brand.
 * Supports match notifications, messages, and action confirmations.
 * 
 * FEATURES:
 * - Multiple toast types: success, error, info, match
 * - Automatic dismiss after duration
 * - Manual dismiss with close button
 * - ARIA live region for accessibility
 * - Stacked toasts with animations
 * - Brand-themed with gradients
 * 
 * USAGE:
 * ```jsx
 * import { toast } from './components/Toast';
 * 
 * // Simple success toast
 * toast.success('Profile saved!');
 * 
 * // Match notification
 * toast.match('Sarah', '💙 You matched with Sarah!');
 * 
 * // Error
 * toast.error('Something went wrong');
 * 
 * // Custom duration
 * toast.info('Checking for updates...', { duration: 5000 });
 * ```
 * 
 * TOAST TYPES:
 * - success: Green gradient, checkmark icon
 * - error: Red gradient, alert icon
 * - info: Blue gradient, info icon
 * - match: Purple-pink gradient, heart icon
 * ============================================================================
 */

import React, { useState, useEffect, createContext, useContext } from 'react';
import { CheckCircle, AlertCircle, Info, Heart, X } from 'lucide-react';

// Toast Context
const ToastContext = createContext(null);

/**
 * Toast Container Component
 * Renders all active toasts in a fixed position
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, options = {}) => {
    const id = Date.now();
    const newToast = {
      id,
      message,
      type: options.type || 'info',
      duration: options.duration || 4000,
      profileName: options.profileName || null,
      icon: options.icon || null,
      ...options
    };

    setToasts(prev => [...prev, newToast]);

    // Auto-dismiss after duration
    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      
      {/* Toast Container */}
      <div
        className="fixed top-4 right-4 z-[100] flex flex-col gap-3 max-w-sm w-full px-4"
        aria-live="polite"
        aria-atomic="true"
        role="status"
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onDismiss={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/**
 * Individual Toast Component
 */
function Toast({ id, message, type, profileName, icon, onDismiss }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss();
    }, 300); // Match animation duration
  };

  // Toast configuration by type
  const config = {
    success: {
      gradient: 'from-green-500 to-emerald-600',
      icon: <CheckCircle className="w-5 h-5" />,
      iconBg: 'bg-white/20'
    },
    error: {
      gradient: 'from-red-500 to-rose-600',
      icon: <AlertCircle className="w-5 h-5" />,
      iconBg: 'bg-white/20'
    },
    info: {
      gradient: 'from-blue-500 to-indigo-600',
      icon: <Info className="w-5 h-5" />,
      iconBg: 'bg-white/20'
    },
    match: {
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      icon: <Heart className="w-5 h-5 fill-current" />,
      iconBg: 'bg-white/20'
    }
  };

  const currentConfig = config[type] || config.info;
  const displayIcon = icon || currentConfig.icon;

  return (
    <div
      className={`bg-gradient-to-r ${currentConfig.gradient} text-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 transform transition-all duration-300 ${
        isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
      }`}
      style={{
        animation: isExiting ? 'none' : 'slideInRight 0.3s ease-out'
      }}
    >
      {/* Icon */}
      <div className={`w-10 h-10 ${currentConfig.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
        {displayIcon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {profileName && (
          <p className="font-bold text-sm mb-0.5">{profileName}</p>
        )}
        <p className="text-sm leading-tight">{message}</p>
      </div>

      {/* Close Button */}
      <button
        onClick={handleDismiss}
        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

/**
 * Toast Hook
 * Provides access to toast functions
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

/**
 * Standalone toast utility
 * Can be called from anywhere without hook
 */
let globalToastFn = null;

export function setGlobalToast(fn) {
  globalToastFn = fn;
}

export const toast = {
  success: (message, options = {}) => {
    if (globalToastFn) {
      return globalToastFn(message, { ...options, type: 'success' });
    }
    console.warn('Toast not initialized');
  },
  error: (message, options = {}) => {
    if (globalToastFn) {
      return globalToastFn(message, { ...options, type: 'error' });
    }
    console.warn('Toast not initialized');
  },
  info: (message, options = {}) => {
    if (globalToastFn) {
      return globalToastFn(message, { ...options, type: 'info' });
    }
    console.warn('Toast not initialized');
  },
  match: (profileName, message = 'You matched!', options = {}) => {
    if (globalToastFn) {
      return globalToastFn(message, { ...options, type: 'match', profileName });
    }
    console.warn('Toast not initialized');
  }
};

export default { ToastProvider, useToast, toast, setGlobalToast };
