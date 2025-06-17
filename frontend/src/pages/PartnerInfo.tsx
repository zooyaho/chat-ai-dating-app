import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Title from "../components/Title";
import PrevButton from "../components/PrevButton";
import GenderRadioGroup from "../components/GenderRadioGroup";
import { genderList, userInfoFields } from "../data/common";
import type { GenderInfoType } from "../types/genderInfo.type";
import { useState } from "react";
import { initialPartnerInfo } from "../data/initialState";
import Input from "../components/Input";

const PartnerInfo = () => {
  const history = useNavigate();
  const [partnerInfo, setPartnerInfo] = useState(initialPartnerInfo);

  // 다음 버튼 클릭 핸들러
  const handleNextPageClick = () => {
    history("/chat");
  };

  const handleGenderChange = (selectedData: GenderInfoType) => {
    // console.log("selectedData:", selectedData);
    const resultData = { ...partnerInfo, gender: selectedData };
    setPartnerInfo(resultData);
  };

  const handleFieldChange = (label: string, value: string) => {
    const resultData = { ...partnerInfo, [label]: value };
    setPartnerInfo(resultData);
  };
  return (
    <div className="w-full h-full px-6 pt-10 break-keep overflow-auto">
      <i className="w-[46rem] h-[46rem] rounded-full bg-date-blue-600 fixed -z-10 -left-60 -top-104"></i>
      {/* <i className="w-168 h-168 rounded-full bg-date-blue-600 fixed -z-10 -left-60 -top-104"></i> */}
      {/* 뒤로가기 버튼 */}
      <PrevButton />
      <div className="h-full flex flex-col">
        <div className="px-2 pt-6">
          <Title mainTitle="소개팅 상대방을 알려주세요" />
        </div>
        {/* info 영역 */}
        <form className="pt-20">
          {/* 성별 체크 */}
          <GenderRadioGroup
            items={genderList}
            defaultCheckedData={initialPartnerInfo.gender}
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
        <Button
          text={"Go Chat"}
          color="bg-date-blue-700"
          onClick={handleNextPageClick}
        />
      </div>
    </div>
  );
};

export default PartnerInfo;
