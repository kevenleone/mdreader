import { Layout } from '@mdreader/ui/components/layout';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Suspense, useState } from 'react';
import { Github } from 'lucide-react';
import { Button } from '@mdreader/ui/Button';

import { useTheme } from '../../hooks/useTheme';
import useSession from '../../hooks/useSession';
import { supabase } from '../../services/supabase';
import { ConfirmDialog } from '../../components/confirm-dialog/ConfirmDialog';

export default function MDReaderLayout() {
  const [open, setOpen] = useState(false);
  const { toggle } = useTheme();
  const navigate = useNavigate();

  const session = useSession();

  const user = session?.user?.user_metadata;

  async function signInWithGitHub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  }

  return (
    <Layout
      siteHeaderProps={{
        userNavProps: user
          ? {
              user: {
                email: user?.email,
                photo: user?.avatar_url,
                name: user?.name,
              },
              actions: {
                onClickLogout: () =>
                  supabase.auth.signOut().then(() => {
                    navigate('/');
                  }),
                onClickProfile: () => navigate(`/profile/${user.user_name}`),
              },
            }
          : undefined,
        themeProps: { toggle },
        onSignIn: () => setOpen(true),
        Link,
      }}
    >
      <ConfirmDialog
        open={open}
        title="Sign In"
        description="To continue to MD Reader"
        onCancel={() => setOpen(false)}
      >
        <Button className="mt-4 gap-2" onClick={signInWithGitHub}>
          <Github width={20} />
          <span>Continue with Github</span>
        </Button>
      </ConfirmDialog>

      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <Suspense>
          <Outlet />
        </Suspense>
      </section>
    </Layout>
  );
}
