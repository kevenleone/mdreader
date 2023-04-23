import { TailwindIndicator } from './tailwind-indicator';
import { SiteHeader, SiteHeaderProps } from './site-header';

interface LayoutProps {
  children: React.ReactNode;
  siteHeaderProps: SiteHeaderProps;
}

export function Layout({ children, siteHeaderProps }: LayoutProps) {
  return (
    <main>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader {...siteHeaderProps} />
        <div className="flex-1 bg-background">{children}</div>
      </div>
      <TailwindIndicator />
    </main>
  );
}
