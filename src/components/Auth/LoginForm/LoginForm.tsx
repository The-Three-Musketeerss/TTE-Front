import BaseInput from "@components/shared/BaseInput/BaseInput";
import Button from "@components/shared/Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoginResolver } from "./LoginForm.resolver";
import { Login } from "@services/AuthServices";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [cookies, setCookie] = useCookies(["session"]);
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
        Login(data.email, data.password)
            .then((response) => {
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
    <div className="bg-white flex flex-col space-y-2 rounded-lg shadow-lg p-8 lg:w-1/2">
      <h4 className="font-medium text-lg lg:text-3xl">Sign in</h4>
      <p className="text-xs lg:text-base">
        Please enter your credentials to log in.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button text="Login" type="submit" />
      </form>
    </div>
  );
};

export default LoginForm;
