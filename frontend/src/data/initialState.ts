export const initialUserInfo = {
  id: 1,
  type: "user",
  gender: {
    id: 1,
    type: "male",
    text: "남자",
  },
  name: "",
  age: "",
  mbti: null,
};

export const userInfoFields = [
  { id: 1, label: "name", text: "Name", type: "text", placeholder: "홍길동" },
  { id: 2, label: "age", text: "Age", type: "number", placeholder: "25" },
  { id: 3, label: "mbti", text: "Mbti", type: "text", placeholder: "ENTJ" },
];
