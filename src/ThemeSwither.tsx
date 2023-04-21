import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useEffect } from 'react';

const darkModeAtom = atomWithStorage('darkMode', false);

const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  useEffect(() => {
    if (darkMode) {
      return document.documentElement.classList.add('dark');
    }

    document.documentElement.classList.remove('dark');
  }, [darkMode]);

  return (
    <>
      <h1 className="dark:text-white text-black">
        Welcome to {darkMode ? 'dark' : 'light'} mode!
      </h1>
      <button
        className="dark:text-white text-black"
        onClick={() => setDarkMode(!darkMode)}
      >
        toggle theme
      </button>
    </>
  );
};

export default ThemeSwitcher;
