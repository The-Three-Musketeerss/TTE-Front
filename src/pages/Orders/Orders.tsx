import { useGetUser } from "@hooks/useGetUser";
import { useOrders } from "@hooks/useOrders";
import Table from "@components/shared/Table/Table";
import TableSkeleton from "@components/shared/Table/Skeleton/Skeleton";
import { Link, useNavigate } from "react-router-dom";

const Orders = () => {
  const headers = [
    { label: "Order No.", key: "orderNo" },
    { label: "Customer Name", key: "customerName" },
    { label: "Payment Status", key: "paymentStatus" },
    { label: "Amount", key: "amount" },
    { label: "Address", key: "address" },
    { label: "Order Date", key: "orderDate" },
    { label: "Status", key: "status" },
  ];

  const { user, hasLoggedIn } = useGetUser();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
  } = useOrders(user?.token);

  if (!hasLoggedIn || user?.role !== "Shopper") {
    navigate("/", { replace: true });
    return null;
  }

  const formatted = data?.data.map((order: any) => ({
    orderNo: (
      <Link to={`/orders/${order.id}`} className="text-blue-500 hover:underline">
        {order.id}
      </Link>
    ),
    customerName: order.customerName,
    paymentStatus: order.paymentStatus,
    amount: `$${order.finalTotal.toFixed(2)}`,
    address: order.address,
    orderDate: new Date(order.createdAt).toLocaleDateString(),
    status: order.status,
  }));

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-primary">My Orders</h1>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : formatted?.length > 0 ? (
        <Table headers={headers} data={formatted} />
      ) : (
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg">No orders found.</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
