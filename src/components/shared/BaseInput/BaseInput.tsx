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
    <fieldset className="fieldset mb-4">
      <legend className="text-primary text-lg">{label}</legend>
      <input
        {...register}
        type={type}
        className="rounded-md outline-1 py-2.5 px-4"
        placeholder={placeholder}
      />
      {error && <p className="text-red-600">{error.message}</p>}
    </fieldset>
  );
};

export default BaseInput;
