import { z } from 'zod';

import { slugify } from '../utils/slugify';

export const articleSchema = z
  .object({
    description: z.string().max(250),
    featured: z.boolean(),
    fileUrl: z
      .string()
      .url({ message: 'Enter a valid Github URL for Article' })
      .refine(
        (fileURL) =>
          fileURL.startsWith('https://github.com') ||
          fileURL.startsWith('https://raw.githubusercontent.com'),
        'It must be a valid Github URL'
      )
      .refine((fileURL) => {
        const _fileUrl = fileURL.toLowerCase();

        return _fileUrl.endsWith('.md') || _fileUrl.endsWith('.markdown');
      }, `Invalid file extension, it should be ['.md', '.markdown']`),
    name: z
      .string()
      .nonempty({ message: 'Article Name is required' })
      .min(3)
      .max(100),
    slug: z.string().optional(),
  })
  .transform((article) => ({ ...article, slug: slugify(article.name) }));

export const folderSchema = z
  .object({
    description: z.string().max(250),
    folderId: z.number().optional(),
    name: z
      .string()
      .nonempty({ message: 'Article Name is required' })
      .min(3)
      .max(100),
    slug: z.string().optional(),
  })
  .transform((article) => ({ ...article, slug: slugify(article.name) }));
