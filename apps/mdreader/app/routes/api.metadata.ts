import { LoaderArgs } from '@remix-run/node';
import urlMetadata from 'url-metadata';

export const loader = async (props: LoaderArgs) => {
  const searchParams = new URL(props.request.url).searchParams;

  const url = searchParams.get('url');

  if (!url) {
    return { message: 'URL is missing...' };
  }

  return urlMetadata(url);
};
