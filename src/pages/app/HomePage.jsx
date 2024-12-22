import CustomCard from '../../components/CustomCard.jsx';
import {useEffect, useState} from "react";
import {getProfiles} from "../../api/index.js";

const HomePage = () => {
  const [profiles, setProfiles] = useState([]);


  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await getProfiles();
        setProfiles(res?.data.content);
      } catch (err) {
        console.error("Error fetching profiles:", err);
      }
    };

    fetchProfiles();
  }, []);

  console.log("PRO",profiles);


  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {profiles.map((profile,index) => (
            <CustomCard
            key={index}
            id={index}
            bio={profile?.bio}
            instagram={profile?.instagram}
            picture={profile?.picture}
            hobbies={profile?.hobbies}
            previousField={profile?.previousField}
            firstName={profile?.user.firstName}
            lastName={profile?.user.lastName}
            />
        ))}
      </div>
    </>
  );
};

export default HomePage;
