import { Blurhash } from 'react-blurhash';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

type BlurhashFallbackProps = {
  blurhash?: string;
  description: string;
  src: string;
};

const BlurhashFallback: React.FC<BlurhashFallbackProps> = ({
  blurhash,
  description,
  src,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setImageLoaded(true);
    };

    img.src = src;
  }, []);

  return (
    <>
      {blurhash && (
        <div
          className={clsx({
            hidden: imageLoaded,
            inline: !imageLoaded,
          })}
          style={{ display: imageLoaded ? 'none' : 'inline' }}
        >
          <Blurhash
            hash={blurhash}
            height={150}
            punch={1}
            resolutionX={32}
            resolutionY={32}
            width={286}
          />
        </div>
      )}

      <img
        className={clsx({
          inline: imageLoaded,
          hidden: !imageLoaded,
        })}
        alt={description}
        draggable={false}
        onLoad={() => setImageLoaded(true)}
        src={src}
      />
    </>
  );
};

export default BlurhashFallback;
