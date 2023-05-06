import { useCallback, useMemo } from "react";
import { File, Folder } from "lucide-react";

import { articleService } from "../../services/article";
import { folderService } from "../../services/folder";

type Props = {
  articles: any[];
  folders: any[];
  mutateArticles: any;
  mutateFolders: any;
};

const useFolderAndArticleActions = ({
  articles,
  folders,
  mutateArticles,
  mutateFolders,
}: Props) => {
  const onDelete = useCallback((record: any, mutate: any) => {
    mutate((prevRecords: any[]) =>
      prevRecords
        ? prevRecords?.filter((prevRecord) => prevRecord.id !== record.id)
        : []
    );
  }, []);

  const folderAndArticleItems = useMemo(() => {
    const _articles = articles.map((article) => ({
      ...article,
      actions: [
        { name: "Edit", onClick: () => alert("Test") },
        {
          name: "Remove",
          onClick: async () =>
            articleService
              .remove(article.id)
              .then(() => onDelete(article, mutateArticles)),
        },
      ],
      href: `preview/${article.id}`,
      Icon: File,
    }));

    const _folders = folders.map((folder) => ({
      ...folder,
      actions: [
        { name: "Edit", onClick: () => alert("Test") },
        {
          name: "Remove",
          onClick: async () =>
            folderService
              .remove(folder.id)
              .then(() => onDelete(folder, mutateFolders)),
        },
      ],
      href: `?folderId=${folder.id}`,
      Icon: Folder,
    }));

    return [..._folders, ..._articles];
  }, [articles, folders, onDelete, mutateArticles, mutateFolders]);

  return folderAndArticleItems;
};

export default useFolderAndArticleActions;
