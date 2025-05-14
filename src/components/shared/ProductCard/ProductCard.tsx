import { useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ProductProps } from "@utils/types";
import { memo } from "react";

type ProductCardProps = ProductProps & {
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
};

const ProductCard = ({ title, price, image, id = 0, isFavorite, onToggleFavorite }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/listing/${id}`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(id);
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
          {isFavorite ? (
            <AiFillHeart className="icon-size cursor-pointer" />
          ) : (
            <AiOutlineHeart className="icon-size cursor-pointer" />
          )}
        </button>
      </div>
    </div>
  );
};

function areEqual(prevProps: ProductCardProps, nextProps: ProductCardProps) {
  return (
    prevProps.id === nextProps.id &&
    prevProps.isFavorite === nextProps.isFavorite &&
    prevProps.title === nextProps.title &&
    prevProps.price === nextProps.price &&
    prevProps.image === nextProps.image
  );
}

export default memo(ProductCard, areEqual);
