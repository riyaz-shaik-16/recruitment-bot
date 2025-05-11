import React from 'react'

const Result = ({result}) => {
    console.log(result);
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Interview Evaluation</h2>

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Score</h3>
        <p className="text-lg text-green-600 font-bold">{result.score} / 10</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Answer Analysis</h3>
        <p className="text-gray-700">{result.answerAnalysis}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">English Proficiency</h3>
        <p className="text-gray-700">{result.englishProficiency}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Suggestions for Improvement</h3>
        <p className="text-gray-700">{result.improvementSuggestions}</p>
      </div>
    </div>
  )
}

export default Result
