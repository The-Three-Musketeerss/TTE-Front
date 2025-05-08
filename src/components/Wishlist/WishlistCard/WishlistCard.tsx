import { AiFillHeart } from "react-icons/ai";

type WishlistCardProps = {
  name: string;
  price: number;
  imageUrl: string;
};

const WishlistCard = ({ name, price, imageUrl }: WishlistCardProps) => {
  return (
    <div className="card bg-base-100 shadow p-4 rounded-lg">
      <figure>
        <img src={imageUrl} alt={name} className="w-full h-64 object-cover rounded mb-4" />
      </figure>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p>${price}</p>
        </div>
        <button className="text-black hover:text-error transition-colors">
          <AiFillHeart className="icon-size" />
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;
