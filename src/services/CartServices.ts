const rootUrl = import.meta.env.VITE_API_URL;

export const getCart = async (token: string) => {
    const response = await fetch(`${rootUrl}/api/cart`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}