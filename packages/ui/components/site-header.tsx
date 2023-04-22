import { Icons } from './icons';
import { MainNav } from './main-nav';
import { ThemeToggle } from './theme-toggle';
import { buttonVariants } from './ui/button';

export const siteConfig = {
  name: 'Next.js',
  description:
    'Beautifully designed components built with Radix UI and Tailwind CSS.',
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
  ],
  links: {
    twitter: 'https://twitter.com/shadcn',
    github: 'https://github.com/shadcn/ui',
    docs: 'https://ui.shadcn.com',
  },
};

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
              <div
                className={buttonVariants({
                  size: 'sm',
                  variant: 'ghost',
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </a>
            <a href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
              <div
                className={buttonVariants({
                  size: 'sm',
                  variant: 'ghost',
                })}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
