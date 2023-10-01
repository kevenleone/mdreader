import { useMemo } from 'react';

import useSupabase from './useSupabase';
import { KnowledgeGroupUserService } from '~/services/KnowledgeGroupUserService';

export const useKnowledgeGroupUser = () => {
  const client = useSupabase();

  const service = useMemo(
    () => new KnowledgeGroupUserService({ supabase: client }),
    [client]
  );

  return service;
};
