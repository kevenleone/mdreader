import { useMemo } from 'react';
import { File, Folder } from 'lucide-react';
import { useAtomValue, useSetAtom } from 'jotai';

import { ArticlePanel } from '../../components/panels/ArticlePanel';
import { removeArticleAtom } from '../../store/articles.atom';
import { FeaturedArticle } from '../../components/cards/FeatureArticle';
import { githubUserAtom } from '../../store/github.user.atom';
import { List } from '../../components/list';
import { Profile } from '../../components/profile';
import { useFolders } from '../../hooks/useFolders';
import { useArticles } from '../../hooks/useArticles';

const colors = [
  'from-[#D8B4FE] to-[#818CF8]',
  'from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]',
  'from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]',
];

export const ProfileCard = () => {
  const githubUser = useAtomValue(githubUserAtom);

  return (
    <Profile
      bio={githubUser.bio}
      company={githubUser.company}
      name={githubUser.name}
      photo={githubUser.avatar_url}
    />
  );
};

const MyProfile = () => {
  const { folders } = useFolders();
  const { articles } = useArticles();
  const removeArticle = useSetAtom(removeArticleAtom);

  const folderAndArticleItems = useMemo(() => {
    const _articles = articles.map((article) => ({
      ...article,
      Icon: File,
      href: `preview/${article.id}`,
    }));

    const _folders = folders.map((folder) => ({
      ...folder,
      Icon: Folder,
      href: `?folderId=${folder.id}`,
    }));

    return [..._folders, ..._articles];
  }, [articles, folders]);

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
            <ArticlePanel />
          </div>
        </List.Heading>
        <List.Item
          Icon={Folder}
          name=".."
          actions={[]}
          description=""
          href=""
        />
        {folderAndArticleItems.map((content, index) => (
          <List.Item
            actions={[
              { name: 'Edit', onClick: () => alert('Test') },
              { name: 'Remove', onClick: () => removeArticle(content.id) },
            ]}
            key={index}
            {...content}
          />
        ))}
      </List>
    </div>
  );
};

export default MyProfile;
