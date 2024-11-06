import React, { useEffect, useState } from 'react';
import RepoItem from './RepoItem'; 
import HamburgerMenu from '../Menu/HamburgerMenu'; 

interface Repository {
  id: number;
  name: string;
  stargazers_count: number;
  html_url: string;
  updated_at: string;
  description?: string;
}

interface ProfileContentProps {
  repos: Repository[];
}

const ProfileContent: React.FC<ProfileContentProps> = ({ repos }) => {
  const [sortedRepos, setSortedRepos] = useState<Repository[]>(repos); 
  const [filter, setFilter] = useState<string>('stars-desc'); 

  useEffect(() => {
    const sortRepos = (repos: Repository[]) => {
      switch (filter) {
        case 'stars-asc':
          return [...repos].sort((a, b) => a.stargazers_count - b.stargazers_count);
        case 'stars-desc':
          return [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
        case 'alphabetical':
          return [...repos].sort((a, b) => a.name.localeCompare(b.name));
        default:
          return repos;
      }
    };

    setSortedRepos(sortRepos(repos));
  }, [repos, filter]); 

  return (
    <div className="flex-1 p-4 overflow-y-auto text-white">
      <HamburgerMenu setFilter={setFilter} /> 
      <ul className="text-base md:text-lg font-light">
        {sortedRepos.map((repo) => (
          <RepoItem key={repo.id} repo={repo} /> 
        ))}
      </ul>
    </div>
  );
};

export default ProfileContent;
