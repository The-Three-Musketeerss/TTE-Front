import { useGetUser } from "@hooks/useGetUser";
import { getCart } from "@services/CartServices";
import { CartItemProps } from "@utils/types";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartCard from "@components/shared/ProductCard/CartCard/CartCard";
import Shipping from "@components/Cart/Shipping/Shipping";
import OrderSummary from "@components/Cart/OrderSummary/OrderSummary";

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
  }, [hasLoggedIn, user?.role]);

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
      <section className="flex flex-col lg:flex-row items-center justify-center 2xl:justify-start lg:items-start gap-4 2xl:gap-8 p-4 2xl:p-8">
        <div className="max-w-md 2xl:max-w-4xl">
        <h1 className="font-semibold text-2xl lg:text-4xl">Your Cart</h1>
        <Link to={"/listing"} className="font-medium text-sm mt-2 lg:text-base">
          Not ready to checkout? Continue Shopping
        </Link>
        <div className="flex flex-col gap-4 mt-4 overflow-y-scroll h-80">
          {cart?.shoppingCart.map((item) => (
            <CartCard
              key={item.productId}
              id={item.productId}
              quantity={item.quantity}
              token={user?.token}
              setCart={setCart}
            />
          ))}
        </div>
        <Shipping />
        </div>
        <OrderSummary
          subtotal={cart?.totalAfterDiscount!}
          shipping={cart?.shippingCost!}
          total={cart?.finalTotal!}
        />
      </section>
    );
  }
};

export default Cart;
