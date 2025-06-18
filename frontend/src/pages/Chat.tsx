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
  const [infoMessage, setInfoMessage] = useState<MessageType[]>([]); // ai에 정보 설정하는 메시지

  const sendMessage = async (userMessage: MessageType) => {
    // 메시지 전송 로직
    const sendMessages = [...infoMessage, ...messages, userMessage];
    try {
      const response = await fetch(`${API_BASE_URL}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: sendMessages }),
      });

      if (!response.ok) {
        throw new Error("응답 실패");
      }

      const result = await response.json();
      console.log("[chat] 서버 응답:", result);
      const assistantMessage = result.data as MessageType;
      // 메시지 목록 업데이트: 메시지 목록에 사용자 메시지와 어시스턴트 응답 추가
      console.log("[chat] assistantMessage:", assistantMessage);
      console.log("[chat] 업데이트된 메세지들:", [
        ...messages,
        userMessage,
        assistantMessage,
      ]);
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("메시지 전송 중 오류 발생:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (chatValue.trim() === "") return; // 빈 메시지 전송 방지
    // 메시지 전송 로직 추가
    console.log("메시지 전송:", chatValue);

    const userChatResult = {
      role: "user",
      content: chatValue,
    } as MessageType;

    setChatValue(""); // 시용자 챗 입력 필드 초기화
    setMessages((prev) => [...prev, userChatResult]);
    sendMessage(userChatResult); // 메시지 전송 함수 호출
  };

  // 초기 사용자/상대방 정보 백엔드에 전송
  const sendInfo = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/info`, {
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

      const result = await response.json();
      const initialMessages = result.data as MessageType[];
      console.log("[sendInfo] 초기 메시지 응답 data:", initialMessages);
      setInfoMessage(initialMessages); // 초기 정보 메시지 세팅
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
