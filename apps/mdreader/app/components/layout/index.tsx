import { useNavigate, Link } from '@remix-run/react';
import { Button, Layout as LayoutPage } from '@mdreader/interface';
import { Github } from 'lucide-react';
import { SupabaseClient } from '@supabase/auth-helpers-remix';
import { useState } from 'react';
import { useTheme, Theme } from 'remix-themes';

import { ConfirmDialog } from '../../components/confirm-dialog/ConfirmDialog';
import useSession from '../../hooks/useSession';
import useSupabase from '~/hooks/useSupabase';

type LayoutProps = {
  children: React.ReactNode;
};

async function signInWithGitHub(supabase: SupabaseClient) {
  await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo: '/auth/callback' },
  });
}

const Layout = ({ children }: LayoutProps) => {
  const [open, setOpen] = useState(false);
  const client = useSupabase();
  const [theme, setTheme] = useTheme();
  const navigate = useNavigate();
  const session = useSession();

  const user = session?.user?.user_metadata;

  return (
    <LayoutPage
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
                  client.auth.signOut().then(() => navigate('/')),
                onClickProfile: () => navigate(`/profile/${user.user_name}`),
              },
            }
          : undefined,
        themeProps: {
          toggle: () =>
            setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK),
        },
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
        <Button className="mt-4 gap-2" onClick={() => signInWithGitHub(client)}>
          <Github width={20} />
          <span>Continue with Github</span>
        </Button>
      </ConfirmDialog>

      <section className="container grid items-center gap-6 pb-8 pt-6">
        {children}
      </section>
    </LayoutPage>
  );
};

export default Layout;
