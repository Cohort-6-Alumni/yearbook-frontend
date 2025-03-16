import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router';
import { AppContext } from '../context/contextApi';
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from '@material-tailwind/react';
import { FiMenu } from 'react-icons/fi';  // Menu icon from react-icons
import { IoClose } from 'react-icons/io5'; // Close icon from react-icons

const LandingPageNavbar = () => {
  const { getSession, logout } = useContext(AppContext);
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    // Add resize listener to close mobile nav on larger screens
    const handleResize = () => {
      window.innerWidth >= 960 && setOpenNav(false);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Navigation menu for desktop and mobile
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        className="p-1 font-medium"
      >
        <Link 
          to="/about"
          onClick={() => setOpenNav(false)} 
          className="flex items-center py-2 px-3 text-base lg:text-lg font-medium text-white transition-colors duration-200 hover:bg-purple-500 hover:text-white rounded"
        >
          About Us
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="p-1 font-medium"
      >
        <Link 
          to="/yearbook"
          onClick={() => setOpenNav(false)} 
          className="flex items-center py-2 px-3 text-base lg:text-lg font-medium text-white transition-colors duration-200 hover:bg-purple-500 hover:text-white rounded"
        >
          Yearbook
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="p-1 font-medium"
      >
        {!getSession() ? (
          <Link
            to="/login"
            onClick={() => setOpenNav(false)} 
            className="flex items-center py-2 px-3 text-base lg:text-lg font-medium text-white transition-colors duration-200 hover:bg-purple-500 hover:text-white rounded"
          >
            Login
          </Link>
        ) : (
          <Button
            onClick={() => {
              logout();
              setOpenNav(false);
            }}
            variant="text"
            className="flex items-center py-2 px-3 text-base lg:text-lg font-medium text-white transition-colors duration-200 hover:bg-purple-500 hover:text-white rounded normal-case w-full justify-start"
          >
            Logout
          </Button>
        )}
      </Typography>
    </ul>
  );

  return (
    <Navbar
      className="lg:max-w-lg mx-auto px-4 py-2 lg:px-8 lg:py-4 bg-purple-600 bg-opacity-80 rounded-lg shadow-md border-none"
      shadow={false}
    >
      <div className="container mx-auto flex items-center justify-center text-white">
        {/* Desktop navigation - centered */}
        <div className="hidden lg:block">{navList}</div>

        {/* Mobile view - right aligned hamburger */}
        <div className="flex w-full items-center justify-start lg:hidden">
          <IconButton
            variant="text"
            className="h-8 w-8 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <IoClose className="h-6 w-6 text-white" />
            ) : (
              <FiMenu className="h-6 w-6 text-white" />
            )}
          </IconButton>
        </div>
      </div>

      {/* Mobile navigation */}
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
        </div>
      </Collapse>
    </Navbar>
  );
};

export default LandingPageNavbar;