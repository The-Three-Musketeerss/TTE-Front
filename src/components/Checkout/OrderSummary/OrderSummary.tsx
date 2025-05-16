type OrderSummaryProps = {
  subtotal: number;
  subAfterDiscount: number;
  shipping: number;
  total: number;
  setCart: any;
};

const OrderSummary = ({
  subtotal,
  shipping,
  total,
  subAfterDiscount,
}: OrderSummaryProps) => {
  return (
    <div className="w-full max-w-lg 2xl:max-w-lg bg-white shadow-md rounded-md p-4 flex flex-col gap-4">
      <h3>Order Summary</h3>

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
    </div>
  );
};

export default OrderSummary;
