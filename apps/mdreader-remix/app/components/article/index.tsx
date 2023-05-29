import { Avatar, AvatarImage, AvatarFallback } from '@mdreader/interface';
import { Markdown } from '@mdreader/markdown';

import { GithubCommit } from '../../types';
import { readingTime } from '../../utils';

type ArticleProps = {
  article: any;
  children: string;
  commit: GithubCommit;
};

const ViewCounter = () => <>10 views</>;

const ArticleCommit: React.FC<{ commit: GithubCommit }> = ({ commit }) => {
  const author = commit?.author || {};
  const commitAuthor = commit?.commit?.author;

  if (!author || !commitAuthor) {
    return null;
  }

  return (
    <div className="flex items-center">
      <Avatar>
        <AvatarImage src={author.avatar_url} />
        <AvatarFallback>{commitAuthor.name}</AvatarFallback>
      </Avatar>

      <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
        {`${commitAuthor.name} / ${commit.commit.message}`}

        {new Date(commit.commit.committer.date).toLocaleDateString('en-gb')}
      </p>
    </div>
  );
};

const Article: React.FC<ArticleProps> = ({ article, children, commit }) => (
  <article className="flex flex-col items-start justify-center w-full mb-16">
    <h1 className="mb-4 font-bold tracking-tight text-black md:text-3xl sm:text-2xl lg:text-4xl dark:text-white">
      {article.name}
    </h1>

    <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
      <ArticleCommit commit={commit} />

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
        {children && readingTime(children)}
        {` • `}

        <ViewCounter />
      </p>
    </div>

    <Markdown maxWidth={false} params={{ path: ['/'], project: '' }}>
      {children}
    </Markdown>
  </article>
);

export default Article;
