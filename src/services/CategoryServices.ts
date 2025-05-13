const rootUrl = import.meta.env.VITE_API_URL;
export const getCategories = async () => {
  const response = await fetch(`${rootUrl}/api/categories`);
  const data = await response.json();
  return data;
};

export const getTopCategories = async () => {
  const response = await fetch(`${rootUrl}/api/categories/top`);
  const data = await response.json();
  return data;
};

export const createCategory = async (name: string, token: string) => {
  const response = await fetch(`${rootUrl}/api/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create category");
  }

  return data;
};

export const updateCategory = async (
  id: string,
  body: { name: string },
  token: string
) => {
  const response = await fetch(`${rootUrl}/api/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update category");
  }

  return await response.json();
};

export const deleteCategory = async (id: number, token: string) => {
  const response = await fetch(`${rootUrl}/api/categories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete category");
  }

  return await response.json();
};
