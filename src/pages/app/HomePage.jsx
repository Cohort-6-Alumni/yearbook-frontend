import { useContext, useEffect, useState } from 'react';
import { getProfiles } from '../../api/index.js';
import { AppContext } from '../../context/contextApi.jsx';
import ProfileCard from '../../components/ProfileCard.jsx';
import AvatarPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import Loader from '../../components/Loader.jsx';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Button, IconButton } from "@material-tailwind/react";
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from "react-icons/hi";

const HomePage = ({ searchQuery }) => {
  const { setUserProfilesCxt } = useContext(AppContext);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [active, setActive] = useState(1);

  useEffect(() => {
    const fetchProfiles = async (page) => {
      try {
        setLoading(true);
        const res = await getProfiles(page);
        setProfiles(res?.data.content);
        setUserProfilesCxt(res?.data.content);
        setTotalPages(res?.data.totalPages);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profiles:', err);
      }
    };

    fetchProfiles(page);
  }, [page]);

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
      console.log(startPage, endPage);

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

  if (loading === true) {
    return <Loader />;
  }

  if (filteredProfiles.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen fixed inset-0">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">No profiles found</h1>
          {/* <p className="text-gray-500 mt-2">Please check back later</p> */}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-2">
        {filteredProfiles.map((profile, index) => (
          <motion.div
            whileHover={{ scale: 1.0 }}
            whileTap={{ scale: 0.85 }}
            animate={{ scale: hoveredIndex === index ? 1.0 : 0.9 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            key={profile?.profileId}
            className="cursor-pointer"
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
      <div className="flex justify-center gap-4 my-4">
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={prev}
          disabled={active === 1}
        >
          <HiOutlineArrowNarrowLeft strokeWidth={2} className="h-4 w-4" /> Previous
        </Button>
        <div className="flex items-center gap-2">
          {getPageNumbers().map((pageNumber, index) => (
            <IconButton
              key={index}
              {...getItemProps(pageNumber)}
              onClick={() => {
                if (pageNumber === '...') {
                  setActive(active + 5);
                  setPage(active + 4);
                } else {
                  setActive(pageNumber);
                  setPage(pageNumber - 1);
                }
              }}
            >
              {pageNumber}
            </IconButton>
          ))}
        </div>
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={next}
          disabled={active === totalPages}
        >
          Next
          <HiOutlineArrowNarrowRight strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

HomePage.propTypes = {
  searchQuery: PropTypes.string,
};

export default HomePage;
