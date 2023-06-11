import { buttonVariants, cn } from '@mdreader/interface';
import { Link, useLocation } from '@remix-run/react';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const { pathname } = useLocation();
  const [, , subPath] = pathname.split('/').filter(Boolean);

  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
        className
      )}
      {...props}
    >
      {items.map((item, index) => {
        let isActive = false;

        if (subPath === undefined && index === 0) {
          isActive = true;
        }

        if (subPath === item.href) {
          isActive = true;
        }

        return (
          <Link
            key={index}
            to={item.href}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              isActive
                ? 'bg-muted hover:bg-muted'
                : 'hover:bg-transparent hover:underline',
              'justify-start'
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
