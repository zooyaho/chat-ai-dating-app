const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors()); // 모든 주소 허용

/* json형태를 js객체로 변환하는 작업 */
app.use(express.json()); // JSON 형식의 요청 본문을 파싱
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 요청 본문을 파싱
app.use(express.static("public")); // 정적 파일 제공

app.listen("8080"); // 8080 포트로 서버 실행
