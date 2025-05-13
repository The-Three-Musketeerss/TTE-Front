import { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "@services/CategoryServices";
import Table from "@components/shared/Table/Table";
import TableSkeleton from "@components/shared/Table/Skeleton/Skeleton";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useGetUser } from "@hooks/useGetUser";
import toast from "react-hot-toast";
import EditCategoryForm from "@components/Homepage/EditCategory/EditCategoryForm";

const CategoryList = () => {
  const headers = [
    { label: "ID", key: "id" },
    { label: "Category", key: "name" },
    { label: "Actions", key: "actions" },
  ];

  const { user } = useGetUser();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data.data);
    } catch (err) {
      console.error("Failed to load categories", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this category?");
    if (!confirmed) return;

    try {
      await deleteCategory(id, user?.token);
      toast.success("Category deleted");
      fetchCategories();
    } catch (err: any) {
      console.error("Error deleting category", err);
      toast.error(err.message || "Failed to delete category");
    }
  };

  const dataWithActions = categories.map((category) => ({
    ...category,
    actions: (
      <div className="flex gap-4 justify-start">
        <FaEdit
          className="text-blue-500 hover:cursor-pointer"
          onClick={() => setEditingCategoryId(category.id)}
        />
        <FaTrash
          className="text-red-500 hover:cursor-pointer"
          onClick={() => handleDelete(category.id)}
        />
      </div>
    ),
  }));

  if (editingCategoryId !== null && user?.token) {
    return (
      <EditCategoryForm
        categoryId={editingCategoryId}
        token={user.token}
        onCancel={() => setEditingCategoryId(null)}
        onSuccess={() => {
          setEditingCategoryId(null);
          fetchCategories();
        }}
      />
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-primary">Categories</h1>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <Table headers={headers} data={dataWithActions} />
      )}
    </>
  );
};

export default CategoryList;
