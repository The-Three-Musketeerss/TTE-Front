import { FieldError } from "react-hook-form";
type BaseInputProps = {
  label?: string;
  placeholder?: string;
  register?: any;
  error?: FieldError | undefined;
};

const BaseInput = ({
  label = "",
  placeholder = "",
  error,
  register,
}: BaseInputProps) => {
  return (
    <fieldset className="flex flex-col gap-2 mb-4">
      <legend className="text-primary text-lg">{label}</legend>
      <input
        {...register}
        className="rounded-md outline-1 py-2.5 px-4"
        type="text"
        placeholder={placeholder}
      />
      {error && <p className="text-red-600">{error.message}</p>}
    </fieldset>
  );
};

export default BaseInput;
