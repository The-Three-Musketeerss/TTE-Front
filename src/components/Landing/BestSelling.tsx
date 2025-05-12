import { useEffect, useState } from "react";
import ProductCard from "@components/shared/ProductCard/ProductCard";
import Button from "@components/shared/Button/Button";
import { getTopSellingProducts } from "@services/ProductServices";
import { ProductProps } from "@utils/types";

const BestSelling = () => {
  const [bestSellers, setBestSellers] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchBestSellers = async () => {
      const response = await getTopSellingProducts();
      setBestSellers(response.data);
    };

    fetchBestSellers();
  }, []);

  return (
    <section className="flex flex-col items-center mt-20 mb-20">
      <h1 className="text-4xl font-semibold text-primary text-center mb-5">
        Best Sellers
      </h1>
      <p className="text-base-content max-w-[400px] text-center pb-5">
        Our community’s all-time favorites. Loved, trusted, and worn the most.
      </p>
      <Button text="Shop all" fullWidth={false} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-6xl px-4">
        {bestSellers.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default BestSelling;
