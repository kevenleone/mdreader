import { z } from 'zod';

import { slugify } from '../utils/slugify';

export const articleSchema = z
  .object({
    description: z.string().max(250),
    featured: z.boolean(),
    file_url: z
      .string()
      .url({ message: 'Enter a valid Github URL for Article' })
      .refine(
        (fileURL) =>
          fileURL.startsWith('https://github.com') ||
          fileURL.startsWith('https://raw.githubusercontent.com'),
        'It must be a valid Github URL'
      )
      .refine((fileURL) => {
        const _file_url = fileURL.toLowerCase();

        return _file_url.endsWith('.md') || _file_url.endsWith('.markdown');
      }, `Invalid file extension, it should be ['.md', '.markdown']`),
    folder_id: z.number().optional(),
    id: z.number().optional(),
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
    folder_id: z.number().optional(),
    id: z.number().optional(),
    name: z
      .string()
      .nonempty({ message: 'Folder Name is required' })
      .min(3)
      .max(100),
    slug: z.string().optional(),
  })
  .transform((article) => ({ ...article, slug: slugify(article.name) }));

export const knowledgeSchema = z
  .object({
    blurhash: z.string().optional(),
    description: z.string().min(5).max(250),
    id: z.number().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()),
    knowledge_group_id: z.number().optional(),
    slug: z.string().optional(),
    url: z.string().url(),
  })
  .transform((knowledge) => ({
    ...knowledge,
    slug: slugify(knowledge.description),
  }));

export const knowledgeGroupSchema = z
  .object({
    description: z.string().max(250),
    id: z.number().optional(),
    image: z.string().optional().nullable(),
    name: z.string().min(3).max(50),
    private: z.boolean().default(false),
    slug: z.string().optional(),
  })
  .transform((knowledgeGroup) => ({
    ...knowledgeGroup,
    slug: slugify(knowledgeGroup.name),
  }));
