const rootUrl = import.meta.env.VITE_API_URL;
export const getCategories = async () => {
    const response = await fetch(`${rootUrl}/api/categories`);
    const data = await response.json();
    return data;
}