import { Routes, Route, Navigate } from 'react-router';
import Login from '../pages/user/Login';
import CompleteSignup from '../pages/app/CompleteSignUp.jsx';
import HomePage from '../pages/app/HomePage.jsx';
import ForgotPassword from '../pages/user/ForgotPassword.jsx';
import LandingPage from '../pages/app/LandingPage.jsx';
import NavLayout from '../layout/NavLayout.jsx';

const OpenRoutes = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route path="/user/sendInvite" element={<CompleteSignup />} />
      <Route
        exact
        path="/home"
        element={
          <NavLayout showNav>
            <HomePage />
          </NavLayout>
        }
      />
      <Route
        exact
        path="/user/forgotPassword"
        element={
          <NavLayout showNav>
            <ForgotPassword />
          </NavLayout>
        }
      />

      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default OpenRoutes;
