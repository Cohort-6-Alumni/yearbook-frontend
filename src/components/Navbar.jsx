import { FiSearch } from 'react-icons/fi';
import logo from '../assets/logo.png';

import PropTypes from 'prop-types';

const Navbar = ({ component }) => {
  return (
    <nav className="sticky top-0 z-10 bg-white pt-6">
      <div className="container mx-auto px-4 py-1 flex justify-between items-center">
        <div>
          <img className="w-[60px] h-[60px] border-gray-300" src={logo} alt="Logo" />
        </div>
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div>
          {component}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  component: PropTypes.object,
};

export default Navbar;
