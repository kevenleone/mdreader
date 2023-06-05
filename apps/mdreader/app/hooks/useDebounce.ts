import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const interval = setInterval(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearInterval(interval);
  }, [value]);

  return debounceValue;
};
