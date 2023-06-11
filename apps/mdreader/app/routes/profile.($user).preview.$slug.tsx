import { LoaderArgs, V2_MetaFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Scripts,
  useLoaderData,
  useNavigate,
} from '@remix-run/react';
import useSWR from 'swr';

import { ClicktoBack } from '~/components/breadcrumb/Breadcrumb';
import { getCommitDetails, getUserAndRepoByRawUri } from '~/utils/gihub';
import { getSupabaseServerSession } from '~/services/supabase';
import { GithubCommit } from '~/types';
import Article from '~/components/article';
import useFetch from '~/hooks/useFetch';

export const meta: V2_MetaFunction<ReturnType<typeof loader>> = ({
  data,
  location,
}) => {
  const article = data.data?.article;
  const origin = data.origin as string;
  const [, username] = location.pathname.split('/').filter(Boolean);

  if (!article) {
    return [];
  }

  const { name, description } = article;

  const urlSearchParams = new URLSearchParams();

  urlSearchParams.set('description', description?.trim());
  urlSearchParams.set('host', origin?.trim());
  urlSearchParams.set('subtitle', name?.trim());
  urlSearchParams.set('title', username?.trim());

  return [
    { title: `${name} | MD Reader` },
    {
      property: 'og:title',
      content: `${name} | MD Reader`,
    },
    {
      property: 'og:image',
      content: `${origin}/api/og?${urlSearchParams.toString()}`,
    },
    {
      name: 'description',
      content: description,
    },
  ];
};

export const loader = async (props: LoaderArgs) => {
  const { slug: slugWithId = '' } = props.params;
  const [id, ...slug] = slugWithId.split('-');
  const url = new URL(props.request.url);

  const { client, session, headers } = await getSupabaseServerSession(
    props.request
  );

  let githubDetails = {
    commit: {},
    githubUserRepo: {},
    markdown: '',
  };

  const { data } = await client
    .from('Articles')
    .select('*')
    .filter('id', 'eq', Number(id))
    .filter('slug', 'eq', slug.join('-'));

  const [article] = data || [];

  if (article) {
    const { file_url } = article;
    const githubUserRepo = getUserAndRepoByRawUri(file_url);

    githubDetails.githubUserRepo = githubUserRepo;
  }

  return {
    data: {
      githubUserRepo: githubDetails.githubUserRepo,
      markdown: githubDetails.markdown,
      commit: githubDetails.commit as GithubCommit,
      article,
    },
    headers,
    id,
    origin: url.origin,
    session,
    slug,
  };
};

const Preview = () => {
  const {
    session,
    data: { article, githubUserRepo },
  } = useLoaderData<ReturnType<typeof loader>>();

  const { data: markdown, isLoading } = useFetch(article.file_url, undefined, {
    parseAs: 'text',
  });

  const { data: commit1 = [] } = useSWR(
    {
      key: `/${article.file_url}/commits`,
      token: session?.provider_token,
      ...githubUserRepo,
    },
    getCommitDetails
  );

  const navigate = useNavigate();

  if (isLoading) {
    return <h1>Loading Content...</h1>;
  }

  return (
    <>
      <ClicktoBack navigateTo={() => navigate(-1)} />

      <hr className="w-full h-5" />

      {article && (
        <Article article={article} commit={commit1[0]}>
          {markdown}
        </Article>
      )}
    </>
  );
};

export function ErrorBoundary({ error, ...props }: any) {
  console.error('ErrorBoundary', { error, props });

  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Unable to load preview page...</h1>
        <Scripts />
      </body>
    </html>
  );
}

export default Preview;
