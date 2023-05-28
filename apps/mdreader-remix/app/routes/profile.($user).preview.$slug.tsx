import { LoaderArgs, V2_MetaFunction } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';

import { ClicktoBack } from '~/components/breadcrumb/Breadcrumb';
import { getCommitDetails, getUserAndRepoByRawUri } from '~/utils/gihub';
import { getSupabaseServerSession } from '~/services/supabase';
import { GithubCommit } from '~/types';
import Article from '~/components/article';

export const meta: V2_MetaFunction = ({ data }) => {
  const article = data.data?.article;

  if (article) {
    return [{ title: `${article.name} | MD Reader` }];
  }

  return [];
};

export const loader = async (props: LoaderArgs) => {
  const { slug: slugWithId = '' } = props.params;
  const [id, ...slug] = slugWithId.split('-');

  const ENV = {
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
  };

  const { client, headers } = await getSupabaseServerSession(
    props.request,
    ENV
  );

  let githubDetails = {
    markdown: '',
    commit: {},
  };

  const { data } = await client
    .from('Articles')
    .select('*')
    .filter('id', 'eq', Number(id))
    .filter('slug', 'eq', slug.join('-'));

  const [article] = data || [];

  if (article) {
    const { fileUrl } = article;
    const githubUserRepo = getUserAndRepoByRawUri(fileUrl);

    const [response, commitDetails] = await Promise.all([
      fetch(fileUrl),
      getCommitDetails(githubUserRepo),
    ]);

    githubDetails.commit = commitDetails[0];
    githubDetails.markdown = await response.text();
  }

  return {
    data: {
      markdown: githubDetails.markdown,
      commit: githubDetails.commit as GithubCommit,
      article,
    },
    id,
    slug,
    headers,
  };
};

const Preview = () => {
  const {
    data: { article, commit, markdown },
  } = useLoaderData<ReturnType<typeof loader>>();

  const navigate = useNavigate();

  return (
    <>
      <ClicktoBack navigateTo={() => navigate('../')} />

      <hr className="w-full h-5" />

      {article && (
        <Article article={article} commit={commit}>
          {markdown}
        </Article>
      )}
    </>
  );
};

export default Preview;
