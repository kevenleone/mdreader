import { useAtomValue } from 'jotai';
import { articleAtom } from '../../../store/articles.atom';

import Article from '../../../components/article';
import { ClicktoBack } from '../../../components/breadcrumb/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const Preview = () => {
  const { article, markdown, commit } = useAtomValue(articleAtom);

  const navigate = useNavigate();

  return (
    <>
      <ClicktoBack navigateTo={() => navigate('../')} />

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
