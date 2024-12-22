import CustomCard from '../../components/CustomCard.jsx';
import { useContext, useEffect, useState } from "react";
import { getProfiles } from "../../api/index.js";
import { AppContext } from "../../context/contextApi.jsx";
import ProfileCard from "../../components/ProfileCard.jsx";

const HomePage = () => {
  const { setUserProfilesCxt } = useContext(AppContext);
  const [profiles, setProfiles] = useState([]);


  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await getProfiles();
        setProfiles(res?.data.content);
        setUserProfilesCxt(res?.data.content)
      } catch (err) {
        console.error("Error fetching profiles:", err);
      }
    };

    fetchProfiles();
  }, []);


console.log("PROFILES", profiles);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                picture={profile?.picture}
                firstName={profile?.user.firstName}
                lastName={profile?.user.lastName}
            />
        ))}
      </div>
    </>
  );
};

export default HomePage;
