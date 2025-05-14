import { JSX } from "react";

type ButtonProps = {
  text: string | JSX.Element;
  onClick?: () => void;
  type?: "button" | "submit";
  fullWidth?: boolean;
  disabled?: boolean;
};

const Button = ({
  text,
  onClick,
  type = "button",
  fullWidth = true,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`text-white ${
        fullWidth ? "w-full" : "w-auto"
      } bg-primary hover:bg-secondary font-medium rounded-lg text-sm lg:text-lg px-5 py-3 text-center me-2 mb-2
      ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {text}
    </button>
  );
};

export default Button;
