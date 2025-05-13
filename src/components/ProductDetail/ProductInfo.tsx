import { useState } from "react";
import Button from "@components/shared/Button/Button";
import QuantityInput from "@components/shared/QuantityInput/QuantityInput";
import { useGetUser } from "@hooks/useGetUser";
import { addToCart } from "@services/CartServices";
import { ProductProps } from "@utils/types";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { CiShare1 } from "react-icons/ci";
import { useShop } from "@contexts/ShopContext";

const ProductInfo = (product: ProductProps) => {
  const [count, setCount] = useState(1);
  const { hasLoggedIn, user } = useGetUser();
  const { isInWishlist, toggleWishlist, refreshCart } = useShop();

  const handleAddToCart = async () => {
    if (hasLoggedIn && user?.role === "Shopper") {
      try {
        await toast.promise(
          addToCart(user?.token, product.id!, count),
          {
            loading: "Adding to cart...",
            success: "Added to cart",
            error: (error) => error.message,
          }
        );
        await refreshCart();
      } catch (err) {
        console.error("Error adding to cart", err);
      }
    } else {
      toast.error("Please log in to add items to your cart.");
    }
  };

  const isWishlisted = product.id !== undefined ? isInWishlist(product.id) : false;

  const handleWishlistToggle = () => {
    if (product.id !== undefined) {
      toggleWishlist(product.id);
    }
  };

  return (
    <article className="lg:max-w-2/3 flex flex-col space-y-5">
      <span className="flex items-start justify-between">
        <h2 className="font-semibold text-2xl lg:text-4xl max-w-2/3">
          {product.title}
        </h2>
        <div className="flex flex-row space-x-1">
          <button onClick={handleWishlistToggle} className="hover:text-error transition cursor-pointer">
            {isWishlisted ? (
              <AiFillHeart className="text-3xl text-error" />
            ) : (
              <AiOutlineHeart className="text-3xl" />
            )}
          </button>
          <CiShare1 className="text-3xl" />
        </div>
      </span>
      <p className="mb-4 lg:mb-8">${product.price}</p>
      <p className="lg:w-80 overflow-clip text-left">{product.description}</p>
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <Button
          text={`Add to Cart - $${(product.price * count).toFixed(2)}`}
          onClick={handleAddToCart}
        />
        <QuantityInput
          count={count}
          setCount={setCount}
          maxCount={product.inventory?.available}
        />
      </div>
    </article>
  );
};

export default ProductInfo;
