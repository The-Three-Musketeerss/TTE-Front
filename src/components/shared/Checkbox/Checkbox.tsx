type CheckboxProps = {
  value: string;
  checked?: boolean;
  onChange?: any;
}

const Checkbox = ({ value, checked, onChange }: CheckboxProps) => {
  return (
    <div className="flex items-center space-x-2 mb-1 text-primary">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="checkbox rounded-md border-accent bg-accent checked:border-secondary checked:bg-primary checked:text-accent"
        value={value}
      />
      <label>{value}</label>
    </div>
  );
};

export default Checkbox;
