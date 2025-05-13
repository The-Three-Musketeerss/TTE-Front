import Button from "@components/shared/Button/Button";
import BaseInput from "@components/shared/BaseInput/BaseInput";
import { useForm } from "react-hook-form";
import { CategorySchema } from "./CreateCategory.resolver";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetUser } from "@hooks/useGetUser";
import { createCategory } from "@services/CategoryServices";
import toast from "react-hot-toast";

const CreateCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CategorySchema),
  });

  const { user } = useGetUser();

  const onSubmit = (data: any) => {
    toast.promise(createCategory(data.name, user?.token), {
      loading: "Creating category...",
      success: (response) => {
        return response.message;
      },
      error: (error) => {
        return `Error creating category: ${error.message}`;
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
      <h3 className="text-2xl mb-7">Create Category</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          register={register("name")}
          error={errors.name}
          label="Name"
        />
        <Button type="submit" text="Add" />
      </form>
    </div>
  );
};

export default CreateCategory;
