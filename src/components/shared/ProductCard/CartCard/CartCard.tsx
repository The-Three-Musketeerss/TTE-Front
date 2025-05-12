import { deleteFromCart, getCart } from "@services/CartServices";
import { ProductProps } from "@utils/types";
import toast from "react-hot-toast";

type Props = ProductProps & {
  token: string;
  setCart: any;
};

const CartCard = ({
  id,
  image,
  price,
  title,
  quantity,
  token,
  setCart,
}: Props) => {
  const handleRemoveFromCart = () => {
    toast.promise(deleteFromCart(token, id!), {
      loading: "Removing from cart...",
      success: (data) => {
        getCart(token).then((updatedCart) => {
          setCart(updatedCart.data);
        });
        return <span>{data.message}</span>;
      },
      error: (error) => {
        return <span>{error.message}</span>;
      },
    });
  };

  return (
    <div className="bg-gray-100 flex items-start p-4 rounded-md shadow-sm w-full max-w-md">
      <div className="w-20 h-20 bg-gray-300 rounded-md mr-4 flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="flex flex-col justify-between w-full">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="text-xs text-gray-600">Quantity: {quantity}</p>
            <p className="text-base font-semibold mt-1">${price}</p>
          </div>
        </div>

        <button
          className="text-xs text-blue-600 underline mt-2 w-fit cursor-pointer"
          onClick={handleRemoveFromCart}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartCard;
