export const getCategories = async () => {
  return Promise.resolve({
    data: [
      { id: 1, name: "Electronics" },
      { id: 2, name: "Books" },
    ],
  });
};

export const deleteCategory = async (id: number, token: string) => {
  return Promise.resolve({ message: `Category ${id} deleted` });
};

export const updateCategory = async (id: number, data: any, token: string) => {
  return Promise.resolve({
    message: `Category ${id} updated`,
    data: { id, ...data },
  });
};

export const createCategory = async (name: string, token: string) => {
  return Promise.resolve({
    message: `Category "${name}" created successfully`,
  });
};
