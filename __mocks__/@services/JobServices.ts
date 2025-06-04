export const getJobs = async (token: string) => {
  return Promise.resolve({
    data: [
      {
        id: 1,
        type: "Create",
        id_item: 101,
        operation: "Add product",
        itemName: "Wireless Mouse",
        createdAt: new Date().toISOString(),
        createdBy: "admin@example.com",
      },
      {
        id: 2,
        type: "Update",
        id_item: 102,
        operation: "Edit category",
        itemName: "Electronics",
        createdAt: new Date().toISOString(),
        createdBy: "editor@example.com",
      },
    ],
  });
};

export const reviewJob = async (id: number, token: string, action: "approve" | "decline") => {
  return Promise.resolve({
    message: `Job ${id} ${action === "approve" ? "approved" : "rejected"}`,
  });
};
