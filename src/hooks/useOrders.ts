import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@services/OrderServices";
import { queryClient } from "@utils/queryClient";

export const useOrders = (token?: string) => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(token!),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });
};

export const invalidateOrders = () => {
  queryClient.invalidateQueries({ queryKey: ["orders"] });
};
