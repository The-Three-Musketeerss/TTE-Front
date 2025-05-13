import { useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useWishlist } from "@contexts/WishlistContext";
import { ProductProps } from "@utils/types";

const ProductCard = ({ title, price, image, id = 0 }: ProductProps) => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const handleCardClick = () => {
    navigate(`/listing/${id}`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="card bg-base-100 shadow p-4 rounded-lg cursor-pointer"
    >
      <figure>
        <img src={image} alt={title} className="w-full h-64 object-cover rounded mb-4" />
      </figure>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p>${price}</p>
        </div>
        <button
          className="text-black hover:text-error transition-colors"
          onClick={handleToggleWishlist}
        >
          {isInWishlist(id) ? (
            <AiFillHeart className="icon-size cursor-pointer" />
          ) : (
            <AiOutlineHeart className="icon-size cursor-pointer" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
