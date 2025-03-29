import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllMembers } from '../api';
import { getWithExpiry } from '../utils/storage';

/**
 * Hook to manage profiles and members list data with React Query
 */
const useProfiles = () => {
  const queryClient = useQueryClient();
  const token = getWithExpiry('user_access');

  // Query for fetching all members
  const { data: membersList = [] } = useQuery({
    queryKey: ['membersList'],
    queryFn: async () => {
      try {
        const response = await getAllMembers(token);
        return response?.data || [];
      } catch (error) {
        console.error('Error fetching members:', error);
        return [];
      }
    },
    enabled: !!token,
  });

  // Mutation to set profiles data
  const setProfilesMutation = useMutation({
    mutationFn: (profiles) => Promise.resolve(profiles),
    onSuccess: (profiles) => {
      queryClient.setQueryData(['profiles'], profiles);
    },
  });

  // Query for profiles
  const { data: profiles = [] } = useQuery({
    queryKey: ['profiles'],
    queryFn: () => Promise.resolve([]),
    staleTime: Infinity, // Data doesn't expire
  });

  return {
    profiles,
    membersList,
    setProfiles: setProfilesMutation.mutate,
  };
};

export default useProfiles;