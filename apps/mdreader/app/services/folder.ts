import { z } from 'zod';
import { SupabaseClient } from '@supabase/auth-helpers-remix';

import { folderSchema } from '../schema';

export type Folder = {
  fileUrl: string;
  folder_id?: number;
  id: number;
  name: string;
  slug: string;
};

const folderService = (supabase: SupabaseClient) => ({
  getAll: async ({
    folderId,
    userId,
  }: {
    folderId: number | string;
    userId: string;
  }) => {
    const { data, error } = await supabase
      .from('Folders')
      .select('*')
      .filter('folder_id', folderId ? 'eq' : 'is', folderId)
      .filter('user_id', 'eq', userId)
      .order('name', { ascending: true })
      .select('*, Folders(*)');

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []) as Folder[];
  },

  getOne: async ({ folderId }: { folderId: string | number }) => {
    const { data, error } = await supabase
      .from('Folders')
      .select('*')
      .filter('id', 'eq', folderId)
      .order('name', { ascending: true })
      .select('*, Folders(*)');

    if (error) {
      throw new Error(error.message);
    }

    return ((data ?? []) as Folder[])[0];
  },
  store: (folder: z.infer<typeof folderSchema>) =>
    supabase.from('Folders').upsert(folder).select(),
  remove: (id: number) =>
    supabase.from('Folders').delete().eq('id', id).select(),
});

export { folderService };
