import { useEffect, useState } from "react";
import MessageBox from "../components/MessageBox";
import PrevButton from "../components/PrevButton";
import type { MessageType } from "../types/chat.type";
import type { initialPartnerInfo, initialUserInfo } from "../data/initialState";

interface ChatPropsType {
  userInfo: typeof initialUserInfo;
  partnerInfo: typeof initialPartnerInfo;
}

const Chat = ({ userInfo, partnerInfo }: ChatPropsType) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [chatValue, setChatValue] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (chatValue.trim() === "") return; // 빈 메시지 전송 방지
    // 메시지 전송 로직 추가
    console.log("메시지 전송:", chatValue);

    const userChatResult = {
      role: "user",
      content: chatValue,
    } as MessageType;

    const assistantResult = {
      role: "assistant",
      content: `응답: ${chatValue}`, // 실제 응답 로직으로 대체 필요
    } as MessageType;

    // 메시지 목록 업데이트: 메시지 목록에 사용자 메시지와 어시스턴트 응답 추가
    setMessages((prev) => [...prev, userChatResult, assistantResult]);

    setChatValue(""); // 시용자 챗 입력 필드 초기화
  };

  // 초기 사용자/상대방 정보 백엔드에 전송
  const sendInfo = async () => {
    console.log("사용자 정보:", userInfo);
    try {
      const response = await fetch("http://localhost:8080/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInfo,
          partnerInfo,
        }),
      });

      if (!response.ok) {
        throw new Error("정보 전송 실패");
      }

      const data = await response.json();
      console.log("서버 응답:", data);
    } catch (error) {
      console.error("정보 전송 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 초기 사용자/상대방 정보 백엔드에 전송
    sendInfo();
  }, []);

  return (
    <div className="w-full h-full px-6 pt-10 break-keep overflow-auto">
      {/* 뒤로가기 버튼 */}
      <PrevButton />
      <div className="h-full flex flex-col">
        {/* 헤더 영역 */}
        <div className="-mx-6 -mt-10 py-7 bg-date-blue-600">
          <span className="block text-xl text-center text-white">
            {partnerInfo.name}님과의 채팅
          </span>
        </div>
        {/* 채팅 영역 */}
        <div className="overflow-auto">
          <MessageBox messages={messages} partnerInfo={partnerInfo} />
        </div>
        {/* 메시지 입력 영역 */}
        <form
          id="sendForm"
          className="mt-auto flex py-5 -mx-2 border-t border-gray-100"
          onSubmit={handleSubmit}
        >
          <div className="w-full px-2 h-full">
            <input
              className="w-full text-sm px-3 py-2 h-full block rounded-xl bg-gray-100 focus:"
              type="text"
              value={chatValue}
              onChange={(e) => setChatValue(e.target.value)}
            />
          </div>
          <button
            type="submit"
            form="sendForm"
            className="w-10 min-w-10 h-10 inline-block rounded-full bg-date-blue-600 text-none px-2 bg-[url('../public/images/send.svg')] bg-no-repeat bg-center"
          >
            보내기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
