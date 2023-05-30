import { ReactNode } from 'react';
import clsx from 'clsx';
import { ListItem } from './list-item';
import { ListHeading } from './ListHeading';

type ListProps = {
  children: ReactNode;
  className?: string;
};

type ListChildrens = {
  Item: typeof ListItem;
  Heading: typeof ListHeading;
};

const List: React.FC<ListProps> & ListChildrens = ({ className, children }) => (
  <div className={clsx('my-4 w-full', className)}>{children}</div>
);

List.Item = ListItem;
List.Heading = ListHeading;

export { List };
