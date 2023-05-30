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
  template?: 'site' | 'default';
  subtitle?: string;
};

export const HTMLTemplate = ({
  description,
  host,
  image,
  title,
  template,
  subtitle,
}: HTMLTemplateProps) => {
  if (template === 'site') {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          backgroundColor: 'white',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            height={80}
            viewBox="0 0 75 65"
            fill="black"
            style={{ margin: '0 75px' }}
          >
            <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
          </svg>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 40,
            fontStyle: 'normal',
            color: 'black',
            marginTop: 30,
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap',
          }}
        >
          <b>{title ?? 'MD Reader'}</b>
        </div>
      </div>
    );
  }

  return (
    <div tw="flex h-full flex-col w-full bg-white">
      <div tw="flex flex-row p-10">
        <div tw="flex flex-col">
          {title && subtitle ? (
            <p tw="text-3xl">
              {title}/<strong>{subtitle}</strong>
            </p>
          ) : (
            <p tw="text-5xl">{title}</p>
          )}

          <span tw="text-gray-700 pr-30">{description}</span>
        </div>

        {image && (
          <div tw="flex absolute right-10 top-15">
            <img tw="rounded" width={100} height={100} src={image} />
          </div>
        )}
      </div>

      <div tw="flex flex-col mt-10">
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
};

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
