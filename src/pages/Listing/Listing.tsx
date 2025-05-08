import Checkbox from "@components/shared/Checkbox/Checkbox";
import ProductCard from "@components/shared/ProductCard/ProductCard";
import Skeleton from "@components/shared/ProductCard/Skeleton/Skeleton";
import { CategoryProps, ProductProps } from "@utils/types";
import { useEffect, useState } from "react";

const Listing = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sorting, setSorting] = useState<"none" | "price" | "title">("none");
  const loading = products.length === 0;
  const count = products.length;

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
    setSelectedCategory(
      categories.find((cat) => cat.name === category)?.name || ""
    );
  };

  return (
    <section className="">
      <h2 className="font-semibold text-lg lg:text-4xl mb-4 lg:mb-8">
        Shop List
      </h2>
      <div className="flex flex-row justify-between items-baseline mb-4 lg:mb-8">
        <aside className="hidden lg:block lg:w-1/4 xl:w-1/6 bg-white p-4 rounded-lg shadow-md mb-8">
          <span className="flex flex-row justify-between items-center mb-2 lg:mb-4">
            <h3 className="font-semibold text-lg">Filters</h3>
            <h4
              onClick={() => handleCategorySelect("")}
              className="text-gray-400 underline cursor-pointer"
            >
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
        <div className="flex flex-col space-y-5 items-end">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
              Sort by {sorting === "none" ? "" : sorting}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
              <a onClick={() => setSorting("price")}>Price</a>
              </li>
              <li>
              <a onClick={() => setSorting("title")}>Title</a>
              </li>
            </ul>
          </div>
          <p className="text-sm text-primary">Showing {count} Products</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
            {loading
              ? ([1, 2, 3, 4, 5, 6] as number[]).map((index) => (
                  <Skeleton key={index} />
                ))
              : products.map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.title}
                    price={product.price}
                    imageUrl={product.image}
                  />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Listing;
