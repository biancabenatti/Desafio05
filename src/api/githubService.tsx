const BASE_URL = 'https://api.github.com/users';

interface UserData {
  login: string; 
  id: number;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number; 
  name?: string; 
  bio?: string; 
  company?: string; 
  location?: string; 
  email?: string; 
  blog?: string; 
  twitter_username?: string; 
}

// Definindo um tipo para os repositórios
interface Repository {
  id: number;
  name: string;
  html_url: string;
  description?: string;
  stargazers_count: number;
  updated_at: string;
}
export const getUserData = async (username: string): Promise<UserData> => {
  const response = await fetch(`${BASE_URL}/${username}`);
  if (!response.ok) {
    throw new Error('Usuário não encontrado');
  }
  return response.json();
};

export const getUserRepos = async (username: string): Promise<Repository[]> => {
  const response = await fetch(`${BASE_URL}/${username}/repos`);
  if (!response.ok) {
    throw new Error('Erro ao buscar repositórios');
  }
  return response.json();
};
