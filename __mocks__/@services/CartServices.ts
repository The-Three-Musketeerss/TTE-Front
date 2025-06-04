export const applyCoupon = async (token: string, code: string) => {
  return Promise.resolve({
    message: "Coupon applied successfully",
  });
};

export const getCart = async (token: string) => {
  return Promise.resolve({
    data: { items: [] },
  });
};

export const deleteFromCart = async (token: string, productId: number) => {
  return Promise.resolve({
    message: `Item ${productId} removed from cart.`,
  });
};

export const addToCart = async (token: string, productId: number, quantity: number) => {
  return Promise.resolve({ message: `Added ${quantity} of product ${productId}` });
};
