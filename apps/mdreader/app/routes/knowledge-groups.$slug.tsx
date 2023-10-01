import { Link, Outlet, V2_MetaFunction, useParams } from '@remix-run/react';
import { Separator } from '@mdreader/interface';
import BoringAvatar from 'boring-avatars';
import { ArrowLeft } from 'lucide-react';

import { SidebarNav } from '~/components/sidebar-nav';
import { useKnowledgeGroup } from '~/hooks/useKnowledgeGroup';
import { useMemo } from 'react';
import useSession from '~/hooks/useSession';
import { LoaderArgs } from '@remix-run/node';
import { getSupabaseServerClient } from '~/services/supabase';
import { KnowledgeGroupService } from '~/services/KnowledgeGroupService';

export const meta: V2_MetaFunction = ({ data: { knowledgeGroup, origin } }) => {
  return [
    { title: `${knowledgeGroup.name} | MD Reader` },
    {
      name: 'description',
      content: knowledgeGroup.description,
    },
    {
      property: 'og:image',
      content: `${origin}/api/og?template=site&title=${knowledgeGroup.name} | MD Reader&description=${knowledgeGroup.description}`,
    },
  ];
};

export const loader = async ({ request, params }: LoaderArgs) => {
  const supabase = await getSupabaseServerClient(request);

  const knowledgeGroupService = new KnowledgeGroupService({ supabase });

  const knowledgeGroup = await knowledgeGroupService.getOne({
    filters: [{ operator: 'eq', property: 'slug', value: params.slug }],
  });

  return {
    knowledgeGroup,
    origin: new URL(request.url).origin,
  };
};

const KnowledgeGroupOutlet = () => {
  const { slug } = useParams();
  const session = useSession();

  const { data: knowledgeGroup } = useKnowledgeGroup(slug as string);

  const sidebarNavItems = useMemo(() => {
    const sidebarNavItems = [
      {
        title: 'Knowledge Base',
        href: '',
      },
      {
        title: 'Group Members',
        href: 'members',
      },
    ];

    if (knowledgeGroup?.owner.id === session?.user.id) {
      sidebarNavItems.push({
        title: 'Settings',
        href: 'settings',
      });
    }

    return sidebarNavItems;
  }, [knowledgeGroup]);

  if (!knowledgeGroup) {
    return null;
  }

  return (
    <div className=" space-y-6 px-10 pb-16 md:block">
      <div className="space-y-0.5 flex justify-between">
        <div>
          <Link to="./.." title="Go back">
            <ArrowLeft size={18} />
          </Link>
          <h2 className="text-2xl font-bold tracking-tight">
            {knowledgeGroup.name}
          </h2>
          <p className="text-muted-foreground">{knowledgeGroup.description}</p>
        </div>

        {knowledgeGroup?.image ? (
          <img
            alt={knowledgeGroup.description}
            className="w-16 h-16"
            src={knowledgeGroup.image}
          />
        ) : (
          <BoringAvatar variant="bauhaus" name={knowledgeGroup.name} />
        )}
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>

        <div className="flex-1">
          <Outlet context={{ knowledgeGroup, session }} />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGroupOutlet;
