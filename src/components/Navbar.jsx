import { FiSearch } from 'react-icons/fi';
import logo from '../assets/logo.png';
import { useLocation, Link } from 'react-router';
import PropTypes from 'prop-types';
// import { Navbar } from '@material-tailwind/react';

const Navbar = ({ component, onSearch }) => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-10 bg-white pt-1 border-b border-gray-200">
      <div className="container mx-auto px-4 py-1 flex justify-between items-center">
        <Link to={'/'}>
          <img className="w-[60px] h-[60px] border-gray-300" src={logo} alt="Logo" />
        </Link>
        {location.pathname === '/yearbook' && (
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-900 focus:outline-none"
              onChange={(e) => onSearch(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        )}
        <div>{component}</div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  component: PropTypes.node,
  onSearch: PropTypes.func.isRequired,
};

export default Navbar;
