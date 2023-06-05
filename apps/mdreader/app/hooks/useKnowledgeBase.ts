import useSWR from 'swr';
import { useMemo } from 'react';

import { KnowledgeBaseService } from '../services/KnowledgeBaseService';
import useSupabase from './useSupabase';

export const useKnowledgeBaseService = () => {
  const client = useSupabase();

  const service = useMemo(
    () => new KnowledgeBaseService({ supabase: client }),
    [client]
  );

  return service;
};

export const useKnowledgeBase = (slug: string) => {
  const service = useKnowledgeBaseService();

  return useSWR(`/knowledge-base/${slug}`, () =>
    service.getOne({
      filters: [
        {
          property: 'slug',
          operator: 'eq',
          value: slug,
        },
      ],
      select: '*, owner(*)',
    })
  );
};

export const useKnowledgeBases = (knowledgeGroupId: number) => {
  const service = useKnowledgeBaseService();

  return useSWR(`/knowledge-bases/${knowledgeGroupId}`, () =>
    service.getAll({
      filters: [
        {
          property: 'knowledge_group_id',
          operator: 'eq',
          value: knowledgeGroupId,
        },
      ],
      order: {
        ascending: false,
        property: 'created_at',
      },
      select: '*, owner(*)',
    })
  );
};
