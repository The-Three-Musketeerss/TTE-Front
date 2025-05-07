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
        className="text-white w-full bg-gradient-to-r from-primary via-secondary to-accent hover:bg-gradient-to-br focus:ring-4 focus:outline-none font-medium rounded-lg text-sm lg:text-lg px-5 py-3 text-center me-2 mb-2"
      >
        {text}
      </button>
    </>
  );
};

export default Button;
