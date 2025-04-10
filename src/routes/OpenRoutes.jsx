import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/user/Login';
import HomePage from '../pages/app/HomePage.jsx';
import ForgotPassword from '../pages/user/ForgotPassword.jsx';
import LandingPage from '../pages/app/LandingPage.jsx';
import NavLayout from '../layout/NavLayout.jsx';
import ReadOnlyProfile from '../pages/app/ReadOnlyProfile.jsx';
import CustomBreadcrumbs from '../components/CustomBreadcrumbs.jsx';
import CustomFooter from '../components/CustomFooter.jsx';
import ResetPassword from '../pages/app/ResetPassword.jsx';
import CompleteSignUp from '../pages/app/CompleteSignUp.jsx';
import ErrorPage from '../pages/error/ErrorPage.jsx';

const OpenRoutes = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
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
        path="user/reset_password"
        element={
          <>
            <ResetPassword />
            <CustomFooter />
          </>
        }
      />
      <Route
        exact
        path="user/send_invite"
        element={
          <>
            <CompleteSignUp />
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

export default OpenRoutes;
