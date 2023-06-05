import { Link, Outlet, useParams } from '@remix-run/react';
import { Separator } from '@mdreader/interface';
import BoringAvatar from 'boring-avatars';
import { ArrowLeft } from 'lucide-react';

import { SidebarNav } from '~/components/sidebar-nav';
import { useKnowledgeGroup } from '~/hooks/useKnowledgeGroup';

const sidebarNavItems = [
  {
    title: 'Knowledge Base',
    href: '',
  },

  {
    title: 'Group Members',
    href: 'members',
  },
  {
    title: 'Settings',
    href: 'settings',
  },
];

const KnowledgeGroupOutlet = () => {
  const { slug } = useParams();

  const { data: knowledgeGroup } = useKnowledgeGroup(slug as string);

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
            className="w-16 h-16"
            src={knowledgeGroup.image}
            alt={knowledgeGroup.description}
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
          <Outlet context={{ knowledgeGroup }} />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGroupOutlet;
