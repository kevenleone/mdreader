import useSWR from 'swr';

import { githubProfileService } from '../services/githubProfile';

export const useGithubProfiles = () =>
  useSWR('/githubProfiles', githubProfileService.getAll);
