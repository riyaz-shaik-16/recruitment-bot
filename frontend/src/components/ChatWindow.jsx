import { useEffect, useRef } from "react";
import { Message, MessageLoader } from "./";

const ChatWindow = ({ messages, gettingMessage= false }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-[400px] scrollbar-custom lg:h-[500px] relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 border border-gray-700 p-4 rounded-xl bg-black-pearl-950 shadow-md transition-all duration-200">
      <div className="space-y-4">
        {messages?.map((msg, index) => (
          <Message
            key={index}
            role={msg.role}
            parts={msg.parts[0].text}
            className={`group p-3 rounded-lg transition-all duration-200 ${
              msg.role === "user"
                ? "bg-mercury-200 text-white ml-8 rounded-tr-none shadow-sm hover:bg-mercury-50"
                : "bg-gray-700 mr-8 rounded-tl-none shadow-sm hover:bg-gray-600"
            }`}
          />
          
        ))}
        {gettingMessage && <MessageLoader/>}
      </div>
      <div
        ref={bottomRef}
        className="h-px bg-gradient-to-r from-transparent via-mercury-50 to-transparent opacity-20 my-4"
      />
    </div>
  );
};

export default ChatWindow;
