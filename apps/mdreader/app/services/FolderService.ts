import { z } from 'zod';

import { Folder } from '~/types';
import { folderSchema } from '~/schema';
import SupabaseService, { SupabaseServiceConstructor } from './SupabaseService';

export class FolderService extends SupabaseService<
  Folder,
  z.infer<typeof folderSchema>
> {
  constructor(props: Omit<SupabaseServiceConstructor, 'table'>) {
    super({
      ...props,
      table: 'folder',
    });
  }
}
