import { LoaderArgs, V2_MetaFunction } from '@remix-run/node';
import { useLoaderData, Outlet } from '@remix-run/react';
import { Profile } from '~/components/profile';
import { getSupabaseServerSession } from '~/services/supabase';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Profile | MD Reader' }];
};

export async function loader({ params, request }: LoaderArgs) {
  const username = params?.user ?? 'liferay';

  const ENV = {
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
  };

  const { session, headers } = await getSupabaseServerSession(request, ENV);

  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      'Cache-Control': 'max-age=300, s-maxage=3600',
      Authorization: `Bearer ${session?.provider_token}`,
      cache: 'default',
    },
  });

  const data = await response.json();

  return { user: data, session, headers };
}

export default function UserProfile() {
  const { user } = useLoaderData();

  return (
    <div className="flex flex-col justify-center items-start border-gray-200 dark:border-gray-700 mx-auto">
      <Profile
        bio={user.bio}
        company={user.company}
        name={user.name}
        photo={user.avatar_url}
      />

      <Outlet context={{ folder: null }} />
    </div>
  );
}
