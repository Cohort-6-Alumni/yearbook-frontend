import { createContext } from 'react';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';

const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['appToken', 'userData']);

  const setSession = (token) => {
    setCookie('appToken', token, {
      path: '/',
      maxAge: 3600, // 1 hour in seconds
    });
  };

  const getSession = () => {
    return cookies.appToken || null;
  };

  const setUserData = (userData) =>
    setCookie('userData', userData, {
      path: '/',
      maxAge: 3600, // 1 hour in seconds
    });

  const getUserData = () => {
    return cookies.userData || null;
  };

  const logout = () => {
    console.log('Logging out');
    removeCookie('appToken', { path: '/' });
    removeCookie('userData', { path: '/' });
  };

  return (
    <AppContext.Provider
      value={{
        setSession,
        getSession,
        setUserData,
        getUserData,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
export default ContextProvider;

// Define PropTypes
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired, //must be a a renderable element (string, number, React element).
};
