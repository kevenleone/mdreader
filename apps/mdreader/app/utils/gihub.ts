const RAW_GITHUB_URI = 'https://raw.githubusercontent.com/';

type GithubRepo = {
  repository: string;
  username: string;
  filePath: string;
};

export const getUserAndRepoByRawUri = (url: string): GithubRepo => {
  const [username, repository, , ...filePath] = url
    .replace(RAW_GITHUB_URI, '')
    .split('/');

  return {
    username,
    repository,
    filePath: filePath.join('/'),
  };
};

export const getCommitDetails = async ({
  username,
  repository,
  filePath,
  token,
}: GithubRepo & { token?: string }) => {
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repository}/commits?path=${filePath}&per_page=1`,
    {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );

  return response.json();
};
