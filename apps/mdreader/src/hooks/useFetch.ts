import { useCallback } from 'react';
import useSWR from 'swr';

const useFetch = <T = any>(
  api: string,
  { parseAs = 'json' }: { parseAs?: 'json' | 'text' } = {}
) => {
  const fetcher = useCallback(async () => {
    const response = await fetch(api);

    if (parseAs === 'json') {
      return response.json();
    }

    return response.text();
  }, [api]);

  return useSWR<T>(api, fetcher);
};

export default useFetch;
