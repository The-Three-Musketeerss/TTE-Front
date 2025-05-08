const rootUrl = import.meta.env.VITE_API_URL;
export const getProducts = async () => {
    const response = await fetch(`${rootUrl}/api/products?descending=false&page=1&pageSize=10`);
    const data = await response.json();
    return data;
}