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
