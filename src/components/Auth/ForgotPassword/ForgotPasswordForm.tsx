import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

import { getSecurityQuestions, resetPassword } from "@services/AuthServices";
import { ForgotPasswordResolver } from "./ForgotPassword.resolver";

import BaseInput from "@components/shared/BaseInput/BaseInput";
import Button from "@components/shared/Button/Button";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(ForgotPasswordResolver),
  });

  const [questions, setQuestions] = useState<{ id: number; question: string }[]>([]);

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

  const onSubmit = async (formData: any) => {
    try {
      const { confirmPassword, ...data } = formData;
      await resetPassword(data);
      toast.success("Password has been reset successfully");
      reset();
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white flex flex-col rounded-lg shadow-lg p-6 lg:p-8 lg:w-1/2">
      <h4 className="font-medium text-lg lg:text-3xl">Forgot Password</h4>
      <p className="text-xs lg:text-base">
        Please enter your information to reset your password.
      </p>
      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          register={register("email")}
          error={errors.email}
          label="Email"
          placeholder="Enter your email"
        />

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Security Question</label>
          <select
            {...register("securityQuestionId")}
            className="select select-bordered w-full"
          >
            <option value="">Select a question</option>
            {questions.map((q) => (
              <option key={q.id} value={q.id}>
                {q.question}
              </option>
            ))}
          </select>
          {errors.securityQuestionId && (
            <p className="text-error text-sm mt-1">
              {errors.securityQuestionId.message as string}
            </p>
          )}
        </div>

        <BaseInput
          register={register("securityAnswer")}
          error={errors.securityAnswer}
          label="Security Answer"
          placeholder="Your answer"
        />

        <BaseInput
          register={register("newPassword")}
          error={errors.newPassword}
          label="New Password"
          type="password"
          placeholder="********"
        />

        <BaseInput
          register={register("confirmPassword")}
          error={errors.confirmPassword}
          label="Confirm Password"
          type="password"
          placeholder="********"
        />

        <Button type="submit" text="Reset Password" />

        <p className="font-light text-gray-500 text-xs lg:text-base text-center mt-6">
          Don't have an account?
          <Link to="/signup" className="font-semibold text-primary ml-1">
            Register
          </Link>
        </p>

        <p className="text-center mt-2">
          <Link to="/login" className="text-sm text-primary underline">
            Back to login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
