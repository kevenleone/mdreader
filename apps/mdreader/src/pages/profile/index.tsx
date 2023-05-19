import { Folder } from 'lucide-react';
import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';

import { FeaturedArticle } from '../../components/cards/FeatureArticle';
import { List } from '../../components/list';
import { Panel } from '../../components/panels';
import { useArticles } from '../../hooks/useArticles';
import { useFolders } from '../../hooks/useFolders';
import useFolderAndArticleActions from './useFolderAndArticleActions';
import { ConfirmDialog } from '../../components/confirm-dialog/ConfirmDialog';
import useUserId from '../../hooks/useUserId';
import useSession from '../../hooks/useSession';

const colors = [
  'from-[#D8B4FE] to-[#818CF8]',
  'from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]',
  'from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]',
];

type OutletContext = {
  folderId: number | null;
};

const MyProfile = () => {
  const { data: userId } = useUserId();
  const { folderId } = useOutletContext<OutletContext>();
  const session = useSession();

  const isMyProfile = session?.user?.id === userId;

  const contentProps = {
    userId: userId as string,
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

  const { confirmDialogProps, panelProps, items } = useFolderAndArticleActions({
    articles,
    folders,
    canModify: isMyProfile,
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
                path={`preview/${article.id}/${article.slug}`}
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
            {isMyProfile && (
              <div className="flex gap-3">
                <Panel {...panelProps} />
              </div>
            )}
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
          ? 'Loading...'
          : items.map((content, index) => (
              <List.Item key={index} {...content} />
            ))}
      </List>

      <ConfirmDialog {...confirmDialogProps} />
    </div>
  );
};

export default MyProfile;
