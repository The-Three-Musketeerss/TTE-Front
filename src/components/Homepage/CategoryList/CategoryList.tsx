import { useEffect, useState } from "react";
import { getCategories } from "@services/CategoryServices";
import Table from "@components/shared/Table/Table";
import TableSkeleton from "@components/shared/Table/Skeleton/Skeleton";
import { FaEdit, FaTrash } from "react-icons/fa";

const CategoryList = () => {
  const headers = [
    { label: "ID", key: "id" },
    { label: "Category", key: "name" },
    { label: "Actions", key: "actions" },
  ];

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.data);
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const dataWithActions = categories.map((category) => ({
    ...category,
    actions: (
      <div className="flex gap-4 justify-start">
        <FaEdit className="text-blue-500 hover:cursor-pointer" />
        <FaTrash className="text-red-500 hover:cursor-pointer" />
      </div>
    ),
  }));

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