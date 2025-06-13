import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

const app = express();
app.use(cors()); // 모든 주소 허용
app.use(express.json()); // JSON 형식의 요청 본문을 파싱
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 요청 본문을 파싱

/* dotenv 세팅 */
const __dirname = path.resolve(); // 현재 디렉토리 경로 설정
dotenv.config({ path: __dirname + "/.env" }); // .env 파일에서 환경 변수 로드

/* Hugging Face 모델 API */
const HF_API_URL =
  "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";

/* message[] → prompt string 변환 함수 */
const formatMessagesToPrompt = (messages) => {
  return (
    messages
      .map((m) => {
        if (m.role === "user") return `User: ${m.content}`;
        if (m.role === "assistant") return `Assistant: ${m.content}`;
        return `System: ${m.content}`;
      })
      .join("\n") + "\nAssistant:"
  ); // 응답 유도
};

/* /message: 사용자 채팅 메시지 → AI 응답 */
app.post("/message", async (req, res) => {
  const { userMessage, messages } = req.body;

  const prompt = formatMessagesToPrompt([...messages, userMessage]);

  const response = await fetch(HF_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: prompt }),
  });

  const result = await response.json();
  const generatedText = result?.[0]?.generated_text || "";

  res.json({ data: { role: "assistant", content: generatedText } });
});

const initialMessage = (userInfo, partnerInfo) => {
  return [
    {
      role: "system",
      content: `당신은 나를 설레게 하는 매력적인 소개팅 상대입니다. 당신의 이름은 ${partnerInfo.name}이고, 나이는 ${partnerInfo.age}살이며 성별은 ${partnerInfo.gender.text}입니다. MBTI는 ${partnerInfo.mbti}입니다. 당신은 상냥하고 매력적인 소개팅 상대이며, 반말과 존댓말을 상황에 맞게 사용합니다.`,
    },
    {
      role: "assistant",
      content: `안녕! 나는 ${partnerInfo.name}이고 ${partnerInfo.age}살이야. MBTI는 ${partnerInfo.mbti}고, 차분하고 다정한 성격이야. 너는 어떤 사람이야?`,
    },
    {
      role: "user",
      content: `내 이름은 ${userInfo.name}이고, 나이는 ${userInfo.age}살이야. 성별은 ${userInfo.gender.text}고, MBTI는 ${userInfo.mbti}야. 잘 부탁해!`,
    },
  ];
};

/*
유저 정보 데이터 구조
const exampleUserInfo = {
  id: 1,
  gender: {
    id: 1,
    text: "남성",
    type: "male",
  },
  name: "홍길동",
  age: 30,
  mbti: "INTJ",
};
*/

/* /info: 유저 & 파트너 프로필 기반 초기 대화 생성 */
app.post("/info", async (req, res) => {
  const { userInfo, partnerInfo } = req.body;
  const messages = initialMessage(userInfo, partnerInfo);
  const prompt = formatMessagesToPrompt(messages);

  const response = await fetch(HF_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: prompt }),
  });

  const result = await response.json();
  const generatedText = result?.[0]?.generated_text || "";

  const data = [...messages, { role: "assistant", content: generatedText }];
  res.json({ data });
});

app.listen(8080, () => {
  // 8080 포트로 서버 실행
  console.log("✅ Server running on http://localhost:8080");
});
