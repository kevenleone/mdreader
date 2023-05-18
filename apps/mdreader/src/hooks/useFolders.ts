import useSWR from 'swr';

import { folderService } from '../services/folder';

type Props = {
  userId: string;
  folderId: number | null;
};

const useFolders = (props: Props) =>
  useSWR(
    props.userId
      ? {
          ...props,
          key: 'folders',
        }
      : null,
    folderService.getAll
  );

export { useFolders };
