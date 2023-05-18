import { Markdown } from '@mdreader/md';
import { useAtomValue } from 'jotai';
import { atomWithCache } from 'jotai-cache';

const cachedAtom = atomWithCache(async () => {
  const response = await fetch(
    `https://raw.githubusercontent.com/kevenleone/mdreader/main/README.md`
  );

  return response.text();
});

const Home = () => {
  const text = useAtomValue(cachedAtom);

  return <Markdown params={{ path: ['/'], project: '' }}>{text}</Markdown>;
};

export default Home;
