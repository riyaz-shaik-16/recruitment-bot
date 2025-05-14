import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {

  const navigate = useNavigate();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 text-center"
    >
      <motion.h1
        whileHover={{ scale: 1.05 }}
        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-mercury-50 via-mercury-300 to-mercury-500 bg-clip-text text-transparent"
      >
        Welcome!
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl leading-relaxed"
      >
        Start your AI Interview journey today.
      </motion.p>

      <button
      onClick={()=>navigate("/login")}
      className='focus:border-mercury-50 rounded-xl hover:border-mercury-50'
      
      >
        <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-4 px-8 py-4 bg-gray-800 hover:bg-gray-700  rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <svg 
          className="w-8 h-8 hover:border-mercury-50 text-mercury-50" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="text-lg font-medium text-gray-300">Get Started</span>
      </motion.div>
      </button>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="mt-12 text-6xl opacity-50 hover:opacity-75 transition-opacity"
      >
        🤖
      </motion.div>
    </motion.div>
  )
}

export default Welcome