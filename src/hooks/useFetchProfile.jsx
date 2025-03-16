import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../api';

const useFetchProfile = (profileId) => {
  return useQuery({
    queryKey: ['profile', profileId],
    queryFn: () => getProfile(profileId).then(res => res.data),
    enabled: !!profileId
  });
};

export default useFetchProfile;