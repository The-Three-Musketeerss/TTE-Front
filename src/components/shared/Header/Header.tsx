import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";

type HeaderProps = {
  userRole: string;
};

const Header = ({ userRole }: HeaderProps) => {
  const canSeeEmployeePortal = userRole === "Admin" || userRole === "Employee";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex-row-center justify-around w-full h-9 bg-primary">
        <span className="header-text hidden md:block">USD</span>
        <span className="header-text">FREE SHIPPING ON ALL ITEMS! MAY. 5–19.</span>
        <span className="header-text hidden md:block">Support</span>
      </div>

      <div className="flex-row-center w-full justify-between lg:justify-around px-10 md:px-20 h-14 bg-background shadow-lg">
        <div className="flex items-center gap-5">
          <label htmlFor="my-drawer" className="cursor-pointer lg:hidden">
            <GiHamburgerMenu className="icon-size" />
          </label>
          <Link to="/#" className="font-extrabold desktop-only">Tech Trend Emporium</Link>
          <Link to="/wishlist" className="desktop-only">Wishlist</Link>
          <Link to="/categories" className="desktop-only">Categories</Link>
          <Link to="/shop-list" className="desktop-only">Shop list</Link>
        </div>

        <div className="flex-row-center gap-3">
          <div className="flex-row-center gap-1">
            <HiOutlineShoppingBag className="icon-size" />
            <div>3</div>
          </div>

          <div>Name</div>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="cursor-pointer">
              <FaRegUserCircle className="icon-size" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-lg w-40 mt-3"
            >
              <li>
                <Link to="/my-orders" className="menu-hover">My orders</Link>
              </li>
              {canSeeEmployeePortal && (
                <li>
                  <Link to="/employee" className="lg:hidden menu-hover">Employee portal</Link>
                </li>
              )}
              <li>
                <Link to="/logout" className="menu-hover">Logout</Link>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
