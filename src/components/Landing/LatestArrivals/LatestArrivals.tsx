import ProductCard from "@components/shared/ProductCard/ProductCard";
import Skeleton from "@components/shared/ProductCard/Skeleton/Skeleton";
import Button from "@components/shared/Button/Button";
import { useShop } from "@contexts/ShopContext";
import { useLatestArrivals } from "@hooks/useLatestArrivals";

const LatestArrivals = () => {
  const { isInWishlist, toggleWishlist } = useShop();

  const {
    data,
    isLoading,
    isError,
  } = useLatestArrivals();

  const products = data?.data ?? [];

  return (
    <section className="flex flex-col items-center mt-20">
      <h1 className="text-4xl font-semibold text-primary text-center mb-5">Latest arrivals</h1>
      <p className="text-base-content max-w-[400px] text-center pb-5">
        Explore the newest additions to our collection — fresh styles and trending picks just for you.
      </p>
      <Button
        text="Shop all"
        fullWidth={false}
        onClick={() => {
          throw new Error("This is your first error!");
        }}
      />

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

export default LatestArrivals;