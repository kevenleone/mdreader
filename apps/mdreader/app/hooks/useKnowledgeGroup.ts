import useSWR from 'swr';
import { useMemo } from 'react';

import { KnowledgeGroupService } from '../services/KnowledgeGroupService';
import useSupabase from './useSupabase';

export const useKnowledgeGroupService = () => {
  const client = useSupabase();

  const service = useMemo(
    () => new KnowledgeGroupService({ supabase: client }),
    [client]
  );

  return service;
};

export const useKnowledgeGroup = (slug: string) => {
  const service = useKnowledgeGroupService();

  return useSWR(`/knowledge-group/${slug}`, () =>
    service.getOne({
      filters: [
        {
          property: 'slug',
          operator: 'eq',
          value: slug,
        },
      ],
      select: '*, owner(*), knowledge_group_users(*, profile(*))',
    })
  );
};

export const useKnowledgeGroups = () => {
  const service = useKnowledgeGroupService();

  return useSWR('/knowledge-groups', () =>
    service.getAll({
      select: '*, owner(*), knowledge_group_users(*, profile(*))',
    })
  );
};
