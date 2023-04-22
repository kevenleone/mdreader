import { useAtomValue } from 'jotai';
import { atomWithCache } from 'jotai-cache';

import { Markdown } from '@mdreader/md';

const cachedAtom = atomWithCache(async () => {
  const response = await fetch(
    `https://raw.githubusercontent.com/liferay/liferay-frontend-projects/master/guidelines/dxp/code_review.md`
  );

  return response.text();
});

const Home = () => {
  const text = useAtomValue(cachedAtom);

  return <Markdown params={{ path: ['/'], project: '' }}>{text}</Markdown>;
};

export default Home;
