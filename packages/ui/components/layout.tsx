import { ThemeProvider } from './theme-provider';
import { TailwindIndicator } from './tailwind-indicator';
import { SiteHeader } from './site-header';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <main>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
        </div>
        <TailwindIndicator />
      </ThemeProvider>
    </main>
  );
}
