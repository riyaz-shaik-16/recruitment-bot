import Message from "../models/message.model.js";
import { getResponse, setJobDescription } from "../services/gemini.js";
import { v4 as uuidv4 } from "uuid";
import Session from "../models/session.model.js";
import Result from "../models/result.model.js";

const submitJD = async (req, res) => {
  try {
    const { jd, email } = req.body;
    if (!jd) {
      return res.status(400).json({
        success: false,
        message: "JD not provided!",
      });
    }

    setJobDescription(jd);
    const sessionId = uuidv4();

    const session = new Session({ sessionId, email, jobDescription:jd });
    await session.save();


    const firstQuestion = await getResponse(
      "Give me the first question now. Just question! nothing else be Professional",
      [{ role: "user", parts: [{ text: "Hi! Lets start the interview!" }] }]
    );


    const botMsg = new Message({
      role: "model",
      parts: firstQuestion,
      sessionId,
      email
    });
    await botMsg.save();

    return res.status(200).json({
      success: true,
      message: "JD set successfully!",
      firstQuestion,
      sessionId,
    });
  } catch (error) {

    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const handleChat = async (req, res) => {
  try {
    const { message, sessionId, history, email } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({
        success: false,
        message: "Message or session ID not provided!",
      });
    }
    if (!history || history.length === 0) {
      return res.status(400).json({
        success: false,
        message: "History not provided!",
      });
    }

    const userMsg = new Message({ role: "user", parts: message, sessionId, email });
    await userMsg.save();

    const botReply = await getResponse(message, history); 

    const botMsg = new Message({ role: "model", parts: botReply, sessionId, email });
    await botMsg.save();

    return res.status(200).json({
      success: true,
      message: "Got reply successfully!",
      reply: botMsg,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

const evaluateResult = async (req, res) => {
  try {
    const { sessionId, history, email } = req.body;

    if (!sessionId || !history || history.length === 0 ||!email) {
      return res.status(400).json({
        success: false,
        message: "All details necessary!",
      });
    }

    const existingResult = await Result.findOne({ sessionId });

    if (existingResult) {
      return res.status(200).json({
        success: true,
        message: "Result Fetched Successfully!",
        result: existingResult,
      });
    }

    // Prompt the AI for evaluation
    const result = await getResponse(
      `
The interview has concluded. Based on the candidate's responses to each question, please provide:

1. An overall score out of 10 for the interview.
2. A question-by-question brief analysis of the candidate's answers, including strengths and weaknesses.
3. Feedback on the candidate’s English proficiency (grammar, vocabulary, sentence structure, fluency).
4. Personalized suggestions on areas to improve, both in content and communication.

Please format your answer clearly in the following JSON format:

\`\`\`json
{
    "score": 8,
    "answerAnalysis": "Detailed explanation...",
    "englishProficiency": "Clear and fluent...",
    "improvementSuggestions": "Suggestions here..."
}
\`\`\`

Score should be between 1 and 10.
`,
      history
    );

    let cleanedResult;
    try {
      cleanedResult = JSON.parse(
        result.replace(/^```json\n?/, '').replace(/\n?```$/, '')
      );
    } catch (parseError) {
      console.error("Failed to parse result JSON:", parseError.message);
      return res.status(500).json({
        success: false,
        message: "AI response could not be parsed. Please try again.",
      });
    }

    // Save result
    const newResult = await Result.create({
      sessionId,
      score: cleanedResult.score,
      answerAnalysis: cleanedResult.answerAnalysis,
      englishProficiency: cleanedResult.englishProficiency,
      improvementSuggestions: cleanedResult.improvementSuggestions,
      email
    });
    
    await newResult.save();

    return res.status(200).json({
      success: true,
      message: "Result evaluation completed successfully!",
      result: newResult,
    });
  } catch (error) {
    console.error("Error in evaluateResult: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};



export { handleChat, submitJD, evaluateResult };
