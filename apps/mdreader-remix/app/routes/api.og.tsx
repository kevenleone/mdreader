import type { LoaderArgs } from '@remix-run/node';
import satori from 'satori';
import { HTMLTemplate, SVG2Img } from '~/og/og';
import { getFont } from '~/og/og.css';

export async function loader({ request }: LoaderArgs) {
  const searchParams = new URL(request.url).searchParams;

  const svg = await satori(
    HTMLTemplate({
      description: 'Lorem Ipsum...',
      host: 'mdreader.vercel.app',
      image: 'https://avatars.githubusercontent.com/u/22279592?v=4',
      title: { user: 'kevenleone', slug: 'how-to-use-css' },
    }),
    {
      width: 800,
      height: 400,
      fonts: await Promise.all([
        getFont('Inter'),
        getFont('Playfair Display'),
      ]).then((fonts) => fonts.flat()),
    }
  );

  const { data, error } = await SVG2Img(svg);

  if (error) {
    return new Response(error.toString(), {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  return new Response(data, {
    headers: {
      'Content-Type': 'image/png',
    },
  });
}
