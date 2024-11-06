import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getUserData, getUserRepos } from '../../api/githubService';
import ProfileSidebar from '../../components/Profile/ProfileSidebar';
import ProfileContent from '../../components/Profile/ProfileContent';

interface UserData {
  avatar_url: string;
  name?: string; 
  username: string; 
  bio?: string;
  followers: number;
  following: number;
  company?: string;
  location?: string;
  email?: string;
  blog?: string;
  twitter_username?: string;
}

interface Repository {
  id: number;
  name: string;
  stargazers_count: number;
  html_url: string; 
  updated_at: string; 
  description?: string; 
}

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!username) return;

      try {
        const user = await getUserData(username);
        
        const userWithUsername: UserData = { 
          avatar_url: user.avatar_url,
          name: user.name, 
          username: user.login, 
          bio: user.bio,
          followers: user.followers,
          following: user.following,
          company: user.company,
          location: user.location,
          email: user.email,
          blog: user.blog,
          twitter_username: user.twitter_username,
        };

        const repositories = await getUserRepos(username);
        setUserData(userWithUsername);
        setRepos(repositories.sort((a, b) => b.stargazers_count - a.stargazers_count));
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, [username]);

  if (!username) {
    return <Navigate to="/" />; 
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-lg font-semibold text-gray-700">Carregando...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row bg-[#353739] font-condensed md:h-screen">
      <div className="md:w-1/3 md:max-h-full">
        <ProfileSidebar userData={userData} username={username} />
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <ProfileContent repos={repos} />
      </div>
    </div>
  );
};

export default Profile;
