import OrderCard from "@components/OrderDetail/OrderCard/OrderCard";
import OrderSummary from "@components/OrderDetail/OrderSummary/OrderSummary";
import { useGetUser } from "@hooks/useGetUser";
import { getOrderById } from "@services/OrderServices";
import { orderProps } from "@utils/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const OrderDetail = () => {
  const { id } = useParams();
  const { user } = useGetUser();
  const navigate = useNavigate();
  const [order, setOrder] = useState<orderProps>();
  const loading = order === undefined;

  const fetchOrder = async () => {
    try {
      const response = await getOrderById(user?.token, Number(id));
      setOrder(response.data);
    } catch (error) {
      console.error("Failed to fetch order:", error);
      navigate("/orders", { replace: true });
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchOrder();
    } else {
      navigate("/login", { replace: true });
    }
  }, [user?.token, id]);

  if (!order && !loading) {
    return (
      <section className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold">No orders yet</h1>
      </section>
    );
  }

  return (
    <section className="flex flex-col lg:flex-row items-center justify-center 2xl:justify-start lg:items-start gap-4 2xl:gap-8 p-4 2xl:p-8">
      <div className="flex flex-col gap-4 mt-4 overflow-y-scroll h-full w-full max-w-md 2xl:max-w-4xl">
        {order?.orderItems!.map((item) => (
          <OrderCard
            key={item.productId}
            id={item.productId}
            quantity={item.quantity}
            token={user?.token}
          />
        ))}
      </div>
      {order && <OrderSummary {...order} />}
    </section>
  );
};

export default OrderDetail;
