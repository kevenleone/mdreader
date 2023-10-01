import { encode } from 'blurhash';

const getImageByURL = async (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = (...args) => {
      console.log('Error...', args);
      reject(args);
    };
    img.crossOrigin = 'anonymous';
  });

const getImageData = (image: HTMLImageElement) => {
  const canvas = document.createElement('canvas');

  canvas.width = image.width;
  canvas.height = image.height;

  const context = canvas.getContext('2d');

  if (context) {
    context.drawImage(image, 0, 0);

    return context.getImageData(0, 0, image.width, image.height);
  }
};

export const encodeImageToBlurhash = async (imageUrl: string) => {
  try {
    const image = await getImageByURL(imageUrl);

    const imageData = getImageData(image);

    if (!imageData) {
      return { blurhash: undefined, error: undefined };
    }

    const blurhash = encode(
      imageData.data,
      imageData.width,
      imageData.height,
      4,
      4
    );

    return {
      blurhash,
    };
  } catch (error) {
    return {
      error,
    };
  }
};
