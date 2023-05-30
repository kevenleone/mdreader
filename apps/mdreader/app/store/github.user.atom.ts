import { atomWithCache } from 'jotai-cache';
import { GithubProfile } from '../types';
import { userAtom } from './user.atom';

export const githubUserAtom = atomWithCache(async (get) => {
  const userName = get(userAtom);

  if (userName) {
    const response = await fetch(`https://api.github.com/users/${userName}`);

    const data = (await response.json()) as GithubProfile;

    return data;
  }

  return {} as GithubProfile;
});
