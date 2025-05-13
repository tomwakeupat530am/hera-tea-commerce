
import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

// Create context
const NotificationContext = createContext();

// Provider component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Show a success notification
  const showSuccess = (message, options = {}) => {
    const { duration = 1500, ...restOptions } = options;
    
    toast.success(message, {
      duration,
      ...restOptions,
    });
    
    const newNotification = {
      id: Date.now(),
      type: 'success',
      message,
      timestamp: new Date(),
    };
    
    setNotifications(prev => [newNotification, ...prev].slice(0, 10));
    return newNotification.id;
  };

  // Show an error notification
  const showError = (message, options = {}) => {
    const { duration = 3000, ...restOptions } = options;
    
    toast.error(message, {
      duration,
      ...restOptions,
    });
    
    const newNotification = {
      id: Date.now(),
      type: 'error',
      message,
      timestamp: new Date(),
    };
    
    setNotifications(prev => [newNotification, ...prev].slice(0, 10));
    return newNotification.id;
  };

  // Show an info notification
  const showInfo = (message, options = {}) => {
    const { duration = 2000, ...restOptions } = options;
    
    toast.info(message, {
      duration,
      ...restOptions,
    });
    
    const newNotification = {
      id: Date.now(),
      type: 'info',
      message,
      timestamp: new Date(),
    };
    
    setNotifications(prev => [newNotification, ...prev].slice(0, 10));
    return newNotification.id;
  };

  // Show a warning notification
  const showWarning = (message, options = {}) => {
    const { duration = 3000, ...restOptions } = options;
    
    toast.warning(message, {
      duration,
      ...restOptions,
    });
    
    const newNotification = {
      id: Date.now(),
      type: 'warning',
      message,
      timestamp: new Date(),
    };
    
    setNotifications(prev => [newNotification, ...prev].slice(0, 10));
    return newNotification.id;
  };

  // Dismiss a notification
  const dismiss = (id) => {
    toast.dismiss(id);
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Clear all notifications
  const clearAll = () => {
    toast.dismiss();
    setNotifications([]);
  };

  // Get recent notifications
  const getRecent = (count = 5) => {
    return notifications.slice(0, count);
  };

  // Context value
  const value = {
    notifications,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    dismiss,
    clearAll,
    getRecent,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook for using the notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  
  return context;
};

export default NotificationContext;
