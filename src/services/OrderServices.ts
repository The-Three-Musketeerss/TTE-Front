const rootUrl = import.meta.env.VITE_API_URL;

export const getOrders = async (token: string) => {
  const response = await fetch(`${rootUrl}/api/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
