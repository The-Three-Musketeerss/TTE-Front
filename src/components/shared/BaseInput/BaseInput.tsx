type BaseInputProps = {
    label?: string;
    placeholder?: string;
}

const BaseInput = ({label = '', placeholder = ''}:BaseInputProps) => {
  return (
    <fieldset className="flex flex-col gap-2 mb-4">
        <legend className="text-primary text-lg">{label}</legend>
        <input className="rounded-md outline-1 py-2.5 px-4" type="text" placeholder={placeholder} />
    </fieldset>
  )
}

export default BaseInput