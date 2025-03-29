import { useState, useEffect } from 'react';

const useUserActivity = (inactivityThreshold = 1800000) => { // 30 minutes default
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const updateActivity = () => {
      setLastActivity(Date.now());
      setIsActive(true);
    };

    // Track various user activity events
    const events = [
      'mousedown', 'mousemove', 'keypress', 
      'scroll', 'touchstart', 'click'
    ];

    // Add event listeners
    events.forEach(event => {
      window.addEventListener(event, updateActivity);
    });

    // Check if user is inactive periodically
    const activityInterval = setInterval(() => {
      const now = Date.now();
      if (now - lastActivity > inactivityThreshold) {
        setIsActive(false);
      }
    }, 60000); // Check every minute

    // Cleanup
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, updateActivity);
      });
      clearInterval(activityInterval);
    };
  }, [lastActivity, inactivityThreshold]);

  return isActive;
};

export default useUserActivity;