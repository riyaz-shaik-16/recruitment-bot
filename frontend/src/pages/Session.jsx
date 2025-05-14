import { useEffect, useState } from "react";
import {
  JobDescriptionForm,
  MessageInput,
  ChatWindow,
  Result,
  Loader,
} from "../components";
import axios from "axios";
import useSessionStorage from "../customHooks/useSessionStorage";
import { useSelector, useDispatch } from "react-redux";
import { addSession } from "../redux/slices/session.slice";

const Session = () => {
  const [jobDesc, setJobDesc] = useSessionStorage("jobDescription", "");
  const [isSubmitted, setIsSubmitted] = useSessionStorage("isSubmitted", false);
  const [messages, setMessages] = useSessionStorage("messages", []);
  const [sessionId, setSessionId] = useSessionStorage("sessionId", "");
  const [interviewEnd, setInterviewEnd] = useSessionStorage(
    "interviewEnd",
    false
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useSessionStorage("result", []);
  const [resultFetched, setResultFetched] = useSessionStorage(
    "resultFetched",
    false
  );

  const dispatch = useDispatch();
  const { sessions } = useSelector((state) => state.sessions);
  const [gettingMessage, setGettingMessage] = useState(false);
  const [gettingResult, setGettingResult] = useState(false);
  const { user } = useSelector((state) => state.user);
  const email = user?.email || "";

  const getResult = async () => {
    console.log(sessionId);
    const resultResponse = await axios.post(
      "http://localhost:9876/api/chat/evaluate-result",
      {
        sessionId,
        history: [
          { role: "user", parts: [{ text: "Hi! lets start the interview!" }] },
          ...messages,
        ],
        email,
      }
    );
    setResult(resultResponse.data.result);
    setResultFetched(true);
  };

  useEffect(() => {
  const fetchResult = async () => {
    // only fetch if session exists
    const isValidSession = sessions.some(
      (session) => session.sessionId === sessionId
    );

    if (!isValidSession) {
      return;
    }

    setGettingResult(true);
    await getResult();
    setGettingResult(false);
  };

  if (interviewEnd) {
    fetchResult();
  }
}, [interviewEnd, sessionId, sessions]);


  useEffect(() => {
    const isValidSession = sessions.some(
      (session) => session.sessionId === sessionId
    );

    if (!isValidSession) {
      handleReset();
    }
  }, []);

  const handleJobSubmit = async () => {
    try {
      if (!jobDesc) {
        alert("Job Description is not provided!");
        return;
      } else {
        setIsProcessing((prev) => !prev);

        const response = await axios.post(
          "http://localhost:9876/api/chat/submit-jd",
          {
            jd: jobDesc,
            email,
          }
        );

        console.log(response);

        if (!response?.data?.success) {
          alert("Internal Server Error!");
          console.error("Error in handleJobSubmit:", response);
        }

        setSessionId(response.data.session.sessionId);
        dispatch(addSession([response.data.session]));
        setIsSubmitted(true);

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "model",
            parts: [{ text: response.data.firstQuestion || "" }],
          },
        ]);
      }

      setIsProcessing((prev) => !prev);
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

      setGettingMessage((prev) => !prev);

      // Send the message to the backend and get the bot's response
      const response = await axios.post(
        "http://localhost:9876/api/chat/handle-chat",
        {
          message: text,
          history: [
            {
              role: "user",
              parts: [{ text: "Hi! Lets start the interview!" }],
            },
            ...messages,
          ],
          sessionId,
          email,
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
        setInterviewEnd((prev) => !prev);
        botReply = response.data.reply.parts.replace("[INTERVIEW_END]", "");
      }

      setMessages((prevMessages) => {
        const updatedMessages = [
          ...prevMessages,
          { role: response.data.reply.role, parts: [{ text: botReply }] },
        ];
        // console.log("Bot message added:", updatedMessages);

        return updatedMessages;
      });

      setGettingMessage((prev) => !prev);
    } catch (error) {
      console.error("Error in handleSendMessage:", error.message);
      alert("Internal Server Error!");
    }
  };

  const handleReset = () => {
    setJobDesc("");
    setIsSubmitted(false);
    setMessages([]);
    setSessionId("");
    setInterviewEnd(false);
    setIsProcessing(false);
    setResult([]);
    setResultFetched(false);
    setGettingMessage(false);
    setGettingResult(false);
  };

  return (
    <div className="bg-black-pearl-950 w-full min-h-screen pt-8 pb-8 pl-4 pr-4">
      <div className="w-full  mx-auto  bg-black-pearl-950 rounded-2xl shadow-2xl p-8 space-y-8 border border-gray-700 transition-all duration-300">
        <JobDescriptionForm
          jobDesc={jobDesc}
          setJobDesc={setJobDesc}
          handleSubmit={handleJobSubmit}
          isProcessing={isProcessing}
          isSubmitted={isSubmitted}
          handleReset={handleReset}
        />

        {isSubmitted && (
          <div className="space-y-8">
            <ChatWindow messages={messages} gettingMessage={gettingMessage} />
            <MessageInput
              onSend={handleSendMessage}
              interviewEnd={interviewEnd}
              gettingMessage={gettingMessage}
            />
          </div>
        )}

        {gettingResult && (
          <div className="w-full h-10">
            <Loader />
          </div>
        )}

        {resultFetched && (
          <div className="mt-10 w-full">
            <Result result={result} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Session;
