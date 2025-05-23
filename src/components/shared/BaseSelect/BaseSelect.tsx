import { FieldError } from "react-hook-form";
import { useId } from "react";

type BaseSelectProps = {
  label?: string;
  options: { label: string; value: string }[];
  register?: any;
  error?: FieldError;
};

const BaseSelect = ({ label, options, register, error }: BaseSelectProps) => {
  const id = useId();

  return (
    <fieldset className="w-full mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block text-primary text-base lg:text-lg mb-1"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        aria-invalid={!!error}
        {...register}
        className="w-full rounded-md py-2.5 px-4 border border-primary focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 mt-1 text-sm">{error.message}</p>}
    </fieldset>
  );
};

export default BaseSelect;
