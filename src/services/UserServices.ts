const rootUrl = import.meta.env.VITE_API_URL;

export const getUsers = async (token: string) => {
  const response = await fetch(`${rootUrl}/api/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || "Failed to fetch users");
  }

  return data.data;
};
