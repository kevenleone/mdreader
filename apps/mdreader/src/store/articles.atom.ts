import { atomWithCache } from 'jotai-cache';
import { supabase } from '../services/supabase';
import { sessionAtom } from '../hooks/useSession';
import { userAtom } from './user.atom';
import { atom } from 'jotai';

export const articleSlugAtom = atom<string | null>(null);

export const articleAtom = atomWithCache(async (get) => {
  const articleSlug = get(articleSlugAtom);
  let markdown;

  const { data } = await supabase
    .from('Articles')
    .select('*')
    .filter('id', 'eq', articleSlug);

  if (data?.length) {
    const response = await fetch(data[0].fileUrl);

    markdown = await response.text();
  }

  return {
    markdown,
    article: data,
  };
});

export const articlesAtom = atomWithCache(async (get) => {
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
    .from('Articles')
    .select('*')
    .filter('userId', 'eq', userId);

  return {
    rows: (rows as any[]) ?? [],
    error,
  };
});
