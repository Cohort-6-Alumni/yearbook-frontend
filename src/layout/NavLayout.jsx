import { useState, cloneElement, Children, isValidElement, useEffect, useRef } from 'react';
import HomePage from '../pages/app/HomePage.jsx';
import Navbar from '../components/Navbar.jsx';
import PropTypes from 'prop-types';
import { Button } from '@material-tailwind/react';
import ProfileMenu from '../components/ProfileMenu.jsx';
import { useNavigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { getProfiles } from '../api';

const NavLayout = ({ children, showNav = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { user, syncUserData, getToken } = useAuth();
  const didInitialSyncRef = useRef(false);
  const token = getToken();

  // Fetch all profiles for search - using a large page size to get all profiles
  const { data: allProfilesData = {}, isLoading: isLoadingProfiles } = useQuery({
    queryKey: ['allProfilesForSearch'],
    queryFn: async () => {
      try {
        // Using a large size to fetch all profiles at once
        const response = await getProfiles(0, 100);
        return response?.data || { content: [] };
      } catch (err) {
        console.error('Error fetching all profiles:', err);
        return { content: [] };
      }
    },
    enabled: !!token && location.pathname === '/yearbook',
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
  
  // Extract profiles array from response
  const allProfiles = allProfilesData?.content || [];

  // Handle search query changes
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    // If we're not already on the yearbook page, navigate there for search results
    if (location.pathname !== '/yearbook') {
      navigate('/yearbook', { state: { searchQuery: query } });
    }
  };

  // Sync user data when component mounts
  useEffect(() => {
    const syncData = async () => {
      if (!didInitialSyncRef.current) {
        didInitialSyncRef.current = true;
        const userData = await syncUserData();
        
        if (!userData && (
          location.pathname.includes('/user/') || 
          location.pathname.includes('/profile/')
        )) {
          navigate('/login');
        }
      }
    };
    
    syncData();
  }, [syncUserData, location.pathname, navigate]);

  // Handle search from URL params
  useEffect(() => {
    if (location.state?.searchQuery && location.state.searchQuery !== searchQuery) {
      setSearchQuery(location.state.searchQuery);
    }
  }, [location.state, searchQuery]);

  const handleLogin = () => {
    navigate('/login');
  };

  let child;
  if (!user) {
    child = (
      <Button size="sm" className="bg-[#9260E2]" onClick={handleLogin}>
        Login
      </Button>
    );
  } else {
    child = <ProfileMenu />;
  }

  // Filter profiles based on search query
  const filteredProfiles = searchQuery.trim() 
    ? allProfiles.filter(profile => 
        `${profile.firstName} ${profile.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className={'flex flex-col min-h-screen hide-scrollbar'}>
      {showNav && <Navbar component={child} onSearch={handleSearch} />}
      <div className="container mx-auto max-w-5xl px-4">
        <main className="py-4 flex-grow mt-2">
          {Children.map(children, (child, index) =>
            isValidElement(child) && child.type === HomePage
              ? cloneElement(child, { 
                  searchQuery, 
                  isLoading: isLoadingProfiles,
                  searchResults: filteredProfiles,
                  clearSearch: () => setSearchQuery(''),
                  key: index 
                })
              : cloneElement(child, { key: index })
          )}
        </main>
      </div>
    </div>
  );
};

export default NavLayout;

NavLayout.propTypes = {
  children: PropTypes.node.isRequired,
  showNav: PropTypes.bool.isRequired,
};