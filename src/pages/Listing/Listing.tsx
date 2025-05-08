import Skeleton from "@components/shared/ProductCard/Skeleton/Skeleton";
import { CategoryProps } from "@utils/types";
import { useEffect, useState } from "react";

const Listing = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  useEffect(() => {
    const dummyCategories = [
      { id: 1, name: "Electronics" },
      { id: 2, name: "Books" },
      { id: 3, name: "Clothing" },
      { id: 4, name: "Home & Kitchen" },
    ];
    setCategories(dummyCategories);
  }, []);
  return (
    <section className="bg-white">
      <h2>Shop List</h2>
      <div>
        <aside>
          <h3>Filters</h3>
          <h4>Categories</h4>
          {categories.map((category) => (
            <div key={category.id}>
              <input
                type="checkbox"
                id={category.name}
                name={category.name}
                value={category.name}
              />
              <label htmlFor={category.name}>{category.name}</label>
            </div>
          ))}
        </aside>
        <Skeleton/>
      </div>
    </section>
  );
};

export default Listing;
