import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSession, removeSession } from "../redux/slices/session.slice";
import axios from "axios";
import { Loader } from "./";
import { useNavigate } from "react-router-dom";

const SessionList = () => {
  const { sessions } = useSelector((state) => state.sessions);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  

  const fetchSessions = async () => {
    try {
      setError(null);
      setLoading(true);

      if (!user?.email) {
        setLoading(false);
        return;
      }

      const { data } = await axios.get(
        `http://localhost:9876/api/session/get-all-sessions/${user.email}`
      );

      if (!data.success) throw new Error("Failed to fetch sessions");

      dispatch(addSession(data.sessions));
    } catch (error) {
      // console.error("Session fetch error:", error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (sessionId) => {
    try {
      if (!sessionId) {
        alert("Invalid Session ID");
        return;
      }


      setLoading((prev) => !prev);

      const response = await axios.delete(
        `http://localhost:9876/api/session/delete-session?sessionId=${sessionId}`
      );

      if (!response.data.success) {
        // console.log("Error in Delete Post:", response.data.message);
        alert("Internal Server Error!");
      }

      // console.log(response);

      // setLoading(prev => !prev);

      

      dispatch(removeSession({ sessionId }));
    } catch (error) {
      // console.log("Error in handle Delete: ", error.message);
      return;
    } finally {
      setLoading((prev) => !prev);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [user?.email]);

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="h-full scrollbar-custom  relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 border border-gray-700 p-4 bg-black-pearl-950 shadow-md transition-all duration-200">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4 text-mercury-50 sticky top-0 bg-black-pearl-950 py-2 z-10">
            Previous Sessions
          </h2>

          <div className="space-y-4">
            {sessions.length === 0 ? (
              <div className="text-center py-6">
                <span className="text-gray-400">
                  No interview sessions found. Start a new session to begin!
                </span>
              </div>
            ) : (
              sessions.map((session) => (
                <div
                  key={session._id}
                  className="group p-4 rounded-lg transition-all duration-200 bg-gray-800 hover:bg-gray-700 border border-gray-600"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium line-clamp-1 text-mercury-50 mb-1">
                        {(session.jobDescription || "")
                          .split("\n")[0]
                          .replace("Job Title: ", "")}
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(session.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                        <span className="mx-2">•</span>
                        {new Date(session.createdAt).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/session/${session.sessionId}`)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap flex-shrink-0"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleDelete(session.sessionId)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer transition-colors whitespace-nowrap flex-shrink-0"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-20 my-4" />
        </>
      )}
    </div>
  );
};

export default SessionList;
