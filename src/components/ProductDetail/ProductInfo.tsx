import { useState } from "react";
import Button from "@components/shared/Button/Button";
import QuantityInput from "@components/shared/QuantityInput/QuantityInput";
import { ProductProps } from "@utils/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { CiShare1 } from "react-icons/ci";
import { useWishlist } from "@contexts/WishlistContext";

const ProductInfo = (product: ProductProps) => {
  const [count, setCount] = useState(1);
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isWishlisted = product.id !== undefined ? isInWishlist(product.id) : false;

  const handleWishlistToggle = () => {
    if (product.id !== undefined) {
      toggleWishlist(product.id);
    }
  };

  return (
    <article className="lg:max-w-2/3 flex flex-col space-y-5">
      <span className="flex items-start justify-between">
        <h2 className="font-semibold text-3xl lg:text-4xl max-w-2/3">
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
      <div className="flex flex-row space-x-4">
        <Button text={`Add to Cart - $${product.price * count}`} />
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
