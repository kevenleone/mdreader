import { z } from 'zod';

import { Article, GithubCommit } from '~/types';
import { articleSchema } from '~/schema';
import { getUserAndRepoByRawUri, getCommitDetails } from '~/utils/gihub';
import SupabaseService, { SupabaseServiceConstructor } from './SupabaseService';

export class ArticleService extends SupabaseService<
  Article,
  z.infer<typeof articleSchema>
> {
  constructor(props: Omit<SupabaseServiceConstructor, 'table'>) {
    super({
      ...props,
      table: 'article',
    });
  }

  public async getOneWithGithub(props?: {
    filters?:
      | {
          property: string;
          operator:
            | 'eq'
            | 'gt'
            | 'gte'
            | 'ilike'
            | 'in'
            | 'is'
            | 'like'
            | 'lt'
            | 'lte'
            | 'neq';
          value: any;
        }[]
      | undefined;
    order?: { property: string; ascending: boolean } | undefined;
    select?: string | undefined;
  }): Promise<
    { article: Article; markdown: string; commit: GithubCommit } | undefined
  > {
    const article = await super.getOne(props);

    if (!article) {
      return;
    }

    const { file_url } = article;
    const githubUserRepo = getUserAndRepoByRawUri(file_url);

    const [response, commitDetails] = await Promise.all([
      fetch(file_url),
      getCommitDetails(githubUserRepo),
    ]);

    return {
      article,
      markdown: await response.text(),
      commit: commitDetails[0] as GithubCommit,
    };
  }
}
