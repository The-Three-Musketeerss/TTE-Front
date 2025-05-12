import Logo from "@assets/Icons/TTELogo.png";
import LoginForm from "@components/Auth/LoginForm/LoginForm";

const Login = () => {
  return (
    <section className="flex justify-around items-center h-screen">
      <LoginForm />
      <img src={Logo} alt="Logo" className="w-fit aspect-square hidden lg:flex" />
    </section>
  );
};

export default Login;
