import CartCard from "@components/shared/CartCard/CartCard";
import OrderSummary from "@components/Checkout/OrderSummary/OrderSummary";
import { CartItemProps } from "@utils/types";
import { useGetUser } from "@hooks/useGetUser";
import React from "react";

type Props = {
  cart: CartItemProps;
  setCart: (cart: CartItemProps) => void;
};

const CheckoutSummary = ({ cart, setCart }: Props) => {
  const { user } = useGetUser();

  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-6">
      <div className="flex flex-col gap-4 max-h-80 overflow-y-scroll">
        {cart.shoppingCart.map((item) => (
          <CartCard
            key={item.productId}
            id={item.productId}
            quantity={item.quantity}
            token={user?.token}
            setCart={setCart}
          />
        ))}
      </div>
      <OrderSummary
        subtotal={cart.totalBeforeDiscount}
        subAfterDiscount={cart.totalAfterDiscount}
        shipping={cart.shippingCost}
        total={cart.finalTotal}
        setCart={setCart}
      />
    </div>
  );
};

export default React.memo(CheckoutSummary);
