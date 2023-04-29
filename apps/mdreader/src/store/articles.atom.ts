import { atomWithCache } from 'jotai-cache';
import { supabase } from '../services/supabase';
import { sessionAtom } from '../hooks/useSession';
import { userAtom } from './user.atom';
import { atom } from 'jotai';
import { getCommitDetails, getUserAndRepoByRawUri } from '../utils/gihub';
import { GithubCommit } from '../types';

export const articleSlugAtom = atom<string | null>(null);

export const articleAtom = atomWithCache(async (get) => {
  const articleSlug = get(articleSlugAtom);

  if (!articleSlug) {
    return {};
  }

  let githubDetails = {
    markdown: '',
    commit: {},
  };

  const { data } = await supabase
    .from('Articles')
    .select('*')
    .filter('id', 'eq', articleSlug);

  const [article] = data || [];

  if (article) {
    const { fileUrl } = article;
    const githubUserRepo = getUserAndRepoByRawUri(fileUrl);

    const [response, commitDetails] = await Promise.all([
      fetch(fileUrl),
      getCommitDetails(githubUserRepo),
    ]);

    githubDetails.commit = commitDetails[0];
    githubDetails.markdown = await response.text();
  }

  return {
    markdown: githubDetails.markdown,
    commit: githubDetails.commit as GithubCommit,
    article,
  };
});

export const forceRefreshAtom = atom(0);

export const articlesAtom = atom(async (get) => {
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

  let rows = [];
  let error;

  if (userId) {
    const { data, error: articleError } = await supabase
      .from('Articles')
      .select('*')
      .filter('userId', 'eq', userId);

    rows = data as any[];
    error = articleError;
  }

  return {
    rows: (rows as any[]) ?? [],
    error,
  };
});
