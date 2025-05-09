import Button from "@components/shared/Button/Button";
import QuantityInput from "@components/shared/QuantityInput/QuantityInput";
import { ProductProps } from "@utils/types";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { CiShare1 } from "react-icons/ci";

const ProductInfo = (product: ProductProps) => {
  const [count, setCount] = useState(1);

  return (
    <article className="lg:max-w-2/6 flex flex-col space-y-5">
      <span className="flex items-start justify-between">
        <h2 className="font-semibold text-3xl lg:text-4xl max-w-2/3">
          {product.title}
        </h2>
        <div className="flex flex-row space-x-1">
        <AiFillHeart className="text-3xl" />
        <CiShare1 className="text-3xl" />
        </div>
      </span>
      <p className="mb-4 lg:mb-8">${product.price}</p>
      <p className="lg:w-80 overflow-clip text-left">{product.description}</p>
      <div className="flex flex-row space-x-4">
        <Button
          text={`Add to Cart - $${product.price * count}`}
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
