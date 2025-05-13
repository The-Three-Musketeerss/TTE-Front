import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CategorySchema } from "../CreateCategory/CreateCategory.resolver";
import BaseInput from "@components/shared/BaseInput/BaseInput";
import Button from "@components/shared/Button/Button";
import toast from "react-hot-toast";
import { getCategories, updateCategory } from "@services/CategoryServices";

type Props = {
  categoryId: number;
  token: string;
  onCancel: () => void;
  onSuccess: () => void;
};

const EditCategoryForm = ({ categoryId, token, onCancel, onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CategorySchema),
  });

  useEffect(() => {
    const fetchAndSetCategory = async () => {
      try {
        const data = await getCategories();
        const allCategories = data.data;
        const category = allCategories.find((cat: any) => cat.id === categoryId);

        if (!category) {
          toast.error("Category not found");
          return onCancel();
        }

        setValue("name", category.name);
      } catch (err) {
        console.error("Failed to load categories", err);
        toast.error("Failed to load category");
        onCancel();
      }
    };

    fetchAndSetCategory();
  }, [categoryId, setValue, onCancel]);

  const onSubmit = async (data: any) => {
    try {
      await updateCategory(categoryId.toString(), data, token);
      toast.success("Category updated");
      onSuccess();
    } catch (err: any) {
      console.error("Update failed", err);
      toast.error(err.message || "Update failed");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
      <h3 className="text-2xl mb-7">Edit Category</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          register={register("name")}
          error={errors.name}
          label="Name"
        />
        <div className="flex gap-4 mt-4">
          <Button type="submit" text="Update" />
          <Button type="button" text="Cancel" onClick={onCancel} />
        </div>
      </form>
    </div>
  );
};

export default EditCategoryForm;