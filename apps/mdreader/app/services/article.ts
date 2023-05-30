import { z } from 'zod';
import { SupabaseClient } from '@supabase/auth-helpers-remix';

import { articleSchema } from '../schema';
import { GithubCommit } from '../types';
import { getUserAndRepoByRawUri, getCommitDetails } from '../utils/gihub';

type Article = {
  id: number;
  featured: boolean;
  name: string;
  slug: string;
  fileUrl: string;
};

const articleService = (supabase: SupabaseClient) => ({
  async get(articleSlug: string) {
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
  },

  getAll: async ({
    folderId,
    userId,
  }: {
    folderId: number | string;
    userId: string;
  }) => {
    const { data, error } = await supabase
      .from('Articles')
      .select('*')
      .filter('folder_id', folderId ? 'eq' : 'is', folderId)
      .filter('user_id', 'eq', userId)
      .order('name', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []) as Article[];
  },

  store: (article: z.infer<typeof articleSchema>) =>
    supabase.from('Articles').upsert(article).select(),
  remove: (id: number) => supabase.from('Articles').delete().eq('id', id),
});

export { articleService };
