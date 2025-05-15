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

export const getOrderById = async (token: string, id: number) => {
  const response = await fetch(`${rootUrl}/api/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if(!response.ok) {
    throw new Error(data.message || "Failed to fetch order details");
  }

  return data;
};