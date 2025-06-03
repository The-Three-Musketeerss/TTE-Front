export const getProductById = () => {
  return Promise.resolve({
    data: {
      id: 1,
      title: "Mocked Product",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    },
  });
};
