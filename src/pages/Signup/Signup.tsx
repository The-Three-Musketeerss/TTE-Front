import Logo from "@assets/Icons/TTELogo.png";
import SignupForm from "@components/Auth/SignupForm/SignupForm";

const Signup = () => {
  return (
    <section className="flex justify-around items-center">
      <SignupForm />
      <img src={Logo} alt="Logo" className="w-fit aspect-square hidden lg:flex" />
    </section>
  );
};

export default Signup;
