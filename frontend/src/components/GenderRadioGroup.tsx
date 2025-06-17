import { useState } from "react";
import type { GenderInfoType } from "../types/genderInfo.type";
import { maleInfo } from "../data/common";

interface GenderRadioGroupPropsType {
  items: GenderInfoType[];
  defaultCheckedData?: GenderInfoType;
  onChange?: (value: GenderInfoType) => void;
}

/* 성별 선택 컴포넌트 */
const GenderRadioGroup = ({
  items,
  defaultCheckedData,
  onChange,
}: GenderRadioGroupPropsType) => {
  const [value, setValue] = useState<string>(defaultCheckedData?.type || "");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedData =
      items.find((item) => event.target.value === item.type) || maleInfo;
    setValue(event.target.value);
    onChange?.(selectedData);
  };

  return (
    <div className="flex py-8">
      {items.map((item) => (
        <div className="w-full text-center" key={item.id}>
          <label htmlFor={item.type} className="peer-checked:bg-red-500">
            <input
              id={item.type}
              type="radio"
              name="gender"
              value={item.type}
              checked={value === item.type}
              className="hidden peer"
              onChange={handleChange}
            />
            <div className="pb-4 grayscale peer-checked:grayscale-0">
              <img
                src={`./images/${item.type}.svg`}
                alt={item.type}
                className="block w-3/5 mx-auto"
              />
            </div>
            <span className="w-5 h-5 inline-block align-middle rounded bg-date-gray-200 peer-checked:bg-date-blue-500">
              <i className="block w-full h-full bg-[url('../public/images/check.svg')] bg-no-repeat bg-center"></i>
            </span>
            <span className="inline-block align-middle px-2">{item.text}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default GenderRadioGroup;
