import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "@hooks/useGetUser";
import { getWishlist } from "@services/WishlistServices";
import ProductCard from "@components/shared/ProductCard/ProductCard";
import Skeleton from "@components/shared/ProductCard/Skeleton/Skeleton";
import Button from "@components/shared/Button/Button";
import { ProductProps } from "@utils/types";

const Wishlist = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useGetUser();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user?.token) return;
      try {
        const productList = await getWishlist(user.token);
        setProducts(productList);
      } catch (error) {
        console.error("Failed to load wishlist", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user?.token]);

  return (
    <div className="flex flex-col items-center min-h-screen px-4">
      <h1 className="text-4xl font-semibold text-primary text-center mb-5">My Wishlist</h1>
      <p className="text-base-content max-w-[400px] text-center pb-5">
        Discover your favorite picks saved for later. Curated for your taste, always ready when you are.
      </p>
      <Button text="Shop all" fullWidth={false} onClick={() => navigate("/listing")} />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-6xl">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-6xl">
          {products.map((item) => (
            <ProductCard
              key={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
              id={item.id}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-center text-base-content">
          <p className="text-xl font-medium">Your wishlist is empty</p>
          <p className="text-sm mt-2">Start adding your favorite items to keep track of them here.</p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
