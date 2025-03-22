import { useQuery } from '@tanstack/react-query';
import OpenRoutes from './routes/OpenRoutes.jsx';
import AuthenticatedRoute from './routes/AuthenticatedRoute.jsx';
import { getWithExpiry } from './utils/storage';

const App = () => {
  // Use React Query to check authentication status
  const { data: token } = useQuery({
    queryKey: ['authToken'],
    queryFn: () => getWithExpiry('user_access'),
    staleTime: Infinity,
    refetchOnWindowFocus: false
  });

  const isAuthenticated = !!token;

  return isAuthenticated ? <AuthenticatedRoute /> : <OpenRoutes />;
};

export default App;