export const getUsers = async (token: string) => {
  return Promise.resolve([
    {
      id: 1,
      userName: "adminUser",
      name: "Admin User",
      email: "admin@example.com",
      role: "Admin",
    },
    {
      id: 2,
      userName: "jdoe",
      name: "John Doe",
      email: "jdoe@example.com",
      role: "Shopper",
    },
  ]);
};
