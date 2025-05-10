import  { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your answer..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
