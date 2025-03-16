import { useEffect, useState } from 'react';
import { getProfiles } from '../../api/index.js';
import ProfileCard from '../../components/ProfileCard.jsx';
import AvatarPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import Loader from '../../components/Loader.jsx';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useQuery } from '@tanstack/react-query';

const HomePage = ({ searchQuery }) => {
  const [page, setPage] = useState(0);
  const [active, setActive] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const { data, isLoading } = useQuery({
    queryKey: ['profiles', page],
    queryFn: () => getProfiles(page).then(res => res.data),
    keepPreviousData: true,
  });
  
  const profiles = data?.content || [];
  const totalPages = data?.totalPages || 0;

  useEffect(() => {
    document.title = 'Obsidi Academy Alumni Yearbook';
  }, []);

  const filteredProfiles = profiles.filter((profile) =>
    `${profile.firstName} ${profile.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => {
      setActive(index);
      setPage(index - 1);
    },
    className: "rounded-full",
  });

  const next = () => {
    if (active === totalPages) return;
    setActive(active + 1);
    setPage(active);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
    setPage(active - 2);
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] w-full">
        <Loader />
      </div>
    );
  }

  if (filteredProfiles.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] px-4 py-8 text-center">
        <Typography variant="h3" className="text-2xl md:text-3xl font-semibold mb-2">
          No profiles found
        </Typography>
        <Typography variant="paragraph" className="text-gray-500 text-base md:text-lg">
          Try adjusting your search criteria
        </Typography>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* Grid of profile cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 gap-x-4 mb-8">
        {filteredProfiles.map((profile, index) => (
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            animate={{ scale: hoveredIndex === index ? 1.02 : 1 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            key={profile?.profileId}
            className="flex justify-center"
          >
            <ProfileCard
              key={profile?.profileId}
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
      </div>
      
      {/* Pagination controls */}
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
        
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2">
          {getPageNumbers().map((pageNumber, index) => (
            <IconButton
              size="sm"
              key={index}
              {...getItemProps(pageNumber)}
              onClick={() => {
                if (pageNumber === '..') {
                  setActive(active + 3);
                  setPage(active + 2);
                } else {
                  setActive(pageNumber);
                  setPage(pageNumber - 1);
                }
              }}
              className="w-8 h-8 text-xs md:text-sm"
            >
              {pageNumber}
            </IconButton>
          ))}
        </div>
        
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
    </div>
  );
};

HomePage.propTypes = {
  searchQuery: PropTypes.string,
};

export default HomePage;