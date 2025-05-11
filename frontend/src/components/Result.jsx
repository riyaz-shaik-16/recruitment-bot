import React from 'react'

const Result = ({result}) => {
    console.log(result);
  return (
    <div className="max-w-3xl mx-auto bg-gray-800 shadow-xl rounded-2xl p-8 mt-6 border border-gray-700 relative overflow-hidden">
  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400/30 via-amber-400/60 to-amber-400/30" />
  
  <h2 className="text-3xl font-bold text-amber-400 mb-6 flex items-center gap-3">
    <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
      Interview Evaluation
    </span>
    <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </h2>

  <div className="space-y-6">
    <div className="p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors">
      <div className="flex items-center gap-3 mb-2">
        <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-300">Score</h3>
      </div>
      <p className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
        {result.score}<span className="text-xl text-gray-400">/10</span>
      </p>
    </div>

    <div className="group p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-300">Answer Analysis</h3>
      </div>
      <p className="text-gray-400 leading-relaxed">{result.answerAnalysis}</p>
    </div>

    <div className="group p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-300">English Proficiency</h3>
      </div>
      <p className="text-gray-400 leading-relaxed">{result.englishProficiency}</p>
    </div>

    <div className="group p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-300">Suggestions for Improvement</h3>
      </div>
      <p className="text-gray-400 leading-relaxed">{result.improvementSuggestions}</p>
    </div>
  </div>
</div>
  )
}

export default Result
