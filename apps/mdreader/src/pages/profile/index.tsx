import { Folder } from "lucide-react";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";

import { FeaturedArticle } from "../../components/cards/FeatureArticle";
import { List } from "../../components/list";
import { Panel } from "../../components/panels";
import { useArticles } from "../../hooks/useArticles";
import { useFolders } from "../../hooks/useFolders";
import { userIdAtom } from "../../store/folder.atom";
import useFolderAndArticleActions from "./useFolderAndArticleActions";

const colors = [
  "from-[#D8B4FE] to-[#818CF8]",
  "from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]",
  "from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]",
];

type OutletContext = {
  folderId: number | null;
};

const MyProfile = () => {
  const userId = useAtomValue(userIdAtom);
  const { folderId } = useOutletContext<OutletContext>();

  const contentProps = {
    userId,
    folderId,
  };

  const {
    data: articles = [],
    mutate: mutateArticles,
    ...articlesProps
  } = useArticles(contentProps);

  const {
    data: folders = [],
    mutate: mutateFolders,
    ...folderProps
  } = useFolders(contentProps);

  const isContentLoading = articlesProps.isLoading || folderProps.isLoading;

  const folderAndArticleItems = useFolderAndArticleActions({
    articles,
    folders,
    mutateArticles,
    mutateFolders,
  });

  const featuredArticles = useMemo(
    () => articles.filter((article) => article.featured),
    [articles]
  );

  return (
    <div className="w-full">
      {!!featuredArticles.length && (
        <List>
          <List.Heading>Featured Articles</List.Heading>

          <div className="flex gap-6 flex-col md:flex-row mb-4">
            {featuredArticles.map((article, index) => (
              <FeaturedArticle
                key={index}
                gradient={colors[index]}
                path={`preview/${article.id}`}
                title={article.name}
                views={1000}
              />
            ))}
          </div>
        </List>
      )}

      <List>
        <List.Heading>
          <div className="flex justify-between">
            Content
            <div className="flex gap-3">
              <Panel
                mutateArticles={mutateArticles}
                mutateFolders={mutateFolders}
              />
            </div>
          </div>
        </List.Heading>

        <List.Item
          Icon={Folder}
          name=".."
          actions={[]}
          description=""
          href=""
        />

        {isContentLoading
          ? "Loading..."
          : folderAndArticleItems.map((content, index) => (
              <List.Item key={index} {...content} />
            ))}
      </List>
    </div>
  );
};

export default MyProfile;
