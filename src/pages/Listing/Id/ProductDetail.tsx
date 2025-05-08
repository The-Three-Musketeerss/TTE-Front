import { getProductById } from "@services/ProductServices";
import { ProductProps } from "@utils/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductProps>();

  const fetchProduct = async () => {
    if (!id) {
      throw new Error("Product ID is undefined");
    }
    const response = await getProductById(id);
    setProduct(response.data);
  };

  useEffect(() => {
    fetchProduct().catch((error) => {
      console.error("Error fetching product:", error);
    });
  }
  , [id]);

  return (
    <section>
      <h2 className="font-semibold text-3xl lg:text-4xl mb-4 lg:mb-8">{product?.title}</h2>
    </section>
  );
};

export default ProductDetail;
