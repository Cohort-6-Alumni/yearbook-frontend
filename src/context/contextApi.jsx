import { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import { setWithExpiry, getWithExpiry, removeItem } from '../utils/storage';

const AppContext = createContext();

const ContextProvider = ({ children }) => {
  // const [cookies, setCookie, removeCookie] = useCookies(['appToken', 'userData']);
  const [profilesCxt, setProfilesCxt] = useState([]);
  const [membersList, setMembersList] = useState([]);

  const setSession = (token) => {
    // setCookie('appToken', token, {
    //   path: '/',
    //   maxAge: 3600, // 1 hour in seconds
    //   sameSite: 'lax',
    // });
    const ttl = 3600 * 1000; // 1 hour in milliseconds
    setWithExpiry('user_access', token, ttl);
  };

  const getSession = () => {
    return getWithExpiry('user_access');
    // return cookies.appToken || null;
  };

  const setUserData = (userData) => {
 
    const ttl = 3600 * 1000; // 1 hour in milliseconds
    setWithExpiry('app_user', userData, ttl);
  };

  const getUserData = () => {
    // return cookies.userData || null;
    const data = getWithExpiry('app_user');
    // setUserDataState(data);
    return data;
  };

  const logout = () => {
    // removeCookie('appToken', { path: '/' });
    // removeCookie('userData', { path: '/' });
    removeItem('app_user');
    removeItem('user_access');
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
