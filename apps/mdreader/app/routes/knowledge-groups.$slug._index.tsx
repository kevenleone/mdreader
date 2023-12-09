import { Button } from '@mdreader/interface';
import { useLocation, useNavigate, useOutletContext } from '@remix-run/react';
import { Session } from '@supabase/supabase-js';
import EmptyState from '~/components/empty-state';
import KnowledgeCard from '~/components/knowledge-group/knowledge-card';

import KnowledgePanel from '~/components/panels/KnowledgePanel';
import { useKnowledgeBases } from '~/hooks/useKnowledgeBase';
import { KnowledgeGroup as IKnowledgeGroup } from '~/types';

type OutletContext = {
  knowledgeGroup: IKnowledgeGroup;
  session: Session | null;
};

const KnowledgeGroup = () => {
  const { search } = useLocation();
  const tag = new URLSearchParams(search).get('tag') as string;
  const navigate = useNavigate();

  const { knowledgeGroup, session } = useOutletContext<OutletContext>();
  const { data, isLoading, mutate } = useKnowledgeBases(knowledgeGroup.id, {
    search: tag,
  });

  const knowledgeBases = data?.data ?? [];
  const hasKnowledgeBase = knowledgeBases.length > 0;

  return (
    <section>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Knowledge Base</h1>
          <p className="text-muted-foreground">
            What about meet a new techonlogy every day? :)
          </p>

          {tag && (
            <span>
              Tag: <code className="text-bold">{tag}</code>{' '}
              <button
                className="text-blue-700"
                onClick={() => navigate('?tag=')}
              >
                Clear
              </button>
            </span>
          )}
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
    </section>
  );
};

export default KnowledgeGroup;
