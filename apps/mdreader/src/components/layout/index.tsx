import { Layout } from '@mdreader/ui/components/layout';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Suspense } from 'react';
import { useAtomValue } from 'jotai';

import { useTheme } from '../../hooks/useTheme';
import { sessionAtom } from '../../hooks/useSession';
import { supabase } from '../../services/supabase';

export default function LayoutMD() {
  const { toggle } = useTheme();
  const navigate = useNavigate();
  const session = useAtomValue(sessionAtom);

  const user = session.data.session?.user?.user_metadata;

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
                    (window as any).location = window.location.host;
                  }),
                onClickProfile: () => navigate(`/profile/${user.user_name}`),
              },
            }
          : undefined,
        themeProps: { toggle },
        Link,
      }}
    >
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <Suspense fallback="...">
          <Outlet />
        </Suspense>
      </section>
    </Layout>
  );
}
