import { ReactNode } from 'react';

type EmptyStateProps = {
  children?: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const EmptyState: React.FC<EmptyStateProps> = ({ children, ...props }) => (
  <div {...props}>
    <div className="flex justify-center">
      <img src="/empty-state.svg" />
    </div>

    <div className="text-center flex flex-col justify-center gap-3">
      <h1 className="text-3xl">It's empty in here</h1>

      <p className="text-gray-600 dark:text-gray-400 flex-wrap">{children}</p>
    </div>
  </div>
);

export default EmptyState;
