import Checkbox from "@components/shared/Checkbox/Checkbox";
import Skeleton from "@components/shared/ProductCard/Skeleton/Skeleton";
import { CategoryProps, ProductProps } from "@utils/types";
import { useEffect, useState } from "react";

const Listing = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const loading = products.length === 0;

  useEffect(() => {
    const dummyCategories = [
      { id: 1, name: "Electronics" },
      { id: 2, name: "Books" },
      { id: 3, name: "Clothing" },
      { id: 4, name: "Home & Kitchen" },
    ];
    setCategories(dummyCategories);
  }, []);


  const handleCategorySelect = (category: string) => {
    setSelectedCategory(categories.find((cat) => cat.name === category)?.name || "");
    
  }

  return (
    <section className="">
      <h2 className="font-semibold text-lg lg:text-4xl mb-4 lg:mb-8">
        Shop List
      </h2>
      <div>
        <aside className="hidden lg:block lg:w-1/4 xl:w-1/6 bg-white p-4 rounded-lg shadow-md mb-8">
          <span className="flex flex-row justify-between items-center mb-2 lg:mb-4">
            <h3 className="font-semibold text-lg">Filters</h3>
            <h4 onClick={() => handleCategorySelect("")} className="text-gray-400 underline cursor-pointer">
              Clear filter
            </h4>
          </span>
          <h4 className="font-bold text-sm mb-2">Categories</h4>
          {categories.map((category) => (
            <Checkbox
              key={category.id}
              value={category.name}
              checked={selectedCategory === category.name}
              onChange={() => handleCategorySelect(category.name)}
            />
          ))}
        </aside>
        <Skeleton />
      </div>
    </section>
  );
};

export default Listing;
