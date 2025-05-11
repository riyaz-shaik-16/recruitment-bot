import { useEffect, useState } from "react";
import { JobDescriptionForm, MessageInput, ChatWindow, Result } from "../components";
import axios from "axios";
import useSessionStorage from "../contexts/useSessionStorage";
import { useSelector } from "react-redux";

const Session = () => {
  const [jobDesc, setJobDesc] = useSessionStorage("jobDescription", "");
  const [isSubmitted, setIsSubmitted] = useSessionStorage("isSubmitted", false);
  const [messages, setMessages] = useSessionStorage("messages", []);
  const [sessionId, setSessionId] = useSessionStorage("sessionId", "");
  const [interviewEnd, setInterviewEnd] = useSessionStorage("interviewEnd", false);
  const [result,setResult] = useSessionStorage("result",[])
  const [resultFetched,setResultFetched] = useSessionStorage("resultFetched",false);
  const { user } = useSelector((state) => state.user);
  const email = user?.email || "";
  // console.log("User: ",user);
  // console.log("Email: ",user?.email);

  // result && console.log(Object.keys(result).length !== 0)

  const getResult = async() => {
    const resultResponse = await axios.post("http://localhost:9876/api/chat/evaluate-result",{sessionId,history:[{role:"user",parts:[{text:"Hi! lets start the interview!"}]},...messages]});
    // setResult(resultResponse.data.result);
    setResultFetched(true);
    // console.log(resultResponse.data.result);
    // console.log(resultResponse);
  }

  useEffect(()=>{
    if(interviewEnd){
      getResult();
    }
  },[interviewEnd,setInterviewEnd])
  // Function to handle job description submission
  const handleJobSubmit = async () => {
    try {
      if (!jobDesc) {
        alert("Job Description is not provided!");
        return;
      }

      const response = await axios.post(
        "http://localhost:9876/api/chat/submit-jd",
        {
          jd: jobDesc,
          email,
        }
      );

      // console.log("Response from backend for submit jd:", response);
      // console.log("Data from backend for submit jd:", response.data);
      // console.log("FS: ", response.data.firstQuestion);

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
        { role: "model", parts: [{ text: response.data.firstQuestion || "" }] },
      ]);

      // console.log("Messages after updation: ", messages);

      // console.log("Initial bot message set:", response.data.firstQuestion);
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
        const updatedMessages = [
          ...prevMessages,
          { role: "user", parts: [{ text }] },
        ];
        // console.log("User message added:", updatedMessages);
        return updatedMessages;
      });

      // Send the message to the backend and get the bot's response
      const response = await axios.post(
        "http://localhost:9876/api/chat/handle-chat",
        {
          message: text,
          history: [{ "role": "user", "parts": [{"text":"Hi! Lets start the interview!"}] },...messages],
          sessionId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.success) {
        alert("Internal Server Error!");
        console.error("Error in handleSendMessage:", response);
        return;
      }

      // console.log(response);

      // console.log("Bot response:", response.data.reply.parts);

      let botReply = response.data.reply.parts;

      // Check if the bot's response contains the interview end token
      if (response.data.reply.parts.includes("[INTERVIEW_END]")) {
        setInterviewEnd(prev => !prev);
        botReply = response.data.reply.parts.replace("[INTERVIEW_END]", "");

      }

      // Append bot's response using functional update
      setMessages((prevMessages) => {
        const updatedMessages = [
          ...prevMessages,
          { role: response.data.reply.role, parts: [{text:botReply}] },
        ];
        // console.log("Bot message added:", updatedMessages);

        
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error in handleSendMessage:", error.message);
      alert("Internal Server Error!");
    }
  };

  return (
    // <div className="bg-gray-100 flex items-center justify-center p-4">
    //   <div className="min-h-screen w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 space-y-6">
    //     {!isSubmitted ? (
    //       <JobDescriptionForm
    //         jobDesc={jobDesc}
    //         setJobDesc={setJobDesc}
    //         handleSubmit={handleJobSubmit}
    //       />
    //     ) : (
    //       <>
    //         <ChatWindow messages={messages} />
    //         <MessageInput onSend={handleSendMessage} interviewEnd={interviewEnd} />
    //       </>
    //     )}
    //     { resultFetched &&  <Result result={result}/>}
    //   </div>
    // </div>
    <div className="bg-gray-900 min-h-screen p-8">
  <div className="w-full max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-8 border border-gray-700 transition-all duration-300">
    {!isSubmitted ? (
      <JobDescriptionForm
        jobDesc={jobDesc}
        setJobDesc={setJobDesc}
        handleSubmit={handleJobSubmit}
      />
    ) : (
      <div className="space-y-8">
        <ChatWindow messages={messages} />
        <MessageInput onSend={handleSendMessage} interviewEnd={interviewEnd} />
      </div>
    )}
    
    {resultFetched && (
      <div className="mt-10">
        <Result result={result} />
      </div>
    )}
  </div>
</div>
  );
};

export default Session;
