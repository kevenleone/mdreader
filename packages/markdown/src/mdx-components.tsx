import ImageWithTheme from './image-with-theme';
import { Step } from './step';

export interface MDXComponentsOptions {
  path: string[];
  project: string;
}

const countSubPaths = (path: string) => {
  return path.split('../').length - 1;
};

const CustomLink = (props: any) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <a href={href} {...props}>
        {props.children}
      </a>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

function RoundedImage(props: any) {
  return <img alt={props.alt} className="rounded-lg" {...props} />;
}

const MDXComponents = ({ path, project }: MDXComponentsOptions): any => {
  return {
    Image: RoundedImage,
    ImageWithTheme,
    Step,
    a: CustomLink,
    html: <div>Blaaa</div>,
    img: (data: any) => {
      const isExternalPath = data.src.includes('http');
      let file;

      const source: string = data.src;

      const subPathCount = countSubPaths(data.src);
      const isRootPath = path.length === 1;

      if (isRootPath) {
        file = source.replace('./', '');
      } else if (subPathCount) {
        const pathPrefix = path
          .slice(0, path.length - subPathCount - 1)
          .join('/')
          .replace('blob/', '');

        file = `${pathPrefix}/${source.replace('../', '')}`;
      } else {
        const pathPrefix = path
          .slice(0, path.length - subPathCount - 1)
          .join('/')
          .replace('blob/', '');

        file = `${pathPrefix}/${source.replace('./', '')}`;
      }

      const imageSource = isExternalPath
        ? data.src
        : `https://raw.githubusercontent.com/${project}/${file}`;

      return (
        <img draggable={false} alt={data.alt} {...data} src={imageSource}></img>
      );
    },
  };
};

export default MDXComponents;
