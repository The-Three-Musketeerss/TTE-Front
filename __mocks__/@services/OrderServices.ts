export const createOrder = async (address, token) => {
  return Promise.resolve({
    message: "Order created successfully",
    address,
  });
};
