import { useParams } from '@remix-run/react';
import { useCallback } from 'react';
import useSWR from 'swr';

import useSupabase from './useSupabase';
import useSession from './useSession';

const useUserId = () => {
  const { user } = useParams();
  const client = useSupabase();
  const mySession = useSession();

  const getUserId = useCallback(async () => {
    let userId = '';

    if (user) {
      const { data } = await client
        .from('Profiles')
        .select('*')
        .filter('login', 'eq', user);

      if (data?.length) {
        userId = data[0].id;
      }
    } else {
      if (mySession?.user.id) {
        userId = mySession.user.id;
      }
    }

    return userId;
  }, []);

  return useSWR(`/user-id/${user}`, getUserId);
};

export default useUserId;
