import { Avatar, AvatarFallback, AvatarImage } from '@mdreader/interface';
import { LoaderArgs, V2_MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { getSupabaseServerClient } from '~/services/supabase';
import { getInitials } from '~/utils';

export const meta: V2_MetaFunction = ({ data: { origin } }) => {
  return [
    { title: 'Users | MD Reader' },
    {
      name: 'description',
      content: 'Available Users from MD Reader',
    },
    {
      property: 'og:image',
      content: `${origin}/api/og?template=site&title=Users | MD Reader`,
    },
  ];
};

export const loader = async ({ request }: LoaderArgs) => {
  const client = await getSupabaseServerClient(request);

  const { data: profiles } = await client.from('Profiles').select('*');

  return {
    origin: new URL(request.url).origin,
    profiles: profiles ?? [],
  };
};

export default function Users() {
  const { profiles } = useLoaderData<ReturnType<typeof loader>>();

  return (
    <div>
      <h1 className="text-3xl">Users</h1>

      <ul className="mt-4">
        {profiles.map((profile) => (
          <li className="my-2">
            <Link
              className="flex align-middle items-center gap-3 hover:shadow-sm"
              to={`/profile/${profile.login}`}
            >
              <Avatar>
                <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
                <AvatarImage src={profile.photo} />
              </Avatar>

              <span>{profile.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
