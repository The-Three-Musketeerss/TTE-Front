import { useQuery } from "@tanstack/react-query";
import { getTopCategories } from "@services/CategoryServices";

type ApiResponse = {
  data: string[];
};

export const useTopCategories = () => {
  return useQuery<ApiResponse>({
    queryKey: ["topCategories"],
    queryFn: getTopCategories,
    staleTime: 1000 * 60 * 15,
  });
};
