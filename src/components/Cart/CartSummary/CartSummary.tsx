import BaseInput from "@components/shared/BaseInput/BaseInput";
import Button from "@components/shared/Button/Button";
import { couponResolver } from "./CartSummary.resolver";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { applyCoupon, getCart } from "@services/CartServices";
import { useGetUser } from "@hooks/useGetUser";
import { useShop } from "@contexts/ShopContext";

type OrderSummaryProps = {
  subtotal: number;
  subAfterDiscount: number;
  shipping: number;
  total: number;
  setCart: any;
};

const CartSummary = ({
  subtotal,
  shipping,
  total,
  subAfterDiscount,
  setCart,
}: OrderSummaryProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(couponResolver),
  });

  const { refreshCart } = useShop();
  const { user } = useGetUser();

  const onSubmit = (data: any) => {
    toast.promise(applyCoupon(user?.token, data.couponCode), {
      loading: "Applying coupon...",
      success: (response) => {
        getCart(user?.token).then((updatedCart) => {
          setCart(updatedCart.data);
          refreshCart();
        });
        return `Coupon applied! ${response.message}`;
      },
      error: (error) => {
        return `Error applying coupon: ${error.message}`;
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-lg 2xl:max-w-lg bg-white shadow-md rounded-md p-4 flex flex-col gap-4"
    >
      <h3>Order Summary</h3>
      <BaseInput
        register={register("couponCode")}
        error={errors.couponCode}
        buttonText="Enter"
        button
        placeholder="Enter coupon code here"
      />
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm font-semibold">Subtotal</span>
        <span className="text-sm font-semibold">${subtotal}</span>
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm font-semibold">Discount</span>
        <span className="text-sm font-semibold">
          ${(subtotal - subAfterDiscount).toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm font-semibold">Shipping</span>
        <span className="text-sm font-semibold">${shipping}</span>
      </div>
      <span className="w-full outline-1 outline-gray-300 flex"></span>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm font-semibold">Total</span>
        <span className="text-sm font-semibold">${total}</span>
      </div>
      <Button text="Continue to checkout" />
    </form>
  );
};

export default CartSummary;
