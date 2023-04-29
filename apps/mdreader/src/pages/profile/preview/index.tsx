import { useAtomValue } from 'jotai';
import { articleAtom } from '../../../store/articles.atom';

import Article from '../../../components/article';
import BreadCrumb from '../../../components/breadcrumb/Breadcrumb';

const Preview = () => {
  const { article, markdown, commit } = useAtomValue(articleAtom);

  return (
    <>
      <BreadCrumb paths={['Home', 'Profile', article?.name]} />

      <hr className="w-full h-5" />

      {article && (
        <Article article={article} commit={commit}>
          {markdown}
        </Article>
      )}
    </>
  );
};

export { Preview };
