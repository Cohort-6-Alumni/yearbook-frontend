import { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Login from './pages/user/Login';
import UserAccount from './pages/user/UserAccount.jsx';
import HomePage from './pages/app/HomePage.jsx';
import NavLayout from './layout/NavLayout.jsx';
import { AppContext } from './context/contextApi.jsx';
import Loader from './components/Loader.jsx';

const App = () => {
  const appContext = useContext(AppContext);
  const userData = appContext.getSession();
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    if (userData) {
      setCurrentUser(userData);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [userData]);

  if (isAuthenticated === null) {
    return <Loader />;
  }
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route
        exact
        path="/userDetails"
        element={
          <NavLayout showNav user={currentUser}>
            <UserAccount user={currentUser} />
          </NavLayout>
        }
      />
      <Route
        exact
        path="/"
        element={
          <NavLayout showNav user={currentUser}>
            <HomePage />
          </NavLayout>
        }
      />
      <Route exact path="*" element={<Navigate to="/login" />} />
    </Routes>

  );
};

export default App;
