import { Provider, createStore } from 'jotai';
import { Outlet, useParams } from 'react-router-dom';
import { userAtom } from '../../store/user.atom';
import { useEffect } from 'react';

const myStore = createStore();

const ProfileOutlet = () => {
  const { username } = useParams();

  useEffect(() => {
    myStore.set(userAtom, username ?? '');
  }, [username]);

  return (
    <Provider store={myStore}>
      <Outlet />
    </Provider>
  );
};

export { ProfileOutlet };
