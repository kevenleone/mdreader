import { Outlet, useParams, useSearchParams } from 'react-router-dom';

import { Profile } from '../../components/profile';
import useFetch from '../../hooks/useFetch';
import { GithubProfile } from '../../types';
import { useFolder } from '../../hooks/useFolders';

type ProfileHeaderProps = {
  username: string;
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username }) => {
  const { data: githubUser, isLoading } = useFetch<GithubProfile>(
    `https://api.github.com/users/${username}`
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!githubUser) {
    return null;
  }

  return (
    <Profile
      bio={githubUser.bio}
      company={githubUser.company}
      name={githubUser.name}
      photo={githubUser.avatar_url}
    />
  );
};

const ProfileOutlet = () => {
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const folderId = searchParams.get('folderId')
    ? Number(searchParams.get('folderId'))
    : null;

  const { data: folder } = useFolder(folderId as number | undefined);

  return (
    <section
      id="profile-outlet"
      className="flex flex-col justify-center items-start border-gray-200 dark:border-gray-700 mx-auto"
    >
      <ProfileHeader username={username as string} />

      <Outlet
        context={{
          folder,
          folderId,
          username,
        }}
      />
    </section>
  );
};

export { ProfileOutlet };
