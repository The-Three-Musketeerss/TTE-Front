import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EmployeeResolver } from "./CreateEmployee.resolver";
import Button from "@components/shared/Button/Button";
import BaseInput from "@components/shared/BaseInput/BaseInput";
import { createEmployee } from "@services/AuthServices";
import toast from "react-hot-toast";
import { useState } from "react";
import { useGetUser } from "@hooks/useGetUser";

const CreateEmployee = () => {
  const [backendError, setBackendError] = useState("");
  const { user } = useGetUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(EmployeeResolver),
  });

  const onSubmit = async (data: any) => {
    try {
      setBackendError("");

      if (!user?.token) {
        toast.error("Not authorized");
        return;
      }

      const employee = {
        name: data.name,
        userName: data.userName,
        email: data.email,
        password: data.password,
      };

      await createEmployee(employee, user.token);
      toast.success("Employee created successfully");
      reset();
    } catch (error: any) {
      setBackendError(error.message);
    }
  };


  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
      <h3 className="text-2xl mb-7">Create Employee</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          register={register("name")}
          error={errors.name}
          label="Name"
          placeholder="Full name"
        />
        <BaseInput
          register={register("userName")}
          error={errors.userName}
          label="Username"
          placeholder="Username"
        />
        <BaseInput
          register={register("email")}
          error={errors.email}
          label="Email"
          placeholder="email@example.com"
        />
        <BaseInput
          register={register("password")}
          error={errors.password}
          label="Password"
          type="password"
          placeholder="********"
        />

        {backendError && (
          <p className="text-error text-sm mt-2">{backendError}</p>
        )}

        <Button type="submit" text="Create Employee" />
      </form>
    </div>
  );
};

export default CreateEmployee;
