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

  return <section></section>;
};

export default OrderDetail;
