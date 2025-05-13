import { FieldError } from "react-hook-form";

type BaseInputProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  register?: any;
  error?: FieldError | undefined;
};

const BaseInput = ({
  label = "",
  placeholder = "",
  error,
  type = "text",
  register,
}: BaseInputProps) => {
  return (
    <fieldset className="w-full mb-4">
      {label && <legend className="text-primary text-lg">{label}</legend>}
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md outline-1 py-2.5 px-4 border border-gray-300 focus:border-primary focus:outline-none"
      />
      {error && <p className="text-red-600 mt-1 text-sm">{error.message}</p>}
    </fieldset>
  );
};

export default BaseInput;
