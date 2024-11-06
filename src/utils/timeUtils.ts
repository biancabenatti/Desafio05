export const timeAgo = (date: string | Date): string => {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} years ago`;
  
  interval = Math.floor(seconds / 2592000); // meses
  if (interval > 1) return `${interval} months ago`;

  interval = Math.floor(seconds / 86400); // dias
  if (interval > 1) return `${interval} days ago`;

  interval = Math.floor(seconds / 3600); // horas
  if (interval > 1) return `${interval} hours ago`;

  interval = Math.floor(seconds / 60); // minutos
  if (interval > 1) return `${interval} minutes ago`;

  return 'just now';
};

  

/* A função começa convertendo a data recebida em um objeto Date e a compara com a data atual (new Date()), 
subtraindo uma da outra. O resultado é o tempo em milissegundos.

Essa diferença é dividida por 1000 para converter milissegundos em segundos.

A função calcula quantos anos se passaram, dividindo o total de segundos por 31536000 (o número de segundos em um ano). 
Se o resultado for maior que 1, retorna a string correspondente a esse número de anos.
Se não houver anos suficientes, ela faz o mesmo para meses (2592000 segundos), dias (86400 segundos), horas (3600 segundos) e minutos (60 segundos)*/