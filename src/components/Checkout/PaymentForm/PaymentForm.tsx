import { useEffect } from "react";
import { useForm, Controller, FieldError } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PaymentResolver } from "./PaymentForm.resolver";
import BaseInput from "@components/shared/BaseInput/BaseInput";
import BaseSelect from "@components/shared/BaseSelect/BaseSelect";
import Button from "@components/shared/Button/Button";
import toast from "react-hot-toast";
import { createOrder } from "@services/OrderServices";
import { useGetUser } from "@hooks/useGetUser";
import Checkbox from "@components/shared/Checkbox/Checkbox";

type Props = {
  address: string;
  shippingMethod?: string | null;
  onFinish: () => void;
  onChange: (paymentData: any) => void;
  initialValues?: any;
};

const PaymentForm = ({ address, onFinish, onChange, initialValues }: Props) => {
  const { user } = useGetUser();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PaymentResolver),
    defaultValues: {
      cardholderName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvc: "",
      saveCard: false,
      ...initialValues,
    },
  });

  useEffect(() => {
  let timeout: ReturnType<typeof setTimeout>;

  const subscription = watch((value) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => onChange(value), 1000);
  });

  return () => {
    clearTimeout(timeout);
    subscription.unsubscribe();
  };
}, [watch, onChange]);


  const onSubmit = async () => {
    await toast.promise(createOrder(address, user?.token), {
      loading: "Processing order...",
      success: "Payment successful!",
      error: "Failed to process payment.",
    });
    onFinish();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
      <h3 className="text-lg font-medium">Payment Details</h3>

      <BaseInput
        label="Cardholder Name"
        register={register("cardholderName")}
        error={errors.cardholderName as FieldError}
        placeholder="Cardholder Name"
      />

      <BaseInput
        label="Card Number"
        register={register("cardNumber")}
        error={errors.cardNumber as FieldError}
        placeholder="Card Number"
      />

      <div className="flex gap-2">
        <BaseSelect
          label="Expiry Month"
          register={register("expiryMonth")}
          error={errors.expiryMonth as FieldError}
          options={[
            { label: "Month", value: "" },
            ...Array.from({ length: 12 }, (_, i) => ({
              label: (i + 1).toString().padStart(2, "0"),
              value: (i + 1).toString().padStart(2, "0"),
            })),
          ]}
        />
        <BaseSelect
          label="Expiry Year"
          register={register("expiryYear")}
          error={errors.expiryYear as FieldError}
          options={[
            { label: "Year", value: "" },
            ...Array.from({ length: 10 }, (_, i) => {
              const year = new Date().getFullYear() + i;
              return { label: year.toString(), value: year.toString() };
            }),
          ]}
        />
        <BaseInput
          label="CVC"
          register={register("cvc")}
          error={errors.cvc as FieldError}
          placeholder="CVC"
        />
      </div>

      <Controller
        control={control}
        name="saveCard"
        defaultValue={false}
        render={({ field }) => (
          <Checkbox
            value="Save card information"
            checked={field.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              field.onChange(e.target.checked)
            }
          />
        )}
      />

      <div className="mt-3">
        <Button text="Pay with card" type="submit" />
      </div>
    </form>
  );
};

export default PaymentForm;
