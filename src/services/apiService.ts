export const checkRepositoryExists = async (username: string): Promise<boolean> => {
  try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
      }
      
      const repos: any[] = await response.json(); 
      return repos.length > 0; 
  } catch (error) {
      console.error("Erro ao verificar repositórios:", error);
      return false; 
  }
};
