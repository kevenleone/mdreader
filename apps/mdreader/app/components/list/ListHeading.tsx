import { ReactNode } from 'react';

type ListHeadingProps = {
  children: ReactNode;
};

const ListHeading: React.FC<ListHeadingProps> = ({ children }) => (
  <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
    {children}
  </h3>
);

export { ListHeading };
