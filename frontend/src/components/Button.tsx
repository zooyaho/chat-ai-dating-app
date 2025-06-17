interface ButtonPropsType {
  text: string;
  onClick?: () => void;
  color?: string;
}

const Button = ({ text, color, onClick }: ButtonPropsType) => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <div className="mt-auto py-12 w-full flex justify-center">
      <button
        className={`w-full py-4 px-1 block rounded-3xl text-white text-sm font-medium ${
          color || "bg-date-pink-700"
        }`}
        type="button"
        onClick={handleClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
