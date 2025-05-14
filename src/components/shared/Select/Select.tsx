import { FieldError } from "react-hook-form";

type SelectProps = {
  register?: any;
  error?: FieldError | undefined;
  placeholder?: string;
  label?: string;
  data: { id: number; label: string }[];
};

const Select = ({ register, error, label, data, placeholder }: SelectProps) => {
  return (
    <fieldset className="mb-4 fieldset">
      <label className="text-primary text-lg">
        {label}
      </label>
      <select
        {...register}
        className="select bg-white w-full border outline-1 border-gray-300 rounded-md py-2.5 px-4 focus:border-primary focus:outline-none"
      >
        <option value="">{placeholder}</option>
        {data.map((i) => (
          <option key={i.id} value={i.id}>
            {i.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-600 mt-1 text-sm">
          {error.message}
        </p>
      )}
    </fieldset>
  );
};

export default Select;
