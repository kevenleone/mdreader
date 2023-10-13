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

export const useKnowledgeBases = (
  knowledgeGroupId: number,
  options: { search: string }
) => {
  const service = useKnowledgeBaseService();

  return useSWR(
    `/knowledge-bases/${knowledgeGroupId}?search=${options.search}`,
    () =>
      service.getAll({
        filters: [
          {
            property: 'knowledge_group_id',
            operator: 'eq',
            value: knowledgeGroupId,
          },
          {
            active: !!options.search,
            property: 'tags',
            operator: 'cs',
            value: `{${options.search}}`,
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
