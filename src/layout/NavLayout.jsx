import { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import PropTypes from 'prop-types';
import { Button } from '@material-tailwind/react';
import ProfileMenu from '../components/ProfileMenu.jsx';
import { AppContext } from '../context/contextApi.jsx';
import { useNavigate } from 'react-router';

const NavLayout = ({ children, showNav = false }) => {
  const { getUserData } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = () => {
      const userData = getUserData();
      setUser(userData);
    };
    fetchUser();
  }, [getUserData, user]);

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
      {showNav && <Navbar component={child} />}
      <div className="container mx-auto max-w-5xl px-4 ">
        <main className="py-4 flex-grow mt-2">{children}</main>
      </div>
    </div>
  );
};
export default NavLayout;

NavLayout.propTypes = {
  children: PropTypes.node.isRequired,
  showNav: PropTypes.bool.isRequired,
  user: PropTypes.object,
};
