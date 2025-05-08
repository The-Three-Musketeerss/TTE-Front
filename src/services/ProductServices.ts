const rootUrl = import.meta.env.VITE_API_URL;
type Product = {
    category?: string;
    sort?: string;
}

export const getProducts = async ({category = '', sort = ''}: Product) => {
    const response = await fetch(`${rootUrl}/api/products?category=${category}&orderBy=${sort}&descending=false&page=1&pageSize=10`);
    const data = await response.json();
    return data;
}