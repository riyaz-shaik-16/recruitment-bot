import { useState } from "react";
import { JobDescriptionForm, MessageInput, ChatWindow } from "../components";
import axios from "axios";
import useSessionStorage from "../contexts/useSessionStorage";

const Session = () => {
  const [jobDesc, setJobDesc] = useSessionStorage("jobDescription","");
  const [isSubmitted, setIsSubmitted] = useSessionStorage("isSubmitted",false);
  const [messages, setMessages] = useSessionStorage("messages",[]);
  const [sessionId, setSessionId] = useSessionStorage("sessionId","");

  // Function to handle job description submission
  const handleJobSubmit = async () => {
    try {
      if (!jobDesc) {
        alert("Job Description is not provided!");
        return;
      }

      const response = await axios.post("http://localhost:9876/api/chat/submit-jd", {
        jd: jobDesc,
      });

      if (!response?.data?.success) {
        alert("Internal Server Error!");
        console.error("Error in handleJobSubmit:", response);
        return;
      }

      setSessionId(response.data.sessionId);
      setIsSubmitted(true);

      // Set bot's first question using functional update to avoid stale state
      setMessages((prevMessages) => [
        ...prevMessages,
        { from: "bot", text: response.data.firstQuestion || "" },
      ]);

      console.log("Initial bot message set:", response.data.firstQuestion);
    } catch (error) {
      console.error("Error in handleJobSubmit:", error.message);
      alert("Internal Server Error!");
    }
  };

  // Function to handle sending a message
  const handleSendMessage = async (text) => {
    try {
      if (!text) {
        alert("Please Answer First!");
        return;
      }

      // Append user message using functional update
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, { from: "user", text }];
        console.log("User message added:", updatedMessages);
        return updatedMessages;
      });

      // Send the message to the backend and get the bot's response
      const response = await axios.post("http://localhost:9876/api/chat/handle-chat", {
        message: text,
        sessionId,
      });

      if (!response.data.success) {
        alert("Internal Server Error!");
        console.error("Error in handleSendMessage:", response);
        return;
      }

      console.log(response);

      console.log("Bot response:", response.data.text);

      // Append bot's response using functional update
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, response.data.reply];
        console.log("Bot message added:", updatedMessages);
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error in handleSendMessage:", error.message);
      alert("Internal Server Error!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 space-y-6">
        {!isSubmitted ? (
          <JobDescriptionForm
            jobDesc={jobDesc}
            setJobDesc={setJobDesc}
            handleSubmit={handleJobSubmit}
          />
        ) : (
          <>
            <ChatWindow messages={messages} />
            <MessageInput onSend={handleSendMessage} />
          </>
        )}
      </div>
    </div>
  );
};

export default Session;
