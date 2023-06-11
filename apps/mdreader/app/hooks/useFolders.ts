import { useMemo } from 'react';
import useSWR from 'swr';

import { FolderService } from '~/services/FolderService';
import useSupabase from './useSupabase';

type Props = {
  userId: string;
  folderId: number | null;
};

export const useFolderService = () => {
  const client = useSupabase();

  const service = useMemo(
    () => new FolderService({ supabase: client }),
    [client]
  );

  return service;
};

export const useFolder = (folderId?: number) => {
  const service = useFolderService();

  return useSWR({ folderId, key: 'folder' }, folderId ? service.getOne : null);
};

export const useFolders = ({ folderId, userId }: Props) => {
  const service = useFolderService();

  return useSWR(userId ? `/folders/${userId}/${folderId ?? 0}` : null, () =>
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
      select: '*, folder(*)',
    })
  );
};
