import React, { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';

const collectRepos = async (username: string) => {
  const octo = new Octokit();
  const list = await octo.repos.listForUser({ username });
  return list.data;
};

type DataType = Awaited<ReturnType<typeof collectRepos>>;

const useGithub = () => {
  const [repos, setRepos] = useState<DataType | null>(null);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    collectRepos('wtlgo')
      .then((result) => setRepos(result))
      .catch((error) => setError(error));
  }, []);

  return { repos, error };
};

const App: React.FC = () => {
  const { repos, error } = useGithub();

  if (error !== null) {
    return <div>Error: {error}</div>;
  }

  if (repos === null) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {repos.map((repo) => (
        <li key={repo.id}>
          <a href={`https://github.com/${repo.full_name}`}>{repo.full_name}</a>
        </li>
      ))}
    </ul>
  );
};

export default App;
