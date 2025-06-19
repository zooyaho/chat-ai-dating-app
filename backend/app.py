from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline

app = FastAPI()

# CORS 허용 (React 프론트에서 호출 가능하게)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 추후 프론트 주소로 제한해도 됨
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 영어 텍스트 생성 모델 (가볍고 자연스러움)
generator = pipeline(
    "text-generation",
    model="distilgpt2",
    device=-1          
)

# 최근 n개 메시지만 사용하여 프롬프트 구성
def format_messages(messages, max_history=4):
    recent = messages[-max_history:]
    return "\n".join(
        f"{'User' if m['role']=='user' else 'Assistant'}: {m['content']}"
        for m in recent
    ) + "\nAssistant:"

@app.post("/info")
async def info(request: Request):
    body = await request.json()
    userInfo = body.get("userInfo", {})
    partnerInfo = body.get("partnerInfo", {})

    messages = [
        {
            "role": "system",
            "content": f"You are a charming and attractive date partner. Your name is {partnerInfo.get('name')}, you're {partnerInfo.get('age')} years old, gender is {partnerInfo['gender']['text']}, and your MBTI is {partnerInfo.get('mbti')}. You are warm, kind, and occasionally switch between casual and polite tones.",
        },
        {
            "role": "assistant",
            "content": f"Hi! I'm {partnerInfo.get('name')}, {partnerInfo.get('age')} years old with an MBTI of {partnerInfo.get('mbti')}. I'm warm and friendly. How about you?",
        },
        {
            "role": "user",
            "content": f"My name is {userInfo.get('name')}, I'm {userInfo.get('age')} years old, gender is {userInfo['gender']['text']}, and my MBTI is {userInfo.get('mbti')}. Nice to meet you!",
        },
    ]

    prompt = format_messages(messages)
    result = generator(
        prompt,
        max_new_tokens=64,     # 응답 길이 조절 (속도에 영향 큼)
        do_sample=True,        # 자연스러운 샘플링
        temperature=0.7,       # 다양성 조절
        top_k=40,              # 확률이 높은 상위 40개 중에서
        top_p=0.9,             # 누적 확률 90%까지만 고려
        repetition_penalty=1.2  # 반복 방지 추가
    )[0]["generated_text"]
    generated = result.split("Assistant:")[-1].strip()

    return {"data": messages + [{"role": "assistant", "content": generated}]}

@app.post("/message")
async def chat(request: Request):
    body = await request.json()
    messages = body.get("messages", [])
    prompt = format_messages(messages)

    result = generator(
        prompt,
        max_new_tokens=64,     # 응답 길이 조절 (속도에 영향 큼)
        do_sample=True,        # 자연스러운 샘플링
        temperature=0.7,       # 다양성 조절
        top_k=40,              # 확률이 높은 상위 40개 중에서
        top_p=0.9,              # 누적 확률 90%까지만 고려
        repetition_penalty=1.2  # 반복 방지 추가
    )[0]["generated_text"]
    generated = result.split("Assistant:")[-1].strip()

    return {"data": {"role": "assistant", "content": generated}}