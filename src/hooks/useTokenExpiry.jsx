import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { getWithExpiry, setWithExpiry } from '../utils/storage';
import { useQueryClient } from '@tanstack/react-query';
import { refreshToken } from '../api';

const useTokenExpiry = (
  checkInterval = 60000, // Check token every minute
  refreshThreshold = 300000 // Refresh token when less than 5 minutes remaining
) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = useCallback(() => {
    // Clear user data from React Query cache
    queryClient.setQueryData(['userData'], null);
    queryClient.setQueryData(['authToken'], null);
    
    // Remove from storage
    localStorage.removeItem('user_access');
    localStorage.removeItem('app_user');
    
    navigate('/login');
  }, [navigate, queryClient]);

  const refreshUserToken = useCallback(async (token) => {
    try {
      const response = await refreshToken(token);
      if (response.status === 200 && response.auth) {
        // Update token with new expiry
        const ttl = 3600 * 1000; // 1 hour in milliseconds
        setWithExpiry('user_access', response.auth, ttl);
        queryClient.setQueryData(['authToken'], response.auth);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return false;
    }
  }, [queryClient]);

  useEffect(() => {
    const checkTokenStatus = async () => {
      // Get token and its expiry time
      const tokenData = localStorage.getItem('user_access');
      
      if (!tokenData) {
        logout();
        return;
      }
      
      try {
        const tokenObj = JSON.parse(tokenData);
        const { value: token, expiry } = tokenObj;
        
        if (!token) {
          logout();
          return;
        }

        // Current time
        const now = new Date().getTime();
        
        // If token is expired, logout
        if (now > expiry) {
          logout();
          return;
        }
        
        // If token will expire soon, refresh it
        const timeRemaining = expiry - now;
        if (timeRemaining < refreshThreshold) {
          const refreshed = await refreshUserToken(token);
          if (!refreshed) {
            // If refresh fails and token is very close to expiry, logout
            if (timeRemaining < 30000) { // less than 30 seconds
              logout();
            }
          }
        }
      } catch (error) {
        console.error('Error checking token:', error);
        logout();
      }
    };

    // Initial check
    checkTokenStatus();
    
    // Set up interval for periodic checks
    const intervalId = setInterval(checkTokenStatus, checkInterval);

    return () => clearInterval(intervalId);
  }, [logout, refreshUserToken, checkInterval, refreshThreshold, queryClient]);

  return null;
};

export default useTokenExpiry;
