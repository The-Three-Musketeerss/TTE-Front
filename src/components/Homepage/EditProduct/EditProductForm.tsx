import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductResolver } from "../CreateProduct/CreateProduct.resolver";
import BaseInput from "@components/shared/BaseInput/BaseInput";
import Button from "@components/shared/Button/Button";
import toast from "react-hot-toast";
import { getProductById, updateProduct } from "@services/ProductServices";

type Props = {
  productId: number;
  token: string;
  onCancel: () => void;
  onSuccess: () => void;
};

const EditProductForm = ({ productId, token, onCancel, onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProductResolver),
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId.toString());
        const product = response.data;

        if (!product) {
          toast.error("Product not found");
          return onCancel();
        }

        setValue("title", product.title);
        setValue("price", product.price.toString());
        setValue("description", product.description);
        setValue("category", product.category);
        setValue("image", product.image);
        setValue("total", product.inventory.total);
        setValue("available", product.inventory.available);
      } catch (err) {
        console.error("Error loading product", err);
        toast.error("Failed to load product");
        onCancel();
      }
    };

    fetchProduct();
  }, [productId, setValue, onCancel]);

  const onSubmit = async (data: any) => {
    const updated = {
      id: productId,
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

    try {
      await updateProduct(productId.toString(), updated, token);
      toast.success("Product updated");
      onSuccess();
    } catch (err: any) {
      console.error("Update failed", err);
      toast.error(err.message || "Update failed");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
      <h3 className="text-2xl mb-7">Edit Product</h3>
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
        />
        <BaseInput
          register={register("category")}
          error={errors.category}
          label="Category"
        />
        <BaseInput
          register={register("image")}
          error={errors.image}
          label="Image URL"
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
        <div className="flex gap-4 mt-4">
          <Button type="submit" text="Update" />
          <Button type="button" text="Cancel" onClick={onCancel} />
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
