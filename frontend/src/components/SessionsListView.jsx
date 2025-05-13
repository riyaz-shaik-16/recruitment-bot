import React from "react";

const SessionList = () => {
  const sessions = [
    {
      sessionId: "66c441d8-f7f2-450a-b3d2-83c7930b6216",
      email: "sr308379@gmail.com",
      createdAt: "2025-05-12T10:15:00Z",
    },
    {
      sessionId: "aa2456de-2ab1-4c88-92e5-bb9b1f81ec79",
      email: "riya.dev@example.com",
      createdAt: "2025-05-11T18:30:00Z",
    },
    {
      sessionId: "db8fbd47-1a25-4025-b8a6-ef12fa0cf002",
      email: "mentor.ai@college.edu",
      createdAt: "2025-05-10T09:45:00Z",
    },
  ];
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Session List</h2>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">JD (Email)</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.sessionId} className="border-t">
                <td className="px-4 py-2">{session.email}</td>
                <td className="px-4 py-2">
                  {new Date(session.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => onView(session.sessionId)}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                  >
                    View Session
                  </button>
                </td>
              </tr>
            ))}
            {sessions.length === 0 && (
              <tr>
                <td colSpan="3" className="px-4 py-2 text-center text-gray-500">
                  No sessions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SessionList;
