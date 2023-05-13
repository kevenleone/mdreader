import { useCallback, useMemo, useState } from 'react';
import { File, Folder } from 'lucide-react';

import { useToast } from '@mdreader/ui/components/ui/use-toast';

import { articleService } from '../../services/article';
import { folderService } from '../../services/folder';
import { z } from 'zod';
import { articleSchema, folderSchema } from '../../schema';

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

type ArticleForm = z.infer<typeof articleSchema>;
type FolderForm = z.infer<typeof folderSchema>;

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

  const [panelProps, setPanelProps] = useState({ defaultValues: {} });

  const setOpen = useCallback(
    (open: boolean) => {
      setPanelProps((prevState) => ({
        ...prevState,
        defaultValues: {},
        defaultPanel: null,
        open,
      }));
    },
    [setPanelProps]
  );

  const onSave = useCallback(
    (type: 'article' | 'folder') => {
      const properties = {
        mutate: type === 'article' ? mutateArticles : mutateFolders,
        service: type === 'article' ? articleService : folderService,
      };

      return async (form: ArticleForm | FolderForm) => {
        const { error, data } = await properties.service.store(form as any);

        if (error) {
          console.error(error);

          return toast({
            description: 'There was a problem with your request.',
            title: 'Uh oh! Something went wrong.',
            variant: 'destructive',
          });
        }

        properties.mutate((prevRows: any[]) => {
          if (form.id) {
            return prevRows?.map((prevRow) => {
              if (prevRow.id === form.id) {
                return form;
              }

              return prevRow;
            });
          }

          return [
            ...(prevRows as any),
            { ...form, id: data[0]?.id ?? new Date().getTime() },
          ];
        });

        toast({
          description: `"${form.name}" ${type} was saved to your list :)`,
          title: 'Success',
        });

        setOpen(false);
      };
    },
    [setOpen]
  );

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
          onClick: () =>
            setPanelProps((panelProps) => ({
              ...panelProps,
              defaultPanel: 'article',
              defaultValues: article,
              open: true,
            })),
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
        {
          name: 'Edit',
          onClick: () =>
            setPanelProps((panelProps) => ({
              ...panelProps,
              defaultValues: folder,
              defaultPanel: 'folder',
              open: true,
            })),
        },
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
  }, [articles, folders, onDelete, setConfirmDialogProps, setPanelProps]);

  return {
    confirmDialogProps: {
      ...confirmDialogProps,
      onCancel: () =>
        setConfirmDialogProps((prevProps) => ({ ...prevProps, open: false })),
    },
    items,
    panelProps: {
      ...panelProps,
      onSave,
      setOpen,
    },
  };
};

export type OnSaveArticleAndFolder = ReturnType<
  typeof useFolderAndArticleActions
>['panelProps']['onSave'];

export default useFolderAndArticleActions;
