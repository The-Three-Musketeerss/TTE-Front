import Logo from "@assets/Icons/TTELogo.png";
import ForgotPasswordForm from "@components/Auth/ForgotPassword/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <section className="flex justify-around items-center">
      <ForgotPasswordForm />
      <img src={Logo} alt="Logo" className="w-fit aspect-square hidden lg:flex" />
    </section>
  );
};

export default ForgotPassword;
