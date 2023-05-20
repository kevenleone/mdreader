import useSWR from 'swr';

import { githubProfileService } from '../services/githubProfile';

export const useProfile = (login?: string) =>
  useSWR({ key: 'profile', login }, login ? githubProfileService.getOne : null);

export const useProfiles = () =>
  useSWR('/profiles', githubProfileService.getAll);
