import { Layout } from '@mdreader/ui/components/layout';
import { Outlet } from 'react-router-dom';

export default function IndexPage() {
  return (
    <Layout>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <Outlet />
      </section>
    </Layout>
  );
}
