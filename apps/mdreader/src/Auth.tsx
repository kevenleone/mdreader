import { useEffect } from 'react';
import { supabase } from './services/supabase';
import { Button } from '@mdreader/ui/components/ui/button';

const Auth = () => {
  useEffect(() => {
    (async () => {
      const session = await supabase.auth.getSession();
      const me = await supabase.auth.getUser();

      const response = await fetch('https://api.github.com/users/kevenleone', {
        headers: {
          Authorization: `bearer ${session.data.session?.provider_token}`,
        },
      });

      const data = await response.json();

      console.log({ me, data, session });
    })();
  }, []);

  async function signInWithGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });

    console.log(data, error);
  }

  async function logout() {
    await supabase.auth.signOut();
  }

  return (
    <div className="flex gap-3">
      <Button onClick={signInWithGitHub}>Sign In Github</Button>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Auth;
