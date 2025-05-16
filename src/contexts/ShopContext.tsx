import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getWishlist, addToWishlist, removeFromWishlist } from "@services/WishlistServices";
import { getCart } from "@services/CartServices";
import { useGetUser } from "@hooks/useGetUser";

type ShopContextType = {
  wishlist: Set<number>;
  isInWishlist: (productId: number) => boolean;
  toggleWishlist: (productId: number) => Promise<void>;
  loading: boolean;

  cartCount: number;
  refreshCart: () => Promise<void>;
  resetShop: () => void;
};

const ShopContext = createContext<ShopContextType | null>(null);

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useGetUser();
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState<number>(0);

  const fetchWishlist = async () => {
    if (!user?.token || user?.role !== "Shopper") return;

    try {
      const data = await getWishlist(user.token);
      const ids = new Set(data.map((product) => product.id));
      setWishlist(ids);
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
    } finally {
      setLoading(false);
    }
  };

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

  const resetShop = () => {
    setWishlist(new Set());
    setCartCount(0);
  };

  useEffect(() => {
    if (user?.token && user?.role === "Shopper") {
      fetchWishlist();
      refreshCart();
    } else {
      resetShop();
    }
  }, [user?.token, user?.role]);

  const isInWishlist = (productId: number) => wishlist.has(productId);

  const toggleWishlist = async (productId: number) => {
    if (!user?.token || user?.role !== "Shopper") {
      toast.error("Only shoppers can add to wishlist");
      return;
    }

    try {
      if (wishlist.has(productId)) {
        await removeFromWishlist(productId, user.token);
        setWishlist((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist(productId, user.token);
        setWishlist((prev) => {
          const newSet = new Set(prev);
          newSet.add(productId);
          return newSet;
        });
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
        resetShop,
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
