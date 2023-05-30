import { Markdown } from '@mdreader/markdown';
import { V2_MetaFunction } from '@remix-run/react';
import useFetch from '~/hooks/useFetch';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Home | MD Reader' }];
};

export default function MarkdownPreview() {
  const { data: markdown, isLoading } = useFetch(
    `https://raw.githubusercontent.com/kevenleone/mdreader/main/README.md`,
    undefined,
    { parseAs: 'text' }
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return <Markdown params={{ path: [], project: '' }}>{markdown}</Markdown>;
}
