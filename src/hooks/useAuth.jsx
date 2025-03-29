import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { getWithExpiry, setWithExpiry, removeItem } from '../utils/storage';
import { updateAccount } from '../api';

/**
 * Authentication hook using React Query
 */
export const useAuth = () => {
  const queryClient = useQueryClient();
  
  // Get user data from storage
  const getUserDataFromStorage = () => {
    return getWithExpiry('app_user');
  };

  // Get token from storage
  const getToken = () => {
    return getWithExpiry('user_access');
  };

  // Use React Query to manage user data
  const { data: user, refetch } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserDataFromStorage,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retry: 2, // Retry twice in case of failure
  });

  // Set session token with expiry
  const setSession = (token) => {
    const ttl = 3600 * 1000; // 1 hour in milliseconds
    setWithExpiry('user_access', token, ttl);
    queryClient.setQueryData(['authToken'], token);
  };

  // Set user data with expiry
  const setUserData = (userData) => {
    const ttl = 3600 * 1000; // 1 hour in milliseconds
    setWithExpiry('app_user', userData, ttl);
    queryClient.setQueryData(['userData'], userData);
  };

  // Logout user
  const logout = () => {
    removeItem('app_user');
    removeItem('user_access');
    queryClient.setQueryData(['userData'], null);
    queryClient.setQueryData(['authToken'], null);
  };

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async (userData) => {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      const response = await updateAccount(token, userData);
      return response.data;
    },
    onSuccess: (data) => {
      // Save to localStorage
      const ttl = 3600 * 1000; // 1 hour
      setWithExpiry('app_user', data, ttl);
      
      // Update React Query cache
      queryClient.setQueryData(['userData'], data);
    },
    onError: (error) => {
      console.error('Error updating user:', error);
      // Don't logout on update error, just report it
    }
  });

  // Function to manually sync user data
  const syncUserData = async () => {
    const userData = getUserDataFromStorage();
    if (userData) {
      queryClient.setQueryData(['userData'], userData);
      return userData;
    }
    
    try {
      return await refetch().then(result => result.data);
    } catch (error) {
      console.error('Error syncing user data:', error);
      return null;
    }
  };

  return {
    user,
    updateUser: updateUserMutation.mutate,
    isUpdating: updateUserMutation.isPending,
    getToken,
    setSession,
    setUserData,
    logout,
    syncUserData,
  };
};

export default useAuth;