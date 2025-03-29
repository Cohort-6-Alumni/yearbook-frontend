import { FiSearch } from 'react-icons/fi';
import { IoCloseCircleOutline } from 'react-icons/io5';
import logo from '../assets/logo.png';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';

const Navbar = ({ component, onSearch }) => {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const [showClearButton, setShowClearButton] = useState(false);
  const inputRef = useRef(null);
  
  // Check if we're on the yearbook page
  const showSearchBar = location.pathname === '/yearbook';
  
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setShowClearButton(!!value);
    onSearch(value);
  };
  
  const clearSearch = () => {
    setSearchValue('');
    setShowClearButton(false);
    onSearch('');
    
    // Focus back on the input after clearing
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // If search value comes from URL params or other sources
  useEffect(() => {
    if (location.state?.searchQuery && !searchValue) {
      setSearchValue(location.state.searchQuery);
      setShowClearButton(!!location.state.searchQuery);
      onSearch(location.state.searchQuery);
    }
  }, [location.state, searchValue, onSearch]);

  return (
    <nav className="sticky top-0 z-10 bg-white pt-1 border-b border-gray-200">
      <div className="container mx-auto px-4 py-1 flex justify-between items-center">
          <img className="w-[60px] h-[60px] border-gray-300" src={logo} alt="Logo" />
        {showSearchBar && (
          <div className="relative max-w-md mx-auto w-full">
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-900 focus:outline-none"
              value={searchValue}
              onChange={handleSearch}
              ref={inputRef}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            
            {showClearButton && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <IoCloseCircleOutline size={20} />
              </button>
            )}
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
