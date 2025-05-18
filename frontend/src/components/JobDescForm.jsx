import React from "react";

const JobDescriptionForm = ({ jobDesc, setJobDesc = ()=>{}, handleSubmit=()=>{}, isProcessing = false, isSubmitted = false, handleReset =()=>{}, showReset=true }) => {
  return (
    <div className="space-y-6  mx-auto">
      <div className="flex items-center gap-3">
        <svg
          className="w-8 h-8 text-mercury-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-mercury-400 to-mercury-200 bg-clip-text text-transparent">
          Enter Job Description
        </h2>
      </div>

      <textarea
        className={`w-full h-48 p-4 rounded-xl border-2 bg-black-pearl-950 border-gray-700 
      text-gray-300 placeholder-gray-500 resize-none transition-all
      focus:outline-none focus:border-mercury-50 focus:ring-4 focus:ring-mercury-50/30
      hover:border-gray-600 ${
        (isProcessing || isSubmitted) ? "opacity-50 cursor-not-allowed" : ""
      }`}
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        placeholder="Example: Seeking Senior React Developer with 5+ years experience in:
- Redux Toolkit & TypeScript
- REST API integration
- Test-driven development
- CI/CD pipelines
- Agile methodologies"
        disabled={isProcessing || isSubmitted}
        readOnly={isSubmitted}
      />

      <div className="flex flex-col gap-2 sm:flex-row justify-between">
        <button
        onClick={handleSubmit}
        className={`font-medium px-4 py-4 rounded-xl transition-all flex items-center gap-2
      ${
        (isProcessing || isSubmitted)
          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r cursor-pointer from-mercury-200 to-green-400 text-gray-900 hover:from-mercury-50 hover:to-mercury-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
      }`}
        disabled={isProcessing}
      >
        <svg
          className={`w-5 h-5 ${!isProcessing && "animate-pulse"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        {isProcessing ? "Processing..." : "Launch Interview"}
      </button>
      <button
        onClick={handleReset}
        className={`px-4 py-4 font-medium rounded-xl transition-all flex items-center gap-2
      ${
        (!isSubmitted ||!showReset)
          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r from-mercury-200 to-green-400 text-gray-900 hover:from-mercury-50 cursor-pointer hover:to-mercury-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
      }`}
        disabled={!isSubmitted}
      >
        <svg
          className={`w-5 h-5 ${!isProcessing && "animate-pulse"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        Reset
      </button>
      </div>
    </div>
  );
};

export default JobDescriptionForm;
