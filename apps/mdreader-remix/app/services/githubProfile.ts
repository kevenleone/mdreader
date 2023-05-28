import { SupabaseClient } from '@supabase/auth-helpers-remix';

export type GithubUser = {
  id: string;
  login: string;
  name: string;
  photo: string;
};

const githubProfileService = (supabase: SupabaseClient) => ({
  getAll: async () => {
    const { data, error } = await supabase
      .from('Profiles')
      .select('*')
      .order('login', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []) as GithubUser[];
  },

  getOne: async ({ login }: { login: string }) => {
    const { data, error } = await supabase
      .from('Profiles')
      .select('*')
      .filter('login', 'eq', login)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return ((data ?? []) as GithubUser[])[0];
  },

  store: async (profile: GithubUser) => {
    const { data, error } = await supabase
      .from('Profiles')
      .insert(profile)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return ((data ?? []) as GithubUser[])[0];
  },
});

export { githubProfileService };
