import Button from "@components/shared/Button/Button";
import WishlistCard from "@components/Wishlist/WishlistCard/WishlistCard";

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const wishlistItems: WishlistItem[] = [
  { id: 1, name: "Sandals", price: 99, imageUrl: "https://media.istockphoto.com/id/1804088535/photo/legs-of-an-asian-woman.jpg?s=1024x1024&w=is&k=20&c=ekRY6b7hto8K1H8Om585jcEMr2GRmNUZyZWrIRotmrg=" },
  { id: 2, name: "Pants", price: 99, imageUrl: "https://plus.unsplash.com/premium_photo-1673977134363-c86a9d5dcafa?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 3, name: "Sweater", price: 99, imageUrl: "https://media.istockphoto.com/id/1975908052/photo/portrait-of-beautiful-young-woman-on-white-background.jpg?s=1024x1024&w=is&k=20&c=5TZg7R-lhZO5TiqgVL4IEVjxjckp0pv5TeVaXPG5Hf4=" },
];

const Wishlist = () => {
  return (
    <div className="flex flex-col items-center min-h-screen px-4">
      <h1 className="text-4xl font-semibold text-primary text-center mb-5">My Wishlist</h1>
      <p className="text-base-content max-w-[400px] text-center pb-5">
        Discover your favorite picks saved for later. Curated for your taste, always ready when you are.
      </p>
      <Button text="Shop all" fullWidth={false} />

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-6xl">
          {wishlistItems.map((item) => (
            <WishlistCard
              key={item.id}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
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
