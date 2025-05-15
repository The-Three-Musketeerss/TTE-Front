import { getProductById } from "@services/ProductServices";
import { ProductProps } from "@utils/types";
import { useEffect, useState } from "react";

type Props = {
  token: string;
  id: number;
  quantity: number;
};

const OrderCard = ({ id, token, quantity }: Props) => {
  const [product, setProduct] = useState<ProductProps>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id.toString());
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [id, token]);

  if (!product) {
    return <div></div>;
  }

  return (
    <div className="bg-white flex items-start p-4 rounded-md shadow-sm w-full">
      <div className="w-20 h-20 bg-gray-300 rounded-md mr-4 flex-shrink-0">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="flex flex-col justify-between w-full">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xs lg:text-sm font-semibold">{product.title}</h3>
            <p className="text-xs text-gray-600">Quantity: {quantity}</p>
            <p className="text-base font-semibold mt-1">${(product.price * quantity).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
