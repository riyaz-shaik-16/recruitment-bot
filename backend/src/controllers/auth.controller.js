import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Session from "../models/session.model.js";
import Message from "../models/message.model.js";
import Result from "../models/result.model.js";

export const handleGoogleCallback = async (req, res) => {
  try {
    const googleUser = req.user._json;

    console.log("Google user: ",googleUser);

    let user = await User.findOne({ email: googleUser.email });

    if (!user) {
      user = await User.create({
        googleId: googleUser.sub,
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("Token generated:")

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.redirect(`https://recruitment-bot-alpha.vercel.app/auth-success?token=${token}`);
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "OAuth callback failed",
        error: err.message,
      });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").json({ success: true, message: "Logged out" });
};

export const checkUserAuthenticated = (req, res) => {
  if (!req.validUser) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  res.status(200).json({ success: true, user: req.validUser });
};

export const deleteAccount = async (req, res) => {
  try {
    const email = req.params.email;

    if (!req.existingUser) {
      return res.status(401).json({ success: false, message: "Invalid user" });
    }

    await Promise.all([
      Session.deleteMany({ email }),
      Message.deleteMany({ email }),
      Result.deleteMany({ email }),
      User.deleteOne({ email }),
    ]);

    res
      .clearCookie("token")
      .json({ success: true, message: "Account deleted" });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to delete account",
        error: err.message,
      });
  }
};
