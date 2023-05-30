import { Markdown } from '@mdreader/markdown';
import { LoaderArgs } from '@remix-run/node';
import { V2_MetaFunction } from '@remix-run/react';
import useFetch from '~/hooks/useFetch';

export const meta: V2_MetaFunction = ({ data: { origin } }) => {
  return [
    { title: 'Home | MD Reader' },
    {
      name: 'description',
      content: 'Save and Read your favorite markdown documents from Github',
    },
    {
      property: 'og:image',
      content: `${origin}/api/og?template=site&title=MD Reader`,
    },
  ];
};

export const loader = ({ request }: LoaderArgs) => ({
  origin: new URL(request.url).origin,
});

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
