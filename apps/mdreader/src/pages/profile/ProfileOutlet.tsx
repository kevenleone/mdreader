import { Provider, createStore } from 'jotai';
import { Outlet, useParams } from 'react-router-dom';
import { userAtom } from '../../store/user.atom';
import { useEffect } from 'react';
import { ProfileCard } from '.';

const myStore = createStore();

const ProfileOutlet = () => {
  const { username } = useParams();

  useEffect(() => {
    myStore.set(userAtom, username ?? '');
  }, [username]);

  return (
    <Provider store={myStore}>
      <section
        id="profile-outlet"
        className="flex flex-col justify-center items-start border-gray-200 dark:border-gray-700 mx-auto"
      >
        <ProfileCard />
        <Outlet />
      </section>
    </Provider>
  );
};

export { ProfileOutlet };
