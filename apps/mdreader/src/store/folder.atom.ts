import { atomWithCache } from 'jotai-cache';
import { supabase } from '../services/supabase';
import { sessionAtom } from '../hooks/useSession';
import { userAtom } from './user.atom';

export const foldersAtom = atomWithCache(async (get) => {
  const userName = get(userAtom);

  let userId = '';

  if (userName) {
    const { data } = await supabase
      .from('GithubProfile')
      .select('*')
      .filter('login', 'eq', userName);

    if (data?.length) {
      userId = data[0].id;
    }
  } else {
    const mySession = await get(sessionAtom);

    if (mySession.data.session?.user.id) {
      userId = mySession.data.session?.user.id;
    }
  }

  const { data: rows, error } = await supabase
    .from('Folders')
    .select('*')
    .filter('userId', 'eq', userId);

  return {
    rows: (rows as any[]) ?? [],
    error,
  };
});
