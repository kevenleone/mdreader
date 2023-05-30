import { useCallback } from 'react';
import useSWR from 'swr';

const useFetch = <T = any>(
  api: string,
  options?: RequestInit,
  { parseAs = 'json' }: { parseAs?: 'json' | 'text' } = {}
) => {
  const fetcher = useCallback(async () => {
    const response = await fetch(api, options);

    if (parseAs === 'json') {
      return response.json();
    }

    return response.text();
  }, [api]);

  return useSWR<T>(api, fetcher);
};

export default useFetch;
