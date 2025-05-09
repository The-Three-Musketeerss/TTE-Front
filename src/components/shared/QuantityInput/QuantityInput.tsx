import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";

type QuantityInputProps = {
  count: number;
  setCount: (count: number) => void;
  maxCount?: number;
  minCount?: number;
};

const QuantityInput = ({
  count,
  setCount,
  maxCount = 10,
  minCount = 1,
}: QuantityInputProps) => {
    const decrement = () => {
        if (count > minCount) setCount(count - 1);
      };
    
      const increment = () => {
        if (count < maxCount) setCount(count + 1);
      };
  return (
    <div className="flex flex-col items-end">
      <h5 className="text-gray-500 text-sm">Quantity</h5>
      <div className="flex items-center px-2 py-1">
        <button
          className="text-lg px-2 disabled:opacity-50 cursor-pointer"
          onClick={decrement}
          disabled={count <= minCount}
        >
            <CiSquareMinus className="text-3xl" />
        </button>
        <span className="mx-2 w-4 text-center">{count}</span>
        <button
          className="text-lg px-2 disabled:opacity-50 cursor-pointer mr-[-20px]"
          onClick={increment}
          disabled={count >= maxCount}
        >
            <CiSquarePlus className="text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default QuantityInput;
