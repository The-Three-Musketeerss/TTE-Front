import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getWishlist, addToWishlist, removeFromWishlist } from "@services/WishlistServices";
import { getCart } from "@services/CartServices";
import { useGetUser } from "@hooks/useGetUser";

type ShopContextType = {
  wishlist: number[];
  isInWishlist: (productId: number) => boolean;
  toggleWishlist: (productId: number) => Promise<void>;
  loading: boolean;

  cartCount: number;
  refreshCart: () => Promise<void>;
};

const ShopContext = createContext<ShopContextType | null>(null);

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useGetUser();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const [cartCount, setCartCount] = useState<number>(0);

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

  const refreshCart = async () => {
    if (!user?.token || user?.role !== "Shopper") return;
    try {
      const cart = await getCart(user.token);
      const totalQuantity = cart.data.shoppingCart.reduce(
        (sum: number, item: { quantity: number }) => sum + item.quantity,
        0
      );
      setCartCount(totalQuantity);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  };

  useEffect(() => {
    refreshCart();
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
    <ShopContext.Provider
      value={{
        wishlist,
        isInWishlist,
        toggleWishlist,
        loading,
        cartCount,
        refreshCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
