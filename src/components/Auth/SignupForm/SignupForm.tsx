import { yupResolver } from "@hookform/resolvers/yup";
import { SignupResolver } from "./SignupForm.resolver";
import { useForm } from "react-hook-form";
import BaseInput from "@components/shared/BaseInput/BaseInput";
import Button from "@components/shared/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import Select from "@components/shared/Select/Select";
import { useEffect, useState } from "react";
import { securityQuestionProps } from "@utils/types";
import { getSecurityQuestions, Signup } from "@services/AuthServices";
import toast from "react-hot-toast";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupResolver),
  });

  const [questions, setQuestions] = useState<securityQuestionProps[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getSecurityQuestions();
        setQuestions(data);
      } catch (err: any) {
        toast.error(err.message);
      }
    };
    fetchQuestions();
  }, []);

  const onSubmit = async (data: any) => {
    toast.promise(
        Signup(data),
        {
          loading: "Creating account...",
          success: (response) => {
            navigate("/login", {replace: true});
            return response.message + " Please login to continue.";
          },
          error: (error) => {
            return error.message;
          },
        }
    )
  };
  return (
    <div className="bg-white flex flex-col rounded-lg shadow-lg p-6 lg:p-8 lg:w-1/2">
      <h4 className="font-medium text-lg lg:text-3xl">Sign up</h4>
      <p className="text-xs lg:text-base">
        Register to add items to your wishlist and make purchases.
      </p>
      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          register={register("email")}
          error={errors.email}
          label="Email"
          placeholder="Enter your email"
        />
        <BaseInput
          register={register("name")}
          error={errors.name}
          label="Name"
          placeholder="Enter your name"
        />
        <BaseInput
          register={register("username")}
          error={errors.username}
          label="Username"
          placeholder="Enter your username"
        />
        <Select
          data={questions.map(({ id, question }) => ({ id, label: question }))}
          label="Security Question"
          placeholder="Select a question"
          register={register("securityQuestionId")}
          error={errors.securityQuestionId}
        />
        <BaseInput
          register={register("securityAnswer")}
          error={errors.securityAnswer}
          label="Security Question Answer"
          placeholder="Enter your security question answer"
        />
        <BaseInput
          register={register("password")}
          error={errors.password}
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        <BaseInput
          register={register("confirmPassword")}
          error={errors.confirmPassword}
          label="Confirm Password"
          placeholder="Confirm your password"
          type="password"
        />
        <Button text="Login" type="submit" />
      </form>
      <p className="font-light text-gray-500 text-xs lg:text-base text-center">
        Already have an account?
        <Link to="/login" className="font-semibold text-primary ml-1">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
