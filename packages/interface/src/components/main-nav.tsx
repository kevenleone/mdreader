import { cn } from '../lib/utils';
import { Icons } from './icons';
import { siteConfig } from './site-header';

interface NavItem {
  disabled?: boolean;
  external?: boolean;
  href?: string;
  title: string;
}

interface MainNavProps {
  Link: any;
  items?: NavItem[];
}

export function MainNav({ items, Link }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>

      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  to={item.href}
                  className={cn(
                    'flex items-center text-lg font-semibold text-muted-foreground sm:text-sm',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  );
}
