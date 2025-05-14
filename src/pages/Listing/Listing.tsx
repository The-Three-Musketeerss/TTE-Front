import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "@components/shared/Button/Button";
import Checkbox from "@components/shared/Checkbox/Checkbox";
import ProductCard from "@components/shared/ProductCard/ProductCard";
import Skeleton from "@components/shared/ProductCard/Skeleton/Skeleton";
import { getCategories } from "@services/CategoryServices";
import { getProducts } from "@services/ProductServices";
import { CategoryProps, ProductProps } from "@utils/types";
import { useShop } from "@contexts/ShopContext";

const Listing = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sorting, setSorting] = useState<"" | "price" | "title">("");
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
  });

  const loading = products.length === 0;
  const count = products.length;

  const { isInWishlist, toggleWishlist } = useShop();

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category") || "";
    setSelectedCategory(categoryFromUrl);
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProducts({
        category: selectedCategory,
        sort: sorting,
        page: 1,
      });
      setProducts(response.data);
      setPagination({
        page: response.page,
        totalPages: response.totalPages,
      });
    };

    fetchData();
  }, [selectedCategory, sorting]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(
      categories.find((cat) => cat.name === category)?.name || ""
    );
  };

  const handleLoadMore = () => {
    setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
    getProducts({
      category: selectedCategory,
      sort: sorting,
      page: pagination.page + 1,
    }).then((response) => {
      setProducts((prev) => [...prev, ...response.data]);
    });
  };

  return (
    <section className="flex flex-col items-center">
      <h2 className="font-semibold text-3xl lg:text-4xl mb-4 lg:mb-8">
        Shop List
      </h2>
      <div className="flex flex-row justify-between items-baseline mb-4 lg:mb-8">
        <aside className="hidden lg:block lg:min-w-1/4 xl:min-w-1/6 bg-white p-4 rounded-lg shadow-md mb-8 mr-28">
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
              Sort by{" "}
              {sorting === ""
                ? ""
                : sorting.charAt(0).toUpperCase() + sorting.slice(1)}
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
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                    isFavorite={isInWishlist(product.id)}
                    onToggleFavorite={toggleWishlist}
                  />
                ))}
          </div>
          {!loading && pagination.totalPages !== pagination.page && (
            <div className="w-full flex justify-center mt-4">
              <Button onClick={handleLoadMore} text="Load more products" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Listing;
