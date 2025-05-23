import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@services/ProductServices';

export const useProducts = (category: string, sort: string, search: string, page: number) => {
  return useQuery({
    queryKey: ['products', category, sort, search, page],
    queryFn: () => getProducts({ category, sort, search, page }),
    staleTime: 1000 * 60 * 5,
  });
};