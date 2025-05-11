import  { useEffect, useRef } from "react";
import { Message } from "./";

const ChatWindow = ({ messages }) => {
  const bottomRef = useRef(null);

  // messages.map((msg) => {
  //   console.log("Message: ", msg);
  //   console.log("Message role: ", msg.role);
  //   console.log("Message text: ", msg.parts[0].text);
  // });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-[400px] overflow-y-auto space-y-4 border p-4 rounded-md bg-gray-50">
      {messages?.map((msg, index) => (
        <Message key={index} role={msg.role} parts={msg.parts[0].text} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;
