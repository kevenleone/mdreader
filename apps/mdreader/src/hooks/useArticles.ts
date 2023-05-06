import useSWR from "swr";

import { articleService } from "../services/article";

type Props = {
  userId: string | null;
  folderId: number | null;
};

const useArticles = (props: Props) =>
  useSWR(
    {
      ...props,
      key: "articles",
    },
    articleService.getAll
  );

export { useArticles };
