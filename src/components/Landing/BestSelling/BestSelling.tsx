import { useNavigate } from "react-router-dom";
import ProductCard from "@components/shared/ProductCard/ProductCard";
import Skeleton from "@components/shared/ProductCard/Skeleton/Skeleton";
import Button from "@components/shared/Button/Button";
import { useShop } from "@contexts/ShopContext";
import { useTopSellingProducts } from "@hooks/useTopSellingProducts";

const BestSelling = () => {
  const { isInWishlist, toggleWishlist } = useShop();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
  } = useTopSellingProducts();

  const products = data?.data || [];

  return (
    <section className="flex flex-col items-center mt-20 mb-20">
      <h1 className="text-4xl font-semibold text-primary text-center mb-5">
        Best Sellers
      </h1>
      <p className="text-base-content max-w-[400px] text-center pb-5">
        Our community’s all-time favorites. Loved, trusted, and worn the most.
      </p>
      <Button text="Shop all" fullWidth={false} onClick={() => navigate("/listing")} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-6xl px-4">
        {isLoading
          ? [1, 2, 3].map((i) => <Skeleton key={i} />)
          : isError
            ? <p className="text-center text-red-500 col-span-full">Failed to load products.</p>
            : products.map((item) => (
                <ProductCard
                  key={item.id}
                  {...item}
                  isFavorite={isInWishlist(item.id)}
                  onToggleFavorite={toggleWishlist}
                />
              ))}
      </div>
    </section>
  );
};

export default BestSelling;
