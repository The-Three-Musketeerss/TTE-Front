type ButtonProps = {
  text: string;
};

const Button = ({ text }: ButtonProps) => {
  return (
    <button
      type="button"
      className="text-white bg-primary hover:bg-secondary font-medium rounded-lg text-sm lg:text-lg px-5 py-3 text-center me-2 mb-2"
    >
      {text}
    </button>
  );
};

export default Button;
