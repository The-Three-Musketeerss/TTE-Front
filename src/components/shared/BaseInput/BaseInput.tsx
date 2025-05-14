import { FieldError } from "react-hook-form";

type BaseInputProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  register?: any;
  error?: FieldError | undefined;
  button?: boolean;
  buttonText?: string;
};

const BaseInput = ({
  label = "",
  placeholder = "",
  error,
  type = "text",
  register,
  button = false,
  buttonText = "",
}: BaseInputProps) => {
  return (
    <fieldset className="w-full mb-4 relative">
      {label && <legend className="text-primary text-base lg:text-lg">{label}</legend>}
      <div className={`${button ? "join w-full" : ""}`}>
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md outline-1 py-2.5 px-4 border border-gray-300 focus:border-primary focus:outline-none"
      />
      {button && (
        <button type="submit" className="bg-primary text-white rounded-md py-2 px-4">
          {buttonText}
        </button>
      )}
      </div>
      {error && <p className="text-red-600 mt-1 text-sm">{error.message}</p>}
    </fieldset>
  );
};

export default BaseInput;
