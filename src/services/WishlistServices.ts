import { getProductById } from "@services/ProductServices";

const rootUrl = import.meta.env.VITE_API_URL;

export const getWishlist = async (token: string) => {
  const response = await fetch(`${rootUrl}/api/user/wishlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!data.success) return [];

  const wishlistIds: number[] = data.data.wishlist;

  const productResponses = await Promise.all(
    wishlistIds.map((id) => getProductById(String(id)))
  );

  const products = productResponses.map((res) => res.data);

  return products;
};

export const addToWishlist = async (productId: number, token: string) => {
  await fetch(`${rootUrl}/api/user/wishlist/add/${productId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeFromWishlist = async (productId: number, token: string) => {
  await fetch(`${rootUrl}/api/user/wishlist/remove/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}