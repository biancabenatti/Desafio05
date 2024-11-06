import React from 'react';
import { timeAgo } from '../../utils/timeUtils'; 
import { FaRegStar } from "react-icons/fa";
import { MdOutlineUpdate } from "react-icons/md";

// Definindo um tipo para o repositório
interface Repository {
  id: number;
  name: string;
  stargazers_count: number;
  html_url: string; 
  updated_at: string;
  description?: string; 
}

interface RepoItemProps {
  repo: Repository;
}

const RepoItem: React.FC<RepoItemProps> = React.memo(({ repo }) => {
  return (
    <li className="mb-4 p-4 rounded-lg flex flex-col justify-start backdrop-blur-3xl border-t-gray-700 border-t-2 shadow-2xl">
      <a 
        className="text-slate-100 no-underline font-bold text-lg md:text-2xl hover:underline" 
        href={repo.html_url} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        {repo.name}
      </a>
      <p className="text-sm md:text-base">{repo.description || 'Sem descrição'}</p>
      <div className="flex gap-3 mt-5 text-base">
        <span className="flex gap-1 items-center"><FaRegStar className="mb-1" /> {repo.stargazers_count}</span>
        <span className="flex gap-1 items-center"><MdOutlineUpdate /> Atualizado {timeAgo(repo.updated_at)}</span>
      </div>
    </li>
  );
});

export default RepoItem;
