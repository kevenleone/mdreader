import useSWR from 'swr';
import { useMemo } from 'react';

import { folderService } from '../services/folder';
import useSupabase from './useSupabase';

type Props = {
  userId: string;
  folderId: number | null;
};

export const useFolder = (folderId?: number) => {
  const client = useSupabase();
  const service = useMemo(() => folderService(client), [client]);

  return useSWR({ folderId, key: 'folder' }, folderId ? service.getOne : null);
};

export const useFolders = (props: Props) => {
  const client = useSupabase();
  const service = useMemo(() => folderService(client), [client]);

  return useSWR(
    props.userId
      ? {
          ...props,
          key: 'folders',
        }
      : null,
    service.getAll
  );
};
