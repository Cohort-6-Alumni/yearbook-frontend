import { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import PropTypes from 'prop-types';
import { Button } from '@material-tailwind/react';
import ProfileMenu from '../components/ProfileMenu.jsx';
import { AppContext } from '../context/contextApi.jsx';

const NavLayout = ({ children, showNav = false }) => {
  const { getUserData } = useContext(AppContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      const userData = getUserData();
      setUser(userData);
    };
    fetchUser();
  }, [getUserData, user]);

  console.log(user);
  let child;
  if (!user) {
    child = (
      <Button size="sm" className="bg-[#9260E2]">
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
        <main className="flex-grow mt-12">{children}</main>
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
