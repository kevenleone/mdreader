import { KnowledgeGroup } from '~/types';
import SupabaseService, { SupabaseServiceConstructor } from './SupabaseService';

export class KnowledgeGroupService extends SupabaseService<
  KnowledgeGroup,
  any
> {
  constructor(props: Omit<SupabaseServiceConstructor, 'table'>) {
    super({
      ...props,
      table: 'KnowledgeGroup',
    });
  }
}
