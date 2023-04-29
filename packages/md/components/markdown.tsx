import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkEmoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';
import clsx from 'clsx';

import components, { MDXComponentsOptions } from './mdx-components';

type MarkdownProps = {
  params: MDXComponentsOptions;
  maxWidth?: boolean;
  children: string;
};

const Markdown: React.FC<MarkdownProps> = ({
  children,
  params,
  maxWidth = true,
}) => {
  const updateComponents = components(params);

  return (
    <ReactMarkdown
      className={clsx('w-full prose dark:prose-dark', {
        'max-w-none': maxWidth,
      })}
      skipHtml
      components={updateComponents}
      rehypePlugins={[
        rehypeSlug,
        remarkEmoji,
        rehypeCodeTitles,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
            },
          },
        ],
        [rehypePrism, { ignoreMissing: true, showLineNumbers: true }],
      ]}
      remarkPlugins={[remarkGfm]}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
