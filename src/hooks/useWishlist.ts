import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "@services/WishlistServices";
import { queryClient } from "@utils/queryClient";

export const useWishlist = (token?: string) => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: () => getWishlist(token!),
    enabled: !!token,
    staleTime: 1000 * 60 * 15,
  });
};

export const invalidateWishlist = () => {
  queryClient.invalidateQueries({ queryKey: ["wishlist"] });
};
