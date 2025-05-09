import ProductDetailSkeleton from "@components/ProductDetail/ProductDetailSkeleton";
import ProductInfo from "@components/ProductDetail/ProductInfo";
import Button from "@components/shared/Button/Button";
import { getProductById } from "@services/ProductServices";
import { ProductProps } from "@utils/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductProps>();
  const loading = !product;

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
  }, [id]);

  return (
    <section className="text-primary">
      {loading && <ProductDetailSkeleton />}
      {product && <ProductInfo {...product} />}
    </section>
  );
};

export default ProductDetail;
