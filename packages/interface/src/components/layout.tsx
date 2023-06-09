import { TailwindIndicator } from './tailwind-indicator';
import { SiteHeader, SiteHeaderProps } from './site-header';

type LayoutProps = {
  children: React.ReactNode;
  siteHeaderProps: SiteHeaderProps;
};

const Layout: React.FC<LayoutProps> = ({ children, siteHeaderProps }) => {
  return (
    <main>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader {...siteHeaderProps} />
        <div className="flex-1 bg-background">{children}</div>
      </div>
      <TailwindIndicator />
    </main>
  );
};

export { Layout };
