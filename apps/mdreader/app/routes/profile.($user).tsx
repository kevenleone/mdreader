import { LoaderArgs, V2_MetaFunction } from '@remix-run/node';
import { useLoaderData, useSearchParams, Outlet } from '@remix-run/react';
import isbot from 'isbot';

import { Profile } from '~/components/profile';
import useFetch from '~/hooks/useFetch';
import { useFolder } from '~/hooks/useFolders';
import { getSupabaseServerSession } from '~/services/supabase';

export const meta: V2_MetaFunction<ReturnType<typeof loader>> = (props) => {
  return [
    { title: `${props.data.username} | MD Reader` },
    {
      property: 'og:title',
      content: `${props.data.username} | MD Reader`,
    },
    {
      property: 'og:image',
      content: `${props.data.origin}/api/og?title=${
        props.data.profile?.name ?? props.data.username
      }&description=${props?.data?.profile?.bio}&image=${
        props?.data?.profile?.avatar_url ?? ''
      }`,
    },
    {
      name: 'description',
      content: props?.data?.profile?.bio,
    },
  ];
};

export async function loader({ params, request }: LoaderArgs) {
  const url = new URL(request.url);
  const { headers, session } = await getSupabaseServerSession(request);
  const username = params?.user ?? session?.user.user_metadata.user_name;

  let profile;

  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: session?.provider_token
        ? `Bearer ${session?.provider_token}`
        : '',
    },
  });

  if (response.ok) {
    const data = await response.json();

    profile = data;
  }

  return {
    profile,
    headers,
    origin: url.origin,
    session,
    username,
  };
}

export default function UserProfile() {
  const { session, username } = useLoaderData<ReturnType<typeof loader>>();

  const [searchParams] = useSearchParams();
  const folderId = searchParams.get('folderId')
    ? Number(searchParams.get('folderId'))
    : null;

  const { data: folder } = useFolder(folderId as number | undefined);

  const { data: user, isLoading } = useFetch(
    `https://api.github.com/users/${username}`,
    {
      headers: {
        ...(session?.provider_token && {
          Authorization: `Bearer ${session?.provider_token}`,
        }),
      },
    }
  );

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-start border-gray-200 dark:border-gray-700 mx-auto">
      <Profile
        bio={user.bio}
        company={user.company}
        name={user.name}
        photo={user.avatar_url}
      />

      <Outlet context={{ folder, username, folderId }} />
    </div>
  );
}
