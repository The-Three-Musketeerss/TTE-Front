import { useGetUser } from "@hooks/useGetUser";
import { getCart } from "@services/CartServices";
import { CartItemProps } from "@utils/types";
import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState<CartItemProps>();
  const { hasLoggedIn, user } = useGetUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (hasLoggedIn && user?.role === "Shopper") {
      const fetchCart = async () => {
        try {
          const response = await getCart(user?.token);
          setCart(response.data);
        } catch (error) {
          console.error("Failed to fetch cart:", error);
        }
      };
      fetchCart();
    } else {
      navigate("/", { replace: true });
    }
  }, [hasLoggedIn, user]);

  if (cart?.shoppingCart.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <p className="mt-4 text-gray-500">
          Browse our products and add them to your cart!
        </p>
      </section>
    );
  } else {
    return (
      <section>
        <h1 className="font-semibold text-4xl">Your Cart</h1>
      </section>
    );
  }
};

export default Cart;
