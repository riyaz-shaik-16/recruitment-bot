import Message from "../models/message.model.js";
import { getResponse, setJobDescription } from "../services/gemini.js";
import { v4 as uuidv4 } from 'uuid';
import Session from "../models/session.model.js";

const submitJD = async (req, res) => {
  try {
    console.log(req.body);
    const { jd, email } = req.body;
    // console.log(req.body);
    if (!jd) {
      return res.status(400).json({
        success: false,
        message: "JD not provided!",
      });
    }

    setJobDescription(jd);
    const sessionId = uuidv4();

    const session = new Session({ sessionId, email });
    await session.save();

    const firstQuestion = await getResponse("Give me the first question now. Just question! nothing else be Professional");

    const botMsg = new Message({ from: "bot", text: firstQuestion, sessionId });
    await botMsg.save();

    return res.status(200).json({
      success: true,
      message: "JD set successfully!",
      firstQuestion,
      sessionId
    });

  } catch (error) {
    console.log("Error in submit jd : ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const handleChat = async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    const userMsg = new Message({ from: "user", text: message, sessionId });
    await userMsg.save();

    const botReply = await getResponse(message); // Replace with OpenAI logic

    const botMsg = new Message({ from: "bot", text: botReply, sessionId });
    await botMsg.save();

    return res.status(200).json({
      success: true,
      message: "Got reply successfully!",
      reply: botMsg,
    });
  } catch (error) {
    console.log("Error in handleChat: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export { handleChat, submitJD };
