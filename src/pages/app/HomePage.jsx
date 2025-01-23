import { useContext, useEffect, useState } from 'react';
import { getProfiles } from '../../api/index.js';
import { AppContext } from '../../context/contextApi.jsx';
import ProfileCard from '../../components/ProfileCard.jsx';
import AvatarPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import Loader from '../../components/Loader.jsx';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const HomePage = ({ searchQuery }) => {
  const { setUserProfilesCxt } = useContext(AppContext);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const res = await getProfiles();
        setProfiles(res?.data.content);
        setUserProfilesCxt(res?.data.content);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profiles:', err);
      }
    };

    fetchProfiles();
  }, []);
  const filteredProfiles = profiles.filter((profile) =>
    `${profile.firstName} ${profile.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-y-4 gap-x-2">
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
    </>
  );
};

HomePage.propTypes = {
  searchQuery: PropTypes.string,
};

export default HomePage;
