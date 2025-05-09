import Button from "@components/shared/Button/Button";
import QuantityInput from "@components/shared/QuantityInput/QuantityInput";
import { ProductProps } from "@utils/types";
import { useState } from "react";

const ProductInfo = (product: ProductProps) => {
  const [count, setCount] = useState(1);

  return (
    <article className="lg:max-w-2/6 flex flex-col space-y-5">
      <h2 className="font-semibold text-3xl lg:text-4xl">{product.title}</h2>
      <p className="mb-4 lg:mb-8">${product.price}</p>
      <p className="lg:w-80 lg:text-left">{product.description}</p>
      <div className="flex flex-row space-x-4">
        <Button fullWidth={false} text={`Add to Cart-$${product.price * 2}`} />
        <QuantityInput count={count} setCount={setCount} maxCount={product.inventory?.available}/>
      </div>
    </article>
  );
};

export default ProductInfo;
