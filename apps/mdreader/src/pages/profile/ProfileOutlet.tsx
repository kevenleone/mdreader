import { useEffect } from "react";
import { Provider, createStore, useAtomValue } from "jotai";
import { Outlet, useParams, useSearchParams } from "react-router-dom";

import { userAtom } from "../../store/user.atom";
import { githubUserAtom } from "../../store/github.user.atom";
import { Profile } from "../../components/profile";

export const ProfileHeader = () => {
  const githubUser = useAtomValue(githubUserAtom);

  return (
    <Profile
      bio={githubUser.bio}
      company={githubUser.company}
      name={githubUser.name}
      photo={githubUser.avatar_url}
    />
  );
};

const myStore = createStore();

const ProfileOutlet = () => {
  const { username } = useParams();
  const [searchParams] = useSearchParams();

  const folderId = searchParams.get("folderId")
    ? Number(searchParams.get("folderId"))
    : null;

  useEffect(() => {
    myStore.set(userAtom, username ?? "");
  }, [username]);

  return (
    <Provider store={myStore}>
      <section
        id="profile-outlet"
        className="flex flex-col justify-center items-start border-gray-200 dark:border-gray-700 mx-auto"
      >
        <ProfileHeader />
        
        <Outlet context={{ folderId, username }} />
      </section>
    </Provider>
  );
};

export { ProfileOutlet };
