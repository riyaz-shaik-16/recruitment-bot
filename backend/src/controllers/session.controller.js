import Session from "../models/session.model.js"
import Message from "../models/message.model.js"
import Result from "../models/result.model.js"


const getSessionDetails = async (req,res) => {
    const sessionId = req.query.sessionId;

    // console.log(req.existingUser);

    // console.log(sessionId)

    if(!sessionId || !req.session || req.session?.length === 0){
        return res.status(400).json({
            success:false,
            message:"Invalid Details!"
        })
    }

    try {

        const messages = await Message.find({sessionId});
        const result = await Result.find({sessionId});

        // console.log("Result: ",currResult);
        // console.log("Messages: ",messages);

        return res.status(200).json({
            success:true,
            message:"Data Fetched Successfully!",
            session:req.session,
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
        const sessions = await Session.find({email}).sort({ createdAt: -1 })

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

const deleteSession = async (req,res) => {
    const sessionId = req.query.sessionId;

    if(!sessionId){
        return res.status(400).json({
            success:false,
            message:"Invalid Session ID"
        })
    }

    try {

        await Session.deleteOne({sessionId});
        await Message.deleteMany({sessionId});
        await Result.deleteOne({sessionId});

        return res.status(200).json({
            success:true,
            message:"Deleted Successfully!",
        })
        
    } catch (error) {
        console.log("Error in Delete Session: ",error.message);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error!"
        })
    }
}

export {getSessionDetails, getAllSessions, deleteSession}
