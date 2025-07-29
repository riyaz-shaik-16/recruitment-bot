import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://recruitment-bot.duckdns.org/api/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));
