import { Provider, createStore } from 'jotai';
import { Outlet, useParams } from 'react-router-dom';
import { userAtom } from '../../store/user.atom';

const myStore = createStore();

const ProfileOutlet = () => {
  const { username } = useParams();

  myStore.set(userAtom, username ?? '');

  return (
    <Provider store={myStore}>
      <Outlet />
    </Provider>
  );
};

export { ProfileOutlet };
