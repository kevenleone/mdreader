import React from 'react';

import { URLMetadata } from '~/types';

const MetadataPreview: React.FC<
  Pick<URLMetadata, 'description' | 'title' | 'og:image' | 'og:title' | 'url'>
> = ({ 'og:image': ogImage, 'og:title': ogTitle, description, title, url }) => (
  <div className="flex flex-col gap-2 shadow-lg border-s-muted border py-2 px-4">
    <a
      className="text-medium text-blue-800  dark:text-blue-500 cursor-pointer"
      href={url}
      target="_blank"
      rel="noreferrer noopener"
    >
      {title || ogTitle}
    </a>
    <p className="text-sm text-muted-foreground">{description}</p>

    <img
      className="max-h-[300px]"
      alt={title}
      draggable={false}
      loading="lazy"
      src={ogImage}
    />
  </div>
);

export default MetadataPreview;
