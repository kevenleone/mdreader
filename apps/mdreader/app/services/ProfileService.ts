import { Profile } from '~/types';
import SupabaseService, { SupabaseServiceConstructor } from './SupabaseService';

export class ProfileService extends SupabaseService<Profile, Profile> {
  constructor(props: Omit<SupabaseServiceConstructor, 'table'>) {
    super({
      ...props,
      table: 'profile',
    });
  }
}
