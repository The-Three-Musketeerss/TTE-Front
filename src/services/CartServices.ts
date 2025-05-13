const rootUrl = import.meta.env.VITE_API_URL;

export const getCart = async (token: string) => {
  const response = await fetch(`${rootUrl}/api/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data.data;
};
