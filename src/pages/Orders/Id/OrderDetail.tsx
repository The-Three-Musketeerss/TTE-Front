import OrderCard from "@components/OrderDetail/OrderCard/OrderCard";
import { useGetUser } from "@hooks/useGetUser";
import { getOrderById } from "@services/OrderServices";
import { orderProps } from "@utils/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetail = () => {
  const { id } = useParams();
  const { user } = useGetUser();
  const [order, setOrder] = useState<orderProps>();

  const fetchOrder = async () => {
    const response = await getOrderById(user?.token, Number(id));
    setOrder(response.data);
  };

  useEffect(() => {
    if (user?.token) {
      fetchOrder();
    }
  }, [user?.token, id]);

  return <section>
    <div className="flex flex-col gap-4 mt-4 overflow-y-scroll h-80">
          {order?.orderItems.map((item) => (
            <OrderCard
              key={item.productId}
              id={item.productId}
              quantity={item.quantity}
              token={user?.token}
            />
          ))}
        </div>
  </section>;
};

export default OrderDetail;
