import useSWR from 'swr';
import { useMemo } from 'react';

import { articleService } from '../services/article';
import useSupabase from './useSupabase';

type Props = {
  userId: string | null;
  folderId: number | null;
};

const useArticles = (props: Props) => {
  const client = useSupabase();
  const service = useMemo(() => articleService(client), [client]);

  return useSWR(
    props.userId
      ? {
          ...props,
          key: 'articles',
        }
      : null,
    service.getAll
  );
};

export { useArticles };
