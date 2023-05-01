import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { supabase } from '../services/supabase';
import { userIdAtom } from '../store/folder.atom';

type OutletContext = {
  folderId: number | null;
};

const useArticles = () => {
  const { folderId: parentFolderId } = useOutletContext<OutletContext>();
  const userId = useAtomValue(userIdAtom);

  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('Articles')
        .select('*')
        .filter('user_id', 'eq', userId)
        .filter('folder_id', parentFolderId ? 'eq' : 'is', parentFolderId)
        .order('name', { ascending: true });

      setArticles((data as any[]) ?? []);
    })();
  }, [parentFolderId, userId]);

  return {
    articles,
  };
};

export { useArticles };
