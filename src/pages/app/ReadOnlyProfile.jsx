import { useParams } from 'react-router';
import useFetchProfile from '../../hooks/useFetchProfile.jsx';
import Loader from '../../components/Loader.jsx';

const ReadOnlyProfile = () => {
  const params = useParams();
  const { profile, loading, error } = useFetchProfile(params.profileId);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    console.error(error);
  }

  return (
    <div>
      <div>{params.profileId}</div>
      <div>{profile?.user.firstName}</div>
      <div>{profile?.user.lastName}</div>
    </div>
  );
};

export default ReadOnlyProfile;
