import { ReactNode } from 'react';

type ThemeProviderProps = {
  children: ReactNode;
  attribute: string;
  defaultTheme: string;
  enableSystem: boolean;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  ...props
}) => {
  return <div {...props}>{children}</div>;
};

export { ThemeProvider };
