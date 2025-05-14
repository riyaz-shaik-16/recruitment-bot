import User from "../models/user.model.js"

const checkUser = async (req,res,next) => {
    try {

        const email = req.params.email;

        const existingUser = await User.findOne({email});

        if(!existingUser || existingUser.length === 0){
            return req.status(400).json({
                success:false,
                message:"Invalid User!"
            })
        }

        req.existingUser = existingUser;
        next();
        
    } catch (error) {
        console.log("Error in CheckUser Middleware: ",error.message);
        return req.status(500).json({
            success:false,
            message:"Internal Server Error!"
        })
    }
}

export default checkUser;