import { supabase } from './supabase';

type GithubUser = {
  bio: string;
  company: string;
  id: number;
  login: string;
  name: string;
  photo: string;
};

const githubProfileService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('GithubProfile')
      .select('*')
      .order('login', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []) as GithubUser[];
  },
};

export { githubProfileService };
