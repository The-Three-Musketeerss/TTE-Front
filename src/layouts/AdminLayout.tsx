import { Link, Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineShoppingBag, HiXMark } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";

const AdminLayout = () => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col h-screen">
        <header className="flex flex-col">
          <div className="flex flex-row justify-around items-center w-full h-9 bg-primary">
            <span className="text-white text-sm hidden md:block">USD</span>
            <span className="text-white text-sm">FREE SHIPPING ON ALL ITEMS! MAY. 5–19.</span>
            <span className="text-white text-sm hidden md:block">Support</span>
          </div>

          <div className="flex flex-row w-full justify-between lg:justify-around px-10 md:px-20 items-center h-14 bg-background shadow-lg">
            <div className="flex items-center gap-5">
              <label htmlFor="my-drawer" className="cursor-pointer lg:hidden">
                <GiHamburgerMenu className="size-5" />
              </label>
              <Link to="/#" className="font-extrabold hidden lg:block">Tech Trend Emporium</Link>
              <Link to="/wishlist" className="hidden lg:block">Wishlist</Link>
              <Link to="/categories" className="hidden lg:block">Categories</Link>
              <Link to="/shop-list" className="hidden lg:block">Shop list</Link>

            </div>

            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-row gap-1 items-center">
                <HiOutlineShoppingBag className="size-5" />
                <div>3</div>
              </div>

              <div>Name</div>

              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="cursor-pointer">
                  <FaRegUserCircle className="size-5" />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-lg w-40 mt-3"
                >
                  <li>
                    <Link to="/my-orders" className="hover:bg-gray-100">My orders</Link>
                  </li>
                  <li>
                    <Link to="/employee" className="lg:hidden hover:bg-gray-100">Employee portal</Link>
                  </li>
                  <li>
                    <Link to="/logout" className="hover:bg-gray-100">Logout</Link>
                  </li>
                </ul>
              </div>

              <Link
                    to="/employee"
                    className="hidden lg:inline-block ml-4 bg-primary text-white px-3 py-1 rounded-md font-medium"
                >
                    Employee portal
                </Link>


            </div>
          </div>
        </header>

        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>

      <div className="drawer-side z-40">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>

        <div className="w-64 min-h-full bg-white p-4 relative">
          <label
            htmlFor="my-drawer"
            className="absolute top-4 right-4 cursor-pointer"
          >
            <HiXMark className="w-6 h-6 text-gray-600 hover:text-black" />
          </label>

          <ul className="menu mt-10 space-y-2 text-base-content">
            <li><Link to="wishlist">Wishlist</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/shop-list">Shop list</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
