import svg2img from 'svg2img';

declare module 'react' {
  interface HTMLAttributes<T> {
    tw?: string;
  }
}

type HTMLTemplateProps = {
  description?: string;
  image?: string;
  host?: string;
  title?: string;
  subtitle?: string;
};

export const HTMLTemplate = ({
  description,
  host,
  image,
  title,
  subtitle,
}: HTMLTemplateProps) => (
  <div tw="flex h-full flex-col w-full bg-white">
    <div tw="flex flex-row p-10">
      <div tw="flex flex-col">
        <p tw="text-3xl">
          {title}/<strong>{subtitle}</strong>
        </p>
        <span tw="text-gray-700 pr-30">{description}</span>
      </div>

      {image && (
        <div tw="flex absolute right-10 top-15">
          <img tw="rounded" width={100} height={100} src={image} />
        </div>
      )}
    </div>

    <div tw="flex flex-col">
      <div
        style={{
          left: 42,
          top: 42,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            width: 24,
            height: 24,
            background: 'black',
          }}
        />
        <span
          style={{
            marginLeft: 8,
            fontSize: 20,
          }}
        >
          {host}
        </span>
      </div>
    </div>
  </div>
);

export const SVG2Img = (svg: string) => {
  return new Promise(
    (
      resolve: (value: { data: Buffer | null; error: Error | null }) => void
    ) => {
      svg2img(svg, (error, buffer) => {
        if (error) {
          return resolve({ data: null, error });
        }

        resolve({ data: buffer, error: null });
      });
    }
  );
};
