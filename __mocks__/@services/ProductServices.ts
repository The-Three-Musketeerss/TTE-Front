export const getProductById = async (id: string) => {
  return Promise.resolve({
    data: {
      id: parseInt(id),
      title: "Mocked Product",
      price: 49.99,
      description: "This is a mocked product description.",
      category: "Electronics",
      image: "https://via.placeholder.com/150",
      inventory: {
        total: 100,
        available: 80,
      },
    },
  });
};


export const createProduct = async (product, token) => {
  return Promise.resolve({
    message: `Product "${product.title}" created successfully.`,
  });
};

export const updateProduct = async (id: string, data: any, token: string) => {
  return Promise.resolve({
    message: `Product ${id} updated`,
    data,
  });
};

export const getProducts = async ({ page, size }: { page: number; size: number }) => {
  return Promise.resolve({
    data: [
      {
        id: 1,
        title: "Wireless Mouse",
        price: 25.99,
        createdAt: new Date().toISOString(),
        inventory: { total: 100, available: 90 },
      },
      {
        id: 2,
        title: "Mechanical Keyboard",
        price: 79.99,
        createdAt: new Date().toISOString(),
        inventory: { total: 50, available: 30 },
      },
    ],
    page: 1,
    totalPages: 1,
  });
};

export const deleteProduct = async (id: string, token: string) => {
  return Promise.resolve({ message: `Product ${id} deleted.` });
};