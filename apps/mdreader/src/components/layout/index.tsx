import { Outlet } from 'react-router-dom';
import { Button } from 'ui';
import ThemeSwitcher from '../../ThemeSwither';

const Layout = () => {
  return (
    <div className="bg-white dark:bg-gray-800 h-screen">
      <div className="py-3">
        <ThemeSwitcher />
      </div>

      <Button>My name is keven</Button>

      {/* <button className="bg-black rounded text-white p-5">keve</button> */}

      <Outlet />
    </div>
  );
};

export default Layout;
