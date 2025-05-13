import BaseInput from "@components/shared/BaseInput/BaseInput"
import Button from "@components/shared/Button/Button";

type OrderSummaryProps = {
    subtotal: number;
    shipping: number;
    total: number;
    };

const OrderSummary = ({ subtotal, shipping, total}:OrderSummaryProps) => {
  return (
    <div className="w-full max-w-lg 2xl:max-w-lg bg-white shadow-md rounded-md p-4 flex flex-col gap-4">
        <h3>Order Summary</h3>
        <BaseInput placeholder="Enter coupon code here"/>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm font-semibold">Subtotal</span>
          <span className="text-sm font-semibold">${subtotal}</span>
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
        <Button text="Continue to checkout"/>
    </div>
  )
}

export default OrderSummary