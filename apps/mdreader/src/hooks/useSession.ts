import { supabase } from '../services/supabase';
import { atomWithCache } from 'jotai-cache';

export const sessionAtom = atomWithCache(() => supabase.auth.getSession());

export const sessionWithGithubUserAtom = atomWithCache(async (get) => {
  const session = await get(sessionAtom);

  type SessionType = typeof session & {
    profile?: {
      bio: string;
      company: string;
    };
  };

  let _session = structuredClone(session) as SessionType;

  const githubUser = session.data.session?.user.user_metadata?.user_name;

  if (githubUser) {
    const response = await fetch(`https://api.github.com/users/${githubUser}`);

    const data = await response.json();

    _session.profile = data;
  }

  return _session;
});
