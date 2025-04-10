import { useQuery } from '@tanstack/react-query';
import OpenRoutes from './routes/OpenRoutes.jsx';
import AuthenticatedRoute from './routes/AuthenticatedRoute.jsx';
import { getWithExpiry } from './utils/storage';
import { useEffect } from 'react';
import useAuth from './hooks/useAuth';

const App = () => {
  const { syncUserData } = useAuth();
  
  // Use React Query to check authentication status
  const { data: token, refetch: refetchToken } = useQuery({
    queryKey: ['authToken'],
    queryFn: () => getWithExpiry('user_access'),
    staleTime: Infinity,
    refetchOnWindowFocus: false
  });

  // Sync user data when component mounts
  useEffect(() => {
    // Ensure we have the latest user data on app load
    syncUserData();
    refetchToken();
  }, [syncUserData, refetchToken]);

  const isAuthenticated = !!token;

  return isAuthenticated ? <AuthenticatedRoute /> : <OpenRoutes />;
};

export default App;