import { useState } from "react";

const JobDescriptionForm = ({ jobDesc, setJobDesc, handleSubmit }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <svg
          className="w-8 h-8 text-amber-400"
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
        <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
          Enter Job Description
        </h2>
      </div>

      <textarea
        className={`w-full h-48 p-4 rounded-xl border-2 bg-gray-800 border-gray-700 
      text-gray-300 placeholder-gray-500 resize-none transition-all
      focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/30
      hover:border-gray-600 ${
        isProcessing ? "opacity-50 cursor-not-allowed" : ""
      }`}
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        placeholder="Example: Seeking Senior React Developer with 5+ years experience in:
- Redux Toolkit & TypeScript
- REST API integration
- Test-driven development
- CI/CD pipelines
- Agile methodologies"
        disabled={isProcessing}
      />

      <button
        onClick={handleSubmit}
        className={`px-8 py-3 font-medium rounded-xl transition-all flex items-center gap-2
      ${
        isProcessing
          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r from-amber-600 to-amber-700 text-gray-900 hover:from-amber-500 hover:to-amber-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
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
    </div>
  );
};

export default JobDescriptionForm;
