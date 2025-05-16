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

export const createOrder = async (address: string, token: string) => {
  const response = await fetch(`${rootUrl}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ address }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create order");
  }

  const data = await response.json();
  return data;
};