import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { userIdAtom } from '../store/folder.atom';
import { useOutletContext } from 'react-router-dom';

type OutletContext = {
  folderId: number | null;
};

const useFolders = () => {
  const { folderId: parentFolderId } = useOutletContext<OutletContext>();
  const userId = useAtomValue(userIdAtom);

  const [folders, setFolders] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('Folders')
        .select('*')
        .filter('user_id', 'eq', userId)
        .filter('folder_id', parentFolderId ? 'eq' : 'is', parentFolderId)
        .order('name', { ascending: true });

      setFolders((data as any[]) ?? []);
    })();
  }, [parentFolderId, userId]);

  return {
    folders,
  };
};

export { useFolders };
