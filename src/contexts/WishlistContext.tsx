import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getWishlist, addToWishlist, removeFromWishlist } from "@services/WishlistServices";
import { useGetUser } from "@hooks/useGetUser";

type WishlistContextType = {
  wishlist: number[];
  isInWishlist: (productId: number) => boolean;
  toggleWishlist: (productId: number) => Promise<void>;
  loading: boolean;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useGetUser();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user?.token || user?.role !== "Shopper") return;

      try {
        const data = await getWishlist(user.token);
        const ids = data.map((product) => product.id);
        setWishlist(ids);
      } catch (err) {
        console.error("Failed to fetch wishlist", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);

  const isInWishlist = (productId: number) => wishlist.includes(productId);

  const toggleWishlist = async (productId: number) => {
    if (!user?.token || user?.role !== "Shopper") {
      toast.error("Only shoppers can add to wishlist");
      return;
    }

    try {
      if (wishlist.includes(productId)) {
        await removeFromWishlist(productId, user.token);
        setWishlist((prev) => prev.filter((id) => id !== productId));
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist(productId, user.token);
        setWishlist((prev) => [...prev, productId]);
        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error("Failed to update wishlist");
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, isInWishlist, toggleWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
