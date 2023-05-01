import { atomWithCache } from 'jotai-cache';
import { supabase } from '../services/supabase';
import { sessionAtom } from '../hooks/useSession';
import { userAtom } from './user.atom';
import { atom } from 'jotai';

export const folderIdAtom = atom<number | null>(null);

export const userIdAtom = atomWithCache(async (get) => {
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

  return userId;
});

export const foldersAtom = atomWithCache(async (get) => {
  const userId = await get(userIdAtom);

  const { data: rows, error } = await supabase
    .from('Folders')
    .select('*')
    .filter('user_id', 'eq', userId)
    .order('name', { ascending: true });

  return {
    rows: (rows as any[]) ?? [],
    error,
  };
});
