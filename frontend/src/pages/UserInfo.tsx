import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Title from "../components/Title";
import PrevButton from "../components/PrevButton";
import GenderRadioGroup from "../components/GenderRadioGroup";
import { genderList, userInfoFields } from "../data/common";
import type { GenderInfoType } from "../types/genderInfo.type";
import { useState } from "react";
import { initialUserInfo } from "../data/initialState";
import Input from "../components/Input";

const UserInfo = () => {
  const history = useNavigate();
  const [userInfo, setUserInfo] = useState(initialUserInfo);

  // 다음 버튼 클릭 핸들러
  const handleNextPageClick = () => {
    history("/partner-info");
  };

  const handleGenderChange = (selectedData: GenderInfoType) => {
    // console.log("selectedData:", selectedData);
    const resultData = { ...userInfo, gender: selectedData };
    setUserInfo(resultData);
  };

  const handleFieldChange = (label: string, value: string) => {
    const resultData = { ...userInfo, [label]: value };
    setUserInfo(resultData);
  };

  return (
    <div className="w-full h-full px-6 pt-10 break-keep overflow-auto">
      <i className="w-[44rem] h-[44rem] rounded-full bg-date-pink-500 fixed -z-10 -left-60 -top-104"></i>
      {/* 뒤로가기 버튼 */}
      <PrevButton />
      <div className="h-full flex flex-col">
        <div className="px-2 pt-6">
          <Title mainTitle="당신을 알려주세요" />
        </div>
        {/* info 영역 */}
        <form className="pt-20">
          {/* 성별 체크 */}
          <GenderRadioGroup
            items={genderList}
            defaultCheckedData={initialUserInfo.gender}
            onChange={handleGenderChange}
          />
          {/* input 영역 */}
          <div>
            {userInfoFields.map((field) => (
              <Input
                key={field.id}
                text={field.text}
                type={field.type}
                label={field.label}
                placeholder={field.placeholder}
                _onChange={handleFieldChange}
              />
            ))}
          </div>
        </form>

        {/* 다음 Button 영역 */}
        <Button text={"Next"} onClick={handleNextPageClick} />
      </div>
    </div>
  );
};

export default UserInfo;
