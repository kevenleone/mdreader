import { useCallback, useMemo, useState } from 'react';
import { File, Folder } from 'lucide-react';

import { useToast } from '@mdreader/ui/components/ui/use-toast';

import { articleService } from '../../services/article';
import { folderService } from '../../services/folder';

type Props = {
  articles: any[];
  folders: any[];
  mutateArticles: any;
  mutateFolders: any;
};

type ConfirmDialogState = {
  open: boolean;
  onConfirm: () => void;
};

const getDescriptionMessage = (
  text: string
) => `This action cannot be undone. This will permanently delete your
"${text}".`;

const useFolderAndArticleActions = ({
  articles,
  folders,
  mutateArticles,
  mutateFolders,
}: Props) => {
  const { toast } = useToast();

  const [confirmDialogProps, setConfirmDialogProps] =
    useState<ConfirmDialogState>({
      open: false,
      onConfirm: () => undefined,
    });

  const onDelete = useCallback((record: any, mutate: any) => {
    mutate((prevRecords: any[]) =>
      prevRecords
        ? prevRecords?.filter((prevRecord) => prevRecord.id !== record.id)
        : []
    );

    toast({ title: 'Success' });
  }, []);

  const items = useMemo(() => {
    const _articles = articles.map((article) => ({
      ...article,
      actions: [
        {
          name: 'Edit',
          onClick: () => alert('Test'),
        },
        {
          name: 'Remove',
          onClick: async () =>
            setConfirmDialogProps((prevState) => ({
              ...prevState,
              description: getDescriptionMessage(article.name),
              onConfirm: () =>
                articleService
                  .remove(article.id)
                  .then(() => onDelete(article, mutateArticles)),
              open: true,
            })),
        },
      ],
      href: `preview/${article.id}`,
      Icon: File,
    }));

    const _folders = folders.map((folder) => ({
      ...folder,
      actions: [
        { name: 'Edit', onClick: () => alert('Test') },
        {
          name: 'Remove',
          onClick: async () =>
            setConfirmDialogProps((prevState) => ({
              ...prevState,
              description: getDescriptionMessage(folder.name),
              open: true,
              onConfirm: () =>
                folderService
                  .remove(folder.id)
                  .then(() => onDelete(folder, mutateFolders)),
            })),
        },
      ],
      href: `?folderId=${folder.id}`,
      Icon: Folder,
    }));

    return [..._folders, ..._articles];
  }, [
    articles,
    folders,
    mutateArticles,
    mutateFolders,
    onDelete,
    setConfirmDialogProps,
  ]);

  return {
    confirmDialogProps: {
      ...confirmDialogProps,
      onCancel: () =>
        setConfirmDialogProps((prevProps) => ({ ...prevProps, open: false })),
    },
    items,
  };
};

export default useFolderAndArticleActions;
