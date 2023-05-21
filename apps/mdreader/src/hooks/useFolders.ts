import useSWR from 'swr';

import { folderService } from '../services/folder';

type Props = {
  userId: string;
  folderId: number | null;
};

export const useFolder = (folderId?: number) =>
  useSWR({ folderId, key: 'folder' }, folderId ? folderService.getOne : null);

export const useFolders = (props: Props) =>
  useSWR(
    props.userId
      ? {
          ...props,
          key: 'folders',
        }
      : null,
    folderService.getAll
  );
