import { Button } from '../Button';
import { Icons } from './icons';

export type ThemeToggleProps = {
  toggle: () => void;
};

const ThemeToggle: React.FC<ThemeToggleProps> = ({ toggle }) => (
  <Button variant="ghost" size="sm" onClick={toggle}>
    <Icons.sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    <Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    <span className="sr-only">Toggle theme</span>
  </Button>
);

export { ThemeToggle };
