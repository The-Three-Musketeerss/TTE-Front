import Button from "@components/shared/Button/Button";
import BaseInput from "@components/shared/BaseInput/BaseInput";
import { useForm } from "react-hook-form";
import { ProductResolver } from "./CreateProduct.resolver";
import { yupResolver } from "@hookform/resolvers/yup";

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProductResolver),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
      <h3 className="text-2xl mb-7">Create Category</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          register={register("title")}
          error={errors.title}
          label="Title"
        />
        <BaseInput
          register={register("price")}
          error={errors.price}
          label="Price"
          placeholder="0.00"
        />
        <BaseInput
          register={register("description")}
          error={errors.description}
          label="Description"
          placeholder="Description"
        />
        <BaseInput
          register={register("category")}
          error={errors.category}
          label="Category"
          placeholder="Category"
        />
        <BaseInput
          register={register("image")}
          error={errors.image}
          label="Image URL"
          placeholder="https://example.com/image.jpg"
        />
        <div className="grid grid-cols-2 gap-4">
          <BaseInput
            register={register("total")}
            error={errors.total}
            label="Total"
            placeholder="0"
          />
          <BaseInput
            register={register("available")}
            error={errors.available}
            label="Available"
            placeholder="0"
          />
        </div>
        <Button type="submit" text="Add" />
      </form>
    </div>
  );
};

export default CreateProduct;
