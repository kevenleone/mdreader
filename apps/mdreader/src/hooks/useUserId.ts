import { useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import useSWR from 'swr';
import { supabase } from '../services/supabase';

type OutletContext = {
  username: string;
};

const useUserId = () => {
  const { username } = useOutletContext<OutletContext>();

  const getUserId = useCallback(async () => {
    let userId = '';

    if (username) {
      const { data } = await supabase
        .from('GithubProfile')
        .select('*')
        .filter('login', 'eq', username);

      if (data?.length) {
        userId = data[0].id;
      }
    } else {
      const mySession = await supabase.auth.getSession();

      if (mySession.data.session?.user.id) {
        userId = mySession.data.session?.user.id;
      }
    }

    return userId;
  }, []);

  return useSWR(`/user-id/${username}`, getUserId);
};

export default useUserId;
