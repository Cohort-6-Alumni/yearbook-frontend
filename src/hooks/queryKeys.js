import { createQueryKeys } from '@tanstack/react-query';

/**
 * Shared query keys for the application
 */
export const keys = createQueryKeys('yearbook', {
  users: {
    auth: null,
    profile: (id) => [id],
    profiles: null,
    members: null,
  },
});

export default keys;