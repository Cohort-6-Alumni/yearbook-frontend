import { useState, cloneElement, Children, isValidElement } from 'react';
import HomePage from '../pages/app/HomePage.jsx';
import Navbar from '../components/Navbar.jsx';
import PropTypes from 'prop-types';
import { Button } from '@material-tailwind/react';
import ProfileMenu from '../components/ProfileMenu.jsx';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getWithExpiry } from '../utils/storage';

/**
 * Function to retrieve user data from local storage
 * @returns {Object|null} User data or null if not found/expired
 */
const getUserDataFromStorage = () => {
  return getWithExpiry('app_user');
};

const NavLayout = ({ children, showNav = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Use React Query to manage user data
  const { data: user } = useQuery({
    queryKey: ['userData'],
    // Add a queryFn that returns data from localStorage
    queryFn: () => {
      const userData = getUserDataFromStorage();
      return userData; // This can be null if no data exists
    },
    // These settings make it behave like a simple state
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    // Don't show error UI for missing user data
    retry: false,
    refetchOnReconnect: false,
  });

  const handleLogin = () => {
    navigate('/login');
  };

  let child;
  if (!user) {
    child = (
      <Button size="sm" className="bg-[#9260E2]" onClick={handleLogin}>
        Login
      </Button>
    );
  } else {
    child = <ProfileMenu user={user} />;
  }

  return (
    <div className={'flex flex-col min-h-screen hide-scrollbar'}>
      {showNav && <Navbar component={child} onSearch={setSearchQuery} />}
      <div className="container mx-auto max-w-5xl px-4 ">
        <main className="py-4 flex-grow mt-2">
          {Children.map(children, (child, index) =>
            isValidElement(child) && child.type === HomePage
              ? cloneElement(child, { searchQuery, key: index })
              : cloneElement(child, { key: index })
          )}
        </main>
      </div>
    </div>
  );
};

export default NavLayout;

NavLayout.propTypes = {
  children: PropTypes.node.isRequired,
  showNav: PropTypes.bool.isRequired,
};