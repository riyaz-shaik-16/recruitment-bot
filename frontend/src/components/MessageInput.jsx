import { useState } from "react";

const MessageInput = ({ onSend = ()=>{}, interviewEnd = false, gettingMessage = false }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="group">
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <input
          type="text"
          className={`w-full sm:flex-1 px-4 py-3 border-2 text-gray-100 rounded-lg transition-all
        focus:outline-none focus:border-mercury-50 focus:ring-4 focus:ring-mercury-50/30
        ${
          interviewEnd || gettingMessage
            ? "bg-gray-700 border-gray-600 cursor-not-allowed placeholder-gray-500"
            : "bg-black-pearl-950 border-gray-700 hover:border-gray-600 placeholder-gray-400"
        }
        shadow-sm`}
          value={input}
          readOnly={gettingMessage}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            interviewEnd ? "Interview ended" : "Type your response..."
          }
          disabled={interviewEnd}
        />
        <button
          type="submit"
          className={`px-6 py-3 w-full sm:w-30 rounded-lg font-medium transition-all
        ${
          interviewEnd || gettingMessage
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-green-600 text-gray-900 hover:bg-green-800 shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5"
        }
        flex items-center gap-2`}
          disabled={interviewEnd || gettingMessage}
        >
          <svg
            className={`w-5 h-5 ${
              !interviewEnd && "group-hover:animate-pulse"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          <span>Send</span>
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
