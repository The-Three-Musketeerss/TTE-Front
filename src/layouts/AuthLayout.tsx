import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
      <main className="flex flex-col justify-center min-h-screen h-full px-8 pt-8 pb-4 lg:px-32 lg:pb-8">
        <h4 className='font-bold text-xl lg:text-2xl pb-10 lg:pb-15'>Tech Trend Emporium</h4>
        <Outlet />
      </main>
  );
};

export default AuthLayout;
