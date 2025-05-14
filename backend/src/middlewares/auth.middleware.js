import User from "../models/user.model.js"

const checkUser = async (req,res,next) => {
    try {

        const email = req.params.email;

        // console.log("Email in Middleware: ",email);

        const existingUser = await User.findOne({email});

        if(!existingUser || existingUser.length === 0){
            return res.status(400).json({
                success:false,
                message:"Invalid User!"
            })
        }

        req.existingUser = existingUser;
        next();
        
    } catch (error) {
        // console.log("Error in CheckUser Middleware: ",error.message);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error!"
        })
    }
}

export default checkUser;