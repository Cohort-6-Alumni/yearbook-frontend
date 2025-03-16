import { useContext } from 'react';
import OpenRoutes from './routes/OpenRoutes.jsx';
import AuthenticatedRoute from './routes/AuthenticatedRoute.jsx';
import { AppContext } from './context/contextApi';
import { useMediaQuery } from 'react-responsive';
import Pylon from './pages/error/Pylon.jsx';

const App = () => {
  const { getSession } = useContext(AppContext);
  const isAuthenticated = !!getSession();
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  // if (isMobile) {
  //   return <Pylon />;
  // }

  return isAuthenticated ? <AuthenticatedRoute /> : <OpenRoutes />;
};

export default App;
