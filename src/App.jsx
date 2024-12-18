import { Routes, Route, Navigate } from 'react-router';
import Login from './pages/user/Login';
import CompleteSignup from './pages/app/CompleteSignUp.jsx';
import HomePage from './pages/app/HomePage.jsx';
import NavLayout from './layout/NavLayout.jsx';
import ForgotPassword from './pages/user/ForgotPassword.jsx';
import AuthenticatedRoute from './components/AuthenticatedRoute.jsx';

const App = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/forgotPassword" element={<ForgotPassword />} />
      <Route
        exact
        path="/completeSignup"
        element={
          <AuthenticatedRoute
            element={
              <NavLayout showNav>
                <CompleteSignup />
              </NavLayout>
            }
          />
        }
      />
      <Route
        exact
        path="/home"
        element={
          <AuthenticatedRoute
            element={
              <NavLayout showNav>
                <HomePage />
              </NavLayout>
            }
          />
        }
      />
      <Route exact path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
