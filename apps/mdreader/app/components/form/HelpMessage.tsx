import { ReactNode } from 'react';

type HelpMessageProps = {
  children: ReactNode;
};

export function HelpMessage({ children }: HelpMessageProps) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}
