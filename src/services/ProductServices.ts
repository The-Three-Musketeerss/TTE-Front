import { ProductProps } from "@utils/types";

const rootUrl = import.meta.env.VITE_API_URL;
type Product = {
  category?: string;
  sort?: string;
  page?: number;
  size?: number;
  search?: string;
};

export const getProducts = async ({
  category = "",
  sort = "",
  page = 1,
  size = 9,
  search = "",
}: Product) => {
  const queryParams = new URLSearchParams({
    category,
    orderBy: sort,
    descending: "false",
    page: page.toString(),
    pageSize: size.toString(),
    search,
  });

  const response = await fetch(`${rootUrl}/api/products?${queryParams.toString()}`);
  const data = await response.json();
  return data;
};

export const getProductById = async (id: string) => {
  const response = await fetch(`${rootUrl}/api/products/${id}`);
  const data = await response.json();
  return data;
};

export const getLatestArrivals = async () => {
  const response = await fetch(`${rootUrl}/api/products/latest`);
  const data = await response.json();
  return data;
};

export const getTopSellingProducts = async () => {
  const response = await fetch(`${rootUrl}/api/products/top-selling`);
  const data = await response.json();
  return data;
};

export const createProduct = async (product: ProductProps, token: string) => {
  const response = await fetch(`${rootUrl}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create product");
  }
  return data;
};

export const updateProduct = async (
  id: string,
  product: ProductProps,
  token: string
) => {
  const response = await fetch(`${rootUrl}/api/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update product");
  }
  return data;
};

export const deleteProduct = async (productId: string, token: string) => {
  const response = await fetch(`${rootUrl}/api/products/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete product");
  }
  return data;
};

