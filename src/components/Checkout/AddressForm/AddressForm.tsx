import BaseInput from "@components/shared/BaseInput/BaseInput";
import BaseSelect from "@components/shared/BaseSelect/BaseSelect";
import Button from "@components/shared/Button/Button";
import Checkbox from "@components/shared/Checkbox/Checkbox";
import { FieldError, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddressResolver } from "./AddressForm.resolver";

type Props = {
  onNext: (address: string, fullFormData: any) => void;
  initialValues?: any;
};

const AddressForm = ({ onNext, initialValues }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddressResolver),
    defaultValues: {
      saveContact: false,
      ...initialValues,
    },
  });

  const onSubmit = (data: any) => {
    onNext(data.address, data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
      <div className="flex gap-2">
        <BaseInput
          register={register("firstName")}
          error={errors.firstName as FieldError}
          placeholder="First Name"
        />
        <BaseInput
          register={register("lastName")}
          error={errors.lastName as FieldError}
          placeholder="Last Name"
        />
      </div>
      <BaseInput
        register={register("address")}
        error={errors.address as FieldError}
        placeholder="Address"
      />
      <BaseInput
        register={register("apartment")}
        error={errors.apartment as FieldError}
        placeholder="Apartment, suite, etc (optional)"
      />
      <div className="flex gap-2">
        <BaseSelect
          register={register("country")}
          error={errors.country as FieldError}
          options={[
            { label: "Country", value: "" },
            { label: "Colombia", value: "Colombia" },
            { label: "USA", value: "USA" },
            { label: "Portugal", value: "Portugal" },
          ]}
        />
        <BaseSelect
          register={register("city")}
          error={errors.city as FieldError}
          options={[
            { label: "City", value: "" },
            { label: "Bogotá", value: "Bogotá" },
            { label: "Medellín", value: "Medellín" },
            { label: "Cali", value: "Cali" },
          ]}
        />
        <BaseInput
          register={register("zipcode")}
          error={errors.zipcode as FieldError}
          placeholder="Zipcode"
        />
      </div>
      <BaseInput
        register={register("optional")}
        error={errors.optional as FieldError}
        placeholder="Optional"
      />

      <Controller
        name="saveContact"
        control={control}
        render={({ field }) => (
          <Checkbox
            value="Save contact information"
            checked={field.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(e.target.checked)}
          />
        )}
      />

      <div className="pt-3">
        <Button text="Continue to shipping" type="submit" />
      </div>
    </form>
  );
};

export default AddressForm;
