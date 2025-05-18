import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { Loader, JobDescriptionForm, ChatWindow, Result, MessageInput } from "../components";

const DisplaySessionDetails = () => {
  const [jobDesc, setJobDesc] = useState("");
  const [messages, setMessages] = useState([]);
  const [result, setResult] = useState([]);
  const [error,setError] = useState(null);
  const {sessionID} = useParams();
  const [loading,setLoading] = useState(false);

  const getDetails = async () => {
    try {
        if(!sessionID){
            setError("Invalid Session ID!");
        }

        setLoading(prev => !prev);
        
        const response = await axiosInstance.get(`/api/session/get-session-details?sessionId=${sessionID}`);
        

        if(!response.data.success){
            setError(response.data.message || "Internal Server Error!");
            return;
        }

        // console.log(response);

        setMessages(response.data.messages || []);
        setResult(response.data.result || []);
        setJobDesc(response.data.session.jobDescription || "");
    } catch (error) {
        setError("Invalid Session ID");
        return;
    } finally {
        setLoading(prev => !prev);
    }

  }

  useEffect(()=>{
    getDetails();
  },[sessionID])

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  if(loading){
    return <Loader/>
  }


  return (
    <>
      <div className="h-full bg-black-pearl-950 w-full min-h-screen pt-8 pb-8 pl-4 pr-4">
        <div className="w-full  mx-auto  bg-black-pearl-950 rounded-2xl shadow-2xl p-8 space-y-8 border border-gray-700 transition-all duration-300">
          <JobDescriptionForm
            jobDesc={jobDesc}
            isSubmitted={true}
            showReset={false}
          />

          <div className="space-y-8">
              <ChatWindow messages={messages}/>
              <MessageInput
                interviewEnd={true}
              />
            </div>

        <div className="mt-10 w-full">
              <Result result={result[0]} />
            </div>
        </div>
      </div>
      <h1>Hi</h1>
    </>
  );
};

export default DisplaySessionDetails;
