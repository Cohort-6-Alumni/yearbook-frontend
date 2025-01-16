import { useContext, useEffect, useState } from 'react';
import { getProfiles } from '../../api/index.js';
import { AppContext } from '../../context/contextApi.jsx';
import ProfileCard from '../../components/ProfileCard.jsx';
import AvatarPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import Loader from '../../components/Loader.jsx';

const HomePage = () => {
  const { setUserProfilesCxt } = useContext(AppContext);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);

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

  if (loading === true) {
    return <Loader />;
  }

  if (profiles.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen fixed inset-0">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">No profiles found</h1>
          <p className="text-gray-500 mt-2">Please check back later</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-y-4 gap-x-2">
        {/*{profiles.map((profile) => (*/}
        {/*    <CustomCard*/}
        {/*    key={profile?.profileId}*/}
        {/*    id={profile?.profileId}*/}
        {/*    bio={profile?.bio}*/}
        {/*    instagram={profile?.instagram}*/}
        {/*    picture={profile?.picture}*/}
        {/*    hobbies={profile?.hobbies}*/}
        {/*    previousField={profile?.previousField}*/}
        {/*    firstName={profile?.user.firstName}*/}
        {/*    lastName={profile?.user.lastName}*/}
        {/*    />*/}
        {/*))}*/}

        {profiles.map((profile) => (
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
        ))}
      </div>
    </>
  );
};

export default HomePage;
