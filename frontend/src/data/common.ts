import type { GenderInfoType } from "../types/genderInfo.type";

const maleInfo: GenderInfoType = {
  id: 1,
  type: "male",
  text: "남자",
};

const femaleInfo: GenderInfoType = {
  id: 2,
  type: "female",
  text: "여자",
};

const genderList = [maleInfo, femaleInfo] as GenderInfoType[];

export { genderList, maleInfo, femaleInfo };
