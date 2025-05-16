type ShippingOptionProps = {
  id: string;
  title: string;
  description: string;
  selected: boolean;
  onSelect: (id: string) => void;
};

const ShippingOption = ({
  id,
  title,
  description,
  selected,
  onSelect,
}: ShippingOptionProps) => {
  return (
    <label
      htmlFor={id}
      className={`rounded-md p-4 cursor-pointer transition-all border ${
        selected
          ? "border-primary bg-white"
          : "border-accent bg-background hover:border-secondary"
      }`}
    >
      <div className="flex items-start gap-2">
        <input
          type="radio"
          name="shipping"
          id={id}
          checked={selected}
          onChange={() => onSelect(id)}
          className="mt-1 accent-primary"
        />
        <div>
          <p className="font-medium text-primary">{title}</p>
          <p className="text-sm text-secondary">{description}</p>
        </div>
      </div>
    </label>
  );
};

export default ShippingOption;
