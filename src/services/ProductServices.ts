const rootUrl = import.meta.env.VITE_API_URL;
type Product = {
    category?: string;
    sort?: string;
    page?: number;
    size?: number;
}

export const getProducts = async ({category = '', sort = '', page = 1, size = 9}: Product) => {
    const response = await fetch(`${rootUrl}/api/products?category=${category}&orderBy=${sort}&descending=false&page=${page}&pageSize=${size}`);
    const data = await response.json();
    return data;
}

export const getProductById = async (id: string) => {
    const response = await fetch(`${rootUrl}/api/products/${id}`);
    const data = await response.json();
    return data;
}
