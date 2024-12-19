import { useContext } from 'react';
import OpenRoutes from './routes/OpenRoutes.jsx';
import AuthenticatedRoute from './routes/AuthenticatedRoute.jsx';
import { AppContext } from './context/contextApi';

const App = () => {
  const { getSession } = useContext(AppContext);
  const isAuthenticated = !!getSession();

  return isAuthenticated ? <AuthenticatedRoute /> : <OpenRoutes />;
};

export default App;
