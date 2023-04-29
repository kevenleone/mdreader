import { Icons } from './icons';
import { MainNav } from './main-nav';
import { ThemeToggle, ThemeToggleProps } from './theme-toggle';
import { buttonVariants } from './ui/button';
import { UserNav, UserNavProps } from './user-nav';

export const siteConfig = {
  name: 'MD Reader',
  description: '...',
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'App',
      href: '/app',
    },
    {
      title: 'Profile',
      href: '/profile',
    },
  ],
  links: {
    github: 'https://github.com/kevenleone/md-reader-v2',
  },
};

export type SiteHeaderProps = {
  Link: any;
  themeProps: ThemeToggleProps;
  userNavProps?: UserNavProps;
};

export function SiteHeader(props: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} Link={props.Link} />
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

            <ThemeToggle {...props.themeProps} />

            {props.userNavProps && <UserNav {...props.userNavProps} />}
          </nav>
        </div>
      </div>
    </header>
  );
}
