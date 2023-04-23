import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

export type ListItemProps = {
  href: string;
  title: string;
  Icon: LucideIcon;
  description: string;
};

const ListItem: React.FC<ListItemProps> = ({
  description,
  href,
  Icon,
  title,
}) => (
  <li className="flex flex-col sm:flex-row justify-between items-baseline w-full border-b border-gray-200 dark:border-gray-700 py-3 transform hover:scale-[1.01] transition-all">
    <Link to={href} aria-label={title} className="flex items-center">
      <div className="text-gray-300 dark:text-gray-400 text-left mr-6">
        <Icon />
      </div>
      <h4 className="text-lg font-medium w-full text-gray-800 dark:text-gray-100">
        {title}
      </h4>
    </Link>
    {description && (
      <div className="flex items-center mt-2 sm:mt-0 w-full sm:w-auto justify-evenly">
        <p className="text-gray-500 dark:text-gray-400 text-left sm:text-right w-64 md:mb-0 mr-2 ml-10 sm:ml-0">
          {description}
        </p>
      </div>
    )}
  </li>
);

export { ListItem };
