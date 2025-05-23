import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "@components/shared/Button/Button";
import Checkbox from "@components/shared/Checkbox/Checkbox";
import ProductCard from "@components/shared/ProductCard/ProductCard";
import Skeleton from "@components/shared/ProductCard/Skeleton/Skeleton";
import { getCategories } from "@services/CategoryServices";
import { CategoryProps } from "@utils/types";
import { useShop } from "@contexts/ShopContext";
import { useProducts } from "@hooks/useProducts";

const Listing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [sorting, setSorting] = useState<"" | "price" | "title">("");
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [products, setProducts] = useState<any[]>([]);

  const { isInWishlist, toggleWishlist } = useShop();

  const { data, isLoading } = useProducts(selectedCategory, sorting, search, pagination.page);

  useEffect(() => {
    if (data) {
      if (pagination.page === 1) {
        setProducts(data.data);
      } else {
        setProducts((prev) => [...prev, ...data.data]);
      }
      setPagination({ page: data.page, totalPages: data.totalPages });
    }
  }, [data]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (category: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set("category", category);
    } else {
      newParams.delete("category");
    }
    setPagination({ page: 1, totalPages: 1 });
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("category");
    setPagination({ page: 1, totalPages: 1 });
    setSearchParams(newParams);
  };

  const handleLoadMore = () => {
    setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  return (
    <section className="flex flex-col items-center">
      <h2 className="font-semibold text-3xl lg:text-4xl mb-4 lg:mb-8">Shop List</h2>
      <div className="flex flex-row justify-between items-baseline mb-4 lg:mb-8">
        <aside className="hidden lg:block lg:min-w-1/4 xl:min-w-1/6 bg-white p-4 rounded-lg shadow-md mb-8 mr-28">
          <span className="flex flex-row justify-between items-center mb-2 lg:mb-4">
            <h3 className="font-semibold text-lg">Filters</h3>
            <h4 onClick={handleClearFilters} className="text-gray-400 underline cursor-pointer">
              Clear filters
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
              Sort by {sorting === "" ? "" : sorting.charAt(0).toUpperCase() + sorting.slice(1)}
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              <li><a onClick={() => { setSorting("price"); setPagination({ page: 1, totalPages: 1 }); }}>Price</a></li>
              <li><a onClick={() => { setSorting("title"); setPagination({ page: 1, totalPages: 1 }); }}>Title</a></li>
            </ul>
          </div>
          <p className="text-sm text-primary">Showing {products.length} Products</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
            {isLoading && products.length === 0
              ? ([1, 2, 3, 4, 5, 6] as number[]).map((index) => <Skeleton key={index} />)
              : products.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  isFavorite={isInWishlist(product.id)}
                  onToggleFavorite={toggleWishlist}
                />
              ))}
          </div>
          {!isLoading && pagination.totalPages !== pagination.page && (
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
