import { useContext } from 'react';
import { Route, Navigate } from 'react-router';
import PropTypes from 'prop-types';
import { AppContext } from '../context/contextApi.jsx';

const AuthenticatedRoute = ({ element, ...rest }) => {
  const { getSession } = useContext(AppContext);
  const isAuthenticated = !!getSession();

  return isAuthenticated ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
};

AuthenticatedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default AuthenticatedRoute;
