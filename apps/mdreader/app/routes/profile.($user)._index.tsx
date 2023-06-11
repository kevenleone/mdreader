import { Folder } from 'lucide-react';
import { useMemo } from 'react';
import { useOutletContext } from '@remix-run/react';

import { FeaturedArticle } from '~/components/cards/FeatureArticle';
import { ConfirmDialog } from '~/components/confirm-dialog/ConfirmDialog';
import { List } from '~/components/list';
import { Panel } from '~/components/panels';
import { useArticles } from '~/hooks/useArticles';
import useFolderAndArticleActions from '~/hooks/useFolderAndArticleActions';
import { useFolders } from '~/hooks/useFolders';
import useSession from '~/hooks/useSession';
import useUserId from '~/hooks/useUserId';
import { Folder as IFolder } from '~/types';

const colors = [
  'from-[#D8B4FE] to-[#818CF8]',
  'from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]',
  'from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]',
];

type OutletContext = {
  folder?: IFolder;
  folderId: number | null;
};

const MyProfile = () => {
  const { data: userId } = useUserId();
  const { folder, folderId } = useOutletContext<OutletContext>();
  const session = useSession();

  const isMyProfile = session?.user?.id === userId;

  const contentProps = {
    userId: userId as string,
    folderId,
  };

  const {
    data: articlesData,
    mutate: mutateArticles,
    ...articlesProps
  } = useArticles(contentProps);

  const {
    data: foldersData,
    mutate: mutateFolders,
    ...folderProps
  } = useFolders(contentProps);

  const articles = articlesData?.data ?? [];
  const folders = foldersData?.data ?? [];

  const isContentLoading = articlesProps.isLoading || folderProps.isLoading;

  const { confirmDialogProps, panelProps, items } = useFolderAndArticleActions({
    articles,
    canModify: isMyProfile,
    folders,
    mutateArticles,
    mutateFolders,
  });

  const featuredArticles = useMemo(
    () => articles.filter((article) => article.featured),
    [articles]
  );

  const isFolderEmpty = !isContentLoading && !items.length;
  const previousFolder = folder?.folder_id
    ? `?folderId=${folder.folder_id}`
    : '';

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
                path={`preview/${article.id}-${article.slug}`}
                title={article.name}
                views={1000}
              />
            ))}
          </div>
        </List>
      )}

      <List>
        <List.Heading>
          {!isFolderEmpty && (
            <div className="flex justify-between">
              <span>Content</span>
              {isMyProfile && (
                <div className="flex gap-3">
                  <Panel {...panelProps} />
                </div>
              )}
            </div>
          )}
        </List.Heading>

        {folderId && (
          <List.Item Icon={Folder} name=".." href={previousFolder} />
        )}

        {!isContentLoading && !items.length && (
          <div className="mt-8">
            <div className="flex justify-center">
              <img src="/empty-state.svg" />
            </div>

            <div className="text-center flex flex-col justify-center gap-3">
              <h1 className="text-3xl">It's empty in here</h1>

              <p className="text-gray-600 dark:text-gray-400 flex-wrap">
                {isMyProfile ? (
                  <>
                    Get started by adding content to this folder.
                    <p className="mb-4">
                      You can add articles and other folders here.
                    </p>
                    <Panel {...panelProps} />
                  </>
                ) : (
                  <>
                    Oops... looks like the user forgot to add content in here :/
                  </>
                )}
              </p>
            </div>
          </div>
        )}

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
