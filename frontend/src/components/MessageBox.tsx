import { Fragment } from "react/jsx-runtime";
import type { MessageType } from "../types/chat.type";
import type { initialPartnerInfo } from "../data/initialState";
import { useEffect, useRef } from "react";
import PartnerMessage from "./PartnerMessage";

interface MessageBoxPropsType {
  messages: MessageType[];
  partnerInfo: typeof initialPartnerInfo;
  isLoading?: boolean;
}

const MessageBox = ({
  messages,
  partnerInfo,
  isLoading,
}: MessageBoxPropsType) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 스크롤을 맨 아래로 설정
    if (!messages.length) return;
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages.length]);

  return (
    <>
      {messages.map((message, index) => (
        <Fragment key={index}>
          {message.role === "user" ? (
            <>
              {/* user 채팅 */}
              <div className="py-4 max-w-3/4 ml-auto text-right">
                <span className="inline-block px-4 py-3 text-sm rounded-xl text-left bg-date-blue-600 text-white rounded-tr-none">
                  {message.content}
                </span>
              </div>
            </>
          ) : (
            <>
              {/* assistant 채팅 */}
              <PartnerMessage
                partnerInfo={partnerInfo}
                message={message.content}
              />
            </>
          )}
        </Fragment>
      ))}
      {isLoading && (
        <PartnerMessage partnerInfo={partnerInfo} isLoading={isLoading} />
      )}
      <div ref={ref}></div>
    </>
  );
};

export default MessageBox;
