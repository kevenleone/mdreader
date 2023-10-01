import { useState } from 'react';
import BlurhashFallback from '~/components/blurhash-fallback';
import { encodeImageToBlurhash } from '~/utils/blurhash';

const Blur = () => {
  const [options, setOptions] = useState({
    blurhash: 'L59@6L-U01D*r_WVR*R*00E3~V%M',
    src: 'https://images.unsplash.com/photo-1686648420191-3a4d35073fd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
  });

  async function encodeHash() {
    const image = prompt('What image....');

    const { blurhash, error } = await encodeImageToBlurhash(`${image}`);

    if (error) {
      return console.log('error', error);
    }

    console.log(blurhash);

    setOptions({
      blurhash: blurhash as string,
      src: image as string,
    });
  }

  return (
    <div className="max-w-xs">
      <button onClick={encodeHash}>Encode</button>

      <BlurhashFallback
        blurhash={options.blurhash}
        blurHashProps={{ height: 479, width: 320 }}
        description="asdad"
        src={options.src}
      />
    </div>
  );
};
export default Blur;
