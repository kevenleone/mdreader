import { Layout } from '@mdreader/ui/components/layout';
import { Link, Outlet } from 'react-router-dom';

import { useTheme } from '../../hooks/useTheme';
import { Suspense } from 'react';

export default function LayoutMD() {
  const { toggle } = useTheme();

  return (
    <Layout siteHeaderProps={{ toggle, Link }}>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <Suspense fallback="Loading...">
          <Outlet />
        </Suspense>
      </section>
    </Layout>
  );
}
