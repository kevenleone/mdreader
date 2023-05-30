import type { LoaderArgs } from '@remix-run/node';
import satori from 'satori';
import { HTMLTemplate, SVG2Img } from '~/og/og';
import { getFont } from '~/og/og.css';

export async function loader({ request }: LoaderArgs) {
  const url = new URL(decodeURIComponent(request.url).replaceAll('&amp;', '&'));
  const searchParams = url.searchParams;

  const description = searchParams.get('description') ?? '';
  const image = searchParams.get('image') ?? '';
  const title = searchParams.get('title') ?? '';
  const subtitle = searchParams.get('subtitle') ?? '';

  const svg = await satori(
    HTMLTemplate({
      description: description,
      host: url.origin,
      image: image,
      title,
      subtitle,
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
