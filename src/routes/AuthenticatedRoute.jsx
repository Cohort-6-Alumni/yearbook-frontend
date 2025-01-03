import { Route, Routes, Navigate } from 'react-router';
import Login from '../pages/user/Login';
import CompleteSignup from '../pages/app/CompleteSignUp.jsx';
import HomePage from '../pages/app/HomePage.jsx';
import NavLayout from '../layout/NavLayout.jsx';
import ForgotPassword from '../pages/user/ForgotPassword.jsx';
import LandingPage from '../pages/app/LandingPage.jsx';
import Profile from '../pages/user/Profile.jsx';
import UserAccount from '../pages/user/UserAccount.jsx';
import ReadOnlyProfile from '../pages/app/ReadOnlyProfile.jsx';

const AuthenticatedRoute = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route path="/user/sendInvite" element={<CompleteSignup />} />
      <Route
        exact
        path="/yearbook"
        element={
          <NavLayout showNav>
            <HomePage />
          </NavLayout>
        }
      />
      <Route
        exact
        path="/user/profile/:profileId/edit"
        element={
          <NavLayout showNav>
            <Profile />
          </NavLayout>
        }
      />
      <Route
        exact
        path="/public_profile/:profileId"
        element={
          <NavLayout showNav>
            <ReadOnlyProfile />
          </NavLayout>
        }
      />
      <Route
        exact
        path="/user/details"
        element={
          <NavLayout showNav>
            <UserAccount />
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
      <Route exact path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AuthenticatedRoute;
