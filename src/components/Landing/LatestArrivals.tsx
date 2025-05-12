import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "@components/shared/ProductCard/ProductCard";
import Skeleton from "@components/shared/ProductCard/Skeleton/Skeleton";
import Button from "@components/shared/Button/Button";
import { getLatestArrivals } from "@services/ProductServices";
import { ProductProps } from "@utils/types";

const LatestArrivals = () => {
  const [latestArrivals, setLatestArrivals] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestArrivals = async () => {
      setLoading(true);
      const response = await getLatestArrivals();
      setLatestArrivals(response.data);
      setLoading(false);
    };

    fetchLatestArrivals();
  }, []);

  return (
    <section className="flex flex-col items-center mt-20">
      <h1 className="text-4xl font-semibold text-primary text-center mb-5">Latest arrivals</h1>
      <p className="text-base-content max-w-[400px] text-center pb-5">
        Explore the newest additions to our collection — fresh styles and trending picks just for you.
      </p>
      <Button text="Shop all" fullWidth={false} onClick={() => navigate("/listing")} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-6xl px-4">
        {loading
          ? ([1, 2, 3] as number[]).map((i) => <Skeleton key={i} />)
          : latestArrivals.map((item) => <ProductCard key={item.id} {...item} />)}
      </div>
    </section>
  );
};

export default LatestArrivals;
