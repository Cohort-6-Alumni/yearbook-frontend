import { useEffect, useState } from 'react';
import { getProfiles } from '../../api/index.js';
import ProfileCard from '../../components/ProfileCard.jsx';
import AvatarPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import Loader from '../../components/Loader.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { Button, IconButton, Typography, Select, Option, Chip } from "@material-tailwind/react";
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from "react-icons/hi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useNavigate, useLocation } from 'react-router';

const HomePage = ({ searchQuery, isLoading: isSearchLoading, searchResults, clearSearch }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get page from URL, localStorage, or default to 1
  const savedPage = parseInt(localStorage.getItem('yearbook_last_page'));
  const savedSize = parseInt(localStorage.getItem('yearbook_last_size'));
  const initialPage = parseInt(searchParams.get('page')) || savedPage || 1;
  const initialSize = parseInt(searchParams.get('size')) || savedSize || 12;
  
  const [pageSize, setPageSize] = useState(initialSize);
  const [active, setActive] = useState(initialPage);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // Calculate zero-based page index for API
  const pageIndex = active - 1;
  
  // Only fetch from API when not searching
  const { data, isLoading: isProfilesLoading } = useQuery({
    queryKey: ['profiles', pageIndex, pageSize],
    queryFn: () => getProfiles(pageIndex, pageSize).then(res => res.data),
    keepPreviousData: true,
    enabled: !searchQuery || searchQuery.trim() === '', // Only fetch when not searching
  });
  
  const profiles = data?.content || [];
  const totalPages = searchQuery 
    ? Math.ceil(searchResults.length / pageSize) 
    : (data?.totalPages || 0);

  // Update URL when page or size changes (only when not searching)
  useEffect(() => {
    if (!searchQuery) {
      const params = new URLSearchParams();
      params.set('page', active.toString());
      params.set('size', pageSize.toString());
      setSearchParams(params);
    }
  }, [active, pageSize, setSearchParams, searchQuery]);

  // Set title and clear saved navigation state when returning to yearbook
  useEffect(() => {
    document.title = 'Obsidi Academy Alumni Yearbook';
    
    // Clear saved state if we're not coming back from a profile view
    if (!location.state?.fromProfile) {
      localStorage.removeItem('yearbook_last_page');
      localStorage.removeItem('yearbook_last_size');
    }
  }, [location.state]);

  // Get the appropriate profiles to display
  const getDisplayProfiles = () => {
    if (searchQuery) {
      // If searching, paginate the search results
      const startIndex = (active - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return searchResults.slice(startIndex, endIndex);
    } else {
      // No search, return current page profiles
      return profiles;
    }
  };

  const displayProfiles = getDisplayProfiles();
  const isLoading = isProfilesLoading || isSearchLoading;

  // Navigation functions
  const next = () => {
    if (active === totalPages) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  const handleSizeChange = (value) => {
    setPageSize(parseInt(value));
    setActive(1); // Reset to first page when changing size
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const totalPageCount = totalPages;

    if (totalPageCount <= maxPagesToShow) {
      for (let i = 1; i <= totalPageCount; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, active - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(totalPageCount, startPage + maxPagesToShow - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPageCount) {
        pages.push('..');
        pages.push(totalPageCount);
      }
    }

    return pages;
  };

  const handleProfileClick = (profileId) => {
    // Save the current page/size in localStorage before navigating
    localStorage.setItem('yearbook_last_page', active.toString());
    localStorage.setItem('yearbook_last_size', pageSize.toString());
    navigate(`/profile/${profileId}`, { state: { fromYearbook: true } });
  };

  // Detect screen size for responsive pagination
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] w-full">
        <Loader />
      </div>
    );
  }

  if (displayProfiles.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] px-4 py-8 text-center">
        <Typography variant="h3" className="text-2xl md:text-3xl font-semibold mb-2">
          No profiles found
        </Typography>
        <Typography variant="paragraph" className="text-gray-500 text-base md:text-lg mb-4">
          Try adjusting your search criteria
        </Typography>
        {searchQuery && (
          <Button
            variant="outlined"
            color="gray"
            className="flex items-center gap-2"
            onClick={clearSearch}
          >
            Clear Search <IoCloseCircleOutline size={20} />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* Search indicator and controls */}
      {searchQuery && (
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
            <div className="flex items-center">
              <Typography variant="h6" className="text-gray-800 mr-2">
                Search Results:
              </Typography>
              <Chip
                value={searchQuery}
                variant="gradient"
                color="purple"
                className="rounded-full"
                dismissible={{
                  onClose: clearSearch
                }}
              />
            </div>
            <div className="flex items-center">
              <Typography variant="small" className="font-semibold">
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </Typography>
            </div>
          </div>
        </div>
      )}

      {/* Per-page selector - centered on mobile */}
      <div className="flex justify-center sm:justify-end mb-4">
        <div className="sm:w-24">
          <Select 
            label="Per page" 
            value={pageSize.toString()} 
            onChange={handleSizeChange}
            className="text-sm"
          >
            <Option value="8">8</Option>
            <Option value="12">12</Option>
            <Option value="16">16</Option>
            <Option value="24">24</Option>
          </Select>
        </div>
      </div>

      {/* Grid of profile cards with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${active}-${pageSize}-${searchQuery}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 gap-x-4 mb-8"
        >
          {displayProfiles.map((profile, index) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              animate={{ scale: hoveredIndex === index ? 1.02 : 1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              key={profile?.profileId}
              className="flex justify-center"
              onClick={() => handleProfileClick(profile?.profileId)}
            >
              <ProfileCard
                id={profile?.profileId}
                instagram={profile?.instagram}
                picture={profile?.picture || AvatarPlaceholder}
                firstName={profile?.firstName}
                lastName={profile?.lastName}
                currentRole={profile?.currentRole}
                linkedIn={profile?.linkedIn}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      
      {/* Pagination controls - only show if we have more than one page */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 mb-10">
          <Button
            variant="text"
            size="sm"
            className="flex items-center gap-1 text-sm md:text-base rounded-full"
            onClick={prev}
            disabled={active === 1}
          >
            <HiOutlineArrowNarrowLeft strokeWidth={2} className="h-4 w-4" /> 
            <span className="hidden sm:inline">Previous</span>
          </Button>
          
          {!isSmallScreen && (
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2">
              {getPageNumbers().map((pageNumber, index) => (
                <IconButton
                  size="sm"
                  key={index}
                  variant={active === pageNumber ? "filled" : "text"}
                  color="gray"
                  onClick={() => {
                    if (pageNumber === '..') {
                      setActive(active + 3);
                    } else {
                      setActive(pageNumber);
                    }
                  }}
                  className="w-8 h-8 text-xs md:text-sm rounded-full"
                >
                  {pageNumber}
                </IconButton>
              ))}
            </div>
          )}
          
          {isSmallScreen && (
            <Typography className="text-sm">
              Page {active} of {totalPages || 1}
            </Typography>
          )}
          
          <Button
            variant="text"
            size="sm"
            className="flex items-center gap-1 text-sm md:text-base rounded-full"
            onClick={next}
            disabled={active === totalPages}
          >
            <span className="hidden sm:inline">Next</span>
            <HiOutlineArrowNarrowRight strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

HomePage.propTypes = {
  searchQuery: PropTypes.string,
  isLoading: PropTypes.bool,
  searchResults: PropTypes.array,
  clearSearch: PropTypes.func.isRequired,
};

export default HomePage;