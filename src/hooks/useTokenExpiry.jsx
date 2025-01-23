import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { AppContext } from '../context/contextApi.jsx';
import { getWithExpiry } from '../utils/storage';

const useTokenExpiry = (interval = 60000) => {
  // Default to check every 1 minute
  const { logout } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = getWithExpiry('user_access');
      if (!token) {
        logout();
        navigate('/login');
      }
    };

    const intervalId = setInterval(checkTokenExpiry, interval);

    return () => clearInterval(intervalId);
  }, [logout, navigate, interval]);

  return null;
};

export default useTokenExpiry;
