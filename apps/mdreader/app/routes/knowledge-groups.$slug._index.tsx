import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Separator,
} from '@mdreader/interface';
import { Link, useOutletContext } from '@remix-run/react';
import { Session } from '@supabase/supabase-js';
import { Link as LinkIcon, Flag as FlagIcon } from 'lucide-react';
import BlurhashFallback from '~/components/blurhash-fallback';
import EmptyState from '~/components/empty-state';

import KnowledgePanel from '~/components/panels/KnowledgePanel';
import { useKnowledgeBases } from '~/hooks/useKnowledgeBase';
import { KnowledgeGroup as IKnowledgeGroup, Profile } from '~/types';
import { getInitials } from '~/utils';

type KnowledgeCardProps = {
  blurhash?: string;
  description: string;
  image?: string;
  owner: Profile;
  tags: string[];
  url: string;
};

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({
  blurhash,
  description,
  image,
  owner,
  tags,
  url,
}) => (
  <div className="max-w-xs  rounded overflow-hidden shadow-lg flex flex-col justify-between border p-4">
    {image && (
      <BlurhashFallback
        blurHashProps={{}}
        blurhash={blurhash}
        description={description}
        src={image}
      />
    )}

    <div className="py-4">
      <p className="dark:text-gray-300 text-gray-800 text-base mb-2">
        {description}
      </p>

      <a
        className="text-sm text-blue-500"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {url}
      </a>
    </div>

    {tags?.length && (
      <div className="pt-4 pb-2">
        {tags.map((tag, index) => (
          <span
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            key={index}
          >
            #{tag}
          </span>
        ))}
      </div>
    )}

    <div>
      <Separator />

      <div className="flex items-center gap-2 mt-2">
        <Avatar>
          <AvatarFallback>{getInitials(owner.name)}</AvatarFallback>
          <AvatarImage src={owner.photo} />
        </Avatar>

        <Link className="w-full" to={`/profile/${owner.login}`}>
          {owner.name}
        </Link>

        <div className="flex gap-2 cursor-pointer">
          <LinkIcon size={16} />
          <FlagIcon size={16} />
        </div>
      </div>
    </div>
  </div>
);

type OutletContext = {
  knowledgeGroup: IKnowledgeGroup;
  session: Session | null;
};

const KnowledgeGroup = () => {
  const { knowledgeGroup, session } = useOutletContext<OutletContext>();
  const { data, isLoading, mutate } = useKnowledgeBases(knowledgeGroup.id);

  const knowledgeBases = data?.data ?? [];
  const hasKnowledgeBase = knowledgeBases.length > 0;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Knowledge Base</h1>
          <p className="text-muted-foreground">
            What about meet a new techonlogy every day? :)
          </p>
        </div>

        {session && hasKnowledgeBase && (
          <KnowledgePanel
            mutateKnowledgeGroup={mutate as any}
            knowledgeGroup={knowledgeGroup}
          />
        )}
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : hasKnowledgeBase ? (
        <div className="mt-10 flex flex-wrap gap-2">
          {knowledgeBases.map((knowledgeBase, index) => (
            <KnowledgeCard key={index} {...knowledgeBase} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[500px]">
          <EmptyState className="mt-10">
            <KnowledgePanel
              mutateKnowledgeGroup={mutate as any}
              knowledgeGroup={knowledgeGroup}
            />
          </EmptyState>
        </div>
      )}
    </div>
  );
};

export default KnowledgeGroup;
