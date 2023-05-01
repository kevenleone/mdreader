import { useAtomValue } from 'jotai';
import { useOutletContext } from 'react-router-dom';
import useSWR from 'swr';

import { supabase } from '../services/supabase';
import { userIdAtom } from '../store/folder.atom';

type OutletContext = {
  folderId: number | null;
};

const getArticles = async ({
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

  return {
    data,
    error,
  };
};

const useArticles = () => {
  const userId = useAtomValue(userIdAtom);
  const { folderId } = useOutletContext<OutletContext>();

  const { data, ...swr } = useSWR(
    {
      key: 'articles',
      userId,
      folderId,
    },
    getArticles
  );

  return {
    articles: data?.data ?? ([] as any[]),
    ...swr,
  };
};

export { useArticles };
