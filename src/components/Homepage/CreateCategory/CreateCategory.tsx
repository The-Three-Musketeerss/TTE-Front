import Button from "@components/shared/Button/Button";
import BaseInput from "@components/shared/BaseInput/BaseInput";
import { useForm } from "react-hook-form";
import { CategorySchema } from "./CreateCategory.schema";
import { yupResolver } from "@hookform/resolvers/yup";

const CreateCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CategorySchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
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
