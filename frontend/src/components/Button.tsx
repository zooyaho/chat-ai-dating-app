interface ButtonPropsType
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick?: () => void;
  color?: string;
}

const Button = ({
  text,
  color,
  onClick,
  disabled,
  ...restAttribute
}: ButtonPropsType) => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <div className="mt-auto py-12 w-full flex justify-center">
      <button
        className={`w-full py-4 px-1 block rounded-3xl text-white text-sm font-medium ${
          color || "bg-date-pink-700"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        type="button"
        onClick={handleClick}
        {...restAttribute}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
