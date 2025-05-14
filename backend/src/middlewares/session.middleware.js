import Session from "../models/session.model.js";
const checkSessionId = async(req,res,next) => {
    try {

        const sessionId = req.query.sessionId;

        // console.log("Session ID in middleware: ",sessionId);

        const existingSession = await Session.findOne({sessionId});

        if(!existingSession || existingSession.length === 0){
            return res.status(401).json({
                success:false,
                message:"Invalid Session ID"
            })
        }

        req.session = existingSession;
        next();


        
    } catch (error) {
        // console.log("Error in Session Middleware: ",error.message);
        return req.status(500).json({
            success:false,
            message:"Internal Server Error!"
        })
    }
}

export default checkSessionId;