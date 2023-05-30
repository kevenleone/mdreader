import { Link } from '@remix-run/react';
import { LucideIcon } from 'lucide-react';
import { Fragment } from 'react';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@mdreader/interface';

export type ListItemProps = {
  actions?: {
    name: string;
    onClick: () => void;
  }[];
  description?: string;
  href: string;
  Icon: LucideIcon;
  name: string;
};

const ListItem: React.FC<ListItemProps> = ({
  actions,
  description,
  href,
  Icon,
  name,
}) => {
  const hasActions = !!actions?.length;

  const ContextMenuWrapper = {
    Main: hasActions ? ContextMenu : Fragment,
    Content: hasActions ? ContextMenuTrigger : Fragment,
  };

  return (
    <ContextMenuWrapper.Main>
      <ContextMenuWrapper.Content>
        <li className="flex flex-col sm:flex-row justify-between items-baseline w-full border-b border-gray-200 dark:border-gray-700 py-3 transform hover:scale-[1.01] transition-all">
          <Link to={href} aria-label={name} className="flex items-center">
            <div className="text-gray-300 dark:text-gray-400 text-left mr-6">
              <Icon className="bg-background" />
            </div>
            <h4 className="text-lg font-medium w-full text-gray-800 dark:text-gray-100">
              {name}
            </h4>
          </Link>
          {description && (
            <span className="text-gray-500 dark:text-gray-400 text-left sm:text-right md:mb-0 mr-2 ml-10 sm:ml-0">
              {description}
            </span>
          )}
        </li>
      </ContextMenuWrapper.Content>

      {hasActions && (
        <ContextMenuContent>
          {actions.map((action, index) => (
            <ContextMenuItem key={index} onClick={action.onClick}>
              {action.name}
            </ContextMenuItem>
          ))}
        </ContextMenuContent>
      )}
    </ContextMenuWrapper.Main>
  );
};

export { ListItem };
