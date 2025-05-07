type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

const Button = ({ text, onClick, type = "button" }: ButtonProps) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className="text-white w-full bg-primary hover:bg-secondary font-medium rounded-lg text-sm lg:text-lg px-5 py-3 text-center me-2 mb-2"
      >
        {text}
      </button>
    </>
  );
};

export default Button;
