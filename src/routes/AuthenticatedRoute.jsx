import { useEffect } from 'react';
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
import CustomBreadcrumbs from '../components/CustomBreadcrumbs.jsx';
import CustomFooter from '../components/CustomFooter.jsx';
import useTokenExpiry from '../hooks/useTokenExpiry.jsx';
import useUserActivity from '../hooks/useUserActivity.jsx';
import ErrorPage from '../pages/error/ErrorPage.jsx';

const AuthenticatedRoute = () => {
  // Track user activity and manage token expiry
  const isUserActive = useUserActivity();
  useTokenExpiry(isUserActive ? 60000 : 300000, 300000); // Check more frequently when user is active
  
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route path="/user/sendInvite" element={<CompleteSignup />} />
      <Route
        exact
        path="/yearbook"
        element={
          <>
            <NavLayout showNav>
              <CustomBreadcrumbs />
              <HomePage />
            </NavLayout>
            <CustomFooter />
          </>
        }
      />
      <Route
        exact
        path="/user/profile/:profileId/edit"
        element={
          <>
            <NavLayout showNav>
              <CustomBreadcrumbs />
              <Profile />
            </NavLayout>
            <CustomFooter />
          </>
        }
      />
      <Route
        exact
        path="/profile/:profileId"
        element={
          <>
            <NavLayout showNav>
              <CustomBreadcrumbs />
              <ReadOnlyProfile />
            </NavLayout>
            <CustomFooter />
          </>
        }
      />
      <Route
        exact
        path="/user/:userId/details"
        element={
          <>
            <NavLayout showNav>
              <CustomBreadcrumbs />
              <UserAccount />
            </NavLayout>
            <CustomFooter />
          </>
        }
      />
      <Route
        exact
        path="/forgot_password"
        element={
          <>
            <ForgotPassword />
            <CustomFooter />
          </>
        }
      />
      <Route
        exact
        path="/app_error"
        element={
          <>
            <ErrorPage code={400} message={'Page Not Found'} />
            <CustomFooter />
          </>
        }
      />

      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="*" element={<Navigate to="/app_error" />} />
    </Routes>
  );
};

export default AuthenticatedRoute;
