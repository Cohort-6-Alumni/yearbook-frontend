import { useState, useEffect } from 'react';
import { getProfile } from '../api';

const useFetchProfile = (profileId) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile(profileId);
        setProfile(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (profileId) {
      fetchProfile();
    }
  }, [profileId]);

  return { profile, loading, error };
};

export default useFetchProfile;
