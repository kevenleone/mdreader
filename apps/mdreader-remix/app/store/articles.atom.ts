import { atomWithCache } from 'jotai-cache';
import { supabase } from '../services/supabase';
import { atom } from 'jotai';
import { getCommitDetails, getUserAndRepoByRawUri } from '../utils/gihub';
import { GithubCommit } from '../types';

export const articleSlugAtom = atom<{ id?: string; slug?: string } | null>(
  null
);

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
    .filter('id', 'eq', articleSlug.id)
    .filter('slug', 'eq', articleSlug.slug);

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
