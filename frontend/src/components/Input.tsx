import { useState } from "react";

interface InputPropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  text: string;
  placeholder?: string;
  _onChange?: (label: string, value: string) => void;
}

const Input = ({
  label,
  text,
  placeholder,
  _onChange,
  ...restInputProps
}: InputPropsType) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const resultValue = label === "mbti" ? value.toUpperCase() : value; // mbti는 대문자로 변환
    setValue(resultValue);
    _onChange?.(label, resultValue);
  };
  return (
    <div className="py-2 first:pt-0 last:pb-0 ">
      <div className="relative">
        <label
          htmlFor={label}
          className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                      absolute"
        >
          {text}
        </label>
        <input
          type="text"
          id={label}
          name={label}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          className="border placeholder-gray-400 focus:outline-none
                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                      border-date-gray-200 rounded-2xl placeholder:text-date-gray-200"
          {...restInputProps}
        />
      </div>
    </div>
  );
};

export default Input;
