import  { useEffect, useRef } from "react";
import { Message } from "./";

const ChatWindow = ({ messages }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-[400px] overflow-y-auto space-y-4 border p-4 rounded-md bg-gray-50">
      {messages?.map((msg, index) => (
        <Message key={index} from={msg.from} text={msg.text} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;
