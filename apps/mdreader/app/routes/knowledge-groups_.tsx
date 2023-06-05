import { Avatar, AvatarFallback, AvatarImage } from '@mdreader/interface';
import { Link, Outlet } from '@remix-run/react';
import { LoaderArgs, V2_MetaFunction } from '@remix-run/node';
import BoringAvatar from 'boring-avatars';
import classNames from 'clsx';

import { useKnowledgeGroups } from '~/hooks/useKnowledgeGroup';
import { getInitials } from '~/utils';
import KnowledgeGroupPanel from '~/components/panels/KnowledgeGroupPanel';
import useSession from '~/hooks/useSession';

export const loader = async ({ request }: LoaderArgs) => ({
  origin: new URL(request.url).origin,
});

export const meta: V2_MetaFunction = ({ data: { origin } }) => {
  return [
    { title: 'Knowledge Groups | MD Reader' },
    {
      name: 'description',
      content: 'Check the Knowledge Groups to find useful content to learn.',
    },
    {
      property: 'og:image',
      content: `${origin}/api/og?template=site&title=Knowledge Groups`,
    },
  ];
};

const KnowledgeGroups = () => {
  const { data, mutate } = useKnowledgeGroups();
  const session = useSession();

  const knowledgeGroups = data?.data ?? [];

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-medium">Knowledge Groups</h1>

        {session && (
          <KnowledgeGroupPanel mutateKnowledgeGroupGroup={mutate as any} />
        )}
      </div>

      <div className="mt-4">
        {knowledgeGroups.map((knowledgeGroup, index) => (
          <div
            className="flex items-center mb-2 p-2 justify-between border"
            key={index}
          >
            <div className="flex items-center">
              {knowledgeGroup?.image ? (
                <img
                  alt={knowledgeGroup.description}
                  className="w-16 h-16"
                  src={knowledgeGroup.image}
                />
              ) : (
                <div className="mx-2">
                  <BoringAvatar variant="bauhaus" name={knowledgeGroup.name} />
                </div>
              )}

              <div>
                <Link
                  className="font-bold text-lg"
                  to={`/knowledge-groups/${knowledgeGroup.slug}`}
                >
                  {knowledgeGroup.name}
                </Link>

                <p className="text-sm text-gray-500">
                  {knowledgeGroup.description}
                </p>
              </div>
            </div>

            <div className="flex px-3">
              {knowledgeGroup.KnowledgeGroupUsers?.map(
                (knowledgeGroupUser, index) => (
                  <Link
                    key={index}
                    to={`/profile/${knowledgeGroupUser.Profiles.login}`}
                  >
                    <Avatar
                      className={classNames('border-2', {
                        'z-0': index === 0,
                        [`-ml-3 z-[${index}]`]: index > 0,
                      })}
                    >
                      <AvatarFallback>
                        {getInitials(knowledgeGroupUser.Profiles.name)}
                      </AvatarFallback>
                      <AvatarImage
                        src={knowledgeGroupUser.Profiles.photo}
                        title={knowledgeGroupUser.Profiles.name}
                      />
                    </Avatar>
                  </Link>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      <Outlet />
    </>
  );
};

export default KnowledgeGroups;
