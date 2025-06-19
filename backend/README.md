# 💖 Chat AI Dating App

React 기반 프론트엔드 + FastAPI 백엔드로 구성된 소개팅 시뮬레이션 웹앱입니다.  
백엔드는 Hugging Face Space에 무료로 배포되어 있으며, 가벼운 AI 모델(`distilgpt2`)을 사용합니다.

---

## 🖼 프로젝트 구조

```bash
chat-ai-dating-app/
├── frontend/ # React + Tailwind 프론트엔드
├── backend/ # (Hugging Face Space에 배포)
      ├── app.py # FastAPI 백엔드
      ├── requirements.txt # 백엔드 의존성
      ├── Dockerfile # Hugging Face Space용 백엔드 실행 설정
```

---

## 🚀 사용 기술

- Frontend: React, Tailwind CSS
- Backend: FastAPI, Hugging Face Transformers
- AI Model: `distilgpt2` (무료)
- 배포: Hugging Face Space (백엔드 전용)

---

## 🛠 설치 방법 (로컬 실행용)

### 1. 프론트엔드 실행

```bash
cd frontend
yarn install
yarn dev
```

### 2. 백엔드는 Hugging Face Space에서 실행되므로 로컬에서는 실행하지 않아도 됨.

---

## 💬 API 사용 예시 (프론트에서)

### POST /message

```json
{
  "messages": [
    { "role": "user", "content": "안녕, 너는 어떤 사람이야?" },
    { "role": "assistant", "content": "나는 다정한 사람이야." },
    { "role": "user", "content": "MBTI는 뭐야?" }
  ]
}
```

응답

```json
{
  "data": {
    "role": "assistant",
    "content": "나는 INFP야. 감성적인 편이야!"
  }
}
```
