import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "@services/ProductServices";
import Table from "@components/shared/Table/Table";
import TableSkeleton from "@components/shared/Table/Skeleton/Skeleton";
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useGetUser } from "@hooks/useGetUser";
import toast from "react-hot-toast";
import EditProductForm from "@components/Homepage/EditProduct/EditProductForm";
import Button from "@components/shared/Button/Button";

const ProductList = () => {
  const headers = [
    { label: "Title", key: "title" },
    { label: "Total", key: "total" },
    { label: "Available", key: "available" },
    { label: "Created", key: "createdAt" },
    { label: "Price", key: "price" },
    { label: "Actions", key: "actions" },
  ];

  const { user } = useGetUser();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
  });

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const response = await getProducts({ page, size: 10 });
      setProducts(response.data);
      setPagination({ page: response.page, totalPages: response.totalPages });
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(pagination.page);
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      await deleteProduct(id.toString(), user?.token);
      toast.success("Product deleted");
      fetchProducts(pagination.page);
    } catch (err: any) {
      console.error("Error deleting product", err);
      toast.error(err.message || "Failed to delete product");
    }
  };

  const handlePageChange = (direction: "next" | "prev") => {
    const newPage = direction === "next" ? pagination.page + 1 : pagination.page - 1;
    fetchProducts(newPage);
  };

  const dataWithActions = products.map((product) => ({
    title: product.title,
    total: product.inventory.total,
    available: product.inventory.available,
    createdAt: new Date(product.createdAt).toLocaleDateString(),
    price: `$${product.price}`,
    actions: (
      <div className="flex gap-4 justify-start">
        <FaEdit
          title="Edit Button"
          className="text-blue-500 hover:cursor-pointer"
          onClick={() => setEditingProductId(product.id)}
        />
        <FaTrash
          title="Delete Button"
          className="text-red-500 hover:cursor-pointer"
          onClick={() => handleDelete(product.id)}
        />
      </div>
    ),
  }));

  if (editingProductId !== null && user?.token) {
    return (
      <EditProductForm
        productId={editingProductId}
        token={user.token}
        onCancel={() => setEditingProductId(null)}
        onSuccess={() => {
          setEditingProductId(null);
          fetchProducts(pagination.page);
        }}
      />
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-primary">Products</h1>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <>
          <Table headers={headers} data={dataWithActions} />

          <div className="flex items-center justify-center mt-4 gap-4">
            <Button
              onClick={() => handlePageChange("prev")}
              text={<FaChevronLeft />}
              disabled={pagination.page === 1}
              fullWidth={false}
            />
            <p className="text-sm text-gray-700 min-w-[120px] text-center">
              Page {pagination.page} of {pagination.totalPages}
            </p>
            <Button
              onClick={() => handlePageChange("next")}
              text={<FaChevronRight />}
              disabled={pagination.page === pagination.totalPages}
              fullWidth={false}
            />
          </div>

        </>
      )}
    </>
  );
};

export default ProductList;
