import Session from "../models/session.model.js"
import Message from "../models/message.model.js"
import Result from "../models/result.model.js"


const getSessionDetails = async (req,res) => {
    const sessionId = req.query.sessionId;

    if(!sessionId){
        return res.status(400).json({
            success:false,
            message:"SessionID not provided!"
        })
    }

    try {

        const messages = await Message.find({sessionId});
        const result = await Result.find({sessionId});
        const session = await Session.findOne({sessionId});

        return res.json({
            session,
            messages,
            result
        })
        
    } catch (error) {

        console.log(error.message);

        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
        
    }


}

const getAllSessions = async (req,res) => {
    const email = req.params.email;
    if(!email){
        return res.status(400).json({
            success:false,
            message:"Email not provided"
        })
    }
    try {
        const sessions = await Session.find({email}).sort({ timestamp: 1 })

        return res.status(200).json({
            success:true,
            sessions
        })
        
    } catch (error) {

        console.log("Error in getAllSessions: ",error.message);

        return res.status(500).json({
            success:false,
            message:"Internal Server Error!"
        })
        
    }
}

export {getSessionDetails, getAllSessions}
