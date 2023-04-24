import { useAtomValue } from 'jotai';
import { articleAtom } from '../../../store/articles.atom';
import { Markdown } from '@mdreader/md';

const Preview = () => {
  const article = useAtomValue(articleAtom);

  return (
    <div>
      {article.markdown && (
        <Markdown params={{ path: ['/'], project: '' }}>
          {article.markdown}
        </Markdown>
      )}
    </div>
  );
};

export { Preview };
