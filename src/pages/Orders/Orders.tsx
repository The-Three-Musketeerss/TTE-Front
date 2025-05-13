import { useEffect, useState } from "react";
import { useGetUser } from "@hooks/useGetUser";
import { getOrders } from "@services/OrderServices";
import Table from "@components/shared/Table/Table";
import TableSkeleton from "@components/shared/Table/Skeleton/Skeleton";

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

  const { user } = useGetUser();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.token) return;

      try {
        const response = await getOrders(user.token);
        const formatted = response.data.map((order: any) => ({
          orderNo: order.id,
          customerName: order.customerName,
          paymentStatus: order.paymentStatus,
          amount: `$${order.finalTotal.toFixed(2)}`,
          address: order.address,
          orderDate: new Date(order.createdAt).toLocaleDateString(),
          status: order.status,
        }));
        setOrders(formatted);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-primary">My Orders</h1>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : orders.length > 0 ? (
        <Table headers={headers} data={orders} />
      ) : (
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg">No orders found.</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
