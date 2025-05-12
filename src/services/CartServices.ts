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

export const addToCart = async (token: string, productId: number, quantity: number) => {
    const response = await fetch(`${rootUrl}/api/cart`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, quantity })
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to add item to cart');
    }

    return data;
}