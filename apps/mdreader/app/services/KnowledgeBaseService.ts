import { z } from 'zod';

import { KnowledgeBase } from '~/types';
import { knowledgeSchema } from '~/schema';
import SupabaseService, { SupabaseServiceConstructor } from './SupabaseService';

export class KnowledgeBaseService extends SupabaseService<
  KnowledgeBase,
  z.infer<typeof knowledgeSchema>
> {
  constructor(props: Omit<SupabaseServiceConstructor, 'table'>) {
    super({
      ...props,
      table: 'KnowledgeBase',
    });
  }
}
