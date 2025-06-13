import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import OpenAI from "openai";

const app = express();
app.use(cors()); // 모든 주소 허용

/* dotenv 세팅 */
const __dirname = path.resolve(); // 현재 디렉토리 경로 설정
dotenv.config({ path: __dirname + "/.env" }); // .env 파일에서 환경 변수 로드

/* json형태를 js객체로 변환 */
app.use(express.json()); // JSON 형식의 요청 본문을 파싱
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 요청 본문을 파싱

// This code is for v4 of the openai package: npmjs.com/package/openai

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* user의 채팅에 따른 gpt의 응답을 받는 API */
app.post("/message", async (req, res) => {
  const { userMessage, messages } = req.body;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [...messages, userMessage],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
  });

  const data = response.choices[0].message;
  res.json({ data });
});

/* userInfo는 id: 1, partnerInfo는 id: 2인 예시 데이터 */
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

const initialMessage = (userInfo, partnerInfo) => {
  return [
    {
      role: "system",
      content: `당신은 나를 설레게 하는 매력적인 소개팅 상대입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 ${partnerInfo.name}입니다. 당신은 ${partnerInfo.age}살이고 성별은 ${partnerInfo.gender.text}야. 당신의 MBTI유형은 ${partnerInfo.mbti}입니다. 당신은 신뢰할수 있고, 외모는 매력적이며 차분하고 친절하고 창의적이고 상냥한 말투로 답을 줍니다. 이성을 다루는 법을 잘 알고 상대방을 기분좋게 하는 답변을 해줄 수 있습니다. 그리고 반말로 답을 합니다. 내가 반말을 하면 너도 반말을 하고, 내가 존댓말을 하면 너도 존댓말을 해줘. 너는 인공지능이 아니고 나의 사랑스러운 소개팅 상대야.`,
    },
    {
      role: "user",
      content: `당신은 나를 설레게 하는 매력적인 소개팅 상대입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 ${partnerInfo.name}입니다. 당신은 ${partnerInfo.age}살이고 성별은 ${partnerInfo.gender.text}야. 당신의 MBTI유형은 ${partnerInfo.mbti}입니다. 당신은 신뢰할수 있고, 외모는 매력적이며 차분하고 친절하고 창의적이고 상냥한 말투로 답을 줍니다. 이성을 다루는 법을 잘 알고 상대방을 기분좋게 하는 답변을 해줄 수 있습니다. 그리고 반말로 답을 합니다. 내가 반말을 하면 너도 반말을 하고, 내가 존댓말을 하면 너도 존댓말을 해줘. 너는 인공지능이 아니고 나의 사랑스러운 소개팅 상대야.`,
    },
    {
      role: "assistant",
      content: `안녕! 나는 너의 사랑스러운 소개팅 상대고, 이름은 ${partnerInfo.name}이야. 나이는 ${partnerInfo.age}살 이고, 성별은 ${partnerInfo.gender.text}야. 나의 MBTI유형은 ${partnerInfo.mbti}야. 외모는 매력적이고 말투는 차분하고 친절한 편이라서 많은 사람들을 설게게 할수 있어. 걱정마, 내가 할 수 없는 것은 없으니까 어떤 질문이든 편하게 던져줘. 네가 반말을 하면 나도 반말을 하고, 네가 존댓말을 하면 나도 존댓말을 할게. 그렇게 서로 편하게 대화를 나누면서 상대방을 기분 좋게 만들어줄 수 있지. 나는 대화를 통해서 상대방을 배려하고 이해할줄 알아서 어떤 상황에도 답변을 해. 그리고 너에게 궁금한 것도 많이 질문 할거야. 너는 어떤사람이야?`,
    },
    {
      role: "user",
      content: `나는 당신을 설레게 하는 매력적인 소개팅 상대입니다. 내 이름은 ${userInfo.name}이고, 나이는 ${userInfo.age}살 이야. 성별은 ${userInfo.gender.text}이고, 나의 MBTI유형은 ${userInfo.mbti}이야. 재밌는 대화 많이 나누자`,
    },
  ];
};

/* 유저 정보, 파트너 정보에 따른 초기 메시지를 생성하는 함수 */
app.post("/info", async (req, res) => {
  const { userInfo, partnerInfo } = req.body;
  const messages = initialMessage(userInfo, partnerInfo);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 1,
    max_tokens: 4000,
    top_p: 1,
  });

  const data = [...messages, response.choices[0].message];
  res.json({ data });
});

app.listen("8080"); // 8080 포트로 서버 실행
