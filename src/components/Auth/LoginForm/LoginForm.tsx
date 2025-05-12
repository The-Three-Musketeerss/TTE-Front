import BaseInput from "@components/shared/BaseInput/BaseInput";
import Button from "@components/shared/Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoginResolver } from "./LoginForm.resolver";
import { Login } from "@services/AuthServices";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Checkbox from "@components/shared/Checkbox/Checkbox";

const LoginForm = () => {
  const [, setCookie] = useCookies(["session"]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginResolver),
  });

  const onSubmit = async (data: any) => {
    toast.promise(
      Login(data.email, data.password).then((response) => {
        setCookie("session", response.data, {
          maxAge: 3600,
          path: "/",
        });
        navigate("/", { replace: true });
      }),
      {
        loading: "Logging in...",
        success: "Login successful",
        error: (error) => error.message,
      }
    );
  };

  return (
    <div className="bg-white flex flex-col rounded-lg shadow-lg p-6 lg:p-8 lg:w-1/2">
      <h4 className="font-medium text-lg lg:text-3xl">Sign in</h4>
      <p className="text-xs lg:text-base">
        Please enter your credentials to log in.
      </p>
      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          register={register("email")}
          error={errors.email}
          label="Email"
          placeholder="Enter your email"
        />
        <BaseInput
          register={register("password")}
          error={errors.password}
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        <div className="flex items-center justify-between lg:justify-end lg:space-x-2 my-4">
          <Checkbox value="Remember me"/>
          <a href="#" className="text-xs lg:text-base text-primary font-light mb-1">
            Forgot password?
          </a>
        </div>
        <Button text="Login" type="submit" />
      </form>
      <p className="font-light text-gray-500 text-xs lg:text-base text-center">
        Don't have an Account?
        <span className="font-semibold text-primary"> Register</span>
      </p>
    </div>
  );
};

export default LoginForm;
