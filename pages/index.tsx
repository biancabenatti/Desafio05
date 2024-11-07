import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaSearch } from "react-icons/fa";
import Swal from 'sweetalert2';
import { checkRepositoryExists } from '../src/services/apiService';

const Home: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const router = useRouter();

  const handleSearch = async () => {
    if (username.trim()) {
      const repoExists = await checkRepositoryExists(username);

      if (repoExists) {
        router.push(`/profile/${username}`); 
      } else {
        Swal.fire("Repositório não encontrado!");
      }
    } else {
      Swal.fire("O campo de busca está vazio!");
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-center items-center bg-[url('/src/assets/home.jpg')] bg-cover bg-center h-screen font-condensed text-2xl">
      <div className="text-center p-6 md:p-14 bg-gray-300 bg-opacity-10 rounded-lg shadow-xl shadow-neutral-900 backdrop-blur-sm max-w-xs md:max-w-md lg:max-w-lg">
        <h1 className="mb-6 md:mb-5 text-2xl md:text-4xl text-white font-bold">Search Devs</h1>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Type the username here..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyUp={handleKeyUp}
            autoComplete="username"
            className="w-full md:w-80 p-2 border border-gray-300 rounded-lg mb-4 md:mb-0 md:mr-2 placeholder: flex text-lg"
          />
          <button
            onClick={handleSearch}
            className="flex justify-center items-center p-1 h-12 w-full md:w-36 bg-zinc-900 text-white rounded-lg cursor-pointer text-lg hover:bg-zinc-950"
          >
            <FaSearch className="mr-2" /> Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
