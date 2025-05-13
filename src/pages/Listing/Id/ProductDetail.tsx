import ProductDetailSkeleton from "@components/ProductDetail/ProductDetailSkeleton";
import ProductInfo from "@components/ProductDetail/ProductInfo";
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
    <section className="text-primary flex flex-col items-center justify-center space-y-5 lg:flex-row lg:justify-between lg:space-x-24 lg:items-start lg:mx-auto lg:max-w-7xl px-4 py-8">
      {loading && <ProductDetailSkeleton />}
      {product && (
        <>
          <img
            src={product.image}
            alt={product.title}
            className="max-w-sm lg:max-w-1/2 object-contain bg-white aspect-square rounded-md shadow hover:scale-105"
          />
          <ProductInfo {...product} />
        </>
      )}
    </section>
  );
};

export default ProductDetail;
