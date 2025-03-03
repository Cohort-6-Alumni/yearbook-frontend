import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { setWithExpiry, getWithExpiry, removeItem } from '../utils/storage';

// Create the AppContext
const AppContext = createContext();

const ContextProvider = ({ children }) => {
  // State for profiles and members list
  const [profilesCxt, setProfilesCxt] = useState([]);
  const [membersList, setMembersList] = useState([]);
  const [userDataState, setUserDataState] = useState(getWithExpiry('app_user'));

  // Function to set session token with expiry
  const setSession = (token) => {
    const ttl = 3600 * 1000; // 1 hour in milliseconds
    setWithExpiry('user_access', token, ttl);
  };

  // Function to get session token
  const getSession = () => {
    return getWithExpiry('user_access');
  };

  // Function to set user data with expiry
  const setUserData = (userData) => {
    const ttl = 3600 * 1000; // 1 hour in milliseconds
    setWithExpiry('app_user', userData, ttl);
    setUserDataState(userData);
  };

  // Function to get user data
  const getUserData = () => {
    return userDataState
  };

  // Function to log out the user
  const logout = () => {
    removeItem('app_user');
    removeItem('user_access');
  };

  // Function to set user profiles context
  const setUserProfilesCxt = (profiles) => {
    setProfilesCxt(profiles);
  };

  // Function to get user profiles context
  const getUserProfilesCxt = () => profilesCxt;

  // Function to set members list context
  const setMembersListCxt = (members) => {
    setMembersList(members);
  };

  // Function to get members list context
  const getMembersListCxt = () => membersList;

  const contextValue = useMemo(() => ({
    setSession,
    getSession,
    setUserData,
    getUserData,
    logout,
    setUserProfilesCxt,
    getUserProfilesCxt,
    setMembersListCxt,
    getMembersListCxt,
  }), [profilesCxt, membersList, userDataState]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Define PropTypes
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Required node
};

export { AppContext };
export default ContextProvider;
