import { Markdown } from '@mdreader/markdown';
import { V2_MetaFunction, useLoaderData } from '@remix-run/react';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Home | MD Reader' }];
};

export async function loader() {
  const response = await fetch(
    `https://raw.githubusercontent.com/kevenleone/mdreader/main/README.md`
  );

  const text = await response.text();

  return text;
}

export default function MarkdownPreview() {
  const text = useLoaderData<ReturnType<typeof loader>>();

  return <Markdown params={{ path: [], project: '' }}>{text}</Markdown>;
}
