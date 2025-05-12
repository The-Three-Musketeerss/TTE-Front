import Button from "@components/shared/Button/Button";
import ButtonSkeleton from "@components/shared/Button/Skeleton/Skeleton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTopCategories } from "@services/CategoryServices";

const TopCategories = () => {
  const [topCategories, setTopCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopCategories = async () => {
      setLoading(true);
      const response = await getTopCategories();
      setTopCategories(response.data);
      setLoading(false);
    };

    fetchTopCategories();
  }, []);

  const handleClick = (category: string) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="flex flex-col items-center mt-20">
      <h1 className="text-4xl font-semibold text-primary text-center mb-5">
        Top Categories
      </h1>
      <p className="text-base-content max-w-[400px] text-center pb-5">
        Explore our most popular categories — carefully curated by demand and trend.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 w-full max-w-4xl px-4">
        {loading
          ? [1, 2, 3].map((i) => <ButtonSkeleton key={i} />)
          : topCategories.map((category, index) => (
              <Button
                key={index}
                text={category}
                fullWidth={true}
                onClick={() => handleClick(category)}
              />
            ))}
      </div>
    </section>
  );
};

export default TopCategories;
