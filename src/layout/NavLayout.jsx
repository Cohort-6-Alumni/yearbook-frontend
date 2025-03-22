import { useState, cloneElement, Children, isValidElement, useEffect } from 'react';
import HomePage from '../pages/app/HomePage.jsx';
import Navbar from '../components/Navbar.jsx';
import PropTypes from 'prop-types';
import { Button } from '@material-tailwind/react';
import ProfileMenu from '../components/ProfileMenu.jsx';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';

const NavLayout = ({ children, showNav = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, syncUserData } = useAuth();

  // Sync user data when the component mounts
  useEffect(() => {
    syncUserData();
  }, [syncUserData]);

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
    child = <ProfileMenu />;
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