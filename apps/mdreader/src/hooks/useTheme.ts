import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useEffect } from 'react';

const darkModeAtom = atomWithStorage('darkMode', false);

const useTheme = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  useEffect(() => {
    if (darkMode) {
      return document.documentElement.classList.add('dark');
    }

    document.documentElement.classList.remove('dark');
  }, [darkMode]);

  return {
    toggle: () => setDarkMode((theme) => !theme),
  };
};

export { useTheme };
