import { useAtomValue } from 'jotai';

import { List } from '../../components/list';
import { Profile } from '../../components/profile';
import { articlesAtom } from '../../store/articles.atom';
import { File, Folder } from 'lucide-react';
import { githubUserAtom } from '../../store/github.user.atom';
import { foldersAtom } from '../../store/folder.atom';
import { FeaturedArticle } from '../../components/cards/FeatureArticle';

const colors = [
  'from-[#D8B4FE] to-[#818CF8]',
  'from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]',
  'from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]',
];

const MyProfile = () => {
  const { rows: articles } = useAtomValue(articlesAtom);
  const { rows: folders } = useAtomValue(foldersAtom);
  const githubUser = useAtomValue(githubUserAtom);

  return (
    <div className="flex flex-col justify-center items-start border-gray-200 dark:border-gray-700 mx-auto">
      <Profile
        bio={githubUser.bio}
        company={githubUser.company}
        name={githubUser.name}
        photo={githubUser.avatar_url}
      />

      <List>
        <List.Heading>Featured Articles</List.Heading>
        <div className="flex gap-6 flex-col md:flex-row mb-4">
          {articles.map((article, index) => (
            <FeaturedArticle
              key={index}
              gradient={colors[index]}
              path="/"
              title={article.name}
              views={1000}
            />
          ))}
        </div>
      </List>

      <List>
        <List.Heading>Articles</List.Heading>
        {articles.map((article, index) => (
          <List.Item
            key={index}
            title={article.name}
            Icon={File}
            description={'Github'}
            href={article.fileUrl}
          />
        ))}
      </List>

      <List>
        <List.Heading>Folders</List.Heading>
        {folders.map((folder, index) => (
          <List.Item
            key={index}
            title={folder.name}
            Icon={Folder}
            description={folder.description}
            href={folder.fileUrl}
          />
        ))}
      </List>
    </div>
  );
};

export default MyProfile;
