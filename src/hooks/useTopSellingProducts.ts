import { useQuery } from "@tanstack/react-query";
import { getTopSellingProducts } from "@services/ProductServices";
import { ProductProps } from "@utils/types";

type ApiResponse = {
  data: ProductProps[];
};

export const useTopSellingProducts = () => {
  return useQuery<ApiResponse>({
    queryKey: ["topSellingProducts"],
    queryFn: getTopSellingProducts,
    staleTime: 1000 * 60 * 15,
  });
};
