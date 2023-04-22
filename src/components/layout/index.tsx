import { Outlet } from 'react-router-dom';
import ThemeSwitcher from '../../ThemeSwither';

const Layout = () => {
  return (
    <div className="bg-white dark:bg-gray-800 h-screen">
      <div className="py-3">
        <ThemeSwitcher />
      </div>

      <Outlet />
    </div>
  );
};

export default Layout;
