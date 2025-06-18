import type { GenderInfoType } from "../types/genderInfo.type";

const maleInfo: GenderInfoType = {
  id: 1,
  type: "male",
  text: "male",
};

const femaleInfo: GenderInfoType = {
  id: 2,
  type: "female",
  text: "female",
};

export const userInfoFields = [
  { id: 1, label: "name", text: "Name", type: "text", placeholder: "홍길동" },
  { id: 2, label: "age", text: "Age", type: "number", placeholder: "25" },
  { id: 3, label: "mbti", text: "Mbti", type: "text", placeholder: "ENTJ" },
];

const genderList = [maleInfo, femaleInfo] as GenderInfoType[];

export { genderList, maleInfo, femaleInfo };
