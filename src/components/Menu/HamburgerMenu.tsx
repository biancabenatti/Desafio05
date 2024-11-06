import React, { useState } from 'react';

interface HamburgerMenuProps {
  setFilter: (filter: string) => void; 
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ setFilter }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-end mb-4 relative font-condensed">
      <h2 className="flex text-3xl font-bold mr-auto items-center">Repositórios Públicos</h2>
      <button 
        className="px-10 py-3 bg-zinc-900 text-slate-100 hover:bg-black rounded-md cursor-pointer font-roboto-condensed text-lg font-light" 
        onClick={toggleMenu}
      >
        Ordenar
      </button>
      {isOpen && (
        <div className="absolute bg-slate-100 border border-gray-300 shadow-md z-50 p-2 mt-16 text-black">
          <button 
            className="block w-full text-left px-3 py-2 hover:bg-gray-300" 
            onClick={() => { setFilter('stars-asc'); toggleMenu(); }}
          >
            Estrelas Crescentes
          </button>
          <button 
            className="block w-full text-left px-3 py-2 hover:bg-gray-300" 
            onClick={() => { setFilter('stars-desc'); toggleMenu(); }}
          >
            Estrelas Decrescentes
          </button>
          <button 
            className="block w-full text-left px-3 py-2 hover:bg-gray-300" 
            onClick={() => { setFilter('alphabetical'); toggleMenu(); }}
          >
            Ordem Alfabética
          </button>
        </div>
      )}
    </div>
  )
}

export default HamburgerMenu;
