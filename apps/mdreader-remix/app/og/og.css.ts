import type { SatoriOptions } from 'satori';

export async function getFont(
  font: string,
  weights = [400, 500, 600, 700],
  text = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\!@#$%^&*()_+-=<>?[]{}|;:,.`\'’"–—'
) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${font}:wght@${weights.join(
      ';'
    )}&text=${encodeURIComponent(text)}`,
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    }
  ).then((response) => response.text());

  const resource = css.matchAll(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/g
  );

  return Promise.all(
    [...resource]
      .map((match) => match[1])
      .map((url) => fetch(url).then((response) => response.arrayBuffer()))
      .map(async (buffer, i) => ({
        name: font,
        style: 'normal',
        weight: weights[i],
        data: await buffer,
      }))
  ) as Promise<SatoriOptions['fonts']>;
}
