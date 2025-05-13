import { Link, Outlet } from "react-router-dom";
import { HiXMark } from "react-icons/hi2";
import Header from "@components/shared/Header/Header";
import Footer from "@components/shared/Footer/Footer";
import { useGetUser } from "@hooks/useGetUser";

type BaseLayoutProps = {
  showFooter?: boolean;
  showHeader?: boolean;
};

const BaseLayout = ({ showFooter = false, showHeader = true }: BaseLayoutProps) => {
  const { hasLoggedIn } = useGetUser();

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col h-screen">
        {showHeader && <Header />}

        <main className="flex-1 px-16 pt-32 pb-4 lg:px-32 lg:pb-8">
          <Outlet />
        </main>

        {showFooter && <Footer />}
      </div>

      <div className="drawer-side z-100">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>

        <div className="w-64 min-h-full bg-white p-4 relative">
          <label
            htmlFor="my-drawer"
            className="absolute top-4 right-4 cursor-pointer"
          >
            <HiXMark className="w-6 h-6 text-gray-600 hover:text-black" />
          </label>

          <ul className="menu mt-10 space-y-2 text-base-content">
            {hasLoggedIn && <li><Link to="/wishlist">Wishlist</Link></li>}
            <li><Link to="/listing">Shop list</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
