import { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';

const AppContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['appToken', 'userData']);
  const [profilesCxt, setProfilesCxt] = useState([]);
  const [membersList, setMembersList] = useState([]);

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
    removeCookie('appToken', { path: '/' });
    removeCookie('userData', { path: '/' });
  };

  const setUserProfilesCxt = (profiles) => {
    setProfilesCxt(profiles);
  };
  const getUserProfilesCxt = () => profilesCxt;

  const setMembersListCxt = (members) => {
    setMembersList(members);
  };
  const getMembersListCxt = () => membersList;

  return (
    <AppContext.Provider
      value={{
        setSession,
        getSession,
        setUserData,
        getUserData,
        logout,
        setUserProfilesCxt,
        getUserProfilesCxt,
        setMembersListCxt,
        getMembersListCxt,
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
