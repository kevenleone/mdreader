import useSWR from 'swr';
import { useMemo } from 'react';

import { ProfileService } from '../services/ProfileService';
import useSupabase from './useSupabase';

export const useProfileService = () => {
  const client = useSupabase();

  const service = useMemo(
    () => new ProfileService({ supabase: client }),
    [client]
  );

  return service;
};

export const useProfile = (login?: string) => {
  const service = useProfileService();

  return useSWR(
    `/profile/${login ?? ''}`,
    login
      ? () =>
          service.getOne({
            filters: [
              {
                property: 'login',
                operator: 'eq',
                value: login,
              },
            ],
          })
      : null
  );
};

export const useProfiles = () => {
  const service = useProfileService();

  return useSWR('/profiles', () =>
    service.getAll({ order: { ascending: true, property: 'login' } })
  );
};
