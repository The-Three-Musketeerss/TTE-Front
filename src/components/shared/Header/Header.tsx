import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";
import { useGetUser } from "@hooks/useGetUser";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useShop } from "@contexts/ShopContext";

const Header = () => {
  const { user, hasLoggedIn } = useGetUser();
  const isShopper = user?.role === "Shopper";
  const canSeeEmployeePortal = user?.role === "Admin" || user?.role === "Employee";
  const { cartCount } = useShop();

  const [, , removeCookie] = useCookies(["session"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie("session", { path: "/" });
    toast.success("You have logged out");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex-row-center justify-center w-full h-9 bg-primary">
        <span className="header-text">FREE SHIPPING ON ALL ITEMS! MAY. 5–19.</span>
      </div>

      <div className="flex-row-center w-full justify-between lg:justify-around px-10 md:px-20 h-14 bg-background shadow-lg">
        <div className="flex items-center gap-5">
          <label htmlFor="my-drawer" className="cursor-pointer lg:hidden">
            <GiHamburgerMenu className="icon-size" />
          </label>
          <Link to="/" className="font-extrabold desktop-only">Tech Trend Emporium</Link>
          {isShopper && <Link to="/wishlist" className="desktop-only">Wishlist</Link>}
          <Link to="/listing" className="desktop-only">Shop list</Link>
        </div>

        <div className="flex-row-center gap-3">
          {hasLoggedIn ? (
            <>
              {isShopper && (
                <div
                  className="flex-row-center gap-1 cursor-pointer relative"
                  onClick={() => navigate("/cart")}
                >
                  <HiOutlineShoppingBag className="icon-size" />
                  {cartCount > 0 && (
                    <span className="absolute -top-4.5 -right-3 rounded-full bg-red-500 text-white text-xs px-2 py-0.5">
                      {cartCount}
                    </span>
                  )}
                </div>
              )}

              <div>{user?.username}</div>

              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="cursor-pointer">
                  <FaRegUserCircle className="icon-size" />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-lg w-40 mt-3"
                >
                  {isShopper && (
                    <li>
                      <Link to="/orders" className="menu-hover">My orders</Link>
                    </li>
                  )}
                  {canSeeEmployeePortal && (
                    <li>
                      <Link to="/employee" className="lg:hidden menu-hover">Employee portal</Link>
                    </li>
                  )}
                  <li>
                    <button onClick={handleLogout} className="menu-hover text-left w-full">Logout</button>
                  </li>
                </ul>
              </div>

              {canSeeEmployeePortal && (
                <Link
                  to="/employee"
                  className="hidden lg:inline-block ml-4 bg-primary text-white px-3 py-1 rounded-md font-medium"
                >
                  Employee portal
                </Link>
              )}
            </>
          ) : (
            <Link
              to="/login"
              className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-secondary transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
