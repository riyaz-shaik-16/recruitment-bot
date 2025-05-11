import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema(
  {
    sessionId: {
         type: String,
        required: true, 
        unique: true 
    },
    score: { 
        type: Number, 
        required: true 
    },

    answerAnalysis: { 
        type: String, 
        required: true 
    },

    englishProficiency: { 
        type: String, 
        required: true 
    },

    improvementSuggestions: { 
        type: String, 
        required: true 
    },
  },{ timestamps: true });

export default mongoose.model("Result", ResultSchema);
