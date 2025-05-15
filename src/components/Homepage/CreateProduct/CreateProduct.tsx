import Button from "@components/shared/Button/Button";
import BaseInput from "@components/shared/BaseInput/BaseInput";
import { useForm } from "react-hook-form";
import { ProductResolver } from "./CreateProduct.resolver";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductProps } from "@utils/types";
import toast from "react-hot-toast";
import { createProduct } from "@services/ProductServices";
import { useGetUser } from "@hooks/useGetUser";

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProductResolver),
  });

  const {user} = useGetUser();

  const onSubmit = (data: any) => {
    const Product: ProductProps = {
      id: data.id,
      title: data.title,
      price: parseFloat(data.price),
      description: data.description,
      category: data.category,
      image: data.image,
      inventory: {
        total: parseInt(data.total),
        available: parseInt(data.available),
      },
    };

    toast.promise(createProduct(Product, user?.token), {
      loading: "Creating product...",
      success: (response) => {
        reset();
        return response.message;
      },
      error: (error) => {
        return `Error creating product: ${error.message}`;
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
      <h3 className="text-2xl mb-7">Create Product</h3>
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
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
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
