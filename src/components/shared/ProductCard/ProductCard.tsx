import { ProductProps } from "@utils/types";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ title, price, image, id = 0 }: ProductProps) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/listing/${id}`);
  };
  return (
    <div onClick={handleCardClick} className="card bg-base-100 shadow p-4 rounded-lg cursor-pointer">
      <figure>
        <img src={image} alt={title} className="w-full h-64 object-cover rounded mb-4" />
      </figure>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p>${price}</p>
        </div>
        <button className="text-black hover:text-error transition-colors">
          <AiFillHeart className="icon-size" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
