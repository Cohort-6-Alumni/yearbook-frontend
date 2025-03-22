import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getWithExpiry } from '../utils/storage';
import { useQueryClient } from '@tanstack/react-query';

const useTokenExpiry = (interval = 60000) => {
  // Default to check every 1 minute
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = getWithExpiry('user_access');
      if (!token) {
        // Clear user data from React Query cache
        queryClient.setQueryData(['userData'], null);
        queryClient.setQueryData(['authToken'], null);
        
        // Remove from storage
        localStorage.removeItem('user_access');
        localStorage.removeItem('app_user');
        
        navigate('/login');
      }
    };

    const intervalId = setInterval(checkTokenExpiry, interval);

    return () => clearInterval(intervalId);
  }, [navigate, interval, queryClient]);

  return null;
};

export default useTokenExpiry;
