import useSWR from 'swr';
import { useMemo } from 'react';

import { ArticleService } from '../services/ArticleService';
import useSupabase from './useSupabase';

type Props = {
  userId: string | null;
  folderId: number | null;
};

export const useArticleService = () => {
  const client = useSupabase();

  const service = useMemo(
    () => new ArticleService({ supabase: client }),
    [client]
  );

  return service;
};

const useArticles = ({ folderId, userId }: Props) => {
  const service = useArticleService();

  return useSWR(userId ? `/articles/${userId}/${folderId ?? 0}` : null, () =>
    service.getAll({
      filters: [
        {
          operator: folderId ? 'eq' : 'is',
          property: 'folder_id',
          value: folderId,
        },
        {
          operator: 'eq',
          property: 'user_id',
          value: userId,
        },
      ],
      order: {
        property: 'name',
        ascending: true,
      },
    })
  );
};

export { useArticles };
