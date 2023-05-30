import useSWR from 'swr';
import { useMemo } from 'react';

import { githubProfileService } from '../services/githubProfile';
import useSupabase from './useSupabase';

export const useProfile = (login?: string) => {
  const client = useSupabase();
  const service = useMemo(() => githubProfileService(client), [client]);

  return useSWR({ key: 'profile', login }, login ? service.getOne : null);
};

export const useProfiles = () => {
  const client = useSupabase();
  const service = useMemo(() => githubProfileService(client), [client]);

  return useSWR('/profiles', service.getAll);
};
