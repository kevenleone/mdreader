import { KnowledgeGroupUser } from '~/types';
import SupabaseService, { SupabaseServiceConstructor } from './SupabaseService';

export class KnowledgeGroupUserService extends SupabaseService<
  KnowledgeGroupUser,
  {
    id?: number;
    knowledge_group_id: number;
    role: 'moderator' | 'user';
    user_id: string;
  }
> {
  constructor(props: Omit<SupabaseServiceConstructor, 'table'>) {
    super({
      ...props,
      table: 'knowledge_group_users',
    });
  }
}
