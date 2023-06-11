import { useParams } from '@remix-run/react';
import { useCallback } from 'react';
import useSWR from 'swr';

import useSession from './useSession';
import { useProfileService } from './useProfiles';

const useUserId = () => {
  const { user } = useParams();
  const mySession = useSession();

  const profileService = useProfileService();

  const getUserId = useCallback(async () => {
    let userId = '';

    if (user) {
      const data = await profileService.getOne({
        filters: [{ operator: 'eq', property: 'login', value: user }],
      });

      if (data) {
        userId = data.id;
      }
    } else if (mySession?.user.id) {
      userId = mySession.user.id;
    }

    return userId;
  }, []);

  return useSWR(`/user-id/${user}`, getUserId);
};

export default useUserId;
