import { useState } from "react";

const MessageInput = ({ onSend, interviewEnd }) => {
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
          className={`flex-1 px-4 py-2 border rounded-md transition
        focus:outline-none focus:ring-2 focus:ring-blue-500
        ${interviewEnd ? "bg-gray-200 cursor-not-allowed" : ""}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={interviewEnd ? "Interview ended" : "Type your answer..."}
          disabled={interviewEnd}
        />
        <button
          type="submit"
          className={`px-4 py-2 text-white rounded-md transition 
        ${
          interviewEnd
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
          disabled={interviewEnd}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
