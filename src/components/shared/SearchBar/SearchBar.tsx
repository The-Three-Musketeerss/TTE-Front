import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/listing") {
      const valueFromUrl = searchParams.get("search") || "";
      setSearchQuery(valueFromUrl);
    }
  }, [location.pathname, searchParams]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (location.pathname === "/listing") {
        const newParams = new URLSearchParams(searchParams);
        if (searchQuery.trim()) {
          newParams.set("search", searchQuery.trim());
        } else {
          newParams.delete("search");
        }
        setSearchParams(newParams);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/listing?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
        className="input input-bordered w-36 lg:w-64"
      />
    </form>
  );
};

export default SearchBar;
