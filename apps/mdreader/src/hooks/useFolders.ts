import { useAtomValue } from 'jotai';
import { useOutletContext } from 'react-router-dom';
import useSWR from 'swr';

import { supabase } from '../services/supabase';
import { userIdAtom } from '../store/folder.atom';

type OutletContext = {
  folderId: number | null;
};

const getFolders = async ({
  folderId,
  userId,
}: {
  folderId: number | null;
  userId: string;
}) => {
  const { data, error } = await supabase
    .from('Folders')
    .select('*')
    .filter('folder_id', folderId ? 'eq' : 'is', folderId)
    .filter('user_id', 'eq', userId)
    .order('name', { ascending: true });

  return {
    data,
    error,
  };
};

const useFolders = () => {
  const userId = useAtomValue(userIdAtom);
  const { folderId } = useOutletContext<OutletContext>();

  const { data, ...swr } = useSWR(
    {
      key: 'folder',
      folderId,
      userId,
    },
    getFolders
  );

  return {
    folders: data?.data ?? [],
    ...swr,
  };
};

export { useFolders };
