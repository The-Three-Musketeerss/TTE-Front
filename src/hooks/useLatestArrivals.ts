import { useQuery } from "@tanstack/react-query";
import { getLatestArrivals } from "@services/ProductServices";
import { ProductProps } from "@utils/types";

type ApiResponse = {
  data: ProductProps[];
};

export const useLatestArrivals = () => {
  return useQuery<ApiResponse>({
    queryKey: ["latestArrivals"],
    queryFn: getLatestArrivals,
    staleTime: 1000 * 60 * 15,
  });
};
